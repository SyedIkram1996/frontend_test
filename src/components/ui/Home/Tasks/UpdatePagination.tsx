"use client";

import { useTaskContext } from "@/context/taskContext";
import { useEffect } from "react";

interface Props {
  meta: any;
}

const UpdatePagination = ({ meta }: Props) => {
  const { setMeta } = useTaskContext();
  useEffect(() => {
    setMeta(meta);
  }, [meta]);

  return null;
};

export default UpdatePagination;
