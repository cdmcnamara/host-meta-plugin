const express = require('express');
const supertest = require('supertest');
const assert = require('assert');
const plugin = require('../');

var app = express();

describe('attaching the host-meta.json to gatewayd', function() {

  before(function() {
    var gatewayd = {
      server: app
    };
    plugin(gatewayd);
  });

  it("should respond with a 200 status code", function(done) {
    supertest(app) 
      .get('/.well-known/host-meta.json')
      .expect(200)
      .end(function(error, response) {
        assert(response.body.links.length > 0);
        done();
      });
  });
});

