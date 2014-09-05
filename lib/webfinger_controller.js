const WebFingerBuilder = require(__dirname+'/web_finger_builder.js');

function WebfingerController(options) {
  this.webFingerBuilder = new WebFingerBuilder(options);
};

WebfingerController.prototype = {
  constructor: WebfingerController

  get: function(request, response) {
    this.webFingerBuilder.build(request.body)
    .then(function(webFinger) {
      response
        .status(200)
        .send(webFinger);
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    })

  }
}

module.exports = WebfingerController;

