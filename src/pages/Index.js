      "data-component-path": "src/pages/Index.tsx",
      "data-component-line": "28",
      "data-component-file": "Index.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22min-h-screen%20bg-white%20flex%20flex-col%20items-center%20justify-center%20p-4%20md%3Ap-8%22%7D",
      className:
        "min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8",
      children: [
        d.jsx("div", {
          "data-lov-id": "src/pages/Index.tsx:29:6",
          "data-lov-name": "div",
          "data-component-path": "src/pages/Index.tsx",
          "data-component-line": "29",
          "data-component-file": "Index.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22absolute%20top-4%20right-4%22%7D",
          className: "absolute top-4 right-4",
          children: d.jsx(NT, {
            "data-lov-id": "src/pages/Index.tsx:30:8",
            "data-lov-name": "UserMenu",
            "data-component-path": "src/pages/Index.tsx",
            "data-component-line": "30",
            "data-component-file": "Index.tsx",
            "data-component-name": "UserMenu",
            "data-component-content": "%7B%7D",
          }),
        }),
        d.jsxs("div", {
          "data-lov-id": "src/pages/Index.tsx:33:6",
          "data-lov-name": "div",
          "data-component-path": "src/pages/Index.tsx",
          "data-component-line": "33",
          "data-component-file": "Index.tsx",
          "data-component-name": "div",
          "data-component-content":
            "%7B%22className%22%3A%22w-full%20max-w-3xl%20space-y-6%22%7D",
          className: "w-full max-w-3xl space-y-6",
          children: [
            d.jsx(qE, {
              "data-lov-id": "src/pages/Index.tsx:34:8",
              "data-lov-name": "Banner",
              "data-component-path": "src/pages/Index.tsx",
              "data-component-line": "34",
              "data-component-file": "Index.tsx",
              "data-component-name": "Banner",
              "data-component-content": "%7B%7D",
              isOpen: o,
              onOpenChange: s,
              prefilledData: e,
            }),
            d.jsxs("div", {
              "data-lov-id": "src/pages/Index.tsx:36:8",
              "data-lov-name": "div",
              "data-component-path": "src/pages/Index.tsx",
              "data-component-line": "36",
              "data-component-file": "Index.tsx",
              "data-component-name": "div",
              "data-component-content":
                "%7B%22className%22%3A%22bg-%5Bhsl(var(--navy))%5D%20text-white%20p-8%20rounded-lg%20shadow-lg%20cursor-pointer%20hover%3Ashadow-xl%20transition-shadow%20w-full%20max-w-3xl%20mx-auto%20flex%20flex-col%20items-center%20justify-center%22%7D",
              className:
                "bg-[hsl(var(--navy))] text-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow w-full max-w-3xl mx-auto flex flex-col items-center justify-center",
              onClick: a,
              children: [
                d.jsx("h2", {
                  "data-lov-id": "src/pages/Index.tsx:37:10",
                  "data-lov-name": "h2",
                  "data-component-path": "src/pages/Index.tsx",
                  "data-component-line": "37",
                  "data-component-file": "Index.tsx",
                  "data-component-name": "h2",
                  "data-component-content":
                    "%7B%22text%22%3A%22Best%C3%A4ll%20lagning%20%26%20%C3%A5terst%C3%A4llning%22%2C%22className%22%3A%22text-2xl%20md%3Atext-3xl%20font-bold%20mb-3%22%7D",
                  className: "text-2xl md:text-3xl font-bold mb-3",
                  children: "Beställ lagning & återställning",
                }),
                d.jsx("p", {
                  "data-lov-id": "src/pages/Index.tsx:38:10",
                  "data-lov-name": "p",
                  "data-component-path": "src/pages/Index.tsx",
                  "data-component-line": "38",
                  "data-component-file": "Index.tsx",
                  "data-component-name": "p",
                  "data-component-content":
                    "%7B%22text%22%3A%22Som%20inloggad%20kund%22%2C%22className%22%3A%22text-gray-200%20text-center%22%7D",
                  className: "text-gray-200 text-center",
                  children: "Som inloggad kund",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  IT = () => {
    const e = Nm();
    return (
      f.useEffect(() => {
        console.error(
          "404 Error: User attempted to access non-existent route:",
          e.pathname,
        );
      }, [e.pathname]),
      d.jsx("div", {
        "data-lov-id": "src/pages/NotFound.tsx:15:4",
        "data-lov-name": "div",
