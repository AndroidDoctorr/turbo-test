import { useEffect, useState } from 'react'
import Login from './components/Login'
import { getApp, useAuth } from './utils/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { getRestaurants, createRestaurant } from './utils/services/restaurant'

const app = getApp()

function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    const initializeApp = async () => {
      const auth = await useAuth()
      onAuthStateChanged(auth, (authUser) => {
        setUser(authUser)
      })
    }

    initializeApp()
  }, [])

  const handleLogout = async () => {
    try {
      const auth = await useAuth()
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getAllRestaurants = async () => {
    try {
      const auth = await useAuth()
      const restaurants = await getRestaurants()
      console.log(restaurants)
    } catch (error) {
      console.error('Couldn\t get restaurants:', error)
    }
  }

  const handleCreateRestaurant = async () => {
    const newRestaurant = await createRestaurant(name, location)
    console.log(newRestaurant)
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleLocationChange = e => {
    setLocation(e.target.value)
  }

  return (
    <>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>

          {/* logged-in content */}

          <div>
            <button onClick={getAllRestaurants}>
              {'Get Restaurants'}
            </button>
          </div>
          <div>
            <input
              type='text'
              onChange={handleNameChange}
              placeholder='Name'
              value={name}
              name='name'
            />
            <input
              type='text'
              onChange={handleLocationChange}
              placeholder='Location'
              value={location}
              name='location'
            />
            <button onClick={handleCreateRestaurant}>
              {'Create Restaurant'}
            </button>
          </div>

        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  )
}

export default App
