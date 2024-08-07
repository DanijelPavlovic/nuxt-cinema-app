<template>
  <UCard
    :ui="{
      body: {
        base: '',
        background: 'bg-neutral-800',
        padding: 'px-4 py-5 sm:p-6',
      },
    }"
  >
    <template #header>
      <header class="bg-shadow-md h-8 flex items-center">
        <nuxt-link
          href="/"
          class="hover:text-blue-500 font-semibold text-lg mr-4"
        >
          Home
        </nuxt-link>
        <h1 class="text-3xl font-bold flex-1 text-center text-yellow-500">Cinema</h1>
        <nuxt-link
          href="/admin"
          class="hover:text-blue-500 font-semibold text-lg mr-4"
        >
          Admin
        </nuxt-link>
      </header>
    </template>

    <slot />

    <template #footer>
      <footer class="text-white shadow-md text-center">
        <p>&copy; 2024 My Nuxt 3 Cinema App: Danijel Pavlovic</p>
      </footer>
    </template>
  </UCard>
</template>
