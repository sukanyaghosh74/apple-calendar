"use client";
import LoginForm from '../components/LoginForm';
import CalendarView from '../components/CalendarView';
import React, { useState } from 'react';

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

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);

  const handleLoginSuccess = (events: CalendarEvent[]) => {
    console.log('Login successful, received events:', events);
    setEvents(events);
  };

  const handleSignOut = () => {
    setEvents(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-8 px-4 overflow-hidden bg-gradient-to-br from-[#e0e7ff] via-[#f9fafb] to-[#a259ff]/40">
      {/* Multiple Vibrant SVG Blobs */}
      <svg className="absolute -z-20 top-[-15%] left-[-10%] w-[80vw] h-[80vw] opacity-80 blur-2xl" viewBox="0 0 800 800" fill="none">
        <ellipse cx="400" cy="400" rx="350" ry="320" fill="#A259FF" fillOpacity="0.25" />
      </svg>
      <svg className="absolute -z-20 bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] opacity-70 blur-2xl" viewBox="0 0 800 800" fill="none">
        <ellipse cx="400" cy="400" rx="300" ry="280" fill="#4F8CFF" fillOpacity="0.18" />
      </svg>
      <svg className="absolute -z-20 top-1/2 left-1/2 w-[60vw] h-[60vw] opacity-60 blur-2xl -translate-x-1/2 -translate-y-1/2" viewBox="0 0 800 800" fill="none">
        <ellipse cx="400" cy="400" rx="250" ry="220" fill="#F9A8D4" fillOpacity="0.13" />
      </svg>
      {/* Enhanced Aesthetic Dayli-Themed Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-[#e0e7ff] via-[#f9fafb] to-[#a259ff]/20" />
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/30 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[20rem] h-[20rem] bg-pink-200/30 rounded-full blur-2xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* Hero Section */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-10 animate-fade-in">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Cyclist"
          className="rounded-3xl shadow-card w-full max-h-64 object-cover mb-6 transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'center' }}
        />
        <h1 className="text-5xl font-heading font-extrabold text-primary mb-4 drop-shadow-sm">Time That Gets You.</h1>
        <p className="text-lg text-gray-600 mb-6 font-sans">Your AI-powered scheduling assistant. Plan around your real energy, rhythms, and relationships — not just your availability.</p>
      </div>
      {/* Card Container */}
      <div className="w-full max-w-md bg-gradient-to-br from-white via-muted to-primary/5 rounded-3xl shadow-card p-8 flex flex-col items-center animate-fade-in">
        {!events ? (
          <LoginForm onSuccess={handleLoginSuccess} />
        ) : (
          <>
            <div className="flex justify-between items-center w-full mb-4">
              <h2 className="text-2xl font-heading font-bold text-primary">Your Next 7 Days</h2>
              <button
                onClick={handleSignOut}
                className="bg-accent text-white font-bold px-4 py-2 rounded-xl hover:bg-primary transition"
              >
                Sign Out
              </button>
            </div>
            <CalendarView events={events} />
          </>
        )}
      </div>
      <footer className="mt-12 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Dayli | Inspired by <a href="https://usedayli.framer.website/" className="underline text-accent">Dayli</a>
      </footer>
    </div>
  );
}
