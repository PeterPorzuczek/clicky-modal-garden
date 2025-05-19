    "data-component-path": "src/components/ui/toaster.tsx",
    "data-component-line": "9",
    "data-component-file": "toaster.tsx",
    "data-component-name": "ToastProvider",
    "data-component-content": "%7B%7D",
    children: [
      e.map(function ({ id: t, title: n, description: o, action: r, ...a }) {
        return d.jsxs(
          Dx,
          {
            "data-lov-id": "src/components/ui/toaster.tsx:18:10",
            "data-lov-name": "Toast",
            "data-component-path": "src/components/ui/toaster.tsx",
            "data-component-line": "18",
            "data-component-file": "toaster.tsx",
            "data-component-name": "Toast",
            "data-component-content": "%7B%7D",
            ...a,
            children: [
              d.jsxs("div", {
                "data-lov-id": "src/components/ui/toaster.tsx:19:12",
                "data-lov-name": "div",
                "data-component-path": "src/components/ui/toaster.tsx",
                "data-component-line": "19",
                "data-component-file": "toaster.tsx",
                "data-component-name": "div",
                "data-component-content":
                  "%7B%22className%22%3A%22grid%20gap-1%22%7D",
                className: "grid gap-1",
                children: [
                  n &&
                    d.jsx(Nx, {
                      "data-lov-id": "src/components/ui/toaster.tsx:20:24",
                      "data-lov-name": "ToastTitle",
                      "data-component-path": "src/components/ui/toaster.tsx",
                      "data-component-line": "20",
                      "data-component-file": "toaster.tsx",
                      "data-component-name": "ToastTitle",
                      "data-component-content": "%7B%7D",
                      children: n,
                    }),
                  o &&
                    d.jsx(Ox, {
                      "data-lov-id": "src/components/ui/toaster.tsx:22:16",
                      "data-lov-name": "ToastDescription",
                      "data-component-path": "src/components/ui/toaster.tsx",
                      "data-component-line": "22",
                      "data-component-file": "toaster.tsx",
                      "data-component-name": "ToastDescription",
                      "data-component-content": "%7B%7D",
                      children: o,
                    }),
                ],
              }),
              r,
              d.jsx(Ex, {
                "data-lov-id": "src/components/ui/toaster.tsx:26:12",
                "data-lov-name": "ToastClose",
                "data-component-path": "src/components/ui/toaster.tsx",
                "data-component-line": "26",
                "data-component-file": "toaster.tsx",
                "data-component-name": "ToastClose",
                "data-component-content": "%7B%7D",
              }),
            ],
          },
          t,
        );
      }),
      d.jsx(Ax, {
        "data-lov-id": "src/components/ui/toaster.tsx:30:6",
        "data-lov-name": "ToastViewport",
        "data-component-path": "src/components/ui/toaster.tsx",
        "data-component-line": "30",
        "data-component-file": "toaster.tsx",
        "data-component-name": "ToastViewport",
        "data-component-content": "%7B%7D",
      }),
    ],
  });
}
var Ec = "focusScope.autoFocusOnMount",
  Nc = "focusScope.autoFocusOnUnmount",
  th = { bubbles: !1, cancelable: !0 },
  vA = "FocusScope",
  Il = f.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: o = !1,
        onMountAutoFocus: r,
        onUnmountAutoFocus: a,
        ...s
      } = e,
      [i, l] = f.useState(null),
      c = Ue(r),
      u = Ue(a),
      m = f.useRef(null),
      p = re(t, (v) => l(v)),
      h = f.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    f.useEffect(() => {
      if (o) {
        let v = function (S) {
            if (h.paused || !i) return;
            const b = S.target;
            i.contains(b) ? (m.current = b) : kn(m.current, { select: !0 });
          },
          w = function (S) {
            if (h.paused || !i) return;
            const b = S.relatedTarget;
            b !== null && (i.contains(b) || kn(m.current, { select: !0 }));
          },
          y = function (S) {
            if (document.activeElement === document.body)
              for (const C of S) C.removedNodes.length > 0 && kn(i);
          };
        document.addEventListener("focusin", v),
          document.addEventListener("focusout", w);
        const x = new MutationObserver(y);
        return (
          i && x.observe(i, { childList: !0, subtree: !0 }),
          () => {
            document.removeEventListener("focusin", v),
              document.removeEventListener("focusout", w),
              x.disconnect();
          }
        );
      }
    }, [o, i, h.paused]),
      f.useEffect(() => {
        if (i) {
          oh.add(h);
          const v = document.activeElement;
          if (!i.contains(v)) {
            const y = new CustomEvent(Ec, th);
            i.addEventListener(Ec, c),
              i.dispatchEvent(y),
              y.defaultPrevented ||
                (gA(bA(Ix(i)), { select: !0 }),
                document.activeElement === v && kn(i));
          }
          return () => {
            i.removeEventListener(Ec, c),
              setTimeout(() => {
                const y = new CustomEvent(Nc, th);
                i.addEventListener(Nc, u),
                  i.dispatchEvent(y),
                  y.defaultPrevented || kn(v ?? document.body, { select: !0 }),
                  i.removeEventListener(Nc, u),
                  oh.remove(h);
              }, 0);
          };
        }
      }, [i, c, u, h]);
    const g = f.useCallback(
      (v) => {
        if ((!n && !o) || h.paused) return;
        const w = v.key === "Tab" && !v.altKey && !v.ctrlKey && !v.metaKey,
          y = document.activeElement;
        if (w && y) {
          const x = v.currentTarget,
            [S, b] = xA(x);
          S && b
            ? !v.shiftKey && y === b
              ? (v.preventDefault(), n && kn(S, { select: !0 }))
              : v.shiftKey &&
                y === S &&
                (v.preventDefault(), n && kn(b, { select: !0 }))
            : y === x && v.preventDefault();
        }
      },
      [n, o, h.paused],
    );
    return d.jsx(J.div, { tabIndex: -1, ...s, ref: p, onKeyDown: g });
  });
