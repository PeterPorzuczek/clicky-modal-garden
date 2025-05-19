    "data-component-path": "src/components/ui/badge.tsx",
    "data-component-line": "32",
    "data-component-file": "badge.tsx",
    "data-component-name": "div",
    "data-component-content": "%7B%7D",
    className: Y(lE({ variant: t }), e),
    ...n,
  });
}
const cE = ({
    productType: e,
    imageUrl: t,
    onMarkPosition: n,
    disabled: o,
    maxMarks: r,
    currentMarks: a,
    selectedForMarking: s = !1,
    damagePositions: i = {},
    defectPositions: l = {},
    productDamages: c = [],
    defectLabels: u = {},
    onMarkerDrag: m,
    markerSelectionOrder: p = {},
  }) => {
    const h = f.useRef(null),
      g = f.useRef(null),
      [v, w] = f.useState(!1),
      [y, x] = f.useState(null),
      [S, b] = f.useState(null),
      C = () => {
        const I = [];
        return (
          Object.entries(i).forEach(([R, T]) => {
            if (T.view === "whole") return;
            const P = Number(R),
              k = `damage-${P}`;
            I.push({
              id: k,
              x: T.x,
              y: T.y,
              view: T.view,
              isDamage: !0,
              label: `Skada #${parseInt(R) + 1}: ${c[P] || ""}`,
              orderIndex: p[k] || 0,
            });
          }),
          Object.entries(l).forEach(([R, T]) => {
            T.view !== "whole" &&
              I.push({
                id: R,
                x: T.x,
                y: T.y,
                view: T.view,
                isDamage: !1,
                label: u[R] || R,
                orderIndex: p[R] || 0,
              });
          }),
          I
        );
      },
      D = () => {
        const I = [];
        return (
          c.forEach((R, T) => {
            if (!i[T]) {
              const P = `damage-${T}`;
              I.push({
                id: P,
                x: 0,
                y: 0,
                view: "",
                isDamage: !0,
                label: `Skada #${T + 1}: ${R || ""}`,
                orderIndex: 0,
              });
            }
          }),
          Object.entries(u).forEach(([R, T]) => {
            !l[R] &&
              Object.keys(c || {}).indexOf(R) !== -1 &&
              I.push({
                id: R,
                x: 0,
                y: 0,
                view: "",
                isDamage: !1,
                label: T,
                orderIndex: 0,
              });
          }),
          I
        );
      },
      A = (I) => {
        if (!o && h.current && g.current) {
          const R = h.current.getBoundingClientRect(),
            T = (I.clientX - R.left) / R.width,
            P = (I.clientY - R.top) / R.height;
          n(T, P, "front");
        }
      },
      E = () => {
        console.error("Image failed to load:", t), w(!0);
      },
      L = () => (o ? "default" : a >= r ? "not-allowed" : "crosshair"),
      $ = (I, R, T) => {
        I.stopPropagation(), x({ type: R, id: T });
      },
      W = (I) => {
        if (!y || !m || !h.current) return;
        const R = h.current.getBoundingClientRect();
        let T = (I.clientX - R.left) / R.width,
          P = (I.clientY - R.top) / R.height;
        (T = Math.max(0, Math.min(1, T))),
          (P = Math.max(0, Math.min(1, P))),
          m(y.type, y.id, T, P, "front");
      },
      U = () => {
        x(null);
      };
    f.useEffect(
      () => (
        y
          ? (window.addEventListener("mousemove", W),
            window.addEventListener("mouseup", U),
            (document.body.style.cursor = "grabbing"))
          : (document.body.style.cursor = ""),
        () => {
          window.removeEventListener("mousemove", W),
            window.removeEventListener("mouseup", U),
            (document.body.style.cursor = "");
        }
      ),
      [y],
    );
    const q = (I, R) => {
        var N, _;
        const T = ((N = h.current) == null ? void 0 : N.clientWidth) || 300;
        return {
          x: (T - 200) / T,
          y:
            (50 + I * 40) /
            (((_ = h.current) == null ? void 0 : _.clientHeight) || 400),
        };
      },
      M = () => {
        const I = C(),
          R = D();
        return [...I, ...R.map((T, P) => ({ ...T, ...q(P, R.length) }))];
      };
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/damage-marker/GarmentView.tsx:246:4",
      "data-lov-name": "div",
      "data-component-path":
        "src/components/order/damage-marker/GarmentView.tsx",
      "data-component-line": "246",
      "data-component-file": "GarmentView.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22mt-4%20border%20rounded-lg%20p-2%20bg-white%22%7D",
      className: "mt-4 border rounded-lg p-2 bg-white",
      children: [
        d.jsxs("div", {
          "data-lov-id":
            "src/components/order/damage-marker/GarmentView.tsx:248:6",
          "data-lov-name": "div",
          "data-component-path":
            "src/components/order/damage-marker/GarmentView.tsx",
          "data-component-line": "248",
          "data-component-file": "GarmentView.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22mb-3%20flex%20flex-wrap%20gap-2%20justify-start%22%7D",
          className: "mb-3 flex flex-wrap gap-2 justify-start",
          children: [
            C().map((I) =>
              d.jsxs(
                "div",
                {
                  "data-lov-id":
                    "src/components/order/damage-marker/GarmentView.tsx:251:10",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/damage-marker/GarmentView.tsx",
                  "data-component-line": "251",
                  "data-component-file": "GarmentView.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22className%22%3A%22flex%20items-center%20bg-%5B%23F2FCE2%5D%20border%20border-%5B%23e1efd2%5D%20rounded-full%20px-3%20py-1%20text-xs%22%7D",
                  className:
                    "flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs",
                  children: [
                    d.jsx("span", {
                      "data-lov-id":
                        "src/components/order/damage-marker/GarmentView.tsx:252:12",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/damage-marker/GarmentView.tsx",
                      "data-component-line": "252",
                      "data-component-file": "GarmentView.tsx",
                      "data-component-name": "span",
                      "data-component-content":
                        "%7B%22className%22%3A%22inline-block%20w-5%20h-5%20bg-green-600%20text-white%20rounded-full%20mr-2%20flex%20items-center%20justify-center%20text-xs%20font-bold%22%7D",
                      className:
                        "inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold",
                      children: I.orderIndex || 0,
                    }),
                    d.jsx("span", {
                      "data-lov-id":
                        "src/components/order/damage-marker/GarmentView.tsx:255:12",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/damage-marker/GarmentView.tsx",
                      "data-component-line": "255",
                      "data-component-file": "GarmentView.tsx",
                      "data-component-name": "span",
                      "data-component-content":
                        "%7B%22className%22%3A%22text-gray-800%22%7D",
                      className: "text-gray-800",
                      children: I.isDamage
                        ? `Skada #${parseInt(I.id.replace("damage-", "")) + 1}`
                        : u[I.id],
                    }),
                  ],
                },
                I.id,
              ),
            ),
            D().map((I) =>
              d.jsxs(
                "div",
                {
                  "data-lov-id":
                    "src/components/order/damage-marker/GarmentView.tsx:263:10",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/damage-marker/GarmentView.tsx",
                  "data-component-line": "263",
                  "data-component-file": "GarmentView.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22className%22%3A%22flex%20items-center%20bg-gray-100%20border%20border-gray-200%20rounded-full%20px-3%20py-1%20text-xs%22%7D",
                  className:
                    "flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs",
                  children: [
                    d.jsx("span", {
                      "data-lov-id":
                        "src/components/order/damage-marker/GarmentView.tsx:264:12",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/damage-marker/GarmentView.tsx",
                      "data-component-line": "264",
                      "data-component-file": "GarmentView.tsx",
                      "data-component-name": "span",
                      "data-component-content":
                        "%7B%22text%22%3A%22%3F%22%2C%22className%22%3A%22inline-block%20w-5%20h-5%20bg-gray-400%20text-white%20rounded-full%20mr-2%20flex%20items-center%20justify-center%20text-xs%20font-bold%22%7D",
                      className:
                        "inline-block w-5 h-5 bg-gray-400 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold",
                      children: "?",
                    }),
                    d.jsx("span", {
                      "data-lov-id":
                        "src/components/order/damage-marker/GarmentView.tsx:267:12",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/damage-marker/GarmentView.tsx",
                      "data-component-line": "267",
                      "data-component-file": "GarmentView.tsx",
                      "data-component-name": "span",
                      "data-component-content":
                        "%7B%22className%22%3A%22text-gray-600%22%7D",
                      className: "text-gray-600",
                      children: I.isDamage
                        ? `Skada #${parseInt(I.id.replace("damage-", "")) + 1}`
                        : u[I.id],
                    }),
                  ],
                },
                I.id,
              ),
            ),
          ],
        }),
        d.jsx("div", {
          "data-lov-id":
            "src/components/order/damage-marker/GarmentView.tsx:274:6",
          "data-lov-name": "div",
          "data-component-path":
            "src/components/order/damage-marker/GarmentView.tsx",
          "data-component-line": "274",
          "data-component-file": "GarmentView.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22relative%20mt-2%22%7D",
          ref: g,
          className: "relative mt-2",
          children:
            t && !v
              ? d.jsxs(d.Fragment, {
                  children: [
                    d.jsx("img", {
                      "data-lov-id":
                        "src/components/order/damage-marker/GarmentView.tsx:277:12",
                      "data-lov-name": "img",
                      "data-component-path":
                        "src/components/order/damage-marker/GarmentView.tsx",
                      "data-component-line": "277",
                      "data-component-file": "GarmentView.tsx",
                      "data-component-name": "img",
                      "data-component-content":
                        "%7B%22className%22%3A%22w-full%20h-auto%20object-contain%22%7D",
                      ref: h,
                      src: t,
                      alt: `${e}`,
                      className: "w-full h-auto object-contain",
                      onClick: A,
                      onError: E,
                      style: { cursor: L() },
                    }),
                    M().map((I) => {
                      const R =
                        (I.isDamage &&
                          i[parseInt(I.id.replace("damage-", ""))]) ||
                        (!I.isDamage && l[I.id]);
                      return d.jsxs(
                        "div",
                        {
                          "data-lov-id":
                            "src/components/order/damage-marker/GarmentView.tsx:293:16",
                          "data-lov-name": "div",
                          "data-component-path":
                            "src/components/order/damage-marker/GarmentView.tsx",
                          "data-component-line": "293",
                          "data-component-file": "GarmentView.tsx",
                          "data-component-name": "div",
                          "data-component-content": "%7B%7D",
                          className: `absolute flex items-center justify-center
                    ${R ? "cursor-grab" : "cursor-pointer"}
                    ${y && y.id === I.id ? "cursor-grabbing z-50" : "z-40"}`,
                          style: {
                            left: `${I.x * 100}%`,
                            top: `${I.y * 100}%`,
                          },
                          onMouseDown: (T) =>
                            R && $(T, I.isDamage ? "damage" : "defect", I.id),
                          onClick: (T) => {
                            R
                              ? T.stopPropagation()
                              : (T.stopPropagation(), A(T));
                          },
                          onMouseEnter: () => b(I.id),
                          onMouseLeave: () => b(null),
                          children: [
                            R
                              ? d.jsx("div", {
                                  "data-lov-id":
                                    "src/components/order/damage-marker/GarmentView.tsx:316:20",
                                  "data-lov-name": "div",
                                  "data-component-path":
                                    "src/components/order/damage-marker/GarmentView.tsx",
                                  "data-component-line": "316",
                                  "data-component-file": "GarmentView.tsx",
                                  "data-component-name": "div",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22w-6%20h-6%20-ml-3%20-mt-3%20rounded-full%20bg-green-600%20border-2%20border-white%20shadow-md%20flex%20items-center%20justify-center%20text-%5B10px%5D%20text-white%20font-bold%22%7D",
                                  className:
                                    "w-6 h-6 -ml-3 -mt-3 rounded-full bg-green-600 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold",
                                  children: I.orderIndex || 0,
                                })
                              : d.jsx("div", {
                                  "data-lov-id":
                                    "src/components/order/damage-marker/GarmentView.tsx:321:20",
                                  "data-lov-name": "div",
                                  "data-component-path":
                                    "src/components/order/damage-marker/GarmentView.tsx",
                                  "data-component-line": "321",
                                  "data-component-file": "GarmentView.tsx",
                                  "data-component-name": "div",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22-translate-x-1%2F2%20-translate-y-1%2F2%22%7D",
                                  className:
                                    "-translate-x-1/2 -translate-y-1/2",
                                  children: d.jsx(ty, {
                                    "data-lov-id":
                                      "src/components/order/damage-marker/GarmentView.tsx:322:22",
                                    "data-lov-name": "Badge",
                                    "data-component-path":
                                      "src/components/order/damage-marker/GarmentView.tsx",
                                    "data-component-line": "322",
                                    "data-component-file": "GarmentView.tsx",
                                    "data-component-name": "Badge",
                                    "data-component-content":
                                      "%7B%22className%22%3A%22bg-gray-100%20border-gray-200%20shadow-sm%20flex%20items-center%20px-2%20py-1%22%7D",
                                    variant: "outline",
                                    className:
                                      "bg-gray-100 border-gray-200 shadow-sm flex items-center px-2 py-1",
                                    children: I.isDamage
                                      ? `Skada #${parseInt(I.id.replace("damage-", "")) + 1}`
                                      : u[I.id],
                                  }),
                                }),
                            S === I.id &&
                              d.jsx("div", {
                                "data-lov-id":
                                  "src/components/order/damage-marker/GarmentView.tsx:335:20",
                                "data-lov-name": "div",
                                "data-component-path":
                                  "src/components/order/damage-marker/GarmentView.tsx",
                                "data-component-line": "335",
                                "data-component-file": "GarmentView.tsx",
                                "data-component-name": "div",
                                "data-component-content":
                                  "%7B%22className%22%3A%22absolute%20top-6%20left-0%20bg-white%20shadow-md%20border%20border-gray-200%20rounded%20p-1.5%20text-xs%20min-w-32%20z-50%20pointer-events-none%22%7D",
                                className:
                                  "absolute top-6 left-0 bg-white shadow-md border border-gray-200 rounded p-1.5 text-xs min-w-32 z-50 pointer-events-none",
                                children: I.label,
                              }),
                          ],
                        },
                        I.id,
                      );
                    }),
                  ],
                })
              : d.jsx("div", {
                  "data-lov-id":
                    "src/components/order/damage-marker/GarmentView.tsx:344:10",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/damage-marker/GarmentView.tsx",
                  "data-component-line": "344",
                  "data-component-file": "GarmentView.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22text%22%3A%22Ingen%20bild%20tillg%C3%A4nglig%22%2C%22className%22%3A%22w-full%20aspect-%5B4%2F3%5D%20flex%20items-center%20justify-center%20bg-gray-100%20text-gray-500%22%7D",
                  className:
                    "w-full aspect-[4/3] flex items-center justify-center bg-gray-100 text-gray-500",
                  children: "Ingen bild tillgänglig",
                }),
        }),
      ],
    });
  },
  dE = ({
    product: e,
    damagePositions: t,
    defectPositions: n,
    isWholeProductMarker: o,
    removeMarker: r,
    removeDefectMarker: a,
    getDefectLabel: s,
    markerSelectionOrder: i = {},
  }) => {
    const l = Object.entries(t)
        .filter(([u, m]) => o(m))
        .map(([u, m]) => parseInt(u)),
      c = Object.entries(n)
        .filter(([u, m]) => o(m))
        .map(([u, m]) => u);
    return l.length === 0 && c.length === 0
      ? null
      : d.jsxs("div", {
          "data-lov-id":
            "src/components/order/damage-marker/WholeProductList.tsx:43:4",
          "data-lov-name": "div",
          "data-component-path":
            "src/components/order/damage-marker/WholeProductList.tsx",
          "data-component-line": "43",
          "data-component-file": "WholeProductList.tsx",
          "data-component-name": "div",
          "data-component-content": "%7B%22className%22%3A%22mb-2%22%7D",
          className: "mb-2",
          children: [
            d.jsx("h5", {
              "data-lov-id":
                "src/components/order/damage-marker/WholeProductList.tsx:44:6",
              "data-lov-name": "h5",
              "data-component-path":
                "src/components/order/damage-marker/WholeProductList.tsx",
              "data-component-line": "44",
              "data-component-file": "WholeProductList.tsx",
              "data-component-name": "h5",
              "data-component-content":
                "%7B%22text%22%3A%22Helproduktmarkeringar%3A%22%2C%22className%22%3A%22text-sm%20font-medium%20mb-1%22%7D",
              className: "text-sm font-medium mb-1",
              children: "Helproduktmarkeringar:",
            }),
            d.jsxs("div", {
              "data-lov-id":
                "src/components/order/damage-marker/WholeProductList.tsx:45:6",
              "data-lov-name": "div",
              "data-component-path":
                "src/components/order/damage-marker/WholeProductList.tsx",
              "data-component-line": "45",
              "data-component-file": "WholeProductList.tsx",
              "data-component-name": "div",
              "data-component-content":
                "%7B%22className%22%3A%22flex%20flex-wrap%20gap-2%22%7D",
              className: "flex flex-wrap gap-2",
              children: [
                l.map((u) => {
                  const m = `damage-${u}`,
                    p = i[m] || 0;
                  return d.jsxs(
                    "div",
                    {
                      "data-lov-id":
                        "src/components/order/damage-marker/WholeProductList.tsx:51:12",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/damage-marker/WholeProductList.tsx",
                      "data-component-line": "51",
                      "data-component-file": "WholeProductList.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22flex%20items-center%20bg-%5B%23F2FCE2%5D%20border%20border-%5B%23e1efd2%5D%20rounded-full%20px-3%20py-1%20text-xs%22%7D",
                      className:
                        "flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs",
                      children: [
                        d.jsxs("span", {
                          "data-lov-id":
                            "src/components/order/damage-marker/WholeProductList.tsx:55:14",
                          "data-lov-name": "span",
                          "data-component-path":
                            "src/components/order/damage-marker/WholeProductList.tsx",
                          "data-component-line": "55",
                          "data-component-file": "WholeProductList.tsx",
                          "data-component-name": "span",
                          "data-component-content":
                            "%7B%22className%22%3A%22flex%20items-center%22%7D",
                          className: "flex items-center",
                          children: [
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:56:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "56",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22className%22%3A%22inline-block%20w-5%20h-5%20bg-green-600%20text-white%20rounded-full%20mr-2%20flex%20items-center%20justify-center%20text-xs%20font-bold%22%7D",
                              className:
                                "inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold",
                              children: p,
                            }),
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:59:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "59",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22className%22%3A%22mr-2%22%7D",
                              className: "mr-2",
                              children:
                                e.damages[u] === "tear" ? "Reva" : e.damages[u],
                            }),
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:62:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "62",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22text%22%3A%22(hela%20produkten)%22%2C%22className%22%3A%22text-xs%20text-gray-600%20mr-2%22%7D",
                              className: "text-xs text-gray-600 mr-2",
                              children: "(hela produkten)",
                            }),
                          ],
                        }),
                        d.jsx("button", {
                          "data-lov-id":
                            "src/components/order/damage-marker/WholeProductList.tsx:64:14",
                          "data-lov-name": "button",
                          "data-component-path":
                            "src/components/order/damage-marker/WholeProductList.tsx",
                          "data-component-line": "64",
                          "data-component-file": "WholeProductList.tsx",
                          "data-component-name": "button",
                          "data-component-content":
                            "%7B%22className%22%3A%22ml-1%20text-gray-400%20hover%3Atext-gray-600%20focus%3Aoutline-none%22%7D",
                          type: "button",
                          onClick: (h) => r(h, u),
                          className:
                            "ml-1 text-gray-400 hover:text-gray-600 focus:outline-none",
                          children: d.jsx(os, {
                            "data-lov-id":
                              "src/components/order/damage-marker/WholeProductList.tsx:69:16",
                            "data-lov-name": "X",
                            "data-component-path":
                              "src/components/order/damage-marker/WholeProductList.tsx",
                            "data-component-line": "69",
                            "data-component-file": "WholeProductList.tsx",
                            "data-component-name": "X",
                            "data-component-content": "%7B%7D",
                            size: 14,
                          }),
                        }),
                      ],
                    },
                    `whole-damage-${u}`,
                  );
                }),
                c.map((u) => {
                  const m = i[u] || 0;
                  return d.jsxs(
                    "div",
                    {
                      "data-lov-id":
                        "src/components/order/damage-marker/WholeProductList.tsx:79:12",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/damage-marker/WholeProductList.tsx",
                      "data-component-line": "79",
                      "data-component-file": "WholeProductList.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22flex%20items-center%20bg-%5B%23F2FCE2%5D%20border%20border-%5B%23e1efd2%5D%20rounded-full%20px-3%20py-1%20text-xs%22%7D",
                      className:
                        "flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs",
                      children: [
                        d.jsxs("span", {
                          "data-lov-id":
                            "src/components/order/damage-marker/WholeProductList.tsx:83:14",
                          "data-lov-name": "span",
                          "data-component-path":
                            "src/components/order/damage-marker/WholeProductList.tsx",
                          "data-component-line": "83",
                          "data-component-file": "WholeProductList.tsx",
                          "data-component-name": "span",
                          "data-component-content":
                            "%7B%22className%22%3A%22flex%20items-center%22%7D",
                          className: "flex items-center",
                          children: [
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:84:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "84",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22className%22%3A%22inline-block%20w-5%20h-5%20bg-green-600%20text-white%20rounded-full%20mr-2%20flex%20items-center%20justify-center%20text-xs%20font-bold%22%7D",
                              className:
                                "inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold",
                              children: m,
                            }),
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:87:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "87",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22className%22%3A%22mr-2%22%7D",
                              className: "mr-2",
                              children: s(u),
                            }),
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/damage-marker/WholeProductList.tsx:88:16",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/damage-marker/WholeProductList.tsx",
                              "data-component-line": "88",
                              "data-component-file": "WholeProductList.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22text%22%3A%22(hela%20produkten)%22%2C%22className%22%3A%22text-xs%20text-gray-600%20mr-2%22%7D",
                              className: "text-xs text-gray-600 mr-2",
                              children: "(hela produkten)",
                            }),
                          ],
                        }),
                        d.jsx("button", {
                          "data-lov-id":
                            "src/components/order/damage-marker/WholeProductList.tsx:90:14",
                          "data-lov-name": "button",
                          "data-component-path":
                            "src/components/order/damage-marker/WholeProductList.tsx",
                          "data-component-line": "90",
                          "data-component-file": "WholeProductList.tsx",
                          "data-component-name": "button",
                          "data-component-content":
                            "%7B%22className%22%3A%22ml-1%20text-gray-400%20hover%3Atext-gray-600%20focus%3Aoutline-none%22%7D",
                          type: "button",
                          onClick: (p) => a(p, u),
                          className:
                            "ml-1 text-gray-400 hover:text-gray-600 focus:outline-none",
                          children: d.jsx(os, {
                            "data-lov-id":
                              "src/components/order/damage-marker/WholeProductList.tsx:95:16",
                            "data-lov-name": "X",
                            "data-component-path":
                              "src/components/order/damage-marker/WholeProductList.tsx",
                            "data-component-line": "95",
                            "data-component-file": "WholeProductList.tsx",
                            "data-component-name": "X",
                            "data-component-content": "%7B%7D",
                            size: 14,
                          }),
                        }),
                      ],
                    },
                    `whole-defect-${u}`,
                  );
                }),
              ],
            }),
          ],
        });
  },
  uE = ({
    isMarked: e,
    onMarkWholeProduct: t,
    onResetAllMarkers: n,
    isSingleMarkMode: o,
  }) =>
    d.jsxs("div", {
      "data-lov-id":
        "src/components/order/damage-marker/MarkerButtons.tsx:20:4",
      "data-lov-name": "div",
      "data-component-path":
        "src/components/order/damage-marker/MarkerButtons.tsx",
      "data-component-line": "20",
      "data-component-file": "MarkerButtons.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22flex%20flex-wrap%20gap-2%20justify-between%22%7D",
      className: "flex flex-wrap gap-2 justify-between",
      children: [
        o &&
          d.jsx($t, {
            "data-lov-id":
              "src/components/order/damage-marker/MarkerButtons.tsx:22:8",
            "data-lov-name": "Button",
            "data-component-path":
              "src/components/order/damage-marker/MarkerButtons.tsx",
            "data-component-line": "22",
            "data-component-file": "MarkerButtons.tsx",
            "data-component-name": "Button",
            "data-component-content":
              "%7B%22text%22%3A%22Hela%20produkten%22%7D",
            type: "button",
            variant: "outline",
            size: "sm",
            className: `text-sm py-1 px-3 h-auto bg-white hover:bg-gray-50 ${e ? "" : "border-blue-500 text-blue-600"}`,
            onClick: t,
            children: "Hela produkten",
          }),
        d.jsxs($t, {
          "data-lov-id":
            "src/components/order/damage-marker/MarkerButtons.tsx:33:6",
          "data-lov-name": "Button",
          "data-component-path":
            "src/components/order/damage-marker/MarkerButtons.tsx",
          "data-component-line": "33",
          "data-component-file": "MarkerButtons.tsx",
          "data-component-name": "Button",
          "data-component-content":
            "%7B%22text%22%3A%22Rensa%20alla%20markeringar%22%2C%22className%22%3A%22text-sm%20py-1%20px-3%20h-auto%20text-gray-600%22%7D",
          type: "button",
          variant: "outline",
          size: "sm",
          className: "text-sm py-1 px-3 h-auto text-gray-600",
          onClick: n,
          children: [
            d.jsx(cA, {
              "data-lov-id":
                "src/components/order/damage-marker/MarkerButtons.tsx:40:8",
              "data-lov-name": "RotateCcw",
              "data-component-path":
                "src/components/order/damage-marker/MarkerButtons.tsx",
              "data-component-line": "40",
              "data-component-file": "MarkerButtons.tsx",
              "data-component-name": "RotateCcw",
              "data-component-content":
                "%7B%22className%22%3A%22h-3.5%20w-3.5%20mr-1%22%7D",
              className: "h-3.5 w-3.5 mr-1",
            }),
            "Rensa alla markeringar",
          ],
        }),
      ],
    }),
  mE = ({ productType: e, isMarked: t, isSingleMarkMode: n }) => {
    let o = "";
    return (
      n
        ? t
          ? (o =
              "Du kan ändra markeringen genom att klicka på en ny plats på plagget, dra markören till en ny position, eller markera att det gäller hela plagget.")
          : (o =
              "Klicka på bilden för att markera var skadan/defekten är placerad, eller markera att det gäller hela plagget.")
        : (o =
            "Du måste markera alla valda skador och defekter på bilden nedan. Markeringar visas i den ordning de har valts. Du kan dra markeringarna till andra positioner om du behöver justera dem."),
      d.jsxs("div", {
        "data-lov-id":
          "src/components/order/damage-marker/InstructionMessage.tsx:27:4",
        "data-lov-name": "div",
        "data-component-path":
          "src/components/order/damage-marker/InstructionMessage.tsx",
        "data-component-line": "27",
        "data-component-file": "InstructionMessage.tsx",
        "data-component-name": "div",
        "data-component-content":
          "%7B%22className%22%3A%22flex%20items-start%20gap-3%20p-4%20my-3%20bg-%5B%23F2FCE2%5D%20border%20border-%5B%23e1efd2%5D%20rounded-lg%22%7D",
        className:
          "flex items-start gap-3 p-4 my-3 bg-[#F2FCE2] border border-[#e1efd2] rounded-lg",
        children: [
          d.jsx(iA, {
            "data-lov-id":
              "src/components/order/damage-marker/InstructionMessage.tsx:28:6",
            "data-lov-name": "InfoIcon",
            "data-component-path":
              "src/components/order/damage-marker/InstructionMessage.tsx",
            "data-component-line": "28",
            "data-component-file": "InstructionMessage.tsx",
            "data-component-name": "InfoIcon",
            "data-component-content":
              "%7B%22className%22%3A%22text-blue-800%20mt-0.5%20flex-shrink-0%22%7D",
            className: "text-blue-800 mt-0.5 flex-shrink-0",
            size: 24,
          }),
          d.jsx("p", {
            "data-lov-id":
              "src/components/order/damage-marker/InstructionMessage.tsx:29:6",
            "data-lov-name": "p",
            "data-component-path":
              "src/components/order/damage-marker/InstructionMessage.tsx",
            "data-component-line": "29",
            "data-component-file": "InstructionMessage.tsx",
            "data-component-name": "p",
            "data-component-content":
              "%7B%22className%22%3A%22text-sm%20text-gray-700%22%7D",
            className: "text-sm text-gray-700",
            children: o,
          }),
        ],
      })
    );
  },
  ny = ({
    product: e,
    damageIndex: t,
    defectId: n,
    updateDamageDetail: o,
    updateDefectDetail: r,
    selectedDamageIndex: a,
    selectedDefectId: s,
  }) => {
    var I, R;
    if (!h0(e.type)) return null;
    const i = ND(e.type);
    if (!i) return null;
    const [l, c] = f.useState({}),
      [u, m] = f.useState({}),
      [p, h] = f.useState({}),
      [g, v] = f.useState(1);
    f.useEffect(() => {
      const T = {},
        P = {};
      let k = 0;
      e.damages.forEach((_, O) => {
        var z, K;
        const B =
          (z = e.damageDetails[`damage-${O}`]) == null ? void 0 : z.position;
        if (B) {
          T[O] = B;
          const Q =
            ((K = e.damageDetails[`damage-${O}`]) == null
              ? void 0
              : K.orderIndex) || 0;
          Q > 0 && ((P[`damage-${O}`] = Q), (k = Math.max(k, Q)));
        }
      }),
        c(T);
      const N = {};
      e.defectDetails &&
        Object.entries(e.otherIssues).forEach(([_, O]) => {
          var B, z;
          if (
            O &&
            e.defectDetails &&
            (B = e.defectDetails[_]) != null &&
            B.position
          ) {
            N[_] = e.defectDetails[_].position;
            const K =
              ((z = e.defectDetails[_]) == null ? void 0 : z.orderIndex) || 0;
            K > 0 && ((P[_] = K), (k = Math.max(k, K)));
          }
        }),
        m(N),
        h(P),
        v(k + 1);
    }, [e.damageDetails, e.defectDetails, e.damages, e.otherIssues]);
    const w = () => {
        if (t !== void 0) return { type: "damage", id: t };
        if (n) return { type: "defect", id: n };
        for (let P = 0; P < e.damages.length; P++)
          if (!l[P]) return { type: "damage", id: P };
        const T = Object.entries(e.otherIssues)
          .filter(([P, k]) => k)
          .map(([P]) => P);
        for (const P of T) if (!u[P]) return { type: "defect", id: P };
        return null;
      },
      y = (T, P, k) => {
        if (t !== void 0) {
          const O = { x: T, y: P, view: k },
            B = `damage-${t}`;
          l[t]
            ? o(t, { position: O, orderIndex: p[B] || g })
            : (h((z) => ({ ...z, [B]: g })),
              v((z) => z + 1),
              o(t, { position: O, orderIndex: g })),
            c((z) => ({ ...z, [t]: O }));
          return;
        }
        if (n) {
          const O = { x: T, y: P, view: k };
          u[n]
            ? r(n, { position: O, orderIndex: p[n] || g })
            : (h((B) => ({ ...B, [n]: g })),
              v((B) => B + 1),
              r(n, { position: O, orderIndex: g })),
            m((B) => ({ ...B, [n]: O }));
          return;
        }
        const N = w();
        if (!N) return;
        const _ = { x: T, y: P, view: k };
        if (N.type === "damage") {
          const O = N.id,
            B = `damage-${O}`;
          h((z) => ({ ...z, [B]: g })),
            o(O, { position: _, orderIndex: g }),
            c((z) => ({ ...z, [O]: _ })),
            v((z) => z + 1);
        } else {
          const O = N.id;
          h((B) => ({ ...B, [O]: g })),
            r(O, { position: _, orderIndex: g }),
            m((B) => ({ ...B, [O]: _ })),
            v((B) => B + 1);
        }
      },
      x = (T, P, k, N, _) => {
        const O = { x: k, y: N, view: _ };
        if (T === "damage") {
          const B =
            typeof P == "string" ? parseInt(P.replace("damage-", "")) : P;
          c((z) => ({ ...z, [B]: O })), o(B, { position: O });
        } else {
          const B = P;
          m((z) => ({ ...z, [B]: O })), r(B, { position: O });
        }
      },
      S = () => {
        if (t !== void 0) {
          const k = { x: 0.5, y: 0.5, view: "whole" },
            N = `damage-${t}`;
          l[t]
            ? o(t, { position: k, orderIndex: p[N] || g })
            : (h((_) => ({ ..._, [N]: g })),
              v((_) => _ + 1),
              o(t, { position: k, orderIndex: g })),
            c((_) => ({ ..._, [t]: k }));
          return;
        }
        if (n) {
          const k = { x: 0.5, y: 0.5, view: "whole" };
          u[n]
            ? r(n, { position: k, orderIndex: p[n] || g })
            : (h((N) => ({ ...N, [n]: g })),
              v((N) => N + 1),
              r(n, { position: k, orderIndex: g })),
            m((N) => ({ ...N, [n]: k }));
          return;
        }
        const T = w();
        if (!T) return;
        const P = { x: 0.5, y: 0.5, view: "whole" };
        if (T.type === "damage") {
          const k = T.id,
            N = `damage-${k}`;
          h((_) => ({ ..._, [N]: g })),
            o(k, { position: P, orderIndex: g }),
            c((_) => ({ ..._, [k]: P })),
            v((_) => _ + 1);
        } else {
          const k = T.id;
          h((N) => ({ ...N, [k]: g })),
            r(k, { position: P, orderIndex: g }),
            m((N) => ({ ...N, [k]: P })),
            v((N) => N + 1);
        }
      },
      b = (T, P) => {
        T.stopPropagation();
        const k = `damage-${P}`,
          { [P]: N, ..._ } = l;
        c(_);
        const { [k]: O, ...B } = p;
        h(B);
        const z = e.damageDetails[`damage-${P}`] || {},
          { position: K, orderIndex: Q, ...G } = z;
        o(P, G);
      },
      C = (T, P) => {
        T.stopPropagation();
        const { [P]: k, ...N } = u;
        m(N);
        const { [P]: _, ...O } = p;
        if ((h(O), e.defectDetails && e.defectDetails[P])) {
          const { position: B, orderIndex: z, ...K } = e.defectDetails[P];
          r(P, K);
        }
      },
      D = () => {
        c({}),
          m({}),
          h({}),
          v(1),
          e.damages.forEach((T, P) => {
            var k;
            if ((k = e.damageDetails[`damage-${P}`]) != null && k.position) {
              const N = e.damageDetails[`damage-${P}`] || {},
                { position: _, orderIndex: O, ...B } = N;
              o(P, B);
            }
          }),
          e.defectDetails &&
            Object.entries(e.otherIssues).forEach(([T, P]) => {
              var k;
              if (
                P &&
                e.defectDetails &&
                (k = e.defectDetails[T]) != null &&
                k.position
              ) {
                const { position: N, orderIndex: _, ...O } = e.defectDetails[T];
                r(T, O);
              }
            });
      },
      A = (T) => T.view === "whole",
      E = (T) => {
        var N, _;
        const k = (
          e.type
            ? ((_ =
                (N = window.PRODUCT_OPTIONS) == null ? void 0 : N[e.type]) ==
              null
                ? void 0
                : _.otherIssues) || []
            : []
        ).find((O) => O.id === T);
        return (k == null ? void 0 : k.label) || T;
      },
      L = {};
    e.type &&
      (
        ((R = (I = window.PRODUCT_OPTIONS) == null ? void 0 : I[e.type]) == null
          ? void 0
          : R.otherIssues) || []
      ).forEach((P) => {
        L[P.id] = P.label;
      });
    const $ = t !== void 0 ? !!l[t] : n ? !!u[n] : !1,
      W = t !== void 0 || !!n,
      U = Object.keys(l).length + Object.keys(u).length,
      q =
        e.damages.length +
        Object.entries(e.otherIssues).filter(([T, P]) => P).length,
      M = W && $;
    return d.jsxs("div", {
      "data-lov-id":
        "src/components/order/damage-marker/GarmentDamageMarker.tsx:508:4",
      "data-lov-name": "div",
      "data-component-path":
        "src/components/order/damage-marker/GarmentDamageMarker.tsx",
      "data-component-line": "508",
      "data-component-file": "GarmentDamageMarker.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22mt-3%20space-y-3%22%7D",
      className: "mt-3 space-y-3",
      children: [
        d.jsx(mE, {
          "data-lov-id":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx:509:6",
          "data-lov-name": "InstructionMessage",
          "data-component-path":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx",
          "data-component-line": "509",
          "data-component-file": "GarmentDamageMarker.tsx",
          "data-component-name": "InstructionMessage",
          "data-component-content": "%7B%7D",
          productType: e.type,
          isMarked: $,
          isSingleMarkMode: W,
        }),
        d.jsxs("div", {
          "data-lov-id":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx:515:6",
          "data-lov-name": "div",
          "data-component-path":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx",
          "data-component-line": "515",
          "data-component-file": "GarmentDamageMarker.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20flex-col%20gap-2%22%7D",
          className: "flex flex-col gap-2",
          children: [
            d.jsx(dE, {
              "data-lov-id":
                "src/components/order/damage-marker/GarmentDamageMarker.tsx:516:8",
              "data-lov-name": "WholeProductList",
              "data-component-path":
                "src/components/order/damage-marker/GarmentDamageMarker.tsx",
              "data-component-line": "516",
              "data-component-file": "GarmentDamageMarker.tsx",
              "data-component-name": "WholeProductList",
              "data-component-content": "%7B%7D",
              product: e,
              damagePositions: l,
              defectPositions: u,
              isWholeProductMarker: A,
              removeMarker: b,
              removeDefectMarker: C,
              getDefectLabel: E,
              markerSelectionOrder: p,
            }),
            d.jsx(uE, {
              "data-lov-id":
                "src/components/order/damage-marker/GarmentDamageMarker.tsx:527:8",
              "data-lov-name": "MarkerButtons",
              "data-component-path":
                "src/components/order/damage-marker/GarmentDamageMarker.tsx",
              "data-component-line": "527",
              "data-component-file": "GarmentDamageMarker.tsx",
              "data-component-name": "MarkerButtons",
              "data-component-content": "%7B%7D",
              isMarked: $,
              onMarkWholeProduct: S,
              onResetAllMarkers: D,
              isSingleMarkMode: W,
            }),
          ],
        }),
        d.jsx(cE, {
          "data-lov-id":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx:536:6",
          "data-lov-name": "GarmentView",
          "data-component-path":
            "src/components/order/damage-marker/GarmentDamageMarker.tsx",
          "data-component-line": "536",
          "data-component-file": "GarmentDamageMarker.tsx",
          "data-component-name": "GarmentView",
          "data-component-content": "%7B%7D",
          productType: e.type,
          imageUrl: i,
          onMarkPosition: y,
          disabled: M,
          maxMarks: q,
          currentMarks: U,
          selectedForMarking: a !== void 0 || s !== void 0,
          damagePositions: l,
          defectPositions: u,
          productDamages: e.damages,
          defectLabels: L,
          onMarkerDrag: x,
          markerSelectionOrder: p,
        }),
      ],
    });
  };
