export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const { apiBaseUrl } = useRuntimeConfig();
  const body = await readBody(event);

  const data = await $fetch(`${apiBaseUrl}/bookings/${id}/book`, {
    method: "POST",
    body,
  });

  return data;
});
