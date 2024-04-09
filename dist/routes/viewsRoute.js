"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortid_1 = __importDefault(require("shortid"));
const viewRouter = express_1.default.Router();
viewRouter.get('/', (req, res) => {
    res.status(200).render('index');
});
viewRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
viewRouter.get('/myLinks', (req, res, next) => {
    try {
        res.status(200).render('myLinks');
    }
    catch (error) { }
});
viewRouter.get('/shortenUrl', (req, res) => {
    res.status(200).render('shortenUrl', { shortUrl: shortid_1.default });
});
exports.default = viewRouter;
//# sourceMappingURL=viewsRoute.js.map