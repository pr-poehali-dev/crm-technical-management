import { Incident, BuildingObject, Task, Document, EmergencyCall, Equipment } from '@/types';

export const incidents: Incident[] = [
  { id: 1, object: 'ТЦ "Галерея"', type: 'Электричество', priority: 'high', status: 'active', time: '14:30', description: 'Отключение электроснабжения в секции А', reporter: 'Администрация ТЦ' },
  { id: 2, object: 'БЦ "Сириус"', type: 'Отопление', priority: 'medium', status: 'active', time: '12:15', description: 'Снижение температуры в помещениях 3 этажа', reporter: 'Служба эксплуатации' },
  { id: 3, object: 'Склад №3', type: 'Водоснабжение', priority: 'low', status: 'pending', time: '10:00', description: 'Слабый напор холодной воды', reporter: 'Охрана объекта' },
];

export const objects: BuildingObject[] = [
  { id: 1, name: 'ТЦ "Галерея"', address: 'ул. Ленина, 45', type: 'Торговый центр', systems: ['Электроснабжение', 'Отопление', 'Вентиляция', 'Водоснабжение'], lastInspection: '2025-10-20', status: 'warning' },
  { id: 2, name: 'БЦ "Сириус"', address: 'пр. Победы, 12', type: 'Бизнес-центр', systems: ['Электроснабжение', 'Отопление', 'Кондиционирование'], lastInspection: '2025-10-21', status: 'active' },
  { id: 3, name: 'Склад №3', address: 'Промзона, уч. 7', type: 'Складской комплекс', systems: ['Электроснабжение', 'Водоснабжение'], lastInspection: '2025-10-15', status: 'critical' },
  { id: 4, name: 'БЦ "Альфа"', address: 'ул. Московская, 88', type: 'Бизнес-центр', systems: ['Электроснабжение', 'Отопление', 'Вентиляция'], lastInspection: '2025-10-22', status: 'active' },
];

export const todayTasks: Task[] = [
  { id: 1, title: 'Осмотр электрощитовой', object: 'ТЦ "Галерея"', time: '09:00', done: true, type: 'inspection', system: 'Электроснабжение' },
  { id: 2, title: 'Замена насоса ГВС', object: 'БЦ "Сириус"', time: '11:00', done: true, type: 'repair', system: 'Отопление' },
  { id: 3, title: 'Проверка системы вентиляции', object: 'Склад №3', time: '15:00', done: false, type: 'inspection', system: 'Вентиляция' },
  { id: 4, title: 'Подготовка отчета для Горгаза', object: 'БЦ "Альфа"', time: '17:00', done: false, type: 'maintenance' },
  { id: 5, title: 'Контроль состояния котельной', object: 'БЦ "Сириус"', time: '18:00', done: false, type: 'inspection', system: 'Отопление' },
];

export const documents: Document[] = [
  { id: 1, name: 'Акт осмотра электрощитовой', type: 'Отчет', object: 'ТЦ "Галерея"', date: '2025-10-20', size: '2.3 МБ' },
  { id: 2, name: 'Договор с Горгазом', type: 'Договор', object: 'БЦ "Сириус"', date: '2025-01-15', size: '1.8 МБ' },
  { id: 3, name: 'Технический паспорт котла', type: 'Паспорт', object: 'БЦ "Сириус"', date: '2024-06-10', size: '5.1 МБ' },
  { id: 4, name: 'Акт замены насоса ХВС', type: 'Акт', object: 'Склад №3', date: '2025-09-12', size: '1.2 МБ' },
  { id: 5, name: 'График планово-профилактических работ', type: 'График', object: 'Все объекты', date: '2025-10-01', size: '890 КБ' },
];

export const emergencyCalls: EmergencyCall[] = [
  { id: 1, object: 'ТЦ "Галерея"', type: 'Затопление подвала', date: '2025-10-18 23:45', duration: '3.5 ч', resolved: true, payment: 5250 },
  { id: 2, object: 'БЦ "Альфа"', type: 'Авария системы отопления', date: '2025-10-15 02:15', duration: '4 ч', resolved: true, payment: 6000 },
  { id: 3, object: 'Склад №3', type: 'Отключение электричества', date: '2025-10-10 19:30', duration: '2 ч', resolved: true, payment: 3000 },
];

export const equipment: Equipment[] = [
  { id: 1, name: 'Котел №1', object: 'БЦ "Сириус"', status: 'warning', health: 65 },
  { id: 2, name: 'Трансформатор Т-1', object: 'ТЦ "Галерея"', status: 'good', health: 92 },
  { id: 3, name: 'Насос ХВС', object: 'Склад №3', status: 'critical', health: 35 },
];
