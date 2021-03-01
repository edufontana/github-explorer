import React, {useEffect, useState} from 'react';
import {useRouteMatch, Link} from 'react-router-dom'
import { Header, RepositoryInfo, Issues } from './styles'
import {FiChevronsLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import logo from '../../assets/logo.svg'

interface IpropRepository{

  repository: string;

}

interface Reposiroty{

  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count:number;
  open_issues_count: number;
  owner:{
    login:string;
    avatar_url: string;
  }
}

interface Issue {

  id: number;
  title: string;
  user:{
    login: string;
  }
  html_url: string;

}

const Repository: React.FC = () =>{

  const [repository, setRepository] = useState<Reposiroty | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])



  useEffect(()=>{

     /* api.get(`repos/${params.repository}`).then(response=>{
      console.log(response.data)
        
     })

     api.get(`repos/${params.repository}/issues`).then(response=>{
      console.log(response.data)
        
     }) */

     async function loadData(): Promise<void>{
       

      
        const repository = await api.get(`repos/${params.repository}`)
        setRepository(repository.data)
        

        const issues = await api.get(`repos/${params.repository}/issues`)
        setIssues(issues.data)

        
     }

     loadData()
     
     

  },[])
  
  const { params } = useRouteMatch<IpropRepository>()


  return (
    <>
    <Header>
      <img src={logo} alt="github explorer"/>
      <Link to={`/`}>
        <FiChevronsLeft size={16}/>
        Voltar
      </Link>
    </Header>

   { repository && 
     <RepositoryInfo>
     <header>
       <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
       <div>
         <strong>{repository.full_name}</strong>
         <p>{repository.description}</p>
       </div>
     </header>
     <ul>
       <li>
         <strong>{repository.stargazers_count}</strong>
         <span>Start</span>
       </li>
       <li>
         <strong>{repository.forks_count}</strong>
         <span>forks</span>
       </li>
       <li>
         <strong>{repository.open_issues_count}</strong>
         <span>issues abertas</span>
       </li>
     </ul>
   </RepositoryInfo>
   }


    <Issues>
     {issues.map(issue=>(

        <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>

          <FiChevronRight size={20}/>
       
        </a>  

     ))}    
    </Issues>

    </>

  );

}


export default Repository
