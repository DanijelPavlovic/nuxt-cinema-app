<template>
  <div
    class="bg-gray-800 font-sans leading-normal tracking-normal h-screen flex flex-col mt-12"
  >
    <header>
      <nav
        aria-label="menu nav"
        class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
      >
        <div class="flex flex-wrap items-center">
          <div
            class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"
          >
            <a href="#" aria-label="Home">
              <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
            </a>
          </div>

          <div
            class="flex flex-1 text-center md:w-1/3 justify-center md:justify-start text-white px-2"
          ></div>

          <div
            class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end"
          >
            <ul
              class="list-reset flex justify-between flex-1 md:flex-none items-center"
            >
              <li class="flex-1 md:flex-none md:mr-3">
                <nuxt-link
                  class="inline-block py-2 px-4 text-white no-underline"
                  to="/"
                  >Cinema</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1 flex">
      <nav aria-label="alternative nav">
        <div
          class="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center"
        >
          <div
            class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between"
          >
            <ul
              class="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left"
            >
              <li class="mr-3 flex-1">
                <nuxt-link
                  to="/admin"
                  class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                >
                  <i class="fas fa-tasks pr-0 md:pr-3"></i
                  ><span
                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                    >Dashboard</span
                  >
                </nuxt-link>
              </li>
              <li class="mr-3 flex-1">
                <nuxt-link
                  to="/admin/rooms"
                  class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                >
                  <i class="fas fa-tasks pr-0 md:pr-3"></i
                  ><span
                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                    >Rooms</span
                  >
                </nuxt-link>
              </li>
              <li class="mr-3 flex-1">
                <nuxt-link
                  to="/admin/movies"
                  class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
                >
                  <i class="fa fa-envelope pr-0 md:pr-3"></i
                  ><span
                    class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                    >Movies</span
                  >
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section class="flex-1">
        <div id="main" class="main-content mt-12 md:mt-2 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div
              class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white"
            >
              <h1 class="font-bold pl-2">{{ navTitle }}</h1>
            </div>
          </div>
          <slot />
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
const navTitle = ref<string>("Dashboard");
const route = useRoute();

watch(
  () => route.path,
  () => {
    if (route.path === "/admin") {
      navTitle.value = "Dashboard";
    } else if (route.path === "/admin/rooms") {
      navTitle.value = "Rooms";
    } else if (route.path === "/admin/movies") {
      navTitle.value = "Movies";
    }
  }
);
</script>
