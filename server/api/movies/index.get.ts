import { Movie } from "~/types";

export default defineEventHandler(async () => {
  const { apiBaseUrl } = useRuntimeConfig();

  const data: Movie[] = await $fetch(`${apiBaseUrl}/movies`);

  return data;
});
