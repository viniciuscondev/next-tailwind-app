import Link from 'next/link';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

interface Response {
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

export default function Login() {

  const router = useRouter();
  
  const [inputs, setInputs] = useState({
    identifier: "",
    password: ""        
  });

  const { identifier, password } = inputs;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputs({ ...inputs, [event.target.name] : event.target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();    

    try {
        
        const data = { identifier, password };        

        const response: Response = await api.post('auth/local', data, {
            validateStatus: function (status) {
                return status < 500;
              }
        });

        if (response.data.jwt) {
            localStorage.setItem("token", response.data.jwt);
            toast.success('Usuário logado com sucesso!');
            setTimeout(() => { router.push('/dashboard'); }, 2000);
                   
        } else {
            console.log(response.data.message[0].messages[0].message);
            toast.error(response.data.message[0].messages[0].message);
        }    
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <div className="sm:bg-blue-900 bg-white flex items-center justify-center w-full min-h-screen">
      <Toaster />
      <main className="bg-white p-6 flex flex-col items-center rounded w-screen sm:w-96">
        <h1 className="text-4xl sm:text-2xl">Login</h1>                
        <form onSubmit={handleSubmit} className="flex flex-col w-5/6">
          <Input
            type="email"
            name="identifier"
            value={identifier}
            placeholder="Email"
            handleInputChange={handleInputChange}
          />                    
          <Input                        
            type="password"
            name="password"
            value={password}
            placeholder="Senha"
            handleInputChange={handleInputChange}
          />                    
          <Button margin="20px 0" title="Entrar" icon={<FiLogIn />} />
          <div className="self-end">
            <Link href='/register'><span className="cursor-pointer text-blue-600">Criar nova conta</span></Link>
          </div>
        </form>
      </main>
    </div>
  )
}
