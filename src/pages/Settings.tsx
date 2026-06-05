import React, { useState } from 'react';
import { User, Bell, Globe, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';

export const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Sardor Bekmurodov',
    email: 'sardor@law.uz',
    phone: '+998 90 987 65 43'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    aiAlerts: true
  });

  const [lang, setLang] = useState('uz');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <h4 className="text-lg font-bold text-white tracking-wide">Tizim sozlamalari</h4>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <GlassCard hoverEffect={false} className="p-6 space-y-4 bg-white/[0.01]">
          <h5 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
            <User size={16} className="text-brand-blue" />
            Shaxsiy profil ma‘lumotlari
          </h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold">Ism va Familiya</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full glass-input text-xs" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold">Telefon raqam</label>
              <input 
                type="text" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full glass-input text-xs" 
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-slate-400 font-semibold">Elektron pochta</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full glass-input text-xs" 
              />
            </div>
          </div>
        </GlassCard>

        {/* Notifications & Language */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Notifications */}
          <GlassCard hoverEffect={false} className="p-6 space-y-4 bg-white/[0.01]">
            <h5 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Bell size={16} className="text-brand-blue" />
              Bildirishnomalar sozlamasi
            </h5>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Email xabarnomalar</span>
                <input 
                  type="checkbox" 
                  checked={notifications.email} 
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-4 h-4 rounded accent-brand-blue bg-white/5 border-white/10" 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">SMS xabarnomalar</span>
                <input 
                  type="checkbox" 
                  checked={notifications.sms} 
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="w-4 h-4 rounded accent-brand-blue bg-white/5 border-white/10" 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">AI Tahlil yakunlanganda ogohlantirish</span>
                <input 
                  type="checkbox" 
                  checked={notifications.aiAlerts} 
                  onChange={(e) => setNotifications({...notifications, aiAlerts: e.target.checked})}
                  className="w-4 h-4 rounded accent-brand-blue bg-white/5 border-white/10" 
                />
              </div>
            </div>
          </GlassCard>

          {/* Language */}
          <GlassCard hoverEffect={false} className="p-6 space-y-4 bg-white/[0.01]">
            <h5 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Globe size={16} className="text-brand-blue" />
              Tizim tili (Language)
            </h5>
            <div className="space-y-2.5">
              <button 
                type="button" 
                onClick={() => setLang('uz')}
                className={`w-full flex items-center justify-between text-xs p-2.5 rounded-xl border transition-all ${
                  lang === 'uz' ? 'bg-brand-blue/10 border-brand-blue font-bold text-white' : 'border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span>O‘zbekcha</span>
                {lang === 'uz' && <Check size={14} className="text-brand-blue" />}
              </button>
              <button 
                type="button" 
                onClick={() => setLang('ru')}
                className={`w-full flex items-center justify-between text-xs p-2.5 rounded-xl border transition-all ${
                  lang === 'ru' ? 'bg-brand-blue/10 border-brand-blue font-bold text-white' : 'border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span>Русский</span>
                {lang === 'ru' && <Check size={14} className="text-brand-blue" />}
              </button>
              <button 
                type="button" 
                onClick={() => setLang('en')}
                className={`w-full flex items-center justify-between text-xs p-2.5 rounded-xl border transition-all ${
                  lang === 'en' ? 'bg-brand-blue/10 border-brand-blue font-bold text-white' : 'border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span>English</span>
                {lang === 'en' && <Check size={14} className="text-brand-blue" />}
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3">
          {isSaved && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-pulse self-center">
              ✓ Sozlamalar muvaffaqiyatli saqlandi!
            </span>
          )}
          <Button variant="primary" type="submit" className="px-8">
            Saqlash
          </Button>
        </div>

      </form>
    </div>
  );
};
