<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const userAccountStore = useAccountStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const isLoginFailed = ref(false)
const errorMessage = ref('')

// const validateUsername = (username: string) => {
//   return username.length >= 3
// }

const login = async () => {
  if (!isLoginFailed.value) {
    const emailError = validateEmail(email.value)
    const passwordError = validatePassword(password.value)

    // Set the first encountered error message
    if (emailError) {
      errorMessage.value = emailError
      isLoginFailed.value = true
      return
    } else if (passwordError) {
      errorMessage.value = passwordError
      isLoginFailed.value = true
      return
    }
    try {
      await userAccountStore.signInWithEmailAndPassword(email.value, password.value)
      router.push('/')
    } catch (error) {
      console.log('error', error)
      isLoginFailed.value = true
      errorMessage.value = 'Invalid email or password'
      // eventStore.popupMessage('error', 'Login failed')
    }
  }
}

const validateEmail = (email: string) => {
  if (!email) return 'Email is required'
  return ''
}

const validatePassword = (password: string) => {
  if (!password) return 'Password is required'
  return ''
}

watch([email, password], () => {
  // Reset error message
  errorMessage.value = ''

  const emailError = validateEmail(email.value)
  const passwordError = validatePassword(password.value)

  // Set the first encountered error message
  if (emailError) {
    errorMessage.value = emailError
    isLoginFailed.value = true
  } else if (passwordError) {
    errorMessage.value = passwordError
    isLoginFailed.value = true
  } else {
    isLoginFailed.value = false
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
        <h1 class="text-5xl font-bold">Welcome Back!</h1>
        <p class="py-6">
          Please sign in with your registered email and password to continue. If you don’t have an
          account yet, feel free to sign up and join our community.
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
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
          <div class="text-xs text-red-500" v-if="isLoginFailed">{{ errorMessage }}</div>
          <div class="flex flex-row justify-center items-center m-4">
            <div class="text-xs">Don't have an account?</div>
            <a href="/register" class="label-text-alt link link-hover px-2 font-bold">Register</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
