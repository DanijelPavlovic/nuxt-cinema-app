export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const body = await readBody(event);
  const id = getRouterParam(event, "id");

  const data = await $fetch(`${apiBaseUrl}/rooms/${id}`, {
    method: "PUT",
    body,
  });

  return data;
});
