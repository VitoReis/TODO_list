import axios from "axios"
import { useState } from "react"
import { IoIosAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import TwoFields from "../components/TwoFields"
import styles from "./Add.module.css"

export default function Add() {
    const [description, setDescription] = useState()
    const [duedate, setDuedate] = useState()
    const navigate = useNavigate()

    async function handleAdd(){
        if(description == "" || duedate == ""){
          window.alert("Por favor, preencha todos os campos")
          return
        }
        try {
          const response = await axios.post("http://localhost:3001/create", { "description": description, "duedate": duedate })
          window.alert("Tarefa adicionada com sucesso")
          navigate("") 
        } catch (error) {
          window.alert("Não foi possivel adicionar a tarefa")
        }
      }

    return(
        <section className={ styles.Add }>
          <h1>Adicionar tarefa</h1>
          <TwoFields
            type='text'
            placeholder='Insira uma descrição'
            state={setDescription}
            type2='date'
            placeholder2=''
            state2={setDuedate}
          >
            <IoIosAdd size='40' color='white' onClick={handleAdd}/>
          </TwoFields >
        </section>
    )
}