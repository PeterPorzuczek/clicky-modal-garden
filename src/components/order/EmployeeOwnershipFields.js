      "data-component-path": "src/components/order/EmployeeOwnershipFields.tsx",
      "data-component-line": "34",
      "data-component-file": "EmployeeOwnershipFields.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22mt-4%20pt-4%20border-t%20border-gray-200%22%7D",
      className: "mt-4 pt-4 border-t border-gray-200",
      children: [
        d.jsxs("div", {
          "data-lov-id":
            "src/components/order/EmployeeOwnershipFields.tsx:35:6",
          "data-lov-name": "div",
          "data-component-path":
            "src/components/order/EmployeeOwnershipFields.tsx",
          "data-component-line": "35",
          "data-component-file": "EmployeeOwnershipFields.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20items-start%20space-x-2%20mb-4%22%7D",
          className: "flex items-start space-x-2 mb-4",
          children: [
            d.jsx(gr, {
              "data-lov-id":
                "src/components/order/EmployeeOwnershipFields.tsx:36:8",
              "data-lov-name": "Checkbox",
              "data-component-path":
                "src/components/order/EmployeeOwnershipFields.tsx",
              "data-component-line": "36",
              "data-component-file": "EmployeeOwnershipFields.tsx",
              "data-component-name": "Checkbox",
              "data-component-content": "%7B%7D",
              id: `${s}isEmployeeOwned`,
              checked: e.isEmployeeOwned,
              onCheckedChange: (i) => t("isEmployeeOwned", i === !0),
            }),
            d.jsx("label", {
              "data-lov-id":
                "src/components/order/EmployeeOwnershipFields.tsx:41:8",
              "data-lov-name": "label",
              "data-component-path":
                "src/components/order/EmployeeOwnershipFields.tsx",
              "data-component-line": "41",
              "data-component-file": "EmployeeOwnershipFields.tsx",
              "data-component-name": "label",
              "data-component-content":
                "%7B%22text%22%3A%22Plagg%20tillh%C3%B6r%20anst%C3%A4lld%22%2C%22className%22%3A%22text-sm%20font-medium%20leading-none%20cursor-pointer%22%7D",
              htmlFor: `${s}isEmployeeOwned`,
              className: "text-sm font-medium leading-none cursor-pointer",
              children: "Plagg tillhör anställd",
            }),
          ],
        }),
        e.isEmployeeOwned &&
          d.jsxs("div", {
            "data-lov-id":
              "src/components/order/EmployeeOwnershipFields.tsx:50:8",
            "data-lov-name": "div",
            "data-component-path":
              "src/components/order/EmployeeOwnershipFields.tsx",
            "data-component-line": "50",
            "data-component-file": "EmployeeOwnershipFields.tsx",
            "data-component-name": "div",
            "data-component-content":
              "%7B%22className%22%3A%22ml-6%20space-y-4%22%7D",
            className: "ml-6 space-y-4",
            children: [
              d.jsxs("div", {
                "data-lov-id":
                  "src/components/order/EmployeeOwnershipFields.tsx:51:10",
                "data-lov-name": "div",
                "data-component-path":
                  "src/components/order/EmployeeOwnershipFields.tsx",
                "data-component-line": "51",
                "data-component-file": "EmployeeOwnershipFields.tsx",
                "data-component-name": "div",
                "data-component-content": "%7B%7D",
                children: [
                  d.jsx(ct, {
                    "data-lov-id":
                      "src/components/order/EmployeeOwnershipFields.tsx:52:12",
                    "data-lov-name": "Label",
                    "data-component-path":
                      "src/components/order/EmployeeOwnershipFields.tsx",
                    "data-component-line": "52",
                    "data-component-file": "EmployeeOwnershipFields.tsx",
                    "data-component-name": "Label",
                    "data-component-content":
                      "%7B%22text%22%3A%22Namn%20p%C3%A5%20anst%C3%A4lld%22%7D",
                    htmlFor: `${s}employeeName`,
                    children: "Namn på anställd",
                  }),
                  d.jsx(pe, {
                    "data-lov-id":
                      "src/components/order/EmployeeOwnershipFields.tsx:55:12",
                    "data-lov-name": "Input",
                    "data-component-path":
                      "src/components/order/EmployeeOwnershipFields.tsx",
                    "data-component-line": "55",
                    "data-component-file": "EmployeeOwnershipFields.tsx",
                    "data-component-name": "Input",
                    "data-component-content": "%7B%7D",
                    id: `${s}employeeName`,
                    value: e.employeeName,
                    onChange: (i) => t("employeeName", i.target.value),
                    onBlur: () => (n == null ? void 0 : n(s + "employeeName")),
                    className: a(s + "employeeName") ? "border-red-500" : "",
                  }),
                  a(s + "employeeName") &&
                    d.jsx("p", {
                      "data-lov-id":
                        "src/components/order/EmployeeOwnershipFields.tsx:63:14",
                      "data-lov-name": "p",
                      "data-component-path":
                        "src/components/order/EmployeeOwnershipFields.tsx",
                      "data-component-line": "63",
                      "data-component-file": "EmployeeOwnershipFields.tsx",
                      "data-component-name": "p",
                      "data-component-content":
                        "%7B%22className%22%3A%22text-sm%20text-red-500%20mt-1%22%7D",
                      className: "text-sm text-red-500 mt-1",
                      children: a(s + "employeeName"),
                    }),
                ],
              }),
              d.jsxs("div", {
                "data-lov-id":
                  "src/components/order/EmployeeOwnershipFields.tsx:67:10",
                "data-lov-name": "div",
                "data-component-path":
                  "src/components/order/EmployeeOwnershipFields.tsx",
                "data-component-line": "67",
                "data-component-file": "EmployeeOwnershipFields.tsx",
                "data-component-name": "div",
                "data-component-content": "%7B%7D",
                children: [
                  d.jsx(ct, {
                    "data-lov-id":
                      "src/components/order/EmployeeOwnershipFields.tsx:68:12",
                    "data-lov-name": "Label",
                    "data-component-path":
                      "src/components/order/EmployeeOwnershipFields.tsx",
                    "data-component-line": "68",
                    "data-component-file": "EmployeeOwnershipFields.tsx",
                    "data-component-name": "Label",
                    "data-component-content":
                      "%7B%22text%22%3A%22Avdelning%22%7D",
                    htmlFor: `${s}employeeDepartment`,
                    children: "Avdelning",
                  }),
                  d.jsx(pe, {
                    "data-lov-id":
                      "src/components/order/EmployeeOwnershipFields.tsx:71:12",
                    "data-lov-name": "Input",
                    "data-component-path":
                      "src/components/order/EmployeeOwnershipFields.tsx",
                    "data-component-line": "71",
                    "data-component-file": "EmployeeOwnershipFields.tsx",
                    "data-component-name": "Input",
                    "data-component-content": "%7B%7D",
                    id: `${s}employeeDepartment`,
                    value: e.employeeDepartment,
                    onChange: (i) => t("employeeDepartment", i.target.value),
                    onBlur: () =>
                      n == null ? void 0 : n(s + "employeeDepartment"),
                    className: a(s + "employeeDepartment")
                      ? "border-red-500"
                      : "",
                  }),
                  a(s + "employeeDepartment") &&
                    d.jsx("p", {
                      "data-lov-id":
                        "src/components/order/EmployeeOwnershipFields.tsx:79:14",
                      "data-lov-name": "p",
                      "data-component-path":
                        "src/components/order/EmployeeOwnershipFields.tsx",
                      "data-component-line": "79",
                      "data-component-file": "EmployeeOwnershipFields.tsx",
                      "data-component-name": "p",
                      "data-component-content":
                        "%7B%22className%22%3A%22text-sm%20text-red-500%20mt-1%22%7D",
                      className: "text-sm text-red-500 mt-1",
                      children: a(s + "employeeDepartment"),
                    }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  VE = ({
    product: e,
    productIndex: t,
    handleProductTypeChange: n,
    handleDamageCountChange: o,
    handleDamageTypeChange: r,
    handleTearSizeChange: a,
    toggleOtherIssue: s,
    updateDamageDetail: i,
    updateDefectDetail: l,
    handleMarkDamage: c,
    handleMarkDefect: u,
    handleDropdownOpen: m,
    shouldMarkTouched: p,
    onFieldBlur: h,
    getFieldError: g,
    getTearSizeError: v,
    getTearSize: w,
    hasPositionMarked: y,
    activeMarkerDamage: x,
    activeMarkerDefect: S,
    selectedDamage: b,
    selectedDefect: C,
    handleProductUpdate: D,
    validationErrors: A,
    touchedFields: E,
  }) => {
    const L = g(`product-${e.id}-type`),
      $ = g(`product-${e.id}-other-issues`),
      W = e.type ? Jd[e.type] : null,
      U = (M) => M !== "skor",
      q = (M, I) =>
        g(
          I !== void 0
            ? `product-${M}-damage-${I}-position`
            : `product-${M}-damage-markers`,
        );
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/ProductCard.tsx:96:9",
      "data-lov-name": "div",
