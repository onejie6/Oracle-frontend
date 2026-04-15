import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DECODING_STEPS } from '@/data/mockData';
import { Database } from 'lucide-react';

export const DecodingLab = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="解码" className="py-16 md:py-24 bg-zinc-950 text-zinc-100 overflow-hidden relative min-h-screen">
      
      {/* Initialization Overlay */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center"
          >
            <div className="w-64 space-y-4">
              <div className="flex justify-between text-sm font-mono text-zinc-500 tracking-widest uppercase">
                <span>System Boot</span>
                <span>Oracle-Net v4.2</span>
              </div>
              <div className="h-px bg-white/20 relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-amber-500"
                />
              </div>
              <div className="text-center text-base font-mono text-amber-500 animate-pulse">
                Initializing Decoding Lab...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background grid - Subtle Amber */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInitializing ? 0 : 1, y: isInitializing ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-0"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-100">结构解码实验室</h2>
            <p className="text-amber-500/80 max-w-xl tracking-widest text-base md:text-lg font-serif">
              白盒化展示 AI 处理流程，从原始拓片到拓扑图表征，量化每一个演化节点。
            </p>
          </div>
          <div className="flex gap-6 md:gap-8 text-left md:text-right">
            <div>
              <div className="text-sm tracking-widest uppercase opacity-50 mb-1 text-zinc-400">Model Version</div>
              <div className="font-mono text-base md:text-lg text-amber-500">Oracle-Net v4.2</div>
            </div>
            <div>
              <div className="text-sm tracking-widest uppercase opacity-50 mb-1 text-zinc-400">Compute Power</div>
              <div className="font-mono text-base md:text-lg text-amber-500">12.4 TFLOPS</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Process Flow */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
              {DECODING_STEPS.map((step, idx) => (
                <button
                  key={step.stage}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-4 md:p-6 border-r border-b border-white/10 transition-all text-left group ${
                    activeStep === idx 
                      ? 'bg-amber-500/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Active Indicator */}
                  {activeStep === idx && (
                    <motion.div layoutId="active-step" className="absolute top-0 left-0 w-full h-0.5 bg-amber-500" />
                  )}
                  <div className={`text-sm font-mono mb-2 md:mb-3 tracking-widest transition-colors ${activeStep === idx ? 'text-amber-500' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    STEP 0{idx + 1}
                  </div>
                  <div className={`font-serif text-base md:text-xl transition-colors ${activeStep === idx ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-100'}`}>
                    {step.stage}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative aspect-square md:aspect-video border border-white/10 bg-black/80 group overflow-hidden p-2">
              {/* Corner Brackets for Scientific Instrument Feel */}
              <div className="absolute top-0 left-0 w-4 md:w-8 h-4 md:h-8 border-t border-l border-amber-500/40" />
              <div className="absolute top-0 right-0 w-4 md:w-8 h-4 md:h-8 border-t border-r border-amber-500/40" />
              <div className="absolute bottom-0 left-0 w-4 md:w-8 h-4 md:h-8 border-b border-l border-amber-500/40" />
              <div className="absolute bottom-0 right-0 w-4 md:w-8 h-4 md:h-8 border-b border-r border-amber-500/40" />
              
              <motion.img 
                key={DECODING_STEPS[activeStep].image}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                src={DECODING_STEPS[activeStep].image} 
                alt={DECODING_STEPS[activeStep].stage}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
                referrerPolicy="no-referrer"
              />
              
              {/* Static Crosshairs instead of moving scanline */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-px bg-amber-500 absolute" />
                <div className="h-full w-px bg-amber-500 absolute" />
                <div className="w-8 md:w-16 h-8 md:h-16 border border-amber-500 rounded-full absolute" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-amber-500 uppercase tracking-widest">Processing Output</span>
                </div>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed tracking-wide font-serif">
                  {DECODING_STEPS[activeStep].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Metrics Panel */}
          <div className="lg:col-span-4 border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 md:pb-6 mb-6 md:mb-8">
              <Database className="text-amber-500 w-4 h-4" />
              <h3 className="text-base font-serif tracking-widest text-amber-500 uppercase">量化指标</h3>
            </div>

            <div className="space-y-6 md:space-y-8 flex-grow">
              {Object.entries(DECODING_STEPS[activeStep].metrics).map(([key, value]) => (
                <div key={key} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm uppercase tracking-widest text-zinc-500">
                    <span>{key}</span>
                    <span className="text-amber-500 font-mono">{value}</span>
                  </div>
                  <div className="h-px bg-white/10 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: typeof value === 'string' && value.includes('%') ? value : '85%' }}
                      className="absolute top-0 left-0 h-full bg-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-white/10">
              <div className="text-sm uppercase tracking-widest text-amber-500/50 mb-2 md:mb-3 font-mono">System Trace</div>
              <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-mono">
                &gt; Extracting feature vectors via CNN...<br/>
                &gt; Calculating cosine similarity...<br/>
                &gt; Topological consistency verified.<br/>
                &gt; Match confidence optimal.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
