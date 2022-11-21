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
const react_router_dom_1 = require("react-router-dom");
const Icon_1 = __importDefault(require("../../component-library/Icon"));
const Select_1 = __importDefault(require("../../component-library/Form/Select"));
const Comment_1 = __importDefault(require("../../component-library/Comment/Comment"));
const axios_1 = __importDefault(require("axios"));
function Read() {
    const [image, setImage] = (0, react_1.useState)('');
    const [lastPage, setLastPage] = (0, react_1.useState)(0);
    const [comicPages, setComicPages] = (0, react_1.useState)([]);
    const [isLastPage, setIsLastPage] = (0, react_1.useState)(false);
    const { comic } = (0, react_router_dom_1.useParams)();
    const { page } = (0, react_router_dom_1.useParams)();
    let currPage = 1;
    if (page !== undefined) {
        currPage = parseInt(page);
    }
    const prevPage = currPage - 1;
    const nextPage = currPage + 1;
    (0, react_1.useEffect)(() => {
        (0, axios_1.default)({
            method: 'get',
            url: `/api/comic/page/${comic}/${currPage}`,
        })
            .then((res) => {
            var _a;
            if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.img) {
                setImage(res.data.img);
            }
        })
            .catch((err) => {
            console.error(err);
        });
        (0, axios_1.default)({
            method: 'get',
            url: `api/comic/pagecount/${comic}`
        })
            .then((res) => {
            var _a;
            if (typeof ((_a = res.data) === null || _a === void 0 ? void 0 : _a.count) === 'number') {
                console.log("go thru pages");
                setLastPage(res.data.count);
                const newPages = [];
                for (let i = 1; i <= res.data.count; i++) {
                    newPages.push({ value: (i).toString(), label: `Page ${i}` });
                }
                setComicPages(newPages);
                console.log(comicPages);
                setIsLastPage(nextPage > res.data.count);
            }
        })
            .catch((err) => {
            console.error(err);
        });
    }, []);
    return (react_1.default.createElement("div", { className: "comic-page" },
        react_1.default.createElement("a", { href: isLastPage ? '#' : `/comic/${comic}/read/${nextPage}` },
            react_1.default.createElement("img", { className: "comic-page_image", src: `/${image}` })),
        react_1.default.createElement("div", { className: "comic-page_navigation" },
            react_1.default.createElement("a", { className: prevPage === 0 ? 'Disabled' : '', href: prevPage === 0 ? '#' : `/comic/${comic}/read/1`, "aria-label": "First page" },
                react_1.default.createElement(Icon_1.default, { disabled: prevPage === 0, width: "32", height: "32", name: "doubleLeft", title: "First page", id: "icon_first-page" })),
            react_1.default.createElement("a", { className: prevPage === 0 ? 'Disabled' : '', href: prevPage === 0 ? '#' : `/comic/${comic}/read/${prevPage}`, "aria-label": "Previous page" },
                react_1.default.createElement(Icon_1.default, { disabled: prevPage === 0, width: "32", height: "32", name: "caratLeft", title: "Previous page", id: "icon_prev-page" })),
            react_1.default.createElement(Select_1.default, { id: "comic-dropdown", current: currPage, options: comicPages }),
            react_1.default.createElement("a", { className: isLastPage ? 'Disabled' : '', href: `/comic/${comic}/read/${nextPage}`, "aria-label": "Next page" },
                react_1.default.createElement(Icon_1.default, { disabled: isLastPage, width: "32", height: "32", name: "caratRight", title: "Next page", id: "icon_next-page" })),
            react_1.default.createElement("a", { className: isLastPage ? 'Disabled' : '', href: `/comic/${comic}/read/${lastPage}`, "aria-label": "Last page" },
                react_1.default.createElement(Icon_1.default, { disabled: isLastPage, width: "32", height: "32", name: "doubleRight", title: "Last page", id: "icon_last-page" }))),
        react_1.default.createElement(Comment_1.default, { id: "bla" })));
}
exports.default = Read;
