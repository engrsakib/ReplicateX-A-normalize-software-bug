import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../../public/lottie/404 Error - Doodle animation.json'; 

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-5">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center">
          <Lottie 
            animationData={animationData} 
            loop={true} 
            className="w-full h-full max-sm:w-[500px]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-200 w-full md:w-auto"
          >
            Back to Home
          </Link>
          
          <Link
            to="/contact-us"
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 w-full md:w-auto"
          >
            Contact with us
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default NotFound;