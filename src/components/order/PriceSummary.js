      "data-component-path": "src/components/order/PriceSummary.tsx",
      "data-component-line": "57",
      "data-component-file": "PriceSummary.tsx",
      "data-component-name": "div",
      "data-component-content": "%7B%22className%22%3A%22space-y-4%22%7D",
      className: "space-y-4",
      children: [
        e.map((l) => {
          if (!l.type) return null;
          const c = l.damageCount * ir,
            m = Object.entries(l.otherIssues).filter(([h, g]) => g).length * ir,
            p = c + m;
          return d.jsxs(
            "div",
            {
              "data-lov-id": "src/components/order/PriceSummary.tsx:73:13",
              "data-lov-name": "div",
              "data-component-path": "src/components/order/PriceSummary.tsx",
              "data-component-line": "73",
              "data-component-file": "PriceSummary.tsx",
              "data-component-name": "div",
              "data-component-content":
                "%7B%22className%22%3A%22border%20border-gray-200%20rounded-md%20p-3%20bg-white%2F0%22%7D",
              className: "border border-gray-200 rounded-md p-3 bg-white/0",
              children: [
                d.jsxs("div", {
                  "data-lov-id": "src/components/order/PriceSummary.tsx:74:12",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/PriceSummary.tsx",
                  "data-component-line": "74",
                  "data-component-file": "PriceSummary.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22text%22%3A%22Produkt%20%23%20%3A%22%2C%22className%22%3A%22font-medium%20border-b%20pb-2%20mb-2%22%7D",
                  className: "font-medium border-b pb-2 mb-2",
                  children: ["Produkt #", l.id, ": ", CD(l.type)],
                }),
                l.damages.map((h, g) => {
                  var S, b, C, D;
                  if (!h) return null;
                  const w =
                      ((b = (
                        ((S = Jd[l.type]) == null ? void 0 : S.damages) || []
                      ).find((A) => A.value === h)) == null
                        ? void 0
                        : b.label) || kD(h),
                    y =
                      h === "tear"
                        ? n(
                            (C = l.damageDetails[`damage-${g}`]) == null
                              ? void 0
                              : C.tearSize,
                          )
                        : "",
                    x = o(
                      (D = l.damageDetails[`damage-${g}`]) == null
                        ? void 0
                        : D.position,
                    );
                  return d.jsxs(
                    "div",
                    {
                      "data-lov-id":
                        "src/components/order/PriceSummary.tsx:92:17",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/PriceSummary.tsx",
                      "data-component-line": "92",
                      "data-component-file": "PriceSummary.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22flex%20justify-between%20text-sm%22%7D",
                      className: "flex justify-between text-sm",
                      children: [
                        d.jsxs("span", {
                          "data-lov-id":
                            "src/components/order/PriceSummary.tsx:93:18",
                          "data-lov-name": "span",
                          "data-component-path":
                            "src/components/order/PriceSummary.tsx",
                          "data-component-line": "93",
                          "data-component-file": "PriceSummary.tsx",
                          "data-component-name": "span",
                          "data-component-content": "%7B%7D",
                          children: [w, y, x],
                        }),
                        d.jsxs("span", {
                          "data-lov-id":
                            "src/components/order/PriceSummary.tsx:94:18",
                          "data-lov-name": "span",
                          "data-component-path":
                            "src/components/order/PriceSummary.tsx",
                          "data-component-line": "94",
                          "data-component-file": "PriceSummary.tsx",
                          "data-component-name": "span",
                          "data-component-content":
                            "%7B%22text%22%3A%22kr%22%7D",
                          children: [ir, " kr"],
                        }),
                      ],
                    },
                    g,
                  );
                }),
                Object.entries(l.otherIssues).map(([h, g]) =>
                  g
                    ? d.jsxs(
                        "div",
                        {
                          "data-lov-id":
                            "src/components/order/PriceSummary.tsx:102:16",
                          "data-lov-name": "div",
                          "data-component-path":
                            "src/components/order/PriceSummary.tsx",
                          "data-component-line": "102",
                          "data-component-file": "PriceSummary.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22flex%20justify-between%20text-sm%22%7D",
                          className: "flex justify-between text-sm",
                          children: [
                            d.jsx("span", {
                              "data-lov-id":
                                "src/components/order/PriceSummary.tsx:103:18",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/PriceSummary.tsx",
                              "data-component-line": "103",
                              "data-component-file": "PriceSummary.tsx",
                              "data-component-name": "span",
                              "data-component-content": "%7B%7D",
                              children: t(h, l.type),
                            }),
                            d.jsxs("span", {
                              "data-lov-id":
                                "src/components/order/PriceSummary.tsx:104:18",
                              "data-lov-name": "span",
                              "data-component-path":
                                "src/components/order/PriceSummary.tsx",
                              "data-component-line": "104",
                              "data-component-file": "PriceSummary.tsx",
                              "data-component-name": "span",
                              "data-component-content":
                                "%7B%22text%22%3A%22kr%22%7D",
                              children: [ir, " kr"],
                            }),
                          ],
                        },
                        h,
                      )
                    : null,
                ),
                d.jsxs("div", {
                  "data-lov-id": "src/components/order/PriceSummary.tsx:110:12",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/PriceSummary.tsx",
                  "data-component-line": "110",
                  "data-component-file": "PriceSummary.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22className%22%3A%22flex%20justify-between%20font-medium%20mt-2%20pt-2%20border-t%20border-gray-200%22%7D",
                  className:
                    "flex justify-between font-medium mt-2 pt-2 border-t border-gray-200",
                  children: [
                    d.jsx("span", {
                      "data-lov-id":
                        "src/components/order/PriceSummary.tsx:111:14",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/PriceSummary.tsx",
                      "data-component-line": "111",
                      "data-component-file": "PriceSummary.tsx",
                      "data-component-name": "span",
                      "data-component-content":
                        "%7B%22text%22%3A%22Delsumma%22%7D",
                      children: "Delsumma",
                    }),
                    d.jsxs("span", {
                      "data-lov-id":
                        "src/components/order/PriceSummary.tsx:112:14",
                      "data-lov-name": "span",
                      "data-component-path":
                        "src/components/order/PriceSummary.tsx",
                      "data-component-line": "112",
                      "data-component-file": "PriceSummary.tsx",
                      "data-component-name": "span",
                      "data-component-content": "%7B%22text%22%3A%22kr%22%7D",
                      children: [p, " kr"],
                    }),
                  ],
                }),
              ],
            },
            l.id,
          );
        }),
        d.jsxs("div", {
          "data-lov-id": "src/components/order/PriceSummary.tsx:118:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/PriceSummary.tsx",
          "data-component-line": "118",
          "data-component-file": "PriceSummary.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20justify-between%20font-medium%20pt-2%20mt-2%20border-t%20border-gray-300%22%7D",
          className:
            "flex justify-between font-medium pt-2 mt-2 border-t border-gray-300",
          children: [
            d.jsx("span", {
              "data-lov-id": "src/components/order/PriceSummary.tsx:119:8",
              "data-lov-name": "span",
              "data-component-path": "src/components/order/PriceSummary.tsx",
              "data-component-line": "119",
              "data-component-file": "PriceSummary.tsx",
              "data-component-name": "span",
              "data-component-content": "%7B%22text%22%3A%22Delsumma%22%7D",
              children: "Delsumma",
            }),
            d.jsxs("span", {
              "data-lov-id": "src/components/order/PriceSummary.tsx:120:8",
              "data-lov-name": "span",
              "data-component-path": "src/components/order/PriceSummary.tsx",
              "data-component-line": "120",
              "data-component-file": "PriceSummary.tsx",
              "data-component-name": "span",
              "data-component-content": "%7B%22text%22%3A%22kr%22%7D",
              children: [r, " kr"],
            }),
          ],
        }),
        a > 0 &&
          d.jsxs("div", {
            "data-lov-id": "src/components/order/PriceSummary.tsx:125:8",
            "data-lov-name": "div",
            "data-component-path": "src/components/order/PriceSummary.tsx",
            "data-component-line": "125",
            "data-component-file": "PriceSummary.tsx",
            "data-component-name": "div",
            "data-component-content":
              "%7B%22className%22%3A%22flex%20justify-between%20text-green-600%20font-medium%22%7D",
            className: "flex justify-between text-green-600 font-medium",
            children: [
              d.jsxs("span", {
                "data-lov-id": "src/components/order/PriceSummary.tsx:126:10",
                "data-lov-name": "span",
                "data-component-path": "src/components/order/PriceSummary.tsx",
                "data-component-line": "126",
                "data-component-file": "PriceSummary.tsx",
                "data-component-name": "span",
                "data-component-content":
                  "%7B%22text%22%3A%22Rabatt%20(%20%25)%22%7D",
                children: ["Rabatt (", a, "%)"],
              }),
              d.jsxs("span", {
                "data-lov-id": "src/components/order/PriceSummary.tsx:127:10",
                "data-lov-name": "span",
                "data-component-path": "src/components/order/PriceSummary.tsx",
                "data-component-line": "127",
                "data-component-file": "PriceSummary.tsx",
                "data-component-name": "span",
                "data-component-content": "%7B%22text%22%3A%22-%20kr%22%7D",
                children: ["-", s, " kr"],
              }),
            ],
          }),
        d.jsxs("div", {
          "data-lov-id": "src/components/order/PriceSummary.tsx:132:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/PriceSummary.tsx",
          "data-component-line": "132",
          "data-component-file": "PriceSummary.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20justify-between%20font-bold%20text-lg%20pt-2%20mt-2%20border-t%20border-gray-300%22%7D",
          className:
            "flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-300",
          children: [
            d.jsx("span", {
              "data-lov-id": "src/components/order/PriceSummary.tsx:133:8",
              "data-lov-name": "span",
              "data-component-path": "src/components/order/PriceSummary.tsx",
              "data-component-line": "133",
              "data-component-file": "PriceSummary.tsx",
              "data-component-name": "span",
              "data-component-content": "%7B%22text%22%3A%22Totalt%22%7D",
              children: "Totalt",
            }),
            d.jsxs("span", {
              "data-lov-id": "src/components/order/PriceSummary.tsx:134:8",
              "data-lov-name": "span",
              "data-component-path": "src/components/order/PriceSummary.tsx",
              "data-component-line": "134",
              "data-component-file": "PriceSummary.tsx",
              "data-component-name": "span",
              "data-component-content": "%7B%22text%22%3A%22kr%22%7D",
              children: [i, " kr"],
            }),
          ],
        }),
      ],
    });
  },
  DD = () => {
    const [e, t] = f.useState({}),
      [n, o] = f.useState({});
    return {
      handleDropdownOpen: (i, l) => {
        t((c) => ({ ...c, [i]: l })), l && o((c) => ({ ...c, [i]: !0 }));
      },
      shouldMarkTouched: (i) => n[i] && !e[i],
      resetField: (i) => {
        o((l) => ({ ...l, [i]: !1 }));
      },
    };
  },
  ED = ({ quantity: e, increaseQuantity: t, decreaseQuantity: n }) =>
    d.jsxs("div", {
      "data-lov-id": "src/components/order/ProductQuantitySelector.tsx:17:4",
      "data-lov-name": "div",
