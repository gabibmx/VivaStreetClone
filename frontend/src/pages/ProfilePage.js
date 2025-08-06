import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockProfiles } from '../data/mockData';
import { 
  ArrowLeft, Heart, Share2, Flag, Phone, MessageCircle, 
  MapPin, Clock, Shield, Star, Calendar
} from 'lucide-react';

const ProfilePage = () => {
  const { id } = useParams();
  const profile = mockProfiles.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
          <Link to="/">
            <Button>Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === profile.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? profile.images.length - 1 : prev - 1
      );
    }
  };

  const handleContact = (type) => {
    alert(`Contacting ${profile.name} via ${type}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Browse
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Main Image */}
                <div className="relative aspect-[4/5]">
                  <img
                    src={profile.images[currentImageIndex]}
                    alt={`${profile.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  
                  {/* Image Navigation */}
                  {profile.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleImageNavigation('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                    {currentImageIndex + 1} / {profile.images.length}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {profile.verified && (
                      <Badge className="bg-green-600 text-white">
                        <Shield className="h-4 w-4 mr-2" />
                        ID Verified
                      </Badge>
                    )}
                    {profile.featured && (
                      <Badge className="bg-orange-500 text-white">
                        FEATURED
                      </Badge>
                    )}
                    {profile.online && (
                      <Badge className="bg-green-500 text-white">
                        <Clock className="h-4 w-4 mr-2" />
                        Online Now
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                {profile.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {profile.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-green-500' : 'border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{profile.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500">Age</span>
                    <p className="font-semibold">{profile.age} years old</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ethnicity</span>
                    <p className="font-semibold">{profile.ethnicity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-semibold">{profile.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <p className={`font-semibold ${profile.online ? 'text-green-600' : 'text-gray-500'}`}>
                      {profile.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* Rates */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Rates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Incall</span>
                      <p className="font-semibold text-lg">{profile.incall}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Outcall</span>
                      <p className="font-semibold text-lg">{profile.outcall}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleContact('phone')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('message')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('calendar')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map(service => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="description" className="w-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{profile.description}</p>
                    
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">About Me</h4>
                        <p className="text-gray-600 text-sm">
                          I'm a professional and discreet companion who enjoys meeting new people and creating 
                          memorable experiences. I take pride in providing excellent service and ensuring my 
                          clients feel comfortable and satisfied.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">What I Offer</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Professional and discreet service</li>
                          <li>• Excellent hygiene and presentation</li>
                          <li>• Punctual and reliable</li>
                          <li>• Safe and clean environment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Customer Reviews</h4>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">4.8</span>
                        <span className="ml-1 text-gray-500">(24 reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map(review => (
                        <div key={review} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">Anonymous</span>
                            </div>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Excellent service and very professional. Would definitely recommend and visit again.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="availability" className="mt-6">
                  <div>
                    <h4 className="font-semibold mb-3">Availability</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span>Monday</span>
                        <span className="text-green-600">9:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Tuesday</span>
                        <span className="text-green-600">9:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Wednesday</span>
                        <span className="text-green-600">9:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Thursday</span>
                        <span className="text-green-600">9:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Friday</span>
                        <span className="text-green-600">9:00 AM - 12:00 AM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Saturday</span>
                        <span className="text-green-600">10:00 AM - 12:00 AM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Sunday</span>
                        <span className="text-red-600">Closed</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;