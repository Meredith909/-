import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { FileText, Presentation, FileType, Link, Image, Clock, GraduationCap, Sparkles } from 'lucide-react';
import { MessageCard } from '@/data/mockData';
import { useState } from 'react';

const fileIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  ppt: Presentation,
  doc: FileType,
  link: Link,
  image: Image,
};

const roleLabels: Record<string, string> = {
  teacher: '教师',
  ta: '助教',
  student: '同学',
  admin: '管理员',
};

interface SwipeCardProps {
  card: MessageCard;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
  index: number;
}

export default function SwipeCard({ card, onSwipe, isTop, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);

  const saveOpacity = useTransform(x, [0, 100, 200], [0, 0.8, 1]);
  const postponeOpacity = useTransform(x, [-200, -100, 0], [1, 0.8, 0]);
  const doneOpacity = useTransform(y, [-200, -100, 0], [1, 0.8, 0]);

  const [expanded, setExpanded] = useState(false);

  const FileIcon = card.fileType ? fileIcons[card.fileType] || FileText : FileText;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset } = info;
    if (offset.y < -120) {
      onSwipe('up');
    } else if (offset.x > 120) {
      onSwipe('right');
    } else if (offset.x < -120) {
      onSwipe('left');
    }
  };

  const confidenceColor = card.confidence >= 85
    ? 'bg-success'
    : card.confidence >= 60
      ? 'bg-accent'
      : 'bg-muted-foreground/30';

  if (!isTop) {
    return (
      <motion.div
        className="swipe-card absolute inset-0 p-6"
        style={{
          scale: 1 - index * 0.04,
          y: index * 8,
          zIndex: -index,
        }}
        initial={{ scale: 1 - index * 0.04, y: index * 8 }}
      >
        <div className="opacity-60">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{card.source}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">{card.title}</h3>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="swipe-card absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, opacity, zIndex: 10 }}
      drag={!expanded}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      whileTap={{ scale: expanded ? 1 : 1.02 }}
    >
      {/* Swipe indicators */}
      <motion.div
        className="absolute top-6 right-6 z-20 gradient-success text-success-foreground px-4 py-2 rounded-xl font-bold text-sm tracking-wide"
        style={{ opacity: saveOpacity }}
      >
        ✓ 收藏
      </motion.div>
      <motion.div
        className="absolute top-6 left-6 z-20 bg-muted text-muted-foreground px-4 py-2 rounded-xl font-bold text-sm tracking-wide"
        style={{ opacity: postponeOpacity }}
      >
        ← 稍后
      </motion.div>
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 gradient-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm tracking-wide"
        style={{ opacity: doneOpacity }}
      >
        ↑ 已处理
      </motion.div>

      <div className="p-6 h-full flex flex-col" onClick={() => setExpanded(!expanded)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground">{card.source}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">{card.sender}</span>
                {(card.senderRole === 'teacher' || card.senderRole === 'ta') && (
                  <span className="pill-primary text-[10px] py-0.5 px-1.5">
                    <GraduationCap className="w-2.5 h-2.5 mr-0.5 inline" />
                    {roleLabels[card.senderRole]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{card.time}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-card-foreground mb-3 leading-tight">{card.title}</h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.summary}</p>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {card.hasDeadline && (
            <span className="pill-urgent">
              <Clock className="w-3 h-3 mr-1" />
              {card.deadline}
            </span>
          )}
          {card.category === 'A' && (
            <span className="pill-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              必须处理
            </span>
          )}
          {card.fileType && (
            <span className="pill-badge bg-secondary text-secondary-foreground uppercase text-[10px]">
              {card.fileType}
            </span>
          )}
        </div>

        {/* Confidence bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">AI 置信度</span>
            <span className="text-xs font-semibold text-card-foreground">{card.confidence}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${confidenceColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${card.confidence}%` }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Expanded detail */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border pt-4 space-y-3"
          >
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1">详细摘要</h4>
              <p className="text-sm text-card-foreground leading-relaxed">{card.detailSummary}</p>
            </div>
            {card.suggestedAction && (
              <div className="gradient-primary text-primary-foreground rounded-xl p-3 text-sm font-medium">
                建议行动：{card.suggestedAction}
              </div>
            )}
            <div className="bg-secondary/50 rounded-xl p-3">
              <h4 className="text-xs font-semibold text-muted-foreground mb-1">🤖 AI 判断依据</h4>
              <p className="text-xs text-muted-foreground">{card.aiReason}</p>
            </div>
          </motion.div>
        )}

        {/* Bottom hint */}
        {!expanded && (
          <div className="mt-auto pt-4 text-center">
            <span className="text-xs text-muted-foreground/60">点击展开详情 · 左右滑动操作</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
