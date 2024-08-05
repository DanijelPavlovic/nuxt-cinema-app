<template>
  <div class="group relative">
    <div
      class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
    >
      <img
        src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
        class="h-full w-full object-cover object-center"
      />
    </div>
    <h3 class="mt-6 text-sm text-gray-500">
      <nuxt-link
        :to="{
          name: 'rooms-id',
          params: {
            id: room.id,
          },
        }"
      >
        <span class="text-base font-semibold text-gray-900">{{
          room.name
        }}</span>
      </nuxt-link>
    </h3>
  </div>
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
