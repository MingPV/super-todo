import { defineStore } from 'pinia'
import { db } from '@/services/firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import { useAccountStore } from '@/stores/account'

// Define the types for friend requests and friends list
interface FriendRequest {
  sender: string
  receiver: string
  status: 'pending' | 'accepted' | 'rejected'
  id?: string // Firestore document ID (optional)
}

export const useFriendStore = defineStore('friend', {
  state: () => ({
    pendingRequests: [] as FriendRequest[], // List of pending requests
    friendsList: [] as FriendRequest[], // List of accepted friends
  }),
  actions: {
    // Send a friend request to another user
    async sendFriendRequest(receiverEmail: string) {
      const user = useAccountStore().user
      if (!user?.email) return

      try {
        // Check if a friend request is already sent from the current user to the receiver
        const q = query(
          collection(db, 'friends'),
          where('sender', '==', user.email),
          where('receiver', '==', receiverEmail),
        )
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
          console.log('Friend request already sent')
          return
        }

        // Check if a request already exists from the receiver to the current user (this handles both directions)
        const reverseQuery = query(
          collection(db, 'friends'),
          where('sender', '==', receiverEmail),
          where('receiver', '==', user.email),
        )
        const reverseSnapshot = await getDocs(reverseQuery)

        if (!reverseSnapshot.empty) {
          console.log('Friend request already exists from the receiver')
          return
        }

        // Send a new friend request
        await addDoc(collection(db, 'friends'), {
          sender: user.email,
          receiver: receiverEmail,
          status: 'pending',
        })
        console.log('Friend request sent')
      } catch (error) {
        console.error('Error sending friend request:', error)
      }
    },

    // Fetch all pending friend requests for the current user
    async fetchPendingRequests() {
      const user = useAccountStore().user
      if (!user?.email) return

      try {
        const q = query(
          collection(db, 'friends'),
          where('receiver', '==', user.email),
          where('status', '==', 'pending'),
        )

        const snapshot = await getDocs(q)
        this.pendingRequests = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Add the document ID to the request object
        })) as FriendRequest[] // Typecast the result as FriendRequest[]
      } catch (error) {
        console.error('Error fetching pending requests:', error)
      }
    },

    // Accept a friend request by updating the status to 'accepted' and adding a new friend entry
    async acceptFriendRequest(requestId: string) {
      const user = useAccountStore().user
      if (!user?.email) return

      try {
        const requestRef = doc(db, 'friends', requestId)
        const requestDoc = await getDoc(requestRef)
        const requestData = requestDoc.data()

        if (requestData) {
          const { sender, receiver, status } = requestData

          if (status === 'pending') {
            // Accept the friend request (update status)
            await updateDoc(requestRef, { status: 'accepted' })

            // We will add a single record to the friends collection for the pair (either sender or receiver)
            // Add the friend only if it doesn't already exist (we check for the existing friend pair)
            const existingFriendQuery = query(
              collection(db, 'friends'),
              where('sender', '==', sender),
              where('receiver', '==', receiver),
            )
            const existingFriendSnapshot = await getDocs(existingFriendQuery)

            // If no existing record found, add a new one (for mutual friendship)
            if (existingFriendSnapshot.empty) {
              // Create one record for the friendship
              await addDoc(collection(db, 'friends'), {
                sender: sender,
                receiver: receiver,
                status: 'accepted',
              })
              console.log('Friendship established between', sender, 'and', receiver)
            }

            // Remove the pending request from the UI (pendingRequests)
            this.pendingRequests = this.pendingRequests.filter(
              (request) => request.id !== requestId,
            )

            console.log('Friend request accepted')
          }
        }
      } catch (error) {
        console.error('Error accepting friend request:', error)
      }
    },

    // Reject a friend request by updating the status to 'rejected'
    async rejectFriendRequest(requestId: string) {
      const user = useAccountStore().user
      if (!user?.email) return

      try {
        const requestRef = doc(db, 'friends', requestId)
        await updateDoc(requestRef, { status: 'rejected' })

        this.pendingRequests = this.pendingRequests.filter((request) => request.id !== requestId)

        console.log('Friend request rejected')
      } catch (error) {
        console.error('Error rejecting friend request:', error)
      }
    },

    // Fetch the friend list of the current user
    async fetchFriendsList() {
      const user = useAccountStore().user
      if (!user?.email) return

      try {
        const q = query(
          collection(db, 'friends'),
          where('status', '==', 'accepted'),
          where('sender', '==', user.email),
        )
        const snapshot = await getDocs(q)
        this.friendsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Add the document ID to the friend object
        })) as FriendRequest[] // Typecast the result as FriendRequest[]

        // Include friends where the current user is the receiver as well
        const reverseQuery = query(
          collection(db, 'friends'),
          where('status', '==', 'accepted'),
          where('receiver', '==', user.email),
        )
        const reverseSnapshot = await getDocs(reverseQuery)

        const reverseFriends = reverseSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as FriendRequest[]

        // Combine the friends list (both as sender and receiver)
        this.friendsList = [...this.friendsList, ...reverseFriends]
      } catch (error) {
        console.error('Error fetching friends list:', error)
      }
    },
  },
})
