import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, MapPin, Phone, MessageCircle, Shield, Clock } from 'lucide-react';

const ProfileCard = ({ profile, viewMode = 'grid' }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleContact = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Mock contact action
    alert(`Contacting ${profile.name}...`);
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/profile/${profile.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              {/* Image */}
              <div className="relative w-48 h-32">
                <img
                  src={profile.images[0]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {profile.verified && (
                    <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      ID Verified
                    </Badge>
                  )}
                  {profile.featured && (
                    <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                      FEATURED
                    </Badge>
                  )}
                </div>

                {/* Photo Count */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {profile.images.length}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteToggle}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <Heart 
                    className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </button>

                {/* Online Status */}
                {profile.online && (
                  <div className="absolute bottom-2 right-2 flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Online
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{profile.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{profile.age} years old • {profile.category} • {profile.ethnicity}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{profile.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span><strong>Incall:</strong> {profile.incall}</span>
                      <span><strong>Outcall:</strong> {profile.outcall}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={handleContact}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleContact}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/profile/${profile.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative aspect-[4/5]">
            <img
              src={profile.images[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {profile.verified && (
                <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                  <Shield className="h-3 w-3 mr-1" />
                  ID Verified
                </Badge>
              )}
              {profile.featured && (
                <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                  FEATURED
                </Badge>
              )}
            </div>

            {/* Photo Count */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {profile.images.length}
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </button>

            {/* Online Status */}
            {profile.online && (
              <div className="absolute bottom-2 right-2 flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Online
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{profile.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{profile.age} years old • {profile.category}</p>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{profile.location}</span>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span><strong>Incall:</strong> {profile.incall}</span>
              <span><strong>Outcall:</strong> {profile.outcall}</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleContact} className="flex-1">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline" onClick={handleContact} className="flex-1">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProfileCard;