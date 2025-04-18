
import React, { useState, useRef } from 'react';
import { Heart, Smile } from 'lucide-react';

const VirtualHugKiss: React.FC = () => {
  const [showHearts, setShowHearts] = useState<boolean>(false);
  const [showSmiles, setShowSmiles] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const createFloatingElements = (
    type: 'hearts' | 'smiles',
    count: number,
    container: HTMLDivElement
  ) => {
    // Clear any existing elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      element.className = 'heart-float animate-float-hearts';
      element.style.left = `${Math.random() * 100}%`;
      element.style.bottom = '0';
      element.style.animationDelay = `${Math.random() * 0.5}s`;
      element.style.animationDuration = `${2 + Math.random() * 2}s`;
      element.style.fontSize = `${20 + Math.random() * 30}px`;
      element.textContent = type === 'hearts' ? '❤️' : '😊';
      container.appendChild(element);
    }
  };

  const handleHug = () => {
    if (showHearts) return;

    setShowHearts(true);
    setShowSmiles(false);

    try {
      if (audioRef.current) {
        audioRef.current.src = '/assets/audio/hug-sound.mp3';
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(error => {
          console.log('Audio play prevented. User interaction required.');
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }

    const container = document.getElementById('floatingElements') as HTMLDivElement;
    if (container) {
      createFloatingElements('hearts', 20, container);
    }

    // Reset after animation completes
    animationRef.current = window.setTimeout(() => {
      setShowHearts(false);
    }, 4000);
  };

  const handleKiss = () => {
    if (showSmiles) return;

    setShowSmiles(true);
    setShowHearts(false);

    try {
      if (audioRef.current) {
        audioRef.current.src = '/assets/audio/kiss-sound.mp3';
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(error => {
          console.log('Audio play prevented. User interaction required.');
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }

    const container = document.getElementById('floatingElements') as HTMLDivElement;
    if (container) {
      createFloatingElements('smiles', 20, container);
    }

    // Reset after animation completes
    animationRef.current = window.setTimeout(() => {
      setShowSmiles(false);
    }, 4000);
  };

  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <audio ref={audioRef} />
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4">
            Virtual Hug & Kiss
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Even when we're apart, feel my love with these virtual embraces.
          </p>
        </div>

        <div className="max-w-3xl mx-auto love-card text-center py-12">
          <p className="text-lg mb-8">
            Missing you? Here's a little something to brighten your day.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button
              onClick={handleHug}
              className="bg-quantum-softpink hover:bg-quantum-pink text-quantum-deeprose flex items-center justify-center rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Smile className="w-6 h-6 mr-3" />
              <span className="text-lg font-medium">Hug Me 🤗</span>
            </button>
            
            <button
              onClick={handleKiss}
              className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white flex items-center justify-center rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-3" />
              <span className="text-lg font-medium">Kiss Me 💋</span>
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className={`text-quantum-deeprose transform transition-all duration-300 ${showHearts || showSmiles ? 'scale-110' : 'scale-100'}`}>
              {showHearts ? "Sending you the warmest virtual hug! 💕" : ""}
              {showSmiles ? "Sending you a sweet virtual kiss! 💋" : ""}
              {!showHearts && !showSmiles ? "Click a button to feel my love!" : ""}
            </p>
          </div>
        </div>
      </div>
      
      {/* Container for floating elements */}
      <div 
        id="floatingElements" 
        className="absolute inset-0 overflow-hidden pointer-events-none"
      ></div>
    </section>
  );
};

export default VirtualHugKiss;
