(() => {
    "use strict";
    var t = {
            142: (t, e, i) => {
                var n,
                    o = i(169),
                    r = i(558),
                    s = i(284),
                    a = i(632),
                    l = i(713),
                    u = window.innerWidth,
                    h = ((n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? u / 44 : u / 25), Math.round(n));
                h < 10 ? (h = 10) : h > 100 && (h = 100), (document.getElementById("width-slider").value = String(h)), (document.getElementById("width-text").innerText = String(h));
                var d = { left: 20, right: 20, top: document.getElementById("topbar").clientHeight + document.getElementById("info-margin").clientHeight + 5, bottom: 0 },
                    c = new o.default(h, d, { grid: document.getElementById("grid"), bg: document.getElementById("bg"), svg: document.getElementById("svg") }),
                    p = new r.default({
                        dijkstraButton: document.getElementById("dijkstra"),
                        aStarButton: document.getElementById("a*"),
                        bfsButton: document.getElementById("bfs"),
                        dfsButton: document.getElementById("dfs"),
                        bestFirstButton: document.getElementById("best-first"),
                        algorithmText: document.getElementById("alg-drop-down-text"),
                        manhattanRadio: document.getElementById("manhattan"),
                        euclideanRadio: document.getElementById("euclidean"),
                        chebyshevRadio: document.getElementById("chebyshev"),
                        octileRadio: document.getElementById("octile"),
                        diagonalsCheckBox: document.getElementById("diagonals-checkbox"),
                        bidirectionalCheckBox: document.getElementById("bidirectional-checkbox"),
                        visualizeCheckBox: document.getElementById("alg-visual-checkbox"),
                        speedSlider: document.getElementById("speed-slider"),
                        speedText: document.getElementById("speed-text"),
                    }),
                    g = new a.default({
                        openButton: document.getElementById("settings-button"),
                        closeButton: document.getElementById("x-button"),
                        draggable: document.getElementById("draggable"),
                        draggableContent: document.getElementById("draggable-content"),
                        draggableContainer: document.getElementById("draggable-container"),
                    }),
                    f = new s.default(c, p, {
                        visualizeButton: document.getElementById("go-button"),
                        mazeButton: document.getElementById("maze-button"),
                        timeText: document.getElementById("time"),
                        lengthText: document.getElementById("len"),
                    });
                l.bindDropDown(),
                    p.bindButtons(),
                    p.bindSettings(),
                    p.bindSlider(),
                    f.bindVisualizeButton(),
                    f.bindMazeButton(),
                    g.bindDrag(),
                    c.setOnTileDragged(function () {
                        c.isVisualize() && (c.clearVisualization(), f.doPathfinding());
                    }),
                    (document.getElementById("clr-tiles").onclick = function () {
                        f.resetGeneration(), f.resetVisual(), c.clear(), c.setVisualize(!1);
                    }),
                    (document.getElementById("clr-path").onclick = function () {
                        f.isGenerating() || f.resetVisual(), c.clearVisualization(), c.setVisualize(!1);
                    });
                var y = document.getElementById("width-slider"),
                    v = y.value;
                (y.oninput = function () {
                    (v = y.value), (document.getElementById("width-text").innerText = v);
                }),
                    (y.onchange = function () {
                        f.resetGeneration(), f.resetVisual(), c.resize(Number.parseInt(v));
                    });
            },
            654: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(603),
                    s = i(29),
                    a = i(425),
                    l = i(628),
                    u = i(118),
                    h = (function (t) {
                        function e(e, i) {
                            var n = t.call(this, e) || this;
                            return (
                                (n.heuristic = function (t, e) {
                                    return u.euclidean(t, e);
                                }),
                                null != i && (n.heuristic = i),
                                n
                            );
                        }
                        return (
                            o(e, t),
                            (e.prototype.findPath = function (t, e) {
                                this.clearRecentSearch();
                                var i = this.navigator.getGrid(),
                                    n = new s.default(function (t, e) {
                                        return t.f() < e.f();
                                    }),
                                    o = new r.HashTable(),
                                    u = new l.AStarNode(i.get(t), 0, 0);
                                for (n.push(u), o.add(r.stringify(t), u.f()); !n.isEmpty(); ) {
                                    var h = n.pop();
                                    this.addRecent(h);
                                    var d = h.tile.point;
                                    if (this.navigator.equals(d, e)) return a.reconstructPath(h);
                                    for (var c = 0, p = this.navigator.neighbors(d); c < p.length; c++) {
                                        var g = p[c],
                                            f = g.point,
                                            y = r.stringify(f),
                                            v = h.g + this.stepCost(d, f),
                                            m = v + this.heuristic(f, e);
                                        if (!o.has(y) || m < o.get(y)) {
                                            var b = new l.AStarNode(g, v, m);
                                            h.addChild(b), n.push(b), o.add(y, b.f());
                                        }
                                    }
                                }
                                return [];
                            }),
                            (e.prototype.stepCost = function (t, e) {
                                return this.navigator.cost(t, e);
                            }),
                            e
                        );
                    })(a.default);
                e.default = h;
            },
            73: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(425),
                    s = i(603),
                    a = i(628),
                    l = (function (t) {
                        function e(e) {
                            return t.call(this, e) || this;
                        }
                        return (
                            o(e, t),
                            (e.prototype.findPath = function (t, e) {
                                this.clearRecentSearch();
                                var i = this.navigator.getGrid(),
                                    n = [],
                                    o = new s.HashSet(),
                                    l = new a.Node(i.get(t));
                                for (n.push(l), o.add(s.stringify(t)); 0 !== n.length; ) {
                                    var u = n.shift();
                                    this.addRecent(u);
                                    var h = u.tile.point;
                                    if (this.navigator.equals(h, e)) return r.reconstructPath(u);
                                    for (var d = 0, c = this.navigator.neighbors(h); d < c.length; d++) {
                                        var p = c[d],
                                            g = s.stringify(p.point);
                                        if (!o.has(g)) {
                                            var f = new a.Node(p);
                                            u.addChild(f), n.push(f), o.add(g);
                                        }
                                    }
                                }
                                return [];
                            }),
                            e
                        );
                    })(r.default);
                e.default = l;
            },
            314: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(603),
                    s = i(29),
                    a = i(425),
                    l = i(628),
                    u = i(118),
                    h = (function (t) {
                        function e(e, i) {
                            var n = t.call(this, e) || this;
                            return (
                                (n.heuristic = function (t, e) {
                                    return u.euclidean(t, e);
                                }),
                                null != i && (n.heuristic = i),
                                n
                            );
                        }
                        return (
                            o(e, t),
                            (e.prototype.findPath = function (t, e) {
                                this.clearRecentSearch();
                                var i = this.navigator.getGrid(),
                                    n = new s.default(function (t, e) {
                                        return t.f() < e.f();
                                    }),
                                    o = new r.HashTable(),
                                    u = new s.default(function (t, e) {
                                        return t.f() < e.f();
                                    }),
                                    h = new r.HashTable(),
                                    d = new l.AStarNode(i.get(t), 0, 0);
                                n.push(d), o.add(r.stringify(t), d);
                                var c = new l.AStarNode(i.get(e), 0, 0);
                                for (u.push(c), h.add(r.stringify(e), c); !n.isEmpty() && !u.isEmpty(); ) {
                                    var p = n.pop();
                                    this.addRecent(p);
                                    var g = p.tile.point,
                                        f = r.stringify(g);
                                    if (h.has(f))
                                        return null != p.parent
                                            ? a
                                                  .reconstructPath(p.parent)
                                                  .concat(a.reconstructPathReversed(h.get(f)))
                                                  .concat(i.get(e))
                                            : [i.get(e)];
                                    for (var y = 0, v = this.navigator.neighbors(g); y < v.length; y++) {
                                        var m = (B = v[y]).point,
                                            b = r.stringify(m),
                                            T = (P = p.g + this.stepCost(g, m)) + this.heuristic(m, e);
                                        if (!o.has(b) || T < o.get(b).f()) {
                                            var w = new l.AStarNode(B, P, T);
                                            p.addChild(w), n.push(w), o.add(b, w);
                                        }
                                    }
                                    var I = u.pop();
                                    this.addRecent(I);
                                    var x = I.tile.point,
                                        _ = r.stringify(x);
                                    if (o.has(_)) return null != I.parent ? a.reconstructPath(o.get(_)).concat(a.reconstructPathReversed(I.parent)).concat(i.get(e)) : [i.get(e)];
                                    for (var E = 0, S = this.navigator.neighbors(x); E < S.length; E++) {
                                        var B, P;
                                        (m = (B = S[E]).point),
                                            (b = r.stringify(m)),
                                            (T = (P = I.g + this.stepCost(x, m)) + this.heuristic(m, t)),
                                            (!h.has(b) || T < h.get(b).f()) && ((w = new l.AStarNode(B, P, T)), I.addChild(w), u.push(w), h.add(b, w));
                                    }
                                }
                                return [];
                            }),
                            (e.prototype.stepCost = function (t, e) {
                                return this.navigator.cost(t, e);
                            }),
                            e
                        );
                    })(a.default);
                e.default = h;
            },
            867: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(425),
                    s = i(603),
                    a = i(628),
                    l = (function (t) {
                        function e(e) {
                            return t.call(this, e) || this;
                        }
                        return (
                            o(e, t),
                            (e.prototype.findPath = function (t, e) {
                                this.clearRecentSearch();
                                var i = this.navigator.getGrid(),
                                    n = new s.HashTable(),
                                    o = new s.HashTable(),
                                    l = [],
                                    u = [],
                                    h = new a.Node(i.get(t));
                                l.push(h), n.add(s.stringify(t), h);
                                var d = new a.Node(i.get(e));
                                for (u.push(d), o.add(s.stringify(e), d); 0 !== l.length && 0 !== u.length; ) {
                                    var c = l.shift();
                                    this.addRecent(c);
                                    var p = c.tile.point,
                                        g = s.stringify(p);
                                    if (o.has(g))
                                        return null != c.parent
                                            ? r
                                                  .reconstructPath(c.parent)
                                                  .concat(r.reconstructPathReversed(o.get(g)))
                                                  .concat(i.get(e))
                                            : [i.get(e)];
                                    for (var f = 0, y = this.navigator.neighbors(p); f < y.length; f++) {
                                        var v = y[f],
                                            m = s.stringify(v.point);
                                        if (!n.has(m)) {
                                            var b = new a.Node(v);
                                            c.addChild(b), l.push(b), n.add(m, b);
                                        }
                                    }
                                    var T = u.shift();
                                    this.addRecent(T);
                                    var w = T.tile.point,
                                        I = s.stringify(w);
                                    if (n.has(I)) return null != T.parent ? r.reconstructPath(n.get(I)).concat(r.reconstructPathReversed(T.parent)).concat(i.get(e)) : [i.get(e)];
                                    for (var x = 0, _ = this.navigator.neighbors(w); x < _.length; x++) (v = _[x]), (m = s.stringify(v.point)), o.has(m) || ((b = new a.Node(v)), T.addChild(b), u.push(b), o.add(m, b));
                                }
                                return [];
                            }),
                            e
                        );
                    })(r.default);
                e.default = l;
            },
            514: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(425),
                    s = i(603),
                    a = i(628),
                    l = i(90),
                    u = (function (t) {
                        function e() {
                            return (null !== t && t.apply(this, arguments)) || this;
                        }
                        return (
                            o(e, t),
                            (e.prototype.findPath = function (t, e) {
                                this.clearRecentSearch();
                                var i = this.navigator.getGrid(),
                                    n = new a.Node(i.get(t)),
                                    o = new l.default();
                                o.push(n);
                                var u = new s.HashSet();
                                for (u.add(s.stringify(t)); !o.isEmpty(); ) {
                                    var h = o.pop();
                                    this.addRecent(h);
                                    var d = h.tile.point;
                                    if (this.navigator.equals(d, e)) return r.reconstructPath(h);
                                    for (var c = 0, p = this.navigator.neighbors(d).reverse(); c < p.length; c++) {
                                        var g = p[c],
                                            f = s.stringify(g.point);
                                        if (!u.has(f)) {
                                            var y = new a.Node(g);
                                            h.addChild(y), o.push(y), u.add(f);
                                        }
                                    }
                                }
                                return [];
                            }),
                            e
                        );
                    })(r.default);
                e.default = u;
            },
            118: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.nullHeuristic = e.chebyshev = e.octile = e.euclidean = e.manhattan = void 0),
                    (e.manhattan = function (t, e) {
                        return Math.abs(t.x - e.x) + Math.abs(t.y - e.y);
                    }),
                    (e.euclidean = function (t, e) {
                        var i = Math.abs(t.x - e.x),
                            n = Math.abs(t.y - e.y);
                        return Math.sqrt(i * i + n * n);
                    }),
                    (e.octile = function (t, e) {
                        var i = Math.abs(t.x - e.x),
                            n = Math.abs(t.y - e.y);
                        return Math.SQRT2 * Math.min(i, n) + Math.abs(i - n);
                    }),
                    (e.chebyshev = function (t, e) {
                        var i = Math.abs(t.x - e.x),
                            n = Math.abs(t.y - e.y);
                        return Math.max(i, n);
                    }),
                    (e.nullHeuristic = function (t, e) {
                        return 0;
                    });
            },
            279: (t, e, i) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var n = i(271),
                    o = (function () {
                        function t(t, e) {
                            (this.onDraw = function (t) {}), (this.grid = t), null != e && (this.onDraw = e);
                        }
                        return (
                            (t.prototype.generateMaze = function () {
                                this.fillEmpty();
                                for (var t = 0; t < this.grid.getWidth(); t++) this.draw({ point: { x: t, y: 0 }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                for (var e = 0; e < this.grid.getHeight(); e++) this.draw({ point: { x: this.grid.getWidth() - 1, y: e }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                for (t = this.grid.getWidth() - 1; t >= 0; t--) this.draw({ point: { x: t, y: this.grid.getHeight() - 1 }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                for (e = this.grid.getHeight() - 1; e >= 0; e--) this.draw({ point: { x: 0, y: e }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                this.divide({ topLeft: { x: 1, y: 1 }, bottomRight: { x: this.grid.getWidth() - 2, y: this.grid.getHeight() - 2 } });
                            }),
                            (t.prototype.drawArr = function (t) {
                                for (var e = 0, i = t; e < i.length; e++) {
                                    var n = i[e];
                                    this.draw(n);
                                }
                            }),
                            (t.prototype.draw = function (t) {
                                this.grid.mutateTile(t), this.onDraw(t);
                            }),
                            (t.prototype.divide = function (t) {
                                var e = (function (t) {
                                        return t.bottomRight.x - t.topLeft.x + 1;
                                    })(t),
                                    i = (function (t) {
                                        return t.bottomRight.y - t.topLeft.y + 1;
                                    })(t),
                                    o = t.topLeft,
                                    a = t.bottomRight;
                                if (
                                    (function (t, e) {
                                        return t >= e;
                                    })(e, i)
                                ) {
                                    if (e > 2) {
                                        for (var l = s(o.y, a.y), u = r(o.x, a.x), h = [], d = o.y; d <= a.y; d++) h.push({ point: { x: u, y: d }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                        var c = !1;
                                        this.grid.get({ x: u, y: o.y - 1 }).data.isSolid || (h.push({ point: { x: u, y: o.y }, data: n.TILE_CREATOR[n.TileType.Empty]() }), (c = !0)),
                                            this.grid.get({ x: u, y: a.y + 1 }).data.isSolid || (h.push({ point: { x: u, y: a.y }, data: n.TILE_CREATOR[n.TileType.Empty]() }), (c = !0)),
                                            c || h.push({ point: { x: u, y: l }, data: n.TILE_CREATOR[n.TileType.Empty]() }),
                                            this.drawArr(h);
                                        var p = { topLeft: t.topLeft, bottomRight: { x: u - 1, y: t.bottomRight.y } },
                                            g = { topLeft: { x: u + 1, y: t.topLeft.y }, bottomRight: t.bottomRight };
                                        this.divide(p), this.divide(g);
                                    }
                                } else if (i > 2) {
                                    (u = s(o.x, a.x)), (l = r(o.y, a.y)), (h = []);
                                    for (var f = o.x; f <= a.x; f++) h.push({ point: { x: f, y: l }, data: n.TILE_CREATOR[n.TileType.Solid]() });
                                    (c = !1),
                                        this.grid.get({ x: o.x - 1, y: l }).data.isSolid || (h.push({ point: { x: o.x, y: l }, data: n.TILE_CREATOR[n.TileType.Empty]() }), (c = !0)),
                                        this.grid.get({ x: a.x + 1, y: l }).data.isSolid || (h.push({ point: { x: a.x, y: l }, data: n.TILE_CREATOR[n.TileType.Empty]() }), (c = !0)),
                                        c || h.push({ point: { x: u, y: l }, data: n.TILE_CREATOR[n.TileType.Empty]() }),
                                        this.drawArr(h);
                                    var y = { topLeft: t.topLeft, bottomRight: { x: t.bottomRight.x, y: l - 1 } },
                                        v = { topLeft: { x: t.topLeft.x, y: l + 1 }, bottomRight: t.bottomRight };
                                    this.divide(y), this.divide(v);
                                }
                            }),
                            (t.prototype.fillEmpty = function () {
                                for (var t = 0; t < this.grid.getWidth(); t++) for (var e = 0; e < this.grid.getHeight(); e++) this.grid.mutateTile({ point: { x: t, y: e }, data: n.TILE_CREATOR[n.TileType.Empty]() });
                            }),
                            t
                        );
                    })();
                function r(t, e) {
                    var i = e - t;
                    if (i >= 20) return ((t + e) / 2) >> 0;
                    if (i > 5) {
                        var n = ((t + e) / 2) >> 0,
                            o = [n, n + 1];
                        return o[s(0, o.length - 1)];
                    }
                    return s(t + 1, e - 1);
                }
                function s(t, e) {
                    return Math.floor(Math.random() * (e + 1 - t) + t);
                }
                e.default = o;
            },
            628: function (t, e) {
                var i,
                    n =
                        (this && this.__extends) ||
                        ((i = function (t, e) {
                            return (i =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            i(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.AStarNode = e.Node = void 0);
                var o = (function () {
                    function t(t) {
                        (this.parent = null), (this.children = []), (this.tile = t);
                    }
                    return (
                        (t.prototype.addChild = function (t) {
                            (t.parent = this), this.children.push(t);
                        }),
                        t
                    );
                })();
                e.Node = o;
                var r = (function (t) {
                    function e(e, i, n) {
                        var o = t.call(this, e) || this;
                        return (o.g = i), (o.fScore = n), o;
                    }
                    return (
                        n(e, t),
                        (e.prototype.f = function () {
                            return this.fScore;
                        }),
                        e
                    );
                })(o);
                e.AStarNode = r;
            },
            425: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.reconstructPathReversed = e.reconstructPath = void 0);
                var i = (function () {
                    function t(t) {
                        (this.recentSearch = []), (this.navigator = t);
                    }
                    return (
                        (t.prototype.setNavigator = function (t) {
                            this.navigator = t;
                        }),
                        (t.prototype.getNavigator = function () {
                            return this.navigator;
                        }),
                        (t.prototype.getRecentNodes = function () {
                            return this.recentSearch.length;
                        }),
                        (t.prototype.clearRecentSearch = function () {
                            this.recentSearch = [];
                        }),
                        (t.prototype.addRecent = function (t) {
                            this.recentSearch.push(t);
                        }),
                        (t.prototype.reconstructSolution = function (t) {
                            for (var e = 0, i = this.recentSearch; e < i.length; e++) t(i[e]);
                        }),
                        t
                    );
                })();
                function n(t) {
                    for (var e = []; null !== t.parent; ) e.push(t.tile), (t = t.parent);
                    return e;
                }
                (e.reconstructPath = function (t) {
                    return n(t).reverse();
                }),
                    (e.reconstructPathReversed = n),
                    (e.default = i);
            },
            961: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(910),
                    s = i(826),
                    a = i(118),
                    l = i(654),
                    u = i(73),
                    h = i(514),
                    d = i(314),
                    c = i(867),
                    p = {
                        plus: function (t) {
                            return new r.default(t);
                        },
                        asterisk: function (t) {
                            return new s.default(t);
                        },
                    },
                    g = {
                        manhattan: function () {
                            return function (t, e) {
                                return a.manhattan(t, e);
                            };
                        },
                        euclidean: function () {
                            return function (t, e) {
                                return a.euclidean(t, e);
                            };
                        },
                        chebyshev: function () {
                            return function (t, e) {
                                return a.chebyshev(t, e);
                            };
                        },
                        octile: function () {
                            return function (t, e) {
                                return a.octile(t, e);
                            };
                        },
                        null: function () {
                            return function (t, e) {
                                return a.nullHeuristic(t, e);
                            };
                        },
                    },
                    f = {
                        dijkstra: function (t) {
                            return new l.default(t, function (t, e) {
                                return a.nullHeuristic(t, e);
                            });
                        },
                        "best-first": function (t, e) {
                            return new ((function (t) {
                                function e() {
                                    return (null !== t && t.apply(this, arguments)) || this;
                                }
                                return (
                                    o(e, t),
                                    (e.prototype.stepCost = function (t, e) {
                                        return 0;
                                    }),
                                    e
                                );
                            })(l.default))(t, e);
                        },
                        "a*": function (t, e) {
                            return new l.default(t, e);
                        },
                        bfs: function (t) {
                            return new u.default(t);
                        },
                        dfs: function (t) {
                            return new h.default(t);
                        },
                        "bi-a*": function (t, e) {
                            return new d.default(t, e);
                        },
                        "bi-dijkstra": function (t) {
                            return new d.default(t, function (t, e) {
                                return a.nullHeuristic(t, e);
                            });
                        },
                        "bi-bfs": function (t) {
                            return new c.default(t);
                        },
                    },
                    y = (function () {
                        function t() {}
                        return (
                            (t.usesHeuristic = function (t) {
                                return "a*" == t || "bi-a*" == t || "best-first" == t;
                            }),
                            (t.hasBidirectional = function (t) {
                                return null != f["bi-" + t];
                            }),
                            (t.getBidirectional = function (t) {
                                return "bi-" + t;
                            }),
                            (t.getInstance = function (t, e, i) {
                                var n = g[(null != i ? i : "null").toLowerCase()];
                                if (null == n) throw new Error("No such heuristic function exists");
                                var o = f[e.toLowerCase()];
                                if (null == o) throw new Error("No such algorithms algorithm exists");
                                return o(t, n());
                            }),
                            (t.getNavigator = function (t, e) {
                                var i = p[e.toLowerCase()];
                                if (null == i) throw new Error("No such navigator pattern exists");
                                return i(t);
                            }),
                            t
                        );
                    })();
                e.default = y;
            },
            826: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(881),
                    s = i(118),
                    a = (function (t) {
                        function e() {
                            return (null !== t && t.apply(this, arguments)) || this;
                        }
                        return (
                            o(e, t),
                            (e.prototype.neighbors = function (t) {
                                var e,
                                    i = !1,
                                    n = !1,
                                    o = !1,
                                    s = !1,
                                    a = [];
                                return (
                                    t.x + r.UNIT < this.grid.getWidth() && ((e = this.grid.get({ x: t.x + r.UNIT, y: t.y })).data.isSolid || (a.push(e), (i = !0), (n = !0))),
                                    t.y + r.UNIT < this.grid.getHeight() && ((e = this.grid.get({ x: t.x, y: t.y + r.UNIT })).data.isSolid || (a.push(e), (i = !0), (o = !0))),
                                    t.x - r.UNIT >= 0 && ((e = this.grid.get({ x: t.x - r.UNIT, y: t.y })).data.isSolid || (a.push(e), (o = !0), (s = !0))),
                                    t.y - r.UNIT >= 0 && ((e = this.grid.get({ x: t.x, y: t.y - r.UNIT })).data.isSolid || (a.push(e), (n = !0), (s = !0))),
                                    t.x + r.UNIT < this.grid.getWidth() && t.y + r.UNIT < this.grid.getHeight() && i && ((e = this.grid.get({ x: t.x + r.UNIT, y: t.y + r.UNIT })).data.isSolid || a.push(e)),
                                    t.x - r.UNIT >= 0 && t.y + r.UNIT < this.grid.getHeight() && o && ((e = this.grid.get({ x: t.x - r.UNIT, y: t.y + r.UNIT })).data.isSolid || a.push(e)),
                                    t.x + r.UNIT < this.grid.getWidth() && t.y - r.UNIT >= 0 && n && ((e = this.grid.get({ x: t.x + r.UNIT, y: t.y - r.UNIT })).data.isSolid || a.push(e)),
                                    t.x - r.UNIT >= 0 && t.y - r.UNIT >= 0 && s && ((e = this.grid.get({ x: t.x - r.UNIT, y: t.y - r.UNIT })).data.isSolid || a.push(e)),
                                    a
                                );
                            }),
                            (e.prototype.cost = function (t, e) {
                                return s.euclidean(t, e) * this.grid.get(e).data.pathCost;
                            }),
                            e
                        );
                    })(r.default);
                e.default = a;
            },
            271: (t, e) => {
                var i, n;
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.createTile = e.TILE_CREATOR = e.TileType = void 0),
                    (function (t) {
                        (t[(t.Empty = 0)] = "Empty"), (t[(t.Solid = 1)] = "Solid");
                    })((n = e.TileType || (e.TileType = {}))),
                    (e.TILE_CREATOR =
                        (((i = {})[n.Empty] = function () {
                            return { pathCost: 1, isSolid: !1 };
                        }),
                        (i[n.Solid] = function () {
                            return { pathCost: 1, isSolid: !0 };
                        }),
                        i)),
                    (e.createTile = function (t) {
                        return e.TILE_CREATOR[t]();
                    });
            },
            62: (t, e, i) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var n = i(271),
                    o = (function () {
                        function t(t, e, i) {
                            if (((this.width = t), (this.height = e), null == i))
                                this.tiles = (function (t, e) {
                                    for (var i = [], o = 0; o < e; o++) {
                                        for (var r = [], s = 0; s < t; s++) r.push({ point: { x: s, y: o }, data: n.TILE_CREATOR[n.TileType.Empty]() });
                                        i.push(r);
                                    }
                                    return i;
                                })(t, e);
                            else {
                                this.tiles = [];
                                for (var o = 0; o < e; o++) {
                                    for (var r = [], s = 0; s < t; s++) r.push({ data: { pathCost: i[o][s].data.pathCost, isSolid: i[o][s].data.isSolid }, point: { x: s, y: o } });
                                    this.tiles.push(r);
                                }
                            }
                        }
                        return (
                            (t.prototype.getWidth = function () {
                                return this.width;
                            }),
                            (t.prototype.getHeight = function () {
                                return this.height;
                            }),
                            (t.prototype.inBounds = function (t) {
                                return t.x >= 0 && t.x < this.width && t.y >= 0 && t.y < this.height;
                            }),
                            (t.prototype.get = function (t) {
                                return this.tiles[t.y][t.x];
                            }),
                            (t.prototype.mutate = function (t, e) {
                                this.tiles[t.y][t.x].data = e;
                            }),
                            (t.prototype.mutateTile = function (t) {
                                this.tiles[t.point.y][t.point.x].data = t.data;
                            }),
                            (t.prototype.output = function (t) {
                                for (var e = 0; e < this.height; e++) {
                                    for (var i = "", n = 0; n < this.width; n++) i += this.tiles[e][n].data.isSolid + ", ";
                                    t.log(i);
                                }
                            }),
                            (t.prototype.getJson = function () {
                                return JSON.stringify(this.tiles);
                            }),
                            (t.prototype.walkable = function (t) {
                                return !this.get(t).data.isSolid;
                            }),
                            t
                        );
                    })();
                e.default = o;
            },
            881: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.UNIT = void 0), (e.UNIT = 1);
                var i = (function () {
                    function t(t) {
                        this.grid = t;
                    }
                    return (
                        (t.prototype.getGrid = function () {
                            return this.grid;
                        }),
                        (t.prototype.equals = function (t, e) {
                            return t.x == e.x && t.y == e.y;
                        }),
                        t
                    );
                })();
                e.default = i;
            },
            910: function (t, e, i) {
                var n,
                    o =
                        (this && this.__extends) ||
                        ((n = function (t, e) {
                            return (n =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function (t, e) {
                                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                                })(t, e);
                        }),
                        function (t, e) {
                            function i() {
                                this.constructor = t;
                            }
                            n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
                        });
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = i(881),
                    s = (function (t) {
                        function e() {
                            return (null !== t && t.apply(this, arguments)) || this;
                        }
                        return (
                            o(e, t),
                            (e.prototype.neighbors = function (t) {
                                var e,
                                    i = [];
                                return (
                                    t.x + r.UNIT < this.grid.getWidth() && ((e = this.grid.get({ x: t.x + r.UNIT, y: t.y })).data.isSolid || i.push(e)),
                                    t.y + r.UNIT < this.grid.getHeight() && ((e = this.grid.get({ x: t.x, y: t.y + r.UNIT })).data.isSolid || i.push(e)),
                                    t.x - r.UNIT >= 0 && ((e = this.grid.get({ x: t.x - r.UNIT, y: t.y })).data.isSolid || i.push(e)),
                                    t.y - r.UNIT >= 0 && ((e = this.grid.get({ x: t.x, y: t.y - r.UNIT })).data.isSolid || i.push(e)),
                                    i
                                );
                            }),
                            (e.prototype.cost = function (t, e) {
                                return this.grid.get(e).data.pathCost;
                            }),
                            e
                        );
                    })(r.default);
                e.default = s;
            },
            603: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.stringify = e.HashTable = e.HashSet = void 0);
                var i = (function () {
                    function t() {
                        this.map = {};
                    }
                    return (
                        (t.prototype.add = function (t) {
                            this.map[t] = !0;
                        }),
                        (t.prototype.remove = function (t) {
                            this.map[t] = !1;
                        }),
                        (t.prototype.has = function (t) {
                            return this.map[t];
                        }),
                        (t.prototype.clear = function () {
                            this.map = {};
                        }),
                        t
                    );
                })();
                e.HashSet = i;
                var n = (function () {
                    function t() {
                        this.map = {};
                    }
                    return (
                        (t.prototype.add = function (t, e) {
                            this.map[t] = e;
                        }),
                        (t.prototype.remove = function (t) {
                            this.map[t] = void 0;
                        }),
                        (t.prototype.get = function (t) {
                            return this.map[t];
                        }),
                        (t.prototype.has = function (t) {
                            return null != this.map[t];
                        }),
                        (t.prototype.clear = function () {
                            this.map = {};
                        }),
                        t
                    );
                })();
                (e.HashTable = n),
                    (e.stringify = function (t) {
                        return "x" + t.x + "y" + t.y;
                    });
            },
            29: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var i = (function () {
                    function t(t) {
                        (this.elements = []), (this.compare = t);
                    }
                    return (
                        (t.prototype.getSize = function () {
                            return this.elements.length;
                        }),
                        (t.prototype.isEmpty = function () {
                            return 0 == this.elements.length;
                        }),
                        (t.prototype.push = function (t) {
                            this.elements.push(t), this.siftUp(this.elements.length - 1);
                        }),
                        (t.prototype.peek = function () {
                            return this.elements[0];
                        }),
                        (t.prototype.pop = function () {
                            var t = this.peek();
                            return this.move(this.elements.length - 1, 0), this.elements.pop(), this.siftDown(0), t;
                        }),
                        (t.prototype.clear = function () {
                            this.elements = [];
                        }),
                        (t.prototype.siftUp = function (t) {
                            for (var e = ((t - 1) / 2) >> 0; e >= 0; ) this.compare(this.elements[t], this.elements[e]) ? (this.swap(t, e), (e = (((t = e) - 1) / 2) >> 0)) : (e = -1);
                        }),
                        (t.prototype.siftDown = function (t) {
                            var e = 2 * t + 1,
                                i = 2 * t + 2;
                            if (!(e >= this.elements.length)) {
                                var n = i >= this.elements.length || this.compare(this.elements[e], this.elements[i]) ? e : i;
                                this.compare(this.elements[n], this.elements[t]) && (this.swap(n, t), this.siftDown(n));
                            }
                        }),
                        (t.prototype.move = function (t, e) {
                            this.elements[e] = this.elements[t];
                        }),
                        (t.prototype.swap = function (t, e) {
                            var i = this.elements[t];
                            (this.elements[t] = this.elements[e]), (this.elements[e] = i);
                        }),
                        t
                    );
                })();
                e.default = i;
            },
            90: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var i = function (t) {
                        (this.next = null), (this.data = t);
                    },
                    n = (function () {
                        function t() {
                            (this.top = null), (this.size = 0);
                        }
                        return (
                            (t.prototype.peek = function () {
                                return null != this.top ? this.top.data : void 0;
                            }),
                            (t.prototype.push = function (t) {
                                var e = new i(t);
                                (e.next = this.top), (this.top = e), this.size++;
                            }),
                            (t.prototype.pop = function () {
                                var t = this.peek();
                                return null != this.top && ((this.top = this.top.next), this.size--), t;
                            }),
                            (t.prototype.isEmpty = function () {
                                return 0 == this.size;
                            }),
                            (t.prototype.getSize = function () {
                                return this.size;
                            }),
                            t
                        );
                    })();
                e.default = n;
            },
            713: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.bindDropDown = void 0),
                    (e.bindDropDown = function () {
                        document.getElementById("alg-drop-down").addEventListener(
                            "mouseover",
                            function () {
                                var t = document.getElementById("alg-arr");
                                (document.getElementById("alg-drop-down-content").style.display = "block"), (t.className = "arrowDown");
                            },
                            !0
                        ),
                            document.getElementById("alg-drop-down").addEventListener(
                                "mouseleave",
                                function () {
                                    var t = document.getElementById("alg-arr");
                                    (document.getElementById("alg-drop-down-content").style.display = "none"), (t.className = "arrowUp");
                                },
                                !0
                            ),
                            document.getElementById("clr-drop-down").addEventListener(
                                "mouseover",
                                function () {
                                    var t = document.getElementById("clr-arr");
                                    (document.getElementById("clr-drop-down-content").style.display = "block"), (t.className = "arrowDownW");
                                },
                                !0
                            ),
                            document.getElementById("clr-drop-down").addEventListener(
                                "mouseleave",
                                function () {
                                    var t = document.getElementById("clr-arr");
                                    (document.getElementById("clr-drop-down-content").style.display = "none"), (t.className = "arrowUpW");
                                },
                                !0
                            );
                    });
            },
            558: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var i = (function () {
                    function t(t) {
                        (this.visualizeAlg = !0), (this.delayInc = 4), (this.algorithm = "a*"), (this.heuristicKey = "euclidean"), (this.navigatorKey = "asterisk"), (this.bidirectional = !1), (this.settingsUI = t);
                    }
                    return (
                        (t.prototype.getAlgorithm = function () {
                            return this.algorithm;
                        }),
                        (t.prototype.getHeuristicKey = function () {
                            return this.heuristicKey;
                        }),
                        (t.prototype.getNavigatorKey = function () {
                            return this.navigatorKey;
                        }),
                        (t.prototype.usingBidirectional = function () {
                            return this.bidirectional;
                        }),
                        (t.prototype.willVisualize = function () {
                            return this.visualizeAlg;
                        }),
                        (t.prototype.getDelayInc = function () {
                            return this.delayInc;
                        }),
                        (t.prototype.bindButtons = function () {
                            var t = this;
                                (this.settingsUI.aStarButton.onclick = function () {
                                    (t.settingsUI.algorithmText.textContent = "A* Search"), (t.algorithm = "a*"), t.enableHeuristics(), t.enableBidirectional();
                                }),
                                (this.settingsUI.bfsButton.onclick = function () {
                                    (t.settingsUI.algorithmText.textContent = "Breadth First"), (t.algorithm = "bfs"), t.disableHeuristics(), t.enableBidirectional();
                                }),
                                (this.settingsUI.dfsButton.onclick = function () {
                                    (t.settingsUI.algorithmText.textContent = "Depth First"), (t.algorithm = "dfs"), t.disableHeuristics(), t.disableBidirectional();
                                }),
                                (this.settingsUI.bestFirstButton.onclick = function () {
                                    (t.settingsUI.algorithmText.textContent = "Best First"), (t.algorithm = "best-first"), t.enableHeuristics(), t.disableBidirectional();
                                });
                        }),
                        (t.prototype.disableHeuristics = function () {
                            (this.settingsUI.manhattanRadio.disabled = !0), (this.settingsUI.euclideanRadio.disabled = !0), (this.settingsUI.chebyshevRadio.disabled = !0), (this.settingsUI.octileRadio.disabled = !0);
                        }),
                        (t.prototype.enableHeuristics = function () {
                            (this.settingsUI.manhattanRadio.disabled = !1), (this.settingsUI.euclideanRadio.disabled = !1), (this.settingsUI.chebyshevRadio.disabled = !1), (this.settingsUI.octileRadio.disabled = !1);
                        }),
                        (t.prototype.disableBidirectional = function () {
                            this.settingsUI.bidirectionalCheckBox.disabled = !0;
                        }),
                        (t.prototype.enableBidirectional = function () {
                            this.settingsUI.bidirectionalCheckBox.disabled = !1;
                        }),
                        (t.prototype.bindSettings = function () {
                            var t = this,
                                e = this.settingsUI.diagonalsCheckBox;
                            e.onchange = function () {
                                e.checked ? (t.navigatorKey = "asterisk") : (t.navigatorKey = "plus");
                            };
                            var i = this.settingsUI.bidirectionalCheckBox;
                            i.onchange = function () {
                                t.bidirectional = i.checked;
                            };
                            var n = this.settingsUI.visualizeCheckBox;
                            n.onchange = function () {
                                t.visualizeAlg = n.checked;
                            };
                            var o = this.settingsUI.manhattanRadio;
                            o.onchange = function () {
                                o.checked && (t.heuristicKey = "manhattan");
                            };
                            var r = this.settingsUI.euclideanRadio;
                            r.onchange = function () {
                                r.checked && (t.heuristicKey = "euclidean");
                            };
                            var s = this.settingsUI.chebyshevRadio;
                            s.onchange = function () {
                                s.checked && (t.heuristicKey = "chebyshev");
                            };
                            var a = this.settingsUI.octileRadio;
                            a.onchange = function () {
                                a.checked && (t.heuristicKey = "octile");
                            };
                        }),
                        (t.prototype.bindSlider = function () {
                            var t = this,
                                e = this.settingsUI.speedSlider;
                            e.oninput = function () {
                                var i = "Error";
                                switch (Number.parseInt(e.value)) {
                                    case 1:
                                        (t.delayInc = 16), (i = "Slowest");
                                        break;
                                    case 2:
                                        (t.delayInc = 8), (i = "Slow");
                                        break;
                                    case 3:
                                        (t.delayInc = 4), (i = "Medium");
                                        break;
                                    case 4:
                                        (t.delayInc = 1), (i = "Fast");
                                        break;
                                    case 5:
                                        (t.delayInc = 0), (i = "Fastest");
                                }
                                t.settingsUI.speedText.textContent = i;
                            };
                        }),
                        t
                    );
                })();
                e.default = i;
            },
            632: (t, e) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var i = (function () {
                    function t(t) {
                        (this.dragging = !1), (this.active = !1), (this.prevX = 0), (this.prevY = 0), (this.draggableUI = t);
                    }
                    return (
                        (t.prototype.bindDrag = function () {
                            var t = this;
                            (this.draggableUI.openButton.onclick = function () {
                                t.active
                                    ? ((t.draggableUI.draggable.style.display = "none"), (t.draggableUI.draggableContent.style.display = "none"))
                                    : ((t.draggableUI.draggable.style.display = "block"), (t.draggableUI.draggableContent.style.display = "block")),
                                    (t.active = !t.active);
                            }),
                                (this.draggableUI.closeButton.onclick = function () {
                                    (t.active = !1), (t.draggableUI.draggable.style.display = "none"), (t.draggableUI.draggableContent.style.display = "none");
                                });
                            var e = this.draggableUI.draggable;
                            e.addEventListener("mousedown", function (e) {
                                e.preventDefault(), (t.prevY = e.clientY), (t.prevX = e.clientX), (t.dragging = !0);
                            }),
                                document.addEventListener("mousemove", function (e) {
                                    if (t.dragging) {
                                        var i = t.draggableUI.draggableContainer;
                                        (i.style.top = i.offsetTop - (t.prevY - e.clientY) + "px"), (i.style.left = i.offsetLeft - (t.prevX - e.clientX) + "px"), (t.prevY = e.clientY), (t.prevX = e.clientX);
                                    }
                                }),
                                e.addEventListener("mouseup", function (e) {
                                    e.preventDefault(), (t.dragging = !1);
                                });
                        }),
                        t
                    );
                })();
                e.default = i;
            },
            284: (t, e, i) => {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var n = i(271),
                    o = i(279),
                    r = i(118),
                    s = i(961),
                    a = (function () {
                        function t(t, e, i) {
                            (this.thinking = !1), (this.generating = !1), (this.visualTimeouts = []), (this.generationTimeouts = []), (this.gridView = t), (this.settings = e), (this.handlerUI = i);
                        }
                        return (
                            (t.prototype.isThinking = function () {
                                return this.thinking;
                            }),
                            (t.prototype.isGenerating = function () {
                                return this.generating;
                            }),
                            (t.prototype.bindVisualizeButton = function () {
                                var t = this;
                                (this.handlerUI.visualizeButton.onmousedown = function (t) {
                                    t.preventDefault();
                                }),
                                    (this.handlerUI.visualizeButton.onclick = function () {
                                        if ((t.gridView.setVisualize(!1), !t.generating))
                                            if ((t.gridView.clearVisualization(), t.gridView.clearSvg(), t.gridView.toggleDisable(), t.thinking)) {
                                                t.handlerUI.visualizeButton.className = "button green-button";
                                                for (var e = 0; e < t.visualTimeouts.length; e++) clearTimeout(t.visualTimeouts[e]);
                                                t.thinking = !1;
                                            } else {
                                                (t.handlerUI.visualizeButton.className = "button red-button"), (t.thinking = !0);
                                                var i = t.getPathfinder(),
                                                    n = t.findPath(i),
                                                    o = t.settings.getDelayInc(),
                                                    r = 0,
                                                    s = [];
                                        
                                                (t.visualTimeouts = []),
                                                    t.settings.willVisualize() &&
                                                        i.reconstructSolution(function (e) {
                                                            var i = new Promise(function (i) {
                                                                var n = setTimeout(function () {
                                                                    t.gridView.visualizeClosedNode(e), t.gridView.visualizeGeneration(e.children), i(n);
                                                                }, r);
                                                                t.visualTimeouts.push(n), (r += o);
                                                            });
                                                            s.push(i);
                                                        }),
                                                    Promise.all(s).then(function () {
                                                        t.gridView.setVisualize(!0), t.drawSolution(n);
                                                    });
                                            }
                                    });
                            }),
                            (t.prototype.doPathfinding = function () {
                                var t = this,
                                    e = this.getPathfinder(),
                                    i = this.findPath(e);
                                this.settings.willVisualize() &&
                                    e.reconstructSolution(function (e) {
                                        t.gridView.visualizeClosedNode(e), t.gridView.visualizeGeneration(e.children);
                                    }),
                                    this.drawSolution(i),
                                    this.gridView.toggleDisable();
                            }),
                            (t.prototype.getPathfinder = function () {
                                var t = this.settings.getAlgorithm(),
                                    e = s.default.getNavigator(this.gridView.getGrid(), this.settings.getNavigatorKey());
                                return s.default.getInstance(e, this.settings.usingBidirectional() && s.default.hasBidirectional(t) ? s.default.getBidirectional(t) : t, this.settings.getHeuristicKey());
                            }),
                            (t.prototype.findPath = function (t) {
                                var e = performance.now(),
                                    i = t.findPath(this.gridView.getInitial(), this.gridView.getGoal()),
                                    n = +(performance.now() - e).toFixed(3);
                                return (this.handlerUI.timeText.textContent = "Time : " + n + " ms"), i;
                            }),
                            (t.prototype.drawSolution = function (t) {
                                this.gridView.drawLines(t);
                                for (var e = 0, i = 0; i < t.length - 1; i++) e += r.euclidean(t[i].point, t[i + 1].point);
                                (e = +e.toFixed(3)), (this.handlerUI.lengthText.textContent = "Length: " + e), (this.handlerUI.visualizeButton.className = "button green-button"), this.gridView.toggleDisable(), (this.thinking = !1);
                            }),
                            (t.prototype.bindMazeButton = function () {
                                var t = this;
                                this.handlerUI.mazeButton.onclick = function () {
                                    t.thinking ||
                                        (t.generating && t.resetGeneration(),
                                        (t.generating = !0),
                                        t.gridView.clear(),
                                        t.gridView.disabled(),
                                        new o.default(t.gridView.getGrid(), function (e) {
                                            var i = e.data.isSolid ? n.TileType.Solid : n.TileType.Empty;
                                            t.gridView.mutateTile(e.point, i);
                                        }).generateMaze(),
                                        t.gridView.enabled(),
                                        (t.generating = !1),
                                        t.setPositionsDefault());
                                };
                            }),
                            (t.prototype.setPositionsDefault = function () {
                                this.gridView.moveInitial({ x: 1, y: 1 }), this.gridView.moveGoal({ x: this.gridView.getGrid().getWidth() - 2, y: this.gridView.getGrid().getHeight() - 2 });
                            }),
                            (t.prototype.resetGeneration = function () {
                                for (var t = 0; t < this.generationTimeouts.length; t++) clearTimeout(this.generationTimeouts[t]);
                                (this.generating = !1), this.gridView.enabled();
                            }),
                            (t.prototype.resetVisual = function () {
                                for (var t = 0; t < this.visualTimeouts.length; t++) clearTimeout(this.visualTimeouts[t]);
                                (this.thinking = !1), (this.handlerUI.visualizeButton.className = "button green-button"), this.gridView.enabled();
                            }),
                            t
                        );
                    })();
                e.default = a;
            },
            169: (t, e, i) => {
                var n, o;
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.BUFFER_CLASS = e.TILE_CLASS = void 0);
                var r = i(62),
                    s = i(271),
                    a = "rgb(45, 48, 54)",
                    l = (((n = {})[s.TileType.Empty] = "transparent"), (n[s.TileType.Solid] = a), n),
                    u = (((o = {})[s.TileType.Empty] = "rgb(122, 164, 188)"), (o[s.TileType.Solid] = a), o),
                    h = "rgb(198, 237, 238)",
                    d = "rgb(191, 248, 159)",
                    c = "rgb(131, 217, 52)",
                    p = "rgb(203, 75, 14)";
                (e.TILE_CLASS = "tile"), (e.BUFFER_CLASS = "buffer");
                var g = { x: -1, y: -1 },
                    f = (function () {
                        function t(t, e, i) {
                            (this.lastPoint = g),
                                (this.onTilesDragged = function () {}),
                                (this.margins = e),
                                (this.viewUI = i),
                                (this.pointerTile = s.TileType.Solid),
                                (this.tilesX = t),
                                this.init(),
                                (this.goalTile = this.getTileType(this.goal));
                        }
                        return (
                            (t.prototype.initMouse = function () {
                                (this.disable = !1), (this.mouseDown0 = !1), (this.mouseDown2 = !1), (this.draggingInitial = !1), (this.draggingGoal = !1);
                            }),
                            (t.prototype.init = function () {
                                this.setVisualize(!1), this.initMouse();
                                var t = this.viewUI.grid,
                                    e = window.innerWidth - this.margins.left - this.margins.right;
                                (t.style.width = String(e) + "px"),
                                    (this.tileWidth = (function (t, e) {
                                        e || (e = 1);
                                        var i = 1 / e;
                                        return Math.round(t * i) / i;
                                    })(e / this.tilesX, 0.2)),
                                    (this.tilesY = Math.floor((window.innerHeight - this.margins.top - this.margins.bottom) / this.tileWidth)),
                                    (this.grid = new r.default(this.tilesX, this.tilesY));
                                var i = this.viewUI.bg;
                                (i.style.width = String(e) + "px"),
                                    (this.gridTiles = this.makeTiles(t, "transparent")),
                                    (this.bgTiles = this.makeTiles(i, "white")),
                                    (this.initial = { x: (0) >> 0, y: (0) >> 0 }),
                                    (this.goal = { x: (((this.tilesX - 1))) >> 0, y: (((this.tilesY - 1))) >> 0 }),
                                    this.renderPoints();
                                var n = this.viewUI.svg;
                                (n.style.width = String(e + this.margins.right) + "px"), this.bindListeners(n), this.bindMobileListeners(n);
                            }),
                            (t.prototype.getInitial = function () {
                                return this.initial;
                            }),
                            (t.prototype.getGoal = function () {
                                return this.goal;
                            }),
                            (t.prototype.getGrid = function () {
                                return this.grid;
                            }),
                            (t.prototype.setPointer = function (t) {
                                this.pointerTile = t;
                            }),
                            (t.prototype.setOnTileDragged = function (t) {
                                this.onTilesDragged = t;
                            }),
                            (t.prototype.isVisualize = function () {
                                return this.isVisualized;
                            }),
                            (t.prototype.setVisualize = function (t) {
                                this.isVisualized = t;
                            }),
                            (t.prototype.makeTiles = function (t, e) {
                                for (var i = [], n = 0; n < this.tilesY; n++) {
                                    for (var o = [], r = 0; r < this.tilesX; r++) {
                                        var s = b(this.tileWidth, 0, e),
                                            a = n * this.tileWidth,
                                            l = r * this.tileWidth;
                                        (s.style.top = a + "px"), (s.style.left = l + "px"), o.push(s), t.appendChild(s);
                                    }
                                    i.push(o);
                                }
                                for (r = 0; r < this.tilesX; r++) i[this.tilesY - 1][r].style.borderBottomWidth = "1px";
                                for (n = 0; n < this.tilesY; n++) i[n][this.tilesX - 1].style.borderRightWidth = "1px";
                                return i;
                            }),
                            (t.prototype.bindListeners = function (t) {
                                var e = this;
                                t.addEventListener("contextmenu", function (t) {
                                    return t.preventDefault();
                                }),
                                    t.addEventListener("mousedown", function (i) {
                                        i.preventDefault();
                                        var n = t.getBoundingClientRect();
                                        e.onPress(i.clientX - n.left, i.clientY - n.top, i.button);
                                    }),
                                    t.addEventListener("mouseup", function (t) {
                                        t.preventDefault(), 0 == t.button ? ((e.draggingGoal = !1), (e.draggingInitial = !1), (e.mouseDown0 = !1)) : 2 == t.button && (e.mouseDown2 = !1), (e.lastPoint = g);
                                    }),
                                    t.addEventListener("mousemove", function (i) {
                                        var n = t.getBoundingClientRect();
                                        e.onDrag(i.clientX - n.left, i.clientY - n.top);
                                    }),
                                    t.addEventListener("mouseleave", function (t) {
                                        t.preventDefault(), (e.draggingGoal = !1), (e.draggingInitial = !1), (e.mouseDown0 = !1), (e.mouseDown2 = !1), (e.lastPoint = g);
                                    });
                            }),
                            (t.prototype.bindMobileListeners = function (t) {
                                var e = this;
                                t.addEventListener("touchstart", function (i) {
                                    var n = i.touches[0] || i.changedTouches[0];
                                    i.preventDefault();
                                    var o = t.getBoundingClientRect();
                                    e.onTouch(n.clientX - o.left, n.clientY - o.top);
                                }),
                                    t.addEventListener("touchend", function (t) {
                                        t.preventDefault(), (e.draggingGoal = !1), (e.draggingInitial = !1), (e.mouseDown0 = !1), (e.mouseDown2 = !1), (e.lastPoint = g);
                                    }),
                                    t.addEventListener(
                                        "touchmove",
                                        function (i) {
                                            var n = i.touches[0] || i.changedTouches[0],
                                                o = t.getBoundingClientRect();
                                            e.onDrag(n.clientX - o.left, n.clientY - o.top);
                                        },
                                        !0
                                    ),
                                    t.addEventListener("touchcancel", function (t) {
                                        t.preventDefault(), (e.draggingGoal = !1), (e.draggingInitial = !1), (e.mouseDown0 = !1), (e.mouseDown2 = !1), (e.lastPoint = g);
                                    });
                            }),
                            (t.prototype.renderPoints = function () {
                                (this.gridTiles[this.initial.y][this.initial.x].style.backgroundColor = c), (this.gridTiles[this.goal.y][this.goal.x].style.backgroundColor = p);
                            }),
                            (t.prototype.calculatePoint = function (t, e) {
                                return { x: Math.floor(t / this.tileWidth), y: Math.floor(e / this.tileWidth) };
                            }),
                            (t.prototype.calculateCoordinate = function (t) {
                                return { x: t.x * this.tileWidth + this.tileWidth / 2, y: t.y * this.tileWidth + this.tileWidth / 2 };
                            }),
                            (t.prototype.isVisualizedNode = function (t) {
                                return this.isClosedNode(t) || this.isOpenNode(t);
                            }),
                            (t.prototype.isClosedNode = function (t) {
                                return this.bgTiles[t.y][t.x].style.backgroundColor === h;
                            }),
                            (t.prototype.isOpenNode = function (t) {
                                return this.bgTiles[t.y][t.x].style.backgroundColor === d;
                            }),
                            (t.prototype.erasePoint = function (t) {
                                this.mutateTile(t, s.TileType.Empty);
                            }),
                            (t.prototype.onPress = function (t, e, i) {
                                var n = this.calculatePoint(t, e);
                                (this.lastPoint = n),
                                    0 == i
                                        ? ((this.mouseDown0 = !0), y(n, this.initial) ? (this.draggingInitial = !0) : y(n, this.goal) ? (this.draggingGoal = !0) : this.disable || this.mutateTile(n, this.pointerTile))
                                        : 2 == i && ((this.mouseDown2 = !0), y(n, this.initial) || y(n, this.goal) || this.disable || this.erasePoint(n));
                            }),
                            (t.prototype.onTouch = function (t, e) {
                                var i = this.calculatePoint(t, e);
                                (this.lastPoint = i),
                                    y(i, this.initial)
                                        ? ((this.mouseDown0 = !0), (this.draggingInitial = !0))
                                        : y(i, this.goal)
                                        ? ((this.mouseDown0 = !0), (this.draggingGoal = !0))
                                        : this.grid.get(i).data.isSolid
                                        ? ((this.mouseDown2 = !0), y(i, this.initial) || y(i, this.goal) || this.disable || this.erasePoint(i))
                                        : ((this.mouseDown0 = !0), this.disable || this.mutateTile(i, this.pointerTile));
                            }),
                            (t.prototype.onDrag = function (t, e) {
                                var i = this.calculatePoint(t, e);
                                y(i, this.lastPoint) ||
                                    ((this.lastPoint = i),
                                    this.mouseDown0
                                        ? this.draggingInitial
                                            ? (this.moveInitial(i), this.onTilesDragged())
                                            : this.draggingGoal
                                            ? (this.moveGoal(i), this.onTilesDragged())
                                            : y(i, this.initial) || y(i, this.goal) || this.disable || this.mutateTile(i, this.pointerTile)
                                        : this.mouseDown2 && (y(i, this.initial) || y(i, this.goal) || this.disable || this.erasePoint(i)));
                            }),
                            (t.prototype.moveInitial = function (t) {
                                !this.grid.inBounds(t) ||
                                    y(this.goal, t) ||
                                    this.disable ||
                                    (this.mutateTile(this.initial, this.getTileType(this.initial)),
                                    (this.gridTiles[t.y][t.x].style.borderColor = u[s.TileType.Empty]),
                                    (this.gridTiles[t.y][t.x].style.backgroundColor = c),
                                    (this.initial = t));
                            }),
                            (t.prototype.moveGoal = function (t) {
                                !this.grid.inBounds(t) ||
                                    y(this.initial, t) ||
                                    this.disable ||
                                    (this.mutateTile(this.goal, this.goalTile), (this.goalTile = this.getTileType(t)), this.mutateTile(t, s.TileType.Empty), (this.gridTiles[t.y][t.x].style.backgroundColor = p), (this.goal = t));
                            }),
                            (t.prototype.getTileType = function (t) {
                                return this.grid.get(t).data.isSolid ? s.TileType.Solid : s.TileType.Empty;
                            }),
                            (t.prototype.mutateTile = function (t, e) {
                                this.grid.inBounds(t) && (this.grid.mutate(t, s.createTile(e)), (this.gridTiles[t.y][t.x].style.backgroundColor = l[e]), (this.gridTiles[t.y][t.x].style.borderColor = u[e]));
                            }),
                            (t.prototype.clear = function () {
                                for (var t = 0; t < this.tilesY; t++)
                                    for (var e = 0; e < this.tilesX; e++) {
                                        var i = { x: e, y: t };
                                        this.mutateTile(i, s.TileType.Empty);
                                    }
                                this.moveInitial(this.initial), this.moveGoal(this.goal), (this.goalTile = this.getTileType(this.goal)), this.clearVisualization();
                            }),
                            (t.prototype.drawLines = function (t) {
                                var e = this.viewUI.svg;
                                t.unshift(this.grid.get(this.initial));
                                for (var i = 0; i < t.length - 1; i++) {
                                    var n = t[i].point,
                                        o = t[i + 1].point,
                                        r = m(this.calculateCoordinate(n), this.calculateCoordinate(o));
                                    e.appendChild(r);
                                }
                            }),
                            (t.prototype.visualizeOpenPoint = function (t) {
                                y(t, this.initial) || y(t, this.goal) || (this.bgTiles[t.y][t.x].style.backgroundColor = d);
                            }),
                            (t.prototype.visualizeClosedPoint = function (t) {
                                y(t, this.initial) || y(t, this.goal) || (this.bgTiles[t.y][t.x].style.backgroundColor = h);
                            }),
                            (t.prototype.visualizeGeneration = function (t) {
                                for (var e = 0, i = t; e < i.length; e++) {
                                    var n = i[e];
                                    this.visualizeOpenPoint(n.tile.point);
                                }
                            }),
                            (t.prototype.visualizeClosedNode = function (t) {
                                this.visualizeClosedPoint(t.tile.point);
                            }),
                            (t.prototype.clearVisualization = function () {
                                for (var t = 0; t < this.tilesY; t++) for (var e = 0; e < this.tilesX; e++) this.bgTiles[t][e].style.backgroundColor = "white";
                                this.clearSvg();
                            }),
                            (t.prototype.clearSvg = function () {
                                for (var t = this.viewUI.svg; t.hasChildNodes(); ) t.removeChild(t.lastChild);
                            }),
                            (t.prototype.toggleDisable = function () {
                                this.disable = !this.disable;
                            }),
                            (t.prototype.enabled = function () {
                                this.disable = !1;
                            }),
                            (t.prototype.disabled = function () {
                                this.disable = !0;
                            }),
                            (t.prototype.delete = function () {
                                v(this.viewUI.grid), v(this.viewUI.bg), this.clearSvg();
                            }),
                            (t.prototype.resize = function (t) {
                                this.delete(), (this.tilesX = t), this.init();
                            }),
                            t
                        );
                    })();
                function y(t, e) {
                    return t.x == e.x && t.y == e.y;
                }
                function v(t) {
                    for (; t.hasChildNodes(); ) t.removeChild(t.lastChild);
                }
                function m(t, e) {
                    var i = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    return (
                        i.setAttributeNS(null, "x1", String(t.x)),
                        i.setAttributeNS(null, "y1", String(t.y)),
                        i.setAttributeNS(null, "x2", String(e.x)),
                        i.setAttributeNS(null, "y2", String(e.y)),
                        i.setAttributeNS(null, "style", "stroke:black;stroke-width:2"),
                        i.setAttributeNS(null, "class", "line"),
                        i
                    );
                }
                function b(t, i, n) {
                    var o = document.createElement("div");
                    return (o.className = e.TILE_CLASS), (o.style.backgroundColor = n), (o.style.width = String(t) + "px"), (o.style.height = String(t) + "px"), o;
                }
                e.default = f;
            },
        },
        e = {};
    !(function i(n) {
        if (e[n]) return e[n].exports;
        var o = (e[n] = { exports: {} });
        return t[n].call(o.exports, o, o.exports, i), o.exports;
    })(142);
})();
