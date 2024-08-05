<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-white shadow-md p-4 flex items-center">
      <nuxt-link
        href="/"
        class="text-blue-500 hover:text-blue-700 font-semibold text-lg mr-4"
      >
        Home
      </nuxt-link>
      <h1 class="text-2xl font-bold flex-1 text-center">Danijel Cinema App</h1>
    </header>
    <main class="flex-1 p-6">
      <slot />
    </main>
    <footer class="bg-white shadow-md p-4 text-center">
      <p>© 2024 My Nuxt 3 App</p>
    </footer>
  </div>
</template>
