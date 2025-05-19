      "data-component-path": "src/contexts/AuthContext.tsx",
      "data-component-line": "127",
      "data-component-file": "AuthContext.tsx",
      "data-component-name": "AuthContext.Provider",
      "data-component-content": "%7B%7D",
      value: {
        user: t,
        session: o,
        signIn: c,
        signUp: l,
        signOut: u,
        loading: a,
      },
      children: e,
    });
  },
  ew = () => {
    const e = f.useContext(Zy);
    if (e === void 0)
      throw new Error("useAuth must be used within an AuthProvider");
    return e;
  };
var mu = ["Enter", " "],
  hI = ["ArrowDown", "PageUp", "Home"],
  tw = ["ArrowUp", "PageDown", "End"],
  vI = [...hI, ...tw],
  gI = { ltr: [...mu, "ArrowRight"], rtl: [...mu, "ArrowLeft"] },
  xI = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  bs = "Menu",
  [as, yI, wI] = Dl(bs),
  [$o, nw] = en(bs, [wI, Gr, Jr]),
  Hl = Gr(),
  ow = Jr(),
  [SI, Fo] = $o(bs),
  [bI, Cs] = $o(bs),
  rw = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: o,
        dir: r,
        onOpenChange: a,
        modal: s = !0,
      } = e,
      i = Hl(t),
      [l, c] = f.useState(null),
      u = f.useRef(!1),
      m = Ue(a),
      p = xs(r);
    return (
      f.useEffect(() => {
        const h = () => {
            (u.current = !0),
              document.addEventListener("pointerdown", g, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", g, {
                capture: !0,
                once: !0,
              });
          },
          g = () => (u.current = !1);
        return (
          document.addEventListener("keydown", h, { capture: !0 }),
          () => {
            document.removeEventListener("keydown", h, { capture: !0 }),
              document.removeEventListener("pointerdown", g, { capture: !0 }),
              document.removeEventListener("pointermove", g, { capture: !0 });
          }
        );
      }, []),
      d.jsx(bg, {
        ...i,
        children: d.jsx(SI, {
          scope: t,
          open: n,
          onOpenChange: m,
          content: l,
          onContentChange: c,
          children: d.jsx(bI, {
            scope: t,
            onClose: f.useCallback(() => m(!1), [m]),
            isUsingKeyboardRef: u,
            dir: p,
            modal: s,
            children: o,
          }),
        }),
      })
    );
  };
rw.displayName = bs;
var CI = "MenuAnchor",
  ep = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      r = Hl(n);
    return d.jsx(bm, { ...r, ...o, ref: t });
  });
ep.displayName = CI;
var tp = "MenuPortal",
  [kI, aw] = $o(tp, { forceMount: void 0 }),
  sw = (e) => {
    const { __scopeMenu: t, forceMount: n, children: o, container: r } = e,
      a = Fo(tp, t);
    return d.jsx(kI, {
      scope: t,
      forceMount: n,
      children: d.jsx(vt, {
        present: n || a.open,
        children: d.jsx(hs, { asChild: !0, container: r, children: o }),
      }),
    });
  };
