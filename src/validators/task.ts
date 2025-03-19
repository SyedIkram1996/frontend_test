import { date, object, string } from "zod";

export const createTaskSchema = object({
  title: string(),
  description: string(),
  status: string(),
  dueDate: date(),
});
