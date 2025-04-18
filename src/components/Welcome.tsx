
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 animate-heart-pulse">
        <Heart size={64} className="mx-auto text-quantum-deeprose" fill="#FFDEE2" />
      </div>
      
      <h1 className="font-pacifico text-3xl md:text-5xl lg:text-6xl text-quantum-deeprose mb-6 animate-fade-in">
        💖 Welcome to My Quantum 💖
      </h1>
      
      <p className="text-lg md:text-xl text-quantum-deeprose mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
        A special place created just for you, where our love story unfolds in digital petals
      </p>
      
      <Link 
        to="/home" 
        className="bg-quantum-deeprose hover:bg-quantum-rosegold text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center animate-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        <span>Begin Our Journey</span>
        <Heart size={16} className="ml-2" fill="white" />
      </Link>
    </div>
  );
};

export default Welcome;
