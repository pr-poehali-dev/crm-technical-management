import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

type NavItem = 'dashboard' | 'objects' | 'tasks' | 'equipment' | 'incidents' | 'documents' | 'reports' | 'calendar' | 'contractors' | 'settings';

const Index = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

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

  const incidents = [
    { id: 1, object: 'ТЦ "Галерея"', type: 'Электричество', priority: 'high', status: 'active', time: '14:30' },
    { id: 2, object: 'БЦ "Сириус"', type: 'Отопление', priority: 'medium', status: 'active', time: '12:15' },
    { id: 3, object: 'Склад №3', type: 'Водоснабжение', priority: 'low', status: 'pending', time: '10:00' },
  ];

  const todayTasks = [
    { id: 1, title: 'Осмотр электрощитовой', object: 'ТЦ "Галерея"', time: '09:00', done: true },
    { id: 2, title: 'Замена насоса ГВС', object: 'БЦ "Сириус"', time: '11:00', done: true },
    { id: 3, title: 'Проверка системы вентиляции', object: 'Склад №3', time: '15:00', done: false },
    { id: 4, title: 'Подготовка отчета для Горгаза', object: 'БЦ "Альфа"', time: '17:00', done: false },
  ];

  const equipment = [
    { id: 1, name: 'Котел №1', object: 'БЦ "Сириус"', status: 'warning', health: 65 },
    { id: 2, name: 'Трансформатор Т-1', object: 'ТЦ "Галерея"', status: 'good', health: 92 },
    { id: 3, name: 'Насос ХВС', object: 'Склад №3', status: 'critical', health: 35 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-amber-600';
      case 'good': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Maintenance CRM</h1>
          <p className="text-sm text-muted-foreground mt-1">Техническое обслуживание</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
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

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Дашборд</h2>
              <p className="text-sm text-muted-foreground mt-1">Обзор текущей ситуации</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать инцидент
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Активные инциденты</p>
                    <p className="text-3xl font-bold text-foreground mt-2">7</p>
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <Icon name="TrendingUp" size={12} />
                      +2 за сегодня
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <Icon name="AlertTriangle" size={24} className="text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Задачи на сегодня</p>
                    <p className="text-3xl font-bold text-foreground mt-2">12</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <Icon name="CheckCircle2" size={12} />
                      8 выполнено
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon name="CheckSquare" size={24} className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Объекты</p>
                    <p className="text-3xl font-bold text-foreground mt-2">24</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      На обслуживании
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Icon name="Building2" size={24} className="text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Критичное оборудование</p>
                    <p className="text-3xl font-bold text-foreground mt-2">3</p>
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      Требует внимания
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Icon name="Wrench" size={24} className="text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Активные инциденты</span>
                  <Badge variant="destructive">{incidents.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className={`w-1 h-12 rounded-full ${getPriorityColor(incident.priority)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{incident.object}</p>
                        <Badge variant="outline" className="text-xs">{incident.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{incident.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Открыть
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Задачи на сегодня</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                      task.done ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {task.done && <Icon name="Check" size={14} className="text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Icon name="MapPin" size={12} className="text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{task.object}</p>
                        <span className="text-muted-foreground">•</span>
                        <Icon name="Clock" size={12} className="text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{task.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Состояние оборудования</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.object}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
                            {item.health}%
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={item.health} 
                        className={`h-2 ${
                          item.health > 80 ? '[&>div]:bg-green-500' : 
                          item.health > 50 ? '[&>div]:bg-amber-500' : 
                          '[&>div]:bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
