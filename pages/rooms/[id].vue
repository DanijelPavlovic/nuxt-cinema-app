<template>
  <RoomDetails v-if="room" :room="room" :movies="movies" />
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import type { NuxtApp } from "#app";
import type { Movie, Room } from "~/types";

const { id } = useRoute().params;

interface RoomAndMoviesData {
  room: Room;
  movies: Movie[];
}

const { data, error } = await useAsyncData<RoomAndMoviesData>(
  `roomAndMovies-${id}`,
  async () => {
    const [roomResponse, moviesResponse] = await Promise.all([
      $fetch<Room>(`/api/rooms/${id}`),
      $fetch<Movie[]>(`/api/movies/byRoom/${id}`),
    ]);

    if (!roomResponse) {
      throw createError({
        statusCode: 404,
        message: "Room not found",
        fatal: true,
      });
    }

    const movies = moviesResponse.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      duration: movie.duration,
      start_time: movie.start_time,
    }));

    return { room: roomResponse, movies };
  },
  {
    getCachedData: (key: string, nuxtApp: NuxtApp) => {
      return nuxtApp.payload.data[key];
    },
  }
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
    fatal: true,
  });
}

const room: Room | undefined = data.value?.room;
const movies: Movie[] = data.value?.movies || [];
</script>
