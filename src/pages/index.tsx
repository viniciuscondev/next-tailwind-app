import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';

import Input from '../components/Input';
import Button from '../components/Button';

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

        const response: Response = await axios.post('http://localhost:1337/auth/local', data, {
            validateStatus: function (status) {
                return status < 500;
              }
        });

        if (response.data.jwt) {
            localStorage.setItem("token", response.data.jwt);
            alert('Usuário logado com sucesso!');
            router.push('/dashboard');            
                   
        } else {
            console.log(response.data.message[0].messages[0].message);
            alert(response.data.message[0].messages[0].message);
        }    
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <div className="sm:bg-blue-900 bg-white flex items-center justify-center w-full min-h-screen">
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