sw.displayName = tp;
var bt = "MenuContent",
  [PI, np] = $o(bt),
  iw = f.forwardRef((e, t) => {
    const n = aw(bt, e.__scopeMenu),
      { forceMount: o = n.forceMount, ...r } = e,
      a = Fo(bt, e.__scopeMenu),
      s = Cs(bt, e.__scopeMenu);
    return d.jsx(as.Provider, {
      scope: e.__scopeMenu,
      children: d.jsx(vt, {
        present: o || a.open,
        children: d.jsx(as.Slot, {
          scope: e.__scopeMenu,
          children: s.modal
            ? d.jsx(_I, { ...r, ref: t })
            : d.jsx(AI, { ...r, ref: t }),
        }),
      }),
    });
  }),
  _I = f.forwardRef((e, t) => {
    const n = Fo(bt, e.__scopeMenu),
      o = f.useRef(null),
      r = re(t, o);
    return (
      f.useEffect(() => {
        const a = o.current;
        if (a) return Rm(a);
      }, []),
      d.jsx(op, {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: V(e.onFocusOutside, (a) => a.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  AI = f.forwardRef((e, t) => {
    const n = Fo(bt, e.__scopeMenu);
    return d.jsx(op, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  op = f.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: o = !1,
        trapFocus: r,
        onOpenAutoFocus: a,
        onCloseAutoFocus: s,
        disableOutsidePointerEvents: i,
        onEntryFocus: l,
        onEscapeKeyDown: c,
        onPointerDownOutside: u,
        onFocusOutside: m,
        onInteractOutside: p,
        onDismiss: h,
        disableOutsideScroll: g,
        ...v
      } = e,
      w = Fo(bt, n),
      y = Cs(bt, n),
      x = Hl(n),
      S = ow(n),
      b = yI(n),
      [C, D] = f.useState(null),
      A = f.useRef(null),
      E = re(t, A, w.onContentChange),
      L = f.useRef(0),
      $ = f.useRef(""),
      W = f.useRef(0),
      U = f.useRef(null),
      q = f.useRef("right"),
      M = f.useRef(0),
      I = g ? jl : f.Fragment,
      R = g ? { as: Xn, allowPinchZoom: !0 } : void 0,
      T = (k) => {
        var G, te;
        const N = $.current + k,
          _ = b().filter((ue) => !ue.disabled),
          O = document.activeElement,
          B =
            (G = _.find((ue) => ue.ref.current === O)) == null
              ? void 0
              : G.textValue,
          z = _.map((ue) => ue.textValue),
          K = $I(z, N, B),
          Q =
            (te = _.find((ue) => ue.textValue === K)) == null
              ? void 0
              : te.ref.current;
        (function ue(se) {
          ($.current = se),
            window.clearTimeout(L.current),
            se !== "" && (L.current = window.setTimeout(() => ue(""), 1e3));
        })(N),
          Q && setTimeout(() => Q.focus());
      };
    f.useEffect(() => () => window.clearTimeout(L.current), []), jm();
    const P = f.useCallback((k) => {
      var _, O;
      return (
        q.current === ((_ = U.current) == null ? void 0 : _.side) &&
        UI(k, (O = U.current) == null ? void 0 : O.area)
      );
    }, []);
    return d.jsx(PI, {
      scope: n,
      searchRef: $,
      onItemEnter: f.useCallback(
        (k) => {
          P(k) && k.preventDefault();
        },
        [P],
      ),
      onItemLeave: f.useCallback(
        (k) => {
          var N;
          P(k) || ((N = A.current) == null || N.focus(), D(null));
        },
        [P],
      ),
      onTriggerLeave: f.useCallback(
        (k) => {
          P(k) && k.preventDefault();
        },
        [P],
      ),
      pointerGraceTimerRef: W,
      onPointerGraceIntentChange: f.useCallback((k) => {
        U.current = k;
      }, []),
      children: d.jsx(I, {
        ...R,
        children: d.jsx(Il, {
          asChild: !0,
          trapped: r,
          onMountAutoFocus: V(a, (k) => {
            var N;
            k.preventDefault(),
              (N = A.current) == null || N.focus({ preventScroll: !0 });
          }),
          onUnmountAutoFocus: s,
          children: d.jsx(zr, {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onEscapeKeyDown: c,
            onPointerDownOutside: u,
            onFocusOutside: m,
            onInteractOutside: p,
            onDismiss: h,
            children: d.jsx(Wm, {
              asChild: !0,
              ...S,
              dir: y.dir,
              orientation: "vertical",
              loop: o,
              currentTabStopId: C,
              onCurrentTabStopIdChange: D,
              onEntryFocus: V(l, (k) => {
                y.isUsingKeyboardRef.current || k.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: d.jsx(Cm, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": Cw(w.open),
                "data-radix-menu-content": "",
                dir: y.dir,
                ...x,
                ...v,
                ref: E,
                style: { outline: "none", ...v.style },
                onKeyDown: V(v.onKeyDown, (k) => {
                  const _ =
                      k.target.closest("[data-radix-menu-content]") ===
                      k.currentTarget,
                    O = k.ctrlKey || k.altKey || k.metaKey,
                    B = k.key.length === 1;
                  _ &&
                    (k.key === "Tab" && k.preventDefault(),
                    !O && B && T(k.key));
                  const z = A.current;
                  if (k.target !== z || !vI.includes(k.key)) return;
                  k.preventDefault();
                  const Q = b()
                    .filter((G) => !G.disabled)
                    .map((G) => G.ref.current);
                  tw.includes(k.key) && Q.reverse(), BI(Q);
                }),
                onBlur: V(e.onBlur, (k) => {
                  k.currentTarget.contains(k.target) ||
                    (window.clearTimeout(L.current), ($.current = ""));
                }),
                onPointerMove: V(
                  e.onPointerMove,
                  ss((k) => {
                    const N = k.target,
                      _ = M.current !== k.clientX;
                    if (k.currentTarget.contains(N) && _) {
                      const O = k.clientX > M.current ? "right" : "left";
                      (q.current = O), (M.current = k.clientX);
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
iw.displayName = bt;
var DI = "MenuGroup",
  rp = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return d.jsx(J.div, { role: "group", ...o, ref: t });
  });
rp.displayName = DI;
var EI = "MenuLabel",
  lw = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return d.jsx(J.div, { ...o, ref: t });
  });
lw.displayName = EI;
var Zi = "MenuItem",
  Nh = "menu.itemSelect",
  Kl = f.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e,
      a = f.useRef(null),
      s = Cs(Zi, e.__scopeMenu),
      i = np(Zi, e.__scopeMenu),
      l = re(t, a),
      c = f.useRef(!1),
      u = () => {
        const m = a.current;
        if (!n && m) {
          const p = new CustomEvent(Nh, { bubbles: !0, cancelable: !0 });
          m.addEventListener(Nh, (h) => (o == null ? void 0 : o(h)), {
            once: !0,
          }),
            um(m, p),
            p.defaultPrevented ? (c.current = !1) : s.onClose();
        }
      };
    return d.jsx(cw, {
      ...r,
      ref: l,
      disabled: n,
      onClick: V(e.onClick, u),
      onPointerDown: (m) => {
        var p;
        (p = e.onPointerDown) == null || p.call(e, m), (c.current = !0);
      },
      onPointerUp: V(e.onPointerUp, (m) => {
        var p;
        c.current || (p = m.currentTarget) == null || p.click();
      }),
      onKeyDown: V(e.onKeyDown, (m) => {
        const p = i.searchRef.current !== "";
        n ||
          (p && m.key === " ") ||
          (mu.includes(m.key) && (m.currentTarget.click(), m.preventDefault()));
      }),
    });
  });
Kl.displayName = Zi;
var cw = f.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...a } = e,
      s = np(Zi, n),
      i = ow(n),
      l = f.useRef(null),
      c = re(t, l),
      [u, m] = f.useState(!1),
      [p, h] = f.useState("");
    return (
      f.useEffect(() => {
        const g = l.current;
        g && h((g.textContent ?? "").trim());
      }, [a.children]),
      d.jsx(as.ItemSlot, {
        scope: n,
        disabled: o,
        textValue: r ?? p,
        children: d.jsx(Gm, {
          asChild: !0,
          ...i,
          focusable: !o,
          children: d.jsx(J.div, {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...a,
            ref: c,
            onPointerMove: V(
              e.onPointerMove,
              ss((g) => {
                o
                  ? s.onItemLeave(g)
                  : (s.onItemEnter(g),
                    g.defaultPrevented ||
                      g.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: V(
              e.onPointerLeave,
              ss((g) => s.onItemLeave(g)),
            ),
            onFocus: V(e.onFocus, () => m(!0)),
            onBlur: V(e.onBlur, () => m(!1)),
          }),
        }),
      })
    );
  }),
  NI = "MenuCheckboxItem",
  dw = f.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return d.jsx(hw, {
      scope: e.__scopeMenu,
      checked: n,
      children: d.jsx(Kl, {
        role: "menuitemcheckbox",
        "aria-checked": el(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": sp(n),
        onSelect: V(
          r.onSelect,
          () => (o == null ? void 0 : o(el(n) ? !0 : !n)),
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
dw.displayName = NI;
var uw = "MenuRadioGroup",
  [OI, II] = $o(uw, { value: void 0, onValueChange: () => {} }),
  mw = f.forwardRef((e, t) => {
    const { value: n, onValueChange: o, ...r } = e,
      a = Ue(o);
    return d.jsx(OI, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: a,
      children: d.jsx(rp, { ...r, ref: t }),
    });
  });
mw.displayName = uw;
var pw = "MenuRadioItem",
  fw = f.forwardRef((e, t) => {
    const { value: n, ...o } = e,
      r = II(pw, e.__scopeMenu),
      a = n === r.value;
    return d.jsx(hw, {
      scope: e.__scopeMenu,
      checked: a,
      children: d.jsx(Kl, {
        role: "menuitemradio",
        "aria-checked": a,
        ...o,
        ref: t,
        "data-state": sp(a),
        onSelect: V(
          o.onSelect,
          () => {
            var s;
            return (s = r.onValueChange) == null ? void 0 : s.call(r, n);
          },
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
fw.displayName = pw;
var ap = "MenuItemIndicator",
  [hw, TI] = $o(ap, { checked: !1 }),
  vw = f.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e,
      a = TI(ap, n);
    return d.jsx(vt, {
      present: o || el(a.checked) || a.checked === !0,
      children: d.jsx(J.span, { ...r, ref: t, "data-state": sp(a.checked) }),
    });
  });
vw.displayName = ap;
var jI = "MenuSeparator",
  gw = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return d.jsx(J.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...o,
      ref: t,
    });
  });
gw.displayName = jI;
var RI = "MenuArrow",
  xw = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      r = Hl(n);
    return d.jsx(km, { ...r, ...o, ref: t });
  });
xw.displayName = RI;
var MI = "MenuSub",
  [s3, yw] = $o(MI),
  wa = "MenuSubTrigger",
  ww = f.forwardRef((e, t) => {
    const n = Fo(wa, e.__scopeMenu),
      o = Cs(wa, e.__scopeMenu),
      r = yw(wa, e.__scopeMenu),
      a = np(wa, e.__scopeMenu),
      s = f.useRef(null),
      { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = a,
      c = { __scopeMenu: e.__scopeMenu },
      u = f.useCallback(() => {
        s.current && window.clearTimeout(s.current), (s.current = null);
      }, []);
    return (
      f.useEffect(() => u, [u]),
      f.useEffect(() => {
        const m = i.current;
        return () => {
          window.clearTimeout(m), l(null);
        };
      }, [i, l]),
      d.jsx(ep, {
        asChild: !0,
        ...c,
        children: d.jsx(cw, {
          id: r.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": r.contentId,
          "data-state": Cw(n.open),
          ...e,
          ref: gl(t, r.onTriggerChange),
          onClick: (m) => {
            var p;
            (p = e.onClick) == null || p.call(e, m),
              !(e.disabled || m.defaultPrevented) &&
                (m.currentTarget.focus(), n.open || n.onOpenChange(!0));
          },
          onPointerMove: V(
            e.onPointerMove,
            ss((m) => {
              a.onItemEnter(m),
                !m.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !s.current &&
                  (a.onPointerGraceIntentChange(null),
                  (s.current = window.setTimeout(() => {
                    n.onOpenChange(!0), u();
                  }, 100)));
            }),
          ),
          onPointerLeave: V(
            e.onPointerLeave,
            ss((m) => {
              var h, g;
              u();
              const p =
                (h = n.content) == null ? void 0 : h.getBoundingClientRect();
              if (p) {
                const v = (g = n.content) == null ? void 0 : g.dataset.side,
                  w = v === "right",
                  y = w ? -5 : 5,
                  x = p[w ? "left" : "right"],
                  S = p[w ? "right" : "left"];
                a.onPointerGraceIntentChange({
                  area: [
                    { x: m.clientX + y, y: m.clientY },
                    { x, y: p.top },
                    { x: S, y: p.top },
                    { x: S, y: p.bottom },
                    { x, y: p.bottom },
                  ],
                  side: v,
                }),
                  window.clearTimeout(i.current),
                  (i.current = window.setTimeout(
                    () => a.onPointerGraceIntentChange(null),
                    300,
                  ));
              } else {
                if ((a.onTriggerLeave(m), m.defaultPrevented)) return;
                a.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: V(e.onKeyDown, (m) => {
            var h;
            const p = a.searchRef.current !== "";
            e.disabled ||
              (p && m.key === " ") ||
              (gI[o.dir].includes(m.key) &&
                (n.onOpenChange(!0),
                (h = n.content) == null || h.focus(),
                m.preventDefault()));
          }),
        }),
      })
    );
  });
ww.displayName = wa;
var Sw = "MenuSubContent",
  bw = f.forwardRef((e, t) => {
    const n = aw(bt, e.__scopeMenu),
      { forceMount: o = n.forceMount, ...r } = e,
      a = Fo(bt, e.__scopeMenu),
      s = Cs(bt, e.__scopeMenu),
      i = yw(Sw, e.__scopeMenu),
      l = f.useRef(null),
      c = re(t, l);
    return d.jsx(as.Provider, {
      scope: e.__scopeMenu,
      children: d.jsx(vt, {
        present: o || a.open,
        children: d.jsx(as.Slot, {
          scope: e.__scopeMenu,
          children: d.jsx(op, {
            id: i.contentId,
            "aria-labelledby": i.triggerId,
            ...r,
            ref: c,
            align: "start",
            side: s.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (u) => {
              var m;
              s.isUsingKeyboardRef.current &&
                ((m = l.current) == null || m.focus()),
                u.preventDefault();
            },
            onCloseAutoFocus: (u) => u.preventDefault(),
            onFocusOutside: V(e.onFocusOutside, (u) => {
              u.target !== i.trigger && a.onOpenChange(!1);
            }),
            onEscapeKeyDown: V(e.onEscapeKeyDown, (u) => {
              s.onClose(), u.preventDefault();
            }),
            onKeyDown: V(e.onKeyDown, (u) => {
              var h;
              const m = u.currentTarget.contains(u.target),
                p = xI[s.dir].includes(u.key);
              m &&
                p &&
                (a.onOpenChange(!1),
                (h = i.trigger) == null || h.focus(),
                u.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
bw.displayName = Sw;
function Cw(e) {
  return e ? "open" : "closed";
}
function el(e) {
  return e === "indeterminate";
}
function sp(e) {
  return el(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function BI(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function LI(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function $I(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t,
    a = n ? e.indexOf(n) : -1;
  let s = LI(e, Math.max(a, 0));
  r.length === 1 && (s = s.filter((c) => c !== n));
  const l = s.find((c) => c.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
function FI(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a].x,
      l = t[a].y,
      c = t[s].x,
      u = t[s].y;
    l > o != u > o && n < ((c - i) * (o - l)) / (u - l) + i && (r = !r);
  }
  return r;
}
function UI(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return FI(n, t);
}
function ss(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var zI = rw,
  VI = ep,
  WI = sw,
  GI = iw,
  HI = rp,
  KI = lw,
  qI = Kl,
  QI = dw,
  JI = mw,
  YI = fw,
  XI = vw,
  ZI = gw,
  eT = xw,
  tT = ww,
  nT = bw,
  ip = "DropdownMenu",
  [oT, i3] = en(ip, [nw]),
  Je = nw(),
  [rT, kw] = oT(ip),
  Pw = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: o,
        open: r,
        defaultOpen: a,
        onOpenChange: s,
        modal: i = !0,
      } = e,
      l = Je(t),
      c = f.useRef(null),
      [u = !1, m] = xn({ prop: r, defaultProp: a, onChange: s });
    return d.jsx(rT, {
      scope: t,
      triggerId: Xt(),
      triggerRef: c,
      contentId: Xt(),
      open: u,
      onOpenChange: m,
      onOpenToggle: f.useCallback(() => m((p) => !p), [m]),
      modal: i,
      children: d.jsx(zI, {
        ...l,
        open: u,
        onOpenChange: m,
        dir: o,
        modal: i,
        children: n,
      }),
    });
  };
Pw.displayName = ip;
var _w = "DropdownMenuTrigger",
  Aw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e,
      a = kw(_w, n),
      s = Je(n);
    return d.jsx(VI, {
      asChild: !0,
      ...s,
      children: d.jsx(J.button, {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...r,
        ref: gl(t, a.triggerRef),
        onPointerDown: V(e.onPointerDown, (i) => {
          !o &&
            i.button === 0 &&
            i.ctrlKey === !1 &&
            (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: V(e.onKeyDown, (i) => {
          o ||
            (["Enter", " "].includes(i.key) && a.onOpenToggle(),
            i.key === "ArrowDown" && a.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        }),
      }),
    });
  });
Aw.displayName = _w;
var aT = "DropdownMenuPortal",
  Dw = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      o = Je(t);
    return d.jsx(WI, { ...o, ...n });
  };
Dw.displayName = aT;
var Ew = "DropdownMenuContent",
  Nw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = kw(Ew, n),
      a = Je(n),
      s = f.useRef(!1);
    return d.jsx(GI, {
      id: r.contentId,
      "aria-labelledby": r.triggerId,
      ...a,
      ...o,
      ref: t,
      onCloseAutoFocus: V(e.onCloseAutoFocus, (i) => {
        var l;
        s.current || (l = r.triggerRef.current) == null || l.focus(),
          (s.current = !1),
          i.preventDefault();
      }),
      onInteractOutside: V(e.onInteractOutside, (i) => {
        const l = i.detail.originalEvent,
          c = l.button === 0 && l.ctrlKey === !0,
          u = l.button === 2 || c;
        (!r.modal || u) && (s.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Nw.displayName = Ew;
var sT = "DropdownMenuGroup",
  iT = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(HI, { ...r, ...o, ref: t });
  });
iT.displayName = sT;
var lT = "DropdownMenuLabel",
  Ow = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(KI, { ...r, ...o, ref: t });
  });
Ow.displayName = lT;
var cT = "DropdownMenuItem",
  Iw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(qI, { ...r, ...o, ref: t });
  });
Iw.displayName = cT;
var dT = "DropdownMenuCheckboxItem",
  Tw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(QI, { ...r, ...o, ref: t });
  });
Tw.displayName = dT;
var uT = "DropdownMenuRadioGroup",
  mT = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(JI, { ...r, ...o, ref: t });
  });
mT.displayName = uT;
var pT = "DropdownMenuRadioItem",
  jw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(YI, { ...r, ...o, ref: t });
  });
jw.displayName = pT;
var fT = "DropdownMenuItemIndicator",
  Rw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(XI, { ...r, ...o, ref: t });
  });
Rw.displayName = fT;
var hT = "DropdownMenuSeparator",
  Mw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(ZI, { ...r, ...o, ref: t });
  });
Mw.displayName = hT;
var vT = "DropdownMenuArrow",
  gT = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(eT, { ...r, ...o, ref: t });
  });
gT.displayName = vT;
var xT = "DropdownMenuSubTrigger",
  Bw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(tT, { ...r, ...o, ref: t });
  });
Bw.displayName = xT;
var yT = "DropdownMenuSubContent",
  Lw = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Je(n);
    return d.jsx(nT, {
      ...r,
      ...o,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Lw.displayName = yT;
var wT = Pw,
  ST = Aw,
  bT = Dw,
  $w = Nw,
  Fw = Ow,
  Uw = Iw,
  zw = Tw,
  Vw = jw,
  Ww = Rw,
  Gw = Mw,
  Hw = Bw,
  Kw = Lw;
const CT = wT,
  kT = ST,
  PT = f.forwardRef(({ className: e, inset: t, children: n, ...o }, r) =>
    d.jsxs(Hw, {
      "data-lov-id": "src/components/ui/dropdown-menu.tsx:26:2",
      "data-lov-name": "DropdownMenuPrimitive.SubTrigger",
