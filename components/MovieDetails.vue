<template>
  <div class="card bg-white shadow-xl rounded-lg overflow-hidden w-full">
    <img
      :src="movie.poster"
      :alt="movie.title"
      class="w-full h-auto object-cover"
      height="500"
      width="500"
      loading="lazy"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4 truncate" :title="movie.title">
        {{ movie.title }}
      </h2>
      <div class="flex justify-between items-center p-2">
        <div class="text-left">
          <strong class="font-medium">Start time:</strong>
        </div>
        <div class="text-right">
          {{ formatDate(movie.start_time) }}
        </div>
      </div>
      <div class="flex justify-between items-center p-2">
        <div class="text-left">
          <strong class="font-medium">Duration:</strong>
        </div>
        <div class="text-right">
          {{ movie.duration }}
        </div>
      </div>
      <UButton
        icon="i-heroicons-calendar-days"
        size="md"
        color="primary"
        variant="solid"
        label="Book seats"
        block
        :trailing="false"
        @click="toggleModal"
      />
    </div>
  </div>
  <UModal v-model="isModalVisible">
    <BookSeats
      :movie="movie"
      :room="room"
      @booked="toggleModal"
      ref="modalRef"
    />
  </UModal>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const { visible: isModalVisible, onToggle: toggleModal } = useToggle();

const modalRef = ref(null);

onClickOutside(modalRef, (event) => {
  toggleModal();
});
const { movie, room } = defineProps(["movie", "room"]);
</script>
