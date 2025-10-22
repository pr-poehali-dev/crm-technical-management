import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { NavItem } from '@/types';

interface MobileMenuProps {
  navItems: { id: NavItem; label: string; icon: string }[];
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ navItems, activeNav, onNavChange, open, onOpenChange }: MobileMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Icon name="Menu" size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Maintenance CRM</h1>
          <p className="text-sm text-muted-foreground mt-1">Техническое обслуживание</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavChange(item.id);
                onOpenChange(false);
              }}
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
