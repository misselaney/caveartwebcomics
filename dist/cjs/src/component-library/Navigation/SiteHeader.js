"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ButtonSet_1 = __importDefault(require("../Button/ButtonSet/ButtonSet"));
const Button_1 = __importDefault(require("../Button"));
const Link_1 = __importDefault(require("../Link"));
require("./Navigation.css");
const SiteHeader = (_a) => {
    var { loggedIn = false, onLogIn, onLogout, onSignup } = _a, props = __rest(_a, ["loggedIn", "onLogIn", "onLogout", "onSignup"]);
    return (react_1.default.createElement("div", { className: "horizontal-nav" },
        react_1.default.createElement("div", { className: "horizontal-nav_inner" },
            react_1.default.createElement("a", { href: "/", className: "horizontal-nav_brand" },
                react_1.default.createElement("img", { alt: "Cave Art!", src: '/public/img/brand/headerlogo.png', width: '200' }),
                react_1.default.createElement("span", { className: "horizontal-nav_tagline" }, "Comics that rock!")),
            loggedIn ?
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Link_1.default, { id: "horizontal-nav_manage", href: "/manage/comics" }, "My Webcomics"),
                    react_1.default.createElement(Link_1.default, { id: "horizontal-nav_manage", href: "/manage" }, "My Pull (Into Cave) List"))
                : "",
            react_1.default.createElement("div", { className: "horizontal-nav_authentication" }, loggedIn ?
                (react_1.default.createElement(Button_1.default, { id: "header-logout", onClick: onLogout }, "Log Out"))
                :
                    (react_1.default.createElement(ButtonSet_1.default, null,
                        react_1.default.createElement(Button_1.default, { id: "header-signup", onClick: onSignup }, "Sign Up"),
                        react_1.default.createElement(Button_1.default, { id: "header-login", onClick: onLogIn, look: "primary" }, "Log In")))))));
};
exports.default = SiteHeader;
