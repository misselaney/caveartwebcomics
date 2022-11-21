"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFound_1 = __importDefault(require("./NotFound"));
const Read_1 = __importDefault(require("./Read"));
const TermsOfService_1 = __importDefault(require("./TermsOfService"));
exports.default = {
    NotFound: NotFound_1.default,
    TermsOfService: TermsOfService_1.default,
    Read: Read_1.default,
};
