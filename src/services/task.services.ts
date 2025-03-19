import { TASK, TASKS } from "@/constants/api.routes";
import { ITask } from "@/interfaces/ITask";
import { makeApiRequest } from "@/utils/servicesHelper";

export const createTask = (data: Omit<ITask, "id">) => {
  return makeApiRequest({
    method: "POST",
    url: TASKS,
    data,
  });
};

export const updateTask = (data: Omit<ITask, "id">, id: number) => {
  return makeApiRequest({
    method: "PUT",
    url: TASK(id),
    data,
  });
};

export const deleteTask = (id: number) => {
  return makeApiRequest({
    method: "DELETE",
    url: TASK(id),
  });
};
