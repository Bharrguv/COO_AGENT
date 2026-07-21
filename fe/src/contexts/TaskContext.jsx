import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskStatus, setTaskStatus] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("coo-task-status");

    if (saved) {
      setTaskStatus(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coo-task-status", JSON.stringify(taskStatus));
  }, [taskStatus]);

  function updateTask(id, status) {
    setTaskStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  }

  return (
    <TaskContext.Provider
      value={{
        taskStatus,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
