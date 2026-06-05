import React from 'react';
import { Calendar, Clock, Video, Building, ExternalLink, CalendarDays, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import type { Lawyer } from '../data/mockData';

export interface ConsultationItem {
  id: string;
  lawyer: Lawyer;
  date: Date;
  time: string;
  type: 'online' | 'offline';
  status: 'active' | 'completed' | 'cancelled';
}

interface ConsultationsProps {
  consultations: ConsultationItem[];
  setView: (view: string) => void;
}

export const Consultations: React.FC<ConsultationsProps> = ({ consultations, setView }) => {
  
  const formatDate = (date: Date) => {
    const day = date.getDate();
    return `${day}-iyun, 2026-yil`;
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold text-white tracking-wide">Mening uchrashuvlarim</h4>
        <Button variant="glass" size="sm" onClick={() => setView('discovery')} leftIcon={<CalendarDays size={14} />}>
          Yangi uchrashuv
        </Button>
      </div>

      {consultations.length > 0 ? (
        <div className="space-y-4">
          {consultations.map((item) => (
            <GlassCard key={item.id} hoverEffect={false} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white/[0.02] border-white/5">
              <div className="flex items-center gap-4">
                <img 
                  src={item.lawyer.avatar} 
                  alt={item.lawyer.name} 
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div className="space-y-1 min-w-0">
                  <h5 className="font-bold text-sm text-white truncate">{item.lawyer.name}</h5>
                  <p className="text-xs text-brand-blue font-semibold">{item.lawyer.specialization}</p>
                </div>
              </div>

              {/* Date & Time info */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-500" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-500" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.type === 'online' ? (
                    <>
                      <Video size={14} className="text-blue-400" />
                      <span className="text-blue-400">Onlayn (Video Call)</span>
                    </>
                  ) : (
                    <>
                      <Building size={14} className="text-purple-400" />
                      <span className="text-purple-400">Oflayn (Ofis uchrashuvi)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Badge & Room Access */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold uppercase">
                  Tasdiqlangan
                </span>
                
                {item.type === 'online' && (
                  <Button variant="primary" size="sm" className="text-xs py-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
                    Xonaga kirish <ExternalLink size={12} className="ml-1" />
                  </Button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        /* Empty State */
        <GlassCard hoverEffect={false} className="p-12 text-center text-slate-400 space-y-5 bg-white/[0.01]">
          <div className="w-14 h-14 rounded-full bg-white/5 text-slate-500 flex items-center justify-center mx-auto">
            <CalendarDays size={24} />
          </div>
          <div className="space-y-1.5">
            <h5 className="font-bold text-base text-white">Faol uchrashuvlar topilmadi</h5>
            <p className="text-xs max-w-sm mx-auto leading-relaxed">Sizda hali birorta rejalashtirilgan konsultatsiya mavjud emas. Advokat qidirish bo‘limi orqali mutaxassislar bilan uchrashuv belgilashingiz mumkin.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setView('discovery')} rightIcon={<ArrowRight size={12} />}>
            Advokat topish
          </Button>
        </GlassCard>
      )}
    </div>
  );
};
