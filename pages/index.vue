<template>
  <UCard>
    <div class="mx-auto">
      <div class="mx-auto max-w-none">
        <h2 class="text-2xl font-bold text-white p-6">Rooms</h2>
        <p class="font-bold text-white p-6">
          Please select a room to see the movies
        </p>
        <div
          class="mt-6 space-y-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
        >
          <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
        </div>
      </div>
    </div>
  </UCard>
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
