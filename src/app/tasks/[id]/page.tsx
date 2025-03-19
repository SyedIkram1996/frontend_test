import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import TaskDetails from "@/components/ui/TaskDetails/TaskDetails";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function TaskDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Breadcrumb
        previousPages={[{ text: "Home", url: "/" }]}
        currentPage={"Task Details"}
      />

      <div className="mt-4" />
      <Suspense fallback={<p>Loading...</p>}>
        <TaskDetails id={id} />
      </Suspense>
    </>
  );
}
