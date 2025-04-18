
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Landing: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setLoaded(true);
    generateFloatingHearts();

    const audio = new Audio('/assets/audio/soft-background.mp3');
    audio.volume = 0.2;
    audio.loop = true;
    
    // Uncomment to enable autoplay (often blocked by browsers)
    // const playPromise = audio.play();
    // if (playPromise !== undefined) {
    //   playPromise.catch(error => {
    //     console.log('Autoplay prevented: ', error);
    //   });
    // }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const generateFloatingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 5;
      const randomDuration = 3 + Math.random() * 7;
      const randomSize = 0.5 + Math.random() * 1.5;

      hearts.push(
        <div 
          key={i}
          className="heart-float"
          style={{
            left: `${randomLeft}%`,
            animation: `float-hearts ${randomDuration}s ease-in-out infinite`,
            animationDelay: `${randomDelay}s`,
            opacity: 0.6 + Math.random() * 0.4,
            transform: `scale(${randomSize})`,
          }}
        >
          <Heart 
            size={24} 
            className="text-quantum-deeprose" 
            fill="#FFDEE2" 
          />
        </div>
      );
    }
    setFloatingHearts(hearts);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 px-4">
      {floatingHearts}
      
      {/* Background sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          className="sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
      
      <div className={`text-center transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-8 animate-heart-pulse">
          <Heart size={80} className="mx-auto text-quantum-deeprose" fill="#FFDEE2" />
        </div>
        
        <h1 className="font-pacifico text-4xl md:text-6xl text-quantum-deeprose mb-6 animate-fade-in">
          💖 Welcome to My Quantum 💖
        </h1>
        
        <p className="text-lg md:text-xl text-quantum-deeprose mb-10 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          A special place created with love, just for you on Husband Appreciation Day
        </p>
        
        <Link 
          to="/home" 
          className="inline-flex items-center gap-2 bg-quantum-deeprose hover:bg-quantum-rosegold text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <span>Enter Our World</span>
          <Heart size={18} className="ml-1" fill="white" />
        </Link>
        
        <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <button 
            className="text-quantum-deeprose hover:text-quantum-rosegold text-sm flex items-center gap-1 mx-auto transition-colors"
            onClick={() => {
              const audio = new Audio('/assets/audio/soft-background.mp3');
              audio.volume = 0.2;
              audio.loop = true;
              audio.play().catch(error => console.log('Playback prevented: ', error));
            }}
          >
            <span>Play Music</span> 
            <span className="text-xs">(♫)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
