import React, { useState } from "react";
import { MapPin, Building2, GraduationCap, Trophy, Anchor, Clock, Phone, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PointOfInterest {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  hours: string;
  phone: string;
  icon: React.ComponentType<any>;
  // Map coordinates on our stylized 100x100 SVG viewbox
  mapX: number;
  mapY: number;
  color: string;
}

const POI_DATA: PointOfInterest[] = [
  {
    id: "mairie",
    name: "Mairie de Saint-Venant",
    category: "Hôtel de Ville & Services",
    description: "Le centre administratif de la commune de Saint-Venant, hébergé dans un bâtiment de caractère. Accueil physique, état civil, urbanisme et permanence des élus.",
    address: "Place du Général de Gaulle, 62350 Saint-Venant",
    hours: "Lundi au Vendredi : 8h30 - 12h00, 13h30 - 17h00",
    phone: "03 21 63 50 80",
    icon: Building2,
    mapX: 48,
    mapY: 42,
    color: "#6366f1", // Indigo
  },
  {
    id: "ecole",
    name: "Groupe Scolaire du Moulin",
    category: "Éducation & Jeunesse",
    description: "Complexe éducatif regroupant les classes maternelles et élémentaires de la commune, engagé pour l'épanouissement scolaire et peri-scolaire des jeunes Venantais.",
    address: "Avenue des Écoles, 62350 Saint-Venant",
    hours: "Lundi, Mardi, Jeudi, Vendredi : 8h30 - 16h30",
    phone: "03 21 63 50 85",
    icon: GraduationCap,
    mapX: 30,
    mapY: 65,
    color: "#f59e0b", // Amber
  },
  {
    id: "sports",
    name: "Complexe Sportif de la Lys",
    category: "Sports & Loisirs",
    description: "Infrastructures modernes regroupant la salle omnisports, les terrains de football, de tennis et d'athlétisme. Lieu de vie de nombreuses associations sportives.",
    address: "Rue du Stade, 62350 Saint-Venant",
    hours: "Tous les jours : 08h00 - 22h00 (selon créneaux clubs)",
    phone: "03 21 63 50 90",
    icon: Trophy,
    mapX: 72,
    mapY: 55,
    color: "#10b981", // Emerald
  },
  {
    id: "port",
    name: "Port de Plaisance & Berges de la Lys",
    category: "Nature & Patrimoine",
    description: "Espace de détente verdoyant le long de la Lys navigable. Idéal pour les balades, le cyclotourisme, la navigation de plaisance et la découverte de la biodiversité locale.",
    address: "Chemin du Halage, 62350 Saint-Venant",
    hours: "Accès libre toute l'année",
    phone: "03 21 63 50 00",
    icon: Anchor,
    mapX: 60,
    mapY: 25,
    color: "#06b6d4", // Cyan
  },
];

export default function MapSection() {
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest>(POI_DATA[0]);
  const [hoveredPoi, setHoveredPoi] = useState<PointOfInterest | null>(null);

  return (
    <section id="plan" className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-[#0f121d] to-zinc-950 py-16 px-4">
      
      {/* Decorative Vector Grid in Background (as per prompt.md rules) */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2500/svg">
          <defs>
            <pattern id="grid-map" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-map)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {/* Section Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase">
              Plan Interactif
            </span>
            <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Points d&#39;Intérêt de Saint-Venant
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl mt-2 font-sans font-light">
              Explorez visuellement les principaux équipements de la commune. Cliquez sur un repère ou sélectionnez une fiche pour en savoir plus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive List & Selected POI Detailed Glass Pane (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              
              {/* Pills / Quick Selector List */}
              <div className="flex flex-col gap-2.5">
                {POI_DATA.map((poi) => {
                  const IconComponent = poi.icon;
                  const isSelected = selectedPoi.id === poi.id;
                  return (
                    <button
                      key={poi.id}
                      onClick={() => setSelectedPoi(poi)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600/10 border-indigo-500/30 text-white shadow-lg shadow-indigo-600/5 translate-x-1"
                          : "bg-zinc-900/40 backdrop-blur-md border-white/5 text-zinc-400 hover:border-white/10 hover:bg-zinc-900/60 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300"
                          style={{
                            backgroundColor: isSelected ? `${poi.color}20` : "rgba(255,255,255,0.03)",
                            borderColor: isSelected ? poi.color : "rgba(255,255,255,0.08)",
                            color: poi.color,
                          }}
                        >
                          <IconComponent className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm tracking-tight text-zinc-150">
                            {poi.name}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            {poi.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border transition-all ${
                            isSelected
                              ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                              : "bg-zinc-950 text-zinc-600 border-white/5"
                          }`}
                        >
                          Voir
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Information Display Panel (Glassmorphism layout with motion transition) */}
              <div className="relative overflow-hidden bg-zinc-900/50 backdrop-blur-md border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-between min-h-[300px] shadow-2xl">
                
                {/* Visual Glow Ornament relative and top-right */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full filter blur-3xl opacity-20 transition-all duration-500"
                  style={{ backgroundColor: selectedPoi.color }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPoi.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 h-full justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border"
                          style={{
                            color: selectedPoi.color,
                            borderColor: `${selectedPoi.color}30`,
                            backgroundColor: `${selectedPoi.color}10`,
                          }}
                        >
                          {selectedPoi.category}
                        </span>
                      </div>

                      <h4 className="font-sans font-extrabold text-xl text-white mt-2 leading-tight">
                        {selectedPoi.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3.5 font-sans font-light">
                        {selectedPoi.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5 mt-auto">
                      <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <MapPin className="w-4 h-4 text-zinc-550 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-zinc-300 block">Adresse :</span>
                          <span>{selectedPoi.address}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <Clock className="w-4 h-4 text-zinc-550 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-zinc-300 block">Horaires :</span>
                          <span>{selectedPoi.hours}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <Phone className="w-4 h-4 text-zinc-550 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-zinc-300 block">Contact direct :</span>
                          <span className="font-mono text-indigo-300">{selectedPoi.phone}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
              </div>

            </div>

            {/* Right Column: High-End Custom Styled Interactive Vector Map (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-900/30 backdrop-blur-md border border-white/5 p-4 rounded-3xl flex items-center justify-center min-h-[400px] sm:min-h-[480px] relative overflow-hidden group shadow-2xl">
              
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-radial-at-c from-zinc-900/10 via-zinc-950/20 to-zinc-950/40 pointer-events-none" />

              {/* Water River & Parks stylings SVG Canvas container */}
              <div className="relative w-full h-full max-w-[500px] aspect-[4/3] sm:aspect-square flex items-center justify-center z-10 select-none">
                
                {/* Ambient glow underneath */}
                <div
                  className="absolute w-44 h-44 rounded-full filter blur-[100px] opacity-15 transition-all duration-700 pointer-events-none"
                  style={{
                    backgroundColor: hoveredPoi ? hoveredPoi.color : selectedPoi.color,
                    left: `${hoveredPoi ? hoveredPoi.mapX : selectedPoi.mapX}%`,
                    top: `${hoveredPoi ? hoveredPoi.mapY : selectedPoi.mapY}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* SVG Visual Map Board */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-zinc-800"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Decorative compass/navigation design ornament top-right */}
                  <g opacity="0.15" transform="translate(88, 12)">
                    <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="0.5" />
                    <line x1="-11" y1="0" x2="11" y2="0" stroke="white" strokeWidth="0.5" />
                    <line x1="0" y1="-11" x2="0" y2="11" stroke="white" strokeWidth="0.5" />
                    <polygon points="0,-10 -3,-2 0,-4 3,-2" fill="white" />
                    <text x="-2.5" y="-13" fill="white" fontSize="3" fontFamily="monospace">N</text>
                  </g>

                  {/* Parc / Green Forest Area */}
                  <path
                    d="M 5,5 Q 25,12 18,32 T 5,55 Z"
                    fill="rgba(16, 185, 129, 0.03)"
                    stroke="rgba(16, 185, 129, 0.08)"
                    strokeWidth="0.5"
                    className="transition-all"
                  />
                  
                  <path
                    d="M 68,60 Q 82,65 92,85 T 60,95 Z"
                    fill="rgba(16, 185, 129, 0.04)"
                    stroke="rgba(16, 185, 129, 0.09)"
                    strokeWidth="0.5"
                    className="transition-all"
                  />

                  {/* River "La Lys" flows gracefully across top */}
                  <path
                    d="M -10,12 Q 22,25 58,22 T 110,16"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.25)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M -10,12 Q 22,25 58,22 T 110,16"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.4)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />

                  {/* Grid System / Major Streets */}
                  {/* Rue Principale */}
                  <path
                    d="M 12,100 L 45,45 Q 48,40 50,30 L 53,-10"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  
                  {/* Boulevard du centre */}
                  <path
                    d="M -10,42 L 48,42 Q 52,43 72,55 L 110,65"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Secondary Streets */}
                  <path
                    d="M 30,10 L 30,90"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 72,10 L 72,90"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 10,75 L 90,75"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="1"
                  />

                  {/* Water canals / branch */}
                  <path
                    d="M 58,22 Q 55,50 72,55"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.12)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Stylized residential map grid structures */}
                  <rect x="18" y="22" width="6" height="5" rx="1" fill="white" opacity="0.03" />
                  <rect x="26" y="24" width="4" height="4" rx="0.5" fill="white" opacity="0.03" />
                  <rect x="36" y="52" width="5" height="7" rx="1" fill="white" opacity="0.03" />
                  <rect x="58" y="47" width="7" height="5" rx="1" fill="white" opacity="0.03" />
                  <rect x="80" y="32" width="6" height="6" rx="1" fill="white" opacity="0.03" />

                  {/* Glowing Rings under Pins */}
                  {POI_DATA.map((poi) => {
                    const isSelected = selectedPoi.id === poi.id;
                    const isHovered = hoveredPoi?.id === poi.id;
                    return (
                      <g key={`glow-${poi.id}`}>
                        {/* Outer pulsing ring */}
                        <circle
                          cx={poi.mapX}
                          cy={poi.mapY}
                          r={isSelected ? 6 : isHovered ? 4.5 : 3.5}
                          fill="none"
                          stroke={poi.color}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                          opacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.1}
                          className="transition-all duration-300"
                        />
                        {/* Interactive Invisible target circle to make hovering easier */}
                        <circle
                          cx={poi.mapX}
                          cy={poi.mapY}
                          r={10}
                          fill="transparent"
                          className="cursor-pointer"
                          onClick={() => setSelectedPoi(poi)}
                          onMouseEnter={() => setHoveredPoi(poi)}
                          onMouseLeave={() => setHoveredPoi(null)}
                        />
                      </g>
                    );
                  })}

                  {/* Interactive map pins with SVGs inside them */}
                  {POI_DATA.map((poi) => {
                    const isSelected = selectedPoi.id === poi.id;
                    const isHovered = hoveredPoi?.id === poi.id;
                    const scale = isSelected ? 1.25 : isHovered ? 1.12 : 1;
                    
                    return (
                      <g
                        key={`pin-${poi.id}`}
                        className="transition-all duration-300"
                        style={{
                          transform: `translate(${poi.mapX}px, ${poi.mapY}px) scale(${scale})`,
                          transformOrigin: "center center",
                        }}
                      >
                        {/* Pin base hover tooltip backing indicator */}
                        {isHovered && !isSelected && (
                          <g transform="translate(0, -9)">
                            <rect
                              x="-18"
                              y="-5"
                              width="36"
                              height="6"
                              rx="1.5"
                              fill="#090d16"
                              stroke="rgba(255,255,255,0.15)"
                              strokeWidth="0.3"
                            />
                            <text
                              x="0"
                              y="-1"
                              fill="white"
                              fontSize="2.5"
                              textAnchor="middle"
                              fontFamily="sans-serif"
                              fontWeight="bold"
                            >
                              {poi.name.split(" ")[0]}..
                            </text>
                          </g>
                        )}

                        {/* Pin Marker Background */}
                        <circle
                          cx="0"
                          cy="0"
                          r="4"
                          fill="#090d16"
                          stroke={poi.color}
                          strokeWidth={isSelected ? "1.5" : "1"}
                          className="transition-all duration-300"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="3"
                          fill={isSelected ? poi.color : "transparent"}
                          opacity={isSelected ? 0.15 : 0}
                          className="transition-all duration-300"
                        />

                        {/* Little pin base stick shape if selected */}
                        {isSelected && (
                          <path
                            d="M -1.2,3 L 0,5.8 L 1.2,3 Z"
                            fill={poi.color}
                          />
                        )}

                        {/* Small Center Dot inside pin marker */}
                        <circle
                          cx="0"
                          cy="0"
                          r="1.2"
                          fill={poi.color}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Subtle Floating Interactive Compass Map HUD Overlay */}
                <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur border border-white/5 px-2.5 py-1.5 rounded-xl text-[9px] font-mono text-zinc-500 tracking-wider flex items-center gap-1.5 shadow">
                  <Navigation className="w-3 h-3 text-indigo-400 rotate-45" />
                  <span>VUE DES ÉQUIPEMENTS • SAINT-VENANT 62</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>

    </section>
  );
}
