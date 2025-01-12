<template>
  <div>
    <!-- <div v-if="!chatStore.chatRoomId">
      <input v-model="userEmail" placeholder="Enter user's email to chat" />
      <button @click="startChat">Start Chat</button>
      <button @click="createChatRoom">create Chat</button>
    </div> -->

    <!-- <div v-else> -->
    <div v-if="chatStore.chatRoomId">
      <div v-for="message in chatStore.messages" :key="message.createdAt">
        <p>
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </p>
      </div>
      <input v-model="newMessage" @keydown.enter="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  setup() {
    const chatStore = useChatStore()
    const userEmail = ref('')
    const newMessage = ref('')

    const startChat = async () => {
      await chatStore.fetchChatRoom(userEmail.value)
      chatStore.listenToMessages()
    }

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        chatStore.sendMessage(newMessage.value)
        newMessage.value = ''
      }
    }

    const createChatRoom = async () => {
      await chatStore.createChatRoom(userEmail.value)
      chatStore.listenToMessages()
    }

    return {
      chatStore,
      userEmail,
      newMessage,
      startChat,
      sendMessage,
      createChatRoom,
    }
  },
})
</script>
