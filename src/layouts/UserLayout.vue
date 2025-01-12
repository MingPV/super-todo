<script setup lang="ts">
/* import vue ตัวอื่นๆมา */

import { useAccountStore } from '@/stores/account'
import { useRouter } from 'vue-router'

const userAccountStore = useAccountStore()

const router = useRouter()

const logout = async () => {
  try {
    await userAccountStore.logout()
    window.location.reload()
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="flex w-full flex-row justify-end">
    <!-- ส่วนที่เกี่ยวข้องกับ login, logout -->
    <div
      v-if="!userAccountStore.isLoggedIn"
      class="btn btn-ghost"
      @click="
        () => {
          router.push('/login')
        }
      "
    >
      Login
    </div>
    <div v-else class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://mikelopster.dev/mikelopster.da6b9a03.webp" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <RouterLink to="/profile" class="justify-between"> Profile </RouterLink>
        </li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>

  <slot></slot>
</template>
