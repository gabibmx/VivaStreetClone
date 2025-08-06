import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, mode, userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentMode === 'login') {
        // Mock login
        const userData = {
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          phone: formData.phone
        };
        login(userData, userType);
        
        toast({
          title: "¡Bienvenido de nuevo!",
          description: `Sesión iniciada correctamente como ${userType === 'customer' ? 'cliente' : 'modelo'}.`,
        });
      } else {
        // Mock signup
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden.",
            variant: "destructive",
          });
          return;
        }
        
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age
        };
        signup(userData, userType);
        
        toast({
          title: "¡Cuenta creada!",
          description: `Bienvenido a Vivastreet como ${userType === 'customer' ? 'cliente' : 'modelo'}.`,
        });
      }
      
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        age: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo salió mal. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const switchMode = () => {
    setCurrentMode(currentMode === 'login' ? 'signup' : 'login');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: ''
    });
  };

  React.useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentMode === 'login' ? 'Iniciar sesión' : 'Registrarse'} como {userType === 'customer' ? 'Cliente' : 'Modelo'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="pl-10"
                placeholder="Ingresa tu correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {currentMode === 'signup' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Ingresa tu número de teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="18"
                  placeholder="Ingresa tu edad"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="pl-10 pr-10"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {currentMode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="pl-10"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {currentMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-green-600 hover:text-green-700 underline"
            >
              {currentMode === 'login' 
                ? "¿No tienes cuenta? Regístrate" 
                : "¿Ya tienes cuenta? Inicia sesión"
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;