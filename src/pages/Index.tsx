import { useState } from 'react';
import { NavItem, Incident } from '@/types';
import { incidents, objects, todayTasks, documents, emergencyCalls, equipment } from '@/data/mockData';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import Dashboard from '@/components/Dashboard';
import IncidentsView from '@/components/IncidentsView';
import ObjectsView from '@/components/ObjectsView';
import TasksView from '@/components/TasksView';
import DocumentsView from '@/components/DocumentsView';
import ReportsView from '@/components/ReportsView';
import IncidentDialog from '@/components/IncidentDialog';

const Index = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavItem; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'objects', label: 'Объекты', icon: 'Building2' },
    { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
    { id: 'equipment', label: 'Оборудование', icon: 'Wrench' },
    { id: 'incidents', label: 'Инциденты', icon: 'AlertTriangle' },
    { id: 'documents', label: 'Документы', icon: 'FileText' },
    { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
    { id: 'contractors', label: 'Контрагенты', icon: 'Users' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case 'incidents':
        return <IncidentsView incidents={incidents} onIncidentClick={setSelectedIncident} />;
      case 'objects':
        return <ObjectsView objects={objects} />;
      case 'tasks':
        return <TasksView tasks={todayTasks} />;
      case 'documents':
        return <DocumentsView documents={documents} />;
      case 'reports':
        return <ReportsView emergencyCalls={emergencyCalls} />;
      default:
        return (
          <Dashboard 
            incidents={incidents} 
            todayTasks={todayTasks} 
            equipment={equipment}
            onIncidentClick={setSelectedIncident}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar navItems={navItems} activeNav={activeNav} onNavChange={setActiveNav} />

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <MobileMenu 
              navItems={navItems} 
              activeNav={activeNav} 
              onNavChange={setActiveNav}
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            />
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {renderContent()}
        </div>
      </main>

      <IncidentDialog incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
    </div>
  );
};

export default Index;
