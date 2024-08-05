<template>
  <Table :items="items" @createNew="onCreateNew" @delete="onDelete" />
</template>

<script setup lang="ts">
const items = ref([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
]);

const onCreateNew = (): void => {
  console.log("Create new item");
};

const onDelete = (id: number): void => {
  console.log(`Delete item with ID: ${id}`);
};
</script>
