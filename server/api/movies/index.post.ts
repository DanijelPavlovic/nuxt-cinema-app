export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const mpfd = await readFormData(event);

  if (!mpfd) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  const data = await $fetch(`${apiBaseUrl}/movies`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    body: mpfd,
  });

  return data;
});
