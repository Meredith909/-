import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Calendar, Award } from 'lucide-react';
import { monthlyReport } from '@/data/mockData';

export default function MonthlyReport() {
  const r = monthlyReport;

  const stats = [
    { label: '捕获资料', value: r.totalCaptured, suffix: '份', icon: BarChart3, color: 'gradient-primary' },
    { label: '已处理', value: r.totalProcessed, suffix: '份', icon: Award, color: 'gradient-success' },
    { label: '完成率', value: r.completionRate, suffix: '%', icon: TrendingUp, color: 'gradient-primary' },
    { label: '临时抱佛脚', value: r.lastMinuteRate, suffix: '%', icon: Zap, color: 'gradient-urgent' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-lg font-bold text-foreground">月度报告</h2>
        <p className="text-xs text-muted-foreground">2024年12月 · 学习执行总结</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">
                {s.value}<span className="text-sm font-normal text-muted-foreground ml-0.5">{s.suffix}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5 mb-5"
      >
        <h3 className="text-sm font-bold text-card-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          周度压力趋势
        </h3>
        <div className="space-y-3">
          {r.weeklyData.map((w, i) => (
            <div key={w.week} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12 flex-shrink-0">{w.week}</span>
              <div className="flex-1 h-6 bg-secondary rounded-lg overflow-hidden relative">
                <motion.div
                  className={`h-full rounded-lg ${w.stress > 70 ? 'gradient-urgent' : w.stress > 50 ? 'gradient-accent' : 'gradient-primary'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${w.stress}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                />
                <span className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-medium text-muted-foreground">
                  压力 {w.stress}
                </span>
              </div>
              <span className="text-xs text-muted-foreground w-14 text-right flex-shrink-0">
                {w.completed}/{w.tasks}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">高压周</span>
          <span className="pill-urgent text-[10px]">{r.highPressureWeek}</span>
        </div>
      </motion.div>

      {/* Stress meters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5 mb-5"
      >
        <h3 className="text-sm font-bold text-card-foreground mb-4">状态指数</h3>
        <div className="space-y-4">
          {[
            { label: '忙碌指数', value: r.busyIndex },
            { label: '压力指数', value: r.stressIndex },
          ].map((meter) => (
            <div key={meter.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">{meter.label}</span>
                <span className="text-xs font-bold text-card-foreground">{meter.value}/100</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${meter.value > 70 ? 'gradient-urgent' : meter.value > 50 ? 'gradient-accent' : 'gradient-success'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${meter.value}%` }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="gradient-primary rounded-2xl p-5 text-center"
      >
        <p className="text-primary-foreground text-sm font-medium leading-relaxed">
          "{r.summary}"
        </p>
      </motion.div>
    </div>
  );
}
