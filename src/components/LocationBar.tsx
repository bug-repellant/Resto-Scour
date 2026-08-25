import React, { useState } from 'react';
import { Search, MapPin, Navigation, Sparkles, Flame, MessageSquare, RefreshCw } from 'lucide-react';
import { CategoryType, SearchFilters } from '../types';

interface LocationBarProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
  onRunScour: () => void;
  isLoading: boolean;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Microbrewery',
  'Pub',
  'Restobar',
  'Taproom',
  'Rooftop Lounge',
  'Sports Bar',
  'Cafe & Bar',
  'Casual Dining',
];

const POPULAR_INDIAN_PRESETS = [
  "Indiranagar 100ft Road, Bengaluru",
  "Koramangala 5th Block, Bengaluru",
  "Church Street & MG Road, Bengaluru",
  "Connaught Place (CP), New Delhi",
  "Cyber Hub, DLF Phase 2, Gurugram",
  "Hauz Khas Village (HKV), New Delhi",
  "Bandra West (Pali Hill), Mumbai",
  "Lower Parel (Kamala Mills), Mumbai",
  "Jubilee Hills Road 36, Hyderabad",
  "Koregaon Park (KP), Pune",
  "Park Street, Kolkata",
  "Besant Nagar & Nungambakkam, Chennai"
];

export const LocationBar: React.FC<LocationBarProps> = ({
  filters,
  onFilterChange,
  onRunScour,
  isLoading,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onFilterChange({
          ...filters,
          lat: latitude,
          lng: longitude,
          locationName: `GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
        });
        setIsLocating(false);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        alert("Unable to retrieve your GPS location. Please select a city/neighborhood or enter it manually.");
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handlePriceToggle = (price: string) => {
    const currentPrices = filters.priceLevels;
    const newPrices = currentPrices.includes(price)
      ? currentPrices.filter(p => p !== price)
      : [...currentPrices, price];
    onFilterChange({ ...filters, priceLevels: newPrices });
  };

  return (
    <div className="bg-slate-800/90 border-b border-slate-700/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Row 1: Location & Search Input + GPS + Scour Button */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          
          {/* Location Input */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-amber-400 pointer-events-none" />
              <input
                type="text"
                value={filters.locationName}
                onChange={(e) => onFilterChange({ ...filters, locationName: e.target.value })}
                onFocus={() => setShowPresets(true)}
                onBlur={() => setTimeout(() => setShowPresets(false), 250)}
                placeholder="Enter Indian city, neighborhood, or landmark (e.g. Indiranagar, Bandra, CP)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-24 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner"
              />
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="absolute right-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-amber-300 font-medium flex items-center gap-1 transition"
                title="Use GPS location"
              >
                <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'GPS'}</span>
              </button>
            </div>

            {/* Popular Presets Dropdown */}
            {showPresets && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-40 p-2 text-xs">
                <div className="text-slate-400 font-semibold px-2 py-1 uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span>Popular Indian Hotspots</span>
                  <span className="text-amber-400 font-mono text-[9px]">Select to Autofill</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                  {POPULAR_INDIAN_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevents blur before click
                        onFilterChange({ ...filters, locationName: preset, lat: null, lng: null });
                        setShowPresets(false);
                      }}
                      className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-300 transition flex items-center gap-1.5"
                    >
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{preset}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Specific Keyword Query Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
              placeholder="Search dishes, drinks or deals (e.g. Craft Beer, Hefeweizen, Ghee Roast, 1+1, Biryani)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner"
            />
          </div>

          {/* Main Action: Run AI Scour */}
          <button
            onClick={onRunScour}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Scouring Reddit & Menus...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Scour Near Me</span>
              </>
            )}
          </button>
        </div>

        {/* Row 2: Filters - Radius, Categories, Price, Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onFilterChange({ ...filters, category: cat })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  filters.category === cat
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Distance Radius Selector in Kilometers (km) */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1 text-slate-300">
            <span className="text-slate-400 font-medium">Max Radius:</span>
            <div className="flex items-center gap-1">
              {[0.5, 1.0, 2.0, 5.0, 10.0].map((rad) => (
                <button
                  key={rad}
                  onClick={() => onFilterChange({ ...filters, radiusKm: rad })}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    filters.radiusKm === rad
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rad < 1 ? `${rad * 1000}m` : `${rad} km`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Level Filter in INR (₹) */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1 text-slate-300">
            <span className="text-slate-400 font-medium">Price:</span>
            <div className="flex items-center gap-1">
              {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map((tier) => {
                const isSelected = filters.priceLevels.includes(tier);
                return (
                  <button
                    key={tier}
                    onClick={() => handlePriceToggle(tier)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                    title={
                      tier === '₹' ? 'Pocket-friendly (< ₹500 for two)' :
                      tier === '₹₹' ? 'Moderate (₹500 - ₹1,500 for two)' :
                      tier === '₹₹₹' ? 'Craft Microbreweries (₹1,500 - ₹2,500 for two)' :
                      'Luxury / Fine Dining (₹2,500+ for two)'
                    }
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            
            {/* Has Active Offers Toggle */}
            <button
              onClick={() => onFilterChange({ ...filters, hasOffersOnly: !filters.hasOffersOnly })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
                filters.hasOffersOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Offers & Happy Hour</span>
            </button>

            {/* Reddit Recommended Toggle */}
            <button
              onClick={() => onFilterChange({ ...filters, redditRecommendedOnly: !filters.redditRecommendedOnly })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
                filters.redditRecommendedOnly
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
              <span>Reddit Recommended</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-slate-400 pl-2">
              <span className="text-[11px]">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e: any) => onFilterChange({ ...filters, sortBy: e.target.value })}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500"
              >
                <option value="distance">Nearest Distance First 📍</option>
                <option value="rating">Highest Rated ⭐</option>
                <option value="redditScore">Reddit Favorite 💬</option>
                <option value="offersCount">Most Offers 🔥</option>
              </select>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
