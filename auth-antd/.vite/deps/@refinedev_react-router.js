import {
  Rt,
  Te,
  Ut,
  as,
  ht,
  ls,
  q,
  require_lib,
  vt,
  z
} from "./chunk-2HJEM4DJ.js";
import "./chunk-AGL3XMSE.js";
import {
  Link,
  Navigate,
  NavigationContext,
  Route,
  Routes,
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from "./chunk-MHCNOVJW.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/@refinedev/react-router/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_qs = __toESM(require_lib(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react8 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var import_react10 = __toESM(require_react(), 1);
var h = (e) => {
  if (typeof e > "u") return e;
  let t = Number(e);
  return `${t}` === e ? t : e;
};
var x = { addQueryPrefix: true, skipNulls: true, arrayFormat: "indices", encode: false, encodeValuesOnly: true };
var D = { go: () => {
  let { search: e, hash: t } = useLocation(), n = useNavigate();
  return (0, import_react2.useCallback)(({ to: s, type: r, query: o, hash: a, options: { keepQuery: c, keepHash: f } = {} }) => {
    let u = { ...c && e && import_qs.default.parse(e, { ignoreQueryPrefix: true }), ...o };
    u.to && (u.to = encodeURIComponent(`${u.to}`));
    let p = Object.keys(u).length > 0, m = `#${(a || f && t || "").replace(/^#/, "")}`, d = m.length > 1, C = `${s || ""}${p ? import_qs.default.stringify(u, x) : ""}${d ? m : ""}`;
    if (r === "path") return C;
    n(C, { replace: r === "replace" });
  }, [t, e, n]);
}, back: () => {
  let e = useNavigate();
  return (0, import_react2.useCallback)(() => {
    e(-1);
  }, [e]);
}, parse: () => {
  var c;
  let e = useParams(), { pathname: t, search: n } = useLocation(), { resources: i } = (0, import_react2.useContext)(Rt), { resource: s, action: r, matchedRoute: o } = import_react.default.useMemo(() => as(t, i), [i, t]);
  return Object.entries(e).length === 0 && o && (e = ((c = matchPath(o, t)) == null ? void 0 : c.params) || {}), (0, import_react2.useCallback)(() => {
    let f = import_qs.default.parse(n, { ignoreQueryPrefix: true }), u = { ...e, ...f };
    return { ...s && { resource: s }, ...r && { action: r }, ...(e == null ? void 0 : e.id) && { id: decodeURIComponent(e.id) }, pathname: t, params: { ...u, current: h(u.current), pageSize: h(u.pageSize), to: u.to ? decodeURIComponent(u.to) : void 0 } };
  }, [t, n, e, s, r]);
}, Link: import_react.default.forwardRef(function(t, n) {
  return import_react.default.createElement(Link, { ...t, ref: n });
}) };
var B = (e, t) => {
  let { name: n, list: i, create: s, show: r, edit: o } = e;
  if (typeof i == "string" && t === "list") return i;
  if (typeof i == "object" && t === "list") return i.path;
  if (typeof s == "string" && t === "create") return s;
  if (typeof s == "object" && t === "create") return s.path;
  if (typeof r == "string" && t === "show") return r;
  if (typeof r == "object" && t === "show") return r.path;
  if (typeof o == "string" && t === "edit") return o;
  if (typeof o == "object" && t === "edit") return o.path;
  let a = `/${n}`, c = `${["edit", "create", "clone", "show"].includes(t) ? t : ""}`, f = `${["edit", "show", "clone"].includes(t) ? ":id" : ""}`;
  return [a, c, f].filter(Boolean).join("/");
};
var T = (e) => e.flatMap((n) => {
  let i = [];
  return ["list", "show", "edit", "create"].forEach((s) => {
    let r = n[s];
    if (typeof r < "u" && typeof r != "string") {
      let o = typeof r == "function" ? r : r.component, a = B(n, s);
      i.push({ action: s, element: o, path: a }), s === "create" && i.push({ action: "clone", element: o, path: a });
    }
  }), i.map(({ action: s, element: r, path: o }) => {
    let a = import_react4.default.createElement(r, null);
    return import_react4.default.createElement(Route, { key: `${s}-${o}`, path: o, element: a });
  });
});
var G = ({ children: e }) => {
  let { resources: t } = q(), n = import_react3.default.useMemo(() => T(t), [t]);
  return e ? e(n) : import_react3.default.createElement(Routes, null, n);
};
var O = ({ resource: e, meta: t }) => {
  let n = Ut(), { resource: i, resources: s } = q(e), r = i || s.find((o) => o.list);
  if (r) {
    let o = n({ resource: r, action: "list", meta: t });
    return o ? import_react5.default.createElement(Navigate, { to: o }) : (console.warn("No resource is found to navigate to."), null);
  }
  return console.warn("No resource is found to navigate to."), null;
};
function J(e, t = true) {
  let { navigator: n } = import_react7.default.useContext(NavigationContext);
  import_react7.default.useEffect(() => {
    if (!t) return;
    let i = n.go, s = n.push;
    return n.push = (...r) => {
      e() !== false && s(...r);
    }, n.go = (...r) => {
      e() !== false && i(...r);
    }, () => {
      n.push = s, n.go = i;
    };
  }, [n, e, t]);
}
function w(e, t = true, n) {
  let i = import_react7.default.useCallback((r) => (r.preventDefault(), r.returnValue = e, r.returnValue), [e]);
  import_react7.default.useEffect(() => (t && window.addEventListener("beforeunload", i), () => {
    window.removeEventListener("beforeunload", i);
  }), [i, t]);
  let s = import_react7.default.useCallback(() => {
    let r = window.confirm(e);
    return r && n && n(), r;
  }, [e]);
  J(s, t);
}
var _ = ({ translationKey: e = "warnWhenUnsavedChanges", message: t = "Are you sure you want to leave? You have unsaved changes." }) => {
  let n = z(), { pathname: i } = useLocation(), { warnWhen: s, setWarnWhen: r } = vt();
  import_react6.default.useEffect(() => () => r == null ? void 0 : r(false), [i]);
  let o = import_react6.default.useMemo(() => n(e, t), [e, t, n]);
  return w(o, s, () => {
    r == null || r(false);
  }), null;
};
var oe = ({ to: e }) => {
  let { pathname: t, search: n } = useLocation(), i = `${t}${n}`, s = i.length > 1 ? `?to=${encodeURIComponent(i)}` : "";
  return import_react8.default.createElement(Navigate, { to: `${e}${s}` });
};
function ce({ handler: e }) {
  var d;
  let t = useLocation(), { action: n, id: i, params: s, pathname: r, resource: o } = Te(), a = z(), c = ht(), f = (o == null ? void 0 : o.identifier) ?? (o == null ? void 0 : o.name), p = (o == null ? void 0 : o.label) ?? ((d = o == null ? void 0 : o.meta) == null ? void 0 : d.label) ?? c(f, n === "list" ? "plural" : "singular"), m = a(`${o == null ? void 0 : o.name}.${o == null ? void 0 : o.name}`, p);
  return (0, import_react9.useLayoutEffect)(() => {
    let g = ls(a, o, n, `${i}`, p);
    e ? document.title = e({ action: n, resource: { ...o ?? {}, label: m, meta: { ...o == null ? void 0 : o.meta, label: m } }, params: s, pathname: r, autoGeneratedTitle: g }) : document.title = g;
  }, [t]), import_react9.default.createElement(import_react9.default.Fragment, null);
}
var me = (e) => {
  let t = z();
  return (0, import_react10.useEffect)(() => {
    e && (typeof e == "string" ? document.title = t(e) : document.title = t(e.i18nKey));
  }, [e]), (n) => {
    typeof n == "string" ? document.title = t(n) : document.title = t(n.i18nKey);
  };
};
export {
  oe as CatchAllNavigate,
  ce as DocumentTitleHandler,
  O as NavigateToResource,
  G as RefineRoutes,
  _ as UnsavedChangesNotifier,
  D as default,
  x as stringifyConfig,
  me as useDocumentTitle
};
//# sourceMappingURL=@refinedev_react-router.js.map
