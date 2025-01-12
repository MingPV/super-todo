import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { connectDatabaseEmulator, getDatabase } from 'firebase/database'

// Initialize Firebase with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const rt_db = getDatabase(app)
connectDatabaseEmulator(rt_db, '127.0.0.1', 9000)

const auth = getAuth()
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

export { db, rt_db, auth }
