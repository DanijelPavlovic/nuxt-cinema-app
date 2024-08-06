<template>
  <div class="flex items-center justify-between p-4">
    <h2 class="text-xl font-bold">{{ room ? "Update" : "Create" }} Room</h2>
    <UButton icon="i-heroicons-x-mark" @click="emits('close')" />
  </div>
  <div class="p-6">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Number of rows" name="rows">
        <UInput v-model="state.rows" type="number" />
      </UFormGroup>

      <UFormGroup label="Seats per row" name="seats_per_row" class="pb-6">
        <UInput v-model="state.seats_per_row" type="number" />
      </UFormGroup>

      <UButton block ype="submit"> Submit </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { number, object, string, type InferType } from "yup";

const emits = defineEmits(["close"]);

const { room } = defineProps(["room"]);

const schema = object({
  name: string().required("Required"),
  rows: number().min(1, "Must be at least 1 row").required("Required"),
  seats_per_row: number()
    .min(1, "Must be at least 1 seat per row")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  name: room ? room.name : undefined,
  rows: room ? room.rows : undefined,
  seats_per_row: room ? room.seats_per_row : undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  room ? await update(event.data, room.id) : await create(event.data);
  emits("close");
}

const create = async (body: Schema) => {
  try {
    await $fetch(`/api/rooms/store`, {
      method: "POST",
      body,
    });

    showToast({
      title: "Room created",
      description: "Room has been created successfully",
    });
  } catch (err) {
    showToast({
      title: "FailCreate failed",
      color: "red",
      description: "Failed to create room",
    });
  }
};

const update = async (body: Schema, id: number) => {
  try {
    await $fetch(`/api/rooms/${id}`, {
      method: "PUT",
      body,
    });
    showToast({
      title: "Room updated",
      description: "Room has been updated successfully",
    });
  } catch (err) {
    showToast({
      title: "Update failed",
      color: "red",
      description: "Failed to update room",
    });
  }
};
</script>
