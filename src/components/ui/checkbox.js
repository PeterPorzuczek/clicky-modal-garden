    "data-component-path": "src/components/ui/checkbox.tsx",
    "data-component-line": "11",
    "data-component-file": "checkbox.tsx",
    "data-component-name": "CheckboxPrimitive.Root",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      e,
    ),
    ...t,
    children: d.jsx(FE, {
      "data-lov-id": "src/components/ui/checkbox.tsx:19:4",
      "data-lov-name": "CheckboxPrimitive.Indicator",
      "data-component-path": "src/components/ui/checkbox.tsx",
      "data-component-line": "19",
      "data-component-file": "checkbox.tsx",
      "data-component-name": "CheckboxPrimitive.Indicator",
      "data-component-content": "%7B%7D",
      className: Y("flex items-center justify-center text-current"),
      children: d.jsx(gs, {
        "data-lov-id": "src/components/ui/checkbox.tsx:22:6",
        "data-lov-name": "Check",
        "data-component-path": "src/components/ui/checkbox.tsx",
        "data-component-line": "22",
        "data-component-file": "checkbox.tsx",
        "data-component-name": "Check",
        "data-component-content": "%7B%22className%22%3A%22h-4%20w-4%22%7D",
        className: "h-4 w-4",
      }),
    }),
  }),
);
gr.displayName = Dy.displayName;
const UE = ({
    product: e,
    productOptions: t,
    toggleOtherIssue: n,
    handleMarkDefect: o,
    selectedDefect: r,
    activeMarkerDefect: a,
    updateDefectDetail: s,
    error: i,
    isRequired: l,
    positionErrors: c = {},
  }) => {
    if (!t || !t.otherIssues) return null;
    const u = (m) => {
      var p;
      return (
        e.defectDetails &&
        ((p = e.defectDetails[m]) == null ? void 0 : p.position) !== void 0
      );
    };
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/DefectsSection.tsx:42:4",
      "data-lov-name": "div",
