<template>
  <UCard
    :ui="{
      base: '',
      background: 'bg-white dark:bg-gray-900',
      divide: 'divide-y divide-gray-200 dark:divide-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      rounded: 'rounded-lg',
      shadow: 'shadow',
      body: {
        base: '',
        background: 'bg-blue-950',
        padding: 'px-4 py-5 sm:p-6',
      },
      header: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:px-6',
      },
      footer: {
        base: '',
        background: '',
        padding: 'px-4 py-4 sm:px-6',
      },
    }"
  >
    <template #header>
      <header class="bg-shadow-md h-8 flex items-center">
        <nuxt-link
          href="/"
          class="text-blue-500 hover:text-blue-700 font-semibold text-lg mr-4"
        >
          Home
        </nuxt-link>
        <h1 class="text-2xl font-bold flex-1 text-center">Cinema</h1>
        <nuxt-link
          href="/admin"
          class="text-blue-500 hover:text-blue-700 font-semibold text-lg mr-4"
        >
          Admin
        </nuxt-link>
      </header>
    </template>

    <slot />

    <template #footer>
      <footer class="text-white shadow-md text-center">
        <p>© 2024 My Nuxt 3 Cinema App: Danijel Pavlovic</p>
      </footer>
    </template>
  </UCard>
</template>
