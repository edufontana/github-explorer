import styled, {css} from 'styled-components'
import { shade } from 'polished'


  interface FormProps{

    hasError: boolean;
  }


 export const Title = styled.h1`

  font-size: 48px;
  color: #3A3A3A;  
  margin-top: 80px;
  line-height: 56px;
  max-width: 500px;

`


export const Form = styled.form<FormProps>`

  margin-top:40px;
  max-width: 700px;
  display:flex;

  input{
    flex:1;
    height: 70px;
    padding: 0 24px;
    border:0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;

    ${(props)=> props.hasError && css`
    border-color: #c53030;
    `}

    &::placeholder{

      color: #a8a8b3;

    }
    
  }

  button{
    width: 210px;
    border-radius: 0 5px 5px 0;
    background-color: #04d361;
    height: 70px;
    border:0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;


    &:hover{
      background:${shade(0.2, '#04d361')}

    }


  }
`


export const Error = styled.div`
  display: block;
  color: #c53030;
  margin-top:8px;
`

export const Repositories = styled.span`

  display: flex;
  flex-direction: column;
  margin-top: 80px;
  max-width: 700px;

  a{
    background: #fff;
    border-radius: 6px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px
    }

      img{
      width: 64px;
      height: 64px;
      border-radius: 50%;


    }

    div{
      margin-left: 16px;


      strong{
        font-size: 20px;
        color: #3D3D4D;
      }

      p{

        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;

      }


    }

    svg{
      margin-left: auto;

    }

    &:hover{
      transform: translateX(10px)

    }

  }


  

`

export const Icondiv = styled.div`

  padding-left: 100px;
  color: #3D3D4D;

`