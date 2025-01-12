import { defineStore } from 'pinia'

// ย้ายมาจากหน้า UserLayout.vue
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'

import { auth } from '@/services/firebase'

import type { User } from 'firebase/auth'

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const useAccountStore = defineStore('user-account', {
  state: () => ({
    isLoggedIn: false,
    user: {} as User | null, // Correct typing for user as a Firebase User or null
  }),
  actions: {
    async checkAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user
            this.isLoggedIn = true
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
        this.isLoggedIn = true
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('error', error.code)
        throw new Error('Login invalid')
      }
    },
    async signUpWithEmailAndPassword(email: string, password: string) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email)

        if (methods.length > 0) {
          throw new Error('Email is already in use')
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        this.user = user
        this.isLoggedIn = true
        console.log('Register success') // Success log here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error during register:', error.code, error.message)
        throw new Error(error.message)
      }
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        this.user = user
        this.isLoggedIn = true
        console.log('Login success') // Success log here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error during login:', error.code, error.message)
        throw new Error('Login Error')
      }
    },

    async logout() {
      this.isLoggedIn = false
      await signOut(auth)
    },
  },
})
