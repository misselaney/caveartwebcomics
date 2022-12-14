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
const classnames_1 = __importDefault(require("classnames"));
require("../design/Style.css");
require("./Link.css");
const Link = (_a) => {
    var { id, children = 'Link', href = '#', target = '_self', classes = '', disabled, inline, onClick } = _a, props = __rest(_a, ["id", "children", "href", "target", "classes", "disabled", "inline", "onClick"]);
    return (react_1.default.createElement("a", { href: href, target: target, className: `link ${classes} ${(0, classnames_1.default)({
            'Inline': !!inline
        })}`.trim(), onClick: (e) => {
            if (!disabled && onClick) {
                onClick();
            }
        } }, children));
};
exports.default = Link;
