"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userRoutes = express_1.default.Router();
userRoutes.post('/new', userController_1.default.createUser);
userRoutes.post('/login', userController_1.default.login);
userRoutes.post('/logout', userController_1.default.logout);
userRoutes.get('/session', userController_1.default.getSession);
exports.default = userRoutes;
