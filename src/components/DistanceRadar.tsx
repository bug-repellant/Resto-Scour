import React, { useState } from 'react';
import { MapPin, Navigation, Beer, Flame, Star, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Restaurant } from '../types';

interface DistanceRadarProps {
  restaurants: Restaurant[];
  selectedRestaurantId: string | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  maxRadiusKm: number;
}

export const DistanceRadar: React.FC<DistanceRadarProps> = ({
  restaurants,
  selectedRestaurantId,
  onSelectRestaurant,
  maxRadiusKm,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<Restaurant | null>(null);

  // Concentric radar rings in kilometers
  const rings = [0.25, 0.5, 1.0, 2.0, 5.0].filter(r => r <= maxRadiusKm * 1.5);
  if (rings.length === 0) rings.push(maxRadiusKm);

  // Map restaurant to (x, y) coordinates on radar canvas (size 360x360)
  const center = 180;
  const maxPixelRadius = 150;

  const getPinPosition = (index: number, distanceKm: number) => {
    // Distribute angles evenly around center circle for visual clarity
    const total = Math.max(restaurants.length, 1);
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    
    // Normalize distance to pixel radius
    const normDist = Math.min(distanceKm / (maxRadiusKm || 2), 1);
    const rPixels = Math.max(normDist * maxPixelRadius, 25);

    const x = center + rPixels * Math.cos(angle);
    const y = center + rPixels * Math.sin(angle);

    return { x, y };
  };

  const formatDist = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)} km`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-slate-100 overflow-hidden mb-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-sm font-bold tracking-tight text-slate-200">
            Proximity Distance Radar Scope
          </h2>
          <span className="text-xs text-slate-400 font-normal hidden sm:inline">
            (Strictly sorted by proximity in kilometers from your location)
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition"
        >
          <span>{isExpanded ? 'Collapse Radar' : 'Expand Radar'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Radar Visual Canvas */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-[340px] h-[340px] sm:w-[360px] sm:h-[360px] bg-slate-950/80 rounded-full border border-emerald-500/30 shadow-inner flex items-center justify-center overflow-hidden">
              
              {/* Radar Rotating Sweep Line Effect */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 pointer-events-none animate-[spin_8s_linear_infinite] origin-center opacity-40">
                <div className="w-1/2 h-1/2 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-tl-full" />
              </div>

              {/* Concentric Distance Rings */}
              {rings.map((ringDist) => {
                const ringRadiusPx = (ringDist / maxRadiusKm) * maxPixelRadius;
                if (ringRadiusPx > maxPixelRadius) return null;

                return (
                  <div
                    key={ringDist}
                    style={{
                      width: `${ringRadiusPx * 2}px`,
                      height: `${ringRadiusPx * 2}px`,
                    }}
                    className="absolute rounded-full border border-emerald-500/20 pointer-events-none flex items-start justify-center pt-1"
                  >
                    <span className="text-[10px] font-mono text-emerald-400/70 bg-slate-950/80 px-1 rounded">
                      {ringDist < 1 ? `${ringDist * 1000}m` : `${ringDist} km`}
                    </span>
                  </div>
                );
              })}

              {/* Crosshair Axes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-emerald-500/15" />
                <div className="h-full w-[1px] bg-emerald-500/15 absolute" />
              </div>

              {/* User Center GPS Marker */}
              <div className="absolute z-20 flex flex-col items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 shadow-lg shadow-amber-400/50 flex items-center justify-center animate-ping opacity-75 absolute" />
                <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-950 shadow-lg flex items-center justify-center z-10">
                  <Navigation className="w-2.5 h-2.5 text-slate-950 fill-slate-950" />
                </div>
                <span className="text-[9px] font-bold text-amber-300 bg-slate-950/90 px-1 rounded mt-0.5 shadow">
                  YOU
                </span>
              </div>

              {/* Restaurant Venue Blips */}
              {restaurants.map((restaurant, idx) => {
                const { x, y } = getPinPosition(idx, restaurant.distanceKm);
                const isSelected = selectedRestaurantId === restaurant.id;
                const hasOffers = restaurant.specialOffers && restaurant.specialOffers.length > 0;

                return (
                  <div
                    key={restaurant.id}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    onClick={() => onSelectRestaurant(restaurant)}
                    onMouseEnter={() => setHoveredRestaurant(restaurant)}
                    onMouseLeave={() => setHoveredRestaurant(null)}
                  >
                    {/* Glowing pulse ring if selected */}
                    {isSelected && (
                      <div className="absolute inset-0 w-8 h-8 -left-2 -top-2 rounded-full bg-amber-400/30 animate-ping" />
                    )}

                    {/* Blip Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all transform hover:scale-125 shadow-md ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-white scale-110'
                          : hasOffers
                          ? 'bg-rose-500 text-white border border-rose-300'
                          : 'bg-emerald-500 text-slate-950 border border-emerald-300'
                      }`}
                    >
                      <span className="text-[10px]">{idx + 1}</span>
                    </div>

                    {/* Quick Mini Label on Radar */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-slate-950/90 text-slate-200 border border-slate-800 text-[9px] px-1 py-0.2 rounded whitespace-nowrap opacity-80 group-hover:opacity-100 font-mono">
                      {formatDist(restaurant.distanceKm)}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Radar Active Focus / Distance Breakdown Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {hoveredRestaurant || (restaurants[0] ? restaurants[0] : null) ? (
              (() => {
                const active = hoveredRestaurant || restaurants[0];
                return (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                            {active.category}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">
                            {active.priceLevel}
                          </span>
                          {active.approxCostForTwo && (
                            <span className="text-[10px] text-slate-400">
                              {active.approxCostForTwo}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-100 mt-1">
                          {active.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate max-w-xs">{active.address}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-400 font-mono">
                          {formatDist(active.distanceKm)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {active.distanceMinutesWalk || Math.round(active.distanceKm * 12)} min walk
                        </div>
                      </div>
                    </div>

                    {/* Reddit Sentiment Highlight */}
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                        <span className="text-orange-400">💬 Reddit Consensus:</span>
                        <span className="text-emerald-400 font-medium">{active.redditInsights?.sentiment || "Positive"}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] line-clamp-2 italic">
                        "{active.redditInsights?.summary || "Recommended by community regulars."}"
                      </p>
                    </div>

                    {/* Featured Dish / Craft Brew Price */}
                    {active.popularItems && active.popularItems.length > 0 && (
                      <div className="flex items-center justify-between text-xs bg-slate-900/50 px-2.5 py-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 truncate">⭐ {active.popularItems[0].name}</span>
                        <span className="text-amber-400 font-mono font-bold shrink-0 ml-2">{active.popularItems[0].price}</span>
                      </div>
                    )}

                    {/* Active Offer Badge */}
                    {active.specialOffers && active.specialOffers.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-300 bg-rose-950/40 border border-rose-500/30 px-2.5 py-1.5 rounded-lg">
                        <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate font-semibold">{active.specialOffers[0].title}: {active.specialOffers[0].description}</span>
                      </div>
                    )}

                    <button
                      onClick={() => onSelectRestaurant(active)}
                      className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow cursor-pointer"
                    >
                      View Full Menu Prices & Reddit Threads
                    </button>
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                Hover over any radar blip to inspect distance, pricing in ₹, and Reddit chatter.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
