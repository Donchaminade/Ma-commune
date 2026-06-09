import React, { useState } from "react";
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Send, Check } from "lucide-react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  isContactOpen: boolean;
  onOpenContact: () => void;
  onCloseContact: () => void;
}

export default function Footer({ isContactOpen, onOpenContact, onCloseContact }: FooterProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Civil",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "Civil", message: "" });
    setFormSubmitted(false);
    onCloseContact();
  };

  return (
    <footer className="relative w-full bg-zinc-950 text-zinc-100 py-14 px-4 overflow-hidden border-t border-white/5">
      
      {/* Decorative vector grid backdrop */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-stretch"
        >
        
        {/* Column 1: Custom Branding Mairie & Partners */}
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-col">
            {/* Elegant SVG-Logo representing 'Ma Ville' */}
            <div className="flex items-center gap-3">
              <svg className="w-10 h-10 text-indigo-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M10 12h4m-4 4h4" />
                <circle cx="12" cy="7" r="1.5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight uppercase leading-none font-sans text-white">
                  Ma Ville
                </span>
                <span className="text-[10px] tracking-widest text-zinc-550 font-mono">
                  RÉPUBLIQUE FRANÇAISE
                </span>
              </div>
            </div>
          </div>

          {/* Partner Badges matching image: REGION SUD & VAR DEPARTEMENT */}
          <div className="flex items-center gap-3 mt-10">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/5 flex flex-col items-center">
              <span className="text-[8px] font-mono text-rose-500 font-black leading-none">RÉGION</span>
              <span className="text-xs font-sans font-extrabold text-white leading-tight">SUD</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/5 flex flex-col items-center">
              <span className="text-[8px] font-mono text-sky-400 font-black leading-none">VAR</span>
              <span className="text-[9px] font-sans font-semibold text-zinc-400 leading-tight">LE DÉPARTEMENT</span>
            </div>
          </div>
        </div>

        {/* Column 2: Coordinate Address Contacts */}
        <div className="flex flex-col text-left">
          <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-zinc-450 border-b border-white/5 pb-2 mb-4">
            Mairie de Ma Commune
          </h4>
          <div className="flex flex-col gap-3 text-xs md:text-sm text-zinc-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>
                12 Place de la Mairie<br />
                00000, Ma Commune
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>+33494000000</span>
            </div>
            <p className="text-[10px] text-zinc-600 mt-2 font-mono leading-relaxed">
              Pour toute urgence technique en dehors des horaires d&#39;ouverture des services communaux, composez le numéro ci-dessus pour joindre l&#39;agent d&#39;astreinte.
            </p>
          </div>
        </div>

        {/* Column 3: Mairie Opening Hours & Contact Trigger */}
        <div className="flex flex-col text-left">
          <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-zinc-455 border-b border-white/5 pb-2 mb-4">
            Horaires d&#39;ouverture
          </h4>
          <div className="flex flex-col gap-2.5 text-xs text-zinc-300">
            <div>
              <span className="font-semibold text-white">Lundi et jeudi :</span>
              <p className="text-zinc-400 mt-0.5 font-mono">9h00 - 12h00</p>
            </div>
            <div>
              <span className="font-semibold text-white">Mardi :</span>
              <p className="text-zinc-400 mt-0.5 font-mono">9h00 - 12h00 / 14h00 - 17h00</p>
            </div>
            <div>
              <span className="font-semibold text-white">Mercredi et vendredi :</span>
              <p className="text-zinc-400 mt-0.5 font-mono">9h00 - 12h00 / 14h00 - 16h00</p>
            </div>

            {/* Custom Outline Contact button */}
            <button
              onClick={onOpenContact}
              className="mt-4 px-5 py-2.5 border border-white/10 rounded-full text-xs font-bold uppercase bg-zinc-900 text-zinc-200 hover:bg-white hover:text-zinc-950 active:scale-98 transition duration-200 self-start cursor-pointer"
            >
              Nous contacter
            </button>
          </div>
        </div>

        {/* Column 4: Social Accounts Circles */}
        <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right">
          <div className="flex flex-col items-start md:items-end w-full">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-[#E2E8F0] font-mono">
Suivez-nous
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition shadow-md"
              >
                <Facebook className="w-5 h-5 fill-current stroke-none" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition shadow-md"
              >
                <Youtube className="w-5 h-5 fill-current stroke-none" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-zinc-650 text-[10px] font-mono mt-10 md:mt-0 leading-normal">
            <p>© 2026 Saint-Venant Mairie.</p>
            <p>Hébergé sur le Serveur Cloud Municipal.</p>
          </div>
        </div>

        </motion.div>
      </div>

      {/* ----------------- COMPONENT: CONTACT FORM MODAL ----------------- */}
      <Modal
        isOpen={isContactOpen}
        onClose={resetForm}
        title="Formulaire de Contact Citoyen"
      >
        {!formSubmitted ? (
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-zinc-100 font-sans">
            <div className="bg-zinc-950/45 border border-white/5 p-4 rounded-xl text-xs sm:text-sm text-zinc-400 leading-normal">
              Vos requêtes d&#39;information sont transmises au secrétariat général de la mairie puis envoyées directement au service municipal concerné.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900 text-zinc-100 placeholder-zinc-550"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Courriel
                </label>
                <input
                  type="email"
                  required
                  placeholder="jean.dupont@orange.fr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900 text-zinc-100 placeholder-zinc-550"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Service Destinataire
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900 text-zinc-100"
              >
                <option value="Civil" className="bg-zinc-950">Service État Civil (Identité, Actes)</option>
                <option value="Urbanisme" className="bg-zinc-950">Service Urbanisme (Travaux, PLU)</option>
                <option value="CCAS" className="bg-zinc-950">Action Sociale / CCAS</option>
                <option value="Scolaire" className="bg-zinc-950">Services Scolaires & Péri-scolaires</option>
                <option value="Maire" className="bg-zinc-950">Cabinet de Monsieur le Maire / Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Votre Message civique
              </label>
              <textarea
                required
                rows={4}
                placeholder="Exprimez votre requête ici..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-sm border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-900 text-zinc-100 placeholder-zinc-550"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-98"
            >
              <Send className="w-4 h-4" />
              Soumettre ma demande
            </button>
          </form>
        ) : (
          <div className="text-center py-8 flex flex-col items-center animate-fade-in text-zinc-100 font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-white">Demande Civique Transmise</h4>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm leading-relaxed">
              Merci, <span className="font-semibold text-white">{formData.name}</span>. Votre pli a été indexé sous le numéro municipal de transmission et envoyé au service <span className="font-semibold text-indigo-300">{formData.subject === "Civil" ? "État Civil" : formData.subject === "Urbanisme" ? "Urbanisme" : formData.subject === "CCAS" ? "CCAS" : formData.subject === "Scolaire" ? "Scolaire" : "Cabinet du Maire"}</span>.
            </p>
            <p className="text-xs text-zinc-500 mt-2 font-mono">Un agent municipal étudiera votre message sous 48 heures ouvrées.</p>

            <button
              onClick={resetForm}
              className="mt-6 bg-indigo-600 hover:bg-[#4f46e5]/90 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Fermer la fenêtre
            </button>
          </div>
        )}
      </Modal>

    </footer>
  );
}
