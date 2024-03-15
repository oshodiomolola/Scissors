import { Router } from 'express';
import { AnalyticsController } from '../controllers/ananlyticsController';
import { AnalyticsService } from '../utils/analyticsService';
import { MyAnalyticsService } from '../utils/myAnalyticsService';

const router = Router();
const analyticsService: AnalyticsService = new MyAnalyticsService();
const analyticsController = new AnalyticsController(analyticsService);

router.post('/track', analyticsController.trackEvent.bind(analyticsController));

export default router;
