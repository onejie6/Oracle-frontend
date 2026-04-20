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
    oracle: '/pictures/sun_jiaguwen.png',
    evolution: [
      { era: '甲骨文', image: '/pictures/sun_jiaguwen.png', description: '圆形中有一点，象征太阳及其核心。' },
      { era: '金文', image: '/pictures/sun_jinwen.png', description: '线条更粗犷，保持圆形结构。' },
      { era: '小篆', image: '/pictures/sun_xiaozhuan.jpg', description: '变为长方形，中间横线连接。' },
      { era: '隶书', image: '/pictures/sun_lishu.png', description: '笔画平直化，奠定现代结构。' },
      { era: '楷书', image: '/pictures/sun_kaishu.png', description: '现代标准写法。' },
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
    oracle: '/pictures/牛.png',
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
    oracle: '/pictures/人.png',
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
    oracle: '/pictures/木.png',
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
    oracle: '/pictures/马.png',
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
  },
  {
    id: 'home',
    char: '家',
    pinyin: 'jiā',
    meaning: 'Home / House',
    oracle: '/pictures/家.png',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=JIA+Oracle', description: '屋宇轮廓明显，强调“居所”语义。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=JIA+Bronze', description: '结构趋于规整，内部构件更清晰。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=JIA+Seal', description: '线条圆转，重心收拢。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=JIA+Clerical', description: '横向展开，笔势平稳。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=JIA+Regular', description: '形成现代标准写法。' },
    ],
    aiAnalysis: '“家”在甲骨文阶段常以屋宇外形表达“可居之所”，字形具有明显的包覆与庇护感。当前版本为占位解读，后续可替换为真实字例与释文。',
    components: ['宀部构形（占位）'],
    related: ['室', '安', '宫', '宿'],
  },
  {
    id: 'mountain',
    char: '山',
    pinyin: 'shān',
    meaning: 'Mountain / Ridge',
    oracle: '/pictures/山.png',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=SHAN+Oracle', description: '以连峰并立的轮廓表达山峦起伏。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=SHAN+Bronze', description: '山体结构更厚重，峰形更分明。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=SHAN+Seal', description: '线条圆转，三峰关系更均衡。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=SHAN+Clerical', description: '笔势趋平，结构更规整。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=SHAN+Regular', description: '形成现代“山”字写法。' },
    ],
    aiAnalysis: '“山”字是典型象形字，早期字形直接模拟峰峦并立的地貌特征。当前内容为占位版本，便于首页交互与后续替换真实释文。',
    components: ['山形构件（占位）'],
    related: ['岳', '岩', '岭', '峰'],
  },
  {
    id: 'cloud',
    char: '云',
    pinyin: 'yún',
    meaning: 'Cloud / Vapor',
    oracle: '/pictures/云.png',
    evolution: [
      { era: '甲骨文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=YUN+Oracle', description: '以卷曲线条象征云气聚散。' },
      { era: '金文', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=YUN+Bronze', description: '形体更厚重，云团层次更明显。' },
      { era: '小篆', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=YUN+Seal', description: '线条圆融，转折更加流畅。' },
      { era: '隶书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=YUN+Clerical', description: '波磔特征增强，结构趋于平展。' },
      { era: '楷书', image: 'https://placehold.co/200x200/fdfbf7/2c1e1a?text=YUN+Regular', description: '形成现代“云”字规范写法。' },
    ],
    aiAnalysis: '“云”字属于象形化较强的自然意象字，早期通过卷曲与起伏线条呈现气流与云团形态。当前条目为占位讲解，后续可替换为实测字例与语境证据。',
    components: ['云气构形（占位）'],
    related: ['雨', '雷', '电', '气'],
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
    id: 'UNK-001',
    source: 'YINXU',
    note: '该字当前依据单字字形进行初步分析',
    image: 'https://placehold.co/300x300/fdfbf7/2c1e1a?text=UNK-001',
    candidates: [
      { title: '宫室类未登录异体', confidence: 0.48, evidence: '字形外轮廓呈明显覆顶式结构，内部为双构件组合，整体落在“宀部 / 宫室类”构形范围内，但与已破译的“官、室、宮、家”等字均不完全对应，更可能是同系统下的异体写法。' },
      { title: '宫庙相关专名字', confidence: 0.32, evidence: '该字可能并非通行常用字，而是与祭祀场所、居处空间、地名或族名相关的专用字。字形整体具有围护感与场所性，符合甲骨文中专名字常见的图像化特征。' },
      { title: '合文或简省体', confidence: 0.20, evidence: '内部构件关系不够规整，疑似由两个部件压缩组合形成。若原始拓片中存在笔画残泐或并笔现象，则该字也可能属于合文、简省写法，未必能直接对应单一标准汉字。' }
    ],
    forensic: {
      image: '外轮廓呈明显“上覆下包”的屋宇式轮廓，顶部收束，左右两侧向下延展，具有较强的空间围护感，不像一般单体器物字或身体部位字。',
      structure: '字内并非单一中心主笔，而是左右双构件并置，整体更接近“屋内有陈设 / 屋内分区”的构形逻辑，因此优先归入宫室、居处、围护空间相关字群。',
      exclusion: '经与已破译对照表比对，形体相近或语义场接近的“官、室、宮、宫、家、鼎”等字均已在对照表中出现，因此不再作为当前未知字的优先候选，应从直接释读结果中排除。',
      evolution: '该字保留较强图像性，尚未收敛为后世规范字形。说明它更可能处于宫室类字形系统的早期分化阶段，或属于专名字、异体字、合文一类的非标准化写法。'
    },
    expertAdvice: '综合字形轮廓、内部结构及已破译对照排除结果，该字现阶段更适合归入“宫室类构形系统”下继续比对，而不宜直接释为常见字。建议下一步优先结合原拓片高清图、同版字例、上下文卜辞位置及同组材料进行联判，重点核查其是否属于未登录异体、专名字或合文简省体。'
  }
];

export const GRAPH_DATA = {
  nodes: [
    { name: '日', category: 0, value: 50 },
    { name: '月', category: 1, value: 40 },
    { name: '明', category: 2, value: 30 },
    { name: '旦', category: 2, value: 30 },
    { name: '夕', category: 1, value: 30 },
    { name: '望', category: 1, value: 30 },
  ],
  links: [
    { source: '日', target: '明' },
    { source: '月', target: '明' },
    { source: '日', target: '旦' },
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
