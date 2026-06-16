import { A as Vt, a as Ht, B as qt, b as Kt, C as Ut, c as Yt, d as zt, e as Gt, H as Zt, I as Xt, L as Jt, N as Qt, P as en, R as rn, f as an, S as tn, T as nn } from "./RadialChart-CmHscW91.js";
import { jsx as e, jsxs as c, Fragment as ke } from "react/jsx-runtime";
import { useEffect as ee, createContext as Lr, useState as L, useCallback as kr, useMemo as re, useContext as Er, forwardRef as Ce, useId as oe, useRef as ue, useImperativeHandle as ua } from "react";
function pa({ isOpen: r, onClose: a, title: t, children: n, className: l = "", closeOnOverlayClick: s = !0, ..._ }) {
  return ee(() => {
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
      children: /* @__PURE__ */ c("div", { className: "rpc-modal", ..._, children: [
        t ? /* @__PURE__ */ e("div", { className: "rpc-modal__header", children: /* @__PURE__ */ e("h3", { className: "rpc-modal__title", children: t }) }) : null,
        /* @__PURE__ */ e("div", { className: "rpc-modal__body", children: n }),
        a ? /* @__PURE__ */ e("button", { className: "rpc-modal__close", onClick: a, "aria-label": "Close modal", children: "×" }) : null
      ] })
    }
  ) : null;
}
const Dr = Lr(null), Mt = ({ children: r, position: a = "bottom-right" }) => {
  const [t, n] = L([]), l = kr((i) => {
    const p = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, v = { id: p, message: i.message, variant: i.variant ?? "info" };
    n((g) => [...g, v]);
    const k = i.duration ?? 4e3;
    setTimeout(() => n((g) => g.filter((f) => f.id !== p)), k);
  }, []), s = kr((i) => n((p) => p.filter((v) => v.id !== i)), []), _ = re(() => ({ showToast: l }), [l]);
  return /* @__PURE__ */ c(Dr.Provider, { value: _, children: [
    r,
    /* @__PURE__ */ e("div", { className: ["rpc-toast-container", `rpc-toast-container--${a}`].join(" "), "aria-live": "polite", children: t.map((i) => /* @__PURE__ */ e("div", { className: ["rpc-toast", `rpc-toast--${i.variant}`].join(" "), onClick: () => s(i.id), children: i.message }, i.id)) })
  ] });
};
function At() {
  const r = Er(Dr);
  if (!r) throw new Error("useToast must be used within a ToastProvider");
  return r;
}
function $t({ isOpen: r, onClose: a, title: t, message: n, actions: l, ...s }) {
  const i = (l ?? [
    { label: "Cancel", onClick: a ?? (() => {
    }), variant: "secondary" },
    { label: "Yes", onClick: a ?? (() => {
    }), variant: "primary" }
  ]).map((p, v) => /* @__PURE__ */ e("button", { className: ["rpc-button", p.variant === "primary" ? "rpc-button--primary" : "rpc-button--secondary"].join(" "), onClick: p.onClick, children: p.label }, v));
  return /* @__PURE__ */ c(pa, { isOpen: r, onClose: a, title: t, ...s, children: [
    /* @__PURE__ */ e("div", { style: { marginBottom: "1rem" }, children: n }),
    /* @__PURE__ */ e("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" }, children: i })
  ] });
}
function q(...r) {
  return r.filter((a) => typeof a == "string" && a.length > 0).join(" ");
}
function ha(r, a) {
  return a ? a.split(".").reduce((t, n) => {
    if (t && typeof t == "object" && n in t)
      return t[n];
  }, r) : r;
}
function ma(r) {
  return typeof r == "string" ? { url: r } : r;
}
function fa(r) {
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
function ba(r, a, t) {
  const n = new URL(r.url, typeof window > "u" ? "http://localhost" : window.location.origin), l = r.searchParam ?? "search", s = r.pageParam ?? "page", _ = r.limitParam ?? "limit";
  return a && n.searchParams.set(l, a), r.pageSize && (n.searchParams.set(s, String(t)), n.searchParams.set(_, String(r.pageSize))), Object.entries(r.queryParams ?? {}).forEach(([i, p]) => {
    p != null && n.searchParams.set(i, String(p));
  }), r.url.startsWith("http") ? n.toString() : `${n.pathname}${n.search}`;
}
function pr({
  children: r,
  className: a,
  disabled: t,
  error: n,
  fullWidth: l = !0,
  helperText: s,
  id: _,
  label: i,
  required: p
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
      htmlFor: _,
      children: [
        i ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
          i,
          p ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        r,
        v ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: v }) : null
      ]
    }
  );
}
function ga({ off: r = !1 }) {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "3" }),
    r ? /* @__PURE__ */ e("path", { d: "m4 4 16 16" }) : null
  ] });
}
const hr = Ce(function({
  className: a = "",
  disabled: t,
  error: n,
  fullWidth: l,
  helperText: s,
  id: _,
  inputClassName: i,
  label: p,
  prefix: v,
  required: k,
  suffix: g,
  type: f = "text",
  validationMessage: S,
  ...A
}, w) {
  const R = oe(), y = _ ?? A.name ?? R, E = n ?? S;
  return /* @__PURE__ */ e(
    pr,
    {
      className: a,
      disabled: t,
      error: E,
      fullWidth: l,
      helperText: s,
      id: y,
      label: p,
      required: k,
      children: /* @__PURE__ */ c("span", { className: "rpc-input-wrap", children: [
        v ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: v }) : null,
        /* @__PURE__ */ e(
          "input",
          {
            "aria-describedby": E || s ? `${y}-message` : void 0,
            "aria-invalid": !!E || void 0,
            className: q("rpc-form-input", i),
            disabled: t,
            id: y,
            ref: w,
            required: k,
            type: f,
            ...A
          }
        ),
        g ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: g }) : null
      ] })
    }
  );
}), _a = Ce(function({
  className: a = "",
  disabled: t,
  error: n,
  formatNumber: l = !1,
  fullWidth: s,
  helperText: _,
  id: i,
  inputClassName: p,
  label: v,
  max: k,
  min: g,
  onValueChange: f,
  prefix: S,
  required: A,
  step: w = 1,
  suffix: R,
  value: y,
  ...E
}, d) {
  var $;
  const u = oe(), x = i ?? E.name ?? u, [M, D] = L(y === void 0 ? "" : String(y)), b = y === void 0 ? M : String(y);
  ee(() => {
    y !== void 0 && D(String(y));
  }, [y]);
  const h = b === "" ? null : Number(b), F = typeof document < "u" && (($ = document.activeElement) == null ? void 0 : $.id) === x, j = l && !F && h !== null ? new Intl.NumberFormat().format(h) : b, H = (K) => {
    y === void 0 && D(K), f == null || f(K === "" ? null : Number(K));
  }, V = (K) => {
    let U = K;
    return g !== void 0 && (U = Math.max(Number(g), U)), k !== void 0 && (U = Math.min(Number(k), U)), U;
  }, C = (K) => {
    const U = h ?? Number(g ?? 0);
    H(String(V(U + Number(w) * K)));
  };
  return /* @__PURE__ */ e(
    pr,
    {
      className: a,
      disabled: t,
      error: n,
      fullWidth: s,
      helperText: _,
      id: x,
      label: v,
      required: A,
      children: /* @__PURE__ */ c("span", { className: "rpc-input-wrap rpc-input-wrap--number", children: [
        S ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: S }) : null,
        /* @__PURE__ */ e(
          "input",
          {
            "aria-invalid": !!n || void 0,
            className: q("rpc-form-input", p),
            disabled: t,
            id: x,
            max: k,
            min: g,
            inputMode: l ? "decimal" : void 0,
            onChange: (K) => H(l ? K.target.value.replace(/,/g, "") : K.target.value),
            ref: d,
            required: A,
            step: w,
            type: l ? "text" : "number",
            value: j,
            ...E
          }
        ),
        /* @__PURE__ */ c("span", { className: "rpc-number-stepper", "aria-hidden": t, children: [
          /* @__PURE__ */ e("button", { disabled: t, onClick: () => C(1), tabIndex: -1, type: "button", children: "+" }),
          /* @__PURE__ */ e("button", { disabled: t, onClick: () => C(-1), tabIndex: -1, type: "button", children: "-" })
        ] }),
        R ? /* @__PURE__ */ e("span", { className: "rpc-input-wrap__affix", children: R }) : null
      ] })
    }
  );
}), va = Ce(function({ helperText: a = "Gunakan format email yang valid.", validateOnBlur: t = !0, onBlur: n, error: l, ...s }, _) {
  const [i, p] = L(null);
  return /* @__PURE__ */ e(
    hr,
    {
      error: l ?? i,
      helperText: a,
      inputMode: "email",
      onBlur: (v) => {
        t && v.currentTarget.value && !v.currentTarget.checkValidity() ? p("Format email belum valid.") : p(null), n == null || n(v);
      },
      ref: _,
      type: "email",
      ...s
    }
  );
}), Na = Ce(function({ showStrength: a = !0, value: t, defaultValue: n, helperText: l, error: s, ..._ }, i) {
  const [p, v] = L(!1), [k, g] = L(String(n ?? t ?? "")), f = t === void 0 ? k : String(t ?? ""), S = re(() => {
    let w = 0;
    return f.length >= 8 && (w += 1), /[A-Z]/.test(f) && (w += 1), /[0-9]/.test(f) && (w += 1), /[^A-Za-z0-9]/.test(f) && (w += 1), w;
  }, [f]), A = ["Very weak", "Weak", "Medium", "Strong", "Excellent"][S];
  return /* @__PURE__ */ c("div", { className: "rpc-password-field", children: [
    /* @__PURE__ */ e(
      hr,
      {
        error: s,
        helperText: l,
        onChange: (w) => {
          var R;
          t === void 0 && g(w.target.value), (R = _.onChange) == null || R.call(_, w);
        },
        ref: i,
        suffix: /* @__PURE__ */ e(
          "button",
          {
            "aria-label": p ? "Hide password" : "Show password",
            className: "rpc-password-toggle",
            onClick: () => v((w) => !w),
            type: "button",
            children: /* @__PURE__ */ e(ga, { off: p })
          }
        ),
        type: p ? "text" : "password",
        value: t === void 0 ? k : t,
        ..._
      }
    ),
    /* @__PURE__ */ e("input", { hidden: !0, readOnly: !0, type: p ? "text" : "password", value: f }),
    a ? /* @__PURE__ */ c("div", { className: "rpc-password-strength", "aria-label": `Password strength ${A}`, children: [
      /* @__PURE__ */ e("span", { className: "rpc-password-strength__track", children: /* @__PURE__ */ e("span", { className: `rpc-password-strength__bar rpc-password-strength__bar--${S}` }) }),
      /* @__PURE__ */ e("span", { children: A })
    ] }) : null
  ] });
}), ya = Ce(function({
  autoResize: a = !0,
  className: t = "",
  disabled: n,
  error: l,
  fullWidth: s,
  helperText: _,
  id: i,
  inputClassName: p,
  label: v,
  maxLength: k,
  onChange: g,
  required: f,
  showCounter: S = !0,
  value: A,
  defaultValue: w,
  ...R
}, y) {
  const E = oe(), d = i ?? R.name ?? E, u = ue(null), [x, M] = L(String(A ?? w ?? "").length), D = () => {
    const b = u.current;
    !b || !a || (b.style.height = "auto", b.style.height = `${b.scrollHeight}px`);
  };
  return ee(D, [a, A]), ua(y, () => u.current), /* @__PURE__ */ c(
    pr,
    {
      className: t,
      disabled: n,
      error: l,
      fullWidth: s,
      helperText: _,
      id: d,
      label: v,
      required: f,
      children: [
        /* @__PURE__ */ e(
          "textarea",
          {
            "aria-invalid": !!l || void 0,
            className: q("rpc-form-textarea", p),
            disabled: n,
            id: d,
            maxLength: k,
            onChange: (b) => {
              M(b.target.value.length), D(), g == null || g(b);
            },
            ref: u,
            required: f,
            value: A,
            defaultValue: w,
            ...R
          }
        ),
        S && k ? /* @__PURE__ */ c("span", { className: "rpc-form-counter", children: [
          x,
          "/",
          k
        ] }) : null
      ]
    }
  );
}), Or = Ce(function({ className: a = "", description: t, disabled: n, error: l, helperText: s, id: _, label: i, required: p, ...v }, k) {
  const g = oe(), f = _ ?? v.name ?? g, S = l ?? s;
  return /* @__PURE__ */ c("label", { className: q("rpc-choice", n && "rpc-choice--disabled", l && "rpc-choice--error", a), htmlFor: f, children: [
    /* @__PURE__ */ e(
      "input",
      {
        "aria-invalid": !!l || void 0,
        className: "rpc-choice__native",
        disabled: n,
        id: f,
        ref: k,
        required: p,
        type: "checkbox",
        ...v
      }
    ),
    /* @__PURE__ */ e("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
    /* @__PURE__ */ c("span", { className: "rpc-choice__content", children: [
      i ? /* @__PURE__ */ c("span", { className: "rpc-choice__label", children: [
        i,
        p ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: t }) : null,
      S ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", l && "rpc-form-field__message--error"), children: S }) : null
    ] })
  ] });
});
function Pt({
  className: r = "",
  defaultValue: a = [],
  disabled: t,
  error: n,
  helperText: l,
  label: s,
  layout: _ = "vertical",
  name: i,
  onValueChange: p,
  options: v,
  required: k,
  value: g
}) {
  const [f, S] = L(a), A = g ?? f, w = n ?? l, R = (y) => {
    const E = A.includes(y) ? A.filter((d) => d !== y) : [...A, y];
    g === void 0 && S(E), p == null || p(E);
  };
  return /* @__PURE__ */ c("fieldset", { className: q("rpc-choice-group", `rpc-choice-group--${_}`, n && "rpc-choice-group--error", r), children: [
    s ? /* @__PURE__ */ c("legend", { className: "rpc-form-field__label", children: [
      s,
      k ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-choice-group__items", children: v.map((y) => /* @__PURE__ */ e(
      Or,
      {
        checked: A.includes(y.value),
        description: y.description,
        disabled: t || y.disabled,
        label: y.label,
        name: i,
        onChange: () => R(y.value),
        value: y.value
      },
      y.value
    )) }),
    w ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: w }) : null
  ] });
}
function wa({
  className: r = "",
  defaultValue: a,
  disabled: t,
  error: n,
  helperText: l,
  label: s,
  layout: _ = "vertical",
  name: i,
  onValueChange: p,
  options: v,
  required: k,
  value: g
}) {
  const f = oe(), S = i ?? f, [A, w] = L(a ?? ""), R = g ?? A, y = n ?? l;
  return /* @__PURE__ */ c("fieldset", { className: q("rpc-choice-group", `rpc-choice-group--${_}`, n && "rpc-choice-group--error", r), children: [
    s ? /* @__PURE__ */ c("legend", { className: "rpc-form-field__label", children: [
      s,
      k ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-choice-group__items", children: v.map((E) => /* @__PURE__ */ c(
      "label",
      {
        className: q("rpc-choice rpc-choice--radio", (t || E.disabled) && "rpc-choice--disabled"),
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              checked: R === E.value,
              className: "rpc-choice__native",
              disabled: t || E.disabled,
              name: S,
              onChange: () => {
                g === void 0 && w(E.value), p == null || p(E.value);
              },
              required: k,
              type: "radio",
              value: E.value
            }
          ),
          /* @__PURE__ */ e("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
          /* @__PURE__ */ c("span", { className: "rpc-choice__content", children: [
            /* @__PURE__ */ e("span", { className: "rpc-choice__label", children: E.label }),
            E.description ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: E.description }) : null
          ] })
        ]
      },
      E.value
    )) }),
    y ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", n && "rpc-form-field__message--error"), children: y }) : null
  ] });
}
const xa = Ce(function({ className: a = "", description: t, disabled: n, error: l, helperText: s, id: _, label: i, offLabel: p = "Off", onLabel: v = "On", required: k, ...g }, f) {
  const S = oe(), A = _ ?? g.name ?? S, w = l ?? s;
  return /* @__PURE__ */ c("label", { className: q("rpc-switch", n && "rpc-switch--disabled", l && "rpc-switch--error", a), htmlFor: A, children: [
    /* @__PURE__ */ e(
      "input",
      {
        "aria-invalid": !!l || void 0,
        className: "rpc-switch__native",
        disabled: n,
        id: A,
        ref: f,
        required: k,
        type: "checkbox",
        ...g
      }
    ),
    /* @__PURE__ */ e("span", { className: "rpc-switch__track", "aria-hidden": "true", children: /* @__PURE__ */ e("span", { className: "rpc-switch__thumb" }) }),
    /* @__PURE__ */ c("span", { className: "rpc-switch__content", children: [
      i ? /* @__PURE__ */ c("span", { className: "rpc-choice__label", children: [
        i,
        k ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ e("span", { className: "rpc-choice__description", children: t }) : null,
      /* @__PURE__ */ c("span", { className: "rpc-switch__state", children: [
        /* @__PURE__ */ e("span", { children: p }),
        /* @__PURE__ */ e("span", { children: v })
      ] }),
      w ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", l && "rpc-form-field__message--error"), children: w }) : null
    ] })
  ] });
});
function Rr(r, a, t) {
  const [n, l] = L(1), [s, _] = L([]), [i, p] = L(!1), [v, k] = L(null), g = re(() => r ? ma(r) : null, [r]), f = !!(g != null && g.pageSize);
  return ee(() => {
    l(1);
  }, [t, r, a]), ee(() => {
    if (!g && !a) return;
    const S = new AbortController();
    return p(!0), k(null), (a ? Promise.resolve(a(t, n)) : fetch(ba(g, t, n), {
      headers: g == null ? void 0 : g.headers,
      signal: S.signal
    }).then((w) => {
      if (!w.ok) throw new Error(`Request failed ${w.status}`);
      return w.json();
    }).then((w) => {
      const R = g, y = ha(w, R.dataPath);
      return (Array.isArray(y) ? y : Array.isArray(w) ? w : []).map((d) => R.mapOption ? R.mapOption(d) : fa(d));
    })).then((w) => {
      _((R) => n === 1 ? w : [...R, ...w]);
    }).catch((w) => {
      w instanceof DOMException && w.name === "AbortError" || k(w instanceof Error ? w.message : "Gagal mengambil data.");
    }).finally(() => p(!1)), () => S.abort();
  }, [g, a, n, t]), {
    canLoadMore: f,
    error: v,
    isLoading: i,
    options: s,
    setPage: l
  };
}
function jr() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "m6 9 6 6 6-6" }) });
}
function Tr({ onClear: r }) {
  return /* @__PURE__ */ e("button", { "aria-label": "Clear value", className: "rpc-select__clear", onClick: r, type: "button", children: "x" });
}
function ka({
  className: r = "",
  clearable: a = !0,
  defaultValue: t = "",
  disabled: n,
  endpoint: l,
  error: s,
  fullWidth: _ = !0,
  helperText: i,
  label: p,
  loadOptions: v,
  name: k,
  onValueChange: g,
  options: f = [],
  placeholder: S = "Select option",
  searchPlaceholder: A = "Search...",
  required: w,
  searchable: R = !0,
  value: y
}) {
  const E = oe(), d = `${k ?? E}-button`, [u, x] = L(!1), [M, D] = L(""), [b, h] = L(t), F = ue(null), j = Rr(l, v, M), H = l || v ? j.options : f, V = y ?? b, C = H.find((N) => N.value === V) ?? null, $ = l || v ? H : H.filter((N) => `${N.label} ${N.description ?? ""}`.toLowerCase().includes(M.toLowerCase())), K = s ?? i ?? j.error;
  ee(() => {
    const N = (B) => {
      var G;
      (G = F.current) != null && G.contains(B.target) || x(!1);
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, []);
  const U = (N) => {
    const B = (N == null ? void 0 : N.value) ?? "";
    y === void 0 && h(B), g == null || g(B, N), x(!1);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-select",
        _ && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        K && s && "rpc-form-field--error",
        r
      ),
      ref: F,
      children: [
        p ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: d, children: [
          p,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ e("input", { name: k, readOnly: !0, required: w, type: "hidden", value: V }),
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": u,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger",
            disabled: n,
            id: d,
            onClick: () => x((N) => !N),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: q(!C && "rpc-select__placeholder"), children: (C == null ? void 0 : C.label) ?? S }),
              a && V ? /* @__PURE__ */ e(Tr, { onClear: () => U(null) }) : null,
              /* @__PURE__ */ e("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ e(jr, {}) })
            ]
          }
        ),
        u ? /* @__PURE__ */ c("div", { className: "rpc-select__popover", children: [
          R ? /* @__PURE__ */ e(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: (N) => D(N.target.value),
              placeholder: A,
              type: "search",
              value: M
            }
          ) : null,
          /* @__PURE__ */ c("div", { className: "rpc-select__list", role: "listbox", children: [
            $.map((N) => /* @__PURE__ */ c(
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
            !j.isLoading && $.length === 0 ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            j.isLoading ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          l && j.canLoadMore ? /* @__PURE__ */ e("button", { className: "rpc-select__load", disabled: j.isLoading, onClick: () => j.setPage((N) => N + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        K ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", s && "rpc-form-field__message--error"), children: K }) : null
      ]
    }
  );
}
function Ca({
  className: r = "",
  clearable: a = !0,
  defaultValue: t = [],
  disabled: n,
  endpoint: l,
  error: s,
  fullWidth: _ = !0,
  helperText: i,
  label: p,
  loadOptions: v,
  maxVisibleTags: k = 3,
  name: g,
  onValueChange: f,
  options: S = [],
  placeholder: A = "Select options",
  searchPlaceholder: w = "Search...",
  required: R,
  searchable: y = !0,
  value: E
}) {
  const d = oe(), u = `${g ?? d}-button`, [x, M] = L(!1), [D, b] = L(""), [h, F] = L(t), j = ue(null), H = Rr(l, v, D), V = l || v ? H.options : S, C = E ?? h, $ = C.map((m) => V.find((W) => W.value === m)).filter(Boolean), K = l || v ? V : V.filter((m) => `${m.label} ${m.description ?? ""}`.toLowerCase().includes(D.toLowerCase())), U = s ?? i ?? H.error;
  ee(() => {
    const m = (W) => {
      var Z;
      (Z = j.current) != null && Z.contains(W.target) || M(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, []);
  const N = (m) => {
    const W = m.map((Z) => V.find((pe) => pe.value === Z)).filter(Boolean);
    E === void 0 && F(m), f == null || f(m, W);
  }, B = (m) => {
    m.disabled || N(C.includes(m.value) ? C.filter((W) => W !== m.value) : [...C, m.value]);
  }, G = (m, W) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), B(W));
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-select",
        "rpc-select--multi",
        _ && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        r
      ),
      ref: j,
      children: [
        p ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: u, children: [
          p,
          R ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        C.map((m) => /* @__PURE__ */ e("input", { name: g, readOnly: !0, type: "hidden", value: m }, m)),
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": x,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger rpc-select__trigger--multi",
            disabled: n,
            id: u,
            onClick: () => M((m) => !m),
            type: "button",
            children: [
              $.length ? /* @__PURE__ */ c("span", { className: "rpc-select__tags", children: [
                $.slice(0, k).map((m) => /* @__PURE__ */ e("span", { className: "rpc-select__tag", children: m.label }, m.value)),
                $.length > k ? /* @__PURE__ */ c("span", { className: "rpc-select__tag", children: [
                  "+",
                  $.length - k
                ] }) : null
              ] }) : /* @__PURE__ */ e("span", { className: "rpc-select__placeholder", children: A }),
              a && C.length ? /* @__PURE__ */ e(Tr, { onClear: () => N([]) }) : null,
              /* @__PURE__ */ e("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ e(jr, {}) })
            ]
          }
        ),
        x ? /* @__PURE__ */ c("div", { className: "rpc-select__popover", children: [
          y ? /* @__PURE__ */ e(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: (m) => b(m.target.value),
              placeholder: w,
              type: "search",
              value: D
            }
          ) : null,
          /* @__PURE__ */ c("div", { className: "rpc-select__list", role: "listbox", "aria-multiselectable": "true", children: [
            K.map((m) => /* @__PURE__ */ c(
              "button",
              {
                "aria-selected": C.includes(m.value),
                className: q("rpc-select__option", C.includes(m.value) && "rpc-select__option--selected"),
                disabled: m.disabled,
                onClick: () => B(m),
                onKeyDown: (W) => G(W, m),
                role: "option",
                type: "button",
                children: [
                  /* @__PURE__ */ e("span", { children: m.label }),
                  m.description ? /* @__PURE__ */ e("small", { children: m.description }) : null
                ]
              },
              m.value
            )),
            !H.isLoading && K.length === 0 ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            H.isLoading ? /* @__PURE__ */ e("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          l && H.canLoadMore ? /* @__PURE__ */ e("button", { className: "rpc-select__load", disabled: H.isLoading, onClick: () => H.setPage((m) => m + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        U ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", s && "rpc-form-field__message--error"), children: U }) : null
      ]
    }
  );
}
const Sa = new Intl.DateTimeFormat("en", { weekday: "short" }), Ma = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });
function tr(r) {
  if (!r) return null;
  const a = /* @__PURE__ */ new Date(`${r}T00:00:00`);
  return Number.isNaN(a.getTime()) ? null : a;
}
function Aa(r) {
  const a = String(r.getMonth() + 1).padStart(2, "0"), t = String(r.getDate()).padStart(2, "0");
  return `${r.getFullYear()}-${a}-${t}`;
}
function $a(r, a) {
  return !!(r && a && r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth() && r.getDate() === a.getDate());
}
function nr({
  className: r = "",
  clearable: a = !0,
  defaultValue: t,
  disabled: n,
  disabledDate: l,
  error: s,
  fullWidth: _ = !0,
  helperText: i,
  id: p,
  label: v,
  maxDate: k,
  minDate: g,
  name: f,
  onValueChange: S,
  placeholder: A = "YYYY-MM-DD",
  required: w,
  value: R,
  ...y
}) {
  const E = oe(), d = p ?? f ?? E, [u, x] = L(!1), [M, D] = L(String(t ?? "")), b = R ?? M, h = tr(b), [F, j] = L(() => h ?? /* @__PURE__ */ new Date()), H = ue(null), V = tr(g), C = tr(k);
  ee(() => {
    const B = (G) => {
      var m;
      (m = H.current) != null && m.contains(G.target) || x(!1);
    };
    return document.addEventListener("mousedown", B), () => document.removeEventListener("mousedown", B);
  }, []), ee(() => {
    h && j(h);
  }, [b]);
  const $ = re(() => {
    const B = new Date(F.getFullYear(), F.getMonth(), 1), G = new Date(F.getFullYear(), F.getMonth() + 1, 0), m = B.getDay(), W = [];
    for (let Z = 0; Z < m; Z += 1)
      W.push(new Date(B.getFullYear(), B.getMonth(), Z - m + 1));
    for (let Z = 1; Z <= G.getDate(); Z += 1)
      W.push(new Date(B.getFullYear(), B.getMonth(), Z));
    for (; W.length % 7 !== 0; ) {
      const Z = W[W.length - 1];
      W.push(new Date(Z.getFullYear(), Z.getMonth(), Z.getDate() + 1));
    }
    return W;
  }, [F]), K = re(() => {
    const B = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (G, m) => Sa.format(new Date(B.getFullYear(), B.getMonth(), B.getDate() + m)).slice(0, 2));
  }, []), U = (B) => V && B < V || C && B > C ? !0 : (l == null ? void 0 : l(B)) ?? !1, N = (B) => {
    R === void 0 && D(B), S == null || S(B);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-date-picker",
        _ && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        s && "rpc-form-field--error",
        r
      ),
      ref: H,
      children: [
        v ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: d, children: [
          v,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c("span", { className: "rpc-input-wrap", children: [
          /* @__PURE__ */ e(
            "input",
            {
              "aria-expanded": u,
              "aria-haspopup": "dialog",
              "aria-invalid": !!s || void 0,
              className: "rpc-form-input",
              disabled: n,
              id: d,
              max: k,
              min: g,
              name: f,
              onChange: (B) => N(B.target.value),
              onFocus: () => x(!0),
              placeholder: A,
              required: w,
              type: "text",
              value: b,
              ...y
            }
          ),
          a && b ? /* @__PURE__ */ e("button", { "aria-label": "Clear date", className: "rpc-select__clear", onClick: () => N(""), type: "button", children: "x" }) : null,
          /* @__PURE__ */ e("button", { "aria-label": "Open calendar", className: "rpc-date-picker__button", disabled: n, onClick: () => x((B) => !B), type: "button", children: /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e("rect", { x: "3", y: "4", width: "18", height: "18", rx: "3" }),
            /* @__PURE__ */ e("path", { d: "M8 2v4M16 2v4M3 10h18" })
          ] }) })
        ] }),
        u ? /* @__PURE__ */ c("div", { className: "rpc-date-picker__calendar", role: "dialog", "aria-label": "Choose date", children: [
          /* @__PURE__ */ c("div", { className: "rpc-date-picker__header", children: [
            /* @__PURE__ */ e("button", { onClick: () => j(new Date(F.getFullYear(), F.getMonth() - 1, 1)), type: "button", children: "‹" }),
            /* @__PURE__ */ e("strong", { children: Ma.format(F) }),
            /* @__PURE__ */ e("button", { onClick: () => j(new Date(F.getFullYear(), F.getMonth() + 1, 1)), type: "button", children: "›" })
          ] }),
          /* @__PURE__ */ c("div", { className: "rpc-date-picker__grid", children: [
            K.map((B) => /* @__PURE__ */ e("span", { className: "rpc-date-picker__weekday", children: B }, B)),
            $.map((B) => {
              const G = Aa(B), m = B.getMonth() !== F.getMonth();
              return /* @__PURE__ */ e(
                "button",
                {
                  className: q(
                    "rpc-date-picker__day",
                    m && "rpc-date-picker__day--outside",
                    $a(B, h) && "rpc-date-picker__day--selected"
                  ),
                  disabled: U(B),
                  onClick: () => {
                    N(G), x(!1);
                  },
                  type: "button",
                  children: B.getDate()
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
function Cr(r) {
  return r < 1024 * 1024 ? `${Math.round(r / 1024)} KB` : `${(r / (1024 * 1024)).toFixed(1)} MB`;
}
function Pa(r, a) {
  return a ? a.split(",").map((n) => n.trim()).filter(Boolean).some((n) => n.endsWith("/*") ? r.type.startsWith(n.replace("/*", "/")) : n.startsWith(".") ? r.name.toLowerCase().endsWith(n.toLowerCase()) : r.type === n) : !0;
}
function Ba({
  accept: r,
  className: a = "",
  description: t = "Drag file ke sini atau klik untuk memilih file.",
  disabled: n,
  error: l,
  files: s,
  fullWidth: _ = !0,
  helperText: i,
  id: p,
  label: v,
  maxFileSize: k,
  multiple: g = !0,
  name: f,
  onFilesChange: S,
  progress: A,
  required: w,
  ...R
}) {
  const y = oe(), E = p ?? f ?? y, d = ue(null), [u, x] = L(!1), [M, D] = L([]), [b, h] = L(null), F = s ?? M, j = F.map((N) => ({
    file: N,
    url: N.type.startsWith("image/") ? URL.createObjectURL(N) : null
  }));
  ee(() => () => j.forEach((N) => N.url && URL.revokeObjectURL(N.url)), [F]);
  const H = (N) => {
    s === void 0 && D(N), S == null || S(N);
  }, V = (N) => {
    const B = [], G = [];
    return N.forEach((m) => {
      if (k && m.size > k) {
        G.push(`${m.name} melebihi ${Cr(k)}.`);
        return;
      }
      if (!Pa(m, r)) {
        G.push(`${m.name} tidak sesuai tipe file.`);
        return;
      }
      B.push(m);
    }), h(G[0] ?? null), B;
  }, C = (N) => {
    const B = V(Array.from(N));
    B.length && H(g ? [...F, ...B] : B.slice(0, 1));
  }, $ = (N) => {
    H(F.filter((B) => B.name !== N));
  }, K = (N) => typeof A == "number" ? A : (A == null ? void 0 : A[N.name]) ?? 0, U = l ?? b ?? i;
  return /* @__PURE__ */ c(
    "div",
    {
      className: q(
        "rpc-form-field",
        "rpc-upload",
        _ && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        (l || b) && "rpc-form-field--error",
        a
      ),
      children: [
        v ? /* @__PURE__ */ c("label", { className: "rpc-form-field__label", htmlFor: E, children: [
          v,
          w ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c(
          "button",
          {
            className: q("rpc-upload__dropzone", u && "rpc-upload__dropzone--dragging"),
            disabled: n,
            onClick: () => {
              var N;
              return (N = d.current) == null ? void 0 : N.click();
            },
            onDragEnter: (N) => {
              N.preventDefault(), x(!0);
            },
            onDragLeave: (N) => {
              N.preventDefault(), x(!1);
            },
            onDragOver: (N) => N.preventDefault(),
            onDrop: (N) => {
              N.preventDefault(), x(!1), C(N.dataTransfer.files);
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
            id: E,
            multiple: g,
            name: f,
            onChange: (N) => {
              N.target.files && C(N.target.files), N.target.value = "";
            },
            ref: d,
            required: w,
            type: "file",
            ...R
          }
        ),
        F.length ? /* @__PURE__ */ e("ul", { className: "rpc-upload__list", children: j.map(({ file: N, url: B }) => /* @__PURE__ */ c("li", { className: "rpc-upload__item", children: [
          B ? /* @__PURE__ */ e("img", { alt: N.name, src: B }) : /* @__PURE__ */ e("span", { className: "rpc-upload__file-icon", children: "FILE" }),
          /* @__PURE__ */ c("span", { className: "rpc-upload__meta", children: [
            /* @__PURE__ */ e("strong", { children: N.name }),
            /* @__PURE__ */ e("small", { children: Cr(N.size) }),
            K(N) > 0 ? /* @__PURE__ */ e("span", { className: "rpc-upload__progress", children: /* @__PURE__ */ e("span", { style: { width: `${Math.min(100, K(N))}%` } }) }) : null
          ] }),
          /* @__PURE__ */ e("button", { "aria-label": `Remove ${N.name}`, onClick: () => $(N.name), type: "button", children: "x" })
        ] }, `${N.name}-${N.lastModified}`)) }) : null,
        U ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", (l || b) && "rpc-form-field__message--error"), children: U }) : null
      ]
    }
  );
}
function Ia(r, a) {
  return r === "checkbox" || r === "switch" ? !1 : r === "range" || r === "rating" ? 0 : r === "date-range" ? { start: "", end: "" } : r === "file" ? a ? [] : null : r === "select" && a ? [] : "";
}
function Fa(r, a) {
  var t;
  return r[a.name] ?? Ia(a.kind, (t = a.props) == null ? void 0 : t.multiple);
}
function La(r) {
  const a = [], t = /* @__PURE__ */ new Map();
  return r.forEach((n, l) => {
    const s = n.row ?? `__single_${l}`, _ = t.get(s);
    if (_) {
      _.fields.push(n);
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
        onChange: (_) => l(_.target.value),
        placeholder: s.placeholder,
        required: s.required,
        type: t,
        value: n
      }
    ) }),
    r ?? s.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? s.hint }) : null
  ] });
}
function Ea({
  error: r,
  field: a,
  value: t,
  onChange: n
}) {
  const l = a.props ?? {}, s = l.length ?? 6, _ = t.padEnd(s, " ").slice(0, s).split("");
  return /* @__PURE__ */ c("label", { className: q("rpc-form-field", l.className, r && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
      a.label,
      l.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ e("span", { className: "rpc-form-otp", role: "group", "aria-label": typeof a.label == "string" ? a.label : a.name, children: _.map((i, p) => /* @__PURE__ */ e(
      "input",
      {
        "aria-label": `Digit ${p + 1}`,
        className: q("rpc-form-otp__input", l.inputClassName),
        disabled: l.disabled,
        inputMode: "numeric",
        maxLength: 1,
        onChange: (v) => {
          const k = _.map((g) => g.trim());
          k[p] = v.target.value.slice(-1), n(k.join("").slice(0, s)), v.currentTarget.nextElementSibling instanceof HTMLInputElement && v.target.value && v.currentTarget.nextElementSibling.focus();
        },
        required: l.required,
        value: i.trim()
      },
      `${a.name}-${p}`
    )) }),
    r ?? l.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? l.hint }) : null
  ] });
}
function Da({
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
function Oa({
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
    /* @__PURE__ */ e("div", { className: "rpc-form-rating", role: "radiogroup", "aria-label": typeof a.label == "string" ? a.label : a.name, children: Array.from({ length: s }, (_, i) => {
      const p = i + 1;
      return /* @__PURE__ */ e(
        "button",
        {
          "aria-checked": t === p,
          className: q("rpc-form-rating__item", p <= t && "rpc-form-rating__item--active"),
          disabled: l.disabled,
          onClick: () => n(p),
          role: "radio",
          type: "button",
          children: "★"
        },
        p
      );
    }) }),
    r ?? l.hint ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", r && "rpc-form-field__message--error"), children: r ?? l.hint }) : null
  ] });
}
function Bt({
  actions: r,
  className: a = "",
  columns: t = 2,
  defaultValues: n,
  errors: l,
  fields: s,
  onReset: _,
  onSubmit: i,
  onValuesChange: p,
  resetLabel: v = "Reset",
  showActions: k = !0,
  submitLabel: g = "Submit",
  values: f
}) {
  const [S, A] = L(n ?? {}), w = re(() => ({ ...S, ...f }), [S, f]), R = re(() => La(s), [s]), y = (d, u) => {
    const x = {
      ...w,
      [d]: u
    };
    f || A(x), p == null || p(x, d, u);
  }, E = (d) => {
    const u = d.props ?? {}, x = Fa(w, d), M = l == null ? void 0 : l[d.name], D = u.hint, b = {
      className: u.className,
      disabled: u.disabled,
      error: M,
      helperText: D,
      inputClassName: u.inputClassName,
      label: d.label,
      name: d.name,
      placeholder: u.placeholder,
      required: u.required
    };
    if (d.render)
      return d.render({
        error: M,
        field: d,
        setValue: (h) => y(d.name, h),
        value: x,
        values: w
      });
    if (d.kind === "textarea")
      return /* @__PURE__ */ e(
        ya,
        {
          ...b,
          maxLength: typeof u.max == "number" ? u.max : void 0,
          onChange: (h) => y(d.name, h.target.value),
          rows: u.rows,
          value: String(x ?? "")
        }
      );
    if (d.kind === "otp")
      return /* @__PURE__ */ e(Ea, { error: M, field: d, onChange: (h) => y(d.name, h), value: String(x ?? "") });
    if (d.kind === "checkbox")
      return /* @__PURE__ */ e(
        Or,
        {
          checked: !!x,
          description: u.description,
          disabled: u.disabled,
          error: M,
          label: d.label,
          name: d.name,
          onChange: (h) => y(d.name, h.target.checked),
          required: u.required
        }
      );
    if (d.kind === "switch")
      return /* @__PURE__ */ e(
        xa,
        {
          checked: !!x,
          description: u.description,
          disabled: u.disabled,
          error: M,
          label: d.label,
          name: d.name,
          onChange: (h) => y(d.name, h.target.checked),
          required: u.required
        }
      );
    if (d.kind === "radio")
      return /* @__PURE__ */ e(
        wa,
        {
          ...b,
          onValueChange: (h) => y(d.name, h),
          options: d.options ?? [],
          value: String(x ?? "")
        }
      );
    if (d.kind === "range")
      return /* @__PURE__ */ e(Da, { error: M, field: d, onChange: (h) => y(d.name, h), value: Number(x ?? 0) });
    if (d.kind === "rating")
      return /* @__PURE__ */ e(Oa, { error: M, field: d, onChange: (h) => y(d.name, h), value: Number(x ?? 0) });
    if (d.kind === "color")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "color", value: String(x || "#2563eb") });
    if (d.kind === "date")
      return /* @__PURE__ */ e(
        nr,
        {
          ...b,
          maxDate: typeof u.max == "string" ? u.max : void 0,
          minDate: typeof u.min == "string" ? u.min : void 0,
          onValueChange: (h) => y(d.name, h),
          value: String(x ?? "")
        }
      );
    if (d.kind === "time")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "time", value: String(x ?? "") });
    if (d.kind === "datetime")
      return /* @__PURE__ */ e(lr, { error: M, field: d, onChange: (h) => y(d.name, h), type: "datetime-local", value: String(x ?? "") });
    if (d.kind === "date-range") {
      const h = x && typeof x == "object" ? x : {};
      return /* @__PURE__ */ c("div", { className: q("rpc-form-field", u.className, M && "rpc-form-field--error"), children: [
        d.label ? /* @__PURE__ */ c("span", { className: "rpc-form-field__label", children: [
          d.label,
          u.required ? /* @__PURE__ */ e("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-form-date-range", children: [
          /* @__PURE__ */ e(
            nr,
            {
              maxDate: typeof u.max == "string" ? u.max : void 0,
              minDate: typeof u.min == "string" ? u.min : void 0,
              onValueChange: (F) => y(d.name, { ...h, start: F }),
              placeholder: "Start date",
              value: h.start ?? ""
            }
          ),
          /* @__PURE__ */ e(
            nr,
            {
              maxDate: typeof u.max == "string" ? u.max : void 0,
              minDate: h.start || (typeof u.min == "string" ? u.min : void 0),
              onValueChange: (F) => y(d.name, { ...h, end: F }),
              placeholder: "End date",
              value: h.end ?? ""
            }
          )
        ] }),
        M ?? D ? /* @__PURE__ */ e("span", { className: q("rpc-form-field__message", M && "rpc-form-field__message--error"), children: M ?? D }) : null
      ] });
    }
    if (d.kind === "select")
      return u.multiple ? /* @__PURE__ */ e(
        Ca,
        {
          ...b,
          loadOptions: d.loadOptions,
          onValueChange: (h) => y(d.name, h),
          options: d.options,
          searchPlaceholder: u.searchPlaceholder,
          searchable: u.searchable,
          value: Array.isArray(x) ? x.map(String) : []
        }
      ) : /* @__PURE__ */ e(
        ka,
        {
          ...b,
          loadOptions: d.loadOptions,
          onValueChange: (h) => y(d.name, h),
          options: d.options,
          searchPlaceholder: u.searchPlaceholder,
          searchable: u.searchable,
          value: String(x ?? "")
        }
      );
    if (d.kind === "file") {
      const h = Array.isArray(x) ? x : x instanceof File ? [x] : [];
      return /* @__PURE__ */ e(
        Ba,
        {
          accept: u.accept,
          disabled: u.disabled,
          error: M,
          files: h,
          helperText: D,
          label: d.label,
          multiple: u.multiple,
          name: d.name,
          onFilesChange: (F) => y(d.name, u.multiple ? F : F[0] ?? null),
          required: u.required
        }
      );
    }
    return u.type === "number" ? /* @__PURE__ */ e(
      _a,
      {
        ...b,
        max: typeof u.max == "number" ? u.max : void 0,
        min: typeof u.min == "number" ? u.min : void 0,
        onValueChange: (h) => y(d.name, h),
        step: u.step,
        value: typeof x == "number" || typeof x == "string" ? x : ""
      }
    ) : u.type === "password" && u.allowPasswordToggle !== !1 ? /* @__PURE__ */ e(
      Na,
      {
        ...b,
        onChange: (h) => y(d.name, h.target.value),
        showStrength: !0,
        value: String(x ?? "")
      }
    ) : u.type === "email" ? /* @__PURE__ */ e(
      va,
      {
        ...b,
        onChange: (h) => y(d.name, h.target.value),
        value: String(x ?? "")
      }
    ) : /* @__PURE__ */ e(
      hr,
      {
        ...b,
        onChange: (h) => y(d.name, h.target.value),
        type: u.type === "search" || u.type === "url" || u.type === "tel" ? u.type : "text",
        value: String(x ?? "")
      }
    );
  };
  return /* @__PURE__ */ c(
    "form",
    {
      className: q("rpc-form-builder", a),
      onReset: (d) => {
        d.preventDefault(), A(n ?? {}), _ == null || _();
      },
      onSubmit: (d) => {
        d.preventDefault(), i == null || i(w, d);
      },
      style: { "--rpc-form-builder-columns": t },
      children: [
        R.map((d) => /* @__PURE__ */ e("div", { className: "rpc-form-builder__row", children: d.fields.map((u) => /* @__PURE__ */ e("div", { className: "rpc-form-builder__field", children: E(u) }, u.name)) }, d.id)),
        k ? /* @__PURE__ */ e("div", { className: "rpc-form-builder__actions", children: r ?? /* @__PURE__ */ c(ke, { children: [
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
function Sr(r, a) {
  return typeof r == "string" ? r : a;
}
function Mr(...r) {
  const a = /* @__PURE__ */ new Set();
  return r.forEach((t) => {
    t == null || t.forEach((n) => a.add(n));
  }), Array.from(a);
}
function Wr(r, a = /* @__PURE__ */ new Set()) {
  return r.forEach((t) => {
    var n, l;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.add(t.id), (l = t.children) != null && l.length && Wr(t.children, a);
  }), a;
}
function Vr(r, a) {
  var t;
  for (const n of r) {
    if (n.id === a)
      return n;
    if ((t = n.children) != null && t.length) {
      const l = Vr(n.children, a);
      if (l)
        return l;
    }
  }
  return null;
}
function Ra({ isOpen: r }) {
  return r ? /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ e("path", { d: "M3 10h18", opacity: ".55" })
  ] }) : /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ e("path", { d: "M3 9.5h18", opacity: ".55" })
  ] });
}
function ja() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ e("path", { d: "M7 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" }),
    /* @__PURE__ */ e("path", { d: "M13 3.5V8h4.5" }),
    /* @__PURE__ */ e("path", { d: "M8 12.5h8M8 16h8", opacity: ".55" })
  ] });
}
function Ta({ isOpen: r }) {
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
function Hr({
  nodes: r,
  depth: a,
  selectedId: t,
  openSet: n,
  showLines: l,
  density: s,
  indent: _,
  onToggle: i,
  onSelect: p,
  onNodeClick: v,
  renderLabel: k,
  renderIcon: g
}) {
  return /* @__PURE__ */ e("ul", { className: Ge("rpc-file-tree__list", l && "rpc-file-tree__list--lines"), role: "group", children: r.map((f) => {
    var b;
    const S = !!((b = f.children) != null && b.length), A = S && n.has(f.id), w = t === f.id, y = {
      depth: a,
      hasChildren: S,
      isOpen: A,
      isSelected: w,
      isLeaf: !S
    }, E = k ? k(f, y) : f.label, d = g ? g(f, y) : f.icon ?? (S ? /* @__PURE__ */ e(Ra, { isOpen: A }) : /* @__PURE__ */ e(ja, {})), u = Ge(
      "rpc-file-tree__row",
      `rpc-file-tree__row--${s}`,
      S && "rpc-file-tree__row--branch",
      w && "rpc-file-tree__row--selected",
      f.disabled && "rpc-file-tree__row--disabled"
    ), x = /* @__PURE__ */ c(ke, { children: [
      /* @__PURE__ */ e("span", { className: "rpc-file-tree__icon", "aria-hidden": "true", children: d }),
      /* @__PURE__ */ c("span", { className: "rpc-file-tree__text", children: [
        /* @__PURE__ */ e("span", { className: "rpc-file-tree__label", children: E }),
        f.description ? /* @__PURE__ */ e("span", { className: "rpc-file-tree__description", children: f.description }) : null
      ] })
    ] }), M = {
      "aria-disabled": f.disabled || void 0,
      "aria-expanded": S && A || void 0,
      "aria-level": a + 1,
      "aria-selected": w || void 0,
      className: u,
      role: "treeitem",
      onClick: () => {
        var h;
        f.disabled || (p(f), v == null || v(f), (h = f.onClick) == null || h.call(f, f));
      }
    }, D = f.href ? /* @__PURE__ */ e(
      "a",
      {
        ...M,
        href: f.disabled ? void 0 : f.href,
        rel: f.rel,
        target: f.target,
        children: x
      }
    ) : /* @__PURE__ */ e("button", { ...M, disabled: f.disabled, type: "button", children: x });
    return /* @__PURE__ */ c("li", { className: "rpc-file-tree__item", role: "none", children: [
      /* @__PURE__ */ c("div", { className: "rpc-file-tree__row-wrap", style: { paddingLeft: a * _ }, children: [
        S ? /* @__PURE__ */ e(
          "button",
          {
            "aria-expanded": A,
            "aria-label": A ? `Collapse ${Sr(f.label, f.id)}` : `Expand ${Sr(f.label, f.id)}`,
            className: "rpc-file-tree__toggle",
            disabled: f.disabled,
            onClick: () => i(f),
            type: "button",
            children: /* @__PURE__ */ e(Ta, { isOpen: A })
          }
        ) : /* @__PURE__ */ e("span", { className: "rpc-file-tree__toggle rpc-file-tree__toggle--spacer", "aria-hidden": "true" }),
        D
      ] }),
      S && A ? /* @__PURE__ */ e("div", { className: "rpc-file-tree__children", children: /* @__PURE__ */ e(
        Hr,
        {
          density: s,
          indent: _,
          nodes: f.children ?? [],
          onNodeClick: v,
          onSelect: p,
          onToggle: i,
          openSet: n,
          renderIcon: g,
          renderLabel: k,
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
  onOpenChange: _,
  defaultSelectedId: i = null,
  selectedId: p,
  onSelectedChange: v,
  onNodeClick: k,
  showLines: g = !0,
  density: f = "comfortable",
  indent: S = 20,
  renderLabel: A,
  renderIcon: w,
  className: R = "",
  ...y
}) {
  const E = re(
    () => Mr(l, Array.from(Wr(r))),
    [l, r]
  ), [d, u] = L(E), [x, M] = L(i), D = s ?? d, b = p ?? x, h = re(() => new Set(D), [D]), F = !!(a || t), j = ($) => {
    s === void 0 && u($), _ == null || _($);
  }, H = ($) => {
    p === void 0 && M($), v == null || v($, $ ? Vr(r, $) : null);
  }, V = ($) => {
    var U;
    if (!((U = $.children) != null && U.length) || $.disabled)
      return;
    const K = h.has($.id) ? D.filter((N) => N !== $.id) : Mr(D, [$.id]);
    j(K);
  }, C = ($) => {
    $.disabled || H($.id);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      ...y,
      "aria-label": n ?? (typeof a == "string" ? a : "File tree"),
      className: Ge("rpc-file-tree", f === "compact" && "rpc-file-tree--compact", !g && "rpc-file-tree--no-lines", R),
      role: "tree",
      children: [
        F ? /* @__PURE__ */ c("div", { className: "rpc-file-tree__header", children: [
          a ? /* @__PURE__ */ e("h3", { className: "rpc-file-tree__title", children: a }) : null,
          t ? /* @__PURE__ */ e("p", { className: "rpc-file-tree__description-text", children: t }) : null
        ] }) : null,
        /* @__PURE__ */ e(
          Hr,
          {
            density: f,
            indent: S,
            nodes: r,
            onNodeClick: k,
            onSelect: C,
            onToggle: V,
            openSet: h,
            renderIcon: w,
            renderLabel: A,
            selectedId: b,
            showLines: g,
            depth: 0
          }
        )
      ]
    }
  );
}
function Ar(...r) {
  return r.filter(Boolean).join(" ");
}
function Wa() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ e("path", { d: "M12 5v14M5 12h14", strokeLinecap: "round" }) });
}
function Va({ label: r }) {
  const a = typeof r == "string" && r.trim() ? r.trim().slice(0, 1).toUpperCase() : "•";
  return /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "rpc-bottom-nav__fallback-icon", children: a });
}
function Ha(r) {
  return typeof r.name == "string" && r.name.trim() ? r.name.trim() : typeof r.ariaLabel == "string" && r.ariaLabel.trim() ? r.ariaLabel.trim() : `Navigation item ${r.id}`;
}
function Ft({
  items: r,
  activeId: a,
  defaultActiveId: t = null,
  onActiveChange: n,
  ariaLabel: l = "Bottom navigation",
  showLabels: s = !0,
  placement: _ = "inline",
  maxWidth: i = "720px",
  background: p = "var(--rpc-color-surface)",
  borderColor: v = "var(--rpc-color-border)",
  textColor: k = "var(--rpc-color-text)",
  mutedColor: g = "var(--rpc-color-muted)",
  activeColor: f = "var(--rpc-color-primary)",
  activeTextColor: S = "#ffffff",
  className: A = "",
  style: w,
  ...R
}) {
  const y = re(
    () => {
      var b;
      return a ?? t ?? ((b = r.find((h) => h.active)) == null ? void 0 : b.id) ?? null;
    },
    [a, t, r]
  ), [E, d] = L(y), u = a !== void 0, x = u ? a ?? null : E;
  ee(() => {
    var b;
    if (!u && x && !r.some((h) => h.id === x)) {
      const h = t ?? ((b = r.find((F) => F.active)) == null ? void 0 : b.id) ?? null;
      d(h);
    }
  }, [x, t, u, r]);
  const M = (b) => {
    var h;
    u || d(b.id), n == null || n(b.id, b), (h = b.onClick) == null || h.call(b);
  }, D = {
    "--rpc-bottom-nav-active": f,
    "--rpc-bottom-nav-active-text": S,
    "--rpc-bottom-nav-bg": p,
    "--rpc-bottom-nav-border": v,
    "--rpc-bottom-nav-max-width": i,
    "--rpc-bottom-nav-muted": g,
    "--rpc-bottom-nav-text": k,
    ...w
  };
  return /* @__PURE__ */ e(
    "nav",
    {
      "aria-label": l,
      className: Ar("rpc-bottom-nav", _ === "fixed" && "rpc-bottom-nav--fixed", A),
      style: D,
      ...R,
      children: /* @__PURE__ */ e("ul", { className: "rpc-bottom-nav__list", children: r.map((b) => {
        const h = x === b.id, F = Ha(b), j = Ar(
          "rpc-bottom-nav__item",
          h && "rpc-bottom-nav__item--active",
          b.disabled && "rpc-bottom-nav__item--disabled"
        ), H = h ? b.activeIcon ?? /* @__PURE__ */ e(Wa, {}) : b.icon ?? /* @__PURE__ */ e(Va, { label: b.name }), V = b.ariaLabel ?? F, C = s && !h;
        if (b.href || b.url) {
          const $ = b.href ?? b.url ?? "#";
          return /* @__PURE__ */ e("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ c(
            "a",
            {
              "aria-current": h ? "page" : void 0,
              "aria-label": V,
              className: j,
              href: b.disabled ? void 0 : $,
              onClick: (K) => {
                if (b.disabled) {
                  K.preventDefault();
                  return;
                }
                M(b);
              },
              children: [
                /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__icon", children: H }),
                C ? /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__label", children: b.name }) : /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: F })
              ]
            }
          ) }, b.id);
        }
        return /* @__PURE__ */ e("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ c(
          "button",
          {
            "aria-current": h ? "page" : void 0,
            "aria-label": V,
            className: j,
            disabled: b.disabled,
            onClick: () => M(b),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__icon", children: H }),
              C ? /* @__PURE__ */ e("span", { className: "rpc-bottom-nav__label", children: b.name }) : /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: F })
            ]
          }
        ) }, b.id);
      }) })
    }
  );
}
function mr(...r) {
  return r.filter(Boolean).join(" ");
}
const qr = Lr(null);
function fr() {
  return Er(qr);
}
function qa() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function Ka() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M15 5v14" })
  ] });
}
function Ua({
  aside: r,
  asideOpen: a,
  asideWidth: t = "320px",
  children: n,
  className: l = "",
  defaultAsideOpen: s = !1,
  defaultSidebarOpen: _ = !0,
  navbar: i,
  navbarHeight: p = "64px",
  onAsideOpenChange: v,
  onSidebarOpenChange: k,
  sidebar: g,
  sidebarOpen: f,
  sidebarWidth: S = "280px",
  style: A,
  ...w
}) {
  const [R, y] = L(_), [E, d] = L(s), u = f !== void 0, x = a !== void 0, M = u ? !!f : R, D = x ? !!a : E, b = (H) => {
    u || y(H), k == null || k(H);
  }, h = (H) => {
    x || d(H), v == null || v(H);
  }, F = re(
    () => ({
      asideOpen: D,
      closeAside: () => h(!1),
      closeSidebar: () => b(!1),
      openAside: () => h(!0),
      openSidebar: () => b(!0),
      sidebarOpen: M,
      toggleAside: () => h(!D),
      toggleSidebar: () => b(!M)
    }),
    [D, M]
  ), j = {
    "--rpc-app-layout-aside-width": t,
    "--rpc-app-layout-aside-track": r && D ? t : "0px",
    "--rpc-app-layout-navbar-height": p,
    "--rpc-app-layout-sidebar-track": g && M ? S : "0px",
    "--rpc-app-layout-sidebar-width": S,
    ...A
  };
  return /* @__PURE__ */ e(qr.Provider, { value: F, children: /* @__PURE__ */ c(
    "div",
    {
      className: mr(
        "rpc-app-layout",
        M && "rpc-app-layout--sidebar-open",
        D && "rpc-app-layout--aside-open",
        l
      ),
      style: j,
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
        /* @__PURE__ */ e("button", { className: "rpc-app-layout__overlay", onClick: () => b(!1), type: "button", "aria-label": "Close sidebar" }),
        /* @__PURE__ */ e("button", { className: "rpc-app-layout__aside-overlay", onClick: () => h(!1), type: "button", "aria-label": "Close aside panel" })
      ]
    }
  ) });
}
function Ya({ className: r = "", icon: a, label: t = "Toggle menu", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: mr("rpc-app-layout__trigger", r),
      onClick: (_) => {
        s == null || s.toggleSidebar(), n == null || n(_);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(qa, {})
    }
  );
}
function za({ className: r = "", icon: a, label: t = "Toggle details panel", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.asideOpen,
      className: mr("rpc-app-layout__trigger", r),
      onClick: (_) => {
        s == null || s.toggleAside(), n == null || n(_);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(Ka, {})
    }
  );
}
const Lt = Object.assign(Ua, {
  AsideTrigger: za,
  MenuToggle: Ya
});
function _e(...r) {
  return r.filter(Boolean).join(" ");
}
function $r(r) {
  return Array.from(new Set(r));
}
function Kr(r, a = []) {
  return r.forEach((t) => {
    var n, l;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.push(t.id), (l = t.children) != null && l.length && Kr(t.children, a);
  }), a;
}
function Ur(r, a) {
  var t;
  for (const n of r) {
    if (n.id === a) return n;
    if ((t = n.children) != null && t.length) {
      const l = Ur(n.children, a);
      if (l) return l;
    }
  }
  return null;
}
function Pr(r) {
  return typeof r.label == "string" && r.label.trim() ? r.label.trim() : r.ariaLabel ? r.ariaLabel : `Sidebar item ${r.id}`;
}
function Yr(r, a) {
  var t;
  return !a || !((t = r.children) != null && t.length) ? !1 : r.children.some((n) => n.id === a || Yr(n, a));
}
function Ga({ isOpen: r }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      "aria-hidden": "true",
      className: _e("rpc-sidebar__chevron", r && "rpc-sidebar__chevron--open"),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ e("path", { d: "m9 6 6 6-6 6" })
    }
  );
}
function Za() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ e("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function ir({ isCollapsed: r }) {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 5v14" }),
    /* @__PURE__ */ e("path", { d: r ? "m14 9 3 3-3 3" : "m17 9-3 3 3 3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Xa({ className: r = "", icon: a, label: t = "Toggle sidebar", onClick: n, ...l }) {
  const s = fr();
  return /* @__PURE__ */ e(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: _e("rpc-sidebar-trigger", r),
      onClick: (_) => {
        s == null || s.toggleSidebar(), n == null || n(_);
      },
      type: "button",
      ...l,
      children: a ?? /* @__PURE__ */ e(ir, { isCollapsed: !(s != null && s.sidebarOpen) })
    }
  );
}
function Ja({ children: r, className: a = "", ...t }) {
  return /* @__PURE__ */ e("div", { className: _e("rpc-sidebar-mobile", a), ...t, children: r });
}
function Qa(r, a, t) {
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
  onToggle: _
}) {
  return /* @__PURE__ */ e(
    "ul",
    {
      className: _e("rpc-sidebar__list", n > 0 && "rpc-sidebar__list--nested"),
      role: n === 0 ? "list" : "group",
      children: r.map((i) => {
        var S;
        const p = !!((S = i.children) != null && S.length), v = p && t.has(i.id), k = a ? a === i.id || Yr(i, a) : !!i.active, g = _e(
          "rpc-sidebar__item",
          k && "rpc-sidebar__item--active",
          i.disabled && "rpc-sidebar__item--disabled",
          p && "rpc-sidebar__item--branch"
        ), f = /* @__PURE__ */ c(ke, { children: [
          i.icon ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__item-icon", children: i.icon }) : null,
          /* @__PURE__ */ e("span", { className: "rpc-sidebar__item-label", children: i.label }),
          i.badge ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__badge", children: i.badge }) : null,
          p ? /* @__PURE__ */ e(Ga, { isOpen: v }) : null
        ] });
        return /* @__PURE__ */ c(
          "li",
          {
            className: _e(
              "rpc-sidebar__list-item",
              p && "rpc-sidebar__list-item--branch",
              v && "rpc-sidebar__list-item--open",
              k && "rpc-sidebar__list-item--active"
            ),
            children: [
              i.href || i.url ? /* @__PURE__ */ e(
                "a",
                {
                  "aria-current": k ? "page" : void 0,
                  "aria-disabled": i.disabled || void 0,
                  "aria-expanded": p ? v : void 0,
                  "aria-label": i.ariaLabel ?? Pr(i),
                  className: g,
                  href: i.disabled ? void 0 : i.href ?? i.url,
                  onClick: (A) => {
                    if (i.disabled) {
                      A.preventDefault();
                      return;
                    }
                    p && _(i), s(i);
                  },
                  children: f
                }
              ) : /* @__PURE__ */ e(
                "button",
                {
                  "aria-current": k ? "page" : void 0,
                  "aria-expanded": p ? v : void 0,
                  "aria-label": i.ariaLabel ?? Pr(i),
                  className: g,
                  disabled: i.disabled,
                  onClick: () => {
                    p && _(i), s(i);
                  },
                  type: "button",
                  children: f
                }
              ),
              p && (v || l) ? /* @__PURE__ */ e(
                or,
                {
                  activeId: a,
                  depth: n + 1,
                  isCollapsed: l,
                  items: i.children ?? [],
                  onActivate: s,
                  onToggle: _,
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
function et({
  brand: r = "ava-ui",
  brandIcon: a,
  brandHref: t,
  items: n,
  footerItems: l = [],
  activeId: s,
  defaultActiveId: _ = null,
  onActiveChange: i,
  openIds: p,
  defaultOpenIds: v = [],
  onOpenChange: k,
  header: g,
  headerIcon: f,
  children: S,
  ariaLabel: A = "Sidebar navigation",
  mobileLabel: w = "Open sidebar",
  variant: R = "shell",
  collapsed: y,
  defaultCollapsed: E = !1,
  onCollapsedChange: d,
  showCollapseToggle: u = !0,
  collapseLabel: x = "Hide sidebar",
  expandLabel: M = "Show sidebar",
  width: D = "320px",
  collapsedWidth: b = "72px",
  height: h = "auto",
  minHeight: F = "720px",
  background: j = "var(--rpc-color-background)",
  surfaceColor: H = "var(--rpc-color-surface)",
  textColor: V = "var(--rpc-color-text)",
  mutedColor: C = "var(--rpc-color-muted)",
  borderColor: $ = "var(--rpc-color-border)",
  activeColor: K = "var(--rpc-color-secondary)",
  activeTextColor: U = "var(--rpc-color-text)",
  className: N = "",
  style: B,
  ...G
}) {
  const m = re(() => [...n, ...l], [l, n]), W = re(
    () => {
      var z;
      return s ?? _ ?? ((z = m.find((fe) => fe.active)) == null ? void 0 : z.id) ?? null;
    },
    [s, _, m]
  ), Z = re(
    () => $r([...v, ...Kr(m)]),
    [v, m]
  ), [pe, ce] = L(W), [se, I] = L(Z), [ae, Q] = L(!1), [ie, X] = L(E), ve = s !== void 0, Re = p !== void 0, Fe = y !== void 0, Ne = ve ? s ?? null : pe, ye = Re ? p ?? [] : se, ne = Fe ? !!y : ie, Se = re(() => new Set(ye), [ye]);
  ee(() => {
    !ve && Ne && !Ur(m, Ne) && ce(_ ?? null);
  }, [Ne, _, ve, m]);
  const je = (z) => {
    Re || I(z), k == null || k(z);
  }, Le = (z) => {
    const fe = Se.has(z.id) ? ye.filter((Ze) => Ze !== z.id) : [...ye, z.id];
    je($r(fe));
  }, Te = (z) => {
    Fe || X(z), d == null || d(z);
  }, We = (z) => {
    var fe;
    ve || ce(z.id), i == null || i(z.id, z), (fe = z.onClick) == null || fe.call(z, z), Q(!1);
  }, me = {
    "--rpc-sidebar-active": K,
    "--rpc-sidebar-active-text": U,
    "--rpc-sidebar-bg": j,
    "--rpc-sidebar-border": $,
    "--rpc-sidebar-muted": C,
    "--rpc-sidebar-surface": H,
    "--rpc-sidebar-text": V,
    "--rpc-sidebar-width": D,
    "--rpc-sidebar-collapsed-width": b,
    "--rpc-sidebar-height": h,
    "--rpc-sidebar-min-height": F,
    ...B
  }, Ve = /* @__PURE__ */ c("aside", { className: "rpc-sidebar__panel", "aria-label": A, children: [
    /* @__PURE__ */ c("div", { className: "rpc-sidebar__top", children: [
      /* @__PURE__ */ c("div", { className: "rpc-sidebar__panel-header", children: [
        Qa(r, a, t),
        u ? /* @__PURE__ */ e(
          "button",
          {
            "aria-label": ne ? M : x,
            "aria-pressed": ne,
            className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--panel",
            onClick: () => Te(!ne),
            type: "button",
            children: /* @__PURE__ */ e(ir, { isCollapsed: ne })
          }
        ) : null
      ] }),
      /* @__PURE__ */ e("nav", { className: "rpc-sidebar__nav", "aria-label": A, children: /* @__PURE__ */ e(
        or,
        {
          activeId: Ne,
          depth: 0,
          isCollapsed: ne,
          items: n,
          onActivate: We,
          onToggle: Le,
          openSet: Se
        }
      ) })
    ] }),
    l.length ? /* @__PURE__ */ e("nav", { className: "rpc-sidebar__footer", "aria-label": `${A} footer`, children: /* @__PURE__ */ e(
      or,
      {
        activeId: Ne,
        depth: 0,
        isCollapsed: ne,
        items: l,
        onActivate: We,
        onToggle: Le,
        openSet: Se
      }
    ) }) : null
  ] });
  return R === "navigation" ? /* @__PURE__ */ e(
    "div",
    {
      className: _e(
        "rpc-sidebar",
        "rpc-sidebar--navigation",
        ne && "rpc-sidebar--collapsed",
        N
      ),
      style: me,
      ...G,
      children: Ve
    }
  ) : /* @__PURE__ */ c(
    "div",
    {
      className: _e(
        "rpc-sidebar",
        ae && "rpc-sidebar--mobile-open",
        ne && "rpc-sidebar--collapsed",
        N
      ),
      style: me,
      ...G,
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "rpc-sidebar__mobile-overlay",
            onClick: () => Q(!1),
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
                onClick: () => Q(!0),
                type: "button",
                children: [
                  /* @__PURE__ */ e(Za, {}),
                  /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: w })
                ]
              }
            ),
            u ? /* @__PURE__ */ e(
              "button",
              {
                "aria-label": ne ? M : x,
                "aria-pressed": ne,
                className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--content",
                onClick: () => Te(!ne),
                type: "button",
                children: /* @__PURE__ */ e(ir, { isCollapsed: ne })
              }
            ) : null,
            f ? /* @__PURE__ */ e("span", { className: "rpc-sidebar__content-icon", children: f }) : null,
            g ? /* @__PURE__ */ e("div", { className: "rpc-sidebar__content-title", children: g }) : null
          ] }),
          /* @__PURE__ */ e("div", { className: "rpc-sidebar__content-body", children: S })
        ] })
      ]
    }
  );
}
const Et = Object.assign(et, {
  Mobile: Ja,
  Trigger: Xa
});
function Oe(...r) {
  return r.filter(Boolean).join(" ");
}
function Br() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ e("path", { d: "m20 20-3.5-3.5" })
  ] });
}
function Ir() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
    /* @__PURE__ */ e("path", { d: "m10 17 5-5-5-5" }),
    /* @__PURE__ */ e("path", { d: "M15 12H3" })
  ] });
}
function Fr() {
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
function at() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.3", strokeLinecap: "round", children: [
    /* @__PURE__ */ e("path", { d: "M4 6h16" }),
    /* @__PURE__ */ e("path", { d: "M4 12h16" }),
    /* @__PURE__ */ e("path", { d: "M4 18h16" })
  ] });
}
function tt() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.3", strokeLinecap: "round", children: [
    /* @__PURE__ */ e("path", { d: "M6 6l12 12" }),
    /* @__PURE__ */ e("path", { d: "M18 6 6 18" })
  ] });
}
function nt(r) {
  const a = /* @__PURE__ */ c(ke, { children: [
    r.icon ? /* @__PURE__ */ e("span", { className: "inline-flex items-center justify-center text-inherit", children: r.icon }) : null,
    /* @__PURE__ */ e("span", { className: "sr-only", children: r.label })
  ] });
  return r.href && !r.disabled ? /* @__PURE__ */ e(
    "a",
    {
      "aria-label": r.label,
      className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8A704C]",
      href: r.href,
      children: a
    },
    r.id
  ) : /* @__PURE__ */ e(
    "button",
    {
      "aria-label": r.label,
      className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-[#FAF7F2] hover:text-[#8A704C]",
      disabled: r.disabled,
      onClick: r.onClick,
      type: "button",
      children: a
    },
    r.id
  );
}
function lt(r) {
  const a = Oe(
    "block rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors duration-200",
    r.danger ? "text-rose-500 hover:bg-rose-50" : "text-gray-700 hover:bg-[#F7F2EB]"
  );
  return r.href && !r.disabled ? /* @__PURE__ */ e("a", { className: a, href: r.href, children: r.label }, r.id) : /* @__PURE__ */ e("button", { className: a, disabled: r.disabled, onClick: r.onClick, type: "button", children: r.label }, r.id);
}
function Dt({
  brand: r = "ava-ui",
  brandHref: a,
  navItems: t = [],
  activeNavId: n,
  search: l = !1,
  actions: s = [],
  isAuthenticated: _ = !1,
  loginLabel: i = "Login",
  registerLabel: p = "Register",
  onLogin: v,
  onRegister: k,
  profile: g,
  profileMenuItems: f = [],
  profileMenuLabel: S = "Open profile menu",
  onLogout: A,
  logoutLabel: w = "Logout",
  maxWidth: R = "1200px",
  height: y = "72px",
  background: E = "var(--rpc-color-surface)",
  textColor: d = "var(--rpc-color-text)",
  mutedColor: u = "var(--rpc-color-muted)",
  accentColor: x = "var(--rpc-color-primary)",
  borderColor: M = "var(--rpc-color-border)",
  className: D = "",
  style: b,
  ...h
}) {
  const [F, j] = L(!1), [H, V] = L(!1), [C, $] = L(l && l.defaultValue ? l.defaultValue : ""), K = oe(), U = oe(), N = ue(null), B = ue(null), G = !!(l && l.value !== void 0), m = l ? G ? l.value ?? "" : C : "", W = {
    background: E,
    color: d,
    borderBottomColor: M,
    ...b
  };
  ee(() => {
    const I = (Q) => {
      const ie = Q.target;
      if (N.current && !N.current.contains(ie)) {
        j(!1), V(!1);
        return;
      }
      B.current && !B.current.contains(ie) && V(!1);
    }, ae = (Q) => {
      Q.key === "Escape" && (j(!1), V(!1));
    };
    return document.addEventListener("mousedown", I), document.addEventListener("keydown", ae), () => {
      document.removeEventListener("mousedown", I), document.removeEventListener("keydown", ae);
    };
  }, []);
  const Z = (I) => {
    var ae;
    G || $(I), l && ((ae = l.onChange) == null || ae.call(l, I));
  }, pe = (I) => {
    var ae;
    I.preventDefault(), l && ((ae = l.onSubmit) == null || ae.call(l, m));
  }, ce = () => j(!1), se = a ? /* @__PURE__ */ e(
    "a",
    {
      className: "select-none whitespace-nowrap font-serif text-[clamp(1.7rem,2.8vw,3rem)] font-bold italic tracking-[-0.045em] drop-shadow-[0_2px_3px_rgba(90,69,28,0.2)]",
      href: a,
      style: { color: x },
      children: r
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "select-none whitespace-nowrap font-serif text-[clamp(1.7rem,2.8vw,3rem)] font-bold italic tracking-[-0.045em] drop-shadow-[0_2px_3px_rgba(90,69,28,0.2)]",
      style: { color: x },
      children: r
    }
  );
  return /* @__PURE__ */ e("header", { className: Oe("sticky top-0 z-40 border-b border-[#E5DACE]/100 bg-[#FDFBF7]/95 backdrop-blur-md", D), ref: N, style: W, ...h, children: /* @__PURE__ */ c("div", { className: "mx-auto flex h-auto max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8", style: { minHeight: y, maxWidth: R }, children: [
    /* @__PURE__ */ e("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: se }),
    /* @__PURE__ */ e("nav", { className: "hidden flex-1 items-center justify-center gap-8 lg:flex", "aria-label": "Primary navigation", children: t.map((I) => {
      const ae = I.active ?? n === I.id, Q = Oe(
        "border-b-2 px-1 py-1 text-xs font-bold uppercase tracking-[0.24em] transition-all duration-300",
        ae ? "text-[#D4AF37]" : "border-transparent text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]"
      ), ie = ae ? { borderBottomColor: x, color: x } : void 0;
      return I.href && !I.disabled ? /* @__PURE__ */ e(
        "a",
        {
          className: Q,
          href: I.href,
          style: ie,
          onClick: () => {
            var X;
            ce(), (X = I.onClick) == null || X.call(I);
          },
          children: I.label
        },
        I.id
      ) : /* @__PURE__ */ e(
        "button",
        {
          className: Q,
          disabled: I.disabled,
          style: ie,
          onClick: () => {
            var X;
            ce(), (X = I.onClick) == null || X.call(I);
          },
          type: "button",
          children: I.label
        },
        I.id
      );
    }) }),
    /* @__PURE__ */ c("div", { className: "ml-auto flex items-center gap-2 sm:gap-3", children: [
      s.length ? /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: s.map(nt) }) : null,
      l ? /* @__PURE__ */ c(
        "form",
        {
          className: "hidden items-center rounded-sm border border-[#E5DACE] bg-[#F7F2EB] px-3 py-1.5 transition-all focus-within:border-[#D4AF37] md:flex",
          onSubmit: pe,
          role: "search",
          children: [
            /* @__PURE__ */ e("label", { className: "sr-only", htmlFor: U, children: l.label ?? "Search" }),
            /* @__PURE__ */ e(Br, {}),
            /* @__PURE__ */ e(
              "input",
              {
                className: "w-24 bg-transparent text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:w-36",
                id: U,
                onChange: (I) => Z(I.target.value),
                placeholder: l.placeholder ?? "Cari...",
                type: "search",
                value: m
              }
            )
          ]
        }
      ) : null,
      _ ? /* @__PURE__ */ c("div", { className: "relative hidden md:block", ref: B, children: [
        /* @__PURE__ */ c(
          "button",
          {
            "aria-expanded": H,
            "aria-haspopup": "menu",
            "aria-label": S,
            className: "inline-flex min-h-10 items-center gap-2 rounded-full px-1 pr-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors duration-200",
            style: { backgroundColor: u, borderColor: u },
            onClick: () => V((I) => !I),
            type: "button",
            children: [
              /* @__PURE__ */ e("span", { className: "inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-[#8A704C]", children: g != null && g.avatarSrc ? /* @__PURE__ */ e("img", { alt: g.avatarAlt ?? "", src: g.avatarSrc }) : (g == null ? void 0 : g.avatar) ?? "A" }),
              /* @__PURE__ */ e("span", { className: "hidden whitespace-nowrap lg:inline", children: (g == null ? void 0 : g.name) ?? "Profile" }),
              /* @__PURE__ */ e(rt, {})
            ]
          }
        ),
        H ? /* @__PURE__ */ c("div", { className: "absolute right-0 top-[calc(100%+0.5rem)] z-20 grid min-w-[220px] gap-1 rounded-2xl border border-[#E5DACE] bg-[#FFF8F1] p-2 shadow-[0_20px_42px_rgba(71,51,28,0.18)]", children: [
          g != null && g.email ? /* @__PURE__ */ e("div", { className: "border-b border-[#E5DACE] px-3 pb-3 pt-2 text-xs text-gray-600", children: g.email }) : null,
          f.map(lt),
          A ? /* @__PURE__ */ e("button", { className: "rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-500 transition-colors duration-200 hover:bg-rose-50", onClick: A, type: "button", children: w }) : null
        ] }) : null
      ] }) : /* @__PURE__ */ c("div", { className: "hidden items-center gap-2 md:flex", children: [
        /* @__PURE__ */ c(
          "button",
          {
            className: "inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200",
            onClick: v,
            style: { backgroundColor: u, borderColor: u },
            type: "button",
            children: [
              /* @__PURE__ */ e(Ir, {}),
              /* @__PURE__ */ e("span", { children: i })
            ]
          }
        ),
        /* @__PURE__ */ c(
          "button",
          {
            className: "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-[#FAF7F2]",
            onClick: k,
            style: { borderColor: "#D5C7B3", color: u },
            type: "button",
            children: [
              /* @__PURE__ */ e(Fr, {}),
              /* @__PURE__ */ e("span", { children: p })
            ]
          }
        )
      ] }),
      t.length ? /* @__PURE__ */ e(
        "button",
        {
          "aria-controls": K,
          "aria-expanded": F,
          "aria-label": "Toggle navigation",
          className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A4B3A] transition-colors duration-200 hover:bg-[#FAF7F2] md:hidden",
          onClick: () => j((I) => !I),
          type: "button",
          children: F ? /* @__PURE__ */ e(tt, {}) : /* @__PURE__ */ e(at, {})
        }
      ) : null
    ] }),
    t.length ? /* @__PURE__ */ c("div", { className: Oe("md:hidden", F ? "block" : "hidden"), id: K, children: [
      /* @__PURE__ */ e("nav", { className: "mt-3 grid gap-2 border-t border-[#E5DACE] pt-3", "aria-label": "Primary navigation", children: t.map((I) => {
        const ae = I.active ?? n === I.id, Q = Oe(
          "rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors duration-200",
          ae ? "bg-[#F7F2EB]" : "text-gray-700 hover:bg-[#F7F2EB]"
        ), ie = ae ? { color: x } : void 0;
        return I.href && !I.disabled ? /* @__PURE__ */ e(
          "a",
          {
            className: Q,
            href: I.href,
            style: ie,
            onClick: () => {
              var X;
              ce(), (X = I.onClick) == null || X.call(I);
            },
            children: I.label
          },
          I.id
        ) : /* @__PURE__ */ e(
          "button",
          {
            className: Q,
            disabled: I.disabled,
            style: ie,
            onClick: () => {
              var X;
              ce(), (X = I.onClick) == null || X.call(I);
            },
            type: "button",
            children: I.label
          },
          I.id
        );
      }) }),
      l ? /* @__PURE__ */ c("form", { className: "mt-3 flex items-center rounded-sm border border-[#E5DACE] bg-[#F7F2EB] px-3 py-2 transition-all focus-within:border-[#D4AF37] md:hidden", onSubmit: pe, role: "search", children: [
        /* @__PURE__ */ e("label", { className: "sr-only", htmlFor: `${U}-mobile`, children: l.label ?? "Search" }),
        /* @__PURE__ */ e(Br, {}),
        /* @__PURE__ */ e(
          "input",
          {
            className: "w-full bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400",
            id: `${U}-mobile`,
            onChange: (I) => Z(I.target.value),
            placeholder: l.placeholder ?? "Cari...",
            type: "search",
            value: m
          }
        )
      ] }) : null,
      _ ? null : /* @__PURE__ */ c("div", { className: "mt-3 grid gap-2 md:hidden", children: [
        /* @__PURE__ */ c(
          "button",
          {
            className: "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors duration-200",
            onClick: v,
            style: { backgroundColor: u, borderColor: u },
            type: "button",
            children: [
              /* @__PURE__ */ e(Ir, {}),
              /* @__PURE__ */ e("span", { children: i })
            ]
          }
        ),
        /* @__PURE__ */ c(
          "button",
          {
            className: "inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-[#FAF7F2]",
            onClick: k,
            style: { borderColor: "#D5C7B3", color: u },
            type: "button",
            children: [
              /* @__PURE__ */ e(Fr, {}),
              /* @__PURE__ */ e("span", { children: p })
            ]
          }
        )
      ] })
    ] }) : null
  ] }) });
}
function Ye(...r) {
  return r.filter(Boolean).join(" ");
}
function dr(r, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(r, a - 1));
}
function ct(r, a, t) {
  return a <= 0 ? 0 : t ? (r + a) % a : dr(r, a);
}
function Ot({
  items: r,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  loop: l = !0,
  autoPlay: s = !1,
  autoPlayInterval: _ = 4e3,
  pauseOnHover: i = !0,
  showArrows: p = !0,
  showDots: v = !0,
  showThumbnails: k = !0,
  aspectRatio: g = "1 / 1",
  ariaLabel: f = "Carousel",
  className: S = "",
  ...A
}) {
  const [w, R] = L(() => dr(t, r.length)), [y, E] = L(!1), d = ue(null), u = r.length, x = a !== void 0, M = dr(x ? a : w, u), D = r[M], b = (C) => {
    if (u === 0)
      return;
    const $ = ct(C, u, l);
    x || R($), n == null || n($, r[$]);
  }, h = () => b(M - 1), F = () => b(M + 1);
  ee(() => {
    if (!s || u <= 1 || i && y)
      return;
    const C = window.setInterval(() => {
      b(M + 1);
    }, _);
    return () => window.clearInterval(C);
  }, [s, _, M, y, i, u]);
  const j = (C) => {
    C.key === "ArrowLeft" && (C.preventDefault(), h()), C.key === "ArrowRight" && (C.preventDefault(), F());
  }, H = (C) => {
    d.current = C.clientX;
  }, V = (C) => {
    if (d.current === null)
      return;
    const $ = C.clientX - d.current;
    d.current = null, !(Math.abs($) < 48) && ($ > 0 ? h() : F());
  };
  return u === 0 ? /* @__PURE__ */ e("div", { className: Ye("rpc-carousel", "rpc-carousel--empty", S), ...A, children: /* @__PURE__ */ e("div", { className: "rpc-carousel__empty", children: "No carousel items." }) }) : /* @__PURE__ */ c(
    "div",
    {
      className: Ye("rpc-carousel", S),
      onMouseEnter: () => i && E(!0),
      onMouseLeave: () => i && E(!1),
      role: "region",
      "aria-label": f,
      "aria-roledescription": "carousel",
      ...A,
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            className: "rpc-carousel__viewport",
            onKeyDown: j,
            onPointerDown: H,
            onPointerUp: V,
            style: { "--rpc-carousel-aspect-ratio": g },
            tabIndex: 0,
            children: [
              /* @__PURE__ */ e("div", { className: "rpc-carousel__track", style: { transform: `translateX(-${M * 100}%)` }, children: r.map((C, $) => /* @__PURE__ */ e(
                "div",
                {
                  "aria-hidden": $ !== M,
                  "aria-label": `${$ + 1} of ${u}`,
                  className: "rpc-carousel__slide",
                  role: "group",
                  children: C.content ?? /* @__PURE__ */ c("figure", { className: "rpc-carousel__figure", children: [
                    C.imageSrc ? /* @__PURE__ */ e("img", { className: "rpc-carousel__image", src: C.imageSrc, alt: C.imageAlt ?? C.title ?? "" }) : null,
                    C.title || C.description ? /* @__PURE__ */ c("figcaption", { className: "rpc-carousel__caption", children: [
                      C.title ? /* @__PURE__ */ e("strong", { children: C.title }) : null,
                      C.description ? /* @__PURE__ */ e("span", { children: C.description }) : null
                    ] }) : null
                  ] })
                },
                C.id ?? `${C.title ?? "slide"}-${$}`
              )) }),
              p && u > 1 ? /* @__PURE__ */ c(ke, { children: [
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
                    disabled: !l && M === u - 1,
                    onClick: F,
                    type: "button"
                  }
                )
              ] }) : null
            ]
          }
        ),
        v && u > 1 ? /* @__PURE__ */ e("div", { className: "rpc-carousel__dots", role: "tablist", "aria-label": "Carousel slides", children: r.map((C, $) => /* @__PURE__ */ e(
          "button",
          {
            "aria-label": `Go to slide ${$ + 1}`,
            "aria-selected": $ === M,
            className: Ye("rpc-carousel__dot", $ === M && "rpc-carousel__dot--active"),
            onClick: () => b($),
            role: "tab",
            type: "button"
          },
          C.id ?? `dot-${$}`
        )) }) : null,
        k && u > 1 ? /* @__PURE__ */ e("div", { className: "rpc-carousel__thumbs", "aria-label": "Carousel thumbnails", children: r.map((C, $) => /* @__PURE__ */ e(
          "button",
          {
            "aria-current": $ === M ? "true" : void 0,
            "aria-label": `Show ${C.title ?? `slide ${$ + 1}`}`,
            className: Ye("rpc-carousel__thumb", $ === M && "rpc-carousel__thumb--active"),
            onClick: () => b($),
            type: "button",
            children: C.thumbnailContent ?? (C.thumbnailSrc || C.imageSrc ? /* @__PURE__ */ e("img", { src: C.thumbnailSrc ?? C.imageSrc, alt: "" }) : /* @__PURE__ */ e("span", { children: $ + 1 }))
          },
          C.id ?? `thumb-${$}`
        )) }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-carousel__status", "aria-live": "polite", children: [
          D != null && D.title ? `${D.title}, ` : "",
          "slide ",
          M + 1,
          " of ",
          u
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
function st(r, a, t) {
  return a <= 0 ? 0 : t ? (r + a) % a : ur(r, a);
}
function it(r) {
  if (r.endpoint) return r.endpoint;
  if (!r.targetPage) return "";
  const a = new URLSearchParams(), t = r.targetParams && typeof r.targetParams == "object" && !Array.isArray(r.targetParams) ? r.targetParams : {};
  Object.entries(t).forEach(([l, s]) => {
    s != null && a.set(l, String(s));
  });
  const n = a.toString();
  return n ? `${r.targetPage}?${n}` : r.targetPage;
}
function ot() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M12 3 9.9 9.9 3 12l6.9 2.1L12 21l2.1-6.9L21 12l-6.9-2.1L12 3Z" }),
    /* @__PURE__ */ e("path", { d: "M5 3v4M3 5h4M19 17v4M17 19h4" })
  ] });
}
function dt() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("path", { d: "M5 12h14M13 6l6 6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ut() {
  return /* @__PURE__ */ c("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ e("path", { d: "M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" }),
    /* @__PURE__ */ e("path", { d: "m9 12 2 2 4-5" })
  ] });
}
function pt() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "m12 2 2.95 6.1 6.72.94-4.86 4.73 1.18 6.69L12 17.3l-5.99 3.16 1.18-6.69-4.86-4.73 6.72-.94L12 2Z" }) });
}
function ht() {
  return /* @__PURE__ */ e("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M12 21s-7.5-4.35-9.6-9.05C.65 8.02 2.9 4.5 6.7 4.5c2.08 0 3.43 1.1 4.3 2.23.87-1.13 2.22-2.23 4.3-2.23 3.8 0 6.05 3.52 4.3 7.45C19.5 16.65 12 21 12 21Z" }) });
}
const mt = [
  { id: "verified", icon: /* @__PURE__ */ e(ut, {}), label: "Vendor terverifikasi" },
  { id: "guarantee", icon: /* @__PURE__ */ e(pt, {}), label: "Garansi layanan terbaik" },
  { id: "satisfaction", icon: /* @__PURE__ */ e(ht, {}), label: "100% pasangan puas" }
];
function Rt({
  slides: r,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  onNavigate: l,
  highlights: s = mt,
  autoPlay: _ = !1,
  autoPlayInterval: i = 5e3,
  loop: p = !0,
  pauseOnHover: v = !0,
  showArrows: k = !0,
  showDots: g = !0,
  height: f = "min(760px, 70vh)",
  minHeight: S = "520px",
  imagePosition: A = "center",
  overlay: w = "strong",
  ariaLabel: R = "Hero slider",
  className: y = "",
  style: E,
  ...d
}) {
  const [u, x] = L(() => ur(t, r.length)), [M, D] = L(!1), b = ue(null), h = r.length, F = a !== void 0, j = ur(F ? a : u, h), H = r[j], V = (m) => {
    if (!h) return;
    const W = st(m, h, p);
    F || x(W), n == null || n(W, r[W]);
  }, C = () => V(j - 1), $ = () => V(j + 1);
  ee(() => {
    if (!_ || h <= 1 || v && M) return;
    const m = window.setInterval(() => {
      V(j + 1);
    }, i);
    return () => window.clearInterval(m);
  }, [_, i, j, M, v, h]);
  const K = (m) => {
    m.key === "ArrowLeft" && (m.preventDefault(), C()), m.key === "ArrowRight" && (m.preventDefault(), $());
  }, U = (m) => {
    b.current = m.clientX;
  }, N = (m) => {
    if (b.current === null) return;
    const W = m.clientX - b.current;
    b.current = null, !(Math.abs(W) < 48) && (W > 0 ? C() : $());
  }, B = (m) => {
    const W = it(m);
    if (l) {
      l({ slide: m, url: W });
      return;
    }
    W && typeof window < "u" && window.location.assign(W);
  }, G = {
    "--rpc-hero-slider-height": f,
    "--rpc-hero-slider-image-position": A,
    "--rpc-hero-slider-min-height": S,
    ...E
  };
  return !h || !H ? /* @__PURE__ */ e("section", { className: cr("rpc-hero-slider", "rpc-hero-slider--empty", y), style: G, ...d, children: /* @__PURE__ */ e("div", { className: "rpc-hero-slider__empty", children: "No slides available." }) }) : /* @__PURE__ */ c(
    "section",
    {
      "aria-label": R,
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
        /* @__PURE__ */ e("div", { className: "rpc-hero-slider__track", style: { transform: `translateX(-${j * 100}%)` }, children: r.map((m, W) => /* @__PURE__ */ c(
          "article",
          {
            "aria-hidden": W !== j,
            "aria-label": `${W + 1} of ${h}`,
            className: "rpc-hero-slider__slide",
            role: "group",
            children: [
              /* @__PURE__ */ e("img", { className: "rpc-hero-slider__image", src: m.image, alt: m.title }),
              /* @__PURE__ */ e("div", { className: "rpc-hero-slider__overlay" }),
              /* @__PURE__ */ c("div", { className: "rpc-hero-slider__tagline", children: [
                /* @__PURE__ */ e(ot, {}),
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
                s.length ? /* @__PURE__ */ e("div", { className: "rpc-hero-slider__highlights", children: s.map((Z, pe) => /* @__PURE__ */ c("div", { className: "rpc-hero-slider__highlight", children: [
                  Z.icon ? /* @__PURE__ */ e("span", { className: "rpc-hero-slider__highlight-icon", children: Z.icon }) : null,
                  /* @__PURE__ */ e("span", { children: Z.label })
                ] }, Z.id ?? pe)) }) : null,
                /* @__PURE__ */ c("button", { className: "rpc-hero-slider__cta", onClick: () => B(m), type: "button", children: [
                  /* @__PURE__ */ e("span", { children: m.ctaText }),
                  /* @__PURE__ */ e(dt, {})
                ] })
              ] })
            ]
          },
          m.id
        )) }),
        k && h > 1 ? /* @__PURE__ */ c(ke, { children: [
          /* @__PURE__ */ e(
            "button",
            {
              "aria-label": "Previous slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--previous",
              disabled: !p && j === 0,
              onClick: C,
              type: "button"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              "aria-label": "Next slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--next",
              disabled: !p && j === h - 1,
              onClick: $,
              type: "button"
            }
          )
        ] }) : null,
        g && h > 1 ? /* @__PURE__ */ e("div", { className: "rpc-hero-slider__dots", role: "tablist", "aria-label": "Hero slides", children: r.map((m, W) => /* @__PURE__ */ e(
          "button",
          {
            "aria-label": `Go to slide ${W + 1}`,
            "aria-selected": W === j,
            className: cr("rpc-hero-slider__dot", W === j && "rpc-hero-slider__dot--active"),
            onClick: () => V(W),
            role: "tab",
            type: "button"
          },
          m.id
        )) }) : null
      ]
    }
  );
}
function be(...r) {
  return r.filter(Boolean).join(" ");
}
function xe(r, a) {
  if (a)
    return r[a];
}
function ft(r, a) {
  return r === a ? 0 : r == null ? 1 : a == null ? -1 : typeof r == "number" && typeof a == "number" ? r - a : String(r).toLowerCase().localeCompare(String(a).toLowerCase());
}
function bt(r, a) {
  const t = r;
  return t.id !== void 0 && t.id !== null ? String(t.id) : String(a);
}
function gt(r) {
  var a;
  return Array.isArray(r) ? { rows: r, total: r.length } : {
    rows: r.data ?? [],
    total: r.total ?? ((a = r.data) == null ? void 0 : a.length) ?? 0
  };
}
function Ie(r, a) {
  if (a)
    return a.split(".").reduce((t, n) => {
      if (t && typeof t == "object" && n in t)
        return t[n];
    }, r);
}
function _t(r) {
  return typeof r == "string" ? r : r.url;
}
function vt(r) {
  return typeof r == "string" ? "GET" : r.method ?? "GET";
}
function zr(r) {
  return typeof r == "string" ? void 0 : r.auth;
}
function Nt(r) {
  return typeof r == "string" ? void 0 : r.headers;
}
function yt(r) {
  return r ? r.type === "bearer" ? { Authorization: `Bearer ${r.token}` } : r.type === "basic" ? { Authorization: `Basic ${window.btoa(`${r.username}:${r.password}`)}` } : r.type === "apiKey" && (r.in ?? "header") === "header" ? { [r.key]: r.value } : r.type === "custom" ? r.headers : {} : {};
}
function wt(r, a) {
  if (typeof a != "string" && a.responseMapper)
    return a.responseMapper(r);
  if (Array.isArray(r))
    return r;
  const t = typeof a == "string" ? void 0 : a.dataPath, n = typeof a == "string" ? void 0 : a.totalPath, l = t ? Ie(r, t) : Ie(r, "data") ?? Ie(r, "items"), s = n ? Ie(r, n) : Ie(r, "total") ?? Ie(r, "meta.total");
  return {
    data: Array.isArray(l) ? l : [],
    total: typeof s == "number" ? s : Array.isArray(l) ? l.length : 0
  };
}
function xt(r, a) {
  var s;
  const t = new URL(_t(r), window.location.href), n = zr(r), l = typeof r == "string" || !r.queryParams ? {
    page: a.page,
    pageSize: a.pageSize,
    sortBy: a.sortBy,
    sortDirection: a.sortDirection,
    search: a.search,
    filters: a.filters ? JSON.stringify(a.filters) : void 0,
    visibleColumns: (s = a.visibleColumns) == null ? void 0 : s.join(",")
  } : r.queryParams(a);
  return Object.entries(l).forEach(([_, i]) => {
    if (Array.isArray(i)) {
      t.searchParams.delete(_), i.forEach((p) => {
        t.searchParams.append(_, String(p));
      });
      return;
    }
    i != null && i !== "" && t.searchParams.set(_, String(i));
  }), (n == null ? void 0 : n.type) === "apiKey" && (n.in ?? "header") === "query" && t.searchParams.set(n.key, n.value), t.toString();
}
function kt(r, a, t) {
  const n = vt(r), l = new Headers(t == null ? void 0 : t.headers), s = Nt(r), _ = yt(zr(r));
  Object.entries(s ?? {}).forEach(([p, v]) => {
    l.set(p, v);
  }), Object.entries(_).forEach(([p, v]) => {
    l.set(p, v);
  });
  const i = {
    ...t,
    headers: l,
    method: n
  };
  if (typeof r != "string" && r.body) {
    const p = r.body(a);
    p !== void 0 && (l.set("Content-Type", l.get("Content-Type") ?? "application/json"), i.body = typeof p == "string" ? p : JSON.stringify(p));
  }
  return i;
}
function sr({
  indeterminate: r,
  ...a
}) {
  const t = ue(null);
  return ee(() => {
    t.current && (t.current.indeterminate = !!r);
  }, [r]), /* @__PURE__ */ e("input", { ref: t, type: "checkbox", className: "rpc-datagrid__checkbox", ...a });
}
function ze(r) {
  return ["default", "primary", "success", "warning", "danger"].includes(r);
}
function jt({
  columns: r,
  data: a = [],
  endpoint: t,
  fetchData: n,
  requestInit: l,
  pageSize: s = 8,
  pageSizeOptions: _ = [5, 8, 12, 20],
  initialSortBy: i,
  initialSortDirection: p = "ascending",
  searchable: v = !0,
  searchPlaceholder: k = "Search...",
  initialSearch: g = "",
  onSearchChange: f,
  filters: S = [],
  initialFilters: A = {},
  onFiltersChange: w,
  columnVisibility: R = !0,
  defaultVisibleColumns: y,
  visibleColumns: E,
  onVisibleColumnsChange: d,
  emptyState: u = "No data available.",
  loadingState: x = "Loading data...",
  errorState: M = "Failed to load data.",
  getRowKey: D = bt,
  onRowClick: b,
  striped: h = !0,
  hoverable: F = !0,
  compact: j = !1,
  tone: H = "dark",
  selectable: V = !1,
  defaultSelectedKeys: C = [],
  selectedKeys: $,
  onSelectionChange: K,
  actions: U = [],
  mobileMode: N = "auto",
  cardBreakpoint: B = "tablet",
  renderCard: G,
  title: m,
  description: W,
  className: Z = "",
  ...pe
}) {
  const [ce, se] = L(1), [I, ae] = L(s), [Q, ie] = L(i), [X, ve] = L(
    p && i ? p : void 0
  ), [Re, Fe] = L([]), [Ne, ye] = L(0), [ne, Se] = L(!!(t || n)), [je, Le] = L(null), [Te, We] = L(C), [me, Ve] = L(g), [z, fe] = L(A), [Ze, Gr] = L(
    y ?? r.map((o) => o.id)
  ), [br, Me] = L(null), [gr, Xe] = L(!1), [_r, Je] = L(!1), Qe = ue(null), ge = !!(t || n), Ae = $ ?? Te, Ee = re(() => new Set(Ae), [Ae]), we = E ?? Ze, He = re(() => new Set(we), [we]), $e = re(
    () => r.filter((o) => He.has(o.id)),
    [r, He]
  );
  ee(() => {
    ae(s);
  }, [s]), ee(() => {
    i && (ie(i), ve(p));
  }, [i, p]), ee(() => {
    se(1);
  }, [a, t, n, me, z, we]), ee(() => {
    if (!ge)
      return;
    const o = new AbortController();
    let P = !0;
    return (async () => {
      Se(!0), Le(null);
      try {
        const J = {
          page: ce,
          pageSize: I,
          sortBy: Q,
          sortDirection: X,
          search: me,
          filters: z,
          visibleColumns: we
        }, te = n ? await n(J) : await fetch(xt(t, J), {
          ...kt(t, J, l),
          signal: o.signal
        }).then(async (le) => {
          if (!le.ok)
            throw new Error(`Request failed with status ${le.status}`);
          const de = await le.json();
          return wt(de, t);
        }), O = gt(te);
        if (!P)
          return;
        Fe(O.rows), ye(O.total);
      } catch (J) {
        if (!P)
          return;
        Le(J instanceof Error ? J : new Error("Unknown error")), Fe([]), ye(0);
      } finally {
        P && Se(!1);
      }
    })(), () => {
      P = !1, o.abort();
    };
  }, [
    z,
    t,
    n,
    ge,
    ce,
    I,
    l,
    we,
    me,
    Q,
    X
  ]), ee(() => {
    const o = (T) => {
      Qe.current && !Qe.current.contains(T.target) && (Me(null), Xe(!1), Je(!1));
    }, P = (T) => {
      T.key === "Escape" && (Me(null), Xe(!1), Je(!1));
    };
    return document.addEventListener("mousedown", o), document.addEventListener("keydown", P), () => {
      document.removeEventListener("mousedown", o), document.removeEventListener("keydown", P);
    };
  }, []);
  const qe = re(() => {
    if (ge)
      return a;
    const o = r.filter((T) => T.searchable !== !1), P = me.trim().toLowerCase();
    return a.filter((T) => {
      const J = !P || o.some((O) => {
        const le = xe(T, O.accessorKey ?? O.id);
        return String(le ?? "").toLowerCase().includes(P);
      }), te = S.every((O) => {
        const le = z[O.id] ?? [];
        if (le.length === 0)
          return !0;
        const de = xe(T, O.accessorKey ?? O.id);
        return le.includes(String(de ?? ""));
      });
      return J && te;
    });
  }, [z, r, a, S, ge, me]), vr = re(() => {
    if (ge || !Q || !X)
      return qe;
    const o = r.find((T) => T.id === Q);
    if (!o)
      return qe;
    const P = o.accessorKey ?? o.id;
    return [...qe].sort((T, J) => {
      const te = ft(xe(T, P), xe(J, P));
      return X === "ascending" ? te : -te;
    });
  }, [r, qe, ge, Q, X]), Pe = ge ? Ne : vr.length, Ke = Math.max(1, Math.ceil(Pe / I)), he = Math.min(ce, Ke);
  ee(() => {
    he !== ce && se(he);
  }, [ce, he]);
  const Be = ge ? Re : vr.slice((he - 1) * I, he * I), De = re(
    () => Be.map((o, P) => D(o, P)),
    [D, Be]
  ), er = V && De.length > 0 && De.every((o) => Ee.has(o)), Zr = V && De.some((o) => Ee.has(o)) && !er, Xr = (o) => {
    const P = new Set(o);
    return Be.filter((T, J) => P.has(D(T, J)));
  }, Nr = (o) => {
    $ === void 0 && We(o), K == null || K(o, Xr(o));
  }, Jr = (o) => {
    Ve(o), se(1), f == null || f(o);
  }, Qr = (o, P) => {
    const T = z[o] ?? [], J = T.includes(P) ? T.filter((O) => O !== P) : [...T, P], te = {
      ...z,
      [o]: J
    };
    J.length === 0 && delete te[o], fe(te), se(1), w == null || w(te);
  }, ea = () => {
    fe({}), se(1), w == null || w({});
  }, ra = (o) => {
    E === void 0 && Gr(o), d == null || d(o);
  }, aa = (o) => {
    const P = He.has(o) ? we.filter((T) => T !== o) : [...we, o];
    ra(P.length ? P : [o]);
  }, yr = (o, P) => {
    const T = D(o, P), J = Ee.has(T) ? Ae.filter((te) => te !== T) : [...Ae, T];
    Nr(J);
  }, ta = () => {
    if (!V)
      return;
    const o = er ? Ae.filter((P) => !De.includes(P)) : Array.from(/* @__PURE__ */ new Set([...Ae, ...De]));
    Nr(o);
  }, na = (o) => {
    if (!o.allowsSorting)
      return;
    const P = o.id;
    let T = "ascending";
    Q === P && (T = X === "ascending" ? "descending" : "ascending"), ie(P), ve(T), se(1);
  }, wr = (o) => {
    const P = Q === o.id, T = {
      column: o,
      isSorted: P,
      sortDirection: P ? X : void 0
    };
    return typeof o.header == "function" ? o.header(T) : o.header;
  }, Ue = je ? typeof M == "function" ? M(je) : M : ne ? x : Be.length ? null : u, la = Pe === 0 ? 0 : (he - 1) * I + 1, ca = Pe === 0 ? 0 : Math.min(he * I, Pe), sa = $e.length + (V ? 1 : 0) + (U.length ? 1 : 0), rr = Object.values(z).reduce((o, P) => o + P.length, 0), ia = N !== "table", oa = (o, P) => {
    const T = D(o, P), J = Ee.has(T), te = br === T, O = $e.find((Y) => Y.isRowHeader) ?? $e[0], le = O ? O.cell ? O.cell(o, P) : String(xe(o, O.accessorKey ?? O.id) ?? "") : null, de = $e.filter((Y) => Y.id !== (O == null ? void 0 : O.id));
    return /* @__PURE__ */ c(
      "article",
      {
        className: be("rpc-datagrid-card", J && "rpc-datagrid-card--selected"),
        onClick: b ? () => b(o) : void 0,
        children: [
          /* @__PURE__ */ c("div", { className: "rpc-datagrid-card__header", children: [
            V ? /* @__PURE__ */ e("div", { className: "rpc-datagrid-card__select", onClick: (Y) => Y.stopPropagation(), children: /* @__PURE__ */ e(
              sr,
              {
                "aria-label": `Select card ${P + 1}`,
                checked: J,
                onChange: () => yr(o, P)
              }
            ) }) : null,
            /* @__PURE__ */ e("div", { className: "rpc-datagrid-card__title", children: le }),
            U.length ? /* @__PURE__ */ c("div", { className: "rpc-datagrid-card__actions", onClick: (Y) => Y.stopPropagation(), children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "aria-expanded": te,
                  "aria-label": `Open actions for ${T}`,
                  className: "rpc-datagrid__action-trigger",
                  onClick: () => Me((Y) => Y === T ? null : T),
                  type: "button",
                  children: /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                    /* @__PURE__ */ e("span", {}),
                    /* @__PURE__ */ e("span", {}),
                    /* @__PURE__ */ e("span", {})
                  ] })
                }
              ),
              te ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__action-menu", role: "menu", children: U.map((Y) => {
                const ar = typeof Y.color == "string" && ze(Y.color) ? `rpc-datagrid__action-item--${Y.color}` : "", xr = typeof Y.color == "string" && !ze(Y.color) ? { color: Y.color } : void 0;
                return /* @__PURE__ */ c(
                  "button",
                  {
                    className: be("rpc-datagrid__action-item", ar, Y.disabled && "rpc-datagrid__action-item--disabled"),
                    disabled: Y.disabled,
                    onClick: (da) => {
                      da.stopPropagation(), Y.onClick(o, P), Me(null);
                    },
                    role: "menuitem",
                    style: xr,
                    type: "button",
                    children: [
                      Y.icon ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: xr, children: Y.icon }) : null,
                      /* @__PURE__ */ e("span", { children: Y.name })
                    ]
                  },
                  Y.id
                );
              }) }) : null
            ] }) : null
          ] }),
          /* @__PURE__ */ e("dl", { className: "rpc-datagrid-card__fields", children: de.map((Y) => {
            const ar = Y.cell ? Y.cell(o, P) : String(xe(o, Y.accessorKey ?? Y.id) ?? "");
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
      className: be(
        "rpc-datagrid",
        `rpc-datagrid--${H}`,
        `rpc-datagrid--mobile-${N}`,
        `rpc-datagrid--card-${B}`,
        j && "rpc-datagrid--compact",
        Z
      ),
      ...pe,
      children: [
        (m || W) && /* @__PURE__ */ c("div", { className: "rpc-datagrid__header", children: [
          m ? /* @__PURE__ */ e("h3", { className: "rpc-datagrid__title", children: m }) : null,
          W ? /* @__PURE__ */ e("p", { className: "rpc-datagrid__description", children: W }) : null
        ] }),
        (v || S.length > 0 || R) && /* @__PURE__ */ c("div", { className: "rpc-datagrid__toolbar", children: [
          S.length > 0 ? /* @__PURE__ */ c("div", { className: "rpc-datagrid__filter-popover", children: [
            /* @__PURE__ */ c(
              "button",
              {
                "aria-expanded": gr,
                className: "rpc-datagrid__filter-trigger",
                onClick: (o) => {
                  o.stopPropagation(), Xe((P) => !P);
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
                rr > 0 ? /* @__PURE__ */ e("button", { onClick: ea, type: "button", children: "Clear" }) : null
              ] }),
              S.map((o) => /* @__PURE__ */ c("fieldset", { className: "rpc-datagrid__filter-group", children: [
                /* @__PURE__ */ e("legend", { children: o.label }),
                o.options.map((P) => /* @__PURE__ */ c("label", { className: "rpc-datagrid__filter-option", children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      checked: (z[o.id] ?? []).includes(P.value),
                      onChange: () => Qr(o.id, P.value),
                      type: "checkbox"
                    }
                  ),
                  /* @__PURE__ */ e("span", { children: P.label })
                ] }, P.id))
              ] }, o.id))
            ] }) : null
          ] }) : null,
          S.length > 0 && v ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__toolbar-divider" }) : null,
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
                onChange: (o) => Jr(o.target.value),
                placeholder: k,
                type: "search",
                value: me
              }
            )
          ] }) : null,
          R ? /* @__PURE__ */ c("div", { className: "rpc-datagrid__columns", children: [
            /* @__PURE__ */ e(
              "button",
              {
                "aria-expanded": _r,
                className: "rpc-datagrid__columns-trigger",
                onClick: (o) => {
                  o.stopPropagation(), Je((P) => !P);
                },
                type: "button",
                children: "Columns"
              }
            ),
            _r ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__columns-menu", onClick: (o) => o.stopPropagation(), children: r.filter((o) => o.hideable !== !1).map((o) => /* @__PURE__ */ c("label", { className: "rpc-datagrid__columns-option", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  checked: He.has(o.id),
                  onChange: () => aa(o.id),
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
            className: be(
              "rpc-datagrid__table",
              F && "rpc-datagrid__table--hoverable",
              h && "rpc-datagrid__table--striped"
            ),
            children: [
              /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ c("tr", { children: [
                V ? /* @__PURE__ */ e("th", { className: "rpc-datagrid__th rpc-datagrid__th--select", scope: "col", children: /* @__PURE__ */ e(
                  sr,
                  {
                    "aria-label": "Select all rows",
                    checked: !!er,
                    indeterminate: Zr,
                    onChange: ta
                  }
                ) }) : null,
                $e.map((o) => {
                  const P = Q === o.id, T = P ? X ?? "ascending" : "none";
                  return /* @__PURE__ */ e(
                    "th",
                    {
                      "aria-sort": o.allowsSorting ? T : void 0,
                      className: be("rpc-datagrid__th", o.className, o.align && `rpc-datagrid__cell--${o.align}`),
                      scope: "col",
                      style: o.width ? { width: typeof o.width == "number" ? `${o.width}px` : o.width } : void 0,
                      children: o.allowsSorting ? /* @__PURE__ */ c("button", { className: "rpc-datagrid__sort-button", onClick: () => na(o), type: "button", children: [
                        /* @__PURE__ */ e("span", { children: wr(o) }),
                        /* @__PURE__ */ e("span", { className: "rpc-datagrid__sort-indicator", "aria-hidden": "true", children: P ? X === "ascending" ? "↑" : "↓" : "↕" })
                      ] }) : wr(o)
                    },
                    o.id
                  );
                }),
                U.length ? /* @__PURE__ */ e("th", { className: "rpc-datagrid__th rpc-datagrid__th--actions", scope: "col", children: /* @__PURE__ */ e("span", { className: "rpc-sr-only", children: "Actions" }) }) : null
              ] }) }),
              /* @__PURE__ */ e("tbody", { children: Ue ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { className: "rpc-datagrid__status", colSpan: sa, children: Ue }) }) : Be.map((o, P) => {
                const T = D(o, P), J = Ee.has(T), te = br === T;
                return /* @__PURE__ */ c(
                  "tr",
                  {
                    className: be("rpc-datagrid__row", J && "rpc-datagrid__row--selected"),
                    onClick: b ? () => b(o) : void 0,
                    children: [
                      V ? /* @__PURE__ */ e("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--select", onClick: (O) => O.stopPropagation(), children: /* @__PURE__ */ e(
                        sr,
                        {
                          "aria-label": `Select row ${P + 1}`,
                          checked: J,
                          onChange: () => yr(o, P)
                        }
                      ) }) : null,
                      $e.map((O, le) => {
                        const de = O.cell ? O.cell(o, P) : String(xe(o, O.accessorKey ?? O.id) ?? "");
                        return O.isRowHeader || le === 0 ? /* @__PURE__ */ e(
                          "th",
                          {
                            className: be(
                              "rpc-datagrid__cell",
                              O.className,
                              O.align && `rpc-datagrid__cell--${O.align}`,
                              "rpc-datagrid__cell--row-header"
                            ),
                            scope: "row",
                            children: de
                          },
                          `${O.id}-${T}`
                        ) : /* @__PURE__ */ e(
                          "td",
                          {
                            className: be(
                              "rpc-datagrid__cell",
                              O.className,
                              O.align && `rpc-datagrid__cell--${O.align}`
                            ),
                            children: de
                          },
                          `${O.id}-${T}`
                        );
                      }),
                      U.length ? /* @__PURE__ */ c("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--actions", onClick: (O) => O.stopPropagation(), children: [
                        /* @__PURE__ */ e(
                          "button",
                          {
                            "aria-expanded": te,
                            "aria-label": `Open actions for ${T}`,
                            className: "rpc-datagrid__action-trigger",
                            onClick: () => Me((O) => O === T ? null : T),
                            type: "button",
                            children: /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                              /* @__PURE__ */ e("span", {}),
                              /* @__PURE__ */ e("span", {}),
                              /* @__PURE__ */ e("span", {})
                            ] })
                          }
                        ),
                        te ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__action-menu", role: "menu", children: U.map((O) => {
                          const le = typeof O.color == "string" && ze(O.color) ? `rpc-datagrid__action-item--${O.color}` : "", de = typeof O.color == "string" && !ze(O.color) ? { color: O.color } : void 0;
                          return /* @__PURE__ */ c(
                            "button",
                            {
                              className: be("rpc-datagrid__action-item", le, O.disabled && "rpc-datagrid__action-item--disabled"),
                              disabled: O.disabled,
                              style: de,
                              onClick: (Y) => {
                                Y.stopPropagation(), O.onClick(o, P), Me(null);
                              },
                              role: "menuitem",
                              type: "button",
                              children: [
                                O.icon ? /* @__PURE__ */ e("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: de, children: O.icon }) : null,
                                /* @__PURE__ */ e("span", { children: O.name })
                              ]
                            },
                            O.id
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
        ia ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__cards", children: Ue ? /* @__PURE__ */ e("div", { className: "rpc-datagrid__status", children: Ue }) : Be.map((o, P) => /* @__PURE__ */ e("div", { className: "rpc-datagrid__card-shell", children: G ? G(o, P) : oa(o, P) }, D(o, P))) }) : null,
        /* @__PURE__ */ c("div", { className: "rpc-datagrid__footer", children: [
          /* @__PURE__ */ e("div", { className: "rpc-datagrid__summary", children: Pe > 0 ? /* @__PURE__ */ c("span", { children: [
            "Showing ",
            la,
            " to ",
            ca,
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
                  value: I,
                  onChange: (o) => {
                    ae(Number(o.target.value)), se(1);
                  },
                  children: _.map((o) => /* @__PURE__ */ e("option", { value: o, children: o }, o))
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "rpc-datagrid__pager", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: he <= 1,
                  onClick: () => se((o) => Math.max(1, o - 1)),
                  type: "button",
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ c("span", { className: "rpc-datagrid__pager-info", children: [
                "Page ",
                he,
                " of ",
                Ke
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: he >= Ke,
                  onClick: () => se((o) => Math.min(Ke, o + 1)),
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
  Vt as Alert,
  Lt as AppLayout,
  Ht as AreaChart,
  qt as BarChart,
  Ft as BottomNavigation,
  Kt as Button,
  Ut as Card,
  Ot as Carousel,
  Yt as CategoryCard,
  zt as ChartTooltip,
  Or as Checkbox,
  Pt as CheckboxGroup,
  Gt as Chip,
  $t as ConfirmModal,
  jt as DataGrid,
  nr as DatePicker,
  It as FileTree,
  Bt as FormBuilder,
  Dt as Header,
  Rt as HeroSlider,
  Zt as HoverCard,
  Xt as ImageHeroCard,
  hr as Input,
  va as InputEmail,
  _a as InputNumber,
  Na as InputPassword,
  Jt as LineChart,
  pa as Modal,
  Ca as MultiSelect,
  Qt as Navbar,
  en as PieChart,
  rn as RadarChart,
  an as RadialChart,
  wa as RadioGroup,
  tn as SectionHeading,
  ka as Select,
  Et as Sidebar,
  xa as Switch,
  ya as TextArea,
  nn as ThemeRoot,
  Mt as ToastProvider,
  Ba as UploadArea,
  At as useToast
};
