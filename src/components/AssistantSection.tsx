import React from 'react';
import { motion } from 'motion/react';
import { UNKNOWN_CASES } from '@/data/mockData';
import { Search, ShieldCheck, FileText, Image as ImageIcon, Cpu, Activity } from 'lucide-react';
import { OracleUnknown1 } from './OracleSVGs';

export const AssistantSection = () => {
  const currentCase = UNKNOWN_CASES[0];

  return (
    <section id="释读" className="py-16 md:py-24 bg-bone-paper parchment-texture">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-20 border-b border-bone-ink/10 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif text-bone-ink mb-3 md:mb-5">未知字辅助释读</h2>
            <p className="text-bone-ink/65 max-w-3xl tracking-widest text-lg md:text-xl leading-relaxed">
              提供“法医式”的释读推理面板，多维度证据链支持，辅助学者攻克未识字难题。
            </p>
          </div>
          <div className="text-xs md:text-sm font-serif text-bone-ink/40 tracking-widest uppercase">
            Forensic Analysis
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Left: Unknown Image */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6 lg:pt-3">
            <h3 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest flex items-center gap-2 mb-4 md:mb-6">
              <Search className="w-3 h-3 md:w-4 md:h-4" /> 待释读目标
            </h3>
            <div className="aspect-square border border-bone-ink/20 bg-white relative group overflow-hidden p-4 md:p-8 flex items-center justify-center">
              <div className="absolute inset-0 parchment-texture opacity-50" />
              {currentCase.id === 'UNK-001' ? (
                <OracleUnknown1 className="w-full h-full text-bone-ink relative z-10 mix-blend-multiply opacity-90" />
              ) : (
                <img src={currentCase.image} alt="Unknown" className="w-full h-full object-contain relative z-10 mix-blend-multiply opacity-90" referrerPolicy="no-referrer" />
              )}
              
              {/* Scanner effect */}
              <div className="absolute inset-0 border-2 border-bone-cyan opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="absolute top-0 left-0 right-0 h-px bg-bone-cyan shadow-[0_0_8px_rgba(0,139,139,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm uppercase tracking-widest text-bone-ink/40">
              <span>ID: {currentCase.id}</span>
              <span>Source: {currentCase.source}</span>
            </div>
            {currentCase.note && (
              <div className="text-sm md:text-base text-bone-ink/60 font-serif italic mt-2">
                * {currentCase.note}
              </div>
            )}
          </div>

          {/* Middle: Candidates */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <h3 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest flex items-center gap-2 mb-4 md:mb-6">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> Top-3 候选方向
            </h3>
            <div className="space-y-3 md:space-y-4 lg:max-h-[760px] lg:overflow-y-auto lg:pr-2 scrollbar-reveal">
              {currentCase.candidates.map((cand, idx) => (
                <motion.div 
                  key={cand.title}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 md:p-6 border transition-all ${idx === 0 ? 'border-bone-ink bg-bone-ink/5' : 'border-bone-ink/10 hover:border-bone-ink/30'}`}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="text-xl md:text-2xl font-serif text-bone-ink leading-none">{cand.title}</div>
                    <div className="text-right">
                      <div className="text-sm uppercase tracking-widest text-bone-ink/40 mb-1">Confidence</div>
                      <div className={`text-xl md:text-2xl font-mono ${idx === 0 ? 'text-bone-cyan font-bold' : 'text-bone-ink/60'}`}>
                        {(cand.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-bone-ink/70 leading-relaxed font-serif">
                    {cand.evidence}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Evidence Panel */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6 lg:max-h-[760px] lg:overflow-y-auto lg:pr-2 scrollbar-reveal">
            <h3 className="text-base font-bold text-bone-ink/50 uppercase tracking-widest flex items-center gap-2 mb-4 md:mb-6">
              <FileText className="w-3 h-3 md:w-4 md:h-4" /> 证据链分析
            </h3>
            <div className="space-y-6 md:space-y-8 border-l border-bone-ink/10 pl-6 md:pl-8">
              
              <div className="relative">
                <div className="absolute -left-[29px] md:-left-[37px] top-1 w-2 h-2 rounded-full bg-bone-gold" />
                <div className="text-sm font-bold tracking-widest text-bone-gold uppercase mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                  <ImageIcon className="w-3 h-3" /> 图像证据
                </div>
                <p className="text-base md:text-lg text-bone-ink/80 leading-relaxed font-serif">{currentCase.forensic.image}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] md:-left-[37px] top-1 w-2 h-2 rounded-full bg-bone-cyan" />
                <div className="text-sm font-bold tracking-widest text-bone-cyan uppercase mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                  <Cpu className="w-3 h-3" /> 结构证据
                </div>
                <p className="text-base md:text-lg text-bone-ink/80 leading-relaxed font-serif">{currentCase.forensic.structure}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] md:-left-[37px] top-1 w-2 h-2 rounded-full bg-bone-ink/50" />
                <div className="text-sm font-bold tracking-widest text-bone-ink/50 uppercase mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                  <ShieldCheck className="w-3 h-3" /> 排除证据
                </div>
                <p className="text-base md:text-lg text-bone-ink/80 leading-relaxed font-serif">{currentCase.forensic.exclusion}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] md:-left-[37px] top-1 w-2 h-2 rounded-full bg-bone-red" />
                <div className="text-sm font-bold tracking-widest text-bone-red uppercase mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                  <Activity className="w-3 h-3" /> 演化证据
                </div>
                <p className="text-base md:text-lg text-bone-ink/80 leading-relaxed font-serif">{currentCase.forensic.evolution}</p>
              </div>
              
              <div className="mt-8 md:mt-12 p-4 md:p-6 bg-[#fff4cc] border border-[#f1d88a] text-bone-ink">
                <div className="text-base font-bold tracking-widest uppercase mb-2 md:mb-4 text-[#9a7a2a]">专家审慎建议</div>
                <p className="text-base md:text-lg leading-relaxed font-serif text-bone-ink/85">
                  {currentCase.expertAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
