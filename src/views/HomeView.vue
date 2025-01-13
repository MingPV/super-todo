<script setup lang="ts">
// import NavBar from '@/components/NavBar.vue'
import UserLayout from '@/layouts/UserLayout.vue'
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
  <UserLayout>
    <div class="bg-base-100 h-full flex flex-col p-6">
      <div class="flex flex-row justify-between">
        <div class="flex justify-center items-start text-3xl font-nunito">Today Task</div>
        <div
          v-if="!userAccountStore.isLoggedIn"
          class="btn btn-ghost font-nunito"
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
              <RouterLink to="/profile" class="justify-between font-nunito"> Profile </RouterLink>
            </li>
            <li>
              <a @click="logout" class="font-nunito">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-row flex-grow">
        <div class="flex-grow flex flex-col">
          <div class="flex flex-row w-full items-center">
            <div
              class="bg-base-100 px-16 pt-2 pb-6 flex flex-row justify-center items-center border-b-amber-950 border-b-2"
            >
              <div
                class="bg-base-200 rounded-md px-2 h-1/2 text-xs flex justify-center items-center mr-3"
              >
                12
              </div>
              <div class="text-sm font-nunito">All</div>
            </div>
            <div
              class="bg-base-100 px-16 pt-2 pb-6 flex flex-row justify-center items-center border-b-2 border-b-base-200"
            >
              <div
                class="bg-base-200 rounded-md px-2 h-1/2 text-xs flex justify-center items-center mr-3"
              >
                12
              </div>
              <div class="text-sm font-nunito">Important</div>
            </div>
            <div
              class="bg-base-100 px-16 pt-2 pb-6 flex flex-row justify-center items-center border-b-2 border-b-base-200"
            >
              <div
                class="bg-base-200 rounded-md px-2 h-1/2 text-xs flex justify-center items-center mr-3"
              >
                12
              </div>
              <div class="text-sm font-nunito">All</div>
            </div>
          </div>
          <div class="flex flex-col h-[78vh] overflow-y-auto">
            <div class="flex flex-col h-[35vh] overflow-y-auto scrollbar-none">
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
            </div>
            <div
              class="bg-base-100 h-[8vh] flex flex-col justify-center pl-2 border-b-[1px] border-base-200"
            >
              Upcoming Tasks
            </div>
            <div class="bg-red-200 flex flex-col h-[35vh] overflow-y-auto scrollbar-none">
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
              <div
                class="bg-base-100 flex flex-row justify-between items-center pt-1 pb-2 border-b-[1px] border-b-base-100"
              >
                <div class="flex flex-row items-center justify-center">
                  <input type="checkbox" class="checkbox" />
                  <div class="ml-4 text-sm font-nunito">test</div>
                </div>

                <details class="dropdown">
                  <summary class="btn btn-sm mr-12 px-6 font-nunito font-light">status</summary>
                  <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] p-1 shadow">
                    <li><a class="font-nunito">status 1</a></li>
                    <li><a class="font-nunito">status 2</a></li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col bg-base-100 border-l border-base-300 mx-6 mt-4">
          <div class="text-xl ml-4 font-nunito">Friend Tasks</div>
          <div class="flex flex-col gap-2 mt-8">
            <div class="flex items-start bg-slate-100 px-6 py-3 rounded-lg mx-8 justify-between">
              <div class="flex flex-col gap-2">
                <div class="text-xs text-slate-400 font-nunito">Today</div>
                <div class="text-xs font-nunito">Math Homework Ex1 - Ex2</div>
                <div class="flex flex-row">
                  <div class="text-xs mr-2 text-slate-600 font-nunito">from :</div>
                  <div class="text-xs text-slate-600 font-nunito">MingPV</div>
                </div>
              </div>
              <div>:</div>
            </div>
            <div class="flex items-start bg-slate-100 px-6 py-3 rounded-lg mx-8 justify-between">
              <div class="flex flex-col gap-2">
                <div class="text-xs text-slate-400 font-nunito">Today</div>
                <div class="text-xs font-nunito">Math Homework Ex1 - Ex2</div>
                <div class="flex flex-row">
                  <div class="text-xs mr-2 text-slate-600 font-nunito">from :</div>
                  <div class="text-xs text-slate-600 font-nunito">MingPV</div>
                </div>
              </div>
              <div>:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <TodoList /> -->
    <!-- <ChatRoom /> -->
  </UserLayout>
</template>

<style scoped></style>
