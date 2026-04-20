import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OracleWater, OracleField } from './OracleSVGs';

interface HeroProps {
  onSelectChar: (id: string) => void;
}

type OracleGlyphComponent = React.FC<{ className?: string }>;

const HERO_GLYPH_IMAGES: Partial<Record<string, string>> = {
  sun: '/pictures/日.png',
  tree: '/pictures/木.png',
  horse: '/pictures/马.png',
  person: '/pictures/人.png',
  ox: '/pictures/牛.png',
  homeTop: '/pictures/家.png',
  mountain: '/pictures/山.png',
  cloud: '/pictures/云.png',
};

const SCENE_ITEMS = [
  // Far Background (Sky & Horizon)
  { id: 'sun', charId: 'sun', imagePath: HERO_GLYPH_IMAGES.sun, top: '9%', left: '33%', size: 'w-16 h-16 md:w-24 md:h-24', rotate: -2, depthClass: 'opacity-86' },
  { id: 'tree', charId: 'tree', imagePath: HERO_GLYPH_IMAGES.tree, top: '23%', left: '24%', size: 'w-20 h-20 md:w-24 md:h-24', rotate: -6, depthClass: 'opacity-74' },
  { id: 'home-top', charId: 'home', imagePath: HERO_GLYPH_IMAGES.homeTop, top: '57%', left: '75%', size: 'w-20 h-20 md:w-28 md:h-28', rotate: -8, depthClass: 'opacity-78' },
  { id: 'mountain-ridge', charId: 'mountain', imagePath: HERO_GLYPH_IMAGES.mountain, top: '20%', left: '84%', size: 'w-20 h-20 md:w-28 md:h-28', rotate: -4, depthClass: 'opacity-82 blur-[0.2px]' },
  { id: 'cloud-drift', charId: 'cloud', imagePath: HERO_GLYPH_IMAGES.cloud, top: '10%', left: '69%', size: 'w-24 h-12 md:w-36 md:h-20', rotate: -6, depthClass: 'opacity-86' },
  
  // Midground (River & Animals)
  { id: 'water', charId: 'water', component: OracleWater, top: '46%', left: '21%', size: 'w-24 h-24 md:w-36 md:h-36', rotate: -15, extraTransform: 'rotateX(65deg)', depthClass: 'opacity-60' },
  { id: 'horse', charId: 'horse', imagePath: HERO_GLYPH_IMAGES.horse, top: '39%', left: '31%', size: 'w-16 h-16 md:w-20 md:h-20', rotate: -14, depthClass: 'opacity-80' }, 
  
  // Foreground (Farming Action)
  { id: 'person', charId: 'person', imagePath: HERO_GLYPH_IMAGES.person, top: '56%', left: '50%', size: 'w-20 h-20 md:w-28 md:h-28', rotate: 9, depthClass: 'opacity-92' }, 
  { id: 'ox', charId: 'ox', imagePath: HERO_GLYPH_IMAGES.ox, top: '43%', left: '63%', size: 'w-24 h-24 md:w-32 md:h-32', rotate: -5, depthClass: 'opacity-86' }, 
  { id: 'field', charId: 'field', component: OracleField, top: '63%', left: '65%', size: 'w-40 h-40 md:w-56 md:h-56', rotate: -10, extraTransform: 'rotateX(55deg)', depthClass: 'opacity-100' },
];

