import { createDAVClient, DAVCalendar, DAVObject } from 'tsdav';

export interface ICloudCredentials {
  username: string;
  password: string;
}

export async function fetchICloudEvents({ username, password }: ICloudCredentials): Promise<any[]> {
  // Connect to iCloud CalDAV
  const client = await createDAVClient({
    serverUrl: 'https://caldav.icloud.com',
    credentials: { username, password },
    authMethod: 'Basic',
    defaultAccountType: 'caldav',
  });

  // Fetch calendars
  const calendars: DAVCalendar[] = await client.fetchCalendars();
  if (!calendars.length) throw new Error('No calendars found');

  // Fetch events for the next 7 days from all calendars
  const now = new Date();
  const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const events: any[] = [];

  for (const calendar of calendars) {
    const objects: DAVObject[] = await client.fetchCalendarObjects({
      calendar,
      timeRange: { start: now.toISOString(), end: in7days.toISOString() },
    });
    // Parse and push events
    for (const obj of objects) {
      events.push({
        calendar: calendar.displayName,
        ...obj,
      });
    }
  }
  return events;
} 