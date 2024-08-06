export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const body = await readBody(event);
  const id = getRouterParam(event, "id");

  const data = await $fetch(`${apiBaseUrl}/movies/${id}`, {
    method: "PUT",
    body,
  });

  return data;
});
