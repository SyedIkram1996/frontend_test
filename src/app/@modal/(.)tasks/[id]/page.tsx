import TaskDetails from "@/components/ui/TaskDetails/TaskDetails";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}
export default async function ModalPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Link
        href={"/"}
        className="fixed inset-0 bg-black opacity-50 z-40"
      ></Link>

      <div
        className={`fixed p-4 top-0 right-0 h-full w-[80%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${"translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-5">
          <p className="font-medium">Task Details</p>
          <Link
            href={"/"}
            className="font-medium rounded-full px-4 p-2 bg-gray-100"
          >
            X
          </Link>
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <TaskDetails id={id} />
        </Suspense>
      </div>
    </>
  );
}
