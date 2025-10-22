import Icon from '@/components/ui/icon';
import { NavItem } from '@/types';

interface SidebarProps {
  navItems: { id: NavItem; label: string; icon: string }[];
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
}

const Sidebar = ({ navItems, activeNav, onNavChange }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Maintenance CRM</h1>
        <p className="text-sm text-muted-foreground mt-1">Техническое обслуживание</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === item.id
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            И
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">Инженер</p>
            <p className="text-xs text-muted-foreground">Иванов А.П.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
