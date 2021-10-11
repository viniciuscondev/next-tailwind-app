import { useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';
import { useTasks } from '../../context/Tasks';
import toast from 'react-hot-toast';

import Input from '../Input';
import api from '../../services/api';

interface Response {
  status?: number,
  data?: {
    jwt?: string,
    message?: [{
      messages?: [{
        id?: string,
        message?: string
      }]
    }]
  }
}

interface Props {
  task: {
    title: string,
    id: number
  }
}

export default function TaskModal({ task }: Props ) {

  const [showModal, setShowModal] = useState(false);
  const [newtask, setNewtask] = useState("");
  const { getTasks } = useTasks();
 
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewtask(event.target.value);
  }

  
  async function updateTask(event: React.FormEvent) {
    event.preventDefault();

    try {

        const response: Response = await api.put(`tasks?taskid=${task.id}`, {
          newtask: newtask
        }, {            
              headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });
        
        if(response.status === 200) {
          toast.success('Tarefa alterada com sucesso!');
        } else {
          toast.error(response.data.message[0].messages[0].message);
        }

        setShowModal(false);
        getTasks();
                
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <>
      <button className="bg-green-500 text-white p-2 text-lg ml-1 rounded" onClick={() => setShowModal(true)}>
        <FiEdit />
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Atualizar tarefa
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-500 ml-4 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FiX />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={updateTask} className="flex flex-col text-xl">                    
                      <Input
                          type="text"
                          name="updatetask"                        
                          placeholder="Novo valor"
                          handleInputChange={handleInputChange}
                      />
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                      Enviar
                      </button>
                  </form>                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}