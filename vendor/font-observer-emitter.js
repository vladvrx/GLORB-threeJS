// Extracted third-party code from supplied GLORB base. See THIRD_PARTY.md.
import { Sv } from "./crypto-js.js";
var xG = {
  exports: {}
};
function wG() {}
wG.prototype = {
  on: function (e, t, s) {
    var i = this.e || (this.e = {});
    return (i[e] || (i[e] = [])).push({
      fn: t,
      ctx: s
    }), this;
  },
  once: function (e, t, s) {
    var i = this;
    function n() {
      i.off(e, n), t.apply(s, arguments);
    }
    return n._ = t, this.on(e, n, s);
  },
  emit: function (e) {
    for (var t = [].slice.call(arguments, 1), s = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, n = s.length; i < n; i++) s[i].fn.apply(s[i].ctx, t);
    return this;
  },
  off: function (e, t) {
    var s = this.e || (this.e = {}),
      i = s[e],
      n = [];
    if (i && t) for (var a = 0, r = i.length; a < r; a++) i[a].fn !== t && i[a].fn._ !== t && n.push(i[a]);
    return n.length ? s[e] = n : delete s[e], this;
  }
}, xG.exports = wG;
var SG = xG.exports.TinyEmitter = wG;
const AG = Sv(xG.exports);
var MG,
  CG = {
    exports: {}
  };
MG = CG, function () {
  function e(e, t) {
    document.addEventListener ? e.addEventListener("scroll", t, !1) : e.attachEvent("scroll", t);
  }
  function t(e) {
    this.g = document.createElement("div"), this.g.setAttribute("aria-hidden", "true"), this.g.appendChild(document.createTextNode(e)), this.h = document.createElement("span"), this.i = document.createElement("span"), this.m = document.createElement("span"), this.j = document.createElement("span"), this.l = -1, this.h.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.i.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.j.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.m.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.h.appendChild(this.m), this.i.appendChild(this.j), this.g.appendChild(this.h), this.g.appendChild(this.i);
  }
  function s(e, t) {
    e.g.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + t + ";";
  }
  function i(e) {
    var t = e.g.offsetWidth,
      s = t + 100;
    return e.j.style.width = s + "px", e.i.scrollLeft = s, e.h.scrollLeft = e.h.scrollWidth + 100, e.l !== t && (e.l = t, !0);
  }
  function n(t, s) {
    function n() {
      var e = a;
      i(e) && null !== e.g.parentNode && s(e.l);
    }
    var a = t;
    e(t.h, n), e(t.i, n), i(t);
  }
  function a(e, t, s) {
    t = t || {}, s = s || window, this.family = e, this.style = t.style || "normal", this.weight = t.weight || "normal", this.stretch = t.stretch || "normal", this.context = s;
  }
  var r = null,
    o = null,
    l = null,
    c = null;
  function h(e) {
    return null === c && (c = !!e.document.fonts), c;
  }
  function u(e, t) {
    var s = e.style,
      i = e.weight;
    if (null === l) {
      var n = document.createElement("div");
      try {
        n.style.font = "condensed 100px sans-serif";
      } catch (a) {}
      l = "" !== n.style.font;
    }
    return [s, i, l ? e.stretch : "", "100px", t].join(" ");
  }
  a.prototype.load = function (e, i) {
    var a = this,
      l = e || "BESbswy",
      c = 0,
      d = i || 3e3,
      p = new Date().getTime();
    return new Promise(function (e, i) {
      if (h(a.context) && !function (e) {
        return null === o && (h(e) && /Apple/.test(window.navigator.vendor) ? (e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent), o = !!e && 603 > parseInt(e[1], 10)) : o = !1), o;
      }(a.context)) {
        var m = new Promise(function (e, t) {
            !function s() {
              new Date().getTime() - p >= d ? t(Error(d + "ms timeout exceeded")) : a.context.document.fonts.load(u(a, '"' + a.family + '"'), l).then(function (t) {
                1 <= t.length ? e() : setTimeout(s, 25);
              }, t);
            }();
          }),
          f = new Promise(function (e, t) {
            c = setTimeout(function () {
              t(Error(d + "ms timeout exceeded"));
            }, d);
          });
        Promise.race([f, m]).then(function () {
          clearTimeout(c), e(a);
        }, i);
      } else !function (e) {
        document.body ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function t() {
          document.removeEventListener("DOMContentLoaded", t), e();
        }) : document.attachEvent("onreadystatechange", function t() {
          "interactive" != document.readyState && "complete" != document.readyState || (document.detachEvent("onreadystatechange", t), e());
        });
      }(function () {
        function o() {
          var t;
          (t = -1 != g && -1 != v || -1 != g && -1 != b || -1 != v && -1 != b) && ((t = g != v && g != b && v != b) || (null === r && (t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), r = !!t && (536 > parseInt(t[1], 10) || 536 === parseInt(t[1], 10) && 11 >= parseInt(t[2], 10))), t = r && (g == y && v == y && b == y || g == _ && v == _ && b == _ || g == x && v == x && b == x)), t = !t), t && (null !== w.parentNode && w.parentNode.removeChild(w), clearTimeout(c), e(a));
        }
        var h = new t(l),
          m = new t(l),
          f = new t(l),
          g = -1,
          v = -1,
          b = -1,
          y = -1,
          _ = -1,
          x = -1,
          w = document.createElement("div");
        w.dir = "ltr", s(h, u(a, "sans-serif")), s(m, u(a, "serif")), s(f, u(a, "monospace")), w.appendChild(h.g), w.appendChild(m.g), w.appendChild(f.g), a.context.document.body.appendChild(w), y = h.g.offsetWidth, _ = m.g.offsetWidth, x = f.g.offsetWidth, function e() {
          if (new Date().getTime() - p >= d) null !== w.parentNode && w.parentNode.removeChild(w), i(Error(d + "ms timeout exceeded"));else {
            var t = a.context.document.hidden;
            !0 !== t && void 0 !== t || (g = h.g.offsetWidth, v = m.g.offsetWidth, b = f.g.offsetWidth, o()), c = setTimeout(e, 50);
          }
        }(), n(h, function (e) {
          g = e, o();
        }), s(h, u(a, '"' + a.family + '",sans-serif')), n(m, function (e) {
          v = e, o();
        }), s(m, u(a, '"' + a.family + '",serif')), n(f, function (e) {
          b = e, o();
        }), s(f, u(a, '"' + a.family + '",monospace'));
      });
    });
  }, MG.exports = a;
}();
const PG = Sv(CG.exports);
export { xG, wG, SG, AG, MG, CG, PG };
