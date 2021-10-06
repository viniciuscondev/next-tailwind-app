import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { FiLogIn } from 'react-icons/fi';

import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  
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
        
        const data: any = { identifier, password };        

        const response = await axios.post('http://localhost:1337/auth/local', data, {
            validateStatus: function (status) {
                return status < 500;
              }
        });

        console.log(response.data);

        if (response.data.jwt) {
            localStorage.setItem("token", response.data.jwt);
            alert('Usuário logado com sucesso!');            
                   
        } else {
            alert('Deu ruim');
        }
    
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <div className="bg-blue-900 flex items-center justify-center w-full min-h-screen">
      <main className="bg-white p-6 flex flex-col items-center">
      <h1 className="text-2xl">Login</h1>                
                <form onSubmit={handleSubmit} className="flex flex-col">
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
