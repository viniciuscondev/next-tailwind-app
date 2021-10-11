import { useState, useEffect } from 'react';
import { FiPlusSquare, FiTrash2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

import Modal from '../components/Modal';
import TaskModal from '../components/TaskModal';
import router from 'next/router';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTasks } from '../context/Tasks';
import api from '../services/api';

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

            const response: Response = await api.get('users/me', {
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
            
            await api.delete(`tasks?taskid=${task.id}`, {
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
            
            await api.post('tasks', {
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
                            <li key={index} className="border border-gray-500 p-1 rounded mb-2 flex flex-col sm:flex-row justify-between items-center pl-4">
                                {task.title}
                                <div className="flex">
                                    <button onClick={() => deleteTask(task)} className="bg-red-500 text-white p-2 text-lg rounded"><FiTrash2 /></button>
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