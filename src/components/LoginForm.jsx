import React, {useState} from 'react'
import { loginUser } from '../services/auth'
import {Link} from 'react-router-dom'

export const LoginForm = ({isAuthenticated, setIsAuthenticated, handleLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);  // Llamamos a handleLogin
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg'>
                <div>
                <img
                    src="src/images/Designer.png"
                    alt="Logo"
                    className="mx-auto h-32 w-auto"
                />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input type="email" 
                        required 
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm" 
                        placeholder='Correo' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input type="password" 
                        required 
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm" 
                        placeholder='Contraseña' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='py-6'> 
                        <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="text-center">
                        <Link to="/signin" className="text-blue-900 hover:text-blue-700">
                            Regístrate aquí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
