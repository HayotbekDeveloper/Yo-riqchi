import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileUp, 
  Cpu, 
  Search, 
  CalendarCheck, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Star, 
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import { MOCK_LAWYERS, MOCK_TESTIMONIALS, LEGAL_CATEGORIES } from '../data/mockData';

interface LandingProps {
  onStartDemo: () => void;
  onFindLawyer: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartDemo, onFindLawyer }) => {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  
  // Custom counter animation hook simulation
  const [stats, setStats] = useState({ cases: 8500, lawyers: 400, accuracy: 85, hours: 24 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ cases: 10240, lawyers: 520, accuracy: 95, hours: 24 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredLawyers = selectedCategory === 'Barchasi'
    ? MOCK_LAWYERS.slice(0, 3)
    : MOCK_LAWYERS.filter(l => l.specialization === selectedCategory);

  const categories = ['Barchasi', ...LEGAL_CATEGORIES.map(c => c.name)];

  return (
    <div className="bg-brand-navy min-h-screen relative overflow-hidden bg-grid-pattern text-slate-100 font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30vh] right-[-100px] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[20%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
            <img src="/logo.png" alt="YO‘RIQCHI Logo" className="object-contain w-20 h-20 " />
          
          <div>
            <h1 className="text-[23px] font-bold text-white tracking-wider">YO‘RIQCHI</h1>
            <p className="text-[10px] text-brand-white font-medium uppercase tracking-widest -mt-1">AI yuridik navigator </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">Biz qanday ishlaymiz?</a>
          <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#lawyers" className="text-sm text-slate-300 hover:text-white transition-colors">Advokatlarimiz</a>
          <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">Mijozlar fikri</a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onFindLawyer} className="text-sm">Advokat Topish</Button>
          <Button variant="primary" onClick={onStartDemo} className="text-sm">Tizimga Kirish</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase">Innovatsion LegalTech Tizimi</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Hujjat yuklang. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
                AI yordamida eng mos
              </span> <br />
              advokatni toping.
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl font-light leading-relaxed">
              YO‘RIQCHI platformasi yuridik hujjatlarni tahlil qiladi, muammoni aniqlaydi va sizni eng yaxshi yuridik mutaxassis bilan darhol bog‘laydi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={onStartDemo}
                rightIcon={<ArrowRight size={18} />}
              >
                Hujjatni tahlil qilish
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                onClick={onFindLawyer}
              >
                Advokat qidirish
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Illustration */}
        <div className="md:col-span-5 relative flex items-center justify-center min-h-[400px]">
          {/* Main Visualizer */}
          <div className="w-full relative max-w-sm">
            {/* Animated Connector Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue via-purple-500 to-emerald-400 -translate-y-1/2 z-0 opacity-40 blur-[1px]" />
            
            {/* Floating Card 1: Upload */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-8 w-44 glass-panel border-white/10 p-4 rounded-2xl shadow-xl z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/20 text-brand-blue flex items-center justify-center">
                  <FileUp size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white truncate">shartnoma.pdf</p>
                  <p className="text-[9px] text-slate-400">Yuklangan hujjat</p>
                </div>
              </div>
              <div className="mt-2.5 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-brand-blue w-full h-full rounded-full" />
              </div>
            </motion.div>

            {/* Floating Card 2: AI Analyzing */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glass-panel border-white/10 p-5 rounded-3xl shadow-xl mx-auto w-64 z-20 relative glow-pulse border-brand-blue/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/15 px-2 py-0.5 rounded-full">AI Tahlilchi</span>
                <span className="text-[11px] font-bold text-emerald-400">94% Ishonch</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Nikoh shartnomasi nizosi</h4>
              <p className="text-[10px] text-slate-300 line-clamp-2">Birgalikda olingan ko‘chmas mulkni taqsimlash to‘g‘risidagi nizoli holat.</p>
              
              <div className="mt-4 flex gap-1.5">
                <span className="text-[8px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">Oila huquqi</span>
                <span className="text-[8px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">31-modda</span>
              </div>
            </motion.div>

            {/* Floating Card 3: Match */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-8 -right-8 w-48 glass-panel border-white/10 p-4 rounded-2xl shadow-xl z-10"
            >
              <div className="flex items-center gap-2.5">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=80&h=80" 
                  alt="Lawyer avatar" 
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">Alisher Qodirov</p>
                  <p className="text-[9px] text-brand-blue">Oila huquqi mutaxassisi</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center text-[9px] text-amber-400 gap-0.5">
                  <Star size={10} fill="currentColor" />
                  <span>4.9 (142 baho)</span>
                </div>
                <span className="text-[8px] bg-emerald-500/25 text-emerald-400 px-1.5 py-0.5 rounded font-medium">Faol</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-t border-b border-white/5 bg-white/[0.01] backdrop-blur-md py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 transition-all">
              {stats.cases.toLocaleString()}+
            </h3>
            <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Tahlil qilingan ishlar</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 transition-all">
              {stats.lawyers.toLocaleString()}+
            </h3>
            <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Professional Advokatlar</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 transition-all">
              {stats.accuracy}%
            </h3>
            <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Tahlil Aniqiligi</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 transition-all">
              {stats.hours}/7
            </h3>
            <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">AI Yordamchi</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Biz qanday ishlaymiz?</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">4 qadamda yuridik muammoingizni hal etishga yordam beramiz.</p>
        </div>

        {/* 4-step Timeline Grid */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          
          {/* Timeline connecting lines for desktop */}
          <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand-blue/30 via-indigo-500/30 to-brand-blue/30 z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center relative z-10 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-brand-blue flex items-center justify-center mb-6 shadow-xl transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-brand-blue/20">
              <FileUp size={24} />
            </div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">1-Qadam</span>
            <h4 className="text-lg font-semibold text-white mb-2">Hujjatlarni yuklash</h4>
            <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">PDF, DOCX yoki rasm formatidagi hujjatlarni kiriting.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center relative z-10 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-brand-blue flex items-center justify-center mb-6 shadow-xl transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-brand-blue/20">
              <Cpu size={24} />
            </div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">2-Qadam</span>
            <h4 className="text-lg font-semibold text-white mb-2">AI tahlili</h4>
            <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">Kategoriya aniqlanib, faktlar va qonuniy normalar chiqariladi.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center relative z-10 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-brand-blue flex items-center justify-center mb-6 shadow-xl transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-brand-blue/20">
              <Search size={24} />
            </div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">3-Qadam</span>
            <h4 className="text-lg font-semibold text-white mb-2">Smart moslash</h4>
            <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">Tahlil natijalariga asoslanib, eng mos advokatlar tavsiya etiladi.</p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center relative z-10 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-brand-blue flex items-center justify-center mb-6 shadow-xl transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-brand-blue/20">
              <CalendarCheck size={24} />
            </div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">4-Qadam</span>
            <h4 className="text-lg font-semibold text-white mb-2">Konsultatsiya</h4>
            <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">Onlayn yoki oflayn uchrashuvni rejalashtiring.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Texnologik Imkoniyatlarimiz</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">LegalTech yechimlarimiz orqali yuridik muammolaringizga tez va to‘liq javob toping.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
              <FileUp size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">AI hujjatlar tahlili</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Yuklangan hujjatlardagi muhim ma‘lumotlar va shartnoma shartlarini sekundlar ichida avtomatik o‘qib, tushunadi.
            </p>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
              <Cpu size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Kategoriya va Normativlarni aniqlash</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Muammoning tegishli qonuniy toifasini aniqlaydi va O‘zbekiston Respublikasi Kodekslarining mos moddalariga havola beradi.
            </p>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
              <Search size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Aqlli Advokat Mosligi</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Faqat yuridik tajriba emas, balki ish yuzasidan o‘xshash nizolarni muvaffaqiyatli yakunlagan advokatlarni tanlab beradi.
            </p>
          </GlassCard>

          {/* Card 4 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
              <Scale size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">AI Ish Xulosasi (Summary)</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Advokatlar bilan birinchi uchrashuv uchun barcha yuridik muammolaringizning tayyor strukturaviy konspektini shakllantiradi.
            </p>
          </GlassCard>

          {/* Card 5 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5">
              <CalendarCheck size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Uchrashuv rejalashtirish</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Advokatlarning bo‘sh ish vaqtlariga qarab video uchrashuvlar yoki oflayn uchrashuvlarni bevosita tizim orqali band qiling.
            </p>
          </GlassCard>

          {/* Card 6 */}
          <GlassCard className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Maxfiylik Kafolati</h4>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              Yuklangan barcha hujjatlar shifrlangan holda saqlanadi va advokatlar tasdiqlamaguncha begona shaxslarga ko‘rsatilmaydi.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <section id="lawyers" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Tajribali Advokatlarimiz</h2>
            <p className="text-slate-400 max-w-lg font-light">Tizimdagi barcha advokatlar O‘zbekiston Respublikasi Advokatlar palatasi litsenziyasiga ega.</p>
          </div>
          
          {/* Desktop Filter */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <GlassCard key={lawyer.id} className="flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={lawyer.avatar} 
                  alt={lawyer.name} 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10"
                />
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white truncate">{lawyer.name}</h4>
                  <p className="text-xs text-brand-blue font-medium mt-0.5">{lawyer.title}</p>
                  <div className="flex items-center text-amber-400 text-xs mt-1 gap-1">
                    <Star size={12} fill="currentColor" />
                    <span className="font-bold">{lawyer.rating}</span>
                    <span className="text-slate-500">({lawyer.reviewsCount} baho)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs flex-1">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Mutaxassislik:</span>
                  <span className="text-slate-200 font-medium">{lawyer.specialization}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Ish staji:</span>
                  <span className="text-slate-200 font-medium">{lawyer.experience} yil</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Tillar:</span>
                  <span className="text-slate-200 font-medium">{lawyer.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Konsultatsiya haqi:</span>
                  <span className="text-emerald-400 font-bold">100$ dan boshlab (bitta konsultatsiya)</span>
                </div>
              </div>

              <Button 
                variant="glass" 
                className="w-full text-xs py-2 rounded-xl mt-auto border-white/10 hover:bg-brand-blue hover:border-transparent hover:text-white"
                onClick={onFindLawyer}
              >
                Uchrashuv rejalashtirish
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Tizim haqida fikrlar</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">Fuqarolar va yuridik hamkorlarimiz YO‘RIQCHI platformasi haqida fikr bildirdilar.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((test) => (
            <GlassCard key={test.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center text-amber-400 gap-0.5 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm italic text-slate-300 leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-sm font-bold text-white">{test.name}</h5>
                  <p className="text-[11px] text-slate-400">{test.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <GlassCard className="bg-gradient-to-r from-brand-blue/30 via-indigo-950/20 to-purple-600/10 border border-brand-blue/20 rounded-3xl py-12 px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Qonuniy yordam topish murakkab bo‘lmasin.
          </h2>
          <p className="text-slate-300 max-w-xl font-light mb-8 text-base leading-relaxed">
            Hujjat yuklab, tizim ishini darhol sinab ko‘ring yoki professional advokatlarning shaxsiy profillari bilan tanishing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" onClick={onStartDemo}>
              AI Tahlilni Boshlash
            </Button>
            <Button variant="secondary" size="lg" onClick={onFindLawyer}>
              Barcha Advokatlar
            </Button>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/10 relative z-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <img src="/public/logo.png" alt="YO‘RIQCHI Logo" className="object-contain w-10 h-10" />
              <span className="font-bold text-white tracking-wider">YO‘RIQCHI</span>
            </div>
            <p className="text-slate-400">"Qonuniy yordam topish murakkab bo‘lmasin."</p>
          </div>
          <p className="text-[11px] text-slate-600">© 2026 YO‘RIQCHI LegalTech MVP. Hackathon uchun maxsus tayyorlandi. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

    </div>
  );
};
