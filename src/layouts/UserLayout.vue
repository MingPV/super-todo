<script setup lang="ts">
/* import vue ตัวอื่นๆมา */

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-row h-screen bg-base-200">
    <div class="flex flex-col justify-start px-8 mt-6">
      <div class="flex justify-center items-center bg-red-100 px-16 py-4 mb-8">Logo</div>
      <div class="flex flex-col gap-2">
        <div
          class="btn btn-ghost font-nunito"
          @click="
            () => {
              router.push('/')
            }
          "
        >
          Home
        </div>
        <div
          class="btn btn-ghost font-nunito"
          @click="
            () => {
              router.push('/friend')
            }
          "
        >
          Friend
        </div>
        <div
          class="btn btn-ghost font-nunito"
          @click="
            () => {
              router.push('/todos')
            }
          "
        >
          TodoList
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full mx-4 rounded-md bg-red-200">
      <slot></slot>
    </div>
  </div>
</template>
