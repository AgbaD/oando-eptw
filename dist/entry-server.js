import { options, h as h$1, Fragment, createContext, createElement } from "preact";
import Router, { route, Link, useRouter } from "preact-router";
import { useState, useRef, useEffect, useMemo, useContext, useCallback } from "preact/hooks";
import { PublicClientApplication } from "@azure/msal-browser";
import classNames from "classnames";
import { jsx, jsxs, Fragment as Fragment$1 } from "preact/jsx-runtime";
import { useState as useState$1, useEffect as useEffect$1, useRef as useRef$1, Children, cloneElement } from "preact/compat";
import { Toaster, toast as toast$1 } from "react-hot-toast";
import * as Yup from "yup";
import { useMsal, MsalProvider } from "@azure/msal-react";
import ReCAPTCHA from "react-google-recaptcha";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import Match from "preact-router/match";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
var n = /[\s\n\\/='"\0<>]/, o = /^(xlink|xmlns|xml)([A-Z])/, i = /^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/, a = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, c = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), s = /["&<]/;
function l(e) {
  if (0 === e.length || false === s.test(e))
    return e;
  for (var t = 0, r = 0, n2 = "", o2 = ""; r < e.length; r++) {
    switch (e.charCodeAt(r)) {
      case 34:
        o2 = "&quot;";
        break;
      case 38:
        o2 = "&amp;";
        break;
      case 60:
        o2 = "&lt;";
        break;
      default:
        continue;
    }
    r !== t && (n2 += e.slice(t, r)), n2 += o2, t = r + 1;
  }
  return r !== t && (n2 += e.slice(t, r)), n2;
}
var u = {}, f = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), p = /[A-Z]/g;
function h(e) {
  var t = "";
  for (var r in e) {
    var n2 = e[r];
    if (null != n2 && "" !== n2) {
      var o2 = "-" == r[0] ? r : u[r] || (u[r] = r.replace(p, "-$&").toLowerCase()), i2 = ";";
      "number" != typeof n2 || o2.startsWith("--") || f.has(o2) || (i2 = "px;"), t = t + o2 + ":" + n2 + i2;
    }
  }
  return t || void 0;
}
function d() {
  this.__d = true;
}
function v(e, t) {
  return { __v: e, context: t, props: e.props, setState: d, forceUpdate: d, __d: true, __h: new Array(0) };
}
var k, w, x, C, S = {}, L = [], E = Array.isArray, T = Object.assign, j = "";
function D(n2, o2, i2) {
  var a2 = options.__s;
  options.__s = true, k = options.__b, w = options.diffed, x = options.__r, C = options.unmount;
  var c2 = h$1(Fragment, null);
  c2.__k = [n2];
  try {
    var s2 = U(n2, o2 || S, false, void 0, c2, false, i2);
    return E(s2) ? s2.join(j) : s2;
  } catch (e) {
    if (e.then)
      throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
    throw e;
  } finally {
    options.__c && options.__c(n2, L), options.__s = a2, L.length = 0;
  }
}
function P(e, t) {
  var r, n2 = e.type, o2 = true;
  return e.__c ? (o2 = false, (r = e.__c).state = r.__s) : r = new n2(e.props, t), e.__c = r, r.__v = e, r.props = e.props, r.context = t, r.__d = true, null == r.state && (r.state = S), null == r.__s && (r.__s = r.state), n2.getDerivedStateFromProps ? r.state = T({}, r.state, n2.getDerivedStateFromProps(r.props, r.state)) : o2 && r.componentWillMount ? (r.componentWillMount(), r.state = r.__s !== r.state ? r.__s : r.state) : !o2 && r.componentWillUpdate && r.componentWillUpdate(), x && x(e), r.render(r.props, r.state, t);
}
function U(t, s2, u2, f2, p2, d2, _) {
  if (null == t || true === t || false === t || t === j)
    return j;
  var m = typeof t;
  if ("object" != m)
    return "function" == m ? j : "string" == m ? l(t) : t + j;
  if (E(t)) {
    var y, g = j;
    p2.__k = t;
    for (var b = t.length, A = 0; A < b; A++) {
      var L2 = t[A];
      if (null != L2 && "boolean" != typeof L2) {
        var D2, F2 = U(L2, s2, u2, f2, p2, d2, _);
        "string" == typeof F2 ? g += F2 : (y || (y = new Array(b)), g && y.push(g), g = j, E(F2) ? (D2 = y).push.apply(D2, F2) : y.push(F2));
      }
    }
    return y ? (g && y.push(g), y) : g;
  }
  if (void 0 !== t.constructor)
    return j;
  t.__ = p2, k && k(t);
  var M = t.type, W = t.props;
  if ("function" == typeof M) {
    var $, z, H, N = s2;
    if (M === Fragment) {
      if ("tpl" in W) {
        for (var q = j, B = 0; B < W.tpl.length; B++)
          if (q += W.tpl[B], W.exprs && B < W.exprs.length) {
            var I = W.exprs[B];
            if (null == I)
              continue;
            "object" != typeof I || void 0 !== I.constructor && !E(I) ? q += I : q += U(I, s2, u2, f2, t, d2, _);
          }
        return q;
      }
      if ("UNSTABLE_comment" in W)
        return "<!--" + l(W.UNSTABLE_comment) + "-->";
      z = W.children;
    } else {
      if (null != ($ = M.contextType)) {
        var O = s2[$.__c];
        N = O ? O.props.value : $.__;
      }
      var R = M.prototype && "function" == typeof M.prototype.render;
      if (R)
        z = P(t, N), H = t.__c;
      else {
        t.__c = H = v(t, N);
        for (var V = 0; H.__d && V++ < 25; )
          H.__d = false, x && x(t), z = M.call(H, W, N);
        H.__d = true;
      }
      if (null != H.getChildContext && (s2 = T({}, s2, H.getChildContext())), R && options.errorBoundaries && (M.getDerivedStateFromError || H.componentDidCatch)) {
        z = null != z && z.type === Fragment && null == z.key && null == z.props.tpl ? z.props.children : z;
        try {
          return U(z, s2, u2, f2, t, d2, _);
        } catch (e) {
          return M.getDerivedStateFromError && (H.__s = M.getDerivedStateFromError(e)), H.componentDidCatch && H.componentDidCatch(e, S), H.__d ? (z = P(t, s2), null != (H = t.__c).getChildContext && (s2 = T({}, s2, H.getChildContext())), U(z = null != z && z.type === Fragment && null == z.key && null == z.props.tpl ? z.props.children : z, s2, u2, f2, t, d2, _)) : j;
        } finally {
          w && w(t), C && C(t);
        }
      }
    }
    z = null != z && z.type === Fragment && null == z.key && null == z.props.tpl ? z.props.children : z;
    try {
      var K = U(z, s2, u2, f2, t, d2, _);
      return w && w(t), options.unmount && options.unmount(t), K;
    } catch (r) {
      if (!d2 && _ && _.onError) {
        var G = _.onError(r, t, function(e, t2) {
          return U(e, s2, u2, f2, t2, d2, _);
        });
        if (void 0 !== G)
          return G;
        var J = options.__e;
        return J && J(r, t), j;
      }
      if (!d2)
        throw r;
      if (!r || "function" != typeof r.then)
        throw r;
      return r.then(function e() {
        try {
          return U(z, s2, u2, f2, t, d2, _);
        } catch (r2) {
          if (!r2 || "function" != typeof r2.then)
            throw r2;
          return r2.then(function() {
            return U(z, s2, u2, f2, t, d2, _);
          }, e);
        }
      });
    }
  }
  var Q, X = "<" + M, Y = j;
  for (var ee in W) {
    var te = W[ee];
    if ("function" != typeof te || "class" === ee || "className" === ee) {
      switch (ee) {
        case "children":
          Q = te;
          continue;
        case "key":
        case "ref":
        case "__self":
        case "__source":
          continue;
        case "htmlFor":
          if ("for" in W)
            continue;
          ee = "for";
          break;
        case "className":
          if ("class" in W)
            continue;
          ee = "class";
          break;
        case "defaultChecked":
          ee = "checked";
          break;
        case "defaultSelected":
          ee = "selected";
          break;
        case "defaultValue":
        case "value":
          switch (ee = "value", M) {
            case "textarea":
              Q = te;
              continue;
            case "select":
              f2 = te;
              continue;
            case "option":
              f2 != te || "selected" in W || (X += " selected");
          }
          break;
        case "dangerouslySetInnerHTML":
          Y = te && te.__html;
          continue;
        case "style":
          "object" == typeof te && (te = h(te));
          break;
        case "acceptCharset":
          ee = "accept-charset";
          break;
        case "httpEquiv":
          ee = "http-equiv";
          break;
        default:
          if (o.test(ee))
            ee = ee.replace(o, "$1:$2").toLowerCase();
          else {
            if (n.test(ee))
              continue;
            "-" !== ee[4] && !c.has(ee) || null == te ? u2 ? a.test(ee) && (ee = "panose1" === ee ? "panose-1" : ee.replace(/([A-Z])/g, "-$1").toLowerCase()) : i.test(ee) && (ee = ee.toLowerCase()) : te += j;
          }
      }
      null != te && false !== te && (X = true === te || te === j ? X + " " + ee : X + " " + ee + '="' + ("string" == typeof te ? l(te) : te + j) + '"');
    }
  }
  if (n.test(M))
    throw new Error(M + " is not a valid HTML tag name in " + X + ">");
  if (Y || ("string" == typeof Q ? Y = l(Q) : null != Q && false !== Q && true !== Q && (Y = U(Q, s2, "svg" === M || "foreignObject" !== M && u2, f2, t, d2, _))), w && w(t), C && C(t), !Y && Z.has(M))
    return X + "/>";
  var re = "</" + M + ">", ne = X + ">";
  return E(Y) ? [ne].concat(Y, [re]) : "string" != typeof Y ? [ne, Y, re] : ne + Y + re;
}
var Z = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]), F = D;
const msalConfig = {
  auth: {
    clientId: "373d919d-2a08-46b9-ac26-2638978ec8ba",
    authority: "https://login.microsoftonline.com/a3329a53-02fd-4abb-94cd-6d1b954419f6",
    redirectUri: "https://oando-eptw.vercel.app/social-login",
    postLogoutRedirectUri: "https://oando-eptw.vercel.app/",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
const loginRequest = {
  scopes: ["user.read"]
};
const msalInstance = new PublicClientApplication(msalConfig);
const initializeMsal = async () => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error("Error initializing MSAL:", error);
  }
};
function Button(props) {
  const {
    children,
    variant
  } = props;
  const Node = props.href ? "a" : "button";
  const classes = classNames(props.className, "base-button", {
    "base-button--primary": variant === "primary",
    "base-button--secondary": variant === "secondary",
    "base-button--outline": variant === "outline",
    "base-button--success": variant === "success",
    "base-button--danger": variant === "danger",
    "base-button--tertiary": variant === "tertiary",
    "base-button--purple": variant === "purple",
    "base-button--loading": props.isLoading
  });
  return jsx(Node, {
    ...props,
    className: classes,
    children: props.isLoading ? jsxs(Fragment$1, {
      children: ["Please wait...", jsx(Spinner, {})]
    }) : children
  });
}
const Spinner = () => {
  return (
    // prettier-ignore
    jsxs("svg", {
      className: "base-spinner",
      viewBox: "0 0 16 16",
      fill: "none",
      children: [jsx("path", {
        d: "M8 1V3.80002",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 1"
      }), jsx("path", {
        d: "M8 12.2V15",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 5"
      }), jsx("path", {
        d: "M3.05078 3.05103L5.03179 5.03204",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 8"
      }), jsx("path", {
        d: "M10.9678 10.968L12.9488 12.949",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 4"
      }), jsx("path", {
        d: "M1 8H3.80002",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 7"
      }), jsx("path", {
        d: "M12.2012 8H15.0012",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 3"
      }), jsx("path", {
        d: "M3.05078 12.949L5.03179 10.968",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 6"
      }), jsx("path", {
        d: "M10.9678 5.03204L12.9488 3.05103",
        stroke: "black",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        style: "--index: 2"
      })]
    })
  );
};
function Input({
  label = "",
  error,
  isTouched,
  button,
  ...props
}) {
  const showError = isTouched ? Boolean(error) : false;
  return jsxs("label", {
    className: "base-input",
    children: [label ? jsx("span", {
      children: label
    }) : null, jsxs("div", {
      className: "input-wrapper",
      children: [jsx("input", {
        type: "text",
        "data-hasError": showError,
        placeholder: `Enter ${label.toLowerCase()}`,
        "data-has-value": Boolean(props.value),
        ...props
      }), button && jsx("div", {
        className: "delete-button",
        children: button
      })]
    }), showError && jsxs("p", {
      className: "base-input__error",
      children: [jsxs("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [jsx("path", {
          d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 16H12.01",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 8V12",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }), error]
    })]
  });
}
function Icon(props) {
  switch (props.name) {
    case "microsoft": {
      return (
        // prettier-ignore
        jsxs("svg", {
          ...props,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsxs("g", {
            clipPath: "url(#clip0_1_88)",
            children: [jsx("path", {
              d: "M11.4038 11.4038H0V0H11.4038V11.4038Z",
              fill: "#F1511B"
            }), jsx("path", {
              d: "M23.9961 11.4038H12.5913V0H23.9952V11.4038H23.9961Z",
              fill: "#80CC28"
            }), jsx("path", {
              d: "M11.4038 24H0V12.5962H11.4038V24Z",
              fill: "#00ADEF"
            }), jsx("path", {
              d: "M23.9961 24H12.5913V12.5962H23.9952V24H23.9961Z",
              fill: "#FBBC09"
            })]
          }), jsx("defs", {
            children: jsx("clipPath", {
              id: "clip0_1_88",
              children: jsx("rect", {
                width: "23.9962",
                height: "24",
                fill: "white"
              })
            })
          })]
        })
      );
    }
    case "export": {
      return jsx("svg", {
        ...props,
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: jsx("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M9.5 0.5H13C13.1326 0.5 13.2598 0.552678 13.3536 0.646447C13.4473 0.740215 13.5 0.867392 13.5 1V4.5C13.5 4.63261 13.4473 4.75979 13.3536 4.85355C13.2598 4.94732 13.1326 5 13 5C12.8674 5 12.7402 4.94732 12.6464 4.85355C12.5527 4.75979 12.5 4.63261 12.5 4.5V2.20667L4.35333 10.3533C4.25855 10.4417 4.13319 10.4897 4.00365 10.4874C3.87412 10.4852 3.75053 10.4327 3.65892 10.3411C3.56731 10.2495 3.51484 10.1259 3.51255 9.99635C3.51026 9.86681 3.55835 9.74145 3.64667 9.64667L11.7933 1.5H9.5C9.36739 1.5 9.24022 1.44732 9.14645 1.35355C9.05268 1.25979 9 1.13261 9 1C9 0.867392 9.05268 0.740215 9.14645 0.646447C9.24022 0.552678 9.36739 0.5 9.5 0.5ZM2.5 3.5C2.23478 3.5 1.98043 3.60536 1.79289 3.79289C1.60536 3.98043 1.5 4.23478 1.5 4.5V11.5C1.5 11.7652 1.60536 12.0196 1.79289 12.2071C1.98043 12.3946 2.23478 12.5 2.5 12.5H9.5C9.76522 12.5 10.0196 12.3946 10.2071 12.2071C10.3946 12.0196 10.5 11.7652 10.5 11.5V6C10.5 5.86739 10.5527 5.74022 10.6464 5.64645C10.7402 5.55268 10.8674 5.5 11 5.5C11.1326 5.5 11.2598 5.55268 11.3536 5.64645C11.4473 5.74022 11.5 5.86739 11.5 6V11.5C11.5 12.0304 11.2893 12.5391 10.9142 12.9142C10.5391 13.2893 10.0304 13.5 9.5 13.5H2.5C1.96957 13.5 1.46086 13.2893 1.08579 12.9142C0.710714 12.5391 0.5 12.0304 0.5 11.5V4.5C0.5 3.96957 0.710714 3.46086 1.08579 3.08579C1.46086 2.71071 1.96957 2.5 2.5 2.5H8C8.13261 2.5 8.25979 2.55268 8.35355 2.64645C8.44732 2.74021 8.5 2.86739 8.5 3C8.5 3.13261 8.44732 3.25979 8.35355 3.35355C8.25979 3.44732 8.13261 3.5 8 3.5H2.5Z",
          fill: "white"
        })
      });
    }
    case "arrow-right": {
      return (
        // prettier-ignore
        jsx("svg", {
          ...props,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M16.72 7.71995C16.8606 7.5795 17.0512 7.50061 17.25 7.50061C17.4488 7.50061 17.6394 7.5795 17.78 7.71995L21.53 11.47C21.6705 11.6106 21.7493 11.8012 21.7493 12C21.7493 12.1987 21.6705 12.3893 21.53 12.53L17.78 16.28C17.7113 16.3536 17.6285 16.4127 17.5365 16.4537C17.4445 16.4947 17.3452 16.5168 17.2445 16.5185C17.1438 16.5203 17.0438 16.5018 16.9504 16.4641C16.857 16.4264 16.7722 16.3702 16.701 16.299C16.6297 16.2278 16.5736 16.1429 16.5359 16.0495C16.4982 15.9562 16.4796 15.8561 16.4814 15.7554C16.4832 15.6547 16.5052 15.5554 16.5462 15.4634C16.5872 15.3714 16.6463 15.2886 16.72 15.22L19.19 12.75H3C2.80109 12.75 2.61032 12.6709 2.46967 12.5303C2.32902 12.3896 2.25 12.1989 2.25 12C2.25 11.801 2.32902 11.6103 2.46967 11.4696C2.61032 11.329 2.80109 11.25 3 11.25H19.19L16.72 8.77995C16.5795 8.63932 16.5007 8.4487 16.5007 8.24995C16.5007 8.0512 16.5795 7.86058 16.72 7.71995Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "process": {
      return (
        // prettier-ignore
        jsxs("svg", {
          ...props,
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M5.00195 4H9.75395C10.3501 4.00088 10.9216 4.23833 11.3428 4.66019C11.764 5.08205 12.0006 5.65384 12.0006 6.25V12.5C12.5311 12.5 13.0398 12.2893 13.4148 11.9142C13.7899 11.5391 14.0006 11.0304 14.0006 10.5V4.072C14.0006 3.06867 13.2506 2.198 12.2246 2.112C12.0751 2.09986 11.9256 2.08875 11.776 2.07867C11.6072 1.75353 11.3524 1.48098 11.0393 1.29076C10.7262 1.10054 10.3669 0.999966 10.0006 1H9.00062C8.63429 0.999966 8.27499 1.10054 7.96192 1.29076C7.64885 1.48098 7.39404 1.75353 7.22529 2.07867C7.07529 2.08867 6.92529 2.1 6.77662 2.112C5.77529 2.19667 5.03662 3.028 5.00195 4ZM9.00062 2C8.7354 2 8.48105 2.10536 8.29351 2.29289C8.10598 2.48043 8.00062 2.73478 8.00062 3H11.0006C11.0006 2.73478 10.8953 2.48043 10.7077 2.29289C10.5202 2.10536 10.2658 2 10.0006 2H9.00062Z",
            fill: "white"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M2 6.25C2 5.55933 2.56 5 3.25 5H9.75C10.4407 5 11 5.56 11 6.25V13.75C11 14.44 10.44 15 9.75 15H3.25C2.91848 15 2.60054 14.8683 2.36612 14.6339C2.1317 14.3995 2 14.0815 2 13.75V6.25ZM8.39067 9.31267C8.47359 9.20906 8.51196 9.07675 8.49733 8.94485C8.4827 8.81295 8.41628 8.69226 8.31267 8.60933C8.20906 8.52641 8.07675 8.48804 7.94485 8.50267C7.81295 8.5173 7.69226 8.58372 7.60933 8.68733L5.95867 10.7513L5.35333 10.1467C5.25855 10.0583 5.13319 10.0103 5.00365 10.0125C4.87412 10.0148 4.75053 10.0673 4.65892 10.1589C4.56731 10.2505 4.51484 10.3741 4.51255 10.5037C4.51026 10.6332 4.55835 10.7586 4.64667 10.8533L5.64667 11.8533C5.6964 11.9031 5.75606 11.9417 5.82175 11.9668C5.88744 11.9919 5.95769 12.0029 6.02791 11.999C6.09812 11.9951 6.16672 11.9764 6.22923 11.9442C6.29174 11.912 6.34675 11.8669 6.39067 11.812L8.39067 9.31267Z",
            fill: "white"
          })]
        })
      );
    }
    case "upload": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M11.47 2.47C11.6106 2.32955 11.8012 2.25066 12 2.25066C12.1988 2.25066 12.3894 2.32955 12.53 2.47L17.03 6.97C17.1625 7.11217 17.2346 7.30022 17.2312 7.49452C17.2277 7.68882 17.149 7.8742 17.0116 8.01162C16.8742 8.14903 16.6888 8.22774 16.4945 8.23117C16.3002 8.2346 16.1122 8.16248 15.97 8.03L12.75 4.81V16.5C12.75 16.6989 12.671 16.8897 12.5303 17.0303C12.3897 17.171 12.1989 17.25 12 17.25C11.8011 17.25 11.6103 17.171 11.4697 17.0303C11.329 16.8897 11.25 16.6989 11.25 16.5V4.81L8.03 8.03C7.88783 8.16248 7.69978 8.2346 7.50548 8.23117C7.31118 8.22774 7.12579 8.14903 6.98838 8.01162C6.85097 7.8742 6.77225 7.68882 6.76883 7.49452C6.7654 7.30022 6.83752 7.11217 6.97 6.97L11.47 2.47ZM3 15.75C3.19891 15.75 3.38968 15.829 3.53033 15.9697C3.67098 16.1103 3.75 16.3011 3.75 16.5V18.75C3.75 19.1478 3.90804 19.5294 4.18934 19.8107C4.47064 20.092 4.85218 20.25 5.25 20.25H18.75C19.1478 20.25 19.5294 20.092 19.8107 19.8107C20.092 19.5294 20.25 19.1478 20.25 18.75V16.5C20.25 16.3011 20.329 16.1103 20.4697 15.9697C20.6103 15.829 20.8011 15.75 21 15.75C21.1989 15.75 21.3897 15.829 21.5303 15.9697C21.671 16.1103 21.75 16.3011 21.75 16.5V18.75C21.75 19.5456 21.4339 20.3087 20.8713 20.8713C20.3087 21.4339 19.5456 21.75 18.75 21.75H5.25C4.45435 21.75 3.69129 21.4339 3.12868 20.8713C2.56607 20.3087 2.25 19.5456 2.25 18.75V16.5C2.25 16.3011 2.32902 16.1103 2.46967 15.9697C2.61032 15.829 2.80109 15.75 3 15.75Z",
            fill: "#8F92A1"
          })
        })
      );
    }
    case "x": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 32 32",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M8 24L24 8M8 8L24 24",
            stroke: "currentColor",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })
        })
      );
    }
    case "sidebar.overview": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M12.4467 1.33337H11.18C9.72669 1.33337 8.96002 2.10004 8.96002 3.55337V4.82004C8.96002 6.27337 9.72669 7.04004 11.18 7.04004H12.4467C13.9 7.04004 14.6667 6.27337 14.6667 4.82004V3.55337C14.6667 2.10004 13.9 1.33337 12.4467 1.33337Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M4.82665 8.95337H3.55998C2.09998 8.95337 1.33331 9.72004 1.33331 11.1734V12.44C1.33331 13.9 2.09998 14.6667 3.55331 14.6667H4.81998C6.27331 14.6667 7.03998 13.9 7.03998 12.4467V11.18C7.04665 9.72004 6.27998 8.95337 4.82665 8.95337Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M4.19331 7.05337C5.77285 7.05337 7.05331 5.77291 7.05331 4.19337C7.05331 2.61384 5.77285 1.33337 4.19331 1.33337C2.61378 1.33337 1.33331 2.61384 1.33331 4.19337C1.33331 5.77291 2.61378 7.05337 4.19331 7.05337Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M11.8067 14.6667C13.3862 14.6667 14.6667 13.3862 14.6667 11.8067C14.6667 10.2271 13.3862 8.94666 11.8067 8.94666C10.2271 8.94666 8.94666 10.2271 8.94666 11.8067C8.94666 13.3862 10.2271 14.6667 11.8067 14.6667Z",
            fill: "currentColor"
          })]
        })
      );
    }
    case "sidebar.permit": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M10.7933 1.33337H5.20665C2.77998 1.33337 1.33331 2.78004 1.33331 5.20671V10.7934C1.33331 13.22 2.77998 14.6667 5.20665 14.6667H10.7933C13.22 14.6667 14.6666 13.22 14.6666 10.7934V5.20671C14.6666 2.78004 13.22 1.33337 10.7933 1.33337ZM6.64665 9.93337L5.14665 11.4334C5.04665 11.5334 4.91998 11.58 4.79331 11.58C4.66665 11.58 4.53331 11.5334 4.43998 11.4334L3.93998 10.9334C3.73998 10.74 3.73998 10.42 3.93998 10.2267C4.13331 10.0334 4.44665 10.0334 4.64665 10.2267L4.79331 10.3734L5.93998 9.22671C6.13331 9.03337 6.44665 9.03337 6.64665 9.22671C6.83998 9.42004 6.83998 9.74004 6.64665 9.93337ZM6.64665 5.26671L5.14665 6.76671C5.04665 6.86671 4.91998 6.91337 4.79331 6.91337C4.66665 6.91337 4.53331 6.86671 4.43998 6.76671L3.93998 6.26671C3.73998 6.07337 3.73998 5.75337 3.93998 5.56004C4.13331 5.36671 4.44665 5.36671 4.64665 5.56004L4.79331 5.70671L5.93998 4.56004C6.13331 4.36671 6.44665 4.36671 6.64665 4.56004C6.83998 4.75337 6.83998 5.07337 6.64665 5.26671ZM11.7066 11.08H8.20665C7.93331 11.08 7.70665 10.8534 7.70665 10.58C7.70665 10.3067 7.93331 10.08 8.20665 10.08H11.7066C11.9866 10.08 12.2066 10.3067 12.2066 10.58C12.2066 10.8534 11.9866 11.08 11.7066 11.08ZM11.7066 6.41337H8.20665C7.93331 6.41337 7.70665 6.18671 7.70665 5.91337C7.70665 5.64004 7.93331 5.41337 8.20665 5.41337H11.7066C11.9866 5.41337 12.2066 5.64004 12.2066 5.91337C12.2066 6.18671 11.9866 6.41337 11.7066 6.41337Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.permit-renewals": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M5.16699 2.33203V1.33203C5.16699 1.0587 4.94033 0.832031 4.66699 0.832031C4.39366 0.832031 4.16699 1.0587 4.16699 1.33203V2.37203C4.33366 2.35203 4.48699 2.33203 4.66699 2.33203H5.16699Z",
            fill: "#8F92A1"
          }), jsx("path", {
            d: "M10.5 2.37203V1.33203C10.5 1.0587 10.2733 0.832031 10 0.832031C9.72667 0.832031 9.5 1.0587 9.5 1.33203V2.33203H10C10.18 2.33203 10.3333 2.35203 10.5 2.37203Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M14.193 9.9787C13.6797 9.57203 13.033 9.33203 12.333 9.33203C11.633 9.33203 10.973 9.5787 10.4597 9.99203C9.76634 10.5387 9.33301 11.392 9.33301 12.332C9.33301 12.892 9.49301 13.432 9.76634 13.872C9.97967 14.2187 10.253 14.5254 10.5797 14.7587C11.073 15.1187 11.673 15.332 12.333 15.332C13.093 15.332 13.7797 15.052 14.3063 14.5854C14.5397 14.392 14.7397 14.152 14.8997 13.8787C15.173 13.432 15.333 12.892 15.333 12.332C15.333 11.3787 14.8863 10.5254 14.193 9.9787ZM12.333 13.7587C12.333 12.972 11.693 12.332 10.9063 12.332C11.693 12.332 12.333 11.692 12.333 10.9054C12.333 11.692 12.973 12.332 13.7597 12.332C12.973 12.332 12.333 12.972 12.333 13.7587Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M10.4997 2.37203V3.33203C10.4997 3.60536 10.273 3.83203 9.99967 3.83203C9.72634 3.83203 9.49967 3.60536 9.49967 3.33203V2.33203H5.16634V3.33203C5.16634 3.60536 4.93967 3.83203 4.66634 3.83203C4.39301 3.83203 4.16634 3.60536 4.16634 3.33203V2.37203C2.19967 2.55203 1.33301 3.8187 1.33301 5.66536V11.332C1.33301 13.332 2.33301 14.6654 4.66634 14.6654H7.41967C7.92634 14.6654 8.26634 14.0987 8.13967 13.6054C8.04634 13.2454 7.99967 12.872 7.99967 12.4987C7.99967 11.112 8.61967 9.83203 9.69301 8.98536C10.473 8.35203 11.473 7.9987 12.4997 7.9987H12.5263C12.9463 7.9987 13.333 7.69203 13.333 7.27203V5.66536C13.333 3.8187 12.4663 2.55203 10.4997 2.37203ZM5.99967 11.1654H4.66634C4.39301 11.1654 4.16634 10.9387 4.16634 10.6654C4.16634 10.392 4.39301 10.1654 4.66634 10.1654H5.99967C6.27301 10.1654 6.49967 10.392 6.49967 10.6654C6.49967 10.9387 6.27301 11.1654 5.99967 11.1654ZM7.99967 7.83203H4.66634C4.39301 7.83203 4.16634 7.60536 4.16634 7.33203C4.16634 7.0587 4.39301 6.83203 4.66634 6.83203H7.99967C8.27301 6.83203 8.49967 7.0587 8.49967 7.33203C8.49967 7.60536 8.27301 7.83203 7.99967 7.83203Z",
            fill: "currentColor"
          })]
        })
      );
    }
    case "sidebar.work-suspension": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M10.6663 1.33203H5.33301C2.66634 1.33203 1.33301 2.66536 1.33301 5.33203V13.9987C1.33301 14.3654 1.63301 14.6654 1.99967 14.6654H10.6663C13.333 14.6654 14.6663 13.332 14.6663 10.6654V5.33203C14.6663 2.66536 13.333 1.33203 10.6663 1.33203ZM10.333 8.4987H5.66634C5.39301 8.4987 5.16634 8.27203 5.16634 7.9987C5.16634 7.72536 5.39301 7.4987 5.66634 7.4987H10.333C10.6063 7.4987 10.833 7.72536 10.833 7.9987C10.833 8.27203 10.6063 8.4987 10.333 8.4987Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.work-completion": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M14.3736 7.16036L13.4669 6.10703C13.2936 5.90703 13.1536 5.5337 13.1536 5.26703V4.1337C13.1536 3.42703 12.5736 2.84703 11.8669 2.84703H10.7336C10.4736 2.84703 10.0936 2.70703 9.89358 2.5337L8.84025 1.62703C8.38025 1.2337 7.62691 1.2337 7.16025 1.62703L6.11358 2.54036C5.91358 2.70703 5.53358 2.84703 5.27358 2.84703H4.12025C3.41358 2.84703 2.83358 3.42703 2.83358 4.1337V5.2737C2.83358 5.5337 2.69358 5.90703 2.52691 6.10703L1.62691 7.16703C1.24025 7.62703 1.24025 8.3737 1.62691 8.8337L2.52691 9.8937C2.69358 10.0937 2.83358 10.467 2.83358 10.727V11.867C2.83358 12.5737 3.41358 13.1537 4.12025 13.1537H5.27358C5.53358 13.1537 5.91358 13.2937 6.11358 13.467L7.16691 14.3737C7.62691 14.767 8.38025 14.767 8.84691 14.3737L9.90025 13.467C10.1002 13.2937 10.4736 13.1537 10.7402 13.1537H11.8736C12.5802 13.1537 13.1602 12.5737 13.1602 11.867V10.7337C13.1602 10.4737 13.3002 10.0937 13.4736 9.8937L14.3802 8.84036C14.7669 8.38036 14.7669 7.62036 14.3736 7.16036ZM10.7736 6.74036L7.55358 9.96036C7.46025 10.0537 7.33358 10.107 7.20025 10.107C7.06691 10.107 6.94025 10.0537 6.84691 9.96036L5.23358 8.34703C5.04025 8.1537 5.04025 7.8337 5.23358 7.64036C5.42691 7.44703 5.74691 7.44703 5.94025 7.64036L7.20025 8.90036L10.0669 6.0337C10.2602 5.84036 10.5802 5.84036 10.7736 6.0337C10.9669 6.22703 10.9669 6.54703 10.7736 6.74036Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.draft": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M13.667 6.79203H11.7403C10.1603 6.79203 8.87366 5.50536 8.87366 3.92536V1.9987C8.87366 1.63203 8.57366 1.33203 8.20699 1.33203H5.38033C3.32699 1.33203 1.66699 2.66536 1.66699 5.04536V10.952C1.66699 13.332 3.32699 14.6654 5.38033 14.6654H10.6203C12.6737 14.6654 14.3337 13.332 14.3337 10.952V7.4587C14.3337 7.09203 14.0337 6.79203 13.667 6.79203Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M10.5338 1.47365C10.2604 1.20032 9.78711 1.38699 9.78711 1.76699V4.09365C9.78711 5.06699 10.6138 5.87365 11.6204 5.87365C12.2538 5.88032 13.1338 5.88032 13.8871 5.88032C14.2671 5.88032 14.4671 5.43365 14.2004 5.16699C13.2404 4.20032 11.5204 2.46032 10.5338 1.47365Z",
            fill: "currentColor"
          })]
        })
      );
    }
    case "sidebar.activity": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M10.7933 1.33325H5.20665C2.77998 1.33325 1.33331 2.77992 1.33331 5.20659V10.7866C1.33331 13.2199 2.77998 14.6666 5.20665 14.6666H10.7866C13.2133 14.6666 14.66 13.2199 14.66 10.7933V5.20659C14.6666 2.77992 13.22 1.33325 10.7933 1.33325ZM11.5066 6.63992L9.96665 8.62659C9.77331 8.87325 9.49998 9.03325 9.18665 9.06659C8.87331 9.10659 8.56665 9.01992 8.31998 8.82659L7.09998 7.86659C7.05331 7.82659 6.99998 7.82659 6.97331 7.83325C6.94665 7.83325 6.89998 7.84659 6.85998 7.89992L5.27331 9.95992C5.17331 10.0866 5.02665 10.1533 4.87998 10.1533C4.77331 10.1533 4.66665 10.1199 4.57331 10.0466C4.35331 9.87992 4.31331 9.56659 4.47998 9.34659L6.06665 7.28659C6.25998 7.03992 6.53331 6.87992 6.84665 6.83992C7.15331 6.79992 7.46665 6.88659 7.71331 7.07992L8.93331 8.03992C8.97998 8.07992 9.02665 8.07992 9.05998 8.07325C9.08665 8.07325 9.13331 8.05992 9.17331 8.00659L10.7133 6.01992C10.88 5.79992 11.2 5.75992 11.4133 5.93325C11.6333 6.11325 11.6733 6.42659 11.5066 6.63992Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.reports": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M10.7933 1.33325H5.20665C2.77998 1.33325 1.33331 2.77992 1.33331 5.20659V10.7866C1.33331 13.2199 2.77998 14.6666 5.20665 14.6666H10.7866C13.2133 14.6666 14.66 13.2199 14.66 10.7933V5.20659C14.6666 2.77992 13.22 1.33325 10.7933 1.33325ZM5.08665 12.0999C5.08665 12.3733 4.85998 12.5999 4.58665 12.5999C4.31331 12.5999 4.08665 12.3733 4.08665 12.0999V10.7199C4.08665 10.4466 4.31331 10.2199 4.58665 10.2199C4.85998 10.2199 5.08665 10.4466 5.08665 10.7199V12.0999ZM8.49998 12.0999C8.49998 12.3733 8.27331 12.5999 7.99998 12.5999C7.72665 12.5999 7.49998 12.3733 7.49998 12.0999V9.33325C7.49998 9.05992 7.72665 8.83325 7.99998 8.83325C8.27331 8.83325 8.49998 9.05992 8.49998 9.33325V12.0999ZM11.9133 12.0999C11.9133 12.3733 11.6866 12.5999 11.4133 12.5999C11.14 12.5999 10.9133 12.3733 10.9133 12.0999V7.95325C10.9133 7.67992 11.14 7.45325 11.4133 7.45325C11.6866 7.45325 11.9133 7.67992 11.9133 7.95325V12.0999ZM11.9133 5.84659C11.9133 6.11992 11.6866 6.34659 11.4133 6.34659C11.14 6.34659 10.9133 6.11992 10.9133 5.84659V5.19992C9.21331 6.94659 7.08665 8.17992 4.70665 8.77325C4.66665 8.78659 4.62665 8.78659 4.58665 8.78659C4.35998 8.78659 4.15998 8.63325 4.09998 8.40659C4.03331 8.13992 4.19331 7.86659 4.46665 7.79992C6.71331 7.23992 8.71331 6.05992 10.3 4.39325H9.46665C9.19331 4.39325 8.96665 4.16659 8.96665 3.89325C8.96665 3.61992 9.19331 3.39325 9.46665 3.39325H11.42C11.4466 3.39325 11.4666 3.40659 11.4933 3.40659C11.5266 3.41325 11.56 3.41325 11.5933 3.42659C11.6266 3.43992 11.6533 3.45992 11.6866 3.47992C11.7066 3.49325 11.7266 3.49992 11.7466 3.51325C11.7533 3.51992 11.7533 3.52659 11.76 3.52659C11.7866 3.55325 11.8066 3.57992 11.8266 3.60659C11.8466 3.63325 11.8666 3.65325 11.8733 3.67992C11.8866 3.70659 11.8866 3.73325 11.8933 3.76659C11.9 3.79992 11.9133 3.83325 11.9133 3.87325C11.9133 3.87992 11.92 3.88659 11.92 3.89325V5.84659H11.9133Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.roles": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M12 1.33325H4C2.89333 1.33325 2 2.21992 2 3.31325V10.5866C2 11.6799 2.89333 12.5666 4 12.5666H4.50667C5.04 12.5666 5.54667 12.7733 5.92 13.1466L7.06 14.2733C7.58 14.7866 8.42667 14.7866 8.94667 14.2733L10.0867 13.1466C10.46 12.7733 10.9733 12.5666 11.5 12.5666H12C13.1067 12.5666 14 11.6799 14 10.5866V3.31325C14 2.21992 13.1067 1.33325 12 1.33325ZM8 3.83325C8.86 3.83325 9.55333 4.52659 9.55333 5.38659C9.55333 6.24659 8.86 6.93992 8 6.93992C7.14 6.93992 6.44667 6.23992 6.44667 5.38659C6.44667 4.52659 7.14 3.83325 8 3.83325ZM9.78667 10.0399H6.21333C5.67333 10.0399 5.36 9.43992 5.66 8.99325C6.11333 8.31992 6.99333 7.86659 8 7.86659C9.00667 7.86659 9.88667 8.31992 10.34 8.99325C10.64 9.43992 10.32 10.0399 9.78667 10.0399Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.location": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M13.7467 5.63341C13.0467 2.55341 10.36 1.16675 8 1.16675C8 1.16675 8 1.16675 7.99334 1.16675C5.64 1.16675 2.94667 2.54675 2.24667 5.62675C1.46667 9.06675 3.57334 11.9801 5.48 13.8134C6.18667 14.4934 7.09334 14.8334 8 14.8334C8.90667 14.8334 9.81334 14.4934 10.5133 13.8134C12.42 11.9801 14.5267 9.07341 13.7467 5.63341ZM8 8.97341C6.84 8.97341 5.9 8.03341 5.9 6.87341C5.9 5.71341 6.84 4.77341 8 4.77341C9.16 4.77341 10.1 5.71341 10.1 6.87341C10.1 8.03341 9.16 8.97341 8 8.97341Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.users": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M13.0067 3.89992L9.04666 1.61325C8.39999 1.23992 7.59999 1.23992 6.94666 1.61325L2.99332 3.89992C2.34666 4.27325 1.94666 4.96658 1.94666 5.71992V10.2799C1.94666 11.0266 2.34666 11.7199 2.99332 12.0999L6.95332 14.3866C7.59999 14.7599 8.39999 14.7599 9.05332 14.3866L13.0133 12.0999C13.66 11.7266 14.06 11.0333 14.06 10.2799V5.71992C14.0533 4.96658 13.6533 4.27992 13.0067 3.89992ZM7.99999 4.89325C8.85999 4.89325 9.55332 5.58659 9.55332 6.44659C9.55332 7.30658 8.85999 7.99992 7.99999 7.99992C7.13999 7.99992 6.44666 7.30658 6.44666 6.44659C6.44666 5.59325 7.13999 4.89325 7.99999 4.89325ZM9.78666 11.1066H6.21332C5.67332 11.1066 5.35999 10.5066 5.65999 10.0599C6.11332 9.38659 6.99332 8.93325 7.99999 8.93325C9.00666 8.93325 9.88666 9.38659 10.34 10.0599C10.64 10.4999 10.32 11.1066 9.78666 11.1066Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "sidebar.profile": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M14.6666 7.99992C14.6666 4.32659 11.6733 1.33325 7.99998 1.33325C4.32665 1.33325 1.33331 4.32659 1.33331 7.99992C1.33331 9.93325 2.16665 11.6733 3.48665 12.8933C3.48665 12.8999 3.48665 12.8999 3.47998 12.9066C3.54665 12.9733 3.62665 13.0266 3.69331 13.0866C3.73331 13.1199 3.76665 13.1533 3.80665 13.1799C3.92665 13.2799 4.05998 13.3733 4.18665 13.4666C4.23331 13.4999 4.27331 13.5266 4.31998 13.5599C4.44665 13.6466 4.57998 13.7266 4.71998 13.7999C4.76665 13.8266 4.81998 13.8599 4.86665 13.8866C4.99998 13.9599 5.13998 14.0266 5.28665 14.0866C5.33998 14.1133 5.39331 14.1399 5.44665 14.1599C5.59331 14.2199 5.73998 14.2733 5.88665 14.3199C5.93998 14.3399 5.99331 14.3599 6.04665 14.3733C6.20665 14.4199 6.36665 14.4599 6.52665 14.4999C6.57331 14.5133 6.61998 14.5266 6.67331 14.5333C6.85998 14.5733 7.04665 14.5999 7.23998 14.6199C7.26665 14.6199 7.29331 14.6266 7.31998 14.6333C7.54665 14.6533 7.77331 14.6666 7.99998 14.6666C8.22665 14.6666 8.45331 14.6533 8.67331 14.6333C8.69998 14.6333 8.72665 14.6266 8.75331 14.6199C8.94665 14.5999 9.13331 14.5733 9.31998 14.5333C9.36665 14.5266 9.41331 14.5066 9.46665 14.4999C9.62665 14.4599 9.79331 14.4266 9.94665 14.3733C9.99998 14.3533 10.0533 14.3333 10.1066 14.3199C10.2533 14.2666 10.4066 14.2199 10.5466 14.1599C10.6 14.1399 10.6533 14.1133 10.7066 14.0866C10.8466 14.0266 10.9866 13.9599 11.1266 13.8866C11.18 13.8599 11.2266 13.8266 11.2733 13.7999C11.4066 13.7199 11.54 13.6466 11.6733 13.5599C11.72 13.5333 11.76 13.4999 11.8066 13.4666C11.94 13.3733 12.0666 13.2799 12.1866 13.1799C12.2266 13.1466 12.26 13.1133 12.3 13.0866C12.3733 13.0266 12.4466 12.9666 12.5133 12.9066C12.5133 12.8999 12.5133 12.8999 12.5066 12.8933C13.8333 11.6733 14.6666 9.93325 14.6666 7.99992ZM11.2933 11.3133C9.48665 10.0999 6.52665 10.0999 4.70665 11.3133C4.41331 11.5066 4.17331 11.7333 3.97331 11.9799C2.95998 10.9533 2.33331 9.54659 2.33331 7.99992C2.33331 4.87325 4.87331 2.33325 7.99998 2.33325C11.1266 2.33325 13.6666 4.87325 13.6666 7.99992C13.6666 9.54659 13.04 10.9533 12.0266 11.9799C11.8333 11.7333 11.5866 11.5066 11.2933 11.3133Z",
            fill: "currentColor"
          }), jsx("path", {
            d: "M8 4.62012C6.62 4.62012 5.5 5.74012 5.5 7.12012C5.5 8.47345 6.56 9.57345 7.96667 9.61345C7.98667 9.61345 8.01333 9.61345 8.02667 9.61345C8.04 9.61345 8.06 9.61345 8.07333 9.61345C8.08 9.61345 8.08667 9.61345 8.08667 9.61345C9.43333 9.56678 10.4933 8.47345 10.5 7.12012C10.5 5.74012 9.38 4.62012 8 4.62012Z",
            fill: "currentColor"
          })]
        })
      );
    }
    case "sidebar.logout": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M9.33335 2.85333V13.1467C9.3369 13.2088 9.3369 13.2712 9.33335 13.3333C9.28387 13.6738 9.10472 13.9819 8.83335 14.1933C8.59968 14.3777 8.31102 14.4787 8.01335 14.48C7.90546 14.4797 7.79801 14.4662 7.69335 14.44L3.69335 13.44C3.40181 13.3711 3.14197 13.206 2.95571 12.9714C2.76946 12.7368 2.66764 12.4462 2.66669 12.1467V3.85333C2.66655 3.55645 2.76549 3.26801 2.94784 3.03373C3.13019 2.79945 3.38552 2.63273 3.67335 2.56L7.67335 1.56C7.85569 1.51202 8.04613 1.50327 8.23209 1.5343C8.41806 1.56534 8.59533 1.63546 8.75221 1.74005C8.90908 1.84463 9.042 1.98129 9.14217 2.14102C9.24235 2.30075 9.30751 2.4799 9.33335 2.66666C9.3369 2.72883 9.3369 2.79116 9.33335 2.85333Z",
            fill: "#D30021"
          }), jsx("path", {
            d: "M13.3333 4.00008V12.0001C13.3333 12.3537 13.1929 12.6928 12.9428 12.9429C12.6928 13.1929 12.3536 13.3334 12 13.3334H10C10.0069 13.2714 10.0069 13.2088 10 13.1467V2.85341C10.0064 2.79136 10.0064 2.72881 10 2.66675H12C12.3536 2.66675 12.6928 2.80722 12.9428 3.05727C13.1929 3.30732 13.3333 3.64646 13.3333 4.00008Z",
            fill: "#D30021"
          })]
        })
      );
    }
    case "plus": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M8 2C8.14466 2 8.2834 2.05747 8.38569 2.15976C8.48799 2.26205 8.54545 2.40079 8.54545 2.54545V7.45455H13.4545C13.5992 7.45455 13.7379 7.51201 13.8402 7.61431C13.9425 7.7166 14 7.85534 14 8C14 8.14466 13.9425 8.2834 13.8402 8.38569C13.7379 8.48799 13.5992 8.54545 13.4545 8.54545H8.54545V13.4545C8.54545 13.5992 8.48799 13.7379 8.38569 13.8402C8.2834 13.9425 8.14466 14 8 14C7.85534 14 7.7166 13.9425 7.61431 13.8402C7.51201 13.7379 7.45455 13.5992 7.45455 13.4545V8.54545H2.54545C2.40079 8.54545 2.26205 8.48799 2.15976 8.38569C2.05747 8.2834 2 8.14466 2 8C2 7.85534 2.05747 7.7166 2.15976 7.61431C2.26205 7.51201 2.40079 7.45455 2.54545 7.45455H7.45455V2.54545C7.45455 2.40079 7.51201 2.26205 7.61431 2.15976C7.7166 2.05747 7.85534 2 8 2Z",
            fill: "currentColor"
          })
        })
      );
    }
    case "diagonal-arrow": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M5.50001 2.5H13C13.1326 2.5 13.2598 2.55268 13.3536 2.64645C13.4473 2.74021 13.5 2.86739 13.5 3V10.5C13.5 10.6326 13.4473 10.7598 13.3536 10.8536C13.2598 10.9473 13.1326 11 13 11C12.8674 11 12.7402 10.9473 12.6465 10.8536C12.5527 10.7598 12.5 10.6326 12.5 10.5V4.20667L3.35334 13.3533C3.25856 13.4417 3.1332 13.4897 3.00366 13.4874C2.87413 13.4852 2.75054 13.4327 2.65893 13.3411C2.56732 13.2495 2.51485 13.1259 2.51256 12.9963C2.51027 12.8668 2.55836 12.7414 2.64668 12.6467L11.7933 3.5H5.50001C5.3674 3.5 5.24022 3.44732 5.14646 3.35355C5.05269 3.25979 5.00001 3.13261 5.00001 3C5.00001 2.86739 5.05269 2.74021 5.14646 2.64645C5.24022 2.55268 5.3674 2.5 5.50001 2.5Z",
            fill: "#8F92A1"
          })
        })
      );
    }
    case "notification": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M19.34 14.49L18.34 12.83C18.13 12.46 17.94 11.76 17.94 11.35V8.82C17.94 6.47 16.56 4.44 14.57 3.49C14.05 2.57 13.09 2 11.99 2C10.9 2 9.92 2.59 9.4 3.52C7.45 4.49 6.1 6.5 6.1 8.82V11.35C6.1 11.76 5.91 12.46 5.7 12.82L4.69 14.49C4.29 15.16 4.2 15.9 4.45 16.58C4.69 17.25 5.26 17.77 6 18.02C7.94 18.68 9.98 19 12.02 19C14.06 19 16.1 18.68 18.04 18.03C18.74 17.8 19.28 17.27 19.54 16.58C19.8 15.89 19.73 15.13 19.34 14.49Z",
            fill: "#F2B300"
          }), jsx("path", {
            d: "M14.83 20.01C14.41 21.17 13.3 22 12 22C11.21 22 10.43 21.68 9.87999 21.11C9.55999 20.81 9.31999 20.41 9.17999 20C9.30999 20.02 9.43999 20.03 9.57999 20.05C9.80999 20.08 10.05 20.11 10.29 20.13C10.86 20.18 11.44 20.21 12.02 20.21C12.59 20.21 13.16 20.18 13.72 20.13C13.93 20.11 14.14 20.1 14.34 20.07C14.5 20.05 14.66 20.03 14.83 20.01Z",
            fill: "#F2B300"
          })]
        })
      );
    }
    case "calendar": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M10.625 10.625C10.625 10.7908 10.5592 10.9497 10.4419 11.0669C10.3247 11.1842 10.1658 11.25 10 11.25C9.83424 11.25 9.67527 11.1842 9.55806 11.0669C9.44085 10.9497 9.375 10.7908 9.375 10.625C9.375 10.4592 9.44085 10.3003 9.55806 10.1831C9.67527 10.0658 9.83424 10 10 10C10.1658 10 10.3247 10.0658 10.4419 10.1831C10.5592 10.3003 10.625 10.4592 10.625 10.625ZM6.25 13.125C6.41576 13.125 6.57473 13.0592 6.69194 12.9419C6.80915 12.8247 6.875 12.6658 6.875 12.5C6.875 12.3342 6.80915 12.1753 6.69194 12.0581C6.57473 11.9408 6.41576 11.875 6.25 11.875C6.08424 11.875 5.92527 11.9408 5.80806 12.0581C5.69085 12.1753 5.625 12.3342 5.625 12.5C5.625 12.6658 5.69085 12.8247 5.80806 12.9419C5.92527 13.0592 6.08424 13.125 6.25 13.125ZM6.875 14.375C6.875 14.5408 6.80915 14.6997 6.69194 14.8169C6.57473 14.9342 6.41576 15 6.25 15C6.08424 15 5.92527 14.9342 5.80806 14.8169C5.69085 14.6997 5.625 14.5408 5.625 14.375C5.625 14.2092 5.69085 14.0503 5.80806 13.9331C5.92527 13.8158 6.08424 13.75 6.25 13.75C6.41576 13.75 6.57473 13.8158 6.69194 13.9331C6.80915 14.0503 6.875 14.2092 6.875 14.375ZM8.125 13.125C8.29076 13.125 8.44973 13.0592 8.56694 12.9419C8.68415 12.8247 8.75 12.6658 8.75 12.5C8.75 12.3342 8.68415 12.1753 8.56694 12.0581C8.44973 11.9408 8.29076 11.875 8.125 11.875C7.95924 11.875 7.80027 11.9408 7.68306 12.0581C7.56585 12.1753 7.5 12.3342 7.5 12.5C7.5 12.6658 7.56585 12.8247 7.68306 12.9419C7.80027 13.0592 7.95924 13.125 8.125 13.125ZM8.75 14.375C8.75 14.5408 8.68415 14.6997 8.56694 14.8169C8.44973 14.9342 8.29076 15 8.125 15C7.95924 15 7.80027 14.9342 7.68306 14.8169C7.56585 14.6997 7.5 14.5408 7.5 14.375C7.5 14.2092 7.56585 14.0503 7.68306 13.9331C7.80027 13.8158 7.95924 13.75 8.125 13.75C8.29076 13.75 8.44973 13.8158 8.56694 13.9331C8.68415 14.0503 8.75 14.2092 8.75 14.375ZM10 13.125C10.1658 13.125 10.3247 13.0592 10.4419 12.9419C10.5592 12.8247 10.625 12.6658 10.625 12.5C10.625 12.3342 10.5592 12.1753 10.4419 12.0581C10.3247 11.9408 10.1658 11.875 10 11.875C9.83424 11.875 9.67527 11.9408 9.55806 12.0581C9.44085 12.1753 9.375 12.3342 9.375 12.5C9.375 12.6658 9.44085 12.8247 9.55806 12.9419C9.67527 13.0592 9.83424 13.125 10 13.125ZM10.625 14.375C10.625 14.5408 10.5592 14.6997 10.4419 14.8169C10.3247 14.9342 10.1658 15 10 15C9.83424 15 9.67527 14.9342 9.55806 14.8169C9.44085 14.6997 9.375 14.5408 9.375 14.375C9.375 14.2092 9.44085 14.0503 9.55806 13.9331C9.67527 13.8158 9.83424 13.75 10 13.75C10.1658 13.75 10.3247 13.8158 10.4419 13.9331C10.5592 14.0503 10.625 14.2092 10.625 14.375ZM11.875 13.125C12.0408 13.125 12.1997 13.0592 12.3169 12.9419C12.4342 12.8247 12.5 12.6658 12.5 12.5C12.5 12.3342 12.4342 12.1753 12.3169 12.0581C12.1997 11.9408 12.0408 11.875 11.875 11.875C11.7092 11.875 11.5503 11.9408 11.4331 12.0581C11.3158 12.1753 11.25 12.3342 11.25 12.5C11.25 12.6658 11.3158 12.8247 11.4331 12.9419C11.5503 13.0592 11.7092 13.125 11.875 13.125ZM12.5 14.375C12.5 14.5408 12.4342 14.6997 12.3169 14.8169C12.1997 14.9342 12.0408 15 11.875 15C11.7092 15 11.5503 14.9342 11.4331 14.8169C11.3158 14.6997 11.25 14.5408 11.25 14.375C11.25 14.2092 11.3158 14.0503 11.4331 13.9331C11.5503 13.8158 11.7092 13.75 11.875 13.75C12.0408 13.75 12.1997 13.8158 12.3169 13.9331C12.4342 14.0503 12.5 14.2092 12.5 14.375ZM13.75 13.125C13.9158 13.125 14.0747 13.0592 14.1919 12.9419C14.3092 12.8247 14.375 12.6658 14.375 12.5C14.375 12.3342 14.3092 12.1753 14.1919 12.0581C14.0747 11.9408 13.9158 11.875 13.75 11.875C13.5842 11.875 13.4253 11.9408 13.3081 12.0581C13.1908 12.1753 13.125 12.3342 13.125 12.5C13.125 12.6658 13.1908 12.8247 13.3081 12.9419C13.4253 13.0592 13.5842 13.125 13.75 13.125ZM12.5 10.625C12.5 10.7908 12.4342 10.9497 12.3169 11.0669C12.1997 11.1842 12.0408 11.25 11.875 11.25C11.7092 11.25 11.5503 11.1842 11.4331 11.0669C11.3158 10.9497 11.25 10.7908 11.25 10.625C11.25 10.4592 11.3158 10.3003 11.4331 10.1831C11.5503 10.0658 11.7092 10 11.875 10C12.0408 10 12.1997 10.0658 12.3169 10.1831C12.4342 10.3003 12.5 10.4592 12.5 10.625ZM13.75 11.25C13.9158 11.25 14.0747 11.1842 14.1919 11.0669C14.3092 10.9497 14.375 10.7908 14.375 10.625C14.375 10.4592 14.3092 10.3003 14.1919 10.1831C14.0747 10.0658 13.9158 10 13.75 10C13.5842 10 13.4253 10.0658 13.3081 10.1831C13.1908 10.3003 13.125 10.4592 13.125 10.625C13.125 10.7908 13.1908 10.9497 13.3081 11.0669C13.4253 11.1842 13.5842 11.25 13.75 11.25Z",
            fill: "#8F92A1"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M5.625 1.875C5.79076 1.875 5.94973 1.94085 6.06694 2.05806C6.18415 2.17527 6.25 2.33424 6.25 2.5V3.75H13.75V2.5C13.75 2.33424 13.8158 2.17527 13.9331 2.05806C14.0503 1.94085 14.2092 1.875 14.375 1.875C14.5408 1.875 14.6997 1.94085 14.8169 2.05806C14.9342 2.17527 15 2.33424 15 2.5V3.75H15.625C16.288 3.75 16.9239 4.01339 17.3928 4.48223C17.8616 4.95107 18.125 5.58696 18.125 6.25V15.625C18.125 16.288 17.8616 16.9239 17.3928 17.3928C16.9239 17.8616 16.288 18.125 15.625 18.125H4.375C3.71196 18.125 3.07607 17.8616 2.60723 17.3928C2.13839 16.9239 1.875 16.288 1.875 15.625V6.25C1.875 5.58696 2.13839 4.95107 2.60723 4.48223C3.07607 4.01339 3.71196 3.75 4.375 3.75H5V2.5C5 2.33424 5.06585 2.17527 5.18306 2.05806C5.30027 1.94085 5.45924 1.875 5.625 1.875ZM16.875 9.375C16.875 9.04348 16.7433 8.72554 16.5089 8.49112C16.2745 8.2567 15.9565 8.125 15.625 8.125H4.375C4.04348 8.125 3.72554 8.2567 3.49112 8.49112C3.2567 8.72554 3.125 9.04348 3.125 9.375V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V9.375Z",
            fill: "#8F92A1"
          })]
        })
      );
    }
    case "edit": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M14.4873 1.51246C14.1591 1.18433 13.714 1 13.2499 1C12.7858 1 12.3408 1.18433 12.0126 1.51246L11.2413 2.28379L13.7159 4.75846L14.4873 3.98713C14.8154 3.65895 14.9997 3.21387 14.9997 2.74979C14.9997 2.28571 14.8154 1.84064 14.4873 1.51246ZM13.0086 5.46579L10.5339 2.99113L2.43393 11.0911C2.02249 11.5024 1.72004 12.0096 1.55393 12.5671L1.02059 14.3571C0.994843 14.4435 0.992923 14.5352 1.01503 14.6226C1.03715 14.71 1.08247 14.7898 1.1462 14.8535C1.20994 14.9173 1.28972 14.9626 1.3771 14.9847C1.46448 15.0068 1.55621 15.0049 1.64259 14.9791L3.43259 14.4458C3.99008 14.2797 4.49737 13.9772 4.90859 13.5658L13.0086 5.46579Z",
            fill: "white"
          })
        })
      );
    }
    case "delete": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "17",
          height: "16",
          viewBox: "0 0 17 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M11.5 2.9853V3.13663C12.366 3.21582 13.2285 3.32969 14.0853 3.47797C14.15 3.48917 14.2119 3.51301 14.2674 3.54812C14.3229 3.58324 14.3709 3.62893 14.4087 3.6826C14.4465 3.73628 14.4734 3.79687 14.4878 3.86093C14.5022 3.925 14.5039 3.99127 14.4927 4.05597C14.4815 4.12066 14.4576 4.18252 14.4225 4.23801C14.3874 4.29349 14.3417 4.34152 14.288 4.37934C14.2344 4.41716 14.1738 4.44405 14.1097 4.45845C14.0456 4.47286 13.9794 4.4745 13.9147 4.4633L13.7753 4.43997L13.1053 13.1533C13.0667 13.6557 12.8399 14.125 12.4702 14.4674C12.1005 14.8097 11.6152 14.9999 11.1113 15H5.88934C5.38547 14.9999 4.90017 14.8097 4.53049 14.4674C4.1608 14.125 3.93397 13.6557 3.89534 13.1533L3.22467 4.43997L3.08534 4.4633C3.02064 4.4745 2.95437 4.47286 2.89031 4.45845C2.82625 4.44405 2.76565 4.41716 2.71198 4.37934C2.60358 4.30295 2.52997 4.18663 2.50734 4.05597C2.48471 3.9253 2.51491 3.791 2.5913 3.6826C2.66769 3.57421 2.78401 3.5006 2.91467 3.47797C3.77152 3.32952 4.63399 3.21565 5.5 3.13663V2.9853C5.5 1.94263 6.30867 1.05197 7.37734 1.01797C8.12581 0.994012 8.87486 0.994012 9.62334 1.01797C10.692 1.05197 11.5 1.94263 11.5 2.9853ZM7.40934 2.0173C8.13649 1.99404 8.86419 1.99404 9.59134 2.0173C10.0933 2.0333 10.5 2.45597 10.5 2.9853V3.06063C9.1679 2.97973 7.83211 2.97973 6.5 3.06063V2.9853C6.5 2.45597 6.906 2.0333 7.40934 2.0173ZM7.17267 5.98063C7.17013 5.91497 7.15469 5.85045 7.12721 5.79076C7.09974 5.73107 7.06078 5.67738 7.01255 5.63274C6.96433 5.58811 6.90779 5.55341 6.84615 5.53063C6.78452 5.50785 6.719 5.49743 6.65334 5.49997C6.58768 5.5025 6.52316 5.51795 6.46347 5.54542C6.40378 5.5729 6.35008 5.61186 6.30545 5.66008C6.26081 5.70831 6.22611 5.76485 6.20333 5.82649C6.18055 5.88812 6.17013 5.95364 6.17267 6.0193L6.404 12.0193C6.40913 12.1518 6.46669 12.2769 6.56402 12.367C6.61222 12.4116 6.66873 12.4462 6.73032 12.469C6.79191 12.4918 6.85739 12.5022 6.923 12.4996C6.98862 12.4971 7.0531 12.4817 7.11275 12.4542C7.1724 12.4267 7.22606 12.3878 7.27066 12.3396C7.31526 12.2914 7.34994 12.2349 7.3727 12.1733C7.39547 12.1117 7.40588 12.0463 7.40334 11.9806L7.17267 5.98063ZM10.826 6.0193C10.8309 5.95238 10.8223 5.88516 10.8006 5.82164C10.779 5.75812 10.7448 5.69961 10.7001 5.64959C10.6553 5.59957 10.601 5.55907 10.5403 5.53049C10.4796 5.50191 10.4137 5.48585 10.3467 5.48325C10.2796 5.48066 10.2127 5.49158 10.15 5.51538C10.0873 5.53918 10.03 5.57536 9.9815 5.62177C9.93304 5.66818 9.89441 5.72388 9.86793 5.78553C9.84144 5.84718 9.82764 5.91353 9.82734 5.98063L9.596 11.9806C9.59088 12.1132 9.63864 12.2425 9.72878 12.3398C9.81892 12.4372 9.94406 12.4948 10.0767 12.5C10.2093 12.5051 10.3385 12.4573 10.4359 12.3672C10.5333 12.277 10.5909 12.1519 10.596 12.0193L10.826 6.0193Z",
            fill: "white"
          })
        })
      );
    }
    case "caret-left": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("g", {
            "clip-path": "url(#clip0_10_5440)",
            children: jsx("path", {
              d: "M15 6L9 12L15 18",
              stroke: "#1C1C1C",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          }), jsx("defs", {
            children: jsx("clipPath", {
              id: "clip0_10_5440",
              children: jsx("rect", {
                width: "24",
                height: "24",
                fill: "white"
              })
            })
          })]
        })
      );
    }
    case "white-caret-left": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("g", {
            "clip-path": "url(#clip0_10_5440)",
            children: jsx("path", {
              d: "M15 6L9 12L15 18",
              stroke: "white",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          }), jsx("defs", {
            children: jsx("clipPath", {
              id: "clip0_10_5440",
              children: jsx("rect", {
                width: "24",
                height: "24",
                fill: "white"
              })
            })
          })]
        })
      );
    }
    case "caret-right": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("g", {
            "clip-path": "url(#clip0_10_5440)",
            children: jsx("path", {
              d: "M9 6L15 12L9 18",
              stroke: "white",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          }), jsx("defs", {
            children: jsx("clipPath", {
              id: "clip0_10_5440",
              children: jsx("rect", {
                width: "24",
                height: "24",
                fill: "white"
              })
            })
          })]
        })
      );
    }
    case "clock": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M8.00021 3.09961C4.81355 3.09961 2.22021 5.69294 2.22021 8.87961C2.22021 12.0663 4.81355 14.6663 8.00021 14.6663C11.1869 14.6663 13.7802 12.0729 13.7802 8.88628C13.7802 5.69961 11.1869 3.09961 8.00021 3.09961ZM8.50021 8.66628C8.50021 8.93961 8.27355 9.16628 8.00021 9.16628C7.72688 9.16628 7.50021 8.93961 7.50021 8.66628V5.33294C7.50021 5.05961 7.72688 4.83294 8.00021 4.83294C8.27355 4.83294 8.50021 5.05961 8.50021 5.33294V8.66628Z",
            fill: "#E86E18"
          }), jsx("path", {
            d: "M9.9266 2.29967H6.07326C5.80659 2.29967 5.59326 2.08634 5.59326 1.81967C5.59326 1.55301 5.80659 1.33301 6.07326 1.33301H9.9266C10.1933 1.33301 10.4066 1.54634 10.4066 1.81301C10.4066 2.07967 10.1933 2.29967 9.9266 2.29967Z",
            fill: "#E86E18"
          })]
        })
      );
    }
    case "pending": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M8.00016 5.5C6.80683 5.5 5.8335 6.47333 5.8335 7.66667C5.8335 8.86 6.80683 9.83333 8.00016 9.83333C9.1935 9.83333 10.1668 8.86 10.1668 7.66667C10.1668 6.47333 9.1935 5.5 8.00016 5.5ZM8.66683 7.45333C8.66683 7.86 8.44683 8.24667 8.10016 8.45333L7.58683 8.76C7.50683 8.80667 7.42016 8.83333 7.32683 8.83333C7.16016 8.83333 6.9935 8.74667 6.90016 8.59333C6.76016 8.35333 6.8335 8.04667 7.0735 7.90667L7.58016 7.6C7.6335 7.56667 7.66016 7.51333 7.66016 7.46V6.84C7.66016 6.56667 7.88683 6.34 8.16016 6.34C8.4335 6.34 8.66683 6.56 8.66683 6.83333V7.45333Z",
            fill: "#8F92A1"
          }), jsx("path", {
            d: "M12.36 2.78009L8.69337 1.40676C8.31337 1.26676 7.69337 1.26676 7.31337 1.40676L3.6467 2.78009C2.94003 3.04676 2.3667 3.87342 2.3667 4.62676V10.0268C2.3667 10.5668 2.72003 11.2801 3.15337 11.6001L6.82003 14.3401C7.4667 14.8268 8.5267 14.8268 9.17337 14.3401L12.84 11.6001C13.2734 11.2734 13.6267 10.5668 13.6267 10.0268V4.62676C13.6334 3.87342 13.06 3.04676 12.36 2.78009ZM8.00003 10.8334C6.25337 10.8334 4.83337 9.41342 4.83337 7.66676C4.83337 5.92009 6.25337 4.50009 8.00003 4.50009C9.7467 4.50009 11.1667 5.92009 11.1667 7.66676C11.1667 9.41342 9.7467 10.8334 8.00003 10.8334Z",
            fill: "#8F92A1"
          })]
        })
      );
    }
    case "approved": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M5.73534 2.53267C6.01664 2.20815 6.36448 1.94797 6.75525 1.76979C7.14601 1.5916 7.57053 1.49959 8 1.5C8.90467 1.5 9.71534 1.9 10.2647 2.53267C10.6931 2.50207 11.1232 2.56406 11.5255 2.7144C11.9279 2.86475 12.2932 3.09994 12.5967 3.404C12.9006 3.70738 13.1357 4.07258 13.2861 4.47484C13.4364 4.87709 13.4985 5.30698 13.468 5.73533C13.7924 6.0167 14.0525 6.36457 14.2305 6.75533C14.4086 7.14609 14.5005 7.57058 14.5 8C14.5004 8.42947 14.4084 8.854 14.2302 9.24476C14.052 9.63552 13.7919 9.98336 13.4673 10.2647C13.4978 10.693 13.4357 11.1229 13.2854 11.5252C13.1351 11.9274 12.8999 12.2926 12.596 12.596C12.2926 12.8999 11.9274 13.1351 11.5252 13.2854C11.1229 13.4357 10.693 13.4978 10.2647 13.4673C9.98336 13.7919 9.63552 14.052 9.24476 14.2302C8.854 14.4084 8.42947 14.5004 8 14.5C7.57053 14.5004 7.14601 14.4084 6.75525 14.2302C6.36448 14.052 6.01664 13.7919 5.73534 13.4673C5.30692 13.498 4.87692 13.4361 4.47454 13.2859C4.07216 13.1357 3.70682 12.9006 3.40334 12.5967C3.09931 12.2932 2.86415 11.9279 2.7138 11.5255C2.56346 11.1231 2.50145 10.6931 2.532 10.2647C2.20761 9.9833 1.94755 9.63543 1.76949 9.24467C1.59142 8.85391 1.49951 8.42942 1.5 8C1.5 7.09534 1.9 6.28467 2.53267 5.73533C2.50217 5.30698 2.5642 4.87708 2.71455 4.47482C2.86489 4.07255 3.10003 3.70735 3.404 3.404C3.70735 3.10003 4.07255 2.86489 4.47482 2.71455C4.87708 2.5642 5.30698 2.50217 5.73534 2.53267ZM10.4067 6.79067C10.4467 6.73737 10.4756 6.67661 10.4918 6.61197C10.508 6.54732 10.5111 6.4801 10.5009 6.41424C10.4907 6.34838 10.4675 6.28522 10.4326 6.22847C10.3976 6.17171 10.3517 6.12252 10.2975 6.08377C10.2433 6.04502 10.1819 6.0175 10.1169 6.00282C10.0519 5.98814 9.98459 5.98661 9.91899 5.99831C9.85338 6.01001 9.79078 6.0347 9.73485 6.07094C9.67893 6.10718 9.63081 6.15423 9.59334 6.20933L7.436 9.22933L6.35334 8.14667C6.25855 8.05835 6.13319 8.01027 6.00365 8.01255C5.87412 8.01484 5.75053 8.06731 5.65892 8.15892C5.56731 8.25053 5.51484 8.37412 5.51255 8.50365C5.51027 8.63319 5.55835 8.75855 5.64667 8.85333L7.14667 10.3533C7.198 10.4046 7.25987 10.4441 7.32799 10.4691C7.39612 10.4941 7.46886 10.5039 7.54118 10.498C7.61349 10.492 7.68364 10.4704 7.74675 10.4346C7.80987 10.3988 7.86444 10.3497 7.90667 10.2907L10.4067 6.79067Z",
            fill: "#008D4E"
          })
        })
      );
    }
    case "info": {
      return (
        // prettier-ignore
        jsxs("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), jsx("path", {
            d: "M12 16H12.01",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), jsx("path", {
            d: "M12 8V12",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      );
    }
    case "rejected": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM6.85333 6.14667C6.80756 6.09754 6.75236 6.05814 6.69103 6.03081C6.62969 6.00348 6.56348 5.98879 6.49635 5.98761C6.42921 5.98642 6.36253 5.99877 6.30027 6.02392C6.23801 6.04907 6.18145 6.0865 6.13398 6.13398C6.0865 6.18145 6.04907 6.23801 6.02392 6.30027C5.99877 6.36253 5.98642 6.42921 5.98761 6.49635C5.98879 6.56348 6.00348 6.62969 6.03081 6.69103C6.05814 6.75236 6.09754 6.80756 6.14667 6.85333L7.29333 8L6.14667 9.14667C6.09754 9.19244 6.05814 9.24764 6.03081 9.30897C6.00348 9.37031 5.98879 9.43652 5.98761 9.50365C5.98642 9.57079 5.99877 9.63747 6.02392 9.69973C6.04907 9.76199 6.0865 9.81855 6.13398 9.86603C6.18145 9.9135 6.23801 9.95093 6.30027 9.97608C6.36253 10.0012 6.42921 10.0136 6.49635 10.0124C6.56348 10.0112 6.62969 9.99652 6.69103 9.96919C6.75236 9.94186 6.80756 9.90246 6.85333 9.85333L8 8.70667L9.14667 9.85333C9.19244 9.90246 9.24764 9.94186 9.30897 9.96919C9.37031 9.99652 9.43652 10.0112 9.50365 10.0124C9.57079 10.0136 9.63747 10.0012 9.69973 9.97608C9.76199 9.95093 9.81855 9.9135 9.86603 9.86603C9.9135 9.81855 9.95093 9.76199 9.97608 9.69973C10.0012 9.63747 10.0136 9.57079 10.0124 9.50365C10.0112 9.43652 9.99652 9.37031 9.96919 9.30897C9.94186 9.24764 9.90246 9.19244 9.85333 9.14667L8.70667 8L9.85333 6.85333C9.90246 6.80756 9.94186 6.75236 9.96919 6.69103C9.99652 6.62969 10.0112 6.56348 10.0124 6.49635C10.0136 6.42921 10.0012 6.36253 9.97608 6.30027C9.95093 6.23801 9.9135 6.18145 9.86603 6.13398C9.81855 6.0865 9.76199 6.04907 9.69973 6.02392C9.63747 5.99877 9.57079 5.98642 9.50365 5.98761C9.43652 5.98879 9.37031 6.00348 9.30897 6.03081C9.24764 6.05814 9.19244 6.09754 9.14667 6.14667L8 7.29333L6.85333 6.14667Z",
            fill: "#D30021"
          })
        })
      );
    }
    case "print": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M5.25 1C4.55933 1 4 1.56 4 2.25V4.24333C3.716 4.27867 3.43267 4.31667 3.15067 4.35933C2.18133 4.50467 1.5 5.348 1.5 6.304V10.5C1.5 11.0304 1.71071 11.5391 2.08579 11.9142C2.46086 12.2893 2.96957 12.5 3.5 12.5H3.68L3.57667 13.6367C3.56092 13.8096 3.58139 13.984 3.63678 14.1486C3.69217 14.3132 3.78126 14.4645 3.89837 14.5928C4.01548 14.7211 4.15804 14.8235 4.31695 14.8936C4.47586 14.9638 4.64764 15 4.82133 15H11.1787C11.3524 15 11.5241 14.9638 11.6831 14.8936C11.842 14.8235 11.9845 14.7211 12.1016 14.5928C12.2187 14.4645 12.3078 14.3132 12.3632 14.1486C12.4186 13.984 12.4391 13.8096 12.4233 13.6367L12.32 12.5H12.5C13.0304 12.5 13.5391 12.2893 13.9142 11.9142C14.2893 11.5391 14.5 11.0304 14.5 10.5V6.304C14.5 5.348 13.8187 4.504 12.8493 4.35933C12.5667 4.31715 12.2836 4.27871 12 4.244V2.25C12 1.55933 11.44 1 10.75 1H5.25ZM11 4.13667V2.25C11 2.1837 10.9737 2.12011 10.9268 2.07322C10.8799 2.02634 10.8163 2 10.75 2H5.25C5.1837 2 5.12011 2.02634 5.07322 2.07322C5.02634 2.12011 5 2.1837 5 2.25V4.13667C6.99583 3.95393 9.00417 3.95393 11 4.13667ZM10.8553 9.64667C10.974 9.65867 11.0667 9.75333 11.0773 9.87133L11.428 13.7273C11.4312 13.762 11.427 13.7969 11.4159 13.8298C11.4048 13.8628 11.387 13.893 11.3635 13.9187C11.3401 13.9444 11.3115 13.9649 11.2797 13.9788C11.2478 13.9928 11.2134 14.0001 11.1787 14H4.82133C4.78656 14.0001 4.75216 13.9928 4.72033 13.9788C4.6885 13.9649 4.65994 13.9444 4.63648 13.9187C4.61301 13.893 4.59516 13.8628 4.58405 13.8298C4.57295 13.7969 4.56885 13.762 4.572 13.7273L4.92267 9.87133C4.92792 9.81397 4.95293 9.7602 4.99342 9.71923C5.03391 9.67825 5.08737 9.65261 5.14467 9.64667C7.04319 9.45083 8.95682 9.45083 10.8553 9.64667ZM11.5 7C11.5 6.86739 11.5527 6.74022 11.6464 6.64645C11.7402 6.55268 11.8674 6.5 12 6.5H12.0053C12.1379 6.5 12.2651 6.55268 12.3589 6.64645C12.4527 6.74022 12.5053 6.86739 12.5053 7V7.00533C12.5053 7.13794 12.4527 7.26512 12.3589 7.35889C12.2651 7.45266 12.1379 7.50533 12.0053 7.50533H12C11.8674 7.50533 11.7402 7.45266 11.6464 7.35889C11.5527 7.26512 11.5 7.13794 11.5 7.00533V7ZM10 6.5C9.86739 6.5 9.74022 6.55268 9.64645 6.64645C9.55268 6.74022 9.5 6.86739 9.5 7V7.00533C9.5 7.28133 9.724 7.50533 10 7.50533H10.0053C10.1379 7.50533 10.2651 7.45266 10.3589 7.35889C10.4527 7.26512 10.5053 7.13794 10.5053 7.00533V7C10.5053 6.86739 10.4527 6.74022 10.3589 6.64645C10.2651 6.55268 10.1379 6.5 10.0053 6.5H10Z",
            fill: "white"
          })
        })
      );
    }
    case "renew": {
      return jsxs("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [jsx("path", {
          d: "M5.1665 2.33203V1.33203C5.1665 1.0587 4.93984 0.832031 4.6665 0.832031C4.39317 0.832031 4.1665 1.0587 4.1665 1.33203V2.37203C4.33317 2.35203 4.4865 2.33203 4.6665 2.33203H5.1665Z",
          fill: "white"
        }), jsx("path", {
          d: "M10.5 2.37203V1.33203C10.5 1.0587 10.2733 0.832031 10 0.832031C9.72667 0.832031 9.5 1.0587 9.5 1.33203V2.33203H10C10.18 2.33203 10.3333 2.35203 10.5 2.37203Z",
          fill: "white"
        }), jsx("path", {
          d: "M14.1935 9.9787C13.6802 9.57203 13.0335 9.33203 12.3335 9.33203C11.6335 9.33203 10.9735 9.5787 10.4602 9.99203C9.76683 10.5387 9.3335 11.392 9.3335 12.332C9.3335 12.892 9.4935 13.432 9.76683 13.872C9.98016 14.2187 10.2535 14.5254 10.5802 14.7587C11.0735 15.1187 11.6735 15.332 12.3335 15.332C13.0935 15.332 13.7802 15.052 14.3068 14.5854C14.5402 14.392 14.7402 14.152 14.9002 13.8787C15.1735 13.432 15.3335 12.892 15.3335 12.332C15.3335 11.3787 14.8868 10.5254 14.1935 9.9787ZM12.3335 13.7587C12.3335 12.972 11.6935 12.332 10.9068 12.332C11.6935 12.332 12.3335 11.692 12.3335 10.9054C12.3335 11.692 12.9735 12.332 13.7602 12.332C12.9735 12.332 12.3335 12.972 12.3335 13.7587Z",
          fill: "white"
        }), jsx("path", {
          d: "M10.5002 2.37203V3.33203C10.5002 3.60536 10.2735 3.83203 10.0002 3.83203C9.72683 3.83203 9.50016 3.60536 9.50016 3.33203V2.33203H5.16683V3.33203C5.16683 3.60536 4.94016 3.83203 4.66683 3.83203C4.3935 3.83203 4.16683 3.60536 4.16683 3.33203V2.37203C2.20016 2.55203 1.3335 3.8187 1.3335 5.66536V11.332C1.3335 13.332 2.3335 14.6654 4.66683 14.6654H7.42016C7.92683 14.6654 8.26683 14.0987 8.14016 13.6054C8.04683 13.2454 8.00016 12.872 8.00016 12.4987C8.00016 11.112 8.62016 9.83203 9.6935 8.98536C10.4735 8.35203 11.4735 7.9987 12.5002 7.9987H12.5268C12.9468 7.9987 13.3335 7.69203 13.3335 7.27203V5.66536C13.3335 3.8187 12.4668 2.55203 10.5002 2.37203ZM6.00016 11.1654H4.66683C4.3935 11.1654 4.16683 10.9387 4.16683 10.6654C4.16683 10.392 4.3935 10.1654 4.66683 10.1654H6.00016C6.2735 10.1654 6.50016 10.392 6.50016 10.6654C6.50016 10.9387 6.2735 11.1654 6.00016 11.1654ZM8.00016 7.83203H4.66683C4.3935 7.83203 4.16683 7.60536 4.16683 7.33203C4.16683 7.0587 4.3935 6.83203 4.66683 6.83203H8.00016C8.2735 6.83203 8.50016 7.0587 8.50016 7.33203C8.50016 7.60536 8.2735 7.83203 8.00016 7.83203Z",
          fill: "white"
        })]
      });
    }
    case "increase": {
      return jsx("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: jsx("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M5.735 1.23467C5.80531 1.16444 5.90062 1.125 6 1.125C6.09937 1.125 6.19469 1.16444 6.265 1.23467L8.14 3.10967C8.20624 3.18076 8.2423 3.27478 8.24059 3.37193C8.23887 3.46908 8.19952 3.56177 8.13081 3.63048C8.0621 3.69919 7.96941 3.73854 7.87226 3.74026C7.77511 3.74197 7.68109 3.70591 7.61 3.63967L6.375 2.40467V10.4997C6.375 10.5991 6.33549 10.6945 6.26516 10.7648C6.19484 10.8352 6.09946 10.8747 6 10.8747C5.90054 10.8747 5.80516 10.8352 5.73483 10.7648C5.66451 10.6945 5.625 10.5991 5.625 10.4997V2.40467L4.39 3.63967C4.31891 3.70591 4.22489 3.74197 4.12774 3.74026C4.03059 3.73854 3.9379 3.69919 3.86919 3.63048C3.80048 3.56177 3.76113 3.46908 3.75941 3.37193C3.7577 3.27478 3.79376 3.18076 3.86 3.10967L5.735 1.23467Z",
          fill: "#008D4E"
        })
      });
    }
    case "report": {
      return (
        // prettier-ignore
        jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M10.7933 1.33594H5.20668C2.78001 1.33594 1.33334 2.7826 1.33334 5.20927V10.7893C1.33334 13.2226 2.78001 14.6693 5.20668 14.6693H10.7867C13.2133 14.6693 14.66 13.2226 14.66 10.7959V5.20927C14.6667 2.7826 13.22 1.33594 10.7933 1.33594ZM5.08668 12.1026C5.08668 12.3759 4.86001 12.6026 4.58668 12.6026C4.31334 12.6026 4.08668 12.3759 4.08668 12.1026V10.7226C4.08668 10.4493 4.31334 10.2226 4.58668 10.2226C4.86001 10.2226 5.08668 10.4493 5.08668 10.7226V12.1026ZM8.50001 12.1026C8.50001 12.3759 8.27334 12.6026 8.00001 12.6026C7.72668 12.6026 7.50001 12.3759 7.50001 12.1026V9.33594C7.50001 9.0626 7.72668 8.83594 8.00001 8.83594C8.27334 8.83594 8.50001 9.0626 8.50001 9.33594V12.1026ZM11.9133 12.1026C11.9133 12.3759 11.6867 12.6026 11.4133 12.6026C11.14 12.6026 10.9133 12.3759 10.9133 12.1026V7.95594C10.9133 7.6826 11.14 7.45594 11.4133 7.45594C11.6867 7.45594 11.9133 7.6826 11.9133 7.95594V12.1026ZM11.9133 5.84927C11.9133 6.1226 11.6867 6.34927 11.4133 6.34927C11.14 6.34927 10.9133 6.1226 10.9133 5.84927V5.2026C9.21334 6.94927 7.08668 8.1826 4.70668 8.77594C4.66668 8.78927 4.62668 8.78927 4.58668 8.78927C4.36001 8.78927 4.16001 8.63594 4.10001 8.40927C4.03334 8.1426 4.19334 7.86927 4.46668 7.8026C6.71334 7.2426 8.71334 6.0626 10.3 4.39594H9.46668C9.19334 4.39594 8.96668 4.16927 8.96668 3.89594C8.96668 3.6226 9.19334 3.39594 9.46668 3.39594H11.42C11.4467 3.39594 11.4667 3.40927 11.4933 3.40927C11.5267 3.41594 11.56 3.41594 11.5933 3.42927C11.6267 3.4426 11.6533 3.4626 11.6867 3.4826C11.7067 3.49594 11.7267 3.5026 11.7467 3.51594C11.7533 3.5226 11.7533 3.52927 11.76 3.52927C11.7867 3.55594 11.8067 3.5826 11.8267 3.60927C11.8467 3.63594 11.8667 3.65594 11.8733 3.6826C11.8867 3.70927 11.8867 3.73594 11.8933 3.76927C11.9 3.8026 11.9133 3.83594 11.9133 3.87594C11.9133 3.8826 11.92 3.88927 11.92 3.89594V5.84927H11.9133Z",
            fill: "white"
          })
        })
      );
    }
    default:
      return null;
  }
}
function useForm(props) {
  const {
    initialValues = {},
    onSubmit,
    validationSchema: validationSchema2
  } = props;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const registeredFields = useRef({});
  useEffect(() => {
    validate(values);
  }, [JSON.stringify(values)]);
  async function validate(data = values) {
    var _a;
    try {
      await validationSchema2.validate(data, {
        abortEarly: false
      });
      setErrors({});
      return true;
    } catch (e) {
      const errorDump = {};
      (_a = e.inner) == null ? void 0 : _a.map((e2) => errorDump[e2.path] = e2.message);
      setErrors(errorDump);
      return false;
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(registeredFields.current);
    const isValid = await validate();
    if (isValid)
      onSubmit(values);
  }
  function handleChange({
    currentTarget: {
      value,
      name
    }
  }) {
    const _values = {
      ...values,
      [name]: value
    };
    setValues(_values);
  }
  function getFieldProps(name) {
    registeredFields.current = {
      ...registeredFields.current,
      [name]: true
    };
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: handleChange,
      onBlur: () => setTouched((prev) => ({
        ...prev,
        [name]: true
      })),
      isTouched: Boolean(touched[name])
    };
  }
  function setFieldValue(name, value) {
    const _values = {
      ...values,
      [name]: value
    };
    setValues(_values);
  }
  return {
    values,
    errors,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    isValid: Object.keys(errors).length === 0,
    reset: () => {
      setErrors({});
      setTouched({});
      setValues(initialValues);
    }
  };
}
function useRequest(func, params, autoFetch = false) {
  const [variables, setVariables] = useState$1(params);
  const [isLoading, setIsLoading] = useState$1(autoFetch);
  const [[response, error], setResponseAndError] = useState$1([null, null]);
  useEffect$1(() => {
    if (autoFetch)
      makeRequest();
  }, [JSON.stringify(params)]);
  async function makeRequest(data = params) {
    setIsLoading(true);
    setVariables(data);
    setResponseAndError([null, null]);
    const [response2, error2] = await func(data);
    setResponseAndError([response2, error2]);
    setIsLoading(false);
    return [response2, error2];
  }
  return {
    makeRequest,
    response,
    error,
    isLoading,
    variables
  };
}
function shuffle(str) {
  let j2, temp, i2;
  let a2 = str.split("");
  for (i2 = a2.length - 1; i2 > 0; i2--) {
    j2 = Math.floor(Math.random() * (i2 + 1));
    temp = a2[i2];
    a2[i2] = a2[j2];
    a2[j2] = temp;
  }
  return a2.join("");
}
const randomHash = (length) => {
  let result = "";
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLen = chars.length;
  chars = shuffle(chars);
  for (let i2 = 0; i2 < length; i2++) {
    result += chars.charAt(Math.floor(Math.random() * charsLen));
  }
  return result;
};
function capitalize(str) {
  if (!str)
    return "-";
  return str.split(" ").map((s2) => s2.charAt(0).toUpperCase() + s2.slice(1).toLowerCase()).join(" ");
}
function createParams(payload) {
  const params = new URLSearchParams();
  Object.keys(payload).map((key) => {
    if (typeof payload[key] === "string") {
      payload[key] = `${payload[key]}`.trim();
    }
    if (payload[key]) {
      params.set(key, payload[key]);
    }
  });
  return params;
}
const toOriginalFormat = (documents) => {
  const toOriginalName = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (match) => match.toUpperCase()).replace(/Cert$/, " Cert").replace(/Doc$/, " Doc").trim();
  };
  const result = [];
  for (const [key, value] of Object.entries(documents)) {
    if (key.endsWith("Type") || key.endsWith("Doc")) {
      const baseKey = key.replace(/Type$|Doc$/, "");
      const originalName = toOriginalName(baseKey);
      if (key === "otherCertName") {
        result.push({
          name: "Other Cert",
          type: documents["otherCertType"],
          doc: documents["otherCert"],
          otherCertName: value
        });
      } else if (!result.some((doc) => doc.name === originalName)) {
        result.push({
          name: originalName,
          type: documents[`${baseKey}Type`] || null,
          doc: documents[`${baseKey}Doc`] || null
        });
      }
    }
  }
  return result.filter((doc) => doc.type || doc.doc);
};
function convertSnakeCaseToTitleCase(text) {
  return text.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function getInitials(name) {
  return name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("");
}
function paginate(data, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
}
const PERMISSIONS = [{
  label: "Full Access",
  value: "FULL_ACCESS"
}, {
  label: "Create Permit",
  value: "CREATE_PERMIT"
}, {
  label: "Process Permit",
  value: "PROCESS_PERMIT"
}, {
  label: "Delete User",
  value: "DELETE_USER"
}, {
  label: "Create Internal User",
  value: "CREATE_INTERNAL_USER"
}, {
  label: "Edit Internal User",
  value: "EDIT_INTERNAL_USER"
}, {
  label: "Create External User",
  value: "CREATE_EXTERNAL_USER"
}, {
  label: "Edit External User",
  value: "EDIT_EXTERNAL_USER"
}, {
  label: "Create Role",
  value: "CREATE_ROLE"
}, {
  label: "Edit Role",
  value: "EDIT_ROLE"
}, {
  label: "Create Location",
  value: "CREATE_LOCATION"
}, {
  label: "Edit Location",
  value: "EDIT_LOCATION"
}, {
  label: "Create Company",
  value: "CREATE_COMPANY"
}, {
  label: "Edit Company",
  value: "EDIT_COMPANY"
}];
const AUTHORITIES = [{
  label: "Performing Authority",
  value: "PERFORMING"
}, {
  label: "Issuing Authority",
  value: "ISSUING"
}, {
  label: "HSE Authority",
  value: "HSE"
}, {
  label: "Authorizing Authority",
  value: "AUTHORIZING"
}, {
  label: "Performing Authorizing Supervisor",
  value: "PERFORMING_SUPERVISOR"
}, {
  label: "Safety Officer",
  value: "SAFETY_OFFICER"
}, {
  label: "Issuing Authorizing Supervisor",
  value: "ISSUING_SUPERVISOR"
}];
function toast({
  variant,
  message
}) {
  const configs = {
    success: {
      icon: "✅",
      style: {
        borderLeft: "4px solid green"
      }
    },
    error: {
      icon: "❌",
      style: {
        borderLeft: "4px solid red"
      }
    }
  };
  toast$1(capitalize(message.toString()), configs[variant]);
}
function ToastBar() {
  return jsx(Toaster, {
    position: "top-right",
    reverseOrder: false,
    gutter: 4,
    containerClassName: "",
    containerStyle: {},
    toastOptions: {
      className: "",
      duration: 5e3,
      style: {
        background: "#fff",
        color: "#393d45",
        borderRadius: "4px"
      }
    }
  });
}
const Context$8 = createContext({});
function UserProvider({
  children
}) {
  const defaultProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("auth_profile"));
    } catch {
      return null;
    }
  }, []);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [profile, setProfile] = useState(defaultProfile);
  const isAuthenticated = Boolean(token);
  function login2(data) {
    if (data == null ? void 0 : data.token) {
      localStorage.setItem("auth_token", data == null ? void 0 : data.token);
      setToken(data.token);
    }
    if (data == null ? void 0 : data.profile) {
      localStorage.setItem("auth_profile", JSON.stringify(data.profile));
      setProfile(data.profile);
    }
    route("/select-permit-role");
  }
  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_profile");
    setToken("");
    setProfile("");
    route("/login");
  }
  return jsx(Context$8.Provider, {
    value: {
      login: login2,
      logout,
      profile,
      isAuthenticated
    },
    children
  });
}
function useUserContext() {
  return useContext(Context$8);
}
async function createRequest(endpoint, method, body, content_type) {
  try {
    const config = {
      method,
      headers: {
        "Content-Type": `${content_type === "multipart/form-data" ? "" : "application/json"}`,
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      }
    };
    if (body)
      config.body = JSON.stringify(body);
    const res = await fetch(
      // `http://localhost:3000/api${endpoint}`,
      `https://eptw.ankursolutions.com/api${endpoint}`,
      config
    );
    const response = await res.json();
    if (res.status == 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_profile");
      route("/login");
    } else {
      if (!res.ok)
        return [null, response];
      return [response, null];
    }
  } catch {
    return [null, {
      message: "Something went wrong, please try again"
    }];
  }
}
function login(data) {
  return createRequest("/auth/login", "post", data);
}
function socialLogin(data) {
  return createRequest("/auth/microsoft", "post", data);
}
function forgotPassword(data) {
  return createRequest("/auth/forgot-password", "post", data);
}
function verifyForgotPasswordOtp(data) {
  return createRequest("/auth/forgot-password/verify", "post", data);
}
function resetPassword(data) {
  return createRequest("/auth/forgot-password/reset", "post", data);
}
function completeExternalOnboarding(data) {
  return createRequest(`/auth/external-user/onboard`, "POST", data);
}
function Login({}) {
  const userContext = useUserContext();
  const [activeScreen, setActiveScreen] = useState("get_started");
  const [showPassword, setShowPassword] = useState(false);
  const {
    makeRequest,
    isLoading
  } = useRequest(login);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit,
    validationSchema: validationSchema$T
  });
  async function onSubmit(data) {
    const [res, error] = await makeRequest(data);
    if (error)
      return toast({
        message: error == null ? void 0 : error.message,
        variant: "error"
      });
    userContext.login(res == null ? void 0 : res.data);
  }
  const {
    instance
  } = useMsal();
  async function handleRedirect() {
    const response = instance.loginRedirect({
      ...loginRequest,
      prompt: "create"
    });
    console.log(response);
  }
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  function onChange() {
    setIsCaptchaSuccess(true);
  }
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo",
          className: "app-login__card__logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), activeScreen === "get_started" && jsxs("div", {
        className: "app-login__card__form",
        children: [jsx("h2", {
          children: "Get Started"
        }), jsxs("p", {
          className: "app-login__card__form__desc",
          children: ["Welcome to Oando Electronic Permit To Work System e-PTW. ", jsx("br", {}), "Click the button below to get started."]
        }), jsx(Button, {
          variant: "primary",
          onClick: () => setActiveScreen("login"),
          children: "Sign In to your account"
        })]
      }), activeScreen === "login" && jsxs("form", {
        onSubmit: handleSubmit,
        className: "app-login__card__form login",
        children: [jsx("h2", {
          children: "Sign In"
        }), jsx(Input, {
          label: "Email Address",
          placeholder: "example@oando.com",
          type: "email",
          ...getFieldProps("email")
        }), jsx(Input, {
          label: "Password",
          placeholder: "Enter your password",
          type: showPassword ? "text" : "password",
          ...getFieldProps("password"),
          button: jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            width: "20",
            height: "20",
            onClick: () => setShowPassword((prev) => !prev),
            style: {
              cursor: "pointer"
            },
            children: showPassword ? jsxs(Fragment$1, {
              children: [jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 12A3 3 0 1112 9a3 3 0 013 3z"
              }), jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              })]
            }) : jsx(Fragment$1, {
              children: jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
              })
            })
          })
        }), jsx(Link, {
          href: "/forgot-password",
          className: "app-login__card__form__link",
          children: "Forgot Password"
        }), jsx(ReCAPTCHA, {
          sitekey: "6LerQJgqAAAAADS_o9r55abOFrkwKK92oFBaKK_p",
          onChange
        }), jsxs(Button, {
          variant: "primary",
          isLoading,
          disabled: !isCaptchaSuccessful,
          children: ["Login to your account", jsx(Icon, {
            name: "arrow-right"
          })]
        }), jsx("p", {
          className: "app-login__auth-method-divider",
          children: jsx("span", {
            children: "OR"
          })
        }), jsxs(Button, {
          variant: "outline",
          type: "button",
          onClick: handleRedirect,
          children: [jsx(Icon, {
            name: "microsoft"
          }), "Sign In with Microsoft"]
        })]
      })]
    }), jsx("div", {
      class: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
const validationSchema$T = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required")
});
function ForgotPassword({}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(forgotPassword);
  const {
    handleSubmit,
    getFieldProps
  } = useForm({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema$S,
    onSubmit
  });
  async function onSubmit(v2) {
    const [_, err] = await makeRequest(v2);
    if (err)
      return toast({
        variant: "error",
        message: err.message
      });
    route(`/reset-password?email=${v2.email}`);
  }
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "app-login__card__form",
        children: [jsx("h2", {
          children: "Forgotten Password?"
        }), jsx("p", {
          className: "app-login__card__form__desc",
          children: "Input your registered email address to recover password."
        }), jsx(Input, {
          placeholder: "example@oando.com",
          label: "Email Address",
          ...getFieldProps("email")
        }), jsx(Link, {
          className: "app-link",
          href: "/login",
          children: "Back to login?"
        }), jsxs(Button, {
          isLoading,
          variant: "primary",
          className: "last-btn",
          children: ["Recover Password", jsx(Icon, {
            name: "arrow-right"
          })]
        })]
      })]
    }), jsx("div", {
      class: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
const validationSchema$S = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required")
});
const CodeInput = (props) => {
  const {
    length = 6,
    onChange,
    onSubmit
  } = props;
  const [code, setCode] = useState(Array(length).fill(""));
  const codeInputWrapper = useRef(null);
  useEffect(() => {
    const value = code.join("");
    onChange && onChange(value);
    if (onSubmit && value.length === length && value.indexOf("") === -1) {
      onSubmit(value);
    }
  }, [code]);
  function handleInput(e, index) {
    const key = e.key;
    const inputs = Array.from(codeInputWrapper.current.querySelectorAll("input"));
    const copiedCode = [...code];
    if (key === "Backspace") {
      copiedCode[index] = "";
      setCode(copiedCode);
      if (index > 0) {
        inputs[index - 1].focus();
      }
      e.preventDefault();
    } else if (key >= "0" && key <= "9") {
      copiedCode[index] = key;
      setCode(copiedCode);
      if (index < length - 1) {
        inputs[index + 1].focus();
      } else {
        inputs[index].blur();
      }
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }
  function handlePaste(e) {
    var _a;
    e.preventDefault();
    const pastedValue = ((_a = e.clipboardData) == null ? void 0 : _a.getData("text").trim()) || "";
    const sanitizedValue = pastedValue.replace(/[^0-9]/g, "");
    const results = sanitizedValue.split("").slice(0, length);
    const inputs = Array.from(codeInputWrapper.current.querySelectorAll("input"));
    const newCode = [...code];
    results.forEach((val, i2) => {
      newCode[i2] = val;
    });
    setCode(newCode);
    const nextFieldIndex = results.length < length ? results.length : length - 1;
    if (inputs[nextFieldIndex]) {
      inputs[nextFieldIndex].focus();
    } else {
      inputs[length - 1].blur();
    }
  }
  return jsx("div", {
    className: "base-code-input",
    ref: codeInputWrapper,
    children: code.map((value, index) => jsx("input", {
      value,
      className: "base-code-input__field",
      type: "text",
      maxLength: 1,
      onKeyDown: (e) => handleInput(e, index),
      onPaste: (e) => handlePaste(e),
      onFocus: (e) => e.target.select()
    }, index))
  });
};
function ResetPassword({}) {
  const router = useRouter();
  const email = router[0].matches.email;
  const {
    makeRequest,
    isLoading
  } = useRequest(verifyForgotPasswordOtp);
  const resendOtpApi = useRequest(forgotPassword, {
    email
  });
  const {
    handleSubmit,
    setFieldValue,
    getFieldProps
  } = useForm({
    onSubmit,
    initialValues: {
      otp: "",
      email
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required")
    })
  });
  const otpField = getFieldProps("otp");
  const [timer, setTimer] = useState$1(120);
  const [canResend, setCanResend] = useState$1(false);
  const [isOtpVerified, setIsOtpVerified] = useState$1(false);
  const [token, setToken] = useState$1("");
  useEffect$1(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1e3);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  async function onSubmit(v2) {
    const [res, err] = await makeRequest({
      ...v2,
      otp: Number(v2.otp)
    });
    if (err) {
      toast({
        variant: "error",
        message: err.message
      });
      return;
    }
    setIsOtpVerified(true);
    setToken(res == null ? void 0 : res.data);
  }
  async function resendOtp() {
    if (!canResend)
      return;
    const [_, err] = await resendOtpApi.makeRequest();
    if (err)
      return toast({
        variant: "error",
        message: err.message
      });
    toast({
      variant: "success",
      message: "OTP resent successfully"
    });
    setTimer(120);
    setCanResend(false);
  }
  if (isOtpVerified) {
    if (token !== "")
      return jsx(ResetPasswordForm$1, {
        token
      });
  }
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "app-login__card__form",
        children: [jsx("h2", {
          children: "Verify Email Address"
        }), jsxs("p", {
          className: "app-login__card__form__desc",
          children: ["A 6-digit code has been sent to", " ", jsx("span", {
            className: "app-link",
            children: email
          }), ". Input the code below to proceed."]
        }), jsx(CodeInput, {
          length: 6,
          onChange: (value) => {
            if (value.length <= 6) {
              setFieldValue("otp", value);
            }
          }
        }), jsx(Link, {
          className: "app-link",
          href: "/login",
          children: "Back to login?"
        }), otpField.isTouched && otpField.error ? jsxs("p", {
          className: "base-input__error",
          children: [jsx(Icon, {
            name: "info"
          }), otpField.error]
        }) : null, jsxs(Button, {
          isLoading,
          variant: "primary",
          className: "last-btn",
          children: ["Verify", jsx(Icon, {
            name: "arrow-right"
          })]
        }), jsxs("p", {
          className: "app-login__card__footer-text",
          children: ["Didn’t get a code?", " ", jsx("button", {
            className: "app-link",
            onClick: resendOtp,
            type: "button",
            disabled: !canResend,
            children: resendOtpApi.isLoading ? "Resending..." : canResend ? "Resend Code" : `Wait ${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`
          })]
        })]
      })]
    }), jsx("div", {
      className: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
function ResetPasswordForm$1({
  token
}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(resetPassword);
  const {
    handleSubmit,
    getFieldProps
  } = useForm({
    initialValues: {
      token,
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema$R,
    onSubmit
  });
  const [showPassword, setShowPassword] = useState$1(false);
  async function onSubmit(v2) {
    console.log(v2);
    const [_, err] = await makeRequest(v2);
    if (err)
      return toast({
        variant: "error",
        message: err.message
      });
    route("/login");
  }
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "app-login__card__form",
        children: [jsx("h2", {
          children: "Reset Password?"
        }), jsx("p", {
          className: "app-login__card__form__desc",
          children: "Input and confirm your new password below."
        }), jsx(Input, {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
          ...getFieldProps("password"),
          button: jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            width: "20",
            height: "20",
            onClick: () => setShowPassword((prev) => !prev),
            style: {
              cursor: "pointer"
            },
            children: showPassword ? jsxs(Fragment$1, {
              children: [jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 12A3 3 0 1112 9a3 3 0 013 3z"
              }), jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              })]
            }) : jsx(Fragment$1, {
              children: jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
              })
            })
          })
        }), jsx(Input, {
          label: "Confirm Password",
          placeholder: "Re-enter your password",
          type: "password",
          ...getFieldProps("confirmPassword"),
          button: jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            width: "20",
            height: "20",
            onClick: () => setShowPassword((prev) => !prev),
            style: {
              cursor: "pointer"
            },
            children: showPassword ? jsxs(Fragment$1, {
              children: [jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 12A3 3 0 1112 9a3 3 0 013 3z"
              }), jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              })]
            }) : jsx(Fragment$1, {
              children: jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
              })
            })
          })
        }), jsxs(Button, {
          isLoading,
          variant: "primary",
          className: "last-btn",
          type: "submit",
          children: ["Save password", jsx(Icon, {
            name: "arrow-right"
          })]
        })]
      })]
    }), jsx("div", {
      className: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
const validationSchema$R = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm your password")
});
function getOverview() {
  return createRequest("/profile/dash/overview", "GET");
}
function getAnalytics() {
  return createRequest("/profile/dash/analytics", "GET");
}
function Search({
  onSearch,
  ...props
}) {
  const handleInputChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };
  return jsxs("div", {
    className: "base-search",
    children: [jsx("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: jsx("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M10.5 3.75001C9.61358 3.75001 8.73583 3.9246 7.91689 4.26382C7.09794 4.60304 6.35382 5.10024 5.72703 5.72704C5.10023 6.35384 4.60303 7.09795 4.26381 7.9169C3.92459 8.73585 3.75 9.61359 3.75 10.5C3.75 11.3864 3.92459 12.2642 4.26381 13.0831C4.60303 13.9021 5.10023 14.6462 5.72703 15.273C6.35382 15.8998 7.09794 16.397 7.91689 16.7362C8.73583 17.0754 9.61358 17.25 10.5 17.25C12.2902 17.25 14.0071 16.5389 15.273 15.273C16.5388 14.0071 17.25 12.2902 17.25 10.5C17.25 8.7098 16.5388 6.99291 15.273 5.72704C14.0071 4.46117 12.2902 3.75001 10.5 3.75001ZM2.25 10.5C2.25017 9.17511 2.56944 7.86973 3.18079 6.69431C3.79214 5.51889 4.67759 4.50799 5.76224 3.74713C6.84689 2.98627 8.09883 2.49784 9.41216 2.32314C10.7255 2.14843 12.0616 2.29261 13.3074 2.74347C14.5533 3.19432 15.6722 3.9386 16.5695 4.91333C17.4669 5.88807 18.1163 7.06459 18.4628 8.34337C18.8094 9.62216 18.8428 10.9656 18.5603 12.26C18.2778 13.5545 17.6878 14.7618 16.84 15.78L21.53 20.47C21.6037 20.5387 21.6628 20.6215 21.7038 20.7135C21.7448 20.8055 21.7668 20.9048 21.7686 21.0055C21.7704 21.1062 21.7518 21.2062 21.7141 21.2996C21.6764 21.393 21.6203 21.4778 21.549 21.549C21.4778 21.6203 21.393 21.6764 21.2996 21.7141C21.2062 21.7519 21.1062 21.7704 21.0055 21.7686C20.9048 21.7668 20.8055 21.7448 20.7135 21.7038C20.6215 21.6628 20.5387 21.6037 20.47 21.53L15.78 16.84C14.5752 17.8435 13.1094 18.4829 11.5543 18.6833C9.99922 18.8837 8.41922 18.6367 6.99941 17.9714C5.5796 17.3061 4.37878 16.25 3.53763 14.9267C2.69648 13.6035 2.24983 12.068 2.25 10.5Z",
        fill: "#8F92A1"
      })
    }), jsx("input", {
      type: "text",
      placeholder: "Search",
      ...props,
      onChange: handleInputChange
    })]
  });
}
function Header({
  title
}) {
  return jsxs("div", {
    className: "app-page__header",
    children: [jsx("h3", {
      children: title
    }), jsx(Search, {
      onSearch: ""
    }), jsx("span", {
      className: "app-page__header__divider"
    })]
  });
}
function Drafts$1({
  drafts
}) {
  return jsxs("div", {
    className: "app-overview__drafts",
    children: [jsxs("div", {
      className: "app-overview__drafts__header",
      children: [jsx(Icon, {
        name: "sidebar.draft"
      }), jsx("h1", {
        children: "Drafts"
      }), jsxs("a", {
        href: "/permit-drafts",
        children: ["View all", jsx(Icon, {
          name: "diagonal-arrow"
        })]
      })]
    }), drafts ? jsx(Fragment$1, {
      children: drafts == null ? void 0 : drafts.map((draft) => {
        var _a, _b;
        return jsxs("div", {
          className: "app-overview__draft",
          children: [jsxs("div", {
            children: [jsx("p", {
              children: draft.workDescription
            }), jsxs("span", {
              children: [(draft == null ? void 0 : draft.contractor) ? jsxs(Fragment$1, {
                children: [" ", jsxs("strong", {
                  children: [(_a = draft == null ? void 0 : draft.contractor) == null ? void 0 : _a.firstname, " ", (_b = draft == null ? void 0 : draft.contractor) == null ? void 0 : _b.lastname]
                }), " ", "•", " "]
              }) : null, " ", dayjs().format("DD/MM/YYYY")]
            })]
          }), jsx(Icon, {
            name: "diagonal-arrow"
          })]
        }, draft == null ? void 0 : draft.id);
      })
    }) : jsxs("div", {
      className: "base-empty",
      style: {
        margin: "50px auto"
      },
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: "No drafts available yet"
      })]
    })]
  });
}
function Table({
  children
}) {
  return jsx("table", {
    className: "base-table",
    cellSpacing: 0,
    children
  });
}
function TableHead({
  children
}) {
  return jsx("thead", {
    className: "base-table__head",
    children
  });
}
function TableBody({
  children
}) {
  return jsx("tbody", {
    children
  });
}
function TableRow({
  children
}) {
  return jsx("tr", {
    className: "base-table__row",
    children
  });
}
function TableCell({
  children
}) {
  return jsx("td", {
    className: "base-table__cell",
    children
  });
}
function Permits({
  closedPermits
}) {
  return jsxs(Fragment$1, {
    children: [jsxs("div", {
      className: "app-overview__permits-header",
      children: [jsx("h4", {
        children: "Recently Closed Permits"
      }), jsxs("button", {
        onClick: () => route("/permit-storage"),
        children: ["View all", jsx(Icon, {
          name: "diagonal-arrow"
        })]
      })]
    }), (closedPermits == null ? void 0 : closedPermits.length) ? jsxs(Fragment$1, {
      children: [jsx("div", {
        className: "hide-display-mobile",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "PTW ID"
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Work To Be Performed"
              }), jsx(TableCell, {
                children: "Work Location"
              }), jsx(TableCell, {
                children: "Date Closed"
              })]
            })
          }), jsx(TableBody, {
            children: closedPermits == null ? void 0 : closedPermits.map((permit) => {
              var _a;
              return jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: permit == null ? void 0 : permit.publicId
                }), jsx(TableCell, {
                  children: (_a = permit == null ? void 0 : permit.type) == null ? void 0 : _a.replace(/_/g, " ")
                }), jsx(TableCell, {
                  children: permit == null ? void 0 : permit.workDescription
                }), jsx(TableCell, {
                  children: permit == null ? void 0 : permit.workArea
                }), jsx(TableCell, {}), jsx(TableCell, {})]
              }, permit == null ? void 0 : permit.publicId);
            })
          })]
        })
      }), jsxs("div", {
        className: "hide-display-web",
        children: [closedPermits == null ? void 0 : closedPermits.map((permit) => {
          var _a;
          return jsxs("div", {
            className: "app-overview__permits-sm-table",
            children: [jsxs("div", {
              className: "flex",
              children: [jsx("span", {
                children: permit == null ? void 0 : permit.publicId
              }), jsx("p", {
                children: (_a = permit == null ? void 0 : permit.type) == null ? void 0 : _a.replace(/_/g, " ")
              })]
            }), jsx("h4", {
              children: `${permit == null ? void 0 : permit.workDescription.charAt(0).toUpperCase()}${permit == null ? void 0 : permit.workDescription.slice(1)}`
            }), jsxs("p", {
              children: ["Date Closed: ", permit == null ? void 0 : permit.workArea]
            })]
          });
        }), jsx("br", {}), jsx("br", {})]
      })]
    }) : jsxs("div", {
      className: "base-empty",
      style: {
        margin: "100px auto"
      },
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: "No closed permits available"
      })]
    })]
  });
}
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      const isArray = Array.isArray(ref);
      if (isArray && ref.every((r) => shouldTriggerCallback(r, e))) {
        callback();
      } else if (!isArray && shouldTriggerCallback(ref, e)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
  function shouldTriggerCallback(ref2, e) {
    if (ref2 && "current" in ref2) {
      return !ref2.current.contains(e.target);
    }
    return false;
  }
};
function Dropdown({
  children,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState$1(false);
  const dropdownRef = useRef$1(null);
  useClickOutside([dropdownRef], () => {
    setIsOpen(false);
  });
  const DecoratedChildren = Children.map(children, (child) => cloneElement(child, {
    isOpen,
    setIsOpen
  }));
  return jsx("div", {
    className: classNames("base-dropdown", className),
    ref: dropdownRef,
    children: DecoratedChildren
  });
}
function DropdownTrigger({
  children,
  isOpen,
  setIsOpen
}) {
  return jsxs("button", {
    className: "base-dropdown__trigger",
    "data-active": isOpen,
    onClick: () => setIsOpen((prev) => !prev),
    children: [jsx("span", {
      children
    }), jsx("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: jsx("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.35334 10.8534C8.25959 10.947 8.13251 10.9996 8.00001 10.9996C7.86751 10.9996 7.74043 10.947 7.64668 10.8534L2.64668 5.85335C2.55836 5.75857 2.51027 5.63321 2.51256 5.50367C2.51485 5.37414 2.56732 5.25055 2.65893 5.15894C2.75054 5.06733 2.87413 5.01486 3.00366 5.01257C3.1332 5.01029 3.25856 5.05837 3.35334 5.14669L8.00001 9.79335L12.6467 5.14669C12.6925 5.09756 12.7477 5.05816 12.809 5.03083C12.8703 5.00351 12.9365 4.98881 13.0037 4.98763C13.0708 4.98644 13.1375 4.99879 13.1997 5.02394C13.262 5.04909 13.3186 5.08652 13.366 5.134C13.4135 5.18147 13.4509 5.23803 13.4761 5.30029C13.5012 5.36255 13.5136 5.42923 13.5124 5.49637C13.5112 5.5635 13.4965 5.62971 13.4692 5.69105C13.4419 5.75238 13.4025 5.80758 13.3533 5.85335L8.35334 10.8534Z",
        fill: "#8F92A1"
      })
    })]
  });
}
function DropdownContent({
  children,
  isOpen
}) {
  if (!isOpen)
    return null;
  const DecoratedChildren = Children.map(children, (child) => cloneElement(child, {
    isOpen
  }));
  return jsx("div", {
    className: "base-dropdown__content",
    children: DecoratedChildren
  });
}
const PERIOD_LIST = [{
  label: "Today"
}, {
  label: "Last 7 days"
}, {
  label: "Last 30 days"
}, {
  label: "Last 90 days"
}, {
  label: "This month"
}, {
  label: "This year"
}];
function DateFilter(props) {
  const {
    variant = "primary",
    setDateRange
  } = props;
  if (variant === "secondary") {
    return jsx(SecondaryDateFilter, {
      setDateRange
    });
  }
  return jsxs(Dropdown, {
    className: "base-date-filter",
    children: [jsx(DropdownTrigger, {
      children: "Last 30 days"
    }), jsx(DropdownContent, {
      children: PERIOD_LIST.map((period) => jsx("button", {
        className: "base-date-filter__option",
        children: period.label
      }, period.label))
    })]
  });
}
function SecondaryDateFilter({
  setDateRange
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    if (setDateRange) {
      setDateRange({
        startDate,
        endDate
      });
    }
  }, [startDate, endDate]);
  return jsxs("div", {
    className: "base-date-filter--secondary",
    children: [jsx("p", {
      children: "Filter by: "
    }), jsxs("div", {
      className: "base-date-filter--secondary__buttons",
      children: [jsxs(Dropdown, {
        className: "calendar-dropdown",
        children: [jsxs(DropdownTrigger, {
          children: [jsx(Icon, {
            name: "calendar"
          }), jsx("span", {
            style: {
              marginLeft: 5
            },
            children: startDate ? startDate.toDateString() : "Start date"
          })]
        }), jsx(DropdownContent, {
          children: jsx(DatePicker, {
            selected: startDate,
            onChange: (date) => setStartDate(date),
            inline: true
          })
        })]
      }), jsx("span", {
        children: "---"
      }), jsxs(Dropdown, {
        className: "calendar-dropdown",
        children: [jsxs(DropdownTrigger, {
          children: [jsx(Icon, {
            name: "calendar"
          }), jsx("span", {
            style: {
              marginLeft: 5
            },
            children: endDate ? endDate.toDateString() : "End date"
          })]
        }), jsx(DropdownContent, {
          children: jsx(DatePicker, {
            selected: endDate,
            onChange: (date) => setEndDate(date),
            inline: true
          })
        })]
      })]
    })]
  });
}
function Stats({
  metrics
}) {
  return jsxs("div", {
    className: "app-overview__stats",
    children: [jsxs("div", {
      className: "app-overview__stats__header",
      children: [jsxs("div", {
        className: "hide-display-mobile",
        children: [jsx("h3", {
          className: "app-overview__stats__title",
          children: "Permit Metrics"
        }), jsx(DateFilter, {})]
      }), jsxs(Button, {
        href: "/permit/create",
        variant: "primary",
        children: [jsx(Icon, {
          name: "plus"
        }), " Create Permit"]
      }), jsxs("div", {
        className: "hide-display-web permit",
        children: [jsx("h3", {
          className: "app-overview__stats__title",
          children: "Permit Metrics"
        }), jsx(DateFilter, {})]
      })]
    }), jsxs("div", {
      className: "app-overview__stats__wrapper",
      children: [jsxs("div", {
        className: "app-overview__stats__stat",
        children: [jsxs("svg", {
          width: "40",
          height: "40",
          viewBox: "0 0 40 40",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("circle", {
            cx: "20",
            cy: "20",
            r: "20",
            fill: "#F2B300",
            "fill-opacity": "0.1"
          }), jsx("path", {
            d: "M24.19 10H15.81C12.17 10 10 12.17 10 15.81V24.19C10 27.83 12.17 30 15.81 30H24.19C27.83 30 30 27.83 30 24.19V15.81C30 12.17 27.83 10 24.19 10ZM17.97 22.9L15.72 25.15C15.57 25.3 15.38 25.37 15.19 25.37C15 25.37 14.8 25.3 14.66 25.15L13.91 24.4C13.61 24.11 13.61 23.63 13.91 23.34C14.2 23.05 14.67 23.05 14.97 23.34L15.19 23.56L16.91 21.84C17.2 21.55 17.67 21.55 17.97 21.84C18.26 22.13 18.26 22.61 17.97 22.9ZM17.97 15.9L15.72 18.15C15.57 18.3 15.38 18.37 15.19 18.37C15 18.37 14.8 18.3 14.66 18.15L13.91 17.4C13.61 17.11 13.61 16.63 13.91 16.34C14.2 16.05 14.67 16.05 14.97 16.34L15.19 16.56L16.91 14.84C17.2 14.55 17.67 14.55 17.97 14.84C18.26 15.13 18.26 15.61 17.97 15.9ZM25.56 24.62H20.31C19.9 24.62 19.56 24.28 19.56 23.87C19.56 23.46 19.9 23.12 20.31 23.12H25.56C25.98 23.12 26.31 23.46 26.31 23.87C26.31 24.28 25.98 24.62 25.56 24.62ZM25.56 17.62H20.31C19.9 17.62 19.56 17.28 19.56 16.87C19.56 16.46 19.9 16.12 20.31 16.12H25.56C25.98 16.12 26.31 16.46 26.31 16.87C26.31 17.28 25.98 17.62 25.56 17.62Z",
            fill: "#F2B300"
          })]
        }), jsx("p", {
          children: "All Permits"
        }), jsx("h4", {
          children: (metrics == null ? void 0 : metrics.allPermitCount) ?? 0
        })]
      }), jsxs("div", {
        className: "app-overview__stats__stat",
        children: [jsxs("svg", {
          width: "40",
          height: "40",
          viewBox: "0 0 40 40",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("circle", {
            cx: "20",
            cy: "20",
            r: "20",
            fill: "#FFEFE4"
          }), jsx("path", {
            d: "M28.5 18.19H25.61C23.24 18.19 21.31 16.26 21.31 13.89V11C21.31 10.45 20.86 10 20.31 10H16.07C12.99 10 10.5 12 10.5 15.57V24.43C10.5 28 12.99 30 16.07 30H23.93C27.01 30 29.5 28 29.5 24.43V19.19C29.5 18.64 29.05 18.19 28.5 18.19Z",
            fill: "#E86E18"
          }), jsx("path", {
            d: "M23.8 10.21C23.39 9.79999 22.68 10.08 22.68 10.65V14.14C22.68 15.6 23.92 16.81 25.43 16.81C26.38 16.82 27.7 16.82 28.83 16.82C29.4 16.82 29.7 16.15 29.3 15.75C27.86 14.3 25.28 11.69 23.8 10.21Z",
            fill: "#E86E18"
          })]
        }), jsx("p", {
          children: "Drafts"
        }), jsx("h4", {
          children: (metrics == null ? void 0 : metrics.allDraftCount) ?? 0
        })]
      }), jsxs("div", {
        className: "app-overview__stats__stat",
        children: [jsx("div", {
          className: "purple-container",
          children: jsx("img", {
            src: "/svgs/document-normal.svg",
            alt: ""
          })
        }), jsx("p", {
          children: "Ongoing"
        }), jsx("h4", {
          children: (metrics == null ? void 0 : metrics.ongoingPermitCount) ?? 0
        })]
      }), jsxs("div", {
        className: "app-overview__stats__stat",
        children: [jsxs("svg", {
          width: "41",
          height: "40",
          viewBox: "0 0 41 40",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("circle", {
            cx: "20.3333",
            cy: "20",
            r: "20",
            fill: "#DFF2EA"
          }), jsx("path", {
            d: "M22.6833 10H17.9833C16.9433 10 16.0933 10.84 16.0933 11.88V12.82C16.0933 13.86 16.9333 14.7 17.9733 14.7H22.6833C23.7233 14.7 24.5633 13.86 24.5633 12.82V11.88C24.5733 10.84 23.7233 10 22.6833 10Z",
            fill: "#008D4E"
          }), jsx("path", {
            d: "M25.5733 12.82C25.5733 14.41 24.2733 15.71 22.6833 15.71H17.9833C16.3933 15.71 15.0933 14.41 15.0933 12.82C15.0933 12.26 14.4933 11.91 13.9933 12.17C12.5833 12.92 11.6233 14.41 11.6233 16.12V25.53C11.6233 27.99 13.6333 30 16.0933 30H24.5733C27.0333 30 29.0433 27.99 29.0433 25.53V16.12C29.0433 14.41 28.0833 12.92 26.6733 12.17C26.1733 11.91 25.5733 12.26 25.5733 12.82ZM23.6733 20.73L19.6733 24.73C19.5233 24.88 19.3333 24.95 19.1433 24.95C18.9533 24.95 18.7633 24.88 18.6133 24.73L17.1133 23.23C16.8233 22.94 16.8233 22.46 17.1133 22.17C17.4033 21.88 17.8833 21.88 18.1733 22.17L19.1433 23.14L22.6133 19.67C22.9033 19.38 23.3833 19.38 23.6733 19.67C23.9633 19.96 23.9633 20.44 23.6733 20.73Z",
            fill: "#008D4E"
          })]
        }), jsx("p", {
          children: "Closed"
        }), jsx("h4", {
          children: (metrics == null ? void 0 : metrics.closedPermitsCount) ?? 0
        })]
      })]
    })]
  });
}
const DraftContext = createContext(null);
function removeCircularReferences$1(obj) {
  const seen = /* @__PURE__ */ new Set();
  function cleaner(obj2) {
    if (obj2 && typeof obj2 === "object") {
      if (seen.has(obj2)) {
        return;
      }
      seen.add(obj2);
      Object.keys(obj2).forEach((key) => {
        obj2[key] = cleaner(obj2[key]);
      });
    }
    return obj2;
  }
  return cleaner(obj);
}
const DraftDetailsProvider = ({
  children
}) => {
  const [draft, setDraft] = useState(() => {
    const savedDraft = localStorage.getItem("draft-details");
    return savedDraft ? JSON.parse(savedDraft) : null;
  });
  const [isDraft, setIsDraft] = useState(() => {
    const savedIsDraft = localStorage.getItem("is-draft");
    return savedIsDraft === "true";
  });
  useEffect(() => {
    if (draft) {
      const cleanedDraft = removeCircularReferences$1(draft);
      localStorage.setItem("draft-details", JSON.stringify(cleanedDraft));
    }
  }, [draft]);
  useEffect(() => {
    localStorage.setItem("is-draft", isDraft.toString());
  }, [isDraft]);
  const updateDraft = (newDraft) => {
    setDraft(newDraft);
  };
  const updateIsDraft = (value) => {
    setIsDraft(value);
  };
  return jsx(DraftContext.Provider, {
    value: {
      draft,
      updateDraft,
      isDraft,
      updateIsDraft
    },
    children
  });
};
const useDraftDetails = () => {
  return useContext(DraftContext);
};
function Overview({}) {
  var _a, _b;
  const {
    response
  } = useRequest(getOverview, {}, true);
  const metrics = response == null ? void 0 : response.data;
  const closedPermits = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.closedPermits;
  const drafts = (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.drafts;
  const {
    updateIsDraft
  } = useDraftDetails();
  useEffect(() => {
    updateIsDraft(false);
  }, []);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Overview"
    }), jsxs("div", {
      className: "app-page app-overview__grid",
      children: [jsxs("div", {
        children: [jsx(Stats, {
          metrics
        }), jsx("div", {
          className: "hide-display-web",
          children: jsx(Drafts$1, {
            drafts
          })
        }), jsx(Permits, {
          closedPermits
        })]
      }), jsx("div", {
        className: "hide-display-mobile",
        children: jsx(Drafts$1, {
          drafts
        })
      })]
    })]
  });
}
function Sidebar() {
  const {
    profile
  } = useUserContext();
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const getProfilePermissions = async () => {
      try {
        const response = await createRequest(`/profile/${profile.id}`, "GET");
        setPermissions(response[0].data.role.permissions);
      } catch (error) {
        console.log(error);
      }
    };
    getProfilePermissions();
  }, [profile]);
  const filterRoutes = () => {
    if ((profile == null ? void 0 : profile.type) === "EXTERNAL") {
      return [ROUTES[1], ROUTES[3], ROUTES[4]];
    }
    if ((profile == null ? void 0 : profile.type) === "INTERNAL") {
      if (permissions.includes("FULL_ACCESS")) {
        return ROUTES;
      }
      return ROUTES.map((group) => {
        const filteredPages = group.pages.filter((page) => {
          if (page.path.startsWith("/roles") && permissions.includes("CREATE_ROLE")) {
            return true;
          }
          if (page.path.startsWith("/locations") && permissions.includes("CREATE_LOCATION")) {
            return true;
          }
          if (page.path.startsWith("/users") && permissions.some((perm) => ["CREATE_INTERNAL_USER", "CREATE_EXTERNAL_USER", "CREATE_COMPANY", "EDIT_INTERNAL_USER", "EDIT_EXTERNAL_USER", "EDIT_COMPANY", "DELETE USER"].includes(perm))) {
            return true;
          }
          if (page.path.startsWith("/permit") && permissions.some((perm) => ["CREATE_PERMIT", "PROCESS PERMIT"].includes(perm))) {
            return true;
          }
          return ["/profile", ""].includes(page.path);
        });
        return filteredPages.length > 0 ? {
          ...group,
          pages: filteredPages
        } : null;
      }).filter(Boolean);
    }
    return [];
  };
  const filteredRoutes = filterRoutes();
  return jsxs("div", {
    className: "app-layout__sidebar",
    children: [jsx("div", {
      className: "app-layout__sidebar__logo",
      children: jsx("img", {
        src: "/svgs/logo.sidebar.svg"
      })
    }), jsx("div", {
      className: "app-layout__sidebar__nav",
      children: filteredRoutes.map((group) => jsxs("div", {
        className: "app-layout__sidebar__nav__links",
        children: [group.title ? jsx("p", {
          children: group.title
        }) : null, group.pages.map((page) => createElement(NavLink, {
          page,
          key: page.path
        }))]
      }, group.title || "untitled-group"))
    })]
  });
}
function NavLink({
  page
}) {
  const [{
    url
  }] = useRouter();
  const {
    logout
  } = useUserContext();
  const isHomePage = page.path === "/";
  if (!page.path) {
    return jsxs("button", {
      onClick: logout,
      children: [jsx("div", {
        className: "icons-container",
        children: jsxs("div", {
          className: "icons",
          children: [jsx(Icon, {
            name: page.iconName
          }), jsx(Icon, {
            name: page.iconName
          })]
        })
      }), page.label]
    });
  }
  return jsx(Match, {
    path: page.path,
    children: ({
      matches
    }) => jsxs(Link, {
      className: matches || url.startsWith(page.path) && !isHomePage ? "active" : "inactive",
      href: page.path,
      children: [jsx("div", {
        className: "icons-container",
        children: jsxs("div", {
          className: "icons",
          children: [jsx(Icon, {
            name: page.iconName
          }), jsx(Icon, {
            name: page.iconName
          })]
        })
      }), page.label]
    })
  });
}
const ROUTES = [{
  title: "",
  pages: [{
    path: "/",
    label: "Overview",
    iconName: "sidebar.overview"
  }, {
    path: "/audits",
    label: "Audits",
    iconName: "sidebar.activity"
  }, {
    path: "/analytics",
    label: "Analytics & Reports",
    iconName: "sidebar.reports"
  }]
}, {
  title: "Permit Management",
  pages: [{
    path: "/permit-drafts",
    label: "Drafts",
    iconName: "sidebar.draft"
  }, {
    path: "/permit-workflows",
    label: "Workflow",
    iconName: "sidebar.permit"
  }, {
    path: "/permit-activities",
    label: "Activities",
    iconName: "sidebar.permit-renewals"
  }, {
    path: "/permit-monitoring",
    label: "Monitoring",
    iconName: "sidebar.work-suspension"
  }, {
    path: "/permit-storage",
    label: "Storage",
    iconName: "sidebar.work-completion"
  }]
}, {
  title: "User Management",
  pages: [{
    path: "/roles",
    label: "Roles & Permissions",
    iconName: "sidebar.roles"
  }, {
    path: "/locations",
    label: "Locations",
    iconName: "sidebar.location"
  }, {
    path: "/users",
    label: "Users",
    iconName: "sidebar.users"
  }]
}, {
  title: "",
  pages: [{
    path: "/profile",
    label: "Profile",
    iconName: "sidebar.profile"
  }]
}, {
  title: "",
  pages: [{
    path: "",
    label: "Logout",
    iconName: "sidebar.logout"
  }]
}];
function AppLayout({
  children
}) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return jsxs("div", {
    className: "app-layout",
    children: [jsxs("div", {
      className: "",
      children: [jsx("div", {
        className: "",
        children: jsx("div", {
          className: "menu-toggle",
          children: isSidebarVisible ? jsx("button", {
            onClick: toggleSidebar,
            className: "toggle-button",
            children: jsx(Icon, {
              name: "x"
            })
          }) : jsx("img", {
            src: "/svgs/menu.svg",
            onClick: toggleSidebar,
            alt: "menu",
            title: "menu",
            className: "toggle-button"
          })
        })
      }), jsx("div", {
        className: `${isSidebarVisible ? "app-layout--sidebar-visible" : "app-layout--sidebar-hidden"}`,
        children: jsx(Sidebar, {})
      })]
    }), jsx("div", {
      className: "app-layout__content",
      children
    })]
  });
}
function createNewRole(data) {
  return createRequest("/role", "POST", data);
}
function getRoles() {
  return createRequest("/role", "GET");
}
function editRole(data) {
  return createRequest("/role", "PUT", data);
}
function createNewLocation(data) {
  return createRequest("/location", "POST", data);
}
function createNewWorkArea(data) {
  return createRequest("/location/work-area", "POST", data);
}
function editLocation(data) {
  return createRequest("/location", "PUT", data);
}
function getSites() {
  return createRequest("/location/site", "GET");
}
function getAllCompanies() {
  return createRequest("/profile/company", "GET");
}
function editCompany(data, id) {
  return createRequest(`/profile/company/${id}`, "PUT", data);
}
function createInternalUser(data) {
  return createRequest("/profile/internal", "POST", data);
}
function editInternalUser(data) {
  return createRequest("/profile/internal", "PUT", data);
}
function createNewCompany(data) {
  return createRequest("/profile/company", "POST", data);
}
function createExternalUser(data) {
  return createRequest("/profile/external", "POST", data);
}
function editExternalUser(data) {
  return createRequest("/profile/external", "PUT", data);
}
function getAllInternalUsers() {
  return createRequest("/profile?type=internal", "GET");
}
function getAudits() {
  return createRequest("/audit", "GET");
}
function getAllPermits() {
  return createRequest("/permit", "GET");
}
function getAllDrafts() {
  return createRequest("/permit/draft", "GET");
}
const useModal = (props) => {
  const [state, setState] = useState(props);
  const toggle = useCallback((key) => {
    setState((s2) => {
      const newState = {
        ...s2
      };
      newState[key] = !newState[key];
      return newState;
    });
  }, []);
  return {
    modals: state,
    toggle
  };
};
function Modal({
  children,
  show,
  toggle,
  align = "right"
}) {
  if (!show)
    return null;
  const decoratedChildren = Children.map(children, (child) => cloneElement(child, {
    toggle
  }));
  return jsxs("div", {
    className: "app-modal",
    "data-align": align,
    children: [jsx("div", {
      className: "app-modal__overlay",
      onClick: toggle
    }), jsxs("div", {
      className: "app-modal__content",
      children: [decoratedChildren, align === "right" && jsx("img", {
        className: "app-modal__blur",
        src: "/svgs/auth-blur.svg"
      })]
    })]
  });
}
function ModalHeader({
  children,
  toggle
}) {
  return jsxs("div", {
    className: "app-modal__header",
    children: [jsx("h4", {
      children
    }), jsx("button", {
      onClick: toggle,
      children: jsx(Icon, {
        name: "x"
      })
    })]
  });
}
function ModalBody({
  children
}) {
  return jsx("div", {
    className: "app-modal__body",
    children
  });
}
function ModalDetail(props) {
  const {
    label,
    children
  } = props;
  return jsxs("div", {
    className: "app-modal__detail",
    children: [jsx("div", {
      className: "app-modal__detail__key",
      children: label
    }), jsx("div", {
      className: "app-modal__detail__value",
      children
    })]
  });
}
const ReusableMobileTable = ({
  data,
  onItemClick,
  formatCreatedAt,
  getName,
  getDetails,
  type
}) => {
  return jsx("div", {
    className: `app-section__sm-table ${type}`,
    children: jsx("div", {
      children: data == null ? void 0 : data.map((item) => jsxs("div", {
        onClick: () => onItemClick(item),
        className: "container",
        children: [type === "Locations" && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "location-flex",
            children: [jsx("span", {
              children: "Location Admin"
            }), jsx("h2", {
              children: getName(item.site)
            })]
          }), jsx("h2", {
            children: item.address
          }), jsxs("div", {
            className: "location-flex",
            children: [jsxs("p", {
              children: [jsx("span", {
                children: "Location(s): "
              }), item.state]
            }), jsxs("p", {
              children: [jsx("span", {
                children: "Total Members:"
              }), " ", item.members.length]
            })]
          })]
        }), type === "Default" && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "container-item",
            children: [jsx("h2", {
              children: getName(item)
            }), jsx("span", {
              children: formatCreatedAt(item.createdAt)
            })]
          }), jsx("p", {
            children: getDetails(item)
          })]
        }), type === "Users" && jsxs(Fragment$1, {
          children: [jsx("div", {
            className: "location-flex",
            children: jsx("h2", {
              children: getName(item)
            })
          }), jsx("span", {
            children: item.contractId
          }), jsx("div", {
            className: "location-flex",
            children: jsxs("p", {
              className: ``,
              children: [jsx("span", {
                children: "Status:"
              }), " •", " ", jsxs("span", {
                className: ` ${item.status === "ACTIVE" ? "mobile-status-active" : "mobile-status-inactive"}`,
                children: [" ", data.isActive === true ? "Active" : "Inactive"]
              })]
            })
          })]
        }), type === "Company" && jsxs(Fragment$1, {
          children: [jsx("div", {
            className: "location-flex",
            children: jsx("h2", {
              children: getName(item)
            })
          }), jsx("span", {
            children: item.contractId
          }), jsxs("div", {
            className: "location-flex",
            children: [jsxs("p", {
              className: ``,
              children: [jsx("span", {
                children: "Members:"
              }), " • ", jsx("span", {
                children: "4"
              })]
            }), jsxs("p", {
              className: ``,
              children: [jsx("span", {
                children: "Status:"
              }), " •", " ", jsx("span", {
                className: ` ${item.status === "ACTIVE" ? "mobile-status-active" : "mobile-status-inactive"}`,
                children: item.status
              })]
            })]
          })]
        })]
      }, item.id))
    })
  });
};
const siteOptions = [{
  value: "PHC",
  text: "PHC"
}, {
  value: "LAR_EAST",
  text: "LAR_EAST"
}, {
  value: "LAR_WEST",
  text: "LAR_WEST"
}, {
  value: "SAR_SOUTH",
  text: "SAR_SOUTH"
}, {
  value: "SAR_NORTH",
  text: "SAR_NORTH"
}, {
  value: "IPP",
  text: "IPP"
}];
function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const pageNumbers = Array.from({
    length: endPage - startPage + 1
  }, (_, index) => startPage + index);
  return jsxs("div", {
    className: "pagination",
    children: [jsx("button", {
      className: "pagination__sub-button",
      onClick: () => onPageChange(currentPage - 1),
      disabled: currentPage === 1,
      children: jsx(Icon, {
        name: "white-caret-left"
      })
    }), pageNumbers.map((page) => jsx("button", {
      className: `pagination__button ${currentPage === page ? "pagination__button--active" : ""}`,
      onClick: () => onPageChange(page),
      children: page
    }, page)), jsx("button", {
      className: "pagination__sub-button",
      onClick: () => onPageChange(currentPage + 1),
      disabled: currentPage === totalPages,
      children: jsx(Icon, {
        name: "caret-right"
      })
    })]
  });
}
function Activities({}) {
  var _a, _b;
  const [stagedActivity, stageActivity] = useState();
  const {
    toggle,
    modals
  } = useModal({
    activityDetails: false
  });
  const {
    response,
    isLoading
  } = useRequest(getAudits, {}, true);
  const activities = (response == null ? void 0 : response.data) || [];
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });
  const handleItemClick = (item) => {
    stageActivity(item);
    toggle("activityDetails");
  };
  const formatCreatedAt = (date) => {
    return dayjs(date).format("DD/MM/YYYY • HH:mm A");
  };
  const getName = (item) => {
    return `${item.profile.fullname}`;
  };
  const getDetails = (item) => {
    return item.activityPerformed;
  };
  const filteredActivities = activities.filter((activity) => {
    var _a2, _b2, _c, _d;
    const userName = `${activity.profile.firstname} ${activity.profile.lastname}`.toLowerCase();
    const activityPerformed = activity.activityPerformed.toLowerCase();
    const locationArea = ((_b2 = (_a2 = activity == null ? void 0 : activity.location) == null ? void 0 : _a2.locationArea) == null ? void 0 : _b2.toLowerCase()) || "";
    const site = ((_d = (_c = activity == null ? void 0 : activity.location) == null ? void 0 : _c.site) == null ? void 0 : _d.toLowerCase()) || "";
    const activityDate = dayjs(activity.createdAt);
    const matchesSearchTerm = userName.includes(searchTerm.toLowerCase()) || activityPerformed.includes(searchTerm.toLowerCase()) || locationArea.includes(searchTerm.toLowerCase()) || site.includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All Locations" || site.toLowerCase() === selectedLocation.toLowerCase();
    const matchesDateRange = (!dateRange.start || activityDate.isAfter(dayjs(dateRange.start).startOf("day"))) && (!dateRange.end || activityDate.isBefore(dayjs(dateRange.end).endOf("day")));
    return matchesSearchTerm && matchesLocation && matchesDateRange;
  });
  const setDateRangeWrapper = (range) => {
    setDateRange({
      start: range.startDate,
      end: range.endDate
    });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredActivities.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Audits"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search by user name, location or activity",
        onSearch: setSearchTerm
      }), jsxs("div", {
        className: "app-section__filters",
        children: [jsx(DateFilter, {
          variant: "secondary",
          setDateRange: setDateRangeWrapper
        }), jsxs(Dropdown, {
          className: "base-dropdown__dropdown-wrapper",
          children: [jsx(DropdownTrigger, {
            children: selectedLocation
          }), jsx(DropdownContent, {
            children: siteOptions.map((location2) => jsx("div", {
              className: "base-dropdown__option",
              onClick: () => setSelectedLocation(location2.value),
              children: location2.text
            }, location2.value))
          })]
        })]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Date & Time"
              }), jsx(TableCell, {
                children: "User"
              }), jsx(TableCell, {
                children: "Location"
              }), jsx(TableCell, {
                children: "Activity"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData == null ? void 0 : paginatedData.map((data) => {
              var _a2, _b2;
              return jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: dayjs(data.createdAt).format("DD/MM/YYYY • HH:mm A")
                }), jsx(TableCell, {
                  children: data.profile.fullname
                }), jsxs(TableCell, {
                  children: [(_a2 = data == null ? void 0 : data.location) == null ? void 0 : _a2.locationArea, ", ", (_b2 = data == null ? void 0 : data.location) == null ? void 0 : _b2.site]
                }), jsx(TableCell, {
                  children: data.activityPerformed.replace(/\b\w/g, (char) => char.toUpperCase())
                }), jsx(TableCell, {
                  children: jsx(Button, {
                    variant: "outline",
                    onClick: () => {
                      stageActivity(data);
                      toggle("activityDetails");
                    },
                    children: "View"
                  })
                })]
              }, data.id);
            })
          })]
        })
      }), jsx(ReusableMobileTable, {
        data: paginatedData,
        onItemClick: handleItemClick,
        formatCreatedAt,
        getName,
        getDetails,
        type: "Default"
      }), filteredActivities.length && jsx(Pagination, {
        totalItems: filteredActivities.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !filteredActivities.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching audits, please wait..." : "No activities yet"
        })]
      })]
    }), jsxs(Modal, {
      toggle: () => toggle("activityDetails"),
      show: modals.activityDetails,
      children: [jsx(ModalHeader, {
        children: "Audit Details"
      }), jsxs(ModalBody, {
        children: [jsx(ModalDetail, {
          label: "Date",
          children: dayjs(stagedActivity == null ? void 0 : stagedActivity.createdAt).format("DD MMM YYYY, HH:mm A")
        }), jsx(ModalDetail, {
          label: "User",
          children: jsxs("a", {
            href: "",
            className: "app-link",
            children: [stagedActivity == null ? void 0 : stagedActivity.profile.firstname, " ", stagedActivity == null ? void 0 : stagedActivity.profile.lastname]
          })
        }), jsx(ModalDetail, {
          label: "Activity",
          children: stagedActivity == null ? void 0 : stagedActivity.activityPerformed
        }), jsxs(ModalDetail, {
          label: "Location",
          children: [(_a = stagedActivity == null ? void 0 : stagedActivity.location) == null ? void 0 : _a.locationArea, " ,", (_b = stagedActivity == null ? void 0 : stagedActivity.location) == null ? void 0 : _b.site]
        })]
      })]
    })]
  });
}
function PopupModal({
  icon,
  title,
  message,
  onClose,
  primaryButton,
  secondaryButton,
  type,
  tableData
}) {
  return jsx("div", {
    className: "popup-overlay",
    children: jsxs("div", {
      className: "popup-modal",
      children: [jsx("button", {
        className: "close-button",
        onClick: onClose,
        children: "×"
      }), type === "table" ? jsxs("div", {
        className: "popup-content",
        children: [jsx("div", {
          className: "icon-container",
          children: jsx("p", {
            children: title
          })
        }), jsx("div", {
          className: "app-section__lg-table popup-lg-table",
          children: jsxs(Table, {
            children: [jsx(TableHead, {
              children: jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Header"
                }), jsx(TableCell, {
                  children: "Description"
                })]
              })
            }), jsx(TableBody, {
              children: tableData == null ? void 0 : tableData.map((item) => jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: item.header
                }), jsx(TableCell, {
                  children: item.description
                })]
              }, item.header))
            })]
          })
        }), jsx("div", {
          className: "popup-sm-table",
          children: jsx("div", {
            className: "",
            children: jsx("div", {
              className: "",
              children: tableData == null ? void 0 : tableData.map((item) => jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: item.header
                }), jsx("p", {
                  children: item.description
                })]
              }, item.header))
            })
          })
        })]
      }) : jsxs("div", {
        className: "popup-content",
        children: [jsx("div", {
          className: "icon-container",
          children: jsx("div", {
            className: "image",
            children: icon
          })
        }), jsx("h2", {
          children: title
        }), jsx("p", {
          className: "message",
          children: message
        }), jsxs("div", {
          className: "button-group",
          children: [secondaryButton && jsx("button", {
            onClick: secondaryButton.onClick,
            style: {
              backgroundColor: secondaryButton.color || "#fff",
              color: "#fff"
            },
            children: secondaryButton.label
          }), primaryButton && jsx("button", {
            onClick: primaryButton.onClick,
            style: {
              backgroundColor: primaryButton.color || "#fff",
              color: "#fff"
            },
            children: primaryButton.label
          })]
        })]
      })]
    })
  });
}
const IDContext = createContext({});
function IDProvider({
  children
}) {
  const defaultId = useMemo(() => {
    try {
      const storedID = localStorage.getItem("id");
      return storedID ? Number(storedID) : null;
    } catch {
      return null;
    }
  }, []);
  const [valueID, setId] = useState(defaultId);
  function setID(id) {
    if (typeof id === "number" && !isNaN(id)) {
      localStorage.setItem("id", String(id));
      setId(id);
    } else {
      console.warn("ID must be a valid number");
    }
  }
  function clearID() {
    localStorage.removeItem("id");
    setId(null);
  }
  return jsx(IDContext.Provider, {
    value: {
      valueID,
      setID,
      clearID
    },
    children
  });
}
function useIDContext() {
  return useContext(IDContext);
}
function Roles({}) {
  var _a, _b, _c;
  const [selectedRole, viewRole] = useState();
  const {
    toggle,
    modals
  } = useModal({
    role_details: false
  });
  const {
    response,
    isLoading
  } = useRequest(getRoles, {}, true);
  const {
    setID,
    valueID
  } = useIDContext();
  const handleItemClick = (item) => {
    setID(item.id);
    viewRole(item);
    toggle("role_details");
  };
  const editRoles = (item) => {
    setID(item.id);
    route("/roles/edit");
  };
  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };
  const formatCreatedAt = (date) => {
    return dayjs(date).format("DD/MM/YYYY • HH:mm A");
  };
  const getName = (item) => {
    return item.name;
  };
  const getDetails = (item) => {
    var _a2;
    return ((_a2 = item.permissions) == null ? void 0 : _a2.join(", ")) || "---";
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const handleDeleteRole = async () => {
    const id = valueID;
    const response2 = await createRequest(`/role/${id}`, "DELETE");
    console.log(response2);
    toggle("role_details");
    setModalOpen(false);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const roles = (response == null ? void 0 : response.data) || [];
  const filteredRoles = roles.filter((role) => {
    const roleName = `${role.name}`.toLowerCase();
    const permissions = role.permissions || [];
    return roleName.includes(searchTerm.toLowerCase()) || permissions.some((p2) => p2.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredRoles.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Roles & Permissions"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search by role name or permissions",
        onSearch: setSearchTerm
      }), jsxs(Button, {
        href: "/roles/create",
        variant: "primary",
        dimension: "md",
        children: [jsx(Icon, {
          name: "plus"
        }), "Create New Role"]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Role"
              }), jsx(TableCell, {
                children: "Date Created"
              }), jsx(TableCell, {
                children: "Permissions"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.map((data) => {
              var _a2;
              return jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: data.name.replace(/\b\w/g, (char) => char.toUpperCase())
                }), jsx(TableCell, {
                  children: dayjs(data.createdAt).format("MMM DD, YYYY • HH:mm A")
                }), jsx(TableCell, {
                  children: jsx("div", {
                    className: "w-roles",
                    children: ((_a2 = data.permissions) == null ? void 0 : _a2.join(", ")) || "---"
                  })
                }), jsx(TableCell, {
                  children: jsx(Button, {
                    variant: "outline",
                    onClick: () => {
                      viewRole(data);
                      toggle("role_details");
                    },
                    children: "View"
                  })
                })]
              }, data.id);
            })
          })]
        })
      }), jsx(ReusableMobileTable, {
        data: paginatedData,
        onItemClick: handleItemClick,
        formatCreatedAt,
        getName,
        getDetails,
        type: "Default"
      }), filteredRoles.length && jsx(Pagination, {
        totalItems: filteredRoles.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !filteredRoles.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching roles, please wait..." : "No roles yet"
        })]
      })]
    }), jsxs(Modal, {
      toggle: () => toggle("role_details"),
      show: modals.role_details,
      children: [jsx(ModalHeader, {
        children: "Role Details"
      }), jsxs(ModalBody, {
        children: [jsx(ModalDetail, {
          label: "Date Created:",
          children: dayjs(selectedRole == null ? void 0 : selectedRole.createdAt).format("MMM DD, YYYY • HH:mm A")
        }), jsx(ModalDetail, {
          label: "Created By:",
          children: jsxs("a", {
            href: "",
            className: "app-link",
            children: [(_a = selectedRole == null ? void 0 : selectedRole.createdBy) == null ? void 0 : _a.firstname, " ", (_b = selectedRole == null ? void 0 : selectedRole.createdBy) == null ? void 0 : _b.lastname]
          })
        }), jsx(ModalDetail, {
          label: "Role Name:",
          children: selectedRole == null ? void 0 : selectedRole.name
        }), jsx(ModalDetail, {
          label: "Permissions:",
          children: ((_c = selectedRole == null ? void 0 : selectedRole.permissions) == null ? void 0 : _c.join(", ")) || "---"
        }), jsx(ModalDetail, {
          label: "Total Permitted User:",
          children: "25"
        }), jsxs("div", {
          className: "app-modal__footer",
          children: [jsxs("button", {
            className: "app-modal__btn--yellow",
            onClick: () => {
              editRoles(selectedRole);
            },
            children: [jsx(Icon, {
              name: "edit"
            }), "Edit Role"]
          }), jsxs("button", {
            className: "app-modal__btn--red",
            onClick: () => {
              startDelete(selectedRole);
            },
            children: [jsx(Icon, {
              name: "delete"
            }), "Delete"]
          })]
        }), jsx("div", {
          className: "",
          children: isModalOpen && jsx(PopupModal, {
            icon: jsx("img", {
              src: "/svgs/delete_img.png"
            }),
            title: "Delete Role",
            message: "Are you sure you want to delete this role? This action cannot be undone.",
            onClose: () => setModalOpen(false),
            primaryButton: {
              label: "Delete",
              onClick: handleDeleteRole,
              color: "#D30021"
            },
            secondaryButton: {
              label: "Cancel",
              onClick: () => setModalOpen(false),
              color: "#E86E18"
            }
          })
        })]
      })]
    })]
  });
}
function Locations({}) {
  const [selectedLocation, viewLocation] = useState();
  const {
    response,
    isLoading
  } = useRequest(getSites, {}, true);
  const {
    toggle: originalToggle,
    modals
  } = useModal({
    role_details: false
  });
  const {
    setID,
    valueID
  } = useIDContext();
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);
  const [locationArea, setLocationArea] = useState("--select a location area --");
  const toggle = (modalName) => {
    if (modals[modalName]) {
      setSelectedSubLocation(null);
    }
    originalToggle(modalName);
  };
  const handleItemClick = (item) => {
    viewLocation(item);
    toggle("role_details");
  };
  const handleSubLocationClick = (subLocation) => {
    setSelectedSubLocation(subLocation);
  };
  const formattedData = (response == null ? void 0 : response.data) ? Object.keys(response.data).map((siteKey) => {
    const siteData = response.data[siteKey];
    const locationCount = siteData.length;
    const workAreaCount = siteData.reduce((acc, loc) => {
      var _a;
      return acc + (((_a = loc.workAreas) == null ? void 0 : _a.length) || 0);
    }, 0);
    const totalMembers = siteData.reduce((acc, loc) => {
      var _a;
      return acc + (((_a = loc.members) == null ? void 0 : _a.length) || 0);
    }, 0);
    return {
      site: siteKey,
      locations: locationCount,
      workAreas: workAreaCount,
      totalMembers,
      data: siteData
    };
  }) : [];
  const handleEditLocation = (item) => {
    console.log(item);
    setID(item.id);
    route("/locations/edit");
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDeleteRole = async () => {
    var _a, _b, _c;
    const id = valueID;
    const response2 = await createRequest(`/location/${id}`, "DELETE");
    console.log(response2);
    toggle("role_details");
    setModalOpen(false);
    if (((_a = response2[0]) == null ? void 0 : _a.statusCode) === 200) {
      window.location.reload();
      return toast({
        variant: "success",
        message: ((_b = response2[0]) == null ? void 0 : _b.message) ?? "Location deleted succesfully."
      });
    } else {
      return toast({
        variant: "error",
        message: ((_c = response2[0]) == null ? void 0 : _c.message) ?? "Location deletion failed, please try again."
      });
    }
  };
  const showDeletePopup = (data) => {
    setID(data.id);
    setLocationArea(data.locationArea);
  };
  const renderDelete = () => {
    setDropdownOpen(false);
    setModalOpen(true);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = paginate(formattedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Locations"
    }), jsx("div", {
      className: "app-section__header",
      children: jsxs("div", {
        className: "grid-cols-2",
        children: [jsxs(Button, {
          href: "/locations/create/location-area",
          variant: "primary",
          dimension: "md",
          children: [jsx(Icon, {
            name: "plus"
          }), "Add New Location Area"]
        }), jsxs(Button, {
          href: "/locations/create/work-area",
          variant: "tertiary",
          dimension: "md",
          children: [jsx(Icon, {
            name: "plus"
          }), "Add New Work Area"]
        })]
      })
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Site"
              }), jsx(TableCell, {
                children: "Location(s)"
              }), jsx(TableCell, {
                children: "Work Area(s)"
              }), jsx(TableCell, {
                children: "Total Members"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.map((dataItem) => jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: dataItem.site
              }), jsx(TableCell, {
                children: dataItem.locations > 0 ? dataItem.locations : "-"
              }), jsx(TableCell, {
                children: dataItem.workAreas > 0 ? dataItem.workAreas : "-"
              }), jsx(TableCell, {
                children: dataItem.totalMembers > 0 ? dataItem.totalMembers : "---"
              }), jsx(TableCell, {
                children: jsx(Button, {
                  variant: "outline",
                  onClick: () => handleItemClick(dataItem),
                  children: "View"
                })
              })]
            }, dataItem.site))
          })]
        })
      }), jsx("div", {
        className: "app-section__sm-table",
        children: jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.map((dataItem) => jsxs("div", {
              className: "container",
              children: [jsx("h2", {
                children: dataItem.site
              }), jsxs("div", {
                className: "location-flex",
                onClick: () => handleItemClick(dataItem),
                children: [jsxs("p", {
                  children: [jsx("span", {
                    children: " Location(s): "
                  }), dataItem.locations > 0 ? dataItem.locations : "-"]
                }), jsxs("p", {
                  children: [jsx("span", {
                    children: "Work Area(s): "
                  }), dataItem.workAreas > 0 ? dataItem.workAreas : "-"]
                }), jsxs("p", {
                  children: [jsx("span", {
                    children: "Total Members: "
                  }), dataItem.totalMembers > 0 ? dataItem.totalMembers : "---"]
                })]
              })]
            }, dataItem.site))
          })
        })
      }), jsx(Pagination, {
        totalItems: formattedData.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !(response == null ? void 0 : response.data) && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching locations, please wait..." : "No locations yet"
        })]
      })]
    }), jsxs(Modal, {
      toggle: () => toggle("role_details"),
      show: modals.role_details,
      children: [jsx(ModalHeader, {
        children: selectedSubLocation ? `${selectedSubLocation.locationArea}` : "Site Details"
      }), jsxs(ModalBody, {
        children: [selectedSubLocation ? jsxs(Fragment$1, {
          children: [jsx(ModalDetail, {
            label: "Location Admin:",
            children: selectedSubLocation.locationAdminId
          }), jsxs("div", {
            className: "grid-cols-2",
            children: [jsx(ModalDetail, {
              label: "Total Members:",
              children: selectedSubLocation.members.length
            }), jsx(ModalDetail, {
              label: "Work Areas:",
              children: selectedSubLocation.workAreas.length
            })]
          }), jsx("span", {
            children: "Below is the list of work area in this location area"
          }), jsx("br", {}), jsx("br", {}), jsx("ul", {
            className: "grid-cols-2",
            style: {
              listStyle: "disc"
            },
            children: selectedSubLocation.workAreas.length > 0 ? selectedSubLocation.workAreas.map((workArea) => jsx("li", {
              children: workArea
            }, workArea.id)) : "No work areas yet"
          }), jsx("br", {})]
        }) : jsxs(Fragment$1, {
          children: [jsx(ModalDetail, {
            label: "Site:",
            children: selectedLocation == null ? void 0 : selectedLocation.site
          }), jsx(ModalDetail, {
            label: "Total Members:",
            children: (selectedLocation == null ? void 0 : selectedLocation.totalMembers) > 0 ? selectedLocation == null ? void 0 : selectedLocation.totalMembers : "---"
          }), jsx(ModalDetail, {
            label: "Location(s):",
            children: (selectedLocation == null ? void 0 : selectedLocation.locations) > 0 ? selectedLocation == null ? void 0 : selectedLocation.locations : "-"
          }), jsx(ModalDetail, {
            label: "Work Area(s):",
            children: (selectedLocation == null ? void 0 : selectedLocation.workAreas) > 0 ? selectedLocation == null ? void 0 : selectedLocation.workAreas : 0
          }), jsxs(Table, {
            children: [jsx(TableHead, {
              children: jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Location Area"
                }), jsx(TableCell, {
                  children: "Work Areas"
                }), jsx(TableCell, {
                  children: "Members"
                }), jsx(TableCell, {})]
              })
            }), jsx(TableBody, {
              children: selectedLocation == null ? void 0 : selectedLocation.data.map((data) => jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: data.locationArea
                }), jsx(TableCell, {
                  children: data.workAreas.length
                }), jsx(TableCell, {
                  children: data.members.length
                }), jsx(TableCell, {
                  children: jsx(Button, {
                    variant: "outline",
                    onClick: () => handleSubLocationClick(data),
                    children: "View"
                  })
                })]
              }, data.id))
            })]
          })]
        }), selectedSubLocation ? jsx("div", {
          className: "app-modal__footer",
          children: jsxs("button", {
            className: "app-modal__btn--yellow",
            onClick: () => {
              handleEditLocation(selectedSubLocation);
            },
            children: [jsx(Icon, {
              name: "edit"
            }), "Edit Location"]
          })
        }) : jsxs("div", {
          className: "app-modal__double-footer",
          children: [jsxs("button", {
            className: "app-modal__btn--gradient",
            onClick: () => route("/locations/create/location-area"),
            children: [jsx(Icon, {
              name: "plus"
            }), "Add Loc. Area"]
          }), jsxs("button", {
            className: "app-modal__btn--orange",
            onClick: () => route("/locations/create/work-area"),
            children: [jsx(Icon, {
              name: "plus"
            }), "Add Work Area"]
          }), jsxs("button", {
            className: "app-modal__btn--yellow",
            onClick: () => {
              handleEditLocation(selectedLocation);
            },
            children: [jsx(Icon, {
              name: "plus"
            }), "Edit Loc. Area"]
          }), jsxs("button", {
            className: "app-modal__btn--red",
            onClick: () => {
              setDropdownOpen(true);
            },
            children: [jsx(Icon, {
              name: "plus"
            }), "Delete Loc. Area"]
          })]
        }), jsx("div", {
          className: "",
          children: isDropdownOpen && jsx("div", {
            className: "popup-overlay",
            children: jsx("div", {
              className: "popup-modal",
              children: jsxs("div", {
                className: "",
                children: [jsxs("div", {
                  className: "flex-justify-between",
                  children: [jsx("h4", {
                    children: "Delete Location Area"
                  }), jsx("button", {
                    className: "drop-close",
                    onClick: () => setDropdownOpen(false),
                    children: "×"
                  })]
                }), jsx("br", {}), jsx("p", {
                  children: "Select the location area you want to delete below"
                }), jsx("br", {}), jsxs(Dropdown, {
                  className: "base-dropdown__dropdown-wrapper",
                  children: [jsx(DropdownTrigger, {
                    children: locationArea
                  }), jsx(DropdownContent, {
                    children: selectedLocation == null ? void 0 : selectedLocation.data.map((data) => jsx("div", {
                      className: "base-dropdown__option",
                      onClick: () => showDeletePopup(data),
                      children: data.locationArea
                    }, data.id))
                  })]
                }), jsx("br", {}), jsxs("div", {
                  className: "button-group",
                  children: [jsx("button", {
                    onClick: () => setModalOpen(false),
                    style: {
                      backgroundColor: "#E86E18",
                      color: "#fff"
                    },
                    children: "Cancel"
                  }), jsx("button", {
                    onClick: renderDelete,
                    style: {
                      backgroundColor: "#D30021",
                      color: "#fff"
                    },
                    children: "Next"
                  })]
                })]
              })
            })
          })
        }), jsx("div", {
          className: "",
          children: isModalOpen && jsx(PopupModal, {
            icon: jsx("img", {
              src: "/svgs/delete_img.png"
            }),
            title: "Delete Location",
            message: "Are you sure you want to delete this location? This action cannot be undone.",
            onClose: () => setModalOpen(false),
            primaryButton: {
              label: "Delete",
              onClick: handleDeleteRole,
              color: "#D30021"
            },
            secondaryButton: {
              label: "Cancel",
              onClick: () => setModalOpen(false),
              color: "#E86E18"
            }
          })
        })]
      })]
    })]
  });
}
function useTabs(tabs, defaultTab = tabs[0]) {
  const [activeTab, switchTab] = useState(defaultTab);
  const decoratedTabs = tabs.map((t) => ({
    key: t,
    label: t,
    isActive: activeTab === t,
    onClick: () => switchTab(t)
  }));
  return {
    switchTab,
    activeTab,
    tabs: decoratedTabs
  };
}
function ReusableTabs({
  tabs,
  counts = {},
  className = ""
}) {
  return jsx("div", {
    className,
    children: tabs.map((tab) => jsxs("button", {
      "data-isActive": tab.isActive,
      onClick: tab.onClick,
      children: [tab.label, counts[tab.key] ? jsx("span", {
        children: counts[tab.key]
      }) : null]
    }))
  });
}
function InternalUsers() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const [selectedUser, viewUser] = useState();
  const {
    toggle,
    modals
  } = useModal({
    user_details: false
  });
  const {
    response,
    isLoading
  } = useRequest(getAllInternalUsers, {}, true);
  const users = (response == null ? void 0 : response.data) || [];
  async function getUserById(id) {
    var _a2, _b2;
    const response2 = await createRequest(`/profile/${id}`, "GET");
    viewUser((_a2 = response2[0]) == null ? void 0 : _a2.data);
    console.log((_b2 = response2[0]) == null ? void 0 : _b2.data);
  }
  const handleItemClick = (item) => {
    getUserById(item.id);
    toggle("user_details");
  };
  const getName = (item) => {
    return `${item.fullname}`;
  };
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const status = ["All Status", "Active", "Inactive"];
  const {
    setID,
    valueID
  } = useIDContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const editUsers = (item) => {
    setID(item.id);
    route("/interal-user/edit");
  };
  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };
  const handleDeleteRole = async () => {
    const id = valueID;
    try {
      const response2 = await createRequest(`/profile/${id}`, "DELETE");
      console.log(response2);
      toggle("user_details");
      toast({
        variant: "success",
        message: "Internal user deleted successfully"
      });
    } catch (err) {
      toast({
        variant: "error",
        message: `${(err == null ? void 0 : err.message) ?? "Failed to delete user"}`
      });
    }
    setModalOpen(false);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter((user) => {
    var _a2, _b2;
    const fullname = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();
    const locationArea = ((_a2 = user.location) == null ? void 0 : _a2.locationArea.toLowerCase()) || "";
    const matchesSearch = fullname.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase()) || locationArea.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const locationMatch = selectedLocation === "All Locations" || ((_b2 = user == null ? void 0 : user.location) == null ? void 0 : _b2.site) === selectedLocation;
    const statusMatch = selectedStatus === "All Status" || selectedStatus === "Active" && user.isActive || selectedStatus === "Inactive" && !user.isActive;
    return locationMatch && statusMatch && matchesSearch;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredUsers.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsx(Fragment$1, {
    children: jsxs("div", {
      className: "",
      children: [jsxs("div", {
        className: "app-section__header",
        children: [jsx(Search, {
          placeholder: "Search by user name",
          onSearch: setSearchTerm
        }), jsx("br", {}), jsxs("div", {
          className: "app-section__filters ",
          children: [jsx("span", {
            className: "base-date-filter--secondary",
            children: "Filter by:"
          }), jsxs("div", {
            className: "sm-grid-cols-2 app-section__filters",
            children: [jsxs(Dropdown, {
              className: "base-dropdown__dropdown-wrapper",
              children: [jsx(DropdownTrigger, {
                children: selectedLocation
              }), jsx(DropdownContent, {
                children: siteOptions.map((location2) => jsx("div", {
                  className: "base-dropdown__option",
                  onClick: () => setSelectedLocation(location2.value),
                  children: location2.text
                }, location2.value))
              })]
            }), jsxs(Dropdown, {
              className: "base-dropdown__dropdown-wrapper",
              children: [jsx(DropdownTrigger, {
                children: selectedStatus
              }), jsx(DropdownContent, {
                children: status.map((status2) => jsx("div", {
                  className: "base-dropdown__option",
                  onClick: () => setSelectedStatus(status2),
                  children: status2
                }, status2))
              })]
            })]
          })]
        })]
      }), jsxs("div", {
        children: [((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.length) > 0 ? jsxs("div", {
          className: "app-section",
          children: [jsx("div", {
            className: "app-section__lg-table",
            children: jsxs(Table, {
              children: [jsx(TableHead, {
                children: jsxs(TableRow, {
                  children: [jsx(TableCell, {
                    children: "Name"
                  }), jsx(TableCell, {
                    children: "Email"
                  }), jsx(TableCell, {
                    children: "Location"
                  }), jsx(TableCell, {
                    children: "Status"
                  }), jsx(TableCell, {})]
                })
              }), jsx(TableBody, {
                children: paginatedData.map((data) => {
                  var _a2, _b2;
                  return jsxs(TableRow, {
                    children: [jsx(TableCell, {
                      children: data.fullname
                    }), jsx(TableCell, {
                      children: data.email
                    }), jsxs(TableCell, {
                      children: [(_a2 = data == null ? void 0 : data.location) == null ? void 0 : _a2.locationArea, "/ ", (_b2 = data == null ? void 0 : data.location) == null ? void 0 : _b2.site]
                    }), jsx(TableCell, {
                      children: jsx("span", {
                        className: data.isActive ? "status-active" : "status-inactive",
                        children: data.isActive ? "Active" : "Inactive"
                      })
                    }), jsx(TableCell, {
                      children: jsx(Button, {
                        variant: "outline",
                        onClick: () => handleItemClick(data),
                        children: "View"
                      })
                    })]
                  }, data.id);
                })
              })]
            })
          }), jsx(ReusableMobileTable, {
            data: paginatedData,
            onItemClick: handleItemClick,
            getName,
            formatCreatedAt: (item) => dayjs(item == null ? void 0 : item.createdAt).format("MMM DD, YYYY"),
            type: "Users",
            getDetails: (item) => item == null ? void 0 : item.type
          }), jsx(Pagination, {
            totalItems: filteredUsers.length,
            itemsPerPage,
            currentPage,
            onPageChange: setCurrentPage
          }), !((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.length) && jsxs("div", {
            className: "base-empty",
            children: [jsx("img", {
              src: "/svgs/document.svg"
            }), jsx("p", {
              children: isLoading ? "Fetching users, please wait..." : "No users yet"
            })]
          })]
        }) : jsxs(Fragment$1, {
          children: [jsx("div", {
            className: "app-section",
            children: jsx(Table, {
              children: jsx(TableHead, {
                children: jsxs(TableRow, {
                  children: [jsx(TableCell, {
                    children: "Name"
                  }), jsx(TableCell, {
                    children: "Email"
                  }), jsx(TableCell, {
                    children: "Location"
                  }), jsx(TableCell, {
                    children: "Status"
                  }), jsx(TableCell, {})]
                })
              })
            })
          }), jsx("div", {
            className: "empty-state",
            children: jsxs("div", {
              children: [" ", jsx("div", {
                className: "flex-center",
                children: jsx("img", {
                  src: "/svgs/no-users.png"
                })
              }), jsx("p", {
                children: "All internal users will appear here. Click the button below to create a new user"
              })]
            })
          })]
        }), jsxs(Modal, {
          toggle: () => toggle("user_details"),
          show: modals.user_details,
          children: [jsx(ModalHeader, {
            children: "User Details"
          }), jsxs(ModalBody, {
            children: [jsx(ModalDetail, {
              label: "Date Created:",
              children: dayjs(selectedUser == null ? void 0 : selectedUser.createdAt).format("MMM DD, YYYY • HH:mm A")
            }), jsx(ModalDetail, {
              label: "Created By:",
              children: jsx("a", {
                href: "",
                className: "app-link",
                children: (_c = selectedUser == null ? void 0 : selectedUser.creator) == null ? void 0 : _c.fullname
              })
            }), jsx(ModalDetail, {
              label: "Full name:",
              children: selectedUser == null ? void 0 : selectedUser.fullname
            }), jsx(ModalDetail, {
              label: "Email Address:",
              children: selectedUser == null ? void 0 : selectedUser.email
            }), jsxs("div", {
              className: "grid-cols-2",
              children: [jsx(ModalDetail, {
                label: "User Type:",
                children: (_d = selectedUser == null ? void 0 : selectedUser.type) == null ? void 0 : _d.toLowerCase()
              }), jsxs(ModalDetail, {
                label: "Status:",
                children: [" ", jsx("span", {
                  className: (selectedUser == null ? void 0 : selectedUser.isActive) ? "mobile-status-active" : "mobile-status-inactive",
                  children: (selectedUser == null ? void 0 : selectedUser.isActive) ? "Active" : "Inactive"
                })]
              })]
            }), jsx(ModalDetail, {
              label: "Role:",
              children: (_f = (_e = selectedUser == null ? void 0 : selectedUser.role) == null ? void 0 : _e.authorities) == null ? void 0 : _f.map((role) => {
                return jsx("p", {
                  className: "app-modal__detail__value",
                  children: role
                }, role);
              })
            }), jsxs(ModalDetail, {
              label: "Location:",
              children: [(_g = selectedUser == null ? void 0 : selectedUser.location) == null ? void 0 : _g.locationArea, " /", (_h = selectedUser == null ? void 0 : selectedUser.location) == null ? void 0 : _h.workAreas]
            }), jsxs("div", {
              className: "app-modal__footer",
              children: [jsxs("button", {
                className: "app-modal__btn--yellow",
                onClick: () => {
                  editUsers(selectedUser);
                },
                children: [jsx(Icon, {
                  name: "edit"
                }), "Edit User"]
              }), jsxs("button", {
                className: "app-modal__btn--red",
                onClick: () => startDelete(selectedUser),
                children: [jsx(Icon, {
                  name: "delete"
                }), "Delete"]
              })]
            }), jsx("div", {
              className: "",
              children: isModalOpen && jsx(PopupModal, {
                icon: jsx("img", {
                  src: "/svgs/delete_img.png"
                }),
                title: "Delete User",
                message: "Are you sure you want to delete this user? This action cannot be undone.",
                onClose: () => setModalOpen(false),
                primaryButton: {
                  label: "Delete",
                  onClick: handleDeleteRole,
                  color: "#D30021"
                },
                secondaryButton: {
                  label: "Cancel",
                  onClick: () => setModalOpen(false),
                  color: "#E86E18"
                }
              })
            })]
          })]
        })]
      })]
    })
  });
}
function Company() {
  var _a, _b, _c, _d, _e, _f;
  const [selectedCompany] = useState();
  const {
    toggle,
    modals
  } = useModal({
    user_details: false
  });
  const {
    response,
    isLoading
  } = useRequest(getAllCompanies, {}, true);
  const {
    setID
  } = useIDContext();
  const handleItemClick = (item) => {
    setID(item.id);
    console.log("update", item.id);
    route(`/users/company/details`);
  };
  const getName = (item) => {
    return `${item.name}`;
  };
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const status = ["All Status", "Active", "Inactive"];
  const startDelete = (item) => {
    console.log("haba please work");
    setID(item.id);
  };
  const users = (response == null ? void 0 : response.data) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCompanies = users.filter((user) => {
    const contractId = user.contractId.toLowerCase();
    const name = user.name.toLowerCase();
    const matchesSearch = contractId.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const statusMatch = selectedStatus === "All Status" || selectedStatus === "Active" && user.isActive || selectedStatus === "Inactive" && !user.isActive;
    return statusMatch && matchesSearch;
  }).sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredCompanies.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsx(Fragment$1, {
    children: jsxs("div", {
      className: "",
      children: [jsxs("div", {
        className: "app-section__header",
        children: [jsx(Search, {
          placeholder: "Search by name or Contract ID",
          onSearch: setSearchTerm
        }), jsx("br", {}), jsxs("div", {
          className: "app-section__filters ",
          children: [jsx("span", {
            className: "base-date-filter--secondary",
            children: "Filter by:"
          }), jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedStatus
            }), jsx(DropdownContent, {
              children: status.map((status2) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedStatus(status2),
                children: status2
              }, status2))
            })]
          })]
        })]
      }), jsxs("div", {
        children: [jsxs("div", {
          className: "app-section",
          children: [jsx("div", {
            className: "app-section__lg-table",
            children: jsxs(Table, {
              children: [jsx(TableHead, {
                children: jsxs(TableRow, {
                  children: [jsx(TableCell, {
                    children: "Contract ID"
                  }), jsx(TableCell, {
                    children: "Company Name"
                  }), jsx(TableCell, {
                    children: "Status"
                  }), jsx(TableCell, {})]
                })
              }), jsx(TableBody, {
                children: paginatedData.map((data) => {
                  var _a2, _b2;
                  return jsxs(TableRow, {
                    children: [jsx(TableCell, {
                      children: data.contractId.toUpperCase()
                    }), jsx(TableCell, {
                      children: data.name
                    }), jsx(TableCell, {
                      children: jsx("span", {
                        className: ` ${data.status === "ACTIVE" ? "status-active" : "status-inactive"}`,
                        children: ((_a2 = data.status) == null ? void 0 : _a2.charAt(0).toUpperCase()) + ((_b2 = data.status) == null ? void 0 : _b2.slice(1).toLowerCase())
                      })
                    }), jsx(TableCell, {
                      children: jsx(Button, {
                        variant: "outline",
                        onClick: () => handleItemClick(data),
                        children: "View"
                      })
                    })]
                  }, data.id);
                })
              })]
            })
          }), jsx(ReusableMobileTable, {
            data: paginatedData,
            onItemClick: handleItemClick,
            getName,
            type: "Company",
            getDetails: "",
            formatCreatedAt: ""
          }), jsx(Pagination, {
            totalItems: filteredCompanies.length,
            itemsPerPage,
            currentPage,
            onPageChange: setCurrentPage
          }), !((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.length) && jsxs("div", {
            className: "base-empty",
            children: [jsx("img", {
              src: "/svgs/document.svg"
            }), jsx("p", {
              children: isLoading ? "Fetching users, please wait..." : "No companies yet"
            })]
          })]
        }), jsxs(Modal, {
          toggle: () => toggle("user_details"),
          show: modals.user_details,
          children: [jsx(ModalHeader, {
            children: "Company Details"
          }), jsxs(ModalBody, {
            children: [jsx(ModalDetail, {
              label: "Date Created:",
              children: dayjs(selectedCompany == null ? void 0 : selectedCompany.createdAt).format("MMM DD, YYYY • HH:mm A")
            }), jsx(ModalDetail, {
              label: "Created By:",
              children: jsxs("a", {
                href: "",
                className: "app-link",
                children: [(_b = selectedCompany == null ? void 0 : selectedCompany.creator) == null ? void 0 : _b.firstname, " ", (_c = selectedCompany == null ? void 0 : selectedCompany.creator) == null ? void 0 : _c.lastname]
              })
            }), jsxs(ModalDetail, {
              label: "Full name:",
              children: [selectedCompany == null ? void 0 : selectedCompany.firstname, ", ", selectedCompany == null ? void 0 : selectedCompany.lastname]
            }), jsx(ModalDetail, {
              label: "Email Address:",
              children: selectedCompany == null ? void 0 : selectedCompany.email
            }), jsxs("div", {
              className: "grid-cols-2",
              children: [jsx(ModalDetail, {
                label: "User Type:",
                children: (_d = selectedCompany == null ? void 0 : selectedCompany.type) == null ? void 0 : _d.toLowerCase()
              }), jsxs(ModalDetail, {
                label: "Status:",
                children: [" ", jsx("span", {
                  className: `status ${(selectedCompany == null ? void 0 : selectedCompany.status) === "Active" ? "status.active" : "status.inactive"}`,
                  children: selectedCompany == null ? void 0 : selectedCompany.status
                })]
              })]
            }), jsx(ModalDetail, {
              label: "Role:",
              children: ((_e = selectedCompany == null ? void 0 : selectedCompany.role) == null ? void 0 : _e.name) ?? "---"
            }), jsx(ModalDetail, {
              label: "Location:",
              children: (_f = selectedCompany == null ? void 0 : selectedCompany.location) == null ? void 0 : _f.address
            }), jsxs("div", {
              className: "app-modal__footer",
              children: [jsxs("button", {
                className: "app-modal__btn--yellow",
                onClick: () => {
                  route("/users/edit");
                },
                children: [jsx(Icon, {
                  name: "edit"
                }), "Edit User"]
              }), jsxs("button", {
                className: "app-modal__btn--red",
                onClick: () => {
                  startDelete(selectedCompany);
                },
                children: [jsx(Icon, {
                  name: "delete"
                }), "Delete"]
              })]
            })]
          })]
        })]
      })]
    })
  });
}
function Users({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["Internal Users", "External Users"]);
  const counts = {
    // "Internal Users": 120,
    // "External Users": 60,
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Users"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(ReusableTabs, {
        tabs,
        counts,
        className: "reuseable-base-tabs"
      }), jsxs(Button, {
        href: activeTab === "Internal Users" ? "/users/create-internal" : "/users/create-company",
        variant: "primary",
        dimension: "md",
        children: [jsx(Icon, {
          name: "plus"
        }), activeTab === "Internal Users" ? "Create New User" : "Add  Company"]
      })]
    }), activeTab === "Internal Users" && jsx(InternalUsers, {}), activeTab === "External Users" && jsx(Company, {})]
  });
}
function Checkbox(props) {
  const {
    checked,
    onChange,
    disabled
  } = props;
  return jsx("input", {
    className: "base-checkbox",
    type: "checkbox",
    checked,
    disabled,
    onChange: ({
      currentTarget: {
        checked: checked2
      }
    }) => onChange(checked2)
  });
}
function CreateRole({}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(createNewRole);
  const {
    getFieldProps,
    values,
    setFieldValue,
    handleSubmit
  } = useForm({
    initialValues: {
      roleTitle: "",
      permissions: [],
      authorities: []
    },
    validationSchema: validationSchema$Q,
    onSubmit
  });
  function togglePermission(value) {
    let permissions = [];
    const isNotValue = (p2) => p2 !== value;
    if (values.permissions.every(isNotValue))
      permissions = [...values.permissions, value];
    else
      permissions = values.permissions.filter(isNotValue);
    setFieldValue("permissions", permissions);
  }
  function toggleAuthorities(value) {
    let authorities = [];
    const isNotValue = (p2) => p2 !== value;
    if (values.authorities.every(isNotValue))
      authorities = [...values.authorities, value];
    else
      authorities = values.authorities.filter(isNotValue);
    setFieldValue("authorities", authorities);
  }
  async function onSubmit(data) {
    console.log(data);
    const [_, err] = await makeRequest({
      name: data.roleTitle,
      permissions: data.permissions,
      authorities: data.authorities
      // permissions: data.permissions.map((permission) => ({ name: permission })),
    });
    if (err) {
      return toast({
        variant: "error",
        message: (err == null ? void 0 : err.message) ?? "Failed to create role, please try again"
      });
    }
    route("/roles");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Roles & Permissions"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/roles"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Create new role"
          }), jsx("p", {
            children: "Fill the fields below to create a new role"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Role Title"
          }), jsx(Input, {
            placeholder: "Enter role title",
            ...getFieldProps("roleTitle")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Permissions"
          }), jsx("div", {
            className: "app-create__form__group",
            children: PERMISSIONS.map(({
              label,
              value
            }, i2) => jsxs("label", {
              className: "base-checkbox-label",
              children: [jsx(Checkbox, {
                checked: values.permissions.includes(value),
                onChange: () => togglePermission(value)
              }), jsx("span", {
                children: label
              })]
            }, i2))
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Authorities"
          }), jsx("div", {
            className: "app-create__form__group",
            children: AUTHORITIES.map(({
              label,
              value
            }, i2) => jsxs("label", {
              className: "base-checkbox-label",
              children: [jsx(Checkbox, {
                checked: values.authorities.includes(value),
                onChange: () => toggleAuthorities(value)
              }), jsx("span", {
                children: label
              })]
            }, i2))
          }), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Create Role"
          })]
        })
      })]
    })]
  });
}
const validationSchema$Q = Yup.object({
  roleTitle: Yup.string().required("Role title is required"),
  permissions: Yup.array().required("At least one permission is required"),
  authorities: Yup.array().required("At least one authority is required")
});
function Select({
  label = "",
  error,
  isTouched,
  options: options2,
  placeholder,
  ...props
}) {
  const showError = isTouched ? Boolean(error) : false;
  return jsxs("label", {
    className: "base-input",
    children: [label ? jsx("span", {
      children: label
    }) : null, jsxs("div", {
      className: "select-container",
      children: [jsxs("select", {
        "data-hasError": showError,
        ...props,
        children: [jsx("option", {
          value: "",
          default: true,
          children: placeholder ?? `Select ${label.toLowerCase()}`
        }), options2 == null ? void 0 : options2.map((option) => jsx("option", {
          value: option.value,
          children: option.text
        }, option.value))]
      }), jsx(Icon, {
        name: "caret-left"
      })]
    }), showError && jsxs("p", {
      className: "base-input__error",
      children: [jsxs("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [jsx("path", {
          d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 16H12.01",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 8V12",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }), error]
    })]
  });
}
function CreateLocation({}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(createNewLocation);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue
  } = useForm({
    initialValues: {
      site: "",
      locationArea: ""
    },
    onSubmit,
    validationSchema: validationSchema$P
  });
  async function onSubmit(data) {
    console.log(data);
    const [_, error] = await makeRequest(data);
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create location, please try again."
      });
    }
    toast({
      variant: "success",
      message: "Location created successfully"
    });
    route("/locations");
  }
  const handleLocationChange = (value) => {
    setFieldValue("locationArea", value.trim());
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Locations"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/locations"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Add new location"
          }), jsx("p", {
            children: "Fill the fields below to add a new location"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Site Title"
          }), jsx(Select, {
            placeholder: "--select site--",
            options: siteOptions,
            ...getFieldProps("site")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Location Area"
          }), jsx("div", {
            className: "location-fields",
            children: jsx(Input, {
              placeholder: "Enter Location Area",
              value: location,
              onChange: (e) => handleLocationChange(e.target.value),
              ...getFieldProps(`locationArea`)
            })
          }), jsx("br", {}), jsx("br", {}), jsx("br", {}), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Create Location Area"
          }), jsx("br", {})]
        })
      })]
    })]
  });
}
const validationSchema$P = Yup.object({
  site: Yup.string().required("Site is required"),
  locationArea: Yup.string().trim().required("Location area is required").min(2, "Please enter a valid location area")
});
function Textarea({
  label = "",
  error,
  isTouched,
  ...props
}) {
  const showError = isTouched ? Boolean(error) : false;
  return jsxs("label", {
    className: "base-input",
    children: [label ? jsx("span", {
      children: label
    }) : null, jsx("textarea", {
      "data-hasError": showError,
      placeholder: `Enter ${label.toLowerCase()}`,
      ...props
    }), showError && jsxs("p", {
      className: "base-input__error",
      children: [jsxs("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [jsx("path", {
          d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 16H12.01",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), jsx("path", {
          d: "M12 8V12",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }), error]
    })]
  });
}
const PermitMachine = createMachine({
  context: {
    work_description: {
      role: "",
      performer: "",
      work_description: "",
      equipment_to_be_worked: "",
      locationId: 0,
      work_area: "",
      environmental_issues: "",
      from_date: "",
      from_time: "",
      to_date: "",
      to_time: ""
    },
    company_details: {
      entrusted_company: "",
      executing_company: "",
      performing_department: "",
      company_contact_phone: ""
    },
    work_hazards: {
      potentialHazardDescription: "",
      hazards: {}
    },
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    additional_notes: {
      additional_notes: "",
      isCorrect: false,
      consentGiven: false
    },
    formatted_documents: {}
  },
  predictableActionArguments: true,
  initial: "permit_type",
  states: {
    permit_type: {
      meta: {
        title: "Work Type",
        section: "A"
      },
      on: {
        submit: {
          target: "work_description",
          actions: ["updateContext"]
        }
      }
    },
    work_description: {
      meta: {
        title: "Permit Details",
        section: "A"
      },
      on: {
        submit: {
          target: "company_details",
          actions: ["updateContext"]
        },
        go_back: "permit_type"
      }
    },
    company_details: {
      meta: {
        title: "Company Details",
        section: "B"
      },
      on: {
        submit: {
          target: "work_hazards",
          actions: ["updateContext"]
        },
        go_back: "work_description"
      }
    },
    work_hazards: {
      meta: {
        title: "Hazard Identification",
        section: "C"
      },
      on: {
        submit: {
          target: "selected_documents",
          actions: ["updateContext"]
        },
        go_back: "company_details"
      }
    },
    selected_documents: {
      meta: {
        title: "Document Uploads",
        section: "D"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        },
        go_back: "work_hazards"
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "D"
      },
      on: {
        submit: {
          target: "additional_notes",
          actions: ["updateContext"]
        },
        go_back: "selected_documents"
      }
    },
    additional_notes: {
      meta: {
        title: "Permit Summary"
      },
      on: {
        go_back: "document_uploads"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      return Object.assign(ctx, event.data);
    }
  }
});
const Context$7 = createContext({});
function PermitProvider$4({
  children
}) {
  const [state, send, service] = useMachine(PermitMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$7.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function usePermitContext() {
  return useContext(Context$7);
}
function WorkDescription() {
  var _a;
  const {
    draft,
    isDraft
  } = useDraftDetails();
  const {
    profile
  } = useUserContext();
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const {
    state,
    send
  } = usePermitContext();
  const validationSchema2 = getValidationSchema$3(isDraft);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue
  } = useForm({
    validationSchema: validationSchema2,
    initialValues: {
      ...state.context.work_description,
      permit_type: state.context.permit_type
    },
    onSubmit
  });
  useEffect(() => {
    const getUserProfile = async () => {
      var _a2, _b, _c;
      const userResponse = await createRequest(`/profile/${profile == null ? void 0 : profile.id}`, "GET");
      console.log(userResponse);
      const locationData = (_c = (_b = (_a2 = userResponse[0]) == null ? void 0 : _a2.data) == null ? void 0 : _b.location) == null ? void 0 : _c.workAreas;
      const options2 = userResponse ? locationData.map((area) => ({
        text: area,
        value: area
      })) : [{
        text: "No work areas found",
        value: ""
      }];
      setWorkAreaOptions(options2);
    };
    if (profile) {
      getUserProfile();
    }
  }, []);
  function onSubmit(values) {
    var _a2, _b;
    const work_description = {
      role: values.role || (draft == null ? void 0 : draft.performerRole),
      performer: values.performer || (draft == null ? void 0 : draft.performingPersonInCharge),
      work_description: values.work_description || (draft == null ? void 0 : draft.workDescription),
      equipment_to_be_worked: values.equipment_to_be_worked || (draft == null ? void 0 : draft.equipmentToolsMaterials),
      locationId: profile == null ? void 0 : profile.locationId,
      work_area: values.work_area || ((_b = (_a2 = draft == null ? void 0 : draft.location) == null ? void 0 : _a2.workAreas) == null ? void 0 : _b[0]),
      environmental_issues: values.environmental_issues || (draft == null ? void 0 : draft.environmentalConsideration),
      from_date: values.from_date,
      from_time: values.from_time,
      to_date: values.to_date,
      to_time: values.to_time
    };
    send("submit", {
      data: {
        work_description
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__form",
    children: [jsxs("div", {
      className: "app-register__form-grid",
      children: [jsx(Input, {
        label: `Role *`,
        placeholder: `${isDraft ? draft == null ? void 0 : draft.performerRole : "Enter role (e.g., electrician, supervisor)"}`,
        ...getFieldProps("role")
      }), jsx(Select, {
        label: "Performing Person / Person-In-Charge *",
        placeholder: `${isDraft ? draft == null ? void 0 : draft.performingPersonInCharge : "Select performing person / person-in-charge"}`,
        ...getFieldProps("performer"),
        options: [{
          text: "Internal (Oando)",
          value: "INTERNAL"
        }, {
          text: "External (Contractor)",
          value: "EXTERNAL"
        }]
      }), jsx(Textarea, {
        label: "Work Description / Details *",
        placeholder: `${isDraft ? draft == null ? void 0 : draft.workDescription : "Describe the type of process or work to be performed."}`,
        ...getFieldProps("work_description")
      }), jsx(Textarea, {
        label: "Equipment / Tools / Materials *",
        placeholder: `${isDraft ? draft == null ? void 0 : draft.equipmentToolsMaterials : "Write here..."}`,
        ...getFieldProps("equipment_to_be_worked")
      }), jsx(Select, {
        label: "Work Area (Unit / Installation) *",
        placeholder: `${isDraft ? `previous: ${(_a = draft == null ? void 0 : draft.location) == null ? void 0 : _a.workAreas[0]}` : "--select work area / unit--"}`,
        ...getFieldProps("work_area"),
        options: workAreaOptions,
        onChange: (e) => {
          const value = e.target.value;
          setFieldValue("work_area", value);
          console.log(`Selected Work Area: ${value}`);
        }
      }), jsx(Textarea, {
        label: "Environmental Considerations *",
        placeholder: `${isDraft ? draft == null ? void 0 : draft.environmentalConsideration : "Identify environmental issues related to the task."}`,
        ...getFieldProps("environmental_issues")
      })]
    }), jsx("h4", {
      children: "Permit Valid From / To"
    }), jsxs("div", {
      className: "app-register__form-grid",
      children: [jsxs("div", {
        className: "app-register__form-grid",
        children: [jsx(Input, {
          label: "From Date *",
          placeholder: `${isDraft ? draft == null ? void 0 : draft.fromDate : "dd / mm / yyyy"}`,
          type: "date",
          ...getFieldProps("from_date")
        }), jsx(Input, {
          label: "Time *",
          type: "time",
          ...getFieldProps("from_time")
        })]
      }), jsxs("div", {
        className: "app-register__form-grid",
        children: [jsx(Input, {
          label: "To Date *",
          placeholder: "dd / mm / yyyy",
          type: "date",
          ...getFieldProps("to_date")
        }), jsx(Input, {
          label: "Time *",
          type: "time",
          placeholder: "00:00AM",
          ...getFieldProps("to_time")
        })]
      })]
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Back"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
function getValidationSchema$3(isDraft) {
  const now = /* @__PURE__ */ new Date();
  const dateTimeValidation = Yup.string().required("This field is required");
  const fromDateTimeValidation = Yup.string().required("From date is required").test("is-not-in-past", "From date and time cannot be in the past", function(value) {
    const {
      from_time
    } = this.parent;
    const fromDateTime = /* @__PURE__ */ new Date(`${value}T${from_time}`);
    return fromDateTime >= now;
  });
  const toDateTimeValidation = Yup.string().required("To date is required").test("is-after-from", "To date and time must be after the From date and time", function(value) {
    const {
      from_date,
      from_time,
      to_time
    } = this.parent;
    const fromDateTime = /* @__PURE__ */ new Date(`${from_date}T${from_time}`);
    const toDateTime = /* @__PURE__ */ new Date(`${value}T${to_time}`);
    return toDateTime > fromDateTime;
  });
  if (isDraft) {
    return Yup.object({
      role: Yup.string(),
      performer: Yup.string(),
      work_description: Yup.string(),
      locationId: Yup.number(),
      work_area: Yup.string(),
      from_date: fromDateTimeValidation,
      to_date: toDateTimeValidation,
      from_time: dateTimeValidation,
      to_time: dateTimeValidation
    });
  }
  return Yup.object({
    role: Yup.string().required("Role is required"),
    performer: Yup.string().required("Performer is required"),
    work_description: Yup.string().required("Work description is required"),
    locationId: Yup.number().typeError("Location is required").required("Location is required"),
    work_area: Yup.string().required("Work area is required"),
    equipment_to_be_worked: Yup.string().required("Equipment is required"),
    environmental_issues: Yup.string().required("Environmental issue is required"),
    from_date: fromDateTimeValidation,
    to_date: toDateTimeValidation,
    from_time: dateTimeValidation,
    to_time: dateTimeValidation
  });
}
function Radio({
  label,
  ...props
}) {
  return jsxs("label", {
    className: "base-radio__wrapper",
    children: [jsxs("div", {
      className: "base-radio",
      children: [jsx("input", {
        type: "radio",
        ...props
      }), jsx("div", {
        className: "base-radio__checked-wrapper"
      }), jsx("div", {
        className: "base-radio__checked"
      })]
    }), label]
  });
}
function WorkHazards$1() {
  const {
    send,
    state
  } = usePermitContext();
  const {
    draft,
    isDraft
  } = useDraftDetails();
  console.log("draft details are", draft);
  const initialHazards = HAZARDS$2.reduce((acc, hazard) => {
    var _a, _b;
    acc[hazard.value] = ((_b = (_a = state.context.work_hazards) == null ? void 0 : _a.hazards) == null ? void 0 : _b[hazard.value]) ?? void 0;
    return acc;
  }, {});
  const validationSchema2 = getValidationSchema$2(isDraft);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue,
    values
  } = useForm({
    validationSchema: validationSchema2,
    initialValues: {
      ...state.context.work_hazards,
      hazards: initialHazards,
      permit_type: state.context.permit_type
    },
    onSubmit
  });
  function updateHazard(name, value) {
    setFieldValue("hazards", {
      ...values.hazards,
      [name]: value
    });
  }
  function onSubmit(work_hazards) {
    send("submit", {
      data: {
        work_hazards
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    children: [jsx("div", {
      className: "app-register__form",
      children: jsx("div", {
        className: "app-register__form-grid",
        children: jsx(Textarea, {
          label: "Describe the potential hazards *",
          placeholder: `${"Write here..."}`,
          ...getFieldProps("potentialHazardDescription")
        })
      })
    }), jsx("div", {
      className: "app-create-permit__group-header",
      children: "Identification of Hazards"
    }), jsxs("div", {
      className: "app-register__form",
      children: [HAZARDS$2.map((hazard) => {
        var _a, _b;
        return jsxs("div", {
          className: "app-create-permit__radio-container",
          children: [jsx("p", {
            children: hazard.text
          }), jsxs("div", {
            children: [jsx(Radio, {
              checked: ((_a = values.hazards) == null ? void 0 : _a[hazard.value]) === true,
              onChange: () => updateHazard(hazard.value, true),
              label: "YES"
            }), jsx(Radio, {
              checked: ((_b = values.hazards) == null ? void 0 : _b[hazard.value]) === false,
              onChange: () => updateHazard(hazard.value, false),
              label: "NO"
            })]
          })]
        }, hazard.value);
      }), jsx(Input, {
        type: "text",
        label: "Others",
        placeholder: "Others",
        ...getFieldProps("otherHazard")
      })]
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const HAZARDS$2 = [
  {
    text: "NOISE",
    value: "noise"
  },
  {
    text: "TOXIC SUBSTANCE",
    value: "toxicSubstance"
  },
  {
    text: "CHEMICAL",
    value: "chemical"
  },
  {
    text: "EXPLOSIVES",
    value: "explosives"
  },
  {
    text: "HEIGHT",
    value: "height"
  },
  {
    text: "OVERHEAD HAZARDS, CRANES, ETC",
    value: "overheadCranes"
  },
  {
    text: "ILLUMINATING",
    value: "illuminating"
  },
  {
    text: "SPILL (CONTAINMENT IN PLACE)",
    value: "spill"
  },
  {
    text: "FALLING OBJECTS",
    value: "falling"
  },
  {
    text: "RADIATION",
    value: "radiation"
  },
  {
    text: "TYPE OF WASTE IS KNOWN",
    value: "knownWaste"
  }
  // { text: "OTHER", value: "otherHazard" },
];
function getValidationSchema$2(isDraft) {
  if (isDraft) {
    return Yup.object({
      potentialHazardDescription: Yup.string().required("Describe the potential hazards.")
    });
  }
  return Yup.object({
    potentialHazardDescription: Yup.string().required("Describe the potential hazards.")
  });
}
const documentOptions$1 = ["Job Safety Analysis Doc / Risk Safety Analysis Doc", "Work Procedure Doc / Method Statement Doc", "Explosives Cert", "Mechanical Isolation Cert", "Gas Clearance Cert", "Scaffolding Cert", "MEWP Cert", "Man Basket Cert", "Near Powerlines Cert", "Radiography Cert", "Excavation Cert", "Lift Cert", "Hot Tapping Cert", "Diving or ROV Cert", "Man Riding Cert", "Other Cert"];
function Documents$2() {
  const {
    state,
    send
  } = usePermitContext();
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$O,
    initialValues: {
      documents: {
        [documentOptions$1[0]]: true,
        [documentOptions$1[1]]: true,
        ...state.context.selected_documents.documents
      },
      document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc: "manual",
      document_WorkProcedureDocMethodStatementDoc: "manual",
      permit_type: state.context.permit_type
    },
    onSubmit
  });
  const updateDocuments = (name, checked) => {
    const updatedDocuments = {
      ...values.documents,
      [name]: checked
    };
    setFieldValue("documents", updatedDocuments);
    if (!checked) {
      const selectName = `document_${name.replace(/ /g, "_")}`;
      setFieldValue(selectName, "");
      const updatedDocuments2 = {
        ...values.documents,
        [name]: checked
      };
      setFieldValue("documents", updatedDocuments2);
    }
  };
  function onSubmit(selected_documents) {
    send("submit", {
      data: {
        selected_documents
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("p", {
      children: "Select the document you want to upload below"
    }), jsx("div", {
      className: "app-register__form-grid app-create-permit__docs",
      children: documentOptions$1.map((document2, index) => jsxs("div", {
        children: [values.documents[document2] && !values[`document_${document2.replace(/ /g, "_")}`] && jsx("p", {
          className: "error",
          style: {
            color: "red"
          },
          children: "Please select an option for the selected document."
        }), jsx("br", {}), jsxs("label", {
          className: "app-register__attachment-form items-center",
          children: [jsx(Checkbox, {
            checked: !!values.documents[document2],
            disabled: index < 2,
            onChange: () => index >= 2 && updateDocuments(document2, !values.documents[document2])
            // Update only the specific document
          }), jsx("span", {
            children: document2
          })]
        }), jsx(Select, {
          ...getFieldProps(`document_${document2.replace(/ /g, "_")}`),
          options: [{
            text: "Manual Upload",
            value: "manual"
          }]
        })]
      }, index))
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Back"
      }), jsx(Button, {
        variant: "primary",
        type: "submit",
        children: "Next"
      })]
    })]
  });
}
const validationSchema$O = Yup.object().shape({
  documents: Yup.object().test("document-selection-validation", "Please select a corresponding dropdown option for all selected documents.", (documents, context) => {
    const selectedDocuments = Object.entries(documents || {}).filter(([_, checked]) => checked);
    return selectedDocuments.every(([document2]) => {
      const dropdownField = context.parent[`document_${document2.replace(/ /g, "_")}`];
      return dropdownField !== void 0 && dropdownField !== "";
    });
  }),
  document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc: Yup.string().required("Selection is required for the first document."),
  document_WorkProcedureDocMethodStatementDoc: Yup.string().required("Selection is required for the second document.")
});
function createPermit({
  permit_type,
  ...data
}) {
  return createRequest(`/permit/`, "POST", data);
}
function createDraft(data) {
  return createRequest(`/permit/draft`, "POST", data);
}
function getPermit({
  id
}) {
  return createRequest(`/permit/${id}`, "GET");
}
function approveIssuingAuth(data) {
  return createRequest("/permit/approve/issuing-auth", "POST", data);
}
function approveHseAuth(data) {
  return createRequest("/permit/approve/hse-auth", "POST", data);
}
function rejectHseAuth(data) {
  return createRequest("/permit/reject/hse", "PUT", data);
}
function approveAuthorizingAuth(data) {
  return createRequest("/permit/approve/authorizing-auth", "POST", data);
}
function approveIssuingSupervisor(data) {
  return createRequest("/permit/approve/issuing-auth-supervisor", "POST", data);
}
function rejectAuthorizingAuth(data) {
  return createRequest("/permit/reject/authorizing", "PUT", data);
}
function approvePerfSupervisor(data) {
  return createRequest("/permit/approve/performing-auth-supervisor", "POST", data);
}
function approveRevalidationPerfSupervisor(data) {
  return createRequest("/permit/revalidation/approve/performing-auth-supervisor", "POST", data);
}
function approveSafetyOfficer(data) {
  return createRequest("/permit/approve/safety-officer", "POST", data);
}
function approveRevalidationSafetyOfficer(data) {
  return createRequest("/permit/revalidation/approve/safety-officer", "POST", data);
}
function renewPermit(data) {
  return createRequest("/permit/renewal", "POST", data);
}
function AddOnsiteNote(data) {
  return createRequest("/permit/notes", "POST", data);
}
function suspendPermit(data) {
  return createRequest("/permit/suspend", "PUT", data);
}
function cancelPermit(data) {
  return createRequest("/permit/cancel", "PUT", data);
}
function completePermit(data) {
  return createRequest(`/permit/completion/${data.id}`, "PUT", {});
}
function getPermitRenewals(data) {
  return createRequest(`/permit/renewal/fetch/all?${createParams(data)}`, "GET");
}
function getPermitRenewal(data) {
  return createRequest(`/permit/renewal/${data.id}`, "GET");
}
function approveSafetyOfficerRenewal(data) {
  return createRequest("/permit/renewal/approve/safety-officer", "PUT", data);
}
function rejectSafetyOfficerRenewal(data) {
  return createRequest("/permit/renewal/reject/safety-officer", "PUT", data);
}
function approveIssuingAuthRenewal(data) {
  return createRequest("/permit/renewal/approve/issuring-sup", "PUT", data);
}
function rejectIssuingAuthRenewal(data) {
  return createRequest("/permit/renewal/reject/issuring-sup", "PUT", data);
}
function getPermitCompletions(data) {
  return createRequest(`/permit/completion/fetch/all?${createParams(data)}`, "GET");
}
function approveHseCompletion(data) {
  return createRequest(`/permit/completion/approve/hse-officer/${data.id}`, "PUT", {});
}
function rejectHseCompletion(data) {
  return createRequest(`/permit/completion/reject/hse-officer/${data.id}`, "PUT", {});
}
function approveIssuingAuthCompletion(data) {
  return createRequest(`/permit/completion/approve/issuring-sup/${data.id}`, "PUT", {});
}
function rejectIssuingAuthCompletion(data) {
  return createRequest(`/permit/completion/reject/issuring-sup/${data.id}`, "PUT", {});
}
function getSuspendedPermits() {
  return createRequest(`/permit/suspend/all`, "GET");
}
function getContinuationPermits(data) {
  return createRequest(`/permit/continuation/all?${createParams(data)}`, "GET");
}
function initiateContinuation(data) {
  return createRequest(`/permit/continuation/${data.id}`, "PUT", {});
}
function approveHseContinuation(data) {
  return createRequest(`/permit/continuation/approve/hse-officer/${data.id}`, "PUT", {});
}
function approveIssuingAuthContinuation(data) {
  return createRequest(`/permit/continuation/approve/issuring-sup/${data.id}`, "PUT", {});
}
function sendBackToAuthority(data) {
  return createRequest(`/permit/send-back`, "POST", data);
}
function requestPermitClosure(data) {
  return createRequest(`/permit/closure/request/${data}`, "PUT", {});
}
function requestPermitRevalidation(data) {
  return createRequest(`/permit/revalidation/request/${data}`, "PUT");
}
function closurePerfSupervisor(data) {
  return createRequest(`/permit/closure/approve/performing-auth-supervisor`, "POST", data);
}
function closureSafetyOfficer(data) {
  return createRequest(`/permit/closure/approve/safety-officer`, "POST", data);
}
function closureIssuingSupervisor(data) {
  return createRequest(`/permit/closure/approve/issuing-auth-supervisor`, "POST", data);
}
function approveRevalidationIssuingSupervisor(data) {
  return createRequest("/permit/revalidation/approve/issuing-auth-supervisor", "POST", data);
}
function addOnsiteNote(data) {
  return createRequest("/permit/note", "POST", data);
}
function getProcessablePermits() {
  return createRequest(`/permit/user/processable`, "GET");
}
function Section({
  children,
  header,
  section,
  type
}) {
  const childrenArray = Children.map(children, (child) => {
    return jsxs("div", {
      className: "",
      children: [type === "Hazards" && jsxs(Fragment$1, {
        children: [jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: child.title
          }), jsx("p", {
            className: "info",
            children: child.info
          })]
        }, child.id), jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: `${child.second_title}`
          }), jsxs("div", {
            children: [" ", child.content.map((item) => jsxs("div", {
              className: "",
              children: [jsx("span", {
                className: "hazard-value",
                children: `${item.value}`
              }), " - ", jsx("span", {
                className: "",
                children: `${item.hazard}`
              })]
            }))]
          })]
        }, child.id)]
      }), type === "Primary" && jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "title",
          children: child.title
        }), jsx("p", {
          className: "info",
          children: child.info
        })]
      }, child.id), type === "Secondary" && jsx("div", {
        className: "",
        children: child.content.map((item) => jsxs(Fragment$1, {
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: `${item.id}. ${item.title}`
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsxs("p", {
              children: [" ", item.upload_option]
            }), jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Document"
              })
            }), jsxs("p", {
              className: "document_item",
              children: ["document.pdf", jsx("span", {
                children: jsx("img", {
                  src: "/svgs/document_download.svg",
                  alt: ""
                })
              })]
            })]
          })]
        }))
      }, child.id), type === "Permits" && jsx("div", {
        className: "",
        children: child.content.map((item) => jsx(Fragment$1, {
          children: jsxs("div", {
            className: "section__content",
            children: [jsxs("p", {
              className: "title",
              children: [" ", item.title]
            }), jsxs("div", {
              className: "flex-between",
              children: [jsx("p", {
                children: item.upload_option
              }), jsxs("p", {
                className: "document_item",
                children: ["document.pdf", jsx("span", {
                  children: jsx("img", {
                    src: "/svgs/document_download.svg",
                    alt: ""
                  })
                })]
              })]
            })]
          })
        }))
      }, child.id), type === "List" && jsx("div", {
        className: "section__content",
        children: jsxs("div", {
          children: [" ", child.content.map((item) => jsxs("div", {
            className: "list-p",
            children: [jsxs("span", {
              children: [`${item.value}`, " ", " - "]
            }), jsx("span", {
              className: "hazard-value",
              children: `${item.equipment}`
            })]
          }))]
        })
      })]
    });
  });
  return jsx("div", {
    children: jsxs("div", {
      className: "section",
      children: [jsx("div", {
        className: "section__header",
        children: jsxs("p", {
          children: [jsxs("span", {
            children: ["Section - ", section]
          }), header]
        })
      }), jsx("div", {
        children: childrenArray
      })]
    })
  });
}
const ActivityAuthorizingMachine = () => createMachine({
  context: {
    work_hazards: {
      hazards: {},
      potentialHazardDescription: ""
    },
    personal_protective_equipment: {
      protectiveEquipment: {}
    },
    firefighting_equipment: {
      firefightingEquipment: {},
      otherPrecaution: ""
    },
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    mechanical_precaution: {
      mechanicalPrecaution: {}
    },
    electrical_precaution: {
      electricalPrecaution: {}
    },
    adjust_date_time: {
      fromDate: "",
      fromTime: "",
      toDate: "",
      toTime: ""
    },
    // tool_kit_time: {},
    submit: {}
  },
  predictableActionArguments: true,
  initial: "work_hazards",
  states: {
    work_hazards: {
      meta: {
        title: "Hazard Identification",
        section: "A"
      },
      on: {
        submit: {
          target: "personal_protective_equipment",
          actions: ["updateContext"]
        }
      }
    },
    personal_protective_equipment: {
      meta: {
        title: "Personal Protective Equipment",
        section: "B"
      },
      on: {
        submit: {
          target: "firefighting_equipment",
          actions: ["updateContext"]
        },
        go_back: "work_hazards"
      }
    },
    firefighting_equipment: {
      meta: {
        title: "Firefighting Equipment",
        section: "C"
      },
      on: {
        submit: {
          target: "selected_documents",
          actions: ["updateContext"]
        },
        go_back: "personal_protective_equipment"
      }
    },
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "D"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        },
        go_back: "firefighting_equipment"
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "E"
      },
      on: {
        submit: [{
          target: "mechanical_precaution",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    mechanical_precaution: {
      meta: {
        title: "Mechanical Isolation (Measures on Equipments / Line)"
      },
      on: {
        submit: {
          target: "electrical_precaution",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    },
    electrical_precaution: {
      meta: {
        title: "Electrical Isolation (Measures on Equipments / Line)"
      },
      on: {
        submit: [{
          target: "adjust_date_time",
          actions: ["updateContext"]
        }],
        go_back: "mechanical_precaution"
      }
    },
    adjust_date_time: {
      meta: {
        title: "Adjust Date & Time"
      },
      on: {
        submit: [{
          target: "submit",
          actions: ["updateContext"]
        }],
        go_back: "electrical_precaution"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "adjust_date_time"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context$6 = createContext({});
function PermitProvider$3({
  children
}) {
  const [state, send, service] = useMachine(ActivityAuthorizingMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$6.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function useAuthorizingActivityContext() {
  return useContext(Context$6);
}
function formatDateForBackend$1(fromDate, fromTime) {
  if (!fromDate || !fromTime) {
    throw new Error("Both fromDate and fromTime are required");
  }
  const timeISO = (/* @__PURE__ */ new Date(`1970-01-01T${fromTime}:00Z`)).toISOString();
  return timeISO;
}
function AuthProcessSubmit() {
  const {
    state
  } = useAuthorizingActivityContext();
  const {
    makeRequest
  } = useRequest(approveAuthorizingAuth);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    valueID
  } = useIDContext();
  const permitId = valueID;
  useEffect$1(() => {
    async function submitForm() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId,
        hazards: {
          potentialHazardDescription: ((_a = state.context.work_hazards) == null ? void 0 : _a.potentialHazardDescription) || "",
          ...(_b = state.context.work_hazards) == null ? void 0 : _b.hazards
        },
        protectiveEquipment: (_c = state.context.personal_protective_equipment) == null ? void 0 : _c.protectiveEquipment,
        firefightingPrecaution: {
          otherPrecaution: ((_d = state.context.firefighting_precaution) == null ? void 0 : _d.otherPrecaution) || "",
          ...(_e = state.context.firefighting_precaution) == null ? void 0 : _e.firefightingPrecaution
        },
        documents,
        mechanicalIsolationPrecaution: (_f = state.context.mechanical_precaution) == null ? void 0 : _f.mechanicalPrecaution,
        electricalIsolationPrecaution: (_g = state.context.electrical_precaution) == null ? void 0 : _g.electricalPrecaution,
        fromDate: (_h = state.context.adjust_date_time) == null ? void 0 : _h.fromDate,
        fromTime: formatDateForBackend$1((_i = state.context.adjust_date_time) == null ? void 0 : _i.fromDate, (_j = state.context.adjust_date_time) == null ? void 0 : _j.fromTime) || "",
        toDate: (_k = state.context.adjust_date_time) == null ? void 0 : _k.toDate,
        toTime: formatDateForBackend$1((_l = state.context.adjust_date_time) == null ? void 0 : _l.toDate, (_m = state.context.adjust_date_time) == null ? void 0 : _m.toTime) || "",
        authorizingAuthorityTimeAdjustment: ((_n = state.context.adjust_date_time) == null ? void 0 : _n.from_date) === "" ? false : true
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function AdditionalNotes() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  const {
    state,
    send
  } = usePermitContext();
  const {
    makeRequest,
    isLoading
  } = useRequest(createPermit);
  const {
    handleSubmit
  } = useForm({
    initialValues: state.context.additional_values || {},
    onSubmit,
    validationSchema: validationSchema$N
  });
  const {
    profile
  } = useUserContext();
  const companyApi = useRequest(getAllCompanies, {}, true);
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    var _a2;
    const companyData = (_a2 = companyApi == null ? void 0 : companyApi.response) == null ? void 0 : _a2.data;
    setCompanyList(companyData);
  });
  function getCompanyName(id) {
    if (!Array.isArray(companyList) || companyList.length === 0) {
      return "";
    }
    const companyId = Number(id);
    if (isNaN(companyId)) {
      return "";
    }
    const company = companyList.find((item) => item.id === companyId);
    return (company == null ? void 0 : company.name) || "";
  }
  const items = [{
    section: "A",
    header: "Work Type",
    content: [{
      id: 1,
      title: "Permit Type",
      info: convertSnakeCaseToTitleCase(state.context.permit_type)
    }]
  }, {
    section: "B",
    header: "Work Description",
    content: [{
      id: 1,
      title: "Role",
      info: (_a = state.context.work_description) == null ? void 0 : _a.role
    }, {
      id: 2,
      title: "Performing Person / Person In Charge",
      info: (_b = state.context.work_description) == null ? void 0 : _b.performer
    }, {
      id: 3,
      title: "Work Details",
      info: (_c = state.context.work_description) == null ? void 0 : _c.work_description
    }, {
      id: 4,
      title: "Equipment / Tools / Materials",
      info: (_d = state.context.work_description) == null ? void 0 : _d.equipment_to_be_worked
    }, {
      id: 5,
      title: "Environmental Considerations",
      info: (_e = state.context.work_description) == null ? void 0 : _e.environmental_issues
    }, {
      id: 6,
      title: "Work Location / Work Area",
      info: (profile == null ? void 0 : profile.locationId) + " / " + ((_f = state.context.work_description) == null ? void 0 : _f.work_area)
    }, {
      id: 7,
      title: "Permit Valid From - To (Date & Time)",
      info: `${dayjs((_g = state.context.work_description) == null ? void 0 : _g.from_date).format("dddd, MMM D YYYY")} : ${(_h = state.context.work_description) == null ? void 0 : _h.from_time}- ${dayjs((_i = state.context.work_description) == null ? void 0 : _i.to_date).format("dddd, MMM D YYYY")} : ${(_j = state.context.work_description) == null ? void 0 : _j.to_time}`
    }]
  }, {
    section: "C",
    header: "Company Details",
    content: [{
      id: 1,
      title: "Entrusted Company",
      info: getCompanyName((_k = state.context.company_details) == null ? void 0 : _k.entrusted_company)
    }, {
      id: 2,
      title: "Executing Company",
      info: getCompanyName((_l = state.context.company_details) == null ? void 0 : _l.executing_company)
    }, {
      id: 3,
      title: "Performing Department",
      info: (_m = state.context.company_details) == null ? void 0 : _m.performing_department
    }, {
      id: 4,
      title: "Contact Phone Number",
      info: (_n = state.context.company_details) == null ? void 0 : _n.company_contact_phone
    }]
  }, {
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: (_o = state.context.work_hazards) == null ? void 0 : _o.potentialHazardDescription
    }]
  }];
  const selectedHazards = ((_p = state.context.work_hazards) == null ? void 0 : _p.hazards) || {};
  const renderHazards = () => {
    return HAZARDS$2.filter((hazard) => selectedHazards.hasOwnProperty(hazard.value) && selectedHazards[hazard.value] !== void 0 && selectedHazards[hazard.value] !== null).map((hazard) => jsx("div", {
      className: "hazard-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "hazard-value",
          children: selectedHazards[hazard.value] ? "YES" : "NO"
        }), " ", "- ", hazard.text]
      })
    }, hazard.value));
  };
  const documents = [{
    section: "E",
    header: "Document Uploads",
    content: []
  }];
  const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
    name,
    type: value.type || "MANUAL",
    doc: value.doc || ""
  }));
  console.log(state.context);
  async function onSubmit(data) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2;
    console.log(data);
    console.log("selectedHazards", selectedHazards);
    const filteredHazards = {};
    Object.entries(selectedHazards).forEach(([key, value]) => {
      console.log(key, value);
      if (value !== void 0) {
        filteredHazards[key] = value;
      }
    });
    const toCamelCase = (str) => {
      return str.replace(/\/.*|\(.*?\)/g, "").replace(/_/g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
    };
    const documents2 = selectedDocuments.reduce((acc, doc) => {
      const camelCaseName = toCamelCase(doc.name);
      if (camelCaseName === "otherCert") {
        acc[`${camelCaseName}Name`] = "...";
      }
      acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
      acc[`${camelCaseName}`] = doc.doc;
      return acc;
    }, {});
    const payload = {
      type: state.context.permit_type.toUpperCase(),
      workArea: (_a2 = state.context.work_description) == null ? void 0 : _a2.work_area,
      locationId: Number(profile == null ? void 0 : profile.locationId),
      performerRole: (_b2 = state.context.work_description) == null ? void 0 : _b2.role,
      performerPersonInCharge: (_c2 = state.context.work_description) == null ? void 0 : _c2.performer,
      workDescription: (_d2 = state.context.work_description) == null ? void 0 : _d2.work_description,
      equipmentToolsMaterials: (_e2 = state.context.work_description) == null ? void 0 : _e2.equipment_to_be_worked,
      environmentalConsideration: (_f2 = state.context.work_description) == null ? void 0 : _f2.environmental_issues,
      fromDate: (_g2 = state.context.work_description) == null ? void 0 : _g2.from_date,
      fromTime: formatDateForBackend$1((_h2 = state.context.work_description) == null ? void 0 : _h2.from_date, (_i2 = state.context.work_description) == null ? void 0 : _i2.from_time),
      toDate: (_j2 = state.context.work_description) == null ? void 0 : _j2.to_date,
      toTime: formatDateForBackend$1((_k2 = state.context.work_description) == null ? void 0 : _k2.to_date, (_l2 = state.context.work_description) == null ? void 0 : _l2.to_time),
      entrustedCompanyId: Number((_m2 = state.context.company_details) == null ? void 0 : _m2.entrusted_company),
      executingCompanyId: Number((_n2 = state.context.company_details) == null ? void 0 : _n2.executing_company),
      performingDepartment: (_o2 = state.context.company_details) == null ? void 0 : _o2.performing_department,
      contractorPhoneNumber: (_p2 = state.context.company_details) == null ? void 0 : _p2.company_contact_phone,
      hazard: {
        potentialHazardDescription: ((_q2 = state.context.work_hazards) == null ? void 0 : _q2.potentialHazardDescription) || "",
        ...filteredHazards
      },
      documents: documents2
    };
    console.log(payload);
    const [_, error] = await makeRequest(payload);
    if (error) {
      return toast({
        variant: "error",
        message: error.message ?? "Failed to create permit, please try again"
      });
    }
    route("/");
    toast({
      variant: "success",
      message: "Permit created successfully"
    });
  }
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__form app-register__attachment-form",
    children: [jsxs("div", {
      className: "app-register__content__header app-create-permit__header",
      children: [jsx("h3", {
        children: "Permit Summary"
      }), jsx("div", {
        className: "",
        children: jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        })
      })]
    }), jsx("p", {
      children: "Review your permit to work before final submission."
    }), jsx("div", {}), items.map((item) => jsx(Section, {
      type: "Primary",
      header: item.header,
      children: item.content,
      section: item.section
    })), jsx("div", {
      className: "section",
      children: jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "title",
          children: "Identification of potential hazards"
        }), jsx("p", {
          className: "info",
          children: Object.keys(selectedHazards).length > 0 ? renderHazards() : jsx("p", {
            children: "No hazards selected."
          })
        })]
      })
    }), jsx(Section, {
      type: "Secondary",
      header: "Documents",
      children: documents[0],
      section: (_q = documents[0]) == null ? void 0 : _q.section
    }), (selectedDocuments == null ? void 0 : selectedDocuments.length) > 0 ? selectedDocuments.map((item, index) => jsxs("div", {
      className: "section__content__document_section",
      children: [jsx("p", {
        className: "section__header",
        children: convertSnakeCaseToTitleCase(item.name)
      }), jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "document",
          children: jsx("span", {
            children: "Upload Option"
          })
        }), jsx("p", {
          children: item.type
        }), jsx("p", {
          className: "document",
          children: jsx("span", {
            children: "Document"
          })
        }), jsxs("p", {
          className: "document_item",
          children: [jsxs(Link, {
            className: "app-link",
            href: item.doc,
            children: [" ", extractFileName(`${item.doc}`)]
          }), jsx("span", {
            children: jsx("img", {
              src: "/svgs/document_download.svg",
              alt: ""
            })
          })]
        })]
      })]
    }, index)) : jsx("p", {
      children: "No documents uploaded."
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        isLoading,
        children: "SUBMIT"
      })]
    })]
  });
}
const validationSchema$N = Yup.object({
  // additional_notes: Yup.string().optional(),
});
function PermitType() {
  const {
    draft,
    isDraft
  } = useDraftDetails();
  const {
    state,
    send
  } = usePermitContext();
  const validationSchema2 = getValidationSchema$1(isDraft);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      permit_type: state.context.permit_type
    },
    onSubmit,
    validationSchema: validationSchema2
  });
  function onSubmit({
    permit_type
  }) {
    const finalPermitType = permit_type || (isDraft ? draft.type.toLowerCase() : null);
    const dataToSend = draft ? {
      permit_type: finalPermitType
    } : {
      permit_type: finalPermitType
    };
    send("submit", {
      data: dataToSend
    });
  }
  return jsx("div", {
    className: "app-create-permit__header",
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__form",
      children: [jsx("div", {
        className: "app-register__form-grid",
        children: jsx(Select, {
          ...getFieldProps("permit_type"),
          placeholder: `${isDraft ? draft == null ? void 0 : draft.type.replace(/_/g, " ") : "Select Permit Type"}`,
          options: [{
            text: "Hot Work",
            value: "hot_work"
          }, {
            text: "Cold Work",
            value: "cold_work"
          }]
          // required
        })
      }), jsx("div", {
        className: "app-register__form-footer",
        children: jsx(Button, {
          variant: "primary",
          children: "Next"
        })
      })]
    })
  });
}
function getValidationSchema$1(isDraft) {
  if (isDraft) {
    return Yup.object({
      permit_type: Yup.string()
    });
  }
  return Yup.object({
    permit_type: Yup.string().required("Permit type is required")
  });
}
function CompanyDetails$1() {
  var _a, _b;
  const companyApi = useRequest(getAllCompanies, {}, true);
  const [companyName, setCompanyName] = useState("--select entrusted company--");
  const {
    draft,
    isDraft
  } = useDraftDetails();
  const [options2, setOptions] = useState([]);
  useEffect(() => {
    if (companyName && (companyApi == null ? void 0 : companyApi.response)) {
      const companyData = companyApi.response.data;
      const items = companyData ? companyData.map((company) => ({
        text: company.name,
        value: company.id
      })) : [{
        text: "No company found",
        value: ""
      }];
      setOptions(items);
    }
  }, [companyName, companyApi.response]);
  const validationSchema2 = getValidationSchema(isDraft);
  const {
    send,
    state
  } = usePermitContext();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema2,
    initialValues: {
      ...state.context.company_details,
      permit_type: state.context.permit_type
    },
    onSubmit
  });
  function onSubmit(values) {
    const company_details = {
      entrusted_company: values.entrusted_company || (draft == null ? void 0 : draft.entrustedCompanyId),
      executing_company: values.executing_company || (draft == null ? void 0 : draft.executingCompanyId),
      performing_department: values.performing_department || (draft == null ? void 0 : draft.performingDepartment),
      company_contact_phone: values.company_contact_phone || (draft == null ? void 0 : draft.contractorPhoneNumber)
    };
    send("submit", {
      data: {
        company_details
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    children: [jsx("div", {
      className: "app-register__form",
      children: jsxs("div", {
        className: "app-register__form-grid",
        children: [jsx(Select, {
          label: "Entrusted Company (Optional)",
          placeholder: `${isDraft ? `${(_a = draft == null ? void 0 : draft.entrustedCompany) == null ? void 0 : _a.name}` : companyName}`,
          ...getFieldProps("entrusted_company"),
          options: options2,
          onChange: (e) => {
            const value = Number(e.target.value);
            getFieldProps("locationId").onChange(e);
            setCompanyName("value");
            console.log(`Selected company: ${value}`);
          }
          // required
        }), jsx(Select, {
          label: "Executing Company (Optional)",
          placeholder: `${isDraft ? `${(_b = draft == null ? void 0 : draft.executingCompany) == null ? void 0 : _b.name}` : ""}`,
          ...getFieldProps("executing_company"),
          options: options2,
          onChange: (e) => {
            const value = Number(e.target.value);
            getFieldProps("locationId").onChange(e);
            console.log(`Selected company: ${value}`);
          }
        }), jsx(Input, {
          label: "Performing Department *",
          placeholder: `${isDraft ? `${draft == null ? void 0 : draft.performingDepartment}` : "Enter performing Dept."}`,
          ...getFieldProps("performing_department")
        }), jsx(Input, {
          label: "Contact Phone Number (Optional)",
          placeholder: `${isDraft ? `${draft == null ? void 0 : draft.contractorPhoneNumber}` : "Enter contact phone number"}`,
          type: "text",
          ...getFieldProps("company_contact_phone"),
          onInput: (e) => {
            const input = e.target;
            input.value = input.value.replace(/[^0-9]/g, "");
          }
        })]
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
function getValidationSchema(isDraft) {
  if (isDraft) {
    return Yup.object({
      performing_department: Yup.string()
    });
  }
  return Yup.object({
    performing_department: Yup.string().required("Performing Department is required")
  });
}
function UploadDocument({
  onChange,
  isTouched,
  error,
  label = "",
  onUploadComplete,
  ...props
}) {
  var _a, _b, _c, _d;
  const objectURL = useMemo(() => {
    return props.value ? URL.createObjectURL(props.value) : null;
  }, [props.value]);
  async function handleFileUpload(file) {
    if (!file) {
      console.error("No file provided for upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "formData");
    try {
      const response = await fetch(
        // "http://localhost:3000/api/file/upload",
        "https://eptw.ankursolutions.com/api/file/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          },
          body: formData
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      onUploadComplete(data.data);
      console.log(data);
    } catch (error2) {
      return [null, error2];
    }
  }
  function handleChange(e) {
    const file = e.currentTarget.files[0];
    onChange(file);
    handleFileUpload(file);
  }
  return jsxs("div", {
    className: "base-upload-field-container",
    children: [label ? jsx("span", {
      className: "base-upload-field-label",
      children: label
    }) : null, jsxs("div", {
      className: "base-upload-field",
      "data-show-placeholder": !objectURL,
      children: [jsx("input", {
        type: "file",
        ...props,
        onChange: handleChange
      }), ["image/jpeg", "image/png"].includes((_a = props.value) == null ? void 0 : _a.type) ? jsx("img", {
        src: objectURL,
        alt: (_b = props.value) == null ? void 0 : _b.name
      }) : jsx("object", {
        data: objectURL,
        width: "45",
        height: "45",
        children: jsx(Icon, {
          name: "upload"
        })
      }), jsxs("div", {
        className: "base-upload-field__text",
        "data-has-error": Boolean(isTouched && error),
        children: [jsx("p", {
          children: ((_c = props.value) == null ? void 0 : _c.name) ?? "Upload Attachment"
        }), props.value ? jsxs("span", {
          children: [(((_d = props.value) == null ? void 0 : _d.size) / 1024).toFixed(2), " KB"]
        }) : null]
      }), objectURL ? jsx("button", {
        className: "base-upload-field__close-btn",
        onClick: (e) => {
          e.stopPropagation();
          onChange(null);
        },
        children: jsx("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 32 32",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            d: "M8 24L24 8M8 8L24 24",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }) : null]
    })]
  });
}
function Documents$1() {
  const {
    state,
    send
  } = usePermitContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema: validationSchema$M
  });
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const excludedKeys = ["document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc", "document_WorkProcedureDocMethodStatementDoc"];
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual" && !excludedKeys.includes(key)).map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$M = Yup.object({});
const PermitContext = createContext(null);
function removeCircularReferences(obj) {
  const seen = /* @__PURE__ */ new Set();
  function cleaner(obj2) {
    if (obj2 && typeof obj2 === "object") {
      if (seen.has(obj2)) {
        return;
      }
      seen.add(obj2);
      Object.keys(obj2).forEach((key) => {
        obj2[key] = cleaner(obj2[key]);
      });
    }
    return obj2;
  }
  return cleaner(obj);
}
const PermitDetailsProvider = ({
  children
}) => {
  const [permit, setPermit] = useState(() => {
    const savedPermit = localStorage.getItem("permit-details");
    return savedPermit ? JSON.parse(savedPermit) : null;
  });
  useEffect(() => {
    if (permit) {
      const cleanedPermit = removeCircularReferences(permit);
      localStorage.setItem("permit-details", JSON.stringify(cleanedPermit));
    }
  }, [permit]);
  const updatePermit = (newPermit) => {
    setPermit(newPermit);
  };
  return jsx(PermitContext.Provider, {
    value: {
      permit,
      updatePermit
    },
    children
  });
};
const usePermitDetails = () => {
  return useContext(PermitContext);
};
const PerfRevalidationMachine = createMachine({
  context: {
    verification: {
      closureWorkAreaConfirmation: false,
      revalidateWorkAreaConfirmation: false
    },
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    }
  },
  predictableActionArguments: true,
  initial: "verification",
  states: {
    verification: {
      meta: {
        title: "Take Commitment",
        section: "A"
      },
      on: {
        submit: {
          target: "selected_documents",
          actions: ["updateContext"]
        }
      }
    },
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "B"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        },
        go_back: "verification"
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "C"
      },
      on: {
        submit: [{
          target: "submit",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context$5 = createContext({});
function RevalidationProvider({
  children
}) {
  const [state, send, service] = useMachine(PerfRevalidationMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$5.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function usePerfRevalidationContext() {
  return useContext(Context$5);
}
function formatDateForBackend(fromDate, fromTime) {
  if (!fromDate || !fromTime) {
    throw new Error("Both fromDate and fromTime are required");
  }
  const timeISO = (/* @__PURE__ */ new Date(`1970-01-01T${fromTime}:00Z`)).toISOString();
  return timeISO;
}
function PerfClosureSubmit() {
  const {
    state
  } = usePerfRevalidationContext();
  const {
    makeRequest
  } = useRequest(closurePerfSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        closureWorkAreaConfirmation: state.context.verification.closureWorkAreaConfirmation,
        documents
      };
      console.log(payload);
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to close permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit closure approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$f() {
  var _a;
  const {
    state
  } = usePermitContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$d.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const {
    updateIsDraft
  } = useDraftDetails();
  const [draftPopup, setDraftPopup] = useState(false);
  const {
    makeRequest
  } = useRequest(createDraft);
  function handlePopup(value) {
    setDraftPopup(value);
  }
  function handleGoBack() {
    updateIsDraft(false);
    route("/");
  }
  async function handleCreateDraft() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const payload = {
      type: state.context.permit_type.toUpperCase(),
      workArea: (_a2 = state.context.work_description) == null ? void 0 : _a2.work_area,
      locationId: 1,
      performerRole: (_b = state.context.work_description) == null ? void 0 : _b.role,
      performerPersonInCharge: (_c = state.context.work_description) == null ? void 0 : _c.performer,
      workDescription: (_d = state.context.work_description) == null ? void 0 : _d.work_description,
      equipmentToolsMaterials: (_e = state.context.work_description) == null ? void 0 : _e.equipment_to_be_worked,
      environmentalConsideration: (_f = state.context.work_description) == null ? void 0 : _f.environmental_issues,
      fromDate: (_g = state.context.work_description) == null ? void 0 : _g.from_date,
      fromTime: formatDateForBackend((_h = state.context.work_description) == null ? void 0 : _h.from_date, (_i = state.context.work_description) == null ? void 0 : _i.from_time),
      toDate: (_j = state.context.work_description) == null ? void 0 : _j.to_date,
      toTime: formatDateForBackend((_k = state.context.work_description) == null ? void 0 : _k.to_date, (_l = state.context.work_description) == null ? void 0 : _l.to_time),
      entrustedCompanyId: 1,
      executingCompanyId: 1,
      performingDepartment: (_m = state.context.company_details) == null ? void 0 : _m.performing_department,
      contractorPhoneNumber: (_n = state.context.company_details) == null ? void 0 : _n.company_contact_phone,
      hazard: {
        potentialHazardDescription: ((_o = state.context.work_hazards) == null ? void 0 : _o.potentialHazardDescription) || "",
        ...((_p = state.context.work_hazards) == null ? void 0 : _p.hazards) || {}
      },
      documents: {
        jobSafetyAnalysisType: "MANUAL",
        jobSafetyAnalysisDoc: "...",
        workProcedureType: "MANUAL",
        workProcedureDoc: "..."
      }
    };
    const [_, error] = await makeRequest(payload);
    if (error) {
      return toast({
        variant: "error",
        message: error.message ?? "Failed to create draft, please try again"
      });
    }
    updateIsDraft(false);
    route("/");
    toast({
      variant: "success",
      message: "Draft created successfully"
    });
  }
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsxs("h5", {
          children: ["Permit To Work Form", " ", state.context.permit_type && !state.matches("permit_type") ? `/ ${capitalize(state.context.permit_type.split("_")[0])} Work` : ""]
        }), jsx("div", {
          className: "",
          children: state.matches("permit_type") || state.matches("work_description") || state.matches("company_details") ? jsx(Fragment$1, {
            children: jsx(Button, {
              className: "app-link",
              onClick: () => handleGoBack(),
              children: "Go back to home page"
            })
          }) : jsxs(Button, {
            className: "app-link",
            onClick: () => handlePopup(true),
            children: [" ", "Go back to home page"]
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("additional_notes") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$d.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$d.length * 100}%`
              }
            })
          })]
        }), state.matches("permit_type") && jsx(PermitType, {}), state.matches("work_description") && jsx(WorkDescription, {}), state.matches("company_details") && jsx(CompanyDetails$1, {}), state.matches("work_hazards") && jsx(WorkHazards$1, {}), state.matches("selected_documents") && jsx(Documents$2, {}), state.matches("document_uploads") && jsx(Documents$1, {}), state.matches("additional_notes") && jsx(AdditionalNotes, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: draftPopup && jsx(PopupModal, {
        icon: jsx("img", {
          src: "/svgs/save-draft.svg"
        }),
        title: "Save Draft",
        message: "You can save as draft, so you can be able to continue from where you stopped",
        onClose: () => handlePopup(false),
        primaryButton: {
          label: "Save As Draft",
          onClick: handleCreateDraft,
          color: "#D30021"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => route("/"),
          color: "#E86E18"
        }
      })
    })]
  });
}
const STEPS$d = ["permit_type", "work_description", "company_details", "work_hazards", "selected_documents", "document_uploads", "additional_notes"];
function CreatePermit({}) {
  return jsx(PermitProvider$4, {
    children: jsx(Module$f, {})
  });
}
function Tabs({
  tabs,
  counts = {}
}) {
  return jsx("div", {
    className: "base-tabs",
    children: tabs.map((tab) => jsxs("button", {
      "data-isActive": tab.isActive,
      onClick: tab.onClick,
      children: [tab.label, counts[tab.key] ? jsx("span", {
        children: counts[tab.key]
      }) : null]
    }))
  });
}
function Accordion({
  title = "",
  children,
  show = false
}) {
  const [isOpen, setIsOpen] = useState(show || !title);
  return jsxs("div", {
    className: "base-accordion",
    children: [title ? jsxs("div", {
      className: "base-accordion__header",
      onClick: () => setIsOpen((prev) => !prev),
      children: [jsx("h1", {
        children: title
      }), jsx("div", {
        className: "icon",
        "data-isOpen": isOpen,
        children: jsx("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M11.4698 7.71934C11.6105 7.57889 11.8011 7.5 11.9998 7.5C12.1986 7.5 12.3892 7.57889 12.5298 7.71934L20.0298 15.2193C20.1035 15.288 20.1626 15.3708 20.2036 15.4628C20.2446 15.5548 20.2667 15.6541 20.2684 15.7548C20.2702 15.8555 20.2517 15.9555 20.214 16.0489C20.1762 16.1423 20.1201 16.2272 20.0489 16.2984C19.9777 16.3696 19.8928 16.4257 19.7994 16.4635C19.7061 16.5012 19.606 16.5197 19.5053 16.5179C19.4046 16.5162 19.3053 16.4941 19.2133 16.4531C19.1213 16.4121 19.0385 16.353 18.9698 16.2793L11.9998 9.30934L5.02985 16.2793C4.88767 16.4118 4.69963 16.4839 4.50532 16.4805C4.31102 16.4771 4.12564 16.3984 3.98822 16.261C3.85081 16.1235 3.7721 15.9382 3.76867 15.7439C3.76524 15.5496 3.83737 15.3615 3.96985 15.2193L11.4698 7.71934Z",
            fill: "black"
          })
        })
      })]
    }) : null, isOpen && jsx("div", {
      className: "base-accordion__content",
      children
    })]
  });
}
function AccordionItem({
  title,
  value = ""
}) {
  return jsxs("div", {
    className: "base-accordion__item",
    children: [jsx("div", {
      children: title
    }), jsx("div", {
      children: value
    })]
  });
}
function AccordionItemTitle({
  children
}) {
  return jsxs("div", {
    className: "base-accordion__item base-accordion__item-title",
    children: [jsx("div", {
      children
    }), jsx("div", {})]
  });
}
function AccordionGap() {
  return jsxs("div", {
    className: "base-accordion__item base-accordion__gap",
    children: [jsx("div", {}), jsx("div", {})]
  });
}
function HseAuth({
  permit
}) {
  const approveApi = useRequest(approveHseAuth);
  const rejectApi = useRequest(rejectHseAuth);
  const isApproved = permit.hseAuthorityStatus === "APPROVED";
  const {
    values: {
      notes
    },
    getFieldProps,
    values
  } = useForm({
    initialValues: {
      notes: "",
      permitId: +permit.id
    },
    validationSchema: Yup.object({}),
    onSubmit: () => null
  });
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.hseAuthorityStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve or reject this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details (Additional notes must be filled if you are rejecting this permit, to state the reason for rejection)."
      }), jsx(Textarea, {
        label: "Additional Note",
        placeholder: "Write here...",
        ...getFieldProps("notes")
      }), jsxs("div", {
        className: "app-ptw__details__module__btn-footer",
        children: [jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        }), jsx(Button, {
          variant: "secondary",
          onClick: () => toggle("confirmRejection"),
          disabled: !notes,
          children: "Reject Permit"
        })]
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.hseAuthorityStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "ROBERT FOX"
      }), jsx(AccordionItem, {
        title: "Additional Notes",
        value: permit.hseAuthorityNotes || "--"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "HSE Auth"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "HSE Auth"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function IssuingAuth$3({
  permit
}) {
  var _a, _b, _c, _d;
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      notes: "",
      permitId: +permit.id
    },
    onSubmit: submitRejectForm,
    validationSchema: Yup.object({
      notes: Yup.string().required("Additional note is required")
    })
  });
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  const isApproved = permit.issuringAuthorityStatus === "APPROVED";
  const isHotWork = permit.type === "HOT_WORK";
  async function submitRejectForm() {
  }
  return jsxs("div", {
    className: "app-section",
    children: [isHotWork && isApproved && jsxs(Accordion, {
      show: true,
      title: jsxs(Fragment$1, {
        children: [jsx("span", {
          children: "Section C - "
        }), "PRECAUTIONS TO BE TAKEN"]
      }),
      children: [jsx(AccordionItemTitle, {
        children: "MEASURES ON EQUIPMENT / LINES"
      }), (_a = permit.measuresOnEquipment) == null ? void 0 : _a.map((t) => jsx(AccordionItem, {
        title: t
      })), jsx(AccordionItemTitle, {
        children: "PRECAUTION"
      }), (_b = permit.precautions) == null ? void 0 : _b.map((t) => jsx(AccordionItem, {
        title: t
      })), jsx(AccordionItemTitle, {
        children: "FIREFIGHTING PRECAUTION"
      }), (_c = permit.firefightingPrecautions) == null ? void 0 : _c.map((t) => jsx(AccordionItem, {
        title: t
      })), jsx(AccordionItemTitle, {
        children: "PERSONNEL PROTECTIVE EQUIPMENT"
      }), (_d = permit.protectiveEquipment) == null ? void 0 : _d.map((t) => jsx(AccordionItem, {
        title: t
      })), jsx(AccordionItemTitle, {
        children: "COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS"
      }), jsx(AccordionItem, {
        title: "Entry Certificate",
        value: permit.entryCertNo
      }), jsx(AccordionItem, {
        title: "Electronic Isolation Cert.",
        value: permit.electronicIsolationCertNo
      }), jsx(AccordionItem, {
        title: "Explosives Cert.",
        value: permit.explosivesCertNo
      }), jsx(AccordionItem, {
        title: "Mechanical isolation Cert.",
        value: permit.MechanicalIsolationCertNo
      }), jsx(AccordionItem, {
        title: "Gas Clearance",
        value: permit.gasClearanceCertNo
      }), jsx(AccordionItem, {
        title: "Scaffolding Cert.",
        value: permit.scaffoldingCertNo
      }), jsx(AccordionItem, {
        title: "MEWP Cert.",
        value: permit.mewpCertNo
      }), jsx(AccordionItem, {
        title: "Man Basket Cert.",
        value: permit.manBasketCertNo
      }), jsx(AccordionItem, {
        title: "Work Near Powerlines Cert.",
        value: permit.nearPowerlinesCertNo
      }), jsx(AccordionItem, {
        title: "Radiography cert.",
        value: permit.radiographyCertNo
      }), jsx(AccordionItem, {
        title: "Excavation Cert.",
        value: permit.excavationCertNo
      }), jsx(AccordionItem, {
        title: "Lift Cert.",
        value: permit.liftCertNo
      }), jsx(AccordionItem, {
        title: "Hot Tapping Cert.",
        value: permit.hotTappingCertNo
      }), jsx(AccordionItem, {
        title: "Diving / ROV Cert.",
        value: permit.divingOrRovCertNo
      }), jsx(AccordionItem, {
        title: "Man Riding Cert.",
        value: permit.manRidingCertNo
      })]
    }), permit.issuringAuthorityStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve or reject this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details (Additional notes must be filled if you are rejecting this permit, to state the reason for rejection)."
      }), jsxs("div", {
        className: "app-ptw__details__module__btn-footer",
        children: [jsx(Button, {
          variant: "primary",
          onClick: () => isHotWork ? route(`/permit-management/ptw/approve/${permit.id}`) : toggle("confirmApproval"),
          children: "Approve Permit"
        }), jsx(Button, {
          variant: "secondary",
          onClick: () => toggle("confirmRejection"),
          children: "Reject Permit"
        })]
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.issuringAuthorityStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "ROBERT FOX"
      }), jsx(AccordionItem, {
        title: "Additional Notes",
        value: permit.issuringAuthorityNotes || "--"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsxs(ModalHeader, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), "Reject permit"]
      }), jsx(ModalBody, {
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsxs("div", {
            className: "app-ptw-reject-modal",
            children: [jsxs("p", {
              className: "app-modal__content__desc",
              children: ["By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards.", jsx("br", {}), jsx("br", {}), "Kindly state the reason for rejecting this permit below;"]
            }), jsx(Textarea, {
              label: "Additional Note",
              placeholder: "Write here...",
              ...getFieldProps("notes")
            })]
          }), jsxs("div", {
            className: "app-modal__content__footer",
            children: [jsx(Button, {
              variant: "secondary",
              onClick: () => toggle("confirmRejection"),
              type: "button",
              children: "Cancel"
            }), jsx(Button, {
              variant: "danger",
              type: "submit",
              children: "Reject"
            })]
          })]
        })
      })]
    })]
  });
}
function PtwDetails({
  permit
}) {
  var _a, _b, _c, _d, _e, _f;
  const suspensionApi = useRequest(suspendPermit);
  const completionApi = useRequest(completePermit);
  const {
    modals,
    toggle
  } = useModal({
    completion: false,
    suspension: false
  });
  const hazards = HAZARDS$2.filter((h2) => permit[h2.value]);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    onSubmit,
    initialValues: {
      notes: ""
    },
    validationSchema: Yup.object({
      notes: Yup.string().required("Additional note is required.")
    })
  });
  async function onSubmit(data) {
    const [_, err] = await suspensionApi.makeRequest({
      permitId: permit.id,
      ...data
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to suspend permit. Please try again"
      });
    }
    if (modals.suspension)
      toggle("suspension");
    toast({
      variant: "success",
      message: "Permit suspended successfully"
    });
  }
  async function completePermitToWork() {
    const [res, err] = await completionApi.makeRequest({
      id: permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to complete permit. Please try again"
      });
    }
    if (modals.completion)
      toggle("completion");
    toast({
      variant: "success",
      message: res.message
    });
  }
  return jsxs("div", {
    className: "app-section",
    children: [
      jsxs(Accordion, {
        show: true,
        title: jsxs(Fragment$1, {
          children: [jsx("span", {
            children: "Section A - "
          }), "Work Description"]
        }),
        children: [jsx(AccordionItem, {
          title: "Work Type",
          value: capitalize((_a = permit.type) == null ? void 0 : _a.replace("_", " ").toLowerCase())
        }), jsx(AccordionItem, {
          title: "Performing Department",
          value: permit.performingDepartMent
        }), jsx(AccordionItem, {
          title: "Location of Work",
          value: `${permit.location.address}, ${permit.location.state}, ${permit.location.country}`
        }), jsx(AccordionItem, {
          title: "Plant / Equipment to be worked upon",
          value: permit.plantNEquipment
        }), jsx(AccordionItem, {
          title: "Type of Process",
          value: permit.processType
        }), jsx(AccordionItem, {
          title: "Contractor",
          value: permit.contractor ? `${(_b = permit.contractor) == null ? void 0 : _b.firstname} ${(_c = permit.contractor) == null ? void 0 : _c.lastname}` : "--"
        }), jsx(AccordionItem, {
          title: "Contact Tel. No.",
          value: permit.contactTel
        }), jsx(AccordionItem, {
          title: "Contact Phone No.",
          value: permit.contactPhone
        }), jsx(AccordionItem, {
          title: "No. of Personnel for Activity",
          value: "18"
        }), jsx(AccordionItem, {
          title: "Work to be Performed",
          value: permit.workDescription
        }), jsx(AccordionItem, {
          title: "Equipment / Tools / Materials",
          value: permit.equipment
        }), jsx(AccordionItem, {
          title: "What Type of Environmental Issues",
          value: hazards.map((h2) => capitalize(h2.text.toLowerCase())).join(", ") || "--"
        }), jsx(AccordionItem, {
          title: "Permit Valid From (Date & Time)",
          value: dayjs(permit.validityStartDate).format("DD, MMM, YYYY, HH:mm A")
        }), jsx(AccordionItem, {
          title: "Permit Valid To (Date & Time)",
          value: dayjs(permit.validityendDate).format("DD, MMM, YYYY, HH:mm A")
        }), jsx(AccordionItem, {
          title: "Reference to Previous PTW (No.)",
          value: (_d = permit.previousPtwRef) == null ? void 0 : _d.join(", ")
        })]
      }),
      jsxs(Accordion, {
        title: jsxs(Fragment$1, {
          children: [jsx("span", {
            children: "Section B - "
          }), "Job & Work Hazards"]
        }),
        children: [jsx(AccordionItem, {
          title: "Work Area (Installation / Unit)",
          value: permit.workArea
        }), jsx(AccordionItem, {
          title: "Zone",
          value: permit.zone
        }), jsx(AccordionItem, {
          title: "Equipment Tag",
          value: permit.equipmentTag
        }), permit.type === "HOT_WORK" && jsxs(Fragment$1, {
          children: [jsx(AccordionItemTitle, {
            children: "Documents Required For This Activity"
          }), jsx(AccordionItem, {
            title: "Job Safety Analysis (JSA)",
            value: permit.jobSafetyAnalysisDocNo
          }), jsx(AccordionItem, {
            title: "Work Procedure",
            value: permit.workProcedureDocNo
          }), jsx(AccordionItem, {
            title: "P&IDs / Sketch",
            value: permit.sketchDocNo
          }), jsx(AccordionItem, {
            title: "Lifting Plan",
            value: permit.liftingPlanDocNo
          }), jsx(AccordionItem, {
            title: "Isolation Plan",
            value: permit.isolationPlanDocNo
          }), jsx(AccordionItem, {
            title: "Others",
            value: permit.otherDocNo
          }), jsx(AccordionItemTitle, {
            children: "Identification Of Hazards"
          }), HAZARDS$2.map((hazard) => jsx(AccordionItem, {
            title: hazard.text,
            value: permit[hazard.value] ? "YES" : "NO"
          }))]
        })]
      }),
      jsxs(Accordion, {
        title: jsxs(Fragment$1, {
          children: [jsx("span", {
            children: "Section C - "
          }), "Document Uploads"]
        }),
        children: [jsx(AccordionItem, {
          title: "Document Name",
          value: jsx("a", {
            href: "/",
            className: "app-link",
            children: "document.pdf"
          })
        }), jsx(AccordionItem, {
          title: "Document Name",
          value: jsx("a", {
            href: "/",
            className: "app-link",
            children: "document.pdf"
          })
        }), jsx(AccordionItem, {
          title: "Document Name",
          value: jsx("a", {
            href: "/",
            className: "app-link",
            children: "document.pdf"
          })
        })]
      }),
      jsx(Accordion, {
        title: jsxs(Fragment$1, {
          children: [jsx("span", {
            children: "Section D - "
          }), "Additional Notes"]
        }),
        children: jsx(AccordionItem, {
          title: permit.additionalNotes ?? "---",
          value: ""
        })
      }),
      jsxs(Accordion, {
        children: [jsx(AccordionItem, {
          title: "Date Created",
          value: dayjs(permit.createdAt).format("MMM DD, YYYY  HH:mm A")
        }), jsx(AccordionItem, {
          title: "Created by:",
          value: permit.createdBy ? `${(_e = permit.createdBy) == null ? void 0 : _e.firstname} ${(_f = permit.createdBy) == null ? void 0 : _f.lastname}` : "--"
        })]
      }),
      // isInProgress &&
      (permit == null ? void 0 : permit.status) === "APPROVED" ? jsxs("div", {
        children: [jsxs("div", {
          className: "app-ptw__completion-cta",
          children: [jsx("h1", {
            children: "Work Completion"
          }), jsx("p", {
            children: "The work is completed, all tools an equipment are reinstated in their initial position, and worksite is left clean and safe."
          }), jsx(Button, {
            variant: "success",
            dimension: "md",
            onClick: () => toggle("completion"),
            children: "Work Completed"
          })]
        }), jsxs("div", {
          className: "app-ptw__completion-cta suspension",
          children: [jsx("h1", {
            children: "Work Suspension"
          }), jsx("p", {
            children: "The work is completed, all tools an equipment are reinstated in their initial position, and worksite is left clean and safe."
          }), jsx(Button, {
            variant: "danger",
            dimension: "md",
            onClick: () => toggle("suspension"),
            children: "Suspend Work"
          })]
        })]
      }) : null,
      jsxs(Modal, {
        show: modals.completion,
        toggle: () => toggle("completion"),
        align: "center",
        children: [jsx(ModalHeader, {
          children: "Work Completion"
        }), jsxs(ModalBody, {
          children: [jsxs("svg", {
            width: "100",
            height: "100",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [jsx("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
              fill: "#008171"
            }), jsx("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
              fill: "#008171",
              "fill-opacity": "0.1"
            })]
          }), jsx("h4", {
            className: "app-modal__content__title",
            children: "Work Completion"
          }), jsx("p", {
            className: "app-modal__content__desc",
            children: "By proceeding, you can confirm the work is completed, all tools an equipment are reinstated in their initial position, and worksite is left clean and safe."
          }), jsxs("div", {
            className: "app-modal__content__footer",
            children: [jsx(Button, {
              variant: "secondary",
              onClick: () => toggle("completion"),
              children: "Cancel"
            }), jsx(Button, {
              variant: "success",
              onClick: completePermitToWork,
              isLoading: completionApi.isLoading,
              children: "Complete"
            })]
          })]
        })]
      }),
      jsxs(Modal, {
        show: modals.suspension,
        toggle: () => toggle("suspension"),
        align: "center",
        children: [jsxs(ModalHeader, {
          children: [jsx("img", {
            src: "/svgs/danger.svg",
            alt: "danger"
          }), "Reject permit"]
        }), jsx(ModalBody, {
          children: jsxs("form", {
            onSubmit: handleSubmit,
            children: [jsxs("div", {
              className: "app-ptw-reject-modal",
              children: [jsxs("p", {
                className: "app-modal__content__desc",
                children: ["By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards.", jsx("br", {}), jsx("br", {}), "Kindly state the reason for rejecting this permit below;"]
              }), jsx(Textarea, {
                label: "Additional Note",
                placeholder: "Write here...",
                ...getFieldProps("notes")
              })]
            }), jsxs("div", {
              className: "app-modal__content__footer",
              children: [jsx(Button, {
                variant: "secondary",
                onClick: () => toggle("suspension"),
                type: "button",
                children: "Cancel"
              }), jsx(Button, {
                type: "submit",
                variant: "danger",
                isLoading: suspensionApi.isLoading,
                children: "Suspend"
              })]
            })]
          })
        })]
      })
    ]
  });
}
function AuthorizingAuth({
  permit
}) {
  const approveApi = useRequest(approveAuthorizingAuth);
  const rejectApi = useRequest(rejectAuthorizingAuth);
  const isApproved = permit.authorizingAuthorityStatus === "APPROVED";
  const {
    values: {
      notes
    },
    getFieldProps,
    values
  } = useForm({
    initialValues: {
      notes: "",
      permitId: +permit.id
    },
    validationSchema: Yup.object({}),
    onSubmit: () => null
  });
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.authorizingAuthorityStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve or reject this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details (Additional notes must be filled if you are rejecting this permit, to state the reason for rejection)."
      }), jsx(Textarea, {
        label: "Additional Note",
        placeholder: "Write here...",
        ...getFieldProps("notes")
      }), jsxs("div", {
        className: "app-ptw__details__module__btn-footer",
        children: [jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        }), jsx(Button, {
          variant: "secondary",
          onClick: () => toggle("confirmRejection"),
          disabled: !notes,
          children: "Reject Permit"
        })]
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.authorizingAuthorityStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "ROBERT FOX"
      }), jsx(AccordionItem, {
        title: "Additional Notes",
        value: permit.hseAuthorityNotes || "--"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Authorizing Authority"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Authorizing Authority"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function OnsiteComments({
  permit
}) {
  var _a;
  if (!((_a = permit.comments) == null ? void 0 : _a.length)) {
    return jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/comments.svg"
      }), jsxs("p", {
        children: ["No notes or comments yet.", jsx("br", {}), "Click the button below to add a note"]
      }), jsxs(Button, {
        variant: "primary",
        dimension: "md",
        href: `/permit-management/ptw/add-comment/${permit == null ? void 0 : permit.id}`,
        children: [jsx(Icon, {
          name: "plus"
        }), "Add Onsite Note"]
      })]
    });
  }
  return jsxs("div", {
    className: "app-section",
    children: [jsxs(Button, {
      variant: "primary",
      dimension: "md",
      href: `/permit-management/ptw/add-comment/${permit == null ? void 0 : permit.id}`,
      children: [jsx(Icon, {
        name: "plus"
      }), "Add Onsite Note"]
    }), jsx("br", {}), jsx("br", {}), jsxs(Accordion, {
      show: true,
      title: "All Notes",
      children: [jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      }), jsx(AccordionGap, {}), jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      }), jsx(AccordionGap, {}), jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      })]
    })]
  });
}
function WorkContinuation({
  permit
}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(initiateContinuation);
  const {
    toggle,
    modals
  } = useModal({
    confirmContinuation: false
  });
  async function handleContinue() {
    toggle("confirmContinuation");
    const [res, err] = await makeRequest({
      id: +(permit == null ? void 0 : permit.id)
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to continue permit, please try again"
      });
    }
    toast({
      variant: "success",
      message: res.message
    });
  }
  if ((permit == null ? void 0 : permit.status) !== "SUSPENDED")
    return null;
  return jsxs(Fragment$1, {
    children: [jsxs("div", {
      className: "app-ptw__continue",
      children: [jsxs("div", {
        children: [jsx("h3", {
          children: "Work Continuation"
        }), jsx("p", {
          children: "Click the button for to begin work continuation process"
        })]
      }), jsx(Button, {
        variant: "primary",
        dimension: "md",
        isLoading,
        onClick: () => toggle("confirmContinuation"),
        children: "Continue Work"
      })]
    }), jsxs(Modal, {
      show: modals.confirmContinuation,
      toggle: () => toggle("confirmContinuation"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Continuation of Work"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Continuation of Work"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By proceeding, you can confirm the work site has been inspected after the suspension and all controls and precautions are reinstated and in place."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmContinuation"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: handleContinue,
            isLoading,
            children: "Confirm"
          })]
        })]
      })]
    })]
  });
}
function PermitToWorkDetails({}) {
  const router = useRouter();
  const ptwId = router[0].matches.id;
  const {
    response,
    isLoading
  } = useRequest(getPermit, {
    id: ptwId
  }, true);
  const permit = response == null ? void 0 : response.data;
  const rawTabs = ["PTW Details", "Issuing Auth", "HSE Auth", "Authorizing Auth"];
  if ((permit == null ? void 0 : permit.status) === "APPROVED")
    rawTabs.push("Onsite Notes & Comments");
  const isInProgress = dayjs().isBefore(dayjs(permit == null ? void 0 : permit.validityendDate));
  const {
    activeTab,
    tabs
  } = useTabs(rawTabs);
  return jsxs("div", {
    className: "app-ptw__details",
    children: [jsx(Header, {
      title: "Permit Details"
    }), (permit == null ? void 0 : permit.status) === "APPROVED" && jsxs("div", {
      className: "app-ptw__print",
      children: [jsxs("div", {
        children: [jsx("h3", {
          children: "Print Permit"
        }), jsx("p", {
          children: "Click the button to get a hardcopy version of this permit"
        })]
      }), jsxs(Button, {
        variant: "primary",
        dimension: "md",
        children: [jsx(Icon, {
          name: "print"
        }), "Print Permit"]
      })]
    }), jsx("div", {
      className: "app-section",
      children: jsxs("div", {
        className: "app-ptw__header-status",
        children: [jsxs("div", {
          children: [jsx("h4", {
            children: "Issuing Authority"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.issuringAuthorityStatus
          })]
        }), jsxs("div", {
          children: [jsx("h4", {
            children: "HSE Authority"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.hseAuthorityStatus
          })]
        }), jsxs("div", {
          children: [jsx("h4", {
            children: "Authorizing Authority"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.authorizingAuthorityStatus
          })]
        })]
      })
    }), jsx(Tabs, {
      tabs
    }), jsx(WorkContinuation, {
      permit
    }), (permit == null ? void 0 : permit.status) === "COMPLETED" ? (
      //  && !isInProgress?
      jsxs("div", {
        className: "app-ptw__renew",
        children: [jsxs("div", {
          children: [jsx("h3", {
            children: "Renew This Permit"
          }), jsx("p", {
            children: "Click the button for permit renewal"
          })]
        }), jsxs(Button, {
          variant: "primary",
          dimension: "md",
          onClick: () => route(`/permit-management/ptw/renew/${permit == null ? void 0 : permit.id}`),
          children: [jsx(Icon, {
            name: "renew"
          }), "Renew Permit"]
        })]
      })
    ) : null, permit ? jsxs(Fragment$1, {
      children: [activeTab === "PTW Details" && jsx(PtwDetails, {
        permit,
        isInProgress
      }), activeTab === "Issuing Auth" && jsx(IssuingAuth$3, {
        permit
      }), activeTab === "HSE Auth" && jsx(HseAuth, {
        permit
      }), activeTab === "Authorizing Auth" && jsx(AuthorizingAuth, {
        permit
      }), activeTab === "Onsite Notes & Comments" && jsx(OnsiteComments, {
        permit
      })]
    }) : jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permit details, please wait..." : "Failed to fetch, please try again"
      })]
    })]
  });
}
function PermitLevelStatus({
  variant
}) {
  if ((variant == null ? void 0 : variant.toLowerCase()) === "approved") {
    return jsxs("span", {
      "data-variant": variant.toLowerCase(),
      children: [jsx(Icon, {
        name: "approved"
      }), "Approved"]
    });
  }
  if ((variant == null ? void 0 : variant.toLowerCase()) === "rejected") {
    return jsxs("span", {
      "data-variant": variant.toLowerCase(),
      children: [jsx(Icon, {
        name: "rejected"
      }), "Rejected"]
    });
  }
  if ((variant == null ? void 0 : variant.toLowerCase()) === "in_progress") {
    return jsxs("span", {
      "data-variant": variant.toLowerCase(),
      children: [jsx(Icon, {
        name: "clock"
      }), "In Progress"]
    });
  }
  return jsxs("span", {
    "data-variant": (variant == null ? void 0 : variant.toLowerCase()) || "awaiting",
    children: [jsx(Icon, {
      name: "pending"
    }), "Awaiting"]
  });
}
const ApprovePermitMachine = createMachine({
  context: {
    measuresOnEquipments: {},
    precautions: {},
    fireFighting: {},
    personalEquipments: {},
    permitCerts: {},
    uploadPermitDocs: {},
    consent: {
      isReviewed: false,
      consentGiven: false
    }
  },
  initial: "measuresOnEquipments",
  states: {
    measuresOnEquipments: {
      on: {
        submit: {
          target: "precautions",
          actions: ["updateContext"]
        }
      }
    },
    precautions: {
      on: {
        submit: {
          target: "fireFighting",
          actions: ["updateContext"]
        },
        goBack: "measuresOnEquipments"
      }
    },
    fireFighting: {
      on: {
        submit: {
          target: "personalEquipments",
          actions: ["updateContext"]
        },
        goBack: "precautions"
      }
    },
    personalEquipments: {
      on: {
        submit: {
          target: "permitCerts",
          actions: ["updateContext"]
        },
        goBack: "fireFighting"
      }
    },
    permitCerts: {
      on: {
        submit: {
          target: "uploadPermitDocs",
          actions: ["updateContext"]
        },
        goBack: "personalEquipments"
      }
    },
    uploadPermitDocs: {
      on: {
        submit: {
          target: "consent",
          actions: ["updateContext"]
        },
        goBack: "permitCerts"
      }
    },
    consent: {
      on: {
        goBack: "uploadPermitDocs",
        submit: "success"
      }
    },
    success: {}
  }
}, {
  actions: {
    updateContext(ctx, event) {
      return Object.assign(ctx, event.data);
    }
  }
});
const Context$4 = createContext({});
function ApprovePermitProvider({
  children
}) {
  const [state, send, service] = useMachine(ApprovePermitMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$4.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function usePermitApprovalContext() {
  return useContext(Context$4);
}
function MeasuresOnEquipment() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const [{
    matches: {
      id
    }
  }] = useRouter();
  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue
  } = useForm({
    initialValues: state.context.measuresOnEquipments,
    onSubmit,
    validationSchema: validationSchema$L
  });
  function onSubmit(measuresOnEquipments) {
    send("submit", {
      data: {
        measuresOnEquipments
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "MEASURES ON EQUIPMENT / LINES"
    }), OPTIONS$2.map((opt, i2) => jsxs("label", {
      children: [jsx(Checkbox, {
        checked: values[opt.label],
        onChange: (v2) => setFieldValue(opt.label, v2)
      }), jsx("p", {
        children: opt.label
      })]
    }, i2)), jsx("div", {
      className: "app-register__form-grid",
      children: jsx(Input, {
        label: "OTHERS",
        placeholder: "Write here...",
        ...getFieldProps("others")
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        href: `/permit-management/ptw/${id}`,
        variant: "secondary",
        type: "button",
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const OPTIONS$2 = [{
  label: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)"
}, {
  label: "FLANGES (Ref. to P&IDs and/or other schematic drawings)"
}, {
  label: "INSTALLATION"
}, {
  label: "REMOVAL"
}, {
  label: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)"
}, {
  label: "DRAINAGE"
}, {
  label: "DEPRESSURIZATION"
}, {
  label: "INERTING (inert gas / water / steam)"
}, {
  label: "VENTILATION (natural / mechanical means)"
}];
const validationSchema$L = Yup.object({});
function Precautions() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue
  } = useForm({
    initialValues: state.context.precautions,
    onSubmit,
    validationSchema: validationSchema$K
  });
  function onSubmit(precautions) {
    send("submit", {
      data: {
        precautions
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "PRECAUTION"
    }), jsx("div", {
      className: "app-register__form-grid",
      children: OPTIONS$1.map((opt, i2) => jsxs("label", {
        className: "base-checkbox-label",
        children: [jsx(Checkbox, {
          checked: values[opt.label],
          onChange: (v2) => setFieldValue(opt.label, v2)
        }), jsx("p", {
          children: opt.label
        })]
      }, i2))
    }), jsx("div", {
      className: "app-register__form-grid",
      children: jsx(Input, {
        label: "OTHERS",
        placeholder: "Write here...",
        ...getFieldProps("others")
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const OPTIONS$1 = [{
  label: "SHIELD ADJACENT WORK / EQUIPMENT"
}, {
  label: "AREA TO BE CORDONED / WARNING SIGNS / NOTICES"
}, {
  label: "WIND DIRECTION"
}, {
  label: "SEWERS / DRAIN TO BE CLOSED"
}, {
  label: "REMOTE CONTROLLED EQUIPMENT AFFECTED"
}, {
  label: "SCAFFOLDING / WORK PLATFORM / RESCUE PLAN IN PLACE"
}, {
  label: "EARTHING / BONDING CORRECTLY APPLIED"
}, {
  label: "WORK TO STOP DURING ADVERSE WEATHER"
}, {
  label: "NON-CONDUCTIVE LADDER"
}, {
  label: "USE OF NON-SPARK TOOL"
}, {
  label: "ELECTRICAL ISOLATED TOOLS"
}, {
  label: "FOAM MAKING EQUIPMENT / FIRE TRUCK"
}, {
  label: "VOLTAGE IS BELOW 6KV IF NOT SEE BELOW"
}, {
  label: "TBT SIGNED BY WORK FORCE"
}, {
  label: "ABOVE 6KV PERSONNEL MUST BE TRAINED TO WORK ON THE SYSTEM"
}, {
  label: "GAS TESTING"
}, {
  label: "PORTABLE GROUNDING KIT"
}, {
  label: "CONTAINMENT OF ANY LIQUID"
}];
const validationSchema$K = Yup.object({});
function FireFighting() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue
  } = useForm({
    initialValues: state.context.fireFighting,
    onSubmit,
    validationSchema: validationSchema$J
  });
  function onSubmit(fireFighting) {
    send("submit", {
      data: {
        fireFighting
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "FIREFIGHTING PRECAUTION"
    }), OPTIONS.map((opt, i2) => jsxs("label", {
      children: [jsx(Checkbox, {
        checked: values[opt.label],
        onChange: (v2) => setFieldValue(opt.label, v2)
      }), jsx("p", {
        children: opt.label
      })]
    }, i2)), jsx("div", {
      className: "app-register__form-grid",
      children: jsx(Input, {
        label: "OTHERS",
        placeholder: "Write here...",
        ...getFieldProps("others")
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const OPTIONS = [{
  label: "FIRE EXTINGUISHER (CO2)"
}, {
  label: "FIRE EXTINGUISHER (DCP)"
}, {
  label: "REMOVAL OF FLAMMABLE SUBSTANCES"
}, {
  label: "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)"
}, {
  label: "FLAME PROOF BLANKET"
}, {
  label: "GROUNDING OF EQUIPMENT"
}, {
  label: "CONTINOUS GAS MONITORING"
}, {
  label: "FIREWATCHER / STANDBY MAN"
}];
const validationSchema$J = Yup.object({});
function PersonalEquipments() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue
  } = useForm({
    initialValues: state.context.personalEquipments,
    onSubmit,
    validationSchema: validationSchema$I
  });
  function onSubmit(personalEquipments) {
    send("submit", {
      data: {
        personalEquipments
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "PERSONAL PROTECTIVE EQUIPMENT"
    }), jsx("div", {
      className: "app-register__form-grid",
      children: PERSONAL_EQUIPMENT.map((opt, i2) => jsxs("label", {
        className: "base-checkbox-label",
        children: [jsx(Checkbox, {
          checked: values[opt.label],
          onChange: (v2) => setFieldValue(opt.label, v2)
        }), jsx("p", {
          children: opt.label
        })]
      }, i2))
    }), jsx("div", {
      className: "app-register__form-grid",
      children: jsx(Input, {
        label: "OTHERS",
        placeholder: "Write here...",
        ...getFieldProps("others")
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const PERSONAL_EQUIPMENT = [{
  label: "SAFETY HELMET"
}, {
  label: "BEATING APPARATUS"
}, {
  label: "SAFETY BOOTS (boots / rubber boots)"
}, {
  label: "DUST / FUMES / SPECIAL GAS FILTER MASKS"
}, {
  label: "BODY CLOTHING (coverall / full chem / APRON)"
}, {
  label: "LIFE JACKET / WORK VESTS"
}, {
  label: "GLOVES (chemical / work / weld)"
}, {
  label: "ELECTRICAL RESCUE (Shepherds) HOOK"
}, {
  label: "SAFETY GLASSES / FACE SHIELD"
}, {
  label: "ELECTRICAL STATIC DISCHARGE STICK"
}, {
  label: "HEARING PROTECTION (ear muff / ear plugs)"
}, {
  label: "FOAM MAKING EQUIPMENT / FIRE TRUCK"
}, {
  label: "SAFETY HARNESS (full body type only) / LIFELINE"
}, {
  label: "ABOVE 6KV PERSONNEL MUST BE TRAINED TO WORK ON THE SYSTEM"
}, {
  label: "PORTABLE GROUNDING KIT"
}];
const validationSchema$I = Yup.object({});
function PersonalCerts() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit,
    getFieldProps
  } = useForm({
    initialValues: state.context.permitCerts,
    onSubmit,
    validationSchema: validationSchema$H
  });
  function onSubmit(permitCerts) {
    send("submit", {
      data: {
        permitCerts
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "Complementary Permits, Certificates / Documents"
    }), jsxs("div", {
      className: "app-register__form-grid",
      children: [jsx(Input, {
        label: "Entry Certificate",
        ...getFieldProps("certificateNo")
      }), jsx(Input, {
        label: "Electronic Isolation Cert.",
        ...getFieldProps("electronicIsolationCert")
      }), jsx(Input, {
        label: "Explosives Cert.",
        ...getFieldProps("explosivesCert")
      }), jsx(Input, {
        label: "Mechanical isolation Cert.",
        ...getFieldProps("mechanicalIsolationCert")
      }), jsx(Input, {
        label: "Gas Clearance",
        ...getFieldProps("gasClearance")
      }), jsx(Input, {
        label: "Scaffolding Cert.",
        ...getFieldProps("scaffoldingCert")
      }), jsx(Input, {
        label: "MEWP Cert.",
        ...getFieldProps("mewpCert")
      }), jsx(Input, {
        label: "Man Basket Cert.",
        ...getFieldProps("manBasketCert")
      }), jsx(Input, {
        label: "Work Near Powerlines Cert.",
        ...getFieldProps("workNearPowerlineCert")
      }), jsx(Input, {
        label: "Radiography cert.",
        ...getFieldProps("radiographyCert")
      }), jsx(Input, {
        label: "Excavation Cert.",
        ...getFieldProps("excavationCert")
      }), jsx(Input, {
        label: "Lift Cert.",
        ...getFieldProps("liftCert")
      }), jsx(Input, {
        label: "Hot Tapping Cert.",
        ...getFieldProps("hotTappingCert")
      }), jsx(Input, {
        label: "Diving / ROV Cert.",
        ...getFieldProps("divingCert")
      }), jsx(Input, {
        label: "Man Riding Cert.",
        ...getFieldProps("manRidingCert")
      }), jsx(Input, {
        label: "Others",
        ...getFieldProps("others")
      })]
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const validationSchema$H = Yup.object({
  certificateNo: Yup.string().required("This field is required"),
  electronicIsolationCert: Yup.string().required("This field is required"),
  explosivesCert: Yup.string().required("This field is required"),
  mechanicalIsolationCert: Yup.string().required("This field is required"),
  gasClearance: Yup.string().required("This field is required"),
  scaffoldingCert: Yup.string().required("This field is required"),
  mewpCert: Yup.string().required("This field is required"),
  manBasketCert: Yup.string().required("This field is required"),
  workNearPowerlineCert: Yup.string().required("This field is required"),
  radiographyCert: Yup.string().required("This field is required"),
  excavationCert: Yup.string().required("This field is required"),
  liftCert: Yup.string().required("This field is required"),
  hotTappingCert: Yup.string().required("This field is required"),
  divingCert: Yup.string().required("This field is required"),
  manRidingCert: Yup.string().required("This field is required")
});
function UploadPermitDocs() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit
  } = useForm({
    initialValues: state.context.uploadPermitDocs,
    onSubmit,
    validationSchema: validationSchema$G
  });
  function onSubmit(uploadPermitDocs) {
    send("submit", {
      data: {
        uploadPermitDocs
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsx("h3", {
      className: "app-register__form__title",
      children: "Complementary Permits, Certificates / Documents"
    }), jsx("p", {
      className: "app-create-permit__description",
      children: "Ensure you upload authentic documents that are clear and visible."
    }), jsx("br", {}), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        children: "Next"
      })]
    })]
  });
}
const validationSchema$G = Yup.object({});
function Consent() {
  const {
    state,
    send
  } = usePermitApprovalContext();
  const {
    handleSubmit,
    values,
    setFieldValue
  } = useForm({
    initialValues: state.context.consent,
    onSubmit,
    validationSchema: validationSchema$F
  });
  async function onSubmit() {
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__attachment-form",
    children: [jsxs("label", {
      children: [jsx(Checkbox, {
        checked: values.consentGiven,
        onChange: (v2) => setFieldValue("consentGiven", v2)
      }), jsx("p", {
        children: "I hereby certify that the listed unit / facility on this permit should be released for work commence, after I have reviewed the worksite with the PA."
      })]
    }), jsxs("label", {
      children: [jsx(Checkbox, {
        checked: values.isReviewed,
        onChange: (v2) => setFieldValue("isReviewed", v2)
      }), jsx("p", {
        children: "I hereby confirm that i have properly reviewed all the details and documents provided for this permit"
      })]
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("goBack"),
        children: "Previous"
      }), jsx(Button, {
        variant: "primary",
        disabled: !values.consentGiven || !values.isReviewed,
        children: "Next"
      })]
    })]
  });
}
const validationSchema$F = Yup.object({});
function Module$e() {
  const [{
    matches: {
      id
    }
  }] = useRouter();
  const {
    state
  } = usePermitApprovalContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$c.indexOf(stateAsString) + 1;
  return jsxs("div", {
    className: "app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "eptw_logo"
        }), jsx("h5", {
          children: "Permit To Work Form / Hot Work"
        }), jsx("a", {
          href: "mailto:helpdesk@oandoplc.com",
          className: "app-link",
          children: "Need help?"
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("success") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsxs("h3", {
              children: [jsx("span", {
                children: "Section C -"
              }), " Precautions to be Taken"]
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$c.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$c.length * 100}%`
              }
            })
          })]
        }), state.matches("measuresOnEquipments") && jsx(MeasuresOnEquipment, {}), state.matches("precautions") && jsx(Precautions, {}), state.matches("fireFighting") && jsx(FireFighting, {}), state.matches("personalEquipments") && jsx(PersonalEquipments, {}), state.matches("permitCerts") && jsx(PersonalCerts, {}), state.matches("uploadPermitDocs") && jsx(UploadPermitDocs, {}), state.matches("consent") && jsx(Consent, {}), state.matches("success") && jsxs("div", {
          className: "app-approve-permit__success",
          children: [jsxs("svg", {
            width: "180",
            height: "180",
            viewBox: "0 0 180 180",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [jsx("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M64.5225 28.4925C67.6872 24.8417 71.6004 21.9147 75.9965 19.9101C80.3926 17.9056 85.1685 16.8704 90 16.875C100.178 16.875 109.298 21.375 115.478 28.4925C120.298 28.1483 125.136 28.8456 129.662 30.5371C134.189 32.2285 138.299 34.8744 141.713 38.295C145.132 41.708 147.777 45.8166 149.468 50.3419C151.16 54.8673 151.858 59.7036 151.515 64.5225C155.164 67.6879 158.09 71.6015 160.093 75.9975C162.097 80.3935 163.131 85.1691 163.125 90C163.13 94.8315 162.094 99.6075 160.09 104.004C158.085 108.4 155.158 112.313 151.508 115.478C151.85 120.296 151.152 125.133 149.461 129.658C147.769 134.183 145.124 138.292 141.705 141.705C138.292 145.124 134.183 147.769 129.658 149.461C125.133 151.152 120.296 151.85 115.478 151.508C112.313 155.158 108.4 158.085 104.004 160.09C99.6075 162.094 94.8315 163.13 90 163.125C85.1685 163.13 80.3926 162.094 75.9965 160.09C71.6004 158.085 67.6872 155.158 64.5225 151.508C59.7029 151.853 54.8654 151.157 50.3386 149.466C45.8118 147.776 41.7017 145.132 38.2875 141.713C34.8673 138.299 32.2216 134.189 30.5303 129.662C28.8389 125.135 28.1413 120.298 28.485 115.478C24.8356 112.312 21.91 108.399 19.9067 104.003C17.9035 99.6065 16.8695 94.831 16.875 90C16.875 79.8225 21.375 70.7025 28.4925 64.5225C28.1494 59.7035 28.8473 54.8671 30.5387 50.3417C32.23 45.8162 34.8754 41.7077 38.295 38.295C41.7077 34.8754 45.8162 32.23 50.3417 30.5387C54.8671 28.8473 59.7035 28.1494 64.5225 28.4925ZM117.075 76.395C117.525 75.7954 117.851 75.1119 118.033 74.3846C118.215 73.6574 118.25 72.9011 118.135 72.1602C118.021 71.4193 117.759 70.7087 117.366 70.0702C116.973 69.4318 116.457 68.8783 115.847 68.4424C115.237 68.0065 114.546 67.6968 113.815 67.5317C113.084 67.3666 112.327 67.3494 111.589 67.481C110.851 67.6126 110.146 67.8904 109.517 68.2981C108.888 68.7058 108.347 69.2351 107.925 69.855L83.655 103.83L71.475 91.65C70.4087 90.6564 68.9984 90.1155 67.5411 90.1412C66.0838 90.1669 64.6935 90.7573 63.6629 91.7879C62.6323 92.8185 62.0419 94.2088 62.0162 95.6661C61.9905 97.1234 62.5314 98.5337 63.525 99.6L80.4 116.475C80.9774 117.052 81.6735 117.496 82.4399 117.777C83.2063 118.058 84.0247 118.169 84.8382 118.102C85.6518 118.035 86.4409 117.792 87.151 117.389C87.861 116.986 88.4749 116.434 88.95 115.77L117.075 76.395Z",
              fill: "#008171"
            }), jsx("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M62.1272 22.7098C65.5894 18.7157 69.8706 15.5135 74.6799 13.3205C79.4893 11.1274 84.7142 9.99499 90 10C101.134 10 111.112 14.9231 117.873 22.7098C123.146 22.3332 128.439 23.0961 133.391 24.9465C138.344 26.797 142.84 29.6916 146.574 33.4339C150.315 37.1677 153.209 41.6626 155.059 46.6134C156.91 51.5642 157.673 56.8552 157.298 62.1272C161.291 65.5902 164.492 69.8717 166.683 74.681C168.875 79.4903 170.006 84.7149 170 90C170.005 95.2858 168.873 100.511 166.68 105.32C164.487 110.129 161.284 114.411 157.29 117.873C157.665 123.145 156.901 128.436 155.051 133.387C153.201 138.337 150.307 142.832 146.566 146.566C142.832 150.307 138.337 153.201 133.387 155.051C128.436 156.901 123.145 157.665 117.873 157.29C114.411 161.284 110.129 164.487 105.32 166.68C100.511 168.873 95.2858 170.005 90 170C84.7142 170.005 79.4893 168.873 74.6799 166.68C69.8706 164.487 65.5894 161.284 62.1272 157.29C56.8544 157.668 51.5621 156.906 46.6097 155.057C41.6573 153.208 37.1608 150.315 33.4257 146.574C29.6839 142.84 26.7895 138.343 24.9391 133.391C23.0887 128.439 22.3256 123.146 22.7016 117.873C18.709 114.41 15.5083 110.128 13.3167 105.319C11.1251 100.51 9.99398 95.2851 10 90C10 78.8656 14.9231 68.8882 22.7098 62.1272C22.3344 56.8551 23.0979 51.564 24.9483 46.6131C26.7987 41.6622 29.6927 37.1674 33.4339 33.4339C37.1674 29.6927 41.6622 26.7987 46.6131 24.9483C51.564 23.0979 56.8551 22.3344 62.1272 22.7098ZM119.62 75.1159C120.113 74.4599 120.469 73.7121 120.668 72.9165C120.867 72.1209 120.905 71.2935 120.78 70.4829C120.655 69.6723 120.369 68.895 119.939 68.1965C119.509 67.498 118.944 66.8925 118.277 66.4156C117.61 65.9387 116.854 65.5999 116.054 65.4193C115.254 65.2387 114.426 65.2198 113.618 65.3638C112.811 65.5078 112.04 65.8117 111.352 66.2577C110.664 66.7038 110.072 67.2829 109.61 67.961L83.0585 105.13L69.7333 91.8051C68.5668 90.7181 67.0238 90.1263 65.4296 90.1545C63.8353 90.1826 62.3142 90.8284 61.1867 91.9559C60.0592 93.0834 59.4134 94.6045 59.3852 96.1988C59.3571 97.7931 59.9489 99.336 61.0359 100.503L79.4974 118.964C80.1292 119.595 80.8907 120.082 81.7291 120.389C82.5676 120.696 83.4629 120.817 84.3529 120.744C85.2429 120.671 86.1063 120.404 86.8831 119.964C87.6599 119.523 88.3315 118.919 88.8513 118.193L119.62 75.1159Z",
              fill: "#008171",
              "fill-opacity": "0.1"
            })]
          }), jsx("h3", {
            children: "Permits Success fully Approved"
          }), jsx("p", {
            children: "You have successfully approved this permit. And it has been moved ahead to other authorities."
          }), jsx(Button, {
            href: `/permit-management/ptw/${id}`,
            variant: "primary",
            children: "View Permit Details"
          }), jsx(Button, {
            href: "/permit-management/",
            variant: "secondary",
            children: "Back To All Permits"
          })]
        })]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    })]
  });
}
function ApprovePermit({}) {
  return jsx(ApprovePermitProvider, {
    children: jsx(Module$e, {})
  });
}
const STEPS$c = ["measuresOnEquipments", "precautions", "fireFighting", "personalEquipments", "permitCerts", "uploadPermitDocs", "consent", "success"];
function PermitRenewal({}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(renewPermit);
  const [{
    matches: {
      id: permitId
    }
  }] = useRouter();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      permitId: +permitId,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      gasTesterName: "",
      gasTestDate: "",
      o2Percentage: "",
      co: "",
      h2s: "",
      lel: ""
    },
    validationSchema: validationSchema$E,
    onSubmit
  });
  async function onSubmit(data) {
    const [_, err] = await makeRequest(data);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to renew permit. Please try again"
      });
    }
    toast({
      variant: "success",
      message: "Permit renewed successfully"
    });
    route(`/permit-management/ptw/${permitId}`);
  }
  return jsxs("div", {
    className: "app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "eptw_logo"
        }), jsx("h5", {
          children: "Permit To Work Form / Hot Work"
        }), jsx("a", {
          href: "mailto:helpdesk@oandoplc.com",
          className: "app-link",
          children: "Need help?"
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [jsx("div", {
          className: "app-register__content__header app-create-permit__header",
          children: jsx("h3", {
            children: "PERMIT RENEWAL"
          })
        }), jsx("br", {}), jsx("br", {}), jsxs("form", {
          className: "app-register__form",
          onSubmit: handleSubmit,
          children: [jsxs("div", {
            className: "app-register__form-grid",
            children: [jsx("h3", {
              style: {
                marginBottom: "20px"
              },
              children: "Start Date"
            }), jsx("h3", {
              style: {
                marginBottom: "20px"
              },
              children: "End Date"
            }), jsxs("div", {
              className: "app-register__form-grid",
              children: [jsx(Input, {
                label: "Date",
                placeholder: "dd / mm / yyyy",
                type: "date",
                ...getFieldProps("startDate")
              }), jsx(Input, {
                label: "Time",
                type: "time",
                placeholder: "00:00AM",
                ...getFieldProps("startTime")
              })]
            }), jsxs("div", {
              className: "app-register__form-grid",
              children: [jsx(Input, {
                label: "Date",
                placeholder: "dd / mm / yyyy",
                type: "date",
                ...getFieldProps("endDate")
              }), jsx(Input, {
                label: "Time",
                type: "time",
                placeholder: "00:00AM",
                ...getFieldProps("endTime")
              })]
            }), jsx(Input, {
              label: "Name of Gas Tester",
              placeholder: "Enter gas tester",
              type: "text",
              ...getFieldProps("gasTesterName")
            }), jsx(Input, {
              label: "Date Gas Test",
              placeholder: "dd / mm / yyyy",
              type: "date",
              ...getFieldProps("gasTestDate")
            }), jsx(Input, {
              label: "25% > O2 < 19.5%",
              placeholder: "---",
              type: "text",
              ...getFieldProps("o2Percentage")
            }), jsx(Input, {
              label: "CO:",
              placeholder: "---",
              type: "text",
              ...getFieldProps("co")
            }), jsx(Input, {
              label: "H2S < 2PPM",
              placeholder: "---",
              type: "text",
              ...getFieldProps("h2s")
            }), jsx(Input, {
              label: "L.E.L < 10%",
              placeholder: "---",
              type: "text",
              ...getFieldProps("lel")
            })]
          }), jsxs("div", {
            className: "app-register__form-footer",
            children: [jsx(Button, {
              variant: "secondary",
              type: "button",
              href: `/permit-management/ptw/${permitId}`,
              children: "Back"
            }), jsx(Button, {
              variant: "primary",
              isLoading,
              children: "Next"
            })]
          })]
        })]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    })]
  });
}
const validationSchema$E = Yup.object({
  startDate: Yup.string().required("This field is required"),
  startTime: Yup.string().required("This field is required"),
  endDate: Yup.string().required("This field is required"),
  endTime: Yup.string().required("This field is required"),
  gasTesterName: Yup.string().required("This field is required"),
  gasTestDate: Yup.string().required("This field is required"),
  o2Percentage: Yup.string().required("This field is required"),
  co: Yup.string().required("This field is required"),
  h2s: Yup.string().required("This field is required"),
  lel: Yup.string().required("This field is required")
});
function PermitOnsiteComments({}) {
  const [{
    matches: {
      id: permitId
    }
  }] = useRouter();
  const {
    isLoading,
    makeRequest
  } = useRequest(AddOnsiteNote);
  const {
    handleSubmit,
    getFieldProps
  } = useForm({
    onSubmit,
    initialValues: {
      permitId: +permitId,
      content: ""
    },
    validationSchema: Yup.object({
      content: Yup.string().required("This field is required")
    })
  });
  async function onSubmit(data) {
    const [_, err] = await makeRequest(data);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to add comment. Please try again"
      });
    }
    toast({
      variant: "success",
      message: "Comment added successfully"
    });
    route(`/permit-management/ptw/${permitId}`);
  }
  return jsxs("div", {
    className: "app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "eptw_logo"
        }), jsx("a", {
          href: "mailto:helpdesk@oandoplc.com",
          className: "app-link",
          children: "Need help?"
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [jsx("div", {
          className: "app-register__content__header app-create-permit__header",
          children: jsx("h3", {
            children: "ONSITE NOTE / COMMENT"
          })
        }), jsx("br", {}), jsx("br", {}), jsxs("form", {
          className: "app-register__form",
          onSubmit: handleSubmit,
          children: [jsx(Textarea, {
            placeholder: "Write here...",
            ...getFieldProps("content")
          }), jsxs("div", {
            className: "app-register__form-footer",
            children: [jsx(Button, {
              variant: "secondary",
              type: "button",
              href: `/permit-management/ptw/${permitId}`,
              children: "Back"
            }), jsx(Button, {
              variant: "primary",
              isLoading,
              children: "Submit"
            })]
          })]
        })]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    })]
  });
}
function PermitRenewalsList({
  flag
}) {
  var _a, _b;
  const {
    response,
    isLoading
  } = useRequest(getPermitRenewals, {
    flag
  }, true);
  return jsxs("div", {
    className: "app-section",
    children: [jsxs(Table, {
      children: [jsx(TableHead, {
        children: jsxs(TableRow, {
          children: [jsx(TableCell, {
            children: "PTW No."
          }), jsx(TableCell, {
            children: "Start Date"
          }), jsx(TableCell, {
            children: "End Date"
          }), jsx(TableCell, {
            children: "Gas Tester"
          }), jsx(TableCell, {
            children: "Status"
          }), jsx(TableCell, {})]
        })
      }), jsx(TableBody, {
        children: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.map((data) => {
          var _a2;
          return jsxs(TableRow, {
            children: [jsx(TableCell, {
              children: data.permitId
            }), jsx(TableCell, {
              children: dayjs(data.startDate).format("MMM DD, YYYY")
            }), jsx(TableCell, {
              children: dayjs(data.endDate).format("MMM DD, YYYY")
            }), jsx(TableCell, {
              children: data.gasTesterName
            }), jsx(TableCell, {
              children: jsx("div", {
                className: `base-tag--${getStatus$2(data.status)}`,
                children: (_a2 = data.status) == null ? void 0 : _a2.replace("_", " ").toLowerCase()
              })
            }), jsx(TableCell, {
              children: jsx(Button, {
                href: `/permit-renewals/ptw/${data.id}`,
                variant: "outline",
                children: "View"
              })
            })]
          }, data.id);
        })
      })]
    }), !((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.length) && jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
      })]
    })]
  });
}
function getStatus$2(status) {
  switch (status) {
    case "IN_PROGRESS":
      return "warn";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    case "COMPLETED":
      return "success";
    case "SUSPENDED":
      return "warn";
  }
}
function PermitRenewals({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["All Permits", "Safety Officer", "Issuing Auth. Supervisor", "Approved", "Rejected"]);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Permit Renewals"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search by user name",
        onSearch: ""
      }), jsx(DateFilter, {
        variant: "secondary"
      })]
    }), jsx(Tabs, {
      tabs
    }), activeTab === "All Permits" && jsx(PermitRenewalsList, {}), activeTab === "Safety Officer" && jsx(PermitRenewalsList, {
      flag: "safety"
    }), activeTab === "Issuing Auth. Supervisor" && jsx(PermitRenewalsList, {
      flag: "issuing"
    }), activeTab === "Approved" && jsx(PermitRenewalsList, {
      flag: "approved"
    }), activeTab === "Rejected" && jsx(PermitRenewalsList, {
      flag: "rejected"
    })]
  });
}
function SafetyOfficer$1({
  permit
}) {
  const approveApi = useRequest(approveSafetyOfficerRenewal);
  const rejectApi = useRequest(rejectSafetyOfficerRenewal);
  const isApproved = permit.safetyOfficerStatus === "APPROVED";
  const {
    values: {
      notes
    },
    getFieldProps,
    values
  } = useForm({
    initialValues: {
      notes: "",
      renewalId: +permit.id
    },
    validationSchema: Yup.object({}),
    onSubmit: () => null
  });
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.safetyOfficerStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve or reject this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details (Additional notes must be filled if you are rejecting this permit, to state the reason for rejection)."
      }), jsx(Textarea, {
        label: "Additional Note",
        placeholder: "Write here...",
        ...getFieldProps("notes")
      }), jsxs("div", {
        className: "app-ptw__details__module__btn-footer",
        children: [jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        }), jsx(Button, {
          variant: "secondary",
          onClick: () => toggle("confirmRejection"),
          disabled: !notes,
          children: "Reject Permit"
        })]
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.safetyOfficerStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: `${permit.safetyOfficer.firstname} ${permit.safetyOfficer.lastname}`
      }), jsx(AccordionItem, {
        title: "Additional Notes",
        value: permit.safetyOfficerNotes || "--"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Safety Officer"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Safety Officer"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function IssuingAuth$2({
  permit
}) {
  const approveApi = useRequest(approveIssuingAuthRenewal);
  const rejectApi = useRequest(rejectIssuingAuthRenewal);
  const isApproved = permit.issuringAuthoritySupStatus === "APPROVED";
  const {
    values: {
      notes
    },
    getFieldProps,
    values
  } = useForm({
    initialValues: {
      notes: "",
      renewalId: +permit.id
    },
    validationSchema: Yup.object({}),
    onSubmit: () => null
  });
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest(values);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.issuringAuthoritySupStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve or reject this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details (Additional notes must be filled if you are rejecting this permit, to state the reason for rejection)."
      }), jsx(Textarea, {
        label: "Additional Note",
        placeholder: "Write here...",
        ...getFieldProps("notes")
      }), jsxs("div", {
        className: "app-ptw__details__module__btn-footer",
        children: [jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        }), jsx(Button, {
          variant: "secondary",
          onClick: () => toggle("confirmRejection"),
          disabled: !notes,
          children: "Reject Permit"
        })]
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.issuringAuthoritySupStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: `${permit.issuringAuthoritySup.firstname} ${permit.issuringAuthoritySup.lastname}`
      }), jsx(AccordionItem, {
        title: "Additional Notes",
        value: permit.issuringAuthoritySupNotes || "--"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function PermitRenewalsDetails({}) {
  const [{
    matches: {
      id
    }
  }] = useRouter();
  const {
    isLoading,
    response
  } = useRequest(getPermitRenewal, {
    id
  }, true);
  const permit = response == null ? void 0 : response.data;
  const {
    activeTab,
    tabs
  } = useTabs(["Renewal Details", "Safety Officer", "Issuing Auth."]);
  return jsxs("div", {
    className: "app-ptw__details",
    children: [jsx(Header, {
      title: "Permit Renewal Details"
    }), jsx("div", {
      className: "app-section",
      children: jsxs("div", {
        className: "app-ptw__header-status",
        style: {
          gridTemplateColumns: "1fr 1fr"
        },
        children: [jsxs("div", {
          children: [jsx("h4", {
            children: "Safety Officer"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.safetyOfficerStatus
          })]
        }), jsxs("div", {
          children: [jsx("h4", {
            children: "Issuing Authority"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.issuringAuthoritySupStatus
          })]
        })]
      })
    }), jsx(Tabs, {
      tabs
    }), permit ? jsxs(Fragment$1, {
      children: [activeTab === "Renewal Details" && jsxs("div", {
        className: "app-section",
        children: [jsxs(Accordion, {
          show: true,
          children: [jsx(AccordionItem, {
            title: "Start Date & Time",
            value: dayjs(permit.startDate).format("DD / MM / YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "End Date & Time",
            value: dayjs(permit.endDate).format("DD / MM / YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "Name of Gas Tester",
            value: permit.gasTesterName
          }), jsx(AccordionItem, {
            title: "Date Gas Test",
            value: dayjs(permit.gasTestDate).format("DD / MM / YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "23.5% > O2 < 19.5%t",
            value: "MECHANICAL"
          }), jsx(AccordionItem, {
            title: "CO",
            value: permit.o2Percentage
          }), jsx(AccordionItem, {
            title: "H2S < 2PPM",
            value: permit.h2s
          }), jsx(AccordionItem, {
            title: "L.E.L. < 10%",
            value: permit.lel
          })]
        }), jsxs(Accordion, {
          show: true,
          children: [jsx(AccordionItem, {
            title: "Date Created",
            value: dayjs(permit.createdAt).format("DD / MM / YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "Initiated by:",
            value: `${permit.initiator.firstname} ${permit.initiator.lastname}`
          }), jsx(AccordionItem, {
            title: "PTW No.",
            value: permit.permitId
          })]
        })]
      }), activeTab === "Safety Officer" && jsx(SafetyOfficer$1, {
        permit
      }), activeTab === "Issuing Auth." && jsx(IssuingAuth$2, {
        permit
      })]
    }) : jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permit renewal details, please wait..." : "Failed to fetch, please try again"
      })]
    })]
  });
}
function PermitsList$1({
  flag
}) {
  var _a, _b;
  const {
    response,
    isLoading
  } = useRequest(getPermitCompletions, {
    flag
  }, true);
  return jsxs("div", {
    className: "app-section",
    children: [jsxs(Table, {
      children: [jsx(TableHead, {
        children: jsxs(TableRow, {
          children: [jsx(TableCell, {
            children: "PTW No."
          }), jsx(TableCell, {
            children: "Start Date"
          }), jsx(TableCell, {
            children: "Work To Be Performed"
          }), jsx(TableCell, {
            children: "Location of Work"
          }), jsx(TableCell, {
            children: "Exec. Company"
          }), jsx(TableCell, {
            children: "Status"
          }), jsx(TableCell, {})]
        })
      }), jsx(TableBody, {
        children: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.map((data) => {
          var _a2;
          return jsxs(TableRow, {
            children: [jsx(TableCell, {
              children: data.id
            }), jsx(TableCell, {
              children: dayjs(data.validityStartDate).format("MMM DD, YYYY")
            }), jsx(TableCell, {
              children: data.workDescription ?? "-"
            }), jsx(TableCell, {
              children: "AKRI"
            }), jsx(TableCell, {
              children: "Pasquale_Appaito"
            }), jsx(TableCell, {
              children: jsx("div", {
                className: `base-tag--${getStatus$1(data.status)}`,
                children: (_a2 = data.status) == null ? void 0 : _a2.replace("_", " ").toLowerCase()
              })
            }), jsx(TableCell, {
              children: jsx(Button, {
                href: `/permit-completions/${data.id}`,
                variant: "outline",
                children: "View"
              })
            })]
          }, data.id);
        })
      })]
    }), !((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.length) && jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
      })]
    })]
  });
}
function getStatus$1(status) {
  switch (status) {
    case "IN_PROGRESS":
      return "warn";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    case "COMPLETED":
      return "success";
    case "SUSPENDED":
      return "warn";
  }
}
function WorkCompletions({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["All Permits", "Safety Officer", "Issuing Auth. Supervisor", "Approved", "Rejected"]);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Work Completions"
    }), jsx("div", {
      className: "app-section__header",
      children: jsx(DateFilter, {
        variant: "secondary"
      })
    }), jsx(Tabs, {
      tabs
    }), activeTab === "All Permits" && jsx(PermitsList$1, {}), activeTab === "Safety Officer" && jsx(PermitsList$1, {
      flag: "safety"
    }), activeTab === "Issuing Auth. Supervisor" && jsx(PermitsList$1, {
      flag: "issuing"
    }), activeTab === "Approved" && jsx(PermitsList$1, {
      flag: "approved"
    }), activeTab === "Rejected" && jsx(PermitsList$1, {
      flag: "rejected"
    })]
  });
}
function HseOfficer$1({
  permit
}) {
  const approveApi = useRequest(approveHseCompletion);
  const rejectApi = useRequest(rejectHseCompletion);
  const isApproved = permit.completionHseOfficerStatus === "APPROVED";
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.completionHseOfficerStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve the completion fo this project, you can confirm the work is completed, all tools an equipment are reinstated in their initial position, and worksite is left clean and safe."
      }), jsx("div", {
        className: "app-ptw__details__module__btn-footer",
        children: jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        })
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.completionHseOfficerStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "MECHANICAL"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "HSE Officer"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "HSE Officer"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function IssuingAuth$1({
  permit
}) {
  const approveApi = useRequest(approveIssuingAuthCompletion);
  const rejectApi = useRequest(rejectIssuingAuthCompletion);
  const isApproved = permit.completionIssuringAuthSupStatus === "APPROVED";
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  async function rejectPermit() {
    const [_, err] = await rejectApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to reject permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.completionIssuringAuthSupStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve the completion fo this project, you can confirm the work is completed, all tools an equipment are reinstated in their initial position, and worksite is left clean and safe."
      }), jsx("div", {
        className: "app-ptw__details__module__btn-footer",
        children: jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        })
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.completionIssuringAuthSupStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "MECHANICAL"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth. Supervisor"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    }), jsxs(Modal, {
      show: modals.confirmRejection,
      toggle: () => toggle("confirmRejection"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth. Supervisor"
      }), jsxs(ModalBody, {
        children: [jsx("img", {
          src: "/svgs/danger.svg",
          alt: "danger"
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Reject Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By rejecting this permit, it means you have verified all the details and document provided and they do not match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmRejection"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "danger",
            onClick: rejectPermit,
            isLoading: rejectApi.isLoading,
            children: "Reject"
          })]
        })]
      })]
    })]
  });
}
function WorkCompletionDetails({}) {
  const [{
    matches: {
      id
    }
  }] = useRouter();
  const {
    isLoading,
    response
  } = useRequest(getPermit, {
    id
  }, true);
  const permit = response == null ? void 0 : response.data;
  const {
    activeTab,
    tabs
  } = useTabs(["Completion Request", "HSE Officer", "Issuing Auth. Supervisor"]);
  return jsxs("div", {
    className: "app-ptw__details",
    children: [jsx(Header, {
      title: "Work Completion Details"
    }), jsx("div", {
      className: "app-section",
      children: jsxs("div", {
        className: "app-ptw__header-status",
        style: {
          gridTemplateColumns: "1fr 1fr"
        },
        children: [jsxs("div", {
          children: [jsx("h4", {
            children: "HSE Officer"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.completionHseOfficerStatus
          })]
        }), jsxs("div", {
          children: [jsx("h4", {
            children: "Issuing Authority Supervisor"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.completionIssuringAuthSupStatus
          })]
        })]
      })
    }), jsx(Tabs, {
      tabs
    }), permit ? jsxs(Fragment$1, {
      children: [activeTab === "Completion Request" && jsx("div", {
        className: "app-section",
        children: jsxs(Accordion, {
          show: true,
          children: [jsx(AccordionItem, {
            title: "Initiated by:",
            value: "MECHANICAL"
          }), jsx(AccordionItem, {
            title: "Date Requested",
            value: dayjs(permit.completionRequestDate).format("DD MMM YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "PTW No.",
            value: permit.id
          })]
        })
      }), activeTab === "HSE Officer" && jsx(HseOfficer$1, {
        permit
      }), activeTab === "Issuing Auth. Supervisor" && jsx(IssuingAuth$1, {
        permit
      })]
    }) : jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permit Completion Request, please wait..." : "Failed to fetch, please try again"
      })]
    })]
  });
}
function PermitsList({
  flag,
  detailsLink = "/permit-management/ptw/",
  api = getSuspendedPermits
}) {
  var _a, _b;
  const {
    response,
    isLoading
  } = useRequest(api, {
    flag
  }, true);
  return jsxs("div", {
    className: "app-section",
    children: [jsxs(Table, {
      children: [jsx(TableHead, {
        children: jsxs(TableRow, {
          children: [jsx(TableCell, {
            children: "PTW No."
          }), jsx(TableCell, {
            children: "Start Date"
          }), jsx(TableCell, {
            children: "Work To Be Performed"
          }), jsx(TableCell, {
            children: "Location of Work"
          }), jsx(TableCell, {
            children: "Exec. Company"
          }), jsx(TableCell, {
            children: "Status"
          }), jsx(TableCell, {})]
        })
      }), jsx(TableBody, {
        children: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.map((data) => {
          var _a2;
          return jsxs(TableRow, {
            children: [jsx(TableCell, {
              children: data.id
            }), jsx(TableCell, {
              children: dayjs(data.validityStartDate).format("MMM DD, YYYY")
            }), jsx(TableCell, {
              children: data.workDescription ?? "-"
            }), jsx(TableCell, {
              children: "AKRI"
            }), jsx(TableCell, {
              children: "Pasquale_Appaito"
            }), jsx(TableCell, {
              children: jsx("div", {
                className: `base-tag--${getStatus(data.status)}`,
                children: (_a2 = data.status) == null ? void 0 : _a2.replace("_", " ").toLowerCase()
              })
            }), jsx(TableCell, {
              children: jsx(Button, {
                href: `${detailsLink}${data.id}`,
                variant: "outline",
                children: "View"
              })
            })]
          }, data.id);
        })
      })]
    }), !((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.length) && jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
      })]
    })]
  });
}
function getStatus(status) {
  switch (status) {
    case "IN_PROGRESS":
      return "warn";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    case "COMPLETED":
      return "success";
    case "SUSPENDED":
      return "warn";
  }
}
function WorkSuspensions({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["SUSPENDED WORKS", "WORK CONTINUATION"]);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Work Completions"
    }), jsx("div", {
      className: "app-section__header",
      children: jsx(DateFilter, {
        variant: "secondary"
      })
    }), jsx(Tabs, {
      tabs
    }), activeTab === "SUSPENDED WORKS" && jsx(PermitsList, {}), activeTab === "WORK CONTINUATION" && jsx(WorkContinuations, {})]
  });
}
function WorkContinuations() {
  const {
    tabs,
    activeTab
  } = useTabs(["All Requests", "HSE Officer", "Issuing Auth. Supervisor", "Approved"]);
  return jsxs(Fragment$1, {
    children: [jsx(Tabs, {
      tabs
    }), activeTab === "All Requests" && jsx(PermitsList, {
      api: getContinuationPermits,
      flag: "all",
      detailsLink: "/permit-suspensions/continuation/"
    }), activeTab === "HSE Officer" && jsx(PermitsList, {
      api: getContinuationPermits,
      flag: "hse",
      detailsLink: "/permit-suspensions/continuation/"
    }), activeTab === "Issuing Auth. Supervisor" && jsx(PermitsList, {
      api: getContinuationPermits,
      flag: "issuing",
      detailsLink: "/permit-suspensions/continuation/"
    }), activeTab === "Approved" && jsx(PermitsList, {
      api: getContinuationPermits,
      flag: "approved",
      detailsLink: "/permit-suspensions/continuation/"
    })]
  });
}
function HseOfficer({
  permit
}) {
  const approveApi = useRequest(approveHseContinuation);
  const isApproved = permit.continuationHseOfficerStatus === "APPROVED";
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve continuation, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.continuationHseOfficerStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details."
      }), jsx("div", {
        className: "app-ptw__details__module__btn-footer",
        children: jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        })
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.continuationHseOfficerStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "MECHANICAL"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "HSE Officer"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    })]
  });
}
function IssuingAuth({
  permit
}) {
  const approveApi = useRequest(approveIssuingAuthContinuation);
  const isApproved = permit.continuationIssuringAuthSupStatus === "APPROVED";
  const {
    toggle,
    modals
  } = useModal({
    confirmApproval: false,
    confirmRejection: false
  });
  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest({
      id: +permit.id
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to approve permit, please try again"
      });
    }
    window.location.reload();
  }
  return jsxs("div", {
    className: "app-section",
    children: [permit.continuationIssuringAuthSupStatus === "IN_PROGRESS" ? jsxs("div", {
      className: "app-ptw__details__module",
      children: [jsx("h4", {
        children: "Approval Section"
      }), jsx("p", {
        children: "To approve this permit, ensure you have properly gone through the PTW Details and confirmed all details and documents provided. Kindly fill in addition notes below to add more details."
      }), jsx("div", {
        className: "app-ptw__details__module__btn-footer",
        children: jsx(Button, {
          variant: "primary",
          onClick: () => toggle("confirmApproval"),
          children: "Approve Permit"
        })
      })]
    }) : jsxs(Accordion, {
      show: true,
      title: "Approval Details",
      children: [jsx(AccordionItem, {
        title: "Status",
        value: isApproved ? jsx("p", {
          className: "active-text",
          children: "Approved"
        }) : jsx("p", {
          className: "danger-text",
          children: "Rejected"
        })
      }), jsx(AccordionItem, {
        title: "Date",
        value: dayjs(permit.continuationIssuringAuthSupStatusDate).format("MMM DD, YYYY HH:mm A")
      }), jsx(AccordionItem, {
        title: "Approved by:",
        value: "MECHANICAL"
      })]
    }), jsxs(Modal, {
      show: modals.confirmApproval,
      toggle: () => toggle("confirmApproval"),
      align: "center",
      children: [jsx(ModalHeader, {
        children: "Issuing Auth. Supervisor"
      }), jsxs(ModalBody, {
        children: [jsxs("svg", {
          width: "100",
          height: "100",
          viewBox: "0 0 100 100",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z",
            fill: "#008171"
          }), jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z",
            fill: "#008171",
            "fill-opacity": "0.1"
          })]
        }), jsx("h4", {
          className: "app-modal__content__title",
          children: "Approve Permit"
        }), jsx("p", {
          className: "app-modal__content__desc",
          children: "By approving this permit, it means you have verified all the details and document provided they match the required standards."
        }), jsxs("div", {
          className: "app-modal__content__footer",
          children: [jsx(Button, {
            variant: "secondary",
            onClick: () => toggle("confirmApproval"),
            children: "Cancel"
          }), jsx(Button, {
            variant: "success",
            onClick: approvePermit,
            isLoading: approveApi.isLoading,
            children: "Approve"
          })]
        })]
      })]
    })]
  });
}
function WorkContinuationDetails({}) {
  const [{
    matches: {
      id
    }
  }] = useRouter();
  const {
    isLoading,
    response
  } = useRequest(getPermit, {
    id
  }, true);
  const permit = response == null ? void 0 : response.data;
  const {
    activeTab,
    tabs
  } = useTabs(["Continuation Request", "HSE Officer", "Issuing Auth. Supervisor"]);
  return jsxs("div", {
    className: "app-ptw__details",
    children: [jsx(Header, {
      title: "Work Continuation Details"
    }), jsx("div", {
      className: "app-section",
      children: jsxs("div", {
        className: "app-ptw__header-status",
        style: {
          gridTemplateColumns: "1fr 1fr"
        },
        children: [jsxs("div", {
          children: [jsx("h4", {
            children: "HSE Officer"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.continuationHseOfficerStatus
          })]
        }), jsxs("div", {
          children: [jsx("h4", {
            children: "Issuing Authority Supervisor"
          }), jsx(PermitLevelStatus, {
            variant: permit == null ? void 0 : permit.continuationIssuringAuthSupStatus
          })]
        })]
      })
    }), jsx(Tabs, {
      tabs
    }), permit ? jsxs(Fragment$1, {
      children: [activeTab === "Continuation Request" && jsx("div", {
        className: "app-section",
        children: jsxs(Accordion, {
          show: true,
          children: [jsx(AccordionItem, {
            title: "Initiated by:",
            value: "MECHANICAL"
          }), jsx(AccordionItem, {
            title: "Date Requested",
            value: dayjs(permit.continuationRequestDate).format("DD MMM YYYY. HH:mm A")
          }), jsx(AccordionItem, {
            title: "PTW No.",
            value: permit.id
          })]
        })
      }), activeTab === "HSE Officer" && jsx(HseOfficer, {
        permit
      }), activeTab === "Issuing Auth. Supervisor" && jsx(IssuingAuth, {
        permit
      })]
    }) : jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg"
      }), jsx("p", {
        children: isLoading ? "Fetching permit Continuation Request, please wait..." : "Failed to fetch, please try again"
      })]
    })]
  });
}
Chart.register(...registerables);
function Analytics({}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const {
    response
  } = useRequest(getAnalytics, {}, true);
  const {
    tabs
  } = useTabs(["Month", "Year"]);
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Approved",
          data: [0.2, 0.7, 1.2, 1.8, 2.3, 3, 4, 3.8, 3.2, 2.3, 1.2, 0.7],
          // Replace with your actual data
          borderColor: "green",
          backgroundColor: "green",
          fill: false,
          tension: 0.4
          // Adds slight curve to the line
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top"
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Hours"
            }
          }
        }
      }
    });
  });
  const [year, setYear] = useState("2024");
  const yearOptions = [{
    value: "2024",
    text: "2024"
  }, {
    value: "2023",
    text: "2023"
  }, {
    value: "2022",
    text: "2022"
  }];
  return jsxs("div", {
    children: [jsx(Header, {
      title: "Analytics & Report"
    }), jsxs("div", {
      className: "app-section",
      children: [jsxs("div", {
        className: "app-analytics__header",
        children: [jsxs(Button, {
          dimension: "md",
          variant: "primary",
          onClick: () => generateReport(response),
          children: [jsx(Icon, {
            name: "report"
          }), "Generate Report"]
        }), jsxs("div", {
          children: [jsx(Tabs, {
            tabs
          }), jsxs(Dropdown, {
            children: [jsx(DropdownTrigger, {
              children: year
            }), jsx(DropdownContent, {
              children: yearOptions.map((year2) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setYear(year2.value),
                children: year2.text
              }, year2.value))
            })]
          })]
        })]
      }), jsxs("div", {
        className: "app-analytics__grid",
        children: [jsxs("div", {
          className: "app-analytics__card",
          children: [jsx("p", {
            className: "app-analytics__card__title",
            children: "Total Permits"
          }), jsxs("div", {
            className: "stats",
            children: [jsx("h4", {
              children: ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.allPermitCount) ?? 0
            }), jsxs("p", {
              className: "stat-increase",
              children: ["+ 16.5% ", jsx(Icon, {
                name: "increase"
              })]
            })]
          }), jsxs("div", {
            className: "counts",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: ((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.closedPermitCount) ?? 0
              }), jsx("p", {
                children: "Closed"
              })]
            }), jsxs("div", {
              children: [jsx("h4", {
                children: ((_c = response == null ? void 0 : response.data) == null ? void 0 : _c.issuedPermitCount) ?? 0
              }), jsx("p", {
                children: "Issued"
              })]
            })]
          }), jsxs("div", {
            className: "progress-bar",
            children: [jsxs("div", {
              className: "progress-bar__bar",
              children: [jsx("div", {
                className: "approved-bar"
              }), jsx("div", {
                className: "rejected-bar"
              })]
            }), jsxs("div", {
              children: [jsx("p", {
                children: "70%"
              }), jsx("p", {
                children: "30%"
              })]
            })]
          })]
        }), jsxs("div", {
          className: "app-analytics__bar-chart",
          children: [jsxs("div", {
            className: "app-analytics__bar-chart__header",
            children: [jsx("h4", {
              children: "Permits"
            }), jsxs("div", {
              className: "app-indicator",
              children: [jsxs("p", {
                children: [jsx("span", {
                  style: {
                    background: "#008d4e"
                  }
                }), "Issued"]
              }), jsxs("p", {
                children: [jsx("span", {
                  style: {
                    background: "#E86E18"
                  }
                }), "Closed"]
              })]
            })]
          }), jsx("div", {
            style: {
              height: "250px"
            },
            children: jsx(Bar, {
              options: {
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    border: {
                      display: false
                    },
                    grid: {
                      color: "#dbdbdb80",
                      lineWidth: 1
                    },
                    ticks: {
                      callback: function(val, index) {
                        return index % 2 === 0 ? this.getLabelForValue(val) : "";
                      }
                    }
                  },
                  x: {
                    grid: {
                      border: {
                        display: false
                      },
                      lineWidth: 0
                    },
                    ticks: {
                      zIndex: 10,
                      beginAtZero: true
                    }
                  }
                }
              },
              data: {
                labels: getApprovalsData((_e = (_d = response == null ? void 0 : response.data) == null ? void 0 : _d.permitChart) == null ? void 0 : _e.closedPermitsGroupedByMonth).labels ?? [],
                datasets: response ? [{
                  label: "Issued",
                  data: getApprovalsData((_g = (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.permitChart) == null ? void 0 : _g.issuedPermitsGroupedByMonth).data ?? [],
                  backgroundColor: "#008D4E",
                  borderRadius: 20,
                  barThickness: 12,
                  borderColor: "rgba(0,0,0,0)",
                  borderWidth: 2
                }, {
                  label: "Closed",
                  data: getApprovalsData((_i = (_h = response == null ? void 0 : response.data) == null ? void 0 : _h.permitChart) == null ? void 0 : _i.closedPermitsGroupedByMonth).data ?? [],
                  backgroundColor: "#E86E18",
                  borderRadius: 20,
                  barThickness: 12,
                  borderColor: "rgba(232, 110, 24, 1)",
                  borderWidth: 2
                }] : []
              }
            })
          })]
        })]
      }), jsxs("div", {
        className: "app-analytics__grid",
        children: [jsxs("div", {
          className: "app-analytics__approvals",
          children: [jsx("h2", {
            children: "Safety Metrics"
          }), jsx("canvas", {
            ref: chartRef
          })]
        }), jsxs("div", {
          className: "app-analytics__card app-analytics__line-graph",
          children: [jsx("h2", {
            className: "",
            children: "Top Identified Hazards"
          }), jsxs("div", {
            className: "",
            children: [jsxs("div", {
              className: "details",
              children: [jsx("h4", {
                children: "Noise"
              }), jsx("span", {
                children: "500 permits"
              })]
            }), jsxs("div", {
              className: "details",
              children: [jsx("h4", {
                children: "Toxic Substance"
              }), jsx("span", {
                children: "500 permits"
              })]
            }), jsxs("div", {
              className: "",
              children: [jsx("h4", {
                children: "Spill (CONTAINMENT IN PLACE)"
              }), jsx("span", {
                children: "500 permits"
              })]
            })]
          })]
        })]
      })]
    })]
  });
}
function getApprovalsData(data) {
  if (!data)
    return {};
  return {
    labels: Object.keys(data),
    data: Object.values(data)
  };
}
function generateReport(data) {
  console.log("oga please");
  if (!data.success || data.statusCode !== 201) {
    return "Failed to retrieve data for the report.";
  }
  const {
    allPermitCount,
    closedPermitCount,
    issuedPermitCount,
    permitChart: {
      closedPermitsGroupedByMonth,
      issuedPermitsGroupedByMonth
    }
  } = data.data;
  const now = /* @__PURE__ */ new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentMonthYear = `${currentYear}-${currentMonth}`;
  console.log(currentMonthYear);
  let report = `### Monthly Permit Report for ${now.toLocaleString("default", {
    month: "long"
  })} ${currentYear}

`;
  report += `#### Summary:
`;
  report += `- Total Permits: ${allPermitCount}
`;
  report += `- Issued Permits: ${issuedPermitCount}
`;
  report += `- Closed Permits: ${closedPermitCount}

`;
  report += `---

#### **Details of Issued Permits (December 2024):**
`;
  if (issuedPermitsGroupedByMonth["2024-12"]) {
    issuedPermitsGroupedByMonth["2024-12"].forEach((permit, index) => {
      report += `${index + 1}. **Permit ID:** ${permit.publicId}
`;
      report += `   - **Type:** ${permit.type}
`;
      report += `   - **Work Area:** ${permit.workArea}
`;
      report += `   - **Performing Person in Charge:** ${permit.performingPersonInCharge}
`;
      report += `   - **Description:** ${permit.workDescription}
`;
      report += `   - **From Date:** ${permit.fromDate}
`;
      report += `   - **To Date:** ${permit.toDate}
`;
      report += `   - **Status:** ${permit.status}
`;
      report += `   - **Date Approved:** ${new Date(permit.dateApproved).toLocaleDateString()}
`;
      report += `   - **Current Authority:** ${permit.currentAuthority}

`;
    });
  } else {
    report += "_No issued permits for this period._\n\n";
  }
  report += `---

#### **Details of Closed Permits (December 2024):**
`;
  if (closedPermitsGroupedByMonth["2024-12"]) {
    closedPermitsGroupedByMonth["2024-12"].forEach((permit, index) => {
      report += `${index + 1}. **Permit ID:** ${permit.publicId}
`;
      report += `   - **Type:** ${permit.type}
`;
      report += `   - **Work Area:** ${permit.workArea}
`;
      report += `   - **Performing Person in Charge:** ${permit.performingPersonInCharge}
`;
      report += `   - **Description:** ${permit.workDescription}
`;
      report += `   - **From Date:** ${permit.fromDate}
`;
      report += `   - **To Date:** ${permit.toDate}
`;
      report += `   - **Status:** ${permit.status}
`;
      report += `   - **Date Closed:** ${permit.dateClosed ? new Date(permit.dateClosed).toLocaleDateString() : "N/A"}
`;
      report += `   - **Current Authority:** ${permit.currentAuthority}

`;
    });
  } else {
    report += "_No closed permits for this period._\n\n";
  }
  const blob = new Blob([report], {
    type: "text/plain"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Monthly_Permit_Report_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function EditLocation({}) {
  const {
    valueID
  } = useIDContext();
  const siteApi = useRequest(getSites, {}, true);
  const [locationName, setLocationName] = useState("");
  const [locationResponseState, setLocationResponseState] = useState(null);
  const id = valueID;
  console.log(locationName, id);
  useEffect(() => {
    async function getLocationDetails() {
      const response = await createRequest(`/location/${id}`, "GET");
      const locationData = response[0].data;
      setLocationResponseState(locationData);
      setLocationName(locationData == null ? void 0 : locationData.locationArea);
      setFieldValue("workArea", (locationData == null ? void 0 : locationData.workAreas) || []);
    }
    getLocationDetails();
  }, [id]);
  useEffect(() => {
    if (locationResponseState) {
      setFieldValue("locationId", locationResponseState == null ? void 0 : locationResponseState.id);
      setFieldValue("locationArea", locationResponseState == null ? void 0 : locationResponseState.locationArea);
      setFieldValue("site", locationResponseState == null ? void 0 : locationResponseState.site);
    }
  });
  const {
    makeRequest,
    isLoading
  } = useRequest(editLocation);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue,
    values
  } = useForm({
    initialValues: {
      locationId: 0,
      site: "",
      locationArea: "",
      workArea: []
    },
    onSubmit,
    validationSchema: validationSchema$D
  });
  const addNewLocationField = () => {
    setFieldValue("workArea", [...values.workArea, ""]);
  };
  const handleLocationChange = (index, value) => {
    const updatedWorkArea = [...values.workArea];
    updatedWorkArea[index] = value;
    setFieldValue("workArea", updatedWorkArea);
  };
  const removeLocationField = (index) => {
    const updatedWorkArea = values.workArea.filter((_, i2) => i2 !== index);
    setFieldValue("workArea", updatedWorkArea);
  };
  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);
  console.log(locationOptions);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData ? siteData.map((location2) => ({
        text: location2.locationArea,
        value: location2.id
      })) : [{
        text: "No location areas found",
        value: ""
      }];
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);
  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      locationId: Number(data.locationId) || (locationResponseState == null ? void 0 : locationResponseState.id),
      site: data.site || (locationResponseState == null ? void 0 : locationResponseState.site),
      locationArea: data.locationArea || (locationResponseState == null ? void 0 : locationResponseState.locationArea),
      workArea: data.workArea.filter(Boolean)
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to edit location, please try again."
      });
    }
    toast({
      variant: "success",
      message: "Location area edited successfully"
    });
    route("/locations");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Locations"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/locations"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Edit location"
          }), jsx("p", {
            children: "Fill the fields below to edit the location"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Site Title"
          }), jsx(Select, {
            placeholder: locationResponseState == null ? void 0 : locationResponseState.site,
            options: siteOptions,
            ...getFieldProps("site"),
            onChange: (e) => setSiteName(e.target.value)
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Location Area"
          }), jsx("div", {
            className: "location-fields",
            children: jsx(Input, {
              placeholder: locationResponseState == null ? void 0 : locationResponseState.locationArea,
              onChange: (e) => setFieldValue("locationArea", e.target.value),
              ...getFieldProps(`locationArea`)
            })
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Work Area"
          }), values.workArea.map((location2, index) => jsx("div", {
            className: "location-fields",
            children: jsx(Input, {
              placeholder: "Enter Work Area",
              value: location2,
              onChange: (e) => handleLocationChange(index, e.target.value),
              button: jsx("img", {
                src: "/svgs/delete_icon.svg",
                alt: "Delete",
                onClick: () => removeLocationField(index)
              })
            })
          }, index)), jsxs("div", {
            className: "app-create__edit-location",
            style: {
              cursor: "pointer"
            },
            onClick: addNewLocationField,
            children: [jsx("img", {
              src: "/svgs/location-add.svg",
              width: 16,
              height: 16
            }), jsx("span", {
              children: "Add Work Area"
            })]
          }), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Submit"
          })]
        })
      })]
    })]
  });
}
const validationSchema$D = Yup.object({
  // Add validation rules as needed
});
function EditUser({}) {
  var _a;
  const {
    makeRequest,
    isLoading
  } = useRequest(editExternalUser);
  const {
    valueID
  } = useIDContext();
  const [user, setUser] = useState({
    email: "",
    roleId: 0,
    fullname: "",
    role: {
      name: ""
    }
  });
  const rolesApi = useRequest(getRoles, {}, true);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue
  } = useForm({
    initialValues: {
      email: "",
      roleId: null,
      fullname: ""
    },
    onSubmit,
    validationSchema: validationSchema$C
  });
  const roleOptions = ((_a = rolesApi.response) == null ? void 0 : _a.data) ? rolesApi.response.data.map((role) => ({
    text: role.name,
    value: role.id
  })) : [];
  useEffect(() => {
    async function getUserByID() {
      const userResponse = await createRequest(`/profile/${valueID}`, "GET");
      const userData = userResponse[0].data;
      setUser(userData);
      console.log(userData);
    }
    getUserByID();
  }, [valueID]);
  useEffect(() => {
    if (user) {
      setFieldValue("email", user.email);
      setFieldValue("roleId", user.roleId);
      setFieldValue("fullname", user.fullname);
    }
  }, [user]);
  async function onSubmit(data) {
    console.log(data);
    const [_, error] = await makeRequest({
      fullname: data.fullname || (user == null ? void 0 : user.fullname),
      email: data.email || (user == null ? void 0 : user.email),
      roleId: Number(data.roleId) || (user == null ? void 0 : user.roleId),
      externalProfileId: valueID
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to update user, please try again."
      });
    }
    toast({
      variant: "success",
      message: "User updated successfully"
    });
    route("/users");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Edit existing user"
          }), jsx("p", {
            children: "Fill the fields below to edit an existing user"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Full Name"
          }), jsx(Input, {
            placeholder: "Enter full name",
            ...getFieldProps("fullname")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Email Address"
          }), jsx(Input, {
            placeholder: `${user.email ? user.email : "Enter email address"}`,
            ...getFieldProps("email")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Role"
          }), jsx(Select, {
            ...getFieldProps("roleId"),
            placeholder: `${user.roleId ? user.role.name : "--select role--"}`,
            options: roleOptions
          }), jsx(Button, {
            type: "submit",
            variant: "primary",
            isLoading,
            children: "Edit User"
          })]
        })
      })]
    })]
  });
}
const validationSchema$C = Yup.object({
  // firstName: Yup.string().when(
  //   "userType",
  //   isExternalUser("First name is required")
  // ),
  // lastName: Yup.string().when(
  //   "userType",
  //   isExternalUser("Last name is required")
  // ),
  // fullname: Yup.string().required("Full name is required"),
  // email: Yup.string().email("Email is invalid").required("Email is required"),
  // roleId: Yup.string().required("Role is required"),
});
function CreateExternalUser({}) {
  var _a;
  const {
    makeRequest,
    isLoading
  } = useRequest(createExternalUser);
  const {
    valueID
  } = useIDContext();
  const rolesApi = useRequest(getRoles, {}, true);
  const validationSchema2 = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    roleId: Yup.number().required("A role must be selected")
  });
  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      fullname: data.fullname,
      email: data.email,
      roleId: Number(data.roleId),
      companyId: Number(valueID)
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create user, please try again."
      });
    }
    route("/users/company/details");
  }
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      fullname: "",
      email: "",
      roleId: null
    },
    onSubmit,
    validationSchema: validationSchema2
  });
  const roleOptions = ((_a = rolesApi.response) == null ? void 0 : _a.data) ? rolesApi.response.data.map((role) => ({
    text: role.name,
    value: role.id
  })) : [];
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Create new user"
          }), jsx("p", {
            children: "Fill the fields below to create a new user"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Full Name"
          }), jsx(Input, {
            placeholder: "Enter full name",
            ...getFieldProps("fullname")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Email Address"
          }), jsx(Input, {
            placeholder: "Enter email address",
            ...getFieldProps("email")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Role"
          }), jsx(Select, {
            ...getFieldProps("roleId"),
            placeholder: "Select a role",
            options: roleOptions
          }), jsx(Button, {
            type: "submit",
            variant: "primary",
            isLoading,
            children: "Create User"
          })]
        })
      })]
    })]
  });
}
function CreateInternalUser({}) {
  var _a;
  const {
    makeRequest,
    isLoading
  } = useRequest(createInternalUser);
  const rolesApi = useRequest(getRoles, {}, true);
  const siteApi = useRequest(getSites, {}, true);
  const validationSchema2 = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    roleId: Yup.number().required("A role must be selected"),
    locationId: Yup.number().min(1, "Select a location")
  });
  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData ? siteData.map((location2) => ({
        text: location2.locationArea,
        value: location2.id
      })) : [{
        text: "No location areas found",
        value: ""
      }];
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);
  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      email: data.email,
      roleId: Number(data.roleId),
      locationId: Number(data.locationId)
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create user, please try again."
      });
    } else {
      toast({
        variant: "success",
        message: "User created successfully"
      });
    }
    route("/users");
  }
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      email: "",
      roleId: null,
      locationId: 0
    },
    onSubmit,
    validationSchema: validationSchema2
  });
  const roleOptions = ((_a = rolesApi.response) == null ? void 0 : _a.data) ? rolesApi.response.data.map((role) => ({
    text: role.name,
    value: role.id
  })) : [];
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Create new user"
          }), jsx("p", {
            children: "Fill the fields below to create a new user"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Email Address"
          }), jsx(Input, {
            placeholder: "Enter email address",
            ...getFieldProps("email")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Role"
          }), jsx(Select, {
            ...getFieldProps("roleId"),
            placeholder: "--select role--",
            options: roleOptions
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Site Title"
          }), jsx(Select, {
            placeholder: siteName,
            options: siteOptions,
            ...getFieldProps("siteName"),
            onChange: (e) => setSiteName(e.target.value)
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Location Area"
          }), jsx(Select, {
            placeholder: "--select location--",
            options: locationOptions,
            ...getFieldProps("locationId"),
            required: true
          }), jsx(Button, {
            type: "submit",
            variant: "primary",
            isLoading,
            children: "Create User"
          })]
        })
      })]
    })]
  });
}
function CreateCompany({}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(createNewCompany);
  const siteApi = useRequest(getSites, {}, true);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: {
      name: "",
      contractId: "",
      locationId: 0
    },
    onSubmit,
    validationSchema: validationSchema$B
  });
  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData ? siteData.map((location2) => ({
        text: location2.locationArea,
        value: location2.id
      })) : [{
        text: "No location areas found",
        value: 0
      }];
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);
  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      name: data.companyName,
      contractId: data.contractID,
      locationId: Number(data.locationId)
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create user, please try again."
      });
    }
    route("/users");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Create new company"
          }), jsx("p", {
            children: "Fill the fields below to create a new company"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Company Name"
          }), jsx(Input, {
            placeholder: "Enter company name",
            ...getFieldProps("companyName")
          }), jsxs(Fragment$1, {
            children: [jsx("p", {
              className: "app-create__form__title",
              children: "Contract ID"
            }), jsx(Input, {
              placeholder: "Enter contract ID",
              ...getFieldProps("contractID")
            }), jsx("p", {
              className: "app-create__form__title",
              children: "Site"
            }), jsx(Select, {
              placeholder: siteName,
              options: siteOptions,
              ...getFieldProps("siteName"),
              onChange: (e) => setSiteName(e.target.value)
            }), jsx("p", {
              className: "app-create__form__title",
              children: "Location Area"
            }), jsx(Select, {
              placeholder: "--select location--",
              options: locationOptions,
              ...getFieldProps("locationId"),
              required: true
            })]
          }), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Create Company"
          })]
        })
      })]
    })]
  });
}
const validationSchema$B = Yup.object({
  companyName: Yup.string().required("Company name is required").trim().min(2, "Please enter a valid company name"),
  contractID: Yup.string().required("Contract ID is required").trim().min(4, "Please enter a valid contract ID"),
  locationId: Yup.number().required("Location is required").required("Select a valid site and location area").min(1, "Please select a valid location")
});
const ExternalUsers = ({
  company = []
}) => {
  var _a, _b, _c, _d;
  const [selectedUser, viewUser] = useState(null);
  const {
    toggle,
    modals
  } = useModal({
    user_details: false
  });
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const status = ["All Status", "Active", "Inactive"];
  const [searchQuery, setSearchQuery] = useState("");
  const {
    setID,
    valueID
  } = useIDContext();
  async function getUserById(id) {
    var _a2, _b2;
    const response = await createRequest(`/profile/${id}`, "GET");
    viewUser((_a2 = response[0]) == null ? void 0 : _a2.data);
    console.log((_b2 = response[0]) == null ? void 0 : _b2.data);
  }
  const handleItemClick = (item) => {
    getUserById(item.id);
    toggle("user_details");
  };
  const getName = (item) => `${item.fullname}`;
  const filteredData = company || [];
  const [isModalOpen, setModalOpen] = useState(false);
  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };
  const handleDeleteRole = async () => {
    var _a2;
    const id = valueID;
    const response = await createRequest(`/profile/${id}`, "DELETE");
    if (((_a2 = response[0]) == null ? void 0 : _a2.statusCode) === 200) {
      toggle("user_details");
      setModalOpen(false);
      return toast({
        variant: "success",
        message: "User deleted successfully"
      });
    } else {
      return toast({
        variant: "error",
        message: "User delete failed, please try again"
      });
    }
  };
  const handleEdit = (item) => {
    setID(item.id);
    route(`/users/edit`);
  };
  const filteredInfo = filteredData.filter((user) => {
    const name = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase()) || searchQuery === "";
    const statusMatch = selectedStatus === "All Status" || selectedStatus === "Active" && user.isActive || selectedStatus === "Inactive" && !user.isActive;
    return matchesSearch && statusMatch;
  });
  return jsxs("div", {
    children: [jsxs("div", {
      className: "app-section__flex",
      children: [jsx(Search, {
        placeholder: "Search by user name",
        onSearch: setSearchQuery
      }), jsx("br", {}), jsxs("div", {
        className: "app-section__filters",
        children: [jsx("span", {
          className: "base-date-filter--secondary",
          children: "Filter by:"
        }), jsxs(Dropdown, {
          className: "base-dropdown__dropdown-wrapper",
          children: [jsx(DropdownTrigger, {
            children: selectedStatus
          }), jsx(DropdownContent, {
            children: status.map((status2) => jsx("div", {
              className: "base-dropdown__option",
              onClick: () => setSelectedStatus(status2),
              children: status2
            }, status2))
          })]
        })]
      }), jsxs(Button, {
        href: "/users/create-external",
        variant: "primary",
        dimension: "md",
        children: [jsx(Icon, {
          name: "plus"
        }), "Add New User"]
      })]
    }), jsx("div", {
      className: "app-section__lg-table",
      children: jsxs(Table, {
        children: [jsx(TableHead, {
          children: jsxs(TableRow, {
            children: [jsx(TableCell, {
              children: "Name"
            }), jsx(TableCell, {
              children: "Email"
            }), jsx(TableCell, {
              children: "Status"
            }), jsx(TableCell, {})]
          })
        }), jsx(TableBody, {
          children: filteredInfo.map((data) => jsxs(TableRow, {
            children: [jsx(TableCell, {
              children: data.fullname
            }), jsx(TableCell, {
              children: data.email
            }), jsx(TableCell, {
              children: jsx("span", {
                className: data.isActive ? "status-active" : "status-inactive",
                children: data.isActive ? "Active" : "Inactive"
              })
            }), jsx(TableCell, {
              children: jsx(Button, {
                variant: "outline",
                onClick: () => handleItemClick(data),
                children: "View"
              })
            })]
          }, data.id))
        })]
      })
    }), jsx(ReusableMobileTable, {
      data: filteredInfo,
      onItemClick: handleItemClick,
      getName,
      formatCreatedAt: (item) => dayjs(item == null ? void 0 : item.createdAt).format("MMM DD, YYYY"),
      getDetails: (item) => item == null ? void 0 : item.type,
      type: "Users"
    }), !filteredData.length && jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/document.svg",
        alt: "No Data"
      }), jsx("p", {
        children: "No users yet"
      })]
    }), jsxs(Modal, {
      toggle: () => toggle("user_details"),
      show: modals.user_details,
      children: [jsx(ModalHeader, {
        children: "User Details"
      }), jsxs(ModalBody, {
        children: [jsx(ModalDetail, {
          label: "Date Created:",
          children: dayjs(selectedUser == null ? void 0 : selectedUser.createdAt).format("MMM DD, YYYY • HH:mm A")
        }), jsx(ModalDetail, {
          label: "Created By:",
          children: jsxs("a", {
            href: "#",
            className: "app-link",
            children: [(_a = selectedUser == null ? void 0 : selectedUser.creator) == null ? void 0 : _a.fullname, " "]
          })
        }), jsx(ModalDetail, {
          label: "Full name:",
          children: selectedUser == null ? void 0 : selectedUser.fullname
        }), jsx(ModalDetail, {
          label: "Email Address:",
          children: selectedUser == null ? void 0 : selectedUser.email
        }), jsxs("div", {
          className: "grid-cols-2",
          children: [jsx(ModalDetail, {
            label: "User Type:",
            children: (_b = selectedUser == null ? void 0 : selectedUser.type) == null ? void 0 : _b.toUpperCase()
          }), jsx(ModalDetail, {
            label: "Status:",
            children: jsx("span", {
              className: (selectedUser == null ? void 0 : selectedUser.isActive) ? "mobile-status-active" : "mobile-status-inactive",
              children: (selectedUser == null ? void 0 : selectedUser.isActive) ? "Active" : "Inactive"
            })
          })]
        }), jsx(ModalDetail, {
          label: "Role:",
          children: (_d = (_c = selectedUser == null ? void 0 : selectedUser.role) == null ? void 0 : _c.authorities) == null ? void 0 : _d.map((role) => jsx("p", {
            children: role
          }, role))
        }), jsxs("div", {
          className: "app-modal__footer",
          children: [jsxs("button", {
            className: "app-modal__btn--yellow",
            onClick: () => handleEdit(selectedUser),
            children: [jsx(Icon, {
              name: "edit"
            }), " Edit User"]
          }), jsxs("button", {
            className: "app-modal__btn--red",
            onClick: () => startDelete(selectedUser),
            children: [jsx(Icon, {
              name: "delete"
            }), " Delete"]
          })]
        }), jsx("div", {
          className: "",
          children: isModalOpen && jsx(PopupModal, {
            icon: jsx("img", {
              src: "/svgs/delete_img.png"
            }),
            title: "Delete User",
            message: "Are you sure you want to delete this user? This action cannot be undone.",
            onClose: () => setModalOpen(false),
            primaryButton: {
              label: "Delete",
              onClick: handleDeleteRole,
              color: "#D30021"
            },
            secondaryButton: {
              label: "Cancel",
              onClick: () => setModalOpen(false),
              color: "#E86E18"
            }
          })
        })]
      })]
    })]
  });
};
function CompanyDetails({}) {
  var _a, _b, _c;
  const {
    valueID,
    setID
  } = useIDContext();
  const [company, setCompany] = useState({
    id: 0,
    name: "",
    location: {
      locationArea: "",
      site: ""
    },
    contractId: "",
    createdAt: "",
    createdBy: "",
    members: []
  });
  useEffect(() => {
    if (valueID) {
      async function getCompanyById() {
        var _a2;
        const response = await createRequest(`/profile/company/${valueID}`, "GET");
        const roleData = (_a2 = response[0]) == null ? void 0 : _a2.data;
        setCompany(roleData);
      }
      getCompanyById();
    }
  }, []);
  const companyInfo = [{
    id: 1,
    name: "Contract ID:",
    details: company == null ? void 0 : company.contractId
  }, {
    id: 2,
    name: "Date Created:",
    details: dayjs(company == null ? void 0 : company.createdAt).format("MMM DD, YYYY • HH:mm A")
  }, {
    id: 3,
    name: "Created By:",
    details: company == null ? void 0 : company.createdBy
  }, {
    id: 4,
    name: "Total Members:",
    details: (_a = company == null ? void 0 : company.members) == null ? void 0 : _a.length
  }, {
    id: 5,
    name: "Location:",
    details: `${(_b = company == null ? void 0 : company.location) == null ? void 0 : _b.locationArea}, ${(_c = company == null ? void 0 : company.location) == null ? void 0 : _c.site}`
  }];
  const navigateEditCompany = (id) => {
    setID(id);
    route("/users/edit-company");
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const handleBlockRole = async () => {
    var _a2, _b2, _c2;
    const id = valueID;
    const response = await createRequest(`/profile/company/block/${id}`, "PUT");
    if (((_a2 = response[0]) == null ? void 0 : _a2.statusCode) === 200) {
      setModalOpen(false);
      return toast({
        variant: "success",
        message: ((_b2 = response[0]) == null ? void 0 : _b2.message) ?? "Company blocked successfully."
      });
    } else {
      return toast({
        variant: "error",
        message: ((_c2 = response[0]) == null ? void 0 : _c2.message) ?? "Company block failed, please try again."
      });
    }
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "flex-between",
        children: [jsxs("div", {
          className: "app-create__header",
          children: [jsx("button", {
            onClick: () => route("/users"),
            children: jsx(Icon, {
              name: "caret-left"
            })
          }), jsxs("div", {
            children: [jsxs("h3", {
              children: [company == null ? void 0 : company.name, " "]
            }), jsx("p", {
              children: "All company members are listed below"
            })]
          })]
        }), jsxs("div", {
          className: "grid-cols-2 sm-grid-cols-2",
          children: [jsx("button", {
            className: "app-modal__btn--red",
            onClick: () => {
              setModalOpen(true);
            },
            children: "Block"
          }), jsx("button", {
            className: "app-modal__btn--yellow",
            onClick: () => {
              navigateEditCompany(company.id);
            },
            children: "Edit"
          })]
        })]
      }), jsx("div", {
        className: "company-header",
        children: companyInfo.map((info) => jsxs("div", {
          className: "container",
          children: [jsx("p", {
            children: info.name
          }), jsx("span", {
            className: `${info.name === "Created By:" ? "created" : ""}`,
            children: info.details
          })]
        }, info.id))
      }), jsx(ExternalUsers, {
        company: company == null ? void 0 : company.members
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(PopupModal, {
        icon: jsx("img", {
          src: "/svgs/delete_img.png"
        }),
        title: "Block Company",
        message: "Are you sure you want to block this company? This action cannot be undone.",
        onClose: () => setModalOpen(false),
        primaryButton: {
          label: "Block",
          onClick: handleBlockRole,
          color: "#D30021"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => setModalOpen(false),
          color: "#E86E18"
        }
      })
    })]
  });
}
function Drafts({}) {
  const {
    response,
    isLoading
  } = useRequest(getAllDrafts, {}, true);
  const {
    setID,
    valueID
  } = useIDContext();
  const {
    updateDraft,
    updateIsDraft
  } = useDraftDetails();
  useEffect$1(() => {
    updateIsDraft(false);
  }, []);
  const [dateRange, setDateRange] = useState$1({
    start: null,
    end: null
  });
  const getDraftInfo = async (id) => {
    var _a;
    const response2 = await createRequest(`/permit/draft/${id}`, "GET");
    const draft = (_a = response2[0]) == null ? void 0 : _a.data;
    updateDraft(draft);
    updateIsDraft(true);
  };
  const handleItemClick = (item) => {
    getDraftInfo(item.id);
    route("/permit/create");
  };
  const [selectedType, setSelectedType] = useState$1("All Types");
  const types = ["All Types", "HOT_WORK", "COLD_WORK"];
  const [isModalOpen, setModalOpen] = useState$1(false);
  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };
  const handleDeleteRole = async () => {
    const id = valueID;
    try {
      const response2 = await createRequest(`/permit/draft/${id}`, "DELETE");
      console.log(response2);
      toast({
        variant: "success",
        message: "Draft deleted successfully."
      });
    } catch (error) {
      toast({
        variant: "error",
        message: (response == null ? void 0 : response.error) ?? "Failed to delete draft."
      });
    }
    setModalOpen(false);
  };
  const [searchTerm, setSearchTerm] = useState$1("");
  const drafts = (response == null ? void 0 : response.data) || [];
  const filteredDrafts = drafts.filter((draft) => {
    var _a, _b;
    const workType = draft.type;
    const dateCreated = draft.createdAt;
    const locationArea = ((_b = (_a = draft == null ? void 0 : draft.location) == null ? void 0 : _a.locationArea) == null ? void 0 : _b.toLowerCase()) || "";
    const activityDate = dayjs(draft == null ? void 0 : draft.createdAt);
    const matchesSearchTerm = workType.includes(searchTerm.toLowerCase()) || dateCreated.includes(dayjs(searchTerm).format("MMM DD, YYYY • HH:mm A").toLowerCase()) || locationArea.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const matchesDateRange = (!dateRange.start || activityDate.isAfter(dayjs(dateRange.start).startOf("day"))) && (!dateRange.end || activityDate.isBefore(dayjs(dateRange.end).endOf("day")));
    const matchesType = selectedType === "All Types" || workType === selectedType;
    return matchesSearchTerm && matchesType && matchesDateRange;
  });
  const setDateRangeWrapper = (range) => {
    setDateRange({
      start: range.startDate,
      end: range.endDate
    });
  };
  const [currentPage, setCurrentPage] = useState$1(1);
  const itemsPerPage = 10;
  const sortedData = filteredDrafts.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Drafts"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search drafts",
        onSearch: setSearchTerm
      }), jsxs("div", {
        className: "app-section__filters",
        children: [jsx(DateFilter, {
          variant: "secondary",
          setDateRange: setDateRangeWrapper
        }), jsxs(Dropdown, {
          className: "base-dropdown__dropdown-wrapper",
          children: [jsx(DropdownTrigger, {
            children: selectedType
          }), jsx(DropdownContent, {
            children: types.map((type) => jsx("div", {
              className: "base-dropdown__option",
              onClick: () => setSelectedType(type),
              children: type
            }, type))
          })]
        })]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Date Created"
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Location"
              }), jsx(TableCell, {
                children: "Created By"
              }), jsx(TableCell, {}), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.map((data) => jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: dayjs(data.createdAt).format("MMM DD, YYYY • HH:mm A")
              }), jsx(TableCell, {
                children: convertSnakeCaseToTitleCase(data.type)
              }), jsx(TableCell, {
                children: data.workArea
              }), jsx(TableCell, {}), jsx(TableCell, {
                children: jsx(Button, {
                  variant: "outline",
                  onClick: () => {
                    handleItemClick(data);
                  },
                  children: "Open"
                })
              }), jsx(TableCell, {
                children: jsx(Button, {
                  onClick: () => {
                    startDelete(data);
                  },
                  children: jsx("img", {
                    src: "/svgs/delete_icon.svg",
                    alt: "Delete"
                  })
                })
              })]
            }, data.id))
          })]
        })
      }), jsx("div", {
        className: "app-section__sm-table",
        children: jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.map((dataItem) => jsxs("div", {
              className: "container",
              onClick: () => handleItemClick(dataItem),
              children: [jsx("div", {
                className: "location-flex",
                children: jsx("div", {
                  className: "items-center",
                  children: jsx("h6", {
                    className: `${dataItem.status === "Draft" ? "draft-status" : "others-status"}`,
                    children: dayjs(dataItem.createdAt).format("MMM DD, YYYY • HH:mm A")
                  })
                })
              }), jsxs("div", {
                className: "location-flex",
                children: [jsx("p", {
                  children: convertSnakeCaseToTitleCase(dataItem.type)
                }), jsx("h6", {
                  className: "gray",
                  children: dataItem.workArea
                })]
              })]
            }, dataItem.id))
          })
        })
      }), filteredDrafts.length && jsx(Pagination, {
        totalItems: filteredDrafts.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !filteredDrafts.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching drafts, please wait..." : "No drafts yet"
        })]
      }), jsx("div", {
        className: "",
        children: isModalOpen && jsx(PopupModal, {
          icon: jsx("img", {
            src: "/svgs/delete_img.png"
          }),
          title: "Delete Draft?",
          message: "Are you sure you want to delete this draft? This action cannot be undone.",
          onClose: () => setModalOpen(false),
          primaryButton: {
            label: "Delete",
            onClick: handleDeleteRole,
            color: "#D30021"
          },
          secondaryButton: {
            label: "Cancel",
            onClick: () => setModalOpen(false),
            color: "#E86E18"
          }
        })
      })]
    })]
  });
}
function CreateWork({}) {
  const siteApi = useRequest(getSites, {}, true);
  const {
    makeRequest,
    isLoading
  } = useRequest(createNewWorkArea);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue,
    values
  } = useForm({
    initialValues: {
      locationId: 0,
      workArea: []
    },
    onSubmit,
    validationSchema: validationSchema$A
  });
  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData ? siteData.map((location2) => ({
        text: location2.locationArea,
        value: location2.id
      })) : [{
        text: "No location areas found",
        value: ""
      }];
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);
  async function onSubmit(data) {
    console.log(data);
    const [_, error] = await makeRequest({
      locationId: Number(data.locationId),
      workArea: data.workArea.filter(Boolean)
    });
    if (error) {
      route("/locations");
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create work area, please try again."
      });
    } else {
      route("/locations");
      return toast({
        variant: "success",
        message: "Work area created successfully"
      });
    }
  }
  const addNewLocationField = () => {
    setFieldValue("workArea", [...values.workArea, ""]);
  };
  const handleLocationChange = (index, value) => {
    const updatedWorkArea = [...values.workArea];
    updatedWorkArea[index] = value;
    setFieldValue("workArea", updatedWorkArea);
  };
  const removeLocationField = (index) => {
    const updatedWorkArea = values.workArea.filter((_, i2) => i2 !== index);
    setFieldValue("workArea", updatedWorkArea);
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Locations"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/locations"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Add new work area"
          }), jsx("p", {
            children: "Fill the fields below to add a new location"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Site Title"
          }), jsx(Select, {
            placeholder: siteName,
            options: siteOptions,
            ...getFieldProps("siteName"),
            onChange: (e) => setSiteName(e.target.value)
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Location Area"
          }), jsx(Select, {
            placeholder: "--select location--",
            options: locationOptions,
            ...getFieldProps("locationId"),
            required: true
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Work Area"
          }), values.workArea.map((location2, index) => jsx("div", {
            className: "location-fields",
            children: jsx(Input, {
              placeholder: "Enter Work Area",
              value: location2,
              ...getFieldProps(`workArea[${index}]`),
              onChange: (e) => handleLocationChange(index, e.target.value),
              button: jsx("img", {
                src: "/svgs/delete_icon.svg",
                alt: "Delete",
                onClick: () => removeLocationField(index)
              })
            })
          }, index)), jsxs("div", {
            className: "app-create__edit-location",
            style: {
              cursor: "pointer"
            },
            onClick: addNewLocationField,
            children: [jsx("img", {
              src: "/svgs/location-add.svg",
              width: 16,
              height: 16,
              style: {
                marginRight: 8
              }
            }), jsx("span", {
              children: "Add Work Area"
            })]
          }), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Submit"
          })]
        })
      })]
    })]
  });
}
const validationSchema$A = Yup.object({
  locationId: Yup.string().required("Location is required"),
  workArea: Yup.array().of(Yup.string().trim().required("Work area is required").min(2, "Please enter a valid work area")).min(1, "At least one work area is required")
});
function EditRole({}) {
  const {
    valueID
  } = useIDContext();
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [roleResponseState, setRoleResponseState] = useState(null);
  useEffect(() => {
    async function getRoleByID() {
      const roleResponse = await createRequest(`/role/${valueID}`, "GET");
      const roleData = roleResponse[0].data;
      setRoleResponseState(roleData);
      setRoleName(roleData == null ? void 0 : roleData.name);
      setPermissions((roleData == null ? void 0 : roleData.permissions) || []);
    }
    getRoleByID();
  }, [valueID]);
  const {
    makeRequest,
    isLoading
  } = useRequest(editRole);
  const {
    getFieldProps,
    values,
    setFieldValue,
    handleSubmit
  } = useForm({
    initialValues: {
      roleId: valueID,
      name: "",
      permissions: [],
      authorities: []
    },
    validationSchema: validationSchema$z,
    onSubmit
  });
  useEffect(() => {
    if (roleResponseState) {
      setFieldValue("name", roleResponseState.name);
      setFieldValue("permissions", roleResponseState.permissions);
      setFieldValue("authorities", roleResponseState.authorities);
    }
  }, [roleResponseState, permissions]);
  function togglePermission(value, isChecked) {
    const updatedPermissions = isChecked ? [...values.permissions, value] : values.permissions.filter((p2) => p2 !== value);
    setFieldValue("permissions", updatedPermissions);
  }
  function toggleAuthorities(value, isChecked) {
    const updatedAuthorities = isChecked ? [...values.authorities, value] : values.authorities.filter((p2) => p2 !== value);
    setFieldValue("authorities", updatedAuthorities);
  }
  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      roleId: valueID,
      name: roleName,
      permissions: data.permissions,
      authorities: data.authorities
    });
    if (err) {
      toast({
        variant: "error",
        message: (err == null ? void 0 : err.message) || "Failed to update role, please try again"
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Role updated successfully"
      });
    }
    route("/roles");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Roles & Permissions"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/roles"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Edit role"
          }), jsx("p", {
            children: "Fill the fields below to edit a role"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Role Title"
          }), jsx(Input, {
            placeholder: roleName,
            ...getFieldProps("name")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Update Permissions"
          }), jsx("div", {
            className: "app-create__form__group",
            children: PERMISSIONS.map(({
              label,
              value
            }, i2) => jsxs("label", {
              className: "base-checkbox-label",
              children: [jsx(Checkbox, {
                checked: values.permissions.includes(value) || ((roleResponseState == null ? void 0 : roleResponseState.permissions) || []).includes(value),
                onChange: (isChecked) => togglePermission(value, isChecked)
              }), jsx("span", {
                children: label
              })]
            }, i2))
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Update Authorities"
          }), jsx("div", {
            className: "app-create__form__group",
            children: AUTHORITIES.map(({
              label,
              value
            }, i2) => jsxs("label", {
              className: "base-checkbox-label",
              children: [jsx(Checkbox, {
                checked: values.authorities.includes(value) || ((roleResponseState == null ? void 0 : roleResponseState.authorities) || []).includes(value),
                onChange: (isChecked) => toggleAuthorities(value, isChecked)
              }), jsx("span", {
                children: label
              })]
            }, i2))
          }), jsx(Button, {
            type: "submit",
            variant: "primary",
            isLoading,
            children: "Edit Role"
          })]
        })
      })]
    })]
  });
}
const validationSchema$z = Yup.object().shape({
  // name: Yup.string().required("Role name is required"),
  permissions: Yup.array().of(Yup.string())
});
function Workflows({}) {
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];
  const [userRoles, setUserRoles] = useState([]);
  const [canCreatePermit, setCanCreatePermit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = ["All Status", "NOT_STARTED", "APPROVED", "REVALIDATION_INITIATED", "CANCELED", "CLOSED", "SUSPENDED", "CLOSURE_INITIATED"];
  const {
    setID
  } = useIDContext();
  const {
    profile
  } = useUserContext();
  const roleActions = {
    checkRole: (roleArray) => {
      if (roleArray.includes("PERFORMING")) {
        setCanCreatePermit(true);
      }
    }
  };
  useEffect(() => {
    async function getUserProfile() {
      var _a, _b, _c;
      const userResponse = await createRequest(`/profile/${profile == null ? void 0 : profile.id}`, "GET");
      setUserRoles((_c = (_b = (_a = userResponse[0]) == null ? void 0 : _a.data) == null ? void 0 : _b.role) == null ? void 0 : _c.authorities);
      console.log(userRoles);
      roleActions.checkRole(userRoles);
    }
    getUserProfile();
  }, [profile]);
  const {
    response,
    isLoading
  } = useRequest(getAllPermits, {}, true);
  const handleItemClick = (item) => {
    setID(item.id);
    route("/permit-management");
  };
  const truncateText = (text, maxLength) => {
    if (!text)
      return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const workflows = (response == null ? void 0 : response.data) || [];
  const filteredWorkflows = workflows.filter((permit) => {
    var _a, _b;
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = ((_a = permit.workArea) == null ? void 0 : _a.toLowerCase()) || "";
    const entrustedCompany = ((_b = permit.entrustedCompany) == null ? void 0 : _b.name.toLowerCase()) || "";
    const status = permit.status;
    return (ptwID.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase()) || workArea.includes(searchTerm.toLowerCase()) || entrustedCompany.includes(searchTerm.toLowerCase()) || searchTerm === "") && (selectedWorkType === "All Work Types" || type === selectedWorkType) && (selectedStatus === "All Status" || status === selectedStatus);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredWorkflows.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Workflow"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search permits by company, work area, permit type, or permit ID",
        onSearch: setSearchTerm
      }), jsx("br", {}), jsxs("div", {
        className: "app-section__filters ",
        children: [jsx("span", {
          className: "base-date-filter--secondary",
          children: "Filter by:"
        }), jsxs("div", {
          className: "sm-grid-cols-2 app-section__filters",
          children: [jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedStatus
            }), jsx(DropdownContent, {
              children: statusOptions.map((option) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedStatus(option),
                children: option
              }, option))
            })]
          }), jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedWorkType
            }), jsx(DropdownContent, {
              children: work_types.map((type) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedWorkType(type),
                children: type
              }, type))
            })]
          })]
        })]
      }), canCreatePermit && jsxs(Button, {
        href: "/permit/create",
        variant: "primary",
        dimension: "md",
        children: [jsx(Icon, {
          name: "plus"
        }), "Create New Permit"]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "PTW ID."
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Work To Be Performed"
              }), jsx(TableCell, {
                children: "Work Location"
              }), jsx(TableCell, {
                children: "Company"
              }), jsx(TableCell, {
                children: "Status / Authority"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.map((data) => {
              var _a, _b;
              return jsxs(Fragment$1, {
                children: [jsxs(TableRow, {
                  children: [jsx(TableCell, {
                    children: data.publicId
                  }), jsx(TableCell, {
                    children: convertSnakeCaseToTitleCase(data.type)
                  }), jsx(TableCell, {
                    children: truncateText(data.workDescription, 45)
                  }), jsx(TableCell, {
                    children: jsxs("span", {
                      children: [data.workArea, " / ", (_a = data.location) == null ? void 0 : _a.locationArea]
                    })
                  }), jsx(TableCell, {
                    children: (_b = data.entrustedCompany) == null ? void 0 : _b.name
                  }), jsx(TableCell, {
                    children: jsxs("h6", {
                      className: `${data.status === "Draft" ? "draft-status" : "others-status"}`,
                      children: [data.status, " / ", data.currentAuthority]
                    })
                  }), jsx(TableCell, {
                    children: jsx(Button, {
                      onClick: () => handleItemClick(data),
                      children: "View"
                    })
                  })]
                }, data.id), jsx("br", {})]
              });
            })
          })]
        })
      }), jsx("div", {
        className: "app-section__sm-table",
        children: jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.map((dataItem) => jsxs("div", {
              className: "container",
              onClick: () => handleItemClick(dataItem),
              children: [jsxs("div", {
                className: "location-flex",
                children: [jsx("p", {
                  children: dataItem.publicId
                }), jsx("h6", {
                  className: "gray",
                  children: convertSnakeCaseToTitleCase(dataItem.type)
                })]
              }), jsx("p", {
                children: truncateText(dataItem.workDescription, 45)
              }), jsx("div", {
                className: "location-flex",
                children: jsxs("div", {
                  className: "items-center",
                  children: [jsx("p", {
                    className: "gray",
                    children: "Status / Authority:"
                  }), jsxs("h6", {
                    className: `${dataItem.status === "Draft" ? "draft-status" : "others-status"}`,
                    children: [dataItem.status, " / ", dataItem.currentAuthority]
                  })]
                })
              })]
            }, dataItem.id))
          })
        })
      }), filteredWorkflows.length && jsx(Pagination, {
        totalItems: filteredWorkflows.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !filteredWorkflows.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
        })]
      })]
    })]
  });
}
function SuspendPermit({
  setModalOpen
}) {
  const {
    permit
  } = usePermitDetails();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$y,
    initialValues: {
      permitId: 0,
      reason: ""
    },
    onSubmit
  });
  const {
    makeRequest,
    isLoading
  } = useRequest(suspendPermit);
  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: permit == null ? void 0 : permit.id,
      reason: data.reason
    });
    if (err) {
      toast({
        variant: "error",
        message: (err == null ? void 0 : err.message) || "Failed to suspend permit, please try again"
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit suspended successfully"
      });
      route("/permit-activities");
    }
  }
  return jsx(Fragment$1, {
    children: jsx("div", {
      className: "popup-overlay",
      children: jsxs("div", {
        className: "popup-modal",
        children: [jsxs("div", {
          className: "grid-cols-2",
          children: [jsx("h3", {
            children: "Suspend Permit"
          }), jsx("button", {
            className: "close-button",
            onClick: setModalOpen,
            children: "×"
          })]
        }), jsx("br", {}), jsx("div", {
          className: "popup-content",
          children: jsx("div", {
            className: "",
            children: jsxs("form", {
              onSubmit: handleSubmit,
              children: [jsx("h5", {
                children: "Kindly state the reason for suspending this permit below"
              }), jsx("br", {}), jsx(Textarea, {
                label: "",
                placeholder: "Write reason here...",
                ...getFieldProps("reason")
              }), jsx(Button, {
                type: "submit",
                variant: "primary",
                isLoading,
                children: "Submit"
              })]
            })
          })
        })]
      })
    })
  });
}
const validationSchema$y = Yup.object({});
function CancelPermit({
  setModalOpen
}) {
  const {
    permit
  } = usePermitDetails();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$x,
    initialValues: {
      permitId: 0,
      reason: ""
    },
    onSubmit
  });
  const {
    makeRequest,
    isLoading
  } = useRequest(cancelPermit);
  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: permit == null ? void 0 : permit.id,
      reason: data.reason
    });
    if (err) {
      toast({
        variant: "error",
        message: (err == null ? void 0 : err.message) || "Failed to cancel permit, please try again"
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit cancelled succesfully"
      });
      route("/permit-activities");
    }
  }
  return jsx(Fragment$1, {
    children: jsx("div", {
      className: "popup-overlay",
      children: jsxs("div", {
        className: "popup-modal",
        children: [jsxs("div", {
          className: "grid-cols-2",
          children: [jsx("h3", {
            children: "Cancel Permit"
          }), jsx("button", {
            className: "close-button",
            onClick: setModalOpen,
            children: "×"
          })]
        }), jsx("br", {}), jsx("div", {
          className: "popup-content",
          children: jsx("div", {
            className: "",
            children: jsxs("form", {
              onSubmit: handleSubmit,
              children: [jsx("h5", {
                children: "Kindly state the reason for cancelling this permit below"
              }), jsx("br", {}), jsx(Textarea, {
                label: "",
                placeholder: "Write reason here...",
                ...getFieldProps("reason")
              }), jsx(Button, {
                type: "submit",
                variant: "primary",
                isLoading,
                children: "Submit"
              })]
            })
          })
        })]
      })
    })
  });
}
const validationSchema$x = Yup.object({
  reason: Yup.string().required("Reason for sending back permit is required").trim().min(2, "Please enter a valid reason")
});
function RenderButtonsOnPath(path) {
  const {
    makeRequest
  } = useRequest(requestPermitClosure);
  const {
    permit
  } = usePermitDetails();
  const {
    profile
  } = useUserContext();
  const [userRole, setUserRole] = useState$1();
  useEffect$1(() => {
    async function getPermitDetails() {
      var _a;
      const permitResponse = await createRequest(`/permit/${permit == null ? void 0 : permit.id}`, "GET");
      const permitData = permitResponse[0].data;
      const userRole2 = (_a = permitData == null ? void 0 : permitData.permitRoles) == null ? void 0 : _a[profile == null ? void 0 : profile.id];
      console.log(userRole2);
      setUserRole(userRole2);
    }
    getPermitDetails();
  }, [permit, profile == null ? void 0 : profile.id]);
  const [deletePopUp, setDeletePopUp] = useState$1(false);
  const [closurePopup, setClosurePopup] = useState$1(false);
  const [suspendPopup, setSuspendPopup] = useState$1(false);
  const handleSuspendPopup = (value) => {
    setSuspendPopup(value);
  };
  const [isCancelPopup, setIsCancelPopup] = useState$1(false);
  const handleCancelPopup = (value) => {
    setIsCancelPopup(value);
  };
  const handleClosurePopup = (value) => {
    setClosurePopup(value);
  };
  const handleDeletePopUp = (value) => {
    setDeletePopUp(value);
  };
  const handleDeletePermit = async () => {
    var _a;
    const id = permit == null ? void 0 : permit.id;
    try {
      const response = await createRequest(`/permit/draft/${id}`, "DELETE");
      console.log(response);
      toast({
        variant: "success",
        message: "Permit deleted successfully."
      });
    } catch (error) {
      toast({
        variant: "error",
        message: ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.error) ?? "Failed to delete permit."
      });
    }
    setDeletePopUp(false);
  };
  async function closureRequest(id) {
    const [_, err] = await makeRequest(id);
    if (err) {
      return toast({
        variant: "error",
        message: err.message
      });
    } else {
      toast({
        variant: "success",
        message: "Permit closure initiated successfully"
      });
    }
    setClosurePopup(false);
    route("/permit-management");
  }
  const formatTitle = (key) => {
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").replace(/^[a-z]/, (char) => char.toUpperCase());
  };
  const handlePrint = () => {
    const printContent = document.getElementById("permit-details-print");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<html>
        <head>
          <title>Permit Details</title>
          <style>
            body { font-family: Helvetica, sans-serif; margin: 20px; }
            .header {display: flex; justify-content: space-between; align-items: center; text-align: center; margin-bottom: 20px; }
            .header img { max-width: 100px; margin-right: 20px;}
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .item { padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            .sub-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; }
            .small-text {font-size: 12px}
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/svgs/logo.sidebar.svg" alt="Logo" />
            <h3>Permit Details</h3>
          </div>
          <div class="details">
            ${printContent.innerHTML}
          </div>
          <div class="footer">Printed on: ${(/* @__PURE__ */ new Date()).toLocaleString()}</div>
        </body>
      </html>`);
    printWindow.document.close();
    printWindow.print();
  };
  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.length > 0 ? value.map((item, index) => jsx("div", {
          children: renderValue(item)
        }, index)) : "N/A";
      }
      return jsx("div", {
        children: Object.entries(value).filter(([key]) => key.toLowerCase() !== "permitDocuments").map(([key, val]) => jsxs("div", {
          className: "sub-grid",
          children: [jsxs("h5", {
            children: [formatTitle(key), ":"]
          }), jsx("p", {
            className: "small-text",
            children: renderValue(val)
          })]
        }, key))
      });
    }
    return value !== null ? value.toString() : "N/A";
  };
  const permitEntries = Object.entries(permit || {}).filter(([key]) => !["id", "locationId", "cancellationInitiatorId, updatedAt, permitDocuments, firefightingPrecautions"].includes(key));
  function renderItems() {
    switch (path) {
      case "/monitoring-details":
        return jsx(Fragment$1, {
          children: jsxs("div", {
            className: "actions",
            children: [jsxs("div", {
              className: "print",
              children: [jsxs("div", {
                children: [jsx("h4", {
                  children: "Print"
                }), jsx("p", {
                  children: "Click the button to get a hardcopy version of this permit"
                })]
              }), jsx("button", {
                className: "flex-center",
                onClick: handlePrint,
                children: "Print Permit"
              }), jsx("div", {
                id: "permit-details-print",
                style: {
                  display: "none"
                },
                children: permitEntries.map(([key, value]) => jsxs("div", {
                  className: "item",
                  children: [jsxs("h4", {
                    children: [formatTitle(key), ":"]
                  }), jsx("p", {
                    children: renderValue(value)
                  })]
                }, key))
              })]
            }), userRole === "PERFORMING_SUPERVISOR" && jsxs("div", {
              className: "closure",
              children: [jsxs("div", {
                children: [jsx("h4", {
                  children: "Request for closure"
                }), jsx("p", {
                  children: "Click the button to process closure of this permit"
                })]
              }), jsxs("button", {
                className: "flex-center",
                onClick: () => handleClosurePopup(true),
                children: [jsx(Icon, {
                  name: "export"
                }), "Request Closure", " "]
              })]
            }), (userRole === "ISSUING" || userRole === "AUTHORIZING" || userRole === "ISSUING_SUPERVISOR") && jsxs("div", {
              className: "double",
              children: [jsxs("div", {
                className: "suspension",
                children: [jsxs("div", {
                  children: [jsx("h4", {
                    children: "Suspend Permit"
                  }), jsxs("p", {
                    children: [" ", "Click the button below to process suspension of this permit."]
                  })]
                }), jsx("br", {}), jsx("button", {
                  className: "flex-center",
                  onClick: () => handleSuspendPopup(true),
                  children: "Suspend Permit"
                })]
              }), jsxs("div", {
                className: "cancel",
                children: [jsxs("div", {
                  children: [jsx("h4", {
                    children: "Permit Cancellation"
                  }), jsxs("p", {
                    children: [" ", "Click the button below to process cancel this permit."]
                  })]
                }), jsx("br", {}), jsx("button", {
                  className: "flex-center",
                  onClick: () => handleCancelPopup(true),
                  children: "Cancel Permit"
                })]
              })]
            })]
          })
        });
      case "/permit-management":
        return jsx(Fragment$1, {
          children: jsxs("div", {
            className: "actions",
            children: [jsxs("div", {
              className: "print",
              children: [jsxs("div", {
                children: [jsx("h4", {
                  children: "Print"
                }), jsx("p", {
                  children: "Click the button to get a hardcopy version of this permit"
                })]
              }), jsx("button", {
                className: "flex-center",
                onClick: handlePrint,
                children: "Print Permit"
              }), jsx("div", {
                id: "permit-details-print",
                style: {
                  display: "none"
                },
                children: permitEntries.map(([key, value]) => jsxs("div", {
                  className: "item",
                  children: [jsxs("h4", {
                    children: [formatTitle(key), ":"]
                  }), jsx("p", {
                    children: renderValue(value)
                  })]
                }, key))
              })]
            }), (permit == null ? void 0 : permit.authorizingAuthorityStatus) !== "APPROVED" && userRole === "PERFORMING" && jsxs("div", {
              className: "delete",
              children: [jsxs("div", {
                children: [jsx("h4", {
                  children: "Delete"
                }), jsx("p", {
                  children: "Click the button to delete this permit"
                })]
              }), jsxs("button", {
                className: "flex-center",
                onClick: () => handleDeletePopUp(true),
                children: [jsx(Icon, {
                  name: "delete"
                }), "Delete Permit"]
              })]
            })]
          })
        });
    }
  }
  return jsxs(Fragment$1, {
    children: [renderItems(), jsx("div", {
      className: "",
      children: deletePopUp && jsx(PopupModal, {
        icon: jsx("img", {
          src: "/svgs/delete_img.png"
        }),
        title: "Delete Permit",
        message: `Are you sure you want to delete this permit (ID: ${permit == null ? void 0 : permit.publicId})? This action cannot be undone.`,
        onClose: () => setDeletePopUp(false),
        primaryButton: {
          label: "Delete",
          onClick: handleDeletePermit,
          color: "#D30021"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => handleDeletePopUp(false),
          color: "#E86E18"
        }
      })
    }), jsx("div", {
      className: "",
      children: suspendPopup && jsx(SuspendPermit, {
        setModalOpen: () => handleSuspendPopup(false)
      })
    }), jsx("div", {
      className: "",
      children: closurePopup && jsx(PopupModal, {
        icon: jsx("img", {
          src: ""
        }),
        title: "Request Closure of Permit",
        message: "",
        onClose: () => setClosurePopup(false),
        primaryButton: {
          label: "Request Closure",
          onClick: () => closureRequest(permit == null ? void 0 : permit.id),
          color: "#371071"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => handleClosurePopup(false),
          color: "#E86E18"
        }
      })
    }), jsx("div", {
      className: "",
      children: isCancelPopup && jsx(CancelPermit, {
        setModalOpen: () => handleCancelPopup(false)
      })
    })]
  });
}
function PerformingAuthorities({
  response
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const details = response;
  console.log(details);
  const hazardsArray = (details == null ? void 0 : details.permitHazards) && details.permitHazards.length > 0 ? details.permitHazards[0].hazard : null;
  console.log(hazardsArray);
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[0] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const type = convertSnakeCaseToTitleCase((details == null ? void 0 : details.type) ?? "");
  const status = convertSnakeCaseToTitleCase(details == null ? void 0 : details.status);
  const items = [{
    section: "A",
    header: "Work Type",
    content: [{
      id: 1,
      title: "Permit Type",
      info: type || ""
    }, {
      id: 2,
      title: "Permit ID",
      info: (details == null ? void 0 : details.publicId) || ""
    }, {
      id: 3,
      title: "Status / Authority",
      info: `${status} / ${details == null ? void 0 : details.currentAuthority}` || ""
    }]
  }, {
    section: "B",
    header: "Permit Details",
    content: [{
      id: 1,
      title: "Role",
      info: details == null ? void 0 : details.performerRole
    }, {
      id: 2,
      title: "Performing Person / Person In Charge",
      info: details == null ? void 0 : details.performingPersonInCharge
    }, {
      id: 3,
      title: "Work Details",
      info: details == null ? void 0 : details.workDescription
    }, {
      id: 4,
      title: "Equipment / Tools / Materials",
      info: details == null ? void 0 : details.equipmentToolsMaterials
    }, {
      id: 5,
      title: "Work Location / Work Area",
      info: `${(_a = details == null ? void 0 : details.location) == null ? void 0 : _a.locationArea} / ${details == null ? void 0 : details.workArea}`
    }, {
      id: 6,
      title: "Permit Valid From - To (Date & Time)",
      info: `${dayjs(details == null ? void 0 : details.fromDate).format("dddd, MMM D YYYY")} /  ${dayjs(details == null ? void 0 : details.fromTime).format("hh:mm A")} - ${dayjs(details == null ? void 0 : details.toDate).format("dddd, MMM D YYYY")}  / ${dayjs(details == null ? void 0 : details.toTime).format("hh:mm A")}`
    }]
  }, {
    section: "C",
    header: "Company Details",
    content: [{
      id: 1,
      title: "Entrusted Company",
      info: (_b = details == null ? void 0 : details.entrustedCompany) == null ? void 0 : _b.name
    }, {
      id: 2,
      title: "Executing Company",
      info: (_c = details == null ? void 0 : details.executingCompany) == null ? void 0 : _c.name
    }, {
      id: 3,
      title: "Performing Department",
      info: details == null ? void 0 : details.performingDepartment
    }, {
      id: 4,
      title: "Contact Phone Number",
      info: details == null ? void 0 : details.contractorPhoneNumber
    }]
  }, {
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: ((_d = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _d.potentialHazardDescription) || ""
    }]
  }];
  const documents = [{
    section: "E",
    header: "Document Uploads",
    content: []
  }];
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: ((_e = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _e.potentialHazardDescription) || ""
    }]
  }];
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);
    return documentEntries.filter(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return false;
      }
      if ((key.includes("Type") || key.includes("Doc")) && !value) {
        return false;
      }
      if (value === null) {
        return false;
      }
      return true;
    }).map(([key, value]) => {
      if (key.includes("Type")) {
        return jsxs("div", {
          className: "document-item",
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: key.replace(/([A-Z])/g, " $1").toUpperCase()
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsx("p", {
              children: (value == null ? void 0 : value.toString()) || "No document provided"
            })]
          })]
        }, key);
      }
      return jsx("div", {
        className: "document-item",
        children: jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "document",
            children: jsx("span", {
              children: "Document"
            })
          }), jsxs("p", {
            className: "document_item",
            children: [extractFileName(value), jsx("span", {
              children: jsx("img", {
                src: "/svgs/document_download.svg",
                alt: "Download document"
              })
            })]
          })]
        })
      }, key);
    });
  };
  const currentPath = window.location.pathname;
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), items.map((item) => jsx(Section, {
      type: "Primary",
      header: item.header,
      children: item.content,
      section: item.section
    })), jsx(Section, {
      type: "Primary",
      header: "HAZARD IDENTIFICATION",
      children: hazards[0],
      section: hazards[0].section
    }), jsxs("div", {
      className: "section",
      children: [jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "title",
          children: "Description of potential hazards"
        }), jsx("p", {
          children: (_f = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _f.potentialHazardDescription
        })]
      }), jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "title",
          children: "Identification of potential hazards"
        }), jsx("p", {
          className: "info",
          children: renderDisplayItems(hazardsArray)
        })]
      })]
    }), jsx(Section, {
      type: "Secondary",
      header: "Documents",
      children: documents[0],
      section: (_g = documents[0]) == null ? void 0 : _g.section
    }), jsx("div", {
      className: "section",
      children: jsx("div", {
        className: "",
        children: jsx("p", {
          className: "info",
          children: Object.keys(documentObject).length > 0 ? renderDocuments() : jsx("p", {
            children: "No documents uploaded."
          })
        })
      })
    }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
  });
}
function IssuingAuthorities({
  response
}) {
  var _a, _b;
  const details = response;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.issuingAuthorityStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.issuingAuthorityStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  const equipment = [{
    header: "PERSONNEL PROTECTIVE EQUIPMENT",
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const firefighting = [{
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const hazardsArray = (details == null ? void 0 : details.permitHazards) && details.permitHazards.length > 0 ? details.permitHazards[1] : null;
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "",
      info: ((_a = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _a.potentialHazardDescription) || ""
    }]
  }];
  const personalProtectiveArray = (details == null ? void 0 : details.protectiveEquipments) && details.protectiveEquipments.length > 0 ? details.protectiveEquipments[0].protectiveEquipment : null;
  const firefightingEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? details.firefightingPrecautions[0].firefightingPrecaution : null;
  const mechanicalPrecautionEquipment = (details == null ? void 0 : details.mechanicalIsolationPrecaution) && details.mechanicalIsolationPrecaution.length > 0 ? details.mechanicalIsolationPrecaution[0].mechanicalIsolationPrecaution : null;
  const eletricalIsolationPrecaution = (details == null ? void 0 : details.electricalIsolationPrecaution) && details.electricalIsolationPrecaution.length > 0 ? details.electricalIsolationPrecaution[0].electricalIsolationPrecaution : null;
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[1] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    if (itemEntries.length === 0) {
      return jsx("p", {
        children: "--- No items uploaded ---"
      });
    }
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key)) || jsx("p", {
      children: "No item found"
    });
  };
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);
    return documentEntries.filter(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return false;
      }
      if ((key.includes("Type") || key.includes("Doc")) && !value) {
        return false;
      }
      if (value === null) {
        return false;
      }
      return true;
    }).map(([key, value]) => {
      if (key.includes("Type")) {
        return jsxs("div", {
          className: "document-item",
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: key.replace(/([A-Z])/g, " $1").toUpperCase()
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsx("p", {
              children: (value == null ? void 0 : value.toString()) || "No document provided"
            })]
          })]
        }, key);
      }
      return jsx("div", {
        className: "document-item",
        children: jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "document",
            children: jsx("span", {
              children: "Document"
            })
          }), jsxs("p", {
            className: "document_item",
            children: [extractFileName(value), jsx("span", {
              children: jsx("img", {
                src: "/svgs/document_download.svg",
                alt: "Download document"
              })
            })]
          })]
        })
      }, key);
    });
  };
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), approved ? jsxs(Fragment$1, {
      children: [jsx(Section, {
        type: "Primary",
        header: "HAZARD IDENTIFICATION",
        children: hazards[0],
        section: hazards[0].section
      }), jsxs("div", {
        className: "section",
        children: [jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Description of potential hazards"
          }), jsx("p", {
            children: (_b = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _b.potentialHazardDescription
          })]
        }), jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Identification of potential hazards"
          }), jsx("p", {
            className: "info",
            children: renderDisplayItems(hazardsArray.hazard)
          })]
        })]
      }), jsx(Section, {
        type: "List",
        header: "PERSONNEL PROTECTIVE EQUIPMENT",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(personalProtectiveArray)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "FIREFIGHTING PRECAUTION",
        children: firefighting[0],
        section: firefighting[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(firefightingEquipment)
          })
        })
      }), jsx(Section, {
        type: "Permits",
        header: "COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments() : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "MECHANICAL ISOLATION (MEASURES ON EQUIPMENT / LINES)",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(mechanicalPrecautionEquipment)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "ELECTRICAL ISOLATION",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(eletricalIsolationPrecaution)
          })
        })
      }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })]
  });
}
function HSEAuthority({
  response
}) {
  var _a, _b, _c, _d, _e, _f;
  const details = response;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.hseAuthorityStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.hseAuthorityStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  console.log(details);
  const equipment = [{
    header: "PERSONNEL PROTECTIVE EQUIPMENT",
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const firefighting = [{
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const hazardsArray = (details == null ? void 0 : details.permitHazards) && details.permitHazards.length > 0 ? details.permitHazards[2] : null;
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: ((_a = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _a.potentialHazardDescription) || ""
    }]
  }];
  const personalProtectiveArray = (details == null ? void 0 : details.protectiveEquipments) && details.protectiveEquipments.length > 0 ? (_b = details.protectiveEquipments[1]) == null ? void 0 : _b.protectiveEquipment : null;
  const firefightingEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? (_c = details.firefightingPrecautions[1]) == null ? void 0 : _c.firefightingPrecaution : null;
  const mechanicalPrecautionEquipment = (details == null ? void 0 : details.mechanicalIsolationPrecaution) && details.mechanicalIsolationPrecaution.length > 0 ? (_d = details.mechanicalIsolationPrecaution[1]) == null ? void 0 : _d.mechanicalIsolationPrecaution : null;
  const eletricalIsolationPrecaution = (details == null ? void 0 : details.eletricalIsolationPrecaution) && details.eletricalIsolationPrecaution.length > 0 ? (_e = details.eletricalIsolationPrecaution[1]) == null ? void 0 : _e.eletricalIsolationPrecaution : null;
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[2] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    if (itemEntries.length === 0) {
      return jsx("p", {
        children: "--- No items uploaded ---"
      });
    }
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key)) || jsx("p", {
      children: "No item found"
    });
  };
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);
    return documentEntries.filter(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return false;
      }
      if ((key.includes("Type") || key.includes("Doc")) && !value) {
        return false;
      }
      if (value === null) {
        return false;
      }
      return true;
    }).map(([key, value]) => {
      if (key.includes("Type")) {
        return jsxs("div", {
          className: "document-item",
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: key.replace(/([A-Z])/g, " $1").toUpperCase()
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsx("p", {
              children: (value == null ? void 0 : value.toString()) || "No document provided"
            })]
          })]
        }, key);
      }
      return jsx("div", {
        className: "document-item",
        children: jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "document",
            children: jsx("span", {
              children: "Document"
            })
          }), jsxs("p", {
            className: "document_item",
            children: [extractFileName(value), jsx("span", {
              children: jsx("img", {
                src: "/svgs/document_download.svg",
                alt: "Download document"
              })
            })]
          })]
        })
      }, key);
    });
  };
  return jsx("div", {
    className: "app-permit__sections",
    children: approved ? jsxs(Fragment$1, {
      children: [" ", jsx("br", {}), jsx(Section, {
        type: "Primary",
        header: "HAZARD IDENTIFICATION",
        children: hazards[0],
        section: hazards[0].section
      }), jsxs("div", {
        className: "section",
        children: [jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Description of potential hazards"
          }), jsx("p", {
            children: (_f = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _f.potentialHazardDescription
          })]
        }), jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Identification of potential hazards"
          }), jsx("p", {
            className: "info",
            children: renderDisplayItems(hazardsArray.hazard)
          })]
        })]
      }), jsx(Section, {
        type: "List",
        header: "PERSONNEL PROTECTIVE EQUIPMENT",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(personalProtectiveArray)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "FIREFIGHTING PRECAUTION",
        children: firefighting[0],
        section: firefighting[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(firefightingEquipment)
          })
        })
      }), jsx(Section, {
        type: "Permits",
        header: "COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments() : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "MECHANICAL ISOLATION (MEASURES ON EQUIPMENT / LINES)",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(mechanicalPrecautionEquipment)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "ELECTRICAL ISOLATION",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(eletricalIsolationPrecaution)
          })
        })
      }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })
  });
}
function AuthAuthority({
  response
}) {
  var _a, _b, _c, _d, _e, _f;
  const details = response;
  const timeAdjustment = details == null ? void 0 : details.authorizingAuthorityTimeAdjustment;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.authorizingAuthorityStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.authorizingAuthorityStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  const equipment = [{
    header: "PERSONNEL PROTECTIVE EQUIPMENT",
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const firefighting = [{
    second_title: "Identification of potential hazards",
    section: "",
    content: []
  }];
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const hazardsArray = (details == null ? void 0 : details.permitHazards) && details.permitHazards.length > 0 ? details.permitHazards[3] : null;
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: ((_a = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _a.potentialHazardDescription) || ""
    }]
  }];
  const personalProtectiveArray = (details == null ? void 0 : details.protectiveEquipments) && details.protectiveEquipments.length > 0 ? (_b = details.protectiveEquipments[2]) == null ? void 0 : _b.protectiveEquipment : null;
  const firefightingEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? (_c = details.firefightingPrecautions[2]) == null ? void 0 : _c.firefightingPrecaution : null;
  const mechanicalPrecautionEquipment = (details == null ? void 0 : details.mechanicalIsolationPrecaution) && details.mechanicalIsolationPrecaution.length > 0 ? (_d = details.mechanicalIsolationPrecaution[2]) == null ? void 0 : _d.mechanicalIsolationPrecaution : null;
  const eletricalIsolationPrecaution = (details == null ? void 0 : details.eletricalIsolationPrecaution) && details.eletricalIsolationPrecaution.length > 0 ? (_e = details.eletricalIsolationPrecaution[2]) == null ? void 0 : _e.eletricalIsolationPrecaution : null;
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[3] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    if (itemEntries.length === 0) {
      return jsx("p", {
        children: "--- No items uploaded ---"
      });
    }
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key)) || jsx("p", {
      children: "No item found"
    });
  };
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);
    return documentEntries.filter(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return false;
      }
      if ((key.includes("Type") || key.includes("Doc")) && !value) {
        return false;
      }
      if (value === null) {
        return false;
      }
      return true;
    }).map(([key, value]) => {
      if (key.includes("Type")) {
        return jsxs("div", {
          className: "document-item",
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: key.replace(/([A-Z])/g, " $1").toUpperCase()
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsx("p", {
              children: (value == null ? void 0 : value.toString()) || "No document provided"
            })]
          })]
        }, key);
      }
      return jsx("div", {
        className: "document-item",
        children: jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "document",
            children: jsx("span", {
              children: "Document"
            })
          }), jsxs("p", {
            className: "document_item",
            children: [extractFileName(value), jsx("span", {
              children: jsx("img", {
                src: "/svgs/document_download.svg",
                alt: "Download document"
              })
            })]
          })]
        })
      }, key);
    });
  };
  const time = [{
    header: "TIME AND DATE ADJUSTMENTS",
    section: "",
    content: [{
      id: 1,
      title: "Adjusted Permit Start - End Date & Time:",
      info: timeAdjustment ? timeAdjustment : "- Time not adjusted-"
    }]
  }];
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), approved ? jsxs(Fragment$1, {
      children: [" ", jsx(Section, {
        type: "Primary",
        header: "HAZARD IDENTIFICATION",
        children: hazards[0],
        section: hazards[0].section
      }), jsxs("div", {
        className: "section",
        children: [jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Description of potential hazards"
          }), jsx("p", {
            children: (_f = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _f.potentialHazardDescription
          })]
        }), jsxs("div", {
          className: "section__content",
          children: [jsx("p", {
            className: "title",
            children: "Identification of potential hazards"
          }), jsx("p", {
            className: "info",
            children: renderDisplayItems(hazardsArray.hazard)
          })]
        })]
      }), jsx(Section, {
        type: "List",
        header: "PERSONNEL PROTECTIVE EQUIPMENT",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(personalProtectiveArray)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "FIREFIGHTING PRECAUTION",
        children: firefighting[0],
        section: firefighting[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(firefightingEquipment)
          })
        })
      }), jsx(Section, {
        type: "Permits",
        header: "COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments() : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "MECHANICAL ISOLATION (MEASURES ON EQUIPMENT / LINES)",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(mechanicalPrecautionEquipment)
          })
        })
      }), jsx(Section, {
        type: "List",
        header: "ELECTRICAL ISOLATION",
        children: equipment[0],
        section: equipment[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "section__content",
          children: jsx("p", {
            className: "info",
            children: renderDisplayItems(eletricalIsolationPrecaution)
          })
        })
      }), jsx(Section, {
        type: "Primary",
        header: "TIME AND DATE ADJUSTMENTS",
        children: time[0].content,
        section: time[0].section
      }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })]
  });
}
function IssuAuthSupervisor({
  response
}) {
  var _a;
  const details = response;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.issuingAuthoritySupervisorStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.issuingAuthoritySupervisorStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[6] : null;
  const documentObject = documentsArray || {};
  const filteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => doc.workflowType === "REVALIDATION" && doc.authority === "ISSUING_SUPERVISOR");
  const revalidationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? filteredDocuments : [];
  const closureFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => doc.workflowType === "CLOSURE" && doc.authority === "ISSUING_SUPERVISOR");
  const closureDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? closureFilteredDocuments : [];
  const cancelationFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => {
    doc.workflowType === "CANCELLATION" && doc.authority === "ISSUING_SUPERVISOR";
  });
  const cancelationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? cancelationFilteredDocuments : [];
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = (type) => {
    const documentsToRender = type === "REVALIDATION" ? revalidationDocuments : type === "CLOSURE" ? closureDocuments : type === "CANCELLATION" ? cancelationDocuments : Object.entries(documentObject);
    return documentsToRender.filter(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return false;
      }
      if ((key.includes("Type") || key.includes("Doc")) && !value) {
        return false;
      }
      if (value === null) {
        return false;
      }
      return true;
    }).map(([doc, docIndex]) => {
      const entries = Object.entries(doc.document || {});
      return jsxs("div", {
        className: "document-container",
        children: [type === "REVALIDATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "REVALIDATION" ? `PERMIT REVALIDATION -SHIFT ${doc.revalidationShift || ""}` : ""
          }), jsx("br", {})]
        }) : type === "CLOSURE" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CLOSURE" ? `PERMIT CLOSURE` : ""
          }), jsx("br", {})]
        }) : type === "CANCELLATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CANCELLATION" ? `PERMIT CANCELLATION` : ""
          }), jsx("br", {})]
        }) : null, entries.filter(([key, value]) => {
          if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
            return false;
          }
          if ((key.includes("Type") || key.includes("Doc")) && !value) {
            return false;
          }
          if (value === null) {
            return false;
          }
          return true;
        }).map(([key, value], index) => {
          if (key.includes("Type")) {
            return jsxs("div", {
              className: "document-item",
              children: [jsx("div", {
                className: "section__content__document_section",
                children: jsx("p", {
                  className: "section__header",
                  children: key.replace(/([A-Z])/g, " $1").toUpperCase()
                })
              }), jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "document",
                  children: jsx("span", {
                    children: "Upload Option"
                  })
                }), jsx("p", {
                  children: (value == null ? void 0 : value.toString()) || "No document provided"
                })]
              })]
            }, `${key}-${index}`);
          }
          return jsx("div", {
            className: "document-item",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "document",
                children: jsx("span", {
                  children: "Document"
                })
              }), jsxs("p", {
                className: "document_item",
                children: [extractFileName(value), jsx("span", {
                  children: jsx("img", {
                    src: "/svgs/document_download.svg",
                    alt: "Download document"
                  })
                })]
              })]
            })
          }, `${key}-${index}`);
        })]
      }, `doc-${docIndex}`);
    });
  };
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), approved ? jsxs(Fragment$1, {
      children: [jsx(Section, {
        type: "Permits",
        header: "DOCUMENT UPLOADS / ATTACHMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments("APPROVAL") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), jsx("br", {}), ((_a = details == null ? void 0 : details.revalidations) == null ? void 0 : _a.length) > 0 && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: revalidationDocuments.length > 0 ? renderDocuments("REVALIDATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.issuingAuthoritySupervisorClosureStatus) !== null && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: closureDocuments.length > 0 ? renderDocuments("CLOSURE") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.cancellationInitiatorId) !== null && (details == null ? void 0 : details.status) === "CANCELED" && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: cancelationDocuments.length > 0 ? renderDocuments("CANCELLATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })]
  });
}
function PerfAuthSupervisor({
  response
}) {
  var _a;
  const details = response;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.performingAuthoritySupervisorStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.performingAuthoritySupervisorStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[4] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const filteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => doc.workflowType === "REVALIDATION" && doc.authority === "PERFORMING_SUPERVISOR");
  const revalidationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? filteredDocuments : [];
  const closureFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => {
    doc.workflowType === "CLOSURE" && doc.authority === "PERFORMING_SUPERVISOR";
  });
  const closureDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? closureFilteredDocuments : [];
  const cancelationFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => {
    doc.workflowType === "CANCELLATION" && doc.authority === "PERFORMING_SUPERVISOR";
  });
  const cancelationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? cancelationFilteredDocuments : [];
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = (type) => {
    const documentsToRender = type === "REVALIDATION" ? revalidationDocuments : type === "CLOSURE" ? closureDocuments : type === "CANCELLATION" ? cancelationDocuments : [documentObject];
    console.log(documentsToRender);
    if (!documentsToRender || documentsToRender.length === 0) {
      return jsx("p", {
        children: "No documents uploaded."
      });
    }
    return documentsToRender.map((doc, docIndex) => {
      const entries = Object.entries(doc.document || {});
      return jsxs("div", {
        className: "document-container",
        children: [type === "REVALIDATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "REVALIDATION" ? `PERMIT REVALIDATION - SHIFT ${doc.revalidationShift || ""}` : ""
          }), jsx("br", {})]
        }) : type === "CLOSURE" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CLOSURE" ? `PERMIT CLOSURE` : ""
          }), jsx("br", {})]
        }) : type === "CANCELLATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CANCELLATION" ? `PERMIT CANCELLATION` : ""
          }), jsx("br", {})]
        }) : null, entries.filter(([key, value]) => {
          if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
            return false;
          }
          if ((key.includes("Type") || key.includes("Doc")) && !value) {
            return false;
          }
          if (value === null) {
            return false;
          }
          return true;
        }).map(([key, value], index) => {
          if (key.includes("Type")) {
            return jsxs("div", {
              className: "document-item",
              children: [jsx("div", {
                className: "section__content__document_section",
                children: jsx("p", {
                  className: "section__header",
                  children: key.replace(/([A-Z])/g, " $1").toUpperCase()
                })
              }), jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "document",
                  children: jsx("span", {
                    children: "Upload Option"
                  })
                }), jsx("p", {
                  children: (value == null ? void 0 : value.toString()) || "No document provided"
                })]
              })]
            }, `${key}-${index}`);
          }
          return jsx("div", {
            className: "document-item",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "document",
                children: jsx("span", {
                  children: "Document"
                })
              }), jsxs("p", {
                className: "document_item",
                children: [extractFileName(value), jsx("span", {
                  children: jsx("img", {
                    src: "/svgs/document_download.svg",
                    alt: "Download document"
                  })
                })]
              })]
            })
          }, `${key}-${index}`);
        })]
      }, `doc-${docIndex}`);
    });
  };
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), approved ? jsxs(Fragment$1, {
      children: [jsx(Section, {
        type: "Permits",
        header: "DOCUMENT UPLOADS / ATTACHMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments("APPROVAL") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), ((_a = details == null ? void 0 : details.revalidations) == null ? void 0 : _a.length) > 0 && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: revalidationDocuments.length > 0 ? renderDocuments("REVALIDATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.performingAuthoritySupervisorClosureStatus) !== null && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: closureDocuments.length > 0 ? renderDocuments("CLOSURE") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.cancellationInitiatorId) !== null && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: cancelationDocuments.length > 0 ? renderDocuments("CANCELLATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })]
  });
}
function SafetyOfficer({
  response
}) {
  var _a;
  const details = response;
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    (details == null ? void 0 : details.safetyOfficerStatus) === "APPROVED" ? setApproved(true) : (details == null ? void 0 : details.safetyOfficerStatus) === null ? setApproved(false) : setApproved(false);
  }, [details]);
  const currentPath = window.location.pathname;
  const documents = [{
    section: "",
    header: "Document Uploads",
    content: []
  }];
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[5] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const filteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => doc.workflowType === "REVALIDATION" && doc.authority === "SAFETY_OFFICER");
  const revalidationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? filteredDocuments : [];
  const closureFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => doc.workflowType === "CLOSURE" && doc.authority === "SAFETY_OFFICER");
  const closureDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? closureFilteredDocuments : [];
  const cancelationFilteredDocuments = details == null ? void 0 : details.permitDocuments.filter((doc) => {
    doc.workflowType === "CANCELLATION" && doc.authority === "SAFETY_OFFICER";
  });
  const cancelationDocuments = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? cancelationFilteredDocuments : [];
  function extractFileName(data) {
    const url = data;
    if (!url) {
      throw new Error("URL is required.");
    }
    const segments = url.split("/");
    const fileName = segments[segments.length - 1];
    const name = fileName.split("-").slice(1).join("-");
    return name;
  }
  const renderDocuments = (type) => {
    const documentsToRender = type === "REVALIDATION" ? revalidationDocuments : type === "CLOSURE" ? closureDocuments : type === "CANCELLATION" ? cancelationDocuments : [documentObject];
    console.log(documentsToRender);
    if (!documentsToRender || documentsToRender.length === 0) {
      return jsx("p", {
        children: "No documents uploaded."
      });
    }
    return documentsToRender.map((doc, docIndex) => {
      const entries = Object.entries(doc.document || {});
      return jsxs("div", {
        className: "document-container",
        children: [type === "REVALIDATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "REVALIDATION" ? `PERMIT REVALIDATION - SHIFT ${doc.revalidationShift || ""}` : ""
          }), jsx("br", {})]
        }) : type === "CLOSURE" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CLOSURE" ? `PERMIT CLOSURE` : ""
          }), jsx("br", {})]
        }) : type === "CANCELLATION" ? jsxs("div", {
          className: "",
          children: [jsx("br", {}), jsx("h3", {
            children: type === "CANCELLATION" ? `PERMIT CANCELLATION` : ""
          }), jsx("br", {})]
        }) : null, entries.filter(([key, value]) => {
          if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
            return false;
          }
          if ((key.includes("Type") || key.includes("Doc")) && !value) {
            return false;
          }
          if (value === null) {
            return false;
          }
          return true;
        }).map(([key, value], index) => {
          if (key.includes("Type")) {
            return jsxs("div", {
              className: "document-item",
              children: [jsx("div", {
                className: "section__content__document_section",
                children: jsx("p", {
                  className: "section__header",
                  children: key.replace(/([A-Z])/g, " $1").toUpperCase()
                })
              }), jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "document",
                  children: jsx("span", {
                    children: "Upload Option"
                  })
                }), jsx("p", {
                  children: (value == null ? void 0 : value.toString()) || "No document provided"
                })]
              })]
            }, `${key}-${index}`);
          }
          return jsx("div", {
            className: "document-item",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "document",
                children: jsx("span", {
                  children: "Document"
                })
              }), jsxs("p", {
                className: "document_item",
                children: [extractFileName(value), jsx("span", {
                  children: jsx("img", {
                    src: "/svgs/document_download.svg",
                    alt: "Download document"
                  })
                })]
              })]
            })
          }, `${key}-${index}`);
        })]
      }, `doc-${docIndex}`);
    });
  };
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), approved ? jsxs(Fragment$1, {
      children: [" ", jsx(Section, {
        type: "Permits",
        header: "DOCUMENT UPLOADS / ATTACHMENTS",
        children: documents[0],
        section: documents[0].section
      }), jsx("div", {
        className: "section",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "info",
            children: Object.keys(documentObject).length > 0 ? renderDocuments("APPROVAL") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })
      }), jsx("br", {}), ((_a = details == null ? void 0 : details.revalidations) == null ? void 0 : _a.length) > 0 && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: revalidationDocuments.length > 0 ? renderDocuments("REVALIDATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.issuingAuthoritySupervisorClosureStatus) !== null && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: closureDocuments.length > 0 ? renderDocuments("CLOSURE") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), (details == null ? void 0 : details.cancellationInitiatorId) !== null && (details == null ? void 0 : details.currentAuthority) === "ISSUING_SUPERVISOR" && jsxs(Fragment$1, {
        children: [jsx(Section, {
          type: "Permits",
          header: ``,
          children: documents[0],
          section: documents[0].section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "info",
            children: cancelationDocuments.length > 0 ? renderDocuments("CANCELLATION") : jsx("p", {
              children: "No documents uploaded."
            })
          })
        })]
      }), jsx("br", {}), RenderButtonsOnPath(currentPath)]
    }) : jsx(Fragment$1, {
      children: jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Approval in progress"
        })]
      })
    })]
  });
}
function WorkAuthoriesFlow({}) {
  const {
    permit
  } = usePermitDetails();
  const permitDetails = permit;
  console.log(permitDetails);
  console.log(permitDetails, "permitDetails");
  const {
    tabs,
    activeTab
  } = useTabs(["Performing Auth.", "Issuing Auth.", "HSE Auth.", "Authorizing Auth.", "Perf. Auth. Supervisor", "Safety Officer", "Issuing. Auth. Supervisor"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  return jsxs("div", {
    className: "app-authorities",
    children: [jsx(ReusableTabs, {
      tabs,
      counts,
      className: "app-authorities__tabs"
    }), jsxs("div", {
      className: "app-authorities__content",
      children: [activeTab === "Performing Auth." && jsx(PerformingAuthorities, {
        response: permitDetails
      }), activeTab === "Issuing Auth." && jsx(IssuingAuthorities, {
        response: permitDetails
      }), activeTab === "HSE Auth." && jsx(HSEAuthority, {
        response: permitDetails
      }), activeTab === "Authorizing Auth." && jsx(AuthAuthority, {
        response: permitDetails
      }), activeTab === "Safety Officer" && jsx(SafetyOfficer, {
        response: permitDetails
      }), activeTab === "Perf. Auth. Supervisor" && jsx(PerfAuthSupervisor, {
        response: permitDetails
      }), activeTab === "Issuing. Auth. Supervisor" && jsx(IssuAuthSupervisor, {
        response: permitDetails
      })]
    })]
  });
}
function PermitActionHistory() {
  const {
    permit
  } = usePermitDetails();
  console.log(permit == null ? void 0 : permit.actions);
  const actions = (permit == null ? void 0 : permit.actions) || [];
  return jsx("div", {
    children: jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Date & Time"
              }), jsx(TableCell, {
                children: "Action"
              }), jsx(TableCell, {
                children: "Authority"
              })]
            })
          }), jsx(TableBody, {
            children: actions.map((data) => jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: dayjs(data.createdAt).format("DD/MM/YYYY hh:mm A")
              }), jsx(TableCell, {
                children: data.action
              }), jsx(TableCell, {
                children: data.authority
              })]
            }, data.id))
          })]
        })
      }), jsx("div", {
        className: "app-section__sm-table",
        children: actions.map((data) => jsxs(Fragment$1, {
          children: [jsx("div", {
            className: "container-item",
            children: jsx("span", {
              children: dayjs(data.createdAt).format("DD/MM/YYYY hh:mm A")
            })
          }), jsx("p", {
            children: data.action
          }), jsxs("p", {
            children: [jsx("span", {
              children: "Authority:"
            }), " ", data.authority]
          })]
        }))
      }), jsx("div", {
        className: "",
        children: actions.length === 0 && jsx(Fragment$1, {
          children: jsxs("div", {
            className: "base-empty",
            children: [jsx("img", {
              src: "/svgs/checklist.png"
            }), jsx("p", {
              children: "No actions on this permit yet"
            })]
          })
        })
      })]
    })
  });
}
function OnsiteNotes() {
  const {
    valueID,
    setID
  } = useIDContext();
  const id = valueID;
  const {
    updatePermit
  } = usePermitDetails();
  const [permitDetails, setPermitDetails] = useState({
    status: ""
  });
  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
      updatePermit(permitData);
      setID(permitData.id);
    }
    getPermitDetails();
  }, [id]);
  const onsiteNotes = (permitDetails == null ? void 0 : permitDetails.onsiteNotes) || [];
  console.log(onsiteNotes);
  return jsx(Fragment$1, {
    children: jsx("div", {
      className: "",
      children: (onsiteNotes == null ? void 0 : onsiteNotes.length) === 0 ? jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/checklist.png"
        }), jsx("p", {
          children: "Onsite notes & comments will be active once the permit has been approved and now on-site."
        })]
      }) : jsx(Fragment$1, {
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "Date Created"
              }), jsx(TableCell, {
                children: "Notes"
              }), jsx(TableCell, {
                children: "Creator"
              }), jsx(TableCell, {
                children: "Authority"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: onsiteNotes == null ? void 0 : onsiteNotes.map((note) => jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: dayjs(note == null ? void 0 : note.createdAt).format("MM/DD/YYYY")
              }), jsx(TableCell, {
                children: note == null ? void 0 : note.content
              }), jsx(TableCell, {
                children: note == null ? void 0 : note.creator.fullname
              }), jsx(TableCell, {
                children: note == null ? void 0 : note.creatorAuthority
              })]
            }, note.id))
          })]
        })
      })
    })
  });
}
function PermitManagementDetails({}) {
  const {
    valueID
  } = useIDContext();
  const {
    updatePermit
  } = usePermitDetails();
  const id = valueID;
  useEffect(() => {
    async function getPermitById() {
      var _a;
      const response = await createRequest(`/permit/${id}`, "GET");
      const permitDetails = (_a = response[0]) == null ? void 0 : _a.data;
      console.log(permitDetails);
      updatePermit(permitDetails);
    }
    getPermitById();
  }, [id]);
  const {
    tabs,
    activeTab
  } = useTabs(["PTW Details", "Action History", "Onsite Notes & Comments"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Workflow"
    }), jsx(ReusableTabs, {
      tabs,
      counts,
      className: "app-permit__tabs"
    }), activeTab === "PTW Details" && jsx(WorkAuthoriesFlow, {}), activeTab === "Action History" && jsx(PermitActionHistory, {}), activeTab === "Onsite Notes & Comments" && jsx(OnsiteNotes, {})]
  });
}
function EditCompany({}) {
  const {
    valueID
  } = useIDContext();
  const {
    makeRequest,
    isLoading
  } = useRequest((data) => editCompany(data, valueID));
  const siteApi = useRequest(getSites, {}, true);
  const [company, setCompany] = useState({
    id: 0,
    name: "",
    location: {
      id: 0,
      locationArea: "",
      site: ""
    },
    contractId: "",
    createdAt: "",
    createdBy: null,
    members: []
  });
  const [locationId, setLocationId] = useState(0);
  useEffect(() => {
    if (valueID) {
      async function getCompanyById() {
        var _a;
        const response = await createRequest(`/profile/company/${valueID}`, "GET");
        const companyData = (_a = response[0]) == null ? void 0 : _a.data;
        setCompany(companyData);
      }
      getCompanyById();
    }
  }, [valueID]);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue
  } = useForm({
    initialValues: {
      name: "",
      contractId: "",
      locationId: 0
    },
    onSubmit,
    validationSchema: validationSchema$w
  });
  useEffect(() => {
    if (company) {
      setFieldValue("companyName", company.name);
      setFieldValue("contractID", company.contractId);
    }
  });
  const [siteName, setSiteName] = useState("--select site--");
  const [locationName, setLocationName] = useState("--select location--");
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData ? siteData.map((location2) => ({
        text: location2.locationArea,
        value: location2.id
      })) : [{
        text: "No location areas found",
        value: ""
      }];
      console.log(locations);
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);
  async function onSubmit(data) {
    console.log(data);
    const requestData = {
      name: data.companyName ?? company.name,
      contractId: data.contractID ?? company.contractId,
      locationId: locationId ?? company.location.id
    };
    const [_, error] = await makeRequest(requestData);
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to edit company, please try again."
      });
    }
    toast({
      variant: "success",
      message: "Company updated successfully"
    });
    route("/users/company/details");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Edit Company"
          }), jsx("p", {
            children: "Fill the fields below to edit an existing user"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Company Name"
          }), jsx(Input, {
            placeholder: company.name,
            ...getFieldProps("companyName")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Contract ID"
          }), jsx(Input, {
            placeholder: company.contractId,
            ...getFieldProps("contractID")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Site"
          }), jsx(Select, {
            placeholder: siteName,
            options: siteOptions,
            ...getFieldProps("siteName"),
            onChange: (e) => setSiteName(e.target.value)
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Location Area"
          }), jsx(Select, {
            placeholder: locationName,
            options: locationOptions,
            onChange: (e) => {
              const selectedValue = Number(e.target.value);
              setFieldValue("locationId", selectedValue);
              setLocationId(selectedValue);
              console.log("Selected Location ID:", selectedValue);
              const selectedOption = locationOptions.find((option) => option.value === selectedValue);
              setLocationName((selectedOption == null ? void 0 : selectedOption.text) ?? "--select location--");
            }
          }), jsx(Button, {
            variant: "primary",
            isLoading,
            children: "Edit Company"
          })]
        })
      })]
    })]
  });
}
const validationSchema$w = Yup.object({
  // companyName: Yup.string().required("Company name is required"),
  // contractID: Yup.string().required("Contract ID is required"),
  // locationId: Yup.number()
  //   .required("Location is required")
  //   .min(1, "Please select a valid location"),
});
function ActivitiesFlow({}) {
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = ["All Status", "NOT_STARTED", "REVALIDATION_INITIATED", "CLOSURE_INITIATED"];
  const {
    setID
  } = useIDContext();
  const {
    profile
  } = useUserContext();
  const {
    response,
    isLoading
  } = useRequest(getAllPermits, {}, true);
  const handleItemClick = (item) => {
    setID(item.id);
    route("/process-permits");
  };
  const truncateText = (text, maxLength) => {
    if (!text)
      return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const activities = (response == null ? void 0 : response.data) || [];
  const filteredActivities = activities.filter((permit) => {
    var _a, _b, _c;
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = ((_a = permit.workArea) == null ? void 0 : _a.toLowerCase()) || "";
    const entrustedCompany = ((_b = permit.entrustedCompany) == null ? void 0 : _b.name.toLowerCase()) || "";
    const matchesSearchTerm = ptwID.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase()) || workArea.includes(searchTerm.toLowerCase()) || entrustedCompany.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const matchesWorkType = selectedWorkType === "All Work Types" || permit.type === selectedWorkType;
    const matchesStatus = selectedStatus === "All Status" || permit.status === selectedStatus;
    const matchesProfileAndAuthority = (profile == null ? void 0 : profile.id) && ((_c = permit.permitRoles) == null ? void 0 : _c[profile.id]) && permit.permitRoles[profile.id] === permit.currentAuthority;
    return matchesSearchTerm && matchesWorkType && matchesStatus && matchesProfileAndAuthority;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredActivities.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Activities"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search",
        onSearch: setSearchTerm
      }), jsx("br", {}), jsxs("div", {
        className: "app-section__filters ",
        children: [jsx("span", {
          className: "base-date-filter--secondary",
          children: "Filter by:"
        }), jsxs("div", {
          className: "sm-grid-cols-2 app-section__filters",
          children: [jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedStatus
            }), jsx(DropdownContent, {
              children: statusOptions.map((status) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedStatus(status),
                children: status
              }, status))
            })]
          }), jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedWorkType
            }), jsx(DropdownContent, {
              children: work_types.map((type) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedWorkType(type),
                children: type
              }, type))
            })]
          })]
        })]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "PTW ID."
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Work To Be Performed"
              }), jsx(TableCell, {
                children: "Work Location"
              }), jsx(TableCell, {
                children: "Company"
              }), jsx(TableCell, {
                children: "Status / Authority"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.filter((data) => data.status !== "CLOSED" && data.status !== "CANCELED" && data.status !== "APPROVED").map((data) => {
              var _a, _b;
              return jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: data.publicId
                }), jsx(TableCell, {
                  children: convertSnakeCaseToTitleCase(data.type)
                }), jsx(TableCell, {
                  children: truncateText(data.workDescription, 45)
                }), jsx(TableCell, {
                  children: jsxs("span", {
                    children: [data.workArea, " / ", (_a = data.location) == null ? void 0 : _a.locationArea]
                  })
                }), jsx(TableCell, {
                  children: (_b = data.entrustedCompany) == null ? void 0 : _b.name
                }), jsx(TableCell, {
                  children: jsxs("h6", {
                    className: `${data.status === "Draft" ? "draft-status" : "others-status"}`,
                    children: [data.status, " / ", data.currentAuthority]
                  })
                }), jsx(TableCell, {
                  children: jsx(Button, {
                    onClick: () => handleItemClick(data),
                    children: "View"
                  })
                })]
              }, data.id);
            })
          })]
        })
      }), jsx("div", {
        className: "app-section__sm-table",
        children: jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.filter((data) => data.status !== "CLOSED" && data.status !== "CANCELED" && data.status !== "APPROVED").map((dataItem) => jsxs("div", {
              className: "container",
              onClick: () => handleItemClick(dataItem),
              children: [jsxs("div", {
                className: "location-flex",
                onClick: () => handleItemClick(dataItem),
                children: [jsx("p", {
                  children: dataItem.publicId
                }), jsx("h6", {
                  className: "gray",
                  children: convertSnakeCaseToTitleCase(dataItem.type)
                })]
              }), jsx("p", {
                children: truncateText(dataItem.workDescription, 45)
              }), jsx("div", {
                className: "location-flex",
                children: jsxs("div", {
                  className: "items-center",
                  children: [jsx("p", {
                    className: "gray",
                    children: "Status / Authority:"
                  }), jsxs("h6", {
                    className: ` ${dataItem.status === "Draft" ? "draft-status" : "others-status"}`,
                    children: [dataItem.status, " / ", dataItem.currentAuthority]
                  })]
                })
              })]
            }, dataItem.id))
          })
        })
      }), filteredActivities.length && jsx(Pagination, {
        totalItems: filteredActivities.length,
        itemsPerPage,
        currentPage,
        onPageChange: setCurrentPage
      }), !filteredActivities.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
        })]
      })]
    })]
  });
}
function ProcessPermitsIndex({}) {
  const {
    valueID,
    setID
  } = useIDContext();
  const id = valueID;
  const {
    updatePermit
  } = usePermitDetails();
  const {
    profile
  } = useUserContext();
  const [permitDetails, setPermitDetails] = useState({
    status: ""
  });
  const [canRenderActions, setCanRenderActions] = useState(false);
  useEffect(() => {
    async function getPermitDetails() {
      var _a;
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      console.log(permitData);
      setPermitDetails(permitData);
      updatePermit(permitData);
      setID(permitData.id);
      const userRole = (_a = permitData == null ? void 0 : permitData.permitRoles) == null ? void 0 : _a[profile == null ? void 0 : profile.id];
      if (userRole && userRole === (permitData == null ? void 0 : permitData.currentAuthority)) {
        setCanRenderActions(true);
      } else {
        setCanRenderActions(false);
      }
    }
    getPermitDetails();
  }, [id, profile == null ? void 0 : profile.id]);
  console.log(permitDetails, "permit details");
  console.log(permitDetails == null ? void 0 : permitDetails.isSentBack, "boolean");
  const {
    tabs,
    activeTab
  } = useTabs(["Performing Auth.", "Issuing Auth.", "HSE Auth.", "Authorizing Auth.", "Perf. Auth. Supervisor", "Safety Officer", "Issuing. Auth. Supervisor"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  const handleNavigate = (data) => {
    switch (data.currentAuthority) {
      case "ISSUING":
        route("/activities-process");
        break;
      case "HSE":
        route("/activities-process/hse");
        break;
      case "AUTHORIZING":
        route("/activities-process/auth");
        break;
      case "PERFORMING_SUPERVISOR":
        route("/activities-process/perf-supervisor");
        break;
      case "SAFETY_OFFICER":
        route("/activities-process/safety-officer");
        break;
      case "ISSUING_SUPERVISOR":
        route("/activities-process/issu-supervisor");
        break;
      default:
        route("/activities-process");
        break;
    }
  };
  const handleClosureNavigate = (data) => {
    switch (data.currentAuthority) {
      case "PERFORMING_SUPERVISOR":
        route("/closure-perf-auth");
        break;
      case "SAFETY_OFFICER":
        route("/closure-safety-officer");
        break;
      case "ISSUING_SUPERVISOR":
        route("/closure-issuing-supervisor");
        break;
      default:
        route("/closure-perf-auth");
    }
  };
  const handleRevalidateNavigate = (data) => {
    switch (data.currentAuthority) {
      case "PERFORMING_SUPERVISOR":
        route("/revalidate-perf-auth");
        break;
      case "SAFETY_OFFICER":
        route("/revalidate-safety-officer");
        break;
      case "ISSUING_SUPERVISOR":
        route("/revalidate-issuing-supervisor");
        break;
      default:
        route("/revalidate-perf-auth");
    }
  };
  const [reactivatePermitPopup, setReactivatePermitPopup] = useState(false);
  const handleReactivate = () => {
    setReactivatePermitPopup(true);
  };
  const handleReactivePermit = async () => {
    var _a;
    const id2 = permitDetails == null ? void 0 : permitDetails.id;
    try {
      const response = await createRequest(`/permit/reactivate/${id2}`, "PUT");
      console.log(response);
      toast({
        variant: "success",
        message: "Permit reactivated successfully."
      });
    } catch (error) {
      toast({
        variant: "error",
        message: ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.error) ?? "Failed to reactivate permit."
      });
    }
    setReactivatePermitPopup(false);
  };
  return jsxs(Fragment$1, {
    children: [" ", jsx(Header, {
      title: "Activities"
    }), jsx("br", {}), jsx("div", {
      className: "app-permit__sections",
      children: canRenderActions ? jsx("div", {
        className: "actions",
        children: (permitDetails == null ? void 0 : permitDetails.isSentBack) === true ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsxs("h4", {
                children: ["Permit Sent back from ", permitDetails == null ? void 0 : permitDetails.sendBackAuthority]
              }), jsx("p", {
                children: permitDetails == null ? void 0 : permitDetails.sendBackReason
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleNavigate(permitDetails),
              children: [jsx(Icon, {
                name: "process"
              }), "Process Permit"]
            })]
          })
        }) : (permitDetails == null ? void 0 : permitDetails.status) === "NOT_STARTED" && (permitDetails == null ? void 0 : permitDetails.isSentBack) === false ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Process Permit"
              }), jsx("p", {
                children: "Click the button to process / approve this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleNavigate(permitDetails),
              children: [jsx(Icon, {
                name: "process"
              }), "Process Permit"]
            })]
          })
        }) : (permitDetails == null ? void 0 : permitDetails.status) === "REVALIDATION_INITIATED" ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Revalidate Permit"
              }), jsx("p", {
                children: "Click the button to revalidate this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleRevalidateNavigate(permitDetails),
              children: [jsx(Icon, {
                name: "process"
              }), "Revalidate Permit"]
            })]
          })
        }) : (permitDetails == null ? void 0 : permitDetails.status) === "SUSPENDED" ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Permit Suspended"
              }), jsx("p", {
                children: "Click the button to reactivate this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleReactivate(),
              children: [jsx(Icon, {
                name: "export"
              }), "Reactivate Permit"]
            })]
          })
        }) : (permitDetails == null ? void 0 : permitDetails.status) === "CANCELATION_INITIATED" ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "closure",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Process Cancellation"
              }), jsx("p", {
                children: "Click the button to process cancellation for this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleClosureNavigate(permitDetails),
              children: [jsx(Icon, {
                name: "export"
              }), "Process Cancellation"]
            })]
          })
        }) : jsx(Fragment$1, {
          children: jsxs("div", {
            className: "closure",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Process Closure"
              }), jsx("p", {
                children: "Click the button to proess closure for this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleClosureNavigate(permitDetails),
              children: [jsx(Icon, {
                name: "export"
              }), "Process Closure"]
            })]
          })
        })
      }) : jsx("div", {
        className: "actions",
        children: jsx("div", {
          className: "print",
          children: jsxs("div", {
            children: [jsx("h4", {
              children: "Approval in Progress"
            }), jsx("p", {
              children: "This permit is currently being processed by another authority. Please check the permit status for further details."
            })]
          })
        })
      })
    }), jsx("br", {}), jsxs("div", {
      className: "app-authorities",
      children: [jsx(ReusableTabs, {
        tabs,
        counts,
        className: "app-authorities__tabs"
      }), jsxs("div", {
        className: "app-authorities__content",
        children: [activeTab === "Performing Auth." && jsx(PerformingAuthorities, {
          response: permitDetails
        }), activeTab === "Issuing Auth." && jsx(IssuingAuthorities, {
          response: permitDetails
        }), activeTab === "HSE Auth." && jsx(HSEAuthority, {
          response: permitDetails
        }), activeTab === "Authorizing Auth." && jsx(AuthAuthority, {
          response: permitDetails
        }), activeTab === "Perf. Auth. Supervisor" && jsx(PerfAuthSupervisor, {
          response: permitDetails
        }), activeTab === "Safety Officer" && jsx(SafetyOfficer, {
          response: permitDetails
        }), activeTab === "Issuing. Auth. Supervisor" && jsx(IssuAuthSupervisor, {
          response: permitDetails
        })]
      }), jsx("div", {
        className: "",
        children: reactivatePermitPopup && jsx(PopupModal, {
          icon: jsx("img", {
            src: "/svgs/reactivate.svg"
          }),
          title: "Reactivate Permit",
          message: "Are you sure you want to reactivate this permit? This action cannot be undone.",
          onClose: () => setReactivatePermitPopup(false),
          primaryButton: {
            label: "Confirm",
            onClick: handleReactivePermit,
            color: "#008171"
          },
          secondaryButton: {
            label: "Cancel",
            onClick: () => setReactivatePermitPopup(false),
            color: "#E86E18"
          }
        })
      })]
    })]
  });
}
const ActivityIssuingMachine = () => createMachine({
  context: {
    work_hazards: {
      hazards: {},
      potentialHazardDescription: ""
    },
    personal_protective_equipment: {
      protectiveEquipment: {}
    },
    firefighting_equipment: {
      firefightingEquipment: {},
      otherPrecaution: ""
    },
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    mechanical_precaution: {
      mechanicalPrecaution: {}
    },
    electrical_precaution: {
      electricalPrecaution: {}
    },
    // adjust_date_time: {},
    // tool_kit_time: {},
    submit: {}
  },
  predictableActionArguments: true,
  initial: "work_hazards",
  states: {
    work_hazards: {
      meta: {
        title: "Hazard Identification",
        section: "A"
      },
      on: {
        submit: {
          target: "personal_protective_equipment",
          actions: ["updateContext"]
        }
      }
    },
    personal_protective_equipment: {
      meta: {
        title: "Personal Protective Equipment",
        section: "B"
      },
      on: {
        submit: {
          target: "firefighting_equipment",
          actions: ["updateContext"]
        },
        go_back: "work_hazards"
      }
    },
    firefighting_equipment: {
      meta: {
        title: "Firefighting Equipment",
        section: "C"
      },
      on: {
        submit: {
          target: "selected_documents",
          actions: ["updateContext"]
        },
        go_back: "personal_protective_equipment"
      }
    },
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "D"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        },
        go_back: "firefighting_equipment"
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "E"
      },
      on: {
        submit: [{
          target: "mechanical_precaution",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    mechanical_precaution: {
      meta: {
        title: "Mechanical Isolation (Measures on Equipments / Line)"
      },
      on: {
        submit: {
          target: "electrical_precaution",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    },
    electrical_precaution: {
      meta: {
        title: "Electrical Isolation (Measures on Equipments / Line)"
      },
      on: {
        submit: [{
          target: "submit",
          actions: ["updateContext"]
        }],
        go_back: "mechanical_precaution"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context$3 = createContext({});
function PermitProvider$2({
  children
}) {
  const [state, send, service] = useMachine(ActivityIssuingMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$3.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function useIssuingActivityContext() {
  return useContext(Context$3);
}
const RoleContext = createContext({});
function RoleProvider({
  children
}) {
  const [currentRole, setCurrentRole] = useState("issuingAuth");
  const changeRole = (role) => setCurrentRole(role);
  return jsx(RoleContext.Provider, {
    value: {
      currentRole,
      changeRole
    },
    children
  });
}
function SendToAuthority({
  setModalOpen
}) {
  const {
    valueID
  } = useIDContext();
  const id = valueID;
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$v,
    initialValues: {
      permitId: 0,
      authority: "",
      reason: ""
    },
    onSubmit
  });
  const {
    makeRequest,
    isLoading
  } = useRequest(sendBackToAuthority);
  const currentPath = window.location.pathname;
  const authorityOptionsFilter = (currentPath2) => {
    switch (currentPath2) {
      case "/activities-process":
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }];
      case "/activities-process/hse":
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }, {
          value: "ISSUING",
          text: "Issuing Authority"
        }];
      case "/activities-process/auth":
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }, {
          value: "ISSUING",
          text: "Issuing Authority"
        }, {
          value: "HSE",
          text: "HSE Authority"
        }];
      case "/activities-process/perf-supervisor":
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }, {
          value: "ISSUING",
          text: "Issuing Authority"
        }, {
          value: "HSE",
          text: "HSE Authority"
        }, {
          value: "AUTHORIZING",
          text: "Authorizing Authority"
        }];
      case "/activities-process/safety-officer":
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }, {
          value: "ISSUING",
          text: "Issuing Authority"
        }, {
          value: "HSE",
          text: "HSE Authority"
        }, {
          value: "AUTHORIZING",
          text: "Authorizing Authority"
        }, {
          value: "PERFORMING_SUPERVISOR",
          text: "Performing Authority Supervisor "
        }];
      case "/activities-process/issu-supervisor":
        return [{
          value: "ISSUING",
          text: "Issuing Authority"
        }, {
          value: "HSE",
          text: "HSE Authority"
        }, {
          value: "AUTHORIZING",
          text: "Authorizing Authority"
        }, {
          value: "PERFORMING_SUPERVISOR",
          text: "Performing Authority Supervisor "
        }, {
          value: "SAFETY_OFFICER",
          text: "Safety Officer"
        }];
      default:
        return [{
          value: "PERFORMING",
          text: "Performing Authority"
        }];
    }
  };
  let authorityOptions = authorityOptionsFilter(currentPath);
  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: id,
      authority: data.authority,
      reason: data.reason
    });
    if (err) {
      toast({
        variant: "error",
        message: (err == null ? void 0 : err.message) || "Failed to send back permit, please try again"
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit sent back to authority successfully"
      });
      route("/permit-activities");
    }
  }
  return jsx(Fragment$1, {
    children: jsx("div", {
      className: "popup-overlay",
      children: jsxs("div", {
        className: "popup-modal",
        children: [jsxs("div", {
          className: "grid-cols-2",
          children: [jsx("h3", {
            children: "Send Back to Authority"
          }), jsx("button", {
            className: "close-button",
            onClick: setModalOpen,
            children: "×"
          })]
        }), jsx("br", {}), jsx("br", {}), jsx("div", {
          className: "popup-content",
          children: jsx("div", {
            className: "",
            children: jsxs("form", {
              onSubmit: handleSubmit,
              children: [jsxs("div", {
                className: "",
                children: [jsx(Select, {
                  label: "Authority",
                  placeholder: "--select authority--",
                  options: authorityOptions,
                  ...getFieldProps("authority")
                }), jsx("br", {})]
              }), jsx(Textarea, {
                label: "Reason",
                placeholder: "Write reason here...",
                ...getFieldProps("reason")
              }), jsx(Button, {
                type: "submit",
                variant: "primary",
                isLoading,
                children: "Submit"
              })]
            })
          })
        })]
      })
    })
  });
}
const validationSchema$v = Yup.object({
  authority: Yup.string().required("Please select a valid authority").trim(),
  reason: Yup.string().required("Reason for sending back permit is required").trim().min(2, "Please enter a valid reason")
});
function WorkHazards() {
  var _a, _b, _c, _d;
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    send,
    state
  } = useIssuingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const hazardsArray = ((_b = (_a = details == null ? void 0 : details.permitHazards) == null ? void 0 : _a[0]) == null ? void 0 : _b.hazard) ?? null;
  const issuingHazards = ((_d = (_c = details == null ? void 0 : details.permitHazards) == null ? void 0 : _c[1]) == null ? void 0 : _d.hazard) ?? null;
  const combinedHazards = useMemo(() => {
    if (!hazardsArray || !issuingHazards) {
      return {};
    }
    const hazards2 = {};
    Object.keys(hazardsArray).forEach((key) => {
      if (hazardsArray[key] === null && issuingHazards[key] === null) {
        hazards2[key] = null;
      }
    });
    return hazards2;
  }, [hazardsArray, issuingHazards]);
  const issuingDisplayHazards = useMemo(() => {
    const items = Object.entries(hazardsArray || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWHAZARDS = HAZARDS$1.filter((hazard) => items.some((item) => item.key === hazard.value));
    console.log(NEWHAZARDS);
    return NEWHAZARDS;
  }, [issuingHazards]);
  const displayHazards = useMemo(() => {
    const items = Object.entries(combinedHazards || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWHAZARDS = HAZARDS$1.filter((hazard) => items.some((item) => item.key === hazard.value));
    return NEWHAZARDS;
  }, [hazardsArray]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialHazards = {};
  currentPath === "/activities-process" || currentPath === "/activities-process/hse" ? initialHazards = HAZARDS$1.reduce((acc, hazard) => {
    var _a2, _b2;
    acc[hazard.value] = ((_b2 = (_a2 = state.context.work_hazards) == null ? void 0 : _a2.hazards) == null ? void 0 : _b2[hazard.value]) ?? void 0;
    return acc;
  }, {}) : {};
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$u,
    initialValues: {
      ...state.context.work_hazards,
      hazards: initialHazards
    },
    onSubmit
  });
  function updateHazards(name, value) {
    setFieldValue("hazards", {
      ...values.hazards,
      [name]: value
    });
  }
  function onSubmit(work_hazards) {
    send("submit", {
      data: {
        work_hazards
      }
    });
  }
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsxs("div", {
        className: "app-register__form",
        children: [jsx(Section, {
          type: "Hazards",
          header: "Hazards",
          children: hazards[0],
          section: hazards[0].section
        }), jsxs("div", {
          className: "grid-cols-2",
          children: [jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Performing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(hazardsArray)
              })]
            })
          }), currentPath === "/activities-process/hse" && jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(issuingHazards)
              })]
            })
          })]
        })]
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Identification of Hazards"
      }), jsxs("div", {
        className: "app-register__form",
        children: [currentPath === "/activities-process" ? jsxs(Fragment$1, {
          children: [" ", issuingDisplayHazards.map((hazard) => {
            var _a2, _b2;
            return jsxs("div", {
              className: "app-create-permit__radio-container",
              children: [jsx("p", {
                children: hazard.text
              }), jsxs("div", {
                children: [jsx(Radio, {
                  checked: ((_a2 = values.hazards) == null ? void 0 : _a2[hazard.value]) === true,
                  onChange: () => updateHazards(hazard.value, true),
                  label: "YES"
                }), jsx(Radio, {
                  checked: ((_b2 = values.hazards) == null ? void 0 : _b2[hazard.value]) === false,
                  onChange: () => updateHazards(hazard.value, false),
                  label: "NO"
                })]
              })]
            });
          })]
        }) : jsxs(Fragment$1, {
          children: [" ", displayHazards.map((hazard) => {
            var _a2, _b2;
            return jsxs("div", {
              className: "app-create-permit__radio-container",
              children: [jsx("p", {
                children: hazard.text
              }), jsxs("div", {
                children: [jsx(Radio, {
                  checked: ((_a2 = values.hazards) == null ? void 0 : _a2[hazard.value]) === true,
                  onChange: () => updateHazards(hazard.value, true),
                  label: "YES"
                }), jsx(Radio, {
                  checked: ((_b2 = values.hazards) == null ? void 0 : _b2[hazard.value]) === false,
                  onChange: () => updateHazards(hazard.value, false),
                  label: "NO"
                })]
              })]
            });
          })]
        }), jsx(Input, {
          type: "text",
          label: "Others",
          placeholder: "Others",
          ...getFieldProps("otherHazard")
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activities";
          },
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const HAZARDS$1 = [
  {
    text: "NOISE",
    value: "noise"
  },
  {
    text: "TOXIC SUBSTANCE",
    value: "toxicSubstance"
  },
  {
    text: "CHEMICAL",
    value: "chemical"
  },
  {
    text: "EXPLOSIVES",
    value: "explosives"
  },
  {
    text: "HEIGHT",
    value: "height"
  },
  {
    text: "OVERHEAD HAZARDS, CRANES, ETC",
    value: "overheadCranes"
  },
  {
    text: "ILLUMINATING",
    value: "illuminating"
  },
  {
    text: "SPILL (CONTAINMENT IN PLACE)",
    value: "spill"
  },
  {
    text: "FALLING OBJECTS",
    value: "falling"
  },
  {
    text: "RADIATION",
    value: "radiation"
  },
  {
    text: "TYPE OF WASTE IS KNOWN",
    value: "knownWaste"
  }
  // { text: "OTHER", value: "otherHazard" },
];
const validationSchema$u = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function PersonalProtectiveEquipment() {
  var _a, _b;
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const personalProtectiveArray = (details == null ? void 0 : details.protectiveEquipments) && ((_a = details == null ? void 0 : details.protectiveEquipments) == null ? void 0 : _a.length) > 0 ? (_b = details.protectiveEquipments[0]) == null ? void 0 : _b.protectiveEquipment : null;
  const displayEquipments = useMemo(() => {
    const items = Object.entries(personalProtectiveArray || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = EQUIPMENT$1.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [personalProtectiveArray]);
  const {
    send,
    state
  } = useIssuingActivityContext();
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/hse" ? initialItems = EQUIPMENT$1.reduce((acc, item) => {
    var _a2, _b2;
    acc[item.value] = ((_b2 = (_a2 = state.context.personal_protective_equipment) == null ? void 0 : _a2.personal_protective_equipment) == null ? void 0 : _b2[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    handleSubmit,
    setFieldValue,
    values
  } = useForm({
    validationSchema: validationSchema$t,
    initialValues: {
      ...state.context.personal_protective_equipment,
      protectiveEquipment: initialItems
    },
    onSubmit
  });
  function updatePersonalEquipment(name, value) {
    setFieldValue("protectiveEquipment", {
      ...values.protectiveEquipment,
      [name]: value
    });
  }
  function onSubmit(personal_protective_equipment) {
    send("submit", {
      data: {
        personal_protective_equipment
      }
    });
  }
  const equipment = [{
    section: "D",
    header: "Selected Equipment",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/hse" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Hazards",
            children: equipment[0],
            section: equipment[0].section
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(personalProtectiveArray)
              })]
            })
          })]
        })
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s) below"
      }), jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process" ? jsx(Fragment$1, {
          children: EQUIPMENT$1.map((equipment2) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: equipment2.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.protectiveEquipment[equipment2.value] === true,
                onChange: () => updatePersonalEquipment(equipment2.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.protectiveEquipment[equipment2.value] === false,
                onChange: () => updatePersonalEquipment(equipment2.value, false),
                label: "NO"
              })]
            })]
          }))
        }) : jsx(Fragment$1, {
          children: displayEquipments.map((equipment2) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: equipment2.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.protectiveEquipment[equipment2.value] === true,
                onChange: () => updatePersonalEquipment(equipment2.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.protectiveEquipment[equipment2.value] === false,
                onChange: () => updatePersonalEquipment(equipment2.value, false),
                label: "NO"
              })]
            })]
          }))
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const EQUIPMENT$1 = [{
  text: "SAFETY HARD HATS (Type I, Type II)",
  value: "safetyHardHats"
}, {
  text: "SAFETY SHOES OR BOOTS (Anti-slip, Steel toe, Chemical Resistant, rain boots)",
  value: "safetyShoes"
}, {
  text: "BODY PROTECTION (Coverall) (Chemical resistant, apron, fire retardant, fire resistant)",
  value: "bodyProtection"
}, {
  text: "SAFETY GLOVES (Welders, Chemical resistant, Electrical resistant, high impact, mechanical, anti-vibration, General purpose)",
  value: "safetyGloves"
}, {
  text: "BREATHING APPARATUS (Dust, Fumes, Chemical, SCBA)",
  value: "breathingApparatus"
  // Correct value as expected by the backend
}, {
  text: "SAFETY GLASSES / FACE SHIELD / ELECTRIC ARC SHIELD / GRINDING SHIELD",
  value: "safetyGlasses"
}, {
  text: "HEARING PROTECTION (ear muff, ear plugs, ear muff & ear plugs)",
  value: "hearingProtection"
}, {
  text: "LIFE VEST (Work Vest, Life Jacket)",
  value: "lifeVest"
}, {
  text: "LIFE BUOY / LIFE LINE",
  value: "lifeBuoy"
}];
const validationSchema$t = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
const FIREFIGHTING_EQUIPMENT$1 = [
  {
    text: "FIRE EXTINGUISHER (CO2)",
    value: "fireExtinguisherCO2"
  },
  {
    text: "FIRE EXTINGUISHER (DCP)",
    value: "fireExtinguisherDCP"
  },
  {
    text: "REMOVAL OF FLAMMABLE SUBSTANCES",
    value: "removalOfFlammableSubstances"
  },
  {
    text: "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)",
    value: "explosionProofTools"
  },
  {
    text: "FLAME PROOF BLANKET",
    value: "flameProofBlanket"
  },
  {
    text: "GROUNDING OF EQUIPMENT",
    value: "groundingOfEquipment"
  },
  {
    text: "CONTINUOUS GAS MONITORING",
    value: "continuousGasMonitoring"
  },
  {
    text: "FIREWATCHER / STANDBY MAN",
    value: "firewatcher"
  }
  // { text: "OTHERS", value: "otherPrecaution" },
];
function FireFightingEquipment() {
  const {
    state,
    send
  } = useIssuingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const firefightingEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? details.firefightingPrecautions[0].firefightingPrecaution : null;
  const displayEquipments = useMemo(() => {
    const items = Object.entries(firefightingEquipment || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = FIREFIGHTING_EQUIPMENT$1.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [firefightingEquipment]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/hse" ? initialItems = FIREFIGHTING_EQUIPMENT$1.reduce((acc, item) => {
    var _a, _b;
    acc[item.value] = ((_b = (_a = state.context.firefighting_equipment) == null ? void 0 : _a.firefighting_equipment) == null ? void 0 : _b[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    setFieldValue,
    values,
    handleSubmit,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$s,
    initialValues: {
      ...state.context.firefighting_equipment,
      firefightingEquipment: initialItems
    },
    onSubmit
  });
  function updateFirefightingEquipment(name, value) {
    setFieldValue("firefightingEquipment", {
      ...values.firefightingEquipment,
      [name]: value
    });
  }
  function onSubmit(firefighting_equipment) {
    send("submit", {
      data: {
        firefighting_equipment
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [{
    section: "",
    header: "Selected Precautions",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/hse" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Hazards",
            children: equipment[0],
            section: equipment[0].section
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(firefightingEquipment)
              })]
            })
          })]
        })
      }), jsx("p", {
        children: "Select applicable option(s)"
      }), jsx("div", {
        className: "app-register__form app-create-permit__docs",
        children: currentPath === "/activities-process" ? jsxs(Fragment$1, {
          children: [FIREFIGHTING_EQUIPMENT$1.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.firefightingEquipment[item.value] === true,
                onChange: () => updateFirefightingEquipment(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.firefightingEquipment[item.value] === false,
                onChange: () => updateFirefightingEquipment(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("otherPrecaution")
          })]
        }) : jsxs(Fragment$1, {
          children: [displayEquipments.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.firefightingEquipment[item.value] === true,
                onChange: () => updateFirefightingEquipment(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.firefightingEquipment[item.value] === false,
                onChange: () => updateFirefightingEquipment(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("otherPrecaution")
          })]
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const validationSchema$s = Yup.object({});
function Documents() {
  var _a;
  const {
    state,
    send
  } = useIssuingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const documents = (details == null ? void 0 : details.permitDocuments) && permit.permitDocuments.length > 0 ? details.permitDocuments[0].document : [];
  const reversedDocuments = toOriginalFormat(documents);
  const notSelected = documentOptions$1.filter((doc) => {
    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);
    return !reversedDoc;
  });
  const selected = documentOptions$1.filter((doc) => {
    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);
    return reversedDoc;
  });
  const validationSchema2 = Yup.object().shape({
    // documents: Yup.object().test(
    //   "document-selection-validation",
    //   "Please select a corresponding dropdown option for all selected documents.",
    //   (documents) => {
    //     // Skip validation if no documents need to be selected
    //     if (notSelected.length === 0) return true;
    //     // Check that all selected documents have valid dropdown options
    //     const selectedDocuments = Object.entries(documents || {}).filter(
    //       ([_, checked]) => checked
    //     );
    //     if (selectedDocuments.length === 0) return false;
    //     return selectedDocuments.every(
    //       ([document]) => !!documents[`document_${document}`]
    //     );
    //   }
    // ),
  });
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema2,
    initialValues: {
      ...state.context.selected_documents
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  function onSubmit(selected_documents) {
    console.log(selected_documents);
    send("submit", {
      data: {
        selected_documents
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const renderDocuments = () => {
    const documentEntries = selected;
    return documentEntries.map((doc) => {
      return jsx("div", {
        className: "document-item",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "document grid-cols-2",
            children: jsx("span", {
              children: doc
            })
          })
        })
      }, doc);
    });
  };
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsxs("div", {
        className: "",
        children: [jsx(Section, {
          type: "Secondary",
          header: "Uploaded Documents",
          children: documents[0],
          section: (_a = documents[0]) == null ? void 0 : _a.section
        }), jsx("div", {
          className: "section",
          children: jsx("div", {
            className: "",
            children: jsx("p", {
              className: "info",
              children: Object.keys(selected).length > 0 ? renderDocuments() : jsx("p", {
                children: "No documents uploaded."
              })
            })
          })
        })]
      }), jsx("h3", {
        children: "Select the document you want to upload below"
      }), jsx("br", {}), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: (notSelected == null ? void 0 : notSelected.length) > 0 ? jsx(Fragment$1, {
          children: notSelected.map((document2, index) => jsxs("div", {
            className: "",
            children: [jsxs("label", {
              className: "app-register__attachment-form items-center",
              children: [jsx(Checkbox, {
                checked: !!values.documents[document2],
                onChange: () => updateDocuments(document2, !values.documents[document2])
              }), jsx("span", {
                children: document2
              })]
            }), jsx(Select, {
              ...getFieldProps(`document_${document2}`),
              options: [{
                text: "Manual Upload",
                value: "manual"
              }]
            }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
              className: "error",
              style: {
                color: "red"
              },
              children: "Please select an option for the selected document."
            })]
          }, index))
        }) : jsx(Fragment$1, {
          children: jsx("p", {
            children: "No documents need to be uploaded"
          })
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          type: "submit",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
function FinalUpload() {
  const {
    state,
    send
  } = useIssuingActivityContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema: validationSchema$r
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const validationSchema$r = Yup.object({});
function MechanicalIsolation() {
  const {
    send,
    state
  } = useIssuingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const mechanicalPrecautionEquipment = (details == null ? void 0 : details.mechanicalIsolationPrecaution) && details.mechanicalIsolationPrecaution.length > 0 ? details.mechanicalIsolationPrecaution[0].mechanicalIsolationPrecaution : null;
  const displayEquipments = useMemo(() => {
    const items = Object.entries(mechanicalPrecautionEquipment || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = LIST$3.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [mechanicalPrecautionEquipment]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/hse" ? initialItems = LIST$3.reduce((acc, item) => {
    var _a, _b;
    acc[item.value] = ((_b = (_a = state.context.mechanical_precaution) == null ? void 0 : _a.mechanical_precaution) == null ? void 0 : _b[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$q,
    initialValues: {
      ...state.context.mechanical_precaution,
      mechanicalPrecaution: initialItems
    },
    onSubmit
  });
  function updateMechanicalIsolation(name, value) {
    setFieldValue("mechanicalPrecaution", {
      ...values.mechanicalPrecaution,
      [name]: value
    });
  }
  function onSubmit(mechanical_precaution) {
    send("submit", {
      data: {
        mechanical_precaution
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [{
    section: "",
    header: "Selected Isolation Precaution",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/hse" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Selected Isolation Precaution",
            children: equipment[0],
            section: equipment[0].section
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(mechanicalPrecautionEquipment)
              })]
            })
          })]
        })
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s)"
      }), jsx("div", {
        className: "app-register__form",
        children: currentPath == "/activities-process" ? jsxs(Fragment$1, {
          children: [LIST$3.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.mechanicalPrecaution[item.value] === true,
                onChange: () => updateMechanicalIsolation(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.mechanicalPrecaution[item.value] === false,
                onChange: () => updateMechanicalIsolation(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("other")
          })]
        }) : jsxs(Fragment$1, {
          children: [displayEquipments.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.mechanicalPrecaution[item.value] === true,
                onChange: () => updateMechanicalIsolation(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.mechanicalPrecaution[item.value] === false,
                onChange: () => updateMechanicalIsolation(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("other")
          })]
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const LIST$3 = [
  {
    text: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)",
    value: "valveIsolationAmdTagging"
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) INSTALLATION",
    value: "flangesInstallation"
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) REMOVAL",
    value: "flangesRemoval"
  },
  {
    text: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)",
    value: "lineDisconnection"
  },
  {
    text: "LINE / EQUIPMENT DRAINAGE",
    value: "lineDrainage"
  },
  {
    text: "LINE / EQUIPMENT DEPRESSURIZATION",
    value: "lineDepressurization"
  },
  {
    text: "VENTILATION (Natural / Mechanical means)",
    value: "ventilation"
  }
  // { text: "OTHER", value: "other" },
];
const validationSchema$q = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function ElectricalIsolation() {
  const {
    send,
    state
  } = useIssuingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const eletricalIsolationPrecaution = (details == null ? void 0 : details.electricalIsolationPrecaution) && details.electricalIsolationPrecaution.length > 0 ? details.electricalIsolationPrecaution[0].electricalIsolationPrecaution : null;
  const displayEquipments = useMemo(() => {
    const items = Object.entries(eletricalIsolationPrecaution || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = LIST$2.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [eletricalIsolationPrecaution]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/hse" ? initialItems = LIST$2.reduce((acc, item) => {
    var _a, _b;
    acc[item.value] = ((_b = (_a = state.context.mechanical_precaution) == null ? void 0 : _a.mechanical_precaution) == null ? void 0 : _b[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$p,
    initialValues: {
      ...state.context.electrical_precaution,
      electricalPrecaution: initialItems
    },
    onSubmit
  });
  function updateElectricalIsolation(name, value) {
    setFieldValue("electricalPrecaution", {
      ...values.electricalPrecaution,
      [name]: value
    });
  }
  function onSubmit(electrical_precaution) {
    send("submit", {
      data: {
        electrical_precaution
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [{
    section: "",
    header: "Selected Isolation Precaution",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/hse" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Selected Isolation Precaution",
            children: equipment[0],
            section: equipment[0].section
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(eletricalIsolationPrecaution)
              })]
            })
          })]
        })
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s)"
      }), jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process" ? jsxs(Fragment$1, {
          children: [LIST$2.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.electricalPrecaution[item.value] === true,
                onChange: () => updateElectricalIsolation(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.electricalPrecaution[item.value] === false,
                onChange: () => updateElectricalIsolation(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("other")
          })]
        }) : jsxs(Fragment$1, {
          children: [displayEquipments.map((item) => jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: item.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: values.electricalPrecaution[item.value] === true,
                onChange: () => updateElectricalIsolation(item.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: values.electricalPrecaution[item.value] === false,
                onChange: () => updateElectricalIsolation(item.value, false),
                label: "NO"
              })]
            })]
          })), jsx(Input, {
            type: "text",
            label: "Others",
            placeholder: "Others",
            ...getFieldProps("other")
          })]
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "SUBMIT"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const LIST$2 = [
  {
    text: "SWITCH OFF OR SHUTDOWN THE EQUIPMENT",
    value: "equipmentShutdown"
  },
  {
    text: "RACK OUT AND PADLOCK THE CIRCUIT BREAKER (Car seal is also optional)",
    value: "circuitBreakerPadlock"
  },
  {
    text: "USE MULTIMAKER TO CHECK VOLTAGE READING",
    value: "voltageReadingCheck"
  },
  {
    text: "DISCONNECT SUPPLY FROM THE SOURCE",
    value: "supplyDisconnection"
  },
  {
    text: "DISCONNECT CABLE FROM EQUIPMENT",
    value: "cableDisconnection"
  },
  {
    text: "INSTALLATION OF GROUND FAULT CIRCUIT INTERUPTOR (GCFI OR RESIDUAL CURRENT CICUIT BREAKER (RCCB)",
    value: "gfciInstallation"
  }
  // { text: "OTHERS", value: "other" },
];
const validationSchema$p = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function Submit() {
  const {
    state
  } = useIssuingActivityContext();
  const {
    makeRequest
  } = useRequest(approveIssuingAuth);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      var _a, _b, _c, _d, _e, _f, _g;
      setLoading(true);
      const selectedHazards = ((_a = state.context.work_hazards) == null ? void 0 : _a.hazards) || {};
      const filteredHazards = {};
      Object.entries(selectedHazards).forEach(([key, value]) => {
        console.log(key, value);
        if (value !== void 0) {
          filteredHazards[key] = value;
        }
      });
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        hazards: {
          potentialHazardDescription: ((_b = state.context.work_hazards) == null ? void 0 : _b.potentialHazardDescription) || "",
          ...filteredHazards
        },
        protectiveEquipment: (_c = state.context.personal_protective_equipment) == null ? void 0 : _c.protectiveEquipment,
        firefightingPrecaution: {
          otherPrecaution: ((_d = state.context.firefighting_precaution) == null ? void 0 : _d.otherPrecaution) || "",
          ...(_e = state.context.firefighting_precaution) == null ? void 0 : _e.firefightingPrecaution
        },
        documents,
        mechanicalIsolationPrecaution: (_f = state.context.mechanical_precaution) == null ? void 0 : _f.mechanicalPrecaution,
        electricalIsolationPrecaution: (_g = state.context.electrical_precaution) == null ? void 0 : _g.electricalPrecaution
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        setSuccessful(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function ViewPermitDetails({
  setModalOpen
}) {
  var _a, _b;
  const {
    valueID
  } = useIDContext();
  const id = valueID;
  const [permitDetails, setPermitDetails] = useState$1({
    performerRole: "",
    performingPersonInCharge: "",
    workDescription: "",
    equipmentToolsMaterials: "",
    location: {
      locationArea: "",
      location: ""
    },
    workArea: "",
    from_time: "",
    to_time: ""
  });
  useEffect$1(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }
    getPermitDetails();
  }, [valueID]);
  return jsx("div", {
    className: "popup-overlay",
    children: jsxs("div", {
      className: "popup-modal",
      children: [jsxs("div", {
        className: "flex-between",
        children: [jsx("h3", {
          className: "float-left",
          children: "Permit Details"
        }), jsx("button", {
          className: "close-button",
          onClick: setModalOpen,
          children: "×"
        })]
      }), jsxs("div", {
        className: "popup-content",
        children: [jsx("br", {}), jsx("div", {
          className: "app-section__lg-table popup-lg-table",
          children: jsxs(Table, {
            children: [jsx(TableHead, {
              children: jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Header"
                }), jsx(TableCell, {
                  children: "Description"
                })]
              })
            }), jsxs(TableBody, {
              children: [jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Role"
                }), jsx(TableCell, {
                  children: permitDetails == null ? void 0 : permitDetails.performerRole
                })]
              }), jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Performing Person / Person In Charge"
                }), jsx(TableCell, {
                  children: permitDetails == null ? void 0 : permitDetails.performingPersonInCharge
                })]
              }), jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Work Details"
                }), jsx(TableCell, {
                  children: permitDetails == null ? void 0 : permitDetails.workDescription
                })]
              }), jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Equipment / Tools / Materials"
                }), jsx(TableCell, {
                  children: permitDetails == null ? void 0 : permitDetails.equipmentToolsMaterials
                })]
              }), jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Work Location / Work Area"
                }), jsxs(TableCell, {
                  children: [(_a = permitDetails == null ? void 0 : permitDetails.location) == null ? void 0 : _a.locationArea, " /", " ", permitDetails == null ? void 0 : permitDetails.workArea]
                })]
              }), jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "Permit Valid From - To (Date & Time)"
                }), jsxs(TableCell, {
                  children: [dayjs(permitDetails == null ? void 0 : permitDetails.from_time).format("MMM DD, YYYY"), " /", " ", dayjs(permitDetails == null ? void 0 : permitDetails.to_time).format("MMM DD, YYYY"), " /", " "]
                })]
              })]
            })]
          })
        }), jsx("div", {
          className: "popup-sm-table",
          children: jsx("div", {
            className: "",
            children: jsxs("div", {
              className: "",
              children: [jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Role:"
                }), jsxs("p", {
                  children: [permitDetails == null ? void 0 : permitDetails.performerRole, " "]
                })]
              }), jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Performing Person / Person In Charge"
                }), jsx("p", {
                  children: permitDetails == null ? void 0 : permitDetails.performingPersonInCharge
                })]
              }), jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Work Details"
                }), jsx("p", {
                  children: permitDetails == null ? void 0 : permitDetails.workDescription
                })]
              }), jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Equipment / Tools / Materials"
                }), jsxs("p", {
                  children: [" ", permitDetails == null ? void 0 : permitDetails.equipmentToolsMaterials]
                })]
              }), jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Work Location / Work Area"
                }), jsxs("p", {
                  children: [" ", (_b = permitDetails == null ? void 0 : permitDetails.location) == null ? void 0 : _b.locationArea, " /", " ", permitDetails == null ? void 0 : permitDetails.workArea]
                })]
              }), jsxs("div", {
                className: "",
                children: [jsx("span", {
                  children: "Equipment / Tools / Materials"
                }), jsxs("p", {
                  children: [" ", permitDetails == null ? void 0 : permitDetails.equipmentToolsMaterials]
                })]
              }), jsxs("div", {
                children: [jsx("span", {
                  children: "Permit Valid From - To (Date & Time)"
                }), jsxs("p", {
                  children: [dayjs(permitDetails == null ? void 0 : permitDetails.from_time).format("MMM DD, YYYY"), " /", " ", dayjs(permitDetails == null ? void 0 : permitDetails.to_time).format("MMM DD, YYYY"), " /", " "]
                })]
              })]
            })
          })
        })]
      })]
    })
  });
}
function Module$d() {
  const {
    state
  } = useIssuingActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$b.indexOf(stateAsString) + 1;
  const stateMeta = STEPS$b.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$b.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS$b.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("work_hazards") && jsx(WorkHazards, {}), state.matches("personal_protective_equipment") && jsx(PersonalProtectiveEquipment, {}), state.matches("firefighting_equipment") && jsx(FireFightingEquipment, {}), state.matches("selected_documents") && jsx(Documents, {}), state.matches("document_uploads") && jsx(FinalUpload, {}), state.matches("mechanical_precaution") && jsx(MechanicalIsolation, {}), state.matches("electrical_precaution") && jsx(ElectricalIsolation, {}), state.matches("submit") && jsx(Submit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$b = ["work_hazards", "personal_protective_equipment", "firefighting_equipment", "selected_documents", "document_uploads", "mechanical_precaution", "electrical_precaution", "submit"];
function ProcessIssuingPermit({}) {
  return jsx(PermitProvider$2, {
    children: jsx(RoleProvider, {
      children: jsx(Module$d, {})
    })
  });
}
function useCountdown(fromDate, fromTime, permitShiftType) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const combineDateAndTime = (date, time) => {
      const datePart = new Date(date).toISOString().split("T")[0];
      const timePart = new Date(time).toISOString().split("T")[1];
      return /* @__PURE__ */ new Date(`${datePart}T${timePart}`);
    };
    const startDateTime = combineDateAndTime(fromDate, fromTime);
    const shiftHours = permitShiftType === "TWELVE_HOUR" ? 12 : 24;
    const endDateTime = new Date(startDateTime.getTime() + shiftHours * 60 * 60 * 1e3);
    if (isNaN(startDateTime.getTime())) {
      console.error("Invalid fromDate or fromTime provided");
      return;
    }
    const intervalId = setInterval(() => {
      const now = /* @__PURE__ */ new Date();
      const timeDifference = endDateTime.getTime() - now.getTime();
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        const hours = Math.floor(timeDifference / (1e3 * 60 * 60));
        const minutes = Math.floor(timeDifference % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(timeDifference % (1e3 * 60) / 1e3);
        setTimeLeft({
          hours,
          minutes,
          seconds
        });
      }
    }, 1e3);
    return () => clearInterval(intervalId);
  }, [fromDate, fromTime, permitShiftType]);
  return timeLeft;
}
const CountdownTimer = ({
  fromDate,
  fromTime,
  permitShiftType
}) => {
  const {
    hours,
    minutes,
    seconds
  } = useCountdown(fromDate, fromTime, permitShiftType);
  return jsx("div", {
    children: jsxs("h4", {
      class: "countdown-timer",
      children: [hours, " h : ", minutes, " m : ", seconds, " s"]
    })
  });
};
function Monitoring({}) {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = ["All Status", "APPROVED", "REVALIDATION_INITIATED", "CLOSURE_INITIATED"];
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];
  const {
    updatePermit
  } = usePermitDetails();
  const {
    response,
    isLoading
  } = useRequest(getAllPermits, {}, true);
  async function getPermitDetails(id) {
    const permitResponse = await createRequest(`/permit/${id}`, "GET");
    const permitData = permitResponse[0].data;
    updatePermit(permitData);
  }
  const handleItemClick = (item) => {
    getPermitDetails(item.id);
    route("monitoring-details");
  };
  const truncateText = (text, maxLength) => {
    if (!text)
      return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const monitoring = (response == null ? void 0 : response.data) || [];
  const filteredMonitoring = monitoring.filter((permit) => {
    var _a, _b;
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = ((_a = permit.workArea) == null ? void 0 : _a.toLowerCase()) || "";
    const entrustedCompany = ((_b = permit.entrustedCompany) == null ? void 0 : _b.name.toLowerCase()) || "";
    const isSearchMatch = ptwID.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase()) || workArea.includes(searchTerm.toLowerCase()) || entrustedCompany.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const isWorkTypeMatch = selectedWorkType === "All Work Types" || type === selectedWorkType;
    const isStatus = selectedStatus === "All Status" || permit.status === selectedStatus;
    return isSearchMatch && isWorkTypeMatch && isStatus;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredMonitoring.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Monitoring"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search permits",
        onSearch: setSearchTerm
      }), jsx("br", {}), jsxs("div", {
        className: "app-section__filters",
        children: [jsx("span", {
          className: "base-date-filter--secondary",
          children: "Filter by:"
        }), jsxs("div", {
          className: "sm-grid-cols-2 app-section__filters",
          children: [jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedStatus
            }), jsx(DropdownContent, {
              children: statusOptions.map((option) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedStatus(option),
                children: option
              }, option))
            })]
          }), jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedWorkType
            }), jsx(DropdownContent, {
              children: work_types.map((type) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedWorkType(type),
                children: type
              }, type))
            })]
          })]
        })]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "PTW ID."
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Work To Be Performed"
              }), jsx(TableCell, {
                children: "Work Location"
              }), jsx(TableCell, {
                children: "Company"
              }), jsx(TableCell, {
                children: "Time Remaining"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.filter((data) => data.status !== "NOT_STARTED" && data.status !== "CANCELED" && data.status !== "CLOSED").map((data) => {
              var _a, _b;
              return jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: data.publicId
                }), jsx(TableCell, {
                  children: convertSnakeCaseToTitleCase(data.type)
                }), jsx(TableCell, {
                  children: truncateText(data.workDescription, 45)
                }), jsxs(TableCell, {
                  children: [(_a = data.location) == null ? void 0 : _a.locationArea, " / ", data.workArea]
                }), jsx(TableCell, {
                  children: (_b = data == null ? void 0 : data.entrustedCompany) == null ? void 0 : _b.name
                }), jsx(TableCell, {
                  children: jsx(CountdownTimer, {
                    fromDate: data.fromDate,
                    fromTime: data.fromTime,
                    permitShiftType: data.permitShiftType
                  })
                }), jsx(TableCell, {
                  children: jsx(Button, {
                    onClick: () => handleItemClick(data),
                    children: "View"
                  })
                })]
              }, data.id);
            })
          })]
        })
      }), jsxs("div", {
        className: "app-section__sm-table",
        children: [jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.map((dataItem) => dataItem.status !== "NOT_STARTED" && jsxs("div", {
              className: "container",
              onClick: () => handleItemClick(dataItem),
              children: [jsxs("div", {
                className: "location-flex",
                children: [jsx("p", {
                  children: dataItem.publicId
                }), jsx("h6", {
                  className: "gray",
                  children: convertSnakeCaseToTitleCase(dataItem.type)
                })]
              }), jsx("p", {
                children: truncateText(dataItem.workDescription, 45)
              }), jsx("div", {
                className: "location-flex",
                children: jsxs("div", {
                  className: "items-center",
                  children: [jsx("p", {
                    className: "gray",
                    children: "Time Remaining:"
                  }), jsx("h6", {
                    className: "countdown-timer",
                    children: jsx(CountdownTimer, {
                      fromDate: dataItem.fromDate,
                      fromTime: dataItem.fromTime,
                      permitShiftType: dataItem.permitShiftType
                    })
                  })]
                })
              })]
            }, dataItem.id))
          })
        }), filteredMonitoring.length > 1 && jsx(Pagination, {
          totalItems: filteredMonitoring.length,
          itemsPerPage,
          currentPage,
          onPageChange: setCurrentPage
        })]
      }), !filteredMonitoring.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg",
          alt: "No Permits"
        }), jsx("p", {
          children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
        })]
      })]
    })]
  });
}
function AddOnsiteComments() {
  const permit = [];
  if (permit.length === 0) {
    return jsxs("div", {
      className: "base-empty",
      children: [jsx("img", {
        src: "/svgs/comments.svg"
      }), jsxs("p", {
        children: ["No notes or comments yet.", jsx("br", {}), "Click the button below to add a note"]
      }), jsxs(Button, {
        variant: "primary",
        dimension: "md",
        href: `/add-onsite-comments`,
        children: [jsx(Icon, {
          name: "plus"
        }), "Add Onsite Note"]
      })]
    });
  }
  return jsxs("div", {
    className: "app-section",
    children: [jsxs(Button, {
      variant: "primary",
      dimension: "md",
      href: `/add-onsite-comments`,
      children: [jsx(Icon, {
        name: "plus"
      }), "Add Onsite Note"]
    }), jsx("br", {}), jsx("br", {}), jsxs(Accordion, {
      show: true,
      title: "All Notes",
      children: [jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      }), jsx(AccordionGap, {}), jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      }), jsx(AccordionGap, {}), jsx(AccordionItem, {
        title: "Date",
        value: ""
      }), jsx(AccordionItem, {
        title: "Posted by",
        value: ""
      }), jsx(AccordionItem, {
        title: "Note / Comments",
        value: ""
      })]
    })]
  });
}
function MonitoringDetailsIndex({}) {
  const [userRole, setUserRole] = useState();
  const {
    valueID
  } = useIDContext();
  const id = valueID;
  const {
    profile
  } = useUserContext();
  useEffect(() => {
    async function getPermitDetails() {
      var _a;
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      const userRole2 = (_a = permitData == null ? void 0 : permitData.permitRoles) == null ? void 0 : _a[profile == null ? void 0 : profile.id];
      console.log(userRole2);
      setUserRole(userRole2);
    }
    getPermitDetails();
  }, [id, profile == null ? void 0 : profile.id]);
  const {
    tabs,
    activeTab
  } = useTabs(["PTW Details", "Action History", "Onsite Notes & Comments"]);
  const {
    permit
  } = usePermitDetails();
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  const [closurePopup, setClosurePopup] = useState(false);
  const [revalidatePopup, setRevalidatePopup] = useState(false);
  const [isrevalidate, setIsRevalidate] = useState(false);
  const handleClosurePopup = (value) => {
    setClosurePopup(value);
  };
  const handleRevalidatePopup = (value) => {
    setIsRevalidate(true);
    setRevalidatePopup(value);
  };
  const {
    makeRequest
  } = useRequest(isrevalidate ? requestPermitRevalidation : requestPermitClosure);
  async function handleRequest(id2) {
    console.log(id2);
    const [_, err] = await makeRequest(id2);
    if (err) {
      return toast({
        variant: "error",
        message: err.message
      });
    } else {
      toast({
        variant: "success",
        message: "Successful"
      });
    }
    setClosurePopup(false);
    setRevalidatePopup(false);
    route("/permit-management");
  }
  const [reactivatePermitPopup, setReactivatePermitPopup] = useState(false);
  const handleReactivate = () => {
    setReactivatePermitPopup(true);
  };
  const handleReactivePermit = async () => {
    var _a;
    const id2 = permit == null ? void 0 : permit.id;
    try {
      const response = await createRequest(`/permit/reactivate/${id2}`, "PUT");
      console.log(response);
      toast({
        variant: "success",
        message: "Permit reactivated successfully."
      });
    } catch (error) {
      toast({
        variant: "error",
        message: ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.error) ?? "Failed to reactivate permit."
      });
    }
    setReactivatePermitPopup(false);
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Monitoring"
    }), jsx("div", {
      className: "countdown-status",
      children: jsxs("div", {
        className: "",
        children: [jsx("p", {
          className: "countdown-status__title",
          children: "Countdown to Automatic Revalidation"
        }), jsx("h5", {
          className: "countdown-status__timer",
          children: jsx(Fragment$1, {
            children: (permit == null ? void 0 : permit.status) === "CANCELED" || (permit == null ? void 0 : permit.status) === "CLOSED" ? jsx("p", {
              children: "00 h : 00 m : 00 s"
            }) : jsx(CountdownTimer, {
              fromDate: permit == null ? void 0 : permit.fromDate,
              fromTime: permit == null ? void 0 : permit.fromTime,
              permitShiftType: permit == null ? void 0 : permit.permitShiftType
            })
          })
        })]
      })
    }), jsx("div", {
      className: "app-permit__sections",
      children: jsx("div", {
        className: "actions",
        children: (permit == null ? void 0 : permit.type) === "HOT_WORK" ? jsx(Fragment$1, {
          children: userRole === "PERFORMING_SUPERVISOR" && jsxs("div", {
            className: "closure",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Request For Closure"
              }), jsx("p", {
                children: "Click the button to request closure for this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleClosurePopup(true),
              children: [jsx(Icon, {
                name: "export"
              }), "Request Closure"]
            })]
          })
        }) : (permit == null ? void 0 : permit.status) === "SUSPENDED" && (permit == null ? void 0 : permit.suspenderId) === (profile == null ? void 0 : profile.id) ? jsx(Fragment$1, {
          children: jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Permit Suspended"
              }), jsx("p", {
                children: "Click the button to reactive this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleReactivate(),
              children: [jsx(Icon, {
                name: "export"
              }), "Reactivate Permit"]
            })]
          })
        }) : jsx(Fragment$1, {
          children: userRole === "PERFORMING_SUPERVISOR" && jsxs("div", {
            className: "print",
            children: [jsxs("div", {
              children: [jsx("h4", {
                children: "Request For Revalidation"
              }), jsx("p", {
                children: "Click the button to request validation for this permit"
              }), " "]
            }), jsxs("button", {
              className: "flex-center",
              onClick: () => handleRevalidatePopup(true),
              children: [jsx(Icon, {
                name: "export"
              }), "Revalidate Permit"]
            })]
          })
        })
      })
    }), jsx(ReusableTabs, {
      tabs,
      counts,
      className: "app-permit__tabs"
    }), activeTab === "PTW Details" && jsx(WorkAuthoriesFlow, {}), activeTab === "Action History" && jsx(PermitActionHistory, {}), activeTab === "Onsite Notes & Comments" && jsx(AddOnsiteComments, {}), jsx("div", {
      className: "",
      children: closurePopup && jsx(PopupModal, {
        icon: jsx("img", {
          src: ""
        }),
        title: "Request Closure of Permit",
        message: "",
        onClose: () => setClosurePopup(false),
        primaryButton: {
          label: "Request Closure",
          onClick: () => handleRequest(permit == null ? void 0 : permit.id),
          color: "#371071"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => handleClosurePopup(false),
          color: "#E86E18"
        }
      })
    }), jsx("div", {
      className: "",
      children: revalidatePopup && jsx(PopupModal, {
        icon: jsx("img", {
          src: ""
        }),
        title: "Request Revalidation of Permit",
        message: "",
        onClose: () => setRevalidatePopup(false),
        primaryButton: {
          label: "Request Revalidation",
          onClick: () => handleRequest(permit == null ? void 0 : permit.id),
          color: "#81374C"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => handleRevalidatePopup(false),
          color: "#E86E18"
        }
      })
    }), jsx("div", {
      className: "",
      children: reactivatePermitPopup && jsx(PopupModal, {
        icon: jsx("img", {
          src: "/svgs/reactivate.svg"
        }),
        title: "Reactivate Permit",
        message: "Are you sure you want to reactivate this permit? This action cannot be undone.",
        onClose: () => setReactivatePermitPopup(false),
        primaryButton: {
          label: "Confirm",
          onClick: handleReactivePermit,
          color: "#008171"
        },
        secondaryButton: {
          label: "Cancel",
          onClick: () => setReactivatePermitPopup(false),
          color: "#E86E18"
        }
      })
    })]
  });
}
function PerformingAuthActivities({
  response
}) {
  var _a, _b, _c, _d, _e;
  const details = response;
  const hazardsArray = (details == null ? void 0 : details.permitHazards) && details.permitHazards.length > 0 ? details.permitHazards[0] : null;
  const documentsArray = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments[0] : null;
  const documentObject = (documentsArray == null ? void 0 : documentsArray.document) || {};
  const items = [{
    section: "A",
    header: "Work Type",
    content: [{
      id: 1,
      title: "Permit Type",
      info: (details == null ? void 0 : details.type) || ""
    }, {
      id: 2,
      title: "Permit ID",
      info: (details == null ? void 0 : details.publicId) || ""
    }, {
      id: 3,
      title: "Status / Authority",
      info: `${details == null ? void 0 : details.status} / ${details == null ? void 0 : details.currentAuthority}` || ""
    }]
  }, {
    section: "B",
    header: "Permit Details",
    content: [{
      id: 1,
      title: "Role",
      info: details == null ? void 0 : details.performerRole
    }, {
      id: 2,
      title: "Performing Person / Person In Charge",
      info: details == null ? void 0 : details.performingPersonInCharge
    }, {
      id: 3,
      title: "Work Details",
      info: details == null ? void 0 : details.workDescription
    }, {
      id: 4,
      title: "Equipment / Tools / Materials",
      info: details == null ? void 0 : details.equipmentToolsMaterials
    }, {
      id: 5,
      title: "Work Location / Work Area",
      info: `${(_a = details == null ? void 0 : details.location) == null ? void 0 : _a.locationArea} / ${details == null ? void 0 : details.workArea}`
    }, {
      id: 6,
      title: "Permit Valid From - To (Date & Time)",
      info: `${details == null ? void 0 : details.fromDate} /  ${details == null ? void 0 : details.fromTime} - ${details == null ? void 0 : details.toDate}  / ${details == null ? void 0 : details.toTime}`
    }]
  }, {
    section: "C",
    header: "Company Details",
    content: [{
      id: 1,
      title: "Entrusted Company",
      info: (_b = details == null ? void 0 : details.entrustedCompany) == null ? void 0 : _b.name
    }, {
      id: 2,
      title: "Executing Company",
      info: (_c = details == null ? void 0 : details.executingCompany) == null ? void 0 : _c.name
    }, {
      id: 3,
      title: "Performing Department",
      info: details == null ? void 0 : details.performingDepartment
    }, {
      id: 4,
      title: "Contact Phone Number",
      info: details == null ? void 0 : details.contractorPhoneNumber
    }]
  }, {
    section: "D",
    header: "Hazard Identification",
    content: [{
      id: 1,
      title: "Describe the potential hazards",
      info: ((_d = hazardsArray == null ? void 0 : hazardsArray.hazard) == null ? void 0 : _d.potentialHazardDescription) || ""
    }]
  }];
  const documents = [{
    section: "E",
    header: "Document Uploads",
    content: []
  }];
  const selectedHazards = (hazardsArray == null ? void 0 : hazardsArray.hazard) || {};
  const renderHazards = () => {
    return HAZARDS$2.filter((hazard) => selectedHazards.hasOwnProperty(hazard.value)).map((hazard) => jsx("div", {
      className: "hazard-item",
      children: jsxs("p", {
        children: [jsx("span", {
          class: "hazard-value",
          children: selectedHazards[hazard.value] ? "YES" : "NO"
        }), " ", "- ", hazard.text]
      })
    }, hazard.value));
  };
  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);
    return documentEntries.map(([key, value]) => {
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return null;
      }
      if (key.includes("Type")) {
        return jsxs("div", {
          className: "document-item",
          children: [jsx("div", {
            className: "section__content__document_section",
            children: jsx("p", {
              className: "section__header",
              children: key.replace(/([A-Z])/g, " $1").toUpperCase()
            })
          }), jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Upload Option"
              })
            }), jsxs("p", {
              children: [" ", value || "No document provided"]
            })]
          })]
        }, key);
      }
      return jsx("div", {
        className: "document-item",
        children: jsx(Fragment$1, {
          children: jsxs("div", {
            className: "section__content",
            children: [jsx("p", {
              className: "document",
              children: jsx("span", {
                children: "Document"
              })
            }), jsxs("p", {
              className: "document_item",
              children: [value, jsx("span", {
                children: jsx("img", {
                  src: "/svgs/document_download.svg",
                  alt: ""
                })
              })]
            })]
          })
        })
      }, key);
    });
  };
  return jsxs("div", {
    className: "app-permit__sections",
    children: [jsx("br", {}), items.map((item) => jsx(Section, {
      type: "Primary",
      header: item.header,
      children: item.content,
      section: item.section
    })), jsx("div", {
      className: "section",
      children: jsxs("div", {
        className: "section__content",
        children: [jsx("p", {
          className: "title",
          children: "Identification of potential hazards"
        }), jsx("p", {
          className: "info",
          children: Object.keys(selectedHazards).length > 0 ? renderHazards() : jsx("p", {
            children: "No hazards selected."
          })
        })]
      })
    }), jsx(Section, {
      type: "Secondary",
      header: "Documents",
      children: documents[0],
      section: (_e = documents[0]) == null ? void 0 : _e.section
    }), jsx("div", {
      className: "section",
      children: jsx("div", {
        className: "",
        children: jsx("p", {
          className: "info",
          children: Object.keys(documentObject).length > 0 ? renderDocuments() : jsx("p", {
            children: "No documents uploaded."
          })
        })
      })
    }), jsx("br", {})]
  });
}
function RevalidatePermitIndex({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["Performing Auth.", "Issuing Auth", "HSE Auth", "Authorizing Auth", "Perf. Auth. Supervisor", "Safety Officer", "Issuing. Auth. Supervisor"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  const handleNavigate = () => {
    route("/revalidate-perf-auth");
  };
  return jsxs(Fragment$1, {
    children: [" ", jsx(Header, {
      title: "Activities"
    }), jsx("br", {}), jsx("div", {
      className: "app-permit__sections",
      children: jsx("div", {
        className: "actions",
        children: jsxs("div", {
          className: "print",
          children: [jsxs("div", {
            children: [jsx("h4", {
              children: "Revalidation Requested"
            }), jsx("p", {
              children: "Click the button to process the revalidate of this permit"
            }), " "]
          }), jsxs("button", {
            className: "flex-center",
            onClick: handleNavigate,
            children: [jsx(Icon, {
              name: "process"
            }), "Process Revalidation"]
          })]
        })
      })
    }), jsx("br", {}), jsxs("div", {
      className: "app-authorities",
      children: [jsx(ReusableTabs, {
        tabs,
        counts,
        className: "app-authorities__tabs"
      }), jsxs("div", {
        className: "app-authorities__content",
        children: [activeTab === "Performing Auth." && jsx(PerformingAuthActivities, {}), activeTab === "Issuing Auth" && jsx(IssuingAuthorities, {}), activeTab === "HSE Auth" && jsx(HSEAuthority, {}), activeTab === "Authorizing Auth" && jsx(AuthAuthority, {}), activeTab === "Perf. Auth. Supervisor" && jsx(PerfAuthSupervisor, {}), activeTab === "Safety Officer" && jsx(SafetyOfficer, {}), activeTab === "Issuing. Auth. Supervisor" && jsx(IssuAuthSupervisor, {})]
      })]
    })]
  });
}
function Verification() {
  const {
    state,
    send
  } = usePerfRevalidationContext();
  const onSubmit = () => {
    send("submit", {
      data: {
        verification: {
          revalidateWorkAreaConfirmation: true
        }
      }
    });
  };
  const {
    values,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$o,
    initialValues: {
      ...state.context.verification
    },
    onSubmit
  });
  const currentPath = window.location.pathname;
  return jsx("div", {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      children: [currentPath === "/revalidate-safety-officer" || currentPath === "/revalidate-issuing-supervisor" ? jsxs("label", {
        class: "verification",
        children: [jsx(Radio, {
          checked: values.consentGiven,
          onChange: (e) => {
            values.consentGiven = e.target.value;
          }
        }), jsx("p", {
          children: "Confirm work area is safe to commence work"
        })]
      }) : jsxs(Fragment$1, {
        children: [jsxs("label", {
          class: "verification",
          children: [jsx(Radio, {
            checked: values.consentGiven,
            onChange: (e) => {
              values.consentGiven = e.target.value;
            }
          }), jsxs("p", {
            children: ["Confirm work area is checked and everything is safe to", " ", jsx("span", {
              className: "close",
              children: "Close"
            }), " permit"]
          })]
        }), jsxs("label", {
          class: "verification",
          children: [jsx(Radio, {
            checked: values.consentGiven,
            onChange: (e) => {
              values.consentGiven = e.target.value;
            }
          }), jsxs("p", {
            children: ["Confirm work area is checked and everything is safe to", " ", jsx("span", {
              className: "revalidate",
              children: "Revalidate"
            }), "permit"]
          })]
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activities";
          },
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$o = Yup.object({});
function SelectDocuments({}) {
  const {
    state,
    send
  } = usePerfRevalidationContext();
  const onSubmit = (selected_documents) => {
    send("submit", {
      data: {
        selected_documents
      }
    });
  };
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$n,
    initialValues: {
      documents: {},
      ...state.context.selected_documents
      // permit_type: state.context.permit_type,
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  const currentPath = window.location.pathname;
  const documentOptions2 = currentPath === "/closure-safety-officer" || currentPath === "/closure-perf-auth" || currentPath === "/closure-issuing-supervisor" ? ["Tool Box Stock Doc"] : ["Tool Box Stock Doc", "Radiography Cert", "Confined Space Cert", "Gas Testing Cert"];
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        children: "Select the document you want to upload below"
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: documentOptions2 == null ? void 0 : documentOptions2.map((document2, index) => jsxs("div", {
          className: "",
          children: [jsxs("label", {
            className: "app-register__attachment-form items-center",
            children: [jsx(Checkbox, {
              checked: !!(values.documents && values.documents[document2]),
              onChange: () => updateDocuments(document2, !values.documents[document2])
            }), jsx("span", {
              children: document2
            })]
          }), jsx(Select, {
            ...getFieldProps(`document_${document2}`),
            options: [{
              text: "Manual Upload",
              value: "manual"
            }]
          }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
            className: "error",
            style: {
              color: "red"
            },
            children: "Please select an option for the selected document."
          })]
        }, index))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$n = Yup.object().shape({
  documents: Yup.object().test("document-selection-validation", "Please select a corresponding dropdown option for all selected documents.", (documents, context) => {
    const selectedDocuments = Object.entries(documents || {}).filter(([_, checked]) => checked);
    return selectedDocuments.every(([document2]) => !!context.parent[`document_${document2}`]);
  })
});
function PerfUploadDocuments({}) {
  const {
    send,
    state
  } = usePerfRevalidationContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    validationSchema: validationSchema$m,
    onSubmit
  });
  const [uploadedURLs, setUploadedURLs] = useState({});
  const selectedPreviously = state.context.selected_documents;
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$m = Yup.object({});
function PerfRevalidationSubmit() {
  const currentPath = window.location.pathname;
  const {
    state
  } = usePerfRevalidationContext();
  const {
    makeRequest
  } = useRequest(currentPath === "/revalidate-safety-officer" ? approveRevalidationSafetyOfficer : approveRevalidationPerfSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        revalidateWorkAreaConfirmation: state.context.verification.revalidateWorkAreaConfirmation,
        documents
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to revalidate this permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit Revalidation successful"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$c() {
  var _a;
  const {
    state
  } = usePerfRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$a.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Revalidate Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$a.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$a.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(Verification, {}), state.matches("selected_documents") && jsx(SelectDocuments, {}), state.matches("document_uploads") && jsx(PerfUploadDocuments, {}), state.matches("submit") && jsx(PerfRevalidationSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$a = ["verification", "selected_documents", "document_uploads", "submit"];
function RevalidatePerfAuth({}) {
  return jsx(RevalidationProvider, {
    children: jsx(Module$c, {})
  });
}
function Module$b() {
  var _a;
  const {
    state
  } = usePerfRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$9.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Revalidate Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$9.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$9.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(Verification, {}), state.matches("selected_documents") && jsx(SelectDocuments, {}), state.matches("document_uploads") && jsx(PerfUploadDocuments, {}), state.matches("submit") && jsx(PerfRevalidationSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$9 = ["verification", "selected_documents", "document_uploads", "submit"];
function RevalidateSafetyOfficer({}) {
  return jsx(RevalidationProvider, {
    children: jsx(Module$b, {})
  });
}
const IssuingSupervisorRevalidationMachine = createMachine({
  context: {
    verification: {
      revalidateWorkAreaConfirmation: false
    },
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    tool_kit_time: {
      toolBoxPosition: "",
      toolBoxLeaderIdentity: "",
      from_time: "",
      issuingAuthoritySupervisorTimeAdjustment: false
    }
  },
  predictableActionArguments: true,
  initial: "verification",
  states: {
    verification: {
      meta: {
        title: "Take Commitment",
        section: "A"
      },
      on: {
        submit: {
          target: "selected_documents",
          actions: ["updateContext"]
        }
      }
    },
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "B"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        },
        go_back: "verification"
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "C"
      },
      on: {
        submit: [{
          target: "tool_kit_time",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    tool_kit_time: {
      meta: {
        title: "Tool - Box Talk Details"
      },
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context$2 = createContext({});
function IssuingRevalidationProvider({
  children
}) {
  const [state, send, service] = useMachine(IssuingSupervisorRevalidationMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$2.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function useIssuingSupervisorRevalidationContext() {
  return useContext(Context$2);
}
function IssuingVerification() {
  const {
    state,
    send
  } = useIssuingSupervisorRevalidationContext();
  const onSubmit = (selected_documents) => {
    send("submit", {
      data: {
        selected_documents
      }
    });
  };
  const {
    values,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$l,
    initialValues: {
      ...state.context.additional_values
      // permit_type: state.context.permit_type,
    },
    onSubmit
  });
  return jsx("div", {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsxs("label", {
        class: "verification",
        children: [jsx(Radio, {
          checked: values.consentGiven
        }), jsx("p", {
          children: "Confirm work area is safe to commence work"
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activities";
          },
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$l = Yup.object({});
const documentOptions = ["Tool Box Stock Doc", "Radiography Cert", "Confined Space Cert", "Gas Testing Cert"];
function IssuingSelectDocuments({}) {
  const {
    state,
    send
  } = useIssuingSupervisorRevalidationContext();
  const onSubmit = (selected_documents) => {
    send("submit", {
      data: {
        selected_documents
      }
    });
  };
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$k,
    initialValues: {
      documents: {},
      ...state.context.selected_documents
      // permit_type: state.context.permit_type,
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        children: "Select the document you want to upload below"
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: documentOptions == null ? void 0 : documentOptions.map((document2, index) => jsxs("div", {
          className: "",
          children: [jsxs("label", {
            className: "app-register__attachment-form items-center",
            children: [jsx(Checkbox, {
              checked: !!(values.documents && values.documents[document2]),
              onChange: () => updateDocuments(document2, !values.documents[document2])
            }), jsx("span", {
              children: document2
            })]
          }), jsx(Select, {
            ...getFieldProps(`document_${document2}`),
            options: [{
              text: "Manual Upload",
              value: "manual"
            }]
          }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
            className: "error",
            style: {
              color: "red"
            },
            children: "Please select an option for the selected document."
          })]
        }, index))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$k = Yup.object().shape({
  documents: Yup.object().test("document-selection-validation", "Please select a corresponding dropdown option for all selected documents.", (documents, context) => {
    const selectedDocuments = Object.entries(documents || {}).filter(([_, checked]) => checked);
    return selectedDocuments.every(([document2]) => !!context.parent[`document_${document2}`]);
  })
});
function IssuingUploadDocuments({}) {
  const {
    send,
    state
  } = useIssuingSupervisorRevalidationContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    validationSchema: validationSchema$j,
    onSubmit
  });
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const selectedPreviously = state.context.selected_documents;
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$j = Yup.object({});
function IssuingToolKitTime() {
  const {
    state,
    send
  } = useIssuingSupervisorRevalidationContext();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$i,
    initialValues: {
      ...state.context.tool_kit_time
    },
    onSubmit
  });
  function onSubmit(tool_kit_time) {
    send("submit", {
      data: {
        tool_kit_time
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__form",
    children: [jsx("p", {
      children: "Fill in the fields below to update the toolbox stock form"
    }), jsx("br", {}), jsxs("div", {
      className: "app-register__form-grid",
      children: [jsx(Input, {
        label: "Identity Leader",
        placeholder: "Enter fullname",
        ...getFieldProps("toolBoxLeaderIdentity")
      }), jsx(Input, {
        label: "Position",
        placeholder: "Enter position",
        ...getFieldProps("toolBoxPosition")
      })]
    }), jsx("h4", {
      children: "Adjust Time"
    }), jsx("p", {
      children: "Kindly re-djust the date & time as appropriate (Optional)"
    }), jsx("div", {
      className: "",
      children: jsxs("div", {
        className: "get-current-date",
        children: [jsx("p", {
          children: "Current Permit Start - End Date & Time:"
        }), jsx("span", {
          children: "17 / 04 / 2022 08:00 AM - 17 / 04 / 2022 08:00 AM"
        })]
      })
    }), jsx("div", {
      className: "",
      children: jsxs("div", {
        className: "",
        children: [jsxs("div", {
          className: "",
          children: [jsx("h4", {
            children: "Edit Start Time"
          }), jsxs("p", {
            class: "edit-start-time",
            children: ["The time your are selecting must be more than the current time:", jsx("span", {
              children: "11:54:00PM"
            })]
          })]
        }), jsx("br", {}), jsx(Input, {
          label: "Time",
          type: "time",
          placeholder: "00:00AM",
          ...getFieldProps("from_time")
        })]
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Back"
      }), jsx(Button, {
        variant: "primary",
        children: "SUBMIT"
      }), " "]
    })]
  });
}
const validationSchema$i = Yup.object({
  // from_date: Yup.string().required("From date is required"),
  // to_date: Yup.string().required("To date is required"),
  // from_time: Yup.string().required("From time is required"),
  // to_time: Yup.string().required("To time is required"),
  // // cold work fields
});
function IssuingRevalidationSubmit() {
  const {
    state
  } = useIssuingSupervisorRevalidationContext();
  const {
    makeRequest
  } = useRequest(approveRevalidationIssuingSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      var _a, _b, _c, _d;
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        revalidateWorkAreaConfirmation: (_a = state.context.verification) == null ? void 0 : _a.revalidateWorkAreaConfirmation,
        toolBoxLeaderIdentity: (_b = state.context.tool_kit_time) == null ? void 0 : _b.toolBoxLeaderIdentity,
        toolBoxPosition: (_c = state.context.tool_kit_time) == null ? void 0 : _c.toolBoxPosition,
        issuingAuthoritySupervisorTimeAdjustment: ((_d = state.context.tool_kit_time) == null ? void 0 : _d.startTime) === "" ? false : true,
        startTime: (
          //   state.context.tool_kit_time?.startTime
          "1970-01-01T00:00:00Z"
        ),
        // formatDateForBackend(
        //     state.context.tool_kit_time?.startTime || ""
        //   )
        documents
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to revalidate this permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit Revalidation Successful"
      });
      setLoading(false);
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$a() {
  var _a;
  const {
    state
  } = useIssuingSupervisorRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$8.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Revalidate Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$8.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$8.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(IssuingVerification, {}), state.matches("selected_documents") && jsx(IssuingSelectDocuments, {}), state.matches("document_uploads") && jsx(IssuingUploadDocuments, {}), state.matches("tool_kit_time") && jsx(IssuingToolKitTime, {}), state.matches("submit") && jsx(IssuingRevalidationSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$8 = ["verification", "selected_documents", "document_uploads", "tool_kit_time", "submit"];
function RevalidateIssuingSupervisor({}) {
  return jsx(IssuingRevalidationProvider, {
    children: jsx(Module$a, {})
  });
}
function ClosurePermitIndex({}) {
  const {
    valueID,
    setID
  } = useIDContext();
  const id = valueID;
  const [permitDetails, setPermitDetails] = useState({});
  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
      setID(permitData.id);
    }
    getPermitDetails();
  }, [valueID]);
  const {
    tabs,
    activeTab
  } = useTabs(["Performing Auth.", "Issuing Auth", "HSE Auth", "Authorizing Auth", "Perf. Auth. Supervisor", "Safety Officer", "Issuing. Auth. Supervisor"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  const handleNavigate = (data) => {
    switch (data.currentAuthority) {
      case "PERFORMING_SUPERVISOR":
        route("/closure-perf-auth");
        break;
      case "SAFETY_OFFICER":
        route("/closure-safety-officer");
        break;
      case "ISSUING_SUPERVISOR":
        route("/closure-issuing-supervisor");
        break;
      default:
        route("/closure-perf-auth");
        break;
    }
  };
  return jsxs(Fragment$1, {
    children: [" ", jsx(Header, {
      title: "Activities"
    }), jsx("br", {}), jsx("div", {
      className: "app-permit__sections",
      children: jsx("div", {
        className: "actions",
        children: jsxs("div", {
          className: "closure",
          children: [jsxs("div", {
            children: [jsx("h4", {
              children: "Closure Requested"
            }), jsx("p", {
              children: "Click the button to process the closure of this permit"
            }), " "]
          }), jsxs("button", {
            className: "flex-center",
            onClick: () => handleNavigate(permitDetails),
            children: [jsx(Icon, {
              name: "process"
            }), "Process Closure"]
          })]
        })
      })
    }), jsx("br", {}), jsxs("div", {
      className: "app-authorities",
      children: [jsx(ReusableTabs, {
        tabs,
        counts,
        className: "app-authorities__tabs"
      }), jsxs("div", {
        className: "app-authorities__content",
        children: [activeTab === "Performing Auth." && jsx(PerformingAuthActivities, {}), activeTab === "Issuing Auth" && jsx(IssuingAuthorities, {}), activeTab === "HSE Auth" && jsx(HSEAuthority, {}), activeTab === "Authorizing Auth" && jsx(AuthAuthority, {}), activeTab === "Perf. Auth. Supervisor" && jsx(PerfAuthSupervisor, {}), activeTab === "Safety Officer" && jsx(SafetyOfficer, {}), activeTab === "Issuing. Auth. Supervisor" && jsx(IssuAuthSupervisor, {})]
      })]
    })]
  });
}
function VerificationClosure() {
  const {
    state,
    send
  } = usePerfRevalidationContext();
  const onSubmit = () => {
    send("submit", {
      data: {
        verification: {
          closureWorkAreaConfirmation: true
        }
      }
    });
  };
  const {
    values,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$h,
    initialValues: {
      ...state.context.verification
    },
    onSubmit
  });
  const currentPath = window.location.pathname;
  return jsx("div", {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      children: [currentPath === "/closure-safety-officer" || currentPath === "/closure-issuing-supervisor" ? jsxs("label", {
        className: "verification",
        children: [jsx(Radio, {
          checked: values.consentGiven,
          onChange: (e) => {
            values.consentGiven = e.target.checked;
          }
        }), jsx("p", {
          children: "Confirm work area is safe to commence work"
        })]
      }) : jsx(Fragment$1, {
        children: jsxs("label", {
          className: "verification",
          children: [jsx(Radio, {
            checked: values.consentGiven,
            onChange: (e) => {
              values.consentGiven = e.target.checked;
            }
          }), jsxs("p", {
            children: ["Confirm work area is checked and everything is safe to", " ", jsx("span", {
              className: "close",
              children: "Close"
            }), " permit"]
          })]
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activities";
          },
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          type: "submit",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$h = Yup.object({});
function ClosureUploadDocuments({}) {
  const {
    send,
    state
  } = usePerfRevalidationContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    validationSchema: validationSchema$g,
    onSubmit
  });
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$g = Yup.object({});
function Module$9() {
  var _a;
  const {
    state
  } = usePerfRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$7.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Permit Closure"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$7.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$7.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(VerificationClosure, {}), state.matches("selected_documents") && jsx(SelectDocuments, {}), state.matches("document_uploads") && jsx(ClosureUploadDocuments, {}), state.matches("submit") && jsx(PerfClosureSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$7 = ["verification", "selected_documents", "document_uploads", "submit"];
function ClosurePerfAuth({}) {
  return jsx(RevalidationProvider, {
    children: jsx(Module$9, {})
  });
}
function SafetyClosureSubmit() {
  const {
    state
  } = usePerfRevalidationContext();
  const {
    makeRequest
  } = useRequest(closureSafetyOfficer);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        closureWorkAreaConfirmation: state.context.verification.closureWorkAreaConfirmation,
        documents
      };
      console.log(payload);
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to close permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit closure approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/permit-activities"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$8() {
  var _a;
  const {
    state
  } = usePerfRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$6.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: " Permit Closure"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$6.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$6.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(VerificationClosure, {}), state.matches("selected_documents") && jsx(SelectDocuments, {}), state.matches("document_uploads") && jsx(ClosureUploadDocuments, {}), state.matches("submit") && jsx(SafetyClosureSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$6 = ["verification", "selected_documents", "document_uploads", "submit"];
function ClosureSafetyOfficer({}) {
  return jsx(RevalidationProvider, {
    children: jsx(Module$8, {})
  });
}
function IssuingClosureSubmit() {
  const {
    state
  } = usePerfRevalidationContext();
  const {
    makeRequest
  } = useRequest(closureIssuingSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    permit
  } = usePermitDetails();
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId: permit == null ? void 0 : permit.id,
        closureWorkAreaConfirmation: state.context.verification.closureWorkAreaConfirmation,
        documents
      };
      console.log(payload);
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to close permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit closure approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$7() {
  var _a;
  const {
    state
  } = usePerfRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$5.indexOf(stateAsString) + 1;
  const stateMeta = (_a = Object.values(state.meta)) == null ? void 0 : _a[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Permit Closure"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$5.length]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${currentIdx / STEPS$5.length * 100}%`
              }
            })
          })]
        }), state.matches("verification") && jsx(VerificationClosure, {}), state.matches("selected_documents") && jsx(SelectDocuments, {}), state.matches("document_uploads") && jsx(ClosureUploadDocuments, {}), state.matches("submit") && jsx(IssuingClosureSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$5 = ["verification", "selected_documents", "document_uploads", "submit"];
function ClosureIssuingSupervisor({}) {
  return jsx(RevalidationProvider, {
    children: jsx(Module$7, {})
  });
}
function Storage({}) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];
  const {
    setID
  } = useIDContext();
  const {
    updatePermit
  } = usePermitDetails();
  const {
    response,
    isLoading
  } = useRequest(getAllPermits, {}, true);
  const handleItemClick = (item) => {
    setID(item.id);
    updatePermit(item);
    route("/permit-storage/details");
  };
  const truncateText = (text, maxLength) => {
    if (!text)
      return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const storage = (response == null ? void 0 : response.data) || [];
  const filteredStorage = storage.filter((permit) => {
    var _a, _b;
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = ((_a = permit.workArea) == null ? void 0 : _a.toLowerCase()) || "";
    const entrustedCompany = ((_b = permit.entrustedCompany) == null ? void 0 : _b.name.toLowerCase()) || "";
    const matchesSearch = ptwID.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase()) || workArea.includes(searchTerm.toLowerCase()) || entrustedCompany.includes(searchTerm.toLowerCase()) || searchTerm === "";
    const matchesWorkType = selectedWorkType === "All Work Types" || permit.type === selectedWorkType;
    return matchesSearch && matchesWorkType;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = filteredStorage.sort((a2, b) => new Date(b.createdAt).getTime() - new Date(a2.createdAt).getTime());
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Storage"
    }), jsxs("div", {
      className: "app-section__header",
      children: [jsx(Search, {
        placeholder: "Search permits",
        onSearch: setSearchTerm
      }), jsx("br", {}), jsxs("div", {
        className: "app-section__filters ",
        children: [jsx("span", {
          className: "base-date-filter--secondary",
          children: "Filter by:"
        }), jsxs("div", {
          className: "sm-grid-cols-2 app-section__filters",
          children: [jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedLocation
            }), jsx(DropdownContent, {
              children: siteOptions.map((location2) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedLocation(location2.value),
                children: location2.text
              }, location2.value))
            })]
          }), jsxs(Dropdown, {
            className: "base-dropdown__dropdown-wrapper",
            children: [jsx(DropdownTrigger, {
              children: selectedWorkType
            }), jsx(DropdownContent, {
              children: work_types.map((type) => jsx("div", {
                className: "base-dropdown__option",
                onClick: () => setSelectedWorkType(type),
                children: type
              }, type))
            })]
          })]
        })]
      })]
    }), jsxs("div", {
      className: "app-section",
      children: [jsx("div", {
        className: "app-section__lg-table",
        children: jsxs(Table, {
          children: [jsx(TableHead, {
            children: jsxs(TableRow, {
              children: [jsx(TableCell, {
                children: "PTW ID."
              }), jsx(TableCell, {
                children: "Work Type"
              }), jsx(TableCell, {
                children: "Work To Be Performed"
              }), jsx(TableCell, {
                children: "Work Location"
              }), jsx(TableCell, {
                children: "Company"
              }), jsx(TableCell, {
                children: "Status / Authority"
              }), jsx(TableCell, {})]
            })
          }), jsx(TableBody, {
            children: paginatedData.filter((data) => data.status === "CLOSED" || data.status === "CANCELED").map((data) => {
              var _a, _b;
              return jsxs(Fragment$1, {
                children: [" ", jsxs(TableRow, {
                  children: [" ", jsx(TableCell, {
                    children: data.publicId
                  }), jsx(TableCell, {
                    children: convertSnakeCaseToTitleCase(data.type)
                  }), jsx(TableCell, {
                    children: truncateText(data.workDescription, 45)
                  }), jsx(TableCell, {
                    children: jsxs("span", {
                      children: [data.workArea, " / ", (_a = data.location) == null ? void 0 : _a.locationArea]
                    })
                  }), jsx(TableCell, {
                    children: (_b = data.entrustedCompany) == null ? void 0 : _b.name
                  }), jsx(TableCell, {
                    children: jsxs("h6", {
                      className: `${data.status === "Draft" ? "draft-status" : "others-status"}`,
                      children: [data.status, " / ", data.currentAuthority]
                    })
                  }), jsx(TableCell, {
                    children: jsx(Button, {
                      onClick: () => handleItemClick(data),
                      children: "View"
                    })
                  })]
                }, data.id), jsx("br", {})]
              });
            })
          })]
        })
      }), jsxs("div", {
        className: "app-section__sm-table",
        children: [jsx(Table, {
          children: jsx(TableBody, {
            children: paginatedData.filter((dataItem) => dataItem.status === "CLOSED" || dataItem.status === "CANCELED").map((dataItem) => jsxs("div", {
              className: "container",
              onClick: () => handleItemClick(dataItem),
              children: [jsxs("div", {
                className: "location-flex",
                children: [jsx("p", {
                  children: dataItem.publicId
                }), jsx("h6", {
                  className: "gray",
                  children: convertSnakeCaseToTitleCase(dataItem.type)
                })]
              }), jsx("p", {
                children: truncateText(dataItem.workDescription, 45)
              }), jsx("div", {
                className: "location-flex",
                children: jsxs("div", {
                  className: "items-center",
                  children: [jsx("p", {
                    className: "gray",
                    children: "Status / Authority:"
                  }), jsxs("h6", {
                    className: "others-status",
                    children: [dataItem.status, " / ", dataItem.currentAuthority]
                  })]
                })
              })]
            }, dataItem.id))
          })
        }), filteredStorage.length && jsx(Pagination, {
          totalItems: filteredStorage.length,
          itemsPerPage,
          currentPage,
          onPageChange: setCurrentPage
        })]
      }), !filteredStorage.length && jsxs("div", {
        className: "base-empty",
        children: [jsx("img", {
          src: "/svgs/document.svg"
        }), jsx("p", {
          children: isLoading ? "Fetching permits, please wait..." : "No permits yet"
        })]
      })]
    })]
  });
}
function StorageDetails({}) {
  const {
    tabs,
    activeTab
  } = useTabs(["PTW Details", "Action History", "Onsite Notes & Comments"]);
  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Storage"
    }), jsx(ReusableTabs, {
      tabs,
      counts,
      className: "app-permit__tabs"
    }), activeTab === "PTW Details" && jsx(WorkAuthoriesFlow, {}), activeTab === "Action History" && jsx(PermitActionHistory, {}), activeTab === "Onsite Notes & Comments" && jsx(OnsiteNotes, {})]
  });
}
function Module$6() {
  const {
    permit
  } = usePermitDetails();
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$f,
    initialValues: {
      permitId: 0,
      content: ""
    },
    onSubmit
  });
  const {
    makeRequest,
    isLoading
  } = useRequest(addOnsiteNote);
  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: permit == null ? void 0 : permit.id,
      content: data.content
    });
    if (err) {
      return toast({
        variant: "error",
        message: err.message
      });
    } else {
      toast({
        variant: "success",
        message: "Successful"
      });
    }
    route("/monitoring-details");
  }
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx(Link, {
          href: "/",
          className: "app-link",
          children: "Click here to go back?"
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [jsx("h3", {
          children: "Onsite Comments & Notes"
        }), jsx("br", {}), jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx(Textarea, {
            placeholder: "Enter your comments",
            ...getFieldProps("content")
          }), jsx("div", {
            className: "app-submit-screen",
            children: jsxs("div", {
              className: "app-register__form-footer",
              children: [jsx("span", {}), jsx(Button, {
                variant: "primary",
                type: "submit",
                isLoading,
                children: "SUBMIT"
              })]
            })
          })]
        })]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    })]
  });
}
const validationSchema$f = Yup.object({});
function OnsiteCommentsView({}) {
  return jsx(Module$6, {});
}
function HseProcessSubmit() {
  const {
    state
  } = useIssuingActivityContext();
  const {
    makeRequest
  } = useRequest(approveHseAuth);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    valueID
  } = useIDContext();
  const permitId = valueID;
  useEffect$1(() => {
    async function submitForm() {
      var _a, _b, _c, _d, _e, _f, _g;
      setLoading(true);
      const selectedHazards = ((_a = state.context.work_hazards) == null ? void 0 : _a.hazards) || {};
      const filteredHazards = {};
      Object.entries(selectedHazards).forEach(([key, value]) => {
        console.log(key, value);
        if (value !== void 0) {
          filteredHazards[key] = value;
        }
      });
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId,
        hazards: {
          potentialHazardDescription: ((_b = state.context.work_hazards) == null ? void 0 : _b.potentialHazardDescription) || "",
          ...filteredHazards
        },
        protectiveEquipment: (_c = state.context.personal_protective_equipment) == null ? void 0 : _c.protectiveEquipment,
        firefightingPrecaution: {
          otherPrecaution: ((_d = state.context.firefighting_precaution) == null ? void 0 : _d.otherPrecaution) || "",
          ...(_e = state.context.firefighting_precaution) == null ? void 0 : _e.firefightingPrecaution
        },
        documents,
        mechanicalIsolationPrecaution: (_f = state.context.mechanical_precaution) == null ? void 0 : _f.mechanicalPrecaution,
        electricalIsolationPrecaution: (_g = state.context.electrical_precaution) == null ? void 0 : _g.electricalPrecaution
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$5() {
  const {
    state
  } = useIssuingActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$4.indexOf(stateAsString) + 1;
  const stateMeta = STEPS$4.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$4.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS$4.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("work_hazards") && jsx(WorkHazards, {}), state.matches("personal_protective_equipment") && jsx(PersonalProtectiveEquipment, {}), state.matches("firefighting_equipment") && jsx(FireFightingEquipment, {}), state.matches("selected_documents") && jsx(Documents, {}), state.matches("document_uploads") && jsx(FinalUpload, {}), state.matches("mechanical_precaution") && jsx(MechanicalIsolation, {}), state.matches("electrical_precaution") && jsx(ElectricalIsolation, {}), state.matches("submit") && jsx(HseProcessSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$4 = ["work_hazards", "personal_protective_equipment", "firefighting_equipment", "selected_documents", "document_uploads", "mechanical_precaution", "electrical_precaution", "adjust_time_date", "submit"];
function ProcessHsePermit({}) {
  return jsx(PermitProvider$2, {
    children: jsx(RoleProvider, {
      children: jsx(Module$5, {})
    })
  });
}
function UpdateTimeDate() {
  const {
    state,
    send
  } = useAuthorizingActivityContext();
  const {
    valueID
  } = useIDContext();
  const id = valueID;
  const [permitDetails, setPermitDetails] = useState({
    from_date: "",
    from_time: "",
    to_date: "",
    to_time: ""
  });
  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }
    getPermitDetails();
  }, [valueID]);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$e,
    initialValues: {
      ...state.context.adjust_date_time
      //   permit_type: state.context.permit_type,
    },
    onSubmit
  });
  function onSubmit(adjust_date_time) {
    send("submit", {
      data: {
        adjust_date_time
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__form",
    children: [jsx("h4", {
      children: "Kindly re-djust the date & time as appropriate (Optional)"
    }), jsx("div", {
      className: "",
      children: jsxs("div", {
        className: "get-current-date",
        children: [jsx("p", {
          children: "Current Permit Start - End Date & Time:"
        }), jsxs("span", {
          children: [dayjs(permitDetails.from_date).format("DD/MM/YYYY"), " :", " ", dayjs(permitDetails.from_time).format("hh:mm A"), " -", " ", dayjs(permitDetails.to_date).format("DD/MM/YYYY"), " :", " ", dayjs(permitDetails.to_time).format("hh:mm A"), " "]
        })]
      })
    }), jsx("h4", {
      children: "Adjust Permit Date & Time"
    }), jsxs("div", {
      className: "app-register__form-grid",
      children: [jsxs("div", {
        className: "app-register__form-grid show",
        children: [jsx(Input, {
          label: "From Date",
          placeholder: "dd / mm / yyyy",
          type: "date",
          ...getFieldProps("fromDate")
        }), jsx(Input, {
          label: "Time",
          type: "time",
          ...getFieldProps("fromTime")
        })]
      }), jsxs("div", {
        className: "app-register__form-grid show",
        children: [jsx(Input, {
          label: "To Date",
          placeholder: "dd / mm / yyyy",
          type: "date",
          ...getFieldProps("toDate")
        }), jsx(Input, {
          label: "Time",
          type: "time",
          placeholder: "00:00AM",
          ...getFieldProps("toTime")
        })]
      })]
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Back"
      }), jsx(Button, {
        variant: "primary",
        children: "SUBMIT"
      }), " "]
    })]
  });
}
const validationSchema$e = Yup.object({
  // from_date: Yup.string().required("From date is required"),
  // to_date: Yup.string().required("To date is required"),
  // from_time: Yup.string().required("From time is required"),
  // to_time: Yup.string().required("To time is required"),
  // // cold work fields
});
function AuthWorkHazards() {
  var _a, _b, _c, _d, _e, _f;
  const {
    send,
    state
  } = useAuthorizingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const hazardsArray = ((_b = (_a = details == null ? void 0 : details.permitHazards) == null ? void 0 : _a[0]) == null ? void 0 : _b.hazard) ?? null;
  const issuingHazards = ((_d = (_c = details == null ? void 0 : details.permitHazards) == null ? void 0 : _c[1]) == null ? void 0 : _d.hazard) ?? null;
  const hseHazards = ((_f = (_e = details == null ? void 0 : details.permitHazards) == null ? void 0 : _e[2]) == null ? void 0 : _f.hazard) ?? null;
  const combinedHazards = useMemo(() => {
    if (!hazardsArray || !issuingHazards || !hseHazards) {
      return {};
    }
    const hazards2 = {};
    Object.keys(hazardsArray).forEach((key) => {
      if (hazardsArray[key] === null && issuingHazards[key] === null && hseHazards[key] === null) {
        hazards2[key] = null;
      } else {
        hazards2[key] = true;
      }
    });
    return hazards2;
  }, [hazardsArray, issuingHazards, hseHazards]);
  const displayHazards = useMemo(() => {
    console.log(combinedHazards);
    const items = Object.entries(combinedHazards || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWHAZARDS = HAZARDS.filter((hazard) => items.some((item) => item.key === hazard.value));
    return NEWHAZARDS;
  }, [hazardsArray]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  const initialHazards = HAZARDS.reduce((acc, hazard) => {
    var _a2, _b2;
    acc[hazard.value] = ((_b2 = (_a2 = state.context.work_hazards) == null ? void 0 : _a2.hazards) == null ? void 0 : _b2[hazard.value]) ?? void 0;
    return acc;
  }, {});
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$d,
    initialValues: {
      ...state.context.work_hazards,
      hazards: initialHazards
    },
    onSubmit
  });
  function updateHazards(name, value) {
    setFieldValue("hazards", {
      ...values.hazards,
      [name]: value
    });
  }
  function onSubmit(work_hazards) {
    send("submit", {
      data: {
        work_hazards
      }
    });
  }
  const hazards = [{
    section: "D",
    header: "Hazard Identification",
    second_title: "Selected potential hazards",
    content: []
  }];
  const [isModalOpen, setModalOpen] = useState(false);
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsxs("div", {
        className: "app-register__form",
        children: [jsx(Section, {
          type: "Hazards",
          header: "Hazards",
          children: hazards[0],
          section: hazards[0].section
        }), jsxs("div", {
          className: "grid-cols-2",
          children: [jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Performing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(hazardsArray)
              })]
            })
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "Issuing Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(issuingHazards)
              })]
            })
          }), jsx("div", {
            className: "section",
            children: jsxs("div", {
              className: "section__content",
              children: [jsx("p", {
                className: "title",
                children: "HSE Authority"
              }), jsx("p", {
                className: "info",
                children: renderDisplayItems(hseHazards)
              })]
            })
          })]
        })]
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Identification of Hazards"
      }), jsxs("div", {
        className: "app-register__form",
        children: [displayHazards.map((hazard) => {
          var _a2, _b2;
          return jsxs("div", {
            className: "app-create-permit__radio-container",
            children: [jsx("p", {
              children: hazard.text
            }), jsxs("div", {
              children: [jsx(Radio, {
                checked: ((_a2 = values.hazards) == null ? void 0 : _a2[hazard.value]) === true,
                onChange: () => updateHazards(hazard.value, true),
                label: "YES"
              }), jsx(Radio, {
                checked: ((_b2 = values.hazards) == null ? void 0 : _b2[hazard.value]) === false,
                onChange: () => updateHazards(hazard.value, false),
                label: "NO"
              })]
            })]
          });
        }), jsx(Input, {
          type: "text",
          label: "Others",
          placeholder: "Others",
          ...getFieldProps("otherHazard")
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => window.location.href = "/permit-workflows",
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const HAZARDS = [
  {
    text: "NOISE",
    value: "noise"
  },
  {
    text: "TOXIC SUBSTANCE",
    value: "toxicSubstance"
  },
  {
    text: "CHEMICAL",
    value: "chemical"
  },
  {
    text: "EXPLOSIVES",
    value: "explosives"
  },
  {
    text: "HEIGHT",
    value: "height"
  },
  {
    text: "OVERHEAD HAZARDS, CRANES, ETC",
    value: "overheadCranes"
  },
  {
    text: "ILLUMINATING",
    value: "illuminating"
  },
  {
    text: "SPILL (CONTAINMENT IN PLACE)",
    value: "spill"
  },
  {
    text: "FALLING OBJECTS",
    value: "falling"
  },
  {
    text: "RADIATION",
    value: "radiation"
  },
  {
    text: "TYPE OF WASTE IS KNOWN",
    value: "knownWaste"
  }
  // { text: "OTHER", value: "otherHazard" },
];
const validationSchema$d = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function AuthPersonalProtectiveEquipment() {
  var _a, _b, _c, _d;
  const {
    send,
    state
  } = useAuthorizingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const personalProtectiveArray = (details == null ? void 0 : details.protectiveEquipments) && ((_a = details == null ? void 0 : details.protectiveEquipments) == null ? void 0 : _a.length) > 0 ? (_b = details.protectiveEquipments[0]) == null ? void 0 : _b.protectiveEquipment : null;
  const hseProtectiveArray = (details == null ? void 0 : details.hseEquipprotectiveEquipmentsments) && ((_c = details == null ? void 0 : details.protectiveEquipments) == null ? void 0 : _c.length) > 0 ? (_d = details.protectiveEquipments[1]) == null ? void 0 : _d.protectiveEquipment : null;
  const combinedEquipments = useMemo(() => {
    if (!personalProtectiveArray || !hseProtectiveArray) {
      return personalProtectiveArray || hseProtectiveArray || {};
    }
    const equipments = {};
    Object.keys(personalProtectiveArray).forEach((key) => {
      if (personalProtectiveArray[key] === null && hseProtectiveArray[key] === null) {
        equipments[key] = null;
      } else {
        equipments[key] = true;
      }
    });
    return equipments;
  }, [personalProtectiveArray, hseProtectiveArray]);
  console.log(combinedEquipments);
  const displayEquipments = useMemo(() => {
    const items = Object.entries(combinedEquipments || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = EQUIPMENT.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [personalProtectiveArray]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/auth" ? initialItems = EQUIPMENT.reduce((acc, item) => {
    var _a2, _b2;
    acc[item.value] = ((_b2 = (_a2 = state.context.personal_protective_equipment) == null ? void 0 : _a2.personal_protective_equipment) == null ? void 0 : _b2[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    handleSubmit,
    setFieldValue,
    values
  } = useForm({
    validationSchema: validationSchema$c,
    initialValues: {
      ...state.context.personal_protective_equipment,
      protectiveEquipment: initialItems
    },
    onSubmit
  });
  function updatePersonalEquipment(name, value) {
    setFieldValue("protectiveEquipment", {
      ...values.protectiveEquipment,
      [name]: value
    });
  }
  function onSubmit(personal_protective_equipment) {
    send("submit", {
      data: {
        personal_protective_equipment
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [{
    section: "D",
    header: "Selected Equipment",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/hse" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Hazards",
            children: equipment[0],
            section: equipment[0].section
          }), jsxs("div", {
            className: "grid-cols-2",
            children: [jsx("div", {
              className: "section",
              children: jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "title",
                  children: "Issuing Authority"
                }), jsx("p", {
                  className: "info",
                  children: renderDisplayItems(personalProtectiveArray)
                })]
              })
            }), jsx("div", {
              className: "section",
              children: jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "title",
                  children: "HSE Authority"
                }), jsx("p", {
                  className: "info",
                  children: renderDisplayItems(hseProtectiveArray)
                })]
              })
            })]
          })]
        })
      }), jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s) below"
      }), jsx("div", {
        className: "app-register__form",
        children: displayEquipments.map((equipment2) => jsxs("div", {
          className: "app-create-permit__radio-container",
          children: [jsx("p", {
            children: equipment2.text
          }), jsxs("div", {
            children: [jsx(Radio, {
              checked: values.protectiveEquipment[equipment2.value] === true,
              onChange: () => updatePersonalEquipment(equipment2.value, true),
              label: "YES"
            }), jsx(Radio, {
              checked: values.protectiveEquipment[equipment2.value] === false,
              onChange: () => updatePersonalEquipment(equipment2.value, false),
              label: "NO"
            })]
          })]
        }))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const EQUIPMENT = [{
  text: "SAFETY HARD HATS (Type I, Type II)",
  value: "safetyHardHats"
}, {
  text: "SAFETY SHOES OR BOOTS (Anti-slip, Steel toe, Chemical Resistant, rain boots)",
  value: "safetyShoes"
}, {
  text: "BODY PROTECTION (Coverall) (Chemical resistant, apron, fire retardant, fire resistant)",
  value: "bodyProtection"
}, {
  text: "SAFETY GLOVES (Welders, Chemical resistant, Electrical resistant, high impact, mechanical, anti-vibration, General purpose)",
  value: "safetyGloves"
}, {
  text: "BREATHING APPARATUS (Dust, Fumes, Chemical, SCBA)",
  value: "breathingApparatus"
  // Correct value as expected by the backend
}, {
  text: "SAFETY GLASSES / FACE SHIELD / ELECTRIC ARC SHIELD / GRINDING SHIELD",
  value: "safetyGlasses"
}, {
  text: "HEARING PROTECTION (ear muff, ear plugs, ear muff & ear plugs)",
  value: "hearingProtection"
}, {
  text: "LIFE VEST (Work Vest, Life Jacket)",
  value: "lifeVest"
}, {
  text: "LIFE BUOY / LIFE LINE",
  value: "lifeBuoy"
}];
const validationSchema$c = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
const FIREFIGHTING_EQUIPMENT = [
  {
    text: "FIRE EXTINGUISHER (CO2)",
    value: "fireExtinguisherCO2"
  },
  {
    text: "FIRE EXTINGUISHER (DCP)",
    value: "fireExtinguisherDCP"
  },
  {
    text: "REMOVAL OF FLAMMABLE SUBSTANCES",
    value: "removalOfFlammableSubstances"
  },
  {
    text: "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)",
    value: "explosionProofTools"
  },
  {
    text: "FLAME PROOF BLANKET",
    value: "flameProofBlanket"
  },
  {
    text: "GROUNDING OF EQUIPMENT",
    value: "groundingOfEquipment"
  },
  {
    text: "CONTINUOUS GAS MONITORING",
    value: "continuousGasMonitoring"
  },
  {
    text: "FIREWATCHER / STANDBY MAN",
    value: "firewatcher"
  }
  // { text: "OTHERS", value: "otherPrecaution" },
];
function AuthFireFightingEquipment() {
  const {
    state,
    send
  } = useAuthorizingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const currentPath = window.location.pathname;
  const firefightingEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? details.firefightingPrecautions[0].firefightingPrecaution : null;
  const hseEquipment = (details == null ? void 0 : details.firefightingPrecautions) && details.firefightingPrecautions.length > 0 ? details.firefightingPrecautions[0].firefightingPrecaution : null;
  const combinedEquipments = useMemo(() => {
    if (!firefightingEquipment || !hseEquipment) {
      return {};
    }
    const hazards = {};
    Object.keys(firefightingEquipment).forEach((key) => {
      if (firefightingEquipment[key] === null && hseEquipment[key] === null) {
        hazards[key] = null;
      }
    });
    return hazards;
  }, [firefightingEquipment, hseEquipment]);
  const displayEquipments = useMemo(() => {
    const items = Object.entries(combinedEquipments || {}).filter(([key, value]) => value === null && !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => ({
      key,
      value: value ?? false
    }));
    const NEWITEMS = FIREFIGHTING_EQUIPMENT.filter((equipment2) => items.some((item) => item.key === equipment2.value));
    return NEWITEMS;
  }, [firefightingEquipment]);
  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};
    const itemEntries = Object.entries(displayItems).filter(([key, value]) => value !== null && !["id", "createdAt", "updatedAt", "potentialHazardDescription"].includes(key)).map(([key, value]) => {
      return {
        key,
        value: value ?? false
      };
    });
    return itemEntries.map(({
      key,
      value
    }) => jsx("div", {
      className: "firefighting-item",
      children: jsxs("p", {
        children: [jsx("span", {
          className: "firefighting-value",
          children: value ? "YES" : "NO"
        }), " -", " ", key.replace(/([A-Z])/g, " $1").toUpperCase(), " "]
      })
    }, key));
  };
  let initialItems = {};
  currentPath === "/activities-process/hse" ? initialItems = FIREFIGHTING_EQUIPMENT.reduce((acc, item) => {
    var _a, _b;
    acc[item.value] = ((_b = (_a = state.context.firefighting_equipment) == null ? void 0 : _a.firefighting_equipment) == null ? void 0 : _b[item.value]) ?? void 0;
    return acc;
  }, {}) : initialItems = {};
  const {
    setFieldValue,
    values,
    handleSubmit,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$b,
    initialValues: {
      ...state.context.firefighting_equipment,
      firefightingEquipment: initialItems
    },
    onSubmit
  });
  function updateFirefightingEquipment(name, value) {
    setFieldValue("firefightingEquipment", {
      ...values.firefightingEquipment,
      [name]: value
    });
  }
  function onSubmit(firefighting_equipment) {
    send("submit", {
      data: {
        firefighting_equipment
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [{
    section: "",
    header: "Selected Precautions",
    second_title: "",
    content: []
  }];
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("div", {
        className: "app-register__form",
        children: currentPath === "/activities-process/auth" && jsxs(Fragment$1, {
          children: [jsx(Section, {
            type: "Selected Equipment",
            header: "Hazards",
            children: equipment[0],
            section: equipment[0].section
          }), jsxs("div", {
            className: "grid-cols-2",
            children: [jsx("div", {
              className: "section",
              children: jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "title",
                  children: "Issuing Authority"
                }), jsx("p", {
                  className: "info",
                  children: renderDisplayItems(firefightingEquipment)
                })]
              })
            }), jsx("div", {
              className: "section",
              children: jsxs("div", {
                className: "section__content",
                children: [jsx("p", {
                  className: "title",
                  children: "HSE Authority"
                }), jsx("p", {
                  className: "info",
                  children: renderDisplayItems(hseEquipment)
                })]
              })
            })]
          })]
        })
      }), jsx("p", {
        children: "Select applicable option(s)"
      }), jsxs("div", {
        className: "app-register__form app-create-permit__docs",
        children: [displayEquipments.map((item) => jsxs("div", {
          className: "app-create-permit__radio-container",
          children: [jsx("p", {
            children: item.text
          }), jsxs("div", {
            children: [jsx(Radio, {
              checked: values.firefightingEquipment[item.value] === true,
              onChange: () => updateFirefightingEquipment(item.value, true),
              label: "YES"
            }), jsx(Radio, {
              checked: values.firefightingEquipment[item.value] === false,
              onChange: () => updateFirefightingEquipment(item.value, false),
              label: "NO"
            })]
          })]
        })), jsx(Input, {
          type: "text",
          label: "Others",
          placeholder: "Others",
          ...getFieldProps("otherPrecaution")
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const validationSchema$b = Yup.object({});
function AuthDocuments() {
  const {
    state,
    send
  } = useAuthorizingActivityContext();
  const {
    permit
  } = usePermitDetails();
  const details = permit;
  const documents = (details == null ? void 0 : details.permitDocuments) && details.permitDocuments.length > 0 ? details.permitDocuments.slice(0, 3).map((item) => item.document) : [];
  const reversedDocuments = toOriginalFormat(documents);
  const notSelected = documentOptions$1.filter((doc) => {
    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);
    return !reversedDoc;
  });
  const selected = documentOptions$1.filter((doc) => {
    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);
    return reversedDoc;
  });
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$a,
    initialValues: {
      ...state.context.selected_documents
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  function onSubmit(selected_documents) {
    send("submit", {
      data: {
        selected_documents
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const renderDocuments = () => {
    const documentEntries = selected;
    return documentEntries.map((doc) => {
      return jsx("div", {
        className: "document-item",
        children: jsx("div", {
          className: "",
          children: jsx("p", {
            className: "document grid-cols-2",
            children: jsx("span", {
              children: doc
            })
          })
        })
      }, doc);
    });
  };
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("div", {
        className: "",
        children: jsx("div", {
          className: "section",
          children: jsxs("div", {
            className: "",
            children: [jsx("h3", {
              children: "Uploaded Documents"
            }), jsx("p", {
              className: "info",
              children: Object.keys(selected).length > 0 ? renderDocuments() : jsx("p", {
                children: "No documents uploaded."
              })
            })]
          })
        })
      }), jsx("h3", {
        children: "Select the document you want to upload below"
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: (notSelected == null ? void 0 : notSelected.length) > 0 ? jsx(Fragment$1, {
          children: notSelected.map((document2, index) => jsxs("div", {
            className: "",
            children: [jsxs("label", {
              className: "app-register__attachment-form items-center",
              children: [jsx(Checkbox, {
                checked: !!values.documents[document2],
                onChange: () => updateDocuments(document2, !values.documents[document2])
              }), jsx("span", {
                children: document2
              })]
            }), jsx(Select, {
              ...getFieldProps(`document_${document2}`),
              options: [{
                text: "Manual Upload",
                value: "manual"
              }]
            }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
              className: "error",
              style: {
                color: "red"
              },
              children: "Please select an option for the selected document."
            })]
          }, index))
        }) : jsx(Fragment$1, {
          children: jsx("p", {
            children: "No documents need to be uploaded"
          })
        })
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const validationSchema$a = Yup.object().shape({
  // documents: Yup.object().test(
  //   "document-selection-validation",
  //   "Please select a corresponding dropdown option for all selected documents.",
  //   (documents, context) => {
  //     const selectedDocuments = Object.entries(documents || {}).filter(
  //       ([_, checked]) => checked
  //     );
  //     return selectedDocuments.every(
  //       ([document]) => !!context.parent[`document_${document}`]
  //     );
  //   }
  // ),
});
function AuthFinalUpload() {
  const {
    state,
    send
  } = useAuthorizingActivityContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema: validationSchema$9
  });
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const validationSchema$9 = Yup.object({});
function AuthMechanicalIsolation() {
  const {
    send,
    state
  } = useAuthorizingActivityContext();
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$8,
    initialValues: {
      ...state.context.mechanical_precaution
    },
    onSubmit
  });
  function updateMechanicalIsolation(name, value) {
    setFieldValue("mechanicalPrecaution", {
      ...values.mechanicalPrecaution,
      [name]: value
    });
  }
  function onSubmit(mechanical_precaution) {
    send("submit", {
      data: {
        mechanical_precaution
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s)"
      }), jsxs("div", {
        className: "app-register__form",
        children: [LIST$1.map((item) => jsxs("div", {
          className: "app-create-permit__radio-container",
          children: [jsx("p", {
            children: item.text
          }), jsxs("div", {
            children: [jsx(Radio, {
              checked: values.mechanicalPrecaution[item.value] === true,
              onChange: () => updateMechanicalIsolation(item.value, true),
              label: "YES"
            }), jsx(Radio, {
              checked: values.mechanicalPrecaution[item.value] === false,
              onChange: () => updateMechanicalIsolation(item.value, false),
              label: "NO"
            })]
          })]
        })), jsx(Input, {
          type: "text",
          label: "Others",
          placeholder: "Others",
          ...getFieldProps("other")
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const LIST$1 = [
  {
    text: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)",
    value: "valveIsolationAmdTagging"
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) INSTALLATION",
    value: "flangesInstallation"
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) REMOVAL",
    value: "flangesRemoval"
  },
  {
    text: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)",
    value: "lineDisconnection"
  },
  {
    text: "LINE / EQUIPMENT DRAINAGE",
    value: "lineDrainage"
  },
  {
    text: "LINE / EQUIPMENT DEPRESSURIZATION",
    value: "lineDepressurization"
  },
  {
    text: "VENTILATION (Natural / Mechanical means)",
    value: "ventilation"
  }
  // { text: "OTHER", value: "other" },
];
const validationSchema$8 = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function AuthElectricalIsolation() {
  const {
    send,
    state
  } = useAuthorizingActivityContext();
  const {
    handleSubmit,
    setFieldValue,
    values,
    getFieldProps
  } = useForm({
    validationSchema: validationSchema$7,
    initialValues: {
      ...state.context.electrical_precaution
    },
    onSubmit
  });
  function updateElectricalIsolation(name, value) {
    setFieldValue("electricalPrecaution", {
      ...values.electricalPrecaution,
      [name]: value
    });
  }
  function onSubmit(electrical_precaution) {
    send("submit", {
      data: {
        electrical_precaution
      }
    });
  }
  const [isModalOpen, setModalOpen] = useState(false);
  return jsxs(Fragment$1, {
    children: [jsxs("form", {
      onSubmit: handleSubmit,
      children: [jsx("div", {
        className: "app-create-permit__group-header",
        children: "Select applicable option(s)"
      }), jsxs("div", {
        className: "app-register__form",
        children: [LIST.map((item) => jsxs("div", {
          className: "app-create-permit__radio-container",
          children: [jsx("p", {
            children: item.text
          }), jsxs("div", {
            children: [jsx(Radio, {
              checked: values.electricalPrecaution[item.value] === true,
              onChange: () => updateElectricalIsolation(item.value, true),
              label: "YES"
            }), jsx(Radio, {
              checked: values.electricalPrecaution[item.value] === false,
              onChange: () => updateElectricalIsolation(item.value, false),
              label: "NO"
            })]
          })]
        })), jsx(Input, {
          type: "text",
          label: "Others",
          placeholder: "Others",
          ...getFieldProps("other")
        })]
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "danger",
          type: "button",
          onClick: () => setModalOpen(true),
          children: "Send Back To Authority"
        }), jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    }), isModalOpen && jsx(SendToAuthority, {
      setModalOpen: () => setModalOpen(false)
    })]
  });
}
const LIST = [
  {
    text: "SWITCH OFF OR SHUTDOWN THE EQUIPMENT",
    value: "equipmentShutdown"
  },
  {
    text: "RACK OUT AND PADLOCK THE CIRCUIT BREAKER (Car seal is also optional)",
    value: "circuitBreakerPadlock"
  },
  {
    text: "USE MULTIMAKER TO CHECK VOLTAGE READING",
    value: "voltageReadingCheck"
  },
  {
    text: "DISCONNECT SUPPLY FROM THE SOURCE",
    value: "supplyDisconnection"
  },
  {
    text: "DISCONNECT CABLE FROM EQUIPMENT",
    value: "cableDisconnection"
  },
  {
    text: "INSTALLATION OF GROUND FAULT CIRCUIT INTERUPTOR (GCFI OR RESIDUAL CURRENT CICUIT BREAKER (RCCB)",
    value: "gfciInstallation"
  }
  // { text: "OTHERS", value: "other" },
];
const validationSchema$7 = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
function Module$4() {
  const {
    state
  } = useAuthorizingActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$3.indexOf(stateAsString) + 1;
  const stateMeta = STEPS$3.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$3.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS$3.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("work_hazards") && jsx(AuthWorkHazards, {}), state.matches("personal_protective_equipment") && jsx(AuthPersonalProtectiveEquipment, {}), state.matches("firefighting_equipment") && jsx(AuthFireFightingEquipment, {}), state.matches("selected_documents") && jsx(AuthDocuments, {}), state.matches("document_uploads") && jsx(AuthFinalUpload, {}), state.matches("mechanical_precaution") && jsx(AuthMechanicalIsolation, {}), state.matches("electrical_precaution") && jsx(AuthElectricalIsolation, {}), state.matches("adjust_date_time") && jsx(UpdateTimeDate, {}), state.matches("submit") && jsx(AuthProcessSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$3 = ["work_hazards", "personal_protective_equipment", "firefighting_equipment", "selected_documents", "document_uploads", "mechanical_precaution", "electrical_precaution", "adjust_date_time", "submit"];
function ProcessAuthorizingPermit({}) {
  return jsx(PermitProvider$3, {
    children: jsx(RoleProvider, {
      children: jsx(Module$4, {})
    })
  });
}
const ActivityPerfSupervisorMachine = () => createMachine({
  context: {
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    submit: {}
  },
  predictableActionArguments: true,
  initial: "selected_documents",
  states: {
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "D"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        }
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "E"
      },
      on: {
        submit: [{
          target: "submit",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "document_uploads"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context$1 = createContext({});
function PermitProvider$1({
  children
}) {
  const [state, send, service] = useMachine(ActivityPerfSupervisorMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context$1.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function usePerfSupervisorActivityContext() {
  return useContext(Context$1);
}
function PerfSupervisorDocuments() {
  const {
    state,
    send
  } = usePerfSupervisorActivityContext();
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$6,
    initialValues: {
      ...state.context.selected_documents
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  function onSubmit(selected_documents) {
    send("submit", {
      data: {
        selected_documents
      }
    });
  }
  const documentOptions2 = ["Tool Box Stock Doc", "Radiography Cert", "Confined Space Cert", "Gas Testing Cert"];
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        children: "Select the document you want to upload below"
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: documentOptions2.map((document2, index) => jsxs("div", {
          className: "",
          children: [jsxs("label", {
            className: "app-register__attachment-form items-center",
            children: [jsx(Checkbox, {
              checked: !!values.documents[document2],
              onChange: () => updateDocuments(document2, !values.documents[document2])
            }), jsx("span", {
              children: document2
            })]
          }), jsx(Select, {
            ...getFieldProps(`document_${document2}`),
            options: [{
              text: "Manual Upload",
              value: "manual"
            }]
          }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
            className: "error",
            style: {
              color: "red"
            },
            children: "Please select an option for the selected document."
          })]
        }, index))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activities";
          },
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$6 = Yup.object().shape({
  documents: Yup.object().test("document-selection-validation", "Please select a corresponding dropdown option for all selected documents.", (documents, context) => {
    const selectedDocuments = Object.entries(documents || {}).filter(([_, checked]) => checked);
    return selectedDocuments.every(([document2]) => !!context.parent[`document_${document2}`]);
  })
});
function PerfSupervisorFinalUpload() {
  const {
    state,
    send
  } = usePerfSupervisorActivityContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema: validationSchema$5
  });
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "SUBMIT"
        })]
      })]
    })
  });
}
const validationSchema$5 = Yup.object({});
function PerfProcessSubmit() {
  const {
    state
  } = usePerfSupervisorActivityContext();
  const {
    makeRequest
  } = useRequest(approvePerfSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    valueID
  } = useIDContext();
  const permitId = valueID;
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId,
        documents
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
      setLoading(false);
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$3() {
  const {
    state
  } = usePerfSupervisorActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$2.indexOf(stateAsString) + 1;
  const stateMeta = STEPS$2.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$2.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS$2.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("selected_documents") && jsx(PerfSupervisorDocuments, {}), state.matches("document_uploads") && jsx(PerfSupervisorFinalUpload, {}), state.matches("submit") && jsx(PerfProcessSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$2 = ["selected_documents", "document_uploads", "submit"];
function ProcessPerfSupervisorPermit({}) {
  return jsx(PermitProvider$1, {
    children: jsx(RoleProvider, {
      children: jsx(Module$3, {})
    })
  });
}
function SafetyOfficerProcessSubmit() {
  const {
    state
  } = usePerfSupervisorActivityContext();
  const {
    makeRequest
  } = useRequest(approveSafetyOfficer);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(true);
  const {
    valueID
  } = useIDContext();
  const permitId = valueID;
  useEffect$1(() => {
    async function submitForm() {
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId,
        documents
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
      setLoading(false);
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function Module$2() {
  const {
    state
  } = usePerfSupervisorActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS$1.indexOf(stateAsString) + 1;
  const stateMeta = STEPS$1.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS$1.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS$1.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("selected_documents") && jsx(PerfSupervisorDocuments, {}), state.matches("document_uploads") && jsx(PerfSupervisorFinalUpload, {}), state.matches("submit") && jsx(SafetyOfficerProcessSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS$1 = ["selected_documents", "document_uploads", "submit"];
function ProcessSafetyOfficerPermit({}) {
  return jsx(PermitProvider$1, {
    children: jsx(RoleProvider, {
      children: jsx(Module$2, {})
    })
  });
}
const ActivityIssuingSupervisorMachine = () => createMachine({
  context: {
    selected_documents: {
      documents: []
    },
    document_uploads: {
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null,
      [`document_${randomHash(8)}`]: null
    },
    tool_kit_time: {
      toolBoxLeaderIdentity: "",
      toolBoxPosition: "",
      issuingAuthoritySupervisorTimeAdjustment: false,
      startTime: ""
    },
    submit: {}
  },
  predictableActionArguments: true,
  initial: "selected_documents",
  states: {
    selected_documents: {
      meta: {
        title: "Document Selection",
        section: "D"
      },
      on: {
        submit: {
          target: "document_uploads",
          actions: ["updateContext"]
        }
      }
    },
    document_uploads: {
      meta: {
        title: "Document Uploads",
        section: "E"
      },
      on: {
        submit: [{
          target: "tool_kit_time",
          actions: ["updateContext"]
        }],
        go_back: "selected_documents"
      }
    },
    tool_kit_time: {
      meta: {
        title: "Tool - Box Talk Details"
      },
      on: {
        submit: [{
          target: "submit",
          actions: ["updateContext"]
        }],
        go_back: "document_uploads"
      }
    },
    submit: {
      type: "final",
      on: {
        submit: {
          target: "submit",
          actions: ["updateContext"]
        },
        go_back: "tool_kit_time"
      }
    }
  }
}, {
  actions: {
    updateContext(ctx, event) {
      Object.assign(ctx, event.data);
    }
  }
});
const Context = createContext({});
function PermitProvider({
  children
}) {
  const [state, send, service] = useMachine(ActivityIssuingSupervisorMachine);
  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return jsx(Context.Provider, {
    value: {
      state,
      send
    },
    children
  });
}
function useIssuingSupervisorActivityContext() {
  return useContext(Context);
}
function IssuSupervisorFinalUpload() {
  const {
    state,
    send
  } = useIssuingSupervisorActivityContext();
  const {
    setFieldValue,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema: validationSchema$4
  });
  const selectedPreviously = state.context.selected_documents;
  const [uploadedURLs, setUploadedURLs] = useState({});
  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url
    }));
  }
  const onlineDocuments = Object.keys(selectedPreviously).filter((key) => key.startsWith("document_") && selectedPreviously[key] === "manual").map((key) => ({
    key,
    label: key.replace("document_", "").replace(/_/g, " ")
    // Format label
  }));
  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce((acc, [key, url]) => {
      const formattedKey = key.replace("document_", "");
      acc[formattedKey] = {
        type: "MANUAL",
        doc: url
      };
      return acc;
    }, {});
    send("submit", {
      data: {
        document_uploads,
        formattedDocuments
      }
    });
  }
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        className: "app-create-permit__description",
        children: "Ensure you upload authentic documents that are clear and visible."
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: onlineDocuments.map(({
          key,
          label
        }) => jsx(UploadDocument, {
          label,
          ...getFieldProps(key),
          onChange: (v2) => setFieldValue(key, v2),
          onUploadComplete: (url) => onUploadComplete(key, url)
        }, key))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => send("go_back"),
          children: "Previous"
        }), jsx(Button, {
          variant: "primary",
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$4 = Yup.object({});
function ToolKitTime() {
  const {
    state,
    send
  } = useIssuingSupervisorActivityContext();
  const {
    valueID
  } = useIDContext();
  const id = valueID;
  const [permitDetails, setPermitDetails] = useState({
    from_date: "",
    from_time: "",
    to_date: "",
    to_time: ""
  });
  function getCurrentTimeIn12HrFormat() {
    const now = /* @__PURE__ */ new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }
  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }
    getPermitDetails();
  }, [valueID]);
  const {
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$3,
    initialValues: {
      ...state.context.tool_kit_time
      //   permit_type: state.context.permit_type,
    },
    onSubmit
  });
  function onSubmit(tool_kit_time) {
    send("submit", {
      data: {
        tool_kit_time
      }
    });
  }
  return jsxs("form", {
    onSubmit: handleSubmit,
    className: "app-register__form",
    children: [jsx("p", {
      children: "Fill in the fields below to update the toolbox stock form"
    }), jsx("br", {}), jsxs("div", {
      className: "app-register__form-grid",
      children: [jsx(Input, {
        label: "Identity Leader",
        placeholder: "Enter fullname",
        ...getFieldProps("toolBoxLeaderIdentity")
      }), jsx(Input, {
        label: "Position",
        placeholder: "Enter position",
        ...getFieldProps("toolBoxPosition")
      })]
    }), jsx("h4", {
      children: "Adjust Time"
    }), jsx("p", {
      children: "Kindly re-djust the date & time as appropriate (Optional)"
    }), jsx("div", {
      className: "",
      children: jsxs("div", {
        className: "get-current-date",
        children: [jsx("p", {
          children: "Current Permit Start - End Date & Time:"
        }), jsxs("span", {
          children: [dayjs(permitDetails.from_date).format("DD/MM/YYYY"), " :", " ", dayjs(permitDetails.from_time).format("hh:mm A"), " -", " ", dayjs(permitDetails.to_date).format("DD/MM/YYYY"), " :", " ", dayjs(permitDetails.to_time).format("hh:mm A"), " "]
        })]
      })
    }), jsx("div", {
      className: "",
      children: jsxs("div", {
        className: "",
        children: [jsxs("div", {
          className: "",
          children: [jsx("h4", {
            children: "Edit Start Time"
          }), jsxs("div", {
            class: "edit-start-time",
            children: [jsxs("p", {
              children: [" ", "The time your are selecting must be more than the current time:"]
            }), jsx("br", {}), jsx("span", {
              children: getCurrentTimeIn12HrFormat()
            })]
          })]
        }), jsx("br", {}), jsx(Input, {
          label: "Time",
          type: "time",
          placeholder: "00:00AM",
          ...getFieldProps("startTime")
        })]
      })
    }), jsxs("div", {
      className: "app-register__form-footer",
      children: [jsx(Button, {
        variant: "secondary",
        type: "button",
        onClick: () => send("go_back"),
        children: "Back"
      }), jsx(Button, {
        variant: "primary",
        children: "SUBMIT"
      }), " "]
    })]
  });
}
const validationSchema$3 = Yup.object({
  // from_date: Yup.string().required("From date is required"),
  // to_date: Yup.string().required("To date is required"),
  // from_time: Yup.string().required("From time is required"),
  // to_time: Yup.string().required("To time is required"),
  // // cold work fields
  toolBoxLeaderIdentity: Yup.string().required("Identity leader is required"),
  toolBoxPosition: Yup.string().required("Position is required")
});
function convertToISO8601(startTime) {
  const now = /* @__PURE__ */ new Date();
  let datePart = now.toISOString().split("T")[0];
  if (startTime.trim() === "") {
    return now.toISOString();
  }
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime)) {
    throw new Error("Invalid time format. Please provide a valid time in 'HH:mm' format.");
  }
  const isoString = `${datePart}T${startTime}:00.000Z`;
  return isoString;
}
function IssuSupervisorProcessSubmit() {
  const {
    state
  } = useIssuingSupervisorActivityContext();
  const {
    makeRequest
  } = useRequest(approveIssuingSupervisor);
  const [loading, setLoading] = useState$1(false);
  const [successful, setSuccessful] = useState$1(false);
  const {
    valueID
  } = useIDContext();
  const permitId = valueID;
  useEffect$1(() => {
    async function submitForm() {
      var _a, _b, _c, _d;
      const approvedTime = convertToISO8601((_a = state.context.tool_kit_time) == null ? void 0 : _a.startTime).toString();
      console.log(typeof approvedTime);
      setLoading(true);
      const selectedDocuments = Array.isArray(state.context.formattedDocuments) ? state.context.formattedDocuments : Object.entries(state.context.formattedDocuments || {}).map(([name, value]) => ({
        name,
        type: value.type || "MANUAL",
        doc: value.doc || ""
      }));
      const toCamelCase = (str) => {
        return str.replace(/\/.*|\(.*?\)/g, "").replace(/\./g, "").trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, "");
      };
      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);
        if (camelCaseName === "otherCert") {
          acc[`${camelCaseName}Name`] = "...";
        }
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});
      const payload = {
        permitId,
        documents,
        toolBoxLeaderIdentity: (_b = state.context.tool_kit_time) == null ? void 0 : _b.toolBoxLeaderIdentity,
        toolBoxPosition: (_c = state.context.tool_kit_time) == null ? void 0 : _c.toolBoxPosition,
        startTime: approvedTime,
        issuingAuthoritySupervisorTimeAdjustment: ((_d = state.context.tool_kit_time) == null ? void 0 : _d.startTime) === "" ? false : true
      };
      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message: error.message ?? "Failed to approve permit, please try again"
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully"
      });
    }
    submitForm();
  }, [state]);
  return jsx("div", {
    className: "app-register__form",
    children: loading ? jsx(Fragment$1, {
      children: jsx(Fragment$1, {
        children: jsx("div", {
          className: "submit-container",
          children: jsxs("div", {
            className: "",
            children: [jsx("div", {
              className: "flex-center",
              children: jsx("img", {
                src: "/svgs/in-progress.svg",
                alt: ""
              })
            }), jsx("p", {
              className: "submit-container__title",
              children: " Approving Permit ..."
            }), jsx("br", {}), jsx("p", {
              className: "submit-container__description",
              children: "Please wait as we process this permit."
            })]
          })
        })
      })
    }) : successful ? jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/successful.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approved"
          }), jsx("br", {}), jsxs("p", {
            className: "submit-container__description",
            children: ["You have successfully approved this permit.", " "]
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "View Permit"
            })]
          })]
        })
      })
    }) : jsx(Fragment$1, {
      children: jsx("div", {
        className: "submit-container",
        children: jsxs("div", {
          className: "",
          children: [jsx("div", {
            className: "flex-center",
            children: jsx("img", {
              src: "/svgs/submit-failed.svg",
              alt: ""
            })
          }), jsx("p", {
            className: "submit-container__title",
            children: "Permit Approval Failed"
          }), jsx("br", {}), jsx("p", {
            className: "submit-container__description",
            children: "An error occurred while processing this permit."
          }), jsx("br", {}), jsxs("div", {
            className: "submit-container__button-container",
            children: [jsx(Button, {
              variant: "tertiary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Home"
            }), jsx(Button, {
              variant: "primary",
              type: "button",
              onClick: () => route("/process-permits"),
              children: "Redo Permit"
            })]
          })]
        })
      })
    })
  });
}
function IssuSupervisorDocuments() {
  const {
    state,
    send
  } = useIssuingSupervisorActivityContext();
  const {
    setFieldValue,
    values,
    getFieldProps,
    handleSubmit
  } = useForm({
    validationSchema: validationSchema$2,
    initialValues: {
      ...state.context.selected_documents
    },
    onSubmit
  });
  const updateDocuments = (name, type) => {
    setFieldValue("documents", {
      ...values.documents,
      [name]: type
    });
  };
  function onSubmit(selected_documents) {
    send("submit", {
      data: {
        selected_documents
      }
    });
  }
  const documentOptions2 = ["Tool Box Stock Doc", "Radiography Cert", "Confined Space Cert", "Gas Testing Cert"];
  return jsx(Fragment$1, {
    children: jsxs("form", {
      onSubmit: handleSubmit,
      className: "app-register__attachment-form",
      children: [jsx("p", {
        children: "Select the document you want to upload below"
      }), jsx("div", {
        className: "app-register__form-grid app-create-permit__docs",
        children: documentOptions2.map((document2, index) => jsxs("div", {
          className: "",
          children: [jsxs("label", {
            className: "app-register__attachment-form items-center",
            children: [jsx(Checkbox, {
              checked: !!values.documents[document2],
              onChange: () => updateDocuments(document2, !values.documents[document2])
            }), jsx("span", {
              children: document2
            })]
          }), jsx(Select, {
            ...getFieldProps(`document_${document2}`),
            options: [{
              text: "Manual Upload",
              value: "manual"
            }]
          }), values.documents[document2] && !values[`document_${document2}`] && jsx("p", {
            className: "error",
            style: {
              color: "red"
            },
            children: "Please select an option for the selected document."
          })]
        }, index))
      }), jsxs("div", {
        className: "app-register__form-footer",
        children: [jsx(Button, {
          variant: "secondary",
          type: "button",
          onClick: () => {
            window.location.href = "/permit-activitites";
          },
          children: "Back"
        }), jsx(Button, {
          variant: "primary",
          onClick: () => handleSubmit,
          children: "Next"
        })]
      })]
    })
  });
}
const validationSchema$2 = Yup.object().shape({
  documents: Yup.object().test("document-selection-validation", "Please select a corresponding dropdown option for all selected documents.", (documents, context) => {
    const selectedDocuments = Object.entries(documents || {}).filter(([_, checked]) => checked);
    return selectedDocuments.every(([document2]) => !!context.parent[`document_${document2}`]);
  })
});
function Module$1() {
  const {
    state
  } = useIssuingSupervisorActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;
  const stateMeta = STEPS.includes(stateAsString) ? {
    title: capitalize(stateAsString.replace("_", " "))
  } : null;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleViewPermitDetails = (value) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: "/",
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Process Permit"
        }), jsx("div", {
          className: "",
          children: jsx(Button, {
            variant: "purple",
            onClick: () => handleViewPermitDetails(true),
            children: "Permit Details"
          })
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [!state.matches("submit") && jsxs(Fragment$1, {
          children: [jsxs("div", {
            className: "app-register__content__header app-create-permit__header",
            children: [jsx("h3", {
              children: stateMeta == null ? void 0 : stateMeta.title.replace(/_/g, " ").replace(/\b\w/g, (l2) => l2.toUpperCase())
            }), jsxs("p", {
              children: ["Step ", currentIdx, " of ", STEPS.length - 1]
            })]
          }), jsx("div", {
            className: "app-register__progress-bar",
            children: jsx("span", {
              style: {
                width: `${(currentIdx / STEPS.length - 1) * 100}%`
              }
            })
          })]
        }), state.matches("selected_documents") && jsx(IssuSupervisorDocuments, {}), state.matches("document_uploads") && jsx(IssuSupervisorFinalUpload, {}), state.matches("tool_kit_time") && jsx(ToolKitTime, {}), state.matches("submit") && jsx(IssuSupervisorProcessSubmit, {})]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    }), jsx("div", {
      className: "",
      children: isModalOpen && jsx(ViewPermitDetails, {
        setModalOpen: () => setModalOpen(false)
      })
    })]
  });
}
const STEPS = ["selected_documents", "document_uploads", "tool_kit_time", "submit"];
function ProcessIssuSupervisorPermit({}) {
  return jsx(PermitProvider, {
    children: jsx(RoleProvider, {
      children: jsx(Module$1, {})
    })
  });
}
function CompleteOnboarding({}) {
  const token = getTokenFromURL();
  return jsx(ResetPasswordForm, {
    token
  });
}
function ResetPasswordForm({
  token
}) {
  const {
    makeRequest,
    isLoading
  } = useRequest(completeExternalOnboarding);
  const {
    handleSubmit,
    getFieldProps
  } = useForm({
    initialValues: {
      token,
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema$1,
    onSubmit
  });
  const [showPassword, setShowPassword] = useState(false);
  async function onSubmit(values) {
    const [_, err] = await makeRequest(values);
    if (err)
      return toast({
        variant: "error",
        message: err.message
      });
    route("/login");
  }
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "app-login__card__form",
        children: [jsx("h2", {
          children: "Complete Onboarding"
        }), jsx("p", {
          className: "app-login__card__form__desc",
          children: "Input and confirm your new password below."
        }), jsx(Input, {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
          ...getFieldProps("password")
        }), jsx(Input, {
          label: "Confirm Password",
          placeholder: "Re-enter your password",
          type: "password",
          ...getFieldProps("confirmPassword"),
          button: jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            width: "20",
            height: "20",
            onClick: () => setShowPassword((prev) => !prev),
            style: {
              cursor: "pointer"
            },
            children: showPassword ? jsxs(Fragment$1, {
              children: [jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 12A3 3 0 1112 9a3 3 0 013 3z"
              }), jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              })]
            }) : jsx(Fragment$1, {
              children: jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
              })
            })
          })
        }), jsxs(Button, {
          isLoading,
          variant: "primary",
          className: "last-btn",
          children: ["Save password", jsx(Icon, {
            name: "arrow-right"
          })]
        })]
      })]
    }), jsx("div", {
      className: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
const validationSchema$1 = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Passwords must match")
});
function getTokenFromURL() {
  try {
    const url = window.location.href;
    const urlObj = new URL(url);
    return urlObj.searchParams.get("token") || "";
  } catch (error) {
    console.error("Error extracting token from URL:", error);
    return "";
  }
}
function EditInternalUser({}) {
  var _a;
  const {
    makeRequest,
    isLoading
  } = useRequest(editInternalUser);
  const {
    valueID
  } = useIDContext();
  const [user, setUser] = useState({
    email: "",
    roleId: 0,
    fullname: "",
    role: {
      name: ""
    },
    locationId: 0
  });
  useEffect(() => {
    async function getUserByID() {
      const userResponse = await createRequest(`/profile/${valueID}`, "GET");
      const userData = userResponse[0].data;
      setUser(userData);
      console.log("user data", userData);
    }
    getUserByID();
  }, [valueID]);
  const rolesApi = useRequest(getRoles, {}, true);
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue
  } = useForm({
    initialValues: {
      email: "",
      roleId: null,
      fullname: ""
    },
    onSubmit,
    validationSchema
  });
  useEffect(() => {
    if (user) {
      setFieldValue("email", user.email);
      setFieldValue("roleId", user.roleId);
      setFieldValue("fullname", user.fullname);
    }
  }, [user]);
  const roleOptions = ((_a = rolesApi.response) == null ? void 0 : _a.data) ? rolesApi.response.data.map((role) => ({
    text: role.name,
    value: role.id
  })) : [];
  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      fullname: data.fullname,
      email: data.email || (user == null ? void 0 : user.email),
      roleId: Number(data.roleId) || (user == null ? void 0 : user.roleId),
      locationId: Number(user == null ? void 0 : user.locationId),
      internalUserId: Number(valueID)
    });
    if (error) {
      return toast({
        variant: "error",
        message: (error == null ? void 0 : error.message) ?? "Failed to create user, please try again."
      });
    }
    route("/users");
  }
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "User"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs("div", {
        className: "app-create__header",
        children: [jsx("button", {
          onClick: () => route("/users"),
          children: jsx(Icon, {
            name: "caret-left"
          })
        }), jsxs("div", {
          children: [jsx("h3", {
            children: "Edit existing user"
          }), jsx("p", {
            children: "Fill the fields below to edit an existing user"
          })]
        })]
      }), jsx("div", {
        className: "app-create__form",
        children: jsxs("form", {
          onSubmit: handleSubmit,
          children: [jsx("p", {
            className: "app-create__form__title",
            children: "Full Name"
          }), jsx(Input, {
            placeholder: "Enter full name",
            ...getFieldProps("fullname")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Email Address"
          }), jsx(Input, {
            placeholder: `${user.email ? user.email : "Enter email address"}`,
            ...getFieldProps("email")
          }), jsx("p", {
            className: "app-create__form__title",
            children: "Role"
          }), jsx(Select, {
            ...getFieldProps("roleId"),
            placeholder: `${user.roleId ? user.role.name : "--select role--"}`,
            options: roleOptions
          }), jsx(Button, {
            type: "submit",
            variant: "primary",
            isLoading,
            children: "Edit User"
          })]
        })
      })]
    })]
  });
}
const validationSchema = Yup.object({
  // firstName: Yup.string().when(
  //   "userType",
  //   isExternalUser("First name is required")
  // ),
  // lastName: Yup.string().when(
  //   "userType",
  //   isExternalUser("Last name is required")
  // ),
  //   email: Yup.string().email("Email is invalid").required("Email is required"),
  //   role: Yup.string().required("Role is required"),
  //   location: Yup.string().required("Location is required"),
});
function SelectPermitRole({}) {
  var _a, _b, _c, _d;
  const {
    response,
    isLoading
  } = useRequest(getProcessablePermits, {}, true);
  const {
    profile
  } = useUserContext();
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [permissions, sertPermissions] = useState([]);
  useEffect(() => {
    async function getUserProfile() {
      var _a2, _b2, _c2, _d2, _e, _f;
      const userResponse = await createRequest(`/profile/${profile == null ? void 0 : profile.id}`, "GET");
      console.log(userResponse);
      setUserRoles((_c2 = (_b2 = (_a2 = userResponse[0]) == null ? void 0 : _a2.data) == null ? void 0 : _b2.role) == null ? void 0 : _c2.authorities);
      sertPermissions((_f = (_e = (_d2 = userResponse[0]) == null ? void 0 : _d2.data) == null ? void 0 : _e.role) == null ? void 0 : _f.permissions);
    }
    getUserProfile();
  }, [profile]);
  const handleRoleChange = (permitId, role) => {
    console.log(`Selected Role: ${role} for Permit ID: ${permitId}`);
    setSelectedRoles((prevRoles) => {
      const updatedRoles = {
        ...prevRoles,
        [permitId]: role
      };
      console.log("Updated Roles State:", updatedRoles);
      return updatedRoles;
    });
  };
  async function onSubmit() {
    var _a2, _b2;
    const authorities = Object.entries(selectedRoles).map(([permitId, authority]) => ({
      permitId: Number(permitId),
      authority
    }));
    if (authorities.length === 0) {
      toast({
        variant: "error",
        message: "Please select a role for your permits."
      });
      return;
    }
    try {
      const response2 = await createRequest("/permit/profile/authority", "PUT", {
        authorities
      });
      console.log(response2);
      if (((_a2 = response2 == null ? void 0 : response2[0]) == null ? void 0 : _a2.success) === true) {
        toast({
          variant: "success",
          message: "Permit roles updated successfully."
        });
        if (permissions == null ? void 0 : permissions.includes("FULL_ACCESS")) {
          route("/");
        } else {
          route("/permit-workflows");
        }
      } else if (((_b2 = response2 == null ? void 0 : response2[1]) == null ? void 0 : _b2.success) === false) {
        toast({
          variant: "error",
          message: "Something went wrong."
        });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      toast({
        variant: "error",
        message: "An unexpected error occurred, please try again later."
      });
    }
  }
  return jsxs("div", {
    className: "app-create-permit app-register",
    children: [jsx("div", {
      className: "app-register__nav-wrapper app-container-wrapper",
      children: jsxs("div", {
        className: "app-container app-register__nav",
        children: [jsx(Link, {
          href: `${(permissions == null ? void 0 : permissions.includes("FULL_ACCESS")) ? "/" : "/permit-workflows"}`,
          children: jsx("img", {
            src: "/svgs/logo.eptw.svg",
            alt: "eptw_logo",
            className: "permit-logo"
          })
        }), jsx("h5", {
          children: "Permit Role"
        })]
      })
    }), jsxs("div", {
      className: "app-register__content-wrapper app-container-wrapper ",
      children: [jsxs("div", {
        className: "app-register__content app-container",
        children: [jsx("div", {
          className: "app-register__content__header app-create-permit__header",
          children: jsx("h3", {
            children: "Select Permit Role"
          })
        }), jsx("p", {
          children: "For each permit listed below, kindly select the roles you will be performing"
        }), jsx("br", {}), jsx("br", {}), jsx("div", {
          className: "app-section__lg-table",
          children: jsxs(Table, {
            children: [jsx(TableHead, {
              children: jsxs(TableRow, {
                children: [jsx(TableCell, {
                  children: "PTW ID"
                }), jsx(TableCell, {
                  children: "Work Type"
                }), jsx(TableCell, {
                  children: "Work To Be Performed"
                }), jsx(TableCell, {
                  children: "Work Area"
                }), jsx(TableCell, {
                  children: "Company"
                }), jsx(TableCell, {
                  children: "Option"
                })]
              })
            }), jsx(TableBody, {
              children: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.map((data) => {
                var _a2, _b2, _c2, _d2;
                return jsxs(Fragment$1, {
                  children: [jsxs(TableRow, {
                    children: [jsx(TableCell, {
                      children: data.publicId
                    }), jsx(TableCell, {
                      children: (_a2 = data == null ? void 0 : data.type) == null ? void 0 : _a2.replace(/_/g, " ")
                    }), jsx(TableCell, {
                      children: `${data == null ? void 0 : data.workDescription.charAt(0).toUpperCase()}${data == null ? void 0 : data.workDescription.slice(1)}`
                    }), jsxs(TableCell, {
                      children: [data == null ? void 0 : data.workArea, " / ", (_b2 = data == null ? void 0 : data.location) == null ? void 0 : _b2.locationArea]
                    }), jsx(TableCell, {
                      children: ((_c2 = data == null ? void 0 : data.entrustedCompany) == null ? void 0 : _c2.name) || ((_d2 = data == null ? void 0 : data.executingCompany) == null ? void 0 : _d2.name)
                    }), jsx(TableCell, {
                      children: jsxs(Dropdown, {
                        children: [jsx(DropdownTrigger, {
                          children: selectedRoles[data.id] || "-- select an option --"
                        }), jsx(DropdownContent, {
                          children: userRoles == null ? void 0 : userRoles.map((role) => jsx("div", {
                            className: "base-dropdown__option",
                            onClick: () => handleRoleChange(data.id, role),
                            children: role
                          }, role))
                        })]
                      })
                    })]
                  }, data.publicId), jsx("br", {}), jsx("br", {})]
                });
              })
            })]
          })
        }), jsx("div", {
          className: "app-section__sm-table",
          children: jsx(Table, {
            children: jsx(TableBody, {
              children: (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.map((dataItem) => {
                var _a2, _b2, _c2;
                return jsxs("div", {
                  className: "container",
                  children: [jsxs("div", {
                    className: "location-flex",
                    children: [jsx("p", {
                      children: dataItem.publicId
                    }), jsx("h6", {
                      className: "gray",
                      children: dataItem.type
                    })]
                  }), jsx("p", {
                    children: dataItem.workDescription
                  }), jsxs("div", {
                    className: "location-flex",
                    children: [jsxs("div", {
                      className: "",
                      children: [jsx("p", {
                        className: "gray",
                        children: "Work Area :"
                      }), jsxs("h5", {
                        children: [dataItem == null ? void 0 : dataItem.workArea, " /", " ", (_a2 = dataItem == null ? void 0 : dataItem.location) == null ? void 0 : _a2.locationArea]
                      })]
                    }), jsxs("div", {
                      className: "",
                      children: [jsx("p", {
                        className: "gray",
                        children: "Entrusted Company :"
                      }), jsxs("h5", {
                        children: [((_b2 = dataItem == null ? void 0 : dataItem.entrustedCompany) == null ? void 0 : _b2.name) || ((_c2 = dataItem == null ? void 0 : dataItem.executingCompany) == null ? void 0 : _c2.name), " "]
                      })]
                    })]
                  }), jsx("br", {}), jsx("div", {
                    className: "",
                    children: jsxs(Dropdown, {
                      children: [jsx(DropdownTrigger, {
                        children: selectedRoles[dataItem.publicId] || "-- select an option --"
                      }), jsx(DropdownContent, {
                        children: userRoles == null ? void 0 : userRoles.map((role) => jsx("div", {
                          className: "base-dropdown__option",
                          onClick: () => handleRoleChange(dataItem.id, role),
                          children: role
                        }, role))
                      })]
                    })
                  })]
                }, dataItem.id);
              })
            })
          })
        }), !((_c = response == null ? void 0 : response.data) == null ? void 0 : _c.length) && jsxs("div", {
          className: "base-empty",
          children: [jsx("img", {
            src: "/svgs/document.svg",
            alt: "no-data"
          }), jsx("div", {
            children: isLoading ? jsx(Fragment$1, {
              children: jsx("p", {
                children: "Fetching processable permits, please wait..."
              })
            }) : jsxs("div", {
              className: "",
              children: [jsx("p", {
                children: "No processable permits yet"
              }), jsx(Button, {
                onClick: () => route(`${(permissions == null ? void 0 : permissions.includes("FULL_ACCESS")) ? "/" : "/permit-workflows"}`),
                variant: "primary",
                children: "Go to home page"
              })]
            })
          })]
        }), ((_d = response == null ? void 0 : response.data) == null ? void 0 : _d.length) && jsxs("div", {
          className: "app-register__form-footer",
          children: [jsxs(Button, {
            variant: "primary",
            onClick: onSubmit,
            children: ["Submit", jsx(Icon, {
              name: "arrow-right"
            })]
          }), jsx(Button, {
            variant: "secondary",
            onClick: () => route(`${(permissions == null ? void 0 : permissions.includes("FULL_ACCESS")) ? "/" : "/permit-workflows"}`),
            children: "Home"
          })]
        })]
      }), jsx("img", {
        src: "/svgs/auth-blur.svg",
        alt: "auth-blur"
      })]
    })]
  });
}
function Profile({}) {
  var _a, _b, _c;
  const {
    profile
  } = useUserContext();
  console.log(profile);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const getUserProfile = async () => {
      const userResponse = await createRequest(`/profile/${profile == null ? void 0 : profile.id}`, "GET");
      console.log(userResponse);
      setUserDetails(userResponse[0].data);
    };
    if (profile) {
      getUserProfile();
    }
  }, []);
  return jsxs(Fragment$1, {
    children: [jsx(Header, {
      title: "Profile"
    }), jsxs("div", {
      className: "app-page",
      children: [jsxs(Accordion, {
        title: "Personal Details",
        show: true,
        children: [jsx(AccordionItem, {
          title: "Profile Photo",
          value: jsx("div", {
            className: "app-profile__avatar ",
            children: getInitials(profile.fullname)
          })
        }), jsx(AccordionItem, {
          title: "Full Name",
          value: `${profile.fullname}`
        }), jsx(AccordionItem, {
          title: "Email Address",
          value: profile.email
        })]
      }), jsxs(Accordion, {
        title: "Role Details",
        show: true,
        children: [jsx(AccordionItem, {
          title: "Role",
          value: ((_a = userDetails.role) == null ? void 0 : _a.name) ?? "---"
        }), jsx(AccordionItem, {
          title: "Location",
          value: `${(_b = userDetails.location) == null ? void 0 : _b.locationArea}, ${(_c = userDetails.location) == null ? void 0 : _c.site}`
        }), jsx(AccordionItem, {
          title: "Date Joined",
          value: dayjs(profile.createdAt).format("MMM DD, YYYY  HH:mm A")
        })]
      })]
    })]
  });
}
function SocialLogin({}) {
  const userContext = useUserContext();
  const {
    makeRequest
  } = useRequest(socialLogin);
  const initiateLogin = async (token) => {
    const [res, error] = await makeRequest({
      access_token: token
    });
    if (error) {
      return toast({
        message: error == null ? void 0 : error.message,
        variant: "error"
      });
    }
    userContext.login(res == null ? void 0 : res.data);
  };
  useEffect(() => {
    async function socialLogin2() {
      try {
        await initializeMsal();
        const response = await msalInstance.handleRedirectPromise();
        if (response) {
          sessionStorage.setItem("access_token", response == null ? void 0 : response.accessToken);
          console.log(response, "this is the response");
          initiateLogin(response == null ? void 0 : response.accessToken);
        }
      } catch (error) {
        console.error("Error handling redirect:", error);
      }
    }
    socialLogin2();
  }, []);
  return jsxs("div", {
    className: "app-login",
    children: [jsxs("div", {
      className: "app-login__card",
      children: [jsxs("div", {
        className: "app-login__card__text",
        children: [jsx("img", {
          src: "/svgs/logo.svg",
          alt: "Oando-logo",
          className: "app-login__card__logo"
        }), jsxs("h2", {
          children: ["Electronic Permit to Work System ", jsx("strong", {
            children: "(e-PTW)"
          })]
        })]
      }), jsxs("div", {
        className: "app-login__card__form login",
        children: [jsx("br", {}), jsx("br", {}), jsx("br", {}), jsx("br", {}), jsx("br", {}), jsx("br", {}), jsx(Button, {
          variant: "primary",
          isLoading: true,
          children: "Logging you in ..."
        })]
      })]
    }), jsx("div", {
      class: "app-login__footer",
      children: jsx("a", {
        href: "mailto:helpdesk@oandoplc.com",
        className: "app-link",
        children: "Need help?"
      })
    }), jsx("img", {
      className: "app-login__blur",
      src: "/svgs/auth-blur.svg",
      alt: "auth-blur"
    })]
  });
}
function App() {
  return jsxs(Router, {
    children: [jsx(Login, {
      path: "/login"
    }), jsx(ForgotPassword, {
      path: "/forgot-password"
    }), jsx(ResetPassword, {
      path: "/reset-password"
    }), jsx(CompleteOnboarding, {
      path: "/complete-onboarding"
    }), jsx(SocialLogin, {
      path: "/social-login"
    }), jsx(AuthGuard, {
      default: true,
      children: jsxs(Router, {
        children: [jsx(CreatePermit, {
          path: "/permit/create"
        }), jsx(ApprovePermit, {
          path: "/permit-management/ptw/approve/:id"
        }), jsx(PermitRenewal, {
          path: "/permit-management/ptw/renew/:id"
        }), jsx(PermitOnsiteComments, {
          path: "/permit-management/ptw/add-comment/:id"
        }), jsx(ProcessIssuingPermit, {
          path: "/activities-process"
        }), jsx(ProcessHsePermit, {
          path: "/activities-process/hse"
        }), jsx(ProcessAuthorizingPermit, {
          path: "/activities-process/auth"
        }), jsx(ProcessPerfSupervisorPermit, {
          path: "/activities-process/perf-supervisor"
        }), jsx(ProcessSafetyOfficerPermit, {
          path: "/activities-process/safety-officer"
        }), jsx(ProcessIssuSupervisorPermit, {
          path: "/activities-process/issu-supervisor"
        }), jsx(RevalidatePerfAuth, {
          path: "/revalidate-perf-auth"
        }), jsx(RevalidateSafetyOfficer, {
          path: "/revalidate-safety-officer"
        }), jsx(RevalidateIssuingSupervisor, {
          path: "/revalidate-issuing-supervisor"
        }), jsx(ClosurePerfAuth, {
          path: "/closure-perf-auth"
        }), jsx(ClosureSafetyOfficer, {
          path: "/closure-safety-officer"
        }), jsx(ClosureIssuingSupervisor, {
          path: "/closure-issuing-supervisor"
        }), jsx(SelectPermitRole, {
          path: "/select-permit-role"
        }), jsx(OnsiteCommentsView, {
          path: "/add-onsite-comments"
        }), jsx(AppLayout, {
          default: true,
          children: jsxs(Router, {
            children: [jsx(Overview, {
              path: "/"
            }), jsx(Activities, {
              path: "/audits"
            }), jsx(Analytics, {
              path: "/analytics"
            }), jsx(Roles, {
              path: "/roles"
            }), jsx(CreateRole, {
              path: "/roles/create"
            }), jsx(EditRole, {
              path: "/roles/edit"
            }), jsx(Locations, {
              path: "/locations"
            }), jsx(CreateLocation, {
              path: "/locations/create/location-area"
            }), jsx(CreateLocation, {
              path: "/locations/create/location-area"
            }), jsx(CreateWork, {
              path: "/locations/create/work-area"
            }), jsx(EditLocation, {
              path: "/locations/edit"
            }), jsx(Users, {
              path: "/users"
            }), jsx(CreateCompany, {
              path: "/users/create-company"
            }), jsx(CompanyDetails, {
              path: "/users/company/details"
            }), jsx(CreateExternalUser, {
              path: "/users/create-external"
            }), jsx(CreateInternalUser, {
              path: "/users/create-internal"
            }), jsx(EditUser, {
              path: "/users/edit"
            }), jsx(EditInternalUser, {
              path: "/interal-user/edit"
            }), jsx(EditCompany, {
              path: "/users/edit-company"
            }), jsx(Workflows, {
              path: "/permit-workflows"
            }), jsx(ActivitiesFlow, {
              path: "/permit-activities"
            }), jsx(Monitoring, {
              path: "/permit-monitoring"
            }), jsx(Storage, {
              path: "/permit-storage"
            }), jsx(MonitoringDetailsIndex, {
              path: "/monitoring-details"
            }), jsx(PermitManagementDetails, {
              path: "/permit-management"
            }), jsx(StorageDetails, {
              path: "/permit-storage/details"
            }), jsx(ProcessPermitsIndex, {
              path: "process-permits"
            }), jsx(RevalidatePermitIndex, {
              path: "/revalidate-permit"
            }), jsx(ClosurePermitIndex, {
              path: "/permit-closure"
            }), jsx(PermitToWorkDetails, {
              path: "/permit-management/ptw/:id"
            }), jsx(PermitRenewals, {
              path: "/permit-renewals"
            }), jsx(PermitRenewalsDetails, {
              path: "/permit-renewals/ptw/:id"
            }), jsx(WorkCompletions, {
              path: "/permit-completions"
            }), jsx(WorkCompletionDetails, {
              path: "/permit-completions/:id"
            }), jsx(WorkSuspensions, {
              path: "/permit-suspensions"
            }), jsx(WorkContinuationDetails, {
              path: "/permit-suspensions/continuation/:id"
            }), jsx(Drafts, {
              path: "/permit-drafts"
            }), jsx(Profile, {
              path: "/profile"
            })]
          })
        })]
      })
    })]
  });
}
function Module({}) {
  return jsx(MsalProvider, {
    instance: msalInstance,
    children: jsx(UserProvider, {
      children: jsx(IDProvider, {
        children: jsxs(PermitDetailsProvider, {
          children: [jsx(DraftDetailsProvider, {
            children: jsx(App, {})
          }), jsx(ToastBar, {})]
        })
      })
    })
  });
}
function AuthGuard({
  children
}) {
  const {
    isAuthenticated
  } = useUserContext();
  useEffect(() => {
    if (!isAuthenticated)
      route("/login");
  }, []);
  if (!isAuthenticated)
    return null;
  return jsx(Fragment$1, {
    children
  });
}
function renderApp() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link
        rel="icon"
        type="image/svg+xml"
        href="/public/svgs/oando-favicon.ico"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oando EPTW</title>
    </head>
    <body>
        <div id="app">${F(jsx(Module, {}))}</div>
    </body>
    </html>`;
}
export {
  renderApp
};
