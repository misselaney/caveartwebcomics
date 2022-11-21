"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseCookies = (req, res, next) => {
    if (req.headers.cookie === undefined) {
        req.cookies = {};
    }
    else {
        let parsed = {};
        let cookies = req.headers.cookie.split(';');
        for (let i = 0; i < cookies.length; i += 1) {
            let temp = cookies[i].split('=');
            const key = temp[0].trim();
            const value = temp[1].trim();
            parsed[key] = value;
        }
        req.cookies = parsed;
    }
    next();
};
exports.default = parseCookies;
