import { defineStore } from 'pinia'
import { db } from '@/services/firebase'
import { collection, addDoc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore'
import { useAccountStore } from '@/stores/account' // Import the account store

interface Message {
  text: string
  createdAt: string
  sender: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    chatRoomId: null as string | null,
  }),
  actions: {
    async createChatRoom(userEmail: string) {
      const user = useAccountStore().user
      if (!user) return // Ensure the user is authenticated

      // Create a chat room with sorted users
      const chatRoomRef = await addDoc(collection(db, 'chatRooms'), {
        users: [user.email, userEmail].sort(), // Sorted to maintain consistency
      })
      this.chatRoomId = chatRoomRef.id
    },
    async fetchChatRoom(userEmail: string) {
      const user = useAccountStore().user
      if (!user) return // Ensure the user is authenticated

      try {
        // Query for a chat room where the user is included in the 'users' array
        const q = query(
          collection(db, 'chatRooms'),
          where('users', 'array-contains', user.email), // Use only one `array-contains`
        )

        const snapshot = await getDocs(q)

        let isFound = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        snapshot.docs.map((ss: any) => {
          const chatRoom = ss.data()
          if (chatRoom.users.includes(userEmail)) {
            this.chatRoomId = ss.id
            isFound = true
          }
        })

        if (!isFound) {
          await this.createChatRoom(userEmail)
        }

        // // If a chat room exists with the user's email
        // if (!snapshot.empty) {
        //   console.log('Whattt44t')
        //   // Manually check if both users are in the chat room

        //   const chatRoom = snapshot.docs[0].data()
        //   console.log(snapshot.docs)
        //   console.log('mingming')
        //   console.log(chatRoom.users)
        //   if (chatRoom.users.includes(userEmail)) {
        //     this.chatRoomId = snapshot.docs[0].id
        //   } else {
        //     // If not, create a new chat room
        //     console.log('mingming2')
        //     console.log(chatRoom.users)
        //     await this.createChatRoom(userEmail)
        //     console.log('mingming3')
        //     console.log(userEmail)
        //     console.log(chatRoom.users)
        //     console.log('Whatttt')
        //   }
        // } else {
        //   // If no chat room exists, create one
        //   await this.createChatRoom(userEmail)
        //   console.log('Whatttt2')
        // }
      } catch (error) {
        console.error('Error fetching chat room:', error)
        // Handle error (e.g., network error, etc.)
        throw new Error('Error fetching chat room')
      }
    },
    listenToMessages() {
      if (!this.chatRoomId) return
      const q = query(
        collection(db, 'chatRooms', this.chatRoomId, 'messages'),
        orderBy('createdAt'),
      )
      onSnapshot(q, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => doc.data() as Message)
      })
    },
    async sendMessage(text: string) {
      const user = useAccountStore().user
      if (!user || !this.chatRoomId) return // Ensure user is authenticated and chat room exists
      await addDoc(collection(db, 'chatRooms', this.chatRoomId, 'messages'), {
        text,
        createdAt: new Date().toISOString(),
        sender: user.email,
      })
    },
  },
})
