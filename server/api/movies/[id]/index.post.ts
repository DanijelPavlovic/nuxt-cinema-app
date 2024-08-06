export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();
  const id = getRouterParam(event, "id");
  const mpfd = await readFormData(event);

  if (!mpfd) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  console.log("mpfd", mpfd);

  const data = await $fetch(`${apiBaseUrl}/movies/update/${id}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    body: mpfd,
  });

  return data;
});
