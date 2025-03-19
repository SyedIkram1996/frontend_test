import { TASK } from "@/constants/api.routes";
import { ITask } from "@/interfaces/ITask";
import { getStatusStyle } from "@/utils/helperFunctions";
import { format } from "date-fns";
import { redirect } from "next/navigation";

interface Props {
  id: string;
}

const TaskDetails = async ({ id }: Props) => {
  const data = await fetch(TASK(Number(id)));
  const task: { data: ITask } = await data.json();

  if (!task) {
    return redirect("/");
  }

  const { title, status, description, dueDate, createdAt, updatedAt } =
    task.data;

  return (
    <div className="flex flex-col w-fit">
      <p className="font-medium">
        Title: <span className="font-normal">{title} </span>
      </p>
      <p className="font-medium">
        Status:{" "}
        <span
          className={`font-normal text-center px-2 rounded-full ${getStatusStyle(
            status
          )}`}
        >
          {status.toUpperCase()}
        </span>
      </p>
      <p className="font-medium">
        Description: <span className="font-normal">{description}</span>
      </p>
      <p className="font-medium">
        Due Date:{" "}
        <span className="font-normal">{format(dueDate, "yyyy-MM-dd")}</span>{" "}
      </p>
      {createdAt && (
        <p className="font-medium">
          Created At:{" "}
          <span className="font-normal">
            {format(createdAt, "yyyy-MM-dd HH:mm:ss a")}
          </span>{" "}
        </p>
      )}
      {updatedAt && (
        <p className="font-medium">
          Updated At:{" "}
          <span className="font-normal">
            {format(updatedAt, "yyyy-MM-dd HH:mm:ss a")}
          </span>{" "}
        </p>
      )}
    </div>
  );
};

export default TaskDetails;
