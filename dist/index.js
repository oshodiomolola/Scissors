"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// import { config } from 'dotenv';
// config();
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
// import mongoose from 'mongoose';
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const qrcodeRoute_1 = __importDefault(require("./routes/qrcodeRoute"));
const analyticsRouter_1 = __importDefault(require("./routes/analyticsRouter"));
const viewsRoute_1 = __importDefault(require("./routes/viewsRoute"));
const PORT = 8000;
const HOSTNAME = '0.0.0.0';
(0, config_1.mongoDbConnection)();
const app = (0, app_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use('/users', userRoute_1.default);
app.use('/qrcode', qrcodeRoute_1.default);
app.use('/analytics', analyticsRouter_1.default);
app.use("/views", viewsRoute_1.default);
app.get("/", (req, res) => {
    res.render("index");
});
// app.post("auth/login", (req, res)=> {
// })
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map