const Promise = require('bluebird');
const rippleName = require('ripple-name');

function WebFingerBuilder(options) {
  this.gatewayd = options.gatewayd;
}

WebFingerBuilder.prototype = {
  build: function(options) {
    var _this = this;
    var address = options.address;
    var date = new Date();

    var webfinger = {
      expires: new Date(date.setDate(date.getDate() + 1)),
      aliases: [],
      links: [
        {
          rel: 'https://ripple.com/ripple-services/bridge-payment',
          href: 'https://'+_this.gatewayd.config.get('DOMAIN') + '/api/v1/bridge/quotes',
          titles: {
            default: 'Send funds to pretend Fidor.'
          }
        }
      ]
    };

    webfinger.properties = {};

    return new Promise(function(resolve, reject) {
      _this._validate(address)
        .then(function(addressObject){
          webfinger.subject = addressObject.address;
          _this._resolve(addressObject)
            .then(function(user){
              if (user.username) {
                webfinger.aliases.push('ripple:'+user.username);
              }

              if (user.address) {
                webfinger.aliases.push('ripple:'+user.address);
              }
              resolve(webfinger);
            })
            .error(reject);
        })
        .error(reject);
    });
  },
  _validate: function (address) {
    var _this = this;
    var address = address.split(':');
    var addressObject = {};

    return new Promise(function(resolve, reject){
      if (address.length < 2) {
        return reject(new Error('AddressFromattingError'));
      }

      addressObject.prefix = address[0];
      addressObject.address = address[1];

      resolve(addressObject);

    });
  },
  _resolve: function (addressObject) {
    var _this = this;

    return new Promise(function(resolve, reject){

      if (addressObject.prefix == 'acct') {
        _this.gatewayd.data.models.externalAccounts.find({
          where: { name: addressObject.address }
        })
        .success(function(externalAccount){
          if (externalAccount) {
            _this.gatewayd.data.models.rippleAddresses.find({
              where: { id: externalAccount.user_id }
            })
            .success(function(rippleAdrress){
              return resolve(rippleAdrress.dataValues);
            })
            .error(reject);
          } else {
            return reject(new Error('GatewayUserNotFound'));
          }
        })
        .error(reject);
      }

      if (addressObject.prefix == 'ripple') {
        rippleName.lookup(addressObject.address)
          .then(function(user){
            if (!user.exists) {
              return reject(new Error('RippleUserNotFound'));
            } else {
              resolve(user);
            }
          })
          .error(reject);
      }

    });

  }
};

module.exports = WebFingerBuilder;

