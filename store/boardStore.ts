import { defineStore } from "pinia";
import boardData from "~/data/board.json";
import { useStorage } from "@vueuse/core";

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
      id: generateGUID(),
    });
  }

  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1);
  }

  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  return {
    board,
    addColumn,
    deleteColumn,
    getTask,
  };
});
