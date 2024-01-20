<script setup>
import { useBoardStore } from "../store/boardStore";

const boardStore = useBoardStore();
</script>

<template>
  <main>
    <h1>Build a Trello Clone</h1>

    <pre>{{ boardStore.board }}</pre>
  </main>
</template>
