import CustomButton from "@/components/common/Button/CustomButton";
import { ITask } from "@/interfaces/ITask";
import { getStatusStyle, getTasksUrl } from "@/utils/helperFunctions";
import Link from "next/link";
import TableActions from "./TableActions";
import UpdatePagination from "./UpdatePagination";

interface Props {
  searchParams: {
    search?: string;
    status?: string;
    dueDate?: string;
    page?: string;
  };
}
export default async function TaskTable({ searchParams }: Props) {
  const data = await fetch(getTasksUrl({ searchParams }), {
    next: { tags: ["tasks"] },
  });
  const tasks: { data: ITask[]; meta: any } = await data.json();

  return (
    <>
      <UpdatePagination meta={tasks.meta} />
      {tasks && tasks.data.length ? (
        tasks.data.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="text-sm font-medium text-gray-900 truncate">
              {task.title}
            </div>
            <div className="text-sm text-gray-500 truncate col-span-2">
              {task.description}
            </div>
            <div className="flex justify-center">
              <span
                className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                  task.status
                )}`}
              >
                {task.status.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>

            <TableActions id={task.id} />
          </div>
        ))
      ) : (
        <div className="flex flex-col  justify-center items-center  h-[calc(100dvh-300px)] ">
          {searchParams.search ||
          searchParams.status ||
          searchParams.dueDate ? (
            <p>Not Found</p>
          ) : (
            <>
              {" "}
              <p>No Tasks Added</p>
              <Link href={"/task/create"}>
                <CustomButton
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 hidden sm:flex"
                >
                  New Task
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
