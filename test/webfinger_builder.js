var assert = require('assert');
var WebfingerBuilder = require(__dirname+'/../lib/webfinger_builder');
var gatewayd = require('/Users/abiy/code/gatewayd');

describe('Webfinger Builder _validate', function(){
  
  var webfingerBuilder = new WebfingerBuilder({
    gatewayd: gatewayd
  });

  describe('acct:', function(){
      it('should validate requests -- pass', function(done){
        webfingerBuilder._validate('acct:joe@example.com')
          .then(function(address){
            assert(address.hasOwnProperty('prefix'));
            assert(address.hasOwnProperty('address'));
            done();
          })
      });

      it('should validate requests -- fail', function(done){
        webfingerBuilder._validate('acct:joedcom')
          .error(function(error){
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'InvalidEmailFormat');
            done();
          })
      });
    });


  describe('bitcoin:', function(){
    it('should validate bitcoin address -- pass', function(done) {
      webfingerBuilder._validate('bitcoin:3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')
      .then(function (address) {
          assert(address.hasOwnProperty('prefix'));
          assert(address.hasOwnProperty('address'));
          done();
      });
    });

    it('should validate requests -- fail', function(done){
      webfingerBuilder._validate('bitcoin:joedcom')
        .error(function(error){
          assert(error instanceof Error);
          assert.strictEqual(error.message, 'InvalidBitcoinAddress');
          done();
        })
    });

  });

});