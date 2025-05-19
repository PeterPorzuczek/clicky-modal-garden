    "data-component-path": "src/components/ui/radio-group.tsx",
    "data-component-line": "12",
    "data-component-file": "radio-group.tsx",
    "data-component-name": "RadioGroupPrimitive.Root",
    "data-component-content": "%7B%7D",
    className: Y("grid gap-2", e),
    ...t,
    ref: n,
  }),
);
Sy.displayName = yy.displayName;
const yi = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(wy, {
    "data-lov-id": "src/components/ui/radio-group.tsx:26:4",
    "data-lov-name": "RadioGroupPrimitive.Item",
    "data-component-path": "src/components/ui/radio-group.tsx",
    "data-component-line": "26",
    "data-component-file": "radio-group.tsx",
    "data-component-name": "RadioGroupPrimitive.Item",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e,
    ),
    ...t,
    children: d.jsx(IE, {
      "data-lov-id": "src/components/ui/radio-group.tsx:34:6",
      "data-lov-name": "RadioGroupPrimitive.Indicator",
      "data-component-path": "src/components/ui/radio-group.tsx",
      "data-component-line": "34",
      "data-component-file": "radio-group.tsx",
      "data-component-name": "RadioGroupPrimitive.Indicator",
      "data-component-content":
        "%7B%22className%22%3A%22flex%20items-center%20justify-center%22%7D",
      className: "flex items-center justify-center",
      children: d.jsx(Cx, {
        "data-lov-id": "src/components/ui/radio-group.tsx:35:8",
        "data-lov-name": "Circle",
        "data-component-path": "src/components/ui/radio-group.tsx",
        "data-component-line": "35",
        "data-component-file": "radio-group.tsx",
        "data-component-name": "Circle",
        "data-component-content":
          "%7B%22className%22%3A%22h-2.5%20w-2.5%20fill-current%20text-current%22%7D",
        className: "h-2.5 w-2.5 fill-current text-current",
      }),
    }),
  }),
);
yi.displayName = wy.displayName;
var TE = "Label",
  by = f.forwardRef((e, t) =>
    d.jsx(J.label, {
      ...e,
      ref: t,
      onMouseDown: (n) => {
        var r;
        n.target.closest("button, input, select, textarea") ||
          ((r = e.onMouseDown) == null || r.call(e, n),
          !n.defaultPrevented && n.detail > 1 && n.preventDefault());
      },
    }),
  );
by.displayName = TE;
var Cy = by;
const jE = Ol(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ),
  ct = f.forwardRef(({ className: e, ...t }, n) =>
    d.jsx(Cy, {
      "data-lov-id": "src/components/ui/label.tsx:16:2",
      "data-lov-name": "LabelPrimitive.Root",
