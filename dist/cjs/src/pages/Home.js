"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = __importDefault(require("react"));
const Home = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("a", { href: "/manage/comics" }, "My Webcomics")));
};
exports.Home = Home;
