"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcodeController_1 = __importDefault(require("../controllers/qrcodeController"));
const qrRouter = express_1.default.Router();
qrRouter.get('/generate', qrcodeController_1.default.generateQRCode);
exports.default = qrRouter;
//# sourceMappingURL=qrcodeRoute.js.map