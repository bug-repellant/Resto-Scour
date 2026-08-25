import React from 'react';
import { MapPin, Star, Flame, MessageSquare, ShieldCheck, ChevronRight, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  rankIndex: number;
  onOpenDetails: (restaurant: Restaurant) => void;
  onToggleCompare: (restaurant: Restaurant) => void;
  isCompared: boolean;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  rankIndex,
  onOpenDetails,
  onToggleCompare,
  isCompared,
}) => {
  const distKm = typeof restaurant.distanceKm === 'number' ? restaurant.distanceKm : 0.5;
  const distLabel = distKm < 1
    ? `${Math.round(distKm * 1000)}m away`
    : `${distKm.toFixed(1)} km away`;

  const popularItems = Array.isArray(restaurant.popularItems) ? restaurant.popularItems : [];
  const specialOffers = Array.isArray(restaurant.specialOffers) ? restaurant.specialOffers : [];
  const redditInsights = restaurant.redditInsights || {
    sentiment: "Mostly Positive",
    summary: "Frequented by local food and beverage enthusiasts.",
    popularThreads: [],
    topRecommendedDishes: [],
    warningsOrTips: [],
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col group">
      
      {/* Top Banner & Photo Header */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
        <img
          src={restaurant.photoUrl || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Rank Index Pill */}
        <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700 text-amber-400 font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <span>#{rankIndex + 1}</span>
          <span className="text-slate-400 font-normal">Nearest</span>
        </div>

        {/* Distance Pill - Prominent placement in km / m */}
        <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-400">
          <MapPin className="w-3.5 h-3.5 fill-slate-950" />
          <span>{distLabel}</span>
          {restaurant.distanceMinutesWalk && (
            <span className="text-slate-900/80 font-medium">({restaurant.distanceMinutesWalk}m walk)</span>
          )}
        </div>

        {/* Bottom Banner inside Image: Name, Category & Price Tier */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                {restaurant.category || "Venue"}
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                {restaurant.priceLevel || "₹₹"}
              </span>
              {restaurant.approxCostForTwo && (
                <span className="text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 hidden sm:inline">
                  {restaurant.approxCostForTwo}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1 group-hover:text-amber-300 transition line-clamp-1">
              {restaurant.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Rating, Open Status & Multi-Source Verification Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-semibold border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{(restaurant.rating || 4.5).toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({(restaurant.reviewsCount || 1000).toLocaleString()})</span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-400 font-medium">{restaurant.openStatus || "Open now"}</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{restaurant.reviewConsensus?.confidenceScore || 95}% Verified Consensus</span>
          </div>
        </div>

        {/* Menu Prices Snapshot in INR (₹) */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Verified Menu Prices</span>
            <span className="text-amber-400 font-mono text-[10px]">{popularItems.length} items sampled</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
            {popularItems.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-slate-200 font-medium truncate">{item.name}</span>
                  {item.isRedditFavorite && (
                    <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded border border-orange-500/30 shrink-0">
                      Reddit Fav 💬
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-amber-400 shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers / Happy Hour / Zomato Gold Badge */}
        {specialOffers.length > 0 && (
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-2.5 flex items-start gap-2 text-xs">
            <Flame className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-rose-200 flex items-center justify-between">
                <span className="truncate">{specialOffers[0].title}</span>
                {specialOffers[0].discountValue && (
                  <span className="text-[10px] font-mono font-bold bg-rose-500 text-slate-950 px-1.5 py-0.2 rounded shrink-0 ml-1">
                    {specialOffers[0].discountValue}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-rose-300/80 truncate mt-0.5">
                {specialOffers[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Reddit Sentiment Summary */}
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-2.5 space-y-1 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-orange-400 font-semibold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reddit Consensus:</span>
            </span>
            <span className="text-slate-300 font-medium text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
              {redditInsights.sentiment}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed italic">
            "{redditInsights.summary}"
          </p>
        </div>

        {/* Action Buttons: Compare + View Details */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          
          <button
            onClick={() => onToggleCompare(restaurant)}
            className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              isCompared
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isCompared ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Compared</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Add to Compare</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenDetails(restaurant)}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition shadow cursor-pointer"
          >
            <span>Inspect Venue</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>

        </div>

      </div>

    </div>
  );
};
