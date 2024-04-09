"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const qrcodeController_1 = __importDefault(require("./controllers/qrcodeController"));
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
function createServer() {
    const server = (0, express_1.default)();
    server.use(body_parser_1.default.json());
    server.use(body_parser_1.default.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.get('/qrcode', qrcodeController_1.default.generateQRCode);
    return server;
}
exports.default = createServer;
//# sourceMappingURL=app.js.map