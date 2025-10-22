import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Document } from '@/types';

interface DocumentsViewProps {
  documents: Document[];
}

const DocumentsView = ({ documents }: DocumentsViewProps) => {
  return (
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
};

export default DocumentsView;
