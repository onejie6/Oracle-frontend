/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EvolutionSection } from './components/EvolutionSection';
import { DecodingLab } from './components/DecodingLab';
import { AssistantSection } from './components/AssistantSection';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { CharacterDrawer } from './components/CharacterDrawer';
import { CHARACTERS } from './data/mockData';

const AnimatedRoutes = ({ setSelectedCharId }: { setSelectedCharId: (id: string) => void }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <Routes location={location}>
          <Route path="/" element={<Hero onSelectChar={setSelectedCharId} />} />
          <Route path="/evolution" element={<EvolutionSection />} />
          <Route path="/decoding" element={<DecodingLab />} />
          <Route path="/assistant" element={<AssistantSection />} />
          <Route path="/graph" element={<KnowledgeGraph />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const selectedChar = CHARACTERS.find(c => c.id === selectedCharId) || null;
  const location = useLocation();
  const isTechTheme = location.pathname === '/decoding';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-700 ${isTechTheme ? 'bg-bone-ink text-bone-paper' : 'bg-bone-bg text-bone-ink selection:bg-bone-gold selection:text-white'}`}>
      <Navbar />
      
      <main className="flex-grow pt-24">
        <AnimatedRoutes setSelectedCharId={setSelectedCharId} />
      </main>

      <footer className={`py-12 border-t mt-24 transition-colors duration-700 ${isTechTheme ? 'bg-bone-ink border-bone-cyan/20 text-bone-paper' : 'bg-bone-paper border-bone-ink/10 text-bone-ink'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 border rounded-full flex items-center justify-center font-serif text-sm transition-colors duration-700 ${isTechTheme ? 'border-bone-cyan text-bone-cyan' : 'border-bone-ink text-bone-ink'}`}>
              甲
            </div>
            <span className="font-serif text-lg tracking-widest uppercase">甲骨今译</span>
          </div>
          
          <div className={`text-xs font-medium tracking-widest uppercase text-center md:text-right transition-colors duration-700 ${isTechTheme ? 'text-bone-cyan/50' : 'text-bone-ink/50'}`}>
            <p>© 2024 Oracle Bone Inscriptions</p>
            <p className="mt-1">Digital Heritage & AI Analysis</p>
          </div>
        </div>
      </footer>

      <CharacterDrawer 
        character={selectedChar}
        isOpen={!!selectedCharId}
        onClose={() => setSelectedCharId(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
