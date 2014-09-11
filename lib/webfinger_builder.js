const Promise = require('bluebird');

function WebFingerBuilder(options) {
  this.gatewayd = options.gatewayd;
}

WebFingerBuilder.prototype = {
  build: function(options) {
    var _this = this;
    var address = options.address;
    
    var webfinger = {
      subject: address,
      expires: new Date() + 1,
      aliasses: [],
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
      resolve(webfinger);
    });
  }
};

module.exports = WebFingerBuilder;

