import React from 'react';
import { X, MapPin, Star, Flame, MessageSquare, ShieldCheck, Check, Trash2 } from 'lucide-react';
import { Restaurant } from '../types';

interface ComparisonModalProps {
  restaurants: Restaurant[];
  onClose: () => void;
  onRemoveFromCompare: (restaurantId: string) => void;
  onClearAll: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  restaurants,
  onClose,
  onRemoveFromCompare,
  onClearAll,
}) => {
  if (restaurants.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Side-by-Side Venue Comparison</span>
              <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {restaurants.length} Places
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing distance (km), menu prices in ₹ (INR), happy hour specials, and Reddit community consensus
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Content */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1 text-slate-200">
          <div className="min-w-[640px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3 px-3 text-slate-400 font-bold uppercase tracking-wider w-36">Metric</th>
                  {restaurants.map((rest) => (
                    <th key={rest.id} className="py-3 px-3 min-w-[200px]">
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl relative">
                        <button
                          onClick={() => onRemoveFromCompare(rest.id)}
                          className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 p-1"
                          title="Remove venue"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-amber-400 font-mono text-[10px] uppercase">{rest.category}</div>
                        <div className="font-bold text-slate-100 text-sm truncate pr-4">{rest.name}</div>
                        <div className="text-emerald-400 font-bold mt-0.5 font-mono">
                          📍 {rest.distanceKm < 1 ? `${Math.round(rest.distanceKm * 1000)}m` : `${rest.distanceKm.toFixed(1)} km`}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60">
                
                {/* Distance Row */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">Distance From You</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3 font-bold text-emerald-400 font-mono">
                      📍 {rest.distanceKm < 1 ? `${Math.round(rest.distanceKm * 1000)}m` : `${rest.distanceKm.toFixed(1)} km`} ({rest.distanceMinutesWalk || Math.round(rest.distanceKm * 12)} min walk)
                    </td>
                  ))}
                </tr>

                {/* Price Level & Cost for Two */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">Price & Cost for Two</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded mr-1.5">
                        {rest.priceLevel}
                      </span>
                      <span className="text-amber-300 font-semibold">{rest.approxCostForTwo || 'Moderate'}</span>
                    </td>
                  ))}
                </tr>

                {/* Rating & Review Sources */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">Ratings & Consensus</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3">
                      <div className="flex items-center gap-1 font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rest.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal text-[11px]">({rest.reviewsCount.toLocaleString()})</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        🛡️ {rest.reviewConsensus?.confidenceScore}% multi-source match
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Sample Menu Prices */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40 align-top">Sample Menu Prices</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3 align-top space-y-1">
                      {(rest.popularItems || []).slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] bg-slate-950/70 p-1.5 rounded-lg border border-slate-800/80">
                          <span className="truncate pr-1 text-slate-300">{item.name}</span>
                          <span className="font-mono font-bold text-amber-400 shrink-0">{item.price}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Happy Hour & Active Deals */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40 align-top">Happy Hour / Deals</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3 align-top">
                      {rest.specialOffers && rest.specialOffers.length > 0 ? (
                        <div className="bg-rose-950/30 border border-rose-500/30 p-2 rounded-xl text-[11px] text-rose-200 space-y-1">
                          <div className="font-bold text-rose-300 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-rose-400" />
                            <span>{rest.specialOffers[0].title}</span>
                          </div>
                          <p className="text-rose-200/90 leading-tight">{rest.specialOffers[0].description}</p>
                          {rest.specialOffers[0].discountValue && (
                            <span className="inline-block bg-rose-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                              {rest.specialOffers[0].discountValue}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">No active deal listed</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Reddit Sentiment */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40 align-top">Reddit Sentiment</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3 align-top space-y-1">
                      <div className="flex items-center gap-1 text-orange-400 font-bold text-[11px]">
                        <MessageSquare className="w-3 h-3" />
                        <span>{rest.redditInsights?.sentiment || "Positive"}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic leading-relaxed line-clamp-3">
                        "{rest.redditInsights?.summary || "Recommended by regulars."}"
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Redditors Top Pick Dishes */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40 align-top">Reddit Must-Tries</td>
                  {restaurants.map((rest) => (
                    <td key={rest.id} className="py-3 px-3 align-top">
                      <div className="flex flex-wrap gap-1">
                        {(rest.redditInsights?.topRecommendedDishes || []).slice(0, 3).map((dish, i) => (
                          <span key={i} className="text-[10px] bg-slate-950 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                            {dish}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
