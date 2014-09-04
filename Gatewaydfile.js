var HostMetaWebFingerPlugin = require('./');

module.exports = function(gatewayd) {
  var plugin = new HostMetaWebFingerPlugin({
    gatewayd: gatewayd
  });
  gatewayd.server.use('/.well-known', plugin.router);
}

