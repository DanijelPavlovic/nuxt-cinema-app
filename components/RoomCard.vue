<template>
  <UCard
    :ui="{
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: 'p-2',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <div class="group relative cursor-pointer" @click="goToRoom">
      <h3 class="mb-6 text-sm text-gray-500 text-center">
        <span class="text-base text-white font-semibold">{{ room.name }}</span>
      </h3>
      <div
        class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
      >
        <img
          src="/img/room-placeholder.webp"
          :alt="room.name"
          class="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup>
const { room } = defineProps(["room"]);
const router = useRouter();

const goToRoom = () => {
  router.push(`/rooms/${room.id}`);
};
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
