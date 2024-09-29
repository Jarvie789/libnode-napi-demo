let libnode = require("bindings")("libnode");

let hasScreenRecordingPermission = false;

try {
  /**
   * If using node-mac-permissions, use the following code:
   * const permissions = require("node-mac-permissions");
   * package.json:
   *   "optionalDependencies": {
   *     "node-mac-permissions": "2.2.1"
   *   }, 
   */

  // Fork from node-mac-permissions@2.2.1, built with NAPI. Support macOS 10.14+
  const permissions = require("./3rdparty/macos/permissions.node");

  const wrapWithWarning = (message, nativeFunction) => (...args) => {
    console.warn(message);
    return nativeFunction(...args);
  };

  const askForScreenRecording = (nativeFunction, functionName) => {
    if (process.platform !== 'darwin' || hasScreenRecordingPermission) {
      return nativeFunction;
    }
    const screenCaptureStatus = permissions.getAuthStatus("screen");

    if (screenCaptureStatus === 'authorized') {
      hasScreenRecordingPermission = true;
      return nativeFunction;
    } else if (screenCaptureStatus === 'not determined' || screenCaptureStatus === 'denied') {
      permissions.askForScreenCaptureAccess();
      return wrapWithWarning(`##### WARNING! The application running this script tries to screen recording features to execute ${functionName}! Please grant the requested access. #####`, nativeFunction);
    }
  }

  const screenCaptureAccess = [
    // "getWindowTitle",
  ];

  for (const functionName of screenCaptureAccess) {
    const originalFunction = libnode[functionName];
    libnode[functionName] = (...args) => askForScreenRecording(originalFunction, functionName)(...args);
  }
} catch (e) {
  console.warn(`Encountered error establishing macOS permission checks:`, e.message);
  console.warn(`Returning original module.`);
  libnode = require("bindings")("libnode");
} finally {
  module.exports = libnode;
}
