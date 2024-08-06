export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const mpfd = await readMultipartFormData(event);

  console.log("MFPD", mpfd);

  const data = await $fetch(`${apiBaseUrl}/movies`, {
    method: "POST",
    body: mpfd,
  });

  return data;
});
