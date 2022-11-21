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
const classnames_1 = __importDefault(require("classnames"));
require("../../design/Style.css");
const FormField_1 = __importDefault(require("../FormField/FormField"));
const TextInput = (_a) => {
    var { id, classes = '', defaultValue, disabled = false, errorText = 'Please review your input.', helperText, labelText = 'Label', onChange, placeholderText = 'Placeholder', type, status } = _a, props = __rest(_a, ["id", "classes", "defaultValue", "disabled", "errorText", "helperText", "labelText", "onChange", "placeholderText", "type", "status"]);
    return (react_1.default.createElement(FormField_1.default, { classes: (0, classnames_1.default)({
            'Disabled': disabled,
            'Error': status === 'error'
        }) },
        react_1.default.createElement("label", { className: "form-field_label", htmlFor: id }, labelText),
        react_1.default.createElement("input", { id: id, type: type || 'text', defaultValue: defaultValue, disabled: disabled, onChange: (e) => {
                onChange(e);
            }, placeholder: placeholderText, className: `form-field_control ${classes} ${(0, classnames_1.default)({
                'Valid': status === 'valid',
                'Error': status === 'error'
            })}`.trim() }),
        helperText || status === 'error' ?
            react_1.default.createElement("p", { className: "form-field_helpertext" }, status === 'error' ? errorText : helperText)
            :
                ''));
};
exports.default = TextInput;
