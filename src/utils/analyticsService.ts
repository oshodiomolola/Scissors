export interface AnalyticsService {
  trackEvent(eventName: string, eventData: Record<string, any>): void;
}