Il.displayName = vA;
function gA(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if ((kn(o, { select: t }), document.activeElement !== n)) return;
}
function xA(e) {
  const t = Ix(e),
    n = nh(t, e),
    o = nh(t.reverse(), e);
  return [n, o];
}
function Ix(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (o) => {
        const r = o.tagName === "INPUT" && o.type === "hidden";
        return o.disabled || o.hidden || r
          ? NodeFilter.FILTER_SKIP
          : o.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function nh(e, t) {
  for (const n of e) if (!yA(n, { upTo: t })) return n;
}
function yA(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function wA(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function kn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && wA(e) && t && e.select();
  }
}
var oh = SA();
function SA() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), (e = rh(e, t)), e.unshift(t);
    },
    remove(t) {
      var n;
      (e = rh(e, t)), (n = e[0]) == null || n.resume();
    },
  };
}
function rh(e, t) {
  const n = [...e],
    o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function bA(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Oc = 0;
function jm() {
  f.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? ah()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? ah()),
      Oc++,
      () => {
        Oc === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          Oc--;
      }
    );
  }, []);
}
function ah() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Qt = function () {
  return (
    (Qt =
      Object.assign ||
      function (t) {
        for (var n, o = 1, r = arguments.length; o < r; o++) {
          n = arguments[o];
          for (var a in n)
            Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
        }
        return t;
      }),
    Qt.apply(this, arguments)
  );
};
function Tx(e, t) {
  var n = {};
  for (var o in e)
    Object.prototype.hasOwnProperty.call(e, o) &&
      t.indexOf(o) < 0 &&
      (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
        (n[o[r]] = e[o[r]]);
  return n;
}
function CA(e, t, n) {
  if (n || arguments.length === 2)
    for (var o = 0, r = t.length, a; o < r; o++)
      (a || !(o in t)) &&
        (a || (a = Array.prototype.slice.call(t, 0, o)), (a[o] = t[o]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var gi = "right-scroll-bar-position",
  xi = "width-before-scroll-bar",
  kA = "with-scroll-bars-hidden",
  PA = "--removed-body-scroll-bar-size";
function Ic(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function _A(e, t) {
  var n = f.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(o) {
          var r = n.value;
          r !== o && ((n.value = o), n.callback(o, r));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
var AA = typeof window < "u" ? f.useLayoutEffect : f.useEffect,
  sh = new WeakMap();
function DA(e, t) {
  var n = _A(null, function (o) {
    return e.forEach(function (r) {
      return Ic(r, o);
    });
  });
  return (
    AA(
      function () {
        var o = sh.get(n);
        if (o) {
          var r = new Set(o),
            a = new Set(e),
            s = n.current;
          r.forEach(function (i) {
            a.has(i) || Ic(i, null);
          }),
            a.forEach(function (i) {
              r.has(i) || Ic(i, s);
            });
        }
        sh.set(n, e);
      },
      [e],
    ),
    n
  );
}
function EA(e) {
  return e;
}
function NA(e, t) {
  t === void 0 && (t = EA);
  var n = [],
    o = !1,
    r = {
      read: function () {
        if (o)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (a) {
        var s = t(a, o);
        return (
          n.push(s),
          function () {
            n = n.filter(function (i) {
              return i !== s;
            });
          }
        );
      },
      assignSyncMedium: function (a) {
        for (o = !0; n.length; ) {
          var s = n;
          (n = []), s.forEach(a);
        }
        n = {
          push: function (i) {
            return a(i);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (a) {
        o = !0;
        var s = [];
        if (n.length) {
          var i = n;
          (n = []), i.forEach(a), (s = n);
        }
        var l = function () {
            var u = s;
            (s = []), u.forEach(a);
          },
          c = function () {
            return Promise.resolve().then(l);
          };
        c(),
          (n = {
            push: function (u) {
              s.push(u), c();
            },
            filter: function (u) {
              return (s = s.filter(u)), n;
            },
          });
      },
    };
  return r;
}
function OA(e) {
  e === void 0 && (e = {});
  var t = NA(null);
  return (t.options = Qt({ async: !0, ssr: !1 }, e)), t;
}
var jx = function (e) {
  var t = e.sideCar,
    n = Tx(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var o = t.read();
  if (!o) throw new Error("Sidecar medium not found");
  return f.createElement(o, Qt({}, n));
};
jx.isSideCarExport = !0;
function IA(e, t) {
  return e.useMedium(t), jx;
}
var Rx = OA(),
  Tc = function () {},
  Tl = f.forwardRef(function (e, t) {
    var n = f.useRef(null),
      o = f.useState({
        onScrollCapture: Tc,
        onWheelCapture: Tc,
        onTouchMoveCapture: Tc,
      }),
      r = o[0],
      a = o[1],
      s = e.forwardProps,
      i = e.children,
      l = e.className,
      c = e.removeScrollBar,
      u = e.enabled,
      m = e.shards,
      p = e.sideCar,
      h = e.noIsolation,
      g = e.inert,
      v = e.allowPinchZoom,
      w = e.as,
      y = w === void 0 ? "div" : w,
      x = e.gapMode,
      S = Tx(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      b = p,
      C = DA([n, t]),
      D = Qt(Qt({}, S), r);
    return f.createElement(
      f.Fragment,
      null,
      u &&
        f.createElement(b, {
          sideCar: Rx,
          removeScrollBar: c,
          shards: m,
          noIsolation: h,
          inert: g,
          setCallbacks: a,
          allowPinchZoom: !!v,
          lockRef: n,
          gapMode: x,
        }),
      s
        ? f.cloneElement(f.Children.only(i), Qt(Qt({}, D), { ref: C }))
        : f.createElement(y, Qt({}, D, { className: l, ref: C }), i),
    );
  });
Tl.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Tl.classNames = { fullWidth: xi, zeroRight: gi };
var TA = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function jA() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = TA();
  return t && e.setAttribute("nonce", t), e;
}
function RA(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function MA(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var BA = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = jA()) && (RA(t, n), MA(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  LA = function () {
    var e = BA();
    return function (t, n) {
      f.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  Mx = function () {
    var e = LA(),
      t = function (n) {
        var o = n.styles,
          r = n.dynamic;
        return e(o, r), null;
      };
    return t;
  },
  $A = { left: 0, top: 0, right: 0, gap: 0 },
  jc = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  FA = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      o = t[e === "padding" ? "paddingTop" : "marginTop"],
      r = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [jc(n), jc(o), jc(r)];
  },
  UA = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return $A;
    var t = FA(e),
      n = document.documentElement.clientWidth,
      o = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, o - n + t[2] - t[0]),
    };
  },
  zA = Mx(),
  vr = "data-scroll-locked",
  VA = function (e, t, n, o) {
    var r = e.left,
      a = e.top,
      s = e.right,
      i = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          kA,
          ` {
   overflow: hidden `,
        )
        .concat(
          o,
          `;
   padding-right: `,
        )
        .concat(i, "px ")
        .concat(
          o,
          `;
  }
  body[`,
        )
        .concat(
          vr,
          `] {
    overflow: hidden `,
        )
        .concat(
          o,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(o, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  r,
                  `px;
    padding-top: `,
                )
                .concat(
                  a,
                  `px;
    padding-right: `,
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(i, "px ")
                .concat(
                  o,
                  `;
    `,
                ),
            n === "padding" &&
              "padding-right: ".concat(i, "px ").concat(o, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          gi,
          ` {
    right: `,
        )
        .concat(i, "px ")
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(
          xi,
          ` {
    margin-right: `,
        )
        .concat(i, "px ")
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(gi, " .")
        .concat(
          gi,
          ` {
    right: 0 `,
        )
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(xi, " .")
        .concat(
          xi,
          ` {
    margin-right: 0 `,
        )
        .concat(
          o,
          `;
  }
  
  body[`,
        )
        .concat(
          vr,
          `] {
    `,
        )
        .concat(PA, ": ")
        .concat(
          i,
          `px;
  }
`,
        )
    );
  },
  ih = function () {
    var e = parseInt(document.body.getAttribute(vr) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  WA = function () {
    f.useEffect(function () {
      return (
        document.body.setAttribute(vr, (ih() + 1).toString()),
        function () {
          var e = ih() - 1;
          e <= 0
            ? document.body.removeAttribute(vr)
            : document.body.setAttribute(vr, e.toString());
        }
      );
    }, []);
  },
  GA = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      o = e.gapMode,
      r = o === void 0 ? "margin" : o;
    WA();
    var a = f.useMemo(
      function () {
        return UA(r);
      },
      [r],
    );
    return f.createElement(zA, { styles: VA(a, !t, r, n ? "" : "!important") });
  },
  Qd = !1;
if (typeof window < "u")
  try {
    var Ks = Object.defineProperty({}, "passive", {
      get: function () {
        return (Qd = !0), !0;
      },
    });
    window.addEventListener("test", Ks, Ks),
      window.removeEventListener("test", Ks, Ks);
  } catch {
    Qd = !1;
  }
var zo = Qd ? { passive: !1 } : !1,
  HA = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Bx = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !HA(e) && n[t] === "visible")
    );
  },
  KA = function (e) {
    return Bx(e, "overflowY");
  },
  qA = function (e) {
    return Bx(e, "overflowX");
  },
  lh = function (e, t) {
    var n = t.ownerDocument,
      o = t;
    do {
      typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
      var r = Lx(e, o);
      if (r) {
        var a = $x(e, o),
          s = a[1],
          i = a[2];
        if (s > i) return !0;
      }
      o = o.parentNode;
    } while (o && o !== n.body);
    return !1;
  },
  QA = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      o = e.clientHeight;
    return [t, n, o];
  },
  JA = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      o = e.clientWidth;
    return [t, n, o];
  },
  Lx = function (e, t) {
    return e === "v" ? KA(t) : qA(t);
  },
  $x = function (e, t) {
    return e === "v" ? QA(t) : JA(t);
  },
  YA = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  XA = function (e, t, n, o, r) {
    var a = YA(e, window.getComputedStyle(t).direction),
      s = a * o,
      i = n.target,
      l = t.contains(i),
      c = !1,
      u = s > 0,
      m = 0,
      p = 0;
    do {
      var h = $x(e, i),
        g = h[0],
        v = h[1],
        w = h[2],
        y = v - w - a * g;
      (g || y) && Lx(e, i) && ((m += y), (p += g)),
        i instanceof ShadowRoot ? (i = i.host) : (i = i.parentNode);
    } while ((!l && i !== document.body) || (l && (t.contains(i) || t === i)));
    return (
      ((u && (Math.abs(m) < 1 || !r)) || (!u && (Math.abs(p) < 1 || !r))) &&
        (c = !0),
      c
    );
  },
  qs = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  ch = function (e) {
    return [e.deltaX, e.deltaY];
  },
  dh = function (e) {
    return e && "current" in e ? e.current : e;
  },
  ZA = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  eD = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  tD = 0,
  Vo = [];
function nD(e) {
  var t = f.useRef([]),
    n = f.useRef([0, 0]),
    o = f.useRef(),
    r = f.useState(tD++)[0],
    a = f.useState(Mx)[0],
    s = f.useRef(e);
  f.useEffect(
    function () {
      s.current = e;
    },
    [e],
  ),
    f.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(r));
          var v = CA([e.lockRef.current], (e.shards || []).map(dh), !0).filter(
            Boolean,
          );
          return (
            v.forEach(function (w) {
              return w.classList.add("allow-interactivity-".concat(r));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(r)),
                v.forEach(function (w) {
                  return w.classList.remove("allow-interactivity-".concat(r));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    );
  var i = f.useCallback(function (v, w) {
      if (
        ("touches" in v && v.touches.length === 2) ||
        (v.type === "wheel" && v.ctrlKey)
      )
        return !s.current.allowPinchZoom;
      var y = qs(v),
        x = n.current,
        S = "deltaX" in v ? v.deltaX : x[0] - y[0],
        b = "deltaY" in v ? v.deltaY : x[1] - y[1],
        C,
        D = v.target,
        A = Math.abs(S) > Math.abs(b) ? "h" : "v";
      if ("touches" in v && A === "h" && D.type === "range") return !1;
      var E = lh(A, D);
      if (!E) return !0;
      if ((E ? (C = A) : ((C = A === "v" ? "h" : "v"), (E = lh(A, D))), !E))
        return !1;
      if (
        (!o.current && "changedTouches" in v && (S || b) && (o.current = C), !C)
      )
        return !0;
      var L = o.current || C;
      return XA(L, w, v, L === "h" ? S : b, !0);
    }, []),
    l = f.useCallback(function (v) {
      var w = v;
      if (!(!Vo.length || Vo[Vo.length - 1] !== a)) {
        var y = "deltaY" in w ? ch(w) : qs(w),
          x = t.current.filter(function (C) {
            return (
              C.name === w.type &&
              (C.target === w.target || w.target === C.shadowParent) &&
              ZA(C.delta, y)
            );
          })[0];
        if (x && x.should) {
          w.cancelable && w.preventDefault();
          return;
        }
        if (!x) {
          var S = (s.current.shards || [])
              .map(dh)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(w.target);
              }),
            b = S.length > 0 ? i(w, S[0]) : !s.current.noIsolation;
          b && w.cancelable && w.preventDefault();
        }
      }
    }, []),
    c = f.useCallback(function (v, w, y, x) {
      var S = { name: v, delta: w, target: y, should: x, shadowParent: oD(y) };
      t.current.push(S),
        setTimeout(function () {
          t.current = t.current.filter(function (b) {
            return b !== S;
          });
        }, 1);
    }, []),
    u = f.useCallback(function (v) {
      (n.current = qs(v)), (o.current = void 0);
    }, []),
    m = f.useCallback(function (v) {
      c(v.type, ch(v), v.target, i(v, e.lockRef.current));
    }, []),
    p = f.useCallback(function (v) {
      c(v.type, qs(v), v.target, i(v, e.lockRef.current));
    }, []);
  f.useEffect(function () {
    return (
      Vo.push(a),
      e.setCallbacks({
        onScrollCapture: m,
        onWheelCapture: m,
        onTouchMoveCapture: p,
      }),
      document.addEventListener("wheel", l, zo),
      document.addEventListener("touchmove", l, zo),
      document.addEventListener("touchstart", u, zo),
      function () {
        (Vo = Vo.filter(function (v) {
          return v !== a;
        })),
          document.removeEventListener("wheel", l, zo),
          document.removeEventListener("touchmove", l, zo),
          document.removeEventListener("touchstart", u, zo);
      }
    );
  }, []);
  var h = e.removeScrollBar,
    g = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    g ? f.createElement(a, { styles: eD(r) }) : null,
    h ? f.createElement(GA, { gapMode: e.gapMode }) : null,
  );
}
function oD(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
  return t;
}
const rD = IA(Rx, nD);
var jl = f.forwardRef(function (e, t) {
  return f.createElement(Tl, Qt({}, e, { ref: t, sideCar: rD }));
});
jl.classNames = Tl.classNames;
var aD = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  Wo = new WeakMap(),
  Qs = new WeakMap(),
  Js = {},
  Rc = 0,
  Fx = function (e) {
    return e && (e.host || Fx(e.parentNode));
  },
  sD = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var o = Fx(n);
        return o && e.contains(o)
          ? o
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  iD = function (e, t, n, o) {
    var r = sD(t, Array.isArray(e) ? e : [e]);
    Js[n] || (Js[n] = new WeakMap());
    var a = Js[n],
      s = [],
      i = new Set(),
      l = new Set(r),
      c = function (m) {
        !m || i.has(m) || (i.add(m), c(m.parentNode));
      };
    r.forEach(c);
    var u = function (m) {
      !m ||
        l.has(m) ||
        Array.prototype.forEach.call(m.children, function (p) {
          if (i.has(p)) u(p);
          else
            try {
              var h = p.getAttribute(o),
                g = h !== null && h !== "false",
                v = (Wo.get(p) || 0) + 1,
                w = (a.get(p) || 0) + 1;
              Wo.set(p, v),
                a.set(p, w),
                s.push(p),
                v === 1 && g && Qs.set(p, !0),
                w === 1 && p.setAttribute(n, "true"),
                g || p.setAttribute(o, "true");
            } catch (y) {
              console.error("aria-hidden: cannot operate on ", p, y);
            }
        });
    };
    return (
      u(t),
      i.clear(),
      Rc++,
      function () {
        s.forEach(function (m) {
          var p = Wo.get(m) - 1,
            h = a.get(m) - 1;
          Wo.set(m, p),
            a.set(m, h),
            p || (Qs.has(m) || m.removeAttribute(o), Qs.delete(m)),
            h || m.removeAttribute(n);
        }),
          Rc--,
          Rc ||
            ((Wo = new WeakMap()),
            (Wo = new WeakMap()),
            (Qs = new WeakMap()),
            (Js = {}));
      }
    );
  },
  Rm = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var o = Array.from(Array.isArray(e) ? e : [e]),
      r = aD(e);
    return r
      ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live]"))),
        iD(o, r, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  Mm = "Dialog",
  [Ux, GT] = en(Mm),
  [lD, Ft] = Ux(Mm),
  zx = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: o,
        defaultOpen: r,
        onOpenChange: a,
        modal: s = !0,
      } = e,
      i = f.useRef(null),
      l = f.useRef(null),
      [c = !1, u] = xn({ prop: o, defaultProp: r, onChange: a });
    return d.jsx(lD, {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Xt(),
      titleId: Xt(),
      descriptionId: Xt(),
      open: c,
      onOpenChange: u,
      onOpenToggle: f.useCallback(() => u((m) => !m), [u]),
      modal: s,
      children: n,
    });
  };
zx.displayName = Mm;
var Vx = "DialogTrigger",
  cD = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...o } = e,
      r = Ft(Vx, n),
      a = re(t, r.triggerRef);
    return d.jsx(J.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": r.open,
      "aria-controls": r.contentId,
      "data-state": $m(r.open),
      ...o,
      ref: a,
      onClick: V(e.onClick, r.onOpenToggle),
    });
  });
cD.displayName = Vx;
var Bm = "DialogPortal",
  [dD, Wx] = Ux(Bm, { forceMount: void 0 }),
  Gx = (e) => {
    const { __scopeDialog: t, forceMount: n, children: o, container: r } = e,
      a = Ft(Bm, t);
    return d.jsx(dD, {
      scope: t,
      forceMount: n,
      children: f.Children.map(o, (s) =>
        d.jsx(vt, {
          present: n || a.open,
          children: d.jsx(hs, { asChild: !0, container: r, children: s }),
        }),
      ),
    });
  };
Gx.displayName = Bm;
var Ji = "DialogOverlay",
  Hx = f.forwardRef((e, t) => {
    const n = Wx(Ji, e.__scopeDialog),
      { forceMount: o = n.forceMount, ...r } = e,
      a = Ft(Ji, e.__scopeDialog);
    return a.modal
      ? d.jsx(vt, {
          present: o || a.open,
          children: d.jsx(uD, { ...r, ref: t }),
        })
      : null;
  });
Hx.displayName = Ji;
var uD = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...o } = e,
      r = Ft(Ji, n);
    return d.jsx(jl, {
      as: Xn,
      allowPinchZoom: !0,
      shards: [r.contentRef],
      children: d.jsx(J.div, {
        "data-state": $m(r.open),
        ...o,
        ref: t,
        style: { pointerEvents: "auto", ...o.style },
      }),
    });
  }),
  To = "DialogContent",
  Kx = f.forwardRef((e, t) => {
    const n = Wx(To, e.__scopeDialog),
      { forceMount: o = n.forceMount, ...r } = e,
      a = Ft(To, e.__scopeDialog);
    return d.jsx(vt, {
      present: o || a.open,
      children: a.modal
        ? d.jsx(mD, { ...r, ref: t })
        : d.jsx(pD, { ...r, ref: t }),
    });
  });
