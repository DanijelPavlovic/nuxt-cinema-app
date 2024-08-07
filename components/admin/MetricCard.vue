<template>
  <div :class="getClassByVariant.card">
    <div class="flex flex-row items-center">
      <div class="flex-shrink pr-4">
        <div :class="getClassByVariant.icon">
          <i class="fa fa-wallet fa-2x fa-inverse"></i>
        </div>
      </div>
      <div class="flex-1 text-right md:text-center">
        <h2 class="font-bold uppercase text-white">{{ label }}</h2>
        <p class="font-bold text-3xl text-neutral-600">
          <span :class="getClassByVariant.text">
            {{ value }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { label, value, variant } = defineProps(["label", "value", "variant"]);

const getClassByVariant = computed(() => {
  const defaultVariant = {
    card: "bg-green-800 border-b-4 border-green-700 rounded-lg p-5",
    icon: "rounded-full p-5 bg-green-400",
    text: "text-green-400",
  };

  switch (variant) {
    case "green":
      return defaultVariant;
    case "yellow":
      return {
        card: "bg-yellow-800 border-b-4 border-yellow-700 rounded-lg p-5",
        icon: "rounded-full p-5 bg-yellow-400",
        text: "text-yellow-400",
      };
    case "pink":
      return {
        card: "bg-pink-800 border-b-4 border-pink-700 rounded-lg p-5",
        icon: "rounded-full p-5 bg-pink-400",
        text: "text-pink-400",
      };
    default:
      return defaultVariant;
  }
});
</script>
