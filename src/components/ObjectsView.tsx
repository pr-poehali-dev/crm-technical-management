import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { BuildingObject } from '@/types';

interface ObjectsViewProps {
  objects: BuildingObject[];
}

const ObjectsView = ({ objects }: ObjectsViewProps) => {
  return (
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
};

export default ObjectsView;
