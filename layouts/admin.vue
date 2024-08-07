<template>
  <div
    class="bg-neutral-800 h-screen flex flex-col"
  >
    <header>
      <nav class="bg-black/50 flex items-center justify-between gap-2 py-3 px-4">
        <div>
          <nuxt-link to="/" aria-label="Home" class="flex items-center gap-2 text-lg text-white">
            <Icon name="material-symbols:arrow-back-rounded" />
            Back to home
          </nuxt-link>
        </div>
      </nav>
    </header>

    <main class="flex-1 flex h-full min-h-0">
      <nav class="w-72 bg-black/25" aria-label="alternative nav">
            <ul id="admin-sidebar" class="divide-y divide-neutral-800">
              <li>
                <nuxt-link
                  to="/admin"
                  class="flex items-center gap-2 hover:bg-blue-600 w-full py-3 px-4 cursor-pointer"
                >
                  <Icon name="mdi:home" />
                  <span
                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                    >Dashboard</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                    to="/admin/rooms"
                    class="flex items-center gap-2 hover:bg-blue-600 w-full py-3 px-4 cursor-pointer"
                >
                  <Icon name="fluent:conference-room-24-filled" />
                  <span
                      class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                  >Rooms</span
                  >
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                    to="/admin/movies"
                    class="flex items-center gap-2 hover:bg-blue-600 w-full py-3 px-4 cursor-pointer"
                >
                  <Icon name="fluent:movies-and-tv-16-filled" />
                  <span
                      class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                  >Movies</span
                  >
                </nuxt-link>
              </li>
            </ul>
      </nav>
      <section class="flex-1 h-full overflow-x-auto">
        <div id="main" class="main-content">
          <div class="bg-black/75 py-4 px-2 sticky top-0">
            <h1 class="font-bold pl-2">{{ navTitle }}</h1>
          </div>
          <div class="p-4">
            <slot />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const navTitle = computed(() => {
  switch(route.path) {
    case "/admin/rooms":
      return "Rooms"
    case "/admin/movies":
      return "Movies";
    default:
      return "Dashboard"
  }
})
</script>

<style scoped>
#admin-sidebar .router-link-exact-active {
  @apply text-blue-500;
}
</style>
