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
require("../design/Style.css");
require("./Icon.css");
const navigation_1 = __importDefault(require("./paths/navigation"));
const Icon = (_a) => {
    var { id, classes = '', name = '', viewbox, title, width, height, disabled } = _a, props = __rest(_a, ["id", "classes", "name", "viewbox", "title", "width", "height", "disabled"]);
    const svg = navigation_1.default[name];
    const opts = {
        fillRule: svg.fillRule || null,
        clipRule: svg.clipRule || null,
        d: svg.d || null
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("svg", { className: `icon ${classes} ${disabled ? 'Disabled' : ''}`.trim(), version: "1.1", height: `${height ? height : '16'}px`, width: `${width ? width : '16'}px`, xmlns: "http://www.w3.org/2000/svg", viewBox: viewbox || '0 0 16 16' },
            react_1.default.createElement("title", null,
                "$",
                title || `${name} icon`),
            react_1.default.createElement("path", Object.assign({}, opts)))));
};
exports.default = Icon;
