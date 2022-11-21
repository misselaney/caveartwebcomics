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
const ComicTag_1 = __importDefault(require("../components/ComicTag"));
const axios_1 = __importDefault(require("axios"));
const TextInput_1 = __importDefault(require("../component-library/Form/TextInput"));
const Button_1 = __importDefault(require("../component-library/Button"));
const defaultGenres = {
    children: [],
    description: '',
    id: 0,
    lvl: 0,
    name: 'Loading',
    parent_id: 0
};
const defaultStyles = { id: 0, name: 'Loading', description: '' };
const defaultPicks = {};
const visibilities = ['Public', 'Unlisted', 'Private'];
function NewComic() {
    const [genres, setGenres] = (0, react_1.useState)([defaultGenres]);
    const [styles, setStyles] = (0, react_1.useState)([defaultStyles]);
    const [name, setName] = (0, react_1.useState)('');
    const [subdomain, setSubdomain] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const [selectedGenres, setSelectedGenres] = (0, react_1.useState)(defaultPicks);
    const [selectedStyles, setSelectedStyles] = (0, react_1.useState)(defaultPicks);
    const [visibility, setVisibility] = (0, react_1.useState)('');
    const [submissionError, setSubmissionError] = (0, react_1.useState)(false);
    const onNameChange = function (e) {
        setName(e.target.value);
    };
    const onSubdomainChange = function (e) {
        setSubdomain(e.target.value);
    };
    const onDescriptionChange = function (e) {
        setDescription(e.target.value);
    };
    const onVisibilityChange = function (e) {
        setVisibility(e.target.value);
    };
    const toggleGenre = function (pick) {
        const newGenres = Object.assign({}, selectedGenres);
        if (newGenres[pick.id]) {
            delete newGenres[pick.id];
        }
        else {
            newGenres[pick.id] = pick.name;
        }
        setSelectedGenres(newGenres);
    };
    const toggleStyle = function (pick) {
        const newStyles = Object.assign({}, selectedStyles);
        if (newStyles[pick.id]) {
            delete newStyles[pick.id];
        }
        else {
            newStyles[pick.id] = pick.name;
        }
        setSelectedStyles(newStyles);
    };
    const submitComic = function () {
        const comic = {
            name,
            subdomain,
            description,
            selectedStyles,
            selectedGenres,
            visibility
        };
        (0, axios_1.default)({
            method: 'post',
            url: '/api/comic/new',
            data: comic
        })
            .then((res) => {
            console.log("eh");
        })
            .catch((err) => {
            setSubmissionError(true);
        });
    };
    (0, react_1.useEffect)(() => {
        (0, axios_1.default)({
            method: 'get',
            url: '/api/category/genre'
        })
            .then((res) => {
            const data = Object.values(res.data);
            if (Array.isArray(data)) {
                setGenres(data);
            }
        })
            .catch((err) => {
            console.error(err.response.data.error);
        });
        (0, axios_1.default)({
            method: 'get',
            url: '/api/category/style'
        })
            .then((res) => {
            const data = Object.values(res.data);
            if (Array.isArray(data)) {
                setStyles(data);
            }
        })
            .catch((err) => {
            console.error(err.response.data.error);
        });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Create A Comic"),
        react_1.default.createElement(TextInput_1.default, { labelText: "Name of comic", type: "text", id: "comic_name", onChange: (e) => { onNameChange(e); }, placeholderText: "Unga Bunga Grunga" }),
        react_1.default.createElement(TextInput_1.default, { labelText: "Subdomain", helperText: "Your comic will be accessible at http://yourChoice.caveartcomics.com", id: "comic_subdomain", onChange: (e) => { onSubdomainChange(e); }, placeholderText: "unga-bunga-grunga" }),
        react_1.default.createElement("fieldset", null,
            react_1.default.createElement("legend", null, "Style"),
            react_1.default.createElement(ComicTag_1.default, { selection: selectedStyles, options: styles, toggleOption: toggleStyle })),
        react_1.default.createElement("fieldset", null,
            react_1.default.createElement("legend", null, "Genres"),
            react_1.default.createElement(ComicTag_1.default, { selection: selectedGenres, options: genres, toggleOption: toggleGenre })),
        react_1.default.createElement("label", { htmlFor: "comic_description" }, "Description"),
        react_1.default.createElement("textarea", { id: "comic_description", onChange: (e) => { onDescriptionChange(e); } }),
        react_1.default.createElement("fieldset", null,
            react_1.default.createElement("legend", null, "Visibility"),
            visibilities.map((option, idx) => {
                return (react_1.default.createElement("div", { key: idx },
                    react_1.default.createElement("input", { type: "radio", checked: visibility === option, name: "visibility", id: `visibility-${option}`, value: option, onChange: (e) => { onVisibilityChange(e); } }),
                    react_1.default.createElement("label", { htmlFor: `visibility-${option}` }, option)));
            })),
        react_1.default.createElement(Button_1.default, { id: "newcomic_submit", type: "button", onClick: () => { submitComic(); }, look: "primary" }, "Create"),
        submissionError ? react_1.default.createElement("span", null, "There was an issue submitting your new comic.") : ''));
}
exports.default = NewComic;
