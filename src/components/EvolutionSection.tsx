import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '@/data/mockData';

export const EvolutionSection = () => {
  const [selectedId, setSelectedId] = useState(CHARACTERS[0].id);
  const currentChar = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];

  return (
    <section id="演化" className="py-16 md:py-24 bg-bone-paper parchment-texture">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left: Character List */}
          <div className="md:w-1/3 space-y-4 md:border-r border-bone-ink/10 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-serif text-bone-ink mb-2">单字演化讲解</h2>
            <p className="text-bone-ink/50 text-xs md:text-sm tracking-widest mb-8 md:mb-12">
              通过 AI 视觉比对，追踪甲骨文至现代楷书的形态演变。
            </p>
            <div className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  className={`shrink-0 px-4 md:px-6 py-3 md:py-4 transition-all text-left flex flex-col md:flex-row justify-between items-center md:items-center border border-transparent ${
                    selectedId === char.id 
                      ? 'bg-bone-ink text-bone-paper border-bone-ink' 
                      : 'bg-bone-ink/5 md:bg-transparent hover:border-bone-ink/20 text-bone-ink/60'
                  }`}
                >
                  <span className="text-xl md:text-2xl font-serif mb-1 md:mb-0">{char.char}</span>
                  <span className={`text-[10px] md:text-sm tracking-widest ${selectedId === char.id ? 'text-bone-paper/60' : 'text-bone-ink/40'}`}>
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
                  <h3 className="text-6xl md:text-8xl font-serif text-bone-ink leading-none">{currentChar.char}</h3>
                  <div className="pb-1 md:pb-2">
                    <span className="px-3 md:px-4 py-1 border border-bone-ink text-bone-ink text-xs md:text-sm tracking-widest uppercase">
                      {currentChar.meaning}
                    </span>
                  </div>
                </div>

                {/* Evolution Timeline */}
                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 sm:gap-0 mb-16 md:mb-20">
                  <div className="hidden sm:block absolute top-10 md:top-12 left-0 right-0 h-px bg-bone-ink/20 z-0" />
                  <div className="sm:hidden absolute left-10 top-0 bottom-0 w-px bg-bone-ink/20 z-0" />
                  {currentChar.evolution.map((step, idx) => (
                    <div 
                      key={step.era}
                      className="relative z-10 flex flex-row sm:flex-col items-center gap-4 md:gap-6 group w-full sm:w-auto"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-bone-paper border border-bone-ink flex items-center justify-center overflow-hidden group-hover:bg-bone-ink transition-colors">
                        <img src={step.image} alt={step.era} className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 group-hover:invert transition-all mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left sm:text-center flex-grow">
                        <div className="font-serif font-bold text-bone-ink text-base md:text-lg">{step.era}</div>
                        <div className="text-[10px] md:text-xs text-bone-ink/50 sm:max-w-[100px] mt-1 md:mt-2 leading-relaxed">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Analysis Panel */}
                <div className="mt-auto border-t border-bone-ink/10 pt-6 md:pt-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-1.5 h-1.5 bg-bone-cyan rounded-full" />
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-bone-ink/50 uppercase">AI 深度解析</span>
                  </div>
                  <p className="text-base md:text-xl text-bone-ink/90 leading-relaxed md:leading-loose font-serif">
                    {currentChar.aiAnalysis}
                  </p>
                  <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                    {currentChar.related.map(r => (
                      <span key={r} className="px-3 md:px-4 py-1 md:py-1.5 border border-bone-ink/20 text-bone-ink text-xs md:text-sm font-serif hover:bg-bone-ink hover:text-bone-paper transition-colors cursor-pointer">
                        关联：{r}
                      </span>
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
