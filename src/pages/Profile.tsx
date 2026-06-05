import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Award, 
  BookOpen, 
  Video, 
  Building, 
  PhoneCall, 
  CalendarCheck,
  CheckCircle,
  ThumbsUp
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import type { Lawyer } from '../data/mockData';

interface ProfileProps {
  lawyer: Lawyer | null;
  onBack: () => void;
  onBook: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ lawyer, onBack, onBook }) => {
  const [selectedOption, setSelectedOption] = useState<'video' | 'office' | 'phone'>('video');

  if (!lawyer) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-400">Iltimos, avval ro‘yxatdan advokat tanlang.</p>
        <Button variant="primary" onClick={onBack}>Advokatlar ro‘yxatiga qaytish</Button>
      </div>
    );
  }

  const consultOptions = [
    {
      id: 'video' as const,
      title: 'Video Maslahat',
      desc: 'Tizim ichidagi xavfsiz xonada onlayn bog‘lanish',
      icon: Video,
      badge: 'Onlayn'
    },
    {
      id: 'office' as const,
      title: 'Ofisda Uchrashuv',
      desc: 'Advokatning ish ofisida yuzma-yuz suhbat',
      icon: Building,
      badge: 'Oflayn'
    },
    {
      id: 'phone' as const,
      title: 'Telefon muloqot',
      desc: 'Ko‘rsatilgan raqam orqali to‘g‘ridan-to‘g‘ri telefon qo‘ng‘irog‘i',
      icon: PhoneCall,
      badge: 'Qo‘ng‘iroq'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Advokatlar ro‘yxatiga qaytish
      </button>

      {/* Main Profile Header Card */}
      <GlassCard hoverEffect={false} className="p-6 md:p-8 bg-white/[0.02]">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar and Rating */}
          <div className="w-full md:w-44 text-center shrink-0 flex flex-col items-center">
            <img 
              src={lawyer.avatar} 
              alt={lawyer.name} 
              className="w-24 h-24 md:w-36 md:h-36 rounded-3xl object-cover ring-4 ring-white/10"
            />
            <div className="mt-4">
              <div className="flex items-center justify-center text-amber-400 text-lg gap-1.5 font-extrabold">
                <Star size={18} fill="currentColor" />
                <span>{lawyer.rating}</span>
              </div>
              <span className="text-xs text-slate-500">{lawyer.reviewsCount} ta sharh olingan</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">{lawyer.name}</h3>
              <p className="text-sm text-brand-blue font-semibold mt-1">{lawyer.title}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-500" />
                {lawyer.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-slate-500" />
                Tajriba: {lawyer.experience} yil
              </span>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed pt-2">
              {lawyer.about}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {lawyer.languages.map((lang, idx) => (
                <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="w-full md:w-60 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6 space-y-4 shrink-0 flex flex-col justify-between h-full min-h-[160px]">
            <div>
              <span className="text-xs text-slate-400">Konsultatsiya haqi:</span>
              <h4 className="text-2xl font-black text-emerald-400 mt-1">100$ dan boshlab <span className="text-xs text-slate-500 font-normal">(bitta konsultatsiya)</span></h4>
              <p className="text-[10px] text-slate-500 mt-1">Dastlabki 15-daqiqa bepul konsultatsiya</p>
            </div>
            
            <Button 
              variant="primary" 
              onClick={onBook} 
              className="w-full py-3"
              leftIcon={<CalendarCheck size={16} />}
            >
              Uchrashuv belgilash
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Grid: Credentials & Consultation Options */}
      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Left Col: Details & Timeline */}
        <div className="md:col-span-7 space-y-8">
          {/* Biography & Education */}
          <GlassCard hoverEffect={false} className="p-6 md:p-8 space-y-6">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-white/5 pb-3">Ma‘lumoti va Tajribasi</h4>
            
            <div className="space-y-6">
              {/* Education */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-blue" />
                  O‘quv yurtlari
                </h5>
                <ul className="space-y-2 pl-6 list-disc text-xs text-slate-300 leading-relaxed font-light">
                  {lawyer.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>

              {/* Specializations */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                  <Award size={16} className="text-brand-blue" />
                  Maxsus yo‘nalishlar
                </h5>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-slate-300 font-medium">
                    Shartnomalarni tahrirlash
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-slate-300 font-medium">
                    Sudda himoya qilish
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-slate-300 font-medium">
                    Mediativ kelishuv
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* User Reviews */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide">Mijozlar tomonidan qoldirilgan sharhlar</h4>
            <div className="space-y-4">
              {lawyer.reviews.map((rev) => (
                <GlassCard key={rev.id} hoverEffect={false} className="p-5 bg-white/[0.01]">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-xs">
                        {rev.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">{rev.author}</h5>
                        <p className="text-[10px] text-slate-500">{rev.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end text-amber-400 text-xs gap-0.5 font-bold">
                        <Star size={11} fill="currentColor" />
                        <span>{rev.rating}</span>
                      </div>
                      <span className="text-[9px] text-slate-600 block mt-0.5">{rev.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed font-light">
                    "{rev.text}"
                  </p>
                  
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                    <ThumbsUp size={11} />
                    <span>Foydali deb topildi</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Formats */}
        <div className="md:col-span-5 space-y-6">
          <h4 className="text-lg font-bold text-white tracking-wide">Konsultatsiya turlari</h4>
          <div className="space-y-4">
            {consultOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedOption === opt.id;
              return (
                <div 
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`p-4 rounded-2xl text-left border cursor-pointer transition-all flex gap-4 ${
                    isSelected 
                      ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10 scale-[1.01]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-brand-blue text-white' : 'bg-white/5 text-slate-300'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-sm text-white">{opt.title}</h5>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                        opt.badge === 'Onlayn' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : opt.badge === 'Oflayn' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>{opt.badge}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel border-white/5 bg-white/[0.01] rounded-2xl p-5 border text-left space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-400" />
              Kafolatlangan xizmatlar
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>• Advokatlik siri to‘liq saqlanishi</li>
              <li>• Uchrashuv oldidan AI tahliliy konspekti</li>
              <li>• Istalgan vaqtda konsultatsiyani boshqa kunga ko‘chirish</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
