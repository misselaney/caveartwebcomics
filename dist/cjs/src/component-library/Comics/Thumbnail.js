"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Thumbnail.css");
function Thumbnail() {
    return (react_1.default.createElement("div", { className: "thumbnail" },
        react_1.default.createElement("div", { className: "thumbnail_overlay" }),
        react_1.default.createElement("img", { src: "/public/img/brand/cave.png", className: "thumbnail_image" })));
}
exports.default = Thumbnail;
