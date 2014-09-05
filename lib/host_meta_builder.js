var Promise = require('bluebird');

function HostMetaBuilder(options) {
  this.gatewayd = options.gatewayd;
};

HostMetaBuilder.prototype = {
  constructor: HostMetaBuilder,
  
  build: function() {
    var EXPIRY_MINUTES = 60;
    var _this = this;
    var hostMeta = {};
    return new Promise(function(resolve, reject) {
      var domain = this.gatewayd.config.get('DOMAIN');
      var coldWallet = 
      var properties = {}
      hostMeta['subject'] = 'https://'+domain;
      hostMeta['expires'] = new Date((new Date()).getTime() + EXPIRY_MINUTES*60000);
      hostMeta['aliases'] = [
        'ripple:'+_this.gatewayd.config.get('COLD_WALLET')
      ]
      properties['name'] = 'Gateway';
      properties['description'] = 'Ripple Gateway';
      properties['rl:type'] = 'gateway';
      properties['rl:domain'] = domain;
      properties['rl:accounts'] = [{
        "address": _this.gatewayd.config.get('COLD_WALLET'),
        "rl:currencies": gatewayd.config.get("CURRENCIES");
      }]
      properties['rl:hotwallets']: [
        gatewayd.config.get('HOT_WALLET').address
      ]
      hostMeta['properties'] = properties;
      hostMeta['links'] = [
        {
          "rel": "https://ripple.com/ripple-services/user-account",
          "href": "https://"+_this.gatewayd.config.get("DOMAIN")+"/v1/registrations",
          "properties": {
            "version": "1",
            "signupFields":{
              "name":{
                "type":"email",
                "required":"true",
                "label":"Email address",
                "description":""
              },
              "ripple_address":{
                "type":"rippleAddress",
                "required":"true",
                "label":"Ripple Address",
                "description":"Independent ripple address to receive deposits"
              },
              "password":{
                "type":"email",
                "required":"false",
                "label":"Account Password",
                "description":""
              }
            }
          }
        },
        {
          "rel": "https://ripple.com/ripple-services/bridge_quotes",
          "href": "https://example.com/api/v1/bridge/quotes",
          "properties": {
            "version": "1",
            "fields": {
              "destination_amount": {
                "amount": "100",
                "currency": "BTC",
                "issuer": "optional"
              },
              "destination_address": {}
            }
          }
        },
        {
          "rel": "https://ripple.com/ripple-services/bridge_payments",
          "href": "https://example.com/api/v1/bridge/payments",
          "properties": {
            "version": "1",
            "fields": {
              "gateway_transaction_id": "9876",
              "destination_account": "ripple:r12345",
              "destination_amount": {"amount":"100", "currency":"EUR", "issuer":"r12345"},
              "expiration": "1311280970",
              "sender": "acct:alice@fidor.ru"
            }
          }
        },
        {
          "rel": "https://ripple.com/ripple-services/bridge_payments",
          "href": "https://example.com/api/v1/bridge/payments/:id",
          "properties": {
            "version": "1",
            "fields": {
              "gateway_transaction_id": "Integer"
            }
          }
        }
      ]
      resolve(hostMeta);
    });
  }
}

module.exports = HostMetaBuilder;

