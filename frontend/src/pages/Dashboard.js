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
    location: 'Madrid',
    description: 'Acompañante profesional y discreta...',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    services: ['Experiencia de Novia', 'Cenas'],
    incall: '€150/h',
    outcall: '€200/h'
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
    { id: 1, sender: 'Juan D.', message: 'Hola, me gustaría reservar una cita...', time: 'hace 2 horas', unread: true },
    { id: 2, sender: 'Miguel S.', message: '¡Gracias por el excelente servicio!', time: 'hace 1 día', unread: false },
    { id: 3, sender: 'David L.', message: '¿Estás disponible mañana por la noche?', time: 'hace 2 días', unread: false }
  ];

  const mockBookings = [
    { id: 1, client: 'Anónimo', date: '15/01/2024', time: '19:00', status: 'confirmado', type: 'A domicilio' },
    { id: 2, client: 'Anónimo', date: '18/01/2024', time: '15:00', status: 'pendiente', type: 'En mi lugar' },
    { id: 3, client: 'Anónimo', date: '20/01/2024', time: '20:00', status: 'completado', type: 'A domicilio' }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Mock profile update
    alert('¡Perfil actualizado correctamente!');
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Cliente</h1>
            <p className="text-gray-600">Bienvenido de nuevo, {currentUser?.name}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Favoritos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Mensajes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Reservas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-gray-600">Reseñas dadas</p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="favorites" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                  <TabsTrigger value="messages">Mensajes</TabsTrigger>
                  <TabsTrigger value="bookings">Reservas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="favorites" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tus perfiles favoritos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map(item => (
                          <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                              <div>
                                <h4 className="font-semibold">Sofía</h4>
                                <p className="text-sm text-gray-600">Madrid • 23 años</p>
                                <p className="text-sm text-green-600">En línea ahora</p>
                              </div>
                            </div>
                            <Button size="sm">Contactar</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mensajes recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockMessages.map(msg => (
                          <div key={msg.id} className={`p-4 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">De: {msg.sender}</h4>
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
                      <CardTitle>Tus reservas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBookings.map(booking => (
                          <div key={booking.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">Reserva con {booking.client}</h4>
                                <p className="text-sm text-gray-600">{booking.date} a las {booking.time}</p>
                                <p className="text-sm text-gray-600">{booking.type}</p>
                              </div>
                              <Badge variant={
                                booking.status === 'confirmado' ? 'default' : 
                                booking.status === 'pendiente' ? 'secondary' : 'outline'
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
                  <CardTitle>Configuración de cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Nombre</Label>
                    <Input id="customer-name" value={currentUser?.name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Correo electrónico</Label>
                    <Input id="customer-email" type="email" value={currentUser?.email || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Teléfono</Label>
                    <Input id="customer-phone" type="tel" value={currentUser?.phone || ''} />
                  </div>
                  <Button className="w-full">Actualizar configuración</Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Modelo</h1>
          <p className="text-gray-600">Bienvenida de nuevo, {currentUser?.name}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.profileViews}</p>
                <p className="text-sm text-gray-600">Vistas del perfil</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.favorites}</p>
                <p className="text-sm text-gray-600">Favoritos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.messages}</p>
                <p className="text-sm text-gray-600">Mensajes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.bookings}</p>
                <p className="text-sm text-gray-600">Reservas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">{mockStats.rating}</p>
                <p className="text-sm text-gray-600">Calificación ({mockStats.reviews})</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="messages">Mensajes</TabsTrigger>
                <TabsTrigger value="bookings">Reservas</TabsTrigger>
                <TabsTrigger value="analytics">Estadísticas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Editar perfil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Edad</Label>
                          <Input
                            id="age"
                            type="number"
                            value={profile.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Ubicación</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={profile.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="incall">Tarifa en mi lugar</Label>
                          <Input
                            id="incall"
                            value={profile.incall}
                            onChange={(e) => handleInputChange('incall', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="outcall">Tarifa a domicilio</Label>
                          <Input
                            id="outcall"
                            value={profile.outcall}
                            onChange={(e) => handleInputChange('outcall', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Fotos</Label>
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
                        Actualizar perfil
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mensajes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMessages.map(msg => (
                        <div key={msg.id} className={`p-4 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">De: {msg.sender}</h4>
                              <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                            </div>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">Responder</Button>
                            <Button size="sm" variant="outline">Archivar</Button>
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
                    <CardTitle>Reservas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBookings.map(booking => (
                        <div key={booking.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">Reserva con {booking.client}</h4>
                              <p className="text-sm text-gray-600">{booking.date} a las {booking.time}</p>
                              <p className="text-sm text-gray-600">{booking.type}</p>
                            </div>
                            <Badge variant={
                              booking.status === 'confirmado' ? 'default' : 
                              booking.status === 'pendiente' ? 'secondary' : 'outline'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Ver detalles</Button>
                            {booking.status === 'pendiente' && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">Aceptar</Button>
                                <Button size="sm" variant="outline">Rechazar</Button>
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
                    <CardTitle>Análisis y estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Rendimiento del perfil</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Vistas esta semana</span>
                            <span className="font-semibold">284</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Perfil completado</span>
                            <span className="font-semibold text-green-600">95%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tiempo de respuesta</span>
                            <span className="font-semibold">&lt; 1 hora</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Términos de búsqueda populares</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Escort Madrid</Badge>
                          <Badge variant="secondary">Experiencia novia</Badge>
                          <Badge variant="secondary">Independiente</Badge>
                          <Badge variant="secondary">A domicilio</Badge>
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
                <CardTitle>Acciones rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Actualizar disponibilidad
                </Button>
                <Button className="w-full" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Subir fotos
                </Button>
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración de cuenta
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Promocionar anuncio
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
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