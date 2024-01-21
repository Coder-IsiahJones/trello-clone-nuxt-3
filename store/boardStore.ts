import { defineStore } from "pinia";
import boardData from "~/data/board.json";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find((task) => task.id === taskId);

        if (task) {
          return task;
        }
      }
    };
  });

  function addColumn(columnName: string) {
    board.value.columns.push({
      name: columnName,
      tasks: [],
      id: uuidv4(),
    });
  }

  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1);
  }

  function addTask({
    taskName,
    columnIndex,
  }: {
    taskName: string;
    columnIndex: number;
  }) {
    board.value.columns[columnIndex].tasks.push({
      id: uuidv4(),
      name: taskName,
      description: "",
    });
  }

  function deleteTask(taskId: string) {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  }

  return {
    board,
    addColumn,
    addTask,
    deleteColumn,
    deleteTask,
    getTask,
  };
});
