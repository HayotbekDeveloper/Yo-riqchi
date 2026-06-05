import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Star, 
  Award, 
  SlidersHorizontal,
  Filter
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import { MOCK_LAWYERS, LEGAL_CATEGORIES } from '../data/mockData';
import type { Lawyer } from '../data/mockData';

interface DiscoveryProps {
  onSelectLawyer: (lawyer: Lawyer) => void;
  onBookLawyer: (lawyer: Lawyer) => void;
  initialCategoryFilter?: string; // e.g. "Oila huquqi"
}

export const Discovery: React.FC<DiscoveryProps> = ({ 
  onSelectLawyer, 
  onBookLawyer,
  initialCategoryFilter = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedRegion, setSelectedRegion] = useState('Barchasi');
  const [minExperience, setMinExperience] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('Barchasi');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Set initial category filter from AI analysis if provided
  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategory(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  const categories = ['Barchasi', ...LEGAL_CATEGORIES.map(c => c.name)];
  const regions = ['Barchasi', 'Toshkent sh.', 'Samarqand', 'Buxoro', 'Farg‘ona'];
  const languages = ['Barchasi', "O'zbekcha", 'Ruscha', 'Inglizcha'];

  // Apply filters
  const filteredLawyers = MOCK_LAWYERS.filter((lawyer) => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lawyer.about.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Barchasi' || lawyer.specialization === selectedCategory;
    
    const matchesRegion = selectedRegion === 'Barchasi' || lawyer.location.includes(selectedRegion);
    
    const matchesExperience = lawyer.experience >= minExperience;
    
    const matchesLanguage = selectedLanguage === 'Barchasi' || lawyer.languages.includes(selectedLanguage);

    return matchesSearch && matchesCategory && matchesRegion && matchesExperience && matchesLanguage;
  });

  return (
    <div className="space-y-8">
      {/* Top Search Banner */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Advokatlar ismi, tarjimai holi yoki kalit so‘zlar bo‘yicha qidiruv..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
          />
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
        </div>

        {/* Filter Toggle Button */}
        <Button 
          variant="secondary"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden justify-center text-xs py-3.5"
          leftIcon={<SlidersHorizontal size={14} />}
        >
          {showMobileFilters ? 'Filtrlarni yopish' : 'Filtrlar'}
        </Button>
      </div>

      {/* Grid: Filters Panel and Marketplace List */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters - Desktop */}
        <div className={`md:col-span-3 space-y-6 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="glass-panel border-white/10 rounded-2xl p-5 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Filter size={14} className="text-brand-blue" />
                Saralash
              </span>
              <button 
                onClick={() => {
                  setSelectedCategory('Barchasi');
                  setSelectedRegion('Barchasi');
                  setMinExperience(0);
                  setSelectedLanguage('Barchasi');
                  setSearchTerm('');
                }}
                className="text-[10px] text-brand-blue hover:underline"
              >
                Tozalash
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Soha toifasi</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-brand-blue/15 text-brand-blue border border-brand-blue/20 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hudud (Viloyat)</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full glass-input text-xs py-2 px-3 rounded-xl border-white/10 bg-brand-navy/60"
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg} className="bg-brand-navy">{reg}</option>
                ))}
              </select>
            </div>

            {/* Experience Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <label>Ish tajribasi</label>
                <span className="text-brand-blue font-bold">{minExperience}+ yil</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="18" 
                value={minExperience}
                onChange={(e) => setMinExperience(parseInt(e.target.value))}
                className="w-full accent-brand-blue bg-white/10 rounded-lg h-1 appearance-none cursor-pointer"
              />
            </div>

            {/* Language Filter */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Muloqot tili</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full glass-input text-xs py-2 px-3 rounded-xl border-white/10 bg-brand-navy/60"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-brand-navy">{lang}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Lawyer List Panel */}
        <div className="md:col-span-9 space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Jami {filteredLawyers.length} nafar advokat topildi</span>
            <span>Saralash: Reyting bo‘yicha</span>
          </div>

          <div className="space-y-5">
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer, index) => (
                <GlassCard 
                  key={lawyer.id} 
                  hoverEffect={false}
                  delay={index * 0.05}
                  className="p-5 md:p-6 flex flex-col md:flex-row gap-6 bg-white/[0.02]"
                >
                  {/* Photo & Rating Section */}
                  <div className="flex flex-row md:flex-col items-center gap-4 shrink-0 md:w-36 text-center">
                    <img 
                      src={lawyer.avatar} 
                      alt={lawyer.name} 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-2 ring-white/10"
                    />
                    <div className="text-left md:text-center mt-1">
                      <div className="flex items-center justify-center text-amber-400 text-sm gap-1">
                        <Star size={14} fill="currentColor" />
                        <span className="font-extrabold">{lawyer.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{lawyer.reviewsCount} ta sharh</span>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 text-left space-y-3 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                      <div>
                        <h4 className="text-lg font-bold text-white tracking-wide truncate">{lawyer.name}</h4>
                        <p className="text-xs text-brand-blue font-semibold">{lawyer.title}</p>
                      </div>
                      
                      {/* Price tag */}
                      <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                        <span className="text-xs text-slate-400">Konsultatsiya haqi:</span>
                        <p className="text-sm font-extrabold text-emerald-400 mt-0.5">100$ dan boshlab (bitta konsultatsiya)</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                      {lawyer.about}
                    </p>

                    {/* Metadata Chips */}
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      <span className="text-[9px] font-semibold bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Award size={10} className="text-brand-blue" />
                        {lawyer.specialization}
                      </span>
                      <span className="text-[9px] font-semibold bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg">
                        Tajriba: {lawyer.experience} yil
                      </span>
                      <span className="text-[9px] font-semibold bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg">
                        Hudud: {lawyer.location.split(',')[0]}
                      </span>
                      <span className="text-[9px] font-semibold bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg">
                        Tillar: {lawyer.languages.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-row md:flex-col justify-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 md:w-44">
                    <Button 
                      variant="glass" 
                      onClick={() => onSelectLawyer(lawyer)}
                      className="flex-1 md:w-full text-xs py-2.5"
                    >
                      Profilni ko‘rish
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => onBookLawyer(lawyer)}
                      className="flex-1 md:w-full text-xs py-2.5"
                    >
                      Maslahat olish
                    </Button>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="glass-panel border-white/10 rounded-2xl p-12 text-center text-slate-400 space-y-4">
                <p>Ushbu filtrlar bo‘yicha advokat topilmadi.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('Barchasi');
                    setSelectedRegion('Barchasi');
                    setMinExperience(0);
                    setSelectedLanguage('Barchasi');
                    setSearchTerm('');
                  }}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  Barcha filtrlarni tozalash
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