Kx.displayName = To;
var mD = f.forwardRef((e, t) => {
    const n = Ft(To, e.__scopeDialog),
      o = f.useRef(null),
      r = re(t, n.contentRef, o);
    return (
      f.useEffect(() => {
        const a = o.current;
        if (a) return Rm(a);
      }, []),
      d.jsx(qx, {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: V(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent,
            i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: V(e.onFocusOutside, (a) => a.preventDefault()),
      })
    );
  }),
  pD = f.forwardRef((e, t) => {
    const n = Ft(To, e.__scopeDialog),
      o = f.useRef(!1),
      r = f.useRef(!1);
    return d.jsx(qx, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (a) => {
        var s, i;
        (s = e.onCloseAutoFocus) == null || s.call(e, a),
          a.defaultPrevented ||
            (o.current || (i = n.triggerRef.current) == null || i.focus(),
            a.preventDefault()),
          (o.current = !1),
          (r.current = !1);
      },
      onInteractOutside: (a) => {
        var l, c;
        (l = e.onInteractOutside) == null || l.call(e, a),
          a.defaultPrevented ||
            ((o.current = !0),
            a.detail.originalEvent.type === "pointerdown" && (r.current = !0));
        const s = a.target;
        ((c = n.triggerRef.current) == null ? void 0 : c.contains(s)) &&
          a.preventDefault(),
          a.detail.originalEvent.type === "focusin" &&
            r.current &&
            a.preventDefault();
      },
    });
  }),
  qx = f.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: o,
        onOpenAutoFocus: r,
        onCloseAutoFocus: a,
        ...s
      } = e,
      i = Ft(To, n),
      l = f.useRef(null),
      c = re(t, l);
    return (
      jm(),
      d.jsxs(d.Fragment, {
        children: [
          d.jsx(Il, {
            asChild: !0,
            loop: !0,
            trapped: o,
            onMountAutoFocus: r,
            onUnmountAutoFocus: a,
            children: d.jsx(zr, {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": $m(i.open),
              ...s,
              ref: c,
              onDismiss: () => i.onOpenChange(!1),
            }),
          }),
          d.jsxs(d.Fragment, {
            children: [
              d.jsx(fD, { titleId: i.titleId }),
              d.jsx(vD, { contentRef: l, descriptionId: i.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Lm = "DialogTitle",
  Qx = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...o } = e,
      r = Ft(Lm, n);
    return d.jsx(J.h2, { id: r.titleId, ...o, ref: t });
  });
Qx.displayName = Lm;
var Jx = "DialogDescription",
  Yx = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...o } = e,
      r = Ft(Jx, n);
    return d.jsx(J.p, { id: r.descriptionId, ...o, ref: t });
  });
Yx.displayName = Jx;
var Xx = "DialogClose",
  Zx = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...o } = e,
      r = Ft(Xx, n);
    return d.jsx(J.button, {
      type: "button",
      ...o,
      ref: t,
      onClick: V(e.onClick, () => r.onOpenChange(!1)),
    });
  });
Zx.displayName = Xx;
function $m(e) {
  return e ? "open" : "closed";
}
var e0 = "DialogTitleWarning",
  [HT, t0] = Gb(e0, { contentName: To, titleName: Lm, docsSlug: "dialog" }),
  fD = ({ titleId: e }) => {
    const t = t0(e0),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      f.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  hD = "DialogDescriptionWarning",
  vD = ({ contentRef: e, descriptionId: t }) => {
    const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${t0(hD).contentName}}.`;
    return (
      f.useEffect(() => {
        var a;
        const r =
          (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
        t && r && (document.getElementById(t) || console.warn(o));
      }, [o, e, t]),
      null
    );
  },
  gD = zx,
  xD = Gx,
  n0 = Hx,
  o0 = Kx,
  r0 = Qx,
  a0 = Yx,
  s0 = Zx;
const yD = gD,
  wD = xD,
  i0 = s0,
  l0 = f.forwardRef(({ className: e, ...t }, n) =>
    d.jsx(n0, {
      "data-lov-id": "src/components/ui/dialog.tsx:20:2",
      "data-lov-name": "DialogPrimitive.Overlay",
