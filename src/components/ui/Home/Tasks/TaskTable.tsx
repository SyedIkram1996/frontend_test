import { ITask, Status } from "@/interfaces/ITask";
import Link from "next/link";

interface TaskTableProps {
  tasks: ITask[];
}

const TaskTable = ({ tasks }: TaskTableProps) => {
  const getStatusStyle = (status: Status) => {
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

          {tasks.map((task) => (
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
                  {task.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="flex items-center justify-end space-x-4">
                <Link
                  href={`/tasks/${task.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Details
                </Link>

                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
