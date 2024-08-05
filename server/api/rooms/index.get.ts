import { Room } from "~/types";

export default defineCachedEventHandler(
  async (event) => {
    const { apiBaseUrl } = useRuntimeConfig();

    const data: Room[] = await $fetch(`${apiBaseUrl}/rooms`);

    return data;
  },
  {
    maxAge: 1000,
  }
);
