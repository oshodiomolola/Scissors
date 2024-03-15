import { AnalyticsService } from './analyticsService';

export class MyAnalyticsService implements AnalyticsService {
  trackEvent(eventName: string, eventData: Record<string, any>): void {
    // Simulating sending event data to analytics server
    console.log(`Tracking event: ${eventName}`, eventData);
  }
}
