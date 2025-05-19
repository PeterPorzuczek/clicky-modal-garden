      "data-component-path": "src/components/ui/dialog.tsx",
      "data-component-line": "20",
      "data-component-file": "dialog.tsx",
      "data-component-name": "DialogPrimitive.Overlay",
      "data-component-content": "%7B%7D",
      ref: n,
      className: Y(
        "fixed inset-0 z-50 bg-[#131439] bg-opacity-87 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        e,
      ),
      ...t,
    }),
  );
l0.displayName = n0.displayName;
const c0 = f.forwardRef(({ className: e, children: t, ...n }, o) =>
  d.jsxs(wD, {
    "data-lov-id": "src/components/ui/dialog.tsx:35:2",
    "data-lov-name": "DialogPortal",
    "data-component-path": "src/components/ui/dialog.tsx",
    "data-component-line": "35",
    "data-component-file": "dialog.tsx",
    "data-component-name": "DialogPortal",
    "data-component-content": "%7B%7D",
    children: [
      d.jsx(l0, {
        "data-lov-id": "src/components/ui/dialog.tsx:36:4",
        "data-lov-name": "DialogOverlay",
        "data-component-path": "src/components/ui/dialog.tsx",
        "data-component-line": "36",
        "data-component-file": "dialog.tsx",
        "data-component-name": "DialogOverlay",
        "data-component-content": "%7B%7D",
      }),
      d.jsxs(o0, {
        "data-lov-id": "src/components/ui/dialog.tsx:37:4",
        "data-lov-name": "DialogPrimitive.Content",
        "data-component-path": "src/components/ui/dialog.tsx",
        "data-component-line": "37",
        "data-component-file": "dialog.tsx",
        "data-component-name": "DialogPrimitive.Content",
        "data-component-content": "%7B%7D",
        ref: o,
        className: Y(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg max-h-[90vh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto",
          e,
        ),
        ...n,
        children: [
          t,
          d.jsxs(s0, {
            "data-lov-id": "src/components/ui/dialog.tsx:46:6",
            "data-lov-name": "DialogPrimitive.Close",
            "data-component-path": "src/components/ui/dialog.tsx",
            "data-component-line": "46",
            "data-component-file": "dialog.tsx",
            "data-component-name": "DialogPrimitive.Close",
            "data-component-content":
              "%7B%22className%22%3A%22absolute%20right-4%20top-4%20rounded-sm%20opacity-70%20ring-offset-background%20transition-opacity%20hover%3Aopacity-100%20focus%3Aoutline-none%20focus%3Aring-2%20focus%3Aring-ring%20focus%3Aring-offset-2%20disabled%3Apointer-events-none%20data-%5Bstate%3Dopen%5D%3Abg-accent%20data-%5Bstate%3Dopen%5D%3Atext-muted-foreground%22%7D",
            className:
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              d.jsx(os, {
                "data-lov-id": "src/components/ui/dialog.tsx:47:8",
                "data-lov-name": "X",
                "data-component-path": "src/components/ui/dialog.tsx",
                "data-component-line": "47",
                "data-component-file": "dialog.tsx",
                "data-component-name": "X",
                "data-component-content":
                  "%7B%22className%22%3A%22h-4%20w-4%22%7D",
                className: "h-4 w-4",
              }),
              d.jsx("span", {
                "data-lov-id": "src/components/ui/dialog.tsx:48:8",
                "data-lov-name": "span",
                "data-component-path": "src/components/ui/dialog.tsx",
                "data-component-line": "48",
                "data-component-file": "dialog.tsx",
                "data-component-name": "span",
                "data-component-content":
                  "%7B%22text%22%3A%22Close%22%2C%22className%22%3A%22sr-only%22%7D",
                className: "sr-only",
                children: "Close",
              }),
            ],
          }),
        ],
      }),
    ],
  }),
);
c0.displayName = o0.displayName;
const d0 = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(r0, {
    "data-lov-id": "src/components/ui/dialog.tsx:87:2",
    "data-lov-name": "DialogPrimitive.Title",
    "data-component-path": "src/components/ui/dialog.tsx",
    "data-component-line": "87",
    "data-component-file": "dialog.tsx",
    "data-component-name": "DialogPrimitive.Title",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-lg font-semibold leading-none tracking-tight", e),
    ...t,
  }),
);
d0.displayName = r0.displayName;
const u0 = f.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(a0, {
    "data-lov-id": "src/components/ui/dialog.tsx:102:2",
    "data-lov-name": "DialogPrimitive.Description",
    "data-component-path": "src/components/ui/dialog.tsx",
    "data-component-line": "102",
    "data-component-file": "dialog.tsx",
    "data-component-name": "DialogPrimitive.Description",
    "data-component-content": "%7B%7D",
    ref: n,
    className: Y("text-sm text-muted-foreground", e),
    ...t,
  }),
);
u0.displayName = a0.displayName;
const uh = {
    customerNumber: "",
    companyName: "",
    ordererName: "",
    billingCompanyName: "",
    billingStreet: "",
    billingZipCode: "",
    billingCity: "",
    pickupCompanyName: "",
    pickupStreet: "",
    pickupZipCode: "",
    pickupCity: "",
    deliveryCompanyName: "",
    deliveryStreet: "",
    deliveryZipCode: "",
    deliveryCity: "",
    email: "",
    phone: "",
    usePickupAddressForDelivery: !1,
  },
  ir = 100,
  Jd = {
    undertröja: {
      damages: [
        { value: "tear", label: "Reva" },
        { value: "replace-elastic", label: "Byte resår" },
        { value: "replace-button", label: "Byte knapp" },
      ],
      otherIssues: [
        { id: "lint", label: "Noppor" },
        { id: "extremeStainRemoval", label: "Fläckborttagning extrem" },
        { id: "refreshOrWash", label: "Uppfräschning eller Tvätt" },
      ],
    },
    tröja: {
      damages: [
        { value: "tear", label: "Reva" },
        { value: "replace-zipper", label: "Byte dragkedja" },
        { value: "replace-elastic", label: "Byte resår" },
        { value: "replace-button", label: "Byte knapp" },
        { value: "replace-velcro", label: "Byte kardborrband" },
      ],
      otherIssues: [
        { id: "lint", label: "Noppor" },
        { id: "extremeStainRemoval", label: "Fläckborttagning extrem" },
        { id: "refreshOrWash", label: "Uppfräschning eller Tvätt" },
        { id: "washingImpregnation", label: "Tvätt + Impregnering" },
      ],
    },
    ytterplagg: {
      damages: [
        { value: "tear", label: "Reva" },
        { value: "replace-zipper", label: "Byte dragkedja" },
        { value: "replace-elastic", label: "Byte resår" },
        { value: "replace-button", label: "Byte knapp" },
        { value: "replace-velcro", label: "Byte kardborrband" },
      ],
      otherIssues: [
        { id: "lint", label: "Noppor" },
        { id: "extremeStainRemoval", label: "Fläckborttagning extrem" },
        { id: "washing", label: "Tvätt" },
        { id: "washingImpregnation", label: "Tvätt + Impregnering" },
      ],
    },
    nederdel: {
      damages: [
        { value: "tear", label: "Reva" },
        { value: "replace-fly", label: "Byte gylf" },
        { value: "replace-zipper", label: "Byte dragkedja" },
        { value: "replace-elastic", label: "Byte resår" },
        { value: "replace-button", label: "Byte knapp" },
        { value: "replace-velcro", label: "Byte kardborrband" },
      ],
      otherIssues: [
        { id: "lint", label: "Noppor" },
        { id: "extremeStainRemoval", label: "Fläckborttagning extrem" },
        { id: "refreshOrWash", label: "Uppfräschning eller Tvätt" },
        { id: "badSmell", label: "Dålig lukt" },
      ],
    },
    skor: {
      damages: [],
      otherIssues: [
        { id: "stainRemoval", label: "Fläckborttagning" },
        {
          id: "refreshOrWashExtreme",
          label: "Uppfräschning eller Tvätt extrem",
        },
      ],
    },
  },
  SD = [
    { value: "small", label: "Max 5 cm" },
    { value: "medium", label: "6-15 cm" },
    { value: "large", label: "16 cm+" },
  ],
  mh = {
    id: 1,
    type: "",
    damageCount: 0,
    damages: [],
    damageDetails: {},
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
    isEmployeeOwned: !1,
    employeeName: "",
    employeeDepartment: "",
  },
  bD = (e) => {
    let t = 0;
    for (const n of e)
      (t += n.damages.length * ir),
        Object.entries(n.otherIssues).forEach(([o, r]) => {
          r && (t += ir);
        });
    return t;
  },
  m0 = (e) => {
    let t = 0;
    for (const n of e)
      (t += n.damages.length),
        Object.entries(n.otherIssues).forEach(([o, r]) => {
          r && (t += 1);
        });
    return t >= 10 ? 25 : t >= 5 ? 20 : t >= 3 ? 15 : t >= 2 ? 10 : 0;
  },
  CD = (e) => {
    switch (e) {
      case "undertröja":
        return "Undertröja";
      case "tröja":
        return "Tröja";
      case "ytterplagg":
        return "Ytterplagg";
      case "nederdel":
        return "Nederdel";
      case "skor":
        return "Skor";
      default:
        return e;
    }
  },
  kD = (e) => {
    switch (e) {
      case "tear":
        return "Reva";
      case "replace-zipper":
        return "Byte dragkedja";
      case "replace-elastic":
        return "Byte resår";
      case "replace-button":
        return "Byte knapp";
      case "replace-velcro":
        return "Byte kardborrband";
      case "replace-fly":
        return "Byte gylf";
      default:
        return e;
    }
  },
  p0 = (e) => {
    for (const t of e)
      if (
        t.type ||
        t.damages.length > 0 ||
        Object.values(t.otherIssues).some((n) => n)
      )
        return !0;
    return !1;
  },
  PD = (e) => {
    var n, o, r, a;
    const t = [];
    for (const s of e) {
      if (!s.type) {
        t.push({
          field: `product-${s.id}-type`,
          message: `Produkttyp måste anges för Produkt #${s.id}`,
        });
        continue;
      }
      const i = s.type !== "skor";
      if (s.damages.length > 0)
        for (let u = 0; u < s.damages.length; u++) {
          const m = s.damages[u];
          if (
            (m ||
              t.push({
                field: `product-${s.id}-damage-${u + 1}`,
                message: `Skada ${u + 1} måste väljas för Produkt #${s.id}`,
              }),
            m)
          ) {
            const p = u;
            ((n = s.damageDetails[`damage-${p}`]) == null
              ? void 0
              : n.position) !== void 0 ||
              t.push({
                field: `product-${s.id}-damage-${p}-position`,
                message: "Skada måste markeras på plagget",
              }),
              m === "tear" &&
                (((o = s.damageDetails[`damage-${p}`]) == null
                  ? void 0
                  : o.tearSize) !== void 0 ||
                  t.push({
                    field: `product-${s.id}-damage-${p + 1}-tear-size`,
                    message: `Storlek på reva måste anges för Produkt #${s.id}`,
                  }));
          }
        }
      else
        i &&
          (Object.values(s.otherIssues).some((m) => m) ||
            t.push({
              field: `product-${s.id}-other-issues`,
              message: `Minst en defekt måste väljas för Produkt #${s.id} när inga skador är valda`,
            }));
      if (
        (i ||
          Object.values(s.otherIssues).some((m) => m) ||
          t.push({
            field: `product-${s.id}-other-issues`,
            message: `Minst en defekt måste väljas för Produkt #${s.id}`,
          }),
        Object.values(s.otherIssues).some((u) => u))
      ) {
        let u = !1;
        for (const [m, p] of Object.entries(s.otherIssues))
          p &&
            (((a = (r = s.defectDetails) == null ? void 0 : r[m]) == null
              ? void 0
              : a.position) !== void 0 ||
              ((u = !0),
              t.push({
                field: `product-${s.id}-defect-${m}-position`,
                message: `${m} måste markeras på plagget`,
              })));
        u &&
          t.push({
            field: `product-${s.id}-defect-markers`,
            message: "Alla defekter måste markeras på plagget",
          });
      }
      s.isEmployeeOwned &&
        (s.employeeName ||
          t.push({
            field: `product-${s.id}-employeeName`,
            message: `Namn på anställd måste anges för Produkt #${s.id}`,
          }),
        s.employeeDepartment ||
          t.push({
            field: `product-${s.id}-employeeDepartment`,
            message: `Avdelning måste anges för Produkt #${s.id}`,
          }));
    }
    return { isValid: t.length === 0, errors: t };
  },
  _D = (e, t, n) => {
    const o = [];
    return (
      e.companyName ||
        o.push({ field: "companyName", message: "Företagsnamn måste anges" }),
      e.ordererName ||
        o.push({
          field: "ordererName",
          message: "Namn på beställare måste anges",
        }),
      e.phone ||
        o.push({ field: "phone", message: "Telefonnummer måste anges" }),
      e.email || o.push({ field: "email", message: "E-post måste anges" }),
      e.billingCompanyName ||
        o.push({
          field: "billingCompanyName",
          message: "Fakturerings företagsnamn måste anges",
        }),
      e.billingStreet ||
        o.push({
          field: "billingStreet",
          message: "Fakturerings gatuadress måste anges",
        }),
      e.billingZipCode ||
        o.push({
          field: "billingZipCode",
          message: "Fakturerings postnummer måste anges",
        }),
      e.billingCity ||
        o.push({
          field: "billingCity",
          message: "Fakturerings ort måste anges",
        }),
      n ||
        (e.pickupCompanyName ||
          o.push({
            field: "pickupCompanyName",
            message: "Upphämtnings företagsnamn måste anges",
          }),
        e.pickupStreet ||
          o.push({
            field: "pickupStreet",
            message: "Upphämtnings gatuadress måste anges",
          }),
        e.pickupZipCode ||
          o.push({
            field: "pickupZipCode",
            message: "Upphämtnings postnummer måste anges",
          }),
        e.pickupCity ||
          o.push({
            field: "pickupCity",
            message: "Upphämtnings ort måste anges",
          })),
      e.usePickupAddressForDelivery ||
        (e.deliveryCompanyName ||
          o.push({
            field: "deliveryCompanyName",
            message: "Leverans företagsnamn måste anges",
          }),
        e.deliveryStreet ||
          o.push({
            field: "deliveryStreet",
            message: "Leverans gatuadress måste anges",
          }),
        e.deliveryZipCode ||
          o.push({
            field: "deliveryZipCode",
            message: "Leverans postnummer måste anges",
          }),
        e.deliveryCity ||
          o.push({
            field: "deliveryCity",
            message: "Leverans ort måste anges",
          })),
      t ||
        o.push({
          field: "termsAccepted",
          message: "Du måste acceptera villkoren",
        }),
      { isValid: o.length === 0, errors: o }
    );
  },
  AD = Ol(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-[#262E85] text-white hover:bg-[#1e2566]",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-12 px-6 py-2",
          sm: "h-9 rounded-full px-3",
          lg: "h-12 rounded-full px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  $t = f.forwardRef(
    ({ className: e, variant: t, size: n, asChild: o = !1, ...r }, a) => {
      const s = o ? Xn : "button";
      return d.jsx(s, {
        "data-lov-id": "src/components/ui/button.tsx:47:6",
        "data-lov-name": "Comp",
