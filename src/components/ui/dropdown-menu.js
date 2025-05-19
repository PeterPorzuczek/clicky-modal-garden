      "data-component-path": "src/components/ui/dropdown-menu.tsx",
      "data-component-line": "26",
      "data-component-file": "dropdown-menu.tsx",
      "data-component-name": "DropdownMenuPrimitive.SubTrigger",
      "data-component-content": "%7B%7D",
      ref: r,
      className: Y(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        t && "pl-8",
        e,
      ),
      ...o,
      children: [
        n,
        d.jsx(aA, {
          "data-lov-id": "src/components/ui/dropdown-menu.tsx:36:4",
          "data-lov-name": "ChevronRight",
          "data-component-path": "src/components/ui/dropdown-menu.tsx",
          "data-component-line": "36",
          "data-component-file": "dropdown-menu.tsx",
          "data-component-name": "ChevronRight",
          "data-component-content":
            "%7B%22className%22%3A%22ml-auto%20h-4%20w-4%22%7D",
          className: "ml-auto h-4 w-4",
        }),
      ],
    }),
  );
PT.displayName = Hw.displayName;
const _T = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(Kw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:46:2",
    "data-lov-name": "DropdownMenuPrimitive.SubContent",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "46",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.SubContent",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e,
    ),
    ...t,
  }),
);
_T.displayName = Kw.displayName;
const qw = f.forwardRef(({ className: e, sideOffset: t = 4, ...n }, o) =>
  d.jsx(bT, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:62:2",
    "data-lov-name": "DropdownMenuPrimitive.Portal",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "62",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.Portal",
    "data-component-content": "%7B%7D",
    children: d.jsx($w, {
      "data-lov-id": "src/components/ui/dropdown-menu.tsx:63:4",
      "data-lov-name": "DropdownMenuPrimitive.Content",
      "data-component-path": "src/components/ui/dropdown-menu.tsx",
      "data-component-line": "63",
      "data-component-file": "dropdown-menu.tsx",
      "data-component-name": "DropdownMenuPrimitive.Content",
      "data-component-content": "%7B%7D",
      ref: o,
      sideOffset: t,
      className: Y(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e,
      ),
      ...n,
    }),
  }),
);
qw.displayName = $w.displayName;
const Qw = f.forwardRef(({ className: e, inset: t, ...n }, o) =>
  d.jsx(Uw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:82:2",
    "data-lov-name": "DropdownMenuPrimitive.Item",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "82",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.Item",
    "data-component-content": "%7B%7D",
    ref: o,
    className: Y(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e,
    ),
    ...n,
  }),
);
Qw.displayName = Uw.displayName;
const AT = f.forwardRef(({ className: e, children: t, checked: n, ...o }, r) =>
  d.jsxs(zw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:98:2",
    "data-lov-name": "DropdownMenuPrimitive.CheckboxItem",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "98",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.CheckboxItem",
    "data-component-content": "%7B%7D",
    ref: r,
    className: Y(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    checked: n,
    ...o,
    children: [
      d.jsx("span", {
        "data-lov-id": "src/components/ui/dropdown-menu.tsx:107:4",
        "data-lov-name": "span",
        "data-component-path": "src/components/ui/dropdown-menu.tsx",
        "data-component-line": "107",
        "data-component-file": "dropdown-menu.tsx",
        "data-component-name": "span",
        "data-component-content":
          "%7B%22className%22%3A%22absolute%20left-2%20flex%20h-3.5%20w-3.5%20items-center%20justify-center%22%7D",
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: d.jsx(Ww, {
          "data-lov-id": "src/components/ui/dropdown-menu.tsx:108:6",
          "data-lov-name": "DropdownMenuPrimitive.ItemIndicator",
          "data-component-path": "src/components/ui/dropdown-menu.tsx",
          "data-component-line": "108",
          "data-component-file": "dropdown-menu.tsx",
          "data-component-name": "DropdownMenuPrimitive.ItemIndicator",
          "data-component-content": "%7B%7D",
          children: d.jsx(gs, {
            "data-lov-id": "src/components/ui/dropdown-menu.tsx:109:8",
            "data-lov-name": "Check",
            "data-component-path": "src/components/ui/dropdown-menu.tsx",
            "data-component-line": "109",
            "data-component-file": "dropdown-menu.tsx",
            "data-component-name": "Check",
            "data-component-content": "%7B%22className%22%3A%22h-4%20w-4%22%7D",
            className: "h-4 w-4",
          }),
        }),
      }),
      t,
    ],
  }),
);
AT.displayName = zw.displayName;
const DT = f.forwardRef(({ className: e, children: t, ...n }, o) =>
  d.jsxs(Vw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:122:2",
    "data-lov-name": "DropdownMenuPrimitive.RadioItem",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "122",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.RadioItem",
    "data-component-content": "%7B%7D",
    ref: o,
    className: Y(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...n,
    children: [
      d.jsx("span", {
        "data-lov-id": "src/components/ui/dropdown-menu.tsx:130:4",
        "data-lov-name": "span",
        "data-component-path": "src/components/ui/dropdown-menu.tsx",
        "data-component-line": "130",
        "data-component-file": "dropdown-menu.tsx",
        "data-component-name": "span",
        "data-component-content":
          "%7B%22className%22%3A%22absolute%20left-2%20flex%20h-3.5%20w-3.5%20items-center%20justify-center%22%7D",
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: d.jsx(Ww, {
          "data-lov-id": "src/components/ui/dropdown-menu.tsx:131:6",
          "data-lov-name": "DropdownMenuPrimitive.ItemIndicator",
          "data-component-path": "src/components/ui/dropdown-menu.tsx",
          "data-component-line": "131",
          "data-component-file": "dropdown-menu.tsx",
          "data-component-name": "DropdownMenuPrimitive.ItemIndicator",
          "data-component-content": "%7B%7D",
          children: d.jsx(Cx, {
            "data-lov-id": "src/components/ui/dropdown-menu.tsx:132:8",
            "data-lov-name": "Circle",
            "data-component-path": "src/components/ui/dropdown-menu.tsx",
            "data-component-line": "132",
            "data-component-file": "dropdown-menu.tsx",
            "data-component-name": "Circle",
            "data-component-content":
              "%7B%22className%22%3A%22h-2%20w-2%20fill-current%22%7D",
            className: "h-2 w-2 fill-current",
          }),
        }),
      }),
      t,
    ],
  }),
);
DT.displayName = Vw.displayName;
const ET = f.forwardRef(({ className: e, inset: t, ...n }, o) =>
  d.jsx(Fw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:146:2",
    "data-lov-name": "DropdownMenuPrimitive.Label",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "146",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.Label",
    "data-component-content": "%7B%7D",
    ref: o,
    className: Y("px-2 py-1.5 text-sm font-semibold", t && "pl-8", e),
    ...n,
  }),
);
ET.displayName = Fw.displayName;
const Jw = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(Gw, {
    "data-lov-id": "src/components/ui/dropdown-menu.tsx:162:2",
    "data-lov-name": "DropdownMenuPrimitive.Separator",
    "data-component-path": "src/components/ui/dropdown-menu.tsx",
    "data-component-line": "162",
    "data-component-file": "dropdown-menu.tsx",
    "data-component-name": "DropdownMenuPrimitive.Separator",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("-mx-1 my-1 h-px bg-muted", e),
    ...t,
  }),
);
Jw.displayName = Gw.displayName;
function NT() {
  const { user: e, signOut: t } = ew();
  return e
    ? d.jsxs(CT, {
        "data-lov-id": "src/components/ui/UserMenu.tsx:25:4",
        "data-lov-name": "DropdownMenu",
