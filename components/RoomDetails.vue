<template>
  <div class="card bg-white shadow-lg rounded-lg p-6">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-semibold text-gray-800">{{ room.name }}</h1>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="movie in movies" :key="movie.id">
        <MovieDetails :movie="movie" :room="room" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { room, movies } = defineProps(["room", "movies"]);
</script>
