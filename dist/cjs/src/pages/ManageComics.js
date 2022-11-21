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
const Link_1 = __importDefault(require("../component-library/Link"));
const Thumbnail_1 = __importDefault(require("../component-library/Comics/Thumbnail"));
function ManageComics() {
    const [comics, setComics] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`/api/comic/mine`)
            .then((res) => {
            if (Array.isArray(res.data)) {
                setComics(res.data);
            }
        });
    }, []);
    const renderComicList = function (list) {
        if (list.length > 0) {
            return (react_1.default.createElement("ul", null, list.map((comic, idx) => {
                return (react_1.default.createElement("li", { key: idx, className: "comiclist_entry" },
                    react_1.default.createElement(Thumbnail_1.default, null),
                    react_1.default.createElement("div", { className: "comiclist_details" },
                        react_1.default.createElement("span", { className: "comiclist_title" }, comic.name),
                        react_1.default.createElement("span", { className: "comiclist_description" }, comic.description || 'A webcomic!'),
                        react_1.default.createElement(Link_1.default, { id: `comiclist_link_add_${idx}`, href: `/manage/upload/${comic.subdomain}` }, "Add page"),
                        react_1.default.createElement(Link_1.default, { id: `comiclist_link_edit_${idx}`, href: "#" }, "Edit"),
                        react_1.default.createElement(Link_1.default, { id: `comiclist_link_read__${idx}`, href: `/comic/${comic.subdomain}/read` }, "Read"))));
            })));
        }
        return (react_1.default.createElement("div", null, "You don\u2019t have any comics yet!"));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        renderComicList(comics),
        react_1.default.createElement(Link_1.default, { id: "create_comic", href: 'new' }, "Create A Comic")));
}
exports.default = ManageComics;
