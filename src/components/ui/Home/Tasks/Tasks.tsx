import MobileDrawer from "@/components/common/MobileDrawer/MobileDrawer";
import Link from "next/link";
import CustomButton from "../../../common/Button/CustomButton";
import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import TasksContainer from "./TasksContainer";
interface Props {
  searchParams: {
    search?: string;
    status?: string;
    dueDate?: string;
    page?: string;
  };
}

const Tasks = ({ searchParams }: Props) => {
  return (
    <main className="flex flex-col gap-[12px]">
      <div className="flex justify-between items-center bg-white rounded-lg py-2 px-4 shadow-sm">
        <Search />

        <Link href={"/task/create"}>
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

      <TasksContainer searchParams={searchParams} />
    </main>
  );
};

export default Tasks;
