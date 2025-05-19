      "data-component-path": "src/components/ui/input.tsx",
      "data-component-line": "8",
      "data-component-file": "input.tsx",
      "data-component-name": "input",
      "data-component-content": "%7B%7D",
      type: t,
      className: Y(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e,
      ),
      ref: o,
      ...n,
    }),
  );
pe.displayName = "Input";
const zE = ({
    product: e,
    onUpdate: t,
    onFieldBlur: n,
    touchedFields: o = {},
    validationErrors: r = [],
  }) => {
    const a = (i) => {
        if (!o[i]) return null;
        const l = r.find((c) => c.field === i);
        return l ? l.message : null;
      },
      s = `product-${e.id}-`;
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/EmployeeOwnershipFields.tsx:34:4",
      "data-lov-name": "div",
