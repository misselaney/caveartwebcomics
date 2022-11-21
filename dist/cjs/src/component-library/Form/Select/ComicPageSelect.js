"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
require("../../design/Style.css");
require("../Form.css");
require("./Select.css");
const SelectOption = ({ value, label, }) => {
    return (react_1.default.createElement("a", { className: "dropdown-menu_item", href: `${value}` }, label));
};
const ComicPageSelect = (_a) => {
    var { id, options, current, classes = '', disabled, hasError } = _a, props = __rest(_a, ["id", "options", "current", "classes", "disabled", "hasError"]);
    const wrapperRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = function (event) {
            const target = event.target;
            if (wrapperRef.current && !wrapperRef.current.contains(target)) {
                setIsOpen(false);
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const toggleMenu = function () {
        setIsOpen(!isOpen);
    };
    return (react_1.default.createElement("div", { ref: wrapperRef, className: "form-field" },
        react_1.default.createElement("div", { className: `dropdown-menu ${classes} ${(0, classnames_1.default)({
                'Disabled': disabled,
                'Error': hasError
            })}`.trim() },
            react_1.default.createElement("button", { type: "button", className: (0, classnames_1.default)({ 'dropdown-menu_toggler': true, 'Open': isOpen }), "aria-label": "open options menu", id: `${id}-toggler`, "aria-pressed": isOpen, onClick: toggleMenu }, current),
            react_1.default.createElement("div", { "area-expanded": isOpen.toString(), "aria-labelledby": `${id}-toggler`, className: `dropdown-menu_panel ${(0, classnames_1.default)({ Opened: isOpen, Closed: !isOpen })}` },
                react_1.default.createElement("div", { className: "dropdown-menu_itemlist", role: "group", "aria-label": "Menu options" }, options.map((option, idx) => {
                    return (react_1.default.createElement(SelectOption, { key: idx, value: option.value, label: option.label }));
                }))))));
};
exports.default = ComicPageSelect;
