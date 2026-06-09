import React, { useState } from "react";
import { Search, Facebook, Youtube, Instagram, Menu, X, Eye, Sun, Cloud, CloudRain, Snowflake, Wind, Globe, ChevronDown } from "lucide-react";
import { IMAGES, NEWS_DATA, EVENTS_DATA, NewsItem, EventItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onSelectNews: (news: NewsItem) => void;
  onSelectEvent: (event: EventItem) => void;
  onOpenContact: () => void;
  onOpenProcedure: (id: string) => void;
}

interface CityWeather {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  description: string;
}

const WEATHER_DATA: Record<string, Record<string, CityWeather>> = {
  France: {
    "Saint-Venant": { temp: 18, condition: "sunny", description: "Ensoleillé" },
    "Paris": { temp: 21, condition: "cloudy", description: "Partiellement nuageux" },
    "Lille": { temp: 16, condition: "rainy", description: "Averses passagères" },
    "Lyon": { temp: 23, condition: "sunny", description: "Beau fixe" },
  },
  Belgique: {
    "Bruxelles": { temp: 17, condition: "cloudy", description: "Ciel couvert" },
    "Tournai": { temp: 16, condition: "rainy", description: "Pluie fine" },
  },
  "Royaume-Uni": {
    "Londres": { temp: 15, condition: "rainy", description: "Pluvieux" },
    "Manchester": { temp: 14, condition: "cloudy", description: "Nuageux" },
  },
  Canada: {
    "Montréal": { temp: 22, condition: "sunny", description: "Grand soleil" },
    "Toronto": { temp: 20, condition: "windy", description: "Venteux" },
  },
};

