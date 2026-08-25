export type CategoryType = 'All' | 'Microbrewery' | 'Pub' | 'Restobar' | 'Taproom' | 'Rooftop Lounge' | 'Sports Bar' | 'Cafe & Bar' | 'Casual Dining';

export interface MenuItem {
  name: string;
  price: string; // e.g. "₹320", "₹450"
  description?: string;
  category: string; // 'Craft Beers', 'Cocktails', 'Starters & Chakhna', 'Mains & Biryani', 'Happy Hour'
  isRedditFavorite?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  daysOrHours?: string;
  type: 'Happy Hour' | 'Daily Special' | 'Discount' | 'Combo Deal';
  discountValue?: string; // e.g. "1+1 on Craft Beer", "20% off Zomato Gold", "₹199 Draught Pitchers"
}

export interface RedditThread {
  title: string;
  subreddit: string; // e.g. "r/bangalore", "r/mumbai", "r/delhi", "r/indiafood"
  keyTakeaway: string;
  postUrl?: string;
  upvotesEstimate?: number;
}

export interface RedditInsights {
  sentiment: 'Overwhelmingly Positive' | 'Mostly Positive' | 'Mixed' | 'Overrated' | 'Hidden Gem';
  summary: string;
  popularThreads: RedditThread[];
  topRecommendedDishes: string[];
  warningsOrTips: string[];
}

export interface ReviewConsensus {
  googleRating: number; // 1-5
  googleCount: number;
  zomatoOrDineoutSummary?: string;
  overallVerdict: string;
  confidenceScore: number; // 0-100 percentage based on source agreement
  verifiedSourcesCount: number;
}

export interface GroundingCitation {
  title: string;
  url: string;
  snippet?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: CategoryType;
  address: string;
  distanceKm: number; // e.g. 0.35, 1.2 (in kilometers)
  distanceMinutesWalk?: number; // e.g. 5
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  approxCostForTwo?: string; // e.g. "₹1,200 for two"
  rating: number;
  reviewsCount: number;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  photoUrl?: string;
  cuisine: string;
  openStatus: string; // e.g., "Open now • Closes 12:30 AM"
  popularItems: MenuItem[];
  specialOffers: SpecialOffer[];
  redditInsights: RedditInsights;
  reviewConsensus: ReviewConsensus;
  groundingCitations: GroundingCitation[];
}

export interface SearchFilters {
  locationName: string;
  lat: number | null;
  lng: number | null;
  radiusKm: number; // 0.5, 1, 2, 5, 10 km
  category: CategoryType;
  query: string;
  hasOffersOnly: boolean;
  redditRecommendedOnly: boolean;
  priceLevels: string[]; // ['₹', '₹₹', '₹₹₹', '₹₹₹₹']
  sortBy: 'distance' | 'rating' | 'redditScore' | 'offersCount';
}

export interface DeepInquiryResponse {
  answer: string;
  citations: GroundingCitation[];
}
