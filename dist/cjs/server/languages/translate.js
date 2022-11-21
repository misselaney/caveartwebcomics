"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const english_1 = __importDefault(require("./english"));
const translator = {
    translate: function (phrase) {
        return english_1.default[phrase] || `Translation missing: ${phrase}`;
    }
};
exports.default = translator;
