import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Incident, Task, Equipment } from '@/types';
import { getPriorityColor, getStatusColor } from '@/utils/helpers';

interface DashboardProps {
  incidents: Incident[];
  todayTasks: Task[];
  equipment: Equipment[];
  onIncidentClick: (incident: Incident) => void;
}

const Dashboard = ({ incidents, todayTasks, equipment, onIncidentClick }: DashboardProps) => {
  return (
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
                onClick={() => onIncidentClick(incident)}
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
};

export default Dashboard;
