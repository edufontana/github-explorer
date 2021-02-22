import React, {useState, FormEvent, useEffect} from 'react';
import {Title, Form, Repositories, Icondiv, Error } from './styles'
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api'

import logo from '../../assets/logo.svg'




interface Repository {

  full_name: string;
  description: string;
  owner:{
    login:string;
    avatar_url: string;
  }

}

const Dashboard: React.FC = () =>{


  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [respositories, setRepositories] = useState<Repository[]>([])


  useEffect(()=>{
    const storageRepositories = localStorage.getItem('@githubExplorer:repositories')

    if(storageRepositories){
      
      
      setRepositories(JSON.parse(storageRepositories))
    }

  },[])

  useEffect(()=>{

    localStorage.setItem('@githubExplorer:repositories', JSON.stringify(respositories))

  },[respositories])


  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
   event.preventDefault()

   if(!newRepo){
    setNewRepo('')
     setInputError('Digite o autor/nome do repositório')
     return;
   }
    
   try{
    const response = await api.get<Repository>(`repos/${newRepo}`);

   const repository =  response.data;

   console.log(repository)

   setRepositories([...respositories, repository])
   setNewRepo('')
   setInputError('')

   }catch(err){
    setNewRepo('')
    setInputError('Erro na busca do repositório')
   }
  }

  return (
    <>
      <img src={logo} alt="git explorer"/>
      <Title>Explore repositórios no Github</Title>
     

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e=> setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>


      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {respositories.map((resposiroty)=>(
            <a key={resposiroty.full_name} href="teste">
            <img src={resposiroty.owner.avatar_url} alt="eduardo"/>
            <div>
              <strong>{resposiroty.full_name}</strong>
              <p>{resposiroty.description}</p>
            </div>
  
            <Icondiv>
             <FiChevronRight size={20}/>
            </Icondiv>
            
          </a>


        ))}
  

     

      </Repositories>
    </>
  )
}


export default Dashboard
