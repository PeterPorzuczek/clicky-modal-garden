        "data-component-path": "src/pages/NotFound.tsx",
        "data-component-line": "15",
        "data-component-file": "NotFound.tsx",
        "data-component-name": "div",
        "data-component-content":
          "%7B%22className%22%3A%22min-h-screen%20flex%20items-center%20justify-center%20bg-gray-100%22%7D",
        className: "min-h-screen flex items-center justify-center bg-gray-100",
        children: d.jsxs("div", {
          "data-lov-id": "src/pages/NotFound.tsx:16:6",
          "data-lov-name": "div",
          "data-component-path": "src/pages/NotFound.tsx",
          "data-component-line": "16",
          "data-component-file": "NotFound.tsx",
          "data-component-name": "div",
          "data-component-content": "%7B%22className%22%3A%22text-center%22%7D",
          className: "text-center",
          children: [
            d.jsx("h1", {
              "data-lov-id": "src/pages/NotFound.tsx:17:8",
              "data-lov-name": "h1",
              "data-component-path": "src/pages/NotFound.tsx",
              "data-component-line": "17",
              "data-component-file": "NotFound.tsx",
              "data-component-name": "h1",
              "data-component-content":
                "%7B%22text%22%3A%22404%22%2C%22className%22%3A%22text-4xl%20font-bold%20mb-4%22%7D",
              className: "text-4xl font-bold mb-4",
              children: "404",
            }),
            d.jsx("p", {
              "data-lov-id": "src/pages/NotFound.tsx:18:8",
              "data-lov-name": "p",
              "data-component-path": "src/pages/NotFound.tsx",
              "data-component-line": "18",
              "data-component-file": "NotFound.tsx",
              "data-component-name": "p",
              "data-component-content":
                "%7B%22text%22%3A%22Oops!%20Page%20not%20found%22%2C%22className%22%3A%22text-xl%20text-gray-600%20mb-4%22%7D",
              className: "text-xl text-gray-600 mb-4",
              children: "Oops! Page not found",
            }),
            d.jsx("a", {
              "data-lov-id": "src/pages/NotFound.tsx:19:8",
              "data-lov-name": "a",
              "data-component-path": "src/pages/NotFound.tsx",
              "data-component-line": "19",
              "data-component-file": "NotFound.tsx",
              "data-component-name": "a",
              "data-component-content":
                "%7B%22text%22%3A%22Return%20to%20Home%22%2C%22className%22%3A%22text-blue-500%20hover%3Atext-blue-700%20underline%22%7D",
              href: "/",
              className: "text-blue-500 hover:text-blue-700 underline",
              children: "Return to Home",
            }),
          ],
        }),
      })
    );
  };
var lp = "Tabs",
  [TT, l3] = en(lp, [Jr]),
  Yw = Jr(),
  [jT, cp] = TT(lp),
  Xw = f.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: o,
        onValueChange: r,
        defaultValue: a,
        orientation: s = "horizontal",
        dir: i,
        activationMode: l = "automatic",
        ...c
      } = e,
      u = xs(i),
      [m, p] = xn({ prop: o, onChange: r, defaultProp: a });
    return d.jsx(jT, {
      scope: n,
      baseId: Xt(),
      value: m,
      onValueChange: p,
      orientation: s,
      dir: u,
      activationMode: l,
      children: d.jsx(J.div, { dir: u, "data-orientation": s, ...c, ref: t }),
    });
  });
Xw.displayName = lp;
var Zw = "TabsList",
  eS = f.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e,
      a = cp(Zw, n),
      s = Yw(n);
    return d.jsx(Wm, {
      asChild: !0,
      ...s,
      orientation: a.orientation,
      dir: a.dir,
      loop: o,
      children: d.jsx(J.div, {
        role: "tablist",
        "aria-orientation": a.orientation,
        ...r,
        ref: t,
      }),
    });
  });
eS.displayName = Zw;
var tS = "TabsTrigger",
  nS = f.forwardRef((e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...a } = e,
      s = cp(tS, n),
      i = Yw(n),
      l = aS(s.baseId, o),
      c = sS(s.baseId, o),
      u = o === s.value;
    return d.jsx(Gm, {
      asChild: !0,
      ...i,
      focusable: !r,
      active: u,
      children: d.jsx(J.button, {
        type: "button",
        role: "tab",
        "aria-selected": u,
        "aria-controls": c,
        "data-state": u ? "active" : "inactive",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        id: l,
        ...a,
        ref: t,
        onMouseDown: V(e.onMouseDown, (m) => {
          !r && m.button === 0 && m.ctrlKey === !1
            ? s.onValueChange(o)
            : m.preventDefault();
        }),
        onKeyDown: V(e.onKeyDown, (m) => {
          [" ", "Enter"].includes(m.key) && s.onValueChange(o);
        }),
        onFocus: V(e.onFocus, () => {
          const m = s.activationMode !== "manual";
          !u && !r && m && s.onValueChange(o);
        }),
      }),
    });
  });
nS.displayName = tS;
var oS = "TabsContent",
  rS = f.forwardRef((e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: a, ...s } = e,
      i = cp(oS, n),
      l = aS(i.baseId, o),
      c = sS(i.baseId, o),
      u = o === i.value,
      m = f.useRef(u);
    return (
      f.useEffect(() => {
        const p = requestAnimationFrame(() => (m.current = !1));
        return () => cancelAnimationFrame(p);
      }, []),
      d.jsx(vt, {
        present: r || u,
        children: ({ present: p }) =>
          d.jsx(J.div, {
            "data-state": u ? "active" : "inactive",
            "data-orientation": i.orientation,
            role: "tabpanel",
            "aria-labelledby": l,
            hidden: !p,
            id: c,
            tabIndex: 0,
            ...s,
            ref: t,
            style: { ...e.style, animationDuration: m.current ? "0s" : void 0 },
            children: p && a,
          }),
      })
    );
  });
rS.displayName = oS;
function aS(e, t) {
  return `${e}-trigger-${t}`;
}
function sS(e, t) {
  return `${e}-content-${t}`;
}
var RT = Xw,
  iS = eS,
  lS = nS,
  cS = rS;
const MT = RT,
  dS = f.forwardRef(({ className: e, ...t }, n) =>
    d.jsx(iS, {
      "data-lov-id": "src/components/ui/tabs.tsx:13:2",
      "data-lov-name": "TabsPrimitive.List",
