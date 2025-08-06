// Mock data for the Vivastreet clone

export const mockProfiles = [
  {
    id: 1,
    name: "Sofia",
    age: 23,
    location: "London",
    description: "Elegant and sophisticated companion available for discerning gentlemen. I offer a premium experience with excellent service.",
    images: ["https://via.placeholder.com/400x500/e5e7eb/6b7280?text=Sofia", "https://via.placeholder.com/400x500/f3f4f6/9ca3af?text=Sofia+2"],
    verified: true,
    featured: true,
    online: true,
    incall: "£150/h",
    outcall: "£200/h",
    services: ["Girlfriend Experience", "Dinner Dates", "Travel Companion"],
    ethnicity: "European",
    category: "Independent"
  },
  {
    id: 2,
    name: "Maya",
    age: 26,
    location: "Manchester",
    description: "Beautiful Asian companion offering discrete and professional service. Available for both incall and outcall.",
    images: ["https://via.placeholder.com/400x500/fef3c7/f59e0b?text=Maya", "https://via.placeholder.com/400x500/fef3c7/f59e0b?text=Maya+2"],
    verified: true,
    featured: false,
    online: false,
    incall: "£120/h",
    outcall: "£160/h",
    services: ["Girlfriend Experience", "Massage", "Role Play"],
    ethnicity: "Asian",
    category: "Independent"
  },
  {
    id: 3,
    name: "Isabella",
    age: 28,
    location: "Birmingham",
    description: "Stunning brunette with a warm personality. Perfect for social events and private encounters.",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400", "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400"],
    verified: true,
    featured: true,
    online: true,
    incall: "£180/h",
    outcall: "£220/h",
    services: ["Girlfriend Experience", "Dinner Dates", "Party Companion"],
    ethnicity: "Latin",
    category: "Agency"
  },
  {
    id: 4,
    name: "Emma",
    age: 24,
    location: "Leeds",
    description: "Young and energetic companion with a bubbly personality. Available for various occasions.",
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", "https://images.unsplash.com/photo-1554727242-741c14fa561c?w=400"],
    verified: false,
    featured: false,
    online: true,
    incall: "£100/h",
    outcall: "£140/h",
    services: ["Girlfriend Experience", "Party Companion"],
    ethnicity: "European",
    category: "Independent"
  },
  {
    id: 5,
    name: "Aria",
    age: 25,
    location: "Glasgow",
    description: "Sophisticated and elegant companion available for upscale clientele. Discretion guaranteed.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400"],
    verified: true,
    featured: true,
    online: false,
    incall: "£200/h",
    outcall: "£250/h",
    services: ["Girlfriend Experience", "Dinner Dates", "Travel Companion", "Business Events"],
    ethnicity: "European",
    category: "Independent"
  },
  {
    id: 6,
    name: "Zara",
    age: 22,
    location: "Liverpool",
    description: "Young and vibrant companion with an adventurous spirit. Perfect for those seeking excitement.",
    images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", "https://images.unsplash.com/photo-1541101767792-f9721b9b8b89?w=400"],
    verified: true,
    featured: false,
    online: true,
    incall: "£110/h",
    outcall: "£150/h",
    services: ["Girlfriend Experience", "Role Play", "Party Companion"],
    ethnicity: "Mixed",
    category: "Independent"
  }
];

export const mockLocations = [
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", 
  "Sheffield", "Bristol", "Newcastle", "Nottingham"
];

export const mockServices = [
  "Girlfriend Experience", "Dinner Dates", "Travel Companion", 
  "Party Companion", "Massage", "Role Play", "Business Events"
];

export const mockEthnicities = [
  "European", "Asian", "Latin", "African", "Mixed", "Arab", "Indian"
];