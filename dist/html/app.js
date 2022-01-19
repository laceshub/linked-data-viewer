!(function (e) {
    function t(t) {
        for (var n, a, s = t[0], c = t[1], l = t[2], p = 0, h = []; p < s.length; p++)
            (a = s[p]), i[a] && h.push(i[a][0]), (i[a] = 0);
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
        for (u && u(t); h.length; ) h.shift()();
        return o.push.apply(o, l || []), r();
    }
    function r() {
        for (var e, t = 0; t < o.length; t++) {
            for (var r = o[t], n = !0, s = 1; s < r.length; s++) {
                var c = r[s];
                0 !== i[c] && (n = !1);
            }
            n && (o.splice(t--, 1), (e = a((a.s = r[0]))));
        }
        return e;
    }
    var n = {},
        i = { 1: 0 },
        o = [];
    function a(t) {
        if (n[t]) return n[t].exports;
        var r = (n[t] = { i: t, l: !1, exports: {} });
        return e[t].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
    }
    (a.m = e),
        (a.c = n),
        (a.d = function (e, t, r) {
            a.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
        }),
        (a.r = function (e) {
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (a.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return a.d(t, "a", t), t;
        }),
        (a.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (a.p = "");
    var s = (window.webpackJsonp = window.webpackJsonp || []),
        c = s.push.bind(s);
    (s.push = t), (s = s.slice());
    for (var l = 0; l < s.length; l++) t(s[l]);
    var u = c;
    o.push([192, 0]), r();
})({
    192: function (e, t, r) {
        "use strict";
        r.r(t);
        var n = r(4),
            i = (r(461), r(322), r(0)),
            o = r(60),
            a = [];
        function s(e, t) {
            var r = a.find(function (t) {
                return t.id === e;
            });
            r ? (r.implementation = t) : a.push({ id: e, implementation: t });
        }
        function c(e) {
            var t = a.find(function (t) {
                return t.id === e;
            });
            if (t) return t.implementation;
            throw new Error("Requested binding is not registered in DI container");
        }
        var l = r(181),
            u = r(262),
            p = (function () {
                return function () {};
            })(),
            h = (function () {
                function e() {}
                return (
                    Object.defineProperty(e.prototype, "config", {
                        get: function () {
                            if (!this._config) throw new Error("App config should be loaded first");
                            return this._config;
                        },
                        enumerable: !1,
                        configurable: !0
                    }),
                    (e.prototype.loadConfig = function (e) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var t, r;
                            return Object(n.d)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, e.getJson("config.json", { noCache: !0 })];
                                    case 1:
                                        return (
                                            (t = n.sent()),
                                            this.setDefaultValues(t),
                                            this.validate(t),
                                            (r = []),
                                            this.loadTextDataFromUrlRecursively(t, e, r),
                                            [4, Promise.all(r)]
                                        );
                                    case 2:
                                        return n.sent(), (this._config = t), [2, t];
                                }
                            });
                        });
                    }),
                    (e.prototype.loadTextDataFromUrlRecursively = function (e, t, r) {
                        for (
                            var i = this,
                                o = function (o, s) {
                                    if ("string" == typeof s) {
                                        var c = s;
                                        if (c.startsWith("url:")) {
                                            var l = c.substr(4);
                                            r.push(
                                                Object(n.b)(i, void 0, void 0, function () {
                                                    var r;
                                                    return Object(n.d)(this, function (n) {
                                                        switch (n.label) {
                                                            case 0:
                                                                return [4, t.getText(l)];
                                                            case 1:
                                                                return (
                                                                    (r = n.sent()), (e[o] = r), [2]
                                                                );
                                                        }
                                                    });
                                                })
                                            );
                                        }
                                    } else
                                        "object" == typeof s &&
                                            s &&
                                            a.loadTextDataFromUrlRecursively(s, t, r);
                                },
                                a = this,
                                s = 0,
                                c = Object.entries(e);
                            s < c.length;
                            s++
                        ) {
                            var l = c[s];
                            o(l[0], l[1]);
                        }
                    }),
                    (e.prototype.setDefaultValues = function (e) {
                        e.informationPane.tabs.forEach(function (e) {
                            e.hideIfEmpty = void 0 === e.hideIfEmpty || e.hideIfEmpty;
                        });
                    }),
                    (e.prototype.validate = function (e) {
                        var t = l.validateMultiple(e, u);
                        if (!t.valid) {
                            var r = t.errors.map(function (e) {
                                return (
                                    'Error message: "' +
                                    e.message +
                                    '". Data path: "' +
                                    e.dataPath +
                                    '".'
                                );
                            });
                            throw new Error(
                                "The configuration file for the application does not conform to the schema.\r\n" +
                                    r.join("\r\n")
                            );
                        }
                    }),
                    e
                );
            })(),
            d = r(128),
            m =
                ((function () {})(),
                (function () {
                    function e() {}
                    return (
                        (e.prototype.getText = function (e, t) {
                            return (
                                void 0 === t && (t = {}),
                                Object(n.b)(this, void 0, void 0, function () {
                                    var r;
                                    return Object(n.d)(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    d(e, {
                                                        credentials: "same-origin",
                                                        method: "get",
                                                        cache: t.noCache ? "no-store" : "default"
                                                    })
                                                ];
                                            case 1:
                                                if ((r = n.sent()).ok) return [2, r.text()];
                                                throw (
                                                    (console.error(
                                                        "ajax request failed",
                                                        r.statusText
                                                    ),
                                                    new Error(r.statusText))
                                                );
                                        }
                                    });
                                })
                            );
                        }),
                        (e.prototype.getJson = function (e, t) {
                            return (
                                void 0 === t && (t = {}),
                                Object(n.b)(this, void 0, void 0, function () {
                                    var r;
                                    return Object(n.d)(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    d(e, {
                                                        credentials: "same-origin",
                                                        method: t.method || "get",
                                                        body: "post" == t.method ? t.body : void 0,
                                                        cache: t.noCache ? "no-store" : "default"
                                                    })
                                                ];
                                            case 1:
                                                if ((r = n.sent()).ok) return [2, r.json()];
                                                throw (
                                                    (console.error(
                                                        "ajax request failed",
                                                        r.statusText
                                                    ),
                                                    new Error(r.statusText))
                                                );
                                        }
                                    });
                                })
                            );
                        }),
                        e
                    );
                })()),
            f = r(75),
            g = (function () {
                function e() {}
                return (
                    (e.prototype.createToken = function (e) {
                        try {
                            var t = this.relativeUrl(e.url),
                                r = new f.KJUR.crypto.Signature({
                                    alg: "SHA1withRSA",
                                    prov: "cryptojs/jsrsa"
                                }),
                                n = new f.RSAKey();
                            n.readPKCS8PrvKeyHex(f.b64tohex(e.privateKey)),
                                r.init(n),
                                r.updateString(t);
                            var i = f.hextob64(r.sign());
                            return (
                                'semmtech-app-token appId="' + e.appId + '", signature="' + i + '"'
                            );
                        } catch (e) {
                            throw (
                                (console.error(e),
                                new Error(
                                    "Error during creation of laces authentication token. Please check your credentials carefully."
                                ))
                            );
                        }
                    }),
                    (e.prototype.relativeUrl = function (e) {
                        for (
                            var t = e.split("/"),
                                r = "",
                                n = e.startsWith("http://") || e.startsWith("https://") ? 3 : 1;
                            n < t.length;
                            n++
                        )
                            r += "/" + t[n];
                        return r;
                    }),
                    e
                );
            })(),
            y = (function () {
                return function () {};
            })(),
            b = (function () {
                function e(e) {
                    this.options = e;
                }
                return (
                    (e.prototype.execute = function (e, t) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var r, i, o, a, s, c, l, u, p, h;
                            return Object(n.d)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        for (r = 0, i = t; r < i.length; r++)
                                            switch (
                                                ((o = i[r]),
                                                (a = new RegExp("\\?" + o.name, "gi")),
                                                o.type)
                                            ) {
                                                case "uri":
                                                    e = e.replace(a, "<" + o.value + ">");
                                                    break;
                                                case "text":
                                                    e = e.replace(a, '"' + o.value + '"');
                                            }
                                        switch (
                                            ((s = this.options.url),
                                            (c = { Accept: "application/sparql-results+json" }),
                                            "get" === this.options.mode
                                                ? (s =
                                                      s +
                                                      "?query=" +
                                                      this.properEncodeURIComponent(e))
                                                : ((l = e),
                                                  (c["Content-Type"] = "application/sparql-query")),
                                            this.options.auth)
                                        ) {
                                            case "basic":
                                                c.Authorization = this.getBasicAuthToken({
                                                    username: this.options.username,
                                                    password: this.options.password
                                                });
                                                break;
                                            case "laces":
                                                c.Authorization = this.getLacesAuthToken({
                                                    url: s,
                                                    username: this.options.username,
                                                    password: this.options.password
                                                });
                                        }
                                        return [
                                            4,
                                            fetch(s, {
                                                mode: "cors",
                                                method: this.options.mode,
                                                body: l,
                                                headers: new Headers(c)
                                            })
                                        ];
                                    case 1:
                                        if (!(u = n.sent()).ok)
                                            throw (
                                                ((p = "Sparql request failed: " + u.statusText),
                                                new Error(p))
                                            );
                                        return [4, u.json()];
                                    case 2:
                                        return (h = n.sent()), this.validateJsonResponse(h), [2, h];
                                }
                            });
                        });
                    }),
                    (e.prototype.getBasicAuthToken = function (e) {
                        return "Basic " + btoa(e.username + ":" + e.password);
                    }),
                    (e.prototype.getLacesAuthToken = function (e) {
                        return new g().createToken({
                            url: e.url,
                            appId: e.username,
                            privateKey: e.password
                        });
                    }),
                    (e.prototype.properEncodeURIComponent = function (e) {
                        return encodeURIComponent(e).replace(/'/gi, "%27");
                    }),
                    (e.prototype.validateJsonResponse = function (e) {
                        if (!e.head) throw new Error("Sparql response is missing 'head' property");
                        if (!e.head.vars)
                            throw new Error("Sparql response is missing 'head.vars' property");
                        if (!e.results)
                            throw new Error("Sparql response is missing 'results' property");
                        if (!e.results.bindings)
                            throw new Error(
                                "Sparql response is missing 'results.bindings' property"
                            );
                    }),
                    e
                );
            })(),
            v = r(94),
            E = r(14),
            x = function () {
                return i.createElement(
                    "div",
                    { className: "container" },
                    i.createElement(
                        "div",
                        { className: "row" },
                        i.createElement(
                            "div",
                            { className: "one-half column", style: { marginTop: "25%" } },
                            i.createElement("h4", null, "Application information"),
                            i.createElement("p", null, "Build #", "6e01a03")
                        )
                    )
                );
            },
            w = r(183),
            T = (function () {
                function e() {}
                return (
                    (e.parse = function (e) {
                        for (
                            var t = e.head.vars, r = [], n = 0, i = e.results.bindings;
                            n < i.length;
                            n++
                        ) {
                            for (var o = i[n], a = {}, s = !1, c = 0, l = t; c < l.length; c++) {
                                var u = l[c],
                                    p = o[u];
                                p
                                    ? ((s = !0), (a[u] = p))
                                    : (a[u] = { type: void 0, value: void 0 });
                            }
                            s && r.push(a);
                        }
                        return r;
                    }),
                    e
                );
            })();
        function S(e, t) {
            var r = e[t || ""];
            return r ? r.value : "";
        }
        var k,
            O = (function () {
                function e() {}
                return (
                    (e.isSame = function (e, t) {
                        return (!e && !t) || !(!e || !t || e.iri !== t.iri);
                    }),
                    (e.isSameInContent = function (e, t) {
                        return (
                            !!this.isSame(e, t) &&
                            ((!e && !t) ||
                                !(
                                    !e ||
                                    !t ||
                                    e.iri !== t.iri ||
                                    e.name !== t.name ||
                                    e.icon !== t.icon
                                ))
                        );
                    }),
                    e
                );
            })(),
            C = (function () {
                function e() {}
                return (
                    (e.parseFromSparqlRecord = function (e, t) {
                        return (
                            void 0 === t && (t = "entry"),
                            {
                                name: S(e, t + "_text"),
                                iri: S(e, t + "_iri"),
                                icon: S(e, t + "_icon")
                            }
                        );
                    }),
                    e
                );
            })(),
            j = r(473),
            q = r(188),
            P = r(76),
            I = r(61),
            L = r(91),
            _ = r(182),
            R = r(189),
            N = r(180),
            M = function (e) {
                var t = e.text,
                    r = e.link,
                    n = e.icon,
                    o = e.badge,
                    a = e.copyToClipboard,
                    s = N(),
                    c = r
                        ? i.createElement(
                              v.b,
                              {
                                  to: "?uri=" + encodeURIComponent(r),
                                  className: I({ "text-info": e.highlighted }),
                                  onClick: e.onClick
                              },
                              t
                          )
                        : a
                        ? i.createElement(
                              i.Fragment,
                              null,
                              t,
                              i.createElement(
                                  L,
                                  { text: t },
                                  i.createElement("button", {
                                      id: "CopyPopoverFocus-" + s,
                                      className: "copy-document-icon"
                                  })
                              ),
                              i.createElement(
                                  _.a,
                                  {
                                      trigger: "focus",
                                      placement: "bottom",
                                      target: "CopyPopoverFocus-" + s
                                  },
                                  i.createElement(R.a, null, "Copied!")
                              )
                          )
                        : t;
                return i.createElement(
                    i.Fragment,
                    null,
                    i.createElement(
                        "span",
                        { className: "mr-auto" },
                        n
                            ? i.createElement("span", { className: "text-item-icon " + n })
                            : i.createElement(i.Fragment, null),
                        c
                    ),
                    i.createElement("span", { className: "text-item-badge badge" }, o)
                );
            },
            U =
                (r(224),
                (function (e) {
                    function t(t) {
                        var r = e.call(this, t) || this;
                        return (r.sparqlExecutor = c(y)), (r.state = {}), r;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.componentDidMount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return [4, this.loadData(this.props)];
                                        case 1:
                                            return e.sent(), [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.UNSAFE_componentWillReceiveProps = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (t) {
                                    switch (t.label) {
                                        case 0:
                                            return this.props.path == e.path && e.path
                                                ? [3, 2]
                                                : [4, this.loadData(e)];
                                        case 1:
                                            t.sent(), (t.label = 2);
                                        case 2:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.loadData = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var t, r, i, o, a;
                                return Object(n.d)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            return (
                                                (t = e.currentTerm),
                                                (r = t ? t.iri : void 0),
                                                (i = e.path) || !r
                                                    ? [3, 2]
                                                    : (this.setState({ isLoading: !0 }),
                                                      [
                                                          4,
                                                          this.sparqlExecutor.execute(
                                                              e.config.queryBreadcrumbs,
                                                              [
                                                                  {
                                                                      name: "term_iri",
                                                                      type: "uri",
                                                                      value: r
                                                                  }
                                                              ]
                                                          )
                                                      ])
                                            );
                                        case 1:
                                            if (
                                                ((o = n.sent()),
                                                !O.isSame(t, this.props.currentTerm) ||
                                                    this.props.path)
                                            )
                                                return [2];
                                            (a = T.parse(o)),
                                                (i = a.map(function (e) {
                                                    return C.parseFromSparqlRecord(e);
                                                })),
                                                (n.label = 2);
                                        case 2:
                                            return this.setState({ path: i, isLoading: !1 }), [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.render = function () {
                            return this.state.path || this.props.currentTerm
                                ? i.createElement(j.a, null, this.renderBreadcrumbs())
                                : null;
                        }),
                        (t.prototype.renderBreadcrumbs = function () {
                            var e = this;
                            if (!this.state.path)
                                return [
                                    i.createElement(
                                        q.a,
                                        { key: "1", active: !0 },
                                        i.createElement(P.a, { size: "sm", color: "primary" })
                                    )
                                ];
                            for (
                                var t = [],
                                    r = 0,
                                    n = function (n) {
                                        var a = o.state.path.slice(0, r);
                                        t.push(
                                            i.createElement(
                                                q.a,
                                                { key: r },
                                                i.createElement(M, {
                                                    text: n.name,
                                                    link: n.iri,
                                                    icon: n.icon,
                                                    highlighted: O.isSame(n, o.props.currentTerm),
                                                    onClick: function () {
                                                        e.props.onSelect(n, a);
                                                    }
                                                })
                                            )
                                        ),
                                            r++;
                                    },
                                    o = this,
                                    a = 0,
                                    s = this.state.path;
                                a < s.length;
                                a++
                            ) {
                                n(s[a]);
                            }
                            return t;
                        }),
                        t
                    );
                })(i.Component)),
            A = r(184),
            F = r(463),
            D = r(472),
            H = r(186),
            G = r(185),
            W = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return (r.state = { isEmpty: !0 }), r;
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.render = function () {
                        var e = this.props.config;
                        return i.createElement(
                            D.a,
                            { tabId: e.id, id: e.id, key: e.id, className: "tab-" + e.type },
                            this.renderContent()
                        );
                    }),
                    (t.prototype.componentDidMount = function () {
                        (this.props.config.hideIfEmpty && this.state.isEmpty) ||
                            this.props.unhide();
                    }),
                    (t.prototype.componentDidUpdate = function () {
                        (this.props.config.hideIfEmpty && this.state.isEmpty) ||
                            this.props.unhide();
                    }),
                    (t.prototype.shouldComponentUpdate = function (e, t) {
                        return (
                            e.currentUri !== this.props.currentUri ||
                            e.active !== this.props.active ||
                            t.isEmpty !== this.state.isEmpty
                        );
                    }),
                    (t.prototype.UNSAFE_componentWillReceiveProps = function (e) {
                        e.currentUri !== this.props.currentUri && this.setState({ isEmpty: !0 });
                    }),
                    (t.renderLink = function (e, t, r) {
                        void 0 === t && (t = !1);
                        var n = e.config;
                        return i.createElement(
                            H.a,
                            { key: "tabitem-" + n.id },
                            i.createElement(
                                G.a,
                                {
                                    className: I({ active: t }),
                                    id: "tablink-" + n.id,
                                    key: "tablink-" + n.id,
                                    onClick: r
                                },
                                i.createElement("span", { className: n.icon }),
                                " ",
                                n.name
                            )
                        );
                    }),
                    t
                );
            })(i.Component),
            K = function (e) {
                var t = "";
                return (
                    (t =
                        e.error instanceof Error
                            ? e.error.message || "Error"
                            : ("string" == typeof e.error && e.error) || "Error"),
                    i.createElement(
                        "div",
                        { className: "error-message-component" },
                        i.createElement("pre", null, t)
                    )
                );
            },
            z =
                (r(221),
                (function (e) {
                    function t(t) {
                        var r = e.call(this, t) || this;
                        return (
                            (r.sparqlExecutor = c(y)), (r.state = { isLoading: !0, data: [] }), r
                        );
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.componentDidMount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return [4, this.loadData(this.props)];
                                        case 1:
                                            return e.sent(), [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.UNSAFE_componentWillReceiveProps = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (t) {
                                    switch (t.label) {
                                        case 0:
                                            return e.query == this.props.query &&
                                                e.queryParameters == this.props.queryParameters
                                                ? [3, 2]
                                                : [4, this.loadData(e)];
                                        case 1:
                                            t.sent(), (t.label = 2);
                                        case 2:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.loadData = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var t, r, i;
                                return Object(n.d)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            this.setState({ isLoading: !0, error: void 0 }),
                                                (n.label = 1);
                                        case 1:
                                            return (
                                                n.trys.push([1, 3, , 4]),
                                                [
                                                    4,
                                                    this.sparqlExecutor.execute(
                                                        e.query,
                                                        e.queryParameters
                                                    )
                                                ]
                                            );
                                        case 2:
                                            return (
                                                (t = n.sent()),
                                                (r = T.parse(t)),
                                                this.setState({ isLoading: !1, data: r }),
                                                this.props.onLoad &&
                                                    this.props.onLoad(
                                                        this.isEmpty() ? 0 : r.length
                                                    ),
                                                [3, 4]
                                            );
                                        case 3:
                                            return (
                                                (i = n.sent()),
                                                this.setState({ isLoading: !1, error: i }),
                                                [3, 4]
                                            );
                                        case 4:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.render = function () {
                            return this.isEmpty()
                                ? i.createElement("div", null)
                                : this.state.isLoading
                                ? i.createElement(P.a, {
                                      className: "spinner-listing",
                                      size: "lg",
                                      color: "primary"
                                  })
                                : i.createElement(
                                      i.Fragment,
                                      null,
                                      this.state.error
                                          ? i.createElement(K, { error: this.state.error })
                                          : this.renderListing()
                                  );
                        }),
                        (t.prototype.renderGroupHeader = function (e) {
                            var t = "list-group-" + this.getGroupKey(e);
                            return i.createElement(
                                "div",
                                {
                                    key: t,
                                    className:
                                        "sparql-listing-group d-flex justify-content-between align-items-center"
                                },
                                i.createElement(M, {
                                    text: S(e, "group_text"),
                                    link: S(e, "group_iri"),
                                    icon: S(e, "group_icon"),
                                    badge: S(e, "group_badge")
                                })
                            );
                        }),
                        (t.prototype.renderGroupEntries = function (e) {
                            var t = this;
                            return this.state.data
                                .filter(function (r) {
                                    return t.isSameGroup(r, e);
                                })
                                .map(function (e, r) {
                                    return t.renderEntry(e);
                                });
                        }),
                        (t.prototype.renderEntry = function (e) {
                            var t = "list-entry-" + this.getGroupKey(e) + "-" + this.getEntryKey(e);
                            return i.createElement(
                                "li",
                                {
                                    key: t,
                                    className:
                                        "sparql-listing-entry list-group-item d-flex justify-content-between align-items-center"
                                },
                                i.createElement(M, {
                                    text: S(e, "entry_text"),
                                    link: S(e, "entry_iri"),
                                    icon: S(e, "entry_icon"),
                                    badge: S(e, "entry_badge"),
                                    copyToClipboard: !0
                                })
                            );
                        }),
                        (t.prototype.renderListing = function () {
                            var e,
                                t = this,
                                r = this.state.data;
                            return i.createElement(
                                "div",
                                { className: "sparql-listing" },
                                r.map(function (r) {
                                    return t.isEmptyRecord(r) || (e && t.isSameGroup(r, e))
                                        ? null
                                        : ((e = r),
                                          i.createElement(
                                              "div",
                                              {
                                                  className: "sparql-listing-list",
                                                  key: "list-" + t.getGroupKey(r)
                                              },
                                              t.hasGroup(e)
                                                  ? t.renderGroupHeader(e)
                                                  : i.createElement(i.Fragment, null),
                                              i.createElement(
                                                  "ul",
                                                  {
                                                      className: "sparql-listing-entries",
                                                      key: "list-entries-" + t.getGroupKey(r)
                                                  },
                                                  t.renderGroupEntries(e)
                                              )
                                          ));
                                })
                            );
                        }),
                        (t.prototype.isEmpty = function () {
                            var e = this.state.data;
                            return !(e && e.length > 0 && this.hasEntry(e[0]));
                        }),
                        (t.prototype.isEmptyRecord = function (e) {
                            return !this.hasEntry(e);
                        }),
                        (t.prototype.hasGroup = function (e) {
                            if (!e) return !1;
                            var t = S(e, "group_text"),
                                r = S(e, "group_iri");
                            return !!((t && t.length > 0) || (r && r.length > 0));
                        }),
                        (t.prototype.hasEntry = function (e) {
                            if (!e) return !1;
                            var t = S(e, "entry_text"),
                                r = S(e, "entry_iri");
                            return !!((t && t.length > 0) || (r && r.length > 0));
                        }),
                        (t.prototype.isSameGroup = function (e, t) {
                            return (
                                this.hasGroup(e) == this.hasGroup(t) &&
                                (!this.hasGroup(e) ||
                                    (S(e, "group_text") == S(t, "group_text") &&
                                        S(e, "group_iri") == S(t, "group_iri")))
                            );
                        }),
                        (t.prototype.getGroupKey = function (e) {
                            return (
                                "group{iri:" +
                                S(e, "group_iri") +
                                "&text:" +
                                S(e, "group_text") +
                                "}"
                            );
                        }),
                        (t.prototype.getEntryKey = function (e) {
                            return (
                                "entry{iri:" +
                                S(e, "entry_iri") +
                                "&text:" +
                                S(e, "entry_text") +
                                "}"
                            );
                        }),
                        t
                    );
                })(i.Component)),
            B =
                (r(219),
                (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.renderContent = function () {
                            var e = this,
                                t = this.props.config,
                                r = this.props.currentUri;
                            return i.createElement(z, {
                                query: t.query,
                                queryParameters: [{ name: "term_iri", type: "uri", value: r }],
                                onLoad: function (t) {
                                    var r = t <= 0;
                                    e.setState({ isEmpty: r });
                                }
                            });
                        }),
                        t
                    );
                })(W)),
            Q = r(176),
            V = r(36),
            J = Object(V.b)(),
            X = r(465),
            $ = r(464),
            Y = r(469),
            Z = r(468),
            ee = r(467),
            te = r(466),
            re = r(471),
            ne = r(462),
            ie = r(470),
            oe = r(46);
        !(function (e) {
            (e[(e.Results = 0)] = "Results"), (e[(e.Message = 1)] = "Message");
        })(k || (k = {}));
        var ae = (function () {
                function e() {}
                return (
                    (e.search = function (t, r) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var i, o, a, s, l, u, h, d, m, f;
                            return Object(n.d)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return (
                                            this.getOptions(r),
                                            0 == t.length
                                                ? ((this.state.search = void 0), [2])
                                                : ((this.state.search = { key: t, options: r }),
                                                  (i = []),
                                                  (o = void 0),
                                                  (a = !1),
                                                  this.state.results &&
                                                  this.state.results.key === t &&
                                                  this.state.results.options ===
                                                      this.state.search.options
                                                      ? ((i =
                                                            this.state.results &&
                                                            this.state.results.matches
                                                                ? this.state.results.matches
                                                                : []),
                                                        [3, 3])
                                                      : [3, 1])
                                        );
                                    case 1:
                                        return (
                                            (s = c(p).config),
                                            (l = c(y)),
                                            (this.state.results = void 0),
                                            (u = this.state.search && this.state.search.options),
                                            (h = u && u.limit),
                                            [
                                                4,
                                                l.execute(
                                                    s.querySearch +
                                                        (h && h > 0 ? "\r\nLIMIT " + (h + 1) : ""),
                                                    [{ name: "searchKey", type: "text", value: t }]
                                                )
                                            ]
                                        );
                                    case 2:
                                        if (null == (d = n.sent()) || this.state.search.key !== t)
                                            return [2];
                                        (m = T.parse(d)),
                                            (i = m.map(function (e) {
                                                return {
                                                    iri: S(e, "entry_iri"),
                                                    name: S(e, "entry_text"),
                                                    groupText: S(e, "group_text")
                                                };
                                            })),
                                            h && h > 0 && h < i.length
                                                ? ((a = !0),
                                                  (i = i.slice(0, h)),
                                                  (o = "Showing first " + h + " results"))
                                                : (o = "Showing search results"),
                                            s.querySearch.toLowerCase().includes("order by ") ||
                                                e.sortMatchesAlphabetical(i),
                                            (n.label = 3);
                                    case 3:
                                        return (
                                            (f = {
                                                key: t,
                                                options: r,
                                                matches: i,
                                                limited: a,
                                                message: o
                                            }),
                                            (this.state.results = f),
                                            this.fireEvent(k.Results, f),
                                            [2]
                                        );
                                }
                            });
                        });
                    }),
                    (e.getOptions = function (e) {}),
                    (e.addChangeListener = function (e) {
                        this.state.listeners.add(e);
                    }),
                    (e.removeChangeListener = function (e) {
                        this.state.listeners.delete(e);
                    }),
                    (e.fireEvent = function (e, t) {
                        var r = { type: e, data: t };
                        this.state.listeners.forEach(function (e) {
                            e.onChange(r);
                        });
                    }),
                    (e.getMatchesPer = function (e, t) {
                        for (var r = {}, i = 0, o = t; i < o.length; i++) {
                            var a = o[i],
                                s = a[e] || "";
                            r[s] = Object(n.e)(r[s] || [], [a]);
                        }
                        return Object.entries(r);
                    }),
                    (e.sortMatchesAlphabetical = function (e, t) {
                        void 0 === t && (t = !0),
                            e.sort(function (e, r) {
                                var n = (e.groupText || "").localeCompare(r.groupText || "");
                                return (
                                    0 == n &&
                                        0 ==
                                            (n = (e.name || e.iri).localeCompare(
                                                r.name || r.iri
                                            )) &&
                                        (n = e.iri.localeCompare(r.iri)),
                                    n * (t ? 1 : -1)
                                );
                            });
                    }),
                    (e.MAXCOUNT_QUICKSEARCH_ITEMS = 10),
                    (e.state = { listeners: new Set() }),
                    e
                );
            })(),
            se =
                (r(216),
                (function (e) {
                    function t(t) {
                        var r = e.call(this, t) || this;
                        return (
                            (r.appConfig = c(p).config),
                            (r.sparqlExecutor = c(y)),
                            (r.performSearch = function (e) {
                                return (
                                    void 0 === e && (e = !0),
                                    Object(n.b)(r, void 0, void 0, function () {
                                        var t, r;
                                        return Object(n.d)(this, function (n) {
                                            return (t = this.state.searchTerm).length < 2
                                                ? (this.setState({
                                                      searchTermIsTooShort: !0,
                                                      isSearchResultsOpen: !0
                                                  }),
                                                  [2])
                                                : (this.setState({
                                                      searchTermIsTooShort: !1,
                                                      isSearchInProgress: !0,
                                                      isSearchResultsOpen: !0
                                                  }),
                                                  (r = e
                                                      ? { limit: ae.MAXCOUNT_QUICKSEARCH_ITEMS }
                                                      : {}),
                                                  ae.search(t, r),
                                                  [2]);
                                        });
                                    })
                                );
                            }),
                            (r.performUnlimitedSearch = function () {
                                return Object(n.b)(r, void 0, void 0, function () {
                                    return Object(n.d)(this, function (e) {
                                        return me.search(this.state.searchTerm, { limit: 0 }), [2];
                                    });
                                });
                            }),
                            (r.closeSearch = function () {
                                r.setState({ isSearchResultsOpen: !1 });
                            }),
                            (r.searchBtnClick = function () {
                                return Object(n.b)(r, void 0, void 0, function () {
                                    var e;
                                    return Object(n.d)(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return (
                                                    (e = this.state.searchTerm),
                                                    this.searchTimer &&
                                                        clearTimeout(this.searchTimer),
                                                    this.isIriPattern(e)
                                                        ? (me.browse(e), [2])
                                                        : [4, this.performSearch()]
                                                );
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (r.state = {
                                searchTerm: "",
                                searchTermIsTooShort: !0,
                                isSearchResultsOpen: !1,
                                isSearchInProgress: !1
                            }),
                            r
                        );
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.componentDidMount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    return ae.addChangeListener(this), [2];
                                });
                            });
                        }),
                        (t.prototype.componentWillUnmount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    return ae.removeChangeListener(this), [2];
                                });
                            });
                        }),
                        (t.prototype.onChange = function (e) {
                            this.setState({ isSearchInProgress: !1, searchResults: e.data });
                        }),
                        (t.prototype.isIriPattern = function (e) {
                            return e.startsWith("http://") || e.startsWith("https://");
                        }),
                        (t.prototype.searchInputChange = function (e) {
                            var t = this;
                            this.setState({ searchTerm: e }),
                                this.searchTimer && clearTimeout(this.searchTimer),
                                (this.searchTimer = setTimeout(function () {
                                    return Object(n.b)(t, void 0, void 0, function () {
                                        return Object(n.d)(this, function (e) {
                                            switch (e.label) {
                                                case 0:
                                                    return [4, this.performSearch()];
                                                case 1:
                                                    return e.sent(), [2];
                                            }
                                        });
                                    });
                                }, 500));
                        }),
                        (t.prototype.searchInputKeyDown = function (e) {
                            13 == e && this.searchBtnClick(),
                                40 === e && this.setFocusToSearchResults();
                        }),
                        (t.prototype.setFocusToSearchResults = function () {
                            var e = document.querySelector(".search-result-item");
                            e && e.focus();
                        }),
                        (t.prototype.render = function () {
                            var e = this;
                            return i.createElement(
                                "form",
                                { className: "form-inline my-2 my-lg-0 search-component" },
                                i.createElement(
                                    "div",
                                    { className: "input-group" },
                                    i.createElement("input", {
                                        type: "text",
                                        className: "form-control",
                                        placeholder: "Search",
                                        "aria-label": "Search",
                                        value: this.state.searchTerm,
                                        onChange: function (t) {
                                            return e.searchInputChange(t.target.value);
                                        },
                                        onKeyDown: function (t) {
                                            return e.searchInputKeyDown(t.which);
                                        }
                                    }),
                                    i.createElement(
                                        "div",
                                        { className: "input-group-append" },
                                        i.createElement(
                                            "button",
                                            {
                                                className: "btn btn-outline-secondary",
                                                type: "button",
                                                onClick: this.searchBtnClick
                                            },
                                            i.createElement("span", {
                                                className: "oi oi-magnifying-glass"
                                            })
                                        )
                                    ),
                                    this.props.quicksearch &&
                                        i.createElement(
                                            re.a,
                                            {
                                                isOpen: this.state.isSearchResultsOpen,
                                                toggle: this.closeSearch
                                            },
                                            i.createElement(ne.a, {
                                                tag: "span",
                                                className: "invisible-dropdown-toggler"
                                            }),
                                            i.createElement(
                                                ie.a,
                                                {
                                                    right: !0,
                                                    modifiers: { computeStyle: { y: "left" } }
                                                },
                                                this.renderSearchResult()
                                            )
                                        )
                                )
                            );
                        }),
                        (t.prototype.getSearchMessage = function () {
                            return this.state.searchTerm
                                ? this.state.searchTermIsTooShort
                                    ? "Search term is too short"
                                    : this.state.isSearchInProgress
                                    ? "Searching..."
                                    : this.state.searchResults &&
                                      this.state.searchResults.matches &&
                                      0 === this.state.searchResults.matches.length
                                    ? "No results"
                                    : null
                                : "Please enter search term";
                        }),
                        (t.prototype.renderSearchResult = function () {
                            var e = this,
                                t = this.getSearchMessage();
                            if (t) return i.createElement(oe.a, { header: !0 }, t);
                            var r = this.state.searchResults;
                            if (void 0 !== r) {
                                var n = (r.matches || []).slice(
                                        0,
                                        r.limited ? ae.MAXCOUNT_QUICKSEARCH_ITEMS : void 0
                                    ),
                                    o = ae.getMatchesPer("groupText", n);
                                return i.createElement(
                                    i.Fragment,
                                    null,
                                    i.createElement(
                                        oe.a,
                                        { header: !0 },
                                        r.message,
                                        r.limited
                                            ? i.createElement(
                                                  i.Fragment,
                                                  null,
                                                  " ",
                                                  i.createElement(
                                                      "small",
                                                      {
                                                          className: "hoverPointer",
                                                          onClick: this.performUnlimitedSearch
                                                      },
                                                      "[show all]"
                                                  )
                                              )
                                            : ""
                                    ),
                                    i.createElement(oe.a, { divider: !0 }),
                                    o.map(function (t, r) {
                                        var n = t[0],
                                            a = t[1];
                                        return i.createElement(
                                            i.Fragment,
                                            { key: n },
                                            i.createElement(
                                                oe.a,
                                                { header: !0 },
                                                a[0].groupText,
                                                " "
                                            ),
                                            a.map(function (t) {
                                                return i.createElement(oe.a, {
                                                    key: t.iri,
                                                    tag: function () {
                                                        return i.createElement(
                                                            v.b,
                                                            {
                                                                to:
                                                                    "?uri=" +
                                                                    encodeURIComponent(t.iri),
                                                                className:
                                                                    "dropdown-item search-result-item",
                                                                onClick: e.closeSearch
                                                            },
                                                            t.name
                                                        );
                                                    }
                                                });
                                            }),
                                            r < o.length - 1 &&
                                                i.createElement(oe.a, { divider: !0 })
                                        );
                                    })
                                );
                            }
                        }),
                        t
                    );
                })(i.Component)),
            ce =
                (r(214),
                (function (e) {
                    function t(t) {
                        var r = e.call(this, t) || this;
                        return (
                            (r.appConfig = c(p).config),
                            (r.sparqlExecutor = c(y)),
                            (r.toggleOpen = function () {
                                return r.setState({ isOpen: !r.state.isOpen });
                            }),
                            (r.state = { isOpen: !1 }),
                            r
                        );
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.componentDidMount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return [4, this.loadData(this.props)];
                                        case 1:
                                            return e.sent(), [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.loadData = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var e, t, r;
                                return Object(n.d)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            return [
                                                4,
                                                this.sparqlExecutor.execute(
                                                    this.appConfig.queryOTL,
                                                    []
                                                )
                                            ];
                                        case 1:
                                            if (((e = n.sent()), 0 == (t = T.parse(e)).length))
                                                throw new Error(
                                                    "Error retrieving information on source"
                                                );
                                            return (
                                                (r = t[0]),
                                                this.setState({
                                                    name: S(r, "text"),
                                                    version: S(r, "version")
                                                }),
                                                [2]
                                            );
                                    }
                                });
                            });
                        }),
                        (t.prototype.render = function () {
                            return i.createElement(
                                "div",
                                null,
                                i.createElement(
                                    Y.a,
                                    { color: "light", light: !0, expand: "sm" },
                                    i.createElement(Z.a, {
                                        href: "#",
                                        className: "ex-app-logo",
                                        title: "LACES Linked Data Viewer"
                                    }),
                                    i.createElement(ee.a, { onClick: this.toggleOpen }),
                                    i.createElement(
                                        te.a,
                                        { isOpen: this.state.isOpen, navbar: !0 },
                                        i.createElement(
                                            A.a,
                                            { className: "mr-auto", navbar: !0 },
                                            i.createElement(
                                                H.a,
                                                null,
                                                i.createElement(
                                                    G.a,
                                                    { href: "#" },
                                                    i.createElement(
                                                        "span",
                                                        { id: "title-placeholder" },
                                                        this.state.name
                                                    ),
                                                    i.createElement(
                                                        "span",
                                                        { id: "version-placeholder" },
                                                        " ",
                                                        this.state.version
                                                            ? "(" + this.state.version + ")"
                                                            : ""
                                                    ),
                                                    i.createElement(
                                                        "span",
                                                        { className: "sr-only" },
                                                        "(current)"
                                                    )
                                                ),
                                                this.appConfig.subtitleHTML
                                                    ? i.createElement("span", {
                                                          className: "subtitle",
                                                          dangerouslySetInnerHTML: {
                                                              __html: this.appConfig.subtitleHTML
                                                          }
                                                      })
                                                    : ""
                                            )
                                        ),
                                        i.createElement(se, { quicksearch: this.props.quicksearch })
                                    )
                                )
                            );
                        }),
                        t
                    );
                })(i.Component));
        function le(e, t) {
            for (var r = {}, n = 0, i = e; n < i.length; n++) {
                var o = i[n],
                    a = ue(o, t);
                a && (r[o] = a);
            }
            return r;
        }
        function ue(e, t) {
            var r = pe(t.location.search);
            return r[e] && console.log(e + ": " + r[e]), r[e] || void 0;
        }
        function pe(e) {
            var t = {};
            return (
                new URLSearchParams(e).forEach(function (e, r) {
                    t[r] = e;
                }),
                t
            );
        }
        r(212);
        var he = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return (
                        (r.performUnlimitedSearch = function () {
                            return Object(n.b)(r, void 0, void 0, function () {
                                var e, t;
                                return Object(n.d)(this, function (r) {
                                    return (
                                        (e = this.props.results),
                                        ((t = (e && e.options) || {}).limit = 0),
                                        e && ae.search(e.key, t),
                                        [2]
                                    );
                                });
                            });
                        }),
                        (r.state = {}),
                        r
                    );
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.render = function () {
                        var e = this.props.results;
                        if (!e) return null;
                        var t = e.matches ? e.matches : [];
                        return i.createElement(
                            "section",
                            { className: "rounded border border-dark" },
                            i.createElement(
                                "h3",
                                { className: "mr-auto" },
                                "Search results for ‘",
                                e.key,
                                "’"
                            ),
                            i.createElement(
                                "div",
                                null,
                                e.message,
                                e.limited
                                    ? i.createElement(
                                          i.Fragment,
                                          null,
                                          " ",
                                          i.createElement(
                                              "small",
                                              {
                                                  className: "hoverPointer",
                                                  onClick: this.performUnlimitedSearch
                                              },
                                              "[show all]"
                                          )
                                      )
                                    : ""
                            ),
                            this.renderGroups(t)
                        );
                    }),
                    (t.prototype.renderGroups = function (e) {
                        var t = ae.getMatchesPer("groupText", e);
                        return t.map(function (e, r) {
                            var n = e[0],
                                o = e[1];
                            return i.createElement(
                                i.Fragment,
                                { key: n },
                                i.createElement(oe.a, { header: !0 }, n, " "),
                                o.map(function (e) {
                                    return i.createElement(oe.a, {
                                        key: n + "_" + e.iri,
                                        tag: function () {
                                            return i.createElement(
                                                v.b,
                                                {
                                                    to: me.getBrowseLink(e.iri),
                                                    className: "dropdown-item search-result-item"
                                                },
                                                e.name || e.iri
                                            );
                                        }
                                    });
                                }),
                                r < t.length - 1 && i.createElement(oe.a, { divider: !0 })
                            );
                        });
                    }),
                    t
                );
            })(i.Component),
            de = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return (r.state = {}), r;
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.componentDidMount = function () {
                        ae.addChangeListener(this);
                        var e = ue("key", this.props),
                            t = le(["limit", "type", "sort"], this.props);
                        e && this.searchFor(e, t);
                    }),
                    (t.prototype.componentWillUnmount = function () {
                        ae.removeChangeListener(this);
                    }),
                    (t.prototype.componentDidUpdate = function (e) {
                        var t = ue("key", e),
                            r = ue("key", this.props),
                            n = le(["limit", "type", "sort"], e),
                            i = le(["limit", "type", "sort"], this.props);
                        !r ||
                            (r == t && JSON.stringify(i) == JSON.stringify(n)) ||
                            this.searchFor(r, i);
                    }),
                    (t.prototype.onChange = function (e) {
                        var t = e.data.key,
                            r = e.data.options;
                        me.search(t, r), this.setState({ results: e.data });
                    }),
                    (t.prototype.searchFor = function (e, t) {
                        (t = t || le(["limit", "type", "sort"], this.props)) &&
                            !t.limit &&
                            (t.limit = ae.MAXCOUNT_QUICKSEARCH_ITEMS),
                            ae.search(e, t);
                    }),
                    (t.prototype.render = function () {
                        var e = this.state ? this.state.results : void 0;
                        return i.createElement(
                            i.Fragment,
                            null,
                            i.createElement(ce, { quicksearch: !1 }),
                            i.createElement(
                                X.a,
                                { fluid: !0 },
                                i.createElement(
                                    w.a,
                                    null,
                                    i.createElement(
                                        $.a,
                                        { className: "single-column" },
                                        i.createElement(he, { results: e })
                                    )
                                )
                            )
                        );
                    }),
                    (t.PATHNAME = "/search"),
                    t
                );
            })(i.Component),
            me = (function () {
                function e() {}
                return (
                    (e.getCurrentParameters = function () {
                        var e = J.location.search;
                        return new URLSearchParams(e);
                    }),
                    (e.getCurrentPathname = function () {
                        return J.location.pathname;
                    }),
                    (e.getActionLinkWithParams = function (e, t) {
                        return "#" + e + (t ? "?" + t.toString() : "");
                    }),
                    (e.retainOnly = function (e, t) {
                        var r = [];
                        if (void 0 === e) return new URLSearchParams();
                        for (var n = /(^|&)([^=]*)=/g, i = e.toString(), o = n.exec(i); o; )
                            r.push(o[2]), (o = n.exec(i));
                        for (var a = 0, s = r; a < s.length; a++) {
                            var c = s[a];
                            t.includes(c) || e.delete(c);
                        }
                        return e;
                    }),
                    (e.setParams = function (t) {
                        var r = J.location.pathname,
                            n = e.getActionLinkWithParams(r, t);
                        J.push(n);
                    }),
                    (e.getSearchLinkWithParams = function (t) {
                        return e.getActionLinkWithParams(de.PATHNAME, t);
                    }),
                    (e.getSearchLink = function (t, r) {
                        var n = e.getCurrentParameters();
                        for (var i in (e.retainOnly(n, ["source"]), t && n.set("key", t), r))
                            n.set(i, r[i]);
                        return e.getSearchLinkWithParams(n);
                    }),
                    (e.searchWithParams = function (t) {
                        J.push(e.getSearchLinkWithParams(t));
                    }),
                    (e.search = function (t, r) {
                        J.push(e.getSearchLink(t, r));
                    }),
                    (e.getBrowseLinkWithParams = function (t) {
                        return (
                            (t = e.retainOnly(t, ["source", "uri", "tab"])),
                            e.getActionLinkWithParams(je.PATHNAME, t)
                        );
                    }),
                    (e.getBrowseLink = function (t) {
                        var r = e.getCurrentParameters();
                        return (
                            r.delete("tab"),
                            r.delete("key"),
                            r.delete("limit"),
                            t && "urn:laces:concept:all" != t ? r.set("uri", t) : r.delete("uri"),
                            e.getBrowseLinkWithParams(r)
                        );
                    }),
                    (e.browseWithParams = function (t) {
                        J.push(e.getBrowseLinkWithParams(t));
                    }),
                    (e.browse = function (t) {
                        J.push(e.getBrowseLink(t));
                    }),
                    e
                );
            })(),
            fe = r(92),
            ge = (r(207), r(210)),
            ye = r(209),
            be = [
                "Point",
                "MultiPoint",
                "LineString",
                "MultiLineString",
                "Polygon",
                "MultiPolygon"
            ],
            ve = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return (
                        (r.sparqlExecutor = c(y)),
                        (r.state = { isLoading: !0 }),
                        (r.styleRefs = [i.createRef(), i.createRef(), i.createRef()]),
                        r
                    );
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.componentDidMount = function () {
                        return Object(n.b)(this, void 0, void 0, function () {
                            return Object(n.d)(this, function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, this.loadData(this.props)];
                                    case 1:
                                        return e.sent(), [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.componentDidUpdate = function (e) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            return Object(n.d)(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return e.id == this.props.id &&
                                            Object(Q.isEqual)(e.config, this.props.config) &&
                                            e.query == this.props.query &&
                                            e.queryParameters == this.props.queryParameters
                                            ? [3, 2]
                                            : [4, this.loadData(this.props)];
                                    case 1:
                                        t.sent(), (t.label = 2);
                                    case 2:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.loadData = function (e) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var t, r, i, o;
                            return Object(n.d)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        this.setState({ isLoading: !0, error: void 0 }),
                                            (n.label = 1);
                                    case 1:
                                        return (
                                            n.trys.push([1, 3, , 4]),
                                            [
                                                4,
                                                this.sparqlExecutor.execute(
                                                    e.query,
                                                    e.queryParameters
                                                )
                                            ]
                                        );
                                    case 2:
                                        return (
                                            (t = n.sent()),
                                            (r = T.parse(t)),
                                            (i = this.parseRecords(r)),
                                            this.setState({ isLoading: !1, data: i }),
                                            e.onLoad &&
                                                (e.onLoad(this.isEmpty() ? 0 : r.length),
                                                this.loadMap()),
                                            [3, 4]
                                        );
                                    case 3:
                                        return (
                                            (o = n.sent()),
                                            this.setState({ isLoading: !1, error: o }),
                                            [3, 4]
                                        );
                                    case 4:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.render = function () {
                        return this.isEmpty()
                            ? i.createElement("div", null)
                            : this.state.isLoading
                            ? i.createElement(P.a, {
                                  className: "spinner-listing",
                                  size: "lg",
                                  color: "primary"
                              })
                            : i.createElement(
                                  i.Fragment,
                                  null,
                                  this.state.error
                                      ? i.createElement(K, { error: this.state.error })
                                      : this.renderMap()
                              );
                    }),
                    (t.prototype.renderMap = function () {
                        return i.createElement(
                            "div",
                            { id: this.createDivIdMap(), className: "mapboxMap" },
                            i.createElement("link", {
                                href: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css",
                                rel: "stylesheet"
                            }),
                            i.createElement(
                                "div",
                                {
                                    id: this.createDivIdStyleMenu(),
                                    className: "mapboxStyleMenu rounded"
                                },
                                this.createStyleOption(
                                    "Light",
                                    "mapbox://styles/mapbox/light-v10",
                                    this.styleRefs[0]
                                ),
                                this.createStyleOption(
                                    "Dark",
                                    "mapbox://styles/mapbox/dark-v10",
                                    this.styleRefs[1]
                                ),
                                this.createStyleOption(
                                    "Satellite",
                                    "mapbox://styles/mapbox/satellite-v9",
                                    this.styleRefs[2]
                                )
                            )
                        );
                    }),
                    (t.prototype.createStyleOption = function (e, t, r) {
                        return i.createElement(
                            i.Fragment,
                            null,
                            i.createElement("input", {
                                id: "mapStyle",
                                type: "radio",
                                name: "rtoggle",
                                value: t,
                                ref: r,
                                defaultChecked: "mapbox://styles/mapbox/light-v10" == t
                            }),
                            i.createElement("label", null, e)
                        );
                    }),
                    (t.prototype.createDivIdMap = function () {
                        return this.props.id + "_map";
                    }),
                    (t.prototype.createDivIdStyleMenu = function () {
                        return this.props.id + "_stylemenu";
                    }),
                    (t.prototype.loadMap = function () {
                        var e = this,
                            t = this.props.config;
                        (t.style = "mapbox://styles/mapbox/light-v10"),
                            (t.container = this.createDivIdMap()),
                            t.accessToken ||
                                console.error(
                                    "Cannot load map. No access token has been provided for Mapbox use."
                                );
                        var r = new fe.Map(t);
                        r.addControl(new fe.FullscreenControl());
                        for (var n = 0; n < this.styleRefs.length; n++) {
                            var i = this.styleRefs[n].current;
                            i && (i.onclick = o);
                        }
                        function o(e) {
                            var t = e.target && e.target,
                                n = t && t.value;
                            n && r.setStyle(n);
                        }
                        r.on("load", function () {
                            r.resize();
                        }),
                            r.on("style.load", function () {
                                var t = e.state.data;
                                if (void 0 != t) {
                                    var n = Object.keys(t);
                                    Object.keys(t).some(function (e) {
                                        return !be.includes(e);
                                    }) || (n = be.slice().reverse());
                                    for (var i = 0, o = n; i < o.length; i++) {
                                        var a = o[i],
                                            s = t[a];
                                        if (void 0 != s)
                                            switch (
                                                (r.addSource(a, { type: "geojson", data: s }), a)
                                            ) {
                                                case "Point":
                                                case "MultiPoint":
                                                    r.addLayer({
                                                        id: a + "Circle",
                                                        type: "circle",
                                                        source: a,
                                                        paint: {
                                                            "circle-radius": 5,
                                                            "circle-color": ["get", "color"]
                                                        }
                                                    }),
                                                        e.addPopup(r, a + "Circle");
                                                    break;
                                                case "LineString":
                                                case "MultiLineString":
                                                    r.addLayer({
                                                        id: a + "Line",
                                                        type: "line",
                                                        source: a,
                                                        layout: {
                                                            "line-join": "round",
                                                            "line-cap": "round"
                                                        },
                                                        paint: {
                                                            "line-width": [
                                                                "to-number",
                                                                ["get", "thickness"]
                                                            ],
                                                            "line-color": ["get", "color"]
                                                        }
                                                    }),
                                                        e.addPopup(r, a + "Line");
                                                    break;
                                                case "Polygon":
                                                case "MultiPolygon":
                                                    r.addLayer({
                                                        id: a + "Fill",
                                                        type: "fill",
                                                        source: a,
                                                        paint: {
                                                            "fill-opacity": 1,
                                                            "fill-color": ["get", "color"]
                                                        }
                                                    }),
                                                        e.addPopup(r, a + "Fill"),
                                                        r.addLayer({
                                                            id: a + "Line",
                                                            type: "line",
                                                            source: a,
                                                            filter: [
                                                                ">",
                                                                ["to-number", ["get", "thickness"]],
                                                                0
                                                            ],
                                                            layout: {
                                                                "line-join": "round",
                                                                "line-cap": "round"
                                                            },
                                                            paint: {
                                                                "line-width": 1,
                                                                "line-opacity": 0.2
                                                            }
                                                        });
                                            }
                                    }
                                }
                            }),
                            r.resize();
                    }),
                    (t.prototype.addPopup = function (e, t) {
                        e.on("mouseleave", t, function () {
                            e.getCanvas().style.cursor = "";
                        }),
                            e.on("mouseenter", t, function () {
                                e.getCanvas().style.cursor = "pointer";
                            }),
                            e.on("click", t, function (t) {
                                var r = t.lngLat,
                                    n = t.features && t.features[0],
                                    i = null === n || void 0 === n ? void 0 : n.properties;
                                if (n && i) {
                                    var o = document.createElement("div"),
                                        a = document.createElement("div");
                                    (a.className = "mapboxPopup-divInfo"),
                                        (a.innerHTML =
                                            "<a class='oi oi-info' href='" +
                                            me.getBrowseLink(i.uri) +
                                            "'></a>"),
                                        o.appendChild(a);
                                    var s = document.createElement("div");
                                    (s.className = "mapboxPopup-divContent"),
                                        (s.innerHTML = i.label || ""),
                                        o.appendChild(s),
                                        new fe.Popup({ closeButton: !1 })
                                            .setLngLat(r)
                                            .setDOMContent(o)
                                            .addTo(e);
                                }
                            });
                    }),
                    (t.prototype.parseRecords = function (e) {
                        for (var t = {}, r = 0, n = e; r < n.length; r++) {
                            var i = n[r],
                                o = S(i, "entry_iri"),
                                a = S(i, "entry_text"),
                                s = S(i, "location_wkt"),
                                c = S(i, "location_crs"),
                                l = S(i, "location_text") || a,
                                u = S(i, "location_layer"),
                                p = S(i, "location_thickness") || "5",
                                h = S(i, "location_hue") || "0",
                                d = S(i, "location_saturation") || ("0" != h ? "70" : "0"),
                                m = S(i, "location_lightness") || "50",
                                f = S(i, "location_opacity") || "1",
                                g =
                                    S(i, "location_color") ||
                                    "hsla(" + h + "," + d + "%," + m + "%," + f + ")",
                                y = /\s*(\<(?<projection>.*)\>)?\s*(?<wkt>.*)/g.exec(s);
                            if (y && y.groups && y.groups.wkt)
                                try {
                                    var b = ge.wktToGeoJSON(y.groups.wkt.toUpperCase()),
                                        v =
                                            "EPSG:" +
                                            ((
                                                y.groups.projection ||
                                                c ||
                                                "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                                            ).match(/([0-9]{4,})/g) || "4326"),
                                        E = {
                                            type: "Feature",
                                            properties: {
                                                uri: o,
                                                label: l,
                                                color: g,
                                                thickness: p
                                            },
                                            geometry: this.transformGeometry(b, v, "EPSG:4326")
                                        },
                                        x = u || b.type;
                                    void 0 == t[x] &&
                                        (t[x] = { type: "FeatureCollection", features: [] }),
                                        t[x].features.push(E);
                                } catch (e) {
                                    continue;
                                }
                        }
                        return t;
                    }),
                    (t.prototype.transformGeometry = function (e, t, r) {
                        if (t != r)
                            switch (e.type) {
                                case "Point":
                                    e.coordinates = ye(t, r).forward(e.coordinates);
                                    break;
                                case "LineString":
                                case "MultiPoint":
                                    for (var n = 0; n < e.coordinates.length; n++)
                                        e.coordinates[n] = ye(t, r).forward(e.coordinates[n]);
                                    break;
                                case "Polygon":
                                case "MultiLineString":
                                    for (n = 0; n < e.coordinates.length; n++)
                                        for (var i = 0; i < e.coordinates[n].length; i++)
                                            e.coordinates[n][i] = ye(t, r).forward(
                                                e.coordinates[n][i]
                                            );
                                    break;
                                case "MultiPolygon":
                                    for (n = 0; n < e.coordinates.length; n++)
                                        for (i = 0; i < e.coordinates[n].length; i++)
                                            for (var o = 0; i < e.coordinates[n][i].length; o++)
                                                e.coordinates[n][i][o] = ye(t, r).forward(
                                                    e.coordinates[n][i][o]
                                                );
                            }
                        return e;
                    }),
                    (t.prototype.isEmpty = function () {
                        var e = this.state.data;
                        return !(e && Object.keys(e).length > 0);
                    }),
                    t
                );
            })(i.Component),
            Ee =
                (r(205),
                (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.renderContent = function () {
                            var e = this,
                                t = this.props.config,
                                r = this.props.currentUri;
                            return i.createElement(ve, {
                                id: t.id + "-sparqlMap",
                                config: t.object,
                                query: t.query,
                                queryParameters: [{ name: "term_iri", type: "uri", value: r }],
                                onLoad: function (t) {
                                    var r = t <= 0;
                                    e.setState({ isEmpty: r });
                                }
                            });
                        }),
                        t
                    );
                })(W)),
            xe =
                (r(203),
                (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.renderContent = function () {
                            var e = this,
                                t = this.props.config,
                                r = this.props.currentUri;
                            return i.createElement(
                                i.Fragment,
                                null,
                                i.createElement(
                                    "p",
                                    { className: "iri" },
                                    i.createElement("em", null, "URI:"),
                                    " ",
                                    r,
                                    i.createElement(
                                        L,
                                        { text: r },
                                        i.createElement("button", {
                                            id: "UriPopoverFocus",
                                            className: "copy-document-icon"
                                        })
                                    ),
                                    i.createElement(
                                        _.a,
                                        {
                                            trigger: "focus",
                                            placement: "bottom",
                                            target: "UriPopoverFocus"
                                        },
                                        i.createElement(R.a, null, "Copied!")
                                    )
                                ),
                                i.createElement(z, {
                                    query: t.query,
                                    queryParameters: [{ name: "term_iri", type: "uri", value: r }],
                                    onLoad: function (t) {
                                        e.setState({ isEmpty: !1 });
                                    }
                                })
                            );
                        }),
                        t
                    );
                })(W)),
            we =
                (r(201),
                (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.renderContent = function () {
                            var e = this,
                                t = this.props.config,
                                r = this.props.currentUri;
                            return i.createElement(z, {
                                query: t.query,
                                queryParameters: [{ name: "term_iri", type: "uri", value: r }],
                                onLoad: function (t) {
                                    var r = t <= 0;
                                    e.setState({ isEmpty: r });
                                }
                            });
                        }),
                        t
                    );
                })(W)),
            Te =
                (r(199),
                (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.renderContent = function () {
                            var e = this,
                                t = this.props.config,
                                r = this.props.currentUri;
                            return i.createElement(z, {
                                query: t.query,
                                queryParameters: [{ name: "term_iri", type: "uri", value: r }],
                                onLoad: function (t) {
                                    var r = t <= 0;
                                    e.setState({ isEmpty: r });
                                }
                            });
                        }),
                        t
                    );
                })(W)),
            Se = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return (
                        (r.toggleActiveTab = r.toggleActiveTab.bind(r)),
                        (r.state = { activeTabId: void 0, visibleTabIds: [] }),
                        r
                    );
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.UNSAFE_componentWillReceiveProps = function (e) {
                        e.currentTerm == this.props.currentTerm ||
                            (e.currentTerm &&
                                this.props.currentTerm &&
                                e.currentTerm.iri == this.props.currentTerm.iri) ||
                            (console.log("resetting visibleTabIds"),
                            this.setState({ activeTabId: void 0, visibleTabIds: [] }));
                    }),
                    (t.prototype.getTabs = function () {
                        var e = this,
                            t = this.props.config,
                            r = this.props.currentTerm,
                            o = r ? r.iri : void 0,
                            a = [];
                        return o
                            ? (t.tabs.forEach(function (t) {
                                  var r,
                                      s = t.id,
                                      c = {
                                          active: s === e.state.activeTabId,
                                          config: t,
                                          currentUri: o,
                                          unhide: function () {
                                              e.setVisible(s, !0);
                                          }
                                      };
                                  switch (t.type) {
                                      case "info":
                                          r = i.createElement(xe, Object(n.a)({ key: t.id }, c));
                                          break;
                                      case "attributes":
                                          r = i.createElement(B, Object(n.a)({ key: t.id }, c));
                                          break;
                                      case "relations":
                                          r = i.createElement(Te, Object(n.a)({ key: t.id }, c));
                                          break;
                                      case "instances":
                                          r = i.createElement(we, Object(n.a)({ key: t.id }, c));
                                          break;
                                      case "map":
                                          r = i.createElement(Ee, Object(n.a)({ key: t.id }, c));
                                  }
                                  r && a.push(r);
                              }),
                              a)
                            : a;
                    }),
                    (t.prototype.toggleActiveTab = function (e) {
                        this.state.activeTabId !== e &&
                            this.setState({
                                activeTabId: e,
                                visibleTabIds: this.state.visibleTabIds
                            });
                    }),
                    (t.prototype.setVisible = function (e, t) {
                        if ((console.log("setVisible: " + e + ", " + t), this.isVisible(e) !== t)) {
                            var r = this.state.visibleTabIds.slice(),
                                n = this.state.activeTabId;
                            if (t)
                                return (
                                    r.push(e),
                                    1 == r.length && (n = e),
                                    void this.setState({ activeTabId: n, visibleTabIds: r })
                                );
                            var i = r.indexOf(e);
                            0 == (r = r.splice(i, 1)).length && (n = void 0),
                                this.setState({ activeTabId: n, visibleTabIds: r });
                        }
                    }),
                    (t.prototype.isVisible = function (e) {
                        return this.state.visibleTabIds.includes(e);
                    }),
                    (t.prototype.render = function () {
                        var e = this,
                            t = this.props.currentTerm,
                            r = this.getTabs(),
                            n = this.state.activeTabId;
                        return t && t.iri && t.name
                            ? i.createElement(
                                  "section",
                                  { className: "rounded border border-dark" },
                                  i.createElement(
                                      "div",
                                      null,
                                      i.createElement(
                                          A.a,
                                          { tabs: !0 },
                                          i.createElement("h3", { className: "mr-auto" }, t.name),
                                          r.map(function (t, r) {
                                              var i = t.props.config.id,
                                                  o = i == n;
                                              return e.isVisible(i)
                                                  ? W.renderLink(t.props, o, function () {
                                                        e.toggleActiveTab(i);
                                                    })
                                                  : null;
                                          })
                                      )
                                  ),
                                  i.createElement(F.a, { activeTab: n }, r)
                              )
                            : null;
                    }),
                    t
                );
            })(i.Component),
            ke = (function () {
                function e(e, t) {
                    (this.sparqlExecutor = e), (this.options = t);
                }
                return (
                    (e.prototype.loadRootTreeLevel = function () {
                        return Object(n.b)(this, void 0, void 0, function () {
                            return Object(n.d)(this, function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, this.loadTreeLevel()];
                                    case 1:
                                        return [2, e.sent()];
                                }
                            });
                        });
                    }),
                    (e.prototype.expandTreeLevel = function (e) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var t;
                            return Object(n.d)(this, function (r) {
                                switch (r.label) {
                                    case 0:
                                        return e.children && e.children.length > 0
                                            ? ((e.expanded = !0), [2])
                                            : e.childCount > 0
                                            ? ((e.loading = !0),
                                              (t = e),
                                              [4, this.loadTreeLevel(e.uri, e.depth + 1)])
                                            : [3, 2];
                                    case 1:
                                        (t.children = r.sent()),
                                            (e.expanded = !0),
                                            (e.loading = !1),
                                            (r.label = 2);
                                    case 2:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (e.prototype.loadTreeLevel = function (e, t) {
                        return (
                            void 0 === e && (e = ""),
                            void 0 === t && (t = 0),
                            Object(n.b)(this, void 0, void 0, function () {
                                var r, i, o, a, s, c, l, u;
                                return Object(n.d)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            return (
                                                (r = this.options),
                                                0 != t
                                                    ? [3, 2]
                                                    : [
                                                          4,
                                                          this.sparqlExecutor.execute(
                                                              r.queryRoots,
                                                              []
                                                          )
                                                      ]
                                            );
                                        case 1:
                                            return (o = n.sent()), [3, 4];
                                        case 2:
                                            return [
                                                4,
                                                this.sparqlExecutor.execute(r.queryChildren, [
                                                    { name: "term_iri", type: "uri", value: e }
                                                ])
                                            ];
                                        case 3:
                                            (o = n.sent()), (n.label = 4);
                                        case 4:
                                            if (
                                                ((i = o),
                                                (a = T.parse(i)),
                                                (s = this.parseLevel(a, r, t)),
                                                !(t < 0))
                                            )
                                                return [3, 8];
                                            (c = 0), (l = s), (n.label = 5);
                                        case 5:
                                            return c < l.length
                                                ? ((u = l[c]), [4, this.expandTreeLevel(u)])
                                                : [3, 8];
                                        case 6:
                                            n.sent(), (n.label = 7);
                                        case 7:
                                            return c++, [3, 5];
                                        case 8:
                                            return [2, s];
                                    }
                                });
                            })
                        );
                    }),
                    (e.prototype.parseLevel = function (e, t, r) {
                        for (var n = [], i = 0, o = e; i < o.length; i++) {
                            var a = o[i],
                                s = {
                                    record: a,
                                    loading: !1,
                                    uri: this.getRecordValue(a, "entry_iri"),
                                    childCount: parseInt(
                                        this.getRecordValue(a, "entry_childCount"),
                                        10
                                    ),
                                    children: [],
                                    expanded: !1,
                                    depth: r
                                };
                            n.push(s);
                        }
                        return n;
                    }),
                    (e.prototype.getRecordValue = function (e, t) {
                        var r = e[t || ""];
                        return r ? r.value : "";
                    }),
                    e
                );
            })(),
            Oe =
                (r(197),
                (function (e) {
                    function t(t) {
                        var r = e.call(this, t) || this;
                        return (
                            (r.sparqlExecutor = c(y)),
                            (r.state = { data: [], isLoading: !0 }),
                            (r.loader = new ke(r.sparqlExecutor, r.props.config)),
                            r
                        );
                    }
                    return (
                        Object(n.c)(t, e),
                        (t.prototype.componentDidMount = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                return Object(n.d)(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return [4, this.loadData(this.props)];
                                        case 1:
                                            return e.sent(), [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.loadData = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var e, t;
                                return Object(n.d)(this, function (r) {
                                    switch (r.label) {
                                        case 0:
                                            return (
                                                r.trys.push([0, 2, , 3]),
                                                [4, this.loader.loadRootTreeLevel()]
                                            );
                                        case 1:
                                            return (
                                                (e = r.sent()),
                                                this.setState({ data: e, isLoading: !1 }),
                                                [3, 3]
                                            );
                                        case 2:
                                            return (
                                                (t = r.sent()),
                                                this.setState({ error: t, isLoading: !1 }),
                                                [3, 3]
                                            );
                                        case 3:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (t.prototype.render = function () {
                            return this.state.isLoading
                                ? i.createElement(
                                      "section",
                                      {
                                          className: "hierarchy",
                                          style: { whiteSpace: "nowrap", overflowX: "auto" }
                                      },
                                      i.createElement("h3", null, this.props.config.name),
                                      i.createElement(P.a, { size: "sm", color: "primary" })
                                  )
                                : i.createElement(
                                      "section",
                                      {
                                          className: "hierarchy",
                                          style: { whiteSpace: "nowrap", overflowX: "auto" }
                                      },
                                      i.createElement("h3", null, this.props.config.name),
                                      this.state.error
                                          ? i.createElement(K, { error: this.state.error })
                                          : this.renderTree()
                                  );
                        }),
                        (t.prototype.renderTree = function () {
                            var e = this.props.config;
                            return i.createElement(
                                "table",
                                { className: I("table"), id: e.id },
                                i.createElement(
                                    "tbody",
                                    null,
                                    this.renderTreeRecords(this.state.data, [])
                                )
                            );
                        }),
                        (t.prototype.renderTreeRecords = function (e, t) {
                            var r = this;
                            return e.map(function (e, o) {
                                var a = C.parseFromSparqlRecord(e.record);
                                return i.createElement(
                                    i.Fragment,
                                    { key: "row_" + o },
                                    i.createElement(
                                        "tr",
                                        null,
                                        i.createElement(
                                            "td",
                                            { key: "cell_" + o + "_0" },
                                            r.renderStubsAndExpander(e),
                                            i.createElement(M, {
                                                text: a.name,
                                                link: a.iri,
                                                icon: a.icon,
                                                highlighted:
                                                    r.props.currentTerm &&
                                                    a.iri == r.props.currentTerm.iri,
                                                onClick: function () {
                                                    r.props.onSelect(a, t);
                                                }
                                            })
                                        )
                                    ),
                                    e.expanded && e.loading
                                        ? i.createElement(
                                              i.Fragment,
                                              null,
                                              r.renderStubs(e.depth + 2),
                                              i.createElement(P.a, { size: "sm", color: "primary" })
                                          )
                                        : i.createElement(i.Fragment, null),
                                    e.children &&
                                        e.children.length > 0 &&
                                        e.expanded &&
                                        r.renderTreeRecords(e.children, Object(n.e)(t, [a]))
                                );
                            });
                        }),
                        (t.prototype.renderStubs = function (e) {
                            return i.createElement(
                                i.Fragment,
                                null,
                                Array(e)
                                    .fill(0)
                                    .map(function (e, t) {
                                        return i.createElement("span", {
                                            key: t,
                                            className: "tree-stub"
                                        });
                                    })
                            );
                        }),
                        (t.prototype.renderStubsAndExpander = function (e) {
                            var t = this;
                            return i.createElement(
                                i.Fragment,
                                null,
                                this.renderStubs(e.depth),
                                e.childCount > 0
                                    ? i.createElement(
                                          "span",
                                          {
                                              onClick: function () {
                                                  return Object(n.b)(
                                                      t,
                                                      void 0,
                                                      void 0,
                                                      function () {
                                                          return Object(n.d)(this, function (t) {
                                                              switch (t.label) {
                                                                  case 0:
                                                                      return [
                                                                          4,
                                                                          this.toggleRowExpand(e)
                                                                      ];
                                                                  case 1:
                                                                      return [2, t.sent()];
                                                              }
                                                          });
                                                      }
                                                  );
                                              },
                                              className: I("tree-stub row-expander", {
                                                  "is-expanded": e.expanded
                                              })
                                          },
                                          i.createElement("i", {
                                              className: "oi oi-chevron-right"
                                          }),
                                          " "
                                      )
                                    : i.createElement("span", { className: "tree-stub" })
                            );
                        }),
                        (t.prototype.toggleRowExpand = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var t;
                                return Object(n.d)(this, function (r) {
                                    switch (r.label) {
                                        case 0:
                                            return e.expanded
                                                ? ((e.expanded = !1), [3, 4])
                                                : [3, 1];
                                        case 1:
                                            return (
                                                r.trys.push([1, 3, , 4]),
                                                e.childCount > 0 &&
                                                    e.children &&
                                                    0 == e.children.length &&
                                                    ((e.loading = !0),
                                                    (e.expanded = !0),
                                                    this.forceUpdate()),
                                                [4, this.loader.expandTreeLevel(e)]
                                            );
                                        case 2:
                                            return r.sent(), [3, 4];
                                        case 3:
                                            return (
                                                (t = r.sent()), this.setState({ error: t }), [3, 4]
                                            );
                                        case 4:
                                            return this.forceUpdate(), [2];
                                    }
                                });
                            });
                        }),
                        t
                    );
                })(i.Component)),
            Ce = r(175),
            je = (function (e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    (r.appConfig = c(p).config),
                        (r.sparqlExecutor = c(y)),
                        (r.onTermSelected = function (e, t) {
                            (r.tempHierarchyPath = Object(n.e)(t, [e])),
                                r.state.currentTerm &&
                                    r.state.currentTerm.iri === e.iri &&
                                    r.setState({ currentHierarchyPath: r.tempHierarchyPath });
                        });
                    var i = r.getUri(r.props),
                        o = r.getCurrentTermFromUri(i);
                    return (r.state = { currentTerm: o }), r;
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.componentDidMount = function () {
                        return Object(n.b)(this, void 0, void 0, function () {
                            return Object(n.d)(this, function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, this.loadData(this.state)];
                                    case 1:
                                        return e.sent(), [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.componentDidUpdate = function () {
                        return Object(n.b)(this, void 0, void 0, function () {
                            return Object(n.d)(this, function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, this.loadData(this.state)];
                                    case 1:
                                        return e.sent(), [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.loadData = function (e) {
                        return Object(n.b)(this, void 0, void 0, function () {
                            var t, r, i, o, a;
                            return Object(n.d)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        if (!(t = e.currentTerm) || t.name) return [3, 4];
                                        n.label = 1;
                                    case 1:
                                        return (
                                            n.trys.push([1, 3, , 4]),
                                            [
                                                4,
                                                this.sparqlExecutor.execute(
                                                    this.appConfig.queryTerm,
                                                    [
                                                        {
                                                            name: "term_iri",
                                                            type: "uri",
                                                            value: t.iri
                                                        }
                                                    ]
                                                )
                                            ]
                                        );
                                    case 2:
                                        return (
                                            (r = n.sent()),
                                            (i = T.parse(r)),
                                            (o =
                                                i && i.length > 0
                                                    ? C.parseFromSparqlRecord(i[0])
                                                    : void 0) &&
                                                o.iri === t.iri &&
                                                this.setState({ currentTerm: o }),
                                            [3, 4]
                                        );
                                    case 3:
                                        return (a = n.sent()), console.log(a), [3, 4];
                                    case 4:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (t.prototype.UNSAFE_componentWillReceiveProps = function (e) {
                        var t = this.getUri(e);
                        (this.state.currentTerm ? this.state.currentTerm.iri : void 0) !== t &&
                            (this.tempHierarchyPath &&
                                this.tempHierarchyPath[this.tempHierarchyPath.length - 1].iri !==
                                    t &&
                                (this.tempHierarchyPath = void 0),
                            this.setState({
                                currentTerm:
                                    this.getCurrentTermFromPath(this.tempHierarchyPath) ||
                                    this.getCurrentTermFromUri(t),
                                currentHierarchyPath: this.tempHierarchyPath
                            }));
                    }),
                    (t.prototype.getUri = function (e) {
                        return pe(e.location.search).uri || this.appConfig.startTerm || void 0;
                    }),
                    (t.prototype.getCurrentTermFromPath = function (e) {
                        if (e && e.length > 0) return e[e.length - 1];
                    }),
                    (t.prototype.getCurrentTermFromUri = function (e) {
                        if (e && e.length > 0) return { iri: e, name: "" };
                    }),
                    (t.prototype.render = function () {
                        return i.createElement(
                            i.Fragment,
                            null,
                            i.createElement(ce, { quicksearch: !0 }),
                            i.createElement(
                                "div",
                                { className: "container-fluid" },
                                i.createElement(
                                    w.a,
                                    { style: { flexWrap: "nowrap" } },
                                    i.createElement(
                                        Ce.a,
                                        {
                                            enable: {
                                                top: !1,
                                                right: !0,
                                                bottom: !1,
                                                left: !1,
                                                topRight: !1,
                                                bottomRight: !1,
                                                bottomLeft: !1,
                                                topLeft: !1
                                            },
                                            defaultSize: { width: "250px", height: "auto" },
                                            maxHeight: "75vh",
                                            className: "rounded border border-dark",
                                            style: {
                                                display: "flex",
                                                margin: "0.5em",
                                                marginLeft: "1em"
                                            }
                                        },
                                        i.createElement(Oe, {
                                            config: this.appConfig.hierarchies[0],
                                            currentTerm: this.state.currentTerm,
                                            onSelect: this.onTermSelected
                                        })
                                    ),
                                    i.createElement("div", { className: "clearfix visible-xs" }),
                                    i.createElement(
                                        "div",
                                        {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                flexGrow: 1,
                                                margin: "0.5em",
                                                marginRight: "1em"
                                            }
                                        },
                                        i.createElement(U, {
                                            config: this.appConfig.hierarchies[0],
                                            currentTerm: this.state.currentTerm,
                                            path: this.state.currentHierarchyPath,
                                            onSelect: this.onTermSelected
                                        }),
                                        i.createElement(Se, {
                                            config: this.appConfig.informationPane,
                                            currentTerm: this.state.currentTerm
                                        })
                                    )
                                )
                            )
                        );
                    }),
                    (t.PATHNAME = "/view"),
                    t
                );
            })(i.Component),
            qe = (function (e) {
                function t() {
                    return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                    Object(n.c)(t, e),
                    (t.prototype.render = function () {
                        return i.createElement(
                            v.a,
                            null,
                            i.createElement(
                                i.Fragment,
                                null,
                                i.createElement(
                                    E.d,
                                    null,
                                    i.createElement(E.b, {
                                        exact: !0,
                                        path: "/about",
                                        component: x
                                    }),
                                    i.createElement(E.b, {
                                        exact: !0,
                                        path: "/view",
                                        component: je
                                    }),
                                    i.createElement(E.b, {
                                        exact: !0,
                                        path: "/view/:uri",
                                        component: je
                                    }),
                                    i.createElement(E.b, {
                                        exact: !0,
                                        path: "/search",
                                        component: de
                                    }),
                                    i.createElement(E.a, { from: "/", to: "/view" })
                                )
                            )
                        );
                    }),
                    t
                );
            })(i.Component),
            Pe = function (e) {
                var t = e.error;
                return i.createElement(
                    "div",
                    { className: "container" },
                    i.createElement("br", null),
                    i.createElement("br", null),
                    i.createElement(K, { error: t })
                );
            };
        r(195);
        Object.assign(window, {
            app: {
                run: function () {
                    return Object(n.b)(this, void 0, void 0, function () {
                        var e, t, r, a, c, l;
                        return Object(n.d)(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    (e = document.getElementById("app-container") || document.body),
                                        (n.label = 1);
                                case 1:
                                    return (
                                        n.trys.push([1, 3, , 4]),
                                        (t = new m()),
                                        [4, (r = new h()).loadConfig(t)]
                                    );
                                case 2:
                                    return (
                                        (a = n.sent()),
                                        (c = new b(a.dataServiceOptions)),
                                        s(p, r),
                                        s(y, c),
                                        o.render(i.createElement(qe, null), e),
                                        [3, 4]
                                    );
                                case 3:
                                    throw (
                                        ((l = n.sent()),
                                        o.render(i.createElement(Pe, { error: l }), e),
                                        l)
                                    );
                                case 4:
                                    return [2];
                            }
                        });
                    });
                }
            }
        });
    },
    194: function (e, t, r) {
        (e.exports = r(25)(!1)).push([e.i, "", ""]);
    },
    195: function (e, t, r) {
        var n = r(194);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    196: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".hierarchy .tree-stub {\n  display: inline-block;\n  width: 12px;\n}\n.hierarchy a {\n  color: black;\n}\n.hierarchy td {\n  padding: 0px 5px;\n  border: none;\n}\n.hierarchy .text-item-icon {\n  margin-right: 6px;\n}\n.hierarchy .row-expander {\n  cursor: pointer;\n}\n.hierarchy .row-expander.is-expanded i {\n  transform: rotate(90deg);\n}\n.hierarchy .oi-chevron-right {\n  font-size: 10px;\n}\n",
            ""
        ]);
    },
    197: function (e, t, r) {
        var n = r(196);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    198: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".tab-relations .badge {\n  margin: 0px 0px 0px 5px;\n}\n.tab-relations .sparql-listing {\n  margin-top: 16px;\n}\n.tab-relations .sparql-listing-entry {\n  color: black;\n  border-top-left-radius: 0rem;\n  border-top-right-radius: 0rem;\n}\n.tab-relations .sparql-listing-entry a {\n  color: black;\n}\n.tab-relations .sparql-listing-group {\n  border-bottom-width: 0px;\n  /* Possible improvement: Inherit or reuse the CSS below from the bootstrap classes indicated */\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n  background-color: #868e96 !important;\n  color: #fff !important;\n}\n.tab-relations .sparql-listing-group a {\n  color: white;\n}\n.tab-relations .list-group-item:first-child {\n  border-top-width: 0px;\n}\n",
            ""
        ]);
    },
    199: function (e, t, r) {
        var n = r(198);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    200: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".tab-instances .badge {\n  margin: 0px 0px 0px 5px;\n}\n.tab-instances .sparql-listing {\n  margin-top: 20px;\n}\n.tab-instances .sparql-listing-entry {\n  color: black;\n  border-top-left-radius: 0rem;\n  border-top-right-radius: 0rem;\n}\n.tab-instances .sparql-listing-entry a {\n  color: black;\n}\n.tab-instances .sparql-listing-group {\n  border-bottom-width: 0px;\n  /* Possible improvement: Inherit or reuse the CSS below from the bootstrap classes indicated */\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n  background-color: #868e96 !important;\n  color: #fff !important;\n}\n.tab-instances .sparql-listing-group a {\n  color: white;\n}\n.tab-instances .list-group-item:first-child {\n  border-top-width: 0px;\n}\n",
            ""
        ]);
    },
    201: function (e, t, r) {
        var n = r(200);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    202: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".tab-info .badge {\n  margin: 0px 0px 0px 5px;\n}\n.tab-info .sparql-listing-group {\n  font-size: larger;\n}\n.tab-info .iri {\n  word-wrap: break-word;\n  font-size: 75%;\n}\n",
            ""
        ]);
    },
    203: function (e, t, r) {
        var n = r(202);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    204: function (e, t, r) {
        (e.exports = r(25)(!1)).push([e.i, ".tab-map {\n  min-height: 50vh;\n}\n", ""]);
    },
    205: function (e, t, r) {
        var n = r(204);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    206: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            '.mapboxStyleMenu {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  column-gap: 0.3em;\n  justify-content: left;\n  font-family: "Roboto Condensed", sans-serif;\n  font-size: 12px;\n  margin: 10px 0px 0 10px;\n  padding: 3px;\n  background: rgba(255, 255, 255, 0.8);\n  z-index: 2;\n}\n.mapboxStyleMenu > label {\n  display: contents;\n}\n.mapboxMap {\n  min-height: 50vh;\n}\n.mapboxPopup-divInfo {\n  float: left;\n  padding-right: 0.5em;\n}\n.mapboxPopup-divContent {\n  float: right;\n  padding-left: 0.5em;\n  border-left: 1px solid lightgrey;\n}\n',
            ""
        ]);
    },
    207: function (e, t, r) {
        var n = r(206);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    211: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".search-results-group {\n  margin: 1rem 0;\n}\n.search-results-header {\n  background-color: #868e96;\n  font-style: italic;\n  font-size: 0.875rem;\n  color: white;\n  padding: 0.5rem;\n}\n.search-results-header a {\n  color: white;\n}\n.search-results-header :hover {\n  background-color: inherit;\n}\n.search-results-subheader {\n  background-color: #e9ecef;\n  padding: 0.05rem 0.25rem;\n}\n.search-results-subheader-details {\n  font-size: smaller;\n  font-style: italic;\n  color: darkgray;\n  margin-left: 10px;\n}\n.search-results-entry {\n  padding: 0.25rem;\n}\n.search-results-entry:hover {\n  background-color: #f8f9fa;\n}\n.search-results-entry-details {\n  margin-left: 10px;\n  opacity: 0.5;\n}\n.search-tip {\n  font-size: smaller;\n}\n",
            ""
        ]);
    },
    212: function (e, t, r) {
        var n = r(211);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    213: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".subtitle {\n  padding: 1px 8px 8px 8px;\n  font-size: 12px;\n}\n",
            ""
        ]);
    },
    214: function (e, t, r) {
        var n = r(213);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    215: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".search-component .dropdown-menu {\n  max-height: 80vh;\n  overflow: auto;\n}\n.search-component .invisible-dropdown-toggler {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 0;\n}\n.search-component .dropdown-menu-right {\n  position: absolute !important;\n  will-change: unset !important;\n  transform: none !important;\n  top: 100% !important;\n  right: 0 !important;\n  left: auto !important;\n}\n.search-component .dropdown-divider {\n  margin: 0.5rem 0 0 0.5rem;\n}\n.search-component .dropdown-header-group {\n  background-color: #868e96;\n  font-style: italic;\n  color: white;\n  padding: 0.4rem 0 0.4rem 0rem;\n}\n.search-component .dropdown-header-group a {\n  color: white;\n}\n.search-component .dropdown-header-group :hover {\n  background-color: inherit;\n}\n.search-component .search-result-item-details {\n  margin-left: 10px;\n  opacity: 0.5;\n}\n.search-component .search-result-subheader {\n  background-color: #e9ecef;\n  padding: 0.05rem 1.5rem;\n}\n.search-component .search-result-subheader-details {\n  font-size: smaller;\n  font-style: italic;\n  color: darkgray;\n  margin-left: 10px;\n}\n",
            ""
        ]);
    },
    216: function (e, t, r) {
        var n = r(215);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    218: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".tab-attributes .badge {\n  margin: 0px 0px 0px 5px;\n}\n.tab-attributes .sparql-listing {\n  margin-top: 16px;\n}\n.tab-attributes .sparql-listing-entry {\n  color: black;\n}\n.tab-attributes .sparql-listing-entry a {\n  color: black;\n}\n",
            ""
        ]);
    },
    219: function (e, t, r) {
        var n = r(218);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    220: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            ".spinner-listing {\n  margin-top: 15px;\n}\n.sparql-listing-entries {\n  -webkit-padding-start: 0px;\n}\n.sparql-listing-group .badge {\n  color: black;\n  background-color: white;\n}\n.sparql-listing-entries .badge {\n  color: white;\n  background-color: #868e96;\n}\n.sparql-listing .text-item-icon {\n  margin-right: 4px;\n}\n.sparql-listing .text-item-icon.flag-icon {\n  margin-right: 8px;\n}\n",
            ""
        ]);
    },
    221: function (e, t, r) {
        var n = r(220);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    223: function (e, t, r) {
        (e.exports = r(25)(!1)).push([
            e.i,
            'ol.breadcrumb {\n  font-size: 12px;\n  background-color: #ffffff !important;\n  border: 1px solid rgba(0, 0, 0, 0.125) !important;\n}\n.breadcrumb-item a {\n  color: black;\n}\n.breadcrumb-item .text-item-icon {\n  margin-right: 2px;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  content: ">";\n}\n',
            ""
        ]);
    },
    224: function (e, t, r) {
        var n = r(223);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var i = { hmr: !0, transform: void 0, insertInto: void 0 };
        r(24)(n, i);
        n.locals && (e.exports = n.locals);
    },
    262: function (e) {
        e.exports = {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "OTL Viewer app config schema",
            type: "object",
            properties: {
                dataServiceOptions: {
                    description: "SPARQL endpoint access options",
                    type: "object",
                    properties: {
                        url: { description: "Url of endpoint", type: "string" },
                        mode: { enum: ["get", "post"] },
                        auth: { enum: ["basic", "laces", null] },
                        username: { type: "string" },
                        password: { type: "string" }
                    },
                    required: ["url", "mode", "auth"]
                },
                queryTerm: {
                    description: "SPARQL query to load the selected term.",
                    type: "string",
                    queryParameters: {
                        input: { term_iri: "The IRI of the term" },
                        output: {
                            entry_text: "The preferred name to display for the term",
                            entry_iri: "The IRI of the term",
                            entry_icon:
                                "The icon associated with the term, provided in the form of a class name that can be styled through CSS (optional)"
                        }
                    }
                },
                hierarchies: {
                    description:
                        "Array of hierarchy configurations. Each hierarchy represent a tree to browse, driven by SPARQL queries",
                    type: "array",
                    minItems: 1,
                    items: {
                        properties: {
                            id: {
                                description: "Hierarchy identifier; must be unique",
                                type: "string"
                            },
                            name: { description: "Name of the hierarchy", type: "string" },
                            icon: {
                                description: "Icon representing the hierarchy",
                                type: "string"
                            },
                            queryRoots: {
                                description: "SPARQL query to load root nodes",
                                type: "string",
                                queryParameters: {
                                    output: {
                                        entry_text:
                                            "The preferred name to display for the root term",
                                        entry_iri: "The IRI of the root term",
                                        entry_icon:
                                            "The icon associated with the root term, provided in the form of a class name that can be styled through CSS (optional)",
                                        entry_childCount:
                                            "The number of children the root term has in the hierarchy"
                                    }
                                }
                            },
                            queryChildren: {
                                description: "SPARQL query to load children nodes",
                                type: "string",
                                queryParameters: {
                                    input: { term_iri: "The IRI of the parent term" },
                                    output: {
                                        entry_text:
                                            "The preferred name to display for the child term",
                                        entry_iri: "The IRI of the child term",
                                        entry_icon:
                                            "The icon associated with the child term, provided in the form of a class name that can be styled through CSS (optional)",
                                        entry_childCount:
                                            "The number of children the child term has in the hierarchy"
                                    }
                                }
                            },
                            queryBreadcrumbs: {
                                description:
                                    "SPARQL query to obtain breadcrumb terms towards the input term; the breadcrumb terms should be returned in the order they are found in the hierarchy (i.e., starting with the root term)",
                                type: "string",
                                queryParameters: {
                                    input: { term_iri: "The IRI of the term" },
                                    output: {
                                        entry_text:
                                            "The preferred name to display for the breadcrumb term",
                                        entry_iri: "The IRI of the breadcrumb term",
                                        entry_icon:
                                            "The icon associated with the breadcrumb term, provided in the form of a class name that can be styled through CSS (optional)"
                                    }
                                }
                            }
                        }
                    },
                    required: ["id", "name", "queryRoots", "queryChildren", "queryBreadcrumbs"]
                },
                informationPane: {
                    description: "Configuration for the information pane and its tabs",
                    type: "object",
                    properties: {
                        tabs: {
                            description:
                                "Array of tab configurations. Each tab represent a UI section driven by a SPARQL query",
                            type: "array",
                            minItems: 1,
                            items: {
                                properties: {
                                    type: {
                                        description: "The type of tab.",
                                        enum: [
                                            "info",
                                            "attributes",
                                            "relations",
                                            "instances",
                                            "map"
                                        ]
                                    },
                                    id: {
                                        description: "Tab identifier; must be unique",
                                        type: "string"
                                    },
                                    name: {
                                        description:
                                            "Sets the text which will be displayed on the UI as tab header",
                                        type: "string"
                                    },
                                    icon: {
                                        description: "Icon representing the tab",
                                        type: "string"
                                    },
                                    query: {
                                        description: "SPARQL query to load data for this tab",
                                        type: "string",
                                        queryParameters: {
                                            input: { term_iri: "The IRI of the term" },
                                            output: {
                                                entry_text:
                                                    "The preferred name to display for the item listed",
                                                entry_iri: "The IRI of the item listed (optional)",
                                                entry_icon:
                                                    "The icon associated with the item listed, provided in the form of a class name that can be styled through CSS (optional)",
                                                entry_badge:
                                                    "The badge of the item listed; typically a string representing cardinality for attributes and relations (optional)",
                                                group_text:
                                                    "The preferred header name for grouping the current entry item (optional)",
                                                group_iri: "The IRI of the header (optional)",
                                                group_icon:
                                                    "The icon associated with the header, provided in the form of a class name that can be styled through CSS (optional)",
                                                group_badge: "The badge of the header (optional)"
                                            }
                                        }
                                    },
                                    object: {
                                        description:
                                            "Tab-specific data. In the case of a 'map' type tab using Mapbox, this object should adhere to the structure specified for the 'options' of the Map object (see here: https://docs.mapbox.com/mapbox-gl-js/api/map/), including a valid accessToken.",
                                        type: "object"
                                    },
                                    hideIfEmpty: {
                                        description: "Hide tab if data is empty",
                                        type: "boolean",
                                        default: !0
                                    }
                                },
                                required: ["type", "id", "name", "query"]
                            }
                        }
                    },
                    required: ["tabs"]
                }
            },
            startTerm: {
                description: "URI of the term that the app will navigate to by default",
                type: "string"
            },
            queryOTL: {
                description: "SPARQL query to load the application version and title",
                type: "string",
                queryParameters: {
                    output: {
                        text: "The preferred name to display for the OTL",
                        iri: "The IRI of the OTL (optional)",
                        version: "The version number of the OTL (optional)"
                    }
                }
            },
            subtitleHTML: {
                description:
                    "HTML content which will be shown under the application version and title",
                type: "string"
            },
            querySearch: {
                description: "SPARQL query to perform search",
                type: "string",
                queryParameters: {
                    input: { searchKey: "The text to use in searching for a term" },
                    output: {
                        entry_text: "The preferred name to display for the search hit listed",
                        entry_iri: "The IRI of the search hit listed",
                        group_text: "The preferred header name for grouping the current item"
                    }
                }
            },
            required: [
                "dataServiceOptions",
                "queryTerm",
                "hierarchies",
                "informationPane",
                "queryOTL",
                "querySearch"
            ]
        };
    }
});
