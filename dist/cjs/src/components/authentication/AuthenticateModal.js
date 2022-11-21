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
exports.Authenticate = void 0;
const react_1 = __importStar(require("react"));
const Login_1 = __importDefault(require("./Login"));
const Signup_1 = __importDefault(require("./Signup"));
const Button_1 = __importDefault(require("../../component-library/Button"));
const Modal_1 = __importDefault(require("../../component-library/Modal"));
require("./AuthenticateModal.css");
const Authenticate = (_a) => {
    var { isOpen, initial, onClose, onAuth, loggedIn } = _a, props = __rest(_a, ["isOpen", "initial", "onClose", "onAuth", "loggedIn"]);
    const [authMode, setAuthMode] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        setAuthMode(initial || '');
    }, [initial]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Modal_1.default, { size: "md", id: "authmodal_sign-up", ariaLabel: authMode, heading: authMode, isOpen: isOpen, onClose: onClose }, isOpen ?
            react_1.default.createElement(react_1.default.Fragment, null, loggedIn ?
                react_1.default.createElement("div", { className: "authmodal_confirmation" },
                    react_1.default.createElement("img", { src: "/public/img/brand/confirmationscrungus.png", alt: "You have successfully authenticated." }),
                    react_1.default.createElement("p", null,
                        "You have successfully ",
                        authMode === 'Log In' ? 'logged in' : 'signed up',
                        "!"),
                    react_1.default.createElement(Button_1.default, { look: "primary", id: "continue", onClick: onClose }, "Into the cave!"))
                :
                    react_1.default.createElement(react_1.default.Fragment, null, authMode === 'Log In' ?
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(Login_1.default, { onLogIn: onAuth }),
                            react_1.default.createElement(Button_1.default, { id: "authmodal_sign-up", look: "muted", onClick: () => { setAuthMode('Sign Up'); } }, "Sign Up"))
                        :
                            react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(Signup_1.default, { onSignup: onAuth }),
                                react_1.default.createElement(Button_1.default, { id: "authmodal_sign-up", look: "muted", onClick: () => { setAuthMode('Log In'); } }, "Log In"))))
            :
                "")));
};
exports.Authenticate = Authenticate;
exports.default = exports.Authenticate;
