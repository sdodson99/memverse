export function logAnalyticsEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
) {
  window.dataLayer?.push({
    event: eventName,
    ...parameters,
  });
}
