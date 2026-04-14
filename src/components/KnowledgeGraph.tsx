import React from 'react';
import ReactECharts from 'echarts-for-react';
import { GRAPH_DATA } from '@/data/mockData';

export const KnowledgeGraph = () => {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    legend: [{
      data: GRAPH_DATA.categories.map(a => a.name),
      textStyle: {
        color: '#2c1e1a',
        fontFamily: 'Noto Serif SC'
      },
      bottom: 20
    }],
    series: [
      {
        name: '甲骨知识图谱',
        type: 'graph',
        layout: 'force',
        data: GRAPH_DATA.nodes.map(node => ({
          ...node,
          symbolSize: node.value,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            fontSize: 14,
            fontFamily: 'Noto Serif SC'
          }
        })),
        links: GRAPH_DATA.links,
        categories: GRAPH_DATA.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        force: {
          repulsion: 1000,
          edgeLength: [50, 200]
        },
        lineStyle: {
          color: '#2c1e1a',
          opacity: 0.2,
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4,
            opacity: 1
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
            <div className="absolute top-6 left-6 text-[10px] uppercase tracking-widest text-bone-ink/40 font-mono">
              Network Topology Map
            </div>
            <ReactECharts 
              option={option} 
              style={{ height: '100%', width: '100%' }}
              onEvents={{
                'click': (params: any) => {
                  console.log('Node clicked:', params.name);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
