import React, { useState } from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal, Calendar, MapPin, Clock, Search } from "lucide-react";
import { EVENTS_DATA, EventItem, IMAGES } from "../types";
import Modal from "./Modal";
import { motion } from "motion/react";

interface EventsSectionProps {
  onSelectEvent: (event: EventItem) => void;
}

export default function EventsSection({ onSelectEvent }: EventsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [showFullAgenda, setShowFullAgenda] = useState(false);
  const [agendaCategory, setAgendaCategory] = useState<string>("All");
  const [agendaSearch, setAgendaSearch] = useState("");

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(EVENTS_DATA.length - 3, prev + 1));
  };

  const visibleEvents = EVENTS_DATA.slice(startIndex, startIndex + 3);

  // Agenda list filter
  const filteredEvents = EVENTS_DATA.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(agendaSearch.toLowerCase()) ||
      e.description.toLowerCase().includes(agendaSearch.toLowerCase());
    const matchesCat = agendaCategory === "All" || e.category === agendaCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="evenements" className="relative w-full min-h-[640px] py-12 md:py-16 flex items-center justify-center">
      {/* Background with Darkened overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.townMarket}
          alt="Marché local Vivre Ma Commune"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[#1e2330]/90 backdrop-blur-xs" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col justify-between min-h-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-between min-h-[560px] w-full"
        >
          {/* Title */}
          <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-6">
            Vivre Ma Commune
          </h3>

        {/* 4 Cards Grid Row matching image layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-auto">
          {/* Event Card list */}
          {visibleEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-white/5 flex flex-col justify-between min-h-[320px] transition hover:bg-zinc-900/80 hover:scale-[1.01] hover:border-indigo-500/20 hover:shadow-2xl duration-300 cursor-pointer group"
            >
              <div>
                {/* Visual date badge layout */}
                <div className="w-14 h-14 rounded-2xl bg-indigo-550/20 border border-indigo-500/30 text-indigo-300 flex flex-col items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-bold leading-none">{evt.day}</span>
                  <span className="text-[10px] uppercase font-heavy tracking-wider mt-0.5">{evt.month}</span>
                </div>

                <h4 className="font-sans font-extrabold text-lg text-white leading-tight mb-2 group-hover:text-indigo-300 transition-colors">
                  {evt.title}
                </h4>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Card Footer controls */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(evt);
                  }}
                  className="text-xs font-bold text-zinc-250 hover:text-indigo-400 transition-colors inline-block cursor-pointer"
                >
                  Lire la suite
                </button>
                <MoreHorizontal className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
          ))}

          {/* Agenda grey control card */}
          <div className="bg-zinc-950/80 backdrop-blur-md text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-2xl transition hover:scale-[1.01] border border-white/5">
            <div>
              <h4 className="font-sans font-black text-3xl tracking-tight mb-3">
                Agenda
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Retrouvez les dernières informations et événements de la commune.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setShowFullAgenda(true)}
                className="px-4.5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/20 hover:bg-white hover:text-zinc-950 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer text-indigo-300"
              >
                Voir tout l&#39;agenda
              </button>

              {/* Slider Arrow Navigation Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border transition-all ${
                    startIndex === 0
                      ? "border-white/5 text-white/20 cursor-not-allowed"
                      : "border-white/20 hover:bg-white/10 text-white active:scale-95"
                  }`}
                  aria-label="Événement précédent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex >= EVENTS_DATA.length - 3}
                  className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border transition-all ${
                    startIndex >= EVENTS_DATA.length - 3
                      ? "border-white/5 text-white/20 cursor-not-allowed"
                      : "border-white/20 hover:bg-white/10 text-white active:scale-95"
                  }`}
                  aria-label="Événement suivant"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

          {/* Floating helper note */}
          <p className="text-center text-[10px] sm:text-xs text-zinc-500 tracking-wider uppercase font-mono mt-4">
            Saint-Venant • Vie Active & Culturelle • 2026
          </p>
        </motion.div>
      </div>

      {/* ----------------- DIALOG: COMPREHENSIVE AGENDA ----------------- */}
      <Modal
        isOpen={showFullAgenda}
        onClose={() => setShowFullAgenda(false)}
        title="Agenda Culturel, Sportif et Associatif"
      >
        <div className="flex flex-col gap-5 text-zinc-100">
          {/* Agenda search & Categorization header */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={agendaSearch}
                onChange={(e) => setAgendaSearch(e.target.value)}
                className="w-full text-sm border border-white/10 rounded-xl px-4 py-2 pl-9 focus:ring-2 focus:ring-indigo-550 bg-zinc-900 text-zinc-100 outline-none"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {["All", "Culture", "Sport", "Festivités", "Cérémonie"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAgendaCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                    agendaCategory === cat
                      ? "bg-indigo-650 text-white border-none"
                      : "bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {cat === "All" ? "Tous" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Agenda events list */}
          <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[380px] pr-1.5 scrollbar-thin">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => {
                    onSelectEvent(evt);
                    setShowFullAgenda(false);
                  }}
                  className="p-4 border border-white/5 hover:border-indigo-500/20 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-xl cursor-pointer flex gap-4 transition items-start"
                >
                  {/* Calendar badge */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-550/20 border border-indigo-500/25 text-indigo-300 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-base font-extrabold leading-none">{evt.day}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">{evt.month}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-indigo-500/25 text-indigo-300 border border-indigo-500/20 rounded-full">
                        {evt.category}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {evt.year}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                      {evt.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2.5 text-[11px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400 font-bold" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-zinc-500 font-mono text-xs">
                <p>Aucun événement ne correspond à vos filtres.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}
