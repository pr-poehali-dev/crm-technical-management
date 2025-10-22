import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Incident } from '@/types';
import { getPriorityColor } from '@/utils/helpers';

interface IncidentsViewProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
}

const IncidentsView = ({ incidents, onIncidentClick }: IncidentsViewProps) => {
  return (
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
          <Card key={incident.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onIncidentClick(incident)}>
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
};

export default IncidentsView;
