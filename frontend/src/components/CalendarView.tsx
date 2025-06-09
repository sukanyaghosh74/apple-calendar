"use client";

import React from 'react';
// import { CalendarDays } from 'lucide-react'; // Uncomment if Lucide is installed

interface CalendarViewProps {
  events: any[];
}

export default function CalendarView({ events }: CalendarViewProps) {
  if (!events.length) {
    return <div className="text-center text-gray-400 mt-8">No events found for the next 7 days.</div>;
  }

  return (
    <div className="w-full mt-4 animate-fade-in">
      <ul className="flex flex-col gap-4">
        {events.map((event, idx) => (
          <li
            key={event.uid || idx}
            className="bg-muted rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center gap-2 transition-transform duration-200 hover:scale-105 hover:bg-primary/10"
          >
            <div className="flex items-center mb-2">
              {/* <CalendarDays className="text-accent w-5 h-5 mr-2" /> */}
              <span className="text-accent text-xl mr-2" role="img" aria-label="calendar">📅</span>
              <div className="font-heading font-bold text-lg text-primary">{event.summary || 'No Title'}</div>
            </div>
            <div className="text-base text-gray-600">
              {event.dtstart ? new Date(event.dtstart).toLocaleString() : 'No start time'}
              {event.dtend && (
                <>
                  {' '}–{' '}
                  {new Date(event.dtend).toLocaleString()}
                </>
              )}
            </div>
            <div className="text-xs text-accent mt-1">{event.calendar}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 