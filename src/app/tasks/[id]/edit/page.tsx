import CreateTask from "@/components/ui/CreateTask/CreateTask";
import { TASK } from "@/constants/api.routes";
import { ITask } from "@/interfaces/ITask";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditTask({ params }: Props) {
  const { id } = await params;
  const data = await fetch(TASK(Number(id)));
  const task: { data: ITask } = await data.json();

  if (!task || !task.data) {
    return redirect("/");
  }

  return <CreateTask task={task.data} />;
}
