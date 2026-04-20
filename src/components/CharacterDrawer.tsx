import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterData } from '@/data/mockData';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CharacterDrawerProps {
  character: CharacterData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterDrawer: React.FC<CharacterDrawerProps> = ({ character, isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    // Small delay to let the drawer start closing before navigating
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && character && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bone-ink/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-bone-paper border-l border-bone-ink/20 z-[101] overflow-y-auto shadow-2xl"
          >
            <div className="p-6 md:p-12 relative min-h-full flex flex-col">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 md:top-8 md:right-8 text-bone-ink/40 hover:text-bone-ink transition-colors"
              >
                <X size={28} strokeWidth={1.5} />
              </button>

              <div className="flex items-center gap-6 md:gap-8 border-b border-bone-ink/10 pb-8 md:pb-10 mb-8 md:mb-10 mt-8 md:mt-0">
                <div className="w-20 h-20 md:w-24 md:h-24 border border-bone-ink flex items-center justify-center text-5xl md:text-6xl font-serif text-bone-ink shrink-0">
                  {character.char}
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-serif text-bone-ink mb-1 md:mb-2">{character.pinyin}</div>
                  <div className="text-bone-ink/60 tracking-widest uppercase text-sm md:text-base">{character.meaning}</div>
                </div>
              </div>

              <div className="space-y-10 md:space-y-12 flex-grow">
                {/* Oracle Image */}
                <section>
                  <h4 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest mb-4">原始甲骨形态</h4>
                  <div className="aspect-video bg-white border border-bone-ink/10 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
                    <div className="absolute inset-0 parchment-texture opacity-50" />
                    <img src={character.oracle} alt="Oracle" className="h-full object-contain relative z-10 opacity-90 mix-blend-multiply" referrerPolicy="no-referrer" />
                  </div>
                </section>

                {/* Evolution Summary */}
                <section>
                  <div 
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={() => handleNavigate('/evolution')}
                  >
                    <h4 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest group-hover:text-bone-brown transition-colors">演化链条</h4>
                    <div className="flex items-center gap-1 text-bone-ink/30 group-hover:text-bone-brown transition-colors">
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">查看完整演化</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div 
                    className="flex justify-between items-center relative cursor-pointer group"
                    onClick={() => handleNavigate('/evolution')}
                  >
                    <div className="absolute left-0 right-0 h-px bg-bone-ink/10 top-1/2 -translate-y-1/2 group-hover:bg-bone-brown/30 transition-colors" />
                    {character.evolution.map((step, idx) => (
                      <div key={step.era} className="relative z-10 flex flex-col items-center gap-2 bg-bone-paper px-1 md:px-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-bone-ink/30 bg-white overflow-hidden flex items-center justify-center group-hover:border-bone-brown transition-colors">
                          <img
                            src={step.image}
                            alt={step.era}
                            className="w-full h-full object-contain p-[2px] opacity-90 mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* AI Insight */}
                <section>
                  <h4 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest mb-4">AI 深度释义</h4>
                  <div className="border-l-2 border-bone-ink pl-4 md:pl-6 py-1 md:py-2">
                    <p className="text-base md:text-lg text-bone-ink/80 leading-relaxed md:leading-loose font-serif">
                      {character.aiAnalysis}
                    </p>
                  </div>
                </section>

                {/* Related */}
                <section>
                  <div 
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={() => handleNavigate('/graph')}
                  >
                    <h4 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest group-hover:text-bone-brown transition-colors">关联字族</h4>
                    <div className="flex items-center gap-1 text-bone-ink/30 group-hover:text-bone-brown transition-colors">
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">查看字族图谱</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {character.related.map(r => (
                      <span 
                        key={r} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate('/graph');
                        }}
                        className="px-3 md:px-4 py-1 md:py-1.5 border border-bone-ink/20 text-bone-ink text-sm md:text-base font-serif hover:bg-bone-brown hover:text-bone-paper hover:border-bone-brown transition-colors cursor-pointer"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-bone-ink/10 text-center">
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
