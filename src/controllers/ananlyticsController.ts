import { Request, Response } from 'express';
import { AnalyticsService } from '../utils/analyticsService';

export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  trackEvent(req: Request, res: Response): void {
    const { eventName, eventData } = req.body;

    if (!eventName || !eventData) {
      res.status(400).json({ error: 'eventName and eventData are required' });
      return; 
    }

    try {
      this.analyticsService.trackEvent(eventName, eventData);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error tracking event:', error);
      res.status(500).json({ error: 'An unexpected error occurred while tracking the event' });
    }
  }
}


