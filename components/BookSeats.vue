<template>
  <div class="p-4 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-semibold mb-4 text-black">
      <strong>{{ movie.title }}</strong>
    </h2>
    <div v-if="groupedSeats">
      <div v-for="rowNumber in room.rows" :key="rowNumber" class="mb-4">
        <div class="grid grid-cols-8 gap-4 items-center">
          <div
            v-for="seatNumber in room.seats_per_row"
            :key="seatNumber"
            :class="seatClass(rowNumber, seatNumber)"
            @click="
              isTaken(seatNumber, rowNumber)
                ? null
                : selectSeat(rowNumber, seatNumber)
            "
            class="flex items-center justify-center p-2 border rounded cursor-pointer transition-colors"
          >
            <Icon name="material-symbols:chair" size="18" />
          </div>
        </div>
      </div>
      <div class="mt-6">
        <UButton
          icon="i-heroicons-calendar-days"
          size="md"
          color="primary"
          variant="solid"
          label="Book seats"
          block
          :trailing="false"
          :disabled="!selectedSeats.length"
          @click="confirmBooking"
        />
      </div>
    </div>
    <div v-else>
      <p>Loading seats...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { movie, room } = defineProps(["movie", "room"]);
const selectedSeats = ref<{ seat: number; row: number }[]>([]);
const toast = useToast();

type GroupedSeats = {
  [rowNumber: number]: { seat: number; row: number }[];
};

const emits = defineEmits(["booked"]);

const { data: bookings, error } = await useFetch(
  `/api/movies/bookings/${movie.id}`
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
    fatal: true,
  });
}

const takenSeats = computed(() => {
  if (!Array.isArray(bookings.value)) {
    return [];
  }
  return bookings.value.map((seat) => ({ row: seat.row, seat: seat.seat }));
});

const isTaken = (seat: number, row: number): boolean => {
  return takenSeats.value.some((s) => s.row === row && s.seat === seat);
};

const seatClass = (row: number, seat: number): string => {
  const isSelected = selectedSeats.value.some(
    (s) => s.row === row && s.seat === seat
  );

  return `text-center border rounded cursor-pointer ${
    isSelected
      ? "bg-green-500 text-white"
      : isTaken(seat, row)
      ? "bg-red-500 text-white cursor-not-allowed"
      : "bg-gray-300"
  }`;
};

const selectSeat = (row: number, seat: number): void => {
  const seatIndex = selectedSeats.value.findIndex(
    (s) => s.row === row && s.seat === seat
  );

  if (seatIndex !== -1) {
    selectedSeats.value.splice(seatIndex, 1);
  } else {
    selectedSeats.value.push({ row, seat });
  }
};

const groupedSeats = computed(() => {
  if (!Array.isArray(bookings.value)) {
    return null;
  }

  return bookings.value.reduce<GroupedSeats>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
});

const confirmBooking = async () => {
  if (!selectedSeats.value.length) {
    return;
  }

  try {
    await $fetch(`/api/movies/bookSeat/${movie.id}`, {
      method: "POST",
      body: {
        seats: selectedSeats.value,
      },
    });

    emits("booked");
    showToast({
      title: "Seats booked",
      description: "Your seats have been booked successfully",
    });
  } catch (err) {
    showToast({
      title: "Failed to book seats",
      color: "red",
      description: "Your seats could not be booked.",
    });
  }
};
</script>
