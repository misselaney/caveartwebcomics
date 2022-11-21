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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Main_1 = __importDefault(require("./pages/Main"));
const Home_1 = require("./pages/Home");
const ManageComics_1 = __importDefault(require("./pages/ManageComics"));
const NewComic_1 = __importDefault(require("./pages/NewComic"));
const public_1 = __importDefault(require("./pages/public"));
const UploadComic_1 = __importDefault(require("./pages/UploadComic"));
const Navigation_1 = __importDefault(require("./component-library/Navigation"));
const axios_1 = __importDefault(require("axios"));
const { Read, NotFound, TermsOfService } = public_1.default;
const AuthenticateModal_1 = __importDefault(require("./components/authentication/AuthenticateModal"));
const Link_1 = __importDefault(require("./component-library/Link"));
axios_1.default.defaults.withCredentials = true;
axios_1.default.defaults.baseURL = 'http://localhost:5000';
function App() {
    const existingTokens = localStorage.getItem('tokens');
    const checkAuth = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)({
                method: 'get',
                url: 'http://localhost:5000/api/user/session',
            })
                .then((session) => {
                return true;
            })
                .catch((err) => {
                return false;
                console.error(existingTokens);
                console.error(err);
            });
        });
    };
    const [authModalOpen, setAuthModalOpen] = (0, react_1.useState)(false);
    const [authMode, setAuthMode] = (0, react_1.useState)('');
    const [auth, setAuth] = (0, react_1.useState)({
        token: existingTokens,
        loggedIn: Boolean(existingTokens)
    });
    const logIn = function (data) {
        localStorage.setItem('tokens', JSON.stringify(data));
        setAuth(prevState => (Object.assign(Object.assign({}, prevState), { token: localStorage.getItem('tokens'), loggedIn: true })));
    };
    const logOut = function () {
        (0, axios_1.default)({
            method: 'post',
            url: '/api/user/logout',
        })
            .then(() => {
            localStorage.setItem('tokens', '');
            setAuth(prevState => (Object.assign(Object.assign({}, prevState), { loggedIn: false })));
        })
            .catch((err) => {
            console.error(err);
        });
    };
    function PrivateOutlet() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuth = yield checkAuth();
            return isAuth ? react_1.default.createElement(react_router_dom_1.Outlet, null) : react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login" });
        });
    }
    // TODO later: https://www.robinwieruch.de/react-router-private-routes/
    function closeModal() {
        setAuthModalOpen(false);
    }
    function openAuth(mode) {
        setAuthModalOpen(true);
        setAuthMode(mode);
        const el = document.querySelector('#authmodal_sign-up');
        el.focus();
    }
    return (react_1.default.createElement("div", { className: "app" },
        react_1.default.createElement(AuthenticateModal_1.default, { isOpen: authModalOpen, onClose: closeModal, onAuth: logIn, loggedIn: auth.loggedIn, initial: authMode }),
        react_1.default.createElement(Navigation_1.default, { loggedIn: auth.loggedIn, onSignup: () => { openAuth('Sign Up'); }, onLogIn: () => { openAuth('Log In'); }, onLogout: logOut }),
        react_1.default.createElement("div", { className: authModalOpen ? 'Blurred app_body' : 'app_body' },
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Main_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "comic/:comic" },
                    react_1.default.createElement(react_router_dom_1.Route, { path: "read" },
                        react_1.default.createElement(react_router_dom_1.Route, { path: "", element: react_1.default.createElement(Read, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: ":page", element: react_1.default.createElement(Read, null) })),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "about", element: react_1.default.createElement(react_1.default.Fragment, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "archive", element: react_1.default.createElement(react_1.default.Fragment, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "gallery", element: react_1.default.createElement(react_1.default.Fragment, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "cast", element: react_1.default.createElement(react_1.default.Fragment, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "blog", element: react_1.default.createElement(react_1.default.Fragment, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "store", element: react_1.default.createElement(react_1.default.Fragment, null) })),
                react_1.default.createElement(react_router_dom_1.Route, { path: "policy" },
                    react_1.default.createElement(react_router_dom_1.Route, { path: "tos", element: react_1.default.createElement(TermsOfService, null) })),
                auth.loggedIn ?
                    react_1.default.createElement(react_router_dom_1.Route, { path: "home", element: react_1.default.createElement(Home_1.Home, { onLogOut: logOut }) })
                    :
                        '',
                auth.loggedIn ?
                    react_1.default.createElement(react_router_dom_1.Route, { path: "manage" },
                        react_1.default.createElement(react_router_dom_1.Route, { path: "comics", element: react_1.default.createElement(ManageComics_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "new", element: react_1.default.createElement(NewComic_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "upload/:comic", element: react_1.default.createElement(UploadComic_1.default, null) }))
                    :
                        '',
                react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(NotFound, null) }))),
        react_1.default.createElement("div", { className: authModalOpen ? 'Blurred app_footer' : 'app_footer' },
            react_1.default.createElement(Link_1.default, { id: "footer_tos", href: "/policy/tos" }, "Terms of Service"))));
}
exports.default = App;
