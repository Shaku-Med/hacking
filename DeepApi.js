function getAPIKEY(randomID) {
    let d = Math.round(1E11 * Math.random()) + ""
  
    let g = function() {
      for (var r = [], A = 0; 64 > A;)
        r[A] = 0 | 4294967296 * Math.sin(++A % Math.PI);
      return function(E) {
        var B, C, D, I = [B = 1732584193, C = 4023233417, ~B, ~C],
          H = [],
          w = unescape(encodeURI(E)) + "\u0080",
          v = w.length;
        E = --v / 4 + 2 | 15;
        for (H[--E] = 8 * v; ~v;)
          H[v >> 2] |= w.charCodeAt(v) << 8 * v--;
        for (A = w = 0; A < E; A += 16) {
          for (v = I; 64 > w; v = [D = v[3], B + ((D = v[0] + [B & C | ~B & D, D & B | ~D & C, B ^ C ^ D, C ^ (B | ~D)][v = w >> 4] + r[w] + ~~H[A | [w, 5 * w + 1, 3 * w + 5, 7 * w][v] & 15]) << (v = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * v + w++ % 4]) | D >>> -v), B, C])
            B = v[1] | 0,
              C = v[2];
          for (w = 4; w;)
            I[--w] += v[w]
        }
        for (E = ""; 32 > w;)
          E += (I[w >> 3] >> 4 * (1 ^ w++) & 15).toString(16);
        return E.split("").reverse().join("")
      }
    }();
  
    let windowAgent = `Mozilla/5.0 (Windows NT 10.0; Mac${randomID}; x64) AppleWebKit/${randomID}.36 (KHTML, like Gecko) Chrome/${randomID}.0.0.0 Safari/${randomID}.36 Edg/${randomID}.0.${randomID}.43`
    // 
    let f = "tryit-" + d + "-" + g(windowAgent + g(windowAgent + g(windowAgent + d + "x")));
  
    return {
      f,
      windowAgent
    }
  
  }
  
  module.exports = {
    getAPIKEY
  }