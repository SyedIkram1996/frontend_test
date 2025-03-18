export type Status = "Completed" | "In Progress" | "Pending" | "On Hold";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
}
