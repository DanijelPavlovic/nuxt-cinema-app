<template>
  <UCard>
    <div class="mx-auto">
      <div class="mx-auto max-w-none">
        <div class="flex justify-center py-6">
          <input
            type="text"
            placeholder="Search rooms..."
            class="px-4 py-2 w-full max-w-[320px] border border-neutral-700 rounded"
            v-model.trim="searchQuery"
          />
        </div>
        <h2 class="text-2xl font-bold mb-4">Rooms</h2>
        <p class="font-bold text-neutral-400">
          Please select a room to see the movies
        </p>
        <div
          class="mt-6 space-y-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 mb-4"
        >
          <RoomCard
            :ui="{
              body: {
                base: '',
                background: 'bg-neutral-800',
                padding: 'px-4 py-5 sm:p-6',
              },
            }"
            v-for="(room, index) in filteredRooms"
            :key="room.id"
            :room="room"
            :class="{
              'mv-6': index >= 3 && index < 6,
            }"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { NuxtApp } from "#app";
import { computed, ref } from "vue";
import type { Room } from "~/types";

const searchQuery = ref("");

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

const filteredRooms = computed(() => {
  return rooms.value.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
