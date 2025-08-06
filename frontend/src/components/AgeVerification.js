import React from 'react';
import { Button } from './ui/button';

const AgeVerification = ({ onVerify }) => {
  const handleTakeBack = () => {
    window.location.href = 'https://www.google.es';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-bold text-2xl inline-block">
            vivastreet
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left">
            <p className="text-gray-700">
              Utilizamos cookies estrictamente necesarias en nuestro sitio web. También nos gustaría utilizar cookies adicionales pero necesitamos su
              consentimiento para esto. Solo estableceremos cookies adicionales si está de acuerdo.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Verificación de edad
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Esta parte del sitio está destinada a personas mayores de 18 años, y se pedirá a los usuarios que verifiquen su edad para acceder a cualquier contenido de naturaleza sexual.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Términos y Condiciones</h3>
            <p className="text-gray-600 text-sm">
              Para acceder a esta categoría, confirmas que has leído y aceptas los{' '}
              <a href="#" className="text-blue-500 hover:underline">Términos y Condiciones</a> y la{' '}
              <a href="#" className="text-blue-500 hover:underline">Política de Privacidad</a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              onClick={handleTakeBack}
              className="px-8 py-3"
            >
              Llévame de vuelta
            </Button>
            <Button
              onClick={onVerify}
              className="bg-green-600 hover:bg-green-700 px-8 py-3"
            >
              Estoy de acuerdo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;