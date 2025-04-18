
import React, { useState, useRef } from 'react';

// Sample voice notes data
const voiceNotes = [
  {
    id: 1,
    title: "The Day We Met",
    description: "Remembering the magical moment when our eyes first met",
    src: "/assets/audio/voice-note-1.mp3",
    fallbackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Why I Love You",
    description: "All the little things that make you special to me",
    src: "/assets/audio/voice-note-2.mp3",
    fallbackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Our Future Together",
    description: "Dreams and wishes for our journey ahead",
    src: "/assets/audio/voice-note-3.mp3",
    fallbackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
];

const VoiceFromHeart: React.FC = () => {
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (index: number) => {
    // Pause all audio first
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
      }
    });
    
    // Play or pause selected audio
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setActiveNote(index);
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleEnded = () => {
    setActiveNote(null);
    setIsPlaying(false);
  };

  const handleError = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.src = voiceNotes[index].fallbackSrc;
      audio.load();
      console.log(`Using fallback audio for note ${index + 1}`);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4">
            Voice From the Heart
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Listen to my heartfelt messages, recorded just for you. Each voice note carries a piece of my heart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {voiceNotes.map((note, index) => (
            <div key={note.id} className="love-card group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-pacifico text-quantum-deeprose">
                  {note.title}
                </h3>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeNote === index ? 'bg-quantum-pink' : 'bg-quantum-cream'}`}>
                  <div 
                    className={`w-3 h-3 rounded-full bg-quantum-deeprose ${activeNote === index ? 'animate-heart-pulse' : ''}`}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {note.description}
              </p>
              
              <div className="relative">
                <button
                  onClick={() => handlePlay(index)}
                  className="w-full py-3 px-4 rounded-lg bg-quantum-softpink hover:bg-quantum-pink transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {activeNote === index && isPlaying ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Play Message
                    </>
                  )}
                </button>
                
                <audio
                  ref={el => audioRefs.current[index] = el}
                  src={note.src}
                  onEnded={handleEnded}
                  onError={() => handleError(index)}
                />
              </div>

              {activeNote === index && (
                <div className="mt-4 flex justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="mx-1 text-quantum-pink text-2xl animate-float" 
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceFromHeart;
