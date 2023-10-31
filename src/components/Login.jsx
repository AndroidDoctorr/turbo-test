import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const auth = useAuth()

    useEffect(() => {
        const setupAuth = async () => {
            const authInstance = await auth
            onAuthStateChanged(authInstance, (authUser) => {
                setUser(authUser)
            })
        }
        setupAuth()
    }, [])

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            setUser(user) // Set the user state in the App component
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // No need to set user here; it will be set in the App component
        } catch (error) {
            console.error(error)
        }
    }

    const handlePassChange = e => {
        setPass(e.target.value)
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    return (
        <div>
            <h2>Login</h2>
            Email:
            <input
                type='text'
                onChange={handleEmailChange}
                placeholder='Email'
                value={email}
                name='email'
            />
            Password:
            <input
                type='password'
                onChange={handlePassChange}
                placeholder='Password'
                value={password}
                name='password'
            />
            <button onClick={handleSignIn}>Sign in via Email</button>
            <br />
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    )
}

export default Login
