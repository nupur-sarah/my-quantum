
import React from 'react';
import { motion } from 'framer-motion';

const HomeOfUs: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-white">
              <img 
                src="/assets/images/our-cute-photo.jpg" 
                alt="Our Beautiful Moments" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback if image cannot be loaded
                  e.currentTarget.src = "https://images.unsplash.com/photo-1522825105549-ce4284929e58?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3";
                }}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4"
            >
              Home of Us
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-medium text-foreground mb-4">
                "Every moment with you feels like coming home."
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                From our first hello to forever, this journey with you has been the greatest adventure of my life. 
                Happy Husband Appreciation Day to the man who makes my world complete.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-quantum-rosegold">
                <span className="px-4 py-2 rounded-full bg-quantum-pink bg-opacity-50 inline-flex items-center">
                  <span className="mr-1">❤️</span> Forever Yours
                </span>
                <span className="px-4 py-2 rounded-full bg-quantum-pink bg-opacity-50 inline-flex items-center">
                  <span className="mr-1">✨</span> My Quantum
                </span>
                <span className="px-4 py-2 rounded-full bg-quantum-pink bg-opacity-50 inline-flex items-center">
                  <span className="mr-1">🔮</span> Eternally Connected
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOfUs;
