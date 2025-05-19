      "data-component-path": "src/components/order/ProductCard.tsx",
      "data-component-line": "96",
      "data-component-file": "ProductCard.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22bg-%5Bhsl(var(--light-purple))%5D%20p-4%20rounded-lg%20mb-6%22%7D",
      className: "bg-[hsl(var(--light-purple))] p-4 rounded-lg mb-6",
      children: [
        d.jsxs("div", {
          "data-lov-id": "src/components/order/ProductCard.tsx:97:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/ProductCard.tsx",
          "data-component-line": "97",
          "data-component-file": "ProductCard.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20justify-between%20items-center%20mb-3%22%7D",
          className: "flex justify-between items-center mb-3",
          children: [
            d.jsxs("h3", {
              "data-lov-id": "src/components/order/ProductCard.tsx:98:8",
              "data-lov-name": "h3",
              "data-component-path": "src/components/order/ProductCard.tsx",
              "data-component-line": "98",
              "data-component-file": "ProductCard.tsx",
              "data-component-name": "h3",
              "data-component-content":
                "%7B%22text%22%3A%22Produkt%20%23%22%2C%22className%22%3A%22text-lg%20font-medium%22%7D",
              className: "text-lg font-medium",
              children: ["Produkt #", e.id],
            }),
            d.jsxs("div", {
              "data-lov-id": "src/components/order/ProductCard.tsx:99:8",
              "data-lov-name": "div",
              "data-component-path": "src/components/order/ProductCard.tsx",
              "data-component-line": "99",
              "data-component-file": "ProductCard.tsx",
              "data-component-name": "div",
              "data-component-content":
                "%7B%22className%22%3A%22flex%20items-center%20text-sm%20font-medium%20text-gray-700%20bg-white%20px-2%20py-1%20rounded%20border%20border-gray-200%22%7D",
              className:
                "flex items-center text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded border border-gray-200",
              children: [
                d.jsx(dA, {
                  "data-lov-id": "src/components/order/ProductCard.tsx:100:10",
                  "data-lov-name": "Tag",
                  "data-component-path": "src/components/order/ProductCard.tsx",
                  "data-component-line": "100",
                  "data-component-file": "ProductCard.tsx",
                  "data-component-name": "Tag",
                  "data-component-content":
                    "%7B%22className%22%3A%22h-4%20w-4%20mr-1%20text-blue-600%22%7D",
                  className: "h-4 w-4 mr-1 text-blue-600",
                }),
                d.jsxs("span", {
                  "data-lov-id": "src/components/order/ProductCard.tsx:101:10",
                  "data-lov-name": "span",
                  "data-component-path": "src/components/order/ProductCard.tsx",
                  "data-component-line": "101",
                  "data-component-file": "ProductCard.tsx",
                  "data-component-name": "span",
                  "data-component-content":
                    "%7B%22text%22%3A%22Lagnings%20id%3A%20L%22%7D",
                  children: ["Lagnings id: L", e.repairId || "00000"],
                }),
              ],
            }),
          ],
        }),
        d.jsxs("div", {
          "data-lov-id": "src/components/order/ProductCard.tsx:105:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/ProductCard.tsx",
          "data-component-line": "105",
          "data-component-file": "ProductCard.tsx",
          "data-component-name": "div",
          "data-component-content": "%7B%22className%22%3A%22space-y-6%22%7D",
          className: "space-y-6",
          children: [
            d.jsx(sE, {
              "data-lov-id": "src/components/order/ProductCard.tsx:107:8",
              "data-lov-name": "ProductTypeSelector",
              "data-component-path": "src/components/order/ProductCard.tsx",
              "data-component-line": "107",
              "data-component-file": "ProductCard.tsx",
              "data-component-name": "ProductTypeSelector",
              "data-component-content": "%7B%7D",
              productId: e.id,
              productType: e.type,
              onTypeChange: n,
              onOpenChange: (M) => {
                m(`product-${e.id}-type`, M),
                  !M && p(`product-${e.id}-type`) && h(`product-${e.id}-type`);
              },
              error: L,
            }),
            e.type &&
              d.jsxs(d.Fragment, {
                children: [
                  U(e.type) &&
                    d.jsx(iE, {
                      "data-lov-id":
                        "src/components/order/ProductCard.tsx:117:54",
                      "data-lov-name": "DamageCountSelector",
                      "data-component-path":
                        "src/components/order/ProductCard.tsx",
                      "data-component-line": "117",
                      "data-component-file": "ProductCard.tsx",
                      "data-component-name": "DamageCountSelector",
                      "data-component-content": "%7B%7D",
                      productId: e.id,
                      damageCount: e.damageCount,
                      handleDamageCountChange: o,
                    }),
                  e.damageCount > 0 &&
                    U(e.type) &&
                    W &&
                    d.jsxs("div", {
                      "data-lov-id":
                        "src/components/order/ProductCard.tsx:120:99",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/ProductCard.tsx",
                      "data-component-line": "120",
                      "data-component-file": "ProductCard.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22space-y-4%22%7D",
                      className: "space-y-4",
                      children: [
                        d.jsx("h4", {
                          "data-lov-id":
                            "src/components/order/ProductCard.tsx:121:16",
                          "data-lov-name": "h4",
                          "data-component-path":
                            "src/components/order/ProductCard.tsx",
                          "data-component-line": "121",
                          "data-component-file": "ProductCard.tsx",
                          "data-component-name": "h4",
                          "data-component-content":
                            "%7B%22text%22%3A%22Beskriv%20skador%20p%C3%A5%20plagget%22%2C%22className%22%3A%22font-medium%22%7D",
                          className: "font-medium",
                          children: "Beskriv skador på plagget",
                        }),
                        Array.from({ length: e.damageCount }).map((M, I) => {
                          const R = g(`product-${e.id}-damage-${I + 1}`),
                            T = v(e.id, I),
                            P = q(e.id, I),
                            k = e.damages[I] || "",
                            N = w(e, I),
                            _ = y(e, I),
                            O =
                              (x == null ? void 0 : x.productId) === e.id &&
                              x.damageIndex === I,
                            B =
                              (b == null ? void 0 : b.productId) === e.id &&
                              b.damageIndex === I;
                          return d.jsx(
                            RE,
                            {
                              "data-lov-id":
                                "src/components/order/ProductCard.tsx:134:19",
                              "data-lov-name": "DamageSelector",
                              "data-component-path":
                                "src/components/order/ProductCard.tsx",
                              "data-component-line": "134",
                              "data-component-file": "ProductCard.tsx",
                              "data-component-name": "DamageSelector",
                              "data-component-content": "%7B%7D",
                              product: e,
                              index: I,
                              damageType: k,
                              isSelected: B,
                              hasPosition: _,
                              handleDamageTypeChange: r,
                              handleTearSizeChange: a,
                              handleMarkDamage: c,
                              onOpenChange: (z) => {
                                m(`product-${e.id}-damage-${I + 1}`, z),
                                  !z &&
                                    p(`product-${e.id}-damage-${I + 1}`) &&
                                    h(`product-${e.id}-damage-${I + 1}`);
                              },
                              isMarkingActive: O,
                              damageError: R,
                              tearSizeError: T,
                              positionError: P,
                              updateDamageDetail: (z) => i(e.id, I, z),
                              selectedTearSize: N,
                              productOptions: W,
                            },
                            I,
                          );
                        }),
                      ],
                    }),
                  d.jsx(UE, {
                    "data-lov-id":
                      "src/components/order/ProductCard.tsx:144:12",
                    "data-lov-name": "DefectsSection",
                    "data-component-path":
                      "src/components/order/ProductCard.tsx",
                    "data-component-line": "144",
                    "data-component-file": "ProductCard.tsx",
                    "data-component-name": "DefectsSection",
                    "data-component-content": "%7B%7D",
                    product: e,
                    productOptions: W,
                    toggleOtherIssue: s,
                    handleMarkDefect: u,
                    selectedDefect: C,
                    activeMarkerDefect: S,
                    updateDefectDetail: l,
                    error: $,
                    isRequired:
                      (e.damageCount === 0 && U(e.type)) || !U(e.type),
                  }),
                  h0(e.type) &&
                    !x &&
                    !S &&
                    (e.damageCount > 0 ||
                      Object.values(e.otherIssues).some(Boolean)) &&
                    d.jsxs("div", {
                      "data-lov-id":
                        "src/components/order/ProductCard.tsx:147:176",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/ProductCard.tsx",
                      "data-component-line": "147",
                      "data-component-file": "ProductCard.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22mt-4%20pt-4%20border-t%20border-gray-200%22%7D",
                      className: "mt-4 pt-4 border-t border-gray-200",
                      children: [
                        d.jsx("h4", {
                          "data-lov-id":
                            "src/components/order/ProductCard.tsx:148:16",
                          "data-lov-name": "h4",
                          "data-component-path":
                            "src/components/order/ProductCard.tsx",
                          "data-component-line": "148",
                          "data-component-file": "ProductCard.tsx",
                          "data-component-name": "h4",
                          "data-component-content":
                            "%7B%22text%22%3A%22Markera%20skador%20och%20defekter%22%2C%22className%22%3A%22font-medium%20mb-2%22%7D",
                          className: "font-medium mb-2",
                          children: "Markera skador och defekter",
                        }),
                        d.jsx(ny, {
                          "data-lov-id":
                            "src/components/order/ProductCard.tsx:149:16",
                          "data-lov-name": "GarmentDamageMarker",
                          "data-component-path":
                            "src/components/order/ProductCard.tsx",
                          "data-component-line": "149",
                          "data-component-file": "ProductCard.tsx",
                          "data-component-name": "GarmentDamageMarker",
                          "data-component-content": "%7B%7D",
                          product: e,
                          updateDamageDetail: (M, I) => i(e.id, M, I),
                          updateDefectDetail: (M, I) => l(e.id, M, I),
                          selectedDamageIndex:
                            (b == null ? void 0 : b.productId) === e.id
                              ? b.damageIndex
                              : void 0,
                          selectedDefectId:
                            (C == null ? void 0 : C.productId) === e.id
                              ? C.defectId
                              : void 0,
                        }),
                      ],
                    }),
                  d.jsx(zE, {
                    "data-lov-id":
                      "src/components/order/ProductCard.tsx:153:12",
                    "data-lov-name": "EmployeeOwnershipFields",
                    "data-component-path":
                      "src/components/order/ProductCard.tsx",
                    "data-component-line": "153",
                    "data-component-file": "ProductCard.tsx",
                    "data-component-name": "EmployeeOwnershipFields",
                    "data-component-content": "%7B%7D",
                    product: e,
                    onUpdate: (M, I) => D(e.id, M, I),
                    onFieldBlur: h,
                    touchedFields: E,
                    validationErrors: A,
                  }),
                ],
              }),
          ],
        }),
      ],
    });
  },
  WE = ({
    products: e,
    setProducts: t,
    quantity: n,
    setQuantity: o,
    isProductFormValid: r,
    nextStep: a,
    validationErrors: s,
    touchedFields: i,
    onFieldBlur: l,
  }) => {
    const { handleDropdownOpen: c, shouldMarkTouched: u, resetField: m } = DD(),
      [p, h] = f.useState(null),
      [g, v] = f.useState(null),
      [w, y] = f.useState(null),
      [x, S] = f.useState(null),
      b = () => {
        o((_) => _ + 1),
          t((_) => [
            ..._,
            {
              id: n + 1,
              type: "",
              damageCount: 0,
              damages: [],
              damageDetails: {},
              defectDetails: {},
              otherIssues: {
                stainRemoval: !1,
                refresh: !1,
                extremeStainRemoval: !1,
                lint: !1,
                washing: !1,
                washingImpregnation: !1,
                badSmell: !1,
                extremeRefresh: !1,
                refreshOrWash: !1,
                refreshOrWashExtreme: !1,
              },
              repairId: k(),
              isEmployeeOwned: !1,
              employeeName: "",
              employeeDepartment: "",
            },
          ]);
      },
      C = () => {
        n > 1 && (o((_) => _ - 1), t((_) => _.slice(0, -1)));
      },
      D = (_, O) => {
        t((B) =>
          B.map((z) =>
            z.id === O
              ? {
                  ...z,
                  type: _,
                  damageCount: 0,
                  damages: [],
                  damageDetails: {},
                  defectDetails: {},
                  otherIssues: {
                    stainRemoval: !1,
                    refresh: !1,
                    extremeStainRemoval: !1,
                    lint: !1,
                    washing: !1,
                    washingImpregnation: !1,
                    badSmell: !1,
                    extremeRefresh: !1,
                    refreshOrWash: !1,
                    refreshOrWashExtreme: !1,
                  },
                }
              : z,
          ),
        ),
          (p == null ? void 0 : p.productId) === O && h(null),
          (g == null ? void 0 : g.productId) === O && v(null),
          m(`product-${O}-type`);
      },
      A = (_, O) => {
        const B = e.find((K) => K.id === O);
        if (!B) return;
        _ = Math.max(0, _);
        let z = [...B.damages];
        if (_ > B.damages.length) for (; z.length < _; ) z.push("");
        else z = z.slice(0, _);
        t((K) =>
          K.map((Q) => (Q.id === O ? { ...Q, damageCount: _, damages: z } : Q)),
        ),
          (p == null ? void 0 : p.productId) === O &&
            p.damageIndex >= _ &&
            h(null);
      },
      E = (_, O, B) => {
        y({ productId: O, damageIndex: B }),
          S(null),
          h(null),
          v(null),
          t((z) =>
            z.map((K) => {
              if (K.id === O) {
                const Q = [...K.damages];
                Q[B] = _;
                const G = { ...K.damageDetails };
                if (_ === "tear") G[`damage-${B}`] || (G[`damage-${B}`] = {});
                else if (G[`damage-${B}`]) {
                  const te = G[`damage-${B}`].position;
                  G[`damage-${B}`] = { position: te };
                }
                return { ...K, damages: Q, damageDetails: G };
              }
              return K;
            }),
          ),
          m(`product-${O}-damage-${B + 1}`);
      },
      L = (_, O, B) => {
        t((z) =>
          z.map((K) => {
            if (K.id === O) {
              const Q = { ...K.damageDetails };
              Q[`damage-${B}`] || (Q[`damage-${B}`] = {});
              const G = Q[`damage-${B}`].position;
              return (
                (Q[`damage-${B}`] = { tearSize: _, position: G }),
                { ...K, damageDetails: Q }
              );
            }
            return K;
          }),
        ),
          l(`product-${O}-damage-${B + 1}-tear-size`);
      },
      $ = (_, O) => {
        var z;
        !((z = e.find((K) => K.id === _)) != null && z.otherIssues[O])
          ? (S({ productId: _, defectId: O }), y(null), h(null), v(null))
          : (x == null ? void 0 : x.productId) === _ &&
            x.defectId === O &&
            S(null),
          t((K) =>
            K.map((Q) => {
              if (Q.id === _) {
                const G = !Q.otherIssues[O];
                let te = { ...(Q.defectDetails || {}) };
                if (!G && te[O]) {
                  const { position: ue, ...se } = te[O];
                  if (Object.keys(se).length === 0) {
                    const { [O]: ce, ...ie } = te;
                    te = ie;
                  } else te[O] = se;
                }
                return {
                  ...Q,
                  otherIssues: { ...Q.otherIssues, [O]: G },
                  defectDetails: te,
                };
              }
              return Q;
            }),
          ),
          (g == null ? void 0 : g.productId) === _ &&
            g.defectId === O &&
            v(null),
          l(`product-${_}-other-issues`);
      },
      W = (_, O, B) => {
        t((z) =>
          z.map((K) => {
            if (K.id === _) {
              const Q = { ...K.damageDetails };
              return (
                (Q[`damage-${O}`] = { ...Q[`damage-${O}`], ...B }),
                { ...K, damageDetails: Q }
              );
            }
            return K;
          }),
        );
      },
      U = (_, O, B) => {
        t((z) =>
          z.map((K) => {
            if (K.id === _) {
              const Q = { ...(K.defectDetails || {}) };
              return (Q[O] = { ...Q[O], ...B }), { ...K, defectDetails: Q };
            }
            return K;
          }),
        );
      },
      q = (_, O) => {
        h((B) =>
          (B == null ? void 0 : B.productId) === _ && B.damageIndex === O
            ? null
            : { productId: _, damageIndex: O },
        ),
          v(null),
          y({ productId: _, damageIndex: O }),
          S(null);
      },
      M = (_, O) => {
        v((B) =>
          (B == null ? void 0 : B.productId) === _ && B.defectId === O
            ? null
            : { productId: _, defectId: O },
        ),
          h(null),
          S({ productId: _, defectId: O }),
          y(null);
      },
      I = (_) => {
        if (!i[_]) return null;
        const O = s.find((B) => B.field === _);
        return O ? O.message : null;
      },
      R = (_, O) => {
        var B;
        return (B = _.damageDetails[`damage-${O}`]) == null
          ? void 0
          : B.tearSize;
      },
      T = (_, O, B) => {
        var z, K, Q;
        return O !== void 0
          ? !!((z = _.damageDetails[`damage-${O}`]) != null && z.position)
          : B
            ? !!(
                (Q = (K = _.defectDetails) == null ? void 0 : K[B]) != null &&
                Q.position
              )
            : !1;
      },
      P = (_, O) => {
        const B = `product-${_}-damage-${O + 1}-tear-size`;
        if (!i[B]) return null;
        const z = e.find((K) => K.id === _);
        return z && z.damages[O] === "tear" && !R(z, O)
          ? "Reva-storlek måste väljas"
          : null;
      },
      k = () => Math.floor(1e4 + Math.random() * 9e4).toString(),
      N = (_, O, B) => {
        t((z) => z.map((K) => (K.id === _ ? { ...K, [O]: B } : K))),
          (O === "employeeName" || O === "employeeDepartment") &&
            l(`product-${_}-${O}`);
      };
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/ProductSelectionStep.tsx:431:4",
      "data-lov-name": "div",
