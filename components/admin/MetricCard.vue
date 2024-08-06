<template>
  <div :class="getClassByVariant().card">
    <div class="flex flex-row items-center">
      <div class="flex-shrink pr-4">
        <div :class="getClassByVariant().icon">
          <i class="fa fa-wallet fa-2x fa-inverse"></i>
        </div>
      </div>
      <div class="flex-1 text-right md:text-center">
        <h2 class="font-bold uppercase text-gray-600">{{ label }}</h2>
        <p class="font-bold text-3xl">
          {{ value }}
          <span :class="getClassByVariant().text"
            ><i class="fas fa-caret-up"></i
          ></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { label, value, variant } = defineProps(["label", "value", "variant"]);

const getClassByVariant = () => {
  const defaultVariant = {
    card: "bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5",
    icon: "rounded-full p-5 bg-green-600",
    text: "text-green-500",
  };

  switch (variant) {
    case "green":
      return defaultVariant;
    case "yellow":
      return {
        card: "bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5",
        icon: "rounded-full p-5 bg-yellow-600",
        text: "text-yellow-600",
      };
    case "pink":
      return {
        card: "bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5",
        icon: "rounded-full p-5 bg-pink-600",
        text: "text-pink-500",
      };
    default:
      return defaultVariant;
  }
};
</script>