var Mc = "rovingFocusGroup.onEntryFocus",
  pE = { bubbles: !1, cancelable: !0 },
  Ll = "RovingFocusGroup",
  [ou, oy, fE] = Dl(Ll),
  [hE, Jr] = xm(Ll, [fE]),
  [vE, gE] = hE(Ll),
  ry = f.forwardRef((e, t) =>
    d.jsx(ou.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: d.jsx(ou.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: d.jsx(xE, { ...e, ref: t }),
      }),
    }),
  );
ry.displayName = Ll;
var xE = f.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: o,
        loop: r = !1,
        dir: a,
        currentTabStopId: s,
        defaultCurrentTabStopId: i,
        onCurrentTabStopIdChange: l,
        onEntryFocus: c,
        preventScrollOnEntryFocus: u = !1,
        ...m
      } = e,
      p = f.useRef(null),
      h = re(t, p),
      g = xs(a),
      [v = null, w] = xn({ prop: s, defaultProp: i, onChange: l }),
      [y, x] = f.useState(!1),
      S = Ue(c),
      b = oy(n),
      C = f.useRef(!1),
      [D, A] = f.useState(0);
    return (
      f.useEffect(() => {
        const E = p.current;
        if (E)
          return E.addEventListener(Mc, S), () => E.removeEventListener(Mc, S);
      }, [S]),
      d.jsx(vE, {
        scope: n,
        orientation: o,
        dir: g,
        loop: r,
        currentTabStopId: v,
        onItemFocus: f.useCallback((E) => w(E), [w]),
        onItemShiftTab: f.useCallback(() => x(!0), []),
        onFocusableItemAdd: f.useCallback(() => A((E) => E + 1), []),
        onFocusableItemRemove: f.useCallback(() => A((E) => E - 1), []),
        children: d.jsx(J.div, {
          tabIndex: y || D === 0 ? -1 : 0,
          "data-orientation": o,
          ...m,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: V(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: V(e.onFocus, (E) => {
            const L = !C.current;
            if (E.target === E.currentTarget && L && !y) {
              const $ = new CustomEvent(Mc, pE);
              if ((E.currentTarget.dispatchEvent($), !$.defaultPrevented)) {
                const W = b().filter((R) => R.focusable),
                  U = W.find((R) => R.active),
                  q = W.find((R) => R.id === v),
                  I = [U, q, ...W].filter(Boolean).map((R) => R.ref.current);
                iy(I, u);
              }
            }
            C.current = !1;
          }),
          onBlur: V(e.onBlur, () => x(!1)),
        }),
      })
    );
  }),
  ay = "RovingFocusGroupItem",
  sy = f.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: o = !0,
        active: r = !1,
        tabStopId: a,
        ...s
      } = e,
      i = Xt(),
      l = a || i,
      c = gE(ay, n),
      u = c.currentTabStopId === l,
      m = oy(n),
      { onFocusableItemAdd: p, onFocusableItemRemove: h } = c;
    return (
      f.useEffect(() => {
        if (o) return p(), () => h();
      }, [o, p, h]),
      d.jsx(ou.ItemSlot, {
        scope: n,
        id: l,
        focusable: o,
        active: r,
        children: d.jsx(J.span, {
          tabIndex: u ? 0 : -1,
          "data-orientation": c.orientation,
          ...s,
          ref: t,
          onMouseDown: V(e.onMouseDown, (g) => {
            o ? c.onItemFocus(l) : g.preventDefault();
          }),
          onFocus: V(e.onFocus, () => c.onItemFocus(l)),
          onKeyDown: V(e.onKeyDown, (g) => {
            if (g.key === "Tab" && g.shiftKey) {
              c.onItemShiftTab();
              return;
            }
            if (g.target !== g.currentTarget) return;
            const v = SE(g, c.orientation, c.dir);
            if (v !== void 0) {
              if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
              g.preventDefault();
              let y = m()
                .filter((x) => x.focusable)
                .map((x) => x.ref.current);
              if (v === "last") y.reverse();
              else if (v === "prev" || v === "next") {
                v === "prev" && y.reverse();
                const x = y.indexOf(g.currentTarget);
                y = c.loop ? bE(y, x + 1) : y.slice(x + 1);
              }
              setTimeout(() => iy(y));
            }
          }),
        }),
      })
    );
  });
