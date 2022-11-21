"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comicController_1 = __importDefault(require("../controllers/comicController"));
const comicRoutes = express_1.default.Router();
comicRoutes.get('/by/:author', comicController_1.default.getByAuthor);
comicRoutes.get('/mine', comicController_1.default.getByEndUser);
comicRoutes.get('/recent', comicController_1.default.getRecent);
comicRoutes.get('/page/:comic/:page', comicController_1.default.getPage);
comicRoutes.get('/pagecount/:comic', comicController_1.default.getPageCount);
comicRoutes.post('/new', comicController_1.default.create);
comicRoutes.post('/upload', comicController_1.default.addPage);
exports.default = comicRoutes;
