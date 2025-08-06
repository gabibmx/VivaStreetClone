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
      location: '',
      minAge: '',
      maxAge: '',
      ethnicity: '',
      services: '',
      priceMin: '',
      priceMax: '',
      availability: '',
      category: '',
      verified: false,
      withPhotos: false,
      withVideo: false
    });
    setSearchTerm('');
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Search & Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="e.g. 'asian', 'milf', 'big bust'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {mockLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <Label>Age</Label>
          <div className="flex gap-2">
            <Select value={filters.minAge} onValueChange={(value) => handleFilterChange('minAge', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                {[18, 19, 20, 21, 22, 25, 30, 35, 40, 45, 50].map(age => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.maxAge} onValueChange={(value) => handleFilterChange('maxAge', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Max" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                {[25, 30, 35, 40, 45, 50, 60].map(age => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ethnicity */}
        <div className="space-y-2">
          <Label>Ethnicity</Label>
          <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange('ethnicity', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {mockEthnicities.map(ethnicity => (
                <SelectItem key={ethnicity} value={ethnicity}>{ethnicity}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Independent">Independent</SelectItem>
              <SelectItem value="Agency">Agency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Rates (per hour)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min £"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max £"
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
            <Label htmlFor="verified" className="text-sm">ID Verified only</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withPhotos"
              checked={filters.withPhotos}
              onCheckedChange={(checked) => handleFilterChange('withPhotos', checked)}
            />
            <Label htmlFor="withPhotos" className="text-sm">Ads with photos</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withVideo"
              checked={filters.withVideo}
              onCheckedChange={(checked) => handleFilterChange('withVideo', checked)}
            />
            <Label htmlFor="withVideo" className="text-sm">Ads with video</Label>
          </div>
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <Label>Service</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="incall" />
              <Label htmlFor="incall" className="text-sm">Incall</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="outcall" />
              <Label htmlFor="outcall" className="text-sm">Outcall</Label>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Search
        </Button>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;