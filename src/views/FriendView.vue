<script setup lang="ts">
import ChatRoom from '@/components/ChatRoom.vue'
import FriendMenu from '@/components/FriendMenu.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useAccountStore } from '@/stores/account'
const userAccountStore = useAccountStore()
</script>

<template>
  <UserLayout>
    <div v-if="userAccountStore.user?.email"><FriendMenu /></div>
    <div v-if="!userAccountStore.user?.email"><div>Please login to add friends</div></div>
    <ChatRoom />
  </UserLayout>
</template>
