import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockLocations, mockEthnicities } from '../data/mockData';
import { Search } from 'lucide-react';

const SearchFilters = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
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
    setSearchTerm('');
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Buscar y Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="ej. 'asiática', 'rubia', 'pecho grande'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Ubicación</Label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las ubicaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              {mockLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <Label>Edad</Label>
          <div className="flex gap-2">
            <Select value={filters.minAge} onValueChange={(value) => handleFilterChange('minAge', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Mín" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquiera</SelectItem>
                {[18, 19, 20, 21, 22, 25, 30, 35, 40, 45, 50].map(age => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.maxAge} onValueChange={(value) => handleFilterChange('maxAge', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Máx" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquiera</SelectItem>
                {[25, 30, 35, 40, 45, 50, 60].map(age => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ethnicity */}
        <div className="space-y-2">
          <Label>Etnia</Label>
          <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange('ethnicity', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {mockEthnicities.map(ethnicity => (
                <SelectItem key={ethnicity} value={ethnicity}>{ethnicity}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Independiente">Independiente</SelectItem>
              <SelectItem value="Agencia">Agencia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Tarifas (por hora)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín €"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Máx €"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => handleFilterChange('verified', checked)}
            />
            <Label htmlFor="verified" className="text-sm">Solo ID verificado</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withPhotos"
              checked={filters.withPhotos}
              onCheckedChange={(checked) => handleFilterChange('withPhotos', checked)}
            />
            <Label htmlFor="withPhotos" className="text-sm">Anuncios con fotos</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withVideo"
              checked={filters.withVideo}
              onCheckedChange={(checked) => handleFilterChange('withVideo', checked)}
            />
            <Label htmlFor="withVideo" className="text-sm">Anuncios con video</Label>
          </div>
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <Label>Servicio</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="incall" />
              <Label htmlFor="incall" className="text-sm">En mi lugar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="outcall" />
              <Label htmlFor="outcall" className="text-sm">A domicilio</Label>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Buscar
        </Button>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Limpiar filtros
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;