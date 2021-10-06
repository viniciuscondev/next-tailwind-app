import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  
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
        
        const data = { username, email, password };        

        const response = await axios.post('http://localhost:1337/auth/local/register', data, {
            validateStatus: function (status) {
                return status < 500;
              }
        });

        console.log(response);

        // if (response.data.token) {
        //     localStorage.setItem("token", response.data.token);
        //     setAuth(true);
        //     toast.info("Login realizado com sucesso!", {position: toast.POSITION.TOP_CENTER});            
        // } else {
        //     setAuth(false);
        //     toast.error(response.data.error, {position: toast.POSITION.TOP_CENTER});
        // }
    
        
    } catch (error) {
        console.error(error);            
    }
}

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
      <h1>Registrar</h1>                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Nome"
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Senha"
                        onChange={handleInputChange}
                    />                    
                    <button>Criar conta</button>
                    <Link href='/' >Já tem uma conta? Clique aqui para entrar</Link>
                </form>
      </main>
    </div>
  )
}
