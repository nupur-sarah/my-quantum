
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeGreeting {
  greeting: string;
  quote: string;
  time: string;
}

const morningGreetings: TimeGreeting[] = [
  { 
    greeting: "Good morning, my sunshine", 
    quote: "Each morning I wake up to the thought of you, and my day becomes instantly brighter.",
    time: "morning"
  },
  { 
    greeting: "Rise and shine, my love", 
    quote: "A new day with you is always worth celebrating.",
    time: "morning" 
  },
  { 
    greeting: "Hello, handsome", 
    quote: "Waking up to your smile is the greatest blessing.",
    time: "morning"
  }
];

const afternoonGreetings: TimeGreeting[] = [
  { 
    greeting: "Hope your day is going well, my love", 
    quote: "Thinking of you in the middle of my day makes everything better.",
    time: "afternoon"
  },
  { 
    greeting: "Afternoon thoughts of you", 
    quote: "No matter how busy we get, you're always on my mind.",
    time: "afternoon" 
  },
  { 
    greeting: "Missing you this afternoon", 
    quote: "Every hour that passes brings me closer to seeing you again.",
    time: "afternoon"
  }
];

const eveningGreetings: TimeGreeting[] = [
  { 
    greeting: "Good evening, my hero", 
    quote: "After a long day, thinking of you brings me peace.",
    time: "evening"
  },
  { 
    greeting: "Evening thoughts for you", 
    quote: "As the day winds down, my love for you only grows stronger.",
    time: "evening" 
  },
  { 
    greeting: "Winding down with thoughts of you", 
    quote: "The best part of my evening is knowing we're together.",
    time: "evening"
  }
];

const nightGreetings: TimeGreeting[] = [
  { 
    greeting: "Sweet dreams, my love", 
    quote: "As you lay down to sleep, know that you are deeply loved.",
    time: "night"
  },
  { 
    greeting: "Rest well, my king", 
    quote: "Tonight and always, my heart belongs to you.",
    time: "night" 
  },
  { 
    greeting: "Goodnight to my everything", 
    quote: "Even in dreams, we're never truly apart.",
    time: "night"
  }
];

const TimeGreeting: React.FC = () => {
  const [currentGreeting, setCurrentGreeting] = useState<TimeGreeting | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Format the current time
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
      setCurrentTime(formattedTime);
      
      // Determine time of day and select appropriate greetings
      let greetings;
      if (hours >= 5 && hours < 12) {
        setTimeOfDay('morning');
        greetings = morningGreetings;
      } else if (hours >= 12 && hours < 17) {
        setTimeOfDay('afternoon');
        greetings = afternoonGreetings;
      } else if (hours >= 17 && hours < 22) {
        setTimeOfDay('evening');
        greetings = eveningGreetings;
      } else {
        setTimeOfDay('night');
        greetings = nightGreetings;
      }
      
      // Select a random greeting from the appropriate array
      const randomIndex = Math.floor(Math.random() * greetings.length);
      setCurrentGreeting(greetings[randomIndex]);
    };
    
    // Update greeting immediately and then set interval
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4 text-quantum-deeprose">
        <Clock className="mr-2" />
        <span className="text-lg font-medium">{currentTime}</span>
      </div>
      
      {currentGreeting && (
        <>
          <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-2">
            {currentGreeting.greeting}
          </h2>
          <p className="text-lg text-muted-foreground italic">
            "{currentGreeting.quote}"
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {timeOfDay === 'morning' && '☀️ Have a wonderful day ahead'}
            {timeOfDay === 'afternoon' && '🌤️ Hope your day is going well'}
            {timeOfDay === 'evening' && '🌆 Winding down together'}
            {timeOfDay === 'night' && '🌙 Rest well tonight'}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeGreeting;
