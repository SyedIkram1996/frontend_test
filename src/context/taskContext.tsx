"use client";

import { createContext, JSX, useContext, useState } from "react";

const TaskContext = createContext<any>({
  user: null,
  setUser: () => {},
});

interface UserStateProps {
  children: JSX.Element;
}

const TaskState = ({ children }: UserStateProps) => {
  const [meta, setMeta] = useState("");

  const state: any = {
    meta,
    setMeta,
  };

  return <TaskContext.Provider value={state}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskState;
