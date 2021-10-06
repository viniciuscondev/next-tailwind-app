import { useState } from 'react';
import axios from 'axios';

import Input from '../Input';

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();    

    try {
        
        const data = password;        

        const response: any = await axios.post('http://localhost:1337/auth/local', data, {
            validateStatus: function (status) {
                return status < 500;
              }
        });  
        
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
                    Configurações
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <h2 className="mr-6">Mudar senha</h2>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Nova senha"
                        handleInputChange={handleInputChange}
                    />
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}