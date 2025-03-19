import { TASKS } from "@/constants/api.routes";
import { Status } from "@/interfaces/ITask";

export const getStatusStyle = (status: Status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in progress":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const queryKeyValue = (key: string, value: string) => {
  return `${key}=${value}`;
};

export const getTasksUrl = ({
  searchParams,
}: {
  searchParams: {
    search?: string;
    status?: string;
    dueDate?: string;
    page?: string;
  };
}) => {
  let url = `${TASKS}?${queryKeyValue("page", searchParams.page || "1")}`;

  if (searchParams?.search) {
    url += `&${queryKeyValue("search", searchParams.search)}`;
  }

  if (searchParams?.status) {
    url += `&${queryKeyValue("status", searchParams.status)}`;
  }

  if (searchParams?.dueDate) {
    url += `&${queryKeyValue("dueDate", searchParams.dueDate)}`;
  }

  return url;
};
