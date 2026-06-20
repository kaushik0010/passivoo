import React from "react";
import { PackageOpen, LibrarySquare, Share2 } from "lucide-react";

export function ProductLoopSection() {
  const steps = [
    {
      num: "01",
      title: "Claim",
      desc: "Acquire limited-edition artifacts and live match souvenirs before the timer hits zero.",
      icon: PackageOpen,
      color: "from-amber-500/20 to-amber-500/0",
      accent: "text-amber-500",
    },
    {
      num: "02",
      title: "Collect",
      desc: "Build your permanent digital passport. Organize, view, and track your completion progress.",
      icon: LibrarySquare,
      color: "from-blue-500/20 to-blue-500/0",
      accent: "text-blue-500",
    },
    {
      num: "03",
      title: "Share",
      desc: "Export your rarest artifacts as high-fidelity images to flex your ownership anywhere.",
      icon: Share2,
      color: "from-fuchsia-500/20 to-fuchsia-500/0",
      accent: "text-fuchsia-500",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-slate-950">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              The Collector's Journey
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400">
              Three steps to building your permanent archive.
            </p>
          </div>
        </div>

        {/* The Loop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="group relative flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:bg-slate-900/80 transition-colors duration-500"
              >
                {/* Subtle top gradient glow */}
                <div className={`absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* Large Background Number */}
                <div className="absolute -right-3 -top-6 sm:-right-4 sm:-top-8 text-[80px] sm:text-[100px] md:text-[120px] font-black text-slate-800/20 pointer-events-none tracking-tighter transition-transform duration-500 group-hover:scale-110">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 sm:mb-6 md:mb-8 shadow-inner ${step.accent}`}>
                    <Icon strokeWidth={1.5} size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}