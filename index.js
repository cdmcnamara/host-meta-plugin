var express = require('express');
var HostMetaController = require(__dirname+'/lib/host_meta_controller.js');
var WebFingerController = require(__dirname+'/lib/webfinger_controller.js');

function HostMetaWebFingerPlugin(options) {
  var router = new express.Router(); 
  var hostMetaController = new HostMetaController(options);
  var webFingerController = new WebFingerController(options);
  router.get('/host-meta.json', hostMetaController.get);
  router.get('/webfinger.json', webFingerController.get);
  return {
    router: router
  }
}

module.exports = HostMetaWebFingerPlugin;

