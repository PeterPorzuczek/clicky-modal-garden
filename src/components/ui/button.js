        "data-component-path": "src/components/ui/button.tsx",
        "data-component-line": "47",
        "data-component-file": "button.tsx",
        "data-component-name": "Comp",
        "data-component-content": "%7B%7D",
        className: Y(AD({ variant: t, size: n, className: e })),
        ref: a,
        ...r,
      });
    },
  );
$t.displayName = "Button";
const f0 = ({ products: e }) => {
    const t = (l, c) => {
        if (!c) return l;
        const u = Jd[c];
        if (!u) return l;
        const m = u.otherIssues.find((p) => p.id === l);
        return m ? m.label : l;
      },
      n = (l) => {
        if (!l) return "";
        const c = SD.find((u) => u.value === l);
        return c ? ` (${c.label})` : "";
      },
      o = (l) =>
        l
          ? ` (markerad på ${{ left: "vänster", front: "fram", back: "bak", right: "höger" }[l.view] || l.view}-sidan)`
          : "",
      r = bD(e),
      a = m0(e),
      s = r * (a / 100),
      i = r - s;
    return d.jsxs("div", {
      "data-lov-id": "src/components/order/PriceSummary.tsx:57:9",
      "data-lov-name": "div",
