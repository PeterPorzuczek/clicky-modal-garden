      "data-component-path": "src/components/order/DefectsSection.tsx",
      "data-component-line": "42",
      "data-component-file": "DefectsSection.tsx",
      "data-component-name": "div",
      "data-component-content": "%7B%7D",
      children: [
        d.jsxs("div", {
          "data-lov-id": "src/components/order/DefectsSection.tsx:43:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/DefectsSection.tsx",
          "data-component-line": "43",
          "data-component-file": "DefectsSection.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22flex%20items-center%20mb-2%22%7D",
          className: "flex items-center mb-2",
          children: [
            d.jsx("h4", {
              "data-lov-id": "src/components/order/DefectsSection.tsx:44:8",
              "data-lov-name": "h4",
              "data-component-path": "src/components/order/DefectsSection.tsx",
              "data-component-line": "44",
              "data-component-file": "DefectsSection.tsx",
              "data-component-name": "h4",
              "data-component-content":
                "%7B%22text%22%3A%22Andra%20fel%20och%20defekter%22%2C%22className%22%3A%22font-medium%22%7D",
              className: "font-medium",
              children: "Andra fel och defekter",
            }),
            l &&
              d.jsx("span", {
                "data-lov-id": "src/components/order/DefectsSection.tsx:45:23",
                "data-lov-name": "span",
                "data-component-path":
                  "src/components/order/DefectsSection.tsx",
                "data-component-line": "45",
                "data-component-file": "DefectsSection.tsx",
                "data-component-name": "span",
                "data-component-content":
                  "%7B%22text%22%3A%22*%22%2C%22className%22%3A%22text-red-500%20ml-1%22%7D",
                className: "text-red-500 ml-1",
                children: "*",
              }),
          ],
        }),
        d.jsx("div", {
          "data-lov-id": "src/components/order/DefectsSection.tsx:48:6",
          "data-lov-name": "div",
          "data-component-path": "src/components/order/DefectsSection.tsx",
          "data-component-line": "48",
          "data-component-file": "DefectsSection.tsx",
          "data-component-name": "div",
          "data-component-content": "%7B%7D",
          className: i ? "border border-red-500 rounded-md p-2" : "",
          children: d.jsx("div", {
            "data-lov-id": "src/components/order/DefectsSection.tsx:49:8",
            "data-lov-name": "div",
            "data-component-path": "src/components/order/DefectsSection.tsx",
            "data-component-line": "49",
            "data-component-file": "DefectsSection.tsx",
            "data-component-name": "div",
            "data-component-content":
              "%7B%22className%22%3A%22flex%20flex-col%20space-y-2%22%7D",
            className: "flex flex-col space-y-2",
            children: t.otherIssues.map((m) => {
              const p = e.otherIssues[m.id];
              (a == null ? void 0 : a.productId) === e.id && (a.defectId, m.id);
              const h =
                  (r == null ? void 0 : r.productId) === e.id &&
                  r.defectId === m.id,
                g = u(m.id),
                v = c[m.id];
              return d.jsxs(
                "div",
                {
                  "data-lov-id":
                    "src/components/order/DefectsSection.tsx:60:14",
                  "data-lov-name": "div",
                  "data-component-path":
                    "src/components/order/DefectsSection.tsx",
                  "data-component-line": "60",
                  "data-component-file": "DefectsSection.tsx",
                  "data-component-name": "div",
                  "data-component-content":
                    "%7B%22className%22%3A%22flex%20flex-col%22%7D",
                  className: "flex flex-col",
                  children: [
                    d.jsxs("div", {
                      "data-lov-id":
                        "src/components/order/DefectsSection.tsx:61:16",
                      "data-lov-name": "div",
                      "data-component-path":
                        "src/components/order/DefectsSection.tsx",
                      "data-component-line": "61",
                      "data-component-file": "DefectsSection.tsx",
                      "data-component-name": "div",
                      "data-component-content":
                        "%7B%22className%22%3A%22flex%20items-center%20space-x-2%20py-1%20pl-2%20pr-3%22%7D",
                      className: "flex items-center space-x-2 py-1 pl-2 pr-3",
                      children: [
                        d.jsx(gr, {
                          "data-lov-id":
                            "src/components/order/DefectsSection.tsx:62:18",
                          "data-lov-name": "Checkbox",
                          "data-component-path":
                            "src/components/order/DefectsSection.tsx",
                          "data-component-line": "62",
                          "data-component-file": "DefectsSection.tsx",
                          "data-component-name": "Checkbox",
                          "data-component-content": "%7B%7D",
                          id: `issue-${e.id}-${m.id}`,
                          checked: p,
                          onCheckedChange: () => n(e.id, m.id),
                        }),
                        d.jsx("div", {
                          "data-lov-id":
                            "src/components/order/DefectsSection.tsx:67:18",
                          "data-lov-name": "div",
                          "data-component-path":
                            "src/components/order/DefectsSection.tsx",
                          "data-component-line": "67",
                          "data-component-file": "DefectsSection.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22flex-1%22%7D",
                          className: "flex-1",
                          children: d.jsx(ct, {
                            "data-lov-id":
                              "src/components/order/DefectsSection.tsx:68:20",
                            "data-lov-name": "Label",
                            "data-component-path":
                              "src/components/order/DefectsSection.tsx",
                            "data-component-line": "68",
                            "data-component-file": "DefectsSection.tsx",
                            "data-component-name": "Label",
                            "data-component-content": "%7B%7D",
                            htmlFor: `issue-${e.id}-${m.id}`,
                            className: `${h ? "text-blue-600 font-medium" : ""}`,
                            children: m.label,
                          }),
                        }),
                        p &&
                          d.jsxs(ty, {
                            "data-lov-id":
                              "src/components/order/DefectsSection.tsx:77:20",
                            "data-lov-name": "Badge",
                            "data-component-path":
                              "src/components/order/DefectsSection.tsx",
                            "data-component-line": "77",
                            "data-component-file": "DefectsSection.tsx",
                            "data-component-name": "Badge",
                            "data-component-content": "%7B%7D",
                            variant: "outline",
                            className: `ml-2 flex items-center ${g ? "bg-[#F2FCE2] border-[#e1efd2]" : "bg-gray-100 border-gray-200"}`,
                            children: [
                              m.label,
                              g &&
                                d.jsx(gs, {
                                  "data-lov-id":
                                    "src/components/order/DefectsSection.tsx:82:44",
                                  "data-lov-name": "Check",
                                  "data-component-path":
                                    "src/components/order/DefectsSection.tsx",
                                  "data-component-line": "82",
                                  "data-component-file": "DefectsSection.tsx",
                                  "data-component-name": "Check",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22text-green-600%20ml-1%22%7D",
                                  size: 12,
                                  className: "text-green-600 ml-1",
                                }),
                            ],
                          }),
                      ],
                    }),
                    p &&
                      !g &&
                      v &&
                      d.jsx("div", {
                        "data-lov-id":
                          "src/components/order/DefectsSection.tsx:89:18",
                        "data-lov-name": "div",
                        "data-component-path":
                          "src/components/order/DefectsSection.tsx",
                        "data-component-line": "89",
                        "data-component-file": "DefectsSection.tsx",
                        "data-component-name": "div",
                        "data-component-content":
                          "%7B%22className%22%3A%22flex%20items-start%20gap-2%20ml-8%20mt-1%22%7D",
                        className: "flex items-start gap-2 ml-8 mt-1",
                        children: d.jsx("p", {
                          "data-lov-id":
                            "src/components/order/DefectsSection.tsx:90:20",
                          "data-lov-name": "p",
                          "data-component-path":
                            "src/components/order/DefectsSection.tsx",
                          "data-component-line": "90",
                          "data-component-file": "DefectsSection.tsx",
                          "data-component-name": "p",
                          "data-component-content":
                            "%7B%22className%22%3A%22text-sm%20text-red-500%22%7D",
                          className: "text-sm text-red-500",
                          children: v,
                        }),
                      }),
                  ],
                },
                m.id,
              );
            }),
          }),
        }),
        i &&
          d.jsx("p", {
            "data-lov-id": "src/components/order/DefectsSection.tsx:99:16",
            "data-lov-name": "p",
            "data-component-path": "src/components/order/DefectsSection.tsx",
            "data-component-line": "99",
            "data-component-file": "DefectsSection.tsx",
            "data-component-name": "p",
            "data-component-content":
              "%7B%22className%22%3A%22text-sm%20text-red-500%20mt-1%22%7D",
            className: "text-sm text-red-500 mt-1",
            children: i,
          }),
      ],
    });
  },
  pe = f.forwardRef(({ className: e, type: t, ...n }, o) =>
    d.jsx("input", {
      "data-lov-id": "src/components/ui/input.tsx:8:6",
      "data-lov-name": "input",
