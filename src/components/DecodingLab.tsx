import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Download, Maximize2, Play, Upload, X } from 'lucide-react';

const DECODING_STEPS = [
  {
    stage: '原始图像',
    description: '上传待分析字形图像，作为后续流程的输入样本。',
    metrics: { '清晰度': '0.92', '噪点率': '0.05' },
  },
  {
    stage: '预处理骨架',
    description: '进行阈值分割与骨架提取，突出字形主干结构。',
    metrics: { '笔画提取': '98%', '连通域': '12' },
  },
  {
    stage: 'Graph 表征',
    description: '将骨架转换为图结构，提取节点和拓扑关系。',
    metrics: { '节点数': '8', '边数': '7', '拓扑特征': 'Radial' },
  },
  {
    stage: '现代字推测与分析',
    description: '基于形态拓扑与结构约束进行现代字候选推测。',
    metrics: { '候选数量': '3', '结构一致性': '0.89', '语义匹配': '0.84' },
  },
];

const RAW_IMAGES = ['/pictures/raw0.png', '/pictures/raw1.png', '/pictures/raw2.png'];
const MOCK_IMAGES = ['/pictures/mock1.png', '/pictures/mock2.png'];

const ANALYSIS_COPY = {
  bird: {
    title: '推测结果：鸟',
    confidence: '93.6%',
    points: [
      '在骨架图中可以观察到明显的“头-躯干-尾部”纵向主轴结构，且尾端存在分叉外展，符合鸟形象形字常见的收尾特征。',
      'Graph 表征阶段中，主节点向下游离并形成细长分支，呈现“躯体+尾羽”的拓扑关系，不像“木”“人”等字的对称或支撑结构。',
      '预处理后轮廓的前部突起与中段转折构成了“喙部/头颈”视觉线索，与甲骨文“鸟”字的具象取形逻辑一致。',
      '在候选集对比中，“鸟”在结构一致性、拓扑相似度和笔画方向分布三项指标均为第一，且与第二候选拉开明显差距。',
      '综合判断把握率为 93.6%。之所以可以较高置信给出该结论，是因为关键判别特征（头部突起、躯干主轴、尾部外展）同时出现，且不存在与该组合同强度竞争的替代字形。',
    ],
  },
  qi: {
    title: '推测结果：其',
    confidence: '92.1%',
    points: [
      '从默认预处理图可见，主体呈“上部展开、下部支撑”的层级结构，具备“其”字早期形态中的框架感。',
      'Graph 表征中，横向节点连接较强、竖向主干稳定，说明该字更偏向器物/容器类轮廓而非动物象形。',
      '关键分支在中段形成集中汇合，符合“其”字从甲骨到后世写法中“中部承接、下部延展”的演化趋势。',
      '该样本与“其”字历史字形在横向展开比例、中心承接位和底部收束结构上高度重合，排除了“鸟”“木”等高频混淆项。',
      '综合判断把握率为 92.1%。确认度较高的原因在于：结构特征稳定、拓扑噪声低、且多轮预处理结果一致收敛到同一候选。',
    ],
  },
};

