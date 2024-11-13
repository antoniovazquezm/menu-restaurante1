import React, {useState} from "react";
import { logoutUser } from "../services/auth";
import { Link, useLocation } from "react-router-dom";


export function Header({ isAdmin, setIsAdmin, isAuthenticated, setIsAuthenticated }) {
    const location = useLocation();
    const handleLogout = () => {
        logoutUser(); 
        setIsAuthenticated(false);
        setIsAdmin(false);
    };


    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">Antojitos Tony</Link>
                    <nav className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <button 
                                    className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-400"
                                    onClick={handleLogout}
                                >
                                    Salir ⇥
                                </button>
                            </>
                        ) : (
                            <>
                
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}