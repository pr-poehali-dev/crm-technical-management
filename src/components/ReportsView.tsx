import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { EmergencyCall } from '@/types';

interface ReportsViewProps {
  emergencyCalls: EmergencyCall[];
}

const ReportsView = ({ emergencyCalls }: ReportsViewProps) => {
  const totalPayment = emergencyCalls.reduce((sum, call) => sum + (call.payment || 0), 0);

  return (
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
                +{totalPayment} ₽
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
};

export default ReportsView;
