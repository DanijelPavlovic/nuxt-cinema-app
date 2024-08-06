export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  const data = await $fetch(`${apiBaseUrl}/rooms/${id}`, {
    method: "DELETE",
  });

  return data;
});
