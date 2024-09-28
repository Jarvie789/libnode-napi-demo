#include "../window_manager.h"
#import <CoreGraphics/CGWindow.h>
#import <Foundation/Foundation.h>

bool isWindow(const WindowHandle windowHandle) {
  CGWindowListOption listOptions =
      kCGWindowListOptionOnScreenOnly | kCGWindowListExcludeDesktopElements;
  CFArrayRef windowList =
      CGWindowListCopyWindowInfo(listOptions, kCGNullWindowID);

  for (NSDictionary* info in (NSArray*)windowList) {
    NSNumber* windowNumber = info[(id)kCGWindowNumber];

    if (windowHandle == [windowNumber intValue]) {
      CFRelease(windowList);

      return true;
    }
  }

  if (windowList) {
    CFRelease(windowList);
  }

  return false;
}