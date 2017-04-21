class ColorHelper {
  static decToHex(rIn, gIn, bIn) {
    let r = rIn.toString(16);
    let g = gIn.toString(16);
    let b = bIn.toString(16);
    r = r.length === 1 ? '0' + r : r;
    g = g.length === 1 ? '0' + g : g;
    b = b.length === 1 ? '0' + b : b;
    const colHex = '#' + r + g + b;
    return colHex;
  }
  static rgbToDec(col) {
    if (col.charAt(0) === 'r') {
      const c = col.replace('rgb(', '').replace(')', '').split(',');
      const r = parseInt(c[0], 10);
      const g = parseInt(c[1], 10);
      const b = parseInt(c[2], 10);
      return [r,g,b];
    }
    return col;
  }
  static rgbToHex(color) {
    let rgbArray = this.rgbToDec(color);
    return this.decToHex(rgbArray[0],rgbArray[1], rgbArray[2]);
  }
  static randomColor() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  }
}

export default ColorHelper;
