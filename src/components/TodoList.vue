<template>
  <div>
    <h1>To-Do List</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <strong>{{ todo.name }}</strong
        >: {{ todo.description }}
      </li>
    </ul>

    <input v-model="newTodo.name" placeholder="Name" />
    <input v-model="newTodo.description" placeholder="Description" />
    <button @click="addTodo">Add</button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/Todo'

export default {
  setup() {
    const todoStore = useTodoStore()
    const todos = ref<Todo[]>([])
    const newTodo = ref<Todo>({ name: '', description: '' })

    // เรียกใช้ loadTodos เมื่อคอมโพเนนต์ mount
    onMounted(async () => {
      console.log('Mingtest22')
      await todoStore.loadTodos()
      todos.value = todoStore.todos
      console.log(todoStore.todos)
    })

    const addTodo = () => {
      if (newTodo.value.name.trim() && newTodo.value.description.trim()) {
        todoStore.addNewTodo(newTodo.value)
        newTodo.value = { name: '', description: '' }
      }
    }

    return {
      todos: todos,
      newTodo,
      addTodo,
    }
  },
}
</script>

<style scoped>
/* คุณสามารถใส่สไตล์เพิ่มเติมได้ที่นี่ */
</style>
