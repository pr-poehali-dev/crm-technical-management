import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Incident } from '@/types';
import { getPriorityColor } from '@/utils/helpers';

interface IncidentDialogProps {
  incident: Incident | null;
  onClose: () => void;
}

const IncidentDialog = ({ incident, onClose }: IncidentDialogProps) => {
  return (
    <Dialog open={!!incident} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Детали инцидента</DialogTitle>
        </DialogHeader>
        {incident && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Объект</label>
                <p className="text-base font-semibold mt-1">{incident.object}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Тип</label>
                <p className="text-base font-semibold mt-1">{incident.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Приоритет</label>
                <Badge className={`mt-1 ${getPriorityColor(incident.priority)} text-white`}>
                  {incident.priority === 'high' ? 'Высокий' : incident.priority === 'medium' ? 'Средний' : 'Низкий'}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Время создания</label>
                <p className="text-base font-semibold mt-1">{incident.time}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Описание</label>
              <p className="text-base mt-1">{incident.description}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Сообщил</label>
              <p className="text-base mt-1">{incident.reporter}</p>
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
  );
};

export default IncidentDialog;