export const DecodingLab = () => {
  const ANALYSIS_DELAY_MS = 5000;
  const [activeStep, setActiveStep] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState<string>('');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (uploadedImage && uploadedImage.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const triggerUpload = () => handleUploadClick();
    window.addEventListener('decoding-upload-trigger', triggerUpload);
    return () => {
      window.removeEventListener('decoding-upload-trigger', triggerUpload);
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadedImage && uploadedImage.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedImage);
    }

    const nextUrl = URL.createObjectURL(file);
    setUploadedImage(nextUrl);
    setUploadedName(file.name);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setHasAnalyzed(false);
    setActiveStep(0);
  };

  const handleStartAnalysis = () => {
    if (!uploadedImage || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setHasAnalyzed(false);
    setActiveStep(1);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = window.setInterval(() => {
      setAnalysisProgress((prev) => {
        const next = prev + 5;
        return next >= 95 ? 95 : next;
      });
    }, 250);

    const timer = window.setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setActiveStep(1);
    }, ANALYSIS_DELAY_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [ANALYSIS_DELAY_MS, isAnalyzing]);

  const stageImage = useMemo(() => {
    if (activeStep === 0) {
      return uploadedImage || RAW_IMAGES[0];
    }
    if (activeStep === 1) {
      return hasAnalyzed ? MOCK_IMAGES[0] : RAW_IMAGES[1];
    }
    if (activeStep === 2) {
      return hasAnalyzed ? MOCK_IMAGES[1] : RAW_IMAGES[2];
    }
    return null;
  }, [activeStep, hasAnalyzed, uploadedImage]);

  const analysisContent = uploadedImage ? ANALYSIS_COPY.bird : ANALYSIS_COPY.qi;

  const canPreviewLarge = hasAnalyzed && !isAnalyzing && (activeStep === 1 || activeStep === 2) && !!stageImage;

  const openPreview = () => {
    if (!canPreviewLarge || !stageImage) return;
    setPreviewImage(stageImage);
    setPreviewTitle(DECODING_STEPS[activeStep].stage);
  };

  return (
    <section id="解码" className="py-16 md:py-24 bg-gradient-to-br from-[#1a2232] via-[#213047] to-[#2f2742] text-zinc-100 overflow-hidden relative min-h-screen">
      
      {/* Initialization Overlay */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-gradient-to-b from-[#182232] to-[#232f46] flex flex-col items-center justify-center"
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
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(56,189,248,0.25) 1px, transparent 1px)', backgroundSize: '36px 36px' }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14)_0%,rgba(26,34,50,0)_58%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.1)_0%,rgba(26,34,50,0)_58%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInitializing ? 0 : 1, y: isInitializing ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-0"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8 border-b border-sky-200/15 pb-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-100">结构解码实验室</h2>
            <p className="text-sky-100/90 max-w-xl tracking-widest text-base md:text-lg font-serif">
              白盒化展示 AI 处理流程，从原始拓片到拓扑图表征，量化每一个演化节点。
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 md:gap-5 text-left md:text-right">
            <div className="flex items-center gap-3">
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center gap-2 px-4 py-2 border border-sky-300/50 text-sky-200 hover:bg-sky-300/10 transition-colors text-sm tracking-widest uppercase font-mono"
              >
                <Upload className="w-3.5 h-3.5" /> Start
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadedName && (
                <span className="text-xs md:text-sm text-zinc-400 max-w-[180px] truncate" title={uploadedName}>
                  {uploadedName}
                </span>
              )}
            </div>

            <div className="flex gap-6 md:gap-8 text-left md:text-right">
            <div>
              <div className="text-sm tracking-widest uppercase opacity-50 mb-1 text-zinc-400">Model Version</div>
              <div className="font-mono text-base md:text-lg text-sky-200">Oracle-Net v4.2</div>
            </div>
            <div>
              <div className="text-sm tracking-widest uppercase opacity-50 mb-1 text-zinc-400">Compute Power</div>
              <div className="font-mono text-base md:text-lg text-amber-300">12.4 TFLOPS</div>
            </div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Process Flow */}
          <div className="lg:col-span-9 space-y-6 md:space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.45fr] border-t border-l border-sky-200/15">
              {DECODING_STEPS.map((step, idx) => (
                <button
                  key={step.stage}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-4 md:p-6 border-r border-b border-sky-200/15 transition-all text-left group ${
                    activeStep === idx 
                      ? 'bg-sky-300/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Active Indicator */}
                  {activeStep === idx && (
                    <motion.div layoutId="active-step" className="absolute top-0 left-0 w-full h-0.5 bg-sky-300" />
                  )}
                  <div className={`text-sm font-mono mb-2 md:mb-3 tracking-widest transition-colors ${activeStep === idx ? 'text-sky-200' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    STEP 0{idx + 1}
                  </div>
                  <div className={`font-serif text-sm md:text-lg lg:text-xl md:whitespace-nowrap transition-colors ${activeStep === idx ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-100'}`}>
                    {step.stage}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative h-[500px] md:h-[660px] border border-sky-200/20 bg-[#141d2e]/70 backdrop-blur-sm group overflow-hidden p-2 md:p-3 flex flex-col">
              {/* Corner Brackets for Scientific Instrument Feel */}
              <div className="absolute top-0 left-0 w-4 md:w-8 h-4 md:h-8 border-t border-l border-sky-300/45" />
              <div className="absolute top-0 right-0 w-4 md:w-8 h-4 md:h-8 border-t border-r border-sky-300/45" />
              <div className="absolute bottom-0 left-0 w-4 md:w-8 h-4 md:h-8 border-b border-l border-sky-300/45" />
              <div className="absolute bottom-0 right-0 w-4 md:w-8 h-4 md:h-8 border-b border-r border-sky-300/45" />

              {canPreviewLarge && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={openPreview}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-sky-300/40 text-sky-200 hover:bg-sky-300/10 transition-colors text-xs font-mono"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> 预览
                  </button>
                  <a
                    href={stageImage || '#'}
                    download={`${DECODING_STEPS[activeStep].stage}.png`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-amber-300/40 text-amber-200 hover:bg-amber-300/10 transition-colors text-xs font-mono"
                  >
                    <Download className="w-3.5 h-3.5" /> 下载
                  </a>
                </div>
              )}

              <div className="relative flex-1 min-h-0 overflow-hidden bg-[#0f1626]/85 border border-sky-200/10">

              {activeStep < 3 && stageImage ? (
                <motion.img
                  key={`${activeStep}-${stageImage}-${hasAnalyzed ? 'analyzed' : 'raw'}`}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  src={stageImage}
                  alt={DECODING_STEPS[activeStep].stage}
                  className="w-full h-full object-contain p-3 md:p-5 opacity-95"
                />
              ) : (
                <motion.div
                  key={analysisContent.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full p-5 md:p-8 overflow-y-auto bg-gradient-to-b from-[#1c2a44] to-[#141d2f]"
                >
                  <div className="flex items-center gap-2 mb-4 md:mb-6">
                    <div className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                    <h4 className="text-sky-100 font-semibold tracking-wide text-base md:text-lg">{analysisContent.title}</h4>
                    <span className="ml-1 px-2.5 py-0.5 border border-amber-300/40 text-amber-200 bg-amber-300/10 rounded-full text-xs md:text-sm font-mono tracking-wide">
                      把握率 {analysisContent.confidence}
                    </span>
                  </div>
                  <div className="space-y-3 md:space-y-4 text-zinc-200 leading-relaxed text-sm md:text-base">
                    {analysisContent.points.map((point) => (
                      <p key={point} className="border-l border-sky-300/40 pl-3 md:pl-4">
                        {point}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Static Crosshairs instead of moving scanline */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 ${activeStep === 3 ? 'hidden' : ''}`}>
                <div className="w-full h-px bg-sky-300 absolute" />
                <div className="h-full w-px bg-sky-300 absolute" />
                <div className="w-8 md:w-16 h-8 md:h-16 border border-sky-300 rounded-full absolute" />
              </div>

              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-[#0d1526]/82 backdrop-blur-[1px] flex items-center justify-center"
                  >
                    <div className="w-[88%] max-w-md border border-sky-300/35 bg-[#13203a]/95 p-5 md:p-6">
                      <div className="text-sky-100 font-serif text-lg md:text-xl mb-3">模型正在分析与输出中</div>
                      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
                        正在进行骨架提取、拓扑建模与候选匹配，请稍后，系统正在分析。
                      </p>
                      <div className="h-1.5 bg-sky-200/15 overflow-hidden">
                        <motion.div
                          animate={{ width: `${analysisProgress}%` }}
                          className="h-full bg-gradient-to-r from-sky-300 to-amber-300"
                        />
                      </div>
                      <div className="mt-2 text-right text-xs font-mono tracking-wider text-sky-200/80">
                        {analysisProgress}%
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
              
              <div className="mt-3 md:mt-4 border border-sky-300/12 bg-[#152033]/75 p-4 md:p-5">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className="w-1.5 h-1.5 bg-sky-300 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-amber-300 uppercase tracking-widest">
                    {activeStep === 3 ? 'Inference Notes' : 'Processing Output'}
                  </span>
                </div>
                <p className="text-zinc-200 text-sm md:text-base leading-relaxed tracking-wide font-serif">
                  {DECODING_STEPS[activeStep].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Metrics Panel */}
          <div className="lg:col-span-3 border border-sky-200/20 bg-[#141d2e]/70 backdrop-blur-sm p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 border-b border-sky-200/15 pb-4 md:pb-6 mb-6 md:mb-8">
              <Database className="text-sky-300 w-4 h-4" />
              <h3 className="text-base font-serif tracking-widest text-sky-200 uppercase">量化指标</h3>
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={!uploadedImage || isAnalyzing}
              className="mb-6 md:mb-8 inline-flex items-center justify-center gap-2 px-4 py-3 border border-sky-300/40 text-sky-200 hover:bg-sky-300/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors text-sm tracking-widest uppercase font-mono"
            >
              <Play className="w-3.5 h-3.5" />
              {isAnalyzing ? '分析中...' : '开始分析'}
            </button>

            <div className="space-y-6 md:space-y-8 flex-grow">
              {Object.entries(DECODING_STEPS[activeStep].metrics).map(([key, value]) => (
                <div key={key} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm uppercase tracking-widest text-zinc-500">
                    <span>{key}</span>
                    <span className="text-sky-300 font-mono">{value}</span>
                  </div>
                  <div className="h-px bg-white/10 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: typeof value === 'string' && value.includes('%') ? value : '85%' }}
                      className="absolute top-0 left-0 h-full bg-sky-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-sky-200/15">
              <div className="text-sm uppercase tracking-widest text-sky-300/60 mb-2 md:mb-3 font-mono">System Trace</div>
              <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-mono">
                {isAnalyzing ? (
                  <>
                    &gt; Extracting feature vectors via CNN...<br/>
                    &gt; Building graph topology from skeleton...<br/>
                    &gt; Matching candidate symbols...<br/>
                    &gt; Preparing inference output...
                  </>
                ) : (
                  <>
                    &gt; Extracting feature vectors via CNN...<br/>
                    &gt; Calculating cosine similarity...<br/>
                    &gt; Topological consistency verified.<br/>
                    &gt; Match confidence optimal.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-6xl max-h-[92vh] bg-[#101827] border border-sky-300/25"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-sky-300/15">
                <div className="text-sky-100 font-serif text-base md:text-lg">{previewTitle} 大图预览</div>
                <div className="flex items-center gap-2">
                  <a
                    href={previewImage}
                    download={`${previewTitle}.png`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-amber-300/40 text-amber-200 hover:bg-amber-300/10 transition-colors text-xs font-mono"
                  >
                    <Download className="w-3.5 h-3.5" /> 下载
                  </a>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="inline-flex items-center justify-center w-8 h-8 border border-sky-300/30 text-sky-200 hover:bg-sky-300/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-[70vh] p-3 md:p-5">
                <img src={previewImage} alt={previewTitle} className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
