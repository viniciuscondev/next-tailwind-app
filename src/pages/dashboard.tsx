import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';

import Modal from '../components/Modal';

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
    
    useEffect(() => {
        getProfileData();
    },[]);

    return (
        <>
            <nav className="flex items-center justify-between bg-blue-900 p-4">
                <h1 className="text-lg text-white">Dashboard</h1>
                <Modal />
            </nav>
            <p>Olá, {username}</p>
        </>
    );
}