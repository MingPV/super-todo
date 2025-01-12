<script setup lang="ts">
// import NavBar from '@/components/NavBar.vue'
import TodoList from '@/components/TodoList.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useAccountStore } from '@/stores/account'
const userAccountStore = useAccountStore()
</script>

<template>
  <UserLayout>
    <div class="hero h-96 bg-base-200 bg-image">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold">Welcome to Your TodoList</h1>
          <p class="py-6">
            Stay organized and connected with our all-in-one platform! Manage your tasks, set
            priorities, and track progress with ease. Plus, chat with your friends in real-time to
            collaborate and stay motivated together.
          </p>
          <div>{{ userAccountStore.user }}</div>
        </div>
      </div>
    </div>
    <TodoList />
  </UserLayout>
</template>
