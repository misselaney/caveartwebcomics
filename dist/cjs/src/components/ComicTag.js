"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicTag = void 0;
const react_1 = __importDefault(require("react"));
const ComicTag = (props) => {
    const { options, toggleOption, selection } = props;
    return (react_1.default.createElement("div", null, options.map((option, idx) => {
        const identifier = `${option.name.replace(/\W/g, '')}_${option.id}`;
        let children = [];
        if (option.children) {
            children = Object.values(option.children);
        }
        return (react_1.default.createElement("div", { key: idx, className: "formfield checkbox" },
            react_1.default.createElement("input", { "tab-index": "0", type: "checkbox", className: "checkbox_control", id: `option-${identifier}`, value: option.id, checked: !!selection[option.id], onChange: () => toggleOption({ id: option.id, name: option.name }) }),
            react_1.default.createElement("label", { className: "checkbox_label", htmlFor: `option-${identifier}` }, option.name),
            react_1.default.createElement("div", { className: selection[option.id] ? 'indent expanded' : 'indent collapsed' },
                react_1.default.createElement(exports.ComicTag, { options: children, toggleOption: toggleOption, selection: selection }))));
    })));
};
exports.ComicTag = ComicTag;
exports.default = exports.ComicTag;
