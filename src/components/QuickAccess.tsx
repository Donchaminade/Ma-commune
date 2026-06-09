import React, { useState } from "react";
import {
  Building2,
  Calendar,
  FileText,
  BookOpen,
  FolderOpen,
  Check,
  ChevronRight,
  Clock,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Info
} from "lucide-react";
import Modal from "./Modal";
import {
  PROCEDURES_DATA,
  SERVICES_DATA,
  BULLETINS_DATA,
  ProcedureItem,
  ServiceItem,
  BulletinItem
} from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function QuickAccess() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Demarches panel states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProc, setSelectedProc] = useState<ProcedureItem | null>(null);

  // Appt Booking States
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [apptType, setApptType] = useState<"CNI" | "Passeport">("CNI");
  const [apptPeopleCount, setApptPeopleCount] = useState<number>(1);
  const [apptDate, setApptDate] = useState<string>("2026-06-15");
  const [apptTime, setApptTime] = useState<string>("10:15");
  const [apptForm, setApptForm] = useState({ name: "", email: "", phone: "" });
  const [bookingConfirmedCode, setBookingConfirmedCode] = useState<string>("");

  // Council meeting states
  const [selectedCouncilTab, setSelectedCouncilTab] = useState<number>(0);

  // Directory filter states
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryCat, setDirectoryCat] = useState("All");

  // School Portal simulator stats
  const [schoolStep, setSchoolStep] = useState<1 | 2>(1);
  const [selectedChildren, setSelectedChildren] = useState<string[]>(["Léo"]);
  const [schoolBookings, setSchoolBookings] = useState<{
    [child: string]: { [activity: string]: boolean };
  }>({
    Léo: { Cantine: true, GarderieMatin: false, GarderieSoir: true, MercrediLoisirs: false },
    Mila: { Cantine: false, GarderieMatin: true, GarderieSoir: false, MercrediLoisirs: true }
  });

  const childPrices: { [act: string]: number } = {
    Cantine: 3.8,
    GarderieMatin: 1.5,
    GarderieSoir: 2.2,
    MercrediLoisirs: 12.0
  };

  const categories = ["All", "Identité", "Famille", "Urbanisme", "Élections"];
  const filteredProcedures =
    selectedCategory === "All"
      ? PROCEDURES_DATA
      : PROCEDURES_DATA.filter((p) => p.category === selectedCategory);

  const councilSessions = [
    {
      date: "Séance du 28 Mai 2026",
      title: "Budget participatif & Transition Énergie",
      status: "Validé & Publié",
      resolutions: [
        { desc: "Approbation du budget forestier communal 2026", vote: "Unanimité POUR" },
        { desc: "Mise aux normes LED de l'éclairage de la salle omnisport", vote: "24 POUR, 2 CONTRE" },
        { desc: "Subvention d'aide d'urgence pour la coopérative scolaire", vote: "Unanimité POUR" }
      ]
    },
    {
      date: "Séance du 14 Avril 2026",
      title: "Plan Vélo durable & Urbanisme",
      status: "Validé & Publié",
      resolutions: [
        { desc: "Convention d'aménagement de la nouvelle véloroute fluviale", vote: "22 POUR, 4 ABSTENTIONS" },
        { desc: "Achat d'une parcelle cadastrale en vue de l'extension du parc", vote: "Unanimité POUR" },
        { desc: "Création de 4 postes d'agents d'animation d'été périscolaires", vote: "21 POUR, 5 CONTRE" }
      ]
    }
  ];

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptForm.name || !apptForm.email || !apptForm.phone) return;
    const randomCode = "RDV-" + Math.floor(100000 + Math.random() * 900000);
    setBookingConfirmedCode(randomCode);
    setBookingStep(3);
  };

  const toggleActivity = (child: string, act: string) => {
    setSchoolBookings((prev) => ({
      ...prev,
      [child]: {
        ...prev[child],
        [act]: !prev[child]?.[act]
      }
    }));
  };

  const calculateSchoolTotal = () => {
    let tot = 0;
    selectedChildren.forEach((child) => {
      const childB = schoolBookings[child] || {};
      Object.keys(childB).forEach((act) => {
        if (childB[act]) {
          tot += childPrices[act];
        }
      });
    });
    return tot;
  };

  const filteredServices = SERVICES_DATA.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      srv.description.toLowerCase().includes(directorySearch.toLowerCase());
    const matchesCat = directoryCat === "All" || srv.category === directoryCat;
    return matchesSearch && matchesCat;
  });

  const triggerScrollToKiosque = () => {
    const kiosk = document.getElementById("kiosque");
    if (kiosk) kiosk.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="acces-rapide" className="relative -mt-24 sm:-mt-28 md:-mt-32 z-20 w-full max-w-7xl mx-auto px-4 pb-16">
      
      {/* 6 Grid layout white card deck */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
      >
        
        {/* Card 1: Démarches */}
        <button
          onClick={() => {
            setActiveModal("demarches");
            setSelectedProc(null);
          }}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-zinc-100 font-sans font-medium text-sm sm:text-base tracking-tight leading-tight">
            Mes démarches
          </span>
        </button>

        {/* Card 2: Rdv CNI / Passeport */}
        <button
          onClick={() => {
            setActiveModal("rdv");
            setBookingStep(1);
          }}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-zinc-100 font-sans font-medium text-sm sm:text-base tracking-tight leading-tight">
            Rdv CNI /<br />Passeport
          </span>
        </button>

        {/* Card 3: Séances de conseil */}
        <button
          onClick={() => setActiveModal("conseil")}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-zinc-100 font-sans font-medium text-sm sm:text-base tracking-tight leading-tight">
            Séances du<br />conseil
          </span>
        </button>

        {/* Card 4: Bulletin municipal */}
        <button
          onClick={triggerScrollToKiosque}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-zinc-100 font-sans font-medium text-sm sm:text-base tracking-tight leading-tight">
            Bulletin<br />municipal
          </span>
        </button>

        {/* Card 5: Annuaire des services */}
        <button
          onClick={() => setActiveModal("annuaire")}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FolderOpen className="w-6 h-6" />
          </div>
          <span className="text-zinc-100 font-sans font-medium text-sm sm:text-base tracking-tight leading-tight">
            Annuaire des<br />services
          </span>
        </button>

        {/* Card 6: My Péri'School */}
        <button
          onClick={() => {
            setActiveModal("perischool");
            setSchoolStep(1);
          }}
          className="bg-zinc-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="w-14 h-12 flex items-center justify-center mb-4 animate-pulse-slow">
            {/* Colorful custom Peri'School logo */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] uppercase font-bold text-zinc-550 tracking-wider">My</span>
              <div className="flex items-end gap-0.5">
                <span className="w-1.5 h-4 bg-rose-500 rounded-sm"></span>
                <span className="w-1.5 h-6 bg-amber-400 rounded-sm"></span>
                <span className="w-1.5 h-5 bg-teal-400 rounded-sm"></span>
                <span className="w-1.5 h-7 bg-blue-500 rounded-sm"></span>
                <span className="w-1.5 h-4 bg-indigo-500 rounded-sm"></span>
              </div>
            </div>
          </div>
          <span className="text-rose-400 font-sans font-bold text-sm sm:text-base tracking-tight leading-none">
            My<br />Péri&#39;School
          </span>
        </button>
      </motion.div>

      {/* ----------------- MODAL: MES DÉMARCHES ----------------- */}
      <Modal
        isOpen={activeModal === "demarches"}
        onClose={() => setActiveModal(null)}
        title="Guichet Numérique des Démarches"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category List left */}
          <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 border-b md:border-b-0 md:border-r border-white/5 pr-0 md:pr-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedProc(null);
                }}
                className={`px-3 py-2 text-left font-sans text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white animate-pulse-slow"
                    : "text-zinc-450 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {cat === "All" ? "Toutes les catégories" : cat}
              </button>
            ))}
          </div>

          {/* List/Detail Area right */}
          <div className="md:col-span-2 flex flex-col h-full overflow-hidden text-zinc-100">
            {!selectedProc ? (
              <div className="flex flex-col gap-3 min-h-[300px]">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  Sélectionnez une démarche
                </h4>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[320px]">
                  {filteredProcedures.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProc(p)}
                      className="text-left p-3.5 border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-zinc-900/40 transition-all flex justify-between items-center group cursor-pointer"
                    >
                      <div>
                        <h5 className="font-semibold text-zinc-200 text-sm md:text-base group-hover:text-indigo-400 transition-colors">
                          {p.name}
                        </h5>
                        <p className="text-xs text-zinc-450 line-clamp-1 mt-0.5">{p.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-fade-in">
                <button
                  onClick={() => setSelectedProc(null)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-0.5 font-medium mb-1"
                >
                  &larr; Revenir à la liste
                </button>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                    {selectedProc.category}
                  </span>
                  <h4 className="font-bold text-white text-xl mt-1.5">{selectedProc.name}</h4>
                  <p className="text-sm text-zinc-450 mt-1">{selectedProc.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-3 text-xs bg-zinc-950/40 px-3 rounded-lg text-zinc-300">
                  <div>
                    <span className="text-zinc-500 font-mono">Délai moyen :</span>
                    <p className="font-semibold text-zinc-100 mt-0.5">{selectedProc.processingTime}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono">Coût de la procédure :</span>
                    <p className="font-semibold text-zinc-100 mt-0.5">{selectedProc.cost}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-white uppercase tracking-wider mb-2 font-sans flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-400" /> Pièces à fournir (Originaux)
                  </h5>
                  <ul className="list-disc list-inside text-xs text-zinc-405 flex flex-col gap-1.5 pl-1.5">
                    {selectedProc.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="text-zinc-400">{doc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-white uppercase tracking-wider mb-2 font-sans">
                    Étapes de la démarche
                  </h5>
                  <ol className="list-decimal list-inside text-xs text-zinc-400 flex flex-col gap-2 pl-1 bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                    {selectedProc.steps.map((stp, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="font-medium text-zinc-300">{stp}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

           {/* ----------------- MODAL: RDV CNI / PASSEPORT ----------------- */}
      <Modal
        isOpen={activeModal === "rdv"}
        onClose={() => setActiveModal(null)}
        title="Prendre rendez-vous CNI & Passeport"
      >
        {bookingStep === 1 && (
          <div className="flex flex-col gap-6 text-zinc-100">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5 flex gap-3 text-xs md:text-sm text-zinc-300">
              <Info className="w-5 h-5 flex-shrink-0 text-indigo-400" />
              <p className="leading-relaxed">
                Prenez rendez-vous en ligne pour le dépôt de votre dossier CNI ou Passeport. Un rendez-vous est obligatoire par usager (ex: 2 personnes = 2 rendez-vous).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Type de Titre
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setApptType("CNI")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                      apptType === "CNI"
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-white/20"
                    }`}
                  >
                    Carte d&#39;Identité
                  </button>
                  <button
                    onClick={() => setApptType("Passeport")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                      apptType === "Passeport"
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-white/20"
                    }`}
                  >
                    Passeport
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Nombre d&#39;usagers
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setApptPeopleCount(num)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                        apptPeopleCount === num
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-white/20"
                      }`}
                    >
                      {num} {num > 1 ? "Personnes" : "Personne"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Sélectionnez une date
              </label>
              <input
                type="date"
                min="2026-06-10"
                max="2026-08-31"
                value={apptDate}
                onChange={(e) => setApptDate(e.target.value)}
                className="w-full text-sm font-medium border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Créneau horaire disponible
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["09:15", "10:00", "10:45", "11:30", "14:15", "15:00", "15:45", "16:30"].map((tm) => (
                  <button
                    key={tm}
                    onClick={() => setApptTime(tm)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                      apptTime === tm
                        ? "bg-indigo-650 border-indigo-500 text-white shadow-md"
                        : "border-white/5 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 font-bold"
                    }`}
                  >
                    {tm}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setBookingStep(2)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg text-sm font-bold tracking-wider uppercase shadow-lg transition-transform focus:ring-2 focus:ring-indigo-500 mt-2 cursor-pointer"
            >
              Étape Suivante : Informations de Contact &rarr;
            </button>
          </div>
        )}

        {bookingStep === 2 && (
          <form onSubmit={handleBookingConfirm} className="flex flex-col gap-4 text-zinc-100">
            <button
              type="button"
              onClick={() => setBookingStep(1)}
              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-0.5 font-medium mb-1"
            >
              &larr; Retour aux choix des horaires
            </button>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5 text-xs">
              <span className="font-mono text-zinc-500 uppercase tracking-wide">Rendez-vous sélectionné</span>
              <p className="font-bold text-zinc-100 text-sm mt-0.5">
                Dépôt {apptType} ({apptPeopleCount} pers.) - Le {apptDate} à {apptTime}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={apptForm.name}
                  onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                  className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900/60 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Adresse de Courriel
                </label>
                <input
                  type="email"
                  required
                  placeholder="jean.dupont@gmail.com"
                  value={apptForm.email}
                  onChange={(e) => setApptForm({ ...apptForm, email: e.target.value })}
                  className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900/60 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Numéro de Portable
                </label>
                <input
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={apptForm.phone}
                  onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })}
                  className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900/60 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-650 hover:bg-indigo-550 text-white py-3 rounded-lg text-sm font-bold tracking-wider uppercase shadow-lg transition-transform focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              Confirmer Définitivement le RDV &check;
            </button>
          </form>
        )}

        {bookingStep === 3 && (
          <div className="text-center py-6 flex flex-col items-center animate-fade-in text-zinc-100">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-white">Rendez-vous réservé avec succès !</h4>
            <p className="text-sm text-zinc-400 mt-1 max-w-sm">
              Votre créneau a été bloqué dans l&#39;agenda municipal. Un rappel électronique vous a été envoyé.
            </p>

            {/* Recipient card slip */}
            <div className="my-6 p-5 bg-zinc-950/50 border border-white/5 rounded-2xl w-full max-w-md text-left text-xs md:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                <span className="font-mono text-zinc-500 font-bold">REÇU DE RÉSERVATION</span>
                <span className="font-mono text-[#A5B4FC] font-bold">{bookingConfirmedCode}</span>
              </div>
              <div className="flex flex-col gap-2 font-sans">
                <div>
                  <span className="text-zinc-500">Usager titulaire :</span>
                  <p className="font-bold text-zinc-200">{apptForm.name}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Titre concerné :</span>
                  <p className="font-bold text-zinc-200">{apptType === "CNI" ? "Carte Nationale d'Identité" : "Passeport Touristique International"}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-zinc-500">Date retenue :</span>
                    <p className="font-bold text-indigo-400">{apptDate}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Heure de convocation :</span>
                    <p className="font-bold text-indigo-400">{apptTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-350 max-w-sm text-left bg-zinc-900/40 border border-white/5 p-4 rounded-xl leading-relaxed">
              <p className="font-bold text-indigo-300 mb-1 flex items-center gap-1">
                ⚠️ À NE PAS OUBLIER LE JOUR J :
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1 text-zinc-400">
                <li>Apporter votre pré-demande imprimée</li>
                <li>Le justificatif de domicile original</li>
                <li>Votre ancienne carte (or déclaration perte)</li>
                <li>Une photo récente de moins de 6 mois conforme</li>
              </ul>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase transition"
            >
              Fermer le guichet
            </button>
          </div>
        )}
      </Modal>

      {/* ----------------- MODAL: SÉANCES DE CONSEIL ----------------- */}
      <Modal
        isOpen={activeModal === "conseil"}
        onClose={() => setActiveModal(null)}
        title="Procès-verbaux & Décisions du Conseil Municipal"
      >
        <div className="flex flex-col gap-5 text-zinc-100">
          <div className="flex overflow-x-auto gap-2 border-b border-white/5 pb-2">
            {councilSessions.map((sess, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCouncilTab(idx)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  selectedCouncilTab === idx
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                {sess.date}
              </button>
            ))}
          </div>

          <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-start gap-2">
              <h4 className="font-bold text-base md:text-lg text-white">
                {councilSessions[selectedCouncilTab].title}
              </h4>
              <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                {councilSessions[selectedCouncilTab].status}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-1">Saint-Venant, Secrétariat de Séance communal</p>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-zinc-400 uppercase tracking-wider mb-2.5 font-sans">
              Délibérations & Résultats des suffrages :
            </h5>
            <div className="flex flex-col gap-3">
              {councilSessions[selectedCouncilTab].resolutions.map((res, idx) => (
                <div key={idx} className="p-3.5 bg-zinc-900/40 rounded-xl border border-white/5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="max-w-md">
                    <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase">Délibération n°{idx+1}</span>
                    <p className="text-sm text-zinc-250 font-semibold mt-0.5 leading-relaxed">{res.desc}</p>
                  </div>
                  <span className="text-xs font-bold font-mono px-3 py-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 rounded-lg whitespace-nowrap">
                    {res.vote}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* ----------------- MODAL: ANNUAIRE DES SERVICES ----------------- */}
      <Modal
        isOpen={activeModal === "annuaire"}
        onClose={() => setActiveModal(null)}
        title="Annuaire des Services Municipaux"
      >
        <div className="flex flex-col gap-5 text-zinc-100">
          {/* Filters search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none bg-zinc-900 text-zinc-100"
              />
              <Building2 className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["All", "Mairie", "Culture", "Éducation", "Solidarité"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDirectoryCat(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    directoryCat === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-150"
                  }`}
                >
                  {cat === "All" ? "Tous" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory list */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[380px] pr-1.5 scrollbar-thin">
            {filteredServices.length > 0 ? (
              filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 border border-white/5 hover:border-indigo-500/30 rounded-2xl bg-zinc-900/40 shadow-sm flex flex-col gap-3.5 transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/25 rounded-full">
                        {srv.category}
                      </span>
                      <h4 className="font-bold text-white text-base md:text-lg mt-1.5">{srv.name}</h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{srv.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 border-t border-white/5 pt-3.5 text-xs">
                    <div className="flex items-start gap-2.5 text-zinc-300">
                      <Clock className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-zinc-200 block mb-1">Horaires d&#39;ouverture :</span>
                        {srv.hours.map((line, idx) => (
                          <div key={idx} className="leading-normal text-zinc-400">{line}</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Phone className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                        <span className="text-zinc-400">{srv.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Mail className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                        <a href={`mailto:${srv.email}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">{srv.email}</a>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <MapPin className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                        <span className="text-zinc-400">{srv.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-zinc-500 font-mono text-xs">
                <p>Aucun service municipal ne correspond à vos filtres.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* ----------------- MODAL: MY PÉRI'SCHOOL ----------------- */}
      <Modal
        isOpen={activeModal === "perischool"}
        onClose={() => setActiveModal(null)}
        title="My Péri'School - Espace Famille Portal"
      >
        {schoolStep === 1 ? (
          <div className="flex flex-col gap-6 text-zinc-100">
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex gap-3 text-xs md:text-sm text-rose-300">
              <Sparkles className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-rose-200 mb-0.5">Espace Famille Administrateur</h5>
                <p className="leading-relaxed text-rose-300">
                  Gérer les réservations périscolaires de vos enfants pour le trimestre à venir. Sélectionnez vos enfants ci-dessous pour planifier leur planning.
                </p>
              </div>
            </div>

            {/* Child Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Enfants à Programmer :
              </label>
              <div className="flex gap-2">
                {["Léo", "Mila"].map((child) => {
                  const active = selectedChildren.includes(child);
                  return (
                    <button
                      key={child}
                      onClick={() => {
                        if (active) {
                          setSelectedChildren(selectedChildren.filter((c) => c !== child));
                        } else {
                          setSelectedChildren([...selectedChildren, child]);
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl text-base font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                        active
                          ? "bg-rose-600 border-rose-500 text-white shadow-lg"
                          : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full ${active ? "bg-white" : "bg-zinc-700"}`} />
                      {child}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reservation grid of activities */}
            {selectedChildren.length > 0 ? (
              <div className="flex flex-col gap-5">
                {selectedChildren.map((child) => (
                  <div key={child} className="border border-white/5 p-4 rounded-2xl bg-zinc-900/40 shadow-sm">
                    <h5 className="font-extrabold text-sm text-white uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                      Planning de {child} :
                    </h5>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: "Cantine", name: "Cantine", label: "Repas Midi" },
                        { key: "GarderieMatin", name: "Garderie matin", label: "7h30 - 8h20" },
                        { key: "GarderieSoir", name: "Garderie soir", label: "16h30 - 18h30" },
                        { key: "MercrediLoisirs", name: "Centre Loisirs", label: "Mercredi complet" }
                      ].map((actObj) => {
                        const isBooked = schoolBookings[child]?.[actObj.key] || false;
                        const price = childPrices[actObj.key];
                        return (
                          <button
                            key={actObj.key}
                            onClick={() => toggleActivity(child, actObj.key)}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              isBooked
                                ? "bg-rose-500/15 border-rose-500 text-white shadow-sm"
                                : "border-white/5 bg-zinc-950/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                            }`}
                          >
                            <span className="font-extrabold text-xs text-white block">{actObj.name}</span>
                            <span className="text-[10px] text-zinc-500 mt-0.5 leading-none">{actObj.label}</span>
                            <span className="text-xs font-bold text-zinc-200 mt-2 block inline-flex items-center gap-1.5">
                              {price.toFixed(2)}€
                              {isBooked && <Check className="w-3.5 h-3.5 text-rose-400 ml-auto font-black" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Total box */}
                <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5 flex justify-between items-center mt-2">
                  <div>
                    <span className="text-xs text-zinc-500 font-mono">Estimation financière :</span>
                    <p className="text-lg font-bold text-zinc-200 mt-0.5">Pour {selectedChildren.length} enfant(s)</p>
                  </div>
                  <span className="text-xl font-black text-rose-400 font-mono">
                    {calculateSchoolTotal().toFixed(2)} € <span className="text-xs text-zinc-550 font-medium">/ jour</span>
                  </span>
                </div>

                <button
                  onClick={() => setSchoolStep(2)}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl text-sm font-bold tracking-wider uppercase shadow-lg transition-transform focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  Valider les Réservations de l&#39;Espace &rarr;
                </button>
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-500 bg-zinc-950/30 rounded-2xl border border-dashed border-white/5">
                <p className="text-sm">Veuillez cocher au moins un enfant pour programmer son planning.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 flex flex-col items-center animate-fade-in text-zinc-100">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-white">Réservations périscolaires validées !</h4>
            <p className="text-sm text-zinc-400 mt-1 max-w-sm">
              Votre dossier de garde péri-scolaire a fait l&#39;objet d&#39;un enregistrement de validation prioritaire.
            </p>

            <div className="my-6 p-5 bg-zinc-950/50 border border-white/5 rounded-2xl w-full max-w-sm text-left text-xs sm:text-sm">
              <span className="font-mono text-rose-400 font-bold block mb-2 tracking-wide text-xs">RÉCAPITULATIF PERISCHOOL</span>
              <div className="flex flex-col gap-2 font-sans">
                {selectedChildren.map((child) => {
                  const list = Object.keys(schoolBookings[child])
                    .filter((act) => schoolBookings[child][act])
                    .map((act) => act === "Cantine" ? "Cantine" : act === "GarderieMatin" ? "Garderie Matin" : act === "GarderieSoir" ? "Garderie Soir" : "Centre Loisirs");
                  return (
                    <div key={child} className="pb-2 border-b border-white/5 last:border-0 last:pb-0">
                      <span className="font-bold text-zinc-200 text-sm block">{child} :</span>
                      <p className="text-zinc-400 mt-0.5">{list.length > 0 ? list.join(", ") : "Aucune activité programmée"}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase transition"
            >
              Fermer le portail
            </button>
          </div>
        )}
      </Modal>

    </section>
  );
}
