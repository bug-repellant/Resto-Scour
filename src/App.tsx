import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LocationBar } from './components/LocationBar';
import { DistanceRadar } from './components/DistanceRadar';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { DeepInquiryDrawer } from './components/DeepInquiryDrawer';
import { Restaurant, SearchFilters } from './types';
import { MOCK_RESTAURANTS, INITIAL_LOCATION_NAME, INITIAL_COORDS } from './data/mockRestaurants';
import { Beer, MapPin, RefreshCw, AlertCircle, ShieldCheck, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Search and Filter State
  const [filters, setFilters] = useState<SearchFilters>({
    locationName: INITIAL_LOCATION_NAME,
    lat: INITIAL_COORDS.lat,
    lng: INITIAL_COORDS.lng,
    radiusKm: 2.0, // 2 kilometers default
    category: 'All',
    query: '',
    hasOffersOnly: false,
    redditRecommendedOnly: false,
    priceLevels: [],
    sortBy: 'distance', // Default sorted strictly by distance
  });

  // Selected Venue & Modal States
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [comparedRestaurantIds, setComparedRestaurantIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);

  // Live AI Scour Call
  const handleRunScour = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: filters.locationName,
          lat: filters.lat,
          lng: filters.lng,
          radiusKm: filters.radiusKm,
          category: filters.category,
          query: filters.query,
        }),
      });

      const data = await response.json();

      if (response.ok && data.restaurants && data.restaurants.length > 0) {
        setRestaurants(data.restaurants);
      } else if (data.restaurants && data.restaurants.length === 0) {
        setError("No venues found matching your location and filters in this radius.");
      } else {
        console.warn("API response error, falling back to scoured dataset:", data.error);
        setError(`AI Scour note: ${data.error || "Using cached regional sample data."}`);
      }
    } catch (err: any) {
      console.error("Scour request failed:", err);
      setError("Failed to reach live AI scour service. Displaying cached local venues.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Venue in Comparison List
  const handleToggleCompare = (restaurant: Restaurant) => {
    setComparedRestaurantIds((prev) => {
      if (prev.includes(restaurant.id)) {
        return prev.filter((id) => id !== restaurant.id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 venues at a time.");
          return prev;
        }
        return [...prev, restaurant.id];
      }
    });
  };

  // Filter & Sort Logic
  const filteredRestaurants = (restaurants || []).filter((r) => {
    // Distance filter
    if (typeof r.distanceKm === 'number' && r.distanceKm > filters.radiusKm * 1.25) return false;

    // Category filter
    if (filters.category !== 'All' && r.category !== filters.category) return false;

    // Keyword query filter
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      const nameMatch = (r.name || '').toLowerCase().includes(q);
      const cuisineMatch = (r.cuisine || '').toLowerCase().includes(q);
      const itemMatch = Array.isArray(r.popularItems) && r.popularItems.some(item => (item.name || '').toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q)));
      const offerMatch = Array.isArray(r.specialOffers) && r.specialOffers.some(o => (o.title || '').toLowerCase().includes(q) || (o.description || '').toLowerCase().includes(q));
      if (!nameMatch && !cuisineMatch && !itemMatch && !offerMatch) return false;
    }

    // Offers filter
    if (filters.hasOffersOnly && (!Array.isArray(r.specialOffers) || r.specialOffers.length === 0)) return false;

    // Reddit recommended filter
    if (filters.redditRecommendedOnly && r.redditInsights?.sentiment !== 'Overwhelmingly Positive' && r.redditInsights?.sentiment !== 'Mostly Positive') return false;

    // Price levels filter
    if (filters.priceLevels.length > 0 && !filters.priceLevels.includes(r.priceLevel)) return false;

    return true;
  });

  // Sorting
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (filters.sortBy === 'distance') {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    } else if (filters.sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (filters.sortBy === 'redditScore') {
      return (b.reviewConsensus?.confidenceScore || 0) - (a.reviewConsensus?.confidenceScore || 0);
    } else if (filters.sortBy === 'offersCount') {
      return (b.specialOffers?.length || 0) - (a.specialOffers?.length || 0);
    }
    return 0;
  });

  const comparedRestaurants = restaurants.filter((r) => comparedRestaurantIds.includes(r.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation Header */}
      <Header
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        compareCount={comparedRestaurantIds.length}
        locationName={filters.locationName}
      />

      {/* Location Bar & Filters */}
      <LocationBar
        filters={filters}
        onFilterChange={setFilters}
        onRunScour={handleRunScour}
        isLoading={isLoading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Status / Error Banner */}
        {error && (
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-amber-400 font-bold hover:underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Proximity Distance Radar Scope (in km) */}
        <DistanceRadar
          restaurants={sortedRestaurants}
          selectedRestaurantId={selectedRestaurant?.id || null}
          onSelectRestaurant={setSelectedRestaurant}
          maxRadiusKm={filters.radiusKm}
        />

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Scoured Venues</span>
              <span className="text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {sortedRestaurants.length} Places
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly listed with respect to distance from center ({filters.radiusKm} km radius)
            </p>
          </div>

          <div className="text-xs text-slate-400 font-medium hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Reddit & Google Places Grounded (India)</span>
          </div>
        </div>

        {/* Venue Cards Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-bounce">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Scouring Indian Subreddits, Menus & Deals</h3>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Searching current ₹ menu prices, craft beer taps, happy hour offers, and local threads near "{filters.locationName}"...
              </p>
            </div>
          </div>
        ) : sortedRestaurants.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <Beer className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-300">No venues match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try expanding your distance radius (e.g. 5 km or 10 km) or clearing category filters, or click "Scour Near Me" to query live AI sources.
            </p>
            <button
              onClick={() => {
                setFilters({
                  ...filters,
                  category: 'All',
                  radiusKm: 5.0,
                  query: '',
                  hasOffersOnly: false,
                  redditRecommendedOnly: false,
                });
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-slate-700 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRestaurants.map((restaurant, idx) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                rankIndex={idx}
                onOpenDetails={setSelectedRestaurant}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedRestaurantIds.includes(restaurant.id)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1 mt-12">
        <p>Pub, Brewery & Dining Scour (India) • Multi-Source Price & Reddit Sentiment Finder</p>
        <p className="text-[11px] text-slate-600">
          Powered by Gemini 3.6 Flash & Google Search Grounding. Verified against Indian subreddits, Zomato, Swiggy Dineout & Google Places.
        </p>
      </footer>

      {/* Detail Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <ComparisonModal
          restaurants={comparedRestaurants}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveFromCompare={(id) => setComparedRestaurantIds(prev => prev.filter(item => item !== id))}
          onClearAll={() => setComparedRestaurantIds([])}
        />
      )}

      {/* AI Food Scout Deep Inquiry Drawer */}
      <DeepInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        locationName={filters.locationName}
        currentPlaces={restaurants}
      />

    </div>
  );
}
