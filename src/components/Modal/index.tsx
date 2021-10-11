import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

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

export default function Modal() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleDeleteAccount() {
    try {               

      await api.delete('users/me', {            
            headers: {
              Authorization: 'Bearer ' + localStorage.token
          }         

      });

      toast.success('Conta excluída com sucesso!');
      localStorage.removeItem("token");
      setTimeout(() => { router.push('/'); }, 2000);
      
  } catch (error) {
      console.error(error);            
  }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();    

    try {               

        const response: Response = await api.put('users/me', {
          password: password
        }, {            
              headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });
        
        if(response.status === 200) {
          setPassword("");
          toast.success('Senha alterada com sucesso!');
      } else {
          alert(response.data.message[0].messages[0].message);
      }
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-pink-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Configurações
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
                    Configurações de conta
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
                <form onSubmit={handleSubmit} className="flex flex-col text-xl">
                    <h2 className="mr-6 mb-4">Mudar senha:</h2>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Nova senha"
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
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">                  
                  <button
                    className="bg-red-500 mt-6 text-white font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDeleteAccount}
                  >
                    Deletar conta
                  </button>
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