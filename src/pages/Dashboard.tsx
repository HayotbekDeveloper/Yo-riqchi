import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Cpu, 
  Users, 
  ArrowUpRight, 
  Clock, 
  UploadCloud, 
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import { MOCK_ACTIVITIES } from '../data/mockData';

interface DashboardProps {
  setView: (view: string) => void;
  activeRequestsCount: number;
  consultationsCount: number;
  aiAnalysesCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  setView,
  activeRequestsCount,
  consultationsCount,
  aiAnalysesCount
}) => {
  
  const stats = [
    {
      label: 'Faol so‘rovlar',
      value: activeRequestsCount,
      change: 'Hozirgi vaqtda',
      icon: FileText,
      color: 'text-blue-400 bg-blue-500/10'
    },
    {
      label: 'Tashkil etilgan uchrashuvlar',
      value: consultationsCount,
      change: '+1 yaqin kunlarda',
      icon: CheckCircle,
      color: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      label: 'AI Ish Tahlillari',
      value: aiAnalysesCount,
      change: '100% yakunlandi',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10'
    },
    {
      label: 'Tavsiya etilgan advokatlar',
      value: 5,
      change: 'Yuqori aniqlik',
      icon: Users,
      color: 'text-amber-400 bg-amber-500/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="space-y-2 relative z-10 text-left">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Xush kelibsiz, Sardor Bekmurodov!</h3>
          <p className="text-sm text-slate-300 max-w-xl font-light leading-relaxed">
            Hujjatlaringizni tahlil qiling va qonuniy masalalaringizni hal qilish uchun O‘zbekistondagi eng yaxshi advokatlar bilan bog‘laning.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setView('upload')}
          className="relative z-10 w-full md:w-auto shadow-lg"
          leftIcon={<UploadCloud size={16} />}
        >
          Yangi hujjat yuklash
        </Button>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} hoverEffect={false} delay={i * 0.05}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h4 className="text-3xl font-extrabold text-white mt-2">{stat.value}</h4>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-slate-400 gap-1.5 border-t border-white/5 pt-3">
                <Clock size={12} className="text-slate-500" />
                <span>{stat.change}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Grid: Activity and Actions */}
      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Recent Activity Timeline */}
        <div className="md:col-span-8 space-y-4">
          <h4 className="text-lg font-bold text-white tracking-wide">Oxirgi harakatlar</h4>
          <GlassCard hoverEffect={false} className="p-6 md:p-8 space-y-6">
            <div className="relative pl-6 space-y-6 border-l border-white/10">
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-brand-blue ring-4 ring-brand-navy" />
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-1.5">
                    <h5 className="font-bold text-sm text-slate-200">{act.title}</h5>
                    <span className="text-[10px] text-slate-500 font-medium">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{act.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions Panel */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-lg font-bold text-white tracking-wide">Tezkor amallar</h4>
          <div className="space-y-4">
            {/* Quick action 1 */}
            <GlassCard onClick={() => setView('upload')} className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <UploadCloud size={20} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h5 className="font-bold text-sm text-white flex items-center justify-between">
                  Hujjat Tahlili <ArrowUpRight size={14} className="text-slate-500" />
                </h5>
                <p className="text-[11px] text-slate-400 mt-1">Shartnoma va da‘volarni AI orqali tekshirish.</p>
              </div>
            </GlassCard>

            {/* Quick action 2 */}
            <GlassCard onClick={() => setView('discovery')} className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Users size={20} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h5 className="font-bold text-sm text-white flex items-center justify-between">
                  Advokat Izlash <ArrowUpRight size={14} className="text-slate-500" />
                </h5>
                <p className="text-[11px] text-slate-400 mt-1">Litsenziyalangan mutaxassislarni topish va band qilish.</p>
              </div>
            </GlassCard>

            {/* Quick info status */}
            <div className="glass-panel border-white/5 bg-white/[0.01] rounded-2xl p-5 border text-left">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <ShieldCheck size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Tizim holati</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tizim O‘zbekiston Respublikasi qonunchiligi asosida moslashtirilgan bo‘lib, ma‘lumotlar to‘liq maxfiy saqlanadi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
