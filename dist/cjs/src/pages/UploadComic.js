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
const react_router_dom_1 = require("react-router-dom");
function UploadComic() {
    const [files, setFiles] = (0, react_1.useState)();
    const [src, setSrc] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)(false);
    const { comic } = (0, react_router_dom_1.useParams)();
    const generatePreview = function (e) {
        const target = e.target;
        if (target.files !== null) {
            setFiles(target.files);
            setSrc(URL.createObjectURL(target.files[0]));
        }
    };
    const uploadFile = function () {
        const formData = new FormData();
        const input = document.querySelector('#comicpage');
        if (input.files) {
            const upload = input.files[0];
            formData.append('comicpage', upload);
            formData.append('comic', comic);
            console.log(formData);
            (0, axios_1.default)({
                method: 'post',
                url: '/api/comic/upload',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                console.log(res);
            })
                .catch((err) => {
                console.log(err);
                setError(true);
            });
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", null,
            react_1.default.createElement("input", { id: "comicpage", type: "file", accept: "image/png, image/gif, image/jpg, image/jpeg", onChange: (e) => generatePreview(e), src: src }),
            react_1.default.createElement("img", { className: "upload__preview", id: "upload_preview", src: src, alt: "Preview" })),
        react_1.default.createElement("label", { htmlFor: "upload_date" }, "Release date"),
        react_1.default.createElement("input", { type: "date", id: "upload_date" }),
        react_1.default.createElement("label", { htmlFor: "upload_time" }, "Time of day"),
        react_1.default.createElement("input", { type: "time", id: "upload_time" }),
        react_1.default.createElement("button", { type: "button", onClick: () => { uploadFile(); } }, "Upload")));
}
exports.default = UploadComic;
