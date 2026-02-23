"use client";

import { useState, useEffect } from "react";
import type { Service, Stylist, TimeSlot } from "@/lib/types";

type Step = "service" | "stylist" | "datetime" | "info" | "submitting" | "success" | "error";

export default function BookingPage() {
  const [step, setStep] = useState<Step>("service");
  const [services, setServices] = useState<Service[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<Record<string, Service[]>>({});
  const [allStylists, setAllStylists] = useState<Stylist[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [slots, setSlots] = useState<Record<string, TimeSlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Load services and stylists on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/stylists").then((r) => r.json()),
    ]).then(([svcData, styData]) => {
      setServices(svcData.services);
      setServicesByCategory(svcData.byCategory);
      setAllStylists(styData.stylists);
    });
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep("stylist");
  };

  const handleStylistSelect = async (stylist: Stylist) => {
    setSelectedStylist(stylist);
    setStep("datetime");
    setLoadingSlots(true);
    setSlots({});
    setSelectedDate(null);
    setSelectedSlot(null);

    try {
      const res = await fetch(
        `/api/schedule/slots?serviceId=${selectedService!.id}&stylistId=${stylist.id}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSlots(data.slots);
      const dates = Object.keys(data.slots);
      if (dates.length > 0) setSelectedDate(dates[0]);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to load times");
      setStep("error");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep("info");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/schedule/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService!.id,
          stylistId: selectedStylist!.id,
          slot: selectedSlot,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          notes: formData.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Booking failed");
      setStep("info");
    }
  };

  const goBack = () => {
    if (step === "stylist") setStep("service");
    else if (step === "datetime") setStep("stylist");
    else if (step === "info") setStep("datetime");
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  const formatSelectedDateTime = () => {
    if (!selectedSlot) return "";
    const date = new Date(selectedSlot.start);
    return date.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    }) + " at " + selectedSlot.display + " Pacific";
  };

  const dates = Object.keys(slots);

  // Step indicator
  const stepLabels = ["Service", "Stylist", "Date & Time", "Your Info"];
  const stepIndex = { service: 0, stylist: 1, datetime: 2, info: 3, submitting: 3, success: 4, error: -1 }[step];

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-salon-text text-center mb-2">Book an Appointment</h1>
        <p className="text-text-muted text-center mb-8">Select your service, stylist, and preferred time.</p>

        {/* Progress Steps */}
        {step !== "success" && step !== "error" && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i <= stepIndex ? "bg-primary text-white" : "bg-border-light text-text-muted"
                }`}>
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${
                  i <= stepIndex ? "text-salon-text font-medium" : "text-text-muted"
                }`}>{label}</span>
                {i < stepLabels.length - 1 && (
                  <div className={`w-8 h-0.5 ${i < stepIndex ? "bg-primary" : "bg-border-light"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        {["stylist", "datetime", "info"].includes(step) && (
          <button onClick={goBack} className="flex items-center gap-1 text-text-muted hover:text-salon-text transition-colors mb-6 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Step 1: Service Selection */}
        {step === "service" && (
          <div className="space-y-8">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{category}</h3>
                <div className="grid gap-3">
                  {categoryServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="card p-5 text-left flex justify-between items-center hover:border-primary/50 transition-all"
                    >
                      <div>
                        <h4 className="font-semibold text-salon-text">{service.name}</h4>
                        <p className="text-sm text-text-muted mt-1">{service.description}</p>
                        <p className="text-xs text-text-muted mt-1">{service.durationMinutes} min</p>
                      </div>
                      <span className="text-primary font-bold text-lg ml-4">${service.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Stylist Selection */}
        {step === "stylist" && (
          <div>
            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-sm">
              <span className="text-text-muted">Selected: </span>
              <span className="font-semibold text-salon-text">{selectedService?.name}</span>
              <span className="text-text-muted"> — {selectedService?.durationMinutes} min, ${selectedService?.price}</span>
            </div>
            <h2 className="text-xl font-bold text-salon-text mb-4">Choose Your Stylist</h2>
            <div className="grid gap-4">
              {allStylists.map((stylist) => (
                <button
                  key={stylist.id}
                  onClick={() => handleStylistSelect(stylist)}
                  className="card p-5 text-left flex items-center gap-5 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl text-primary font-bold">
                      {stylist.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-salon-text">{stylist.name}</h4>
                    <p className="text-sm text-text-muted mt-1">{stylist.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {stylist.specialties.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Date & Time Selection */}
        {step === "datetime" && (
          <div>
            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-sm">
              <span className="font-semibold text-salon-text">{selectedService?.name}</span>
              <span className="text-text-muted"> with </span>
              <span className="font-semibold text-salon-text">{selectedStylist?.name}</span>
            </div>

            {loadingSlots ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-muted">Loading available times...</p>
              </div>
            ) : dates.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-muted mb-4">No available times in the next two weeks.</p>
                <button onClick={goBack} className="btn-outline text-sm">Try a Different Stylist</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Column */}
                <div>
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Date</h3>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                          selectedDate === date
                            ? "border-primary bg-primary/5 text-salon-text font-medium"
                            : "border-border-light text-text-muted hover:border-primary/30"
                        }`}
                      >
                        {formatDateHeader(date)}
                        <span className="text-text-muted text-xs ml-2">({slots[date].length} slots)</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Column */}
                <div>
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Time (Pacific)</h3>
                  {selectedDate && (
                    <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                      {slots[selectedDate].map((slot) => (
                        <button
                          key={slot.start}
                          onClick={() => handleSlotSelect(slot)}
                          className="px-3 py-2.5 rounded-xl border border-border-light text-salon-text text-sm hover:border-primary hover:bg-primary/5 transition-all text-center"
                        >
                          {slot.display}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Contact Information */}
        {(step === "info" || step === "submitting") && (
          <div>
            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-sm space-y-1">
              <div>
                <span className="font-semibold text-salon-text">{selectedService?.name}</span>
                <span className="text-text-muted"> with </span>
                <span className="font-semibold text-salon-text">{selectedStylist?.name}</span>
              </div>
              <div className="text-primary font-medium">{formatSelectedDateTime()}</div>
              <div className="text-text-muted">{selectedService?.durationMinutes} min — ${selectedService?.price}</div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
                {errorMessage}
              </div>
            )}

            <h2 className="text-xl font-bold text-salon-text mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-salon-text mb-1">Name *</label>
                  <input
                    type="text" id="name" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={step === "submitting"}
                    className="w-full px-4 py-3 border border-border rounded-xl text-salon-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-salon-text mb-1">Phone *</label>
                  <input
                    type="tel" id="phone" required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={step === "submitting"}
                    className="w-full px-4 py-3 border border-border rounded-xl text-salon-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                    placeholder="(510) 555-0123"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-salon-text mb-1">Email *</label>
                <input
                  type="email" id="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={step === "submitting"}
                  className="w-full px-4 py-3 border border-border rounded-xl text-salon-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-salon-text mb-1">Notes (optional)</label>
                <textarea
                  id="notes" rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  disabled={step === "submitting"}
                  className="w-full px-4 py-3 border border-border rounded-xl text-salon-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none disabled:opacity-50"
                  placeholder="Anything we should know?"
                />
              </div>
              <button
                type="submit"
                disabled={step === "submitting"}
                className="w-full btn-book py-4 text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === "submitting" ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Booking...</>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Success */}
        {step === "success" && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-salon-text mb-2">You&apos;re All Set!</h2>
            <p className="text-text-muted mb-2">Your appointment has been confirmed:</p>
            <p className="text-primary font-semibold text-lg mb-1">{selectedService?.name} with {selectedStylist?.name}</p>
            <p className="text-salon-text font-medium mb-6">{formatSelectedDateTime()}</p>
            <p className="text-text-muted text-sm mb-8">
              Check your email for a confirmation with all the details.
            </p>
            <a href="/" className="btn-outline">Back to Home</a>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-salon-text mb-2">Something Went Wrong</h2>
            <p className="text-text-muted mb-6">{errorMessage}</p>
            <button onClick={() => { setStep("service"); setErrorMessage(""); }} className="btn-book">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
