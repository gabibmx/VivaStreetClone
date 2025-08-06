import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const { currentUser, userType, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authUserType, setAuthUserType] = useState('customer');

  const handleShowAuth = (mode, type) => {
    setAuthMode(mode);
    setAuthUserType(type);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                vivastreet
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Explorar
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
                Ayuda
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  >
                    Publicar anuncio
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        {currentUser.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Panel de control
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  >
                    Publicar anuncio
                  </Button>
                  
                  <div className="hidden md:flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShowAuth('login', 'customer')}
                          className="text-sm"
                        >
                          Iniciar sesión cliente
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShowAuth('signup', 'customer')}
                          className="text-sm"
                        >
                          Registrarse cliente
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShowAuth('login', 'model')}
                          className="text-sm text-green-600"
                        >
                          Iniciar sesión modelo
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShowAuth('signup', 'model')}
                          className="text-sm text-green-600"
                        >
                          Registrarse modelo
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile menu */}
                  <div className="md:hidden">
                    <Button 
                      variant="outline"
                      onClick={() => handleShowAuth('login', 'customer')}
                    >
                      Iniciar sesión
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        userType={authUserType}
      />
    </>
  );
};

export default Header;