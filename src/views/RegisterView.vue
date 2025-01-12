<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const userAccountStore = useAccountStore()
const router = useRouter()
const email = ref('')
const username = ref('')
const password = ref('')
const isRegisterFailed = ref(false)
const errorMessage = ref('')

const register = async () => {
  if (!isRegisterFailed.value) {
    const emailError = validateEmail(email.value)
    const passwordError = validatePassword(password.value)
    const usernameError = validateUsername(username.value)

    // Set the first encountered error message
    if (emailError) {
      errorMessage.value = emailError
      isRegisterFailed.value = true
      return
    } else if (usernameError) {
      errorMessage.value = usernameError
      isRegisterFailed.value = true
      return
    } else if (passwordError) {
      errorMessage.value = passwordError
      isRegisterFailed.value = true
      return
    }
    try {
      await userAccountStore.signUpWithEmailAndPassword(email.value, password.value)
      router.push('/')
    } catch (error) {
      console.log('error', error)
      isRegisterFailed.value = true
      errorMessage.value = error as string
      // eventStore.popupMessage('error', 'Login failed')
    }
  }
}

const validateEmail = (email: string) => {
  if (!email) return 'Email is required'
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email) ? '' : 'Invalid email format'
}

const validatePassword = (password: string) => {
  if (!password) return 'Password is required'
  return password.length >= 6 ? '' : 'Password must be at least 6 characters'
}

const validateUsername = (username: string) => {
  if (!username) return 'Username is required'
  return username.length >= 3 ? '' : 'Username must be at least 3 characters'
}

watch([email, username, password], () => {
  // Reset error message
  errorMessage.value = ''

  const emailError = validateEmail(email.value)
  const passwordError = validatePassword(password.value)
  const usernameError = validateUsername(username.value)

  // Set the first encountered error message
  if (emailError) {
    errorMessage.value = emailError
    isRegisterFailed.value = true
  } else if (usernameError) {
    errorMessage.value = usernameError
    isRegisterFailed.value = true
  } else if (passwordError) {
    errorMessage.value = passwordError
    isRegisterFailed.value = true
  } else {
    isRegisterFailed.value = false
  }
})
</script>

<template>
  <a class="fixed m-6 flex flex-row cursor-pointer p-1" href="/">
    <div class="flex flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>

      <div class="font-bold">Home</div>
    </div>
  </a>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Create an Account</h1>
        <p class="py-6">
          Welcome! To get started, please provide your email, choose a username, and set a password
          to create your account. This will allow you to access exclusive features and stay
          connected with our community.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              v-model="email"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              v-model="username"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="register">CREATE ACCOUNT</button>
          </div>
          <div class="text-xs text-red-500" v-if="isRegisterFailed">{{ errorMessage }}</div>
          <div class="flex flex-row justify-center items-center m-4">
            <div class="text-xs">Already have an account?</div>
            <a href="/login" class="label-text-alt link link-hover px-2 font-bold">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
