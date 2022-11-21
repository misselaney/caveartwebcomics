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
require("./Button.css");
const Button = (_a) => {
    var { id, look, children, classes = '', disabled, onClick, role, tabIndex, type } = _a, props = __rest(_a, ["id", "look", "children", "classes", "disabled", "onClick", "role", "tabIndex", "type"]);
    const _onClick = function (e) {
        if (onClick) {
            onClick(e);
        }
    };
    return (react_1.default.createElement("button", { disabled: disabled, onClick: (e) => { _onClick(e); }, className: `button ${classes} ${(0, classnames_1.default)({
            'Disabled': !!disabled,
            'Muted': look === 'muted',
            'Primary': look === 'primary',
            'Warning': look === 'warning'
        })}`.trim(), role: role, tabIndex: tabIndex, type: type }, children));
};
exports.default = Button;
