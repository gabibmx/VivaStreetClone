// Mock data for the Vivastreet clone - Spanish version

export const mockProfiles = [
  {
    id: 1,
    name: "Sofía",
    age: 23,
    location: "Madrid",
    description: "Acompañante elegante y sofisticada disponible para caballeros exigentes. Ofrezco una experiencia premium con excelente servicio.",
    images: ["https://via.placeholder.com/400x500/e5e7eb/6b7280?text=Sofia", "https://via.placeholder.com/400x500/f3f4f6/9ca3af?text=Sofia+2"],
    verified: true,
    featured: true,
    online: true,
    incall: "€150/h",
    outcall: "€200/h",
    services: ["Experiencia de Novia", "Cenas", "Acompañante de Viaje"],
    ethnicity: "Europea",
    category: "Independiente"
  },
  {
    id: 2,
    name: "Maya",
    age: 26,
    location: "Barcelona",
    description: "Hermosa acompañante asiática que ofrece servicio discreto y profesional. Disponible tanto para servicio a domicilio como en mi lugar.",
    images: ["https://via.placeholder.com/400x500/fef3c7/f59e0b?text=Maya", "https://via.placeholder.com/400x500/fef3c7/f59e0b?text=Maya+2"],
    verified: true,
    featured: false,
    online: false,
    incall: "€120/h",
    outcall: "€160/h",
    services: ["Experiencia de Novia", "Masajes", "Juegos de Rol"],
    ethnicity: "Asiática",
    category: "Independiente"
  },
  {
    id: 3,
    name: "Isabella",
    age: 28,
    location: "Valencia",
    description: "Morena impresionante con personalidad cálida. Perfecta para eventos sociales y encuentros privados.",
    images: ["https://via.placeholder.com/400x500/fce7f3/ec4899?text=Isabella", "https://via.placeholder.com/400x500/fce7f3/ec4899?text=Isabella+2"],
    verified: true,
    featured: true,
    online: true,
    incall: "€180/h",
    outcall: "€220/h",
    services: ["Experiencia de Novia", "Cenas", "Acompañante de Fiestas"],
    ethnicity: "Latina",
    category: "Agencia"
  },
  {
    id: 4,
    name: "Emma",
    age: 24,
    location: "Sevilla",
    description: "Joven y enérgica acompañante con personalidad burbujeante. Disponible para varias ocasiones.",
    images: ["https://via.placeholder.com/400x500/dbeafe/3b82f6?text=Emma", "https://via.placeholder.com/400x500/dbeafe/3b82f6?text=Emma+2"],
    verified: false,
    featured: false,
    online: true,
    incall: "€100/h",
    outcall: "€140/h",
    services: ["Experiencia de Novia", "Acompañante de Fiestas"],
    ethnicity: "Europea",
    category: "Independiente"
  },
  {
    id: 5,
    name: "Aria",
    age: 25,
    location: "Bilbao",
    description: "Acompañante sofisticada y elegante disponible para clientela exclusiva. Discreción garantizada.",
    images: ["https://via.placeholder.com/400x500/dcfce7/16a34a?text=Aria", "https://via.placeholder.com/400x500/dcfce7/16a34a?text=Aria+2"],
    verified: true,
    featured: true,
    online: false,
    incall: "€200/h",
    outcall: "€250/h",
    services: ["Experiencia de Novia", "Cenas", "Acompañante de Viaje", "Eventos de Negocios"],
    ethnicity: "Europea",
    category: "Independiente"
  },
  {
    id: 6,
    name: "Zara",
    age: 22,
    location: "Málaga",
    description: "Joven y vibrante acompañante con espíritu aventurero. Perfecta para quienes buscan emoción.",
    images: ["https://via.placeholder.com/400x500/f3e8ff/8b5cf6?text=Zara", "https://via.placeholder.com/400x500/f3e8ff/8b5cf6?text=Zara+2"],
    verified: true,
    featured: false,
    online: true,
    incall: "€110/h",
    outcall: "€150/h",
    services: ["Experiencia de Novia", "Juegos de Rol", "Acompañante de Fiestas"],
    ethnicity: "Mixta",
    category: "Independiente"
  }
];

export const mockLocations = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga", 
  "Zaragoza", "Murcia", "Palma de Mallorca", "Las Palmas", "Córdoba", "Alicante"
];

export const mockServices = [
  "Experiencia de Novia", "Cenas", "Acompañante de Viaje", 
  "Acompañante de Fiestas", "Masajes", "Juegos de Rol", "Eventos de Negocios"
];

export const mockEthnicities = [
  "Europea", "Asiática", "Latina", "Africana", "Mixta", "Árabe", "India"
];