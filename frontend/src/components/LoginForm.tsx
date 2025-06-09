"use client";

import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: (events: any[]) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/icloud/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onSuccess(data.events);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-6"
    >
      <h2 className="text-3xl font-heading font-bold text-primary text-center mb-2">Sign in to Apple Calendar</h2>
      <p className="text-base text-gray-500 text-center mb-4">Enter your iCloud email and app-specific password to view your next 7 days.</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-700">iCloud Email</label>
        <input
          id="email"
          type="email"
          className="rounded-xl px-4 py-3 border border-muted bg-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none text-base"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-gray-700">App-Specific Password</label>
        <input
          id="password"
          type="password"
          className="rounded-xl px-4 py-3 border border-muted bg-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none text-base"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <span className="text-xs text-gray-400 mt-1">Generate at <a href="https://appleid.apple.com/account/manage" target="_blank" rel="noopener noreferrer" className="underline text-accent">appleid.apple.com</a></span>
      </div>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-white via-primary/30 to-accent/20 text-black font-bold py-3 rounded-xl shadow-lg transition-transform duration-200 disabled:opacity-60 mt-2 text-lg hover:scale-105 focus:scale-105 outline-none border-none border border-primary/30"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
} 