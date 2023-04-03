'use client'

import { signIn } from 'next-auth/react'

export default function Login() {

    return (
        <li className="list-none">
            <button 
                className="px-6 py-2 text-sm text-white bg-gray-700 rounded-xl disabled:opacity-25" 
                onClick={() => signIn()}
            >
                Sign In
            </button>
        </li>
    )
}