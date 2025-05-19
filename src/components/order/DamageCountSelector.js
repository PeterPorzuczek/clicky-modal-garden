      "data-component-path": "src/components/order/DamageCountSelector.tsx",
      "data-component-line": "17",
      "data-component-file": "DamageCountSelector.tsx",
      "data-component-name": "div",
      "data-component-content": "%7B%22className%22%3A%22space-y-2%22%7D",
      className: "space-y-2",
      children: [
        d.jsx("label", {
          "data-lov-id": "src/components/order/DamageCountSelector.tsx:18:6",
          "data-lov-name": "label",
          "data-component-path": "src/components/order/DamageCountSelector.tsx",
          "data-component-line": "18",
          "data-component-file": "DamageCountSelector.tsx",
          "data-component-name": "label",
          "data-component-content":
            "%7B%22text%22%3A%22Antal%20skador%22%2C%22className%22%3A%22font-medium%22%7D",
          className: "font-medium",
          children: "Antal skador",
        }),
        d.jsxs("div", {
          "data-lov-id": "src/components/order/DamageCountSelector.tsx:21:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/DamageCountSelector.tsx",
          "data-component-line": "21",
          "data-component-file": "DamageCountSelector.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20items-center%20justify-between%20w-full%20max-w-xs%20h-14%20rounded-lg%20border%20border-input%20overflow-hidden%20bg-white%22%7D",
          className:
            "flex items-center justify-between w-full max-w-xs h-14 rounded-lg border border-input overflow-hidden bg-white",
          children: [
            d.jsx("button", {
              "data-lov-id":
                "src/components/order/DamageCountSelector.tsx:22:8",
              "data-lov-name": "button",
              "data-component-path":
                "src/components/order/DamageCountSelector.tsx",
              "data-component-line": "22",
              "data-component-file": "DamageCountSelector.tsx",
              "data-component-name": "button",
              "data-component-content":
                "%7B%22className%22%3A%22flex%20items-center%20justify-center%20h-full%20px-6%20cursor-pointer%20text-gray-500%20hover%3Abg-gray-50%22%7D",
              type: "button",
              className:
                "flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50",
              onClick: () => n(t - 1, e),
              disabled: t <= 0,
              children: d.jsx(kx, {
                "data-lov-id":
                  "src/components/order/DamageCountSelector.tsx:28:10",
                "data-lov-name": "Minus",
                "data-component-path":
                  "src/components/order/DamageCountSelector.tsx",
                "data-component-line": "28",
                "data-component-file": "DamageCountSelector.tsx",
                "data-component-name": "Minus",
                "data-component-content":
                  "%7B%22className%22%3A%22h-5%20w-5%22%7D",
                className: "h-5 w-5",
              }),
            }),
            d.jsx("span", {
              "data-lov-id":
                "src/components/order/DamageCountSelector.tsx:30:8",
              "data-lov-name": "span",
              "data-component-path":
                "src/components/order/DamageCountSelector.tsx",
              "data-component-line": "30",
              "data-component-file": "DamageCountSelector.tsx",
              "data-component-name": "span",
              "data-component-content":
                "%7B%22className%22%3A%22text-xl%20font-medium%20flex-1%20text-center%22%7D",
              className: "text-xl font-medium flex-1 text-center",
              children: t,
            }),
            d.jsx("button", {
              "data-lov-id":
                "src/components/order/DamageCountSelector.tsx:33:8",
              "data-lov-name": "button",
              "data-component-path":
                "src/components/order/DamageCountSelector.tsx",
              "data-component-line": "33",
              "data-component-file": "DamageCountSelector.tsx",
              "data-component-name": "button",
              "data-component-content":
                "%7B%22className%22%3A%22flex%20items-center%20justify-center%20h-full%20px-6%20cursor-pointer%20text-gray-500%20hover%3Abg-gray-50%22%7D",
              type: "button",
              className:
                "flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50",
              onClick: () => n(t + 1, e),
              children: d.jsx(Px, {
                "data-lov-id":
                  "src/components/order/DamageCountSelector.tsx:38:10",
                "data-lov-name": "Plus",
                "data-component-path":
                  "src/components/order/DamageCountSelector.tsx",
                "data-component-line": "38",
                "data-component-file": "DamageCountSelector.tsx",
                "data-component-name": "Plus",
                "data-component-content":
                  "%7B%22className%22%3A%22h-5%20w-5%22%7D",
                className: "h-5 w-5",
              }),
            }),
          ],
        }),
      ],
    }),
  lE = Ol(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default:
            "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
          outline: "text-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  );
function ty({ className: e, variant: t, ...n }) {
  return d.jsx("div", {
    "data-lov-id": "src/components/ui/badge.tsx:32:4",
    "data-lov-name": "div",
