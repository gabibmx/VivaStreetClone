import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  User, Settings, MessageCircle, Calendar, Star, 
  Eye, Heart, Phone, Mail, MapPin, Camera, Plus
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, userType } = useAuth();
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    age: '25',
    location: 'London',
    description: 'Professional and discreet companion...',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    services: ['Girlfriend Experience', 'Dinner Dates'],
    incall: '£150/h',
    outcall: '£200/h'
  });

  const mockStats = {
    profileViews: 1247,
    favorites: 89,
    messages: 23,
    bookings: 12,
    rating: 4.8,
    reviews: 16
  };

  const mockMessages = [
    { id: 1, sender: 'John D.', message: 'Hi, I would like to book an appointment...', time: '2 hours ago', unread: true },
    { id: 2, sender: 'Mike S.', message: 'Thank you for the great service!', time: '1 day ago', unread: false },
    { id: 3, sender: 'David L.', message: 'Are you available tomorrow evening?', time: '2 days ago', unread: false }
  ];

  const mockBookings = [
    { id: 1, client: 'Anonymous', date: '2024-01-15', time: '7:00 PM', status: 'confirmed', type: 'Outcall' },
    { id: 2, client: 'Anonymous', date: '2024-01-18', time: '3:00 PM', status: 'pending', type: 'Incall' },
    { id: 3, client: 'Anonymous', date: '2024-01-20', time: '8:00 PM', status: 'completed', type: 'Outcall' }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Mock profile update
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (userType === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Favorites</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-gray-600">Reviews Given</p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="favorites" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="favorites" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Favorite Profiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map(item => (
                          <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                              <div>
                                <h4 className="font-semibold">Sofia</h4>
                                <p className="text-sm text-gray-600">London • 23 years old</p>
                                <p className="text-sm text-green-600">Online now</p>
                              </div>
                            </div>
                            <Button size="sm">Contact</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockMessages.map(msg => (
                          <div key={msg.id} className={`p-4 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">From: {msg.sender}</h4>
                                <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                              </div>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBookings.map(booking => (
                          <div key={booking.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">Booking with {booking.client}</h4>
                                <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                                <p className="text-sm text-gray-600">{booking.type}</p>
                              </div>
                              <Badge variant={
                                booking.status === 'confirmed' ? 'default' : 
                                booking.status === 'pending' ? 'secondary' : 'outline'
                              }>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Profile Settings */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Name</Label>
                    <Input id="customer-name" value={currentUser?.name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input id="customer-email" type="email" value={currentUser?.email || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone</Label>
                    <Input id="customer-phone" type="tel" value={currentUser?.phone || ''} />
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Model Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.profileViews}</p>
                <p className="text-sm text-gray-600">Profile Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.favorites}</p>
                <p className="text-sm text-gray-600">Favorites</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.messages}</p>
                <p className="text-sm text-gray-600">Messages</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.bookings}</p>
                <p className="text-sm text-gray-600">Bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.rating}</p>
                <p className="text-sm text-gray-600">Rating ({mockStats.reviews})</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={profile.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={profile.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="incall">Incall Rate</Label>
                          <Input
                            id="incall"
                            value={profile.incall}
                            onChange={(e) => handleInputChange('incall', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="outcall">Outcall Rate</Label>
                          <Input
                            id="outcall"
                            value={profile.outcall}
                            onChange={(e) => handleInputChange('outcall', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Photos</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
                            <Plus className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMessages.map(msg => (
                        <div key={msg.id} className={`p-4 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">From: {msg.sender}</h4>
                              <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                            </div>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">Reply</Button>
                            <Button size="sm" variant="outline">Archive</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBookings.map(booking => (
                        <div key={booking.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">Booking with {booking.client}</h4>
                              <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                              <p className="text-sm text-gray-600">{booking.type}</p>
                            </div>
                            <Badge variant={
                              booking.status === 'confirmed' ? 'default' : 
                              booking.status === 'pending' ? 'secondary' : 'outline'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                                <Button size="sm" variant="outline">Decline</Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics & Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Profile Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">This Week's Views</span>
                            <span className="font-semibold">284</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Profile Completeness</span>
                            <span className="font-semibold text-green-600">95%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Response Time</span>
                            <span className="font-semibold">< 1 hour</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Popular Search Terms</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">London escort</Badge>
                          <Badge variant="secondary">GFE</Badge>
                          <Badge variant="secondary">Independent</Badge>
                          <Badge variant="secondary">Outcall</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Update Availability
                </Button>
                <Button className="w-full" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Promote Ad
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;