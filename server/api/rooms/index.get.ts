import { Room } from "~/types";

export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const data: Room[] = await $fetch(`${apiBaseUrl}/rooms`);

  return data;
});
