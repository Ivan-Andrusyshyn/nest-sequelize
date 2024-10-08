export interface RequestTask {
  title: string;
  description: string;
  status: string;
  userId?: number;
}

export interface Task extends RequestTask {
  id?: number;
}
