<template>
  <div class="card bg-white shadow-xl rounded-lg overflow-hidden w-full">
    <figure>
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-auto object-cover"
        loading="lazy"
      />
    </figure>
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4 truncate" :title="movie.title">
        {{ movie.title }}
      </h2>
      <p class="text-gray-700 mb-2">
        <strong class="font-medium">Start time:</strong>
        {{ formatDate(movie.start_time) }}
      </p>
      <p class="text-gray-700 mb-4">
        <strong class="font-medium">Duration:</strong> {{ movie.duration }}
      </p>
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
  console.log(event);
  toggleModal();
});
const { movie, room } = defineProps(["movie", "room"]);
</script>
