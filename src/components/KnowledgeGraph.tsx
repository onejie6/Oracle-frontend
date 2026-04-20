import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GRAPH_DATA } from '@/data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const ORACLE_IMAGE_MAP: Record<string, string> = {
  '日': '/pictures/日.png',
  '旦': '/pictures/旦.png',
  '明': '/pictures/明.png',
  '望': '/pictures/望.png',
  '夕': '/pictures/夕.png',
  '月': '/pictures/月.png',
};

const FRAME_FILL = '#fffdf6';
const LINK_HOVER_COLOR = '#f3d27a';

const LINK_EXPLANATIONS: Record<string, string> = {
  '日-明': '“明”字由“日”和“月”组成（有时是“囧”和“月”），表示日月同辉，光明之意。在甲骨文中，常用来表示光亮或明天。',
  '月-明': '“明”字由“日”和“月”组成（有时是“囧”和“月”），表示日月同辉，光明之意。在甲骨文中，常用来表示光亮或明天。',
  '日-旦': '“旦”字上面是“日”，下面是一条地平线，象征着太阳刚刚升起，即早晨。',
  '月-夕': '“夕”字是“月”字的简写，或者说“月”字本来就是半个月亮的形状，“夕”字更强调傍晚、夜晚的含义。',
  '月-望': '“望”字在甲骨文中是一个人站在地上，睁大眼睛看着月亮，表示满月或期盼。',
  '日-月': '日与月是甲骨文中代表天体最基本的两个字，经常成对出现，代表时间的流逝和昼夜的交替。'
};

const CATEGORY_COLORS = ['#8b7355', '#008b8b', '#8b0000'];

