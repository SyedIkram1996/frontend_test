import Pagination from "@/components/ui/Home/Pagination/Pagination";
import TaskState from "@/context/taskContext";
import Tasks from "../components/ui/Home/Tasks/Tasks";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    search?: string;
    status?: string;
    dueDate?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <TaskState>
      <>
        <Tasks searchParams={params} />

        <Pagination />
      </>
    </TaskState>
  );
}
