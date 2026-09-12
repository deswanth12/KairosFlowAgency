'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

interface StudioClockProps {
  compact?: boolean;
}

export const StudioClock: React.FC<StudioClockProps> = ({ compact = false }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isActiveHours, setIsActiveHours] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setTimeStr(formatter.format(now));

        // Calculate hour in IST (UTC+5:30)
        const utcHours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const istTotalMinutes = (utcHours * 60 + utcMinutes + 330) % 1440;
        const istHour = Math.floor(istTotalMinutes / 60);

        // Active between 9:00 AM and 9:00 PM IST
        setIsActiveHours(istHour >= 9 && istHour < 21);
      } catch {
        setTimeStr('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#5B6875]">
        <span className={`w-1.5 h-1.5 rounded-full ${isActiveHours ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        <span>Tirupati {timeStr} IST</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-[#D9E0E5] font-mono text-[11px] text-[#0B1F33] shadow-xs">
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3 text-[#B8613A]" />
        <span className="font-semibold">Tirupati, AP</span>
      </div>
      <span className="text-[#D9E0E5]">•</span>
      <div className="flex items-center gap-1.5 text-[#5B6875]">
        <Clock className="w-3 h-3 text-[#5B6875]" />
        <span>{timeStr} IST</span>
      </div>
      <span className="text-[#D9E0E5]">•</span>
      <div className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isActiveHours ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        <span className="text-[10px] font-semibold text-[#0B1F33]">
          {isActiveHours ? 'Active Now' : 'On Call (<15m)'}
        </span>
      </div>
    </div>
  );
};
