#include <napi.h>
#include "window_manager.h"

Napi::Boolean _isWindow(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  WindowHandle windowHandle = info[0].As<Napi::Number>().Int64Value();
  return Napi::Boolean::New(env, isWindow(windowHandle));
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::Boolean::New(env, "isWindow"),
              Napi::Function::New(env, _isWindow));

  return exports;
}

NODE_API_MODULE(libnode, Init);