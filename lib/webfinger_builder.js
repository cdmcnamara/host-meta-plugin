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
      subject: address,
      expires: new Date(date.setDate(date.getDate() + 1)),
      aliases: [],
      links: [
        {
          rel: 'https://ripple.com/ripple-services/bridge-payment',
          href: 'https://'+_this.gatewayd.config.get('DOMAIN') + '/api/v1/bridge/quotes',
          titles: {
            default: 'Send Dogecoin to Ripple and vice versa'
          }
        }
      ]
    };

    webfinger.properties = {};

    if (address.match('ripple:')) {
      webfinger.properties.description = 'ripple address';
    }

    if (address.match('dogecoin:')) {
      webfinger.properties.description = 'dogecoin address';
    }

    if (address.match('bitcoin')) {
      webfinger.properties.description = 'bitcoin'
    }

    return new Promise(function(resolve, reject) {
      if (address.match('ripple:')) {
        var rippleAddress = options.address.substring(7);
        
        rippleName.lookup(rippleAddress)
          .then(function(user){
            if (user.exists) {
              webfinger.aliases.push('ripple:'+user.username);
              webfinger.aliases.push('ripple:'+user.address);
            }
            resolve(webfinger);
          });

      } else {
        resolve(webfinger);
      }

    });
  }
};

module.exports = WebFingerBuilder;

