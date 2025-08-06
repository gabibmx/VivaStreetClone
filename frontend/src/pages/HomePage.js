import React, { useState, useMemo } from 'react';
import SearchFilters from '../components/SearchFilters';
import ProfileCard from '../components/ProfileCard';
import { mockProfiles } from '../data/mockData';
import { Button } from '../components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    minAge: 'all',
    maxAge: 'all',
    ethnicity: 'all',
    services: '',
    priceMin: '',
    priceMax: '',
    availability: '',
    category: 'all',
    verified: false,
    withPhotos: false,
    withVideo: false
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProfiles = useMemo(() => {
    let filtered = mockProfiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = filters.location === 'all' || profile.location === filters.location;
      const matchesMinAge = filters.minAge === 'all' || profile.age >= parseInt(filters.minAge);
      const matchesMaxAge = filters.maxAge === 'all' || profile.age <= parseInt(filters.maxAge);
      const matchesEthnicity = filters.ethnicity === 'all' || profile.ethnicity === filters.ethnicity;
      const matchesCategory = filters.category === 'all' || profile.category === filters.category;
      const matchesVerified = !filters.verified || profile.verified;
      const matchesAvailability = !filters.availability || 
                                 (filters.availability === 'online' ? profile.online : true);

      return matchesSearch && matchesLocation && matchesMinAge && matchesMaxAge && 
             matchesEthnicity && matchesCategory && matchesVerified && matchesAvailability;
    });

    // Sort profiles
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.incall.replace(/[€\/h]/g, ''));
          const priceB = parseInt(b.incall.replace(/[€\/h]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.incall.replace(/[€\/h]/g, ''));
          const priceB = parseInt(b.incall.replace(/[€\/h]/g, ''));
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Warning Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-red-700">
            <strong>Contactar anuncios como siempre</strong> - Aún puedes contactar a todos los anunciantes en Vivastreet, 
            ya sea que sus imágenes estén borrosas o no. Para revelar imágenes borrosas, confirma que tienes más de 18 años ahora, 
            luego crea una cuenta Lite y nunca tendrás que verificar tu edad de nuevo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <SearchFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {filteredProfiles.length} resultados en Escorts de España y Masaje Erótico
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded">
                      Independiente
                    </span>
                    <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded">
                      Agencia
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="featured">Ordenar por: Destacados</option>
                    <option value="newest">Ordenar por: Más recientes</option>
                    <option value="price-low">Ordenar por: Precio (Bajo a Alto)</option>
                    <option value="price-high">Ordenar por: Precio (Alto a Bajo)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* VIP Ads */}
            <div className="mb-6">
              <div className="bg-orange-100 border border-orange-300 rounded-lg p-2 mb-4">
                <span className="text-orange-700 font-semibold text-sm">Anuncios VIP</span>
              </div>
            </div>

            {/* Profile Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProfiles.map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron perfiles que coincidan con tus criterios.</p>
                <p className="text-gray-400 mt-2">Intenta ajustar tus filtros o términos de búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;