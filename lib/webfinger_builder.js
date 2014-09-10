const Promise = require('bluebird');

function WebFingerBuilder(options) {
  this.gatewayd = options.gatewayd;
}

WebFingerBuilder.prototype = {
  build: function(options) {
    return new Promise(function(resolve, reject) {
      resolve({
        "subject": options.address,
        "expires": "2014-01-30T09:30:00Z",

        "aliases": [
        ],

        "properties": {
          "name": "acct:186ZJv7Bm1ydrsVxPDuVtdJNZZUwAXL2jH",
          "description": "bitcoin address",
          "type": "Remote"
        },

        "links": [
          {
            "rel": "https://ripple.com/ripple-services/bridge-payment",
            "href": "https://api.snapswap.us/bridge-payment",
            "titles": {
              "default": "Send Euro payment to bitcoin account",
              "de-de": "Service btc2ripple zum Laden von Bitcoins"
            }
          }
        ]
      });
    });
  }
};

module.exports = WebFingerBuilder;

