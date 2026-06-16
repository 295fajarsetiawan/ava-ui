import { jsx as e, jsxs as h } from "react/jsx-runtime";
import { useId as Y } from "react";
function lr({
  children: r,
  className: a = "",
  variant: c = "primary",
  size: n = "md",
  ...t
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      className: ["rpc-button", `rpc-button--${c}`, `rpc-button--${n}`, a].filter(Boolean).join(" "),
      ...t,
      children: r
    }
  );
}
function or({ title: r, children: a, className: c = "", ...n }) {
  return /* @__PURE__ */ h("section", { className: ["rpc-card", c].filter(Boolean).join(" "), ...n, children: [
    r ? /* @__PURE__ */ e("h3", { className: "rpc-card__title", children: r }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-card__body", children: a })
  ] });
}
function S(...r) {
  return r.filter(Boolean).join(" ");
}
function Z(r, a) {
  const c = r.as ?? "p", n = {
    "--rpc-category-card-line-color": r.color,
    "--rpc-category-card-line-family": r.fontFamily,
    "--rpc-category-card-line-size": r.fontSize,
    "--rpc-category-card-line-style": r.fontStyle,
    "--rpc-category-card-line-weight": r.fontWeight,
    "--rpc-category-card-line-letter-spacing": r.letterSpacing,
    "--rpc-category-card-line-height": r.lineHeight,
    "--rpc-category-card-line-margin": r.margin,
    "--rpc-category-card-line-transform": r.textTransform,
    ...r.style
  };
  return /* @__PURE__ */ e(c, { className: S("rpc-category-card__line", r.className), style: n, children: r.content }, r.id ?? a);
}
function ir({
  align: r = "center",
  as: a = "article",
  backgroundColor: c,
  borderColor: n,
  children: t,
  className: l = "",
  contentClassName: p = "",
  gap: i = "1.35rem",
  icon: s,
  iconBackgroundColor: u,
  iconBorderColor: o,
  iconBoxSize: g,
  iconClassName: d = "",
  iconColor: _,
  iconSize: m,
  lines: v,
  maxWidth: f,
  minHeight: y,
  padding: N,
  radius: B,
  style: M,
  subtitle: P,
  subtitleProps: A,
  title: b,
  titleProps: w,
  ...z
}) {
  const O = a, U = v ?? [
    b ? {
      as: "h3",
      className: "rpc-category-card__line--title",
      content: b,
      ...w
    } : null,
    P ? {
      as: "p",
      className: "rpc-category-card__line--subtitle",
      content: P,
      ...A
    } : null
  ].filter(Boolean), W = {
    "--rpc-category-card-bg": c,
    "--rpc-category-card-border": n,
    "--rpc-category-card-gap": i,
    "--rpc-category-card-icon-bg": u,
    "--rpc-category-card-icon-border": o,
    "--rpc-category-card-icon-color": _,
    "--rpc-category-card-icon-box-size": g,
    "--rpc-category-card-icon-size": m,
    "--rpc-category-card-max-width": f,
    "--rpc-category-card-min-height": y,
    "--rpc-category-card-padding": N,
    "--rpc-category-card-radius": B,
    ...M
  };
  return /* @__PURE__ */ h(O, { className: S("rpc-category-card", `rpc-category-card--${r}`, l), style: W, ...z, children: [
    s ? /* @__PURE__ */ e("div", { className: S("rpc-category-card__icon", d), children: s }) : null,
    /* @__PURE__ */ h("div", { className: S("rpc-category-card__content", p), children: [
      U.map(Z),
      t
    ] })
  ] });
}
function H(...r) {
  return r.filter(Boolean).join(" ");
}
function D(r, a) {
  return a !== void 0 ? a : typeof r == "string" && r.trim() ? r.trim().slice(0, 1).toUpperCase() : "•";
}
function sr({
  isOpen: r,
  avatar: a,
  avatarSrc: c,
  avatarAlt: n,
  avatarFallback: t,
  title: l,
  handle: p,
  description: i,
  stats: s = [],
  footer: u,
  children: o,
  id: g,
  className: d = "",
  ..._
}) {
  const m = (v, f = d) => /* @__PURE__ */ h("article", { className: H("rpc-hover-card", f), id: g, ..._, children: [
    /* @__PURE__ */ h("div", { className: "rpc-hover-card__header", children: [
      /* @__PURE__ */ h("div", { className: "rpc-hover-card__avatar", "aria-hidden": "true", children: [
        c ? /* @__PURE__ */ e("img", { alt: n ?? "", className: "rpc-hover-card__avatar-image", src: c }) : null,
        c ? null : a ?? /* @__PURE__ */ e("span", { className: "rpc-hover-card__avatar-fallback", children: D(l, t) })
      ] }),
      /* @__PURE__ */ h("div", { className: "rpc-hover-card__identity", children: [
        /* @__PURE__ */ e("h3", { className: "rpc-hover-card__title", children: l }),
        p ? /* @__PURE__ */ e("p", { className: "rpc-hover-card__handle", children: p }) : null
      ] })
    ] }),
    i ? /* @__PURE__ */ e("p", { className: "rpc-hover-card__description", children: i }) : null,
    s.length ? /* @__PURE__ */ e("dl", { className: "rpc-hover-card__stats", children: s.map((y, N) => /* @__PURE__ */ h("div", { className: "rpc-hover-card__stat", children: [
      /* @__PURE__ */ e("dt", { className: "rpc-hover-card__stat-label", children: y.label }),
      /* @__PURE__ */ e("dd", { className: "rpc-hover-card__stat-value", children: y.value })
    ] }, N)) }) : null,
    v && o ? /* @__PURE__ */ e("div", { className: "rpc-hover-card__content", children: o }) : null,
    u ? /* @__PURE__ */ e("div", { className: "rpc-hover-card__footer", children: u }) : null
  ] });
  return r !== void 0 ? /* @__PURE__ */ h("div", { className: H("rpc-hover-card-root", d), children: [
    r ? m(!1, "rpc-hover-card--floating") : null,
    o ? /* @__PURE__ */ e("div", { className: "rpc-hover-card__trigger", children: o }) : null
  ] }) : m(!0);
}
function G(...r) {
  return r.filter(Boolean).join(" ");
}
function pr({
  children: r,
  mode: a = "dark",
  primaryColor: c,
  primaryHoverColor: n,
  onPrimaryColor: t,
  secondaryColor: l,
  secondaryHoverColor: p,
  secondaryTextColor: i,
  dangerColor: s,
  successColor: u,
  warningColor: o,
  infoColor: g,
  backgroundColor: d,
  surfaceColor: _,
  surfaceMutedColor: m,
  textColor: v,
  mutedColor: f,
  borderColor: y,
  radius: N,
  shadow: B,
  className: M = "",
  style: P,
  ...A
}) {
  const b = {
    "--rpc-color-background": d,
    "--rpc-color-border": y,
    "--rpc-color-muted": f,
    "--rpc-color-primary": c,
    "--rpc-color-primary-dark": n,
    "--rpc-color-primary-hover": n,
    "--rpc-color-on-primary": t,
    "--rpc-color-secondary": l,
    "--rpc-color-secondary-hover": p,
    "--rpc-color-secondary-text": i,
    "--rpc-color-danger": s,
    "--rpc-color-success": u,
    "--rpc-color-warning": o,
    "--rpc-color-info": g,
    "--rpc-color-surface": _,
    "--rpc-color-surface-muted": m,
    "--rpc-color-text": v,
    "--rpc-radius": N,
    "--rpc-shadow": B,
    ...P
  };
  return /* @__PURE__ */ e(
    "div",
    {
      className: G("rpc-theme-root", `rpc-theme-root--${a}`, M),
      "data-rpc-theme": a,
      style: b,
      ...A,
      children: r
    }
  );
}
function dr({ variant: r = "info", title: a, children: c, dismissible: n = !1, onClose: t, className: l = "", ...p }) {
  return /* @__PURE__ */ h("div", { className: ["rpc-alert", `rpc-alert--${r}`, l].filter(Boolean).join(" "), role: "status", ...p, children: [
    a ? /* @__PURE__ */ e("div", { className: "rpc-alert__title", children: a }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-alert__body", children: c }),
    n ? /* @__PURE__ */ e("button", { className: "rpc-alert__close", onClick: t, "aria-label": "Close alert", children: "×" }) : null
  ] });
}
function F(...r) {
  return r.filter(Boolean).join(" ");
}
function q(r, a) {
  const c = r.as ?? "p", n = {
    "--rpc-section-heading-line-color": r.color,
    "--rpc-section-heading-line-family": r.fontFamily,
    "--rpc-section-heading-line-size": r.fontSize,
    "--rpc-section-heading-line-style": r.fontStyle,
    "--rpc-section-heading-line-weight": r.fontWeight,
    "--rpc-section-heading-line-letter-spacing": r.letterSpacing,
    "--rpc-section-heading-line-height": r.lineHeight,
    "--rpc-section-heading-line-margin": r.margin,
    "--rpc-section-heading-line-transform": r.textTransform,
    ...r.style
  };
  return /* @__PURE__ */ e(
    c,
    {
      className: F("rpc-section-heading__line", r.className),
      style: n,
      children: r.content
    },
    r.id ?? a
  );
}
function hr({
  align: r = "center",
  as: a = "header",
  className: c = "",
  description: n,
  descriptionProps: t,
  eyebrow: l,
  eyebrowProps: p,
  gap: i = "0.65rem",
  lines: s,
  maxWidth: u = "min(900px, 100%)",
  style: o,
  title: g,
  titleProps: d,
  ..._
}) {
  const m = a, v = s ?? [
    l ? {
      as: "span",
      className: "rpc-section-heading__line--eyebrow",
      content: l,
      ...p
    } : null,
    g ? {
      as: "h2",
      className: "rpc-section-heading__line--title",
      content: g,
      ...d
    } : null,
    n ? {
      as: "p",
      className: "rpc-section-heading__line--description",
      content: n,
      ...t
    } : null
  ].filter(Boolean), f = {
    "--rpc-section-heading-gap": i,
    "--rpc-section-heading-max-width": u,
    ...o
  };
  return /* @__PURE__ */ e(
    m,
    {
      className: F("rpc-section-heading", `rpc-section-heading--${r}`, c),
      style: f,
      ..._,
      children: v.map(q)
    }
  );
}
function mr({
  children: r,
  color: a = "default",
  variant: c = "soft",
  size: n = "md",
  className: t = "",
  ...l
}) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: ["rpc-chip", `rpc-chip--${a}`, `rpc-chip--${c}`, `rpc-chip--${n}`, t].filter(Boolean).join(" "),
      ...l,
      children: r
    }
  );
}
function k(...r) {
  return r.filter(Boolean).join(" ");
}
function E({ children: r, className: a = "", maxWidth: c = "xl", sticky: n = !1, ...t }) {
  return /* @__PURE__ */ e("nav", { className: k("rpc-navbar", `rpc-navbar--${c}`, n && "rpc-navbar--sticky", a), ...t, children: r });
}
function J({ children: r, className: a = "", ...c }) {
  return /* @__PURE__ */ e("div", { className: k("rpc-navbar__header", a), ...c, children: r });
}
function K({ children: r, className: a = "", ...c }) {
  return /* @__PURE__ */ e("div", { className: k("rpc-navbar__brand", a), ...c, children: r });
}
function Q({ align: r = "start", children: a, className: c = "", ...n }) {
  return /* @__PURE__ */ e("div", { className: k("rpc-navbar__section", `rpc-navbar__section--${r}`, c), ...n, children: a });
}
function X() {
  return /* @__PURE__ */ e("span", { className: "rpc-navbar__spacer", "aria-hidden": "true" });
}
const gr = Object.assign(E, {
  Brand: K,
  Header: J,
  Section: Q,
  Spacer: X
});
function rr(...r) {
  return r.filter(Boolean).join(" ");
}
function ur({
  imageSrc: r,
  imageAlt: a = "",
  badge: c,
  title: n,
  meta: t = [],
  children: l,
  width: p = "100%",
  height: i,
  contentWidth: s = "min(760px, calc(100% - 2.7rem))",
  aspectRatio: u = "21 / 9",
  minHeight: o = "320px",
  titleFontSize: g = "clamp(1.8rem, 4vw, 3rem)",
  titleFontWeight: d = 800,
  titleLineHeight: _ = "1.08",
  badgeFontSize: m = "0.78rem",
  metaFontSize: v = "clamp(0.95rem, 1.8vw, 1.12rem)",
  bodyFontSize: f = "1rem",
  imagePosition: y = "center",
  overlay: N = "strong",
  className: B = "",
  style: M,
  ...P
}) {
  const A = {
    "--rpc-image-hero-card-aspect": u,
    "--rpc-image-hero-card-body-size": f,
    "--rpc-image-hero-card-badge-size": m,
    "--rpc-image-hero-card-content-width": s,
    "--rpc-image-hero-card-height": i,
    "--rpc-image-hero-card-meta-size": v,
    "--rpc-image-hero-card-min-height": o,
    "--rpc-image-hero-card-position": y,
    "--rpc-image-hero-card-title-line-height": _,
    "--rpc-image-hero-card-title-size": g,
    "--rpc-image-hero-card-title-weight": d,
    "--rpc-image-hero-card-width": p,
    ...M
  };
  return /* @__PURE__ */ h(
    "article",
    {
      className: rr("rpc-image-hero-card", `rpc-image-hero-card--${N}`, B),
      style: A,
      ...P,
      children: [
        /* @__PURE__ */ e("img", { className: "rpc-image-hero-card__image", src: r, alt: a }),
        /* @__PURE__ */ h("div", { className: "rpc-image-hero-card__content", children: [
          c ? /* @__PURE__ */ e("span", { className: "rpc-image-hero-card__badge", children: c }) : null,
          /* @__PURE__ */ e("h3", { className: "rpc-image-hero-card__title", children: n }),
          t.length ? /* @__PURE__ */ e("div", { className: "rpc-image-hero-card__meta", children: t.map((b, w) => /* @__PURE__ */ h("div", { className: "rpc-image-hero-card__meta-item", children: [
            b.icon ? /* @__PURE__ */ e("span", { className: "rpc-image-hero-card__meta-icon", children: b.icon }) : null,
            /* @__PURE__ */ e("span", { children: b.label })
          ] }, b.id ?? w)) }) : null,
          l ? /* @__PURE__ */ e("div", { className: "rpc-image-hero-card__body", children: l }) : null
        ] })
      ]
    }
  );
}
const I = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];
function j(...r) {
  return r.filter(Boolean).join(" ");
}
function $(r, a) {
  return r.color ?? I[a % I.length];
}
function C(r) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(r);
}
function L(r) {
  const a = r.map((t) => t.value), c = Math.min(0, ...a), n = Math.max(1, ...a);
  return c === n ? { minValue: 0, maxValue: n + 1 } : { minValue: c, maxValue: n };
}
function V(r, a, c, n) {
  const { minValue: t, maxValue: l } = L(r), p = a - n * 2, i = c - n * 2, s = Math.max(1, r.length - 1);
  return r.map((u, o) => {
    const g = n + o / s * p, d = (u.value - t) / (l - t), _ = n + i - d * i;
    return { x: g, y: _ };
  });
}
function R(r) {
  return r.map((a, c) => `${c === 0 ? "M" : "L"} ${a.x} ${a.y}`).join(" ");
}
function ar(r, a) {
  if (r.length === 0)
    return "";
  const c = R(r), n = r[r.length - 1], t = r[0];
  return `${c} L ${n.x} ${a} L ${t.x} ${a} Z`;
}
function x(r, a, c, n) {
  const t = (n - 90) * Math.PI / 180;
  return {
    x: r + c * Math.cos(t),
    y: a + c * Math.sin(t)
  };
}
function cr(r, a, c, n, t) {
  const l = x(r, a, c, t), p = x(r, a, c, n), i = t - n <= 180 ? "0" : "1";
  return [`M ${l.x} ${l.y}`, `A ${c} ${c} 0 ${i} 0 ${p.x} ${p.y}`].join(" ");
}
function er(r, a, c, n, t) {
  const l = x(r, a, c, t), p = x(r, a, c, n), i = t - n <= 180 ? "0" : "1";
  return [
    `M ${r} ${a}`,
    `L ${l.x} ${l.y}`,
    `A ${c} ${c} 0 ${i} 0 ${p.x} ${p.y}`,
    "Z"
  ].join(" ");
}
function T(r) {
  return Math.max(0, Math.min(100, r));
}
function _r({
  data: r,
  height: a = 220,
  width: c = 520,
  color: n = "#2563eb",
  ariaLabel: t = "Area chart",
  className: l = "",
  ...p
}) {
  const s = V(r, c, a, 28), u = a - 28, o = R(s), g = ar(s, u), d = Y().replace(/:/g, "");
  return /* @__PURE__ */ e("div", { className: j("rpc-chart", "rpc-area-chart", l), ...p, children: /* @__PURE__ */ h("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${c} ${a}`, role: "img", "aria-label": t, children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ h("linearGradient", { id: d, x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "0%", stopColor: n, stopOpacity: "0.32" }),
      /* @__PURE__ */ e("stop", { offset: "100%", stopColor: n, stopOpacity: "0.04" })
    ] }) }),
    /* @__PURE__ */ e("line", { className: "rpc-chart__axis", x1: 28, x2: c - 28, y1: u, y2: u }),
    /* @__PURE__ */ e("path", { className: "rpc-area-chart__fill", d: g, fill: `url(#${d})` }),
    /* @__PURE__ */ e("path", { className: "rpc-area-chart__line", d: o, stroke: n }),
    s.map((_, m) => /* @__PURE__ */ h("g", { children: [
      /* @__PURE__ */ e("circle", { className: "rpc-area-chart__point", cx: _.x, cy: _.y, fill: $(r[m], m), r: "4" }),
      /* @__PURE__ */ h("title", { children: [
        r[m].label,
        ": ",
        C(r[m].value)
      ] })
    ] }, r[m].label))
  ] }) });
}
function vr({
  data: r,
  height: a = 240,
  width: c = 520,
  ariaLabel: n = "Bar chart",
  className: t = "",
  ...l
}) {
  const { minValue: s, maxValue: u } = L(r), o = c - 28 * 2, g = a - 28 * 2, d = Math.max(10, (o - 14 * Math.max(0, r.length - 1)) / Math.max(1, r.length)), _ = a - 28;
  return /* @__PURE__ */ e("div", { className: j("rpc-chart", "rpc-bar-chart", t), ...l, children: /* @__PURE__ */ h("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${c} ${a}`, role: "img", "aria-label": n, children: [
    /* @__PURE__ */ e("line", { className: "rpc-chart__axis", x1: 28, x2: c - 28, y1: _, y2: _ }),
    r.map((m, v) => {
      const y = (m.value - s) / (u - s) * g, N = 28 + v * (d + 14), B = _ - y;
      return /* @__PURE__ */ h("g", { children: [
        /* @__PURE__ */ e(
          "rect",
          {
            className: "rpc-bar-chart__bar",
            fill: $(m, v),
            height: y,
            rx: "7",
            width: d,
            x: N,
            y: B
          }
        ),
        /* @__PURE__ */ e("text", { className: "rpc-chart__label", textAnchor: "middle", x: N + d / 2, y: a - 7, children: m.label }),
        /* @__PURE__ */ h("title", { children: [
          m.label,
          ": ",
          C(m.value)
        ] })
      ] }, m.label);
    })
  ] }) });
}
function fr({ title: r, items: a, footer: c, className: n = "", ...t }) {
  return /* @__PURE__ */ h("div", { className: j("rpc-chart-tooltip", n), role: "tooltip", ...t, children: [
    r ? /* @__PURE__ */ e("div", { className: "rpc-chart-tooltip__title", children: r }) : null,
    /* @__PURE__ */ e("div", { className: "rpc-chart-tooltip__items", children: a.map((l) => /* @__PURE__ */ h("div", { className: "rpc-chart-tooltip__item", children: [
      /* @__PURE__ */ e(
        "span",
        {
          "aria-hidden": "true",
          className: "rpc-chart-tooltip__marker",
          style: l.color ? { backgroundColor: l.color } : void 0
        }
      ),
      /* @__PURE__ */ e("span", { className: "rpc-chart-tooltip__label", children: l.label }),
      /* @__PURE__ */ e("strong", { className: "rpc-chart-tooltip__value", children: typeof l.value == "number" ? C(l.value) : l.value })
    ] }, `${l.label}-${l.value}`)) }),
    c ? /* @__PURE__ */ e("div", { className: "rpc-chart-tooltip__footer", children: c }) : null
  ] });
}
function yr({
  data: r,
  height: a = 220,
  width: c = 520,
  color: n = "#2563eb",
  ariaLabel: t = "Line chart",
  className: l = "",
  ...p
}) {
  const s = V(r, c, a, 28), u = R(s), o = a - 28;
  return /* @__PURE__ */ e("div", { className: j("rpc-chart", "rpc-line-chart", l), ...p, children: /* @__PURE__ */ h("svg", { className: "rpc-chart__svg", viewBox: `0 0 ${c} ${a}`, role: "img", "aria-label": t, children: [
    /* @__PURE__ */ e("line", { className: "rpc-chart__axis", x1: 28, x2: c - 28, y1: o, y2: o }),
    /* @__PURE__ */ e("path", { className: "rpc-line-chart__line", d: u, stroke: n }),
    s.map((g, d) => /* @__PURE__ */ h("g", { children: [
      /* @__PURE__ */ e("circle", { className: "rpc-line-chart__point", cx: g.x, cy: g.y, fill: $(r[d], d), r: "4" }),
      /* @__PURE__ */ h("title", { children: [
        r[d].label,
        ": ",
        C(r[d].value)
      ] })
    ] }, r[d].label))
  ] }) });
}
function Nr({
  data: r,
  size: a = 240,
  ariaLabel: c = "Pie chart",
  showLegend: n = !0,
  className: t = "",
  ...l
}) {
  const p = a / 2 - 14, i = a / 2, s = r.reduce((o, g) => o + Math.max(0, g.value), 0);
  let u = 0;
  return /* @__PURE__ */ h("div", { className: j("rpc-chart", "rpc-pie-chart", t), ...l, children: [
    /* @__PURE__ */ e("svg", { className: "rpc-pie-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": c, children: s > 0 ? r.map((o, g) => {
      const d = Math.max(0, o.value), _ = d / s * 360, m = u, v = u + _, f = x(i, i, p * 0.62, m + _ / 2);
      return u = v, d === 0 ? null : /* @__PURE__ */ h("g", { children: [
        _ >= 359.99 ? /* @__PURE__ */ e("circle", { className: "rpc-pie-chart__slice", cx: i, cy: i, fill: $(o, g), r: p }) : /* @__PURE__ */ e(
          "path",
          {
            className: "rpc-pie-chart__slice",
            d: er(i, i, p, m, v),
            fill: $(o, g)
          }
        ),
        _ > 28 ? /* @__PURE__ */ h("text", { className: "rpc-pie-chart__value", textAnchor: "middle", x: f.x, y: f.y, children: [
          Math.round(d / s * 100),
          "%"
        ] }) : null,
        /* @__PURE__ */ h("title", { children: [
          o.label,
          ": ",
          C(o.value)
        ] })
      ] }, o.label);
    }) : /* @__PURE__ */ e("circle", { className: "rpc-chart__empty", cx: i, cy: i, r: p }) }),
    n ? /* @__PURE__ */ e("div", { className: "rpc-chart__legend", children: r.map((o, g) => /* @__PURE__ */ h("span", { className: "rpc-chart__legend-item", children: [
      /* @__PURE__ */ e("span", { className: "rpc-chart__legend-marker", style: { backgroundColor: $(o, g) } }),
      o.label
    ] }, o.label)) }) : null
  ] });
}
function br({
  data: r,
  size: a = 280,
  color: c = "#2563eb",
  levels: n = 4,
  ariaLabel: t = "Radar chart",
  className: l = "",
  ...p
}) {
  const i = a / 2, s = a / 2 - 42, { maxValue: u } = L(r), o = 360 / Math.max(1, r.length), g = r.map((d, _) => {
    const m = _ * o, v = x(i, i, s * (d.value / u), m);
    return `${v.x},${v.y}`;
  }).join(" ");
  return /* @__PURE__ */ e("div", { className: j("rpc-chart", "rpc-radar-chart", l), ...p, children: /* @__PURE__ */ h("svg", { className: "rpc-radar-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": t, children: [
    Array.from({ length: n }).map((d, _) => {
      const m = s * ((_ + 1) / n), v = r.map((f, y) => {
        const N = x(i, i, m, y * o);
        return `${N.x},${N.y}`;
      }).join(" ");
      return /* @__PURE__ */ e("polygon", { className: "rpc-radar-chart__grid", points: v }, m);
    }),
    r.map((d, _) => {
      const m = x(i, i, s, _ * o), v = x(i, i, s + 24, _ * o);
      return /* @__PURE__ */ h("g", { children: [
        /* @__PURE__ */ e("line", { className: "rpc-radar-chart__axis", x1: i, x2: m.x, y1: i, y2: m.y }),
        /* @__PURE__ */ e("text", { className: "rpc-radar-chart__label", textAnchor: "middle", x: v.x, y: v.y, children: d.label }),
        /* @__PURE__ */ h("title", { children: [
          d.label,
          ": ",
          C(d.value)
        ] })
      ] }, d.label);
    }),
    /* @__PURE__ */ e("polygon", { className: "rpc-radar-chart__area", fill: c, points: g, stroke: c })
  ] }) });
}
function xr({
  data: r,
  size: a = 260,
  strokeWidth: c = 14,
  ariaLabel: n = "Radial chart",
  className: t = "",
  ...l
}) {
  const p = a / 2, i = 18;
  return /* @__PURE__ */ h("div", { className: j("rpc-chart", "rpc-radial-chart", t), ...l, children: [
    /* @__PURE__ */ h("svg", { className: "rpc-radial-chart__svg", viewBox: `0 0 ${a} ${a}`, role: "img", "aria-label": n, children: [
      r.map((s, u) => {
        const o = p - c / 2 - 14 - u * (c + i), g = T(s.value), d = g / 100 * 359.99;
        return o <= 0 ? null : /* @__PURE__ */ h("g", { children: [
          /* @__PURE__ */ e("circle", { className: "rpc-radial-chart__track", cx: p, cy: p, r: o, strokeWidth: c }),
          g > 0 ? /* @__PURE__ */ e(
            "path",
            {
              className: "rpc-radial-chart__value",
              d: cr(p, p, o, 0, d),
              stroke: $(s, u),
              strokeWidth: c
            }
          ) : null,
          /* @__PURE__ */ h("title", { children: [
            s.label,
            ": ",
            C(g),
            "%"
          ] })
        ] }, s.label);
      }),
      /* @__PURE__ */ e("text", { className: "rpc-radial-chart__center", textAnchor: "middle", x: p, y: p, children: "%" })
    ] }),
    /* @__PURE__ */ e("div", { className: "rpc-chart__legend", children: r.map((s, u) => /* @__PURE__ */ h("span", { className: "rpc-chart__legend-item", children: [
      /* @__PURE__ */ e("span", { className: "rpc-chart__legend-marker", style: { backgroundColor: $(s, u) } }),
      s.label,
      " ",
      C(T(s.value)),
      "%"
    ] }, s.label)) })
  ] });
}
export {
  dr as A,
  vr as B,
  or as C,
  sr as H,
  ur as I,
  yr as L,
  gr as N,
  Nr as P,
  br as R,
  hr as S,
  pr as T,
  _r as a,
  lr as b,
  ir as c,
  fr as d,
  mr as e,
  xr as f
};
