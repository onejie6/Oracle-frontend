export interface EvolutionStep {
  era: string;
  image: string;
  description: string;
}

export interface CharacterData {
  id: string;
  char: string;
  pinyin: string;
  meaning: string;
  oracle: string; // URL or SVG path
  evolution: EvolutionStep[];
  aiAnalysis: string;
  components: string[];
  related: string[];
}

export const CHARACTERS: CharacterData[] = [
  {
    id: 'sun',
    char: '日',
    pinyin: 'rì',
    meaning: 'Sun / Day',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '圆形中有一点，象征太阳及其核心。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条更粗犷，保持圆形结构。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '变为长方形，中间横线连接。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '笔画平直化，奠定现代结构。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“日”字是典型的象形字。甲骨文中的圆圈代表太阳，中间的一点可能代表太阳黑子，或是为了区别于圆形的器物。随着书写工具从刀刻转向毛笔，圆形逐渐演变为矩形。',
    components: ['独体字'],
    related: ['月', '明', '旦', '早'],
  },
  {
    id: 'moon',
    char: '月',
    pinyin: 'yuè',
    meaning: 'Moon / Month',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '月牙形状，区别于圆形的日。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '月牙内部增加线条。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条更加圆润。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '笔画方正化。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“月”字象半月之形。古人通过观察月相变化，选取最具代表性的月牙形状作为符号，以区别于圆形的太阳。',
    components: ['独体字'],
    related: ['日', '明', '夕', '望'],
  },
  {
    id: 'ox',
    char: '牛',
    pinyin: 'niú',
    meaning: 'Ox / Cow',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '正面牛头形，突出弯曲的牛角。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '牛角更加夸张。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条化，牛角与面部连为一体。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '简化为现代笔画雏形。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“牛”字是象形字，甲骨文描绘的是牛头的正面形象，特别强调了那一对向上弯曲的牛角，这是牛最显著的特征。',
    components: ['独体字'],
    related: ['牧', '物', '牢', '牵'],
  },
  {
    id: 'person',
    char: '人',
    pinyin: 'rén',
    meaning: 'Person / Human',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '侧面站立的人形，有头、身、臂、腿。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条更加流畅。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '变为对称的结构。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '撇捺分明。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“人”字在甲骨文中是一个侧面站立的人的形象，弯腰垂臂，表现出人的动态。后演变为撇捺支撑的稳固结构。',
    components: ['独体字'],
    related: ['从', '众', '休', '伐'],
  },
  {
    id: 'field',
    char: '田',
    pinyin: 'tián',
    meaning: 'Field / Farmland',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '阡陌纵横的农田形状。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '结构更加规整。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条均匀，呈标准的网格状。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '笔画方正。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“田”字是象形字，甲骨文直接描绘了被田埂（阡陌）分割成块状的农田。它反映了商代已经有了规划整齐的农业耕作区。',
    components: ['独体字'],
    related: ['男', '苗', '疆', '界'],
  },
  {
    id: 'water',
    char: '水',
    pinyin: 'shuǐ',
    meaning: 'Water / River',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '中间是蜿蜒的水流，两旁是水滴或波纹。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '水流线条更加连贯。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条圆润对称。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '波折明显，开始向现代笔画转变。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“水”字象形，甲骨文生动地描绘了河流中水波荡漾、水滴飞溅的动态场景。中间的主线代表主流，两侧的短线代表支流或水滴。',
    components: ['独体字'],
    related: ['冰', '泉', '河', '海'],
  },
  {
    id: 'tree',
    char: '木',
    pinyin: 'mù',
    meaning: 'Tree / Wood',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '一棵树的形状，有树干、向上的树枝和向下的树根。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '枝干更加粗壮。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条圆转，结构对称。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '横平竖直，撇捺舒展。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代标准写法。' },
    ],
    aiAnalysis: '“木”字是象形字。甲骨文清晰地勾勒出树木的地上部分（树枝）和地下部分（树根），中间是树干。',
    components: ['独体字'],
    related: ['林', '森', '本', '末'],
  },
  {
    id: 'horse',
    char: '马',
    pinyin: 'mǎ',
    meaning: 'Horse',
    oracle: 'https://placehold.co/400x400/fdfbf7/2c1e1a?text=Oracle+Bone',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '侧面马的形象，突出大眼、鬃毛和长尾。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '线条更加繁复，马的特征更明显。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '高度线条化，马鬃变为横线。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '下方四腿变为四点。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=Evolution+Step', description: '现代繁体写法。' },
    ],
    aiAnalysis: '“马”字象形，甲骨文抓住了马的几个关键特征：大大的眼睛、颈部飘逸的鬃毛、修长的身体和下垂的尾巴。',
    components: ['独体字'],
    related: ['骑', '驾', '骏', '驼'],
  }
];

export const DECODING_STEPS = [
  {
    stage: '原始图像',
    image: 'https://placehold.co/400x300/2c1e1a/008b8b?text=Raw+Image',
    metrics: { '清晰度': '0.92', '噪点率': '0.05' },
    description: '获取拓片或骨片的原始扫描图像。'
  },
  {
    stage: '预处理骨架',
    image: 'https://placehold.co/400x300/2c1e1a/008b8b?text=Skeleton',
    metrics: { '笔画提取': '98%', '连通域': '12' },
    description: '通过自适应阈值与中轴提取算法，还原文字的原始笔触骨架。'
  },
  {
    stage: 'Graph 表征',
    image: 'https://placehold.co/400x300/2c1e1a/008b8b?text=Graph',
    metrics: { '节点数': '8', '边数': '7', '拓扑特征': 'Radial' },
    description: '将骨架转化为拓扑图结构，提取节点与分支的几何关系。'
  },
  {
    stage: '结构分类',
    image: 'https://placehold.co/400x300/2c1e1a/008b8b?text=Result',
    metrics: { '置信度': '0.94', '相似度': '0.87' },
    description: '基于图匹配算法与深度学习模型，输出最终的识别结果。'
  }
];

export const UNKNOWN_CASES = [
  {
    id: 'case1',
    image: 'https://placehold.co/300x300/fdfbf7/2c1e1a?text=Unknown+Char',
    candidates: [
      { char: '鼎', confidence: 0.91, evidence: '图像呈现三足两耳状，结构与已知“鼎”字高度一致。' },
      { char: '且', confidence: 0.45, evidence: '部分笔画呈现垂直排列，但缺乏底座支撑特征。' },
      { char: '贝', confidence: 0.32, evidence: '外框相似，但内部装饰纹理不符。' }
    ],
    forensic: {
      image: '边缘锐利，刻痕深，属于晚期风格。',
      structure: '闭合环状结构，具有典型的容器象形特征。',
      evolution: '与西周金文中的“鼎”字有明显的承袭关系。'
    }
  }
];

export const GRAPH_DATA = {
  nodes: [
    { name: '日', category: 0, value: 50 },
    { name: '月', category: 1, value: 40 },
    { name: '明', category: 2, value: 30 },
    { name: '旦', category: 2, value: 30 },
    { name: '早', category: 2, value: 30 },
    { name: '夕', category: 1, value: 30 },
    { name: '望', category: 1, value: 30 },
  ],
  links: [
    { source: '日', target: '明' },
    { source: '月', target: '明' },
    { source: '日', target: '旦' },
    { source: '日', target: '早' },
    { source: '月', target: '夕' },
    { source: '月', target: '望' },
    { source: '日', target: '月' },
  ],
  categories: [
    { name: '核心字' },
    { name: '关联字' },
    { name: '派生字' }
  ]
};
