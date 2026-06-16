import { jsx as r, jsxs as l, Fragment as $e } from "react/jsx-runtime";
import { useEffect as X, createContext as Hr, useState as F, useCallback as Ar, useMemo as J, useContext as Wr, forwardRef as Se, useId as ie, useRef as pe, useImperativeHandle as ya } from "react";
function Xt({
  children: e,
  className: a = "",
  variant: t = "primary",
  size: n = "md",
  ...c
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      className: ["rpc-button", `rpc-button--${t}`, `rpc-button--${n}`, a].filter(Boolean).join(" "),
      ...c,
      children: e
    }
  );
}
function Jt({ title: e, children: a, className: t = "", ...n }) {
  return /* @__PURE__ */ l("section", { className: ["rpc-card", t].filter(Boolean).join(" "), ...n, children: [
    e ? /* @__PURE__ */ r("h3", { className: "rpc-card__title", children: e }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-card__body", children: a })
  ] });
}
function Je(...e) {
  return e.filter(Boolean).join(" ");
}
function wa(e, a) {
  const t = e.as ?? "p", n = {
    "--rpc-category-card-line-color": e.color,
    "--rpc-category-card-line-family": e.fontFamily,
    "--rpc-category-card-line-size": e.fontSize,
    "--rpc-category-card-line-style": e.fontStyle,
    "--rpc-category-card-line-weight": e.fontWeight,
    "--rpc-category-card-line-letter-spacing": e.letterSpacing,
    "--rpc-category-card-line-height": e.lineHeight,
    "--rpc-category-card-line-margin": e.margin,
    "--rpc-category-card-line-transform": e.textTransform,
    ...e.style
  };
  return /* @__PURE__ */ r(t, { className: Je("rpc-category-card__line", e.className), style: n, children: e.content }, e.id ?? a);
}
function Qt({
  align: e = "center",
  as: a = "article",
  backgroundColor: t,
  borderColor: n,
  children: c,
  className: s = "",
  contentClassName: p = "",
  gap: i = "1.35rem",
  icon: o,
  iconBackgroundColor: _,
  iconBorderColor: f,
  iconBoxSize: u,
  iconClassName: d = "",
  iconColor: y,
  iconSize: N,
  lines: b,
  maxWidth: I,
  minHeight: x,
  padding: P,
  radius: h,
  style: g,
  subtitle: S,
  subtitleProps: C,
  title: L,
  titleProps: w,
  ...v
}) {
  const E = a, O = b ?? [
    L ? {
      as: "h3",
      className: "rpc-category-card__line--title",
      content: L,
      ...w
    } : null,
    S ? {
      as: "p",
      className: "rpc-category-card__line--subtitle",
      content: S,
      ...C
    } : null
  ].filter(Boolean), H = {
    "--rpc-category-card-bg": t,
    "--rpc-category-card-border": n,
    "--rpc-category-card-gap": i,
    "--rpc-category-card-icon-bg": _,
    "--rpc-category-card-icon-border": f,
    "--rpc-category-card-icon-color": y,
    "--rpc-category-card-icon-box-size": u,
    "--rpc-category-card-icon-size": N,
    "--rpc-category-card-max-width": I,
    "--rpc-category-card-min-height": x,
    "--rpc-category-card-padding": P,
    "--rpc-category-card-radius": h,
    ...g
  };
  return /* @__PURE__ */ l(E, { className: Je("rpc-category-card", `rpc-category-card--${e}`, s), style: H, ...v, children: [
    o ? /* @__PURE__ */ r("div", { className: Je("rpc-category-card__icon", d), children: o }) : null,
    /* @__PURE__ */ l("div", { className: Je("rpc-category-card__content", p), children: [
      O.map(wa),
      c
    ] })
  ] });
}
function Ir(...e) {
  return e.filter(Boolean).join(" ");
}
function ka(e, a) {
  return a !== void 0 ? a : typeof e == "string" && e.trim() ? e.trim().slice(0, 1).toUpperCase() : "•";
}
function en({
  isOpen: e,
  avatar: a,
  avatarSrc: t,
  avatarAlt: n,
  avatarFallback: c,
  title: s,
  handle: p,
  description: i,
  stats: o = [],
  footer: _,
  children: f,
  id: u,
  className: d = "",
  ...y
}) {
  const N = (b, I = d) => /* @__PURE__ */ l("article", { className: Ir("rpc-hover-card", I), id: u, ...y, children: [
    /* @__PURE__ */ l("div", { className: "rpc-hover-card__header", children: [
      /* @__PURE__ */ l("div", { className: "rpc-hover-card__avatar", "aria-hidden": "true", children: [
        t ? /* @__PURE__ */ r("img", { alt: n ?? "", className: "rpc-hover-card__avatar-image", src: t }) : null,
        t ? null : a ?? /* @__PURE__ */ r("span", { className: "rpc-hover-card__avatar-fallback", children: ka(s, c) })
      ] }),
      /* @__PURE__ */ l("div", { className: "rpc-hover-card__identity", children: [
        /* @__PURE__ */ r("h3", { className: "rpc-hover-card__title", children: s }),
        p ? /* @__PURE__ */ r("p", { className: "rpc-hover-card__handle", children: p }) : null
      ] })
    ] }),
    i ? /* @__PURE__ */ r("p", { className: "rpc-hover-card__description", children: i }) : null,
    o.length ? /* @__PURE__ */ r("dl", { className: "rpc-hover-card__stats", children: o.map((x, P) => /* @__PURE__ */ l("div", { className: "rpc-hover-card__stat", children: [
      /* @__PURE__ */ r("dt", { className: "rpc-hover-card__stat-label", children: x.label }),
      /* @__PURE__ */ r("dd", { className: "rpc-hover-card__stat-value", children: x.value })
    ] }, P)) }) : null,
    b && f ? /* @__PURE__ */ r("div", { className: "rpc-hover-card__content", children: f }) : null,
    _ ? /* @__PURE__ */ r("div", { className: "rpc-hover-card__footer", children: _ }) : null
  ] });
  return e !== void 0 ? /* @__PURE__ */ l("div", { className: Ir("rpc-hover-card-root", d), children: [
    e ? N(!1, "rpc-hover-card--floating") : null,
    f ? /* @__PURE__ */ r("div", { className: "rpc-hover-card__trigger", children: f }) : null
  ] }) : N(!0);
}
function xa(...e) {
  return e.filter(Boolean).join(" ");
}
function rn({
  children: e,
  mode: a = "dark",
  primaryColor: t,
  primaryHoverColor: n,
  onPrimaryColor: c,
  secondaryColor: s,
  secondaryHoverColor: p,
  secondaryTextColor: i,
  dangerColor: o,
  successColor: _,
  warningColor: f,
  infoColor: u,
  backgroundColor: d,
  surfaceColor: y,
  surfaceMutedColor: N,
  textColor: b,
  mutedColor: I,
  borderColor: x,
  radius: P,
  shadow: h,
  className: g = "",
  style: S,
  ...C
}) {
  const L = {
    "--rpc-color-background": d,
    "--rpc-color-border": x,
    "--rpc-color-muted": I,
    "--rpc-color-primary": t,
    "--rpc-color-primary-dark": n,
    "--rpc-color-primary-hover": n,
    "--rpc-color-on-primary": c,
    "--rpc-color-secondary": s,
    "--rpc-color-secondary-hover": p,
    "--rpc-color-secondary-text": i,
    "--rpc-color-danger": o,
    "--rpc-color-success": _,
    "--rpc-color-warning": f,
    "--rpc-color-info": u,
    "--rpc-color-surface": y,
    "--rpc-color-surface-muted": N,
    "--rpc-color-text": b,
    "--rpc-radius": P,
    "--rpc-shadow": h,
    ...S
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: xa("rpc-theme-root", `rpc-theme-root--${a}`, g),
      "data-rpc-theme": a,
      style: L,
      ...C,
      children: e
    }
  );
}
function $a({ isOpen: e, onClose: a, title: t, children: n, className: c = "", closeOnOverlayClick: s = !0, ...p }) {
  return X(() => {
    if (e) {
      const i = document.body.style.overflow;
      return document.body.style.overflow = "hidden", () => {
        document.body.style.overflow = i;
      };
    }
  }, [e]), e ? /* @__PURE__ */ r(
    "div",
    {
      className: ["rpc-modal__overlay", c].filter(Boolean).join(" "),
      role: "dialog",
      "aria-modal": "true",
      onClick: (i) => {
        i.target === i.currentTarget && s && (a == null || a());
      },
      children: /* @__PURE__ */ l("div", { className: "rpc-modal", ...p, children: [
        t ? /* @__PURE__ */ r("div", { className: "rpc-modal__header", children: /* @__PURE__ */ r("h3", { className: "rpc-modal__title", children: t }) }) : null,
        /* @__PURE__ */ r("div", { className: "rpc-modal__body", children: n }),
        a ? /* @__PURE__ */ r("button", { className: "rpc-modal__close", onClick: a, "aria-label": "Close modal", children: "×" }) : null
      ] })
    }
  ) : null;
}
const Ur = Hr(null), an = ({ children: e, position: a = "bottom-right" }) => {
  const [t, n] = F([]), c = Ar((i) => {
    const o = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, _ = { id: o, message: i.message, variant: i.variant ?? "info" };
    n((u) => [...u, _]);
    const f = i.duration ?? 4e3;
    setTimeout(() => n((u) => u.filter((d) => d.id !== o)), f);
  }, []), s = Ar((i) => n((o) => o.filter((_) => _.id !== i)), []), p = J(() => ({ showToast: c }), [c]);
  return /* @__PURE__ */ l(Ur.Provider, { value: p, children: [
    e,
    /* @__PURE__ */ r("div", { className: ["rpc-toast-container", `rpc-toast-container--${a}`].join(" "), "aria-live": "polite", children: t.map((i) => /* @__PURE__ */ r("div", { className: ["rpc-toast", `rpc-toast--${i.variant}`].join(" "), onClick: () => s(i.id), children: i.message }, i.id)) })
  ] });
};
function tn() {
  const e = Wr(Ur);
  if (!e) throw new Error("useToast must be used within a ToastProvider");
  return e;
}
function nn({ variant: e = "info", title: a, children: t, dismissible: n = !1, onClose: c, className: s = "", ...p }) {
  return /* @__PURE__ */ l("div", { className: ["rpc-alert", `rpc-alert--${e}`, s].filter(Boolean).join(" "), role: "status", ...p, children: [
    a ? /* @__PURE__ */ r("div", { className: "rpc-alert__title", children: a }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-alert__body", children: t }),
    n ? /* @__PURE__ */ r("button", { className: "rpc-alert__close", onClick: c, "aria-label": "Close alert", children: "×" }) : null
  ] });
}
function cn({ isOpen: e, onClose: a, title: t, message: n, actions: c, ...s }) {
  const i = (c ?? [
    { label: "Cancel", onClick: a ?? (() => {
    }), variant: "secondary" },
    { label: "Yes", onClick: a ?? (() => {
    }), variant: "primary" }
  ]).map((o, _) => /* @__PURE__ */ r("button", { className: ["rpc-button", o.variant === "primary" ? "rpc-button--primary" : "rpc-button--secondary"].join(" "), onClick: o.onClick, children: o.label }, _));
  return /* @__PURE__ */ l($a, { isOpen: e, onClose: a, title: t, ...s, children: [
    /* @__PURE__ */ r("div", { style: { marginBottom: "1rem" }, children: n }),
    /* @__PURE__ */ r("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" }, children: i })
  ] });
}
function qr(...e) {
  return e.filter(Boolean).join(" ");
}
function Sa(e, a) {
  const t = e.as ?? "p", n = {
    "--rpc-section-heading-line-color": e.color,
    "--rpc-section-heading-line-family": e.fontFamily,
    "--rpc-section-heading-line-size": e.fontSize,
    "--rpc-section-heading-line-style": e.fontStyle,
    "--rpc-section-heading-line-weight": e.fontWeight,
    "--rpc-section-heading-line-letter-spacing": e.letterSpacing,
    "--rpc-section-heading-line-height": e.lineHeight,
    "--rpc-section-heading-line-margin": e.margin,
    "--rpc-section-heading-line-transform": e.textTransform,
    ...e.style
  };
  return /* @__PURE__ */ r(
    t,
    {
      className: qr("rpc-section-heading__line", e.className),
      style: n,
      children: e.content
    },
    e.id ?? a
  );
}
function ln({
  align: e = "center",
  as: a = "header",
  className: t = "",
  description: n,
  descriptionProps: c,
  eyebrow: s,
  eyebrowProps: p,
  gap: i = "0.65rem",
  lines: o,
  maxWidth: _ = "min(900px, 100%)",
  style: f,
  title: u,
  titleProps: d,
  ...y
}) {
  const N = a, b = o ?? [
    s ? {
      as: "span",
      className: "rpc-section-heading__line--eyebrow",
      content: s,
      ...p
    } : null,
    u ? {
      as: "h2",
      className: "rpc-section-heading__line--title",
      content: u,
      ...d
    } : null,
    n ? {
      as: "p",
      className: "rpc-section-heading__line--description",
      content: n,
      ...c
    } : null
  ].filter(Boolean), I = {
    "--rpc-section-heading-gap": i,
    "--rpc-section-heading-max-width": _,
    ...f
  };
  return /* @__PURE__ */ r(
    N,
    {
      className: qr("rpc-section-heading", `rpc-section-heading--${e}`, t),
      style: I,
      ...y,
      children: b.map(Sa)
    }
  );
}
function U(...e) {
  return e.filter((a) => typeof a == "string" && a.length > 0).join(" ");
}
function Ca(e, a) {
  return a ? a.split(".").reduce((t, n) => {
    if (t && typeof t == "object" && n in t)
      return t[n];
  }, e) : e;
}
function Ma(e) {
  return typeof e == "string" ? { url: e } : e;
}
function Pa(e) {
  if (e && typeof e == "object") {
    const a = e, t = a.value ?? a.id ?? a.key ?? a.slug, n = a.label ?? a.name ?? a.title ?? t;
    return {
      label: String(n ?? ""),
      value: String(t ?? n ?? ""),
      meta: e
    };
  }
  return {
    label: String(e ?? ""),
    value: String(e ?? "")
  };
}
function Ba(e, a, t) {
  const n = new URL(e.url, typeof window > "u" ? "http://localhost" : window.location.origin), c = e.searchParam ?? "search", s = e.pageParam ?? "page", p = e.limitParam ?? "limit";
  return a && n.searchParams.set(c, a), e.pageSize && (n.searchParams.set(s, String(t)), n.searchParams.set(p, String(e.pageSize))), Object.entries(e.queryParams ?? {}).forEach(([i, o]) => {
    o != null && n.searchParams.set(i, String(o));
  }), e.url.startsWith("http") ? n.toString() : `${n.pathname}${n.search}`;
}
function br({
  children: e,
  className: a,
  disabled: t,
  error: n,
  fullWidth: c = !0,
  helperText: s,
  id: p,
  label: i,
  required: o
}) {
  const _ = n ?? s;
  return /* @__PURE__ */ l(
    "label",
    {
      className: U(
        "rpc-form-field",
        c && "rpc-form-field--full",
        t && "rpc-form-field--disabled",
        n && "rpc-form-field--error",
        a
      ),
      htmlFor: p,
      children: [
        i ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
          i,
          o ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        e,
        _ ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", n && "rpc-form-field__message--error"), children: _ }) : null
      ]
    }
  );
}
function La({ off: e = !1 }) {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("path", { d: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" }),
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "3" }),
    e ? /* @__PURE__ */ r("path", { d: "m4 4 16 16" }) : null
  ] });
}
const vr = Se(function({
  className: a = "",
  disabled: t,
  error: n,
  fullWidth: c,
  helperText: s,
  id: p,
  inputClassName: i,
  label: o,
  prefix: _,
  required: f,
  suffix: u,
  type: d = "text",
  validationMessage: y,
  ...N
}, b) {
  const I = ie(), x = p ?? N.name ?? I, P = n ?? y;
  return /* @__PURE__ */ r(
    br,
    {
      className: a,
      disabled: t,
      error: P,
      fullWidth: c,
      helperText: s,
      id: x,
      label: o,
      required: f,
      children: /* @__PURE__ */ l("span", { className: "rpc-input-wrap", children: [
        _ ? /* @__PURE__ */ r("span", { className: "rpc-input-wrap__affix", children: _ }) : null,
        /* @__PURE__ */ r(
          "input",
          {
            "aria-describedby": P || s ? `${x}-message` : void 0,
            "aria-invalid": !!P || void 0,
            className: U("rpc-form-input", i),
            disabled: t,
            id: x,
            ref: b,
            required: f,
            type: d,
            ...N
          }
        ),
        u ? /* @__PURE__ */ r("span", { className: "rpc-input-wrap__affix", children: u }) : null
      ] })
    }
  );
}), Aa = Se(function({
  className: a = "",
  disabled: t,
  error: n,
  formatNumber: c = !1,
  fullWidth: s,
  helperText: p,
  id: i,
  inputClassName: o,
  label: _,
  max: f,
  min: u,
  onValueChange: d,
  prefix: y,
  required: N,
  step: b = 1,
  suffix: I,
  value: x,
  ...P
}, h) {
  var B;
  const g = ie(), S = i ?? P.name ?? g, [C, L] = F(x === void 0 ? "" : String(x)), w = x === void 0 ? C : String(x);
  X(() => {
    x !== void 0 && L(String(x));
  }, [x]);
  const v = w === "" ? null : Number(w), E = typeof document < "u" && ((B = document.activeElement) == null ? void 0 : B.id) === S, O = c && !E && v !== null ? new Intl.NumberFormat().format(v) : w, H = (q) => {
    x === void 0 && L(q), d == null || d(q === "" ? null : Number(q));
  }, W = (q) => {
    let K = q;
    return u !== void 0 && (K = Math.max(Number(u), K)), f !== void 0 && (K = Math.min(Number(f), K)), K;
  }, M = (q) => {
    const K = v ?? Number(u ?? 0);
    H(String(W(K + Number(b) * q)));
  };
  return /* @__PURE__ */ r(
    br,
    {
      className: a,
      disabled: t,
      error: n,
      fullWidth: s,
      helperText: p,
      id: S,
      label: _,
      required: N,
      children: /* @__PURE__ */ l("span", { className: "rpc-input-wrap rpc-input-wrap--number", children: [
        y ? /* @__PURE__ */ r("span", { className: "rpc-input-wrap__affix", children: y }) : null,
        /* @__PURE__ */ r(
          "input",
          {
            "aria-invalid": !!n || void 0,
            className: U("rpc-form-input", o),
            disabled: t,
            id: S,
            max: f,
            min: u,
            inputMode: c ? "decimal" : void 0,
            onChange: (q) => H(c ? q.target.value.replace(/,/g, "") : q.target.value),
            ref: h,
            required: N,
            step: b,
            type: c ? "text" : "number",
            value: O,
            ...P
          }
        ),
        /* @__PURE__ */ l("span", { className: "rpc-number-stepper", "aria-hidden": t, children: [
          /* @__PURE__ */ r("button", { disabled: t, onClick: () => M(1), tabIndex: -1, type: "button", children: "+" }),
          /* @__PURE__ */ r("button", { disabled: t, onClick: () => M(-1), tabIndex: -1, type: "button", children: "-" })
        ] }),
        I ? /* @__PURE__ */ r("span", { className: "rpc-input-wrap__affix", children: I }) : null
      ] })
    }
  );
}), Ia = Se(function({ helperText: a = "Gunakan format email yang valid.", validateOnBlur: t = !0, onBlur: n, error: c, ...s }, p) {
  const [i, o] = F(null);
  return /* @__PURE__ */ r(
    vr,
    {
      error: c ?? i,
      helperText: a,
      inputMode: "email",
      onBlur: (_) => {
        t && _.currentTarget.value && !_.currentTarget.checkValidity() ? o("Format email belum valid.") : o(null), n == null || n(_);
      },
      ref: p,
      type: "email",
      ...s
    }
  );
}), Da = Se(function({ showStrength: a = !0, value: t, defaultValue: n, helperText: c, error: s, ...p }, i) {
  const [o, _] = F(!1), [f, u] = F(String(n ?? t ?? "")), d = t === void 0 ? f : String(t ?? ""), y = J(() => {
    let b = 0;
    return d.length >= 8 && (b += 1), /[A-Z]/.test(d) && (b += 1), /[0-9]/.test(d) && (b += 1), /[^A-Za-z0-9]/.test(d) && (b += 1), b;
  }, [d]), N = ["Very weak", "Weak", "Medium", "Strong", "Excellent"][y];
  return /* @__PURE__ */ l("div", { className: "rpc-password-field", children: [
    /* @__PURE__ */ r(
      vr,
      {
        error: s,
        helperText: c,
        onChange: (b) => {
          var I;
          t === void 0 && u(b.target.value), (I = p.onChange) == null || I.call(p, b);
        },
        ref: i,
        suffix: /* @__PURE__ */ r(
          "button",
          {
            "aria-label": o ? "Hide password" : "Show password",
            className: "rpc-password-toggle",
            onClick: () => _((b) => !b),
            type: "button",
            children: /* @__PURE__ */ r(La, { off: o })
          }
        ),
        type: o ? "text" : "password",
        value: t === void 0 ? f : t,
        ...p
      }
    ),
    /* @__PURE__ */ r("input", { hidden: !0, readOnly: !0, type: o ? "text" : "password", value: d }),
    a ? /* @__PURE__ */ l("div", { className: "rpc-password-strength", "aria-label": `Password strength ${N}`, children: [
      /* @__PURE__ */ r("span", { className: "rpc-password-strength__track", children: /* @__PURE__ */ r("span", { className: `rpc-password-strength__bar rpc-password-strength__bar--${y}` }) }),
      /* @__PURE__ */ r("span", { children: N })
    ] }) : null
  ] });
}), Ea = Se(function({
  autoResize: a = !0,
  className: t = "",
  disabled: n,
  error: c,
  fullWidth: s,
  helperText: p,
  id: i,
  inputClassName: o,
  label: _,
  maxLength: f,
  onChange: u,
  required: d,
  showCounter: y = !0,
  value: N,
  defaultValue: b,
  ...I
}, x) {
  const P = ie(), h = i ?? I.name ?? P, g = pe(null), [S, C] = F(String(N ?? b ?? "").length), L = () => {
    const w = g.current;
    !w || !a || (w.style.height = "auto", w.style.height = `${w.scrollHeight}px`);
  };
  return X(L, [a, N]), ya(x, () => g.current), /* @__PURE__ */ l(
    br,
    {
      className: t,
      disabled: n,
      error: c,
      fullWidth: s,
      helperText: p,
      id: h,
      label: _,
      required: d,
      children: [
        /* @__PURE__ */ r(
          "textarea",
          {
            "aria-invalid": !!c || void 0,
            className: U("rpc-form-textarea", o),
            disabled: n,
            id: h,
            maxLength: f,
            onChange: (w) => {
              C(w.target.value.length), L(), u == null || u(w);
            },
            ref: g,
            required: d,
            value: N,
            defaultValue: b,
            ...I
          }
        ),
        y && f ? /* @__PURE__ */ l("span", { className: "rpc-form-counter", children: [
          S,
          "/",
          f
        ] }) : null
      ]
    }
  );
}), Kr = Se(function({ className: a = "", description: t, disabled: n, error: c, helperText: s, id: p, label: i, required: o, ..._ }, f) {
  const u = ie(), d = p ?? _.name ?? u, y = c ?? s;
  return /* @__PURE__ */ l("label", { className: U("rpc-choice", n && "rpc-choice--disabled", c && "rpc-choice--error", a), htmlFor: d, children: [
    /* @__PURE__ */ r(
      "input",
      {
        "aria-invalid": !!c || void 0,
        className: "rpc-choice__native",
        disabled: n,
        id: d,
        ref: f,
        required: o,
        type: "checkbox",
        ..._
      }
    ),
    /* @__PURE__ */ r("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
    /* @__PURE__ */ l("span", { className: "rpc-choice__content", children: [
      i ? /* @__PURE__ */ l("span", { className: "rpc-choice__label", children: [
        i,
        o ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ r("span", { className: "rpc-choice__description", children: t }) : null,
      y ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", c && "rpc-form-field__message--error"), children: y }) : null
    ] })
  ] });
});
function sn({
  className: e = "",
  defaultValue: a = [],
  disabled: t,
  error: n,
  helperText: c,
  label: s,
  layout: p = "vertical",
  name: i,
  onValueChange: o,
  options: _,
  required: f,
  value: u
}) {
  const [d, y] = F(a), N = u ?? d, b = n ?? c, I = (x) => {
    const P = N.includes(x) ? N.filter((h) => h !== x) : [...N, x];
    u === void 0 && y(P), o == null || o(P);
  };
  return /* @__PURE__ */ l("fieldset", { className: U("rpc-choice-group", `rpc-choice-group--${p}`, n && "rpc-choice-group--error", e), children: [
    s ? /* @__PURE__ */ l("legend", { className: "rpc-form-field__label", children: [
      s,
      f ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-choice-group__items", children: _.map((x) => /* @__PURE__ */ r(
      Kr,
      {
        checked: N.includes(x.value),
        description: x.description,
        disabled: t || x.disabled,
        label: x.label,
        name: i,
        onChange: () => I(x.value),
        value: x.value
      },
      x.value
    )) }),
    b ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", n && "rpc-form-field__message--error"), children: b }) : null
  ] });
}
function Fa({
  className: e = "",
  defaultValue: a,
  disabled: t,
  error: n,
  helperText: c,
  label: s,
  layout: p = "vertical",
  name: i,
  onValueChange: o,
  options: _,
  required: f,
  value: u
}) {
  const d = ie(), y = i ?? d, [N, b] = F(a ?? ""), I = u ?? N, x = n ?? c;
  return /* @__PURE__ */ l("fieldset", { className: U("rpc-choice-group", `rpc-choice-group--${p}`, n && "rpc-choice-group--error", e), children: [
    s ? /* @__PURE__ */ l("legend", { className: "rpc-form-field__label", children: [
      s,
      f ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-choice-group__items", children: _.map((P) => /* @__PURE__ */ l(
      "label",
      {
        className: U("rpc-choice rpc-choice--radio", (t || P.disabled) && "rpc-choice--disabled"),
        children: [
          /* @__PURE__ */ r(
            "input",
            {
              checked: I === P.value,
              className: "rpc-choice__native",
              disabled: t || P.disabled,
              name: y,
              onChange: () => {
                u === void 0 && b(P.value), o == null || o(P.value);
              },
              required: f,
              type: "radio",
              value: P.value
            }
          ),
          /* @__PURE__ */ r("span", { className: "rpc-choice__control", "aria-hidden": "true" }),
          /* @__PURE__ */ l("span", { className: "rpc-choice__content", children: [
            /* @__PURE__ */ r("span", { className: "rpc-choice__label", children: P.label }),
            P.description ? /* @__PURE__ */ r("span", { className: "rpc-choice__description", children: P.description }) : null
          ] })
        ]
      },
      P.value
    )) }),
    x ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", n && "rpc-form-field__message--error"), children: x }) : null
  ] });
}
const ja = Se(function({ className: a = "", description: t, disabled: n, error: c, helperText: s, id: p, label: i, offLabel: o = "Off", onLabel: _ = "On", required: f, ...u }, d) {
  const y = ie(), N = p ?? u.name ?? y, b = c ?? s;
  return /* @__PURE__ */ l("label", { className: U("rpc-switch", n && "rpc-switch--disabled", c && "rpc-switch--error", a), htmlFor: N, children: [
    /* @__PURE__ */ r(
      "input",
      {
        "aria-invalid": !!c || void 0,
        className: "rpc-switch__native",
        disabled: n,
        id: N,
        ref: d,
        required: f,
        type: "checkbox",
        ...u
      }
    ),
    /* @__PURE__ */ r("span", { className: "rpc-switch__track", "aria-hidden": "true", children: /* @__PURE__ */ r("span", { className: "rpc-switch__thumb" }) }),
    /* @__PURE__ */ l("span", { className: "rpc-switch__content", children: [
      i ? /* @__PURE__ */ l("span", { className: "rpc-choice__label", children: [
        i,
        f ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
      ] }) : null,
      t ? /* @__PURE__ */ r("span", { className: "rpc-choice__description", children: t }) : null,
      /* @__PURE__ */ l("span", { className: "rpc-switch__state", children: [
        /* @__PURE__ */ r("span", { children: o }),
        /* @__PURE__ */ r("span", { children: _ })
      ] }),
      b ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", c && "rpc-form-field__message--error"), children: b }) : null
    ] })
  ] });
});
function zr(e, a, t) {
  const [n, c] = F(1), [s, p] = F([]), [i, o] = F(!1), [_, f] = F(null), u = J(() => e ? Ma(e) : null, [e]), d = !!(u != null && u.pageSize);
  return X(() => {
    c(1);
  }, [t, e, a]), X(() => {
    if (!u && !a) return;
    const y = new AbortController();
    return o(!0), f(null), (a ? Promise.resolve(a(t, n)) : fetch(Ba(u, t, n), {
      headers: u == null ? void 0 : u.headers,
      signal: y.signal
    }).then((b) => {
      if (!b.ok) throw new Error(`Request failed ${b.status}`);
      return b.json();
    }).then((b) => {
      const I = u, x = Ca(b, I.dataPath);
      return (Array.isArray(x) ? x : Array.isArray(b) ? b : []).map((h) => I.mapOption ? I.mapOption(h) : Pa(h));
    })).then((b) => {
      p((I) => n === 1 ? b : [...I, ...b]);
    }).catch((b) => {
      b instanceof DOMException && b.name === "AbortError" || f(b instanceof Error ? b.message : "Gagal mengambil data.");
    }).finally(() => o(!1)), () => y.abort();
  }, [u, a, n, t]), {
    canLoadMore: d,
    error: _,
    isLoading: i,
    options: s,
    setPage: c
  };
}
function Yr() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "m6 9 6 6 6-6" }) });
}
function Zr({ onClear: e }) {
  return /* @__PURE__ */ r("button", { "aria-label": "Clear value", className: "rpc-select__clear", onClick: e, type: "button", children: "x" });
}
function Ra({
  className: e = "",
  clearable: a = !0,
  defaultValue: t = "",
  disabled: n,
  endpoint: c,
  error: s,
  fullWidth: p = !0,
  helperText: i,
  label: o,
  loadOptions: _,
  name: f,
  onValueChange: u,
  options: d = [],
  placeholder: y = "Select option",
  searchPlaceholder: N = "Search...",
  required: b,
  searchable: I = !0,
  value: x
}) {
  const P = ie(), h = `${f ?? P}-button`, [g, S] = F(!1), [C, L] = F(""), [w, v] = F(t), E = pe(null), O = zr(c, _, C), H = c || _ ? O.options : d, W = x ?? w, M = H.find(($) => $.value === W) ?? null, B = c || _ ? H : H.filter(($) => `${$.label} ${$.description ?? ""}`.toLowerCase().includes(C.toLowerCase())), q = s ?? i ?? O.error;
  X(() => {
    const $ = (D) => {
      var Z;
      (Z = E.current) != null && Z.contains(D.target) || S(!1);
    };
    return document.addEventListener("mousedown", $), () => document.removeEventListener("mousedown", $);
  }, []);
  const K = ($) => {
    const D = ($ == null ? void 0 : $.value) ?? "";
    x === void 0 && v(D), u == null || u(D, $), S(!1);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      className: U(
        "rpc-form-field",
        "rpc-select",
        p && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        q && s && "rpc-form-field--error",
        e
      ),
      ref: E,
      children: [
        o ? /* @__PURE__ */ l("label", { className: "rpc-form-field__label", htmlFor: h, children: [
          o,
          b ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ r("input", { name: f, readOnly: !0, required: b, type: "hidden", value: W }),
        /* @__PURE__ */ l(
          "button",
          {
            "aria-expanded": g,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger",
            disabled: n,
            id: h,
            onClick: () => S(($) => !$),
            type: "button",
            children: [
              /* @__PURE__ */ r("span", { className: U(!M && "rpc-select__placeholder"), children: (M == null ? void 0 : M.label) ?? y }),
              a && W ? /* @__PURE__ */ r(Zr, { onClear: () => K(null) }) : null,
              /* @__PURE__ */ r("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ r(Yr, {}) })
            ]
          }
        ),
        g ? /* @__PURE__ */ l("div", { className: "rpc-select__popover", children: [
          I ? /* @__PURE__ */ r(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: ($) => L($.target.value),
              placeholder: N,
              type: "search",
              value: C
            }
          ) : null,
          /* @__PURE__ */ l("div", { className: "rpc-select__list", role: "listbox", children: [
            B.map(($) => /* @__PURE__ */ l(
              "button",
              {
                "aria-selected": $.value === W,
                className: U("rpc-select__option", $.value === W && "rpc-select__option--selected"),
                disabled: $.disabled,
                onClick: () => K($),
                role: "option",
                type: "button",
                children: [
                  /* @__PURE__ */ r("span", { children: $.label }),
                  $.description ? /* @__PURE__ */ r("small", { children: $.description }) : null
                ]
              },
              $.value
            )),
            !O.isLoading && B.length === 0 ? /* @__PURE__ */ r("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            O.isLoading ? /* @__PURE__ */ r("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          c && O.canLoadMore ? /* @__PURE__ */ r("button", { className: "rpc-select__load", disabled: O.isLoading, onClick: () => O.setPage(($) => $ + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        q ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", s && "rpc-form-field__message--error"), children: q }) : null
      ]
    }
  );
}
function Oa({
  className: e = "",
  clearable: a = !0,
  defaultValue: t = [],
  disabled: n,
  endpoint: c,
  error: s,
  fullWidth: p = !0,
  helperText: i,
  label: o,
  loadOptions: _,
  maxVisibleTags: f = 3,
  name: u,
  onValueChange: d,
  options: y = [],
  placeholder: N = "Select options",
  searchPlaceholder: b = "Search...",
  required: I,
  searchable: x = !0,
  value: P
}) {
  const h = ie(), g = `${u ?? h}-button`, [S, C] = F(!1), [L, w] = F(""), [v, E] = F(t), O = pe(null), H = zr(c, _, L), W = c || _ ? H.options : y, M = P ?? v, B = M.map((k) => W.find((V) => V.value === k)).filter(Boolean), q = c || _ ? W : W.filter((k) => `${k.label} ${k.description ?? ""}`.toLowerCase().includes(L.toLowerCase())), K = s ?? i ?? H.error;
  X(() => {
    const k = (V) => {
      var R;
      (R = O.current) != null && R.contains(V.target) || C(!1);
    };
    return document.addEventListener("mousedown", k), () => document.removeEventListener("mousedown", k);
  }, []);
  const $ = (k) => {
    const V = k.map((R) => W.find((Q) => Q.value === R)).filter(Boolean);
    P === void 0 && E(k), d == null || d(k, V);
  }, D = (k) => {
    k.disabled || $(M.includes(k.value) ? M.filter((V) => V !== k.value) : [...M, k.value]);
  }, Z = (k, V) => {
    (k.key === "Enter" || k.key === " ") && (k.preventDefault(), D(V));
  };
  return /* @__PURE__ */ l(
    "div",
    {
      className: U(
        "rpc-form-field",
        "rpc-select",
        "rpc-select--multi",
        p && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        e
      ),
      ref: O,
      children: [
        o ? /* @__PURE__ */ l("label", { className: "rpc-form-field__label", htmlFor: g, children: [
          o,
          I ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        M.map((k) => /* @__PURE__ */ r("input", { name: u, readOnly: !0, type: "hidden", value: k }, k)),
        /* @__PURE__ */ l(
          "button",
          {
            "aria-expanded": S,
            "aria-haspopup": "listbox",
            className: "rpc-select__trigger rpc-select__trigger--multi",
            disabled: n,
            id: g,
            onClick: () => C((k) => !k),
            type: "button",
            children: [
              B.length ? /* @__PURE__ */ l("span", { className: "rpc-select__tags", children: [
                B.slice(0, f).map((k) => /* @__PURE__ */ r("span", { className: "rpc-select__tag", children: k.label }, k.value)),
                B.length > f ? /* @__PURE__ */ l("span", { className: "rpc-select__tag", children: [
                  "+",
                  B.length - f
                ] }) : null
              ] }) : /* @__PURE__ */ r("span", { className: "rpc-select__placeholder", children: N }),
              a && M.length ? /* @__PURE__ */ r(Zr, { onClear: () => $([]) }) : null,
              /* @__PURE__ */ r("span", { className: "rpc-select__chevron", children: /* @__PURE__ */ r(Yr, {}) })
            ]
          }
        ),
        S ? /* @__PURE__ */ l("div", { className: "rpc-select__popover", children: [
          x ? /* @__PURE__ */ r(
            "input",
            {
              autoFocus: !0,
              className: "rpc-select__search",
              onChange: (k) => w(k.target.value),
              placeholder: b,
              type: "search",
              value: L
            }
          ) : null,
          /* @__PURE__ */ l("div", { className: "rpc-select__list", role: "listbox", "aria-multiselectable": "true", children: [
            q.map((k) => /* @__PURE__ */ l(
              "button",
              {
                "aria-selected": M.includes(k.value),
                className: U("rpc-select__option", M.includes(k.value) && "rpc-select__option--selected"),
                disabled: k.disabled,
                onClick: () => D(k),
                onKeyDown: (V) => Z(V, k),
                role: "option",
                type: "button",
                children: [
                  /* @__PURE__ */ r("span", { children: k.label }),
                  k.description ? /* @__PURE__ */ r("small", { children: k.description }) : null
                ]
              },
              k.value
            )),
            !H.isLoading && q.length === 0 ? /* @__PURE__ */ r("span", { className: "rpc-select__empty", children: "No options found." }) : null,
            H.isLoading ? /* @__PURE__ */ r("span", { className: "rpc-select__empty", children: "Loading..." }) : null
          ] }),
          c && H.canLoadMore ? /* @__PURE__ */ r("button", { className: "rpc-select__load", disabled: H.isLoading, onClick: () => H.setPage((k) => k + 1), type: "button", children: "Load more" }) : null
        ] }) : null,
        K ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", s && "rpc-form-field__message--error"), children: K }) : null
      ]
    }
  );
}
const Ta = new Intl.DateTimeFormat("en", { weekday: "short" }), Va = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });
function or(e) {
  if (!e) return null;
  const a = /* @__PURE__ */ new Date(`${e}T00:00:00`);
  return Number.isNaN(a.getTime()) ? null : a;
}
function Ha(e) {
  const a = String(e.getMonth() + 1).padStart(2, "0"), t = String(e.getDate()).padStart(2, "0");
  return `${e.getFullYear()}-${a}-${t}`;
}
function Wa(e, a) {
  return !!(e && a && e.getFullYear() === a.getFullYear() && e.getMonth() === a.getMonth() && e.getDate() === a.getDate());
}
function dr({
  className: e = "",
  clearable: a = !0,
  defaultValue: t,
  disabled: n,
  disabledDate: c,
  error: s,
  fullWidth: p = !0,
  helperText: i,
  id: o,
  label: _,
  maxDate: f,
  minDate: u,
  name: d,
  onValueChange: y,
  placeholder: N = "YYYY-MM-DD",
  required: b,
  value: I,
  ...x
}) {
  const P = ie(), h = o ?? d ?? P, [g, S] = F(!1), [C, L] = F(String(t ?? "")), w = I ?? C, v = or(w), [E, O] = F(() => v ?? /* @__PURE__ */ new Date()), H = pe(null), W = or(u), M = or(f);
  X(() => {
    const D = (Z) => {
      var k;
      (k = H.current) != null && k.contains(Z.target) || S(!1);
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, []), X(() => {
    v && O(v);
  }, [w]);
  const B = J(() => {
    const D = new Date(E.getFullYear(), E.getMonth(), 1), Z = new Date(E.getFullYear(), E.getMonth() + 1, 0), k = D.getDay(), V = [];
    for (let R = 0; R < k; R += 1)
      V.push(new Date(D.getFullYear(), D.getMonth(), R - k + 1));
    for (let R = 1; R <= Z.getDate(); R += 1)
      V.push(new Date(D.getFullYear(), D.getMonth(), R));
    for (; V.length % 7 !== 0; ) {
      const R = V[V.length - 1];
      V.push(new Date(R.getFullYear(), R.getMonth(), R.getDate() + 1));
    }
    return V;
  }, [E]), q = J(() => {
    const D = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (Z, k) => Ta.format(new Date(D.getFullYear(), D.getMonth(), D.getDate() + k)).slice(0, 2));
  }, []), K = (D) => W && D < W || M && D > M ? !0 : (c == null ? void 0 : c(D)) ?? !1, $ = (D) => {
    I === void 0 && L(D), y == null || y(D);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      className: U(
        "rpc-form-field",
        "rpc-date-picker",
        p && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        s && "rpc-form-field--error",
        e
      ),
      ref: H,
      children: [
        _ ? /* @__PURE__ */ l("label", { className: "rpc-form-field__label", htmlFor: h, children: [
          _,
          b ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ l("span", { className: "rpc-input-wrap", children: [
          /* @__PURE__ */ r(
            "input",
            {
              "aria-expanded": g,
              "aria-haspopup": "dialog",
              "aria-invalid": !!s || void 0,
              className: "rpc-form-input",
              disabled: n,
              id: h,
              max: f,
              min: u,
              name: d,
              onChange: (D) => $(D.target.value),
              onFocus: () => S(!0),
              placeholder: N,
              required: b,
              type: "text",
              value: w,
              ...x
            }
          ),
          a && w ? /* @__PURE__ */ r("button", { "aria-label": "Clear date", className: "rpc-select__clear", onClick: () => $(""), type: "button", children: "x" }) : null,
          /* @__PURE__ */ r("button", { "aria-label": "Open calendar", className: "rpc-date-picker__button", disabled: n, onClick: () => S((D) => !D), type: "button", children: /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ r("rect", { x: "3", y: "4", width: "18", height: "18", rx: "3" }),
            /* @__PURE__ */ r("path", { d: "M8 2v4M16 2v4M3 10h18" })
          ] }) })
        ] }),
        g ? /* @__PURE__ */ l("div", { className: "rpc-date-picker__calendar", role: "dialog", "aria-label": "Choose date", children: [
          /* @__PURE__ */ l("div", { className: "rpc-date-picker__header", children: [
            /* @__PURE__ */ r("button", { onClick: () => O(new Date(E.getFullYear(), E.getMonth() - 1, 1)), type: "button", children: "‹" }),
            /* @__PURE__ */ r("strong", { children: Va.format(E) }),
            /* @__PURE__ */ r("button", { onClick: () => O(new Date(E.getFullYear(), E.getMonth() + 1, 1)), type: "button", children: "›" })
          ] }),
          /* @__PURE__ */ l("div", { className: "rpc-date-picker__grid", children: [
            q.map((D) => /* @__PURE__ */ r("span", { className: "rpc-date-picker__weekday", children: D }, D)),
            B.map((D) => {
              const Z = Ha(D), k = D.getMonth() !== E.getMonth();
              return /* @__PURE__ */ r(
                "button",
                {
                  className: U(
                    "rpc-date-picker__day",
                    k && "rpc-date-picker__day--outside",
                    Wa(D, v) && "rpc-date-picker__day--selected"
                  ),
                  disabled: K(D),
                  onClick: () => {
                    $(Z), S(!1);
                  },
                  type: "button",
                  children: D.getDate()
                },
                Z
              );
            })
          ] })
        ] }) : null,
        s ?? i ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", s && "rpc-form-field__message--error"), children: s ?? i }) : null
      ]
    }
  );
}
function Dr(e) {
  return e < 1024 * 1024 ? `${Math.round(e / 1024)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function Ua(e, a) {
  return a ? a.split(",").map((n) => n.trim()).filter(Boolean).some((n) => n.endsWith("/*") ? e.type.startsWith(n.replace("/*", "/")) : n.startsWith(".") ? e.name.toLowerCase().endsWith(n.toLowerCase()) : e.type === n) : !0;
}
function qa({
  accept: e,
  className: a = "",
  description: t = "Drag file ke sini atau klik untuk memilih file.",
  disabled: n,
  error: c,
  files: s,
  fullWidth: p = !0,
  helperText: i,
  id: o,
  label: _,
  maxFileSize: f,
  multiple: u = !0,
  name: d,
  onFilesChange: y,
  progress: N,
  required: b,
  ...I
}) {
  const x = ie(), P = o ?? d ?? x, h = pe(null), [g, S] = F(!1), [C, L] = F([]), [w, v] = F(null), E = s ?? C, O = E.map(($) => ({
    file: $,
    url: $.type.startsWith("image/") ? URL.createObjectURL($) : null
  }));
  X(() => () => O.forEach(($) => $.url && URL.revokeObjectURL($.url)), [E]);
  const H = ($) => {
    s === void 0 && L($), y == null || y($);
  }, W = ($) => {
    const D = [], Z = [];
    return $.forEach((k) => {
      if (f && k.size > f) {
        Z.push(`${k.name} melebihi ${Dr(f)}.`);
        return;
      }
      if (!Ua(k, e)) {
        Z.push(`${k.name} tidak sesuai tipe file.`);
        return;
      }
      D.push(k);
    }), v(Z[0] ?? null), D;
  }, M = ($) => {
    const D = W(Array.from($));
    D.length && H(u ? [...E, ...D] : D.slice(0, 1));
  }, B = ($) => {
    H(E.filter((D) => D.name !== $));
  }, q = ($) => typeof N == "number" ? N : (N == null ? void 0 : N[$.name]) ?? 0, K = c ?? w ?? i;
  return /* @__PURE__ */ l(
    "div",
    {
      className: U(
        "rpc-form-field",
        "rpc-upload",
        p && "rpc-form-field--full",
        n && "rpc-form-field--disabled",
        (c || w) && "rpc-form-field--error",
        a
      ),
      children: [
        _ ? /* @__PURE__ */ l("label", { className: "rpc-form-field__label", htmlFor: P, children: [
          _,
          b ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ l(
          "button",
          {
            className: U("rpc-upload__dropzone", g && "rpc-upload__dropzone--dragging"),
            disabled: n,
            onClick: () => {
              var $;
              return ($ = h.current) == null ? void 0 : $.click();
            },
            onDragEnter: ($) => {
              $.preventDefault(), S(!0);
            },
            onDragLeave: ($) => {
              $.preventDefault(), S(!1);
            },
            onDragOver: ($) => $.preventDefault(),
            onDrop: ($) => {
              $.preventDefault(), S(!1), M($.dataTransfer.files);
            },
            type: "button",
            children: [
              /* @__PURE__ */ r("span", { className: "rpc-upload__icon", "aria-hidden": "true", children: "↑" }),
              /* @__PURE__ */ r("strong", { children: "Upload file" }),
              /* @__PURE__ */ r("span", { children: t }),
              e ? /* @__PURE__ */ l("small", { children: [
                "Allowed: ",
                e
              ] }) : null
            ]
          }
        ),
        /* @__PURE__ */ r(
          "input",
          {
            accept: e,
            className: "rpc-upload__input",
            disabled: n,
            id: P,
            multiple: u,
            name: d,
            onChange: ($) => {
              $.target.files && M($.target.files), $.target.value = "";
            },
            ref: h,
            required: b,
            type: "file",
            ...I
          }
        ),
        E.length ? /* @__PURE__ */ r("ul", { className: "rpc-upload__list", children: O.map(({ file: $, url: D }) => /* @__PURE__ */ l("li", { className: "rpc-upload__item", children: [
          D ? /* @__PURE__ */ r("img", { alt: $.name, src: D }) : /* @__PURE__ */ r("span", { className: "rpc-upload__file-icon", children: "FILE" }),
          /* @__PURE__ */ l("span", { className: "rpc-upload__meta", children: [
            /* @__PURE__ */ r("strong", { children: $.name }),
            /* @__PURE__ */ r("small", { children: Dr($.size) }),
            q($) > 0 ? /* @__PURE__ */ r("span", { className: "rpc-upload__progress", children: /* @__PURE__ */ r("span", { style: { width: `${Math.min(100, q($))}%` } }) }) : null
          ] }),
          /* @__PURE__ */ r("button", { "aria-label": `Remove ${$.name}`, onClick: () => B($.name), type: "button", children: "x" })
        ] }, `${$.name}-${$.lastModified}`)) }) : null,
        K ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", (c || w) && "rpc-form-field__message--error"), children: K }) : null
      ]
    }
  );
}
function Ka(e, a) {
  return e === "checkbox" || e === "switch" ? !1 : e === "range" || e === "rating" ? 0 : e === "date-range" ? { start: "", end: "" } : e === "file" ? a ? [] : null : e === "select" && a ? [] : "";
}
function za(e, a) {
  var t;
  return e[a.name] ?? Ka(a.kind, (t = a.props) == null ? void 0 : t.multiple);
}
function Ya(e) {
  const a = [], t = /* @__PURE__ */ new Map();
  return e.forEach((n, c) => {
    const s = n.row ?? `__single_${c}`, p = t.get(s);
    if (p) {
      p.fields.push(n);
      return;
    }
    const i = { id: s, fields: [n] };
    t.set(s, i), a.push(i);
  }), a;
}
function pr({
  error: e,
  field: a,
  type: t,
  value: n,
  onChange: c
}) {
  const s = a.props ?? {};
  return /* @__PURE__ */ l("label", { className: U("rpc-form-field", s.className, e && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
      a.label,
      s.required ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ r("span", { className: U("rpc-input-wrap", t === "color" && "rpc-input-wrap--color"), children: /* @__PURE__ */ r(
      "input",
      {
        className: U("rpc-form-input", s.inputClassName),
        disabled: s.disabled,
        max: typeof s.max == "string" ? s.max : void 0,
        min: typeof s.min == "string" ? s.min : void 0,
        name: a.name,
        onChange: (p) => c(p.target.value),
        placeholder: s.placeholder,
        required: s.required,
        type: t,
        value: n
      }
    ) }),
    e ?? s.hint ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", e && "rpc-form-field__message--error"), children: e ?? s.hint }) : null
  ] });
}
function Za({
  error: e,
  field: a,
  value: t,
  onChange: n
}) {
  const c = a.props ?? {}, s = c.length ?? 6, p = t.padEnd(s, " ").slice(0, s).split("");
  return /* @__PURE__ */ l("label", { className: U("rpc-form-field", c.className, e && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
      a.label,
      c.required ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ r("span", { className: "rpc-form-otp", role: "group", "aria-label": typeof a.label == "string" ? a.label : a.name, children: p.map((i, o) => /* @__PURE__ */ r(
      "input",
      {
        "aria-label": `Digit ${o + 1}`,
        className: U("rpc-form-otp__input", c.inputClassName),
        disabled: c.disabled,
        inputMode: "numeric",
        maxLength: 1,
        onChange: (_) => {
          const f = p.map((u) => u.trim());
          f[o] = _.target.value.slice(-1), n(f.join("").slice(0, s)), _.currentTarget.nextElementSibling instanceof HTMLInputElement && _.target.value && _.currentTarget.nextElementSibling.focus();
        },
        required: c.required,
        value: i.trim()
      },
      `${a.name}-${o}`
    )) }),
    e ?? c.hint ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", e && "rpc-form-field__message--error"), children: e ?? c.hint }) : null
  ] });
}
function Ga({
  error: e,
  field: a,
  value: t,
  onChange: n
}) {
  const c = a.props ?? {};
  return /* @__PURE__ */ l("label", { className: U("rpc-form-field", "rpc-form-range", c.className, e && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
      a.label,
      c.required ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ l("span", { className: "rpc-form-range__top", children: [
      /* @__PURE__ */ r(
        "input",
        {
          disabled: c.disabled,
          max: Number(c.max ?? 100),
          min: Number(c.min ?? 0),
          name: a.name,
          onChange: (s) => n(Number(s.target.value)),
          required: c.required,
          step: c.step ?? 1,
          type: "range",
          value: t
        }
      ),
      /* @__PURE__ */ r("strong", { children: t })
    ] }),
    e ?? c.hint ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", e && "rpc-form-field__message--error"), children: e ?? c.hint }) : null
  ] });
}
function Xa({
  error: e,
  field: a,
  value: t,
  onChange: n
}) {
  const c = a.props ?? {}, s = Number(c.max ?? 5);
  return /* @__PURE__ */ l("div", { className: U("rpc-form-field", c.className, e && "rpc-form-field--error"), children: [
    a.label ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
      a.label,
      c.required ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-form-rating", role: "radiogroup", "aria-label": typeof a.label == "string" ? a.label : a.name, children: Array.from({ length: s }, (p, i) => {
      const o = i + 1;
      return /* @__PURE__ */ r(
        "button",
        {
          "aria-checked": t === o,
          className: U("rpc-form-rating__item", o <= t && "rpc-form-rating__item--active"),
          disabled: c.disabled,
          onClick: () => n(o),
          role: "radio",
          type: "button",
          children: "★"
        },
        o
      );
    }) }),
    e ?? c.hint ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", e && "rpc-form-field__message--error"), children: e ?? c.hint }) : null
  ] });
}
function on({
  actions: e,
  className: a = "",
  columns: t = 2,
  defaultValues: n,
  errors: c,
  fields: s,
  onReset: p,
  onSubmit: i,
  onValuesChange: o,
  resetLabel: _ = "Reset",
  showActions: f = !0,
  submitLabel: u = "Submit",
  values: d
}) {
  const [y, N] = F(n ?? {}), b = J(() => ({ ...y, ...d }), [y, d]), I = J(() => Ya(s), [s]), x = (h, g) => {
    const S = {
      ...b,
      [h]: g
    };
    d || N(S), o == null || o(S, h, g);
  }, P = (h) => {
    const g = h.props ?? {}, S = za(b, h), C = c == null ? void 0 : c[h.name], L = g.hint, w = {
      className: g.className,
      disabled: g.disabled,
      error: C,
      helperText: L,
      inputClassName: g.inputClassName,
      label: h.label,
      name: h.name,
      placeholder: g.placeholder,
      required: g.required
    };
    if (h.render)
      return h.render({
        error: C,
        field: h,
        setValue: (v) => x(h.name, v),
        value: S,
        values: b
      });
    if (h.kind === "textarea")
      return /* @__PURE__ */ r(
        Ea,
        {
          ...w,
          maxLength: typeof g.max == "number" ? g.max : void 0,
          onChange: (v) => x(h.name, v.target.value),
          rows: g.rows,
          value: String(S ?? "")
        }
      );
    if (h.kind === "otp")
      return /* @__PURE__ */ r(Za, { error: C, field: h, onChange: (v) => x(h.name, v), value: String(S ?? "") });
    if (h.kind === "checkbox")
      return /* @__PURE__ */ r(
        Kr,
        {
          checked: !!S,
          description: g.description,
          disabled: g.disabled,
          error: C,
          label: h.label,
          name: h.name,
          onChange: (v) => x(h.name, v.target.checked),
          required: g.required
        }
      );
    if (h.kind === "switch")
      return /* @__PURE__ */ r(
        ja,
        {
          checked: !!S,
          description: g.description,
          disabled: g.disabled,
          error: C,
          label: h.label,
          name: h.name,
          onChange: (v) => x(h.name, v.target.checked),
          required: g.required
        }
      );
    if (h.kind === "radio")
      return /* @__PURE__ */ r(
        Fa,
        {
          ...w,
          onValueChange: (v) => x(h.name, v),
          options: h.options ?? [],
          value: String(S ?? "")
        }
      );
    if (h.kind === "range")
      return /* @__PURE__ */ r(Ga, { error: C, field: h, onChange: (v) => x(h.name, v), value: Number(S ?? 0) });
    if (h.kind === "rating")
      return /* @__PURE__ */ r(Xa, { error: C, field: h, onChange: (v) => x(h.name, v), value: Number(S ?? 0) });
    if (h.kind === "color")
      return /* @__PURE__ */ r(pr, { error: C, field: h, onChange: (v) => x(h.name, v), type: "color", value: String(S || "#2563eb") });
    if (h.kind === "date")
      return /* @__PURE__ */ r(
        dr,
        {
          ...w,
          maxDate: typeof g.max == "string" ? g.max : void 0,
          minDate: typeof g.min == "string" ? g.min : void 0,
          onValueChange: (v) => x(h.name, v),
          value: String(S ?? "")
        }
      );
    if (h.kind === "time")
      return /* @__PURE__ */ r(pr, { error: C, field: h, onChange: (v) => x(h.name, v), type: "time", value: String(S ?? "") });
    if (h.kind === "datetime")
      return /* @__PURE__ */ r(pr, { error: C, field: h, onChange: (v) => x(h.name, v), type: "datetime-local", value: String(S ?? "") });
    if (h.kind === "date-range") {
      const v = S && typeof S == "object" ? S : {};
      return /* @__PURE__ */ l("div", { className: U("rpc-form-field", g.className, C && "rpc-form-field--error"), children: [
        h.label ? /* @__PURE__ */ l("span", { className: "rpc-form-field__label", children: [
          h.label,
          g.required ? /* @__PURE__ */ r("span", { className: "rpc-form-field__required", children: "*" }) : null
        ] }) : null,
        /* @__PURE__ */ l("div", { className: "rpc-form-date-range", children: [
          /* @__PURE__ */ r(
            dr,
            {
              maxDate: typeof g.max == "string" ? g.max : void 0,
              minDate: typeof g.min == "string" ? g.min : void 0,
              onValueChange: (E) => x(h.name, { ...v, start: E }),
              placeholder: "Start date",
              value: v.start ?? ""
            }
          ),
          /* @__PURE__ */ r(
            dr,
            {
              maxDate: typeof g.max == "string" ? g.max : void 0,
              minDate: v.start || (typeof g.min == "string" ? g.min : void 0),
              onValueChange: (E) => x(h.name, { ...v, end: E }),
              placeholder: "End date",
              value: v.end ?? ""
            }
          )
        ] }),
        C ?? L ? /* @__PURE__ */ r("span", { className: U("rpc-form-field__message", C && "rpc-form-field__message--error"), children: C ?? L }) : null
      ] });
    }
    if (h.kind === "select")
      return g.multiple ? /* @__PURE__ */ r(
        Oa,
        {
          ...w,
          loadOptions: h.loadOptions,
          onValueChange: (v) => x(h.name, v),
          options: h.options,
          searchPlaceholder: g.searchPlaceholder,
          searchable: g.searchable,
          value: Array.isArray(S) ? S.map(String) : []
        }
      ) : /* @__PURE__ */ r(
        Ra,
        {
          ...w,
          loadOptions: h.loadOptions,
          onValueChange: (v) => x(h.name, v),
          options: h.options,
          searchPlaceholder: g.searchPlaceholder,
          searchable: g.searchable,
          value: String(S ?? "")
        }
      );
    if (h.kind === "file") {
      const v = Array.isArray(S) ? S : S instanceof File ? [S] : [];
      return /* @__PURE__ */ r(
        qa,
        {
          accept: g.accept,
          disabled: g.disabled,
          error: C,
          files: v,
          helperText: L,
          label: h.label,
          multiple: g.multiple,
          name: h.name,
          onFilesChange: (E) => x(h.name, g.multiple ? E : E[0] ?? null),
          required: g.required
        }
      );
    }
    return g.type === "number" ? /* @__PURE__ */ r(
      Aa,
      {
        ...w,
        max: typeof g.max == "number" ? g.max : void 0,
        min: typeof g.min == "number" ? g.min : void 0,
        onValueChange: (v) => x(h.name, v),
        step: g.step,
        value: typeof S == "number" || typeof S == "string" ? S : ""
      }
    ) : g.type === "password" && g.allowPasswordToggle !== !1 ? /* @__PURE__ */ r(
      Da,
      {
        ...w,
        onChange: (v) => x(h.name, v.target.value),
        showStrength: !0,
        value: String(S ?? "")
      }
    ) : g.type === "email" ? /* @__PURE__ */ r(
      Ia,
      {
        ...w,
        onChange: (v) => x(h.name, v.target.value),
        value: String(S ?? "")
      }
    ) : /* @__PURE__ */ r(
      vr,
      {
        ...w,
        onChange: (v) => x(h.name, v.target.value),
        type: g.type === "search" || g.type === "url" || g.type === "tel" ? g.type : "text",
        value: String(S ?? "")
      }
    );
  };
  return /* @__PURE__ */ l(
    "form",
    {
      className: U("rpc-form-builder", a),
      onReset: (h) => {
        h.preventDefault(), N(n ?? {}), p == null || p();
      },
      onSubmit: (h) => {
        h.preventDefault(), i == null || i(b, h);
      },
      style: { "--rpc-form-builder-columns": t },
      children: [
        I.map((h) => /* @__PURE__ */ r("div", { className: "rpc-form-builder__row", children: h.fields.map((g) => /* @__PURE__ */ r("div", { className: "rpc-form-builder__field", children: P(g) }, g.name)) }, h.id)),
        f ? /* @__PURE__ */ r("div", { className: "rpc-form-builder__actions", children: e ?? /* @__PURE__ */ l($e, { children: [
          /* @__PURE__ */ r("button", { className: "rpc-form-builder__button rpc-form-builder__button--ghost", type: "reset", children: _ }),
          /* @__PURE__ */ r("button", { className: "rpc-form-builder__button", type: "submit", children: u })
        ] }) }) : null
      ]
    }
  );
}
function dn({
  children: e,
  color: a = "default",
  variant: t = "soft",
  size: n = "md",
  className: c = "",
  ...s
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: ["rpc-chip", `rpc-chip--${a}`, `rpc-chip--${t}`, `rpc-chip--${n}`, c].filter(Boolean).join(" "),
      ...s,
      children: e
    }
  );
}
function er(...e) {
  return e.filter(Boolean).join(" ");
}
function Er(e, a) {
  return typeof e == "string" ? e : a;
}
function Fr(...e) {
  const a = /* @__PURE__ */ new Set();
  return e.forEach((t) => {
    t == null || t.forEach((n) => a.add(n));
  }), Array.from(a);
}
function Gr(e, a = /* @__PURE__ */ new Set()) {
  return e.forEach((t) => {
    var n, c;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.add(t.id), (c = t.children) != null && c.length && Gr(t.children, a);
  }), a;
}
function Xr(e, a) {
  var t;
  for (const n of e) {
    if (n.id === a)
      return n;
    if ((t = n.children) != null && t.length) {
      const c = Xr(n.children, a);
      if (c)
        return c;
    }
  }
  return null;
}
function Ja({ isOpen: e }) {
  return e ? /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ r("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ r("path", { d: "M3 10h18", opacity: ".55" })
  ] }) : /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ r("path", { d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }),
    /* @__PURE__ */ r("path", { d: "M3 9.5h18", opacity: ".55" })
  ] });
}
function Qa() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
    /* @__PURE__ */ r("path", { d: "M7 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" }),
    /* @__PURE__ */ r("path", { d: "M13 3.5V8h4.5" }),
    /* @__PURE__ */ r("path", { d: "M8 12.5h8M8 16h8", opacity: ".55" })
  ] });
}
function et({ isOpen: e }) {
  return /* @__PURE__ */ r(
    "svg",
    {
      "aria-hidden": "true",
      className: er("rpc-file-tree__chevron-icon", e && "rpc-file-tree__chevron-icon--open"),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ r("path", { d: "m8 10 4 4 4-4" })
    }
  );
}
function Jr({
  nodes: e,
  depth: a,
  selectedId: t,
  openSet: n,
  showLines: c,
  density: s,
  indent: p,
  onToggle: i,
  onSelect: o,
  onNodeClick: _,
  renderLabel: f,
  renderIcon: u
}) {
  return /* @__PURE__ */ r("ul", { className: er("rpc-file-tree__list", c && "rpc-file-tree__list--lines"), role: "group", children: e.map((d) => {
    var w;
    const y = !!((w = d.children) != null && w.length), N = y && n.has(d.id), b = t === d.id, x = {
      depth: a,
      hasChildren: y,
      isOpen: N,
      isSelected: b,
      isLeaf: !y
    }, P = f ? f(d, x) : d.label, h = u ? u(d, x) : d.icon ?? (y ? /* @__PURE__ */ r(Ja, { isOpen: N }) : /* @__PURE__ */ r(Qa, {})), g = er(
      "rpc-file-tree__row",
      `rpc-file-tree__row--${s}`,
      y && "rpc-file-tree__row--branch",
      b && "rpc-file-tree__row--selected",
      d.disabled && "rpc-file-tree__row--disabled"
    ), S = /* @__PURE__ */ l($e, { children: [
      /* @__PURE__ */ r("span", { className: "rpc-file-tree__icon", "aria-hidden": "true", children: h }),
      /* @__PURE__ */ l("span", { className: "rpc-file-tree__text", children: [
        /* @__PURE__ */ r("span", { className: "rpc-file-tree__label", children: P }),
        d.description ? /* @__PURE__ */ r("span", { className: "rpc-file-tree__description", children: d.description }) : null
      ] })
    ] }), C = {
      "aria-disabled": d.disabled || void 0,
      "aria-expanded": y && N || void 0,
      "aria-level": a + 1,
      "aria-selected": b || void 0,
      className: g,
      role: "treeitem",
      onClick: () => {
        var v;
        d.disabled || (o(d), _ == null || _(d), (v = d.onClick) == null || v.call(d, d));
      }
    }, L = d.href ? /* @__PURE__ */ r(
      "a",
      {
        ...C,
        href: d.disabled ? void 0 : d.href,
        rel: d.rel,
        target: d.target,
        children: S
      }
    ) : /* @__PURE__ */ r("button", { ...C, disabled: d.disabled, type: "button", children: S });
    return /* @__PURE__ */ l("li", { className: "rpc-file-tree__item", role: "none", children: [
      /* @__PURE__ */ l("div", { className: "rpc-file-tree__row-wrap", style: { paddingLeft: a * p }, children: [
        y ? /* @__PURE__ */ r(
          "button",
          {
            "aria-expanded": N,
            "aria-label": N ? `Collapse ${Er(d.label, d.id)}` : `Expand ${Er(d.label, d.id)}`,
            className: "rpc-file-tree__toggle",
            disabled: d.disabled,
            onClick: () => i(d),
            type: "button",
            children: /* @__PURE__ */ r(et, { isOpen: N })
          }
        ) : /* @__PURE__ */ r("span", { className: "rpc-file-tree__toggle rpc-file-tree__toggle--spacer", "aria-hidden": "true" }),
        L
      ] }),
      y && N ? /* @__PURE__ */ r("div", { className: "rpc-file-tree__children", children: /* @__PURE__ */ r(
        Jr,
        {
          density: s,
          indent: p,
          nodes: d.children ?? [],
          onNodeClick: _,
          onSelect: o,
          onToggle: i,
          openSet: n,
          renderIcon: u,
          renderLabel: f,
          selectedId: t,
          showLines: c,
          depth: a + 1
        }
      ) }) : null
    ] }, d.id);
  }) });
}
function pn({
  nodes: e,
  title: a,
  description: t,
  ariaLabel: n,
  defaultOpenIds: c,
  openIds: s,
  onOpenChange: p,
  defaultSelectedId: i = null,
  selectedId: o,
  onSelectedChange: _,
  onNodeClick: f,
  showLines: u = !0,
  density: d = "comfortable",
  indent: y = 20,
  renderLabel: N,
  renderIcon: b,
  className: I = "",
  ...x
}) {
  const P = J(
    () => Fr(c, Array.from(Gr(e))),
    [c, e]
  ), [h, g] = F(P), [S, C] = F(i), L = s ?? h, w = o ?? S, v = J(() => new Set(L), [L]), E = !!(a || t), O = (B) => {
    s === void 0 && g(B), p == null || p(B);
  }, H = (B) => {
    o === void 0 && C(B), _ == null || _(B, B ? Xr(e, B) : null);
  }, W = (B) => {
    var K;
    if (!((K = B.children) != null && K.length) || B.disabled)
      return;
    const q = v.has(B.id) ? L.filter(($) => $ !== B.id) : Fr(L, [B.id]);
    O(q);
  }, M = (B) => {
    B.disabled || H(B.id);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      ...x,
      "aria-label": n ?? (typeof a == "string" ? a : "File tree"),
      className: er("rpc-file-tree", d === "compact" && "rpc-file-tree--compact", !u && "rpc-file-tree--no-lines", I),
      role: "tree",
      children: [
        E ? /* @__PURE__ */ l("div", { className: "rpc-file-tree__header", children: [
          a ? /* @__PURE__ */ r("h3", { className: "rpc-file-tree__title", children: a }) : null,
          t ? /* @__PURE__ */ r("p", { className: "rpc-file-tree__description-text", children: t }) : null
        ] }) : null,
        /* @__PURE__ */ r(
          Jr,
          {
            density: d,
            indent: y,
            nodes: e,
            onNodeClick: f,
            onSelect: M,
            onToggle: W,
            openSet: v,
            renderIcon: b,
            renderLabel: N,
            selectedId: w,
            showLines: u,
            depth: 0
          }
        )
      ]
    }
  );
}
function jr(...e) {
  return e.filter(Boolean).join(" ");
}
function rt() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ r("path", { d: "M12 5v14M5 12h14", strokeLinecap: "round" }) });
}
function at({ label: e }) {
  const a = typeof e == "string" && e.trim() ? e.trim().slice(0, 1).toUpperCase() : "•";
  return /* @__PURE__ */ r("span", { "aria-hidden": "true", className: "rpc-bottom-nav__fallback-icon", children: a });
}
function tt(e) {
  return typeof e.name == "string" && e.name.trim() ? e.name.trim() : typeof e.ariaLabel == "string" && e.ariaLabel.trim() ? e.ariaLabel.trim() : `Navigation item ${e.id}`;
}
function un({
  items: e,
  activeId: a,
  defaultActiveId: t = null,
  onActiveChange: n,
  ariaLabel: c = "Bottom navigation",
  showLabels: s = !0,
  placement: p = "inline",
  maxWidth: i = "720px",
  background: o = "var(--rpc-color-surface)",
  borderColor: _ = "var(--rpc-color-border)",
  textColor: f = "var(--rpc-color-text)",
  mutedColor: u = "var(--rpc-color-muted)",
  activeColor: d = "var(--rpc-color-primary)",
  activeTextColor: y = "#ffffff",
  className: N = "",
  style: b,
  ...I
}) {
  const x = J(
    () => {
      var w;
      return a ?? t ?? ((w = e.find((v) => v.active)) == null ? void 0 : w.id) ?? null;
    },
    [a, t, e]
  ), [P, h] = F(x), g = a !== void 0, S = g ? a ?? null : P;
  X(() => {
    var w;
    if (!g && S && !e.some((v) => v.id === S)) {
      const v = t ?? ((w = e.find((E) => E.active)) == null ? void 0 : w.id) ?? null;
      h(v);
    }
  }, [S, t, g, e]);
  const C = (w) => {
    var v;
    g || h(w.id), n == null || n(w.id, w), (v = w.onClick) == null || v.call(w);
  }, L = {
    "--rpc-bottom-nav-active": d,
    "--rpc-bottom-nav-active-text": y,
    "--rpc-bottom-nav-bg": o,
    "--rpc-bottom-nav-border": _,
    "--rpc-bottom-nav-max-width": i,
    "--rpc-bottom-nav-muted": u,
    "--rpc-bottom-nav-text": f,
    ...b
  };
  return /* @__PURE__ */ r(
    "nav",
    {
      "aria-label": c,
      className: jr("rpc-bottom-nav", p === "fixed" && "rpc-bottom-nav--fixed", N),
      style: L,
      ...I,
      children: /* @__PURE__ */ r("ul", { className: "rpc-bottom-nav__list", children: e.map((w) => {
        const v = S === w.id, E = tt(w), O = jr(
          "rpc-bottom-nav__item",
          v && "rpc-bottom-nav__item--active",
          w.disabled && "rpc-bottom-nav__item--disabled"
        ), H = v ? w.activeIcon ?? /* @__PURE__ */ r(rt, {}) : w.icon ?? /* @__PURE__ */ r(at, { label: w.name }), W = w.ariaLabel ?? E, M = s && !v;
        if (w.href || w.url) {
          const B = w.href ?? w.url ?? "#";
          return /* @__PURE__ */ r("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ l(
            "a",
            {
              "aria-current": v ? "page" : void 0,
              "aria-label": W,
              className: O,
              href: w.disabled ? void 0 : B,
              onClick: (q) => {
                if (w.disabled) {
                  q.preventDefault();
                  return;
                }
                C(w);
              },
              children: [
                /* @__PURE__ */ r("span", { className: "rpc-bottom-nav__icon", children: H }),
                M ? /* @__PURE__ */ r("span", { className: "rpc-bottom-nav__label", children: w.name }) : /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: E })
              ]
            }
          ) }, w.id);
        }
        return /* @__PURE__ */ r("li", { className: "rpc-bottom-nav__item-wrap", children: /* @__PURE__ */ l(
          "button",
          {
            "aria-current": v ? "page" : void 0,
            "aria-label": W,
            className: O,
            disabled: w.disabled,
            onClick: () => C(w),
            type: "button",
            children: [
              /* @__PURE__ */ r("span", { className: "rpc-bottom-nav__icon", children: H }),
              M ? /* @__PURE__ */ r("span", { className: "rpc-bottom-nav__label", children: w.name }) : /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: E })
            ]
          }
        ) }, w.id);
      }) })
    }
  );
}
function Nr(...e) {
  return e.filter(Boolean).join(" ");
}
const Qr = Hr(null);
function yr() {
  return Wr(Qr);
}
function nt() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function ct() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ r("path", { d: "M15 5v14" })
  ] });
}
function lt({
  aside: e,
  asideOpen: a,
  asideWidth: t = "320px",
  children: n,
  className: c = "",
  defaultAsideOpen: s = !1,
  defaultSidebarOpen: p = !0,
  navbar: i,
  navbarHeight: o = "64px",
  onAsideOpenChange: _,
  onSidebarOpenChange: f,
  sidebar: u,
  sidebarOpen: d,
  sidebarWidth: y = "280px",
  style: N,
  ...b
}) {
  const [I, x] = F(p), [P, h] = F(s), g = d !== void 0, S = a !== void 0, C = g ? !!d : I, L = S ? !!a : P, w = (H) => {
    g || x(H), f == null || f(H);
  }, v = (H) => {
    S || h(H), _ == null || _(H);
  }, E = J(
    () => ({
      asideOpen: L,
      closeAside: () => v(!1),
      closeSidebar: () => w(!1),
      openAside: () => v(!0),
      openSidebar: () => w(!0),
      sidebarOpen: C,
      toggleAside: () => v(!L),
      toggleSidebar: () => w(!C)
    }),
    [L, C]
  ), O = {
    "--rpc-app-layout-aside-width": t,
    "--rpc-app-layout-aside-track": e && L ? t : "0px",
    "--rpc-app-layout-navbar-height": o,
    "--rpc-app-layout-sidebar-track": u && C ? y : "0px",
    "--rpc-app-layout-sidebar-width": y,
    ...N
  };
  return /* @__PURE__ */ r(Qr.Provider, { value: E, children: /* @__PURE__ */ l(
    "div",
    {
      className: Nr(
        "rpc-app-layout",
        C && "rpc-app-layout--sidebar-open",
        L && "rpc-app-layout--aside-open",
        c
      ),
      style: O,
      ...b,
      children: [
        /* @__PURE__ */ l("div", { className: "rpc-app-layout__body", children: [
          u ? /* @__PURE__ */ r("aside", { className: "rpc-app-layout__sidebar", "aria-label": "Application sidebar", children: u }) : null,
          /* @__PURE__ */ l("div", { className: "rpc-app-layout__workspace", children: [
            i ? /* @__PURE__ */ r("div", { className: "rpc-app-layout__navbar", children: i }) : null,
            /* @__PURE__ */ r("main", { className: "rpc-app-layout__main", children: n })
          ] }),
          e ? /* @__PURE__ */ r("aside", { className: "rpc-app-layout__aside", "aria-label": "Application details panel", children: e }) : null
        ] }),
        /* @__PURE__ */ r("button", { className: "rpc-app-layout__overlay", onClick: () => w(!1), type: "button", "aria-label": "Close sidebar" }),
        /* @__PURE__ */ r("button", { className: "rpc-app-layout__aside-overlay", onClick: () => v(!1), type: "button", "aria-label": "Close aside panel" })
      ]
    }
  ) });
}
function st({ className: e = "", icon: a, label: t = "Toggle menu", onClick: n, ...c }) {
  const s = yr();
  return /* @__PURE__ */ r(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: Nr("rpc-app-layout__trigger", e),
      onClick: (p) => {
        s == null || s.toggleSidebar(), n == null || n(p);
      },
      type: "button",
      ...c,
      children: a ?? /* @__PURE__ */ r(nt, {})
    }
  );
}
function it({ className: e = "", icon: a, label: t = "Toggle details panel", onClick: n, ...c }) {
  const s = yr();
  return /* @__PURE__ */ r(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.asideOpen,
      className: Nr("rpc-app-layout__trigger", e),
      onClick: (p) => {
        s == null || s.toggleAside(), n == null || n(p);
      },
      type: "button",
      ...c,
      children: a ?? /* @__PURE__ */ r(ct, {})
    }
  );
}
const hn = Object.assign(lt, {
  AsideTrigger: it,
  MenuToggle: st
});
function rr(...e) {
  return e.filter(Boolean).join(" ");
}
function ot({ children: e, className: a = "", maxWidth: t = "xl", sticky: n = !1, ...c }) {
  return /* @__PURE__ */ r("nav", { className: rr("rpc-navbar", `rpc-navbar--${t}`, n && "rpc-navbar--sticky", a), ...c, children: e });
}
function dt({ children: e, className: a = "", ...t }) {
  return /* @__PURE__ */ r("div", { className: rr("rpc-navbar__header", a), ...t, children: e });
}
function pt({ children: e, className: a = "", ...t }) {
  return /* @__PURE__ */ r("div", { className: rr("rpc-navbar__brand", a), ...t, children: e });
}
function ut({ align: e = "start", children: a, className: t = "", ...n }) {
  return /* @__PURE__ */ r("div", { className: rr("rpc-navbar__section", `rpc-navbar__section--${e}`, t), ...n, children: a });
}
function ht() {
  return /* @__PURE__ */ r("span", { className: "rpc-navbar__spacer", "aria-hidden": "true" });
}
const mn = Object.assign(ot, {
  Brand: pt,
  Header: dt,
  Section: ut,
  Spacer: ht
});
function ge(...e) {
  return e.filter(Boolean).join(" ");
}
function Rr(e) {
  return Array.from(new Set(e));
}
function ea(e, a = []) {
  return e.forEach((t) => {
    var n, c;
    t.defaultOpen && ((n = t.children) != null && n.length) && a.push(t.id), (c = t.children) != null && c.length && ea(t.children, a);
  }), a;
}
function ra(e, a) {
  var t;
  for (const n of e) {
    if (n.id === a) return n;
    if ((t = n.children) != null && t.length) {
      const c = ra(n.children, a);
      if (c) return c;
    }
  }
  return null;
}
function Or(e) {
  return typeof e.label == "string" && e.label.trim() ? e.label.trim() : e.ariaLabel ? e.ariaLabel : `Sidebar item ${e.id}`;
}
function aa(e, a) {
  var t;
  return !a || !((t = e.children) != null && t.length) ? !1 : e.children.some((n) => n.id === a || aa(n, a));
}
function mt({ isOpen: e }) {
  return /* @__PURE__ */ r(
    "svg",
    {
      "aria-hidden": "true",
      className: ge("rpc-sidebar__chevron", e && "rpc-sidebar__chevron--open"),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ r("path", { d: "m9 6 6 6-6 6" })
    }
  );
}
function _t() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
}
function mr({ isCollapsed: e }) {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ r("path", { d: "M9 5v14" }),
    /* @__PURE__ */ r("path", { d: e ? "m14 9 3 3-3 3" : "m17 9-3 3 3 3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ft({ className: e = "", icon: a, label: t = "Toggle sidebar", onClick: n, ...c }) {
  const s = yr();
  return /* @__PURE__ */ r(
    "button",
    {
      "aria-label": t,
      "aria-pressed": s == null ? void 0 : s.sidebarOpen,
      className: ge("rpc-sidebar-trigger", e),
      onClick: (p) => {
        s == null || s.toggleSidebar(), n == null || n(p);
      },
      type: "button",
      ...c,
      children: a ?? /* @__PURE__ */ r(mr, { isCollapsed: !(s != null && s.sidebarOpen) })
    }
  );
}
function gt({ children: e, className: a = "", ...t }) {
  return /* @__PURE__ */ r("div", { className: ge("rpc-sidebar-mobile", a), ...t, children: e });
}
function bt(e, a, t) {
  const n = /* @__PURE__ */ l($e, { children: [
    a ? /* @__PURE__ */ r("span", { className: "rpc-sidebar__brand-icon", children: a }) : null,
    e ? /* @__PURE__ */ r("span", { className: "rpc-sidebar__brand-text", children: e }) : null
  ] });
  return t ? /* @__PURE__ */ r("a", { className: "rpc-sidebar__brand", href: t, children: n }) : /* @__PURE__ */ r("div", { className: "rpc-sidebar__brand", children: n });
}
function _r({
  items: e,
  activeId: a,
  openSet: t,
  depth: n,
  isCollapsed: c,
  onActivate: s,
  onToggle: p
}) {
  return /* @__PURE__ */ r(
    "ul",
    {
      className: ge("rpc-sidebar__list", n > 0 && "rpc-sidebar__list--nested"),
      role: n === 0 ? "list" : "group",
      children: e.map((i) => {
        var y;
        const o = !!((y = i.children) != null && y.length), _ = o && t.has(i.id), f = a ? a === i.id || aa(i, a) : !!i.active, u = ge(
          "rpc-sidebar__item",
          f && "rpc-sidebar__item--active",
          i.disabled && "rpc-sidebar__item--disabled",
          o && "rpc-sidebar__item--branch"
        ), d = /* @__PURE__ */ l($e, { children: [
          i.icon ? /* @__PURE__ */ r("span", { className: "rpc-sidebar__item-icon", children: i.icon }) : null,
          /* @__PURE__ */ r("span", { className: "rpc-sidebar__item-label", children: i.label }),
          i.badge ? /* @__PURE__ */ r("span", { className: "rpc-sidebar__badge", children: i.badge }) : null,
          o ? /* @__PURE__ */ r(mt, { isOpen: _ }) : null
        ] });
        return /* @__PURE__ */ l(
          "li",
          {
            className: ge(
              "rpc-sidebar__list-item",
              o && "rpc-sidebar__list-item--branch",
              _ && "rpc-sidebar__list-item--open",
              f && "rpc-sidebar__list-item--active"
            ),
            children: [
              i.href || i.url ? /* @__PURE__ */ r(
                "a",
                {
                  "aria-current": f ? "page" : void 0,
                  "aria-disabled": i.disabled || void 0,
                  "aria-expanded": o ? _ : void 0,
                  "aria-label": i.ariaLabel ?? Or(i),
                  className: u,
                  href: i.disabled ? void 0 : i.href ?? i.url,
                  onClick: (N) => {
                    if (i.disabled) {
                      N.preventDefault();
                      return;
                    }
                    o && p(i), s(i);
                  },
                  children: d
                }
              ) : /* @__PURE__ */ r(
                "button",
                {
                  "aria-current": f ? "page" : void 0,
                  "aria-expanded": o ? _ : void 0,
                  "aria-label": i.ariaLabel ?? Or(i),
                  className: u,
                  disabled: i.disabled,
                  onClick: () => {
                    o && p(i), s(i);
                  },
                  type: "button",
                  children: d
                }
              ),
              o && (_ || c) ? /* @__PURE__ */ r(
                _r,
                {
                  activeId: a,
                  depth: n + 1,
                  isCollapsed: c,
                  items: i.children ?? [],
                  onActivate: s,
                  onToggle: p,
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
function vt({
  brand: e = "ava-ui",
  brandIcon: a,
  brandHref: t,
  items: n,
  footerItems: c = [],
  activeId: s,
  defaultActiveId: p = null,
  onActiveChange: i,
  openIds: o,
  defaultOpenIds: _ = [],
  onOpenChange: f,
  header: u,
  headerIcon: d,
  children: y,
  ariaLabel: N = "Sidebar navigation",
  mobileLabel: b = "Open sidebar",
  variant: I = "shell",
  collapsed: x,
  defaultCollapsed: P = !1,
  onCollapsedChange: h,
  showCollapseToggle: g = !0,
  collapseLabel: S = "Hide sidebar",
  expandLabel: C = "Show sidebar",
  width: L = "320px",
  collapsedWidth: w = "72px",
  height: v = "auto",
  minHeight: E = "720px",
  background: O = "var(--rpc-color-background)",
  surfaceColor: H = "var(--rpc-color-surface)",
  textColor: W = "var(--rpc-color-text)",
  mutedColor: M = "var(--rpc-color-muted)",
  borderColor: B = "var(--rpc-color-border)",
  activeColor: q = "var(--rpc-color-secondary)",
  activeTextColor: K = "var(--rpc-color-text)",
  className: $ = "",
  style: D,
  ...Z
}) {
  const k = J(() => [...n, ...c], [c, n]), V = J(
    () => {
      var Y;
      return s ?? p ?? ((Y = k.find((he) => he.active)) == null ? void 0 : Y.id) ?? null;
    },
    [s, p, k]
  ), R = J(
    () => Rr([..._, ...ea(k)]),
    [_, k]
  ), [Q, re] = F(V), [ce, oe] = F(R), [Oe, ne] = F(!1), [Te, le] = F(P), Ne = s !== void 0, Ve = o !== void 0, Ee = x !== void 0, ye = Ne ? s ?? null : Q, we = Ve ? o ?? [] : ce, ae = Ee ? !!x : Te, Me = J(() => new Set(we), [we]);
  X(() => {
    !Ne && ye && !ra(k, ye) && re(p ?? null);
  }, [ye, p, Ne, k]);
  const He = (Y) => {
    Ve || oe(Y), f == null || f(Y);
  }, Fe = (Y) => {
    const he = Me.has(Y.id) ? we.filter((ar) => ar !== Y.id) : [...we, Y.id];
    He(Rr(he));
  }, We = (Y) => {
    Ee || le(Y), h == null || h(Y);
  }, Ue = (Y) => {
    var he;
    Ne || re(Y.id), i == null || i(Y.id, Y), (he = Y.onClick) == null || he.call(Y, Y), ne(!1);
  }, ue = {
    "--rpc-sidebar-active": q,
    "--rpc-sidebar-active-text": K,
    "--rpc-sidebar-bg": O,
    "--rpc-sidebar-border": B,
    "--rpc-sidebar-muted": M,
    "--rpc-sidebar-surface": H,
    "--rpc-sidebar-text": W,
    "--rpc-sidebar-width": L,
    "--rpc-sidebar-collapsed-width": w,
    "--rpc-sidebar-height": v,
    "--rpc-sidebar-min-height": E,
    ...D
  }, qe = /* @__PURE__ */ l("aside", { className: "rpc-sidebar__panel", "aria-label": N, children: [
    /* @__PURE__ */ l("div", { className: "rpc-sidebar__top", children: [
      /* @__PURE__ */ l("div", { className: "rpc-sidebar__panel-header", children: [
        bt(e, a, t),
        g ? /* @__PURE__ */ r(
          "button",
          {
            "aria-label": ae ? C : S,
            "aria-pressed": ae,
            className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--panel",
            onClick: () => We(!ae),
            type: "button",
            children: /* @__PURE__ */ r(mr, { isCollapsed: ae })
          }
        ) : null
      ] }),
      /* @__PURE__ */ r("nav", { className: "rpc-sidebar__nav", "aria-label": N, children: /* @__PURE__ */ r(
        _r,
        {
          activeId: ye,
          depth: 0,
          isCollapsed: ae,
          items: n,
          onActivate: Ue,
          onToggle: Fe,
          openSet: Me
        }
      ) })
    ] }),
    c.length ? /* @__PURE__ */ r("nav", { className: "rpc-sidebar__footer", "aria-label": `${N} footer`, children: /* @__PURE__ */ r(
      _r,
      {
        activeId: ye,
        depth: 0,
        isCollapsed: ae,
        items: c,
        onActivate: Ue,
        onToggle: Fe,
        openSet: Me
      }
    ) }) : null
  ] });
  return I === "navigation" ? /* @__PURE__ */ r(
    "div",
    {
      className: ge(
        "rpc-sidebar",
        "rpc-sidebar--navigation",
        ae && "rpc-sidebar--collapsed",
        $
      ),
      style: ue,
      ...Z,
      children: qe
    }
  ) : /* @__PURE__ */ l(
    "div",
    {
      className: ge(
        "rpc-sidebar",
        Oe && "rpc-sidebar--mobile-open",
        ae && "rpc-sidebar--collapsed",
        $
      ),
      style: ue,
      ...Z,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: "rpc-sidebar__mobile-overlay",
            onClick: () => ne(!1),
            role: "presentation"
          }
        ),
        qe,
        /* @__PURE__ */ l("main", { className: "rpc-sidebar__content", children: [
          /* @__PURE__ */ l("header", { className: "rpc-sidebar__content-header", children: [
            /* @__PURE__ */ l(
              "button",
              {
                className: "rpc-sidebar__mobile-trigger",
                onClick: () => ne(!0),
                type: "button",
                children: [
                  /* @__PURE__ */ r(_t, {}),
                  /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: b })
                ]
              }
            ),
            g ? /* @__PURE__ */ r(
              "button",
              {
                "aria-label": ae ? C : S,
                "aria-pressed": ae,
                className: "rpc-sidebar__collapse-trigger rpc-sidebar__collapse-trigger--content",
                onClick: () => We(!ae),
                type: "button",
                children: /* @__PURE__ */ r(mr, { isCollapsed: ae })
              }
            ) : null,
            d ? /* @__PURE__ */ r("span", { className: "rpc-sidebar__content-icon", children: d }) : null,
            u ? /* @__PURE__ */ r("div", { className: "rpc-sidebar__content-title", children: u }) : null
          ] }),
          /* @__PURE__ */ r("div", { className: "rpc-sidebar__content-body", children: y })
        ] })
      ]
    }
  );
}
const _n = Object.assign(vt, {
  Mobile: gt,
  Trigger: ft
});
function Qe(...e) {
  return e.filter(Boolean).join(" ");
}
function Nt() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ r("path", { d: "m20 20-3.5-3.5" })
  ] });
}
function yt() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
    /* @__PURE__ */ r("path", { d: "m10 17 5-5-5-5" }),
    /* @__PURE__ */ r("path", { d: "M15 12H3" })
  ] });
}
function wt() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ r("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ r("path", { d: "M19 8v6" }),
    /* @__PURE__ */ r("path", { d: "M22 11h-6" })
  ] });
}
function kt() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "m6 9 6 6 6-6" }) });
}
function xt(e) {
  const a = /* @__PURE__ */ l($e, { children: [
    e.icon ? /* @__PURE__ */ r("span", { className: "rpc-header__action-icon", children: e.icon }) : null,
    /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: e.label })
  ] });
  return e.href && !e.disabled ? /* @__PURE__ */ r("a", { "aria-label": e.label, className: "rpc-header__icon-action", href: e.href, children: a }, e.id) : /* @__PURE__ */ r(
    "button",
    {
      "aria-label": e.label,
      className: "rpc-header__icon-action",
      disabled: e.disabled,
      onClick: e.onClick,
      type: "button",
      children: a
    },
    e.id
  );
}
function $t(e) {
  const a = Qe("rpc-header__profile-menu-item", e.danger && "rpc-header__profile-menu-item--danger");
  return e.href && !e.disabled ? /* @__PURE__ */ r("a", { className: a, href: e.href, children: e.label }, e.id) : /* @__PURE__ */ r("button", { className: a, disabled: e.disabled, onClick: e.onClick, type: "button", children: e.label }, e.id);
}
function fn({
  brand: e = "ava-ui",
  brandHref: a,
  navItems: t = [],
  activeNavId: n,
  search: c = !1,
  actions: s = [],
  isAuthenticated: p = !1,
  loginLabel: i = "Login",
  registerLabel: o = "Register",
  onLogin: _,
  onRegister: f,
  profile: u,
  profileMenuItems: d = [],
  profileMenuLabel: y = "Open profile menu",
  onLogout: N,
  logoutLabel: b = "Logout",
  maxWidth: I = "1200px",
  height: x = "72px",
  background: P = "var(--rpc-color-surface)",
  textColor: h = "var(--rpc-color-text)",
  mutedColor: g = "var(--rpc-color-muted)",
  accentColor: S = "var(--rpc-color-primary)",
  borderColor: C = "var(--rpc-color-border)",
  className: L = "",
  style: w,
  ...v
}) {
  const [E, O] = F(!1), [H, W] = F(!1), [M, B] = F(c && c.defaultValue ? c.defaultValue : ""), q = pe(null), K = !!(c && c.value !== void 0), $ = c ? K ? c.value ?? "" : M : "", D = {
    "--rpc-header-accent": S,
    "--rpc-header-bg": P,
    "--rpc-header-border": C,
    "--rpc-header-height": x,
    "--rpc-header-max-width": I,
    "--rpc-header-muted": g,
    "--rpc-header-text": h,
    ...w
  };
  X(() => {
    const R = (re) => {
      q.current && !q.current.contains(re.target) && W(!1);
    }, Q = (re) => {
      re.key === "Escape" && (O(!1), W(!1));
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", Q), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", Q);
    };
  }, []);
  const Z = (R) => {
    var Q;
    K || B(R), c && ((Q = c.onChange) == null || Q.call(c, R));
  }, k = (R) => {
    var Q;
    R.preventDefault(), c && ((Q = c.onSubmit) == null || Q.call(c, $));
  }, V = a ? /* @__PURE__ */ r("a", { className: "rpc-header__brand", href: a, children: e }) : /* @__PURE__ */ r("div", { className: "rpc-header__brand", children: e });
  return /* @__PURE__ */ r("header", { className: Qe("rpc-header", L), style: D, ...v, children: /* @__PURE__ */ l("div", { className: "rpc-header__inner", children: [
    V,
    /* @__PURE__ */ l(
      "button",
      {
        "aria-expanded": E,
        "aria-label": "Toggle navigation",
        className: "rpc-header__menu-toggle",
        onClick: () => O((R) => !R),
        type: "button",
        children: [
          /* @__PURE__ */ r("span", {}),
          /* @__PURE__ */ r("span", {}),
          /* @__PURE__ */ r("span", {})
        ]
      }
    ),
    /* @__PURE__ */ l("div", { className: Qe("rpc-header__content", E && "rpc-header__content--open"), children: [
      t.length ? /* @__PURE__ */ r("nav", { className: "rpc-header__nav", "aria-label": "Primary navigation", children: t.map((R) => {
        const Q = R.active ?? n === R.id, re = Qe("rpc-header__nav-link", Q && "rpc-header__nav-link--active");
        return R.href && !R.disabled ? /* @__PURE__ */ r("a", { className: re, href: R.href, onClick: R.onClick, children: R.label }, R.id) : /* @__PURE__ */ r("button", { className: re, disabled: R.disabled, onClick: R.onClick, type: "button", children: R.label }, R.id);
      }) }) : null,
      /* @__PURE__ */ l("div", { className: "rpc-header__right", children: [
        c ? /* @__PURE__ */ l("form", { className: "rpc-header__search", onSubmit: k, role: "search", children: [
          /* @__PURE__ */ r("label", { className: "rpc-sr-only", htmlFor: "rpc-header-search", children: c.label ?? "Search" }),
          /* @__PURE__ */ r(Nt, {}),
          /* @__PURE__ */ r(
            "input",
            {
              id: "rpc-header-search",
              onChange: (R) => Z(R.target.value),
              placeholder: c.placeholder ?? "Cari...",
              type: "search",
              value: $
            }
          )
        ] }) : null,
        s.length ? /* @__PURE__ */ r("div", { className: "rpc-header__actions", children: s.map(xt) }) : null,
        p ? /* @__PURE__ */ l("div", { className: "rpc-header__profile", ref: q, children: [
          /* @__PURE__ */ l(
            "button",
            {
              "aria-expanded": H,
              "aria-label": y,
              className: "rpc-header__profile-trigger",
              onClick: () => W((R) => !R),
              type: "button",
              children: [
                /* @__PURE__ */ r("span", { className: "rpc-header__avatar", children: u != null && u.avatarSrc ? /* @__PURE__ */ r("img", { alt: u.avatarAlt ?? "", src: u.avatarSrc }) : (u == null ? void 0 : u.avatar) ?? "A" }),
                /* @__PURE__ */ r("span", { className: "rpc-header__profile-name", children: (u == null ? void 0 : u.name) ?? "Profile" }),
                /* @__PURE__ */ r(kt, {})
              ]
            }
          ),
          H ? /* @__PURE__ */ l("div", { className: "rpc-header__profile-menu", children: [
            u != null && u.email ? /* @__PURE__ */ r("div", { className: "rpc-header__profile-email", children: u.email }) : null,
            d.map($t),
            N ? /* @__PURE__ */ r("button", { className: "rpc-header__profile-menu-item rpc-header__profile-menu-item--danger", onClick: N, type: "button", children: b }) : null
          ] }) : null
        ] }) : /* @__PURE__ */ l("div", { className: "rpc-header__auth", children: [
          /* @__PURE__ */ l("button", { className: "rpc-header__auth-button rpc-header__auth-button--login", onClick: _, type: "button", children: [
            /* @__PURE__ */ r(yt, {}),
            /* @__PURE__ */ r("span", { children: i })
          ] }),
          /* @__PURE__ */ l("button", { className: "rpc-header__auth-button rpc-header__auth-button--register", onClick: f, type: "button", children: [
            /* @__PURE__ */ r(wt, {}),
            /* @__PURE__ */ r("span", { children: o })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Ge(...e) {
  return e.filter(Boolean).join(" ");
}
function fr(e, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(e, a - 1));
}
function St(e, a, t) {
  return a <= 0 ? 0 : t ? (e + a) % a : fr(e, a);
}
function gn({
  items: e,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  loop: c = !0,
  autoPlay: s = !1,
  autoPlayInterval: p = 4e3,
  pauseOnHover: i = !0,
  showArrows: o = !0,
  showDots: _ = !0,
  showThumbnails: f = !0,
  aspectRatio: u = "1 / 1",
  ariaLabel: d = "Carousel",
  className: y = "",
  ...N
}) {
  const [b, I] = F(() => fr(t, e.length)), [x, P] = F(!1), h = pe(null), g = e.length, S = a !== void 0, C = fr(S ? a : b, g), L = e[C], w = (M) => {
    if (g === 0)
      return;
    const B = St(M, g, c);
    S || I(B), n == null || n(B, e[B]);
  }, v = () => w(C - 1), E = () => w(C + 1);
  X(() => {
    if (!s || g <= 1 || i && x)
      return;
    const M = window.setInterval(() => {
      w(C + 1);
    }, p);
    return () => window.clearInterval(M);
  }, [s, p, C, x, i, g]);
  const O = (M) => {
    M.key === "ArrowLeft" && (M.preventDefault(), v()), M.key === "ArrowRight" && (M.preventDefault(), E());
  }, H = (M) => {
    h.current = M.clientX;
  }, W = (M) => {
    if (h.current === null)
      return;
    const B = M.clientX - h.current;
    h.current = null, !(Math.abs(B) < 48) && (B > 0 ? v() : E());
  };
  return g === 0 ? /* @__PURE__ */ r("div", { className: Ge("rpc-carousel", "rpc-carousel--empty", y), ...N, children: /* @__PURE__ */ r("div", { className: "rpc-carousel__empty", children: "No carousel items." }) }) : /* @__PURE__ */ l(
    "div",
    {
      className: Ge("rpc-carousel", y),
      onMouseEnter: () => i && P(!0),
      onMouseLeave: () => i && P(!1),
      role: "region",
      "aria-label": d,
      "aria-roledescription": "carousel",
      ...N,
      children: [
        /* @__PURE__ */ l(
          "div",
          {
            className: "rpc-carousel__viewport",
            onKeyDown: O,
            onPointerDown: H,
            onPointerUp: W,
            style: { "--rpc-carousel-aspect-ratio": u },
            tabIndex: 0,
            children: [
              /* @__PURE__ */ r("div", { className: "rpc-carousel__track", style: { transform: `translateX(-${C * 100}%)` }, children: e.map((M, B) => /* @__PURE__ */ r(
                "div",
                {
                  "aria-hidden": B !== C,
                  "aria-label": `${B + 1} of ${g}`,
                  className: "rpc-carousel__slide",
                  role: "group",
                  children: M.content ?? /* @__PURE__ */ l("figure", { className: "rpc-carousel__figure", children: [
                    M.imageSrc ? /* @__PURE__ */ r("img", { className: "rpc-carousel__image", src: M.imageSrc, alt: M.imageAlt ?? M.title ?? "" }) : null,
                    M.title || M.description ? /* @__PURE__ */ l("figcaption", { className: "rpc-carousel__caption", children: [
                      M.title ? /* @__PURE__ */ r("strong", { children: M.title }) : null,
                      M.description ? /* @__PURE__ */ r("span", { children: M.description }) : null
                    ] }) : null
                  ] })
                },
                M.id ?? `${M.title ?? "slide"}-${B}`
              )) }),
              o && g > 1 ? /* @__PURE__ */ l($e, { children: [
                /* @__PURE__ */ r(
                  "button",
                  {
                    "aria-label": "Previous slide",
                    className: "rpc-carousel__arrow rpc-carousel__arrow--previous",
                    disabled: !c && C === 0,
                    onClick: v,
                    type: "button"
                  }
                ),
                /* @__PURE__ */ r(
                  "button",
                  {
                    "aria-label": "Next slide",
                    className: "rpc-carousel__arrow rpc-carousel__arrow--next",
                    disabled: !c && C === g - 1,
                    onClick: E,
                    type: "button"
                  }
                )
              ] }) : null
            ]
          }
        ),
        _ && g > 1 ? /* @__PURE__ */ r("div", { className: "rpc-carousel__dots", role: "tablist", "aria-label": "Carousel slides", children: e.map((M, B) => /* @__PURE__ */ r(
          "button",
          {
            "aria-label": `Go to slide ${B + 1}`,
            "aria-selected": B === C,
            className: Ge("rpc-carousel__dot", B === C && "rpc-carousel__dot--active"),
            onClick: () => w(B),
            role: "tab",
            type: "button"
          },
          M.id ?? `dot-${B}`
        )) }) : null,
        f && g > 1 ? /* @__PURE__ */ r("div", { className: "rpc-carousel__thumbs", "aria-label": "Carousel thumbnails", children: e.map((M, B) => /* @__PURE__ */ r(
          "button",
          {
            "aria-current": B === C ? "true" : void 0,
            "aria-label": `Show ${M.title ?? `slide ${B + 1}`}`,
            className: Ge("rpc-carousel__thumb", B === C && "rpc-carousel__thumb--active"),
            onClick: () => w(B),
            type: "button",
            children: M.thumbnailContent ?? (M.thumbnailSrc || M.imageSrc ? /* @__PURE__ */ r("img", { src: M.thumbnailSrc ?? M.imageSrc, alt: "" }) : /* @__PURE__ */ r("span", { children: B + 1 }))
          },
          M.id ?? `thumb-${B}`
        )) }) : null,
        /* @__PURE__ */ l("div", { className: "rpc-carousel__status", "aria-live": "polite", children: [
          L != null && L.title ? `${L.title}, ` : "",
          "slide ",
          C + 1,
          " of ",
          g
        ] })
      ]
    }
  );
}
function ur(...e) {
  return e.filter(Boolean).join(" ");
}
function gr(e, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(e, a - 1));
}
function Ct(e, a, t) {
  return a <= 0 ? 0 : t ? (e + a) % a : gr(e, a);
}
function Mt(e) {
  if (e.endpoint) return e.endpoint;
  if (!e.targetPage) return "";
  const a = new URLSearchParams(), t = e.targetParams && typeof e.targetParams == "object" && !Array.isArray(e.targetParams) ? e.targetParams : {};
  Object.entries(t).forEach(([c, s]) => {
    s != null && a.set(c, String(s));
  });
  const n = a.toString();
  return n ? `${e.targetPage}?${n}` : e.targetPage;
}
function Pt() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("path", { d: "M12 3 9.9 9.9 3 12l6.9 2.1L12 21l2.1-6.9L21 12l-6.9-2.1L12 3Z" }),
    /* @__PURE__ */ r("path", { d: "M5 3v4M3 5h4M19 17v4M17 19h4" })
  ] });
}
function Bt() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ r("path", { d: "M5 12h14M13 6l6 6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Lt() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ r("path", { d: "M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" }),
    /* @__PURE__ */ r("path", { d: "m9 12 2 2 4-5" })
  ] });
}
function At() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ r("path", { d: "m12 2 2.95 6.1 6.72.94-4.86 4.73 1.18 6.69L12 17.3l-5.99 3.16 1.18-6.69-4.86-4.73 6.72-.94L12 2Z" }) });
}
function It() {
  return /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ r("path", { d: "M12 21s-7.5-4.35-9.6-9.05C.65 8.02 2.9 4.5 6.7 4.5c2.08 0 3.43 1.1 4.3 2.23.87-1.13 2.22-2.23 4.3-2.23 3.8 0 6.05 3.52 4.3 7.45C19.5 16.65 12 21 12 21Z" }) });
}
const Dt = [
  { id: "verified", icon: /* @__PURE__ */ r(Lt, {}), label: "Vendor terverifikasi" },
  { id: "guarantee", icon: /* @__PURE__ */ r(At, {}), label: "Garansi layanan terbaik" },
  { id: "satisfaction", icon: /* @__PURE__ */ r(It, {}), label: "100% pasangan puas" }
];
function bn({
  slides: e,
  activeIndex: a,
  initialIndex: t = 0,
  onSlideChange: n,
  onNavigate: c,
  highlights: s = Dt,
  autoPlay: p = !1,
  autoPlayInterval: i = 5e3,
  loop: o = !0,
  pauseOnHover: _ = !0,
  showArrows: f = !0,
  showDots: u = !0,
  height: d = "min(760px, 70vh)",
  minHeight: y = "520px",
  imagePosition: N = "center",
  overlay: b = "strong",
  ariaLabel: I = "Hero slider",
  className: x = "",
  style: P,
  ...h
}) {
  const [g, S] = F(() => gr(t, e.length)), [C, L] = F(!1), w = pe(null), v = e.length, E = a !== void 0, O = gr(E ? a : g, v), H = e[O], W = (k) => {
    if (!v) return;
    const V = Ct(k, v, o);
    E || S(V), n == null || n(V, e[V]);
  }, M = () => W(O - 1), B = () => W(O + 1);
  X(() => {
    if (!p || v <= 1 || _ && C) return;
    const k = window.setInterval(() => {
      W(O + 1);
    }, i);
    return () => window.clearInterval(k);
  }, [p, i, O, C, _, v]);
  const q = (k) => {
    k.key === "ArrowLeft" && (k.preventDefault(), M()), k.key === "ArrowRight" && (k.preventDefault(), B());
  }, K = (k) => {
    w.current = k.clientX;
  }, $ = (k) => {
    if (w.current === null) return;
    const V = k.clientX - w.current;
    w.current = null, !(Math.abs(V) < 48) && (V > 0 ? M() : B());
  }, D = (k) => {
    const V = Mt(k);
    if (c) {
      c({ slide: k, url: V });
      return;
    }
    V && typeof window < "u" && window.location.assign(V);
  }, Z = {
    "--rpc-hero-slider-height": d,
    "--rpc-hero-slider-image-position": N,
    "--rpc-hero-slider-min-height": y,
    ...P
  };
  return !v || !H ? /* @__PURE__ */ r("section", { className: ur("rpc-hero-slider", "rpc-hero-slider--empty", x), style: Z, ...h, children: /* @__PURE__ */ r("div", { className: "rpc-hero-slider__empty", children: "No slides available." }) }) : /* @__PURE__ */ l(
    "section",
    {
      "aria-label": I,
      "aria-roledescription": "carousel",
      className: ur("rpc-hero-slider", `rpc-hero-slider--${b}`, x),
      onKeyDown: q,
      onMouseEnter: () => _ && L(!0),
      onMouseLeave: () => _ && L(!1),
      onPointerDown: K,
      onPointerUp: $,
      role: "region",
      style: Z,
      tabIndex: 0,
      ...h,
      children: [
        /* @__PURE__ */ r("div", { className: "rpc-hero-slider__track", style: { transform: `translateX(-${O * 100}%)` }, children: e.map((k, V) => /* @__PURE__ */ l(
          "article",
          {
            "aria-hidden": V !== O,
            "aria-label": `${V + 1} of ${v}`,
            className: "rpc-hero-slider__slide",
            role: "group",
            children: [
              /* @__PURE__ */ r("img", { className: "rpc-hero-slider__image", src: k.image, alt: k.title }),
              /* @__PURE__ */ r("div", { className: "rpc-hero-slider__overlay" }),
              /* @__PURE__ */ l("div", { className: "rpc-hero-slider__tagline", children: [
                /* @__PURE__ */ r(Pt, {}),
                /* @__PURE__ */ r("span", { children: k.tagline })
              ] }),
              /* @__PURE__ */ l("div", { className: "rpc-hero-slider__content", children: [
                /* @__PURE__ */ l("div", { className: "rpc-hero-slider__badges", children: [
                  /* @__PURE__ */ r("span", { className: "rpc-hero-slider__badge", children: k.badge }),
                  k.discountBadge ? /* @__PURE__ */ r("span", { className: "rpc-hero-slider__discount", children: k.discountBadge }) : null
                ] }),
                /* @__PURE__ */ r("h2", { className: "rpc-hero-slider__title", children: k.title }),
                /* @__PURE__ */ r("p", { className: "rpc-hero-slider__subtitle", children: k.subtitle }),
                /* @__PURE__ */ r("p", { className: "rpc-hero-slider__description", children: k.description }),
                s.length ? /* @__PURE__ */ r("div", { className: "rpc-hero-slider__highlights", children: s.map((R, Q) => /* @__PURE__ */ l("div", { className: "rpc-hero-slider__highlight", children: [
                  R.icon ? /* @__PURE__ */ r("span", { className: "rpc-hero-slider__highlight-icon", children: R.icon }) : null,
                  /* @__PURE__ */ r("span", { children: R.label })
                ] }, R.id ?? Q)) }) : null,
                /* @__PURE__ */ l("button", { className: "rpc-hero-slider__cta", onClick: () => D(k), type: "button", children: [
                  /* @__PURE__ */ r("span", { children: k.ctaText }),
                  /* @__PURE__ */ r(Bt, {})
                ] })
              ] })
            ]
          },
          k.id
        )) }),
        f && v > 1 ? /* @__PURE__ */ l($e, { children: [
          /* @__PURE__ */ r(
            "button",
            {
              "aria-label": "Previous slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--previous",
              disabled: !o && O === 0,
              onClick: M,
              type: "button"
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              "aria-label": "Next slide",
              className: "rpc-hero-slider__arrow rpc-hero-slider__arrow--next",
              disabled: !o && O === v - 1,
              onClick: B,
              type: "button"
            }
          )
        ] }) : null,
        u && v > 1 ? /* @__PURE__ */ r("div", { className: "rpc-hero-slider__dots", role: "tablist", "aria-label": "Hero slides", children: e.map((k, V) => /* @__PURE__ */ r(
          "button",
          {
            "aria-label": `Go to slide ${V + 1}`,
            "aria-selected": V === O,
            className: ur("rpc-hero-slider__dot", V === O && "rpc-hero-slider__dot--active"),
            onClick: () => W(V),
            role: "tab",
            type: "button"
          },
          k.id
        )) }) : null
      ]
    }
  );
}
function Et(...e) {
  return e.filter(Boolean).join(" ");
}
function vn({
  imageSrc: e,
  imageAlt: a = "",
  badge: t,
  title: n,
  meta: c = [],
  children: s,
  width: p = "100%",
  height: i,
  contentWidth: o = "min(760px, calc(100% - 2.7rem))",
  aspectRatio: _ = "21 / 9",
  minHeight: f = "320px",
  titleFontSize: u = "clamp(1.8rem, 4vw, 3rem)",
  titleFontWeight: d = 800,
  titleLineHeight: y = "1.08",
  badgeFontSize: N = "0.78rem",
  metaFontSize: b = "clamp(0.95rem, 1.8vw, 1.12rem)",
  bodyFontSize: I = "1rem",
  imagePosition: x = "center",
  overlay: P = "strong",
  className: h = "",
  style: g,
  ...S
}) {
  const C = {
    "--rpc-image-hero-card-aspect": _,
    "--rpc-image-hero-card-body-size": I,
    "--rpc-image-hero-card-badge-size": N,
    "--rpc-image-hero-card-content-width": o,
    "--rpc-image-hero-card-height": i,
    "--rpc-image-hero-card-meta-size": b,
    "--rpc-image-hero-card-min-height": f,
    "--rpc-image-hero-card-position": x,
    "--rpc-image-hero-card-title-line-height": y,
    "--rpc-image-hero-card-title-size": u,
    "--rpc-image-hero-card-title-weight": d,
    "--rpc-image-hero-card-width": p,
    ...g
  };
  return /* @__PURE__ */ l(
    "article",
    {
      className: Et("rpc-image-hero-card", `rpc-image-hero-card--${P}`, h),
      style: C,
      ...S,
      children: [
        /* @__PURE__ */ r("img", { className: "rpc-image-hero-card__image", src: e, alt: a }),
        /* @__PURE__ */ l("div", { className: "rpc-image-hero-card__content", children: [
          t ? /* @__PURE__ */ r("span", { className: "rpc-image-hero-card__badge", children: t }) : null,
          /* @__PURE__ */ r("h3", { className: "rpc-image-hero-card__title", children: n }),
          c.length ? /* @__PURE__ */ r("div", { className: "rpc-image-hero-card__meta", children: c.map((L, w) => /* @__PURE__ */ l("div", { className: "rpc-image-hero-card__meta-item", children: [
            L.icon ? /* @__PURE__ */ r("span", { className: "rpc-image-hero-card__meta-icon", children: L.icon }) : null,
            /* @__PURE__ */ r("span", { children: L.label })
          ] }, L.id ?? w)) }) : null,
          s ? /* @__PURE__ */ r("div", { className: "rpc-image-hero-card__body", children: s }) : null
        ] })
      ]
    }
  );
}
function me(...e) {
  return e.filter(Boolean).join(" ");
}
function xe(e, a) {
  if (a)
    return e[a];
}
function Ft(e, a) {
  return e === a ? 0 : e == null ? 1 : a == null ? -1 : typeof e == "number" && typeof a == "number" ? e - a : String(e).toLowerCase().localeCompare(String(a).toLowerCase());
}
function jt(e, a) {
  const t = e;
  return t.id !== void 0 && t.id !== null ? String(t.id) : String(a);
}
function Rt(e) {
  var a;
  return Array.isArray(e) ? { rows: e, total: e.length } : {
    rows: e.data ?? [],
    total: e.total ?? ((a = e.data) == null ? void 0 : a.length) ?? 0
  };
}
function De(e, a) {
  if (a)
    return a.split(".").reduce((t, n) => {
      if (t && typeof t == "object" && n in t)
        return t[n];
    }, e);
}
function Ot(e) {
  return typeof e == "string" ? e : e.url;
}
function Tt(e) {
  return typeof e == "string" ? "GET" : e.method ?? "GET";
}
function ta(e) {
  return typeof e == "string" ? void 0 : e.auth;
}
function Vt(e) {
  return typeof e == "string" ? void 0 : e.headers;
}
function Ht(e) {
  return e ? e.type === "bearer" ? { Authorization: `Bearer ${e.token}` } : e.type === "basic" ? { Authorization: `Basic ${window.btoa(`${e.username}:${e.password}`)}` } : e.type === "apiKey" && (e.in ?? "header") === "header" ? { [e.key]: e.value } : e.type === "custom" ? e.headers : {} : {};
}
function Wt(e, a) {
  if (typeof a != "string" && a.responseMapper)
    return a.responseMapper(e);
  if (Array.isArray(e))
    return e;
  const t = typeof a == "string" ? void 0 : a.dataPath, n = typeof a == "string" ? void 0 : a.totalPath, c = t ? De(e, t) : De(e, "data") ?? De(e, "items"), s = n ? De(e, n) : De(e, "total") ?? De(e, "meta.total");
  return {
    data: Array.isArray(c) ? c : [],
    total: typeof s == "number" ? s : Array.isArray(c) ? c.length : 0
  };
}
function Ut(e, a) {
  var s;
  const t = new URL(Ot(e), window.location.href), n = ta(e), c = typeof e == "string" || !e.queryParams ? {
    page: a.page,
    pageSize: a.pageSize,
    sortBy: a.sortBy,
    sortDirection: a.sortDirection,
    search: a.search,
    filters: a.filters ? JSON.stringify(a.filters) : void 0,
    visibleColumns: (s = a.visibleColumns) == null ? void 0 : s.join(",")
  } : e.queryParams(a);
  return Object.entries(c).forEach(([p, i]) => {
    if (Array.isArray(i)) {
      t.searchParams.delete(p), i.forEach((o) => {
        t.searchParams.append(p, String(o));
      });
      return;
    }
    i != null && i !== "" && t.searchParams.set(p, String(i));
  }), (n == null ? void 0 : n.type) === "apiKey" && (n.in ?? "header") === "query" && t.searchParams.set(n.key, n.value), t.toString();
}
function qt(e, a, t) {
  const n = Tt(e), c = new Headers(t == null ? void 0 : t.headers), s = Vt(e), p = Ht(ta(e));
  Object.entries(s ?? {}).forEach(([o, _]) => {
    c.set(o, _);
  }), Object.entries(p).forEach(([o, _]) => {
    c.set(o, _);
  });
  const i = {
    ...t,
    headers: c,
    method: n
  };
  if (typeof e != "string" && e.body) {
    const o = e.body(a);
    o !== void 0 && (c.set("Content-Type", c.get("Content-Type") ?? "application/json"), i.body = typeof o == "string" ? o : JSON.stringify(o));
  }
  return i;
}
function hr({
  indeterminate: e,
  ...a
}) {
  const t = pe(null);
  return X(() => {
    t.current && (t.current.indeterminate = !!e);
  }, [e]), /* @__PURE__ */ r("input", { ref: t, type: "checkbox", className: "rpc-datagrid__checkbox", ...a });
}
function Xe(e) {
  return ["default", "primary", "success", "warning", "danger"].includes(e);
}
function Nn({
  columns: e,
  data: a = [],
  endpoint: t,
  fetchData: n,
  requestInit: c,
  pageSize: s = 8,
  pageSizeOptions: p = [5, 8, 12, 20],
  initialSortBy: i,
  initialSortDirection: o = "ascending",
  searchable: _ = !0,
  searchPlaceholder: f = "Search...",
  initialSearch: u = "",
  onSearchChange: d,
  filters: y = [],
  initialFilters: N = {},
  onFiltersChange: b,
  columnVisibility: I = !0,
  defaultVisibleColumns: x,
  visibleColumns: P,
  onVisibleColumnsChange: h,
  emptyState: g = "No data available.",
  loadingState: S = "Loading data...",
  errorState: C = "Failed to load data.",
  getRowKey: L = jt,
  onRowClick: w,
  striped: v = !0,
  hoverable: E = !0,
  compact: O = !1,
  tone: H = "dark",
  selectable: W = !1,
  defaultSelectedKeys: M = [],
  selectedKeys: B,
  onSelectionChange: q,
  actions: K = [],
  mobileMode: $ = "auto",
  cardBreakpoint: D = "tablet",
  renderCard: Z,
  title: k,
  description: V,
  className: R = "",
  ...Q
}) {
  const [re, ce] = F(1), [oe, Oe] = F(s), [ne, Te] = F(i), [le, Ne] = F(
    o && i ? o : void 0
  ), [Ve, Ee] = F([]), [ye, we] = F(0), [ae, Me] = F(!!(t || n)), [He, Fe] = F(null), [We, Ue] = F(M), [ue, qe] = F(u), [Y, he] = F(N), [ar, ca] = F(
    x ?? e.map((m) => m.id)
  ), [xr, Pe] = F(null), [$r, tr] = F(!1), [Sr, nr] = F(!1), cr = pe(null), fe = !!(t || n), Be = B ?? We, je = J(() => new Set(Be), [Be]), ke = P ?? ar, Ke = J(() => new Set(ke), [ke]), Le = J(
    () => e.filter((m) => Ke.has(m.id)),
    [e, Ke]
  );
  X(() => {
    Oe(s);
  }, [s]), X(() => {
    i && (Te(i), Ne(o));
  }, [i, o]), X(() => {
    ce(1);
  }, [a, t, n, ue, Y, ke]), X(() => {
    if (!fe)
      return;
    const m = new AbortController();
    let A = !0;
    return (async () => {
      Me(!0), Fe(null);
      try {
        const G = {
          page: re,
          pageSize: oe,
          sortBy: ne,
          sortDirection: le,
          search: ue,
          filters: Y,
          visibleColumns: ke
        }, ee = n ? await n(G) : await fetch(Ut(t, G), {
          ...qt(t, G, c),
          signal: m.signal
        }).then(async (te) => {
          if (!te.ok)
            throw new Error(`Request failed with status ${te.status}`);
          const se = await te.json();
          return Wt(se, t);
        }), j = Rt(ee);
        if (!A)
          return;
        Ee(j.rows), we(j.total);
      } catch (G) {
        if (!A)
          return;
        Fe(G instanceof Error ? G : new Error("Unknown error")), Ee([]), we(0);
      } finally {
        A && Me(!1);
      }
    })(), () => {
      A = !1, m.abort();
    };
  }, [
    Y,
    t,
    n,
    fe,
    re,
    oe,
    c,
    ke,
    ue,
    ne,
    le
  ]), X(() => {
    const m = (T) => {
      cr.current && !cr.current.contains(T.target) && (Pe(null), tr(!1), nr(!1));
    }, A = (T) => {
      T.key === "Escape" && (Pe(null), tr(!1), nr(!1));
    };
    return document.addEventListener("mousedown", m), document.addEventListener("keydown", A), () => {
      document.removeEventListener("mousedown", m), document.removeEventListener("keydown", A);
    };
  }, []);
  const ze = J(() => {
    if (fe)
      return a;
    const m = e.filter((T) => T.searchable !== !1), A = ue.trim().toLowerCase();
    return a.filter((T) => {
      const G = !A || m.some((j) => {
        const te = xe(T, j.accessorKey ?? j.id);
        return String(te ?? "").toLowerCase().includes(A);
      }), ee = y.every((j) => {
        const te = Y[j.id] ?? [];
        if (te.length === 0)
          return !0;
        const se = xe(T, j.accessorKey ?? j.id);
        return te.includes(String(se ?? ""));
      });
      return G && ee;
    });
  }, [Y, e, a, y, fe, ue]), Cr = J(() => {
    if (fe || !ne || !le)
      return ze;
    const m = e.find((T) => T.id === ne);
    if (!m)
      return ze;
    const A = m.accessorKey ?? m.id;
    return [...ze].sort((T, G) => {
      const ee = Ft(xe(T, A), xe(G, A));
      return le === "ascending" ? ee : -ee;
    });
  }, [e, ze, fe, ne, le]), Ae = fe ? ye : Cr.length, Ye = Math.max(1, Math.ceil(Ae / oe)), de = Math.min(re, Ye);
  X(() => {
    de !== re && ce(de);
  }, [re, de]);
  const Ie = fe ? Ve : Cr.slice((de - 1) * oe, de * oe), Re = J(
    () => Ie.map((m, A) => L(m, A)),
    [L, Ie]
  ), lr = W && Re.length > 0 && Re.every((m) => je.has(m)), la = W && Re.some((m) => je.has(m)) && !lr, sa = (m) => {
    const A = new Set(m);
    return Ie.filter((T, G) => A.has(L(T, G)));
  }, Mr = (m) => {
    B === void 0 && Ue(m), q == null || q(m, sa(m));
  }, ia = (m) => {
    qe(m), ce(1), d == null || d(m);
  }, oa = (m, A) => {
    const T = Y[m] ?? [], G = T.includes(A) ? T.filter((j) => j !== A) : [...T, A], ee = {
      ...Y,
      [m]: G
    };
    G.length === 0 && delete ee[m], he(ee), ce(1), b == null || b(ee);
  }, da = () => {
    he({}), ce(1), b == null || b({});
  }, pa = (m) => {
    P === void 0 && ca(m), h == null || h(m);
  }, ua = (m) => {
    const A = Ke.has(m) ? ke.filter((T) => T !== m) : [...ke, m];
    pa(A.length ? A : [m]);
  }, Pr = (m, A) => {
    const T = L(m, A), G = je.has(T) ? Be.filter((ee) => ee !== T) : [...Be, T];
    Mr(G);
  }, ha = () => {
    if (!W)
      return;
    const m = lr ? Be.filter((A) => !Re.includes(A)) : Array.from(/* @__PURE__ */ new Set([...Be, ...Re]));
    Mr(m);
  }, ma = (m) => {
    if (!m.allowsSorting)
      return;
    const A = m.id;
    let T = "ascending";
    ne === A && (T = le === "ascending" ? "descending" : "ascending"), Te(A), Ne(T), ce(1);
  }, Br = (m) => {
    const A = ne === m.id, T = {
      column: m,
      isSorted: A,
      sortDirection: A ? le : void 0
    };
    return typeof m.header == "function" ? m.header(T) : m.header;
  }, Ze = He ? typeof C == "function" ? C(He) : C : ae ? S : Ie.length ? null : g, _a = Ae === 0 ? 0 : (de - 1) * oe + 1, fa = Ae === 0 ? 0 : Math.min(de * oe, Ae), ga = Le.length + (W ? 1 : 0) + (K.length ? 1 : 0), sr = Object.values(Y).reduce((m, A) => m + A.length, 0), ba = $ !== "table", va = (m, A) => {
    const T = L(m, A), G = je.has(T), ee = xr === T, j = Le.find((z) => z.isRowHeader) ?? Le[0], te = j ? j.cell ? j.cell(m, A) : String(xe(m, j.accessorKey ?? j.id) ?? "") : null, se = Le.filter((z) => z.id !== (j == null ? void 0 : j.id));
    return /* @__PURE__ */ l(
      "article",
      {
        className: me("rpc-datagrid-card", G && "rpc-datagrid-card--selected"),
        onClick: w ? () => w(m) : void 0,
        children: [
          /* @__PURE__ */ l("div", { className: "rpc-datagrid-card__header", children: [
            W ? /* @__PURE__ */ r("div", { className: "rpc-datagrid-card__select", onClick: (z) => z.stopPropagation(), children: /* @__PURE__ */ r(
              hr,
              {
                "aria-label": `Select card ${A + 1}`,
                checked: G,
                onChange: () => Pr(m, A)
              }
            ) }) : null,
            /* @__PURE__ */ r("div", { className: "rpc-datagrid-card__title", children: te }),
            K.length ? /* @__PURE__ */ l("div", { className: "rpc-datagrid-card__actions", onClick: (z) => z.stopPropagation(), children: [
              /* @__PURE__ */ r(
                "button",
                {
                  "aria-expanded": ee,
                  "aria-label": `Open actions for ${T}`,
                  className: "rpc-datagrid__action-trigger",
                  onClick: () => Pe((z) => z === T ? null : T),
                  type: "button",
                  children: /* @__PURE__ */ l("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                    /* @__PURE__ */ r("span", {}),
                    /* @__PURE__ */ r("span", {}),
                    /* @__PURE__ */ r("span", {})
                  ] })
                }
              ),
              ee ? /* @__PURE__ */ r("div", { className: "rpc-datagrid__action-menu", role: "menu", children: K.map((z) => {
                const ir = typeof z.color == "string" && Xe(z.color) ? `rpc-datagrid__action-item--${z.color}` : "", Lr = typeof z.color == "string" && !Xe(z.color) ? { color: z.color } : void 0;
                return /* @__PURE__ */ l(
                  "button",
                  {
                    className: me("rpc-datagrid__action-item", ir, z.disabled && "rpc-datagrid__action-item--disabled"),
                    disabled: z.disabled,
                    onClick: (Na) => {
                      Na.stopPropagation(), z.onClick(m, A), Pe(null);
                    },
                    role: "menuitem",
                    style: Lr,
                    type: "button",
                    children: [
                      z.icon ? /* @__PURE__ */ r("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: Lr, children: z.icon }) : null,
                      /* @__PURE__ */ r("span", { children: z.name })
                    ]
                  },
                  z.id
                );
              }) }) : null
            ] }) : null
          ] }),
          /* @__PURE__ */ r("dl", { className: "rpc-datagrid-card__fields", children: se.map((z) => {
            const ir = z.cell ? z.cell(m, A) : String(xe(m, z.accessorKey ?? z.id) ?? "");
            return /* @__PURE__ */ l("div", { className: "rpc-datagrid-card__field", children: [
              /* @__PURE__ */ r("dt", { children: typeof z.header == "string" ? z.header : z.id }),
              /* @__PURE__ */ r("dd", { children: ir })
            ] }, `${z.id}-${T}`);
          }) })
        ]
      },
      T
    );
  };
  return /* @__PURE__ */ l(
    "section",
    {
      ref: cr,
      className: me(
        "rpc-datagrid",
        `rpc-datagrid--${H}`,
        `rpc-datagrid--mobile-${$}`,
        `rpc-datagrid--card-${D}`,
        O && "rpc-datagrid--compact",
        R
      ),
      ...Q,
      children: [
        (k || V) && /* @__PURE__ */ l("div", { className: "rpc-datagrid__header", children: [
          k ? /* @__PURE__ */ r("h3", { className: "rpc-datagrid__title", children: k }) : null,
          V ? /* @__PURE__ */ r("p", { className: "rpc-datagrid__description", children: V }) : null
        ] }),
        (_ || y.length > 0 || I) && /* @__PURE__ */ l("div", { className: "rpc-datagrid__toolbar", children: [
          y.length > 0 ? /* @__PURE__ */ l("div", { className: "rpc-datagrid__filter-popover", children: [
            /* @__PURE__ */ l(
              "button",
              {
                "aria-expanded": $r,
                className: "rpc-datagrid__filter-trigger",
                onClick: (m) => {
                  m.stopPropagation(), tr((A) => !A);
                },
                type: "button",
                children: [
                  /* @__PURE__ */ r("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M3 5h18l-7 8v5l-4 2v-7Z" }) }),
                  /* @__PURE__ */ r("span", { children: "Filter" }),
                  sr > 0 ? /* @__PURE__ */ r("strong", { children: sr }) : null
                ]
              }
            ),
            $r ? /* @__PURE__ */ l("div", { className: "rpc-datagrid__filter-menu", onClick: (m) => m.stopPropagation(), children: [
              /* @__PURE__ */ l("div", { className: "rpc-datagrid__filter-menu-header", children: [
                /* @__PURE__ */ r("strong", { children: "Filter by" }),
                sr > 0 ? /* @__PURE__ */ r("button", { onClick: da, type: "button", children: "Clear" }) : null
              ] }),
              y.map((m) => /* @__PURE__ */ l("fieldset", { className: "rpc-datagrid__filter-group", children: [
                /* @__PURE__ */ r("legend", { children: m.label }),
                m.options.map((A) => /* @__PURE__ */ l("label", { className: "rpc-datagrid__filter-option", children: [
                  /* @__PURE__ */ r(
                    "input",
                    {
                      checked: (Y[m.id] ?? []).includes(A.value),
                      onChange: () => oa(m.id, A.value),
                      type: "checkbox"
                    }
                  ),
                  /* @__PURE__ */ r("span", { children: A.label })
                ] }, A.id))
              ] }, m.id))
            ] }) : null
          ] }) : null,
          y.length > 0 && _ ? /* @__PURE__ */ r("span", { className: "rpc-datagrid__toolbar-divider" }) : null,
          _ ? /* @__PURE__ */ l("label", { className: "rpc-datagrid__search", children: [
            /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: "Search rows" }),
            /* @__PURE__ */ l("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ r("circle", { cx: "11", cy: "11", r: "7" }),
              /* @__PURE__ */ r("path", { d: "m20 20-3.5-3.5" })
            ] }),
            /* @__PURE__ */ r(
              "input",
              {
                className: "rpc-datagrid__search-input",
                onChange: (m) => ia(m.target.value),
                placeholder: f,
                type: "search",
                value: ue
              }
            )
          ] }) : null,
          I ? /* @__PURE__ */ l("div", { className: "rpc-datagrid__columns", children: [
            /* @__PURE__ */ r(
              "button",
              {
                "aria-expanded": Sr,
                className: "rpc-datagrid__columns-trigger",
                onClick: (m) => {
                  m.stopPropagation(), nr((A) => !A);
                },
                type: "button",
                children: "Columns"
              }
            ),
            Sr ? /* @__PURE__ */ r("div", { className: "rpc-datagrid__columns-menu", onClick: (m) => m.stopPropagation(), children: e.filter((m) => m.hideable !== !1).map((m) => /* @__PURE__ */ l("label", { className: "rpc-datagrid__columns-option", children: [
              /* @__PURE__ */ r(
                "input",
                {
                  checked: Ke.has(m.id),
                  onChange: () => ua(m.id),
                  type: "checkbox"
                }
              ),
              /* @__PURE__ */ r("span", { children: typeof m.header == "string" ? m.header : m.id })
            ] }, m.id)) }) : null
          ] }) : null
        ] }),
        /* @__PURE__ */ r("div", { className: "rpc-datagrid__table-wrap", children: /* @__PURE__ */ l(
          "table",
          {
            className: me(
              "rpc-datagrid__table",
              E && "rpc-datagrid__table--hoverable",
              v && "rpc-datagrid__table--striped"
            ),
            children: [
              /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ l("tr", { children: [
                W ? /* @__PURE__ */ r("th", { className: "rpc-datagrid__th rpc-datagrid__th--select", scope: "col", children: /* @__PURE__ */ r(
                  hr,
                  {
                    "aria-label": "Select all rows",
                    checked: !!lr,
                    indeterminate: la,
                    onChange: ha
                  }
                ) }) : null,
                Le.map((m) => {
                  const A = ne === m.id, T = A ? le ?? "ascending" : "none";
                  return /* @__PURE__ */ r(
                    "th",
                    {
                      "aria-sort": m.allowsSorting ? T : void 0,
                      className: me("rpc-datagrid__th", m.className, m.align && `rpc-datagrid__cell--${m.align}`),
                      scope: "col",
                      style: m.width ? { width: typeof m.width == "number" ? `${m.width}px` : m.width } : void 0,
                      children: m.allowsSorting ? /* @__PURE__ */ l("button", { className: "rpc-datagrid__sort-button", onClick: () => ma(m), type: "button", children: [
                        /* @__PURE__ */ r("span", { children: Br(m) }),
                        /* @__PURE__ */ r("span", { className: "rpc-datagrid__sort-indicator", "aria-hidden": "true", children: A ? le === "ascending" ? "↑" : "↓" : "↕" })
                      ] }) : Br(m)
                    },
                    m.id
                  );
                }),
                K.length ? /* @__PURE__ */ r("th", { className: "rpc-datagrid__th rpc-datagrid__th--actions", scope: "col", children: /* @__PURE__ */ r("span", { className: "rpc-sr-only", children: "Actions" }) }) : null
              ] }) }),
              /* @__PURE__ */ r("tbody", { children: Ze ? /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { className: "rpc-datagrid__status", colSpan: ga, children: Ze }) }) : Ie.map((m, A) => {
                const T = L(m, A), G = je.has(T), ee = xr === T;
                return /* @__PURE__ */ l(
                  "tr",
                  {
                    className: me("rpc-datagrid__row", G && "rpc-datagrid__row--selected"),
                    onClick: w ? () => w(m) : void 0,
                    children: [
                      W ? /* @__PURE__ */ r("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--select", onClick: (j) => j.stopPropagation(), children: /* @__PURE__ */ r(
                        hr,
                        {
                          "aria-label": `Select row ${A + 1}`,
                          checked: G,
                          onChange: () => Pr(m, A)
                        }
                      ) }) : null,
                      Le.map((j, te) => {
                        const se = j.cell ? j.cell(m, A) : String(xe(m, j.accessorKey ?? j.id) ?? "");
                        return j.isRowHeader || te === 0 ? /* @__PURE__ */ r(
                          "th",
                          {
                            className: me(
                              "rpc-datagrid__cell",
                              j.className,
                              j.align && `rpc-datagrid__cell--${j.align}`,
                              "rpc-datagrid__cell--row-header"
                            ),
                            scope: "row",
                            children: se
                          },
                          `${j.id}-${T}`
                        ) : /* @__PURE__ */ r(
                          "td",
                          {
                            className: me(
                              "rpc-datagrid__cell",
                              j.className,
                              j.align && `rpc-datagrid__cell--${j.align}`
                            ),
                            children: se
                          },
                          `${j.id}-${T}`
                        );
                      }),
                      K.length ? /* @__PURE__ */ l("td", { className: "rpc-datagrid__cell rpc-datagrid__cell--actions", onClick: (j) => j.stopPropagation(), children: [
                        /* @__PURE__ */ r(
                          "button",
                          {
                            "aria-expanded": ee,
                            "aria-label": `Open actions for ${T}`,
                            className: "rpc-datagrid__action-trigger",
                            onClick: () => Pe((j) => j === T ? null : T),
                            type: "button",
                            children: /* @__PURE__ */ l("span", { "aria-hidden": "true", className: "rpc-datagrid__dots", children: [
                              /* @__PURE__ */ r("span", {}),
                              /* @__PURE__ */ r("span", {}),
                              /* @__PURE__ */ r("span", {})
                            ] })
                          }
                        ),
                        ee ? /* @__PURE__ */ r("div", { className: "rpc-datagrid__action-menu", role: "menu", children: K.map((j) => {
                          const te = typeof j.color == "string" && Xe(j.color) ? `rpc-datagrid__action-item--${j.color}` : "", se = typeof j.color == "string" && !Xe(j.color) ? { color: j.color } : void 0;
                          return /* @__PURE__ */ l(
                            "button",
                            {
                              className: me("rpc-datagrid__action-item", te, j.disabled && "rpc-datagrid__action-item--disabled"),
                              disabled: j.disabled,
                              style: se,
                              onClick: (z) => {
                                z.stopPropagation(), j.onClick(m, A), Pe(null);
                              },
                              role: "menuitem",
                              type: "button",
                              children: [
                                j.icon ? /* @__PURE__ */ r("span", { className: "rpc-datagrid__action-icon", "aria-hidden": "true", style: se, children: j.icon }) : null,
                                /* @__PURE__ */ r("span", { children: j.name })
                              ]
                            },
                            j.id
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
        ba ? /* @__PURE__ */ r("div", { className: "rpc-datagrid__cards", children: Ze ? /* @__PURE__ */ r("div", { className: "rpc-datagrid__status", children: Ze }) : Ie.map((m, A) => /* @__PURE__ */ r("div", { className: "rpc-datagrid__card-shell", children: Z ? Z(m, A) : va(m, A) }, L(m, A))) }) : null,
        /* @__PURE__ */ l("div", { className: "rpc-datagrid__footer", children: [
          /* @__PURE__ */ r("div", { className: "rpc-datagrid__summary", children: Ae > 0 ? /* @__PURE__ */ l("span", { children: [
            "Showing ",
            _a,
            " to ",
            fa,
            " of ",
            Ae
          ] }) : /* @__PURE__ */ r("span", { children: "Showing 0 rows" }) }),
          /* @__PURE__ */ l("div", { className: "rpc-datagrid__pagination", children: [
            /* @__PURE__ */ l("label", { className: "rpc-datagrid__page-size", children: [
              /* @__PURE__ */ r("span", { children: "Rows" }),
              /* @__PURE__ */ r(
                "select",
                {
                  className: "rpc-datagrid__select",
                  value: oe,
                  onChange: (m) => {
                    Oe(Number(m.target.value)), ce(1);
                  },
                  children: p.map((m) => /* @__PURE__ */ r("option", { value: m, children: m }, m))
                }
              )
            ] }),
            /* @__PURE__ */ l("div", { className: "rpc-datagrid__pager", children: [
              /* @__PURE__ */ r(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: de <= 1,
                  onClick: () => ce((m) => Math.max(1, m - 1)),
                  type: "button",
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ l("span", { className: "rpc-datagrid__pager-info", children: [
                "Page ",
                de,
                " of ",
                Ye
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  className: "rpc-datagrid__pager-button",
                  disabled: de >= Ye,
                  onClick: () => ce((m) => Math.min(Ye, m + 1)),
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
const Tr = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];
function Ce(...e) {
  return e.filter(Boolean).join(" ");
}
function be(e, a) {
  return e.color ?? Tr[a % Tr.length];
}
function ve(e) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(e);
}
function wr(e) {
  const a = e.map((c) => c.value), t = Math.min(0, ...a), n = Math.max(1, ...a);
  return t === n ? { minValue: 0, maxValue: n + 1 } : { minValue: t, maxValue: n };
}
function na(e, a, t, n) {
  const { minValue: c, maxValue: s } = wr(e), p = a - n * 2, i = t - n * 2, o = Math.max(1, e.length - 1);
  return e.map((_, f) => {
    const u = n + f / o * p, d = (_.value - c) / (s - c), y = n + i - d * i;
    return { x: u, y };
  });
}
function kr(e) {
  return e.map((a, t) => `${t === 0 ? "M" : "L"} ${a.x} ${a.y}`).join(" ");
}
function Kt(e, a) {
  if (e.length === 0)
    return "";
  const t = kr(e), n = e[e.length - 1], c = e[0];
  return `${t} L ${n.x} ${a} L ${c.x} ${a} Z`;
}
function _e(e, a, t, n) {
  const c = (n - 90) * Math.PI / 180;
  return {
    x: e + t * Math.cos(c),
    y: a + t * Math.sin(c)
  };
}
function zt(e, a, t, n, c) {
  const s = _e(e, a, t, c), p = _e(e, a, t, n), i = c - n <= 180 ? "0" : "1";
  return [`M ${s.x} ${s.y}`, `A ${t} ${t} 0 ${i} 0 ${p.x} ${p.y}`].join(" ");
}
function Yt(e, a, t, n, c) {
  const s = _e(e, a, t, c), p = _e(e, a, t, n), i = c - n <= 180 ? "0" : "1";
  return [
    `M ${e} ${a}`,
    `L ${s.x} ${s.y}`,
    `A ${t} ${t} 0 ${i} 0 ${p.x} ${p.y}`,
    "Z"
  ].join(" ");
}
function Vr(e) {
  return Math.max(0, Math.min(100, e));
}
function yn({
  data: e,
  height: a = 220,
  width: t = 520,
  color: n = "#2563eb",
  ariaLabel: c = "Area chart",
  className: s = "",
  ...p
}) {
  const o = na(e, t, a, 28), _ = a - 28, f = kr(o), u = Kt(o, _), d = ie().replace(/:/g, "");
  return /* @__PURE__ */ r("div", { className: Ce("rpc-chart", "rpc-area-chart", s), ...p, children: /* @__PURE__ */ l("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${t} ${a}`, role: "img", "aria-label": c, children: [
    /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ l("linearGradient", { id: d, x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ r("stop", { offset: "0%", stopColor: n, stopOpacity: "0.32" }),
      /* @__PURE__ */ r("stop", { offset: "100%", stopColor: n, stopOpacity: "0.04" })
    ] }) }),
    /* @__PURE__ */ r("line", { className: "rpc-chart__axis", x1: 28, x2: t - 28, y1: _, y2: _ }),
    /* @__PURE__ */ r("path", { className: "rpc-area-chart__fill", d: u, fill: `url(#${d})` }),
    /* @__PURE__ */ r("path", { className: "rpc-area-chart__line", d: f, stroke: n }),
    o.map((y, N) => /* @__PURE__ */ l("g", { children: [
      /* @__PURE__ */ r("circle", { className: "rpc-area-chart__point", cx: y.x, cy: y.y, fill: be(e[N], N), r: "4" }),
      /* @__PURE__ */ l("title", { children: [
        e[N].label,
        ": ",
        ve(e[N].value)
      ] })
    ] }, e[N].label))
  ] }) });
}
function wn({
  data: e,
  height: a = 240,
  width: t = 520,
  ariaLabel: n = "Bar chart",
  className: c = "",
  ...s
}) {
  const { minValue: o, maxValue: _ } = wr(e), f = t - 28 * 2, u = a - 28 * 2, d = Math.max(10, (f - 14 * Math.max(0, e.length - 1)) / Math.max(1, e.length)), y = a - 28;
  return /* @__PURE__ */ r("div", { className: Ce("rpc-chart", "rpc-bar-chart", c), ...s, children: /* @__PURE__ */ l("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${t} ${a}`, role: "img", "aria-label": n, children: [
    /* @__PURE__ */ r("line", { className: "rpc-chart__axis", x1: 28, x2: t - 28, y1: y, y2: y }),
    e.map((N, b) => {
      const x = (N.value - o) / (_ - o) * u, P = 28 + b * (d + 14), h = y - x;
      return /* @__PURE__ */ l("g", { children: [
        /* @__PURE__ */ r(
          "rect",
          {
            className: "rpc-bar-chart__bar",
            fill: be(N, b),
            height: x,
            rx: "7",
            width: d,
            x: P,
            y: h
          }
        ),
        /* @__PURE__ */ r("text", { className: "rpc-chart__label", textAnchor: "middle", x: P + d / 2, y: a - 7, children: N.label }),
        /* @__PURE__ */ l("title", { children: [
          N.label,
          ": ",
          ve(N.value)
        ] })
      ] }, N.label);
    })
  ] }) });
}
function kn({ title: e, items: a, footer: t, className: n = "", ...c }) {
  return /* @__PURE__ */ l("div", { className: Ce("rpc-chart-tooltip", n), role: "tooltip", ...c, children: [
    e ? /* @__PURE__ */ r("div", { className: "rpc-chart-tooltip__title", children: e }) : null,
    /* @__PURE__ */ r("div", { className: "rpc-chart-tooltip__items", children: a.map((s) => /* @__PURE__ */ l("div", { className: "rpc-chart-tooltip__item", children: [
      /* @__PURE__ */ r(
        "span",
        {
          "aria-hidden": "true",
          className: "rpc-chart-tooltip__marker",
          style: s.color ? { backgroundColor: s.color } : void 0
        }
      ),
      /* @__PURE__ */ r("span", { className: "rpc-chart-tooltip__label", children: s.label }),
      /* @__PURE__ */ r("strong", { className: "rpc-chart-tooltip__value", children: typeof s.value == "number" ? ve(s.value) : s.value })
    ] }, `${s.label}-${s.value}`)) }),
    t ? /* @__PURE__ */ r("div", { className: "rpc-chart-tooltip__footer", children: t }) : null
  ] });
}
function xn({
  data: e,
  height: a = 220,
  width: t = 520,
  color: n = "#2563eb",
  ariaLabel: c = "Line chart",
  className: s = "",
  ...p
}) {
  const o = na(e, t, a, 28), _ = kr(o), f = a - 28;
  return /* @__PURE__ */ r("div", { className: Ce("rpc-chart", "rpc-line-chart", s), ...p, children: /* @__PURE__ */ l("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${t} ${a}`, role: "img", "aria-label": c, children: [
    /* @__PURE__ */ r("line", { className: "rpc-chart__axis", x1: 28, x2: t - 28, y1: f, y2: f }),
    /* @__PURE__ */ r("path", { className: "rpc-line-chart__line", d: _, stroke: n }),
    o.map((u, d) => /* @__PURE__ */ l("g", { children: [
      /* @__PURE__ */ r("circle", { className: "rpc-line-chart__point", cx: u.x, cy: u.y, fill: be(e[d], d), r: "4" }),
      /* @__PURE__ */ l("title", { children: [
        e[d].label,
        ": ",
        ve(e[d].value)
      ] })
    ] }, e[d].label))
  ] }) });
}
function $n({
  data: e,
  size: a = 240,
  ariaLabel: t = "Pie chart",
  showLegend: n = !0,
  className: c = "",
  ...s
}) {
  const p = a / 2 - 14, i = a / 2, o = e.reduce((f, u) => f + Math.max(0, u.value), 0);
  let _ = 0;
  return /* @__PURE__ */ l("div", { className: Ce("rpc-chart", "rpc-pie-chart", c), ...s, children: [
    /* @__PURE__ */ r("svg", { className: "rpc-pie-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": t, children: o > 0 ? e.map((f, u) => {
      const d = Math.max(0, f.value), y = d / o * 360, N = _, b = _ + y, I = _e(i, i, p * 0.62, N + y / 2);
      return _ = b, d === 0 ? null : /* @__PURE__ */ l("g", { children: [
        y >= 359.99 ? /* @__PURE__ */ r("circle", { className: "rpc-pie-chart__slice", cx: i, cy: i, fill: be(f, u), r: p }) : /* @__PURE__ */ r(
          "path",
          {
            className: "rpc-pie-chart__slice",
            d: Yt(i, i, p, N, b),
            fill: be(f, u)
          }
        ),
        y > 28 ? /* @__PURE__ */ l("text", { className: "rpc-pie-chart__value", textAnchor: "middle", x: I.x, y: I.y, children: [
          Math.round(d / o * 100),
          "%"
        ] }) : null,
        /* @__PURE__ */ l("title", { children: [
          f.label,
          ": ",
          ve(f.value)
        ] })
      ] }, f.label);
    }) : /* @__PURE__ */ r("circle", { className: "rpc-chart__empty", cx: i, cy: i, r: p }) }),
    n ? /* @__PURE__ */ r("div", { className: "rpc-chart__legend", children: e.map((f, u) => /* @__PURE__ */ l("span", { className: "rpc-chart__legend-item", children: [
      /* @__PURE__ */ r("span", { className: "rpc-chart__legend-marker", style: { backgroundColor: be(f, u) } }),
      f.label
    ] }, f.label)) }) : null
  ] });
}
function Sn({
  data: e,
  size: a = 280,
  color: t = "#2563eb",
  levels: n = 4,
  ariaLabel: c = "Radar chart",
  className: s = "",
  ...p
}) {
  const i = a / 2, o = a / 2 - 42, { maxValue: _ } = wr(e), f = 360 / Math.max(1, e.length), u = e.map((d, y) => {
    const N = y * f, b = _e(i, i, o * (d.value / _), N);
    return `${b.x},${b.y}`;
  }).join(" ");
  return /* @__PURE__ */ r("div", { className: Ce("rpc-chart", "rpc-radar-chart", s), ...p, children: /* @__PURE__ */ l("svg", { className: "rpc-radar-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": c, children: [
    Array.from({ length: n }).map((d, y) => {
      const N = o * ((y + 1) / n), b = e.map((I, x) => {
        const P = _e(i, i, N, x * f);
        return `${P.x},${P.y}`;
      }).join(" ");
      return /* @__PURE__ */ r("polygon", { className: "rpc-radar-chart__grid", points: b }, N);
    }),
    e.map((d, y) => {
      const N = _e(i, i, o, y * f), b = _e(i, i, o + 24, y * f);
      return /* @__PURE__ */ l("g", { children: [
        /* @__PURE__ */ r("line", { className: "rpc-radar-chart__axis", x1: i, x2: N.x, y1: i, y2: N.y }),
        /* @__PURE__ */ r("text", { className: "rpc-radar-chart__label", textAnchor: "middle", x: b.x, y: b.y, children: d.label }),
        /* @__PURE__ */ l("title", { children: [
          d.label,
          ": ",
          ve(d.value)
        ] })
      ] }, d.label);
    }),
    /* @__PURE__ */ r("polygon", { className: "rpc-radar-chart__area", fill: t, points: u, stroke: t })
  ] }) });
}
function Cn({
  data: e,
  size: a = 260,
  strokeWidth: t = 14,
  ariaLabel: n = "Radial chart",
  className: c = "",
  ...s
}) {
  const p = a / 2, i = 18;
  return /* @__PURE__ */ l("div", { className: Ce("rpc-chart", "rpc-radial-chart", c), ...s, children: [
    /* @__PURE__ */ l("svg", { className: "rpc-radial-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": n, children: [
      e.map((o, _) => {
        const f = p - t / 2 - 14 - _ * (t + i), u = Vr(o.value), d = u / 100 * 359.99;
        return f <= 0 ? null : /* @__PURE__ */ l("g", { children: [
          /* @__PURE__ */ r("circle", { className: "rpc-radial-chart__track", cx: p, cy: p, r: f, strokeWidth: t }),
          u > 0 ? /* @__PURE__ */ r(
            "path",
            {
              className: "rpc-radial-chart__value",
              d: zt(p, p, f, 0, d),
              stroke: be(o, _),
              strokeWidth: t
            }
          ) : null,
          /* @__PURE__ */ l("title", { children: [
            o.label,
            ": ",
            ve(u),
            "%"
          ] })
        ] }, o.label);
      }),
      /* @__PURE__ */ r("text", { className: "rpc-radial-chart__center", textAnchor: "middle", x: p, y: p, children: "%" })
    ] }),
    /* @__PURE__ */ r("div", { className: "rpc-chart__legend", children: e.map((o, _) => /* @__PURE__ */ l("span", { className: "rpc-chart__legend-item", children: [
      /* @__PURE__ */ r("span", { className: "rpc-chart__legend-marker", style: { backgroundColor: be(o, _) } }),
      o.label,
      " ",
      ve(Vr(o.value)),
      "%"
    ] }, o.label)) })
  ] });
}
export {
  nn as Alert,
  hn as AppLayout,
  yn as AreaChart,
  wn as BarChart,
  un as BottomNavigation,
  Xt as Button,
  Jt as Card,
  gn as Carousel,
  Qt as CategoryCard,
  kn as ChartTooltip,
  Kr as Checkbox,
  sn as CheckboxGroup,
  dn as Chip,
  cn as ConfirmModal,
  Nn as DataGrid,
  dr as DatePicker,
  pn as FileTree,
  on as FormBuilder,
  fn as Header,
  bn as HeroSlider,
  en as HoverCard,
  vn as ImageHeroCard,
  vr as Input,
  Ia as InputEmail,
  Aa as InputNumber,
  Da as InputPassword,
  xn as LineChart,
  $a as Modal,
  Oa as MultiSelect,
  mn as Navbar,
  $n as PieChart,
  Sn as RadarChart,
  Cn as RadialChart,
  Fa as RadioGroup,
  ln as SectionHeading,
  Ra as Select,
  _n as Sidebar,
  ja as Switch,
  Ea as TextArea,
  rn as ThemeRoot,
  an as ToastProvider,
  qa as UploadArea,
  tn as useToast
};
