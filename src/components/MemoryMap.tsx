
import React, { useState, useEffect } from 'react';
import { Map, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationMarker {
  id: string;
  name: string;
  description: string;
  date: string;
  image: string;
  lat: number;
  lng: number;
}

const MemoryMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<LocationMarker | null>(null);
  const [showingMap, setShowingMap] = useState(false);
  
  // Sample location markers - you would replace these with your own
  const locationMarkers: LocationMarker[] = [
    {
      id: '1',
      name: 'First Date',
      description: 'Where we first met and knew there was something special between us.',
      date: 'June 14, 2018',
      image: '/assets/images/first-date.jpg',
      lat: 40.712776,
      lng: -74.005974
    },
    {
      id: '2',
      name: 'Wedding Day',
      description: 'The most beautiful day of our lives, when we said "I do".',
      date: 'September 22, 2020',
      image: '/assets/images/wedding.jpg',
      lat: 34.052235,
      lng: -118.243683
    },
    {
      id: '3',
      name: 'Favorite Vacation',
      description: 'That amazing trip where we watched the sunset from the beach.',
      date: 'July 10, 2022',
      image: '/assets/images/vacation.jpg',
      lat: 21.306944,
      lng: -157.858337
    }
  ];

  const selectMarker = (marker: LocationMarker) => {
    setSelectedMarker(marker);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-quantum-deeprose font-pacifico gap-2">
          <Map className="h-5 w-5" />
          Our Memory Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showingMap ? (
          <div className="flex flex-col items-center p-6 space-y-4">
            <p className="text-center text-muted-foreground">
              Explore the special places that hold our dearest memories together.
            </p>
            <Button
              onClick={() => setShowingMap(true)}
              className="bg-quantum-deeprose hover:bg-quantum-rosegold px-6"
            >
              View Our Memory Map
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Note: This is a placeholder. To implement the full map with markers, we'll need to
              integrate with a maps API like Google Maps or Leaflet.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="w-full h-64 bg-slate-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                Map placeholder - Integration with Google Maps or Leaflet required
              </p>
              
              {/* This would be replaced with actual map implementation */}
              <div className="absolute top-0 left-0 right-0 bottom-0">
                {locationMarkers.map(marker => (
                  <button
                    key={marker.id}
                    className="absolute bg-quantum-deeprose text-white p-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{ 
                      left: `${Math.random() * 80 + 10}%`, 
                      top: `${Math.random() * 80 + 10}%` 
                    }}
                    onClick={() => selectMarker(marker)}
                  >
                    <Map size={16} />
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setShowingMap(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <X size={18} />
            </button>

            {selectedMarker && (
              <div className="mt-4 p-4 border rounded-md bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-pacifico text-quantum-deeprose text-xl">
                    {selectedMarker.name}
                  </h3>
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  {selectedMarker.date}
                </div>
                
                <div className="mt-3 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3 bg-slate-100 rounded-md flex items-center justify-center h-24">
                    <p className="text-xs text-muted-foreground text-center p-2">
                      Image placeholder<br/>
                      ({selectedMarker.image})
                    </p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-muted-foreground text-sm">
                      {selectedMarker.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryMap;
