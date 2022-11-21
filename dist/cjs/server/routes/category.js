"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const categoryRoutes = express_1.default.Router();
categoryRoutes.get('/genre', categoryController_1.default.getGenres);
categoryRoutes.get('/style', categoryController_1.default.getStyles);
categoryRoutes.get('/trigger', categoryController_1.default.getTriggers);
exports.default = categoryRoutes;
