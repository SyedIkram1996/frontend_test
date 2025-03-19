import { Suspense } from "react";
import TaskTable from "./TasksTable";

interface Props {
  searchParams: {
    search?: string;
    status?: string;
    dueDate?: string;
    page?: string;
  };
}

const TasksContainer = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col h-[calc(100dvh-220px)] rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="sticky top-0 bg-gray-50 z-10 grid grid-cols-6 gap-4 px-6 py-3 border-b border-gray-200">
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
              Description
            </div>
            <div className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </div>
            <div className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </div>
          </div>

          <Suspense
            fallback={
              <p className="p-5 flex flex-col  justify-center items-center  h-[calc(100dvh-300px)]">
                loading...
              </p>
            }
          >
            <TaskTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TasksContainer;
