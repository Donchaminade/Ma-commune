/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import QuickAccess from "./components/QuickAccess";
import NewsSection from "./components/NewsSection";
import EventsSection from "./components/EventsSection";
import KiosqueSection from "./components/KiosqueSection";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { NewsItem, EventItem } from "./types";
import { Calendar, Clock, MapPin, Share2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [shareToastText, setShareToastText] = useState("");

  const triggerMockShare = (title: string) => {
    setShareToastText(`Lien de partage copié pour : "${title}"`);
    setTimeout(() => {
      setShareToastText("");
    }, 3500);
  };

  return (
    <div id="root-portal" className="min-h-screen bg-[#0A0A0A] text-zinc-100 scroll-smooth antialiased flex flex-col selection:bg-indigo-500/30 selection:text-white">
      
      {/* 1. Transparent Navigation & Hero Background */}
      <Header
        onSelectNews={setSelectedNews}
        onSelectEvent={setSelectedEvent}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenProcedure={(placeholder) => {}}
      />

      <main className="flex-grow flex flex-col">
        {/* 2. Grid Deck Cards (Float overlay above Hero) */}
        <QuickAccess />

        {/* 3. Section news: Au cœur de votre ville (With Carousel slider) */}
        <NewsSection onSelectNews={setSelectedNews} />

        {/* 4. Section events: Vivre Ma Commune (Background local market) */}
        <EventsSection onSelectEvent={setSelectedEvent} />

        {/* Interactive Stylized Map Section */}
        <MapSection />

        {/* 5. Section bulletins: Le Kiosque (Flip reader simulation) */}
        <KiosqueSection />
      </main>

      {/* 6. Contact Mairie Footer Column links */}
      <Footer
        isContactOpen={isContactOpen}
        onOpenContact={() => setIsContactOpen(true)}
        onCloseContact={() => setIsContactOpen(false)}
      />

      {/* ----------------- POPUP MODAL: CORE NEWS DETAILED STORY ----------------- */}
      <Modal
        isOpen={selectedNews !== null}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.category || "Actualité Municipale"}
      >
        {selectedNews && (
          <div className="flex flex-col gap-5 animate-fade-in text-left">
            {/* Lead banner image */}
            <div className="relative w-full h-[220px] md:h-[300px] rounded-2xl overflow-hidden shadow-inner border border-white/5 bg-zinc-900">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute bottom-4 left-4 bg-zinc-950/90 backdrop-blur font-mono text-xs font-bold text-zinc-400 px-3 py-1 rounded-full shadow-md border border-white/5">
                Publié le {selectedNews.date}
              </span>
            </div>

            <div>
              <h4 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                {selectedNews.title}
              </h4>
              <p className="text-xs text-zinc-550 font-mono mt-1 uppercase tracking-wide">
                Saint-Venant • Actualités du Territoire
              </p>
            </div>

            {/* Simulated full detailed paragraphs */}
            <div className="text-sm text-zinc-300 leading-relaxed font-sans font-normal border-y border-white/5 py-4 flex flex-col gap-3.5">
              <p className="font-semibold text-zinc-100">
                {selectedNews.description}
              </p>
              <p className="text-zinc-400">
                {selectedNews.fullContent ||
                  "Chaque projet municipal s'articule autour des principes fondateurs du bien-être citoyen, de la préservation durable environnementale, et de la solidarité. Les équipes communales se tiennent à votre disposition au quotidien pour toute information complémentaire quant aux dispositions arrêtées dans le cadre de nos récentes annonces administratives."}
              </p>
            </div>

            {/* Sharing micro toolbar */}
            <div className="flex justify-between items-center bg-zinc-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-xs text-zinc-400 font-medium">Partager cette actualité :</span>
              <button
                onClick={() => triggerMockShare(selectedNews.title)}
                className="p-2 bg-zinc-904 hover:bg-zinc-800 border border-white/10 text-zinc-300 rounded-full inline-flex items-center gap-1.5 transition text-xs font-bold cursor-pointer hover:border-white/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                Copier l&#39;adresse de l&#39;article
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ----------------- POPUP MODAL: CORE EVENT BOARD DETAILS ----------------- */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title="Détails de l&#39;Événement"
      >
        {selectedEvent && (
          <div className="flex flex-col gap-5 animate-fade-in text-left">
            
            {/* Cover banner image if provided */}
            {selectedEvent.bannerImage && (
              <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={selectedEvent.bannerImage}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full shadow-md border border-indigo-500/20">
                  {selectedEvent.category}
                </span>
              </div>
            )}

            <div>
              <h4 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                {selectedEvent.title}
              </h4>
              <p className="text-xs text-zinc-450 font-mono mt-1 uppercase tracking-wider">
                VIE ASSOCIATIVE ET COLLECTIVE • SAINT-VENANT
              </p>
            </div>

            {/* Date coordinates summary block grids */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-white/5 py-4 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2.5 bg-zinc-950/40 p-3 rounded-xl border border-white/5">
                <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Date :</span>
                  <span className="font-extrabold text-zinc-100">
                    {selectedEvent.day} {selectedEvent.month === "JUI" ? "Juillet" : selectedEvent.month === "AOÛ" ? "Août" : "Septembre"} {selectedEvent.year}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-zinc-950/40 p-3 rounded-xl border border-white/5">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Horaires :</span>
                  <span className="font-extrabold text-zinc-100">{selectedEvent.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-zinc-950/40 p-3 rounded-xl border border-white/5">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Lieu de rendez-vous :</span>
                  <span className="font-extrabold text-zinc-100 line-clamp-1">{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            {/* Description Text blocks */}
            <div className="text-sm text-zinc-300 leading-relaxed font-sans">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Description complète de l&#39;agenda</h5>
              <p className="text-zinc-400">{selectedEvent.fullText || "Les rassemblements municipaux, qu'ils soient sportifs, artistiques ou cérémoniels, constituent les précieux piliers de l'identité de notre belle ville. Notre comité d'animation travaille main dans la main avec nos commerçants et nos réseaux bénévoles locaux pour offer à tous les habitants de Saint-Venant des rendez-vous sécurisés et d'une ferveur partagée incomparable."}</p>
            </div>

            {/* Share and Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 border-t border-white/5 pt-4 mt-2">
              <button
                onClick={() => triggerMockShare(selectedEvent.title)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Partager cet Événement
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 border border-white/10 hover:bg-zinc-900 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Retour à l&#39;accueil
              </button>
            </div>

          </div>
        )}
      </Modal>

      {/* ----------------- SHARE SUCCESS TOAST POPUP (Toast notification helper) ----------------- */}
      <AnimatePresence>
        {shareToastText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-white/10 text-white rounded-xl shadow-2xl px-5 py-3.5 flex items-center gap-2 max-w-sm text-xs font-sans font-medium"
          >
            <span>{shareToastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
