import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext(undefined);

export default function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        try {
            
            const response: any = await axios.get('http://localhost:1337/tasks/me', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }
            });

            setTasks(response.data);

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                getTasks              
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    const { tasks, setTasks, getTasks } = context;
    return { tasks, setTasks, getTasks };
}