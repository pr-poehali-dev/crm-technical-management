export type NavItem = 'dashboard' | 'objects' | 'tasks' | 'equipment' | 'incidents' | 'documents' | 'reports' | 'calendar' | 'contractors' | 'settings';

export interface Incident {
  id: number;
  object: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  time: string;
  description?: string;
  reporter?: string;
}

export interface BuildingObject {
  id: number;
  name: string;
  address: string;
  type: string;
  systems: string[];
  lastInspection: string;
  status: 'active' | 'warning' | 'critical';
}

export interface Task {
  id: number;
  title: string;
  object: string;
  time: string;
  done: boolean;
  type?: 'inspection' | 'repair' | 'maintenance' | 'emergency';
  system?: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  object: string;
  date: string;
  size?: string;
}

export interface EmergencyCall {
  id: number;
  object: string;
  type: string;
  date: string;
  duration: string;
  resolved: boolean;
  payment?: number;
}

export interface Equipment {
  id: number;
  name: string;
  object: string;
  status: string;
  health: number;
}
