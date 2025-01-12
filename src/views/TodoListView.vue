<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useAccountStore } from '@/stores/account'
const userAccountStore = useAccountStore()
</script>

<template>
  <UserLayout>
    <div v-if="userAccountStore.user?.email"><TodoList /></div>
    <div v-if="!userAccountStore.user?.email"><div>Please login to use todo-list</div></div>
  </UserLayout>
</template>
