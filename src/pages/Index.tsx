import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CardStack from '@/components/CardStack';
import TaskPool from '@/components/TaskPool';
import EveningReminder from '@/components/EveningReminder';
import MonthlyReport from '@/components/MonthlyReport';
import BottomNav, { TabKey } from '@/components/BottomNav';
import { MessageCard } from '@/data/mockData';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('catchup');
  const [actionCount, setActionCount] = useState({ save: 0, postpone: 0, done: 0 });

  const handleCardAction = (card: MessageCard, action: 'save' | 'postpone' | 'done') => {
    setActionCount((prev) => ({ ...prev, [action]: prev[action] + 1 }));
    const messages = {
      save: `✓ 已收藏「${card.title}」`,
      postpone: `← 已暂存「${card.title}」`,
      done: `↑ 已标记处理「${card.title}」`,
    };
    toast(messages[action], { duration: 1500 });
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight font-display">QQ 不漏</h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">学习执行保障系统</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="pill-primary text-[10px]">Demo</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden px-5 pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'catchup' && <CardStack onAction={handleCardAction} />}
            {activeTab === 'tasks' && <TaskPool />}
            {activeTab === 'evening' && <EveningReminder />}
            {activeTab === 'report' && <MonthlyReport />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav */}
      <BottomNav
        active={activeTab}
        onChange={setActiveTab}
        badge={{ tasks: 3, evening: 2 }}
      />
    </div>
  );
};

export default Index;
