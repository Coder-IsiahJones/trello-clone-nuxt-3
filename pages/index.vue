<script setup>
import { useBoardStore } from "~/store/boardStore";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();

const newColumnName = ref("");

const isModalOpen = computed(() => {
  return route.name === "index-tasks-id";
});

function closeModal() {
  router.push("/");
}

function addColumn() {
  boardStore.addColumn(newColumnName.value);
  newColumnName.value = "";
}
</script>

<template>
  <div class="board-wrapper">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIndex) in boardStore.board.columns"
        :key="column.id"
        :column="column"
        :columnIndex="columnIndex"
      />

      <UContainer class="column">
        <UInput
          v-model="newColumnName"
          type="text"
          icon="i-heroicons-plus-circle-solid"
          placeholder="Create new column"
          @keyup.enter="addColumn"
        />
      </UContainer>
    </main>

    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>
