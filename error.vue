<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Ooops.</p>
    <p class="mt-7">{{ error.message }}</p>

    <UButton
      icon="i-heroicons-calendar-days"
      size="md"
      color="primary"
      variant="solid"
      label="Go home..."
      block
      :trailing="false"
      @click="handleClearError"
    />
  </div>
</template>

<script setup>
const { error } = defineProps(["error"]);

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<style scoped></style>
