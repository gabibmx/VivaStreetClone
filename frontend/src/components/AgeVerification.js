import React from 'react';
import { Button } from './ui/button';

const AgeVerification = ({ onVerify }) => {
  const handleTakeBack = () => {
    window.location.href = 'https://www.google.com';
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
              We use strictly necessary cookies on our website. We would also like to use additional cookies but we need your
              consent to this. We will only set additional cookies if you agree.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Get verified
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This part of the Site is intended for those aged 18 and above, and users will be prompted to verify their age to access any content of a sexual nature.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms and Conditions</h3>
            <p className="text-gray-600 text-sm">
              To access this category, you confirm that you have read and agree to the{' '}
              <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> and{' '}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              onClick={handleTakeBack}
              className="px-8 py-3"
            >
              Take Me Back
            </Button>
            <Button
              onClick={onVerify}
              className="bg-green-600 hover:bg-green-700 px-8 py-3"
            >
              I Agree
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;