sy.displayName = ay;
var yE = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function wE(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function SE(e, t, n) {
  const o = wE(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))
  )
    return yE[o];
}
function iy(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (
      o === n ||
      (o.focus({ preventScroll: t }), document.activeElement !== n)
    )
      return;
}
function bE(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Wm = ry,
  Gm = sy,
  Hm = "Radio",
  [CE, ly] = en(Hm),
  [kE, PE] = CE(Hm),
  cy = f.forwardRef((e, t) => {
    const {
        __scopeRadio: n,
        name: o,
        checked: r = !1,
        required: a,
        disabled: s,
        value: i = "on",
        onCheck: l,
        form: c,
        ...u
      } = e,
      [m, p] = f.useState(null),
      h = re(t, (w) => p(w)),
      g = f.useRef(!1),
      v = m ? c || !!m.closest("form") : !0;
    return d.jsxs(kE, {
      scope: n,
      checked: r,
      disabled: s,
      children: [
        d.jsx(J.button, {
          type: "button",
          role: "radio",
          "aria-checked": r,
          "data-state": my(r),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: h,
          onClick: V(e.onClick, (w) => {
            r || l == null || l(),
              v &&
                ((g.current = w.isPropagationStopped()),
                g.current || w.stopPropagation());
          }),
        }),
        v &&
          d.jsx(_E, {
            control: m,
            bubbles: !g.current,
            name: o,
            value: i,
            checked: r,
            required: a,
            disabled: s,
            form: c,
            style: { transform: "translateX(-100%)" },
          }),
      ],
    });
  });
cy.displayName = Hm;
var dy = "RadioIndicator",
  uy = f.forwardRef((e, t) => {
    const { __scopeRadio: n, forceMount: o, ...r } = e,
      a = PE(dy, n);
    return d.jsx(vt, {
      present: o || a.checked,
      children: d.jsx(J.span, {
        "data-state": my(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t,
      }),
    });
  });
uy.displayName = dy;
var _E = (e) => {
  const { control: t, checked: n, bubbles: o = !0, ...r } = e,
    a = f.useRef(null),
    s = Fm(n),
    i = ym(t);
  return (
    f.useEffect(() => {
      const l = a.current,
        c = window.HTMLInputElement.prototype,
        m = Object.getOwnPropertyDescriptor(c, "checked").set;
      if (s !== n && m) {
        const p = new Event("click", { bubbles: o });
        m.call(l, n), l.dispatchEvent(p);
      }
    }, [s, n, o]),
    d.jsx("input", {
      type: "radio",
      "aria-hidden": !0,
      defaultChecked: n,
      ...r,
      tabIndex: -1,
      ref: a,
      style: {
        ...e.style,
        ...i,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
      },
    })
  );
};
function my(e) {
  return e ? "checked" : "unchecked";
}
var AE = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  Km = "RadioGroup",
  [DE, qT] = en(Km, [Jr, ly]),
  py = Jr(),
  fy = ly(),
  [EE, NE] = DE(Km),
  hy = f.forwardRef((e, t) => {
    const {
        __scopeRadioGroup: n,
        name: o,
        defaultValue: r,
        value: a,
        required: s = !1,
        disabled: i = !1,
        orientation: l,
        dir: c,
        loop: u = !0,
        onValueChange: m,
        ...p
      } = e,
      h = py(n),
      g = xs(c),
      [v, w] = xn({ prop: a, defaultProp: r, onChange: m });
    return d.jsx(EE, {
      scope: n,
      name: o,
      required: s,
      disabled: i,
      value: v,
      onValueChange: w,
      children: d.jsx(Wm, {
        asChild: !0,
        ...h,
        orientation: l,
        dir: g,
        loop: u,
        children: d.jsx(J.div, {
          role: "radiogroup",
          "aria-required": s,
          "aria-orientation": l,
          "data-disabled": i ? "" : void 0,
          dir: g,
          ...p,
          ref: t,
        }),
      }),
    });
  });
hy.displayName = Km;
var vy = "RadioGroupItem",
  gy = f.forwardRef((e, t) => {
    const { __scopeRadioGroup: n, disabled: o, ...r } = e,
      a = NE(vy, n),
      s = a.disabled || o,
      i = py(n),
      l = fy(n),
      c = f.useRef(null),
      u = re(t, c),
      m = a.value === r.value,
      p = f.useRef(!1);
    return (
      f.useEffect(() => {
        const h = (v) => {
            AE.includes(v.key) && (p.current = !0);
          },
          g = () => (p.current = !1);
        return (
          document.addEventListener("keydown", h),
          document.addEventListener("keyup", g),
          () => {
            document.removeEventListener("keydown", h),
              document.removeEventListener("keyup", g);
          }
        );
      }, []),
      d.jsx(Gm, {
        asChild: !0,
        ...i,
        focusable: !s,
        active: m,
        children: d.jsx(cy, {
          disabled: s,
          required: a.required,
          checked: m,
          ...l,
          ...r,
          name: a.name,
          ref: u,
          onCheck: () => a.onValueChange(r.value),
          onKeyDown: V((h) => {
            h.key === "Enter" && h.preventDefault();
          }),
          onFocus: V(r.onFocus, () => {
            var h;
            p.current && ((h = c.current) == null || h.click());
          }),
        }),
      })
    );
  });
gy.displayName = vy;
var OE = "RadioGroupIndicator",
  xy = f.forwardRef((e, t) => {
    const { __scopeRadioGroup: n, ...o } = e,
      r = fy(n);
    return d.jsx(uy, { ...r, ...o, ref: t });
  });
xy.displayName = OE;
var yy = hy,
  wy = gy,
  IE = xy;
const Sy = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(yy, {
    "data-lov-id": "src/components/ui/radio-group.tsx:12:4",
    "data-lov-name": "RadioGroupPrimitive.Root",
