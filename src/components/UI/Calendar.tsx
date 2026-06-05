import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onChange }) => {
  // We lock the calendar to June 2026 for the hackathon demo to match local metadata (June 2026)
  const year = 2026;
  const month = 5; // 0-indexed, so 5 is June
  const monthName = "Iyun";

  const weekdays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  
  // June 1, 2026 is a Monday. June has 30 days.
  const totalDays = 30;
  const startDayOffset = 0; // Monday is index 0

  const daysArray: (number | null)[] = [];
  // Add empty slots before Monday
  for (let i = 0; i < startDayOffset; i++) {
    daysArray.push(null);
  }
  // Add days of June
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  const isToday = (day: number) => {
    return day === 4; // Mock today as June 4, 2026
  };

  const isPast = (day: number) => {
    return day < 4; // Past days are before June 4, 2026
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const handleDayClick = (day: number) => {
    if (isPast(day)) return; // Disable past dates
    const date = new Date(year, month, day);
    onChange(date);
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-white">
          {monthName} {year}
        </h4>
        <div className="flex gap-2">
          <button disabled className="p-2 rounded-xl bg-white/5 text-slate-500 cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
          <button disabled className="p-2 rounded-xl bg-white/5 text-slate-500 cursor-not-allowed">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekdays.map((wd, i) => (
          <span key={i} className="text-xs font-medium text-slate-400 py-1">
            {wd}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {daysArray.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} />;
          }

          const past = isPast(day);
          const active = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={`day-${day}`}
              onClick={() => handleDayClick(day)}
              disabled={past}
              className={`h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all relative ${
                past
                  ? 'text-slate-600 cursor-not-allowed bg-transparent'
                  : active
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105'
                  : 'hover:bg-white/10 text-slate-200'
              } ${today && !active ? 'border border-brand-blue text-brand-blue' : ''}`}
            >
              {day}
              {today && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${active ? 'bg-white' : 'bg-brand-blue'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
