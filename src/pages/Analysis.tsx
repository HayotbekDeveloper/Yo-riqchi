import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/UI/Button';
import type { MockDocument } from '../data/mockData';

interface AnalysisProps {
  documentData: MockDocument | null;
  onFindLawyer: () => void;
  onResetUpload: () => void;
}

export const Analysis: React.FC<AnalysisProps> = ({ 
  documentData, 
  onFindLawyer,
  onResetUpload
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanStep, setScanStep] = useState(0);
  const [checklist, setChecklist] = useState<any[]>([]);

  // Simulation steps for scanning loader
  const scanningSteps = [
    "Hujjat strukturasi o‘qilmoqda (OCR)...",
    "Muhim shaxslar va tomonlar aniqlanmoqda...",
    "Qonuniy kategoriya tahlil qilinmoqda...",
    "Normativ-huquqiy moddalar solishtirilmoqda...",
    "AI Xulosa hisoboti tayyorlanmoqda..."
  ];

  // Set up scanning timer
  useEffect(() => {
    if (documentData) {
      setIsScanning(true);
      setScanStep(0);
      setChecklist(documentData.analysis.missingDocs);

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep += 1;
        if (currentStep < scanningSteps.length) {
          setScanStep(currentStep);
        } else {
          clearInterval(interval);
          setIsScanning(false);
        }
      }, 700);

      return () => clearInterval(interval);
    } else {
      setIsScanning(false);
    }
  }, [documentData]);

  if (!documentData) {
    return (
      <div className="text-center py-16 space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center mx-auto">
          <FileText size={28} />
        </div>
        <h4 className="text-lg font-bold text-white">Tahlil uchun hujjat topilmadi</h4>
        <p className="text-sm text-slate-400">Iltimos, avval boshqaruv paneli yoki hujjat yuklash bo‘limiga o‘tib yuridik hujjat yuklang.</p>
        <Button variant="primary" onClick={onResetUpload}>Hujjat yuklash bo‘limiga o‘tish</Button>
      </div>
    );
  }

  const analysis = documentData.analysis;

  const handleToggleDocStatus = (index: number) => {
    const updated = [...checklist];
    const currentStatus = updated[index].status;
    if (currentStatus === 'present') {
      updated[index].status = 'missing';
    } else if (currentStatus === 'missing') {
      updated[index].status = 'warning';
    } else {
      updated[index].status = 'present';
    }
    setChecklist(updated);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {isScanning ? (
          /* Scanning Screen */
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-xl mx-auto py-12"
          >
            {/* Radar / Scanning Visualizer */}
            <div className="w-32 h-32 rounded-full border border-brand-blue/30 flex items-center justify-center relative mb-10 overflow-hidden bg-brand-blue/5 glow-pulse">
              <Cpu size={42} className="text-brand-blue animate-pulse-slow" />
              {/* Scanning rotating animation element */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-blue/10 to-brand-blue/30 w-full h-1/2 top-0 origin-bottom animate-spin-slow pointer-events-none" 
                   style={{ animationDuration: '3s' }} />
            </div>

            <div className="space-y-4 w-full">
              <h3 className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
                <Sparkles className="text-brand-blue animate-pulse" size={20} />
                AI Hujjatni tahlil qilmoqda...
              </h3>
              <p className="text-xs text-slate-400 truncate font-mono max-w-sm mx-auto">{documentData.name}</p>

              {/* Progress Log Timeline */}
              <div className="mt-8 space-y-3 bg-white/5 border border-white/10 rounded-2xl p-5 text-left text-xs text-slate-300">
                {scanningSteps.map((step, idx) => {
                  const isDone = idx < scanStep;
                  const isCurrent = idx === scanStep;
                  return (
                    <div key={idx} className="flex items-center gap-3 transition-opacity">
                      {isDone ? (
                        <CheckCircle size={14} className="text-emerald-400" />
                      ) : isCurrent ? (
                        <RefreshCw size={14} className="text-brand-blue animate-spin" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                      )}
                      <span className={`${isDone ? 'text-slate-400 line-through' : isCurrent ? 'text-brand-blue font-semibold' : 'text-slate-500'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Analysis Results Panel */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 text-left"
          >
            {/* Top Analysis Hero */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/15 px-3 py-1 rounded-full">Tahlil hisoboti</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-3 truncate max-w-md">{documentData.name}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">Tahlil vaqti: 2026-06-04</p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={onResetUpload} leftIcon={<RefreshCw size={14} />}>
                  Qayta yuklash
                </Button>
                <Button variant="primary" onClick={onFindLawyer} rightIcon={<ArrowRight size={14} />}>
                  Advokat topish
                </Button>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Left Column: Legal Category Confidence & Summary */}
              <div className="md:col-span-8 space-y-8">
                
                {/* Category Card with Circular Confidence */}
                <div className="grid sm:grid-cols-3 gap-5">
                  <GlassCard hoverEffect={false} className="sm:col-span-2 flex flex-col justify-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Aniqlangan Kategoriya</span>
                    <h4 className="text-2xl font-extrabold text-white mt-2">{analysis.category}</h4>
                    <p className="text-xs text-slate-400 mt-2">
                      Fayldagi leksika, shartnoma shartlari va qonuniy havolalar asosida tasniflandi.
                    </p>
                  </GlassCard>
                  
                  {/* Gauge Ring */}
                  <GlassCard hoverEffect={false} className="flex flex-col items-center justify-center p-5 text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                      {/* Circle Background SVG */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" className="stroke-white/5 fill-none" strokeWidth="6" />
                        <circle cx="40" cy="40" r="34" className="stroke-brand-blue fill-none transition-all duration-1000" 
                                strokeWidth="6" 
                                strokeDasharray={213} 
                                strokeDashoffset={213 - (213 * analysis.confidence) / 100}
                                strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-base font-extrabold text-white">{analysis.confidence}%</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Ishonch koeffitsiyenti</span>
                  </GlassCard>
                </div>

                {/* AI Summary Report layout */}
                <GlassCard hoverEffect={false} className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Cpu className="text-brand-blue" size={18} />
                    <h4 className="font-bold text-base text-white">AI Huquqiy Xulosa</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {analysis.summary}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-brand-blue bg-brand-blue/5 border border-brand-blue/10 rounded-lg p-2.5 mt-2">
                    <Info size={14} className="shrink-0" />
                    <span>Ushbu xulosa tahliliy ma‘lumot bo‘lib, to‘liq qonuniy maslahat o‘rnini bosmaydi. Professional advokat bilan uchrashish tavsiya etiladi.</span>
                  </div>
                </GlassCard>

                {/* Extracted Facts */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white tracking-wide">Hujjatdan aniqlangan faktlar</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {analysis.facts.map((fact, i) => (
                      <GlassCard key={i} hoverEffect={false} className="p-4 bg-white/[0.01] border-white/5">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">{fact.label}</span>
                        <span className="text-sm font-bold text-slate-200 mt-1 block">{fact.value}</span>
                      </GlassCard>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Missing Documents Checklist & Suggested Steps */}
              <div className="md:col-span-4 space-y-8">
                
                {/* Missing Documents Checklist */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white tracking-wide">Hujjatlar nazorat ro‘yxati</h4>
                  <GlassCard hoverEffect={false} className="p-5 space-y-4 bg-white/[0.02]">
                    <p className="text-xs text-slate-400 mb-2">Yuklanishi shart bo‘lgan hujjatlar ro‘yxati. Holatni o‘zgartirish uchun bosing:</p>
                    <div className="space-y-3">
                      {checklist.map((doc, idx) => {
                        const isPresent = doc.status === 'present';
                        const isWarning = doc.status === 'warning';
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleToggleDocStatus(idx)}
                            className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                          >
                            <div className="mt-0.5 shrink-0">
                              {isPresent ? (
                                <CheckCircle size={16} className="text-emerald-400" />
                              ) : isWarning ? (
                                <AlertTriangle size={16} className="text-amber-500 animate-pulse" />
                              ) : (
                                <AlertTriangle size={16} className="text-rose-500" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-xs font-semibold leading-snug truncate ${isPresent ? 'text-slate-300' : isWarning ? 'text-amber-400' : 'text-rose-400'}`}>
                                {doc.name}
                              </p>
                              <span className="text-[9px] text-slate-500 uppercase font-medium tracking-wide">
                                {isPresent ? '✓ Mavjud' : isWarning ? '⚠ Qisman yuklangan' : '✗ Yetishmayapti'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </div>

                {/* Suggested Next Steps */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white tracking-wide">Tavsiya etilgan qadamlar</h4>
                  <div className="relative pl-4 space-y-5 border-l border-white/10">
                    {analysis.nextSteps.map((step) => (
                      <div key={step.step} className="relative text-left">
                        {/* Bullet */}
                        <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-brand-navy border border-brand-blue text-[9px] font-bold text-brand-blue flex items-center justify-center">
                          {step.step}
                        </span>
                        
                        <h5 className="font-bold text-xs text-white">{step.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
