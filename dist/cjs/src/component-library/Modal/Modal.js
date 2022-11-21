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
require("./Modal.css");
const Icon_1 = __importDefault(require("../Icon"));
const Button_1 = __importDefault(require("../Button"));
const Modal = (_a) => {
    var { actionButtonLabel = '', ariaLabel = '', children, classes = '', closeButtonLabel = 'Close', heading, isAlert, id, isOpen, isWarning, onAction, onClose, onKeyDown, persistent, size, scrolls, disabled } = _a, props = __rest(_a, ["actionButtonLabel", "ariaLabel", "children", "classes", "closeButtonLabel", "heading", "isAlert", "id", "isOpen", "isWarning", "onAction", "onClose", "onKeyDown", "persistent", "size", "scrolls", "disabled"]);
    const doButtonBay = function () {
        return actionButtonLabel;
    };
    const focusTrap = function () {
        if (isOpen) {
            const element = document.querySelector(`#${id}`);
            if (element) {
                element.focus();
            }
        }
    };
    const _onClose = function () {
        if (onClose) {
            onClose();
        }
    };
    const _onClick = function () {
        if (onAction) {
            onAction();
        }
    };
    const _onKeyDown = function (e) {
        if (onKeyDown) {
            onKeyDown(e);
        }
    };
    const checkEscape = function (e) {
        if (e.code === 'Escape') {
            if (!persistent && !!onClose) {
                onClose();
            }
        }
    };
    const checkClickOut = function (e) {
        const clickedNode = e.target;
        const classList = clickedNode.classList.value.split(' ');
        if (classList.includes('modal')) { // then we are clicking outside of the content
            if (!persistent && !!onClose) {
                onClose();
            }
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { tabIndex: 0, onFocus: focusTrap }),
        react_1.default.createElement("dialog", { "aria-hidden": !isOpen, "aria-label": ariaLabel ? ariaLabel : heading || 'Modal', className: `modal ${classes} ${(0, classnames_1.default)({
                Open: isOpen,
                Alert: isAlert,
                Warning: isWarning
            })}`
                .trim(), id: id, onClick: (e) => { checkClickOut(e); }, onKeyUp: (e) => { checkEscape(e); }, onKeyDown: (e) => { _onKeyDown(e); }, role: isAlert ? 'alertdialog' : 'dialog', tabIndex: -1, open: isOpen },
            react_1.default.createElement("div", { className: `modal_content ${(0, classnames_1.default)({
                    Scrolling: scrolls,
                    Small: size === 'sm',
                    Medium: size === 'md',
                    Large: size === 'lg',
                })}`.trim() },
                react_1.default.createElement("div", { className: "modal_header" },
                    react_1.default.createElement("span", { className: "modal_title" }, heading),
                    react_1.default.createElement("button", { type: "button", className: "modal_close", onClick: _onClose, "aria-label": closeButtonLabel },
                        react_1.default.createElement(Icon_1.default, { id: `${id}-close-icon`, width: "24", height: "24", name: "close" }))),
                react_1.default.createElement("div", { className: "modal_body" }, children),
                doButtonBay() ?
                    (react_1.default.createElement("div", { className: "modal_footer" },
                        react_1.default.createElement("div", { className: "modal_close-button-container" },
                            react_1.default.createElement(Button_1.default, { id: `${id}-close`, type: "button", onClick: () => { onClose(); }, look: "muted" }, closeButtonLabel)),
                        react_1.default.createElement("div", { className: "modal_action-button-container" },
                            react_1.default.createElement(Button_1.default, { id: `${id}-action`, type: "button", onClick: _onClick, look: "primary" }, actionButtonLabel))))
                    :
                        '')),
        react_1.default.createElement("div", { tabIndex: 0, onFocus: focusTrap })));
};
exports.default = Modal;
