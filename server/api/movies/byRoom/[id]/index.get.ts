import { Movie } from "~/types";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const { apiBaseUrl } = useRuntimeConfig();

  const data: Movie[] = await $fetch(`${apiBaseUrl}/movies/room/${id}`);

  return data;
});
