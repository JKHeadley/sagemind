"use client";

import { useState, useEffect, useCallback } from "react";

interface Appointment {
  summary: string;
  start: string;
  end: string;
  description: string;
}

interface StylistAppointments {
  stylist: string;
  appointments: Appointment[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState<StylistAppointments[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        headers: { "x-admin-password": pw },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      fetchAppointments(password);
    } else {
      setAuthError("Invalid password.");
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
  };

  const isToday = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="card p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-salon-text mb-6 text-center">Admin</h1>
          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-4">{authError}</div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl text-salon-text focus:border-primary focus:ring-1 focus:ring-primary outline-none mb-4"
            placeholder="Password"
            autoFocus
          />
          <button type="submit" className="w-full btn-book justify-center">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-salon-text">Appointments</h1>
          <button
            onClick={() => fetchAppointments(password)}
            className="text-sm text-primary hover:text-primary-dark transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : (
          <div className="space-y-8">
            {data.map(({ stylist, appointments }) => (
              <div key={stylist}>
                <h2 className="text-lg font-semibold text-salon-text mb-3">{stylist}</h2>
                {appointments.length === 0 ? (
                  <p className="text-text-muted text-sm">No upcoming appointments.</p>
                ) : (
                  <div className="space-y-2">
                    {appointments.map((apt, i) => (
                      <div
                        key={i}
                        className={`card p-4 flex items-center gap-4 ${isToday(apt.start) ? "border-primary/30 bg-primary/5" : ""}`}
                      >
                        <div className="shrink-0 text-center">
                          {isToday(apt.start) && (
                            <span className="text-xs font-semibold text-primary uppercase">Today</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-salon-text truncate">{apt.summary}</p>
                          <p className="text-sm text-text-muted">{formatTime(apt.start)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
