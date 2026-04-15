import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GRAPH_DATA } from '@/data/mockData';
import { oracleSvgPaths } from './OracleSVGs';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const createNodeIcon = (path: string, color: string) => {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#fdfbf7" stroke="${color}" stroke-width="2"/><path d="${path}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `image://data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const LINK_EXPLANATIONS: Record<string, string> = {
  '日-明': '“明”字由“日”和“月”组成（有时是“囧”和“月”），表示日月同辉，光明之意。在甲骨文中，常用来表示光亮或明天。',
  '月-明': '“明”字由“日”和“月”组成（有时是“囧”和“月”），表示日月同辉，光明之意。在甲骨文中，常用来表示光亮或明天。',
  '日-旦': '“旦”字上面是“日”，下面是一条地平线，象征着太阳刚刚升起，即早晨。',
  '日-早': '“早”字上面是“日”，下面是“甲”（类似十字或草木），象征太阳升起在草木之上，表示清晨。',
  '月-夕': '“夕”字是“月”字的简写，或者说“月”字本来就是半个月亮的形状，“夕”字更强调傍晚、夜晚的含义。',
  '月-望': '“望”字在甲骨文中是一个人站在地上，睁大眼睛看着月亮，表示满月或期盼。',
  '日-月': '日与月是甲骨文中代表天体最基本的两个字，经常成对出现，代表时间的流逝和昼夜的交替。'
};

const CATEGORY_COLORS = ['#8b7355', '#008b8b', '#8b0000']; // brown, cyan, red

export const KnowledgeGraph = () => {
  const [selectedLink, setSelectedLink] = useState<{source: string, target: string} | null>(null);

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
        fontFamily: 'Noto Serif SC'
      },
      bottom: 20,
      icon: 'circle'
    }],
    series: [
      {
        name: '甲骨知识图谱',
        type: 'graph',
        layout: 'force',
        data: GRAPH_DATA.nodes.map(node => ({
          ...node,
          symbol: oracleSvgPaths[node.name] 
            ? createNodeIcon(oracleSvgPaths[node.name], CATEGORY_COLORS[node.category] || '#2c1e1a') 
            : 'circle',
          symbolSize: node.value * 1.2,
          label: {
            show: !oracleSvgPaths[node.name], // Hide text label if we have SVG
            position: 'inside',
            formatter: '{b}',
            fontSize: 14,
            fontFamily: 'Noto Serif SC'
          },
          itemStyle: {
            color: 'transparent',
            borderColor: CATEGORY_COLORS[node.category] || '#2c1e1a',
            borderWidth: 2
          }
        })),
        links: GRAPH_DATA.links.map(link => ({
          ...link,
          lineStyle: {
            width: 2,
            curveness: 0.3,
            color: '#2c1e1a',
            opacity: 0.3
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
          formatter: '{b}'
        },
        force: {
          repulsion: 1000,
          edgeLength: [80, 200]
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4,
            opacity: 0.8,
            color: '#008b8b'
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
              <h2 className="text-4xl font-serif text-bone-ink mb-4">知识图谱联动</h2>
              <p className="text-bone-ink/60 leading-relaxed tracking-widest text-sm">
                基于中心字构建放射状网络，展示语义、部件、演化及拓扑近邻关系。点击节点可联动更新其他模块。
              </p>
            </div>
            
            <div className="space-y-6 border-t border-bone-ink/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 border border-bone-ink bg-bone-brown" />
                <span className="text-sm font-serif text-bone-ink/80 tracking-widest">核心字：原始象形符号</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 border border-bone-ink bg-bone-cyan" />
                <span className="text-sm font-serif text-bone-ink/80 tracking-widest">关联字：语义相近或相反</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 border border-bone-ink bg-bone-red" />
                <span className="text-sm font-serif text-bone-ink/80 tracking-widest">派生字：由核心字演化而来</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 w-full h-[600px] bg-white border border-bone-ink/20 relative overflow-hidden">
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
                  className="absolute bottom-6 right-6 w-80 md:w-96 bg-bone-paper border border-bone-ink/20 shadow-xl z-10 overflow-hidden"
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
                      <div className="w-4 h-4 border border-bone-ink/40 flex items-center justify-center rotate-45">
                        <div className="w-1.5 h-1.5 bg-bone-ink/60" />
                      </div>
                      <h3 className="text-sm font-bold tracking-widest text-bone-ink uppercase font-serif">
                        字理推演
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 px-2">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full border border-bone-ink/20 bg-white flex items-center justify-center relative">
                          <svg viewBox="0 0 100 100" className="w-10 h-10 text-bone-ink relative z-10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d={oracleSvgPaths[selectedLink.source] || ''} />
                          </svg>
                        </div>
                        <span className="text-sm font-serif text-bone-ink/80">{selectedLink.source}</span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center relative px-4">
                        <div className="h-px w-full bg-bone-ink/20" />
                        <div className="absolute w-2 h-2 border-t border-r border-bone-ink/40 rotate-45 bg-bone-paper" />
                      </div>
                      
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full border border-bone-ink/20 bg-white flex items-center justify-center relative">
                          <svg viewBox="0 0 100 100" className="w-10 h-10 text-bone-ink relative z-10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d={oracleSvgPaths[selectedLink.target] || ''} />
                          </svg>
                        </div>
                        <span className="text-sm font-serif text-bone-ink/80">{selectedLink.target}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-bone-ink/10 pb-2">
                        <span className="text-xs font-bold tracking-widest text-bone-ink/40 uppercase">
                          构形解析
                        </span>
                      </div>
                      <p className="text-sm text-bone-ink/80 leading-relaxed font-serif">
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
