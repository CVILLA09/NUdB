'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function Home() {
  const [isNight, setIsNight] = useState(false);

  const toggleTheme = () => {
    setIsNight(!isNight);
  };

  return (
    <main className="min-h-screen">
      <Navbar isNight={isNight} toggleTheme={toggleTheme} />
      <Hero isNight={isNight} />
    </main>
  );
}
