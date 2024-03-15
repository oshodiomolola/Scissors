"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    trackEvent(req, res) {
        const { eventName, eventData } = req.body;
        if (!eventName || !eventData) {
            res.status(400).json({ error: 'eventName and eventData are required' });
            return;
        }
        try {
            this.analyticsService.trackEvent(eventName, eventData);
            res.sendStatus(200);
        }
        catch (error) {
            console.error('Error tracking event:', error);
            res.status(500).json({ error: 'An unexpected error occurred while tracking the event' });
        }
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=ananlyticsController.js.map