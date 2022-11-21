"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const hash_1 = require("../utils/hash");
const auth_1 = require("../services/auth");
exports.userController = {
    createUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '');
            const hashedPassword = (0, hash_1.createHash)(req.body.password);
            const newUser = yield auth_1.auth.createNewUser(email, hashedPassword);
            if (newUser.error) {
                res.status(500).send(newUser.error);
            }
            res.status(200).send(newUser);
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '');
            const hashedPassword = (0, hash_1.createHash)(req.body.password);
            const loginAttempt = yield auth_1.auth.getUserByCredentials(email, hashedPassword);
            if (loginAttempt.error) {
                res.status(500).send(loginAttempt.error);
            }
            else {
                const userId = loginAttempt.id;
                const sessionHash = (0, hash_1.createHash)((0, hash_1.createRandom)());
                auth_1.auth.updateUserSession(userId, sessionHash);
                res.cookie('caveartwebcomicssession', sessionHash);
                res.cookie('caveartwebcomicsuser', userId);
                const token = {
                    caveartwebcomics: sessionHash,
                    caveartwebcomicsId: userId
                };
                res.status(200).send(token);
            }
        });
    },
    logout: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.cookies.caveartwebcomicsuser;
            const session = req.cookies.caveartwebcomicssession;
            const logoutAttempt = yield auth_1.auth.clearUserSession(session, id);
            if (logoutAttempt.error) {
                res.status(500).send(logoutAttempt.error);
            }
            res.status(200).send();
        });
    },
    getSession: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.cookies.caveartwebcomicsuser;
            const session = req.cookies.caveartwebcomicssession;
            const sessionInfo = yield auth_1.auth.confirmUserSession(session, id);
            if (sessionInfo.error) {
                res.status(403).send(sessionInfo);
            }
            res.status(200).send(sessionInfo);
        });
    }
};
exports.default = exports.userController;
