"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlController_1 = require("../controllers/urlController");
const authController_1 = require("../controllers/authController");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const urlRouter = express_1.default.Router();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 1000,
});
urlRouter.use((req, res, next) => {
    if (req.path !== '/findAll') {
        limiter(req, res, next);
    }
    else {
        next();
    }
});
urlRouter.post('/createUrl', authController_1.isAuthenticated, urlController_1.createShortUrl);
urlRouter.get('/findAll', authController_1.isAuthenticated, urlController_1.findAllMyUrl);
urlRouter.patch('/updateUrl/:shortId', authController_1.isAuthenticated, urlController_1.updateUrl);
urlRouter.delete('/deleteUrl/:id', authController_1.isAuthenticated, urlController_1.deleteUrl);
urlRouter.get('/:shortId', urlController_1.RedirectUrl);
exports.default = urlRouter;
//# sourceMappingURL=urlRoute.js.map