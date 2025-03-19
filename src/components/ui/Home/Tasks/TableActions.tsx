"use client";

import { revalidateTasks } from "@/app/actions";
import { deleteTask } from "@/services/task.services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
}

const TableActions = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);

      return await deleteTask(id);
    },
    onSuccess: (data) => {
      revalidateTasks();
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  return (
    <div className="flex items-center justify-end space-x-4">
      <Link
        href={`/tasks/${id}`}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Details
      </Link>

      <Link
        href={`/tasks/${id}/edit`}
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

      <button
        disabled={isLoading}
        onClick={() => mutation.mutate()}
        className="text-red-600 hover:text-red-900 disabled:text-gray-300 cursor-pointer"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TableActions;
