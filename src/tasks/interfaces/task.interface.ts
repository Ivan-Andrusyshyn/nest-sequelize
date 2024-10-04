export interface RequestTask {
  title: string;
  description: string;
  status: string;
}

export interface Task extends RequestTask {
  id?: string;
}
