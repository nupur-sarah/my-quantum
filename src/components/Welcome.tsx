
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Welcome: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Add background music
    const audio = new Audio('/assets/audio/background-music.mp3');
    audio.volume = 0.2;
    audio.loop = true;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay prevented. User interaction required.');
      });
    }
    
    setLoaded(true);
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Function to create random position sparkles
  const createSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      };
      sparkles.push(<div key={i} className="sparkle" style={style}></div>);
    }
    return sparkles;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-quantum-softpink via-quantum-cream to-quantum-rosegold">
      {/* Decorative elements */}
      {createSparkles()}
      
      {/* Content */}
      <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <Heart className="mx-auto text-quantum-deeprose h-20 w-20 mb-6 animate-heart-pulse" />
        <h1 className="text-4xl md:text-6xl font-pacifico text-quantum-deeprose mb-6">
          💖 Welcome to My Quantum 💖
        </h1>
        <p className="text-lg md:text-xl font-poppins text-foreground mb-8 max-w-md mx-auto">
          A special place created just for you, my love. Our digital sanctuary of memories and moments.
        </p>
        <Link to="/home">
          <Button className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white font-medium rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Enter Our World
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
