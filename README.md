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
        "subject":"http://blog.example.com/article/id/314",
        "expires":"2010-01-30T09:30:00Z",

        "aliases":[
          "http://blog.example.com/cool_new_thing",
          "http://blog.example.com/steve/article/7"],

        "properties":{
          "http://blgx.example.net/ns/version":"1.3",
          "http://blgx.example.net/ns/ext":null
        },

        "links":[
          {
            "rel":"author",
            "type":"text/html",
            "href":"http://blog.example.com/author/steve",
            "titles":{
              "default":"About the Author",
              "en-us":"Author Information"
            },
            "properties":{
              "http://example.com/role":"editor"
            }
          },
          {
            "rel":"author",
            "href":"http://example.com/author/john",
            "titles":{
              "default":"The other author"
            }
          },
          {
            "rel":"copyright",
            "template":"http://example.com/copyright?id={uri}"
          }
        ]
      }
    
