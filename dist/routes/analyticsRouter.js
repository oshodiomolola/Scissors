"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ananlyticsController_1 = require("../controllers/ananlyticsController");
const myAnalyticsService_1 = require("../utils/myAnalyticsService");
const router = (0, express_1.Router)();
const analyticsService = new myAnalyticsService_1.MyAnalyticsService();
const analyticsController = new ananlyticsController_1.AnalyticsController(analyticsService);
router.post('/track', analyticsController.trackEvent.bind(analyticsController));
exports.default = router;
//# sourceMappingURL=analyticsRouter.js.map