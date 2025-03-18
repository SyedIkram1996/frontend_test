import MobileDrawer from "@/components/common/MobileDrawer/MobileDrawer";
import { ITask } from "@/interfaces/ITask";
import Link from "next/link";
import CustomButton from "../../../common/Button/CustomButton";
import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import TaskTable from "./TaskTable";

const Tasks = () => {
  const tasks: ITask[] = [
    {
      id: 1,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "Completed",
      dueDate: new Date(),
    },
    {
      id: 2,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "In Progress",
      dueDate: new Date(),
    },
    {
      id: 3,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "Pending",
      dueDate: new Date(),
    },
    {
      id: 4,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "On Hold",
      dueDate: new Date(),
    },
    {
      id: 5,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "Completed",
      dueDate: new Date(),
    },
    {
      id: 6,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "In Progress",
      dueDate: new Date(),
    },
    {
      id: 7,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "Pending",
      dueDate: new Date(),
    },
    {
      id: 8,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "On Hold",
      dueDate: new Date(),
    },
    {
      id: 9,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "On Hold",
      dueDate: new Date(),
    },
    {
      id: 10,
      title: "Design Homepage",
      description: "Create responsive layout for main landing page",
      status: "On Hold",
      dueDate: new Date(),
    },
  ];

  return (
    <main className="flex flex-col gap-[12px]">
      <div className="flex justify-between items-center bg-white rounded-lg py-2 px-4 shadow-sm">
        <Search />

        <Link href={"/tasks/create"}>
          <>
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 sm:hidden"
            />
          </>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Filter />
      </div>

      <MobileDrawer />

      <TaskTable tasks={tasks} />
    </main>
  );
};

export default Tasks;
