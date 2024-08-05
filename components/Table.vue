<!-- components/TableComponent.vue -->
<template>
  <div>
    <button class="btn" type="button" @click="createNew">Create New</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: Array,
});

const emits = defineEmits(["createNew", "delete"]);

const createNew = (): void => {
  emits("createNew");
};

const deleteItem = (id: number): void => {
  emits("delete", id);
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
</style>
