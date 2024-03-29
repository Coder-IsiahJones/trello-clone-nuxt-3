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

  function moveTask({
    fromTaskIndex,
    toTaskIndex,
    fromColumnIndex,
    toColumnIndex,
  }: {
    fromTaskIndex: number;
    toTaskIndex: number;
    fromColumnIndex: number;
    toColumnIndex: number;
  }) {
    const task = board.value.columns[fromColumnIndex].tasks.splice(
      fromTaskIndex,
      1
    )[0];

    board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
  }

  function moveColumn({
    fromColumnIndex,
    toColumnIndex,
  }: {
    fromColumnIndex: number;
    toColumnIndex: number;
  }) {
    const column = board.value.columns.splice(fromColumnIndex, 1)[0];

    board.value.columns.splice(toColumnIndex, 0, column);
  }

  return {
    board,
    addColumn,
    addTask,
    deleteColumn,
    deleteTask,
    moveTask,
    moveColumn,
    getTask,
  };
});
