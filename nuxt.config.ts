// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["dayjs-nuxt", "@nuxt/ui", "@vueuse/nuxt"],
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
});
