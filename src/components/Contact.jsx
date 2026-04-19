const areas = [
  "Bilimora → Surat (Airport, City)",
  "Bilimora → Ahmedabad",
  "Bilimora → Mumbai",
  "Bilimora → Dwarka / Somnath",
  "Bilimora → Ambaji / Pavagadh",
  "Navsari, Valsad, Bharuch local",
  "Any custom destination on request",
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#2C2C4A]">
      <div className="mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Contact
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-4">
          Get In <span className="text-[#D4A853]">Touch</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Contact info */}
        <div className="flex flex-col gap-7">
          {[
            {
              icon: (
                <svg width="20" height="20" fill="none" stroke="#D4A853" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              label: "Phone / WhatsApp",
              value: "+91 9054270660",
              sub: "Available 24/7",
              href: "tel:+919054270660",
            },
            {
              icon: (
                <svg width="20" height="20" fill="none" stroke="#D4A853" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              label: "Base Location",
              value: "Bilimora, Navsari District",
              sub: "South Gujarat, India",
            },
            {
              icon: (
                <svg width="20" height="20" fill="none" stroke="#D4A853" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              label: "Email",
              value: "info@niklosafar.com",
              href: "mailto:info@niklosafar.com",
            },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4">
              <div className="w-11 h-11 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <h4 className="text-[#D4A853] text-xs font-bold uppercase tracking-widest mb-1">{c.label}</h4>
                {c.href ? (
                  <a href={c.href} className="text-[#F5F0E8] text-base no-underline hover:text-[#D4A853] transition-colors">
                    {c.value}
                  </a>
                ) : (
                  <p className="text-[#F5F0E8] text-base">{c.value}</p>
                )}
                {c.sub && <p className="text-[#8B9BB4] text-xs mt-0.5">{c.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Service areas */}
        <div className="bg-white/3 border border-[#D4A853]/15 rounded-2xl p-8">
          <h3 className="font-playfair text-xl text-[#D4A853] mb-2">Service Areas</h3>
          <p className="text-[#8B9BB4] text-sm mb-5">
            We cover all major destinations from our Bilimora base:
          </p>
          <div className="flex flex-col gap-3">
            {areas.map((a) => (
              <div key={a} className="flex items-center gap-3 text-sm text-[#8B9BB4]">
                <span className="w-2 h-2 bg-[#D4A853] rounded-full flex-shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}