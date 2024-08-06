import { Room } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const { apiBaseUrl } = useRuntimeConfig();

  const data: Room = await $fetch(`${apiBaseUrl}/movies/${id}`);

  return data;
});
