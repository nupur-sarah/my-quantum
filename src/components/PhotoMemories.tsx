
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample photos data
const photos = [
  {
    id: 1,
    title: "First Date",
    then: "/assets/images/then-first-date.jpg",
    now: "/assets/images/now-recent.jpg",
    date: "January 15, 2020",
    description: "From our nervous first date to confidently in love",
    thenFallback: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3",
    nowFallback: "https://images.unsplash.com/photo-1621946127851-af3847a0d07f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Our Wedding",
    then: "/assets/images/then-wedding.jpg",
    now: "/assets/images/now-anniversary.jpg",
    date: "June 5, 2022",
    description: "The day we said 'I do' and our recent anniversary celebration",
    thenFallback: "https://images.unsplash.com/photo-1606216794074-735e91daffef?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
    nowFallback: "https://images.unsplash.com/photo-1525459819832-2d4cb1573efd?auto=format&fit=crop&q=80&w=2376&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Vacation Memories",
    then: "/assets/images/then-vacation.jpg",
    now: "/assets/images/now-recent-trip.jpg",
    date: "August 12, 2023",
    description: "Our first weekend getaway and our most recent adventure",
    thenFallback: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2421&ixlib=rb-4.0.3",
    nowFallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
  }
];

// Timeline milestones
const timeline = [
  { id: 1, title: "First Date", icon: "💕", date: "Jan 2020" },
  { id: 2, title: "Proposal", icon: "💍", date: "Dec 2021" },
  { id: 3, title: "Wedding", icon: "👰", date: "Jun 2022" },
  { id: 4, title: "Honeymoon", icon: "🏝️", date: "Jul 2022" },
  { id: 5, title: "New Home", icon: "🏡", date: "Mar 2023" }
];

const PhotoMemories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'then' | 'now') => {
    const target = e.target as HTMLImageElement;
    const currentPhoto = photos[currentIndex];
    target.src = type === 'then' ? currentPhoto.thenFallback : currentPhoto.nowFallback;
  };
  
  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-pacifico text-quantum-deeprose mb-4">
            Memories Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey through photographs, from where we began to where we are now.
          </p>
        </div>
        
        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl shadow-xl">
            <div className="absolute inset-0 flex">
              {/* Then Photo */}
              <div className="w-1/2 p-1">
                <div className="h-full relative overflow-hidden rounded-lg">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    Then
                  </div>
                  <img
                    src={photos[currentIndex].then}
                    alt={`Then: ${photos[currentIndex].title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, 'then')}
                  />
                </div>
              </div>
              
              {/* Now Photo */}
              <div className="w-1/2 p-1">
                <div className="h-full relative overflow-hidden rounded-lg">
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    Now
                  </div>
                  <img
                    src={photos[currentIndex].now}
                    alt={`Now: ${photos[currentIndex].title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, 'now')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Caption */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-pacifico text-quantum-deeprose">
              {photos[currentIndex].title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {photos[currentIndex].date} - {photos[currentIndex].description}
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 text-quantum-deeprose" />
          </button>
          
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 text-quantum-deeprose" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-quantum-deeprose' : 'bg-quantum-pink'}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-pacifico text-quantum-deeprose text-center mb-6">
            Our Journey Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-quantum-pink"></div>
            
            {/* Timeline items */}
            <div className="relative flex justify-between">
              {timeline.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-quantum-rosegold flex items-center justify-center text-lg z-10 mb-2">
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoMemories;
