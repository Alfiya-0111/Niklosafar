const reviews = [
  {
    text: "Bahut accha experience tha. Airport drop ke liye time pe aaye, car saaf thi aur driver bahut cooperative tha. Definitely recommend karunga!",
    name: "Ramesh Patel",
    location: "Bilimora",
    initial: "R",
  },
  {
    text: "Dwarka yatra ke liye inhone book kiya tha. Poora trip bahut comfortable raha. Elderly parents ke saath travel tha — driver ne bahut dhyan rakha.",
    name: "Sunita Desai",
    location: "Navsari",
    initial: "S",
  },
  {
    text: "Wedding mein decorated car liya tha. Sab bahut khush the. Price bhi reasonable tha aur service top class thi. Thank you NikloSafar!",
    name: "Kavya Shah",
    location: "Valsad",
    initial: "K",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-white">
      <div className="mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Reviews
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A2E] leading-tight mb-4">
          What Our <span className="text-[#D4A853]">Travellers Say</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-[#F5F0E8] border border-[#EDE6D6] rounded-2xl p-7">
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#D4A853] text-base">★</span>
              ))}
            </div>
            <p className="text-[#5a6070] text-sm leading-relaxed italic mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A1A2E] flex items-center justify-center font-playfair text-base text-[#D4A853] font-bold">
                {r.initial}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1A1A2E]">{r.name}</div>
                <div className="text-xs text-[#5a6070]">{r.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}