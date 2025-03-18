import TaskDetails from "@/components/ui/TaskDetails/TaskDetails";
import { Suspense } from "react";

const TaskDetailsPage = () => {
  return (
    <>
      <p className="font-medium">Task Details</p>
      <Suspense fallback={<p>Loading...</p>}>
        <TaskDetails />
      </Suspense>
    </>
  );
};

export default TaskDetailsPage;
