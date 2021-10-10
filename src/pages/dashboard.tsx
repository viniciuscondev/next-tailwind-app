import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlusSquare, FiTrash2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

import Modal from '../components/Modal';
import TaskModal from '../components/TaskModal';
import router from 'next/router';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTasks } from '../context/Tasks';

interface Response {
    data?: {
        username: string,
        id: string
    }
}

type task = {
    id: number,
    title: string
}

export default function Dashboard() {
    const [username, setUsername] = useState("");
    const { tasks, getTasks } = useTasks();
    const [newtask, setNewtask] = useState("");
    const [userid, setUserid] = useState("");

    async function getProfileData() {
        try {

            const response: Response = await axios.get('http://localhost:1337/users/me', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }
            });
                        
            setUsername(response.data.username);
            setUserid(response.data.id);
        } catch (err) {
            console.error(err.message);
        }
    }

    function logout(event: React.MouseEvent) {
        event.preventDefault();
        localStorage.removeItem("token");
        router.push('/');
    };

    async function deleteTask(task: task) {
        
        try {
            
            await axios.delete(`http://localhost:1337/tasks?taskid=${task.id}`, {
                headers: {                    
                    Authorization: 'Bearer ' + localStorage.token
                }
            });

            getTasks();
            toast.success('Tarefa apagada!');

        } catch (error) {
            console.error(error);
        }        
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewtask(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            
            await axios.post('http://localhost:1337/tasks', {
                title: newtask,
                userid: userid
            },{
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }
            });

            getTasks();
            setNewtask("");

        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if(localStorage.token) {
            getProfileData();
        } else {
            alert('Acesso não autorizado, entre com uma conta');
            router.push('/');
        }
    },[]);

    useEffect(() => {
        getTasks();             
    },[]);

    return (        
        <main className="flex flex-col items-center">
            <Toaster />
            <nav className="flex sm:flex-row w-screen flex-col items-center justify-between bg-blue-900 p-4">
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
            <p className="self-start m-2 text-xl">Olá, {username}</p>
            <form className="mb-10" onSubmit={handleSubmit}>
                <Input type="text" name="newtask" value={newtask} placeholder="Nova tarefa" handleInputChange={handleInputChange} />
                <Button width="120px" title="Enviar" icon={<FiPlusSquare />} />
            </form>            
            <section className="w-9/12">
                <h2 className="text-4xl mb-4">Suas tarefas:</h2>
                {
                    tasks.length > 0 ?
                        <ul>
                        {tasks.map((task: task, index: number) => (
                            <li key={index} className="border border-black p-1 rounded mb-2 flex justify-between">
                                {task.title}
                                <div>
                                    <button onClick={() => deleteTask(task)} className="bg-red-500 text-white p-1 rounded"><FiTrash2 /></button>
                                    <TaskModal task={task}/>
                                </div>
                            </li>
                        ))}                                     
                        </ul>
                    :
                    <h1 className="text-xl">Nenhuma tarefa foi cadastrada ainda.</h1>
                }                
            </section>
        </main>
    );
}