import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, AlertTriangle, Circle, CheckCircle2 } from 'lucide-react';
import { mockTasks, Task } from '@/data/mockData';

export default function TaskPool() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done' | 'overdue'>('all');

  const filtered = tasks.filter((t) => filter === 'all' || t.status === filter);

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    done: tasks.filter((t) => t.status === 'done').length,
    overdue: tasks.filter((t) => t.status === 'overdue').length,
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
          : t
      )
    );
  };

  const filters = [
    { key: 'all' as const, label: '全部', count: counts.all },
    { key: 'pending' as const, label: '待处理', count: counts.pending },
    { key: 'overdue' as const, label: '逾期', count: counts.overdue },
    { key: 'done' as const, label: '已完成', count: counts.done },
  ];

  const statusConfig = {
    pending: { icon: Circle, color: 'text-primary', bg: 'bg-primary/10' },
    done: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
    overdue: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground">任务池</h2>
        <p className="text-xs text-muted-foreground">AI 自动生成的待办事项</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`pill-badge whitespace-nowrap transition-all ${
              filter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {f.label}
            <span className="ml-1.5 opacity-70">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filtered.map((task) => {
            const config = statusConfig[task.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card-hover p-4 flex items-start gap-3 cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold ${task.status === 'done' ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.source}</p>
                  {task.deadline && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-xs ${task.status === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                        {task.deadline}
                      </span>
                    </div>
                  )}
                </div>
                {task.status === 'done' && (
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
