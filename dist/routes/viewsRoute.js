"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewRouter = express_1.default.Router();
viewRouter.get("/", (req, res) => {
    res.status(200).render("index");
});
viewRouter.get("/login", (req, res) => {
    res.status(200).render("login");
});
viewRouter.get("/shortenUrl", (req, res) => {
    res.status(200).render("shortenUrl");
});
exports.default = viewRouter;
//# sourceMappingURL=viewsRoute.js.map