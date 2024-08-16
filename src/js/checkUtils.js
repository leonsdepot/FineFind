class CheckUtils {
  static positionOutsideDoc( x, y ) {
    return x < 0 || y < 0 || x > document.documentElement.scrollWidth || y > document.documentElement.scrollHeight;
  }
}