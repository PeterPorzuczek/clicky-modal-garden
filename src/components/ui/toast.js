      "data-component-path": "src/components/ui/toast.tsx",
      "data-component-line": "14",
      "data-component-file": "toast.tsx",
      "data-component-name": "ToastPrimitives.Viewport",
      "data-component-content": "%7B%7D",
      ref: n,
      className: Y(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        e,
      ),
      ...t,
    }),
  );
Ax.displayName = hx.displayName;
const pA = Ol(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  Dx = f.forwardRef(({ className: e, variant: t, ...n }, o) =>
    d.jsx(vx, {
      "data-lov-id": "src/components/ui/toast.tsx:47:4",
      "data-lov-name": "ToastPrimitives.Root",
      "data-component-path": "src/components/ui/toast.tsx",
      "data-component-line": "47",
      "data-component-file": "toast.tsx",
      "data-component-name": "ToastPrimitives.Root",
      "data-component-content": "%7B%7D",
      ref: o,
      className: Y(pA({ variant: t }), e),
      ...n,
    }),
  );
Dx.displayName = vx.displayName;
const fA = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(yx, {
    "data-lov-id": "src/components/ui/toast.tsx:60:2",
    "data-lov-name": "ToastPrimitives.Action",
    "data-component-path": "src/components/ui/toast.tsx",
    "data-component-line": "60",
    "data-component-file": "toast.tsx",
    "data-component-name": "ToastPrimitives.Action",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e,
    ),
    ...t,
  }),
);
fA.displayName = yx.displayName;
const Ex = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(wx, {
    "data-lov-id": "src/components/ui/toast.tsx:75:2",
    "data-lov-name": "ToastPrimitives.Close",
    "data-component-path": "src/components/ui/toast.tsx",
    "data-component-line": "75",
    "data-component-file": "toast.tsx",
    "data-component-name": "ToastPrimitives.Close",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e,
    ),
    "toast-close": "",
    ...t,
    children: d.jsx(os, {
      "data-lov-id": "src/components/ui/toast.tsx:84:4",
      "data-lov-name": "X",
      "data-component-path": "src/components/ui/toast.tsx",
      "data-component-line": "84",
      "data-component-file": "toast.tsx",
      "data-component-name": "X",
      "data-component-content": "%7B%22className%22%3A%22h-4%20w-4%22%7D",
      className: "h-4 w-4",
    }),
  }),
);
Ex.displayName = wx.displayName;
const Nx = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(gx, {
    "data-lov-id": "src/components/ui/toast.tsx:93:2",
    "data-lov-name": "ToastPrimitives.Title",
    "data-component-path": "src/components/ui/toast.tsx",
    "data-component-line": "93",
    "data-component-file": "toast.tsx",
    "data-component-name": "ToastPrimitives.Title",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-sm font-semibold", e),
    ...t,
  }),
);
Nx.displayName = gx.displayName;
const Ox = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(xx, {
    "data-lov-id": "src/components/ui/toast.tsx:105:2",
    "data-lov-name": "ToastPrimitives.Description",
    "data-component-path": "src/components/ui/toast.tsx",
    "data-component-line": "105",
    "data-component-file": "toast.tsx",
    "data-component-name": "ToastPrimitives.Description",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-sm opacity-90", e),
    ...t,
  }),
);
Ox.displayName = xx.displayName;
function hA() {
  const { toasts: e } = B_();
  return d.jsxs(mA, {
    "data-lov-id": "src/components/ui/toaster.tsx:9:4",
    "data-lov-name": "ToastProvider",
