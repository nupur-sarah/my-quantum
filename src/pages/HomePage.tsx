
import React from 'react';
import HomeOfUs from '@/components/HomeOfUs';
import VoiceFromHeart from '@/components/VoiceFromHeart';
import PhotoMemories from '@/components/PhotoMemories';
import LoveLetterWall from '@/components/LoveLetterWall';
import CoupleGames from '@/components/CoupleGames';
import VirtualHugKiss from '@/components/VirtualHugKiss';

const HomePage: React.FC = () => {
  return (
    <>
      <HomeOfUs />
      <VoiceFromHeart />
      <PhotoMemories />
      <LoveLetterWall />
      <CoupleGames />
      <VirtualHugKiss />
    </>
  );
};

export default HomePage;
