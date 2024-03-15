"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const qrcodeRoute_1 = __importDefault(require("./routes/qrcodeRoute"));
const analyticsRouter_1 = __importDefault(require("./routes/analyticsRouter"));
const PORT = 8000;
const HOSTNAME = '0.0.0.0';
(0, config_1.mongoDbConnection)();
const app = (0, app_1.default)();
app.set("view engine", "ejs");
app.set("views", "views");
app.use('/users', userRoute_1.default);
app.use('/qrcode', qrcodeRoute_1.default);
app.use('/analytics', analyticsRouter_1.default);
app.get("/", (req, res) => {
    return res.render("/views/index");
});
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map