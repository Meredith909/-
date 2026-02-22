export interface MessageCard {
  id: string;
  title: string;
  source: string;
  sender: string;
  senderRole: 'teacher' | 'ta' | 'student' | 'admin';
  time: string;
  summary: string;
  fileType?: 'pdf' | 'ppt' | 'doc' | 'link' | 'image';
  confidence: number; // 0-100 AI confidence
  hasDeadline: boolean;
  deadline?: string;
  category: 'A' | 'B'; // A = must handle, B = maybe important
  detailSummary: string;
  suggestedAction?: string;
  aiReason: string;
}

export interface Task {
  id: string;
  title: string;
  source: string;
  status: 'pending' | 'done' | 'overdue';
  deadline?: string;
  createdAt: string;
  cardId: string;
}

export const mockCards: MessageCard[] = [
  {
    id: '1',
    title: '期末考试范围与复习重点.pdf',
    source: '高等数学(A)班',
    sender: '李教授',
    senderRole: 'teacher',
    time: '今天 14:23',
    summary: '期末考试覆盖第3-8章，重点考察微积分与级数',
    fileType: 'pdf',
    confidence: 95,
    hasDeadline: true,
    deadline: '12月28日',
    category: 'A',
    detailSummary: '期末考试范围确定为第3-8章内容。重点章节：第5章（定积分应用）和第7章（无穷级数）。考试形式为闭卷，允许携带计算器。',
    suggestedAction: '下载并阅读考试范围',
    aiReason: '来自课程教师，包含考试关键信息，且有明确截止日期',
  },
  {
    id: '2',
    title: '第12周作业提交通知',
    source: '数据结构课程群',
    sender: '王助教',
    senderRole: 'ta',
    time: '今天 11:05',
    summary: '第12周编程作业需在本周五前提交至OJ平台',
    fileType: 'link',
    confidence: 92,
    hasDeadline: true,
    deadline: '本周五 23:59',
    category: 'A',
    detailSummary: '第12周编程作业共3题，涉及二叉树遍历与图的最短路径。需提交至OJ平台，注意代码规范要求。',
    suggestedAction: '提交作业',
    aiReason: '助教发布的作业通知，有明确截止时间，属于必须完成的学业任务',
  },
  {
    id: '3',
    title: '课件更新：机器学习第9讲',
    source: 'ML研讨班',
    sender: '张教授',
    senderRole: 'teacher',
    time: '昨天 20:15',
    summary: '更新了SVM与核方法的补充材料',
    fileType: 'ppt',
    confidence: 78,
    hasDeadline: false,
    category: 'B',
    detailSummary: '补充了SVM的数学推导过程和核技巧的直观解释。包含3个新的代码示例。建议课前预习。',
    suggestedAction: '打开课件复习',
    aiReason: '课程补充材料，非强制性但与近期教学内容密切相关',
  },
  {
    id: '4',
    title: '期末小组项目分组名单',
    source: '软件工程实践',
    sender: '陈老师',
    senderRole: 'teacher',
    time: '昨天 16:42',
    summary: '分组名单已确定，请查看并联系组员',
    fileType: 'doc',
    confidence: 88,
    hasDeadline: true,
    deadline: '下周一',
    category: 'A',
    detailSummary: '期末项目分组已确定，每组4-5人。需在下周一前完成选题并提交项目计划书。组长需建立协作仓库。',
    suggestedAction: '查看分组并联系组员',
    aiReason: '涉及分组协作，有明确时间节点，需要主动联系组员',
  },
  {
    id: '5',
    title: '学术讲座：AI在教育中的应用',
    source: '计算机学院通知群',
    sender: '院办秘书',
    senderRole: 'admin',
    time: '昨天 09:30',
    summary: '本周四下午2点，图书馆报告厅，可获学术积分',
    fileType: 'image',
    confidence: 55,
    hasDeadline: true,
    deadline: '本周四 14:00',
    category: 'B',
    detailSummary: '邀请了Google DeepMind研究员分享AI教育应用前沿进展。参与可获0.5学术积分。需提前扫码报名。',
    suggestedAction: '考虑是否参加并报名',
    aiReason: '学术活动通知，非必须但有学术积分激励',
  },
  {
    id: '6',
    title: '实验报告模板与评分标准',
    source: '物理实验(二)',
    sender: '刘老师',
    senderRole: 'teacher',
    time: '2天前',
    summary: '新版实验报告模板，评分标准有调整',
    fileType: 'doc',
    confidence: 85,
    hasDeadline: false,
    category: 'B',
    detailSummary: '更新了实验报告格式要求，新增"误差分析"板块（占分20%）。模板已上传至课程平台。',
    suggestedAction: '下载并阅读新模板',
    aiReason: '评分标准变更，影响后续所有实验报告成绩',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: '下载并阅读期末考试范围',
    source: '高等数学(A)班',
    status: 'pending',
    deadline: '12月28日',
    createdAt: '今天 14:23',
    cardId: '1',
  },
  {
    id: 't2',
    title: '提交第12周编程作业',
    source: '数据结构课程群',
    status: 'pending',
    deadline: '本周五 23:59',
    createdAt: '今天 11:05',
    cardId: '2',
  },
  {
    id: 't3',
    title: '查看分组名单并联系组员',
    source: '软件工程实践',
    status: 'pending',
    deadline: '下周一',
    createdAt: '昨天 16:42',
    cardId: '4',
  },
  {
    id: 't4',
    title: '复习线性代数第6章',
    source: '线性代数课程群',
    status: 'done',
    createdAt: '3天前',
    cardId: '',
  },
  {
    id: 't5',
    title: '提交物理实验报告',
    source: '物理实验(二)',
    status: 'done',
    createdAt: '4天前',
    cardId: '',
  },
  {
    id: 't6',
    title: '阅读论文并写摘要',
    source: 'ML研讨班',
    status: 'overdue',
    deadline: '昨天',
    createdAt: '5天前',
    cardId: '',
  },
];

export const monthlyReport = {
  totalCaptured: 42,
  totalProcessed: 35,
  completionRate: 83,
  lastMinuteRate: 60,
  highPressureWeek: '第3周',
  stressIndex: 72,
  busyIndex: 68,
  weeklyData: [
    { week: '第1周', tasks: 8, completed: 7, stress: 35 },
    { week: '第2周', tasks: 10, completed: 9, stress: 45 },
    { week: '第3周', tasks: 15, completed: 11, stress: 85 },
    { week: '第4周', tasks: 9, completed: 8, stress: 50 },
  ],
  summary: '你不是拖延，你只是任务过于集中。',
};