export const Hero: React.FC<HeroProps> = ({ onSelectChar }) => {
  const [clickedId, setClickedId] = useState<string | null>(null);

  const renderGlyph = (
    imagePath: string | undefined,
    SvgComponent: OracleGlyphComponent | undefined,
    className: string,
    alt: string,
  ) => {
    if (imagePath) {
      return (
        <img
          src={imagePath}
          alt={alt}
          className={`${className} object-contain`}
          loading="lazy"
          decoding="async"
        />
      );
    }
    if (!SvgComponent) {
      return null;
    }
    return <SvgComponent className={className} />;
  };

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

      {/* Elegant Landscape Background with Topographical/Mural Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.3] mix-blend-multiply">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          {/* Stylized Wind / Auspicious Clouds */}
          <path d="M -50 150 C 100 130, 200 180, 350 140 S 500 170, 600 130" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.2" />
          <path d="M 400 100 C 550 80, 650 130, 800 90 S 950 120, 1050 80" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />
          <path d="M 150 180 C 250 160, 300 190, 400 170" fill="none" stroke="#2c1e1a" strokeWidth="0.5" opacity="0.15" />

          {/* Distant Mountain Ranges (Layered for depth, smoother curves) */}
          <path d="M 0 280 C 150 260, 250 290, 400 250 S 600 280, 750 240 S 900 270, 1000 250" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />
          <path d="M 0 310 C 120 270, 220 250, 350 290 S 550 240, 700 280 S 850 250, 1000 290" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.3" />
          <path d="M 250 310 C 350 280, 450 270, 550 310" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />
          <path d="M 650 310 C 750 270, 850 260, 950 310" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />

          {/* Soft Horizon Line */}
          <path d="M 0 310 C 333 320, 666 320, 1000 310" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.4" />

          {/* Flowing River (Meandering curves instead of straight perspective lines) */}
          <path d="M 380 310 C 350 450, 200 600, 250 800 S 50 950, -50 1000" fill="none" stroke="#2c1e1a" strokeWidth="2" opacity="0.4" />
          <path d="M 400 310 C 380 450, 250 600, 300 800 S 100 950, 0 1000" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.3" />
          <path d="M 420 310 C 410 450, 300 600, 350 800 S 150 950, 50 1000" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />

          {/* Terraced Fields / Topographical Contours (Replacing harsh radiating lines) */}
          <path d="M 450 380 C 600 400, 800 360, 1000 420" fill="none" stroke="#2c1e1a" strokeWidth="1" opacity="0.2" />
          <path d="M 420 450 C 650 480, 850 430, 1000 520" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.3" />
          <path d="M 350 550 C 600 600, 800 520, 1000 650" fill="none" stroke="#2c1e1a" strokeWidth="1.5" opacity="0.3" strokeDasharray="12 6" />
          <path d="M 250 700 C 550 780, 750 680, 1000 850" fill="none" stroke="#2c1e1a" strokeWidth="2" opacity="0.4" strokeDasharray="18 9" />
          <path d="M 100 880 C 450 980, 700 850, 1000 1050" fill="none" stroke="#2c1e1a" strokeWidth="2" opacity="0.5" strokeDasharray="24 12" />
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
        <p className="text-sm md:text-base text-bone-ink/70 font-serif tracking-widest leading-loose" style={{ writingMode: 'vertical-rl' }}>
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
                className={`mix-blend-multiply transition-all duration-500 relative ${item.depthClass} group-hover:!opacity-100 group-hover:!blur-none ${
                  isClicked 
                    ? 'text-bone-brown !opacity-100 !blur-none drop-shadow-[0_0_20px_rgba(74,55,40,0.4)]' 
                    : 'text-bone-ink group-hover:text-bone-brown'
                }`}
                style={{ 
                  transform: `perspective(500px) ${item.extraTransform || ''} rotate(${item.rotate}deg) scale(${isClicked ? 1.1 : 1})`,
                }}
              >
                {/* Cast Shadow for standing objects (pointing South) */}
                {item.id !== 'sun' && item.id !== 'water' && item.id !== 'field' && !item.imagePath && (
                  <div 
                    className="absolute inset-0 text-bone-ink/50 blur-[2px] pointer-events-none origin-bottom"
                    style={{ transform: 'scaleY(-0.5) skewX(15deg) translateY(-5%)' }}
                  >
                    {renderGlyph(item.imagePath, SvgComponent, 'w-full h-full', `${item.id} shadow glyph`)}
                  </div>
                )}
                
                {renderGlyph(item.imagePath, SvgComponent, `relative z-10 ${item.size} drop-shadow-[0_6px_10px_rgba(44,30,26,0.22)]`, `${item.id} oracle glyph`)}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Coordinates / Meta info removed per user request */}
    </section>
  );
};
