import { salon, services, stylists, getServicesByCategory } from "@/lib/config";

export default function HomePage() {
  const categories = getServicesByCategory();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-salon-text tracking-tight mb-6">
            {salon.name}
          </h1>
          <p className="text-xl text-text-muted mb-10">{salon.tagline}</p>
          <a href="/book" className="btn-book text-lg py-4 px-8">
            Book Your Appointment
          </a>
          <p className="mt-4 text-sm text-text-muted">
            {salon.address}, {salon.city} &middot; <a href={`tel:${salon.phone}`} className="text-primary hover:underline">{salon.phone}</a>
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-salon-text text-center mb-4">Our Services</h2>
          <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
            Quality services at transparent prices. Every visit starts with a consultation.
          </p>

          <div className="space-y-12">
            {Object.entries(categories).map(([category, categoryServices]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-primary mb-4 uppercase tracking-wider">{category}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="card p-5 flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-salon-text">{service.name}</h4>
                        <p className="text-sm text-text-muted mt-1">{service.description}</p>
                        <p className="text-xs text-text-muted mt-2">{service.durationMinutes} minutes</p>
                      </div>
                      <span className="text-primary font-bold text-lg whitespace-nowrap ml-4">${service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/book" className="btn-book">Book Now</a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-salon-text text-center mb-4">Meet Our Team</h2>
          <p className="text-text-muted text-center mb-12">
            Talented stylists dedicated to making you look and feel your best.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            {stylists.filter((s) => s.active).map((stylist) => (
              <div key={stylist.id} className="card p-6 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-primary font-bold">
                    {stylist.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-salon-text">{stylist.name}</h3>
                <p className="text-sm text-text-muted mt-2">{stylist.bio}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {stylist.specialties.map((s) => (
                    <span key={s} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Location */}
      <section id="contact" className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-salon-text mb-4">Visit Us</h2>
          <p className="text-text-muted mb-8">
            {salon.address}, {salon.city}, {salon.state} {salon.zip}
          </p>

          <div className="card p-6 inline-block text-left">
            <h3 className="font-semibold text-salon-text mb-3">Hours</h3>
            <div className="space-y-1 text-sm">
              {Object.entries(salon.businessHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-8">
                  <span className="capitalize text-text-muted">{day}</span>
                  <span className="text-salon-text font-medium">
                    {hours ? `${hours.open > 12 ? hours.open - 12 : hours.open}:00 AM – ${hours.close > 12 ? hours.close - 12 : hours.close}:00 PM` : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <a href={`tel:${salon.phone}`} className="btn-book">
              Call {salon.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
