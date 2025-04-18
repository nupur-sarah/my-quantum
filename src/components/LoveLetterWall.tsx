
import React, { useState } from 'react';

// Sample love notes data
const loveNotes = [
  {
    id: 1,
    content: "Your smile is my favorite part of every day. The way your eyes light up makes my world brighter.",
    date: "April 18, 2025",
    color: "bg-quantum-pink",
  },
  {
    id: 2,
    content: "Thank you for always listening to my stories, even when I tell them for the hundredth time.",
    date: "April 17, 2025",
    color: "bg-quantum-cream",
  },
  {
    id: 3,
    content: "I love the way you hold my hand in public, like you're proud to have me by your side.",
    date: "April 16, 2025",
    color: "bg-quantum-rosegold",
  },
  {
    id: 4,
    content: "Your strength during tough times inspires me to be a better person every day.",
    date: "April 15, 2025",
    color: "bg-quantum-softpink",
  },
  {
    id: 5,
    content: "I cherish our quiet moments together - just us, breathing the same air, sharing the same space.",
    date: "April 14, 2025",
    color: "bg-quantum-cream",
  },
  {
    id: 6,
    content: "Your kindness to others is one of the countless reasons I fall in love with you more each day.",
    date: "April 13, 2025",
    color: "bg-quantum-pink",
  },
  {
    id: 7,
    content: "I still get butterflies when I see your name pop up on my phone.",
    date: "April 12, 2025",
    color: "bg-quantum-softpink",
  },
  {
    id: 8,
    content: "Thank you for being my safe place in this sometimes chaotic world.",
    date: "April 11, 2025",
    color: "bg-quantum-rosegold",
  },
  {
    id: 9,
    content: "I'm grateful for every second of this beautiful life we're building together.",
    date: "April 10, 2025",
    color: "bg-quantum-cream",
  },
];

const LoveLetterWall: React.FC = () => {
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  const toggleNote = (id: number) => {
    if (expandedNote === id) {
      setExpandedNote(null);
    } else {
      setExpandedNote(id);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4">
            Love Letter Wall
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Little notes straight from my heart to yours. Click on each note to read my thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loveNotes.map((note) => (
            <div 
              key={note.id}
              className={`${note.color} rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ${
                expandedNote === note.id ? 'scale-105 z-10 shadow-lg' : 'hover:scale-102'
              }`}
              style={{ minHeight: '200px' }}
            >
              <button 
                className="w-full h-full p-6 text-left focus:outline-none"
                onClick={() => toggleNote(note.id)}
              >
                <div className="flex flex-col h-full">
                  <div className={`font-pacifico text-lg mb-2 ${
                    expandedNote === note.id ? 'text-quantum-deeprose' : 'text-primary-foreground'
                  }`}>
                    {note.date}
                  </div>
                  
                  <div className={`flex-grow flex items-center justify-center transition-all duration-500 ${
                    expandedNote === note.id ? 'opacity-100' : 'opacity-70'
                  }`}>
                    {expandedNote === note.id ? (
                      <p className="text-center text-primary-foreground">
                        {note.content}
                      </p>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl">💌</span>
                        <p className="mt-2 text-sm text-primary-foreground">Click to open</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white rounded-full px-6 py-3 transition-colors duration-300 shadow-md">
            Schedule a New Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoveLetterWall;