export const KnowledgeGraph = () => {
  const [selectedLink, setSelectedLink] = useState<{source: string, target: string} | null>(null);

  const nodeCategoryMap = GRAPH_DATA.nodes.reduce<Record<string, number>>((acc, node) => {
    acc[node.name] = node.category;
    return acc;
  }, {});

  const getCategoryColor = (char: string) => CATEGORY_COLORS[nodeCategoryMap[char] ?? 0];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        if (params.dataType === 'edge') {
          return `${params.data.source} - ${params.data.target}`;
        }
        return params.name;
      }
    },
    legend: [{
      data: GRAPH_DATA.categories.map(a => a.name),
      textStyle: {
        color: '#2c1e1a',
        fontFamily: 'Noto Serif SC',
        fontSize: 18,
      },
      bottom: 22,
      itemWidth: 14,
      itemHeight: 14,
      itemGap: 24,
      icon: 'circle'
    }],
    series: [
      {
        name: '甲骨知识图谱',
        type: 'graph',
        layout: 'force',
        data: GRAPH_DATA.nodes.map(node => {
          const nodeSymbolSize = node.value * 2.1;
          const glyphSize = Math.round(nodeSymbolSize * 0.62);
          return {
            ...node,
            symbol: 'circle',
            symbolSize: nodeSymbolSize,
            label: {
              show: true,
              position: 'inside',
              formatter: ORACLE_IMAGE_MAP[node.name] ? `{glyph| }` : `{name|${node.name}}`,
              fontSize: 16,
              fontFamily: 'Noto Serif SC',
              rich: ORACLE_IMAGE_MAP[node.name]
                ? {
                    glyph: {
                      width: glyphSize,
                      height: glyphSize,
                      align: 'center',
                      backgroundColor: {
                        image: ORACLE_IMAGE_MAP[node.name],
                      },
                    },
                  }
                : {
                    name: {
                      color: '#2c1e1a',
                      fontSize: 18,
                      fontFamily: 'Noto Serif SC',
                      fontWeight: 600,
                    },
                  },
            },
            itemStyle: {
              color: FRAME_FILL,
              borderColor: CATEGORY_COLORS[node.category] || '#8b7355',
              borderWidth: 3.2,
              shadowColor: 'rgba(44,30,26,0.18)',
              shadowBlur: 14,
            }
          };
        }),
        links: GRAPH_DATA.links.map(link => ({
          ...link,
          lineStyle: {
            width: 3,
            curveness: 0.28,
            color: CATEGORY_COLORS[nodeCategoryMap[link.source] ?? 0],
            opacity: 0.48
          }
        })),
        categories: GRAPH_DATA.categories.map((cat, idx) => ({
          name: cat.name,
          itemStyle: {
            color: CATEGORY_COLORS[idx]
          }
        })),
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          fontSize: 16,
          color: '#2c1e1a'
        },
        force: {
          repulsion: 1820,
          edgeLength: [175, 380]
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4.2,
            opacity: 1,
            color: LINK_HOVER_COLOR
          }
        }
      }
    ]
  };

  return (
    <section id="图谱" className="py-24 bg-bone-paper relative border-t border-bone-ink/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif text-bone-ink mb-5">知识图谱联动</h2>
              <p className="text-bone-ink/60 leading-relaxed tracking-widest text-base md:text-lg">
                基于中心字构建放射状网络，展示语义、部件、演化及拓扑近邻关系。点击节点可联动更新其他模块。
              </p>
            </div>
            
            <div className="space-y-6 border-t border-bone-ink/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border border-bone-ink bg-bone-brown" />
                <span className="text-base md:text-lg font-serif text-bone-ink/80 tracking-widest">核心字：原始象形符号</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border border-bone-ink bg-bone-cyan" />
                <span className="text-base md:text-lg font-serif text-bone-ink/80 tracking-widest">关联字：语义相近或相反</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border border-bone-ink bg-bone-red" />
                <span className="text-base md:text-lg font-serif text-bone-ink/80 tracking-widest">派生字：由核心字演化而来</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 w-full h-[680px] bg-white border border-bone-ink/20 relative overflow-hidden">
            <div className="absolute inset-0 parchment-texture opacity-30 pointer-events-none" />
            <ReactECharts 
              option={option} 
              style={{ height: '100%', width: '100%' }}
              onEvents={{
                'click': (params: any) => {
                  if (params.dataType === 'edge') {
                    setSelectedLink({
                      source: params.data.source,
                      target: params.data.target
                    });
                  } else {
                    console.log('Node clicked:', params.name);
                    setSelectedLink(null);
                  }
                }
              }}
            />

            {/* AI Explanation Panel */}
            <AnimatePresence>
              {selectedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute bottom-6 right-6 w-[24rem] md:w-[32rem] bg-bone-paper border border-bone-ink/20 shadow-xl z-10 overflow-hidden"
                >
                  <div className="absolute inset-0 parchment-texture opacity-50 pointer-events-none" />
                  <div className="relative p-6">
                    <button 
                      onClick={() => setSelectedLink(null)}
                      className="absolute top-4 right-4 text-bone-ink/40 hover:text-bone-ink transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-5 h-5 border border-bone-ink/40 flex items-center justify-center rotate-45">
                        <div className="w-2 h-2 bg-bone-ink/60" />
                      </div>
                      <h3 className="text-base font-bold tracking-widest text-bone-ink uppercase font-serif">
                        字理推演
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 px-2">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-full border-2 bg-[#fffdf5] flex items-center justify-center relative overflow-hidden" style={{ borderColor: getCategoryColor(selectedLink.source) }}>
                          {ORACLE_IMAGE_MAP[selectedLink.source] ? (
                            <img
                              src={ORACLE_IMAGE_MAP[selectedLink.source]}
                              alt={selectedLink.source}
                              className="w-16 h-16 object-contain opacity-95"
                            />
                          ) : (
                            <span className="text-3xl font-serif text-bone-ink">{selectedLink.source}</span>
                          )}
                        </div>
                        <span className="text-base font-serif text-bone-ink/85">{selectedLink.source}</span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center relative px-4">
                        <div className="h-px w-full bg-[#d9c8a0]" />
                        <div className="absolute w-3 h-3 border-t border-r border-[#d9c8a0] rotate-45 bg-bone-paper" />
                      </div>
                      
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-full border-2 bg-[#fffdf5] flex items-center justify-center relative overflow-hidden" style={{ borderColor: getCategoryColor(selectedLink.target) }}>
                          {ORACLE_IMAGE_MAP[selectedLink.target] ? (
                            <img
                              src={ORACLE_IMAGE_MAP[selectedLink.target]}
                              alt={selectedLink.target}
                              className="w-16 h-16 object-contain opacity-95"
                            />
                          ) : (
                            <span className="text-3xl font-serif text-bone-ink">{selectedLink.target}</span>
                          )}
                        </div>
                        <span className="text-base font-serif text-bone-ink/85">{selectedLink.target}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-bone-ink/10 pb-2">
                        <span className="text-sm font-bold tracking-widest text-bone-ink/40 uppercase">
                          构形解析
                        </span>
                      </div>
                      <p className="text-base text-bone-ink/80 leading-relaxed font-serif">
                        {LINK_EXPLANATIONS[`${selectedLink.source}-${selectedLink.target}`] || 
                         LINK_EXPLANATIONS[`${selectedLink.target}-${selectedLink.source}`] || 
                         '这两个字在甲骨文中存在紧密的语义或构形关联。'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
