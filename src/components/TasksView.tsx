import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Task } from '@/types';

interface TasksViewProps {
  tasks: Task[];
}

const TasksView = ({ tasks }: TasksViewProps) => {
  return (
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
        {tasks.map((task) => (
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
};

export default TasksView;
