const services = [
  {
    title: "Airport Drop & Pickup",
    desc: "Timely pickups and drops to Surat, Ahmedabad & Mumbai airports. Flight tracking included — we wait for you.",
    price: "Surat Airport from ₹1,200",
    icon: (
      <svg width="26" height="26" fill="none" stroke="#D4A853" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M12 19V5m0 0l-4 4m4-4l4 4" />
        <circle cx="12" cy="19" r="2" />
        <path strokeLinecap="round" d="M5 12H2m20 0h-3" />
      </svg>
    ),
  },
  {
    title: "Wedding & Functions",
    desc: "Decorated car available for weddings, engagements & special family functions. Make your day memorable.",
    price: "Special wedding packages",
    icon: (
      <svg width="26" height="26" fill="none" stroke="#D4A853" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Pilgrimage Tours",
    desc: "Comfortable journeys to Dwarka, Somnath, Ambaji & other sacred destinations. Safe travel for elders too.",
    price: "Dwarka from ₹4,500",
    icon: (
      <svg width="26" height="26" fill="none" stroke="#D4A853" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Outstation Trips",
    desc: "Long distance travel to Surat, Ahmedabad, Mumbai, Vadodara & beyond. One-way or round trips available.",
    price: "Ahmedabad from ₹3,200",
    icon: (
      <svg width="26" height="26" fill="none" stroke="#D4A853" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white">
      <div className="mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Our Services
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A2E] leading-tight mb-4">
          Every Journey,<br />
          <span className="text-[#D4A853]">Perfectly Handled</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded mb-4" />
        <p className="text-[#5a6070] text-base leading-relaxed max-w-xl">
          From airport runs to sacred pilgrimages — comfortable, reliable travel for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-[#F5F0E8] border border-[#EDE6D6] rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4A853] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <div className="w-13 h-13 bg-[#1A1A2E] rounded-xl flex items-center justify-center mb-5 p-3">
              {s.icon}
            </div>
            <h3 className="font-playfair text-xl text-[#1A1A2E] mb-2.5">{s.title}</h3>
            <p className="text-[#5a6070] text-sm leading-relaxed mb-4">{s.desc}</p>
            <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {s.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}