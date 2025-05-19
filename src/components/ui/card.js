    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "10",
    "data-component-file": "card.tsx",
    "data-component-name": "div",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("rounded-lg border bg-card text-card-foreground shadow-sm", e),
    ...t,
  }),
);
uS.displayName = "Card";
const mS = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", {
    "data-lov-id": "src/components/ui/card.tsx:25:2",
    "data-lov-name": "div",
    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "25",
    "data-component-file": "card.tsx",
    "data-component-name": "div",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("flex flex-col space-y-1.5 p-6", e),
    ...t,
  }),
);
mS.displayName = "CardHeader";
const pS = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("h3", {
    "data-lov-id": "src/components/ui/card.tsx:37:2",
    "data-lov-name": "h3",
    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "37",
    "data-component-file": "card.tsx",
    "data-component-name": "h3",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-2xl font-semibold leading-none tracking-tight", e),
    ...t,
  }),
);
pS.displayName = "CardTitle";
const fS = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("p", {
    "data-lov-id": "src/components/ui/card.tsx:52:2",
    "data-lov-name": "p",
    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "52",
    "data-component-file": "card.tsx",
    "data-component-name": "p",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-sm text-muted-foreground", e),
    ...t,
  }),
);
fS.displayName = "CardDescription";
const hu = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", {
    "data-lov-id": "src/components/ui/card.tsx:64:2",
    "data-lov-name": "div",
    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "64",
    "data-component-file": "card.tsx",
    "data-component-name": "div",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("p-6 pt-0", e),
    ...t,
  }),
);
hu.displayName = "CardContent";
const vu = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", {
    "data-lov-id": "src/components/ui/card.tsx:72:2",
    "data-lov-name": "div",
    "data-component-path": "src/components/ui/card.tsx",
    "data-component-line": "72",
    "data-component-file": "card.tsx",
    "data-component-name": "div",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("flex items-center p-6 pt-0", e),
    ...t,
  }),
);
vu.displayName = "CardFooter";
const BT = () => {
    const e = Zg(),
      { user: t, signIn: n, signUp: o } = ew(),
      [r, a] = f.useState("login"),
      [s, i] = f.useState(""),
      [l, c] = f.useState(""),
      [u, m] = f.useState(""),
      [p, h] = f.useState("");
    if (t) return e("/"), null;
    const g = async (w) => {
        w.preventDefault(), await n(s, l);
      },
      v = async (w) => {
        w.preventDefault(), await o(s, l, u, p);
      };
    return d.jsx("div", {
      "data-lov-id": "src/pages/AuthPage.tsx:40:4",
      "data-lov-name": "div",
