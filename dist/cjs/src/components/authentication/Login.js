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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const TextInput_1 = __importDefault(require("../../component-library/Form/TextInput"));
const Button_1 = __importDefault(require("../../component-library/Button"));
const Login = (props) => {
    const validateEmail = function () {
        setEmailError("");
        const regex = /^([\w.%+-]+)@([\w-]+).([\w]{2,})$/i;
        const isValid = !!email.match(regex);
        setValidEmail(isValid);
    };
    const validatePassword = function () {
        setPasswordError("");
        const isValid = password.length > 7;
        setValidPassword(isValid);
    };
    const onInputEmail = function (e) {
        setEmail(e.target.value);
        validateEmail();
    };
    const onInputPassword = function (e) {
        setPassword(e.target.value);
        validatePassword();
    };
    const cleanSlate = function () {
        setServerError('');
        setEmailError('');
        setPasswordError('');
        setEmailState('default');
        setPasswordState('default');
    };
    const validateLogin = function () {
        cleanSlate();
        validateEmail();
        if (!validEmail) {
            console.log("Email not valid.");
            setEmailError('Please enter a valid email address.');
            setEmailState('error');
        }
        validatePassword();
        if (!validPassword) {
            console.log("Password not valid.");
            setPasswordError('This password needs to be at least 8 characters long.');
            setPasswordState('error');
        }
    };
    const logIn = function () {
        validateLogin();
        if (validEmail && validPassword) {
            (0, axios_1.default)({
                method: 'post',
                url: '/api/user/login',
                data: { email, password }
            })
                .then((res) => {
                setEmail("");
                setPassword("");
                props.onLogIn(res.data);
            })
                .catch((err) => {
                setServerError(err.response.data);
            });
        }
    };
    const [email, setEmail] = (0, react_1.useState)("");
    const [emailState, setEmailState] = (0, react_1.useState)('default');
    const [password, setPassword] = (0, react_1.useState)("");
    const [passwordState, setPasswordState] = (0, react_1.useState)('default');
    const [validEmail, setValidEmail] = (0, react_1.useState)(false);
    const [validPassword, setValidPassword] = (0, react_1.useState)(false);
    const [serverError, setServerError] = (0, react_1.useState)("");
    const [emailError, setEmailError] = (0, react_1.useState)("");
    const [passwordError, setPasswordError] = (0, react_1.useState)("");
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", { noValidate: true },
            react_1.default.createElement("fieldset", null,
                react_1.default.createElement(TextInput_1.default, { errorText: emailError, id: "login_email", labelText: "Email", onChange: (e) => { onInputEmail(e); }, placeholderText: "unga@bunga.com", status: emailState, type: "email" }),
                react_1.default.createElement(TextInput_1.default, { errorText: passwordError, id: "login_password", labelText: "Password", onChange: (e) => { onInputPassword(e); }, status: passwordState, type: "password" })),
            react_1.default.createElement(Button_1.default, { id: "login_submit", type: "button", onClick: logIn, look: "primary" }, "Log In"),
            serverError ? react_1.default.createElement("span", { className: "signup_server-message Error" }, serverError) : '')));
};
exports.Login = Login;
exports.default = exports.Login;
