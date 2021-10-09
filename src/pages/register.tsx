import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { FiUserCheck } from 'react-icons/fi';
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

export default function Register() {
  const router = useRouter();
  
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = inputs;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputs({ ...inputs, [event.target.name] : event.target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
        
        const userData = { username, email, password };        

        const response: Response = await axios.post('http://localhost:1337/auth/local/register', userData, {
            validateStatus: function (status) {
                return status < 500;
              }
        });

        console.log(response);

        if (response.data.jwt) {            
            alert("Conta criada com sucesso!");
            router.push('/');
            //toast.info("Login realizado com sucesso!", {position: toast.POSITION.TOP_CENTER});            
        } else {
            console.log(response.data.message[0].messages[0].message);
            alert(response.data.message[0].messages[0].message);
            //toast.error(response.data.error, {position: toast.POSITION.TOP_CENTER});
        }
    
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <div className="sm:bg-blue-900 bg-white flex items-center justify-center w-full min-h-screen">
      <main className="bg-white p-6 flex flex-col items-center rounded w-screen sm:w-96">
        <h1 className="text-4xl sm:text-2xl">Registrar</h1>                
        <form onSubmit={handleSubmit} className="flex flex-col w-5/6">
            <Input
                type="text"
                name="username"
                value={username}
                placeholder="Nome de usuário"
                handleInputChange={handleInputChange}
            />
            <Input
                type="email"
                name="email"
                value={email}
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
            <Button margin="20px 0" title="Cadastrar" icon={<FiUserCheck />} />
            <div className="self-end">
              <Link href='/' ><span className="cursor-pointer text-blue-600">Já tem uma conta? Clique aqui para entrar</span></Link>
            </div>
        </form>
      </main>
    </div>
  )
}
