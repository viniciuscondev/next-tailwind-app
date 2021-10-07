import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSettings, FiLogOut } from 'react-icons/fi';

import Modal from '../components/Modal';
import Button from '../components/Button';
import router from 'next/router';

export default function Dashboard() {
    const [username, setUsername] = useState("");

    async function getProfileData() {
        try {

            const response: any = await axios.get('http://localhost:1337/users/me', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }
            });            
                        
            setUsername(response.data.username);
        } catch (err) {
            console.error(err.message);
        }
    }

    function logout(event: React.MouseEvent) {
        event.preventDefault();
        localStorage.removeItem("token");
        router.push('/');
    };
    
    useEffect(() => {
        if(localStorage.token) {
            getProfileData();
        } else {
            alert('Acesso não autorizado, entre com uma conta');
            router.push('/');
        }
    },[]);

    return (
        <>
            <nav className="flex sm:flex-row flex-col items-center justify-between bg-blue-900 p-4">
                <h1 className="text-4xl mb-3 sm:mb-0 sm:text-lg text-white">Dashboard</h1>
                <div className="flex items-center justify-center">
                    <Modal />
                    <button
                        className="bg-red-500 text-white active:bg-pink-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={logout}
                    >
                        Sair
                    </button>
                </div>
            </nav>
            <p>Olá, {username}</p>
        </>
    );
}