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
exports.Signup = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const TextInput_1 = __importDefault(require("../../component-library/Form/TextInput"));
const Button_1 = __importDefault(require("../../component-library/Button"));
const Signup = (props) => {
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
    const validatePasswordVerification = function () {
        const isValid = password === passwordVerification;
        setValidPasswordVerification(isValid);
    };
    const validateName = function () {
        setNameError("");
        const isValid = name.length > 0;
        setValidName(isValid);
    };
    const onInputEmail = function (e) {
        setEmail(e.target.value);
        validateEmail();
    };
    const onInputPassword = function (e) {
        setPassword(e.target.value);
        validatePassword();
    };
    const onInputPasswordVerification = function (e) {
        setPasswordVerification(e.target.value);
        validatePasswordVerification();
    };
    const onInputName = function (e) {
        setName(e.target.value);
        validateName();
    };
    const cleanSlate = function () {
        setServerError('');
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setEmailState('default');
        setPasswordState('default');
        setNameState('default');
        setPasswordVerificationState('default');
    };
    const validateSignup = function () {
        cleanSlate();
        validateName();
        validateEmail();
        validatePassword();
        validatePasswordVerification();
        if (!validName) {
            setNameError('Please enter a valid username.');
            setNameState('error');
        }
        if (!validEmail) {
            setEmailError('Please enter a valid email address.');
            setEmailState('error');
        }
        if (!validPassword) {
            setPasswordError('This password needs to be at least 8 characters long.');
            setPasswordState('error');
        }
        if (!validPasswordVerification) {
            setPasswordVerificationState('error');
        }
    };
    const signUp = function () {
        validateSignup();
        if (validName && validEmail && validPassword && validPasswordVerification) {
            (0, axios_1.default)({
                method: 'post',
                url: '/api/user/new',
                data: { name, email, password }
            })
                .then((res) => {
                setName("");
                setEmail("");
                setPassword("");
                props.onSignup(res.data);
            })
                .catch((err) => {
                console.error(err);
                setServerError("This email address already exists.");
            });
        }
    };
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [passwordVerification, setPasswordVerification] = (0, react_1.useState)("");
    const [emailState, setEmailState] = (0, react_1.useState)('default');
    const [passwordState, setPasswordState] = (0, react_1.useState)('default');
    const [nameState, setNameState] = (0, react_1.useState)('default');
    const [passwordVerificationState, setPasswordVerificationState] = (0, react_1.useState)('default');
    const [validName, setValidName] = (0, react_1.useState)(false);
    const [validEmail, setValidEmail] = (0, react_1.useState)(false);
    const [validPassword, setValidPassword] = (0, react_1.useState)(false);
    const [validPasswordVerification, setValidPasswordVerification] = (0, react_1.useState)(false);
    const [nameError, setNameError] = (0, react_1.useState)("");
    const [emailError, setEmailError] = (0, react_1.useState)("");
    const [passwordError, setPasswordError] = (0, react_1.useState)("");
    const [serverError, setServerError] = (0, react_1.useState)("");
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", { noValidate: true },
            react_1.default.createElement("fieldset", null,
                react_1.default.createElement(TextInput_1.default, { labelText: "Username", id: "signup_name", onChange: (e) => { onInputName(e); }, status: nameState, type: "text", placeholderText: "Captain Caveman", errorText: nameError }),
                react_1.default.createElement(TextInput_1.default, { labelText: "Email", id: "signup_email", onChange: (e) => { onInputEmail(e); }, status: emailState, placeholderText: "unga@bunga.com", type: "email", errorText: emailError }),
                react_1.default.createElement(TextInput_1.default, { labelText: "Password", helperText: "Pick a password with at least 8 characters!", placeholderText: "", errorText: passwordError, status: passwordState, id: "signup_password", onChange: (e) => { onInputPassword(e); }, type: "password" }),
                react_1.default.createElement(TextInput_1.default, { labelText: "Verify Password", errorText: "Passwords must match.", placeholderText: "", status: passwordVerificationState, id: "signup_password_verification", onChange: (e) => { onInputPasswordVerification(e); }, type: "password" })),
            react_1.default.createElement(Button_1.default, { id: "authenticate_signup", type: "button", onClick: signUp, look: "primary" }, "Sign Up"),
            serverError ? react_1.default.createElement("span", { className: "signup_server-message Error" }, serverError) : '')));
};
exports.Signup = Signup;
exports.default = exports.Signup;
