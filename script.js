let p = Math.round(1E11 * Math.random()) + "";
let q = function() {
    for (var A = [], F = 0; 64 > F; )
        A[F] = 0 | 4294967296 * Math.sin(++F % Math.PI);
    return function(B) {
        var G, K, L, ba = [G = 1732584193, K = 4023233417, ~G, ~K], V = [], x = unescape(encodeURI(B)) + "\u0080", v = x.length;
        B = --v / 4 + 2 | 15;
        for (V[--B] = 8 * v; ~v; )
            V[v >> 2] |= x.charCodeAt(v) << 8 * v--;
        for (F = x = 0; F < B; F += 16) {
            for (v = ba; 64 > x; v = [L = v[3], G + ((L = v[0] + [G & K | ~G & L, L & G | ~L & K, G ^ K ^ L, K ^ (G | ~L)][v = x >> 4] + A[x] + ~~V[F | [x, 5 * x + 1, 3 * x + 5, 7 * x][v] & 15]) << (v = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * v + x++ % 4]) | L >>> -v), G, K])
                G = v[1] | 0,
                K = v[2];
            for (x = 4; x; )
                ba[--x] += v[x]
        }
        for (B = ""; 32 > x; )
            B += (ba[x >> 3] >> 4 * (1 ^ x++) & 15).toString(16);
        return B.split("").reverse().join("")
    }
}();
let w = "tryit-" + p + "-" + q(navigator.userAgent + q(navigator.userAgent + q(navigator.userAgent + p + "x")));
console.log(w);