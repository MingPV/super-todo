<template>
  <div class="friend-component">
    <!-- Friend Request Form -->
    <div class="send-request">
      <input
        v-model="friendEmail"
        type="email"
        placeholder="Enter friend's email"
        class="input-field"
      />
      <button @click="sendFriendRequest" class="btn">Send Friend Request</button>
    </div>

    <!-- Pending Friend Requests -->
    <div class="pending-requests">
      <h3>Pending Friend Requests</h3>
      <ul>
        <li v-for="(request, index) in pendingRequests" :key="request.id">
          <span>{{ request.sender }}</span>
          <button @click="acceptRequest(request.id as string)" class="btn accept">Accept</button>
          <button @click="rejectRequest(request.id as string)" class="btn reject">Reject</button>
        </li>
      </ul>
    </div>

    <!-- Friends List -->
    <div class="friends-list">
      <h3>Your Friends</h3>
      <ul>
        <li v-for="(friend, index) in friendsList" :key="friend.id">
          <!-- Make sure `user` is available and it's not null before accessing `user.email` -->
          <span>{{ friend.sender === user?.email ? friend.receiver : friend.sender }}</span>
          <button
            class="btn"
            @click="startChat(friend.sender === user?.email ? friend.receiver : friend.sender)"
          >
            chat
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useFriendStore } from '@/stores/friend'
import { useAccountStore } from '@/stores/account'
import { useChatStore } from '@/stores/chat'

interface FriendRequest {
  sender: string
  receiver: string
  status: 'pending' | 'accepted' | 'rejected'
  id?: string // Firestore document ID (optional)
}

export default defineComponent({
  name: 'FriendComponent',
  setup() {
    const accountStore = useAccountStore()
    const friendStore = useFriendStore()
    const chatStore = useChatStore()
    const friendEmail = ref('')
    const friendList = ref<FriendRequest[]>([])
    const pendingRequests = ref<FriendRequest[]>([])

    const user = accountStore.user // Get the user from the store

    // Send a friend request
    const sendFriendRequest = async () => {
      if (friendEmail.value) {
        await friendStore.sendFriendRequest(friendEmail.value)
        friendEmail.value = '' // Reset the input field
      }
    }

    // Accept a pending friend request
    const acceptRequest = async (requestId: string) => {
      friendStore.acceptFriendRequest(requestId)
      if (user) {
        await friendStore.fetchPendingRequests()
        await friendStore.fetchFriendsList()
        friendList.value = friendStore.friendsList
        pendingRequests.value = friendStore.pendingRequests
      }
    }

    // Reject a pending friend request
    const rejectRequest = (requestId: string) => {
      friendStore.rejectFriendRequest(requestId)
    }

    const startChat = async (friend_email: string) => {
      await chatStore.fetchChatRoom(friend_email)
      chatStore.listenToMessages()
    }

    // const createChatRoom = () => {}

    // Fetch pending requests and friends list on component mount
    onMounted(async () => {
      if (user) {
        await friendStore.fetchPendingRequests()
        await friendStore.fetchFriendsList()
        friendList.value = friendStore.friendsList
        pendingRequests.value = friendStore.pendingRequests
      }
      console.log(friendStore.friendsList)
    })

    return {
      friendEmail,
      pendingRequests: pendingRequests,
      friendsList: friendList,
      sendFriendRequest,
      acceptRequest,
      rejectRequest,
      user,
      startChat,
    }
  },
})
</script>

<style scoped></style>
