// Extracted third-party code from supplied GLORB base. See THIRD_PARTY.md.

function t(e, t) {
  const s = Object.create(null),
    i = e.split(",");
  for (let n = 0; n < i.length; n++) s[i[n]] = !0;
  return t ? e => !!s[e.toLowerCase()] : e => !!s[e];
}
const s = {},
  i = [],
  n = () => {},
  a = () => !1,
  r = /^on[^a-z]/,
  o = e => r.test(e),
  l = e => e.startsWith("onUpdate:"),
  c = Object.assign,
  h = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  u = Object.prototype.hasOwnProperty,
  d = (e, t) => u.call(e, t),
  p = Array.isArray,
  m = e => "[object Map]" === w(e),
  f = e => "[object Set]" === w(e),
  g = e => "function" == typeof e,
  v = e => "string" == typeof e,
  b = e => "symbol" == typeof e,
  y = e => null !== e && "object" == typeof e,
  _ = e => y(e) && g(e.then) && g(e.catch),
  x = Object.prototype.toString,
  w = e => x.call(e),
  S = e => w(e).slice(8, -1),
  A = e => "[object Object]" === w(e),
  M = e => v(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
  C = t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  P = e => {
    const t = Object.create(null);
    return s => t[s] || (t[s] = e(s));
  },
  T = /-(\w)/g,
  E = P(e => e.replace(T, (e, t) => t ? t.toUpperCase() : "")),
  B = /\B([A-Z])/g,
  I = P(e => e.replace(B, "-$1").toLowerCase()),
  k = P(e => e.charAt(0).toUpperCase() + e.slice(1)),
  D = P(e => e ? `on${k(e)}` : ""),
  L = (e, t) => !Object.is(e, t),
  O = (e, t) => {
    for (let s = 0; s < e.length; s++) e[s](t);
  },
  R = (e, t, s) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: s
    });
  },
  z = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  N = e => {
    const t = v(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let F;
const U = () => F || (F = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});
function H(e) {
  if (p(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const i = e[s],
        n = v(i) ? j(i) : H(i);
      if (n) for (const e in n) t[e] = n[e];
    }
    return t;
  }
  return v(e) || y(e) ? e : void 0;
}
const G = /;(?![^(]*\))/g,
  V = /:([^]+)/,
  W = /\/\*[^]*?\*\//g;
function j(e) {
  const t = {};
  return e.replace(W, "").split(G).forEach(e => {
    if (e) {
      const s = e.split(V);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function q(e) {
  let t = "";
  if (v(e)) t = e;else if (p(e)) for (let s = 0; s < e.length; s++) {
    const i = q(e[s]);
    i && (t += i + " ");
  } else if (y(e)) for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
const Z = t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function $(e) {
  return !!e || "" === e;
}
const X = e => v(e) ? e : null == e ? "" : p(e) || y(e) && (e.toString === x || !g(e.toString)) ? JSON.stringify(e, Y, 2) : String(e),
  Y = (e, t) => t && t.__v_isRef ? Y(e, t.value) : m(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, s]) => (e[`${t} =>`] = s, e), {})
  } : f(t) ? {
    [`Set(${t.size})`]: [...t.values()]
  } : !y(t) || p(t) || A(t) ? t : String(t);
let J;
class Q {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = J, !e && J && (this.index = (J.scopes || (J.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const t = J;
      try {
        return J = this, e();
      } finally {
        J = t;
      }
    }
  }
  on() {
    J = this;
  }
  off() {
    J = this.parent;
  }
  stop(e) {
    if (this._active) {
      let t, s;
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].stop();
      for (t = 0, s = this.cleanups.length; t < s; t++) this.cleanups[t]();
      if (this.scopes) for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].stop(!0);
      if (!this.detached && this.parent && !e) {
        const e = this.parent.scopes.pop();
        e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
const K = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t;
  },
  ee = e => (e.w & ne) > 0,
  te = e => (e.n & ne) > 0,
  se = new WeakMap();
let ie = 0,
  ne = 1;
const ae = 30;
let re;
const oe = Symbol(""),
  le = Symbol("");
class ce {
  constructor(e, t = null, s) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, function (e, t = J) {
      t && t.active && t.effects.push(e);
    }(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let e = re,
      t = ue;
    for (; e;) {
      if (e === this) return;
      e = e.parent;
    }
    try {
      return this.parent = re, re = this, ue = !0, ne = 1 << ++ie, ie <= ae ? (({
        deps: e
      }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ne;
      })(this) : he(this), this.fn();
    } finally {
      ie <= ae && (e => {
        const {
          deps: t
        } = e;
        if (t.length) {
          let s = 0;
          for (let i = 0; i < t.length; i++) {
            const n = t[i];
            ee(n) && !te(n) ? n.delete(e) : t[s++] = n, n.w &= ~ne, n.n &= ~ne;
          }
          t.length = s;
        }
      })(this), ne = 1 << --ie, re = this.parent, ue = t, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    re === this ? this.deferStop = !0 : this.active && (he(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function he(e) {
  const {
    deps: t
  } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++) t[s].delete(e);
    t.length = 0;
  }
}
let ue = !0;
const de = [];
function pe() {
  de.push(ue), ue = !1;
}
function me() {
  const e = de.pop();
  ue = void 0 === e || e;
}
function fe(e, t, s) {
  if (ue && re) {
    let t = se.get(e);
    t || se.set(e, t = new Map());
    let i = t.get(s);
    i || t.set(s, i = K()), ge(i);
  }
}
function ge(e, t) {
  let s = !1;
  ie <= ae ? te(e) || (e.n |= ne, s = !ee(e)) : s = !e.has(re), s && (e.add(re), re.deps.push(e));
}
function ve(e, t, s, i, n, a) {
  const r = se.get(e);
  if (!r) return;
  let o = [];
  if ("clear" === t) o = [...r.values()];else if ("length" === s && p(e)) {
    const e = Number(i);
    r.forEach((t, s) => {
      ("length" === s || s >= e) && o.push(t);
    });
  } else switch (void 0 !== s && o.push(r.get(s)), t) {
    case "add":
      p(e) ? M(s) && o.push(r.get("length")) : (o.push(r.get(oe)), m(e) && o.push(r.get(le)));
      break;
    case "delete":
      p(e) || (o.push(r.get(oe)), m(e) && o.push(r.get(le)));
      break;
    case "set":
      m(e) && o.push(r.get(oe));
  }
  if (1 === o.length) o[0] && be(o[0]);else {
    const e = [];
    for (const t of o) t && e.push(...t);
    be(K(e));
  }
}
function be(e, t) {
  const s = p(e) ? e : [...e];
  for (const i of s) i.computed && ye(i);
  for (const i of s) i.computed || ye(i);
}
function ye(e, t) {
  (e !== re || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const _e = t("__proto__,__v_isRef,__isVue"),
  xe = new Set(Object.getOwnPropertyNames(Symbol).filter(e => "arguments" !== e && "caller" !== e).map(e => Symbol[e]).filter(b)),
  we = Te(),
  Se = Te(!1, !0),
  Ae = Te(!0),
  Me = Ce();
function Ce() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function (...e) {
      const s = dt(this);
      for (let t = 0, n = this.length; t < n; t++) fe(s, 0, t + "");
      const i = s[t](...e);
      return -1 === i || !1 === i ? s[t](...e.map(dt)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function (...e) {
      pe();
      const s = dt(this)[t].apply(this, e);
      return me(), s;
    };
  }), e;
}
function Pe(e) {
  const t = dt(this);
  return fe(t, 0, e), t.hasOwnProperty(e);
}
function Te(e = !1, t = !1) {
  return function (s, i, n) {
    if ("__v_isReactive" === i) return !e;
    if ("__v_isReadonly" === i) return e;
    if ("__v_isShallow" === i) return t;
    if ("__v_raw" === i && n === (e ? t ? it : st : t ? tt : et).get(s)) return s;
    const a = p(s);
    if (!e) {
      if (a && d(Me, i)) return Reflect.get(Me, i, n);
      if ("hasOwnProperty" === i) return Pe;
    }
    const r = Reflect.get(s, i, n);
    return (b(i) ? xe.has(i) : _e(i)) ? r : (e || fe(s, 0, i), t ? r : bt(r) ? a && M(i) ? r : r.value : y(r) ? e ? rt(r) : nt(r) : r);
  };
}
function Ee(e = !1) {
  return function (t, s, i, n) {
    let a = t[s];
    if (ct(a) && bt(a) && !bt(i)) return !1;
    if (!e && (ht(i) || ct(i) || (a = dt(a), i = dt(i)), !p(t) && bt(a) && !bt(i))) return a.value = i, !0;
    const r = p(t) && M(s) ? Number(s) < t.length : d(t, s),
      o = Reflect.set(t, s, i, n);
    return t === dt(n) && (r ? L(i, a) && ve(t, "set", s, i) : ve(t, "add", s, i)), o;
  };
}
const Be = {
    get: we,
    set: Ee(),
    deleteProperty: function (e, t) {
      const s = d(e, t);
      e[t];
      const i = Reflect.deleteProperty(e, t);
      return i && s && ve(e, "delete", t, void 0), i;
    },
    has: function (e, t) {
      const s = Reflect.has(e, t);
      return b(t) && xe.has(t) || fe(e, 0, t), s;
    },
    ownKeys: function (e) {
      return fe(e, 0, p(e) ? "length" : oe), Reflect.ownKeys(e);
    }
  },
  Ie = {
    get: Ae,
    set: (e, t) => !0,
    deleteProperty: (e, t) => !0
  },
  ke = c({}, Be, {
    get: Se,
    set: Ee(!0)
  }),
  De = e => e,
  Le = e => Reflect.getPrototypeOf(e);
function Oe(e, t, s = !1, i = !1) {
  const n = dt(e = e.__v_raw),
    a = dt(t);
  s || (t !== a && fe(n, 0, t), fe(n, 0, a));
  const {
      has: r
    } = Le(n),
    o = i ? De : s ? ft : mt;
  return r.call(n, t) ? o(e.get(t)) : r.call(n, a) ? o(e.get(a)) : void (e !== n && e.get(t));
}
function Re(e, t = !1) {
  const s = this.__v_raw,
    i = dt(s),
    n = dt(e);
  return t || (e !== n && fe(i, 0, e), fe(i, 0, n)), e === n ? s.has(e) : s.has(e) || s.has(n);
}
function ze(e, t = !1) {
  return e = e.__v_raw, !t && fe(dt(e), 0, oe), Reflect.get(e, "size", e);
}
function Ne(e) {
  e = dt(e);
  const t = dt(this);
  return Le(t).has.call(t, e) || (t.add(e), ve(t, "add", e, e)), this;
}
function Fe(e, t) {
  t = dt(t);
  const s = dt(this),
    {
      has: i,
      get: n
    } = Le(s);
  let a = i.call(s, e);
  a || (e = dt(e), a = i.call(s, e));
  const r = n.call(s, e);
  return s.set(e, t), a ? L(t, r) && ve(s, "set", e, t) : ve(s, "add", e, t), this;
}
function Ue(e) {
  const t = dt(this),
    {
      has: s,
      get: i
    } = Le(t);
  let n = s.call(t, e);
  n || (e = dt(e), n = s.call(t, e)), i && i.call(t, e);
  const a = t.delete(e);
  return n && ve(t, "delete", e, void 0), a;
}
function He() {
  const e = dt(this),
    t = 0 !== e.size,
    s = e.clear();
  return t && ve(e, "clear", void 0, void 0), s;
}
function Ge(e, t) {
  return function (s, i) {
    const n = this,
      a = n.__v_raw,
      r = dt(a),
      o = t ? De : e ? ft : mt;
    return !e && fe(r, 0, oe), a.forEach((e, t) => s.call(i, o(e), o(t), n));
  };
}
function Ve(e, t, s) {
  return function (...i) {
    const n = this.__v_raw,
      a = dt(n),
      r = m(a),
      o = "entries" === e || e === Symbol.iterator && r,
      l = "keys" === e && r,
      c = n[e](...i),
      h = s ? De : t ? ft : mt;
    return !t && fe(a, 0, l ? le : oe), {
      next() {
        const {
          value: e,
          done: t
        } = c.next();
        return t ? {
          value: e,
          done: t
        } : {
          value: o ? [h(e[0]), h(e[1])] : h(e),
          done: t
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function We(e) {
  return function (...t) {
    return "delete" !== e && this;
  };
}
function je() {
  const e = {
      get(e) {
        return Oe(this, e);
      },
      get size() {
        return ze(this);
      },
      has: Re,
      add: Ne,
      set: Fe,
      delete: Ue,
      clear: He,
      forEach: Ge(!1, !1)
    },
    t = {
      get(e) {
        return Oe(this, e, !1, !0);
      },
      get size() {
        return ze(this);
      },
      has: Re,
      add: Ne,
      set: Fe,
      delete: Ue,
      clear: He,
      forEach: Ge(!1, !0)
    },
    s = {
      get(e) {
        return Oe(this, e, !0);
      },
      get size() {
        return ze(this, !0);
      },
      has(e) {
        return Re.call(this, e, !0);
      },
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
      forEach: Ge(!0, !1)
    },
    i = {
      get(e) {
        return Oe(this, e, !0, !0);
      },
      get size() {
        return ze(this, !0);
      },
      has(e) {
        return Re.call(this, e, !0);
      },
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
      forEach: Ge(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach(n => {
    e[n] = Ve(n, !1, !1), s[n] = Ve(n, !0, !1), t[n] = Ve(n, !1, !0), i[n] = Ve(n, !0, !0);
  }), [e, s, t, i];
}
const [qe, Ze, $e, Xe] = je();
function Ye(e, t) {
  const s = t ? e ? Xe : $e : e ? Ze : qe;
  return (t, i, n) => "__v_isReactive" === i ? !e : "__v_isReadonly" === i ? e : "__v_raw" === i ? t : Reflect.get(d(s, i) && i in t ? s : t, i, n);
}
const Je = {
    get: Ye(!1, !1)
  },
  Qe = {
    get: Ye(!1, !0)
  },
  Ke = {
    get: Ye(!0, !1)
  },
  et = new WeakMap(),
  tt = new WeakMap(),
  st = new WeakMap(),
  it = new WeakMap();
function nt(e) {
  return ct(e) ? e : ot(e, !1, Be, Je, et);
}
function at(e) {
  return ot(e, !1, ke, Qe, tt);
}
function rt(e) {
  return ot(e, !0, Ie, Ke, st);
}
function ot(e, t, s, i, n) {
  if (!y(e)) return e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const a = n.get(e);
  if (a) return a;
  const r = (o = e).__v_skip || !Object.isExtensible(o) ? 0 : function (e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }(S(o));
  var o;
  if (0 === r) return e;
  const l = new Proxy(e, 2 === r ? i : s);
  return n.set(e, l), l;
}
function lt(e) {
  return ct(e) ? lt(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function ct(e) {
  return !(!e || !e.__v_isReadonly);
}
function ht(e) {
  return !(!e || !e.__v_isShallow);
}
function ut(e) {
  return lt(e) || ct(e);
}
function dt(e) {
  const t = e && e.__v_raw;
  return t ? dt(t) : e;
}
function pt(e) {
  return R(e, "__v_skip", !0), e;
}
const mt = e => y(e) ? nt(e) : e,
  ft = e => y(e) ? rt(e) : e;
function gt(e) {
  ue && re && ge((e = dt(e)).dep || (e.dep = K()));
}
function vt(e, t) {
  const s = (e = dt(e)).dep;
  s && be(s);
}
function bt(e) {
  return !(!e || !0 !== e.__v_isRef);
}
function yt(e) {
  return xt(e, !1);
}
function _t(e) {
  return xt(e, !0);
}
function xt(e, t) {
  return bt(e) ? e : new wt(e, t);
}
class wt {
  constructor(e, t) {
    this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : dt(e), this._value = t ? e : mt(e);
  }
  get value() {
    return gt(this), this._value;
  }
  set value(e) {
    const t = this.__v_isShallow || ht(e) || ct(e);
    e = t ? e : dt(e), L(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : mt(e), vt(this));
  }
}
function St(e) {
  return bt(e) ? e.value : e;
}
const At = {
  get: (e, t, s) => St(Reflect.get(e, t, s)),
  set: (e, t, s, i) => {
    const n = e[t];
    return bt(n) && !bt(s) ? (n.value = s, !0) : Reflect.set(e, t, s, i);
  }
};
function Mt(e) {
  return lt(e) ? e : new Proxy(e, At);
}
class Ct {
  constructor(e, t, s, i) {
    this._setter = t, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new ce(e, () => {
      this._dirty || (this._dirty = !0, vt(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const e = dt(this);
    return gt(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function Pt(e, t, s, i) {
  let n;
  try {
    n = i ? e(...i) : e();
  } catch (a) {
    Et(a, t, s);
  }
  return n;
}
function Tt(e, t, s, i) {
  if (g(e)) {
    const n = Pt(e, t, s, i);
    return n && _(n) && n.catch(e => {
      Et(e, t, s);
    }), n;
  }
  const n = [];
  for (let a = 0; a < e.length; a++) n.push(Tt(e[a], t, s, i));
  return n;
}
function Et(e, t, s, i = !0) {
  t && t.vnode;
  if (t) {
    let i = t.parent;
    const n = t.proxy,
      a = s;
    for (; i;) {
      const t = i.ec;
      if (t) for (let s = 0; s < t.length; s++) if (!1 === t[s](e, n, a)) return;
      i = i.parent;
    }
    const r = t.appContext.config.errorHandler;
    if (r) return void Pt(r, null, 10, [e, n, a]);
  }
}
let Bt = !1,
  It = !1;
const kt = [];
let Dt = 0;
const Lt = [];
let Ot = null,
  Rt = 0;
const zt = Promise.resolve();
let Nt = null;
function Ft(e) {
  const t = Nt || zt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ut(e) {
  kt.length && kt.includes(e, Bt && e.allowRecurse ? Dt + 1 : Dt) || (null == e.id ? kt.push(e) : kt.splice(function (e) {
    let t = Dt + 1,
      s = kt.length;
    for (; t < s;) {
      const i = t + s >>> 1;
      Wt(kt[i]) < e ? t = i + 1 : s = i;
    }
    return t;
  }(e.id), 0, e), Ht());
}
function Ht() {
  Bt || It || (It = !0, Nt = zt.then(qt));
}
function Gt(e, t = Bt ? Dt + 1 : 0) {
  for (; t < kt.length; t++) {
    const e = kt[t];
    e && e.pre && (kt.splice(t, 1), t--, e());
  }
}
function Vt(e) {
  if (Lt.length) {
    const e = [...new Set(Lt)];
    if (Lt.length = 0, Ot) return void Ot.push(...e);
    for (Ot = e, Ot.sort((e, t) => Wt(e) - Wt(t)), Rt = 0; Rt < Ot.length; Rt++) Ot[Rt]();
    Ot = null, Rt = 0;
  }
}
const Wt = e => null == e.id ? Infinity : e.id,
  jt = (e, t) => {
    const s = Wt(e) - Wt(t);
    if (0 === s) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return s;
  };
function qt(e) {
  It = !1, Bt = !0, kt.sort(jt);
  try {
    for (Dt = 0; Dt < kt.length; Dt++) {
      const e = kt[Dt];
      e && !1 !== e.active && Pt(e, null, 14);
    }
  } finally {
    Dt = 0, kt.length = 0, Vt(), Bt = !1, Nt = null, (kt.length || Lt.length) && qt();
  }
}
function Zt(e, t, ...i) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || s;
  let a = i;
  const r = t.startsWith("update:"),
    o = r && t.slice(7);
  if (o && o in n) {
    const e = `${"modelValue" === o ? "model" : o}Modifiers`,
      {
        number: t,
        trim: r
      } = n[e] || s;
    r && (a = i.map(e => v(e) ? e.trim() : e)), t && (a = i.map(z));
  }
  let l,
    c = n[l = D(t)] || n[l = D(E(t))];
  !c && r && (c = n[l = D(I(t))]), c && Tt(c, e, 6, a);
  const h = n[l + "Once"];
  if (h) {
    if (e.emitted) {
      if (e.emitted[l]) return;
    } else e.emitted = {};
    e.emitted[l] = !0, Tt(h, e, 6, a);
  }
}
function $t(e, t, s = !1) {
  const i = t.emitsCache,
    n = i.get(e);
  if (void 0 !== n) return n;
  const a = e.emits;
  let r = {},
    o = !1;
  if (!g(e)) {
    const i = e => {
      const s = $t(e, t, !0);
      s && (o = !0, c(r, s));
    };
    !s && t.mixins.length && t.mixins.forEach(i), e.extends && i(e.extends), e.mixins && e.mixins.forEach(i);
  }
  return a || o ? (p(a) ? a.forEach(e => r[e] = null) : c(r, a), y(e) && i.set(e, r), r) : (y(e) && i.set(e, null), null);
}
function Xt(e, t) {
  return !(!e || !o(t)) && (t = t.slice(2).replace(/Once$/, ""), d(e, t[0].toLowerCase() + t.slice(1)) || d(e, I(t)) || d(e, t));
}
let Yt = null,
  Jt = null;
function Qt(e) {
  const t = Yt;
  return Yt = e, Jt = e && e.type.__scopeId || null, t;
}
function Kt(e) {
  Jt = e;
}
function es() {
  Jt = null;
}
function ts(e, t = Yt, s) {
  if (!t) return e;
  if (e._n) return e;
  const i = (...s) => {
    i._d && Yi(-1);
    const n = Qt(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Qt(n), i._d && Yi(1);
    }
    return a;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function ss(e) {
  const {
    type: t,
    vnode: s,
    proxy: i,
    withProxy: n,
    props: a,
    propsOptions: [r],
    slots: o,
    attrs: c,
    emit: h,
    render: u,
    renderCache: d,
    data: p,
    setupState: m,
    ctx: f,
    inheritAttrs: g
  } = e;
  let v, b;
  const y = Qt(e);
  try {
    if (4 & s.shapeFlag) {
      const e = n || i;
      v = dn(u.call(e, e, d, a, m, p, f)), b = c;
    } else {
      const e = t;
      0, v = dn(e.length > 1 ? e(a, {
        attrs: c,
        slots: o,
        emit: h
      }) : e(a, null)), b = t.props ? c : is(c);
    }
  } catch (x) {
    qi.length = 0, Et(x, e, 1), v = on(Wi);
  }
  let _ = v;
  if (b && !1 !== g) {
    const e = Object.keys(b),
      {
        shapeFlag: t
      } = _;
    e.length && 7 & t && (r && e.some(l) && (b = ns(b, r)), _ = ln(_, b));
  }
  return s.dirs && (_ = ln(_), _.dirs = _.dirs ? _.dirs.concat(s.dirs) : s.dirs), s.transition && (_.transition = s.transition), v = _, Qt(y), v;
}
const is = e => {
    let t;
    for (const s in e) ("class" === s || "style" === s || o(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  ns = (e, t) => {
    const s = {};
    for (const i in e) l(i) && i.slice(9) in t || (s[i] = e[i]);
    return s;
  };
function as(e, t, s) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < i.length; n++) {
    const a = i[n];
    if (t[a] !== e[a] && !Xt(s, a)) return !0;
  }
  return !1;
}
function rs(e, t) {
  return us(e, null, t);
}
function os(e, t) {
  return us(e, null, {
    flush: "post"
  });
}
function ls(e, t) {
  return us(e, null, {
    flush: "sync"
  });
}
const cs = {};
function hs(e, t, s) {
  return us(e, t, s);
}
function us(e, t, {
  immediate: i,
  deep: a,
  flush: r,
  onTrack: o,
  onTrigger: l
} = s) {
  var c;
  const u = J === (null == (c = yn) ? void 0 : c.scope) ? yn : null;
  let d,
    m,
    f = !1,
    v = !1;
  if (bt(e) ? (d = () => e.value, f = ht(e)) : lt(e) ? (d = () => e, a = !0) : p(e) ? (v = !0, f = e.some(e => lt(e) || ht(e)), d = () => e.map(e => bt(e) ? e.value : lt(e) ? ms(e) : g(e) ? Pt(e, u, 2) : void 0)) : d = g(e) ? t ? () => Pt(e, u, 2) : () => {
    if (!u || !u.isUnmounted) return m && m(), Tt(e, u, 3, [y]);
  } : n, t && a) {
    const e = d;
    d = () => ms(e());
  }
  let b,
    y = e => {
      m = S.onStop = () => {
        Pt(e, u, 4);
      };
    };
  if (Tn) {
    if (y = n, t ? i && Tt(t, u, 3, [d(), v ? [] : void 0, y]) : d(), "sync" !== r) return n;
    {
      const e = On();
      b = e.__watcherHandles || (e.__watcherHandles = []);
    }
  }
  let _ = v ? new Array(e.length).fill(cs) : cs;
  const x = () => {
    if (S.active) if (t) {
      const e = S.run();
      (a || f || (v ? e.some((e, t) => L(e, _[t])) : L(e, _))) && (m && m(), Tt(t, u, 3, [e, _ === cs ? void 0 : v && _[0] === cs ? [] : _, y]), _ = e);
    } else S.run();
  };
  let w;
  x.allowRecurse = !!t, "sync" === r ? w = x : "post" === r ? w = () => Ni(x, u && u.suspense) : (x.pre = !0, u && (x.id = u.uid), w = () => Ut(x));
  const S = new ce(d, w);
  t ? i ? x() : _ = S.run() : "post" === r ? Ni(S.run.bind(S), u && u.suspense) : S.run();
  const A = () => {
    S.stop(), u && u.scope && h(u.scope.effects, S);
  };
  return b && b.push(A), A;
}
function ds(e, t, s) {
  const i = this.proxy,
    n = v(e) ? e.includes(".") ? ps(i, e) : () => i[e] : e.bind(i, i);
  let a;
  g(t) ? a = t : (a = t.handler, s = t);
  const r = yn;
  An(this);
  const o = us(n, a.bind(i), s);
  return r ? An(r) : Mn(), o;
}
function ps(e, t) {
  const s = t.split(".");
  return () => {
    let t = e;
    for (let e = 0; e < s.length && t; e++) t = t[s[e]];
    return t;
  };
}
function ms(e, t) {
  if (!y(e) || e.__v_skip) return e;
  if ((t = t || new Set()).has(e)) return e;
  if (t.add(e), bt(e)) ms(e.value, t);else if (p(e)) for (let s = 0; s < e.length; s++) ms(e[s], t);else if (f(e) || m(e)) e.forEach(e => {
    ms(e, t);
  });else if (A(e)) for (const s in e) ms(e[s], t);
  return e;
}
function fs(e, t) {
  const i = Yt;
  if (null === i) return e;
  const n = In(i) || i.proxy,
    a = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [e, i, o, l = s] = t[r];
    e && (g(e) && (e = {
      mounted: e,
      updated: e
    }), e.deep && ms(i), a.push({
      dir: e,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: o,
      modifiers: l
    }));
  }
  return e;
}
function gs(e, t, s, i) {
  const n = e.dirs,
    a = t && t.dirs;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    a && (o.oldValue = a[r].value);
    let l = o.dir[i];
    l && (pe(), Tt(l, s, 8, [e.el, o, e, t]), me());
  }
}
const vs = [Function, Array],
  bs = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: vs,
    onEnter: vs,
    onAfterEnter: vs,
    onEnterCancelled: vs,
    onBeforeLeave: vs,
    onLeave: vs,
    onAfterLeave: vs,
    onLeaveCancelled: vs,
    onBeforeAppear: vs,
    onAppear: vs,
    onAfterAppear: vs,
    onAppearCancelled: vs
  },
  ys = {
    name: "BaseTransition",
    props: bs,
    setup(e, {
      slots: t
    }) {
      const s = _n(),
        i = function () {
          const e = {
            isMounted: !1,
            isLeaving: !1,
            isUnmounting: !1,
            leavingVNodes: new Map()
          };
          return Rs(() => {
            e.isMounted = !0;
          }), Fs(() => {
            e.isUnmounting = !0;
          }), e;
        }();
      let n;
      return () => {
        const a = t.default && Ms(t.default(), !0);
        if (!a || !a.length) return;
        let r = a[0];
        if (a.length > 1) for (const e of a) if (e.type !== Wi) {
          r = e;
          break;
        }
        const o = dt(e),
          {
            mode: l
          } = o;
        if (i.isLeaving) return ws(r);
        const c = Ss(r);
        if (!c) return ws(r);
        const h = xs(c, o, i, s);
        As(c, h);
        const u = s.subTree,
          d = u && Ss(u);
        let p = !1;
        const {
          getTransitionKey: m
        } = c.type;
        if (m) {
          const e = m();
          void 0 === n ? n = e : e !== n && (n = e, p = !0);
        }
        if (d && d.type !== Wi && (!tn(c, d) || p)) {
          const e = xs(d, o, i, s);
          if (As(d, e), "out-in" === l) return i.isLeaving = !0, e.afterLeave = () => {
            i.isLeaving = !1, !1 !== s.update.active && s.update();
          }, ws(r);
          "in-out" === l && c.type !== Wi && (e.delayLeave = (e, t, s) => {
            _s(i, d)[String(d.key)] = d, e._leaveCb = () => {
              t(), e._leaveCb = void 0, delete h.delayedLeave;
            }, h.delayedLeave = s;
          });
        }
        return r;
      };
    }
  };
function _s(e, t) {
  const {
    leavingVNodes: s
  } = e;
  let i = s.get(t.type);
  return i || (i = Object.create(null), s.set(t.type, i)), i;
}
function xs(e, t, s, i) {
  const {
      appear: n,
      mode: a,
      persisted: r = !1,
      onBeforeEnter: o,
      onEnter: l,
      onAfterEnter: c,
      onEnterCancelled: h,
      onBeforeLeave: u,
      onLeave: d,
      onAfterLeave: m,
      onLeaveCancelled: f,
      onBeforeAppear: g,
      onAppear: v,
      onAfterAppear: b,
      onAppearCancelled: y
    } = t,
    _ = String(e.key),
    x = _s(s, e),
    w = (e, t) => {
      e && Tt(e, i, 9, t);
    },
    S = (e, t) => {
      const s = t[1];
      w(e, t), p(e) ? e.every(e => e.length <= 1) && s() : e.length <= 1 && s();
    },
    A = {
      mode: a,
      persisted: r,
      beforeEnter(t) {
        let i = o;
        if (!s.isMounted) {
          if (!n) return;
          i = g || o;
        }
        t._leaveCb && t._leaveCb(!0);
        const a = x[_];
        a && tn(e, a) && a.el._leaveCb && a.el._leaveCb(), w(i, [t]);
      },
      enter(e) {
        let t = l,
          i = c,
          a = h;
        if (!s.isMounted) {
          if (!n) return;
          t = v || l, i = b || c, a = y || h;
        }
        let r = !1;
        const o = e._enterCb = t => {
          r || (r = !0, w(t ? a : i, [e]), A.delayedLeave && A.delayedLeave(), e._enterCb = void 0);
        };
        t ? S(t, [e, o]) : o();
      },
      leave(t, i) {
        const n = String(e.key);
        if (t._enterCb && t._enterCb(!0), s.isUnmounting) return i();
        w(u, [t]);
        let a = !1;
        const r = t._leaveCb = s => {
          a || (a = !0, i(), w(s ? f : m, [t]), t._leaveCb = void 0, x[n] === e && delete x[n]);
        };
        x[n] = e, d ? S(d, [t, r]) : r();
      },
      clone: e => xs(e, t, s, i)
    };
  return A;
}
function ws(e) {
  if (Ts(e)) return (e = ln(e)).children = null, e;
}
function Ss(e) {
  return Ts(e) ? e.children ? e.children[0] : void 0 : e;
}
function As(e, t) {
  6 & e.shapeFlag && e.component ? As(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ms(e, t = !1, s) {
  let i = [],
    n = 0;
  for (let a = 0; a < e.length; a++) {
    let r = e[a];
    const o = null == s ? r.key : String(s) + String(null != r.key ? r.key : a);
    r.type === Gi ? (128 & r.patchFlag && n++, i = i.concat(Ms(r.children, t, o))) : (t || r.type !== Wi) && i.push(null != o ? ln(r, {
      key: o
    }) : r);
  }
  if (n > 1) for (let a = 0; a < i.length; a++) i[a].patchFlag = -2;
  return i;
}
function Cs(e, t) {
  return g(e) ? (() => c({
    name: e.name
  }, t, {
    setup: e
  }))() : e;
}
const Ps = e => !!e.type.__asyncLoader,
  Ts = e => e.type.__isKeepAlive;
function Es(e, t) {
  Is(e, "a", t);
}
function Bs(e, t) {
  Is(e, "da", t);
}
function Is(e, t, s = yn) {
  const i = e.__wdc || (e.__wdc = () => {
    let t = s;
    for (; t;) {
      if (t.isDeactivated) return;
      t = t.parent;
    }
    return e();
  });
  if (Ds(t, i, s), s) {
    let e = s.parent;
    for (; e && e.parent;) Ts(e.parent.vnode) && ks(i, t, s, e), e = e.parent;
  }
}
function ks(e, t, s, i) {
  const n = Ds(t, e, i, !0);
  Us(() => {
    h(i[t], n);
  }, s);
}
function Ds(e, t, s = yn, i = !1) {
  if (s) {
    const n = s[e] || (s[e] = []),
      a = t.__weh || (t.__weh = (...i) => {
        if (s.isUnmounted) return;
        pe(), An(s);
        const n = Tt(t, s, e, i);
        return Mn(), me(), n;
      });
    return i ? n.unshift(a) : n.push(a), a;
  }
}
const Ls = e => (t, s = yn) => (!Tn || "sp" === e) && Ds(e, (...e) => t(...e), s),
  Os = Ls("bm"),
  Rs = Ls("m"),
  zs = Ls("bu"),
  Ns = Ls("u"),
  Fs = Ls("bum"),
  Us = Ls("um"),
  Hs = Ls("sp"),
  Gs = Ls("rtg"),
  Vs = Ls("rtc");
function Ws(e, t = yn) {
  Ds("ec", e, t);
}
const js = "components";
function qs(e, t) {
  return Xs(js, e, !0, t) || e;
}
const Zs = Symbol.for("v-ndc");
function $s(e) {
  return v(e) ? Xs(js, e, !1) || e : e || Zs;
}
function Xs(e, t, s = !0, i = !1) {
  const n = Yt || yn;
  if (n) {
    const s = n.type;
    if (e === js) {
      const e = function (e, t = !0) {
        return g(e) ? e.displayName || e.name : e.name || t && e.__name;
      }(s, !1);
      if (e && (e === t || e === E(t) || e === k(E(t)))) return s;
    }
    const a = Ys(n[e] || s[e], t) || Ys(n.appContext[e], t);
    return !a && i ? s : a;
  }
}
function Ys(e, t) {
  return e && (e[t] || e[E(t)] || e[k(E(t))]);
}
function Js(e, t, s, i) {
  let n;
  const a = s && s[i];
  if (p(e) || v(e)) {
    n = new Array(e.length);
    for (let s = 0, i = e.length; s < i; s++) n[s] = t(e[s], s, void 0, a && a[s]);
  } else if ("number" == typeof e) {
    n = new Array(e);
    for (let s = 0; s < e; s++) n[s] = t(s + 1, s, void 0, a && a[s]);
  } else if (y(e)) {
    if (e[Symbol.iterator]) n = Array.from(e, (e, s) => t(e, s, void 0, a && a[s]));else {
      const s = Object.keys(e);
      n = new Array(s.length);
      for (let i = 0, r = s.length; i < r; i++) {
        const r = s[i];
        n[i] = t(e[r], r, i, a && a[i]);
      }
    }
  } else n = [];
  return s && (s[i] = n), n;
}
function Qs(e, t, s = {}, i, n) {
  if (Yt.isCE || Yt.parent && Ps(Yt.parent) && Yt.parent.isCE) return "default" !== t && (s.name = t), on("slot", s, i && i());
  let a = e[t];
  a && a._c && (a._d = !1), $i();
  const r = a && Ks(a(s)),
    o = Ki(Gi, {
      key: s.key || r && r.key || `_${t}`
    }, r || (i ? i() : []), r && 1 === e._ ? 64 : -2);
  return !n && o.scopeId && (o.slotScopeIds = [o.scopeId + "-s"]), a && a._c && (a._d = !0), o;
}
function Ks(e) {
  return e.some(e => !en(e) || e.type !== Wi && !(e.type === Gi && !Ks(e.children))) ? e : null;
}
const ei = e => e ? Cn(e) ? In(e) || e.proxy : ei(e.parent) : null,
  ti = c(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => ei(e.parent),
    $root: e => ei(e.root),
    $emit: e => e.emit,
    $options: e => ci(e),
    $forceUpdate: e => e.f || (e.f = () => Ut(e.update)),
    $nextTick: e => e.n || (e.n = Ft.bind(e.proxy)),
    $watch: e => ds.bind(e)
  }),
  si = (e, t) => e !== s && !e.__isScriptSetup && d(e, t),
  ii = {
    get({
      _: e
    }, t) {
      const {
        ctx: i,
        setupState: n,
        data: a,
        props: r,
        accessCache: o,
        type: l,
        appContext: c
      } = e;
      let h;
      if ("$" !== t[0]) {
        const l = o[t];
        if (void 0 !== l) switch (l) {
          case 1:
            return n[t];
          case 2:
            return a[t];
          case 4:
            return i[t];
          case 3:
            return r[t];
        } else {
          if (si(n, t)) return o[t] = 1, n[t];
          if (a !== s && d(a, t)) return o[t] = 2, a[t];
          if ((h = e.propsOptions[0]) && d(h, t)) return o[t] = 3, r[t];
          if (i !== s && d(i, t)) return o[t] = 4, i[t];
          ai && (o[t] = 0);
        }
      }
      const u = ti[t];
      let p, m;
      return u ? ("$attrs" === t && fe(e, 0, t), u(e)) : (p = l.__cssModules) && (p = p[t]) ? p : i !== s && d(i, t) ? (o[t] = 4, i[t]) : (m = c.config.globalProperties, d(m, t) ? m[t] : void 0);
    },
    set({
      _: e
    }, t, i) {
      const {
        data: n,
        setupState: a,
        ctx: r
      } = e;
      return si(a, t) ? (a[t] = i, !0) : n !== s && d(n, t) ? (n[t] = i, !0) : !d(e.props, t) && ("$" !== t[0] || !(t.slice(1) in e)) && (r[t] = i, !0);
    },
    has({
      _: {
        data: e,
        setupState: t,
        accessCache: i,
        ctx: n,
        appContext: a,
        propsOptions: r
      }
    }, o) {
      let l;
      return !!i[o] || e !== s && d(e, o) || si(t, o) || (l = r[0]) && d(l, o) || d(n, o) || d(ti, o) || d(a.config.globalProperties, o);
    },
    defineProperty(e, t, s) {
      return null != s.get ? e._.accessCache[t] = 0 : d(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
    }
  };
function ni(e) {
  return p(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
let ai = !0;
function ri(e) {
  const t = ci(e),
    s = e.proxy,
    i = e.ctx;
  ai = !1, t.beforeCreate && oi(t.beforeCreate, e, "bc");
  const {
    data: a,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: h,
    created: u,
    beforeMount: d,
    mounted: m,
    beforeUpdate: f,
    updated: v,
    activated: b,
    deactivated: _,
    beforeDestroy: x,
    beforeUnmount: w,
    destroyed: S,
    unmounted: A,
    render: M,
    renderTracked: C,
    renderTriggered: P,
    errorCaptured: T,
    serverPrefetch: E,
    expose: B,
    inheritAttrs: I,
    components: k,
    directives: D,
    filters: L
  } = t;
  if (h && function (e, t, s = n) {
    p(e) && (e = pi(e));
    for (const i in e) {
      const s = e[i];
      let n;
      n = y(s) ? "default" in s ? wi(s.from || i, s.default, !0) : wi(s.from || i) : wi(s), bt(n) ? Object.defineProperty(t, i, {
        enumerable: !0,
        configurable: !0,
        get: () => n.value,
        set: e => n.value = e
      }) : t[i] = n;
    }
  }(h, i, null), o) for (const n in o) {
    const e = o[n];
    g(e) && (i[n] = e.bind(s));
  }
  if (a) {
    const t = a.call(s, s);
    y(t) && (e.data = nt(t));
  }
  if (ai = !0, r) for (const p in r) {
    const e = r[p],
      t = g(e) ? e.bind(s, s) : g(e.get) ? e.get.bind(s, s) : n,
      a = !g(e) && g(e.set) ? e.set.bind(s) : n,
      o = kn({
        get: t,
        set: a
      });
    Object.defineProperty(i, p, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: e => o.value = e
    });
  }
  if (l) for (const n in l) li(l[n], i, s, n);
  if (c) {
    const e = g(c) ? c.call(s) : c;
    Reflect.ownKeys(e).forEach(t => {
      xi(t, e[t]);
    });
  }
  function O(e, t) {
    p(t) ? t.forEach(t => e(t.bind(s))) : t && e(t.bind(s));
  }
  if (u && oi(u, e, "c"), O(Os, d), O(Rs, m), O(zs, f), O(Ns, v), O(Es, b), O(Bs, _), O(Ws, T), O(Vs, C), O(Gs, P), O(Fs, w), O(Us, A), O(Hs, E), p(B)) if (B.length) {
    const t = e.exposed || (e.exposed = {});
    B.forEach(e => {
      Object.defineProperty(t, e, {
        get: () => s[e],
        set: t => s[e] = t
      });
    });
  } else e.exposed || (e.exposed = {});
  M && e.render === n && (e.render = M), null != I && (e.inheritAttrs = I), k && (e.components = k), D && (e.directives = D);
}
function oi(e, t, s) {
  Tt(p(e) ? e.map(e => e.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function li(e, t, s, i) {
  const n = i.includes(".") ? ps(s, i) : () => s[i];
  if (v(e)) {
    const s = t[e];
    g(s) && hs(n, s);
  } else if (g(e)) hs(n, e.bind(s));else if (y(e)) if (p(e)) e.forEach(e => li(e, t, s, i));else {
    const i = g(e.handler) ? e.handler.bind(s) : t[e.handler];
    g(i) && hs(n, i, e);
  }
}
function ci(e) {
  const t = e.type,
    {
      mixins: s,
      extends: i
    } = t,
    {
      mixins: n,
      optionsCache: a,
      config: {
        optionMergeStrategies: r
      }
    } = e.appContext,
    o = a.get(t);
  let l;
  return o ? l = o : n.length || s || i ? (l = {}, n.length && n.forEach(e => hi(l, e, r, !0)), hi(l, t, r)) : l = t, y(t) && a.set(t, l), l;
}
function hi(e, t, s, i = !1) {
  const {
    mixins: n,
    extends: a
  } = t;
  a && hi(e, a, s, !0), n && n.forEach(t => hi(e, t, s, !0));
  for (const r in t) if (i && "expose" === r) ;else {
    const i = ui[r] || s && s[r];
    e[r] = i ? i(e[r], t[r]) : t[r];
  }
  return e;
}
const ui = {
  data: di,
  props: gi,
  emits: gi,
  methods: fi,
  computed: fi,
  beforeCreate: mi,
  created: mi,
  beforeMount: mi,
  mounted: mi,
  beforeUpdate: mi,
  updated: mi,
  beforeDestroy: mi,
  beforeUnmount: mi,
  destroyed: mi,
  unmounted: mi,
  activated: mi,
  deactivated: mi,
  errorCaptured: mi,
  serverPrefetch: mi,
  components: fi,
  directives: fi,
  watch: function (e, t) {
    if (!e) return t;
    if (!t) return e;
    const s = c(Object.create(null), e);
    for (const i in t) s[i] = mi(e[i], t[i]);
    return s;
  },
  provide: di,
  inject: function (e, t) {
    return fi(pi(e), pi(t));
  }
};
function di(e, t) {
  return t ? e ? function () {
    return c(g(e) ? e.call(this, this) : e, g(t) ? t.call(this, this) : t);
  } : t : e;
}
function pi(e) {
  if (p(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function mi(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fi(e, t) {
  return e ? c(Object.create(null), e, t) : t;
}
function gi(e, t) {
  return e ? p(e) && p(t) ? [...new Set([...e, ...t])] : c(Object.create(null), ni(e), ni(null != t ? t : {})) : t;
}
function vi() {
  return {
    app: null,
    config: {
      isNativeTag: a,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let bi = 0;
function yi(e, t) {
  return function (s, i = null) {
    g(s) || (s = c({}, s)), null == i || y(i) || (i = null);
    const n = vi(),
      a = new Set();
    let r = !1;
    const o = n.app = {
      _uid: bi++,
      _component: s,
      _props: i,
      _container: null,
      _context: n,
      _instance: null,
      version: Rn,
      get config() {
        return n.config;
      },
      set config(e) {},
      use: (e, ...t) => (a.has(e) || (e && g(e.install) ? (a.add(e), e.install(o, ...t)) : g(e) && (a.add(e), e(o, ...t))), o),
      mixin: e => (n.mixins.includes(e) || n.mixins.push(e), o),
      component: (e, t) => t ? (n.components[e] = t, o) : n.components[e],
      directive: (e, t) => t ? (n.directives[e] = t, o) : n.directives[e],
      mount(a, l, c) {
        if (!r) {
          const h = on(s, i);
          return h.appContext = n, l && t ? t(h, a) : e(h, a, c), r = !0, o._container = a, a.__vue_app__ = o, In(h.component) || h.component.proxy;
        }
      },
      unmount() {
        r && (e(null, o._container), delete o._container.__vue_app__);
      },
      provide: (e, t) => (n.provides[e] = t, o),
      runWithContext(e) {
        _i = o;
        try {
          return e();
        } finally {
          _i = null;
        }
      }
    };
    return o;
  };
}
let _i = null;
function xi(e, t) {
  if (yn) {
    let s = yn.provides;
    const i = yn.parent && yn.parent.provides;
    i === s && (s = yn.provides = Object.create(i)), s[e] = t;
  } else ;
}
function wi(e, t, s = !1) {
  const i = yn || Yt;
  if (i || _i) {
    const n = i ? null == i.parent ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : _i._context.provides;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return s && g(t) ? t.call(i && i.proxy) : t;
  }
}
function Si(e, t, i, n) {
  const [a, r] = e.propsOptions;
  let o,
    l = !1;
  if (t) for (let s in t) {
    if (C(s)) continue;
    const c = t[s];
    let h;
    a && d(a, h = E(s)) ? r && r.includes(h) ? (o || (o = {}))[h] = c : i[h] = c : Xt(e.emitsOptions, s) || s in n && c === n[s] || (n[s] = c, l = !0);
  }
  if (r) {
    const t = dt(i),
      n = o || s;
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      i[o] = Ai(a, t, o, n[o], e, !d(n, o));
    }
  }
  return l;
}
function Ai(e, t, s, i, n, a) {
  const r = e[s];
  if (null != r) {
    const e = d(r, "default");
    if (e && void 0 === i) {
      const e = r.default;
      if (r.type !== Function && !r.skipFactory && g(e)) {
        const {
          propsDefaults: a
        } = n;
        s in a ? i = a[s] : (An(n), i = a[s] = e.call(null, t), Mn());
      } else i = e;
    }
    r[0] && (a && !e ? i = !1 : !r[1] || "" !== i && i !== I(s) || (i = !0));
  }
  return i;
}
function Mi(e, t, n = !1) {
  const a = t.propsCache,
    r = a.get(e);
  if (r) return r;
  const o = e.props,
    l = {},
    h = [];
  let u = !1;
  if (!g(e)) {
    const s = e => {
      u = !0;
      const [s, i] = Mi(e, t, !0);
      c(l, s), i && h.push(...i);
    };
    !n && t.mixins.length && t.mixins.forEach(s), e.extends && s(e.extends), e.mixins && e.mixins.forEach(s);
  }
  if (!o && !u) return y(e) && a.set(e, i), i;
  if (p(o)) for (let i = 0; i < o.length; i++) {
    const e = E(o[i]);
    Ci(e) && (l[e] = s);
  } else if (o) for (const s in o) {
    const e = E(s);
    if (Ci(e)) {
      const t = o[s],
        i = l[e] = p(t) || g(t) ? {
          type: t
        } : c({}, t);
      if (i) {
        const t = Ei(Boolean, i.type),
          s = Ei(String, i.type);
        i[0] = t > -1, i[1] = s < 0 || t < s, (t > -1 || d(i, "default")) && h.push(e);
      }
    }
  }
  const m = [l, h];
  return y(e) && a.set(e, m), m;
}
function Ci(e) {
  return "$" !== e[0];
}
function Pi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : null === e ? "null" : "";
}
function Ti(e, t) {
  return Pi(e) === Pi(t);
}
function Ei(e, t) {
  return p(t) ? t.findIndex(t => Ti(t, e)) : g(t) && Ti(t, e) ? 0 : -1;
}
const Bi = e => "_" === e[0] || "$stable" === e,
  Ii = e => p(e) ? e.map(dn) : [dn(e)],
  ki = (e, t, s) => {
    if (t._n) return t;
    const i = ts((...e) => Ii(t(...e)), s);
    return i._c = !1, i;
  },
  Di = (e, t, s) => {
    const i = e._ctx;
    for (const n in e) {
      if (Bi(n)) continue;
      const s = e[n];
      if (g(s)) t[n] = ki(0, s, i);else if (null != s) {
        const e = Ii(s);
        t[n] = () => e;
      }
    }
  },
  Li = (e, t) => {
    const s = Ii(t);
    e.slots.default = () => s;
  },
  Oi = (e, t) => {
    if (32 & e.vnode.shapeFlag) {
      const s = t._;
      s ? (e.slots = dt(t), R(t, "_", s)) : Di(t, e.slots = {});
    } else e.slots = {}, t && Li(e, t);
    R(e.slots, sn, 1);
  },
  Ri = (e, t, i) => {
    const {
      vnode: n,
      slots: a
    } = e;
    let r = !0,
      o = s;
    if (32 & n.shapeFlag) {
      const e = t._;
      e ? i && 1 === e ? r = !1 : (c(a, t), i || 1 !== e || delete a._) : (r = !t.$stable, Di(t, a)), o = t;
    } else t && (Li(e, t), o = {
      default: 1
    });
    if (r) for (const s in a) Bi(s) || s in o || delete a[s];
  };
function zi(e, t, i, n, a = !1) {
  if (p(e)) return void e.forEach((e, s) => zi(e, t && (p(t) ? t[s] : t), i, n, a));
  if (Ps(n) && !a) return;
  const r = 4 & n.shapeFlag ? In(n.component) || n.component.proxy : n.el,
    o = a ? null : r,
    {
      i: l,
      r: c
    } = e,
    u = t && t.r,
    m = l.refs === s ? l.refs = {} : l.refs,
    f = l.setupState;
  if (null != u && u !== c && (v(u) ? (m[u] = null, d(f, u) && (f[u] = null)) : bt(u) && (u.value = null)), g(c)) Pt(c, l, 12, [o, m]);else {
    const t = v(c),
      s = bt(c);
    if (t || s) {
      const n = () => {
        if (e.f) {
          const s = t ? d(f, c) ? f[c] : m[c] : c.value;
          a ? p(s) && h(s, r) : p(s) ? s.includes(r) || s.push(r) : t ? (m[c] = [r], d(f, c) && (f[c] = m[c])) : (c.value = [r], e.k && (m[e.k] = c.value));
        } else t ? (m[c] = o, d(f, c) && (f[c] = o)) : s && (c.value = o, e.k && (m[e.k] = o));
      };
      o ? (n.id = -1, Ni(n, i)) : n();
    }
  }
}
const Ni = function (e, t) {
  var s;
  t && t.pendingBranch ? p(e) ? t.effects.push(...e) : t.effects.push(e) : (p(s = e) ? Lt.push(...s) : Ot && Ot.includes(s, s.allowRecurse ? Rt + 1 : Rt) || Lt.push(s), Ht());
};
function Fi(e) {
  return function (e, t) {
    U().__VUE__ = !0;
    const {
        insert: a,
        remove: r,
        patchProp: o,
        createElement: l,
        createText: c,
        createComment: h,
        setText: u,
        setElementText: p,
        parentNode: m,
        nextSibling: f,
        setScopeId: g = n,
        insertStaticContent: v
      } = e,
      b = (e, t, s, i = null, n = null, a = null, r = !1, o = null, l = !!t.dynamicChildren) => {
        if (e === t) return;
        e && !tn(e, t) && (i = ee(e), $(e, n, a, !0), e = null), -2 === t.patchFlag && (l = !1, t.dynamicChildren = null);
        const {
          type: c,
          ref: h,
          shapeFlag: u
        } = t;
        switch (c) {
          case Vi:
            y(e, t, s, i);
            break;
          case Wi:
            x(e, t, s, i);
            break;
          case ji:
            null == e && w(t, s, i, r);
            break;
          case Gi:
            z(e, t, s, i, n, a, r, o, l);
            break;
          default:
            1 & u ? M(e, t, s, i, n, a, r, o, l) : 6 & u ? N(e, t, s, i, n, a, r, o, l) : (64 & u || 128 & u) && c.process(e, t, s, i, n, a, r, o, l, se);
        }
        null != h && n && zi(h, e && e.ref, a, t || e, !t);
      },
      y = (e, t, s, i) => {
        if (null == e) a(t.el = c(t.children), s, i);else {
          const s = t.el = e.el;
          t.children !== e.children && u(s, t.children);
        }
      },
      x = (e, t, s, i) => {
        null == e ? a(t.el = h(t.children || ""), s, i) : t.el = e.el;
      },
      w = (e, t, s, i) => {
        [e.el, e.anchor] = v(e.children, t, s, i, e.el, e.anchor);
      },
      S = ({
        el: e,
        anchor: t
      }, s, i) => {
        let n;
        for (; e && e !== t;) n = f(e), a(e, s, i), e = n;
        a(t, s, i);
      },
      A = ({
        el: e,
        anchor: t
      }) => {
        let s;
        for (; e && e !== t;) s = f(e), r(e), e = s;
        r(t);
      },
      M = (e, t, s, i, n, a, r, o, l) => {
        r = r || "svg" === t.type, null == e ? P(t, s, i, n, a, r, o, l) : k(e, t, n, a, r, o, l);
      },
      P = (e, t, s, i, n, r, c, h) => {
        let u, d;
        const {
          type: m,
          props: f,
          shapeFlag: g,
          transition: v,
          dirs: b
        } = e;
        if (u = e.el = l(e.type, r, f && f.is, f), 8 & g ? p(u, e.children) : 16 & g && B(e.children, u, null, i, n, r && "foreignObject" !== m, c, h), b && gs(e, null, i, "created"), T(u, e, e.scopeId, c, i), f) {
          for (const t in f) "value" === t || C(t) || o(u, t, null, f[t], r, e.children, i, n, K);
          "value" in f && o(u, "value", null, f.value), (d = f.onVnodeBeforeMount) && gn(d, i, e);
        }
        b && gs(e, null, i, "beforeMount");
        const y = (!n || n && !n.pendingBranch) && v && !v.persisted;
        y && v.beforeEnter(u), a(u, t, s), ((d = f && f.onVnodeMounted) || y || b) && Ni(() => {
          d && gn(d, i, e), y && v.enter(u), b && gs(e, null, i, "mounted");
        }, n);
      },
      T = (e, t, s, i, n) => {
        if (s && g(e, s), i) for (let a = 0; a < i.length; a++) g(e, i[a]);
        if (n) {
          if (t === n.subTree) {
            const t = n.vnode;
            T(e, t, t.scopeId, t.slotScopeIds, n.parent);
          }
        }
      },
      B = (e, t, s, i, n, a, r, o, l = 0) => {
        for (let c = l; c < e.length; c++) {
          const l = e[c] = o ? pn(e[c]) : dn(e[c]);
          b(null, l, t, s, i, n, a, r, o);
        }
      },
      k = (e, t, i, n, a, r, l) => {
        const c = t.el = e.el;
        let {
          patchFlag: h,
          dynamicChildren: u,
          dirs: d
        } = t;
        h |= 16 & e.patchFlag;
        const m = e.props || s,
          f = t.props || s;
        let g;
        i && Ui(i, !1), (g = f.onVnodeBeforeUpdate) && gn(g, i, t, e), d && gs(t, e, i, "beforeUpdate"), i && Ui(i, !0);
        const v = a && "foreignObject" !== t.type;
        if (u ? D(e.dynamicChildren, u, c, i, n, v, r) : l || W(e, t, c, null, i, n, v, r, !1), h > 0) {
          if (16 & h) L(c, t, m, f, i, n, a);else if (2 & h && m.class !== f.class && o(c, "class", null, f.class, a), 4 & h && o(c, "style", m.style, f.style, a), 8 & h) {
            const s = t.dynamicProps;
            for (let t = 0; t < s.length; t++) {
              const r = s[t],
                l = m[r],
                h = f[r];
              h === l && "value" !== r || o(c, r, l, h, a, e.children, i, n, K);
            }
          }
          1 & h && e.children !== t.children && p(c, t.children);
        } else l || null != u || L(c, t, m, f, i, n, a);
        ((g = f.onVnodeUpdated) || d) && Ni(() => {
          g && gn(g, i, t, e), d && gs(t, e, i, "updated");
        }, n);
      },
      D = (e, t, s, i, n, a, r) => {
        for (let o = 0; o < t.length; o++) {
          const l = e[o],
            c = t[o],
            h = l.el && (l.type === Gi || !tn(l, c) || 70 & l.shapeFlag) ? m(l.el) : s;
          b(l, c, h, null, i, n, a, r, !0);
        }
      },
      L = (e, t, i, n, a, r, l) => {
        if (i !== n) {
          if (i !== s) for (const s in i) C(s) || s in n || o(e, s, i[s], null, l, t.children, a, r, K);
          for (const s in n) {
            if (C(s)) continue;
            const c = n[s],
              h = i[s];
            c !== h && "value" !== s && o(e, s, h, c, l, t.children, a, r, K);
          }
          "value" in n && o(e, "value", i.value, n.value);
        }
      },
      z = (e, t, s, i, n, r, o, l, h) => {
        const u = t.el = e ? e.el : c(""),
          d = t.anchor = e ? e.anchor : c("");
        let {
          patchFlag: p,
          dynamicChildren: m,
          slotScopeIds: f
        } = t;
        f && (l = l ? l.concat(f) : f), null == e ? (a(u, s, i), a(d, s, i), B(t.children, s, d, n, r, o, l, h)) : p > 0 && 64 & p && m && e.dynamicChildren ? (D(e.dynamicChildren, m, s, n, r, o, l), (null != t.key || n && t === n.subTree) && Hi(e, t, !0)) : W(e, t, s, d, n, r, o, l, h);
      },
      N = (e, t, s, i, n, a, r, o, l) => {
        t.slotScopeIds = o, null == e ? 512 & t.shapeFlag ? n.ctx.activate(t, s, i, r, l) : F(t, s, i, n, a, r, l) : H(e, t, l);
      },
      F = (e, t, i, n, a, r, o) => {
        const l = e.component = function (e, t, i) {
          const n = e.type,
            a = (t ? t.appContext : e.appContext) || vn,
            r = {
              uid: bn++,
              vnode: e,
              type: n,
              parent: t,
              appContext: a,
              root: null,
              next: null,
              subTree: null,
              effect: null,
              update: null,
              scope: new Q(!0),
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              provides: t ? t.provides : Object.create(a.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Mi(n, a),
              emitsOptions: $t(n, a),
              emit: null,
              emitted: null,
              propsDefaults: s,
              inheritAttrs: n.inheritAttrs,
              ctx: s,
              data: s,
              props: s,
              attrs: s,
              slots: s,
              refs: s,
              setupState: s,
              setupContext: null,
              attrsProxy: null,
              slotsProxy: null,
              suspense: i,
              suspenseId: i ? i.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null
            };
          r.ctx = {
            _: r
          }, r.root = t ? t.root : r, r.emit = Zt.bind(null, r), e.ce && e.ce(r);
          return r;
        }(e, n, a);
        if (Ts(e) && (l.ctx.renderer = se), function (e, t = !1) {
          Tn = t;
          const {
              props: s,
              children: i
            } = e.vnode,
            n = Cn(e);
          (function (e, t, s, i = !1) {
            const n = {},
              a = {};
            R(a, sn, 1), e.propsDefaults = Object.create(null), Si(e, t, n, a);
            for (const r in e.propsOptions[0]) r in n || (n[r] = void 0);
            s ? e.props = i ? n : at(n) : e.type.props ? e.props = n : e.props = a, e.attrs = a;
          })(e, s, n, t), Oi(e, i);
          const a = n ? function (e, t) {
            const s = e.type;
            e.accessCache = Object.create(null), e.proxy = pt(new Proxy(e.ctx, ii));
            const {
              setup: i
            } = s;
            if (i) {
              const s = e.setupContext = i.length > 1 ? function (e) {
                const t = t => {
                  e.exposed = t || {};
                };
                return {
                  get attrs() {
                    return function (e) {
                      return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
                        get: (t, s) => (fe(e, 0, "$attrs"), t[s])
                      }));
                    }(e);
                  },
                  slots: e.slots,
                  emit: e.emit,
                  expose: t
                };
              }(e) : null;
              An(e), pe();
              const n = Pt(i, e, 0, [e.props, s]);
              if (me(), Mn(), _(n)) {
                if (n.then(Mn, Mn), t) return n.then(s => {
                  En(e, s, t);
                }).catch(t => {
                  Et(t, e, 0);
                });
                e.asyncDep = n;
              } else En(e, n, t);
            } else Bn(e, t);
          }(e, t) : void 0;
          Tn = !1;
        }(l), l.asyncDep) {
          if (a && a.enrollDep(l, G), !e.el) {
            const e = l.subTree = on(Wi);
            x(null, e, t, i);
          }
        } else G(l, e, t, i, a, r, o);
      },
      H = (e, t, s) => {
        const i = t.component = e.component;
        if (function (e, t, s) {
          const {
              props: i,
              children: n,
              component: a
            } = e,
            {
              props: r,
              children: o,
              patchFlag: l
            } = t,
            c = a.emitsOptions;
          if (t.dirs || t.transition) return !0;
          if (!(s && l >= 0)) return !(!n && !o || o && o.$stable) || i !== r && (i ? !r || as(i, r, c) : !!r);
          if (1024 & l) return !0;
          if (16 & l) return i ? as(i, r, c) : !!r;
          if (8 & l) {
            const e = t.dynamicProps;
            for (let t = 0; t < e.length; t++) {
              const s = e[t];
              if (r[s] !== i[s] && !Xt(c, s)) return !0;
            }
          }
          return !1;
        }(e, t, s)) {
          if (i.asyncDep && !i.asyncResolved) return void V(i, t, s);
          i.next = t, function (e) {
            const t = kt.indexOf(e);
            t > Dt && kt.splice(t, 1);
          }(i.update), i.update();
        } else t.el = e.el, i.vnode = t;
      },
      G = (e, t, s, i, n, a, r) => {
        const o = () => {
            if (e.isMounted) {
              let t,
                {
                  next: s,
                  bu: i,
                  u: o,
                  parent: l,
                  vnode: c
                } = e,
                h = s;
              Ui(e, !1), s ? (s.el = c.el, V(e, s, r)) : s = c, i && O(i), (t = s.props && s.props.onVnodeBeforeUpdate) && gn(t, l, s, c), Ui(e, !0);
              const u = ss(e),
                d = e.subTree;
              e.subTree = u, b(d, u, m(d.el), ee(d), e, n, a), s.el = u.el, null === h && function ({
                vnode: e,
                parent: t
              }, s) {
                for (; t && t.subTree === e;) (e = t.vnode).el = s, t = t.parent;
              }(e, u.el), o && Ni(o, n), (t = s.props && s.props.onVnodeUpdated) && Ni(() => gn(t, l, s, c), n);
            } else {
              let r;
              const {
                  el: o,
                  props: l
                } = t,
                {
                  bm: c,
                  m: h,
                  parent: u
                } = e,
                d = Ps(t);
              if (Ui(e, !1), c && O(c), !d && (r = l && l.onVnodeBeforeMount) && gn(r, u, t), Ui(e, !0), o && ne) {
                const s = () => {
                  e.subTree = ss(e), ne(o, e.subTree, e, n, null);
                };
                d ? t.type.__asyncLoader().then(() => !e.isUnmounted && s()) : s();
              } else {
                const r = e.subTree = ss(e);
                b(null, r, s, i, e, n, a), t.el = r.el;
              }
              if (h && Ni(h, n), !d && (r = l && l.onVnodeMounted)) {
                const e = t;
                Ni(() => gn(r, u, e), n);
              }
              (256 & t.shapeFlag || u && Ps(u.vnode) && 256 & u.vnode.shapeFlag) && e.a && Ni(e.a, n), e.isMounted = !0, t = s = i = null;
            }
          },
          l = e.effect = new ce(o, () => Ut(c), e.scope),
          c = e.update = () => l.run();
        c.id = e.uid, Ui(e, !0), c();
      },
      V = (e, t, s) => {
        t.component = e;
        const i = e.vnode.props;
        e.vnode = t, e.next = null, function (e, t, s, i) {
          const {
              props: n,
              attrs: a,
              vnode: {
                patchFlag: r
              }
            } = e,
            o = dt(n),
            [l] = e.propsOptions;
          let c = !1;
          if (!(i || r > 0) || 16 & r) {
            let i;
            Si(e, t, n, a) && (c = !0);
            for (const a in o) t && (d(t, a) || (i = I(a)) !== a && d(t, i)) || (l ? !s || void 0 === s[a] && void 0 === s[i] || (n[a] = Ai(l, o, a, void 0, e, !0)) : delete n[a]);
            if (a !== o) for (const e in a) t && d(t, e) || (delete a[e], c = !0);
          } else if (8 & r) {
            const s = e.vnode.dynamicProps;
            for (let i = 0; i < s.length; i++) {
              let r = s[i];
              if (Xt(e.emitsOptions, r)) continue;
              const h = t[r];
              if (l) {
                if (d(a, r)) h !== a[r] && (a[r] = h, c = !0);else {
                  const t = E(r);
                  n[t] = Ai(l, o, t, h, e, !1);
                }
              } else h !== a[r] && (a[r] = h, c = !0);
            }
          }
          c && ve(e, "set", "$attrs");
        }(e, t.props, i, s), Ri(e, t.children, s), pe(), Gt(), me();
      },
      W = (e, t, s, i, n, a, r, o, l = !1) => {
        const c = e && e.children,
          h = e ? e.shapeFlag : 0,
          u = t.children,
          {
            patchFlag: d,
            shapeFlag: m
          } = t;
        if (d > 0) {
          if (128 & d) return void q(c, u, s, i, n, a, r, o, l);
          if (256 & d) return void j(c, u, s, i, n, a, r, o, l);
        }
        8 & m ? (16 & h && K(c, n, a), u !== c && p(s, u)) : 16 & h ? 16 & m ? q(c, u, s, i, n, a, r, o, l) : K(c, n, a, !0) : (8 & h && p(s, ""), 16 & m && B(u, s, i, n, a, r, o, l));
      },
      j = (e, t, s, n, a, r, o, l, c) => {
        t = t || i;
        const h = (e = e || i).length,
          u = t.length,
          d = Math.min(h, u);
        let p;
        for (p = 0; p < d; p++) {
          const i = t[p] = c ? pn(t[p]) : dn(t[p]);
          b(e[p], i, s, null, a, r, o, l, c);
        }
        h > u ? K(e, a, r, !0, !1, d) : B(t, s, n, a, r, o, l, c, d);
      },
      q = (e, t, s, n, a, r, o, l, c) => {
        let h = 0;
        const u = t.length;
        let d = e.length - 1,
          p = u - 1;
        for (; h <= d && h <= p;) {
          const i = e[h],
            n = t[h] = c ? pn(t[h]) : dn(t[h]);
          if (!tn(i, n)) break;
          b(i, n, s, null, a, r, o, l, c), h++;
        }
        for (; h <= d && h <= p;) {
          const i = e[d],
            n = t[p] = c ? pn(t[p]) : dn(t[p]);
          if (!tn(i, n)) break;
          b(i, n, s, null, a, r, o, l, c), d--, p--;
        }
        if (h > d) {
          if (h <= p) {
            const e = p + 1,
              i = e < u ? t[e].el : n;
            for (; h <= p;) b(null, t[h] = c ? pn(t[h]) : dn(t[h]), s, i, a, r, o, l, c), h++;
          }
        } else if (h > p) for (; h <= d;) $(e[h], a, r, !0), h++;else {
          const m = h,
            f = h,
            g = new Map();
          for (h = f; h <= p; h++) {
            const e = t[h] = c ? pn(t[h]) : dn(t[h]);
            null != e.key && g.set(e.key, h);
          }
          let v,
            y = 0;
          const _ = p - f + 1;
          let x = !1,
            w = 0;
          const S = new Array(_);
          for (h = 0; h < _; h++) S[h] = 0;
          for (h = m; h <= d; h++) {
            const i = e[h];
            if (y >= _) {
              $(i, a, r, !0);
              continue;
            }
            let n;
            if (null != i.key) n = g.get(i.key);else for (v = f; v <= p; v++) if (0 === S[v - f] && tn(i, t[v])) {
              n = v;
              break;
            }
            void 0 === n ? $(i, a, r, !0) : (S[n - f] = h + 1, n >= w ? w = n : x = !0, b(i, t[n], s, null, a, r, o, l, c), y++);
          }
          const A = x ? function (e) {
            const t = e.slice(),
              s = [0];
            let i, n, a, r, o;
            const l = e.length;
            for (i = 0; i < l; i++) {
              const l = e[i];
              if (0 !== l) {
                if (n = s[s.length - 1], e[n] < l) {
                  t[i] = n, s.push(i);
                  continue;
                }
                for (a = 0, r = s.length - 1; a < r;) o = a + r >> 1, e[s[o]] < l ? a = o + 1 : r = o;
                l < e[s[a]] && (a > 0 && (t[i] = s[a - 1]), s[a] = i);
              }
            }
            a = s.length, r = s[a - 1];
            for (; a-- > 0;) s[a] = r, r = t[r];
            return s;
          }(S) : i;
          for (v = A.length - 1, h = _ - 1; h >= 0; h--) {
            const e = f + h,
              i = t[e],
              d = e + 1 < u ? t[e + 1].el : n;
            0 === S[h] ? b(null, i, s, d, a, r, o, l, c) : x && (v < 0 || h !== A[v] ? Z(i, s, d, 2) : v--);
          }
        }
      },
      Z = (e, t, s, i, n = null) => {
        const {
          el: r,
          type: o,
          transition: l,
          children: c,
          shapeFlag: h
        } = e;
        if (6 & h) return void Z(e.component.subTree, t, s, i);
        if (128 & h) return void e.suspense.move(t, s, i);
        if (64 & h) return void o.move(e, t, s, se);
        if (o === Gi) {
          a(r, t, s);
          for (let e = 0; e < c.length; e++) Z(c[e], t, s, i);
          return void a(e.anchor, t, s);
        }
        if (o === ji) return void S(e, t, s);
        if (2 !== i && 1 & h && l) {
          if (0 === i) l.beforeEnter(r), a(r, t, s), Ni(() => l.enter(r), n);else {
            const {
                leave: e,
                delayLeave: i,
                afterLeave: n
              } = l,
              o = () => a(r, t, s),
              c = () => {
                e(r, () => {
                  o(), n && n();
                });
              };
            i ? i(r, o, c) : c();
          }
        } else a(r, t, s);
      },
      $ = (e, t, s, i = !1, n = !1) => {
        const {
          type: a,
          props: r,
          ref: o,
          children: l,
          dynamicChildren: c,
          shapeFlag: h,
          patchFlag: u,
          dirs: d
        } = e;
        if (null != o && zi(o, null, s, e, !0), 256 & h) return void t.ctx.deactivate(e);
        const p = 1 & h && d,
          m = !Ps(e);
        let f;
        if (m && (f = r && r.onVnodeBeforeUnmount) && gn(f, t, e), 6 & h) J(e.component, s, i);else {
          if (128 & h) return void e.suspense.unmount(s, i);
          p && gs(e, null, t, "beforeUnmount"), 64 & h ? e.type.remove(e, t, s, n, se, i) : c && (a !== Gi || u > 0 && 64 & u) ? K(c, t, s, !1, !0) : (a === Gi && 384 & u || !n && 16 & h) && K(l, t, s), i && X(e);
        }
        (m && (f = r && r.onVnodeUnmounted) || p) && Ni(() => {
          f && gn(f, t, e), p && gs(e, null, t, "unmounted");
        }, s);
      },
      X = e => {
        const {
          type: t,
          el: s,
          anchor: i,
          transition: n
        } = e;
        if (t === Gi) return void Y(s, i);
        if (t === ji) return void A(e);
        const a = () => {
          r(s), n && !n.persisted && n.afterLeave && n.afterLeave();
        };
        if (1 & e.shapeFlag && n && !n.persisted) {
          const {
              leave: t,
              delayLeave: i
            } = n,
            r = () => t(s, a);
          i ? i(e.el, a, r) : r();
        } else a();
      },
      Y = (e, t) => {
        let s;
        for (; e !== t;) s = f(e), r(e), e = s;
        r(t);
      },
      J = (e, t, s) => {
        const {
          bum: i,
          scope: n,
          update: a,
          subTree: r,
          um: o
        } = e;
        i && O(i), n.stop(), a && (a.active = !1, $(r, e, t, s)), o && Ni(o, t), Ni(() => {
          e.isUnmounted = !0;
        }, t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve());
      },
      K = (e, t, s, i = !1, n = !1, a = 0) => {
        for (let r = a; r < e.length; r++) $(e[r], t, s, i, n);
      },
      ee = e => 6 & e.shapeFlag ? ee(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : f(e.anchor || e.el),
      te = (e, t, s) => {
        null == e ? t._vnode && $(t._vnode, null, null, !0) : b(t._vnode || null, e, t, null, null, null, s), Gt(), Vt(), t._vnode = e;
      },
      se = {
        p: b,
        um: $,
        m: Z,
        r: X,
        mt: F,
        mc: B,
        pc: W,
        pbc: D,
        n: ee,
        o: e
      };
    let ie, ne;
    t && ([ie, ne] = t(se));
    return {
      render: te,
      hydrate: ie,
      createApp: yi(te, ie)
    };
  }(e);
}
function Ui({
  effect: e,
  update: t
}, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function Hi(e, t, s = !1) {
  const i = e.children,
    n = t.children;
  if (p(i) && p(n)) for (let a = 0; a < i.length; a++) {
    const e = i[a];
    let t = n[a];
    1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = n[a] = pn(n[a]), t.el = e.el), s || Hi(e, t)), t.type === Vi && (t.el = e.el);
  }
}
const Gi = Symbol.for("v-fgt"),
  Vi = Symbol.for("v-txt"),
  Wi = Symbol.for("v-cmt"),
  ji = Symbol.for("v-stc"),
  qi = [];
let Zi = null;
function $i(e = !1) {
  qi.push(Zi = e ? null : []);
}
let Xi = 1;
function Yi(e) {
  Xi += e;
}
function Ji(e) {
  return e.dynamicChildren = Xi > 0 ? Zi || i : null, qi.pop(), Zi = qi[qi.length - 1] || null, Xi > 0 && Zi && Zi.push(e), e;
}
function Qi(e, t, s, i, n, a) {
  return Ji(rn(e, t, s, i, n, a, !0));
}
function Ki(e, t, s, i, n) {
  return Ji(on(e, t, s, i, n, !0));
}
function en(e) {
  return !!e && !0 === e.__v_isVNode;
}
function tn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sn = "__vInternal",
  nn = ({
    key: e
  }) => null != e ? e : null,
  an = ({
    ref: e,
    ref_key: t,
    ref_for: s
  }) => ("number" == typeof e && (e = "" + e), null != e ? v(e) || bt(e) || g(e) ? {
    i: Yt,
    r: e,
    k: t,
    f: !!s
  } : e : null);
function rn(e, t = null, s = null, i = 0, n = null, a = e === Gi ? 0 : 1, r = !1, o = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && nn(t),
    ref: t && an(t),
    scopeId: Jt,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: i,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: Yt
  };
  return o ? (mn(l, s), 128 & a && e.normalize(l)) : s && (l.shapeFlag |= v(s) ? 8 : 16), Xi > 0 && !r && Zi && (l.patchFlag > 0 || 6 & a) && 32 !== l.patchFlag && Zi.push(l), l;
}
const on = function (e, t = null, s = null, i = 0, n = null, a = !1) {
  e && e !== Zs || (e = Wi);
  if (en(e)) {
    const i = ln(e, t, !0);
    return s && mn(i, s), Xi > 0 && !a && Zi && (6 & i.shapeFlag ? Zi[Zi.indexOf(e)] = i : Zi.push(i)), i.patchFlag |= -2, i;
  }
  r = e, g(r) && "__vccOpts" in r && (e = e.__vccOpts);
  var r;
  if (t) {
    t = function (e) {
      return e ? ut(e) || sn in e ? c({}, e) : e : null;
    }(t);
    let {
      class: e,
      style: s
    } = t;
    e && !v(e) && (t.class = q(e)), y(s) && (ut(s) && !p(s) && (s = c({}, s)), t.style = H(s));
  }
  const o = v(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : y(e) ? 4 : g(e) ? 2 : 0;
  return rn(e, t, s, i, n, o, a, !0);
};
function ln(e, t, s = !1) {
  const {
      props: i,
      ref: n,
      patchFlag: a,
      children: r
    } = e,
    o = t ? fn(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: o,
    key: o && nn(o),
    ref: t && t.ref ? s && n ? p(n) ? n.concat(an(t)) : [n, an(t)] : an(t) : n,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Gi ? -1 === a ? 16 : 16 | a : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ln(e.ssContent),
    ssFallback: e.ssFallback && ln(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function cn(e = " ", t = 0) {
  return on(Vi, null, e, t);
}
function hn(e, t) {
  const s = on(ji, null, e);
  return s.staticCount = t, s;
}
function un(e = "", t = !1) {
  return t ? ($i(), Ki(Wi, null, e)) : on(Wi, null, e);
}
function dn(e) {
  return null == e || "boolean" == typeof e ? on(Wi) : p(e) ? on(Gi, null, e.slice()) : "object" == typeof e ? pn(e) : on(Vi, null, String(e));
}
function pn(e) {
  return null === e.el && -1 !== e.patchFlag || e.memo ? e : ln(e);
}
function mn(e, t) {
  let s = 0;
  const {
    shapeFlag: i
  } = e;
  if (null == t) t = null;else if (p(t)) s = 16;else if ("object" == typeof t) {
    if (65 & i) {
      const s = t.default;
      return void (s && (s._c && (s._d = !1), mn(e, s()), s._c && (s._d = !0)));
    }
    {
      s = 32;
      const i = t._;
      i || sn in t ? 3 === i && Yt && (1 === Yt.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Yt;
    }
  } else g(t) ? (t = {
    default: t,
    _ctx: Yt
  }, s = 32) : (t = String(t), 64 & i ? (s = 16, t = [cn(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function fn(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    for (const e in i) if ("class" === e) t.class !== i.class && (t.class = q([t.class, i.class]));else if ("style" === e) t.style = H([t.style, i.style]);else if (o(e)) {
      const s = t[e],
        n = i[e];
      !n || s === n || p(s) && s.includes(n) || (t[e] = s ? [].concat(s, n) : n);
    } else "" !== e && (t[e] = i[e]);
  }
  return t;
}
function gn(e, t, s, i = null) {
  Tt(e, t, 7, [s, i]);
}
const vn = vi();
let bn = 0;
let yn = null;
const _n = () => yn || Yt;
let xn,
  wn,
  Sn = "__VUE_INSTANCE_SETTERS__";
(wn = U()[Sn]) || (wn = U()[Sn] = []), wn.push(e => yn = e), xn = e => {
  wn.length > 1 ? wn.forEach(t => t(e)) : wn[0](e);
};
const An = e => {
    xn(e), e.scope.on();
  },
  Mn = () => {
    yn && yn.scope.off(), xn(null);
  };
function Cn(e) {
  return 4 & e.vnode.shapeFlag;
}
let Pn,
  Tn = !1;
function En(e, t, s) {
  g(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : y(t) && (e.setupState = Mt(t)), Bn(e, s);
}
function Bn(e, t, s) {
  const i = e.type;
  if (!e.render) {
    if (!t && Pn && !i.render) {
      const t = i.template || ci(e).template;
      if (t) {
        const {
            isCustomElement: s,
            compilerOptions: n
          } = e.appContext.config,
          {
            delimiters: a,
            compilerOptions: r
          } = i,
          o = c(c({
            isCustomElement: s,
            delimiters: a
          }, n), r);
        i.render = Pn(t, o);
      }
    }
    e.render = i.render || n;
  }
  An(e), pe(), ri(e), me(), Mn();
}
function In(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Mt(pt(e.exposed)), {
    get: (t, s) => s in t ? t[s] : s in ti ? ti[s](e) : void 0,
    has: (e, t) => t in e || t in ti
  }));
}
const kn = (e, t) => function (e, t, s = !1) {
  let i, a;
  const r = g(e);
  return r ? (i = e, a = n) : (i = e.get, a = e.set), new Ct(i, a, r || !a, s);
}(e, 0, Tn);
function Dn(e, t, s) {
  const i = arguments.length;
  return 2 === i ? y(t) && !p(t) ? en(t) ? on(e, null, [t]) : on(e, t) : on(e, null, t) : (i > 3 ? s = Array.prototype.slice.call(arguments, 2) : 3 === i && en(s) && (s = [s]), on(e, t, s));
}
const Ln = Symbol.for("v-scx"),
  On = () => wi(Ln),
  Rn = "3.3.4",
  zn = "undefined" != typeof document ? document : null,
  Nn = zn && zn.createElement("template"),
  Fn = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, i) => {
      const n = t ? zn.createElementNS("http://www.w3.org/2000/svg", e) : zn.createElement(e, s ? {
        is: s
      } : void 0);
      return "select" === e && i && null != i.multiple && n.setAttribute("multiple", i.multiple), n;
    },
    createText: e => zn.createTextNode(e),
    createComment: e => zn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => zn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, s, i, n, a) {
      const r = s ? s.previousSibling : t.lastChild;
      if (n && (n === a || n.nextSibling)) for (; t.insertBefore(n.cloneNode(!0), s), n !== a && (n = n.nextSibling););else {
        Nn.innerHTML = i ? `<svg>${e}</svg>` : e;
        const n = Nn.content;
        if (i) {
          const e = n.firstChild;
          for (; e.firstChild;) n.appendChild(e.firstChild);
          n.removeChild(e);
        }
        t.insertBefore(n, s);
      }
      return [r ? r.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
    }
  };
const Un = /\s*!important$/;
function Hn(e, t, s) {
  if (p(s)) s.forEach(s => Hn(e, t, s));else if (null == s && (s = ""), t.startsWith("--")) e.setProperty(t, s);else {
    const i = function (e, t) {
      const s = Vn[t];
      if (s) return s;
      let i = E(t);
      if ("filter" !== i && i in e) return Vn[t] = i;
      i = k(i);
      for (let n = 0; n < Gn.length; n++) {
        const s = Gn[n] + i;
        if (s in e) return Vn[t] = s;
      }
      return t;
    }(e, t);
    Un.test(s) ? e.setProperty(I(i), s.replace(Un, ""), "important") : e[i] = s;
  }
}
const Gn = ["Webkit", "Moz", "ms"],
  Vn = {};
const Wn = "http://www.w3.org/1999/xlink";
function jn(e, t, s, i) {
  e.addEventListener(t, s, i);
}
function qn(e, t, s, i, n = null) {
  const a = e._vei || (e._vei = {}),
    r = a[t];
  if (i && r) r.value = i;else {
    const [s, o] = function (e) {
      let t;
      if (Zn.test(e)) {
        let s;
        for (t = {}; s = e.match(Zn);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
      }
      const s = ":" === e[2] ? e.slice(3) : I(e.slice(2));
      return [s, t];
    }(t);
    if (i) {
      const r = a[t] = function (e, t) {
        const s = e => {
          if (e._vts) {
            if (e._vts <= s.attached) return;
          } else e._vts = Date.now();
          Tt(function (e, t) {
            if (p(t)) {
              const s = e.stopImmediatePropagation;
              return e.stopImmediatePropagation = () => {
                s.call(e), e._stopped = !0;
              }, t.map(e => t => !t._stopped && e && e(t));
            }
            return t;
          }(e, s.value), t, 5, [e]);
        };
        return s.value = e, s.attached = Yn(), s;
      }(i, n);
      jn(e, s, r, o);
    } else r && (!function (e, t, s, i) {
      e.removeEventListener(t, s, i);
    }(e, s, r, o), a[t] = void 0);
  }
}
const Zn = /(?:Once|Passive|Capture)$/;
let $n = 0;
const Xn = Promise.resolve(),
  Yn = () => $n || (Xn.then(() => $n = 0), $n = Date.now());
const Jn = /^on[a-z]/;
const Qn = "transition",
  Kn = "animation",
  ea = (e, {
    slots: t
  }) => Dn(ys, function (e) {
    const t = {};
    for (const c in e) c in ta || (t[c] = e[c]);
    if (!1 === e.css) return t;
    const {
        name: s = "v",
        type: i,
        duration: n,
        enterFromClass: a = `${s}-enter-from`,
        enterActiveClass: r = `${s}-enter-active`,
        enterToClass: o = `${s}-enter-to`,
        appearFromClass: l = a,
        appearActiveClass: h = r,
        appearToClass: u = o,
        leaveFromClass: d = `${s}-leave-from`,
        leaveActiveClass: p = `${s}-leave-active`,
        leaveToClass: m = `${s}-leave-to`
      } = e,
      f = function (e) {
        if (null == e) return null;
        if (y(e)) return [na(e.enter), na(e.leave)];
        {
          const t = na(e);
          return [t, t];
        }
      }(n),
      g = f && f[0],
      v = f && f[1],
      {
        onBeforeEnter: b,
        onEnter: _,
        onEnterCancelled: x,
        onLeave: w,
        onLeaveCancelled: S,
        onBeforeAppear: A = b,
        onAppear: M = _,
        onAppearCancelled: C = x
      } = t,
      P = (e, t, s) => {
        ra(e, t ? u : o), ra(e, t ? h : r), s && s();
      },
      T = (e, t) => {
        e._isLeaving = !1, ra(e, d), ra(e, m), ra(e, p), t && t();
      },
      E = e => (t, s) => {
        const n = e ? M : _,
          r = () => P(t, e, s);
        sa(n, [t, r]), oa(() => {
          ra(t, e ? l : a), aa(t, e ? u : o), ia(n) || ca(t, i, g, r);
        });
      };
    return c(t, {
      onBeforeEnter(e) {
        sa(b, [e]), aa(e, a), aa(e, r);
      },
      onBeforeAppear(e) {
        sa(A, [e]), aa(e, l), aa(e, h);
      },
      onEnter: E(!1),
      onAppear: E(!0),
      onLeave(e, t) {
        e._isLeaving = !0;
        const s = () => T(e, t);
        aa(e, d), document.body.offsetHeight, aa(e, p), oa(() => {
          e._isLeaving && (ra(e, d), aa(e, m), ia(w) || ca(e, i, v, s));
        }), sa(w, [e, s]);
      },
      onEnterCancelled(e) {
        P(e, !1), sa(x, [e]);
      },
      onAppearCancelled(e) {
        P(e, !0), sa(C, [e]);
      },
      onLeaveCancelled(e) {
        T(e), sa(S, [e]);
      }
    });
  }(e), t);
ea.displayName = "Transition";
const ta = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
ea.props = c({}, bs, ta);
const sa = (e, t = []) => {
    p(e) ? e.forEach(e => e(...t)) : e && e(...t);
  },
  ia = e => !!e && (p(e) ? e.some(e => e.length > 1) : e.length > 1);
function na(e) {
  return N(e);
}
function aa(e, t) {
  t.split(/\s+/).forEach(t => t && e.classList.add(t)), (e._vtc || (e._vtc = new Set())).add(t);
}
function ra(e, t) {
  t.split(/\s+/).forEach(t => t && e.classList.remove(t));
  const {
    _vtc: s
  } = e;
  s && (s.delete(t), s.size || (e._vtc = void 0));
}
function oa(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let la = 0;
function ca(e, t, s, i) {
  const n = e._endId = ++la,
    a = () => {
      n === e._endId && i();
    };
  if (s) return setTimeout(a, s);
  const {
    type: r,
    timeout: o,
    propCount: l
  } = function (e, t) {
    const s = window.getComputedStyle(e),
      i = e => (s[e] || "").split(", "),
      n = i(`${Qn}Delay`),
      a = i(`${Qn}Duration`),
      r = ha(n, a),
      o = i(`${Kn}Delay`),
      l = i(`${Kn}Duration`),
      c = ha(o, l);
    let h = null,
      u = 0,
      d = 0;
    t === Qn ? r > 0 && (h = Qn, u = r, d = a.length) : t === Kn ? c > 0 && (h = Kn, u = c, d = l.length) : (u = Math.max(r, c), h = u > 0 ? r > c ? Qn : Kn : null, d = h ? h === Qn ? a.length : l.length : 0);
    const p = h === Qn && /\b(transform|all)(,|$)/.test(i(`${Qn}Property`).toString());
    return {
      type: h,
      timeout: u,
      propCount: d,
      hasTransform: p
    };
  }(e, t);
  if (!r) return i();
  const c = r + "end";
  let h = 0;
  const u = () => {
      e.removeEventListener(c, d), a();
    },
    d = t => {
      t.target === e && ++h >= l && u();
    };
  setTimeout(() => {
    h < l && u();
  }, o + 1), e.addEventListener(c, d);
}
function ha(e, t) {
  for (; e.length < t.length;) e = e.concat(e);
  return Math.max(...t.map((t, s) => ua(t) + ua(e[s])));
}
function ua(e) {
  return 1e3 * Number(e.slice(0, -1).replace(",", "."));
}
const da = e => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return p(t) ? e => O(t, e) : t;
};
function pa(e) {
  e.target.composing = !0;
}
function ma(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const fa = {
    created(e, {
      modifiers: {
        lazy: t,
        trim: s,
        number: i
      }
    }, n) {
      e._assign = da(n);
      const a = i || n.props && "number" === n.props.type;
      jn(e, t ? "change" : "input", t => {
        if (t.target.composing) return;
        let i = e.value;
        s && (i = i.trim()), a && (i = z(i)), e._assign(i);
      }), s && jn(e, "change", () => {
        e.value = e.value.trim();
      }), t || (jn(e, "compositionstart", pa), jn(e, "compositionend", ma), jn(e, "change", ma));
    },
    mounted(e, {
      value: t
    }) {
      e.value = null == t ? "" : t;
    },
    beforeUpdate(e, {
      value: t,
      modifiers: {
        lazy: s,
        trim: i,
        number: n
      }
    }, a) {
      if (e._assign = da(a), e.composing) return;
      if (document.activeElement === e && "range" !== e.type) {
        if (s) return;
        if (i && e.value.trim() === t) return;
        if ((n || "number" === e.type) && z(e.value) === t) return;
      }
      const r = null == t ? "" : t;
      e.value !== r && (e.value = r);
    }
  },
  ga = ["ctrl", "shift", "alt", "meta"],
  va = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button" in e && 0 !== e.button,
    middle: e => "button" in e && 1 !== e.button,
    right: e => "button" in e && 2 !== e.button,
    exact: (e, t) => ga.some(s => e[`${s}Key`] && !t.includes(s))
  },
  ba = (e, t) => (s, ...i) => {
    for (let e = 0; e < t.length; e++) {
      const i = va[t[e]];
      if (i && i(s, t)) return;
    }
    return e(s, ...i);
  },
  ya = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  },
  _a = (e, t) => s => {
    if (!("key" in s)) return;
    const i = I(s.key);
    return t.some(e => e === i || ya[e] === i) ? e(s) : void 0;
  },
  xa = {
    beforeMount(e, {
      value: t
    }, {
      transition: s
    }) {
      e._vod = "none" === e.style.display ? "" : e.style.display, s && t ? s.beforeEnter(e) : wa(e, t);
    },
    mounted(e, {
      value: t
    }, {
      transition: s
    }) {
      s && t && s.enter(e);
    },
    updated(e, {
      value: t,
      oldValue: s
    }, {
      transition: i
    }) {
      !t != !s && (i ? t ? (i.beforeEnter(e), wa(e, !0), i.enter(e)) : i.leave(e, () => {
        wa(e, !1);
      }) : wa(e, t));
    },
    beforeUnmount(e, {
      value: t
    }) {
      wa(e, t);
    }
  };
function wa(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Sa = c({
  patchProp: (e, t, s, i, n = !1, a, r, c, h) => {
    "class" === t ? function (e, t, s) {
      const i = e._vtc;
      i && (t = (t ? [t, ...i] : [...i]).join(" ")), null == t ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
    }(e, i, n) : "style" === t ? function (e, t, s) {
      const i = e.style,
        n = v(s);
      if (s && !n) {
        if (t && !v(t)) for (const e in t) null == s[e] && Hn(i, e, "");
        for (const e in s) Hn(i, e, s[e]);
      } else {
        const a = i.display;
        n ? t !== s && (i.cssText = s) : t && e.removeAttribute("style"), "_vod" in e && (i.display = a);
      }
    }(e, s, i) : o(t) ? l(t) || qn(e, t, 0, i, r) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, s, i) {
      if (i) return "innerHTML" === t || "textContent" === t || !!(t in e && Jn.test(t) && g(s));
      if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
      if ("form" === t) return !1;
      if ("list" === t && "INPUT" === e.tagName) return !1;
      if ("type" === t && "TEXTAREA" === e.tagName) return !1;
      if (Jn.test(t) && v(s)) return !1;
      return t in e;
    }(e, t, i, n)) ? function (e, t, s, i, n, a, r) {
      if ("innerHTML" === t || "textContent" === t) return i && r(i, n, a), void (e[t] = null == s ? "" : s);
      const o = e.tagName;
      if ("value" === t && "PROGRESS" !== o && !o.includes("-")) {
        e._value = s;
        const i = null == s ? "" : s;
        return ("OPTION" === o ? e.getAttribute("value") : e.value) !== i && (e.value = i), void (null == s && e.removeAttribute(t));
      }
      let l = !1;
      if ("" === s || null == s) {
        const i = typeof e[t];
        "boolean" === i ? s = $(s) : null == s && "string" === i ? (s = "", l = !0) : "number" === i && (s = 0, l = !0);
      }
      try {
        e[t] = s;
      } catch (c) {}
      l && e.removeAttribute(t);
    }(e, t, i, a, r, c, h) : ("true-value" === t ? e._trueValue = i : "false-value" === t && (e._falseValue = i), function (e, t, s, i, n) {
      if (i && t.startsWith("xlink:")) null == s ? e.removeAttributeNS(Wn, t.slice(6, t.length)) : e.setAttributeNS(Wn, t, s);else {
        const i = Z(t);
        null == s || i && !$(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : s);
      }
    }(e, t, i, n));
  }
}, Fn);
let Aa;
const Ma = (...e) => {
  const t = (Aa || (Aa = Fi(Sa))).createApp(...e),
    {
      mount: s
    } = t;
  return t.mount = e => {
    const i = function (e) {
      if (v(e)) {
        return document.querySelector(e);
      }
      return e;
    }(e);
    if (!i) return;
    const n = t._component;
    g(n) || n.render || n.template || (n.template = i.innerHTML), i.innerHTML = "";
    const a = s(i, !1, i instanceof SVGElement);
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), a;
  }, t;
};
const Ca = "undefined" != typeof window;
const Pa = Object.assign;
function Ta(e, t) {
  const s = {};
  for (const i in t) {
    const n = t[i];
    s[i] = Ba(n) ? n.map(e) : e(n);
  }
  return s;
}
const Ea = () => {},
  Ba = Array.isArray,
  Ia = /\/$/,
  ka = e => e.replace(Ia, "");
function Da(e, t, s = "/") {
  let i,
    n = {},
    a = "",
    r = "";
  const o = t.indexOf("#");
  let l = t.indexOf("?");
  return o < l && o >= 0 && (l = -1), l > -1 && (i = t.slice(0, l), a = t.slice(l + 1, o > -1 ? o : t.length), n = e(a)), o > -1 && (i = i || t.slice(0, o), r = t.slice(o, t.length)), i = function (e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const s = t.split("/"),
      i = e.split("/"),
      n = i[i.length - 1];
    ".." !== n && "." !== n || i.push("");
    let a,
      r,
      o = s.length - 1;
    for (a = 0; a < i.length; a++) if (r = i[a], "." !== r) {
      if (".." !== r) break;
      o > 1 && o--;
    }
    return s.slice(0, o).join("/") + "/" + i.slice(a - (a === i.length ? 1 : 0)).join("/");
  }(null != i ? i : t, s), {
    fullPath: i + (a && "?") + a + r,
    path: i,
    query: n,
    hash: r
  };
}
function La(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Oa(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const s in e) if (!Ra(e[s], t[s])) return !1;
  return !0;
}
function Ra(e, t) {
  return Ba(e) ? za(e, t) : Ba(t) ? za(t, e) : e === t;
}
function za(e, t) {
  return Ba(t) ? e.length === t.length && e.every((e, s) => e === t[s]) : 1 === e.length && e[0] === t;
}
var Na, Fa, Ua, Ha;
(Fa = Na || (Na = {})).pop = "pop", Fa.push = "push", (Ha = Ua || (Ua = {})).back = "back", Ha.forward = "forward", Ha.unknown = "";
const Ga = /^[^#]+#/;
function Va(e, t) {
  return e.replace(Ga, "#") + t;
}
const Wa = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function ja(e) {
  let t;
  if ("el" in e) {
    const s = e.el,
      i = "string" == typeof s && s.startsWith("#"),
      n = "string" == typeof s ? i ? document.getElementById(s.slice(1)) : document.querySelector(s) : s;
    if (!n) return;
    t = function (e, t) {
      const s = document.documentElement.getBoundingClientRect(),
        i = e.getBoundingClientRect();
      return {
        behavior: t.behavior,
        left: i.left - s.left - (t.left || 0),
        top: i.top - s.top - (t.top || 0)
      };
    }(n, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset);
}
function qa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Za = new Map();
function $a(e = "") {
  let t = [],
    s = [""],
    i = 0;
  function n(e) {
    i++, i === s.length || s.splice(i), s.push(e);
  }
  const a = {
    location: "",
    state: {},
    base: e = function (e) {
      if (!e) if (Ca) {
        const t = document.querySelector("base");
        e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "");
      } else e = "/";
      return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), ka(e);
    }(e),
    createHref: Va.bind(null, e),
    replace(e) {
      s.splice(i--, 1), n(e);
    },
    push(e, t) {
      n(e);
    },
    listen: e => (t.push(e), () => {
      const s = t.indexOf(e);
      s > -1 && t.splice(s, 1);
    }),
    destroy() {
      t = [], s = [""], i = 0;
    },
    go(e, n = !0) {
      const a = this.location,
        r = e < 0 ? Ua.back : Ua.forward;
      i = Math.max(0, Math.min(i + e, s.length - 1)), n && function (e, s, {
        direction: i,
        delta: n
      }) {
        const a = {
          direction: i,
          delta: n,
          type: Na.pop
        };
        for (const r of t) r(e, s, a);
      }(this.location, a, {
        direction: r,
        delta: e
      });
    }
  };
  return Object.defineProperty(a, "location", {
    enumerable: !0,
    get: () => s[i]
  }), a;
}
function Xa(e) {
  return "string" == typeof e || "symbol" == typeof e;
}
const Ya = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  Ja = Symbol("");
var Qa, Ka;
function er(e, t) {
  return Pa(new Error(), {
    type: e,
    [Ja]: !0
  }, t);
}
function tr(e, t) {
  return e instanceof Error && Ja in e && (null == t || !!(e.type & t));
}
(Ka = Qa || (Qa = {}))[Ka.aborted = 4] = "aborted", Ka[Ka.cancelled = 8] = "cancelled", Ka[Ka.duplicated = 16] = "duplicated";
const sr = "[^/]+?",
  ir = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  },
  nr = /[.+*?^${}()[\]/\\]/g;
function ar(e, t) {
  let s = 0;
  for (; s < e.length && s < t.length;) {
    const i = t[s] - e[s];
    if (i) return i;
    s++;
  }
  return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0;
}
function rr(e, t) {
  let s = 0;
  const i = e.score,
    n = t.score;
  for (; s < i.length && s < n.length;) {
    const e = ar(i[s], n[s]);
    if (e) return e;
    s++;
  }
  if (1 === Math.abs(n.length - i.length)) {
    if (or(i)) return 1;
    if (or(n)) return -1;
  }
  return n.length - i.length;
}
function or(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const lr = {
    type: 0,
    value: ""
  },
  cr = /[a-zA-Z0-9_]/;
function hr(e, t, s) {
  const i = function (e, t) {
      const s = Pa({}, ir, t),
        i = [];
      let n = s.start ? "^" : "";
      const a = [];
      for (const l of e) {
        const e = l.length ? [] : [90];
        s.strict && !l.length && (n += "/");
        for (let t = 0; t < l.length; t++) {
          const i = l[t];
          let r = 40 + (s.sensitive ? .25 : 0);
          if (0 === i.type) t || (n += "/"), n += i.value.replace(nr, "\\$&"), r += 40;else if (1 === i.type) {
            const {
              value: e,
              repeatable: s,
              optional: c,
              regexp: h
            } = i;
            a.push({
              name: e,
              repeatable: s,
              optional: c
            });
            const u = h || sr;
            if (u !== sr) {
              r += 10;
              try {
                new RegExp(`(${u})`);
              } catch (o) {
                throw new Error(`Invalid custom RegExp for param "${e}" (${u}): ` + o.message);
              }
            }
            let d = s ? `((?:${u})(?:/(?:${u}))*)` : `(${u})`;
            t || (d = c && l.length < 2 ? `(?:/${d})` : "/" + d), c && (d += "?"), n += d, r += 20, c && (r += -8), s && (r += -20), ".*" === u && (r += -50);
          }
          e.push(r);
        }
        i.push(e);
      }
      if (s.strict && s.end) {
        const e = i.length - 1;
        i[e][i[e].length - 1] += .7000000000000001;
      }
      s.strict || (n += "/?"), s.end ? n += "$" : s.strict && (n += "(?:/|$)");
      const r = new RegExp(n, s.sensitive ? "" : "i");
      return {
        re: r,
        score: i,
        keys: a,
        parse: function (e) {
          const t = e.match(r),
            s = {};
          if (!t) return null;
          for (let i = 1; i < t.length; i++) {
            const e = t[i] || "",
              n = a[i - 1];
            s[n.name] = e && n.repeatable ? e.split("/") : e;
          }
          return s;
        },
        stringify: function (t) {
          let s = "",
            i = !1;
          for (const n of e) {
            i && s.endsWith("/") || (s += "/"), i = !1;
            for (const e of n) if (0 === e.type) s += e.value;else if (1 === e.type) {
              const {
                  value: a,
                  repeatable: r,
                  optional: o
                } = e,
                l = a in t ? t[a] : "";
              if (Ba(l) && !r) throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);
              const c = Ba(l) ? l.join("/") : l;
              if (!c) {
                if (!o) throw new Error(`Missing required param "${a}"`);
                n.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : i = !0);
              }
              s += c;
            }
          }
          return s || "/";
        }
      };
    }(function (e) {
      if (!e) return [[]];
      if ("/" === e) return [[lr]];
      if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
      function t(e) {
        throw new Error(`ERR (${s})/"${c}": ${e}`);
      }
      let s = 0,
        i = s;
      const n = [];
      let a;
      function r() {
        a && n.push(a), a = [];
      }
      let o,
        l = 0,
        c = "",
        h = "";
      function u() {
        c && (0 === s ? a.push({
          type: 0,
          value: c
        }) : 1 === s || 2 === s || 3 === s ? (a.length > 1 && ("*" === o || "+" === o) && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), a.push({
          type: 1,
          value: c,
          regexp: h,
          repeatable: "*" === o || "+" === o,
          optional: "*" === o || "?" === o
        })) : t("Invalid state to consume buffer"), c = "");
      }
      function d() {
        c += o;
      }
      for (; l < e.length;) if (o = e[l++], "\\" !== o || 2 === s) switch (s) {
        case 0:
          "/" === o ? (c && u(), r()) : ":" === o ? (u(), s = 1) : d();
          break;
        case 4:
          d(), s = i;
          break;
        case 1:
          "(" === o ? s = 2 : cr.test(o) ? d() : (u(), s = 0, "*" !== o && "?" !== o && "+" !== o && l--);
          break;
        case 2:
          ")" === o ? "\\" == h[h.length - 1] ? h = h.slice(0, -1) + o : s = 3 : h += o;
          break;
        case 3:
          u(), s = 0, "*" !== o && "?" !== o && "+" !== o && l--, h = "";
          break;
        default:
          t("Unknown state");
      } else i = s, s = 4;
      return 2 === s && t(`Unfinished custom RegExp for param "${c}"`), u(), r(), n;
    }(e.path), s),
    n = Pa(i, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
  return t && !n.record.aliasOf == !t.record.aliasOf && t.children.push(n), n;
}
function ur(e, t) {
  const s = [],
    i = new Map();
  function n(e, s, i) {
    const o = !i,
      l = function (e) {
        return {
          path: e.path,
          redirect: e.redirect,
          name: e.name,
          meta: e.meta || {},
          aliasOf: void 0,
          beforeEnter: e.beforeEnter,
          props: pr(e),
          children: e.children || [],
          instances: {},
          leaveGuards: new Set(),
          updateGuards: new Set(),
          enterCallbacks: {},
          components: "components" in e ? e.components || null : e.component && {
            default: e.component
          }
        };
      }(e);
    l.aliasOf = i && i.record;
    const c = gr(t, e),
      h = [l];
    if ("alias" in e) {
      const t = "string" == typeof e.alias ? [e.alias] : e.alias;
      for (const e of t) h.push(Pa({}, l, {
        components: i ? i.record.components : l.components,
        path: e,
        aliasOf: i ? i.record : l
      }));
    }
    let u, d;
    for (const t of h) {
      const {
        path: h
      } = t;
      if (s && "/" !== h[0]) {
        const e = s.record.path,
          i = "/" === e[e.length - 1] ? "" : "/";
        t.path = s.record.path + (h && i + h);
      }
      if (u = hr(t, s, c), i ? i.alias.push(u) : (d = d || u, d !== u && d.alias.push(u), o && e.name && !mr(u) && a(e.name)), l.children) {
        const e = l.children;
        for (let t = 0; t < e.length; t++) n(e[t], u, i && i.children[t]);
      }
      i = i || u, (u.record.components && Object.keys(u.record.components).length || u.record.name || u.record.redirect) && r(u);
    }
    return d ? () => {
      a(d);
    } : Ea;
  }
  function a(e) {
    if (Xa(e)) {
      const t = i.get(e);
      t && (i.delete(e), s.splice(s.indexOf(t), 1), t.children.forEach(a), t.alias.forEach(a));
    } else {
      const t = s.indexOf(e);
      t > -1 && (s.splice(t, 1), e.record.name && i.delete(e.record.name), e.children.forEach(a), e.alias.forEach(a));
    }
  }
  function r(e) {
    let t = 0;
    for (; t < s.length && rr(e, s[t]) >= 0 && (e.record.path !== s[t].record.path || !vr(e, s[t]));) t++;
    s.splice(t, 0, e), e.record.name && !mr(e) && i.set(e.record.name, e);
  }
  return t = gr({
    strict: !1,
    end: !0,
    sensitive: !1
  }, t), e.forEach(e => n(e)), {
    addRoute: n,
    resolve: function (e, t) {
      let n,
        a,
        r,
        o = {};
      if ("name" in e && e.name) {
        if (n = i.get(e.name), !n) throw er(1, {
          location: e
        });
        r = n.record.name, o = Pa(dr(t.params, n.keys.filter(e => !e.optional).map(e => e.name)), e.params && dr(e.params, n.keys.map(e => e.name))), a = n.stringify(o);
      } else if ("path" in e) a = e.path, n = s.find(e => e.re.test(a)), n && (o = n.parse(a), r = n.record.name);else {
        if (n = t.name ? i.get(t.name) : s.find(e => e.re.test(t.path)), !n) throw er(1, {
          location: e,
          currentLocation: t
        });
        r = n.record.name, o = Pa({}, t.params, e.params), a = n.stringify(o);
      }
      const l = [];
      let c = n;
      for (; c;) l.unshift(c.record), c = c.parent;
      return {
        name: r,
        path: a,
        params: o,
        matched: l,
        meta: fr(l)
      };
    },
    removeRoute: a,
    getRoutes: function () {
      return s;
    },
    getRecordMatcher: function (e) {
      return i.get(e);
    }
  };
}
function dr(e, t) {
  const s = {};
  for (const i of t) i in e && (s[i] = e[i]);
  return s;
}
function pr(e) {
  const t = {},
    s = e.props || !1;
  if ("component" in e) t.default = s;else for (const i in e.components) t[i] = "boolean" == typeof s ? s : s[i];
  return t;
}
function mr(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function fr(e) {
  return e.reduce((e, t) => Pa(e, t.meta), {});
}
function gr(e, t) {
  const s = {};
  for (const i in e) s[i] = i in t ? t[i] : e[i];
  return s;
}
function vr(e, t) {
  return t.children.some(t => t === e || vr(e, t));
}
const br = /#/g,
  yr = /&/g,
  _r = /\//g,
  xr = /=/g,
  wr = /\?/g,
  Sr = /\+/g,
  Ar = /%5B/g,
  Mr = /%5D/g,
  Cr = /%5E/g,
  Pr = /%60/g,
  Tr = /%7B/g,
  Er = /%7C/g,
  Br = /%7D/g,
  Ir = /%20/g;
function kr(e) {
  return encodeURI("" + e).replace(Er, "|").replace(Ar, "[").replace(Mr, "]");
}
function Dr(e) {
  return kr(e).replace(Sr, "%2B").replace(Ir, "+").replace(br, "%23").replace(yr, "%26").replace(Pr, "`").replace(Tr, "{").replace(Br, "}").replace(Cr, "^");
}
function Lr(e) {
  return null == e ? "" : function (e) {
    return kr(e).replace(br, "%23").replace(wr, "%3F");
  }(e).replace(_r, "%2F");
}
function Or(e) {
  try {
    return decodeURIComponent("" + e);
  } catch (t) {}
  return "" + e;
}
function Rr(e) {
  const t = {};
  if ("" === e || "?" === e) return t;
  const s = ("?" === e[0] ? e.slice(1) : e).split("&");
  for (let i = 0; i < s.length; ++i) {
    const e = s[i].replace(Sr, " "),
      n = e.indexOf("="),
      a = Or(n < 0 ? e : e.slice(0, n)),
      r = n < 0 ? null : Or(e.slice(n + 1));
    if (a in t) {
      let e = t[a];
      Ba(e) || (e = t[a] = [e]), e.push(r);
    } else t[a] = r;
  }
  return t;
}
function zr(e) {
  let t = "";
  for (let s in e) {
    const i = e[s];
    if (s = Dr(s).replace(xr, "%3D"), null == i) {
      void 0 !== i && (t += (t.length ? "&" : "") + s);
      continue;
    }
    (Ba(i) ? i.map(e => e && Dr(e)) : [i && Dr(i)]).forEach(e => {
      void 0 !== e && (t += (t.length ? "&" : "") + s, null != e && (t += "=" + e));
    });
  }
  return t;
}
function Nr(e) {
  const t = {};
  for (const s in e) {
    const i = e[s];
    void 0 !== i && (t[s] = Ba(i) ? i.map(e => null == e ? null : "" + e) : null == i ? i : "" + i);
  }
  return t;
}
const Fr = Symbol(""),
  Ur = Symbol(""),
  Hr = Symbol(""),
  Gr = Symbol(""),
  Vr = Symbol("");
function Wr() {
  let e = [];
  return {
    add: function (t) {
      return e.push(t), () => {
        const s = e.indexOf(t);
        s > -1 && e.splice(s, 1);
      };
    },
    list: () => e,
    reset: function () {
      e = [];
    }
  };
}
function jr(e, t, s, i, n) {
  const a = i && (i.enterCallbacks[n] = i.enterCallbacks[n] || []);
  return () => new Promise((r, o) => {
    const l = e => {
        var l;
        !1 === e ? o(er(4, {
          from: s,
          to: t
        })) : e instanceof Error ? o(e) : "string" == typeof (l = e) || l && "object" == typeof l ? o(er(2, {
          from: t,
          to: e
        })) : (a && i.enterCallbacks[n] === a && "function" == typeof e && a.push(e), r());
      },
      c = e.call(i && i.instances[n], t, s, l);
    let h = Promise.resolve(c);
    e.length < 3 && (h = h.then(l)), h.catch(e => o(e));
  });
}
function qr(e, t, s, i) {
  const n = [];
  for (const r of e) for (const e in r.components) {
    let o = r.components[e];
    if ("beforeRouteEnter" === t || r.instances[e]) if ("object" == typeof (a = o) || "displayName" in a || "props" in a || "__vccOpts" in a) {
      const a = (o.__vccOpts || o)[t];
      a && n.push(jr(a, s, i, r, e));
    } else {
      let a = o();
      n.push(() => a.then(n => {
        if (!n) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${r.path}"`));
        const a = (o = n).__esModule || "Module" === o[Symbol.toStringTag] ? n.default : n;
        var o;
        r.components[e] = a;
        const l = (a.__vccOpts || a)[t];
        return l && jr(l, s, i, r, e)();
      }));
    }
  }
  var a;
  return n;
}
function Zr(e) {
  const t = wi(Hr),
    s = wi(Gr),
    i = kn(() => t.resolve(St(e.to))),
    n = kn(() => {
      const {
          matched: e
        } = i.value,
        {
          length: t
        } = e,
        n = e[t - 1],
        a = s.matched;
      if (!n || !a.length) return -1;
      const r = a.findIndex(La.bind(null, n));
      if (r > -1) return r;
      const o = Xr(e[t - 2]);
      return t > 1 && Xr(n) === o && a[a.length - 1].path !== o ? a.findIndex(La.bind(null, e[t - 2])) : r;
    }),
    a = kn(() => n.value > -1 && function (e, t) {
      for (const s in t) {
        const i = t[s],
          n = e[s];
        if ("string" == typeof i) {
          if (i !== n) return !1;
        } else if (!Ba(n) || n.length !== i.length || i.some((e, t) => e !== n[t])) return !1;
      }
      return !0;
    }(s.params, i.value.params)),
    r = kn(() => n.value > -1 && n.value === s.matched.length - 1 && Oa(s.params, i.value.params));
  return {
    route: i,
    href: kn(() => i.value.href),
    isActive: a,
    isExactActive: r,
    navigate: function (s = {}) {
      return function (e) {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;
        if (void 0 !== e.button && 0 !== e.button) return;
        if (e.currentTarget && e.currentTarget.getAttribute) {
          const t = e.currentTarget.getAttribute("target");
          if (/\b_blank\b/i.test(t)) return;
        }
        e.preventDefault && e.preventDefault();
        return !0;
      }(s) ? t[St(e.replace) ? "replace" : "push"](St(e.to)).catch(Ea) : Promise.resolve();
    }
  };
}
const $r = Cs({
  name: "RouterLink",
  compatConfig: {
    MODE: 3
  },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Zr,
  setup(e, {
    slots: t
  }) {
    const s = nt(Zr(e)),
      {
        options: i
      } = wi(Hr),
      n = kn(() => ({
        [Yr(e.activeClass, i.linkActiveClass, "router-link-active")]: s.isActive,
        [Yr(e.exactActiveClass, i.linkExactActiveClass, "router-link-exact-active")]: s.isExactActive
      }));
    return () => {
      const i = t.default && t.default(s);
      return e.custom ? i : Dn("a", {
        "aria-current": s.isExactActive ? e.ariaCurrentValue : null,
        href: s.href,
        onClick: s.navigate,
        class: n.value
      }, i);
    };
  }
});
function Xr(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Yr = (e, t, s) => null != e ? e : null != t ? t : s;
function Jr(e, t) {
  if (!e) return null;
  const s = e(t);
  return 1 === s.length ? s[0] : s;
}
const Qr = Cs({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: {
    MODE: 3
  },
  setup(e, {
    attrs: t,
    slots: s
  }) {
    const i = wi(Vr),
      n = kn(() => e.route || i.value),
      a = wi(Ur, 0),
      r = kn(() => {
        let e = St(a);
        const {
          matched: t
        } = n.value;
        let s;
        for (; (s = t[e]) && !s.components;) e++;
        return e;
      }),
      o = kn(() => n.value.matched[r.value]);
    xi(Ur, kn(() => r.value + 1)), xi(Fr, o), xi(Vr, n);
    const l = yt();
    return hs(() => [l.value, o.value, e.name], ([e, t, s], [i, n, a]) => {
      t && (t.instances[s] = e, n && n !== t && e && e === i && (t.leaveGuards.size || (t.leaveGuards = n.leaveGuards), t.updateGuards.size || (t.updateGuards = n.updateGuards))), !e || !t || n && La(t, n) && i || (t.enterCallbacks[s] || []).forEach(t => t(e));
    }, {
      flush: "post"
    }), () => {
      const i = n.value,
        a = e.name,
        r = o.value,
        c = r && r.components[a];
      if (!c) return Jr(s.default, {
        Component: c,
        route: i
      });
      const h = r.props[a],
        u = h ? !0 === h ? i.params : "function" == typeof h ? h(i) : h : null,
        d = Dn(c, Pa({}, u, t, {
          onVnodeUnmounted: e => {
            e.component.isUnmounted && (r.instances[a] = null);
          },
          ref: l
        }));
      return Jr(s.default, {
        Component: d,
        route: i
      }) || d;
    };
  }
});
function Kr(e) {
  const t = ur(e.routes, e),
    s = e.parseQuery || Rr,
    i = e.stringifyQuery || zr,
    n = e.history,
    a = Wr(),
    r = Wr(),
    o = Wr(),
    l = _t(Ya);
  let c = Ya;
  Ca && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = Ta.bind(null, e => "" + e),
    u = Ta.bind(null, Lr),
    d = Ta.bind(null, Or);
  function p(e, a) {
    if (a = Pa({}, a || l.value), "string" == typeof e) {
      const i = Da(s, e, a.path),
        r = t.resolve({
          path: i.path
        }, a),
        o = n.createHref(i.fullPath);
      return Pa(i, r, {
        params: d(r.params),
        hash: Or(i.hash),
        redirectedFrom: void 0,
        href: o
      });
    }
    let r;
    if ("path" in e) r = Pa({}, e, {
      path: Da(s, e.path, a.path).path
    });else {
      const t = Pa({}, e.params);
      for (const e in t) null == t[e] && delete t[e];
      r = Pa({}, e, {
        params: u(t)
      }), a.params = u(a.params);
    }
    const o = t.resolve(r, a),
      c = e.hash || "";
    o.params = h(d(o.params));
    const p = function (e, t) {
      const s = t.query ? e(t.query) : "";
      return t.path + (s && "?") + s + (t.hash || "");
    }(i, Pa({}, e, {
      hash: (m = c, kr(m).replace(Tr, "{").replace(Br, "}").replace(Cr, "^")),
      path: o.path
    }));
    var m;
    const f = n.createHref(p);
    return Pa({
      fullPath: p,
      hash: c,
      query: i === zr ? Nr(e.query) : e.query || {}
    }, o, {
      redirectedFrom: void 0,
      href: f
    });
  }
  function m(e) {
    return "string" == typeof e ? Da(s, e, l.value.path) : Pa({}, e);
  }
  function f(e, t) {
    if (c !== e) return er(8, {
      from: t,
      to: e
    });
  }
  function g(e) {
    return b(e);
  }
  function v(e) {
    const t = e.matched[e.matched.length - 1];
    if (t && t.redirect) {
      const {
        redirect: s
      } = t;
      let i = "function" == typeof s ? s(e) : s;
      return "string" == typeof i && (i = i.includes("?") || i.includes("#") ? i = m(i) : {
        path: i
      }, i.params = {}), Pa({
        query: e.query,
        hash: e.hash,
        params: "path" in i ? {} : e.params
      }, i);
    }
  }
  function b(e, t) {
    const s = c = p(e),
      n = l.value,
      a = e.state,
      r = e.force,
      o = !0 === e.replace,
      h = v(s);
    if (h) return b(Pa(m(h), {
      state: "object" == typeof h ? Pa({}, a, h.state) : a,
      force: r,
      replace: o
    }), t || s);
    const u = s;
    let d;
    return u.redirectedFrom = t, !r && function (e, t, s) {
      const i = t.matched.length - 1,
        n = s.matched.length - 1;
      return i > -1 && i === n && La(t.matched[i], s.matched[n]) && Oa(t.params, s.params) && e(t.query) === e(s.query) && t.hash === s.hash;
    }(i, n, s) && (d = er(16, {
      to: u,
      from: n
    }), I(n, n, !0, !1)), (d ? Promise.resolve(d) : x(u, n)).catch(e => tr(e) ? tr(e, 2) ? e : B(e) : E(e, u, n)).then(e => {
      if (e) {
        if (tr(e, 2)) return b(Pa({
          replace: o
        }, m(e.to), {
          state: "object" == typeof e.to ? Pa({}, a, e.to.state) : a,
          force: r
        }), t || u);
      } else e = S(u, n, !0, o, a);
      return w(u, n, e), e;
    });
  }
  function y(e, t) {
    const s = f(e, t);
    return s ? Promise.reject(s) : Promise.resolve();
  }
  function _(e) {
    const t = L.values().next().value;
    return t && "function" == typeof t.runWithContext ? t.runWithContext(e) : e();
  }
  function x(e, t) {
    let s;
    const [i, n, o] = function (e, t) {
      const s = [],
        i = [],
        n = [],
        a = Math.max(t.matched.length, e.matched.length);
      for (let r = 0; r < a; r++) {
        const a = t.matched[r];
        a && (e.matched.find(e => La(e, a)) ? i.push(a) : s.push(a));
        const o = e.matched[r];
        o && (t.matched.find(e => La(e, o)) || n.push(o));
      }
      return [s, i, n];
    }(e, t);
    s = qr(i.reverse(), "beforeRouteLeave", e, t);
    for (const a of i) a.leaveGuards.forEach(i => {
      s.push(jr(i, e, t));
    });
    const l = y.bind(null, e, t);
    return s.push(l), R(s).then(() => {
      s = [];
      for (const i of a.list()) s.push(jr(i, e, t));
      return s.push(l), R(s);
    }).then(() => {
      s = qr(n, "beforeRouteUpdate", e, t);
      for (const i of n) i.updateGuards.forEach(i => {
        s.push(jr(i, e, t));
      });
      return s.push(l), R(s);
    }).then(() => {
      s = [];
      for (const i of e.matched) if (i.beforeEnter && !t.matched.includes(i)) if (Ba(i.beforeEnter)) for (const n of i.beforeEnter) s.push(jr(n, e, t));else s.push(jr(i.beforeEnter, e, t));
      return s.push(l), R(s);
    }).then(() => (e.matched.forEach(e => e.enterCallbacks = {}), s = qr(o, "beforeRouteEnter", e, t), s.push(l), R(s))).then(() => {
      s = [];
      for (const i of r.list()) s.push(jr(i, e, t));
      return s.push(l), R(s);
    }).catch(e => tr(e, 8) ? e : Promise.reject(e));
  }
  function w(e, t, s) {
    for (const i of o.list()) _(() => i(e, t, s));
  }
  function S(e, t, s, i, a) {
    const r = f(e, t);
    if (r) return r;
    const o = t === Ya,
      c = Ca ? history.state : {};
    s && (i || o ? n.replace(e.fullPath, Pa({
      scroll: o && c && c.scroll
    }, a)) : n.push(e.fullPath, a)), l.value = e, I(e, t, s, o), B();
  }
  let A;
  function M() {
    A || (A = n.listen((e, t, s) => {
      if (!O.listening) return;
      const i = p(e),
        a = v(i);
      if (a) return void b(Pa(a, {
        replace: !0
      }), i).catch(Ea);
      c = i;
      const r = l.value;
      var o, h;
      Ca && (o = qa(r.fullPath, s.delta), h = Wa(), Za.set(o, h)), x(i, r).catch(e => tr(e, 12) ? e : tr(e, 2) ? (b(e.to, i).then(e => {
        tr(e, 20) && !s.delta && s.type === Na.pop && n.go(-1, !1);
      }).catch(Ea), Promise.reject()) : (s.delta && n.go(-s.delta, !1), E(e, i, r))).then(e => {
        (e = e || S(i, r, !1)) && (s.delta && !tr(e, 8) ? n.go(-s.delta, !1) : s.type === Na.pop && tr(e, 20) && n.go(-1, !1)), w(i, r, e);
      }).catch(Ea);
    }));
  }
  let C,
    P = Wr(),
    T = Wr();
  function E(e, t, s) {
    B(e);
    const i = T.list();
    return i.length && i.forEach(i => i(e, t, s)), Promise.reject(e);
  }
  function B(e) {
    return C || (C = !e, M(), P.list().forEach(([t, s]) => e ? s(e) : t()), P.reset()), e;
  }
  function I(t, s, i, n) {
    const {
      scrollBehavior: a
    } = e;
    if (!Ca || !a) return Promise.resolve();
    const r = !i && function (e) {
      const t = Za.get(e);
      return Za.delete(e), t;
    }(qa(t.fullPath, 0)) || (n || !i) && history.state && history.state.scroll || null;
    return Ft().then(() => a(t, s, r)).then(e => e && ja(e)).catch(e => E(e, t, s));
  }
  const k = e => n.go(e);
  let D;
  const L = new Set(),
    O = {
      currentRoute: l,
      listening: !0,
      addRoute: function (e, s) {
        let i, n;
        return Xa(e) ? (i = t.getRecordMatcher(e), n = s) : n = e, t.addRoute(n, i);
      },
      removeRoute: function (e) {
        const s = t.getRecordMatcher(e);
        s && t.removeRoute(s);
      },
      hasRoute: function (e) {
        return !!t.getRecordMatcher(e);
      },
      getRoutes: function () {
        return t.getRoutes().map(e => e.record);
      },
      resolve: p,
      options: e,
      push: g,
      replace: function (e) {
        return g(Pa(m(e), {
          replace: !0
        }));
      },
      go: k,
      back: () => k(-1),
      forward: () => k(1),
      beforeEach: a.add,
      beforeResolve: r.add,
      afterEach: o.add,
      onError: T.add,
      isReady: function () {
        return C && l.value !== Ya ? Promise.resolve() : new Promise((e, t) => {
          P.add([e, t]);
        });
      },
      install(e) {
        e.component("RouterLink", $r), e.component("RouterView", Qr), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => St(l)
        }), Ca && !D && l.value === Ya && (D = !0, g(n.location).catch(e => {}));
        const t = {};
        for (const i in Ya) t[i] = kn(() => l.value[i]);
        e.provide(Hr, this), e.provide(Gr, nt(t)), e.provide(Vr, l);
        const s = e.unmount;
        L.add(e), e.unmount = function () {
          L.delete(e), L.size < 1 && (c = Ya, A && A(), A = null, l.value = Ya, D = !1, C = !1), s();
        };
      }
    };
  function R(e) {
    return e.reduce((e, t) => e.then(() => _(t)), Promise.resolve());
  }
  return O;
}
export { t, s, i, n, a, r, o, l, c, h, u, d, p, m, f, g, v, b, y, _, x, w, S, A, M, C, P, T, E, B, I, k, D, L, O, R, z, N, F, U, H, G, V, W, j, q, Z, $, X, Y, J, Q, K, ee, te, se, ie, ne, ae, re, oe, le, ce, he, ue, de, pe, me, fe, ge, ve, be, ye, _e, xe, we, Se, Ae, Me, Ce, Pe, Te, Ee, Be, Ie, ke, De, Le, Oe, Re, ze, Ne, Fe, Ue, He, Ge, Ve, We, je, qe, Ze, $e, Xe, Ye, Je, Qe, Ke, et, tt, st, it, nt, at, rt, ot, lt, ct, ht, ut, dt, pt, mt, ft, gt, vt, bt, yt, _t, xt, wt, St, At, Mt, Ct, Pt, Tt, Et, Bt, It, kt, Dt, Lt, Ot, Rt, zt, Nt, Ft, Ut, Ht, Gt, Vt, Wt, jt, qt, Zt, $t, Xt, Yt, Jt, Qt, Kt, es, ts, ss, is, ns, as, rs, os, ls, cs, hs, us, ds, ps, ms, fs, gs, vs, bs, ys, _s, xs, ws, Ss, As, Ms, Cs, Ps, Ts, Es, Bs, Is, ks, Ds, Ls, Os, Rs, zs, Ns, Fs, Us, Hs, Gs, Vs, Ws, js, qs, Zs, $s, Xs, Ys, Js, Qs, Ks, ei, ti, si, ii, ni, ai, ri, oi, li, ci, hi, ui, di, pi, mi, fi, gi, vi, bi, yi, _i, xi, wi, Si, Ai, Mi, Ci, Pi, Ti, Ei, Bi, Ii, ki, Di, Li, Oi, Ri, zi, Ni, Fi, Ui, Hi, Gi, Vi, Wi, ji, qi, Zi, $i, Xi, Yi, Ji, Qi, Ki, en, tn, sn, nn, an, rn, on, ln, cn, hn, un, dn, pn, mn, fn, gn, vn, bn, yn, _n, xn, wn, Sn, An, Mn, Cn, Pn, Tn, En, Bn, In, kn, Dn, Ln, On, Rn, zn, Nn, Fn, Un, Hn, Gn, Vn, Wn, jn, qn, Zn, $n, Xn, Yn, Jn, Qn, Kn, ea, ta, sa, ia, na, aa, ra, oa, la, ca, ha, ua, da, pa, ma, fa, ga, va, ba, ya, _a, xa, wa, Sa, Aa, Ma, Ca, Pa, Ta, Ea, Ba, Ia, ka, Da, La, Oa, Ra, za, Na, Fa, Ua, Ha, Ga, Va, Wa, ja, qa, Za, $a, Xa, Ya, Ja, Qa, Ka, er, tr, sr, ir, nr, ar, rr, or, lr, cr, hr, ur, dr, pr, mr, fr, gr, vr, br, yr, _r, xr, wr, Sr, Ar, Mr, Cr, Pr, Tr, Er, Br, Ir, kr, Dr, Lr, Or, Rr, zr, Nr, Fr, Ur, Hr, Gr, Vr, Wr, jr, qr, Zr, $r, Xr, Yr, Jr, Qr, Kr };
