"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthContext = void 0;
const react_1 = require("react");
exports.AuthContext = (0, react_1.createContext)(null);
function useAuth() {
    return (0, react_1.useContext)(exports.AuthContext);
}
exports.useAuth = useAuth;
