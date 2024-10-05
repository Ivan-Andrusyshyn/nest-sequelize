export interface RequestTask {
  title: string;
  description: string;
  status: string;
  userId?: string;
}

export interface Task extends RequestTask {
  id?: number;
}
