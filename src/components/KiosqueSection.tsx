import React, { useState } from "react";
import { Download, BookOpen, ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { BULLETINS_DATA, BulletinItem, IMAGES } from "../types";
import Modal from "./Modal";
import { motion, AnimatePresence } from "motion/react";

export default function KiosqueSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerPage, setReaderPage] = useState(1);
  const [downloadToast, setDownloadToast] = useState(false);

  const activeBulletin = BULLETINS_DATA[activeIndex] || BULLETINS_DATA[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BULLETINS_DATA.length - 1 : prev - 1));
    setReaderPage(1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === BULLETINS_DATA.length - 1 ? 0 : prev + 1));
    setReaderPage(1);
  };

  const triggerDownload = () => {
    setDownloadToast(true);
    setTimeout(() => {
      setDownloadToast(false);
    }, 4000);
  };

  return (
    <section id="kiosque" className="relative w-full bg-gradient-to-br from-zinc-950 via-[#1e2436] to-zinc-950 text-white py-16 px-4 overflow-hidden border-t border-b border-white/5">
      
      {/* Curved background vectors matching picture exactly */}
      <div className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 1440 320" fill="none" className="absolute top-0 w-full">
          <path d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-between h-full w-full"
        >
        
        <h3 className="font-sans font-light text-2xl tracking-wide mb-1 opacity-90">
          Le <span className="font-sans font-black text-3xl text-white">Kiosque</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-10">
          
          {/* Left Column: 3D Stacked Book/Magazine covers */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px]">
            <div className="relative w-[280px] h-[360px] flex items-center justify-center">
              
              {/* Stack Item 3 (Bottom-most) */}
              <div className="absolute w-full h-full bg-zinc-950/80 rounded-2xl shadow-xl transform rotate-[-8deg] -translate-x-6 translate-y-3 z-0 transition-all duration-500 border border-white/5 overflow-hidden">
                <div className="w-full h-full opacity-35 bg-gradient-to-tr from-[#1E293B]/20 to-zinc-950 p-4 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">EDITION HISTORIQUE</span>
                  <div className="h-28 bg-[#181E30] rounded-lg" />
                </div>
              </div>

              {/* Stack Item 2 (Middle) */}
              <div className="absolute w-full h-full bg-[#181E30]/90 rounded-2xl shadow-2xl transform rotate-[5deg] translate-x-3 translate-y-1.5 z-10 transition-all duration-500 border border-white/5 overflow-hidden">
                <div className="w-full h-full opacity-55 bg-gradient-to-tr from-zinc-950 via-[#2E354F]/40 to-zinc-800 p-4 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">MA VILLE DIRECT</span>
                  <div className="h-32 bg-zinc-900/60 rounded-lg" />
                </div>
              </div>

              {/* Stack Item 1 (Active Cover - Face front) */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 400 }}
                className="absolute w-full h-full bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-2xl z-20 border border-white/10 overflow-hidden flex flex-col justify-between p-6 select-none group"
              >
                {/* Gloss reflection shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#A5B4FC]">
                      Bulletin Municipal
                    </span>
                    <span className="text-xl font-black text-white mt-1 leading-none tracking-tight">
                      LA VILLE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/90">
                    {activeBulletin.period}
                  </span>
                </div>

                {/* Cover Artistic Graphic representing municipal town */}
                <div className="my-4 flex-1 rounded-xl bg-gradient-to-br from-[#38BDF8]/40 to-[#1D4ED8]/40 p-4 relative overflow-hidden flex flex-col justify-end border border-white/5">
                  {/* Miniature abstract vector shapes */}
                  <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute -left-10 bottom-4 w-32 h-32 rounded-full bg-emerald-500/10 blur-lg" />
                  
                  <span className="text-[10px] font-bold text-white/50 tracking-widest font-mono">N° 0{activeIndex+8}</span>
                  <h4 className="text-xl font-extrabold text-white leading-tight mt-0.5 tracking-tight drop-shadow-md">
                    LE BULLETIN
                  </h4>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Saint-Venant • France
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Slider navigation loops understacked under the book cover alignment */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                aria-label="Bulletin précédent"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-mono tracking-wider text-zinc-400">
                0{activeIndex + 1} / 0{BULLETINS_DATA.length}
              </span>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                aria-label="Bulletin suivant"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {" "}
          {/* Right Column: Bulletin specifications detail card */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 font-mono">
              Numéro en cours
            </span>
            <h4 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mt-1 mb-4">
              {activeBulletin.title}
            </h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans font-light mb-8 max-w-lg">
              {activeBulletin.description}
            </p>

            {/* Reader trigger block buttons row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={triggerDownload}
                className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-100 font-sans font-bold text-xs uppercase tracking-wider rounded-full inline-flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>

              <button
                onClick={() => {
                  setReaderPage(1);
                  setIsReaderOpen(true);
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full inline-flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Feuilleter l&#39;édition
              </button>
            </div>

            <button
              onClick={() => {
                setReaderPage(1);
                setIsReaderOpen(true);
              }}
              className="mt-8 self-start px-5 py-2.5 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 transition-all text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Toutes les publications
            </button>
          </div>

        </div>
        </motion.div>
      </div>

      {/* ----------------- COMPONENT: DETAILED BULLETIN READER ----------------- */}
      <Modal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        title={`Visionneuse de Publication - ${activeBulletin.number}`}
        maxWidth="max-w-4xl"
      >
        <div className="flex flex-col min-h-[420px] text-zinc-100">
          {/* Header page details indicators */}
          <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-6 text-xs text-zinc-400">
            <span>{activeBulletin.period} — Version Haute Fidélité</span>
            <span className="font-mono font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/25 px-2.5 py-0.5 rounded-full">
              Page {readerPage} sur {activeBulletin.pages.length}
            </span>
          </div>

          {/* Actual page reader canvas simulator */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Page Art Illustration left */}
            <div className="md:col-span-5 h-[280px] bg-zinc-950 rounded-2xl overflow-hidden shadow-inner border border-white/5 relative">
              {activeBulletin.pages[readerPage - 1]?.image ? (
                <img
                  src={activeBulletin.pages[readerPage - 1].image}
                  alt="Page Illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 p-4">
                  <BookOpen className="w-12 h-12 stroke-[1.2] mb-2 text-indigo-400" />
                  <span className="text-xs">Illustration thématique</span>
                </div>
              )}
            </div>

            {/* Page textual content right */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[10px] font-mono uppercase bg-indigo-550/20 text-indigo-300 border border-indigo-500/20 font-bold px-2.5 py-0.5 rounded-full self-start mb-2.5">
                Section 0{readerPage}
              </span>
              <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight mb-3">
                {activeBulletin.pages[readerPage - 1]?.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-indigo-400">
                {activeBulletin.pages[readerPage - 1]?.content}
              </p>
            </div>
          </div>

          {/* Reader navigation slider buttons */}
          <div className="border-t border-white/5 pt-5 mt-6 flex justify-between items-center">
            <button
              onClick={() => setReaderPage((p) => Math.max(1, p - 1))}
              disabled={readerPage === 1}
              className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-lg border inline-flex items-center gap-1 cursor-pointer transition ${
                readerPage === 1
                  ? "border-white/5 text-zinc-600 bg-zinc-900/10 cursor-not-allowed"
                  : "border-white/10 text-zinc-200 bg-zinc-900 hover:bg-zinc-805"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Page Précédente
            </button>

            <div className="hidden sm:flex items-center gap-1.5 h-1.5">
              {activeBulletin.pages.map((pg) => (
                <div
                  key={pg.pageNumber}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    readerPage === pg.pageNumber ? "w-6 bg-indigo-500" : "w-2 bg-zinc-850"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setReaderPage((p) => Math.min(activeBulletin.pages.length, p + 1))}
              disabled={readerPage === activeBulletin.pages.length}
              className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-lg border inline-flex items-center gap-1 cursor-pointer transition ${
                readerPage === activeBulletin.pages.length
                  ? "border-white/5 text-zinc-650 bg-zinc-900/10 cursor-not-allowed"
                  : "border-white/10 text-zinc-200 bg-zinc-900 hover:bg-zinc-805"
              }`}
            >
              Page Suivante
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>

      {/* ----------------- TOAST: DOWNLOAD ALERTER ----------------- */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1E293B] border border-white/20 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3 max-w-sm"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 animate-bounce">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-400">Téléchargement lancé</h5>
              <p className="text-xs text-white/80 mt-0.5 font-sans">
                Le fichier PDF du <span className="font-semibold text-white">{activeBulletin.number}</span> est en cours d&#39;enregistrement...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
