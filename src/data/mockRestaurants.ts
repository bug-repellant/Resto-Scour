import { Restaurant } from '../types';

export const INITIAL_LOCATION_NAME = "Indiranagar 100ft Road, Bengaluru, Karnataka";
export const INITIAL_COORDS = { lat: 12.9719, lng: 77.6412 };

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "brewery-001",
    name: "Toit Brewpub",
    category: "Microbrewery",
    address: "298, 100 Feet Rd, Near KFC Junction, Indiranagar, Bengaluru 560038",
    distanceKm: 0.28,
    distanceMinutesWalk: 4,
    priceLevel: "₹₹₹",
    approxCostForTwo: "₹1,800 for two with craft beer",
    rating: 4.7,
    reviewsCount: 38240,
    latitude: 12.9716,
    longitude: 77.6410,
    phone: "+91 90197 13388",
    website: "https://toit.in",
    photoUrl: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=800&q=80",
    cuisine: "Microbrewery, Artisan Pizza, Continental & Pub Grub",
    openStatus: "Open now • Closes 1:00 AM",
    popularItems: [
      { name: "Tint-in-Toit (Belgian Witbier Pint)", price: "₹345", category: "Craft Beers", isRedditFavorite: true, description: "Signature wheat ale spiced with sweet orange peel & coriander." },
      { name: "Colonial Toit (English IPA Pint)", price: "₹365", category: "Craft Beers", isRedditFavorite: true, description: "Rich malt backbone with dry-hopped herbal & piney notes." },
      { name: "Baked Cheesy Nachos Supreme", price: "₹380", category: "Starters & Chakhna", isRedditFavorite: true, description: "House tortilla chips loaded with melted cheddar, jalapeños, refried beans & salsa." },
      { name: "Ghee Roast Chicken Skewers", price: "₹420", category: "Starters & Chakhna", description: "Kundapur red chilli masala, slow roasted in clarified butter." },
      { name: "Toit Special Wood-Fired Pizza", price: "₹590", category: "Mains & Biryani", isRedditFavorite: true, description: "Sundried tomatoes, balsamic glaze, bocconcini, mozzarella & pesto drizzle." }
    ],
    specialOffers: [
      {
        id: "so-101",
        title: "Brewmaster Flight Sampler (6 Beers)",
        description: "6x 100ml tasters of on-tap fresh brews for ₹420",
        daysOrHours: "Everyday 12:00 PM - 6:00 PM",
        type: "Daily Special",
        discountValue: "₹420 Sampler Set"
      },
      {
        id: "so-102",
        title: "Weekday Lunch Express Combo",
        description: "Personal 8-inch woodfired pizza + fresh brew pint for ₹599",
        daysOrHours: "Mon-Fri 12:00 PM - 3:30 PM",
        type: "Combo Deal",
        discountValue: "₹599 Lunch"
      }
    ],
    redditInsights: {
      sentiment: "Overwhelmingly Positive",
      summary: "Widely regarded as the cultural benchmark of Bangalore's brewery scene on r/bangalore and r/indiafood. The Tint-in-Toit Witbier, Basmati Blonde, and wood-fired sourdough pizzas receive unanimous recommendations.",
      popularThreads: [
        { title: "Definitive Bangalore Microbrewery Tier List", subreddit: "r/bangalore", keyTakeaway: "Toit consistently holds S-Tier for craft consistency, energetic tavern vibe, and dog-friendly ground floor." },
        { title: "Best food items to order at Toit Indiranagar?", subreddit: "r/indiafood", keyTakeaway: "Baked Nachos, Toit Beef/Paneer Chilli, and BBQ Chicken Pizza are perennial favorites." }
      ],
      topRecommendedDishes: ["Tint-in-Toit Witbier", "Baked Nachos", "Toit Special Pizza", "Ghee Roast Chicken"],
      warningsOrTips: ["Table reservations essential on weekends (expect 45-60 min queue walk-in)", "Valet parking available at 100ft road", "Pet friendly outdoor section"]
    },
    reviewConsensus: {
      googleRating: 4.7,
      googleCount: 38240,
      zomatoOrDineoutSummary: "4.8/5 rating on Zomato across 22,000+ reviews. Top rated for ambiance, fresh brewed hops, and prompt service.",
      overallVerdict: "Bangalore's quintessential microbrewery. Outstanding craft beer consistency and unpretentious pub atmosphere.",
      confidenceScore: 98,
      verifiedSourcesCount: 6
    },
    groundingCitations: [
      { title: "Toit Official Indiranagar Taplist", url: "https://toit.in" },
      { title: "Reddit r/bangalore Craft Beer Megathread", url: "https://reddit.com/r/bangalore" },
      { title: "Zomato Dineout Bangalore Spotlight", url: "https://zomato.com" }
    ]
  },
  {
    id: "brewery-002",
    name: "Arbor Brewing Company (ABC)",
    category: "Taproom",
    address: "8, 3rd Floor, Allied Grande Mall, Magrath Rd, Ashok Nagar, Bengaluru 560025",
    distanceKm: 0.95,
    distanceMinutesWalk: 12,
    priceLevel: "₹₹₹",
    approxCostForTwo: "₹2,000 for two with craft drinks",
    rating: 4.6,
    reviewsCount: 19850,
    latitude: 12.9710,
    longitude: 77.6080,
    phone: "+91 80 5014 4477",
    website: "https://arborbrewing.in",
    photoUrl: "https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=800&q=80",
    cuisine: "American Taproom, Pub Grub, Burgers & Sourdough Pizzas",
    openStatus: "Open now • Closes 12:30 AM",
    popularItems: [
      { name: "Bangalore Bliss (Hefeweizen Pint)", price: "₹375", category: "Craft Beers", isRedditFavorite: true, description: "Classic Bavarian style wheat beer with banana and clove aromatic esters." },
      { name: "Raging Bull (American IPA 500ml)", price: "₹395", category: "Craft Beers", isRedditFavorite: true, description: "High-hop floral IPA brewed with Michigan and Cascade hops." },
      { name: "Flaming Buffalo Chicken Wings", price: "₹425", category: "Starters & Chakhna", isRedditFavorite: true, description: "Crispy chicken wings tossed in homemade spicy cayenne pepper glaze with blue cheese dip." },
      { name: "Loaded Poutine Fries", price: "₹340", category: "Starters & Chakhna", description: "Skin-on fries smothered in cheese curds and house spiced gravy." },
      { name: "Truffle Mushroom Risotto", price: "₹520", category: "Mains & Biryani", description: "Creamy arborio rice with wild mushrooms and parmesan shaving." }
    ],
    specialOffers: [
      {
        id: "so-201",
        title: "Happy Hour 1+1 on Draft Taps",
        description: "Buy 1 Get 1 on all in-house brewed draft pints",
        daysOrHours: "Mon-Thu 12:00 PM - 5:00 PM",
        type: "Happy Hour",
        discountValue: "1+1 on Taps"
      },
      {
        id: "so-202",
        title: "Zomato Gold / EazyDiner Pay",
        description: "Flat 15% instant bill discount + complimentary craft tester",
        daysOrHours: "All Days",
        type: "Discount",
        discountValue: "15% Off Total Bill"
      }
    ],
    redditInsights: {
      sentiment: "Mostly Positive",
      summary: "First American craft brewery in India. Highly regarded on r/bangalore for strong IPAs (Raging Bull) and the smooth Bangalore Bliss Hefeweizen. Known for its spacious wooden interior.",
      popularThreads: [
        { title: "Best IPAs in Bangalore right now?", subreddit: "r/bangalore", keyTakeaway: "Arbor's Raging Bull and Michael Faricy Stout remain undisputed staples for heavy beer enthusiasts." }
      ],
      topRecommendedDishes: ["Bangalore Bliss", "Raging Bull IPA", "Buffalo Chicken Wings", "ABC Burger"],
      warningsOrTips: ["Loud music on Friday evenings; sit on the balcony for conversation", "Valet parking available at mall basement"]
    },
    reviewConsensus: {
      googleRating: 4.6,
      googleCount: 19850,
      zomatoOrDineoutSummary: "4.7/5 with 14,000+ ratings. Praised for authentic American pub ambiance and consistency.",
      overallVerdict: "Top choice for beer purists seeking high-gravity IPAs and relaxed wood-clad taproom vibes.",
      confidenceScore: 96,
      verifiedSourcesCount: 5
    },
    groundingCitations: [
      { title: "Arbor Brewing Co Official", url: "https://arborbrewing.in" },
      { title: "Reddit r/bangalore Beer Discussions", url: "https://reddit.com/r/bangalore" }
    ]
  },
  {
    id: "pub-003",
    name: "Pecos Classic Pub",
    category: "Pub",
    address: "34, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru 560025",
    distanceKm: 1.45,
    distanceMinutesWalk: 18,
    priceLevel: "₹",
    approxCostForTwo: "₹850 for two with draught beer & snacks",
    rating: 4.5,
    reviewsCount: 12400,
    latitude: 12.9722,
    longitude: 77.6045,
    phone: "+91 80 2558 0971",
    website: "https://pecospub.in",
    photoUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    cuisine: "Retro Rock Pub, Chakhna, Coorg Pork & Draught Beer",
    openStatus: "Open now • Closes 11:30 PM",
    popularItems: [
      { name: "Chilled Draught Beer Mug (Kingfisher)", price: "₹160", category: "Craft Beers", isRedditFavorite: true, description: "Classic freshly poured draught beer in chilled glassware." },
      { name: "Coorg Style Pandi / Pork Chilli Roast", price: "₹290", category: "Starters & Chakhna", isRedditFavorite: true, description: "Tender spicy pork cubes cooked with authentic kachampuli vinegar and pepper." },
      { name: "Masala Peanuts Chakhna Bowl", price: "₹120", category: "Starters & Chakhna", description: "Roasted peanuts tossed with fresh onions, green chillies, coriander & lemon." },
      { name: "Spicy Beef / Mutton Sukka with Dosa", price: "₹340", category: "Mains & Biryani", isRedditFavorite: true, description: "Slow-roasted coastal spiced meat served with 2 hot set dosas." }
    ],
    specialOffers: [
      {
        id: "so-301",
        title: "Classic Retro Rock Afternoon Pitchers",
        description: "Draught Beer Pitcher (1.5L) for just ₹499",
        daysOrHours: "Daily 11:00 AM - 5:00 PM",
        type: "Happy Hour",
        discountValue: "₹499 Draught Pitcher"
      },
      {
        id: "so-302",
        title: "Snack & Brew Combo",
        description: "2 Beer Mugs + 1 Pork/Paneer Chilli Plate for ₹449",
        daysOrHours: "All Day",
        type: "Combo Deal",
        discountValue: "₹449 Combo"
      }
    ],
    redditInsights: {
      sentiment: "Overwhelmingly Positive",
      summary: "An iconic Bangalore institution beloved on r/bangalore for classic 70s/80s classic rock (Led Zeppelin, Pink Floyd), retro posters, cheap draught beer, and legendary pork chilli.",
      popularThreads: [
        { title: "Old Bangalore nostalgia pubs that haven't changed", subreddit: "r/bangalore", keyTakeaway: "Pecos remains the sentimental gold standard for no-fuss rock music, cheap pitchers, and spicy bar snacks." }
      ],
      topRecommendedDishes: ["Draught Beer Pitcher", "Pork Chilli", "Masala Peanuts", "Ghee Dosa with Sukka"],
      warningsOrTips: ["Strictly retro rock playlist (no DJ requests)", "Cozy vintage seating; can get dimly lit", "Cash and UPI accepted"]
    },
    reviewConsensus: {
      googleRating: 4.5,
      googleCount: 12400,
      zomatoOrDineoutSummary: "4.6/5 stars across 8,000+ reviews. Celebrated for high nostalgia value and pocket-friendly rates.",
      overallVerdict: "Legendary budget retro rock sanctuary. Must-visit for old-school Bangalore pub culture.",
      confidenceScore: 99,
      verifiedSourcesCount: 6
    },
    groundingCitations: [
      { title: "Pecos Bangalore History & Menu", url: "https://pecospub.in" },
      { title: "Reddit r/bangalore Nostalgia Threads", url: "https://reddit.com/r/bangalore" }
    ]
  },
  {
    id: "brewery-004",
    name: "Windmills Craftworks",
    category: "Microbrewery",
    address: "331, 5B Rd, EPIP Zone, Whitefield / Indiranagar Express, Bengaluru 560066",
    distanceKm: 2.10,
    distanceMinutesWalk: 26,
    priceLevel: "₹₹₹₹",
    approxCostForTwo: "₹3,200 for two (Fine Dining Craft & Jazz)",
    rating: 4.8,
    reviewsCount: 18450,
    latitude: 12.9815,
    longitude: 77.7290,
    phone: "+91 88802 33322",
    website: "https://windmills.in",
    photoUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    cuisine: "Luxury Microbrewery, Live Jazz, Coastal & Continental Cuisine",
    openStatus: "Open now • Closes 12:00 AM",
    popularItems: [
      { name: "Toasted Coconut Stout (500ml)", price: "₹450", category: "Craft Beers", isRedditFavorite: true, description: "Award-winning dark stout infused with fresh roasted grated coconut & chocolate notes." },
      { name: "Hefeweizen Wheat Beer (500ml)", price: "₹420", category: "Craft Beers", isRedditFavorite: true, description: "Unfiltered golden wheat beer with silky bubble mouthfeel." },
      { name: "Mangalorean Prawn Ghee Roast", price: "₹650", category: "Starters & Chakhna", isRedditFavorite: true, description: "Jumbo tiger prawns braised in Kundapur ghee masala with curry leaves." },
      { name: "Lamb Galouti Kebab with Sheermal", price: "₹580", category: "Starters & Chakhna", description: "Melt-in-mouth Awadhi spiced lamb patties with mini saffron flatbread." },
      { name: "Slow Cooked Pork Ribs", price: "₹790", category: "Mains & Biryani", isRedditFavorite: true, description: "Smoked for 8 hours with bourbon BBQ glaze." }
    ],
    specialOffers: [
      {
        id: "so-401",
        title: "Sunday Jazz Drunch Buffet",
        description: "Unlimited Craft Beers on Tap + Gourmet 5-Course Live Grill for ₹2,499",
        daysOrHours: "Sundays 12:30 PM - 4:00 PM",
        type: "Combo Deal",
        discountValue: "₹2,499 Unlimited Drunch"
      },
      {
        id: "so-402",
        title: "EazyDiner Prime 25% Off",
        description: "Flat 25% discount on food bill with Prime reservations",
        daysOrHours: "Tue-Fri All Day",
        type: "Discount",
        discountValue: "25% Off Food"
      }
    ],
    redditInsights: {
      sentiment: "Overwhelmingly Positive",
      summary: "Acclaimed as the most sophisticated and luxurious microbrewery in India on r/bangalore. Exceptional library collection, live jazz stage, and the iconic Coconut Stout and Prawn Ghee Roast.",
      popularThreads: [
        { title: "Best place in Bangalore for a classy anniversary / date night?", subreddit: "r/bangalore", keyTakeaway: "Windmills is undisputed #1 for acoustics, jazz performances, and stellar food." }
      ],
      topRecommendedDishes: ["Toasted Coconut Stout", "Prawn Ghee Roast", "Galouti Kebab", "Pork Ribs"],
      warningsOrTips: ["Fine dining pricing; book live jazz performance slots ahead", "Formal / smart casual dress code recommended"]
    },
    reviewConsensus: {
      googleRating: 4.8,
      googleCount: 18450,
      zomatoOrDineoutSummary: "4.9/5 Zomato rating. Ranked among India's top 10 culinary dining experiences.",
      overallVerdict: "Masterpiece craft brewery with unmatched audio acoustics, library seating, and gourmet Indian-Continental fusion.",
      confidenceScore: 99,
      verifiedSourcesCount: 7
    },
    groundingCitations: [
      { title: "Windmills Craftworks Official Site", url: "https://windmills.in" },
      { title: "Reddit r/bangalore Premium Dining Guide", url: "https://reddit.com/r/bangalore" }
    ]
  },
  {
    id: "restobar-005",
    name: "Gilly's Restobar & Rooftop",
    category: "Restobar",
    address: "914, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
    distanceKm: 0.45,
    distanceMinutesWalk: 6,
    priceLevel: "₹₹",
    approxCostForTwo: "₹1,200 for two with drinks & starters",
    rating: 4.4,
    reviewsCount: 14500,
    latitude: 12.9730,
    longitude: 77.6430,
    phone: "+91 80 4965 3111",
    website: "https://gillys.in",
    photoUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
    cuisine: "Rooftop Restobar, Tandoori Starters, Chinese Chakhna & Cocktails",
    openStatus: "Open now • Closes 1:00 AM",
    popularItems: [
      { name: "Kingfisher Ultra / Draught Pitcher (1.5L)", price: "₹550", category: "Craft Beers", description: "Ice cold draught pitcher served with frosted glasses." },
      { name: "Desi Chilli Chicken Andhra Style", price: "₹340", category: "Starters & Chakhna", isRedditFavorite: true, description: "Spicy green chilli and curry leaf infused chicken chunks." },
      { name: "Crispy Corn & Water Chestnut Salt & Pepper", price: "₹280", category: "Starters & Chakhna", isRedditFavorite: true, description: "Golden fried sweet corn kernels with tossed scallions." },
      { name: "Hyderabadi Chicken Dum Biryani Handi", price: "₹390", category: "Mains & Biryani", isRedditFavorite: true, description: "Fragrant basmati rice dum cooked with saffron, tender chicken & salan." },
      { name: "Gilly's Signature LIIT", price: "₹480", category: "Cocktails", description: "5 white spirits with triple sec, cola, and citrus." }
    ],
    specialOffers: [
      {
        id: "so-501",
        title: "Match Day & Corporate Happy Hour",
        description: "1+1 on Kingfisher Drafts & IMFL Cocktails",
        daysOrHours: "Mon-Fri 12:00 PM - 7:00 PM",
        type: "Happy Hour",
        discountValue: "1+1 on Drafts & IMFL"
      },
      {
        id: "so-502",
        title: "Zomato Gold / Swiggy Dineout 20% Off",
        description: "Flat 20% discount on total dining bill",
        daysOrHours: "All Days",
        type: "Discount",
        discountValue: "20% Off Bill"
      }
    ],
    redditInsights: {
      sentiment: "Mostly Positive",
      summary: "Popular student and IT crowd rooftop spot on r/bangalore for budget-friendly beer pitchers, live cricket/IPL match screenings, and dependable spicy bar snacks.",
      popularThreads: [
        { title: "Best places to watch IPL matches with cheap beer in Indiranagar?", subreddit: "r/bangalore", keyTakeaway: "Gilly's Rooftop offers massive screens, loud cheers, and generous 1+1 pitcher deals." }
      ],
      topRecommendedDishes: ["Andhra Chilli Chicken", "Crispy Corn", "Chicken Dum Biryani", "Draft Pitcher"],
      warningsOrTips: ["Rooftop can get noisy during match hours; arrive early for front-screen tables"]
    },
    reviewConsensus: {
      googleRating: 4.4,
      googleCount: 14500,
      zomatoOrDineoutSummary: "4.3/5 across 9,000+ reviews. Commended for prompt appetizers and breezy rooftop views.",
      overallVerdict: "Top tier value-for-money restobar for group hangouts, match screenings, and late night drinks.",
      confidenceScore: 94,
      verifiedSourcesCount: 5
    },
    groundingCitations: [
      { title: "Gilly's Restobar Indiranagar", url: "https://gillys.in" },
      { title: "Reddit r/bangalore Sports Bar Recommendations", url: "https://reddit.com/r/bangalore" }
    ]
  },
  {
    id: "brewery-006",
    name: "Geist Brewing Taproom",
    category: "Taproom",
    address: "136, 1st Cross Rd, Near BDA Complex, Indiranagar, Bengaluru 560038",
    distanceKm: 0.65,
    distanceMinutesWalk: 8,
    priceLevel: "₹₹₹",
    approxCostForTwo: "₹1,900 for two with German craft beer",
    rating: 4.7,
    reviewsCount: 11200,
    latitude: 12.9745,
    longitude: 77.6405,
    phone: "+91 88844 43478",
    website: "https://drinkgeist.com",
    photoUrl: "https://images.unsplash.com/photo-1538488881522-4326c3699051?auto=format&fit=crop&w=800&q=80",
    cuisine: "German Style Craft Taproom, European Charcuterie & Coastal Small Plates",
    openStatus: "Open now • Closes 1:00 AM",
    popularItems: [
      { name: "Geist Witty Neighbor (Belgian Wit Pint)", price: "₹360", category: "Craft Beers", isRedditFavorite: true, description: "Authentic wheat ale with refreshing citrus coriander notes." },
      { name: "Geist Uncle Dunkel (Dark Wheat Beer 500ml)", price: "₹380", category: "Craft Beers", isRedditFavorite: true, description: "Bavarian dark wheat ale with roasted caramel sweetness." },
      { name: "German Bratwurst Sausage Platter", price: "₹460", category: "Starters & Chakhna", isRedditFavorite: true, description: "Grilled pork bratwurst with sauerkraut, sweet mustard and pretzel rolls." },
      { name: "Kundapur Mushroom & Paneer Ghee Roast", price: "₹390", category: "Starters & Chakhna", description: "Fiery dry roasted cottage cheese in fragrant bafat spice." },
      { name: "Wood-Fired Quattro Formaggi Flatbread", price: "₹560", category: "Mains & Biryani", isRedditFavorite: true, description: "Four artisanal cheeses on slow fermented dough with honey drizzle." }
    ],
    specialOffers: [
      {
        id: "so-601",
        title: "Early Bird Craft Taster Trio",
        description: "3x 150ml Craft Taps + 1 Tapas Plate for ₹499",
        daysOrHours: "Daily 12:00 PM - 5:00 PM",
        type: "Daily Special",
        discountValue: "₹499 Taster Set"
      },
      {
        id: "so-602",
        title: "Swiggy SteppinOut / Dineout 15% Off",
        description: "15% off total dining bill for pre-booked tables",
        daysOrHours: "Mon-Thu",
        type: "Discount",
        discountValue: "15% Discount"
      }
    ],
    redditInsights: {
      sentiment: "Overwhelmingly Positive",
      summary: "Loved on r/bangalore for botanical garden taproom vibes, tranquil open-air seating under banyan trees, and strictly authentic Bavarian brewing standards.",
      popularThreads: [
        { title: "Which brewery has the best craft wheat beer in Bangalore?", subreddit: "r/bangalore", keyTakeaway: "Geist Witty Neighbor and Kamacitra IPA are repeatedly cited as among the cleanest pours in town." }
      ],
      topRecommendedDishes: ["Witty Neighbor Witbier", "Bratwurst Platter", "Ghee Roast Flatbread", "Uncle Dunkel"],
      warningsOrTips: ["Lush garden setup with outdoor fans; lovely evening breeze", "Pet friendly premises"]
    },
    reviewConsensus: {
      googleRating: 4.7,
      googleCount: 11200,
      zomatoOrDineoutSummary: "4.8/5 on Zomato across 8,500+ reviews. Celebrated for garden aesthetics and brew precision.",
      overallVerdict: "Top-tier open-air taproom offering pure European craft beer standards and great coastal tapas.",
      confidenceScore: 97,
      verifiedSourcesCount: 6
    },
    groundingCitations: [
      { title: "Geist Brewing Taproom Indiranagar", url: "https://drinkgeist.com" },
      { title: "Reddit r/bangalore Taproom Review Threads", url: "https://reddit.com/r/bangalore" }
    ]
  }
];
