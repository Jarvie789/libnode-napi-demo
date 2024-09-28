#include "../window_manager.h"
#include <windows.h>

bool isWindow(const WindowHandle windowHandle) {
  HWND hWnd = reinterpret_cast<HWND>(windowHandle);

  return IsWindow(hWnd);
}