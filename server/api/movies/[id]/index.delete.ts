export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  const data = await $fetch(`${apiBaseUrl}/movies/${id}`, {
    method: "DELETE",
  });

  return data;
});
