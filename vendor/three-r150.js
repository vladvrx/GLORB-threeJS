// Extracted third-party code from supplied GLORB base. See THIRD_PARTY.md.

const Nx = 0,
  Fx = 1,
  Ux = 2,
  Hx = 0,
  Gx = 1,
  Vx = 2,
  Wx = 3,
  jx = 0,
  qx = 1,
  Zx = 2,
  $x = 0,
  Xx = 1,
  Yx = 2,
  Jx = 3,
  Qx = 4,
  Kx = 5,
  ew = 100,
  tw = 101,
  sw = 102,
  iw = 103,
  nw = 104,
  aw = 200,
  rw = 201,
  ow = 202,
  lw = 203,
  cw = 204,
  hw = 205,
  uw = 206,
  dw = 207,
  pw = 208,
  mw = 209,
  fw = 210,
  gw = 0,
  vw = 1,
  bw = 2,
  yw = 3,
  _w = 4,
  xw = 5,
  ww = 6,
  Sw = 7,
  Aw = 0,
  Mw = 1,
  Cw = 2,
  Pw = 0,
  Tw = 1,
  Ew = 2,
  Bw = 3,
  Iw = 4,
  kw = 5,
  Dw = 301,
  Lw = 302,
  Ow = 303,
  Rw = 304,
  zw = 306,
  Nw = 1e3,
  Fw = 1001,
  Uw = 1002,
  Hw = 1003,
  Gw = 1004,
  Vw = 1005,
  Ww = 1006,
  jw = 1007,
  qw = 1008,
  Zw = 1009,
  $w = 1010,
  Xw = 1011,
  Yw = 1012,
  Jw = 1013,
  Qw = 1014,
  Kw = 1015,
  eS = 1016,
  tS = 1017,
  sS = 1018,
  iS = 1020,
  nS = 1021,
  aS = 1023,
  rS = 1024,
  oS = 1025,
  lS = 1026,
  cS = 1027,
  hS = 1028,
  uS = 1029,
  dS = 1030,
  pS = 1031,
  mS = 1033,
  fS = 33776,
  gS = 33777,
  vS = 33778,
  bS = 33779,
  yS = 35840,
  _S = 35841,
  xS = 35842,
  wS = 35843,
  SS = 36196,
  AS = 37492,
  MS = 37496,
  CS = 37808,
  PS = 37809,
  TS = 37810,
  ES = 37811,
  BS = 37812,
  IS = 37813,
  kS = 37814,
  DS = 37815,
  LS = 37816,
  OS = 37817,
  RS = 37818,
  zS = 37819,
  NS = 37820,
  FS = 37821,
  US = 36492,
  HS = 36283,
  GS = 36284,
  VS = 36285,
  WS = 36286,
  jS = 2200,
  qS = 2201,
  ZS = 2300,
  $S = 2301,
  XS = 2302,
  YS = 2400,
  JS = 2401,
  QS = 2402,
  KS = 2500,
  eA = 2501,
  tA = 0,
  sA = 1,
  iA = 2,
  nA = 3e3,
  aA = 3001,
  rA = 3201,
  oA = 0,
  lA = 1,
  cA = "",
  hA = "srgb",
  uA = "srgb-linear",
  dA = "display-p3",
  pA = 7680,
  mA = 35044,
  fA = 35048,
  gA = "300 es",
  vA = 1035;
class bA {
  addEventListener(e, t) {
    void 0 === this._listeners && (this._listeners = {});
    const s = this._listeners;
    void 0 === s[e] && (s[e] = []), -1 === s[e].indexOf(t) && s[e].push(t);
  }
  hasEventListener(e, t) {
    if (void 0 === this._listeners) return !1;
    const s = this._listeners;
    return void 0 !== s[e] && -1 !== s[e].indexOf(t);
  }
  removeEventListener(e, t) {
    if (void 0 === this._listeners) return;
    const s = this._listeners[e];
    if (void 0 !== s) {
      const e = s.indexOf(t);
      -1 !== e && s.splice(e, 1);
    }
  }
  dispatchEvent(e) {
    if (void 0 === this._listeners) return;
    const t = this._listeners[e.type];
    if (void 0 !== t) {
      e.target = this;
      const s = t.slice(0);
      for (let t = 0, i = s.length; t < i; t++) s[t].call(this, e);
      e.target = null;
    }
  }
}
const yA = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let _A = 1234567;
const xA = Math.PI / 180,
  wA = 180 / Math.PI;
function SA() {
  const e = 4294967295 * Math.random() | 0,
    t = 4294967295 * Math.random() | 0,
    s = 4294967295 * Math.random() | 0,
    i = 4294967295 * Math.random() | 0;
  return (yA[255 & e] + yA[e >> 8 & 255] + yA[e >> 16 & 255] + yA[e >> 24 & 255] + "-" + yA[255 & t] + yA[t >> 8 & 255] + "-" + yA[t >> 16 & 15 | 64] + yA[t >> 24 & 255] + "-" + yA[63 & s | 128] + yA[s >> 8 & 255] + "-" + yA[s >> 16 & 255] + yA[s >> 24 & 255] + yA[255 & i] + yA[i >> 8 & 255] + yA[i >> 16 & 255] + yA[i >> 24 & 255]).toLowerCase();
}
function AA(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function MA(e, t) {
  return (e % t + t) % t;
}
function CA(e, t, s) {
  return (1 - s) * e + s * t;
}
function PA(e) {
  return 0 == (e & e - 1) && 0 !== e;
}
function TA(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function EA(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function BA(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function IA(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return Math.round(65535 * e);
    case Uint8Array:
      return Math.round(255 * e);
    case Int16Array:
      return Math.round(32767 * e);
    case Int8Array:
      return Math.round(127 * e);
    default:
      throw new Error("Invalid component type.");
  }
}
const kA = {
  DEG2RAD: xA,
  RAD2DEG: wA,
  generateUUID: SA,
  clamp: AA,
  euclideanModulo: MA,
  mapLinear: function (e, t, s, i, n) {
    return i + (e - t) * (n - i) / (s - t);
  },
  inverseLerp: function (e, t, s) {
    return e !== t ? (s - e) / (t - e) : 0;
  },
  lerp: CA,
  damp: function (e, t, s, i) {
    return CA(e, t, 1 - Math.exp(-s * i));
  },
  pingpong: function (e, t = 1) {
    return t - Math.abs(MA(e, 2 * t) - t);
  },
  smoothstep: function (e, t, s) {
    return e <= t ? 0 : e >= s ? 1 : (e = (e - t) / (s - t)) * e * (3 - 2 * e);
  },
  smootherstep: function (e, t, s) {
    return e <= t ? 0 : e >= s ? 1 : (e = (e - t) / (s - t)) * e * e * (e * (6 * e - 15) + 10);
  },
  randInt: function (e, t) {
    return e + Math.floor(Math.random() * (t - e + 1));
  },
  randFloat: function (e, t) {
    return e + Math.random() * (t - e);
  },
  randFloatSpread: function (e) {
    return e * (.5 - Math.random());
  },
  seededRandom: function (e) {
    void 0 !== e && (_A = e);
    let t = _A += 1831565813;
    return t = Math.imul(t ^ t >>> 15, 1 | t), t ^= t + Math.imul(t ^ t >>> 7, 61 | t), ((t ^ t >>> 14) >>> 0) / 4294967296;
  },
  degToRad: function (e) {
    return e * xA;
  },
  radToDeg: function (e) {
    return e * wA;
  },
  isPowerOfTwo: PA,
  ceilPowerOfTwo: TA,
  floorPowerOfTwo: EA,
  setQuaternionFromProperEuler: function (e, t, s, i, n) {
    const a = Math.cos,
      r = Math.sin,
      o = a(s / 2),
      l = r(s / 2),
      c = a((t + i) / 2),
      h = r((t + i) / 2),
      u = a((t - i) / 2),
      d = r((t - i) / 2),
      p = a((i - t) / 2),
      m = r((i - t) / 2);
    switch (n) {
      case "XYX":
        e.set(o * h, l * u, l * d, o * c);
        break;
      case "YZY":
        e.set(l * d, o * h, l * u, o * c);
        break;
      case "ZXZ":
        e.set(l * u, l * d, o * h, o * c);
        break;
      case "XZX":
        e.set(o * h, l * m, l * p, o * c);
        break;
      case "YXY":
        e.set(l * p, o * h, l * m, o * c);
        break;
      case "ZYZ":
        e.set(l * m, l * p, o * h, o * c);
    }
  },
  normalize: IA,
  denormalize: BA
};
class DA {
  constructor(e = 0, t = 0) {
    DA.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x,
      s = this.y,
      i = e.elements;
    return this.x = i[0] * t + i[3] * s + i[6], this.y = i[1] * t + i[4] * s + i[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(t, s)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      s = this.y - e.y;
    return t * t + s * s;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, s) {
    return this.x = e.x + (t.x - e.x) * s, this.y = e.y + (t.y - e.y) * s, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const s = Math.cos(t),
      i = Math.sin(t),
      n = this.x - e.x,
      a = this.y - e.y;
    return this.x = n * s - a * i + e.x, this.y = n * i + a * s + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class LA {
  constructor() {
    LA.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  set(e, t, s, i, n, a, r, o, l) {
    const c = this.elements;
    return c[0] = e, c[1] = i, c[2] = r, c[3] = t, c[4] = n, c[5] = o, c[6] = s, c[7] = a, c[8] = l, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    const t = this.elements,
      s = e.elements;
    return t[0] = s[0], t[1] = s[1], t[2] = s[2], t[3] = s[3], t[4] = s[4], t[5] = s[5], t[6] = s[6], t[7] = s[7], t[8] = s[8], this;
  }
  extractBasis(e, t, s) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), s.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const s = e.elements,
      i = t.elements,
      n = this.elements,
      a = s[0],
      r = s[3],
      o = s[6],
      l = s[1],
      c = s[4],
      h = s[7],
      u = s[2],
      d = s[5],
      p = s[8],
      m = i[0],
      f = i[3],
      g = i[6],
      v = i[1],
      b = i[4],
      y = i[7],
      _ = i[2],
      x = i[5],
      w = i[8];
    return n[0] = a * m + r * v + o * _, n[3] = a * f + r * b + o * x, n[6] = a * g + r * y + o * w, n[1] = l * m + c * v + h * _, n[4] = l * f + c * b + h * x, n[7] = l * g + c * y + h * w, n[2] = u * m + d * v + p * _, n[5] = u * f + d * b + p * x, n[8] = u * g + d * y + p * w, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      s = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      r = e[5],
      o = e[6],
      l = e[7],
      c = e[8];
    return t * a * c - t * r * l - s * n * c + s * r * o + i * n * l - i * a * o;
  }
  invert() {
    const e = this.elements,
      t = e[0],
      s = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      r = e[5],
      o = e[6],
      l = e[7],
      c = e[8],
      h = c * a - r * l,
      u = r * o - c * n,
      d = l * n - a * o,
      p = t * h + s * u + i * d;
    if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const m = 1 / p;
    return e[0] = h * m, e[1] = (i * l - c * s) * m, e[2] = (r * s - i * a) * m, e[3] = u * m, e[4] = (c * t - i * o) * m, e[5] = (i * n - r * t) * m, e[6] = d * m, e[7] = (s * o - l * t) * m, e[8] = (a * t - s * n) * m, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, s, i, n, a, r) {
    const o = Math.cos(n),
      l = Math.sin(n);
    return this.set(s * o, s * l, -s * (o * a + l * r) + a + e, -i * l, i * o, -i * (-l * a + o * r) + r + t, 0, 0, 1), this;
  }
  scale(e, t) {
    return this.premultiply(OA.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(OA.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(OA.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
  }
  makeRotation(e) {
    const t = Math.cos(e),
      s = Math.sin(e);
    return this.set(t, -s, 0, s, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    const t = this.elements,
      s = e.elements;
    for (let i = 0; i < 9; i++) if (t[i] !== s[i]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let s = 0; s < 9; s++) this.elements[s] = e[s + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const s = this.elements;
    return e[t] = s[0], e[t + 1] = s[1], e[t + 2] = s[2], e[t + 3] = s[3], e[t + 4] = s[4], e[t + 5] = s[5], e[t + 6] = s[6], e[t + 7] = s[7], e[t + 8] = s[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const OA = new LA();
function RA(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
const zA = {
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
};
function NA(e, t) {
  return new zA[e](t);
}
function FA(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
class UA {
  constructor(e = 0, t = 0, s = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = s, this._w = i;
  }
  static slerpFlat(e, t, s, i, n, a, r) {
    let o = s[i + 0],
      l = s[i + 1],
      c = s[i + 2],
      h = s[i + 3];
    const u = n[a + 0],
      d = n[a + 1],
      p = n[a + 2],
      m = n[a + 3];
    if (0 === r) return e[t + 0] = o, e[t + 1] = l, e[t + 2] = c, void (e[t + 3] = h);
    if (1 === r) return e[t + 0] = u, e[t + 1] = d, e[t + 2] = p, void (e[t + 3] = m);
    if (h !== m || o !== u || l !== d || c !== p) {
      let e = 1 - r;
      const t = o * u + l * d + c * p + h * m,
        s = t >= 0 ? 1 : -1,
        i = 1 - t * t;
      if (i > Number.EPSILON) {
        const n = Math.sqrt(i),
          a = Math.atan2(n, t * s);
        e = Math.sin(e * a) / n, r = Math.sin(r * a) / n;
      }
      const n = r * s;
      if (o = o * e + u * n, l = l * e + d * n, c = c * e + p * n, h = h * e + m * n, e === 1 - r) {
        const e = 1 / Math.sqrt(o * o + l * l + c * c + h * h);
        o *= e, l *= e, c *= e, h *= e;
      }
    }
    e[t] = o, e[t + 1] = l, e[t + 2] = c, e[t + 3] = h;
  }
  static multiplyQuaternionsFlat(e, t, s, i, n, a) {
    const r = s[i],
      o = s[i + 1],
      l = s[i + 2],
      c = s[i + 3],
      h = n[a],
      u = n[a + 1],
      d = n[a + 2],
      p = n[a + 3];
    return e[t] = r * p + c * h + o * d - l * u, e[t + 1] = o * p + c * u + l * h - r * d, e[t + 2] = l * p + c * d + r * u - o * h, e[t + 3] = c * p - r * h - o * u - l * d, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, s, i) {
    return this._x = e, this._y = t, this._z = s, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t) {
    const s = e._x,
      i = e._y,
      n = e._z,
      a = e._order,
      r = Math.cos,
      o = Math.sin,
      l = r(s / 2),
      c = r(i / 2),
      h = r(n / 2),
      u = o(s / 2),
      d = o(i / 2),
      p = o(n / 2);
    switch (a) {
      case "XYZ":
        this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "YXZ":
        this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
        break;
      case "ZXY":
        this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "ZYX":
        this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
        break;
      case "YZX":
        this._x = u * c * h + l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "XZY":
        this._x = u * c * h - l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h + u * d * p;
    }
    return !1 !== t && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const s = t / 2,
      i = Math.sin(s);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(s), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements,
      s = t[0],
      i = t[4],
      n = t[8],
      a = t[1],
      r = t[5],
      o = t[9],
      l = t[2],
      c = t[6],
      h = t[10],
      u = s + r + h;
    if (u > 0) {
      const e = .5 / Math.sqrt(u + 1);
      this._w = .25 / e, this._x = (c - o) * e, this._y = (n - l) * e, this._z = (a - i) * e;
    } else if (s > r && s > h) {
      const e = 2 * Math.sqrt(1 + s - r - h);
      this._w = (c - o) / e, this._x = .25 * e, this._y = (i + a) / e, this._z = (n + l) / e;
    } else if (r > h) {
      const e = 2 * Math.sqrt(1 + r - s - h);
      this._w = (n - l) / e, this._x = (i + a) / e, this._y = .25 * e, this._z = (o + c) / e;
    } else {
      const e = 2 * Math.sqrt(1 + h - s - r);
      this._w = (a - i) / e, this._x = (n + l) / e, this._y = (o + c) / e, this._z = .25 * e;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let s = e.dot(t) + 1;
    return s < Number.EPSILON ? (s = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = s) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = s)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = s), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(AA(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const s = this.angleTo(e);
    if (0 === s) return this;
    const i = Math.min(1, t / s);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const s = e._x,
      i = e._y,
      n = e._z,
      a = e._w,
      r = t._x,
      o = t._y,
      l = t._z,
      c = t._w;
    return this._x = s * c + a * r + i * l - n * o, this._y = i * c + a * o + n * r - s * l, this._z = n * c + a * l + s * o - i * r, this._w = a * c - s * r - i * o - n * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (0 === t) return this;
    if (1 === t) return this.copy(e);
    const s = this._x,
      i = this._y,
      n = this._z,
      a = this._w;
    let r = a * e._w + s * e._x + i * e._y + n * e._z;
    if (r < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, r = -r) : this.copy(e), r >= 1) return this._w = a, this._x = s, this._y = i, this._z = n, this;
    const o = 1 - r * r;
    if (o <= Number.EPSILON) {
      const e = 1 - t;
      return this._w = e * a + t * this._w, this._x = e * s + t * this._x, this._y = e * i + t * this._y, this._z = e * n + t * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const l = Math.sqrt(o),
      c = Math.atan2(l, r),
      h = Math.sin((1 - t) * c) / l,
      u = Math.sin(t * c) / l;
    return this._w = a * h + this._w * u, this._x = s * h + this._x * u, this._y = i * h + this._y * u, this._z = n * h + this._z * u, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, s) {
    return this.copy(e).slerp(t, s);
  }
  random() {
    const e = Math.random(),
      t = Math.sqrt(1 - e),
      s = Math.sqrt(e),
      i = 2 * Math.PI * Math.random(),
      n = 2 * Math.PI * Math.random();
    return this.set(t * Math.cos(i), s * Math.sin(n), s * Math.cos(n), t * Math.sin(i));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class HA {
  constructor(e = 0, t = 0, s = 0) {
    HA.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = s;
  }
  set(e, t, s) {
    return void 0 === s && (s = this.z), this.x = e, this.y = t, this.z = s, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(VA.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(VA.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x,
      s = this.y,
      i = this.z,
      n = e.elements;
    return this.x = n[0] * t + n[3] * s + n[6] * i, this.y = n[1] * t + n[4] * s + n[7] * i, this.z = n[2] * t + n[5] * s + n[8] * i, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x,
      s = this.y,
      i = this.z,
      n = e.elements,
      a = 1 / (n[3] * t + n[7] * s + n[11] * i + n[15]);
    return this.x = (n[0] * t + n[4] * s + n[8] * i + n[12]) * a, this.y = (n[1] * t + n[5] * s + n[9] * i + n[13]) * a, this.z = (n[2] * t + n[6] * s + n[10] * i + n[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x,
      s = this.y,
      i = this.z,
      n = e.x,
      a = e.y,
      r = e.z,
      o = e.w,
      l = o * t + a * i - r * s,
      c = o * s + r * t - n * i,
      h = o * i + n * s - a * t,
      u = -n * t - a * s - r * i;
    return this.x = l * o + u * -n + c * -r - h * -a, this.y = c * o + u * -a + h * -n - l * -r, this.z = h * o + u * -r + l * -a - c * -n, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x,
      s = this.y,
      i = this.z,
      n = e.elements;
    return this.x = n[0] * t + n[4] * s + n[8] * i, this.y = n[1] * t + n[5] * s + n[9] * i, this.z = n[2] * t + n[6] * s + n[10] * i, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(t, s)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, s) {
    return this.x = e.x + (t.x - e.x) * s, this.y = e.y + (t.y - e.y) * s, this.z = e.z + (t.z - e.z) * s, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const s = e.x,
      i = e.y,
      n = e.z,
      a = t.x,
      r = t.y,
      o = t.z;
    return this.x = i * o - n * r, this.y = n * a - s * o, this.z = s * r - i * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (0 === t) return this.set(0, 0, 0);
    const s = e.dot(this) / t;
    return this.copy(e).multiplyScalar(s);
  }
  projectOnPlane(e) {
    return GA.copy(this).projectOnVector(e), this.sub(GA);
  }
  reflect(e) {
    return this.sub(GA.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (0 === t) return Math.PI / 2;
    const s = this.dot(e) / t;
    return Math.acos(AA(s, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      s = this.y - e.y,
      i = this.z - e.z;
    return t * t + s * s + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, s) {
    const i = Math.sin(t) * e;
    return this.x = i * Math.sin(s), this.y = Math.cos(t) * e, this.z = i * Math.cos(s), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, s) {
    return this.x = e * Math.sin(t), this.y = s, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(),
      s = this.setFromMatrixColumn(e, 1).length(),
      i = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = s, this.z = i, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, 4 * t);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, 3 * t);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = 2 * (Math.random() - .5),
      t = Math.random() * Math.PI * 2,
      s = Math.sqrt(1 - e ** 2);
    return this.x = s * Math.cos(t), this.y = s * Math.sin(t), this.z = e, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const GA = new HA(),
  VA = new UA();
function WA(e) {
  return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4);
}
function jA(e) {
  return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055;
}
const qA = new LA().fromArray([.8224621, .0331941, .0170827, .177538, .9668058, .0723974, -1e-7, 1e-7, .9105199]),
  ZA = new LA().fromArray([1.2249401, -.0420569, -.0196376, -.2249404, 1.0420571, -.0786361, 1e-7, 0, 1.0982735]),
  $A = new HA();
const XA = {
    [uA]: e => e,
    [hA]: e => e.convertSRGBToLinear(),
    [dA]: function (e) {
      return e.convertSRGBToLinear(), $A.set(e.r, e.g, e.b).applyMatrix3(ZA), e.setRGB($A.x, $A.y, $A.z);
    }
  },
  YA = {
    [uA]: e => e,
    [hA]: e => e.convertLinearToSRGB(),
    [dA]: function (e) {
      return $A.set(e.r, e.g, e.b).applyMatrix3(qA), e.setRGB($A.x, $A.y, $A.z).convertLinearToSRGB();
    }
  },
  JA = {
    enabled: !1,
    get legacyMode() {
      return !this.enabled;
    },
    set legacyMode(e) {
      this.enabled = !e;
    },
    get workingColorSpace() {
      return uA;
    },
    set workingColorSpace(e) {},
    convert: function (e, t, s) {
      if (!1 === this.enabled || t === s || !t || !s) return e;
      const i = XA[t],
        n = YA[s];
      if (void 0 === i || void 0 === n) throw new Error(`Unsupported color space conversion, "${t}" to "${s}".`);
      return n(i(e));
    },
    fromWorkingColorSpace: function (e, t) {
      return this.convert(e, this.workingColorSpace, t);
    },
    toWorkingColorSpace: function (e, t) {
      return this.convert(e, t, this.workingColorSpace);
    }
  };
let QA;
class KA {
  static getDataURL(e) {
    if (/^data:/i.test(e.src)) return e.src;
    if ("undefined" == typeof HTMLCanvasElement) return e.src;
    let t;
    if (e instanceof HTMLCanvasElement) t = e;else {
      void 0 === QA && (QA = FA("canvas")), QA.width = e.width, QA.height = e.height;
      const s = QA.getContext("2d");
      e instanceof ImageData ? s.putImageData(e, 0, 0) : s.drawImage(e, 0, 0, e.width, e.height), t = QA;
    }
    return t.width > 2048 || t.height > 2048 ? t.toDataURL("image/jpeg", .6) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
      const t = FA("canvas");
      t.width = e.width, t.height = e.height;
      const s = t.getContext("2d");
      s.drawImage(e, 0, 0, e.width, e.height);
      const i = s.getImageData(0, 0, e.width, e.height),
        n = i.data;
      for (let e = 0; e < n.length; e++) n[e] = 255 * WA(n[e] / 255);
      return s.putImageData(i, 0, 0), t;
    }
    if (e.data) {
      const t = e.data.slice(0);
      for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(255 * WA(t[e] / 255)) : t[e] = WA(t[e]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    }
    return e;
  }
}
class eM {
  constructor(e = null) {
    this.isSource = !0, this.uuid = SA(), this.data = e, this.version = 0;
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    if (!t && void 0 !== e.images[this.uuid]) return e.images[this.uuid];
    const s = {
        uuid: this.uuid,
        url: ""
      },
      i = this.data;
    if (null !== i) {
      let e;
      if (Array.isArray(i)) {
        e = [];
        for (let t = 0, s = i.length; t < s; t++) i[t].isDataTexture ? e.push(tM(i[t].image)) : e.push(tM(i[t]));
      } else e = tM(i);
      s.url = e;
    }
    return t || (e.images[this.uuid] = s), s;
  }
}
function tM(e) {
  return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap ? KA.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : {};
}
let sM = 0;
class iM extends bA {
  constructor(e = iM.DEFAULT_IMAGE, t = iM.DEFAULT_MAPPING, s = Fw, i = Fw, n = Ww, a = qw, r = aS, o = Zw, l = iM.DEFAULT_ANISOTROPY, c = nA) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", {
      value: sM++
    }), this.uuid = SA(), this.name = "", this.source = new eM(e), this.mipmaps = [], this.mapping = t, this.wrapS = s, this.wrapT = i, this.magFilter = n, this.minFilter = a, this.anisotropy = l, this.format = r, this.internalFormat = null, this.type = o, this.offset = new DA(0, 0), this.repeat = new DA(1, 1), this.center = new DA(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new LA(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
    const s = {
      metadata: {
        version: 4.5,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      encoding: this.encoding,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (s.userData = this.userData), t || (e.textures[this.uuid] = s), s;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  transformUv(e) {
    if (300 !== this.mapping) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
      case Nw:
        e.x = e.x - Math.floor(e.x);
        break;
      case Fw:
        e.x = e.x < 0 ? 0 : 1;
        break;
      case Uw:
        1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
    }
    if (e.y < 0 || e.y > 1) switch (this.wrapT) {
      case Nw:
        e.y = e.y - Math.floor(e.y);
        break;
      case Fw:
        e.y = e.y < 0 ? 0 : 1;
        break;
      case Uw:
        1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
    }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    !0 === e && (this.version++, this.source.needsUpdate = !0);
  }
}
iM.DEFAULT_IMAGE = null, iM.DEFAULT_MAPPING = 300, iM.DEFAULT_ANISOTROPY = 1;
class nM {
  constructor(e = 0, t = 0, s = 0, i = 1) {
    nM.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = s, this.w = i;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, s, i) {
    return this.x = e, this.y = t, this.z = s, this.w = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x,
      s = this.y,
      i = this.z,
      n = this.w,
      a = e.elements;
    return this.x = a[0] * t + a[4] * s + a[8] * i + a[12] * n, this.y = a[1] * t + a[5] * s + a[9] * i + a[13] * n, this.z = a[2] * t + a[6] * s + a[10] * i + a[14] * n, this.w = a[3] * t + a[7] * s + a[11] * i + a[15] * n, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, s, i, n;
    const a = .01,
      r = .1,
      o = e.elements,
      l = o[0],
      c = o[4],
      h = o[8],
      u = o[1],
      d = o[5],
      p = o[9],
      m = o[2],
      f = o[6],
      g = o[10];
    if (Math.abs(c - u) < a && Math.abs(h - m) < a && Math.abs(p - f) < a) {
      if (Math.abs(c + u) < r && Math.abs(h + m) < r && Math.abs(p + f) < r && Math.abs(l + d + g - 3) < r) return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const e = (l + 1) / 2,
        o = (d + 1) / 2,
        v = (g + 1) / 2,
        b = (c + u) / 4,
        y = (h + m) / 4,
        _ = (p + f) / 4;
      return e > o && e > v ? e < a ? (s = 0, i = .707106781, n = .707106781) : (s = Math.sqrt(e), i = b / s, n = y / s) : o > v ? o < a ? (s = .707106781, i = 0, n = .707106781) : (i = Math.sqrt(o), s = b / i, n = _ / i) : v < a ? (s = .707106781, i = .707106781, n = 0) : (n = Math.sqrt(v), s = y / n, i = _ / n), this.set(s, i, n, t), this;
    }
    let v = Math.sqrt((f - p) * (f - p) + (h - m) * (h - m) + (u - c) * (u - c));
    return Math.abs(v) < .001 && (v = 1), this.x = (f - p) / v, this.y = (h - m) / v, this.z = (u - c) / v, this.w = Math.acos((l + d + g - 1) / 2), this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(t, s)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, s) {
    return this.x = e.x + (t.x - e.x) * s, this.y = e.y + (t.y - e.y) * s, this.z = e.z + (t.z - e.z) * s, this.w = e.w + (t.w - e.w) * s, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class aM extends bA {
  constructor(e = 1, t = 1, s = {}) {
    super(), this.isWebGLRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new nM(0, 0, e, t), this.scissorTest = !1, this.viewport = new nM(0, 0, e, t);
    const i = {
      width: e,
      height: t,
      depth: 1
    };
    this.texture = new iM(i, s.mapping, s.wrapS, s.wrapT, s.magFilter, s.minFilter, s.format, s.type, s.anisotropy, s.encoding), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = void 0 !== s.generateMipmaps && s.generateMipmaps, this.texture.internalFormat = void 0 !== s.internalFormat ? s.internalFormat : null, this.texture.minFilter = void 0 !== s.minFilter ? s.minFilter : Ww, this.depthBuffer = void 0 === s.depthBuffer || s.depthBuffer, this.stencilBuffer = void 0 !== s.stencilBuffer && s.stencilBuffer, this.depthTexture = void 0 !== s.depthTexture ? s.depthTexture : null, this.samples = void 0 !== s.samples ? s.samples : 0;
  }
  setSize(e, t, s = 1) {
    this.width === e && this.height === t && this.depth === s || (this.width = e, this.height = t, this.depth = s, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = s, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new eM(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class rM extends iM {
  constructor(e = null, t = 1, s = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: s,
      depth: i
    }, this.magFilter = Hw, this.minFilter = Hw, this.wrapR = Fw, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class oM extends iM {
  constructor(e = null, t = 1, s = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: s,
      depth: i
    }, this.magFilter = Hw, this.minFilter = Hw, this.wrapR = Fw, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class lM {
  constructor(e = new HA(Infinity, Infinity, Infinity), t = new HA(-Infinity, -Infinity, -Infinity)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    let t = Infinity,
      s = Infinity,
      i = Infinity,
      n = -Infinity,
      a = -Infinity,
      r = -Infinity;
    for (let o = 0, l = e.length; o < l; o += 3) {
      const l = e[o],
        c = e[o + 1],
        h = e[o + 2];
      l < t && (t = l), c < s && (s = c), h < i && (i = h), l > n && (n = l), c > a && (a = c), h > r && (r = h);
    }
    return this.min.set(t, s, i), this.max.set(n, a, r), this;
  }
  setFromBufferAttribute(e) {
    let t = Infinity,
      s = Infinity,
      i = Infinity,
      n = -Infinity,
      a = -Infinity,
      r = -Infinity;
    for (let o = 0, l = e.count; o < l; o++) {
      const l = e.getX(o),
        c = e.getY(o),
        h = e.getZ(o);
      l < t && (t = l), c < s && (s = c), h < i && (i = h), l > n && (n = l), c > a && (a = c), h > r && (r = h);
    }
    return this.min.set(t, s, i), this.max.set(n, a, r), this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, s = e.length; t < s; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const s = hM.copy(t).multiplyScalar(.5);
    return this.min.copy(e).sub(s), this.max.copy(e).add(s), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const s = e.geometry;
    if (void 0 !== s) if (t && null != s.attributes && void 0 !== s.attributes.position) {
      const t = s.attributes.position;
      for (let s = 0, i = t.count; s < i; s++) hM.fromBufferAttribute(t, s).applyMatrix4(e.matrixWorld), this.expandByPoint(hM);
    } else null === s.boundingBox && s.computeBoundingBox(), uM.copy(s.boundingBox), uM.applyMatrix4(e.matrixWorld), this.union(uM);
    const i = e.children;
    for (let n = 0, a = i.length; n < a; n++) this.expandByObject(i[n], t);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, hM), hM.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, s;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, s = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, s = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, s += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, s += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, s += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, s += e.normal.z * this.min.z), t <= -e.constant && s >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(bM), yM.subVectors(this.max, bM), dM.subVectors(e.a, bM), pM.subVectors(e.b, bM), mM.subVectors(e.c, bM), fM.subVectors(pM, dM), gM.subVectors(mM, pM), vM.subVectors(dM, mM);
    let t = [0, -fM.z, fM.y, 0, -gM.z, gM.y, 0, -vM.z, vM.y, fM.z, 0, -fM.x, gM.z, 0, -gM.x, vM.z, 0, -vM.x, -fM.y, fM.x, 0, -gM.y, gM.x, 0, -vM.y, vM.x, 0];
    return !!wM(t, dM, pM, mM, yM) && (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!wM(t, dM, pM, mM, yM) && (_M.crossVectors(fM, gM), t = [_M.x, _M.y, _M.z], wM(t, dM, pM, mM, yM)));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, hM).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = .5 * this.getSize(hM).length()), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() || (cM[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), cM[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), cM[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), cM[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), cM[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), cM[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), cM[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), cM[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(cM)), this;
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const cM = [new HA(), new HA(), new HA(), new HA(), new HA(), new HA(), new HA(), new HA()],
  hM = new HA(),
  uM = new lM(),
  dM = new HA(),
  pM = new HA(),
  mM = new HA(),
  fM = new HA(),
  gM = new HA(),
  vM = new HA(),
  bM = new HA(),
  yM = new HA(),
  _M = new HA(),
  xM = new HA();
function wM(e, t, s, i, n) {
  for (let a = 0, r = e.length - 3; a <= r; a += 3) {
    xM.fromArray(e, a);
    const r = n.x * Math.abs(xM.x) + n.y * Math.abs(xM.y) + n.z * Math.abs(xM.z),
      o = t.dot(xM),
      l = s.dot(xM),
      c = i.dot(xM);
    if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > r) return !1;
  }
  return !0;
}
const SM = new lM(),
  AM = new HA(),
  MM = new HA();
class CM {
  constructor(e = new HA(), t = -1) {
    this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const s = this.center;
    void 0 !== t ? s.copy(t) : SM.setFromPoints(e).getCenter(s);
    let i = 0;
    for (let n = 0, a = e.length; n < a; n++) i = Math.max(i, s.distanceToSquared(e[n]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const s = this.center.distanceToSquared(e);
    return t.copy(e), s > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
    AM.subVectors(e, this.center);
    const t = AM.lengthSq();
    if (t > this.radius * this.radius) {
      const e = Math.sqrt(t),
        s = .5 * (e - this.radius);
      this.center.addScaledVector(AM, s / e), this.radius += s;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (!0 === this.center.equals(e.center) ? this.radius = Math.max(this.radius, e.radius) : (MM.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(AM.copy(e.center).add(MM)), this.expandByPoint(AM.copy(e.center).sub(MM))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const PM = new HA(),
  TM = new HA(),
  EM = new HA(),
  BM = new HA(),
  IM = new HA(),
  kM = new HA(),
  DM = new HA();
class LM {
  constructor(e = new HA(), t = new HA(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, PM)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const s = t.dot(this.direction);
    return s < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, s);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = PM.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (PM.copy(this.origin).addScaledVector(this.direction, t), PM.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, s, i) {
    TM.copy(e).add(t).multiplyScalar(.5), EM.copy(t).sub(e).normalize(), BM.copy(this.origin).sub(TM);
    const n = .5 * e.distanceTo(t),
      a = -this.direction.dot(EM),
      r = BM.dot(this.direction),
      o = -BM.dot(EM),
      l = BM.lengthSq(),
      c = Math.abs(1 - a * a);
    let h, u, d, p;
    if (c > 0) {
      if (h = a * o - r, u = a * r - o, p = n * c, h >= 0) {
        if (u >= -p) {
          if (u <= p) {
            const e = 1 / c;
            h *= e, u *= e, d = h * (h + a * u + 2 * r) + u * (a * h + u + 2 * o) + l;
          } else u = n, h = Math.max(0, -(a * u + r)), d = -h * h + u * (u + 2 * o) + l;
        } else u = -n, h = Math.max(0, -(a * u + r)), d = -h * h + u * (u + 2 * o) + l;
      } else u <= -p ? (h = Math.max(0, -(-a * n + r)), u = h > 0 ? -n : Math.min(Math.max(-n, -o), n), d = -h * h + u * (u + 2 * o) + l) : u <= p ? (h = 0, u = Math.min(Math.max(-n, -o), n), d = u * (u + 2 * o) + l) : (h = Math.max(0, -(a * n + r)), u = h > 0 ? n : Math.min(Math.max(-n, -o), n), d = -h * h + u * (u + 2 * o) + l);
    } else u = a > 0 ? -n : n, h = Math.max(0, -(a * u + r)), d = -h * h + u * (u + 2 * o) + l;
    return s && s.copy(this.origin).addScaledVector(this.direction, h), i && i.copy(TM).addScaledVector(EM, u), d;
  }
  intersectSphere(e, t) {
    PM.subVectors(e.center, this.origin);
    const s = PM.dot(this.direction),
      i = PM.dot(PM) - s * s,
      n = e.radius * e.radius;
    if (i > n) return null;
    const a = Math.sqrt(n - i),
      r = s - a,
      o = s + a;
    return o < 0 ? null : r < 0 ? this.at(o, t) : this.at(r, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
    const s = -(this.origin.dot(e.normal) + e.constant) / t;
    return s >= 0 ? s : null;
  }
  intersectPlane(e, t) {
    const s = this.distanceToPlane(e);
    return null === s ? null : this.at(s, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    if (0 === t) return !0;
    return e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let s, i, n, a, r, o;
    const l = 1 / this.direction.x,
      c = 1 / this.direction.y,
      h = 1 / this.direction.z,
      u = this.origin;
    return l >= 0 ? (s = (e.min.x - u.x) * l, i = (e.max.x - u.x) * l) : (s = (e.max.x - u.x) * l, i = (e.min.x - u.x) * l), c >= 0 ? (n = (e.min.y - u.y) * c, a = (e.max.y - u.y) * c) : (n = (e.max.y - u.y) * c, a = (e.min.y - u.y) * c), s > a || n > i ? null : ((n > s || isNaN(s)) && (s = n), (a < i || isNaN(i)) && (i = a), h >= 0 ? (r = (e.min.z - u.z) * h, o = (e.max.z - u.z) * h) : (r = (e.max.z - u.z) * h, o = (e.min.z - u.z) * h), s > o || r > i ? null : ((r > s || s != s) && (s = r), (o < i || i != i) && (i = o), i < 0 ? null : this.at(s >= 0 ? s : i, t)));
  }
  intersectsBox(e) {
    return null !== this.intersectBox(e, PM);
  }
  intersectTriangle(e, t, s, i, n) {
    IM.subVectors(t, e), kM.subVectors(s, e), DM.crossVectors(IM, kM);
    let a,
      r = this.direction.dot(DM);
    if (r > 0) {
      if (i) return null;
      a = 1;
    } else {
      if (!(r < 0)) return null;
      a = -1, r = -r;
    }
    BM.subVectors(this.origin, e);
    const o = a * this.direction.dot(kM.crossVectors(BM, kM));
    if (o < 0) return null;
    const l = a * this.direction.dot(IM.cross(BM));
    if (l < 0) return null;
    if (o + l > r) return null;
    const c = -a * BM.dot(DM);
    return c < 0 ? null : this.at(c / r, n);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class OM {
  constructor() {
    OM.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  set(e, t, s, i, n, a, r, o, l, c, h, u, d, p, m, f) {
    const g = this.elements;
    return g[0] = e, g[4] = t, g[8] = s, g[12] = i, g[1] = n, g[5] = a, g[9] = r, g[13] = o, g[2] = l, g[6] = c, g[10] = h, g[14] = u, g[3] = d, g[7] = p, g[11] = m, g[15] = f, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new OM().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements,
      s = e.elements;
    return t[0] = s[0], t[1] = s[1], t[2] = s[2], t[3] = s[3], t[4] = s[4], t[5] = s[5], t[6] = s[6], t[7] = s[7], t[8] = s[8], t[9] = s[9], t[10] = s[10], t[11] = s[11], t[12] = s[12], t[13] = s[13], t[14] = s[14], t[15] = s[15], this;
  }
  copyPosition(e) {
    const t = this.elements,
      s = e.elements;
    return t[12] = s[12], t[13] = s[13], t[14] = s[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(e, t, s) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), s.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, s) {
    return this.set(e.x, t.x, s.x, 0, e.y, t.y, s.y, 0, e.z, t.z, s.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(e) {
    const t = this.elements,
      s = e.elements,
      i = 1 / RM.setFromMatrixColumn(e, 0).length(),
      n = 1 / RM.setFromMatrixColumn(e, 1).length(),
      a = 1 / RM.setFromMatrixColumn(e, 2).length();
    return t[0] = s[0] * i, t[1] = s[1] * i, t[2] = s[2] * i, t[3] = 0, t[4] = s[4] * n, t[5] = s[5] * n, t[6] = s[6] * n, t[7] = 0, t[8] = s[8] * a, t[9] = s[9] * a, t[10] = s[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements,
      s = e.x,
      i = e.y,
      n = e.z,
      a = Math.cos(s),
      r = Math.sin(s),
      o = Math.cos(i),
      l = Math.sin(i),
      c = Math.cos(n),
      h = Math.sin(n);
    if ("XYZ" === e.order) {
      const e = a * c,
        s = a * h,
        i = r * c,
        n = r * h;
      t[0] = o * c, t[4] = -o * h, t[8] = l, t[1] = s + i * l, t[5] = e - n * l, t[9] = -r * o, t[2] = n - e * l, t[6] = i + s * l, t[10] = a * o;
    } else if ("YXZ" === e.order) {
      const e = o * c,
        s = o * h,
        i = l * c,
        n = l * h;
      t[0] = e + n * r, t[4] = i * r - s, t[8] = a * l, t[1] = a * h, t[5] = a * c, t[9] = -r, t[2] = s * r - i, t[6] = n + e * r, t[10] = a * o;
    } else if ("ZXY" === e.order) {
      const e = o * c,
        s = o * h,
        i = l * c,
        n = l * h;
      t[0] = e - n * r, t[4] = -a * h, t[8] = i + s * r, t[1] = s + i * r, t[5] = a * c, t[9] = n - e * r, t[2] = -a * l, t[6] = r, t[10] = a * o;
    } else if ("ZYX" === e.order) {
      const e = a * c,
        s = a * h,
        i = r * c,
        n = r * h;
      t[0] = o * c, t[4] = i * l - s, t[8] = e * l + n, t[1] = o * h, t[5] = n * l + e, t[9] = s * l - i, t[2] = -l, t[6] = r * o, t[10] = a * o;
    } else if ("YZX" === e.order) {
      const e = a * o,
        s = a * l,
        i = r * o,
        n = r * l;
      t[0] = o * c, t[4] = n - e * h, t[8] = i * h + s, t[1] = h, t[5] = a * c, t[9] = -r * c, t[2] = -l * c, t[6] = s * h + i, t[10] = e - n * h;
    } else if ("XZY" === e.order) {
      const e = a * o,
        s = a * l,
        i = r * o,
        n = r * l;
      t[0] = o * c, t[4] = -h, t[8] = l * c, t[1] = e * h + n, t[5] = a * c, t[9] = s * h - i, t[2] = i * h - s, t[6] = r * c, t[10] = n * h + e;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(NM, e, FM);
  }
  lookAt(e, t, s) {
    const i = this.elements;
    return GM.subVectors(e, t), 0 === GM.lengthSq() && (GM.z = 1), GM.normalize(), UM.crossVectors(s, GM), 0 === UM.lengthSq() && (1 === Math.abs(s.z) ? GM.x += 1e-4 : GM.z += 1e-4, GM.normalize(), UM.crossVectors(s, GM)), UM.normalize(), HM.crossVectors(GM, UM), i[0] = UM.x, i[4] = HM.x, i[8] = GM.x, i[1] = UM.y, i[5] = HM.y, i[9] = GM.y, i[2] = UM.z, i[6] = HM.z, i[10] = GM.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const s = e.elements,
      i = t.elements,
      n = this.elements,
      a = s[0],
      r = s[4],
      o = s[8],
      l = s[12],
      c = s[1],
      h = s[5],
      u = s[9],
      d = s[13],
      p = s[2],
      m = s[6],
      f = s[10],
      g = s[14],
      v = s[3],
      b = s[7],
      y = s[11],
      _ = s[15],
      x = i[0],
      w = i[4],
      S = i[8],
      A = i[12],
      M = i[1],
      C = i[5],
      P = i[9],
      T = i[13],
      E = i[2],
      B = i[6],
      I = i[10],
      k = i[14],
      D = i[3],
      L = i[7],
      O = i[11],
      R = i[15];
    return n[0] = a * x + r * M + o * E + l * D, n[4] = a * w + r * C + o * B + l * L, n[8] = a * S + r * P + o * I + l * O, n[12] = a * A + r * T + o * k + l * R, n[1] = c * x + h * M + u * E + d * D, n[5] = c * w + h * C + u * B + d * L, n[9] = c * S + h * P + u * I + d * O, n[13] = c * A + h * T + u * k + d * R, n[2] = p * x + m * M + f * E + g * D, n[6] = p * w + m * C + f * B + g * L, n[10] = p * S + m * P + f * I + g * O, n[14] = p * A + m * T + f * k + g * R, n[3] = v * x + b * M + y * E + _ * D, n[7] = v * w + b * C + y * B + _ * L, n[11] = v * S + b * P + y * I + _ * O, n[15] = v * A + b * T + y * k + _ * R, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      s = e[4],
      i = e[8],
      n = e[12],
      a = e[1],
      r = e[5],
      o = e[9],
      l = e[13],
      c = e[2],
      h = e[6],
      u = e[10],
      d = e[14];
    return e[3] * (+n * o * h - i * l * h - n * r * u + s * l * u + i * r * d - s * o * d) + e[7] * (+t * o * d - t * l * u + n * a * u - i * a * d + i * l * c - n * o * c) + e[11] * (+t * l * h - t * r * d - n * a * h + s * a * d + n * r * c - s * l * c) + e[15] * (-i * r * c - t * o * h + t * r * u + i * a * h - s * a * u + s * o * c);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, s) {
    const i = this.elements;
    return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = s), this;
  }
  invert() {
    const e = this.elements,
      t = e[0],
      s = e[1],
      i = e[2],
      n = e[3],
      a = e[4],
      r = e[5],
      o = e[6],
      l = e[7],
      c = e[8],
      h = e[9],
      u = e[10],
      d = e[11],
      p = e[12],
      m = e[13],
      f = e[14],
      g = e[15],
      v = h * f * l - m * u * l + m * o * d - r * f * d - h * o * g + r * u * g,
      b = p * u * l - c * f * l - p * o * d + a * f * d + c * o * g - a * u * g,
      y = c * m * l - p * h * l + p * r * d - a * m * d - c * r * g + a * h * g,
      _ = p * h * o - c * m * o - p * r * u + a * m * u + c * r * f - a * h * f,
      x = t * v + s * b + i * y + n * _;
    if (0 === x) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const w = 1 / x;
    return e[0] = v * w, e[1] = (m * u * n - h * f * n - m * i * d + s * f * d + h * i * g - s * u * g) * w, e[2] = (r * f * n - m * o * n + m * i * l - s * f * l - r * i * g + s * o * g) * w, e[3] = (h * o * n - r * u * n - h * i * l + s * u * l + r * i * d - s * o * d) * w, e[4] = b * w, e[5] = (c * f * n - p * u * n + p * i * d - t * f * d - c * i * g + t * u * g) * w, e[6] = (p * o * n - a * f * n - p * i * l + t * f * l + a * i * g - t * o * g) * w, e[7] = (a * u * n - c * o * n + c * i * l - t * u * l - a * i * d + t * o * d) * w, e[8] = y * w, e[9] = (p * h * n - c * m * n - p * s * d + t * m * d + c * s * g - t * h * g) * w, e[10] = (a * m * n - p * r * n + p * s * l - t * m * l - a * s * g + t * r * g) * w, e[11] = (c * r * n - a * h * n - c * s * l + t * h * l + a * s * d - t * r * d) * w, e[12] = _ * w, e[13] = (c * m * i - p * h * i + p * s * u - t * m * u - c * s * f + t * h * f) * w, e[14] = (p * r * i - a * m * i - p * s * o + t * m * o + a * s * f - t * r * f) * w, e[15] = (a * h * i - c * r * i + c * s * o - t * h * o - a * s * u + t * r * u) * w, this;
  }
  scale(e) {
    const t = this.elements,
      s = e.x,
      i = e.y,
      n = e.z;
    return t[0] *= s, t[4] *= i, t[8] *= n, t[1] *= s, t[5] *= i, t[9] *= n, t[2] *= s, t[6] *= i, t[10] *= n, t[3] *= s, t[7] *= i, t[11] *= n, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements,
      t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
      s = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
      i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, s, i));
  }
  makeTranslation(e, t, s) {
    return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, s, 0, 0, 0, 1), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e),
      s = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -s, 0, 0, s, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e),
      s = Math.sin(e);
    return this.set(t, 0, s, 0, 0, 1, 0, 0, -s, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e),
      s = Math.sin(e);
    return this.set(t, -s, 0, 0, s, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    const s = Math.cos(t),
      i = Math.sin(t),
      n = 1 - s,
      a = e.x,
      r = e.y,
      o = e.z,
      l = n * a,
      c = n * r;
    return this.set(l * a + s, l * r - i * o, l * o + i * r, 0, l * r + i * o, c * r + s, c * o - i * a, 0, l * o - i * r, c * o + i * a, n * o * o + s, 0, 0, 0, 0, 1), this;
  }
  makeScale(e, t, s) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, s, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, s, i, n, a) {
    return this.set(1, s, n, 0, e, 1, a, 0, t, i, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, s) {
    const i = this.elements,
      n = t._x,
      a = t._y,
      r = t._z,
      o = t._w,
      l = n + n,
      c = a + a,
      h = r + r,
      u = n * l,
      d = n * c,
      p = n * h,
      m = a * c,
      f = a * h,
      g = r * h,
      v = o * l,
      b = o * c,
      y = o * h,
      _ = s.x,
      x = s.y,
      w = s.z;
    return i[0] = (1 - (m + g)) * _, i[1] = (d + y) * _, i[2] = (p - b) * _, i[3] = 0, i[4] = (d - y) * x, i[5] = (1 - (u + g)) * x, i[6] = (f + v) * x, i[7] = 0, i[8] = (p + b) * w, i[9] = (f - v) * w, i[10] = (1 - (u + m)) * w, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this;
  }
  decompose(e, t, s) {
    const i = this.elements;
    let n = RM.set(i[0], i[1], i[2]).length();
    const a = RM.set(i[4], i[5], i[6]).length(),
      r = RM.set(i[8], i[9], i[10]).length();
    this.determinant() < 0 && (n = -n), e.x = i[12], e.y = i[13], e.z = i[14], zM.copy(this);
    const o = 1 / n,
      l = 1 / a,
      c = 1 / r;
    return zM.elements[0] *= o, zM.elements[1] *= o, zM.elements[2] *= o, zM.elements[4] *= l, zM.elements[5] *= l, zM.elements[6] *= l, zM.elements[8] *= c, zM.elements[9] *= c, zM.elements[10] *= c, t.setFromRotationMatrix(zM), s.x = n, s.y = a, s.z = r, this;
  }
  makePerspective(e, t, s, i, n, a) {
    const r = this.elements,
      o = 2 * n / (t - e),
      l = 2 * n / (s - i),
      c = (t + e) / (t - e),
      h = (s + i) / (s - i),
      u = -(a + n) / (a - n),
      d = -2 * a * n / (a - n);
    return r[0] = o, r[4] = 0, r[8] = c, r[12] = 0, r[1] = 0, r[5] = l, r[9] = h, r[13] = 0, r[2] = 0, r[6] = 0, r[10] = u, r[14] = d, r[3] = 0, r[7] = 0, r[11] = -1, r[15] = 0, this;
  }
  makeOrthographic(e, t, s, i, n, a) {
    const r = this.elements,
      o = 1 / (t - e),
      l = 1 / (s - i),
      c = 1 / (a - n),
      h = (t + e) * o,
      u = (s + i) * l,
      d = (a + n) * c;
    return r[0] = 2 * o, r[4] = 0, r[8] = 0, r[12] = -h, r[1] = 0, r[5] = 2 * l, r[9] = 0, r[13] = -u, r[2] = 0, r[6] = 0, r[10] = -2 * c, r[14] = -d, r[3] = 0, r[7] = 0, r[11] = 0, r[15] = 1, this;
  }
  equals(e) {
    const t = this.elements,
      s = e.elements;
    for (let i = 0; i < 16; i++) if (t[i] !== s[i]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let s = 0; s < 16; s++) this.elements[s] = e[s + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const s = this.elements;
    return e[t] = s[0], e[t + 1] = s[1], e[t + 2] = s[2], e[t + 3] = s[3], e[t + 4] = s[4], e[t + 5] = s[5], e[t + 6] = s[6], e[t + 7] = s[7], e[t + 8] = s[8], e[t + 9] = s[9], e[t + 10] = s[10], e[t + 11] = s[11], e[t + 12] = s[12], e[t + 13] = s[13], e[t + 14] = s[14], e[t + 15] = s[15], e;
  }
}
const RM = new HA(),
  zM = new OM(),
  NM = new HA(0, 0, 0),
  FM = new HA(1, 1, 1),
  UM = new HA(),
  HM = new HA(),
  GM = new HA(),
  VM = new OM(),
  WM = new UA();
class jM {
  constructor(e = 0, t = 0, s = 0, i = jM.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = s, this._order = i;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, s, i = this._order) {
    return this._x = e, this._y = t, this._z = s, this._order = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, s = !0) {
    const i = e.elements,
      n = i[0],
      a = i[4],
      r = i[8],
      o = i[1],
      l = i[5],
      c = i[9],
      h = i[2],
      u = i[6],
      d = i[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(AA(r, -1, 1)), Math.abs(r) < .9999999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-a, n)) : (this._x = Math.atan2(u, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-AA(c, -1, 1)), Math.abs(c) < .9999999 ? (this._y = Math.atan2(r, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-h, n), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(AA(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(o, n));
        break;
      case "ZYX":
        this._y = Math.asin(-AA(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(u, d), this._z = Math.atan2(o, n)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(AA(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-h, n)) : (this._x = 0, this._y = Math.atan2(r, d));
        break;
      case "XZY":
        this._z = Math.asin(-AA(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(r, n)) : (this._x = Math.atan2(-c, d), this._y = 0);
    }
    return this._order = t, !0 === s && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, s) {
    return VM.makeRotationFromQuaternion(e), this.setFromRotationMatrix(VM, t, s);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return WM.setFromEuler(this), this.setFromQuaternion(WM, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
jM.DEFAULT_ORDER = "XYZ";
class qM {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return 0 != (this.mask & e.mask);
  }
  isEnabled(e) {
    return 0 != (this.mask & (1 << e | 0));
  }
}
let ZM = 0;
const $M = new HA(),
  XM = new UA(),
  YM = new OM(),
  JM = new HA(),
  QM = new HA(),
  KM = new HA(),
  eC = new UA(),
  tC = new HA(1, 0, 0),
  sC = new HA(0, 1, 0),
  iC = new HA(0, 0, 1),
  nC = {
    type: "added"
  },
  aC = {
    type: "removed"
  };
class rC extends bA {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
      value: ZM++
    }), this.uuid = SA(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = rC.DEFAULT_UP.clone();
    const e = new HA(),
      t = new jM(),
      s = new UA(),
      i = new HA(1, 1, 1);
    t._onChange(function () {
      s.setFromEuler(t, !1);
    }), s._onChange(function () {
      t.setFromQuaternion(s, void 0, !1);
    }), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: s
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      modelViewMatrix: {
        value: new OM()
      },
      normalMatrix: {
        value: new LA()
      }
    }), this.matrix = new OM(), this.matrixWorld = new OM(), this.matrixAutoUpdate = rC.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = rC.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new qM(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return XM.setFromAxisAngle(e, t), this.quaternion.multiply(XM), this;
  }
  rotateOnWorldAxis(e, t) {
    return XM.setFromAxisAngle(e, t), this.quaternion.premultiply(XM), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(tC, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(sC, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(iC, e);
  }
  translateOnAxis(e, t) {
    return $M.copy(e).applyQuaternion(this.quaternion), this.position.add($M.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(tC, e);
  }
  translateY(e) {
    return this.translateOnAxis(sC, e);
  }
  translateZ(e) {
    return this.translateOnAxis(iC, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(YM.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, s) {
    e.isVector3 ? JM.copy(e) : JM.set(e, t, s);
    const i = this.parent;
    this.updateWorldMatrix(!0, !1), QM.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? YM.lookAt(QM, JM, this.up) : YM.lookAt(JM, QM, this.up), this.quaternion.setFromRotationMatrix(YM), i && (YM.extractRotation(i.matrixWorld), XM.setFromRotationMatrix(YM), this.quaternion.premultiply(XM.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return e === this || e && e.isObject3D && (null !== e.parent && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(nC)), this;
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
      return this;
    }
    const t = this.children.indexOf(e);
    return -1 !== t && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(aC)), this;
  }
  removeFromParent() {
    const e = this.parent;
    return null !== e && e.remove(this), this;
  }
  clear() {
    for (let e = 0; e < this.children.length; e++) {
      const t = this.children[e];
      t.parent = null, t.dispatchEvent(aC);
    }
    return this.children.length = 0, this;
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), YM.copy(this.matrixWorld).invert(), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), YM.multiply(e.parent.matrixWorld)), e.applyMatrix4(YM), this.add(e), e.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let s = 0, i = this.children.length; s < i; s++) {
      const i = this.children[s].getObjectByProperty(e, t);
      if (void 0 !== i) return i;
    }
  }
  getObjectsByProperty(e, t) {
    let s = [];
    this[e] === t && s.push(this);
    for (let i = 0, n = this.children.length; i < n; i++) {
      const n = this.children[i].getObjectsByProperty(e, t);
      n.length > 0 && (s = s.concat(n));
    }
    return s;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(QM, e, KM), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(QM, eC, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const t = this.children;
    for (let s = 0, i = t.length; s < i; s++) t[s].traverse(e);
  }
  traverseVisible(e) {
    if (!1 === this.visible) return;
    e(this);
    const t = this.children;
    for (let s = 0, i = t.length; s < i; s++) t[s].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    null !== t && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let s = 0, i = t.length; s < i; s++) {
      const i = t[s];
      !0 !== i.matrixWorldAutoUpdate && !0 !== e || i.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const s = this.parent;
    if (!0 === e && null !== s && !0 === s.matrixWorldAutoUpdate && s.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t) {
      const e = this.children;
      for (let t = 0, s = e.length; t < s; t++) {
        const s = e[t];
        !0 === s.matrixWorldAutoUpdate && s.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e,
      s = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, s.metadata = {
      version: 4.5,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const i = {};
    function n(t, s) {
      return void 0 === t[s.uuid] && (t[s.uuid] = s.toJSON(e)), s.uuid;
    }
    if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (i.instanceColor = this.instanceColor.toJSON())), this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && !0 !== this.environment.isRenderTargetTexture && (i.environment = this.environment.toJSON(e).uuid);else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = n(e.geometries, this.geometry);
      const t = this.geometry.parameters;
      if (void 0 !== t && void 0 !== t.shapes) {
        const s = t.shapes;
        if (Array.isArray(s)) for (let t = 0, i = s.length; t < i; t++) {
          const i = s[t];
          n(e.shapes, i);
        } else n(e.shapes, s);
      }
    }
    if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (n(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
      const t = [];
      for (let s = 0, i = this.material.length; s < i; s++) t.push(n(e.materials, this.material[s]));
      i.material = t;
    } else i.material = n(e.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let t = 0; t < this.children.length; t++) i.children.push(this.children[t].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let t = 0; t < this.animations.length; t++) {
        const s = this.animations[t];
        i.animations.push(n(e.animations, s));
      }
    }
    if (t) {
      const t = a(e.geometries),
        i = a(e.materials),
        n = a(e.textures),
        r = a(e.images),
        o = a(e.shapes),
        l = a(e.skeletons),
        c = a(e.animations),
        h = a(e.nodes);
      t.length > 0 && (s.geometries = t), i.length > 0 && (s.materials = i), n.length > 0 && (s.textures = n), r.length > 0 && (s.images = r), o.length > 0 && (s.shapes = o), l.length > 0 && (s.skeletons = l), c.length > 0 && (s.animations = c), h.length > 0 && (s.nodes = h);
    }
    return s.object = i, s;
    function a(e) {
      const t = [];
      for (const s in e) {
        const i = e[s];
        delete i.metadata, t.push(i);
      }
      return t;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t) for (let s = 0; s < e.children.length; s++) {
      const t = e.children[s];
      this.add(t.clone());
    }
    return this;
  }
}
rC.DEFAULT_UP = new HA(0, 1, 0), rC.DEFAULT_MATRIX_AUTO_UPDATE = !0, rC.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const oC = new HA(),
  lC = new HA(),
  cC = new HA(),
  hC = new HA(),
  uC = new HA(),
  dC = new HA(),
  pC = new HA(),
  mC = new HA(),
  fC = new HA(),
  gC = new HA();
class vC {
  constructor(e = new HA(), t = new HA(), s = new HA()) {
    this.a = e, this.b = t, this.c = s;
  }
  static getNormal(e, t, s, i) {
    i.subVectors(s, t), oC.subVectors(e, t), i.cross(oC);
    const n = i.lengthSq();
    return n > 0 ? i.multiplyScalar(1 / Math.sqrt(n)) : i.set(0, 0, 0);
  }
  static getBarycoord(e, t, s, i, n) {
    oC.subVectors(i, t), lC.subVectors(s, t), cC.subVectors(e, t);
    const a = oC.dot(oC),
      r = oC.dot(lC),
      o = oC.dot(cC),
      l = lC.dot(lC),
      c = lC.dot(cC),
      h = a * l - r * r;
    if (0 === h) return n.set(-2, -1, -1);
    const u = 1 / h,
      d = (l * o - r * c) * u,
      p = (a * c - r * o) * u;
    return n.set(1 - d - p, p, d);
  }
  static containsPoint(e, t, s, i) {
    return this.getBarycoord(e, t, s, i, hC), hC.x >= 0 && hC.y >= 0 && hC.x + hC.y <= 1;
  }
  static getUV(e, t, s, i, n, a, r, o) {
    return this.getBarycoord(e, t, s, i, hC), o.set(0, 0), o.addScaledVector(n, hC.x), o.addScaledVector(a, hC.y), o.addScaledVector(r, hC.z), o;
  }
  static isFrontFacing(e, t, s, i) {
    return oC.subVectors(s, t), lC.subVectors(e, t), oC.cross(lC).dot(i) < 0;
  }
  set(e, t, s) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(s), this;
  }
  setFromPointsAndIndices(e, t, s, i) {
    return this.a.copy(e[t]), this.b.copy(e[s]), this.c.copy(e[i]), this;
  }
  setFromAttributeAndIndices(e, t, s, i) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, s), this.c.fromBufferAttribute(e, i), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return oC.subVectors(this.c, this.b), lC.subVectors(this.a, this.b), .5 * oC.cross(lC).length();
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return vC.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return vC.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, s, i, n) {
    return vC.getUV(e, this.a, this.b, this.c, t, s, i, n);
  }
  containsPoint(e) {
    return vC.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return vC.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const s = this.a,
      i = this.b,
      n = this.c;
    let a, r;
    uC.subVectors(i, s), dC.subVectors(n, s), mC.subVectors(e, s);
    const o = uC.dot(mC),
      l = dC.dot(mC);
    if (o <= 0 && l <= 0) return t.copy(s);
    fC.subVectors(e, i);
    const c = uC.dot(fC),
      h = dC.dot(fC);
    if (c >= 0 && h <= c) return t.copy(i);
    const u = o * h - c * l;
    if (u <= 0 && o >= 0 && c <= 0) return a = o / (o - c), t.copy(s).addScaledVector(uC, a);
    gC.subVectors(e, n);
    const d = uC.dot(gC),
      p = dC.dot(gC);
    if (p >= 0 && d <= p) return t.copy(n);
    const m = d * l - o * p;
    if (m <= 0 && l >= 0 && p <= 0) return r = l / (l - p), t.copy(s).addScaledVector(dC, r);
    const f = c * p - d * h;
    if (f <= 0 && h - c >= 0 && d - p >= 0) return pC.subVectors(n, i), r = (h - c) / (h - c + (d - p)), t.copy(i).addScaledVector(pC, r);
    const g = 1 / (f + m + u);
    return a = m * g, r = u * g, t.copy(s).addScaledVector(uC, a).addScaledVector(dC, r);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
let bC = 0;
class yC extends bA {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
      value: bC++
    }), this.uuid = SA(), this.name = "", this.type = "Material", this.blending = Xx, this.side = jx, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = cw, this.blendDst = hw, this.blendEquation = ew, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = yw, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = pA, this.stencilZFail = pA, this.stencilZPass = pA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (void 0 !== e) for (const t in e) {
      const s = e[t];
      if (void 0 === s) continue;
      const i = this[t];
      void 0 !== i && (i && i.isColor ? i.set(s) : i && i.isVector3 && s && s.isVector3 ? i.copy(s) : this[t] = s);
    }
  }
  toJSON(e) {
    const t = void 0 === e || "string" == typeof e;
    t && (e = {
      textures: {},
      images: {}
    });
    const s = {
      metadata: {
        version: 4.5,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    function i(e) {
      const t = [];
      for (const s in e) {
        const i = e[s];
        delete i.metadata, t.push(i);
      }
      return t;
    }
    if (s.uuid = this.uuid, s.type = this.type, "" !== this.name && (s.name = this.name), this.color && this.color.isColor && (s.color = this.color.getHex()), void 0 !== this.roughness && (s.roughness = this.roughness), void 0 !== this.metalness && (s.metalness = this.metalness), void 0 !== this.sheen && (s.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (s.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (s.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (s.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (s.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (s.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (s.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (s.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (s.shininess = this.shininess), void 0 !== this.clearcoat && (s.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (s.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (s.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (s.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (s.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, s.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), void 0 !== this.iridescence && (s.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (s.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (s.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (s.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (s.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.map && this.map.isTexture && (s.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (s.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (s.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (s.lightMap = this.lightMap.toJSON(e).uuid, s.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (s.aoMap = this.aoMap.toJSON(e).uuid, s.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (s.bumpMap = this.bumpMap.toJSON(e).uuid, s.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (s.normalMap = this.normalMap.toJSON(e).uuid, s.normalMapType = this.normalMapType, s.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (s.displacementMap = this.displacementMap.toJSON(e).uuid, s.displacementScale = this.displacementScale, s.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (s.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (s.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (s.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (s.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (s.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (s.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (s.envMap = this.envMap.toJSON(e).uuid, void 0 !== this.combine && (s.combine = this.combine)), void 0 !== this.envMapIntensity && (s.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (s.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (s.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (s.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.transmission && (s.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (s.transmissionMap = this.transmissionMap.toJSON(e).uuid), void 0 !== this.thickness && (s.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (s.thicknessMap = this.thicknessMap.toJSON(e).uuid), void 0 !== this.attenuationDistance && Infinity !== this.attenuationDistance && (s.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (s.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (s.size = this.size), null !== this.shadowSide && (s.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (s.sizeAttenuation = this.sizeAttenuation), this.blending !== Xx && (s.blending = this.blending), this.side !== jx && (s.side = this.side), this.vertexColors && (s.vertexColors = !0), this.opacity < 1 && (s.opacity = this.opacity), !0 === this.transparent && (s.transparent = this.transparent), s.depthFunc = this.depthFunc, s.depthTest = this.depthTest, s.depthWrite = this.depthWrite, s.colorWrite = this.colorWrite, s.stencilWrite = this.stencilWrite, s.stencilWriteMask = this.stencilWriteMask, s.stencilFunc = this.stencilFunc, s.stencilRef = this.stencilRef, s.stencilFuncMask = this.stencilFuncMask, s.stencilFail = this.stencilFail, s.stencilZFail = this.stencilZFail, s.stencilZPass = this.stencilZPass, void 0 !== this.rotation && 0 !== this.rotation && (s.rotation = this.rotation), !0 === this.polygonOffset && (s.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (s.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (s.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (s.linewidth = this.linewidth), void 0 !== this.dashSize && (s.dashSize = this.dashSize), void 0 !== this.gapSize && (s.gapSize = this.gapSize), void 0 !== this.scale && (s.scale = this.scale), !0 === this.dithering && (s.dithering = !0), this.alphaTest > 0 && (s.alphaTest = this.alphaTest), !0 === this.alphaToCoverage && (s.alphaToCoverage = this.alphaToCoverage), !0 === this.premultipliedAlpha && (s.premultipliedAlpha = this.premultipliedAlpha), !0 === this.forceSinglePass && (s.forceSinglePass = this.forceSinglePass), !0 === this.wireframe && (s.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (s.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (s.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (s.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (s.flatShading = this.flatShading), !1 === this.visible && (s.visible = !1), !1 === this.toneMapped && (s.toneMapped = !1), !1 === this.fog && (s.fog = !1), Object.keys(this.userData).length > 0 && (s.userData = this.userData), t) {
      const t = i(e.textures),
        n = i(e.images);
      t.length > 0 && (s.textures = t), n.length > 0 && (s.images = n);
    }
    return s;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let s = null;
    if (null !== t) {
      const e = t.length;
      s = new Array(e);
      for (let i = 0; i !== e; ++i) s[i] = t[i].clone();
    }
    return this.clippingPlanes = s, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
}
const _C = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
  xC = {
    h: 0,
    s: 0,
    l: 0
  },
  wC = {
    h: 0,
    s: 0,
    l: 0
  };
function SC(e, t, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? e + 6 * (t - e) * s : s < .5 ? t : s < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - s) : e;
}
class AC {
  constructor(e, t, s) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, void 0 === t && void 0 === s ? this.set(e) : this.setRGB(e, t, s);
  }
  set(e) {
    return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = hA) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, JA.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, s, i = JA.workingColorSpace) {
    return this.r = e, this.g = t, this.b = s, JA.toWorkingColorSpace(this, i), this;
  }
  setHSL(e, t, s, i = JA.workingColorSpace) {
    if (e = MA(e, 1), t = AA(t, 0, 1), s = AA(s, 0, 1), 0 === t) this.r = this.g = this.b = s;else {
      const i = s <= .5 ? s * (1 + t) : s + t - s * t,
        n = 2 * s - i;
      this.r = SC(n, i, e + 1 / 3), this.g = SC(n, i, e), this.b = SC(n, i, e - 1 / 3);
    }
    return JA.toWorkingColorSpace(this, i), this;
  }
  setStyle(e, t = hA) {
    function s(e) {
      void 0 !== e && parseFloat(e);
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let e;
      const n = i[1],
        a = i[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (e = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, JA.toWorkingColorSpace(this, t), s(e[4]), this;
          if (e = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, JA.toWorkingColorSpace(this, t), s(e[4]), this;
          break;
        case "hsl":
        case "hsla":
          if (e = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) {
            const i = parseFloat(e[1]) / 360,
              n = parseFloat(e[2]) / 100,
              a = parseFloat(e[3]) / 100;
            return s(e[4]), this.setHSL(i, n, a, t);
          }
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const e = i[1],
        s = e.length;
      if (3 === s) return this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255, this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255, this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255, JA.toWorkingColorSpace(this, t), this;
      if (6 === s) return this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255, this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255, this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255, JA.toWorkingColorSpace(this, t), this;
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = hA) {
    const s = _C[e.toLowerCase()];
    return void 0 !== s && this.setHex(s, t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = WA(e.r), this.g = WA(e.g), this.b = WA(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = jA(e.r), this.g = jA(e.g), this.b = jA(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = hA) {
    return JA.fromWorkingColorSpace(MC.copy(this), e), AA(255 * MC.r, 0, 255) << 16 ^ AA(255 * MC.g, 0, 255) << 8 ^ AA(255 * MC.b, 0, 255) << 0;
  }
  getHexString(e = hA) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = JA.workingColorSpace) {
    JA.fromWorkingColorSpace(MC.copy(this), t);
    const s = MC.r,
      i = MC.g,
      n = MC.b,
      a = Math.max(s, i, n),
      r = Math.min(s, i, n);
    let o, l;
    const c = (r + a) / 2;
    if (r === a) o = 0, l = 0;else {
      const e = a - r;
      switch (l = c <= .5 ? e / (a + r) : e / (2 - a - r), a) {
        case s:
          o = (i - n) / e + (i < n ? 6 : 0);
          break;
        case i:
          o = (n - s) / e + 2;
          break;
        case n:
          o = (s - i) / e + 4;
      }
      o /= 6;
    }
    return e.h = o, e.s = l, e.l = c, e;
  }
  getRGB(e, t = JA.workingColorSpace) {
    return JA.fromWorkingColorSpace(MC.copy(this), t), e.r = MC.r, e.g = MC.g, e.b = MC.b, e;
  }
  getStyle(e = hA) {
    JA.fromWorkingColorSpace(MC.copy(this), e);
    const t = MC.r,
      s = MC.g,
      i = MC.b;
    return e !== hA ? `color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${i.toFixed(3)})` : `rgb(${255 * t | 0},${255 * s | 0},${255 * i | 0})`;
  }
  offsetHSL(e, t, s) {
    return this.getHSL(xC), xC.h += e, xC.s += t, xC.l += s, this.setHSL(xC.h, xC.s, xC.l), this;
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, s) {
    return this.r = e.r + (t.r - e.r) * s, this.g = e.g + (t.g - e.g) * s, this.b = e.b + (t.b - e.b) * s, this;
  }
  lerpHSL(e, t) {
    this.getHSL(xC), e.getHSL(wC);
    const s = CA(xC.h, wC.h, t),
      i = CA(xC.s, wC.s, t),
      n = CA(xC.l, wC.l, t);
    return this.setHSL(s, i, n), this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const MC = new AC();
AC.NAMES = _C;
class CC extends yC {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new AC(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Aw, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const PC = new HA(),
  TC = new DA();
class EC {
  constructor(e, t, s = !1) {
    if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = void 0 !== e ? e.length / t : 0, this.normalized = s, this.usage = mA, this.updateRange = {
      offset: 0,
      count: -1
    }, this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this;
  }
  copyAt(e, t, s) {
    e *= this.itemSize, s *= t.itemSize;
    for (let i = 0, n = this.itemSize; i < n; i++) this.array[e + i] = t.array[s + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (2 === this.itemSize) for (let t = 0, s = this.count; t < s; t++) TC.fromBufferAttribute(this, t), TC.applyMatrix3(e), this.setXY(t, TC.x, TC.y);else if (3 === this.itemSize) for (let t = 0, s = this.count; t < s; t++) PC.fromBufferAttribute(this, t), PC.applyMatrix3(e), this.setXYZ(t, PC.x, PC.y, PC.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, s = this.count; t < s; t++) PC.fromBufferAttribute(this, t), PC.applyMatrix4(e), this.setXYZ(t, PC.x, PC.y, PC.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, s = this.count; t < s; t++) PC.fromBufferAttribute(this, t), PC.applyNormalMatrix(e), this.setXYZ(t, PC.x, PC.y, PC.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, s = this.count; t < s; t++) PC.fromBufferAttribute(this, t), PC.transformDirection(e), this.setXYZ(t, PC.x, PC.y, PC.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, s) {
    return e *= this.itemSize, this.normalized && (t = IA(t, this.array), s = IA(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = s, this;
  }
  setXYZ(e, t, s, i) {
    return e *= this.itemSize, this.normalized && (t = IA(t, this.array), s = IA(s, this.array), i = IA(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = s, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, s, i, n) {
    return e *= this.itemSize, this.normalized && (t = IA(t, this.array), s = IA(s, this.array), i = IA(i, this.array), n = IA(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = s, this.array[e + 2] = i, this.array[e + 3] = n, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return "" !== this.name && (e.name = this.name), this.usage !== mA && (e.usage = this.usage), 0 === this.updateRange.offset && -1 === this.updateRange.count || (e.updateRange = this.updateRange), e;
  }
  copyColorsArray() {}
  copyVector2sArray() {}
  copyVector3sArray() {}
  copyVector4sArray() {}
}
class BC extends EC {
  constructor(e, t, s) {
    super(new Int8Array(e), t, s);
  }
}
class IC extends EC {
  constructor(e, t, s) {
    super(new Uint16Array(e), t, s);
  }
}
class kC extends EC {
  constructor(e, t, s) {
    super(new Uint32Array(e), t, s);
  }
}
class DC extends EC {
  constructor(e, t, s) {
    super(new Float32Array(e), t, s);
  }
}
let LC = 0;
const OC = new OM(),
  RC = new rC(),
  zC = new HA(),
  NC = new lM(),
  FC = new lM(),
  UC = new HA();
class HC extends bA {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
      value: LC++
    }), this.uuid = SA(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: Infinity
    }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (RA(e) ? kC : IC)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return void 0 !== this.attributes[e];
  }
  addGroup(e, t, s = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: s
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
    const s = this.attributes.normal;
    if (void 0 !== s) {
      const t = new LA().getNormalMatrix(e);
      s.applyNormalMatrix(t), s.needsUpdate = !0;
    }
    const i = this.attributes.tangent;
    return void 0 !== i && (i.transformDirection(e), i.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return OC.makeRotationFromQuaternion(e), this.applyMatrix4(OC), this;
  }
  rotateX(e) {
    return OC.makeRotationX(e), this.applyMatrix4(OC), this;
  }
  rotateY(e) {
    return OC.makeRotationY(e), this.applyMatrix4(OC), this;
  }
  rotateZ(e) {
    return OC.makeRotationZ(e), this.applyMatrix4(OC), this;
  }
  translate(e, t, s) {
    return OC.makeTranslation(e, t, s), this.applyMatrix4(OC), this;
  }
  scale(e, t, s) {
    return OC.makeScale(e, t, s), this.applyMatrix4(OC), this;
  }
  lookAt(e) {
    return RC.lookAt(e), RC.updateMatrix(), this.applyMatrix4(RC.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(zC).negate(), this.translate(zC.x, zC.y, zC.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let s = 0, i = e.length; s < i; s++) {
      const i = e[s];
      t.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new DC(t, 3)), this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new lM());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) this.boundingBox.set(new HA(-Infinity, -Infinity, -Infinity), new HA(Infinity, Infinity, Infinity));else {
      if (void 0 !== e) {
        if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, s = t.length; e < s; e++) {
          const s = t[e];
          NC.setFromBufferAttribute(s), this.morphTargetsRelative ? (UC.addVectors(this.boundingBox.min, NC.min), this.boundingBox.expandByPoint(UC), UC.addVectors(this.boundingBox.max, NC.max), this.boundingBox.expandByPoint(UC)) : (this.boundingBox.expandByPoint(NC.min), this.boundingBox.expandByPoint(NC.max));
        }
      } else this.boundingBox.makeEmpty();
      isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z);
    }
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new CM());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) this.boundingSphere.set(new HA(), Infinity);else if (e) {
      const s = this.boundingSphere.center;
      if (NC.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
        const s = t[e];
        FC.setFromBufferAttribute(s), this.morphTargetsRelative ? (UC.addVectors(NC.min, FC.min), NC.expandByPoint(UC), UC.addVectors(NC.max, FC.max), NC.expandByPoint(UC)) : (NC.expandByPoint(FC.min), NC.expandByPoint(FC.max));
      }
      NC.getCenter(s);
      let i = 0;
      for (let t = 0, n = e.count; t < n; t++) UC.fromBufferAttribute(e, t), i = Math.max(i, s.distanceToSquared(UC));
      if (t) for (let n = 0, a = t.length; n < a; n++) {
        const a = t[n],
          r = this.morphTargetsRelative;
        for (let t = 0, n = a.count; t < n; t++) UC.fromBufferAttribute(a, t), r && (zC.fromBufferAttribute(e, t), UC.add(zC)), i = Math.max(i, s.distanceToSquared(UC));
      }
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius);
    }
  }
  computeTangents() {
    const e = this.index,
      t = this.attributes;
    if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv) return;
    const s = e.array,
      i = t.position.array,
      n = t.normal.array,
      a = t.uv.array,
      r = i.length / 3;
    !1 === this.hasAttribute("tangent") && this.setAttribute("tangent", new EC(new Float32Array(4 * r), 4));
    const o = this.getAttribute("tangent").array,
      l = [],
      c = [];
    for (let M = 0; M < r; M++) l[M] = new HA(), c[M] = new HA();
    const h = new HA(),
      u = new HA(),
      d = new HA(),
      p = new DA(),
      m = new DA(),
      f = new DA(),
      g = new HA(),
      v = new HA();
    function b(e, t, s) {
      h.fromArray(i, 3 * e), u.fromArray(i, 3 * t), d.fromArray(i, 3 * s), p.fromArray(a, 2 * e), m.fromArray(a, 2 * t), f.fromArray(a, 2 * s), u.sub(h), d.sub(h), m.sub(p), f.sub(p);
      const n = 1 / (m.x * f.y - f.x * m.y);
      isFinite(n) && (g.copy(u).multiplyScalar(f.y).addScaledVector(d, -m.y).multiplyScalar(n), v.copy(d).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(n), l[e].add(g), l[t].add(g), l[s].add(g), c[e].add(v), c[t].add(v), c[s].add(v));
    }
    let y = this.groups;
    0 === y.length && (y = [{
      start: 0,
      count: s.length
    }]);
    for (let M = 0, C = y.length; M < C; ++M) {
      const e = y[M],
        t = e.start;
      for (let i = t, n = t + e.count; i < n; i += 3) b(s[i + 0], s[i + 1], s[i + 2]);
    }
    const _ = new HA(),
      x = new HA(),
      w = new HA(),
      S = new HA();
    function A(e) {
      w.fromArray(n, 3 * e), S.copy(w);
      const t = l[e];
      _.copy(t), _.sub(w.multiplyScalar(w.dot(t))).normalize(), x.crossVectors(S, t);
      const s = x.dot(c[e]) < 0 ? -1 : 1;
      o[4 * e] = _.x, o[4 * e + 1] = _.y, o[4 * e + 2] = _.z, o[4 * e + 3] = s;
    }
    for (let M = 0, C = y.length; M < C; ++M) {
      const e = y[M],
        t = e.start;
      for (let i = t, n = t + e.count; i < n; i += 3) A(s[i + 0]), A(s[i + 1]), A(s[i + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index,
      t = this.getAttribute("position");
    if (void 0 !== t) {
      let s = this.getAttribute("normal");
      if (void 0 === s) s = new EC(new Float32Array(3 * t.count), 3), this.setAttribute("normal", s);else for (let e = 0, t = s.count; e < t; e++) s.setXYZ(e, 0, 0, 0);
      const i = new HA(),
        n = new HA(),
        a = new HA(),
        r = new HA(),
        o = new HA(),
        l = new HA(),
        c = new HA(),
        h = new HA();
      if (e) for (let u = 0, d = e.count; u < d; u += 3) {
        const d = e.getX(u + 0),
          p = e.getX(u + 1),
          m = e.getX(u + 2);
        i.fromBufferAttribute(t, d), n.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), c.subVectors(a, n), h.subVectors(i, n), c.cross(h), r.fromBufferAttribute(s, d), o.fromBufferAttribute(s, p), l.fromBufferAttribute(s, m), r.add(c), o.add(c), l.add(c), s.setXYZ(d, r.x, r.y, r.z), s.setXYZ(p, o.x, o.y, o.z), s.setXYZ(m, l.x, l.y, l.z);
      } else for (let e = 0, u = t.count; e < u; e += 3) i.fromBufferAttribute(t, e + 0), n.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), c.subVectors(a, n), h.subVectors(i, n), c.cross(h), s.setXYZ(e + 0, c.x, c.y, c.z), s.setXYZ(e + 1, c.x, c.y, c.z), s.setXYZ(e + 2, c.x, c.y, c.z);
      this.normalizeNormals(), s.needsUpdate = !0;
    }
  }
  merge() {
    return this;
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, s = e.count; t < s; t++) UC.fromBufferAttribute(e, t), UC.normalize(), e.setXYZ(t, UC.x, UC.y, UC.z);
  }
  toNonIndexed() {
    function e(e, t) {
      const s = e.array,
        i = e.itemSize,
        n = e.normalized,
        a = new s.constructor(t.length * i);
      let r = 0,
        o = 0;
      for (let l = 0, c = t.length; l < c; l++) {
        r = e.isInterleavedBufferAttribute ? t[l] * e.data.stride + e.offset : t[l] * i;
        for (let e = 0; e < i; e++) a[o++] = s[r++];
      }
      return new EC(a, i, n);
    }
    if (null === this.index) return this;
    const t = new HC(),
      s = this.index.array,
      i = this.attributes;
    for (const r in i) {
      const n = e(i[r], s);
      t.setAttribute(r, n);
    }
    const n = this.morphAttributes;
    for (const r in n) {
      const i = [],
        a = n[r];
      for (let t = 0, n = a.length; t < n; t++) {
        const n = e(a[t], s);
        i.push(n);
      }
      t.morphAttributes[r] = i;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let r = 0, o = a.length; r < o; r++) {
      const e = a[r];
      t.addGroup(e.start, e.count, e.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters) {
      const t = this.parameters;
      for (const s in t) void 0 !== t[s] && (e[s] = t[s]);
      return e;
    }
    e.data = {
      attributes: {}
    };
    const t = this.index;
    null !== t && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const s = this.attributes;
    for (const o in s) {
      const t = s[o];
      e.data.attributes[o] = t.toJSON(e.data);
    }
    const i = {};
    let n = !1;
    for (const o in this.morphAttributes) {
      const t = this.morphAttributes[o],
        s = [];
      for (let i = 0, n = t.length; i < n; i++) {
        const n = t[i];
        s.push(n.toJSON(e.data));
      }
      s.length > 0 && (i[o] = s, n = !0);
    }
    n && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const r = this.boundingSphere;
    return null !== r && (e.data.boundingSphere = {
      center: r.center.toArray(),
      radius: r.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const s = e.index;
    null !== s && this.setIndex(s.clone(t));
    const i = e.attributes;
    for (const l in i) {
      const e = i[l];
      this.setAttribute(l, e.clone(t));
    }
    const n = e.morphAttributes;
    for (const l in n) {
      const e = [],
        s = n[l];
      for (let i = 0, n = s.length; i < n; i++) e.push(s[i].clone(t));
      this.morphAttributes[l] = e;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, c = a.length; l < c; l++) {
      const e = a[l];
      this.addGroup(e.start, e.count, e.materialIndex);
    }
    const r = e.boundingBox;
    null !== r && (this.boundingBox = r.clone());
    const o = e.boundingSphere;
    return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
const GC = new OM(),
  VC = new LM(),
  WC = new CM(),
  jC = new HA(),
  qC = new HA(),
  ZC = new HA(),
  $C = new HA(),
  XC = new HA(),
  YC = new HA(),
  JC = new DA(),
  QC = new DA(),
  KC = new DA(),
  eP = new HA(),
  tP = new HA();
class sP extends rC {
  constructor(e = new HC(), t = new CC()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const s = e[t[0]];
      if (void 0 !== s) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = s.length; e < t; e++) {
          const t = s[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const s = this.geometry,
      i = s.attributes.position,
      n = s.morphAttributes.position,
      a = s.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const r = this.morphTargetInfluences;
    if (n && r) {
      YC.set(0, 0, 0);
      for (let s = 0, i = n.length; s < i; s++) {
        const i = r[s],
          o = n[s];
        0 !== i && (XC.fromBufferAttribute(o, e), a ? YC.addScaledVector(XC, i) : YC.addScaledVector(XC.sub(t), i));
      }
      t.add(YC);
    }
    return this.isSkinnedMesh && this.boneTransform(e, t), t;
  }
  raycast(e, t) {
    const s = this.geometry,
      i = this.material,
      n = this.matrixWorld;
    if (void 0 === i) return;
    if (null === s.boundingSphere && s.computeBoundingSphere(), WC.copy(s.boundingSphere), WC.applyMatrix4(n), VC.copy(e.ray).recast(e.near), !1 === WC.containsPoint(VC.origin)) {
      if (null === VC.intersectSphere(WC, jC)) return;
      if (VC.origin.distanceToSquared(jC) > (e.far - e.near) ** 2) return;
    }
    if (GC.copy(n).invert(), VC.copy(e.ray).applyMatrix4(GC), null !== s.boundingBox && !1 === VC.intersectsBox(s.boundingBox)) return;
    let a;
    const r = s.index,
      o = s.attributes.position,
      l = s.attributes.uv,
      c = s.attributes.uv2,
      h = s.groups,
      u = s.drawRange;
    if (null !== r) {
      if (Array.isArray(i)) for (let d = 0, p = h.length; d < p; d++) {
        const s = h[d],
          n = i[s.materialIndex];
        for (let i = Math.max(s.start, u.start), o = Math.min(r.count, Math.min(s.start + s.count, u.start + u.count)); i < o; i += 3) {
          const o = r.getX(i),
            h = r.getX(i + 1),
            u = r.getX(i + 2);
          a = iP(this, n, e, VC, l, c, o, h, u), a && (a.faceIndex = Math.floor(i / 3), a.face.materialIndex = s.materialIndex, t.push(a));
        }
      } else {
        for (let s = Math.max(0, u.start), n = Math.min(r.count, u.start + u.count); s < n; s += 3) {
          const n = r.getX(s),
            o = r.getX(s + 1),
            h = r.getX(s + 2);
          a = iP(this, i, e, VC, l, c, n, o, h), a && (a.faceIndex = Math.floor(s / 3), t.push(a));
        }
      }
    } else if (void 0 !== o) if (Array.isArray(i)) for (let d = 0, p = h.length; d < p; d++) {
      const s = h[d],
        n = i[s.materialIndex];
      for (let i = Math.max(s.start, u.start), r = Math.min(o.count, Math.min(s.start + s.count, u.start + u.count)); i < r; i += 3) {
        a = iP(this, n, e, VC, l, c, i, i + 1, i + 2), a && (a.faceIndex = Math.floor(i / 3), a.face.materialIndex = s.materialIndex, t.push(a));
      }
    } else {
      for (let s = Math.max(0, u.start), n = Math.min(o.count, u.start + u.count); s < n; s += 3) {
        a = iP(this, i, e, VC, l, c, s, s + 1, s + 2), a && (a.faceIndex = Math.floor(s / 3), t.push(a));
      }
    }
  }
}
function iP(e, t, s, i, n, a, r, o, l) {
  e.getVertexPosition(r, qC), e.getVertexPosition(o, ZC), e.getVertexPosition(l, $C);
  const c = function (e, t, s, i, n, a, r, o) {
    let l;
    if (l = t.side === qx ? i.intersectTriangle(r, a, n, !0, o) : i.intersectTriangle(n, a, r, t.side === jx, o), null === l) return null;
    tP.copy(o), tP.applyMatrix4(e.matrixWorld);
    const c = s.ray.origin.distanceTo(tP);
    return c < s.near || c > s.far ? null : {
      distance: c,
      point: tP.clone(),
      object: e
    };
  }(e, t, s, i, qC, ZC, $C, eP);
  if (c) {
    n && (JC.fromBufferAttribute(n, r), QC.fromBufferAttribute(n, o), KC.fromBufferAttribute(n, l), c.uv = vC.getUV(eP, qC, ZC, $C, JC, QC, KC, new DA())), a && (JC.fromBufferAttribute(a, r), QC.fromBufferAttribute(a, o), KC.fromBufferAttribute(a, l), c.uv2 = vC.getUV(eP, qC, ZC, $C, JC, QC, KC, new DA()));
    const e = {
      a: r,
      b: o,
      c: l,
      normal: new HA(),
      materialIndex: 0
    };
    vC.getNormal(qC, ZC, $C, e.normal), c.face = e;
  }
  return c;
}
class nP extends HC {
  constructor(e = 1, t = 1, s = 1, i = 1, n = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: s,
      widthSegments: i,
      heightSegments: n,
      depthSegments: a
    };
    const r = this;
    i = Math.floor(i), n = Math.floor(n), a = Math.floor(a);
    const o = [],
      l = [],
      c = [],
      h = [];
    let u = 0,
      d = 0;
    function p(e, t, s, i, n, a, p, m, f, g, v) {
      const b = a / f,
        y = p / g,
        _ = a / 2,
        x = p / 2,
        w = m / 2,
        S = f + 1,
        A = g + 1;
      let M = 0,
        C = 0;
      const P = new HA();
      for (let r = 0; r < A; r++) {
        const a = r * y - x;
        for (let o = 0; o < S; o++) {
          const u = o * b - _;
          P[e] = u * i, P[t] = a * n, P[s] = w, l.push(P.x, P.y, P.z), P[e] = 0, P[t] = 0, P[s] = m > 0 ? 1 : -1, c.push(P.x, P.y, P.z), h.push(o / f), h.push(1 - r / g), M += 1;
        }
      }
      for (let r = 0; r < g; r++) for (let e = 0; e < f; e++) {
        const t = u + e + S * r,
          s = u + e + S * (r + 1),
          i = u + (e + 1) + S * (r + 1),
          n = u + (e + 1) + S * r;
        o.push(t, s, n), o.push(s, i, n), C += 6;
      }
      r.addGroup(d, C, v), d += C, u += M;
    }
    p("z", "y", "x", -1, -1, s, t, e, a, n, 0), p("z", "y", "x", 1, -1, s, t, -e, a, n, 1), p("x", "z", "y", 1, 1, e, s, t, i, a, 2), p("x", "z", "y", 1, -1, e, s, -t, i, a, 3), p("x", "y", "z", 1, -1, e, t, s, i, n, 4), p("x", "y", "z", -1, -1, e, t, -s, i, n, 5), this.setIndex(o), this.setAttribute("position", new DC(l, 3)), this.setAttribute("normal", new DC(c, 3)), this.setAttribute("uv", new DC(h, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new nP(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function aP(e) {
  const t = {};
  for (const s in e) {
    t[s] = {};
    for (const i in e[s]) {
      const n = e[s][i];
      n && (n.isColor || n.isMatrix3 || n.isMatrix4 || n.isVector2 || n.isVector3 || n.isVector4 || n.isTexture || n.isQuaternion) ? t[s][i] = n.clone() : Array.isArray(n) ? t[s][i] = n.slice() : t[s][i] = n;
    }
  }
  return t;
}
function rP(e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const i = aP(e[s]);
    for (const e in i) t[e] = i[e];
  }
  return t;
}
function oP(e) {
  return null === e.getRenderTarget() && e.outputEncoding === aA ? hA : uA;
}
const lP = {
  clone: aP,
  merge: rP
};
class cP extends yC {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}", this.fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.extensions = {
      derivatives: !1,
      fragDepth: !1,
      drawBuffers: !1,
      shaderTextureLOD: !1
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv2: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== e && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = aP(e.uniforms), this.uniformsGroups = function (e) {
      const t = [];
      for (let s = 0; s < e.length; s++) t.push(e[s].clone());
      return t;
    }(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const s = this.uniforms[i].value;
      s && s.isTexture ? t.uniforms[i] = {
        type: "t",
        value: s.toJSON(e).uuid
      } : s && s.isColor ? t.uniforms[i] = {
        type: "c",
        value: s.getHex()
      } : s && s.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: s.toArray()
      } : s && s.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: s.toArray()
      } : s && s.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: s.toArray()
      } : s && s.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: s.toArray()
      } : s && s.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: s.toArray()
      } : t.uniforms[i] = {
        value: s
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
    const s = {};
    for (const i in this.extensions) !0 === this.extensions[i] && (s[i] = !0);
    return Object.keys(s).length > 0 && (t.extensions = s), t;
  }
}
let hP = class extends rC {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new OM(), this.projectionMatrix = new OM(), this.projectionMatrixInverse = new OM();
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(-t[8], -t[9], -t[10]).normalize();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
class uP extends hP {
  constructor(e = 50, t = 1, s = .1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = s, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = .5 * this.getFilmHeight() / e;
    this.fov = 2 * wA * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(.5 * xA * this.fov);
    return .5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return 2 * wA * Math.atan(Math.tan(.5 * xA * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(e, t, s, i, n, a) {
    this.aspect = e / t, null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = s, this.view.offsetY = i, this.view.width = n, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(.5 * xA * this.fov) / this.zoom,
      s = 2 * t,
      i = this.aspect * s,
      n = -.5 * i;
    const a = this.view;
    if (null !== this.view && this.view.enabled) {
      const e = a.fullWidth,
        r = a.fullHeight;
      n += a.offsetX * i / e, t -= a.offsetY * s / r, i *= a.width / e, s *= a.height / r;
    }
    const r = this.filmOffset;
    0 !== r && (n += e * r / this.getFilmWidth()), this.projectionMatrix.makePerspective(n, n + i, t, t - s, e, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const dP = -90;
class pP extends rC {
  constructor(e, t, s) {
    super(), this.type = "CubeCamera", this.renderTarget = s;
    const i = new uP(dP, 1, e, t);
    i.layers = this.layers, i.up.set(0, 1, 0), i.lookAt(1, 0, 0), this.add(i);
    const n = new uP(dP, 1, e, t);
    n.layers = this.layers, n.up.set(0, 1, 0), n.lookAt(-1, 0, 0), this.add(n);
    const a = new uP(dP, 1, e, t);
    a.layers = this.layers, a.up.set(0, 0, -1), a.lookAt(0, 1, 0), this.add(a);
    const r = new uP(dP, 1, e, t);
    r.layers = this.layers, r.up.set(0, 0, 1), r.lookAt(0, -1, 0), this.add(r);
    const o = new uP(dP, 1, e, t);
    o.layers = this.layers, o.up.set(0, 1, 0), o.lookAt(0, 0, 1), this.add(o);
    const l = new uP(dP, 1, e, t);
    l.layers = this.layers, l.up.set(0, 1, 0), l.lookAt(0, 0, -1), this.add(l);
  }
  update(e, t) {
    null === this.parent && this.updateMatrixWorld();
    const s = this.renderTarget,
      [i, n, a, r, o, l] = this.children,
      c = e.getRenderTarget(),
      h = e.toneMapping,
      u = e.xr.enabled;
    e.toneMapping = Pw, e.xr.enabled = !1;
    const d = s.texture.generateMipmaps;
    s.texture.generateMipmaps = !1, e.setRenderTarget(s, 0), e.render(t, i), e.setRenderTarget(s, 1), e.render(t, n), e.setRenderTarget(s, 2), e.render(t, a), e.setRenderTarget(s, 3), e.render(t, r), e.setRenderTarget(s, 4), e.render(t, o), s.texture.generateMipmaps = d, e.setRenderTarget(s, 5), e.render(t, l), e.setRenderTarget(c), e.toneMapping = h, e.xr.enabled = u, s.texture.needsPMREMUpdate = !0;
  }
}
class mP extends iM {
  constructor(e, t, s, i, n, a, r, o, l, c) {
    super(e = void 0 !== e ? e : [], t = void 0 !== t ? t : Dw, s, i, n, a, r, o, l, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class fP extends aM {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const s = {
        width: e,
        height: e,
        depth: 1
      },
      i = [s, s, s, s, s, s];
    this.texture = new mP(i, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps, this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : Ww;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.encoding = t.encoding, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const s = {
        uniforms: {
          tEquirect: {
            value: null
          }
        },
        vertexShader: "varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
        fragmentShader: "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}"
      },
      i = new nP(5, 5, 5),
      n = new cP({
        name: "CubemapFromEquirect",
        uniforms: aP(s.uniforms),
        vertexShader: s.vertexShader,
        fragmentShader: s.fragmentShader,
        side: qx,
        blending: $x
      });
    n.uniforms.tEquirect.value = t;
    const a = new sP(i, n),
      r = t.minFilter;
    t.minFilter === qw && (t.minFilter = Ww);
    return new pP(1, 10, this).update(e, a), t.minFilter = r, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t, s, i) {
    const n = e.getRenderTarget();
    for (let a = 0; a < 6; a++) e.setRenderTarget(this, a), e.clear(t, s, i);
    e.setRenderTarget(n);
  }
}
const gP = new HA(),
  vP = new HA(),
  bP = new LA();
class yP {
  constructor(e = new HA(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, s, i) {
    return this.normal.set(e, t, s), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, s) {
    const i = gP.subVectors(s, t).cross(vP.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const s = e.delta(gP),
      i = this.normal.dot(s);
    if (0 === i) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
    const n = -(e.start.dot(this.normal) + this.constant) / i;
    return n < 0 || n > 1 ? null : t.copy(e.start).addScaledVector(s, n);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start),
      s = this.distanceToPoint(e.end);
    return t < 0 && s > 0 || s < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const s = t || bP.getNormalMatrix(e),
      i = this.coplanarPoint(gP).applyMatrix4(e),
      n = this.normal.applyMatrix3(s).normalize();
    return this.constant = -i.dot(n), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _P = new CM(),
  xP = new HA();
class wP {
  constructor(e = new yP(), t = new yP(), s = new yP(), i = new yP(), n = new yP(), a = new yP()) {
    this.planes = [e, t, s, i, n, a];
  }
  set(e, t, s, i, n, a) {
    const r = this.planes;
    return r[0].copy(e), r[1].copy(t), r[2].copy(s), r[3].copy(i), r[4].copy(n), r[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let s = 0; s < 6; s++) t[s].copy(e.planes[s]);
    return this;
  }
  setFromProjectionMatrix(e) {
    const t = this.planes,
      s = e.elements,
      i = s[0],
      n = s[1],
      a = s[2],
      r = s[3],
      o = s[4],
      l = s[5],
      c = s[6],
      h = s[7],
      u = s[8],
      d = s[9],
      p = s[10],
      m = s[11],
      f = s[12],
      g = s[13],
      v = s[14],
      b = s[15];
    return t[0].setComponents(r - i, h - o, m - u, b - f).normalize(), t[1].setComponents(r + i, h + o, m + u, b + f).normalize(), t[2].setComponents(r + n, h + l, m + d, b + g).normalize(), t[3].setComponents(r - n, h - l, m - d, b - g).normalize(), t[4].setComponents(r - a, h - c, m - p, b - v).normalize(), t[5].setComponents(r + a, h + c, m + p, b + v).normalize(), this;
  }
  intersectsObject(e) {
    const t = e.geometry;
    return null === t.boundingSphere && t.computeBoundingSphere(), _P.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(_P);
  }
  intersectsSprite(e) {
    return _P.center.set(0, 0, 0), _P.radius = .7071067811865476, _P.applyMatrix4(e.matrixWorld), this.intersectsSphere(_P);
  }
  intersectsSphere(e) {
    const t = this.planes,
      s = e.center,
      i = -e.radius;
    for (let n = 0; n < 6; n++) {
      if (t[n].distanceToPoint(s) < i) return !1;
    }
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let s = 0; s < 6; s++) {
      const i = t[s];
      if (xP.x = i.normal.x > 0 ? e.max.x : e.min.x, xP.y = i.normal.y > 0 ? e.max.y : e.min.y, xP.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(xP) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let s = 0; s < 6; s++) if (t[s].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function SP() {
  let e = null,
    t = !1,
    s = null,
    i = null;
  function n(t, a) {
    s(t, a), i = e.requestAnimationFrame(n);
  }
  return {
    start: function () {
      !0 !== t && null !== s && (i = e.requestAnimationFrame(n), t = !0);
    },
    stop: function () {
      e.cancelAnimationFrame(i), t = !1;
    },
    setAnimationLoop: function (e) {
      s = e;
    },
    setContext: function (t) {
      e = t;
    }
  };
}
function AP(e, t) {
  const s = t.isWebGL2,
    i = new WeakMap();
  return {
    get: function (e) {
      return e.isInterleavedBufferAttribute && (e = e.data), i.get(e);
    },
    remove: function (t) {
      t.isInterleavedBufferAttribute && (t = t.data);
      const s = i.get(t);
      s && (e.deleteBuffer(s.buffer), i.delete(t));
    },
    update: function (t, n) {
      if (t.isGLBufferAttribute) {
        const e = i.get(t);
        return void ((!e || e.version < t.version) && i.set(t, {
          buffer: t.buffer,
          type: t.type,
          bytesPerElement: t.elementSize,
          version: t.version
        }));
      }
      t.isInterleavedBufferAttribute && (t = t.data);
      const a = i.get(t);
      void 0 === a ? i.set(t, function (t, i) {
        const n = t.array,
          a = t.usage,
          r = e.createBuffer();
        let o;
        if (e.bindBuffer(i, r), e.bufferData(i, n, a), t.onUploadCallback(), n instanceof Float32Array) o = 5126;else if (n instanceof Uint16Array) {
          if (t.isFloat16BufferAttribute) {
            if (!s) throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
            o = 5131;
          } else o = 5123;
        } else if (n instanceof Int16Array) o = 5122;else if (n instanceof Uint32Array) o = 5125;else if (n instanceof Int32Array) o = 5124;else if (n instanceof Int8Array) o = 5120;else if (n instanceof Uint8Array) o = 5121;else {
          if (!(n instanceof Uint8ClampedArray)) throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + n);
          o = 5121;
        }
        return {
          buffer: r,
          type: o,
          bytesPerElement: n.BYTES_PER_ELEMENT,
          version: t.version
        };
      }(t, n)) : a.version < t.version && (!function (t, i, n) {
        const a = i.array,
          r = i.updateRange;
        e.bindBuffer(n, t), -1 === r.count ? e.bufferSubData(n, 0, a) : (s ? e.bufferSubData(n, r.offset * a.BYTES_PER_ELEMENT, a, r.offset, r.count) : e.bufferSubData(n, r.offset * a.BYTES_PER_ELEMENT, a.subarray(r.offset, r.offset + r.count)), r.count = -1), i.onUploadCallback();
      }(a.buffer, t, n), a.version = t.version);
    }
  };
}
class MP extends HC {
  constructor(e = 1, t = 1, s = 1, i = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: s,
      heightSegments: i
    };
    const n = e / 2,
      a = t / 2,
      r = Math.floor(s),
      o = Math.floor(i),
      l = r + 1,
      c = o + 1,
      h = e / r,
      u = t / o,
      d = [],
      p = [],
      m = [],
      f = [];
    for (let g = 0; g < c; g++) {
      const e = g * u - a;
      for (let t = 0; t < l; t++) {
        const s = t * h - n;
        p.push(s, -e, 0), m.push(0, 0, 1), f.push(t / r), f.push(1 - g / o);
      }
    }
    for (let g = 0; g < o; g++) for (let e = 0; e < r; e++) {
      const t = e + l * g,
        s = e + l * (g + 1),
        i = e + 1 + l * (g + 1),
        n = e + 1 + l * g;
      d.push(t, s, n), d.push(s, i, n);
    }
    this.setIndex(d), this.setAttribute("position", new DC(p, 3)), this.setAttribute("normal", new DC(m, 3)), this.setAttribute("uv", new DC(f, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new MP(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
const CP = {
    alphamap_fragment: "#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,vUv).g;\n#endif",
    alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
    alphatest_fragment: "#ifdef USE_ALPHATEST\nif(diffuseColor.a<alphaTest)discard;\n#endif",
    alphatest_pars_fragment: "#ifdef USE_ALPHATEST\nuniform float alphaTest;\n#endif",
    aomap_fragment: "#ifdef USE_AOMAP\nfloat ambientOcclusion=(texture2D(aoMap,vUv2).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;\n#if defined(USE_ENVMAP)&&defined(STANDARD)\nfloat dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.roughness);\n#endif\n#endif",
    aomap_pars_fragment: "#ifdef USE_AOMAP\nuniform sampler2D aoMap;uniform float aoMapIntensity;\n#endif",
    begin_vertex: "vec3 transformed=vec3(position);",
    beginnormal_vertex: "vec3 objectNormal=vec3(normal);\n#ifdef USE_TANGENT\nvec3 objectTangent=vec3(tangent.xyz);\n#endif",
    bsdfs: "vec3 BRDF_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}float F_Schlick(const in float f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}vec3 Schlick_to_F0(const in vec3 f,const in float f90,const in float dotVH){float x=clamp(1.0-dotVH,0.0,1.0);float x2=x*x;float x5=clamp(x*x2*x2,0.0,0.9999);return(f-vec3(f90)*x5)/(1.0-x5);}float V_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}vec3 BRDF_GGX(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 f0,const in float f90,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}\n#ifdef USE_IRIDESCENCE\nvec3 BRDF_GGX_Iridescence(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 f0,const in float f90,const in float iridescence,const in vec3 iridescenceFresnel,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=mix(F_Schlick(f0,f90,dotVH),iridescenceFresnel,iridescence);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}\n#endif\nvec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_BlinnPhong(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(lightDir+viewDir);float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(specularColor,1.0,dotVH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}\n#if defined(USE_SHEEN)\nfloat D_Charlie(float roughness,float dotNH){float alpha=pow2(roughness);float invAlpha=1.0/alpha;float cos2h=dotNH*dotNH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float dotNV,float dotNL){return saturate(1.0/(4.0*(dotNL+dotNV-dotNL*dotNV)));}vec3 BRDF_Sheen(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,vec3 sheenColor,const in float sheenRoughness){vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float D=D_Charlie(sheenRoughness,dotNH);float V=V_Neubelt(dotNV,dotNL);return sheenColor*(D*V);}\n#endif",
    iridescence_fragment: "#ifdef USE_IRIDESCENCE\nconst mat3 XYZ_TO_REC709=mat3(3.2404542,-0.9692660,0.0556434,-1.5371385,1.8760108,-0.2040259,-0.4985314,0.0415560,1.0572252);vec3 Fresnel0ToIor(vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1.0)+sqrtF0)/(vec3(1.0)-sqrtF0);}vec3 IorToFresnel0(vec3 transmittedIor,float incidentIor){return pow2((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(float transmittedIor,float incidentIor){return pow2((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(float OPD,vec3 shift){float phase=2.0*PI*OPD*1.0e-9;vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-pow2(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*pow2(phase));xyz/=1.0685e-7;vec3 rgb=XYZ_TO_REC709*xyz;return rgb;}vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0){vec3 I;float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=pow2(outsideIOR/iridescenceIOR)*(1.0-pow2(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if(cosTheta2Sq<0.0){return vec3(1.0);}float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIOR,outsideIOR);float R12=F_Schlick(R0,1.0,cosTheta1);float R21=R12;float T121=1.0-R12;float phi12=0.0;if(iridescenceIOR<outsideIOR)phi12=PI;float phi21=PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.0,0.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIOR);vec3 R23=F_Schlick(R1,1.0,cosTheta2);vec3 phi23=vec3(0.0);if(baseIOR[0]<iridescenceIOR)phi23[0]=PI;if(baseIOR[1]<iridescenceIOR)phi23[1]=PI;if(baseIOR[2]<iridescenceIOR)phi23[2]=PI;float OPD=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=pow2(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0.0));}\n#endif",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vUv);vec2 dSTdy=dFdy(vUv);float Hll=bumpScale*texture2D(bumpMap,vUv).x;float dBx=bumpScale*texture2D(bumpMap,vUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}\n#endif",
    clipping_planes_fragment: "#if NUM_CLIPPING_PLANES>0\nvec4 plane;\n#pragma unroll_loop_start\nfor(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}\n#pragma unroll_loop_end\n#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES\nbool clipped=true;\n#pragma unroll_loop_start\nfor(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}\n#pragma unroll_loop_end\nif(clipped)discard;\n#endif\n#endif",
    clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];\n#endif",
    clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;\n#endif",
    clipping_planes_vertex: "#if NUM_CLIPPING_PLANES>0\nvClipPosition=-mvPosition.xyz;\n#endif",
    color_fragment: "#if defined(USE_COLOR_ALPHA)\ndiffuseColor*=vColor;\n#elif defined(USE_COLOR)\ndiffuseColor.rgb*=vColor;\n#endif",
    color_pars_fragment: "#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)\nvarying vec3 vColor;\n#endif",
    color_pars_vertex: "#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvarying vec3 vColor;\n#endif",
    color_vertex: "#if defined(USE_COLOR_ALPHA)\nvColor=vec4(1.0);\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvColor=vec3(1.0);\n#endif\n#ifdef USE_COLOR\nvColor*=color;\n#endif\n#ifdef USE_INSTANCING_COLOR\nvColor.xyz*=instanceColor.xyz;\n#endif",
    common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\n#define whiteComplement(a)(1.0-saturate(a))\nfloat pow2(const in float x){return x*x;}vec3 pow2(const in vec3 x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float max3(const in vec3 v){return max(max(v.x,v.y),v.z);}float average(const in vec3 v){return dot(v,vec3(0.3333333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}\n#ifdef HIGH_PRECISION\nfloat precisionSafeLength(vec3 v){return length(v);}\n#else\nfloat precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}\n#endif\nstruct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;\n#ifdef USE_CLEARCOAT\nvec3 clearcoatNormal;\n#endif\n};vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float luminance(const in vec3 rgb){const vec3 weights=vec3(0.2126729,0.7151522,0.0721750);return dot(weights,rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}",
    cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);highp vec2 uv=getUV(direction,face)*(faceSize-2.0)+1.0;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;uv.x+=filterInt*3.0*cubeUV_minTileSize;uv.y+=4.0*(exp2(CUBEUV_MAX_MIP)-faceSize);uv.x*=CUBEUV_TEXEL_WIDTH;uv.y*=CUBEUV_TEXEL_HEIGHT;\n#ifdef texture2DGradEXT\nreturn texture2DGradEXT(envMap,uv,vec2(0.0),vec2(0.0)).rgb;\n#else\nreturn texture2D(envMap,uv).rgb;\n#endif\n}\n#define cubeUV_r0 1.0\n#define cubeUV_v0 0.339\n#define cubeUV_m0-2.0\n#define cubeUV_r1 0.8\n#define cubeUV_v1 0.276\n#define cubeUV_m1-1.0\n#define cubeUV_r4 0.4\n#define cubeUV_v4 0.046\n#define cubeUV_m4 2.0\n#define cubeUV_r5 0.305\n#define cubeUV_v5 0.016\n#define cubeUV_m5 3.0\n#define cubeUV_r6 0.21\n#define cubeUV_v6 0.0038\n#define cubeUV_m6 4.0\nfloat roughnessToMip(float roughness){float mip=0.0;if(roughness>=cubeUV_r1){mip=(cubeUV_r0-roughness)*(cubeUV_m1-cubeUV_m0)/(cubeUV_r0-cubeUV_r1)+cubeUV_m0;}else if(roughness>=cubeUV_r4){mip=(cubeUV_r1-roughness)*(cubeUV_m4-cubeUV_m1)/(cubeUV_r1-cubeUV_r4)+cubeUV_m1;}else if(roughness>=cubeUV_r5){mip=(cubeUV_r4-roughness)*(cubeUV_m5-cubeUV_m4)/(cubeUV_r4-cubeUV_r5)+cubeUV_m4;}else if(roughness>=cubeUV_r6){mip=(cubeUV_r5-roughness)*(cubeUV_m6-cubeUV_m5)/(cubeUV_r5-cubeUV_r6)+cubeUV_m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),cubeUV_m0,CUBEUV_MAX_MIP);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}\n#endif",
    defaultnormal_vertex: "vec3 transformedNormal=objectNormal;\n#ifdef USE_INSTANCING\nmat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;\n#endif\ntransformedNormal=normalMatrix*transformedNormal;\n#ifdef FLIP_SIDED\ntransformedNormal=-transformedNormal;\n#endif\n#ifdef USE_TANGENT\nvec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;\n#ifdef FLIP_SIDED\ntransformedTangent=-transformedTangent;\n#endif\n#endif",
    displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\nuniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;\n#endif",
    displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\ntransformed+=normalize(objectNormal)*(texture2D(displacementMap,vUv).x*displacementScale+displacementBias);\n#endif",
    emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\nvec4 emissiveColor=texture2D(emissiveMap,vUv);totalEmissiveRadiance*=emissiveColor.rgb;\n#endif",
    emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\nuniform sampler2D emissiveMap;\n#endif",
    encodings_fragment: "gl_FragColor=linearToOutputTexel(gl_FragColor);",
    encodings_pars_fragment: "vec4 LinearToLinear(in vec4 value){return value;}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}",
    envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(cameraToFrag,worldNormal);\n#else\nvec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);\n#endif\n#else\nvec3 reflectVec=vReflect;\n#endif\n#ifdef ENVMAP_TYPE_CUBE\nvec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));\n#else\nvec4 envColor=vec4(0.0);\n#endif\n#ifdef ENVMAP_BLENDING_MULTIPLY\noutgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_MIX)\noutgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_ADD)\noutgoingLight+=envColor.xyz*specularStrength*reflectivity;\n#endif\n#endif",
    envmap_common_pars_fragment: "#ifdef USE_ENVMAP\nuniform float envMapIntensity;uniform float flipEnvMap;\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube envMap;\n#else\nuniform sampler2D envMap;\n#endif\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;uniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;\n#else\nvarying vec3 vReflect;uniform float refractionRatio;\n#endif\n#endif",
    envmap_physical_pars_fragment: "#if defined(USE_ENVMAP)\nvec3 getIBLIrradiance(const in vec3 normal){\n#if defined(ENVMAP_TYPE_CUBE_UV)\nvec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);return PI*envMapColor.rgb*envMapIntensity;\n#else\nreturn vec3(0.0);\n#endif\n}vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){\n#if defined(ENVMAP_TYPE_CUBE_UV)\nvec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));reflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*envMapIntensity;\n#else\nreturn vec3(0.0);\n#endif\n}\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvWorldPosition=worldPosition.xyz;\n#else\nvec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvReflect=reflect(cameraToVertex,worldNormal);\n#else\nvReflect=refract(cameraToVertex,worldNormal,refractionRatio);\n#endif\n#endif\n#endif",
    fog_vertex: "#ifdef USE_FOG\nvFogDepth=-mvPosition.z;\n#endif",
    fog_pars_vertex: "#ifdef USE_FOG\nvarying float vFogDepth;\n#endif",
    fog_fragment: "#ifdef USE_FOG\n#ifdef FOG_EXP2\nfloat fogFactor=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);\n#else\nfloat fogFactor=smoothstep(fogNear,fogFar,vFogDepth);\n#endif\ngl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);\n#endif",
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;varying float vFogDepth;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;uniform float fogFar;\n#endif\n#endif",
    gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\nuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);\n#ifdef USE_GRADIENTMAP\nreturn vec3(texture2D(gradientMap,coord).r);\n#else\nvec2 fw=fwidth(coord)*0.5;return mix(vec3(0.7),vec3(1.0),smoothstep(0.7-fw.x,0.7+fw.x,coord.x));\n#endif\n}",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;reflectedLight.indirectDiffuse+=lightMapIrradiance;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nuniform sampler2D lightMap;uniform float lightMapIntensity;\n#endif",
    lights_lambert_fragment: "LambertMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularStrength=specularStrength;",
    lights_lambert_pars_fragment: "varying vec3 vViewPosition;struct LambertMaterial{vec3 diffuseColor;float specularStrength;};void RE_Direct_Lambert(const in IncidentLight directLight,const in GeometricContext geometry,const in LambertMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Lambert(const in vec3 irradiance,const in GeometricContext geometry,const in LambertMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_Lambert\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Lambert",
    lights_pars_begin: "uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in vec3 normal){vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;return irradiance;}float getDistanceAttenuation(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){\n#if defined(LEGACY_LIGHTS)\nif(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;\n#else\nfloat distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;\n#endif\n}float getSpotAttenuation(const in float coneCosine,const in float penumbraCosine,const in float angleCosine){return smoothstep(coneCosine,penumbraCosine,angleCosine);}\n#if NUM_DIR_LIGHTS>0\nstruct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalLightInfo(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight light){light.color=directionalLight.color;light.direction=directionalLight.direction;light.visible=true;}\n#endif\n#if NUM_POINT_LIGHTS>0\nstruct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointLightInfo(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=pointLight.position-geometry.position;light.direction=normalize(lVector);float lightDistance=length(lVector);light.color=pointLight.color;light.color*=getDistanceAttenuation(lightDistance,pointLight.distance,pointLight.decay);light.visible=(light.color!=vec3(0.0));}\n#endif\n#if NUM_SPOT_LIGHTS>0\nstruct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotLightInfo(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=spotLight.position-geometry.position;light.direction=normalize(lVector);float angleCos=dot(light.direction,spotLight.direction);float spotAttenuation=getSpotAttenuation(spotLight.coneCos,spotLight.penumbraCos,angleCos);if(spotAttenuation>0.0){float lightDistance=length(lVector);light.color=spotLight.color*spotAttenuation;light.color*=getDistanceAttenuation(lightDistance,spotLight.distance,spotLight.decay);light.visible=(light.color!=vec3(0.0));}else{light.color=vec3(0.0);light.visible=false;}}\n#endif\n#if NUM_RECT_AREA_LIGHTS>0\nstruct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];\n#endif\n#if NUM_HEMI_LIGHTS>0\nstruct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in vec3 normal){float dotNL=dot(normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);return irradiance;}\n#endif",
    lights_toon_fragment: "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;",
    lights_toon_pars_fragment: "varying vec3 vViewPosition;struct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_Toon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon",
    lights_phong_fragment: "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;",
    lights_phong_pars_fragment: "varying vec3 vViewPosition;struct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_BlinnPhong(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong",
    lights_physical_fragment: "PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.roughness=max(roughnessFactor,0.0525);material.roughness+=geometryRoughness;material.roughness=min(material.roughness,1.0);\n#ifdef IOR\nmaterial.ior=ior;\n#ifdef SPECULAR\nfloat specularIntensityFactor=specularIntensity;vec3 specularColorFactor=specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\nspecularIntensityFactor*=texture2D(specularIntensityMap,vUv).a;\n#endif\n#ifdef USE_SPECULARCOLORMAP\nspecularColorFactor*=texture2D(specularColorMap,vUv).rgb;\n#endif\nmaterial.specularF90=mix(specularIntensityFactor,1.0,metalnessFactor);\n#else\nfloat specularIntensityFactor=1.0;vec3 specularColorFactor=vec3(1.0);material.specularF90=1.0;\n#endif\nmaterial.specularColor=mix(min(pow2((material.ior-1.0)/(material.ior+1.0))*specularColorFactor,vec3(1.0))*specularIntensityFactor,diffuseColor.rgb,metalnessFactor);\n#else\nmaterial.specularColor=mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);material.specularF90=1.0;\n#endif\n#ifdef USE_CLEARCOAT\nmaterial.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;material.clearcoatF0=vec3(0.04);material.clearcoatF90=1.0;\n#ifdef USE_CLEARCOATMAP\nmaterial.clearcoat*=texture2D(clearcoatMap,vUv).x;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nmaterial.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vUv).y;\n#endif\nmaterial.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);\n#endif\n#ifdef USE_IRIDESCENCE\nmaterial.iridescence=iridescence;material.iridescenceIOR=iridescenceIOR;\n#ifdef USE_IRIDESCENCEMAP\nmaterial.iridescence*=texture2D(iridescenceMap,vUv).r;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\nmaterial.iridescenceThickness=(iridescenceThicknessMaximum-iridescenceThicknessMinimum)*texture2D(iridescenceThicknessMap,vUv).g+iridescenceThicknessMinimum;\n#else\nmaterial.iridescenceThickness=iridescenceThicknessMaximum;\n#endif\n#endif\n#ifdef USE_SHEEN\nmaterial.sheenColor=sheenColor;\n#ifdef USE_SHEENCOLORMAP\nmaterial.sheenColor*=texture2D(sheenColorMap,vUv).rgb;\n#endif\nmaterial.sheenRoughness=clamp(sheenRoughness,0.07,1.0);\n#ifdef USE_SHEENROUGHNESSMAP\nmaterial.sheenRoughness*=texture2D(sheenRoughnessMap,vUv).a;\n#endif\n#endif",
    lights_physical_pars_fragment: "struct PhysicalMaterial{vec3 diffuseColor;float roughness;vec3 specularColor;float specularF90;\n#ifdef USE_CLEARCOAT\nfloat clearcoat;float clearcoatRoughness;vec3 clearcoatF0;float clearcoatF90;\n#endif\n#ifdef USE_IRIDESCENCE\nfloat iridescence;float iridescenceIOR;float iridescenceThickness;vec3 iridescenceFresnel;vec3 iridescenceF0;\n#endif\n#ifdef USE_SHEEN\nvec3 sheenColor;float sheenRoughness;\n#endif\n#ifdef IOR\nfloat ior;\n#endif\n#ifdef USE_TRANSMISSION\nfloat transmission;float transmissionAlpha;float thickness;float attenuationDistance;vec3 attenuationColor;\n#endif\n};vec3 clearcoatSpecular=vec3(0.0);vec3 sheenSpecular=vec3(0.0);float IBLSheenBRDF(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));float r2=roughness*roughness;float a=roughness<0.25?-339.2*r2+161.4*roughness-25.9:-8.48*r2+14.3*roughness-9.95;float b=roughness<0.25?44.0*r2-23.7*roughness+3.26:1.97*r2-3.27*roughness+0.72;float DG=exp(a*dotNV+b)+(roughness<0.25?0.0:0.1*(roughness-0.25));return saturate(DG*RECIPROCAL_PI);}vec2 DFGApprox(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;vec2 fab=vec2(-1.04,1.04)*a004+r.zw;return fab;}vec3 EnvironmentBRDF(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness){vec2 fab=DFGApprox(normal,viewDir,roughness);return specularColor*fab.x+specularF90*fab.y;}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float iridescence,const in vec3 iridescenceF0,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){\n#else\nvoid computeMultiscattering(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){\n#endif\nvec2 fab=DFGApprox(normal,viewDir,roughness);\n#ifdef USE_IRIDESCENCE\nvec3 Fr=mix(specularColor,iridescenceF0,iridescence);\n#else\nvec3 Fr=specularColor;\n#endif\nvec3 FssEss=Fr*fab.x+specularF90*fab.y;float Ess=fab.x+fab.y;float Ems=1.0-Ess;vec3 Favg=Fr+(1.0-Fr)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}\n#if NUM_RECT_AREA_LIGHTS>0\nvoid RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.roughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}\n#endif\nvoid RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifdef USE_CLEARCOAT\nfloat dotNLcc=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=dotNLcc*directLight.color;clearcoatSpecular+=ccIrradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.clearcoatNormal,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);\n#endif\n#ifdef USE_SHEEN\nsheenSpecular+=irradiance*BRDF_Sheen(directLight.direction,geometry.viewDir,geometry.normal,material.sheenColor,material.sheenRoughness);\n#endif\n#ifdef USE_IRIDESCENCE\nreflectedLight.directSpecular+=irradiance*BRDF_GGX_Iridescence(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness);\n#else\nreflectedLight.directSpecular+=irradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularF90,material.roughness);\n#endif\nreflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){\n#ifdef USE_CLEARCOAT\nclearcoatSpecular+=clearcoatRadiance*EnvironmentBRDF(geometry.clearcoatNormal,geometry.viewDir,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);\n#endif\n#ifdef USE_SHEEN\nsheenSpecular+=irradiance*material.sheenColor*IBLSheenBRDF(geometry.normal,geometry.viewDir,material.sheenRoughness);\n#endif\nvec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;\n#ifdef USE_IRIDESCENCE\ncomputeMultiscatteringIridescence(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness,singleScattering,multiScattering);\n#else\ncomputeMultiscattering(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.roughness,singleScattering,multiScattering);\n#endif\nvec3 totalScattering=singleScattering+multiScattering;vec3 diffuse=material.diffuseColor*(1.0-max(max(totalScattering.r,totalScattering.g),totalScattering.b));reflectedLight.indirectSpecular+=radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}\n#define RE_Direct RE_Direct_Physical\n#define RE_Direct_RectArea RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}",
    lights_fragment_begin: "GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);\n#ifdef USE_CLEARCOAT\ngeometry.clearcoatNormal=clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\nfloat dotNVi=saturate(dot(normal,geometry.viewDir));if(material.iridescenceThickness==0.0){material.iridescence=0.0;}else{material.iridescence=saturate(material.iridescence);}if(material.iridescence>0.0){material.iridescenceFresnel=evalIridescence(1.0,material.iridescenceIOR,dotNVi,material.iridescenceThickness,material.specularColor);material.iridescenceF0=Schlick_to_F0(material.iridescenceFresnel,1.0,dotNVi);}\n#endif\nIncidentLight directLight;\n#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)\nPointLight pointLight;\n#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointLightInfo(pointLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)\npointLightShadow=pointLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)\nSpotLight spotLight;vec4 spotColor;vec3 spotLightCoord;bool inSpotLightMap;\n#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotLightInfo(spotLight,geometry,directLight);\n#if (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)\n#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n#elif (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\n#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n#else\n#define SPOT_LIGHT_MAP_INDEX(UNROLLED_LOOP_INDEX-NUM_SPOT_LIGHT_SHADOWS+NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)\n#endif\n#if (SPOT_LIGHT_MAP_INDEX<NUM_SPOT_LIGHT_MAPS)\nspotLightCoord=vSpotLightCoord[i].xyz/vSpotLightCoord[i].w;inSpotLightMap=all(lessThan(abs(spotLightCoord*2.-1.),vec3(1.0)));spotColor=texture2D(spotLightMap[SPOT_LIGHT_MAP_INDEX],spotLightCoord.xy);directLight.color=inSpotLightMap?directLight.color*spotColor.rgb:directLight.color;\n#endif\n#undef SPOT_LIGHT_MAP_INDEX\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\nspotLightShadow=spotLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotLightCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)\nDirectionalLight directionalLight;\n#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalLightInfo(directionalLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)\ndirectionalLightShadow=directionalLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)\nRectAreaLight rectAreaLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if defined(RE_IndirectDiffuse)\nvec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry.normal);\n#if (NUM_HEMI_LIGHTS>0)\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);}\n#pragma unroll_loop_end\n#endif\n#endif\n#if defined(RE_IndirectSpecular)\nvec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);\n#endif",
    lights_fragment_maps: "#if defined(RE_IndirectDiffuse)\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;irradiance+=lightMapIrradiance;\n#endif\n#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)\niblIrradiance+=getIBLIrradiance(geometry.normal);\n#endif\n#endif\n#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)\nradiance+=getIBLRadiance(geometry.viewDir,geometry.normal,material.roughness);\n#ifdef USE_CLEARCOAT\nclearcoatRadiance+=getIBLRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness);\n#endif\n#endif",
    lights_fragment_end: "#if defined(RE_IndirectDiffuse)\nRE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);\n#endif\n#if defined(RE_IndirectSpecular)\nRE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);\n#endif",
    logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\ngl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;\n#endif",
    logdepthbuf_pars_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\nuniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;\n#endif",
    logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvarying float vFragDepth;varying float vIsPerspective;\n#else\nuniform float logDepthBufFC;\n#endif\n#endif",
    logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));\n#else\nif(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}\n#endif\n#endif",
    map_fragment: "#ifdef USE_MAP\nvec4 sampledDiffuseColor=texture2D(map,vUv);\n#ifdef DECODE_VIDEO_TEXTURE\nsampledDiffuseColor=vec4(mix(pow(sampledDiffuseColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),sampledDiffuseColor.rgb*0.0773993808,vec3(lessThanEqual(sampledDiffuseColor.rgb,vec3(0.04045)))),sampledDiffuseColor.w);\n#endif\ndiffuseColor*=sampledDiffuseColor;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nvec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;\n#endif\n#ifdef USE_MAP\ndiffuseColor*=texture2D(map,uv);\n#endif\n#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,uv).g;\n#endif",
    map_particle_pars_fragment: "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
    metalnessmap_fragment: "float metalnessFactor=metalness;\n#ifdef USE_METALNESSMAP\nvec4 texelMetalness=texture2D(metalnessMap,vUv);metalnessFactor*=texelMetalness.b;\n#endif",
    metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\nuniform sampler2D metalnessMap;\n#endif",
    morphcolor_vertex: "#if defined(USE_MORPHCOLORS)&&defined(MORPHTARGETS_TEXTURE)\nvColor*=morphTargetBaseInfluence;for(int i=0;i<MORPHTARGETS_COUNT;i++){\n#if defined(USE_COLOR_ALPHA)\nif(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2)*morphTargetInfluences[i];\n#elif defined(USE_COLOR)\nif(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2).rgb*morphTargetInfluences[i];\n#endif\n}\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nobjectNormal*=morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nfor(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)objectNormal+=getMorph(gl_VertexID,i,1).xyz*morphTargetInfluences[i];}\n#else\nobjectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];\n#endif\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nuniform float morphTargetInfluences[MORPHTARGETS_COUNT];uniform sampler2DArray morphTargetsTexture;uniform ivec2 morphTargetsTextureSize;vec4 getMorph(const in int vertexIndex,const in int morphTargetIndex,const in int offset){int texelIndex=vertexIndex*MORPHTARGETS_TEXTURE_STRIDE+offset;int y=texelIndex/morphTargetsTextureSize.x;int x=texelIndex-y*morphTargetsTextureSize.x;ivec3 morphUV=ivec3(x,y,morphTargetIndex);return texelFetch(morphTargetsTexture,morphUV,0);}\n#else\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[8];\n#else\nuniform float morphTargetInfluences[4];\n#endif\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\ntransformed*=morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nfor(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)transformed+=getMorph(gl_VertexID,i,0).xyz*morphTargetInfluences[i];}\n#else\ntransformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];\n#ifndef USE_MORPHNORMALS\ntransformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];\n#endif\n#endif\n#endif",
    normal_fragment_begin: "float faceDirection=gl_FrontFacing?1.0:-1.0;\n#ifdef FLAT_SHADED\nvec3 fdx=dFdx(vViewPosition);vec3 fdy=dFdy(vViewPosition);vec3 normal=normalize(cross(fdx,fdy));\n#else\nvec3 normal=normalize(vNormal);\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\n#ifdef USE_TANGENT\nvec3 tangent=normalize(vTangent);vec3 bitangent=normalize(vBitangent);\n#ifdef DOUBLE_SIDED\ntangent=tangent*faceDirection;bitangent=bitangent*faceDirection;\n#endif\n#if defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP)\nmat3 vTBN=mat3(tangent,bitangent,normal);\n#endif\n#endif\n#endif\nvec3 geometryNormal=normal;",
    normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\nnormal=texture2D(normalMap,vUv).xyz*2.0-1.0;\n#ifdef FLIP_SIDED\nnormal=-normal;\n#endif\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\nnormal=normalize(normalMatrix*normal);\n#elif defined(TANGENTSPACE_NORMALMAP)\nvec3 mapN=texture2D(normalMap,vUv).xyz*2.0-1.0;mapN.xy*=normalScale;\n#ifdef USE_TANGENT\nnormal=normalize(vTBN*mapN);\n#else\nnormal=perturbNormal2Arb(-vViewPosition,normal,mapN,faceDirection);\n#endif\n#elif defined(USE_BUMPMAP)\nnormal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);\n#endif",
    normal_pars_fragment: "#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif",
    normal_pars_vertex: "#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif",
    normal_vertex: "#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;uniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nuniform mat3 normalMatrix;\n#endif\n#if !defined(USE_TANGENT)&&(defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP))\nvec3 perturbNormal2Arb(vec3 eye_pos,vec3 surf_norm,vec3 mapN,float faceDirection){vec3 q0=dFdx(eye_pos.xyz);vec3 q1=dFdy(eye_pos.xyz);vec2 st0=dFdx(vUv.st);vec2 st1=dFdy(vUv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:faceDirection*inversesqrt(det);return normalize(T*(mapN.x*scale)+B*(mapN.y*scale)+N*mapN.z);}\n#endif",
    clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\nvec3 clearcoatNormal=geometryNormal;\n#endif",
    clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\nvec3 clearcoatMapN=texture2D(clearcoatNormalMap,vUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;\n#ifdef USE_TANGENT\nclearcoatNormal=normalize(vTBN*clearcoatMapN);\n#else\nclearcoatNormal=perturbNormal2Arb(-vViewPosition,clearcoatNormal,clearcoatMapN,faceDirection);\n#endif\n#endif",
    clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\nuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\nuniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;\n#endif",
    iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\nuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\nuniform sampler2D iridescenceThicknessMap;\n#endif",
    output_fragment: "#ifdef OPAQUE\ndiffuseColor.a=1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a*=material.transmissionAlpha+0.1;\n#endif\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);",
    packing: "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec2 packDepthToRG(in highp float v){return packDepthToRGBA(v).yx;}float unpackRGToDepth(const in highp vec2 v){return unpackRGBAToDepth(vec4(v.xy,0.0,0.0));}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float linearClipZ,const in float near,const in float far){return linearClipZ*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float invClipZ,const in float near,const in float far){return(near*far)/((far-near)*invClipZ-far);}",
    premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\ngl_FragColor.rgb*=gl_FragColor.a;\n#endif",
    project_vertex: "vec4 mvPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nmvPosition=instanceMatrix*mvPosition;\n#endif\nmvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;",
    dithering_fragment: "#ifdef DITHERING\ngl_FragColor.rgb=dithering(gl_FragColor.rgb);\n#endif",
    dithering_pars_fragment: "#ifdef DITHERING\nvec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}\n#endif",
    roughnessmap_fragment: "float roughnessFactor=roughness;\n#ifdef USE_ROUGHNESSMAP\nvec4 texelRoughness=texture2D(roughnessMap,vUv);roughnessFactor*=texelRoughness.g;\n#endif",
    roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\nuniform sampler2D roughnessMap;\n#endif",
    shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS>0\nvarying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];\n#endif\n#if NUM_SPOT_LIGHT_MAPS>0\nuniform sampler2D spotLightMap[NUM_SPOT_LIGHT_MAPS];\n#endif\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\nfloat texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bool inFrustum=shadowCoord.x>=0.0&&shadowCoord.x<=1.0&&shadowCoord.y>=0.0&&shadowCoord.y<=1.0;bool frustumTest=inFrustum&&shadowCoord.z<=1.0;if(frustumTest){\n#if defined(SHADOWMAP_TYPE_PCF)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);\n#elif defined(SHADOWMAP_TYPE_PCF_SOFT)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);\n#elif defined(SHADOWMAP_TYPE_VSM)\nshadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);\n#else\nshadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);\n#endif\n}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);\n#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)\nvec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);\n#else\nreturn texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);\n#endif\n}\n#endif",
    shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS>0\nuniform mat4 spotLightMatrix[NUM_SPOT_LIGHT_COORDS];varying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];\n#endif\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nstruct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\n#endif",
    shadowmap_vertex: "#if (defined(USE_SHADOWMAP)&&(NUM_DIR_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0))||(NUM_SPOT_LIGHT_COORDS>0)\nvec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;\n#endif\n#if defined(USE_SHADOWMAP)\n#if NUM_DIR_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_COORDS;i++){shadowWorldPosition=worldPosition;\n#if (defined(USE_SHADOWMAP)&&UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\nshadowWorldPosition.xyz+=shadowWorldNormal*spotLightShadows[i].shadowNormalBias;\n#endif\nvSpotLightCoord[i]=spotLightMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif",
    shadowmask_pars_fragment: "float getShadowMask(){float shadow=1.0;\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotLightCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}\n#pragma unroll_loop_end\n#endif\n#endif\nreturn shadow;}",
    skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;uniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\nvec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;\n#endif",
    skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;\n#ifdef USE_TANGENT\nobjectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;\n#endif\n#endif",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular=texture2D(specularMap,vUv);specularStrength=texelSpecular.r;\n#else\nspecularStrength=1.0;\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
    tonemapping_fragment: "#if defined(TONE_MAPPING)\ngl_FragColor.rgb=toneMapping(gl_FragColor.rgb);\n#endif",
    tonemapping_pars_fragment: "#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\nuniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return toneMappingExposure*color;}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}",
    transmission_fragment: "#ifdef USE_TRANSMISSION\nmaterial.transmission=transmission;material.transmissionAlpha=1.0;material.thickness=thickness;material.attenuationDistance=attenuationDistance;material.attenuationColor=attenuationColor;\n#ifdef USE_TRANSMISSIONMAP\nmaterial.transmission*=texture2D(transmissionMap,vUv).r;\n#endif\n#ifdef USE_THICKNESSMAP\nmaterial.thickness*=texture2D(thicknessMap,vUv).g;\n#endif\nvec3 pos=vWorldPosition;vec3 v=normalize(cameraPosition-pos);vec3 n=inverseTransformDirection(normal,viewMatrix);vec4 transmission=getIBLVolumeRefraction(n,v,material.roughness,material.diffuseColor,material.specularColor,material.specularF90,pos,modelMatrix,viewMatrix,projectionMatrix,material.ior,material.thickness,material.attenuationColor,material.attenuationDistance);material.transmissionAlpha=mix(material.transmissionAlpha,transmission.a,material.transmission);totalDiffuse=mix(totalDiffuse,transmission.rgb,material.transmission);\n#endif",
    transmission_pars_fragment: "#ifdef USE_TRANSMISSION\nuniform float transmission;uniform float thickness;uniform float attenuationDistance;uniform vec3 attenuationColor;\n#ifdef USE_TRANSMISSIONMAP\nuniform sampler2D transmissionMap;\n#endif\n#ifdef USE_THICKNESSMAP\nuniform sampler2D thicknessMap;\n#endif\nuniform vec2 transmissionSamplerSize;uniform sampler2D transmissionSamplerMap;uniform mat4 modelMatrix;uniform mat4 projectionMatrix;varying vec3 vWorldPosition;float w0(float a){return(1.0/6.0)*(a*(a*(-a+3.0)-3.0)+1.0);}float w1(float a){return(1.0/6.0)*(a*a*(3.0*a-6.0)+4.0);}float w2(float a){return(1.0/6.0)*(a*(a*(-3.0*a+3.0)+3.0)+1.0);}float w3(float a){return(1.0/6.0)*(a*a*a);}float g0(float a){return w0(a)+w1(a);}float g1(float a){return w2(a)+w3(a);}float h0(float a){return-1.0+w1(a)/(w0(a)+w1(a));}float h1(float a){return 1.0+w3(a)/(w2(a)+w3(a));}vec4 bicubic(sampler2D tex,vec2 uv,vec4 texelSize,vec2 fullSize,float lod){uv=uv*texelSize.zw+0.5;vec2 iuv=floor(uv);vec2 fuv=fract(uv);float g0x=g0(fuv.x);float g1x=g1(fuv.x);float h0x=h0(fuv.x);float h1x=h1(fuv.x);float h0y=h0(fuv.y);float h1y=h1(fuv.y);vec2 p0=(vec2(iuv.x+h0x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p1=(vec2(iuv.x+h1x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p2=(vec2(iuv.x+h0x,iuv.y+h1y)-0.5)*texelSize.xy;vec2 p3=(vec2(iuv.x+h1x,iuv.y+h1y)-0.5)*texelSize.xy;vec2 lodFudge=pow(1.95,lod)/fullSize;return g0(fuv.y)*(g0x*textureLod(tex,p0,lod)+g1x*textureLod(tex,p1,lod))+g1(fuv.y)*(g0x*textureLod(tex,p2,lod)+g1x*textureLod(tex,p3,lod));}vec4 textureBicubic(sampler2D sampler,vec2 uv,float lod){vec2 fLodSize=vec2(textureSize(sampler,int(lod)));vec2 cLodSize=vec2(textureSize(sampler,int(lod+1.0)));vec2 fLodSizeInv=1.0/fLodSize;vec2 cLodSizeInv=1.0/cLodSize;vec2 fullSize=vec2(textureSize(sampler,0));vec4 fSample=bicubic(sampler,uv,vec4(fLodSizeInv,fLodSize),fullSize,floor(lod));vec4 cSample=bicubic(sampler,uv,vec4(cLodSizeInv,cLodSize),fullSize,ceil(lod));return mix(fSample,cSample,fract(lod));}vec3 getVolumeTransmissionRay(const in vec3 n,const in vec3 v,const in float thickness,const in float ior,const in mat4 modelMatrix){vec3 refractionVector=refract(-v,normalize(n),1.0/ior);vec3 modelScale;modelScale.x=length(vec3(modelMatrix[0].xyz));modelScale.y=length(vec3(modelMatrix[1].xyz));modelScale.z=length(vec3(modelMatrix[2].xyz));return normalize(refractionVector)*thickness*modelScale;}float applyIorToRoughness(const in float roughness,const in float ior){return roughness*clamp(ior*2.0-2.0,0.0,1.0);}vec4 getTransmissionSample(const in vec2 fragCoord,const in float roughness,const in float ior){float lod=log2(transmissionSamplerSize.x)*applyIorToRoughness(roughness,ior);return textureBicubic(transmissionSamplerMap,fragCoord.xy,lod);}vec3 applyVolumeAttenuation(const in vec3 radiance,const in float transmissionDistance,const in vec3 attenuationColor,const in float attenuationDistance){if(isinf(attenuationDistance)){return radiance;}else{vec3 attenuationCoefficient=-log(attenuationColor)/attenuationDistance;vec3 transmittance=exp(-attenuationCoefficient*transmissionDistance);return transmittance*radiance;}}vec4 getIBLVolumeRefraction(const in vec3 n,const in vec3 v,const in float roughness,const in vec3 diffuseColor,const in vec3 specularColor,const in float specularF90,const in vec3 position,const in mat4 modelMatrix,const in mat4 viewMatrix,const in mat4 projMatrix,const in float ior,const in float thickness,const in vec3 attenuationColor,const in float attenuationDistance){vec3 transmissionRay=getVolumeTransmissionRay(n,v,thickness,ior,modelMatrix);vec3 refractedRayExit=position+transmissionRay;vec4 ndcPos=projMatrix*viewMatrix*vec4(refractedRayExit,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;vec4 transmittedLight=getTransmissionSample(refractionCoords,roughness,ior);vec3 attenuatedColor=applyVolumeAttenuation(transmittedLight.rgb,length(transmissionRay),attenuationColor,attenuationDistance);vec3 F=EnvironmentBRDF(n,v,specularColor,specularF90,roughness);return vec4((1.0-F)*attenuatedColor*diffuseColor,transmittedLight.a);}\n#endif",
    uv_pars_fragment: "#if (defined(USE_UV)&&!defined(UVS_VERTEX_ONLY))\nvarying vec2 vUv;\n#endif",
    uv_pars_vertex: "#ifdef USE_UV\n#ifdef UVS_VERTEX_ONLY\nvec2 vUv;\n#else\nvarying vec2 vUv;\n#endif\nuniform mat3 uvTransform;\n#endif",
    uv_vertex: "#ifdef USE_UV\nvUv=(uvTransform*vec3(uv,1)).xy;\n#endif",
    uv2_pars_fragment: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvarying vec2 vUv2;\n#endif",
    uv2_pars_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nattribute vec2 uv2;varying vec2 vUv2;uniform mat3 uv2Transform;\n#endif",
    uv2_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvUv2=(uv2Transform*vec3(uv2,1)).xy;\n#endif",
    worldpos_vertex: "#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)||NUM_SPOT_LIGHT_COORDS>0\nvec4 worldPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nworldPosition=instanceMatrix*worldPosition;\n#endif\nworldPosition=modelMatrix*worldPosition;\n#endif",
    background_vert: "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}",
    background_frag: "uniform sampler2D t2D;uniform float backgroundIntensity;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);\n#ifdef DECODE_VIDEO_TEXTURE\ntexColor=vec4(mix(pow(texColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),texColor.rgb*0.0773993808,vec3(lessThanEqual(texColor.rgb,vec3(0.04045)))),texColor.w);\n#endif\ntexColor.rgb*=backgroundIntensity;gl_FragColor=texColor;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
    backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\ngl_Position.z=gl_Position.w;}",
    backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube envMap;\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;uniform float backgroundBlurriness;uniform float backgroundIntensity;varying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main(){\n#ifdef ENVMAP_TYPE_CUBE\nvec4 texColor=textureCube(envMap,vec3(flipEnvMap*vWorldDirection.x,vWorldDirection.yz));\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 texColor=textureCubeUV(envMap,vWorldDirection,backgroundBlurriness);\n#else\nvec4 texColor=vec4(0.0,0.0,0.0,1.0);\n#endif\ntexColor.rgb*=backgroundIntensity;gl_FragColor=texColor;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
    cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\ngl_Position.z=gl_Position.w;}",
    cube_frag: "uniform samplerCube tCube;uniform float tFlip;uniform float opacity;varying vec3 vWorldDirection;void main(){vec4 texColor=textureCube(tCube,vec3(tFlip*vWorldDirection.x,vWorldDirection.yz));gl_FragColor=texColor;gl_FragColor.a*=opacity;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
    depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvHighPrecisionZW=gl_Position.zw;}",
    depth_frag: "#if DEPTH_PACKING==3200\nuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#if DEPTH_PACKING==3200\ndiffuseColor.a=opacity;\n#endif\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <logdepthbuf_fragment>\nfloat fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;\n#if DEPTH_PACKING==3200\ngl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);\n#elif DEPTH_PACKING==3201\ngl_FragColor=packDepthToRGBA(fragCoordZ);\n#endif\n}",
    distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\nvWorldPosition=worldPosition.xyz;}",
    distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\nfloat dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}",
    equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
    equirect_frag: "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
    linedashed_vert: "uniform float scale;attribute float lineDistance;varying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){vLineDistance=scale*lineDistance;\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}",
    linedashed_frag: "uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nif(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <color_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
    meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#if defined(USE_ENVMAP)||defined(USE_SKINNING)\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <fog_vertex>\n}",
    meshbasic_frag: "uniform vec3 diffuse;uniform float opacity;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\nReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=lightMapTexel.rgb*lightMapIntensity*RECIPROCAL_PI;\n#else\nreflectedLight.indirectDiffuse+=vec3(1.0);\n#endif\n#include <aomap_fragment>\nreflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
    meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_lambert_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\nvViewPosition=-mvPosition.xyz;}",
    meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\nvec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;\n#ifdef USE_MATCAP\nvec4 matcapColor=texture2D(matcap,uv);\n#else\nvec4 matcapColor=vec4(vec3(mix(0.2,0.8,uv.y)),1.0);\n#endif\nvec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    meshnormal_vert: "#define NORMAL\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvViewPosition=-mvPosition.xyz;\n#endif\n}",
    meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\n#include <logdepthbuf_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\ngl_FragColor=vec4(packNormalToRGB(normal),opacity);\n#ifdef OPAQUE\ngl_FragColor.a=1.0;\n#endif\n}",
    meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
    meshphong_frag: "#define PHONG\nuniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\nvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n#ifdef USE_TRANSMISSION\nvWorldPosition=worldPosition.xyz;\n#endif\n}",
    meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n#define IOR\n#define SPECULAR\n#endif\nuniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;\n#ifdef IOR\nuniform float ior;\n#endif\n#ifdef SPECULAR\nuniform float specularIntensity;uniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\nuniform sampler2D specularIntensityMap;\n#endif\n#ifdef USE_SPECULARCOLORMAP\nuniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\nuniform float clearcoat;uniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\nuniform float iridescence;uniform float iridescenceIOR;uniform float iridescenceThicknessMinimum;uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheenColor;uniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\nuniform sampler2D sheenColorMap;\n#endif\n#ifdef USE_SHEENROUGHNESSMAP\nuniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 totalDiffuse=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse;vec3 totalSpecular=reflectedLight.directSpecular+reflectedLight.indirectSpecular;\n#include <transmission_fragment>\nvec3 outgoingLight=totalDiffuse+totalSpecular+totalEmissiveRadiance;\n#ifdef USE_SHEEN\nfloat sheenEnergyComp=1.0-0.157*max3(material.sheenColor);outgoingLight=outgoingLight*sheenEnergyComp+sheenSpecular;\n#endif\n#ifdef USE_CLEARCOAT\nfloat dotNVcc=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));vec3 Fcc=F_Schlick(material.clearcoatF0,material.clearcoatF90,dotNVcc);outgoingLight=outgoingLight*(1.0-material.clearcoat*Fcc)+clearcoatSpecular*material.clearcoat;\n#endif\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
    meshtoon_frag: "#define TOON\nuniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_toon_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
    points_vert: "uniform float size;uniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <color_vertex>\n#include <morphcolor_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\ngl_PointSize=size;\n#ifdef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);\n#endif\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <fog_vertex>\n}",
    points_frag: "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_particle_fragment>\n#include <color_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
    shadow_vert: "#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main(){\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
    shadow_frag: "uniform vec3 color;uniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main(){\n#include <logdepthbuf_fragment>\ngl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
    sprite_vert: "uniform float rotation;uniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\nvec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));\n#ifndef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;\n#endif\nvec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}",
    sprite_frag: "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}"
  },
  PP = {
    common: {
      diffuse: {
        value: new AC(16777215)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      uvTransform: {
        value: new LA()
      },
      uv2Transform: {
        value: new LA()
      },
      alphaMap: {
        value: null
      },
      alphaTest: {
        value: 0
      }
    },
    specularmap: {
      specularMap: {
        value: null
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      },
      reflectivity: {
        value: 1
      },
      ior: {
        value: 1.5
      },
      refractionRatio: {
        value: .98
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalScale: {
        value: new DA(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 25e-5
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2e3
      },
      fogColor: {
        value: new AC(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      lightProbe: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMap: {
        value: []
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {}
        }
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotLightMap: {
        value: []
      },
      spotShadowMap: {
        value: []
      },
      spotLightMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {}
        }
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMap: {
        value: []
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      },
      ltc_1: {
        value: null
      },
      ltc_2: {
        value: null
      }
    },
    points: {
      diffuse: {
        value: new AC(16777215)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      alphaTest: {
        value: 0
      },
      uvTransform: {
        value: new LA()
      }
    },
    sprite: {
      diffuse: {
        value: new AC(16777215)
      },
      opacity: {
        value: 1
      },
      center: {
        value: new DA(.5, .5)
      },
      rotation: {
        value: 0
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      alphaTest: {
        value: 0
      },
      uvTransform: {
        value: new LA()
      }
    }
  },
  TP = {
    basic: {
      uniforms: rP([PP.common, PP.specularmap, PP.envmap, PP.aomap, PP.lightmap, PP.fog]),
      vertexShader: CP.meshbasic_vert,
      fragmentShader: CP.meshbasic_frag
    },
    lambert: {
      uniforms: rP([PP.common, PP.specularmap, PP.envmap, PP.aomap, PP.lightmap, PP.emissivemap, PP.bumpmap, PP.normalmap, PP.displacementmap, PP.fog, PP.lights, {
        emissive: {
          value: new AC(0)
        }
      }]),
      vertexShader: CP.meshlambert_vert,
      fragmentShader: CP.meshlambert_frag
    },
    phong: {
      uniforms: rP([PP.common, PP.specularmap, PP.envmap, PP.aomap, PP.lightmap, PP.emissivemap, PP.bumpmap, PP.normalmap, PP.displacementmap, PP.fog, PP.lights, {
        emissive: {
          value: new AC(0)
        },
        specular: {
          value: new AC(1118481)
        },
        shininess: {
          value: 30
        }
      }]),
      vertexShader: CP.meshphong_vert,
      fragmentShader: CP.meshphong_frag
    },
    standard: {
      uniforms: rP([PP.common, PP.envmap, PP.aomap, PP.lightmap, PP.emissivemap, PP.bumpmap, PP.normalmap, PP.displacementmap, PP.roughnessmap, PP.metalnessmap, PP.fog, PP.lights, {
        emissive: {
          value: new AC(0)
        },
        roughness: {
          value: 1
        },
        metalness: {
          value: 0
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: CP.meshphysical_vert,
      fragmentShader: CP.meshphysical_frag
    },
    toon: {
      uniforms: rP([PP.common, PP.aomap, PP.lightmap, PP.emissivemap, PP.bumpmap, PP.normalmap, PP.displacementmap, PP.gradientmap, PP.fog, PP.lights, {
        emissive: {
          value: new AC(0)
        }
      }]),
      vertexShader: CP.meshtoon_vert,
      fragmentShader: CP.meshtoon_frag
    },
    matcap: {
      uniforms: rP([PP.common, PP.bumpmap, PP.normalmap, PP.displacementmap, PP.fog, {
        matcap: {
          value: null
        }
      }]),
      vertexShader: CP.meshmatcap_vert,
      fragmentShader: CP.meshmatcap_frag
    },
    points: {
      uniforms: rP([PP.points, PP.fog]),
      vertexShader: CP.points_vert,
      fragmentShader: CP.points_frag
    },
    dashed: {
      uniforms: rP([PP.common, PP.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: CP.linedashed_vert,
      fragmentShader: CP.linedashed_frag
    },
    depth: {
      uniforms: rP([PP.common, PP.displacementmap]),
      vertexShader: CP.depth_vert,
      fragmentShader: CP.depth_frag
    },
    normal: {
      uniforms: rP([PP.common, PP.bumpmap, PP.normalmap, PP.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: CP.meshnormal_vert,
      fragmentShader: CP.meshnormal_frag
    },
    sprite: {
      uniforms: rP([PP.sprite, PP.fog]),
      vertexShader: CP.sprite_vert,
      fragmentShader: CP.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new LA()
        },
        t2D: {
          value: null
        },
        backgroundIntensity: {
          value: 1
        }
      },
      vertexShader: CP.background_vert,
      fragmentShader: CP.background_frag
    },
    backgroundCube: {
      uniforms: {
        envMap: {
          value: null
        },
        flipEnvMap: {
          value: -1
        },
        backgroundBlurriness: {
          value: 0
        },
        backgroundIntensity: {
          value: 1
        }
      },
      vertexShader: CP.backgroundCube_vert,
      fragmentShader: CP.backgroundCube_frag
    },
    cube: {
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        opacity: {
          value: 1
        }
      },
      vertexShader: CP.cube_vert,
      fragmentShader: CP.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: CP.equirect_vert,
      fragmentShader: CP.equirect_frag
    },
    distanceRGBA: {
      uniforms: rP([PP.common, PP.displacementmap, {
        referencePosition: {
          value: new HA()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1e3
        }
      }]),
      vertexShader: CP.distanceRGBA_vert,
      fragmentShader: CP.distanceRGBA_frag
    },
    shadow: {
      uniforms: rP([PP.lights, PP.fog, {
        color: {
          value: new AC(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: CP.shadow_vert,
      fragmentShader: CP.shadow_frag
    }
  };
TP.physical = {
  uniforms: rP([TP.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatNormalScale: {
      value: new DA(1, 1)
    },
    clearcoatNormalMap: {
      value: null
    },
    iridescence: {
      value: 0
    },
    iridescenceMap: {
      value: null
    },
    iridescenceIOR: {
      value: 1.3
    },
    iridescenceThicknessMinimum: {
      value: 100
    },
    iridescenceThicknessMaximum: {
      value: 400
    },
    iridescenceThicknessMap: {
      value: null
    },
    sheen: {
      value: 0
    },
    sheenColor: {
      value: new AC(0)
    },
    sheenColorMap: {
      value: null
    },
    sheenRoughness: {
      value: 1
    },
    sheenRoughnessMap: {
      value: null
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionSamplerSize: {
      value: new DA()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    attenuationDistance: {
      value: 0
    },
    attenuationColor: {
      value: new AC(0)
    },
    specularIntensity: {
      value: 1
    },
    specularIntensityMap: {
      value: null
    },
    specularColor: {
      value: new AC(1, 1, 1)
    },
    specularColorMap: {
      value: null
    }
  }]),
  vertexShader: CP.meshphysical_vert,
  fragmentShader: CP.meshphysical_frag
};
const EP = {
  r: 0,
  b: 0,
  g: 0
};
function BP(e, t, s, i, n, a, r) {
  const o = new AC(0);
  let l,
    c,
    h = !0 === a ? 0 : 1,
    u = null,
    d = 0,
    p = null;
  function m(t, s) {
    t.getRGB(EP, oP(e)), i.buffers.color.setClear(EP.r, EP.g, EP.b, s, r);
  }
  return {
    getClearColor: function () {
      return o;
    },
    setClearColor: function (e, t = 1) {
      o.set(e), h = t, m(o, h);
    },
    getClearAlpha: function () {
      return h;
    },
    setClearAlpha: function (e) {
      h = e, m(o, h);
    },
    render: function (i, a) {
      let r = !1,
        f = !0 === a.isScene ? a.background : null;
      if (f && f.isTexture) {
        f = (a.backgroundBlurriness > 0 ? s : t).get(f);
      }
      const g = e.xr,
        v = g.getSession && g.getSession();
      v && "additive" === v.environmentBlendMode && (f = null), null === f ? m(o, h) : f && f.isColor && (m(f, 1), r = !0), (e.autoClear || r) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), f && (f.isCubeTexture || f.mapping === zw) ? (void 0 === c && (c = new sP(new nP(1, 1, 1), new cP({
        name: "BackgroundCubeMaterial",
        uniforms: aP(TP.backgroundCube.uniforms),
        vertexShader: TP.backgroundCube.vertexShader,
        fragmentShader: TP.backgroundCube.fragmentShader,
        side: qx,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function (e, t, s) {
        this.matrixWorld.copyPosition(s.matrixWorld);
      }, Object.defineProperty(c.material, "envMap", {
        get: function () {
          return this.uniforms.envMap.value;
        }
      }), n.update(c)), c.material.uniforms.envMap.value = f, c.material.uniforms.flipEnvMap.value = f.isCubeTexture && !1 === f.isRenderTargetTexture ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = a.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = a.backgroundIntensity, c.material.toneMapped = f.encoding !== aA, u === f && d === f.version && p === e.toneMapping || (c.material.needsUpdate = !0, u = f, d = f.version, p = e.toneMapping), c.layers.enableAll(), i.unshift(c, c.geometry, c.material, 0, 0, null)) : f && f.isTexture && (void 0 === l && (l = new sP(new MP(2, 2), new cP({
        name: "BackgroundMaterial",
        uniforms: aP(TP.background.uniforms),
        vertexShader: TP.background.vertexShader,
        fragmentShader: TP.background.fragmentShader,
        side: jx,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
        get: function () {
          return this.uniforms.t2D.value;
        }
      }), n.update(l)), l.material.uniforms.t2D.value = f, l.material.uniforms.backgroundIntensity.value = a.backgroundIntensity, l.material.toneMapped = f.encoding !== aA, !0 === f.matrixAutoUpdate && f.updateMatrix(), l.material.uniforms.uvTransform.value.copy(f.matrix), u === f && d === f.version && p === e.toneMapping || (l.material.needsUpdate = !0, u = f, d = f.version, p = e.toneMapping), l.layers.enableAll(), i.unshift(l, l.geometry, l.material, 0, 0, null));
    }
  };
}
function IP(e, t, s, i) {
  const n = e.getParameter(34921),
    a = i.isWebGL2 ? null : t.get("OES_vertex_array_object"),
    r = i.isWebGL2 || null !== a,
    o = {},
    l = p(null);
  let c = l,
    h = !1;
  function u(t) {
    return i.isWebGL2 ? e.bindVertexArray(t) : a.bindVertexArrayOES(t);
  }
  function d(t) {
    return i.isWebGL2 ? e.deleteVertexArray(t) : a.deleteVertexArrayOES(t);
  }
  function p(e) {
    const t = [],
      s = [],
      i = [];
    for (let a = 0; a < n; a++) t[a] = 0, s[a] = 0, i[a] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: t,
      enabledAttributes: s,
      attributeDivisors: i,
      object: e,
      attributes: {},
      index: null
    };
  }
  function m() {
    const e = c.newAttributes;
    for (let t = 0, s = e.length; t < s; t++) e[t] = 0;
  }
  function f(e) {
    g(e, 0);
  }
  function g(s, n) {
    const a = c.newAttributes,
      r = c.enabledAttributes,
      o = c.attributeDivisors;
    if (a[s] = 1, 0 === r[s] && (e.enableVertexAttribArray(s), r[s] = 1), o[s] !== n) {
      (i.isWebGL2 ? e : t.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](s, n), o[s] = n;
    }
  }
  function v() {
    const t = c.newAttributes,
      s = c.enabledAttributes;
    for (let i = 0, n = s.length; i < n; i++) s[i] !== t[i] && (e.disableVertexAttribArray(i), s[i] = 0);
  }
  function b(t, s, n, a, r, o) {
    !0 !== i.isWebGL2 || 5124 !== n && 5125 !== n ? e.vertexAttribPointer(t, s, n, a, r, o) : e.vertexAttribIPointer(t, s, n, r, o);
  }
  function y() {
    _(), h = !0, c !== l && (c = l, u(c.object));
  }
  function _() {
    l.geometry = null, l.program = null, l.wireframe = !1;
  }
  return {
    setup: function (n, l, d, y, _) {
      let x = !1;
      if (r) {
        const t = function (t, s, n) {
          const r = !0 === n.wireframe;
          let l = o[t.id];
          void 0 === l && (l = {}, o[t.id] = l);
          let c = l[s.id];
          void 0 === c && (c = {}, l[s.id] = c);
          let h = c[r];
          void 0 === h && (h = p(i.isWebGL2 ? e.createVertexArray() : a.createVertexArrayOES()), c[r] = h);
          return h;
        }(y, d, l);
        c !== t && (c = t, u(c.object)), x = function (e, t, s, i) {
          const n = c.attributes,
            a = t.attributes;
          let r = 0;
          const o = s.getAttributes();
          for (const l in o) {
            if (o[l].location >= 0) {
              const t = n[l];
              let s = a[l];
              if (void 0 === s && ("instanceMatrix" === l && e.instanceMatrix && (s = e.instanceMatrix), "instanceColor" === l && e.instanceColor && (s = e.instanceColor)), void 0 === t) return !0;
              if (t.attribute !== s) return !0;
              if (s && t.data !== s.data) return !0;
              r++;
            }
          }
          return c.attributesNum !== r || c.index !== i;
        }(n, y, d, _), x && function (e, t, s, i) {
          const n = {},
            a = t.attributes;
          let r = 0;
          const o = s.getAttributes();
          for (const l in o) {
            if (o[l].location >= 0) {
              let t = a[l];
              void 0 === t && ("instanceMatrix" === l && e.instanceMatrix && (t = e.instanceMatrix), "instanceColor" === l && e.instanceColor && (t = e.instanceColor));
              const s = {};
              s.attribute = t, t && t.data && (s.data = t.data), n[l] = s, r++;
            }
          }
          c.attributes = n, c.attributesNum = r, c.index = i;
        }(n, y, d, _);
      } else {
        const e = !0 === l.wireframe;
        c.geometry === y.id && c.program === d.id && c.wireframe === e || (c.geometry = y.id, c.program = d.id, c.wireframe = e, x = !0);
      }
      null !== _ && s.update(_, 34963), (x || h) && (h = !1, function (n, a, r, o) {
        if (!1 === i.isWebGL2 && (n.isInstancedMesh || o.isInstancedBufferGeometry) && null === t.get("ANGLE_instanced_arrays")) return;
        m();
        const l = o.attributes,
          c = r.getAttributes(),
          h = a.defaultAttributeValues;
        for (const t in c) {
          const i = c[t];
          if (i.location >= 0) {
            let a = l[t];
            if (void 0 === a && ("instanceMatrix" === t && n.instanceMatrix && (a = n.instanceMatrix), "instanceColor" === t && n.instanceColor && (a = n.instanceColor)), void 0 !== a) {
              const t = a.normalized,
                r = a.itemSize,
                l = s.get(a);
              if (void 0 === l) continue;
              const c = l.buffer,
                h = l.type,
                u = l.bytesPerElement;
              if (a.isInterleavedBufferAttribute) {
                const s = a.data,
                  l = s.stride,
                  d = a.offset;
                if (s.isInstancedInterleavedBuffer) {
                  for (let e = 0; e < i.locationSize; e++) g(i.location + e, s.meshPerAttribute);
                  !0 !== n.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = s.meshPerAttribute * s.count);
                } else for (let e = 0; e < i.locationSize; e++) f(i.location + e);
                e.bindBuffer(34962, c);
                for (let e = 0; e < i.locationSize; e++) b(i.location + e, r / i.locationSize, h, t, l * u, (d + r / i.locationSize * e) * u);
              } else {
                if (a.isInstancedBufferAttribute) {
                  for (let e = 0; e < i.locationSize; e++) g(i.location + e, a.meshPerAttribute);
                  !0 !== n.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = a.meshPerAttribute * a.count);
                } else for (let e = 0; e < i.locationSize; e++) f(i.location + e);
                e.bindBuffer(34962, c);
                for (let e = 0; e < i.locationSize; e++) b(i.location + e, r / i.locationSize, h, t, r * u, r / i.locationSize * e * u);
              }
            } else if (void 0 !== h) {
              const s = h[t];
              if (void 0 !== s) switch (s.length) {
                case 2:
                  e.vertexAttrib2fv(i.location, s);
                  break;
                case 3:
                  e.vertexAttrib3fv(i.location, s);
                  break;
                case 4:
                  e.vertexAttrib4fv(i.location, s);
                  break;
                default:
                  e.vertexAttrib1fv(i.location, s);
              }
            }
          }
        }
        v();
      }(n, l, d, y), null !== _ && e.bindBuffer(34963, s.get(_).buffer));
    },
    reset: y,
    resetDefaultState: _,
    dispose: function () {
      y();
      for (const e in o) {
        const t = o[e];
        for (const e in t) {
          const s = t[e];
          for (const e in s) d(s[e].object), delete s[e];
          delete t[e];
        }
        delete o[e];
      }
    },
    releaseStatesOfGeometry: function (e) {
      if (void 0 === o[e.id]) return;
      const t = o[e.id];
      for (const s in t) {
        const e = t[s];
        for (const t in e) d(e[t].object), delete e[t];
        delete t[s];
      }
      delete o[e.id];
    },
    releaseStatesOfProgram: function (e) {
      for (const t in o) {
        const s = o[t];
        if (void 0 === s[e.id]) continue;
        const i = s[e.id];
        for (const e in i) d(i[e].object), delete i[e];
        delete s[e.id];
      }
    },
    initAttributes: m,
    enableAttribute: f,
    disableUnusedAttributes: v
  };
}
function kP(e, t, s, i) {
  const n = i.isWebGL2;
  let a;
  this.setMode = function (e) {
    a = e;
  }, this.render = function (t, i) {
    e.drawArrays(a, t, i), s.update(i, a, 1);
  }, this.renderInstances = function (i, r, o) {
    if (0 === o) return;
    let l, c;
    if (n) l = e, c = "drawArraysInstanced";else if (l = t.get("ANGLE_instanced_arrays"), c = "drawArraysInstancedANGLE", null === l) return;
    l[c](a, i, r, o), s.update(r, a, o);
  };
}
function DP(e, t, s) {
  let i;
  function n(t) {
    if ("highp" === t) {
      if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
      t = "mediump";
    }
    return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp";
  }
  const a = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext;
  let r = void 0 !== s.precision ? s.precision : "highp";
  const o = n(r);
  o !== r && (r = o);
  const l = a || t.has("WEBGL_draw_buffers"),
    c = !0 === s.logarithmicDepthBuffer,
    h = e.getParameter(34930),
    u = e.getParameter(35660),
    d = e.getParameter(3379),
    p = e.getParameter(34076),
    m = e.getParameter(34921),
    f = e.getParameter(36347),
    g = e.getParameter(36348),
    v = e.getParameter(36349),
    b = u > 0,
    y = a || t.has("OES_texture_float");
  return {
    isWebGL2: a,
    drawBuffers: l,
    getMaxAnisotropy: function () {
      if (void 0 !== i) return i;
      if (!0 === t.has("EXT_texture_filter_anisotropic")) {
        const s = t.get("EXT_texture_filter_anisotropic");
        i = e.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else i = 0;
      return i;
    },
    getMaxPrecision: n,
    precision: r,
    logarithmicDepthBuffer: c,
    maxTextures: h,
    maxVertexTextures: u,
    maxTextureSize: d,
    maxCubemapSize: p,
    maxAttributes: m,
    maxVertexUniforms: f,
    maxVaryings: g,
    maxFragmentUniforms: v,
    vertexTextures: b,
    floatFragmentTextures: y,
    floatVertexTextures: b && y,
    maxSamples: a ? e.getParameter(36183) : 0
  };
}
function LP(e) {
  const t = this;
  let s = null,
    i = 0,
    n = !1,
    a = !1;
  const r = new yP(),
    o = new LA(),
    l = {
      value: null,
      needsUpdate: !1
    };
  function c(e, s, i, n) {
    const a = null !== e ? e.length : 0;
    let c = null;
    if (0 !== a) {
      if (c = l.value, !0 !== n || null === c) {
        const t = i + 4 * a,
          n = s.matrixWorldInverse;
        o.getNormalMatrix(n), (null === c || c.length < t) && (c = new Float32Array(t));
        for (let s = 0, l = i; s !== a; ++s, l += 4) r.copy(e[s]).applyMatrix4(n, o), r.normal.toArray(c, l), c[l + 3] = r.constant;
      }
      l.value = c, l.needsUpdate = !0;
    }
    return t.numPlanes = a, t.numIntersection = 0, c;
  }
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, t) {
    const s = 0 !== e.length || t || 0 !== i || n;
    return n = t, i = e.length, s;
  }, this.beginShadows = function () {
    a = !0, c(null);
  }, this.endShadows = function () {
    a = !1;
  }, this.setGlobalState = function (e, t) {
    s = c(e, t, 0);
  }, this.setState = function (r, o, h) {
    const u = r.clippingPlanes,
      d = r.clipIntersection,
      p = r.clipShadows,
      m = e.get(r);
    if (!n || null === u || 0 === u.length || a && !p) a ? c(null) : function () {
      l.value !== s && (l.value = s, l.needsUpdate = i > 0);
      t.numPlanes = i, t.numIntersection = 0;
    }();else {
      const e = a ? 0 : i,
        t = 4 * e;
      let n = m.clippingState || null;
      l.value = n, n = c(u, o, t, h);
      for (let i = 0; i !== t; ++i) n[i] = s[i];
      m.clippingState = n, this.numIntersection = d ? this.numPlanes : 0, this.numPlanes += e;
    }
  };
}
function OP(e) {
  let t = new WeakMap();
  function s(e, t) {
    return t === Ow ? e.mapping = Dw : t === Rw && (e.mapping = Lw), e;
  }
  function i(e) {
    const s = e.target;
    s.removeEventListener("dispose", i);
    const n = t.get(s);
    void 0 !== n && (t.delete(s), n.dispose());
  }
  return {
    get: function (n) {
      if (n && n.isTexture && !1 === n.isRenderTargetTexture) {
        const a = n.mapping;
        if (a === Ow || a === Rw) {
          if (t.has(n)) {
            return s(t.get(n).texture, n.mapping);
          }
          {
            const a = n.image;
            if (a && a.height > 0) {
              const r = new fP(a.height / 2);
              return r.fromEquirectangularTexture(e, n), t.set(n, r), n.addEventListener("dispose", i), s(r.texture, n.mapping);
            }
            return null;
          }
        }
      }
      return n;
    },
    dispose: function () {
      t = new WeakMap();
    }
  };
}
class RP extends hP {
  constructor(e = -1, t = 1, s = 1, i = -1, n = .1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = s, this.bottom = i, this.near = n, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, s, i, n, a) {
    null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = s, this.view.offsetY = i, this.view.width = n, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom),
      t = (this.top - this.bottom) / (2 * this.zoom),
      s = (this.right + this.left) / 2,
      i = (this.top + this.bottom) / 2;
    let n = s - e,
      a = s + e,
      r = i + t,
      o = i - t;
    if (null !== this.view && this.view.enabled) {
      const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
        t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      n += e * this.view.offsetX, a = n + e * this.view.width, r -= t * this.view.offsetY, o = r - t * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(n, a, r, o, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const zP = [.125, .215, .35, .446, .526, .582],
  NP = 20,
  FP = new RP(),
  UP = new AC();
let HP = null;
const GP = (1 + Math.sqrt(5)) / 2,
  VP = 1 / GP,
  WP = [new HA(1, 1, 1), new HA(-1, 1, 1), new HA(1, 1, -1), new HA(-1, 1, -1), new HA(0, GP, VP), new HA(0, GP, -VP), new HA(VP, 0, GP), new HA(-VP, 0, GP), new HA(GP, VP, 0), new HA(-GP, VP, 0)];
class jP {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, s = .1, i = 100) {
    HP = this._renderer.getRenderTarget(), this._setSize(256);
    const n = this._allocateTargets();
    return n.depthBuffer = !0, this._sceneToCubeUV(e, s, i, n), t > 0 && this._blur(n, 0, 0, t), this._applyPMREM(n), this._cleanup(n), n;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    null === this._cubemapMaterial && (this._cubemapMaterial = XP(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    null === this._equirectMaterial && (this._equirectMaterial = $P(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose();
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(HP), e.scissorTest = !1, ZP(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Dw || e.mapping === Lw ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), HP = this._renderer.getRenderTarget();
    const s = t || this._allocateTargets();
    return this._textureToCubeUV(e, s), this._applyPMREM(s), this._cleanup(s), s;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112),
      t = 4 * this._cubeSize,
      s = {
        magFilter: Ww,
        minFilter: Ww,
        generateMipmaps: !1,
        type: eS,
        format: aS,
        encoding: nA,
        depthBuffer: !1
      },
      i = qP(e, t, s);
    if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = qP(e, t, s);
      const {
        _lodMax: i
      } = this;
      ({
        sizeLods: this._sizeLods,
        lodPlanes: this._lodPlanes,
        sigmas: this._sigmas
      } = function (e) {
        const t = [],
          s = [],
          i = [];
        let n = e;
        const a = e - 4 + 1 + zP.length;
        for (let r = 0; r < a; r++) {
          const a = Math.pow(2, n);
          s.push(a);
          let o = 1 / a;
          r > e - 4 ? o = zP[r - e + 4 - 1] : 0 === r && (o = 0), i.push(o);
          const l = 1 / (a - 2),
            c = -l,
            h = 1 + l,
            u = [c, c, h, c, h, h, c, c, h, h, c, h],
            d = 6,
            p = 6,
            m = 3,
            f = 2,
            g = 1,
            v = new Float32Array(m * p * d),
            b = new Float32Array(f * p * d),
            y = new Float32Array(g * p * d);
          for (let e = 0; e < d; e++) {
            const t = e % 3 * 2 / 3 - 1,
              s = e > 2 ? 0 : -1,
              i = [t, s, 0, t + 2 / 3, s, 0, t + 2 / 3, s + 1, 0, t, s, 0, t + 2 / 3, s + 1, 0, t, s + 1, 0];
            v.set(i, m * p * e), b.set(u, f * p * e);
            const n = [e, e, e, e, e, e];
            y.set(n, g * p * e);
          }
          const _ = new HC();
          _.setAttribute("position", new EC(v, m)), _.setAttribute("uv", new EC(b, f)), _.setAttribute("faceIndex", new EC(y, g)), t.push(_), n > 4 && n--;
        }
        return {
          lodPlanes: t,
          sizeLods: s,
          sigmas: i
        };
      }(i)), this._blurMaterial = function (e, t, s) {
        const i = new Float32Array(NP),
          n = new HA(0, 1, 0),
          a = new cP({
            name: "SphericalGaussianBlur",
            defines: {
              n: NP,
              CUBEUV_TEXEL_WIDTH: 1 / t,
              CUBEUV_TEXEL_HEIGHT: 1 / s,
              CUBEUV_MAX_MIP: `${e}.0`
            },
            uniforms: {
              envMap: {
                value: null
              },
              samples: {
                value: 1
              },
              weights: {
                value: i
              },
              latitudinal: {
                value: !1
              },
              dTheta: {
                value: 0
              },
              mipInt: {
                value: 0
              },
              poleAxis: {
                value: n
              }
            },
            vertexShader: YP(),
            fragmentShader: "precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform int samples;uniform float weights[n];uniform bool latitudinal;uniform float dTheta;uniform float mipInt;uniform vec3 poleAxis;\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\nvec3 getSample(float theta,vec3 axis){float cosTheta=cos(theta);vec3 sampleDirection=vOutputDirection*cosTheta+cross(axis,vOutputDirection)*sin(theta)+axis*dot(axis,vOutputDirection)*(1.0-cosTheta);return bilinearCubeUV(envMap,sampleDirection,mipInt);}void main(){vec3 axis=latitudinal?poleAxis:cross(poleAxis,vOutputDirection);if(all(equal(axis,vec3(0.0)))){axis=vec3(vOutputDirection.z,0.0,-vOutputDirection.x);}axis=normalize(axis);gl_FragColor=vec4(0.0,0.0,0.0,1.0);gl_FragColor.rgb+=weights[0]*getSample(0.0,axis);for(int i=1;i<n;i++){if(i>=samples){break;}float theta=dTheta*float(i);gl_FragColor.rgb+=weights[i]*getSample(-1.0*theta,axis);gl_FragColor.rgb+=weights[i]*getSample(theta,axis);}}",
            blending: $x,
            depthTest: !1,
            depthWrite: !1
          });
        return a;
      }(i, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new sP(this._lodPlanes[0], e);
    this._renderer.compile(t, FP);
  }
  _sceneToCubeUV(e, t, s, i) {
    const n = new uP(90, 1, t, s),
      a = [1, -1, 1, 1, 1, 1],
      r = [1, 1, 1, -1, -1, -1],
      o = this._renderer,
      l = o.autoClear,
      c = o.toneMapping;
    o.getClearColor(UP), o.toneMapping = Pw, o.autoClear = !1;
    const h = new CC({
        name: "PMREM.Background",
        side: qx,
        depthWrite: !1,
        depthTest: !1
      }),
      u = new sP(new nP(), h);
    let d = !1;
    const p = e.background;
    p ? p.isColor && (h.color.copy(p), e.background = null, d = !0) : (h.color.copy(UP), d = !0);
    for (let m = 0; m < 6; m++) {
      const t = m % 3;
      0 === t ? (n.up.set(0, a[m], 0), n.lookAt(r[m], 0, 0)) : 1 === t ? (n.up.set(0, 0, a[m]), n.lookAt(0, r[m], 0)) : (n.up.set(0, a[m], 0), n.lookAt(0, 0, r[m]));
      const s = this._cubeSize;
      ZP(i, t * s, m > 2 ? s : 0, s, s), o.setRenderTarget(i), d && o.render(u, n), o.render(e, n);
    }
    u.geometry.dispose(), u.material.dispose(), o.toneMapping = c, o.autoClear = l, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const s = this._renderer,
      i = e.mapping === Dw || e.mapping === Lw;
    i ? (null === this._cubemapMaterial && (this._cubemapMaterial = XP()), this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === e.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = $P());
    const n = i ? this._cubemapMaterial : this._equirectMaterial,
      a = new sP(this._lodPlanes[0], n);
    n.uniforms.envMap.value = e;
    const r = this._cubeSize;
    ZP(t, 0, 0, 3 * r, 2 * r), s.setRenderTarget(t), s.render(a, FP);
  }
  _applyPMREM(e) {
    const t = this._renderer,
      s = t.autoClear;
    t.autoClear = !1;
    for (let i = 1; i < this._lodPlanes.length; i++) {
      const t = Math.sqrt(this._sigmas[i] * this._sigmas[i] - this._sigmas[i - 1] * this._sigmas[i - 1]),
        s = WP[(i - 1) % WP.length];
      this._blur(e, i - 1, i, t, s);
    }
    t.autoClear = s;
  }
  _blur(e, t, s, i, n) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(e, a, t, s, i, "latitudinal", n), this._halfBlur(a, e, s, s, i, "longitudinal", n);
  }
  _halfBlur(e, t, s, i, n, a, r) {
    const o = this._renderer,
      l = this._blurMaterial,
      c = new sP(this._lodPlanes[i], l),
      h = l.uniforms,
      u = this._sizeLods[s] - 1,
      d = isFinite(n) ? Math.PI / (2 * u) : 2 * Math.PI / 39,
      p = n / d,
      m = isFinite(n) ? 1 + Math.floor(3 * p) : NP,
      f = [];
    let g = 0;
    for (let y = 0; y < NP; ++y) {
      const e = y / p,
        t = Math.exp(-e * e / 2);
      f.push(t), 0 === y ? g += t : y < m && (g += 2 * t);
    }
    for (let y = 0; y < f.length; y++) f[y] = f[y] / g;
    h.envMap.value = e.texture, h.samples.value = m, h.weights.value = f, h.latitudinal.value = "latitudinal" === a, r && (h.poleAxis.value = r);
    const {
      _lodMax: v
    } = this;
    h.dTheta.value = d, h.mipInt.value = v - s;
    const b = this._sizeLods[i];
    ZP(t, 3 * b * (i > v - 4 ? i - v + 4 : 0), 4 * (this._cubeSize - b), 3 * b, 2 * b), o.setRenderTarget(t), o.render(c, FP);
  }
}
function qP(e, t, s) {
  const i = new aM(e, t, s);
  return i.texture.mapping = zw, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function ZP(e, t, s, i, n) {
  e.viewport.set(t, s, i, n), e.scissor.set(t, s, i, n);
}
function $P() {
  return new cP({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null
      }
    },
    vertexShader: YP(),
    fragmentShader: "precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;\n#include <common>\nvoid main(){vec3 outputDirection=normalize(vOutputDirection);vec2 uv=equirectUv(outputDirection);gl_FragColor=vec4(texture2D(envMap,uv).rgb,1.0);}",
    blending: $x,
    depthTest: !1,
    depthWrite: !1
  });
}
function XP() {
  return new cP({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      }
    },
    vertexShader: YP(),
    fragmentShader: "precision mediump float;precision mediump int;uniform float flipEnvMap;varying vec3 vOutputDirection;uniform samplerCube envMap;void main(){gl_FragColor=textureCube(envMap,vec3(flipEnvMap*vOutputDirection.x,vOutputDirection.yz));}",
    blending: $x,
    depthTest: !1,
    depthWrite: !1
  });
}
function YP() {
  return "precision mediump float;precision mediump int;attribute float faceIndex;varying vec3 vOutputDirection;vec3 getDirection(vec2 uv,float face){uv=2.0*uv-1.0;vec3 direction=vec3(uv,1.0);if(face==0.0){direction=direction.zyx;}else if(face==1.0){direction=direction.xzy;direction.xz*=-1.0;}else if(face==2.0){direction.x*=-1.0;}else if(face==3.0){direction=direction.zyx;direction.xz*=-1.0;}else if(face==4.0){direction=direction.xzy;direction.xy*=-1.0;}else if(face==5.0){direction.z*=-1.0;}return direction;}void main(){vOutputDirection=getDirection(uv,faceIndex);gl_Position=vec4(position,1.0);}";
}
function JP(e) {
  let t = new WeakMap(),
    s = null;
  function i(e) {
    const s = e.target;
    s.removeEventListener("dispose", i);
    const n = t.get(s);
    void 0 !== n && (t.delete(s), n.dispose());
  }
  return {
    get: function (n) {
      if (n && n.isTexture) {
        const a = n.mapping,
          r = a === Ow || a === Rw,
          o = a === Dw || a === Lw;
        if (r || o) {
          if (n.isRenderTargetTexture && !0 === n.needsPMREMUpdate) {
            n.needsPMREMUpdate = !1;
            let i = t.get(n);
            return null === s && (s = new jP(e)), i = r ? s.fromEquirectangular(n, i) : s.fromCubemap(n, i), t.set(n, i), i.texture;
          }
          if (t.has(n)) return t.get(n).texture;
          {
            const a = n.image;
            if (r && a && a.height > 0 || o && a && function (e) {
              let t = 0;
              const s = 6;
              for (let i = 0; i < s; i++) void 0 !== e[i] && t++;
              return t === s;
            }(a)) {
              null === s && (s = new jP(e));
              const a = r ? s.fromEquirectangular(n) : s.fromCubemap(n);
              return t.set(n, a), n.addEventListener("dispose", i), a.texture;
            }
            return null;
          }
        }
      }
      return n;
    },
    dispose: function () {
      t = new WeakMap(), null !== s && (s.dispose(), s = null);
    }
  };
}
function QP(e) {
  const t = {};
  function s(s) {
    if (void 0 !== t[s]) return t[s];
    let i;
    switch (s) {
      case "WEBGL_depth_texture":
        i = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        i = e.getExtension(s);
    }
    return t[s] = i, i;
  }
  return {
    has: function (e) {
      return null !== s(e);
    },
    init: function (e) {
      e.isWebGL2 ? s("EXT_color_buffer_float") : (s("WEBGL_depth_texture"), s("OES_texture_float"), s("OES_texture_half_float"), s("OES_texture_half_float_linear"), s("OES_standard_derivatives"), s("OES_element_index_uint"), s("OES_vertex_array_object"), s("ANGLE_instanced_arrays")), s("OES_texture_float_linear"), s("EXT_color_buffer_half_float"), s("WEBGL_multisampled_render_to_texture");
    },
    get: function (e) {
      const t = s(e);
      return t;
    }
  };
}
function KP(e, t, s, i) {
  const n = {},
    a = new WeakMap();
  function r(e) {
    const o = e.target;
    null !== o.index && t.remove(o.index);
    for (const s in o.attributes) t.remove(o.attributes[s]);
    o.removeEventListener("dispose", r), delete n[o.id];
    const l = a.get(o);
    l && (t.remove(l), a.delete(o)), i.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, s.memory.geometries--;
  }
  function o(e) {
    const s = [],
      i = e.index,
      n = e.attributes.position;
    let r = 0;
    if (null !== i) {
      const e = i.array;
      r = i.version;
      for (let t = 0, i = e.length; t < i; t += 3) {
        const i = e[t + 0],
          n = e[t + 1],
          a = e[t + 2];
        s.push(i, n, n, a, a, i);
      }
    } else {
      const e = n.array;
      r = n.version;
      for (let t = 0, i = e.length / 3 - 1; t < i; t += 3) {
        const e = t + 0,
          i = t + 1,
          n = t + 2;
        s.push(e, i, i, n, n, e);
      }
    }
    const o = new (RA(s) ? kC : IC)(s, 1);
    o.version = r;
    const l = a.get(e);
    l && t.remove(l), a.set(e, o);
  }
  return {
    get: function (e, t) {
      return !0 === n[t.id] || (t.addEventListener("dispose", r), n[t.id] = !0, s.memory.geometries++), t;
    },
    update: function (e) {
      const s = e.attributes;
      for (const n in s) t.update(s[n], 34962);
      const i = e.morphAttributes;
      for (const n in i) {
        const e = i[n];
        for (let s = 0, i = e.length; s < i; s++) t.update(e[s], 34962);
      }
    },
    getWireframeAttribute: function (e) {
      const t = a.get(e);
      if (t) {
        const s = e.index;
        null !== s && t.version < s.version && o(e);
      } else o(e);
      return a.get(e);
    }
  };
}
function eT(e, t, s, i) {
  const n = i.isWebGL2;
  let a, r, o;
  this.setMode = function (e) {
    a = e;
  }, this.setIndex = function (e) {
    r = e.type, o = e.bytesPerElement;
  }, this.render = function (t, i) {
    e.drawElements(a, i, r, t * o), s.update(i, a, 1);
  }, this.renderInstances = function (i, l, c) {
    if (0 === c) return;
    let h, u;
    if (n) h = e, u = "drawElementsInstanced";else if (h = t.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", null === h) return;
    h[u](a, l, r, i * o, c), s.update(l, a, c);
  };
}
function tT(e) {
  const t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  return {
    memory: {
      geometries: 0,
      textures: 0
    },
    render: t,
    programs: null,
    autoReset: !0,
    reset: function () {
      t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
    },
    update: function (e, s, i) {
      switch (t.calls++, s) {
        case 4:
          t.triangles += i * (e / 3);
          break;
        case 1:
          t.lines += i * (e / 2);
          break;
        case 3:
          t.lines += i * (e - 1);
          break;
        case 2:
          t.lines += i * e;
          break;
        case 0:
          t.points += i * e;
      }
    }
  };
}
function sT(e, t) {
  return e[0] - t[0];
}
function iT(e, t) {
  return Math.abs(t[1]) - Math.abs(e[1]);
}
function nT(e, t, s) {
  const i = {},
    n = new Float32Array(8),
    a = new WeakMap(),
    r = new nM(),
    o = [];
  for (let l = 0; l < 8; l++) o[l] = [l, 0];
  return {
    update: function (l, c, h) {
      const u = l.morphTargetInfluences;
      if (!0 === t.isWebGL2) {
        const i = c.morphAttributes.position || c.morphAttributes.normal || c.morphAttributes.color,
          n = void 0 !== i ? i.length : 0;
        let o = a.get(c);
        if (void 0 === o || o.count !== n) {
          let e = function () {
            v.dispose(), a.delete(c), c.removeEventListener("dispose", e);
          };
          void 0 !== o && o.texture.dispose();
          const s = void 0 !== c.morphAttributes.position,
            i = void 0 !== c.morphAttributes.normal,
            l = void 0 !== c.morphAttributes.color,
            h = c.morphAttributes.position || [],
            u = c.morphAttributes.normal || [],
            d = c.morphAttributes.color || [];
          let p = 0;
          !0 === s && (p = 1), !0 === i && (p = 2), !0 === l && (p = 3);
          let m = c.attributes.position.count * p,
            f = 1;
          m > t.maxTextureSize && (f = Math.ceil(m / t.maxTextureSize), m = t.maxTextureSize);
          const g = new Float32Array(m * f * 4 * n),
            v = new rM(g, m, f, n);
          v.type = Kw, v.needsUpdate = !0;
          const b = 4 * p;
          for (let t = 0; t < n; t++) {
            const e = h[t],
              n = u[t],
              a = d[t],
              o = m * f * 4 * t;
            for (let t = 0; t < e.count; t++) {
              const c = t * b;
              !0 === s && (r.fromBufferAttribute(e, t), g[o + c + 0] = r.x, g[o + c + 1] = r.y, g[o + c + 2] = r.z, g[o + c + 3] = 0), !0 === i && (r.fromBufferAttribute(n, t), g[o + c + 4] = r.x, g[o + c + 5] = r.y, g[o + c + 6] = r.z, g[o + c + 7] = 0), !0 === l && (r.fromBufferAttribute(a, t), g[o + c + 8] = r.x, g[o + c + 9] = r.y, g[o + c + 10] = r.z, g[o + c + 11] = 4 === a.itemSize ? r.w : 1);
            }
          }
          o = {
            count: n,
            texture: v,
            size: new DA(m, f)
          }, a.set(c, o), c.addEventListener("dispose", e);
        }
        let l = 0;
        for (let e = 0; e < u.length; e++) l += u[e];
        const d = c.morphTargetsRelative ? 1 : 1 - l;
        h.getUniforms().setValue(e, "morphTargetBaseInfluence", d), h.getUniforms().setValue(e, "morphTargetInfluences", u), h.getUniforms().setValue(e, "morphTargetsTexture", o.texture, s), h.getUniforms().setValue(e, "morphTargetsTextureSize", o.size);
      } else {
        const t = void 0 === u ? 0 : u.length;
        let s = i[c.id];
        if (void 0 === s || s.length !== t) {
          s = [];
          for (let e = 0; e < t; e++) s[e] = [e, 0];
          i[c.id] = s;
        }
        for (let e = 0; e < t; e++) {
          const t = s[e];
          t[0] = e, t[1] = u[e];
        }
        s.sort(iT);
        for (let e = 0; e < 8; e++) e < t && s[e][1] ? (o[e][0] = s[e][0], o[e][1] = s[e][1]) : (o[e][0] = Number.MAX_SAFE_INTEGER, o[e][1] = 0);
        o.sort(sT);
        const a = c.morphAttributes.position,
          r = c.morphAttributes.normal;
        let l = 0;
        for (let e = 0; e < 8; e++) {
          const t = o[e],
            s = t[0],
            i = t[1];
          s !== Number.MAX_SAFE_INTEGER && i ? (a && c.getAttribute("morphTarget" + e) !== a[s] && c.setAttribute("morphTarget" + e, a[s]), r && c.getAttribute("morphNormal" + e) !== r[s] && c.setAttribute("morphNormal" + e, r[s]), n[e] = i, l += i) : (a && !0 === c.hasAttribute("morphTarget" + e) && c.deleteAttribute("morphTarget" + e), r && !0 === c.hasAttribute("morphNormal" + e) && c.deleteAttribute("morphNormal" + e), n[e] = 0);
        }
        const d = c.morphTargetsRelative ? 1 : 1 - l;
        h.getUniforms().setValue(e, "morphTargetBaseInfluence", d), h.getUniforms().setValue(e, "morphTargetInfluences", n);
      }
    }
  };
}
function aT(e, t, s, i) {
  let n = new WeakMap();
  function a(e) {
    const t = e.target;
    t.removeEventListener("dispose", a), s.remove(t.instanceMatrix), null !== t.instanceColor && s.remove(t.instanceColor);
  }
  return {
    update: function (e) {
      const r = i.render.frame,
        o = e.geometry,
        l = t.get(e, o);
      return n.get(l) !== r && (t.update(l), n.set(l, r)), e.isInstancedMesh && (!1 === e.hasEventListener("dispose", a) && e.addEventListener("dispose", a), s.update(e.instanceMatrix, 34962), null !== e.instanceColor && s.update(e.instanceColor, 34962)), l;
    },
    dispose: function () {
      n = new WeakMap();
    }
  };
}
const rT = new iM(),
  oT = new rM(),
  lT = new oM(),
  cT = new mP(),
  hT = [],
  uT = [],
  dT = new Float32Array(16),
  pT = new Float32Array(9),
  mT = new Float32Array(4);
function fT(e, t, s) {
  const i = e[0];
  if (i <= 0 || i > 0) return e;
  const n = t * s;
  let a = hT[n];
  if (void 0 === a && (a = new Float32Array(n), hT[n] = a), 0 !== t) {
    i.toArray(a, 0);
    for (let i = 1, n = 0; i !== t; ++i) n += s, e[i].toArray(a, n);
  }
  return a;
}
function gT(e, t) {
  if (e.length !== t.length) return !1;
  for (let s = 0, i = e.length; s < i; s++) if (e[s] !== t[s]) return !1;
  return !0;
}
function vT(e, t) {
  for (let s = 0, i = t.length; s < i; s++) e[s] = t[s];
}
function bT(e, t) {
  let s = uT[t];
  void 0 === s && (s = new Int32Array(t), uT[t] = s);
  for (let i = 0; i !== t; ++i) s[i] = e.allocateTextureUnit();
  return s;
}
function yT(e, t) {
  const s = this.cache;
  s[0] !== t && (e.uniform1f(this.addr, t), s[0] = t);
}
function _T(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), s[0] = t.x, s[1] = t.y);else {
    if (gT(s, t)) return;
    e.uniform2fv(this.addr, t), vT(s, t);
  }
}
function xT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), s[0] = t.x, s[1] = t.y, s[2] = t.z);else if (void 0 !== t.r) s[0] === t.r && s[1] === t.g && s[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), s[0] = t.r, s[1] = t.g, s[2] = t.b);else {
    if (gT(s, t)) return;
    e.uniform3fv(this.addr, t), vT(s, t);
  }
}
function wT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z && s[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), s[0] = t.x, s[1] = t.y, s[2] = t.z, s[3] = t.w);else {
    if (gT(s, t)) return;
    e.uniform4fv(this.addr, t), vT(s, t);
  }
}
function ST(e, t) {
  const s = this.cache,
    i = t.elements;
  if (void 0 === i) {
    if (gT(s, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), vT(s, t);
  } else {
    if (gT(s, i)) return;
    mT.set(i), e.uniformMatrix2fv(this.addr, !1, mT), vT(s, i);
  }
}
function AT(e, t) {
  const s = this.cache,
    i = t.elements;
  if (void 0 === i) {
    if (gT(s, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), vT(s, t);
  } else {
    if (gT(s, i)) return;
    pT.set(i), e.uniformMatrix3fv(this.addr, !1, pT), vT(s, i);
  }
}
function MT(e, t) {
  const s = this.cache,
    i = t.elements;
  if (void 0 === i) {
    if (gT(s, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), vT(s, t);
  } else {
    if (gT(s, i)) return;
    dT.set(i), e.uniformMatrix4fv(this.addr, !1, dT), vT(s, i);
  }
}
function CT(e, t) {
  const s = this.cache;
  s[0] !== t && (e.uniform1i(this.addr, t), s[0] = t);
}
function PT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y || (e.uniform2i(this.addr, t.x, t.y), s[0] = t.x, s[1] = t.y);else {
    if (gT(s, t)) return;
    e.uniform2iv(this.addr, t), vT(s, t);
  }
}
function TT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z || (e.uniform3i(this.addr, t.x, t.y, t.z), s[0] = t.x, s[1] = t.y, s[2] = t.z);else {
    if (gT(s, t)) return;
    e.uniform3iv(this.addr, t), vT(s, t);
  }
}
function ET(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z && s[3] === t.w || (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), s[0] = t.x, s[1] = t.y, s[2] = t.z, s[3] = t.w);else {
    if (gT(s, t)) return;
    e.uniform4iv(this.addr, t), vT(s, t);
  }
}
function BT(e, t) {
  const s = this.cache;
  s[0] !== t && (e.uniform1ui(this.addr, t), s[0] = t);
}
function IT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y || (e.uniform2ui(this.addr, t.x, t.y), s[0] = t.x, s[1] = t.y);else {
    if (gT(s, t)) return;
    e.uniform2uiv(this.addr, t), vT(s, t);
  }
}
function kT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z || (e.uniform3ui(this.addr, t.x, t.y, t.z), s[0] = t.x, s[1] = t.y, s[2] = t.z);else {
    if (gT(s, t)) return;
    e.uniform3uiv(this.addr, t), vT(s, t);
  }
}
function DT(e, t) {
  const s = this.cache;
  if (void 0 !== t.x) s[0] === t.x && s[1] === t.y && s[2] === t.z && s[3] === t.w || (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), s[0] = t.x, s[1] = t.y, s[2] = t.z, s[3] = t.w);else {
    if (gT(s, t)) return;
    e.uniform4uiv(this.addr, t), vT(s, t);
  }
}
function LT(e, t, s) {
  const i = this.cache,
    n = s.allocateTextureUnit();
  i[0] !== n && (e.uniform1i(this.addr, n), i[0] = n), s.setTexture2D(t || rT, n);
}
function OT(e, t, s) {
  const i = this.cache,
    n = s.allocateTextureUnit();
  i[0] !== n && (e.uniform1i(this.addr, n), i[0] = n), s.setTexture3D(t || lT, n);
}
function RT(e, t, s) {
  const i = this.cache,
    n = s.allocateTextureUnit();
  i[0] !== n && (e.uniform1i(this.addr, n), i[0] = n), s.setTextureCube(t || cT, n);
}
function zT(e, t, s) {
  const i = this.cache,
    n = s.allocateTextureUnit();
  i[0] !== n && (e.uniform1i(this.addr, n), i[0] = n), s.setTexture2DArray(t || oT, n);
}
function NT(e, t) {
  e.uniform1fv(this.addr, t);
}
function FT(e, t) {
  const s = fT(t, this.size, 2);
  e.uniform2fv(this.addr, s);
}
function UT(e, t) {
  const s = fT(t, this.size, 3);
  e.uniform3fv(this.addr, s);
}
function HT(e, t) {
  const s = fT(t, this.size, 4);
  e.uniform4fv(this.addr, s);
}
function GT(e, t) {
  const s = fT(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, s);
}
function VT(e, t) {
  const s = fT(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, s);
}
function WT(e, t) {
  const s = fT(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, s);
}
function jT(e, t) {
  e.uniform1iv(this.addr, t);
}
function qT(e, t) {
  e.uniform2iv(this.addr, t);
}
function ZT(e, t) {
  e.uniform3iv(this.addr, t);
}
function $T(e, t) {
  e.uniform4iv(this.addr, t);
}
function XT(e, t) {
  e.uniform1uiv(this.addr, t);
}
function YT(e, t) {
  e.uniform2uiv(this.addr, t);
}
function JT(e, t) {
  e.uniform3uiv(this.addr, t);
}
function QT(e, t) {
  e.uniform4uiv(this.addr, t);
}
function KT(e, t, s) {
  const i = this.cache,
    n = t.length,
    a = bT(s, n);
  gT(i, a) || (e.uniform1iv(this.addr, a), vT(i, a));
  for (let r = 0; r !== n; ++r) s.setTexture2D(t[r] || rT, a[r]);
}
function eE(e, t, s) {
  const i = this.cache,
    n = t.length,
    a = bT(s, n);
  gT(i, a) || (e.uniform1iv(this.addr, a), vT(i, a));
  for (let r = 0; r !== n; ++r) s.setTexture3D(t[r] || lT, a[r]);
}
function tE(e, t, s) {
  const i = this.cache,
    n = t.length,
    a = bT(s, n);
  gT(i, a) || (e.uniform1iv(this.addr, a), vT(i, a));
  for (let r = 0; r !== n; ++r) s.setTextureCube(t[r] || cT, a[r]);
}
function sE(e, t, s) {
  const i = this.cache,
    n = t.length,
    a = bT(s, n);
  gT(i, a) || (e.uniform1iv(this.addr, a), vT(i, a));
  for (let r = 0; r !== n; ++r) s.setTexture2DArray(t[r] || oT, a[r]);
}
class iE {
  constructor(e, t, s) {
    this.id = e, this.addr = s, this.cache = [], this.setValue = function (e) {
      switch (e) {
        case 5126:
          return yT;
        case 35664:
          return _T;
        case 35665:
          return xT;
        case 35666:
          return wT;
        case 35674:
          return ST;
        case 35675:
          return AT;
        case 35676:
          return MT;
        case 5124:
        case 35670:
          return CT;
        case 35667:
        case 35671:
          return PT;
        case 35668:
        case 35672:
          return TT;
        case 35669:
        case 35673:
          return ET;
        case 5125:
          return BT;
        case 36294:
          return IT;
        case 36295:
          return kT;
        case 36296:
          return DT;
        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return LT;
        case 35679:
        case 36299:
        case 36307:
          return OT;
        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return RT;
        case 36289:
        case 36303:
        case 36311:
        case 36292:
          return zT;
      }
    }(t.type);
  }
}
class nE {
  constructor(e, t, s) {
    this.id = e, this.addr = s, this.cache = [], this.size = t.size, this.setValue = function (e) {
      switch (e) {
        case 5126:
          return NT;
        case 35664:
          return FT;
        case 35665:
          return UT;
        case 35666:
          return HT;
        case 35674:
          return GT;
        case 35675:
          return VT;
        case 35676:
          return WT;
        case 5124:
        case 35670:
          return jT;
        case 35667:
        case 35671:
          return qT;
        case 35668:
        case 35672:
          return ZT;
        case 35669:
        case 35673:
          return $T;
        case 5125:
          return XT;
        case 36294:
          return YT;
        case 36295:
          return JT;
        case 36296:
          return QT;
        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return KT;
        case 35679:
        case 36299:
        case 36307:
          return eE;
        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return tE;
        case 36289:
        case 36303:
        case 36311:
        case 36292:
          return sE;
      }
    }(t.type);
  }
}
class aE {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, s) {
    const i = this.seq;
    for (let n = 0, a = i.length; n !== a; ++n) {
      const a = i[n];
      a.setValue(e, t[a.id], s);
    }
  }
}
const rE = /(\w+)(\])?(\[|\.)?/g;
function oE(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function lE(e, t, s) {
  const i = e.name,
    n = i.length;
  for (rE.lastIndex = 0;;) {
    const a = rE.exec(i),
      r = rE.lastIndex;
    let o = a[1];
    const l = "]" === a[2],
      c = a[3];
    if (l && (o |= 0), void 0 === c || "[" === c && r + 2 === n) {
      oE(s, void 0 === c ? new iE(o, e, t) : new nE(o, e, t));
      break;
    }
    {
      let e = s.map[o];
      void 0 === e && (e = new aE(o), oE(s, e)), s = e;
    }
  }
}
class cE {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const s = e.getProgramParameter(t, 35718);
    for (let i = 0; i < s; ++i) {
      const s = e.getActiveUniform(t, i);
      lE(s, e.getUniformLocation(t, s.name), this);
    }
  }
  setValue(e, t, s, i) {
    const n = this.map[t];
    void 0 !== n && n.setValue(e, s, i);
  }
  setOptional(e, t, s) {
    const i = t[s];
    void 0 !== i && this.setValue(e, s, i);
  }
  static upload(e, t, s, i) {
    for (let n = 0, a = t.length; n !== a; ++n) {
      const a = t[n],
        r = s[a.id];
      !1 !== r.needsUpdate && a.setValue(e, r.value, i);
    }
  }
  static seqWithValue(e, t) {
    const s = [];
    for (let i = 0, n = e.length; i !== n; ++i) {
      const n = e[i];
      n.id in t && s.push(n);
    }
    return s;
  }
}
function hE(e, t, s) {
  const i = e.createShader(t);
  return e.shaderSource(i, s), e.compileShader(i), i;
}
let uE = 0;
function dE(e, t, s) {
  const i = e.getShaderParameter(t, 35713),
    n = e.getShaderInfoLog(t).trim();
  if (i && "" === n) return "";
  const a = /ERROR: 0:(\d+)/.exec(n);
  if (a) {
    const i = parseInt(a[1]);
    return s.toUpperCase() + "\n\n" + n + "\n\n" + function (e, t) {
      const s = e.split("\n"),
        i = [],
        n = Math.max(t - 6, 0),
        a = Math.min(t + 6, s.length);
      for (let r = n; r < a; r++) {
        const e = r + 1;
        i.push(`${e === t ? ">" : " "} ${e}: ${s[r]}`);
      }
      return i.join("\n");
    }(e.getShaderSource(t), i);
  }
  return n;
}
function pE(e, t) {
  const s = function (e) {
    switch (e) {
      case nA:
        return ["Linear", "( value )"];
      case aA:
        return ["sRGB", "( value )"];
      default:
        return ["Linear", "( value )"];
    }
  }(t);
  return "vec4 " + e + "( vec4 value ) { return LinearTo" + s[0] + s[1] + "; }";
}
function mE(e, t) {
  let s;
  switch (t) {
    case Tw:
      s = "Linear";
      break;
    case Ew:
      s = "Reinhard";
      break;
    case Bw:
      s = "OptimizedCineon";
      break;
    case Iw:
      s = "ACESFilmic";
      break;
    case kw:
      s = "Custom";
      break;
    default:
      s = "Linear";
  }
  return "vec3 " + e + "( vec3 color ) { return " + s + "ToneMapping( color ); }";
}
function fE(e) {
  return "" !== e;
}
function gE(e, t) {
  const s = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, s).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function vE(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const bE = /^[ \t]*#include +<([\w\d./]+)>/gm;
function yE(e) {
  return e.replace(bE, _E);
}
function _E(e, t) {
  const s = CP[t];
  if (void 0 === s) throw new Error("Can not resolve #include <" + t + ">");
  return yE(s);
}
const xE = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function wE(e) {
  return e.replace(xE, SE);
}
function SE(e, t, s, i) {
  let n = "";
  for (let a = parseInt(t); a < parseInt(s); a++) n += i.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  return n;
}
function AE(e) {
  let t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
  return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t;
}
function ME(e, t, s, i) {
  const n = e.getContext(),
    a = s.defines;
  let r = s.vertexShader,
    o = s.fragmentShader;
  const l = function (e) {
      let t = "SHADOWMAP_TYPE_BASIC";
      return e.shadowMapType === Gx ? t = "SHADOWMAP_TYPE_PCF" : e.shadowMapType === Vx ? t = "SHADOWMAP_TYPE_PCF_SOFT" : e.shadowMapType === Wx && (t = "SHADOWMAP_TYPE_VSM"), t;
    }(s),
    c = function (e) {
      let t = "ENVMAP_TYPE_CUBE";
      if (e.envMap) switch (e.envMapMode) {
        case Dw:
        case Lw:
          t = "ENVMAP_TYPE_CUBE";
          break;
        case zw:
          t = "ENVMAP_TYPE_CUBE_UV";
      }
      return t;
    }(s),
    h = function (e) {
      let t = "ENVMAP_MODE_REFLECTION";
      e.envMap && e.envMapMode === Lw && (t = "ENVMAP_MODE_REFRACTION");
      return t;
    }(s),
    u = function (e) {
      let t = "ENVMAP_BLENDING_NONE";
      if (e.envMap) switch (e.combine) {
        case Aw:
          t = "ENVMAP_BLENDING_MULTIPLY";
          break;
        case Mw:
          t = "ENVMAP_BLENDING_MIX";
          break;
        case Cw:
          t = "ENVMAP_BLENDING_ADD";
      }
      return t;
    }(s),
    d = function (e) {
      const t = e.envMapCubeUVHeight;
      if (null === t) return null;
      const s = Math.log2(t) - 2,
        i = 1 / t;
      return {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, s), 112)),
        texelHeight: i,
        maxMip: s
      };
    }(s),
    p = s.isWebGL2 ? "" : function (e) {
      return [e.extensionDerivatives || e.envMapCubeUVHeight || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap || e.transmission) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(fE).join("\n");
    }(s),
    m = function (e) {
      const t = [];
      for (const s in e) {
        const i = e[s];
        !1 !== i && t.push("#define " + s + " " + i);
      }
      return t.join("\n");
    }(a),
    f = n.createProgram();
  let g,
    v,
    b = s.glslVersion ? "#version " + s.glslVersion + "\n" : "";
  s.isRawShaderMaterial ? (g = [m].filter(fE).join("\n"), g.length > 0 && (g += "\n"), v = [p, m].filter(fE).join("\n"), v.length > 0 && (v += "\n")) : (g = [AE(s), "#define SHADER_NAME " + s.shaderName, m, s.instancing ? "#define USE_INSTANCING" : "", s.instancingColor ? "#define USE_INSTANCING_COLOR" : "", s.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", s.useFog && s.fog ? "#define USE_FOG" : "", s.useFog && s.fogExp2 ? "#define FOG_EXP2" : "", s.map ? "#define USE_MAP" : "", s.envMap ? "#define USE_ENVMAP" : "", s.envMap ? "#define " + h : "", s.lightMap ? "#define USE_LIGHTMAP" : "", s.aoMap ? "#define USE_AOMAP" : "", s.emissiveMap ? "#define USE_EMISSIVEMAP" : "", s.bumpMap ? "#define USE_BUMPMAP" : "", s.normalMap ? "#define USE_NORMALMAP" : "", s.normalMap && s.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", s.normalMap && s.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", s.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", s.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", s.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", s.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", s.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", s.displacementMap && s.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", s.specularMap ? "#define USE_SPECULARMAP" : "", s.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", s.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", s.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", s.metalnessMap ? "#define USE_METALNESSMAP" : "", s.alphaMap ? "#define USE_ALPHAMAP" : "", s.transmission ? "#define USE_TRANSMISSION" : "", s.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", s.thicknessMap ? "#define USE_THICKNESSMAP" : "", s.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", s.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", s.vertexTangents ? "#define USE_TANGENT" : "", s.vertexColors ? "#define USE_COLOR" : "", s.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", s.vertexUvs ? "#define USE_UV" : "", s.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", s.flatShading ? "#define FLAT_SHADED" : "", s.skinning ? "#define USE_SKINNING" : "", s.morphTargets ? "#define USE_MORPHTARGETS" : "", s.morphNormals && !1 === s.flatShading ? "#define USE_MORPHNORMALS" : "", s.morphColors && s.isWebGL2 ? "#define USE_MORPHCOLORS" : "", s.morphTargetsCount > 0 && s.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", s.morphTargetsCount > 0 && s.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + s.morphTextureStride : "", s.morphTargetsCount > 0 && s.isWebGL2 ? "#define MORPHTARGETS_COUNT " + s.morphTargetsCount : "", s.doubleSided ? "#define DOUBLE_SIDED" : "", s.flipSided ? "#define FLIP_SIDED" : "", s.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", s.shadowMapEnabled ? "#define " + l : "", s.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", s.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", s.logarithmicDepthBuffer && s.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(fE).join("\n"), v = [p, AE(s), "#define SHADER_NAME " + s.shaderName, m, s.useFog && s.fog ? "#define USE_FOG" : "", s.useFog && s.fogExp2 ? "#define FOG_EXP2" : "", s.map ? "#define USE_MAP" : "", s.matcap ? "#define USE_MATCAP" : "", s.envMap ? "#define USE_ENVMAP" : "", s.envMap ? "#define " + c : "", s.envMap ? "#define " + h : "", s.envMap ? "#define " + u : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", s.lightMap ? "#define USE_LIGHTMAP" : "", s.aoMap ? "#define USE_AOMAP" : "", s.emissiveMap ? "#define USE_EMISSIVEMAP" : "", s.bumpMap ? "#define USE_BUMPMAP" : "", s.normalMap ? "#define USE_NORMALMAP" : "", s.normalMap && s.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", s.normalMap && s.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", s.clearcoat ? "#define USE_CLEARCOAT" : "", s.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", s.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", s.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", s.iridescence ? "#define USE_IRIDESCENCE" : "", s.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", s.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", s.specularMap ? "#define USE_SPECULARMAP" : "", s.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", s.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", s.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", s.metalnessMap ? "#define USE_METALNESSMAP" : "", s.alphaMap ? "#define USE_ALPHAMAP" : "", s.alphaTest ? "#define USE_ALPHATEST" : "", s.sheen ? "#define USE_SHEEN" : "", s.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", s.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", s.transmission ? "#define USE_TRANSMISSION" : "", s.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", s.thicknessMap ? "#define USE_THICKNESSMAP" : "", s.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", s.vertexTangents ? "#define USE_TANGENT" : "", s.vertexColors || s.instancingColor ? "#define USE_COLOR" : "", s.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", s.vertexUvs ? "#define USE_UV" : "", s.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", s.gradientMap ? "#define USE_GRADIENTMAP" : "", s.flatShading ? "#define FLAT_SHADED" : "", s.doubleSided ? "#define DOUBLE_SIDED" : "", s.flipSided ? "#define FLIP_SIDED" : "", s.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", s.shadowMapEnabled ? "#define " + l : "", s.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", s.useLegacyLights ? "#define LEGACY_LIGHTS" : "", s.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", s.logarithmicDepthBuffer && s.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", s.toneMapping !== Pw ? "#define TONE_MAPPING" : "", s.toneMapping !== Pw ? CP.tonemapping_pars_fragment : "", s.toneMapping !== Pw ? mE("toneMapping", s.toneMapping) : "", s.dithering ? "#define DITHERING" : "", s.opaque ? "#define OPAQUE" : "", CP.encodings_pars_fragment, pE("linearToOutputTexel", s.outputEncoding), s.useDepthPacking ? "#define DEPTH_PACKING " + s.depthPacking : "", "\n"].filter(fE).join("\n")), r = yE(r), r = gE(r, s), r = vE(r, s), o = yE(o), o = gE(o, s), o = vE(o, s), r = wE(r), o = wE(o), s.isWebGL2 && !0 !== s.isRawShaderMaterial && (b = "#version 300 es\n", g = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + g, v = ["#define varying in", s.glslVersion === gA ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", s.glslVersion === gA ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + v);
  const y = b + v + o,
    _ = hE(n, 35633, b + g + r),
    x = hE(n, 35632, y);
  if (n.attachShader(f, _), n.attachShader(f, x), void 0 !== s.index0AttributeName ? n.bindAttribLocation(f, 0, s.index0AttributeName) : !0 === s.morphTargets && n.bindAttribLocation(f, 0, "position"), n.linkProgram(f), e.debug.checkShaderErrors) {
    const e = n.getProgramInfoLog(f).trim(),
      t = n.getShaderInfoLog(_).trim(),
      s = n.getShaderInfoLog(x).trim();
    let i = !0,
      a = !0;
    if (!1 === n.getProgramParameter(f, 35714)) {
      i = !1;
      dE(n, _, "vertex"), dE(n, x, "fragment");
    } else "" !== e || "" !== t && "" !== s || (a = !1);
    a && (this.diagnostics = {
      runnable: i,
      programLog: e,
      vertexShader: {
        log: t,
        prefix: g
      },
      fragmentShader: {
        log: s,
        prefix: v
      }
    });
  }
  let w, S;
  return n.deleteShader(_), n.deleteShader(x), this.getUniforms = function () {
    return void 0 === w && (w = new cE(n, f)), w;
  }, this.getAttributes = function () {
    return void 0 === S && (S = function (e, t) {
      const s = {},
        i = e.getProgramParameter(t, 35721);
      for (let n = 0; n < i; n++) {
        const i = e.getActiveAttrib(t, n),
          a = i.name;
        let r = 1;
        35674 === i.type && (r = 2), 35675 === i.type && (r = 3), 35676 === i.type && (r = 4), s[a] = {
          type: i.type,
          location: e.getAttribLocation(t, a),
          locationSize: r
        };
      }
      return s;
    }(n, f)), S;
  }, this.destroy = function () {
    i.releaseStatesOfProgram(this), n.deleteProgram(f), this.program = void 0;
  }, this.name = s.shaderName, this.id = uE++, this.cacheKey = t, this.usedTimes = 1, this.program = f, this.vertexShader = _, this.fragmentShader = x, this;
}
let CE = 0;
class PE {
  constructor() {
    this.shaderCache = new Map(), this.materialCache = new Map();
  }
  update(e) {
    const t = e.vertexShader,
      s = e.fragmentShader,
      i = this._getShaderStage(t),
      n = this._getShaderStage(s),
      a = this._getShaderCacheForMaterial(e);
    return !1 === a.has(i) && (a.add(i), i.usedTimes++), !1 === a.has(n) && (a.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const s of t) s.usedTimes--, 0 === s.usedTimes && this.shaderCache.delete(s.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let s = t.get(e);
    return void 0 === s && (s = new Set(), t.set(e, s)), s;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let s = t.get(e);
    return void 0 === s && (s = new TE(e), t.set(e, s)), s;
  }
}
class TE {
  constructor(e) {
    this.id = CE++, this.code = e, this.usedTimes = 0;
  }
}
function EE(e, t, s, i, n, a, r) {
  const o = new qM(),
    l = new PE(),
    c = [],
    h = n.isWebGL2,
    u = n.logarithmicDepthBuffer,
    d = n.vertexTextures;
  let p = n.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  return {
    getParameters: function (a, o, c, f, g) {
      const v = f.fog,
        b = g.geometry,
        y = a.isMeshStandardMaterial ? f.environment : null,
        _ = (a.isMeshStandardMaterial ? s : t).get(a.envMap || y),
        x = _ && _.mapping === zw ? _.image.height : null,
        w = m[a.type];
      null !== a.precision && (p = n.getMaxPrecision(a.precision), a.precision);
      const S = b.morphAttributes.position || b.morphAttributes.normal || b.morphAttributes.color,
        A = void 0 !== S ? S.length : 0;
      let M,
        C,
        P,
        T,
        E = 0;
      if (void 0 !== b.morphAttributes.position && (E = 1), void 0 !== b.morphAttributes.normal && (E = 2), void 0 !== b.morphAttributes.color && (E = 3), w) {
        const e = TP[w];
        M = e.vertexShader, C = e.fragmentShader;
      } else M = a.vertexShader, C = a.fragmentShader, l.update(a), P = l.getVertexShaderID(a), T = l.getFragmentShaderID(a);
      const B = e.getRenderTarget(),
        I = a.alphaTest > 0,
        k = a.clearcoat > 0,
        D = a.iridescence > 0;
      return {
        isWebGL2: h,
        shaderID: w,
        shaderName: a.type,
        vertexShader: M,
        fragmentShader: C,
        defines: a.defines,
        customVertexShaderID: P,
        customFragmentShaderID: T,
        isRawShaderMaterial: !0 === a.isRawShaderMaterial,
        glslVersion: a.glslVersion,
        precision: p,
        instancing: !0 === g.isInstancedMesh,
        instancingColor: !0 === g.isInstancedMesh && null !== g.instanceColor,
        supportsVertexTextures: d,
        outputEncoding: null === B ? e.outputEncoding : !0 === B.isXRRenderTarget ? B.texture.encoding : nA,
        map: !!a.map,
        matcap: !!a.matcap,
        envMap: !!_,
        envMapMode: _ && _.mapping,
        envMapCubeUVHeight: x,
        lightMap: !!a.lightMap,
        aoMap: !!a.aoMap,
        emissiveMap: !!a.emissiveMap,
        bumpMap: !!a.bumpMap,
        normalMap: !!a.normalMap,
        objectSpaceNormalMap: a.normalMapType === lA,
        tangentSpaceNormalMap: a.normalMapType === oA,
        decodeVideoTexture: !!a.map && !0 === a.map.isVideoTexture && a.map.encoding === aA,
        clearcoat: k,
        clearcoatMap: k && !!a.clearcoatMap,
        clearcoatRoughnessMap: k && !!a.clearcoatRoughnessMap,
        clearcoatNormalMap: k && !!a.clearcoatNormalMap,
        iridescence: D,
        iridescenceMap: D && !!a.iridescenceMap,
        iridescenceThicknessMap: D && !!a.iridescenceThicknessMap,
        displacementMap: !!a.displacementMap,
        roughnessMap: !!a.roughnessMap,
        metalnessMap: !!a.metalnessMap,
        specularMap: !!a.specularMap,
        specularIntensityMap: !!a.specularIntensityMap,
        specularColorMap: !!a.specularColorMap,
        opaque: !1 === a.transparent && a.blending === Xx,
        alphaMap: !!a.alphaMap,
        alphaTest: I,
        gradientMap: !!a.gradientMap,
        sheen: a.sheen > 0,
        sheenColorMap: !!a.sheenColorMap,
        sheenRoughnessMap: !!a.sheenRoughnessMap,
        transmission: a.transmission > 0,
        transmissionMap: !!a.transmissionMap,
        thicknessMap: !!a.thicknessMap,
        combine: a.combine,
        vertexTangents: !!a.normalMap && !!b.attributes.tangent,
        vertexColors: a.vertexColors,
        vertexAlphas: !0 === a.vertexColors && !!b.attributes.color && 4 === b.attributes.color.itemSize,
        vertexUvs: !!(a.map || a.bumpMap || a.normalMap || a.specularMap || a.alphaMap || a.emissiveMap || a.roughnessMap || a.metalnessMap || a.clearcoatMap || a.clearcoatRoughnessMap || a.clearcoatNormalMap || a.iridescenceMap || a.iridescenceThicknessMap || a.displacementMap || a.transmissionMap || a.thicknessMap || a.specularIntensityMap || a.specularColorMap || a.sheenColorMap || a.sheenRoughnessMap),
        uvsVertexOnly: !(a.map || a.bumpMap || a.normalMap || a.specularMap || a.alphaMap || a.emissiveMap || a.roughnessMap || a.metalnessMap || a.clearcoatNormalMap || a.iridescenceMap || a.iridescenceThicknessMap || a.transmission > 0 || a.transmissionMap || a.thicknessMap || a.specularIntensityMap || a.specularColorMap || a.sheen > 0 || a.sheenColorMap || a.sheenRoughnessMap || !a.displacementMap),
        fog: !!v,
        useFog: !0 === a.fog,
        fogExp2: v && v.isFogExp2,
        flatShading: !!a.flatShading,
        sizeAttenuation: a.sizeAttenuation,
        logarithmicDepthBuffer: u,
        skinning: !0 === g.isSkinnedMesh,
        morphTargets: void 0 !== b.morphAttributes.position,
        morphNormals: void 0 !== b.morphAttributes.normal,
        morphColors: void 0 !== b.morphAttributes.color,
        morphTargetsCount: A,
        morphTextureStride: E,
        numDirLights: o.directional.length,
        numPointLights: o.point.length,
        numSpotLights: o.spot.length,
        numSpotLightMaps: o.spotLightMap.length,
        numRectAreaLights: o.rectArea.length,
        numHemiLights: o.hemi.length,
        numDirLightShadows: o.directionalShadowMap.length,
        numPointLightShadows: o.pointShadowMap.length,
        numSpotLightShadows: o.spotShadowMap.length,
        numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
        numClippingPlanes: r.numPlanes,
        numClipIntersection: r.numIntersection,
        dithering: a.dithering,
        shadowMapEnabled: e.shadowMap.enabled && c.length > 0,
        shadowMapType: e.shadowMap.type,
        toneMapping: a.toneMapped ? e.toneMapping : Pw,
        useLegacyLights: e.useLegacyLights,
        premultipliedAlpha: a.premultipliedAlpha,
        doubleSided: a.side === Zx,
        flipSided: a.side === qx,
        useDepthPacking: !!a.depthPacking,
        depthPacking: a.depthPacking || 0,
        index0AttributeName: a.index0AttributeName,
        extensionDerivatives: a.extensions && a.extensions.derivatives,
        extensionFragDepth: a.extensions && a.extensions.fragDepth,
        extensionDrawBuffers: a.extensions && a.extensions.drawBuffers,
        extensionShaderTextureLOD: a.extensions && a.extensions.shaderTextureLOD,
        rendererExtensionFragDepth: h || i.has("EXT_frag_depth"),
        rendererExtensionDrawBuffers: h || i.has("WEBGL_draw_buffers"),
        rendererExtensionShaderTextureLod: h || i.has("EXT_shader_texture_lod"),
        customProgramCacheKey: a.customProgramCacheKey()
      };
    },
    getProgramCacheKey: function (t) {
      const s = [];
      if (t.shaderID ? s.push(t.shaderID) : (s.push(t.customVertexShaderID), s.push(t.customFragmentShaderID)), void 0 !== t.defines) for (const e in t.defines) s.push(e), s.push(t.defines[e]);
      return !1 === t.isRawShaderMaterial && (!function (e, t) {
        e.push(t.precision), e.push(t.outputEncoding), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.combine), e.push(t.vertexUvs), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
      }(s, t), function (e, t) {
        o.disableAll(), t.isWebGL2 && o.enable(0);
        t.supportsVertexTextures && o.enable(1);
        t.instancing && o.enable(2);
        t.instancingColor && o.enable(3);
        t.map && o.enable(4);
        t.matcap && o.enable(5);
        t.envMap && o.enable(6);
        t.lightMap && o.enable(7);
        t.aoMap && o.enable(8);
        t.emissiveMap && o.enable(9);
        t.bumpMap && o.enable(10);
        t.normalMap && o.enable(11);
        t.objectSpaceNormalMap && o.enable(12);
        t.tangentSpaceNormalMap && o.enable(13);
        t.clearcoat && o.enable(14);
        t.clearcoatMap && o.enable(15);
        t.clearcoatRoughnessMap && o.enable(16);
        t.clearcoatNormalMap && o.enable(17);
        t.iridescence && o.enable(18);
        t.iridescenceMap && o.enable(19);
        t.iridescenceThicknessMap && o.enable(20);
        t.displacementMap && o.enable(21);
        t.specularMap && o.enable(22);
        t.roughnessMap && o.enable(23);
        t.metalnessMap && o.enable(24);
        t.gradientMap && o.enable(25);
        t.alphaMap && o.enable(26);
        t.alphaTest && o.enable(27);
        t.vertexColors && o.enable(28);
        t.vertexAlphas && o.enable(29);
        t.vertexUvs && o.enable(30);
        t.vertexTangents && o.enable(31);
        t.uvsVertexOnly && o.enable(32);
        e.push(o.mask), o.disableAll(), t.fog && o.enable(0);
        t.useFog && o.enable(1);
        t.flatShading && o.enable(2);
        t.logarithmicDepthBuffer && o.enable(3);
        t.skinning && o.enable(4);
        t.morphTargets && o.enable(5);
        t.morphNormals && o.enable(6);
        t.morphColors && o.enable(7);
        t.premultipliedAlpha && o.enable(8);
        t.shadowMapEnabled && o.enable(9);
        t.useLegacyLights && o.enable(10);
        t.doubleSided && o.enable(11);
        t.flipSided && o.enable(12);
        t.useDepthPacking && o.enable(13);
        t.dithering && o.enable(14);
        t.specularIntensityMap && o.enable(15);
        t.specularColorMap && o.enable(16);
        t.transmission && o.enable(17);
        t.transmissionMap && o.enable(18);
        t.thicknessMap && o.enable(19);
        t.sheen && o.enable(20);
        t.sheenColorMap && o.enable(21);
        t.sheenRoughnessMap && o.enable(22);
        t.decodeVideoTexture && o.enable(23);
        t.opaque && o.enable(24);
        e.push(o.mask);
      }(s, t), s.push(e.outputEncoding)), s.push(t.customProgramCacheKey), s.join();
    },
    getUniforms: function (e) {
      const t = m[e.type];
      let s;
      if (t) {
        const e = TP[t];
        s = lP.clone(e.uniforms);
      } else s = e.uniforms;
      return s;
    },
    acquireProgram: function (t, s) {
      let i;
      for (let e = 0, n = c.length; e < n; e++) {
        const t = c[e];
        if (t.cacheKey === s) {
          i = t, ++i.usedTimes;
          break;
        }
      }
      return void 0 === i && (i = new ME(e, s, t, a), c.push(i)), i;
    },
    releaseProgram: function (e) {
      if (0 == --e.usedTimes) {
        const t = c.indexOf(e);
        c[t] = c[c.length - 1], c.pop(), e.destroy();
      }
    },
    releaseShaderCache: function (e) {
      l.remove(e);
    },
    programs: c,
    dispose: function () {
      l.dispose();
    }
  };
}
function BE() {
  let e = new WeakMap();
  return {
    get: function (t) {
      let s = e.get(t);
      return void 0 === s && (s = {}, e.set(t, s)), s;
    },
    remove: function (t) {
      e.delete(t);
    },
    update: function (t, s, i) {
      e.get(t)[s] = i;
    },
    dispose: function () {
      e = new WeakMap();
    }
  };
}
function IE(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function kE(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function DE() {
  const e = [];
  let t = 0;
  const s = [],
    i = [],
    n = [];
  function a(s, i, n, a, r, o) {
    let l = e[t];
    return void 0 === l ? (l = {
      id: s.id,
      object: s,
      geometry: i,
      material: n,
      groupOrder: a,
      renderOrder: s.renderOrder,
      z: r,
      group: o
    }, e[t] = l) : (l.id = s.id, l.object = s, l.geometry = i, l.material = n, l.groupOrder = a, l.renderOrder = s.renderOrder, l.z = r, l.group = o), t++, l;
  }
  return {
    opaque: s,
    transmissive: i,
    transparent: n,
    init: function () {
      t = 0, s.length = 0, i.length = 0, n.length = 0;
    },
    push: function (e, t, r, o, l, c) {
      const h = a(e, t, r, o, l, c);
      r.transmission > 0 ? i.push(h) : !0 === r.transparent ? n.push(h) : s.push(h);
    },
    unshift: function (e, t, r, o, l, c) {
      const h = a(e, t, r, o, l, c);
      r.transmission > 0 ? i.unshift(h) : !0 === r.transparent ? n.unshift(h) : s.unshift(h);
    },
    finish: function () {
      for (let s = t, i = e.length; s < i; s++) {
        const t = e[s];
        if (null === t.id) break;
        t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
      }
    },
    sort: function (e, t) {
      s.length > 1 && s.sort(e || IE), i.length > 1 && i.sort(t || kE), n.length > 1 && n.sort(t || kE);
    }
  };
}
function LE() {
  let e = new WeakMap();
  return {
    get: function (t, s) {
      const i = e.get(t);
      let n;
      return void 0 === i ? (n = new DE(), e.set(t, [n])) : s >= i.length ? (n = new DE(), i.push(n)) : n = i[s], n;
    },
    dispose: function () {
      e = new WeakMap();
    }
  };
}
function OE() {
  const e = {};
  return {
    get: function (t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let s;
      switch (t.type) {
        case "DirectionalLight":
          s = {
            direction: new HA(),
            color: new AC()
          };
          break;
        case "SpotLight":
          s = {
            position: new HA(),
            direction: new HA(),
            color: new AC(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          s = {
            position: new HA(),
            color: new AC(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          s = {
            direction: new HA(),
            skyColor: new AC(),
            groundColor: new AC()
          };
          break;
        case "RectAreaLight":
          s = {
            color: new AC(),
            position: new HA(),
            halfWidth: new HA(),
            halfHeight: new HA()
          };
      }
      return e[t.id] = s, s;
    }
  };
}
let RE = 0;
function zE(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function NE(e, t) {
  const s = new OE(),
    i = function () {
      const e = {};
      return {
        get: function (t) {
          if (void 0 !== e[t.id]) return e[t.id];
          let s;
          switch (t.type) {
            case "DirectionalLight":
            case "SpotLight":
              s = {
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new DA()
              };
              break;
            case "PointLight":
              s = {
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new DA(),
                shadowCameraNear: 1,
                shadowCameraFar: 1e3
              };
          }
          return e[t.id] = s, s;
        }
      };
    }(),
    n = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0
    };
  for (let l = 0; l < 9; l++) n.probe.push(new HA());
  const a = new HA(),
    r = new OM(),
    o = new OM();
  return {
    setup: function (a, r) {
      let o = 0,
        l = 0,
        c = 0;
      for (let e = 0; e < 9; e++) n.probe[e].set(0, 0, 0);
      let h = 0,
        u = 0,
        d = 0,
        p = 0,
        m = 0,
        f = 0,
        g = 0,
        v = 0,
        b = 0,
        y = 0;
      a.sort(zE);
      const _ = !0 === r ? Math.PI : 1;
      for (let e = 0, t = a.length; e < t; e++) {
        const t = a[e],
          r = t.color,
          x = t.intensity,
          w = t.distance,
          S = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
        if (t.isAmbientLight) o += r.r * x * _, l += r.g * x * _, c += r.b * x * _;else if (t.isLightProbe) for (let e = 0; e < 9; e++) n.probe[e].addScaledVector(t.sh.coefficients[e], x);else if (t.isDirectionalLight) {
          const e = s.get(t);
          if (e.color.copy(t.color).multiplyScalar(t.intensity * _), t.castShadow) {
            const e = t.shadow,
              s = i.get(t);
            s.shadowBias = e.bias, s.shadowNormalBias = e.normalBias, s.shadowRadius = e.radius, s.shadowMapSize = e.mapSize, n.directionalShadow[h] = s, n.directionalShadowMap[h] = S, n.directionalShadowMatrix[h] = t.shadow.matrix, f++;
          }
          n.directional[h] = e, h++;
        } else if (t.isSpotLight) {
          const e = s.get(t);
          e.position.setFromMatrixPosition(t.matrixWorld), e.color.copy(r).multiplyScalar(x * _), e.distance = w, e.coneCos = Math.cos(t.angle), e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra)), e.decay = t.decay, n.spot[d] = e;
          const a = t.shadow;
          if (t.map && (n.spotLightMap[b] = t.map, b++, a.updateMatrices(t), t.castShadow && y++), n.spotLightMatrix[d] = a.matrix, t.castShadow) {
            const e = i.get(t);
            e.shadowBias = a.bias, e.shadowNormalBias = a.normalBias, e.shadowRadius = a.radius, e.shadowMapSize = a.mapSize, n.spotShadow[d] = e, n.spotShadowMap[d] = S, v++;
          }
          d++;
        } else if (t.isRectAreaLight) {
          const e = s.get(t);
          e.color.copy(r).multiplyScalar(x), e.halfWidth.set(.5 * t.width, 0, 0), e.halfHeight.set(0, .5 * t.height, 0), n.rectArea[p] = e, p++;
        } else if (t.isPointLight) {
          const e = s.get(t);
          if (e.color.copy(t.color).multiplyScalar(t.intensity * _), e.distance = t.distance, e.decay = t.decay, t.castShadow) {
            const e = t.shadow,
              s = i.get(t);
            s.shadowBias = e.bias, s.shadowNormalBias = e.normalBias, s.shadowRadius = e.radius, s.shadowMapSize = e.mapSize, s.shadowCameraNear = e.camera.near, s.shadowCameraFar = e.camera.far, n.pointShadow[u] = s, n.pointShadowMap[u] = S, n.pointShadowMatrix[u] = t.shadow.matrix, g++;
          }
          n.point[u] = e, u++;
        } else if (t.isHemisphereLight) {
          const e = s.get(t);
          e.skyColor.copy(t.color).multiplyScalar(x * _), e.groundColor.copy(t.groundColor).multiplyScalar(x * _), n.hemi[m] = e, m++;
        }
      }
      p > 0 && (t.isWebGL2 || !0 === e.has("OES_texture_float_linear") ? (n.rectAreaLTC1 = PP.LTC_FLOAT_1, n.rectAreaLTC2 = PP.LTC_FLOAT_2) : !0 === e.has("OES_texture_half_float_linear") && (n.rectAreaLTC1 = PP.LTC_HALF_1, n.rectAreaLTC2 = PP.LTC_HALF_2)), n.ambient[0] = o, n.ambient[1] = l, n.ambient[2] = c;
      const x = n.hash;
      x.directionalLength === h && x.pointLength === u && x.spotLength === d && x.rectAreaLength === p && x.hemiLength === m && x.numDirectionalShadows === f && x.numPointShadows === g && x.numSpotShadows === v && x.numSpotMaps === b || (n.directional.length = h, n.spot.length = d, n.rectArea.length = p, n.point.length = u, n.hemi.length = m, n.directionalShadow.length = f, n.directionalShadowMap.length = f, n.pointShadow.length = g, n.pointShadowMap.length = g, n.spotShadow.length = v, n.spotShadowMap.length = v, n.directionalShadowMatrix.length = f, n.pointShadowMatrix.length = g, n.spotLightMatrix.length = v + b - y, n.spotLightMap.length = b, n.numSpotLightShadowsWithMaps = y, x.directionalLength = h, x.pointLength = u, x.spotLength = d, x.rectAreaLength = p, x.hemiLength = m, x.numDirectionalShadows = f, x.numPointShadows = g, x.numSpotShadows = v, x.numSpotMaps = b, n.version = RE++);
    },
    setupView: function (e, t) {
      let s = 0,
        i = 0,
        l = 0,
        c = 0,
        h = 0;
      const u = t.matrixWorldInverse;
      for (let d = 0, p = e.length; d < p; d++) {
        const t = e[d];
        if (t.isDirectionalLight) {
          const e = n.directional[s];
          e.direction.setFromMatrixPosition(t.matrixWorld), a.setFromMatrixPosition(t.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(u), s++;
        } else if (t.isSpotLight) {
          const e = n.spot[l];
          e.position.setFromMatrixPosition(t.matrixWorld), e.position.applyMatrix4(u), e.direction.setFromMatrixPosition(t.matrixWorld), a.setFromMatrixPosition(t.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(u), l++;
        } else if (t.isRectAreaLight) {
          const e = n.rectArea[c];
          e.position.setFromMatrixPosition(t.matrixWorld), e.position.applyMatrix4(u), o.identity(), r.copy(t.matrixWorld), r.premultiply(u), o.extractRotation(r), e.halfWidth.set(.5 * t.width, 0, 0), e.halfHeight.set(0, .5 * t.height, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), c++;
        } else if (t.isPointLight) {
          const e = n.point[i];
          e.position.setFromMatrixPosition(t.matrixWorld), e.position.applyMatrix4(u), i++;
        } else if (t.isHemisphereLight) {
          const e = n.hemi[h];
          e.direction.setFromMatrixPosition(t.matrixWorld), e.direction.transformDirection(u), h++;
        }
      }
    },
    state: n
  };
}
function FE(e, t) {
  const s = new NE(e, t),
    i = [],
    n = [];
  return {
    init: function () {
      i.length = 0, n.length = 0;
    },
    state: {
      lightsArray: i,
      shadowsArray: n,
      lights: s
    },
    setupLights: function (e) {
      s.setup(i, e);
    },
    setupLightsView: function (e) {
      s.setupView(i, e);
    },
    pushLight: function (e) {
      i.push(e);
    },
    pushShadow: function (e) {
      n.push(e);
    }
  };
}
function UE(e, t) {
  let s = new WeakMap();
  return {
    get: function (i, n = 0) {
      const a = s.get(i);
      let r;
      return void 0 === a ? (r = new FE(e, t), s.set(i, [r])) : n >= a.length ? (r = new FE(e, t), a.push(r)) : r = a[n], r;
    },
    dispose: function () {
      s = new WeakMap();
    }
  };
}
class HE extends yC {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class GE extends yC {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.referencePosition = new HA(), this.nearDistance = 1, this.farDistance = 1e3, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const VE = "void main(){gl_Position=vec4(position,1.0);}",
  WE = "uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;\n#include <packing>\nvoid main(){const float samples=float(VSM_SAMPLES);float mean=0.0;float squared_mean=0.0;float uvStride=samples<=1.0?0.0:2.0/(samples-1.0);float uvStart=samples<=1.0?0.0:-1.0;for(float i=0.0;i<samples;i++){float uvOffset=uvStart+i*uvStride;\n#ifdef HORIZONTAL_PASS\nvec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(uvOffset,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;\n#else\nfloat depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,uvOffset)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;\n#endif\n}mean=mean/samples;squared_mean=squared_mean/samples;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}";
function jE(e, t, s) {
  let i = new wP();
  const n = new DA(),
    a = new DA(),
    r = new nM(),
    o = new HE({
      depthPacking: rA
    }),
    l = new GE(),
    c = {},
    h = s.maxTextureSize,
    u = {
      [jx]: qx,
      [qx]: jx,
      [Zx]: Zx
    },
    d = new cP({
      defines: {
        VSM_SAMPLES: 8
      },
      uniforms: {
        shadow_pass: {
          value: null
        },
        resolution: {
          value: new DA()
        },
        radius: {
          value: 4
        }
      },
      vertexShader: VE,
      fragmentShader: WE
    }),
    p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const m = new HC();
  m.setAttribute("position", new EC(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
  const f = new sP(m, d),
    g = this;
  function v(s, i) {
    const a = t.update(f);
    d.defines.VSM_SAMPLES !== s.blurSamples && (d.defines.VSM_SAMPLES = s.blurSamples, p.defines.VSM_SAMPLES = s.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), null === s.mapPass && (s.mapPass = new aM(n.x, n.y)), d.uniforms.shadow_pass.value = s.map.texture, d.uniforms.resolution.value = s.mapSize, d.uniforms.radius.value = s.radius, e.setRenderTarget(s.mapPass), e.clear(), e.renderBufferDirect(i, null, a, d, f, null), p.uniforms.shadow_pass.value = s.mapPass.texture, p.uniforms.resolution.value = s.mapSize, p.uniforms.radius.value = s.radius, e.setRenderTarget(s.map), e.clear(), e.renderBufferDirect(i, null, a, p, f, null);
  }
  function b(t, s, i, n, a, r) {
    let h = null;
    const d = !0 === i.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial;
    if (void 0 !== d) h = d;else if (h = !0 === i.isPointLight ? l : o, e.localClippingEnabled && !0 === s.clipShadows && Array.isArray(s.clippingPlanes) && 0 !== s.clippingPlanes.length || s.displacementMap && 0 !== s.displacementScale || s.alphaMap && s.alphaTest > 0 || s.map && s.alphaTest > 0) {
      const e = h.uuid,
        t = s.uuid;
      let i = c[e];
      void 0 === i && (i = {}, c[e] = i);
      let n = i[t];
      void 0 === n && (n = h.clone(), i[t] = n), h = n;
    }
    return h.visible = s.visible, h.wireframe = s.wireframe, h.side = r === Wx ? null !== s.shadowSide ? s.shadowSide : s.side : null !== s.shadowSide ? s.shadowSide : u[s.side], h.alphaMap = s.alphaMap, h.alphaTest = s.alphaTest, h.map = s.map, h.clipShadows = s.clipShadows, h.clippingPlanes = s.clippingPlanes, h.clipIntersection = s.clipIntersection, h.displacementMap = s.displacementMap, h.displacementScale = s.displacementScale, h.displacementBias = s.displacementBias, h.wireframeLinewidth = s.wireframeLinewidth, h.linewidth = s.linewidth, !0 === i.isPointLight && !0 === h.isMeshDistanceMaterial && (h.referencePosition.setFromMatrixPosition(i.matrixWorld), h.nearDistance = n, h.farDistance = a), h;
  }
  function y(s, n, a, r, o) {
    if (!1 === s.visible) return;
    if (s.layers.test(n.layers) && (s.isMesh || s.isLine || s.isPoints) && (s.castShadow || s.receiveShadow && o === Wx) && (!s.frustumCulled || i.intersectsObject(s))) {
      s.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, s.matrixWorld);
      const i = t.update(s),
        n = s.material;
      if (Array.isArray(n)) {
        const t = i.groups;
        for (let l = 0, c = t.length; l < c; l++) {
          const c = t[l],
            h = n[c.materialIndex];
          if (h && h.visible) {
            const t = b(s, h, r, a.near, a.far, o);
            e.renderBufferDirect(a, null, i, t, s, c);
          }
        }
      } else if (n.visible) {
        const t = b(s, n, r, a.near, a.far, o);
        e.renderBufferDirect(a, null, i, t, s, null);
      }
    }
    const l = s.children;
    for (let e = 0, t = l.length; e < t; e++) y(l[e], n, a, r, o);
  }
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Gx, this.render = function (t, s, o) {
    if (!1 === g.enabled) return;
    if (!1 === g.autoUpdate && !1 === g.needsUpdate) return;
    if (0 === t.length) return;
    const l = e.getRenderTarget(),
      c = e.getActiveCubeFace(),
      u = e.getActiveMipmapLevel(),
      d = e.state;
    d.setBlending($x), d.buffers.color.setClear(1, 1, 1, 1), d.buffers.depth.setTest(!0), d.setScissorTest(!1);
    for (let p = 0, m = t.length; p < m; p++) {
      const l = t[p],
        c = l.shadow;
      if (void 0 === c) continue;
      if (!1 === c.autoUpdate && !1 === c.needsUpdate) continue;
      n.copy(c.mapSize);
      const u = c.getFrameExtents();
      if (n.multiply(u), a.copy(c.mapSize), (n.x > h || n.y > h) && (n.x > h && (a.x = Math.floor(h / u.x), n.x = a.x * u.x, c.mapSize.x = a.x), n.y > h && (a.y = Math.floor(h / u.y), n.y = a.y * u.y, c.mapSize.y = a.y)), null === c.map) {
        const e = this.type !== Wx ? {
          minFilter: Hw,
          magFilter: Hw
        } : {};
        c.map = new aM(n.x, n.y, e), c.map.texture.name = l.name + ".shadowMap", c.camera.updateProjectionMatrix();
      }
      e.setRenderTarget(c.map), e.clear();
      const m = c.getViewportCount();
      for (let e = 0; e < m; e++) {
        const t = c.getViewport(e);
        r.set(a.x * t.x, a.y * t.y, a.x * t.z, a.y * t.w), d.viewport(r), c.updateMatrices(l, e), i = c.getFrustum(), y(s, o, c.camera, l, this.type);
      }
      !0 !== c.isPointLightShadow && this.type === Wx && v(c, o), c.needsUpdate = !1;
    }
    g.needsUpdate = !1, e.setRenderTarget(l, c, u);
  };
}
function qE(e, t, s) {
  const i = s.isWebGL2;
  const n = new function () {
      let t = !1;
      const s = new nM();
      let i = null;
      const n = new nM(0, 0, 0, 0);
      return {
        setMask: function (s) {
          i === s || t || (e.colorMask(s, s, s, s), i = s);
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t, i, a, r, o) {
          !0 === o && (t *= r, i *= r, a *= r), s.set(t, i, a, r), !1 === n.equals(s) && (e.clearColor(t, i, a, r), n.copy(s));
        },
        reset: function () {
          t = !1, i = null, n.set(-1, 0, 0, 0);
        }
      };
    }(),
    a = new function () {
      let t = !1,
        s = null,
        i = null,
        n = null;
      return {
        setTest: function (e) {
          e ? U(2929) : H(2929);
        },
        setMask: function (i) {
          s === i || t || (e.depthMask(i), s = i);
        },
        setFunc: function (t) {
          if (i !== t) {
            switch (t) {
              case gw:
                e.depthFunc(512);
                break;
              case vw:
                e.depthFunc(519);
                break;
              case bw:
                e.depthFunc(513);
                break;
              case yw:
                e.depthFunc(515);
                break;
              case _w:
                e.depthFunc(514);
                break;
              case xw:
                e.depthFunc(518);
                break;
              case ww:
                e.depthFunc(516);
                break;
              case Sw:
                e.depthFunc(517);
                break;
              default:
                e.depthFunc(515);
            }
            i = t;
          }
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t) {
          n !== t && (e.clearDepth(t), n = t);
        },
        reset: function () {
          t = !1, s = null, i = null, n = null;
        }
      };
    }(),
    r = new function () {
      let t = !1,
        s = null,
        i = null,
        n = null,
        a = null,
        r = null,
        o = null,
        l = null,
        c = null;
      return {
        setTest: function (e) {
          t || (e ? U(2960) : H(2960));
        },
        setMask: function (i) {
          s === i || t || (e.stencilMask(i), s = i);
        },
        setFunc: function (t, s, r) {
          i === t && n === s && a === r || (e.stencilFunc(t, s, r), i = t, n = s, a = r);
        },
        setOp: function (t, s, i) {
          r === t && o === s && l === i || (e.stencilOp(t, s, i), r = t, o = s, l = i);
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t) {
          c !== t && (e.clearStencil(t), c = t);
        },
        reset: function () {
          t = !1, s = null, i = null, n = null, a = null, r = null, o = null, l = null, c = null;
        }
      };
    }(),
    o = new WeakMap(),
    l = new WeakMap();
  let c = {},
    h = {},
    u = new WeakMap(),
    d = [],
    p = null,
    m = !1,
    f = null,
    g = null,
    v = null,
    b = null,
    y = null,
    _ = null,
    x = null,
    w = !1,
    S = null,
    A = null,
    M = null,
    C = null,
    P = null;
  const T = e.getParameter(35661);
  let E = !1,
    B = 0;
  const I = e.getParameter(7938);
  -1 !== I.indexOf("WebGL") ? (B = parseFloat(/^WebGL (\d)/.exec(I)[1]), E = B >= 1) : -1 !== I.indexOf("OpenGL ES") && (B = parseFloat(/^OpenGL ES (\d)/.exec(I)[1]), E = B >= 2);
  let k = null,
    D = {};
  const L = e.getParameter(3088),
    O = e.getParameter(2978),
    R = new nM().fromArray(L),
    z = new nM().fromArray(O);
  function N(t, s, i) {
    const n = new Uint8Array(4),
      a = e.createTexture();
    e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
    for (let r = 0; r < i; r++) e.texImage2D(s + r, 0, 6408, 1, 1, 0, 6408, 5121, n);
    return a;
  }
  const F = {};
  function U(t) {
    !0 !== c[t] && (e.enable(t), c[t] = !0);
  }
  function H(t) {
    !1 !== c[t] && (e.disable(t), c[t] = !1);
  }
  F[3553] = N(3553, 3553, 1), F[34067] = N(34067, 34069, 6), n.setClear(0, 0, 0, 1), a.setClear(1), r.setClear(0), U(2929), a.setFunc(yw), j(!1), q(Fx), U(2884), W($x);
  const G = {
    [ew]: 32774,
    [tw]: 32778,
    [sw]: 32779
  };
  if (i) G[iw] = 32775, G[nw] = 32776;else {
    const e = t.get("EXT_blend_minmax");
    null !== e && (G[iw] = e.MIN_EXT, G[nw] = e.MAX_EXT);
  }
  const V = {
    [aw]: 0,
    [rw]: 1,
    [ow]: 768,
    [cw]: 770,
    [fw]: 776,
    [pw]: 774,
    [uw]: 772,
    [lw]: 769,
    [hw]: 771,
    [mw]: 775,
    [dw]: 773
  };
  function W(t, s, i, n, a, r, o, l) {
    if (t !== $x) {
      if (!1 === m && (U(3042), m = !0), t === Kx) a = a || s, r = r || i, o = o || n, s === g && a === y || (e.blendEquationSeparate(G[s], G[a]), g = s, y = a), i === v && n === b && r === _ && o === x || (e.blendFuncSeparate(V[i], V[n], V[r], V[o]), v = i, b = n, _ = r, x = o), f = t, w = !1;else if (t !== f || l !== w) {
        if (g === ew && y === ew || (e.blendEquation(32774), g = ew, y = ew), l) switch (t) {
          case Xx:
            e.blendFuncSeparate(1, 771, 1, 771);
            break;
          case Yx:
            e.blendFunc(1, 1);
            break;
          case Jx:
            e.blendFuncSeparate(0, 769, 0, 1);
            break;
          case Qx:
            e.blendFuncSeparate(0, 768, 0, 770);
        } else switch (t) {
          case Xx:
            e.blendFuncSeparate(770, 771, 1, 771);
            break;
          case Yx:
            e.blendFunc(770, 1);
            break;
          case Jx:
            e.blendFuncSeparate(0, 769, 0, 1);
            break;
          case Qx:
            e.blendFunc(0, 768);
        }
        v = null, b = null, _ = null, x = null, f = t, w = l;
      }
    } else !0 === m && (H(3042), m = !1);
  }
  function j(t) {
    S !== t && (t ? e.frontFace(2304) : e.frontFace(2305), S = t);
  }
  function q(t) {
    t !== Nx ? (U(2884), t !== A && (t === Fx ? e.cullFace(1029) : t === Ux ? e.cullFace(1028) : e.cullFace(1032))) : H(2884), A = t;
  }
  function Z(t, s, i) {
    t ? (U(32823), C === s && P === i || (e.polygonOffset(s, i), C = s, P = i)) : H(32823);
  }
  return {
    buffers: {
      color: n,
      depth: a,
      stencil: r
    },
    enable: U,
    disable: H,
    bindFramebuffer: function (t, s) {
      return h[t] !== s && (e.bindFramebuffer(t, s), h[t] = s, i && (36009 === t && (h[36160] = s), 36160 === t && (h[36009] = s)), !0);
    },
    drawBuffers: function (i, n) {
      let a = d,
        r = !1;
      if (i) {
        if (a = u.get(n), void 0 === a && (a = [], u.set(n, a)), i.isWebGLMultipleRenderTargets) {
          const e = i.texture;
          if (a.length !== e.length || 36064 !== a[0]) {
            for (let t = 0, s = e.length; t < s; t++) a[t] = 36064 + t;
            a.length = e.length, r = !0;
          }
        } else 36064 !== a[0] && (a[0] = 36064, r = !0);
      } else 1029 !== a[0] && (a[0] = 1029, r = !0);
      r && (s.isWebGL2 ? e.drawBuffers(a) : t.get("WEBGL_draw_buffers").drawBuffersWEBGL(a));
    },
    useProgram: function (t) {
      return p !== t && (e.useProgram(t), p = t, !0);
    },
    setBlending: W,
    setMaterial: function (e, t) {
      e.side === Zx ? H(2884) : U(2884);
      let s = e.side === qx;
      t && (s = !s), j(s), e.blending === Xx && !1 === e.transparent ? W($x) : W(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), a.setFunc(e.depthFunc), a.setTest(e.depthTest), a.setMask(e.depthWrite), n.setMask(e.colorWrite);
      const i = e.stencilWrite;
      r.setTest(i), i && (r.setMask(e.stencilWriteMask), r.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), r.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), Z(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits), !0 === e.alphaToCoverage ? U(32926) : H(32926);
    },
    setFlipSided: j,
    setCullFace: q,
    setLineWidth: function (t) {
      t !== M && (E && e.lineWidth(t), M = t);
    },
    setPolygonOffset: Z,
    setScissorTest: function (e) {
      e ? U(3089) : H(3089);
    },
    activeTexture: function (t) {
      void 0 === t && (t = 33984 + T - 1), k !== t && (e.activeTexture(t), k = t);
    },
    bindTexture: function (t, s, i) {
      void 0 === i && (i = null === k ? 33984 + T - 1 : k);
      let n = D[i];
      void 0 === n && (n = {
        type: void 0,
        texture: void 0
      }, D[i] = n), n.type === t && n.texture === s || (k !== i && (e.activeTexture(i), k = i), e.bindTexture(t, s || F[t]), n.type = t, n.texture = s);
    },
    unbindTexture: function () {
      const t = D[k];
      void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
    },
    compressedTexImage2D: function () {
      try {
        e.compressedTexImage2D.apply(e, arguments);
      } catch (t) {}
    },
    compressedTexImage3D: function () {
      try {
        e.compressedTexImage3D.apply(e, arguments);
      } catch (t) {}
    },
    texImage2D: function () {
      try {
        e.texImage2D.apply(e, arguments);
      } catch (t) {}
    },
    texImage3D: function () {
      try {
        e.texImage3D.apply(e, arguments);
      } catch (t) {}
    },
    updateUBOMapping: function (t, s) {
      let i = l.get(s);
      void 0 === i && (i = new WeakMap(), l.set(s, i));
      let n = i.get(t);
      void 0 === n && (n = e.getUniformBlockIndex(s, t.name), i.set(t, n));
    },
    uniformBlockBinding: function (t, s) {
      const i = l.get(s).get(t);
      o.get(s) !== i && (e.uniformBlockBinding(s, i, t.__bindingPointIndex), o.set(s, i));
    },
    texStorage2D: function () {
      try {
        e.texStorage2D.apply(e, arguments);
      } catch (t) {}
    },
    texStorage3D: function () {
      try {
        e.texStorage3D.apply(e, arguments);
      } catch (t) {}
    },
    texSubImage2D: function () {
      try {
        e.texSubImage2D.apply(e, arguments);
      } catch (t) {}
    },
    texSubImage3D: function () {
      try {
        e.texSubImage3D.apply(e, arguments);
      } catch (t) {}
    },
    compressedTexSubImage2D: function () {
      try {
        e.compressedTexSubImage2D.apply(e, arguments);
      } catch (t) {}
    },
    compressedTexSubImage3D: function () {
      try {
        e.compressedTexSubImage3D.apply(e, arguments);
      } catch (t) {}
    },
    scissor: function (t) {
      !1 === R.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), R.copy(t));
    },
    viewport: function (t) {
      !1 === z.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), z.copy(t));
    },
    reset: function () {
      e.disable(3042), e.disable(2884), e.disable(2929), e.disable(32823), e.disable(3089), e.disable(2960), e.disable(32926), e.blendEquation(32774), e.blendFunc(1, 0), e.blendFuncSeparate(1, 0, 1, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(513), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(519, 0, 4294967295), e.stencilOp(7680, 7680, 7680), e.clearStencil(0), e.cullFace(1029), e.frontFace(2305), e.polygonOffset(0, 0), e.activeTexture(33984), e.bindFramebuffer(36160, null), !0 === i && (e.bindFramebuffer(36009, null), e.bindFramebuffer(36008, null)), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), c = {}, k = null, D = {}, h = {}, u = new WeakMap(), d = [], p = null, m = !1, f = null, g = null, v = null, b = null, y = null, _ = null, x = null, w = !1, S = null, A = null, M = null, C = null, P = null, R.set(0, 0, e.canvas.width, e.canvas.height), z.set(0, 0, e.canvas.width, e.canvas.height), n.reset(), a.reset(), r.reset();
    }
  };
}
function ZE(e, t, s, i, n, a, r) {
  const o = n.isWebGL2,
    l = (n.maxTextures, n.maxCubemapSize),
    c = n.maxTextureSize,
    h = n.maxSamples,
    u = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
    d = "undefined" != typeof navigator && /OculusBrowser/g.test(navigator.userAgent),
    p = new WeakMap();
  let m;
  const f = new WeakMap();
  let g = !1;
  try {
    g = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
  } catch (H) {}
  function v(e, t) {
    return g ? new OffscreenCanvas(e, t) : FA("canvas");
  }
  function b(e, t, s, i) {
    let n = 1;
    if ((e.width > i || e.height > i) && (n = i / Math.max(e.width, e.height)), n < 1 || !0 === t) {
      if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
        const i = t ? EA : Math.floor,
          a = i(n * e.width),
          r = i(n * e.height);
        void 0 === m && (m = v(a, r));
        const o = s ? v(a, r) : m;
        o.width = a, o.height = r;
        return o.getContext("2d").drawImage(e, 0, 0, a, r), o;
      }
      return e;
    }
    return e;
  }
  function y(e) {
    return PA(e.width) && PA(e.height);
  }
  function _(e, t) {
    return e.generateMipmaps && t && e.minFilter !== Hw && e.minFilter !== Ww;
  }
  function x(t) {
    e.generateMipmap(t);
  }
  function w(s, i, n, a, r = !1) {
    if (!1 === o) return i;
    if (null !== s && void 0 !== e[s]) return e[s];
    let l = i;
    return 6403 === i && (5126 === n && (l = 33326), 5131 === n && (l = 33325), 5121 === n && (l = 33321)), 33319 === i && (5126 === n && (l = 33328), 5131 === n && (l = 33327), 5121 === n && (l = 33323)), 6408 === i && (5126 === n && (l = 34836), 5131 === n && (l = 34842), 5121 === n && (l = a === aA && !1 === r ? 35907 : 32856), 32819 === n && (l = 32854), 32820 === n && (l = 32855)), 33325 !== l && 33326 !== l && 33327 !== l && 33328 !== l && 34842 !== l && 34836 !== l || t.get("EXT_color_buffer_float"), l;
  }
  function S(e, t, s) {
    return !0 === _(e, s) || e.isFramebufferTexture && e.minFilter !== Hw && e.minFilter !== Ww ? Math.log2(Math.max(t.width, t.height)) + 1 : void 0 !== e.mipmaps && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
  }
  function A(e) {
    return e === Hw || e === Gw || e === Vw ? 9728 : 9729;
  }
  function M(e) {
    const t = e.target;
    t.removeEventListener("dispose", M), function (e) {
      const t = i.get(e);
      if (void 0 === t.__webglInit) return;
      const s = e.source,
        n = f.get(s);
      if (n) {
        const i = n[t.__cacheKey];
        i.usedTimes--, 0 === i.usedTimes && P(e), 0 === Object.keys(n).length && f.delete(s);
      }
      i.remove(e);
    }(t), t.isVideoTexture && p.delete(t);
  }
  function C(t) {
    const s = t.target;
    s.removeEventListener("dispose", C), function (t) {
      const s = t.texture,
        n = i.get(t),
        a = i.get(s);
      void 0 !== a.__webglTexture && (e.deleteTexture(a.__webglTexture), r.memory.textures--);
      t.depthTexture && t.depthTexture.dispose();
      if (t.isWebGLCubeRenderTarget) for (let i = 0; i < 6; i++) e.deleteFramebuffer(n.__webglFramebuffer[i]), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[i]);else {
        if (e.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
        n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
      }
      if (t.isWebGLMultipleRenderTargets) for (let o = 0, l = s.length; o < l; o++) {
        const t = i.get(s[o]);
        t.__webglTexture && (e.deleteTexture(t.__webglTexture), r.memory.textures--), i.remove(s[o]);
      }
      i.remove(s), i.remove(t);
    }(s);
  }
  function P(t) {
    const s = i.get(t);
    e.deleteTexture(s.__webglTexture);
    const n = t.source;
    delete f.get(n)[s.__cacheKey], r.memory.textures--;
  }
  let T = 0;
  function E(e, t) {
    const n = i.get(e);
    if (e.isVideoTexture && function (e) {
      const t = r.render.frame;
      p.get(e) !== t && (p.set(e, t), e.update());
    }(e), !1 === e.isRenderTargetTexture && e.version > 0 && n.__version !== e.version) {
      const s = e.image;
      if (null === s) ;else if (!1 !== s.complete) return void L(n, e, t);
    }
    s.bindTexture(3553, n.__webglTexture, 33984 + t);
  }
  const B = {
      [Nw]: 10497,
      [Fw]: 33071,
      [Uw]: 33648
    },
    I = {
      [Hw]: 9728,
      [Gw]: 9984,
      [Vw]: 9986,
      [Ww]: 9729,
      [jw]: 9985,
      [qw]: 9987
    };
  function k(s, a, r) {
    if (r ? (e.texParameteri(s, 10242, B[a.wrapS]), e.texParameteri(s, 10243, B[a.wrapT]), 32879 !== s && 35866 !== s || e.texParameteri(s, 32882, B[a.wrapR]), e.texParameteri(s, 10240, I[a.magFilter]), e.texParameteri(s, 10241, I[a.minFilter])) : (e.texParameteri(s, 10242, 33071), e.texParameteri(s, 10243, 33071), 32879 !== s && 35866 !== s || e.texParameteri(s, 32882, 33071), a.wrapS !== Fw || a.wrapT, e.texParameteri(s, 10240, A(a.magFilter)), e.texParameteri(s, 10241, A(a.minFilter)), a.minFilter !== Hw && a.minFilter), !0 === t.has("EXT_texture_filter_anisotropic")) {
      const r = t.get("EXT_texture_filter_anisotropic");
      if (a.magFilter === Hw) return;
      if (a.minFilter !== Vw && a.minFilter !== qw) return;
      if (a.type === Kw && !1 === t.has("OES_texture_float_linear")) return;
      if (!1 === o && a.type === eS && !1 === t.has("OES_texture_half_float_linear")) return;
      (a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (e.texParameterf(s, r.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, n.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy);
    }
  }
  function D(t, s) {
    let i = !1;
    void 0 === t.__webglInit && (t.__webglInit = !0, s.addEventListener("dispose", M));
    const n = s.source;
    let a = f.get(n);
    void 0 === a && (a = {}, f.set(n, a));
    const o = function (e) {
      const t = [];
      return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.encoding), t.join();
    }(s);
    if (o !== t.__cacheKey) {
      void 0 === a[o] && (a[o] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, r.memory.textures++, i = !0), a[o].usedTimes++;
      const n = a[t.__cacheKey];
      void 0 !== n && (a[t.__cacheKey].usedTimes--, 0 === n.usedTimes && P(s)), t.__cacheKey = o, t.__webglTexture = a[o].texture;
    }
    return i;
  }
  function L(t, n, r) {
    let l = 3553;
    (n.isDataArrayTexture || n.isCompressedArrayTexture) && (l = 35866), n.isData3DTexture && (l = 32879);
    const h = D(t, n),
      u = n.source;
    s.bindTexture(l, t.__webglTexture, 33984 + r);
    const d = i.get(u);
    if (u.version !== d.__version || !0 === h) {
      s.activeTexture(33984 + r), e.pixelStorei(37440, n.flipY), e.pixelStorei(37441, n.premultiplyAlpha), e.pixelStorei(3317, n.unpackAlignment), e.pixelStorei(37443, 0);
      const t = function (e) {
        return !o && (e.wrapS !== Fw || e.wrapT !== Fw || e.minFilter !== Hw && e.minFilter !== Ww);
      }(n) && !1 === y(n.image);
      let i = b(n.image, t, !1, c);
      i = U(n, i);
      const p = y(i) || o,
        m = a.convert(n.format, n.encoding);
      let f,
        g = a.convert(n.type),
        v = w(n.internalFormat, m, g, n.encoding, n.isVideoTexture);
      k(l, n, p);
      const A = n.mipmaps,
        M = o && !0 !== n.isVideoTexture,
        C = void 0 === d.__version || !0 === h,
        P = S(n, i, p);
      if (n.isDepthTexture) v = 6402, o ? v = n.type === Kw ? 36012 : n.type === Qw ? 33190 : n.type === iS ? 35056 : 33189 : n.type, n.format === lS && 6402 === v && n.type !== Yw && n.type !== Qw && (n.type = Qw, g = a.convert(n.type)), n.format === cS && 6402 === v && (v = 34041, n.type !== iS && (n.type = iS, g = a.convert(n.type))), C && (M ? s.texStorage2D(3553, 1, v, i.width, i.height) : s.texImage2D(3553, 0, v, i.width, i.height, 0, m, g, null));else if (n.isDataTexture) {
        if (A.length > 0 && p) {
          M && C && s.texStorage2D(3553, P, v, A[0].width, A[0].height);
          for (let e = 0, t = A.length; e < t; e++) f = A[e], M ? s.texSubImage2D(3553, e, 0, 0, f.width, f.height, m, g, f.data) : s.texImage2D(3553, e, v, f.width, f.height, 0, m, g, f.data);
          n.generateMipmaps = !1;
        } else M ? (C && s.texStorage2D(3553, P, v, i.width, i.height), s.texSubImage2D(3553, 0, 0, 0, i.width, i.height, m, g, i.data)) : s.texImage2D(3553, 0, v, i.width, i.height, 0, m, g, i.data);
      } else if (n.isCompressedTexture) {
        if (n.isCompressedArrayTexture) {
          M && C && s.texStorage3D(35866, P, v, A[0].width, A[0].height, i.depth);
          for (let e = 0, t = A.length; e < t; e++) f = A[e], n.format !== aS ? null !== m && (M ? s.compressedTexSubImage3D(35866, e, 0, 0, 0, f.width, f.height, i.depth, m, f.data, 0, 0) : s.compressedTexImage3D(35866, e, v, f.width, f.height, i.depth, 0, f.data, 0, 0)) : M ? s.texSubImage3D(35866, e, 0, 0, 0, f.width, f.height, i.depth, m, g, f.data) : s.texImage3D(35866, e, v, f.width, f.height, i.depth, 0, m, g, f.data);
        } else {
          M && C && s.texStorage2D(3553, P, v, A[0].width, A[0].height);
          for (let e = 0, t = A.length; e < t; e++) f = A[e], n.format !== aS ? null !== m && (M ? s.compressedTexSubImage2D(3553, e, 0, 0, f.width, f.height, m, f.data) : s.compressedTexImage2D(3553, e, v, f.width, f.height, 0, f.data)) : M ? s.texSubImage2D(3553, e, 0, 0, f.width, f.height, m, g, f.data) : s.texImage2D(3553, e, v, f.width, f.height, 0, m, g, f.data);
        }
      } else if (n.isDataArrayTexture) M ? (C && s.texStorage3D(35866, P, v, i.width, i.height, i.depth), s.texSubImage3D(35866, 0, 0, 0, 0, i.width, i.height, i.depth, m, g, i.data)) : s.texImage3D(35866, 0, v, i.width, i.height, i.depth, 0, m, g, i.data);else if (n.isData3DTexture) M ? (C && s.texStorage3D(32879, P, v, i.width, i.height, i.depth), s.texSubImage3D(32879, 0, 0, 0, 0, i.width, i.height, i.depth, m, g, i.data)) : s.texImage3D(32879, 0, v, i.width, i.height, i.depth, 0, m, g, i.data);else if (n.isFramebufferTexture) {
        if (C) if (M) s.texStorage2D(3553, P, v, i.width, i.height);else {
          let e = i.width,
            t = i.height;
          for (let i = 0; i < P; i++) s.texImage2D(3553, i, v, e, t, 0, m, g, null), e >>= 1, t >>= 1;
        }
      } else if (A.length > 0 && p) {
        M && C && s.texStorage2D(3553, P, v, A[0].width, A[0].height);
        for (let e = 0, t = A.length; e < t; e++) f = A[e], M ? s.texSubImage2D(3553, e, 0, 0, m, g, f) : s.texImage2D(3553, e, v, m, g, f);
        n.generateMipmaps = !1;
      } else M ? (C && s.texStorage2D(3553, P, v, i.width, i.height), s.texSubImage2D(3553, 0, 0, 0, m, g, i)) : s.texImage2D(3553, 0, v, m, g, i);
      _(n, p) && x(l), d.__version = u.version, n.onUpdate && n.onUpdate(n);
    }
    t.__version = n.version;
  }
  function O(t, n, r, o, l) {
    const c = a.convert(r.format, r.encoding),
      h = a.convert(r.type),
      d = w(r.internalFormat, c, h, r.encoding);
    i.get(n).__hasExternalTextures || (32879 === l || 35866 === l ? s.texImage3D(l, 0, d, n.width, n.height, n.depth, 0, c, h, null) : s.texImage2D(l, 0, d, n.width, n.height, 0, c, h, null)), s.bindFramebuffer(36160, t), F(n) ? u.framebufferTexture2DMultisampleEXT(36160, o, l, i.get(r).__webglTexture, 0, N(n)) : (3553 === l || l >= 34069 && l <= 34074) && e.framebufferTexture2D(36160, o, l, i.get(r).__webglTexture, 0), s.bindFramebuffer(36160, null);
  }
  function R(t, s, i) {
    if (e.bindRenderbuffer(36161, t), s.depthBuffer && !s.stencilBuffer) {
      let n = 33189;
      if (i || F(s)) {
        const t = s.depthTexture;
        t && t.isDepthTexture && (t.type === Kw ? n = 36012 : t.type === Qw && (n = 33190));
        const i = N(s);
        F(s) ? u.renderbufferStorageMultisampleEXT(36161, i, n, s.width, s.height) : e.renderbufferStorageMultisample(36161, i, n, s.width, s.height);
      } else e.renderbufferStorage(36161, n, s.width, s.height);
      e.framebufferRenderbuffer(36160, 36096, 36161, t);
    } else if (s.depthBuffer && s.stencilBuffer) {
      const n = N(s);
      i && !1 === F(s) ? e.renderbufferStorageMultisample(36161, n, 35056, s.width, s.height) : F(s) ? u.renderbufferStorageMultisampleEXT(36161, n, 35056, s.width, s.height) : e.renderbufferStorage(36161, 34041, s.width, s.height), e.framebufferRenderbuffer(36160, 33306, 36161, t);
    } else {
      const t = !0 === s.isWebGLMultipleRenderTargets ? s.texture : [s.texture];
      for (let n = 0; n < t.length; n++) {
        const r = t[n],
          o = a.convert(r.format, r.encoding),
          l = a.convert(r.type),
          c = w(r.internalFormat, o, l, r.encoding),
          h = N(s);
        i && !1 === F(s) ? e.renderbufferStorageMultisample(36161, h, c, s.width, s.height) : F(s) ? u.renderbufferStorageMultisampleEXT(36161, h, c, s.width, s.height) : e.renderbufferStorage(36161, c, s.width, s.height);
      }
    }
    e.bindRenderbuffer(36161, null);
  }
  function z(t) {
    const n = i.get(t),
      a = !0 === t.isWebGLCubeRenderTarget;
    if (t.depthTexture && !n.__autoAllocateDepthBuffer) {
      if (a) throw new Error("target.depthTexture not supported in Cube render targets");
      !function (t, n) {
        if (n && n.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
        if (s.bindFramebuffer(36160, t), !n.depthTexture || !n.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
        i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), E(n.depthTexture, 0);
        const a = i.get(n.depthTexture).__webglTexture,
          r = N(n);
        if (n.depthTexture.format === lS) F(n) ? u.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, a, 0, r) : e.framebufferTexture2D(36160, 36096, 3553, a, 0);else {
          if (n.depthTexture.format !== cS) throw new Error("Unknown depthTexture format");
          F(n) ? u.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, a, 0, r) : e.framebufferTexture2D(36160, 33306, 3553, a, 0);
        }
      }(n.__webglFramebuffer, t);
    } else if (a) {
      n.__webglDepthbuffer = [];
      for (let i = 0; i < 6; i++) s.bindFramebuffer(36160, n.__webglFramebuffer[i]), n.__webglDepthbuffer[i] = e.createRenderbuffer(), R(n.__webglDepthbuffer[i], t, !1);
    } else s.bindFramebuffer(36160, n.__webglFramebuffer), n.__webglDepthbuffer = e.createRenderbuffer(), R(n.__webglDepthbuffer, t, !1);
    s.bindFramebuffer(36160, null);
  }
  function N(e) {
    return Math.min(h, e.samples);
  }
  function F(e) {
    const s = i.get(e);
    return o && e.samples > 0 && !0 === t.has("WEBGL_multisampled_render_to_texture") && !1 !== s.__useRenderToTexture;
  }
  function U(e, s) {
    const i = e.encoding,
      n = e.format;
    e.type;
    return !0 === e.isCompressedTexture || !0 === e.isVideoTexture || e.format === vA || i !== nA && i === aA && !1 === o && (!0 === t.has("EXT_sRGB") && n === aS ? (e.format = vA, e.minFilter = Ww, e.generateMipmaps = !1) : s = KA.sRGBToLinear(s)), s;
  }
  this.allocateTextureUnit = function () {
    const e = T;
    return T += 1, e;
  }, this.resetTextureUnits = function () {
    T = 0;
  }, this.setTexture2D = E, this.setTexture2DArray = function (e, t) {
    const n = i.get(e);
    e.version > 0 && n.__version !== e.version ? L(n, e, t) : s.bindTexture(35866, n.__webglTexture, 33984 + t);
  }, this.setTexture3D = function (e, t) {
    const n = i.get(e);
    e.version > 0 && n.__version !== e.version ? L(n, e, t) : s.bindTexture(32879, n.__webglTexture, 33984 + t);
  }, this.setTextureCube = function (t, n) {
    const r = i.get(t);
    t.version > 0 && r.__version !== t.version ? function (t, n, r) {
      if (6 !== n.image.length) return;
      const c = D(t, n),
        h = n.source;
      s.bindTexture(34067, t.__webglTexture, 33984 + r);
      const u = i.get(h);
      if (h.version !== u.__version || !0 === c) {
        s.activeTexture(33984 + r), e.pixelStorei(37440, n.flipY), e.pixelStorei(37441, n.premultiplyAlpha), e.pixelStorei(3317, n.unpackAlignment), e.pixelStorei(37443, 0);
        const t = n.isCompressedTexture || n.image[0].isCompressedTexture,
          i = n.image[0] && n.image[0].isDataTexture,
          d = [];
        for (let e = 0; e < 6; e++) d[e] = t || i ? i ? n.image[e].image : n.image[e] : b(n.image[e], !1, !0, l), d[e] = U(n, d[e]);
        const p = d[0],
          m = y(p) || o,
          f = a.convert(n.format, n.encoding),
          g = a.convert(n.type),
          v = w(n.internalFormat, f, g, n.encoding),
          A = o && !0 !== n.isVideoTexture,
          M = void 0 === u.__version || !0 === c;
        let C,
          P = S(n, p, m);
        if (k(34067, n, m), t) {
          A && M && s.texStorage2D(34067, P, v, p.width, p.height);
          for (let e = 0; e < 6; e++) {
            C = d[e].mipmaps;
            for (let t = 0; t < C.length; t++) {
              const i = C[t];
              n.format !== aS ? null !== f && (A ? s.compressedTexSubImage2D(34069 + e, t, 0, 0, i.width, i.height, f, i.data) : s.compressedTexImage2D(34069 + e, t, v, i.width, i.height, 0, i.data)) : A ? s.texSubImage2D(34069 + e, t, 0, 0, i.width, i.height, f, g, i.data) : s.texImage2D(34069 + e, t, v, i.width, i.height, 0, f, g, i.data);
            }
          }
        } else {
          C = n.mipmaps, A && M && (C.length > 0 && P++, s.texStorage2D(34067, P, v, d[0].width, d[0].height));
          for (let e = 0; e < 6; e++) if (i) {
            A ? s.texSubImage2D(34069 + e, 0, 0, 0, d[e].width, d[e].height, f, g, d[e].data) : s.texImage2D(34069 + e, 0, v, d[e].width, d[e].height, 0, f, g, d[e].data);
            for (let t = 0; t < C.length; t++) {
              const i = C[t].image[e].image;
              A ? s.texSubImage2D(34069 + e, t + 1, 0, 0, i.width, i.height, f, g, i.data) : s.texImage2D(34069 + e, t + 1, v, i.width, i.height, 0, f, g, i.data);
            }
          } else {
            A ? s.texSubImage2D(34069 + e, 0, 0, 0, f, g, d[e]) : s.texImage2D(34069 + e, 0, v, f, g, d[e]);
            for (let t = 0; t < C.length; t++) {
              const i = C[t];
              A ? s.texSubImage2D(34069 + e, t + 1, 0, 0, f, g, i.image[e]) : s.texImage2D(34069 + e, t + 1, v, f, g, i.image[e]);
            }
          }
        }
        _(n, m) && x(34067), u.__version = h.version, n.onUpdate && n.onUpdate(n);
      }
      t.__version = n.version;
    }(r, t, n) : s.bindTexture(34067, r.__webglTexture, 33984 + n);
  }, this.rebindTextures = function (e, t, s) {
    const n = i.get(e);
    void 0 !== t && O(n.__webglFramebuffer, e, e.texture, 36064, 3553), void 0 !== s && z(e);
  }, this.setupRenderTarget = function (t) {
    const l = t.texture,
      c = i.get(t),
      h = i.get(l);
    t.addEventListener("dispose", C), !0 !== t.isWebGLMultipleRenderTargets && (void 0 === h.__webglTexture && (h.__webglTexture = e.createTexture()), h.__version = l.version, r.memory.textures++);
    const u = !0 === t.isWebGLCubeRenderTarget,
      d = !0 === t.isWebGLMultipleRenderTargets,
      p = y(t) || o;
    if (u) {
      c.__webglFramebuffer = [];
      for (let t = 0; t < 6; t++) c.__webglFramebuffer[t] = e.createFramebuffer();
    } else {
      if (c.__webglFramebuffer = e.createFramebuffer(), d && n.drawBuffers) {
        const s = t.texture;
        for (let t = 0, n = s.length; t < n; t++) {
          const n = i.get(s[t]);
          void 0 === n.__webglTexture && (n.__webglTexture = e.createTexture(), r.memory.textures++);
        }
      }
      if (o && t.samples > 0 && !1 === F(t)) {
        const i = d ? l : [l];
        c.__webglMultisampledFramebuffer = e.createFramebuffer(), c.__webglColorRenderbuffer = [], s.bindFramebuffer(36160, c.__webglMultisampledFramebuffer);
        for (let s = 0; s < i.length; s++) {
          const n = i[s];
          c.__webglColorRenderbuffer[s] = e.createRenderbuffer(), e.bindRenderbuffer(36161, c.__webglColorRenderbuffer[s]);
          const r = a.convert(n.format, n.encoding),
            o = a.convert(n.type),
            l = w(n.internalFormat, r, o, n.encoding, !0 === t.isXRRenderTarget),
            h = N(t);
          e.renderbufferStorageMultisample(36161, h, l, t.width, t.height), e.framebufferRenderbuffer(36160, 36064 + s, 36161, c.__webglColorRenderbuffer[s]);
        }
        e.bindRenderbuffer(36161, null), t.depthBuffer && (c.__webglDepthRenderbuffer = e.createRenderbuffer(), R(c.__webglDepthRenderbuffer, t, !0)), s.bindFramebuffer(36160, null);
      }
    }
    if (u) {
      s.bindTexture(34067, h.__webglTexture), k(34067, l, p);
      for (let e = 0; e < 6; e++) O(c.__webglFramebuffer[e], t, l, 36064, 34069 + e);
      _(l, p) && x(34067), s.unbindTexture();
    } else if (d) {
      const e = t.texture;
      for (let n = 0, a = e.length; n < a; n++) {
        const a = e[n],
          r = i.get(a);
        s.bindTexture(3553, r.__webglTexture), k(3553, a, p), O(c.__webglFramebuffer, t, a, 36064 + n, 3553), _(a, p) && x(3553);
      }
      s.unbindTexture();
    } else {
      let e = 3553;
      (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && o && (e = t.isWebGL3DRenderTarget ? 32879 : 35866), s.bindTexture(e, h.__webglTexture), k(e, l, p), O(c.__webglFramebuffer, t, l, 36064, e), _(l, p) && x(e), s.unbindTexture();
    }
    t.depthBuffer && z(t);
  }, this.updateRenderTargetMipmap = function (e) {
    const t = y(e) || o,
      n = !0 === e.isWebGLMultipleRenderTargets ? e.texture : [e.texture];
    for (let a = 0, r = n.length; a < r; a++) {
      const r = n[a];
      if (_(r, t)) {
        const t = e.isWebGLCubeRenderTarget ? 34067 : 3553,
          n = i.get(r).__webglTexture;
        s.bindTexture(t, n), x(t), s.unbindTexture();
      }
    }
  }, this.updateMultisampleRenderTarget = function (t) {
    if (o && t.samples > 0 && !1 === F(t)) {
      const n = t.isWebGLMultipleRenderTargets ? t.texture : [t.texture],
        a = t.width,
        r = t.height;
      let o = 16384;
      const l = [],
        c = t.stencilBuffer ? 33306 : 36096,
        h = i.get(t),
        u = !0 === t.isWebGLMultipleRenderTargets;
      if (u) for (let t = 0; t < n.length; t++) s.bindFramebuffer(36160, h.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064 + t, 36161, null), s.bindFramebuffer(36160, h.__webglFramebuffer), e.framebufferTexture2D(36009, 36064 + t, 3553, null, 0);
      s.bindFramebuffer(36008, h.__webglMultisampledFramebuffer), s.bindFramebuffer(36009, h.__webglFramebuffer);
      for (let s = 0; s < n.length; s++) {
        l.push(36064 + s), t.depthBuffer && l.push(c);
        const p = void 0 !== h.__ignoreDepthValues && h.__ignoreDepthValues;
        if (!1 === p && (t.depthBuffer && (o |= 256), t.stencilBuffer && (o |= 1024)), u && e.framebufferRenderbuffer(36008, 36064, 36161, h.__webglColorRenderbuffer[s]), !0 === p && (e.invalidateFramebuffer(36008, [c]), e.invalidateFramebuffer(36009, [c])), u) {
          const t = i.get(n[s]).__webglTexture;
          e.framebufferTexture2D(36009, 36064, 3553, t, 0);
        }
        e.blitFramebuffer(0, 0, a, r, 0, 0, a, r, o, 9728), d && e.invalidateFramebuffer(36008, l);
      }
      if (s.bindFramebuffer(36008, null), s.bindFramebuffer(36009, null), u) for (let t = 0; t < n.length; t++) {
        s.bindFramebuffer(36160, h.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064 + t, 36161, h.__webglColorRenderbuffer[t]);
        const a = i.get(n[t]).__webglTexture;
        s.bindFramebuffer(36160, h.__webglFramebuffer), e.framebufferTexture2D(36009, 36064 + t, 3553, a, 0);
      }
      s.bindFramebuffer(36009, h.__webglMultisampledFramebuffer);
    }
  }, this.setupDepthRenderbuffer = z, this.setupFrameBufferTexture = O, this.useMultisampledRTT = F;
}
function $E(e, t, s) {
  const i = s.isWebGL2;
  return {
    convert: function (s, n = null) {
      let a;
      if (s === Zw) return 5121;
      if (s === tS) return 32819;
      if (s === sS) return 32820;
      if (s === $w) return 5120;
      if (s === Xw) return 5122;
      if (s === Yw) return 5123;
      if (s === Jw) return 5124;
      if (s === Qw) return 5125;
      if (s === Kw) return 5126;
      if (s === eS) return i ? 5131 : (a = t.get("OES_texture_half_float"), null !== a ? a.HALF_FLOAT_OES : null);
      if (s === nS) return 6406;
      if (s === aS) return 6408;
      if (s === rS) return 6409;
      if (s === oS) return 6410;
      if (s === lS) return 6402;
      if (s === cS) return 34041;
      if (s === vA) return a = t.get("EXT_sRGB"), null !== a ? a.SRGB_ALPHA_EXT : null;
      if (s === hS) return 6403;
      if (s === uS) return 36244;
      if (s === dS) return 33319;
      if (s === pS) return 33320;
      if (s === mS) return 36249;
      if (s === fS || s === gS || s === vS || s === bS) if (n === aA) {
        if (a = t.get("WEBGL_compressed_texture_s3tc_srgb"), null === a) return null;
        if (s === fS) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (s === gS) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (s === vS) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (s === bS) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else {
        if (a = t.get("WEBGL_compressed_texture_s3tc"), null === a) return null;
        if (s === fS) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (s === gS) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (s === vS) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (s === bS) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      if (s === yS || s === _S || s === xS || s === wS) {
        if (a = t.get("WEBGL_compressed_texture_pvrtc"), null === a) return null;
        if (s === yS) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (s === _S) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (s === xS) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (s === wS) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (s === SS) return a = t.get("WEBGL_compressed_texture_etc1"), null !== a ? a.COMPRESSED_RGB_ETC1_WEBGL : null;
      if (s === AS || s === MS) {
        if (a = t.get("WEBGL_compressed_texture_etc"), null === a) return null;
        if (s === AS) return n === aA ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (s === MS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
      }
      if (s === CS || s === PS || s === TS || s === ES || s === BS || s === IS || s === kS || s === DS || s === LS || s === OS || s === RS || s === zS || s === NS || s === FS) {
        if (a = t.get("WEBGL_compressed_texture_astc"), null === a) return null;
        if (s === CS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (s === PS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (s === TS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (s === ES) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (s === BS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (s === IS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (s === kS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (s === DS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (s === LS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (s === OS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (s === RS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (s === zS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (s === NS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (s === FS) return n === aA ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (s === US) {
        if (a = t.get("EXT_texture_compression_bptc"), null === a) return null;
        if (s === US) return n === aA ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      }
      if (s === HS || s === GS || s === VS || s === WS) {
        if (a = t.get("EXT_texture_compression_rgtc"), null === a) return null;
        if (s === US) return a.COMPRESSED_RED_RGTC1_EXT;
        if (s === GS) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (s === VS) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (s === WS) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return s === iS ? i ? 34042 : (a = t.get("WEBGL_depth_texture"), null !== a ? a.UNSIGNED_INT_24_8_WEBGL : null) : void 0 !== e[s] ? e[s] : null;
    }
  };
}
class XE extends uP {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class YE extends rC {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const JE = {
  type: "move"
};
class QE {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return null === this._hand && (this._hand = new YE(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
      pinching: !1
    }), this._hand;
  }
  getTargetRaySpace() {
    return null === this._targetRay && (this._targetRay = new YE(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new HA(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new HA()), this._targetRay;
  }
  getGripSpace() {
    return null === this._grip && (this._grip = new YE(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new HA(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new HA()), this._grip;
  }
  dispatchEvent(e) {
    return null !== this._targetRay && this._targetRay.dispatchEvent(e), null !== this._grip && this._grip.dispatchEvent(e), null !== this._hand && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const s of e.hand.values()) this._getHandJoint(t, s);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this;
  }
  update(e, t, s) {
    let i = null,
      n = null,
      a = null;
    const r = this._targetRay,
      o = this._grip,
      l = this._hand;
    if (e && "visible-blurred" !== t.session.visibilityState) {
      if (l && e.hand) {
        a = !0;
        for (const a of e.hand.values()) {
          const e = t.getJointPose(a, s),
            i = this._getHandJoint(l, a);
          null !== e && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.jointRadius = e.radius), i.visible = null !== e;
        }
        const i = l.joints["index-finger-tip"],
          n = l.joints["thumb-tip"],
          r = i.position.distanceTo(n.position),
          o = .02,
          c = .005;
        l.inputState.pinching && r > o + c ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && r <= o - c && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else null !== o && e.gripSpace && (n = t.getPose(e.gripSpace, s), null !== n && (o.matrix.fromArray(n.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), n.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(n.linearVelocity)) : o.hasLinearVelocity = !1, n.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(n.angularVelocity)) : o.hasAngularVelocity = !1));
      null !== r && (i = t.getPose(e.targetRaySpace, s), null === i && null !== n && (i = n), null !== i && (r.matrix.fromArray(i.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), i.linearVelocity ? (r.hasLinearVelocity = !0, r.linearVelocity.copy(i.linearVelocity)) : r.hasLinearVelocity = !1, i.angularVelocity ? (r.hasAngularVelocity = !0, r.angularVelocity.copy(i.angularVelocity)) : r.hasAngularVelocity = !1, this.dispatchEvent(JE)));
    }
    return null !== r && (r.visible = null !== i), null !== o && (o.visible = null !== n), null !== l && (l.visible = null !== a), this;
  }
  _getHandJoint(e, t) {
    if (void 0 === e.joints[t.jointName]) {
      const s = new YE();
      s.matrixAutoUpdate = !1, s.visible = !1, e.joints[t.jointName] = s, e.add(s);
    }
    return e.joints[t.jointName];
  }
}
class KE extends iM {
  constructor(e, t, s, i, n, a, r, o, l, c) {
    if ((c = void 0 !== c ? c : lS) !== lS && c !== cS) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    void 0 === s && c === lS && (s = Qw), void 0 === s && c === cS && (s = iS), super(null, i, n, a, r, o, c, s, l), this.isDepthTexture = !0, this.image = {
      width: e,
      height: t
    }, this.magFilter = void 0 !== r ? r : Hw, this.minFilter = void 0 !== o ? o : Hw, this.flipY = !1, this.generateMipmaps = !1;
  }
}
class eB extends bA {
  constructor(e, t) {
    super();
    const s = this;
    let i = null,
      n = 1,
      a = null,
      r = "local-floor",
      o = 1,
      l = null,
      c = null,
      h = null,
      u = null,
      d = null,
      p = null;
    const m = t.getContextAttributes();
    let f = null,
      g = null;
    const v = [],
      b = [],
      y = new Set(),
      _ = new Map(),
      x = new uP();
    x.layers.enable(1), x.viewport = new nM();
    const w = new uP();
    w.layers.enable(2), w.viewport = new nM();
    const S = [x, w],
      A = new XE();
    A.layers.enable(1), A.layers.enable(2);
    let M = null,
      C = null;
    function P(e) {
      const t = b.indexOf(e.inputSource);
      if (-1 === t) return;
      const s = v[t];
      void 0 !== s && s.dispatchEvent({
        type: e.type,
        data: e.inputSource
      });
    }
    function T() {
      i.removeEventListener("select", P), i.removeEventListener("selectstart", P), i.removeEventListener("selectend", P), i.removeEventListener("squeeze", P), i.removeEventListener("squeezestart", P), i.removeEventListener("squeezeend", P), i.removeEventListener("end", T), i.removeEventListener("inputsourceschange", E);
      for (let e = 0; e < v.length; e++) {
        const t = b[e];
        null !== t && (b[e] = null, v[e].disconnect(t));
      }
      M = null, C = null, e.setRenderTarget(f), d = null, u = null, h = null, i = null, g = null, L.stop(), s.isPresenting = !1, s.dispatchEvent({
        type: "sessionend"
      });
    }
    function E(e) {
      for (let t = 0; t < e.removed.length; t++) {
        const s = e.removed[t],
          i = b.indexOf(s);
        i >= 0 && (b[i] = null, v[i].disconnect(s));
      }
      for (let t = 0; t < e.added.length; t++) {
        const s = e.added[t];
        let i = b.indexOf(s);
        if (-1 === i) {
          for (let e = 0; e < v.length; e++) {
            if (e >= b.length) {
              b.push(s), i = e;
              break;
            }
            if (null === b[e]) {
              b[e] = s, i = e;
              break;
            }
          }
          if (-1 === i) break;
        }
        const n = v[i];
        n && n.connect(s);
      }
    }
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (e) {
      let t = v[e];
      return void 0 === t && (t = new QE(), v[e] = t), t.getTargetRaySpace();
    }, this.getControllerGrip = function (e) {
      let t = v[e];
      return void 0 === t && (t = new QE(), v[e] = t), t.getGripSpace();
    }, this.getHand = function (e) {
      let t = v[e];
      return void 0 === t && (t = new QE(), v[e] = t), t.getHandSpace();
    }, this.setFramebufferScaleFactor = function (e) {
      n = e, s.isPresenting;
    }, this.setReferenceSpaceType = function (e) {
      r = e, s.isPresenting;
    }, this.getReferenceSpace = function () {
      return l || a;
    }, this.setReferenceSpace = function (e) {
      l = e;
    }, this.getBaseLayer = function () {
      return null !== u ? u : d;
    }, this.getBinding = function () {
      return h;
    }, this.getFrame = function () {
      return p;
    }, this.getSession = function () {
      return i;
    }, this.setSession = async function (c) {
      if (i = c, null !== i) {
        if (f = e.getRenderTarget(), i.addEventListener("select", P), i.addEventListener("selectstart", P), i.addEventListener("selectend", P), i.addEventListener("squeeze", P), i.addEventListener("squeezestart", P), i.addEventListener("squeezeend", P), i.addEventListener("end", T), i.addEventListener("inputsourceschange", E), !0 !== m.xrCompatible && (await t.makeXRCompatible()), void 0 === i.renderState.layers || !1 === e.capabilities.isWebGL2) {
          const s = {
            antialias: void 0 !== i.renderState.layers || m.antialias,
            alpha: m.alpha,
            depth: m.depth,
            stencil: m.stencil,
            framebufferScaleFactor: n
          };
          d = new XRWebGLLayer(i, t, s), i.updateRenderState({
            baseLayer: d
          }), g = new aM(d.framebufferWidth, d.framebufferHeight, {
            format: aS,
            type: Zw,
            encoding: e.outputEncoding,
            stencilBuffer: m.stencil
          });
        } else {
          let s = null,
            a = null,
            r = null;
          m.depth && (r = m.stencil ? 35056 : 33190, s = m.stencil ? cS : lS, a = m.stencil ? iS : Qw);
          const o = {
            colorFormat: 32856,
            depthFormat: r,
            scaleFactor: n
          };
          h = new XRWebGLBinding(i, t), u = h.createProjectionLayer(o), i.updateRenderState({
            layers: [u]
          }), g = new aM(u.textureWidth, u.textureHeight, {
            format: aS,
            type: Zw,
            depthTexture: new KE(u.textureWidth, u.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, s),
            stencilBuffer: m.stencil,
            encoding: e.outputEncoding,
            samples: m.antialias ? 4 : 0
          });
          e.properties.get(g).__ignoreDepthValues = u.ignoreDepthValues;
        }
        g.isXRRenderTarget = !0, this.setFoveation(o), l = null, a = await i.requestReferenceSpace(r), L.setContext(i), L.start(), s.isPresenting = !0, s.dispatchEvent({
          type: "sessionstart"
        });
      }
    };
    const B = new HA(),
      I = new HA();
    function k(e, t) {
      null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
    }
    this.updateCamera = function (e) {
      if (null === i) return;
      A.near = w.near = x.near = e.near, A.far = w.far = x.far = e.far, M === A.near && C === A.far || (i.updateRenderState({
        depthNear: A.near,
        depthFar: A.far
      }), M = A.near, C = A.far);
      const t = e.parent,
        s = A.cameras;
      k(A, t);
      for (let i = 0; i < s.length; i++) k(s[i], t);
      A.matrixWorld.decompose(A.position, A.quaternion, A.scale), e.matrix.copy(A.matrix), e.matrix.decompose(e.position, e.quaternion, e.scale);
      const n = e.children;
      for (let i = 0, a = n.length; i < a; i++) n[i].updateMatrixWorld(!0);
      2 === s.length ? function (e, t, s) {
        B.setFromMatrixPosition(t.matrixWorld), I.setFromMatrixPosition(s.matrixWorld);
        const i = B.distanceTo(I),
          n = t.projectionMatrix.elements,
          a = s.projectionMatrix.elements,
          r = n[14] / (n[10] - 1),
          o = n[14] / (n[10] + 1),
          l = (n[9] + 1) / n[5],
          c = (n[9] - 1) / n[5],
          h = (n[8] - 1) / n[0],
          u = (a[8] + 1) / a[0],
          d = r * h,
          p = r * u,
          m = i / (-h + u),
          f = m * -h;
        t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(f), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert();
        const g = r + m,
          v = o + m,
          b = d - f,
          y = p + (i - f),
          _ = l * o / v * g,
          x = c * o / v * g;
        e.projectionMatrix.makePerspective(b, y, _, x, g, v);
      }(A, x, w) : A.projectionMatrix.copy(x.projectionMatrix);
    }, this.getCamera = function () {
      return A;
    }, this.getFoveation = function () {
      if (null !== u || null !== d) return o;
    }, this.setFoveation = function (e) {
      o = e, null !== u && (u.fixedFoveation = e), null !== d && void 0 !== d.fixedFoveation && (d.fixedFoveation = e);
    }, this.getPlanes = function () {
      return y;
    };
    let D = null;
    const L = new SP();
    L.setAnimationLoop(function (t, i) {
      if (c = i.getViewerPose(l || a), p = i, null !== c) {
        const t = c.views;
        null !== d && (e.setRenderTargetFramebuffer(g, d.framebuffer), e.setRenderTarget(g));
        let s = !1;
        t.length !== A.cameras.length && (A.cameras.length = 0, s = !0);
        for (let i = 0; i < t.length; i++) {
          const n = t[i];
          let a = null;
          if (null !== d) a = d.getViewport(n);else {
            const t = h.getViewSubImage(u, n);
            a = t.viewport, 0 === i && (e.setRenderTargetTextures(g, t.colorTexture, u.ignoreDepthValues ? void 0 : t.depthStencilTexture), e.setRenderTarget(g));
          }
          let r = S[i];
          void 0 === r && (r = new uP(), r.layers.enable(i), r.viewport = new nM(), S[i] = r), r.matrix.fromArray(n.transform.matrix), r.projectionMatrix.fromArray(n.projectionMatrix), r.viewport.set(a.x, a.y, a.width, a.height), 0 === i && A.matrix.copy(r.matrix), !0 === s && A.cameras.push(r);
        }
      }
      for (let e = 0; e < v.length; e++) {
        const t = b[e],
          s = v[e];
        null !== t && void 0 !== s && s.update(t, i, l || a);
      }
      if (D && D(t, i), i.detectedPlanes) {
        s.dispatchEvent({
          type: "planesdetected",
          data: i.detectedPlanes
        });
        let e = null;
        for (const t of y) i.detectedPlanes.has(t) || (null === e && (e = []), e.push(t));
        if (null !== e) for (const t of e) y.delete(t), _.delete(t), s.dispatchEvent({
          type: "planeremoved",
          data: t
        });
        for (const t of i.detectedPlanes) if (y.has(t)) {
          const e = _.get(t);
          t.lastChangedTime > e && (_.set(t, t.lastChangedTime), s.dispatchEvent({
            type: "planechanged",
            data: t
          }));
        } else y.add(t), _.set(t, i.lastChangedTime), s.dispatchEvent({
          type: "planeadded",
          data: t
        });
      }
      p = null;
    }), this.setAnimationLoop = function (e) {
      D = e;
    }, this.dispose = function () {};
  }
}
function tB(e, t) {
  function s(s, i) {
    s.opacity.value = i.opacity, i.color && s.diffuse.value.copy(i.color), i.emissive && s.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity), i.map && (s.map.value = i.map), i.alphaMap && (s.alphaMap.value = i.alphaMap), i.bumpMap && (s.bumpMap.value = i.bumpMap, s.bumpScale.value = i.bumpScale, i.side === qx && (s.bumpScale.value *= -1)), i.displacementMap && (s.displacementMap.value = i.displacementMap, s.displacementScale.value = i.displacementScale, s.displacementBias.value = i.displacementBias), i.emissiveMap && (s.emissiveMap.value = i.emissiveMap), i.normalMap && (s.normalMap.value = i.normalMap, s.normalScale.value.copy(i.normalScale), i.side === qx && s.normalScale.value.negate()), i.specularMap && (s.specularMap.value = i.specularMap), i.alphaTest > 0 && (s.alphaTest.value = i.alphaTest);
    const n = t.get(i).envMap;
    if (n && (s.envMap.value = n, s.flipEnvMap.value = n.isCubeTexture && !1 === n.isRenderTargetTexture ? -1 : 1, s.reflectivity.value = i.reflectivity, s.ior.value = i.ior, s.refractionRatio.value = i.refractionRatio), i.lightMap) {
      s.lightMap.value = i.lightMap;
      const t = !0 === e.useLegacyLights ? Math.PI : 1;
      s.lightMapIntensity.value = i.lightMapIntensity * t;
    }
    let a, r;
    i.aoMap && (s.aoMap.value = i.aoMap, s.aoMapIntensity.value = i.aoMapIntensity), i.map ? a = i.map : i.specularMap ? a = i.specularMap : i.displacementMap ? a = i.displacementMap : i.normalMap ? a = i.normalMap : i.bumpMap ? a = i.bumpMap : i.roughnessMap ? a = i.roughnessMap : i.metalnessMap ? a = i.metalnessMap : i.alphaMap ? a = i.alphaMap : i.emissiveMap ? a = i.emissiveMap : i.clearcoatMap ? a = i.clearcoatMap : i.clearcoatNormalMap ? a = i.clearcoatNormalMap : i.clearcoatRoughnessMap ? a = i.clearcoatRoughnessMap : i.iridescenceMap ? a = i.iridescenceMap : i.iridescenceThicknessMap ? a = i.iridescenceThicknessMap : i.specularIntensityMap ? a = i.specularIntensityMap : i.specularColorMap ? a = i.specularColorMap : i.transmissionMap ? a = i.transmissionMap : i.thicknessMap ? a = i.thicknessMap : i.sheenColorMap ? a = i.sheenColorMap : i.sheenRoughnessMap && (a = i.sheenRoughnessMap), void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), s.uvTransform.value.copy(a.matrix)), i.aoMap ? r = i.aoMap : i.lightMap && (r = i.lightMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), s.uv2Transform.value.copy(r.matrix));
  }
  return {
    refreshFogUniforms: function (t, s) {
      s.color.getRGB(t.fogColor.value, oP(e)), s.isFog ? (t.fogNear.value = s.near, t.fogFar.value = s.far) : s.isFogExp2 && (t.fogDensity.value = s.density);
    },
    refreshMaterialUniforms: function (e, i, n, a, r) {
      i.isMeshBasicMaterial || i.isMeshLambertMaterial ? s(e, i) : i.isMeshToonMaterial ? (s(e, i), function (e, t) {
        t.gradientMap && (e.gradientMap.value = t.gradientMap);
      }(e, i)) : i.isMeshPhongMaterial ? (s(e, i), function (e, t) {
        e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
      }(e, i)) : i.isMeshStandardMaterial ? (s(e, i), function (e, s) {
        e.roughness.value = s.roughness, e.metalness.value = s.metalness, s.roughnessMap && (e.roughnessMap.value = s.roughnessMap);
        s.metalnessMap && (e.metalnessMap.value = s.metalnessMap);
        const i = t.get(s).envMap;
        i && (e.envMapIntensity.value = s.envMapIntensity);
      }(e, i), i.isMeshPhysicalMaterial && function (e, t, s) {
        e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap));
        t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap), t.clearcoatNormalMap && (e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), e.clearcoatNormalMap.value = t.clearcoatNormalMap, t.side === qx && e.clearcoatNormalScale.value.negate()));
        t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap));
        t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = s.texture, e.transmissionSamplerSize.value.set(s.width, s.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor));
        e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap);
        t.specularColorMap && (e.specularColorMap.value = t.specularColorMap);
      }(e, i, r)) : i.isMeshMatcapMaterial ? (s(e, i), function (e, t) {
        t.matcap && (e.matcap.value = t.matcap);
      }(e, i)) : i.isMeshDepthMaterial ? s(e, i) : i.isMeshDistanceMaterial ? (s(e, i), function (e, t) {
        e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance;
      }(e, i)) : i.isMeshNormalMaterial ? s(e, i) : i.isLineBasicMaterial ? (function (e, t) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity;
      }(e, i), i.isLineDashedMaterial && function (e, t) {
        e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
      }(e, i)) : i.isPointsMaterial ? function (e, t, s, i) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * s, e.scale.value = .5 * i, t.map && (e.map.value = t.map);
        t.alphaMap && (e.alphaMap.value = t.alphaMap);
        t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
        let n;
        t.map ? n = t.map : t.alphaMap && (n = t.alphaMap);
        void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix));
      }(e, i, n, a) : i.isSpriteMaterial ? function (e, t) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map);
        t.alphaMap && (e.alphaMap.value = t.alphaMap);
        t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
        let s;
        t.map ? s = t.map : t.alphaMap && (s = t.alphaMap);
        void 0 !== s && (!0 === s.matrixAutoUpdate && s.updateMatrix(), e.uvTransform.value.copy(s.matrix));
      }(e, i) : i.isShadowMaterial ? (e.color.value.copy(i.color), e.opacity.value = i.opacity) : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
    }
  };
}
function sB(e, t, s, i) {
  let n = {},
    a = {},
    r = [];
  const o = s.isWebGL2 ? e.getParameter(35375) : 0;
  function l(e, t, s) {
    const i = e.value;
    if (void 0 === s[t]) {
      if ("number" == typeof i) s[t] = i;else {
        const e = Array.isArray(i) ? i : [i],
          n = [];
        for (let t = 0; t < e.length; t++) n.push(e[t].clone());
        s[t] = n;
      }
      return !0;
    }
    if ("number" == typeof i) {
      if (s[t] !== i) return s[t] = i, !0;
    } else {
      const e = Array.isArray(s[t]) ? s[t] : [s[t]],
        n = Array.isArray(i) ? i : [i];
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        if (!1 === s.equals(n[t])) return s.copy(n[t]), !0;
      }
    }
    return !1;
  }
  function c(e) {
    const t = {
      boundary: 0,
      storage: 0
    };
    return "number" == typeof e ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture, t;
  }
  function h(t) {
    const s = t.target;
    s.removeEventListener("dispose", h);
    const i = r.indexOf(s.__bindingPointIndex);
    r.splice(i, 1), e.deleteBuffer(n[s.id]), delete n[s.id], delete a[s.id];
  }
  return {
    bind: function (e, t) {
      const s = t.program;
      i.uniformBlockBinding(e, s);
    },
    update: function (s, u) {
      let d = n[s.id];
      void 0 === d && (!function (e) {
        const t = e.uniforms;
        let s = 0;
        const i = 16;
        let n = 0;
        for (let a = 0, r = t.length; a < r; a++) {
          const e = t[a],
            r = {
              boundary: 0,
              storage: 0
            },
            o = Array.isArray(e.value) ? e.value : [e.value];
          for (let t = 0, s = o.length; t < s; t++) {
            const e = c(o[t]);
            r.boundary += e.boundary, r.storage += e.storage;
          }
          if (e.__data = new Float32Array(r.storage / Float32Array.BYTES_PER_ELEMENT), e.__offset = s, a > 0) {
            n = s % i;
            0 !== n && i - n - r.boundary < 0 && (s += i - n, e.__offset = s);
          }
          s += r.storage;
        }
        n = s % i, n > 0 && (s += i - n);
        e.__size = s, e.__cache = {};
      }(s), d = function (t) {
        const s = function () {
          for (let e = 0; e < o; e++) if (-1 === r.indexOf(e)) return r.push(e), e;
          return 0;
        }();
        t.__bindingPointIndex = s;
        const i = e.createBuffer(),
          n = t.__size,
          a = t.usage;
        return e.bindBuffer(35345, i), e.bufferData(35345, n, a), e.bindBuffer(35345, null), e.bindBufferBase(35345, s, i), i;
      }(s), n[s.id] = d, s.addEventListener("dispose", h));
      const p = u.program;
      i.updateUBOMapping(s, p);
      const m = t.render.frame;
      a[s.id] !== m && (!function (t) {
        const s = n[t.id],
          i = t.uniforms,
          a = t.__cache;
        e.bindBuffer(35345, s);
        for (let n = 0, r = i.length; n < r; n++) {
          const t = i[n];
          if (!0 === l(t, n, a)) {
            const s = t.__offset,
              i = Array.isArray(t.value) ? t.value : [t.value];
            let n = 0;
            for (let a = 0; a < i.length; a++) {
              const r = i[a],
                o = c(r);
              "number" == typeof r ? (t.__data[0] = r, e.bufferSubData(35345, s + n, t.__data)) : r.isMatrix3 ? (t.__data[0] = r.elements[0], t.__data[1] = r.elements[1], t.__data[2] = r.elements[2], t.__data[3] = r.elements[0], t.__data[4] = r.elements[3], t.__data[5] = r.elements[4], t.__data[6] = r.elements[5], t.__data[7] = r.elements[0], t.__data[8] = r.elements[6], t.__data[9] = r.elements[7], t.__data[10] = r.elements[8], t.__data[11] = r.elements[0]) : (r.toArray(t.__data, n), n += o.storage / Float32Array.BYTES_PER_ELEMENT);
            }
            e.bufferSubData(35345, s, t.__data);
          }
        }
        e.bindBuffer(35345, null);
      }(s), a[s.id] = m);
    },
    dispose: function () {
      for (const t in n) e.deleteBuffer(n[t]);
      r = [], n = {}, a = {};
    }
  };
}
function iB(e = {}) {
  this.isWebGLRenderer = !0;
  const t = void 0 !== e.canvas ? e.canvas : function () {
      const e = FA("canvas");
      return e.style.display = "block", e;
    }(),
    s = void 0 !== e.context ? e.context : null,
    i = void 0 === e.depth || e.depth,
    n = void 0 === e.stencil || e.stencil,
    a = void 0 !== e.antialias && e.antialias,
    r = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
    o = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
    l = void 0 !== e.powerPreference ? e.powerPreference : "default",
    c = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat;
  let h;
  h = null !== s ? s.getContextAttributes().alpha : void 0 !== e.alpha && e.alpha;
  let u = null,
    d = null;
  const p = [],
    m = [];
  this.domElement = t, this.debug = {
    checkShaderErrors: !0
  }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.outputEncoding = nA, this.useLegacyLights = !0, this.toneMapping = Pw, this.toneMappingExposure = 1;
  const f = this;
  let g = !1,
    v = 0,
    b = 0,
    y = null,
    _ = -1,
    x = null;
  const w = new nM(),
    S = new nM();
  let A = null,
    M = t.width,
    C = t.height,
    P = 1,
    T = null,
    E = null;
  const B = new nM(0, 0, M, C),
    I = new nM(0, 0, M, C);
  let k = !1;
  const D = new wP();
  let L = !1,
    O = !1,
    R = null;
  const z = new OM(),
    N = new HA(),
    F = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
  function U() {
    return null === y ? P : 1;
  }
  let H,
    G,
    V,
    W,
    j,
    q,
    Z,
    $,
    X,
    Y,
    J,
    Q,
    K,
    ee,
    te,
    se,
    ie,
    ne,
    ae,
    re,
    oe,
    le,
    ce,
    he,
    ue = s;
  function de(e, s) {
    for (let i = 0; i < e.length; i++) {
      const n = e[i],
        a = t.getContext(n, s);
      if (null !== a) return a;
    }
    return null;
  }
  try {
    const e = {
      alpha: !0,
      depth: i,
      stencil: n,
      antialias: a,
      premultipliedAlpha: r,
      preserveDrawingBuffer: o,
      powerPreference: l,
      failIfMajorPerformanceCaveat: c
    };
    if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r150"), t.addEventListener("webglcontextlost", fe, !1), t.addEventListener("webglcontextrestored", ge, !1), t.addEventListener("webglcontextcreationerror", ve, !1), null === ue) {
      const t = ["webgl2", "webgl", "experimental-webgl"];
      if (!0 === f.isWebGL1Renderer && t.shift(), ue = de(t, e), null === ue) throw de(t) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
    }
    void 0 === ue.getShaderPrecisionFormat && (ue.getShaderPrecisionFormat = function () {
      return {
        rangeMin: 1,
        rangeMax: 1,
        precision: 1
      };
    });
  } catch (Ee) {
    throw Ee;
  }
  function pe() {
    H = new QP(ue), G = new DP(ue, H, e), H.init(G), le = new $E(ue, H, G), V = new qE(ue, H, G), W = new tT(), j = new BE(), q = new ZE(ue, H, V, j, G, le, W), Z = new OP(f), $ = new JP(f), X = new AP(ue, G), ce = new IP(ue, H, X, G), Y = new KP(ue, X, W, ce), J = new aT(ue, Y, X, W), ae = new nT(ue, G, q), se = new LP(j), Q = new EE(f, Z, $, H, G, ce, se), K = new tB(f, j), ee = new LE(), te = new UE(H, G), ne = new BP(f, Z, $, V, J, h, r), ie = new jE(f, J, G), he = new sB(ue, W, G, V), re = new kP(ue, H, W, G), oe = new eT(ue, H, W, G), W.programs = Q.programs, f.capabilities = G, f.extensions = H, f.properties = j, f.renderLists = ee, f.shadowMap = ie, f.state = V, f.info = W;
  }
  pe();
  const me = new eB(f, ue);
  function fe(e) {
    e.preventDefault(), g = !0;
  }
  function ge() {
    g = !1;
    const e = W.autoReset,
      t = ie.enabled,
      s = ie.autoUpdate,
      i = ie.needsUpdate,
      n = ie.type;
    pe(), W.autoReset = e, ie.enabled = t, ie.autoUpdate = s, ie.needsUpdate = i, ie.type = n;
  }
  function ve(e) {}
  function be(e) {
    const t = e.target;
    t.removeEventListener("dispose", be), function (e) {
      (function (e) {
        const t = j.get(e).programs;
        void 0 !== t && (t.forEach(function (e) {
          Q.releaseProgram(e);
        }), e.isShaderMaterial && Q.releaseShaderCache(e));
      })(e), j.remove(e);
    }(t);
  }
  this.xr = me, this.getContext = function () {
    return ue;
  }, this.getContextAttributes = function () {
    return ue.getContextAttributes();
  }, this.forceContextLoss = function () {
    const e = H.get("WEBGL_lose_context");
    e && e.loseContext();
  }, this.forceContextRestore = function () {
    const e = H.get("WEBGL_lose_context");
    e && e.restoreContext();
  }, this.getPixelRatio = function () {
    return P;
  }, this.setPixelRatio = function (e) {
    void 0 !== e && (P = e, this.setSize(M, C, !1));
  }, this.getSize = function (e) {
    return e.set(M, C);
  }, this.setSize = function (e, s, i = !0) {
    me.isPresenting || (M = e, C = s, t.width = Math.floor(e * P), t.height = Math.floor(s * P), !0 === i && (t.style.width = e + "px", t.style.height = s + "px"), this.setViewport(0, 0, e, s));
  }, this.getDrawingBufferSize = function (e) {
    return e.set(M * P, C * P).floor();
  }, this.setDrawingBufferSize = function (e, s, i) {
    M = e, C = s, P = i, t.width = Math.floor(e * i), t.height = Math.floor(s * i), this.setViewport(0, 0, e, s);
  }, this.getCurrentViewport = function (e) {
    return e.copy(w);
  }, this.getViewport = function (e) {
    return e.copy(B);
  }, this.setViewport = function (e, t, s, i) {
    e.isVector4 ? B.set(e.x, e.y, e.z, e.w) : B.set(e, t, s, i), V.viewport(w.copy(B).multiplyScalar(P).floor());
  }, this.getScissor = function (e) {
    return e.copy(I);
  }, this.setScissor = function (e, t, s, i) {
    e.isVector4 ? I.set(e.x, e.y, e.z, e.w) : I.set(e, t, s, i), V.scissor(S.copy(I).multiplyScalar(P).floor());
  }, this.getScissorTest = function () {
    return k;
  }, this.setScissorTest = function (e) {
    V.setScissorTest(k = e);
  }, this.setOpaqueSort = function (e) {
    T = e;
  }, this.setTransparentSort = function (e) {
    E = e;
  }, this.getClearColor = function (e) {
    return e.copy(ne.getClearColor());
  }, this.setClearColor = function () {
    ne.setClearColor.apply(ne, arguments);
  }, this.getClearAlpha = function () {
    return ne.getClearAlpha();
  }, this.setClearAlpha = function () {
    ne.setClearAlpha.apply(ne, arguments);
  }, this.clear = function (e = !0, t = !0, s = !0) {
    let i = 0;
    e && (i |= 16384), t && (i |= 256), s && (i |= 1024), ue.clear(i);
  }, this.clearColor = function () {
    this.clear(!0, !1, !1);
  }, this.clearDepth = function () {
    this.clear(!1, !0, !1);
  }, this.clearStencil = function () {
    this.clear(!1, !1, !0);
  }, this.dispose = function () {
    t.removeEventListener("webglcontextlost", fe, !1), t.removeEventListener("webglcontextrestored", ge, !1), t.removeEventListener("webglcontextcreationerror", ve, !1), ee.dispose(), te.dispose(), j.dispose(), Z.dispose(), $.dispose(), J.dispose(), ce.dispose(), he.dispose(), Q.dispose(), me.dispose(), me.removeEventListener("sessionstart", _e), me.removeEventListener("sessionend", xe), R && (R.dispose(), R = null), we.stop();
  }, this.renderBufferDirect = function (e, t, s, i, n, a) {
    null === t && (t = F);
    const r = n.isMesh && n.matrixWorld.determinant() < 0,
      o = function (e, t, s, i, n) {
        !0 !== t.isScene && (t = F);
        q.resetTextureUnits();
        const a = t.fog,
          r = i.isMeshStandardMaterial ? t.environment : null,
          o = null === y ? f.outputEncoding : !0 === y.isXRRenderTarget ? y.texture.encoding : nA,
          l = (i.isMeshStandardMaterial ? $ : Z).get(i.envMap || r),
          c = !0 === i.vertexColors && !!s.attributes.color && 4 === s.attributes.color.itemSize,
          h = !!i.normalMap && !!s.attributes.tangent,
          u = !!s.morphAttributes.position,
          p = !!s.morphAttributes.normal,
          m = !!s.morphAttributes.color,
          g = i.toneMapped ? f.toneMapping : Pw,
          v = s.morphAttributes.position || s.morphAttributes.normal || s.morphAttributes.color,
          b = void 0 !== v ? v.length : 0,
          w = j.get(i),
          S = d.state.lights;
        if (!0 === L && (!0 === O || e !== x)) {
          const t = e === x && i.id === _;
          se.setState(i, e, t);
        }
        let A = !1;
        i.version === w.__version ? w.needsLights && w.lightsStateVersion !== S.state.version || w.outputEncoding !== o || n.isInstancedMesh && !1 === w.instancing ? A = !0 : n.isInstancedMesh || !0 !== w.instancing ? n.isSkinnedMesh && !1 === w.skinning ? A = !0 : n.isSkinnedMesh || !0 !== w.skinning ? w.envMap !== l || !0 === i.fog && w.fog !== a ? A = !0 : void 0 === w.numClippingPlanes || w.numClippingPlanes === se.numPlanes && w.numIntersection === se.numIntersection ? (w.vertexAlphas !== c || w.vertexTangents !== h || w.morphTargets !== u || w.morphNormals !== p || w.morphColors !== m || w.toneMapping !== g || !0 === G.isWebGL2 && w.morphTargetsCount !== b) && (A = !0) : A = !0 : A = !0 : A = !0 : (A = !0, w.__version = i.version);
        let M = w.currentProgram;
        !0 === A && (M = Pe(i, t, n));
        let T = !1,
          E = !1,
          B = !1;
        const I = M.getUniforms(),
          k = w.uniforms;
        V.useProgram(M.program) && (T = !0, E = !0, B = !0);
        i.id !== _ && (_ = i.id, E = !0);
        if (T || x !== e) {
          if (I.setValue(ue, "projectionMatrix", e.projectionMatrix), G.logarithmicDepthBuffer && I.setValue(ue, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), x !== e && (x = e, E = !0, B = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshStandardMaterial || i.envMap) {
            const t = I.map.cameraPosition;
            void 0 !== t && t.setValue(ue, N.setFromMatrixPosition(e.matrixWorld));
          }
          (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial) && I.setValue(ue, "isOrthographic", !0 === e.isOrthographicCamera), (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.isShadowMaterial || n.isSkinnedMesh) && I.setValue(ue, "viewMatrix", e.matrixWorldInverse);
        }
        if (n.isSkinnedMesh) {
          I.setOptional(ue, n, "bindMatrix"), I.setOptional(ue, n, "bindMatrixInverse");
          const e = n.skeleton;
          e && G.floatVertexTextures && (null === e.boneTexture && e.computeBoneTexture(), I.setValue(ue, "boneTexture", e.boneTexture, q), I.setValue(ue, "boneTextureSize", e.boneTextureSize));
        }
        const D = s.morphAttributes;
        (void 0 !== D.position || void 0 !== D.normal || void 0 !== D.color && !0 === G.isWebGL2) && ae.update(n, s, M);
        (E || w.receiveShadow !== n.receiveShadow) && (w.receiveShadow = n.receiveShadow, I.setValue(ue, "receiveShadow", n.receiveShadow));
        i.isMeshGouraudMaterial && null !== i.envMap && (k.envMap.value = l, k.flipEnvMap.value = l.isCubeTexture && !1 === l.isRenderTargetTexture ? -1 : 1);
        E && (I.setValue(ue, "toneMappingExposure", f.toneMappingExposure), w.needsLights && (U = B, (z = k).ambientLightColor.needsUpdate = U, z.lightProbe.needsUpdate = U, z.directionalLights.needsUpdate = U, z.directionalLightShadows.needsUpdate = U, z.pointLights.needsUpdate = U, z.pointLightShadows.needsUpdate = U, z.spotLights.needsUpdate = U, z.spotLightShadows.needsUpdate = U, z.rectAreaLights.needsUpdate = U, z.hemisphereLights.needsUpdate = U), a && !0 === i.fog && K.refreshFogUniforms(k, a), K.refreshMaterialUniforms(k, i, P, C, R), cE.upload(ue, w.uniformsList, k, q));
        var z, U;
        i.isShaderMaterial && !0 === i.uniformsNeedUpdate && (cE.upload(ue, w.uniformsList, k, q), i.uniformsNeedUpdate = !1);
        i.isSpriteMaterial && I.setValue(ue, "center", n.center);
        i.isCharacterMaterial && (n.opacity !== i.uniforms.opacity.value && (i.uniforms.opacity.value = n.opacity, I.setValue(ue, "opacity", n.opacity)), i.uniforms.faceData.value = n.faceData, I.setValue(ue, "faceData", n.faceData), n.colorId !== i.uniforms.colorId.value && (i.uniforms.colorId.value = n.colorId, I.setValue(ue, "colorId", n.colorId)), n.faceColor !== i.uniforms.faceColor.value && (i.uniforms.faceColor.value = n.faceColor, I.setValue(ue, "faceColor", n.faceColor)));
        if (I.setValue(ue, "modelViewMatrix", n.modelViewMatrix), I.setValue(ue, "normalMatrix", n.normalMatrix), I.setValue(ue, "modelMatrix", n.matrixWorld), i.isShaderMaterial || i.isRawShaderMaterial) {
          const e = i.uniformsGroups;
          for (let t = 0, s = e.length; t < s; t++) if (G.isWebGL2) {
            const s = e[t];
            he.update(s, M), he.bind(s, M);
          }
        }
        return M;
      }(e, t, s, i, n);
    V.setMaterial(i, r);
    let l = s.index,
      c = 1;
    !0 === i.wireframe && (l = Y.getWireframeAttribute(s), c = 2);
    const h = s.drawRange,
      u = s.attributes.position;
    let p = h.start * c,
      m = (h.start + h.count) * c;
    null !== a && (p = Math.max(p, a.start * c), m = Math.min(m, (a.start + a.count) * c)), null !== l ? (p = Math.max(p, 0), m = Math.min(m, l.count)) : null != u && (p = Math.max(p, 0), m = Math.min(m, u.count));
    const g = m - p;
    if (g < 0 || Infinity === g) return;
    let v;
    ce.setup(n, i, o, s, l);
    let b = re;
    if (null !== l && (v = X.get(l), b = oe, b.setIndex(v)), n.isMesh) !0 === i.wireframe ? (V.setLineWidth(i.wireframeLinewidth * U()), b.setMode(1)) : b.setMode(4);else if (n.isLine) {
      let e = i.linewidth;
      void 0 === e && (e = 1), V.setLineWidth(e * U()), n.isLineSegments ? b.setMode(1) : n.isLineLoop ? b.setMode(2) : b.setMode(3);
    } else n.isPoints ? b.setMode(0) : n.isSprite && b.setMode(4);
    if (n.isInstancedMesh) b.renderInstances(p, g, n.count);else if (s.isInstancedBufferGeometry) {
      const e = void 0 !== s._maxInstanceCount ? s._maxInstanceCount : Infinity,
        t = Math.min(s.instanceCount, e);
      b.renderInstances(p, g, t);
    } else b.render(p, g);
  }, this.compile = function (e, t) {
    function s(e, t, s) {
      !0 === e.transparent && e.side === Zx && !1 === e.forceSinglePass ? (e.side = qx, e.needsUpdate = !0, Pe(e, t, s), e.side = jx, e.needsUpdate = !0, Pe(e, t, s), e.side = Zx) : Pe(e, t, s);
    }
    d = te.get(e), d.init(), m.push(d), e.traverseVisible(function (e) {
      e.isLight && e.layers.test(t.layers) && (d.pushLight(e), e.castShadow && d.pushShadow(e));
    }), d.setupLights(f.useLegacyLights), e.traverse(function (t) {
      const i = t.material;
      if (i) if (Array.isArray(i)) for (let n = 0; n < i.length; n++) {
        s(i[n], e, t);
      } else s(i, e, t);
    }), m.pop(), d = null;
  };
  let ye = null;
  function _e() {
    we.stop();
  }
  function xe() {
    we.start();
  }
  const we = new SP();
  function Se(e, t, s, i) {
    if (!1 === e.visible) return;
    if (e.layers.test(t.layers)) if (e.isGroup) s = e.renderOrder;else if (e.isLOD) !0 === e.autoUpdate && e.update(t);else if (e.isLight) d.pushLight(e), e.castShadow && d.pushShadow(e);else if (e.isSprite) {
      if (!e.frustumCulled || D.intersectsSprite(e)) {
        i && N.setFromMatrixPosition(e.matrixWorld).applyMatrix4(z);
        const t = J.update(e),
          n = e.material;
        n.visible && u.push(e, t, n, s, N.z, null);
      }
    } else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.frame !== W.render.frame && (e.skeleton.update(), e.skeleton.frame = W.render.frame), !e.frustumCulled || D.intersectsObject(e))) {
      i && N.setFromMatrixPosition(e.matrixWorld).applyMatrix4(z);
      const t = J.update(e),
        n = e.material;
      if (Array.isArray(n)) {
        const i = t.groups;
        for (let a = 0, r = i.length; a < r; a++) {
          const r = i[a],
            o = n[r.materialIndex];
          o && o.visible && u.push(e, t, o, s, N.z, r);
        }
      } else n.visible && u.push(e, t, n, s, N.z, null);
    }
    const n = e.children;
    for (let a = 0, r = n.length; a < r; a++) Se(n[a], t, s, i);
  }
  function Ae(e, t, s, i) {
    const n = e.opaque,
      r = e.transmissive,
      o = e.transparent;
    d.setupLightsView(s), !0 === L && se.setGlobalState(f.clippingPlanes, s), r.length > 0 && function (e, t, s) {
      const i = G.isWebGL2;
      null === R && (R = new aM(1024, 1024, {
        generateMipmaps: !0,
        type: H.has("EXT_color_buffer_half_float") ? eS : Zw,
        minFilter: qw,
        samples: i && !0 === a ? 4 : 0
      }));
      const n = f.getRenderTarget();
      f.setRenderTarget(R), f.clear();
      const r = f.toneMapping;
      f.toneMapping = Pw, Me(e, t, s), f.toneMapping = r, q.updateMultisampleRenderTarget(R), q.updateRenderTargetMipmap(R), f.setRenderTarget(n);
    }(n, t, s), i && V.viewport(w.copy(i)), n.length > 0 && Me(n, t, s), r.length > 0 && Me(r, t, s), o.length > 0 && Me(o, t, s), V.buffers.depth.setTest(!0), V.buffers.depth.setMask(!0), V.buffers.color.setMask(!0), V.setPolygonOffset(!1);
  }
  function Me(e, t, s) {
    const i = !0 === t.isScene ? t.overrideMaterial : null;
    for (let n = 0, a = e.length; n < a; n++) {
      const a = e[n],
        r = a.object,
        o = a.geometry,
        l = null === i ? a.material : i,
        c = a.group;
      r.layers.test(s.layers) && Ce(r, t, s, o, l, c);
    }
  }
  function Ce(e, t, s, i, n, a) {
    e.onBeforeRender(f, t, s, i, n, a), e.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), n.onBeforeRender(f, t, s, i, e, a), !0 === n.transparent && n.side === Zx && !1 === n.forceSinglePass ? (n.side = qx, n.needsUpdate = !0, f.renderBufferDirect(s, t, i, n, e, a), n.side = jx, n.needsUpdate = !0, f.renderBufferDirect(s, t, i, n, e, a), n.side = Zx) : f.renderBufferDirect(s, t, i, n, e, a), e.onAfterRender(f, t, s, i, n, a);
  }
  function Pe(e, t, s) {
    !0 !== t.isScene && (t = F);
    const i = j.get(e),
      n = d.state.lights,
      a = d.state.shadowsArray,
      r = n.state.version,
      o = Q.getParameters(e, n.state, a, t, s),
      l = Q.getProgramCacheKey(o);
    let c = i.programs;
    i.environment = e.isMeshStandardMaterial ? t.environment : null, i.fog = t.fog, i.envMap = (e.isMeshStandardMaterial ? $ : Z).get(e.envMap || i.environment), void 0 === c && (e.addEventListener("dispose", be), c = new Map(), i.programs = c);
    let h = c.get(l);
    if (void 0 !== h) {
      if (i.currentProgram === h && i.lightsStateVersion === r) return Te(e, o), h;
    } else o.uniforms = Q.getUniforms(e), e.onBuild(s, o, f), e.onBeforeCompile(o, f), h = Q.acquireProgram(o, l), c.set(l, h), i.uniforms = o.uniforms;
    const u = i.uniforms;
    (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (u.clippingPlanes = se.uniform), Te(e, o), i.needsLights = function (e) {
      return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights;
    }(e), i.lightsStateVersion = r, i.needsLights && (u.ambientLightColor.value = n.state.ambient, u.lightProbe.value = n.state.probe, u.directionalLights.value = n.state.directional, u.directionalLightShadows.value = n.state.directionalShadow, u.spotLights.value = n.state.spot, u.spotLightShadows.value = n.state.spotShadow, u.rectAreaLights.value = n.state.rectArea, u.ltc_1.value = n.state.rectAreaLTC1, u.ltc_2.value = n.state.rectAreaLTC2, u.pointLights.value = n.state.point, u.pointLightShadows.value = n.state.pointShadow, u.hemisphereLights.value = n.state.hemi, u.directionalShadowMap.value = n.state.directionalShadowMap, u.directionalShadowMatrix.value = n.state.directionalShadowMatrix, u.spotShadowMap.value = n.state.spotShadowMap, u.spotLightMatrix.value = n.state.spotLightMatrix, u.spotLightMap.value = n.state.spotLightMap, u.pointShadowMap.value = n.state.pointShadowMap, u.pointShadowMatrix.value = n.state.pointShadowMatrix);
    const p = h.getUniforms(),
      m = cE.seqWithValue(p.seq, u);
    return i.currentProgram = h, i.uniformsList = m, h;
  }
  function Te(e, t) {
    const s = j.get(e);
    s.outputEncoding = t.outputEncoding, s.instancing = t.instancing, s.skinning = t.skinning, s.morphTargets = t.morphTargets, s.morphNormals = t.morphNormals, s.morphColors = t.morphColors, s.morphTargetsCount = t.morphTargetsCount, s.numClippingPlanes = t.numClippingPlanes, s.numIntersection = t.numClipIntersection, s.vertexAlphas = t.vertexAlphas, s.vertexTangents = t.vertexTangents, s.toneMapping = t.toneMapping;
  }
  we.setAnimationLoop(function (e) {
    ye && ye(e);
  }), "undefined" != typeof self && we.setContext(self), this.setAnimationLoop = function (e) {
    ye = e, me.setAnimationLoop(e), null === e ? we.stop() : we.start();
  }, me.addEventListener("sessionstart", _e), me.addEventListener("sessionend", xe), this.render = function (e, t) {
    if (void 0 !== t && !0 !== t.isCamera) return;
    if (!0 === g) return;
    !0 === e.matrixWorldAutoUpdate && e.updateMatrixWorld(), null === t.parent && !0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(), !0 === me.enabled && !0 === me.isPresenting && (!0 === me.cameraAutoUpdate && me.updateCamera(t), t = me.getCamera()), !0 === e.isScene && e.onBeforeRender(f, e, t, y), d = te.get(e, m.length), d.init(), m.push(d), z.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), D.setFromProjectionMatrix(z), O = this.localClippingEnabled, L = se.init(this.clippingPlanes, O), u = ee.get(e, p.length), u.init(), p.push(u), Se(e, t, 0, f.sortObjects), u.finish(), !0 === f.sortObjects && u.sort(T, E), !0 === L && se.beginShadows();
    const s = d.state.shadowsArray;
    if (ie.render(s, e, t), !0 === L && se.endShadows(), !0 === this.info.autoReset && this.info.reset(), ne.render(u, e), d.setupLights(f.useLegacyLights), t.isArrayCamera) {
      const s = t.cameras;
      for (let t = 0, i = s.length; t < i; t++) {
        const i = s[t];
        Ae(u, e, i, i.viewport);
      }
    } else Ae(u, e, t);
    null !== y && (q.updateMultisampleRenderTarget(y), q.updateRenderTargetMipmap(y)), !0 === e.isScene && e.onAfterRender(f, e, t), ce.resetDefaultState(), _ = -1, x = null, m.pop(), d = m.length > 0 ? m[m.length - 1] : null, p.pop(), u = p.length > 0 ? p[p.length - 1] : null;
  }, this.getActiveCubeFace = function () {
    return v;
  }, this.getActiveMipmapLevel = function () {
    return b;
  }, this.getRenderTarget = function () {
    return y;
  }, this.setRenderTargetTextures = function (e, t, s) {
    j.get(e.texture).__webglTexture = t, j.get(e.depthTexture).__webglTexture = s;
    const i = j.get(e);
    i.__hasExternalTextures = !0, i.__hasExternalTextures && (i.__autoAllocateDepthBuffer = void 0 === s, i.__autoAllocateDepthBuffer || !0 === H.has("WEBGL_multisampled_render_to_texture") && (i.__useRenderToTexture = !1));
  }, this.setRenderTargetFramebuffer = function (e, t) {
    const s = j.get(e);
    s.__webglFramebuffer = t, s.__useDefaultFramebuffer = void 0 === t;
  }, this.setRenderTarget = function (e, t = 0, s = 0) {
    y = e, v = t, b = s;
    let i = !0,
      n = null,
      a = !1,
      r = !1;
    if (e) {
      const s = j.get(e);
      void 0 !== s.__useDefaultFramebuffer ? (V.bindFramebuffer(36160, null), i = !1) : void 0 === s.__webglFramebuffer ? q.setupRenderTarget(e) : s.__hasExternalTextures && q.rebindTextures(e, j.get(e.texture).__webglTexture, j.get(e.depthTexture).__webglTexture);
      const o = e.texture;
      (o.isData3DTexture || o.isDataArrayTexture || o.isCompressedArrayTexture) && (r = !0);
      const l = j.get(e).__webglFramebuffer;
      e.isWebGLCubeRenderTarget ? (n = l[t], a = !0) : n = G.isWebGL2 && e.samples > 0 && !1 === q.useMultisampledRTT(e) ? j.get(e).__webglMultisampledFramebuffer : l, w.copy(e.viewport), S.copy(e.scissor), A = e.scissorTest;
    } else w.copy(B).multiplyScalar(P).floor(), S.copy(I).multiplyScalar(P).floor(), A = k;
    if (V.bindFramebuffer(36160, n) && G.drawBuffers && i && V.drawBuffers(e, n), V.viewport(w), V.scissor(S), V.setScissorTest(A), a) {
      const i = j.get(e.texture);
      ue.framebufferTexture2D(36160, 36064, 34069 + t, i.__webglTexture, s);
    } else if (r) {
      const i = j.get(e.texture),
        n = t || 0;
      ue.framebufferTextureLayer(36160, 36064, i.__webglTexture, s || 0, n);
    }
    _ = -1;
  }, this.readRenderTargetPixels = function (e, t, s, i, n, a, r) {
    if (!e || !e.isWebGLRenderTarget) return;
    let o = j.get(e).__webglFramebuffer;
    if (e.isWebGLCubeRenderTarget && void 0 !== r && (o = o[r]), o) {
      V.bindFramebuffer(36160, o);
      try {
        const r = e.texture,
          o = r.format,
          l = r.type;
        if (o !== aS && le.convert(o) !== ue.getParameter(35739)) return;
        const c = l === eS && (H.has("EXT_color_buffer_half_float") || G.isWebGL2 && H.has("EXT_color_buffer_float"));
        if (!(l === Zw || le.convert(l) === ue.getParameter(35738) || l === Kw && (G.isWebGL2 || H.has("OES_texture_float") || H.has("WEBGL_color_buffer_float")) || c)) return;
        t >= 0 && t <= e.width - i && s >= 0 && s <= e.height - n && ue.readPixels(t, s, i, n, le.convert(o), le.convert(l), a);
      } finally {
        const e = null !== y ? j.get(y).__webglFramebuffer : null;
        V.bindFramebuffer(36160, e);
      }
    }
  }, this.copyFramebufferToTexture = function (e, t, s = 0) {
    const i = Math.pow(2, -s),
      n = Math.floor(t.image.width * i),
      a = Math.floor(t.image.height * i);
    q.setTexture2D(t, 0), ue.copyTexSubImage2D(3553, s, 0, 0, e.x, e.y, n, a), V.unbindTexture();
  }, this.copyTextureToTexture = function (e, t, s, i = 0) {
    const n = t.image.width,
      a = t.image.height,
      r = le.convert(s.format),
      o = le.convert(s.type);
    q.setTexture2D(s, 0), ue.pixelStorei(37440, s.flipY), ue.pixelStorei(37441, s.premultiplyAlpha), ue.pixelStorei(3317, s.unpackAlignment), t.isDataTexture ? ue.texSubImage2D(3553, i, e.x, e.y, n, a, r, o, t.image.data) : t.isCompressedTexture ? ue.compressedTexSubImage2D(3553, i, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, r, t.mipmaps[0].data) : ue.texSubImage2D(3553, i, e.x, e.y, r, o, t.image), 0 === i && s.generateMipmaps && ue.generateMipmap(3553), V.unbindTexture();
  }, this.copyTextureToTexture3D = function (e, t, s, i, n = 0) {
    if (f.isWebGL1Renderer) return;
    const a = e.max.x - e.min.x + 1,
      r = e.max.y - e.min.y + 1,
      o = e.max.z - e.min.z + 1,
      l = le.convert(i.format),
      c = le.convert(i.type);
    let h;
    if (i.isData3DTexture) q.setTexture3D(i, 0), h = 32879;else {
      if (!i.isDataArrayTexture) return;
      q.setTexture2DArray(i, 0), h = 35866;
    }
    ue.pixelStorei(37440, i.flipY), ue.pixelStorei(37441, i.premultiplyAlpha), ue.pixelStorei(3317, i.unpackAlignment);
    const u = ue.getParameter(3314),
      d = ue.getParameter(32878),
      p = ue.getParameter(3316),
      m = ue.getParameter(3315),
      g = ue.getParameter(32877),
      v = s.isCompressedTexture ? s.mipmaps[0] : s.image;
    ue.pixelStorei(3314, v.width), ue.pixelStorei(32878, v.height), ue.pixelStorei(3316, e.min.x), ue.pixelStorei(3315, e.min.y), ue.pixelStorei(32877, e.min.z), s.isDataTexture || s.isData3DTexture ? ue.texSubImage3D(h, n, t.x, t.y, t.z, a, r, o, l, c, v.data) : s.isCompressedArrayTexture ? ue.compressedTexSubImage3D(h, n, t.x, t.y, t.z, a, r, o, l, v.data) : ue.texSubImage3D(h, n, t.x, t.y, t.z, a, r, o, l, c, v), ue.pixelStorei(3314, u), ue.pixelStorei(32878, d), ue.pixelStorei(3316, p), ue.pixelStorei(3315, m), ue.pixelStorei(32877, g), 0 === n && i.generateMipmaps && ue.generateMipmap(h), V.unbindTexture();
  }, this.initTexture = function (e) {
    e.isCubeTexture ? q.setTextureCube(e, 0) : e.isData3DTexture ? q.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? q.setTexture2DArray(e, 0) : q.setTexture2D(e, 0), V.unbindTexture();
  }, this.resetState = function () {
    v = 0, b = 0, y = null, V.reset(), ce.reset();
  }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
    detail: this
  }));
}
Object.defineProperties(iB.prototype, {
  physicallyCorrectLights: {
    get: function () {
      return !this.useLegacyLights;
    },
    set: function (e) {
      this.useLegacyLights = !e;
    }
  }
});
class nB extends iB {}
nB.prototype.isWebGL1Renderer = !0;
class aB {
  constructor(e, t = 25e-5) {
    this.isFogExp2 = !0, this.name = "", this.color = new AC(e), this.density = t;
  }
  clone() {
    return new aB(this.color, this.density);
  }
  toJSON() {
    return {
      type: "FogExp2",
      color: this.color.getHex(),
      density: this.density
    };
  }
}
class rB {
  constructor(e, t = 1, s = 1e3) {
    this.isFog = !0, this.name = "", this.color = new AC(e), this.near = t, this.far = s;
  }
  clone() {
    return new rB(this.color, this.near, this.far);
  }
  toJSON() {
    return {
      type: "Fog",
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}
class oB extends rC {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  copy(e, t) {
    return super.copy(e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return null !== this.fog && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (t.object.backgroundIntensity = this.backgroundIntensity), t;
  }
  get autoUpdate() {
    return this.matrixWorldAutoUpdate;
  }
  set autoUpdate(e) {
    this.matrixWorldAutoUpdate = e;
  }
}
class lB {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = void 0 !== e ? e.length / t : 0, this.usage = mA, this.updateRange = {
      offset: 0,
      count: -1
    }, this.version = 0, this.uuid = SA();
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, s) {
    e *= this.stride, s *= t.stride;
    for (let i = 0, n = this.stride; i < n; i++) this.array[e + i] = t.array[s + i];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = SA()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
      s = new this.constructor(t, this.stride);
    return s.setUsage(this.usage), s;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = SA()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const cB = new HA();
class hB {
  constructor(e, t, s, i = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = s, this.normalized = i;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, s = this.data.count; t < s; t++) cB.fromBufferAttribute(this, t), cB.applyMatrix4(e), this.setXYZ(t, cB.x, cB.y, cB.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, s = this.count; t < s; t++) cB.fromBufferAttribute(this, t), cB.applyNormalMatrix(e), this.setXYZ(t, cB.x, cB.y, cB.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, s = this.count; t < s; t++) cB.fromBufferAttribute(this, t), cB.transformDirection(e), this.setXYZ(t, cB.x, cB.y, cB.z);
    return this;
  }
  setX(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = IA(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = BA(t, this.array)), t;
  }
  setXY(e, t, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = IA(t, this.array), s = IA(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = s, this;
  }
  setXYZ(e, t, s, i) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = IA(t, this.array), s = IA(s, this.array), i = IA(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = s, this.data.array[e + 2] = i, this;
  }
  setXYZW(e, t, s, i, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = IA(t, this.array), s = IA(s, this.array), i = IA(i, this.array), n = IA(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = s, this.data.array[e + 2] = i, this.data.array[e + 3] = n, this;
  }
  clone(e) {
    if (void 0 === e) {
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const s = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[s + t]);
      }
      return new EC(new this.array.constructor(e), this.itemSize, this.normalized);
    }
    return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new hB(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (void 0 === e) {
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const s = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[s + t]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: e,
        normalized: this.normalized
      };
    }
    return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
      isInterleavedBufferAttribute: !0,
      itemSize: this.itemSize,
      data: this.data.uuid,
      offset: this.offset,
      normalized: this.normalized
    };
  }
}
class uB extends yC {
  constructor(e) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new AC(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
let dB;
const pB = new HA(),
  mB = new HA(),
  fB = new HA(),
  gB = new DA(),
  vB = new DA(),
  bB = new OM(),
  yB = new HA(),
  _B = new HA(),
  xB = new HA(),
  wB = new DA(),
  SB = new DA(),
  AB = new DA();
class MB extends rC {
  constructor(e) {
    if (super(), this.isSprite = !0, this.type = "Sprite", void 0 === dB) {
      dB = new HC();
      const e = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
        t = new lB(e, 5);
      dB.setIndex([0, 1, 2, 0, 2, 3]), dB.setAttribute("position", new hB(t, 3, 0, !1)), dB.setAttribute("uv", new hB(t, 2, 3, !1));
    }
    this.geometry = dB, this.material = void 0 !== e ? e : new uB(), this.center = new DA(.5, .5);
  }
  raycast(e, t) {
    e.camera, mB.setFromMatrixScale(this.matrixWorld), bB.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), fB.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && mB.multiplyScalar(-fB.z);
    const s = this.material.rotation;
    let i, n;
    0 !== s && (n = Math.cos(s), i = Math.sin(s));
    const a = this.center;
    CB(yB.set(-.5, -.5, 0), fB, a, mB, i, n), CB(_B.set(.5, -.5, 0), fB, a, mB, i, n), CB(xB.set(.5, .5, 0), fB, a, mB, i, n), wB.set(0, 0), SB.set(1, 0), AB.set(1, 1);
    let r = e.ray.intersectTriangle(yB, _B, xB, !1, pB);
    if (null === r && (CB(_B.set(-.5, .5, 0), fB, a, mB, i, n), SB.set(0, 1), r = e.ray.intersectTriangle(yB, xB, _B, !1, pB), null === r)) return;
    const o = e.ray.origin.distanceTo(pB);
    o < e.near || o > e.far || t.push({
      distance: o,
      point: pB.clone(),
      uv: vC.getUV(pB, yB, _B, xB, wB, SB, AB, new DA()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), void 0 !== e.center && this.center.copy(e.center), this.material = e.material, this;
  }
}
function CB(e, t, s, i, n, a) {
  gB.subVectors(e, s).addScalar(.5).multiply(i), void 0 !== n ? (vB.x = a * gB.x - n * gB.y, vB.y = n * gB.x + a * gB.y) : vB.copy(gB), e.copy(t), e.x += vB.x, e.y += vB.y, e.applyMatrix4(bB);
}
const PB = new HA(),
  TB = new HA();
class EB extends rC {
  constructor() {
    super(), this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, {
      levels: {
        enumerable: !0,
        value: []
      },
      isLOD: {
        value: !0
      }
    }), this.autoUpdate = !0;
  }
  copy(e) {
    super.copy(e, !1);
    const t = e.levels;
    for (let s = 0, i = t.length; s < i; s++) {
      const e = t[s];
      this.addLevel(e.object.clone(), e.distance, e.hysteresis);
    }
    return this.autoUpdate = e.autoUpdate, this;
  }
  addLevel(e, t = 0, s = 0) {
    t = Math.abs(t);
    const i = this.levels;
    let n;
    for (n = 0; n < i.length && !(t < i[n].distance); n++);
    return i.splice(n, 0, {
      distance: t,
      hysteresis: s,
      object: e
    }), this.add(e), this;
  }
  getCurrentLevel() {
    return this._currentLevel;
  }
  getObjectForDistance(e) {
    const t = this.levels;
    if (t.length > 0) {
      let s, i;
      for (s = 1, i = t.length; s < i; s++) {
        let i = t[s].distance;
        if (t[s].object.visible && (i -= i * t[s].hysteresis), e < i) break;
      }
      return t[s - 1].object;
    }
    return null;
  }
  raycast(e, t) {
    if (this.levels.length > 0) {
      PB.setFromMatrixPosition(this.matrixWorld);
      const s = e.ray.origin.distanceTo(PB);
      this.getObjectForDistance(s).raycast(e, t);
    }
  }
  update(e) {
    const t = this.levels;
    if (t.length > 1) {
      PB.setFromMatrixPosition(e.matrixWorld), TB.setFromMatrixPosition(this.matrixWorld);
      const s = PB.distanceTo(TB) / e.zoom;
      let i, n;
      for (t[0].object.visible = !0, i = 1, n = t.length; i < n; i++) {
        let e = t[i].distance;
        if (t[i].object.visible && (e -= e * t[i].hysteresis), !(s >= e)) break;
        t[i - 1].object.visible = !1, t[i].object.visible = !0;
      }
      for (this._currentLevel = i - 1; i < n; i++) t[i].object.visible = !1;
    }
  }
  toJSON(e) {
    const t = super.toJSON(e);
    !1 === this.autoUpdate && (t.object.autoUpdate = !1), t.object.levels = [];
    const s = this.levels;
    for (let i = 0, n = s.length; i < n; i++) {
      const e = s[i];
      t.object.levels.push({
        object: e.object.uuid,
        distance: e.distance,
        hysteresis: e.hysteresis
      });
    }
    return t;
  }
}
const BB = new HA(),
  IB = new nM(),
  kB = new nM(),
  DB = new HA(),
  LB = new OM();
class OB extends sP {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new OM(), this.bindMatrixInverse = new OM();
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, this;
  }
  bind(e, t) {
    this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new nM(),
      t = this.geometry.attributes.skinWeight;
    for (let s = 0, i = t.count; s < i; s++) {
      e.fromBufferAttribute(t, s);
      const i = 1 / e.manhattanLength();
      Infinity !== i ? e.multiplyScalar(i) : e.set(1, 0, 0, 0), t.setXYZW(s, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), "attached" === this.bindMode ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : "detached" === this.bindMode && this.bindMatrixInverse.copy(this.bindMatrix).invert();
  }
  boneTransform(e, t) {
    const s = this.skeleton,
      i = this.geometry;
    IB.fromBufferAttribute(i.attributes.skinIndex, e), kB.fromBufferAttribute(i.attributes.skinWeight, e), BB.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
    for (let n = 0; n < 4; n++) {
      const e = kB.getComponent(n);
      if (0 !== e) {
        const i = IB.getComponent(n);
        LB.multiplyMatrices(s.bones[i].matrixWorld, s.boneInverses[i]), t.addScaledVector(DB.copy(BB).applyMatrix4(LB), e);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}
class RB extends rC {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class zB extends iM {
  constructor(e = null, t = 1, s = 1, i, n, a, r, o, l = Hw, c = Hw, h, u) {
    super(null, a, r, o, l, c, i, n, h, u), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: s
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const NB = new OM(),
  FB = new OM();
class UB {
  constructor(e = [], t = []) {
    this.uuid = SA(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.boneTextureSize = 0, this.frame = -1, this.init();
  }
  init() {
    const e = this.bones,
      t = this.boneInverses;
    if (this.boneMatrices = new Float32Array(16 * e.length), 0 === t.length) this.calculateInverses();else if (e.length !== t.length) {
      this.boneInverses = [];
      for (let e = 0, t = this.bones.length; e < t; e++) this.boneInverses.push(new OM());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = new OM();
      this.bones[e] && t.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(t);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t && t.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t && (t.parent && t.parent.isBone ? (t.matrix.copy(t.parent.matrixWorld).invert(), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale));
    }
  }
  update() {
    const e = this.bones,
      t = this.boneInverses,
      s = this.boneMatrices,
      i = this.boneTexture;
    for (let n = 0, a = e.length; n < a; n++) {
      const i = e[n] ? e[n].matrixWorld : FB;
      NB.multiplyMatrices(i, t[n]), NB.toArray(s, 16 * n);
    }
    null !== i && (i.needsUpdate = !0);
  }
  clone() {
    return new UB(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(4 * this.bones.length);
    e = TA(e), e = Math.max(e, 4);
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const s = new zB(t, e, e, aS, Kw);
    return s.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = s, this.boneTextureSize = e, this;
  }
  getBoneByName(e) {
    for (let t = 0, s = this.bones.length; t < s; t++) {
      const s = this.bones[t];
      if (s.name === e) return s;
    }
  }
  dispose() {
    null !== this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let s = 0, i = e.bones.length; s < i; s++) {
      let i = t[e.bones[s]];
      void 0 === i && (i = new RB()), this.bones.push(i), this.boneInverses.push(new OM().fromArray(e.boneInverses[s]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    e.uuid = this.uuid;
    const t = this.bones,
      s = this.boneInverses;
    for (let i = 0, n = t.length; i < n; i++) {
      const n = t[i];
      e.bones.push(n.uuid);
      const a = s[i];
      e.boneInverses.push(a.toArray());
    }
    return e;
  }
}
class HB extends EC {
  constructor(e, t, s, i = 1) {
    super(e, t, s), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = i;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const GB = new OM(),
  VB = new OM(),
  WB = [],
  jB = new OM(),
  qB = new sP();
class ZB extends sP {
  constructor(e, t, s) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new HB(new Float32Array(16 * s), 16), this.instanceColor = null, this.count = s, this.frustumCulled = !1;
    for (let i = 0; i < s; i++) this.setMatrixAt(i, jB);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), null !== e.instanceColor && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, 3 * e);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, 16 * e);
  }
  raycast(e, t) {
    const s = this.matrixWorld,
      i = this.count;
    if (qB.geometry = this.geometry, qB.material = this.material, void 0 !== qB.material) for (let n = 0; n < i; n++) {
      this.getMatrixAt(n, GB), VB.multiplyMatrices(s, GB), qB.matrixWorld = VB, qB.raycast(e, WB);
      for (let e = 0, s = WB.length; e < s; e++) {
        const s = WB[e];
        s.instanceId = n, s.object = this, t.push(s);
      }
      WB.length = 0;
    }
  }
  setColorAt(e, t) {
    null === this.instanceColor && (this.instanceColor = new HB(new Float32Array(3 * this.instanceMatrix.count), 3)), t.toArray(this.instanceColor.array, 3 * e);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, 16 * e);
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class $B extends yC {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new AC(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const XB = new HA(),
  YB = new HA(),
  JB = new OM(),
  QB = new LM(),
  KB = new CM();
class eI extends rC {
  constructor(e = new HC(), t = new $B()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        s = [0];
      for (let e = 1, i = t.count; e < i; e++) XB.fromBufferAttribute(t, e - 1), YB.fromBufferAttribute(t, e), s[e] = s[e - 1], s[e] += XB.distanceTo(YB);
      e.setAttribute("lineDistance", new DC(s, 1));
    }
    return this;
  }
  raycast(e, t) {
    const s = this.geometry,
      i = this.matrixWorld,
      n = e.params.Line.threshold,
      a = s.drawRange;
    if (null === s.boundingSphere && s.computeBoundingSphere(), KB.copy(s.boundingSphere), KB.applyMatrix4(i), KB.radius += n, !1 === e.ray.intersectsSphere(KB)) return;
    JB.copy(i).invert(), QB.copy(e.ray).applyMatrix4(JB);
    const r = n / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = r * r,
      l = new HA(),
      c = new HA(),
      h = new HA(),
      u = new HA(),
      d = this.isLineSegments ? 2 : 1,
      p = s.index,
      m = s.attributes.position;
    if (null !== p) {
      for (let s = Math.max(0, a.start), i = Math.min(p.count, a.start + a.count) - 1; s < i; s += d) {
        const i = p.getX(s),
          n = p.getX(s + 1);
        l.fromBufferAttribute(m, i), c.fromBufferAttribute(m, n);
        if (QB.distanceSqToSegment(l, c, u, h) > o) continue;
        u.applyMatrix4(this.matrixWorld);
        const a = e.ray.origin.distanceTo(u);
        a < e.near || a > e.far || t.push({
          distance: a,
          point: h.clone().applyMatrix4(this.matrixWorld),
          index: s,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    } else {
      for (let s = Math.max(0, a.start), i = Math.min(m.count, a.start + a.count) - 1; s < i; s += d) {
        l.fromBufferAttribute(m, s), c.fromBufferAttribute(m, s + 1);
        if (QB.distanceSqToSegment(l, c, u, h) > o) continue;
        u.applyMatrix4(this.matrixWorld);
        const i = e.ray.origin.distanceTo(u);
        i < e.near || i > e.far || t.push({
          distance: i,
          point: h.clone().applyMatrix4(this.matrixWorld),
          index: s,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const s = e[t[0]];
      if (void 0 !== s) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = s.length; e < t; e++) {
          const t = s[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
const tI = new HA(),
  sI = new HA();
class iI extends eI {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        s = [];
      for (let e = 0, i = t.count; e < i; e += 2) tI.fromBufferAttribute(t, e), sI.fromBufferAttribute(t, e + 1), s[e] = 0 === e ? 0 : s[e - 1], s[e + 1] = s[e] + tI.distanceTo(sI);
      e.setAttribute("lineDistance", new DC(s, 1));
    }
    return this;
  }
}
class nI extends eI {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class aI extends yC {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new AC(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const rI = new OM(),
  oI = new LM(),
  lI = new CM(),
  cI = new HA();
class hI extends rC {
  constructor(e = new HC(), t = new aI()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const s = this.geometry,
      i = this.matrixWorld,
      n = e.params.Points.threshold,
      a = s.drawRange;
    if (null === s.boundingSphere && s.computeBoundingSphere(), lI.copy(s.boundingSphere), lI.applyMatrix4(i), lI.radius += n, !1 === e.ray.intersectsSphere(lI)) return;
    rI.copy(i).invert(), oI.copy(e.ray).applyMatrix4(rI);
    const r = n / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = r * r,
      l = s.index,
      c = s.attributes.position;
    if (null !== l) {
      for (let s = Math.max(0, a.start), n = Math.min(l.count, a.start + a.count); s < n; s++) {
        const n = l.getX(s);
        cI.fromBufferAttribute(c, n), uI(cI, n, o, i, e, t, this);
      }
    } else {
      for (let s = Math.max(0, a.start), n = Math.min(c.count, a.start + a.count); s < n; s++) cI.fromBufferAttribute(c, s), uI(cI, s, o, i, e, t, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const s = e[t[0]];
      if (void 0 !== s) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = s.length; e < t; e++) {
          const t = s[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
function uI(e, t, s, i, n, a, r) {
  const o = oI.distanceSqToPoint(e);
  if (o < s) {
    const s = new HA();
    oI.closestPointToPoint(e, s), s.applyMatrix4(i);
    const l = n.ray.origin.distanceTo(s);
    if (l < n.near || l > n.far) return;
    a.push({
      distance: l,
      distanceToRay: Math.sqrt(o),
      point: s,
      index: t,
      face: null,
      object: r
    });
  }
}
class dI {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  getPoint() {
    return null;
  }
  getPointAt(e, t) {
    const s = this.getUtoTmapping(e);
    return this.getPoint(s, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let s = 0; s <= e; s++) t.push(this.getPoint(s / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let s = 0; s <= e; s++) t.push(this.getPointAt(s / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let s,
      i = this.getPoint(0),
      n = 0;
    t.push(0);
    for (let a = 1; a <= e; a++) s = this.getPoint(a / e), n += s.distanceTo(i), t.push(n), i = s;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(e, t) {
    const s = this.getLengths();
    let i = 0;
    const n = s.length;
    let a;
    a = t || e * s[n - 1];
    let r,
      o = 0,
      l = n - 1;
    for (; o <= l;) if (i = Math.floor(o + (l - o) / 2), r = s[i] - a, r < 0) o = i + 1;else {
      if (!(r > 0)) {
        l = i;
        break;
      }
      l = i - 1;
    }
    if (i = l, s[i] === a) return i / (n - 1);
    const c = s[i];
    return (i + (a - c) / (s[i + 1] - c)) / (n - 1);
  }
  getTangent(e, t) {
    const s = 1e-4;
    let i = e - s,
      n = e + s;
    i < 0 && (i = 0), n > 1 && (n = 1);
    const a = this.getPoint(i),
      r = this.getPoint(n),
      o = t || (a.isVector2 ? new DA() : new HA());
    return o.copy(r).sub(a).normalize(), o;
  }
  getTangentAt(e, t) {
    const s = this.getUtoTmapping(e);
    return this.getTangent(s, t);
  }
  computeFrenetFrames(e, t) {
    const s = new HA(),
      i = [],
      n = [],
      a = [],
      r = new HA(),
      o = new OM();
    for (let d = 0; d <= e; d++) {
      const t = d / e;
      i[d] = this.getTangentAt(t, new HA());
    }
    n[0] = new HA(), a[0] = new HA();
    let l = Number.MAX_VALUE;
    const c = Math.abs(i[0].x),
      h = Math.abs(i[0].y),
      u = Math.abs(i[0].z);
    c <= l && (l = c, s.set(1, 0, 0)), h <= l && (l = h, s.set(0, 1, 0)), u <= l && s.set(0, 0, 1), r.crossVectors(i[0], s).normalize(), n[0].crossVectors(i[0], r), a[0].crossVectors(i[0], n[0]);
    for (let d = 1; d <= e; d++) {
      if (n[d] = n[d - 1].clone(), a[d] = a[d - 1].clone(), r.crossVectors(i[d - 1], i[d]), r.length() > Number.EPSILON) {
        r.normalize();
        const e = Math.acos(AA(i[d - 1].dot(i[d]), -1, 1));
        n[d].applyMatrix4(o.makeRotationAxis(r, e));
      }
      a[d].crossVectors(i[d], n[d]);
    }
    if (!0 === t) {
      let t = Math.acos(AA(n[0].dot(n[e]), -1, 1));
      t /= e, i[0].dot(r.crossVectors(n[0], n[e])) > 0 && (t = -t);
      for (let s = 1; s <= e; s++) n[s].applyMatrix4(o.makeRotationAxis(i[s], t * s)), a[s].crossVectors(i[s], n[s]);
    }
    return {
      tangents: i,
      normals: n,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}
class pI extends dI {
  constructor(e = 0, t = 0, s = 1, i = 1, n = 0, a = 2 * Math.PI, r = !1, o = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = s, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = a, this.aClockwise = r, this.aRotation = o;
  }
  getPoint(e, t) {
    const s = t || new DA(),
      i = 2 * Math.PI;
    let n = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(n) < Number.EPSILON;
    for (; n < 0;) n += i;
    for (; n > i;) n -= i;
    n < Number.EPSILON && (n = a ? 0 : i), !0 !== this.aClockwise || a || (n === i ? n = -i : n -= i);
    const r = this.aStartAngle + e * n;
    let o = this.aX + this.xRadius * Math.cos(r),
      l = this.aY + this.yRadius * Math.sin(r);
    if (0 !== this.aRotation) {
      const e = Math.cos(this.aRotation),
        t = Math.sin(this.aRotation),
        s = o - this.aX,
        i = l - this.aY;
      o = s * e - i * t + this.aX, l = s * t + i * e + this.aY;
    }
    return s.set(o, l);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}
function mI() {
  let e = 0,
    t = 0,
    s = 0,
    i = 0;
  function n(n, a, r, o) {
    e = n, t = r, s = -3 * n + 3 * a - 2 * r - o, i = 2 * n - 2 * a + r + o;
  }
  return {
    initCatmullRom: function (e, t, s, i, a) {
      n(t, s, a * (s - e), a * (i - t));
    },
    initNonuniformCatmullRom: function (e, t, s, i, a, r, o) {
      let l = (t - e) / a - (s - e) / (a + r) + (s - t) / r,
        c = (s - t) / r - (i - t) / (r + o) + (i - s) / o;
      l *= r, c *= r, n(t, s, l, c);
    },
    calc: function (n) {
      const a = n * n;
      return e + t * n + s * a + i * (a * n);
    }
  };
}
const fI = new HA(),
  gI = new mI(),
  vI = new mI(),
  bI = new mI();
class yI extends dI {
  constructor(e = [], t = !1, s = "centripetal", i = .5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = s, this.tension = i;
  }
  getPoint(e, t = new HA()) {
    const s = t,
      i = this.points,
      n = i.length,
      a = (n - (this.closed ? 0 : 1)) * e;
    let r,
      o,
      l = Math.floor(a),
      c = a - l;
    this.closed ? l += l > 0 ? 0 : (Math.floor(Math.abs(l) / n) + 1) * n : 0 === c && l === n - 1 && (l = n - 2, c = 1), this.closed || l > 0 ? r = i[(l - 1) % n] : (fI.subVectors(i[0], i[1]).add(i[0]), r = fI);
    const h = i[l % n],
      u = i[(l + 1) % n];
    if (this.closed || l + 2 < n ? o = i[(l + 2) % n] : (fI.subVectors(i[n - 1], i[n - 2]).add(i[n - 1]), o = fI), "centripetal" === this.curveType || "chordal" === this.curveType) {
      const e = "chordal" === this.curveType ? .5 : .25;
      let t = Math.pow(r.distanceToSquared(h), e),
        s = Math.pow(h.distanceToSquared(u), e),
        i = Math.pow(u.distanceToSquared(o), e);
      s < 1e-4 && (s = 1), t < 1e-4 && (t = s), i < 1e-4 && (i = s), gI.initNonuniformCatmullRom(r.x, h.x, u.x, o.x, t, s, i), vI.initNonuniformCatmullRom(r.y, h.y, u.y, o.y, t, s, i), bI.initNonuniformCatmullRom(r.z, h.z, u.z, o.z, t, s, i);
    } else "catmullrom" === this.curveType && (gI.initCatmullRom(r.x, h.x, u.x, o.x, this.tension), vI.initCatmullRom(r.y, h.y, u.y, o.y, this.tension), bI.initCatmullRom(r.z, h.z, u.z, o.z, this.tension));
    return s.set(gI.calc(c), vI.calc(c), bI.calc(c)), s;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, s = e.points.length; t < s; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, s = this.points.length; t < s; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, s = e.points.length; t < s; t++) {
      const s = e.points[t];
      this.points.push(new HA().fromArray(s));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
}
function _I(e, t, s, i, n) {
  const a = .5 * (i - t),
    r = .5 * (n - s),
    o = e * e;
  return (2 * s - 2 * i + a + r) * (e * o) + (-3 * s + 3 * i - 2 * a - r) * o + a * e + s;
}
function xI(e, t, s, i) {
  return function (e, t) {
    const s = 1 - e;
    return s * s * t;
  }(e, t) + function (e, t) {
    return 2 * (1 - e) * e * t;
  }(e, s) + function (e, t) {
    return e * e * t;
  }(e, i);
}
function wI(e, t, s, i, n) {
  return function (e, t) {
    const s = 1 - e;
    return s * s * s * t;
  }(e, t) + function (e, t) {
    const s = 1 - e;
    return 3 * s * s * e * t;
  }(e, s) + function (e, t) {
    return 3 * (1 - e) * e * e * t;
  }(e, i) + function (e, t) {
    return e * e * e * t;
  }(e, n);
}
class SI extends dI {
  constructor(e = new DA(), t = new DA(), s = new DA(), i = new DA()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = s, this.v3 = i;
  }
  getPoint(e, t = new DA()) {
    const s = t,
      i = this.v0,
      n = this.v1,
      a = this.v2,
      r = this.v3;
    return s.set(wI(e, i.x, n.x, a.x, r.x), wI(e, i.y, n.y, a.y, r.y)), s;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class AI extends dI {
  constructor(e = new HA(), t = new HA(), s = new HA(), i = new HA()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = s, this.v3 = i;
  }
  getPoint(e, t = new HA()) {
    const s = t,
      i = this.v0,
      n = this.v1,
      a = this.v2,
      r = this.v3;
    return s.set(wI(e, i.x, n.x, a.x, r.x), wI(e, i.y, n.y, a.y, r.y), wI(e, i.z, n.z, a.z, r.z)), s;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class MI extends dI {
  constructor(e = new DA(), t = new DA()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new DA()) {
    const s = t;
    return 1 === e ? s.copy(this.v2) : (s.copy(this.v2).sub(this.v1), s.multiplyScalar(e).add(this.v1)), s;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new DA()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class CI extends dI {
  constructor(e = new HA(), t = new HA()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new HA()) {
    const s = t;
    return 1 === e ? s.copy(this.v2) : (s.copy(this.v2).sub(this.v1), s.multiplyScalar(e).add(this.v1)), s;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new HA()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class PI extends dI {
  constructor(e = new DA(), t = new DA(), s = new DA()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = s;
  }
  getPoint(e, t = new DA()) {
    const s = t,
      i = this.v0,
      n = this.v1,
      a = this.v2;
    return s.set(xI(e, i.x, n.x, a.x), xI(e, i.y, n.y, a.y)), s;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class TI extends dI {
  constructor(e = new HA(), t = new HA(), s = new HA()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = s;
  }
  getPoint(e, t = new HA()) {
    const s = t,
      i = this.v0,
      n = this.v1,
      a = this.v2;
    return s.set(xI(e, i.x, n.x, a.x), xI(e, i.y, n.y, a.y), xI(e, i.z, n.z, a.z)), s;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class EI extends dI {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new DA()) {
    const s = t,
      i = this.points,
      n = (i.length - 1) * e,
      a = Math.floor(n),
      r = n - a,
      o = i[0 === a ? a : a - 1],
      l = i[a],
      c = i[a > i.length - 2 ? i.length - 1 : a + 1],
      h = i[a > i.length - 3 ? i.length - 1 : a + 2];
    return s.set(_I(r, o.x, l.x, c.x, h.x), _I(r, o.y, l.y, c.y, h.y)), s;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, s = e.points.length; t < s; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, s = this.points.length; t < s; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, s = e.points.length; t < s; t++) {
      const s = e.points[t];
      this.points.push(new DA().fromArray(s));
    }
    return this;
  }
}
const BI = Object.freeze(Object.defineProperty({
  __proto__: null,
  ArcCurve: class extends pI {
    constructor(e, t, s, i, n, a) {
      super(e, t, s, s, i, n, a), this.isArcCurve = !0, this.type = "ArcCurve";
    }
  },
  CatmullRomCurve3: yI,
  CubicBezierCurve: SI,
  CubicBezierCurve3: AI,
  EllipseCurve: pI,
  LineCurve: MI,
  LineCurve3: CI,
  QuadraticBezierCurve: PI,
  QuadraticBezierCurve3: TI,
  SplineCurve: EI
}, Symbol.toStringTag, {
  value: "Module"
}));
class II extends dI {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    e.equals(t) || this.curves.push(new MI(t, e));
  }
  getPoint(e, t) {
    const s = e * this.getLength(),
      i = this.getCurveLengths();
    let n = 0;
    for (; n < i.length;) {
      if (i[n] >= s) {
        const e = i[n] - s,
          a = this.curves[n],
          r = a.getLength(),
          o = 0 === r ? 0 : 1 - e / r;
        return a.getPointAt(o, t);
      }
      n++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const e = [];
    let t = 0;
    for (let s = 0, i = this.curves.length; s < i; s++) t += this.curves[s].getLength(), e.push(t);
    return this.cacheLengths = e, e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let s = 0; s <= e; s++) t.push(this.getPoint(s / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let s;
    for (let i = 0, n = this.curves; i < n.length; i++) {
      const a = n[i],
        r = a.isEllipseCurve ? 2 * e : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? e * a.points.length : e,
        o = a.getPoints(r);
      for (let e = 0; e < o.length; e++) {
        const i = o[e];
        s && s.equals(i) || (t.push(i), s = i);
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), this.curves = [];
    for (let t = 0, s = e.curves.length; t < s; t++) {
      const s = e.curves[t];
      this.curves.push(s.clone());
    }
    return this.autoClose = e.autoClose, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose, e.curves = [];
    for (let t = 0, s = this.curves.length; t < s; t++) {
      const s = this.curves[t];
      e.curves.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
    for (let t = 0, s = e.curves.length; t < s; t++) {
      const s = e.curves[t];
      this.curves.push(new BI[s.type]().fromJSON(s));
    }
    return this;
  }
}
class kI extends II {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new DA(), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, s = e.length; t < s; t++) this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const s = new MI(this.currentPoint.clone(), new DA(e, t));
    return this.curves.push(s), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, s, i) {
    const n = new PI(this.currentPoint.clone(), new DA(e, t), new DA(s, i));
    return this.curves.push(n), this.currentPoint.set(s, i), this;
  }
  bezierCurveTo(e, t, s, i, n, a) {
    const r = new SI(this.currentPoint.clone(), new DA(e, t), new DA(s, i), new DA(n, a));
    return this.curves.push(r), this.currentPoint.set(n, a), this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e),
      s = new EI(t);
    return this.curves.push(s), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, s, i, n, a) {
    const r = this.currentPoint.x,
      o = this.currentPoint.y;
    return this.absarc(e + r, t + o, s, i, n, a), this;
  }
  absarc(e, t, s, i, n, a) {
    return this.absellipse(e, t, s, s, i, n, a), this;
  }
  ellipse(e, t, s, i, n, a, r, o) {
    const l = this.currentPoint.x,
      c = this.currentPoint.y;
    return this.absellipse(e + l, t + c, s, i, n, a, r, o), this;
  }
  absellipse(e, t, s, i, n, a, r, o) {
    const l = new pI(e, t, s, i, n, a, r, o);
    if (this.curves.length > 0) {
      const e = l.getPoint(0);
      e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
    }
    this.curves.push(l);
    const c = l.getPoint(1);
    return this.currentPoint.copy(c), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.currentPoint = this.currentPoint.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}
class DI extends HC {
  constructor(e = [new DA(0, -.5), new DA(.5, 0), new DA(0, .5)], t = 12, s = 0, i = 2 * Math.PI) {
    super(), this.type = "LatheGeometry", this.parameters = {
      points: e,
      segments: t,
      phiStart: s,
      phiLength: i
    }, t = Math.floor(t), i = AA(i, 0, 2 * Math.PI);
    const n = [],
      a = [],
      r = [],
      o = [],
      l = [],
      c = 1 / t,
      h = new HA(),
      u = new DA(),
      d = new HA(),
      p = new HA(),
      m = new HA();
    let f = 0,
      g = 0;
    for (let v = 0; v <= e.length - 1; v++) switch (v) {
      case 0:
        f = e[v + 1].x - e[v].x, g = e[v + 1].y - e[v].y, d.x = 1 * g, d.y = -f, d.z = 0 * g, m.copy(d), d.normalize(), o.push(d.x, d.y, d.z);
        break;
      case e.length - 1:
        o.push(m.x, m.y, m.z);
        break;
      default:
        f = e[v + 1].x - e[v].x, g = e[v + 1].y - e[v].y, d.x = 1 * g, d.y = -f, d.z = 0 * g, p.copy(d), d.x += m.x, d.y += m.y, d.z += m.z, d.normalize(), o.push(d.x, d.y, d.z), m.copy(p);
    }
    for (let v = 0; v <= t; v++) {
      const n = s + v * c * i,
        d = Math.sin(n),
        p = Math.cos(n);
      for (let s = 0; s <= e.length - 1; s++) {
        h.x = e[s].x * d, h.y = e[s].y, h.z = e[s].x * p, a.push(h.x, h.y, h.z), u.x = v / t, u.y = s / (e.length - 1), r.push(u.x, u.y);
        const i = o[3 * s + 0] * d,
          n = o[3 * s + 1],
          c = o[3 * s + 0] * p;
        l.push(i, n, c);
      }
    }
    for (let v = 0; v < t; v++) for (let t = 0; t < e.length - 1; t++) {
      const s = t + v * e.length,
        i = s,
        a = s + e.length,
        r = s + e.length + 1,
        o = s + 1;
      n.push(i, a, o), n.push(r, o, a);
    }
    this.setIndex(n), this.setAttribute("position", new DC(a, 3)), this.setAttribute("uv", new DC(r, 2)), this.setAttribute("normal", new DC(l, 3));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new DI(e.points, e.segments, e.phiStart, e.phiLength);
  }
}
class LI extends DI {
  constructor(e = 1, t = 1, s = 4, i = 8) {
    const n = new kI();
    n.absarc(0, -t / 2, e, 1.5 * Math.PI, 0), n.absarc(0, t / 2, e, 0, .5 * Math.PI), super(n.getPoints(s), i), this.type = "CapsuleGeometry", this.parameters = {
      radius: e,
      height: t,
      capSegments: s,
      radialSegments: i
    };
  }
  static fromJSON(e) {
    return new LI(e.radius, e.length, e.capSegments, e.radialSegments);
  }
}
class OI extends HC {
  constructor(e = 1, t = 32, s = 0, i = 2 * Math.PI) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: e,
      segments: t,
      thetaStart: s,
      thetaLength: i
    }, t = Math.max(3, t);
    const n = [],
      a = [],
      r = [],
      o = [],
      l = new HA(),
      c = new DA();
    a.push(0, 0, 0), r.push(0, 0, 1), o.push(.5, .5);
    for (let h = 0, u = 3; h <= t; h++, u += 3) {
      const n = s + h / t * i;
      l.x = e * Math.cos(n), l.y = e * Math.sin(n), a.push(l.x, l.y, l.z), r.push(0, 0, 1), c.x = (a[u] / e + 1) / 2, c.y = (a[u + 1] / e + 1) / 2, o.push(c.x, c.y);
    }
    for (let h = 1; h <= t; h++) n.push(h, h + 1, 0);
    this.setIndex(n), this.setAttribute("position", new DC(a, 3)), this.setAttribute("normal", new DC(r, 3)), this.setAttribute("uv", new DC(o, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new OI(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class RI extends HC {
  constructor(e = 1, t = 1, s = 1, i = 32, n = 1, a = !1, r = 0, o = 2 * Math.PI) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: s,
      radialSegments: i,
      heightSegments: n,
      openEnded: a,
      thetaStart: r,
      thetaLength: o
    };
    const l = this;
    i = Math.floor(i), n = Math.floor(n);
    const c = [],
      h = [],
      u = [],
      d = [];
    let p = 0;
    const m = [],
      f = s / 2;
    let g = 0;
    function v(s) {
      const n = p,
        a = new DA(),
        m = new HA();
      let v = 0;
      const b = !0 === s ? e : t,
        y = !0 === s ? 1 : -1;
      for (let e = 1; e <= i; e++) h.push(0, f * y, 0), u.push(0, y, 0), d.push(.5, .5), p++;
      const _ = p;
      for (let e = 0; e <= i; e++) {
        const t = e / i * o + r,
          s = Math.cos(t),
          n = Math.sin(t);
        m.x = b * n, m.y = f * y, m.z = b * s, h.push(m.x, m.y, m.z), u.push(0, y, 0), a.x = .5 * s + .5, a.y = .5 * n * y + .5, d.push(a.x, a.y), p++;
      }
      for (let e = 0; e < i; e++) {
        const t = n + e,
          i = _ + e;
        !0 === s ? c.push(i, i + 1, t) : c.push(i + 1, i, t), v += 3;
      }
      l.addGroup(g, v, !0 === s ? 1 : 2), g += v;
    }
    !function () {
      const a = new HA(),
        v = new HA();
      let b = 0;
      const y = (t - e) / s;
      for (let l = 0; l <= n; l++) {
        const c = [],
          g = l / n,
          b = g * (t - e) + e;
        for (let e = 0; e <= i; e++) {
          const t = e / i,
            n = t * o + r,
            l = Math.sin(n),
            m = Math.cos(n);
          v.x = b * l, v.y = -g * s + f, v.z = b * m, h.push(v.x, v.y, v.z), a.set(l, y, m).normalize(), u.push(a.x, a.y, a.z), d.push(t, 1 - g), c.push(p++);
        }
        m.push(c);
      }
      for (let e = 0; e < i; e++) for (let t = 0; t < n; t++) {
        const s = m[t][e],
          i = m[t + 1][e],
          n = m[t + 1][e + 1],
          a = m[t][e + 1];
        c.push(s, i, a), c.push(i, n, a), b += 6;
      }
      l.addGroup(g, b, 0), g += b;
    }(), !1 === a && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(c), this.setAttribute("position", new DC(h, 3)), this.setAttribute("normal", new DC(u, 3)), this.setAttribute("uv", new DC(d, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new RI(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class zI extends RI {
  constructor(e = 1, t = 1, s = 32, i = 1, n = !1, a = 0, r = 2 * Math.PI) {
    super(0, e, t, s, i, n, a, r), this.type = "ConeGeometry", this.parameters = {
      radius: e,
      height: t,
      radialSegments: s,
      heightSegments: i,
      openEnded: n,
      thetaStart: a,
      thetaLength: r
    };
  }
  static fromJSON(e) {
    return new zI(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class NI extends HC {
  constructor(e = [], t = [], s = 1, i = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: e,
      indices: t,
      radius: s,
      detail: i
    };
    const n = [],
      a = [];
    function r(e, t, s, i) {
      const n = i + 1,
        a = [];
      for (let r = 0; r <= n; r++) {
        a[r] = [];
        const i = e.clone().lerp(s, r / n),
          o = t.clone().lerp(s, r / n),
          l = n - r;
        for (let e = 0; e <= l; e++) a[r][e] = 0 === e && r === n ? i : i.clone().lerp(o, e / l);
      }
      for (let r = 0; r < n; r++) for (let e = 0; e < 2 * (n - r) - 1; e++) {
        const t = Math.floor(e / 2);
        e % 2 == 0 ? (o(a[r][t + 1]), o(a[r + 1][t]), o(a[r][t])) : (o(a[r][t + 1]), o(a[r + 1][t + 1]), o(a[r + 1][t]));
      }
    }
    function o(e) {
      n.push(e.x, e.y, e.z);
    }
    function l(t, s) {
      const i = 3 * t;
      s.x = e[i + 0], s.y = e[i + 1], s.z = e[i + 2];
    }
    function c(e, t, s, i) {
      i < 0 && 1 === e.x && (a[t] = e.x - 1), 0 === s.x && 0 === s.z && (a[t] = i / 2 / Math.PI + .5);
    }
    function h(e) {
      return Math.atan2(e.z, -e.x);
    }
    !function (e) {
      const s = new HA(),
        i = new HA(),
        n = new HA();
      for (let a = 0; a < t.length; a += 3) l(t[a + 0], s), l(t[a + 1], i), l(t[a + 2], n), r(s, i, n, e);
    }(i), function (e) {
      const t = new HA();
      for (let s = 0; s < n.length; s += 3) t.x = n[s + 0], t.y = n[s + 1], t.z = n[s + 2], t.normalize().multiplyScalar(e), n[s + 0] = t.x, n[s + 1] = t.y, n[s + 2] = t.z;
    }(s), function () {
      const e = new HA();
      for (let s = 0; s < n.length; s += 3) {
        e.x = n[s + 0], e.y = n[s + 1], e.z = n[s + 2];
        const i = h(e) / 2 / Math.PI + .5,
          r = (t = e, Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z)) / Math.PI + .5);
        a.push(i, 1 - r);
      }
      var t;
      (function () {
        const e = new HA(),
          t = new HA(),
          s = new HA(),
          i = new HA(),
          r = new DA(),
          o = new DA(),
          l = new DA();
        for (let u = 0, d = 0; u < n.length; u += 9, d += 6) {
          e.set(n[u + 0], n[u + 1], n[u + 2]), t.set(n[u + 3], n[u + 4], n[u + 5]), s.set(n[u + 6], n[u + 7], n[u + 8]), r.set(a[d + 0], a[d + 1]), o.set(a[d + 2], a[d + 3]), l.set(a[d + 4], a[d + 5]), i.copy(e).add(t).add(s).divideScalar(3);
          const p = h(i);
          c(r, d + 0, e, p), c(o, d + 2, t, p), c(l, d + 4, s, p);
        }
      })(), function () {
        for (let e = 0; e < a.length; e += 6) {
          const t = a[e + 0],
            s = a[e + 2],
            i = a[e + 4],
            n = Math.max(t, s, i),
            r = Math.min(t, s, i);
          n > .9 && r < .1 && (t < .2 && (a[e + 0] += 1), s < .2 && (a[e + 2] += 1), i < .2 && (a[e + 4] += 1));
        }
      }();
    }(), this.setAttribute("position", new DC(n, 3)), this.setAttribute("normal", new DC(n.slice(), 3)), this.setAttribute("uv", new DC(a, 2)), 0 === i ? this.computeVertexNormals() : this.normalizeNormals();
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new NI(e.vertices, e.indices, e.radius, e.details);
  }
}
class FI extends NI {
  constructor(e = 1, t = 0) {
    const s = (1 + Math.sqrt(5)) / 2,
      i = 1 / s;
    super([-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -s, 0, -i, s, 0, i, -s, 0, i, s, -i, -s, 0, -i, s, 0, i, -s, 0, i, s, 0, -s, 0, -i, s, 0, -i, -s, 0, i, s, 0, i], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t), this.type = "DodecahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new FI(e.radius, e.detail);
  }
}
const UI = new HA(),
  HI = new HA(),
  GI = new HA(),
  VI = new vC();
class WI extends kI {
  constructor(e) {
    super(e), this.uuid = SA(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let s = 0, i = this.holes.length; s < i; s++) t[s] = this.holes[s].getPoints(e);
    return t;
  }
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e), this.holes = [];
    for (let t = 0, s = e.holes.length; t < s; t++) {
      const s = e.holes[t];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid, e.holes = [];
    for (let t = 0, s = this.holes.length; t < s; t++) {
      const s = this.holes[t];
      e.holes.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
    for (let t = 0, s = e.holes.length; t < s; t++) {
      const s = e.holes[t];
      this.holes.push(new kI().fromJSON(s));
    }
    return this;
  }
}
const jI = function (e, t, s = 2) {
  const i = t && t.length,
    n = i ? t[0] * s : e.length;
  let a = qI(e, 0, n, s, !0);
  const r = [];
  if (!a || a.next === a.prev) return r;
  let o, l, c, h, u, d, p;
  if (i && (a = function (e, t, s, i) {
    const n = [];
    let a, r, o, l, c;
    for (a = 0, r = t.length; a < r; a++) o = t[a] * i, l = a < r - 1 ? t[a + 1] * i : e.length, c = qI(e, o, l, i, !1), c === c.next && (c.steiner = !0), n.push(ik(c));
    for (n.sort(KI), a = 0; a < n.length; a++) s = ek(n[a], s);
    return s;
  }(e, t, a, s)), e.length > 80 * s) {
    o = c = e[0], l = h = e[1];
    for (let t = s; t < n; t += s) u = e[t], d = e[t + 1], u < o && (o = u), d < l && (l = d), u > c && (c = u), d > h && (h = d);
    p = Math.max(c - o, h - l), p = 0 !== p ? 32767 / p : 0;
  }
  return $I(a, r, s, o, l, p, 0), r;
};
function qI(e, t, s, i, n) {
  let a, r;
  if (n === function (e, t, s, i) {
    let n = 0;
    for (let a = t, r = s - i; a < s; a += i) n += (e[r] - e[a]) * (e[a + 1] + e[r + 1]), r = a;
    return n;
  }(e, t, s, i) > 0) for (a = t; a < s; a += i) r = pk(a, e[a], e[a + 1], r);else for (a = s - i; a >= t; a -= i) r = pk(a, e[a], e[a + 1], r);
  return r && ok(r, r.next) && (mk(r), r = r.next), r;
}
function ZI(e, t) {
  if (!e) return e;
  t || (t = e);
  let s,
    i = e;
  do {
    if (s = !1, i.steiner || !ok(i, i.next) && 0 !== rk(i.prev, i, i.next)) i = i.next;else {
      if (mk(i), i = t = i.prev, i === i.next) break;
      s = !0;
    }
  } while (s || i !== t);
  return t;
}
function $I(e, t, s, i, n, a, r) {
  if (!e) return;
  !r && a && function (e, t, s, i) {
    let n = e;
    do {
      0 === n.z && (n.z = sk(n.x, n.y, t, s, i)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next;
    } while (n !== e);
    n.prevZ.nextZ = null, n.prevZ = null, function (e) {
      let t,
        s,
        i,
        n,
        a,
        r,
        o,
        l,
        c = 1;
      do {
        for (s = e, e = null, a = null, r = 0; s;) {
          for (r++, i = s, o = 0, t = 0; t < c && (o++, i = i.nextZ, i); t++);
          for (l = c; o > 0 || l > 0 && i;) 0 !== o && (0 === l || !i || s.z <= i.z) ? (n = s, s = s.nextZ, o--) : (n = i, i = i.nextZ, l--), a ? a.nextZ = n : e = n, n.prevZ = a, a = n;
          s = i;
        }
        a.nextZ = null, c *= 2;
      } while (r > 1);
    }(n);
  }(e, i, n, a);
  let o,
    l,
    c = e;
  for (; e.prev !== e.next;) if (o = e.prev, l = e.next, a ? YI(e, i, n, a) : XI(e)) t.push(o.i / s | 0), t.push(e.i / s | 0), t.push(l.i / s | 0), mk(e), e = l.next, c = l.next;else if ((e = l) === c) {
    r ? 1 === r ? $I(e = JI(ZI(e), t, s), t, s, i, n, a, 2) : 2 === r && QI(e, t, s, i, n, a) : $I(ZI(e), t, s, i, n, a, 1);
    break;
  }
}
function XI(e) {
  const t = e.prev,
    s = e,
    i = e.next;
  if (rk(t, s, i) >= 0) return !1;
  const n = t.x,
    a = s.x,
    r = i.x,
    o = t.y,
    l = s.y,
    c = i.y,
    h = n < a ? n < r ? n : r : a < r ? a : r,
    u = o < l ? o < c ? o : c : l < c ? l : c,
    d = n > a ? n > r ? n : r : a > r ? a : r,
    p = o > l ? o > c ? o : c : l > c ? l : c;
  let m = i.next;
  for (; m !== t;) {
    if (m.x >= h && m.x <= d && m.y >= u && m.y <= p && nk(n, o, a, l, r, c, m.x, m.y) && rk(m.prev, m, m.next) >= 0) return !1;
    m = m.next;
  }
  return !0;
}
function YI(e, t, s, i) {
  const n = e.prev,
    a = e,
    r = e.next;
  if (rk(n, a, r) >= 0) return !1;
  const o = n.x,
    l = a.x,
    c = r.x,
    h = n.y,
    u = a.y,
    d = r.y,
    p = o < l ? o < c ? o : c : l < c ? l : c,
    m = h < u ? h < d ? h : d : u < d ? u : d,
    f = o > l ? o > c ? o : c : l > c ? l : c,
    g = h > u ? h > d ? h : d : u > d ? u : d,
    v = sk(p, m, t, s, i),
    b = sk(f, g, t, s, i);
  let y = e.prevZ,
    _ = e.nextZ;
  for (; y && y.z >= v && _ && _.z <= b;) {
    if (y.x >= p && y.x <= f && y.y >= m && y.y <= g && y !== n && y !== r && nk(o, h, l, u, c, d, y.x, y.y) && rk(y.prev, y, y.next) >= 0) return !1;
    if (y = y.prevZ, _.x >= p && _.x <= f && _.y >= m && _.y <= g && _ !== n && _ !== r && nk(o, h, l, u, c, d, _.x, _.y) && rk(_.prev, _, _.next) >= 0) return !1;
    _ = _.nextZ;
  }
  for (; y && y.z >= v;) {
    if (y.x >= p && y.x <= f && y.y >= m && y.y <= g && y !== n && y !== r && nk(o, h, l, u, c, d, y.x, y.y) && rk(y.prev, y, y.next) >= 0) return !1;
    y = y.prevZ;
  }
  for (; _ && _.z <= b;) {
    if (_.x >= p && _.x <= f && _.y >= m && _.y <= g && _ !== n && _ !== r && nk(o, h, l, u, c, d, _.x, _.y) && rk(_.prev, _, _.next) >= 0) return !1;
    _ = _.nextZ;
  }
  return !0;
}
function JI(e, t, s) {
  let i = e;
  do {
    const n = i.prev,
      a = i.next.next;
    !ok(n, a) && lk(n, i, i.next, a) && uk(n, a) && uk(a, n) && (t.push(n.i / s | 0), t.push(i.i / s | 0), t.push(a.i / s | 0), mk(i), mk(i.next), i = e = a), i = i.next;
  } while (i !== e);
  return ZI(i);
}
function QI(e, t, s, i, n, a) {
  let r = e;
  do {
    let e = r.next.next;
    for (; e !== r.prev;) {
      if (r.i !== e.i && ak(r, e)) {
        let o = dk(r, e);
        return r = ZI(r, r.next), o = ZI(o, o.next), $I(r, t, s, i, n, a, 0), void $I(o, t, s, i, n, a, 0);
      }
      e = e.next;
    }
    r = r.next;
  } while (r !== e);
}
function KI(e, t) {
  return e.x - t.x;
}
function ek(e, t) {
  const s = function (e, t) {
    let s,
      i = t,
      n = -Infinity;
    const a = e.x,
      r = e.y;
    do {
      if (r <= i.y && r >= i.next.y && i.next.y !== i.y) {
        const e = i.x + (r - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
        if (e <= a && e > n && (n = e, s = i.x < i.next.x ? i : i.next, e === a)) return s;
      }
      i = i.next;
    } while (i !== t);
    if (!s) return null;
    const o = s,
      l = s.x,
      c = s.y;
    let h,
      u = Infinity;
    i = s;
    do {
      a >= i.x && i.x >= l && a !== i.x && nk(r < c ? a : n, r, l, c, r < c ? n : a, r, i.x, i.y) && (h = Math.abs(r - i.y) / (a - i.x), uk(i, e) && (h < u || h === u && (i.x > s.x || i.x === s.x && tk(s, i))) && (s = i, u = h)), i = i.next;
    } while (i !== o);
    return s;
  }(e, t);
  if (!s) return t;
  const i = dk(s, e);
  return ZI(i, i.next), ZI(s, s.next);
}
function tk(e, t) {
  return rk(e.prev, e, t.prev) < 0 && rk(t.next, e, e.next) < 0;
}
function sk(e, t, s, i, n) {
  return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = (e - s) * n | 0) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - i) * n | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1;
}
function ik(e) {
  let t = e,
    s = e;
  do {
    (t.x < s.x || t.x === s.x && t.y < s.y) && (s = t), t = t.next;
  } while (t !== e);
  return s;
}
function nk(e, t, s, i, n, a, r, o) {
  return (n - r) * (t - o) >= (e - r) * (a - o) && (e - r) * (i - o) >= (s - r) * (t - o) && (s - r) * (a - o) >= (n - r) * (i - o);
}
function ak(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !function (e, t) {
    let s = e;
    do {
      if (s.i !== e.i && s.next.i !== e.i && s.i !== t.i && s.next.i !== t.i && lk(s, s.next, e, t)) return !0;
      s = s.next;
    } while (s !== e);
    return !1;
  }(e, t) && (uk(e, t) && uk(t, e) && function (e, t) {
    let s = e,
      i = !1;
    const n = (e.x + t.x) / 2,
      a = (e.y + t.y) / 2;
    do {
      s.y > a != s.next.y > a && s.next.y !== s.y && n < (s.next.x - s.x) * (a - s.y) / (s.next.y - s.y) + s.x && (i = !i), s = s.next;
    } while (s !== e);
    return i;
  }(e, t) && (rk(e.prev, e, t.prev) || rk(e, t.prev, t)) || ok(e, t) && rk(e.prev, e, e.next) > 0 && rk(t.prev, t, t.next) > 0);
}
function rk(e, t, s) {
  return (t.y - e.y) * (s.x - t.x) - (t.x - e.x) * (s.y - t.y);
}
function ok(e, t) {
  return e.x === t.x && e.y === t.y;
}
function lk(e, t, s, i) {
  const n = hk(rk(e, t, s)),
    a = hk(rk(e, t, i)),
    r = hk(rk(s, i, e)),
    o = hk(rk(s, i, t));
  return n !== a && r !== o || !(0 !== n || !ck(e, s, t)) || !(0 !== a || !ck(e, i, t)) || !(0 !== r || !ck(s, e, i)) || !(0 !== o || !ck(s, t, i));
}
function ck(e, t, s) {
  return t.x <= Math.max(e.x, s.x) && t.x >= Math.min(e.x, s.x) && t.y <= Math.max(e.y, s.y) && t.y >= Math.min(e.y, s.y);
}
function hk(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function uk(e, t) {
  return rk(e.prev, e, e.next) < 0 ? rk(e, t, e.next) >= 0 && rk(e, e.prev, t) >= 0 : rk(e, t, e.prev) < 0 || rk(e, e.next, t) < 0;
}
function dk(e, t) {
  const s = new fk(e.i, e.x, e.y),
    i = new fk(t.i, t.x, t.y),
    n = e.next,
    a = t.prev;
  return e.next = t, t.prev = e, s.next = n, n.prev = s, i.next = s, s.prev = i, a.next = i, i.prev = a, i;
}
function pk(e, t, s, i) {
  const n = new fk(e, t, s);
  return i ? (n.next = i.next, n.prev = i, i.next.prev = n, i.next = n) : (n.prev = n, n.next = n), n;
}
function mk(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function fk(e, t, s) {
  this.i = e, this.x = t, this.y = s, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
class gk {
  static area(e) {
    const t = e.length;
    let s = 0;
    for (let i = t - 1, n = 0; n < t; i = n++) s += e[i].x * e[n].y - e[n].x * e[i].y;
    return .5 * s;
  }
  static isClockWise(e) {
    return gk.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const s = [],
      i = [],
      n = [];
    vk(e), bk(s, e);
    let a = e.length;
    t.forEach(vk);
    for (let o = 0; o < t.length; o++) i.push(a), a += t[o].length, bk(s, t[o]);
    const r = jI(s, i);
    for (let o = 0; o < r.length; o += 3) n.push(r.slice(o, o + 3));
    return n;
  }
}
function vk(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function bk(e, t) {
  for (let s = 0; s < t.length; s++) e.push(t[s].x), e.push(t[s].y);
}
class yk extends HC {
  constructor(e = new WI([new DA(.5, .5), new DA(-.5, .5), new DA(-.5, -.5), new DA(.5, -.5)]), t = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: e,
      options: t
    }, e = Array.isArray(e) ? e : [e];
    const s = this,
      i = [],
      n = [];
    for (let r = 0, o = e.length; r < o; r++) {
      a(e[r]);
    }
    function a(e) {
      const a = [],
        r = void 0 !== t.curveSegments ? t.curveSegments : 12,
        o = void 0 !== t.steps ? t.steps : 1,
        l = void 0 !== t.depth ? t.depth : 1;
      let c = void 0 === t.bevelEnabled || t.bevelEnabled,
        h = void 0 !== t.bevelThickness ? t.bevelThickness : .2,
        u = void 0 !== t.bevelSize ? t.bevelSize : h - .1,
        d = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
        p = void 0 !== t.bevelSegments ? t.bevelSegments : 3;
      const m = t.extrudePath,
        f = void 0 !== t.UVGenerator ? t.UVGenerator : _k;
      let g,
        v,
        b,
        y,
        _,
        x = !1;
      m && (g = m.getSpacedPoints(o), x = !0, c = !1, v = m.computeFrenetFrames(o, !1), b = new HA(), y = new HA(), _ = new HA()), c || (p = 0, h = 0, u = 0, d = 0);
      const w = e.extractPoints(r);
      let S = w.shape;
      const A = w.holes;
      if (!gk.isClockWise(S)) {
        S = S.reverse();
        for (let e = 0, t = A.length; e < t; e++) {
          const t = A[e];
          gk.isClockWise(t) && (A[e] = t.reverse());
        }
      }
      const M = gk.triangulateShape(S, A),
        C = S;
      for (let t = 0, s = A.length; t < s; t++) {
        const e = A[t];
        S = S.concat(e);
      }
      function P(e, t, s) {
        return e.clone().addScaledVector(t, s);
      }
      const T = S.length,
        E = M.length;
      function B(e, t, s) {
        let i, n, a;
        const r = e.x - t.x,
          o = e.y - t.y,
          l = s.x - e.x,
          c = s.y - e.y,
          h = r * r + o * o,
          u = r * c - o * l;
        if (Math.abs(u) > Number.EPSILON) {
          const u = Math.sqrt(h),
            d = Math.sqrt(l * l + c * c),
            p = t.x - o / u,
            m = t.y + r / u,
            f = ((s.x - c / d - p) * c - (s.y + l / d - m) * l) / (r * c - o * l);
          i = p + r * f - e.x, n = m + o * f - e.y;
          const g = i * i + n * n;
          if (g <= 2) return new DA(i, n);
          a = Math.sqrt(g / 2);
        } else {
          let e = !1;
          r > Number.EPSILON ? l > Number.EPSILON && (e = !0) : r < -Number.EPSILON ? l < -Number.EPSILON && (e = !0) : Math.sign(o) === Math.sign(c) && (e = !0), e ? (i = -o, n = r, a = Math.sqrt(h)) : (i = r, n = o, a = Math.sqrt(h / 2));
        }
        return new DA(i / a, n / a);
      }
      const I = [];
      for (let t = 0, s = C.length, i = s - 1, n = t + 1; t < s; t++, i++, n++) i === s && (i = 0), n === s && (n = 0), I[t] = B(C[t], C[i], C[n]);
      const k = [];
      let D,
        L = I.concat();
      for (let t = 0, s = A.length; t < s; t++) {
        const e = A[t];
        D = [];
        for (let t = 0, s = e.length, i = s - 1, n = t + 1; t < s; t++, i++, n++) i === s && (i = 0), n === s && (n = 0), D[t] = B(e[t], e[i], e[n]);
        k.push(D), L = L.concat(D);
      }
      for (let t = 0; t < p; t++) {
        const e = t / p,
          s = h * Math.cos(e * Math.PI / 2),
          i = u * Math.sin(e * Math.PI / 2) + d;
        for (let t = 0, n = C.length; t < n; t++) {
          const e = P(C[t], I[t], i);
          z(e.x, e.y, -s);
        }
        for (let t = 0, n = A.length; t < n; t++) {
          const e = A[t];
          D = k[t];
          for (let t = 0, n = e.length; t < n; t++) {
            const n = P(e[t], D[t], i);
            z(n.x, n.y, -s);
          }
        }
      }
      const O = u + d;
      for (let t = 0; t < T; t++) {
        const e = c ? P(S[t], L[t], O) : S[t];
        x ? (y.copy(v.normals[0]).multiplyScalar(e.x), b.copy(v.binormals[0]).multiplyScalar(e.y), _.copy(g[0]).add(y).add(b), z(_.x, _.y, _.z)) : z(e.x, e.y, 0);
      }
      for (let t = 1; t <= o; t++) for (let e = 0; e < T; e++) {
        const s = c ? P(S[e], L[e], O) : S[e];
        x ? (y.copy(v.normals[t]).multiplyScalar(s.x), b.copy(v.binormals[t]).multiplyScalar(s.y), _.copy(g[t]).add(y).add(b), z(_.x, _.y, _.z)) : z(s.x, s.y, l / o * t);
      }
      for (let t = p - 1; t >= 0; t--) {
        const e = t / p,
          s = h * Math.cos(e * Math.PI / 2),
          i = u * Math.sin(e * Math.PI / 2) + d;
        for (let t = 0, n = C.length; t < n; t++) {
          const e = P(C[t], I[t], i);
          z(e.x, e.y, l + s);
        }
        for (let t = 0, n = A.length; t < n; t++) {
          const e = A[t];
          D = k[t];
          for (let t = 0, n = e.length; t < n; t++) {
            const n = P(e[t], D[t], i);
            x ? z(n.x, n.y + g[o - 1].y, g[o - 1].x + s) : z(n.x, n.y, l + s);
          }
        }
      }
      function R(e, t) {
        let s = e.length;
        for (; --s >= 0;) {
          const i = s;
          let n = s - 1;
          n < 0 && (n = e.length - 1);
          for (let e = 0, s = o + 2 * p; e < s; e++) {
            const s = T * e,
              a = T * (e + 1);
            F(t + i + s, t + n + s, t + n + a, t + i + a);
          }
        }
      }
      function z(e, t, s) {
        a.push(e), a.push(t), a.push(s);
      }
      function N(e, t, n) {
        U(e), U(t), U(n);
        const a = i.length / 3,
          r = f.generateTopUV(s, i, a - 3, a - 2, a - 1);
        H(r[0]), H(r[1]), H(r[2]);
      }
      function F(e, t, n, a) {
        U(e), U(t), U(a), U(t), U(n), U(a);
        const r = i.length / 3,
          o = f.generateSideWallUV(s, i, r - 6, r - 3, r - 2, r - 1);
        H(o[0]), H(o[1]), H(o[3]), H(o[1]), H(o[2]), H(o[3]);
      }
      function U(e) {
        i.push(a[3 * e + 0]), i.push(a[3 * e + 1]), i.push(a[3 * e + 2]);
      }
      function H(e) {
        n.push(e.x), n.push(e.y);
      }
      !function () {
        const e = i.length / 3;
        if (c) {
          let e = 0,
            t = T * e;
          for (let s = 0; s < E; s++) {
            const e = M[s];
            N(e[2] + t, e[1] + t, e[0] + t);
          }
          e = o + 2 * p, t = T * e;
          for (let s = 0; s < E; s++) {
            const e = M[s];
            N(e[0] + t, e[1] + t, e[2] + t);
          }
        } else {
          for (let e = 0; e < E; e++) {
            const t = M[e];
            N(t[2], t[1], t[0]);
          }
          for (let e = 0; e < E; e++) {
            const t = M[e];
            N(t[0] + T * o, t[1] + T * o, t[2] + T * o);
          }
        }
        s.addGroup(e, i.length / 3 - e, 0);
      }(), function () {
        const e = i.length / 3;
        let t = 0;
        R(C, t), t += C.length;
        for (let s = 0, i = A.length; s < i; s++) {
          const e = A[s];
          R(e, t), t += e.length;
        }
        s.addGroup(e, i.length / 3 - e, 1);
      }();
    }
    this.setAttribute("position", new DC(i, 3)), this.setAttribute("uv", new DC(n, 2)), this.computeVertexNormals();
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return function (e, t, s) {
      if (s.shapes = [], Array.isArray(e)) for (let i = 0, n = e.length; i < n; i++) {
        const t = e[i];
        s.shapes.push(t.uuid);
      } else s.shapes.push(e.uuid);
      s.options = Object.assign({}, t), void 0 !== t.extrudePath && (s.options.extrudePath = t.extrudePath.toJSON());
      return s;
    }(this.parameters.shapes, this.parameters.options, e);
  }
  static fromJSON(e, t) {
    const s = [];
    for (let n = 0, a = e.shapes.length; n < a; n++) {
      const i = t[e.shapes[n]];
      s.push(i);
    }
    const i = e.options.extrudePath;
    return void 0 !== i && (e.options.extrudePath = new BI[i.type]().fromJSON(i)), new yk(s, e.options);
  }
}
const _k = {
  generateTopUV: function (e, t, s, i, n) {
    const a = t[3 * s],
      r = t[3 * s + 1],
      o = t[3 * i],
      l = t[3 * i + 1],
      c = t[3 * n],
      h = t[3 * n + 1];
    return [new DA(a, r), new DA(o, l), new DA(c, h)];
  },
  generateSideWallUV: function (e, t, s, i, n, a) {
    const r = t[3 * s],
      o = t[3 * s + 1],
      l = t[3 * s + 2],
      c = t[3 * i],
      h = t[3 * i + 1],
      u = t[3 * i + 2],
      d = t[3 * n],
      p = t[3 * n + 1],
      m = t[3 * n + 2],
      f = t[3 * a],
      g = t[3 * a + 1],
      v = t[3 * a + 2];
    return Math.abs(o - h) < Math.abs(r - c) ? [new DA(r, 1 - l), new DA(c, 1 - u), new DA(d, 1 - m), new DA(f, 1 - v)] : [new DA(o, 1 - l), new DA(h, 1 - u), new DA(p, 1 - m), new DA(g, 1 - v)];
  }
};
class xk extends NI {
  constructor(e = 1, t = 0) {
    const s = (1 + Math.sqrt(5)) / 2;
    super([-1, s, 0, 1, s, 0, -1, -s, 0, 1, -s, 0, 0, -1, s, 0, 1, s, 0, -1, -s, 0, 1, -s, s, 0, -1, s, 0, 1, -s, 0, -1, -s, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new xk(e.radius, e.detail);
  }
}
class wk extends NI {
  constructor(e = 1, t = 0) {
    super([1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new wk(e.radius, e.detail);
  }
}
class Sk extends HC {
  constructor(e = .5, t = 1, s = 32, i = 1, n = 0, a = 2 * Math.PI) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: e,
      outerRadius: t,
      thetaSegments: s,
      phiSegments: i,
      thetaStart: n,
      thetaLength: a
    }, s = Math.max(3, s);
    const r = [],
      o = [],
      l = [],
      c = [];
    let h = e;
    const u = (t - e) / (i = Math.max(1, i)),
      d = new HA(),
      p = new DA();
    for (let m = 0; m <= i; m++) {
      for (let e = 0; e <= s; e++) {
        const i = n + e / s * a;
        d.x = h * Math.cos(i), d.y = h * Math.sin(i), o.push(d.x, d.y, d.z), l.push(0, 0, 1), p.x = (d.x / t + 1) / 2, p.y = (d.y / t + 1) / 2, c.push(p.x, p.y);
      }
      h += u;
    }
    for (let m = 0; m < i; m++) {
      const e = m * (s + 1);
      for (let t = 0; t < s; t++) {
        const i = t + e,
          n = i,
          a = i + s + 1,
          o = i + s + 2,
          l = i + 1;
        r.push(n, a, l), r.push(a, o, l);
      }
    }
    this.setIndex(r), this.setAttribute("position", new DC(o, 3)), this.setAttribute("normal", new DC(l, 3)), this.setAttribute("uv", new DC(c, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Sk(e.innerRadius, e.outerRadius, e.thetaSegments, e.phiSegments, e.thetaStart, e.thetaLength);
  }
}
class Ak extends HC {
  constructor(e = new WI([new DA(0, .5), new DA(-.5, -.5), new DA(.5, -.5)]), t = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: e,
      curveSegments: t
    };
    const s = [],
      i = [],
      n = [],
      a = [];
    let r = 0,
      o = 0;
    if (!1 === Array.isArray(e)) l(e);else for (let c = 0; c < e.length; c++) l(e[c]), this.addGroup(r, o, c), r += o, o = 0;
    function l(e) {
      const r = i.length / 3,
        l = e.extractPoints(t);
      let c = l.shape;
      const h = l.holes;
      !1 === gk.isClockWise(c) && (c = c.reverse());
      for (let t = 0, s = h.length; t < s; t++) {
        const e = h[t];
        !0 === gk.isClockWise(e) && (h[t] = e.reverse());
      }
      const u = gk.triangulateShape(c, h);
      for (let t = 0, s = h.length; t < s; t++) {
        const e = h[t];
        c = c.concat(e);
      }
      for (let t = 0, s = c.length; t < s; t++) {
        const e = c[t];
        i.push(e.x, e.y, 0), n.push(0, 0, 1), a.push(e.x, e.y);
      }
      for (let t = 0, i = u.length; t < i; t++) {
        const e = u[t],
          i = e[0] + r,
          n = e[1] + r,
          a = e[2] + r;
        s.push(i, n, a), o += 3;
      }
    }
    this.setIndex(s), this.setAttribute("position", new DC(i, 3)), this.setAttribute("normal", new DC(n, 3)), this.setAttribute("uv", new DC(a, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return function (e, t) {
      if (t.shapes = [], Array.isArray(e)) for (let s = 0, i = e.length; s < i; s++) {
        const i = e[s];
        t.shapes.push(i.uuid);
      } else t.shapes.push(e.uuid);
      return t;
    }(this.parameters.shapes, e);
  }
  static fromJSON(e, t) {
    const s = [];
    for (let i = 0, n = e.shapes.length; i < n; i++) {
      const n = t[e.shapes[i]];
      s.push(n);
    }
    return new Ak(s, e.curveSegments);
  }
}
class Mk extends HC {
  constructor(e = 1, t = 32, s = 16, i = 0, n = 2 * Math.PI, a = 0, r = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: s,
      phiStart: i,
      phiLength: n,
      thetaStart: a,
      thetaLength: r
    }, t = Math.max(3, Math.floor(t)), s = Math.max(2, Math.floor(s));
    const o = Math.min(a + r, Math.PI);
    let l = 0;
    const c = [],
      h = new HA(),
      u = new HA(),
      d = [],
      p = [],
      m = [],
      f = [];
    for (let g = 0; g <= s; g++) {
      const d = [],
        v = g / s;
      let b = 0;
      0 == g && 0 == a ? b = .5 / t : g == s && o == Math.PI && (b = -.5 / t);
      for (let s = 0; s <= t; s++) {
        const o = s / t;
        h.x = -e * Math.cos(i + o * n) * Math.sin(a + v * r), h.y = e * Math.cos(a + v * r), h.z = e * Math.sin(i + o * n) * Math.sin(a + v * r), p.push(h.x, h.y, h.z), u.copy(h).normalize(), m.push(u.x, u.y, u.z), f.push(o + b, 1 - v), d.push(l++);
      }
      c.push(d);
    }
    for (let g = 0; g < s; g++) for (let e = 0; e < t; e++) {
      const t = c[g][e + 1],
        i = c[g][e],
        n = c[g + 1][e],
        r = c[g + 1][e + 1];
      (0 !== g || a > 0) && d.push(t, i, r), (g !== s - 1 || o < Math.PI) && d.push(i, n, r);
    }
    this.setIndex(d), this.setAttribute("position", new DC(p, 3)), this.setAttribute("normal", new DC(m, 3)), this.setAttribute("uv", new DC(f, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Mk(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class Ck extends NI {
  constructor(e = 1, t = 0) {
    super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new Ck(e.radius, e.detail);
  }
}
class Pk extends HC {
  constructor(e = 1, t = .4, s = 12, i = 48, n = 2 * Math.PI) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: e,
      tube: t,
      radialSegments: s,
      tubularSegments: i,
      arc: n
    }, s = Math.floor(s), i = Math.floor(i);
    const a = [],
      r = [],
      o = [],
      l = [],
      c = new HA(),
      h = new HA(),
      u = new HA();
    for (let d = 0; d <= s; d++) for (let a = 0; a <= i; a++) {
      const p = a / i * n,
        m = d / s * Math.PI * 2;
      h.x = (e + t * Math.cos(m)) * Math.cos(p), h.y = (e + t * Math.cos(m)) * Math.sin(p), h.z = t * Math.sin(m), r.push(h.x, h.y, h.z), c.x = e * Math.cos(p), c.y = e * Math.sin(p), u.subVectors(h, c).normalize(), o.push(u.x, u.y, u.z), l.push(a / i), l.push(d / s);
    }
    for (let d = 1; d <= s; d++) for (let e = 1; e <= i; e++) {
      const t = (i + 1) * d + e - 1,
        s = (i + 1) * (d - 1) + e - 1,
        n = (i + 1) * (d - 1) + e,
        r = (i + 1) * d + e;
      a.push(t, s, r), a.push(s, n, r);
    }
    this.setIndex(a), this.setAttribute("position", new DC(r, 3)), this.setAttribute("normal", new DC(o, 3)), this.setAttribute("uv", new DC(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Pk(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
  }
}
class Tk extends HC {
  constructor(e = 1, t = .4, s = 64, i = 8, n = 2, a = 3) {
    super(), this.type = "TorusKnotGeometry", this.parameters = {
      radius: e,
      tube: t,
      tubularSegments: s,
      radialSegments: i,
      p: n,
      q: a
    }, s = Math.floor(s), i = Math.floor(i);
    const r = [],
      o = [],
      l = [],
      c = [],
      h = new HA(),
      u = new HA(),
      d = new HA(),
      p = new HA(),
      m = new HA(),
      f = new HA(),
      g = new HA();
    for (let b = 0; b <= s; ++b) {
      const r = b / s * n * Math.PI * 2;
      v(r, n, a, e, d), v(r + .01, n, a, e, p), f.subVectors(p, d), g.addVectors(p, d), m.crossVectors(f, g), g.crossVectors(m, f), m.normalize(), g.normalize();
      for (let e = 0; e <= i; ++e) {
        const n = e / i * Math.PI * 2,
          a = -t * Math.cos(n),
          r = t * Math.sin(n);
        h.x = d.x + (a * g.x + r * m.x), h.y = d.y + (a * g.y + r * m.y), h.z = d.z + (a * g.z + r * m.z), o.push(h.x, h.y, h.z), u.subVectors(h, d).normalize(), l.push(u.x, u.y, u.z), c.push(b / s), c.push(e / i);
      }
    }
    for (let b = 1; b <= s; b++) for (let e = 1; e <= i; e++) {
      const t = (i + 1) * (b - 1) + (e - 1),
        s = (i + 1) * b + (e - 1),
        n = (i + 1) * b + e,
        a = (i + 1) * (b - 1) + e;
      r.push(t, s, a), r.push(s, n, a);
    }
    function v(e, t, s, i, n) {
      const a = Math.cos(e),
        r = Math.sin(e),
        o = s / t * e,
        l = Math.cos(o);
      n.x = i * (2 + l) * .5 * a, n.y = i * (2 + l) * r * .5, n.z = i * Math.sin(o) * .5;
    }
    this.setIndex(r), this.setAttribute("position", new DC(o, 3)), this.setAttribute("normal", new DC(l, 3)), this.setAttribute("uv", new DC(c, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Tk(e.radius, e.tube, e.tubularSegments, e.radialSegments, e.p, e.q);
  }
}
class Ek extends HC {
  constructor(e = new TI(new HA(-1, -1, 0), new HA(-1, 1, 0), new HA(1, 1, 0)), t = 64, s = 1, i = 8, n = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: e,
      tubularSegments: t,
      radius: s,
      radialSegments: i,
      closed: n
    };
    const a = e.computeFrenetFrames(t, n);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    const r = new HA(),
      o = new HA(),
      l = new DA();
    let c = new HA();
    const h = [],
      u = [],
      d = [],
      p = [];
    function m(n) {
      c = e.getPointAt(n / t, c);
      const l = a.normals[n],
        d = a.binormals[n];
      for (let e = 0; e <= i; e++) {
        const t = e / i * Math.PI * 2,
          n = Math.sin(t),
          a = -Math.cos(t);
        o.x = a * l.x + n * d.x, o.y = a * l.y + n * d.y, o.z = a * l.z + n * d.z, o.normalize(), u.push(o.x, o.y, o.z), r.x = c.x + s * o.x, r.y = c.y + s * o.y, r.z = c.z + s * o.z, h.push(r.x, r.y, r.z);
      }
    }
    !function () {
      for (let e = 0; e < t; e++) m(e);
      m(!1 === n ? t : 0), function () {
        for (let e = 0; e <= t; e++) for (let s = 0; s <= i; s++) l.x = e / t, l.y = s / i, d.push(l.x, l.y);
      }(), function () {
        for (let e = 1; e <= t; e++) for (let t = 1; t <= i; t++) {
          const s = (i + 1) * (e - 1) + (t - 1),
            n = (i + 1) * e + (t - 1),
            a = (i + 1) * e + t,
            r = (i + 1) * (e - 1) + t;
          p.push(s, n, r), p.push(n, a, r);
        }
      }();
    }(), this.setIndex(p), this.setAttribute("position", new DC(h, 3)), this.setAttribute("normal", new DC(u, 3)), this.setAttribute("uv", new DC(d, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.path = this.parameters.path.toJSON(), e;
  }
  static fromJSON(e) {
    return new Ek(new BI[e.path.type]().fromJSON(e.path), e.tubularSegments, e.radius, e.radialSegments, e.closed);
  }
}
function Bk(e, t, s) {
  const i = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,
    n = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
  return !0 !== s.has(i) && !0 !== s.has(n) && (s.add(i), s.add(n), !0);
}
const Ik = Object.freeze(Object.defineProperty({
  __proto__: null,
  BoxGeometry: nP,
  CapsuleGeometry: LI,
  CircleGeometry: OI,
  ConeGeometry: zI,
  CylinderGeometry: RI,
  DodecahedronGeometry: FI,
  EdgesGeometry: class extends HC {
    constructor(e = null, t = 1) {
      if (super(), this.type = "EdgesGeometry", this.parameters = {
        geometry: e,
        thresholdAngle: t
      }, null !== e) {
        const s = 4,
          i = Math.pow(10, s),
          n = Math.cos(xA * t),
          a = e.getIndex(),
          r = e.getAttribute("position"),
          o = a ? a.count : r.count,
          l = [0, 0, 0],
          c = ["a", "b", "c"],
          h = new Array(3),
          u = {},
          d = [];
        for (let e = 0; e < o; e += 3) {
          a ? (l[0] = a.getX(e), l[1] = a.getX(e + 1), l[2] = a.getX(e + 2)) : (l[0] = e, l[1] = e + 1, l[2] = e + 2);
          const {
            a: t,
            b: s,
            c: o
          } = VI;
          if (t.fromBufferAttribute(r, l[0]), s.fromBufferAttribute(r, l[1]), o.fromBufferAttribute(r, l[2]), VI.getNormal(GI), h[0] = `${Math.round(t.x * i)},${Math.round(t.y * i)},${Math.round(t.z * i)}`, h[1] = `${Math.round(s.x * i)},${Math.round(s.y * i)},${Math.round(s.z * i)}`, h[2] = `${Math.round(o.x * i)},${Math.round(o.y * i)},${Math.round(o.z * i)}`, h[0] !== h[1] && h[1] !== h[2] && h[2] !== h[0]) for (let e = 0; e < 3; e++) {
            const t = (e + 1) % 3,
              s = h[e],
              i = h[t],
              a = VI[c[e]],
              r = VI[c[t]],
              o = `${s}_${i}`,
              p = `${i}_${s}`;
            p in u && u[p] ? (GI.dot(u[p].normal) <= n && (d.push(a.x, a.y, a.z), d.push(r.x, r.y, r.z)), u[p] = null) : o in u || (u[o] = {
              index0: l[e],
              index1: l[t],
              normal: GI.clone()
            });
          }
        }
        for (const e in u) if (u[e]) {
          const {
            index0: t,
            index1: s
          } = u[e];
          UI.fromBufferAttribute(r, t), HI.fromBufferAttribute(r, s), d.push(UI.x, UI.y, UI.z), d.push(HI.x, HI.y, HI.z);
        }
        this.setAttribute("position", new DC(d, 3));
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
    }
  },
  ExtrudeGeometry: yk,
  IcosahedronGeometry: xk,
  LatheGeometry: DI,
  OctahedronGeometry: wk,
  PlaneGeometry: MP,
  PolyhedronGeometry: NI,
  RingGeometry: Sk,
  ShapeGeometry: Ak,
  SphereGeometry: Mk,
  TetrahedronGeometry: Ck,
  TorusGeometry: Pk,
  TorusKnotGeometry: Tk,
  TubeGeometry: Ek,
  WireframeGeometry: class extends HC {
    constructor(e = null) {
      if (super(), this.type = "WireframeGeometry", this.parameters = {
        geometry: e
      }, null !== e) {
        const t = [],
          s = new Set(),
          i = new HA(),
          n = new HA();
        if (null !== e.index) {
          const a = e.attributes.position,
            r = e.index;
          let o = e.groups;
          0 === o.length && (o = [{
            start: 0,
            count: r.count,
            materialIndex: 0
          }]);
          for (let e = 0, l = o.length; e < l; ++e) {
            const l = o[e],
              c = l.start;
            for (let e = c, o = c + l.count; e < o; e += 3) for (let l = 0; l < 3; l++) {
              const o = r.getX(e + l),
                c = r.getX(e + (l + 1) % 3);
              i.fromBufferAttribute(a, o), n.fromBufferAttribute(a, c), !0 === Bk(i, n, s) && (t.push(i.x, i.y, i.z), t.push(n.x, n.y, n.z));
            }
          }
        } else {
          const a = e.attributes.position;
          for (let e = 0, r = a.count / 3; e < r; e++) for (let o = 0; o < 3; o++) {
            const r = 3 * e + o,
              l = 3 * e + (o + 1) % 3;
            i.fromBufferAttribute(a, r), n.fromBufferAttribute(a, l), !0 === Bk(i, n, s) && (t.push(i.x, i.y, i.z), t.push(n.x, n.y, n.z));
          }
        }
        this.setAttribute("position", new DC(t, 3));
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
    }
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
class kk extends yC {
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new AC(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
}
class Dk extends cP {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class Lk extends yC {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = {
      STANDARD: ""
    }, this.type = "MeshStandardMaterial", this.color = new AC(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new AC(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: ""
    }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Ok extends Lk {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new DA(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function () {
        return AA(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function (e) {
        this.ior = (1 + .4 * e) / (1 - .4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new AC(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = Infinity, this.attenuationColor = new AC(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new AC(1, 1, 1), this.specularColorMap = null, this._sheen = 0, this._clearcoat = 0, this._iridescence = 0, this._transmission = 0, this.setValues(e);
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
class Rk extends yC {
  constructor(e) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new AC(16777215), this.specular = new AC(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new AC(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Aw, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class zk extends yC {
  constructor(e) {
    super(), this.isMeshToonMaterial = !0, this.defines = {
      TOON: ""
    }, this.type = "MeshToonMaterial", this.color = new AC(16777215), this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new AC(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.gradientMap = e.gradientMap, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
class Nk extends yC {
  constructor(e) {
    super(), this.isMeshNormalMaterial = !0, this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this;
  }
}
class Fk extends yC {
  constructor(e) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new AC(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new AC(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Aw, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Uk extends yC {
  constructor(e) {
    super(), this.isMeshMatcapMaterial = !0, this.defines = {
      MATCAP: ""
    }, this.type = "MeshMatcapMaterial", this.color = new AC(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = oA, this.normalScale = new DA(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = {
      MATCAP: ""
    }, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Hk extends $B {
  constructor(e) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this;
  }
}
function Gk(e, t, s) {
  return Wk(e) ? new e.constructor(e.subarray(t, void 0 !== s ? s : e.length)) : e.slice(t, s);
}
function Vk(e, t, s) {
  return !e || !s && e.constructor === t ? e : "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e);
}
function Wk(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function jk(e) {
  const t = e.length,
    s = new Array(t);
  for (let i = 0; i !== t; ++i) s[i] = i;
  return s.sort(function (t, s) {
    return e[t] - e[s];
  }), s;
}
function qk(e, t, s) {
  const i = e.length,
    n = new e.constructor(i);
  for (let a = 0, r = 0; r !== i; ++a) {
    const i = s[a] * t;
    for (let s = 0; s !== t; ++s) n[r++] = e[i + s];
  }
  return n;
}
function Zk(e, t, s, i) {
  let n = 1,
    a = e[0];
  for (; void 0 !== a && void 0 === a[i];) a = e[n++];
  if (void 0 === a) return;
  let r = a[i];
  if (void 0 !== r) if (Array.isArray(r)) do {
    r = a[i], void 0 !== r && (t.push(a.time), s.push.apply(s, r)), a = e[n++];
  } while (void 0 !== a);else if (void 0 !== r.toArray) do {
    r = a[i], void 0 !== r && (t.push(a.time), r.toArray(s, s.length)), a = e[n++];
  } while (void 0 !== a);else do {
    r = a[i], void 0 !== r && (t.push(a.time), s.push(r)), a = e[n++];
  } while (void 0 !== a);
}
const $k = {
  arraySlice: Gk,
  convertArray: Vk,
  isTypedArray: Wk,
  getKeyframeOrder: jk,
  sortedArray: qk,
  flattenJSON: Zk,
  subclip: function (e, t, s, i, n = 30) {
    const a = e.clone();
    a.name = t;
    const r = [];
    for (let l = 0; l < a.tracks.length; ++l) {
      const e = a.tracks[l],
        t = e.getValueSize(),
        o = [],
        c = [];
      for (let a = 0; a < e.times.length; ++a) {
        const r = e.times[a] * n;
        if (!(r < s || r >= i)) {
          o.push(e.times[a]);
          for (let s = 0; s < t; ++s) c.push(e.values[a * t + s]);
        }
      }
      0 !== o.length && (e.times = Vk(o, e.times.constructor), e.values = Vk(c, e.values.constructor), r.push(e));
    }
    a.tracks = r;
    let o = Infinity;
    for (let l = 0; l < a.tracks.length; ++l) o > a.tracks[l].times[0] && (o = a.tracks[l].times[0]);
    for (let l = 0; l < a.tracks.length; ++l) a.tracks[l].shift(-1 * o);
    return a.resetDuration(), a;
  },
  makeClipAdditive: function (e, t = 0, s = e, i = 30) {
    i <= 0 && (i = 30);
    const n = s.tracks.length,
      a = t / i;
    for (let r = 0; r < n; ++r) {
      const t = s.tracks[r],
        i = t.ValueTypeName;
      if ("bool" === i || "string" === i) continue;
      const n = e.tracks.find(function (e) {
        return e.name === t.name && e.ValueTypeName === i;
      });
      if (void 0 === n) continue;
      let o = 0;
      const l = t.getValueSize();
      t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = l / 3);
      let c = 0;
      const h = n.getValueSize();
      n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (c = h / 3);
      const u = t.times.length - 1;
      let d;
      if (a <= t.times[0]) {
        const e = o,
          s = l - o;
        d = Gk(t.values, e, s);
      } else if (a >= t.times[u]) {
        const e = u * l + o,
          s = e + l - o;
        d = Gk(t.values, e, s);
      } else {
        const e = t.createInterpolant(),
          s = o,
          i = l - o;
        e.evaluate(a), d = Gk(e.resultBuffer, s, i);
      }
      if ("quaternion" === i) {
        new UA().fromArray(d).normalize().conjugate().toArray(d);
      }
      const p = n.times.length;
      for (let e = 0; e < p; ++e) {
        const t = e * h + c;
        if ("quaternion" === i) UA.multiplyQuaternionsFlat(n.values, t, d, 0, n.values, t);else {
          const e = h - 2 * c;
          for (let s = 0; s < e; ++s) n.values[t + s] -= d[s];
        }
      }
    }
    return e.blendMode = eA, e;
  }
};
class Xk {
  constructor(e, t, s, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = void 0 !== i ? i : new t.constructor(s), this.sampleValues = t, this.valueSize = s, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let s = this._cachedIndex,
      i = t[s],
      n = t[s - 1];
    e: {
      t: {
        let a;
        s: {
          i: if (!(e < i)) {
            for (let a = s + 2;;) {
              if (void 0 === i) {
                if (e < n) break i;
                return s = t.length, this._cachedIndex = s, this.copySampleValue_(s - 1);
              }
              if (s === a) break;
              if (n = i, i = t[++s], e < i) break t;
            }
            a = t.length;
            break s;
          }
          if (e >= n) break e;
          {
            const r = t[1];
            e < r && (s = 2, n = r);
            for (let a = s - 2;;) {
              if (void 0 === n) return this._cachedIndex = 0, this.copySampleValue_(0);
              if (s === a) break;
              if (i = n, n = t[--s - 1], e >= n) break t;
            }
            a = s, s = 0;
          }
        }
        for (; s < a;) {
          const i = s + a >>> 1;
          e < t[i] ? a = i : s = i + 1;
        }
        if (i = t[s], n = t[s - 1], void 0 === n) return this._cachedIndex = 0, this.copySampleValue_(0);
        if (void 0 === i) return s = t.length, this._cachedIndex = s, this.copySampleValue_(s - 1);
      }
      this._cachedIndex = s, this.intervalChanged_(s, n, i);
    }
    return this.interpolate_(s, n, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer,
      s = this.sampleValues,
      i = this.valueSize,
      n = e * i;
    for (let a = 0; a !== i; ++a) t[a] = s[n + a];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {}
}
class Yk extends Xk {
  constructor(e, t, s, i) {
    super(e, t, s, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: YS,
      endingEnd: YS
    };
  }
  intervalChanged_(e, t, s) {
    const i = this.parameterPositions;
    let n = e - 2,
      a = e + 1,
      r = i[n],
      o = i[a];
    if (void 0 === r) switch (this.getSettings_().endingStart) {
      case JS:
        n = e, r = 2 * t - s;
        break;
      case QS:
        n = i.length - 2, r = t + i[n] - i[n + 1];
        break;
      default:
        n = e, r = s;
    }
    if (void 0 === o) switch (this.getSettings_().endingEnd) {
      case JS:
        a = e, o = 2 * s - t;
        break;
      case QS:
        a = 1, o = s + i[1] - i[0];
        break;
      default:
        a = e - 1, o = t;
    }
    const l = .5 * (s - t),
      c = this.valueSize;
    this._weightPrev = l / (t - r), this._weightNext = l / (o - s), this._offsetPrev = n * c, this._offsetNext = a * c;
  }
  interpolate_(e, t, s, i) {
    const n = this.resultBuffer,
      a = this.sampleValues,
      r = this.valueSize,
      o = e * r,
      l = o - r,
      c = this._offsetPrev,
      h = this._offsetNext,
      u = this._weightPrev,
      d = this._weightNext,
      p = (s - t) / (i - t),
      m = p * p,
      f = m * p,
      g = -u * f + 2 * u * m - u * p,
      v = (1 + u) * f + (-1.5 - 2 * u) * m + (-.5 + u) * p + 1,
      b = (-1 - d) * f + (1.5 + d) * m + .5 * p,
      y = d * f - d * m;
    for (let _ = 0; _ !== r; ++_) n[_] = g * a[c + _] + v * a[l + _] + b * a[o + _] + y * a[h + _];
    return n;
  }
}
class Jk extends Xk {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  interpolate_(e, t, s, i) {
    const n = this.resultBuffer,
      a = this.sampleValues,
      r = this.valueSize,
      o = e * r,
      l = o - r,
      c = (s - t) / (i - t),
      h = 1 - c;
    for (let u = 0; u !== r; ++u) n[u] = a[l + u] * h + a[o + u] * c;
    return n;
  }
}
class Qk extends Xk {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class Kk {
  constructor(e, t, s, i) {
    if (void 0 === e) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === t || 0 === t.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Vk(t, this.TimeBufferType), this.values = Vk(s, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let s;
    if (t.toJSON !== this.toJSON) s = t.toJSON(e);else {
      s = {
        name: e.name,
        times: Vk(e.times, Array),
        values: Vk(e.values, Array)
      };
      const t = e.getInterpolation();
      t !== e.DefaultInterpolation && (s.interpolation = t);
    }
    return s.type = e.ValueTypeName, s;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new Qk(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Jk(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new Yk(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case ZS:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case $S:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case XS:
        t = this.InterpolantFactoryMethodSmooth;
    }
    if (void 0 === t) {
      const t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (void 0 === this.createInterpolant) {
        if (e === this.DefaultInterpolation) throw new Error(t);
        this.setInterpolation(this.DefaultInterpolation);
      }
      return this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return ZS;
      case this.InterpolantFactoryMethodLinear:
        return $S;
      case this.InterpolantFactoryMethodSmooth:
        return XS;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (0 !== e) {
      const t = this.times;
      for (let s = 0, i = t.length; s !== i; ++s) t[s] += e;
    }
    return this;
  }
  scale(e) {
    if (1 !== e) {
      const t = this.times;
      for (let s = 0, i = t.length; s !== i; ++s) t[s] *= e;
    }
    return this;
  }
  trim(e, t) {
    const s = this.times,
      i = s.length;
    let n = 0,
      a = i - 1;
    for (; n !== i && s[n] < e;) ++n;
    for (; -1 !== a && s[a] > t;) --a;
    if (++a, 0 !== n || a !== i) {
      n >= a && (a = Math.max(a, 1), n = a - 1);
      const e = this.getValueSize();
      this.times = Gk(s, n, a), this.values = Gk(this.values, n * e, a * e);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) != 0 && (e = !1);
    const s = this.times,
      i = this.values,
      n = s.length;
    0 === n && (e = !1);
    let a = null;
    for (let r = 0; r !== n; r++) {
      const t = s[r];
      if ("number" == typeof t && isNaN(t)) {
        e = !1;
        break;
      }
      if (null !== a && a > t) {
        e = !1;
        break;
      }
      a = t;
    }
    if (void 0 !== i && Wk(i)) for (let r = 0, o = i.length; r !== o; ++r) {
      const t = i[r];
      if (isNaN(t)) {
        e = !1;
        break;
      }
    }
    return e;
  }
  optimize() {
    const e = Gk(this.times),
      t = Gk(this.values),
      s = this.getValueSize(),
      i = this.getInterpolation() === XS,
      n = e.length - 1;
    let a = 1;
    for (let r = 1; r < n; ++r) {
      let n = !1;
      const o = e[r];
      if (o !== e[r + 1] && (1 !== r || o !== e[0])) if (i) n = !0;else {
        const e = r * s,
          i = e - s,
          a = e + s;
        for (let r = 0; r !== s; ++r) {
          const s = t[e + r];
          if (s !== t[i + r] || s !== t[a + r]) {
            n = !0;
            break;
          }
        }
      }
      if (n) {
        if (r !== a) {
          e[a] = e[r];
          const i = r * s,
            n = a * s;
          for (let e = 0; e !== s; ++e) t[n + e] = t[i + e];
        }
        ++a;
      }
    }
    if (n > 0) {
      e[a] = e[n];
      for (let e = n * s, i = a * s, r = 0; r !== s; ++r) t[i + r] = t[e + r];
      ++a;
    }
    return a !== e.length ? (this.times = Gk(e, 0, a), this.values = Gk(t, 0, a * s)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = Gk(this.times, 0),
      t = Gk(this.values, 0),
      s = new (0, this.constructor)(this.name, e, t);
    return s.createInterpolant = this.createInterpolant, s;
  }
}
Kk.prototype.TimeBufferType = Float32Array, Kk.prototype.ValueBufferType = Float32Array, Kk.prototype.DefaultInterpolation = $S;
class eD extends Kk {}
eD.prototype.ValueTypeName = "bool", eD.prototype.ValueBufferType = Array, eD.prototype.DefaultInterpolation = ZS, eD.prototype.InterpolantFactoryMethodLinear = void 0, eD.prototype.InterpolantFactoryMethodSmooth = void 0;
class tD extends Kk {}
tD.prototype.ValueTypeName = "color";
class sD extends Kk {}
sD.prototype.ValueTypeName = "number";
class iD extends Xk {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  interpolate_(e, t, s, i) {
    const n = this.resultBuffer,
      a = this.sampleValues,
      r = this.valueSize,
      o = (s - t) / (i - t);
    let l = e * r;
    for (let c = l + r; l !== c; l += 4) UA.slerpFlat(n, 0, a, l - r, a, l, o);
    return n;
  }
}
class nD extends Kk {
  InterpolantFactoryMethodLinear(e) {
    return new iD(this.times, this.values, this.getValueSize(), e);
  }
}
nD.prototype.ValueTypeName = "quaternion", nD.prototype.DefaultInterpolation = $S, nD.prototype.InterpolantFactoryMethodSmooth = void 0;
class aD extends Kk {}
aD.prototype.ValueTypeName = "string", aD.prototype.ValueBufferType = Array, aD.prototype.DefaultInterpolation = ZS, aD.prototype.InterpolantFactoryMethodLinear = void 0, aD.prototype.InterpolantFactoryMethodSmooth = void 0;
class rD extends Kk {}
rD.prototype.ValueTypeName = "vector";
class oD {
  constructor(e, t = -1, s, i = 2500) {
    this.name = e, this.tracks = s, this.duration = t, this.blendMode = i, this.uuid = SA(), this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [],
      s = e.tracks,
      i = 1 / (e.fps || 1);
    for (let a = 0, r = s.length; a !== r; ++a) t.push(lD(s[a]).scale(i));
    const n = new this(e.name, e.duration, t, e.blendMode);
    return n.uuid = e.uuid, n;
  }
  static toJSON(e) {
    const t = [],
      s = e.tracks,
      i = {
        name: e.name,
        duration: e.duration,
        tracks: t,
        uuid: e.uuid,
        blendMode: e.blendMode
      };
    for (let n = 0, a = s.length; n !== a; ++n) t.push(Kk.toJSON(s[n]));
    return i;
  }
  static CreateFromMorphTargetSequence(e, t, s, i) {
    const n = t.length,
      a = [];
    for (let r = 0; r < n; r++) {
      let e = [],
        o = [];
      e.push((r + n - 1) % n, r, (r + 1) % n), o.push(0, 1, 0);
      const l = jk(e);
      e = qk(e, 1, l), o = qk(o, 1, l), i || 0 !== e[0] || (e.push(n), o.push(o[0])), a.push(new sD(".morphTargetInfluences[" + t[r].name + "]", e, o).scale(1 / s));
    }
    return new this(e, -1, a);
  }
  static findByName(e, t) {
    let s = e;
    if (!Array.isArray(e)) {
      const t = e;
      s = t.geometry && t.geometry.animations || t.animations;
    }
    for (let i = 0; i < s.length; i++) if (s[i].name === t) return s[i];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, s) {
    const i = {},
      n = /^([\w-]*?)([\d]+)$/;
    for (let r = 0, o = e.length; r < o; r++) {
      const t = e[r],
        s = t.name.match(n);
      if (s && s.length > 1) {
        const e = s[1];
        let n = i[e];
        n || (i[e] = n = []), n.push(t);
      }
    }
    const a = [];
    for (const r in i) a.push(this.CreateFromMorphTargetSequence(r, i[r], t, s));
    return a;
  }
  static parseAnimation(e, t) {
    if (!e) return null;
    const s = function (e, t, s, i, n) {
        if (0 !== s.length) {
          const a = [],
            r = [];
          Zk(s, a, r, i), 0 !== a.length && n.push(new e(t, a, r));
        }
      },
      i = [],
      n = e.name || "default",
      a = e.fps || 30,
      r = e.blendMode;
    let o = e.length || -1;
    const l = e.hierarchy || [];
    for (let c = 0; c < l.length; c++) {
      const e = l[c].keys;
      if (e && 0 !== e.length) if (e[0].morphTargets) {
        const t = {};
        let s;
        for (s = 0; s < e.length; s++) if (e[s].morphTargets) for (let i = 0; i < e[s].morphTargets.length; i++) t[e[s].morphTargets[i]] = -1;
        for (const n in t) {
          const t = [],
            a = [];
          for (let i = 0; i !== e[s].morphTargets.length; ++i) {
            const i = e[s];
            t.push(i.time), a.push(i.morphTarget === n ? 1 : 0);
          }
          i.push(new sD(".morphTargetInfluence[" + n + "]", t, a));
        }
        o = t.length * a;
      } else {
        const n = ".bones[" + t[c].name + "]";
        s(rD, n + ".position", e, "pos", i), s(nD, n + ".quaternion", e, "rot", i), s(rD, n + ".scale", e, "scl", i);
      }
    }
    if (0 === i.length) return null;
    return new this(n, o, i, r);
  }
  resetDuration() {
    let e = 0;
    for (let t = 0, s = this.tracks.length; t !== s; ++t) {
      const s = this.tracks[t];
      e = Math.max(e, s.times[s.times.length - 1]);
    }
    return this.duration = e, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
    return new this.constructor(this.name, this.duration, e, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function lD(e) {
  if (void 0 === e.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = function (e) {
    switch (e.toLowerCase()) {
      case "scalar":
      case "double":
      case "float":
      case "number":
      case "integer":
        return sD;
      case "vector":
      case "vector2":
      case "vector3":
      case "vector4":
        return rD;
      case "color":
        return tD;
      case "quaternion":
        return nD;
      case "bool":
      case "boolean":
        return eD;
      case "string":
        return aD;
    }
    throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
  }(e.type);
  if (void 0 === e.times) {
    const t = [],
      s = [];
    Zk(e.keys, t, s, "value"), e.times = t, e.values = s;
  }
  return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
const cD = {
  enabled: !1,
  files: {},
  add: function (e, t) {
    !1 !== this.enabled && (this.files[e] = t);
  },
  get: function (e) {
    if (!1 !== this.enabled) return this.files[e];
  },
  remove: function (e) {
    delete this.files[e];
  },
  clear: function () {
    this.files = {};
  }
};
class hD {
  constructor(e, t, s) {
    const i = this;
    let n,
      a = !1,
      r = 0,
      o = 0;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = s, this.itemStart = function (e) {
      o++, !1 === a && void 0 !== i.onStart && i.onStart(e, r, o), a = !0;
    }, this.itemEnd = function (e) {
      r++, void 0 !== i.onProgress && i.onProgress(e, r, o), r === o && (a = !1, void 0 !== i.onLoad && i.onLoad());
    }, this.itemError = function (e) {
      void 0 !== i.onError && i.onError(e);
    }, this.resolveURL = function (e) {
      return n ? n(e) : e;
    }, this.setURLModifier = function (e) {
      return n = e, this;
    }, this.addHandler = function (e, t) {
      return l.push(e, t), this;
    }, this.removeHandler = function (e) {
      const t = l.indexOf(e);
      return -1 !== t && l.splice(t, 2), this;
    }, this.getHandler = function (e) {
      for (let t = 0, s = l.length; t < s; t += 2) {
        const s = l[t],
          i = l[t + 1];
        if (s.global && (s.lastIndex = 0), s.test(e)) return i;
      }
      return null;
    };
  }
}
const uD = new hD();
class dD {
  constructor(e) {
    this.manager = void 0 !== e ? e : uD, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {}
  loadAsync(e, t) {
    const s = this;
    return new Promise(function (i, n) {
      s.load(e, i, t, n);
    });
  }
  parse() {}
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
}
const pD = {};
class mD extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class fD extends dD {
  constructor(e) {
    super(e);
  }
  load(e, t, s, i) {
    void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const n = cD.get(e);
    if (void 0 !== n) return this.manager.itemStart(e), setTimeout(() => {
      t && t(n), this.manager.itemEnd(e);
    }, 0), n;
    if (void 0 !== pD[e]) return void pD[e].push({
      onLoad: t,
      onProgress: s,
      onError: i
    });
    pD[e] = [], pD[e].push({
      onLoad: t,
      onProgress: s,
      onError: i
    });
    const a = new Request(e, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? "include" : "same-origin"
      }),
      r = this.mimeType,
      o = this.responseType;
    fetch(a).then(t => {
      if (200 === t.status || 0 === t.status) {
        if (t.status, "undefined" == typeof ReadableStream || void 0 === t.body || void 0 === t.body.getReader) return t;
        const s = pD[e],
          i = t.body.getReader(),
          n = t.headers.get("Content-Length") || t.headers.get("X-File-Size"),
          a = n ? parseInt(n) : 0,
          r = 0 !== a;
        let o = 0;
        const l = new ReadableStream({
          start(e) {
            !function t() {
              i.read().then(({
                done: i,
                value: n
              }) => {
                if (i) e.close();else {
                  o += n.byteLength;
                  const i = new ProgressEvent("progress", {
                    lengthComputable: r,
                    loaded: o,
                    total: a
                  });
                  for (let e = 0, t = s.length; e < t; e++) {
                    const t = s[e];
                    t.onProgress && t.onProgress(i);
                  }
                  e.enqueue(n), t();
                }
              });
            }();
          }
        });
        return new Response(l);
      }
      throw new mD(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`, t);
    }).then(e => {
      switch (o) {
        case "arraybuffer":
          return e.arrayBuffer();
        case "blob":
          return e.blob();
        case "document":
          return e.text().then(e => new DOMParser().parseFromString(e, r));
        case "json":
          return e.json();
        default:
          if (void 0 === r) return e.text();
          {
            const t = /charset="?([^;"\s]*)"?/i.exec(r),
              s = t && t[1] ? t[1].toLowerCase() : void 0,
              i = new TextDecoder(s);
            return e.arrayBuffer().then(e => i.decode(e));
          }
      }
    }).then(t => {
      cD.add(e, t);
      const s = pD[e];
      delete pD[e];
      for (let e = 0, i = s.length; e < i; e++) {
        const i = s[e];
        i.onLoad && i.onLoad(t);
      }
    }).catch(t => {
      const s = pD[e];
      if (void 0 === s) throw this.manager.itemError(e), t;
      delete pD[e];
      for (let e = 0, i = s.length; e < i; e++) {
        const i = s[e];
        i.onError && i.onError(t);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
}
class gD extends dD {
  constructor(e) {
    super(e);
  }
  load(e, t, s, i) {
    void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const n = this,
      a = cD.get(e);
    if (void 0 !== a) return n.manager.itemStart(e), setTimeout(function () {
      t && t(a), n.manager.itemEnd(e);
    }, 0), a;
    const r = FA("img");
    function o() {
      c(), cD.add(e, this), t && t(this), n.manager.itemEnd(e);
    }
    function l(t) {
      c(), i && i(t), n.manager.itemError(e), n.manager.itemEnd(e);
    }
    function c() {
      r.removeEventListener("load", o, !1), r.removeEventListener("error", l, !1);
    }
    return r.addEventListener("load", o, !1), r.addEventListener("error", l, !1), "data:" !== e.slice(0, 5) && void 0 !== this.crossOrigin && (r.crossOrigin = this.crossOrigin), n.manager.itemStart(e), r.src = e, r;
  }
}
class vD extends dD {
  constructor(e) {
    super(e);
  }
  load(e, t, s, i) {
    const n = new iM(),
      a = new gD(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function (e) {
      n.image = e, n.needsUpdate = !0, void 0 !== t && t(n);
    }, s, i), n;
  }
}
class bD extends rC {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new AC(e), this.intensity = t;
  }
  dispose() {}
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (t.object.distance = this.distance), void 0 !== this.angle && (t.object.angle = this.angle), void 0 !== this.decay && (t.object.decay = this.decay), void 0 !== this.penumbra && (t.object.penumbra = this.penumbra), void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()), t;
  }
}
class yD extends bD {
  constructor(e, t, s) {
    super(e, s), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(rC.DEFAULT_UP), this.updateMatrix(), this.groundColor = new AC(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}
const _D = new OM(),
  xD = new HA(),
  wD = new HA();
class SD {
  constructor(e) {
    this.camera = e, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new DA(512, 512), this.map = null, this.mapPass = null, this.matrix = new OM(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new wP(), this._frameExtents = new DA(1, 1), this._viewportCount = 1, this._viewports = [new nM(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera,
      s = this.matrix;
    xD.setFromMatrixPosition(e.matrixWorld), t.position.copy(xD), wD.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(wD), t.updateMatrixWorld(), _D.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_D), s.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), s.multiply(_D);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return 0 !== this.bias && (e.bias = this.bias), 0 !== this.normalBias && (e.normalBias = this.normalBias), 1 !== this.radius && (e.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class AD extends SD {
  constructor() {
    super(new uP(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(e) {
    const t = this.camera,
      s = 2 * wA * e.angle * this.focus,
      i = this.mapSize.width / this.mapSize.height,
      n = e.distance || t.far;
    s === t.fov && i === t.aspect && n === t.far || (t.fov = s, t.aspect = i, t.far = n, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class MD extends bD {
  constructor(e, t, s = 0, i = Math.PI / 3, n = 0, a = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(rC.DEFAULT_UP), this.updateMatrix(), this.target = new rC(), this.distance = s, this.angle = i, this.penumbra = n, this.decay = a, this.map = null, this.shadow = new AD();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
const CD = new OM(),
  PD = new HA(),
  TD = new HA();
class ED extends SD {
  constructor() {
    super(new uP(90, 1, .5, 500)), this.isPointLightShadow = !0, this._frameExtents = new DA(4, 2), this._viewportCount = 6, this._viewports = [new nM(2, 1, 1, 1), new nM(0, 1, 1, 1), new nM(3, 1, 1, 1), new nM(1, 1, 1, 1), new nM(3, 0, 1, 1), new nM(1, 0, 1, 1)], this._cubeDirections = [new HA(1, 0, 0), new HA(-1, 0, 0), new HA(0, 0, 1), new HA(0, 0, -1), new HA(0, 1, 0), new HA(0, -1, 0)], this._cubeUps = [new HA(0, 1, 0), new HA(0, 1, 0), new HA(0, 1, 0), new HA(0, 1, 0), new HA(0, 0, 1), new HA(0, 0, -1)];
  }
  updateMatrices(e, t = 0) {
    const s = this.camera,
      i = this.matrix,
      n = e.distance || s.far;
    n !== s.far && (s.far = n, s.updateProjectionMatrix()), PD.setFromMatrixPosition(e.matrixWorld), s.position.copy(PD), TD.copy(s.position), TD.add(this._cubeDirections[t]), s.up.copy(this._cubeUps[t]), s.lookAt(TD), s.updateMatrixWorld(), i.makeTranslation(-PD.x, -PD.y, -PD.z), CD.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse), this._frustum.setFromProjectionMatrix(CD);
  }
}
class BD extends bD {
  constructor(e, t, s = 0, i = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = s, this.decay = i, this.shadow = new ED();
  }
  get power() {
    return 4 * this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
}
class ID extends SD {
  constructor() {
    super(new RP(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class kD extends bD {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(rC.DEFAULT_UP), this.updateMatrix(), this.target = new rC(), this.shadow = new ID();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class DD extends bD {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class LD extends bD {
  constructor(e, t, s = 10, i = 10) {
    super(e, t), this.isRectAreaLight = !0, this.type = "RectAreaLight", this.width = s, this.height = i;
  }
  get power() {
    return this.intensity * this.width * this.height * Math.PI;
  }
  set power(e) {
    this.intensity = e / (this.width * this.height * Math.PI);
  }
  copy(e) {
    return super.copy(e), this.width = e.width, this.height = e.height, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.width = this.width, t.object.height = this.height, t;
  }
}
class OD {
  constructor() {
    this.isSphericalHarmonics3 = !0, this.coefficients = [];
    for (let e = 0; e < 9; e++) this.coefficients.push(new HA());
  }
  set(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
    return this;
  }
  zero() {
    for (let e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
    return this;
  }
  getAt(e, t) {
    const s = e.x,
      i = e.y,
      n = e.z,
      a = this.coefficients;
    return t.copy(a[0]).multiplyScalar(.282095), t.addScaledVector(a[1], .488603 * i), t.addScaledVector(a[2], .488603 * n), t.addScaledVector(a[3], .488603 * s), t.addScaledVector(a[4], s * i * 1.092548), t.addScaledVector(a[5], i * n * 1.092548), t.addScaledVector(a[6], .315392 * (3 * n * n - 1)), t.addScaledVector(a[7], s * n * 1.092548), t.addScaledVector(a[8], .546274 * (s * s - i * i)), t;
  }
  getIrradianceAt(e, t) {
    const s = e.x,
      i = e.y,
      n = e.z,
      a = this.coefficients;
    return t.copy(a[0]).multiplyScalar(.886227), t.addScaledVector(a[1], 1.023328 * i), t.addScaledVector(a[2], 1.023328 * n), t.addScaledVector(a[3], 1.023328 * s), t.addScaledVector(a[4], .858086 * s * i), t.addScaledVector(a[5], .858086 * i * n), t.addScaledVector(a[6], .743125 * n * n - .247708), t.addScaledVector(a[7], .858086 * s * n), t.addScaledVector(a[8], .429043 * (s * s - i * i)), t;
  }
  add(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
    return this;
  }
  addScaledSH(e, t) {
    for (let s = 0; s < 9; s++) this.coefficients[s].addScaledVector(e.coefficients[s], t);
    return this;
  }
  scale(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
    return this;
  }
  lerp(e, t) {
    for (let s = 0; s < 9; s++) this.coefficients[s].lerp(e.coefficients[s], t);
    return this;
  }
  equals(e) {
    for (let t = 0; t < 9; t++) if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
    return !0;
  }
  copy(e) {
    return this.set(e.coefficients);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(e, t = 0) {
    const s = this.coefficients;
    for (let i = 0; i < 9; i++) s[i].fromArray(e, t + 3 * i);
    return this;
  }
  toArray(e = [], t = 0) {
    const s = this.coefficients;
    for (let i = 0; i < 9; i++) s[i].toArray(e, t + 3 * i);
    return e;
  }
  static getBasisAt(e, t) {
    const s = e.x,
      i = e.y,
      n = e.z;
    t[0] = .282095, t[1] = .488603 * i, t[2] = .488603 * n, t[3] = .488603 * s, t[4] = 1.092548 * s * i, t[5] = 1.092548 * i * n, t[6] = .315392 * (3 * n * n - 1), t[7] = 1.092548 * s * n, t[8] = .546274 * (s * s - i * i);
  }
}
class RD extends bD {
  constructor(e = new OD(), t = 1) {
    super(void 0, t), this.isLightProbe = !0, this.sh = e;
  }
  copy(e) {
    return super.copy(e), this.sh.copy(e.sh), this;
  }
  fromJSON(e) {
    return this.intensity = e.intensity, this.sh.fromArray(e.sh), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.sh = this.sh.toArray(), t;
  }
}
class zD extends dD {
  constructor(e) {
    super(e), this.textures = {};
  }
  load(e, t, s, i) {
    const n = this,
      a = new fD(n.manager);
    a.setPath(n.path), a.setRequestHeader(n.requestHeader), a.setWithCredentials(n.withCredentials), a.load(e, function (s) {
      try {
        t(n.parse(JSON.parse(s)));
      } catch (a) {
        i && i(a), n.manager.itemError(e);
      }
    }, s, i);
  }
  parse(e) {
    const t = this.textures;
    function s(e) {
      return t[e], t[e];
    }
    const i = zD.createMaterialFromType(e.type);
    if (void 0 !== e.uuid && (i.uuid = e.uuid), void 0 !== e.name && (i.name = e.name), void 0 !== e.color && void 0 !== i.color && i.color.setHex(e.color), void 0 !== e.roughness && (i.roughness = e.roughness), void 0 !== e.metalness && (i.metalness = e.metalness), void 0 !== e.sheen && (i.sheen = e.sheen), void 0 !== e.sheenColor && (i.sheenColor = new AC().setHex(e.sheenColor)), void 0 !== e.sheenRoughness && (i.sheenRoughness = e.sheenRoughness), void 0 !== e.emissive && void 0 !== i.emissive && i.emissive.setHex(e.emissive), void 0 !== e.specular && void 0 !== i.specular && i.specular.setHex(e.specular), void 0 !== e.specularIntensity && (i.specularIntensity = e.specularIntensity), void 0 !== e.specularColor && void 0 !== i.specularColor && i.specularColor.setHex(e.specularColor), void 0 !== e.shininess && (i.shininess = e.shininess), void 0 !== e.clearcoat && (i.clearcoat = e.clearcoat), void 0 !== e.clearcoatRoughness && (i.clearcoatRoughness = e.clearcoatRoughness), void 0 !== e.iridescence && (i.iridescence = e.iridescence), void 0 !== e.iridescenceIOR && (i.iridescenceIOR = e.iridescenceIOR), void 0 !== e.iridescenceThicknessRange && (i.iridescenceThicknessRange = e.iridescenceThicknessRange), void 0 !== e.transmission && (i.transmission = e.transmission), void 0 !== e.thickness && (i.thickness = e.thickness), void 0 !== e.attenuationDistance && (i.attenuationDistance = e.attenuationDistance), void 0 !== e.attenuationColor && void 0 !== i.attenuationColor && i.attenuationColor.setHex(e.attenuationColor), void 0 !== e.fog && (i.fog = e.fog), void 0 !== e.flatShading && (i.flatShading = e.flatShading), void 0 !== e.blending && (i.blending = e.blending), void 0 !== e.combine && (i.combine = e.combine), void 0 !== e.side && (i.side = e.side), void 0 !== e.shadowSide && (i.shadowSide = e.shadowSide), void 0 !== e.opacity && (i.opacity = e.opacity), void 0 !== e.transparent && (i.transparent = e.transparent), void 0 !== e.alphaTest && (i.alphaTest = e.alphaTest), void 0 !== e.depthTest && (i.depthTest = e.depthTest), void 0 !== e.depthWrite && (i.depthWrite = e.depthWrite), void 0 !== e.colorWrite && (i.colorWrite = e.colorWrite), void 0 !== e.stencilWrite && (i.stencilWrite = e.stencilWrite), void 0 !== e.stencilWriteMask && (i.stencilWriteMask = e.stencilWriteMask), void 0 !== e.stencilFunc && (i.stencilFunc = e.stencilFunc), void 0 !== e.stencilRef && (i.stencilRef = e.stencilRef), void 0 !== e.stencilFuncMask && (i.stencilFuncMask = e.stencilFuncMask), void 0 !== e.stencilFail && (i.stencilFail = e.stencilFail), void 0 !== e.stencilZFail && (i.stencilZFail = e.stencilZFail), void 0 !== e.stencilZPass && (i.stencilZPass = e.stencilZPass), void 0 !== e.wireframe && (i.wireframe = e.wireframe), void 0 !== e.wireframeLinewidth && (i.wireframeLinewidth = e.wireframeLinewidth), void 0 !== e.wireframeLinecap && (i.wireframeLinecap = e.wireframeLinecap), void 0 !== e.wireframeLinejoin && (i.wireframeLinejoin = e.wireframeLinejoin), void 0 !== e.rotation && (i.rotation = e.rotation), 1 !== e.linewidth && (i.linewidth = e.linewidth), void 0 !== e.dashSize && (i.dashSize = e.dashSize), void 0 !== e.gapSize && (i.gapSize = e.gapSize), void 0 !== e.scale && (i.scale = e.scale), void 0 !== e.polygonOffset && (i.polygonOffset = e.polygonOffset), void 0 !== e.polygonOffsetFactor && (i.polygonOffsetFactor = e.polygonOffsetFactor), void 0 !== e.polygonOffsetUnits && (i.polygonOffsetUnits = e.polygonOffsetUnits), void 0 !== e.dithering && (i.dithering = e.dithering), void 0 !== e.alphaToCoverage && (i.alphaToCoverage = e.alphaToCoverage), void 0 !== e.premultipliedAlpha && (i.premultipliedAlpha = e.premultipliedAlpha), void 0 !== e.forceSinglePass && (i.forceSinglePass = e.forceSinglePass), void 0 !== e.visible && (i.visible = e.visible), void 0 !== e.toneMapped && (i.toneMapped = e.toneMapped), void 0 !== e.userData && (i.userData = e.userData), void 0 !== e.vertexColors && ("number" == typeof e.vertexColors ? i.vertexColors = e.vertexColors > 0 : i.vertexColors = e.vertexColors), void 0 !== e.uniforms) for (const n in e.uniforms) {
      const t = e.uniforms[n];
      switch (i.uniforms[n] = {}, t.type) {
        case "t":
          i.uniforms[n].value = s(t.value);
          break;
        case "c":
          i.uniforms[n].value = new AC().setHex(t.value);
          break;
        case "v2":
          i.uniforms[n].value = new DA().fromArray(t.value);
          break;
        case "v3":
          i.uniforms[n].value = new HA().fromArray(t.value);
          break;
        case "v4":
          i.uniforms[n].value = new nM().fromArray(t.value);
          break;
        case "m3":
          i.uniforms[n].value = new LA().fromArray(t.value);
          break;
        case "m4":
          i.uniforms[n].value = new OM().fromArray(t.value);
          break;
        default:
          i.uniforms[n].value = t.value;
      }
    }
    if (void 0 !== e.defines && (i.defines = e.defines), void 0 !== e.vertexShader && (i.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (i.fragmentShader = e.fragmentShader), void 0 !== e.glslVersion && (i.glslVersion = e.glslVersion), void 0 !== e.extensions) for (const n in e.extensions) i.extensions[n] = e.extensions[n];
    if (void 0 !== e.size && (i.size = e.size), void 0 !== e.sizeAttenuation && (i.sizeAttenuation = e.sizeAttenuation), void 0 !== e.map && (i.map = s(e.map)), void 0 !== e.matcap && (i.matcap = s(e.matcap)), void 0 !== e.alphaMap && (i.alphaMap = s(e.alphaMap)), void 0 !== e.bumpMap && (i.bumpMap = s(e.bumpMap)), void 0 !== e.bumpScale && (i.bumpScale = e.bumpScale), void 0 !== e.normalMap && (i.normalMap = s(e.normalMap)), void 0 !== e.normalMapType && (i.normalMapType = e.normalMapType), void 0 !== e.normalScale) {
      let t = e.normalScale;
      !1 === Array.isArray(t) && (t = [t, t]), i.normalScale = new DA().fromArray(t);
    }
    return void 0 !== e.displacementMap && (i.displacementMap = s(e.displacementMap)), void 0 !== e.displacementScale && (i.displacementScale = e.displacementScale), void 0 !== e.displacementBias && (i.displacementBias = e.displacementBias), void 0 !== e.roughnessMap && (i.roughnessMap = s(e.roughnessMap)), void 0 !== e.metalnessMap && (i.metalnessMap = s(e.metalnessMap)), void 0 !== e.emissiveMap && (i.emissiveMap = s(e.emissiveMap)), void 0 !== e.emissiveIntensity && (i.emissiveIntensity = e.emissiveIntensity), void 0 !== e.specularMap && (i.specularMap = s(e.specularMap)), void 0 !== e.specularIntensityMap && (i.specularIntensityMap = s(e.specularIntensityMap)), void 0 !== e.specularColorMap && (i.specularColorMap = s(e.specularColorMap)), void 0 !== e.envMap && (i.envMap = s(e.envMap)), void 0 !== e.envMapIntensity && (i.envMapIntensity = e.envMapIntensity), void 0 !== e.reflectivity && (i.reflectivity = e.reflectivity), void 0 !== e.refractionRatio && (i.refractionRatio = e.refractionRatio), void 0 !== e.lightMap && (i.lightMap = s(e.lightMap)), void 0 !== e.lightMapIntensity && (i.lightMapIntensity = e.lightMapIntensity), void 0 !== e.aoMap && (i.aoMap = s(e.aoMap)), void 0 !== e.aoMapIntensity && (i.aoMapIntensity = e.aoMapIntensity), void 0 !== e.gradientMap && (i.gradientMap = s(e.gradientMap)), void 0 !== e.clearcoatMap && (i.clearcoatMap = s(e.clearcoatMap)), void 0 !== e.clearcoatRoughnessMap && (i.clearcoatRoughnessMap = s(e.clearcoatRoughnessMap)), void 0 !== e.clearcoatNormalMap && (i.clearcoatNormalMap = s(e.clearcoatNormalMap)), void 0 !== e.clearcoatNormalScale && (i.clearcoatNormalScale = new DA().fromArray(e.clearcoatNormalScale)), void 0 !== e.iridescenceMap && (i.iridescenceMap = s(e.iridescenceMap)), void 0 !== e.iridescenceThicknessMap && (i.iridescenceThicknessMap = s(e.iridescenceThicknessMap)), void 0 !== e.transmissionMap && (i.transmissionMap = s(e.transmissionMap)), void 0 !== e.thicknessMap && (i.thicknessMap = s(e.thicknessMap)), void 0 !== e.sheenColorMap && (i.sheenColorMap = s(e.sheenColorMap)), void 0 !== e.sheenRoughnessMap && (i.sheenRoughnessMap = s(e.sheenRoughnessMap)), i;
  }
  setTextures(e) {
    return this.textures = e, this;
  }
  static createMaterialFromType(e) {
    return new {
      ShadowMaterial: kk,
      SpriteMaterial: uB,
      RawShaderMaterial: Dk,
      ShaderMaterial: cP,
      PointsMaterial: aI,
      MeshPhysicalMaterial: Ok,
      MeshStandardMaterial: Lk,
      MeshPhongMaterial: Rk,
      MeshToonMaterial: zk,
      MeshNormalMaterial: Nk,
      MeshLambertMaterial: Fk,
      MeshDepthMaterial: HE,
      MeshDistanceMaterial: GE,
      MeshBasicMaterial: CC,
      MeshMatcapMaterial: Uk,
      LineDashedMaterial: Hk,
      LineBasicMaterial: $B,
      Material: yC
    }[e]();
  }
}
class ND {
  static decodeText(e) {
    if ("undefined" != typeof TextDecoder) return new TextDecoder().decode(e);
    let t = "";
    for (let i = 0, n = e.length; i < n; i++) t += String.fromCharCode(e[i]);
    try {
      return decodeURIComponent(escape(t));
    } catch (s) {
      return t;
    }
  }
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return -1 === t ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class FD extends HC {
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = Infinity;
  }
  copy(e) {
    return super.copy(e), this.instanceCount = e.instanceCount, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.instanceCount = this.instanceCount, e.isInstancedBufferGeometry = !0, e;
  }
}
class UD extends dD {
  constructor(e) {
    super(e);
  }
  load(e, t, s, i) {
    const n = this,
      a = new fD(n.manager);
    a.setPath(n.path), a.setRequestHeader(n.requestHeader), a.setWithCredentials(n.withCredentials), a.load(e, function (s) {
      try {
        t(n.parse(JSON.parse(s)));
      } catch (a) {
        i && i(a), n.manager.itemError(e);
      }
    }, s, i);
  }
  parse(e) {
    const t = {},
      s = {};
    function i(e, i) {
      if (void 0 !== t[i]) return t[i];
      const n = e.interleavedBuffers[i],
        a = function (e, t) {
          if (void 0 !== s[t]) return s[t];
          const i = e.arrayBuffers,
            n = i[t],
            a = new Uint32Array(n).buffer;
          return s[t] = a, a;
        }(e, n.buffer),
        r = NA(n.type, a),
        o = new lB(r, n.stride);
      return o.uuid = n.uuid, t[i] = o, o;
    }
    const n = e.isInstancedBufferGeometry ? new FD() : new HC(),
      a = e.data.index;
    if (void 0 !== a) {
      const e = NA(a.type, a.array);
      n.setIndex(new EC(e, 1));
    }
    const r = e.data.attributes;
    for (const h in r) {
      const t = r[h];
      let s;
      if (t.isInterleavedBufferAttribute) {
        const n = i(e.data, t.data);
        s = new hB(n, t.itemSize, t.offset, t.normalized);
      } else {
        const e = NA(t.type, t.array);
        s = new (t.isInstancedBufferAttribute ? HB : EC)(e, t.itemSize, t.normalized);
      }
      void 0 !== t.name && (s.name = t.name), void 0 !== t.usage && s.setUsage(t.usage), void 0 !== t.updateRange && (s.updateRange.offset = t.updateRange.offset, s.updateRange.count = t.updateRange.count), n.setAttribute(h, s);
    }
    const o = e.data.morphAttributes;
    if (o) for (const h in o) {
      const t = o[h],
        s = [];
      for (let n = 0, a = t.length; n < a; n++) {
        const a = t[n];
        let r;
        if (a.isInterleavedBufferAttribute) {
          const t = i(e.data, a.data);
          r = new hB(t, a.itemSize, a.offset, a.normalized);
        } else {
          const e = NA(a.type, a.array);
          r = new EC(e, a.itemSize, a.normalized);
        }
        void 0 !== a.name && (r.name = a.name), s.push(r);
      }
      n.morphAttributes[h] = s;
    }
    e.data.morphTargetsRelative && (n.morphTargetsRelative = !0);
    const l = e.data.groups || e.data.drawcalls || e.data.offsets;
    if (void 0 !== l) for (let h = 0, u = l.length; h !== u; ++h) {
      const e = l[h];
      n.addGroup(e.start, e.count, e.materialIndex);
    }
    const c = e.data.boundingSphere;
    if (void 0 !== c) {
      const e = new HA();
      void 0 !== c.center && e.fromArray(c.center), n.boundingSphere = new CM(e, c.radius);
    }
    return e.name && (n.name = e.name), e.userData && (n.userData = e.userData), n;
  }
}
class HD extends dD {
  constructor(e) {
    super(e);
  }
  load(e, t, s, i) {
    const n = this,
      a = "" === this.path ? ND.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || a;
    const r = new fD(this.manager);
    r.setPath(this.path), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function (s) {
      let a = null;
      try {
        a = JSON.parse(s);
      } catch (o) {
        return void (void 0 !== i && i(o));
      }
      const r = a.metadata;
      void 0 !== r && void 0 !== r.type && "geometry" !== r.type.toLowerCase() ? n.parse(a, t) : void 0 !== i && i(new Error("THREE.ObjectLoader: Can't load " + e));
    }, s, i);
  }
  async loadAsync(e, t) {
    const s = "" === this.path ? ND.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || s;
    const i = new fD(this.manager);
    i.setPath(this.path), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials);
    const n = await i.loadAsync(e, t),
      a = JSON.parse(n),
      r = a.metadata;
    if (void 0 === r || void 0 === r.type || "geometry" === r.type.toLowerCase()) throw new Error("THREE.ObjectLoader: Can't load " + e);
    return await this.parseAsync(a);
  }
  parse(e, t) {
    const s = this.parseAnimations(e.animations),
      i = this.parseShapes(e.shapes),
      n = this.parseGeometries(e.geometries, i),
      a = this.parseImages(e.images, function () {
        void 0 !== t && t(l);
      }),
      r = this.parseTextures(e.textures, a),
      o = this.parseMaterials(e.materials, r),
      l = this.parseObject(e.object, n, o, r, s),
      c = this.parseSkeletons(e.skeletons, l);
    if (this.bindSkeletons(l, c), void 0 !== t) {
      let e = !1;
      for (const t in a) if (a[t].data instanceof HTMLImageElement) {
        e = !0;
        break;
      }
      !1 === e && t(l);
    }
    return l;
  }
  async parseAsync(e) {
    const t = this.parseAnimations(e.animations),
      s = this.parseShapes(e.shapes),
      i = this.parseGeometries(e.geometries, s),
      n = await this.parseImagesAsync(e.images),
      a = this.parseTextures(e.textures, n),
      r = this.parseMaterials(e.materials, a),
      o = this.parseObject(e.object, i, r, a, t),
      l = this.parseSkeletons(e.skeletons, o);
    return this.bindSkeletons(o, l), o;
  }
  parseShapes(e) {
    const t = {};
    if (void 0 !== e) for (let s = 0, i = e.length; s < i; s++) {
      const i = new WI().fromJSON(e[s]);
      t[i.uuid] = i;
    }
    return t;
  }
  parseSkeletons(e, t) {
    const s = {},
      i = {};
    if (t.traverse(function (e) {
      e.isBone && (i[e.uuid] = e);
    }), void 0 !== e) for (let n = 0, a = e.length; n < a; n++) {
      const t = new UB().fromJSON(e[n], i);
      s[t.uuid] = t;
    }
    return s;
  }
  parseGeometries(e, t) {
    const s = {};
    if (void 0 !== e) {
      const i = new UD();
      for (let n = 0, a = e.length; n < a; n++) {
        let a;
        const r = e[n];
        switch (r.type) {
          case "BufferGeometry":
          case "InstancedBufferGeometry":
            a = i.parse(r);
            break;
          default:
            r.type in Ik && (a = Ik[r.type].fromJSON(r, t));
        }
        a.uuid = r.uuid, void 0 !== r.name && (a.name = r.name), void 0 !== r.userData && (a.userData = r.userData), s[r.uuid] = a;
      }
    }
    return s;
  }
  parseMaterials(e, t) {
    const s = {},
      i = {};
    if (void 0 !== e) {
      const n = new zD();
      n.setTextures(t);
      for (let t = 0, a = e.length; t < a; t++) {
        const a = e[t];
        void 0 === s[a.uuid] && (s[a.uuid] = n.parse(a)), i[a.uuid] = s[a.uuid];
      }
    }
    return i;
  }
  parseAnimations(e) {
    const t = {};
    if (void 0 !== e) for (let s = 0; s < e.length; s++) {
      const i = e[s],
        n = oD.parse(i);
      t[n.uuid] = n;
    }
    return t;
  }
  parseImages(e, t) {
    const s = this,
      i = {};
    let n;
    function a(e) {
      if ("string" == typeof e) {
        const t = e;
        return function (e) {
          return s.manager.itemStart(e), n.load(e, function () {
            s.manager.itemEnd(e);
          }, void 0, function () {
            s.manager.itemError(e), s.manager.itemEnd(e);
          });
        }(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(t) ? t : s.resourcePath + t);
      }
      return e.data ? {
        data: NA(e.type, e.data),
        width: e.width,
        height: e.height
      } : null;
    }
    if (void 0 !== e && e.length > 0) {
      const s = new hD(t);
      n = new gD(s), n.setCrossOrigin(this.crossOrigin);
      for (let t = 0, n = e.length; t < n; t++) {
        const s = e[t],
          n = s.url;
        if (Array.isArray(n)) {
          const e = [];
          for (let t = 0, s = n.length; t < s; t++) {
            const s = a(n[t]);
            null !== s && (s instanceof HTMLImageElement ? e.push(s) : e.push(new zB(s.data, s.width, s.height)));
          }
          i[s.uuid] = new eM(e);
        } else {
          const e = a(s.url);
          i[s.uuid] = new eM(e);
        }
      }
    }
    return i;
  }
  async parseImagesAsync(e) {
    const t = this,
      s = {};
    let i;
    async function n(e) {
      if ("string" == typeof e) {
        const s = e,
          n = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(s) ? s : t.resourcePath + s;
        return await i.loadAsync(n);
      }
      return e.data ? {
        data: NA(e.type, e.data),
        width: e.width,
        height: e.height
      } : null;
    }
    if (void 0 !== e && e.length > 0) {
      i = new gD(this.manager), i.setCrossOrigin(this.crossOrigin);
      for (let t = 0, i = e.length; t < i; t++) {
        const i = e[t],
          a = i.url;
        if (Array.isArray(a)) {
          const e = [];
          for (let t = 0, s = a.length; t < s; t++) {
            const s = a[t],
              i = await n(s);
            null !== i && (i instanceof HTMLImageElement ? e.push(i) : e.push(new zB(i.data, i.width, i.height)));
          }
          s[i.uuid] = new eM(e);
        } else {
          const e = await n(i.url);
          s[i.uuid] = new eM(e);
        }
      }
    }
    return s;
  }
  parseTextures(e, t) {
    function s(e, t) {
      return "number" == typeof e ? e : t[e];
    }
    const i = {};
    if (void 0 !== e) for (let n = 0, a = e.length; n < a; n++) {
      const a = e[n];
      a.image, t[a.image];
      const r = t[a.image],
        o = r.data;
      let l;
      Array.isArray(o) ? (l = new mP(), 6 === o.length && (l.needsUpdate = !0)) : (l = o && o.data ? new zB() : new iM(), o && (l.needsUpdate = !0)), l.source = r, l.uuid = a.uuid, void 0 !== a.name && (l.name = a.name), void 0 !== a.mapping && (l.mapping = s(a.mapping, GD)), void 0 !== a.offset && l.offset.fromArray(a.offset), void 0 !== a.repeat && l.repeat.fromArray(a.repeat), void 0 !== a.center && l.center.fromArray(a.center), void 0 !== a.rotation && (l.rotation = a.rotation), void 0 !== a.wrap && (l.wrapS = s(a.wrap[0], VD), l.wrapT = s(a.wrap[1], VD)), void 0 !== a.format && (l.format = a.format), void 0 !== a.internalFormat && (l.internalFormat = a.internalFormat), void 0 !== a.type && (l.type = a.type), void 0 !== a.encoding && (l.encoding = a.encoding), void 0 !== a.minFilter && (l.minFilter = s(a.minFilter, WD)), void 0 !== a.magFilter && (l.magFilter = s(a.magFilter, WD)), void 0 !== a.anisotropy && (l.anisotropy = a.anisotropy), void 0 !== a.flipY && (l.flipY = a.flipY), void 0 !== a.generateMipmaps && (l.generateMipmaps = a.generateMipmaps), void 0 !== a.premultiplyAlpha && (l.premultiplyAlpha = a.premultiplyAlpha), void 0 !== a.unpackAlignment && (l.unpackAlignment = a.unpackAlignment), void 0 !== a.userData && (l.userData = a.userData), i[a.uuid] = l;
    }
    return i;
  }
  parseObject(e, t, s, i, n) {
    let a, r, o;
    function l(e) {
      return t[e], t[e];
    }
    function c(e) {
      if (void 0 !== e) {
        if (Array.isArray(e)) {
          const t = [];
          for (let i = 0, n = e.length; i < n; i++) {
            const n = e[i];
            s[n], t.push(s[n]);
          }
          return t;
        }
        return s[e], s[e];
      }
    }
    function h(e) {
      return i[e], i[e];
    }
    switch (e.type) {
      case "Scene":
        a = new oB(), void 0 !== e.background && (Number.isInteger(e.background) ? a.background = new AC(e.background) : a.background = h(e.background)), void 0 !== e.environment && (a.environment = h(e.environment)), void 0 !== e.fog && ("Fog" === e.fog.type ? a.fog = new rB(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (a.fog = new aB(e.fog.color, e.fog.density))), void 0 !== e.backgroundBlurriness && (a.backgroundBlurriness = e.backgroundBlurriness), void 0 !== e.backgroundIntensity && (a.backgroundIntensity = e.backgroundIntensity);
        break;
      case "PerspectiveCamera":
        a = new uP(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (a.focus = e.focus), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset), void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case "OrthographicCamera":
        a = new RP(e.left, e.right, e.top, e.bottom, e.near, e.far), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case "AmbientLight":
        a = new DD(e.color, e.intensity);
        break;
      case "DirectionalLight":
        a = new kD(e.color, e.intensity);
        break;
      case "PointLight":
        a = new BD(e.color, e.intensity, e.distance, e.decay);
        break;
      case "RectAreaLight":
        a = new LD(e.color, e.intensity, e.width, e.height);
        break;
      case "SpotLight":
        a = new MD(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
        break;
      case "HemisphereLight":
        a = new yD(e.color, e.groundColor, e.intensity);
        break;
      case "LightProbe":
        a = new RD().fromJSON(e);
        break;
      case "SkinnedMesh":
        r = l(e.geometry), o = c(e.material), a = new OB(r, o), void 0 !== e.bindMode && (a.bindMode = e.bindMode), void 0 !== e.bindMatrix && a.bindMatrix.fromArray(e.bindMatrix), void 0 !== e.skeleton && (a.skeleton = e.skeleton);
        break;
      case "Mesh":
        r = l(e.geometry), o = c(e.material), a = new sP(r, o);
        break;
      case "InstancedMesh":
        r = l(e.geometry), o = c(e.material);
        const t = e.count,
          s = e.instanceMatrix,
          i = e.instanceColor;
        a = new ZB(r, o, t), a.instanceMatrix = new HB(new Float32Array(s.array), 16), void 0 !== i && (a.instanceColor = new HB(new Float32Array(i.array), i.itemSize));
        break;
      case "LOD":
        a = new EB();
        break;
      case "Line":
        a = new eI(l(e.geometry), c(e.material));
        break;
      case "LineLoop":
        a = new nI(l(e.geometry), c(e.material));
        break;
      case "LineSegments":
        a = new iI(l(e.geometry), c(e.material));
        break;
      case "PointCloud":
      case "Points":
        a = new hI(l(e.geometry), c(e.material));
        break;
      case "Sprite":
        a = new MB(c(e.material));
        break;
      case "Group":
        a = new YE();
        break;
      case "Bone":
        a = new RB();
        break;
      default:
        a = new rC();
    }
    if (a.uuid = e.uuid, void 0 !== e.name && (a.name = e.name), void 0 !== e.matrix ? (a.matrix.fromArray(e.matrix), void 0 !== e.matrixAutoUpdate && (a.matrixAutoUpdate = e.matrixAutoUpdate), a.matrixAutoUpdate && a.matrix.decompose(a.position, a.quaternion, a.scale)) : (void 0 !== e.position && a.position.fromArray(e.position), void 0 !== e.rotation && a.rotation.fromArray(e.rotation), void 0 !== e.quaternion && a.quaternion.fromArray(e.quaternion), void 0 !== e.scale && a.scale.fromArray(e.scale)), void 0 !== e.castShadow && (a.castShadow = e.castShadow), void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (a.shadow.bias = e.shadow.bias), void 0 !== e.shadow.normalBias && (a.shadow.normalBias = e.shadow.normalBias), void 0 !== e.shadow.radius && (a.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && a.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (a.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (a.visible = e.visible), void 0 !== e.frustumCulled && (a.frustumCulled = e.frustumCulled), void 0 !== e.renderOrder && (a.renderOrder = e.renderOrder), void 0 !== e.userData && (a.userData = e.userData), void 0 !== e.layers && (a.layers.mask = e.layers), void 0 !== e.children) {
      const r = e.children;
      for (let e = 0; e < r.length; e++) a.add(this.parseObject(r[e], t, s, i, n));
    }
    if (void 0 !== e.animations) {
      const t = e.animations;
      for (let e = 0; e < t.length; e++) {
        const s = t[e];
        a.animations.push(n[s]);
      }
    }
    if ("LOD" === e.type) {
      void 0 !== e.autoUpdate && (a.autoUpdate = e.autoUpdate);
      const t = e.levels;
      for (let e = 0; e < t.length; e++) {
        const s = t[e],
          i = a.getObjectByProperty("uuid", s.object);
        void 0 !== i && a.addLevel(i, s.distance, s.hysteresis);
      }
    }
    return a;
  }
  bindSkeletons(e, t) {
    0 !== Object.keys(t).length && e.traverse(function (e) {
      if (!0 === e.isSkinnedMesh && void 0 !== e.skeleton) {
        const s = t[e.skeleton];
        void 0 === s || e.bind(s, e.bindMatrix);
      }
    });
  }
}
const GD = {
    UVMapping: 300,
    CubeReflectionMapping: Dw,
    CubeRefractionMapping: Lw,
    EquirectangularReflectionMapping: Ow,
    EquirectangularRefractionMapping: Rw,
    CubeUVReflectionMapping: zw
  },
  VD = {
    RepeatWrapping: Nw,
    ClampToEdgeWrapping: Fw,
    MirroredRepeatWrapping: Uw
  },
  WD = {
    NearestFilter: Hw,
    NearestMipmapNearestFilter: Gw,
    NearestMipmapLinearFilter: Vw,
    LinearFilter: Ww,
    LinearMipmapNearestFilter: jw,
    LinearMipmapLinearFilter: qw
  };
class jD extends dD {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, this.options = {
      premultiplyAlpha: "none"
    };
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, s, i) {
    void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const n = this,
      a = cD.get(e);
    if (void 0 !== a) return n.manager.itemStart(e), setTimeout(function () {
      t && t(a), n.manager.itemEnd(e);
    }, 0), a;
    const r = {};
    r.credentials = "anonymous" === this.crossOrigin ? "same-origin" : "include", r.headers = this.requestHeader, fetch(e, r).then(function (e) {
      return e.blob();
    }).then(function (e) {
      return createImageBitmap(e, Object.assign(n.options, {
        colorSpaceConversion: "none"
      }));
    }).then(function (s) {
      cD.add(e, s), t && t(s), n.manager.itemEnd(e);
    }).catch(function (t) {
      i && i(t), n.manager.itemError(e), n.manager.itemEnd(e);
    }), n.manager.itemStart(e);
  }
}
class qD {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = ZD(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const t = ZD();
      e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e;
    }
    return e;
  }
}
function ZD() {
  return ("undefined" == typeof performance ? Date : performance).now();
}
class $D {
  constructor(e, t, s) {
    let i, n, a;
    switch (this.binding = e, this.valueSize = s, t) {
      case "quaternion":
        i = this._slerp, n = this._slerpAdditive, a = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(6 * s), this._workIndex = 5;
        break;
      case "string":
      case "bool":
        i = this._select, n = this._select, a = this._setAdditiveIdentityOther, this.buffer = new Array(5 * s);
        break;
      default:
        i = this._lerp, n = this._lerpAdditive, a = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(5 * s);
    }
    this._mixBufferRegion = i, this._mixBufferRegionAdditive = n, this._setIdentity = a, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0;
  }
  accumulate(e, t) {
    const s = this.buffer,
      i = this.valueSize,
      n = e * i + i;
    let a = this.cumulativeWeight;
    if (0 === a) {
      for (let e = 0; e !== i; ++e) s[n + e] = s[e];
      a = t;
    } else {
      a += t;
      const e = t / a;
      this._mixBufferRegion(s, n, 0, e, i);
    }
    this.cumulativeWeight = a;
  }
  accumulateAdditive(e) {
    const t = this.buffer,
      s = this.valueSize,
      i = s * this._addIndex;
    0 === this.cumulativeWeightAdditive && this._setIdentity(), this._mixBufferRegionAdditive(t, i, 0, e, s), this.cumulativeWeightAdditive += e;
  }
  apply(e) {
    const t = this.valueSize,
      s = this.buffer,
      i = e * t + t,
      n = this.cumulativeWeight,
      a = this.cumulativeWeightAdditive,
      r = this.binding;
    if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, n < 1) {
      const e = t * this._origIndex;
      this._mixBufferRegion(s, i, e, 1 - n, t);
    }
    a > 0 && this._mixBufferRegionAdditive(s, i, this._addIndex * t, 1, t);
    for (let o = t, l = t + t; o !== l; ++o) if (s[o] !== s[o + t]) {
      r.setValue(s, i);
      break;
    }
  }
  saveOriginalState() {
    const e = this.binding,
      t = this.buffer,
      s = this.valueSize,
      i = s * this._origIndex;
    e.getValue(t, i);
    for (let n = s, a = i; n !== a; ++n) t[n] = t[i + n % s];
    this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0;
  }
  restoreOriginalState() {
    const e = 3 * this.valueSize;
    this.binding.setValue(this.buffer, e);
  }
  _setAdditiveIdentityNumeric() {
    const e = this._addIndex * this.valueSize,
      t = e + this.valueSize;
    for (let s = e; s < t; s++) this.buffer[s] = 0;
  }
  _setAdditiveIdentityQuaternion() {
    this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1;
  }
  _setAdditiveIdentityOther() {
    const e = this._origIndex * this.valueSize,
      t = this._addIndex * this.valueSize;
    for (let s = 0; s < this.valueSize; s++) this.buffer[t + s] = this.buffer[e + s];
  }
  _select(e, t, s, i, n) {
    if (i >= .5) for (let a = 0; a !== n; ++a) e[t + a] = e[s + a];
  }
  _slerp(e, t, s, i) {
    UA.slerpFlat(e, t, e, t, e, s, i);
  }
  _slerpAdditive(e, t, s, i, n) {
    const a = this._workIndex * n;
    UA.multiplyQuaternionsFlat(e, a, e, t, e, s), UA.slerpFlat(e, t, e, t, e, a, i);
  }
  _lerp(e, t, s, i, n) {
    const a = 1 - i;
    for (let r = 0; r !== n; ++r) {
      const n = t + r;
      e[n] = e[n] * a + e[s + r] * i;
    }
  }
  _lerpAdditive(e, t, s, i, n) {
    for (let a = 0; a !== n; ++a) {
      const n = t + a;
      e[n] = e[n] + e[s + a] * i;
    }
  }
}
const XD = "\\[\\]\\.:\\/",
  YD = new RegExp("[" + XD + "]", "g"),
  JD = "[^" + XD + "]",
  QD = "[^" + XD.replace("\\.", "") + "]",
  KD = new RegExp("^" + /((?:WC+[\/:])*)/.source.replace("WC", JD) + /(WCOD+)?/.source.replace("WCOD", QD) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", JD) + /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", JD) + "$"),
  eL = ["material", "materials", "bones", "map"];
class tL {
  constructor(e, t, s) {
    this.path = t, this.parsedPath = s || tL.parseTrackName(t), this.node = tL.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, s) {
    return e && e.isAnimationObjectGroup ? new tL.Composite(e, t, s) : new tL(e, t, s);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(YD, "");
  }
  static parseTrackName(e) {
    const t = KD.exec(e);
    if (null === t) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
    const s = {
        nodeName: t[2],
        objectName: t[3],
        objectIndex: t[4],
        propertyName: t[5],
        propertyIndex: t[6]
      },
      i = s.nodeName && s.nodeName.lastIndexOf(".");
    if (void 0 !== i && -1 !== i) {
      const e = s.nodeName.substring(i + 1);
      -1 !== eL.indexOf(e) && (s.nodeName = s.nodeName.substring(0, i), s.objectName = e);
    }
    if (null === s.propertyName || 0 === s.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
    return s;
  }
  static findNode(e, t) {
    if (void 0 === t || "" === t || "." === t || -1 === t || t === e.name || t === e.uuid) return e;
    if (e.skeleton) {
      const s = e.skeleton.getBoneByName(t);
      if (void 0 !== s) return s;
    }
    if (e.children) {
      const s = function (e) {
          for (let i = 0; i < e.length; i++) {
            const n = e[i];
            if (n.name === t || n.uuid === t) return n;
            const a = s(n.children);
            if (a) return a;
          }
          return null;
        },
        i = s(e.children);
      if (i) return i;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const s = this.resolvedProperty;
    for (let i = 0, n = s.length; i !== n; ++i) e[t++] = s[i];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(e, t) {
    const s = this.resolvedProperty;
    for (let i = 0, n = s.length; i !== n; ++i) s[i] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const s = this.resolvedProperty;
    for (let i = 0, n = s.length; i !== n; ++i) s[i] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const s = this.resolvedProperty;
    for (let i = 0, n = s.length; i !== n; ++i) s[i] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node;
    const t = this.parsedPath,
      s = t.objectName,
      i = t.propertyName;
    let n = t.propertyIndex;
    if (e || (e = tL.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) return;
    if (s) {
      let i = t.objectIndex;
      switch (s) {
        case "materials":
          if (!e.material) return;
          if (!e.material.materials) return;
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) return;
          e = e.skeleton.bones;
          for (let t = 0; t < e.length; t++) if (e[t].name === i) {
            i = t;
            break;
          }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) return;
          if (!e.material.map) return;
          e = e.material.map;
          break;
        default:
          if (void 0 === e[s]) return;
          e = e[s];
      }
      if (void 0 !== i) {
        if (void 0 === e[i]) return;
        e = e[i];
      }
    }
    const a = e[i];
    if (void 0 === a) {
      t.nodeName;
      return;
    }
    let r = this.Versioning.None;
    this.targetObject = e, void 0 !== e.needsUpdate ? r = this.Versioning.NeedsUpdate : void 0 !== e.matrixWorldNeedsUpdate && (r = this.Versioning.MatrixWorldNeedsUpdate);
    let o = this.BindingType.Direct;
    if (void 0 !== n) {
      if ("morphTargetInfluences" === i) {
        if (!e.geometry) return;
        if (!e.geometry.morphAttributes) return;
        void 0 !== e.morphTargetDictionary[n] && (n = e.morphTargetDictionary[n]);
      }
      o = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = n;
    } else void 0 !== a.fromArray && void 0 !== a.toArray ? (o = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (o = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = i;
    this.getValue = this.GetterByBindingType[o], this.setValue = this.SetterByBindingTypeAndVersioning[o][r];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
tL.Composite = class {
  constructor(e, t, s) {
    const i = s || tL.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    const s = this._targetGroup.nCachedObjects_,
      i = this._bindings[s];
    void 0 !== i && i.getValue(e, t);
  }
  setValue(e, t) {
    const s = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = s.length; i !== n; ++i) s[i].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, s = e.length; t !== s; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, s = e.length; t !== s; ++t) e[t].unbind();
  }
}, tL.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
}, tL.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
}, tL.prototype.GetterByBindingType = [tL.prototype._getValue_direct, tL.prototype._getValue_array, tL.prototype._getValue_arrayElement, tL.prototype._getValue_toArray], tL.prototype.SetterByBindingTypeAndVersioning = [[tL.prototype._setValue_direct, tL.prototype._setValue_direct_setNeedsUpdate, tL.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [tL.prototype._setValue_array, tL.prototype._setValue_array_setNeedsUpdate, tL.prototype._setValue_array_setMatrixWorldNeedsUpdate], [tL.prototype._setValue_arrayElement, tL.prototype._setValue_arrayElement_setNeedsUpdate, tL.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [tL.prototype._setValue_fromArray, tL.prototype._setValue_fromArray_setNeedsUpdate, tL.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
class sL {
  constructor(e, t, s = null, i = t.blendMode) {
    this._mixer = e, this._clip = t, this._localRoot = s, this.blendMode = i;
    const n = t.tracks,
      a = n.length,
      r = new Array(a),
      o = {
        endingStart: YS,
        endingEnd: YS
      };
    for (let l = 0; l !== a; ++l) {
      const e = n[l].createInterpolant(null);
      r[l] = e, e.settings = o;
    }
    this._interpolantSettings = o, this._interpolants = r, this._propertyBindings = new Array(a), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = 2201, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = Infinity, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0;
  }
  play() {
    return this._mixer._activateAction(this), this;
  }
  stop() {
    return this._mixer._deactivateAction(this), this.reset();
  }
  reset() {
    return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping();
  }
  isRunning() {
    return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
  }
  isScheduled() {
    return this._mixer._isActiveAction(this);
  }
  startAt(e) {
    return this._startTime = e, this;
  }
  setLoop(e, t) {
    return this.loop = e, this.repetitions = t, this;
  }
  setEffectiveWeight(e) {
    return this.weight = e, this._effectiveWeight = this.enabled ? e : 0, this.stopFading();
  }
  getEffectiveWeight() {
    return this._effectiveWeight;
  }
  fadeIn(e) {
    return this._scheduleFading(e, 0, 1);
  }
  fadeOut(e) {
    return this._scheduleFading(e, 1, 0);
  }
  crossFadeFrom(e, t, s) {
    if (e.fadeOut(t), this.fadeIn(t), s) {
      const s = this._clip.duration,
        i = e._clip.duration,
        n = i / s,
        a = s / i;
      e.warp(1, n, t), this.warp(a, 1, t);
    }
    return this;
  }
  crossFadeTo(e, t, s) {
    return e.crossFadeFrom(this, t, s);
  }
  stopFading() {
    const e = this._weightInterpolant;
    return null !== e && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this;
  }
  setEffectiveTimeScale(e) {
    return this.timeScale = e, this._effectiveTimeScale = this.paused ? 0 : e, this.stopWarping();
  }
  getEffectiveTimeScale() {
    return this._effectiveTimeScale;
  }
  setDuration(e) {
    return this.timeScale = this._clip.duration / e, this.stopWarping();
  }
  syncWith(e) {
    return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping();
  }
  halt(e) {
    return this.warp(this._effectiveTimeScale, 0, e);
  }
  warp(e, t, s) {
    const i = this._mixer,
      n = i.time,
      a = this.timeScale;
    let r = this._timeScaleInterpolant;
    null === r && (r = i._lendControlInterpolant(), this._timeScaleInterpolant = r);
    const o = r.parameterPositions,
      l = r.sampleValues;
    return o[0] = n, o[1] = n + s, l[0] = e / a, l[1] = t / a, this;
  }
  stopWarping() {
    const e = this._timeScaleInterpolant;
    return null !== e && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this;
  }
  getMixer() {
    return this._mixer;
  }
  getClip() {
    return this._clip;
  }
  getRoot() {
    return this._localRoot || this._mixer._root;
  }
  _update(e, t, s, i) {
    if (!this.enabled) return void this._updateWeight(e);
    const n = this._startTime;
    if (null !== n) {
      const i = (e - n) * s;
      i < 0 || 0 === s ? t = 0 : (this._startTime = null, t = s * i);
    }
    t *= this._updateTimeScale(e);
    const a = this._updateTime(t),
      r = this._updateWeight(e);
    if (r > 0) {
      const e = this._interpolants,
        t = this._propertyBindings;
      if (this.blendMode === eA) for (let s = 0, i = e.length; s !== i; ++s) e[s].evaluate(a), t[s].accumulateAdditive(r);else for (let s = 0, n = e.length; s !== n; ++s) e[s].evaluate(a), t[s].accumulate(i, r);
    }
  }
  _updateWeight(e) {
    let t = 0;
    if (this.enabled) {
      t = this.weight;
      const s = this._weightInterpolant;
      if (null !== s) {
        const i = s.evaluate(e)[0];
        t *= i, e > s.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1));
      }
    }
    return this._effectiveWeight = t, t;
  }
  _updateTimeScale(e) {
    let t = 0;
    if (!this.paused) {
      t = this.timeScale;
      const s = this._timeScaleInterpolant;
      if (null !== s) {
        t *= s.evaluate(e)[0], e > s.parameterPositions[1] && (this.stopWarping(), 0 === t ? this.paused = !0 : this.timeScale = t);
      }
    }
    return this._effectiveTimeScale = t, t;
  }
  _updateTime(e) {
    const t = this._clip.duration,
      s = this.loop;
    let i = this.time + e,
      n = this._loopCount;
    const a = 2202 === s;
    if (0 === e) return -1 === n ? i : a && 1 == (1 & n) ? t - i : i;
    if (s === jS) {
      -1 === n && (this._loopCount = 0, this._setEndings(!0, !0, !1));
      e: {
        if (i >= t) i = t;else {
          if (!(i < 0)) {
            this.time = i;
            break e;
          }
          i = 0;
        }
        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this.time = i, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e < 0 ? -1 : 1
        });
      }
    } else {
      if (-1 === n && (e >= 0 ? (n = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), i >= t || i < 0) {
        const s = Math.floor(i / t);
        i -= t * s, n += Math.abs(s);
        const r = this.repetitions - n;
        if (r <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, i = e > 0 ? t : 0, this.time = i, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e > 0 ? 1 : -1
        });else {
          if (1 === r) {
            const t = e < 0;
            this._setEndings(t, !t, a);
          } else this._setEndings(!1, !1, a);
          this._loopCount = n, this.time = i, this._mixer.dispatchEvent({
            type: "loop",
            action: this,
            loopDelta: s
          });
        }
      } else this.time = i;
      if (a && 1 == (1 & n)) return t - i;
    }
    return i;
  }
  _setEndings(e, t, s) {
    const i = this._interpolantSettings;
    s ? (i.endingStart = JS, i.endingEnd = JS) : (i.endingStart = e ? this.zeroSlopeAtStart ? JS : YS : QS, i.endingEnd = t ? this.zeroSlopeAtEnd ? JS : YS : QS);
  }
  _scheduleFading(e, t, s) {
    const i = this._mixer,
      n = i.time;
    let a = this._weightInterpolant;
    null === a && (a = i._lendControlInterpolant(), this._weightInterpolant = a);
    const r = a.parameterPositions,
      o = a.sampleValues;
    return r[0] = n, o[0] = t, r[1] = n + e, o[1] = s, this;
  }
}
const iL = new Float32Array(1);
let nL = class extends bA {
  constructor(e) {
    super(), this._root = e, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1;
  }
  _bindAction(e, t) {
    const s = e._localRoot || this._root,
      i = e._clip.tracks,
      n = i.length,
      a = e._propertyBindings,
      r = e._interpolants,
      o = s.uuid,
      l = this._bindingsByRootAndName;
    let c = l[o];
    void 0 === c && (c = {}, l[o] = c);
    for (let h = 0; h !== n; ++h) {
      const e = i[h],
        n = e.name;
      let l = c[n];
      if (void 0 !== l) ++l.referenceCount, a[h] = l;else {
        if (l = a[h], void 0 !== l) {
          null === l._cacheIndex && (++l.referenceCount, this._addInactiveBinding(l, o, n));
          continue;
        }
        const i = t && t._propertyBindings[h].binding.parsedPath;
        l = new $D(tL.create(s, n, i), e.ValueTypeName, e.getValueSize()), ++l.referenceCount, this._addInactiveBinding(l, o, n), a[h] = l;
      }
      r[h].resultBuffer = l.buffer;
    }
  }
  _activateAction(e) {
    if (!this._isActiveAction(e)) {
      if (null === e._cacheIndex) {
        const t = (e._localRoot || this._root).uuid,
          s = e._clip.uuid,
          i = this._actionsByClip[s];
        this._bindAction(e, i && i.knownActions[0]), this._addInactiveAction(e, s, t);
      }
      const t = e._propertyBindings;
      for (let e = 0, s = t.length; e !== s; ++e) {
        const s = t[e];
        0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState());
      }
      this._lendAction(e);
    }
  }
  _deactivateAction(e) {
    if (this._isActiveAction(e)) {
      const t = e._propertyBindings;
      for (let e = 0, s = t.length; e !== s; ++e) {
        const s = t[e];
        0 == --s.useCount && (s.restoreOriginalState(), this._takeBackBinding(s));
      }
      this._takeBackAction(e);
    }
  }
  _initMemoryManager() {
    this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
    const e = this;
    this.stats = {
      actions: {
        get total() {
          return e._actions.length;
        },
        get inUse() {
          return e._nActiveActions;
        }
      },
      bindings: {
        get total() {
          return e._bindings.length;
        },
        get inUse() {
          return e._nActiveBindings;
        }
      },
      controlInterpolants: {
        get total() {
          return e._controlInterpolants.length;
        },
        get inUse() {
          return e._nActiveControlInterpolants;
        }
      }
    };
  }
  _isActiveAction(e) {
    const t = e._cacheIndex;
    return null !== t && t < this._nActiveActions;
  }
  _addInactiveAction(e, t, s) {
    const i = this._actions,
      n = this._actionsByClip;
    let a = n[t];
    if (void 0 === a) a = {
      knownActions: [e],
      actionByRoot: {}
    }, e._byClipCacheIndex = 0, n[t] = a;else {
      const t = a.knownActions;
      e._byClipCacheIndex = t.length, t.push(e);
    }
    e._cacheIndex = i.length, i.push(e), a.actionByRoot[s] = e;
  }
  _removeInactiveAction(e) {
    const t = this._actions,
      s = t[t.length - 1],
      i = e._cacheIndex;
    s._cacheIndex = i, t[i] = s, t.pop(), e._cacheIndex = null;
    const n = e._clip.uuid,
      a = this._actionsByClip,
      r = a[n],
      o = r.knownActions,
      l = o[o.length - 1],
      c = e._byClipCacheIndex;
    l._byClipCacheIndex = c, o[c] = l, o.pop(), e._byClipCacheIndex = null;
    delete r.actionByRoot[(e._localRoot || this._root).uuid], 0 === o.length && delete a[n], this._removeInactiveBindingsForAction(e);
  }
  _removeInactiveBindingsForAction(e) {
    const t = e._propertyBindings;
    for (let s = 0, i = t.length; s !== i; ++s) {
      const e = t[s];
      0 == --e.referenceCount && this._removeInactiveBinding(e);
    }
  }
  _lendAction(e) {
    const t = this._actions,
      s = e._cacheIndex,
      i = this._nActiveActions++,
      n = t[i];
    e._cacheIndex = i, t[i] = e, n._cacheIndex = s, t[s] = n;
  }
  _takeBackAction(e) {
    const t = this._actions,
      s = e._cacheIndex,
      i = --this._nActiveActions,
      n = t[i];
    e._cacheIndex = i, t[i] = e, n._cacheIndex = s, t[s] = n;
  }
  _addInactiveBinding(e, t, s) {
    const i = this._bindingsByRootAndName,
      n = this._bindings;
    let a = i[t];
    void 0 === a && (a = {}, i[t] = a), a[s] = e, e._cacheIndex = n.length, n.push(e);
  }
  _removeInactiveBinding(e) {
    const t = this._bindings,
      s = e.binding,
      i = s.rootNode.uuid,
      n = s.path,
      a = this._bindingsByRootAndName,
      r = a[i],
      o = t[t.length - 1],
      l = e._cacheIndex;
    o._cacheIndex = l, t[l] = o, t.pop(), delete r[n], 0 === Object.keys(r).length && delete a[i];
  }
  _lendBinding(e) {
    const t = this._bindings,
      s = e._cacheIndex,
      i = this._nActiveBindings++,
      n = t[i];
    e._cacheIndex = i, t[i] = e, n._cacheIndex = s, t[s] = n;
  }
  _takeBackBinding(e) {
    const t = this._bindings,
      s = e._cacheIndex,
      i = --this._nActiveBindings,
      n = t[i];
    e._cacheIndex = i, t[i] = e, n._cacheIndex = s, t[s] = n;
  }
  _lendControlInterpolant() {
    const e = this._controlInterpolants,
      t = this._nActiveControlInterpolants++;
    let s = e[t];
    return void 0 === s && (s = new Jk(new Float32Array(2), new Float32Array(2), 1, iL), s.__cacheIndex = t, e[t] = s), s;
  }
  _takeBackControlInterpolant(e) {
    const t = this._controlInterpolants,
      s = e.__cacheIndex,
      i = --this._nActiveControlInterpolants,
      n = t[i];
    e.__cacheIndex = i, t[i] = e, n.__cacheIndex = s, t[s] = n;
  }
  clipAction(e, t, s) {
    const i = t || this._root,
      n = i.uuid;
    let a = "string" == typeof e ? oD.findByName(i, e) : e;
    const r = null !== a ? a.uuid : e,
      o = this._actionsByClip[r];
    let l = null;
    if (void 0 === s && (s = null !== a ? a.blendMode : KS), void 0 !== o) {
      const e = o.actionByRoot[n];
      if (void 0 !== e && e.blendMode === s) return e;
      l = o.knownActions[0], null === a && (a = l._clip);
    }
    if (null === a) return null;
    const c = new sL(this, a, t, s);
    return this._bindAction(c, l), this._addInactiveAction(c, r, n), c;
  }
  existingAction(e, t) {
    const s = t || this._root,
      i = s.uuid,
      n = "string" == typeof e ? oD.findByName(s, e) : e,
      a = n ? n.uuid : e,
      r = this._actionsByClip[a];
    return void 0 !== r && r.actionByRoot[i] || null;
  }
  stopAllAction() {
    const e = this._actions;
    for (let t = this._nActiveActions - 1; t >= 0; --t) e[t].stop();
    return this;
  }
  update(e) {
    e *= this.timeScale;
    const t = this._actions,
      s = this._nActiveActions,
      i = this.time += e,
      n = Math.sign(e),
      a = this._accuIndex ^= 1;
    for (let l = 0; l !== s; ++l) {
      t[l]._update(i, e, n, a);
    }
    const r = this._bindings,
      o = this._nActiveBindings;
    for (let l = 0; l !== o; ++l) r[l].apply(a);
    return this;
  }
  setTime(e) {
    this.time = 0;
    for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
    return this.update(e);
  }
  getRoot() {
    return this._root;
  }
  uncacheClip(e) {
    const t = this._actions,
      s = e.uuid,
      i = this._actionsByClip,
      n = i[s];
    if (void 0 !== n) {
      const e = n.knownActions;
      for (let s = 0, i = e.length; s !== i; ++s) {
        const i = e[s];
        this._deactivateAction(i);
        const n = i._cacheIndex,
          a = t[t.length - 1];
        i._cacheIndex = null, i._byClipCacheIndex = null, a._cacheIndex = n, t[n] = a, t.pop(), this._removeInactiveBindingsForAction(i);
      }
      delete i[s];
    }
  }
  uncacheRoot(e) {
    const t = e.uuid,
      s = this._actionsByClip;
    for (const n in s) {
      const e = s[n].actionByRoot[t];
      void 0 !== e && (this._deactivateAction(e), this._removeInactiveAction(e));
    }
    const i = this._bindingsByRootAndName[t];
    if (void 0 !== i) for (const n in i) {
      const e = i[n];
      e.restoreOriginalState(), this._removeInactiveBinding(e);
    }
  }
  uncacheAction(e, t) {
    const s = this.existingAction(e, t);
    null !== s && (this._deactivateAction(s), this._removeInactiveAction(s));
  }
};
class aL extends lB {
  constructor(e, t, s = 1) {
    super(e, t), this.isInstancedInterleavedBuffer = !0, this.meshPerAttribute = s;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  clone(e) {
    const t = super.clone(e);
    return t.meshPerAttribute = this.meshPerAttribute, t;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.isInstancedInterleavedBuffer = !0, t.meshPerAttribute = this.meshPerAttribute, t;
  }
}
class rL {
  constructor(e, t, s = 0, i = Infinity) {
    this.ray = new LM(e, t), this.near = s, this.far = i, this.camera = null, this.layers = new qM(), this.params = {
      Mesh: {},
      Line: {
        threshold: 1
      },
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera && (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t);
  }
  intersectObject(e, t = !0, s = []) {
    return lL(e, this, s, t), s.sort(oL), s;
  }
  intersectObjects(e, t = !0, s = []) {
    for (let i = 0, n = e.length; i < n; i++) lL(e[i], this, s, t);
    return s.sort(oL), s;
  }
}
function oL(e, t) {
  return e.distance - t.distance;
}
function lL(e, t, s, i) {
  if (e.layers.test(t.layers) && e.raycast(t, s), !0 === i) {
    const i = e.children;
    for (let e = 0, n = i.length; e < n; e++) lL(i[e], t, s, !0);
  }
}
const cL = new DA();
class hL {
  constructor(e = new DA(Infinity, Infinity), t = new DA(-Infinity, -Infinity)) {
    this.isBox2 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, s = e.length; t < s; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const s = cL.copy(t).multiplyScalar(.5);
    return this.min.copy(e).sub(s), this.max.copy(e).add(s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = Infinity, this.max.x = this.max.y = -Infinity, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y));
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y);
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, cL).distanceTo(e);
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const uL = new HA(),
  dL = new HA();
class pL {
  constructor(e = new HA(), t = new HA()) {
    this.start = e, this.end = t;
  }
  set(e, t) {
    return this.start.copy(e), this.end.copy(t), this;
  }
  copy(e) {
    return this.start.copy(e.start), this.end.copy(e.end), this;
  }
  getCenter(e) {
    return e.addVectors(this.start, this.end).multiplyScalar(.5);
  }
  delta(e) {
    return e.subVectors(this.end, this.start);
  }
  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }
  distance() {
    return this.start.distanceTo(this.end);
  }
  at(e, t) {
    return this.delta(t).multiplyScalar(e).add(this.start);
  }
  closestPointToPointParameter(e, t) {
    uL.subVectors(e, this.start), dL.subVectors(this.end, this.start);
    const s = dL.dot(dL);
    let i = dL.dot(uL) / s;
    return t && (i = AA(i, 0, 1)), i;
  }
  closestPointToPoint(e, t, s) {
    const i = this.closestPointToPointParameter(e, t);
    return this.delta(s).multiplyScalar(i).add(this.start);
  }
  applyMatrix4(e) {
    return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this;
  }
  equals(e) {
    return e.start.equals(this.start) && e.end.equals(this.end);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
export { Nx, Fx, Ux, Hx, Gx, Vx, Wx, jx, qx, Zx, $x, Xx, Yx, Jx, Qx, Kx, ew, tw, sw, iw, nw, aw, rw, ow, lw, cw, hw, uw, dw, pw, mw, fw, gw, vw, bw, yw, _w, xw, ww, Sw, Aw, Mw, Cw, Pw, Tw, Ew, Bw, Iw, kw, Dw, Lw, Ow, Rw, zw, Nw, Fw, Uw, Hw, Gw, Vw, Ww, jw, qw, Zw, $w, Xw, Yw, Jw, Qw, Kw, eS, tS, sS, iS, nS, aS, rS, oS, lS, cS, hS, uS, dS, pS, mS, fS, gS, vS, bS, yS, _S, xS, wS, SS, AS, MS, CS, PS, TS, ES, BS, IS, kS, DS, LS, OS, RS, zS, NS, FS, US, HS, GS, VS, WS, jS, qS, ZS, $S, XS, YS, JS, QS, KS, eA, tA, sA, iA, nA, aA, rA, oA, lA, cA, hA, uA, dA, pA, mA, fA, gA, vA, bA, yA, _A, xA, wA, SA, AA, MA, CA, PA, TA, EA, BA, IA, kA, DA, LA, OA, RA, zA, NA, FA, UA, HA, GA, VA, WA, jA, qA, ZA, $A, XA, YA, JA, QA, KA, eM, tM, sM, iM, nM, aM, rM, oM, lM, cM, hM, uM, dM, pM, mM, fM, gM, vM, bM, yM, _M, xM, wM, SM, AM, MM, CM, PM, TM, EM, BM, IM, kM, DM, LM, OM, RM, zM, NM, FM, UM, HM, GM, VM, WM, jM, qM, ZM, $M, XM, YM, JM, QM, KM, eC, tC, sC, iC, nC, aC, rC, oC, lC, cC, hC, uC, dC, pC, mC, fC, gC, vC, bC, yC, _C, xC, wC, SC, AC, MC, CC, PC, TC, EC, BC, IC, kC, DC, LC, OC, RC, zC, NC, FC, UC, HC, GC, VC, WC, jC, qC, ZC, $C, XC, YC, JC, QC, KC, eP, tP, sP, iP, nP, aP, rP, oP, lP, cP, hP, uP, dP, pP, mP, fP, gP, vP, bP, yP, _P, xP, wP, SP, AP, MP, CP, PP, TP, EP, BP, IP, kP, DP, LP, OP, RP, zP, NP, FP, UP, HP, GP, VP, WP, jP, qP, ZP, $P, XP, YP, JP, QP, KP, eT, tT, sT, iT, nT, aT, rT, oT, lT, cT, hT, uT, dT, pT, mT, fT, gT, vT, bT, yT, _T, xT, wT, ST, AT, MT, CT, PT, TT, ET, BT, IT, kT, DT, LT, OT, RT, zT, NT, FT, UT, HT, GT, VT, WT, jT, qT, ZT, $T, XT, YT, JT, QT, KT, eE, tE, sE, iE, nE, aE, rE, oE, lE, cE, hE, uE, dE, pE, mE, fE, gE, vE, bE, yE, _E, xE, wE, SE, AE, ME, CE, PE, TE, EE, BE, IE, kE, DE, LE, OE, RE, zE, NE, FE, UE, HE, GE, VE, WE, jE, qE, ZE, $E, XE, YE, JE, QE, KE, eB, tB, sB, iB, nB, aB, rB, oB, lB, cB, hB, uB, dB, pB, mB, fB, gB, vB, bB, yB, _B, xB, wB, SB, AB, MB, CB, PB, TB, EB, BB, IB, kB, DB, LB, OB, RB, zB, NB, FB, UB, HB, GB, VB, WB, jB, qB, ZB, $B, XB, YB, JB, QB, KB, eI, tI, sI, iI, nI, aI, rI, oI, lI, cI, hI, uI, dI, pI, mI, fI, gI, vI, bI, yI, _I, xI, wI, SI, AI, MI, CI, PI, TI, EI, BI, II, kI, DI, LI, OI, RI, zI, NI, FI, UI, HI, GI, VI, WI, jI, qI, ZI, $I, XI, YI, JI, QI, KI, ek, tk, sk, ik, nk, ak, rk, ok, lk, ck, hk, uk, dk, pk, mk, fk, gk, vk, bk, yk, _k, xk, wk, Sk, Ak, Mk, Ck, Pk, Tk, Ek, Bk, Ik, kk, Dk, Lk, Ok, Rk, zk, Nk, Fk, Uk, Hk, Gk, Vk, Wk, jk, qk, Zk, $k, Xk, Yk, Jk, Qk, Kk, eD, tD, sD, iD, nD, aD, rD, oD, lD, cD, hD, uD, dD, pD, mD, fD, gD, vD, bD, yD, _D, xD, wD, SD, AD, MD, CD, PD, TD, ED, BD, ID, kD, DD, LD, OD, RD, zD, ND, FD, UD, HD, GD, VD, WD, jD, qD, ZD, $D, XD, YD, JD, QD, KD, eL, tL, sL, iL, nL, aL, rL, oL, lL, cL, hL, uL, dL, pL };
