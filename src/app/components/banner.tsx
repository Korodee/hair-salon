"use client";

export default function Banner() {
  const userName = "Jane Doe"; // Can be dynamically replaced

  // Predefined positions for consistent SSR rendering
  const starPositions = [
    { top: "10%", left: "15%", size: 50 },
    { top: "20%", left: "70%", size: 30 },
    { top: "40%", left: "30%", size: 42 },
    { top: "60%", left: "50%", size: 63 },
    { top: "80%", left: "20%", size: 24 },
    { top: "25%", left: "90%", size: 64 },
    { top: "70%", left: "80%", size: 42 },
    { top: "50%", left: "10%", size: 20 },
  ];

  return (
    <div className="relative w-full h-[200px] p-6 rounded-3xl bg-[#7259E6] text-white shadow-lg overflow-hidden flex flex-col justify-center">
      {/* Star-like background pattern */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-xl rotate-45 blur-sm"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative">
        <h2 className="text-3xl font-semibold mt-1">Welcome, {userName}</h2>
        <p className="mt-1 text-md text-white/80">
          Experience the luxury, embrace the glow, radiate confidence, redefine
          beauty, feel the elegance, and let your charm shine!
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center md:justify-normal items-center mt-2">
        <div className="mt-3 w-fit hidden md:flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-sm font-medium ">
          Book an Appointment Below
        </div>
      </div>
    </div>
  );
}
