"use strict";
// src/routes/qrcodeRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcodeController_1 = __importDefault(require("../controllers/qrcodeController"));
const router = express_1.default.Router();
router.get('/generate', qrcodeController_1.default.generateQRCode);
exports.default = router;
//# sourceMappingURL=qrcodeRoute.js.map