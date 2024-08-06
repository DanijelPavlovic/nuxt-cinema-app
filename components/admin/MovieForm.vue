<template>
  <div>
    <h2>{{ movie ? "Update" : "Create" }} Movie</h2>
  </div>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Room" name="room_id">
      <UDropdown :items="rooms" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          label="Select room"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </UFormGroup>

    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup label="Duration" name="duration">
      <UInput v-model="state.duration" type="number" />
    </UFormGroup>

    <UFormGroup label="Start time" name="start_time">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
          icon="i-heroicons-calendar-days-20-solid"
          :label="format(state.start_time, 'd MMM, yyy')"
        />
        <template #panel="{ close }">
          <ElementsDatePicker
            v-model="state.start_time"
            is-required
            @close="close"
          />
        </template>
      </UPopover>
    </UFormGroup>

    <UFormGroup label="Poster" name="poster">
      <UButton
        class="mr-2"
        type="button"
        label="Choose files"
        @click="open()"
      />
      <UButton
        type="button"
        label="Reset"
        :disabled="!files"
        @click="reset()"
      />
      <template v-if="files">
        <p>
          You have selected:
          <b>{{
            `${files.length} ${files.length === 1 ? "file" : "files"}`
          }}</b>
        </p>
        <li v-for="file of files" :key="file.name">
          {{ file.name }}
        </li>
      </template>
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { format } from "date-fns";
import { mixed, number, object, string, type InferType } from "yup";
const { files, open, reset, onChange } = useFileDialog({});

const emits = defineEmits(["close"]);

const { movie } = defineProps(["movie", "rooms"]);

const schema = object({
  title: string().required("Required"),
  duration: number().min(1, "Must be at least 1 row").required("Required"),
  poster: mixed().required("Required"),
  start_time: mixed().required("Required"),
  room_id: number().required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  title: movie ? movie.title : undefined,
  duration: movie ? movie.duration : undefined,
  start_time: movie ? movie.start_time : new Date(),
  poster: movie ? movie.poster : undefined,
  room_id: movie ? movie.room_id : undefined,
});

onChange((files) => {
  console.log("FILES", files);
  /** do something with files */
  state.poster = files[0];
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = new FormData();
  formData.append("title", state.title || "");
  formData.append("duration", state.duration?.toString() || "");
  formData.append("start_time", state.start_time.toISOString());

  if (state.poster) {
    formData.append("poster", state.poster);
  }

  movie ? await update(event.data, movie.id) : await create(event.data);
  emits("close");
}

const create = async (body: Schema) => {
  try {
    await $fetch(`/api/movies`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "POST",
      body,
    });

    showToast({
      title: "Movie created",
      description: "Movie has been created successfully",
    });
  } catch (err) {
    showToast({
      title: "Create failed",
      color: "red",
      description: "Failed to create movie",
    });
  }
};

const update = async (body: Schema, id: number) => {
  try {
    await $fetch(`/api/movies/${id}`, {
      method: "PUT",
      body,
    });
    showToast({
      title: "Movie updated",
      description: "Movie has been updated successfully",
    });
  } catch (err) {
    showToast({
      title: "Update failed",
      color: "red",
      description: "Failed to update movie",
    });
  }
};
</script>
