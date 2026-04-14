import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OracleSun, OracleWater, OracleTree, OracleHorse, OracleField, OracleOx, OraclePerson } from './OracleSVGs';

interface HeroProps {
  onSelectChar: (id: string) => void;
}

const SCENE_ITEMS = [
  { id: 'sun', charId: 'sun', component: OracleSun, top: '20%', left: '65%', size: 'w-16 h-16 md:w-24 md:h-24', rotate: -5 },
  { id: 'water', charId: 'water', component: OracleWater, top: '50%', left: '25%', size: 'w-24 h-24 md:w-32 md:h-32', rotate: 10 },
  { id: 'horse', charId: 'horse', component: OracleHorse, top: '48%', left: '32%', size: 'w-16 h-16 md:w-24 md:h-24', rotate: -20 }, // Leaning down to drink
  { id: 'tree', charId: 'tree', component: OracleTree, top: '35%', left: '75%', size: 'w-24 h-24 md:w-36 md:h-36', rotate: -8 },
  { id: 'field', charId: 'field', component: OracleField, top: '70%', left: '40%', size: 'w-28 h-28 md:w-40 md:h-40', rotate: -12 },
  { id: 'person', charId: 'person', component: OraclePerson, top: '62%', left: '55%', size: 'w-16 h-16 md:w-20 md:h-20', rotate: 15 }, // Leaning forward to pull
  { id: 'ox', charId: 'ox', component: OracleOx, top: '60%', left: '65%', size: 'w-20 h-20 md:w-28 md:h-28', rotate: -5 }, // Following person
];

export const Hero: React.FC<HeroProps> = ({ onSelectChar }) => {
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setClickedId(id);
    // Delay the drawer opening slightly to let the click animation play
    setTimeout(() => {
      onSelectChar(id);
      setClickedId(null);
    }, 400);
  };

  return (
    <section id="首页" className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-center overflow-hidden bg-bone-bg">
      <div className="absolute inset-0 parchment-texture opacity-60 pointer-events-none" />
      
      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(44,30,26,0.05)_100%)] pointer-events-none" />

      {/* Faint Landscape Background to emphasize the farming scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15] mix-blend-multiply">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          {/* Distant Mountains */}
          <path d="M 0 350 Q 150 300 250 350 T 500 320 T 800 380 T 1000 300" fill="none" stroke="#2c1e1a" strokeWidth="2" />
          <path d="M 100 370 Q 300 330 450 400 T 750 350 T 1000 400" fill="none" stroke="#2c1e1a" strokeWidth="1" strokeDasharray="8 8" />
          
          {/* River path (Left side) */}
          <path d="M 250 350 Q 200 550 300 750 T 200 1000" fill="none" stroke="#2c1e1a" strokeWidth="3" />
          <path d="M 280 350 Q 230 550 330 750 T 230 1000" fill="none" stroke="#2c1e1a" strokeWidth="1" />
          <path d="M 220 350 Q 170 550 270 750 T 170 1000" fill="none" stroke="#2c1e1a" strokeWidth="1" />

          {/* Ground / Field lines (Bottom) */}
          <path d="M 0 620 Q 400 580 1000 620" fill="none" stroke="#2c1e1a" strokeWidth="2" />
          <path d="M 200 620 Q 500 670 1000 720" fill="none" stroke="#2c1e1a" strokeWidth="1" />
          <path d="M 400 650 Q 700 690 1000 780" fill="none" stroke="#2c1e1a" strokeWidth="1" strokeDasharray="12 6" />
        </svg>
      </div>
      
      {/* De-emphasized and repositioned Title */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-8 left-4 md:top-12 md:left-8 z-10 pointer-events-none flex gap-4 md:gap-8"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-bone-ink tracking-[0.3em]" style={{ writingMode: 'vertical-rl', textShadow: '2px 4px 12px rgba(44,30,26,0.05)' }}>
          甲骨今译
        </h1>
        <div className="w-px bg-bone-ink/20 h-48 md:h-64 mt-4" />
        <p className="text-xs md:text-sm text-bone-ink/70 font-serif tracking-widest leading-loose" style={{ writingMode: 'vertical-rl' }}>
          穿越三千年的骨刻文明<br/>以人工智能解码汉字生命律动
        </p>
      </motion.div>

      {/* Organic Mural Carvings (Farming Scene) */}
      {SCENE_ITEMS.map((item, index) => {
        const isClicked = clickedId === item.charId;
        const SvgComponent = item.component;
        
        return (
          <motion.div 
            key={item.id}
            className="absolute z-20 cursor-pointer group"
            style={{ 
              top: item.top, 
              left: item.left,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(item.charId)}
              className="relative flex flex-col items-center"
            >
              {/* Click Ripple Animation */}
              <AnimatePresence>
                {isClicked && (
                  <motion.div
                    initial={{ opacity: 0.8, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-bone-brown bg-bone-brown/10 pointer-events-none"
                    style={{ width: '100%', height: '100%', top: 0, left: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* The "Carved" SVG Character */}
              <div 
                className={`mix-blend-multiply transition-all duration-500 ${
                  isClicked 
                    ? 'text-bone-brown opacity-100 drop-shadow-[0_0_20px_rgba(74,55,40,0.4)]' 
                    : 'text-bone-ink/50 group-hover:text-bone-brown group-hover:opacity-100'
                }`}
                style={{ 
                  transform: `rotate(${item.rotate}deg) scale(${isClicked ? 1.1 : 1})`,
                }}
              >
                <SvgComponent className={item.size} />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Coordinates / Meta info */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-bone-ink/40 font-mono text-[10px] md:text-xs tracking-widest text-right pointer-events-none">
        <p>LAT 36°07'N / LON 114°19'E</p>
        <p className="mt-1">YINXU RUINS, ANYANG</p>
      </div>
    </section>
  );
};
