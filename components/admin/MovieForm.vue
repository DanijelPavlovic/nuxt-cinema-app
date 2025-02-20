<template>
  <div>
    <div class="flex items-center justify-between p-4">
      <h2 class="text-xl font-bold">{{ movie ? "Update" : "Create" }} Movie</h2>
      <UButton icon="i-heroicons-x-mark" @click="emits('close')" />
    </div>
    <div class="p-6">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Room" name="room_id">
          <USelectMenu
            v-model="state.room_id"
            :options="rooms"
            placeholder="Select room..."
            value-attribute="id"
            option-attribute="name"
          />
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
              class="w-full"
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

        <UFormGroup label="Poster" name="poster" class="pb-6">
          <template v-if="movie && state.poster && !files?.length">
           <div class="flex flex-col gap-2">
             <img
                 v-if="state.poster"
                 :src="state.poster"
                 alt="poster"
                 class="w-32 h-32 mx-auto"
             />
             <div class="flex justify-center">
               <UButton
                   type="button"
                   label="Change poster"
                   @click="state.poster = undefined"
               />
             </div>
           </div>
          </template>
          <template v-else>
            <div class="flex mb-4">
              <UButton
                class="mr-4"
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
            </div>
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
          </template>
        </UFormGroup>

        <UButton block type="submit"> Submit </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { mixed, number, object, string } from "yup";
const { files, open, reset, onChange } = useFileDialog({});

const emits = defineEmits(["close"]);

const { movie } = defineProps(["movie", "rooms"]);

const schema = object({
  title: string().required("Required"),
  duration: number().min(1, "Must be at least 1 row").required("Required"),
  start_time: mixed().required("Required"),
  room_id: number().required("Required"),
});

type FormState = {
  title: string;
  duration: number;
  start_time: Date;
  poster: string | File;
  room_id: number;
};

const state = reactive<FormState>({
  title: movie?.title,
  duration: movie?.duration,
  start_time: movie ? new Date(movie.start_time) : new Date(),
  poster: movie?.poster,
  room_id: movie?.room_id,
});

onChange((files) => {
  if (files && files.length) {
    state.poster = files[0];
  }
});

const dayjs = useDayjs();

async function onSubmit() {
  movie
    ? await update(appendFormData(), movie.id)
    : await create(appendFormData());
  emits("close");
}

const appendFormData = () => {
  const formData = new FormData();

  formData.append("title", state.title || "");
  formData.append("duration", state.duration?.toString() || "");
  formData.append("room_id", state.room_id?.toString() || "");

  formData.append(
    "start_time",
    dayjs(state.start_time).format("YYYY-MM-DD HH:mm:ss")
  );

  if (state.poster && state.poster) {
    formData.append("poster", state.poster);
  }

  return formData;
};

const create = async (body: FormData) => {
  try {
    await $fetch(`/api/movies`, {
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
      description: err.data.message,
    });
  }
};

const update = async (body: FormData, id: number) => {
  try {
    await $fetch(`/api/movies/${id}`, {
      method: "POST",
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
      description: err.data.message,
    });
  }
};
</script>
