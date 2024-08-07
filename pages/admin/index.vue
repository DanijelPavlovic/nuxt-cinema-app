<template>
  <div class="flex flex-wrap">
    <div class="w-full grid grid-cols-3 gap-4">
      <AdminMetricCard label="Total rooms" :value="totalRooms" />
      <AdminMetricCard
          label="Total movies"
          :value="totalMovies"
          variant="pink"
      />
      <AdminMetricCard
          label="Total bookings"
          :value="totalBookings"
          variant="yellow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { data, error } = await useAsyncData<any>(async () => {
  const [roomCount, moviesCount, bookingsCount] = await Promise.all([
    $fetch<any>(`/api/rooms/count`),
    $fetch<any>(`/api/movies/count`),
    $fetch<any>(`/api/bookings/count`),
  ]);

  return {
    roomCount: roomCount,
    moviesCount: moviesCount,
    bookingsCount: bookingsCount,
  };
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
    fatal: true,
  });
}

const totalBookings: number = data.value.bookingsCount.total || 0;
const totalMovies: number = data.value.moviesCount.total || 0;
const totalRooms: number = data.value.roomCount.total || 0;

console.log("data", data.value);
</script>
