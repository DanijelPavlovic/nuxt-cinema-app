<template>
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" class="bg-white" placeholder="Filter movies..." />
    <UButton class="ml-4" label="Create movie" @click="toggleModal" />
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
    <LazyAdminMovieForm
      ref="modalRef"
      :rooms="rooms"
      :movie="toEdit"
      @close="onFormClose"
    />
  </UModal>
</template>

<script setup lang="ts">
import type { Movie } from "~/types";

definePageMeta({
  layout: "admin",
});

const { visible: isModalVisible, onToggle: toggleModal } = useToggle();
const modalRef = ref(null);
let toEdit: Movie | null = null;

// onClickOutside(modalRef, (event) => {
//   toggleModal();
//   toEdit = null;
// });

const q = ref<string>("");
const movies = ref<Movie[] | null>(null);

const fetchMovies = async () => {
  const { data, error: fetchError } = await useFetch<Movie[]>(`/api/movies`);
  if (fetchError.value) {
    throw createError({
      statusCode: fetchError.value.statusCode,
      message: fetchError.value.message,
      fatal: true,
    });
  }
  movies.value = data.value;
};

await fetchMovies();

const { data: rooms, error: roomError } = await useFetch<Movie[]>(`/api/rooms`);

const columns: { key: string; label?: string }[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "duration",
    label: "Duration",
  },
  {
    key: "start_time",
    label: "Start time",
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
    return movies.value ?? [];
  }

  if (!movies.value) {
    return [];
  }

  return movies.value.filter((movie) => {
    return Object.values(movie).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const onFormClose = async () => {
  await fetchMovies();
  toggleModal();
  toEdit = null;
};

const onEdit = async (id: number) => {
  const { data: movie, error: fetchError } = await useFetch<Movie>(
    `/api/movies/${id}`
  );

  if (fetchError.value) {
    showToast({
      title: "Error",
      color: "red",
      description: "Unable to fetch movie",
    });
    return;
  }

  toEdit = movie.value;
  toggleModal();
};

const onDelete = async (id: number) => {
  try {
    await $fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });

    showToast({
      title: "Movie deleted",
      description: "Movie has been deleted successfully",
    });

    await fetchMovies();
  } catch (err) {
    showToast({
      title: "Failed to delete movie",
      color: "red",
      description: "Failed to delete movie",
    });
  }
};
</script>
