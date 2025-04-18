
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bg-opacity-60 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-quantum-deeprose mr-2" />
            <span className="font-pacifico text-xl text-quantum-deeprose">My Quantum</span>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mb-4">
            Created with love for Husband Appreciation Day
          </p>
          
          <div className="flex space-x-4">
            <span className="text-sm text-muted-foreground">
              Forever & Always, Your Love
            </span>
            <span className="text-quantum-deeprose">❤</span>
            <span className="text-sm text-muted-foreground">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
