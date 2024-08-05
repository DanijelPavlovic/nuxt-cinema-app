<template>
  <div class="flex flex-col min-h-screen">
    <aside
      class="fixed inset-0 md:w-64 w-0 md:block bg-gray-800 text-white h-screen transition-width duration-300"
    >
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin</h1>
        <ul class="mt-6">
          <li>
            <nuxt-link
              to="/admin/rooms"
              class="block py-2 px-4 hover:bg-gray-700"
              >Rooms</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/admin/movies"
              class="block py-2 px-4 hover:bg-gray-700"
              >Movies</nuxt-link
            >
          </li>
        </ul>
      </div>
    </aside>
    <div class="flex-1 ml-64 mt-16">
      <header
        class="bg-gray-800 text-white h-16 fixed top-0 left-64 right-0 flex items-center px-4"
      >
        <h1 class="text-xl font-bold">Admin Dashboard</h1>
      </header>
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
