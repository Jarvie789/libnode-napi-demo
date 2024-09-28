let libnode;
if (process.platform === 'darwin') {
  libnode = require("./permissionCheck");
} else {
  libnode = require("bindings")("libnode");
}
module.exports = libnode;