import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { OracleSun, OracleWater, OracleTree, OracleHorse, OracleField, OracleOx, OraclePerson, OracleMoon, OracleMing, OracleDan, OracleZao } from './OracleSVGs';

const oracleSvgMap: Record<string, React.FC<{className?: string}>> = {
  'sun': OracleSun,
  'moon': OracleMoon,
  'ox': OracleOx,
  'person': OraclePerson,
  'field': OracleField,
  'water': OracleWater,
  'tree': OracleTree,
  'horse': OracleHorse,
};

const relatedSvgMap: Record<string, React.FC<{className?: string}>> = {
  '明': OracleMing,
  '旦': OracleDan,
  '早': OracleZao,
};

const OracleCharFallback = ({ char, className }: { char: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <text x="50" y="70" fontSize="55" textAnchor="middle" fontFamily="serif" fill="currentColor">{char}</text>
  </svg>
);

export const EvolutionSection = () => {
  const [selectedId, setSelectedId] = useState(CHARACTERS[0].id);
  const currentChar = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];
  const navigate = useNavigate();

  const getOracleSvg = (id: string, char: string, className: string) => {
    const SvgComponent = oracleSvgMap[id];
    if (SvgComponent) {
      return <SvgComponent className={className} />;
    }
    return <OracleCharFallback char={char} className={className} />;
  };

  const getRelatedSvg = (relatedChar: string, className: string) => {
    if (relatedSvgMap[relatedChar]) {
      const SvgComponent = relatedSvgMap[relatedChar];
      return <SvgComponent className={className} />;
    }
    const found = CHARACTERS.find(c => c.char === relatedChar);
    if (found && oracleSvgMap[found.id]) {
      const SvgComponent = oracleSvgMap[found.id];
      return <SvgComponent className={className} />;
    }
    return <OracleCharFallback char={relatedChar} className={className} />;
  };

  return (
    <section id="演化" className="py-16 md:py-24 bg-bone-paper parchment-texture">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left: Character List */}
          <div className="md:w-1/3 space-y-4 md:border-r border-bone-ink/10 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif text-bone-ink mb-3">单字演化讲解</h2>
            <p className="text-bone-ink/55 text-base md:text-lg tracking-widest mb-8 md:mb-12">
              通过 AI 视觉比对，追踪甲骨文至现代楷书的形态演变。
            </p>
            <div className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  className={`shrink-0 px-4 md:px-6 py-3 md:py-4 transition-all text-left flex flex-col md:flex-row justify-between items-center md:items-center border border-transparent group ${
                    selectedId === char.id 
                      ? 'bg-[#fff4cc] text-bone-ink border-[#f1d88a]' 
                      : 'bg-bone-ink/5 md:bg-transparent hover:border-bone-ink/20 text-bone-ink/60'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-0">
                    <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center ${selectedId === char.id ? 'text-bone-ink' : 'text-bone-ink/40 group-hover:text-bone-ink'}`}>
                      {getOracleSvg(char.id, char.char, "w-full h-full")}
                    </div>
                    <span className="text-2xl md:text-3xl font-serif hidden md:block">{char.char}</span>
                  </div>
                  <span className={`text-sm md:text-base tracking-widest ${selectedId === char.id ? 'text-bone-ink/60' : 'text-bone-ink/40'}`}>
                    {char.pinyin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Evolution Detail */}
          <div className="md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-end gap-4 md:gap-6 mb-10 md:mb-16 border-b border-bone-ink/10 pb-6 md:pb-8">
                  <div className="flex items-center gap-6">
                    <h3 className="text-6xl md:text-8xl font-serif text-bone-ink leading-none">{currentChar.char}</h3>
                    <div className="w-16 h-16 md:w-24 md:h-24 text-bone-ink/40">
                      {getOracleSvg(currentChar.id, currentChar.char, "w-full h-full")}
                    </div>
                  </div>
                  <div className="pb-1 md:pb-2 ml-auto">
                    <span className="px-3 md:px-4 py-1 border border-bone-ink text-bone-ink text-sm md:text-base tracking-widest uppercase">
                      {currentChar.meaning}
                    </span>
                  </div>
                </div>

                {/* Evolution Timeline */}
                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-start gap-8 sm:gap-2 mb-8 md:mb-10">
                  <div className="hidden sm:block absolute top-10 md:top-12 left-0 right-0 h-px bg-bone-ink/20 z-0" />
                  <div className="sm:hidden absolute left-10 top-0 bottom-0 w-px bg-bone-ink/20 z-0" />
                  {currentChar.evolution.map((step, idx) => (
                    <div 
                      key={step.era}
                      className="relative z-10 flex flex-row sm:flex-col items-center sm:items-center gap-4 md:gap-6 group w-full sm:w-[150px] md:w-[170px]"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-bone-paper border border-bone-ink flex items-center justify-center overflow-hidden group-hover:bg-[#fff4cc] group-hover:border-[#f1d88a] transition-colors">
                        <img src={step.image} alt={step.era} className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 transition-all mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left sm:text-center flex-grow sm:w-full">
                        <div className="font-serif font-bold text-bone-ink text-lg md:text-xl">{step.era}</div>
                        <div className="text-sm md:text-base text-bone-ink/55 sm:max-w-[150px] md:max-w-[170px] mt-1 md:mt-2 leading-relaxed">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Analysis Panel */}
                <div className="mt-2 md:mt-4 border-t border-bone-ink/10 pt-6 md:pt-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-1.5 h-1.5 bg-bone-cyan rounded-full" />
                    <span className="text-sm md:text-base font-bold tracking-widest text-bone-ink/50 uppercase">AI 深度解析</span>
                  </div>
                  <p className="text-lg md:text-2xl text-bone-ink/90 leading-relaxed md:leading-loose font-serif">
                    {currentChar.aiAnalysis}
                  </p>
                  <div className="mt-6 md:mt-8 flex flex-wrap gap-4 md:gap-6">
                    {currentChar.related.map(r => (
                      <div 
                        key={r} 
                        onClick={() => navigate('/graph')}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 border border-bone-ink/20 bg-bone-paper flex items-center justify-center text-bone-ink/60 group-hover:border-bone-brown group-hover:text-bone-brown group-hover:bg-bone-brown/5 transition-all">
                          {getRelatedSvg(r, "w-8 h-8 md:w-10 md:h-10")}
                        </div>
                        <span className="text-sm md:text-base font-serif text-bone-ink/60 group-hover:text-bone-brown transition-colors">
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
