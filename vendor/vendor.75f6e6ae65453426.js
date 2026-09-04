//  glorb [R]
//  Build 20250626-165126
function e(e, t, s, i, n) {
  for (t = t.split ? t.split(".") : t, i = 0; i < t.length; i++) e = e ? e[t[i]] : n;
  return e === n ? s : e;
}
import { k, H, q, X, nt, at, dt, pt, bt, yt, _t, St, Ft, Kt, es, ts, rs, os, ls, hs, Cs, Rs, Fs, Us, Ws, qs, $s, Js, Qs, xi, wi, Gi, $i, Yi, Qi, Ki, rn, on, un, _n, kn, Dn, ea, Ma, $a, ur, Fr, Ur, Vr, Kr } from './vue-runtime-router.js';
let eo, to;
const so = (e, t) => {
  eo = e, to = t;
};
function io() {
  const e = new Promise(so);
  return e.resolve = eo, e.reject = to, e;
}
const no = {
    timeout: 500
  },
  ao = globalThis.requestIdleCallback || globalThis.requestAnimationFrame,
  ro = globalThis.cancelIdleCallback || globalThis.cancelAnimationFrame,
  oo = {
    request: ao,
    cancel: ro,
    promise: e => new Promise(t => ao(t, Object.assign({}, no, e)))
  };
function lo(e) {
  return new Promise(t => setTimeout(t, e));
}
function co(e, t = 1, s = {}, i) {
  const n = s.bind || null,
    a = null == s.trail || !!s.trail,
    r = null == s.tail || !!s.tail;
  let o,
    l,
    c,
    h = null,
    u = a,
    d = !1;
  function p() {
    h = null, a && !d && (u = !0), e.call(n, o, l, c), i && d && r && (d = !1, h = setTimeout(p, t));
  }
  return function (s, r, m) {
    i || (clearTimeout(h), h = null), o = s, l = r, c = m, a && u && (u = !1, e.call(n, o, l, c)), null === h ? h = setTimeout(p, t) : i && (d = !0);
  };
}
const ho = e => e,
  uo = async ({
    exitPrevious: e,
    toggleClass: t
  }) => {
    await e(), await t();
  },
  po = async ({
    toggleClass: e,
    done: t
  }) => {
    e(), t();
  },
  mo = {
    enter: 1e3,
    leave: 500,
    done: 0
  },
  fo = Symbol("CurrentNRV"),
  go = Symbol("NRVComponentKey"),
  vo = e => {
    var t;
    return null == (t = null == (e = void 0 === e ? _n() : (null == e ? void 0 : e.component) ?? e) ? void 0 : e.provides) ? void 0 : t[go];
  },
  bo = Cs({
    name: "NiceViewContainer",
    props: {
      tag: {
        type: String,
        default: "section"
      },
      name: {
        type: String,
        default: null
      },
      duration: {
        type: [Object, Number],
        default: null
      }
    },
    setup(e, {
      slots: t
    }) {
      const s = _n(),
        i = null == s ? void 0 : s.provides[fo],
        n = vo();
      return null != e.name && (n.classes[n.prefix + "-" + n.name] = !1, n.name = e.name, n.classes[n.prefix + "-" + n.name] = !0), i && n && (n.containerInstance = s, null != e.duration && i.assignDurations(n.durations, e.duration), Fs(() => {
        n.containerInstance === s && (n.containerInstance = null);
      })), () => Dn(e.tag, {
        class: n.classes ?? null
      }, t.default());
    }
  }),
  yo = Cs({
    name: "NRVComponentWrapper",
    inheritAttrs: !1,
    props: ["context", "name", "duration"],
    setup(e, {
      slots: t
    }) {
      const s = ((e, {
        context: t,
        name: s
      } = {}) => {
        const i = {
          prefix: e,
          name: s ?? "",
          context: t,
          classes: {
            "enter-from": !1,
            "enter-active": !1,
            "enter-to": !1,
            "leave-active": !1
          }
        };
        return i.classes[e] = !0, null != s && (i.classes[e + `-${s}`] = !0), i;
      })(wi(fo).prefix, dt(e));
      return xi(go, s), Fs(() => {
        s.enterCallback = uo, s.leaveCallback = po, s.context = null;
      }), t.default;
    }
  }),
  _o = Cs({
    name: "NiceViewManager",
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: "default"
      },
      customKey: {
        type: Function,
        default: null
      },
      useKeyIndex: {
        type: Boolean,
        default: !0
      },
      prefix: {
        type: String,
        default: "view"
      },
      route: {
        type: Object,
        default: null
      }
    },
    setup(e, {
      attrs: t
    }) {
      const s = wi(Vr),
        i = kn(() => e.route || s.value),
        n = wi(Ur, 0),
        a = kn(() => {
          const {
            matched: e
          } = i.value;
          let t,
            s = St(n);
          for (; (t = e[s]) && !t.components;) s++;
          return s;
        }),
        r = kn(() => i.value.matched[a.value]);
      xi(Ur, kn(() => a.value + 1)), xi(Fr, r), xi(Vr, i);
      const o = yt();
      hs(() => [o.value, r.value, e.name], ([e, t, s], [i, n, a]) => {
        var r, o;
        t && (t.instances[s] = e, n && n !== t && e && e === i && (t.leaveGuards.size || (t.leaveGuards = n.leaveGuards), t.updateGuards.size || (t.updateGuards = n.updateGuards))), !e || !t || n && (o = n, ((r = t).aliasOf || r) === (o.aliasOf || o)) && i || (t.enterCallbacks[s] || []).forEach(t => t(e));
      }, {
        flush: "post"
      });
      const l = _t([]);
      let c = null,
        h = {},
        u = 0,
        d = null,
        p = 0;
      function m() {
        let e = !1;
        const t = [];
        for (let s = 0; s < l.value.length; s++) {
          const i = l.value[s],
            n = null == i ? void 0 : i.component,
            a = vo(i);
          i.__nrv_removable && !a || n.isUnmounted || (null == a ? void 0 : a.hasLeft) ? e = !0 : t.push(i);
        }
        e && (l.value = t);
      }
      function f(e, t) {
        if (null != t) if ("number" == typeof t) for (let s in e) e[s] = t;else "object" == typeof t && Object.assign(e, t);
      }
      function g(e, t, s) {
        if (Object.assign(t, s), null == e ? void 0 : e.classList) for (let i in s) s[i] ? e.classList.add(i) : e.classList.remove(i);
      }
      return Ws(e => !1), hs(() => [i.value], ([s]) => {
        var i;
        const n = e.name,
          a = r.value,
          v = a && (null == (i = a.components) ? void 0 : i[n]);
        if (!a) return;
        if (!v) return;
        const b = function (t, s) {
          let i = "",
            n = 0;
          for (; n < t.matched.length; n++) {
            const e = t.matched[n];
            if (i += e.path, e === s) break;
          }
          let a = t.fullPath;
          const r = n < t.matched.length - 1;
          if (r) {
            h[i] || (h[i] = ur([{
              name: "_",
              path: i
            }], {}).getRoutes()[0]);
            const e = h[i];
            a = e.stringify(e.params);
          }
          a !== d && (p = p + 1 | 0);
          return d = a, e.customKey ? e.customKey({
            route: t,
            matchedRoute: s,
            computedFullPath: a,
            keyIndex: p
          }) : e.useKeyIndex ? p + "|" + a : a;
        }(s, a);
        if (b === c) return;
        c = b;
        const y = a.props[n],
          _ = y ? !0 === y ? s.params : "function" == typeof y ? y(s) : y : null,
          x = e => {
            var t;
            (null == (t = e.component) ? void 0 : t.isUnmounted) && (a.instances[n] = null);
          },
          w = (S = a.name ?? v.__name).charAt(0).toLowerCase() + S.slice(1);
        var S;
        const A = pt({
          route: s,
          matchedRoute: a
        });
        let M = null;
        const C = function () {
            let e,
              t,
              s = null;
            return {
              setup: i,
              mounted: n,
              dispose: a
            };
            function i(s) {
              if (e = null == s ? void 0 : s.component, e) {
                if (t = vo(e), !t) return {};
                if (!t.creating && (Ft().then(() => t.creating = !1), t.creating = !0, Object.assign(t, {
                  enterCallback: uo,
                  leaveCallback: po,
                  setCSSEnterClass: ho,
                  setCSSLeaveClass: ho,
                  exitLastOnly: !1,
                  durations: {
                    ...mo
                  },
                  isHMR: !!t.initialized,
                  initialized: !0
                }), t.queueOptions)) {
                  const e = t.queueOptions;
                  f(t.durations, e.duration), null != e.exitLastOnly && (t.exitLastOnly = !!exitLastOnly), "function" == typeof e.onEnter && (t.enterCallback = e.onEnter), "function" == typeof e.onLeave && (t.leaveCallback = e.onLeave), t.queueOptions = null;
                }
              }
            }
            async function n(s, i) {
              var n, a, r, o, c;
              if (!t || t.mounting) return;
              Ft().then(() => t.mounting = !1), t.mounting = !0;
              const h = (null == (a = null == (n = null == t ? void 0 : t.containerInstance) ? void 0 : n.vnode) ? void 0 : a.el) ?? (null == (r = null == e ? void 0 : e.vnode) ? void 0 : r.el);
              g(h, t.classes, {
                "enter-from": !0,
                "enter-active": !1
              }), h && h.offsetHeight;
              const d = ++u,
                p = l.value;
              let f = -1,
                v = p.length;
              for (let e = 0; e < v; e++) {
                const s = p[e];
                if (vo(s) === t) {
                  f = e;
                  break;
                }
              }
              t.entering = !0;
              const b = p[f],
                y = p.slice(0, f);
              let _ = !1;
              const x = ({
                  lastOnly: e,
                  params: s = {}
                } = {}) => {
                  if (_) return;
                  e = e ?? t.exitLastOnly, _ = !0;
                  const i = y.map(e => function (e, t, s) {
                    if (!e) return;
                    let i = e.__nrv_removable;
                    e.__nrv_removable = !0;
                    const n = e.component;
                    if (!n || n.isUnmounted) return m();
                    const a = vo(e);
                    return !a || a.hasLeft ? m() : (a.leavingPromise || i || (a.leavingPromise = async function (e, t, s = {}) {
                      var i, n, a;
                      const r = e.component,
                        o = vo(e);
                      o.leaving = !0;
                      const l = (null == (n = null == (i = null == o ? void 0 : o.containerInstance) ? void 0 : i.vnode) ? void 0 : n.el) ?? (null == (a = null == r ? void 0 : r.vnode) ? void 0 : a.el);
                      let c = !1;
                      const h = io(),
                        u = {
                          el: l,
                          from: o.context,
                          to: vo(t).context,
                          toggleClass: o.setCSSLeaveClass,
                          isCancelled: () => r.isUnmounted,
                          params: s,
                          done: ({
                            delay: e,
                            duration: t
                          } = {}) => (c || (c = !0, (e = e ?? t ?? o.durations.done) ? lo(e).then(h.resolve) : h.resolve()), h)
                        },
                        d = Promise.resolve().then(() => o.leaveCallback(u)).then(() => {
                          if (o.cssLeftAt) {
                            const e = performance.now() - o.cssLeftAt,
                              t = o.cssLeftDuration - e;
                            if (t > 0) return new Promise(e => setTimeout(e, t));
                          }
                        });
                      return d.then(() => {
                        o.hasLeft = !0, m();
                      }), Promise.race([d, h]);
                    }(e, t, s)), a.leavingPromise);
                  }(e, b, s));
                  return e ? i[i.length - 1] : Promise.all(i);
                },
                w = () => d !== u || t.leaving || t.hasLeft || e.isUnmounted,
                S = () => {
                  e.isUnmounted || g(h, t.classes, {
                    "enter-from": !1,
                    "enter-active": !1
                  });
                };
              let A = !1,
                M = null;
              t.setCSSEnterClass = ({
                duration: s
              } = {}) => M || (M = new Promise(i => {
                null == s && (s = t.durations.enter), A = !0, t.setCSSEnterClass = ho, g(h, t.classes, {
                  "enter-from": !1,
                  "enter-active": !0
                }), s > 0 ? setTimeout(() => {
                  e.isUnmounted || (S(), i());
                }, s) : S();
              }));
              let C = null;
              t.setCSSLeaveClass = ({
                duration: s
              } = {}) => C || (C = new Promise(i => {
                null == s && (s = t.durations.leave), s = Math.max(t.durations.done, s), t.cssLeftAt = performance.now(), t.cssLeftDuration = s, t.setCSSLeaveClass = ho, S(), g(h, t.classes, {
                  "leave-to": !0,
                  "leave-active": !0
                }), s > 0 ? setTimeout(() => !e.isUnmounted && i(), s) : i();
              }));
              const P = (null == (o = y[y.length - 1]) ? void 0 : o.component) ?? null,
                T = (null == (c = vo(P)) ? void 0 : c.context) ?? null,
                E = {
                  el: h,
                  from: T,
                  to: t.context,
                  isCancelled: w,
                  exitPrevious: x,
                  toggleClass: t.setCSSEnterClass
                };
              await 0, w() || (await t.enterCallback(E), A || S(), t.enterCallback === ho && x());
            }
            function a() {
              t && clearTimeout(s);
            }
          }(),
          P = Dn(yo, {
            name: w,
            context: A,
            key: b
          }, () => M = M || Dn(v, {
            ..._,
            ...t,
            onVnodeBeforeMount: C.setup,
            onVnodeMounted: C.mounted,
            onVnodeBeforeUnmount: C.dispose,
            onVnodeUnmounted: x,
            ref: o
          }));
        l.value = [...l.value, P];
      }, {
        flush: "pre",
        immediate: !0
      }), xi(fo, {
        prefix: e.prefix,
        setNiceViewOptions: function (e = {}) {
          if (!xo()) return {};
          vo().queueOptions = e;
        },
        assignDurations: f
      }), function () {
        return l.value;
      };
    }
  });
function xo() {
  const e = _n();
  if (!(null == e ? void 0 : e.provides[fo])) return !1;
  if (!((null == e ? void 0 : e.parent.vnode.type) === yo)) return !1;
  return !!vo();
}
function wo(e = {}) {
  const t = _n(),
    s = null == t ? void 0 : t.provides[fo];
  return s ? s.setNiceViewOptions(e) : {};
}
function So(e, t, s, i) {
  this.fn = t, this.ctx = s || null, this.owner = e, this.once = !!i;
}
function Ao(e) {
  if (!e || !e.owner) return;
  e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev);
  const t = e.owner;
  e.ctx = e.fn = e.owner = null, e === t._first && (t._first = e.next), e === t._last && (t._last = e.prev);
}
class Mo {
  constructor() {
    this._first = this._last = null, this._isStoreSignal = !0;
  }
  emit(e, t, s) {
    let i = this._first;
    for (; i;) i.fn.call(i.ctx, e, t, s), i.once && this.unwatch(i), i = i.next;
  }
  watch(e, t, s) {
    const i = new So(this, e, t, s);
    return this._first ? (this._last.next = i, i.prev = this._last, this._last = i) : (this._first = i, this._last = i), i;
  }
  watchOnce(e, t) {
    return this.watch(e, t, !0);
  }
  unwatch(e, t) {
    if (e instanceof So) return Ao(e);
    t || (t = null);
    let s = this._first;
    for (; s;) s.fn === e && s.ctx === t && Ao(s), s = s.next;
  }
  unwatchAll() {
    let e = this._first;
    for (this._first = this._last = null; e;) Ao(e), e = e.next;
  }
}
Mo.prototype.destroy = Mo.prototype.unwatchAll;
const Co = Ao;
function Po() {
  return new Mo();
}
const To = new Set(),
  Eo = {
    stack: To,
    isFrozen: !1,
    holdEmits: Bo,
    releaseEmits: Io,
    batchUpdates: function (e) {
      return function (t, s, i) {
        Bo(), e(t, s, i), Io();
      };
    }
  };
function Bo() {
  Eo.isFrozen = !0;
}
function Io() {
  Eo.isFrozen = !1, To.forEach(ko), To.clear();
}
function ko(e) {
  e._emit();
}
const Do = Eo;
class Lo extends Mo {
  constructor(e) {
    super(), this.previous = null, this.value = e;
  }
  get() {
    return this.value;
  }
  set(e, t) {
    if (t || this.value !== e) {
      if (this.previous = this.value, this.value = e, Do.isFrozen) return Do.stack.add(this);
      this._emit();
    }
  }
  watchImmediate(e, t) {
    const s = this.watch(e, t);
    return e.call(t, this.value, this.previous), s;
  }
  _emit() {
    let e = this._first;
    for (; e;) e.fn.call(e.ctx, this.value, this.previous), e.once && this.unwatch(e), e = e.next;
    this.previous = null;
  }
  update(e, t) {
    const s = e(this.value);
    this.set(void 0 !== s ? s : this.value, t);
  }
}
function Oo(e) {
  return new Lo(e);
}
function Ro(e, t) {
  const s = new Lo(),
    i = s.set.bind(s);
  delete s.set, e = Array.isArray(e) ? e : [e];
  const n = new Array(e.length);
  let a = [];
  for (let o = 0, l = e.length; o < l; o++) {
    const t = e[o],
      s = function (e) {
        n[o] = e, r();
      };
    n[o] = t.value, t.watch(s), a.push(t, s);
  }
  function r() {
    const e = t.apply(null, n);
    e && e.then ? e.then(i) : i(e);
  }
  return s.destroy = function () {
    for (let e = 0, t = a.length; e < t; e += 2) a[e].unwatch(a[e + 1]);
    a = null, s.unwatchAll();
  }, r(), s;
}
function zo() {}
function No(e, t, s) {
  this.fn = e, this.context = t, this.once = !!s;
}
function Fo(e, t, s, i, n) {
  const a = new No(s, i, n),
    r = e.events;
  r[t] ? r[t].push(a) : r[t] = [a];
}
function Uo(e, t) {
  const s = e.events[t];
  s && (s.length = 0);
}
zo.prototype = Object.create(null);
class Ho {
  constructor() {
    this.events = new zo();
  }
  emit(e, t) {
    const s = this.events[e];
    if (s) for (let i = 0, n = s.length; i < n; i++) {
      const n = s[i];
      n.once && this.off(e, n.fn, n.context), n.fn.call(n.context, t);
    }
  }
  on(e, t, s) {
    return Fo(this, e, t, s, !1);
  }
  once(e, t, s) {
    return Fo(this, e, t, s, !0);
  }
  off(e, t, s) {
    const i = this.events[e];
    if (!i) return;
    if (!t) return Uo(this, e);
    let n = i.length;
    for (; n--;) {
      const e = i[n];
      e.fn === t && e.context === s && i.splice(n, 1);
    }
  }
  clear(e) {
    e ? Uo(this, e) : this.events = new zo();
  }
}
new Ho();
const { holdEmits: Go, releaseEmits: Vo, batchUpdates: Wo } = Do;
function jo(e, t, s, i, n) {
  for (t = t.split ? t.split(".") : t, i = 0; i < t.length; i++) e = e ? e[t[i]] : n;
  return e === n ? s : e;
}
const qo = {};
function Zo(e, t, s) {
  const i = t && "object" == typeof t;
  t = i ? t : null, s = i || void 0 !== s ? s : t;
  const n = window.__DATA || qo,
    a = jo(n, e, jo(n.page, e, jo(n.site, e, jo(n.project, e, s ? e : ""))));
  return t ? function (e, t = {}) {
    return e.includes("{{") ? e.replace(/{{([ a-z0-9+_.-]+)}}/gi, (e, s) => {
      let i = null,
        n = 0;
      const a = (s = s.trim()).match(/([+*/-]) ?([0-9]*)$/i);
      a && (s = s.slice(0, -a[0].length).trim(), i = a[1], n = parseFloat(a[2]));
      let r = jo(t, s);
      return null == r ? "" : (isNaN(parseFloat(r)) || ("-" === i ? r -= n : "+" === i ? r += n : "*" === i ? r *= n : "/" === i && (r /= n)), r);
    }) : e;
  }(a, t) : a;
}
const $o = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: e => {
      const t = nt({
        useCookieConsent: !1,
        overrideSpawnPoint: null,
        gameGoals: {
          CircuitBike: Zo("game.timer.target.CircuitBike") || 70
        },
        actorCounts: {},
        computedCounts: {},
        isDeadEnd: !1,
        isGuest: !1,
        isMenuOpen: !1,
        isCustomizeOpen: !1,
        isFormOpen: !1,
        isTransitionActive: !1,
        isPhoneReady: !0,
        isDialogLoading: !1,
        isDialogVisible: !1,
        isDialogVisibleDelayed: !1,
        isInteractionButtonVisible: !1,
        isInteractionButtonVisibleDelayed: !1,
        isApiErrorVisible: !1,
        phone: {
          tab: at({
            id: "Map",
            props: null
          }),
          isTransitionActive: !1,
          isFullScreen: !1,
          isVisible: !1,
          isReady: !1,
          width: 1,
          height: 1,
          border: 1,
          scale: 1,
          textScale: 1,
          triggerThumbAnim: pt(Po())
        },
        isConfettisActive: !1,
        confettisCount: 0,
        newItem: null,
        newItemNeedsUpdate: !1,
        itemNotification: !1,
        isInteractionDone: !1,
        sceneStates: {
          Intro: 1,
          Tutorial: 2,
          Playing: 3,
          Default: 100
        },
        sceneState: 0,
        isAudioMuted: !!+localStorage.getItem("audio-muted"),
        isVideoPlaying: !1,
        isMovingWithMouse: !1,
        isTelescopeActive: !1,
        isCinematicActive: null,
        currentFullscreenVideo: !1,
        currentBiome: "default"
      });
      i("currentFullscreenVideo", 800), rs(() => {
        localStorage.setItem("audio-muted", +!!t.isAudioMuted);
      }), function (e, s) {
        let i,
          n = e + "Delayed";
        const a = () => t[n] = !0;
        hs(() => t[e], e => {
          clearTimeout(i), e ? i = setTimeout(a, s) : t[n] = !1;
        }, {
          immediate: !0
        });
      }("isTelescopeActive", 500);
      let s = null;
      function i(e, s) {
        let i,
          n = e + "Delayed";
        const a = () => t[n] = !1;
        hs(() => t[e], e => {
          clearTimeout(i), e ? t[n] = !0 : i = setTimeout(a, s);
        }, {
          immediate: !0
        });
      }
      return t.toggleConfettis = (e, i) => {
        !i && s && s !== e || (s = i ? e : null, t.isConfettisActive = !!i);
      }, e.onBeforeMount(() => {
        const s = e.config.globalProperties;
        t.isOverlaySemiVisible = kn(() => s.$circuit.isFinished || s.$notifs.isOverlayActive.value), t.isOverlayVisible = kn(() => t.isOverlaySemiVisible || t.isFormOpen || t.isMenuOpen || t.itemNotification || s.$circuit.isOutro || "Phone" === s.$router.currentRoute.value.name), t.isHeaderVisible = kn(() => s.$route && s.$route.meta.isHeaderVisible), t.isNotHome = kn(() => "Home" !== s.$route.name), t.isPhoneOpen = kn(() => "Phone" === s.$router.currentRoute.value.name), i("isNotHome", 500), i("isTransitionActive", 800), i("isDialogVisible", 1e3), i("isInteractionButtonVisible", 20);
      }), t;
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Xo = Object.assign({
    "/app/store/index.js": $o
  }),
  Yo = e => "object" == typeof e && !Array.isArray(e) && null !== e;
const Jo = () => {},
  Qo = {
    enter: Jo,
    onProgress: Jo,
    exit: Jo
  };
function Ko(e) {
  let t = [{
    x: "Unknown",
    m: function (e) {
      return function () {
        let e = /iPhone|iPad|Macintosh/.exec(navigator.userAgent);
        if (e && e.length > 0) return e[0];
        return "";
      }();
    },
    n: [4, 2, 1, 3]
  }, {
    x: "Apple A7 GPU|Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A12 GPU|Apple A13 GPU|Apple A14 GPU|Apple A15 GPU",
    m: function (e) {
      return o();
    },
    n: [10, 11, 12, 15, 14, 6, 7, 8, 5, 9, 13],
    v: ["iPhone"]
  }, {
    x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8X GPU|Apple M1 GPU|Apple A14 GPU|Apple A12Z GPU|Apple A15 GPU|Apple A13 GPU",
    m: function (e) {
      return o();
    },
    n: [22, 18, 21, 20, 19, 17, 16],
    v: ["iPad"]
  }, {
    x: "Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A12X GPU|Apple A12 GPU|Apple A8 GPU|Apple A8X GPU|Apple A13 GPU|Apple A14 GPU|Apple M1 GPU|Apple A12Z GPU|Apple A15 GPU",
    m: function (e) {
      return o();
    },
    n: [22, 18, 21, 10, 11, 12, 15, 20, 19, 24, 27, 14, 17, 25, 26, 9, 13, 23],
    v: ["Macintosh"]
  }, {
    x: "Apple A10 GPU",
    v: ["iPod Touch"]
  }, {
    x: "Apple A7 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A8 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return l();
    },
    n: [28, 29],
    v: [1136]
  }, {
    x: "Apple A8 GPU|Apple A10 GPU|Apple A11 GPU|Apple A9 GPU",
    m: function (e) {
      return l();
    },
    n: [30, 31],
    v: [2001]
  }, {
    x: "Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
    m: function (e) {
      return l();
    },
    n: [32, 33],
    v: [2208]
  }, {
    x: "Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return l();
    },
    n: [34, 35],
    v: [1334]
  }, {
    x: "Apple A11 GPU|Apple A12 GPU|Apple A13 GPU|Apple A14 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [37, 38, 39, 40, 36, 41],
    v: [2436]
  }, {
    x: "Apple A12 GPU|Apple A13 GPU",
    m: function (e) {
      return s();
    },
    n: [42, 36],
    v: [2688]
  }, {
    x: "Apple A12 GPU|Apple A13 GPU",
    m: function (e) {
      return s();
    },
    n: [44, 43],
    v: [1624]
  }, {
    x: "Apple A12 GPU|Apple A13 GPU",
    m: function (e) {
      return s();
    },
    n: [44, 43],
    v: [1792]
  }, {
    x: "Apple A11 GPU|Apple A12 GPU|Apple A14 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [47, 45, 36, 46, 41],
    v: [2079]
  }, {
    x: "Apple A14 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [48, 39, 40],
    v: [2532]
  }, {
    x: "Apple A14 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [39, 49],
    v: [2778]
  }, {
    x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8X GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return l();
    },
    n: [51, 50],
    v: [2048]
  }, {
    x: "Apple A9X GPU|Apple A10X GPU|Apple A12X GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return l();
    },
    n: [52, 53],
    v: [2732]
  }, {
    x: "Apple A10X GPU|Apple A12 GPU",
    m: function (e) {
      return r();
    },
    n: [55, 54],
    v: [2224]
  }, {
    x: "Apple A12X GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return s();
    },
    n: [57, 56],
    v: [2388]
  }, {
    x: "Apple A10 GPU|Apple A12 GPU|Apple A13 GPU",
    m: function (e) {
      return r();
    },
    n: [58, 59, 60],
    v: [2160]
  }, {
    x: "Apple A14 GPU|Apple M1 GPU",
    m: function (e) {
      return s();
    },
    n: [39, 62, 61],
    v: [2360]
  }, {
    x: "Apple A15 GPU",
    v: [2266]
  }, {
    x: "Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8 GPU|Apple A8X GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return l();
    },
    n: [63, 51],
    v: [2048]
  }, {
    x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
    m: function (e) {
      return l();
    },
    n: [64, 33],
    v: [2208]
  }, {
    x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return l();
    },
    n: [64, 35],
    v: [1334]
  }, {
    x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return l();
    },
    n: [65, 29],
    v: [1136]
  }, {
    x: "Apple A10 GPU|Apple A11 GPU|Apple A9 GPU",
    m: function (e) {
      return l();
    },
    n: [64, 31],
    v: [2001]
  }, {
    x: "Apple A7 GPU|Apple A9 GPU|Apple A8 GPU",
    m: function (e) {
      return r();
    },
    n: [66, 68, 67, 69, 70],
    v: ["srgb"]
  }, {
    x: "Apple A10 GPU|Apple A11 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [71, 37, 44, 73, 72],
    v: ["p3"]
  }, {
    x: "Apple A8 GPU|Apple A9 GPU",
    m: function (e) {
      return r();
    },
    n: [74, 75],
    v: ["srgb"]
  }, {
    x: "Apple A10 GPU|Apple A11 GPU",
    m: function (e) {
      return r();
    },
    n: [76, 77],
    v: ["p3"]
  }, {
    x: "Apple A8 GPU|Apple A9 GPU",
    m: function (e) {
      return r();
    },
    n: [78, 79],
    v: ["srgb"]
  }, {
    x: "Apple A10 GPU|Apple A11 GPU",
    m: function (e) {
      return r();
    },
    n: [76, 80],
    v: ["p3"]
  }, {
    x: "Apple A8 GPU|Apple A9 GPU",
    m: function (e) {
      return r();
    },
    n: [81, 82],
    v: ["srgb"]
  }, {
    x: "Apple A10 GPU|Apple A11 GPU|Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return s();
    },
    n: [71, 37, 44, 73, 72],
    v: ["p3"]
  }, {
    x: "Apple A12 GPU",
    v: [958581112, 2301174800, 4085158452]
  }, {
    x: "Apple A11 GPU",
    v: [367695777, 411650080, 1220644697]
  }, {
    x: "Apple A13 GPU",
    v: [4193218782]
  }, {
    x: "Apple A14 GPU",
    v: [105985484]
  }, {
    x: "Apple A14 GPU",
    v: [3403189785]
  }, {
    x: "Apple A14 GPU|Apple A15 GPU",
    v: [2364051618]
  }, {
    x: "Apple A13 GPU",
    v: [352823931, 4193218782]
  }, {
    x: "Apple A12 GPU",
    v: [958581112, 2301174800, 3403189785, 4085158452]
  }, {
    x: "Apple A13 GPU",
    v: [352823931, 3335845976, 4193218782]
  }, {
    x: "Apple A11 GPU",
    v: [367695777, 411650080]
  }, {
    x: "Apple A14 GPU",
    v: [105985484, 679860869, 3403189785]
  }, {
    x: "Apple A13 GPU",
    v: [352823931]
  }, {
    x: "Apple A15 GPU",
    v: [679860869]
  }, {
    x: "Apple A15 GPU",
    v: [1407135659]
  }, {
    x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A9 GPU|Apple A10 GPU|Apple A8X GPU",
    m: function (e) {
      return r();
    },
    n: [86, 83, 87, 88, 89, 91, 84, 85, 90, 66],
    v: ["srgb"]
  }, {
    x: "Apple A10X GPU|Apple A9X GPU|Apple A12X GPU|Apple A12 GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return s();
    },
    n: [96, 57, 93, 92, 94, 95],
    v: ["p3"]
  }, {
    x: "Apple A9X GPU",
    v: ["srgb"]
  }, {
    x: "Apple A10X GPU|Apple A12X GPU|Apple M1 GPU|Apple A12Z GPU",
    m: function (e) {
      return s();
    },
    n: [98, 97, 96, 99, 100],
    v: ["p3"]
  }, {
    x: "Apple A10X GPU",
    v: [63583436, 2114570256, 3129316290]
  }, {
    x: "Apple A12 GPU",
    v: [1349146759, 2917249763]
  }, {
    x: "Apple A12X GPU|Apple A12Z GPU",
    v: [4085158452]
  }, {
    x: "Apple M1 GPU",
    v: [105985484, 3403189785]
  }, {
    x: "Apple A10 GPU",
    v: [2114570256]
  }, {
    x: "Apple A12 GPU",
    v: [1349146759]
  }, {
    x: "Apple A12 GPU|Apple A13 GPU",
    m: function (e) {
      return s();
    },
    n: [102, 101],
    v: [2206992415]
  }, {
    x: "Apple A14 GPU|Apple M1 GPU",
    m: function (e) {
      return r();
    },
    n: [103, 104],
    v: [3403189785]
  }, {
    x: "Apple M1 GPU",
    v: [2364051618]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU|Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return s();
    },
    n: [111, 106, 108, 107, 105, 109, 110],
    v: ["srgb"]
  }, {
    x: "Apple A9 GPU",
    v: ["srgb"]
  }, {
    x: "Apple A9 GPU|Apple A10 GPU",
    m: function (e) {
      return r();
    },
    n: [112, 69, 70],
    v: ["srgb"]
  }, {
    x: "Apple A7 GPU",
    v: [857422828, 1915583345]
  }, {
    x: "Apple A9 GPU",
    v: [46663968, 3129316290]
  }, {
    x: "Apple A8 GPU",
    v: [839732043, 3816812018, 4125234388]
  }, {
    x: "Apple A9 GPU",
    v: [2114570256]
  }, {
    x: "Apple A9 GPU",
    v: [63583436]
  }, {
    x: "Apple A10 GPU",
    v: [583354101, 3458129248, 3928876783]
  }, {
    x: "Apple A13 GPU|Apple A15 GPU",
    m: function (e) {
      return r();
    },
    n: [113, 114],
    v: [3403189785]
  }, {
    x: "Apple A15 GPU",
    v: [2364051618]
  }, {
    x: "Apple A8 GPU",
    v: [1411440593, 1924197914, 4125234388]
  }, {
    x: "Apple A9 GPU",
    v: [2114570256, 3129316290]
  }, {
    x: "Apple A10 GPU",
    v: [63583436, 2114570256, 3129316290]
  }, {
    x: "Apple A11 GPU",
    v: [1349146759, 2917249763]
  }, {
    x: "Apple A8 GPU",
    v: [1411440593, 1913250432, 3074367344, 4125234388]
  }, {
    x: "Apple A9 GPU",
    v: [46663968, 2114570256, 3129316290]
  }, {
    x: "Apple A11 GPU",
    v: [2917249763, 3237505312]
  }, {
    x: "Apple A8 GPU",
    v: [3128296539, 3816812018, 4125234388]
  }, {
    x: "Apple A9 GPU",
    v: [46663968, 63583436, 2114570256, 3129316290]
  }, {
    x: "Apple A8 GPU",
    v: [2656686317, 3710391565]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU",
    v: [3129316290]
  }, {
    x: "Apple A9 GPU|Apple A9X GPU|Apple A10 GPU",
    m: function (e) {
      return s();
    },
    n: [115, 105, 109],
    v: [2114570256]
  }, {
    x: "Apple A10 GPU",
    v: [46663968]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return i(e);
    },
    n: [117, 116],
    v: [4125234388]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return s();
    },
    n: [118, 119, 120],
    v: [4005673483]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    v: [1350183384, 1361285941, 3816812018]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU",
    m: function (e) {
      return s();
    },
    n: [111, 110],
    v: [63583436]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return s();
    },
    n: [122, 121],
    v: [2870741841]
  }, {
    x: "Apple A10X GPU|Apple A9X GPU",
    v: [3458129248]
  }, {
    x: "Apple A12X GPU|Apple A12 GPU",
    v: [4085158452]
  }, {
    x: "Apple A10X GPU|Apple A9X GPU",
    m: function (e) {
      return i(e);
    },
    n: [123, 124],
    v: [583354101]
  }, {
    x: "Apple A10X GPU|Apple A9X GPU",
    m: function (e) {
      return i(e);
    },
    n: [125, 126],
    v: [3928876783]
  }, {
    x: "Apple A12Z GPU",
    v: [958581112]
  }, {
    x: "Apple A12X GPU",
    v: [4085158452]
  }, {
    x: "Apple A10X GPU",
    v: [583354101, 3458129248, 3928876783]
  }, {
    x: "Apple M1 GPU",
    v: [105985484]
  }, {
    x: "Apple M1 GPU|Apple A10X GPU|Apple A12Z GPU",
    m: function (e) {
      return r();
    },
    n: [128, 127],
    v: [3403189785]
  }, {
    x: "Apple A12 GPU",
    v: [2301174800]
  }, {
    x: "Apple A13 GPU",
    v: [3335845976]
  }, {
    x: "Apple A14 GPU",
    v: [1349146759]
  }, {
    x: "Apple M1 GPU",
    v: [1444462398]
  }, {
    x: "Apple A9X GPU|Apple A10 GPU",
    v: [3458129248]
  }, {
    x: "Apple A8X GPU",
    v: [1480368425, 1783160115]
  }, {
    x: "Apple A8X GPU|Apple A10 GPU",
    m: function (e) {
      return r();
    },
    n: [58, 129],
    v: [3403189785]
  }, {
    x: "Apple A8 GPU",
    v: [3312905059, 3928382683]
  }, {
    x: "Apple A9 GPU|Apple A9X GPU|Apple A10 GPU",
    m: function (e) {
      return i(e);
    },
    n: [130, 131],
    v: [583354101]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU",
    m: function (e) {
      return i(e);
    },
    n: [132, 135, 133, 134],
    v: [3928876783]
  }, {
    x: "Apple A10 GPU",
    v: [1058363647, 2015944978]
  }, {
    x: "Apple A9 GPU",
    v: [46663968]
  }, {
    x: "Apple A13 GPU",
    v: [1349146759]
  }, {
    x: "Apple A15 GPU",
    v: [1444462398]
  }, {
    x: "Apple A10 GPU",
    v: [3403189785]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return n(e);
    },
    n: [136, 137],
    r: [{
      a: 29.78,
      b: 30.87
    }]
  }, {
    x: "Apple A8 GPU",
    r: [{
      a: 31.19,
      b: 31.59
    }]
  }, {
    x: "Apple A8X GPU",
    v: [1783160115]
  }, {
    x: "Apple A8 GPU",
    v: [3928382683]
  }, {
    x: "Apple A8 GPU|Apple A8X GPU",
    m: function (e) {
      return n(e);
    },
    n: [138, 139],
    v: [3403189785]
  }, {
    x: "Apple A8 GPU",
    v: [3312905059]
  }, {
    x: "Apple A8X GPU",
    v: [1480368425]
  }, {
    x: "Apple A10X GPU",
    r: [{
      a: 14.16,
      b: 17.21
    }]
  }, {
    x: "Apple A9X GPU",
    r: [{
      a: 18.44,
      b: 35.94
    }]
  }, {
    x: "Apple A10X GPU",
    r: [{
      a: 12.16,
      b: 16.01
    }]
  }, {
    x: "Apple A9X GPU",
    r: [{
      a: 16.68,
      b: 121.37
    }]
  }, {
    x: "Apple M1 GPU|Apple A12Z GPU",
    v: [1349146759]
  }, {
    x: "Apple A10X GPU",
    v: [2114570256]
  }, {
    x: "Apple A8X GPU",
    v: [4005673483]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU",
    r: [{
      a: 24.38,
      b: 31.67
    }]
  }, {
    x: "Apple A10 GPU|Apple A9X GPU",
    r: [{
      a: 16.82,
      b: 22.52
    }]
  }, {
    x: "Apple A10 GPU",
    r: [{
      a: 13.38,
      b: 16.4
    }]
  }, {
    x: "Apple A9X GPU|Apple A9 GPU",
    r: [{
      a: 19.75,
      b: 21.8
    }]
  }, {
    x: "Apple A10 GPU|Apple A9X GPU",
    r: [{
      a: 16.41,
      b: 19.14
    }]
  }, {
    x: "Apple A9X GPU",
    r: [{
      a: 89.03,
      b: 200.59
    }]
  }, {
    x: "Apple A8X GPU",
    r: [{
      a: .26,
      b: 5.62
    }]
  }, {
    x: "Apple A8 GPU",
    r: [{
      a: 7.18,
      b: 161.36
    }]
  }, {
    x: "Apple A8X GPU",
    r: [{
      a: .53,
      b: 13.31
    }]
  }, {
    x: "Apple A8 GPU",
    r: [{
      a: 83.08,
      b: 2952.42
    }]
  }];
  function s() {
    let e, t, s;
    var i = {
      create: function () {
        let e = new Array(16);
        for (let t = 0; t < 16; t++) e[t] = t % 5 == 0 ? 1 : 0;
        return e;
      },
      perspective: function (e, t, s, i, n) {
        let a,
          r = 1 / Math.tan(t / 2);
        return e[0] = r / s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = r, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, null != n && Infinity !== n ? (a = 1 / (i - n), e[10] = (n + i) * a, e[14] = 2 * n * i * a) : (e[10] = -1, e[14] = -2 * i), e;
      },
      lookAt: function (e, t, s, n) {
        let a,
          r,
          o,
          l,
          c,
          h,
          u,
          d,
          p,
          m,
          f = t[0],
          g = t[1],
          v = t[2],
          b = n[0],
          y = n[1],
          _ = n[2],
          x = s[0],
          w = s[1],
          S = s[2];
        return Math.abs(f - x) < 1e-6 && Math.abs(g - w) < 1e-6 && Math.abs(v - S) < 1e-6 ? i.identity(e) : (u = f - x, d = g - w, p = v - S, m = 1 / Math.hypot(u, d, p), u *= m, d *= m, p *= m, a = y * p - _ * d, r = _ * u - b * p, o = b * d - y * u, m = Math.hypot(a, r, o), m ? (m = 1 / m, a *= m, r *= m, o *= m) : (a = 0, r = 0, o = 0), l = d * o - p * r, c = p * a - u * o, h = u * r - d * a, m = Math.hypot(l, c, h), m ? (m = 1 / m, l *= m, c *= m, h *= m) : (l = 0, c = 0, h = 0), e[0] = a, e[1] = l, e[2] = u, e[3] = 0, e[4] = r, e[5] = c, e[6] = d, e[7] = 0, e[8] = o, e[9] = h, e[10] = p, e[11] = 0, e[12] = -(a * f + r * g + o * v), e[13] = -(l * f + c * g + h * v), e[14] = -(u * f + d * g + p * v), e[15] = 1, e);
      },
      multiply: function (e, t, s) {
        let i = t[0],
          n = t[1],
          a = t[2],
          r = t[3],
          o = t[4],
          l = t[5],
          c = t[6],
          h = t[7],
          u = t[8],
          d = t[9],
          p = t[10],
          m = t[11],
          f = t[12],
          g = t[13],
          v = t[14],
          b = t[15],
          y = s[0],
          _ = s[1],
          x = s[2],
          w = s[3];
        return e[0] = y * i + _ * o + x * u + w * f, e[1] = y * n + _ * l + x * d + w * g, e[2] = y * a + _ * c + x * p + w * v, e[3] = y * r + _ * h + x * m + w * b, y = s[4], _ = s[5], x = s[6], w = s[7], e[4] = y * i + _ * o + x * u + w * f, e[5] = y * n + _ * l + x * d + w * g, e[6] = y * a + _ * c + x * p + w * v, e[7] = y * r + _ * h + x * m + w * b, y = s[8], _ = s[9], x = s[10], w = s[11], e[8] = y * i + _ * o + x * u + w * f, e[9] = y * n + _ * l + x * d + w * g, e[10] = y * a + _ * c + x * p + w * v, e[11] = y * r + _ * h + x * m + w * b, y = s[12], _ = s[13], x = s[14], w = s[15], e[12] = y * i + _ * o + x * u + w * f, e[13] = y * n + _ * l + x * d + w * g, e[14] = y * a + _ * c + x * p + w * v, e[15] = y * r + _ * h + x * m + w * b, e;
      },
      identity: function (e) {
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
      }
    };
    let n = 0;
    if (s = document.createElement("canvas"), null != s) {
      let r = function () {
        if (!(e = function () {
          s.width = 67, s.height = 67;
          let e = s.getContext("webgl") || s.getContext("experimental-webgl");
          return e && (e.viewport(0, 0, 67, 67), e.clearColor(0, 0, 0, 1), e.clear(e.COLOR_BUFFER_BIT)), e;
        }())) return;
        let n = e.createShader(e.VERTEX_SHADER);
        e.shaderSource(n, "attribute vec3 c,d; uniform vec4 e; uniform vec3 f,g;uniform mat4 h,i;varying vec3 j;void main(){vec3 a=normalize(d);vec4 b=h*vec4(c,1.);vec3 k=normalize(vec3(e-b));j=g*f*max(dot(k,a),0.),gl_Position=i*vec4(c,1.);}"), e.compileShader(n);
        let a = e.createShader(e.FRAGMENT_SHADER);
        e.shaderSource(a, "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 j;void main(){gl_FragColor = vec4(j, 1.0);}"), e.compileShader(a), t = e.createProgram(), e.attachShader(t, n), e.attachShader(t, a), e.linkProgram(t), e.detachShader(t, n), e.detachShader(t, a), e.deleteShader(n), e.deleteShader(a), e.useProgram(t);
        let r = function (e) {
          let s,
            i,
            n = 50,
            a = [],
            r = [],
            o = [],
            l = [];
          for (s = 0; s <= 50; ++s) {
            let e = s * Math.PI / 50,
              t = Math.sin(e),
              l = Math.cos(e);
            for (i = 0; i <= n; ++i) {
              let e = 2 * i * Math.PI / n,
                c = Math.sin(e),
                h = Math.cos(e) * t,
                u = l,
                d = c * t,
                p = 1 - i / n,
                m = 1 - s / 50;
              a.push(2 * h), a.push(2 * u), a.push(2 * d), r.push(h), r.push(u), r.push(d), o.push(p), o.push(m);
            }
          }
          for (s = 0; s < 50; ++s) for (i = 0; i < n; ++i) {
            let e = 51 * s + i,
              t = e + n + 1;
            l.push(e), l.push(t), l.push(e + 1), l.push(t), l.push(t + 1), l.push(e + 1);
          }
          a = new Float32Array(a), r = new Float32Array(r), o = new Float32Array(o), l = new Uint16Array(l);
          let c = e.createBuffer(),
            h = e.createBuffer(),
            u = e.createBuffer();
          e.bindBuffer(e.ARRAY_BUFFER, c), e.bufferData(e.ARRAY_BUFFER, a, e.STATIC_DRAW);
          let d = e.getAttribLocation(t, "c");
          e.vertexAttribPointer(d, 3, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(d), e.bindBuffer(e.ARRAY_BUFFER, h), e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW);
          let p = e.getAttribLocation(t, "d");
          return e.vertexAttribPointer(p, 3, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(p), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, u), e.bufferData(e.ELEMENT_ARRAY_BUFFER, l, e.STATIC_DRAW), l.length;
        }(e);
        e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST);
        let o = i.create();
        i.perspective(o, Math.PI / 6, 1, .1, 100);
        let l = i.create();
        i.lookAt(l, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
        let c = i.create();
        i.multiply(c, o, l);
        let h = e.getUniformLocation(t, "h");
        e.uniformMatrix4fv(h, !1, l);
        let u = e.getUniformLocation(t, "i");
        e.uniformMatrix4fv(u, !1, c);
        let d = e.getUniformLocation(t, "e");
        e.uniform4fv(d, [10, 10, 10, 1]);
        let p = e.getUniformLocation(t, "f");
        e.uniform3fv(p, [.9, .5, .3]);
        let m = e.getUniformLocation(t, "g");
        return e.uniform3fv(m, [1, 1, 1]), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), e.drawElements(e.TRIANGLES, r, e.UNSIGNED_SHORT, 0), e.useProgram(null), t && e.deleteProgram(t), s.toDataURL();
      }();
      r && (n = a(r));
    }
    return n;
  }
  function i(t) {
    e(t.x);
  }
  function n(t) {
    e(t.x);
  }
  function a(e) {
    let t = 2166136261;
    for (let s = 0; s < e.length; ++s) t ^= e.charCodeAt(s), t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24);
    return t >>> 0;
  }
  function r() {
    let e = 0,
      t = document.createElement("canvas");
    if (null != t) {
      let s = function (e) {
        e.width = 67, e.height = 67;
        let t = e.getContext("2d", {
          alpha: !0
        });
        if (null != t) return t.imageSmoothingQuality = "low", t.imageSmoothingEnabled = !0, t.globalCompositeOperation = "source-over", t.globalAlpha = 1, t.miterLimit = Infinity, t.filter = "none", t.lineCap = "butt", t.lineDashOffset = 0, t.lineJoin = "miter", t.font = "10pt Arial", t.lineWidth = 2, void 0 !== t.setLineDash && t.setLineDash([10, 20]), t.shadowColor = "black", t.shadowOffsetX = -3, t.shadowOffsetY = -5, t.translate(e.width / 2, e.height / 2), t.rotate(.8901179), t.fillStyle = "green", t.textAlign = "center", t.textBaseline = "middle", t.fillText("*51Degrees*", 0, 0), t.beginPath(), t.shadowColor = "yellow", t.shadowBlur = 1, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.strokeStyle = "red", t.fillStyle = "rgba(0, 0, 255, 0.6)", void 0 === t.ellipse ? t.arc(0, 0, 25, 0, 2 * Math.PI) : t.ellipse(0, 0, 25, 15, Math.PI / 4, 0, 2 * Math.PI), t.fill(), t.stroke(), e.toDataURL();
      }(t);
      s && (e = a(s));
    }
    return e;
  }
  function o() {
    return window.screen.height * window.devicePixelRatio;
  }
  function l() {
    return function (e, t) {
      for (let i = 0; i < t.length; i++) if (s = "(" + e + ": " + t[i] + ")", window.matchMedia(s).matches) return t[i];
      var s;
      return "n/a";
    }("color-gamut", ["p3", "srgb"]);
  }
  function c(s, i) {
    if (s.m) {
      let n = s.m(s);
      n || "" === n ? n.then || function (s, i, n) {
        for (let e = 0; e < s.n.length; e++) {
          let n = t[s.n[e]];
          if (n.r) for (let e = 0; e < n.r.length; e++) {
            let t = n.r[e];
            if ((null === t.a || i >= t.a) && (null === t.b || i <= t.b)) return void c(n, 0);
          } else if (n.v && -1 != n.v.indexOf(i)) return void c(n, 0);
        }
        s.n.length > 0 && n < 10 && setTimeout(function () {
          c(s, n + 1);
        }, 10), e(s.x);
      }(s, n, i) : s.x && e(s.x);
    } else e(s.x);
  }
  c(t[0], 0);
}
let el;
el = "undefined" != typeof VV_GPU_TESTS ? VV_GPU_TESTS : {
  ultra: [["not-mobile", "ge", "geforce gtx", 1050], ["is", "radeon vii"], ["ge", "radeon rx vega", 64], ["is", "geforce titan"], ["ge", "radeon rx", 5e3], ["is", "apple m"], ["ge", "apple a", 12, 100], ["ge", "apple a", 13]],
  veryhigh: [["is", "geforce rtx"], ["is", "quadro gtx"], ["ge", "apple a", 12], ["mobile", "ge", "geforce gtx", 780], ["not-mobile", "ge", "geforce gtx", 680], ["ge", "quadro p", 400], ["is", "radeon r10"], ["is", "radeon r9"], ["ge", "radeon r7", 370], ["ge", "radeon rx", 570], ["ge", "radeon rx vega", 56]],
  high: [["is", "geforce gtx"], ["ge", "geforce mx", 250], ["ge", "radeon pro", 450], ["not-mobile", "ge", "radeon hd", 5570], ["ge", "adreno", 418], ["ge", "apple a", 11], ["ge", "mali g", 71], ["ge", "mali t", 760, 8], ["ge", "mali t", 880]],
  medium: [["brand", "nvidia"], ["brand", "amd"], ["brand", "apple"], ["is", "intel iris plus"], ["is", "intel iris pro"], ["ge", "intel hd", 630], ["le", "intel hd", 2e3], ["ge", "adreno", 430], ["is", "mali g"], ["ge", "mali t", 800, 2], ["ge", "mali t", 860]]
};
const tl = "unknown",
  sl = (e, t, s) => t.reduce((t, i) => s ? t && !!e.match(i) : t || !!e.match(i), !1),
  il = (e, t) => {
    for (const s in t) if (sl(e, t[s])) return s;
  },
  nl = {
    edge: ["edge", "edg"],
    chrome: ["chrome", "crios"],
    firefox: ["firefox", "fxios"],
    ie: ["msie", "trident", "rv:"],
    ucbrowser: ["ucbrowser"],
    safari: ["safari", "ios"],
    opera: ["opera", "opios"]
  },
  al = {
    0: "verylow",
    1: "low",
    2: "medium",
    3: "high",
    4: "veryhigh",
    5: "ultra"
  };
function rl(e, t = !1) {
  const s = {};
  if (t) return Object.assign(s, {
    type: {
      desktop: !0
    },
    os: "windows",
    browser: "chrome",
    browserVersion: "77",
    gpu: ul("low")
  });
  s.userAgent = "string" == typeof e ? e : navigator.userAgent.toLowerCase(), s.hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 1, s.type = function ({
    hasTouch: e,
    userAgent: t
  }) {
    const s = ["ios", "iphone", "ipad", "phone", "android", "blackberry"],
      i = Math.max(screen.width, screen.height) > 1020,
      n = sl(t, ["android", "safari"], !0),
      a = ol(t, e) || n,
      r = !!(a || e && sl(t, s)),
      o = !(!r || !a && !i),
      l = !r;
    return {
      desktop: l,
      mobile: r,
      tablet: o,
      phone: !(l || o && a)
    };
  }(s), s.os = function ({
    hasTouch: e,
    type: t,
    userAgent: s
  }) {
    if (ol(s, e)) return "ios";
    const i = {
        desktop: {
          windows: ["windows", "iemobile"],
          linux: ["linux"],
          macos: ["mac os"]
        },
        mobile: {
          android: ["android"],
          ios: ["ipad", "iphone"],
          blackberry: ["blackberry"]
        }
      },
      n = t.desktop ? i.desktop : i.mobile;
    return il(s, n) || tl;
  }(s), s.browser = function ({
    userAgent: e,
    os: t
  }) {
    const s = il(e, nl);
    return s || ("ios" === t ? "safari" : tl);
  }(s), s.browserVersion = function ({
    userAgent: e,
    browser: t
  }) {
    const s = t => {
      const s = e.split(t)[1];
      if (!s || s.length <= 0) return;
      const i = parseFloat(s.split(" ")[0].split(".")[0].replace(/[^.0-9]/g, ""));
      return isNaN(i) ? void 0 : i;
    };
    switch (t) {
      case "chrome":
      case "firefox":
        return void nl[t].forEach(e => {
          const t = s(e);
          if (null !== t || void 0 !== t) return t;
        });
      case "safari":
        let i = e.match(/version\/([.\d]+)/i);
        return i && i[1] ? parseFloat(i[1]) : (i = e.match(/os ([0-9_]+)/i), i && i[1] ? parseFloat(i[1].split("_")[0]) : void 0);
      case "ie":
      case "edge":
        return sl(e, ["msie"]) ? s("msie") : sl(e, ["rv:"]) ? s("rv:") : s("edge/");
      default:
        return;
    }
  }(s);
  let i = ll(s, !0);
  const n = !i;
  return cl(), i = ll(s, !1), s.majorPerformanceCaveat = i && n, s.webgl = i ? function (e, t) {
    const s = ["WEBKIT_", "MOZ_"];
    let i = t.getSupportedExtensions() || [];
    i = i.reduce((e, t) => {
      for (let i = 0; i < s.length; i++) if (!t.indexOf(s[i])) return e[t.substring(s[i].length)] = t, e;
      return e[t] = t, e;
    }, {});
    const n = "WEBGL_compressed_texture_",
      a = ["s3tc", "astc", "etc", "pvrtc"].reduce((e, t) => (e[t] = !!i[n + t], e), {}),
      r = "firefox" !== e.browser,
      o = t.getParameter(t.RENDERER),
      l = r && t.getExtension(i.WEBGL_debug_renderer_info),
      c = l ? t.getParameter(l.UNMASKED_RENDERER_WEBGL) : o;
    return {
      renderer: (t.getParameter(t.RENDERER) || "").toLowerCase(),
      rendererInfos: l,
      rendererUnmasked: c,
      version: (t.getParameter(t.VERSION) || "").toLowerCase(),
      glsl: (t.getParameter(t.SHADING_LANGUAGE_VERSION) || "").toLowerCase(),
      extensions: i,
      compressedTextures: a
    };
  }(s, i) : null, cl(), i = null, s.gpu = ul("low"), s.gpuDetectionFinished = s.webgl ? async function ({
    os: e,
    webgl: t
  }) {
    const s = {
        string: null,
        quality: {
          low: !0
        },
        qualityIndex: 1,
        type: null,
        series: null,
        version: null,
        numbers: [],
        isMobile: null
      },
      i = {
        intel: ["intel"],
        nvidia: ["nvidia", "geforce"],
        amd: ["amd", "radeon"],
        adreno: ["adreno"],
        apple: ["apple"],
        mali: ["mali"],
        swiftshader: ["swiftshader"]
      },
      n = t && t.rendererInfos,
      a = t && t.rendererUnmasked || "";
    if (!n || !a.length) return s;
    if (s.string = hl(a), s.type = il(s.string, i) || tl, s.type === tl) return s;
    "ios" === e && "apple gpu" === s.string && (s.string = await new Promise(e => {
      Ko(t => {
        const s = t.toLowerCase();
        if ("unknown" === s) return e("apple gpu");
        const i = s.split("|");
        if (i.length > 5) return e("apple gpu");
        e(i.pop());
      });
    }), s.string = hl(s.string));
    return s.isMobile = "m" === s.string[s.string.length - 1], Object.assign(s, function (e) {
      const t = e.split(" "),
        s = t.map(e => e.replace(/[\D]/g, "")).filter(e => e.length > 0).map(e => parseFloat(e)),
        i = s[0] || null;
      if (e.startsWith("apple a")) {
        const e = t[1] && t[1][t[1].length - 1];
        s[1] = "z" === e ? 100 : "x" === e ? 10 : 1;
      }
      return {
        numbers: s,
        version: i
      };
    }(s.string)), s.series = function (e) {
      const t = {
          swiftshader: "swiftshader",
          "apple a": "apple a",
          "apple m2": "apple m2",
          "apple m1": "apple m1",
          "apple m": "apple m",
          "apple gpu": "apple gpu",
          "geforce gtx": "geforce gtx",
          "geforce rtx": "geforce rtx",
          "geforce mx": "geforce mx",
          titan: "geforce titan",
          "quadro fx": "quadro fx",
          "quadro p": "quadro p",
          "quadro rtx": "quadro rtx",
          "quadro ": "quadro",
          "geforce ": "geforce",
          "tegra ": "tegra",
          "radeon vii": "radeon vii",
          "radeon r7": "radeon r7",
          "radeon r9": "radeon r9",
          "radeon r10": "radeon r10",
          "radeon rx": "radeon rx",
          "radeon pro vega": "radeon pro vega",
          "radeon rx vega": "radeon rx vega",
          "radeon hd": "radeon hd",
          "radeon pro ": "radeon pro",
          "radeon ": "radeon",
          "intel iris ": "intel iris",
          "intel iris plus ": "intel iris plus",
          "intel iris pro ": "intel iris pro",
          "intel hd ": "intel hd",
          "intel uhd ": "intel uhd",
          adreno: "adreno",
          "mali-t": "mali t",
          "mali-g": "mali g",
          mali: "mali"
        },
        s = {};
      for (const i in t) e.indexOf(i) > -1 && (s[t[i]] = !0);
      return s;
    }(s.string), Object.assign(s, function ({
      type: e,
      browser: t
    }, s) {
      if (!s || !s.type || "swiftshader" === s.type) return "firefox" === t && e.desktop ? ul("medium") : ul("low");
      const i = s.isMobile,
        n = s.type,
        a = s.series,
        r = s.version || 0;
      let o = s.numbers[1] || 1;
      const l = s.string.match(/(?:^| )mp(\d)+(?: |$)/i);
      l && (o = parseFloat(l[1]));
      const c = e => a[e],
        h = (e, t, s) => c(e) && t <= r && (void 0 === s || o <= s),
        u = (e, t, s) => c(e) && r >= t && (void 0 === s || o >= s),
        d = {
          is: c,
          le: h,
          ge: u,
          brand: e => e === n
        };
      let p = "low";
      for (let m in el) {
        const e = el[m];
        for (let t = 0, s = e.length; t < s; t++) {
          const s = e[t];
          let n = s.shift();
          if ("mobile" === n && !i) continue;
          if ("not-mobile" === n && i) continue;
          d[n] || (n = s.shift());
          const a = d[n];
          if (a && a(...s)) {
            p = m;
            break;
          }
        }
        if ("low" !== p) break;
      }
      return ul(p);
    }(n, s)), s;
  }(s).then(e => Object.assign(s.gpu, e)) : Promise.resolve(s.gpu), s;
}
function ol(e, t) {
  const s = sl(e, ["ipad", "mac", "macos"]),
    i = sl(e, ["iphone"]),
    n = "MacIntel" === navigator.platform;
  return !(i || !s || !n || !t);
}
function ll(e, t) {
  const s = document.createElement("canvas");
  let i;
  try {
    const n = {
      alpha: !1,
      antialias: !1,
      depth: !1,
      failIfMajorPerformanceCaveat: t,
      powerPreference: "high-performance",
      stencil: !1
    };
    "safari" === e.browser && 12 === e.browserVersion && e.type.desktop && delete n.powerPreference, i = s.getContext("webgl", n) || s.getContext("webgl-experimental", n) || s.getContext("experimental-webgl", n);
  } catch (n) {}
  return i;
}
function cl(e) {
  e && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").loseContext();
}
function hl(e) {
  let t = e.toLowerCase();
  return t = t.replace(/(\(tm\)|\(r\))/g, ""), t = t.trim(), t.includes("angle (") && t.includes("direct3d") && (t = t.replace("angle (", "").split(" direct3d")[0]), t.includes("nvidia") && t.includes("gb") && (t = t.split(/\dgb/)[0]), t;
}
function ul(e) {
  const t = al,
    s = Math.max(0, Object.values(t).indexOf(e));
  return {
    qualities: t,
    qualityIndex: s,
    detectedQualityIndex: s
  };
}
const dl = document.documentElement;
let pl;
const ml = JSON.parse("{\"arrow-rotate\":{\"viewBox\":\"0 0 53 16\",\"width\":53,\"height\":16,\"symbol\":\"<symbol id=\\\"arrow-rotate\\\" class=\\\"raw\\\" width=\\\"53\\\" height=\\\"16\\\" viewBox=\\\"0 0 53 16\\\" fill=\\\"none\\\"><path d=\\\"M2.14 13.922c.421 0 .842-.126 1.214-.388C10.193 8.691 18.26 6.132 26.68 6.132c8.228 0 16.144 2.455 22.895 7.101a2.096 2.096 0 0 0 2.919-.54 2.099 2.099 0 0 0-.541-2.92c-7.451-5.128-16.192-7.84-25.274-7.84C17.386 1.934 8.48 4.76.92 10.113a2.095 2.095 0 0 0-.497 2.925c.41.579 1.055.885 1.717.885Z\\\" fill=\\\"#F2676F\\\"/><path d=\\\"M11.725 15.78c.984 0 1.864-.694 2.061-1.7a2.101 2.101 0 0 0-1.662-2.46L2.541 9.76a2.097 2.097 0 0 0-2.46 1.662 2.101 2.101 0 0 0 1.662 2.46l9.583 1.859c.131.027.268.038.4.038h-.001Z\\\" fill=\\\"#F2676F\\\"/><path d=\\\"M2.142 13.923a2.1 2.1 0 0 0 2.044-1.624l2.165-9.304A2.096 2.096 0 0 0 4.782.475a2.092 2.092 0 0 0-2.52 1.569L.097 11.348a2.096 2.096 0 0 0 2.045 2.575Z\\\" fill=\\\"#F2676F\\\"/></symbol>\"},\"check\":{\"viewBox\":\"0 0 16 12\",\"width\":16,\"height\":12,\"symbol\":\"<symbol id=\\\"check\\\" width=\\\"16\\\" height=\\\"12\\\" viewBox=\\\"0 0 16 12\\\" ><path d=\\\"M0.464338 4.8684C0.975407 4.36384 1.80101 4.36381 2.31211 4.86834L5.32711 7.86617L12.9145 0.320975C13.4342 -0.122513 14.2094 -0.0919841 14.6935 0.389328C15.1776 0.870657 15.2071 1.64029 14.7623 2.15827L6.24494 10.6283L6.24371 10.6283C5.73264 11.1341 4.90704 11.1341 4.39594 10.6283L0.464381 6.71917C0.216202 6.47485 0.0773508 6.14133 0.0773394 5.7944C0.0773279 5.44623 0.216166 5.11395 0.464338 4.8684Z\\\" /></symbol>\"},\"fire\":{\"viewBox\":\"0 0 13 17\",\"width\":13,\"height\":17,\"symbol\":\"<symbol id=\\\"fire\\\" width=\\\"13\\\" height=\\\"17\\\" viewBox=\\\"0 0 13 17\\\" ><path d=\\\"M1.4115 14.7111C2.51389 16.1065 4.09009 17 6.6432 17C9.0635 17 10.6905 16.1058 11.7773 14.9128C12.5002 14.1038 13.3707 12.5067 12.833 10.4265C12.192 7.94953 11.1995 7.58 12.0298 4.38861C12.0298 4.38861 10.1291 4.93698 9.36357 6.84182C9.35947 6.85194 9.34553 6.84772 9.34717 6.83676C9.45454 6.18295 9.9373 2.00096 5.18599 0C5.18599 0 6.32032 2.2543 4.83355 3.82419C3.36316 5.38068 1.63209 7.20714 2.62874 10.0577C2.63612 10.0788 2.61071 10.0957 2.59596 10.0797C2.32384 9.81308 1.38539 8.56282 1.04279 6.44187C1.04197 6.44187 -1.53235 10.4609 1.41162 14.7112L1.4115 14.7111Z\\\" /></symbol>\"},\"island_cove\":{\"viewBox\":\"0 0 339 177\",\"width\":339,\"height\":177,\"symbol\":\"<symbol id=\\\"island_cove\\\" class=\\\"raw\\\" fill=\\\"none\\\" viewBox=\\\"0 0 339 177\\\"><g clip-path=\\\"url(#a)\\\"><path fill=\\\"#fff\\\" d=\\\"M76.5 13a16.3 16.3 0 0 0-15.4 17.2l3.4 63.6c0 .9.1 1.7.3 2.6l-63.6 72a4.7 4.7 0 0 0 .1 6.3 4.7 4.7 0 0 0 6.3.2L83.3 109l239.3-12.7A16.3 16.3 0 0 0 338 79l-3.4-63.6A16.3 16.3 0 0 0 317.4.1L76.5 13Z\\\"/><path fill=\\\"#44CEED\\\" d=\\\"M216 45.9a1.5 1.5 0 0 0-1-.4c-.4 0-.7.1-1 .4-.3.3-.4.7-.4 1l1 18.3c0 .4.1.7.4 1 .3.3.7.4 1 .4.4 0 .8-.1 1-.4.3-.3.4-.6.4-1l-1-18.3c0-.5-.1-.8-.4-1ZM231 58a9.8 9.8 0 0 0-3.2-.9 10 10 0 0 1-2.3-.5 2.3 2.3 0 0 1-1-.6 1.7 1.7 0 0 1-.4-.8c0-.6.3-1 .8-1.3a5.1 5.1 0 0 1 2-.5c.7 0 1.3 0 1.9.2.5.1 1 .4 1.4.8l1 .5c.4 0 .8 0 1-.3a.9.9 0 0 0 .4-.7c0-.3-.1-.6-.4-1a5.2 5.2 0 0 0-2.2-1.4 8.3 8.3 0 0 0-5.8.2 5 5 0 0 0-2 1.5 3 3 0 0 0-.7 2.3A3.3 3.3 0 0 0 223 58c.8.7 2.2 1.2 4 1.4 1.4.2 2.4.5 3 .9.5.4.8.8.8 1.4 0 .5-.2 1-.8 1.4-.5.3-1.3.6-2.3.6a5.6 5.6 0 0 1-2.3-.3 4.8 4.8 0 0 1-1.6-1 1.4 1.4 0 0 0-.9-.3c-.3 0-.7 0-1 .3-.3.3-.5.6-.5 1s.2.7.4.9a8 8 0 0 0 2.6 1.4c1 .3 2.3.4 3.5.4a7.3 7.3 0 0 0 3.2-.8c.8-.5 1.5-1 1.9-1.7.3-.7.6-1.5.5-2.2 0-.7-.2-1.3-.6-1.9-.3-.7-1-1.2-1.8-1.5Zm10.2 4.4h-.7c-.4 0-.7-.1-1-.6-.3-.4-.5-.9-.5-1.6l-.7-14.7a1 1 0 0 0-.5-1c-.2-.2-.6-.3-1-.3s-.7.2-1 .5c-.2.2-.2.6-.2 1l.7 14.7a9 9 0 0 0 .6 2.6c.4.7 1 1.3 1.6 1.7.6.4 1.3.5 2.2.5.6 0 1-.1 1.3-.4.4-.3.5-.7.5-1 0-.4-.1-.7-.4-1-.3-.3-.6-.4-.9-.4Zm15.8-9.3a7.1 7.1 0 0 0-6.7-3.3 7.3 7.3 0 0 0-3.8 1.2 7.2 7.2 0 0 0-3.3 6.7 8.5 8.5 0 0 0 1 3.7 7.5 7.5 0 0 0 2.7 2.6 7 7 0 0 0 3.6.8 6.7 6.7 0 0 0 3.4-1.2c.7-.5 1.2-1 1.7-1.6v1c0 .4.2.7.5 1 .3.2.6.3 1 .3a1 1 0 0 0 1-.5c.2-.3.3-.6.3-1l-.3-6a7.5 7.5 0 0 0-1.1-3.7Zm-3.6 8.4a4.9 4.9 0 0 1-4.9.2 4.9 4.9 0 0 1-1.8-1.7 5.8 5.8 0 0 1-.8-2.5 5 5 0 0 1 2-4.6c.8-.4 1.6-.7 2.5-.7a4.7 4.7 0 0 1 4.2 2.2 5.8 5.8 0 0 1 .3 5.2c-.3.8-.8 1.4-1.5 2Zm21.6-10c-.6-1-1.4-1.6-2.5-2.1-1-.5-2-.7-3.4-.6a7.2 7.2 0 0 0-3.1.9c-.6.3-1 .7-1.3 1v-.2c0-.4-.2-.8-.5-1-.2-.3-.6-.3-1-.3s-.7.1-1 .4c-.2.3-.3.6-.3 1l.6 12c0 .5.2.8.5 1 .3.3.6.4 1 .4s.7-.2 1-.5c.2-.3.3-.6.3-1L265 55c0-.7 0-1.3.5-1.8.3-.5.7-1 1.4-1.3a4.3 4.3 0 0 1 2-.6 4.3 4.3 0 0 1 2.2.4c.7.3 1.2.7 1.6 1.3.4.7.6 1.5.7 2.5l.4 6.7c0 .3.2.7.5 1 .3.2.6.3 1 .3a1 1 0 0 0 .9-.5c.2-.3.4-.6.4-1l-.4-6.6a8.7 8.7 0 0 0-1-3.7Zm19-9c0-.4 0-.8-.4-1-.2-.2-.6-.3-1-.3s-.7.2-1 .5c-.2.2-.3.6-.3 1l.4 7.2a6.8 6.8 0 0 0-2.4-1.7 7.7 7.7 0 0 0-3-.5 6.7 6.7 0 0 0-5.8 4 7.8 7.8 0 0 0-.7 3.8 7.9 7.9 0 0 0 1.2 3.8 8 8 0 0 0 2.7 2.5c1.2.6 2.5.9 4 .8a7.5 7.5 0 0 0 3.6-1.2 6.8 6.8 0 0 0 2.5-2.8c.6-1.2.8-2.5.8-3.9l-.5-12.2Zm-2.4 15.2a5 5 0 0 1-1.6 1.9 4.9 4.9 0 0 1-4.9.2c-.7-.4-1.4-1-1.8-1.8a5.8 5.8 0 0 1-.3-5.1 4.7 4.7 0 0 1 6.5-2.1c.7.4 1.3 1 1.7 1.7.5.8.7 1.6.8 2.5.2 1 0 1.8-.4 2.7Z\\\"/><path fill=\\\"#2B9DD9\\\" d=\\\"M129.9 65.4c.4 0 .7 0 1 .4.4.3.5.6.6 1 0 .5 0 .8-.4 1.2a15 15 0 0 1-9.5 4c-4.2.2-8-1-11.1-3.9a15.1 15.1 0 0 1-5.2-10.6c-.3-4.2 1-8 3.9-11a15.2 15.2 0 0 1 10.6-5.3 14.9 14.9 0 0 1 10 3l.5 1c0 .4-.1.8-.4 1.1a2 2 0 0 1-1.1.6c-.5 0-.8-.1-1.2-.4a11.8 11.8 0 0 0-7.7-2.2 12 12 0 0 0-8.5 4.1 11.8 11.8 0 0 0-3 8.9 12 12 0 0 0 4 8.5 11.8 11.8 0 0 0 9 3c2.8 0 5.3-1.2 7.4-3l1-.4Zm21.8-13.7a10.7 10.7 0 0 1 3.7 7.5c.2 2.9-.7 5.5-2.7 7.8a10.7 10.7 0 0 1-7.5 3.6 10.4 10.4 0 0 1-7.8-2.7c-2.2-2-3.4-4.5-3.6-7.4-.2-3 .7-5.6 2.7-7.8A10.7 10.7 0 0 1 144 49c3-.1 5.6.8 7.8 2.7Zm-7.5.4a8 8 0 0 0-5.4 2.6 7.5 7.5 0 0 0-1.9 5.5 8 8 0 0 0 2.5 5.4 7.8 7.8 0 0 0 11-.7 7.5 7.5 0 0 0 1.9-5.5 8 8 0 0 0-2.6-5.4 7.5 7.5 0 0 0-5.5-1.9Zm25.7 16.6c-.3.3-.6.5-1.1.5-.5 0-.9 0-1.2-.4a2.1 2.1 0 0 1-.3-.4l-9.6-18a1.5 1.5 0 0 1-.2-.7c0-.4.1-.8.4-1 .3-.4.6-.5 1-.6.5 0 .9 0 1.2.4.1 0 .3.2.3.4l8 15 6.2-15.8.3-.4a2 2 0 0 1 1-.5c.5 0 .8 0 1.1.4.4.3.5.6.6 1v.7l-7.5 19-.2.4Zm28-6.5c.4 0 .8.1 1 .4.4.3.6.6.6 1.1 0 .4 0 .8-.4 1.2a10.3 10.3 0 0 1-6.8 3 10.8 10.8 0 0 1-8.7-18 10.7 10.7 0 0 1 15.2-.9c2.2 2 3.3 4.5 3.6 7.4 0 .4-.1.8-.4 1.1a2 2 0 0 1-1 .6l-16.8 1a7.8 7.8 0 0 0 2.3 3.8 7.5 7.5 0 0 0 5.5 1.9 7.4 7.4 0 0 0 4.9-2.1c.4-.3.7-.5 1-.5Zm1.2-7.2a7.8 7.8 0 0 0-2.3-3.7 7.8 7.8 0 0 0-10.9.6 6.9 6.9 0 0 0-1.8 4l15-.9Z\\\"/></g><defs><clipPath id=\\\"a\\\"><path fill=\\\"#fff\\\" d=\\\"M0 0h338.2v176H0z\\\"/></clipPath></defs></symbol>\"},\"island_lake\":{\"viewBox\":\"0 0 278 197\",\"width\":278,\"height\":197,\"symbol\":\"<symbol id=\\\"island_lake\\\" class=\\\"raw\\\" fill=\\\"none\\\" viewBox=\\\"0 0 278 197\\\"><g clip-path=\\\"url(#a)\\\"><path fill=\\\"#fff\\\" d=\\\"M162.7 106.7 15.2 96.3C6.2 95.6-.6 87.8 0 78.8l4.5-63.6C5.2 6.2 13-.6 22 0l240.7 17c9 .7 15.8 8.4 15.2 17.5L273.4 98c-.7 9-8.4 15.7-17.5 15.2l-69.7-5 27 82.1c.8 2.3-.4 4.9-2.6 5.7-2.3 1-4.8 0-6-2.2l-41.9-87.2Z\\\"/><path fill=\\\"#2B9DD9\\\" d=\\\"M49.1 65.5c-.5 0-1-.2-1.4-.7-.3-.4-.4-.8-.4-1.4l1.6-25.8c0-.6.2-1 .7-1.4.4-.4.8-.6 1.4-.5.5 0 1 .3 1.4.7.3.4.5.9.4 1.5l-1.5 23.8 13.7.8c.6 0 1 .2 1.4.7.4.4.6.9.5 1.5 0 .5-.3 1-.7 1.4-.4.4-.9.5-1.5.4l-15.6-1Zm41.6-13.2c-.8-1.6-2-3-3.4-4a11 11 0 0 0-10.8-.7 10.4 10.4 0 0 0-5.7 8.9A10.7 10.7 0 0 0 75 66c1.4 1 3 1.5 4.9 1.7a8.8 8.8 0 0 0 7.5-3.1v1.5c0 .5 0 1 .4 1.4.4.4.9.7 1.4.7.5 0 1-.1 1.4-.5.4-.4.6-.9.7-1.4l.5-8.5c.1-2-.3-3.9-1-5.5ZM87 61.2a6.3 6.3 0 0 1-6.1 3c-1.3 0-2.4-.4-3.4-1a7 7 0 0 1-2.9-6.5 8 8 0 0 1 1-3.6c.8-1 1.6-1.9 2.7-2.4 1-.5 2.2-.8 3.6-.7 1.3 0 2.4.5 3.4 1.2s1.7 1.5 2.2 2.7c.5 1 .7 2.3.6 3.7a9.5 9.5 0 0 1-1.1 3.6ZM113.7 49c-.3-.4-.7-.6-1.2-.7-.4 0-.8 0-1.3.4l-9.8 7.6 1-15.5c0-.5 0-1-.5-1.4-.3-.4-.7-.6-1.3-.6-.5 0-1 0-1.4.5-.4.3-.5.7-.6 1.3l-1.6 26c0 .5 0 1 .4 1.4.3.4.8.5 1.3.6.5 0 1 0 1.4-.4.4-.3.6-.7.6-1.3l.4-5.8 2-1.5 6.6 9.4c.3.5.7.7 1.2.7s1 0 1.4-.3c.4-.3.7-.7.8-1.2 0-.4 0-.9-.4-1.4l-6.7-9.5 7.4-5.7c.3-.4.6-.7.7-1.2 0-.5-.1-1-.4-1.4Zm21.5 6a8.8 8.8 0 0 0-8-5.4c-2-.2-3.8.2-5.4 1-1.6.7-3 1.9-3.9 3.4-1 1.6-1.5 3.3-1.6 5.4a9.9 9.9 0 0 0 4.6 9.5 12 12 0 0 0 12.6-.1c.5-.3.7-.7.7-1.2s-.2-1-.6-1.3c-.3-.3-.7-.5-1.2-.5l-1.2.3c-.5.4-1.2.7-2 1-1 .2-1.7.3-2.5.2a7.1 7.1 0 0 1-6.9-6.4l14.4 1c.6 0 1-.2 1.3-.5.4-.3.6-.7.6-1.1 0-2-.2-3.8-.9-5.4Zm-12-1.6c1-.5 2.3-.8 3.8-.7a6 6 0 0 1 3.1 1c.9.7 1.5 1.6 2 2.6.3.7.4 1.6.5 2.4l-12.7-.7a9 9 0 0 1 .8-2c.6-1.2 1.5-2 2.5-2.6Z\\\"/><path fill=\\\"#44CEED\\\" d=\\\"M151.4 51c-.3 0-.7 0-1 .3-.3.3-.4.6-.4 1l-1.2 18.2c0 .4 0 .8.3 1 .3.4.6.5 1 .5s.8 0 1-.3c.3-.2.5-.5.5-1l1.2-18.2c0-.4-.1-.8-.4-1-.2-.3-.5-.5-1-.5Zm14.5 7.7a8 8 0 0 0-5.8-.5c-.9.3-1.6.7-2.2 1.3-.5.5-.9 1.3-.9 2.2 0 1.1.3 2 1 2.7a10 10 0 0 0 4 1.9c1.3.3 2.3.7 2.8 1.2.5.4.8.9.7 1.4 0 .6-.4 1-1 1.3-.5.3-1.3.4-2.3.3-.9 0-1.6-.2-2.3-.5l-1.4-1c-.2-.4-.5-.5-.8-.6-.3 0-.7 0-1 .3-.4.2-.6.5-.7.8 0 .4 0 .7.3 1 .5.7 1.4 1.2 2.4 1.7a10.4 10.4 0 0 0 6.7.4 4 4 0 0 0 2-1.5c.5-.6.8-1.4.9-2.2 0-.7-.1-1.4-.4-1.9a4 4 0 0 0-1.6-1.5c-.8-.5-1.8-.9-3.1-1.3-1-.2-1.7-.5-2.2-.8l-1-.7c-.1-.3-.2-.6-.1-1 0-.5.3-.9.8-1.1a5.4 5.4 0 0 1 3.9 0l1.4 1c.2.3.5.5 1 .6l1-.1.5-.8c0-.3 0-.6-.3-1a8.3 8.3 0 0 0-2.3-1.6Zm9.7 12.3h-.7c-.4 0-.7-.3-1-.8l-.2-1.7.9-14.7c0-.4 0-.7-.3-1-.2-.2-.5-.4-1-.5l-1 .3-.4 1-1 14.7c0 1 .2 1.9.5 2.6.3.8.7 1.4 1.3 1.9.6.4 1.2.7 2 .8h.1c.6 0 1-.1 1.3-.4.4-.2.6-.5.6-.9s0-.7-.3-1c-.1-.1-.4-.3-.8-.3ZM190 60.7c-1-.8-2.3-1.2-3.7-1.3-1.4 0-2.7.2-3.9.8a7.3 7.3 0 0 0-4 6.3 9 9 0 0 0 .6 3.8 7.3 7.3 0 0 0 2.3 2.9c1 .7 2.1 1 3.4 1.1a6.4 6.4 0 0 0 5.4-2.1v1c0 .4 0 .7.3 1 .2.2.5.4 1 .4.4 0 .7 0 1-.3.3-.2.4-.5.4-1l.4-6a7.2 7.2 0 0 0-3.2-6.6Zm-.2 9c-.5.8-1.1 1.4-1.8 1.8-.8.4-1.6.5-2.5.4-1 0-1.7-.3-2.4-.7a5 5 0 0 1-2-4.6c0-1 .2-1.8.7-2.5.5-.8 1-1.4 1.9-1.7a4.3 4.3 0 0 1 4.9.3c.6.4 1.2 1 1.5 1.9.4.8.6 1.6.5 2.6 0 1-.4 1.8-.8 2.6Zm18.6-8.1c-1-.6-2-1-3.3-1a6.6 6.6 0 0 0-4.7 1.5v-.3c0-.4 0-.8-.3-1-.2-.2-.5-.4-1-.4-.4 0-.8 0-1 .3-.2.2-.4.5-.5 1l-.7 12c0 .4 0 .8.3 1 .2.2.5.4 1 .5.4 0 .8-.1 1-.3.2-.3.4-.6.4-1l.5-7.7c0-.7.2-1.2.6-1.7.4-.4 1-.8 1.6-1.1.6-.3 1.3-.4 2-.3.9 0 1.6.2 2.2.6.6.3 1.1.8 1.5 1.5.3.7.4 1.6.4 2.6l-.4 6.6c0 .4 0 .8.3 1 .2.2.5.4 1 .5.4 0 .7-.1 1-.3.3-.3.5-.6.5-1l.4-6.7c0-1.4-.1-2.8-.7-3.8a5 5 0 0 0-2.1-2.5Zm21.9-5.3c-.2-.2-.5-.3-1-.4-.4 0-.8 0-1 .3-.2.2-.4.5-.5 1l-.4 7.2a6.5 6.5 0 0 0-2.2-1.9c-.8-.5-1.8-.8-3-.8-1.2-.1-2.5.1-3.6.7A7 7 0 0 0 216 65a8.4 8.4 0 0 0-.4 7.6 7.4 7.4 0 0 0 2.4 2.9 8 8 0 0 0 7.6.5c1.1-.6 2-1.4 2.8-2.5a7 7 0 0 0 1.2-3.8l.8-12.3c.2-.4.1-.8-.1-1ZM227 69.5c0 1-.3 1.8-.7 2.6-.5.8-1.1 1.3-1.9 1.7-.8.4-1.5.5-2.5.5-.9-.1-1.7-.4-2.4-.8a5 5 0 0 1-2-4.6c0-1 .3-1.8.7-2.5a5 5 0 0 1 1.9-1.7c.8-.4 1.6-.6 2.5-.6.9.1 1.7.3 2.3.9.7.5 1.3 1 1.7 1.8.4.9.5 1.7.4 2.7Z\\\"/></g><defs><clipPath id=\\\"a\\\"><path fill=\\\"#fff\\\" d=\\\"M0 0h277.9v196.5H0z\\\"/></clipPath></defs></symbol>\"},\"island_palm\":{\"viewBox\":\"0 0 281 188\",\"width\":281,\"height\":188,\"symbol\":\"<symbol id=\\\"island_palm\\\" class=\\\"raw\\\" fill=\\\"none\\\" viewBox=\\\"0 0 281 188\\\"><g clip-path=\\\"url(#a)\\\"><path fill=\\\"#fff\\\" d=\\\"m174 78.2-146.3-21C18.7 55.9 10.5 62 9.2 71l-9 63.1c-1.3 9 4.9 17.2 13.8 18.6l239 34.2c9 1.3 17.2-5 18.5-13.9l9-63c1.3-9-4.8-17.3-13.8-18.6l-69.2-10L261.2 7a4.7 4.7 0 0 0-7.6-5.2L174 78.2Z\\\"/><path fill=\\\"#2B9DD9\\\" d=\\\"M63.9 124.5c-.6 0-1-.3-1.3-.7-.3-.4-.4-.9-.4-1.4l3.4-24.7c0-.6.3-1 .7-1.3.4-.3.9-.5 1.4-.4l7.3 1c1.9.3 3.4.9 4.7 1.9 1.3 1 2.3 2.2 2.8 3.8.7 1.5.8 3.2.6 5a9.4 9.4 0 0 1-1.9 4.6 8.3 8.3 0 0 1-3.7 2.8 10 10 0 0 1-5 .5l-5.4-.7-1 8c-.1.5-.4 1-.8 1.3-.4.3-.9.4-1.4.3Zm3.7-13.1 5.4.7a6 6 0 0 0 3-.3c1-.4 1.7-1 2.3-1.7.6-.8 1-1.8 1.1-2.9.2-1.1.1-2.2-.3-3.1a5.5 5.5 0 0 0-4.5-3.6l-5.4-.7-1.6 11.6Zm24.3 17a9 9 0 0 1-4.6-1.9 9.9 9.9 0 0 1-3.3-9.4 10 10 0 0 1 11.4-8.8 9.9 9.9 0 0 1 8 6.2c.7 1.6 1 3.4.7 5.3l-1.5-.2a10 10 0 0 1-1.9 5 9 9 0 0 1-8.8 3.8Zm1.2-3.1c1.3.2 2.4 0 3.5-.4 1-.5 1.9-1.2 2.6-2.2.7-1 1.1-2 1.3-3.4.2-1.3 0-2.5-.4-3.6a6.2 6.2 0 0 0-5.1-4.1 6 6 0 0 0-3.5.5c-1 .4-2 1.1-2.6 2-.7 1-1.2 2.2-1.4 3.5a6.9 6.9 0 0 0 2.4 6.4c1 .7 2 1.1 3.2 1.3Zm7.8 4.3a2 2 0 0 1-1.3-.7 2 2 0 0 1-.4-1.5l.8-5.5 1.2-3.8 2.9 1.7-1.1 8.2c-.1.5-.3 1-.8 1.2-.3.3-.8.4-1.3.4Zm12.1 1.6c-1-.2-2-.6-2.7-1.3a5.9 5.9 0 0 1-1.6-2.6 8.5 8.5 0 0 1-.3-3.6l2.7-20c.1-.5.3-.9.7-1.2.4-.3.9-.4 1.4-.3.5 0 1 .3 1.3.7.3.3.4.8.3 1.3l-2.7 20c-.1.9 0 1.6.2 2.3.3.6.7 1 1.2 1l1 .1c.4.1.8.3 1 .7.3.4.4.9.3 1.4 0 .5-.4 1-.9 1.2a3 3 0 0 1-1.8.3Zm32.4 4.4a2 2 0 0 1-1.3-.7 2 2 0 0 1-.3-1.4l1.4-10.5c.2-1.5 0-2.7-.7-3.5a4 4 0 0 0-2.8-1.5c-1.2-.2-2.3 0-3.3.8s-1.5 1.9-1.6 3.2l-3-.4a7.3 7.3 0 0 1 4.7-6.4 8.7 8.7 0 0 1 8 1c1 .7 1.7 1.7 2 3 .5 1.2.7 2.7.4 4.3l-1.4 10.5c0 .5-.3 1-.7 1.3-.4.3-.8.4-1.4.3Zm-24.3-3.3a2 2 0 0 1-1.3-.7 2 2 0 0 1-.3-1.4l2.1-16.3c.1-.5.4-1 .7-1.2a2 2 0 0 1 1.5-.4c.5.1 1 .3 1.2.7.3.4.4.9.4 1.4l-2.2 16.3a2 2 0 0 1-.7 1.3c-.4.3-.9.4-1.4.3Zm12.1 1.6a2 2 0 0 1-1.2-.6 2 2 0 0 1-.4-1.5l1.5-10.4c.2-1.5 0-2.7-.7-3.6a4 4 0 0 0-2.8-1.5c-1.3-.2-2.4.1-3.3 1-1 .7-1.6 1.7-1.7 3l-2.3-.2a8 8 0 0 1 1.5-4 7.1 7.1 0 0 1 7-3c1.3.1 2.5.6 3.5 1.4 1 .7 1.7 1.7 2.1 3a9 9 0 0 1 .4 4.4l-1.4 10.4c-.1.6-.3 1-.7 1.3-.4.3-.9.4-1.5.3Z\\\"/><path fill=\\\"#44CEED\\\" d=\\\"M162.8 138a2 2 0 0 1-1-.6c-.2-.3-.3-.6-.2-1l2.4-17.6c0-.4.2-.7.5-1l1-.2 6.2.9c1.2.1 2.2.5 3 1a5.1 5.1 0 0 1 2.3 5.2 4 4 0 0 1-1 2.2c-.6.6-1.3 1-2.1 1.4 1 .4 2 1 2.5 2 .6.9.8 2 .6 3.3a6 6 0 0 1-4 5 8 8 0 0 1-3.5.2l-6.7-.9Zm1.6-2.4 5.4.7a5 5 0 0 0 2.2 0c.7-.3 1.2-.6 1.6-1.1.4-.5.7-1.1.8-2a3 3 0 0 0-.3-1.9c-.3-.5-.7-1-1.3-1.2a4 4 0 0 0-2-.7l-5.4-.8-1 7Zm1.3-9.4 4.9.6c1 .1 1.8 0 2.5-.4s1.1-1 1.3-2c0-1-.1-1.8-.7-2.4a3 3 0 0 0-2.3-1l-4.9-.7-.8 5.9Zm20.1 15a6.4 6.4 0 0 1-3.2-1.4 7 7 0 0 1-2.4-6.7c.1-1.4.6-2.6 1.4-3.6a7.1 7.1 0 0 1 6.7-2.7 7 7 0 0 1 5.7 4.4c.5 1.1.7 2.4.5 3.8l-1-.1a7.7 7.7 0 0 1-1.4 3.5c-.7 1-1.6 1.8-2.7 2.3-1.1.5-2.3.6-3.6.5Zm.9-2.3c.9.1 1.7 0 2.4-.3.8-.4 1.4-.9 1.9-1.5.5-.7.8-1.5 1-2.5 0-.9 0-1.7-.3-2.5a4.4 4.4 0 0 0-3.7-3c-.9 0-1.7 0-2.5.4-.7.3-1.3.8-1.9 1.5a5 5 0 0 0-.9 2.4 4.9 4.9 0 0 0 1.7 4.5 4 4 0 0 0 2.3 1Zm5.5 3c-.4 0-.7-.2-1-.5l-.2-1 .6-4 .9-2.6 2 1.2-.8 5.8c0 .4-.2.7-.5.9-.3.2-.6.3-1 .2Zm7 7.3-.6-.2c-.7-.5-.9-1-.4-1.8l10.3-16.8c.5-.7 1-.8 1.7-.4.8.4 1 1 .5 1.7l-10.4 16.8c-.3.5-.7.8-1.1.7Zm4-6.4h-1l-.6-.8-4.4-12.1a1 1 0 0 1 0-1c.2-.3.5-.5.9-.6l.9.1c.3.2.5.4.6.8l4.1 12c.2.4.2.7.1 1 0 .3-.3.5-.6.6Z\\\"/></g><defs><clipPath id=\\\"a\\\"><path fill=\\\"#fff\\\" d=\\\"M0 0h280.6v187.1H0z\\\"/></clipPath></defs></symbol>\"},\"island_wild\":{\"viewBox\":\"0 0 307 228\",\"width\":307,\"height\":228,\"symbol\":\"<symbol id=\\\"island_wild\\\" class=\\\"raw\\\" fill=\\\"none\\\" viewBox=\\\"0 0 307 228\\\"><g clip-path=\\\"url(#a)\\\"><path fill=\\\"#fff\\\" d=\\\"M33.7 45.7c-9 .4-16 8-15.6 17l3 63.7c.3 9 8 16 17 15.6l151.9-7 .8 1.4 71.5 86.8a4.6 4.6 0 0 0 7.5-5.5l-52.6-84 62-3c9-.3 16-8 15.5-17l-3-63.6c-.3-9-8-16-17-15.6l-241 11.2Z\\\"/><path fill=\\\"#2B9DD9\\\" d=\\\"M99 74c-1 0-1.8.4-2 1.3l-5.3 22.3L85 76.2c-.1-.4-.4-.7-.7-.9a2 2 0 0 0-2.4.2 2 2 0 0 0-.7 1l-4.7 21.8-7.2-21.5a2 2 0 0 0-.8-1 2 2 0 0 0-1.2-.4c-.7.1-1.2.3-1.5.8-.2.6-.2 1.2 0 2l8.9 25c.2.5.4.9.8 1.2.3.2.8.4 1.3.3.4 0 .8-.2 1.1-.5.4-.3.6-.7.7-1.2l4.8-22.2 6.7 21.7c.2.4.4.7.8 1 .3.3.8.4 1.2.4.5 0 1-.2 1.2-.5.4-.3.6-.7.7-1.2l6.5-25.8c.2-.7 0-1.3 0-1.8-.3-.5-.8-.8-1.5-.7Zm10 10.3c0-.5-.2-1-.5-1.4a2 2 0 0 0-1.5-.4 2 2 0 0 0-1.4.6 2 2 0 0 0-.5 1.4l.8 17a1.9 1.9 0 0 0 2 1.8c.6 0 1-.2 1.4-.5.4-.5.6-1 .5-1.5l-.8-17Zm-2-5.3c.7 0 1.3-.3 1.7-.7.5-.6.7-1.2.7-1.9s-.2-1.3-.8-1.7c-.5-.5-1-.7-1.8-.7-.7 0-1.3.2-1.7.8-.5.5-.7 1-.7 1.8 0 .7.3 1.3.8 1.7.5.6 1 .8 1.8.7Zm17.3 20.2a2 2 0 0 0-1.3-.4h-1c-.5 0-1-.3-1.4-.8-.4-.6-.6-1.4-.6-2.3l-1-20.8c0-.5-.2-1-.6-1.3-.3-.4-.9-.5-1.4-.5-.6 0-1 .2-1.3.6a2 2 0 0 0-.5 1.4l1 20.8a7.4 7.4 0 0 0 3 6c.9.6 2 .8 3 .8h.1c.8 0 1.4-.2 1.9-.6.4-.4.6-.8.6-1.4 0-.7-.2-1.1-.5-1.5ZM147 91l-.8-17.4c0-.5-.2-1-.6-1.4-.3-.3-.8-.5-1.4-.4a2 2 0 0 0-1.4.6c-.4.3-.5.8-.4 1.4l.4 10.3a8 8 0 0 0-3.3-2.4 8.8 8.8 0 0 0-4.2-.7c-1.9 0-3.5.6-4.9 1.6a9.5 9.5 0 0 0-3.3 4 11.8 11.8 0 0 0 .6 10.7 10.4 10.4 0 0 0 9.4 4.8c2-.1 3.8-.7 5.3-1.6 1.6-1 2.7-2.4 3.6-4 .7-1.7 1-3.5 1-5.5Zm-4.5 3.9a7 7 0 0 1-2.3 2.7 7 7 0 0 1-3.4 1c-1.3.1-2.5 0-3.5-.7a7.5 7.5 0 0 1-3.6-6.1c0-1.3.2-2.6.8-3.7a7 7 0 0 1 2.3-2.7c1-.7 2.1-1 3.4-1a6 6 0 0 1 3.5.7 6 6 0 0 1 2.4 2.4 7 7 0 0 1 1.1 3.6 7 7 0 0 1-.7 3.8Z\\\"/><path fill=\\\"#44CEED\\\" d=\\\"M166.6 80.9c0-.4-.2-.8-.5-1-.3-.3-.6-.4-1-.4-.5 0-.8.1-1 .5-.3.2-.5.5-.4 1l.8 18.3c0 .4.2.7.5 1 .3.3.7.4 1 .4.4 0 .8-.2 1-.5.3-.3.4-.7.4-1l-.8-18.3ZM183 93.6c-.4-.5-1-1-1.8-1.4l-3.2-1c-1 0-1.8-.2-2.3-.4-.5-.2-.9-.4-1-.7-.2-.2-.3-.5-.3-.9 0-.5.2-.9.8-1.2.5-.3 1.2-.4 2-.5a5 5 0 0 1 1.8.2c.6.1 1 .4 1.6.8.2.3.6.4 1 .5.4 0 .7 0 1-.3.3-.2.5-.5.5-.8 0-.3-.2-.6-.5-.9a5.7 5.7 0 0 0-2.3-1.5c-1-.3-2-.5-3.2-.4-1 0-1.8.2-2.6.6-.8.3-1.5.8-2 1.4-.5.7-.7 1.4-.7 2.3 0 1 .5 2 1.3 2.6.9.7 2.2 1.2 4 1.4a7 7 0 0 1 3 .9c.6.4.8.8.8 1.4 0 .5-.3 1-.8 1.3a4 4 0 0 1-2.3.7 5 5 0 0 1-2.3-.4 4 4 0 0 1-1.6-.9c-.2-.2-.5-.4-1-.4-.2 0-.6 0-1 .4-.2.3-.4.5-.5 1 0 .3.1.7.4 1a7 7 0 0 0 2.6 1.3c1 .3 2.2.4 3.5.4a6 6 0 0 0 3.1-.8 4 4 0 0 0 1.9-1.7 4 4 0 0 0 .5-2.2c.1-.7-.1-1.3-.4-1.8Zm9.2 3.4c-.2-.2-.5-.3-1-.3h-.6c-.4 0-.8-.1-1-.6a4 4 0 0 1-.5-1.6l-.7-14.7c0-.4 0-.7-.4-1-.2-.3-.5-.3-1-.4-.3 0-.6.2-1 .4-.2.3-.2.6-.3 1l.7 14.7c0 1 .3 1.9.7 2.6a5 5 0 0 0 1.5 1.7 3 3 0 0 0 2.1.5c.6 0 1-.1 1.4-.4.3-.3.5-.6.4-1 0-.3 0-.6-.3-.9Zm16.1-5.8a7.5 7.5 0 0 0-4-6.4 7.5 7.5 0 0 0-7.5.4c-1.2.7-2 1.6-2.6 2.8a6.8 6.8 0 0 0-.8 3.8 9 9 0 0 0 1 3.8 6.8 6.8 0 0 0 9.8 2.2 8 8 0 0 0 1.6-1.6v1c0 .5.1.8.4 1 .3.3.7.4 1 .3.4 0 .8 0 1-.4.3-.2.4-.6.4-1l-.3-5.9Zm-3.2 2.8c-.3.8-.9 1.4-1.5 1.9-.7.4-1.5.7-2.5.7-.8 0-1.7-.1-2.5-.6-.7-.4-1.3-1-1.8-1.7-.4-.7-.7-1.6-.7-2.6s0-1.8.5-2.6a4.6 4.6 0 0 1 4.1-2.6 4.7 4.7 0 0 1 4.3 2.2c.4.8.7 1.6.7 2.6s-.1 1.9-.6 2.7Zm21.1-4.2c0-1.5-.4-2.8-1-3.8-.7-1-1.4-1.7-2.5-2.2a6.8 6.8 0 0 0-7.8 1.4v-.3c0-.4-.2-.8-.4-1-.3-.3-.6-.3-1-.3-.5 0-.8.1-1 .4-.3.3-.4.6-.4 1l.6 12.1c0 .4.1.7.4 1 .3.3.6.3 1 .3s.7-.1 1-.4c.3-.3.3-.7.3-1l-.4-7.7c0-.6.1-1.2.5-1.8.3-.5.9-1 1.4-1.3a4.9 4.9 0 0 1 4.3-.2 3 3 0 0 1 1.6 1.4c.4.6.6 1.5.7 2.5l.3 6.7c0 .4.1.7.4 1 .3.3.7.3 1 .3a1.3 1.3 0 0 0 1.4-1.5l-.4-6.6Zm18.7-.3-.5-12.3c0-.4-.2-.7-.4-1-.3-.3-.6-.3-1.1-.3-.4 0-.7.1-1 .4-.3.3-.3.6-.3 1l.3 7.3a6.7 6.7 0 0 0-2.3-1.6 6.6 6.6 0 0 0-6.5.6 7.5 7.5 0 0 0-3 6.7 7 7 0 0 0 1.1 3.8c.7 1.1 1.7 2 2.8 2.6 1.2.6 2.5.8 3.9.7 1.4 0 2.6-.4 3.7-1.1 1.1-.7 2-1.7 2.5-2.9.6-1.2.9-2.5.8-3.9Zm-3.1 2.8a4.6 4.6 0 0 1-4 2.6c-1 0-1.7-.1-2.5-.6-.8-.4-1.4-1-1.8-1.7-.5-.8-.8-1.6-.8-2.6s.1-1.8.5-2.6a4.6 4.6 0 0 1 4.1-2.6 4.7 4.7 0 0 1 4.3 2.2c.5.8.7 1.6.8 2.6-.1 1-.3 1.8-.6 2.7Z\\\"/></g><defs><clipPath id=\\\"a\\\"><path fill=\\\"#fff\\\" d=\\\"m26 0 280 38.1-25.7 189L.3 189z\\\"/></clipPath></defs></symbol>\"},\"lock\":{\"viewBox\":\"0 0 14 18\",\"width\":14,\"height\":18,\"symbol\":\"<symbol id=\\\"lock\\\" width=\\\"14\\\" height=\\\"18\\\" viewBox=\\\"0 0 14 18\\\" ><path fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\" d=\\\"M11.6085 17.7125H2.39043C1.4166 17.7125 0.62793 16.9238 0.62793 15.95V10.2581C0.62793 9.40851 1.2291 8.69952 2.02833 8.53311V5.96319C2.02833 3.22218 4.25841 0.992188 6.99933 0.992188C9.74025 0.992188 11.9703 3.22227 11.9703 5.96319V8.53311C12.7696 8.70068 13.3707 9.40851 13.3707 10.2581V15.95C13.3707 16.9238 12.5824 17.7125 11.6085 17.7125ZM7.00077 3.57129C5.81871 3.57129 4.85742 4.73478 4.85742 6.16548V8.92843H9.14314V6.16548C9.14419 4.73478 8.18291 3.57129 7.00085 3.57129H7.00077ZM5.92871 12.5107C5.92871 11.7158 6.40847 11.0713 7.00013 11.0713H7.00015C7.59181 11.0713 8.07157 11.7158 8.07157 12.5107C8.07157 13.0427 7.85503 13.5078 7.53464 13.7565V15.357H6.46564V13.7565C6.14525 13.5078 5.92871 13.0438 5.92871 12.5107Z\\\" /></symbol>\"},\"logo-databeach\":{\"viewBox\":\"0 0 185.3 38.5\",\"width\":185.3,\"height\":38.5,\"symbol\":\"<symbol id=\\\"logo-databeach\\\" class=\\\"logo-image\\\" viewBox=\\\"0 0 2172 724\\\"><image href=\\\"./reference/assets/databeach-logo.png\\\" width=\\\"2172\\\" height=\\\"724\\\" preserveAspectRatio=\\\"xMidYMid meet\\\"></image></symbol>\"},\"logo-databeach-mark\":{\"viewBox\":\"0 0 403 63\",\"width\":403,\"height\":63,\"symbol\":\"<symbol id=\\\"logo-databeach-mark\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-databeach-small\":{\"viewBox\":\"0 0 249 64\",\"width\":249,\"height\":64,\"symbol\":\"<symbol id=\\\"logo-databeach-small\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-databeach-wordmark\":{\"viewBox\":\"0 0 407 124\",\"width\":407,\"height\":124,\"symbol\":\"<symbol id=\\\"logo-databeach-wordmark\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-aspiration\":{\"viewBox\":\"0 0 47.22 13.19\",\"width\":47.22,\"height\":13.19,\"symbol\":\"<symbol id=\\\"logo-partner-aspiration\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-cobble\":{\"viewBox\":\"0 0 45 17\",\"width\":45,\"height\":17,\"symbol\":\"<symbol id=\\\"logo-partner-cobble\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-bluevine\":{\"viewBox\":\"0 0 1383.72 319.5\",\"width\":1383.72,\"height\":319.5,\"symbol\":\"<symbol id=\\\"logo-partner-bluevine\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-trail\":{\"viewBox\":\"0 0 51 15\",\"width\":51,\"height\":15,\"symbol\":\"<symbol id=\\\"logo-partner-trail\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-island\":{\"viewBox\":\"0 0 260.8 38.5\",\"width\":260.8,\"height\":38.5,\"symbol\":\"<symbol id=\\\"logo-partner-island\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-greenwood\":{\"viewBox\":\"0 0 63 7\",\"width\":63,\"height\":7,\"symbol\":\"<symbol id=\\\"logo-partner-greenwood\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-kikoff\":{\"viewBox\":\"0 0 330 100\",\"width\":330,\"height\":100,\"symbol\":\"<symbol id=\\\"logo-partner-kikoff\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-lendingpoint\":{\"viewBox\":\"0 0 115 40\",\"width\":115,\"height\":40,\"symbol\":\"<symbol id=\\\"logo-partner-lendingpoint\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-one\":{\"viewBox\":\"0 0 1614.3 484.1\",\"width\":1614.3,\"height\":484.1,\"symbol\":\"<symbol id=\\\"logo-partner-one\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-pylon\":{\"viewBox\":\"0 0 66 19\",\"width\":66,\"height\":19,\"symbol\":\"<symbol id=\\\"logo-partner-pylon\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-possible\":{\"viewBox\":\"0 0 1705.8 334.8\",\"width\":1705.8,\"height\":334.8,\"symbol\":\"<symbol id=\\\"logo-partner-possible\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-prosper\":{\"viewBox\":\"0 0 238 39\",\"width\":238,\"height\":39,\"symbol\":\"<symbol id=\\\"logo-partner-prosper\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-tempkey\":{\"viewBox\":\"0 0 1705.8 263.6\",\"width\":1705.8,\"height\":263.6,\"symbol\":\"<symbol id=\\\"logo-partner-tempkey\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-till\":{\"viewBox\":\"0 0 34 25\",\"width\":34,\"height\":25,\"symbol\":\"<symbol id=\\\"logo-partner-till\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-x1\":{\"viewBox\":\"0 0 260.8 38.5\",\"width\":260.8,\"height\":38.5,\"symbol\":\"<symbol id=\\\"logo-partner-x1\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"logo-partner-salve\":{\"viewBox\":\"0 0 65.34 14\",\"width\":65.34,\"height\":14,\"symbol\":\"<symbol id=\\\"logo-partner-salve\\\" class=\\\"neutral-logo\\\" viewBox=\\\"0 0 1 1\\\"><rect width=\\\"1\\\" height=\\\"1\\\" fill=\\\"none\\\"/></symbol>\"},\"mobile\":{\"viewBox\":\"0 0 93 55\",\"width\":93,\"height\":55,\"symbol\":\"<symbol id=\\\"mobile\\\" class=\\\"raw\\\" width=\\\"93\\\" height=\\\"55\\\" viewBox=\\\"0 0 93 55\\\" fill=\\\"none\\\"><path d=\\\"M83.821 54.363h-73.8c-5.057 0-9.173-4.111-9.173-9.174V9.224C.848 4.167 4.964.051 10.02.051h73.806C88.884.05 93 4.167 93 9.224v35.965c-.005 5.063-4.122 9.174-9.178 9.174Zm-73.8-50.109a4.979 4.979 0 0 0-4.975 4.975v35.965a4.979 4.979 0 0 0 4.975 4.975h73.806a4.979 4.979 0 0 0 4.975-4.975V9.23a4.979 4.979 0 0 0-4.975-4.975H10.021Z\\\" fill=\\\"#fff\\\"/><path d=\\\"M14.672 34.064c-3.778 0-6.856-3.077-6.856-6.855 0-3.777 3.073-6.85 6.856-6.85 3.777 0 6.855 3.073 6.855 6.85 0 3.778-3.078 6.855-6.855 6.855Zm0-9.512a2.658 2.658 0 0 0-2.657 2.652 2.66 2.66 0 0 0 2.657 2.656 2.66 2.66 0 0 0 2.656-2.656 2.658 2.658 0 0 0-2.656-2.652ZM82.005 31.724a2.1 2.1 0 0 1-2.099-2.1v-11.2a2.1 2.1 0 0 1 4.199 0v11.2a2.1 2.1 0 0 1-2.1 2.1ZM82.005 38.105a2.1 2.1 0 0 1-2.099-2.099v-.672a2.1 2.1 0 0 1 4.199 0v.672a2.1 2.1 0 0 1-2.1 2.1Z\\\" fill=\\\"#fff\\\"/></symbol>\"},\"play\":{\"viewBox\":\"0 0 11 14\",\"width\":11,\"height\":14,\"symbol\":\"<symbol id=\\\"play\\\" width=\\\"11\\\" height=\\\"14\\\" viewBox=\\\"0 0 11 14\\\" ><path d=\\\"M0 12.312c.026 1.304 1.173 2.093 2.178 1.473l8.083-5.339c.44-.29.739-.824.739-1.449 0-.625-.299-1.159-.74-1.45L2.179.217C1.173-.403.026.377 0 1.68v10.63Z\\\" /></symbol>\"},\"question\":{\"viewBox\":\"0 0 10 14\",\"width\":10,\"height\":14,\"symbol\":\"<symbol id=\\\"question\\\" width=\\\"10\\\" height=\\\"14\\\" viewBox=\\\"0 0 10 14\\\" ><path d=\\\"M3.84434 8.95503H6.14834C6.16634 7.19103 9.40634 6.61503 9.40634 3.80703C9.40634 1.73703 7.64234 0.207031 5.15834 0.207031C2.49434 0.207031 0.982336 1.97103 0.694336 3.89703L2.85434 4.54503C3.14234 3.30303 3.93434 2.40303 5.14034 2.40303C6.25634 2.40303 6.94034 3.03303 6.94034 3.93303C6.94034 5.66103 3.86234 6.21903 3.84434 8.95503ZM4.99634 13.203C5.80634 13.203 6.45434 12.555 6.45434 11.727C6.45434 10.953 5.80634 10.323 4.99634 10.323C4.16834 10.323 3.52034 10.953 3.52034 11.727C3.52034 12.555 4.16834 13.203 4.99634 13.203Z\\\" /></symbol>\"},\"share\":{\"viewBox\":\"0 0 18 18\",\"width\":18,\"height\":18,\"symbol\":\"<symbol id=\\\"share\\\" width=\\\"18\\\" height=\\\"18\\\" viewBox=\\\"0 0 18 18\\\" ><path d=\\\"M12.938 9.488a.862.862 0 1 1 1.724 0v5.175a2.588 2.588 0 0 1-2.587 2.587H2.588A2.588 2.588 0 0 1 0 14.663V5.175a2.588 2.588 0 0 1 2.587-2.587h5.175a.862.862 0 1 1 0 1.725H2.588a.862.862 0 0 0-.863.862v9.488c0 .476.386.862.862.862h9.488a.862.862 0 0 0 .863-.862V9.488ZM15.525 1.725h-4.313a.862.862 0 1 1 0-1.725h5.175c.477 0 .863.386.863.862v5.175a.862.862 0 1 1-1.725 0V1.725Z\\\" /><path d=\\\"M7.51 10.96a.864.864 0 0 1-1.22-1.22L15.776.252a.864.864 0 0 1 1.22 1.22L7.51 10.96Z\\\" /></symbol>\"},\"sound-off\":{\"viewBox\":\"0 0 17 16\",\"width\":17,\"height\":16,\"symbol\":\"<symbol id=\\\"sound-off\\\" viewBox=\\\"0 0 17 16\\\" ><path d=\\\"M14.8 2c-.4-.4-1-.4-1.4 0L11 4.4l-2 2L5.4 10l-2 2-.6.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L14.8 3.4c.4-.4.4-1 0-1.4zM15.1 4.6 13.7 6c.9.7 1.3 1.6 1.3 2.5 0 .9-.5 1.9-1.6 2.7-.4.3-.5.9-.2 1.4.3.4.9.5 1.4.2 1.5-1.1 2.4-2.6 2.4-4.3 0-1.5-.7-2.9-1.9-3.9zM2 10V6h3c.2 0 .4-.1.6-.2L9 3.1V5l2-2V1c0-.4-.2-.7-.6-.9s-.7-.1-1 .1L4.6 4H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h1l.1-.1L4 10H2zM9 12.9l-1.3-1-1.4 1.4 3.1 2.4c.3.2.7.3 1.1.1s.5-.4.5-.8V8.7l-2 2v2.2z\\\"/></symbol>\"},\"sound-on\":{\"viewBox\":\"0 0 17 16\",\"width\":17,\"height\":16,\"symbol\":\"<symbol id=\\\"sound-on\\\" viewBox=\\\"0 0 17 16\\\" ><path d=\\\"M13.2 4.4c.3-.4.9-.5 1.4-.2C16.1 5.3 17 6.8 17 8.5c0 1.7-.9 3.2-2.4 4.3-.4.3-1.1.2-1.4-.2-.3-.4-.2-1.1.2-1.4 1.1-.8 1.6-1.8 1.6-2.7 0-.9-.5-1.9-1.6-2.7-.4-.3-.5-.9-.2-1.4zM10.4.1c.4.2.6.5.6.9v14c0 .4-.2.7-.6.9-.3.2-.8.1-1.1-.1L4.6 12H1c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h3.6L9.3.2c.4-.2.8-.3 1.1-.1zM9 3.1 5.6 5.8c-.2.1-.4.2-.6.2H2v4h3c.2 0 .4.1.6.2L9 12.9V3.1z\\\"/></symbol>\"},\"star\":{\"viewBox\":\"0 0 18 18\",\"width\":18,\"height\":18,\"symbol\":\"<symbol id=\\\"star\\\" width=\\\"18\\\" height=\\\"18\\\" viewBox=\\\"0 0 18 18\\\" ><path d=\\\"M8.22238 1.22637C8.52959 0.763342 9.20949 0.763343 9.51671 1.22637L12.0452 5.03727C12.1484 5.19281 12.3042 5.30597 12.484 5.35606L16.8897 6.58317C17.425 6.73226 17.6351 7.37889 17.2897 7.81414L14.4466 11.3965C14.3306 11.5427 14.2711 11.7258 14.279 11.9123L14.4734 16.4816C14.4971 17.0368 13.947 17.4364 13.4263 17.2424L9.14072 15.6455C8.96581 15.5804 8.77328 15.5804 8.59836 15.6455L4.31278 17.2424C3.79208 17.4364 3.24203 17.0368 3.26565 16.4816L3.46004 11.9123C3.46797 11.7258 3.40848 11.5427 3.29244 11.3965L0.44941 7.81414C0.103981 7.37888 0.314083 6.73226 0.849379 6.58317L5.25511 5.35606C5.43492 5.30597 5.59069 5.19281 5.69388 5.03727L8.22238 1.22637Z\\\" /></symbol>\"},\"tuto-key\":{\"viewBox\":\"0 0 31 30\",\"width\":31,\"height\":30,\"symbol\":\"<symbol id=\\\"tuto-key\\\" width=\\\"31\\\" height=\\\"30\\\" viewBox=\\\"0 0 31 30\\\" ><path d=\\\"M24.002 0h-17a6.485 6.485 0 0 0-6.5 6.5v17c0 3.602 2.898 6.5 6.5 6.5h17c3.602 0 6.5-2.898 6.5-6.5v-17c0-3.602-3-6.5-6.5-6.5Zm-2.7 14c-.5.5-1.3.5-1.898 0l-2.601-2.602v10.2c0 .699-.602 1.3-1.301 1.3-.7 0-1.3-.601-1.3-1.3v-10.2L11.6 14c-.5.5-1.301.5-1.899 0-.5-.5-.5-1.3 0-1.898L14.6 7.203c.5-.5 1.3-.5 1.898 0l4.898 4.899c.301.3.399.601.399.898-.094.399-.293.8-.492 1Z\\\" /></symbol>\"},\"tuto-touch\":{\"viewBox\":\"0 0 44 45\",\"width\":44,\"height\":45,\"symbol\":\"<symbol id=\\\"tuto-touch\\\" width=\\\"44\\\" height=\\\"45\\\" viewBox=\\\"0 0 44 45\\\" ><path d=\\\"M8.038 16.986c-3.62-.637-6.382-3.8-6.382-7.602 0-4.26 3.466-7.726 7.725-7.726 4.26 0 7.726 3.466 7.726 7.726a7.657 7.657 0 0 1-.8 3.4l.962 1.665a9.323 9.323 0 0 0 1.494-5.068A9.38 9.38 0 0 0 9.381 0 9.38 9.38 0 0 0 0 9.381c0 5.002 3.915 9.073 8.842 9.354l-.804-1.748Z\\\" /><path d=\\\"m32.71 16.164-.037.017c-.095.05-.179.11-.267.164l2.427 4.874a.898.898 0 0 1-1.606.8l-2.365-4.751a3.929 3.929 0 0 0-5.186-1.63l-.054.026a4.352 4.352 0 0 0-.405.242l3.59 6.912c.227.44.057.981-.383 1.21a.894.894 0 0 1-1.207-.384l-3.277-6.307a3.916 3.916 0 0 0-3.882-.229l-.006.002-.03.015a4.173 4.173 0 0 0-.701.468l4.33 7.786a.898.898 0 0 1-1.567.873l-9.73-17.114a2.75 2.75 0 0 0-3.7-1.199 2.753 2.753 0 0 0-1.196 3.702l9.284 20.27s-5.193-1.255-6.94-1.587c-.7-.132-1.58-.123-2.217.202a2.972 2.972 0 0 0-1.293 3.997c.377.733 1.05 1.155 1.744 1.477l14.613 7.392c3.738 2.058 8.575 2.216 12.906.043l.002-.002.095-.05c3.294-1.684 5.68-4.42 6.864-7.506 1.185-3.085 1.164-6.542-.37-9.604l-4.183-8.359-.002-.002-.013-.024a3.933 3.933 0 0 0-5.238-1.724Z\\\" /></symbol>\"}}");
let fl;
function gl(e = {}) {
  fl || function () {
    if (fl) return;
    fl = !0;
    let e = '<svg style="display: none;" aria-hidden="true" class="icons-spritesheet">';
    for (const n in ml) e += ml[n].symbol;
    e += "</svg>";
    const t = document.createElement("div");
    t.innerHTML = e, document.body.insertBefore(t.getElementsByTagName("svg")[0], document.body.firstChild);
    const s = document.createElement("style");
    s.innerHTML = ["svg.icons-spritesheet symbol:not(.raw) * {", "fill: inherit;", "stroke: inherit;", "}"].join("\n");
    const i = document.getElementsByTagName("style")[0];
    i ? i.parentNode.insertBefore(s, i) : document.head.appendChild(s);
  }();
  const t = {
      ...e
    },
    s = t.id,
    i = ml[s];
  if (!i) return;
  const n = t.className ? "className" : "class";
  return t[n] = ["icon", "icon-" + s, t[n] || ""].join(" ").trim(), null == t.viewBox && (t.viewBox = i.viewBox), !0 === t.width && (t.width = i.width), !0 === t.height && (t.height = i.height), delete t.id, Dn("svg", t, Dn("use", {
    href: "#" + s
  }));
}
const vl = {},
  bl = 4,
  yl = .001,
  _l = 1e-7,
  xl = 10,
  wl = 11,
  Sl = 1 / (wl - 1);
function Al(e, t) {
  return 1 - 3 * t + 3 * e;
}
function Ml(e, t) {
  return 3 * t - 6 * e;
}
function Cl(e) {
  return 3 * e;
}
function Pl(e, t, s) {
  return ((Al(t, s) * e + Ml(t, s)) * e + Cl(t)) * e;
}
function Tl(e, t, s) {
  return 3 * Al(t, s) * e * e + 2 * Ml(t, s) * e + Cl(t);
}
function El(e) {
  return e;
}
function Bl(e, t, s, i) {
  if (!(0 <= e && e <= 1 && 0 <= s && s <= 1)) throw new Error("bezier x values must be in [0, 1] range");
  if (e === t && s === i) return El;
  for (var n = new Float32Array(wl), a = 0; a < wl; ++a) n[a] = Pl(a * Sl, e, s);
  function r(t) {
    for (var i = 0, a = 1, r = wl - 1; a !== r && n[a] <= t; ++a) i += Sl;
    --a;
    var o = i + (t - n[a]) / (n[a + 1] - n[a]) * Sl,
      l = Tl(o, e, s);
    return l >= yl ? function (e, t, s, i) {
      for (var n = 0; n < bl; ++n) {
        var a = Tl(t, s, i);
        if (0 === a) return t;
        t -= (Pl(t, s, i) - e) / a;
      }
      return t;
    }(t, o, e, s) : 0 === l ? o : function (e, t, s, i, n) {
      var a,
        r,
        o = 0;
      do {
        (a = Pl(r = t + (s - t) / 2, i, n) - e) > 0 ? s = r : t = r;
      } while (Math.abs(a) > _l && ++o < xl);
      return r;
    }(t, i, i + Sl, e, s);
  }
  return function (e) {
    return 0 === e || 1 === e ? e : Pl(r(e), t, i);
  };
}
const Il = {
    linear: [.25, .25, .75, .75],
    inSine: [.47, 0, .745, .715],
    outSine: [.39, .575, .565, 1],
    inOutSine: [.445, .05, .55, .95],
    inQuad: [.55, .085, .68, .53],
    outQuad: [.25, .46, .45, .94],
    inOutQuad: [.455, .03, .515, .955],
    inCubic: [.55, .055, .675, .19],
    outCubic: [.215, .61, .355, 1],
    inOutCubic: [.645, .045, .355, 1],
    inQuart: [.895, .03, .685, .22],
    outQuart: [.165, .84, .44, 1],
    inOutQuart: [.77, 0, .175, 1],
    inQuint: [.755, .05, .855, .06],
    outQuint: [.23, 1, .32, 1],
    inOutQuint: [.86, 0, .07, 1],
    inExpo: [.95, .05, .795, .035],
    outExpo: [.19, 1, .22, 1],
    inOutExpo: [1, 0, 0, 1],
    inCirc: [.6, .04, .98, .335],
    outCirc: [.075, .82, .165, 1],
    inOutCirc: [.785, .135, .15, .86],
    outSwift: [.55, 0, .1, 1],
    snap2: [0, .975, 0, 1],
    bounce: [.18, .89, .34, 1.76],
    bounce2: [.865, -.005, 0, 1.47],
    bounce3: [.865, -.005, 0, 1.64],
    bounce4: [0, 1.49, .105, .94],
    hardBounce: [.07, 1.525, .36, .935],
    longKeyframe: [.49, .05, .32, 1.04],
    elastic: [0, .49, .205, 1]
  },
  kl = {},
  Dl = e => e;
function Ll(e, t, s, i) {
  if (null == e && (e = "linear"), Array.isArray(e)) if (4 == e.length) {
    const n = e;
    e = n[0], t = n[1], s = n[2], i = n[3];
  } else e = "linear";
  if ("string" == typeof e) {
    if ("linear" === e) return Dl;
    const n = Il[e];
    if (!n) return Dl;
    e = n[0], t = n[1], s = n[2], i = n[3];
  }
  const n = [e, t, s, i].join("_");
  return kl[n] ? kl[n] : kl[n] = Bl(e, t, s, i);
}
let Ol = 0;
const Rl = () => ++Ol,
  Nl = new Set(["opacity", "transform"]),
  Fl = new Set(["target", "ease", "duration", "delay", "willChange"]),
  Ul = new Map(),
  Hl = [],
  Gl = [],
  Vl = [];
let Wl = !1;
function jl() {
  let e, t;
  for (e = 0, t = Hl.length; e < t; e++) Hl[e]();
  for (e = 0, t = Gl.length; e < t; e++) Gl[e]();
  for (e = 0, t = Vl.length; e < t; e++) Vl[e]();
  Hl.length = 0, Gl.length = 0, Vl.length = 0, Wl = !1;
}
const ql = "function" == typeof window.queueMicrotask ? () => queueMicrotask(jl) : () => Promise.resolve().then(jl);
const Zl = function (e, t, s) {
  e && Hl.push(e), t && Gl.push(t), s && Vl.push(s), Wl || (Wl = !0, ql());
};
function Yl(e = {}) {
  let t = e.complete,
    s = e.start,
    i = e.target;
  e.selector && (i = i.querySelector(e.selector));
  const n = function (e) {
      return e || (e = "linear"), Il[e] && (e = Il[e]), Array.isArray(e) ? `cubic-bezier(${e.join(",")})` : e;
    }(e.ease || e.easing),
    a = !!e.instant,
    r = !!e.willChange,
    o = e.delay || 0,
    l = a ? "0ms" : e.duration || 1e3,
    c = e.fillMode || "forwards",
    h = e.direction || "normal",
    u = e.animation || e.name || "pop",
    d = l + o,
    p = [u, l + "ms", n, o > 0 ? o + "ms" : null, 1, h, c].filter(e => null !== e).join(" ");
  i.dataset.csstween || (i.dataset.csstween = Rl());
  const m = i.dataset.csstween;
  let f = null,
    g = new Promise(e => f = e);
  e.queue && e.queue.push(g);
  const v = {
    destroy: S,
    stop: S,
    finished: g
  };
  let b = null,
    y = !1;
  return Zl(function () {
    if (y) return;
    Ul.has(m) && Ul.get(m).destroy();
    Ul.set(m, v), i.style.animation = "";
  }, function () {
    if (y || !i) return;
    i.getBoundingClientRect();
  }, function () {
    if (y || !i) return;
    i.addEventListener("animationstart", x), i.addEventListener("webkitAnimationStart", x), i.addEventListener("animationend", w), i.addEventListener("webkitAnimationEnd", w), r && (i.style.willChange = "transform, opacity");
    i.style.animation = p, b = window.setTimeout(_, 1.1 * d + 200);
  }), v;
  function _() {
    y || (window.clearTimeout(b), f && f(), t && t(i), S());
  }
  function x(e) {
    s && s(i, e), s = null, i.removeEventListener("animationstart", x), i.removeEventListener("webkitAnimationStart", x);
  }
  function w() {
    i.style.willChange = "", _();
  }
  function S() {
    y || (window.clearTimeout(b), b = null, i.removeEventListener("animationend", w), i.removeEventListener("webkitAnimationEnd", w), i.removeEventListener("animationstart", x), i.removeEventListener("webkitAnimationStart", x), Ul.delete(m), i = null, g = null, t = null, s = null, f = null, y = !0);
  }
}
const Jl = function () {};
class Ql {
  constructor(e) {
    this.selfDestruct = void 0 === e.selfDestruct || e.selfDestruct, this.onStart = e.onStart || Jl, this.onProgress = e.onProgress || Jl, this.onComplete = e.onComplete || Jl, this.time = 0, this.progress = 0, this.delay = e.delay || 0, this.duration = e.duration || 1e3, this.initialDelay = this.delay, this.initialDuration = this.duration, this.target = e.target, this.property = e.property, this.method = e.method, this.from = this.to = this.delta = this.current = 0, this.setFromTo(e.from, e.to), e.bezier ? this.ease = e.bezier : this.ease = e.easing ? Array.isArray(e.easing) ? Ll(e.easing) : Ll(Il[e.easing]) : Ll(Il.inOutQuart), this.paused = !!e.paused, this.ended = !1, this.finished = new Promise(e => this.resolve = e);
  }
  setFromTo(e, t) {
    this.from = void 0 !== e ? e : this.target[this.property], this.to = void 0 !== t ? t : e, this.delta = this.to - this.from, this.current = this.from;
  }
  reset() {
    this.time = 0, this.progress = 0, this.delay = this.initialDelay, this.duration = this.initialDuration, this.ended = !1, this.finished = new Promise(e => this.resolve = e), this.play();
  }
  play() {
    this.paused = !1;
  }
  pause() {
    this.paused = !0;
  }
  update(e) {
    this.paused || this.ended || this.destroyed || (this.delay > 0 && (this.delay -= e, this.delay <= 0 ? (e = Math.abs(this.delay), this.onStart(this.progress, this.current, e)) : e = 0), this.time += e, this.progress = Math.max(0, Math.min(this.time / this.duration, 1)), 0 === this.progress ? this.current = this.from : 1 === this.progress ? this.current = this.to : this.current = this.from + this.delta * this.ease(this.progress), this.target && (this.property ? this.target[this.property] = this.current : this.method && this.target[this.method](this.current)), this.onProgress(this.progress, this.current, e), this.progress >= 1 && (this.paused = !0, this.ended = !0, this.resolve(), this.onComplete && this.onComplete(), this.selfDestruct && this.destroy()));
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.paused = !0, this.target = void 0, this.onStart = void 0, this.onComplete = void 0, this.onProgress = void 0, this.finished = void 0);
  }
}
function Kl(e) {
  return new Ql(e);
}
function ec(e) {
  void 0 === e && (e = {}), this.initial = e.initial || 0, this.value = this.initial, this.previous = this.initial, this.velocity = 0, this.onStart = e.onStart, this.onStop = e.onStop, this.precisionStop = e.precisionStop || 1e-4, this.perfectStop = !!e.perfectStop, this.setValue(this.initial), this.setTarget(this.initial), this.setMass(e.mass || 1), this.setTension(e.tension || .1), this.setFriction(e.friction || .2), this.setStep(e.step || 10);
}
function tc(e) {
  return new ec(e);
}
ec.prototype.setValue = function (e) {
  this.value = e, Math.abs(this.target - this.value) > this.precisionStop ? this.start() : this.stop();
}, ec.prototype.setTarget = function (e) {
  this.target = e, Math.abs(this.target - this.value) > this.precisionStop ? this.start() : this.stop();
}, ec.prototype.setTension = function (e) {
  this._K = e;
}, ec.prototype.setFriction = function (e) {
  this._D = e, this._dampingAdjuster = Math.pow(1 - this._D, this._stepAdjuster);
}, ec.prototype.setMass = function (e) {
  this.mass = e, this._inverseMass = 1 / this.mass;
}, ec.prototype.setStep = function (e) {
  this._step = e, this._stepAdjuster = this._step / 16.67, this.setFriction(this._D);
}, ec.prototype.start = function () {
  this.stopped = !1, this.onStart && this.onStart();
}, ec.prototype.stop = function () {
  this.stopped || (this.perfectStop && Math.abs(this.target - this.value) <= this.precisionStop && (this.value = this.target), this.acceleration = 0, this.velocity = 0, this._accumulator = 0, this._prevStepVel = 0, this._prevStepValue = this.value, this._adjusted = !1, this.stopped = !0, this.onStop && this.onStop());
}, ec.prototype.update = function (e) {
  if (!this.stopped) {
    for (this._accumulator += e, this.previous = this.value, this._adjusted && (this._adjusted = !1, this.velocity = this._prevStepVel, this.value = this._prevStepValue), e < this._step && (this._adjusted = !0, this._accumulator += this._step); this._accumulator >= this._step;) this.acceleration = -this._K * (this.value - this.target) * this._inverseMass, this._prevStepVel = this.velocity, this.velocity = (this.velocity + this.acceleration * this._stepAdjuster) * this._dampingAdjuster, this._prevStepValue = this.value, this.value = this.value + this.velocity * this._stepAdjuster, this._accumulator -= this._step;
    if (this._adjusted) {
      const e = this._accumulator / this._step;
      this.value = this.value * e + this._prevStepValue * (1 - e);
    }
    Math.abs(this.target - this.value) <= this.precisionStop && this.stop();
  }
}, ec.prototype.dispose = function () {
  this.stop(), this.onStart = null, this.onStop = null;
};
const sc = "undefined" == typeof window ? globalThis : window,
  ic = [],
  nc = [],
  ac = [];
let rc,
  oc,
  lc = null,
  cc = null,
  hc = !1,
  uc = !1;
function dc(e) {
  let t;
  if (null === cc && (cc = e), oc = e - cc, rc += oc, cc = e, lc = hc ? null : sc.requestAnimationFrame(dc), hc && (hc = !1), uc) {
    for (t = 0; t < ac.length; t++) ac[t](oc);
    for (t = 0; t < ic.length; t++) ic[t](oc);
    for (t = 0; t < nc.length; t++) nc[t](oc);
  } else for (t = 0; t < ic.length; t++) ic[t](oc);
}
function pc() {
  uc = !!(nc.length > 0 || ac.length > 0);
}
function mc(e, t, s) {
  return !(!t || !e) && !~e.indexOf(t) && ((s = !!s) ? e.unshift(t) : e.push(t), !0);
}
function fc(e, t) {
  if (!t) return !1;
  const s = e.indexOf(t);
  return !!~s && (e.splice(s, 1), !(0 !== e.length));
}
function gc(e) {
  hc = !1, lc || (cc = null, (e = !!e) ? dc(performance.now()) : lc = sc.requestAnimationFrame(dc));
}
function vc() {
  lc && (sc.cancelAnimationFrame(lc), lc = null);
}
const bc = {
  add: function (e, t) {
    mc(ic, e, t) && gc();
  },
  addAfter: function (e, t) {
    mc(nc, e, t) && pc();
  },
  addBefore: function (e, t) {
    mc(ac, e, t) && pc();
  },
  remove: function (e) {
    fc(ic, e) && vc();
  },
  removeAfter: function (e) {
    fc(nc, e) && pc();
  },
  removeBefore: function (e) {
    fc(ac, e) && pc();
  },
  start: gc,
  stop: vc,
  time: rc,
  dt: oc,
  requestOnce: function () {
    lc || (hc = !0, cc = null, lc = sc.requestAnimationFrame(dc));
  },
  dispose: function () {
    vc(), ic.length = 0, nc.length = 0, ac.length = 0, uc = !1, cc = null, rc = 0, oc = 0;
  }
};
class yc {
  constructor(e, t, s = {}) {
    const i = void 0 === s.autostart || s.autostart;
    this._standalone = void 0 === s.standalone || s.standalone, this._selfdestruct = void 0 === s.selfdestruct || s.selfdestruct, this._stopped = !0, this._remainder = 0, this._delay = 0 | e, this._remainingTime = e, this._callback = void 0 === t ? function () {} : t;
    const n = this,
      a = this.update,
      r = this.restart;
    this.update = function (e) {
      a.call(n, e);
    }, this.restart = function (e, t) {
      r.call(n, e, t);
    }, i && this.start(), 0 === this._delay && this.stop();
  }
  setCallback(e, t) {
    this._callback = void 0 === e ? function () {} : e, t && this.restart(t);
  }
  stop() {
    this._stopped = !0, this._standalone && bc.remove(this.update);
  }
  start() {
    this._stopped && this.restart();
  }
  restart(e, t) {
    void 0 === t && (t = !0), void 0 !== e && (this._delay = e), this._standalone && this._stopped && bc.add(this.update), this._stopped = !1, this._remainingTime = this._delay - this._remainder * +t;
  }
  update(e) {
    this._stopped || (this._remainingTime -= e, this._remainingTime <= 0 ? (this._stopped = !0, this._remainder = -this._remainingTime % this._delay, this._callback(this.restart), this._stopped && this._selfdestruct && this.dispose()) : this._remainder = 0);
  }
  dispose() {
    this._standalone && bc.add(this.update), this._callback = this.restart = null, this.stop(), this._remainder = 0, this._remainingTime = this._delay;
  }
}
function _c(e, t, s) {
  return new yc(e, t, s);
}
let xc,
  wc = new WeakMap(),
  Sc = new ResizeObserver(function (e) {
    for (let t = 0; t < e.length; t++) {
      const s = e[t],
        i = s.target,
        n = wc.get(i),
        a = s.contentRect.width,
        r = s.contentRect.height;
      n.w === a && n.h === r || (xc = n, xc.w = a, xc.h = r, n.items.forEach(Ac));
    }
  });
function Ac(e) {
  const t = e[1];
  t.w === xc.w && t.h === xc.h || (e[1].width = xc.w, e[1].height = xc.h, e[0] && e[0](e[1]));
}
const VueWebGLComponent = {
    __name: "WebGL",
    props: {
      useResizeObserver: {
        type: Boolean,
        default: !1
      }
    },
    setup(e, {
      expose: t
    }) {
      const s = e,
        i = _t(),
        n = wi("webgl", null);
      let a = _t();
      if (n && s.useResizeObserver) {
        let e = function () {
            n.viewport.useManualResize = !0, n.viewport.resize(s.width, s.height);
          },
          t = !1;
        const {
          size: s
        } = function (e = {}) {
          "function" == typeof e && (e = {
            cb: e
          });
          const t = e.cb,
            s = e.ref ?? _t(),
            i = nt({
              width: 0,
              height: 0
            }),
            n = [t, i];
          let a = null;
          return Rs(() => {
            s.value && (a = s.value, wc.has(a) ? (wc.get(a).items.add(n), xc = n, Ac(n)) : (wc.set(a, {
              items: new Set([n]),
              w: 0,
              h: 0
            }), Sc.observe(a)));
          }), Fs(() => {
            if (!a) return;
            const e = wc.get(a);
            e.items.delete(n), e.items.size || (wc.delete(a), Sc.unobserve(a));
          }), {
            ref: s,
            size: i
          };
        }({
          ref: i,
          cb: () => {
            if (!n.viewport) return t = !0;
            e();
          }
        });
        n.onReady(async () => {
          t && (await Ft(), e());
        });
      }
      return Rs(() => {
        n.canvas && (a.value = n.getElement(), a.value.classList.add("webgl-canvas"), i.value.appendChild(a.value));
      }), Us(() => {
        a.value && a.value.parentNode === i.value && i.value.removeChild(a.value), a.value = null;
      }), t({
        wrapper: i,
        canvas: a
      }), (e, t) => t[0] || (Yi(-1), t[0] = rn("aside", {
        ref_key: "wrapper",
        ref: i,
        class: "webgl-wrapper"
      }, null, 512), Yi(1), t[0]);
    }
  },
  Cc = function (e, t, s) {
    if (!t || 0 === t.length) return e();
    const i = document.getElementsByTagName("link");
    return Promise.all(t.map(e => {
      if ((e = function (e) {
        return "/" + e;
      }(e)) in vl) return;
      vl[e] = !0;
      const t = e.endsWith(".css"),
        n = t ? '[rel="stylesheet"]' : "";
      if (!!s) for (let s = i.length - 1; s >= 0; s--) {
        const n = i[s];
        if (n.href === e && (!t || "stylesheet" === n.rel)) return;
      } else if (document.querySelector(`link[href="${e}"]${n}`)) return;
      const a = document.createElement("link");
      return a.rel = t ? "stylesheet" : "modulepreload", t || (a.as = "script", a.crossOrigin = ""), a.href = e, document.head.appendChild(a), t ? new Promise((t, s) => {
        a.addEventListener("load", t), a.addEventListener("error", () => s(new Error(`Unable to preload CSS for ${e}`)));
      }) : void 0;
    })).then(() => e());
  }(() => import("./webgl.3250e36a65453426.js?v=studio-apply-1788546512831"), []);
const Uc = "./reference/assets/Asset_Algae.e4fb453265453426.glb",
  Hc = "./reference/assets/Asset_AlgaeGroup.df25307b65453426.glb",
  Gc = "./reference/assets/Asset_ArrowSign.6f0ccda865453426.glb",
  Vc = "./reference/assets/Asset_TechCompany03HouseOff.a23f6b6965453426.glb",
  Wc = "./reference/assets/Asset_TechCompany03HouseOn.95ee562765453426.glb",
  jc = "./reference/assets/Asset_BarChair.8a665ed665453426.glb",
  qc = "./reference/assets/Asset_BarChairBlue.b85fde8765453426.glb",
  Zc = "./reference/assets/Asset_BarTableA.f1e27de665453426.glb",
  $c = "./reference/assets/Asset_BarTableABlue.11374dd365453426.glb",
  Xc = "./reference/assets/Asset_BarTableB.f42a525565453426.glb",
  Yc = "./reference/assets/Asset_BarTableBBlue.d61f083965453426.glb",
  Jc = "./reference/assets/Asset_Barrel.2a299a6465453426.glb",
  Qc = "./reference/assets/Asset_BasementLittle.8f23833165453426.glb",
  Kc = "./reference/assets/Asset_BasementMedium.bdde813465453426.glb",
  eh = "./reference/assets/Asset_BeachBall.f2c6e9e765453426.glb",
  th = "./reference/assets/Asset_BeachBar.23745a6b65453426.glb",
  sh = "./reference/assets/Asset_BeachBench.d01b2e3b65453426.glb",
  ih = "./reference/assets/Asset_BeachChair.728122b565453426.glb",
  nh = "./reference/assets/Asset_BeachTable.7200ff7265453426.glb",
  ah = "./reference/assets/Asset_BeachTowel.92bfe05e65453426.glb",
  rh = "./reference/assets/Asset_BeachUmbrella.ebc2bd3065453426.glb",
  oh = "./reference/assets/Asset_BeachUmbrellaB.afc6862b65453426.glb",
  lh = "./reference/assets/Asset_BigBushA.92d5fe8765453426.glb",
  ch = "./reference/assets/Asset_BigBushB.1fe4bc2965453426.glb",
  hh = "./reference/assets/Asset_BigBushTropical.e04fbb4f65453426.glb",
  uh = "./reference/assets/Asset_BikeA.3c036eac65453426.glb",
  dh = "./reference/assets/Asset_BikeB.a7114d8765453426.glb",
  ph = "./reference/assets/Asset_BikeElectric.6eb5d92765453426.glb",
  mh = "./reference/assets/Asset_BikeObstacleA.f590f1b765453426.glb",
  fh = "./reference/assets/Asset_BikeObstacleB.cad69e6765453426.glb",
  gh = "./reference/assets/Asset_BikeObstacleC.fd2242b365453426.glb",
  vh = "./reference/assets/Asset_BikeRaceBorder.e1bac81b65453426.glb",
  bh = "./reference/assets/Asset_BikeRaceBuilding.07d3cfcb65453426.glb",
  yh = "./reference/assets/Asset_BikeRaceFinishline.3a4482bd65453426.glb",
  _h = "./reference/assets/Asset_BikeRaceFlag.0db0314065453426.glb",
  xh = "./reference/assets/Asset_BikeRaceTrack.8f151a2d65453426.glb",
  wh = "./reference/assets/Asset_BikeRaceTurn.d1a52d5865453426.glb",
  Sh = "./reference/assets/Asset_Billboard.90d9c9d865453426.glb",
  Ah = "./reference/assets/Asset_TechCompany04Ribbon.791103fa65453426.glb",
  Mh = "./reference/assets/Asset_TechCompany04RibbonOff.40d949e265453426.glb",
  Ch = "./reference/assets/Asset_TechCompany04RibbonOn.b1edb5b565453426.glb",
  Ph = "./reference/assets/Asset_Boat.b9447a8a65453426.glb",
  Th = "./reference/assets/Asset_BoatA.7f88b4a765453426.glb",
  Eh = "./reference/assets/Asset_BoatB.a72bf2bb65453426.glb",
  Bh = "./reference/assets/Asset_BoatRaceBuilding.af2642d865453426.glb",
  Ih = "./reference/assets/Asset_BoatYellow.9ec7874765453426.glb",
  kh = "./reference/assets/Asset_Book.fed5827865453426.glb",
  Dh = "./reference/assets/Asset_BorderRace.cc8760cc65453426.glb",
  Lh = "./reference/assets/Asset_BoxCar.f05d47e365453426.glb",
  Oh = "./reference/assets/Asset_BridgeLog.2a6f9fb565453426.glb",
  Rh = "./reference/assets/Asset_BridgeOff.2e5df07e65453426.glb",
  zh = "./reference/assets/Asset_BridgeOn.44bdae5565453426.glb",
  Nh = "./reference/assets/Asset_BridgeWoodCurvedA.82455f6365453426.glb",
  Fh = "./reference/assets/Asset_BridgeWoodCurvedB.865fc8d265453426.glb",
  Uh = "./reference/assets/Asset_BridgeWoodFlat.c6cab67565453426.glb",
  Hh = "./reference/assets/Asset_BuildingA.bca09fc165453426.glb",
  Gh = "./reference/assets/Asset_BuildingB.5c67770865453426.glb",
  Vh = "./reference/assets/Asset_BuildingC.5057e97c65453426.glb",
  Wh = "./reference/assets/Asset_BuildingD.9f9b006f65453426.glb",
  jh = "./reference/assets/Asset_BuildingE.33d2abc065453426.glb",
  qh = "./reference/assets/Asset_BuildingF.33b0810365453426.glb",
  Zh = "./reference/assets/Asset_BuildingFOff.f304540765453426.glb",
  $h = "./reference/assets/Asset_BuildingG.1699a16265453426.glb",
  Xh = "./reference/assets/Asset_Bus.6857a4d165453426.glb",
  Yh = "./reference/assets/Asset_BushA.4e15289965453426.glb",
  Jh = "./reference/assets/Asset_BushB.c245698265453426.glb",
  Qh = "./reference/assets/Asset_BushC.3609906c65453426.glb",
  Kh = "./reference/assets/Asset_BushD.fcac8d9065453426.glb",
  eu = "./reference/assets/Asset_BushHibiscus.44604aa565453426.glb",
  tu = "./reference/assets/Asset_BushTropical.02be619065453426.glb",
  su = "./reference/assets/Asset_CarA.e947f10165453426.glb",
  iu = "./reference/assets/Asset_CarNeutral.56f1093365453426.glb",
  nu = "./reference/assets/Asset_CarRaceBuidling.8e99ae5d65453426.glb",
  au = "./reference/assets/Asset_CarRaceFromShop.83526f0965453426.glb",
  ru = "./reference/assets/Asset_CarRacePodium.c82c319e65453426.glb",
  ou = "./reference/assets/Asset_CarRaceTrack.88df47dc65453426.glb",
  lu = "./reference/assets/Asset_CarRaceWheelA.9d29152565453426.glb",
  cu = "./reference/assets/Asset_CarRaceWheelB.5631286d65453426.glb",
  hu = "./reference/assets/Asset_Chest.a4304b7865453426.glb",
  uu = "./reference/assets/Asset_ChestBig.11b2181365453426.glb",
  du = "./reference/assets/Asset_ChestBigOn.c51cf8ae65453426.glb",
  pu = "./reference/assets/Asset_ChestOn.e0346bd765453426.glb",
  mu = "./reference/assets/Asset_Circuit.9349f0fd65453426.glb",
  fu = "./reference/assets/Asset_CircuitRace.1fada1f365453426.glb",
  gu = "./reference/assets/Asset_CloudA.d00ce6fc65453426.glb",
  vu = "./reference/assets/Asset_CloudB.4dd5630b65453426.glb",
  yu = "./reference/assets/Asset_CoffeeShop.50adf97d65453426.glb",
  _u = "./reference/assets/Asset_CoffeeShopOff.311ccb4f65453426.glb",
  xu = "./reference/assets/Asset_CoffeeShopOn.efdeb73665453426.glb",
  wu = "./reference/assets/Asset_ConcretPillar.71997d2d65453426.glb",
  Su = "./reference/assets/Asset_Concrete.67f82d9065453426.glb",
  Au = "./reference/assets/Asset_CoralA.d75d73e365453426.glb",
  Mu = "./reference/assets/Asset_CoralB.db09d71b65453426.glb",
  Cu = "./reference/assets/Asset_Crate.db3a5a1c65453426.glb",
  Pu = "./reference/assets/Asset_Crossing.3d97ea0e65453426.glb",
  Tu = "./reference/assets/Asset_Cup.24f983b565453426.glb",
  Eu = "./reference/assets/Asset_DirectionBanner.ff11cc8665453426.glb",
  Bu = "./reference/assets/Asset_Fence.517355d165453426.glb",
  Iu = "./reference/assets/Asset_FishingShip.52fb2b8765453426.glb",
  ku = "./reference/assets/Asset_Flag.8a35aa1f65453426.glb",
  Du = "./reference/assets/Asset_FlagOff.cf1f58ea65453426.glb",
  Lu = "./reference/assets/Asset_FlagOn.e70fc10565453426.glb",
  Ou = "./reference/assets/Asset_Floater.6ee08e9565453426.glb",
  Ru = "./reference/assets/Asset_FloatingWood.caaad32b65453426.glb",
  zu = "./reference/assets/Asset_FlowerA.bde5b43c65453426.glb",
  Nu = "./reference/assets/Asset_FlowerB.491f82e765453426.glb",
  Fu = "./reference/assets/Asset_FountainZen.0b57cad565453426.glb",
  Uu = "./reference/assets/Asset_GroundRound.4d5ca59e65453426.glb",
  Hu = "./reference/assets/Asset_GrowableTreeLarge.abc3c7b965453426.glb",
  Gu = "./reference/assets/Asset_GrowableTreeSmall.7ef7cafc65453426.glb",
  Vu = "./reference/assets/Asset_GuirlandeA.da39bf6f65453426.glb",
  Wu = "./reference/assets/Asset_GuirlandeB.2bc2d99f65453426.glb",
  ju = "./reference/assets/Asset_GuirlandeC.e70b580165453426.glb",
  qu = "./reference/assets/Asset_GuirlandeD.bff09cf765453426.glb",
  Zu = "./reference/assets/Asset_Hammock.5685c50a65453426.glb",
  $u = "./reference/assets/Asset_Hospital.d710139365453426.glb",
  Xu = "./reference/assets/Asset_HouseA.bd2c668c65453426.glb",
  Yu = "./reference/assets/Asset_HouseB.b42a685d65453426.glb",
  Ju = "./reference/assets/Asset_HouseBlackA.7adaf9fc65453426.glb",
  Qu = "./reference/assets/Asset_HouseBlackB.2764bcba65453426.glb",
  Ku = "./reference/assets/Asset_HouseBlackF.8d95fc6365453426.glb",
  ed = "./reference/assets/Asset_HouseC.1872b2a465453426.glb",
  td = "./reference/assets/Asset_HouseCabinA.9f46ad8065453426.glb",
  sd = "./reference/assets/Asset_HouseCabinB.dfbba3c665453426.glb",
  id = "./reference/assets/Asset_HouseCabinC.ba254a2265453426.glb",
  nd = "./reference/assets/Asset_HouseD.5893465265453426.glb",
  ad = "./reference/assets/Asset_HouseE.a7de3fb765453426.glb",
  rd = "./reference/assets/Asset_HouseF.17e0bb7e65453426.glb",
  od = "./reference/assets/Asset_HouseG.905b2d2065453426.glb",
  ld = "./reference/assets/Asset_InflateableA.592961e465453426.glb",
  cd = "./reference/assets/Asset_InflateableB.a9574e2c65453426.glb",
  hd = "./reference/assets/Asset_InitRace.483146c765453426.glb",
  ud = "./reference/assets/Asset_Jetski.dbd32c7865453426.glb",
  dd = "./reference/assets/Asset_JetskiBuilding.0652bc9465453426.glb",
  pd = "./reference/assets/Asset_JoystickRaw.da301e9265453426.glb",
  md = "./reference/assets/Asset_Jump.7c5646e665453426.glb",
  fd = "./reference/assets/Asset_Lampost.99332f3a65453426.glb",
  gd = "./reference/assets/Asset_LightTraffic.6eb684d065453426.glb",
  bd = "./reference/assets/Asset_MMBalloon.2049a7a465453426.glb",
  yd = "./reference/assets/Asset_Mailbox.1ea97a0865453426.glb",
  _d = "./reference/assets/Asset_Muscu.f596921265453426.glb",
  xd = "./reference/assets/Asset_Mushrooms.4e8600bf65453426.glb",
  wd = "./reference/assets/Asset_NPCPlaceholder.6db4908365453426.glb",
  Sd = "./reference/assets/Asset_Nenuphar.88b52f3565453426.glb",
  Ad = "./reference/assets/Asset_NewHouseA.3c225b9865453426.glb",
  Md = "./reference/assets/Asset_NewHouseB.4f0fc38465453426.glb",
  Cd = "./reference/assets/Asset_NewHouseC.aa953daf65453426.glb",
  Pd = "./reference/assets/Asset_NewHouseD.2aa1e60265453426.glb",
  Td = "./reference/assets/glorb-palm.glb",
  Ed = "./reference/assets/Asset_PalmTreeBlue.445dad1765453426.glb",
  Bd = "./reference/assets/Asset_PalmTreePink.f6bae71965453426.glb",
  Id = "./reference/assets/Asset_PalmTreeStreet.b37f63b265453426.glb",
  kd = "./reference/assets/Asset_PalmTreeTallA.e36ef4cc65453426.glb",
  Dd = "./reference/assets/Asset_PalmTreeTallB.10e7ed9365453426.glb",
  Ld = "./reference/assets/Asset_PalmTreeThick.eed363b265453426.glb",
  Od = "./reference/assets/Asset_PannelA.e5cf8f2965453426.glb",
  Rd = "./reference/assets/Asset_PannelB.40e4000465453426.glb",
  zd = "./reference/assets/Asset_Pavement.9704067965453426.glb",
  Nd = "./reference/assets/Asset_PicnicTable.69fd89e065453426.glb",
  Fd = "./reference/assets/Asset_Pillar.64de356165453426.glb",
  Ud = "./reference/assets/Asset_PitStop.b968aead65453426.glb",
  Hd = "./reference/assets/Asset_Pontoon.8c183c5065453426.glb",
  Gd = "./reference/assets/Asset_PontoonLittle.ed549bc665453426.glb",
  Vd = "./reference/assets/Asset_PortFlag.3b85df9265453426.glb",
  Wd = "./reference/assets/Asset_PoteauA.87cb447665453426.glb",
  jd = "./reference/assets/Asset_PoteauB.46129ca565453426.glb",
  qd = "./reference/assets/Asset_PoteauLink.790ff9e565453426.glb",
  Zd = "./reference/assets/Asset_PottedPlantA.1abcfc4265453426.glb",
  $d = "./reference/assets/Asset_PottedPlantB.c9e9513f65453426.glb",
  Xd = "./reference/assets/Asset_RaceBanner.ae292b0465453426.glb",
  Yd = "./reference/assets/Asset_RaceBikeRaw.4ccb820165453426.glb",
  Jd = "./reference/assets/Asset_RaceBoat.277c6ff065453426.glb",
  Qd = "./reference/assets/Asset_RaceBoatRaw.69c765fb65453426.glb",
  Kd = "./reference/assets/Asset_RaceCar.1afef0c465453426.glb",
  ep = "./reference/assets/Asset_RaceCarRaw.0319c9d965453426.glb",
  tp = "./reference/assets/Asset_RampA.8ef61fde65453426.glb",
  sp = "./reference/assets/Asset_RampB.485f194c65453426.glb",
  ip = "./reference/assets/Asset_RampC.c19a31d765453426.glb",
  np = "./reference/assets/Asset_RampD.a170632265453426.glb",
  ap = "./reference/assets/Asset_ResortBuilding.8f22cd1a65453426.glb",
  rp = "./reference/assets/Asset_ResortCascade.5ff33c9865453426.glb",
  op = "./reference/assets/Asset_ResortContainer.a86abc3565453426.glb",
  lp = "./reference/assets/Asset_ResortDoorBase.0c2f763e65453426.glb",
  cp = "./reference/assets/Asset_ResortDoorClosed.cb72053c65453426.glb",
  hp = "./reference/assets/Asset_ResortDoorOpen.cf1cd49c65453426.glb",
  up = "./reference/assets/Asset_ResortFountain.89e9ea1965453426.glb",
  dp = "./reference/assets/Asset_ResortHotel.a6def2a365453426.glb",
  pp = "./reference/assets/Asset_ResortOff.193a421565453426.glb",
  mp = "./reference/assets/Asset_ResortOn.f8ebd90665453426.glb",
  fp = "./reference/assets/Asset_Roadblock.43dca8f465453426.glb",
  gp = "./reference/assets/glorb-rock.glb",
  vp = "./reference/assets/Asset_RoundCar.50d1e2a165453426.glb",
  bp = "./reference/assets/Asset_Roundabout.6edf956f65453426.glb",
  yp = "./reference/assets/Asset_SandCastle.73ac24cf65453426.glb",
  _p = "./reference/assets/Asset_SeaShells.5e6a2d2c65453426.glb",
  xp = "./reference/assets/Asset_SeaStar.7af71b8865453426.glb",
  wp = "./reference/assets/Asset_ShipA.7be9263f65453426.glb",
  Sp = "./reference/assets/Asset_ShipAVerB.002ae3ca65453426.glb",
  Ap = "./reference/assets/Asset_ShipB.e35fa5c765453426.glb",
  Mp = "./reference/assets/Asset_ShipC.1766a31165453426.glb",
  Cp = "./reference/assets/Asset_ShipOnWheels.9e048d2965453426.glb",
  Pp = "./reference/assets/Asset_ShopClothes.217f21ca65453426.glb",
  Tp = "./reference/assets/Asset_ShopCroissant.9c5dc1e065453426.glb",
  Ep = "./reference/assets/Asset_ShopForSaleBase.56a38d5565453426.glb",
  Bp = "./reference/assets/Asset_ShopForSaleDetails.1e3bda1365453426.glb",
  Ip = "./reference/assets/Asset_ShopGlasses.8d01904c65453426.glb",
  kp = "./reference/assets/Asset_ShopKite.6ed2da4965453426.glb",
  Dp = "./reference/assets/Asset_ShopRamen.56282a3f65453426.glb",
  Lp = "./reference/assets/Asset_SkateRampC.0369a7c165453426.glb",
  Op = "./reference/assets/Asset_Skateboard.d5616a6e65453426.glb",
  Rp = "./reference/assets/Asset_SkateparkBowl.52fd2bf865453426.glb",
  zp = "./reference/assets/Asset_SkateparkOvergrowth.5dbe6ce065453426.glb",
  Np = "./reference/assets/Asset_Slide.bbc545ff65453426.glb",
  Fp = "./reference/assets/Asset_Slope.8252b74565453426.glb",
  Up = "./reference/assets/Asset_SolidGroundLarge.5b8261ae65453426.glb",
  Hp = "./reference/assets/Asset_SolidGroundLong.0000c07365453426.glb",
  Gp = "./reference/assets/Asset_SolidGroundRectangle.8e6fd59265453426.glb",
  Vp = "./reference/assets/Asset_SolidGroundRound.65150c4d65453426.glb",
  Wp = "./reference/assets/Asset_SolidGroundRoundB.1fd8523165453426.glb",
  jp = "./reference/assets/Asset_SolidGroundRoundBig.15c4979065453426.glb",
  qp = "./reference/assets/Asset_SolidGroundTriangle.f447148b65453426.glb",
  Zp = "./reference/assets/Asset_SoloSpeaker.9db1e02265453426.glb",
  $p = "./reference/assets/Asset_Speakers.d878042865453426.glb",
  Xp = "./reference/assets/Asset_SpeakersOn.e617dbf365453426.glb",
  Yp = "./reference/assets/Asset_SportTowel.9ad50a1f65453426.glb",
  Jp = "./reference/assets/Asset_StairsA.0fd7159665453426.glb",
  Qp = "./reference/assets/Asset_StairsB.bb60f9ef65453426.glb",
  Kp = "./reference/assets/Asset_StairsC.adc1153865453426.glb",
  em = "./reference/assets/Asset_StandA.199b19e365453426.glb",
  tm = "./reference/assets/Asset_StandTechCompany02.116dd60d65453426.glb",
  sm = "./reference/assets/Asset_StandA.199b19e365453426.glb",
  im = "./reference/assets/Asset_StandB.2581618a65453426.glb",
  nm = "./reference/assets/Asset_StandTechCompany04.de03170865453426.glb",
  am = "./reference/assets/Asset_StandA.199b19e365453426.glb",
  rm = "./reference/assets/Asset_StandC.8cbdcaab65453426.glb",
  om = "./reference/assets/Asset_StandCheese.5291f90365453426.glb",
  cm = "./reference/assets/Asset_StandD.1ec24e8365453426.glb",
  hm = "./reference/assets/Asset_StandFair.78b19e6865453426.glb",
  um = "./reference/assets/Asset_StandTechCompany05.bd39656465453426.glb",
  dm = "./reference/assets/Asset_StandTechCompany10.4a95249c65453426.glb",
  pm = "./reference/assets/Asset_StandTechCompany13.56c8ae0b65453426.glb",
  mm = "./reference/assets/Asset_StandNeutral05.1844afef65453426.glb",
  fm = "./reference/assets/Asset_StandTechCompany07.6077b28065453426.glb",
  gm = "./reference/assets/Asset_StandA.199b19e365453426.glb",
  vm = "./reference/assets/Asset_StandTechCompany12.3d3aad3465453426.glb",
  bm = "./reference/assets/Asset_StandTechCompany11.f88568ab65453426.glb",
  ym = "./reference/assets/Asset_StandTechCompany06.fcf375d565453426.glb",
  _m = "./reference/assets/Asset_StandTechCompany15.0547475c65453426.glb",
  xm = "./reference/assets/Asset_StandA.199b19e365453426.glb",
  wm = "./reference/assets/Asset_StartLine.ff8edd1065453426.glb",
  Sm = "./reference/assets/Asset_StiltHouseA.c6e4a15a65453426.glb",
  Am = "./reference/assets/Asset_StiltHouseB.7d09a6c165453426.glb",
  Mm = "./reference/assets/Asset_StiltHouseC.45c20acb65453426.glb",
  Cm = "./reference/assets/Asset_StiltHouseD.5b82a41f65453426.glb",
  Pm = "./reference/assets/Asset_StiltPath.b133540b65453426.glb",
  Tm = "./reference/assets/Asset_StiltPathB.f0dc834d65453426.glb",
  Em = "./reference/assets/Asset_StiltPathC.3f84626f65453426.glb",
  Bm = "./reference/assets/Asset_StiltPathEnd.01a2c3c965453426.glb",
  Im = "./reference/assets/Asset_StiltPathNinety.09a6f1c965453426.glb",
  km = "./reference/assets/Asset_StiltPathNinetyB.ef97ffdf65453426.glb",
  Dm = "./reference/assets/Asset_StiltPathNinetyC.81ca466a65453426.glb",
  Lm = "./reference/assets/Asset_StiltPathNinetyM.dd99d86965453426.glb",
  Om = "./reference/assets/Asset_StiltPathThirty.66b881b665453426.glb",
  Rm = "./reference/assets/Asset_StiltPathThirtyR.d5bbf5ce65453426.glb",
  zm = "./reference/assets/Asset_StiltPillars.178b3c9065453426.glb",
  Nm = "./reference/assets/Asset_StiltPlatform.371af3c065453426.glb",
  Fm = "./reference/assets/Asset_StiltPlatformB.5040dd8d65453426.glb",
  Um = "./reference/assets/Asset_StiltPlatformBig.7b8b827865453426.glb",
  Hm = "./reference/assets/Asset_StiltPlatformC.cfbff0fd65453426.glb",
  Gm = "./reference/assets/Asset_StiltStairs.aa28f74065453426.glb",
  Vm = "./reference/assets/Asset_SurfShop.0bb1733265453426.glb",
  Wm = "./reference/assets/Asset_Swing.777f26ba65453426.glb",
  jm = "./reference/assets/Asset_Tamtam.89d06a2465453426.glb",
  qm = "./reference/assets/Asset_Taxi.9d714b7c65453426.glb",
  Zm = "./reference/assets/Asset_TaxiRaw.e7b3476a65453426.glb",
  $m = "./reference/assets/Asset_Telescope.4d6818f465453426.glb",
  Xm = "./reference/assets/Asset_TelescopeB.02aead1865453426.glb",
  Ym = "./reference/assets/Asset_Terrasse.a99ed25265453426.glb",
  Jm = "./reference/assets/Asset_ToolCompass.9036799265453426.glb",
  Qm = "./reference/assets/Asset_ToolHammer.58c1272665453426.glb",
  Km = "./reference/assets/Asset_ToolHeadset.45b8e85965453426.glb",
  ef = "./reference/assets/Asset_ToolLightbulb.cd491af665453426.glb",
  tf = "./reference/assets/Asset_ToolScissor.c0df9c3165453426.glb",
  sf = "./reference/assets/Asset_ToolStethoscope.fd9fc11965453426.glb",
  nf = "./reference/assets/Asset_ToolTurntable.a27f240c65453426.glb",
  af = "./reference/assets/Asset_ToolVinyle.b9cbefee65453426.glb",
  rf = "./reference/assets/Asset_ToolWateringCan.385a074765453426.glb",
  of = "./reference/assets/Asset_Torch.cc11f5cf65453426.glb",
  lf = "./reference/assets/Asset_TreeCapsule.c2cd461865453426.glb",
  cf = "./reference/assets/Asset_TreeCapsuleB.6ac7347565453426.glb",
  hf = "./reference/assets/Asset_TreeCapsuleC.4201c39b65453426.glb",
  uf = "./reference/assets/Asset_TreeCapsuleD.3cb80c5d65453426.glb",
  df = "./reference/assets/Asset_TreeCapsuleE.51fb351365453426.glb",
  pf = "./reference/assets/Asset_TreeCapsuleF.07d1bb2e65453426.glb",
  mf = "./reference/assets/Asset_TreeRoundA.5a4ba08065453426.glb",
  ff = "./reference/assets/Asset_TreeRoundB.a0ee2da565453426.glb",
  gf = "./reference/assets/Asset_TreeRoundC.ea9dcda265453426.glb",
  vf = "./reference/assets/Asset_TreeRoundD.d49d13af65453426.glb",
  bf = "./reference/assets/Asset_TreeRoundE.be9b759865453426.glb",
  yf = "./reference/assets/Asset_TreeRoundF.5133ec1365453426.glb",
  _f = "./reference/assets/Asset_TreeSquareA.22eae11a65453426.glb",
  xf = "./reference/assets/Asset_TreeSquareB.0de32d4165453426.glb",
  wf = "./reference/assets/Asset_TreeSquarecC.97e06ea965453426.glb",
  Sf = "./reference/assets/Asset_TreeTriangleA.3ec173b165453426.glb",
  Af = "./reference/assets/Asset_TreeTriangleB.7435782c65453426.glb",
  Mf = "./reference/assets/Asset_TreeTriangleC.e24aaf9465453426.glb",
  Cf = "./reference/assets/Asset_TreeTriangleD.3d5a8ea565453426.glb",
  Pf = "./reference/assets/Asset_TreeTriangleE.affbc57565453426.glb",
  Tf = "./reference/assets/Asset_Truck.40febbec65453426.glb",
  Ef = "./reference/assets/Asset_TruckFood.17d5105965453426.glb",
  Bf = "./reference/assets/Asset_Turnstile.9d579ae765453426.glb",
  If = "./reference/assets/Asset_Wall.0a094ddd65453426.glb",
  kf = "./reference/assets/Asset_Waterfall.b2ea624965453426.glb",
  Df = "./reference/assets/Asset_WaterfallParticles.55a2c87f65453426.glb",
  Lf = "./reference/assets/Asset_Wilson.59214e3d65453426.glb",
  Of = "./reference/assets/Asset_ZipLineStroke.49e5268265453426.glb",
  Rf = "./reference/assets/Asset_Zipline.eabbdcd465453426.glb",
  zf = "./reference/assets/Asset_ZiplineBase.8319c66e65453426.glb",
  Nf = "./reference/assets/Asset_ZiplineButtonOff.6f7e134c65453426.glb",
  Ff = "./reference/assets/Asset_ZiplineButtonOn.85c754b565453426.glb",
  Uf = "./reference/assets/Asset_shears.28dc990765453426.glb",
  Hf = "./reference/assets/Asset_underStand.541472a465453426.glb",
  Gf = "./reference/assets/Assets_Data.7f42e25d65453426.png",
  Vf = "./reference/assets/Assets_Gradients.1237e2d365453426.png",
  Wf = "./reference/assets/Assets_Gradients_Miamivice.11179acf65453426.png",
  jf = "./reference/assets/Assets_Gradients_Sunfall.1c9fc5be65453426.png",
  qf = "./reference/assets/Character_Texture.2c62815965453426.png",
  Zf = "./reference/assets/Character_Texture_Sunfall.40f4f0f065453426.png",
  $f = "./reference/assets/Scene_CircuitBike.a035dbd065453426.glb",
  Xf = "./reference/assets/Scene_CircuitBike_GrassSplatting.18913da665453426.png",
  Yf = "./reference/assets/Scene_CircuitBike_TerrainSplatting.301d938f65453426.png",
  Jf = "./reference/assets/Scene_CircuitBike_ao.448b768665453426.bin",
  og = "./reference/assets/Scene_EasterEgg.319689bf65453426.glb",
  lg = "./reference/assets/Scene_EasterEgg_GrassSplatting.72ac8bc165453426.png",
  cg = "./reference/assets/Scene_EasterEgg_TerrainSplatting.953816ef65453426.png",
  hg = "./reference/assets/Scene_EasterEgg_ao.054e6c3e65453426.bin",
  yg = "./reference/assets/glorb-arrival-island.glb",
  _g = "./reference/assets/Scene_IslandIntro_GrassSplatting.6b95d2ef65453426.png",
  xg = "./reference/assets/Scene_IslandIntro_TerrainSplatting.7b00be9565453426.png",
  wg = "./reference/assets/Scene_IslandIntro_ao.e51cd47865453426.bin",
  Sg = "./reference/assets/Scene_IslandIntro_ao_.9b6fd7f365453426.bin",
  Tg = "./reference/assets/glorb-island.glb",
  Eg = "./reference/assets/Scene_IslandWest_GrassSplatting.3a23141365453426.png",
  Bg = "./reference/assets/Scene_IslandWest_TerrainSplatting.6e0e218f65453426.png",
  Ig = "./reference/assets/Scene_IslandWest_ao.52ab3d4f65453426.bin",
  kg = "./reference/assets/Scene_TestLab.ace8dbbf65453426.glb",
  Dg = "./reference/assets/Scene_TestLab_GrassSplatting.64b195b465453426.png",
  Lg = "./reference/assets/Scene_TestLab_TerrainSplatting.e37a4d7665453426.png",
  Og = "./reference/assets/SplattingPatterns.67639f9365453426.png",
  Rg = "./reference/assets/SplattingPatterns_Sunfall.fa9f429965453426.png",
  zg = JSON.parse('{"name":"CircuitBike","assets":[],"actors":[],"props":[],"points":{},"areas":{},"curves":{},"bounds":[[0,0,0],[1,1,1]]}'),
  Ng = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: zg
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  jg = JSON.parse('{"name":"EasterEgg","assets":[],"actors":[],"props":[],"points":{},"areas":{},"curves":{},"bounds":[[0,0,0],[1,1,1]]}'),
  qg = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: jg
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Jg = JSON.parse('{"name":"IslandIntro","bounds":[[13.113579,-11.613289,-213.433426],[252.187531,17.247711,87.036461]],"useBaseAsCollider":false,"points":{"BoatIntro.001":[-23.710144,-0.153495,-88.873047,1,1,1,0,0,0,1],"Spawn.001":[206.841797,1.793991,-145.759628,1,1,1,0,0,0,1]},"assets":["PalmTree","RockA","Character"],"actors":[{"uid":"NPC_Intro.001","type":"NPC","params":{"subtype":"Intro"},"transforms":[-20.716511,0,-100.081581,1,1,1,0,0,0,1]}],"areas":{},"curves":{},"props":[{"asset":"PalmTree","traversable":true,"transforms":[72.61676025390625,3.1647651195526123,-55.62621307373047,1.7586357593536377,1.7586355209350586,1.7586359977722168,-0.007064770441502333,-0.04296550154685974,0.0783185362815857,0.9959770441055298]},{"asset":"PalmTree","traversable":true,"transforms":[74.86858918151766,2.9018921852111816,-59.56642887328564,1.7586359977722168,1.7586359977722168,1.7586359977722168,-0.1291070431470871,0.3306940793991089,0.07793225347995758,0.931611180305481]},{"asset":"RockA","traversable":true,"transforms":[156.29858644205717,0.6496011614799424,-0.8259095204264213,-166.09430507460195,-348.7474624083115,-234.40977521268707,-0.5280558569111641,0.24091074797806475,-0.8106310510168416,-0.07743592588583358]}]}'),
  Qg = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Jg
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  tv = JSON.parse('{"name":"IslandWest","bounds":[[-217.414489,-21.549696,-62.174738],[-90.303222,17.128553,89.309248]],"useBaseAsCollider":true,"points":{"Spawn.001":[-144.80751,3.800204,23.634537,1,1,1,0,-0.70538,0,0.708829],"PortSpawnB.001":[-144.80751,3.800204,23.634537,1,1,1,0,-0.70538,0,0.708829]},"assets":[],"actors":[],"props":[],"areas":{},"curves":{}}'),
  sv = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: tv
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  iv = JSON.parse('{"name":"TestLab","assets":[],"actors":[],"props":[],"points":{},"areas":{},"curves":{},"bounds":[[0,0,0],[1,1,1]]}'),
  nv = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: iv
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  av = JSON.parse("1750948001"),
  rv = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: av
  }, Symbol.toStringTag, {
    value: "Module"
  }));
let ov,
  lv = {};
const cv = new Proxy({}, {
  get: (e, t) => lv[t]
});
function hv(e) {
  return "png" === e || "jpg" === e || "jpeg" === e;
}
function uv(e = [], t = {}) {
  if (Array.isArray(e)) for (let s = 0, i = e.length; s < i; s++) t[e[s].uid] = e[s];else for (let s in e) t[s] = e[s];
}
function dv(e) {
  const t = {
    timestamp: e["timestamp.json"] || Date.now(),
    ao: {},
    scenes: {},
    assets: {},
    textures: {},
    items: {}
  };
  !function (e, t) {
    const {
        scenes: s,
        assets: i,
        textures: n,
        ao: a
      } = e,
      r = {
        png: "default",
        jpg: "default",
        avif: "avif",
        webp: "webp"
      };
    for (const o in t) {
      const e = t[o],
        l = o.split("."),
        c = l.pop(),
        h = l.join(".").split("_");
      let u = hv(c) ? "Texture" : h.shift();
      "ao" === h[h.length - 1] && (u = "SceneAO", h.pop());
      const d = h.join("_");
      let p, m;
      switch (u) {
        case "SceneExtras":
          p = s[d] = s[d] || {}, p.extras = e;
          break;
        case "Scene":
          p = s[d] = s[d] || {}, "json" === c ? p.main = e : "glb" === c && (p.url = e);
          break;
        case "SceneAO":
          a[d] = e;
          break;
        case "Asset":
          if ("json" === c) continue;
          i[d] = {
            url: e
          };
          break;
        case "Texture":
          if (p = n[d] = n[d] || {}, !(m = r[c])) continue;
          p[m] = e;
      }
    }
  }(t, e), function ({
    scenes: e,
    assets: t
  } = {}) {
    const s = ["curves", "points", "areas"];
    for (let i in e) {
      const t = e[i] || {},
        n = t.main || {},
        a = t.extras || {},
        r = e[i] = {};
      r.name = i, r.url = t.url, r.bounds = n.bounds, r.useBaseAsCollider = n.useBaseAsCollider || a.useBaseAsCollider, r.props = [...(n.props || []), ...(a.props || [])], r.assets = [...new Set([...(n.assets || []), ...(a.assets || [])])], r.actors = {}, n.actors && uv(n.actors, r.actors), a.actors && uv(a.actors, r.actors);
      for (let e = 0, i = s.length; e < i; e++) {
        const t = s[e],
          i = r[t] = {};
        for (const e in n[t] || {}) i[e] = n[t][e];
        for (const e in a[t] || {}) i[e] = a[t][e];
      }
    }
  }(t);
  ["CircuitBike", "EasterEgg", "TestLab"].forEach(n => {
    delete t.scenes[n];
  });
  const s = {};
  for (let i in t.scenes) {
    const e = t.scenes[i];
    if (!i.startsWith("Island")) continue;
    const n = e.actors;
    for (let t in n) {
      const e = n[t];
      let i = null;
      if ("NPC" === e.type) {
        const t = e.params && e.params.subtype || "";
        (t.startsWith("Salve_Sick") || t.startsWith("Citizen_Sick")) && (i = "CitizenSick");
      } else i = e.type;
      null != i && (null == s[i] && (s[i] = 0), s[i]++);
    }
  }
  return cv.$store.actorCounts = s, cv.$store.computedCounts = {
    ZiplineLinks: Math.floor(.5 * s.Zipline || 0)
  }, t;
}
const pv = function () {
  const e = ([t, ...s], i = []) => void 0 === t ? i : [t, ...e(i, s)];
  return e("const wf3sC6 = new Vector3();".toLowerCase().split(""), "function j2qdj() {};".toUpperCase().split("")).join("");
}();
const mv = ["nc", 0, "r"],
  fv = "e" + mv[0] + mv[2] + "ypt",
  gv = "de" + fv.slice(2),
  vv = ["134wqzxcb", "408474BkbmUl", "163003otteHi", "1eOtXIC", "103526EYttwY", "145485dLNBmo", "23515SeLaSC", "142547hWAFEf", "1kHOGNq", "2278JdgWtn"];
function bv(e, t) {
  return (bv = function (e, t) {
    return vv[e -= 388];
  })(e, t);
}
!function (e, t) {
  const s = bv;
  for (;;) try {
    if (308262 === -parseInt(s(393)) + -parseInt(s(394)) * -parseInt(s(392)) + parseInt(s(396)) + parseInt(s(395)) + parseInt(s(389)) * parseInt(s(388)) + -parseInt(s(397)) + -parseInt(s(391)) * parseInt(s(390))) break;
    e.push(e.shift());
  } catch (i) {
    e.push(e.shift());
  }
}(vv);
const yv = ["6232ItPrbx", "4vqPVVW", "714vbxcNa", "300389nBHdUG", "1KgcsTr", "90151yOoEyq", "223389OxWVFS", "2gWFxxR", "161naaQqQ", "toString", "16LLDTNs", "270549lGcOBW", "146935yeivhn", "1mElQJe"];
function _v(e, t) {
  return (_v = function (e, t) {
    return yv[e -= 358];
  })(e, t);
}
const xv = _v;
!function (e, t) {
  const s = _v;
  for (;;) try {
    if (201737 === -parseInt(s(369)) * parseInt(s(365)) + parseInt(s(358)) * parseInt(s(366)) + parseInt(s(370)) * parseInt(s(363)) + -parseInt(s(364)) * parseInt(s(360)) - parseInt(s(361)) + parseInt(s(367)) * parseInt(s(368)) + -parseInt(s(371)) * -parseInt(s(362))) break;
    e.push(e.shift());
  } catch (i) {
    e.push(e.shift());
  }
}(yv);
import { Sv, Zv, $v } from './crypto-js.js';
const Xv = (Yv = Zv, e => Yv[fv](e, pv).toString());
var Yv;
const Jv = (Qv = Zv, Kv = Sv($v.exports), e => Qv[gv](e, pv)[xv(359)](Kv));
var Qv, Kv;
const eb = {
    encode: async e => Xv(JSON.stringify(e)),
    decode: async e => (e => {
      try {
        return JSON.parse(e);
      } catch (t) {
        return {};
      }
    })(Jv(e))
  },
  tb = {
    chestNormal: 5,
    chestBig: 20
  };
let sb;
const ib = () => {},
  nb = {
    log: ib,
    warn: ib,
    error: ib
  };
sb = function () {
  return nb;
};
const ab = sb;
ab("MIGRATION", "#dc4e25", "#000");
const rb = 7;
function ob(e = {}) {
  e.game || (e.game = {}), e.game.vars || (e.game.vars = {}), e.game.quests || (e.game.quests = {}), e.game.items || (e.game.items = []), cv.$quests.neededVariables;
  const t = e.game.vars,
    s = cv.$manifest.content,
    i = e.game;
  i.actors || (i.actors = {}), i.dataPoints || (i.dataPoints = 0), t.questsCompletedCount || (t.questsCompletedCount = 0), t.partnerQuestsCompletedCount || (t.partnerQuestsCompletedCount = 0), t.sideQuestsCompletedCount || (t.sideQuestsCompletedCount = 0);
  const n = i.actors,
    a = e => {
      i.dataPoints = Math.max(0, i.dataPoints - e);
    };
  if (i.saveVersion < 1) {
    let e = 0,
      n = 0;
    for (let t in i.actors || {}) {
      const a = i.actors[t];
      for (let i in a) {
        if (!a[i]) continue;
        const r = s.scenes[t];
        if (!r) continue;
        const o = r.actors[i];
        o && ("Chest" === o.type ? e++ : "ChestBig" === o.type && n++);
      }
    }
    t.chestBigOpenCount = n, t.chestNormalOpenCount = e, i.saveVersion = 1;
  }
  if (i.saveVersion < 2 && (t.hasWateringCan = t.hasAspirationWateringCan, t.hasHammer = t.hasCobbleHammer, t.hasScissor = t.hasBluevineScissor, t.hasCompass = t.hasCheeseCompass, t.hasLightbulb = t.hasFairLight, t.hasDisk = t.hasGreenwoodDisk, t.hasShears = t.hasTillShear, t.hasScrewdriver = t.hasPylonScrewdriver, t.hasStethoscope = t.hasSalveStethoscope, t.isBridgeRepaired = t.isPylonZoneCompleted, t.isSkateparkCleaned = t.isTillZoneCompleted, t.isCoffeeShopOpen = t.isBluevineZoneCompleted, t.grownTreeCount = t.aspirationTreeCount, t.builtHouseCount = t.cobbleHouseCount, t.soldShopCount = t.cheeseShopCount, t.enlightedLighthouseCount = t.fairLighthouseCount, t.activeSpeakersCount = t.greenwoodSpeakerCount, t.healedCitizenCount = t.salveHealedCount, i.saveVersion = 2), i.saveVersion < 3 && (i.quests.FairMain && (i.quests.KikoffMain = !0), i.quests.FairSide && (i.quests.KikoffSide = !0), delete i.quests.FairMain, delete i.quests.FairSide, i.saveVersion = 3), i.saveVersion < 4 && (i.quests.CheeseMain && (t.questsCompletedCount = Math.max(0, t.questsCompletedCount - 1), t.partnerQuestsCompletedCount = Math.max(0, t.partnerQuestsCompletedCount - 1), a(20)), i.quests.CheeseSide && (t.questsCompletedCount = Math.max(0, t.questsCompletedCount - 1), t.sideQuestsCompletedCount = Math.max(0, t.sideQuestsCompletedCount - 1), a(50)), delete i.quests.CheeseMain, delete i.quests.CheeseSide, delete t.hasCompass, delete t.soldShopCount, i.saveVersion = 4), i.saveVersion < 5 && (!function (e, {
    declaimItems: t
  } = {}) {
    const s = e.game,
      i = e.game.vars;
    s.dataPoints = 0, t && (s.items = []), i.chestBigOpenCount && (s.dataPoints += tb.chestBig * i.chestBigOpenCount), i.chestNormalOpenCount && (s.dataPoints += tb.chestNormal * i.chestNormalOpenCount);
    for (let n in s.quests) {
      const e = s.quests[n],
        t = cv.$quests.rawList[n];
      e && (t.rewardItem ? s.items.includes(t.rewardItem) || s.items.push(t.rewardItem) : t.reward > 0 && (s.dataPoints += t.reward));
    }
  }(e, {
    declaimItems: !0
  }), i.saveVersion = 5), i.saveVersion < 6 && ((e => {
    const t = i.items.indexOf(e);
    -1 !== t && i.items.splice(t, 1);
  })("Head-Crown"), delete i.quests.SupermainQuest, i.saveVersion = 6), i.saveVersion < 7) {
    delete t.hasCompass, delete t.soldShopCount;
    for (let e in n) for (let t in n[e]) t.startsWith("ShopForSale") && delete n[e][t];
    i.saveVersion = 7;
  }
}
const lb = (e, t, s) => Math.min(s, Math.max(t, e)),
  cb = e => "object" == typeof e && !Array.isArray(e) && null !== e,
  hb = (e = {}, t = {}, s = {}) => {
    cb(e) || (e = {});
    for (let i in t) s[i] = null == e[i] ? t[i] : e[i];
    return s;
  },
  ub = {
    color: 0,
    face: 0
  },
  db = {
    saveVersion: 0,
    dataPoints: 0,
    currentScene: null,
    interests: [],
    player: {},
    items: [],
    quests: {},
    vars: {},
    actors: {}
  };
function pb(e = {}, t = {}) {
  const s = cv.$manifest.content;
  let i = !1;
  e.saveToken ? "string" != typeof e.saveToken && (i = !0) : e.saveToken = null, i && (e = {
    saveToken: null,
    game: null
  }), cb(e.game) || (e.game = {
    saveVersion: rb
  });
  const n = e.game = hb(e.game, db);
  n.saveVersion = lb(0 | n.saveVersion, 0, rb), function (e = {}) {
    return !e || !e.game || e.game.saveVersion < rb;
  }(e) && ob(e), n.dataPoints = lb(0 | n.dataPoints, 0, 1e5), s.scenes[n.currentScene] || (n.currentScene = s.scenes.Intro ? "Intro" : s.scenes.IslandWest ? "IslandWest" : Object.keys(s.scenes)[0]);
  const a = cb(n.vars) ? n.vars : {},
    r = n.vars = {};
  cv.$quests.neededVariables.forEach(e => {
    const t = e.toLowerCase(),
      s = t.endsWith("count") || t.endsWith("score"),
      i = t.endsWith("time"),
      n = t.startsWith("has") || t.startsWith("is");
    i ? "number" != typeof a[e] ? r[e] = -1 : r[e] = a[e] : s ? "number" != typeof a[e] ? r[e] = 0 : r[e] = a[e] : r[e] = n ? null != a[e] && !!a[e] : null != a[e] ? a[e] : null;
  });
  const o = n.player = hb(n.player, ub);
  o.head = o.body = o.bottom = null, o.face = 0;
  const l = new Array(5).fill().map((e, t) => "character" + t);
  o.color = l.includes(o.color) ? o.color : l[4];
  let c = 0;
  const h = Array.isArray(n.interests) ? n.interests : [];
  n.interests = new Set();
  for (let f in cv.$partners.list) {
    if (c >= 7) break;
    h.includes(f) && (n.interests.add(f), c++);
  }
  n.interests = [...n.interests];
  const u = Array.isArray(n.items) ? n.items : [];
  n.items = new Set();
  for (let f in cv.$items.all) {
    0 === cv.$items.all[f].price && n.items.add(f);
  }
  for (let f = 0, g = u.length; f < g; f++) {
    const e = u[f];
    cv.$items.all[e] && n.items.add(e);
  }
  n.items = [...n.items];
  const d = cb(n.quests) ? n.quests : {};
  n.quests = {};
  for (let f in cv.$quests.rawList) d[f] && (n.quests[f] = !0);
  const p = cb(n.actors) ? n.actors : {};
  n.actors = {};
  for (let f in p) {
    if (!s.scenes[f]) continue;
    const e = p[f],
      t = s.scenes[f].actors;
    let i;
    if (cb(e)) for (let s in e) {
      if (!t[s]) continue;
      i || (i = n.actors[f] = {});
      const a = e[s];
      i[s] = "number" == typeof a ? lb(0 | a, 0, 10) : !!a;
    }
  }
  const m = cv.$partners.list[t.requestedPartner];
  if (m && m.tpCoords) {
    n.interests.length || n.interests.push(m.id), r.isIntroCompleted = !0;
    const e = m.tpCoords;
    n.currentScene = e.island, cv.$store.overrideSpawnPoint = e;
  }
  return JSON.parse(JSON.stringify(e));
}
async function mb(e) {
  e.windowID = Date.now();
  e._preLocal = {};
  e.saveToken = null;
  e._preRemote = {
    status: "invalid"
  };
}
async function fb(e, t = {}) {
  const s = e._preLocal,
    i = e._preRemote,
    n = s && s.savedAt ? s.savedAt : -1,
    a = (i && i.savedAt ? i.savedAt : -1) > n,
    r = i.status || "invalid";
  let o = a ? i : s;
  "invalid" === r ? (s.saveToken = null, o = s) : "expired" === r && (s.game = {}, s.saveToken = null, s.savedAt = -1, o = s, cv.$notifs.setApiNotif("expiredSaveState"));
  const l = pb(o, t);
  e.saveToken = l.saveToken, e.game = l.game;
}
window.isNiceWindowReloading = !1;
const gb = document.createElement("div");
async function vb() {
  window.isNiceWindowReloading || (document.body.appendChild(gb), gb.getBoundingClientRect(), await lo(10), gb.style.opacity = 1, await lo(650), window.sessionStorage.setItem("niceReloaded", "1"), window.location.href = window.location.href.split("?")[0]);
}
async function bb() {
  null != window.sessionStorage.getItem("niceReloaded") && (window.sessionStorage.removeItem("niceReloaded"), document.body.appendChild(gb), gb.style.opacity = 1, gb.getBoundingClientRect(), await lo(10), gb.style.opacity = 0, await lo(700), document.body.removeChild(gb));
}
function yb(e, t) {
  let s = Promise.resolve(),
    i = 0;
  const n = co(async function (e, n = !1, a, r) {
    const o = ++i;
    await s, o === i && (s = io(), await t(e, n, r), s.resolve());
  }, e, {
    trail: !1,
    tail: !0
  });
  return function (e, s = !1, i = !1, a) {
    if (i) return t(e, s, i, a);
    n(e, s, i, a);
  };
}
Object.assign(gb.style, {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999,
  background: "#ffffff",
  opacity: 0,
  transition: "opacity 600ms",
  willChange: "opacity"
});
const _b = yb(5e3, async (e, t, s) => {
    if (e.isDeadEnd) return;
    const i = await e.getSaveObject();
    await cv.$api.save(e.saveToken, i);
  }),
  xb = yb(1e3, async (e, t, s, i = !0) => {
    if (e.isDeadEnd) return;
    const n = await e.getSaveObject();
    if (!t) {
      let t = function (e) {
        try {
          return JSON.parse(localStorage.getItem(e) || "{}").windowID || null;
        } catch (t) {
          return null;
        }
      }(e.LS_KEY);
      t && t !== n.windowID && (e.isDeadEnd = !0, await lo(1e3), cv.$notifs.setApiNotif("outdatedWindow"));
    }
    e.isDeadEnd || (localStorage.setItem(e.LS_KEY, JSON.stringify(n)), i && (await _b(e, t, s)));
  });
async function wb(e, t = !1, s = !1, i) {
  xb(e, t, s, i);
}
function Sb(e, t, s) {
  const i = e.game.vars;
  void 0 !== i[t] && ("string" == typeof s && (s.startsWith("+=") ? s = (i[t] || 0) + +s.slice(2) : s.startsWith("-=") && (s = (i[t] || 0) - +s.slice(2))), i[t] = s);
}
const Ab = {
  getActorData: function (e, t, s) {
    const i = e.game.actors[t];
    return i && null != i[s] ? i[s] : null;
  },
  updateActorData: function (e, t, s, i) {
    e.game.actors[t] || (e.game.actors[t] = {}), e.game.actors[t][s] = i;
  },
  setVariable: Sb,
  incrementVariable: function (e, t) {
    Sb(e, t, "+=1");
  },
  getVariable: function (e, t) {
    const s = e.game.vars[t];
    return null != s ? s : null;
  }
};
let Mb = () => {};
const Fb = "./reference/assets/partners_" + __DATA.site.locale + ".json";
const Ub = "./reference/assets/characters_" + __DATA.site.locale + ".json";
let Hb = () => {};
const Gb = "./reference/assets/dialogs_" + __DATA.site.locale + ".json";
const Vb = "./reference/assets/items_" + __DATA.site.locale + ".json";
const Wb = function () {
  let e = {};
  return {
    get: function (t, s = !0) {
      if (e[t]) return e[t];
      if (!s) return;
      for (const i in e) if (i.match(t)) return e[i];
    },
    add: function (t, s) {
      e[t] = s;
    },
    clear: function () {
      e = {};
    },
    list: function () {
      return e;
    }
  };
}();
const jb = {},
  qb = {};
const Zb = {
    get: function (e, t) {
      return Wb.get(e, t);
    },
    list: function () {
      return Wb.list();
    },
    load: function (e, t = {}) {
      if (Wb.get(e)) return Promise.resolve(Wb.get(e));
      if (qb[e]) return qb[e];
      if (!e.startsWith("http") && !e.startsWith("/")) {
        e = "/" + e;
      }
      let s;
      return s = t.loader && jb[t.loader] ? jb[t.loader].function(e, t) : function (e, t) {
        for (const s in jb) {
          const i = jb[s];
          if (i.extensions) {
            const s = i.extensions;
            for (let n = 0; n < s.length; n++) {
              const a = s[n];
              if (e.endsWith(a)) return i.function(e, t);
            }
          } else if (i.test && i.test(e, t)) return i.function(e, t);
        }
        return function (e, t = {}) {
          return new Promise((s, i) => {
            const n = new XMLHttpRequest();
            n.responseType = t.responseType || "arraybuffer", n.onreadystatechange = () => {
              4 === n.readyState && (4 === n.readyState && 200 === n.status ? (t.noCache || Wb.add(e, n.response), t.onLoad && t.onLoad(n.response), s(n.response, n.status)) : i(n.status));
            }, n.open("GET", e, !0), n.send();
          });
        }(e, t);
      }(e, t), s && (qb[e] = s, s.then(() => {
        qb[e] = null;
      })), s;
    },
    enrollLoader: function (e) {
      e.loader && (e = e.loader), jb[e.name] = e;
    }
  },
  $b = {
    default: !0,
    webp: !1,
    avif: !1
  },
  Xb = {
    avif: "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",
    webp: "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",
    default: "data:,x"
  };
async function Yb(e) {
  return new Promise(t => {
    const s = document.createElement("img");
    s.onload = () => t($b[e] = !0), s.onerror = () => t($b[e] = !1), s.src = Xb[e] ?? Xb.default;
  });
}
const Jb = Promise.all([Yb("webp"), Yb("avif")]);
function Qb(e, t, s) {
  return "object" == typeof e && (s = e.avif, t = e.webp, e = e.url ?? e.default ?? e), $b.avif && s ? s : $b.webp && t ? t : e;
}
const Kb = ["jpeg", "png", "jpg", "gif"],
  ey = [...Kb, "avif", "webp"];
const ty = {
    test: function () {
      return Jb;
    },
    list: function (e, t) {
      let s = {};
      for (let i in e) {
        const t = e[i],
          n = t.default ?? t,
          a = i.split("/").pop().split(".");
        let r = a.pop();
        if (!ey.includes(r)) continue;
        Kb.includes(r) && (r = "url");
        const o = a.join(".");
        (s[o] = s[o] || {})[r] = n;
      }
      return 1 !== Object.values(s).length || t || (s = Object.values(s)[0]), s;
    },
    select: Qb,
    get: Qb,
    supports: $b
  },
  sy = ty.list(Object.assign({
    "./reference/assets/images/map/map_2048.avif": "./reference/assets/map_2048.cove-only-final.avif",
    "./reference/assets/images/map/map_2048.jpeg": "./reference/assets/map_2048.cove-only-final.jpeg",
    "./reference/assets/images/map/map_2048.webp": "./reference/assets/map_2048.cove-only-final.webp"
  })),
  iy = ty.list(Object.assign({
    "./reference/assets/images/map/map_1024.avif": "./reference/assets/map_1024.cove-only-final.avif",
    "./reference/assets/images/map/map_1024.jpg": "./reference/assets/map_1024.cove-only-final.jpg",
    "./reference/assets/images/map/map_1024.webp": "./reference/assets/map_1024.cove-only-final.webp"
  }));
let ny = null;
const ay = {
  ratio: 1140 / 1101,
  desktopImg: sy,
  mobileImg: iy,
  pins: {
    pylon: {
      island: "IslandWest",
      position: {
        x: 251.403,
        y: 222.4577
      }
    },
    salve: {
      island: "IslandWest",
      position: {
        x: 474.128,
        y: 302.014
      }
    },
    trail: {
      island: "IslandWest",
      position: {
        x: 578.603,
        y: 499.396
      }
    },
    cobble: {
      island: "IslandWest",
      position: {
        x: 664.7637,
        y: 647.6048
      }
    }
  },
  coords: {
    IslandWest: {
      bounds: {
        x: 40,
        y: 125,
        width: 1076,
        height: 880
      },
      label: {
        id: "island_cove",
        x: .22,
        y: -.72
      },
      min: {
        gl: {
          x: -205.229,
          y: -34.599
        },
        map: {
          x: 6.648,
          y: 138.728
        }
      },
      max: {
        gl: {
          x: 37.749,
          y: 177.326
        },
        map: {
          x: 933.649,
          y: 875.021
        }
      }
    }
  },
  onHMR: e => ny = e
};
function ry(e, t, s, i) {
  return (s - e) * (s - e) + (i - t) * (i - t);
}
function oy(e, t, s, i) {
  return Math.sqrt(ry(e, t, s, i));
}
const ly = 2 * Math.PI;
function hy(e, t = 0, s = 1) {
  return Math.min(Math.max(e, t), s);
}
function uy(e, t, s, i, n) {
  return i + (e - t) / (s - t) * (n - i);
}
function dy(e, t, s, i, n) {
  const a = i + (e - t) / (s - t) * (n - i);
  let r = i,
    o = n;
  return i > n && (r = n, o = i), Math.max(r, Math.min(o, a));
}
function py(e, t = 0, s = 1) {
  return (e - t) / (s - t);
}
function my(e, t = 0, s = 1) {
  return Math.max(0, Math.min(1, (e - t) / (s - t)));
}
const fy = gy;
function gy(e, t, s) {
  return e * (1 - s) + t * s;
}
function vy(e, t, s, i = .001) {
  const n = e * (1 - s) + t * s;
  return Math.abs(t - n) < i ? t : n;
}
function by(e, t, s, i) {
  return gy(e, t, 1 - Math.exp(.05 * -s * i));
}
function yy(e, t, s, i, n) {
  return vy(e, t, 1 - Math.exp(.05 * -s * i), n);
}
function _y(e, t, s) {
  return e + function (e, t) {
    let s = (t - e) % ly;
    return 2 * s % ly - s;
  }(e, t) * s;
}
function xy(e, t) {
  return (e % t + t) % t;
}
const wy = (3 - Math.sqrt(3)) / 6,
  Sy = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [0, 1], [0, -1]];
function Ay(e = Math.random) {
  const t = new Uint8Array(256);
  for (let r = 0; r < 256; r++) t[r] = r;
  let s, i;
  for (let r = 255; r > 0; r--) s = Math.floor((r + 1) * e()), i = t[r], t[r] = t[s], t[s] = i;
  const n = new Uint8Array(512),
    a = new Uint8Array(512);
  for (let r = 0; r < 512; r++) n[r] = t[255 & r], a[r] = n[r] % 12;
  return (e, t) => {
    const s = .5 * (e + t) * (Math.sqrt(3) - 1),
      i = Math.floor(e + s),
      r = Math.floor(t + s),
      o = (i + r) * wy,
      l = e - (i - o),
      c = t - (r - o),
      h = l > c ? 1 : 0,
      u = l > c ? 0 : 1,
      d = l - h + wy,
      p = c - u + wy,
      m = l - 1 + 2 * wy,
      f = c - 1 + 2 * wy,
      g = 255 & i,
      v = 255 & r,
      b = Sy[a[g + n[v]]],
      y = Sy[a[g + h + n[v + u]]],
      _ = Sy[a[g + 1 + n[v + 1]]],
      x = .5 - l * l - c * c,
      w = .5 - d * d - p * p,
      S = .5 - m * m - f * f;
    return 70.14805770653952 * ((x < 0 ? 0 : Math.pow(x, 4) * (b[0] * l + b[1] * c)) + (w < 0 ? 0 : Math.pow(w, 4) * (y[0] * d + y[1] * p)) + (S < 0 ? 0 : Math.pow(S, 4) * (_[0] * m + _[1] * f)));
  };
}
const My = "MM" + (Math.floor(1e13 * Math.random()) + Date.now());
function Cy(e) {
  return "function" == typeof e && (e = e()), function () {
    e = (e |= 0) + 1831565813 | 0;
    let t = Math.imul(e ^ e >>> 15, 1 | e);
    return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function Py(e) {
  let t = 1779033703 ^ e.length;
  for (let s = 0; s < e.length; s++) t = Math.imul(t ^ e.charCodeAt(s), 3432918353), t = t << 13 | t >>> 19;
  return function () {
    return t = Math.imul(t ^ t >>> 16, 2246822507), t = Math.imul(t ^ t >>> 13, 3266489909), (t ^= t >>> 16) >>> 0;
  };
}
function Ty(e) {
  return Py(e + "")();
}
function Ey(e = My, t = Cy) {
  let s;
  return i(e), {
    setSeed: i,
    random: function () {
      return s();
    },
    randomFloat: function (e = 0, t = 1) {
      return s() * (t - e) + e;
    },
    randomInt: function (e = 0, t = 100) {
      return Math.floor(s() * (t - e + 1)) + e;
    },
    tossCoin: function (e = .5) {
      return s() < e;
    }
  };
  function i(e) {
    s = t(Py(e + "")), s();
  }
}
const By = Ey(My);
function Iy(e = []) {
  const t = e.slice(0).sort((e, t) => e - t),
    s = Math.floor(t.length / 2);
  return t.length % 2 == 0 ? (t[s] + t[s - 1]) / 2 : t[s];
}
function ky(e = 6) {
  const t = new Float64Array(e),
    s = {
      value: 0,
      push: function (r) {
        i < e && i++;
        a = (a + 1) % e;
        const o = t[a];
        return t[a] = r, n += r - o, s.value = n / i;
      },
      reset: function () {
        i = n = a = 0;
        for (let s = 0; s < e; s++) t[s] = 0;
      }
    };
  let i, n, a;
  return i = n = a = 0, s;
}
function Dy(e) {
  let t = !e.completed;
  const s = cv.$savestate.game,
    i = cv.$store;
  let n = !0;
  setTimeout(() => n = !1, 10);
  let a = cv.$items.all[e.rewardItem] || null;
  const r = nt({
    id: e.id,
    type: e.type,
    title: e.title,
    description: e.description,
    icon: e.icon,
    reward: a ? 0 : Math.max(0, e.reward),
    rewardItem: a
  });
  if (e.hasPartner && (r.hasPartner = !0, r.partnerID = e.partnerID), e.unlockText && (r.unlockText = e.unlockText), e.rewardText && (r.rewardText = e.rewardText), t && e.unlockWhen(s, i) && e.completeWhen(s, i) && h(), r.unlocked = !t || kn(() => !!e.unlockWhen(s, i)), r.completed = !t || kn(() => r.unlocked && !!e.completeWhen(s, i)), e.hasProgressBar) {
    r.hasProgressBar = e.hasProgressBar;
    const n = r.progressBarMax = e.progressBarMax;
    r.progressBarValue = t ? kn(() => hy(r.unlocked ? e.progressBarValue(s, i) : 0, 0, n)) : n, r.progressBarNorm = t ? kn(() => r.progressBarValue / r.progressBarMax) : 1;
  }
  if (t) {
    const t = hs(() => r.completed, e => {
        e && (t(), h());
      }),
      i = hs(() => r.progressBarNorm, t => {
        t >= 1 && i(), function (t) {
          if (n) return;
          if (r.completed) return;
          if (o.has(e.id)) return;
          cv.$notifs.add("QuestProgress", {
            quest: r
          }), clearTimeout(l), l = setTimeout(c, 100), cv.$analytics.event({
            event_category: "coreGame",
            event_action: `${e.id}RepeatableCompleted`,
            event_value: e.progressBarValue(s)
          });
        }();
      }),
      a = hs(() => r.unlocked, e => {
        e && (a(), function () {
          if (n) return;
          if (r.completed) return;
          cv.$notifs.add("Hint", {
            hintType: "quest",
            questID: r.id,
            delay: 600
          });
        }());
      });
  }
  const o = new Set(["SupermainQuest", "SupermainQuest6", "SupermainQuest9", "SupermainQuest12"]);
  let l = null;
  function c() {
    cv.$notifs.displayHint("enroll");
  }
  function h() {
    n || (t = !0), s.quests[e.id] || (s.quests[e.id] = !0, "Partner" === e.type ? cv.$savestate.incrementVariable("partnerQuestsCompletedCount") : "Side" === e.type && cv.$savestate.incrementVariable("sideQuestsCompletedCount"), cv.$savestate.incrementVariable("questsCompletedCount"), s.dataPoints += r.reward, r.rewardItem && r.rewardItem.unlock(), n || ("Main" === e.type ? cv.$notifs.add("MainQuestCompleted", {
      quest: r
    }) : cv.$notifs.add("QuestCompleted", {
      quest: r
    }), cv.$analytics.event({
      event_category: "coreGame",
      event_action: `${e.id}Completed`,
      event_value: ""
    }), clearTimeout(l), l = setTimeout(c, 100)));
  }
  return r;
}
By.create = Ey;
const Ly = ["isIntroCompleted", "isTutoCompleted", "chestOpenCount", "chestBigOpenCount", "chestNormalOpenCount", "partnerQuestsCompletedCount", "sideQuestsCompletedCount", "questsCompletedCount", "npcEncounteredCount", "visitedIslandCount", "hasVisitedIslandWest"],
  Oy = "./reference/assets/quests_" + window.__DATA.site.locale + ".json";
const Ry = Cs({
    name: "NotificationCenter",
    inheritAttrs: !1,
    setup() {
      const e = cv.$notifications;
      return () => e.currentNotif.value || null;
    }
  }),
  zy = "./reference/assets/character_1.defbe5d265453426.avif",
  Ny = "./reference/assets/character_1.9f5bcc3665453426.png",
  Fy = "./reference/assets/character_1.e1f17f1e65453426.webp",
  Uy = "./reference/assets/character_2.b653730f65453426.avif",
  Hy = "./reference/assets/character_2.d9169e9565453426.png",
  Gy = "./reference/assets/character_2.5bcce01d65453426.webp",
  Vy = "./reference/assets/character_2.ec96b51765453426.xmp",
  Wy = "./reference/assets/character_4.40bdce0c65453426.avif",
  jy = "./reference/assets/character_4.e830b23565453426.png",
  qy = "./reference/assets/character_4.2a25260465453426.webp",
  Zy = {
    color: {
      type: String,
      default: "white",
      validator: e => ["white", "blue", "yellow", "red", "green", "gray", "gray-light"].includes(e)
    },
    sizeDemult: {
      type: Number,
      default: 1
    }
  },
  $y = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [i, n] of t) s[i] = n;
    return s;
  },
  VueValidateComponent = $y({
    __name: "Validate",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => {
        const i = qs("SvgIcon");
        return $i(), Qi("div", {
          class: q(["validate", [t.color]]),
          style: H(`--size-demult: ${t.sizeDemult};`)
        }, [on(i, {
          id: "check",
          class: "check"
        })], 6);
      };
    }
  }, [["__scopeId", "data-v-aebe439d"]]),
  VueCrossComponent = $y({
    __name: "Cross",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => ($i(), Qi("div", {
        class: q(["cross", [t.color]]),
        style: H(`--size-demult: ${t.sizeDemult};`)
      }, [($i(), Qi(Gi, null, Js(2, e => rn("div", {
        key: e,
        class: q(["bar", [`bar-${e}`]])
      }, null, 2)), 64))], 6));
    }
  }, [["__scopeId", "data-v-221e92a9"]]);
const Jy = {};
let Qy = 0;
const VueLazyImageComponent = {
    __name: "LazyImage",
    props: function (e = []) {
      const t = {};
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        if ("string" == typeof i) {
          t[i] = {};
          continue;
        }
        const n = i[0];
        if (null == n) continue;
        const a = t[n] = {};
        null != i[1] && (a.type = i[1]), null != i[2] && (a.default = i[2]), i[3] && (a.required = !0), i[4] && (a.validator = i[4]);
      }
      return t;
    }(["contain", "url", "heightRatio", "backgroundColor", "height", "cacheId", ["alt", String, "Image"]]),
    setup(e, {
      expose: t
    }) {
      const s = e;
      t({
        loaded: function () {
          return a;
        }
      });
      const i = yt(),
        n = yt();
      let a, r, o;
      function l(e) {
        if (clearTimeout(o), !e && Qy > 5) return void (o = setTimeout(l, 100));
        let t = e || n.value;
        t && (Qy++, i.value.classList.remove("loaded"), t.decoding = "async", t.onload = () => {
          Qy--, i.value && i.value.classList.add("loaded"), a.resolve();
        }, t.src = ty.select(s.url), t.alt = s.alt);
      }
      function c() {
        a = io();
        let e = n.value;
        if (s.cacheId) {
          const t = s.url ? ty.select(s.url) : "",
            n = s.cacheId + "_" + t;
          if (!Jy[n]) {
            const e = Jy[n] = document.createElement("img");
            e.draggable = "false", e.decoding = "async", e.setAttribute("draggable", !1), e.ondragstart = e => e.preventDefault();
          }
          const a = i.value.firstChild;
          e = Jy[n], e !== a && i.value.replaceChild(e, a);
        }
        const t = s.url ? ty.select(s.url) : "",
          r = e.src;
        !!(r && r.length && t && t.length && e.src.split("/").pop() === t.split("/").pop()) ? i.value.classList.add("loaded") : l(s.cacheId && e), s.height ? (i.value.style.height = s.height, i.value.style.setProperty("--padding-top", "0px")) : (i.value.style.height = "", i.value.style.setProperty("--padding-top", s.heightRatio || "56.25%")), s.backgroundColor ? i.value.style.backgroundColor = s.backgroundColor : i.value.style.backgroundColor = "";
      }
      return Rs(() => {
        r = hs(s, c, {
          immediate: !0
        });
      }), Fs(() => {
        r && r(), r = null;
      }), (e, t) => ($i(), Qi("figure", {
        ref_key: "figureEl",
        ref: i,
        class: q(["lazy-img", {
          "obj-fit-contain": s.contain,
          "obj-fit-cover": !s.contain
        }])
      }, [s.cacheId ? un("", !0) : ($i(), Qi("img", {
        key: 0,
        ref_key: "imageEl",
        ref: n,
        draggable: "false",
        ondragstart: "return false;",
        decoding: "async"
      }, null, 512))], 2));
    }
  },
  t_ = {
    ...ty.list(Object.assign({
      "./images/icons-64-assets/partner-albert-64.avif": "./reference/assets/neutral-logo-01-64.ead6595365453426.avif",
      "./images/icons-64-assets/partner-albert-64.png": "./reference/assets/neutral-logo-01-64.6eb67eb065453426.png",
      "./images/icons-64-assets/partner-albert-64.webp": "./reference/assets/neutral-logo-01-64.4b6572c965453426.webp",
      "./images/icons-64-assets/partner-aspiration-64.avif": "./reference/assets/tech-company-02-64.ff3c7e1e65453426.avif",
      "./images/icons-64-assets/partner-aspiration-64.png": "./reference/assets/tech-company-02-64.364ee2a765453426.png",
      "./images/icons-64-assets/partner-aspiration-64.webp": "./reference/assets/tech-company-02-64.dde67d1765453426.webp",
      "./images/icons-64-assets/partner-cobble-64.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-cobble-64.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-cobble-64.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-bluevine-64.avif": "./reference/assets/tech-company-04-64.36e65c1665453426.avif",
      "./images/icons-64-assets/partner-bluevine-64.png": "./reference/assets/tech-company-04-64.e37ebaa065453426.png",
      "./images/icons-64-assets/partner-bluevine-64.webp": "./reference/assets/tech-company-04-64.1eddbd7265453426.webp",
      "./images/icons-64-assets/partner-trail-64.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-trail-64.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-trail-64.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-clearly-64.avif": "./reference/assets/neutral-logo-02-64.90f38ade65453426.avif",
      "./images/icons-64-assets/partner-clearly-64.png": "./reference/assets/neutral-logo-02-64.6256486165453426.png",
      "./images/icons-64-assets/partner-clearly-64.webp": "./reference/assets/neutral-logo-02-64.a62bdbd865453426.webp",
      "./images/icons-64-assets/partner-island-64.avif": "./reference/assets/tech-company-14-64.5fb209b365453426.avif",
      "./images/icons-64-assets/partner-island-64.png": "./reference/assets/tech-company-14-64.0f5fdc4365453426.png",
      "./images/icons-64-assets/partner-island-64.webp": "./reference/assets/tech-company-14-64.16598c2465453426.webp",
      "./images/icons-64-assets/partner-ellevest-64.avif": "./reference/assets/neutral-logo-03-64.e6157dfb65453426.avif",
      "./images/icons-64-assets/partner-ellevest-64.png": "./reference/assets/neutral-logo-03-64.11b1e84e65453426.png",
      "./images/icons-64-assets/partner-ellevest-64.webp": "./reference/assets/neutral-logo-03-64.6fa77a0265453426.webp",
      "./images/icons-64-assets/partner-greenwood-64.avif": "./reference/assets/tech-company-05-64.3a4c5a8c65453426.avif",
      "./images/icons-64-assets/partner-greenwood-64.png": "./reference/assets/tech-company-05-64.11d159c265453426.png",
      "./images/icons-64-assets/partner-greenwood-64.webp": "./reference/assets/tech-company-05-64.9e64e7fd65453426.webp",
      "./images/icons-64-assets/partner-kikoff-64.avif": "./reference/assets/tech-company-10-64.bd35f1c665453426.avif",
      "./images/icons-64-assets/partner-kikoff-64.png": "./reference/assets/tech-company-10-64.c398a86265453426.png",
      "./images/icons-64-assets/partner-kikoff-64.webp": "./reference/assets/tech-company-10-64.261e509465453426.webp",
      "./images/icons-64-assets/partner-lendingpoint-64.avif": "./reference/assets/tech-company-13-64.0e708ec065453426.avif",
      "./images/icons-64-assets/partner-lendingpoint-64.png": "./reference/assets/tech-company-13-64.421e03c965453426.png",
      "./images/icons-64-assets/partner-lendingpoint-64.webp": "./reference/assets/tech-company-13-64.b0b9fd2865453426.webp",
      "./images/icons-64-assets/partner-movo-64.avif": "./reference/assets/neutral-logo-04-64.87b52fed65453426.avif",
      "./images/icons-64-assets/partner-movo-64.png": "./reference/assets/neutral-logo-04-64.45b05d9565453426.png",
      "./images/icons-64-assets/partner-movo-64.webp": "./reference/assets/neutral-logo-04-64.0189100265453426.webp",
      "./images/icons-64-assets/partner-one-64.avif": "./reference/assets/tech-company-07-64.bd39973c65453426.avif",
      "./images/icons-64-assets/partner-one-64.png": "./reference/assets/tech-company-07-64.5f60867365453426.png",
      "./images/icons-64-assets/partner-one-64.webp": "./reference/assets/tech-company-07-64.15050d9665453426.webp",
      "./images/icons-64-assets/partner-pylon-64.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-pylon-64.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-pylon-64.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-possible-64.avif": "./reference/assets/tech-company-12-64.4b13ceed65453426.avif",
      "./images/icons-64-assets/partner-possible-64.png": "./reference/assets/tech-company-12-64.35c4d98465453426.png",
      "./images/icons-64-assets/partner-possible-64.webp": "./reference/assets/tech-company-12-64.031f1d8065453426.webp",
      "./images/icons-64-assets/partner-prosper-64.avif": "./reference/assets/tech-company-11-64.bf06800f65453426.avif",
      "./images/icons-64-assets/partner-prosper-64.png": "./reference/assets/tech-company-11-64.18f0439465453426.png",
      "./images/icons-64-assets/partner-prosper-64.webp": "./reference/assets/tech-company-11-64.d971245a65453426.webp",
      "./images/icons-64-assets/partner-sable-64.avif": "./reference/assets/neutral-logo-05-64.e004727e65453426.avif",
      "./images/icons-64-assets/partner-sable-64.png": "./reference/assets/neutral-logo-05-64.92a6250265453426.png",
      "./images/icons-64-assets/partner-sable-64.webp": "./reference/assets/neutral-logo-05-64.9566100a65453426.webp",
      "./images/icons-64-assets/partner-tempkey-64.avif": "./reference/assets/tech-company-15-64.e8d5f99265453426.avif",
      "./images/icons-64-assets/partner-tempkey-64.png": "./reference/assets/tech-company-15-64.f31524ec65453426.png",
      "./images/icons-64-assets/partner-tempkey-64.webp": "./reference/assets/tech-company-15-64.302f9c0765453426.webp",
      "./images/icons-64-assets/partner-till-64.avif": "./reference/assets/tech-company-06-64.07b4d56765453426.avif",
      "./images/icons-64-assets/partner-till-64.png": "./reference/assets/tech-company-06-64.02a240ae65453426.png",
      "./images/icons-64-assets/partner-till-64.webp": "./reference/assets/tech-company-06-64.8fd2e78265453426.webp",
      "./images/icons-64-assets/partner-x1-64.avif": "./reference/assets/tech-company-15-64.e8d5f99265453426.avif",
      "./images/icons-64-assets/partner-x1-64.png": "./reference/assets/tech-company-15-64.f31524ec65453426.png",
      "./images/icons-64-assets/partner-x1-64.webp": "./reference/assets/tech-company-15-64.302f9c0765453426.webp",
      "./images/icons-64-assets/partner-salve-64.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-salve-64.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/partner-salve-64.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-64-assets/interactions-chat-64.avif": "./reference/assets/interactions-chat-64.5cfc2d2265453426.avif",
      "./images/icons-64-assets/interactions-chat-64.png": "./reference/assets/interactions-chat-64.a074754f65453426.png",
      "./images/icons-64-assets/interactions-chat-64.webp": "./reference/assets/interactions-chat-64.61da17c365453426.webp",
      "./images/icons-64-assets/interactions-compass-64.avif": "./reference/assets/interactions-compass-64.d9936afb65453426.avif",
      "./images/icons-64-assets/interactions-compass-64.png": "./reference/assets/interactions-compass-64.83bb266d65453426.png",
      "./images/icons-64-assets/interactions-compass-64.webp": "./reference/assets/interactions-compass-64.8eeaf2f165453426.webp",
      "./images/icons-64-assets/interactions-dice-64.avif": "./reference/assets/interactions-dice-64.10b5f5d365453426.avif",
      "./images/icons-64-assets/interactions-dice-64.png": "./reference/assets/interactions-dice-64.d956bb4665453426.png",
      "./images/icons-64-assets/interactions-dice-64.webp": "./reference/assets/interactions-dice-64.0e91711465453426.webp",
      "./images/icons-64-assets/interactions-disk-64.avif": "./reference/assets/interactions-disk-64.000a710665453426.avif",
      "./images/icons-64-assets/interactions-disk-64.png": "./reference/assets/interactions-disk-64.4d2ab4db65453426.png",
      "./images/icons-64-assets/interactions-disk-64.webp": "./reference/assets/interactions-disk-64.c73e4cc265453426.webp",
      "./images/icons-64-assets/interactions-flag-64.avif": "./reference/assets/interactions-flag-64.1870a9bc65453426.avif",
      "./images/icons-64-assets/interactions-flag-64.png": "./reference/assets/interactions-flag-64.d7ecf10a65453426.png",
      "./images/icons-64-assets/interactions-flag-64.webp": "./reference/assets/interactions-flag-64.c7e6ee2a65453426.webp",
      "./images/icons-64-assets/interactions-hammer-64.avif": "./reference/assets/interactions-hammer-64.069d3c7465453426.avif",
      "./images/icons-64-assets/interactions-hammer-64.png": "./reference/assets/interactions-hammer-64.ba88272d65453426.png",
      "./images/icons-64-assets/interactions-hammer-64.webp": "./reference/assets/interactions-hammer-64.ad929c3d65453426.webp",
      "./images/icons-64-assets/interactions-helmet-64.avif": "./reference/assets/interactions-helmet-64.a6ffee3965453426.avif",
      "./images/icons-64-assets/interactions-helmet-64.png": "./reference/assets/interactions-helmet-64.0a88619465453426.png",
      "./images/icons-64-assets/interactions-helmet-64.webp": "./reference/assets/interactions-helmet-64.fedfa18c65453426.webp",
      "./images/icons-64-assets/interactions-lightbulb-64.avif": "./reference/assets/interactions-lightbulb-64.36c31cb965453426.avif",
      "./images/icons-64-assets/interactions-lightbulb-64.png": "./reference/assets/interactions-lightbulb-64.f298428165453426.png",
      "./images/icons-64-assets/interactions-lightbulb-64.webp": "./reference/assets/interactions-lightbulb-64.f07e3e8265453426.webp",
      "./images/icons-64-assets/interactions-no-64.avif": "./reference/assets/interactions-no-64.c7a7756d65453426.avif",
      "./images/icons-64-assets/interactions-no-64.png": "./reference/assets/interactions-no-64.30a7d42765453426.png",
      "./images/icons-64-assets/interactions-no-64.webp": "./reference/assets/interactions-no-64.b5ea689365453426.webp",
      "./images/icons-64-assets/interactions-resortkey-64.avif": "./reference/assets/interactions-resortkey-64.3d28740e65453426.avif",
      "./images/icons-64-assets/interactions-resortkey-64.png": "./reference/assets/interactions-resortkey-64.2c77c60065453426.png",
      "./images/icons-64-assets/interactions-resortkey-64.webp": "./reference/assets/interactions-resortkey-64.6dd230d465453426.webp",
      "./images/icons-64-assets/interactions-scissor-64.avif": "./reference/assets/interactions-scissor-64.b624c44965453426.avif",
      "./images/icons-64-assets/interactions-scissor-64.png": "./reference/assets/interactions-scissor-64.aadeedf165453426.png",
      "./images/icons-64-assets/interactions-scissor-64.webp": "./reference/assets/interactions-scissor-64.c518d52265453426.webp",
      "./images/icons-64-assets/interactions-screwdriver-64.avif": "./reference/assets/interactions-screwdriver-64.fbf17b7265453426.avif",
      "./images/icons-64-assets/interactions-screwdriver-64.png": "./reference/assets/interactions-screwdriver-64.5efced2265453426.png",
      "./images/icons-64-assets/interactions-screwdriver-64.webp": "./reference/assets/interactions-screwdriver-64.3fa292fc65453426.webp",
      "./images/icons-64-assets/interactions-shears-64.avif": "./reference/assets/interactions-shears-64.8dd005bd65453426.avif",
      "./images/icons-64-assets/interactions-shears-64.png": "./reference/assets/interactions-shears-64.a9882de865453426.png",
      "./images/icons-64-assets/interactions-shears-64.webp": "./reference/assets/interactions-shears-64.88d2d49365453426.webp",
      "./images/icons-64-assets/interactions-stethoscope-64.avif": "./reference/assets/interactions-stethoscope-64.8a36002765453426.avif",
      "./images/icons-64-assets/interactions-stethoscope-64.png": "./reference/assets/interactions-stethoscope-64.3a2fc19665453426.png",
      "./images/icons-64-assets/interactions-stethoscope-64.webp": "./reference/assets/interactions-stethoscope-64.0679cdd865453426.webp",
      "./images/icons-64-assets/interactions-tamtam-64.avif": "./reference/assets/interactions-tamtam-64.ab4a129465453426.avif",
      "./images/icons-64-assets/interactions-tamtam-64.png": "./reference/assets/interactions-tamtam-64.50e555da65453426.png",
      "./images/icons-64-assets/interactions-tamtam-64.webp": "./reference/assets/interactions-tamtam-64.9f43f19565453426.webp",
      "./images/icons-64-assets/interactions-telescope-64.avif": "./reference/assets/interactions-telescope-64.7bc69b3565453426.avif",
      "./images/icons-64-assets/interactions-telescope-64.png": "./reference/assets/interactions-telescope-64.7d80d50d65453426.png",
      "./images/icons-64-assets/interactions-telescope-64.webp": "./reference/assets/interactions-telescope-64.bb710e0665453426.webp",
      "./images/icons-64-assets/interactions-wateringcan-64.avif": "./reference/assets/interactions-wateringcan-64.b0a77eb865453426.avif",
      "./images/icons-64-assets/interactions-wateringcan-64.png": "./reference/assets/interactions-wateringcan-64.8c26502265453426.png",
      "./images/icons-64-assets/interactions-wateringcan-64.webp": "./reference/assets/interactions-wateringcan-64.ffcfb2fe65453426.webp",
      "./images/icons-64-assets/interactions-yes-64.avif": "./reference/assets/interactions-yes-64.2ccbfca665453426.avif",
      "./images/icons-64-assets/interactions-yes-64.png": "./reference/assets/interactions-yes-64.5a058ad365453426.png",
      "./images/icons-64-assets/interactions-yes-64.webp": "./reference/assets/interactions-yes-64.3780d48065453426.webp",
      "./images/icons-64-assets/interactions-zipline-64.avif": "./reference/assets/interactions-zipline-64.c1c22c4a65453426.avif",
      "./images/icons-64-assets/interactions-zipline-64.png": "./reference/assets/interactions-zipline-64.764acf7f65453426.png",
      "./images/icons-64-assets/interactions-zipline-64.webp": "./reference/assets/interactions-zipline-64.859c04c465453426.webp",
      "./images/icons-64-assets/misc-12-64.avif": "./reference/assets/misc-12-64.89fc67d465453426.avif",
      "./images/icons-64-assets/misc-12-64.png": "./reference/assets/misc-12-64.51f8dd1065453426.png",
      "./images/icons-64-assets/misc-12-64.webp": "./reference/assets/misc-12-64.a1f9e15665453426.webp",
      "./images/icons-64-assets/misc-16-64.avif": "./reference/assets/misc-16-64.a684fed265453426.avif",
      "./images/icons-64-assets/misc-16-64.png": "./reference/assets/misc-16-64.4ee14eec65453426.png",
      "./images/icons-64-assets/misc-16-64.webp": "./reference/assets/misc-16-64.c5d7f5e765453426.webp",
      "./images/icons-64-assets/misc-6-64.avif": "./reference/assets/misc-6-64.54faa95e65453426.avif",
      "./images/icons-64-assets/misc-6-64.png": "./reference/assets/misc-6-64.889d7a2d65453426.png",
      "./images/icons-64-assets/misc-6-64.webp": "./reference/assets/misc-6-64.e620b16965453426.webp",
      "./images/icons-64-assets/misc-bike-64.avif": "./reference/assets/misc-bike-64.0d4e876e65453426.avif",
      "./images/icons-64-assets/misc-bike-64.png": "./reference/assets/misc-bike-64.97cd4e0e65453426.png",
      "./images/icons-64-assets/misc-bike-64.webp": "./reference/assets/misc-bike-64.3cd2a82365453426.webp",
      "./images/icons-64-assets/misc-boat-64.avif": "./reference/assets/misc-boat-64.89453f0865453426.avif",
      "./images/icons-64-assets/misc-boat-64.png": "./reference/assets/misc-boat-64.9fc3e76065453426.png",
      "./images/icons-64-assets/misc-boat-64.webp": "./reference/assets/misc-boat-64.e4f0bca665453426.webp",
      "./images/icons-64-assets/misc-boat_alt-64.avif": "./reference/assets/misc-boat_alt-64.0ce87ff965453426.avif",
      "./images/icons-64-assets/misc-boat_alt-64.png": "./reference/assets/misc-boat_alt-64.b5d0a94e65453426.png",
      "./images/icons-64-assets/misc-boat_alt-64.webp": "./reference/assets/misc-boat_alt-64.22841e8e65453426.webp",
      "./images/icons-64-assets/misc-car-64.avif": "./reference/assets/misc-car-64.c28809bf65453426.avif",
      "./images/icons-64-assets/misc-car-64.png": "./reference/assets/misc-car-64.91fd5b5365453426.png",
      "./images/icons-64-assets/misc-car-64.webp": "./reference/assets/misc-car-64.e4fd40be65453426.webp",
      "./images/icons-64-assets/misc-clock-64.avif": "./reference/assets/misc-clock-64.57a677f865453426.avif",
      "./images/icons-64-assets/misc-clock-64.png": "./reference/assets/misc-clock-64.fdfdb69365453426.png",
      "./images/icons-64-assets/misc-clock-64.webp": "./reference/assets/misc-clock-64.9b8c48f465453426.webp",
      "./images/icons-64-assets/misc-floppy-64.avif": "./reference/assets/misc-floppy-64.cc943d9965453426.avif",
      "./images/icons-64-assets/misc-floppy-64.png": "./reference/assets/misc-floppy-64.679f50c765453426.png",
      "./images/icons-64-assets/misc-floppy-64.webp": "./reference/assets/misc-floppy-64.f6350abc65453426.webp",
      "./images/icons-64-assets/misc-jetski-64.avif": "./reference/assets/misc-jetski-64.50ebd82f65453426.avif",
      "./images/icons-64-assets/misc-jetski-64.png": "./reference/assets/misc-jetski-64.5fe154e265453426.png",
      "./images/icons-64-assets/misc-jetski-64.webp": "./reference/assets/misc-jetski-64.b757114a65453426.webp",
      "./images/icons-64-assets/misc-star-64.avif": "./reference/assets/misc-star-64.5945844265453426.avif",
      "./images/icons-64-assets/misc-star-64.png": "./reference/assets/misc-star-64.28410afd65453426.png",
      "./images/icons-64-assets/misc-star-64.webp": "./reference/assets/misc-star-64.30ad8de965453426.webp",
      "./images/icons-64-assets/misc-taxi-64.avif": "./reference/assets/misc-taxi-64.3ffa0c2565453426.avif",
      "./images/icons-64-assets/misc-taxi-64.png": "./reference/assets/misc-taxi-64.f1e09bf865453426.png",
      "./images/icons-64-assets/misc-taxi-64.webp": "./reference/assets/misc-taxi-64.c3af2dc665453426.webp",
      "./images/icons-64-assets/phone-customization-64.avif": "./reference/assets/phone-customization-64.e87662da65453426.avif",
      "./images/icons-64-assets/phone-customization-64.png": "./reference/assets/phone-customization-64.278bdfd465453426.png",
      "./images/icons-64-assets/phone-customization-64.webp": "./reference/assets/phone-customization-64.ab5ab30d65453426.webp",
      "./images/icons-64-assets/phone-partner-64.avif": "./reference/assets/phone-tech-company-64.384003b765453426.avif",
      "./images/icons-64-assets/phone-partner-64.png": "./reference/assets/phone-tech-company-64.4378bf3b65453426.png",
      "./images/icons-64-assets/phone-partner-64.webp": "./reference/assets/phone-tech-company-64.07f1696c65453426.webp",
      "./images/icons-64-assets/phone-map-64.avif": "./reference/assets/phone-map-64.a97628e265453426.avif",
      "./images/icons-64-assets/phone-map-64.png": "./reference/assets/phone-map-64.239ee0c665453426.png",
      "./images/icons-64-assets/phone-map-64.webp": "./reference/assets/phone-map-64.44ff4d8a65453426.webp",
      "./images/icons-64-assets/phone-point-64.avif": "./reference/assets/phone-point-64.3c3562a865453426.avif",
      "./images/icons-64-assets/phone-point-64.png": "./reference/assets/phone-point-64.5bb62ea165453426.png",
      "./images/icons-64-assets/phone-point-64.webp": "./reference/assets/phone-point-64.107ddc9b65453426.webp",
      "./images/icons-64-assets/phone-quest-64.avif": "./reference/assets/phone-quest-64.b3e8adf065453426.avif",
      "./images/icons-64-assets/phone-quest-64.png": "./reference/assets/phone-quest-64.035430bd65453426.png",
      "./images/icons-64-assets/phone-quest-64.webp": "./reference/assets/phone-quest-64.2b41bf0865453426.webp"
    })),
    ...ty.list(Object.assign({
      "./images/icons-128-assets/partner-albert-128.avif": "./reference/assets/neutral-logo-01-128.de4b38ba65453426.avif",
      "./images/icons-128-assets/partner-albert-128.png": "./reference/assets/neutral-logo-01-128.4460f17765453426.png",
      "./images/icons-128-assets/partner-albert-128.webp": "./reference/assets/neutral-logo-01-128.9ba646ee65453426.webp",
      "./images/icons-128-assets/partner-aspiration-128.avif": "./reference/assets/tech-company-02-128.87f62e8b65453426.avif",
      "./images/icons-128-assets/partner-aspiration-128.png": "./reference/assets/tech-company-02-128.1418db9265453426.png",
      "./images/icons-128-assets/partner-aspiration-128.webp": "./reference/assets/tech-company-02-128.69402b9665453426.webp",
      "./images/icons-128-assets/partner-cobble-128.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-cobble-128.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-cobble-128.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-bluevine-128.avif": "./reference/assets/tech-company-04-128.c08ed0de65453426.avif",
      "./images/icons-128-assets/partner-bluevine-128.png": "./reference/assets/tech-company-04-128.4fe9050165453426.png",
      "./images/icons-128-assets/partner-bluevine-128.webp": "./reference/assets/tech-company-04-128.ef19554365453426.webp",
      "./images/icons-128-assets/partner-trail-128.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-trail-128.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-trail-128.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-clearly-128.avif": "./reference/assets/neutral-logo-02-128.27c20ba965453426.avif",
      "./images/icons-128-assets/partner-clearly-128.png": "./reference/assets/neutral-logo-02-128.8dbe847d65453426.png",
      "./images/icons-128-assets/partner-clearly-128.webp": "./reference/assets/neutral-logo-02-128.a06704a365453426.webp",
      "./images/icons-128-assets/partner-island-128.avif": "./reference/assets/tech-company-14-128.2021149e65453426.avif",
      "./images/icons-128-assets/partner-island-128.png": "./reference/assets/tech-company-14-128.62ba3af865453426.png",
      "./images/icons-128-assets/partner-island-128.webp": "./reference/assets/tech-company-14-128.6cde30cd65453426.webp",
      "./images/icons-128-assets/partner-ellevest-128.avif": "./reference/assets/neutral-logo-03-128.7e3e6f8b65453426.avif",
      "./images/icons-128-assets/partner-ellevest-128.png": "./reference/assets/neutral-logo-03-128.3ab995f665453426.png",
      "./images/icons-128-assets/partner-ellevest-128.webp": "./reference/assets/neutral-logo-03-128.954516d565453426.webp",
      "./images/icons-128-assets/partner-greenwood-128.avif": "./reference/assets/tech-company-05-128.c52bb67665453426.avif",
      "./images/icons-128-assets/partner-greenwood-128.png": "./reference/assets/tech-company-05-128.940314d265453426.png",
      "./images/icons-128-assets/partner-greenwood-128.webp": "./reference/assets/tech-company-05-128.d63d12fe65453426.webp",
      "./images/icons-128-assets/partner-kikoff-128.avif": "./reference/assets/tech-company-10-128.5f86306065453426.avif",
      "./images/icons-128-assets/partner-kikoff-128.png": "./reference/assets/tech-company-10-128.bad33ac165453426.png",
      "./images/icons-128-assets/partner-kikoff-128.webp": "./reference/assets/tech-company-10-128.16401dd265453426.webp",
      "./images/icons-128-assets/partner-lendingpoint-128.avif": "./reference/assets/tech-company-13-128.f187594a65453426.avif",
      "./images/icons-128-assets/partner-lendingpoint-128.png": "./reference/assets/tech-company-13-128.83cfe91565453426.png",
      "./images/icons-128-assets/partner-lendingpoint-128.webp": "./reference/assets/tech-company-13-128.81e9baec65453426.webp",
      "./images/icons-128-assets/partner-movo-128.avif": "./reference/assets/neutral-logo-04-128.b131d5d865453426.avif",
      "./images/icons-128-assets/partner-movo-128.png": "./reference/assets/neutral-logo-04-128.b1e47a1065453426.png",
      "./images/icons-128-assets/partner-movo-128.webp": "./reference/assets/neutral-logo-04-128.170cf74c65453426.webp",
      "./images/icons-128-assets/partner-one-128.avif": "./reference/assets/tech-company-07-128.9fa2c8b465453426.avif",
      "./images/icons-128-assets/partner-one-128.png": "./reference/assets/tech-company-07-128.b8ab9f8365453426.png",
      "./images/icons-128-assets/partner-one-128.webp": "./reference/assets/tech-company-07-128.770b9e7665453426.webp",
      "./images/icons-128-assets/partner-pylon-128.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-pylon-128.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-pylon-128.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-possible-128.avif": "./reference/assets/tech-company-12-128.ed7a126565453426.avif",
      "./images/icons-128-assets/partner-possible-128.png": "./reference/assets/tech-company-12-128.16afb76e65453426.png",
      "./images/icons-128-assets/partner-possible-128.webp": "./reference/assets/tech-company-12-128.81833dfc65453426.webp",
      "./images/icons-128-assets/partner-prosper-128.avif": "./reference/assets/tech-company-11-128.2eb272ff65453426.avif",
      "./images/icons-128-assets/partner-prosper-128.png": "./reference/assets/tech-company-11-128.a96a09b765453426.png",
      "./images/icons-128-assets/partner-prosper-128.webp": "./reference/assets/tech-company-11-128.4b5c812d65453426.webp",
      "./images/icons-128-assets/partner-sable-128.avif": "./reference/assets/neutral-logo-05-128.346f03cd65453426.avif",
      "./images/icons-128-assets/partner-sable-128.png": "./reference/assets/neutral-logo-05-128.3640277e65453426.png",
      "./images/icons-128-assets/partner-sable-128.webp": "./reference/assets/neutral-logo-05-128.05b8f40565453426.webp",
      "./images/icons-128-assets/partner-tempkey-128.avif": "./reference/assets/tech-company-15-128.11a6dea265453426.avif",
      "./images/icons-128-assets/partner-tempkey-128.png": "./reference/assets/tech-company-15-128.700472bc65453426.png",
      "./images/icons-128-assets/partner-tempkey-128.webp": "./reference/assets/tech-company-15-128.d0a8b49465453426.webp",
      "./images/icons-128-assets/partner-till-128.avif": "./reference/assets/tech-company-06-128.9181c6d465453426.avif",
      "./images/icons-128-assets/partner-till-128.png": "./reference/assets/tech-company-06-128.0305348765453426.png",
      "./images/icons-128-assets/partner-till-128.webp": "./reference/assets/tech-company-06-128.db09bcd965453426.webp",
      "./images/icons-128-assets/partner-x1-128.avif": "./reference/assets/tech-company-15-128.11a6dea265453426.avif",
      "./images/icons-128-assets/partner-x1-128.png": "./reference/assets/tech-company-15-128.700472bc65453426.png",
      "./images/icons-128-assets/partner-x1-128.webp": "./reference/assets/tech-company-15-128.d0a8b49465453426.webp",
      "./images/icons-128-assets/partner-salve-128.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-salve-128.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/partner-salve-128.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-128-assets/interactions-chat-128.avif": "./reference/assets/interactions-chat-128.f72aa81265453426.avif",
      "./images/icons-128-assets/interactions-chat-128.png": "./reference/assets/interactions-chat-128.883465ce65453426.png",
      "./images/icons-128-assets/interactions-chat-128.webp": "./reference/assets/interactions-chat-128.810d03c465453426.webp",
      "./images/icons-128-assets/interactions-compass-128.avif": "./reference/assets/interactions-compass-128.a6c1745865453426.avif",
      "./images/icons-128-assets/interactions-compass-128.png": "./reference/assets/interactions-compass-128.98d8bb7165453426.png",
      "./images/icons-128-assets/interactions-compass-128.webp": "./reference/assets/interactions-compass-128.c831b36065453426.webp",
      "./images/icons-128-assets/interactions-dice-128.avif": "./reference/assets/interactions-dice-128.1b1f5f8465453426.avif",
      "./images/icons-128-assets/interactions-dice-128.png": "./reference/assets/interactions-dice-128.ef57c34f65453426.png",
      "./images/icons-128-assets/interactions-dice-128.webp": "./reference/assets/interactions-dice-128.809a715065453426.webp",
      "./images/icons-128-assets/interactions-disk-128.avif": "./reference/assets/interactions-disk-128.9f8f4dad65453426.avif",
      "./images/icons-128-assets/interactions-disk-128.png": "./reference/assets/interactions-disk-128.ca04ed3865453426.png",
      "./images/icons-128-assets/interactions-disk-128.webp": "./reference/assets/interactions-disk-128.02126e0165453426.webp",
      "./images/icons-128-assets/interactions-flag-128.avif": "./reference/assets/interactions-flag-128.faed82d265453426.avif",
      "./images/icons-128-assets/interactions-flag-128.png": "./reference/assets/interactions-flag-128.2636644265453426.png",
      "./images/icons-128-assets/interactions-flag-128.webp": "./reference/assets/interactions-flag-128.bf73611f65453426.webp",
      "./images/icons-128-assets/interactions-hammer-128.avif": "./reference/assets/interactions-hammer-128.2d636d1265453426.avif",
      "./images/icons-128-assets/interactions-hammer-128.png": "./reference/assets/interactions-hammer-128.fc81056865453426.png",
      "./images/icons-128-assets/interactions-hammer-128.webp": "./reference/assets/interactions-hammer-128.87b6c2a465453426.webp",
      "./images/icons-128-assets/interactions-helmet-128.avif": "./reference/assets/interactions-helmet-128.5f4f766365453426.avif",
      "./images/icons-128-assets/interactions-helmet-128.png": "./reference/assets/interactions-helmet-128.58ce494965453426.png",
      "./images/icons-128-assets/interactions-helmet-128.webp": "./reference/assets/interactions-helmet-128.dae49b6b65453426.webp",
      "./images/icons-128-assets/interactions-lightbulb-128.avif": "./reference/assets/interactions-lightbulb-128.0c84be6565453426.avif",
      "./images/icons-128-assets/interactions-lightbulb-128.png": "./reference/assets/interactions-lightbulb-128.1ef6290465453426.png",
      "./images/icons-128-assets/interactions-lightbulb-128.webp": "./reference/assets/interactions-lightbulb-128.3588e8d565453426.webp",
      "./images/icons-128-assets/interactions-no-128.avif": "./reference/assets/interactions-no-128.8413aaac65453426.avif",
      "./images/icons-128-assets/interactions-no-128.png": "./reference/assets/interactions-no-128.c5369bc365453426.png",
      "./images/icons-128-assets/interactions-no-128.webp": "./reference/assets/interactions-no-128.67f01a7d65453426.webp",
      "./images/icons-128-assets/interactions-resortkey-128.avif": "./reference/assets/interactions-resortkey-128.5173740f65453426.avif",
      "./images/icons-128-assets/interactions-resortkey-128.png": "./reference/assets/interactions-resortkey-128.aba7132065453426.png",
      "./images/icons-128-assets/interactions-resortkey-128.webp": "./reference/assets/interactions-resortkey-128.5c1fc87665453426.webp",
      "./images/icons-128-assets/interactions-scissor-128.avif": "./reference/assets/interactions-scissor-128.f20951e365453426.avif",
      "./images/icons-128-assets/interactions-scissor-128.png": "./reference/assets/interactions-scissor-128.6bc103d165453426.png",
      "./images/icons-128-assets/interactions-scissor-128.webp": "./reference/assets/interactions-scissor-128.0867a37a65453426.webp",
      "./images/icons-128-assets/interactions-screwdriver-128.avif": "./reference/assets/interactions-screwdriver-128.1023f9e165453426.avif",
      "./images/icons-128-assets/interactions-screwdriver-128.png": "./reference/assets/interactions-screwdriver-128.ee24455465453426.png",
      "./images/icons-128-assets/interactions-screwdriver-128.webp": "./reference/assets/interactions-screwdriver-128.f461d99d65453426.webp",
      "./images/icons-128-assets/interactions-shears-128.avif": "./reference/assets/interactions-shears-128.897c555865453426.avif",
      "./images/icons-128-assets/interactions-shears-128.png": "./reference/assets/interactions-shears-128.3177517865453426.png",
      "./images/icons-128-assets/interactions-shears-128.webp": "./reference/assets/interactions-shears-128.f961f55e65453426.webp",
      "./images/icons-128-assets/interactions-stethoscope-128.avif": "./reference/assets/interactions-stethoscope-128.0c282f4165453426.avif",
      "./images/icons-128-assets/interactions-stethoscope-128.png": "./reference/assets/interactions-stethoscope-128.045903b765453426.png",
      "./images/icons-128-assets/interactions-stethoscope-128.webp": "./reference/assets/interactions-stethoscope-128.cad88b6a65453426.webp",
      "./images/icons-128-assets/interactions-tamtam-128.avif": "./reference/assets/interactions-tamtam-128.a82efda465453426.avif",
      "./images/icons-128-assets/interactions-tamtam-128.png": "./reference/assets/interactions-tamtam-128.aa151a3b65453426.png",
      "./images/icons-128-assets/interactions-tamtam-128.webp": "./reference/assets/interactions-tamtam-128.3b5d848865453426.webp",
      "./images/icons-128-assets/interactions-telescope-128.avif": "./reference/assets/interactions-telescope-128.5971c55d65453426.avif",
      "./images/icons-128-assets/interactions-telescope-128.png": "./reference/assets/interactions-telescope-128.14ccc96065453426.png",
      "./images/icons-128-assets/interactions-telescope-128.webp": "./reference/assets/interactions-telescope-128.e6240d0365453426.webp",
      "./images/icons-128-assets/interactions-wateringcan-128.avif": "./reference/assets/interactions-wateringcan-128.e1cc3b2865453426.avif",
      "./images/icons-128-assets/interactions-wateringcan-128.png": "./reference/assets/interactions-wateringcan-128.d170fdeb65453426.png",
      "./images/icons-128-assets/interactions-wateringcan-128.webp": "./reference/assets/interactions-wateringcan-128.a855e87865453426.webp",
      "./images/icons-128-assets/interactions-yes-128.avif": "./reference/assets/interactions-yes-128.cbf4ba4965453426.avif",
      "./images/icons-128-assets/interactions-yes-128.png": "./reference/assets/interactions-yes-128.0bb2703b65453426.png",
      "./images/icons-128-assets/interactions-yes-128.webp": "./reference/assets/interactions-yes-128.fe5cab9865453426.webp",
      "./images/icons-128-assets/interactions-zipline-128.avif": "./reference/assets/interactions-zipline-128.28f1a35065453426.avif",
      "./images/icons-128-assets/interactions-zipline-128.png": "./reference/assets/interactions-zipline-128.ca262c7465453426.png",
      "./images/icons-128-assets/interactions-zipline-128.webp": "./reference/assets/interactions-zipline-128.2a33c20165453426.webp",
      "./images/icons-128-assets/misc-12-128.avif": "./reference/assets/misc-12-128.3a271bc065453426.avif",
      "./images/icons-128-assets/misc-12-128.png": "./reference/assets/misc-12-128.f6845ede65453426.png",
      "./images/icons-128-assets/misc-12-128.webp": "./reference/assets/misc-12-128.94fff1c465453426.webp",
      "./images/icons-128-assets/misc-16-128.avif": "./reference/assets/misc-16-128.12c2a66d65453426.avif",
      "./images/icons-128-assets/misc-16-128.png": "./reference/assets/misc-16-128.d434db2d65453426.png",
      "./images/icons-128-assets/misc-16-128.webp": "./reference/assets/misc-16-128.d5bfc4e465453426.webp",
      "./images/icons-128-assets/misc-6-128.avif": "./reference/assets/misc-6-128.fc1a0b9965453426.avif",
      "./images/icons-128-assets/misc-6-128.png": "./reference/assets/misc-6-128.aba54b8065453426.png",
      "./images/icons-128-assets/misc-6-128.webp": "./reference/assets/misc-6-128.13c44e8e65453426.webp",
      "./images/icons-128-assets/misc-bike-128.avif": "./reference/assets/misc-bike-128.c4248dc565453426.avif",
      "./images/icons-128-assets/misc-bike-128.png": "./reference/assets/misc-bike-128.68b7cc1965453426.png",
      "./images/icons-128-assets/misc-bike-128.webp": "./reference/assets/misc-bike-128.acbbc4ba65453426.webp",
      "./images/icons-128-assets/misc-boat-128.avif": "./reference/assets/misc-boat-128.ec917f8565453426.avif",
      "./images/icons-128-assets/misc-boat-128.png": "./reference/assets/misc-boat-128.807b215865453426.png",
      "./images/icons-128-assets/misc-boat-128.webp": "./reference/assets/misc-boat-128.9f90523865453426.webp",
      "./images/icons-128-assets/misc-boat_alt-128.avif": "./reference/assets/misc-boat_alt-128.69271aa065453426.avif",
      "./images/icons-128-assets/misc-boat_alt-128.png": "./reference/assets/misc-boat_alt-128.5229ae2d65453426.png",
      "./images/icons-128-assets/misc-boat_alt-128.webp": "./reference/assets/misc-boat_alt-128.8cf9f38965453426.webp",
      "./images/icons-128-assets/misc-car-128.avif": "./reference/assets/misc-car-128.5e46341765453426.avif",
      "./images/icons-128-assets/misc-car-128.png": "./reference/assets/misc-car-128.fdabbe9965453426.png",
      "./images/icons-128-assets/misc-car-128.webp": "./reference/assets/misc-car-128.63b26b1065453426.webp",
      "./images/icons-128-assets/misc-clock-128.avif": "./reference/assets/misc-clock-128.29b2c5d265453426.avif",
      "./images/icons-128-assets/misc-clock-128.png": "./reference/assets/misc-clock-128.ac46ad9d65453426.png",
      "./images/icons-128-assets/misc-clock-128.webp": "./reference/assets/misc-clock-128.c9b4fd6f65453426.webp",
      "./images/icons-128-assets/misc-floppy-128.avif": "./reference/assets/misc-floppy-128.427c02b965453426.avif",
      "./images/icons-128-assets/misc-floppy-128.png": "./reference/assets/misc-floppy-128.f2395bc865453426.png",
      "./images/icons-128-assets/misc-floppy-128.webp": "./reference/assets/misc-floppy-128.216408ac65453426.webp",
      "./images/icons-128-assets/misc-jetski-128.avif": "./reference/assets/misc-jetski-128.d58c26e565453426.avif",
      "./images/icons-128-assets/misc-jetski-128.png": "./reference/assets/misc-jetski-128.aa7c5bd565453426.png",
      "./images/icons-128-assets/misc-jetski-128.webp": "./reference/assets/misc-jetski-128.84da85b565453426.webp",
      "./images/icons-128-assets/misc-star-128.avif": "./reference/assets/misc-star-128.bb500ea865453426.avif",
      "./images/icons-128-assets/misc-star-128.png": "./reference/assets/misc-star-128.9c51929d65453426.png",
      "./images/icons-128-assets/misc-star-128.webp": "./reference/assets/misc-star-128.d567442a65453426.webp",
      "./images/icons-128-assets/misc-taxi-128.avif": "./reference/assets/misc-taxi-128.ef10c96f65453426.avif",
      "./images/icons-128-assets/misc-taxi-128.png": "./reference/assets/misc-taxi-128.b460e6de65453426.png",
      "./images/icons-128-assets/misc-taxi-128.webp": "./reference/assets/misc-taxi-128.cae42e3765453426.webp",
      "./images/icons-128-assets/phone-customization-128.avif": "./reference/assets/phone-customization-128.7538481565453426.avif",
      "./images/icons-128-assets/phone-customization-128.png": "./reference/assets/phone-customization-128.4d4c52f065453426.png",
      "./images/icons-128-assets/phone-customization-128.webp": "./reference/assets/phone-customization-128.acae106d65453426.webp",
      "./images/icons-128-assets/phone-partner-128.avif": "./reference/assets/phone-tech-company-128.12cc9ab965453426.avif",
      "./images/icons-128-assets/phone-partner-128.png": "./reference/assets/phone-tech-company-128.aa0939a665453426.png",
      "./images/icons-128-assets/phone-partner-128.webp": "./reference/assets/phone-tech-company-128.32dfabac65453426.webp",
      "./images/icons-128-assets/phone-map-128.avif": "./reference/assets/phone-map-128.9d96132f65453426.avif",
      "./images/icons-128-assets/phone-map-128.png": "./reference/assets/phone-map-128.ded47f3d65453426.png",
      "./images/icons-128-assets/phone-map-128.webp": "./reference/assets/phone-map-128.b92f754d65453426.webp",
      "./images/icons-128-assets/phone-point-128.avif": "./reference/assets/phone-point-128.9015a99765453426.avif",
      "./images/icons-128-assets/phone-point-128.png": "./reference/assets/phone-point-128.d4fca96b65453426.png",
      "./images/icons-128-assets/phone-point-128.webp": "./reference/assets/phone-point-128.d0e4a83665453426.webp",
      "./images/icons-128-assets/phone-quest-128.avif": "./reference/assets/phone-quest-128.3056aaa865453426.avif",
      "./images/icons-128-assets/phone-quest-128.png": "./reference/assets/phone-quest-128.e8ae773c65453426.png",
      "./images/icons-128-assets/phone-quest-128.webp": "./reference/assets/phone-quest-128.b3b42f2e65453426.webp"
    })),
    ...ty.list(Object.assign({
      "./images/icons-256-assets/partner-albert-256.avif": "./reference/assets/neutral-logo-01-256.b4319afe65453426.avif",
      "./images/icons-256-assets/partner-albert-256.png": "./reference/assets/neutral-logo-01-256.ed9d879465453426.png",
      "./images/icons-256-assets/partner-albert-256.webp": "./reference/assets/neutral-logo-01-256.303496bd65453426.webp",
      "./images/icons-256-assets/partner-aspiration-256.avif": "./reference/assets/tech-company-02-256.f332167c65453426.avif",
      "./images/icons-256-assets/partner-aspiration-256.png": "./reference/assets/tech-company-02-256.6a316b5365453426.png",
      "./images/icons-256-assets/partner-aspiration-256.webp": "./reference/assets/tech-company-02-256.fc129b6c65453426.webp",
      "./images/icons-256-assets/partner-cobble-256.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-cobble-256.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-cobble-256.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-bluevine-256.avif": "./reference/assets/tech-company-04-256.0a5c772a65453426.avif",
      "./images/icons-256-assets/partner-bluevine-256.png": "./reference/assets/tech-company-04-256.0e5e14d465453426.png",
      "./images/icons-256-assets/partner-bluevine-256.webp": "./reference/assets/tech-company-04-256.c003fa7065453426.webp",
      "./images/icons-256-assets/partner-trail-256.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-trail-256.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-trail-256.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-clearly-256.avif": "./reference/assets/neutral-logo-02-256.91c48e3a65453426.avif",
      "./images/icons-256-assets/partner-clearly-256.png": "./reference/assets/neutral-logo-02-256.2de2e7dd65453426.png",
      "./images/icons-256-assets/partner-clearly-256.webp": "./reference/assets/neutral-logo-02-256.a2c2e92f65453426.webp",
      "./images/icons-256-assets/partner-island-256.avif": "./reference/assets/tech-company-14-256.3486687465453426.avif",
      "./images/icons-256-assets/partner-island-256.png": "./reference/assets/tech-company-14-256.9793f8cd65453426.png",
      "./images/icons-256-assets/partner-island-256.webp": "./reference/assets/tech-company-14-256.d0a06b2465453426.webp",
      "./images/icons-256-assets/partner-ellevest-256.avif": "./reference/assets/neutral-logo-03-256.22c45f7065453426.avif",
      "./images/icons-256-assets/partner-ellevest-256.png": "./reference/assets/neutral-logo-03-256.54248a8365453426.png",
      "./images/icons-256-assets/partner-ellevest-256.webp": "./reference/assets/neutral-logo-03-256.b8da0b9465453426.webp",
      "./images/icons-256-assets/partner-greenwood-256.avif": "./reference/assets/tech-company-05-256.053a64cf65453426.avif",
      "./images/icons-256-assets/partner-greenwood-256.png": "./reference/assets/tech-company-05-256.98b61a9b65453426.png",
      "./images/icons-256-assets/partner-greenwood-256.webp": "./reference/assets/tech-company-05-256.349ed46665453426.webp",
      "./images/icons-256-assets/partner-kikoff-256.avif": "./reference/assets/tech-company-10-256.2d4ad1a265453426.avif",
      "./images/icons-256-assets/partner-kikoff-256.png": "./reference/assets/tech-company-10-256.63d7383a65453426.png",
      "./images/icons-256-assets/partner-kikoff-256.webp": "./reference/assets/tech-company-10-256.6e999b0b65453426.webp",
      "./images/icons-256-assets/partner-lendingpoint-256.avif": "./reference/assets/tech-company-13-256.d0fd4b0d65453426.avif",
      "./images/icons-256-assets/partner-lendingpoint-256.png": "./reference/assets/tech-company-13-256.138b41a065453426.png",
      "./images/icons-256-assets/partner-lendingpoint-256.webp": "./reference/assets/tech-company-13-256.ce6f605b65453426.webp",
      "./images/icons-256-assets/partner-movo-256.avif": "./reference/assets/neutral-logo-04-256.5ad33c4965453426.avif",
      "./images/icons-256-assets/partner-movo-256.png": "./reference/assets/neutral-logo-04-256.a4ccec6965453426.png",
      "./images/icons-256-assets/partner-movo-256.webp": "./reference/assets/neutral-logo-04-256.bb60a18065453426.webp",
      "./images/icons-256-assets/partner-one-256.avif": "./reference/assets/tech-company-07-256.cc8aca3b65453426.avif",
      "./images/icons-256-assets/partner-one-256.png": "./reference/assets/tech-company-07-256.e03b488f65453426.png",
      "./images/icons-256-assets/partner-one-256.webp": "./reference/assets/tech-company-07-256.c206f53365453426.webp",
      "./images/icons-256-assets/partner-pylon-256.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-pylon-256.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-pylon-256.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-possible-256.avif": "./reference/assets/tech-company-12-256.5a9de05265453426.avif",
      "./images/icons-256-assets/partner-possible-256.png": "./reference/assets/tech-company-12-256.e07f19a565453426.png",
      "./images/icons-256-assets/partner-possible-256.webp": "./reference/assets/tech-company-12-256.e5a46a5165453426.webp",
      "./images/icons-256-assets/partner-prosper-256.avif": "./reference/assets/tech-company-11-256.729fdba665453426.avif",
      "./images/icons-256-assets/partner-prosper-256.png": "./reference/assets/tech-company-11-256.8452889f65453426.png",
      "./images/icons-256-assets/partner-prosper-256.webp": "./reference/assets/tech-company-11-256.a7145d5f65453426.webp",
      "./images/icons-256-assets/partner-sable-256.avif": "./reference/assets/neutral-logo-05-256.983ffa4165453426.avif",
      "./images/icons-256-assets/partner-sable-256.png": "./reference/assets/neutral-logo-05-256.497035a365453426.png",
      "./images/icons-256-assets/partner-sable-256.webp": "./reference/assets/neutral-logo-05-256.c3d2625165453426.webp",
      "./images/icons-256-assets/partner-tempkey-256.avif": "./reference/assets/tech-company-15-256.fc3e3d2765453426.avif",
      "./images/icons-256-assets/partner-tempkey-256.png": "./reference/assets/tech-company-16-256.e33b46e165453426.png",
      "./images/icons-256-assets/partner-tempkey-256.webp": "./reference/assets/tech-company-15-256.b2e71e5b65453426.webp",
      "./images/icons-256-assets/partner-till-256.avif": "./reference/assets/tech-company-06-256.d2015b2b65453426.avif",
      "./images/icons-256-assets/partner-till-256.png": "./reference/assets/tech-company-06-256.16a56ecd65453426.png",
      "./images/icons-256-assets/partner-till-256.webp": "./reference/assets/tech-company-06-256.c0c1e3c865453426.webp",
      "./images/icons-256-assets/partner-x1-256.avif": "./reference/assets/tech-company-15-256.fc3e3d2765453426.avif",
      "./images/icons-256-assets/partner-x1-256.png": "./reference/assets/tech-company-15-256.ffa5027065453426.png",
      "./images/icons-256-assets/partner-x1-256.webp": "./reference/assets/tech-company-15-256.b2e71e5b65453426.webp",
      "./images/icons-256-assets/partner-salve-256.avif": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-salve-256.png": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/partner-salve-256.webp": "./reference/assets/blank-tech-company.png",
      "./images/icons-256-assets/interactions-chat-256.avif": "./reference/assets/interactions-chat-256.151b77b265453426.avif",
      "./images/icons-256-assets/interactions-chat-256.png": "./reference/assets/interactions-chat-256.0efd80db65453426.png",
      "./images/icons-256-assets/interactions-chat-256.webp": "./reference/assets/interactions-chat-256.45637d5c65453426.webp",
      "./images/icons-256-assets/interactions-compass-256.avif": "./reference/assets/interactions-compass-256.1d18b49265453426.avif",
      "./images/icons-256-assets/interactions-compass-256.png": "./reference/assets/interactions-compass-256.fe3c256b65453426.png",
      "./images/icons-256-assets/interactions-compass-256.webp": "./reference/assets/interactions-compass-256.5e16cd4465453426.webp",
      "./images/icons-256-assets/interactions-dice-256.avif": "./reference/assets/interactions-dice-256.c8fac38565453426.avif",
      "./images/icons-256-assets/interactions-dice-256.png": "./reference/assets/interactions-dice-256.7020612365453426.png",
      "./images/icons-256-assets/interactions-dice-256.webp": "./reference/assets/interactions-dice-256.a21ad0d765453426.webp",
      "./images/icons-256-assets/interactions-disk-256.avif": "./reference/assets/interactions-disk-256.15faee8b65453426.avif",
      "./images/icons-256-assets/interactions-disk-256.png": "./reference/assets/interactions-disk-256.dcdb5af565453426.png",
      "./images/icons-256-assets/interactions-disk-256.webp": "./reference/assets/interactions-disk-256.ed71085865453426.webp",
      "./images/icons-256-assets/interactions-flag-256.avif": "./reference/assets/interactions-flag-256.2f5e2fb465453426.avif",
      "./images/icons-256-assets/interactions-flag-256.png": "./reference/assets/interactions-flag-256.4e166eb265453426.png",
      "./images/icons-256-assets/interactions-flag-256.webp": "./reference/assets/interactions-flag-256.0fc5d41365453426.webp",
      "./images/icons-256-assets/interactions-hammer-256.avif": "./reference/assets/interactions-hammer-256.060a093365453426.avif",
      "./images/icons-256-assets/interactions-hammer-256.png": "./reference/assets/interactions-hammer-256.d3a623ef65453426.png",
      "./images/icons-256-assets/interactions-hammer-256.webp": "./reference/assets/interactions-hammer-256.3d46857465453426.webp",
      "./images/icons-256-assets/interactions-helmet-256.avif": "./reference/assets/interactions-helmet-256.a46d666f65453426.avif",
      "./images/icons-256-assets/interactions-helmet-256.png": "./reference/assets/interactions-helmet-256.afa5cfed65453426.png",
      "./images/icons-256-assets/interactions-helmet-256.webp": "./reference/assets/interactions-helmet-256.6cc37ace65453426.webp",
      "./images/icons-256-assets/interactions-lightbulb-256.avif": "./reference/assets/interactions-lightbulb-256.75924af665453426.avif",
      "./images/icons-256-assets/interactions-lightbulb-256.png": "./reference/assets/interactions-lightbulb-256.9a41bcd165453426.png",
      "./images/icons-256-assets/interactions-lightbulb-256.webp": "./reference/assets/interactions-lightbulb-256.5d3f2f7365453426.webp",
      "./images/icons-256-assets/interactions-no-256.avif": "./reference/assets/interactions-no-256.795af51765453426.avif",
      "./images/icons-256-assets/interactions-no-256.png": "./reference/assets/interactions-no-256.09b8eb8265453426.png",
      "./images/icons-256-assets/interactions-no-256.webp": "./reference/assets/interactions-no-256.169dc04665453426.webp",
      "./images/icons-256-assets/interactions-resortkey-256.avif": "./reference/assets/interactions-resortkey-256.3aef165965453426.avif",
      "./images/icons-256-assets/interactions-resortkey-256.png": "./reference/assets/interactions-resortkey-256.1253820b65453426.png",
      "./images/icons-256-assets/interactions-resortkey-256.webp": "./reference/assets/interactions-resortkey-256.1c72376265453426.webp",
      "./images/icons-256-assets/interactions-scissor-256.avif": "./reference/assets/interactions-scissor-256.79a1727e65453426.avif",
      "./images/icons-256-assets/interactions-scissor-256.png": "./reference/assets/interactions-scissor-256.0b8d584165453426.png",
      "./images/icons-256-assets/interactions-scissor-256.webp": "./reference/assets/interactions-scissor-256.886f54de65453426.webp",
      "./images/icons-256-assets/interactions-screwdriver-256.avif": "./reference/assets/interactions-screwdriver-256.91e0739565453426.avif",
      "./images/icons-256-assets/interactions-screwdriver-256.png": "./reference/assets/interactions-screwdriver-256.48e3a0fa65453426.png",
      "./images/icons-256-assets/interactions-screwdriver-256.webp": "./reference/assets/interactions-screwdriver-256.bc61f94d65453426.webp",
      "./images/icons-256-assets/interactions-shears-256.avif": "./reference/assets/interactions-shears-256.80458e7565453426.avif",
      "./images/icons-256-assets/interactions-shears-256.png": "./reference/assets/interactions-shears-256.a2adcc2265453426.png",
      "./images/icons-256-assets/interactions-shears-256.webp": "./reference/assets/interactions-shears-256.3bd6570065453426.webp",
      "./images/icons-256-assets/interactions-stethoscope-256.avif": "./reference/assets/interactions-stethoscope-256.d4b5062565453426.avif",
      "./images/icons-256-assets/interactions-stethoscope-256.png": "./reference/assets/interactions-stethoscope-256.e8a078b565453426.png",
      "./images/icons-256-assets/interactions-stethoscope-256.webp": "./reference/assets/interactions-stethoscope-256.6444f52e65453426.webp",
      "./images/icons-256-assets/interactions-tamtam-256.avif": "./reference/assets/interactions-tamtam-256.b045211665453426.avif",
      "./images/icons-256-assets/interactions-tamtam-256.png": "./reference/assets/interactions-tamtam-256.53a6ec6565453426.png",
      "./images/icons-256-assets/interactions-tamtam-256.webp": "./reference/assets/interactions-tamtam-256.8221f08f65453426.webp",
      "./images/icons-256-assets/interactions-telescope-256.avif": "./reference/assets/interactions-telescope-256.a889e00565453426.avif",
      "./images/icons-256-assets/interactions-telescope-256.png": "./reference/assets/interactions-telescope-256.40461d9865453426.png",
      "./images/icons-256-assets/interactions-telescope-256.webp": "./reference/assets/interactions-telescope-256.79988ac365453426.webp",
      "./images/icons-256-assets/interactions-wateringcan-256.avif": "./reference/assets/interactions-wateringcan-256.dc26caeb65453426.avif",
      "./images/icons-256-assets/interactions-wateringcan-256.png": "./reference/assets/interactions-wateringcan-256.ade89fb265453426.png",
      "./images/icons-256-assets/interactions-wateringcan-256.webp": "./reference/assets/interactions-wateringcan-256.d8f929fb65453426.webp",
      "./images/icons-256-assets/interactions-yes-256.avif": "./reference/assets/interactions-yes-256.dd627c7e65453426.avif",
      "./images/icons-256-assets/interactions-yes-256.png": "./reference/assets/interactions-yes-256.a59881e265453426.png",
      "./images/icons-256-assets/interactions-yes-256.webp": "./reference/assets/interactions-yes-256.aed0726d65453426.webp",
      "./images/icons-256-assets/interactions-zipline-256.avif": "./reference/assets/interactions-zipline-256.c8bfda9165453426.avif",
      "./images/icons-256-assets/interactions-zipline-256.png": "./reference/assets/interactions-zipline-256.696f90a165453426.png",
      "./images/icons-256-assets/interactions-zipline-256.webp": "./reference/assets/interactions-zipline-256.7e1f783f65453426.webp",
      "./images/icons-256-assets/misc-12-256.avif": "./reference/assets/misc-12-256.099fe67965453426.avif",
      "./images/icons-256-assets/misc-12-256.png": "./reference/assets/misc-12-256.b8d2cae565453426.png",
      "./images/icons-256-assets/misc-12-256.webp": "./reference/assets/misc-12-256.200d084965453426.webp",
      "./images/icons-256-assets/misc-16-256.avif": "./reference/assets/misc-16-256.b76d96e865453426.avif",
      "./images/icons-256-assets/misc-16-256.png": "./reference/assets/misc-16-256.56b11b9565453426.png",
      "./images/icons-256-assets/misc-16-256.webp": "./reference/assets/misc-16-256.37e9777465453426.webp",
      "./images/icons-256-assets/misc-6-256.avif": "./reference/assets/misc-6-256.5fe846eb65453426.avif",
      "./images/icons-256-assets/misc-6-256.png": "./reference/assets/misc-6-256.81a6370165453426.png",
      "./images/icons-256-assets/misc-6-256.webp": "./reference/assets/misc-6-256.f1aebba165453426.webp",
      "./images/icons-256-assets/misc-bike-256.avif": "./reference/assets/misc-bike-256.934fd8ee65453426.avif",
      "./images/icons-256-assets/misc-bike-256.png": "./reference/assets/misc-bike-256.83b46da565453426.png",
      "./images/icons-256-assets/misc-bike-256.webp": "./reference/assets/misc-bike-256.f96cadfb65453426.webp",
      "./images/icons-256-assets/misc-boat-256.avif": "./reference/assets/misc-boat-256.ed25731865453426.avif",
      "./images/icons-256-assets/misc-boat-256.png": "./reference/assets/misc-boat-256.4ab332a565453426.png",
      "./images/icons-256-assets/misc-boat-256.webp": "./reference/assets/misc-boat-256.7210da0465453426.webp",
      "./images/icons-256-assets/misc-boat_alt-256.avif": "./reference/assets/misc-boat_alt-256.11db3f9c65453426.avif",
      "./images/icons-256-assets/misc-boat_alt-256.png": "./reference/assets/misc-boat_alt-256.d7df172a65453426.png",
      "./images/icons-256-assets/misc-boat_alt-256.webp": "./reference/assets/misc-boat_alt-256.05def27365453426.webp",
      "./images/icons-256-assets/misc-car-256.avif": "./reference/assets/misc-car-256.3bd545e365453426.avif",
      "./images/icons-256-assets/misc-car-256.png": "./reference/assets/misc-car-256.1082673165453426.png",
      "./images/icons-256-assets/misc-car-256.webp": "./reference/assets/misc-car-256.de7868c265453426.webp",
      "./images/icons-256-assets/misc-clock-256.avif": "./reference/assets/misc-clock-256.7530fffa65453426.avif",
      "./images/icons-256-assets/misc-clock-256.png": "./reference/assets/misc-clock-256.913c6e6b65453426.png",
      "./images/icons-256-assets/misc-clock-256.webp": "./reference/assets/misc-clock-256.f10105ef65453426.webp",
      "./images/icons-256-assets/misc-floppy-256.avif": "./reference/assets/misc-floppy-256.fd88465665453426.avif",
      "./images/icons-256-assets/misc-floppy-256.png": "./reference/assets/misc-floppy-256.e286f47865453426.png",
      "./images/icons-256-assets/misc-floppy-256.webp": "./reference/assets/misc-floppy-256.9d10379565453426.webp",
      "./images/icons-256-assets/misc-jetski-256.avif": "./reference/assets/misc-jetski-256.886142eb65453426.avif",
      "./images/icons-256-assets/misc-jetski-256.png": "./reference/assets/misc-jetski-256.40e9ce5d65453426.png",
      "./images/icons-256-assets/misc-jetski-256.webp": "./reference/assets/misc-jetski-256.16b3236365453426.webp",
      "./images/icons-256-assets/misc-star-256.avif": "./reference/assets/misc-star-256.39cd432465453426.avif",
      "./images/icons-256-assets/misc-star-256.png": "./reference/assets/misc-star-256.f712fe2365453426.png",
      "./images/icons-256-assets/misc-star-256.webp": "./reference/assets/misc-star-256.ddd0d3ff65453426.webp",
      "./images/icons-256-assets/misc-taxi-256.avif": "./reference/assets/misc-taxi-256.7338d79265453426.avif",
      "./images/icons-256-assets/misc-taxi-256.png": "./reference/assets/misc-taxi-256.6139e1d265453426.png",
      "./images/icons-256-assets/misc-taxi-256.webp": "./reference/assets/misc-taxi-256.4392a04265453426.webp",
      "./images/icons-256-assets/phone-customization-256.avif": "./reference/assets/phone-customization-256.38203d7565453426.avif",
      "./images/icons-256-assets/phone-customization-256.png": "./reference/assets/phone-customization-256.a072915565453426.png",
      "./images/icons-256-assets/phone-customization-256.webp": "./reference/assets/phone-customization-256.44f6f9d865453426.webp",
      "./images/icons-256-assets/phone-partner-256.avif": "./reference/assets/phone-tech-company-256.99f9ba3765453426.avif",
      "./images/icons-256-assets/phone-partner-256.png": "./reference/assets/phone-tech-company-256.0d3a230e65453426.png",
      "./images/icons-256-assets/phone-partner-256.webp": "./reference/assets/phone-tech-company-256.e692eaec65453426.webp",
      "./images/icons-256-assets/phone-map-256.avif": "./reference/assets/phone-map-256.d8a3a3a065453426.avif",
      "./images/icons-256-assets/phone-map-256.png": "./reference/assets/phone-map-256.46a9f12465453426.png",
      "./images/icons-256-assets/phone-map-256.webp": "./reference/assets/phone-map-256.c512b40b65453426.webp",
      "./images/icons-256-assets/phone-point-256.avif": "./reference/assets/phone-point-256.737f06c965453426.avif",
      "./images/icons-256-assets/phone-point-256.png": "./reference/assets/phone-point-256.d98ea5dc65453426.png",
      "./images/icons-256-assets/phone-point-256.webp": "./reference/assets/phone-point-256.20894d6e65453426.webp",
      "./images/icons-256-assets/phone-quest-256.avif": "./reference/assets/phone-quest-256.55e3c4bc65453426.avif",
      "./images/icons-256-assets/phone-quest-256.png": "./reference/assets/phone-quest-256.01ea19f765453426.png",
      "./images/icons-256-assets/phone-quest-256.webp": "./reference/assets/phone-quest-256.74da037465453426.webp"
    }))
  },
  s_ = {
    get: (e, t = 128, s = 256) => {
      const i = cv.$device.type.phone ? t : s;
      return t_[e + "-" + i];
    }
  },
  i_ = {
    class: "button-wrapper"
  },
  n_ = {
    key: 0,
    class: "button-validate button-animate"
  },
  a_ = {
    key: 1,
    class: "button-discard button-animate"
  },
  r_ = {
    key: 2,
    class: "button-random button-animate"
  },
  o_ = {
    key: 3,
    class: "button-random button-animate"
  },
  VueButtonActionComponent = $y({
    __name: "ButtonAction",
    props: {
      action: {
        type: String,
        default: "validate",
        validator: e => ["validate", "discard", "random", "chat"].includes(e)
      }
    },
    setup(e) {
      const t = e,
        s = s_.get("interactions-dice"),
        i = s_.get("interactions-chat");
      return (e, n) => ($i(), Qi("button", {
        class: q(["button-action", [t.action]])
      }, [rn("span", i_, ["validate" === t.action ? ($i(), Qi("span", n_, [on(VueValidateComponent, {
        color: "white",
        "size-demult": 1.2
      })])) : un("", !0), "discard" === t.action ? ($i(), Qi("span", a_, [on(VueCrossComponent, {
        color: "white",
        "size-demult": 1.2
      })])) : un("", !0), "random" === t.action ? ($i(), Qi("span", r_, [on(St(VueLazyImageComponent), {
        class: "random-picture",
        contain: !0,
        url: St(s)
      }, null, 8, ["url"])])) : un("", !0), "chat" === t.action ? ($i(), Qi("span", o_, [on(St(VueLazyImageComponent), {
        class: "chat-picture",
        contain: !0,
        url: St(i)
      }, null, 8, ["url"])])) : un("", !0)])], 2));
    }
  }, [["__scopeId", "data-v-2678603e"]]),
  c_ = {
    key: 0,
    class: "cta-content content-icon"
  },
  h_ = ["innerHTML"],
  u_ = ["innerHTML"],
  d_ = {
    key: 2,
    class: "cta-content"
  },
  VueCallToActionComponent = $y({
    __name: "CallToAction",
    props: {
      to: {
        type: [String, Object],
        default: null
      },
      href: {
        type: String,
        default: null
      },
      text: {
        type: String,
        default: null
      },
      size: {
        type: String,
        default: "normal",
        validator: e => ["normal", "sm", "xs"].includes(e)
      },
      color: {
        type: String,
        default: "green",
        validator: e => ["green", "blue", "red", "yellow", "gray", "white"].includes(e)
      },
      hasIcon: {
        type: Boolean,
        default: !1
      }
    },
    setup(e) {
      const t = e,
        s = t.to ? "router-link" : t.href ? "a" : "button";
      return (i, n) => ($i(), Ki($s(St(s)), {
        to: e.to,
        href: e.href,
        target: "a" === St(s) ? "_blank" : null,
        rel: "a" === St(s) ? "noopener noreferrer" : null,
        class: q(["cta", [t.size, t.color, St(s), {
          "has-icon": t.hasIcon
        }]])
      }, {
        default: ts(() => [e.hasIcon ? ($i(), Qi("div", c_, [e.hasIcon ? ($i(), Ki(VueButtonActionComponent, {
          key: 0,
          "aria-label": i.$l("arialabel.enter"),
          action: "chat",
          class: "cta-icon"
        }, null, 8, ["aria-label"])) : un("", !0), rn("span", {
          innerHTML: t.text
        }, null, 8, h_)])) : t.text ? ($i(), Qi("span", {
          key: 1,
          class: "cta-content",
          innerHTML: t.text
        }, null, 8, u_)) : ($i(), Qi("div", d_, [Qs(i.$slots, "default", {}, void 0, !0)]))]),
        _: 3
      }, 8, ["to", "href", "target", "rel", "class"]));
    }
  }, [["__scopeId", "data-v-6cd59efe"]]),
  m_ = e => (Kt("data-v-718e7c24"), e = e(), es(), e),
  f_ = {
    key: 0,
    class: "male",
    viewBox: "0 0 20 17",
    xmlns: "http://www.w3.org/2000/svg"
  },
  g_ = [m_(() => rn("path", {
    class: "mouth",
    d: "M15.8,11.7c0.4,0.3,0.4,0.9,0.1,1.2c-1.4,1.6-3.6,2.6-5.7,2.8c-2.1,0.3-4.3-0.1-5.8-1.4 c-0.4-0.3-0.4-0.9-0.1-1.2c0.3-0.4,0.9-0.4,1.2-0.1l0,0c0.9,0.8,2.5,1.2,4.4,0.9c1.8-0.2,3.5-1,4.5-2.2 C14.9,11.4,15.5,11.4,15.8,11.7C15.8,11.7,15.8,11.7,15.8,11.7z"
  }, null, -1)), m_(() => rn("path", {
    class: "eye",
    d: "M2.7,0.5c0.8,0.1,1.5,0.8,1.5,1.6L4.1,5.7C4,6.5,3.3,7.1,2.5,7C1.7,6.9,1,6.2,1.1,5.4l0.1-3.6 C1.2,1,1.9,0.4,2.7,0.5L2.7,0.5z"
  }, null, -1)), m_(() => rn("path", {
    class: "eye",
    d: "M16.8,0.5c-0.8,0.1-1.5,0.8-1.5,1.6l0.1,3.6c0,0.8,0.7,1.4,1.6,1.3c0.8-0.1,1.5-0.8,1.5-1.6l-0.1-3.6 C18.4,1,17.7,0.4,16.8,0.5z"
  }, null, -1))],
  v_ = {
    key: 1,
    class: "female",
    viewBox: "0 0 24 19",
    xmlns: "http://www.w3.org/2000/svg"
  },
  b_ = [m_(() => rn("path", {
    class: "mouth",
    d: "M18.1,13.7c0.4,0.3,0.4,0.9,0.1,1.2c-1.4,1.6-3.6,2.6-5.7,2.8c-2.1,0.3-4.3-0.1-5.8-1.4 c-0.4-0.3-0.4-0.9-0.1-1.2c0.3-0.4,0.9-0.4,1.2-0.1c0.9,0.8,2.5,1.2,4.4,0.9c1.8-0.2,3.5-1,4.5-2.2C17.1,13.5,17.7,13.4,18.1,13.7 z"
  }, null, -1)), m_(() => rn("path", {
    class: "eye",
    d: "M22.4,3.3C22.3,3.3,22.3,3.3,22.4,3.3l-2,0c0-0.1,0-0.1-0.1-0.2l1-0.3c0.4-0.1,0.6-0.5,0.5-0.8c0,0,0,0,0,0 l0,0c-0.1-0.4-0.5-0.6-0.8-0.5l-2.5,0.8l0,0c-0.5,0.2-0.9,0.6-1.1,1.1l-0.8,3.5c-0.2,0.8,0.3,1.5,1.2,1.7c0.8,0.1,1.7-0.4,1.8-1.2 l0.4-1.6l1.2,0.7c0.3,0.2,0.7,0.1,0.9-0.3c0.2-0.3,0.1-0.7-0.3-0.9l-1.1-0.6l1.6,0C22.7,4.7,23,4.4,23,4C23,3.6,22.7,3.3,22.4,3.3z"
  }, null, -1)), m_(() => rn("path", {
    class: "eye",
    d: "M7.5,6.9L6.7,3.4c-0.1-0.5-0.5-1-1.1-1.1l0,0L3.1,1.5c0,0,0,0,0,0C2.8,1.4,2.4,1.6,2.3,2l0,0c0,0,0,0,0,0 C2.2,2.4,2.4,2.7,2.7,2.8l1,0.3c0,0.1,0,0.1-0.1,0.2l-2,0c-0.4,0-0.6,0.3-0.7,0.6c0,0.4,0.3,0.7,0.6,0.7l1.6,0L2.2,5.3 C1.9,5.5,1.8,5.9,2,6.2c0.2,0.3,0.6,0.4,0.9,0.3l1.2-0.7l0.4,1.6c0.2,0.8,1,1.3,1.8,1.2C7.2,8.5,7.7,7.7,7.5,6.9z"
  }, null, -1))],
  VueCharacterFaceComponent = $y({
    __name: "CharacterFace",
    props: {
      type: {
        type: [String, Number],
        default: "male",
        validator: e => ["male", "female", 0, 1].includes(e)
      },
      delay: {
        type: Number,
        default: 0
      }
    },
    setup(e) {
      const t = e;
      return (e, s) => ($i(), Qi("div", {
        class: "character-face",
        style: H(`--animation-delay: ${t.delay}s;`)
      }, ["male" === t.type || 0 === t.type ? ($i(), Qi("svg", f_, g_)) : ($i(), Qi("svg", v_, b_))], 4));
    }
  }, [["__scopeId", "data-v-718e7c24"]]);
function __(e) {
  const t = {
      Escape: !0,
      Space: !0,
      Enter: !0,
      KeyX: !0
    },
    s = {};
  let i = !1;
  return Rs(function () {
    window.addEventListener("keydown", a, !0), window.addEventListener("keyup", r, !0);
  }), Fs(o), {
    closePopin: n,
    unlistenKeys: o
  };
  function n() {
    i || (i = !0, o(), e());
  }
  function a(e) {
    !i && t[e.code] && (s[e.code] = !0);
  }
  function r(e) {
    if (i || !t[e.code]) return;
    s[e.code] && (e.preventDefault(), e.stopPropagation(), n(), o());
  }
  function o() {
    window.removeEventListener("keydown", a, !0), window.removeEventListener("keyup", r, !0);
  }
}
const x_ = e => (Kt("data-v-17d5bb62"), e = e(), es(), e),
  w_ = {
    class: "notif notif-mainquest-completed"
  },
  S_ = {
    class: "popin"
  },
  A_ = {
    class: "congratulation-content"
  },
  M_ = {
    class: "cp"
  },
  C_ = x_(() => rn("span", {
    class: "plus"
  }, "+", -1)),
  P_ = {
    key: 0,
    class: "reward"
  },
  T_ = ["innerHTML"],
  E_ = ["innerHTML"],
  B_ = {
    class: "congratulation-images"
  },
  I_ = x_(() => rn("div", {
    class: "background-mask"
  }, [rn("div", {
    class: "background"
  })], -1)),
  VueNotifMainQuestCompletedComponent = $y({
    __name: "NotifMainQuestCompleted",
    props: ["lifecycle", "quest"],
    setup(e) {
      const t = e,
        s = cv.$store,
        {
          onEnter: i,
          onExit: n,
          close: a
        } = dt(t.lifecycle),
        r = Symbol(),
        o = [ty.list(Object.assign({
          "./reference/assets/images/character-assets/character_1.avif": zy,
          "./reference/assets/images/character-assets/character_1.png": Ny,
          "./reference/assets/images/character-assets/character_1.webp": Fy
        })), ty.list(Object.assign({
          "./reference/assets/images/character-assets/character_2.avif": Uy,
          "./reference/assets/images/character-assets/character_2.png": Hy,
          "./reference/assets/images/character-assets/character_2.webp": Gy,
          "./reference/assets/images/character-assets/character_2.xmp": Vy
        })), ty.list(Object.assign({
          "./reference/assets/images/character-assets/character_4.avif": Wy,
          "./reference/assets/images/character-assets/character_4.png": jy,
          "./reference/assets/images/character-assets/character_4.webp": qy
        }))],
        {
          unlistenKeys: l,
          closePopin: c
        } = __(a);
      return i(async (e, t) => {
        await lo(400), t() || (s.toggleConfettis(r, !0), e.getBoundingClientRect(), e.classList.add("visible"), cv.$webgl.audio.playSound("sfx_quest_completed_super", {
          delay: 100
        }));
      }), n(async e => {
        s.toggleConfettis(r, !1), l(), e.getBoundingClientRect(), e.classList.add("hidden"), cv.$webgl.audio.playSound("sfx_quest_completed_close"), await lo(500);
      }), Fs(() => {
        s.toggleConfettis(r, !1);
      }), (t, s) => ($i(), Qi("aside", w_, [rn("div", S_, [rn("div", A_, [un("", !0), rn("h2", {
        class: "title",
        innerHTML: t.$l("quest.end.title")
      }, null, 8, T_), rn("p", {
        class: "description",
        innerHTML: t.$tpl(e.quest.rewardText)
      }, null, 8, E_), on(VueCallToActionComponent, {
        color: "green",
        text: t.$l("cta.continue"),
        class: "congratulation-button",
        onClick: St(c)
      }, null, 8, ["text", "onClick"])]), rn("div", B_, [($i(), Qi(Gi, null, Js(3, (e, t) => rn("div", {
        key: e,
        class: q(["character", [`character-${e}`]])
      }, [on(VueCharacterFaceComponent, {
        delay: t
      }, null, 8, ["delay"]), on(St(VueLazyImageComponent), {
        url: o[t],
        contain: !0,
        class: "character-picture"
      }, null, 8, ["url"])], 2)), 64))]), I_])]));
    }
  }, [["__scopeId", "data-v-17d5bb62"]]),
  VueBadgeCircleComponent = $y({
    __name: "BadgeCircle",
    props: {
      size: {
        type: String,
        default: "normal",
        validator: e => ["normal", "sm"].includes(e)
      },
      icon: {
        type: String,
        default: null
      },
      image: {
        type: Object,
        default: null
      },
      isButton: {
        type: Boolean,
        default: !1
      }
    },
    setup(e) {
      const t = e;
      return (e, s) => {
        const i = qs("SvgIcon");
        return $i(), Ki($s(t.isButton ? "button" : "div"), {
          class: q(["badge-circle", t.size])
        }, {
          default: ts(() => [t.image ? ($i(), Ki(St(VueLazyImageComponent), {
            key: 0,
            url: t.image,
            contain: !0,
            "height-ratio": "100%",
            alt: "Icon"
          }, null, 8, ["url"])) : un("", !0), on(i, {
            id: t.icon,
            class: "badge-icon"
          }, null, 8, ["id"])]),
          _: 1
        }, 8, ["class"]);
      };
    }
  }, [["__scopeId", "data-v-f9cac401"]]),
  L_ = e => (Kt("data-v-26a58662"), e = e(), es(), e),
  O_ = {
    class: "notif"
  },
  R_ = {
    class: "popin"
  },
  z_ = L_(() => rn("div", {
    class: "background-mask"
  }, [rn("div", {
    class: "background"
  })], -1)),
  N_ = ["innerHTML"],
  F_ = {
    class: "cp"
  },
  U_ = L_(() => rn("span", {
    class: "plus"
  }, "+", -1)),
  H_ = {
    class: "reward"
  },
  G_ = ["innerHTML"],
  VueNotifQuestCompletedComponent = $y({
    __name: "NotifQuestCompleted",
    props: ["lifecycle", "quest"],
    setup(e) {
      const t = e,
        s = cv.$store,
        {
          onEnter: i,
          onExit: n,
          close: a
        } = dt(t.lifecycle),
        r = dt(t.quest),
        o = null,
        l = s_.get(`${r.icon}`),
        {
          unlistenKeys: c,
          closePopin: h
        } = __(a),
        u = Symbol();
      return i(async (e, t) => {
        await lo(400), t() || (s.toggleConfettis(u, !0), e.getBoundingClientRect(), e.classList.add("visible"), cv.$webgl.audio.playSound("sfx_quest_completed_side"));
      }), n(async e => {
        s.toggleConfettis(u, !1), c(), e.getBoundingClientRect(), e.classList.add("hidden"), cv.$webgl.audio.playSound("sfx_quest_completed_close"), await lo(500);
      }), Fs(() => {
        s.toggleConfettis(u, !1);
      }), (e, t) => ($i(), Qi("aside", O_, [rn("div", R_, [z_, rn("header", {
        class: "card-header",
        innerHTML: e.$l("quest.completed")
      }, null, 8, N_), on(St(VueBadgeCircleComponent), {
        class: "badge",
        image: St(l)
      }, null, 8, ["image"]), un("", !0), rn("p", {
        innerHTML: e.$tpl(St(r).rewardText)
      }, null, 8, G_), on(VueCallToActionComponent, {
        color: "green",
        text: e.$l("cta.collect"),
        onClick: St(h)
      }, null, 8, ["text", "onClick"])])]));
    }
  }, [["__scopeId", "data-v-26a58662"]]),
  W_ = {
    class: "notif"
  },
  j_ = {
    class: "popin"
  },
  q_ = {
    class: "card-header"
  },
  Z_ = ["innerHTML"],
  $_ = {
    class: "numbers"
  },
  X_ = ["innerHTML"],
  Y_ = {
    class: "progress"
  },
  VueNotifQuestProgressComponent = $y({
    __name: "NotifQuestProgress",
    props: ["lifecycle", "quest"],
    setup(e) {
      const t = e,
        {
          onEnter: s,
          onExit: i,
          close: n
        } = dt(t.lifecycle),
        a = dt(t.quest),
        r = s_.get(a.icon),
        o = yt();
      return Rs(async () => {
        const e = o.value;
        e.style.setProperty("--quest-progress", -1 * (100 - a.progressBarValue._value / a.progressBarMax * 100) + "%"), e.style.setProperty("--quest-progress-prev", -1 * (100 - (a.progressBarValue._value - 1) / a.progressBarMax * 100) + "%"), await lo(500), cv.$webgl.audio.playSound("sfx_quest_progress"), e.classList.add("animate");
      }), s(async (e, t) => {
        await lo(400), t() || (e.getBoundingClientRect(), e.classList.add("visible"), await lo(2e3), t() || n());
      }), i(async e => {
        e.getBoundingClientRect(), e.classList.add("hidden"), await lo(500);
      }), Us(() => {}), (e, t) => ($i(), Qi("aside", W_, [rn("div", j_, [rn("header", q_, [rn("span", {
        class: "title",
        innerHTML: e.$l("quest.progress")
      }, null, 8, Z_)]), on(St(VueBadgeCircleComponent), {
        class: "badge",
        image: St(r)
      }, null, 8, ["image"]), rn("div", $_, X(St(a).progressBarValue._value) + "/" + X(St(a).progressBarMax), 1), rn("p", {
        innerHTML: St(a).description
      }, null, 8, X_), rn("div", Y_, [rn("div", {
        ref_key: "progressbar",
        ref: o,
        class: "bar"
      }, null, 512)])])]));
    }
  }, [["__scopeId", "data-v-72a9796e"]]),
  Q_ = {
    class: "notif notif-chest-open"
  },
  K_ = {
    class: "popin"
  },
  ex = {
    class: "card-header"
  },
  tx = (e => (Kt("data-v-788c7aca"), e = e(), es(), e))(() => rn("span", {
    class: "plus"
  }, "+", -1)),
  sx = {
    class: "reward"
  },
  VueNotifChestOpenComponent = $y({
    __name: "NotifChestOpen",
    props: ["lifecycle", "points"],
    setup(e) {
      const t = e,
        {
          onEnter: s,
          onExit: i,
          close: n
        } = dt(t.lifecycle),
        a = null;
      return s(async (e, t) => {
        await lo(400), t() || (e.getBoundingClientRect(), e.classList.add("visible"), cv.$webgl.audio.playSound("sfx_UI_dataPoints"), await lo(2e3), t() || n());
      }), i(async e => {
        e.getBoundingClientRect(), e.classList.add("hidden"), await lo(500);
      }), (e, s) => ($i(), Qi("aside", Q_, [rn("div", K_, [un("", !0)])]));
    }
  }, [["__scopeId", "data-v-788c7aca"]]),
  nx = "./reference/assets/character_3.467ded5e65453426.avif",
  ax = "./reference/assets/character_3.bb2b489365453426.png",
  rx = "./reference/assets/character_3.e941d92f65453426.webp",
  ox = "./reference/assets/character_5.e2d3051965453426.avif",
  lx = "./reference/assets/character_5.60ccd4e065453426.png",
  cx = "./reference/assets/character_5.e40ed18365453426.webp",
  hx = e => (Kt("data-v-4d8aa3c3"), e = e(), es(), e),
  ux = {
    class: "container arrow-default"
  },
  dx = {
    class: "arrow-shape"
  },
  px = hx(() => rn("div", {
    class: "arrow-bar"
  }, null, -1)),
  mx = {
    class: "container arrow-twin"
  },
  fx = {
    class: "arrow-shape"
  },
  gx = hx(() => rn("div", {
    class: "arrow-bar"
  }, null, -1)),
  VueArrowComponent = $y({
    __name: "Arrow",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => ($i(), Qi("div", {
        class: q(["arrow", [t.color]]),
        style: H(`--size-demult: ${t.sizeDemult};`)
      }, [rn("div", ux, [rn("div", dx, [($i(), Qi(Gi, null, Js(2, e => rn("div", {
        key: e,
        class: q(["bar", [`bar-${e}`]])
      }, null, 2)), 64))]), px]), rn("div", mx, [rn("div", fx, [($i(), Qi(Gi, null, Js(2, e => rn("div", {
        key: e,
        class: q(["bar", [`bar-${e}`]])
      }, null, 2)), 64))]), gx])], 6));
    }
  }, [["__scopeId", "data-v-4d8aa3c3"]]),
  VueSoundComponent = $y({
    __name: "Sound",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => {
        const i = qs("SvgIcon");
        return $i(), Qi("div", {
          class: q(["sound", [t.color]]),
          style: H(`--size-demult: ${t.sizeDemult};`)
        }, [St(cv).$store.isAudioMuted ? ($i(), Ki(i, {
          key: 0,
          id: "sound-off"
        })) : ($i(), Ki(i, {
          key: 1,
          id: "sound-on"
        }))], 6);
      };
    }
  }, [["__scopeId", "data-v-272a9e1b"]]),
  VuePlayComponent = $y({
    __name: "Play",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => {
        const i = qs("SvgIcon");
        return $i(), Qi("div", {
          class: q(["play", [t.color]]),
          style: H(`--size-demult: ${t.sizeDemult};`)
        }, [on(i, {
          id: "play"
        })], 6);
      };
    }
  }, [["__scopeId", "data-v-35415b08"]]),
  VueShareComponent = $y({
    __name: "Share",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => {
        const i = qs("SvgIcon");
        return $i(), Qi("div", {
          class: q(["share", [t.color]]),
          style: H(`--size-demult: ${t.sizeDemult};`)
        }, [on(i, {
          id: "share"
        })], 6);
      };
    }
  }, [["__scopeId", "data-v-d7a2410c"]]),
  VueBurgerComponent = $y({
    __name: "Burger",
    props: Zy,
    setup(e) {
      const t = e;
      return (e, s) => ($i(), Qi("div", {
        class: q(["burger", [t.color]]),
        style: H(`--size-demult: ${t.sizeDemult};`)
      }, [($i(), Qi(Gi, null, Js(3, e => rn("div", {
        key: e,
        class: q(["bar", [`bar-${e}`]])
      }, null, 2)), 64))], 6));
    }
  }, [["__scopeId", "data-v-27845052"]]),
  wx = {
    key: 0,
    class: "face-container"
  },
  VueCircleButtonComponent = $y({
    __name: "CircleButton",
    props: {
      size: {
        type: String,
        default: "default",
        validator: e => ["default", "sm"].includes(e)
      },
      bgColor: {
        type: String,
        default: "white",
        validator: e => ["white", "green", "yellow", "blue", "bordered"].includes(e)
      },
      icon: {
        type: String,
        default: "cross",
        validator: e => ["", "cross", "burger", "arrow", "sound", "play", "share", "validate", "profile"].includes(e)
      },
      iconColor: {
        type: String,
        default: "blue",
        validator: e => ["blue", "green", "white", "red", "yellow", "gray"].includes(e)
      },
      hasShadow: {
        type: Boolean,
        default: !1
      },
      isHoverable: {
        type: Boolean,
        default: !1
      },
      clickAnimation: {
        type: Boolean,
        default: !1
      },
      to: {
        type: [String, Object],
        default: null
      },
      href: {
        type: String,
        default: null
      }
    },
    setup(e) {
      const t = e,
        s = {
          cross: VueCrossComponent,
          arrow: VueArrowComponent,
          sound: VueSoundComponent,
          play: VuePlayComponent,
          share: VueShareComponent,
          burger: VueBurgerComponent,
          validate: VueValidateComponent,
          profile: VueCharacterFaceComponent
        },
        i = yt();
      function n(e) {
        t.clickAnimation && Yl({
          target: e.target,
          animation: "buttonBounceSlow",
          duration: 500,
          fillMode: "both"
        });
      }
      const a = t.to ? "router-link" : t.href ? "a" : "button";
      return (r, o) => ($i(), Ki($s(St(a)), {
        ref_key: "button",
        ref: i,
        to: e.to,
        href: e.href,
        target: "a" === St(a) ? "_blank" : null,
        rel: "a" === St(a) ? "noopener noreferrer" : null,
        class: q(["circle-button", [t.bgColor, t.size, St(a), {
          "has-shadow": t.hasShadow
        }, {
          "is-hoverable": t.isHoverable
        }]]),
        type: "button",
        onClick: n
      }, {
        default: ts(() => ["profile" === t.icon ? ($i(), Qi("div", wx, [t.icon ? ($i(), Ki($s(s[t.icon]), {
          key: 0,
          color: t.iconColor,
          class: "button-content",
          type: r.$savestate.game.player.face
        }, null, 8, ["color", "type"])) : un("", !0)])) : ($i(), Ki($s(s[t.icon]), {
          key: 1,
          color: t.iconColor,
          class: "button-content"
        }, null, 8, ["color"]))]),
        _: 1
      }, 8, ["to", "href", "target", "rel", "class"]));
    }
  }, [["__scopeId", "data-v-1a897dbc"]]),
  Ax = {
    class: "notif"
  },
  Mx = (e => (Kt("data-v-25064164"), e = e(), es(), e))(() => rn("div", {
    class: "notification-background"
  }, null, -1)),
  Cx = {
    key: 0,
    class: "notification-character"
  },
  Px = {
    key: 1,
    class: "notification-image"
  },
  Tx = {
    class: "notification-content"
  },
  Ex = {
    class: "notification-texts"
  },
  Bx = ["innerHTML"],
  Ix = ["innerHTML"],
  kx = {
    class: "notification-button"
  },
  Dx = {
    viewBox: "0 0 40 40"
  },
  VueNotifHintComponent = $y({
    __name: "NotifHint",
    props: ["lifecycle", "hintType", "questID", "delay"],
    setup(e) {
      const t = e,
        s = {
          character0: ty.list(Object.assign({
            "./reference/assets/images/character-assets/character_1.avif": zy,
            "./reference/assets/images/character-assets/character_1.png": Ny,
            "./reference/assets/images/character-assets/character_1.webp": Fy
          })),
          character1: ty.list(Object.assign({
            "./reference/assets/images/character-assets/character_2.avif": Uy,
            "./reference/assets/images/character-assets/character_2.png": Hy,
            "./reference/assets/images/character-assets/character_2.webp": Gy,
            "./reference/assets/images/character-assets/character_2.xmp": Vy
          })),
          character2: ty.list(Object.assign({
            "./reference/assets/images/character-assets/character_3.avif": nx,
            "./reference/assets/images/character-assets/character_3.png": ax,
            "./reference/assets/images/character-assets/character_3.webp": rx
          })),
          character3: ty.list(Object.assign({
            "./reference/assets/images/character-assets/character_4.avif": Wy,
            "./reference/assets/images/character-assets/character_4.png": jy,
            "./reference/assets/images/character-assets/character_4.webp": qy
          })),
          character4: ty.list(Object.assign({
            "./reference/assets/images/character-assets/character_5.avif": ox,
            "./reference/assets/images/character-assets/character_5.png": lx,
            "./reference/assets/images/character-assets/character_5.webp": cx
          }))
        }[cv.$savestate.game.player.color],
        {
          onEnter: i,
          onExit: n,
          close: a
        } = dt(t.lifecycle);
      let r,
        o = !1,
        l = !1;
      const c = {
          enroll: {
            icon: "arrow",
            iconColor: "blue",
            loc: "hint.enroll",
            image: s_.get("misc-floppy"),
            delay: 8e3,
            onClick: () => {
              cv.$store.isGuest || (cv.$store.isFormOpen = !0, a());
            }
          },
          quest: {
            icon: "arrow",
            iconColor: "blue",
            loc: "hint.quest",
            image: s_.get("phone-quest"),
            delay: 8e3,
            onClick: g("Quests")
          },
          accessories: {
            icon: "arrow",
            iconColor: "blue",
            loc: "hint.accessories",
            image: s_.get("phone-customization"),
            delay: 8e3,
            onClick: g("Accessories")
          }
        },
        h = dt(t.hintType);
      let u = c[h];
      if (!u || "customize" === h || "map" === h || "partner" === h || "fintech" === h) return a(), () => {};
      let d = cv.$l(u.loc + ".title"),
        p = cv.$l(u.loc + ".description"),
        m = u.image;
      if ("quest" === h && cv.$quests.list[t.questID]) {
        const e = cv.$quests.list[t.questID];
        p = cv.$tpl(e.description), m = s_.get(e.icon) || m;
      }
      let f = m === s;
      function g(e) {
        return async function (t) {
          t.preventDefault(), t.stopPropagation(), o || (o = !0, a(), await lo(400), cv.$webgl.audio.playSound("sfx_phone_click_medium"), "Customization" !== e ? (cv.$store.phone.tab.id = e, cv.$store.phone.tab.props = {}, cv.$router.push({
            name: "Phone"
          })) : cv.$router.push({
            name: "Customize"
          }));
        };
      }
      function v() {
        if (o || l) return;
        const e = cv.$notifs.queues;
        e.quest.length || e.mainQuest.length || e.progress.length || e.dataPoints.length ? a() : r = setTimeout(v, 700);
      }
      let b = u.delay || 5e3,
        y = yt(0),
        _ = yt(!1),
        x = io();
      function w(e) {
        _.value || (y.value += e / b, y.value >= 1 && (y.value = 1, x.resolve(), bc.remove(w)));
      }
      return i(async (e, s) => {
        await lo(400), t.delay && t.delay > 0 && (await lo(t.delay)), s() || (e.getBoundingClientRect(), cv.$webgl.audio.playSound("sfx_UI_dialog_answer"), e.classList.add("visible"), r = setTimeout(v, 1400), bc.add(w), await x, bc.remove(w), s() || o || a());
      }), n(async e => {
        bc.remove(w), clearTimeout(r), l = !0, e.getBoundingClientRect(), e.classList.add("hidden"), await lo(310);
      }), Fs(() => {
        bc.remove(w), clearTimeout(r), l = !0;
      }), (e, t) => ($i(), Qi("aside", Ax, [rn("button", {
        class: q(["notification", {
          ["hint-" + St(h)]: !0
        }]),
        onMouseenter: t[0] || (t[0] = e => bt(_) ? _.value = !0 : _ = !0),
        onMouseleave: t[1] || (t[1] = e => bt(_) ? _.value = !1 : _ = !1),
        onClick: t[2] || (t[2] = (...e) => St(u).onClick && St(u).onClick(...e))
      }, [Mx, St(f) ? ($i(), Qi("div", Cx, [on(VueCharacterFaceComponent, {
        type: e.$savestate.game.player.face,
        class: "character-face"
      }, null, 8, ["type"]), on(St(VueLazyImageComponent), {
        class: "character-picture",
        contain: !0,
        url: St(m)
      }, null, 8, ["url"])])) : ($i(), Qi("div", Px, [on(St(VueLazyImageComponent), {
        class: "picture",
        contain: !0,
        url: St(m)
      }, null, 8, ["url"])])), rn("div", Tx, [rn("div", Ex, [St(d) ? ($i(), Qi("p", {
        key: 0,
        class: "title",
        innerHTML: St(d)
      }, null, 8, Bx)) : un("", !0), St(p) ? ($i(), Qi("p", {
        key: 1,
        class: "description",
        innerHTML: St(p)
      }, null, 8, Ix)) : un("", !0)]), rn("div", kx, [($i(), Qi("svg", Dx, [rn("circle", {
        r: "18",
        cx: "20",
        cy: "20",
        style: H({
          strokeDashoffset: 113 * St(y) + "px"
        })
      }, null, 4)])), on(VueCircleButtonComponent, {
        "aria-label": e.$l("arialabel.open"),
        "has-shadow": !0,
        "bg-color": "white",
        "icon-color": St(u).iconColor,
        icon: St(u).icon
      }, null, 8, ["aria-label", "icon-color", "icon"])])])], 34)]));
    }
  }, [["__scopeId", "data-v-25064164"]]),
  Ox = (e, t) => !(!e.quest || !t.quest) && e.quest.id === t.quest.id;
let Rx = 0;
const zx = new Set(["Home", "Webgl"]);
import { Hx, Vx, jx, qx, Zx, Xx, Yx, Nw, Hw, Ww, nS, aS, rS, hS, jS, qS, tA, sA, iA, cA, hA, mA, fA, DA, UA, HA, iM, nM, aM, lM, CM, OM, jM, rC, vC, AC, CC, EC, BC, HC, sP, lP, cP, hP, uP, yP, wP, MP, CP, PP, RP, YE, iB, nB, rB, oB, lB, hB, HB, yI, AI, CI, II, OI, RI, xk, Mk, Dk, $k, kD, DD, FD, qD, nL, aL, rL, hL, pL } from './three-r150.js';
function mL(e, t, s = 0) {
  if ("string" == typeof e && (e = t[e]), 0 === s) return function () {
    return e.call(t);
  };
  if (1 === s) return function (s) {
    return e.call(t, s);
  };
  if (2 === s) return function (s, i) {
    return e.call(t, s, i);
  };
  if (3 === s) return function (s, i, n) {
    return e.call(t, s, i, n);
  };
  if (4 === s) return function (s, i, n, a) {
    return e.call(t, s, i, n, a);
  };
  if (5 === s) return function (s, i, n, a, r) {
    return e.call(t, s, i, n, a, r);
  };
  throw new Error("Too many arguments");
}
function fL(e, t, s = Number.MAX_SAFE_INTEGER) {
  const i = [];
  function n() {
    return new e();
  }
  return "function" == typeof t && (e.prototype.onPoolReset = t), e.prototype.release = function () {
    return e.release(this), this;
  }, e.alloc = function (t) {
    if (!(t <= 0)) for (; t--;) e.release(n());
  }, e.get = function () {
    const e = i.pop() || n();
    return e.onPoolReset && e.onPoolReset(e), e;
  }, e.release = function () {
    let e = arguments.length;
    for (; e--;) i.length < s && i.push(arguments[e]);
  }, e;
}
fL(UA, e => e.set(0, 0, 0, 0)), fL(AC, e => e.setRGB(0, 0, 0)), fL(DA, e => e.setScalar(0)), fL(HA, e => e.setScalar(0)), fL(nM, e => e.setScalar(0)), fL(jM, e => e.set(0, 0, 0, "XYZ")), fL(OM);
const gL = e => e;
let vL = {},
  bL = !1;
function yL() {
  return vL;
}
const _L = new Proxy({}, {
  get: (e, t) => vL[t]
});
function xL(e = {}) {
  if (bL) return vL;
  bL = !0;
  const t = e,
    s = t.app || {},
    i = Array.isArray(e.plugins) ? [...e.plugins] : [],
    n = {},
    a = ["PluginsInstall", "Init", "Preload", "Start", "Load", "Prerender", "Frame", "Update", "Render"].reduce((e, t) => (e["before" + t] = Po(), e["after" + t] = Po(), e), {});
  let r = {
    app: new Proxy({}, {
      get: function (e, t) {
        return s[t] ? s[t] : void 0;
      }
    }),
    state: n,
    hooks: a,
    options: t,
    plugins: i,
    usePlugin: o,
    init: gL,
    preload: gL,
    load: gL,
    start: gL,
    prerender: () => vL.frame(),
    frame: () => {
      vL.update(), vL.render();
    },
    enrollMixin: function (...e) {
      for (let t = 0; t < e.length; t += 2) {
        const s = e[t],
          i = e[t + 1];
        if (!i) continue;
        const n = r.collection.mixins;
        n[s] || (n[s] = i);
      }
    },
    enrollComponent: function (...e) {
      for (let t = 0; t < e.length; t += 2) {
        const s = e[t],
          i = e[t + 1];
        if (!i) continue;
        const n = r.collection.components;
        n[s] || (n[s] = i);
      }
    },
    update: gL,
    render: gL
  };
  return r = Object.assign(vL, r), r.collection = {
    mixins: {},
    components: {}
  }, (e.decorator || gL)(vL), vL.log = () => {}, vL.usePlugin = o, c("init", !0, !0, () => {
    !function () {
      a.beforePluginsInstall.emit();
      const e = r.plugins.filter(Boolean);
      r.usePlugin = l;
      for (const t of e) {
        const e = Array.isArray(t);
        l(e ? t[0] : t, e ? t[1] : {});
      }
      a.afterPluginsInstall.emit(), a.beforePluginsInstall.unwatchAll(), a.afterPluginsInstall.unwatchAll();
    }();
    const e = e => () => n.prerendering = e;
    ["frame", "update", "render"].forEach(e => c(e, !1)), ["preload", "start"].forEach(e => c(e, !0, !0)), ["load"].forEach(e => c(e, !0)), c("prerender", !0, !1, e(!0), e(!1));
  }), r;
  function o(e, t = {}) {
    i.includes(e) || i.push([e, t]);
  }
  function l(e, t = {}) {
    const s = {
      log: gL
    };
    return t = Object.assign({}, s, t), e.install ? e.install.call(r, r, t) : "function" == typeof e ? e.call(r, r, t) : void 0;
  }
  function c(e, t, s, i, n) {
    const o = r[e] || gL,
      l = (c = e).charAt(0).toUpperCase() + c.slice(1);
    var c;
    const h = a["before" + l] || gL,
      u = a["after" + l] || gL;
    r[e] = t ? async function (e) {
      h.emit(), i && i(), await o(e), n && n(), u.emit(), s && (h.unwatchAll(), u.unwatchAll());
    } : function (e) {
      h.emit(), i && i(), o(e), n && n(), u.emit(), s && (h.unwatchAll(), u.unwatchAll());
    };
  }
}
const wL = "string",
  SL = {};
let AL = 0;
class ML {
  constructor(e = {}) {
    this.isComponent = !0, this.props = e;
    (this.usedMixins = []).dynamic = [], this.static = !1, this.webgl = yL(), this.scene = null, this.parent = null, this.base = null;
    (this.children = []).dynamic = [], this.isInit = !1, this.isDestroyed = !1, this.uid = ++AL, this.name || (this.props.name ? this.name = this.props.name : this.props.id ? this.name = this.props.id : (this.name = this.constructor.name, SL[this.name] ? ++SL[this.name] : SL[this.name] = 1, SL[this.name] > 1 && (this.name += "_" + (SL[this.name] - 1)))), this.log = () => {};
  }
  triggerInit() {
    if (!this.isInit) {
      if (this.beforeInit && this.beforeInit(), this.mixins) {
        const e = this.mixins;
        if (Array.isArray(e)) for (let t = 0; t < e.length; t++) {
          let s,
            i = e[t];
          Array.isArray(i) && (s = i[1], i = i[0]), this.useMixin(i, s);
        }
      }
      this.init && this.init(), this.isInit = !0, this.afterInit && this.afterInit();
    }
  }
  bind(e, t = 0) {
    return this[e] = mL(e, this, t), this[e];
  }
  useMixin(e, t = {}) {
    typeof e === wL && (e = this.webgl.collection.mixins[e]), e && (e.isMixin ? e : new e(t)).use(this);
  }
  unuseMixin(e) {
    e && e.unuse();
  }
  addObject3D(e) {
    return this.base && this.base.add(e), e;
  }
  removeObject3D(e) {
    return this.base && this.base.remove(e), null;
  }
  add(e, t = {}, s) {
    if (typeof e === wL && (e = this.webgl.collection.components[e]), !e) return;
    if (~this.children.indexOf(e)) return e;
    e.isComponent || (e = new e(t));
    const i = e.parent;
    return i && i.remove(e), e.parent = this, this.scene ? e.scene = this.scene : this.isScene && (e.scene = this), e.isInit || e.triggerInit(t), e.static || this.children.dynamic.push(e), this.children.push(e), e.base && (s ? s.add(e.base) : this.base && this.base.add(e.base)), e.destroyed ? (this.remove(e), e) : (this.isAttached && CL(this.scene, e), e);
  }
  removeFromParent() {
    this.parent && this.parent.remove(this);
  }
  remove(e) {
    const t = this.children.indexOf(e);
    if (!~t) return;
    this.children.splice(t, 1);
    const s = this.children.dynamic.indexOf(e);
    return ~s && this.children.dynamic.splice(s, 1), e.parent = null, e.base && e.base.removeFromParent(), PL(e), null;
  }
  triggerUpdate() {
    if (!this.isInit) return;
    this.beforeUpdate && this.beforeUpdate();
    const e = this.usedMixins.dynamic;
    for (let s = 0, i = e.length; s < i; s++) {
      const t = e[s];
      if (t && t.update(), this.isDestroyed) break;
      t.isDestroyed && (i--, s--);
    }
    if (this.isDestroyed) return;
    if (this.update && this.update(), this.isDestroyed) return;
    const t = this.children.dynamic;
    for (let s = 0, i = t.length; s < i; s++) {
      const e = t[s];
      e && e.triggerUpdate(), e.isDestroyed && (i--, s--);
    }
    !this.isDestroyed && this.afterUpdate && this.afterUpdate();
  }
  destroy() {
    if (!this.isDestroyed) {
      this.beforeDestroy && this.beforeDestroy();
      for (let e = this.usedMixins.length - 1; e >= 0; e--) this.usedMixins[e].destroy();
      this.parent && this.parent.remove(this);
      for (let e = this.children.length - 1; e >= 0; e--) this.children[e].destroy();
      if (this.base) {
        for (let e = this.base.children.length - 1; e >= 0; e--) this.base.remove(this.base.children[e]);
        this.base.removeFromParent();
      }
      this.props = null, this.usedMixins = null, this.webgl = null, this.scene = null, this.parent = null, this.base = null, this.children = null, this.isDestroyed = !0;
    }
  }
}
function CL(e, t) {
  const s = t.children,
    i = t.usedMixins;
  if (!t.isAttached) {
    t.isAttached = !0, t.scene = e, t.attached && t.attached();
    for (let e = i.length - 1; e >= 0; e--) i[e].componentAttached(t);
    for (let t = s.length - 1; t >= 0; t--) CL(e, s[t]);
  }
}
function PL(e) {
  const t = e.children,
    s = e.usedMixins;
  if (e.isAttached) {
    for (let e = t.length - 1; e >= 0; e--) PL(t[e]);
    for (let t = s.length - 1; t >= 0; t--) s[t].componentDetached(e);
    e.isAttached = !1, e.detached && e.detached(), e.scene = null;
  } else e.scene = null;
}
ML.triggerAttached = CL, ML.triggerDetached = PL;
class TL extends ML {
  constructor(e = {}) {
    super(e), this.isCamera = !0, this.isUsed = !1;
  }
  afterInit() {
    this.cam && !this.base ? this.base = this.cam : this.cam || (this.cam = function () {
      const e = window.innerWidth / window.innerHeight;
      return new uP(55, e, .1, 100);
    }()), this.base || (this.base = this.cam);
    const e = this.webgl.renderer.drawingBufferSize;
    this.resizeSignal = e.watchImmediate(this.resize, this);
  }
  used() {}
  unused() {}
  resize(e) {
    this.cam.aspect = e.x / e.y, this.cam.updateProjectionMatrix();
  }
  destroy() {
    Co(this.resizeSignal), super.destroy();
  }
}
function EL(e, t) {
  e && e.isUsed != t && (e.isUsed = !!t, e.isUsed ? e.used() : e.unused());
}
class BL extends ML {
  constructor(e = {}) {
    e.autoAttach = !!(e.autoAttach ?? 1), super(e, !0), this.isScene = !0, this._cam = {
      current: !1,
      forced: !1
    }, this.props || (this.props = e);
  }
  triggerInit() {
    this.isInit || (this.base = new oB(), super.triggerInit(), this.camera || (this.camera = this.add(TL)), this.props.autoAttach && this.attach());
  }
  attach() {
    ML.triggerAttached(this, this);
  }
  detach() {
    ML.triggerDetached(this, this);
  }
  update() {}
  init() {}
  get camera() {
    return this._cam.current;
  }
  set camera(e) {
    e && e.isCamera || (e = !1);
    const t = this._cam;
    t.current !== e && (EL(t.current, !1), t.current = e, t.forced || EL(t.current, !1));
  }
  get overrideCamera() {
    return this._cam.forced;
  }
  set overrideCamera(e) {
    e && e.isCamera || (e = !1);
    const t = this._cam;
    t.forced !== e && (EL(t.forced, !1), EL(t.current, !1), t.forced = e, EL(t.forced, !0));
  }
  getCurrentCamera() {
    return this._cam.forced || this._cam.current;
  }
  render() {
    const e = this.webgl.threeRenderer,
      t = this.getCurrentCamera();
    t && e.render(this.base, t.cam);
  }
  triggerRender() {
    this.beforeRender && this.beforeRender(), this.render(), this.afterRender && this.afterRender();
  }
  destroy() {
    this.detach(), super.destroy();
  }
}
yL();
const IL = {
  global: {
    res: {
      value: new DA(0, 0)
    }
  },
  pixelRatio: {
    value: 1
  },
  time: {
    value: 0
  },
  playerPosition: {
    value: new HA(0, 0, 0)
  },
  grass: {
    current: {
      value: new nM(0, 0, 0, 0)
    },
    delayed: {
      value: new DA(0, 0)
    }
  },
  water: {
    waterProgress: {
      value: 0
    }
  },
  bigShadow: {
    bigShadowFalloff: {
      value: 1 / 30
    },
    bigShadowMatrix: {
      value: new OM()
    },
    bigShadowMap: {
      type: "t",
      value: null
    },
    bigShadowData: {
      value: new nM()
    },
    bigShadowDynamicChunks: {
      value: 0
    },
    bigShadow: {
      value: {
        mapSize: new DA(),
        bias: 0,
        radius: 0
      }
    }
  },
  transitions: {
    road: {
      value: 0
    },
    sea: {
      value: 0
    },
    games: {
      value: 0
    },
    maskRadius: {
      value: 0
    }
  },
  dirShadow: {
    dirShadowMatrix: {
      value: new OM()
    },
    dirShadowMap: {
      type: "t",
      value: null
    },
    dirShadowData: {
      value: new nM()
    },
    dirShadow: {
      value: {
        mapSize: new DA(),
        bias: 0,
        radius: 0,
        normalBias: 0
      }
    }
  },
  bounds: {
    min: {
      value: new HA()
    },
    max: {
      value: new HA()
    }
  },
  uIslandDepth: {
    value: null
  }
};
const kL = new OM(),
  DL = new nM(),
  LL = new HA();
class OL extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    this.base = new YE(), this.ambilight = this.addObject3D(new DD(16777215, .65));
    const e = this.dirLight = this.addObject3D(new kD(16777215, .45));
    this.addObject3D(e.target), this.dirLightPos = this.webgl.store.islands.lights.directional.target, e.position.copy(this.dirLightPos), e.castShadow = !0, e.shadow.camera.far = 100, e.shadow.normalBias = .1, this.webgl.store.dynamicShadowSize.watchImmediate(this.setShadowSize, this);
  }
  attached() {
    this.base.manualMatrixUpdate = !0, this.base.updateMatrixWorld(!0);
  }
  setShadowSize(e = 128) {
    const t = this.dirLight;
    t.shadow.mapSize.width !== e && (t.shadow.mapSize.width = e, t.shadow.mapSize.height = e, e >= 2048 ? this.shadowSize = 30 : e >= 1024 ? this.shadowSize = 26 : e >= 512 ? this.shadowSize = 20 : e >= 256 ? this.shadowSize = 15 : e >= 128 && (this.shadowSize = 12), IL.bigShadow.bigShadowFalloff.value = 1 / this.shadowSize, IL.bigShadow.bigShadowFalloff.needsUpdate = !0, t.shadow.camera.top = this.shadowSize, t.shadow.camera.bottom = -this.shadowSize, t.shadow.camera.left = this.shadowSize, t.shadow.camera.right = -this.shadowSize, t.shadow.map && (t.shadow.map.dispose(), t.shadow.map = null));
  }
  beforeUpdate() {
    const e = this.scene;
    if (!e) return;
    const t = e.getCurrentCamera().base.position;
    this.dirLight.target.position.copy(t);
    const s = HA.get().copy(this.dirLightPos).multiplyScalar(20);
    this.dirLight.position.copy(t).add(s), this.dirLight.updateMatrixWorld(), this.dirLight.target.updateMatrixWorld(), function (e) {
      const t = e.target.position,
        s = 2 / e.shadow.mapSize.x,
        i = e.shadow.camera.projectionMatrix,
        n = e.shadow.camera.matrixWorldInverse,
        a = kL.multiplyMatrices(i, n),
        r = DL.set(t.x, t.y, t.z, 1);
      r.applyMatrix4(a), r.divideScalar(r.w), r.x = Math.floor(r.x / s) * s, r.y = Math.floor(r.y / s) * s, r.multiplyScalar(r.w), r.applyMatrix4(a.invert());
      const o = LL.copy(r).sub(t);
      e.target.position.add(o), e.position.add(o), e.updateMatrixWorld(), e.target.updateMatrixWorld();
    }(this.dirLight), s.release();
  }
  update() {
    this.dirLight.shadow.map && function (e) {
      const {
          dirShadow: t,
          dirShadowData: s,
          dirShadowMatrix: i,
          dirShadowMap: n
        } = IL.dirShadow,
        a = s.value;
      a.copy(e.shadowSize), t.value.mapSize.copy(e.shadowSize), t.value.bias = a.z = e.shadowBias, t.value.radius = a.w = e.shadowRadius, t.value.normalBias = a.w = e.shadowNormalBias, n.value = e.texture, i.value.copy(e.matrix);
    }({
      texture: this.dirLight.shadow.map.texture,
      matrix: this.dirLight.shadow.matrix,
      shadowBias: this.dirLight.shadow.bias,
      shadowSize: this.dirLight.shadow.mapSize,
      shadowRadius: this.dirLight.shadow.radius,
      shadowNormalBias: this.dirLight.shadow.normalBias
    });
  }
  beforeDestroy() {
    this.dirLight.shadow.map.dispose(), this.webgl.store.dynamicShadowSize.unwatch(this.setShadowSize, this);
  }
}
let RL = new AC();
const zL = e => (Number.isInteger(e) ? e + "." : e) + "",
  NL = (...e) => e.map(zL).join(","),
  FL = (e, t, s) => "vec3(" + NL(e, t, s) + ")",
  UL = (e, t) => {
    e.r ? RL.copy(e) : RL.set(e);
    const s = RL.r.toFixed(3),
      i = RL.g.toFixed(3),
      n = RL.b.toFixed(3);
    return null != t ? "vec4(" + NL(s, i, n, t) + ")" : FL(s, i, n);
  };
let HL = null;
function GL() {
  return HL || (HL = {
    WATER_BASE_LEVEL: zL(.2),
    WATER_MAX_DEPTH: zL(-4),
    WATER_FOAM_HEIGHT: zL(.1),
    BASE_TRANSITION_COLOR: UL(new AC(.222, .222, .467)),
    ROAD_GROUND_COLOR: UL(new AC(203 / 255, 237 / 255, 229 / 255)),
    GAMES_TRANSITION_COLOR: UL(new AC(200 / 255, 184 / 255, 217 / 255))
  }, _L.app.$device.type.mobile && (HL.IS_MOBILE = !0), HL);
}
let VL = 0;
function WL(e, t, s) {
  const i = () => {};
  return {
    c: ++VL,
    shader: e,
    use: s => {
      const i = s.material || s;
      return i[t] = e, i.needsUpdate = !0, s;
    },
    unuse: i,
    clear: i
  };
}
const jL = WL("varying vec2 vUv;const vec3 skyBottom=SKY_BOTTOM_COLOR;const vec3 skyTop=SKY_TOP_COLOR;const vec3 waterColor=WATER_COLOR;uniform float time;uniform sampler2D clouds;void main(){float skyProgress=smoothstep(0.,1.,(vUv.y*2.-1.)*4.)*1.5;vec3 skyColor=mix(skyBottom,skyTop,skyProgress);float waterProgress=1.-smoothstep(0.502,0.5,vUv.y);vec3 watColor=mix(waterColor,SKY_BOTTOM_COLOR,smoothstep(SKY_HORIZON_FADE,0.502,vUv.y)*SKY_HORIZON_STRENGTH);skyColor=mix(watColor,skyColor,waterProgress);vec2 cuv=vec2(0.);cuv.y=1.-clamp(max(0.,vUv.y-0.5)*18.,0.,1.);cuv.x=vUv.x*4.-time*0.004;vec4 c=texture2D(clouds,cuv).rgba;c.rgb/=(c.a+0.001);float alpha=smoothstep(0.4+cuv.y*0.5,0.9,c.a)*SKY_CLOUDS_ALPHA;skyColor=mix(skyColor,c.rgb*SKY_CLOUDS_MULT,alpha*waterProgress*step(0.01,cuv.y)*0.75*(1.-cuv.y));\nfloat starBand=smoothstep(0.53,0.72,vUv.y);vec2 starGrid=vec2(vUv.x*150.,(vUv.y-0.5)*105.);vec2 starCell=floor(starGrid);vec2 starLocal=fract(starGrid)-0.5;float starSeed=fract(sin(dot(starCell,vec2(127.1,311.7)))*43758.5453);float starVisible=step(0.975,starSeed);float starSize=mix(0.06,0.18,fract(starSeed*19.13));float starCore=smoothstep(starSize,0.,length(starLocal));float starHalo=smoothstep(starSize*3.2,0.,length(starLocal))*0.24;float starTwinkle=0.82+0.18*sin(time*0.7+starSeed*6.28318);vec3 starColor=mix(vec3(0.62,0.78,1.),vec3(1.,0.93,0.74),fract(starSeed*9.7));skyColor+=starColor*(starCore+starHalo)*starVisible*starTwinkle*starBand*step(0.01,waterProgress);\n#if defined(IS_BIOME_TESTLAB)\nskyColor=vec3(TESTLAB_GRAY);\n#endif\ngl_FragColor=vec4(skyColor,1.);}", "fragmentShader"),
  qL = WL("varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}", "vertexShader");
function ZL(e) {
  if (e.use) return e;
  let t = [];
  return e.prototype.reset = function ({
    biome: e
  } = {}) {
    this.biome = e, Object.assign(this.defines, e.defines), this.biomeChanged && this.biomeChanged(), this.needsUpdate = !0;
  }, e.use = function ({
    biome: s = _L.store.biomes.default
  } = {}) {
    let i,
      n = t.length;
    for (; n--;) {
      if (t[n].biome === s) {
        i = t.splice(n, 1)[0];
        break;
      }
    }
    return i || (t.length >= 1 ? (i = t.shift(), i.reset && i.reset({
      biome: s
    })) : (i = new e(), i.reset && i.reset({
      biome: s
    }))), t.push(i), i;
  }, e.unuse = function () {}, e;
}
const $L = ZL(class extends cP {
    constructor() {
      super({
        depthTest: !0,
        depthWrite: !1,
        defines: {
          ...GL()
        }
      }), this.uniforms = {
        time: IL.time,
        clouds: {
          value: _L.resources.textures.clouds
        }
      }, jL.use(this), qL.use(this), this.type = "ShaderMaterial", this.isShaderMaterial = !0;
    }
  }),
  XL = new Mk(1, 32, 32).scale(-1, 1, 1);
class YL extends ML {
  init() {
    this.base = new YE(), this.sky = new sP(XL, $L.use({
      biome: this.scene.biome
    })), this.sky.scale.setScalar(800), this.sky.renderOrder = this.webgl.store.renderOrder.skybox, this.addObject3D(this.sky), this.base.manualMatrixUpdate = !0, this.static = !0;
  }
  attached() {
    this.sky.material.biome !== this.scene.biome && (this.sky.material = $L.use({
      biome: this.scene.biome
    }));
    const e = this.scene.center;
    this.base.position.x = e.x, this.base.position.z = e.z, this.base.updateMatrixWorld(!0);
  }
  detached() {
    this.removeFromParent();
  }
}
let JL;
YL.use = () => JL = JL || new YL();
class QL extends cP {
  constructor(e = {}) {
    QL.prototype.lineWidth = 1, super(e), this.type = "ShaderMaterial", this.vertexShader = "varying vec2 vUv;uniform mat3 uvTransform;attribute float count;attribute float progress;attribute float data;attribute vec3 previous;attribute vec3 next;attribute float side;attribute float counters;uniform float lineWidth;uniform float elapsedTime;vec3 getExtrusion(){vec3 T=normalize(next-position);vec3 B=normalize(cross(T,next+position));vec3 N=normalize(cross(B,T));return normalize(B+N);}void main(){vUv=(vec3(uv,1)).xy;\n#include <begin_vertex>\nvec3 extrusion=vec3(.0,1.,.0);transformed+=extrusion*lineWidth*.5*side;\n#include <project_vertex>\n}", this.fragmentShader = "uniform float elapsedTime;uniform float opacity;varying vec2 vUv;varying float vData;void main(){float progress=elapsedTime;float alpha=1.-clamp(abs(progress-vUv.x)*5.,.0,1.);alpha=(1.-step(sin(vUv.x*3.14)*vUv.y,.5))*alpha;float border=1.-abs(vUv.x*2.-1.)*1.;gl_FragColor=vec4(vec3(1.),alpha*.5*border);}", this.uniforms = Object.assign({
      elapsedTime: {
        value: 0
      },
      lineWidth: {
        value: e.lineWidth || 1
      }
    });
  }
}
class KL extends HC {
  constructor(e) {
    super(), this.vertices = [], this.positions = [], this.previous = [], this.next = [], this.widths = [], this.sides = [], this.indices = [], this.uvs = [], this.counters = [], this.lineDistances = [], this.thicknesses = [];
    for (let t = 0, s = e.length; t < s; t++) {
      const s = t / e.length;
      this.vertices.push(e[t]), this.counters.push(s, s);
    }
    this.process(), this.update();
  }
  setWidth(e) {
    const t = 1 / this.vertices.length;
    for (let s = 0, i = this.vertices.length; s < i; s++) this.widths[2 * s] = this.widths[2 * s + 1] = e(s * t);
  }
  update() {
    for (let e = 0, t = this.vertices.length; e < t; e++) {
      const t = this.vertices[e],
        s = this.vertices[e - 1] || t,
        i = this.vertices[e + 1] || t;
      this.positions[6 * e + 0] = this.positions[6 * e + 3] = t.x, this.positions[6 * e + 1] = this.positions[6 * e + 4] = t.y, this.positions[6 * e + 2] = this.positions[6 * e + 5] = t.z, this.previous[6 * e + 0] = this.previous[6 * e + 3] = s.x, this.previous[6 * e + 1] = this.previous[6 * e + 4] = s.y, this.previous[6 * e + 2] = this.previous[6 * e + 5] = s.z, this.next[6 * e + 0] = this.next[6 * e + 3] = i.x, this.next[6 * e + 1] = this.next[6 * e + 4] = i.y, this.next[6 * e + 2] = this.next[6 * e + 5] = i.z;
    }
    this.attributes.position ? (this.attributes.position.copyArray(this.positions), this.attributes.previous.copyArray(this.previous), this.attributes.next.copyArray(this.next), this.attributes.width.copyArray(this.widths), this.attributes.position.needsUpdate = !0, this.attributes.previous.needsUpdate = !0, this.attributes.next.needsUpdate = !0, this.attributes.width.needsUpdate = !0) : (this.setAttribute("position", this.getBufferAttribute(this.positions, 3)), this.setAttribute("previous", this.getBufferAttribute(this.previous, 3)), this.setAttribute("next", this.getBufferAttribute(this.next, 3)));
  }
  getTotalLineDistance() {
    return this.lineDistances[this.lineDistances.length - 1];
  }
  getBufferAttribute(e, t) {
    return new EC(new Float32Array(e), t);
  }
  process() {
    const e = 1 / this.vertices.length;
    for (let t = 0, s = this.vertices.length; t < s; t++) this.sides.push(1, -1), this.widths.push(1, 1), this.uvs.push(t * e, 0, t * e, 1);
    for (let t = 0; t < this.vertices.length - 1; t++) {
      const e = 2 * t;
      this.indices.push(e, e + 1, e + 2), this.indices.push(e + 2, e + 1, e + 3);
    }
    this.setAttribute("side", this.getBufferAttribute(this.sides, 1)), this.setAttribute("width", this.getBufferAttribute(this.widths, 1)), this.setAttribute("uv", this.getBufferAttribute(this.uvs, 2)), this.setAttribute("counters", this.getBufferAttribute(this.counters, 1)), this.setIndex(new EC(new Uint16Array(this.indices), 1));
  }
}
class eO extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    this.base = new YE();
    for (let e = 0; e < 4; e++) {
      const e = [],
        t = 5,
        s = 50,
        i = s / t;
      for (let l = 0, c = t; l < c; l++) {
        const t = .5 * -s + l * i,
          n = By.randomFloat(0, 2.5),
          a = By.randomFloat(-2.5, 2.5),
          r = new HA(t, n, a);
        e.push(r);
      }
      const n = new yI(e),
        a = new KL(n.getPoints(500)),
        r = new QL({
          lineWidth: .2,
          depthTest: !1,
          side: Zx,
          transparent: !0
        }),
        o = new sP(a, r);
      o.position.x = By.randomFloat(-100, 100), o.position.z = By.randomFloat(-100, 100), o.timeOffset = Math.random(), o.speed = By.randomFloat(.45, .65), this.addObject3D(o);
    }
    this.watchSignal(this.webgl.store.windVisible, e => this.base.visible = e, this, !0), this.base.manualMatrixUpdate = !0;
  }
  attached() {
    this.base.updateMatrixWorld(!0);
  }
  update() {
    if (!this.base.visible) return;
    const e = this.webgl.time.elapsed / 1e3;
    for (let t = 0, s = this.base.children.length; t < s; t++) {
      const s = this.base.children[t],
        i = s.position,
        n = s.material,
        a = xy((e + s.timeOffset) * s.speed, 1);
      n.opacity = .35, n.uniforms.elapsedTime.value = a, a < .01 && (i.copy(this.scene.getCurrentCamera().cam.position), i.x += By.randomFloat(-25, 25), i.y -= 4, i.z += By.randomFloat(-25, 25), s.updateMatrixWorld());
    }
  }
  detached() {
    this.removeFromParent();
  }
}
let tO;
eO.use = () => tO = tO || new eO();
const sO = WL("precision highp float;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <world_pos_pars>\n#include <conditionals>\n#include <linear_step>\n#include <luma>\n#include <blend_modes>\n#include <bg_fog_pars>\n#include <big_shadow_pars>\nvarying float vCheapAO;float getShadowHard(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bvec4 inFrustumVec=bvec4(shadowCoord.x>=0.0,shadowCoord.x<=1.0,shadowCoord.y>=0.0,shadowCoord.y<=1.0);bool inFrustum=all(inFrustumVec);bvec2 frustumTestVec=bvec2(inFrustum,shadowCoord.z<=1.0);bool frustumTest=all(frustumTestVec);if(frustumTest)shadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);return shadow;}varying float vY;varying float vFade;uniform float time;uniform sampler2D noise;uniform float uHalfBoxSize;const vec3 bottomColor=GRASS_BOTTOM_COLOR;const vec3 topColor=GRASS_TOP_COLOR;void main(){vec3 color=mix(bottomColor,topColor,smoothstep(0.2,1.,vY));vec4 diffuseColor=vec4(color,1.);vec3 bigShadowDist=(cameraPosition-vWorldPos.xyz)*bigShadowFalloff;float bigShadowLen=dot(bigShadowDist,bigShadowDist);float bigShadowWeight=clamp(bigShadowLen*bigShadowLen*bigShadowLen*bigShadowLen,.0,1.);DirectionalLightShadow directionalLightShadow;directionalLightShadow=directionalLightShadows[0];float invBigShadowDynamicChunks=(1.-bigShadowDynamicChunks);float shadow=bigShadowWeight<0.999?getShadow(directionalShadowMap[0],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[0]):1.0;float shadowBig=bigShadowWeight>(0.001-invBigShadowDynamicChunks)?getShadowHard(bigShadowMap,bigShadow.mapSize,bigShadow.bias,bigShadow.radius,vBigShadowDirectionalCoords):1.;float shadowFade=1.-bigShadowWeight*invBigShadowDynamicChunks;shadow=1.-(1.-smoothstep(0.4,0.5,shadow))*shadowFade;shadowBig=1.-(1.-smoothstep(0.4,0.92,shadowBig))*1.;vec3 shadowColor=mix(vec3(0.,.1,.55),vec3(1.),shadow);vec3 shadowBigColor=mix(vec3(0.,.1,.55),vec3(1.),shadowBig);vec3 allDynColor=mix(shadowColor,shadowBigColor,bigShadowWeight);vec3 nonDynColor=min(shadowColor,shadowBigColor);vec3 shadowT=mix(nonDynColor,allDynColor,bigShadowDynamicChunks);diffuseColor.rgb-=(1.-shadowT)*(0.318309886*diffuseColor.rgb);float cheapAO=min(vCheapAO,0.7);vec3 cheapAOColor=diffuseColor.rgb*1.2-0.4;diffuseColor.rgb=mix(diffuseColor.rgb,cheapAOColor,cheapAO);\n#include <clouds>\ngl_FragColor=vec4(diffuseColor.rgb,smoothstep(.1,.4,vY)*vFade);}", "fragmentShader"),
  iO = WL("precision highp float;\n#include <common>\n#include <packing>\n#include <envmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <linear_step>\n#include <get_instance_matrix>\n#include <big_shadow_pars>\nattribute vec3 instance;uniform float uTime;uniform float uHalfBoxSize;uniform float uHalfBoxSizeSq;uniform vec3 uBoxPosition;uniform vec3 uBoundsMin;uniform vec3 uBoundsMax;uniform sampler2D uIslandDepth;varying float vY;varying float vFade;const float DURATION=100.;uniform vec4 camQuat;varying float vShadow;varying float vShadowBig;varying float vCheapAO;uniform mat4 bigShadowMatrix;uniform vec4 pPos;uniform vec2 pPosDelayed;\n#include <world_pos_pars>\nvoid main(){vec3 pos=vec3(position.x,position.y+0.05,0.);float uvy=position.y;pos*=0.3;vec3 instancePos=vec3(instance.x,0.,instance.y);float instanceID=instance.z;float boxSize=uHalfBoxSize*2.;vec3 boxPos=uBoxPosition;vec3 translation=boxPos-mod(instancePos+boxPos,boxSize)+uHalfBoxSize;float x=linearstep(uBoundsMin.x,uBoundsMax.x,translation.x);float y=1.-linearstep(uBoundsMin.z,uBoundsMax.z,translation.z);float canBend=step(0.6,uvy);float loop=sin(uTime*(5.+instanceID)*0.0003+instanceID*2.)*0.1;pos.x+=canBend*loop;float fade=1.;vec2 distLen=boxPos.xz-translation.xz;float dist=dot(distLen,distLen);fade=clamp(1.-dist/uHalfBoxSizeSq,0.,1.);vec3 grassText=texture2D(uIslandDepth,vec2(x,y)).rgb;vCheapAO=grassText.g;translation.y=grassText.r*(uBoundsMax.y+abs(uBoundsMin.y))-abs(uBoundsMin.y);fade*=1.-step(grassText.r,0.03);vec2 wPosT=pos.xz+translation.xz;vec2 pLen=pPos.xy-wPosT;vec2 pLenDelayed=pPosDelayed.xy-wPosT;float pDist=dot(pLen,pLen)*3.2;\n#ifndef IS_MOBILE\nfloat pDistDelayed=dot(pLenDelayed,pLenDelayed)*4.;pDist=min(pDist,pDistDelayed);\n#endif\nfloat pInf=smoothstep(2.8,0.,pDist);float pInf2=smoothstep(8.,-1.,pDist);translation.y-=pInf*0.23*canBend;translation.xz+=pPos.zw*pInf2*canBend;if(fade<0.01)pos.xyz=vec3(100000.);vec3 scaleMat=vec3(0.6,1.35+instanceID*0.1,1.);mat4 instanceMatrix=getInstanceMatrix(translation,camQuat,scaleMat);vec4 worldPosition=modelMatrix*instanceMatrix*vec4(pos.x,0.2,pos.z,1.0);vec3 transformedNormal=vec3(0.,0.,1.);vec3 bigShadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 bigShadowWorldPosition=worldPosition+vec4(bigShadowWorldNormal*0.05,0.);vBigShadowDirectionalCoords=bigShadowMatrix*bigShadowWorldPosition;\n#include <shadowmap_vertex>\nvFade=smoothstep(0.,0.3,fade);vY=uvy;vWorldPos=worldPosition;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(pos,1.);}", "vertexShader"),
  nO = ZL(class extends cP {
    constructor(e = {}) {
      super(e);
      const t = _L.resources.textures;
      this.uniforms = {
        ...lP.merge([PP.common, PP.specularmap, PP.fog, PP.lights]),
        uBoxPosition: {
          value: new HA()
        },
        uHalfBoxSize: {
          value: 5
        },
        uHalfBoxSizeSq: {
          value: 25
        },
        uTime: {
          value: 0
        },
        uColor: {
          value: new AC(16777215)
        },
        uBoundsMin: {
          value: IL.bounds.min.value
        },
        uBoundsMax: {
          value: IL.bounds.max.value
        },
        uIslandDepth: {
          ...IL.uIslandDepth
        },
        sphereDirection: {
          value: new DA()
        },
        camQuat: {
          value: new UA()
        },
        ...IL.bigShadow,
        ...IL.dirShadow,
        ...IL.global,
        pPos: IL.grass.current,
        pPosDelayed: IL.grass.delayed,
        time: IL.time,
        ...IL.global,
        noise: {
          value: t.noise
        }
      }, this.defines || (this.defines = {}), GL().IS_MOBILE && (this.defines.IS_MOBILE = !0), this.transparent = !0, this.uniforms.uIslandDepth.needsUpdate = !0, this.uniforms.uIslandDepth.value.needsUpdate = !0, this.lights = !0, this.fog = !0, sO.use(this), iO.use(this);
    }
  });
let aO,
  rO = 184e3,
  oO = 72,
  lO = Math.PI;
new MP();
const cO = new UA(),
  hO = new jM();
class uO extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    aO = this.webgl, this.material = nO.use({
      biome: this.scene.biome
    });
    aO.app.$device.type.mobile && (rO *= .5, oO *= .5), rO = Math.floor(rO), oO = Math.floor(oO), this.initGeometry(rO), this.base = new sP(this.geo, this.material), this.base.renderOrder = aO.store.renderOrder.grass, this.base.frustumCulled = !1, this.position = new HA();
    let e = !1;
    aO.hooks.beforePrerender.watchOnce(() => {
      e = this.base.visible, this.base.visible = !0;
    }), aO.hooks.afterPrerender.watchOnce(() => {
      this.base.visible = e;
    }), this.circleLastPos = new DA();
  }
  attached() {
    this.material.biome !== this.scene.biome && (this.material = nO.use({
      biome: this.scene.biome
    }));
  }
  initGeometry(e) {
    if (e === this.count) return;
    this.count = e, this.geo && this.geo.dispose(), this.geo = new FD();
    const t = new HC();
    t.setIndex([2, 1, 0, 3, 3, 3]), t.setAttribute("position", new BC([-1, 0, 0, 1, 1, 0, 1, -1], 2)), this.geo.index = t.index, this.geo.attributes.position = t.attributes.position;
    const s = Math.sqrt(rO / oO),
      i = Math.cos(Math.PI / 4) * s,
      n = [];
    let a = 0;
    for (let l = 0; l < this.count; l++) {
      let e = Math.random();
      const t = Math.sqrt(l / oO),
        s = Math.cos(e * Math.PI * 2) * t,
        r = Math.sin(e * Math.PI * 2) * t;
      s > i || r > i || r < -i || s < -i || (a++, hO.y = Math.PI, cO.setFromEuler(hO), n.push(s, r, By.randomFloat(-lO, lO)));
    }
    this.buffer = new Float32Array(n.length);
    const r = new HB(this.buffer, 3, !1);
    this.geo.setAttribute("instance", r);
    const o = this.buffer;
    for (let l = 0; l < a; l++) o[3 * l] = n[3 * l], o[3 * l + 1] = n[3 * l + 1], o[3 * l + 2] = n[3 * l + 2];
    this.realCount = a, this.setGrassRadius(this.webgl.store.grass.radius), r.needsUpdate = !0, this.base && (this.base.geometry = this.geo, this.base.needsUpdate = !0);
  }
  setGrassRadius(e = 1) {
    this.geo.instanceCount = this.realCount * e;
    let t = Math.sqrt(this.geo.instanceCount / oO);
    t = Math.cos(Math.PI / 4) * t, this.material.uniforms.uHalfBoxSize.value = t, this.material.uniforms.uHalfBoxSizeSq.value = t * t, this.material.uniforms.uHalfBoxSize.needsUpdate = this.material.uniforms.uHalfBoxSizeSq.needsUpdate = !0;
  }
  update() {
    this.material.uniforms.uTime.value = aO.time.elapsed;
    const e = this.material.uniforms.uBoxPosition.value;
    let t = this.scene.getCurrentCamera();
    const s = HA.get();
    t.grassDummy ? t.grassDummy.getWorldPosition(s) : s.copy(t.base.position), this.material.uniforms.camQuat.value.copy(t.base.quaternion), this.base.visible = !0;
    const i = DA.get().set(s.x, s.z);
    this.base.visible && (e.copy(s), i.sub(this.circleLastPos).normalize(), this.material.uniforms.sphereDirection.value.copy(i), this.setGrassRadius(this.webgl.store.grass.radius), i.release(), this.circleLastPos.set(s.x, s.z), s.release());
  }
  detached() {
    this.removeFromParent();
  }
}
let dO;
uO.use = () => dO = dO || new uO();
const pO = WL("#define PHONG\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <world_pos_pars>\n#include <conditionals>\n#include <linear_step>\n#include <bg_fog_pars>\n#include <big_shadow_pars>\nuniform float time;uniform float waterProgress;const vec3 waterColor=WATER_COLOR;const vec3 waterTopColor=WATER_TOP_COLOR;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;uniform sampler2D terrainPatterns;uniform sampler2D noise;const vec3 baseTerrain=TERRAIN_BASE_COLOR;const vec3 nuanceBaseTerrain=TERRAIN_BASE_NUANCE_COLOR;const vec3 highGrassColor=TERRAIN_HIGHGRASS_COLOR;const vec3 paveColor=TERRAIN_PAVE_COLOR;const vec3 sandLight=TERRAIN_SAND_LIGHT_COLOR;const vec3 sandDark=TERRAIN_SAND_DARK_COLOR;const vec3 roadLight=TERRAIN_ROAD_COLOR;const float roadLighter=0.05;const vec3 roadDark=roadLight*0.91;uniform vec3 playerPos;varying lowp float vCheapAO;\n#include <luma>\nvoid main(){vec4 diffuseColor=vec4(1.);vec4 splatting=texture2D(map,vUv);float mPavement=splatting.r;float mGrass=splatting.g;float mRoad=splatting.b;float mSand=1.-splatting.a;vec3 patterns=texture2D(terrainPatterns,vWorldPos.xz*0.223).rgb;float tint=texture2D(noise,vWorldPos.xz*0.004).r;float pattern=patterns.b;float pattern2=patterns.g;float pattern3=patterns.r;\n#if defined(IS_BIOME_DEF_ISLAND)\ntint+=smoothstep(3.2,-1.,vWorldPos.y)*3.+smoothstep(1.6,-0.5,vWorldPos.y)*4.2;\n#elif defined(IS_BIOME_SUNFALL)\ntint+=smoothstep(2.0,-1.,vWorldPos.y)*3.1+smoothstep(2.1,-0.5,vWorldPos.y)*5.8;\n#endif\nfloat tint2=1.-smoothstep(0.,0.67,tint);diffuseColor.rgb=mix(baseTerrain,baseTerrain*nuanceBaseTerrain,tint2*0.7);float sand=smoothstep(0.1,0.87,mSand);float sand2=step(pattern,smoothstep(0.5,0.8,mSand));float sandPattern=smoothstep(0.1,0.9,pattern2*sand);vec3 sandColor=mix(sandLight,sandDark,tint*0.2);diffuseColor.rgb=mix(diffuseColor.rgb,sandColor-sandPattern*0.064,sand*sand2);\n#if defined(IS_BIOME_DEF_ISLAND)\nfloat grass=smoothstep(0.1,0.88,mGrass);float grass2=step(pattern,smoothstep(0.1,1.,mGrass));float grassPattern=smoothstep(0.2,1.,pattern*grass);diffuseColor.rgb=mix(diffuseColor.rgb,highGrassColor+grassPattern*0.1,grass*grass2);\n#elif defined(IS_BIOME_SUNFALL)\nfloat grass=smoothstep(0.1,0.88,mGrass);float grass2=step(pattern,smoothstep(0.1,1.,mGrass));float grassPattern=smoothstep(0.2,1.,pattern*grass);diffuseColor.rgb=mix(diffuseColor.rgb,highGrassColor+grassPattern*0.1,grass*grass2*0.3);\n#endif\n#if defined(IS_BIOME_DEF_ISLAND)\nfloat pave=smoothstep(0.61,0.62,mPavement);float pave2=step(pattern3,smoothstep(0.6,0.9,mPavement));float pavePattern=smoothstep(0.1,1.,pattern3*pave);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.0),pave*pave2);\n#elif defined(IS_BIOME_SUNFALL)\nfloat pave=smoothstep(0.1,0.99,mPavement);float pave2=step(pattern3,smoothstep(0.,0.65,mPavement));float pavePattern=smoothstep(0.6,pattern2,smoothstep(0.,0.99,mPavement))*0.015;diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.0),pave*pave2);\n#endif\n#if defined(IS_BIOME_DEF_ISLAND)\nvec3 roadColor=vec3(1.0);float road=smoothstep(0.4,0.41,smoothstep(0.2,0.8,mRoad));diffuseColor.rgb=mix(diffuseColor.rgb,roadColor,road);\n#elif defined(IS_BIOME_SUNFALL)\nvec3 roadColor=vec3(1.0);float road=smoothstep(0.2,0.4,mRoad);diffuseColor.rgb=mix(diffuseColor.rgb,roadColor,road);\n#endif\n#if defined(IS_BIOME_TESTLAB)\nfloat vd=distance(vWorldPos.xz,vec2(0.));float gridScale=TESTLAB_GRID_SCALE;float epsA=0.001;float epsB=0.02;float offset=smoothstep(0.25-epsA,0.25+epsA,abs(fract(vWorldPos.z/gridScale)-0.5));float grid=smoothstep(0.25-epsA,0.25+epsA,abs(fract(vWorldPos.x/gridScale)-0.5))+offset;grid=smoothstep(0.5-epsB,0.5+epsB,abs(grid-1.))*smoothstep(1.45,1.499,vWorldPos.y)*smoothstep(50.,10.,vd)*TESTLAB_GRID_ALPHA;diffuseColor.rgb=mix(TESTLAB_GRAY,TESTLAB_GRAY+0.1,grid);\n#endif\n#include <water_depth_frag_pre>\nfloat cheapAO=min(vCheapAO,.7);float testAO=smoothstep(0.2,.8,cheapAO);vec3 cheapAOColor=diffuseColor.rgb*1.2-ISLAND_AO_SUB;\n#if defined(IS_BIOME_DEF_ISLAND)\nfloat reducedAO=max(sand*0.6,max(road,pave*0.45));cheapAO*=1.-reducedAO*0.2;testAO*=1.-reducedAO;\n#endif\ndiffuseColor.rgb=mix(diffuseColor.rgb,cheapAOColor,(cheapAO*0.7+testAO*0.3)*(1.-hasWater));\n#ifdef IS_BIOME_SUNFALL\ndiffuseColor.rgb=mix(diffuseColor.rgb,vec3(luma(diffuseColor.rgb)),smoothstep(0.,0.14,waterDepth)*0.5);\n#endif\nvec3 pLen=playerPos-vWorldPos.xyz;float pFalloff=smoothstep(0.5,0.2,abs(pLen.y));float pDist=dot(pLen,pLen)*1.1;float pS=smoothstep(0.9,-1.2,pDist)*3.1+smoothstep(0.4,-1.8,pDist)*22.;diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*1.6-1.0,diffuseColor.rgb*pS*0.08*FAKE_AO_MULT*pFalloff);\n#include <clouds>\n#include <normal_fragment_begin>\nfloat specularStrength=0.0;vec3 totalEmissiveRadiance=emissive;ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.indirectSpecular+totalEmissiveRadiance;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <bg_fog>\n#include <water_depth_frag>\n#if defined(IS_BIOME_TESTLAB)\nfloat tld=distance(vWorldPos.xz,vec2(0.));gl_FragColor.xyz=mix(gl_FragColor.xyz,TESTLAB_GRAY,smoothstep(28.,48.,tld));\n#endif\n}", "fragmentShader"),
  mO = WL("#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <shadowmap_pars_vertex>\nvarying vec4 vBigShadowDirectionalCoords;uniform mat4 bigShadowMatrix;\n#include <world_pos_pars>\n#ifdef IS_BIOME_TESTLAB\nvarying vec3 vWNormal;\n#endif\nvarying lowp float vCheapAO;attribute float cheapAO;void main(){\n#include <uv_vertex>\nvCheapAO=cheapAO;\n#include <beginnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <project_vertex>\nvViewPosition=-mvPosition.xyz;\n#ifdef IS_BIOME_TESTLAB\nvWNormal=objectNormal;\n#endif\n#include <world_pos>\nvec4 worldPosition=vWorldPos;\n#include <envmap_vertex>\n#include <shadowmap_vertex>\nvec3 bigShadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 bigShadowWorldPosition=modelMatrix*vec4(transformed,1.)+vec4(bigShadowWorldNormal*0.05,0);vBigShadowDirectionalCoords=bigShadowMatrix*bigShadowWorldPosition;\n#include <fog_vertex>\n}", "vertexShader"),
  fO = ZL(class extends cP {
    constructor() {
      super();
      const e = _L.resources.textures,
        t = this.uniforms = {
          ...lP.merge([PP.common, PP.specularmap, PP.fog, PP.lights]),
          time: IL.time,
          ...IL.water,
          ...IL.bigShadow,
          ...IL.global,
          map: {
            value: new iM()
          },
          terrainPatterns: {
            value: e.SplattingPatterns
          },
          noise: {
            value: e.noise
          },
          playerPos: IL.playerPosition,
          emissive: {
            value: new AC(0)
          },
          specular: {
            value: new AC(1118481)
          },
          shininess: {
            value: 0
          }
        };
      this.defines = {
        ...GL()
      }, pO.use(this), mO.use(this), this.map = t.map.value, this.lights = !0, this.fog = !0, this.type = "ShaderMaterial", this.isShaderMaterial = !0;
    }
    biomeChanged() {
      const e = _L.resources.textures,
        t = this.uniforms.terrainPatterns.value,
        s = e[this.biome.splattingPatternsTexture];
      t !== s && (t && t.dispose(), this.uniforms.terrainPatterns.value = s);
    }
  }),
  gO = WL("#define PHONG\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <world_pos_pars>\n#include <conditionals>\n#include <linear_step>\n#include <luma>\n#include <blend_modes>\n#include <bg_fog_pars>\n#include <big_shadow_pars>\nuniform float pixelRatio;uniform vec3 specular;uniform float shininess;uniform float time;varying vec2 vData;varying vec2 vGradient;varying float vAOInf;uniform float waterProgress;const vec3 waterColor=WATER_COLOR;const vec3 waterTopColor=WATER_TOP_COLOR;uniform sampler2D noise;uniform float effectMult;uniform vec3 playerPos;uniform vec3 uBoundsMin;uniform vec3 uBoundsMax;uniform sampler2D uIslandDepth;void main(){\n#include <depth_dither>\nvec4 diffuseColor=vec4(1.);vec3 diffuseTexel=texture2D(map,vUv).rgb;diffuseColor.rgb*=diffuseTexel;vec3 pLen=playerPos-vWorldPos.xyz;float pFalloff=smoothstep(0.5,0.2,abs(pLen.y));float pDist=dot(pLen,pLen)*1.1;float pS=smoothstep(0.9,-1.2,pDist)*3.1+smoothstep(0.4,-1.8,pDist)*22.;diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*1.6-1.0,diffuseColor.rgb*pS*0.08*FAKE_AO_MULT*pFalloff);\n#include <water_depth_frag_pre>\n#include <clouds>\n#include <normal_fragment_begin>\nfloat rimLightPower=1.6;float rimLightStrength=.19;float rightLight=rimLightPower*abs(dot(vNormal,normalize(vViewPosition)));rightLight=1.-smoothstep(.0,1.,rightLight);diffuseColor.rgb+=vec3(rightLight*rimLightStrength)*RIM_COLOR;vec3 totalEmissiveRadiance=diffuseTexel*step(0.5,vData.g);float specularStrength=1.0;ReflectedLight reflectedLight=ReflectedLight(vec3(.0),vec3(.0),vec3(.0),vec3(.0));\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\nvec3 color=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#ifndef HAS_WEBXR\nif(vData.r>0.1875){vec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 matcapUV=vec2(dot(x,normal),dot(y,normal))*0.499+0.5;matcapUV.y=1.-matcapUV.y;matcapUV.x=matcapUV.x*0.25+0.75;vec3 matcap=texture2D(map,matcapUV).rgb;vec3 lMatcapColor=matcap*smoothstep(0.,0.1,(luma(reflectedLight.directDiffuse)));vec3 shadeMatcapColor=mix(lMatcapColor,matcap,0.4+0.4*smoothstep(0.,0.4,luma(matcap)))+reflectedLight.directSpecular;color=mix(color,shadeMatcapColor,0.30);color+=(0.+smoothstep(0.99,0.995,cos(vGradient.x))+smoothstep(0.8,0.81,cos(vGradient.x-1.1))+smoothstep(0.93,0.94,cos(vGradient.x+3.)))*vGradient.y*2.1*smoothstep(1.,0.7,matcap.r)*step(0.32,vData.r)*effectMult;}\n#endif\nfloat x=linearstep(uBoundsMin.x,uBoundsMax.x,vWorldPos.x);float z=1.-linearstep(uBoundsMin.z,uBoundsMax.z,vWorldPos.z);vec3 grassText=texture2D(uIslandDepth,vec2(x,z)).rgb;float y=grassText.b*(uBoundsMax.y+abs(uBoundsMin.y))-abs(uBoundsMin.y);float ddd1=max(0.1,vWorldPos.y-y);float ddd2=smoothstep(0.026,0.005,gl_FragCoord.w);float ddd3=smoothstep(0.032,0.000005,gl_FragCoord.w);vec3 aoColor=max(mix(vec3(0.,0.,0.1),vec3(0.,0.,0.2),ddd3),color*mix(AO_MULT_BOTTOM_TINT,AO_MULT_UP_TINT,smoothstep(-1.9,2.5,ddd1)*mix(AO_ILLUM_LOW,AO_ILLUM_HIGH,ddd2))-smoothstep(0.6,-1.,ddd1)*mix(0.1,0.38,ddd3)*vec3(3.,3.,1.));color=mix(color,aoColor,vAOInf*(1.-hasWater));gl_FragColor=vec4(color,diffuseColor.a);\n#include <bg_fog>\n#include <water_depth_frag>\n#if defined(IS_BIOME_TESTLAB)\nfloat tld=distance(vWorldPos.xz,vec2(0.));gl_FragColor.xyz=mix(gl_FragColor.xyz,TESTLAB_GRAY,smoothstep(28.,50.,tld));\n#endif\n}", "fragmentShader"),
  vO = WL("#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <world_pos_pars>\nuniform float time;uniform sampler2D data;varying vec2 vData;varying vec4 vBigShadowDirectionalCoords;uniform mat4 bigShadowMatrix;varying float vAOInf;varying vec2 vGradient;uniform float effectMult;uniform float noLight;void main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\nvAOInf=clamp(1.-normal.y,0.,1.);vec3 dataTexel=texture2D(data,vUv).rgb;vData=dataTexel.rg;vec3 offset;if(dataTexel.b>0.2){float mult2=smoothstep(0.05,0.46,dataTexel.b);float flagmult=mix(1.,8.,smoothstep(0.5,1.,dataTexel.b));float mult=effectMult;offset.xyz=vec3(cos(time*3.+transformed.x*0.4+transformed.y*0.3)*0.06*mult2*flagmult,0.,sin(time*0.8+transformed.z*-3.+transformed.x*0.6)*-0.04)*mult;transformed+=offset;}else if(dataTexel.b>0.1){transformed.y+=sin(time)*0.08+0.08;}float isWaterfall=step(0.01,dataTexel.g)*step(dataTexel.g,0.4);transformed.xz+=cos(time*-25.+vUv.y*12.)*isWaterfall*smoothstep(0.1,0.4,vUv.y)*0.04;vUv.y=mix(vUv.y,vUv.y*0.4-time*1.6,isWaterfall);\n#include <project_vertex>\nvViewPosition=-mvPosition.xyz;vWorldPos=modelMatrix*vec4(transformed-offset,1.);vec4 worldPosition=vWorldPos;vec3 UP=vec3(0.,1.,0.);vec3 N=normal;vec3 T=normalize(cross(UP,normal));vec3 B=cross(normal,UP);mat3 tsb=mat3(normalize(T),normalize(B),normalize(N));vec4 t=vec4(10.,10.,10.,1.)*viewMatrix;vec3 absCam=abs(cameraPosition);float m=0.25;vGradient.x=(position*tsb).r+worldPosition.y+length(worldPosition.xyz-cameraPosition)*-0.2*m+(t.x+t.y+t.z)*0.2*m+(max(absCam.x,max(absCam.y,absCam.z)))*0.3*m;vGradient.y=smoothstep(50.,5.,length(worldPosition.xyz-cameraPosition))*0.06*vNormal.z;\n#include <envmap_vertex>\n#include <shadowmap_vertex>\nvec3 bigShadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 bigShadowWorldPosition=worldPosition+vec4(bigShadowWorldNormal*0.05,0);vBigShadowDirectionalCoords=bigShadowMatrix*bigShadowWorldPosition;\n#include <fog_vertex>\n}", "vertexShader"),
  bO = ZL(class extends cP {
    constructor() {
      super();
      const e = _L.resources.textures,
        t = this.uniforms = {
          ...lP.merge([PP.common, PP.specularmap, PP.fog, PP.lights]),
          ...IL.water,
          ...IL.bigShadow,
          ...IL.global,
          time: IL.time,
          pixelRatio: IL.pixelRatio,
          playerPos: IL.playerPosition,
          effectMult: {
            value: 1
          },
          map: {
            value: e.Assets_Gradients
          },
          data: {
            value: e.assetsData
          },
          noise: {
            value: e.noise
          },
          diffuse: {
            value: new AC(16777215)
          },
          emissive: {
            value: new AC(0)
          },
          specular: {
            value: new AC(1118481)
          },
          shininess: {
            value: 10
          },
          uBoundsMin: {
            value: IL.bounds.min.value
          },
          uBoundsMax: {
            value: IL.bounds.max.value
          },
          uIslandDepth: {
            ...IL.uIslandDepth
          }
        };
      this.defines = {
        ...GL()
      }, this.map = t.map.value, gO.use(this), vO.use(this), this.lights = !0, this.fog = !0, this.type = "ShaderMaterial", this.isShaderMaterial = !0, this.isAssetMaterial = !0, _L.hooks.beforeUpdate.watch(this.udpate, this);
    }
    pauseEffects(e) {
      this.pausedEffectID = e, this.uniforms.effectMult.value = 0;
    }
    resumeEffects(e) {
      e && e !== this.pausedEffectID || (this.pausedEffectID = null);
    }
    biomeChanged() {
      const e = _L.resources.textures,
        t = this.map,
        s = this.biome,
        i = e.Assets_Gradients,
        n = e[s.gradientsTexture];
      t !== n && (this.map = n, this.uniforms.map.value = n, t && t !== i && t.dispose());
    }
    udpate() {
      if (!this.pausedEffectID) {
        const e = this.uniforms.effectMult;
        e.value = vy(e.value, 1, .07, .001);
      }
    }
  });
class yO extends ML {
  constructor(e) {
    super(e), this.sceneID = e.sceneID, this.uid = e.uid, this.type = e.type, this.store = {};
  }
  triggerInit() {
    super.triggerInit(), this.initDynamicProps && this.initDynamicProps();
  }
  afterActorsInit() {}
  getSavestate(e = {}) {
    const t = e.sceneID || this.sceneID,
      s = e.uid || this.uid,
      i = !!s && this.webgl.savestate.getActorData(t, s);
    if (i) return i;
    if (e.forceTrueWhenFinished) {
      let i = e.forceTrueWhenFinished;
      const n = this.webgl.app.$quests;
      let a = n.getFromItem(i);
      if (a) {
        let e = a.id,
          t = e.slice(0, -4) + "Side";
        e.endsWith("Main") && n.list[t] && (e = t), i = e;
      }
      if (a = n.list[i], a && a.completed) return this.webgl.savestate.updateActorData(t, s, !0), !0;
    }
    return i;
  }
  updateSavestate(e) {
    this.webgl.savestate.updateActorData(this.sceneID, this.uid, e);
  }
  setupMainQuestExclamation(e) {
    const t = this.webgl.app.$quests.getFromItem(e);
    if (!t) return;
    const s = t.item,
      i = this.webgl.savestate.getVariable(s.variable),
      n = t.completed && i,
      a = this.interactionZone;
    a && (this.useNormalIconCollapsed && (a.iconCollapsed = "bubble_collapsed"), n || (a.iconCollapsed = "bubble_collapsed_exclam", this.unwatchQuest = hs(() => t.completed, e => {
      if (!e) return;
      const t = this.interactionZone;
      t && !t.destroyed && (t.iconCollapsed = "bubble_collapsed_alt", this.useNormalIconCollapsed && (t.iconCollapsed = "bubble_collapsed")), this.unwatchQuest();
    })));
  }
  beforeDestroy() {
    this.unwatchQuest && this.unwatchQuest(), super.beforeDestroy && super.beforeDestroy();
  }
  get mixins() {
    const e = this.props.dynamicProps,
      t = ["timers", "reactivity", "actorInteractive"];
    return e && Object.keys(e).length && t.push("actorDynamicProps", "actorPropsTransition"), t;
  }
  init() {}
}
let _O = class extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "screwdriver"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        this.webgl.audio.playSound("sfx_quest_bridge_repair"), this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
      }
    }), this.setupInteraction({
      item: "screwdriver",
      buttonMode: "hold",
      sound: "sfx_quest_screwdriver_interact_loop",
      iconPosition: new HA(.6, 2, 0),
      zone: {
        center: new HA(.7, 0, 0),
        radius: 5
      },
      cameraTarget: new HA(0, 1.5, 0),
      cameraDistance: 2,
      cameraHeight: 2
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.setVariable("isBridgeRepaired", !0), this.updateSavestate(!0);
  }
};
_O.prepare = () => ({
  staticColliders: [{
    asset: "BridgeOn"
  }],
  dynamicProps: {
    off: {
      asset: "BridgeOff",
      collider: "BridgeOff",
      default: 1,
      castFarShadow: 0
    },
    on: {
      asset: "BridgeOn",
      castFarShadow: 1
    }
  }
});
const xO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: _O
}, Symbol.toStringTag, {
  value: "Module"
}));
class wO extends yO {
  init() {
    this.chestPoints = this.chestPoints || tb.chestNormal, this.iconY = this.iconY || 2;
    const e = this.getSavestate(),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateZ: -2
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: this.onInteractionDone,
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix),
          t = new DA(5, 5);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(30, 40),
          position: e.add(new HA(0, -1.2, 0)),
          baseRadius: .3,
          scale: t,
          velDrag: .9,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: .3
        }), this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(60, 60),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_chest_open");
      }
    }), this.setupInteraction({
      buttonIcon: "interactions-yes",
      buttonMode: "hold",
      icon: "bubble_quest",
      sound: "sfx_quest_chest_lockpick_loop",
      iconPosition: new HA(.05, this.iconY, 0),
      zone: {
        center: new HA(1.3, 0, 0),
        radius: 3.7
      },
      cameraTarget: new HA(0, 2, 0),
      cameraDistance: 1,
      cameraHeight: 3
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("chestOpenCount"), this.isBigChest ? this.webgl.savestate.incrementVariable("chestBigOpenCount") : this.webgl.savestate.incrementVariable("chestNormalOpenCount"), this.updateSavestate(!0);
    const e = this.chestPoints;
    this.webgl.app.$notifications.add("ChestOpen", {
      points: e
    }), this.webgl.app.$notifications.displayHint("enroll"), this.webgl.savestate.game.dataPoints += e, this.webgl.app.$analytics.event({
      event_category: "coreGame",
      event_action: "chestOpened",
      event_value: this.webgl.savestate.game.vars.chestOpenCount
    });
  }
}
wO.prepare = () => ({
  staticColliders: [{
    asset: "Chest"
  }],
  dynamicProps: {
    off: {
      asset: "Chest",
      default: 1,
      castFarShadow: 0
    },
    on: {
      asset: "ChestOn",
      castFarShadow: 1
    }
  }
});
const SO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: wO
}, Symbol.toStringTag, {
  value: "Module"
}));
class AO extends wO {
  init() {
    this.isBigChest = !0, this.chestPoints = tb.chestBig, this.iconY = 3, super.init();
  }
}
AO.prepare = () => ({
  staticColliders: [{
    asset: "ChestBig"
  }],
  dynamicProps: {
    off: {
      asset: "ChestBig",
      default: 1,
      castFarShadow: 0
    },
    on: {
      asset: "ChestBigOn",
      castFarShadow: 1
    }
  }
});
const MO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: AO
}, Symbol.toStringTag, {
  value: "Module"
}));
class CO extends yO {
  init() {
    this.static = !0;
  }
}
CO.prepare = () => ({
  staticProps: []
});
const PO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: CO
}, Symbol.toStringTag, {
  value: "Module"
}));
class TO extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "flag"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .1,
        bounceVertical: 1.5,
        rotateX: .15,
        rotateZ: .15
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        const e = HA.get().set(0, .4, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
        const t = new DA(6.5, 6.5);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(20, 30),
          position: e.add(new HA(0, 0, 0)),
          baseRadius: 0,
          scale: t,
          velDrag: .91,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          velocityY: .08,
          power: .25
        }), e.y += 2, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(200, 200),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_plant_grow");
      }
    }), this.setupInteraction({
      item: "flag",
      buttonMode: "hold",
      sound: "sfx_quest_compas_interact_loop",
      iconPosition: new HA(0, 4, 0),
      zone: {
        center: new HA(0, 0, 0),
        radius: 4.5
      },
      cameraTarget: new HA(0, 5, 0),
      cameraDistance: 6.5,
      cameraHeight: 2.5
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("raisedFlagCount"), this.updateSavestate(!0);
  }
}
TO.prepare = () => ({
  staticColliders: [{
    asset: "FlagOff"
  }],
  dynamicProps: {
    off: {
      asset: "FlagOff",
      default: 1,
      castFarShadow: 1
    },
    on: {
      asset: "FlagOn",
      castFarShadow: 0
    }
  }
});
const EO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: TO
}, Symbol.toStringTag, {
  value: "Module"
}));
class BO extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "wateringcan"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateX: 2,
        rotateZ: 2
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
        const t = new DA(40, 100);
        this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t,
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(30, 40),
          position: e.add(new HA(0, -4, 0)),
          scale: t.set(3, 3),
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: .2
        }), e.release(), this.webgl.audio.playSound("sfx_quest_plant_grow");
      }
    }), this.setupInteraction({
      item: "wateringcan",
      buttonMode: "hold",
      sound: "sfx_quest_plant_interact_watering_loop",
      iconPosition: new HA(0, 1.25, 0),
      zone: {
        center: new HA(0, 0, 0),
        radius: 1.9
      },
      cameraTarget: new HA(0, 1.5, 0),
      cameraDistance: 2,
      cameraHeight: 2
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("grownTreeCount"), this.updateSavestate(!0);
  }
}
BO.prepare = () => ({
  staticColliders: [{
    asset: "GrowableTreeSmall"
  }],
  dynamicProps: {
    off: {
      asset: "GrowableTreeSmall",
      default: 1,
      castFarShadow: 0
    },
    on: {
      asset: "GrowableTreeLarge",
      castFarShadow: 1
    }
  }
});
const IO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: BO
}, Symbol.toStringTag, {
  value: "Module"
}));
class kO extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "hammer"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateZ: 2
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
        const t = new DA(12, 12);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(40, 50),
          position: e.add(new HA(0, 0, 0)),
          baseRadius: 5,
          scale: t,
          velDrag: .9,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: 1
        }), e.y += 2, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(300, 300),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_house_build");
      }
    }), this.setupInteraction({
      item: "hammer",
      sound: "sfx_quest_hammerImpact",
      buttonMode: "tap",
      iconPosition: new HA(4.6, 3, 0),
      zones: [{
        center: new HA(3.5, 0, -1.4),
        radius: 4.85
      }, {
        center: new HA(3.5, 0, 1.4),
        radius: 4.85
      }],
      cameraTarget: new HA(0, 1.5, 0),
      cameraDistance: 5,
      cameraHeight: 3
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("builtHouseCount"), this.updateSavestate(!0);
  }
}
kO.prepare = () => ({
  preloadAssets: [],
  staticProps: [],
  staticColliders: [{
    asset: "CobbleHouseOff"
  }],
  dynamicProps: {
    off: {
      asset: "CobbleHouseOff",
      default: !0,
      castFarShadow: !0
    },
    on: {
      asset: "CobbleHouseOn",
      castFarShadow: !1
    }
  }
});
const DO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: kO
}, Symbol.toStringTag, {
  value: "Module"
}));
class LO extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "scissor"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off && this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateX: 1
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: () => this.onTransitionDone(),
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix),
          t = new DA(12, 12);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(40, 50),
          position: e.add(new HA(5, 0, 5)),
          baseRadius: 7,
          scale: t,
          velDrag: .9,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: 1
        }), e.y += 7, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(300, 300),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release();
      }
    });
  }
  onTransitionDone() {
    this.webgl.savestate.setVariable("isCoffeeShopOpen", !0), this.updateSavestate(!0);
  }
  get mixins() {
    return ["reactivity", "actorDynamicProps", "actorPropsTransition"];
  }
}
LO.prepare = () => ({
  staticColliders: [{
    asset: "CoffeeShopOn"
  }],
  dynamicProps: {
    off: {
      asset: "CoffeeShopOff",
      default: !0,
      castFarShadow: 0
    },
    on: {
      asset: "CoffeeShopOn",
      castFarShadow: 0
    }
  }
});
const OO = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: LO
}, Symbol.toStringTag, {
  value: "Module"
}));
class RO extends yO {
  init() {
    const e = this.getHouseName(),
      t = this.getSavestate({
        forceTrueWhenFinished: "scissor",
        uid: e
      }),
      s = this.dynamicPropsState;
    s.off = !t, s.on = !!t, s.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: 0,
        bounceVertical: .04,
        rotateZ: 1.5
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onStart: () => {
        this.webgl.audio.playSound("sfx_quest_inauguration"), this.scene.player.playEmote("Victory"), this.webgl.store.frozenPlayerDelay = 800;
      }
    }), this.setupInteraction({
      item: "scissor",
      buttonMode: "tap",
      sound: "sfx_quest_scissors_interact",
      iconPosition: new HA(0, 1, 1),
      zone: {
        center: new HA(0, 0, 1.4),
        radius: 2.5
      },
      cameraTarget: new HA(1.6, 1, -6),
      cameraDistance: 5,
      cameraHeight: 3,
      onDone: () => {
        this.actor = this.scene.actors[this.houseActorName], this.actor && this.actor.startPropsTransition(), this.startPropsTransition();
      }
    }));
  }
  getHouseName() {
    if (this.houseActorName) return this.houseActorName;
    const e = this.scene.manifest.actors;
    let t = this.props.houseActor,
      s = e[t];
    if (!s) {
      const i = this.props.houseActor.split("."),
        n = i.shift(),
        a = 0 | i.pop();
      for (let r = 1; r < 10; r++) {
        if (t = n + "." + ("" + (a + r)).padStart(3, 0), s = e[t], s) break;
      }
    }
    return s && (this.houseActorName = t), this.houseActorName;
  }
}
RO.prepare = () => ({
  dynamicProps: {
    off: {
      asset: "BlueVineRibbonOff",
      collider: "BlueVineRibbonOff",
      default: 1,
      castFarShadow: 0
    },
    on: {
      asset: "BlueVineRibbonOn",
      castFarShadow: 0
    }
  }
});
const zO = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: RO
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  NO = function () {};
class FO {
  constructor({
    atlas: e,
    id: t,
    group: s,
    sequence: i,
    loop: n,
    autoplay: a,
    frame: r,
    onUpdate: o,
    onEnd: l,
    onEndOnce: c,
    frameDuration: h,
    category: u
  }) {
    this.frames = [], this.onUpdate = o || NO, this.onEndOnce = c || NO, this.onEnd = l || NO, this.id = void 0 !== t ? t : s + "/" + i, this.group = "", this.sequence = "", this.loop = !!n, this.autoplay = !!a, this.frame = r || 0, this.frameCount = 0, this.frameDuration = h || 48, this.frameTimer = 60 * Math.random(), this.currentFrameIndex = 0, this.paused = !1, this.ended = !1, this.category = u || "atlas", this.atlas = e, e && (this.setAtlas(e), this.change({
      id: this.id,
      frameDuration: this.frameDuration,
      autoplay: this.autoplay,
      loop: this.loop,
      frame: this.frame
    }));
  }
  setAtlas(e) {
    e && (this.sprites = e.sprites || e);
  }
  change({
    id: e = "circle",
    group: t,
    sequence: s,
    frame: i,
    frameDuration: n,
    autoplay: a,
    loop: r
  }) {
    if (this.sprites[e]) {
      if (void 0 !== e) {
        this.id = e;
        const t = this.id.split("/");
        this.sequence = t.pop(), this.group = t.join("/");
      } else void 0 !== s && (void 0 !== t && (this.group = t), this.sequence = s, this.id = this.group + "/" + this.sequence);
      this.frames = this.sprites[this.id], this.frameCount = this.frames.length, this.currentFrameIndex = Math.min(i || 0, this.frameCount - 1), this.frame = this.frames[this.currentFrameIndex], this.loop = !!r, this.autoplay = !!a, this.frameDuration = n || 48, this.paused = !this.autoplay, this.frameCount < 2 ? this.end() : this.ended = !1, this.onUpdate(this.frame);
    }
  }
  end() {
    this.ended = !0, this.onEndOnce(this.frame), this.onEndOnce = NO, this.onEnd(this.frame);
  }
  play() {
    this.paused = !1, this.isBackwards = !1, this.ended = !1;
  }
  playBackwards() {
    this.paused = !1, this.isBackwards = !0, this.ended = !1;
  }
  reset() {
    this.ended = !1, this.paused = !1, this.currentFrameIndex = 0;
  }
  resetFrame() {
    this.currentFrameIndex = 0, this.frame = this.frames[this.currentFrameIndex];
  }
  pause() {
    this.paused = !0;
  }
  nextFrame() {
    let e = this.currentFrameIndex + 1;
    if (e >= this.frameCount) {
      if (!this.loop) return void this.end();
      e = 0;
    }
    e !== this.currentFrameIndex && (this.currentFrameIndex = e, this.frame = this.frames[this.currentFrameIndex], !this.loop && e + 1 >= this.frameCount && this.end());
  }
  previousFrame() {
    let e = this.currentFrameIndex - 1;
    if (e < 0) {
      if (!this.loop) return void this.end();
      e = this.frameCount;
    }
    e !== this.currentFrameIndex && (this.currentFrameIndex = e, this.frame = this.frames[this.currentFrameIndex], !this.loop && e - 1 < 0 && this.end());
  }
  update(e) {
    this.ended || this.paused || (this.frameTimer <= 0 && (this.frameTimer = Math.max(0, this.frameDuration + this.frameTimer), this.isBackwards ? this.previousFrame() : this.nextFrame()), this.frameTimer -= e);
  }
  destroy() {
    this.sprites = this.frames = this.frame = this.onUpdate = null;
  }
}
const UO = new rC();
let HO;
class GO {
  constructor(e) {
    HO || (HO = yL()), this.isComponent = !0, e.batcher && (this.batcher = "string" == typeof e.batcher ? HO.particles.batchers[e.batcher] : e.batcher, e.atlas = this.batcher.atlas, e.batcher = null), this.dummy = UO, this.position = new HA(), this.scale = new DA(1, 1), this.quaternion = new UA(), this.color = new AC(16777215), e.rotation ? (this.useEuler = !0, this.rotation = new jM(), this.rotation.copy(e.rotation)) : e.useEuler && (this.useEuler = !0, this.rotation = new jM()), this.alpha = null != e.alpha ? e.alpha : 1, this.initialAlpha = this.alpha, this.visible = !0, this.parent = e.parent || null, this.textured = !!e.textured, this.billboard = !!e.billboard, this.angle = e.angle || 0, e.position && this.position.copy(e.position), null != e.color && ("number" == typeof e.color ? this.color.set(e.color) : this.color.copy(e.color)), e.scale && ("number" == typeof e.scale ? this.scale.setScalar(e.scale) : this.scale.copy(e.scale)), e.quaternion && this.quaternion.copy(e.quaternion), this.sprite = new FO({
      ...e,
      id: e.sprite || e.id
    }), this.batcher && this.batcher.addInstance(this), this.init(e), this.sprite.update(1);
  }
  init() {}
  update() {
    const e = HO.time.stableDt;
    this.sprite.update(e);
  }
  destroy() {
    this.batcher && this.batcher.removeInstance(this), this.parentComponent && this.parentComponent.removeComponent(this), this.sprite.destroy(), this.sprite = this.batcher = null, this.props = null;
  }
}
new HA();
const VO = new DA();
class WO extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "lightbulb"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.on ? this.setLights() : t.off && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: 1.1,
        delayAfter: 1400
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onStart: () => {
        this.isTransitionActive = !0, this.scene.player.playEmote("Victory"), this.webgl.store.frozenPlayerDelay = 800, this.webgl.audio.playSound("sfx_quest_lighthouse_build");
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix),
          t = new DA(8, 8);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(40, 50),
          position: e,
          baseRadius: 3,
          scale: t,
          velDrag: .85,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: 1
        }), e.y += 7, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(300, 300),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.setLights();
      },
      onDone: () => {
        this.isTransitionActive = !1, this.onInteractionDone();
      }
    }), this.setupInteraction({
      item: "lightbulb",
      buttonMode: "hold",
      sound: "sfx_quest_lighthouse_interact_loop",
      iconPosition: new HA(4.6, 3, 0),
      zone: {
        center: new HA(3.3, 0, 0),
        radius: 7.3
      },
      cameraTarget: new HA(0, 11, 0),
      cameraDistance: 19.5,
      cameraHeight: 12.5,
      posEase: .07,
      lookAtEase: .08
    }));
  }
  setLights() {
    if (this.haloSprite) return;
    const e = new HA(0, 21.3, 0).applyMatrix4(this.props.transformMatrix);
    this.defaultY = e.y;
    const t = {
      batcher: "emissive",
      sprite: "lighthouse_halo",
      scale: 20,
      angle: Math.PI,
      position: e,
      useEuler: !0,
      billboard: !1,
      color: 5587968,
      sortable: !0
    };
    this.haloSprite = new GO({
      ...t
    }), this.haloSprite2 = new GO({
      ...t,
      scale: VO.set(t.scale, -t.scale)
    }), this.haloSprite.rotation = new jM(0, Math.PI / 3, 0), this.haloSprite2.position = this.haloSprite.position, this.haloSprite2.rotation = this.haloSprite.rotation, this.haloSphere = new CM(e, 15);
  }
  update() {
    if (!this.haloSprite) return;
    const e = this.scene.frustum,
      t = this.webgl.time.dt;
    this.isTransitionActive && (this.haloSprite2.position.y = this.defaultY * this.springY.value, this.haloSprite.scale.y = 20 * this.springY.value, this.haloSprite2.scale.y = -this.haloSprite.scale.y), this.haloSprite.rotation.y += .001 * t;
    const s = e.intersectsSphere(this.haloSphere);
    this.haloSprite.visible = this.haloSprite2.visible = s;
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("enlightedLighthouseCount"), this.updateSavestate(!0);
  }
  beforeDestroy() {
    this.haloSprite && this.haloSprite.destroy(), this.haloSprite2 && this.haloSprite2.destroy();
  }
}
WO.prepare = () => ({
  preloadAssets: [],
  staticColliders: [{
    asset: "BuildingFOff"
  }],
  dynamicProps: {
    off: {
      asset: "BuildingFOff",
      default: 1,
      castFarShadow: 1
    },
    on: {
      asset: "BuildingF",
      castFarShadow: 0
    }
  }
});
const jO = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: WO
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  qO = {
    default: "ShopCroissant",
    clothes: "ShopClothes",
    croissant: "ShopCroissant",
    glasses: "ShopGlasses"
  };
let ZO = class extends yO {
  init() {
    let e = this.getSavestate({
      forceTrueWhenFinished: "compass"
    });
    if (!e) {
      this.webgl.savestate.game.saveVersion > 3 && (this.updateSavestate(!0), e = !0);
    }
    const t = this.dynamicPropsState;
    t.offBase = t.offDetail = !e, t.on = !!e, t.offBase && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateZ: 2
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        offBase: !1,
        offDetail: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
        const t = new DA(12, 12);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(40, 50),
          position: e.add(new HA(0, -1.3, -1)),
          baseRadius: 2.2,
          scale: t,
          velDrag: .88,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: 1
        }), e.y += 2, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(300, 300),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_shop_open");
      }
    }), this.setupInteraction({
      item: "compass",
      buttonMode: "hold",
      sound: "sfx_quest_compas_interact_loop",
      iconPosition: new HA(4, 1.6, -2.96),
      zones: [{
        center: new HA(4.1, 0, -1.6),
        radius: 4
      }, {
        center: new HA(4.3, 0, 0),
        radius: 4
      }],
      cameraTarget: new HA(0, 1.5, 0),
      cameraDistance: 5,
      cameraHeight: 3
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("soldShopCount"), this.updateSavestate(!0);
  }
};
ZO.prepare = ({
  actor: e,
  savedata: t
}) => {
  const s = (e.params.ShopType || "").toLowerCase(),
    i = qO[s] || qO.default,
    n = _L.app.$device.type.mobile;
  return {
    staticColliders: [{
      asset: "ShopForSaleBase"
    }],
    dynamicProps: {
      offBase: {
        asset: "ShopForSaleBase",
        default: 1,
        castFarShadow: !t
      },
      offDetail: {
        asset: "ShopForSaleDetails",
        default: 1,
        castFarShadow: !t && !n
      },
      on: {
        asset: i,
        castFarShadow: !!t
      }
    }
  };
};
const $O = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: ZO
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  XO = {
    default: "ShopCroissant",
    clothes: "ShopClothes",
    croissant: "ShopCroissant",
    glasses: "ShopGlasses"
  };
class YO extends yO {
  init() {
    let e = this.getSavestate({
      forceTrueWhenFinished: "compass"
    });
    const t = this.dynamicPropsState;
    t.offBase = t.offDetail = !e, t.on = !!e, t.offBase && (this.setupPropsTransition({
      preset: "Bounce",
      presetOpts: {
        bounceHorizontal: .8,
        rotateZ: 2
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        offBase: !1,
        offDetail: !1,
        on: !0
      },
      onDone: () => {
        this.onInteractionDone();
      },
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
        const t = new DA(12, 12);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(40, 50),
          position: e.add(new HA(0, -1.3, -1)),
          baseRadius: 2.2,
          scale: t,
          velDrag: .88,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: 1
        }), e.y += 2, this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(300, 300),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_shop_open");
      }
    }), this.setupInteraction({
      item: "compass",
      buttonMode: "hold",
      sound: "sfx_quest_compas_interact_loop",
      iconPosition: new HA(4, 1.6, -2.96),
      zones: [{
        center: new HA(4.1, 0, -1.6),
        radius: 4
      }, {
        center: new HA(4.3, 0, 0),
        radius: 4
      }],
      cameraTarget: new HA(0, 1.5, 0),
      cameraDistance: 5,
      cameraHeight: 3
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("soldShopCount"), this.updateSavestate(!0);
  }
}
YO.prepare = ({
  actor: e,
  savedata: t
}) => {
  const s = (e.params.ShopType || "").toLowerCase(),
    i = XO[s] || XO.default,
    n = _L.app.$device.type.mobile;
  return {
    staticColliders: [{
      asset: "ShopForSaleBase"
    }],
    dynamicProps: {
      offBase: {
        asset: "ShopForSaleBase",
        default: 1,
        castFarShadow: !t
      },
      offDetail: {
        asset: "ShopForSaleDetails",
        default: 1,
        castFarShadow: !t && !n
      },
      on: {
        asset: i,
        castFarShadow: !!t
      }
    }
  };
};
const JO = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: YO
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  QO = new HA(),
  KO = new HA();
const eR = {
  NONE: 0,
  FREE: 1,
  STICKY: 2,
  FOLLOW_CURVE: 3
};
function tR(e, t, s) {
  e.add(new AI(new HA().fromArray(t, 0), new HA().fromArray(t, 6), new HA().fromArray(s, 3), new HA().fromArray(s, 0)));
}
function sR(e, {
  closed: t = !1
} = {}) {
  const s = new II();
  for (let i = 0, n = e.length - 1; i < n; i++) {
    tR(s, e[i], e[i + 1]);
  }
  if (t) {
    tR(s, e[e.length - 1], e[0]);
  }
  return s;
}
const iR = (e, t) => e + (t - e) * Math.random(),
  nR = (e, t) => (e % t + t) % t,
  aR = 16,
  rR = 256,
  oR = new rC(),
  lR = new DA(),
  cR = new DA(),
  hR = new HA(),
  uR = new HA(),
  dR = new HA(),
  pR = new rL();
class mR {
  constructor() {
    this.serializedData = [], this.colliders = new Array(), this.collidersByID = {};
  }
  get data() {
    for (this.serializedData.length > this.colliders.length && (this.serializedData.length = this.colliders.length); this.serializedData.length < this.colliders.length;) this.serializedData.push({
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      isCollidingWithPlayer: !1,
      isOnFloor: !1
    });
    for (let e = 0; e < this.colliders.length; e++) {
      const t = this.colliders[e],
        s = this.serializedData[e];
      s.position.x = t.center.x, s.position.y = t.center.y, s.position.z = t.center.z, s.isCollidingWithPlayer = t.isCollidingWithPlayer, s.isOnFloor = t.isOnFloor;
    }
    return this.serializedData;
  }
  add({
    id: e,
    position: t,
    radius: s,
    mode: i,
    moveToFloor: n = !1,
    move: a = null
  }, r) {
    const o = new HA().fromArray(t),
      l = new CM(o, s),
      c = i & aR,
      h = i & rR;
    if (Object.assign(l, {
      reactToPhysics: c,
      reactToPlayer: h,
      velocity: new HA(),
      rotation: new jM(),
      isOnFloor: !1,
      isCollidingWithPlayer: !1
    }), l.update = c || h ? c && !h ? this.updatePhysicsOnly.bind(this) : !c && h ? this.updatePlayerOnly.bind(this) : this.updateAll.bind(this) : this.updateStatic.bind(this), n && (l.moveToFloor = !0, this.moveSphereToFloor(r, l)), a) {
      const e = l.moveState = {
        vel: 0,
        maxVel: a.velocity || 2.3,
        prevPos: l.center.clone(),
        fov: new HA(),
        fovOffset: 1,
        fovSqRadius: 7,
        pauseMin: a.pauseMin || 0,
        pauseMax: a.pauseMax || 0,
        pauseDelay: 0,
        elapsedSinceCast: 0
      };
      switch (e.acceleration = a.velocity > 4 ? 8 : 2.5, a.type) {
        case "curveLoop":
          e.isCurveLoop = !0, e.isFollowingCurve = !0, e.curve = sR(a.curve.points, {
            closed: !0
          }), e.distance = 0, e.length = e.curve.getLength(), l.center.x = a.curve.points[0][0], l.center.z = a.curve.points[0][2];
          break;
        case "curvePingPong":
          e.isCurvePingPong = !0, e.isFollowingCurve = !0, e.curve = sR(a.curve.points, {
            closed: !1
          }), e.distance = 0, e.isReverse = !1, e.length = e.curve.getLength(), l.center.x = a.curve.points[0][0], l.center.z = a.curve.points[0][2];
          break;
        case "points":
          e.isPoints = !0, e.points = a.curve.points.map(e => new DA(e[0], e[2])), e.prevTarget = 0, e.canSkipPoint = !a.noSkips, e.target = 1, l.center.x = e.points[0].x, l.center.z = e.points[0].y;
          break;
        case "area":
          e.isArea = !0, e.center = new DA(l.center.x, l.center.z), e.radius = a.radius, e.target = new DA(), e.moving = !1;
      }
    }
    this.colliders.push(l), e && (this.collidersByID[e] = l);
  }
  stop(e, t) {
    const s = this.collidersByID[e];
    s && s.moveState && (s.moveState.isStopped = !!t);
  }
  cull(e, t) {
    const s = this.collidersByID[e];
    s && (s.isCulled = !!t);
  }
  updateSphereGroundCasting(e, t, s) {
    const i = e.moveState.isArea || e.moveState.isPoints;
    e.isCulled ? e.moveState.elapsedSinceCast > .25 ? this.moveSphereToFloor(t, e) : i || (e.moveState.elapsedSinceCast += s) : this.moveSphereToFloor(t, e);
  }
  moveSphere(e, t, s, i) {
    const n = e.moveState;
    if (n.isStopped) return n.pauseDelay = Math.max(n.pauseDelay, 1.8), n.vel = 0, void this.updateSphereGroundCasting(e, t, i);
    e.center.distanceToSquared(n.prevPos) > 5e-6 && (n.prevPos.y = e.center.y, oR.position.copy(n.prevPos), oR.lookAt(e.center), oR.localToWorld(n.fov.set(0, 0, n.fovOffset)));
    const a = s.position.distanceToSquared(n.fov);
    if (n.prevPos.copy(e.center), a < n.fovSqRadius) return n.pauseDelay = Math.max(n.pauseDelay, 2), n.vel = 0, void this.updateSphereGroundCasting(e, t, i);
    if (n.pauseDelay > 0) return n.pauseDelay -= i, n.vel = 0, void this.updateSphereGroundCasting(e, t, i);
    if (n.vel < n.maxVel && (n.vel = Math.min(n.maxVel, n.vel + i * n.acceleration)), n.isFollowingCurve) {
      if (n.isCurveLoop) n.distance = (n.distance + n.vel * i) % n.length;else if (n.isCurvePingPong) {
        const e = n.isReverse,
          t = e ? -n.vel : n.vel;
        n.distance = n.distance + t * i, e && n.distance <= 0 ? (n.isReverse = !1, n.distance = 0, n.pauseDelay = iR(n.pauseMin, n.pauseMax)) : !e && n.distance > n.length && (n.isReverse = !0, n.distance = n.length, n.pauseDelay = iR(n.pauseMin, n.pauseMax));
      }
      const t = n.distance / n.length,
        s = n.curve.getPointAt(t, hR);
      e.center.x = s.x, e.center.z = s.z;
    } else if (n.isPoints) {
      const t = n.points[n.target],
        s = lR.set(e.center.x, e.center.z),
        a = cR.subVectors(t, s),
        r = a.length();
      let o = n.vel * i;
      if (r <= o) {
        o = r;
        const e = n.points.length,
          t = Math.random();
        let s = 1;
        n.canSkipPoint && t < .08 ? s = -2 : n.canSkipPoint && t > .92 ? s = 2 : t < .3 && (s = -1);
        let i = nR(n.target + s, e);
        i === n.prevTarget && (s = n.target - n.prevTarget, i = nR(n.target + s, e)), n.prevTarget = n.target, n.target = i, n.pauseDelay = iR(n.pauseMin, n.pauseMax);
      }
      const l = a.normalize().multiplyScalar(o);
      e.center.x += l.x, e.center.z += l.y;
    } else if (n.isArea) if (n.moving) {
      const t = lR.set(e.center.x, e.center.z),
        s = cR.subVectors(n.target, t),
        a = s.length();
      let r = n.vel * i;
      a <= r && (n.moving = !1, n.pauseDelay = iR(n.pauseMin, n.pauseMax));
      const o = s.normalize().multiplyScalar(r);
      e.center.x += o.x, e.center.z += o.y;
    } else !function (e, t, s) {
      const i = iR(0, 2 * Math.PI),
        n = iR(0, s);
      e.x = t.x + Math.cos(i) * n, e.y = t.y + Math.sin(i) * n;
    }(n.target, n.center, n.radius), n.moving = n.target.distanceToSquared(n.center) > .1;
    this.updateSphereGroundCasting(e, t, i);
  }
  moveSphereToFloor(e, t) {
    t.moveState && (t.moveState.elapsedSinceCast = 0);
    const s = dR.copy(t.center);
    s.y += .5, pR.set(s, hR.set(0, -1.2, 0));
    const i = e.rayIntersect(pR.ray);
    i && (t.center.copy(i.position), t.center.y += t.radius);
  }
  updateSphereCollisionsToWorld(e, t, s, i) {
    e.velocity.y -= s * i, e.center.addScaledVector(e.velocity, i);
    const {
      hits: n,
      isOnFloor: a
    } = t.sphereIntersect(e, hR.set(0, 1, 0));
    e.isOnFloor = a;
    for (let o = 0; o < n.length; o++) {
      const t = n[o];
      if (!t.hit) break;
      a || e.velocity.addScaledVector(t.normal, 1.5 * -t.normal.dot(e.velocity)), e.translate(t.normal.multiplyScalar(t.depth));
    }
    const r = Math.exp(-1.5 * i) - 1;
    e.velocity.addScaledVector(e.velocity, r);
  }
  updateSphereCollisionsToPlayer(e, t) {
    const s = e.radius + t.radius,
      i = e.center.distanceTo(t.position);
    if (i < s) {
      hR.subVectors(e.center, t.position).normalize();
      const n = i - s;
      t.position.addScaledVector(hR, n);
    }
  }
  updateSpheresCollisionsToSpheres(e) {
    for (const t of this.colliders) if (t.reactToPhysics) {
      const s = e.center.distanceToSquared(t.center),
        i = e.radius + t.radius;
      if (s < i * i) {
        hR.subVectors(e.center, t.center).normalize(), uR.copy(hR).multiplyScalar(hR.dot(e.velocity)), dR.copy(hR).multiplyScalar(hR.dot(t.velocity)), e.velocity.add(dR).sub(uR), t.velocity.add(uR).sub(dR);
        const n = (i - Math.sqrt(s)) / 2;
        e.center.addScaledVector(hR, n), t.center.addScaledVector(hR, -n);
      }
    }
  }
  updateStatic(e, t, s, i, n) {
    e.moveState && this.moveSphere(e, t, s, n);
  }
  updatePhysicsOnly(e, t, s, i, n) {
    this.updateSphereCollisionsToWorld(e, t, i, n), this.updateSpheresCollisionsToSpheres(e);
  }
  updatePlayerOnly(e, t, s, i, n) {
    e.moveState && this.moveSphere(e, t, s, n), e.isCulled || this.updateSphereCollisionsToPlayer(e, s);
  }
  updateAll(e, t, s, i, n) {
    this.updateSphereCollisionsToWorld(e, t, i, n), this.updateSphereCollisionsToPlayer(e, s), this.updateSpheresCollisionsToSpheres(e);
  }
  update(e, t, s, i) {
    for (const n of this.colliders) n.update(n, e, t, s, i);
  }
}
const fR = {
    timer: 0,
    angle: 0,
    target: 0,
    disabled: !0,
    delay: 1300
  },
  gR = {
    curveLoop: {
      min: 2,
      max: 3
    },
    curvePingPong: {
      min: 2,
      max: 3
    },
    points: {
      min: 1,
      max: 3
    },
    area: {
      min: 1,
      max: 3
    }
  },
  vR = new HA(),
  bR = e => ("string" == typeof e && (e = e.trim().replace(",", ".")), e = parseFloat(e), isNaN(e) ? 0 : e);
class yR extends yO {
  constructor(e) {
    super(e), this.keepUpright = !0, this.isNPC = !0, this.inInteraction = !1, this.inFOV = !1, this.canLookPlayer = !0, this.npcID = this.props.subtype, this.script = this.props.npcConfig.script, this.args = this.props.npcConfig.scriptArgs || {}, this.hasPhysic = !0, this.closableDialog = !0, this.lastInteractionPosition = new HA();
  }
  beforeInit() {
    this.moveInstructions = this.parseMove(this.props.move), this.isMoving = !!this.moveInstructions, this.canRun = this.moveInstructions && this.moveInstructions.isRunning, this.canMove = !!this.isMoving;
  }
  parseMove(e) {
    if (!e || !e.length) return;
    const t = e.split(","),
      s = {};
    for (let n = 0, a = t.length; n < a; n++) {
      const e = t[n];
      if (0 === e.length) continue;
      const [i, a] = e.split("=");
      if (i) switch (i.trim().toUpperCase()) {
        case "CURVE":
          const e = a.trim();
          let t = this.scene.getCurve(e);
          t && (s.curve = t = t.raw, "POLY" === t.type ? s.type = "points" : s.type = t.closed ? "curveLoop" : "curvePingPong");
          break;
        case "RADIUS":
          s.type = "area", s.radius = bR(a.trim());
          break;
        case "PAUSEMIN":
          s.pauseMin = bR(a.trim());
          break;
        case "PAUSEMAX":
          s.pauseMax = bR(a.trim());
          break;
        case "VELOCITY":
        case "SPEED":
          s.velocity = bR(a.trim());
          break;
        case "RUN":
        case "RUNNING":
          s.isRunning = !0;
          break;
        case "NOSKIPS":
        case "NOSKIP":
          s.noSkips = !0;
      }
    }
    if (!s.type) return;
    const i = gR[s.type];
    return null == s.pauseMax && (s.pauseMax = s.pauseMin || i.max), null == s.pauseMin && (s.pauseMin = Math.max(0, s.pauseMax - (i.max - i.min))), null == s.velocity && (s.velocity = s.isRunning ? 6 : 2.3), s;
  }
  afterInit() {
    if (this.prevPosition = this.base.position.clone(), this.basePosition = this.base.position.clone(), this.baseQuaternion = this.base.quaternion.clone(), this.isBodyReady = !1, this.firstUpdates = 10, this.hasPhysic) {
      const e = this.scene.physics;
      if (this.body = new CM(this.base.position.clone(), 1.25), this.body.isCulled = null, this.body.cull = e => {
        this.body.isCulled !== e && (this.body.isCulled = !!e, this.scene.physics.cullSphere(this.uid, !!e));
      }, this.moveInstructions) {
        this.body.isStopped = null, this.body.stop = e => {
          this.body.isStopped !== e && (this.body.isStopped = !!e, this.scene.physics.stopSphere(this.uid, !!e));
        };
        const e = this.moveInstructions.type;
        "curveLoop" !== e && "curvePingPong" !== e && "points" !== e || (this.body.center.x = this.moveInstructions.curve.points[0][0], this.body.center.z = this.moveInstructions.curve.points[0][2]);
      }
      Promise.all([e.readyPromise, e.addSphere({
        id: this.uid,
        sphere: this.body,
        mode: rR,
        moveToFloor: !0,
        move: this.moveInstructions
      })]).then(() => new Promise(e => requestAnimationFrame(e))).then(() => {
        this.destroyed || (this.isBodyReady = !0, this.firstUpdates = 50);
      });
    } else this.isBodyReady = !0;
    this.playerLookAt = {
      ...fR
    }, this.outfit = {}, this.base.manualMatrixUpdate = !0, this.updateChatInteraction = this.bind("updateChatInteraction"), this.updateChatInteraction(), this.args.animation && this.forceIdle(this.args.animation);
  }
  beforeUpdate() {
    if (this.hasPhysic) {
      const e = this.shouldUpdateSkeleton();
      this.body.cull(!e), this.base.position.copy(this.body.center), this.base.position.y += .0135 + this.shoesOffset - this.body.radius, this.isMoving && (this.speed > .006 && e && (vR.copy(this.base.position), this.base.position.copy(this.lastPos), this.base.position.y = vR.y, this.base.lookAt(vR), this.base.position.copy(vR), this.needsInstantLookAt ? this.baseQuaternion.copy(this.base.quaternion) : this.baseQuaternion.slerp(this.base.quaternion, this.canRun ? .13 : .07)), this.needsInstantLookAt = !e);
    } else this.base.position.copy(this.basePosition);
    this.base.quaternion.copy(this.baseQuaternion), this.interactionZone && !this.lastInteractionPosition.equals(this.base.position) && (this.lastInteractionPosition.copy(this.base.position), this.interactionZone.updatePosition(this.base.position), this.needsInteractionZoneUpdate = !1), this.isMoving && this.scene.player && this.scene.player.canMove && this.body.stop(this.inInteraction || !this.canMove);
  }
  shouldUpdateSkeleton() {
    return this.charMesh.visible;
  }
  updatePlayerLookAt() {
    const e = this.webgl.time.dt,
      t = this.playerLookAt;
    if (this.scene.player && this.scene.player.canMove && t.timer < t.delay && (t.timer += e), this.inInteraction) {
      const e = this.scene.player.base.position,
        s = function (e, t) {
          const s = QO.copy(t).sub(e.position).normalize(),
            i = KO.set(0, 0, 1).applyQuaternion(e.quaternion);
          return Math.atan2(i.z, i.x) - Math.atan2(s.z, s.x);
        }(this.base, e);
      this.inFOV = this.isMoving ? this.speed < .005 : Math.abs(s) < 1.65, (this.inFOV || this.isTalking) && (t.target = s, t.timer = 0);
    }
    if (0 === t.angle && t.timer > 0) return;
    const s = t.timer >= t.delay,
      i = s ? 0 : t.target;
    t.angle = _y(t.angle, i, s ? .04 : .1), Math.abs(t.angle - i) < .01 && (t.angle = i), this.base.rotateY(t.angle);
  }
  afterUpdate() {
    this.isBodyReady && this.firstUpdates > 0 && this.firstUpdates--, this.inInteraction = this.interactionZone && this.interactionZone.enabled, this.canLookPlayer && this.updatePlayerLookAt(), this.isTalking && this.scene.player.rotateAt(this.base.position);
  }
  hasTalkedWith() {
    return !!this.getSavestate();
  }
  getCurrentDialog() {}
  onDialogExit() {
    this.getSavestate() || (this.updateSavestate(!0), this.webgl.savestate.incrementVariable("npcEncounteredCount"));
  }
  updateChatInteraction() {
    if (this.destroyed) return;
    const e = this.getCurrentDialog();
    if (!e) return;
    this.interactionZone && (this.interactionZone.destroy(), this.interactionZone = null);
    const t = {
      onExit: () => {
        this.setIdleAnimation(), setTimeout(this.updateChatInteraction, 800);
      }
    };
    this.args && this.args.partner && (t.partner = this.args.partner), this.closableDialog && (t.closable = !0);
    let s = "bubble_talk",
      i = "bubble_collapsed";
    this.hasTalkedWith() && (i = "bubble_collapsed_talked", s = "bubble_talked");
    const n = new OM();
    n.compose(this.base.position, this.base.quaternion, vR.setFromMatrixScale(this.props.transformMatrix)), this.lastInteractionPosition.copy(this.base.position), this.setupInteraction({
      buttonIcon: "interactions-chat",
      buttonMode: "click",
      audioEnabled: "sfx_UI_notif_NPCcall",
      icon: this.dialogIcon || s,
      iconCollapsed: this.dialogIconCollapsed || i,
      iconPosition: new HA(0, 2.7, 0),
      zone: {
        center: new HA(0, 0, 0),
        radius: 4.5
      },
      matrix: n,
      onDone: () => {
        this.webgl.audio.playSound("sfx_UI_dialog_opendialog"), this.startDialog(e, t);
      }
    });
  }
  get mixins() {
    return [...super.mixins, "character", "characterAnimations", "dialog"];
  }
}
yR.isNPC = !0;
const _R = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class extends yR {
      init() {
        this.firstTimeDone = this.hasTalkedWith(), this.firstTimeID = this.npcID + "_FirstTime", this.comeBackID = this.npcID + "_ComeBack", this.partnerID = this.args.partner, this.metVar = this.partnerID && "hasMet" + k(this.partnerID) + "Ambassador", super.init();
      }
      getCurrentDialog() {
        const e = this.webgl.app.$partners.list[this.partnerID];
        return e && e.isInterest ? this.dialogIconCollapsed = "bubble_collapsed_star" : this.dialogIconCollapsed = void 0, this.firstTimeDone ? this.comeBackID : this.firstTimeID;
      }
      analyticsEvent() {
        this.webgl.app.$analytics.pageview({
          title: `glorb - Talk with ${this.partnerID}'s Ambassador`,
          path: "/quest-ambassador-" + this.partnerID
        });
      }
      onDialogStart() {
        this.analyticsEvent();
      }
      onDialogExit() {
        super.onDialogExit(), this.firstTimeDone = !0;
        const e = this.webgl.savestate.game.vars;
        this.metVar && !e[this.metVar] && (e[this.metVar] = !0);
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  xR = new HA();
const wR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: class extends yR {
    beforeInit() {
      this.hasPhysic = !1, this.keepUpright = !1;
    }
    init() {
      super.init(), this.scene.npcIntro = this, this.lastPlayEmote = 0, this.lookQt = new UA(), this.watchSignal(this.webgl.store.intro.ctaHover, this.onCtaHover), this.watchSignal(this.webgl.store.intro.descentDone, this.onDescentDone);
    }
    onDescentDone(e) {
      e && this.throttlePlayEmote("Hello");
    }
    throttlePlayEmote(e = "Gain") {
      const t = this.webgl.time.elapsed;
      t - this.lastPlayEmote < 1500 || (this.lastPlayEmote = t, this.playEmote(e));
    }
    onCtaHover() {
      this.throttlePlayEmote("Gain");
    }
    beforeUpdate() {
      const e = this.scene.boat;
      e && (e.npcPt.getWorldPosition(this.basePosition), e.npcPt.getWorldQuaternion(this.baseQuaternion), super.beforeUpdate());
    }
    update() {
      this.scene.getCurrentCamera().cam.getWorldPosition(xR), xR.y = this.base.position.y, this.base.lookAt(xR);
    }
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
class SR extends yR {
  init() {
    const e = (this.npcID.split("_").shift() || "").toLowerCase();
    if (!this.questPrefix) {
      const t = this.webgl.app.$partners.list[e];
      if (t && t.quest) {
        const e = t.quest,
          s = e.id.replace(/(Main|Side)$/i, ""),
          i = e.item;
        this.questPrefix = s, this.item = i;
      }
    }
    this.questPrefix = this.questPrefix || "__", this.partnerID = this.questPrefix.toLowerCase(), this.beforeID = this.beforeID || this.npcID + "_Before", this.startedID = this.startedID || this.npcID + "_Started", this.completedID = this.completedID || this.npcID + "_Completed", this.sideCompletedID = this.sideQuestCompletedID || this.npcID + "_SideCompleted", super.init(), this.mainQuestCompleted = !1, this.sideQuestCompleted = !1;
    const t = this.webgl.app.$quests[this.questPrefix + "Main"],
      s = this.webgl.app.$quests[this.questPrefix + "Side"];
    this.hasSideQuest = !!s, t && (t.completed ? this.onMainQuestCompleted(!0) : this.unwatchMainQuest = hs(() => t.completed, e => this.onMainQuestCompleted(e))), s && (s.completed ? this.onSideQuestCompleted(!0) : this.unwatchSideQuest = hs(() => s.completed, e => this.onSideQuestCompleted(e))), this.enrollDialogMethod("GIVE_QUEST_ITEM", this.giveQuestItem.bind(this));
  }
  onMainQuestCompleted(e) {
    e && (this.mainQuestCompleted = !0, this.unwatchMainQuest && this.unwatchMainQuest(), this.unwatchMainQuest = null, this.updateChatInteraction());
  }
  onSideQuestCompleted(e) {
    e && (this.sideQuestCompleted = !0, this.unwatchSideQuest && this.unwatchSideQuest(), this.unwatchSideQuest = null, this.updateChatInteraction());
  }
  giveQuestItem() {
    if (this.item) return new Promise(e => {
      this.webgl.app.$store.itemNotification = {
        variable: this.item.variable,
        image: this.item.image,
        onDone: e
      };
    });
  }
  getCurrentDialog() {
    let e = this.beforeID,
      t = "bubble_quest",
      s = "bubble_collapsed_exclam";
    return this.item && this.webgl.savestate.getVariable(this.item.variable) && (e = this.startedID, t = s = null), this.mainQuestCompleted && (e = this.completedID, t = s = null), this.sideQuestCompleted && (e = this.sideCompletedID, t = s = null), this.dialogIcon = t, this.dialogIconCollapsed = s, e;
  }
  analyticsEvent() {
    this.webgl.app.$analytics.pageview({
      title: `glorb - Talk with ${this.partnerID}'s Quest Giver`,
      path: "/quest-giver-" + this.partnerID
    });
  }
  onDialogStart() {
    this.analyticsEvent();
  }
  beforeDestroy() {
    this.unwatchMainQuest && this.unwatchMainQuest(), this.unwatchSideQuest && this.unwatchSideQuest(), this.unwatchMainQuest = this.unwatchSideQuest = null, super.beforeDestroy && super.beforeDestroy();
  }
}
const AR = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: SR
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  MR = {
    one: "One",
    prosper: "Prosper",
    island: "glorb",
    trail: "Trail",
    x1: "X1"
  };
const CR = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class extends SR {
      init() {
        const e = (this.npcID.split("_").shift() || "").toLowerCase();
        this.questPrefix = MR[e] || k(e), this.firstTimeDone = !1, this.firstTimeID = this.npcID + "_FirstTime", this.comeBackID = this.npcID + "_ComeBack", this.beforeSideID = this.npcID + "_BeforeSide", this.sideCompletedID = this.npcID + "_SideCompleted", super.init();
      }
      getCurrentDialog() {
        if (this.travelling) return;
        let e = this.firstTimeID,
          t = "bubble_quest",
          s = "bubble_collapsed_exclam";
        return this.firstTimeDone && (t = "bubble_quest", s = "bubble_collapsed_exclam", e = this.comeBackID), this.mainQuestCompleted && (this.hasQuest = this.hasSideQuest, t = this.hasQuest ? "bubble_quest" : null, s = this.hasQuest ? "bubble_collapsed_alt" : null, this.useQuestMark = !1, e = this.beforeSideID), this.sideQuestCompleted && (t = null, s = null, e = this.sideCompletedID), this.dialogIcon = t, this.dialogIconCollapsed = s, e;
      }
      onDialogStart() {
        this.analyticsEvent();
      }
      onDialogDone(e, t) {
        const s = "yes" === t.AskPlay || "Yes" === t.AskPlay;
        if (this.firstTimeDone = !0, !s) return;
        const i = this.args.scene;
        i && (this.travelling = !0, this.webgl.scenes.teleportTo(i, {
          delay: 800
        }));
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  PR = {
    Swimming: {
      hasPhysic: !1,
      keepUpright: !1,
      floating: !0,
      timeScale: .5
    },
    Seating: {
      hasPhysic: !1,
      keepUpright: !1
    },
    Towel: {
      hasPhysic: !1,
      keepUpright: !1
    }
  };
const TR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: class extends yR {
    beforeInit() {
      super.beforeInit();
      const e = this.passiveAnim = this.args.animation,
        t = this.animPreset = PR[e] || {};
      null != t.hasPhysic && (this.hasPhysic = t.hasPhysic), null != t.keepUpright && (this.keepUpright = t.keepUpright);
    }
    init() {
      super.init(), this.animPreset.floating && (this.base.position.y = -1.35), this.time = 0;
    }
    afterInit() {
      super.afterInit();
      const e = this.passiveAnim,
        t = this.animPreset;
      if (!this.allAnims[e]) return;
      const s = {
        time: Math.random()
      };
      t.timeScale && (s.timeScale = t.timeScale), this.setAnimation(this.passiveAnim, s);
    }
    updateFloating() {
      const e = this.time += .001 * this.webgl.time.dt,
        t = this.scene.water;
      this.base.position.y += t.base.position.y, this.base.translateZ(.2 * Math.cos(.5 * e)), this.base.rotation.y += .4 * Math.sin(.7 * e);
      this.base.translateY(1.2), this.base.rotateX(.15 * Math.sin(1.4 * e) - .1), this.base.rotateZ(.02 * Math.cos(3 * e + .2)), this.base.translateY(-1.2);
    }
    update() {
      this.animPreset.floating && this.updateFloating();
    }
    getCurrentDialog() {}
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
const ER = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: class extends yR {
    init() {
      this.dialogIcon = "bubble_boat", this.dialogIconCollapsed = "bubble_collapsed_boat", this.firstTimeDone = this.hasTalkedWith(), this.firstTimeID = this.npcID + "_FirstTime", this.comeBackID = this.npcID + "_ComeBack", super.init();
    }
    getCurrentDialog() {
      if (!this.travelling) return this.firstTimeDone ? this.comeBackID : this.firstTimeID;
    }
    async onDialogDone(e, t) {
      if (e.id === this.firstTimeID && (this.firstTimeDone = !0), "yes" !== t.Travel) return;
      this.travelling = !0;
      const s = this.args.scene || "IslandWest",
        i = this.args.point || "Spawn";
      this.webgl.scenes.teleportTo(s, {
        point: i,
        delay: 800
      });
    }
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
const BR = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class extends yR {
      getCurrentDialog() {
        if (this.webgl.app.$dialogs.list[this.npcID]) return this.npcID;
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  IR = new DA();
const kR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: class extends yR {
    init() {
      this.enrollDialogMethod("HEAL", this.healAnimation.bind(this)), this.healed = this.getSavestate({
        forceTrueWhenFinished: "stethoscope"
      }), this.canMove = this.isMoving && this.healed, this.healed ? this.setHealedIdle() : (this.setupInteraction({
        item: "stethoscope",
        buttonMode: "hold",
        sound: "sfx_quest_healing_interact_loop",
        iconPosition: new HA(0, 2.5, 0),
        zone: {
          center: new HA(0, 0, 0),
          radius: 4
        },
        cameraTarget: new HA(0, 1, 0),
        cameraDistance: 2,
        cameraHeight: 2,
        playerActionPreset: "None",
        onDone: this.heal.bind(this)
      }), this.setAnimation("Sick", {
        loop: !0,
        time: Math.random()
      }));
    }
    async heal() {
      this.webgl.audio.playSound("sfx_quest_healing_done", {
        delay: 50
      }), this.startDialog("Salve_Healed", {
        onDone: this.onHealed.bind(this)
      });
    }
    async healAnimation() {
      if (await this.wait(90), this.fakeHealed = !0, this.setAnimation("Healed", {
        loop: jS
      }), await this.wait(300), this.healed) return;
      const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix),
        t = new DA(5, 5);
      this.webgl.particles.emit("flash", {
        amount: By.randomInt(1, 1),
        position: e,
        scale: t.set(30, 30),
        duration: 1200,
        billboard: !0,
        batcherID: "noDepthEmissive",
        sprite: "halo",
        speed: 0
      }), e.release();
    }
    setHealedIdle() {}
    getCurrentDialog() {
      if (this.healed || this.getSavestate()) return "Salve_Healed";
    }
    async onHealed() {
      this.webgl.savestate.incrementVariable("healedCitizenCount"), this.healed = !0, this.canMove = this.isMoving && this.healed, await lo(800), this.destroyed || this.updateChatInteraction();
    }
    update() {
      const e = this.interactionZone;
      if (e && e.isHidden && !this.fakeHealed && this.webgl.time.frameNum % 23 == 0) {
        const e = HA.get().copy(this.base.position);
        e.y += 2.2, this.webgl.particles.emit("healing", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: IR.set(2, 2),
          duration: 800,
          billboard: !0,
          opacity: .3,
          batcherID: "normal",
          speed: this.easedSpeed,
          sprite: "smoke2",
          power: 7
        }), e.release();
      }
    }
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
class DR extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "helmet"
      }),
      t = this.dynamicPropsState;
    if (t.off = !e, t.on = !!e, t.off) {
      const e = HA.get().set(0, 12, -20).applyMatrix4(this.props.transformMatrix);
      this.setupPropsTransition({
        preset: "Bounce",
        presetOpts: {
          bounceHorizontal: 1,
          bounceVertical: .3,
          rotateZ: .9
        },
        transitionAsset: this.dynamicProps.on.asset,
        stateAfter: {
          off: !1,
          on: !0
        },
        onDone: () => {
          this.onInteractionDone();
        },
        onStart: () => {
          this.scene.player.playEmote("Gain"), this.webgl.store.frozenPlayerDelay = 500;
          const t = new DA(30, 30);
          this.webgl.particles.emit("circleSmoke", {
            amount: By.randomInt(40, 50),
            position: e.add(new HA(0, 0, 0)),
            baseRadius: 13,
            scale: t,
            velDrag: .9,
            durationMin: 600,
            durationMax: 800,
            billboard: !0,
            batcherID: "normal",
            sprite: "smoke",
            speed: 0,
            power: 1
          }), this.webgl.particles.emit("flash", {
            amount: By.randomInt(1, 1),
            position: e,
            scale: t.set(200, 200),
            duration: 900,
            billboard: !0,
            batcherID: "noDepthEmissive",
            sprite: "flash",
            speed: 0,
            power: .15
          }), e.release(), this.webgl.audio.playSound("sfx_quest_chest_open");
        }
      }), this.setupInteraction({
        item: "helmet",
        sound: "sfx_quest_chest_lockpick_loop",
        buttonMode: "tap",
        iconPosition: new HA(0, 13.5, 21.3),
        zones: [{
          center: new HA(0, 10, 21.3),
          radius: 5.85
        }],
        cameraTarget: new HA(0, 1.5, 0),
        cameraDistance: 5,
        cameraHeight: 3
      });
    }
  }
  onInteractionDone() {
    this.webgl.savestate.setVariable("isResortBuilt", !0), this.updateSavestate(!0);
  }
}
DR.prepare = () => ({
  preloadAssets: [],
  dynamicProps: {
    off: {
      asset: "ResortOff",
      collider: "ResortOff",
      default: !0,
      castFarShadow: !1
    },
    on: {
      asset: "ResortOn",
      collider: "ResortOn",
      castFarShadow: !1
    }
  }
});
const LR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: DR
}, Symbol.toStringTag, {
  value: "Module"
}));
class OR extends yO {
  init() {
    const e = this.getSavestate({
        forceTrueWhenFinished: "shears"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.off && (this.setupPropsTransition({
      preset: "Tween",
      presetOpts: {
        delayAfter: 100,
        scaleY: {
          easing: "inOutQuint",
          duration: 900,
          from: 1,
          to: .3
        },
        positionY: {
          easing: "inOutQuint",
          duration: 750,
          from: 0,
          to: -2.5
        }
      },
      transitionAsset: this.dynamicProps.off.asset,
      stateAfter: {
        off: !1
      },
      onDone: this.onInteractionDone,
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Victory");
        const t = new DA(270, 220);
        this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t,
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(30, 40),
          position: e.add(new HA(-5, 0, 0)),
          scale: t.set(10, 10),
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_Skatepark_cleaned");
      }
    }), this.setupInteraction({
      item: "shears",
      buttonMode: "hold",
      sound: "sfx_quest_Skatepark_interact_loop",
      iconPosition: new HA(-11, 2, -6),
      zone: {
        center: new HA(-9, 0, -4),
        radius: 9.4
      },
      cameraTarget: new HA(-3, 2, -3),
      cameraDistance: 4,
      cameraHeight: 5
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.setVariable("isSkateparkCleaned", !0), this.updateSavestate(!0);
  }
}
OR.prepare = () => ({
  dynamicProps: {
    off: {
      asset: "SkateparkOvergrowth",
      collider: "SkateparkOvergrowth",
      default: 1,
      castFarShadow: 0
    }
  }
});
const RR = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: OR
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  zR = Ll([0, .52, .285, .98]),
  NR = Ll([.885, .055, .5, 1.005]);
new xk(1, 2);
let FR = [];
class UR extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    const e = this.props;
    this.canMute = e.muteBGM ?? !0, this.sampleID = e.sample || "sfx_quest_sono_loop", this.sample = null, this.enabled = !1, this.fade = 0, this.volume = 0, this.minVolume = null != e.minVolume ? e.minVolume : .3, this.maxVolume = null != e.maxVolume ? e.maxVolume : 1, this.radius = e.radius || 5, this.sqRadius = this.radius * this.radius, this.position = new HA(), this.basePosition = new HA(), e.position && this.basePosition.copy(e.position), e.matrix && this.applyMatrix4(e.matrix), this.canMute && FR.push(this), this.watchSignalImmediate(this.webgl.audio.unlocked, this.onAudioUnlock), this.watchSignal(this.webgl.store.isTransitionActive, this.onTransition);
  }
  applyMatrix4(e) {
    this.position.copy(this.basePosition).applyMatrix4(e);
  }
  stopSound() {
    this.sample && this.sample.stop(), this.sample = null;
  }
  playSound() {
    if (!this.enabled || !this.webgl.audio.unlocked.value) return;
    this.stopSound();
    const e = this.webgl.audio.list[this.sampleID];
    if (!e) return;
    const t = .001 * this.webgl.time.elapsed % e.duration,
      s = e.start,
      i = e.end;
    this.sample = this.webgl.audio.playSound(this.sampleID, {
      loop: !0,
      start: s + t,
      volume: this.volume,
      loopStart: s,
      loopEnd: i
    });
  }
  onTransition(e) {
    this.forceDisabled = e;
  }
  onAudioUnlock(e) {
    this.log(e), e ? this.playSound() : this.stopSound();
  }
  onEnabled() {
    this.enabled = !0, this.playSound();
  }
  onDisabled() {
    this.enabled = !1;
  }
  update() {
    if (!this.scene.player.isBodyReady) return;
    if (this.destroying || this.destroyed) return;
    const e = this.webgl.time.dt,
      t = this.scene.player.base.position.distanceToSquared(this.position),
      s = !this.forceDisabled && t <= this.sqRadius;
    if (s && !this.enabled ? this.onEnabled() : !s && this.enabled && this.onDisabled(), !this.sample) return;
    this.fade = yy(this.fade, s ? 1 : 0, s ? .04 : .068, e, .001);
    const i = this.fade >= .001 ? NR(this.fade) : 0,
      n = dy(t, this.sqRadius, this.sqRadius / 6, this.minVolume, this.maxVolume);
    this.volume = i * n, this.sample.volume = this.volume, !s && this.volume <= 0 && this.stopSound();
  }
  beforeDestroy() {
    this.forceDisabled = !0, this.stopSound();
    const e = FR.indexOf(this);
    e >= 0 && FR.splice(e, 1);
  }
}
UR.getMuteStrength = function () {
  let e = 0;
  for (let t = 0; t < FR.length; t++) {
    const s = FR[t],
      i = s.face <= .001 ? 0 : zR(s.fade);
    i > e && (e = i);
  }
  return 1 - e;
};
const HR = [new HA(0, 3, 0), new HA(1.5, 2.5, 0), new HA(-1.5, 2.5), new HA(.6, .9, -.9)];
class GR extends yO {
  init() {
    this.player = this.scene.player;
    const e = this.getSavestate({
        forceTrueWhenFinished: "disk"
      }),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e, t.off ? (this.setupPropsTransition({
      preset: "Bounce",
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      onDone: this.onInteractionDone,
      onStart: () => {
        const e = HA.get().set(0, 2, 0).applyMatrix4(this.props.transformMatrix);
        this.scene.player.playEmote("Victory"), this.webgl.store.frozenPlayerDelay = 800;
        const t = new DA(10, 10);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(30, 40),
          position: e.add(new HA(0, -1.4, 0)),
          baseRadius: 2.2,
          scale: t,
          velDrag: .9,
          duration: 1200,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: 0,
          power: .3
        }), this.webgl.particles.emit("flash", {
          amount: By.randomInt(1, 1),
          position: e,
          scale: t.set(60, 60),
          duration: 1200,
          billboard: !0,
          batcherID: "noDepthEmissive",
          sprite: "halo",
          speed: 0
        }), e.release(), this.webgl.audio.playSound("sfx_quest_sono_turnedOn");
      }
    }), this.setupInteraction({
      item: "disk",
      buttonMode: "hold",
      sound: "sfx_quest_sono_interact_loop",
      iconPosition: new HA(0, 2.5, -1.5),
      zone: {
        center: new HA(0, 0, -1.5),
        radius: 4
      },
      cameraTarget: new HA(0, 2.5, -.5),
      cameraDistance: 5,
      cameraHeight: 2
    })) : this.initSpatialAudio();
  }
  afterUpdate() {
    const e = this.scene.player;
    if (this.spatialAudio && this.spatialAudio.volume > .5 ? (e.canDanceUID = this.uid, e.canDance = !0) : e.canDance && e.canDanceUID === this.uid && (e.canDance = !1, e.canDanceUID = ""), !this.spatialAudio) return;
    if (this.spatialAudio.volume < .02) return;
    if (this.webgl.time.frameNum % 20 != 0) return;
    const t = Math.floor(By.randomFloat(0, 4)),
      s = HR[t],
      i = HA.get().copy(s).applyMatrix4(this.props.transformMatrix),
      n = HA.get().set(s.x + By.randomFloat(-.2, .2), s.y + By.randomFloat(-.2, .2), s.z - By.randomFloat(.5, .7)).applyMatrix4(this.props.transformMatrix).sub(i),
      a = DA.get(),
      r = By.randomFloat(2, 3);
    a.set(r, r), this.webgl.particles.emit("speakers", {
      amount: By.randomInt(1, 1),
      position: i,
      scale: a,
      velDrag: .9,
      duration: 1200,
      billboard: !0,
      batcherID: "normal",
      vel: n,
      speed: 0,
      power: .3
    }), i.release(), n.release(), a.release();
  }
  initSpatialAudio() {
    this.spatialAudio || (this.spatialAudio = this.add(UR, {
      matrix: this.props.transformMatrix,
      position: new HA(0, 0, -1.7),
      radius: 14.5,
      minVolume: .23,
      maxVolume: .93
    }));
  }
  onInteractionDone() {
    this.webgl.savestate.incrementVariable("activeSpeakersCount"), this.updateSavestate(!0), this.initSpatialAudio();
  }
  beforeDestroy() {
    super.beforeDestroy();
    const e = this.player;
    this.player = null, e.canDance && e.canDanceUID === this.uid && (e.canDance = !1, e.canDanceUID = "");
  }
}
GR.prepare = () => ({
  staticColliders: [{
    asset: "Speakers"
  }],
  dynamicProps: {
    off: {
      asset: "Speakers",
      default: 1,
      castFarShadow: 1
    },
    on: {
      asset: "SpeakersOn",
      castFarShadow: 0
    }
  }
});
const VR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: GR
}, Symbol.toStringTag, {
  value: "Module"
}));
class WR extends yO {
  init() {
    if (!this.props.targetPosition) return;
    if (!this.props.targetLookAt) return;
    const e = this.props.targetPosition.split(",").map(e => +e),
      t = this.props.targetLookAt.split(",").map(e => +e);
    this.targetPosition = new HA().fromArray(e), this.targetLookAt = new HA().fromArray(t), this.setupInteraction({
      buttonIcon: "interactions-telescope",
      buttonMode: "hold-infinite",
      icon: "bubble_eye",
      iconCollapsed: "eye",
      playerActionPreset: "None",
      iconPosition: new HA(0, 3, 0),
      zone: {
        center: new HA(0, 0, 1),
        radius: 3
      },
      onAnimStart: () => this.onAnimStart(),
      onAnimStop: () => this.onAnimStop()
    });
  }
  onAnimStart() {
    const e = this.scene.playerCam;
    this.webgl.app.$store.isTelescopeActive = !0, this.webgl.audio.playSound("sfx_telescope_cameraMovement"), e.setTarget({
      id: this.uid,
      lockPlayer: !0,
      position: this.targetPosition,
      lookAt: this.targetLookAt,
      posEase: .05,
      lookAtEase: .07,
      isAction: !0
    });
  }
  onAnimStop() {
    const e = this.scene.playerCam;
    this.webgl.app.$store.isTelescopeActive = !1, this.webgl.audio.playSound("sfx_UI_Dialog_CameraMove_Out"), e.removeTarget(this.uid);
  }
}
WR.prepare = () => ({
  staticProps: [{
    asset: "Telescope"
  }]
});
const jR = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: WR
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  qR = new rC();
let ZR = new HA(),
  $R = new HA(),
  XR = new HA(),
  YR = new jM();
function JR(e, t) {
  const s = {
      init: C,
      destroy: function () {
        for (let e = 0; e < r.length; e++) r[e].destroy();
        r.length = 0;
      },
      update: function () {
        const t = _L.time.dt,
          l = e.frustum;
        if (!l.intersectsSphere(o)) return T();
        if ((a -= t) < 0) {
          const t = e.getCurrentCamera();
          A = t.base.position.distanceToSquared(o.center), M = A > c, n = A < u, a = i;
        }
        if (!n) return T();
        (_ -= t) < 0 && function () {
          const e = _L.time.dt;
          if (By.tossCoin(M ? .2 : .7)) {
            _ = By.randomFloat(10, 20);
            const t = By.random(),
              s = ZR.lerpVectors(g, v, t),
              i = YR.copy(d),
              n = t < .1 || t > .9;
            _L.particles.emit("waterfallSplash", {
              position: s,
              rotation: i,
              billboard: n,
              dimished: M,
              color: f,
              scale: m,
              batcherID: "underwater"
            }), !M && (x -= e) < 0 && (x = By.randomFloat(200, 600), _L.particles.emit("waterRipples", {
              amount: 1,
              position: y,
              rotation: b,
              scale: $R.set(.5, 3).multiplyScalar(1.6 * m),
              scaleTo: XR.set(1.5, 2.1).multiplyScalar(5.2 * m),
              durationMin: 800,
              durationMax: 1e3 + x,
              opacity: 1,
              alphaEase: "inQuint",
              batcherID: "normal"
            }));
          }
        }();
        s.particlesVisible = !0;
        for (let e = 0; e < r.length; e++) E(r[e]);
      },
      visible: !1
    },
    i = 90;
  let n = !1,
    a = 0;
  const r = [];
  let o = null,
    l = 0,
    c = 0,
    h = 0,
    u = 0,
    d = 0,
    p = 0,
    m = 0,
    f = null,
    g = null,
    v = null,
    b = null,
    y = null,
    _ = 0,
    x = 0,
    w = null,
    S = null,
    A = null,
    M = null;
  function C() {
    const i = t;
    o = new CM(new HA(0, 0, 0), 2), o.applyMatrix4(t), l = o.radius, o.radius, o.radius, n = !1, a = -10, c = 500 * l, h = 500 * l, u = 900 * l, qR.scale.setScalar(1), qR.position.multiplyScalar(0), qR.quaternion.identity(), qR.applyMatrix4(i), qR.rotateY(.5 * Math.PI), f = new AC(...e.biome.defines.WATER_TOP_COLOR.slice(5).split(",").map(e => parseFloat(e))), p = qR.scale.clone(), d = qR.rotation.clone(), m = o.radius, g = new HA(.98, -5.2, -1.15).applyMatrix4(i), v = new HA(.98, -5.2, 1.15).applyMatrix4(i), qR.rotateX(-.5 * Math.PI), qR.rotateZ(-.5 * Math.PI), b = qR.rotation.clone(), y = new HA(.92, -4.97, 0).applyMatrix4(i), x = 0, _ = 0, s.visible = !1, w = ZR.set(0, -3.1, 0).applyMatrix4(i).y, S = ZR.set(0, -5.3, 0).applyMatrix4(i).y, qR.quaternion.identity(), qR.applyMatrix4(i), qR.rotateY(.5 * Math.PI);
    const A = qR.rotation.clone();
    for (let e = 0; e < 6; e++) {
      const t = new GO({
        batcher: "underwater",
        sprite: "waterfallCircle2",
        rotation: A
      });
      r.push(t), P(t), t.delay = e > 0 ? By.randomFloat(0, 700) : 0;
    }
  }
  function P(e) {
    const s = t,
      i = By.randomFloat(0, 1),
      n = By.randomFloat(0, 1),
      a = By.randomFloat(.4, .9) * p.x,
      r = By.randomFloat(10, 25),
      o = r * p.y;
    e.maxAlpha = By.randomFloat(.2, .6), e.alpha = 0, e.speed = By.randomFloat(1.2, 2.2), e.position.set(.98, .22 - .06 * r + fy(0, -1, n), fy(-.9, .9, i)).applyMatrix4(s), e.scale.set(a, o);
  }
  function T() {
    if (s.particlesVisible) {
      s.particlesVisible = !1;
      for (let e = 0; e < r.length; e++) r[e].visible = !1;
    }
  }
  function E(e) {
    const t = _L.time.stableDt;
    if (e.delay > 0) return e.visible = !1, void (e.delay -= t);
    e.position.y -= .02 * e.speed * t, e.alpha < e.maxAlpha && (e.alpha = Math.min(e.alpha + .006 * t, e.maxAlpha));
    let s = my(e.position.y, w, S);
    e.alpha *= 1 - s, s = my(A, h, u), e.alpha *= 1 - s, e.visible = e.alpha > .01, e.position.y < S && P(e);
  }
  return C(), s;
}
class QR extends yO {
  init() {
    this.particles = JR(this.scene, this.props.transformMatrix);
  }
  update() {
    this.particles.update();
  }
  beforeDestroy() {
    this.particles.destroy, super.beforeDestroy();
  }
}
QR.prepare = () => ({
  staticProps: [{
    asset: "Waterfall"
  }]
});
const KR = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: QR
}, Symbol.toStringTag, {
  value: "Module"
}));
class ez extends yO {
  init() {
    this.particles = JR(this.scene, this.props.transformMatrix);
  }
  update() {
    this.getSavestate({
      forceTrueWhenFinished: "helmet"
    }) && this.particles.update();
  }
  beforeDestroy() {
    this.particles.destroy(), super.beforeDestroy();
  }
}
ez.prepare = () => ({});
const tz = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: ez
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  sz = new HA();
function iz(e, t, s) {
  const i = sz.subVectors(s, t).normalize().multiplyScalar(5).add(s);
  e.lookAt(i.x, e.position.y, i.z);
}
const nz = () => {},
  az = {
    Def: nz
  };
class rz {
  constructor(e = {}) {
    let t = 0;
    const s = this.routines = {},
      i = this.states = {},
      n = this.statesCbs = [];
    e.states || (e.states = az);
    for (let a in e.states) {
      const s = t++;
      i[a] = s;
      const r = e.states[a] || nz;
      n[s] = e.context ? r.bind(e.context) : r;
    }
    e.routines || (e.routines = {});
    for (let a in e.routines) {
      const t = e.routines[a] || nz;
      s[a] = t.bind(e.context, this);
    }
    this.current = i[e.current] || Object.values(i)[0], this.currentCb = n[this.current], this.prevTime = -1, this.time = 0;
  }
  update() {
    const e = this.dt = _L.time.dt;
    this.prevTime = this.time, this.time += e, this.currentCb(this);
  }
  set(e) {
    "string" == typeof e && (e = this.states[e]), this.current = e, this.currentCb = this.statesCbs[e], this.prevTime = -1, this.time = 0;
  }
  hasReached(e) {
    return this.prevTime <= e && this.time > e;
  }
  destroy() {
    this.states = null, this.statesCbs.length = 0, this.currentCb = null, this.update = nz;
  }
}
const oz = new DA(),
  lz = new HA(),
  cz = new UA(),
  hz = Ll("inOutQuad"),
  uz = {
    playerLookAtTarget(e) {
      if (!e.targetLookAt) return e.lookAtAng;
      const t = this.takeOver;
      return t.player.quaternion.slerp(e.targetLookAt, .12), e.lookAtAng = Math.abs(t.player.quaternion.angleTo(e.targetLookAt)), e.lookAtAng;
    },
    bringZiplineMesh(e, t) {
      const s = this.move;
      if (this.ziplineMesh.goto === this && (this.ziplineMesh.position.lerp(s.from, .04), t)) return this.ziplineMesh.position.distanceTo(s.from);
    },
    stickPlayerToZipline(e) {
      const t = _L.time.stableDt;
      e.slotMix = yy(e.slotMix, 1, .039, t, .01);
      const s = this.takeOver;
      this.playerSlot.getWorldPosition(lz), this.playerSlot.getWorldQuaternion(cz), e.slotMix > .99 ? (s.player.position.copy(lz), s.player.quaternion.copy(cz)) : (s.player.position.lerp(lz, e.slotMix), s.player.quaternion.slerp(cz, e.slotMix));
    },
    stickCameraToZipline(e) {
      const t = _L.time.stableDt,
        s = this.takeOver;
      e.camMix = by(e.camMix, 1, .008, t), this.ziplineMesh.localToWorld(e.camTarget.set(2 * e.camSideX, -.8, 5 * e.camSideZ).normalize().multiplyScalar(5)), s.camera.position.lerp(e.camTarget, fy(.04, 1, e.camMix)), s.camera.updateMatrixWorld(), cz.copy(s.camera.quaternion), s.camera.lookAt(lz.set(0, .6, 0).add(s.player.position)), s.camera.rotateY(Math.PI), s.camera.quaternion.slerp(cz, .93);
    },
    updateZiplineShow() {
      const e = this.ziplineMesh,
        t = _L.time.stableDt;
      e.size = by(e.size, 1, .09, t), e.rotateSpring.update(t), e.quaternion.copy(e.baseQt), e.rotateOnAxis(lz.set(0, 0, 1), e.rotateSpring.value), e.scale.setScalar(e.size);
    },
    updateZiplineHide() {
      const e = this.ziplineMesh,
        t = _L.time.stableDt;
      this.ziplineMesh.hideTween.update(t);
      const s = this.ziplineMesh.hideProgress;
      e.size = 1 - s, e.quaternion.copy(e.baseQt), e.rotateOnAxis(lz.set(1, 0, 0), -2.5 * s), e.scale.setScalar(e.size);
    },
    idleJumpAnim(e) {
      const t = e.timeSinceJump;
      e.timeSinceJump += e.dt, t <= 990 && e.timeSinceJump > 990 && this.scene.player.playEmote("ZiplineIdle");
    }
  },
  dz = {
    None() {},
    Prepare(e) {
      const t = this.ziplineMesh;
      e.hasReached(0) && (this.scene.addObject3D(t), t.position.copy(this.move.from), t.baseQt || (t.rotateSpring = tc(), t.baseQt = new UA()), iz(t, this.move.from, this.move.to), t.baseQt.copy(t.quaternion), t.size = .01, t.rotateSpring.setValue(-6), t.rotateSpring.setTarget(0)), e.hasReached(50) && this.webgl.particles.emit("circleSmoke", {
        amount: By.randomInt(5, 7),
        position: lz.set(0, -.25, 0).add(this.ziplineMesh.position),
        baseRadius: .05,
        scale: oz.setScalar(By.randomFloat(2.5, 3)),
        velDrag: .94,
        duration: 950,
        billboard: !0,
        batcherID: "normal",
        sprite: "smoke",
        speed: .01,
        power: .04,
        velocityY: .04
      }), e.routines.updateZiplineShow(), e.hasReached(250) && e.set("LookAt");
    },
    LookAt(e) {
      const t = this.move,
        s = this.takeOver;
      if (e.hasReached(0)) {
        cz.copy(s.player.quaternion), s.player.updateMatrix();
        const i = this.ziplineMesh.position;
        s.player.lookAt(lz.set(i.x, s.player.position.y, i.z)), e.targetLookAt || (e.targetLookAt = new UA()), e.targetLookAt.copy(s.player.quaternion), s.player.quaternion.copy(cz), e.lookingAt = !0, this.ziplineMesh.goto = this, iz(this.ziplineMesh, t.from, t.to);
      }
      e.routines.updateZiplineShow();
      e.routines.playerLookAtTarget() < .2 && e.time > 200 && e.set("Jump");
    },
    Jump(e) {
      const t = this.move,
        s = this.takeOver;
      e.hasReached(0) && (_L.store.isOnZipline = !0, cz.copy(s.player.quaternion), s.player.updateMatrix(), s.player.lookAt(lz.set(t.to.x, s.player.position.y, t.to.z)), e.targetLookAt || (e.targetLookAt = new UA()), e.targetLookAt.copy(s.player.quaternion), s.player.quaternion.copy(cz), this.ziplineMesh.goto = this, iz(this.ziplineMesh, t.from, t.to), e.camTarget || (e.camTarget = new HA()), this.ziplineMesh.worldToLocal(e.camTarget.copy(s.camera.position)), e.camSideX = e.camTarget.x < 0 ? -1 : 1, e.camSideZ = e.camTarget.z < 0 ? -1 : 1, e.camMix = 0, _L.audio.playSound("sfx_quest_zipline_jumpGrab"), this.scene.player.playEmote("ZiplineJump"), e.timeSinceJump = 0, e.slotMix = 0), e.routines.idleJumpAnim();
      const i = e.routines.playerLookAtTarget();
      e.routines.updateZiplineShow();
      if (e.time > 120 && e.routines.stickPlayerToZipline(), e.routines.stickCameraToZipline(), e.slotMix > .7 && i < .2 && e.set("Move"), e.hasReached(120)) {
        this.scene.playerCam.shake(750, .032, !1, !0, .75);
        const e = lz.copy(s.player.position);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(5, 8),
          position: e,
          baseRadius: .05,
          scale: oz.setScalar(By.randomFloat(3.3, 3.6)),
          velDrag: .95,
          duration: 950,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: .01,
          power: .08,
          velocityY: .09
        });
      }
      if (e.hasReached(150) || e.hasReached(200)) {
        const e = lz.copy(s.player.position);
        this.webgl.particles.emit("circleSmoke", {
          amount: By.randomInt(4, 6),
          position: e,
          baseRadius: .07,
          scale: oz.setScalar(By.randomFloat(1.9, 2.2)),
          velDrag: .91,
          duration: 700,
          billboard: !0,
          batcherID: "normal",
          sprite: "smoke",
          speed: .007,
          power: .04,
          velocityY: .12
        });
      }
    },
    Move(e) {
      const t = this.move;
      this.takeOver;
      const s = this.webgl.time.stableDt,
        i = _L.time.stableDt;
      if (e.hasReached(0) && (this.ziplineMesh.goto = null, e.moveTime = 0, e.moveProgress = 0, e.moveTravelled = e.prevMoveTravelled = 0, e.prevSmokeEmit = 0, e.vel = 0, e.moveDuration = 65 * t.distance, e.soundStopped = !1, e.ziplineBaseQt || (e.ziplineBaseQt = new UA()), iz(this.ziplineMesh, t.from, t.to), e.ziplineBaseQt.copy(this.ziplineMesh.quaternion), e.baseZ = this.playerSlot.position.z, this.slideSound && this.slideSound.realstop(), this.slideSound = _L.audio.playSound("sfx_quest_zipline_slide_loop")), e.moveProgress >= .9997) return e.set("Land");
      e.moveProgress = hz(my(e.moveTime, 0, e.moveDuration)), e.prevMoveTravelled = e.moveTravelled, e.moveTravelled = e.moveProgress * t.distance;
      const n = lz.lerpVectors(t.from, t.to, e.moveProgress);
      this.ziplineMesh.position.copy(n), e.moveTime += s, e.moveTravelled - e.prevSmokeEmit > .12 && By.tossCoin(.5) && (e.prevSmokeEmit = e.moveTravelled, this.webgl.particles.emit("walk", {
        amount: By.randomInt(4, 5),
        position: this.ziplineMesh.position,
        scale: oz.set(4, 4),
        duration: 800,
        billboard: !0,
        depthTest: !0,
        opacity: .3,
        batcherID: "normal",
        sprite: "smoke2"
      }));
      const a = t.distance - e.moveTravelled;
      if (a < 2.8 && !e.soundStopped && (this.slideSound && this.slideSound.stop(), e.soundStopped = !0), a < .05) return e.set("Land");
      e.vel = by(e.vel, e.moveTravelled - e.prevMoveTravelled, .13, i), this.ziplineMesh.quaternion.copy(e.ziplineBaseQt);
      this.ziplineMesh.rotateX(1.4 * e.vel * .6), this.playerSlot.position.z = e.baseZ - .52 * e.vel * .6, e.routines.idleJumpAnim(), e.routines.playerLookAtTarget(), e.routines.stickPlayerToZipline(), e.routines.stickCameraToZipline();
    },
    Land(e) {
      e.hasReached(0) && (this.slideSound && this.slideSound.stop(), this.ziplineMesh.hideTween = null, _L.store.isOnZipline = !1, this.ziplineMesh.goto = null, _L.audio.playSound("sfx_quest_zipline_slide_end"), this.scene.player.playEmote("ZiplineFall"));
      e.hasReached(50) && (this.ziplineMesh.hideTween = Kl({
        target: this.ziplineMesh,
        property: "hideProgress",
        from: 0,
        to: 1,
        duration: 640,
        easing: [.57, -.015, .79, -.6]
      }), this.endZip()), e.time > 100 && e.routines.updateZiplineHide(), this.ziplineMesh.hideTween && this.ziplineMesh.hideTween.progress > .99 && (this.ziplineMesh.hideTween.destroy(), this.ziplineMesh.removeFromParent(), e.set("None"));
    }
  },
  pz = new rC();
pz.matrixAutoUpdate = !1, new HA(), new DA();
Ll("inOutQuad");
class mz extends yO {
  init() {
    this.takeOverUpdate = this.takeOverUpdate.bind(this), this.useNormalIconCollapsed = !0, this.t = this.pt = 0;
    const e = this.getSavestate(),
      t = this.dynamicPropsState;
    t.off = !e, t.on = !!e;
    const s = this.props.transformMatrix,
      i = this.props.ZiplineLink,
      [n, a] = i.split(">");
    this.isMainZipline = a.localeCompare(n) > 0;
    const {
        geometry: r
      } = this.webgl.resources.assets.Zipline,
      o = bO.use({
        biome: this.scene.biome
      });
    this.ziplineMesh = new sP(r, o), this.playerSlot = new rC(), this.playerSlot.position.z = -.15, this.playerSlot.position.y = -2.15, this.ziplineMesh.add(this.playerSlot), this.ziplineMesh.castShadow = this.webgl.store.chunksCastShadow.value, this.ziplineMesh.receiveShadow = !0, this.link = {
      from: n,
      to: a
    }, this.position = new HA().applyMatrix4(s), this.move = {
      from: this.position.clone(),
      to: this.position.clone(),
      baseDelay: 650,
      durationMult: 65,
      rxMult: .7,
      delay: 0,
      distance: 0,
      travelled: 0,
      prevTravelled: 0,
      prevSmokeEmit: 0,
      progress: 0,
      time: 0,
      rx: 0,
      rz: tc()
    }, this.move.rz.setTension(.034), this.move.rz.setFriction(.065), t.off && this.setupPropsTransition({
      preset: "Toggle",
      presetOpts: {
        bounceVertical: 0,
        rotateY: 9.5,
        cameraShake: !1
      },
      transitionAsset: this.dynamicProps.on.asset,
      stateAfter: {
        off: !1,
        on: !0
      },
      disableCamTargetRemoval: !0,
      onDone: () => {},
      onStart: () => {}
    }), this.sm = new rz({
      states: dz,
      routines: uz,
      context: this
    }), this.resetInteraction();
  }
  afterActorsInit() {
    for (let e in this.scene.actors) {
      const t = this.scene.actors[e];
      if ("Zipline" !== t.type) continue;
      if (this.link.to !== t.link.from) continue;
      this.linkedZipline = t;
      const s = pz.matrix;
      pz.matrix.identity(), pz.applyMatrix4(this.props.transformMatrix), pz.lookAt(t.position), pz.updateMatrix(), this.move.from.set(0, 5.5, 2).applyMatrix4(s), pz.matrix.identity(), pz.applyMatrix4(t.props.transformMatrix), pz.lookAt(this.position), pz.updateMatrix(), this.move.to.set(0, 5.5, 2).applyMatrix4(s), this.move.distance = this.move.from.distanceTo(this.move.to);
      break;
    }
    this.ziplineMesh.position.copy(this.move.from), iz(this.ziplineMesh, this.move.from, this.move.to);
  }
  resetInteraction() {
    this.ziplineMesh && (this.ziplineMesh.goto = null), this.sm.set("None");
    const e = this.move;
    e.time = e.travelled = e.prevTravelled = e.progress = e.prevSmokeEmit = 0, e.rx = 0, e.delay = e.baseDelay, e.rz.setValue(.8), e.rz.setTarget(0), this.setupInteraction({
      item: "zipline",
      buttonMode: "hold",
      buttonSpeed: 6,
      sound: "sfx_quest_zipline_interact_loop",
      iconPosition: new HA(0, 3, -.75),
      zone: {
        center: new HA(0, 0, -1.1),
        radius: 2
      },
      cameraTarget: new HA(0, 4, 0),
      cameraDistance: 5.5,
      cameraHeight: 2.5,
      onDone: () => this.onInteractionDone()
    });
  }
  markZiplineAsUsed() {
    const e = this.linkedZipline;
    e.propsTransitionState && e.startPropsTransition && e.startPropsTransition(), this.propsTransitionState && this.startPropsTransition && (this.startPropsTransition(), this.webgl.store.frozenPlayerDelay = 500);
  }
  async onInteractionDone() {
    var e;
    if (this.markZiplineAsUsed(), this.toggleCinematic(!0), this.webgl.audio.playSound("sfx_quest_zipline_interact_done"), await this.wait(300), this.isDestroyed) return;
    this.removeInteraction(), this.linkedZipline.removeInteraction(), null == (e = this.scene.playerCam) || e.removeTarget({
      id: this.uid
    }), this.t = 0, this.physics = this.scene.physics;
    (this.takeOver = this.scene.physics.toggleTakeOver(!0, {
      uid: this.uid,
      onUpdate: this.takeOverUpdate,
      cameraEaseIn: .05,
      cameraEaseOut: .034
    })).player.quaternion.copy(this.scene.player.base.quaternion), this.scene.player.rotateAtState.enabled = !1, this.scene.player.rotateAtState.influence = 0, this.sm.set("Prepare"), this.sm.update();
  }
  takeOverUpdate() {
    this.sm.update();
  }
  update() {
    this.scene.physics.takeOver.active || this.sm.update();
  }
  toggleCinematic(e) {
    e || this.webgl.app.$store.isCinematicActive !== this.uid ? e && (this.webgl.app.$store.isCinematicActive = this.uid) : this.webgl.app.$store.isCinematicActive = null;
  }
  async endZip() {
    if (this.active = !1, this.webgl.store.isOnZipline = !1, this.webgl.store.frozenPlayerDelay = 900, this.scene.physics.toggleTakeOver(!1, {
      uid: this.uid
    }), await this.wait(400), this.isDestroyed) return;
    if (this.toggleCinematic(!1), await this.wait(700), this.isDestroyed) return;
    const e = !this.getSavestate();
    this.updateSavestate(!0), this.linkedZipline.updateSavestate(!0), e && this.webgl.savestate.incrementVariable("usedZiplineCount"), await this.wait(900), this.isDestroyed || (this.resetInteraction(), this.linkedZipline.resetInteraction());
  }
  beforeDestroy() {
    this.slideSound && this.slideSound.realstop(), this.physics && this.physics.toggleTakeOver(!1, {
      uid: this.uid
    }), this.webgl.store.isOnZipline = !1, this.physics = null, this.toggleCinematic(!1), this.ziplineMesh && this.ziplineMesh.removeFromParent(), super.beforeDestroy();
  }
  get mixins() {
    return [...super.mixins, "timers"];
  }
}
mz.prepare = () => ({
  preloadAssets: ["Zipline"],
  staticProps: [{
    asset: "ZiplineBase"
  }],
  staticColliders: [{
    asset: "ZiplineButtonOff"
  }],
  dynamicProps: {
    off: {
      asset: "ZiplineButtonOff",
      default: 1,
      castFarShadow: 1
    },
    on: {
      asset: "ZiplineButtonOn",
      castFarShadow: 0
    }
  }
});
const fz = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: mz
}, Symbol.toStringTag, {
  value: "Module"
}));
class gz extends yO {
  init() {
    this.setupInteraction({
      buttonIcon: "interactions-tamtam",
      buttonMode: "hold-infinite",
      icon: "bubble_quest",
      playerActionPreset: "Tamtam",
      iconPosition: new HA(0, 3.5, 0),
      zone: {
        center: new HA(0, 0, 0),
        radius: 3.65
      },
      sound: "sfx_secret_interact_tamtam_loop",
      cameraTarget: new HA(-.4, 1, -.1),
      onAnimStart: () => this.webgl.store.isMutingBgm.set(!0),
      onAnimStop: () => this.webgl.store.isMutingBgm.set(!1),
      cameraDistance: 1.5,
      cameraHeight: 3
    });
  }
}
gz.prepare = () => ({
  staticProps: [{
    asset: "Tamtam"
  }]
});
const vz = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: gz
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  bz = Object.assign({
    "./NPC/NPCIntroActor.js": wR
  }),
  yz = {};
for (let TG in bz) {
  yz[TG.split("/").pop().slice(0, -8)] = bz[TG].default;
}
const _z = yz,
  xz = new HA(),
  wz = new HA();
class Sz {
  constructor(e, t = 200, s = 5, i = -5) {
    Object.assign(this, {
      divisions: t,
      forward: s,
      backward: i,
      closestIndex: 0,
      curve: new II()
    });
    for (let n = 0; n < e.length; n += 12) this.curve.add(new AI(new HA().fromArray(e, n + 0), new HA().fromArray(e, n + 3), new HA().fromArray(e, n + 6), new HA().fromArray(e, n + 9)));
    this.points = this.curve.getSpacedPoints(t).map(e => ({
      point: e
    }));
    for (let n = 0; n < this.points.length; n++) {
      const e = this.points[n],
        t = this.points[this.getOffsetIndex(n, -1)],
        s = this.points[this.getOffsetIndex(n, 1)];
      this.points[n].lineFromPrevious = new pL(t.point, e.point), this.points[n].lineToNext = new pL(e.point, s.point);
    }
  }
  getOffsetIndex(e, t, s = this.points.length) {
    return ((e + t) % s + s) % s;
  }
  getClosestProgress(e, t = 0) {
    const {
      length: s
    } = this.points;
    let i = Infinity,
      n = 0;
    for (let u = 0; u < s; u++) {
      const t = this.points[u],
        s = e.distanceTo(t.point);
      s < i && (i = s, n = u);
    }
    const a = this.points[n],
      r = a.lineFromPrevious.closestPointToPointParameter(e, !0),
      o = a.lineToNext.closestPointToPointParameter(e, !0);
    let l = 0,
      c = 0;
    r < 1 ? (l = r, c = this.getOffsetIndex(n, -1)) : (l = o, c = n);
    const h = 1 / this.divisions;
    return this.getOffsetIndex(h * c + h * l, t, 1);
  }
  getPoint(e, t) {
    return this.curve.getPointAt(e, t);
  }
  getDirection(e, t = 1e-5, s) {
    return this.getPoint(Math.max(0, e), xz), this.getPoint(Math.min(1, e + t), wz), s.copy(wz.sub(xz));
  }
  static generateTransferable(e) {
    const t = e ? e.curves.length : 0,
      s = new Float32Array(4 * t * 3);
    for (let i = 0; i < t; i++) {
      const t = e.curves[i];
      "CubicBezierCurve3" === t.type ? (s[4 * i * 3 + 0] = t.v0.x, s[4 * i * 3 + 1] = t.v0.y, s[4 * i * 3 + 2] = t.v0.z, s[4 * i * 3 + 3] = t.v1.x, s[4 * i * 3 + 4] = t.v1.y, s[4 * i * 3 + 5] = t.v1.z, s[4 * i * 3 + 6] = t.v2.x, s[4 * i * 3 + 7] = t.v2.y, s[4 * i * 3 + 8] = t.v2.z, s[4 * i * 3 + 9] = t.v3.x, s[4 * i * 3 + 10] = t.v3.y, s[4 * i * 3 + 11] = t.v3.z) : "LineCurve" === t.type && (s[4 * i * 3 + 0] = t.v1.x, s[4 * i * 3 + 1] = t.v1.y, s[4 * i * 3 + 2] = t.v1.z, s[4 * i * 3 + 3] = t.v1.x, s[4 * i * 3 + 4] = t.v1.y, s[4 * i * 3 + 5] = t.v1.z, s[4 * i * 3 + 6] = t.v2.x, s[4 * i * 3 + 7] = t.v2.y, s[4 * i * 3 + 8] = t.v2.z, s[4 * i * 3 + 9] = t.v2.x, s[4 * i * 3 + 10] = t.v2.y, s[4 * i * 3 + 11] = t.v2.z);
    }
    return s;
  }
}
let Az = 0;
class Mz {
  constructor(e, {
    debug: t,
    position: s,
    radius: i,
    refreshDelay: n
  } = {}, a) {
    this.refreshDelay = n || 200, this.lastRefresh = 0, this.broadphase = a, this.debug = !1, this.mainCell = null, this.activeCells = new Set(), this.cellsMap = new Map(a.cells.map(e => [e, !1])), this.element = e, this.box = new hL();
    const r = s || (e.base ? e.base.position : e.possition) || new HA();
    this.sphere = new CM(r, i || 2), this.radius = this.sphere.radius, this.position = this.sphere.center, this.prevPosition = new HA(), this.update(!1, !0);
    let o = this;
    this.gatherNeighborItems = function (e) {
      o.gatherNeighborItems(e);
    };
  }
  updateBox(e) {
    this.box.min.set(e.x - this.radius, e.z - this.radius), this.box.max.set(e.x + this.radius, e.z + this.radius);
  }
  getNeighbourhood(e, t) {
    e && (e.length = 0), this.gatherer = e || [], this.gathererFilter = t, this.activeCells.forEach(this.gatherNeighborItems), this.gatherer = this.gathererFilter = null;
  }
  gatherNeighborItems() {}
  update(e, t = !1) {
    if (this.destroyed || this.broadphase.destroyed) return;
    e && this.position.copy(e);
    const s = this.prevPosition.distanceToSquared(this.position);
    if (!t && s < .05) return;
    const i = performance.now(),
      n = i - this.lastRefresh;
    if (!t && n < this.refreshDelay) return;
    this.lastRefresh = i, Az = Az + 1 | 0, this.updateBox(this.position), this.prevPosition.copy(this.position);
    const a = this.broadphase.getCell(this.position),
      r = a !== this.mainCell;
    this.forceAll = r && a && !a.neighbors.includes(this.mainCell), this.mainCell = a, a && this.updateCell(a, !0), this.forceAll = !1;
  }
  updateCell(e, t = !1) {
    const s = t || e.box.intersectsBox(this.box);
    let i = !1;
    if ((this.forceAll || this.cellsMap.get(e) !== s) && (this.cellsMap.set(e, s), s ? e.addItem(this) : e.removeItem(this), i = !0), e.iterationIdx = Az, i || s) for (let n = 0, a = e.neighbors.length; n < a; n++) {
      const t = e.neighbors[n];
      t.iterationIdx !== Az && this.updateCell(t);
    }
  }
  destroy() {
    for (let e = 0, t = this.broadphase.cells.length; e < t; e++) {
      this.broadphase.cells[e].removeItem(this);
    }
    this.destroyed = !0, this.cellsMap.clear(), this.activeCells.clear(), this.broadphase = null, this.element = null;
  }
}
class Cz {
  constructor({
    row: e,
    col: t,
    broadphase: s,
    scene: i,
    bounds: n
  } = {}) {
    this.row = e, this.col = t, this.broadphase = s, this.scene = i, this.iterationIdx = Az, this.neighbors = [], this.items = [], this.box = new hL(new DA(n.min.x, n.min.y), new DA(n.max.x, n.max.y));
  }
  addItem(e) {
    e.activeCells.has(this) || (e.cellsMap.set(this, !0), e.activeCells.add(this), this.items.push(e), this.broadphase.callOnChange());
  }
  removeItem(e) {
    if (e.activeCells.has(this)) {
      e.cellsMap.set(this, !1), e.activeCells.delete(this);
      const t = this.items.indexOf(e);
      this.items.splice(t, 1), this.broadphase.callOnChange();
    }
  }
  destroy() {
    this.items.length = this.neighbors.length = 0, this.helper && this.helper.removeFromParent();
  }
}
const Pz = class extends ML {
    init() {
      const e = this.scene;
      this.onChange = this.props.onChange;
      const t = this.props.bounds || this.scene.bbox || this.scene.bounds,
        s = t.min,
        i = t.max;
      this.bounds = new hL(new DA(s.x, s.z), new DA(i.x, i.z)), this.size = this.bounds.getSize(new HA()), this.width = this.size.x, this.height = this.size.y;
      const n = this.cellCountWidth = this.props.cellCountWidth || 5,
        a = this.cellCountHeight = this.props.cellCountHeight || 5;
      this.cellStepWidth = this.width / n, this.cellStepHeight = this.height / a, this.cells = [], this.rows = [];
      for (let o = 0; o < n; o++) {
        const t = [];
        this.rows.push(t);
        for (let s = 0; s < a; s++) {
          const i = new hL();
          i.min = new DA(this.bounds.min.x + this.cellStepWidth * o, this.bounds.min.y + this.cellStepHeight * s), i.max.set(i.min.x + this.cellStepWidth, i.min.y + this.cellStepHeight);
          const n = new Cz({
            row: o,
            col: s,
            bounds: i,
            scene: e,
            broadphase: this
          });
          t.push(n), this.cells.push(n);
        }
      }
      for (let o = 0, l = this.cells.length; o < l; o++) {
        const e = this.cells[o],
          t = e.row,
          s = e.col,
          i = e.neighbors;
        let n;
        (n = this.getAbsCell(t - 1, s)) && i.push(n), (n = this.getAbsCell(t, s - 1)) && i.push(n), (n = this.getAbsCell(t, s + 1)) && i.push(n), (n = this.getAbsCell(t + 1, s)) && i.push(n);
      }
      const r = this;
      this.changedCalled = !1, this.defferedCallChanged = function () {
        r.changedCalled = !1, r.onChange && r.onChange();
      }, this.static = !0;
    }
    callOnChange() {
      this.changedCalled || (this.changedCalled = !0, requestAnimationFrame(this.defferedCallChanged));
    }
    getAbsCell(e, t) {
      if (this.rows[e]) return this.rows[e][t];
    }
    getCell(e, t) {
      null != e.z ? (t = e.z, e = e.x) : null != e.y && (t = e.y, e = e.x);
      const s = this.bounds.min;
      let i = Math.floor((e - s.x) / this.cellStepWidth),
        n = Math.floor((t - s.y) / this.cellStepHeight);
      return i = hy(i, 0, this.cellCountWidth - 1), n = hy(n, 0, this.cellCountHeight - 1), this.rows[i][n];
    }
    add(e, t = {}) {
      return new Mz(e, t, this);
    }
    remove(e) {
      if (this.foreachCells("removeItem", e), !e.dynamic) return;
      const t = this.dynamicItems.indexOf(e);
      t > -1 && this.dynamicItems.splice(t, 1);
    }
    foreachCells(e, t) {
      for (let s = 0, i = this.cells.length; s < i; s++) this.cells[s][e](t);
    }
    destroy() {
      this.destroyed = !0, this.foreachCells("destroy"), this.scene = null, this.items = null, this.cells.length = 0, this.rows.length = 0, super.destroy();
    }
  },
  Tz = {
    Main: {
      sampleID: "sfx_amb_main_loop",
      maxVolume: 1
    },
    Beach: {
      sampleID: "sfx_amb_beach_loop",
      maxVolume: 1
    },
    Forest: {
      sampleID: "sfx_amb_forestBird_loop",
      maxVolume: 1.1
    },
    Waterfall: {
      sampleID: "sfx_amb_waterfall_loop",
      maxVolume: .88,
      fadeIn: 1500,
      fadeOut: 1e3
    }
  };
class Ez extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    this.updateDelay = 0, this.broadphase = this.add(Pz, {
      debug: !1
    }), this.ambiances = {};
    for (let e in Tz) this.ambiances[e] = {
      sampleID: Tz[e].sampleID,
      maxVolume: .82 * Tz[e].maxVolume,
      id: e,
      active: !1,
      volume: 0,
      sample: null
    }, this.addArea(e);
    this.currentAmbiance = null, this.defaultAmbiance = this.ambiances[this.props.defaultAmbiance || "Main"], this.ambiancesArr = Object.values(this.ambiances), this.watchSignal(this.webgl.store.isTransitionActive, this.stopAllAmbiances), this.watchSignalImmediate(this.webgl.quality.current, this.onQualityChange);
  }
  addArea(e) {
    const t = this.scene.getAreas("Ambiance" + e);
    for (let s = 0; s < t.length; s++) {
      const i = t[s],
        n = this.ambiances[e];
      this.broadphase.add({
        ambiance: n,
        x: i.center.x,
        z: i.center.z,
        sqRadius: i.radius * i.radius
      }, {
        position: i.center,
        radius: i.radius,
        debug: 1
      });
    }
  }
  playAmbiance(e) {
    e.sample && e.sample.stop(), this.webgl.audio.unlocked.value && (e.sample = this.webgl.audio.playSound(e.sampleID, {
      loop: !0,
      volume: e.volume,
      fadein: e.fadeIn ?? 1e3,
      fadeout: e.fadeOut ?? 500
    }));
  }
  onQualityChange(e) {
    e < 2 && this.stopAllAmbiances();
  }
  stopAllAmbiances(e) {
    for (let t = 0, s = this.ambiancesArr.length; t < s; t++) {
      const s = this.ambiancesArr[t];
      s.sample && (e ? s.sample.realstop() : s.sample.stop(), s.sample = null);
    }
  }
  onNewAmbianceActive(e) {
    this.updateDelay = 1500, this.currentAmbiance = e;
    for (let t = 0, s = this.ambiancesArr.length; t < s; t++) {
      const e = this.ambiancesArr[t];
      e.active = e === this.currentAmbiance;
    }
  }
  update() {
    if (this.scene.player && !this.scene.player.isBodyReady || this.webgl.store.isTransitionActive.value || this.webgl.quality.current < 2) return;
    const e = this.webgl.time.dt;
    for (let i = 0, n = this.ambiancesArr.length; i < n; i++) {
      const t = this.ambiancesArr[i];
      t.active && !t.sample && this.playAmbiance(t), t.volume = yy(t.volume, t.active ? t.maxVolume : 0, .025, e, .01), t.sample && (t.sample.volume = t.volume, !t.active && t.volume <= 0 && (t.sample.realstop(), t.sample = null));
    }
    if (this.updateDelay -= e, this.updateDelay > 0) return;
    this.updateDelay = 200;
    const t = this.getCurrentArea();
    if (t === this.currentArea) return;
    this.currentArea = t;
    const s = t ? t.ambiance : this.defaultAmbiance;
    s !== this.currentAmbiance && this.onNewAmbianceActive(s);
  }
  getCurrentArea() {
    const e = this.scene.player ? this.scene.player.base.position : this.scene.getCurrentCamera().base.position,
      t = e.x,
      s = e.z;
    if (this.currentArea) {
      const e = this.currentArea,
        i = t - e.x,
        n = s - e.z;
      if (i * i + n * n < e.sqRadius) return e;
    }
    const i = this.broadphase.getCell(e);
    for (let n = 0, a = i.items.length; n < a; n++) {
      const e = i.items[n].element,
        a = t - e.x,
        r = s - e.z;
      if (a * a + r * r < e.sqRadius) return e;
    }
    return null;
  }
  beforeDestroy() {
    this.stopAllAmbiances(!0);
  }
}
const Bz = new WeakMap(),
  Iz = new WeakMap();
function kz(e) {
  Iz.has(e) || Iz.set(e, 0);
  const t = Iz.get(e) - 1;
  Iz.set(e, t), t > 0 || (Iz.set(e, 0), clearTimeout(Bz.get(e)), Bz.set(e, setTimeout(() => e.dispose(), 1e3)));
}
let Dz = {
    geometries: !0,
    materials: !0,
    textures: !0
  },
  Lz = {};
function Oz(e) {
  Lz.geometries && e.geometry && kz(e.geometry), e.material && Lz.materials && kz(e.material);
}
function Rz(e) {
  Lz.geometries && e.geometry && e.geometry.dispose(), e.material && Lz.materials && e.material.dispose();
}
const zz = {
    use: function (e, t) {
      return Iz.has(e) || Iz.set(e, 0), Iz.set(e, Iz.get(e) + 1), clearTimeout(Bz.get(e)), e.use && e.use(t || {}), e;
    },
    unuse: kz,
    unuseAll: function (e, t = {}) {
      Object.assign(Lz, Dz, t), e.traverse(Oz);
    },
    disposeAll: function (e, t = {}) {
      Object.assign(Lz, Dz, t), e.traverse(Rz);
    }
  },
  Nz = new CC({
    color: "red"
  });
class Fz extends ML {
  init() {
    this.raycastables = [], this.intersects = [], this.raycaster = new rL(), this.base = new rC(), this.mesh = new sP(new MP(1.35, .9), Nz), this.mesh.visible = !1, this.mesh.position.y = .7, this.base.add(this.mesh), this.raycastables.push(this.mesh), this.timeToClick = 0;
  }
  updateRaycaster() {
    this.raycasted = !1;
    const e = this.webgl.input.touch.value.normalizePos;
    this.raycaster.setFromCamera(e, this.scene.getCurrentCamera().cam);
    const t = this.raycastables,
      s = this.intersects;
    s.length = 0;
    for (let i = 0, n = t.length; i < n; i++) {
      const e = t[i];
      this.raycaster.intersectObject(e, !1, s);
    }
    if (s.length > 0) {
      const e = s[0].object;
      this.intersected != e && (this.intersected = e, this.onRollIn()), this.intersected.point = s[0].point, this.intersected.move && this.intersected.move.dispatch(this.intersected.point);
    } else this.intersected && this.onRollOut(), this.intersected = !1;
  }
  onRollIn() {
    this.webgl.input.touch.togglePointer(!0);
  }
  onRollOut() {
    this.webgl.input.touch.togglePointer(!1);
  }
  use(e, t) {
    this.enabled = !0, this.base.position.copy(e), this.cb = t;
  }
  update() {
    this.base.rotation.copy(this.scene.getCurrentCamera().cam.rotation), this.enabled ? this.updateRaycaster() : this.intersected = !1, void 0 === this.timeToClick && (this.timeToClick = 0), !this.pressed && this.webgl.input.touch.value.pressed ? (this.pressed = !0, this.timeToClick = 300, this.pressedOnBubble = this.intersected, this.allowClick = !0) : this.pressed && !this.webgl.input.touch.value.pressed && (this.pressed = !1), this.timeToClick <= 0 && (this.allowClick = !1), this.timeToClick -= this.webgl.time.dt, this.timeToClick = Math.max(this.timeToClick, 0), this.intersected ? this.allowClick && !this.pressed && this.pressedOnBubble && this.cb && this.cb() : this.webgl.input.touch.togglePointer(!1), this.enabled = !1, this.cb = null;
  }
}
const Uz = {
  cam: new uP(120, 1, 1, 3e3),
  isCamera: !0,
  base: {
    position: new HA(),
    quaternion: new UA()
  },
  used: () => {},
  unused: () => {}
};
class Hz extends BL {
  constructor(e) {
    super(e);
    const t = this.webgl.store.biomes;
    this.biome = t[e.biome] ?? t.default, this.webgl.app.$store.currentBiome = this.biome, this.id = e.id, this.manifest = this.webgl.resources.manifest.scenes[this.id] || {}, this.resources = this.webgl.resources.scenes[this.id] || {}, this.points = this.resources.points || {}, this.areas = this.resources.areas || {}, this.curves = this.resources.curves || {}, this.transitionMeshes = [];
    const s = this.manifest.bounds;
    this.bbox = new lM(new HA().fromArray(s[0]), new HA().fromArray(s[1])), this.recomputeCenter(), this.hooks = {
      beforePrerender: Po(),
      afterPrerender: Po()
    }, this.frustum = new wP(), this.frustumMat = new OM(), this.sortChunks = this.bind("sortChunks", 2), this.webgl.app.$store.sceneState = 100, this.visitedFlagDone = !1 !== this.props.alreadyVisited, this.alreadyVisited = this.props.alreadyVisited;
  }
  get mixins() {
    return ["reactivity", "debugCamera"];
  }
  async load() {
    this.log("load", this.props.id), await this.initPhysics();
  }
  recomputeCenter() {
    const e = this.bbox.getSize(new HA());
    this.center = this.bbox.getCenter(new HA()), this.radius = Math.max(e.x, e.y, e.z);
  }
  async initPhysics() {
    performance.now();
    const e = this.getCurve("circuit"),
      t = Sz.generateTransferable(e);
    return this.physics = await this.resources.physicsInstancePromise, this.physics.readyPromise = io(), this.physics.isReady = !1, e && this.physics.addCurve("progress", t, 200), Promise.resolve().then(() => {
      if (!this.destroyed && this.physics) return this.physics.run();
    }).then(() => lo(10)).then(() => {
      this.destroyed || (this.physics.isReady = !0, this.onPhysicsReady && this.onPhysicsReady(), this.physics.readyPromise.resolve());
    }), this.unwatchPhysicsIgnoring = hs(() => this.webgl.app.$store.phone.isReady || this.webgl.app.$store.isCustomizeOpen || this.webgl.app.$store.isMenuOpen || this.webgl.app.$store.isFormOpen, e => this.togglePhysics(e), {
      immediate: !0
    }), this.physics.readyPromise;
  }
  togglePhysics(e) {
    e ? this.physics.stop() : this.physics.run();
  }
  updateFrustum() {
    const e = this.getCurrentCamera().cam;
    this.frustumMat.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this.frustum.setFromProjectionMatrix(this.frustumMat);
  }
  markSceneVisited() {
    this.visitedFlagDone = !0;
    const e = "hasVisited" + this.id;
    this.webgl.savestate.getVariable(e) || (this.webgl.savestate.setVariable(e, !0), this.webgl.savestate.incrementVariable("visitedIslandCount"));
  }
  beforeUpdate() {
    this.physics && this.physics.takeOver.active && this.physics.takeOver.callback && this.physics.takeOver.callback(), this.updateFrustum(), this.time += .001 * this.webgl.time.dt, IL.time.value = this.time, !this.visitedFlagDone && this.time > 5 && this.markSceneVisited();
  }
  init() {
    if (this.base.matrixAutoUpdate = !1, this.time = IL.time.value = 0, this.resources.bigShadowData && function (e) {
      if (!e) return;
      const {
          bigShadow: t,
          bigShadowData: s,
          bigShadowMatrix: i,
          bigShadowMap: n
        } = IL.bigShadow,
        a = s.value;
      a.copy(e.shadowSize), t.value.mapSize.copy(e.shadowSize), t.value.bias = a.z = e.shadowBias, t.value.radius = a.w = e.shadowRadius, n.value = e.texture, i.value.copy(e.matrix);
    }(this.resources.bigShadowData), this.resources.base) {
      const e = this.webgl.resources.use(this.resources.base),
        t = fO.use({
          biome: this.biome
        });
      this.resources.textures.terrainSplatting && (t.uniforms.map.value = this.resources.textures.terrainSplatting), this.main = new sP(e, t), this.main.frustumCulled = !1, this.main.receiveShadow = !0, this.main.renderOrder = this.webgl.store.renderOrder.islandBase, this.main.matrixAutoUpdate = !1, this.main.manualMatrixUpdate = !0, this.main.updateMatrixWorld(), this.addObject3D(this.main);
    }
    this.fog = this.base.fog = new rB(), this.fog.near = Math.max(0, 20), this.fog.far = 200, this.chunks = [], this.sortedChunks = [];
    if (this.id !== "IslandWest" || window.__GLORB_STUDIO__) for (let e = 0, t = (this.resources.chunks || []).length; e < t; e++) {
      const t = this.webgl.resources.use(this.resources.chunks[e]),
        s = new sP(t, bO.use({
          biome: this.biome
        })),
        i = this.addObject3D(s);
      this.chunks.push(i), this.sortedChunks.push(i), s.castShadow = !0, s.receiveShadow = !0, s.matrixAutoUpdate = !1, s.manualMatrixUpdate = !0;
    }
    for (let e = 0, t = this.chunks.length; e < t; e++) {
      const t = this.chunks[e].geometry.boundingBox;
      this.bbox.union(t);
    }
    this.recomputeCenter(), this.sky = this.add(YL.use()), this.lights = this.add(OL), this.biome.disableWind || (this.wind = this.add(eO.use())), (this.id !== "IslandWest" || window.__GLORB_STUDIO__) && (this.grass = this.add(uO.use()));
  }
  afterInit() {
    this.initActors(), this.watchSignal(this.webgl.store.chunksCastShadow, e => {
      for (let t = 0, s = this.chunks.length; t < s; t++) this.chunks[t].castShadow = !!e;
    }, this, !0), this.webgl.particles.addTo(this.base), this.raycastableBubble = this.add(new Fz());
  }
  initActors() {
    const e = this.manifest.actors;
    this.actors = {};
    if (this.id === "IslandWest" && !window.__GLORB_STUDIO__) return;
    for (let t in e) {
      const s = e[t],
        i = _z[s.className];
      if (!i) continue;
      const n = Object.assign({}, s.params, {
        transformMatrix: s.transformMatrix,
        type: s.type,
        id: s.uid,
        uid: s.uid,
        sceneID: this.id
      });
      if (s.type === "PartnerStandGround" || s.type === "FintechStandGround" || s.className === "PartnerStandGround" || s.className === "FintechStandGround") continue;
      i.isNPC ? n.npcConfig = s.npcConfig : (n.states = s.states, n.dynamicProps = s.dynamicProps), this.actors[s.uid] = this.add(i, n);
    }
    for (let t in this.actors) this.actors[t].afterActorsInit();
  }
  update() {}
  beforeRender() {
    if (!this.chunks) return;
    if (this.chunks.length > 1 && this.webgl.time.frameNum % 15 == 0) {
      this.__camPos = this.getCurrentCamera().cam.position, this.sortedChunks.sort(this.sortChunks);
      const e = this.webgl.store.renderOrder.islandChunks;
      for (let t = 0, s = this.sortedChunks.length; t < s; t++) this.sortedChunks[t].renderOrder = e + t;
      this.__camPos = null;
    }
  }
  afterRender() {}
  async triggerPrerender() {
    const e = this.webgl.threeRenderer;
    this.prerendering = !0, this.hooks.beforePrerender.emit(), this.webgl.state.prerendering = !0, this.triggerUpdate();
    const t = this.overrideCamera;
    this.overrideCamera = Uz, Uz.cam.position.copy(this.center), Uz.cam.position.y = 600, Uz.cam.lookAt(new HA(0, 0, 0));
    let s = e.getRenderTarget();
    e.setRenderTarget(this.webgl.noopRenderTarget), this.triggerRender(), e.setRenderTarget(s), this.overrideCamera = t, this.hooks.afterPrerender.emit(), this.webgl.state.prerendering = !1, this.prerendering = !1, await oo.promise({
      timeout: 50
    });
  }
  rerenderBigShadow() {}
  getMinDistance(e) {
    const t = this.__camPos,
      s = e.geometry.boundingSphere.center,
      i = e.geometry.boundingBox.min,
      n = e.geometry.boundingBox.min;
    let a = Math.min(ry(t.x, t.z, s.x, s.z), ry(t.x, t.z, i.x, i.z), ry(t.x, t.z, n.x, i.z), ry(t.x, t.z, i.x, n.z), ry(t.x, t.z, n.x, n.z));
    return e.geometry.boundingBox.containsPoint(t) && (a -= 1e7), a;
  }
  sortChunks(e, t) {
    return this.getMinDistance(e) - this.getMinDistance(t);
  }
  getPoint(e, t = !1) {
    return Gz(this.points, e, t);
  }
  getPoints(e) {
    return Vz(this.points, e);
  }
  getCurve(e, t = !1) {
    return Gz(this.curves, e, t);
  }
  getCurves(e) {
    return Vz(this.curves, e);
  }
  getArea(e, t = !1) {
    return Gz(this.areas, e, t);
  }
  getAreas(e) {
    return Vz(this.areas, e);
  }
  beforeDestroy() {
    this.unwatchPhysicsIgnoring && this.unwatchPhysicsIgnoring(), this.physics && this.physics.destroy();
    for (const e in this.resources.textures) this.resources.textures[e] && this.resources.textures[e].dispose();
    for (let e = 0, t = this.transitionMeshes.length; e < t; e++) {
      const t = this.transitionMeshes[e];
      zz.unuseAll(t, {
        geometries: !0,
        material: !1,
        textures: !1
      });
    }
    if (this.transitionMeshes.length = 0, this.webgl.resources.scenes[this.id] = null, this.main && this.main.geometry && this.webgl.resources.unuse(this.main.geometry), this.chunks) for (let e = 0, t = this.chunks.length; e < t; e++) {
      const t = this.chunks[e],
        s = t && t.geometry;
      s && this.webgl.resources.unuse(s);
    }
    this.webgl.particles.removeFromParent();
  }
}
function Gz(e, t, s = !1) {
  if (null != t) {
    if (e[t]) return e[t];
    if (!s) {
      t = t.toLowerCase();
      for (let s in e) if (s.toLowerCase().match(t)) return e[s];
    }
  }
}
function Vz(e, t) {
  const s = [];
  t = t.toLowerCase();
  for (let i in e) i.toLowerCase().match(t) && s.push(e[i]);
  return s;
}
const Wz = WL("uniform sampler2D noise;varying vec2 vUv;varying vec2 vWorld;uniform float time;void main(){float globalNoise=texture2D(noise,vWorld*0.003+vec2(time*0.0034,0.)).r;vec3 color=WATER_TOP_COLOR+0.2;float n=texture2D(noise,vWorld*0.035+vec2(time*0.02,0.)).r;float n2=texture2D(noise,vWorld*0.02-vec2(0.,time*0.013)).r;float lineA=smoothstep(0.48,0.10,abs(sin(vWorld.x*0.035+vWorld.y*0.95+n*1.6+time*0.32)));float lineB=smoothstep(0.52,0.14,abs(sin(vWorld.y*0.03-vWorld.x*0.8+n2*1.3-time*0.21)));float stains=max(lineA,lineB*0.65);color=mix(color,vec3(0.),stains);float alpha=max(mix(0.62,0.95,globalNoise),stains);vec2 foLen=vUv-vec2(0.5);float foDist=1.-dot(foLen,foLen)*5.;alpha*=foDist;\n#if defined(IS_BIOME_TESTLAB)\nfloat d=distance(vUv,vec2(0.5));alpha*=step(d,0.045);\n#endif\ngl_FragColor=vec4(color,alpha);}", "fragmentShader"),
  jz = WL("varying vec2 vUv;varying vec2 vWorld;void main(){vUv=uv;vec4 wp=modelMatrix*vec4(position,1.);vWorld=wp.xz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}", "vertexShader"),
  qz = ZL(class extends cP {
    constructor() {
      super({
        transparent: !0,
        depthWrite: !1,
        opacity: .7
      }), this.userData.forceOpaque = !0, this.uniforms = {
        noise: {
          value: _L.resources.textures.noise
        },
        time: {
          value: 0
        }
      }, this.defines = {
        ...GL()
      }, Wz.use(this), jz.use(this), this.type = "ShaderMaterial", this.isShaderMaterial = !0;
    }
  });
let Zz,
  $z = new HA(),
  Xz = new HA();
class Yz extends ML {
  get mixins() {
    return ["reactivity"];
  }
  init() {
    this.base = new sP(this.webgl.resources.geometries.plane, qz.use({
      biome: this.scene.biome
    })), this.base.renderOrder = this.webgl.store.renderOrder.water, this.base.rotation.x = -Math.PI / 2, this.uProgress = IL.water.waterProgress, this.baseLevel = parseFloat(GL().WATER_BASE_LEVEL), this.base.position.y = this.baseLevel, this.base.manualMatrixUpdate = !0, this.watchSignal(this.webgl.store.waterVisible, e => this.base.visible = e, this, !0);
  }
  attached() {
    this.base.material.biome !== this.scene.biome && (this.base.material = qz.use({
      biome: this.scene.biome
    }));
    const e = this.scene.bbox,
      t = e.getCenter($z),
      s = e.getSize(Xz);
    this.base.position.set(t.x, 0, t.z), this.base.scale.set(s.x + 1e3, s.z + 1e3, 1), this.base.updateMatrixWorld();
  }
  detached() {
    this.removeFromParent();
  }
  update() {
    const e = IL.time.value,
      t = .5 * Math.sin(e) + .5;
    this.uProgress.value = .2 * t, this.base.position.y = this.baseLevel + this.uProgress.value, this.base.material.uniforms.time.value = e, this.base.updateMatrixWorld();
  }
}
Yz.use = () => Zz = Zz || new Yz();
const Jz = new DA();
class Qz extends ML {
  constructor(e) {
    super(e), this.isPlayer = !0;
  }
  init() {
    this.prevGrassPos = new DA();
    const e = {
      tension: .07,
      friction: .055
    };
    this.grassVelX = tc(e), this.grassVelY = tc(e), IL.playerPosition.value.setScalar(-1e4), IL.grass.current.value.set(1e4, 1e4, 0, 0), IL.grass.delayed.value.set(1e4, 1e4), this.firstUpdates = 55, this.base = this.base || new YE(), this.bodyPosition = new HA(), this.bodyRotation = new jM(), this.bodyQuaternion = new UA(), this.isOnFloorDebounced = !0, this.timeNotOnFloor = 0, this.joystick = {
      active: !1,
      lerp: !1,
      center: new HA(),
      direction: new HA(),
      directionTarget: new HA(),
      min: 20,
      max: 50,
      autoForward: !1
    }, this.initialSpawn = new HA(), this.initialRotation = new jM();
    const t = this.scene.props.spawnPoint || "Spawn",
      s = this.scene.getPoint(t);
    s && (this.initialSpawn.copy(s.position), this.initialRotation.setFromQuaternion(s.quaternion, "YXZ"));
    const i = this.initialSpawn.clone(),
      n = this.initialRotation.clone();
    !this.scene.props.spawnPoint && this.loadPlayerPosition && this.loadPlayerPosition(i, n), this.options = {
      spawnPosition: i,
      spawnRotation: n,
      forceLerp: !1,
      radius: .5,
      mass: 1,
      speed: 1,
      bounce: !1,
      drift: !1,
      driftFactor: .01,
      absoluteMove: !0,
      stearingSpeed: 1,
      reverseBackwardStearing: !1,
      alignOnNormal: !1,
      teleportIfOutOfBounds: !1,
      laps: 1
    }, this.cameraOptions = {
      mode: eR.NONE,
      distance: 5.5,
      elevation: 2.5,
      offset: new HA(0, 1, 0),
      slideFactor: .005,
      lerpFactor: .1,
      curveFocus: .5,
      curveLookAhead: .01,
      intersectGround: !1,
      intersectObjects: !1
    }, this.keyboardActive = !1, this.lastPos = new HA(), this.easedSpeed = 0, this.speed = 0, this.easedDir = new HA(), this.canDance = !1, this.canDanceUID = "";
  }
  afterInit() {
    const e = this.scene.physics;
    this.isBodyReady = !1, e.readyPromise.then(() => !this.detroyed && e.setPlayerOptions(this.options)).then(() => !this.detroyed && e.setCameraOptions(this.cameraOptions)).then(() => !this.detroyed && e.respawnPlayer(!0, !0, !0)).then(() => this.isBodyReady = !0);
  }
  setMesh(e) {
    this.base.remove(...this.base.children), this.base.add(e);
  }
  updateOptions(e = {}, t = {}) {
    for (const s in e) void 0 !== this.options[s] && (this.options[s] = e[s]);
    for (const s in t) void 0 !== this.cameraOptions[s] && (this.cameraOptions[s] = t[s]);
    this.scene.physics.setPlayerOptions(this.options), this.scene.physics.setCameraOptions(this.cameraOptions);
  }
  testCanMove() {
    return this.scene.getCurrentCamera().playerCanMove && this.scene.physics.isReady;
  }
  updatePlayerPosUniforms() {
    const e = this.webgl.time.dt,
      t = this.base.position,
      s = this.firstUpdates > 0;
    s && this.firstUpdates--, IL.playerPosition.value.copy(t), _L.store.playerPosition.copy(t);
    const i = IL.grass,
      n = i.current.value,
      a = i.delayed.value,
      r = s ? 1 : .3,
      o = s ? 1 : .09;
    n.x = by(n.x, t.x, r, e), n.y = by(n.y, t.z, r, e), a.x = by(a.x, t.x, o, e), a.y = by(a.y, t.z, o, e), s && this.prevGrassPos.copy(n);
    const l = Jz.copy(n).sub(this.prevGrassPos).multiplyScalar(.45);
    this.prevGrassPos.copy(a), s && (this.grassVelX.setValue(l.x), this.grassVelY.setValue(l.y)), this.grassVelX.setTarget(l.x), this.grassVelY.setTarget(l.y), this.grassVelX.update(e), this.grassVelY.update(e), n.z = this.grassVelX.value, n.w = this.grassVelY.value;
  }
  update() {
    var e;
    const {
      direction: t,
      directionTarget: s,
      lerp: i
    } = this.joystick;
    t.lerp(s, i);
    const n = this.scene.physics;
    if (!this.isBodyReady) return;
    if (n.playerDistanceFromFloor < .1 ? this.timeNotOnFloor = 0 : this.timeNotOnFloor += this.webgl.time.dt, this.isOnFloorDebounced = this.timeNotOnFloor < 1300, n.takeOver.active ? (this.base.position.copy(n.takeOver.player.position), this.base.rotation.copy(n.takeOver.player.rotation), this.base.rotation.y -= Math.PI) : (this.base.position.copy(n.playerPosition), this.base.rotation.copy(n.playerRotation)), n.takeOver.active) {
      if (this.isDancing) {
        const e = this.animation.animationID;
        this.isDancing = !1, "Dancing" === e && this.setIdleAnimation();
      }
    } else {
      const t = null == (e = this.animation) ? void 0 : e.animationID,
        s = this.easedSpeed < 85e-5 && this.canMove && this.canDance;
      s && !this.isDancing && "Idle3" === t ? (this.isDancing = !0, this.playEmote("Dancing", 700)) : !s && this.isDancing && (this.isDancing = !1, "Dancing" === t && this.setIdleAnimation());
    }
    this.bodyPosition.copy(this.base.position), this.bodyRotation.copy(this.base.rotation), this.bodyQuaternion.copy(this.base.quaternion), this.optionsNeedsUpdate && (this.optionsNeedsUpdate = !1, this.updateOptions({
      absoluteMove: !0,
      mass: 1,
      speed: this.OptSpeed || 9.1,
      forceLerp: this.OptForceLerp || !1,
      bounce: !1,
      stearingSpeed: 1,
      stearingDelay: 0,
      reverseBackwardStearing: !1,
      alignOnNormal: !1,
      teleportIfOutOfBounds: !1
    }, {
      mode: eR.FREE,
      tiltOnRotate: 0,
      intersectObjects: !1,
      intersectGround: !0,
      lerpFactor: .4,
      slideFactor: .0025,
      slideOffset: 0,
      elevation: 3.7,
      distance: 9,
      offset: new HA(0, 1.6, 0)
    })), n.takeOver.active || n.playerPosition.y < -15 && this.teleportToPoint("Spawn");
  }
  async teleportToPoint(e) {
    const t = this.scene.getPoint(e || "Spawn");
    t && (this.options.spawnPosition.copy(t.position), this.options.spawnRotation.setFromQuaternion(t.quaternion, "YXZ"), await this.updateOptions(), await this.scene.physics.respawnPlayer(!0, !0, !0));
  }
}
class Kz {
  constructor(e = {}) {
    this.props = e, this.player = this.props.player, this.scene = this.player.scene, this.webgl = this.player.webgl, this.isActive = !1, this.priority = 0, this.physicsSpeed = 9.1, this.physicsLerp = !1, this.actionAnimation = "Action", this.init();
  }
  init() {}
  update() {}
  setActive(e) {
    this.isActive !== e && (this.isActive = e, this.isActive ? this.activated() : this.deactivated());
  }
  activated() {}
  deactivated() {}
  beforeDestroy() {}
  destroy() {
    this.beforeDestroy(), this.player = this.scene = this.webgl = null;
  }
}
const eN = new HA(),
  tN = new HA(),
  sN = new DA();
class iN extends Kz {
  init() {
    this.priority = 3, this.physicsSpeed = 11, this.physicsLerp = .01, this.isFloating = !0, this.floatingInfluence = 0, this.customizeDemult = 0, this.isFirstUpdate = !0, this.sound = null, this.soundRate = 1, this.soundVolume = 0;
  }
  startSound() {
    this.stopSound(), this.webgl.audio.unlocked.value && (this.sound = this.webgl.audio.playSound("sfx_player_jetpack_loop", {
      volume: 0
    }));
  }
  stopSound() {
    this.sound && this.sound.stop(), this.sound = null;
  }
  update() {
    const e = this.webgl,
      t = this.player,
      s = t.mesh,
      i = .001 * e.time.elapsed,
      n = t.base.visible && t.charMesh.opacity > .8;
    if (this.isMainEffect && !this.sound ? this.startSound() : !this.isMainEffect && this.sound && this.stopSound(), this.sound) {
      const e = dy(t.easedSpeed, .1, .15, .45, 1);
      this.soundRate = gy(this.soundRate, e, .07), this.sound.setPlaybackRate(this.soundRate);
      const s = this.webgl.store.isTransitionActive.value ? 0 : 1,
        i = dy(t.easedSpeed, .1, .15, .2, .45);
      this.soundVolume = gy(this.soundVolume, i * s, .1), this.sound.volume = this.soundVolume * t.charMesh.opacity;
    }
    const a = t.jetpackAnim,
      r = this.isFirstUpdate;
    this.isFirstUpdate = !1;
    const o = this.isMainEffect && (!this.player.actionPreset || "Tamtam" !== this.player.actionPreset.id) && !e.store.isOnZipline,
      l = e.store.isOnZipline;
    this.customizeDemult = gy(this.customizeDemult, this.webgl.store.isInCustomize.value ? .4 : 1, r ? 1 : .1), this.floatingInfluence = gy(this.floatingInfluence, o ? 1 : 0, r ? 1 : .1);
    const c = this.isMainEffect && (!t.actionPreset || !t.actionPreset.floatingAnim);
    a.currentWeight = c ? 1 : 0, a.weight = gy(a.weight, l ? 0 : a.currentWeight, r ? 1 : .1);
    a[a.weight < .01 ? "stop" : "play"](), s.rotation.x = hy(2 * t.easedSpeed * this.floatingInfluence + Math.PI / 2, Math.PI / 2, Math.PI / 2 + 1), s.rotation.z = .08 * Math.sin(1.25 * i) * this.floatingInfluence, s.rotation.y = .06 * Math.sin(.84 * i) * this.floatingInfluence, s.position.y = (30 * this.floatingInfluence + 20 * (Math.sin(i) + 1) * this.floatingInfluence) * this.customizeDemult, this.isMainEffect && n && this.updateThrusters();
  }
  updateThrusters() {
    const e = this.webgl,
      t = this.player.mesh,
      s = t.localToWorld(eN.set(20, -40, -110)),
      i = t.localToWorld(tN.set(-21, -40, -110));
    e.particles.emit("burst", {
      amount: By.randomInt(1, 1),
      position: s,
      scale: sN.set(4 + Math.random(), 4 + Math.random()),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2",
      speed: this.player.easedSpeed
    }), e.particles.emit("burst", {
      amount: By.randomInt(1, 1),
      position: i,
      scale: sN.set(4 + Math.random(), 4 + Math.random()),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2",
      speed: this.player.easedSpeed
    }), Math.random() > .7 && (e.particles.emit("burstSmoke", {
      amount: By.randomInt(1, 1),
      position: s,
      scale: sN.set(2 + Math.random(), 2 + Math.random()),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke"
    }), e.particles.emit("burstSmoke", {
      amount: By.randomInt(1, 1),
      position: i,
      scale: sN.set(2 + Math.random(), 2 + Math.random()),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke"
    }));
  }
  beforeDestroy() {
    this.stopSound();
  }
}
const nN = new DA(),
  aN = new HA(),
  rN = new HA();
class oN extends Kz {
  init() {
    this.priority = 2, this.physicsSpeed = 9.45, this.physicsLerp = !1;
  }
  update() {
    if (!this.isMainEffect) return;
    const e = this.player,
      t = e.base.position.y + .03 <= this.scene.water.base.position.y,
      s = e.base.visible && e.charMesh.opacity > .8;
    !t && s && this.updateThrusters();
  }
  updateThrusters() {
    const e = this.webgl,
      t = this.player.mesh,
      s = this.player.easedSpeed,
      i = t.Chara_Low_RigGameSkeletonToes_L.children[0].getWorldPosition(aN),
      n = t.Chara_Low_RigGameSkeletonToes_R.children[0].getWorldPosition(rN);
    e.particles.emit("burstShoes", {
      amount: By.randomInt(3, 5),
      position: i,
      scale: nN.set(10 * s + 2.4, 10 * s + 2.4),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2",
      speed: s
    }), e.particles.emit("burstShoes", {
      amount: By.randomInt(3, 5),
      position: n,
      scale: nN.set(10 * s + 2.4, 10 * s + 2.4),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2",
      speed: s
    });
  }
}
const lN = new DA(),
  cN = new DA(),
  hN = new HA();
class uN extends Kz {
  init() {
    this.priority = 1, this.physicsSpeed = 9.3, this.physicsLerp = !1, this.playerY = 0, this.prevRunTime = 0, this.prevWalkTime = 0, this.lastStep = 0;
  }
  update() {
    const e = this.player,
      t = e.moveAnims,
      s = this.player.mainEffect.isFloating,
      i = this.player.effects.jetpack.isMainEffect;
    if (!(t.Walk.weight > .05 || t.Run.weight > .005)) return;
    this.playerY = e.base.position.y + (s ? .25 : 0);
    const n = this.scene.water.base.position.y,
      a = this.playerY <= n,
      r = this.scene.physics.playerVelocity;
    if (!i && r > .02) {
      const e = t.Run.weight > t.Walk.weight,
        s = this.prevRunTime,
        i = this.prevRunTime = t.Run.time,
        r = this.prevWalkTime,
        o = this.prevWalkTime = t.Walk.time;
      let l, c, h, u;
      if (e ? (l = .35, c = .75, h = s, u = i) : (l = .29, c = .69, h = r, u = o), u > l && h <= l || u > c && h <= c) {
        const e = this.webgl.time.elapsed,
          t = .93 * hy(py(this.player.easedSpeed, .008, .148), 0, 1);
        if (e - this.lastStep > 300 && this.webgl.audio.unlocked.value) {
          if (a) {
            const e = dy(this.playerY - n, -1.5, 0, .85, 1.05);
            this.webgl.audio.playSound("sfx_player_footsteps_water", {
              volume: t,
              playbackRate: e
            });
          } else this.webgl.audio.playSound("sfx_player_footsteps", {
            volume: t
          });
          this.lastStep = e;
        }
      }
    }
    !s && e.easedSpeed > .095 && !a ? this.smokeParticles() : e.easedSpeed > .02 && a && this.waterParticles();
  }
  smokeParticles() {
    if (this.webgl.time.frameNum % 12 != 0) return;
    const e = this.webgl,
      t = this.player.mesh,
      s = hN.set(0, 4, -20);
    t.localToWorld(s), s.x += .5 * Math.random() - .25, s.y += .05 * Math.random() + .02, s.z += .5 * Math.random() - .25;
    const i = 2 * Math.random();
    e.particles.emit("walk", {
      amount: By.randomInt(4, 5),
      position: s,
      scale: lN.set(4 + i, 4 + i),
      duration: 800,
      billboard: !0,
      depthTest: !0,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2"
    });
  }
  waterParticles() {
    if (this.webgl.time.frameNum % 11 != 0) return;
    const e = this.webgl,
      t = this.player,
      s = t.easedSpeed,
      i = this.scene.water.base.position.y,
      n = this.scene.physics.playerVelocity,
      a = Math.abs(this.playerY - i) < .6,
      r = hN.set(0, 0, 0);
    t.base.localToWorld(r), r.y = i, e.particles.emit("waterRipples", {
      amount: 1,
      position: r,
      scale: lN.setScalar(6),
      duration: 1200,
      scaleTo: cN.setScalar(20),
      opacity: 1,
      batcherID: "normal",
      speed: s,
      power: 2.3
    }), n > .05 && a && e.particles.emit("waterConstantSplash", {
      amount: By.randomInt(5, 10),
      position: r,
      scale: lN.set(1.7, 1.9),
      duration: 1500,
      billboard: !0,
      parent: null,
      opacity: .3,
      batcherID: "normal",
      sprite: "smoke2"
    });
  }
}
const dN = ["head", "body", "bottom"];
const pN = new DA(),
  mN = new HA(),
  fN = 0,
  gN = 1,
  vN = 2,
  bN = 3,
  yN = 4,
  _N = new rC();
const xN = new UA(),
  wN = new DA(),
  SN = new DA(),
  AN = new DA(),
  MN = new HA(),
  CN = new HA(),
  PN = function (e) {
    const [t, s] = e[0],
      [i, n] = e[e.length - 1];
    let a = e.length,
      r = null,
      o = 0,
      l = -1;
    return function (c) {
      if (r === c) return o;
      if (r = c, c <= t) return l = 0, o = s;
      if (c >= i) return l = a - 1, o = n;
      for (let t = -1 !== l ? -1 : 0; t < a; t++) {
        let s = -1 === t ? l : t;
        const i = e[s],
          n = e[s + 1];
        if (c >= i[0] && c < n[0]) return l = s, o = uy(c, i[0], n[0], i[1], n[1]);
      }
    };
  }([[.4, .1], [.6, .2], [.85, .3], [1, .35], [1.1, .37], [1.3, .4], [1.5, .45], [1.7, .55], [2, .8], [2.5, .95]]),
  TN = "player_position",
  EN = {
    None: {
      fx: !1,
      anim: !1,
      floatingAnim: !1
    },
    Default: {
      fx: !0,
      anim: "Action",
      floatingAnim: "JetpackAction"
    },
    Tamtam: {
      fx: !1,
      anim: "Action",
      floatingAnim: "Action"
    }
  };
for (let TG in EN) EN[TG].id = TG;
const BN = [function (e) {
  Object.assign(e.prototype, {
    initOutfitAnim: function () {
      this.lastOutfitAnim = 0, this.lastOutfitEmote = 0, this.prevState = {
        color: null,
        head: null,
        body: null,
        bottom: null
      }, this.backOutfitOffset = 0, this.backOutfitActive = !1, this.outfitSpringV = tc({
        initial: 1,
        mass: 1.8,
        tension: .6,
        friction: .32
      }), this.outfitSpringH = tc({
        initial: 1,
        mass: 1.3,
        friction: .19
      }), this.outfitBaseScale = this.base.scale.clone(), this.outfitInactiveDelay = 1e3, this.getOutfitChangeType();
    },
    onOutfitChanged: function () {
      if (!this.isBodyReady) return;
      this.outfitAnimInitialized = !0;
      const e = performance.now(),
        t = this.getOutfitChangeType();
      if (e - this.lastOutfitAnim < 100) return;
      if (this.webgl.store.outfitDebounce > 0) return;
      if (!t) return;
      this.lastOutfitAnim = e, this.backOutfitActive = !1;
      const s = e - this.lastOutfitEmote,
        i = this.webgl.savestate.game.player;
      let n = "noDepth",
        a = 6,
        r = 1,
        o = By.randomInt(10, 14);
      const l = this.scene.getCurrentCamera();
      _N.scale.set(.009, 1, .009), this.mesh.getWorldPosition(_N.position), l && _N.lookAt(l.cam.position);
      _N.rotateX(Math.PI / 2), _N.updateMatrixWorld();
      const c = mN,
        h = pN.setScalar(2);
      switch (t) {
        case gN:
          a = 20, c.set(-5, 1.6, -120), h.setScalar(2.1), r = 1.3, this.outfitSpringV.setValue(.85), this.outfitSpringH.setValue(.8), !this.mainEffect.isFloating && s > 3500 && Math.random() > .4 && (this.lastOutfitEmote = e, this.playEmote("Gain"));
          break;
        case vN:
          a = 10, c.set(-9, 1.4, -172), r = .95, o = By.randomInt(9, 12), this.outfitSpringV.setValue(.95), this.outfitSpringH.setValue(.85);
          break;
        case bN:
          const t = this.webgl.app.$items.body[i.body],
            l = t && t.back;
          a = 15, n = "normal", r = .7, o = By.randomInt(9, 12), l && (this.backOutfitActive = !0), c.set(-9, 1.6, -80), l && (c.x += 40, c.z -= 18), "Body-Wings" === t.id && (c.z -= 5), this.outfitSpringV.setValue(.95), this.outfitSpringH.setValue(.85);
          break;
        case yN:
          a = 8, c.set(0, 1.4, -10), r = .6, o = By.randomInt(8, 11), this.outfitSpringV.setValue(.98), this.outfitSpringH.setValue(.9), !this.mainEffect.isFloating && s > 2500 && Math.random() > .5 && (this.lastOutfitEmote = e, this.playEmote("Gain"));
      }
      this.webgl.particles.emit("linePop", {
        amount: o,
        position: c,
        scale: h,
        billboard: !0,
        parent: _N,
        opacity: .3,
        radius: a,
        batcherID: n,
        speed: 0,
        velocity: r
      });
    },
    getOutfitChangeType: function () {
      const e = this.webgl.savestate.game.player,
        t = this.prevState;
      let s,
        i,
        n,
        a,
        r = 0;
      t.head !== e.head && (s = ++r);
      t.body !== e.body && (i = ++r);
      t.bottom !== e.bottom && (n = ++r);
      t.color !== e.color && (a = ++r);
      for (let o in t) t[o] = e[o];
      if (a || r > 1) return gN;
      if (s) return vN;
      if (i) return bN;
      if (n) return yN;
      return fN;
    },
    updateOutfitSpring: function () {
      const e = this.webgl.time.dt,
        t = this.webgl.store;
      if (t.isInCustomize.value) this.outfitInactiveDelay = 1e3, t.outfitDebounce > 0 && (t.outfitDebounce -= e);else {
        if (this.outfitInactiveDelay < 0) return;
        this.backOutfitActive = !1, this.outfitInactiveDelay -= e;
      }
      this.backOutfitOffset = gy(this.backOutfitOffset, this.backOutfitActive ? -2 : 0, .3), this.base.rotateY(this.backOutfitOffset), this.outfitSpringV.update(e), this.outfitSpringH.update(e);
      const s = this.outfitBaseScale,
        i = this.outfitSpringH.value,
        n = this.outfitSpringV.value;
      this.base.scale.set(s.x * i, s.y * n, s.z * i);
    }
  });
}, function (e) {
  function t(e) {
    const t = this.webgl.app.$items;
    this.mainEffect = this.effects.feet, this.mainEffect._willBeUsed = !0;
    for (let s = 0; s < dN.length; s++) {
      const i = dN[s],
        n = t[i][e[i]];
      if (!n) continue;
      const a = this.effects[n.effect];
      a && (a._willBeUsed = !0, a.priority >= this.mainEffect.priority && (this.mainEffect = a));
    }
    for (let s in this.effects) {
      const e = this.effects[s];
      e.isMainEffect = e === this.mainEffect, e.setActive(e._willBeUsed), e._willBeUsed = null, e.isMainEffect && (this.optionsNeedsUpdate = !0, null != e.physicsSpeed && (this.OptSpeed = e.physicsSpeed), null != e.physicsLerp && (this.OptForceLerp = e.physicsLerp));
    }
  }
  Object.assign(e.prototype, {
    initEffects: function () {
      const e = {
        player: this
      };
      this.effects = {}, this.effects.jetpack = new iN({
        ...e
      }), this.effects.feet = new uN({
        ...e
      }), this.effects.fastShoes = new oN({
        ...e
      }), this.mainEffect = this.effects.feet, this.unwatchSavestate = hs(this.webgl.savestate.game.player, t.bind(this), {
        immediate: !0
      });
    },
    updateEffects: function () {
      for (let e in this.effects) this.effects[e].update();
    },
    destroyEffects: function () {
      this.unwatchSavestate();
      for (let e in this.effects) this.effects[e].destroy();
      this.effects = null;
    }
  });
}];
class IN extends Qz {
  get mixins() {
    return [...(super.mixins || ["timers"]), "character", "characterAnimations"];
  }
  init() {
    super.init(), this.updateOptions({
      absoluteMove: !0,
      mass: 1,
      speed: 9.1,
      bounce: !1,
      stearingSpeed: 1,
      stearingDelay: 0,
      reverseBackwardStearing: !1,
      alignOnNormal: !1,
      teleportIfOutOfBounds: !1
    }, {
      mode: eR.FREE,
      tiltOnRotate: 0,
      intersectObjects: !1,
      intersectGround: !0,
      lerpFactor: .4,
      slideFactor: .0025,
      slideOffset: 0,
      elevation: 3.7,
      distance: 9,
      offset: new HA(0, 1.6, 0)
    }), this.canMove = !1, this.canRun = !0, this.body = {
      position: new HA(),
      rotation: new jM()
    }, this.hasMoved = !1, this.rotateAtState = {
      influence: 0,
      vec: new HA(),
      qt: new UA(),
      tqt: new UA(),
      enabled: !1,
      delay: 1300
    }, this.time = 0, this.lastSavedPositionTime = 0, this.lerpedPosition = new HA(), this.lastSavedPosition = new HA(), this.lastSavedRotation = new jM(), this.initEffects(), this.initOutfitAnim();
  }
  actionStart(e = "Default") {
    const t = EN[e] || EN.Default,
      s = this.mainEffect;
    if (t.anim) {
      let e = t.anim;
      s.isFloating && t.floatingAnim && (e = t.floatingAnim), e && this.setAnimation(e);
    }
    this.actionPreset = t;
  }
  actionDone() {
    this.setIdleAnimation(), this.actionPreset = null;
  }
  testCanMove() {
    const e = this.scene.getCurrentCamera(),
      t = this.webgl.app,
      s = t.$notifs.isOverlayActive.value;
    if (this.webgl.store.frozenPlayerDelay > 0) {
      const e = this.webgl.time.dt;
      return this.webgl.store.frozenPlayerDelay -= e, !1;
    }
    return !this.hidden && !this.scene.physics.takeOver.active && e.playerCanMove && this.isBodyReady && !this.webgl.store.isInCustomize.value && this.scene.physics.isReady && !this.webgl.store.isTransitionActive.value && !s && !t.$store.itemNotification && !t.$store.isOverlayVisible && !t.$store.isApiErrorVisible && this.scene.state >= this.scene.STATES.Tutorial;
  }
  updateImmobile() {
    const e = this.joystick;
    e.active = !1, e.directionTarget.setScalar(0), e.lerp = 1, this.webgl.store.joystickVisible.set(!1);
  }
  updateKeyboard() {
    const e = this.joystick,
      t = this.webgl.input.keyboard.pressedKeys,
      s = t.KeyW || t.ArrowUp,
      i = t.KeyA || t.ArrowLeft,
      n = t.KeyS || t.ArrowDown,
      a = t.KeyD || t.ArrowRight,
      r = SN.set(-i + a, -s + n).normalize();
    e.active = !0, e.directionTarget.set(r.x, 0, r.y), e.lerp = .07, this.webgl.store.joystickVisible.set(!1);
  }
  updateJoystick() {
    const e = this.joystick,
      t = this.webgl.input.touch.value,
      s = SN.copy(t.relativePos),
      i = hy(py(s.length(), e.min, e.max), 0, 1),
      n = s.normalize().multiplyScalar(i);
    e.active = !0, e.directionTarget.set(n.x, 0, n.y), e.lerp = 1, this.webgl.store.joystickVisible.set(!0);
  }
  updateRaycast() {
    const e = this.joystick,
      t = this.webgl.input.touch.value,
      s = this.scene.getCurrentCamera().cam,
      i = this.base.position,
      n = MN.copy(i).project(s);
    !isNaN(n.x) && isFinite(n.x) || (n.x = 0), !isNaN(n.y) && isFinite(n.y) || (n.y = 0);
    const a = t.normalizePos,
      r = this.webgl.viewport,
      o = SN.copy(a).sub(n),
      l = AN.copy(SN).multiplyScalar(.5).multiply(r.size.value),
      c = o.angle(),
      h = gy(90, 130, hy(py(Math.abs(c - 1.5 * Math.PI), 0, .7), 0, 1));
    let u = hy(py(l.length(), 5, h), 0, 1);
    const d = r.ratio.value,
      p = PN(d),
      m = o;
    m.x *= p, m.normalize().multiplyScalar(u), e.active = !0, e.directionTarget.set(m.x, 0, -m.y), e.lerp = .14, this.webgl.store.joystickVisible.set(!1);
  }
  updateControls() {
    const e = this.webgl.input,
      t = this.canMove = this.testCanMove(),
      s = e.keyboard.pressedCount > 0,
      i = e.touch.value.pressed && e.touch.value.useTouch,
      n = e.touch.value.pressed && !i;
    this.hasMoved = t && (s || i || n), this.webgl.app.$store.isMovingWithMouse = !(!t || !n), t ? s ? this.updateKeyboard() : i ? this.updateJoystick() : n ? this.updateRaycast() : this.updateImmobile() : this.updateImmobile();
  }
  update() {
    if (super.update(), !this.isBodyReady) return;
    this.time += this.webgl.time.dt, this.hidden = this.webgl.store.inDialog.value || this.lookingAtPhone;
    const e = this.webgl.time.dt;
    this.hidden && this.charMesh.opacity > 0 ? (this.charMesh.opacity = yy(this.charMesh.opacity, 0, .4, e, .001), this.base.visible = this.charMesh.opacity > .04) : !this.hidden && this.charMesh.opacity < 1 && (this.charMesh.opacity = yy(this.charMesh.opacity, 1, .3, e, .001), this.base.visible = this.charMesh.opacity > .001), this.updateControls(), this.isPlayerReady = !0, this.webgl.store.playerOrientation = this.base.rotation.y;
  }
  updateRotateAt() {
    const e = this.rotateAtState,
      t = this.base,
      s = this.webgl.time.dt;
    this.hasMoved && (e.enabled = !1);
    const i = e.influence;
    if (e.influence = yy(e.influence, e.enabled ? 1 : 0, .13, s, .01), 0 === e.influence) {
      if (e.qt.copy(t.quaternion), 0 === i) return;
    } else e.qt.slerp(e.tqt, .16);
    t.quaternion.slerp(e.qt, e.influence);
  }
  rotateAt(e) {
    const t = this.rotateAtState,
      s = this.base;
    if (t.enabled && e.equals(t.vec)) return;
    t.vec.copy(e);
    const i = MN.set(e.x, s.position.y, e.z);
    xN.copy(s.quaternion), s.lookAt(i), t.tqt.copy(s.quaternion), s.quaternion.copy(xN), t.enabled = !0;
  }
  afterUpdate() {
    const e = this.scene.physics;
    this.isBodyReady && (e.movePlayer(this.joystick.direction), this.hidden || (e.takeOver.active ? (this.body.position.copy(e.takeOver.player.position), this.body.rotation.copy(e.playerRotation)) : (this.body.position.copy(e.playerPosition), this.body.rotation.set(0, e.playerRotation.y, 0))), this.base.position.copy(this.body.position), this.base.rotation.copy(this.body.rotation), this.savePlayerPosition(), this.base.position.y += -.485 + this.shoesOffset, this.base.rotation.y += Math.PI, this.updateRotateAt(), this.updatePlayerPosUniforms(), this.updateOutfitSpring(), this.updateEffects(), this.actionPreset && this.actionPreset.fx && this.updateActionFX());
  }
  updateActionFX() {
    if (this.webgl.time.frameNum % 20 == 0) {
      const e = By.randomFloat(-10, 10),
        t = By.randomFloat(-2, 10),
        s = By.randomFloat(7, 11),
        i = this.mainEffect.isFloating ? -5 : -25,
        n = this.mesh.localToWorld(CN.set(i + e, 90, -170 + t));
      this.webgl.particles.emit("actionSmoke", {
        amount: By.randomInt(1, 5),
        position: n,
        scale: wN.setScalar(s),
        duration: 600,
        billboard: !0,
        depthTest: !0,
        opacity: .3,
        batcherID: "normal",
        sprite: "smoke",
        speed: 0
      });
      const a = 2 * Math.random();
      this.webgl.particles.emit("actionPop", {
        amount: By.randomInt(3, 4),
        position: n,
        scale: wN.set(a + 1, a + 1),
        duration: 800,
        billboard: !0,
        depthTest: !0,
        opacity: .3,
        batcherID: "normal",
        sprite: "smoke2",
        speed: 0
      });
    }
  }
  loadPlayerPosition(e, t) {
    let s = localStorage.getItem(TN);
    if (null == s || !s.length) return;
    if (s = s.split("|"), 7 !== s.length) return;
    if (s[0] !== this.scene.id) return;
    const i = parseFloat(s[1]),
      n = parseFloat(s[2]),
      a = parseFloat(s[3]);
    if (isNaN(i) || isNaN(n) || isNaN(a)) return;
    e.set(i, n + .2, a);
    const r = parseFloat(s[4]),
      o = parseFloat(s[5]),
      l = parseFloat(s[6]);
    isNaN(r) || isNaN(o) || isNaN(l) || t.set(r, o, l);
  }
  savePlayerPosition() {
    if (!this.isBodyReady) return;
    if (window.isNiceWindowReloading) return;
    if (this.scene.physics.takeOver.active) return;
    const e = this.base.position.distanceToSquared(this.lastSavedPosition),
      t = this.time - this.lastSavedPositionTime;
    if (e < 30) return;
    if (t < 1e3) return;
    this.lastSavedPositionTime = this.time;
    const s = this.base.position,
      i = this.base.rotation;
    this.lastSavedPosition.copy(s), this.lastSavedRotation.copy(i), localStorage.setItem(TN, [this.scene.id, s.x, s.y, s.z, i.x, i.y, i.z].join("|"));
  }
  beforeDestroy() {
    this.webgl.app.$store.isMovingWithMouse = !1, this.webgl.store.joystickVisible.set(!1), this.destroyEffects();
  }
}
BN.forEach(e => e(IN));
const kN = WL("precision highp float;uniform mat3 normalMatrix;varying vec2 vUv;varying float vY;varying vec3 vViewPosition;varying vec3 vNormal;varying float vFar;varying float vAlpha;uniform float time;uniform sampler2D noise;\n#include <fog_pars_fragment>\nconst vec3 fogCol=vec3(0.8,1.0,1.0);void main(){vec2 uv=vUv;float isGround=step(vY,GROUND_MAX+0.05);float radius=mix(RAY_RADIUS,GROUND_RADIUS,isGround);vec2 noiseUV=mix(vec2(vUv.x*3.+time*0.1,vY*0.03+time*0.1),vec2(vUv.x+time*0.2,vY*2.0-time*0.7),isGround);vec2 n=texture2D(noise,noiseUV).gb;float ground=0.;ground=smoothstep(GROUND_HEIGHT,0.,vY*1.5);float fade=mix(0.,cos(time*4.)*0.5+0.5,isGround)*0.5;ground=min(1.,smoothstep(0.6,0.7,n.y)+smoothstep(GROUND_MIN+0.3,GROUND_MIN,vY))*smoothstep(GROUND_MAX,GROUND_MAX-0.3,vY);vec3 rimColor=vec3(1.2,1.,0.6);float rimLightPower=0.32;float rimLightStrength=1.0;float rimLight=rimLightPower*abs(dot(vNormal,normalize(vViewPosition)))*rimLightStrength;rimLight=smoothstep(0.1,0.4,rimLight);float ray=0.;ray=(smoothstep(RAY_MIN+RAY_HEIGHT*0.01,RAY_MIN+RAY_HEIGHT*0.2,vY)*smoothstep(RAY_MAX,RAY_MAX-RAY_HEIGHT*0.5,vY)*rimLight*0.7)+(1.*smoothstep(mix(0.3,0.43,vFar),0.,n.x)*14.*smoothstep(RAY_MIN+0.4,RAY_MIN+RAY_HEIGHT*0.1,vY)*smoothstep(RAY_MAX,RAY_MAX-RAY_HEIGHT*0.3,vY));float alpha=mix(ray,ground,isGround)*vAlpha;vec3 color=vec3(1.0,0.875,0.247)*1.2;gl_FragColor=vec4(color,alpha);float fogFactor=smoothstep(fogNear,fogFar,vFogDepth);gl_FragColor.rgb=mix(gl_FragColor.rgb,fogCol,clamp(fogFactor*0.65,0.,1.));}", "fragmentShader"),
  DN = WL("precision highp float;attribute vec3 pos;attribute vec4 qt;attribute vec3 scale;attribute float alpha;varying vec2 vUv;varying float vY;varying vec3 vViewPosition;varying vec3 vNormal;varying float vFar;varying float vAlpha;uniform float time;\n#include <fog_pars_vertex>\n#include <get_instance_matrix>\nvoid main(){mat4 instanceMatrix=getInstanceMatrix(pos,qt,scale);vec3 transformed=position;vUv=uv;vY=transformed.y;vAlpha=alpha;float isRay=step(GROUND_MAX+0.05,vY);vec3 transformedNormal=vec3(normal);mat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;float dist=distance(cameraPosition,pos);vFar=smoothstep(20.,100.,dist);float r=mix(0.,0.2,smoothstep(20.,60.,dist));float r2=mix(-0.3,0.4,vFar);transformed+=((cos(time*-2.+vY*1.)*0.5+0.5)*transformedNormal*r+transformedNormal*r2)*isRay;transformedNormal=normalMatrix*transformedNormal;vNormal=normalize(transformedNormal).rgb;vec4 mvPosition=modelViewMatrix*instanceMatrix*vec4(transformed,1.);vViewPosition=-mvPosition.xyz;\n#include <fog_vertex>\ngl_Position=projectionMatrix*mvPosition;}", "vertexShader");
let LN = new HA(),
  ON = new HA(),
  RN = new UA(),
  zN = new OM();
function NN({
  attributes: e
} = {}) {
  e || (e = ["position", "normal", "uv"]);
  let t = null,
    s = 0;
  const i = [],
    n = new CM(),
    a = new lM(),
    r = {};
  return e.forEach(e => {
    r[e] = {
      length: 0,
      arrays: []
    };
  }), {
    add: function (e, {
      transforms: t,
      matrix: o
    } = {}) {
      o ? (e = e.clone()).applyMatrix4(o) : t && (e = e.clone(), LN.fromArray(t, 0), ON.fromArray(t, 3), RN.fromArray(t, 6), zN.compose(LN, RN, ON), e.applyMatrix4(zN));
      e.boundingSphere && n.union(e.boundingSphere);
      e.boundingBox && a.union(e.boundingBox);
      for (let s in r) {
        const t = e.attributes[s].array,
          i = r[s];
        i.arrays.push(t), i.length += t.length;
      }
      const l = e.index;
      for (let n = 0; n < l.count; ++n) i.push(l.getX(n) + s);
      s += e.attributes.position.count;
    },
    merge: function () {
      if (t) return t;
      if (t = new HC(), r.position) {
        const e = o("position"),
          s = new EC(e, 3, !1);
        t.setAttribute("position", s);
      }
      if (r.normal) {
        const e = o("normal"),
          s = new EC(e, 3, !1);
        t.setAttribute("normal", s);
      }
      if (r.uv) {
        const e = o("uv"),
          s = new EC(e, 2, !1);
        t.setAttribute("uv", s);
      }
      return t.setIndex(i), t.boundingBox = a.clone(), t.boundingSphere = n.clone(), t;
    },
    getPositionLength: function () {
      return r.position.length;
    },
    getIndexLength: function () {
      return i.length;
    }
  };
  function o(e) {
    const t = r[e],
      s = new Float32Array(t.length);
    let i = 0;
    for (let n = 0, a = t.arrays.length; n < a; n++) s.set(t.arrays[n], i), i += t.arrays[n].length;
    return s;
  }
}
const FN = 30,
  UN = .6,
  HN = 3.9,
  GN = .65,
  VN = .15;
let WN = null;
class jN extends cP {
  constructor() {
    super();
    const e = _L.resources.textures;
    this.uniforms = {
      ...lP.merge([PP.fog]),
      time: IL.time,
      ...IL.global,
      noise: {
        value: e.noise
      }
    }, this.defines = {
      ...GL(),
      RAY_MIN: zL(4),
      RAY_MAX: zL(34),
      RAY_HEIGHT: zL(FN),
      RAY_RADIUS: zL(UN),
      GROUND_MIN: zL(VN),
      GROUND_MAX: zL(.8),
      GROUND_HEIGHT: zL(GN),
      GROUND_RADIUS: zL(HN)
    }, kN.use(this), DN.use(this), this.blending = Xx, this.depthTest = !0, this.depthWrite = !1, this.fog = !0, this.transparent = !0, this.type = "ShaderMaterial", this.isShaderMaterial = !0;
  }
}
jN.use = function () {
  return WN = WN || new jN(), WN;
}, jN.unuse = function () {};
const qN = new function () {
    const e = NN();
    let t;
    return t = new RI(1.1, 1, GN, 32, 1, !0), t.scale(-3.9 - .01, 1, 3.89), t.translate(0, .475, 0), e.add(t), t = new RI(1.1, 1, GN, 32, 1, !0), t.scale(HN, 1, HN), t.translate(0, .475, 0), e.add(t), t = new RI(1, 1, FN, 8, 20, !0), t.scale(-.61, 1, .59), t.translate(0, 19, 0), e.add(t), t = new RI(1, 1, FN, 8, 20, !0), t.scale(UN, 1, UN), t.translate(0, 19, 0), e.add(t), t = e.merge(), t;
  }(),
  ZN = new HA(),
  $N = new HA(),
  XN = new UA();
class YN {
  constructor(e, t) {
    this.matrix = t, this.partner = e, this.alpha = 1;
    const s = "hasMet" + k(e.id) + "Ambassador",
      i = k(e.id) + "Main",
      n = _L.savestate.game;
    if (this.updateAlpha([n.vars[s], n.quests[i]]), 0 === this.alpha) return this.dispose();
    this.unwatchVue = hs([() => n.vars[s], () => n.quests[i]], e => this.updateAlpha(e));
  }
  updateAlpha([e, t]) {
    this.alpha = e && t ? 0 : 1;
  }
  dispose() {
    this.unwatchVue && this.unwatchVue(), this.destroyed = !0, this.unwatchVue = null;
  }
}
class JN extends ML {
  init() {
    this.base = new YE(), this.count = 0, this.halos = [];
  }
  addInstancedAttribute(e, t = 1, s) {
    this.buffers || (this.buffers = {});
    const i = this.buffers[e] = new Float32Array(this.count * t),
      n = new HB(i, t, !1);
    s && n.setUsage(s), this.geo.setAttribute(e, n);
  }
  buildGeometry() {
    const e = this.halos;
    if (this.count = e.length, 0 === this.count) return void (this.base.visible = !1);
    const t = this.geo = new FD();
    t.index = qN.index, t.attributes.position = qN.attributes.position, t.attributes.uv = qN.attributes.uv, t.attributes.normal = qN.attributes.normal, this.addInstancedAttribute("pos", 3, mA), this.addInstancedAttribute("qt", 4, mA), this.addInstancedAttribute("scale", 3, mA), this.addInstancedAttribute("alpha", 1, mA);
    const {
      pos: s,
      qt: i,
      scale: n,
      alpha: a
    } = this.buffers;
    for (let o = 0; o < e.length; o++) {
      const t = e[o];
      t.matrix.decompose(ZN, XN, $N), ZN.toArray(s, 3 * o), XN.toArray(i, 4 * o), $N.toArray(n, 3 * o), a[o] = t.smoothAlpha = t.alpha;
    }
    const r = this.mesh = this.addObject3D(new sP(t, jN.use()));
    r.frustumCulled = !1, r.renderOrder = this.webgl.store.renderOrder.partnerHalos, t.needsUpdate = !0;
  }
  attached() {
    this.base.manualMatrixUpdate = !0, this.base.updateMatrixWorld(!0), this.mesh && (this.mesh.manualMatrixUpdate = !0, this.mesh.updateMatrixWorld(!0));
  }
  update() {
    if (!this.base.visible) return;
    const e = this.webgl.time.dt;
    let t = !1;
    for (let s = 0; s < this.halos.length; s++) {
      const i = this.halos[s];
      i.destroyed || i.smoothAlpha === i.alpha || (t = !0, i.smoothAlpha = yy(i.smoothAlpha, i.alpha, .07, e, .004), this.buffers.alpha[s] = i.smoothAlpha, 0 === i.smoothAlpha && i.dispose());
    }
    t && (this.geo.attributes.alpha.needsUpdate = !0);
  }
  addHalo(e, t) {
    const s = new YN(e, t);
    s.destroyed || this.halos.push(s);
  }
}
class QN extends TL {
  constructor(e) {
    super(e), this.isIslandCamera = !0, this.playerCanMove = !0;
  }
  init() {
    this.base = this.cam = new uP(50, window.innerWidth / window.innerHeight), this.grassDummy = this.addObject3D(new rC()), this.baseDummyPos = -30, this.base.rotation.order = "XYZ";
  }
  beforeUpdate() {
    const e = this.scene.physics;
    e.isReady && (e.takeOver.active ? (this.base.position.copy(e.takeOver.camera.position), this.base.rotation.copy(e.takeOver.camera.rotation)) : (this.base.position.copy(e.cameraPosition), this.base.rotation.copy(e.cameraRotation)));
  }
  afterUpdate() {
    this.grassDummy.position.z = this.baseDummyPos * Math.sqrt(this.webgl.store.grass.radius);
  }
  beforeDestroy() {}
}
class KN {
  constructor(e = {}) {
    this.isMixin = !0, this.isCreated = !1, this.isDestroyed = !1, this.options = e, this.base = null, this.webgl = yL();
  }
  created() {}
  used() {}
  unused() {}
  destroyed() {}
  componentAttached() {}
  componentDetached() {}
  use(e) {
    if (this.isDestroyed || this.base === e) return;
    this.base = e;
    const t = e.usedMixins;
    this.uid && e.uid !== this.uid || (this.uid = e.uid, this.isCreated || (this.static = null != this.static ? this.static : !this.update, this.isCreated = !0, this.created(e, this.options)), t.push(this), this.static || t.dynamic.push(this), this.used(e));
  }
  unuse() {
    if (this.isDestroyed || !this.base) return;
    let e;
    this.unused(this.base), e = this.base.usedMixins.indexOf(this), e >= 0 && this.base.usedMixins.splice(e, 1), e = this.base.usedMixins.dynamic.indexOf(this), e >= 0 && this.base.usedMixins.dynamic.splice(e, 1), this.base = null;
  }
  destroy() {
    if (this.isDestroyed) return;
    const e = this.base;
    this.unuse(), this.base = e, this.destroyed(), this.base = null, this.isDestroyed = !0, this.options = null, this.webgl = null;
  }
  extendProto(e, t, s) {
    const i = this.base.constructor.prototype;
    !s && i[e] || (i[e] = t);
  }
}
const eF = Ay();
class tF extends KN {
  created() {
    this.base.shakeState = {
      shaking: !1,
      maxDuration: 0,
      maxAmplitude: 0,
      currentDuration: 0,
      currentAmplitude: 0,
      freqMult: 1,
      value: [0, 0],
      pos: [0, 0],
      speed: [.006, 1e-4]
    }, this.base.shake = iF.bind(this.base), this.base.updateShake = sF.bind(this.base);
  }
}
function sF() {
  const e = this.shakeState;
  if (!e.shaking) return;
  const t = this.webgl.time.dt,
    s = 1 - e.currentDuration / e.maxDuration;
  let i = gy(e.speed[0], e.speed[1], s);
  i *= e.freqMult, e.currentAmplitude = gy(e.maxAmplitude, 0, s), e.pos[0] += t * i, e.pos[1] += t * i, e.value[0] = Math.cos(9 * e.pos[0]) * e.currentAmplitude * .6, e.value[1] = eF(10, e.pos[1]) * e.currentAmplitude;
  const n = .9 * e.value[0],
    a = .3 * e.value[1],
    r = e.vertical ? a : n,
    o = e.vertical ? n : a;
  this.base.translateY(o), this.base.translateX(r), this.base.rotateZ(.5 * o), this.base.rotateY(.5 * r), e.currentDuration = Math.max(0, e.currentDuration - t), 0 === e.currentDuration && (e.maxAmplitude = 0, e.maxDuration = 0, e.shaking = !1);
}
function iF(e = 500, t = .1, s = !1, i = !1, n = 1) {
  const a = this.shakeState;
  t *= 1.07, a.vertical = s, (i || !a.shaking || e > a.maxDuration) && (a.maxDuration = e, a.currentDuration = e), (i || !a.shaking || t > a.maxAmplitude) && (a.maxAmplitude = t, a.currentAmplitude = t, a.freqMult = n), (e || t) && (a.shaking = !0), a.pos[0] = 200 * Math.PI, a.pos[1] = 500 * Math.random();
}
const nF = new UA();
class aF extends KN {
  created() {
    this.base.targetState = {
      posSmooth: new HA(),
      posTarget: new HA(),
      posActive: !1,
      posProgress: 0,
      posEase: .07,
      lookAtSmooth: new UA(),
      lookAtTarget: new HA(),
      lookAtActive: !1,
      lookAtProgress: 0,
      lookAtEase: .07,
      needsInstant: !1
    }, this.base.setTarget = lF.bind(this.base), this.base.updateTarget = rF.bind(this.base), this.base.removeTarget = oF.bind(this.base);
  }
}
function rF() {
  this.webgl.time.dt;
  const e = this.targetState,
    t = e.needsInstant;
  if (e.needsInstant = !1, e.posProgress = vy(e.posProgress, e.posActive ? 1 : 0, e.posEase, 5e-4), e.posProgress > 0) {
    const s = gy(1, e.posEase, e.posProgress);
    e.posSmooth.lerp(e.posTarget, t ? 1 : s), this.base.position.lerp(e.posSmooth, e.posProgress);
  } else e.posSmooth.copy(this.base.position);
  if (e.lookAtProgress = vy(e.lookAtProgress, e.lookAtActive ? 1 : 0, e.lookAtEase, 5e-4), e.lookAtProgress > 0) {
    nF.copy(this.base.quaternion), this.base.lookAt(e.lookAtTarget);
    const s = gy(1, e.lookAtEase, e.lookAtProgress);
    e.lookAtSmooth.slerp(this.base.quaternion, t ? 1 : s), this.base.quaternion.slerpQuaternions(nF, e.lookAtSmooth, e.lookAtProgress);
  } else e.lookAtSmooth.copy(this.base.quaternion);
}
function oF(e = {}) {
  const t = this.targetState;
  e.id && t.currentID !== e.id || (t.currentID = null, t.posActive = t.lookAtActive = !1, e.instant && (t.posProgress = t.lookAtProgress = 0), e.positionEase && (t.posEase = e.positionEase), e.posEase && (t.posEase = e.posEase), e.lookAtEase && (t.lookAtEase = e.lookAtEase), t.currentLockPlayer && this.unlockPlayer(t.currentLockPlayer), this.isAction = !1);
}
function lF(e = {}) {
  const t = this.targetState;
  e.id && (t.currentID = e.id), void 0 !== e.position && (t.posActive = !!e.position, t.posActive && t.posTarget.copy(e.position)), void 0 !== e.lookAt && (t.lookAtActive = !!e.lookAt, t.lookAtActive && t.lookAtTarget.copy(e.lookAt)), e.instant && (t.posProgress = t.posActive ? 1 : 0, t.lookAtProgress = t.lookAtActive ? 1 : 0, t.needsInstant = !0, this.updateTarget()), (e.positionEase || e.posEase) && (t.posEase = e.positionEase || e.posEase), e.lookAtEase && (t.lookAtEase = e.lookAtEase), t.currentLockPlayer && (this.unlockPlayer(t.currentLockPlayer), t.currentLockPlayer = null), e.id && e.lockPlayer && (t.currentLockPlayer = "camTarget_" + e.id, this.lockPlayer(t.currentLockPlayer)), e.id && e.lockPlayer && e.isAction && (this.isAction = !0);
}
const cF = new UA(),
  hF = new HA(),
  uF = new HA();
class dF extends QN {
  constructor(e) {
    super(e), this.isIslandCamera = !0, this.playerCanMove = !0, this.playerCanInteract = !0, this.basePosition = new HA(), this.playerLockStack = new Set(), this.isOnPhone = !1, this.phonePosProgress = 0, this.phoneQtProgress = 0, this.phoneTarget = 0, this.phonePos = new HA(), this.phoneQt = new UA();
  }
  init() {
    super.init(), Promise.resolve().then(() => !this.destroyed && this.updateCameraOptions());
  }
  resize(e) {
    const t = e.x / e.y,
      s = hy(py(t, .45, 1.5), 0, 1);
    this.cam.fov = gy(70, 50, s), this.cam.aspect = t, this.cam.updateProjectionMatrix(), this.updateCameraOptions();
  }
  updateCameraOptions() {
    if (!this.scene.player) return;
    const e = this.scene.player.cameraOptions,
      t = hy(py(this.cam.fov, 70, 50), 0, 1);
    const run = window.__THREE_JS_GAME__?.app?.__survival?.run;
    const survival = this.scene.id === "IslandWest" && run && !["hub", "briefing", "resetting"].includes(run.phase);
    e.distance = survival ? 25 : gy(8, 10.8, t), e.elevation = survival ? 22 : gy(3.85, 4, t), this.scene.physics.setCameraOptions({
      distance: e.distance,
      elevation: e.elevation
    });
  }
  get mixins() {
    return [...(super.mixins || []), tF, aF];
  }
  afterInit() {
    super.afterInit(), Promise.resolve().then(() => {
      this.destroyed || this.webgl.store.phoneVisible.watchImmediate(this.onPhoneVisible, this);
    });
  }
  update() {
    this.basePosition.copy(this.base.position), this.updateTarget(), this.updatePhone(), this.updateShake();
  }
  onPhoneVisible(e) {
    this.webgl.store.onPhone.set(!1), this.isOnPhone = e, this.phoneTarget = e ? 1 : 0;
    if (this.webgl.app.$store.phone.isFullScreen) return this.webgl.store.onPhone.set(e), void (e || (this.scene.player.lookingAtPhone = !1));
    if (this.scene.player.lookingAtPhone = e, e) {
      const e = this.scene.player,
        t = e.base.position,
        s = hF.copy(t).sub(this.base.position).normalize(),
        i = uF.set(-.2 * s.x, 2.2, -.2 * s.z).add(t);
      this.phonePos.copy(i), cF.copy(this.base.quaternion);
      const n = uF.set(1.5 * s.x, -2.2, 1.5 * s.z).add(t);
      this.cam.lookAt(n), this.phoneQt.copy(this.base.quaternion), this.cam.quaternion.copy(cF), e.rotateAt(uF.copy(t).add(s));
    }
  }
  updatePhone() {
    const e = this.webgl.time.dt,
      t = this.phoneTarget;
    this.phonePosProgress = yy(this.phonePosProgress, t, .2, e, .001), this.phoneQtProgress = yy(this.phoneQtProgress, t, .1, e, .001);
    this.webgl.app.$store.phone.isFullScreen || (this.base.position.lerp(this.phonePos, this.phonePosProgress), this.base.quaternion.slerp(this.phoneQt, this.phoneQtProgress), this.webgl.store.onPhone.set(1 === this.phonePosProgress && 1 === this.phoneQtProgress));
  }
  lockPlayer(e) {
    this.playerLockStack.add(e), this.playerLockStack.size > 0 && (this.playerCanMove = !1);
  }
  unlockPlayer(e) {
    this.playerLockStack.delete(e), this.playerLockStack.size <= 0 && (this.playerCanMove = !0);
  }
  beforeDestroy() {
    this.destroying = !0, this.webgl.store.onPhone.set(!1), this.webgl.store.phoneVisible.unwatch(this.onPhoneVisible, this), super.beforeDestroy();
  }
}
const pF = new UA(),
  mF = new HA();
new HA();
let fF = !0,
  gF = 0,
  vF = [1e5, 3e5, 6e5];
const bF = new HA(),
  yF = new HA(),
  _F = new HA();
class xF extends Hz {
  init() {
    super.init(), this.playerCam = this.camera = this.add(dF), this.player = this.add(IN), this.water = this.add(Yz.use()), this.canPausePhysics = !1, this.add(Ez, {
      defaultAmbiance: "Main"
    }), this.partnerHalos = this.add(JN), window.__GLORB_STUDIO__ || (this.grass && this.grass.base && (this.grass.base.visible = !1), this.webgl.store.grass && (this.webgl.store.grass.radius = 0), this.chunks && this.chunks.forEach(e => e.visible = !1)), this.watchSignal(this.webgl.store.isCustomizing, this.onCustomizing), this.initState();
  }
  onPhysicsReady() {
    this.physics.setGravity(70);
  }
  afterInit() {
    super.afterInit(), this.partnerHalos.buildGeometry();
  }
  beforeEnter() {
    this.isEntered = !0;
  }
  afterEnter() {
    this.props.bgm && this.webgl.audio.bgm.play(this.props.bgm);
  }
  onCustomizing(e) {
    if (!e) return void this.playerCam.removeTarget({
      id: "customizing"
    });
    this.playerCam.base.localToWorld(bF.set(-5, 0, 0)), this.player.rotateAt(bF);
    const t = this.player.base.position,
      s = this.playerCam.base.position,
      i = bF.copy(s).sub(t).normalize();
    i.x *= 5.4, i.y = 1.9, i.z *= 5.4;
    const n = yF.copy(t).add(i),
      a = _F.copy(t);
    a.y += 1.15, bF.set(-.2, 0, 0).applyQuaternion(this.playerCam.base.quaternion), a.x += bF.x, a.z += bF.z, this.playerCam.setTarget({
      id: "customizing",
      lockPlayer: !0,
      position: n,
      lookAt: a,
      posEase: .08,
      lookAtEase: .07
    });
  }
  teleportPlayer(e) {
    this.player && this.player.teleportToPoint(e);
  }
  afterUpdate() {
    super.afterUpdate && super.afterUpdate(), this.updateState();
  }
}
xF.isMainIsland = !0, xF.prepare = () => ({
  preloadAssets: []
}), function ({
  prototype: e
}) {
  const t = e;
  t.initState = function () {
    this.isFirstIsland = fF, fF = !1, this.isTutoNeeded = !this.webgl.savestate.getVariable("isTutoCompleted"), this.STATES = this.webgl.app.$store.sceneStates, this.state = 0, this.stateTime = 0, this.prevStateTime = 0, this.setInitialState(), this.lastIdleHintAt = 0, this.prevPlayingTime = -1, this.playingTime = 0, this.introTicks = 0, this.watchSignalImmediate(this.webgl.store.onPhone, () => {
      this.lastIdleHintAt = this.webgl.time.elapsed;
    });
  }, t.setInitialState = function () {
    this.setState("Intro");
  }, t.setState = function (e) {
    this.state = this.STATES[e], this.prevPlayingTime = this.prevStateTime = -1, this.playingTime = this.stateTime = 0, this.webgl.app.$store.sceneState = this.state;
  }, t.stateReached = function (e) {
    return this.stateTime >= e && this.prevStateTime < e;
  }, t.playingTimeReached = function (e) {
    return this.playingTime >= e && this.prevPlayingTime < e;
  }, t.initIntroCam = function () {
    if (!this.isEntered || !this.webgl.store.isPreloaderHidden.value) return;
    const e = this.visitedFlagDone || this.alreadyVisited,
      t = this.isFirstIsland;
    this.introTicks++, this.introCamProgress = 0;
    const s = this.playerCam.base;
    mF.copy(s.position), pF.copy(s.quaternion), this.player.base.updateMatrixWorld(), this.introCamPos = new HA(), this.introCamPos.set(t && !e ? -15 : 0, t ? 15 : 16, t ? 40 : 28).applyQuaternion(this.player.base.quaternion).add(this.player.base.position), s.updateMatrixWorld(), s.position.copy(this.introCamPos), s.rotateZ(t ? .1 : 0), s.rotateX(t ? .3 : .1), this.introCamQt = new UA(), this.introCamQt.copy(s.quaternion), s.position.copy(mF), s.quaternion.copy(pF);
  }, t.updateIntroCam = function () {
    if (this.introTicks < 2 || this.introCamProgress >= 1) return;
    const e = this.playerCam.base;
    this.introCamProgress = gy(this.introCamProgress, 1, this.isFirstIsland ? .025 : .05), this.introCamProgress > .9999 && (this.introCamProgress = 1), e.position.lerp(this.introCamPos, 1 - this.introCamProgress), e.quaternion.slerp(this.introCamQt, 1 - this.introCamProgress);
  }, t.updateIntro = function () {
    if (!this.isEntered || !this.player.isBodyReady) return;
    const e = this.isFirstIsland ? .93 : .9;
    if (this.introTicks < 2) return this.initIntroCam();
    this.introCamProgress >= e && (this.isTutoNeeded ? this.setState("Tutorial") : this.setState("Playing"));
  }, t.updateTutorial = function () {
    const e = this.player;
    if (this.stateReached(5) && (this.tutoDistance || (this.tutoDistance = 0), this.tutoPPos || (this.tutoPPos = e.base.position.clone())), !this.tutoPPos) return;
    const t = this.tutoPPos.distanceTo(e.base.position);
    this.tutoPPos.copy(e.base.position), t < .05 || (this.tutoDistance += t, this.tutoDistance > 12 && (this.webgl.savestate.setVariable("isTutoCompleted", !0), this.setState("Playing")));
  }, t.setFirstHint = function () {
    const e = this.webgl.savestate.game,
      t = this.webgl.app.$notifs;
    this.webgl.app.$quests;
    const s = e.vars.questsCompletedCount,
      i = e.vars.visitedIslandCount,
      n = this.webgl.app.$store.isGuest;
    this.isTutoNeeded || this.isFirstIsland && !n && s > 6 && t.displayHint("enroll");
  }, t.updatePlaying = function () {
    const e = this.webgl.app.$notifs,
      t = this.webgl.app.$quests,
      s = this.webgl.app.$savestate.game;
    if (this.playingTimeReached(1500) ? this.setFirstHint() : 0, this.playingTime > 3e4 && gF < vF.length) {
      const s = this.webgl.time.elapsed,
        i = vF[gF],
        n = t[t.lastQuestID];
      (!n || !n.completed && s - this.lastIdleHintAt > i && s - e.lastNotificationAt > i) && (gF++, this.lastIdleHintAt = s);
    }
  }, t.updateState = function () {
    const e = this.player,
      t = this.webgl.time.dt;
    e.isBodyReady && (this.updateIntroCam(), this.state === this.STATES.Intro ? this.updateIntro() : this.state === this.STATES.Tutorial ? this.updateTutorial() : this.state === this.STATES.Playing && (this.updatePlaying(), this.prevPlayingTime = this.playingTime, this.player.canMove && (this.playingTime += t)), this.prevStateTime = this.stateTime, this.stateTime += t);
  };
}(xF);
const SF = WL("#define PHONG\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <world_pos_pars>\n#include <conditionals>\n#include <linear_step>\n#include <luma>\n#include <blend_modes>\n#include <bg_fog_pars>\n#include <big_shadow_pars>\nuniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;uniform vec4 faceData;uniform vec3 faceColor;uniform float pixelRatio;uniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;uniform float time;varying vec3 vData;uniform float waterProgress;const vec3 waterColor=WATER_COLOR;const vec3 waterTopColor=WATER_TOP_COLOR;varying vec2 vGradient;uniform sampler2D noise;uniform float effectMult;uniform float alpha;uniform float colorId;const vec3 cheeksColor=vec3(0.9,0.1,0.1);void main(){\n#include <depth_dither>\nvec4 diffuseColor=vec4(diffuse,1.);vec2 uv=vUv;float isFace=when_lt(vUv.x,0.7);float isCloth=1.-isFace;float isCustomCloth=isCloth*when_lt(vUv.y,0.375);float isRightEye=when_lt(vUv.y,0.25)*isFace;float isLeftEye=when_lt(vUv.y,0.632-isRightEye)*isFace;float isMouth=when_gt(vUv.y,0.66)*isFace;uv.x+=faceData.x*0.125*isRightEye;uv.y+=-0.38461538*isLeftEye;uv.x+=faceData.y*0.125*isLeftEye;uv.y+=(0.25*step(4.,faceData.z)-0.25)*isMouth;uv.x+=mod(faceData.z,4.)*0.25*isMouth;uv.x+=colorId*0.00390625*isCustomCloth;uv.y+=(isRightEye+isLeftEye)*isFace*faceData.a*0.25;vec3 diffuseTexel=texture2D(map,uv).rgb;if(isCustomCloth>0.5&&colorId>26.5&&colorId<31.5){float pl=dot(diffuseTexel,vec3(0.299,0.587,0.114));vec3 plt;vec3 pdk;if(abs(colorId-27.0)<0.5){plt=vec3(1.0,0.702,0.278);pdk=vec3(1.0,0.337,0.043);}else if(abs(colorId-28.0)<0.5){plt=vec3(0.992,0.424,0.969);pdk=vec3(0.682,0.067,0.992);}else if(abs(colorId-29.0)<0.5){plt=vec3(0.153,0.729,1.0);pdk=vec3(0.027,0.408,1.0);}else if(abs(colorId-30.0)<0.5){plt=vec3(0.769,0.996,0.0);pdk=vec3(0.490,0.882,0.0);}else{plt=vec3(1.0,0.231,0.455);pdk=vec3(1.0,0.169,0.086);}diffuseTexel=mix(pdk,plt,smoothstep(0.30,0.90,pl));}diffuseColor.rgb=diffuseTexel*isCloth+faceColor*isFace-smoothstep(0.35,0.65,diffuseTexel.g)*isFace;\n#include <clouds>\n#include <normal_fragment_begin>\nvec3 rimColor=CHAR_RIM_COLOR;float rimLightPower=1.6;float rimLightStrength=.19;float rightLight=rimLightPower*abs(dot(vNormal,normalize(vViewPosition)));rightLight=1.-smoothstep(.0,1.,rightLight);diffuseColor.rgb+=vec3(rightLight*rimLightStrength)*rimColor;rimLightPower=1.2;rimLightStrength=.29;rightLight=rimLightPower*abs(dot(vNormal,normalize(vViewPosition)));rightLight=1.-smoothstep(.0,1.,rightLight);diffuseColor.rgb+=diffuseColor.rgb*vec3(rightLight*rimLightStrength)*rimColor;vec3 totalEmissiveRadiance=emissive;float specularStrength=1.0;ReflectedLight reflectedLight=ReflectedLight(vec3(.0),vec3(.0),vec3(.0),vec3(.0));\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\nvec3 color=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;if(isFace>0.5){float cheeks=texture2D(map,vUv).r;color=mix(color,color*cheeksColor,cheeks);}gl_FragColor=vec4(color,opacity);\n#include <bg_fog>\n#include <water_depth_frag_pre>\n#include <water_depth_frag>\n}", "fragmentShader"),
  AF = WL("#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#include <world_pos_pars>\n#include <normal_pars_vertex>\n#include <shadowmap_pars_vertex>\nuniform float time;varying vec4 vBigShadowDirectionalCoords;uniform mat4 bigShadowMatrix;void main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <world_pos>\nvec4 worldPosition=vWorldPos;\n#include <envmap_vertex>\n#include <shadowmap_vertex>\nvec3 bigShadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 bigShadowWorldPosition=worldPosition+vec4(bigShadowWorldNormal*0.05,0);vBigShadowDirectionalCoords=bigShadowMatrix*bigShadowWorldPosition;\n#include <fog_vertex>\n}", "vertexShader"),
  MF = ZL(class extends cP {
    constructor() {
      super();
      const e = _L.resources.textures,
        t = this.uniforms = {
          ...lP.merge([PP.common, PP.specularmap, PP.fog, PP.lights]),
          ...IL.water,
          ...IL.bigShadow,
          ...IL.global,
          time: IL.time,
          pixelRatio: IL.pixelRatio,
          noise: {
            value: e.noise
          },
          map: {
            value: e.Character_Texture
          },
          diffuse: {
            value: new AC(16777215)
          },
          emissive: {
            value: new AC(0)
          },
          specular: {
            value: new AC(1118481)
          },
          faceData: {
            value: new nM(0, 0, 0, 0)
          },
          colorId: {
            value: 0
          },
          faceColor: {
            value: new AC()
          },
          shininess: {
            value: 10
          },
          opacity: {
            value: 1
          }
        };
      this.transparent = !0, this.forceOpaque = !0, this.opacity = 1, this.defines = {
        ...GL()
      }, this.map = t.map.value, SF.use(this), AF.use(this), this.lights = !0, this.fog = !0, this.type = "ShaderMaterial", this.isShaderMaterial = !0, this.isCharacterMaterial = !0;
    }
    biomeChanged() {
      const e = _L.resources.textures,
        t = this.map,
        s = e[this.biome.characterTexture];
      t !== s && (this.map = s, this.uniforms.map.value = s, t && t.dispose());
    }
  });
function CF(e) {
  const t = new Map(),
    s = new Map(),
    i = e.clone();
  return PF(e, i, function (e, i) {
    t.set(i, e), s.set(e, i);
  }), i.traverse(function (e) {
    if (!e.isSkinnedMesh) return;
    const i = e,
      n = t.get(e),
      a = n.skeleton.bones;
    i.skeleton = n.skeleton.clone(), i.bindMatrix.copy(n.bindMatrix), i.skeleton.bones = a.map(function (e) {
      return s.get(e);
    }), i.bind(i.skeleton, i.bindMatrix);
  }), i;
}
function PF(e, t, s) {
  s(e, t);
  for (let i = 0; i < e.children.length; i++) PF(e.children[i], t.children[i], s);
}
const TF = new DA();
const BF = new rC(),
  IF = new UA(),
  kF = new HA(),
  DF = new HA(),
  LF = new HA(),
  OF = new HA(),
  RF = new pL();
const HF = new HA();
const VF = new UA(),
  WF = new HA();
const $F = new DA(),
  XF = new HA(),
  YF = new HA(),
  JF = new UA();
const eU = new DA();
const lU = Ay(),
  cU = new DA(),
  hU = new HA(),
  uU = new HA(),
  dU = new UA(),
  pU = Ll(.27, .02, .41, .98),
  mU = Ll(.375, .015, .395, .99);
new HA();
const bU = Ay();
class yU extends ML {
  init() {
    const e = this.webgl.resources.assets.BoatYellow.geometry,
      t = this.scene.getPoint("BoatIntro");
    this.base = new sP(e, bO.use({
      biome: this.scene.biome
    })), this.base.castShadow = !0, this.base.receiveShadow = !0, this.base.frustumCulled = !1, this.base.renderOrder = this.webgl.store.renderOrder.vehicles, this.base.position.copy(t.position), this.base.quaternion.copy(t.quaternion), this.basePos = this.base.position.clone(), this.baseQt = this.base.quaternion.clone(), this.npcPt = this.addObject3D(new rC()), this.npcPt.translateX(.85), this.npcPt.translateY(.92), this.npcPt.translateZ(.03), this.npcPt.rotateY(Math.PI), this.time = 0;
  }
  update() {
    if (!this.scene) return;
    const e = this.webgl.time.dt;
    this.time += e, this.base.position.copy(this.basePos), this.base.quaternion.copy(this.baseQt), this.base.rotateY(.3 * Math.PI), this.base.rotateX(-.02);
    const t = gy(1.1, .3, this.scene.introCam.smoothStarted),
      s = this.scene.water.uProgress.value,
      i = (s - .11) * t,
      n = 1.2 * s;
    this.base.translateY((n - .1) * i);
    const a = .06 * bU(50, 3e-4 * this.time) * .5 * t,
      r = .05 * bU(-120, -2e-4 * this.time) * .5 * t;
    this.base.rotateX(a + .09 * i), this.base.rotateZ(r + .14 * i);
  }
}
const _U = {
  introFrom: {
    position: [-55.296578, 76.942503, -308.65067],
    quaternion: [.01040273, .98944982, .11040314, -.09323084]
  },
  introTo: {
    position: [-23.998405, 39.079015, -144.042971],
    quaternion: [-.02222519, .94912906, .30646747, .06883137]
  },
  descentTo: {
    position: [-31.598772, 1.10131, -91.917094],
    quaternion: [.05590659, -.72178826, .05870771, .68734967]
  },
  startedTo: {
    position: [-26.211491, 2.876771, -91.172516],
    quaternion: [-.05053312, -.84864314, -.08246255, .52004918]
  },
  endTo: {
    position: [-26.092073, 4.979981, -104.410833],
    quaternion: [.0965187, -.61305203, .07581644, .78045065]
  }
};
for (let TG in _U) _U[TG].position = new HA().fromArray(_U[TG].position), _U[TG].quaternion = new UA().fromArray(_U[TG].quaternion);
const xU = Ay(),
  {
    introFrom: wU,
    introTo: SU,
    descentTo: AU,
    startedTo: MU,
    endTo: CU
  } = _U,
  PU = Ll([0, .285, .4, 1]),
  TU = Ll([.42, 0, .58, 1]),
  EU = 2700,
  BU = Ll([.44, .015, .04, 1.005]),
  IU = Ll([.44, .015, .04, 1.005]),
  kU = Ll([.44, .015, .04, 1.005]);
class DU extends TL {
  init() {
    this.base = this.cam = new uP(55, 1), this.base.position.copy(_U.introFrom.position), this.base.quaternion.copy(_U.introFrom.quaternion), this.descentFirst = !0, this.descentPrevPos = new HA(), this.descentVelocity = 0, this.smoothDescent = 0, this.pMouseX = 0, this.pMouseY = 0, this.mouseX = 0, this.mouseY = 0, this.velMouseX = 0, this.smoothZoom = 0, this.time = 0, this.timeStarted = 0, this.smoothStarted = 0, this.smoothStartedQt = 0, this.startedDone = !1, this.endStarted = !1, this.endTime = 0, this.smoothEnd = 0, this.endDone = !1, this.endChoices = null, this.store = this.webgl.store.intro, this.webgl.viewport.ratio.watchImmediate(this.onRatio, this);
  }
  onRatio(e) {
    const t = hy(py(e, .5, 1.2), 0, 1);
    this.cam.fov = gy(65, 55, t), this.cam.updateProjectionMatrix();
  }
  finish(e) {
    this.endChoices = e, this.endTime = 0, this.endDone = !1, this.endStarted = !0, this.smoothEnd = 0;
  }
  resetTimers() {
    this.time = this.descentVelocity = this.timeStarted = this.smoothZoom = this.smoothDescent = this.smoothStarted = this.smoothStartedQt = 0, this.descentFirst = !0;
  }
  updateTraveling() {
    const e = this.base,
      t = e.position,
      s = e.quaternion;
    let i = hy(py(this.time, 0, 6e3), 0, 1);
    i = TU(i), t.lerpVectors(wU.position, SU.position, i), s.slerpQuaternions(wU.quaternion, SU.quaternion, i);
  }
  updateZoom() {
    const e = this.base;
    let t = hy(py(this.time, 0, 4e3), 0, 1);
    e.translateZ(gy(50, 0, PU(t))), e.rotateX(gy(-.23, 0, PU(t))), e.rotateZ(gy(-.12, 0, PU(t)));
  }
  updateDescent() {
    const e = this.webgl.time.stableDt,
      t = this.base,
      s = t.position,
      i = t.quaternion;
    let n = this.time,
      a = hy(py(n, EU, 6900), 0, 1);
    a = BU(a), this.smoothDescent = by(this.smoothDescent, a, .06, e), s.lerpVectors(s, AU.position, this.smoothDescent), i.slerpQuaternions(i, AU.quaternion, this.smoothDescent), this.updateZoom();
    let r = hy(py(n, EU, 3700), 0, 1);
    const o = this.descentFirst ? 0 : -.2 * s.distanceTo(this.descentPrevPos);
    this.descentVelocity = gy(this.descentVelocity, o, (.008 + .018 * this.smoothStarted) * r), t.rotateZ(r * this.descentVelocity), this.descentFirst = !1, this.smoothDescent > .92 && this.store.startJourneyVisible.set(!0), this.smoothDescent > .994 && this.store.descentDone.set(!0);
  }
  updateStarted() {
    if (!this.store.journeyStarted.value) return;
    const e = this.webgl.time.stableDt,
      t = this.base,
      s = t.position,
      i = t.quaternion;
    let n = hy(py(this.timeStarted += e, 0, 2e3), 0, 1);
    n = IU(n), this.smoothStarted = by(this.smoothStarted, n, .09, e), this.smoothStartedQt = by(this.smoothStartedQt, n, .14, e), s.lerp(MU.position, this.smoothStarted), i.slerp(MU.quaternion, this.smoothStartedQt), this.smoothStarted > .96 && !this.startedDone && (this.startedDone = !0, this.scene.startIntroDialog && this.scene.startIntroDialog());
  }
  updateNoise() {
    const e = this.webgl.time.elapsed,
      t = .2 * xU(3, 1e-4 * e),
      s = .2 * xU(-1e3, 14e-5 * e),
      i = .01 * xU(80, 2e-4 * e);
    this.base.translateY(t * (1 - this.smoothStarted)), this.base.translateX(s * (1 - this.smoothStarted)), this.base.rotateZ(i);
  }
  updateMouseHover() {
    const e = this.webgl.input.touch.value;
    if (e.useTouch) return;
    const t = this.webgl.time.stableDt,
      s = e.normalizePos;
    this.mouseX = by(this.mouseX, s.x, .04, t), this.mouseY = by(this.mouseY, s.y, .04, t), this.base.rotateY(.25 * this.mouseX * .15), this.base.translateX(1.4 * this.mouseX * .15), this.base.translateY(.1 * this.mouseY);
    const i = this.mouseX - this.pMouseX;
    this.velMouseX = by(this.velMouseX, .3 * i, .1, t), this.base.rotateZ(this.velMouseX), this.pMouseX = this.mouseX;
  }
  updateEnd() {
    if (!this.endStarted) return;
    const e = this.webgl.time.stableDt,
      t = this.base,
      s = t.position,
      i = t.quaternion;
    let n = hy(py(this.endTime += e, 0, 3500), 0, 1);
    n = kU(n), this.smoothEnd = by(this.smoothEnd, n, .12, e), s.lerp(CU.position, this.smoothEnd), i.slerp(CU.quaternion, this.smoothEnd), this.smoothEnd > .65 && !this.endDone && (this.endDone = !0, function (e, t) {
      const i = {
        partners: [],
        arrivalIsland: t.args ? t.args.scene : "IslandWest",
        arrivalPoint: t.args ? t.args.point : "PortSpawnB"
      };
      _L.app.$savestate.setVariable("isIntroCompleted", !0), _L.app.$savestate.game.interests = [], _L.scenes.teleportTo(i.arrivalIsland, {
        point: i.arrivalPoint,
        transition: "boat"
      });
    }(this.endChoices, this.scene.npcIntro));
  }
  update() {
    const e = this.webgl.time.stableDt;
    this.time += e, this.updateTraveling(), this.updateDescent(), this.updateStarted(), this.descentPrevPos.copy(this.base.position), this.updateNoise(), this.updateMouseHover(), this.updateEnd();
  }
  beforeDestroy() {
    this.webgl.viewport.ratio.unwatch(this.onRatio, this), super.beforeDestroy && super.beforeDestroy();
  }
}
Ay();
class OU extends Hz {
  init() {
    super.init(), this.resetStore(), this.fog.near = 40, this.fog.far = 400, this.water = this.add(Yz.use()), this.introCam = this.camera = this.add(DU), this.logo = null, this.boat = this.add(yU), this.add(Ez, {
      defaultAmbiance: "Beach"
    }), this.watchSignal(this.webgl.store.intro.resetTimers, this.resetTimers);
  }
  afterEnter() {
    this.props.bgm && this.webgl.audio.bgm.play(this.props.bgm);
  }
  resetTimers() {
    this.introCam.resetTimers();
  }
  update() {
    const e = gy(380, 220, this.introCam.smoothDescent),
      t = gy(44, 41, this.introCam.smoothDescent);
    this.fog.far = e, this.fog.near = t, super.update();
  }
  afterUpdate() {
    const e = this.time > 7;
    e !== this.canPausePhysics && (this.canPausePhysics = e, this.physics.togglePause(e));
  }
  resetStore() {
    const e = this.webgl.store.intro;
    e.journeyStarted.set(!1), e.startJourneyVisible.set(!1), e.descentDone.set(!1);
  }
  startIntroDialog() {
    this.webgl.app.$dialogs.startDialog(this.npcIntro, "Intro", {
      onExit: this.onIntroDialogDone.bind(this),
      closable: !0
    });
  }
  onIntroDialogDone(e, t) {
    this.introCam.finish(t);
  }
  beforeDestroy() {
    super.beforeDestroy();
  }
}
OU.prepare = () => ({
  preloadAssets: ["BoatYellow", "DataBeach"]
});
const RU = {
    class: xF,
    savePosition: !0,
    route: "Home",
    biome: "default"
  },
  zU = {
    class: OU,
    route: "Intro",
    biome: "intro"
  },
  FU = {
    IslandWest: {
      ...RU,
      bgm: "music_island_west",
      pageview: {
        title: "GLORB",
        path: "/glorb"
      }
    },
    IslandIntro: {
      ...zU,
      bgm: "music_island_west",
      pageview: {
        title: "glorb - Intro",
        path: "/intro"
      }
    }
  },
  UU = Object.keys(FU).filter(t => t === "IslandIntro" || t === "IslandWest").reduce((e, t) => {
    e[t] = Object.assign({}, FU[t]);
    const s = {
      ...e[t]
    };
    return delete s.class, e[t].props = Object.assign({}, s, {
      id: t
    }), e;
  }, {}),
  HU = {
    Intro: 0,
    Countdown: 1,
    Started: 2,
    Finished: 3,
    Outro: 4,
    Exiting: 5
  };
const GU = [["router", function (e = {}) {
  const t = e.basepath || "/",
    s = e.routes || [];
  e.notFoundComponent ? s.push({
    path: "/:pathMatch(.*)*",
    name: "404",
    component: e.notFoundComponent
  }) : s.push({
    path: "/:pathMatch(.*)*",
    redirect: "/"
  });
  const i = e.historyMode(t),
    n = Kr(Object.assign({
      routes: s,
      history: i
    }, e)),
    a = n.install;
  return n.install = function (e) {
    const t = e.config.globalProperties;
    e.provide("router", n), e.component("NiceRouterView", _o), a.call(this, e), function (e, t) {
      e.component("NiceViewContainer", bo), t.setNiceViewOptions = wo, t.nrv = wo, t.isNiceView = xo;
    }(e, n), t.$router.previousRoute = _t(), t.$previousRoute = null, n.firstRoute = _t(), n.beforeEach((e, t) => {
      n.firstRoute.value = {
        to: e,
        from: t
      };
    }), n.afterEach((e, s, i) => {
      i || (n.firstRoute.value = null, t.$previousRoute = s, t.$router.previousRoute.value = s);
    });
  }, n;
}, {}], ["store", function () {
  let e;
  return {
    install: function (t) {
      const s = {};
      for (const e in Xo) {
        const i = e.split("/").pop().slice(0, -3);
        s[i] = Xo[e].default, "function" == typeof s[i] && (s[i] = s[i](t));
      }
      e = Yo(s.index) ? s.index : {};
      for (const i in s) "index" !== i && Yo(s[i]) && (e[i] = s[i]);
      e = nt(e), t.config.globalProperties.$store = e, t.provide("store", e);
    }
  };
}, {}], ["preloader", function (e = {}) {
  const t = e.preloaderComponent || Qo;
  let s,
    i,
    n,
    a,
    r,
    o,
    l,
    c = !1,
    h = 2,
    u = 0,
    d = !1,
    p = Promise.resolve();
  const m = [],
    f = new Promise(e => o = e);
  let g = null;
  const v = pt(new Promise(e => g = e));
  let b = null;
  const y = nt({
    progress: 0,
    taskCount: 0,
    taskFinished: 0,
    finished: !1,
    hidden: !1,
    hiddenPromise: v,
    destroyed: !1,
    destroyedPromise: pt(new Promise(e => b = e)),
    task: function (e, {
      weight: t = 1,
      graceful: s = !0
    } = {}) {
      return M(t), p.then(() => "function" == typeof e ? e() : e).then(e => (A(t), e)).catch(e => {
        s && A(t);
      });
    },
    createTask: C,
    setMinimumTaskCount: function (e) {
      h = e, y.taskCount = Math.max(h, u);
    },
    beforeExit: function (e) {
      d ? e() : m.push(e);
    }
  });
  return function (e) {
    a = C(), n = e, n.config.globalProperties.$router.beforeEach(w), n.config.globalProperties.$preloader = y, n.provide("preloader", y), i = document.getElementById("preloader"), s = t(n, i), s.init && s.init();
    s.enter && (l = s.enter());
    if (r = os(() => function () {
      const e = y.progress;
      s.onProgress && s.onProgress(e);
      e >= 1 && function () {
        if (d) return;
        d = !0, Promise.resolve().then(() => l).then(() => m.reduce((e, t) => e.then(t), Promise.resolve())).then(() => m.length = 0).then(() => y.finished = !0).then(() => s.exit && s.exit(_)).then(x).catch(e => {
          x();
        });
      }();
    }(y.progress)), n && n.onAfterMount) {
      let e;
      p = new Promise(t => e = t), n.onAfterMount(e);
    }
  };
  function _() {
    y.hidden || y.destroyed || (y.hidden = !0, g(), r && r(), r = null, o());
  }
  function x() {
    y.destroyed || (_(), i.parentNode && i.parentNode.removeChild(i), s.beforeDestroy && s.beforeDestroy(), b(), i = null, s = null, y.destroyed = !0);
  }
  function w(e, t, s) {
    c || (n.config.globalProperties.$router.beforeResolve(S), c = !0), s();
  }
  async function S(e, t, s) {
    a.finish(), await f, s();
  }
  function A(e) {
    y.taskFinished += e;
    const t = y.taskFinished / y.taskCount;
    y.progress = Math.max(0, Math.min(1, Math.max(y.progress, t)));
  }
  function M(e) {
    u += e, y.taskCount = Math.max(h, u);
  }
  function C({
    weight: e = 1
  } = {}) {
    let t = !1;
    return M(e), {
      get finished() {
        return t;
      },
      finish() {
        t || (t = !0, A(e));
      }
    };
  }
}, {}], ["i18n", function () {
  const e = __DATA.project.locales,
    t = e[__DATA.page.locale],
    s = __DATA.page.translations;
  let i = e[0];
  for (let a in t) if (t[a].default) {
    i = t[a];
    break;
  }
  const n = pt({
    locales: e,
    locale: t,
    translations: s,
    defaultLocale: i
  });
  return function (e) {
    e.config.globalProperties.$i18n = n, e.config.globalProperties.$l = Zo;
  };
}, {}], ["device", function (e = {}) {
  const t = {
    install: function (i) {
      i.config.globalProperties.$device = t, i.provide("device", t), function () {
        const s = rl(e.userAgent);
        Object.assign(t, s), function (e) {
          const t = document.documentElement;
          e.hasTouch && t.classList.add("touch");
          for (const s in e.type) e.type[s] && t.classList.add(s.toLowerCase());
          e.browser && e.browser.length > 0 && t.classList.add(e.browser.toLowerCase());
          e.os && e.os.length > 0 && "Unknown" !== e.os && t.classList.add(e.os.toLowerCase());
        }(t);
      }(), i.onBeforeMount(async () => {
        await t.gpuDetectionFinished, s(t.gpu.qualityIndex);
      }), delete t.install;
    },
    updateQuality: s
  };
  return t;
  function s(e) {
    const s = document.documentElement;
    if (!t.gpu) return;
    t.gpu.qualityIndex = e;
    const i = t.gpu.qualities;
    for (const n in i) t.gpu && t.gpu.quality && (t.gpu.quality[i[n]] = n <= e), s.classList.toggle(i[n], e == n);
  }
}, {}], ["viewport", function () {
  const e = co(n, 500, {
    trail: !1
  });
  let t = null;
  const s = nt({
    width: 10,
    height: 10,
    viewportRatio: 1,
    pixelRatio: 1,
    visible: !0
  });
  function i() {
    pl = document.createElement("div"), Object.assign(pl.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "200px",
      height: "10px",
      overflowY: "scroll",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: -1,
      opacity: 0
    }), t = {
      measureScrollbarWidth: function () {
        const e = document.createElement("div");
        Object.assign(pl.style, {
          width: "200px",
          height: "10px",
          overflowY: "scroll"
        }), Object.assign(e.style, {
          width: "100%",
          height: "150%"
        }), pl.appendChild(e), document.body.appendChild(pl);
        const t = parseFloat(getComputedStyle(dl).zoom),
          s = isNaN(t) ? 1 : t,
          i = Math.round((200 - pl.clientWidth) * s);
        return dl.style.setProperty("--scrollbar-width", i + "px"), document.body.removeChild(pl), pl.removeChild(e), Object.assign(pl.style, {
          width: "1px",
          height: "100%",
          overflowY: "hidden"
        }), i;
      },
      measureViewportHeight: function () {
        document.body.appendChild(pl);
        const e = pl.getBoundingClientRect().height;
        return document.body.removeChild(pl), dl.style.setProperty("--inner-height", window.innerHeight + "px"), dl.style.setProperty("--vp-height", e + "px"), e;
      }
    }, t.measureScrollbarWidth(), document.addEventListener("visibilitychange", r, !1), setInterval(a, 5e3), window.addEventListener("resize", () => {
      n(), e();
    }, !1), n(), a(), r();
  }
  function n() {
    s.width = window.innerWidth, s.height = t.measureViewportHeight(), s.viewportRatio = s.width / s.height;
  }
  function a() {
    s.pixelRatio = window.devicePixelRatio || 1;
  }
  function r() {
    s.visible = !document.hidden, n();
  }
  return function (e) {
    e.config.globalProperties.$viewport = s, e.provide("viewport", s), i();
  };
}, {}], ["svgIcons", function () {
  const e = {
    install: function (t) {
      t.config.globalProperties.$svgIcons = e, t.provide("svgIcons", e), delete e.install, t.component("SvgIcon", gl);
    }
  };
  return e;
}, {}], ["webgl", function (e = {}) {
  let t,
    s,
    i = !1,
    n = [];
  const a = new Proxy({}, {
      get: function (e, t) {
        if (r[t]) return r[t];
        return s ? s[t] : void 0;
      }
    }),
    r = {
      onReady: function (e) {
        i ? e(a) : n.push(e);
      },
      get isReady() {
        return i;
      },
      get canvas() {
        return t;
      }
    };
  return r.getElement = function () {
    return t;
  }, function (e) {
    e.provide("webgl", a), e.component("WebGL", VueWebGLComponent);
    const r = e.config.globalProperties;
    r.$webGL = a, r.$webgl = a, t = document.createElement("canvas");
    const o = r.$preloader;
    o && (o.task(async () => {
      const {
        loadWebGL: e
      } = await Cc;
      s = e({
        app: r,
        canvas: t
      }), function () {
        i = !0;
        for (let e = 0; e < n.length; e++) n[e](a);
        n.length = 0;
      }(), await s.init(), await s.preload();
    }, {
      weight: 3
    }), o.beforeExit(async () => {
      await s.start(), await s.prerender();
    }));
  };
}, {}], ["analytics", function offlineAnalyticsPlugin() {
  const callbacks = new Set();
  const analytics = {
    type: "NONE",
    init() {},
    enable() {},
    disable() {},
    pageview() {},
    event() {},
    rawEvent() {},
    beforeEventSend(callback) {
      if (typeof callback !== "function") return function noop() {};
      callbacks.add(callback);
      return function removeCallback() {
        callbacks.delete(callback);
      };
    },
    onEventSent: null
  };
  return function installOfflineAnalytics(app) {
    app.config.globalProperties.$analytics = analytics;
    app.provide("analytics", analytics);
  };
}, {}], ["manifest", function () {
  const e = {
    content: {},
    load: async function () {
      const t = await function (e, t) {
        const s = {},
          i = Object.assign({
            "/blender/Exports/Asset_Algae.glb": Uc,
            "/blender/Exports/Asset_AlgaeGroup.glb": Hc,
            "/blender/Exports/Asset_ArrowSign.glb": Gc,
            "/blender/Exports/Asset_TechCompany03HouseOff.glb": Vc,
            "/blender/Exports/Asset_TechCompany03HouseOn.glb": Wc,
            "/blender/Exports/Asset_CobbleHouseOff.glb": Vc,
            "/blender/Exports/Asset_CobbleHouseOn.glb": Wc,
            "/blender/Exports/Asset_BarChair.glb": jc,
            "/blender/Exports/Asset_BarChairBlue.glb": qc,
            "/blender/Exports/Asset_BarTableA.glb": Zc,
            "/blender/Exports/Asset_BarTableABlue.glb": $c,
            "/blender/Exports/Asset_BarTableB.glb": Xc,
            "/blender/Exports/Asset_BarTableBBlue.glb": Yc,
            "/blender/Exports/Asset_Barrel.glb": Jc,
            "/blender/Exports/Asset_BasementLittle.glb": Qc,
            "/blender/Exports/Asset_BasementMedium.glb": Kc,
            "/blender/Exports/Asset_BeachBall.glb": eh,
            "/blender/Exports/Asset_BeachBar.glb": th,
            "/blender/Exports/Asset_BeachBench.glb": sh,
            "/blender/Exports/Asset_BeachChair.glb": ih,
            "/blender/Exports/Asset_BeachTable.glb": nh,
            "/blender/Exports/Asset_BeachTowel.glb": ah,
            "/blender/Exports/Asset_BeachUmbrella.glb": rh,
            "/blender/Exports/Asset_BeachUmbrellaB.glb": oh,
            "/blender/Exports/Asset_BigBushA.glb": lh,
            "/blender/Exports/Asset_BigBushB.glb": ch,
            "/blender/Exports/Asset_BigBushTropical.glb": hh,
            "/blender/Exports/Asset_BikeA.glb": uh,
            "/blender/Exports/Asset_BikeB.glb": dh,
            "/blender/Exports/Asset_BikeElectric.glb": ph,
            "/blender/Exports/Asset_BikeObstacleA.glb": mh,
            "/blender/Exports/Asset_BikeObstacleB.glb": fh,
            "/blender/Exports/Asset_BikeObstacleC.glb": gh,
            "/blender/Exports/Asset_BikeRaceBorder.glb": vh,
            "/blender/Exports/Asset_BikeRaceBuilding.glb": bh,
            "/blender/Exports/Asset_BikeRaceFinishline.glb": yh,
            "/blender/Exports/Asset_BikeRaceFlag.glb": _h,
            "/blender/Exports/Asset_BikeRaceTrack.glb": xh,
            "/blender/Exports/Asset_BikeRaceTurn.glb": wh,
            "/blender/Exports/Asset_Billboard.glb": Sh,
            "/blender/Exports/Asset_TechCompany04Ribbon.glb": Ah,
            "/blender/Exports/Asset_TechCompany04RibbonOff.glb": Mh,
            "/blender/Exports/Asset_TechCompany04RibbonOn.glb": Ch,
            "/blender/Exports/Asset_Boat.glb": Ph,
            "/blender/Exports/Asset_BoatA.glb": Th,
            "/blender/Exports/Asset_BoatB.glb": Eh,
            "/blender/Exports/Asset_BoatRaceBuilding.glb": Bh,
            "/blender/Exports/Asset_BoatYellow.glb": Ih,
            "/blender/Exports/Asset_Book.glb": kh,
            "/blender/Exports/Asset_BorderRace.glb": Dh,
            "/blender/Exports/Asset_BoxCar.glb": Lh,
            "/blender/Exports/Asset_BridgeLog.glb": Oh,
            "/blender/Exports/Asset_BridgeOff.glb": Rh,
            "/blender/Exports/Asset_BridgeOn.glb": zh,
            "/blender/Exports/Asset_BridgeWoodCurvedA.glb": Nh,
            "/blender/Exports/Asset_BridgeWoodCurvedB.glb": Fh,
            "/blender/Exports/Asset_BridgeWoodFlat.glb": Uh,
            "/blender/Exports/Asset_BuildingA.glb": Hh,
            "/blender/Exports/Asset_BuildingB.glb": Gh,
            "/blender/Exports/Asset_BuildingC.glb": Vh,
            "/blender/Exports/Asset_BuildingD.glb": Wh,
            "/blender/Exports/Asset_BuildingE.glb": jh,
            "/blender/Exports/Asset_BuildingF.glb": qh,
            "/blender/Exports/Asset_BuildingFOff.glb": Zh,
            "/blender/Exports/Asset_BuildingG.glb": $h,
            "/blender/Exports/Asset_Bus.glb": Xh,
            "/blender/Exports/Asset_BushA.glb": Yh,
            "/blender/Exports/Asset_BushB.glb": Jh,
            "/blender/Exports/Asset_BushC.glb": Qh,
            "/blender/Exports/Asset_BushD.glb": Kh,
            "/blender/Exports/Asset_BushHibiscus.glb": eu,
            "/blender/Exports/Asset_BushTropical.glb": tu,
            "/blender/Exports/Asset_CarA.glb": su,
            "/blender/Exports/Asset_CarNeutral.glb": iu,
            "/blender/Exports/Asset_CarRaceBuidling.glb": nu,
            "/blender/Exports/Asset_CarRaceFromShop.glb": au,
            "/blender/Exports/Asset_CarRacePodium.glb": ru,
            "/blender/Exports/Asset_CarRaceTrack.glb": ou,
            "/blender/Exports/Asset_CarRaceWheelA.glb": lu,
            "/blender/Exports/Asset_CarRaceWheelB.glb": cu,
            "/blender/Exports/Asset_Chest.glb": hu,
            "/blender/Exports/Asset_ChestBig.glb": uu,
            "/blender/Exports/Asset_ChestBigOn.glb": du,
            "/blender/Exports/Asset_ChestOn.glb": pu,
            "/blender/Exports/Asset_Circuit.glb": mu,
            "/blender/Exports/Asset_CircuitRace.glb": fu,
            "/blender/Exports/Asset_CloudA.glb": gu,
            "/blender/Exports/Asset_CloudB.glb": vu,
            "/blender/Exports/Asset_CoffeeShop.glb": yu,
            "/blender/Exports/Asset_CoffeeShopOff.glb": _u,
            "/blender/Exports/Asset_CoffeeShopOn.glb": xu,
            "/blender/Exports/Asset_ConcretPillar.glb": wu,
            "/blender/Exports/Asset_Concrete.glb": Su,
            "/blender/Exports/Asset_CoralA.glb": Au,
            "/blender/Exports/Asset_CoralB.glb": Mu,
            "/blender/Exports/Asset_Crate.glb": Cu,
            "/blender/Exports/Asset_Crossing.glb": Pu,
            "/blender/Exports/Asset_Cup.glb": Tu,
            "/blender/Exports/Asset_DirectionBanner.glb": Eu,
            "/blender/Exports/Asset_Fence.glb": Bu,
            "/blender/Exports/Asset_FishingShip.glb": Iu,
            "/blender/Exports/Asset_Flag.glb": ku,
            "/blender/Exports/Asset_FlagOff.glb": Du,
            "/blender/Exports/Asset_FlagOn.glb": Lu,
            "/blender/Exports/Asset_Floater.glb": Ou,
            "/blender/Exports/Asset_FloatingWood.glb": Ru,
            "/blender/Exports/Asset_FlowerA.glb": zu,
            "/blender/Exports/Asset_FlowerB.glb": Nu,
            "/blender/Exports/Asset_FountainZen.glb": Fu,
            "/blender/Exports/Asset_GroundRound.glb": Uu,
            "/blender/Exports/Asset_GrowableTreeLarge.glb": Hu,
            "/blender/Exports/Asset_GrowableTreeSmall.glb": Gu,
            "/blender/Exports/Asset_GuirlandeA.glb": Vu,
            "/blender/Exports/Asset_GuirlandeB.glb": Wu,
            "/blender/Exports/Asset_GuirlandeC.glb": ju,
            "/blender/Exports/Asset_GuirlandeD.glb": qu,
            "/blender/Exports/Asset_Hammock.glb": Zu,
            "/blender/Exports/Asset_Hospital.glb": $u,
            "/blender/Exports/Asset_HouseA.glb": Xu,
            "/blender/Exports/Asset_HouseB.glb": Yu,
            "/blender/Exports/Asset_HouseBlackA.glb": Ju,
            "/blender/Exports/Asset_HouseBlackB.glb": Qu,
            "/blender/Exports/Asset_HouseBlackF.glb": Ku,
            "/blender/Exports/Asset_HouseC.glb": ed,
            "/blender/Exports/Asset_HouseCabinA.glb": td,
            "/blender/Exports/Asset_HouseCabinB.glb": sd,
            "/blender/Exports/Asset_HouseCabinC.glb": id,
            "/blender/Exports/Asset_HouseD.glb": nd,
            "/blender/Exports/Asset_HouseE.glb": ad,
            "/blender/Exports/Asset_HouseF.glb": rd,
            "/blender/Exports/Asset_HouseG.glb": od,
            "/blender/Exports/Asset_InflateableA.glb": ld,
            "/blender/Exports/Asset_InflateableB.glb": cd,
            "/blender/Exports/Asset_InitRace.glb": hd,
            "/blender/Exports/Asset_Jetski.glb": ud,
            "/blender/Exports/Asset_JetskiBuilding.glb": dd,
            "/blender/Exports/Asset_JoystickRaw.glb": pd,
            "/blender/Exports/Asset_Jump.glb": md,
            "/blender/Exports/Asset_Lampost.glb": fd,
            "/blender/Exports/Asset_LightTraffic.glb": gd,
            "/blender/Exports/Asset_MMBalloon.glb": bd,
            "/blender/Exports/Asset_Mailbox.glb": yd,
            "/blender/Exports/Asset_Muscu.glb": _d,
            "/blender/Exports/Asset_Mushrooms.glb": xd,
            "/blender/Exports/Asset_NPCPlaceholder.glb": wd,
            "/blender/Exports/Asset_Nenuphar.glb": Sd,
            "/blender/Exports/Asset_NewHouseA.glb": Ad,
            "/blender/Exports/Asset_NewHouseB.glb": Md,
            "/blender/Exports/Asset_NewHouseC.glb": Cd,
            "/blender/Exports/Asset_NewHouseD.glb": Pd,
            "/blender/Exports/Asset_PalmTree.glb": Td,
            "/blender/Exports/Asset_PalmTreeBlue.glb": Ed,
            "/blender/Exports/Asset_PalmTreePink.glb": Bd,
            "/blender/Exports/Asset_PalmTreeStreet.glb": Id,
            "/blender/Exports/Asset_PalmTreeTallA.glb": kd,
            "/blender/Exports/Asset_PalmTreeTallB.glb": Dd,
            "/blender/Exports/Asset_PalmTreeThick.glb": Ld,
            "/blender/Exports/Asset_PannelA.glb": Od,
            "/blender/Exports/Asset_PannelB.glb": Rd,
            "/blender/Exports/Asset_Pavement.glb": zd,
            "/blender/Exports/Asset_PicnicTable.glb": Nd,
            "/blender/Exports/Asset_Pillar.glb": Fd,
            "/blender/Exports/Asset_PitStop.glb": Ud,
            "/blender/Exports/Asset_Pontoon.glb": Hd,
            "/blender/Exports/Asset_PontoonLittle.glb": Gd,
            "/blender/Exports/Asset_PortFlag.glb": Vd,
            "/blender/Exports/Asset_PoteauA.glb": Wd,
            "/blender/Exports/Asset_PoteauB.glb": jd,
            "/blender/Exports/Asset_PoteauLink.glb": qd,
            "/blender/Exports/Asset_PottedPlantA.glb": Zd,
            "/blender/Exports/Asset_PottedPlantB.glb": $d,
            "/blender/Exports/Asset_RaceBanner.glb": Xd,
            "/blender/Exports/Asset_RaceBikeRaw.glb": Yd,
            "/blender/Exports/Asset_RaceBoat.glb": Jd,
            "/blender/Exports/Asset_RaceBoatRaw.glb": Qd,
            "/blender/Exports/Asset_RaceCar.glb": Kd,
            "/blender/Exports/Asset_RaceCarRaw.glb": ep,
            "/blender/Exports/Asset_RampA.glb": tp,
            "/blender/Exports/Asset_RampB.glb": sp,
            "/blender/Exports/Asset_RampC.glb": ip,
            "/blender/Exports/Asset_RampD.glb": np,
            "/blender/Exports/Asset_ResortBuilding.glb": ap,
            "/blender/Exports/Asset_ResortCascade.glb": rp,
            "/blender/Exports/Asset_ResortContainer.glb": op,
            "/blender/Exports/Asset_ResortDoorBase.glb": lp,
            "/blender/Exports/Asset_ResortDoorClosed.glb": cp,
            "/blender/Exports/Asset_ResortDoorOpen.glb": hp,
            "/blender/Exports/Asset_ResortFountain.glb": up,
            "/blender/Exports/Asset_ResortHotel.glb": dp,
            "/blender/Exports/Asset_ResortOff.glb": pp,
            "/blender/Exports/Asset_ResortOn.glb": mp,
            "/blender/Exports/Asset_Roadblock.glb": fp,
            "/blender/Exports/Asset_RockA.glb": gp,
            "/blender/Exports/Asset_RoundCar.glb": vp,
            "/blender/Exports/Asset_Roundabout.glb": bp,
            "/blender/Exports/Asset_SandCastle.glb": yp,
            "/blender/Exports/Asset_SeaShells.glb": _p,
            "/blender/Exports/Asset_SeaStar.glb": xp,
            "/blender/Exports/Asset_ShipA.glb": wp,
            "/blender/Exports/Asset_ShipAVerB.glb": Sp,
            "/blender/Exports/Asset_ShipB.glb": Ap,
            "/blender/Exports/Asset_ShipC.glb": Mp,
            "/blender/Exports/Asset_ShipOnWheels.glb": Cp,
            "/blender/Exports/Asset_ShopClothes.glb": Pp,
            "/blender/Exports/Asset_ShopCroissant.glb": Tp,
            "/blender/Exports/Asset_ShopForSaleBase.glb": Ep,
            "/blender/Exports/Asset_ShopForSaleDetails.glb": Bp,
            "/blender/Exports/Asset_ShopGlasses.glb": Ip,
            "/blender/Exports/Asset_ShopKite.glb": kp,
            "/blender/Exports/Asset_ShopRamen.glb": Dp,
            "/blender/Exports/Asset_SkateRampC.glb": Lp,
            "/blender/Exports/Asset_Skateboard.glb": Op,
            "/blender/Exports/Asset_SkateparkBowl.glb": Rp,
            "/blender/Exports/Asset_SkateparkOvergrowth.glb": zp,
            "/blender/Exports/Asset_Slide.glb": Np,
            "/blender/Exports/Asset_Slope.glb": Fp,
            "/blender/Exports/Asset_SolidGroundLarge.glb": Up,
            "/blender/Exports/Asset_SolidGroundLong.glb": Hp,
            "/blender/Exports/Asset_SolidGroundRectangle.glb": Gp,
            "/blender/Exports/Asset_SolidGroundRound.glb": Vp,
            "/blender/Exports/Asset_SolidGroundRoundB.glb": Wp,
            "/blender/Exports/Asset_SolidGroundRoundBig.glb": jp,
            "/blender/Exports/Asset_SolidGroundTriangle.glb": qp,
            "/blender/Exports/Asset_SoloSpeaker.glb": Zp,
            "/blender/Exports/Asset_Speakers.glb": $p,
            "/blender/Exports/Asset_SpeakersOn.glb": Xp,
            "/blender/Exports/Asset_SportTowel.glb": Yp,
            "/blender/Exports/Asset_StairsA.glb": Jp,
            "/blender/Exports/Asset_StairsB.glb": Qp,
            "/blender/Exports/Asset_StairsC.glb": Kp,
            "/blender/Exports/Asset_StandA.glb": em,
            "/blender/Exports/Asset_StandTechCompany02.glb": tm,
            "/blender/Exports/Asset_StandTechCompany03.glb": sm,
            "/blender/Exports/Asset_StandB.glb": im,
            "/blender/Exports/Asset_StandTechCompany04.glb": nm,
            "/blender/Exports/Asset_StandTechCompany01.glb": am,
            "/blender/Exports/Asset_StandC.glb": rm,
            "/blender/Exports/Asset_StandCheese.glb": om,
            "/blender/Exports/Asset_StandD.glb": cm,
            "/blender/Exports/Asset_StandFair.glb": hm,
            "/blender/Exports/Asset_StandTechCompany05.glb": um,
            "/blender/Exports/Asset_StandTechCompany10.glb": dm,
            "/blender/Exports/Asset_StandTechCompany13.glb": pm,
            "/blender/Exports/Asset_StandNeutral05.glb": mm,
            "/blender/Exports/Asset_StandTechCompany07.glb": fm,
            "/blender/Exports/Asset_StandTechCompany08.glb": gm,
            "/blender/Exports/Asset_StandTechCompany12.glb": vm,
            "/blender/Exports/Asset_StandTechCompany11.glb": bm,
            "/blender/Exports/Asset_StandTechCompany06.glb": ym,
            "/blender/Exports/Asset_StandTechCompany15.glb": _m,
            "/blender/Exports/Asset_StandTechCompany09.glb": xm,
            "/blender/Exports/Asset_StartLine.glb": wm,
            "/blender/Exports/Asset_StiltHouseA.glb": Sm,
            "/blender/Exports/Asset_StiltHouseB.glb": Am,
            "/blender/Exports/Asset_StiltHouseC.glb": Mm,
            "/blender/Exports/Asset_StiltHouseD.glb": Cm,
            "/blender/Exports/Asset_StiltPath.glb": Pm,
            "/blender/Exports/Asset_StiltPathB.glb": Tm,
            "/blender/Exports/Asset_StiltPathC.glb": Em,
            "/blender/Exports/Asset_StiltPathEnd.glb": Bm,
            "/blender/Exports/Asset_StiltPathNinety.glb": Im,
            "/blender/Exports/Asset_StiltPathNinetyB.glb": km,
            "/blender/Exports/Asset_StiltPathNinetyC.glb": Dm,
            "/blender/Exports/Asset_StiltPathNinetyM.glb": Lm,
            "/blender/Exports/Asset_StiltPathThirty.glb": Om,
            "/blender/Exports/Asset_StiltPathThirtyR.glb": Rm,
            "/blender/Exports/Asset_StiltPillars.glb": zm,
            "/blender/Exports/Asset_StiltPlatform.glb": Nm,
            "/blender/Exports/Asset_StiltPlatformB.glb": Fm,
            "/blender/Exports/Asset_StiltPlatformBig.glb": Um,
            "/blender/Exports/Asset_StiltPlatformC.glb": Hm,
            "/blender/Exports/Asset_StiltStairs.glb": Gm,
            "/blender/Exports/Asset_SurfShop.glb": Vm,
            "/blender/Exports/Asset_Swing.glb": Wm,
            "/blender/Exports/Asset_Tamtam.glb": jm,
            "/blender/Exports/Asset_Taxi.glb": qm,
            "/blender/Exports/Asset_TaxiRaw.glb": Zm,
            "/blender/Exports/Asset_Telescope.glb": $m,
            "/blender/Exports/Asset_TelescopeB.glb": Xm,
            "/blender/Exports/Asset_Terrasse.glb": Ym,
            "/blender/Exports/Asset_ToolCompass.glb": Jm,
            "/blender/Exports/Asset_ToolHammer.glb": Qm,
            "/blender/Exports/Asset_ToolHeadset.glb": Km,
            "/blender/Exports/Asset_ToolLightbulb.glb": ef,
            "/blender/Exports/Asset_ToolScissor.glb": tf,
            "/blender/Exports/Asset_ToolStethoscope.glb": sf,
            "/blender/Exports/Asset_ToolTurntable.glb": nf,
            "/blender/Exports/Asset_ToolVinyle.glb": af,
            "/blender/Exports/Asset_ToolWateringCan.glb": rf,
            "/blender/Exports/Asset_Torch.glb": of,
            "/blender/Exports/Asset_TreeCapsule.glb": lf,
            "/blender/Exports/Asset_TreeCapsuleB.glb": cf,
            "/blender/Exports/Asset_TreeCapsuleC.glb": hf,
            "/blender/Exports/Asset_TreeCapsuleD.glb": uf,
            "/blender/Exports/Asset_TreeCapsuleE.glb": df,
            "/blender/Exports/Asset_TreeCapsuleF.glb": pf,
            "/blender/Exports/Asset_TreeRoundA.glb": mf,
            "/blender/Exports/Asset_TreeRoundB.glb": ff,
            "/blender/Exports/Asset_TreeRoundC.glb": gf,
            "/blender/Exports/Asset_TreeRoundD.glb": vf,
            "/blender/Exports/Asset_TreeRoundE.glb": bf,
            "/blender/Exports/Asset_TreeRoundF.glb": yf,
            "/blender/Exports/Asset_TreeSquareA.glb": _f,
            "/blender/Exports/Asset_TreeSquareB.glb": xf,
            "/blender/Exports/Asset_TreeSquarecC.glb": wf,
            "/blender/Exports/Asset_TreeTriangleA.glb": Sf,
            "/blender/Exports/Asset_TreeTriangleB.glb": Af,
            "/blender/Exports/Asset_TreeTriangleC.glb": Mf,
            "/blender/Exports/Asset_TreeTriangleD.glb": Cf,
            "/blender/Exports/Asset_TreeTriangleE.glb": Pf,
            "/blender/Exports/Asset_Truck.glb": Tf,
            "/blender/Exports/Asset_TruckFood.glb": Ef,
            "/blender/Exports/Asset_Turnstile.glb": Bf,
            "/blender/Exports/Asset_Wall.glb": If,
            "/blender/Exports/Asset_Waterfall.glb": kf,
            "/blender/Exports/Asset_WaterfallParticles.glb": Df,
            "/blender/Exports/Asset_Wilson.glb": Lf,
            "/blender/Exports/Asset_ZipLineStroke.glb": Of,
            "/blender/Exports/Asset_Zipline.glb": Rf,
            "/blender/Exports/Asset_ZiplineBase.glb": zf,
            "/blender/Exports/Asset_ZiplineButtonOff.glb": Nf,
            "/blender/Exports/Asset_ZiplineButtonOn.glb": Ff,
            "/blender/Exports/Asset_shears.glb": Uf,
            "/blender/Exports/Asset_underStand.glb": Hf,
            "/blender/Exports/Assets_Data.png": Gf,
            "/blender/Exports/Assets_Gradients.png": Vf,
            "/blender/Exports/Assets_Gradients_Miamivice.png": Wf,
            "/blender/Exports/Assets_Gradients_Sunfall.png": jf,
            "/blender/Exports/Character_Texture.png": qf,
            "/blender/Exports/Character_Texture_Sunfall.png": Zf,
            "/blender/Exports/Scene_CircuitBike.glb": $f,
            "/blender/Exports/Scene_CircuitBike_GrassSplatting.png": Xf,
            "/blender/Exports/Scene_CircuitBike_TerrainSplatting.png": Yf,
            "/blender/Exports/Scene_CircuitBike_ao.bin": Jf,
            "/blender/Exports/Scene_EasterEgg.glb": og,
            "/blender/Exports/Scene_EasterEgg_GrassSplatting.png": lg,
            "/blender/Exports/Scene_EasterEgg_TerrainSplatting.png": cg,
            "/blender/Exports/Scene_EasterEgg_ao.bin": hg,
            "/blender/Exports/Scene_IslandIntro.glb": yg,
            "/blender/Exports/Scene_IslandIntro_GrassSplatting.png": _g,
            "/blender/Exports/Scene_IslandIntro_TerrainSplatting.png": xg,
            "/blender/Exports/Scene_IslandIntro_ao.bin": wg,
            "/blender/Exports/Scene_IslandIntro_ao_.bin": Sg,
            "/blender/Exports/Scene_IslandWest.glb": Tg,
            "/blender/Exports/Scene_IslandWest_GrassSplatting.png": Eg,
            "/blender/Exports/Scene_IslandWest_TerrainSplatting.png": Bg,
            "/blender/Exports/Scene_IslandWest_ao.bin": Ig,
            "/blender/Exports/Scene_TestLab.glb": kg,
            "/blender/Exports/Scene_TestLab_GrassSplatting.png": Dg,
            "/blender/Exports/Scene_TestLab_TerrainSplatting.png": Lg,
            "/blender/Exports/SplattingPatterns.png": Og,
            "/blender/Exports/SplattingPatterns_Sunfall.png": Rg
          });
        for (const a in i) s[a.split("/").pop()] = i[a];
        const n = Object.assign({
          "/blender/Exports/Scene_CircuitBike.json": Ng,
          "/blender/Exports/Scene_EasterEgg.json": qg,
          "/blender/Exports/Scene_IslandIntro.json": Qg,
          "/blender/Exports/Scene_IslandWest.json": sv,
          "/blender/Exports/Scene_TestLab.json": nv,
          "/blender/Exports/timestamp.json": rv
        });
        for (const a in n) s[a.split("/").pop()] = n[a].default;
        return dv(s);
      }();
      Object.assign(e.content, t);
    }
  };
  return function (t) {
    t.config.globalProperties.$manifest = e, t.provide("manifest", e);
  };
}, {}], ["savestate", function () {
  let e = null,
    t = null;
  const s = {
    log: Mb,
    LS_KEY: "databeach_savestate",
    LS_WINDOWID: "databeach_session_id",
    GAME_REAL_KEY: "saveID",
    isDeadEnd: !1,
    preload: () => mb(s),
    finishLoad: (e = {}) => fb(s, e),
    init: async function (t = {}) {
      await fb(s, t), s.game = nt(s.game), await wb(s, !0, !0), hs(s.game, () => wb(s)), i(() => s.game.coins, "coinsUpdated"), i(s.game.player, "playerUpdated"), i(s.game.items, "itemsUpdated"), i(s.game.quests, "questsUpdated"), i(s.game.actors, "actorsUpdated"), i(s.game.vars, "varsUpdated"), e.config.globalProperties.$game = s.game, e.provide("game", s.game);
    },
    getSaveObject: () => async function (e) {
      const t = {};
      t.savedAt = Date.now(), t.windowID = e.windowID, t.saveToken = e.saveToken;
      const s = e.getRawGameObject();
      return t.game = s, t[e.GAME_REAL_KEY] = await eb.encode(s), t;
    }(s),
    save: e => wb(s, e, !1),
    forceSave: e => wb(s, e),
    reset: () => async function (e) {
      localStorage.removeItem(e.LS_KEY), vb();
    }(s),
    resetSavestate: (e = {}) => async function ({
      skipIntro: e
    } = {}) {
      const t = pb({});
      e && (t.game.vars.isIntroCompleted = !0);
      s.game = nt(t.game), await wb(s, !0, !0), vb();
    }(e),
    resumeSave: e => async function (e, t) {
      e.saveToken = t, xb(e, !0, !0), "Intro" === cv.$route.name && (await lo(100), "Intro" === cv.$route.name && cv.$webgl.store.intro.journeyStarted.set(!0));
    }(s, e),
    auth: e => async function (e, t) {
      e.log("AUTH"), e.log(e, t);
      const s = await cv.$api.auth(t);
      if (s.error) return localStorage.removeItem(e.LS_KEY), void cv.$notifs.setApiNotif("invalidAccessToken");
      s.saveToken && (localStorage.setItem(e.LS_KEY, JSON.stringify({
        saveToken: s.saveToken,
        savedAt: -1,
        game: JSON.stringify({}),
        saveID: ""
      })), cv.$router.push({
        name: "Home"
      }));
    }(s, e),
    clear: () => function (e) {
      e.reset();
    }(s),
    windowID: null,
    get saveToken() {
      return t;
    },
    set saveToken(e) {
      t = e, lv.$store.isGuest = !!(e && e.length > 0);
    },
    game: null,
    getRawGameObject: () => dt(s.game),
    hooks: {}
  };
  for (let n in Ab) s[n] = Ab[n].bind(s, s);
  function i(e, t) {
    const i = s.hooks[t] = Po();
    hs(e, (e, t) => i.emit(e, t));
  }
  return function (t) {
    e = t, e.config.globalProperties.$savestate = s, e.provide("savestate", s);
  };
}, {}], ["api", function offlineApiPlugin() {
  const offlineError = {
    error: "offline",
    status: "offline"
  };
  const api = {
    load: async function loadOfflineSave(token) {
      return token ? {
        ...offlineError
      } : false;
    },
    save: async function saveLocallyOnly() {
      return false;
    },
    enroll: async function disableRemoteEnrollment() {
      return {
        success: false,
        ...offlineError
      };
    },
    auth: async function disableRemoteAuthentication() {
      return {
        ...offlineError
      };
    }
  };
  return function installOfflineApi(app) {
    app.config.globalProperties.$api = api;
    app.provide("api", api);
  };
}, {}], ["partners", function () {
  const e = pt({}),
    t = pt({}),
    s = {
      list: e,
      customPath: t,
      load: n,
      linkQuests: function () {
        for (let e in cv.$quests.list) {
          const t = cv.$quests.list[e];
          if (!t.hasPartner) continue;
          const i = s.list[t.partnerID];
          i && ("Partner" === t.type ? i.quest = t : "Side" === t.type && (i.sideQuest = t));
        }
        for (let e in s.list) {
          const t = s.list[e];
          Object.defineProperty(t, "isQuestCompleted", {
            get: () => t.quest && t.quest.completed,
            enumerable: !0
          });
        }
      },
      getInterests: function () {
        const e = cv.$savestate.game.interests,
          t = [];
        for (let i = 0, n = e.length; i < n; i++) t.push(s.list[e[i]]);
        return t;
      },
      initVariables: function () {
        for (let e in s.list) {
          const t = s.list[e];
          cv.$quests.neededVariables.add("hasMet" + k(t.id) + "Ambassador");
        }
      }
    };
  let i = null;
  async function n() {
    if (i) return i;
    let s;
    i = io(), s || (s = await fetch(Fb + "?v=studio-apply-1788546512831").then(e => e.json()));
    const n = cv.$manifest.content;
    Object.assign(e, s.partners);
    for (let t in e) {
      const s = e[t],
        i = t.toLowerCase();
      let a;
      Object.defineProperty(s, "tpCoords", {
        get: () => {
          if (void 0 !== a) return a;
          for (let e in n.scenes) {
            if (!e.startsWith("Island")) continue;
            const t = n.scenes[e];
            for (let s in t.points) {
              if (!s.startsWith("PartnerSpawn")) continue;
              if (s.slice(12).toLowerCase().startsWith(i)) return a = {
                island: e,
                point: s
              }, a;
            }
          }
          return a = null, null;
        },
        enumerable: !0
      }), Object.defineProperty(s, "isInterest", {
        get: () => cv.$savestate.game.interests.includes(t),
        enumerable: !0
      });
    }
    Object.assign(t, s.customPath), i.resolve();
  }
  return function (e) {
    const t = e.config.globalProperties;
    e.provide("partners", s), t.$partners = s, t.$preloader.task(n);
  };
}, {}], ["characters", function () {
  const e = pt({}),
    t = pt({});
  let s = null;
  const i = {
    load: n,
    colors: e,
    npcs: t
  };
  async function n() {
    if (s) return s;
    let i;
    s = io(), i || (i = await fetch(Ub + "?v=studio-apply-1788546512831").then(e => e.json())), Object.assign(e, i.colors), Object.assign(t, i.npcs), s.resolve();
  }
  return function (e) {
    const t = e.config.globalProperties;
    e.provide("characters", i), t.$characters = i, t.$preloader.task(n);
  };
}, {}], ["dialogs", function () {
  const e = {},
    t = at({});
  let s = 0,
    i = {},
    n = null,
    a = null;
  const r = {
    list: e,
    get: o,
    startDialog: function (e = {}, s, n = {}) {
      c(!0);
      const a = "object" == typeof s ? s.__id__ : s,
        r = o(a);
      if (!r) return;
      if (i = {}, t.id = a, t.speaker = e, t.dialog = r, t.opts = n, n.onStart) {
        const e = {
          ...dt(t)
        };
        n.onStart(e);
      }
      u(r[r.__first__]);
    },
    changeNode: u,
    nextNode: async function (e) {
      const s = t.node;
      if (!s || s === n) return;
      n = s, await d(s.next || h, e, !0, !1);
    },
    makeChoice: async function (e) {
      const s = t.node;
      i[s.id] = e.id;
      const n = [e.id, i];
      d(e.next || h, n, !0, !1);
    },
    goToNode: async function (e, s) {
      if (!t.dialog) return;
      u(t.dialog[e], s);
    },
    exitDialog: c,
    execActions: d,
    isFirstNode: function () {
      const e = t.dialog;
      return !(!t.dialog || !t.node) && e[e.__first__].id === t.node.id;
    },
    current: t
  };
  function o(t) {
    return e[t] || e.dev_missing || null;
  }
  async function l() {
    if (a) return a;
    let t;
    a = io(), t || (t = await fetch(Gb + "?v=studio-apply-1788546512831").then(e => e.json()));
    for (let e in t) {
      const s = t[e],
        i = s.__first__;
      Object.defineProperty(s, "__first__", {
        value: i,
        writable: !1,
        enumerable: !1
      }), Object.defineProperty(s, "__id__", {
        value: e,
        writable: !1,
        enumerable: !1
      });
      for (let e in s) {
        const t = s[e];
        if (t.isSpeak && t.bubbles) for (let i = 0, n = t.bubbles.length; i < n; i++) {
          const a = 0 === i,
            r = i === n - 1,
            o = a ? e : e + "_" + i,
            l = e + "_" + (i + 1),
            c = {
              isSpeak: !0,
              bubble: t.bubbles[i],
              id: o
            };
          s[o] = c, t.before && a && (c.before = t.before), t.next && r ? c.next = t.next : r || (c.next = [{
            action: "GOTO",
            node: l
          }]);
        }
      }
    }
    Object.assign(e, t), a.resolve();
  }
  function c(e = !1) {
    if (!t.dialog) return;
    s++;
    const n = t.opts,
      a = {
        ...dt(t)
      };
    e && n.onCancel ? n.onCancel(a, i) : !e && n.onDone && n.onDone(a, i), n.onExit && n.onExit(a, i);
    for (let s in t) t[s] = null;
    i = {}, cv.$store.isDialogVisible = !1, cv.$store.isDialogLoading = !1;
  }
  const h = [{
    action: "END"
  }];
  async function u(e, s) {
    !e && t.dialog && c(), cv.$store.isDialogVisible = !!e;
    if ((await d(e.before, s, !0, !0)) || !t.dialog) return;
    t.node = {
      ...e
    };
    const i = t.speaker ? t.speaker.uid : "";
    t.node.fullID = i + "_" + e.id;
  }
  async function d(e, i, n, a) {
    const r = s = s + 1 | 0,
      o = t.dialog,
      l = t.speaker;
    if (n && (t.node = null), e) for (let t = 0, h = e.length; t < h; t++) {
      if (r !== s) return !0;
      const n = e[t];
      if (!a && "END" === n.action) {
        c(!1);
        break;
      }
      if (!a && "GOTO" === n.action) {
        const e = "string" == typeof n.node ? o[n.node] : n.node;
        e ? u(e, i) : c(!1);
        break;
      }
      {
        if (!l) break;
        const e = l.dialogMethods[n.action];
        Hb("next speaker method", n.action);
        const t = [...n.opts];
        null != i && t.push(i), e && (await e(...t));
      }
    }
    return !1;
  }
  return function (e) {
    const t = e.config.globalProperties;
    e.provide("dialogs", r), t.$dialogs = r, t.$preloader.task(l), hs([() => t.$route, () => t.$store.isTransitionActive], () => {
      c(!0);
    });
  };
}, {}], ["items", function () {
  let e = null;
  const t = pt({}),
    s = pt({}),
    i = pt({}),
    n = pt({}),
    a = {
      load: r,
      claim: o,
      unlock: function (e) {
        o(e);
      },
      buy: function (e) {
        const t = cv.$items.all[e];
        if (!t) return;
        if (cv.$savestate.game.items.includes(e)) return;
        const s = t.price;
        if (cv.$savestate.game.dataPoints < s) return;
        t.unlock(), cv.$savestate.game.dataPoints -= s;
      },
      all: t,
      headDefault: null,
      bodyDefault: null,
      bottomDefault: null,
      head: s,
      body: i,
      bottom: n
    };
  async function r() {
    if (e) return e;
    let s;
    e = io(), s || (s = await fetch(Vb + "?v=studio-apply-1788546512831").then(e => e.json())), Object.assign(t, s);
    for (let e in t) {
      const s = t[e],
        i = s.type.toLowerCase();
      a[i] && (a[i][e] = s, 0 !== s.price || a[i + "Default"] || (a[i + "Default"] = e), s.hasEffect = !!s.effect, s.unlock = () => {
        cv.$savestate.game.items.includes(s.id) || cv.$savestate.game.items.push(s.id);
      }, Object.defineProperty(s, "isClaimed", {
        get: () => cv.$savestate.game.items.includes(e),
        enumerable: !1
      }));
    }
    e.resolve();
  }
  function o(e) {
    const t = cv.$items.all[e];
    t && t.unlock();
  }
  return function (e) {
    const t = e.config.globalProperties;
    e.provide("items", a), t.$items = a, t.$preloader.task(r);
  };
}, {}], ["quests", function () {
  const e = new Set([...Ly]),
    t = {},
    s = {
      rawList: pt({}),
      list: nt({}),
      getFromItem: function (e = "") {
        return t[e.toLowerCase()];
      },
      neededVariables: e,
      load: n,
      init: function () {
        for (let e in s.rawList) {
          const i = cv.$savestate.game,
            n = s.rawList[e];
          s.rawList[e].completed = !!i.quests[e];
          const a = s[e] = s.list[e] = Dy(n);
          if (n.item) {
            const e = n.item.toLowerCase();
            a.item = {
              id: e,
              image: e,
              variable: "has" + n.item
            };
            const s = t[e] = a;
            a.itemData = s;
          }
        }
      },
      lastQuestID: "SupermainQuest12"
    };
  let i = null;
  async function n() {
    if (i) return i;
    let e;
    i = io(), e || (e = await fetch(Oy + "?v=studio-apply-1788546512831").then(e => e.json()));
    for (let t in e) {
      const i = e[t],
        n = s.rawList[i.id] = {
          id: i.id,
          type: i.type,
          icon: i.icon,
          item: i.item,
          hasPartner: !!i.partnerID,
          partnerID: i.partnerID || null,
          title: i.title,
          description: i.description,
          rewardText: i.rewardText,
          unlockText: i.unlockText,
          reward: i.reward,
          rewardItem: i.rewardItem
        };
      if (i.partnerID) {
        const e = ay.pins[i.partnerID];
        !e || "Side" !== i.type && e.object || (e.object = i.item ? "interactions-" + i.item.toLowerCase() : i.icon);
      }
      const r = a(i.unlockCondition);
      let o = a(i.rewardCondition);
      const l = o.split("[===]");
      if (l.length > 1) {
        if (isNaN(l[1])) {
          const e = new Function("store", "return " + l[1]);
          l[1] = e(cv.$store);
        }
        const e = 0 | l[1],
          t = l[0].trim();
        n.hasProgressBar = !0, n.progressBarMax = e, n.progressBarValue = new Function("save", "store", "return " + t), o = "(" + t + ") >= " + e;
      }
      n.unlockWhen = new Function("save", "store", "return " + r), n.completeWhen = new Function("save", "store", "return " + o);
    }
    i.resolve();
  }
  function a(t) {
    return (t = t.trim()).length ? t = (t = t.replace(/(\$\$?)([a-z0-9.-_]+)/gi, (t, s, i) => {
      const n = 1 === s.length,
        a = 2 === s.length;
      return n && e.add(i), a ? "save." + i : n ? "save.vars." + i : i;
    })).replace(/(#)([a-z0-9.-_]+)/gi, (e, t, s) => "store." + s) : "true";
  }
  return function (e) {
    const t = e.config.globalProperties;
    e.provide("quests", s), t.$quests = s, t.$preloader.task(n);
  };
}, {}], ["notifications", function () {
  const e = yt(0),
    t = _t(),
    s = function () {
      const e = cv.$device.type.phone;
      return {
        MainQuestCompleted: {
          component: VueNotifMainQuestCompletedComponent,
          type: "mainQuest",
          isOverlayNotif: !0,
          test({
            quest: e
          }, t) {
            for (let s = 0, i = e.length; s < i; s++) {
              const i = e[s];
              if (Ox(i, t)) return !1;
            }
          },
          beforeAdd(e, t) {}
        },
        QuestCompleted: {
          component: VueNotifQuestCompletedComponent,
          type: "quest",
          isOverlayNotif: !0,
          test({
            quest: e
          }, t) {
            for (let s = 0, i = e.length; s < i; s++) {
              const i = e[s];
              if (Ox(i, t)) return !1;
            }
          },
          beforeAdd(e, t) {
            e.progress = e.progress.filter(e => "QuestProgress" !== e.type || !Ox(e, t));
          }
        },
        QuestProgress: {
          component: VueNotifQuestProgressComponent,
          type: "progress",
          isBottomNotif: !0,
          test({
            quest: e,
            progress: t
          }, s) {
            if ("Side" === s.quest.type) {
              const e = s.quest;
              if (e.progressBarValue <= 1) return !1;
              if (e.progressBarValue >= e.progressBarMax) return !1;
            }
            for (let i = 0, n = e.length; i < n; i++) {
              const t = e[i];
              if ("QuestCompleted" === t.type && Ox(t, s)) return !1;
            }
            for (let i = 0, n = t.length; i < n; i++) {
              const e = t[i];
              if ("QuestProgress" === e.type && Ox(e, s)) return !1;
            }
          }
        },
        ChestOpen: {
          component: VueNotifChestOpenComponent,
          type: "dataPoints",
          isBottomNotif: !0
        },
        Hint: {
          component: VueNotifHintComponent,
          type: "hint",
          isBottomNotif: !0
        }
      };
    }(),
    i = {
      quest: [],
      mainQuest: [],
      progress: [],
      dataPoints: [],
      hint: []
    },
    n = {
      add: g,
      setApiNotif: function (e) {
        n.apiNotif.value = e;
      },
      currentNotif: t,
      apiNotif: yt(),
      lastNotificationAt: 0,
      isMainNotifActive: yt(!1),
      displayHint: f,
      queues: i
    },
    a = u("isNotifActive", 20),
    r = u("isTopActive", 10),
    o = u("isOverlayActive", 40),
    l = u("isBottomActive", 40),
    c = yt();
  function h() {
    const e = cv.$store.isTransitionActiveDelayed,
      h = cv.$store.isDialogVisibleDelayed,
      u = cv.$store.isMenuOpen,
      d = cv.$store.isCinematicActive,
      p = c.value;
    if (!zx.has(p) || h || cv.$store.isApiErrorVisible || u || e || d) return void (t.value && t.value._notifClose());
    if (h || t.value) return;
    let m;
    for (let t in i) if (i[t].length) {
      m = i[t].shift();
      break;
    }
    m && function (e) {
      const i = s[e.id],
        c = i.component;
      let h;
      c.inheritAttrs = !1;
      const u = {},
        d = () => {
          if (h && h.component && h.isUnmounted) return !0;
        },
        p = () => !!d() || !!h._notifExiting || void 0;
      u.onEnter = t => {
        Rs(() => {
          n.lastNotificationAt = cv.$webgl.time.elapsed, e.onEnter && e.onEnter(), t(h.el, p), a(!0);
          const i = s[e.id];
          i.isTopNotif && r(!0), i.isOverlayNotif && o(!0), i.isBottomNotif && l(!0);
        });
      }, u.onExit = e => {
        h._notifOnExit = e;
      }, u.close = async () => {
        if (h._notifExiting) return;
        h._notifExiting = !0, h._notifOnExit && (await h._notifOnExit(h.el, d)), n.lastNotificationAt = cv.$webgl.time.elapsed, e.onExited && e.onExited();
        const i = s[e.id];
        i.isTopNotif && r(!1), i.isOverlayNotif && o(!1), i.isBottomNotif && l(!1), a(!1), t.value === h && (t.value = null);
      };
      const m = "notif_" + ++Rx,
        f = {
          ...e,
          lifecycle: u,
          key: m
        };
      h = Dn(c, f), h._notifClose = u.close, t.value = h;
    }(m);
  }
  function u(e, t = 40) {
    const s = n[e] = yt(!1);
    let i = null;
    const a = () => s.value = !1;
    return e => {
      clearTimeout(i), e ? s.value = !0 : i = setTimeout(a, t);
    };
  }
  window.displayHint = f;
  const d = 6e4;
  let p = 0,
    m = 0;
  function f(e = "", s = {}) {
    const n = t.value && t.value.props || {},
      a = cv.$store.isGuest,
      r = cv.$savestate.game.vars.questsCompletedCount;
    if ("enroll" === e) {
      if (a) return;
      if (r < 1) return;
      if ("hint" === n.type) return;
      if (i.hint.length > 0) return;
      const t = Date.now(),
        o = t - p;
      if (m >= 3) return;
      if (m >= 2 && o < 6 * d) return;
      if (m >= 1 && o < 3 * d) return;
      return p = t, m++, g("Hint", {
        hintType: e,
        ...s
      });
    }
  }
  function g(t, n = {}) {
    n.id = t;
    const a = s[t];
    if (!a) return;
    n.type = a.type;
    !1 !== (!a.test || a.test(i, n)) && (a.beforeAdd && a.beforeAdd(i, n), i[a.type].push(n), e.value = e.value + 1 | 0);
  }
  return function (s) {
    const i = s.config.globalProperties;
    s.provide("notifications", n), s.provide("notifs", n), i.$notifications = n, i.$notifs = n, s.component("NotificationCenter", Ry), function () {
      const s = () => c.value = cv.$route.name;
      let i;
      hs(() => cv.$route, e => {
        clearTimeout(i), zx.has(e.name) ? i = setTimeout(s, 1200) : s();
      }, {
        immediate: !0
      }), hs([e, t, c, () => cv.$store.isMenuOpen, () => cv.$store.isApiErrorVisible, () => cv.$store.isDialogVisibleDelayed, () => cv.$store.isTransitionActiveDelayed, () => cv.$store.isCinematicActive], h);
    }();
  };
}, {}], ["circuit", function () {
  let e = 0;
  const t = nt({
    sceneID: null,
    questPrefix: null,
    isMainQuest: !1,
    isSideQuest: !1,
    isFreeRun: !1,
    wasStartedAsSideQuest: !1,
    rawGameTime: 0,
    gameTime: 0,
    formattedGameTime: "0",
    targetTime: 0,
    previousPersonalBest: 0,
    countdown: 4,
    status: 0,
    time: 0,
    saveScore: pt(n),
    getPersonalBest: pt(a),
    exit: pt(function (e = 1e3) {
      if (t.status === HU.Exiting) return;
      r("Exiting");
      const s = t.exitPoint;
      cv.$webgl.scenes.teleportTo(s.scene, {
        point: s.point,
        delay: e
      });
    }),
    formatTime: pt(s),
    updateTime: pt(function (s) {
      e = t.time, t.time += s;
    }),
    hasReached: pt(function (s) {
      return t.time >= s && e < s;
    }),
    reset: pt(i),
    replay: pt(function () {
      i({
        scene: t.sceneID,
        replay: !0,
        respawn: !0
      });
    }),
    setStatus: pt(r),
    STATES: pt(HU)
  });
  t.formattedGameTime = kn(() => s(t.rawGameTime / 1e3)), t.gameTime = kn(() => +s(t.rawGameTime / 1e3));
  for (let o in HU) t["is" + o] = kn(() => t.status === HU[o]);
  function s(e) {
    return e.toFixed(2).padStart(5, 0);
  }
  function i({
    scene: s = "CircuitBike",
    replay: i = !1,
    respawn: n = !1
  } = {}) {
    t.exiting = !1, t.isMainQuest = t.isSideQuest = !1, t.time = t.rawGameTime = 0, e = -1, t.countdown = -2, r(i ? "Countdown" : "Intro");
    const o = cv.$webgl.scenes.list[s];
    t.sceneID = s, t.exitPoint = o.exitPoint;
    const l = t.questPrefix = o.questPrefix;
    if (t.isMainQuest = !cv.$quests[l + "Main"].completed, t.isSideQuest = !t.isMainQuest && !cv.$quests[l + "Side"].completed, t.isFreeRun = !t.isMainQuest && !t.isSideQuest, i || (t.wasStartedAsSideQuest = !!t.isSideQuest), t.previousPersonalBest = a(), t.targetTime = t.isFreeRun ? +t.previousPersonalBest : +(cv.$l("game.timer.target." + s) || 10), n) {
      const e = cv.$webgl.scenes.current;
      if (!e || !e.isCircuitScene) return;
      e.respawn();
    }
  }
  function n() {
    const e = cv.$savestate,
      s = "hasPlayed" + t.sceneID,
      i = "game" + t.sceneID + "Time",
      n = t.gameTime,
      a = e.getVariable(s),
      r = e.getVariable(i);
    a ? n > 0 && (n < r || r <= 0) && e.setVariable(i, n) : e.setVariable(s, !0);
  }
  function a() {
    return s(cv.$savestate.getVariable("game" + t.sceneID + "Time"));
  }
  function r(s) {
    t.status = HU[s], e = -1, t.time = 0, t.status === HU.Started && (t.rawGameTime = 0), t.status === HU.Finished && n();
  }
  return function (e) {
    const s = e.config.globalProperties;
    e.provide("circuit", t), s.$circuit = t;
  };
}, {}], ["onetrust", function () {
  let e,
    t = {},
    s = {};
  const i = {
    init: function () {},
    setCategories: o,
    cookieSettingsText: _t(""),
    onConsentChanged: () => {},
    key: null
  };
  let a = !1;
  function r() {
    var e, n;
    let r = null == (n = null == (e = null == window ? void 0 : window.OneTrust) ? void 0 : e.GetDomainData()) ? void 0 : n.CookieSettingButtonText;
    !a && r && (i.cookieSettingsText.value = r, a = !0);
    const o = (window.OnetrustActiveGroups || "").split(",").filter(e => e && e.length);
    for (let i in s) {
      const e = i,
        n = t[i],
        a = !!s[e],
        r = !!o.includes(n);
      s[i] = r, a !== r && l(i, r, a);
    }
  }
  function o(e) {
    t = e, s = Object.keys(e).reduce((e, t) => (e[t] = !1, e), {});
  }
  function l(e, t, s) {
    i.onConsentChanged(e, t, s), !t && s && document.location.reload();
  }
  return function (t) {
    e = t.config.globalProperties, e.$onetrust = i, t.provide("onetrust", i);
  };
}, {}]];
function VU(e) {
  const t = _t(null);
  function s(e) {
    t.value = e;
  }
  return e.watchImmediate(s), Fs(() => e.unwatch(s)), t;
}
const WU = {
    key: 0,
    class: "start"
  },
  VueIntroStartComponent = $y({
    __name: "IntroStart",
    setup(e) {
      const t = cv.$webgl.store.intro,
        s = VU(t.startJourneyVisible),
        i = VU(t.journeyStarted),
        n = kn(() => s.value && !i.value);
      function r() {
        t.journeyStarted.value || (t.journeyStarted.set(!0), cv.$webgl.audio.playSound("sfx_UI_Dialog_CameraMove_In", {
          delay: 200
        }));
      }
      return (e, t) => ($i(), Ki(ea, {
        duration: {
          enter: 1e3,
          leave: 1e3
        },
        appear: ""
      }, {
        default: ts(() => [n.value ? ($i(), Qi("div", WU, [on(VueCallToActionComponent, {
          color: "red",
          text: e.$l("cta.start"),
          class: "start-btn",
          onClick: r
        }, null, 8, ["text"])])) : un("", !0)]),
        _: 1
      }));
    }
  }, [["__scopeId", "data-v-a8ff0715"]]),
  VueIntroComponent = $y({
    __name: "Intro",
    setup: e => (cv.$router.nrv({
      onEnter: async function ({
        from: e,
        exitPrevious: t,
        toggleClass: s,
        isCancelled: i
      }) {
        t(), (null == e ? void 0 : e.name) || (await lo(820));
        if (i()) return;
        s(), cv.$webgl.store.intro.resetTimers.emit();
      }
    }), (e, t) => {
      const s = qs("NiceViewContainer");
      return $i(), Ki(s, null, {
        default: ts(() => [on(VueIntroStartComponent)]),
        _: 1
      });
    })
  }, [["__scopeId", "data-v-366b880d"]]),
  YU = {
    class: "page page-home"
  };
const JU = $y({}, [["render", function (e, t) {
  return $i(), Qi("section", YU);
}], ["__scopeId", "data-v-08bdfa7b"]]);
function QU() {
  const e = {
      Escape: !0,
      KeyN: !0,
      KeyX: !0
    },
    t = {},
    s = yt(!1);
  function i(s) {
    e[s.code] && (t[s.code] = !0);
  }
  function n(i) {
    if (!e[i.code]) return;
    i.preventDefault(), i.stopPropagation();
    const n = t[i.code];
    t[i.code] = !1, n && e[i.code] && (s.value = !0);
  }
  return {
    listenKeys: function () {
      window.addEventListener("keydown", i, !0), window.addEventListener("keyup", n, !0);
    },
    unlistenKeys: function () {
      window.removeEventListener("keydown", i, !0), window.removeEventListener("keyup", n, !0);
    },
    isEscaped: s
  };
}
const KU = {
    class: "color-scheme"
  },
  eH = {
    class: "color-container"
  },
  tH = {
    class: "color-picker"
  },
  sH = ["data-index", "aria-label"],
  iH = {
    class: "face-container"
  },
  nH = {
    class: "face-picker"
  },
  aH = ["aria-label"],
  rH = (e => (Kt("data-v-d2fd83f8"), e = e(), es(), e))(() => rn("div", {
    class: "separator"
  }, null, -1)),
  oH = ["aria-label"],
  VueCustomizeColorSchemeComponent = $y({
    __name: "CustomizeColorScheme",
    emits: ["updateColor", "updateGender"],
    setup(e, {
      emit: t
    }) {
      const s = [];
      for (const l in cv.$characters.colors) {
        l.match(/(character)/g) && s.push(l);
      }
      const i = yt(s.indexOf(cv.$savestate.game.player.color) || 0);
      function n(e, n) {
        i.value = e.target.getAttribute("data-index"), n || t("updateColor", s[i.value]);
      }
      rs(() => {
        i.value = s.indexOf(cv.$savestate.game.player.color) || 0;
      });
      const a = ["male", "female"],
        r = yt(cv.$savestate.game.player.face);
      function o(e) {
        r.value = e.target.getAttribute("data-index"), t("updateGender", a[r.value]);
      }
      return (e, t) => ($i(), Qi("div", KU, [rn("div", eH, [rn("div", tH, [($i(), Qi(Gi, null, Js(5, (t, s) => rn("button", {
        key: t,
        "data-index": s,
        "aria-label": e.$l("arialabel.color") + ` ${s}`,
        class: q(["color", [`color-${s}`, {
          "is-selected": s == i.value
        }]]),
        onClick: n
      }, [on(VueValidateComponent)], 10, sH)), 64))])]), false && rn("div", iH, [rn("div", nH, [rn("button", {
        class: q(["face", {
          "is-selected": 0 == St(cv).$savestate.game.player.face
        }]),
        "data-index": "0",
        "aria-label": e.$l("arialabel.faceMale"),
        onClick: o
      }, [on(VueCharacterFaceComponent, {
        type: "male"
      })], 10, aH), rH, rn("button", {
        class: q(["face", {
          "is-selected": 1 == St(cv).$savestate.game.player.face
        }]),
        "data-index": "1",
        "aria-label": e.$l("arialabel.faceFemale"),
        onClick: o
      }, [on(VueCharacterFaceComponent, {
        type: "female",
        delay: 1
      })], 10, oH)])])]));
    }
  }, [["__scopeId", "data-v-d2fd83f8"]]),
  cH = {
    class: "container"
  },
  hH = {
    class: "arrows"
  },
  VueCustomizeComponent = $y({
    __name: "Customize",
    setup(e) {
      const {
          listenKeys: t,
          unlistenKeys: s,
          isEscaped: i
        } = QU(),
        n = cv.$router,
        a = yt(!0),
        r = yt(),
        o = yt(),
        l = yt(!0),
        c = [],
        h = {
          ...cv.$savestate.game.player
        },
        u = [];
      for (const x in cv.$characters.colors) {
        x.match(/(character)/g) && u.push(x);
      }
      const d = [],
        p = [],
        m = [];
      for (let x in cv.$items.head) {
        cv.$items.head[x].isClaimed && d.push(x);
      }
      for (let x in cv.$items.body) {
        cv.$items.body[x].isClaimed && p.push(x);
      }
      for (let x in cv.$items.bottom) {
        cv.$items.bottom[x].isClaimed && m.push(x);
      }
      for (const x in cv.$characters.colors) {
        x.match(/(character)/g);
      }
      const f = {
        head: d,
        body: p,
        bottom: m
      };
      function g(e) {
        cv.$savestate.game.player.color = e, cv.$webgl.store.updatePlayerAttributes.emit(), cv.$webgl.audio.playSound("sfx_UI_customPlayer_changeColor");
      }
      function v() {}
      async function b() {}
      function y(e) {
        if (cv.$store.isCustomizeOpen = !1, cv.$webgl.store.outfitDebounce = 50, e) cv.$webgl.audio.playSound("sfx_UI_customPlayer_validate");else {
          cv.$webgl.audio.playSound("sfx_UI_dialog_opendialog");
          for (const e in cv.$savestate.game.player) cv.$savestate.game.player[e] = h[e], cv.$webgl.store.updatePlayerOutfit.emit();
        }
        n.push({
          name: "Home"
        });
      }
      function _() {}
      return Rs(async () => {
        if (await lo(500), l.value = !1, cv.$webgl.audio.playSound("sfx_UI_customPlayer_open", {
          delay: 50
        }), cv.$store.newItemNeedsUpdate) {
          cv.$store.newItemNeedsUpdate = !1;
          let e = cv.$store.newItem.split("-")[0];
          e = e.toLowerCase(), b(e, null, cv.$store.newItem);
        }
        hs(() => i.value, () => {
          i.value && y(!1);
        }), cv.$analytics.pageview({
          title: "glorb - Customize",
          path: "/customize"
        });
      }), cv.$router.nrv({
        onEnter: async ({
          exitPrevious: e,
          from: s,
          isCancelled: i
        }) => {
          var n;
          e(), "Home" !== (null == (n = null == s ? void 0 : s.route) ? void 0 : n.name) && (await lo(300)), i() || (cv.$webgl.store.isCustomizing.set(!0), t());
        },
        onLeave: async () => {
          l.value = !0, cv.$webgl.store.isCustomizing.set(!1), s(), await lo(1500);
        }
      }), (e, t) => {
        const s = qs("NiceViewContainer");
        return $i(), Ki(s, null, {
          default: ts(() => [rn("div", cH, [rn("div", {
            ref_key: "colorPicker",
            ref: r,
            class: q(["color-picker", {
              hide: l.value
            }])
          }, [on(VueCustomizeColorSchemeComponent, {
            onUpdateColor: g
          })], 2), rn("div", hH, [($i(), Qi(Gi, null, Js(c, (t, s) => rn("div", {
            key: s,
            class: q([t, {
              hide: l.value
            }])
          }, [on(VueCircleButtonComponent, {
            "aria-label": e.$l("arialabel.previous"),
            class: "button left",
            icon: "arrow",
            "bg-color": "bordered",
            "icon-color": "white",
            "is-hoverable": !0,
            "click-animation": !0,
            onClick: e => b(t, "left")
          }, null, 8, ["aria-label", "onClick"]), on(VueCircleButtonComponent, {
            "aria-label": e.$l("arialabel.next"),
            class: "button right",
            icon: "arrow",
            "bg-color": "bordered",
            "icon-color": "white",
            "is-hoverable": !0,
            "click-animation": !0,
            onClick: e => b(t, "right")
          }, null, 8, ["aria-label", "onClick"])], 2)), 64))]), rn("div", {
            ref_key: "actions",
            ref: o,
            class: q(["actions", {
              hide: l.value
            }])
          }, [on(VueButtonActionComponent, {
            "aria-label": e.$l("arialabel.discard"),
            class: "button",
            action: "discard",
            onClick: t[0] || (t[0] = e => y(!1))
          }, null, 8, ["aria-label"]), false && on(VueButtonActionComponent, {
            "aria-label": e.$l("arialabel.random"),
            class: "button",
            action: "random",
            onClick: _
          }, null, 8, ["aria-label"]), on(VueButtonActionComponent, {
            "aria-label": e.$l("arialabel.validate"),
            class: "button",
            onClick: t[1] || (t[1] = e => y(!0))
          }, null, 8, ["aria-label"])], 2)])]),
          _: 1
        });
      };
    }
  }, [["__scopeId", "data-v-ad64405c"]]),
  dH = e => (Kt("data-v-23fde29a"), e = e(), es(), e),
  pH = {
    key: 0,
    class: "game-countdown"
  },
  mH = [dH(() => rn("span", null, "G", -1)), dH(() => rn("span", null, "O", -1)), dH(() => rn("span", null, "!", -1))],
  VueMiniGameCountdownComponent = $y({
    __name: "MiniGameCountdown",
    setup(e) {
      const t = cv.$circuit,
        s = kn(() => t.countdown),
        i = kn(() => (t.isCountdown || t.isStarted) && s.value <= 4 && s.value >= -2);
      return (e, t) => ($i(), Ki(ea, {
        duration: {
          enter: 0,
          leave: 1e3
        },
        appear: ""
      }, {
        default: ts(() => [i.value ? ($i(), Qi("section", pH, [($i(), Qi(Gi, null, Js(3, e => rn("div", {
          key: e,
          class: q(["number", {
            visible: s.value === e,
            hidden: s.value < e
          }])
        }, X(e), 3)), 64)), rn("div", {
          class: q(["go", {
            visible: 0 === s.value,
            hidden: s.value < 0
          }])
        }, mH, 2)])) : un("", !0)]),
        _: 1
      }));
    }
  }, [["__scopeId", "data-v-23fde29a"]]),
  gH = {
    class: "bar-container"
  },
  VueMiniGameControlsButtonComponent = $y({
    __name: "MiniGameControlsButton",
    props: ["active"],
    setup(e) {
      const t = e;
      let s = null,
        i = 0;
      const n = yt();
      return hs(() => t.active, e => {
        if (!e || !n.value) return;
        const t = performance.now();
        t - i < 300 || (i = t, s = Yl({
          target: n.value,
          name: "ripple",
          ease: "ease-in-out",
          duration: 500
        }));
      }), Us(() => {
        s && s.destroy();
      }), (e, s) => ($i(), Qi("div", {
        class: q(["btn", {
          active: t.active
        }])
      }, [rn("div", {
        ref_key: "fx",
        ref: n,
        class: "btn-effect"
      }, null, 512), rn("div", gH, [($i(), Qi(Gi, null, Js(3, e => rn("div", {
        key: e,
        class: q(["bar", [`bar-${e}`]])
      }, null, 2)), 64))])], 2));
    }
  }, [["__scopeId", "data-v-f66da390"]]),
  bH = {
    key: 0,
    class: "controls"
  },
  VueMiniGameControlsComponent = $y({
    __name: "MiniGameControls",
    setup(e) {
      const t = cv.$circuit,
        s = kn(() => !cv.$device.type.desktop && t.isStarted && t.time > 400),
        i = yt(),
        n = yt();
      function a(e) {
        i.value = e.pressed && e.normalizePos.x < 0, n.value = e.pressed && e.normalizePos.x > 0;
      }
      return Rs(() => {
        cv.$webgl.input.touch.watch(a);
      }), Fs(() => {
        cv.$webgl.input.touch.unwatch(a);
      }), (e, t) => ($i(), Ki(ea, {
        duration: {
          enter: 1100,
          leave: 1100
        },
        appear: ""
      }, {
        default: ts(() => [s.value ? ($i(), Qi("div", bH, [on(VueMiniGameControlsButtonComponent, {
          class: "left",
          active: i.value
        }, null, 8, ["active"]), on(VueMiniGameControlsButtonComponent, {
          class: "right",
          active: n.value
        }, null, 8, ["active"])])) : un("", !0)]),
        _: 1
      }));
    }
  }, [["__scopeId", "data-v-75ee7a92"]]),
  _H = {
    key: 0
  },
  xH = {
    class: "seconds"
  },
  wH = {
    key: 0,
    class: "subtext"
  },
  SH = {
    key: 1,
    class: "subtext"
  },
  VueMiniGameTimerComponent = $y({
    __name: "MiniGameTimer",
    setup(e) {
      const t = cv.$circuit,
        s = kn(() => t.isStarted && t.time >= 1500 && (t.isSideQuest || t.isFreeRun)),
        i = kn(() => {
          const e = t.isFreeRun ? t.targetTime - 3 : t.targetTime - 5;
          return t.gameTime > e;
        }),
        n = kn(() => t.gameTime > t.targetTime);
      return (e, a) => ($i(), Ki(ea, {
        duration: {
          enter: 1500,
          leave: 1e3
        },
        appear: ""
      }, {
        default: ts(() => [s.value ? ($i(), Qi("section", _H, [rn("p", {
          class: q(["time", {
            emergency: i.value,
            lose: n.value
          }])
        }, X(St(t).formattedGameTime), 3), rn("p", xH, X(e.$l("game.timer.seconds")), 1), St(t).isSideQuest ? ($i(), Qi("p", wH, " (" + X(e.$l("game.timer.timetobeat")) + ": " + X(St(t).targetTime) + " " + X(e.$l("game.timer.seconds")) + ") ", 1)) : St(t).isFreeRun ? ($i(), Qi("p", SH, " (" + X(e.$l("game.timer.besttime")) + ": " + X(St(t).previousPersonalBest) + " " + X(e.$l("game.timer.seconds")) + ") ", 1)) : un("", !0)])) : un("", !0)]),
        _: 1
      }));
    }
  }, [["__scopeId", "data-v-bdb04520"]]),
  MH = {
    key: 0,
    class: "mini-game-finish"
  },
  CH = ["innerHTML"],
  VueMiniGameFinishComponent = $y({
    __name: "MiniGameFinish",
    setup(e) {
      const t = cv.$circuit,
        s = (null == (i = cv.$l("game.finish")) && (i = ""), i.replace(/(^|[ >])([^ ><]+)?/gi, (e, t, s) => {
          let i = t;
          if (void 0 !== s) {
            let e = "";
            for (let t = 0, i = s.length; t < i; t++) {
              const i = s[t];
              e += " " === i || " " === i || "&nbsp;" === i ? i : `<span class="char char-${t}">` + s[t] + "</span>";
            }
            i += '<span class="word">' + e + "</span>";
          }
          return i;
        }));
      var i;
      const n = kn(() => t.isFinished && t.time < 1500);
      return (e, t) => ($i(), Ki(ea, {
        duration: {
          enter: 1700,
          leave: 1e3
        },
        appear: ""
      }, {
        default: ts(() => [n.value ? ($i(), Qi("section", MH, [rn("div", {
          innerHTML: St(s)
        }, null, 8, CH)])) : un("", !0)]),
        _: 1
      }));
    }
  }, [["__scopeId", "data-v-43f65c1a"]]);
async function TH(e, t) {
  const s = e.querySelector(".svg-circle");
  s.classList.remove("visible"), e.getBoundingClientRect(), s.classList.add("visible"), await lo(500), e.querySelector(".result-time-numb").classList.add("visible"), await lo(500), e.classList.add("visible"), await lo(2e3), t();
}
async function EH(e, t) {
  e.classList.add("hidden"), await lo(1e3), t();
}
const BH = {
    key: 0,
    class: "mini-game-results"
  },
  IH = {
    ref: "result",
    class: "result"
  },
  kH = {
    key: 0,
    class: "result-timer"
  },
  DH = {
    class: "result-time"
  },
  LH = ["textContent"],
  OH = ["textContent"],
  RH = ["height", "width"],
  zH = ["cx", "cy", "r", "stroke", "opacity"],
  NH = {
    class: "target"
  },
  FH = ["textContent"],
  UH = {
    class: "target-time"
  },
  HH = ["textContent"],
  GH = ["textContent"],
  VH = {
    class: "result-buttons"
  },
  VueMiniGameResultsComponent = $y({
    __name: "MiniGameResults",
    setup(e) {
      const t = cv.$circuit,
        s = cv.$store,
        i = cv.$device.type.mobile ? 180 : 240,
        n = cv.$device.type.mobile ? 90 : 120,
        a = cv.$device.type.mobile ? 80 : 100,
        r = kn(() => !t.isMainQuest && t.isOutro);
      let o = yt(),
        l = yt(),
        c = yt(),
        h = yt(),
        u = yt();
      hs(() => r.value, e => e && function () {
        if (o.value = !1, l.value = t.isSideQuest ? cv.$l("game.timer.timetobeat") : cv.$l("game.timer.besttime"), c.value = t.isSideQuest ? t.targetTime : t.getPersonalBest(), h.value = !1, t.isSideQuest) h.value = t.gameTime > 0 && t.gameTime < t.targetTime;else if (t.isFreeRun) {
          const e = t.previousPersonalBest;
          h.value = t.gameTime > 0 && (e <= 0 || t.gameTime < e);
        }
        h.value ? cv.$webgl.audio.playSound("sfx_minigame_result_win", {
          delay: 600
        }) : cv.$webgl.audio.playSound("sfx_minigame_result_lose", {
          delay: 500
        });
        u.value = t.isSideQuest && h.value || t.isFreeRun && t.wasStartedAsSideQuest;
      }(), {
        immediate: !0
      });
      const d = Symbol();
      async function p() {
        o.value || (o.value = !0, t.setStatus("Exiting"), cv.$webgl.store.isTransitionActive.value = !0, cv.$webgl.audio.playSound("sfx_UI_dialog_next"), await cv.$webgl.transitionScene.loaderIn(null), t.replay(), await cv.$webgl.transitionScene.loaderOut(null), cv.$webgl.store.isTransitionActive.value = !1);
      }
      function m() {
        o.value || (o.value = !0, cv.$webgl.audio.playSound("sfx_UI_dialog_next"), t.exit(1e3));
      }
      return rs(() => s.toggleConfettis(d, h.value && !!r.value)), (e, s) => ($i(), Ki(ea, {
        css: !1,
        appear: "",
        onEnter: St(TH),
        onLeave: St(EH)
      }, {
        default: ts(() => [r.value ? ($i(), Qi("section", BH, [rn("div", IH, [St(t).isMainQuest ? un("", !0) : ($i(), Qi("div", kH, [rn("div", DH, [rn("p", {
          class: "result-time-numb",
          textContent: X(St(t).formattedGameTime)
        }, null, 8, LH), rn("p", {
          class: "result-time-sec",
          textContent: X(e.$l("game.timer_seconds"))
        }, null, 8, OH)]), ($i(), Qi("svg", {
          ref: "circle",
          height: St(i),
          width: St(i),
          class: "svg-circle"
        }, [rn("circle", {
          cx: St(n),
          cy: St(n),
          r: St(a),
          stroke: St(h) ? "#02c6a7" : "#f2676f",
          "stroke-width": "5",
          opacity: St(h) ? 1 : .4,
          fill: "transparent",
          class: "stroke-circle"
        }, null, 8, zH)], 8, RH))])), rn("div", NH, [rn("p", {
          class: "target-text",
          textContent: X(St(l))
        }, null, 8, FH), rn("div", UH, [rn("p", {
          class: "target-time-numb",
          textContent: X(St(c))
        }, null, 8, HH), rn("p", {
          class: "target-time-sec",
          textContent: X(e.$l("game.timer.seconds"))
        }, null, 8, GH)])]), rn("div", VH, [St(t).isMainQuest ? un("", !0) : ($i(), Ki(VueCallToActionComponent, {
          key: 0,
          color: St(u) ? "gray" : "green",
          text: e.$l("game.results.cta.replay"),
          class: "result-cta replay-cta",
          onClick: p
        }, null, 8, ["color", "text"])), on(VueCallToActionComponent, {
          color: St(u) ? "green" : "red",
          text: St(u) ? e.$l("game.results.cta.reward") : e.$l("game.results.cta.quit"),
          class: "result-cta end-cta",
          onClick: m
        }, null, 8, ["color", "text"])])], 512)])) : un("", !0)]),
        _: 1
      }, 8, ["onEnter", "onLeave"]));
    }
  }, [["__scopeId", "data-v-cd5c5585"]]),
  jH = {
    key: 0,
    class: "tutorial-notif"
  },
  qH = {
    key: 0,
    class: "icon"
  },
  ZH = {
    class: "top-key"
  },
  $H = {
    class: "bottom-keys"
  },
  XH = {
    key: 1,
    class: "icon"
  },
  YH = {
    key: 0
  },
  JH = [(e => (Kt("data-v-25f39610"), e = e(), es(), e))(() => rn("svg", {
    width: "45",
    height: "45",
    viewBox: "0 0 45 45",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [rn("path", {
    d: "M8.038 16.986c-3.62-.637-6.382-3.8-6.382-7.602 0-4.26 3.466-7.726 7.725-7.726 4.26 0 7.726 3.466 7.726 7.726a7.657 7.657 0 0 1-.8 3.4l.962 1.665a9.323 9.323 0 0 0 1.494-5.068A9.38 9.38 0 0 0 9.381 0 9.38 9.38 0 0 0 0 9.381c0 5.002 3.915 9.073 8.842 9.354l-.804-1.748Z",
    fill: "#fff",
    class: "circle"
  }), rn("path", {
    d: "m32.71 16.164-.037.017c-.095.05-.179.11-.267.164l2.427 4.874a.898.898 0 0 1-1.606.8l-2.365-4.751a3.929 3.929 0 0 0-5.186-1.63l-.054.026a4.352 4.352 0 0 0-.405.242l3.59 6.912c.227.44.057.981-.383 1.21a.894.894 0 0 1-1.207-.384l-3.277-6.307a3.916 3.916 0 0 0-3.882-.229l-.006.002-.03.015a4.173 4.173 0 0 0-.701.468l4.33 7.786a.898.898 0 0 1-1.567.873l-9.73-17.114a2.75 2.75 0 0 0-3.7-1.199 2.753 2.753 0 0 0-1.196 3.702l9.284 20.27s-5.193-1.255-6.94-1.587c-.7-.132-1.58-.123-2.217.202a2.972 2.972 0 0 0-1.293 3.997c.377.733 1.05 1.155 1.744 1.477l14.613 7.392c3.738 2.058 8.575 2.216 12.906.043l.002-.002.095-.05c3.294-1.684 5.68-4.42 6.864-7.506 1.185-3.085 1.164-6.542-.37-9.604l-4.183-8.359-.002-.002-.013-.024a3.933 3.933 0 0 0-5.238-1.724Z",
    fill: "#fff",
    class: "hand"
  })], -1))],
  QH = ["innerHTML"],
  KH = ["innerHTML"],
  VueTutorialComponent = $y({
    __name: "Tutorial",
    props: ["world", "game", "visible"],
    setup(e) {
      const t = e;
      return (s, i) => {
        const n = qs("SvgIcon");
        return $i(), Ki(ea, {
          duration: {
            enter: 1e3,
            leave: 1e3
          },
          appear: ""
        }, {
          default: ts(() => [e.visible ? ($i(), Qi("aside", jH, [rn("div", {
            class: q(["tutorial-container", {
              world: !t.game,
              game: t.game
            }])
          }, [St(cv).$device.type.desktop ? ($i(), Qi("div", qH, [rn("div", ZH, [on(n, {
            id: "tuto-key",
            class: "top key key-0"
          })]), rn("div", $H, [($i(), Qi(Gi, null, Js(3, e => on(n, {
            id: "tuto-key",
            key: e,
            class: q(["key", [`key-${e}`]])
          }, null, 8, ["class"])), 64))])])) : ($i(), Qi("div", XH, [t.game ? un("", !0) : ($i(), Qi("div", YH, JH))])), t.game ? ($i(), Qi("div", {
            key: 2,
            class: "tuto-text",
            innerHTML: St(cv).$device.type.desktop ? s.$l("tutorial.desktop.game") : s.$l("tutorial.mobile.game")
          }, null, 8, QH)) : ($i(), Qi("div", {
            key: 3,
            class: "tuto-text",
            innerHTML: St(cv).$device.type.desktop ? s.$l("tutorial.desktop.world") : s.$l("tutorial.mobile.world")
          }, null, 8, KH))], 2)])) : un("", !0)]),
          _: 1
        });
      };
    }
  }, [["__scopeId", "data-v-25f39610"]]),
  tG = {
    class: "page page-mini-game"
  },
  sG = {
    class: "page page-phone"
  },
  iG = {
    class: "page page-quests"
  },
  nG = {
    class: "json-dump"
  },
  aG = [{
    path: "/intro",
    name: "Intro",
    component: VueIntroComponent,
    meta: {
      isHeaderVisible: !1,
      playerCanMove: !1
    }
  }, {
    path: "/",
    name: "Home",
    component: JU,
    meta: {
      isHeaderVisible: !0,
      playerCanMove: !0
    }
  }, {
    path: "/customize",
    name: "Customize",
    component: VueCustomizeComponent,
    meta: {
      isHeaderVisible: !1
    }
  }, {
    path: "/mini-game",
    name: "MiniGame",
    component: $y({
      __name: "MiniGame",
      setup(e) {
        const t = cv.$circuit,
          s = kn(() => t.isMainQuest && t.isStarted && t.time >= 900 && t.time < 8e3),
          i = kn(() => t.isIntro && t.time > 2500 || t.isCountdown || t.isStarted || t.isFinished);
        function n() {
          t.exit(600);
        }
        return (e, t) => ($i(), Qi("section", tG, [on(ea, null, {
          default: ts(() => [i.value ? ($i(), Ki(VueCircleButtonComponent, {
            key: 0,
            "aria-label": e.$l("arialabel.close"),
            class: "game-close",
            icon: "cross",
            "bg-color": "bordered",
            "icon-color": "white",
            onClick: n
          }, null, 8, ["aria-label"])) : un("", !0)]),
          _: 1
        }), on(VueMiniGameCountdownComponent), on(VueMiniGameControlsComponent), on(VueMiniGameTimerComponent), on(VueMiniGameFinishComponent), on(VueMiniGameResultsComponent), on(VueTutorialComponent, {
          visible: s.value,
          game: !0
        }, null, 8, ["visible"])]));
      }
    }, [["__scopeId", "data-v-6233a07d"]]),
    meta: {
      isHeaderVisible: !1,
      playerCanMove: !0
    }
  }, {
    path: "/phone",
    name: "Phone",
    component: $y({
      __name: "Phone",
      setup: e => (e, t) => ($i(), Qi("section", sG))
    }, [["__scopeId", "data-v-ad4b0167"]]),
    meta: {
      isHeaderVisible: !1
    }
  }, {
    path: "/quests",
    name: "QuestsDebug",
    component: $y({
      __name: "QuestsDebug",
      setup(e) {
        const t = kn(() => {
          const e = JSON.parse(JSON.stringify(cv.$savestate.game));
          return function (e, t) {
            const s = {};
            Object.keys(e[t]).sort((e, t) => e[0].localeCompare(t[0])).forEach(i => s[i] = e[t][i]), e[t] = s;
          }(e, "vars"), JSON.stringify(e, null, 2);
        });
        return (e, s) => ($i(), Qi("section", iG, [rn("div", nG, [rn("pre", null, X(t.value), 1)])]));
      }
    }, [["__scopeId", "data-v-9898ebe6"]]),
    meta: {
      isHeaderVisible: !1,
      playerCanMove: !0
    }
  }];
function rG() {
  const e = window.__DATA,
    t = e.project.locales[e.page.locale];
  let s = e.project.basepath;
  return t.default && !e.project.prefixDefaultLocale || (s += e.page.locale), s.endsWith("/") && (s = s.slice(0, -1)), s;
}
class oG {
  constructor(e) {
    if (e.transferControlToOffscreen instanceof Function) {
      const t = e.transferControlToOffscreen();
      let s = `\n\t\t\t\t(function(app) {\n\t\t\t\t\tapp(true);\n\t\t\t\t})(${fG.toString()})\n\t\t\t`;
      const i = {
        setupCanvas: hG,
        resizeCanvas: uG,
        handleMessage: mG,
        render: pG,
        easeInOut: dG,
        map: lG,
        clampedMap: cG
      };
      for (const e in i) s += `\n${i[e]};\n`;
      const n = new Blob([s], {
          type: "application/javascript"
        }),
        a = URL.createObjectURL(n);
      this.app = new Worker(a), this.app.postMessage({
        type: "setup",
        value: t
      }, [t]), URL.revokeObjectURL(a);
    } else this.app = fG.call({}), this.app.postMessage({
      type: "setup",
      value: e
    });
    this.observer = new ResizeObserver(e => {
      const {
        width: t,
        height: s
      } = e[0].contentRect;
      this.app ? this.app.postMessage({
        type: "resize",
        value: {
          width: t,
          height: s
        }
      }) : uG(t, s);
    }), this.observer.observe(e.parentNode), Object.assign(this, {
      canvas: e
    });
  }
  hide(e = 1e3) {
    return this.app.postMessage({
      type: "hide",
      value: e
    }), new Promise(t => setTimeout(t, e));
  }
  dispose() {
    this.observer.disconnect(), this.app.terminate(), this.app = null;
  }
}
function lG(e, t, s, i, n) {
  return i + (e - t) / (s - t) * (n - i);
}
function cG(e, t, s, i, n) {
  const a = i + (e - t) / (s - t) * (n - i);
  return Math.max(i, Math.min(n, a));
}
function hG(e) {
  self.canvas = e, self.context = e.getContext("2d"), self.animationFrame = requestAnimationFrame(pG);
}
function uG(e, t, s) {
  self.canvas.width = t, self.canvas.height = s;
}
function dG(e) {
  return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2);
}
function pG(e) {
  const t = self.context,
    s = self.canvas.width / self.canvas.height;
  if (self.hidding.active && self.progress < 1) {
    const t = e - self.previousNow;
    self.progress += t / self.hidding.duration, self.progress > 1 && (self.progress = 1);
  }
  const i = self.progress,
    n = self.waves.length - 1,
    a = .7 * cG(s, .5, 2, .12, .06),
    r = 1 - a * n,
    o = cG(s, .5, 2, .3, .8);
  if (self.progress <= 0) return self.previousNow = e, self.animationFrame = requestAnimationFrame(pG), t.fillStyle = self.waves[self.waves.length - 1].color, void t.fillRect(0, 0, self.canvas.width, self.canvas.height);
  if (!(self.progress >= 1)) {
    t.clearRect(0, 0, self.canvas.width, self.canvas.height);
    for (let e = 0; e < self.waves.length; e++) {
      const s = a * (n - e),
        l = s + r;
      let {
        bleed: c,
        color: h,
        offset: u,
        height: d
      } = self.waves[e];
      c += .4 * i;
      const p = dG(cG(i, s, l, 0, 1));
      u -= .4 * p;
      const m = self.canvas.width,
        f = self.canvas.height,
        g = (1 - p) * f,
        v = m + (u + 1) * c * m;
      let b = 0;
      const y = e + 1;
      if (y < self.waves.length) {
        const e = a * (n - y);
        b = (1 - dG(cG(i, e, e + r, 0, 1))) * f;
      }
      const _ = (u - 1) * c * m,
        x = _ + (v - _) * (.5 + .2 * i),
        w = Math.sin(p * Math.PI) * f * -d * o;
      t.fillStyle = h, t.beginPath(), t.moveTo(v, b), t.lineTo(_, b), t.lineTo(_, g), t.quadraticCurveTo(x, g + w, v, g), t.closePath(), t.fill();
    }
    self.previousNow = e, self.animationFrame = requestAnimationFrame(pG);
  }
}
function mG(e) {
  const {
    type: t,
    value: s
  } = e;
  "hide" === t ? (self.hidding.active = !0, self.hidding.duration = s) : "resize" === t ? uG(canvas, s.width, s.height) : "setup" === t && hG(s);
}
function fG(e = !1) {
  if (Object.assign(self, {
    previousNow: 0,
    canvas: null,
    context: null,
    progress: 0,
    width: 0,
    height: 0,
    hidding: {
      active: !1,
      duration: 1e3
    },
    waves: [{
      color: "rgb(255, 64, 96)",
      bleed: .3,
      offset: -.3,
      height: .9
    }, {
      color: "rgb(255, 214, 0)",
      bleed: .24,
      offset: 1,
      height: .75
    }, {
      color: "rgb(48, 220, 120)",
      bleed: .2,
      offset: -.3,
      height: .75
    }, {
      color: "rgb(112, 191, 228)",
      bleed: .5,
      offset: 0,
      height: .6
    }]
  }), !e) return {
    postMessage(e) {
      mG(e);
    },
    terminate() {
      cancelAnimationFrame(self.animationFrame);
    }
  };
  self.addEventListener("message", function ({
    data: e
  }) {
    mG(e);
  });
}
const gG = e => new Promise(t => setTimeout(t, e));
function vG(e, t) {
  const s = t.querySelector(".logo"),
    i = t.querySelector(".preloader-counter"),
    n = t.querySelector(".preloader-baseline"),
    a = t.querySelector(".waves"),
    r = t.querySelector(".preloader-foreground"),
    o = io();
  let l,
    c = 0,
    h = 0;
  const u = .01;
  function d() {
    const e = c - h,
      t = Math.min(e, u);
    let a = h + t;
    a > .99 && (a = 1), a !== h && (h = a, i.textContent = Math.floor(100 * h).toString().padStart(2, "0"), h >= 1 && (r.style.visibility = "hidden", l.hide(1800), o.resolve(), s.style.transition = "opacity 650ms", s.style.opacity = 0, i.style.transition = "opacity 450ms", i.style.opacity = 0, n.style.transition = "opacity 400ms", n.style.opacity = 0));
  }
  return {
    enter: function () {
      bc.add(d), l = new oG(a);
    },
    onProgress: function (e) {
      c = e;
    },
    exit: async function (e) {
      await o, e(), await gG(1900);
    },
    beforeDestroy: function () {
      bc.remove(d), l && l.dispose();
    }
  };
}
const bG = "undefined" != typeof window;
function yG(e) {
  if (bG) {
    if (!window.isOldBrowser) {
      const t = document;
      "l" === t.readyState[0] ? t.addEventListener("DOMContentLoaded", e) : e();
    }
  } else e();
}
function _G(e) {
  const t = Ma(e),
    s = t.config.globalProperties;
  var i;
  ov = i = t, lv = i.config.globalProperties, function (e) {
    const t = [],
      s = [],
      i = e.mount.bind(e);
    e.mount = async function (n, a) {
      for (const s of t) await s(e);
      i(n, a);
      for (const t of s) await t(e);
      s.length = t.length = 0;
    }.bind(e), e.onBeforeMount = function (e, s) {
      s ? t.unshift(e) : t.push(e);
    }, e.onAfterMount = function (e, t) {
      t ? s.unshift(e) : s.push(e);
    };
  }(t), t.provide("appProps", s), t.provide("plugins", s);
  const n = {
    getPlugin(e) {
      for (let t = 0; t < GU.length; t++) {
        const s = GU[t];
        if (s && (s[0] === e || s[1] === e)) return s;
      }
    },
    list: () => GU,
    setOptions(e, t) {
      const s = n.getPlugin(e);
      s && (s[2] = Object.assign(s[2], t));
    },
    add(e, t, s = {}) {
      t = t ?? "vueplugin-" + (Date.now() + Math.round(1e5 * Math.random())), n.getPlugin(t) || GU.push([e, t, s]);
    },
    remove(e) {
      for (let t = 0; t < GU.length; t++) {
        const s = GU[t];
        if (s && (s[0] === e || s[1] === e)) return void GU.splice(t, 1);
      }
    },
    install(e = {}) {
      const s = {},
        i = {};
      for (let t = 0; t < GU.length; t++) {
        const n = GU[t];
        i[n[0]] = n[1], s[n[0]] = Object.assign({}, n[2], e[n[0]]);
      }
      s.router = Object.assign({}, s.router, {
        routes: aG,
        basepath: rG()
      }), s.preloader = Object.assign({}, s.preloader, {
        preloaderComponent: vG
      });
      for (let n in i) t.use(i[n](s[n]));
      return t.config.globalProperties;
    }
  };
  return Object.assign(t, {
    usePreview: async function () {},
    onDOMReady: yG,
    pluginManager: n
  }), t;
}
import { SG, PG } from './font-observer-emitter.js';
export { gy as G, Gi as I, By as O, ty as a, CC as a$, dy as a8, _L as a9, Ft as aA, io as aC, VueTutorialComponent as aE, bb as aF, _G as aG, Wb as aH, yG as aI, $a as aJ, e as aK, PG as aL, CP as aM, KN as aN, yL as aO, mL as aP, _c as aQ, Po as aR, HA as aS, DA as aT, OM as aU, wP as aV, CM as aW, ML as aX, Pz as aY, GO as aZ, xk as a_, uy as ad, oy as ae, yy as ah, Zx as b0, bO as b1, Kl as b2, rz as b3, zz as b4, sP as b5, EC as b6, HC as b7, lB as b8, hB as b9, BL as bA, Vx as bB, aM as bC, ky as bD, Oo as bE, nB as bF, iB as bG, Hx as bH, Go as bI, Vo as bJ, co as bK, ls as bL, Iy as bM, Ww as bN, aS as bO, cA as bP, hA as bQ, hP as bR, kD as bX, tA as ba, iA as bb, sA as bc, Ty as bd, rC as be, jS as bf, qS as bg, py as bh, CF as bi, MF as bj, nM as bk, AC as bl, UA as bm, nL as bo, $k as bp, TL as bq, Dk as br, IL as bs, GL as bt, WL as bu, cP as bv, lP as bw, PP as bx, vy as by, OI as bz, qs as c, qD as c$, Nw as c2, hS as cA, rS as cB, nS as cC, Zb as cD, _z as cE, MP as cF, UU as cG, yI as cH, II as cI, AI as cJ, CI as cK, NN as cL, oB as cM, oo as cN, zL as cO, UL as cP, FL as cQ, Ro as cR, vC as cS, yP as cT, pL as cU, rL as cV, jM as cW, eR as cX, mR as cY, Sz as cZ, SG as c_, YE as cd, uP as ce, RP as cg, Hw as cl, jx as cs, iM as ct, lM as cx, Ll as d0, Il as d1, fy as d2, FD as d3, fA as d4, aL as d5, Xx as d6, Yx as d7, qx as d8, UR as d9, by as da, xL as db, on as f, rs as h, bc as i, hy as j, tc as s, hs as w, s_ as x, lo as y };
