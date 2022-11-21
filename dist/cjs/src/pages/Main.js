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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
function Main() {
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`/api/comic/recent`)
            .then((res) => {
            if (Array.isArray(res.data)) {
                console.log(res.data);
                setComics(res.data);
            }
        });
    }, []);
    const [comics, setComics] = (0, react_1.useState)([]);
    return (react_1.default.createElement("div", null, comics.map((comic, idx) => {
        return (react_1.default.createElement("a", { href: `comic/${comic.subdomain}/read`, className: "comicTiles", key: idx },
            react_1.default.createElement("img", { className: "comicTiles__thumbnail", src: comic.thumbnail }),
            react_1.default.createElement("span", { className: "comicTiles__title" }, comic.name)));
    })));
}
exports.default = Main;
