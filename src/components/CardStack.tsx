import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowUp, RotateCcw } from 'lucide-react';
import SwipeCard from './SwipeCard';
import { MessageCard, mockCards } from '@/data/mockData';

interface CardStackProps {
  onAction: (card: MessageCard, action: 'save' | 'postpone' | 'done') => void;
}

export default function CardStack({ onAction }: CardStackProps) {
  const [cards, setCards] = useState<MessageCard[]>([...mockCards]);
  const [lastRemoved, setLastRemoved] = useState<MessageCard | null>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (cards.length === 0) return;
    const current = cards[0];
    setLastRemoved(current);
    setCards((prev) => prev.slice(1));

    const actionMap = { right: 'save', left: 'postpone', up: 'done' } as const;
    onAction(current, actionMap[direction]);
  };

  const handleUndo = () => {
    if (lastRemoved) {
      setCards((prev) => [lastRemoved, ...prev]);
      setLastRemoved(null);
    }
  };

  const handleReset = () => {
    setCards([...mockCards]);
    setLastRemoved(null);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full gradient-success flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-success-foreground" />
        </motion.div>
        <h3 className="text-xl font-bold text-foreground">全部处理完毕！</h3>
        <p className="text-sm text-muted-foreground">今天的消息已经全部筛选完成</p>
        <button
          onClick={handleReset}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          重新演示
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Counter */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-lg font-bold text-foreground">待筛选</h2>
          <p className="text-xs text-muted-foreground">剩余 {cards.length} 条消息</p>
        </div>
        {lastRemoved && (
          <button
            onClick={handleUndo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            撤销
          </button>
        )}
      </div>

      {/* Card area */}
      <div className="relative flex-1 min-h-[420px]">
        <AnimatePresence>
          {cards.slice(0, 3).map((card, i) => (
            <SwipeCard
              key={card.id}
              card={card}
              onSwipe={handleSwipe}
              isTop={i === 0}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-all hover:scale-110 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSwipe('up')}
          className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-all active:scale-95"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full gradient-success flex items-center justify-center text-success-foreground hover:scale-110 transition-all active:scale-95"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-3 pb-1">
        <span className="text-[10px] text-muted-foreground">← 稍后</span>
        <span className="text-[10px] text-muted-foreground">↑ 已处理</span>
        <span className="text-[10px] text-muted-foreground">✓ 收藏 →</span>
      </div>
    </div>
  );
}
