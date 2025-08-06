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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Perfil no encontrado</h1>
          <Link to="/">
            <Button>Volver a explorar</Button>
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
    alert(`Contactando con ${profile.name} vía ${type}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver a explorar
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                Guardar
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Reportar
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
                    alt={`${profile.name} - Imagen ${currentImageIndex + 1}`}
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
                        ID Verificado
                      </Badge>
                    )}
                    {profile.featured && (
                      <Badge className="bg-orange-500 text-white">
                        DESTACADO
                      </Badge>
                    )}
                    {profile.online && (
                      <Badge className="bg-green-500 text-white">
                        <Clock className="h-4 w-4 mr-2" />
                        En línea ahora
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
                          alt={`Miniatura ${index + 1}`}
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
                    <span className="text-sm text-gray-500">Edad</span>
                    <p className="font-semibold">{profile.age} años</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Etnia</span>
                    <p className="font-semibold">{profile.ethnicity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Categoría</span>
                    <p className="font-semibold">{profile.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Estado</span>
                    <p className={`font-semibold ${profile.online ? 'text-green-600' : 'text-gray-500'}`}>
                      {profile.online ? 'En línea' : 'Desconectada'}
                    </p>
                  </div>
                </div>

                {/* Rates */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Tarifas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">En mi lugar</span>
                      <p className="font-semibold text-lg">{profile.incall}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">A domicilio</span>
                      <p className="font-semibold text-lg">{profile.outcall}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleContact('teléfono')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar ahora
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('mensaje')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar mensaje
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('cita')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Reservar cita
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Servicios ofrecidos</h3>
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
                  <TabsTrigger value="description">Descripción</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                  <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{profile.description}</p>
                    
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Sobre mí</h4>
                        <p className="text-gray-600 text-sm">
                          Soy una acompañante profesional y discreta que disfruta conocer gente nueva y crear 
                          experiencias memorables. Me enorgullezco de brindar un excelente servicio y asegurarme de que mis 
                          clientes se sientan cómodos y satisfechos.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Lo que ofrezco</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Servicio profesional y discreto</li>
                          <li>• Excelente higiene y presentación</li>
                          <li>• Puntual y confiable</li>
                          <li>• Ambiente seguro y limpio</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Reseñas de clientes</h4>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">4.8</span>
                        <span className="ml-1 text-gray-500">(24 reseñas)</span>
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
                              <span className="ml-2 text-sm text-gray-500">Anónimo</span>
                            </div>
                            <span className="text-sm text-gray-500">hace 2 días</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Excelente servicio y muy profesional. Definitivamente recomendaría y visitaría de nuevo.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="availability" className="mt-6">
                  <div>
                    <h4 className="font-semibold mb-3">Disponibilidad</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span>Lunes</span>
                        <span className="text-green-600">9:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Martes</span>
                        <span className="text-green-600">9:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Miércoles</span>
                        <span className="text-green-600">9:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Jueves</span>
                        <span className="text-green-600">9:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Viernes</span>
                        <span className="text-green-600">9:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Sábado</span>
                        <span className="text-green-600">10:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Domingo</span>
                        <span className="text-red-600">Cerrado</span>
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