export default function Header({ onSelectNews, onSelectEvent, onOpenContact, onOpenProcedure }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [accessibilityActive, setAccessibilityActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [selectedCity, setSelectedCity] = useState("Saint-Venant");
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);

  const getWeatherIcon = (condition?: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-4 h-4 text-amber-400 animate-pulse" />;
      case "cloudy":
        return <Cloud className="w-4 h-4 text-zinc-300" />;
      case "rainy":
        return <CloudRain className="w-4 h-4 text-sky-400" />;
      case "snowy":
        return <Snowflake className="w-4 h-4 text-sky-200" />;
      case "windy":
        return <Wind className="w-4 h-4 text-teal-300" />;
      default:
        return <Sun className="w-4 h-4 text-amber-400" />;
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Load initial accessibility mode preference from localStorage
    const savedMode = localStorage.getItem("accessibility-mode") === "true";
    if (savedMode) {
      setAccessibilityActive(true);
      document.documentElement.classList.add("accessibility-mode");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleAccessibility = () => {
    const nextState = !accessibilityActive;
    setAccessibilityActive(nextState);
    if (nextState) {
      document.documentElement.classList.add("accessibility-mode");
      localStorage.setItem("accessibility-mode", "true");
    } else {
      document.documentElement.classList.remove("accessibility-mode");
      localStorage.setItem("accessibility-mode", "false");
    }
  };

  // Filter content based on search query
  const filteredNews = searchQuery
    ? NEWS_DATA.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredEvents = searchQuery
    ? EVENTS_DATA.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const hasResults = filteredNews.length > 0 || filteredEvents.length > 0;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative w-full min-h-[700px] lg:min-h-[760px] flex flex-col justify-between pb-10">
      {/* Background Image with optimized loading */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.townHallHero}
          alt="Mairie de Saint-Venant"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-102 filter brightness-[0.75] contrast-[1.05]"
        />
        {/* Shadow overlays matching the picture exactly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
      </div>

      {/* Fixed Sticky Navigation Capsule wrapper */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-6 md:py-8"
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left / Center Glassmorphism Tab Capsule */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1.5 px-3 shadow-lg">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="px-5 py-2 text-white/90 hover:text-white font-sans text-sm font-medium hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Ma ville
                </button>
                <button
                  onClick={() => scrollToSection("acces-rapide")}
                  className="px-5 py-2 text-white/95 hover:text-white font-sans text-sm font-medium hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Vie Pratique
                </button>
                <button
                  onClick={() => scrollToSection("actus")}
                  className="px-5 py-2 text-white/95 hover:text-white font-sans text-sm font-medium hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Jeunesse
                </button>
                <button
                  onClick={() => scrollToSection("evenements")}
                  className="px-5 py-2 text-white/95 hover:text-white font-sans text-sm font-medium hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Vie Associative
                </button>
                <button
                  onClick={() => scrollToSection("plan")}
                  className="px-5 py-2 text-white/95 hover:text-white font-sans text-sm font-medium hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Plan
                </button>
              </div>

              {/* Mobile Brand Label */}
              <div className="lg:hidden flex items-center">
                <span className="text-white font-sans font-bold text-lg tracking-tight">
                  Saint-Venant
                </span>
              </div>

              {/* Hamburger for mobile screens */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white bg-white/10 backdrop-blur rounded-full border border-white/20 hover:bg-white/25 transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Socials and Pill Search of Header */}
            <div className="hidden md:flex items-center gap-3 self-end md:self-auto">
              
              {/* Weather Widget */}
              <div className="relative">
                <button
                  onClick={() => setWeatherMenuOpen(!weatherMenuOpen)}
                  className="flex items-center gap-2 px-3 h-9 rounded-full bg-white/10 text-white/90 hover:bg-white/20 active:scale-95 border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  title="Voir la météo"
                >
                  {getWeatherIcon(WEATHER_DATA[selectedCountry]?.[selectedCity]?.condition)}
                  <span>{WEATHER_DATA[selectedCountry]?.[selectedCity]?.temp}°C</span>
                  <span className="hidden xl:inline text-[9px] text-[#A5B4FC] font-medium normal-case">
                    {selectedCity}
                  </span>
                  <ChevronDown className="w-3 h-3 text-white/50" />
                </button>

                <AnimatePresence>
                  {weatherMenuOpen && (
                    <>
                      {/* Invisible backdrop to dismiss with a click */}
                      <div className="fixed inset-0 z-40" onClick={() => setWeatherMenuOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-11 z-50 bg-zinc-950/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-64 shadow-2xl"
                      >
                        <h4 className="text-[10px] uppercase tracking-wider font-mono text-indigo-400 font-bold mb-3 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" />
                          <span>Météo locale & filtres</span>
                        </h4>

                        {/* Country Selector */}
                        <div className="mb-2.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1 block">Pays</label>
                          <select
                            value={selectedCountry}
                            onChange={(e) => {
                              const country = e.target.value;
                              setSelectedCountry(country);
                              // Auto select first city of that country
                              const firstCity = Object.keys(WEATHER_DATA[country] || {})[0];
                              setSelectedCity(firstCity || "");
                            }}
                            className="w-full bg-zinc-900 border border-white/10 text-white text-xs rounded-xl p-2 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                          >
                            {Object.keys(WEATHER_DATA).map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* City Selector */}
                        <div className="mb-3.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1 block">Ville</label>
                          <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 text-white text-xs rounded-xl p-2 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                          >
                            {Object.keys(WEATHER_DATA[selectedCountry] || {}).map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Weather Overview Pane */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                              {getWeatherIcon(WEATHER_DATA[selectedCountry]?.[selectedCity]?.condition)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white leading-tight">{selectedCity}</div>
                              <div className="text-[10px] text-zinc-400 leading-none mt-0.5">
                                {WEATHER_DATA[selectedCountry]?.[selectedCity]?.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-xl font-black text-white">
                            {WEATHER_DATA[selectedCountry]?.[selectedCity]?.temp}°C
                          </div>
                        </div>

                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Accessibility Mode Toggle Button */}
              <button
                onClick={handleToggleAccessibility}
                className={`flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  accessibilityActive
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                    : "bg-white/10 text-white/90 hover:bg-white hover:text-zinc-950 border-white/10"
                }`}
                title="Basculer le mode accessibilité (grand texte et fort contraste)"
              >
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden xl:inline text-[10px]">Accessibilité</span>
              </button>

              {/* Social Icons in circular semi-transparent discs */}
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-white bg-white/10 hover:bg-white border border-white/10 hover:text-blue-600 transition-all duration-300"
                >
                  <Facebook className="w-4 h-4 fill-current stroke-none" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-white bg-white/10 hover:bg-white border border-white/10 hover:text-red-600 transition-all duration-300"
                >
                  <Youtube className="w-4 h-4 fill-current stroke-none" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-white bg-white/10 hover:bg-white border border-white/10 hover:text-pink-600 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              {/* Micro search bar right aligned */}
              <div className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1 pl-4 pr-1 shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Recherche"
                  className="bg-transparent border-none text-white placeholder-white/70 outline-none text-xs w-36 focus:w-48 transition-all duration-300 pr-2 font-sans font-medium"
                />
                <button className="w-7 h-7 bg-white/15 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center rounded-full transition-all">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-4 right-4 z-40 lg:hidden bg-[#1E293B]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-white"
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left py-2 border-b border-white/5 font-sans font-medium tracking-wide cursor-pointer"
              >
                Ma ville
              </button>
              <button
                onClick={() => scrollToSection("acces-rapide")}
                className="text-left py-2 border-b border-white/5 font-sans font-medium tracking-wide cursor-pointer"
              >
                Vie Pratique
              </button>
              <button
                onClick={() => scrollToSection("actus")}
                className="text-left py-2 border-b border-white/5 font-sans font-medium tracking-wide cursor-pointer"
              >
                Jeunesse
              </button>
              <button
                onClick={() => scrollToSection("evenements")}
                className="text-left py-2 border-b border-white/5 font-sans font-medium tracking-wide cursor-pointer"
              >
                Vie Associative
              </button>
              <button
                onClick={() => scrollToSection("plan")}
                className="text-left py-2 font-sans font-medium tracking-wide cursor-pointer"
              >
                Plan interactif
              </button>

              {/* Mobile Accessibility Switch Option */}
              <button
                onClick={handleToggleAccessibility}
                className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-300 mt-2 cursor-pointer ${
                  accessibilityActive
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-white/10 text-white/90 border-white/10 hover:bg-white hover:text-zinc-950"
                }`}
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                Mode Accessibilité : {accessibilityActive ? "Activé" : "Désactivé"}
              </button>

              {/* Mobile Weather Selector Widget */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(WEATHER_DATA[selectedCountry]?.[selectedCity]?.condition)}
                    <div>
                      <span className="text-xs font-bold text-white block">{selectedCity}</span>
                      <span className="text-[10px] text-zinc-400 block">{WEATHER_DATA[selectedCountry]?.[selectedCity]?.description}</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-white">{WEATHER_DATA[selectedCountry]?.[selectedCity]?.temp}°C</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1 block">Pays</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        const country = e.target.value;
                        setSelectedCountry(country);
                        const firstCity = Object.keys(WEATHER_DATA[country] || {})[0];
                        setSelectedCity(firstCity || "");
                      }}
                      className="w-full bg-zinc-950 border border-white/5 text-white text-xs rounded-xl p-2 outline-none"
                    >
                      {Object.keys(WEATHER_DATA).map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1 block">Ville</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/5 text-white text-xs rounded-xl p-2 outline-none"
                    >
                      {Object.keys(WEATHER_DATA[selectedCountry] || {}).map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-2 pt-4 border-t border-white/5">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Facebook className="w-4 h-4 fill-current stroke-none" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Youtube className="w-4 h-4 fill-current stroke-none" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top spacer to preserve spacing after navigation bar becomes fixed */}
      <div className="h-24 md:h-28 flex-shrink-0" />

      {/* Center Hero Information Title & Subtitle */}
      <div id="hero" className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8 text-center flex flex-col items-center">
        <span className="text-white/80 font-sans text-base sm:text-lg md:text-xl font-normal tracking-wide animate-fade-in">
          Bienvenue sur le site de
        </span>
        <h1 className="text-white font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mt-1 mb-2 filter drop-shadow-md">
          Ma commune
        </h1>
        <h2 className="text-white/95 font-sans text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider font-sans opacity-95">
          Saint-Venant
        </h2>

        {/* Global Grand Search Input with dynamic flyout auto-complete dropdown results */}
        <div className="relative w-full max-w-xl sm:max-w-2xl mt-8">
          <div className="flex items-center bg-zinc-900/80 hover:bg-zinc-900 border-2 border-white/10 rounded-full p-2 pl-6 pr-2 shadow-2xl transition-all duration-300 group focus-within:ring-4 focus-within:ring-indigo-500/20">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Que recherchez-vous ?"
              className="bg-transparent border-none text-zinc-100 placeholder-zinc-450 outline-none w-full text-sm sm:text-base pr-4 font-sans font-normal"
            />
            <button className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white flex items-center justify-center rounded-full transition-all shadow-md">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Search Result Flyout Dropdown Panel */}
          <AnimatePresence>
            {showResults && searchQuery && (
              <>
                {/* Close Overlay target */}
                <div className="fixed inset-0 z-30" onClick={() => setShowResults(false)} />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-5 text-left max-h-[380px] overflow-y-auto shadow-indigo-500/10"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                    <span className="text-xs text-zinc-500 font-mono">
                      {filteredNews.length + filteredEvents.length} résultat(s) pour &quot;{searchQuery}&quot;
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
                    >
                      Effacer
                    </button>
                  </div>

                  {hasResults ? (
                    <div className="flex flex-col gap-4">
                      {/* News Results section */}
                      {filteredNews.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#E2E8F0] tracking-wider uppercase mb-1.5 font-sans">
                            Actualités locales
                          </h4>
                          <div className="flex flex-col gap-1.5">
                            {filteredNews.map((news) => (
                              <button
                                key={news.id}
                                onClick={() => {
                                  onSelectNews(news);
                                  setShowResults(false);
                                  setSearchQuery("");
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-zinc-900 flex gap-3 transition-colors border border-transparent hover:border-white/5"
                              >
                                <img
                                  src={news.image}
                                  alt=""
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                                <div>
                                  <div className="text-xs text-zinc-400 font-medium mb-0.5">{news.date} - {news.category}</div>
                                  <h5 className="text-sm font-semibold text-zinc-200 line-clamp-1">{news.title}</h5>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Events Results Section */}
                      {filteredEvents.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#E2E8F0] tracking-wider uppercase mb-1.5 font-sans">
                            Agenda culturel & Cérémonies
                          </h4>
                          <div className="flex flex-col gap-1.5">
                            {filteredEvents.map((evt) => (
                              <button
                                key={evt.id}
                                onClick={() => {
                                  onSelectEvent(evt);
                                  setShowResults(false);
                                  setSearchQuery("");
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-zinc-900 flex gap-3 transition-colors border border-transparent hover:border-white/5"
                              >
                                <div className="w-12 h-12 rounded bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center flex-shrink-0 text-indigo-300">
                                  <span className="text-xs font-bold leading-none">{evt.day}</span>
                                  <span className="text-[9px] uppercase font-bold leading-none tracking-wider mt-0.5">{evt.month}</span>
                                </div>
                                <div>
                                  <div className="text-xs text-zinc-400 font-medium mb-0.5">{evt.time} | {evt.category}</div>
                                  <h5 className="text-sm font-semibold text-zinc-200 line-clamp-1">{evt.title}</h5>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-zinc-550">
                      <p className="text-sm">Aucun résultat trouvé pour votre recherche.</p>
                      <p className="text-xs text-zinc-500 mt-1">Vérifiez l&#39;orthographe ou essayez un autre mot clé.</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom spacing helper */}
      <div className="relative z-10 h-10 w-full" />
    </header>
  );
}
