import React, { useState } from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { NEWS_DATA, NewsItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface NewsSectionProps {
  onSelectNews: (news: NewsItem) => void;
}

export default function NewsSection({ onSelectNews }: NewsSectionProps) {
  // Carousel slide state
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 };

  // Responsive items count helper
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    // We have NEWS_DATA.length total news items
    setStartIndex((prev) => Math.min(NEWS_DATA.length - 3, prev + 1));
  };

  // We show 3 news cards in addition to the solid grey intro card (forming a 4-col row)
  // Let's take the currently visible 3 cards starting from startIndex.
  const visibleNews = NEWS_DATA.slice(startIndex, startIndex + 3);

  return (
    <section id="actus" className="relative w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden">
      
      {/* Wave backplate decor */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="text-gray-400" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-8">
          Au cœur de votre ville
        </h3>

        {/* Grid structure matching the image: 1 static intro card, 3 sliding news cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Static Intro Card in Dark Slate */}
          <div className="bg-gradient-to-br from-indigo-950/60 via-zinc-900/80 to-[#1E293B]/60 backdrop-blur border border-white/5 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[380px] sm:min-h-[420px] transition hover:shadow-2xl hover:scale-[1.01] duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-sans font-medium text-zinc-400">
                Découvrez toutes les
              </span>
              <h4 className="font-sans font-black text-4xl sm:text-5xl tracking-tight leading-none mb-4 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                Actus
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal max-w-xs">
                Retrouvez les dernières informations et événements de la commune.
              </p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => onSelectNews(NEWS_DATA[0])}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-zinc-950/40 text-zinc-355 hover:bg-white hover:text-zinc-950 transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Voir toute l&#39;actu
              </button>

              {/* Slider navigation buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    startIndex === 0
                      ? "border-white/5 text-white/20 cursor-not-allowed"
                      : "border-white/25 hover:bg-white/10 text-white active:scale-95"
                  }`}
                  aria-label="Précédent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex >= NEWS_DATA.length - 3}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    startIndex >= NEWS_DATA.length - 3
                      ? "border-white/5 text-white/20 cursor-not-allowed"
                      : "border-white/25 hover:bg-white/10 text-white active:scale-95"
                  }`}
                  aria-label="Suivant"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Viewport Container holding the 3 sliding News Cards */}
          {visibleNews.map((news) => (
            <div
              key={news.id}
              className="group bg-zinc-900/60 backdrop-blur rounded-3xl shadow-lg border border-white/5 overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px] hover:border-indigo-500/20 hover:shadow-indigo-500/5 hover:scale-[1.01] transition-all duration-300"
            >
              {/* Aspect card image */}
              <div className="relative w-full h-[180px] overflow-hidden bg-zinc-950">
                <img
                  src={news.image}
                  alt={news.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-107 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-indigo-300 border border-indigo-500/20 shadow-sm">
                  {news.category}
                </span>
              </div>

              {/* Main content body */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-indigo-400 block mb-1">
                    {news.date}
                  </span>
                  <h5 className="font-sans font-extrabold text-lg text-zinc-100 group-hover:text-indigo-350 transition-colors tracking-tight leading-snug line-clamp-2">
                    {news.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2 line-clamp-3">
                    {news.description}
                  </p>
                </div>

                {/* Read button of card bottom */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                  <button
                    onClick={() => onSelectNews(news)}
                    className="text-xs font-bold text-zinc-200 hover:text-indigo-400 transition-colors inline-flex items-center gap-1 group/btn cursor-pointer"
                  >
                    Lire la suite
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => onSelectNews(news)}
                    className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    aria-label="Plus d'actions"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </motion.div>
    </section>
  );
}
