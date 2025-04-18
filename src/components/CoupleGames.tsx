
import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

// Sample game data
const wouldYouRatherQuestions = [
  "Would you rather have a romantic picnic under the stars or a cozy night in with movies?",
  "Would you rather go on an adventure holiday or a relaxing beach getaway?",
  "Would you rather have a private dinner at home or go to a fancy restaurant?",
  "Would you rather dance in the rain together or build a snowman together?",
  "Would you rather have morning coffee dates or late-night dessert dates?",
  "Would you rather explore a new city together or revisit our favorite place?",
];

const truthOrDareQuestions = {
  truth: [
    "What was your first impression of me?",
    "What's your favorite memory of us together?",
    "What's one thing you want to do together that we haven't done yet?",
    "What makes you feel most loved by me?",
    "What song makes you think of me?",
    "What's your secret talent that I might not know about?",
  ],
  dare: [
    "Send me a voice message telling me what you love about me.",
    "Strike a pose for a selfie and send it to me.",
    "Write a short poem about our relationship.",
    "Do your best impression of me.",
    "Sing a few lines of our song.",
    "Draw a quick sketch of me from memory.",
  ],
};

const CoupleGames: React.FC = () => {
  const [currentWYRQuestion, setCurrentWYRQuestion] = useState<string>("");
  const [currentTruthDare, setCurrentTruthDare] = useState<{type: string, question: string} | null>(null);
  const [gameType, setGameType] = useState<'wyr' | 'truthdare'>('wyr');
  const [isBreakingIce, setIsBreakingIce] = useState(false);
  const [iceProgress, setIceProgress] = useState(0);

  const getRandomWYR = () => {
    const randomIndex = Math.floor(Math.random() * wouldYouRatherQuestions.length);
    setCurrentWYRQuestion(wouldYouRatherQuestions[randomIndex]);
  };

  const getRandomTruthDare = (type: 'truth' | 'dare') => {
    const questions = truthOrDareQuestions[type];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentTruthDare({type, question: questions[randomIndex]});
  };

  const startBreakingIce = () => {
    setIsBreakingIce(true);
    setIceProgress(0);
    
    const interval = setInterval(() => {
      setIceProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          getRandomWYR();
          setIsBreakingIce(false);
          return 0;
        }
        return prev + 4;
      });
    }, 50);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4">
            Couple Games
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fun games to play together and learn more about each other, one question at a time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Game selection tabs */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setGameType('wyr')}
              className={`px-6 py-3 rounded-l-lg font-medium transition-colors duration-300 ${
                gameType === 'wyr' 
                  ? 'bg-quantum-deeprose text-white' 
                  : 'bg-quantum-softpink text-quantum-deeprose hover:bg-quantum-pink'
              }`}
            >
              Would You Rather
            </button>
            <button 
              onClick={() => setGameType('truthdare')}
              className={`px-6 py-3 rounded-r-lg font-medium transition-colors duration-300 ${
                gameType === 'truthdare' 
                  ? 'bg-quantum-deeprose text-white' 
                  : 'bg-quantum-softpink text-quantum-deeprose hover:bg-quantum-pink'
              }`}
            >
              Truth or Dare
            </button>
          </div>

          {/* Game content */}
          <div className="love-card min-h-[300px] flex flex-col">
            {gameType === 'wyr' ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-xl font-pacifico text-quantum-deeprose mb-4">
                    Break The Ice
                  </h3>
                  
                  {!isBreakingIce && !currentWYRQuestion && (
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <img 
                        src="/assets/images/ice-cube.png"
                        alt="Ice Cube" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.textContent = "🧊";
                          e.currentTarget.style.fontSize = "6rem";
                          e.currentTarget.style.display = "flex";
                          e.currentTarget.style.justifyContent = "center";
                          e.currentTarget.style.alignItems = "center";
                        }}
                      />
                    </div>
                  )}

                  {isBreakingIce && (
                    <div className="mb-6">
                      <div className="w-full bg-quantum-softpink rounded-full h-4 mb-2">
                        <div 
                          className="bg-quantum-deeprose h-4 rounded-full transition-all duration-300" 
                          style={{ width: `${iceProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Breaking the ice... {iceProgress}%</p>
                    </div>
                  )}

                  {!isBreakingIce && currentWYRQuestion && (
                    <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in">
                      <p className="text-lg">{currentWYRQuestion}</p>
                    </div>
                  )}
                </div>

                <div className="mt-auto text-center">
                  <button
                    onClick={currentWYRQuestion ? getRandomWYR : startBreakingIce}
                    disabled={isBreakingIce}
                    className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white rounded-full px-6 py-3 transition-colors duration-300 shadow-md flex items-center justify-center mx-auto"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    {currentWYRQuestion ? "New Question" : "Break The Ice"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-xl font-pacifico text-quantum-deeprose mb-4">
                    Truth or Dare
                  </h3>

                  {currentTruthDare ? (
                    <div className={`bg-white rounded-lg p-6 shadow-md animate-fade-in ${
                      currentTruthDare.type === 'truth' ? 'border-l-4 border-blue-400' : 'border-l-4 border-pink-400'
                    }`}>
                      <div className="mb-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs text-white ${
                          currentTruthDare.type === 'truth' ? 'bg-blue-400' : 'bg-pink-400'
                        }`}>
                          {currentTruthDare.type === 'truth' ? 'Truth' : 'Dare'}
                        </span>
                      </div>
                      <p className="text-lg">{currentTruthDare.question}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-4 mt-6">
                      <button 
                        onClick={() => getRandomTruthDare('truth')}
                        className="bg-blue-400 hover:bg-blue-500 text-white rounded-lg px-6 py-3 transition-colors duration-300 shadow-md w-32"
                      >
                        Truth
                      </button>
                      <button 
                        onClick={() => getRandomTruthDare('dare')}
                        className="bg-pink-400 hover:bg-pink-500 text-white rounded-lg px-6 py-3 transition-colors duration-300 shadow-md w-32"
                      >
                        Dare
                      </button>
                    </div>
                  )}
                </div>

                {currentTruthDare && (
                  <div className="mt-auto text-center">
                    <button
                      onClick={() => setCurrentTruthDare(null)}
                      className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white rounded-full px-6 py-3 transition-colors duration-300 shadow-md flex items-center justify-center mx-auto"
                    >
                      <Shuffle className="w-5 h-5 mr-2" />
                      New Question
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleGames;
