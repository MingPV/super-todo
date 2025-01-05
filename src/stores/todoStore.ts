// src/stores/todoStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/services/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import type { Todo } from '@/types/Todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  // โหลดข้อมูลจาก Firestore
  const loadTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'todos'))
      todos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[]
    } catch (e) {
      console.error('Error loading todos:', e)
    }
  }

  // เพิ่ม To-Do ใหม่ไปยัง Firestore
  const addNewTodo = async (newTodo: Todo) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        name: newTodo.name,
        description: newTodo.description,
      })
      todos.value.push({
        id: docRef.id,
        name: newTodo.name,
        description: newTodo.description,
      })
    } catch (e) {
      console.error('Error adding todo:', e)
    }
  }

  return {
    todos,
    loadTodos,
    addNewTodo,
  }
})
