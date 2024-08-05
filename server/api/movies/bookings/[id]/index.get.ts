import { Booking } from "~/types";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const { apiBaseUrl } = useRuntimeConfig();

  const data: Booking[] = await $fetch(`${apiBaseUrl}/bookings/movie/${id}`);

  return data;
});
