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
exports.categoryController = void 0;
const category_1 = require("../services/category");
exports.categoryController = {
    getStyles: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const styles = yield category_1.category.getStyles();
            if (!styles.error) {
                res.status(200).send(styles);
            }
            res.status(500).send({ error: `There was an issue retrieving styles: ${styles.error}` });
        });
    },
    getGenres: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield category_1.category.getGenres();
            if (!genres.error) {
                res.status(200).send(genres);
            }
            res.status(500).send({ error: `There was an issue retrieving genres: ${genres.error}` });
        });
    },
    getTriggers: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const triggers = yield category_1.category.getTriggers();
            if (!triggers.error) {
                res.status(200).send(triggers);
            }
            res.status(500).send({ error: `There was an issue retrieving triggers: ${triggers.error}` });
        });
    },
};
exports.default = exports.categoryController;
