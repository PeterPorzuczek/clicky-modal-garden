      "data-component-path": "src/pages/AuthPage.tsx",
      "data-component-line": "40",
      "data-component-file": "AuthPage.tsx",
      "data-component-name": "div",
      "data-component-content":
        "%7B%22className%22%3A%22flex%20min-h-screen%20items-center%20justify-center%20p-4%20md%3Ap-8%20bg-gray-50%22%7D",
      className:
        "flex min-h-screen items-center justify-center p-4 md:p-8 bg-gray-50",
      children: d.jsxs(uS, {
        "data-lov-id": "src/pages/AuthPage.tsx:41:6",
        "data-lov-name": "Card",
        "data-component-path": "src/pages/AuthPage.tsx",
        "data-component-line": "41",
        "data-component-file": "AuthPage.tsx",
        "data-component-name": "Card",
        "data-component-content":
          "%7B%22className%22%3A%22w-full%20max-w-md%22%7D",
        className: "w-full max-w-md",
        children: [
          d.jsxs(mS, {
            "data-lov-id": "src/pages/AuthPage.tsx:42:8",
            "data-lov-name": "CardHeader",
            "data-component-path": "src/pages/AuthPage.tsx",
            "data-component-line": "42",
            "data-component-file": "AuthPage.tsx",
            "data-component-name": "CardHeader",
            "data-component-content": "%7B%22className%22%3A%22space-y-1%22%7D",
            className: "space-y-1",
            children: [
              d.jsx(pS, {
                "data-lov-id": "src/pages/AuthPage.tsx:43:10",
                "data-lov-name": "CardTitle",
                "data-component-path": "src/pages/AuthPage.tsx",
                "data-component-line": "43",
                "data-component-file": "AuthPage.tsx",
                "data-component-name": "CardTitle",
                "data-component-content":
                  "%7B%22text%22%3A%22Welcome%22%2C%22className%22%3A%22text-2xl%20font-bold%20text-center%22%7D",
                className: "text-2xl font-bold text-center",
                children: "Welcome",
              }),
              d.jsx(fS, {
                "data-lov-id": "src/pages/AuthPage.tsx:44:10",
                "data-lov-name": "CardDescription",
                "data-component-path": "src/pages/AuthPage.tsx",
                "data-component-line": "44",
                "data-component-file": "AuthPage.tsx",
                "data-component-name": "CardDescription",
                "data-component-content":
                  "%7B%22className%22%3A%22text-center%22%7D",
                className: "text-center",
                children:
                  r === "login"
                    ? "Sign in to your account to continue"
                    : "Create an account to get started",
              }),
            ],
          }),
          d.jsxs(MT, {
            "data-lov-id": "src/pages/AuthPage.tsx:50:8",
            "data-lov-name": "Tabs",
            "data-component-path": "src/pages/AuthPage.tsx",
            "data-component-line": "50",
            "data-component-file": "AuthPage.tsx",
            "data-component-name": "Tabs",
            "data-component-content": "%7B%7D",
            defaultValue: "login",
            value: r,
            onValueChange: (w) => a(w),
            children: [
              d.jsxs(dS, {
                "data-lov-id": "src/pages/AuthPage.tsx:55:10",
                "data-lov-name": "TabsList",
                "data-component-path": "src/pages/AuthPage.tsx",
                "data-component-line": "55",
                "data-component-file": "AuthPage.tsx",
                "data-component-name": "TabsList",
                "data-component-content":
                  "%7B%22className%22%3A%22grid%20w-full%20grid-cols-2%22%7D",
                className: "grid w-full grid-cols-2",
                children: [
                  d.jsx(pu, {
                    "data-lov-id": "src/pages/AuthPage.tsx:56:12",
                    "data-lov-name": "TabsTrigger",
                    "data-component-path": "src/pages/AuthPage.tsx",
                    "data-component-line": "56",
                    "data-component-file": "AuthPage.tsx",
                    "data-component-name": "TabsTrigger",
                    "data-component-content": "%7B%22text%22%3A%22Login%22%7D",
                    value: "login",
                    children: "Login",
                  }),
                  d.jsx(pu, {
                    "data-lov-id": "src/pages/AuthPage.tsx:57:12",
                    "data-lov-name": "TabsTrigger",
                    "data-component-path": "src/pages/AuthPage.tsx",
                    "data-component-line": "57",
                    "data-component-file": "AuthPage.tsx",
                    "data-component-name": "TabsTrigger",
                    "data-component-content":
                      "%7B%22text%22%3A%22Register%22%7D",
                    value: "register",
                    children: "Register",
                  }),
                ],
              }),
              d.jsx(fu, {
                "data-lov-id": "src/pages/AuthPage.tsx:60:10",
                "data-lov-name": "TabsContent",
                "data-component-path": "src/pages/AuthPage.tsx",
                "data-component-line": "60",
                "data-component-file": "AuthPage.tsx",
                "data-component-name": "TabsContent",
                "data-component-content": "%7B%7D",
                value: "login",
                children: d.jsxs("form", {
                  "data-lov-id": "src/pages/AuthPage.tsx:61:12",
                  "data-lov-name": "form",
                  "data-component-path": "src/pages/AuthPage.tsx",
                  "data-component-line": "61",
                  "data-component-file": "AuthPage.tsx",
                  "data-component-name": "form",
                  "data-component-content": "%7B%7D",
                  onSubmit: g,
                  children: [
                    d.jsxs(hu, {
                      "data-lov-id": "src/pages/AuthPage.tsx:62:14",
                      "data-lov-name": "CardContent",
                      "data-component-path": "src/pages/AuthPage.tsx",
                      "data-component-line": "62",
                      "data-component-file": "AuthPage.tsx",
                      "data-component-name": "CardContent",
                      "data-component-content":
                        "%7B%22className%22%3A%22space-y-4%20pt-4%22%7D",
                      className: "space-y-4 pt-4",
                      children: [
                        d.jsxs("div", {
                          "data-lov-id": "src/pages/AuthPage.tsx:63:16",
                          "data-lov-name": "div",
                          "data-component-path": "src/pages/AuthPage.tsx",
                          "data-component-line": "63",
                          "data-component-file": "AuthPage.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22space-y-2%22%7D",
                          className: "space-y-2",
                          children: [
                            d.jsx(ct, {
                              "data-lov-id": "src/pages/AuthPage.tsx:64:18",
                              "data-lov-name": "Label",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "64",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "Label",
                              "data-component-content":
                                "%7B%22text%22%3A%22Email%22%7D",
                              htmlFor: "email",
                              children: "Email",
                            }),
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:65:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "65",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22relative%22%7D",
                              className: "relative",
                              children: [
                                d.jsx(eh, {
                                  "data-lov-id": "src/pages/AuthPage.tsx:66:20",
                                  "data-lov-name": "Mail",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "66",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Mail",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22absolute%20left-3%20top-2.5%20h-5%20w-5%20text-gray-400%22%7D",
                                  className:
                                    "absolute left-3 top-2.5 h-5 w-5 text-gray-400",
                                }),
                                d.jsx(pe, {
                                  "data-lov-id": "src/pages/AuthPage.tsx:67:20",
                                  "data-lov-name": "Input",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "67",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Input",
                                  "data-component-content":
                                    "%7B%22placeholder%22%3A%22m.example%40email.com%22%2C%22className%22%3A%22pl-10%22%7D",
                                  id: "email",
                                  type: "email",
                                  placeholder: "m.example@email.com",
                                  className: "pl-10",
                                  value: s,
                                  onChange: (w) => i(w.target.value),
                                  required: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        d.jsxs("div", {
                          "data-lov-id": "src/pages/AuthPage.tsx:78:16",
                          "data-lov-name": "div",
                          "data-component-path": "src/pages/AuthPage.tsx",
                          "data-component-line": "78",
                          "data-component-file": "AuthPage.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22space-y-2%22%7D",
                          className: "space-y-2",
                          children: [
                            d.jsx(ct, {
                              "data-lov-id": "src/pages/AuthPage.tsx:79:18",
                              "data-lov-name": "Label",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "79",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "Label",
                              "data-component-content":
                                "%7B%22text%22%3A%22Password%22%7D",
                              htmlFor: "password",
                              children: "Password",
                            }),
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:80:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "80",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22relative%22%7D",
                              className: "relative",
                              children: [
                                d.jsx(Zf, {
                                  "data-lov-id": "src/pages/AuthPage.tsx:81:20",
                                  "data-lov-name": "Lock",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "81",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Lock",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22absolute%20left-3%20top-2.5%20h-5%20w-5%20text-gray-400%22%7D",
                                  className:
                                    "absolute left-3 top-2.5 h-5 w-5 text-gray-400",
                                }),
                                d.jsx(pe, {
                                  "data-lov-id": "src/pages/AuthPage.tsx:82:20",
                                  "data-lov-name": "Input",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "82",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Input",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22pl-10%22%7D",
                                  id: "password",
                                  type: "password",
                                  className: "pl-10",
                                  value: l,
                                  onChange: (w) => c(w.target.value),
                                  required: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    d.jsx(vu, {
                      "data-lov-id": "src/pages/AuthPage.tsx:93:14",
                      "data-lov-name": "CardFooter",
                      "data-component-path": "src/pages/AuthPage.tsx",
                      "data-component-line": "93",
                      "data-component-file": "AuthPage.tsx",
                      "data-component-name": "CardFooter",
                      "data-component-content": "%7B%7D",
                      children: d.jsx($t, {
                        "data-lov-id": "src/pages/AuthPage.tsx:94:16",
                        "data-lov-name": "Button",
                        "data-component-path": "src/pages/AuthPage.tsx",
                        "data-component-line": "94",
                        "data-component-file": "AuthPage.tsx",
                        "data-component-name": "Button",
                        "data-component-content":
                          "%7B%22text%22%3A%22Sign%20In%22%2C%22className%22%3A%22w-full%22%7D",
                        type: "submit",
                        className: "w-full",
                        children: "Sign In",
                      }),
                    }),
                  ],
                }),
              }),
              d.jsx(fu, {
                "data-lov-id": "src/pages/AuthPage.tsx:101:10",
                "data-lov-name": "TabsContent",
                "data-component-path": "src/pages/AuthPage.tsx",
                "data-component-line": "101",
                "data-component-file": "AuthPage.tsx",
                "data-component-name": "TabsContent",
                "data-component-content": "%7B%7D",
                value: "register",
                children: d.jsxs("form", {
                  "data-lov-id": "src/pages/AuthPage.tsx:102:12",
                  "data-lov-name": "form",
                  "data-component-path": "src/pages/AuthPage.tsx",
                  "data-component-line": "102",
                  "data-component-file": "AuthPage.tsx",
                  "data-component-name": "form",
                  "data-component-content": "%7B%7D",
                  onSubmit: v,
                  children: [
                    d.jsxs(hu, {
                      "data-lov-id": "src/pages/AuthPage.tsx:103:14",
                      "data-lov-name": "CardContent",
                      "data-component-path": "src/pages/AuthPage.tsx",
                      "data-component-line": "103",
                      "data-component-file": "AuthPage.tsx",
                      "data-component-name": "CardContent",
                      "data-component-content":
                        "%7B%22className%22%3A%22space-y-4%20pt-4%22%7D",
                      className: "space-y-4 pt-4",
                      children: [
                        d.jsxs("div", {
                          "data-lov-id": "src/pages/AuthPage.tsx:104:16",
                          "data-lov-name": "div",
                          "data-component-path": "src/pages/AuthPage.tsx",
                          "data-component-line": "104",
                          "data-component-file": "AuthPage.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22grid%20grid-cols-2%20gap-4%22%7D",
                          className: "grid grid-cols-2 gap-4",
                          children: [
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:105:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "105",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22space-y-2%22%7D",
                              className: "space-y-2",
                              children: [
                                d.jsx(ct, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:106:20",
                                  "data-lov-name": "Label",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "106",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Label",
                                  "data-component-content":
                                    "%7B%22text%22%3A%22First%20Name%22%7D",
                                  htmlFor: "firstName",
                                  children: "First Name",
                                }),
                                d.jsxs("div", {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:107:20",
                                  "data-lov-name": "div",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "107",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "div",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22relative%22%7D",
                                  className: "relative",
                                  children: [
                                    d.jsx(_x, {
                                      "data-lov-id":
                                        "src/pages/AuthPage.tsx:108:22",
                                      "data-lov-name": "User",
                                      "data-component-path":
                                        "src/pages/AuthPage.tsx",
                                      "data-component-line": "108",
                                      "data-component-file": "AuthPage.tsx",
                                      "data-component-name": "User",
                                      "data-component-content":
                                        "%7B%22className%22%3A%22absolute%20left-3%20top-2.5%20h-5%20w-5%20text-gray-400%22%7D",
                                      className:
                                        "absolute left-3 top-2.5 h-5 w-5 text-gray-400",
                                    }),
                                    d.jsx(pe, {
                                      "data-lov-id":
                                        "src/pages/AuthPage.tsx:109:22",
                                      "data-lov-name": "Input",
                                      "data-component-path":
                                        "src/pages/AuthPage.tsx",
                                      "data-component-line": "109",
                                      "data-component-file": "AuthPage.tsx",
                                      "data-component-name": "Input",
                                      "data-component-content":
                                        "%7B%22placeholder%22%3A%22John%22%2C%22className%22%3A%22pl-10%22%7D",
                                      id: "firstName",
                                      placeholder: "John",
                                      className: "pl-10",
                                      value: u,
                                      onChange: (w) => m(w.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:118:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "118",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22space-y-2%22%7D",
                              className: "space-y-2",
                              children: [
                                d.jsx(ct, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:119:20",
                                  "data-lov-name": "Label",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "119",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Label",
                                  "data-component-content":
                                    "%7B%22text%22%3A%22Last%20Name%22%7D",
                                  htmlFor: "lastName",
                                  children: "Last Name",
                                }),
                                d.jsx(pe, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:120:20",
                                  "data-lov-name": "Input",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "120",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Input",
                                  "data-component-content":
                                    "%7B%22placeholder%22%3A%22Doe%22%7D",
                                  id: "lastName",
                                  placeholder: "Doe",
                                  value: p,
                                  onChange: (w) => h(w.target.value),
                                }),
                              ],
                            }),
                          ],
                        }),
                        d.jsxs("div", {
                          "data-lov-id": "src/pages/AuthPage.tsx:128:16",
                          "data-lov-name": "div",
                          "data-component-path": "src/pages/AuthPage.tsx",
                          "data-component-line": "128",
                          "data-component-file": "AuthPage.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22space-y-2%22%7D",
                          className: "space-y-2",
                          children: [
                            d.jsx(ct, {
                              "data-lov-id": "src/pages/AuthPage.tsx:129:18",
                              "data-lov-name": "Label",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "129",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "Label",
                              "data-component-content":
                                "%7B%22text%22%3A%22Email%22%7D",
                              htmlFor: "registerEmail",
                              children: "Email",
                            }),
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:130:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "130",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22relative%22%7D",
                              className: "relative",
                              children: [
                                d.jsx(eh, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:131:20",
                                  "data-lov-name": "Mail",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "131",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Mail",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22absolute%20left-3%20top-2.5%20h-5%20w-5%20text-gray-400%22%7D",
                                  className:
                                    "absolute left-3 top-2.5 h-5 w-5 text-gray-400",
                                }),
                                d.jsx(pe, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:132:20",
                                  "data-lov-name": "Input",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "132",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Input",
                                  "data-component-content":
                                    "%7B%22placeholder%22%3A%22m.example%40email.com%22%2C%22className%22%3A%22pl-10%22%7D",
                                  id: "registerEmail",
                                  type: "email",
                                  placeholder: "m.example@email.com",
                                  className: "pl-10",
                                  value: s,
                                  onChange: (w) => i(w.target.value),
                                  required: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        d.jsxs("div", {
                          "data-lov-id": "src/pages/AuthPage.tsx:143:16",
                          "data-lov-name": "div",
                          "data-component-path": "src/pages/AuthPage.tsx",
                          "data-component-line": "143",
                          "data-component-file": "AuthPage.tsx",
                          "data-component-name": "div",
                          "data-component-content":
                            "%7B%22className%22%3A%22space-y-2%22%7D",
                          className: "space-y-2",
                          children: [
                            d.jsx(ct, {
                              "data-lov-id": "src/pages/AuthPage.tsx:144:18",
                              "data-lov-name": "Label",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "144",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "Label",
                              "data-component-content":
                                "%7B%22text%22%3A%22Password%22%7D",
                              htmlFor: "registerPassword",
                              children: "Password",
                            }),
                            d.jsxs("div", {
                              "data-lov-id": "src/pages/AuthPage.tsx:145:18",
                              "data-lov-name": "div",
                              "data-component-path": "src/pages/AuthPage.tsx",
                              "data-component-line": "145",
                              "data-component-file": "AuthPage.tsx",
                              "data-component-name": "div",
                              "data-component-content":
                                "%7B%22className%22%3A%22relative%22%7D",
                              className: "relative",
                              children: [
                                d.jsx(Zf, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:146:20",
                                  "data-lov-name": "Lock",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "146",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Lock",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22absolute%20left-3%20top-2.5%20h-5%20w-5%20text-gray-400%22%7D",
                                  className:
                                    "absolute left-3 top-2.5 h-5 w-5 text-gray-400",
                                }),
                                d.jsx(pe, {
                                  "data-lov-id":
                                    "src/pages/AuthPage.tsx:147:20",
                                  "data-lov-name": "Input",
                                  "data-component-path":
                                    "src/pages/AuthPage.tsx",
                                  "data-component-line": "147",
                                  "data-component-file": "AuthPage.tsx",
                                  "data-component-name": "Input",
                                  "data-component-content":
                                    "%7B%22className%22%3A%22pl-10%22%7D",
                                  id: "registerPassword",
                                  type: "password",
                                  className: "pl-10",
                                  value: l,
                                  onChange: (w) => c(w.target.value),
                                  required: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    d.jsx(vu, {
                      "data-lov-id": "src/pages/AuthPage.tsx:158:14",
                      "data-lov-name": "CardFooter",
                      "data-component-path": "src/pages/AuthPage.tsx",
                      "data-component-line": "158",
                      "data-component-file": "AuthPage.tsx",
                      "data-component-name": "CardFooter",
                      "data-component-content": "%7B%7D",
                      children: d.jsx($t, {
                        "data-lov-id": "src/pages/AuthPage.tsx:159:16",
                        "data-lov-name": "Button",
                        "data-component-path": "src/pages/AuthPage.tsx",
                        "data-component-line": "159",
                        "data-component-file": "AuthPage.tsx",
                        "data-component-name": "Button",
                        "data-component-content":
                          "%7B%22text%22%3A%22Create%20Account%22%2C%22className%22%3A%22w-full%22%7D",
                        type: "submit",
                        className: "w-full",
                        children: "Create Account",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  LT = new LP(),
  $T = () =>
    d.jsx(FP, {
      "data-lov-id": "src/App.tsx:15:2",
      "data-lov-name": "QueryClientProvider",
