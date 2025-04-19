
import React from 'react';
import TimeGreeting from '@/components/TimeGreeting';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TextToSpeech from '@/components/TextToSpeech';
import ParticleBackground from '@/components/ParticleBackground';
import MemoryMap from '@/components/MemoryMap';
import PoemGenerator from '@/components/PoemGenerator';
import { Heart, Calendar, PenTool, Share2, Lock, Map, Sparkles } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground type="hearts" density="low" />
      
      <div className="container px-4 py-10 mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-pacifico text-quantum-deeprose mb-4">
            Special Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover all the ways to express and celebrate your love with these special features
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-6 flex items-center">
              <Heart className="mr-2" fill="#FFDEE2" />
              Time-Synced Love
            </h2>
            <TimeGreeting />
          </div>
          
          <div>
            <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-6 flex items-center">
              <Calendar className="mr-2" />
              Theme Colors
            </h2>
            <ThemeSwitcher />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-6 flex items-center">
            <PenTool className="mr-2" />
            Text-to-Speech Love Letter
          </h2>
          <TextToSpeech />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-6 flex items-center">
            <Map className="mr-2" />
            Memory Map
          </h2>
          <MemoryMap />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-pacifico text-quantum-deeprose mb-6 flex items-center">
            <Sparkles className="mr-2" />
            Love Poem Generator
          </h2>
          <PoemGenerator />
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Previews */}
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="text-quantum-deeprose h-5 w-5" />
              <h3 className="text-lg font-pacifico text-quantum-deeprose">Share Card</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Create custom shareable cards with love quotes and your personal touch.
            </p>
            <div className="mt-4">
              <button className="text-sm text-quantum-deeprose hover:text-quantum-rosegold transition-colors">
                Coming soon...
              </button>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-quantum-deeprose h-5 w-5" />
              <h3 className="text-lg font-pacifico text-quantum-deeprose">Love Vault</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Store your deepest thoughts, private moments, and special memories securely.
            </p>
            <div className="mt-4">
              <button className="text-sm text-quantum-deeprose hover:text-quantum-rosegold transition-colors">
                Coming soon...
              </button>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-quantum-deeprose h-5 w-5" />
              <h3 className="text-lg font-pacifico text-quantum-deeprose">Calendar Reminder</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Add special date reminders directly to your calendar app.
            </p>
            <div className="mt-4">
              <button className="text-sm text-quantum-deeprose hover:text-quantum-rosegold transition-colors">
                Coming soon...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
