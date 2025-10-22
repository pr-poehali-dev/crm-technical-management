import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type NavItem = 'dashboard' | 'objects' | 'tasks' | 'equipment' | 'incidents' | 'documents' | 'reports' | 'calendar' | 'contractors' | 'settings';

interface Incident {
  id: number;
  object: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  time: string;
  description?: string;
  reporter?: string;
}

interface BuildingObject {
  id: number;
  name: string;
  address: string;
  type: string;
  systems: string[];
  lastInspection: string;
  status: 'active' | 'warning' | 'critical';
}

interface Task {
  id: number;
  title: string;
  object: string;
  time: string;
  done: boolean;
  type?: 'inspection' | 'repair' | 'maintenance' | 'emergency';
  system?: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  object: string;
  date: string;
  size?: string;
}

interface EmergencyCall {
  id: number;
  object: string;
  type: string;
  date: string;
  duration: string;
  resolved: boolean;
  payment?: number;
}

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

  const incidents: Incident[] = [
    { id: 1, object: 'ТЦ "Галерея"', type: 'Электричество', priority: 'high', status: 'active', time: '14:30', description: 'Отключение электроснабжения в секции А', reporter: 'Администрация ТЦ' },
    { id: 2, object: 'БЦ "Сириус"', type: 'Отопление', priority: 'medium', status: 'active', time: '12:15', description: 'Снижение температуры в помещениях 3 этажа', reporter: 'Служба эксплуатации' },
    { id: 3, object: 'Склад №3', type: 'Водоснабжение', priority: 'low', status: 'pending', time: '10:00', description: 'Слабый напор холодной воды', reporter: 'Охрана объекта' },
  ];

  const objects: BuildingObject[] = [
    { id: 1, name: 'ТЦ "Галерея"', address: 'ул. Ленина, 45', type: 'Торговый центр', systems: ['Электроснабжение', 'Отопление', 'Вентиляция', 'Водоснабжение'], lastInspection: '2025-10-20', status: 'warning' },
    { id: 2, name: 'БЦ "Сириус"', address: 'пр. Победы, 12', type: 'Бизнес-центр', systems: ['Электроснабжение', 'Отопление', 'Кондиционирование'], lastInspection: '2025-10-21', status: 'active' },
    { id: 3, name: 'Склад №3', address: 'Промзона, уч. 7', type: 'Складской комплекс', systems: ['Электроснабжение', 'Водоснабжение'], lastInspection: '2025-10-15', status: 'critical' },
    { id: 4, name: 'БЦ "Альфа"', address: 'ул. Московская, 88', type: 'Бизнес-центр', systems: ['Электроснабжение', 'Отопление', 'Вентиляция'], lastInspection: '2025-10-22', status: 'active' },
  ];

  const todayTasks: Task[] = [
    { id: 1, title: 'Осмотр электрощитовой', object: 'ТЦ "Галерея"', time: '09:00', done: true, type: 'inspection', system: 'Электроснабжение' },
    { id: 2, title: 'Замена насоса ГВС', object: 'БЦ "Сириус"', time: '11:00', done: true, type: 'repair', system: 'Отопление' },
    { id: 3, title: 'Проверка системы вентиляции', object: 'Склад №3', time: '15:00', done: false, type: 'inspection', system: 'Вентиляция' },
    { id: 4, title: 'Подготовка отчета для Горгаза', object: 'БЦ "Альфа"', time: '17:00', done: false, type: 'maintenance' },
    { id: 5, title: 'Контроль состояния котельной', object: 'БЦ "Сириус"', time: '18:00', done: false, type: 'inspection', system: 'Отопление' },
  ];

  const documents: Document[] = [
    { id: 1, name: 'Акт осмотра электрощитовой', type: 'Отчет', object: 'ТЦ "Галерея"', date: '2025-10-20', size: '2.3 МБ' },
    { id: 2, name: 'Договор с Горгазом', type: 'Договор', object: 'БЦ "Сириус"', date: '2025-01-15', size: '1.8 МБ' },
    { id: 3, name: 'Технический паспорт котла', type: 'Паспорт', object: 'БЦ "Сириус"', date: '2024-06-10', size: '5.1 МБ' },
    { id: 4, name: 'Акт замены насоса ХВС', type: 'Акт', object: 'Склад №3', date: '2025-09-12', size: '1.2 МБ' },
    { id: 5, name: 'График планово-профилактических работ', type: 'График', object: 'Все объекты', date: '2025-10-01', size: '890 КБ' },
  ];

  const emergencyCalls: EmergencyCall[] = [
    { id: 1, object: 'ТЦ "Галерея"', type: 'Затопление подвала', date: '2025-10-18 23:45', duration: '3.5 ч', resolved: true, payment: 5250 },
    { id: 2, object: 'БЦ "Альфа"', type: 'Авария системы отопления', date: '2025-10-15 02:15', duration: '4 ч', resolved: true, payment: 6000 },
    { id: 3, object: 'Склад №3', type: 'Отключение электричества', date: '2025-10-10 19:30', duration: '2 ч', resolved: true, payment: 3000 },
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

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-xs text-muted-foreground mt-2">На обслуживании</p>
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

      <div className="grid lg:grid-cols-2 gap-6">
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
                onClick={() => setSelectedIncident(incident)}
              >
                <div className={`w-1 h-12 rounded-full ${getPriorityColor(incident.priority)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground">{incident.object}</p>
                    <Badge variant="outline" className="text-xs">{incident.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{incident.time}</p>
                </div>
                <Button size="sm" variant="outline" className="hidden sm:flex">
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
                <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  task.done ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {task.done && <Icon name="Check" size={14} className="text-primary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Icon name="MapPin" size={12} className="text-muted-foreground flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{task.object}</p>
                    <span className="text-muted-foreground">•</span>
                    <Icon name="Clock" size={12} className="text-muted-foreground flex-shrink-0" />
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
  );

  const renderIncidents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Инциденты</h2>
          <p className="text-sm text-muted-foreground mt-1">Управление аварийными ситуациями</p>
        </div>
        <Button size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          <span className="hidden sm:inline">Создать инцидент</span>
          <span className="sm:hidden">Создать</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedIncident(incident)}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className={`w-1 h-20 rounded-full ${getPriorityColor(incident.priority)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">{incident.object}</h3>
                        <Badge variant="outline">{incident.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {incident.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={12} />
                          {incident.reporter}
                        </span>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(incident.priority) + ' text-white flex-shrink-0'}>
                      {incident.priority === 'high' ? 'Высокий' : incident.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Задачи</h2>
          <p className="text-sm text-muted-foreground mt-1">Плановые и текущие работы</p>
        </div>
        <Button size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          <span className="hidden sm:inline">Создать задачу</span>
          <span className="sm:hidden">Создать</span>
        </Button>
      </div>

      <div className="grid gap-3">
        {todayTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 cursor-pointer ${
                  task.done ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {task.done && <Icon name="Check" size={14} className="text-primary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className={`font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="MapPin" size={12} className="flex-shrink-0" />
                          {task.object}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} className="flex-shrink-0" />
                          {task.time}
                        </span>
                        {task.system && (
                          <Badge variant="outline" className="text-xs">{task.system}</Badge>
                        )}
                      </div>
                    </div>
                    {task.type && (
                      <Badge variant={task.type === 'emergency' ? 'destructive' : task.type === 'repair' ? 'secondary' : 'default'} className="flex-shrink-0">
                        {task.type === 'inspection' ? 'Осмотр' : task.type === 'repair' ? 'Ремонт' : task.type === 'emergency' ? 'Аварийная' : 'Обслуживание'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Документы</h2>
          <p className="text-sm text-muted-foreground mt-1">Техническая документация</p>
        </div>
        <Button size="sm">
          <Icon name="Upload" size={16} className="mr-2" />
          <span className="hidden sm:inline">Загрузить документ</span>
          <span className="sm:hidden">Загрузить</span>
        </Button>
      </div>

      <div className="grid gap-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{doc.name}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{doc.object}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                    {doc.size && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="flex-shrink-0">{doc.type}</Badge>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Отчеты</h2>
          <p className="text-sm text-muted-foreground mt-1">Аварийные выезды и доплаты</p>
        </div>
        <Button size="sm">
          <Icon name="FileBarChart" size={16} className="mr-2" />
          Создать отчет
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Аварийные выезды за текущий месяц</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyCalls.map((call) => (
              <div key={call.id} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                <div className={`w-1 h-16 rounded-full ${call.resolved ? 'bg-green-500' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{call.type}</p>
                      <p className="text-sm text-muted-foreground mt-1">{call.object}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={12} />
                          {call.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {call.duration}
                        </span>
                      </div>
                    </div>
                    {call.payment && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-green-600">+{call.payment} ₽</p>
                        <p className="text-xs text-muted-foreground">Доплата</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Итого за месяц:</p>
              <p className="text-2xl font-bold text-green-600">
                +{emergencyCalls.reduce((sum, call) => sum + (call.payment || 0), 0)} ₽
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Всего выездов</p>
            <p className="text-3xl font-bold text-foreground mt-2">{emergencyCalls.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Средняя длительность</p>
            <p className="text-3xl font-bold text-foreground mt-2">3.2 ч</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Решено</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {emergencyCalls.filter(c => c.resolved).length}/{emergencyCalls.length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderObjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Объекты</h2>
          <p className="text-sm text-muted-foreground mt-1">Объекты на обслуживании</p>
        </div>
        <Button size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          <span className="hidden sm:inline">Добавить объект</span>
          <span className="sm:hidden">Добавить</span>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {objects.map((obj) => (
          <Card key={obj.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{obj.name}</h3>
                  <p className="text-sm text-muted-foreground">{obj.address}</p>
                </div>
                <Badge variant={obj.status === 'active' ? 'default' : obj.status === 'warning' ? 'secondary' : 'destructive'} className="flex-shrink-0">
                  {obj.status === 'active' ? 'Активен' : obj.status === 'warning' ? 'Внимание' : 'Критично'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Building2" size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{obj.type}</span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Системы:</p>
                  <div className="flex flex-wrap gap-2">
                    {obj.systems.map((system, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{system}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
                  <Icon name="Calendar" size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground text-xs sm:text-sm">Последний осмотр: {obj.lastInspection}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Подробнее
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNav) {
      case 'incidents':
        return renderIncidents();
      case 'objects':
        return renderObjects();
      case 'tasks':
        return renderTasks();
      case 'documents':
        return renderDocuments();
      case 'reports':
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
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
        <header className="bg-card border-b border-border px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                        setActiveNav(item.id);
                        setMobileMenuOpen(false);
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
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {renderContent()}
        </div>
      </main>

      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Детали инцидента</DialogTitle>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Объект</label>
                  <p className="text-base font-semibold mt-1">{selectedIncident.object}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Тип</label>
                  <p className="text-base font-semibold mt-1">{selectedIncident.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Приоритет</label>
                  <Badge className={`mt-1 ${getPriorityColor(selectedIncident.priority)} text-white`}>
                    {selectedIncident.priority === 'high' ? 'Высокий' : selectedIncident.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Время создания</label>
                  <p className="text-base font-semibold mt-1">{selectedIncident.time}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Описание</label>
                <p className="text-base mt-1">{selectedIncident.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Сообщил</label>
                <p className="text-base mt-1">{selectedIncident.reporter}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Комментарий</label>
                <Textarea placeholder="Добавьте комментарий..." rows={3} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button className="flex-1">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Взять в работу
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Добавить комментарий
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;