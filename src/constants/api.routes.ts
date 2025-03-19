import { BASE_URL } from "./environment";

export const TASKS = `${BASE_URL}/tasks`;
export const TASK = (id: number) => `${BASE_URL}/tasks/${id}`;
