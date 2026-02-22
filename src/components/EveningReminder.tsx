import { motion } from 'framer-motion';
import { Moon, FileText, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

const reminders = [
  {
    type: 'unread',
    icon: FileText,
    title: '2 份资料未查看',
    items: ['期末考试范围与复习重点.pdf', '课件更新：机器学习第9讲'],
    urgency: 'normal',
  },
  {
    type: 'deadline',
    icon: AlertTriangle,
    title: '1 个 DDL 即将到来',
    items: ['第12周编程作业 — 本周五 23:59'],
    urgency: 'high',
  },
  {
    type: 'reminder',
    icon: Clock,
    title: '1 项任务 24h 未处理',
    items: ['查看分组名单并联系组员'],
    urgency: 'medium',
  },
];

const urgencyStyles = {
  high: 'border-l-destructive bg-destructive/5',
  medium: 'border-l-accent bg-accent/5',
  normal: 'border-l-primary bg-primary/5',
};

export default function EveningReminder() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-4">
          <Moon className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">晚间提醒</h2>
        <p className="text-sm text-muted-foreground mt-1">21:30 · 今日学习兜底</p>
      </motion.div>

      {/* Reminder cards */}
      <div className="space-y-3 flex-1">
        {reminders.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`glass-card border-l-4 ${urgencyStyles[r.urgency as keyof typeof urgencyStyles]} p-4`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${
                  r.urgency === 'high'
                    ? 'text-destructive'
                    : r.urgency === 'medium'
                      ? 'text-accent'
                      : 'text-primary'
                }`} />
                <h3 className="text-sm font-bold text-card-foreground">{r.title}</h3>
              </div>
              <div className="space-y-1.5 pl-8">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-6 pb-2"
      >
        <p className="text-xs text-muted-foreground italic">
          "不是打扰，是你的学习兜底机制"
        </p>
      </motion.div>
    </div>
  );
}
