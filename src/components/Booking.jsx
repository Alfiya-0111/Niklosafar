import { useState } from "react";

const WHATSAPP_NUMBER = "919054270660"; 

export default function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", service: "", route: "", message: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste! I want to book a ride.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ADate: ${form.date}%0ATime: ${form.time}%0AService: ${form.service}%0ARoute: ${form.route}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const inputClass =
    "w-full bg-white/6 border border-[#D4A853]/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#D4A853] transition-colors placeholder-[#8B9BB4]/60 font-outfit";

  return (
    <section id="booking" className="py-24 px-6 md:px-12 bg-[#1A1A2E]">
      <div className="mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Book a Ride
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-4">
          Reserve Your <span className="text-[#D4A853]">Journey</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded mb-4" />
        <p className="text-[#8B9BB4] text-base max-w-lg">
          Fill the form or WhatsApp us directly — we'll confirm your booking within minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white/4 border border-[#D4A853]/15 rounded-2xl p-9">
          <h3 className="font-playfair text-2xl text-[#D4A853] mb-6">Book via Form</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Travel Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Pickup Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Service Type</label>
              <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                <option value="">Select a service</option>
                <option>Airport Drop/Pickup</option>
                <option>Wedding & Functions</option>
                <option>Pilgrimage Tour</option>
                <option>Outstation Trip</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">From → To</label>
              <input name="route" value={form.route} onChange={handleChange} placeholder="e.g. Bilimora → Surat Airport" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Message (optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Any special requirements..." className={inputClass} />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4A853] text-[#1A1A2E] py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#F0C878] transition-colors mt-1 cursor-pointer border-none"
            >
              Send Booking Request via WhatsApp
            </button>
          </form>
        </div>

        {/* WhatsApp box */}
        <div className="bg-[#25D366]/6 border border-[#25D366]/20 rounded-2xl p-9 flex flex-col items-center justify-center text-center gap-5">
          <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center">
            <svg width="42" height="42" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.528 5.85L0 24l6.336-1.5A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.661-.5-5.197-1.375L3 21.5l.9-3.697A9.977 9.977 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl text-white">Book via WhatsApp</h3>
          <p className="text-[#8B9BB4] text-sm leading-relaxed max-w-xs">
            Prefer chatting? Send us a WhatsApp message and we'll confirm your booking instantly. Available 24/7.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%21%20I%20want%20to%20book%20a%20ride%20with%20NikloSafar.`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] text-white px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#1ebe5a] hover:-translate-y-0.5 transition-all no-underline flex items-center gap-2.5"
          >
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.528 5.85L0 24l6.336-1.5A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.661-.5-5.197-1.375L3 21.5l.9-3.697A9.977 9.977 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Chat on WhatsApp
          </a>
         
        </div>
      </div>
    </section>
  );
}