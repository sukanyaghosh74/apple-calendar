"use client";

import React from 'react';
// import { CalendarDays } from 'lucide-react'; // Uncomment if Lucide is installed

interface CalendarEvent {
  summary?: string;
  dtstart?: string;
  dtend?: string;
  calendar?: string;
  uid?: string;
  data?: {
    summary?: string;
    dtstart?: string;
    dtend?: string;
    calendar?: string;
    uid?: string;
  };
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

// Helper function to format dates consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T').join(' ').slice(0, 16); // Format: "YYYY-MM-DD HH:mm"
}

export default function CalendarView({ events }: CalendarViewProps) {
  console.log('CalendarView received events:', JSON.stringify(events, null, 2));

  if (!events || !Array.isArray(events)) {
    return <div className="text-center text-gray-400 mt-8">Invalid events data received.</div>;
  }

  if (!events.length) {
    return <div className="text-center text-gray-400 mt-8">No events found for the next 7 days.</div>;
  }

  return (
    <div className="w-full mt-4 animate-fade-in">
      <ul className="flex flex-col gap-4">
        {events.map((event, idx) => {
          // Extract event details from the data structure
          const summary = event.summary || event.data?.summary || 'No Title';
          const startTime = event.dtstart || event.data?.dtstart;
          const endTime = event.dtend || event.data?.dtend;
          const calendar = event.calendar || event.data?.calendar || 'Unknown Calendar';

          return (
            <li
              key={event.uid || idx}
              className="bg-muted rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center gap-2 transition-transform duration-200 hover:scale-105 hover:bg-primary/10"
            >
              <div className="flex items-center mb-2">
                {/* <CalendarDays className="text-accent w-5 h-5 mr-2" /> */}
                <span className="text-accent text-xl mr-2" role="img" aria-label="calendar">📅</span>
                <div className="font-heading font-bold text-lg text-primary">{summary}</div>
              </div>
              <div className="text-base text-gray-600">
                {startTime ? formatDate(startTime) : 'No start time'}
                {endTime && (
                  <>
                    {' '}–{' '}
                    {formatDate(endTime)}
                  </>
                )}
              </div>
              <div className="text-xs text-accent mt-1">{calendar}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 