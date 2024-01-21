import { defineStore } from "pinia";
import boardData from "~/data/board.json";
import { useStorage } from "@vueuse/core";

export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  function addColumn(columnName: string) {
    board.value.columns.push({
      name: columnName,
      tasks: [],
    });
  }

  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1);
  }

  return {
    board,
    addColumn,
    deleteColumn,
  };
});
