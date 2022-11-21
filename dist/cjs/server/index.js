"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookieParser_1 = __importDefault(require("./utils/cookieParser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const category_1 = __importDefault(require("./routes/category"));
const comic_1 = __importDefault(require("./routes/comic"));
const port = process.env.PORT || 5000;
const router = express_1.default.Router();
let app = undefined;
app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookieParser_1.default);
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.path}`);
    next();
});
app
    .use((0, cors_1.default)({
    credentials: true,
    methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    origin: 'http://localhost',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
}));
app.use('/api/user', user_1.default);
app.use('/api/category', category_1.default);
app.use('/api/comic', comic_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '/../build')));
app.use('/public/img', express_1.default.static(path_1.default.join(__dirname + '/../public/img')));
app.get('*', function (req, res) {
    console.log(`Catchall route recieved: ${req.path}.`);
    res.sendFile(path_1.default.join(__dirname + '/../public/index.html'));
});
app.listen(port);
console.log('App is listening on port ' + port);
module.exports = app;
