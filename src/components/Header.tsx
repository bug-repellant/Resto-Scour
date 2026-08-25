import React from 'react';
import { Compass, Sparkles, Beer, ShieldCheck, MapPin, MessageSquare, Tag } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenCompare: () => void;
  compareCount: number;
  locationName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInquiry,
  onOpenCompare,
  compareCount,
  locationName,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 flex items-center justify-center shadow-inner">
              <Beer className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-100">
                  Pub & Dining <span className="text-amber-400">Scour</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Multi-Source Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="text-slate-300 font-medium truncate max-w-[280px] sm:max-w-md">
                  {locationName}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Distance-Sorted & Reddit Scoured</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-sm"
              >
                <span>Compare</span>
                <span className="w-5 h-5 rounded-full bg-white text-indigo-700 text-xs font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              </button>
            )}

            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition shadow-sm hover:shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Ask AI Food Scout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
