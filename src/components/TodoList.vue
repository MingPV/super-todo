<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">My Todo List</h1>
    <form @submit.prevent="addTodo" class="flex gap-4 mb-4">
      <input
        v-model="newTodo.name"
        type="text"
        placeholder="Todo title"
        class="input input-bordered w-full"
        required
      />
      <textarea
        v-model="newTodo.description"
        placeholder="Description"
        class="textarea textarea-bordered w-full"
        required
      ></textarea>
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
    <div v-if="todos.length" class="space-y-4">
      <div v-for="todo in todos" :key="todo.id" class="card w-full bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title">{{ todo.name }}</h2>
          <p>{{ todo.description }}</p>
          <div class="card-actions justify-end">
            <button @click="deleteTodo(todo.id as string)" class="btn btn-error btn-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-500">No todos yet. Add one!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/Todo'

export default defineComponent({
  name: 'TodoList',
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref<Todo>({ name: '', description: '' })
    const todos = ref<Todo[]>([])

    const loadTodos = async () => {
      await todoStore.loadTodos()
      todos.value = todoStore.todos
    }

    const addTodo = async () => {
      if (newTodo.value.name && newTodo.value.description) {
        await todoStore.addNewTodo({
          name: newTodo.value.name,
          description: newTodo.value.description,
        })
        newTodo.value = { name: '', description: '' }
      }
    }

    const deleteTodo = async (id: string) => {
      await todoStore.deleteTodo(id)
      loadTodos()
    }

    onMounted(loadTodos)

    return {
      todos: todos,
      newTodo,
      addTodo,
      deleteTodo,
    }
  },
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
