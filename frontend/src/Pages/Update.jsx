import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosCheckmark } from "react-icons/io"
import TwoFields from "../components/TwoFields"
import styles from "./Update.module.css"

export default function Update(){
    const [description, setDescription] = useState()
    const [duedate, setDuedate] = useState()
    const navigate = useNavigate()

    async function handleUpdate(){
        if(description == "" || duedate == ""){
          window.alert("Por favor, preencha todos os campos")
          return
        }
        try{
          const response = await axios.put("http://localhost:3001/update", { "description": description, "duedate": duedate })
          window.alert("Tarefa atualizada com sucesso")
          navigate("/")
        } catch (error) {
          window.alert("Não foi possivel atualizar a tarefa")
        }
      }

    return (
        <section className={ styles.Update }>
          <h1>Atualizar tarefa</h1>
          <TwoFields 
            type='text' 
            placeholder='Insira uma descrição'  
            state={setDescription} 
            type2='date'
            placeholder2=''
            state2={setDuedate} 
            action={handleUpdate}
          >
            <IoIosCheckmark size='40' color='white'/>
          </TwoFields >
        </section>
    )
}