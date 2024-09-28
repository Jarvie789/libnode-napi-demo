#include "../window_manager.h"
#include <X11/Xlib.h>
#include <X11/Xutil.h>
extern "C" {
#include "../xdisplay.h"
}

bool isWindow(const WindowHandle windowHandle) {
  Display* xServer = XGetMainDisplay();
  if (xServer != NULL && windowHandle >= 0) {
    Window rootWindow;
    int32_t x, y;
    uint32_t width, height, border_width, border_height;
    Status getXGeometryResult =
        XGetGeometry(xServer, windowHandle, &rootWindow, &x, &y, &width,
                     &height, &border_width, &border_height);
    if (getXGeometryResult > 0) {
      return true;
    }
  }
  return false;
}