<template>
  <div class="card rounded-lg p-6">
    <div class="text-center mb-8">
      <h1 class="text-2xl text-white font-semibold">Room - {{ room.name }}</h1>
    </div>
    <div class="flex justify-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search movies..."
        class="p-2 rounded-lg border border-gray-300 w-64"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <MovieDetails
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        :room="room"
      />
    </div>
    <div v-if="filteredMovies.length === 0" class="text-center text-white">
      No movies found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const { room, movies } = defineProps<{
  room: { name: string };
  movies: Array<{ id: number; title: string }>;
}>();

const searchQuery = ref("");

const filteredMovies = computed(() => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
