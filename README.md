## Host-Meta plugin for Gatewayd

Ripple Gateway Services require the domain to expose
a manifest of services hosted at that domain using the
web standards known as "Host Meta" and "Webfinger"

## Usage

In gatewaydfile.js

    var plugin = require("gatewayd-host-meta-plugin");

    module.exports = function(gatewayd) {
      gatewayd.server.use('/.well-known', plugin);
    }

Then visit the well know host meta with a web browser or api

    GET /.well-known/host-meta.json 

    {
      "subject": "https://snapswap.us",
      "expires": "2014-01-30T09:30:00Z",

      "aliases": [
        "ripple:snapswap",
        "ripple:rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
      ],

      "properties": {
        "name": "Gateway",
        "description": "Gateway US Gateway",
        "rl:type": "gateway",

        "rl:domain": "example.com",
        "rl:validation_public_key":[ "n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz"],
        "rl:ips": [
          { "address": "r.ripple.com", "port":"51235" },
          { "address": "162.243.242.204", "port":"51235" },
          { "address": "23.21.167.100", "port":"51235" },
          { "address": "107.21.116.214", "port":"51235" },
        ],
        "rl:validators": [
          "n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7",    // RL1
          "n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj",    // RL2
          "n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C",    // RL3
          "n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS",    // RL4
          "n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA",    // RL5
          "n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz"     // SnapSwap
        ],
        "rl:accounts": [
          {
            "address":"rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
            "rl:currencies": ["EUR"]
          }
        ],

        "rl:hotwallets": [
          "rEjtM7pApzYS3KyTWndkiUx5wX83Zdy9gd",    // XRP
          "rsTQ7iwrCik9Ugc3zbpcbo2K3SbAdYJss1",    // EUR
          "rNGwmUA1oNK35frqavJwkhbLS1Ubcua828",    // GBP
          "rEk9i7G8ac1kUs1mFjtze1qjj9FzGvXAG ",    // echo
          "rQsAshmCjPsxkYnxY9GnmBTAeEUaePDAie"     // manual
        ]
      },

      "links": [
        {
          "rel": "https://ripple.com/ripple-services/user-account",
          "href": "https://example.com/api/v1/registrations",
          "properties": {
            "version": "1",
            "signupFields":{
              "name":{
                "type":"email",
                "required":"true",
                "label":"Email address",
                "description":""
              },
              "rippleAddress":{
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
    }

