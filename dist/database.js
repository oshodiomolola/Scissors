"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const qrcodeRoute_1 = __importDefault(require("./routes/qrcodeRoute"));
const PORT = 8000;
const HOSTNAME = '0.0.0.0';
(0, config_1.mongoDbConnection)();
const app = (0, app_1.default)();
app.use('/qrcode', qrcodeRoute_1.default);
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http//:localhost:${PORT}`);
});
//# sourceMappingURL=database.js.map