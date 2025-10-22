export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-amber-500';
    case 'low': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'text-red-600';
    case 'warning': return 'text-amber-600';
    case 'good': return 'text-green-600';
    default: return 'text-gray-600';
  }
};
