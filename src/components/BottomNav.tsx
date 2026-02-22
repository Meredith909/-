import { Layers, ListTodo, Moon, BarChart3 } from 'lucide-react';

export type TabKey = 'catchup' | 'tasks' | 'evening' | 'report';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'catchup', label: '速览', icon: Layers },
  { key: 'tasks', label: '任务', icon: ListTodo },
  { key: 'evening', label: '提醒', icon: Moon },
  { key: 'report', label: '报告', icon: BarChart3 },
];

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  badge?: Partial<Record<TabKey, number>>;
}

export default function BottomNav({ active, onChange, badge = {} }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around py-2 px-4 bg-card/90 backdrop-blur-xl border-t border-border/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={isActive ? 'nav-item-active' : 'nav-item'}
          >
            <div className="relative">
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              {badge[tab.key] && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full gradient-urgent text-[9px] text-urgent-foreground font-bold flex items-center justify-center">
                  {badge[tab.key]}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
