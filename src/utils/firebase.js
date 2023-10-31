import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

let firebaseApp
let user

export const getApp = () => {
  if (!firebaseApp) setupFirebase()
  return firebaseApp
}

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      databaseURL: import.meta.env.VITE_DATABASE_URL,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
    })
  } catch (error) {
    console.error({ error })
  }
}

export const useAuth = async () => {
  const auth = getAuth(firebaseApp)
  await new Promise((resolve) => {
    onAuthStateChanged(auth, (authUser) => {
      user = authUser
      resolve()
    })
  })
  return auth
}

export const useFirestore = () => {
  let firestore = getFirestore(firebaseApp) // Initialize firestore within the function
  return firestore
}

export const useFunctions = () => {
  let functions = getFunctions(firebaseApp) // Initialize functions within the function
  return functions
}

export const useStorage = () => {
  let storage = getStorage(firebaseApp) // Initialize storage within the function
  return storage
}

export const getCurrentUser = () => {
  return user
}
