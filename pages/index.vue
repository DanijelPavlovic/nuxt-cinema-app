<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
      <h2 class="text-2xl font-bold text-gray-900">Rooms</h2>
      <div
        class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
      >
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtApp } from "#app";
import type { Room } from "~/types";

const { data: rooms }: { data: Ref<Room[]> } = await useAsyncData(
  "rooms",
  () => $fetch<Room[]>("/api/rooms"),
  {
    transform: (data: Room[]) => {
      return data.map((room: Room) => ({
        id: room.id,
        name: room.name,
        rows: room.rows,
        seats_per_row: room.seats_per_row,
      }));
    },
    getCachedData: (key: string, nuxtApp: NuxtApp) => {
      return nuxtApp.payload.data[key];
    },
  }
);
</script>
