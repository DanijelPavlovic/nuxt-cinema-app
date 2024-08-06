export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const body = await readBody(event);

  const data = await $fetch(`${apiBaseUrl}/rooms`, {
    method: "POST",
    body,
  });

  return data;
});
