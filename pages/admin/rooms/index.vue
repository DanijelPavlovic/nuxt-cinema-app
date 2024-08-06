<template>
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" class="bg-white" placeholder="Filter rooms..." />
    <UButton class="ml-4" label="Create room" @click="toggleModal" />
  </div>
  <UTable :rows="filteredRows" :columns="columns">
    <template #actions-data="{ row }">
      <UDropdown :items="actions(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
  <UModal v-model="isModalVisible">
    <LazyAdminRoomForm ref="modalRef" :room="toEdit" @close="onFormClose" />
  </UModal>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { Room } from "~/types";

definePageMeta({
  layout: "admin",
});

const { visible: isModalVisible, onToggle: toggleModal } = useToggle();
const modalRef = ref(null);
let toEdit: Room | null = null;

onClickOutside(modalRef, (event) => {
  toggleModal();
  toEdit = null;
});

const q = ref<string>("");
const rooms = ref<Room[] | null>(null);

const fetchRooms = async () => {
  const { data, error: fetchError } = await useFetch<Room[]>(`/api/rooms`);
  if (fetchError.value) {
    throw createError({
      statusCode: fetchError.value.statusCode,
      message: fetchError.value.message,
      fatal: true,
    });
  }
  rooms.value = data.value;
};

await fetchRooms();

const columns: { key: string; label?: string }[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "rows",
    label: "Rows",
  },
  {
    key: "seats_per_row",
    label: "Seats per row",
  },
  {
    key: "actions",
  },
];

const actions = (row: {
  label: string;
  icon: string;
  click: () => void;
  id: number;
}) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => onEdit(row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => onDelete(row.id),
    },
  ],
];

const filteredRows = computed<{ [key: string]: any }[]>(() => {
  if (!q.value) {
    return rooms.value ?? [];
  }

  if (!rooms.value) {
    return [];
  }

  return rooms.value.filter((room) => {
    return Object.values(room).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const onFormClose = async () => {
  await fetchRooms();
  toggleModal();
  toEdit = null;
};

const onEdit = async (id: number) => {
  const { data: room, error: fetchError } = await useFetch<Room>(
    `/api/rooms/${id}`
  );

  if (fetchError.value) {
    showToast({
      title: "Error",
      color: "red",
      description: "Unable to fetch room",
    });
    return;
  }

  toEdit = room.value;
  toggleModal();
};

const onDelete = async (id: number) => {
  try {
    await $fetch(`/api/rooms/${id}`, {
      method: "DELETE",
    });

    showToast({
      title: "Room deleted",
      description: "Room has been deleted successfully",
    });

    await fetchRooms();
  } catch (err) {
    showToast({
      title: "Failed to delete room",
      color: "red",
      description: "Failed to delete room",
    });
  }
};
</script>
