"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./ButtonSkeleton.css");
const ButtonSkeleton = () => {
    return (react_1.default.createElement("div", { className: "buttonskeleton" },
        react_1.default.createElement("span", { className: "SkeletonLoading" }, "\u00A0")));
};
exports.default = ButtonSkeleton;
