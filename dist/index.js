import { A as jt, a as Vt, B as Wt, b as Ht, C as qt, c as Kt, d as Ut, e as Yt, H as zt, I as Gt, L as Zt, N as Xt, P as Jt, R as Qt, f as en, S as rn, T as an } from "./RadialChart-CmHscW91.js";
import { jsx as e, jsxs as c, Fragment as ke } from "react/jsx-runtime";
import { useEffect as J, createContext as Lr, useState as A, useCallback as xr, useMemo as re, useContext as Ar, forwardRef as xe, useId as oe, useRef as ie, useImperativeHandle as ia } from "react";
function oa({ isOpen: r, onClose: a, title: t, children: n, className: l = "", closeOnOverlayClick: s = !0, ...b }) {
  return J(() => {
    if (r) {
      const i = document.body.style.overflow;
      return document.body.style.overflow = "hidden", () => {
        document.body.style.overflow = i;
      };
    }
  }, [r]), r ? /* @__PURE__ */ e(
    "div",
    {
      className: ["rpc-modal__overlay", l].filter(Boolean).join(" "),
      role: "dialog",
      "aria-modal": "true",
      onClick: (i) => {
        i.target === i.currentTarget && s && (a == null || a());
      },
      children: /* @__PURE__ */ c("div", { className: "rpc-modal", ...b, children: [
        t ? /* @__PURE__ */ e("div", { className: "rpc-modal__header", children: /* @__PURE__ */ e("h3", { className: "rpc-modal__title", children: t }) }) : null,
        /* @__PURE__ */ e("div", { className: "rpc-modal__body", children: n }),
        a ? /* @__PURE__ */ e("button", { className: "rpc-modal__close", onClick: a, "aria-label": "Close modal", children: "×" }) : null
      ] })
    }
  ) : null;
}
const Br = Lr(null), St = ({ children: r, position: a = "bottom-right" }) => {
  const [t, n] = A([]), l = xr((i) => {
    const u = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, v = { id: u, message: i.message, variant: i.variant ?? "info" };
    n((g) => [...g, v]);
    const x = i.duration ?? 4e3;
    setTimeout(() => n((g) => g.filter((f) => f.id !== u)), x);
  }, []), s = xr((i) => n((u) => u.filter((v) => v.id !== i)), []), b = re(() => ({ showToast: l }), [l]);
  return /* @__PURE__ */ c(Br.Provider, { value: b, children: [
    r,
    /* @__PURE__ */ e("div", { className: ["rpc-toast-container", `rpc-toast-container--${a}`].join(" "), "aria-live": "polite", children: t.map((i) => /* @__PURE__ */ e("div", { className: ["rpc-toast", `rpc-toast--${i.variant}`].join(" "), onClick: () => s(i.id), children: i.message }, i.id)) })
  ] });
};
function Ct() {
  const r = Ar(Br);
  if (!r) throw new Error("useToast must be used within a ToastProvider");
  return r;
}
function Mt({ isOpen: r, onClose: a, title: t, message: n, actions: l, ...s }) {
  const i = (l ?? [
    { label: "Cancel", onClick: a ?? (() => {
    }), variant: "secondary" },
    { label: "Yes", onClick: a ?? (() => {
    }), variant: "primary" }
  ]).map((u, v) => /* @__PURE__ */ e("button", { className: ["rpc-button", u.variant === "primary" ? "rpc-button--primary" : "rpc-button--secondary"].join(" "), onClick: u.onClick, children: u.label }, v));
  return /* @__PURE__ */ c(oa, { isOpen: r, onClose: a, title: t, ...s, children: [
    /* @__PURE__ */ e("div", { style: { marginBottom: "1rem" }, children: n }),
    /* @__PURE__ */ e("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" }, children: i })
  ] });
}
function q(...r) {
  return r.filter((a) => typeof a == "string" && a.length > 0).join(" ");
}
function da(r, a) {
  return a ? a.split(".").reduce((t, n) => {
    if (t && typeof t == "object" && n in t)
      return t[n];
  }, r) : r;
}
function ua(r) {
  return typeof r == "string" ? { url: r } : r;
}
function pa(r) {
  if (r && typeof r == "object") {
    const a = r, t = a.value ?? a.id ?? a.key ?? a.slug, n = a.label ?? a.name ?? a.title ?? t;
    return {
      label: String(n ?? ""),
      value: String(t ?? n ?? ""),
      meta: r
    };
  }
  return {
    label: String(r ?? ""),
    value: String(r ?? "")
  };
}
function ha(r, a, t) {
  const n = new URL(r.url, typeof window > "u" ? "http://localhost" : window.location.origin), l = r.searchParam ?? "search", s = r.pageParam ?? "page", b = r.limitParam ?? "limit";
  return a && n.searchParams.set(l, a), r.pageSize && (n.searchParams.set(s, String(t)), n.searchParams.set(b, String(r.pageSize))), Object.entries(r.queryParams ?? {}).forEach(([i, u]) => {
    u != null && n.searchParams.set(i, String(u));
  }), r.url.startsWith("http") ? n.toString() : `${n.pathname}${n.search}`;
}
function pr({
  children: r,
  className: a,
  disabled: t,
  error: n,
  fullWidth: l = !0,
  helperText: s,
  id: b,
  label: i,
  required: u
}) {
  const v = n ?? s;
  return /* @__PURE__ */ c(
    "label",
    {
      className: q(
        "rpc-form-field",
        l && "rpc-form-field--full",
        t && "rpc-form-field--disabled",
        n && "rpc-form-field--error",
        a
      ),
      htmlFor: b,
      children: [
        i ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
          i,
          u ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        r,
        v ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: v }) : null
      ]
    }
  );
}
function ma({ off: r = !1 }) {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "3" }),
    r ? /* @__PURE__ */ e("path", { d: "m4 4 16 16" }) : null
  ] });
}
const hr = xe(function({
  className: a = "",
  disabled: t,
  error: n,
  fullWidth: l,
  helperText: s,
  id: b,
  inputClassName: i,
  label: u,
  prefix: v,
  required: x,
  suffix: g,
  type: f = "text",
  validationMessage: C,
  ...$
}, w) {
  const O = oe(), y = b ?? $.name ?? O, B = n ?? C;
  return /* @__PURE__ */ e(
    pr,
    {
      className: a,
      disabled: t,
      error: B,
      fullWidth: l,
      helperText: s,
      id: y,
      label: u,
      required: x,
      children: /* @__PURE__ */ c("span", { className: "rpc-input-wrap", children: [
        v ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: v }) : null,
        /* @__PURE__ */ e(
          "input",
          {
            "aria-describedby": B || s ? `${y}-message` : void 0,
            "aria-invalid": !!B || void 0,
            className: q("rpc-form-input", i),
            disabled: t,
            id: y,
            ref: w,
            required: x,
            type: f,
            ...$
          }
        ),
        g ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: g }) : null
      ] })
    }
  );
}), fa = xe(function({
  className: a = "",
  disabled: t,
  error: n,
  formatNumber: l = !1,
  fullWidth: s,
  helperText: b,
  id: i,
  inputClassName: u,
  label: v,
  max: x,
  min: g,
  onValueChange: f,
  prefix: C,
  required: $,
  step: w = 1,
  suffix: O,
  value: y,
  ...B
}, d) {
  var P;
  const p = oe(), k = i ?? B.name ?? p, [M, D] = A(y === void 0 ? "" : String(y)), _ = y === void 0 ? M : String(y);
  J(() => {
    y !== void 0 && D(String(y));
  }, [y]);
  const h = _ === "" ? null : Number(_), E = typeof document < "u" && ((P = document.activeElement) == null ? void 0 : P.id) === k, R = l && !E && h !== null ? new Intl.NumberFormat().format(h) : _, W = (K) => {
    y === void 0 && D(K), f == null || f(K === "" ? null : Number(K));
  }, V = (K) => {
    let U = K;
    return g !== void 0 && (U = Math.max(Number(g), U)), x !== void 0 && (U = Math.min(Number(x), U)), U;
  }, S = (K) => {
    const U = h ?? Number(g ?? 0);
    W(String(V(U + Number(w) * K)));
  };
  return /* @__PURE__ */ e(
    pr,
    {
      className: a,
      disabled: t,
      error: n,
      fullWidth: s,
      helperText: b,
      id: k,
      label: v,
      required: $,
      children: /* @__PURE__ */ c("span", { className: "rpc-input-wrap rpc-input-wrap--number", children: [
        C ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: C }) : null,
        /* @__PURE__ */ e(
          "input",
          {
            "aria-invalid": !!n || void 0,
            className: q("rpc-form-input", u),
            disabled: t,
            id: k,
            max: x,
            min: g,
            inputMode: l ? "decimal" : void 0,
            onChange: (K) => W(l ? K.target.value.replace(/,/g, "") : K.target.value),
            ref: d,
            required: $,
            step: w,
            type: l ? "text" : "number",
            value: R,
            ...B
          }
        ),
        /* @__PURE__ */ c("span", { className: "rpc-number-stepper", "aria-hidden": t, children: [
          /* @__PURE__ */ e("button", { disabled: t, onClick: () => S(1), tabIndex: -1, type: "button", children: "+" }),
          /* @__PURE__ */ e("button", { disabled: t, onClick: () => S(-1), tabIndex: -1, type: "button", children: "-" })
        ] }),
        O ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: O }) : null
      ] })
    }
  );
}), _a = xe(function({ helperText: a = "Gunakan format email yang valid.", validateOnBlur: t = !0, onBlur: n, error: l, ...s }, b) {
  const [i, u] = A(null);
  return /* @__PURE__ */ e(
    hr,
    {
      error: l ?? i,
      helperText: a,
      inputMode: "email",
      onBlur: (v) => {
        t && v.currentTarget.value && !v.currentTarget.checkValidity() ? u("Format email belum valid.") : u(null), n == null || n(v);
      },
      ref: b,
      type: "email",
      ...s
    }
  );
}), ga = xe(function({ showStrength: a = !0, value: t, defaultValue: n, helperText: l, error: s, ...b }, i) {
  const [u, v] = A(!1), [x, g] = A(String(n ?? t ?? "")), f = t === void 0 ? x : String(t ?? ""), C = re(() => {
    let w = 0;
    return f.length >= 8 && (w += 1), /[A-Z]/.test(f) && (w += 1), /[0-9]/.test(f) && (w += 1), /[^A-Za-z0-9]/.test(f) && (w += 1), w;
  }, [f]), $ = ["Very weak", "Weak", "Medium", "Strong", "Excellent"][C];
  return /* @__PURE__ */ c("div", { className: "rpc-password-field", children: [
    /* @__PURE__ */ e(
      hr,
      {
        error: s,
        helperText: l,
        onChange: (w) => {
          var O;
          t === void 0 && g(w.target.value), (O = b.onChange) == null || O.call(b, w);
        },
        ref: i,
        suffix: /* @__PURE__ */ e(
          "button",
          {
            "aria-label": u ? "Hide password" : "Show password",
            className: "rpc-password-toggle",
            onClick: () => v((w) => !w),
            type: "button",
            children: /* @__PURE__ */ e(ma, { off: u })
          }
        ),
        type: u ? "text" : "password",
        value: t === void 0 ? x : t,
        ...b
      }
    ),
    /* @__PURE__ */ e("input", { hidden: !0, readOnly: !0, type: u ? "text" : "password", value: f }),
    a ? /* @__PURE__ */ c("div", { className: "rpc-password-strength", "aria-label": `Password strength ${$}`, children: [
      /* @__PURE__ */ e("span", { className: "rpc-password-strength__track", children: /* @__PURE__ */ e("span", { className: `rpc-password-strength__bar rpc-password-strength__bar--${C}` }) }),
      /* @__PURE__ */ e("span", { children: $ })
    ] }) : null
  ] });
}), ba = xe(function({
  autoResize: a = !0,
  className: t = "",
  disabled: n,
  error: l,
  fullWidth: s,
  helperText: b,
  id: i,
  inputClassName: u,
  label: v,
  maxLength: x,
  onChange: g,
  required: f,
  showCounter: C = !0,
  value: $,
  defaultValue: w,
  ...O
}, y) {
  const B = oe(), d = i ?? O.name ?? B, p = ie(null), [k, M] = A(String($ ?? w ?? "").length), D = () => {
    const _ = p.current;
    !_ || !a || (_.style.height = "auto", _.style.height = `${_.scrollHeight}px`);
  };
  return J(D, [a, $]), ia(y, () => p.current), /* @__PURE__ */ c(
    pr,
    {
      className: t,
      disabled: n,
      error: l,
      fullWidth: s,
      helperText: b,
      id: d,
      label: v,
      required: f,
      children: [
        /* @__PURE__ */ e(
          "textarea",
          {
            "aria-invalid": !!l || void 0,
            className: q("rpc-form-textarea", u),
            disabled: n,
            id: d,
            maxLength: x,
            onChange: (_) => {
              M(_.target.value.length), D(), g == null || g(_);
            },
            ref: p,
            required: f,
            value: $,
            defaultValue: w,
            ...O
          }
        ),
        C && x ? /* @__PURE__ */ c("span", { className: "rpc-form-counter", children: [
          k,
          "/",
          x
        ] }) : null
      ]
    }
  );
}), Dr = xe(function({ className: a = "", description: t, disabled: n, error: l, helperText: s, id: b, label: i, required: u, ...v }, x) {
  const g = oe(), f = b ?? v.name ?? g, C = l ?? s;
  return /* @__PURE__ */ c("label", { className: q("rpc-choice", n && "rpc-choice--disabled", l && "rpc-choice--error", a), htmlFor: f, children: [
    /* @__PURE__ */ e(
      "input",
      {
        "aria-invalid": !!l || void 0,
        className: "rpc-choice__native",
        disabled: n,
        id: f,
        ref: x,
        required: u,
        type: "checkbox",
        ...v
      }
    ),
    /* @__PURE__ */ e("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
    /* @__PURE__ */ c("span", { className: "rpc-choice__content", children: [
      i ? /* @__PURE__ */ c("span", { className: "rpc-choice__label", children: [
        i,
        u ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: t }) : null,
      C ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", l && "rpc-form-field__message--error"), children: C }) : null
    ] })
  ] });
});
function $t({
  className: r = "",
  defaultValue: a = [],
  disabled: t,
  error: n,
  helperText: l,
  label: s,
  layout: b = "vertical",
  name: i,
  onValueChange: u,
  options: v,
  required: x,
  value: g
}) {
  const [f, C] = A(a), $ = g ?? f, w = n ?? l, O = (y) => {
    const B = $.includes(y) ? $.filter((d) => d !== y) : [...$, y];
    g === void 0 && C(B), u == null || u(B);
  };
  return /* @__PURE__ */ c("fieldset", { className: q("rpc-choice-group", `rpc-choice-group--${b}`, n && "rpc-choice-group--error", r), children: [
    s ? /* @__PURE__ */ c("legend", { className: "rpc-form-field__label", children: [
      s,
      x ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-choice-group__items", children: v.map((y) => /* @__PURE__ */ e(
      Dr,
      {
        checked: $.includes(y.value),
        description: y.description,
        disabled: t || y.disabled,
        label: y.label,
        name: i,
        onChange: () => O(y.value),
        value: y.value
      },
      y.value
    )) }),
    w ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: w }) : null
  ] });
}
function va({
  className: r = "",
  defaultValue: a,
  disabled: t,
  error: n,
  helperText: l,
  label: s,
  layout: b = "vertical",
  name: i,
  onValueChange: u,
  options: v,
  required: x,
  value: g
}) {
  const f = oe(), C = i ?? f, [$, w] = A(a ?? ""), O = g ?? $, y = n ?? l;
  return /* @__PURE__ */ c("fieldset", { className: q("rpc-choice-group", `rpc-choice-group--${b}`, n && "rpc-choice-group--error", r), children: [
    s ? /* @__PURE__ */ c("legend", { className: "rpc-form-field__label", children: [
      s,
      x ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-choice-group__items", children: v.map((B) => /* @__PURE__ */ c(
      "label",
      {
        className: q("rpc-choice rpc-choice--radio", (t || B.disabled) && "rpc-choice--disabled"),
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              checked: O === B.value,
              className: "rpc-choice__native",
              disabled: t || B.disabled,
              name: C,
              onChange: () => {
                g === void 0 && w(B.value), u == null || u(B.value);
              },
              required: x,
              type: "radio",
              value: B.value
            }
          ),
          /* @__PURE__ */ e("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
          /* @__PURE__ */ c("span", { className: "rpc-choice__content", children: [
            /* @__PURE__ */ e("span", { className: "rpc-choice__label", children: B.label }),
            B.description ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: B.description }) : null
          ] })
        ]
      },
      B.value
    )) }),
    y ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: y }) : null
  ] });
}
const Na = xe(function({ className: a = "", description: t, disabled: n, error: l, helperText: s, id: b, label: i, offLabel: u = "Off", onLabel: v = "On", required: x, ...g }, f) {
  const C = oe(), $ = b ?? g.name ?? C, w = l ?? s;
  return /* @__PURE__ */ c("label", { className: q("rpc-switch", n && "rpc-switch--disabled", l && "rpc-switch--error", a), htmlFor: $, children: [
    /* @__PURE__ */ e(
      "input",
      {
        "aria-invalid": !!l || void 0,
        className: "rpc-switch__native",
        disabled: n,
        id: $,
        ref: f,
        required: x,
        type: "checkbox",
        ...g
      }
    ),
    /* @__PURE__ */ e("span", { className: "rpc-switch__track", "aria-hidden": "true", children: /* @__PURE__ */ e("span", { className: "rpc-switch__thumb" }) }),
    /* @__PURE__ */ c("span", { className: "rpc-switch__content", children: [
      i ? /* @__PURE__ */ c("span", { className: "rpc-choice__label", children: [
        i,
        x ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: t }) : null,
      /* @__PURE__ */ c("span", { className: "rpc-switch__state", children: [
        /* @__PURE__ */ e("span", { children: u }),
        /* @__PURE__ */ e("span", { children: v })
      ] }),
      w ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", l && "rpc-form-field__message--error"), children: w }) : null
    ] })
  ] });
});
function Er(r, a, t) {
  const [n, l] = A(1), [s, b] = A([]), [i, u] = A(!1), [v, x] = A(null), g = re(() => r ? ua(r) : null, [r]), f = !!(g != null && g.pageSize);
  return J(() => {
    l(1);
  }, [t, r, a]), J(() => {
    if (!g && !a) return;
    const C = new AbortController();
    return u(!0), x(null), (a ? Promise.resolve(a(t, n)) : fetch(ha(g, t, n), {
      headers: g == null ? void 0 : g.headers,
      signal: C.signal
    }).then((w) => {
      if (!w.ok) throw new Error(`Request failed ${w.status}`);
      return w.json();
    }).then((w) => {
      const O = g, y = da(w, O.dataPath);
      return (Array.isArray(y) ? y : Array.isArray(w) ? w : []).map((d) => O.mapOption ? O.mapOption(d) : pa(d));
    })).then((w) => {
      b((O) => n === 1 ? w : [...O, ...w]);
    }).catch((w) => {
      w instanceof DOMException && w.name === "AbortError" || x(w instanceof Error ? w.message : "Gagal mengambil data.");
    }).finally(() => u(!1)), () => C.abort();
  }, [g, a, n, t]), {
    canLoadMore: f,
    error: v,
    isLoading: i,
    options: s,
    setPage: l
  };
}
function Fr() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "m6 9 6 6 6-6" }) });
}
function Or({ onClear: r }) {
  return /* @__PURE__ */ e("button", { "aria-label": "Clear value", className: "rpc-select__clear", onClick: r, type: "button", children: "x" });
}
function ya({
  className: r = "",
  clearable: a = !0,
  defaultValue: t = "",
  disabled: n,
  endpoint: l,
  error: s,
  fullWidth: b = !0,
  helperText: i,
  label: u,
  loadOptions: v,
  name: x,
  onValueChange: g,
  options: f = [],
  placeholder: C = "Select option",
  searchPlaceholder: $ = "Search...",
  required: w,
  searchable: O = !0,
  value: y
}) {
  const B = oe(), d = `${x ?? B}-button`, [p, k] = A(!1), [M, D] = A(""), [_, h] = A(t), E = ie(null), R = Er(l, v, M), W = l || v ? R.options : f, V = y ?? _, S = W.find((N) => N.value === V) ?? null, P = l || v ? W : W.filter((N) => `${N.label} ${N.description ?? ""}`.toLowerCase().includes(M.toLowerCase())), K = s ?? i ?? R.error;
  J(() => {
    const N = (L) => {
      var G;
      (G = E.current) != null && G.contains(L.target) || k(!1);
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, []);
  const U = (N) => {
    const L = (N == null ? void 0 : N.value) ?? "";
    y === void 0 && h(L), g == null || g(L, N), k(!1);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-select",
        b && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        K && s && "rpc-form-field--error",
        r
      ),
      ref: E,
      children: [
        u ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: d, children: [
          u,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ e("input", { name: x, readOnly: !0, required: w, type: "hidden", value: V }),
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": p,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger",
            disabled: n,
            id: d,
            onClick: () => k((N) => !N),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: q(!S && "rpc-select__placeholder"), children: (S == null ? void 0 : S.label) ?? C }),
              a && V ? /* @__PURE__ */ e(Or, { onClear: () => U(null) }) : null,
              /* @__PURE__ */ e("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ e(Fr, {}) })
            ]
          }
        ),
        p ? /* @__PURE__ */ c("div", { className: "rpc-select__popover", children: [
          O ? /* @__PURE__ */ e(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: (N) => D(N.target.value),
              placeholder: $,
              type: "search",
              value: M
            }
          ) : null,
          /* @__PURE__ */ c("div", { className: "rpc-select__list", role: "listbox", children: [
            P.map((N) => /* @__PURE__ */ c(
              "button",
              {
                "aria-selected": N.value === V,
                className: q("rpc-select__option", N.value === V && "rpc-select__option--selected"),
                disabled: N.disabled,
                onClick: () => U(N),
                role: "option",
                type: "button",
                children: [
                  /* @__PURE__ */ e("span", { children: N.label }),
                  N.description ? /* @__PURE__ */ e("small", { children: N.description }) : null
                ]
              },
              N.value
            )),
            !R.isLoading && P.length === 0 ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            R.isLoading ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          l && R.canLoadMore ? /* @__PURE__ */ e("button", { className: "rpc-select__load", disabled: R.isLoading, onClick: () => R.setPage((N) => N + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        K ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", s && "rpc-form-field__message--error"), children: K }) : null
      ]
    }
  );
}
function wa({
  className: r = "",
  clearable: a = !0,
  defaultValue: t = [],
  disabled: n,
  endpoint: l,
  error: s,
  fullWidth: b = !0,
  helperText: i,
  label: u,
  loadOptions: v,
  maxVisibleTags: x = 3,
  name: g,
  onValueChange: f,
  options: C = [],
  placeholder: $ = "Select options",
  searchPlaceholder: w = "Search...",
  required: O,
  searchable: y = !0,
  value: B
}) {
  const d = oe(), p = `${g ?? d}-button`, [k, M] = A(!1), [D, _] = A(""), [h, E] = A(t), R = ie(null), W = Er(l, v, D), V = l || v ? W.options : C, S = B ?? h, P = S.map((m) => V.find((j) => j.value === m)).filter(Boolean), K = l || v ? V : V.filter((m) => `${m.label} ${m.description ?? ""}`.toLowerCase().includes(D.toLowerCase())), U = s ?? i ?? W.error;
  J(() => {
    const m = (j) => {
      var Z;
      (Z = R.current) != null && Z.contains(j.target) || M(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, []);
  const N = (m) => {
    const j = m.map((Z) => V.find((de) => de.value === Z)).filter(Boolean);
    B === void 0 && E(m), f == null || f(m, j);
  }, L = (m) => {
    m.disabled || N(S.includes(m.value) ? S.filter((j) => j !== m.value) : [...S, m.value]);
  }, G = (m, j) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), L(j));
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-select",
        "rpc-select--multi",
        b && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        r
      ),
      ref: R,
      children: [
        u ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: p, children: [
          u,
          O ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        S.map((m) => /* @__PURE__ */ e("input", { name: g, readOnly: !0, type: "hidden", value: m }, m)),
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": k,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger rpc-select__trigger--multi",
            disabled: n,
            id: p,
            onClick: () => M((m) => !m),
            type: "button",
            children: [
              P.length ? /* @__PURE__ */ c("span", { className: "rpc-select__tags", children: [
                P.slice(0, x).map((m) => /* @__PURE__ */ e("span", { className: "rpc-select__tag", children: m.label }, m.value)),
                P.length > x ? /* @__PURE__ */ c("span", { className: "rpc-select__tag", children: [
                  "+",
                  P.length - x
                ] }) : null
              ] }) : /* @__PURE__ */ e("span", { className: "rpc-select__placeholder", children: $ }),
              a && S.length ? /* @__PURE__ */ e(Or, { onClear: () => N([]) }) : null,
              /* @__PURE__ */ e("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ e(Fr, {}) })
            ]
          }
        ),
        k ? /* @__PURE__ */ c("div", { className: "rpc-select__popover", children: [
          y ? /* @__PURE__ */ e(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: (m) => _(m.target.value),
              placeholder: w,
              type: "search",
              value: D
            }
          ) : null,
          /* @__PURE__ */ c("div", { className: "rpc-select__list", role: "listbox", "aria-multiselectable": "true", children: [
            K.map((m) => /* @__PURE__ */ c(
              "button",
              {
                "aria-selected": S.includes(m.value),
                className: q("rpc-select__option", S.includes(m.value) && "rpc-select__option--selected"),
                disabled: m.disabled,
                onClick: () => L(m),
                onKeyDown: (j) => G(j, m),
                role: "option",
                type: "button",
                children: [
                  /* @__PURE__ */ e("span", { children: m.label }),
                  m.description ? /* @__PURE__ */ e("small", { children: m.description }) : null
                ]
              },
              m.value
            )),
            !W.isLoading && K.length === 0 ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            W.isLoading ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          l && W.canLoadMore ? /* @__PURE__ */ e("button", { className: "rpc-select__load", disabled: W.isLoading, onClick: () => W.setPage((m) => m + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        U ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", s && "rpc-form-field__message--error"), children: U }) : null
      ]
    }
  );
}
const ka = new Intl.DateTimeFormat("en", { weekday: "short" }), xa = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });
function tr(r) {
  if (!r) return null;
  const a = /* @__PURE__ */ new Date(`${r}T00:00:00`);
  return Number.isNaN(a.getTime()) ? null : a;
}
function Sa(r) {
  const a = String(r.getMonth() + 1).padStart(2, "0"), t = String(r.getDate()).padStart(2, "0");
  return `${r.getFullYear()}-${a}-${t}`;
}
function Ca(r, a) {
  return !!(r && a && r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth() && r.getDate() === a.getDate());
}
function nr({
  className: r = "",
  clearable: a = !0,
  defaultValue: t,
  disabled: n,
  disabledDate: l,
  error: s,
  fullWidth: b = !0,
  helperText: i,
  id: u,
  label: v,
  maxDate: x,
  minDate: g,
  name: f,
  onValueChange: C,
  placeholder: $ = "YYYY-MM-DD",
  required: w,
  value: O,
  ...y
}) {
  const B = oe(), d = u ?? f ?? B, [p, k] = A(!1), [M, D] = A(String(t ?? "")), _ = O ?? M, h = tr(_), [E, R] = A(() => h ?? /* @__PURE__ */ new Date()), W = ie(null), V = tr(g), S = tr(x);
  J(() => {
    const L = (G) => {
      var m;
      (m = W.current) != null && m.contains(G.target) || k(!1);
    };
    return document.addEventListener("mousedown", L), () => document.removeEventListener("mousedown", L);
  }, []), J(() => {
    h && R(h);
  }, [_]);
  const P = re(() => {
    const L = new Date(E.getFullYear(), E.getMonth(), 1), G = new Date(E.getFullYear(), E.getMonth() + 1, 0), m = L.getDay(), j = [];
    for (let Z = 0; Z < m; Z += 1)
      j.push(new Date(L.getFullYear(), L.getMonth(), Z - m + 1));
    for (let Z = 1; Z <= G.getDate(); Z += 1)
      j.push(new Date(L.getFullYear(), L.getMonth(), Z));
    for (; j.length % 7 !== 0; ) {
      const Z = j[j.length - 1];
      j.push(new Date(Z.getFullYear(), Z.getMonth(), Z.getDate() + 1));
    }
    return j;
  }, [E]), K = re(() => {
    const L = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (G, m) => ka.format(new Date(L.getFullYear(), L.getMonth(), L.getDate() + m)).slice(0, 2));
  }, []), U = (L) => V && L < V || S && L > S ? !0 : (l == null ? void 0 : l(L)) ?? !1, N = (L) => {
    O === void 0 && D(L), C == null || C(L);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-date-picker",
        b && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        s && "rpc-form-field--error",
        r
      ),
      ref: W,
      children: [
        v ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: d, children: [
          v,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c("span", { className: "rpc-input-wrap", children: [
          /* @__PURE__ */ e(
            "input",
            {
              "aria-expanded": p,
              "aria-haspopup": "dialog",
              "aria-invalid": !!s || void 0,
              className: "rpc-form-input",
              disabled: n,
              id: d,
              max: x,
              min: g,
              name: f,
              onChange: (L) => N(L.target.value),
              onFocus: () => k(!0),
              placeholder: $,
              required: w,
              type: "text",
              value: _,
              ...y
            }
          ),
          a && _ ? /* @__PURE__ */ e("button", { "aria-label": "Clear date", className: "rpc-select__clear", onClick: () => N(""), type: "button", children: "x" }) : null,
          /* @__PURE__ */ e("button", { "aria-label": "Open calendar", className: "rpc-date-picker__button", disabled: n, onClick: () => k((L) => !L), type: "button", children: /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e("rect", { x: "3", y: "4", width: "18", height: "18", rx: "3" }),
            /* @__PURE__ */ e("path", { d: "M8 2v4M16 2v4M3 10h18" })
          ] }) })
        ] }),
        p ? /* @__PURE__ */ c("div", { className: "rpc-date-picker__calendar", role: "dialog", "aria-label": "Choose date", children: [
          /* @__PURE__ */ c("div", { className: "rpc-date-picker__header", children: [
            /* @__PURE__ */ e("button", { onClick: () => R(new Date(E.getFullYear(), E.getMonth() - 1, 1)), type: "button", children: "‹" }),
            /* @__PURE__ */ e("strong", { children: xa.format(E) }),
            /* @__PURE__ */ e("button", { onClick: () => R(new Date(E.getFullYear(), E.getMonth() + 1, 1)), type: "button", children: "›" })
          ] }),
          /* @__PURE__ */ c("div", { className: "rpc-date-picker__grid", children: [
            K.map((L) => /* @__PURE__ */ e("span", { className: "rpc-date-picker__weekday", children: L }, L)),
            P.map((L) => {
              const G = Sa(L), m = L.getMonth() !== E.getMonth();
              return /* @__PURE__ */ e(
                "button",
                {
                  className: q(
                    "rpc-date-picker__day",
                    m && "rpc-date-picker__day--outside",
                    Ca(L, h) && "rpc-date-picker__day--selected"
                  ),
                  disabled: U(L),
                  onClick: () => {
                    N(G), k(!1);
                  },
                  type: "button",
                  children: L.getDate()
                },
                G
              );
            })
          ] })
        ] }) : null,
        s ?? i ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", s && "rpc-form-field__message--error"), children: s ?? i }) : null
      ]
    }
  );
}
function Sr(r) {
  return r < 1024 * 1024 ? `${Math.round(r / 1024)} KB` : `${(r / (1024 * 1024)).toFixed(1)} MB`;
}
function Ma(r, a) {
  return a ? a.split(",").map((n) => n.trim()).filter(Boolean).some((n) => n.endsWith("/*") ? r.type.startsWith(n.replace("/*", "/")) : n.startsWith(".") ? r.name.toLowerCase().endsWith(n.toLowerCase()) : r.type === n) : !0;
}
function $a({
  accept: r,
  className: a = "",
  description: t = "Drag file ke sini atau klik untuk memilih file.",
  disabled: n,
  error: l,
  files: s,
  fullWidth: b = !0,
  helperText: i,
  id: u,
  label: v,
  maxFileSize: x,
  multiple: g = !0,
  name: f,
  onFilesChange: C,
  progress: $,
  required: w,
  ...O
}) {
  const y = oe(), B = u ?? f ?? y, d = ie(null), [p, k] = A(!1), [M, D] = A([]), [_, h] = A(null), E = s ?? M, R = E.map((N) => ({
    file: N,
    url: N.type.startsWith("image/") ? URL.createObjectURL(N) : null
  }));
  J(() => () => R.forEach((N) => N.url && URL.revokeObjectURL(N.url)), [E]);
  const W = (N) => {
    s === void 0 && D(N), C == null || C(N);
  }, V = (N) => {
    const L = [], G = [];
    return N.forEach((m) => {
      if (x && m.size > x) {
        G.push(`${m.name} melebihi ${Sr(x)}.`);
        return;
      }
      if (!Ma(m, r)) {
        G.push(`${m.name} tidak sesuai tipe file.`);
        return;
      }
      L.push(m);
    }), h(G[0] ?? null), L;
  }, S = (N) => {
    const L = V(Array.from(N));
    L.length && W(g ? [...E, ...L] : L.slice(0, 1));
  }, P = (N) => {
    W(E.filter((L) => L.name !== N));
  }, K = (N) => typeof $ == "number" ? $ : ($ == null ? void 0 : $[N.name]) ?? 0, U = l ?? _ ?? i;
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-upload",
        b && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        (l || _) && "rpc-form-field--error",
        a
      ),
      children: [
        v ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: B, children: [
          v,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c(
          "button",
          {
            className: q("rpc-upload__dropzone", p && "rpc-upload__dropzone--dragging"),
            disabled: n,
            onClick: () => {
              var N;
              return (N = d.current) == null ? void 0 : N.click();
            },
            onDragEnter: (N) => {
              N.preventDefault(), k(!0);
            },
            onDragLeave: (N) => {
              N.preventDefault(), k(!1);
            },
            onDragOver: (N) => N.preventDefault(),
            onDrop: (N) => {
              N.preventDefault(), k(!1), S(N.dataTransfer.files);
            },
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: "rpc-upload__icon", "aria-hidden": "true", children: "↑" }),
              /* @__PURE__ */ e("strong", { children: "Upload file" }),
              /* @__PURE__ */ e("span", { children: t }),
              r ? /* @__PURE__ */ c("small", { children: [
                "Allowed: ",
                r
              ] }) : null
            ]
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            accept: r,
            className: "rpc-upload__input",
            disabled: n,
            id: B,
            multiple: g,
            name: f,
            onChange: (N) => {
              N.target.files && S(N.target.files), N.target.value = "";
            },
            ref: d,
            required: w,
            type: "file",
            ...O
          }
        ),
        E.length ? /* @__PURE__ */ e("ul", { className: "rpc-upload__list", children: R.map(({ file: N, url: L }) => /* @__PURE__ */ c("li", { className: "rpc-upload__item", children: [
          L ? /* @__PURE__ */ e("img", { alt: N.name, src: L }) : /* @__PURE__ */ e("span", { className: "rpc-upload__file-icon", children: "FILE" }),
          /* @__PURE__ */ c("span", { className: "rpc-upload__meta", children: [
            /* @__PURE__ */ e("strong", { children: N.name }),
            /* @__PURE__ */ e("small", { children: Sr(N.size) }),
            K(N) > 0 ? /* @__PURE__ */ e("span", { className: "rpc-upload__progress", children: /* @__PURE__ */ e("span", { style: { width: `${Math.min(100, K(N))}%` } }) }) : null
          ] }),
          /* @__PURE__ */ e("button", { "aria-label": `Remove ${N.name}`, onClick: () => P(N.name), type: "button", children: "x" })
        ] }, `${N.name}-${N.lastModified}`)) }) : null,
        U ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", (l || _) && "rpc-form-field__message--error"), children: U }) : null
      ]
    }
  );
}
function Pa(r, a) {
  return r === "checkbox" || r === "switch" ? !1 : r === "range" || r === "rating" ? 0 : r === "date-range" ? { start: "", end: "" } : r === "file" ? a ? [] : null : r === "select" && a ? [] : "";
}
function Ia(r, a) {
  var t;
  return r[a.name] ?? Pa(a.kind, (t = a.props) == null ? void 0 : t.multiple);
}
function La(r) {
  const a = [], t = /* @__PURE__ */ new Map();
  return r.forEach((n, l) => {
    const s = n.row ?? `__single_${l}`, b = t.get(s);
    if (b) {
      b.fields.push(n);
      return;
    }
    const i = { id: s, fields: [n] };
    t.set(s, i), a.push(i);
  }), a;
}
function lr({
  error: r,
  field: a,
  type: t,
  value: n,
  onChange: l
}) {
  const s = a.props ?? {};
  return /* @__PURE__ */ c("label", { className: q("rpc-form-field", s.className, r && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
      a.label,
      s.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("span", { className: q("rpc-input-wrap", t === "color" && "rpc-input-wrap--color"), children: /* @__PURE__ */ e(
      "input",
      {
        className: q("rpc-form-input", s.inputClassName),
        disabled: s.disabled,
        max: typeof s.max == "string" ? s.max : void 0,
        min: typeof s.min == "string" ? s.min : void 0,
        name: a.name,
        onChange: (b) => l(b.target.value),
        placeholder: s.placeholder,
        required: s.required,
        type: t,
        value: n
      }
    ) }),
    r ?? s.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? s.hint }) : null
  ] });
}
function Aa({
  error: r,
  field: a,
  value: t,
  onChange: n
}) {
  const l = a.props ?? {}, s = l.length ?? 6, b = t.padEnd(s, " ").slice(0, s).split("");
  return /* @__PURE__ */ c("label", { className: q("rpc-form-field", l.className, r && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
      a.label,
      l.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("span", { className: "rpc-form-otp", role: "group", "aria-label": typeof a.label == "string" ? a.label : a.name, children: b.map((i, u) => /* @__PURE__ */ e(
      "input",
      {
        "aria-label": `Digit ${u + 1}`,
        className: q("rpc-form-otp__input", l.inputClassName),
        disabled: l.disabled,
        inputMode: "numeric",
        maxLength: 1,
        onChange: (v) => {
          const x = b.map((g) => g.trim());
          x[u] = v.target.value.slice(-1), n(x.join("").slice(0, s)), v.currentTarget.nextElementSibling instanceof HTMLInputElement && v.target.value && v.currentTarget.nextElementSibling.focus();
        },
        required: l.required,
        value: i.trim()
      },
      `${a.name}-${u}`
    )) }),
    r ?? l.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? l.hint }) : null
  ] });
}
function Ba({
  error: r,
  field: a,
  value: t,
  onChange: n
}) {
  const l = a.props ?? {};
  return /* @__PURE__ */ c("label", { className: q("rpc-form-field", "rpc-form-range", l.className, r && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
      a.label,
      l.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ c("span", { className: "rpc-form-range__top", children: [
      /* @__PURE__ */ e(
        "input",
        {
          disabled: l.disabled,
          max: Number(l.max ?? 100),
          min: Number(l.min ?? 0),
          name: a.name,
          onChange: (s) => n(Number(s.target.value)),
          required: l.required,
          step: l.step ?? 1,
          type: "range",
          value: t
        }
      ),
      /* @__PURE__ */ e("strong", { children: t })
    ] }),
    r ?? l.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? l.hint }) : null
  ] });
}
function Da({
  error: r,
  field: a,
  value: t,
  onChange: n
}) {
  const l = a.props ?? {}, s = Number(l.max ?? 5);
  return /* @__PURE__ */ c("div", { className: q("rpc-form-field", l.className, r && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
      a.label,
      l.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-form-rating", role: "radiogroup", "aria-label": typeof a.label == "string" ? a.label : a.name, children: Array.from({ length: s }, (b, i) => {
      const u = i + 1;
      return /* @__PURE__ */ e(
        "button",
        {
          "aria-checked": t === u,
          className: q("rpc-form-rating__item", u <= t && "rpc-form-rating__item--active"),
          disabled: l.disabled,
          onClick: () => n(u),
          role: "radio",
          type: "button",
          children: "★"
        },
        u
      );
    }) }),
    r ?? l.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? l.hint }) : null
  ] });
}
function Pt({
  actions: r,
  className: a = "",
  columns: t = 2,
  defaultValues: n,
  errors: l,
  fields: s,
  onReset: b,
  onSubmit: i,
  onValuesChange: u,
  resetLabel: v = "Reset",
  showActions: x = !0,
  submitLabel: g = "Submit",
  values: f
}) {
  const [C, $] = A(n ?? {}), w = re(() => ({ ...C, ...f }), [C, f]), O = re(() => La(s), [s]), y = (d, p) => {
    const k = {
      ...w,
      [d]: p
    };
    f || $(k), u == null || u(k, d, p);
  }, B = (d) => {
    const p = d.props ?? {}, k = Ia(w, d), M = l == null ? void 0 : l[d.name], D = p.hint, _ = {
      className: p.className,
      disabled: p.disabled,
      error: M,
      helperText: D,
      inputClassName: p.inputClassName,
      label: d.label,
      name: d.name,
      placeholder: p.placeholder,
      required: p.required
    };
    if (d.render)
      return d.render({
        error: M,
        field: d,
        setValue: (h) => y(d.name, h),
        value: k,
        values: w
      });
    if (d.kind === "textarea")
      return /* @__PURE__ */ e(
        ba,
        {
          ..._,
          maxLength: typeof p.max == "number" ? p.max : void 0,
          onChange: (h) => y(d.name, h.target.value),
          rows: p.rows,
          value: String(k ?? "")
        }
      );
    if (d.kind === "otp")
      return /* @__PURE__ */ e(Aa, { error: M, field: d, onChange: (h) => y(d.name, h), value: String(k ?? "") });
    if (d.kind === "checkbox")
      return /* @__PURE__ */ e(
        Dr,
        {
          checked: !!k,
          description: p.description,
          disabled: p.disabled,
          error: M,
          label: d.label,
          name: d.name,
          onChange: (h) => y(d.name, h.target.checked),
          required: p.required
        }
      );
    if (d.kind === "switch")
      return /* @__PURE__ */ e(
        Na,
        {
          checked: !!k,
          description: p.description,
          disabled: p.disabled,
          error: M,
          label: d.label,
          name: d.name,
          onChange: (h) => y(d.name, h.target.checked),
          required: p.required
        }
      );
    if (d.kind === "radio")
      return /* @__PURE__ */ e(
        va,
        {
          ..._,
          onValueChange: (h) => y(d.name, h),
          options: d.options ?? [],
          value: String(k ?? "")
        }
      );
    if (d.kind === "range")
      return /* @__PURE__ */ e(Ba, { error: M, field: d, onChange: (h) => y(d.name, h), value: Number(k ?? 0) });
    if (d.kind === "rating")
      return /* @__PURE__ */ e(Da, { error: M, field: d, onChange: (h) => y(d.name, h), value: Number(k ?? 0) });
    if (d.kind === "color")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "color", value: String(k || "#2563eb") });
    if (d.kind === "date")
      return /* @__PURE__ */ e(
        nr,
        {
          ..._,
          maxDate: typeof p.max == "string" ? p.max : void 0,
          minDate: typeof p.min == "string" ? p.min : void 0,
          onValueChange: (h) => y(d.name, h),
          value: String(k ?? "")
        }
      );
    if (d.kind === "time")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "time", value: String(k ?? "") });
    if (d.kind === "datetime")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "datetime-local", value: String(k ?? "") });
    if (d.kind === "date-range") {
      const h = k && typeof k == "object" ? k : {};
      return /* @__PURE__ */ c("div", { className: q("rpc-form-field", p.className, M && "rpc-form-field--error"), children: [
        d.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
          d.label,
          p.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-form-date-range", children: [
          /* @__PURE__ */ e(
            nr,
            {
              maxDate: typeof p.max == "string" ? p.max : void 0,
              minDate: typeof p.min == "string" ? p.min : void 0,
              onValueChange: (E) => y(d.name, { ...h, start: E }),
              placeholder: "Start date",
              value: h.start ?? ""
            }
          ),
          /* @__PURE__ */ e(
            nr,
            {
              maxDate: typeof p.max == "string" ? p.max : void 0,
              minDate: h.start || (typeof p.min == "string" ? p.min : void 0),
              onValueChange: (E) => y(d.name, { ...h, end: E }),
              placeholder: "End date",
              value: h.end ?? ""
            }
          )
        ] }),
        M ?? D ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", M && "rpc-form-field__message--error"), children: M ?? D }) : null
      ] });
    }
    if (d.kind === "select")
      return p.multiple ? /* @__PURE__ */ e(
        wa,
        {
          ..._,
          loadOptions: d.loadOptions,
          onValueChange: (h) => y(d.name, h),
          options: d.options,
          searchPlaceholder: p.searchPlaceholder,
          searchable: p.searchable,
          value: Array.isArray(k) ? k.map(String) : []
        }
      ) : /* @__PURE__ */ e(
        ya,
        {
          ..._,
          loadOptions: d.loadOptions,
          onValueChange: (h) => y(d.name, h),
          options: d.options,
          searchPlaceholder: p.searchPlaceholder,
          searchable: p.searchable,
          value: String(k ?? "")
        }
      );
    if (d.kind === "file") {
      const h = Array.isArray(k) ? k : k instanceof File ? [k] : [];
      return /* @__PURE__ */ e(
        $a,
        {
          accept: p.accept,
          disabled: p.disabled,
          error: M,
          files: h,
          helperText: D,
          label: d.label,
          multiple: p.multiple,
          name: d.name,
          onFilesChange: (E) => y(d.name, p.multiple ? E : E[0] ?? null),
          required: p.required
        }
      );
    }
    return p.type === "number" ? /* @__PURE__ */ e(
      fa,
      {
        ..._,
        max: typeof p.max == "number" ? p.max : void 0,
        min: typeof p.min == "number" ? p.min : void 0,
        onValueChange: (h) => y(d.name, h),
        step: p.step,
        value: typeof k == "number" || typeof k == "string" ? k : ""
      }
    ) : p.type === "password" && p.allowPasswordToggle !== !1 ? /* @__PURE__ */ e(
      ga,
      {
        ..._,
        onChange: (h) => y(d.name, h.target.value),
        showStrength: !0,
        value: String(k ?? "")
      }
    ) : p.type === "email" ? /* @__PURE__ */ e(
      _a,
      {
        ..._,
        onChange: (h) => y(d.name, h.target.value),
        value: String(k ?? "")
      }
    ) : /* @__PURE__ */ e(
      hr,
      {
        ..._,
        onChange: (h) => y(d.name, h.target.value),
        type: p.type === "search" || p.type === "url" || p.type === "tel" ? p.type : "text",
        value: String(k ?? "")
      }
    );
  };
  return /* @__PURE__ */ c(
    "form",
    {
      className: q("rpc-form-builder", a),
      onReset: (d) => {
        d.preventDefault(), $(n ?? {}), b == null || b();
      },
      onSubmit: (d) => {
        d.preventDefault(), i == null || i(w, d);
      },
      style: { "--rpc-form-builder-columns": t },
      children: [
        O.map((d) => /* @__PURE__ */ e("div", { className: "rpc-form-builder__row", children: d.fields.map((p) => /* @__PURE__ */ e("div", { className: "rpc-form-builder__field", children: B(p) }, p.name)) }, d.id)),
        x ? /* @__PURE__ */ e("div", { className: "rpc-form-builder__actions", children: r ?? /* @__PURE__ */ c(ke, { children: [
          /* @__PURE__ */ e("button", { className: "rpc-form-builder__button rpc-form-builder__button--ghost", type: "reset", children: v }),
          /* @__PURE__ */ e("button", { className: "rpc-form-builder__button", type: "submit", children: g })
        ] }) }) : null
      ]
    }
  );
}
function Ge(...r) {
  return r.filter(Boolean).join(" ");
}
function Cr(r, a) {
  return typeof r == "string" ? r : a;
}
function Mr(...r) {
  const a = /* @__PURE__ */ new Set();
  return r.forEach((t) => {
    t == null || t.forEach((n) => a.add(n));
  }), Array.from(a);
}
function Rr(r, a = /* @__PURE__ */ new Set()) {
  return r.forEach((t) => {
    var n, l;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.add(t.id), (l = t.children) != null && l.length && Rr(t.children, a);
  }), a;
}
function Tr(r, a) {
  var t;
  for (const n of r) {
    if (n.id === a)
      return n;
    if ((t = n.children) != null && t.length) {
      const l = Tr(n.children, a);
      if (l)
        return l;
    }
  }
  return null;
}
function Ea({ isOpen: r }) {
  return r ? /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ e("path", { d: "M3 10h18", opacity: ".55" })
  ] }) : /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ e("path", { d: "M3 9.5h18", opacity: ".55" })
  ] });
}
function Fa() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M7 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" }),
    /* @__PURE__ */ e("path", { d: "M13 3.5V8h4.5" }),
    /* @__PURE__ */ e("path", { d: "M8 12.5h8M8 16h8", opacity: ".55" })
  ] });
}
function Oa({ isOpen: r }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: Ge("rpc-file-tree__chevron-icon", r && "rpc-file-tree__chevron-icon--open"),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ e("path", { d: "m8 10 4 4 4-4" })
    }
  );
}
function jr({
  nodes: r,
  depth: a,
  selectedId: t,
  openSet: n,
  showLines: l,
  density: s,
  indent: b,
  onToggle: i,
  onSelect: u,
  onNodeClick: v,
  renderLabel: x,
  renderIcon: g
}) {
  return /* @__PURE__ */ e("ul", { className: Ge("rpc-file-tree__list", l && "rpc-file-tree__list--lines"), role: "group", children: r.map((f) => {
    var _;
    const C = !!((_ = f.children) != null && _.length), $ = C && n.has(f.id), w = t === f.id, y = {
      depth: a,
      hasChildren: C,
      isOpen: $,
      isSelected: w,
      isLeaf: !C
    }, B = x ? x(f, y) : f.label, d = g ? g(f, y) : f.icon ?? (C ? /* @__PURE__ */ e(Ea, { isOpen: $ }) : /* @__PURE__ */ e(Fa, {})), p = Ge(
      "rpc-file-tree__row",
      `rpc-file-tree__row--${s}`,
      C && "rpc-file-tree__row--branch",
      w && "rpc-file-tree__row--selected",
      f.disabled && "rpc-file-tree__row--disabled"
    ), k = /* @__PURE__ */ c(ke, { children: [
      /* @__PURE__ */ e("span", { className: "rpc-file-tree__icon", "aria-hidden": "true", children: d }),
      /* @__PURE__ */ c("span", { className: "rpc-file-tree__text", children: [
        /* @__PURE__ */ e("span", { className: "rpc-file-tree__label", children: B }),
        f.description ? /* @__PURE__ */ e("span", { className: "rpc-file-tree__description", children: f.description }) : null
      ] })
    ] }), M = {
      "aria-disabled": f.disabled || void 0,
      "aria-expanded": C && $ || void 0,
      "aria-level": a + 1,
      "aria-selected": w || void 0,
      className: p,
      role: "treeitem",
      onClick: () => {
        var h;
        f.disabled || (u(f), v == null || v(f), (h = f.onClick) == null || h.call(f, f));
      }
    }, D = f.href ? /* @__PURE__ */ e(
      "a",
      {
        ...M,
        href: f.disabled ? void 0 : f.href,
        rel: f.rel,
        target: f.target,
        children: k
      }
    ) : /* @__PURE__ */ e("button", { ...M, disabled: f.disabled, type: "button", children: k });
    return /* @__PURE__ */ c("li", { className: "rpc-file-tree__item", role: "none", children: [
      /* @__PURE__ */ c("div", { className: "rpc-file-tree__row-wrap", style: { paddingLeft: a * b }, children: [
        C ? /* @__PURE__ */ e(
          "button",
          {
            "aria-expanded": $,
            "aria-label": $ ? `Collapse ${Cr(f.label, f.id)}` : `Expand ${Cr(f.label, f.id)}`,
            className: "rpc-file-tree__toggle",
            disabled: f.disabled,
            onClick: () => i(f),
            type: "button",
            children: /* @__PURE__ */ e(Oa, { isOpen: $ })
          }
        ) : /* @__PURE__ */ e("span", { className: "rpc-file-tree__toggle rpc-file-tree__toggle--spacer", "aria-hidden": "true" }),
        D
      ] }),
      C && $ ? /* @__PURE__ */ e("div", { className: "rpc-file-tree__children", children: /* @__PURE__ */ e(
        jr,
        {
          density: s,
          indent: b,
          nodes: f.children ?? [],
          onNodeClick: v,
          onSelect: u,
          onToggle: i,
          openSet: n,
          renderIcon: g,
          renderLabel: x,
          selectedId: t,
          showLines: l,
          depth: a + 1
        }
      ) }) : null
    ] }, f.id);
  }) });
}
function It({
  nodes: r,
  title: a,
  description: t,
  ariaLabel: n,
  defaultOpenIds: l,
  openIds: s,
  onOpenChange: b,
  defaultSelectedId: i = null,
  selectedId: u,
  onSelectedChange: v,
  onNodeClick: x,
  showLines: g = !0,
  density: f = "comfortable",
  indent: C = 20,
  renderLabel: $,
  renderIcon: w,
  className: O = "",
  ...y
}) {
  const B = re(
    () => Mr(l, Array.from(Rr(r))),
    [l, r]
  ), [d, p] = A(B), [k, M] = A(i), D = s ?? d, _ = u ?? k, h = re(() => new Set(D), [D]), E = !!(a || t), R = (P) => {
    s === void 0 && p(P), b == null || b(P);
  }, W = (P) => {
    u === void 0 && M(P), v == null || v(P, P ? Tr(r, P) : null);
  }, V = (P) => {
    var U;
    if (!((U = P.children) != null && U.length) || P.disabled)
      return;
    const K = h.has(P.id) ? D.filter((N) => N !== P.id) : Mr(D, [P.id]);
    R(K);
  }, S = (P) => {
    P.disabled || W(P.id);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      ...y,
      "aria-label": n ?? (typeof a == "string" ? a : "File tree"),
      className: Ge("rpc-file-tree", f === "compact" && "rpc-file-tree--compact", !g && "rpc-file-tree--no-lines", O),
      role: "tree",
      children: [
        E ? /* @__PURE__ */ c("div", { className: "rpc-file-tree__header", children: [
          a ? /* @__PURE__ */ e("h3", { className: "rpc-file-tree__title", children: a }) : null,
          t ? /* @__PURE__ */ e("p", { className: "rpc-file-tree__description-text", children: t }) : null
        ] }) : null,
        /* @__PURE__ */ e(
          jr,
          {
            density: f,
            indent: C,
            nodes: r,
            onNodeClick: x,
            onSelect: S,
            onToggle: V,
            openSet: h,
            renderIcon: w,
            renderLabel: $,
            selectedId: _,
            showLines: g,
            depth: 0
          }
        )
      ]
    }
  );
}
function $r(...r) {
  return r.filter(Boolean).join(" ");
}
function Ra() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ e("path", { d: "M12 5v14M5 12h14", strokeLinecap: "round" }) });
}
function Ta({ label: r }) {
  const a = typeof r == "string" && r.trim() ? r.trim().slice(0, 1).toUpperCase() : "•";
  return /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "rpc-bottom-nav__fallback-icon", children: a });
}
function ja(r) {
  return typeof r.name == "string" && r.name.trim() ? r.name.trim() : typeof r.ariaLabel == "string" && r.ariaLabel.trim() ? r.ariaLabel.trim() : `Navigation item ${r.id}`;
}
function Lt({
  items: r,
  activeId: a,
  defaultActiveId: t = null,
  onActiveChange: n,
  ariaLabel: l = "Bottom navigation",
  showLabels: s = !0,
  placement: b = "inline",
  maxWidth: i = "720px",
  background: u = "var(--rpc-color-surface)",
  borderColor: v = "var(--rpc-color-border)",
  textColor: x = "var(--rpc-color-text)",
  mutedColor: g = "var(--rpc-color-muted)",
  activeColor: f = "var(--rpc-color-primary)",
  activeTextColor: C = "#ffffff",
  className: $ = "",
  style: w,
  ...O
}) {
  const y = re(
    () => {
      var _;
      return a ?? t ?? ((_ = r.find((h) => h.active)) == null ? void 0 : _.id) ?? null;
    },
    [a, t, r]
  ), [B, d] = A(y), p = a !== void 0, k = p ? a ?? null : B;
  J(() => {
    var _;
    if (!p && k && !r.some((h) => h.id === k)) {
      const h = t ?? ((_ = r.find((E) => E.active)) == null ? void 0 : _.id) ?? null;
      d(h);
    }
  }, [k, t, p, r]);
  const M = (_) => {
    var h;
    p || d(_.id), n == null || n(_.id, _), (h = _.onClick) == null || h.call(_);
  }, D = {
    "--rpc-bottom-nav-active": f,
    "--rpc-bottom-nav-active-text": C,
    "--rpc-bottom-nav-bg": u,
    "--rpc-bottom-nav-border": v,
    "--rpc-bottom-nav-max-width": i,
    "--rpc-bottom-nav-muted": g,
    "--rpc-bottom-nav-text": x,
    ...w
  };
  return /* @__PURE__ */ e(
    "nav",
    {
      "aria-label": l,
      className: $r("rpc-bottom-nav", b === "fixed" && "rpc-bottom-nav--fixed", $),
      style: D,
      ...O,
      children: /* @__PURE__ */ e("ul", { className: "rpc-bottom-nav__list", children: r.map((_) => {
        const h = k === _.id, E = ja(_), R = $r(
          "rpc-bottom-nav__item",
          h && "rpc-bottom-nav__item--active",
          _.disabled && "rpc-bottom-nav__item--disabled"
        ), W = h ? _.activeIcon ?? /* @__PURE__ */ e(Ra, {}) : _.icon ?? /* @__PURE__ */ e(Ta, { label: _.name }), V = _.ariaLabel ?? E, S = s && !h;
        if (_.href || _.url) {
          const P = _.href ?? _.url ?? "#";
          return /* @__PURE__ */ e("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ c(
            "a",
            {
              "aria-current": h ? "page" : void 0,
              "aria-label": V,
              className: R,
              href: _.disabled ? void 0 : P,
              onClick: (K) => {
                if (_.disabled) {
                  K.preventDefault();
                  return;
                }
                M(_);
              },
              children: [
                /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__icon", children: W }),
                S ? /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__label", children: _.name }) : /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: E })
              ]
            }
          ) }, _.id);
        }
        return /* @__PURE__ */ e("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ c(
          "button",
          {
            "aria-current": h ? "page" : void 0,
            "aria-label": V,
            className: R,
            disabled: _.disabled,
            onClick: () => M(_),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__icon", children: W }),
              S ? /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__label", children: _.name }) : /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: E })
            ]
          }
        ) }, _.id);
      }) })
    }
  );
}
function mr(...r) {
  return r.filter(Boolean).join(" ");
}
const Vr = Lr(null);
function fr() {
  return Ar(Vr);
}
function Va() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function Wa() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M15 5v14" })
  ] });
}
function Ha({
  aside: r,
  asideOpen: a,
  asideWidth: t = "320px",
  children: n,
  className: l = "",
  defaultAsideOpen: s = !1,
  defaultSidebarOpen: b = !0,
  navbar: i,
  navbarHeight: u = "64px",
  onAsideOpenChange: v,
  onSidebarOpenChange: x,
  sidebar: g,
  sidebarOpen: f,
  sidebarWidth: C = "280px",
  style: $,
  ...w
}) {
  const [O, y] = A(b), [B, d] = A(s), p = f !== void 0, k = a !== void 0, M = p ? !!f : O, D = k ? !!a : B, _ = (W) => {
    p || y(W), x == null || x(W);
  }, h = (W) => {
    k || d(W), v == null || v(W);
  }, E = re(
    () => ({
      asideOpen: D,
      closeAside: () => h(!1),
      closeSidebar: () => _(!1),
      openAside: () => h(!0),
      openSidebar: () => _(!0),
      sidebarOpen: M,
      toggleAside: () => h(!D),
      toggleSidebar: () => _(!M)
    }),
    [D, M]
  ), R = {
    "--rpc-app-layout-aside-width": t,
    "--rpc-app-layout-aside-track": r && D ? t : "0px",
    "--rpc-app-layout-navbar-height": u,
    "--rpc-app-layout-sidebar-track": g && M ? C : "0px",
    "--rpc-app-layout-sidebar-width": C,
    ...$
  };
  return /* @__PURE__ */ e(Vr.Provider, { value: E, children: /* @__PURE__ */ c(
    "div",
    {
      className: mr(
        "rpc-app-layout",
        M && "rpc-app-layout--sidebar-open",
        D && "rpc-app-layout--aside-open",
        l
      ),
      style: R,
      ...w,
      children: [
        /* @__PURE__ */ c("div", { className: "rpc-app-layout__body", children: [
          g ? /* @__PURE__ */ e("aside", { className: "rpc-app-layout__sidebar", "aria-label": "Application sidebar", children: g }) : null,
          /* @__PURE__ */ c("div", { className: "rpc-app-layout__workspace", children: [
            i ? /* @__PURE__ */ e("div", { className: "rpc-app-layout__navbar", children: i }) : null,
            /* @__PURE__ */ e("main", { className: "rpc-app-layout__main", children: n })
          ] }),
          r ? /* @__PURE__ */ e("aside", { className: "rpc-app-layout__aside", "aria-label": "Application details panel", children: r }) : null
        ] }),
        /* @__PURE__ */ e("button", { className: "rpc-app-layout__overlay", onClick: () => _(!1), type: "button", "aria-label": "Close sidebar" }),
        /* @__PURE__ */ e("button", { className: "rpc-app-layout__aside-overlay", onClick: () => h(!1), type: "button", "aria-label": "Close aside panel" })
      ]
    }
  ) });
}
function qa({ className: r = "", icon: a, label: t = "Toggle menu", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: mr("rpc-app-layout__trigger", r),
      onClick: (b) => {
        s == null || s.toggleSidebar(), n == null || n(b);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(Va, {})
    }
  );
}
function Ka({ className: r = "", icon: a, label: t = "Toggle details panel", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.asideOpen,
      className: mr("rpc-app-layout__trigger", r),
      onClick: (b) => {
        s == null || s.toggleAside(), n == null || n(b);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(Wa, {})
    }
  );
}
const At = Object.assign(Ha, {
  AsideTrigger: Ka,
  MenuToggle: qa
});
function ge(...r) {
  return r.filter(Boolean).join(" ");
}
function Pr(r) {
  return Array.from(new Set(r));
}
function Wr(r, a = []) {
  return r.forEach((t) => {
    var n, l;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.push(t.id), (l = t.children) != null && l.length && Wr(t.children, a);
  }), a;
}
function Hr(r, a) {
  var t;
  for (const n of r) {
    if (n.id === a) return n;
    if ((t = n.children) != null && t.length) {
      const l = Hr(n.children, a);
      if (l) return l;
    }
  }
  return null;
}
function Ir(r) {
  return typeof r.label == "string" && r.label.trim() ? r.label.trim() : r.ariaLabel ? r.ariaLabel : `Sidebar item ${r.id}`;
}
function qr(r, a) {
  var t;
  return !a || !((t = r.children) != null && t.length) ? !1 : r.children.some((n) => n.id === a || qr(n, a));
}
function Ua({ isOpen: r }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: ge("rpc-sidebar__chevron", r && "rpc-sidebar__chevron--open"),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ e("path", { d: "m9 6 6 6-6 6" })
    }
  );
}
function Ya() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function ir({ isCollapsed: r }) {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 5v14" }),
    /* @__PURE__ */ e("path", { d: r ? "m14 9 3 3-3 3" : "m17 9-3 3 3 3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function za({ className: r = "", icon: a, label: t = "Toggle sidebar", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: ge("rpc-sidebar-trigger", r),
      onClick: (b) => {
        s == null || s.toggleSidebar(), n == null || n(b);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(ir, { isCollapsed: !(s != null && s.sidebarOpen) })
    }
  );
}
function Ga({ children: r, className: a = "", ...t }) {
  return /* @__PURE__ */ e("div", { className: ge("rpc-sidebar-mobile", a), ...t, children: r });
}
function Za(r, a, t) {
  const n = /* @__PURE__ */ c(ke, { children: [
    a ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__brand-icon", children: a }) : null,
    r ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__brand-text", children: r }) : null
  ] });
  return t ? /* @__PURE__ */ e("a", { className: "rpc-sidebar__brand", href: t, children: n }) : /* @__PURE__ */ e("div", { className: "rpc-sidebar__brand", children: n });
}
function or({
  items: r,
  activeId: a,
  openSet: t,
  depth: n,
  isCollapsed: l,
  onActivate: s,
  onToggle: b
}) {
  return /* @__PURE__ */ e(
    "ul",
    {
      className: ge("rpc-sidebar__list", n > 0 && "rpc-sidebar__list--nested"),
      role: n === 0 ? "list" : "group",
      children: r.map((i) => {
        var C;
        const u = !!((C = i.children) != null && C.length), v = u && t.has(i.id), x = a ? a === i.id || qr(i, a) : !!i.active, g = ge(
          "rpc-sidebar__item",
          x && "rpc-sidebar__item--active",
          i.disabled && "rpc-sidebar__item--disabled",
          u && "rpc-sidebar__item--branch"
        ), f = /* @__PURE__ */ c(ke, { children: [
          i.icon ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__item-icon", children: i.icon }) : null,
          /* @__PURE__ */ e("span", { className: "rpc-sidebar__item-label", children: i.label }),
          i.badge ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__badge", children: i.badge }) : null,
          u ? /* @__PURE__ */ e(Ua, { isOpen: v }) : null
        ] });
        return /* @__PURE__ */ c(
          "li",
          {
            className: ge(
              "rpc-sidebar__list-item",
              u && "rpc-sidebar__list-item--branch",
              v && "rpc-sidebar__list-item--open",
              x && "rpc-sidebar__list-item--active"
            ),
            children: [
              i.href || i.url ? /* @__PURE__ */ e(
                "a",
                {
                  "aria-current": x ? "page" : void 0,
                  "aria-disabled": i.disabled || void 0,
                  "aria-expanded": u ? v : void 0,
                  "aria-label": i.ariaLabel ?? Ir(i),
                  className: g,
                  href: i.disabled ? void 0 : i.href ?? i.url,
                  onClick: ($) => {
                    if (i.disabled) {
                      $.preventDefault();
                      return;
                    }
                    u && b(i), s(i);
                  },
                  children: f
                }
              ) : /* @__PURE__ */ e(
                "button",
                {
                  "aria-current": x ? "page" : void 0,
                  "aria-expanded": u ? v : void 0,
                  "aria-label": i.ariaLabel ?? Ir(i),
                  className: g,
                  disabled: i.disabled,
                  onClick: () => {
                    u && b(i), s(i);
                  },
                  type: "button",
                  children: f
                }
              ),
              u && (v || l) ? /* @__PURE__ */ e(
                or,
                {
                  activeId: a,
                  depth: n + 1,
                  isCollapsed: l,
                  items: i.children ?? [],
                  onActivate: s,
                  onToggle: b,
                  openSet: t
                }
              ) : null
            ]
          },
          i.id
        );
      })
    }
  );
}
function Xa({
  brand: r = "ava-ui",
  brandIcon: a,
  brandHref: t,
  items: n,
  footerItems: l = [],
  activeId: s,
  defaultActiveId: b = null,
  onActiveChange: i,
  openIds: u,
  defaultOpenIds: v = [],
  onOpenChange: x,
  header: g,
  headerIcon: f,
  children: C,
  ariaLabel: $ = "Sidebar navigation",
  mobileLabel: w = "Open sidebar",
  variant: O = "shell",
  collapsed: y,
  defaultCollapsed: B = !1,
  onCollapsedChange: d,
  showCollapseToggle: p = !0,
  collapseLabel: k = "Hide sidebar",
  expandLabel: M = "Show sidebar",
  width: D = "320px",
  collapsedWidth: _ = "72px",
  height: h = "auto",
  minHeight: E = "720px",
  background: R = "var(--rpc-color-background)",
  surfaceColor: W = "var(--rpc-color-surface)",
  textColor: V = "var(--rpc-color-text)",
  mutedColor: S = "var(--rpc-color-muted)",
  borderColor: P = "var(--rpc-color-border)",
  activeColor: K = "var(--rpc-color-secondary)",
  activeTextColor: U = "var(--rpc-color-text)",
  className: N = "",
  style: L,
  ...G
}) {
  const m = re(() => [...n, ...l], [l, n]), j = re(
    () => {
      var z;
      return s ?? b ?? ((z = m.find((me) => me.active)) == null ? void 0 : z.id) ?? null;
    },
    [s, b, m]
  ), Z = re(
    () => Pr([...v, ...Wr(m)]),
    [v, m]
  ), [de, ue] = A(j), [H, Q] = A(Z), [le, ee] = A(!1), [Fe, ce] = A(B), be = s !== void 0, Oe = u !== void 0, Ae = y !== void 0, ve = be ? s ?? null : de, Ne = Oe ? u ?? [] : H, te = Ae ? !!y : Fe, Se = re(() => new Set(Ne), [Ne]);
  J(() => {
    !be && ve && !Hr(m, ve) && ue(b ?? null);
  }, [ve, b, be, m]);
  const Re = (z) => {
    Oe || Q(z), x == null || x(z);
  }, Be = (z) => {
    const me = Se.has(z.id) ? Ne.filter((Ze) => Ze !== z.id) : [...Ne, z.id];
    Re(Pr(me));
  }, Te = (z) => {
    Ae || ce(z), d == null || d(z);
  }, je = (z) => {
    var me;
    be || ue(z.id), i == null || i(z.id, z), (me = z.onClick) == null || me.call(z, z), ee(!1);
  }, he = {
    "--rpc-sidebar-active": K,
    "--rpc-sidebar-active-text": U,
    "--rpc-sidebar-bg": R,
    "--rpc-sidebar-border": P,
    "--rpc-sidebar-muted": S,
    "--rpc-sidebar-surface": W,
    "--rpc-sidebar-text": V,
    "--rpc-sidebar-width": D,
    "--rpc-sidebar-collapsed-width": _,
    "--rpc-sidebar-height": h,
    "--rpc-sidebar-min-height": E,
    ...L
  }, Ve = /* @__PURE__ */ c("aside", { className: "rpc-sidebar__panel", "aria-label": $, children: [
    /* @__PURE__ */ c("div", { className: "rpc-sidebar__top", children: [
      /* @__PURE__ */ c("div", { className: "rpc-sidebar__panel-header", children: [
        Za(r, a, t),
        p ? /* @__PURE__ */ e(
          "button",
          {
            "aria-label": te ? M : k,
            "aria-pressed": te,
            className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--panel",
            onClick: () => Te(!te),
            type: "button",
            children: /* @__PURE__ */ e(ir, { isCollapsed: te })
          }
        ) : null
      ] }),
      /* @__PURE__ */ e("nav", { className: "rpc-sidebar__nav", "aria-label": $, children: /* @__PURE__ */ e(
        or,
        {
          activeId: ve,
          depth: 0,
          isCollapsed: te,
          items: n,
          onActivate: je,
          onToggle: Be,
          openSet: Se
        }
      ) })
    ] }),
    l.length ? /* @__PURE__ */ e("nav", { className: "rpc-sidebar__footer", "aria-label": `${$} footer`, children: /* @__PURE__ */ e(
      or,
      {
        activeId: ve,
        depth: 0,
        isCollapsed: te,
        items: l,
        onActivate: je,
        onToggle: Be,
        openSet: Se
      }
    ) }) : null
  ] });
  return O === "navigation" ? /* @__PURE__ */ e(
    "div",
    {
      className: ge(
        "rpc-sidebar",
        "rpc-sidebar--navigation",
        te && "rpc-sidebar--collapsed",
        N
      ),
      style: he,
      ...G,
      children: Ve
    }
  ) : /* @__PURE__ */ c(
    "div",
    {
      className: ge(
        "rpc-sidebar",
        le && "rpc-sidebar--mobile-open",
        te && "rpc-sidebar--collapsed",
        N
      ),
      style: he,
      ...G,
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "rpc-sidebar__mobile-overlay",
            onClick: () => ee(!1),
            role: "presentation"
          }
        ),
        Ve,
        /* @__PURE__ */ c("main", { className: "rpc-sidebar__content", children: [
          /* @__PURE__ */ c("header", { className: "rpc-sidebar__content-header", children: [
            /* @__PURE__ */ c(
              "button",
              {
                className: "rpc-sidebar__mobile-trigger",
                onClick: () => ee(!0),
                type: "button",
                children: [
                  /* @__PURE__ */ e(Ya, {}),
                  /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: w })
                ]
              }
            ),
            p ? /* @__PURE__ */ e(
              "button",
              {
                "aria-label": te ? M : k,
                "aria-pressed": te,
                className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--content",
                onClick: () => Te(!te),
                type: "button",
                children: /* @__PURE__ */ e(ir, { isCollapsed: te })
              }
            ) : null,
            f ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__content-icon", children: f }) : null,
            g ? /* @__PURE__ */ e("div", { className: "rpc-sidebar__content-title", children: g }) : null
          ] }),
          /* @__PURE__ */ e("div", { className: "rpc-sidebar__content-body", children: C })
        ] })
      ]
    }
  );
}
const Bt = Object.assign(Xa, {
  Mobile: Ga,
  Trigger: za
});
function ze(...r) {
  return r.filter(Boolean).join(" ");
}
function Ja() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ e("path", { d: "m20 20-3.5-3.5" })
  ] });
}
function Qa() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
    /* @__PURE__ */ e("path", { d: "m10 17 5-5-5-5" }),
    /* @__PURE__ */ e("path", { d: "M15 12H3" })
  ] });
}
function et() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("path", { d: "M19 8v6" }),
    /* @__PURE__ */ e("path", { d: "M22 11h-6" })
  ] });
}
function rt() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "m6 9 6 6 6-6" }) });
}
function at(r) {
  const a = /* @__PURE__ */ c(ke, { children: [
    r.icon ? /* @__PURE__ */ e("span", { className: "rpc-header__action-icon", children: r.icon }) : null,
    /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: r.label })
  ] });
  return r.href && !r.disabled ? /* @__PURE__ */ e("a", { "aria-label": r.label, className: "rpc-header__icon-action", href: r.href, children: a }, r.id) : /* @__PURE__ */ e(
    "button",
    {
      "aria-label": r.label,
      className: "rpc-header__icon-action",
      disabled: r.disabled,
      onClick: r.onClick,
      type: "button",
      children: a
    },
    r.id
  );
}
function tt(r) {
  const a = ze("rpc-header__profile-menu-item", r.danger && "rpc-header__profile-menu-item--danger");
  return r.href && !r.disabled ? /* @__PURE__ */ e("a", { className: a, href: r.href, children: r.label }, r.id) : /* @__PURE__ */ e("button", { className: a, disabled: r.disabled, onClick: r.onClick, type: "button", children: r.label }, r.id);
}
function Dt({
  brand: r = "ava-ui",
  brandHref: a,
  navItems: t = [],
  activeNavId: n,
  search: l = !1,
  actions: s = [],
  isAuthenticated: b = !1,
  loginLabel: i = "Login",
  registerLabel: u = "Register",
  onLogin: v,
  onRegister: x,
  profile: g,
  profileMenuItems: f = [],
  profileMenuLabel: C = "Open profile menu",
  onLogout: $,
  logoutLabel: w = "Logout",
  maxWidth: O = "1200px",
  height: y = "72px",
  background: B = "var(--rpc-color-surface)",
  textColor: d = "var(--rpc-color-text)",
  mutedColor: p = "var(--rpc-color-muted)",
  accentColor: k = "var(--rpc-color-primary)",
  borderColor: M = "var(--rpc-color-border)",
  className: D = "",
  style: _,
  ...h
}) {
  const [E, R] = A(!1), [W, V] = A(!1), [S, P] = A(l && l.defaultValue ? l.defaultValue : ""), K = oe(), U = ie(null), N = ie(null), L = !!(l && l.value !== void 0), G = l ? L ? l.value ?? "" : S : "", m = {
    "--rpc-header-accent": k,
    "--rpc-header-bg": B,
    "--rpc-header-border": M,
    "--rpc-header-height": y,
    "--rpc-header-max-width": O,
    "--rpc-header-muted": p,
    "--rpc-header-text": d,
    ..._
  };
  J(() => {
    const H = (le) => {
      const ee = le.target;
      if (U.current && !U.current.contains(ee)) {
        R(!1), V(!1);
        return;
      }
      N.current && !N.current.contains(ee) && V(!1);
    }, Q = (le) => {
      le.key === "Escape" && (R(!1), V(!1));
    };
    return document.addEventListener("mousedown", H), document.addEventListener("keydown", Q), () => {
      document.removeEventListener("mousedown", H), document.removeEventListener("keydown", Q);
    };
  }, []);
  const j = (H) => {
    var Q;
    L || P(H), l && ((Q = l.onChange) == null || Q.call(l, H));
  }, Z = (H) => {
    var Q;
    H.preventDefault(), l && ((Q = l.onSubmit) == null || Q.call(l, G));
  }, de = () => R(!1), ue = a ? /* @__PURE__ */ e("a", { className: "rpc-header__brand", href: a, children: r }) : /* @__PURE__ */ e("div", { className: "rpc-header__brand", children: r });
  return /* @__PURE__ */ e("header", { className: ze("rpc-header", D), ref: U, style: m, ...h, children: /* @__PURE__ */ c("div", { className: "rpc-header__inner", children: [
    /* @__PURE__ */ e("div", { className: "rpc-header__brand-area", children: ue }),
    /* @__PURE__ */ c("div", { className: "rpc-header__utility", children: [
      l ? /* @__PURE__ */ c("form", { className: "rpc-header__search", onSubmit: Z, role: "search", children: [
        /* @__PURE__ */ e("label", { className: "rpc-sr-only", htmlFor: "rpc-header-search", children: l.label ?? "Search" }),
        /* @__PURE__ */ e(Ja, {}),
        /* @__PURE__ */ e(
          "input",
          {
            id: "rpc-header-search",
            onChange: (H) => j(H.target.value),
            placeholder: l.placeholder ?? "Cari...",
            type: "search",
            value: G
          }
        )
      ] }) : null,
      s.length ? /* @__PURE__ */ e("div", { className: "rpc-header__actions", children: s.map(at) }) : null,
      b ? /* @__PURE__ */ c("div", { className: "rpc-header__profile", ref: N, children: [
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": W,
            "aria-label": C,
            className: "rpc-header__profile-trigger",
            onClick: () => V((H) => !H),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: "rpc-header__avatar", children: g != null && g.avatarSrc ? /* @__PURE__ */ e("img", { alt: g.avatarAlt ?? "", src: g.avatarSrc }) : (g == null ? void 0 : g.avatar) ?? "A" }),
              /* @__PURE__ */ e("span", { className: "rpc-header__profile-name", children: (g == null ? void 0 : g.name) ?? "Profile" }),
              /* @__PURE__ */ e(rt, {})
            ]
          }
        ),
        W ? /* @__PURE__ */ c("div", { className: "rpc-header__profile-menu", children: [
          g != null && g.email ? /* @__PURE__ */ e("div", { className: "rpc-header__profile-email", children: g.email }) : null,
          f.map(tt),
          $ ? /* @__PURE__ */ e("button", { className: "rpc-header__profile-menu-item rpc-header__profile-menu-item--danger", onClick: $, type: "button", children: w }) : null
        ] }) : null
      ] }) : /* @__PURE__ */ c("div", { className: "rpc-header__auth", children: [
        /* @__PURE__ */ c("button", { className: "rpc-header__auth-button rpc-header__auth-button--login", onClick: v, type: "button", children: [
          /* @__PURE__ */ e(Qa, {}),
          /* @__PURE__ */ e("span", { children: i })
        ] }),
        /* @__PURE__ */ c("button", { className: "rpc-header__auth-button rpc-header__auth-button--register", onClick: x, type: "button", children: [
          /* @__PURE__ */ e(et, {}),
          /* @__PURE__ */ e("span", { children: u })
        ] })
      ] }),
      t.length ? /* @__PURE__ */ c(
        "button",
        {
          "aria-controls": K,
          "aria-expanded": E,
          "aria-label": "Toggle navigation",
          className: "rpc-header__menu-toggle",
          onClick: () => R((H) => !H),
          type: "button",
          children: [
            /* @__PURE__ */ e("span", {}),
            /* @__PURE__ */ e("span", {}),
            /* @__PURE__ */ e("span", {})
          ]
        }
      ) : null
    ] }),
    t.length ? /* @__PURE__ */ e("div", { className: ze("rpc-header__nav-panel", E && "rpc-header__nav-panel--open"), id: K, children: /* @__PURE__ */ e("nav", { className: "rpc-header__nav", "aria-label": "Primary navigation", children: t.map((H) => {
      const Q = H.active ?? n === H.id, le = ze("rpc-header__nav-link", Q && "rpc-header__nav-link--active");
      return H.href && !H.disabled ? /* @__PURE__ */ e(
        "a",
        {
          className: le,
          href: H.href,
          onClick: () => {
            var ee;
            de(), (ee = H.onClick) == null || ee.call(H);
          },
          children: H.label
        },
        H.id
      ) : /* @__PURE__ */ e(
        "button",
        {
          className: le,
          disabled: H.disabled,
          onClick: () => {
            var ee;
            de(), (ee = H.onClick) == null || ee.call(H);
          },
          type: "button",
          children: H.label
        },
        H.id
      );
    }) }) }) : null
  ] }) });
}
function Ue(...r) {
  return r.filter(Boolean).join(" ");
}
function dr(r, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(r, a - 1));
}
function nt(r, a, t) {
  return a <= 0 ? 0 : t ? (r + a) % a : dr(r, a);
}
function Et({
  items: r,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  loop: l = !0,
  autoPlay: s = !1,
  autoPlayInterval: b = 4e3,
  pauseOnHover: i = !0,
  showArrows: u = !0,
  showDots: v = !0,
  showThumbnails: x = !0,
  aspectRatio: g = "1 / 1",
  ariaLabel: f = "Carousel",
  className: C = "",
  ...$
}) {
  const [w, O] = A(() => dr(t, r.length)), [y, B] = A(!1), d = ie(null), p = r.length, k = a !== void 0, M = dr(k ? a : w, p), D = r[M], _ = (S) => {
    if (p === 0)
      return;
    const P = nt(S, p, l);
    k || O(P), n == null || n(P, r[P]);
  }, h = () => _(M - 1), E = () => _(M + 1);
  J(() => {
    if (!s || p <= 1 || i && y)
      return;
    const S = window.setInterval(() => {
      _(M + 1);
    }, b);
    return () => window.clearInterval(S);
  }, [s, b, M, y, i, p]);
  const R = (S) => {
    S.key === "ArrowLeft" && (S.preventDefault(), h()), S.key === "ArrowRight" && (S.preventDefault(), E());
  }, W = (S) => {
    d.current = S.clientX;
  }, V = (S) => {
    if (d.current === null)
      return;
    const P = S.clientX - d.current;
    d.current = null, !(Math.abs(P) < 48) && (P > 0 ? h() : E());
  };
  return p === 0 ? /* @__PURE__ */ e("div", { className: Ue("rpc-carousel", "rpc-carousel--empty", C), ...$, children: /* @__PURE__ */ e("div", { className: "rpc-carousel__empty", children: "No carousel items." }) }) : /* @__PURE__ */ c(
    "div",
    {
      className: Ue("rpc-carousel", C),
      onMouseEnter: () => i && B(!0),
      onMouseLeave: () => i && B(!1),
      role: "region",
      "aria-label": f,
      "aria-roledescription": "carousel",
      ...$,
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            className: "rpc-carousel__viewport",
            onKeyDown: R,
            onPointerDown: W,
            onPointerUp: V,
            style: { "--rpc-carousel-aspect-ratio": g },
            tabIndex: 0,
            children: [
              /* @__PURE__ */ e("div", { className: "rpc-carousel__track", style: { transform: `translateX(-${M * 100}%)` }, children: r.map((S, P) => /* @__PURE__ */ e(
                "div",
                {
                  "aria-hidden": P !== M,
                  "aria-label": `${P + 1} of ${p}`,
                  className: "rpc-carousel__slide",
                  role: "group",
                  children: S.content ?? /* @__PURE__ */ c("figure", { className: "rpc-carousel__figure", children: [
                    S.imageSrc ? /* @__PURE__ */ e("img", { className: "rpc-carousel__image", src: S.imageSrc, alt: S.imageAlt ?? S.title ?? "" }) : null,
                    S.title || S.description ? /* @__PURE__ */ c("figcaption", { className: "rpc-carousel__caption", children: [
                      S.title ? /* @__PURE__ */ e("strong", { children: S.title }) : null,
                      S.description ? /* @__PURE__ */ e("span", { children: S.description }) : null
                    ] }) : null
                  ] })
                },
                S.id ?? `${S.title ?? "slide"}-${P}`
              )) }),
              u && p > 1 ? /* @__PURE__ */ c(ke, { children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    "aria-label": "Previous slide",
                    className: "rpc-carousel__arrow rpc-carousel__arrow--previous",
                    disabled: !l && M === 0,
                    onClick: h,
                    type: "button"
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    "aria-label": "Next slide",
                    className: "rpc-carousel__arrow rpc-carousel__arrow--next",
                    disabled: !l && M === p - 1,
                    onClick: E,
                    type: "button"
                  }
                )
              ] }) : null
            ]
          }
        ),
        v && p > 1 ? /* @__PURE__ */ e("div", { className: "rpc-carousel__dots", role: "tablist", "aria-label": "Carousel slides", children: r.map((S, P) => /* @__PURE__ */ e(
          "button",
          {
            "aria-label": `Go to slide ${P + 1}`,
            "aria-selected": P === M,
            className: Ue("rpc-carousel__dot", P === M && "rpc-carousel__dot--active"),
            onClick: () => _(P),
            role: "tab",
            type: "button"
          },
          S.id ?? `dot-${P}`
        )) }) : null,
        x && p > 1 ? /* @__PURE__ */ e("div", { className: "rpc-carousel__thumbs", "aria-label": "Carousel thumbnails", children: r.map((S, P) => /* @__PURE__ */ e(
          "button",
          {
            "aria-current": P === M ? "true" : void 0,
            "aria-label": `Show ${S.title ?? `slide ${P + 1}`}`,
            className: Ue("rpc-carousel__thumb", P === M && "rpc-carousel__thumb--active"),
            onClick: () => _(P),
            type: "button",
            children: S.thumbnailContent ?? (S.thumbnailSrc || S.imageSrc ? /* @__PURE__ */ e("img", { src: S.thumbnailSrc ?? S.imageSrc, alt: "" }) : /* @__PURE__ */ e("span", { children: P + 1 }))
          },
          S.id ?? `thumb-${P}`
        )) }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-carousel__status", "aria-live": "polite", children: [
          D != null && D.title ? `${D.title}, ` : "",
          "slide ",
          M + 1,
          " of ",
          p
        ] })
      ]
    }
  );
}
function cr(...r) {
  return r.filter(Boolean).join(" ");
}
function ur(r, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(r, a - 1));
}
function lt(r, a, t) {
  return a <= 0 ? 0 : t ? (r + a) % a : ur(r, a);
}
function ct(r) {
  if (r.endpoint) return r.endpoint;
  if (!r.targetPage) return "";
  const a = new URLSearchParams(), t = r.targetParams && typeof r.targetParams == "object" && !Array.isArray(r.targetParams) ? r.targetParams : {};
  Object.entries(t).forEach(([l, s]) => {
    s != null && a.set(l, String(s));
  });
  const n = a.toString();
  return n ? `${r.targetPage}?${n}` : r.targetPage;
}
function st() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M12 3 9.9 9.9 3 12l6.9 2.1L12 21l2.1-6.9L21 12l-6.9-2.1L12 3Z" }),
    /* @__PURE__ */ e("path", { d: "M5 3v4M3 5h4M19 17v4M17 19h4" })
  ] });
}
function it() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("path", { d: "M5 12h14M13 6l6 6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ot() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" }),
    /* @__PURE__ */ e("path", { d: "m9 12 2 2 4-5" })
  ] });
}
function dt() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "m12 2 2.95 6.1 6.72.94-4.86 4.73 1.18 6.69L12 17.3l-5.99 3.16 1.18-6.69-4.86-4.73 6.72-.94L12 2Z" }) });
}
function ut() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M12 21s-7.5-4.35-9.6-9.05C.65 8.02 2.9 4.5 6.7 4.5c2.08 0 3.43 1.1 4.3 2.23.87-1.13 2.22-2.23 4.3-2.23 3.8 0 6.05 3.52 4.3 7.45C19.5 16.65 12 21 12 21Z" }) });
}
const pt = [
  { id: "verified", icon: /* @__PURE__ */ e(ot, {}), label: "Vendor terverifikasi" },
  { id: "guarantee", icon: /* @__PURE__ */ e(dt, {}), label: "Garansi layanan terbaik" },
  { id: "satisfaction", icon: /* @__PURE__ */ e(ut, {}), label: "100% pasangan puas" }
];
function Ft({
  slides: r,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  onNavigate: l,
  highlights: s = pt,
  autoPlay: b = !1,
  autoPlayInterval: i = 5e3,
  loop: u = !0,
  pauseOnHover: v = !0,
  showArrows: x = !0,
  showDots: g = !0,
  height: f = "min(760px, 70vh)",
  minHeight: C = "520px",
  imagePosition: $ = "center",
  overlay: w = "strong",
  ariaLabel: O = "Hero slider",
  className: y = "",
  style: B,
  ...d
}) {
  const [p, k] = A(() => ur(t, r.length)), [M, D] = A(!1), _ = ie(null), h = r.length, E = a !== void 0, R = ur(E ? a : p, h), W = r[R], V = (m) => {
    if (!h) return;
    const j = lt(m, h, u);
    E || k(j), n == null || n(j, r[j]);
  }, S = () => V(R - 1), P = () => V(R + 1);
  J(() => {
    if (!b || h <= 1 || v && M) return;
    const m = window.setInterval(() => {
      V(R + 1);
    }, i);
    return () => window.clearInterval(m);
  }, [b, i, R, M, v, h]);
  const K = (m) => {
    m.key === "ArrowLeft" && (m.preventDefault(), S()), m.key === "ArrowRight" && (m.preventDefault(), P());
  }, U = (m) => {
    _.current = m.clientX;
  }, N = (m) => {
    if (_.current === null) return;
    const j = m.clientX - _.current;
    _.current = null, !(Math.abs(j) < 48) && (j > 0 ? S() : P());
  }, L = (m) => {
    const j = ct(m);
    if (l) {
      l({ slide: m, url: j });
      return;
    }
    j && typeof window < "u" && window.location.assign(j);
  }, G = {
    "--rpc-hero-slider-height": f,
    "--rpc-hero-slider-image-position": $,
    "--rpc-hero-slider-min-height": C,
    ...B
  };
  return !h || !W ? /* @__PURE__ */ e("section", { className: cr("rpc-hero-slider", "rpc-hero-slider--empty", y), style: G, ...d, children: /* @__PURE__ */ e("div", { className: "rpc-hero-slider__empty", children: "No slides available." }) }) : /* @__PURE__ */ c(
    "section",
    {
      "aria-label": O,
      "aria-roledescription": "carousel",
      className: cr("rpc-hero-slider", `rpc-hero-slider--${w}`, y),
      onKeyDown: K,
      onMouseEnter: () => v && D(!0),
      onMouseLeave: () => v && D(!1),
      onPointerDown: U,
      onPointerUp: N,
      role: "region",
      style: G,
      tabIndex: 0,
      ...d,
      children: [
        /* @__PURE__ */ e("div", { className: "rpc-hero-slider__track", style: { transform: `translateX(-${R * 100}%)` }, children: r.map((m, j) => /* @__PURE__ */ c(
          "article",
          {
            "aria-hidden": j !== R,
            "aria-label": `${j + 1} of ${h}`,
            className: "rpc-hero-slider__slide",
            role: "group",
            children: [
              /* @__PURE__ */ e("img", { className: "rpc-hero-slider__image", src: m.image, alt: m.title }),
              /* @__PURE__ */ e("div", { className: "rpc-hero-slider__overlay" }),
              /* @__PURE__ */ c("div", { className: "rpc-hero-slider__tagline", children: [
                /* @__PURE__ */ e(st, {}),
                /* @__PURE__ */ e("span", { children: m.tagline })
              ] }),
              /* @__PURE__ */ c("div", { className: "rpc-hero-slider__content", children: [
                /* @__PURE__ */ c("div", { className: "rpc-hero-slider__badges", children: [
                  /* @__PURE__ */ e("span", { className: "rpc-hero-slider__badge", children: m.badge }),
                  m.discountBadge ? /* @__PURE__ */ e("span", { className: "rpc-hero-slider__discount", children: m.discountBadge }) : null
                ] }),
                /* @__PURE__ */ e("h2", { className: "rpc-hero-slider__title", children: m.title }),
                /* @__PURE__ */ e("p", { className: "rpc-hero-slider__subtitle", children: m.subtitle }),
                /* @__PURE__ */ e("p", { className: "rpc-hero-slider__description", children: m.description }),
                s.length ? /* @__PURE__ */ e("div", { className: "rpc-hero-slider__highlights", children: s.map((Z, de) => /* @__PURE__ */ c("div", { className: "rpc-hero-slider__highlight", children: [
                  Z.icon ? /* @__PURE__ */ e("span", { className: "rpc-hero-slider__highlight-icon", children: Z.icon }) : null,
                  /* @__PURE__ */ e("span", { children: Z.label })
                ] }, Z.id ?? de)) }) : null,
                /* @__PURE__ */ c("button", { className: "rpc-hero-slider__cta", onClick: () => L(m), type: "button", children: [
                  /* @__PURE__ */ e("span", { children: m.ctaText }),
                  /* @__PURE__ */ e(it, {})
                ] })
              ] })
            ]
          },
          m.id
        )) }),
        x && h > 1 ? /* @__PURE__ */ c(ke, { children: [
          /* @__PURE__ */ e(
            "button",
            {
              "aria-label": "Previous slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--previous",
              disabled: !u && R === 0,
              onClick: S,
              type: "button"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              "aria-label": "Next slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--next",
              disabled: !u && R === h - 1,
              onClick: P,
              type: "button"
            }
          )
        ] }) : null,
        g && h > 1 ? /* @__PURE__ */ e("div", { className: "rpc-hero-slider__dots", role: "tablist", "aria-label": "Hero slides", children: r.map((m, j) => /* @__PURE__ */ e(
          "button",
          {
            "aria-label": `Go to slide ${j + 1}`,
            "aria-selected": j === R,
            className: cr("rpc-hero-slider__dot", j === R && "rpc-hero-slider__dot--active"),
            onClick: () => V(j),
            role: "tab",
            type: "button"
          },
          m.id
        )) }) : null
      ]
    }
  );
}
function fe(...r) {
  return r.filter(Boolean).join(" ");
}
function we(r, a) {
  if (a)
    return r[a];
}
function ht(r, a) {
  return r === a ? 0 : r == null ? 1 : a == null ? -1 : typeof r == "number" && typeof a == "number" ? r - a : String(r).toLowerCase().localeCompare(String(a).toLowerCase());
}
function mt(r, a) {
  const t = r;
  return t.id !== void 0 && t.id !== null ? String(t.id) : String(a);
}
function ft(r) {
  var a;
  return Array.isArray(r) ? { rows: r, total: r.length } : {
    rows: r.data ?? [],
    total: r.total ?? ((a = r.data) == null ? void 0 : a.length) ?? 0
  };
}
function Le(r, a) {
  if (a)
    return a.split(".").reduce((t, n) => {
      if (t && typeof t == "object" && n in t)
        return t[n];
    }, r);
}
function _t(r) {
  return typeof r == "string" ? r : r.url;
}
function gt(r) {
  return typeof r == "string" ? "GET" : r.method ?? "GET";
}
function Kr(r) {
  return typeof r == "string" ? void 0 : r.auth;
}
function bt(r) {
  return typeof r == "string" ? void 0 : r.headers;
}
function vt(r) {
  return r ? r.type === "bearer" ? { Authorization: `Bearer ${r.token}` } : r.type === "basic" ? { Authorization: `Basic ${window.btoa(`${r.username}:${r.password}`)}` } : r.type === "apiKey" && (r.in ?? "header") === "header" ? { [r.key]: r.value } : r.type === "custom" ? r.headers : {} : {};
}
function Nt(r, a) {
  if (typeof a != "string" && a.responseMapper)
    return a.responseMapper(r);
  if (Array.isArray(r))
    return r;
  const t = typeof a == "string" ? void 0 : a.dataPath, n = typeof a == "string" ? void 0 : a.totalPath, l = t ? Le(r, t) : Le(r, "data") ?? Le(r, "items"), s = n ? Le(r, n) : Le(r, "total") ?? Le(r, "meta.total");
  return {
    data: Array.isArray(l) ? l : [],
    total: typeof s == "number" ? s : Array.isArray(l) ? l.length : 0
  };
}
function yt(r, a) {
  var s;
  const t = new URL(_t(r), window.location.href), n = Kr(r), l = typeof r == "string" || !r.queryParams ? {
    page: a.page,
    pageSize: a.pageSize,
    sortBy: a.sortBy,
    sortDirection: a.sortDirection,
    search: a.search,
    filters: a.filters ? JSON.stringify(a.filters) : void 0,
    visibleColumns: (s = a.visibleColumns) == null ? void 0 : s.join(",")
  } : r.queryParams(a);
  return Object.entries(l).forEach(([b, i]) => {
    if (Array.isArray(i)) {
      t.searchParams.delete(b), i.forEach((u) => {
        t.searchParams.append(b, String(u));
      });
      return;
    }
    i != null && i !== "" && t.searchParams.set(b, String(i));
  }), (n == null ? void 0 : n.type) === "apiKey" && (n.in ?? "header") === "query" && t.searchParams.set(n.key, n.value), t.toString();
}
function wt(r, a, t) {
  const n = gt(r), l = new Headers(t == null ? void 0 : t.headers), s = bt(r), b = vt(Kr(r));
  Object.entries(s ?? {}).forEach(([u, v]) => {
    l.set(u, v);
  }), Object.entries(b).forEach(([u, v]) => {
    l.set(u, v);
  });
  const i = {
    ...t,
    headers: l,
    method: n
  };
  if (typeof r != "string" && r.body) {
    const u = r.body(a);
    u !== void 0 && (l.set("Content-Type", l.get("Content-Type") ?? "application/json"), i.body = typeof u == "string" ? u : JSON.stringify(u));
  }
  return i;
}
function sr({
  indeterminate: r,
  ...a
}) {
  const t = ie(null);
  return J(() => {
    t.current && (t.current.indeterminate = !!r);
  }, [r]), /* @__PURE__ */ e("input", { ref: t, type: "checkbox", className: "rpc-datagrid__checkbox", ...a });
}
function Ye(r) {
  return ["default", "primary", "success", "warning", "danger"].includes(r);
}
function Ot({
  columns: r,
  data: a = [],
  endpoint: t,
  fetchData: n,
  requestInit: l,
  pageSize: s = 8,
  pageSizeOptions: b = [5, 8, 12, 20],
  initialSortBy: i,
  initialSortDirection: u = "ascending",
  searchable: v = !0,
  searchPlaceholder: x = "Search...",
  initialSearch: g = "",
  onSearchChange: f,
  filters: C = [],
  initialFilters: $ = {},
  onFiltersChange: w,
  columnVisibility: O = !0,
  defaultVisibleColumns: y,
  visibleColumns: B,
  onVisibleColumnsChange: d,
  emptyState: p = "No data available.",
  loadingState: k = "Loading data...",
  errorState: M = "Failed to load data.",
  getRowKey: D = mt,
  onRowClick: _,
  striped: h = !0,
  hoverable: E = !0,
  compact: R = !1,
  tone: W = "dark",
  selectable: V = !1,
  defaultSelectedKeys: S = [],
  selectedKeys: P,
  onSelectionChange: K,
  actions: U = [],
  mobileMode: N = "auto",
  cardBreakpoint: L = "tablet",
  renderCard: G,
  title: m,
  description: j,
  className: Z = "",
  ...de
}) {
  const [ue, H] = A(1), [Q, le] = A(s), [ee, Fe] = A(i), [ce, be] = A(
    u && i ? u : void 0
  ), [Oe, Ae] = A([]), [ve, Ne] = A(0), [te, Se] = A(!!(t || n)), [Re, Be] = A(null), [Te, je] = A(S), [he, Ve] = A(g), [z, me] = A($), [Ze, Ur] = A(
    y ?? r.map((o) => o.id)
  ), [_r, Ce] = A(null), [gr, Xe] = A(!1), [br, Je] = A(!1), Qe = ie(null), _e = !!(t || n), Me = P ?? Te, De = re(() => new Set(Me), [Me]), ye = B ?? Ze, We = re(() => new Set(ye), [ye]), $e = re(
    () => r.filter((o) => We.has(o.id)),
    [r, We]
  );
  J(() => {
    le(s);
  }, [s]), J(() => {
    i && (Fe(i), be(u));
  }, [i, u]), J(() => {
    H(1);
  }, [a, t, n, he, z, ye]), J(() => {
    if (!_e)
      return;
    const o = new AbortController();
    let I = !0;
    return (async () => {
      Se(!0), Be(null);
      try {
        const X = {
          page: ue,
          pageSize: Q,
          sortBy: ee,
          sortDirection: ce,
          search: he,
          filters: z,
          visibleColumns: ye
        }, ae = n ? await n(X) : await fetch(yt(t, X), {
          ...wt(t, X, l),
          signal: o.signal
        }).then(async (ne) => {
          if (!ne.ok)
            throw new Error(`Request failed with status ${ne.status}`);
          const se = await ne.json();
          return Nt(se, t);
        }), F = ft(ae);
        if (!I)
          return;
        Ae(F.rows), Ne(F.total);
      } catch (X) {
        if (!I)
          return;
        Be(X instanceof Error ? X : new Error("Unknown error")), Ae([]), Ne(0);
      } finally {
        I && Se(!1);
      }
    })(), () => {
      I = !1, o.abort();
    };
  }, [
    z,
    t,
    n,
    _e,
    ue,
    Q,
    l,
    ye,
    he,
    ee,
    ce
  ]), J(() => {
    const o = (T) => {
      Qe.current && !Qe.current.contains(T.target) && (Ce(null), Xe(!1), Je(!1));
    }, I = (T) => {
      T.key === "Escape" && (Ce(null), Xe(!1), Je(!1));
    };
    return document.addEventListener("mousedown", o), document.addEventListener("keydown", I), () => {
      document.removeEventListener("mousedown", o), document.removeEventListener("keydown", I);
    };
  }, []);
  const He = re(() => {
    if (_e)
      return a;
    const o = r.filter((T) => T.searchable !== !1), I = he.trim().toLowerCase();
    return a.filter((T) => {
      const X = !I || o.some((F) => {
        const ne = we(T, F.accessorKey ?? F.id);
        return String(ne ?? "").toLowerCase().includes(I);
      }), ae = C.every((F) => {
        const ne = z[F.id] ?? [];
        if (ne.length === 0)
          return !0;
        const se = we(T, F.accessorKey ?? F.id);
        return ne.includes(String(se ?? ""));
      });
      return X && ae;
    });
  }, [z, r, a, C, _e, he]), vr = re(() => {
    if (_e || !ee || !ce)
      return He;
    const o = r.find((T) => T.id === ee);
    if (!o)
      return He;
    const I = o.accessorKey ?? o.id;
    return [...He].sort((T, X) => {
      const ae = ht(we(T, I), we(X, I));
      return ce === "ascending" ? ae : -ae;
    });
  }, [r, He, _e, ee, ce]), Pe = _e ? ve : vr.length, qe = Math.max(1, Math.ceil(Pe / Q)), pe = Math.min(ue, qe);
  J(() => {
    pe !== ue && H(pe);
  }, [ue, pe]);
  const Ie = _e ? Oe : vr.slice((pe - 1) * Q, pe * Q), Ee = re(
    () => Ie.map((o, I) => D(o, I)),
    [D, Ie]
  ), er = V && Ee.length > 0 && Ee.every((o) => De.has(o)), Yr = V && Ee.some((o) => De.has(o)) && !er, zr = (o) => {
    const I = new Set(o);
    return Ie.filter((T, X) => I.has(D(T, X)));
  }, Nr = (o) => {
    P === void 0 && je(o), K == null || K(o, zr(o));
  }, Gr = (o) => {
    Ve(o), H(1), f == null || f(o);
  }, Zr = (o, I) => {
    const T = z[o] ?? [], X = T.includes(I) ? T.filter((F) => F !== I) : [...T, I], ae = {
      ...z,
      [o]: X
    };
    X.length === 0 && delete ae[o], me(ae), H(1), w == null || w(ae);
  }, Xr = () => {
    me({}), H(1), w == null || w({});
  }, Jr = (o) => {
    B === void 0 && Ur(o), d == null || d(o);
  }, Qr = (o) => {
    const I = We.has(o) ? ye.filter((T) => T !== o) : [...ye, o];
    Jr(I.length ? I : [o]);
  }, yr = (o, I) => {
    const T = D(o, I), X = De.has(T) ? Me.filter((ae) => ae !== T) : [...Me, T];
    Nr(X);
  }, ea = () => {
    if (!V)
      return;
    const o = er ? Me.filter((I) => !Ee.includes(I)) : Array.from(/* @__PURE__ */ new Set([...Me, ...Ee]));
    Nr(o);
  }, ra = (o) => {
    if (!o.allowsSorting)
      return;
    const I = o.id;
    let T = "ascending";
    ee === I && (T = ce === "ascending" ? "descending" : "ascending"), Fe(I), be(T), H(1);
  }, wr = (o) => {
    const I = ee === o.id, T = {
      column: o,
      isSorted: I,
      sortDirection: I ? ce : void 0
    };
    return typeof o.header == "function" ? o.header(T) : o.header;
  }, Ke = Re ? typeof M == "function" ? M(Re) : M : te ? k : Ie.length ? null : p, aa = Pe === 0 ? 0 : (pe - 1) * Q + 1, ta = Pe === 0 ? 0 : Math.min(pe * Q, Pe), na = $e.length + (V ? 1 : 0) + (U.length ? 1 : 0), rr = Object.values(z).reduce((o, I) => o + I.length, 0), la = N !== "table", ca = (o, I) => {
    const T = D(o, I), X = De.has(T), ae = _r === T, F = $e.find((Y) => Y.isRowHeader) ?? $e[0], ne = F ? F.cell ? F.cell(o, I) : String(we(o, F.accessorKey ?? F.id) ?? "") : null, se = $e.filter((Y) => Y.id !== (F == null ? void 0 : F.id));
    return /* @__PURE__ */ c(
      "article",
      {
        className: fe("rpc-datagrid-card", X && "rpc-datagrid-card--selected"),
        onClick: _ ? () => _(o) : void 0,
        children: [
          /* @__PURE__ */ c("div", { className: "rpc-datagrid-card__header", children: [
            V ? /* @__PURE__ */ e("div", { className: "rpc-datagrid-card__select", onClick: (Y) => Y.stopPropagation(), children: /* @__PURE__ */ e(
              sr,
              {
                "aria-label": `Select card ${I + 1}`,
                checked: X,
                onChange: () => yr(o, I)
              }
            ) }) : null,
            /* @__PURE__ */ e("div", { className: "rpc-datagrid-card__title", children: ne }),
            U.length ? /* @__PURE__ */ c("div", { className: "rpc-datagrid-card__actions", onClick: (Y) => Y.stopPropagation(), children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "aria-expanded": ae,
                  "aria-label": `Open actions for ${T}`,
                  className: "rpc-datagrid__action-trigger",
                  onClick: () => Ce((Y) => Y === T ? null : T),
                  type: "button",
                  children: /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                    /* @__PURE__ */ e("span", {}),
                    /* @__PURE__ */ e("span", {}),
                    /* @__PURE__ */ e("span", {})
                  ] })
                }
              ),
              ae ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__action-menu", role: "menu", children: U.map((Y) => {
                const ar = typeof Y.color == "string" && Ye(Y.color) ? `rpc-datagrid__action-item--${Y.color}` : "", kr = typeof Y.color == "string" && !Ye(Y.color) ? { color: Y.color } : void 0;
                return /* @__PURE__ */ c(
                  "button",
                  {
                    className: fe("rpc-datagrid__action-item", ar, Y.disabled && "rpc-datagrid__action-item--disabled"),
                    disabled: Y.disabled,
                    onClick: (sa) => {
                      sa.stopPropagation(), Y.onClick(o, I), Ce(null);
                    },
                    role: "menuitem",
                    style: kr,
                    type: "button",
                    children: [
                      Y.icon ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: kr, children: Y.icon }) : null,
                      /* @__PURE__ */ e("span", { children: Y.name })
                    ]
                  },
                  Y.id
                );
              }) }) : null
            ] }) : null
          ] }),
          /* @__PURE__ */ e("dl", { className: "rpc-datagrid-card__fields", children: se.map((Y) => {
            const ar = Y.cell ? Y.cell(o, I) : String(we(o, Y.accessorKey ?? Y.id) ?? "");
            return /* @__PURE__ */ c("div", { className: "rpc-datagrid-card__field", children: [
              /* @__PURE__ */ e("dt", { children: typeof Y.header == "string" ? Y.header : Y.id }),
              /* @__PURE__ */ e("dd", { children: ar })
            ] }, `${Y.id}-${T}`);
          }) })
        ]
      },
      T
    );
  };
  return /* @__PURE__ */ c(
    "section",
    {
      ref: Qe,
      className: fe(
        "rpc-datagrid",
        `rpc-datagrid--${W}`,
        `rpc-datagrid--mobile-${N}`,
        `rpc-datagrid--card-${L}`,
        R && "rpc-datagrid--compact",
        Z
      ),
      ...de,
      children: [
        (m || j) && /* @__PURE__ */ c("div", { className: "rpc-datagrid__header", children: [
          m ? /* @__PURE__ */ e("h3", { className: "rpc-datagrid__title", children: m }) : null,
          j ? /* @__PURE__ */ e("p", { className: "rpc-datagrid__description", children: j }) : null
        ] }),
        (v || C.length > 0 || O) && /* @__PURE__ */ c("div", { className: "rpc-datagrid__toolbar", children: [
          C.length > 0 ? /* @__PURE__ */ c("div", { className: "rpc-datagrid__filter-popover", children: [
            /* @__PURE__ */ c(
              "button",
              {
                "aria-expanded": gr,
                className: "rpc-datagrid__filter-trigger",
                onClick: (o) => {
                  o.stopPropagation(), Xe((I) => !I);
                },
                type: "button",
                children: [
                  /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "M3 5h18l-7 8v5l-4 2v-7Z" }) }),
                  /* @__PURE__ */ e("span", { children: "Filter" }),
                  rr > 0 ? /* @__PURE__ */ e("strong", { children: rr }) : null
                ]
              }
            ),
            gr ? /* @__PURE__ */ c("div", { className: "rpc-datagrid__filter-menu", onClick: (o) => o.stopPropagation(), children: [
              /* @__PURE__ */ c("div", { className: "rpc-datagrid__filter-menu-header", children: [
                /* @__PURE__ */ e("strong", { children: "Filter by" }),
                rr > 0 ? /* @__PURE__ */ e("button", { onClick: Xr, type: "button", children: "Clear" }) : null
              ] }),
              C.map((o) => /* @__PURE__ */ c("fieldset", { className: "rpc-datagrid__filter-group", children: [
                /* @__PURE__ */ e("legend", { children: o.label }),
                o.options.map((I) => /* @__PURE__ */ c("label", { className: "rpc-datagrid__filter-option", children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      checked: (z[o.id] ?? []).includes(I.value),
                      onChange: () => Zr(o.id, I.value),
                      type: "checkbox"
                    }
                  ),
                  /* @__PURE__ */ e("span", { children: I.label })
                ] }, I.id))
              ] }, o.id))
            ] }) : null
          ] }) : null,
          C.length > 0 && v ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__toolbar-divider" }) : null,
          v ? /* @__PURE__ */ c("label", { className: "rpc-datagrid__search", children: [
            /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: "Search rows" }),
            /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "7" }),
              /* @__PURE__ */ e("path", { d: "m20 20-3.5-3.5" })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                className: "rpc-datagrid__search-input",
                onChange: (o) => Gr(o.target.value),
                placeholder: x,
                type: "search",
                value: he
              }
            )
          ] }) : null,
          O ? /* @__PURE__ */ c("div", { className: "rpc-datagrid__columns", children: [
            /* @__PURE__ */ e(
              "button",
              {
                "aria-expanded": br,
                className: "rpc-datagrid__columns-trigger",
                onClick: (o) => {
                  o.stopPropagation(), Je((I) => !I);
                },
                type: "button",
                children: "Columns"
              }
            ),
            br ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__columns-menu", onClick: (o) => o.stopPropagation(), children: r.filter((o) => o.hideable !== !1).map((o) => /* @__PURE__ */ c("label", { className: "rpc-datagrid__columns-option", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  checked: We.has(o.id),
                  onChange: () => Qr(o.id),
                  type: "checkbox"
                }
              ),
              /* @__PURE__ */ e("span", { children: typeof o.header == "string" ? o.header : o.id })
            ] }, o.id)) }) : null
          ] }) : null
        ] }),
        /* @__PURE__ */ e("div", { className: "rpc-datagrid__table-wrap", children: /* @__PURE__ */ c(
          "table",
          {
            className: fe(
              "rpc-datagrid__table",
              E && "rpc-datagrid__table--hoverable",
              h && "rpc-datagrid__table--striped"
            ),
            children: [
              /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ c("tr", { children: [
                V ? /* @__PURE__ */ e("th", { className: "rpc-datagrid__th rpc-datagrid__th--select", scope: "col", children: /* @__PURE__ */ e(
                  sr,
                  {
                    "aria-label": "Select all rows",
                    checked: !!er,
                    indeterminate: Yr,
                    onChange: ea
                  }
                ) }) : null,
                $e.map((o) => {
                  const I = ee === o.id, T = I ? ce ?? "ascending" : "none";
                  return /* @__PURE__ */ e(
                    "th",
                    {
                      "aria-sort": o.allowsSorting ? T : void 0,
                      className: fe("rpc-datagrid__th", o.className, o.align && `rpc-datagrid__cell--${o.align}`),
                      scope: "col",
                      style: o.width ? { width: typeof o.width == "number" ? `${o.width}px` : o.width } : void 0,
                      children: o.allowsSorting ? /* @__PURE__ */ c("button", { className: "rpc-datagrid__sort-button", onClick: () => ra(o), type: "button", children: [
                        /* @__PURE__ */ e("span", { children: wr(o) }),
                        /* @__PURE__ */ e("span", { className: "rpc-datagrid__sort-indicator", "aria-hidden": "true", children: I ? ce === "ascending" ? "↑" : "↓" : "↕" })
                      ] }) : wr(o)
                    },
                    o.id
                  );
                }),
                U.length ? /* @__PURE__ */ e("th", { className: "rpc-datagrid__th rpc-datagrid__th--actions", scope: "col", children: /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: "Actions" }) }) : null
              ] }) }),
              /* @__PURE__ */ e("tbody", { children: Ke ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { className: "rpc-datagrid__status", colSpan: na, children: Ke }) }) : Ie.map((o, I) => {
                const T = D(o, I), X = De.has(T), ae = _r === T;
                return /* @__PURE__ */ c(
                  "tr",
                  {
                    className: fe("rpc-datagrid__row", X && "rpc-datagrid__row--selected"),
                    onClick: _ ? () => _(o) : void 0,
                    children: [
                      V ? /* @__PURE__ */ e("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--select", onClick: (F) => F.stopPropagation(), children: /* @__PURE__ */ e(
                        sr,
                        {
                          "aria-label": `Select row ${I + 1}`,
                          checked: X,
                          onChange: () => yr(o, I)
                        }
                      ) }) : null,
                      $e.map((F, ne) => {
                        const se = F.cell ? F.cell(o, I) : String(we(o, F.accessorKey ?? F.id) ?? "");
                        return F.isRowHeader || ne === 0 ? /* @__PURE__ */ e(
                          "th",
                          {
                            className: fe(
                              "rpc-datagrid__cell",
                              F.className,
                              F.align && `rpc-datagrid__cell--${F.align}`,
                              "rpc-datagrid__cell--row-header"
                            ),
                            scope: "row",
                            children: se
                          },
                          `${F.id}-${T}`
                        ) : /* @__PURE__ */ e(
                          "td",
                          {
                            className: fe(
                              "rpc-datagrid__cell",
                              F.className,
                              F.align && `rpc-datagrid__cell--${F.align}`
                            ),
                            children: se
                          },
                          `${F.id}-${T}`
                        );
                      }),
                      U.length ? /* @__PURE__ */ c("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--actions", onClick: (F) => F.stopPropagation(), children: [
                        /* @__PURE__ */ e(
                          "button",
                          {
                            "aria-expanded": ae,
                            "aria-label": `Open actions for ${T}`,
                            className: "rpc-datagrid__action-trigger",
                            onClick: () => Ce((F) => F === T ? null : T),
                            type: "button",
                            children: /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                              /* @__PURE__ */ e("span", {}),
                              /* @__PURE__ */ e("span", {}),
                              /* @__PURE__ */ e("span", {})
                            ] })
                          }
                        ),
                        ae ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__action-menu", role: "menu", children: U.map((F) => {
                          const ne = typeof F.color == "string" && Ye(F.color) ? `rpc-datagrid__action-item--${F.color}` : "", se = typeof F.color == "string" && !Ye(F.color) ? { color: F.color } : void 0;
                          return /* @__PURE__ */ c(
                            "button",
                            {
                              className: fe("rpc-datagrid__action-item", ne, F.disabled && "rpc-datagrid__action-item--disabled"),
                              disabled: F.disabled,
                              style: se,
                              onClick: (Y) => {
                                Y.stopPropagation(), F.onClick(o, I), Ce(null);
                              },
                              role: "menuitem",
                              type: "button",
                              children: [
                                F.icon ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: se, children: F.icon }) : null,
                                /* @__PURE__ */ e("span", { children: F.name })
                              ]
                            },
                            F.id
                          );
                        }) }) : null
                      ] }) : null
                    ]
                  },
                  T
                );
              }) })
            ]
          }
        ) }),
        la ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__cards", children: Ke ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__status", children: Ke }) : Ie.map((o, I) => /* @__PURE__ */ e("div", { className: "rpc-datagrid__card-shell", children: G ? G(o, I) : ca(o, I) }, D(o, I))) }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-datagrid__footer", children: [
          /* @__PURE__ */ e("div", { className: "rpc-datagrid__summary", children: Pe > 0 ? /* @__PURE__ */ c("span", { children: [
            "Showing ",
            aa,
            " to ",
            ta,
            " of ",
            Pe
          ] }) : /* @__PURE__ */ e("span", { children: "Showing 0 rows" }) }),
          /* @__PURE__ */ c("div", { className: "rpc-datagrid__pagination", children: [
            /* @__PURE__ */ c("label", { className: "rpc-datagrid__page-size", children: [
              /* @__PURE__ */ e("span", { children: "Rows" }),
              /* @__PURE__ */ e(
                "select",
                {
                  className: "rpc-datagrid__select",
                  value: Q,
                  onChange: (o) => {
                    le(Number(o.target.value)), H(1);
                  },
                  children: b.map((o) => /* @__PURE__ */ e("option", { value: o, children: o }, o))
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "rpc-datagrid__pager", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: pe <= 1,
                  onClick: () => H((o) => Math.max(1, o - 1)),
                  type: "button",
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ c("span", { className: "rpc-datagrid__pager-info", children: [
                "Page ",
                pe,
                " of ",
                qe
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: pe >= qe,
                  onClick: () => H((o) => Math.min(qe, o + 1)),
                  type: "button",
                  children: "Next"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  jt as Alert,
  At as AppLayout,
  Vt as AreaChart,
  Wt as BarChart,
  Lt as BottomNavigation,
  Ht as Button,
  qt as Card,
  Et as Carousel,
  Kt as CategoryCard,
  Ut as ChartTooltip,
  Dr as Checkbox,
  $t as CheckboxGroup,
  Yt as Chip,
  Mt as ConfirmModal,
  Ot as DataGrid,
  nr as DatePicker,
  It as FileTree,
  Pt as FormBuilder,
  Dt as Header,
  Ft as HeroSlider,
  zt as HoverCard,
  Gt as ImageHeroCard,
  hr as Input,
  _a as InputEmail,
  fa as InputNumber,
  ga as InputPassword,
  Zt as LineChart,
  oa as Modal,
  wa as MultiSelect,
  Xt as Navbar,
  Jt as PieChart,
  Qt as RadarChart,
  en as RadialChart,
  va as RadioGroup,
  rn as SectionHeading,
  ya as Select,
  Bt as Sidebar,
  Na as Switch,
  ba as TextArea,
  an as ThemeRoot,
  St as ToastProvider,
  $a as UploadArea,
  Ct as useToast
};
