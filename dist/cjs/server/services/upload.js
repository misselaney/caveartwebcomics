"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAsset = exports.uploadNewComicPage = void 0;
const multer_1 = __importDefault(require("multer"));
const hash_1 = require("../utils/hash");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const extensions = ['.png', '.gif', '.jpg', '.jpeg'];
const fileStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        console.log("Destination func running");
        callback(null, './public/img');
    },
    filename: function (req, file, callback) {
        console.log("Filename funciton running");
        const fileHash = (0, hash_1.createHash)((0, hash_1.createRandom)()).substr(1, 10);
        const fileName = `${file.fieldname}_${fileHash}_${Date.now()}${path_1.default.extname(file.originalname)}`;
        callback(null, fileName);
    }
});
const imageFilter = function (req, file, callback) {
    const ext = path_1.default.extname(file.originalname);
    if (!extensions.includes(ext)) {
        callback(new Error('Invalid file extension.'));
        return;
    }
    fs_1.default.exists(`./img/${file.originalname}`, function (exists) {
        if (exists) {
            callback(new Error('This image already exists.'));
            return;
        }
    });
};
exports.uploadNewComicPage = (0, multer_1.default)({
    storage: fileStorage,
    limits: {
        fieldSize: 1500 * 1024,
        fieldNameSize: 200
    },
    fileFilter: imageFilter
})
    .single('comicpage');
exports.uploadAsset = (0, multer_1.default)({
    storage: fileStorage,
    limits: {
        fieldSize: 400 * 1024,
        fieldNameSize: 200
    },
    fileFilter: imageFilter
})
    .fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 },]);
