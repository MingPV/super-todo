import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/services/firebase'
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore'
import { useAccountStore } from '@/stores/account'
import type { Todo } from '@/types/Todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const accountStore = useAccountStore()
  const user = accountStore.user

  // Load user's to-dos from Firestore
  const loadTodos = async () => {
    console.log(user)
    if (!user || !user.email) {
      console.error('User not authenticated or email not found')
      return
    }

    try {
      const q = query(collection(db, 'todos'), where('userId', '==', user.email))
      const querySnapshot = await getDocs(q)
      todos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[]
    } catch (e) {
      console.error('Error loading todos:', e)
    }
  }

  // Add a new to-do for the user to Firestore
  const addNewTodo = async (newTodo: Todo) => {
    if (!user || !user.email) {
      console.error('User not authenticated or email not found')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        name: newTodo.name,
        description: newTodo.description,
        userId: user.email,
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

  // Delete a to-do from Firestore
  const deleteTodo = async (id: string) => {
    try {
      const docRef = doc(db, 'todos', id)
      await deleteDoc(docRef)
      todos.value = todos.value.filter((todo) => todo.id !== id) // Update local state
    } catch (e) {
      console.error('Error deleting todo:', e)
    }
  }

  return {
    todos,
    loadTodos,
    addNewTodo,
    deleteTodo, // Return the delete function
  }
})
