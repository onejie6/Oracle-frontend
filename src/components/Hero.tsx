import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '@/data/mockData';

interface HeroProps {
  onSelectChar: (id: string) => void;
}

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

  // Scattered positions pushed to the edges to avoid clashing with the center title
  // Adjusted top/left values to prevent overflow
  const positions = [
    { top: '15%', left: '10%', rotate: -5, scale: 1.2 },
    { top: '65%', left: '15%', rotate: 8, scale: 0.9 },
    { top: '20%', left: '80%', rotate: -12, scale: 1.1 },
    { top: '65%', left: '80%', rotate: 5, scale: 1.3 },
  ];

  return (
    <section id="首页" className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-center overflow-hidden bg-bone-bg">
      <div className="absolute inset-0 parchment-texture opacity-60 pointer-events-none" />
      
      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(44,30,26,0.05)_100%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center space-y-6 md:space-y-8 max-w-4xl px-6 relative pointer-events-none mt-12 md:mt-0"
      >
        <div className="inline-flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-bone-ink/30" />
          <span className="text-[10px] md:text-xs font-serif tracking-[0.3em] uppercase text-bone-ink/60">
            Digital Heritage
          </span>
          <div className="h-px w-8 md:w-12 bg-bone-ink/30" />
        </div>
        
        <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-serif text-bone-ink tracking-widest leading-none" style={{ textShadow: '2px 4px 12px rgba(44,30,26,0.05)' }}>
          甲骨今译
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-bone-ink/70 font-serif leading-relaxed max-w-2xl mx-auto tracking-widest">
          穿越三千年的骨刻文明<br className="hidden sm:block" />以 AI 之力，解码汉字最初的生命律动
        </p>
      </motion.div>

      {/* Organic Mural Carvings (Hotspots) */}
      {CHARACTERS.map((char, index) => {
        const pos = positions[index % positions.length];
        const isClicked = clickedId === char.id;
        const isBottom = parseInt(pos.top) > 50;
        
        return (
          <motion.div 
            key={char.id}
            className="absolute z-20 cursor-pointer group"
            style={{ 
              top: pos.top, 
              left: pos.left,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(char.id)}
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

              {/* The "Carved" Character */}
              <span 
                className={`text-5xl sm:text-7xl md:text-8xl font-serif mix-blend-multiply transition-all duration-500 ${
                  isClicked 
                    ? 'text-bone-brown opacity-100 drop-shadow-[0_0_20px_rgba(74,55,40,0.4)]' 
                    : 'text-bone-ink/10 group-hover:text-bone-brown group-hover:opacity-100'
                }`}
                style={{ 
                  transform: `rotate(${pos.rotate}deg) scale(${isClicked ? pos.scale * 1.1 : pos.scale})`,
                }}
              >
                {char.char}
              </span>
              
              {/* Reveal modern meaning on hover - dynamically position above or below */}
              <div className={`absolute flex flex-col items-center transition-opacity duration-500 ${isClicked ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} ${isBottom ? 'bottom-full mb-2 md:mb-4' : 'top-full mt-2 md:mt-4'}`}>
                {isBottom ? (
                  <>
                    <span className="text-[10px] md:text-xs font-serif tracking-widest text-bone-brown bg-bone-paper/80 px-2 md:px-3 py-1 backdrop-blur-sm border border-bone-brown/20 whitespace-nowrap">
                      {char.meaning.split('/')[0].trim()}
                    </span>
                    <div className="w-px h-4 md:h-6 bg-bone-brown/50 mt-1 md:mt-2" />
                  </>
                ) : (
                  <>
                    <div className="w-px h-4 md:h-6 bg-bone-brown/50 mb-1 md:mb-2" />
                    <span className="text-[10px] md:text-xs font-serif tracking-widest text-bone-brown bg-bone-paper/80 px-2 md:px-3 py-1 backdrop-blur-sm border border-bone-brown/20 whitespace-nowrap">
                      {char.meaning.split('/')[0].trim()}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Decorative vertical text */}
      <div className="absolute top-24 left-4 md:left-12 text-bone-ink/30 font-serif text-sm md:text-lg tracking-[0.8em] pointer-events-none hidden sm:block" style={{ writingMode: 'vertical-rl' }}>
        殷墟遗珍 · 数字化重生
      </div>
      
      {/* Coordinates / Meta info */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-bone-ink/40 font-mono text-[10px] md:text-xs tracking-widest text-right pointer-events-none">
        <p>LAT 36°07'N / LON 114°19'E</p>
        <p className="mt-1">YINXU RUINS, ANYANG</p>
      </div>
    </section>
  );
};
