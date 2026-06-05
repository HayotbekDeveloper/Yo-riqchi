import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Video, 
  Building, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Calendar } from '../components/UI/Calendar';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import type { Lawyer } from '../data/mockData';

interface BookingProps {
  lawyer: Lawyer | null;
  onBack: () => void;
  onBookingSuccess: (bookingDetails: {
    lawyer: Lawyer;
    date: Date;
    time: string;
    type: 'online' | 'offline';
  }) => void;
}

export const Booking: React.FC<BookingProps> = ({ 
  lawyer, 
  onBack, 
  onBookingSuccess 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 5, 4)); // Default June 4, 2026
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'online' | 'offline'>('online');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!lawyer) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-400">Iltimos, avval ro‘yxatdan advokat tanlang.</p>
        <Button variant="primary" onClick={onBack}>Qidiruv bo‘limiga qaytish</Button>
      </div>
    );
  }

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    setShowSuccessModal(true);
  };

  const handleConfirmSuccess = () => {
    setShowSuccessModal(false);
    onBookingSuccess({
      lawyer,
      date: selectedDate!,
      time: selectedTime,
      type: meetingType
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanlanmagan';
    const day = date.getDate();
    return `${day}-iyun, 2026-yil`; // Hardcoded June 2026 for hackathon UI consistency
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Back navigation */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Advokat profiliga qaytish
      </button>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Calendar and Time Slot picker */}
        <div className="md:col-span-8 space-y-8">
          
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Calendar */}
            <GlassCard hoverEffect={false} className="p-5 bg-white/[0.01]">
              <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
            </GlassCard>

            {/* Time Slot Picker */}
            <GlassCard hoverEffect={false} className="p-5 flex flex-col justify-between bg-white/[0.01]">
              <div>
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-brand-blue" />
                  Mavjud vaqtlar
                </h4>
                
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {lawyer.availability.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3.5 px-4 rounded-xl text-xs font-bold transition-all ${
                          selectedTime === time
                            ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-102'
                            : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 hover:border-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-8 text-center">Bo‘sh vaqtlarni ko‘rish uchun avval sanani tanlang.</p>
                )}
              </div>

              {selectedDate && (
                <div className="text-[10px] text-slate-400 mt-4 border-t border-white/5 pt-3">
                  Tanlangan sana: <span className="text-slate-200 font-bold">{formatDate(selectedDate)}</span>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Meeting Type Selection */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">Uchrashuv formati</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Online option */}
              <div 
                onClick={() => setMeetingType('online')}
                className={`p-4 rounded-2xl border cursor-pointer text-left transition-all flex gap-3.5 items-center ${
                  meetingType === 'online'
                    ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${meetingType === 'online' ? 'bg-brand-blue text-white' : 'bg-white/5 text-slate-400'}`}>
                  <Video size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white">Video Konsultatsiya</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Onlayn veb-xona orqali</p>
                </div>
              </div>

              {/* Offline option */}
              <div 
                onClick={() => setMeetingType('offline')}
                className={`p-4 rounded-2xl border cursor-pointer text-left transition-all flex gap-3.5 items-center ${
                  meetingType === 'offline'
                    ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${meetingType === 'offline' ? 'bg-brand-blue text-white' : 'bg-white/5 text-slate-400'}`}>
                  <Building size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white">Ofisda uchrashuv</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Yuzma-yuz suhbat, Toshkent sh.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Summary Card */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-lg font-bold text-white tracking-wide">Uchrashuv tafsilotlari</h4>
          <GlassCard hoverEffect={false} className="p-5 space-y-6 bg-white/[0.02]">
            
            {/* Lawyer Info */}
            <div className="flex items-center gap-3">
              <img 
                src={lawyer.avatar} 
                alt={lawyer.name} 
                className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10"
              />
              <div>
                <h5 className="font-bold text-xs text-white">{lawyer.name}</h5>
                <p className="text-[10px] text-brand-blue font-semibold">{lawyer.specialization}</p>
              </div>
            </div>

            {/* Selected details checklist */}
            <div className="space-y-3.5 text-xs text-slate-300 border-t border-b border-white/5 py-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Sana:</span>
                <span className="font-bold text-white">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vaqt:</span>
                <span className="font-bold text-white">{selectedTime || 'Tanlanmagan'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-bold text-white">
                  {meetingType === 'online' ? 'Onlayn (Video)' : 'Oflayn (Ofis)'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-white/10">
                <span className="text-slate-500">Konsultatsiya haqi:</span>
                <span className="font-black text-emerald-400">100$ dan boshlab</span>
              </div>
            </div>

            {/* Complete checkout button */}
            <Button
              variant="primary"
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className="w-full py-3 shadow-lg"
            >
              Uchrashuvni tasdiqlash
            </Button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
              <AlertCircle size={12} />
              <span>To‘lov bevosita uchrashuvdan so‘ng amalga oshiriladi.</span>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Success Animated Confirmation Modal */}
      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        title="Uchrashuv tasdiqlandi"
      >
        <div className="text-center py-6 space-y-6">
          {/* Animated check circle */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle size={36} className="animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-white">Muvaffaqiyatli rejalashtirildi!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Advokat {lawyer.name} bilan konsultatsiya belgilandi. Tafsilotlar profilingizga va xat ko‘rinishida pochtangizga yuborildi.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="glass-panel border-white/5 rounded-2xl p-4 text-xs text-slate-300 max-w-sm mx-auto text-left space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Advokat:</span>
              <span className="font-semibold text-white">{lawyer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sana va vaqt:</span>
              <span className="font-semibold text-white">{formatDate(selectedDate)} ({selectedTime})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Uchrashuv formati:</span>
              <span className="font-semibold text-white">{meetingType === 'online' ? 'Onlayn (Video Maslahat)' : 'Oflayn (Ofisda uchrashuv)'}</span>
            </div>
          </div>

          <Button variant="primary" onClick={handleConfirmSuccess} className="w-full max-w-xs py-3 mt-4">
            Boshqaruv paneliga qaytish
          </Button>
        </div>
      </Modal>

    </div>
  );
};
