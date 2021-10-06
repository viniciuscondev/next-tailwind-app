import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [username, setUsername] = useState("");

    async function getProfileData() {
        try {

            const response: any = await axios.get('http://localhost:1337/users/me', {
                headers: {
                    token: localStorage.token
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
            <h1>Dashboard</h1>
            <p>Olá, {username}</p>
        </>
    );
}