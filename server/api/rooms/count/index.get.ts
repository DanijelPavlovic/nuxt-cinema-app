export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const data = await $fetch(`${apiBaseUrl}/rooms/total`);

  return data;
});
