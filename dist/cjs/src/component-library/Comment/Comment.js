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
const Comment = (_a) => {
    var { id, classes = '', tabIndex } = _a, props = __rest(_a, ["id", "classes", "tabIndex"]);
    return (react_1.default.createElement("article", { className: "userpost", role: "article", "data-testid": "comment" },
        react_1.default.createElement("div", { className: "userpost_avatar" },
            react_1.default.createElement("img", { src: "#" })),
        react_1.default.createElement("div", { className: "userpost_content" },
            react_1.default.createElement("div", { className: "userpost_user" },
                react_1.default.createElement("a", { href: "#" }, "Jimbo Jones")),
            "Handgloves")));
};
exports.default = Comment;