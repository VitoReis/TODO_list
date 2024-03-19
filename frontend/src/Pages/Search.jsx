import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosSearch, IoIosCheckmarkCircleOutline, IoIosArchive, IoIosTrash } from "react-icons/io"
import OneField from "../components/OneField"
import styles from "./Search.module.css"

export default function Search() {
  const navigate = useNavigate()
  const [description, setDescription] = useState()
  const [result, setResult] = useState(new Object())
  

    async function handleSearch(){
        if(description == ""){
          window.alert("Por favor, preencha o campo de busca")
          return
        }
        try {
          const response = await axios.post("http://localhost:3001/search", { "description": description })
          setResult(response.data)
        } catch (error) {
          window.alert("Tarefa não encontrada, tente novamente")
        }
    }

    async function handleDone(){
        try {
          const response = await axios.put("http://localhost:3001/done", { "description": result.description })
          window.alert("Tarefa concluida com sucesso")
          navigate("/")
        } catch (error) {
          window.alert("Não foi possivel concluir a tarefa")
        }
    }

    async function handleHide(){
        try {
            const response = await axios.put("http://localhost:3001/hide", { "description": result.description })
            window.alert("Tarefa arquivada com sucesso")
            navigate("/")
        } catch (error) {
            window.alert("Não foi possivel arquivar a tarefa")
        }
    }

    async function handleDelete(){
        try {
          const response = await axios.delete("http://localhost:3001/delete", { data: {"description": result.description} })
          window.alert("Tarefa excluida com sucesso")
          navigate("/")
        } catch (error) {
          window.alert("Não foi possivel excluir a tarefa")
        }
      }

    return (
        <section className={ styles.Search }>
            <h1>Pesquisar tarefa</h1>
            <section className={ styles.SearchForm }>
                <OneField
                type='text'
                placeholder='Insira uma descrição'
                state={setDescription}
                action={handleSearch}
                >
                <IoIosSearch size='30' color='white' />
                </OneField>
            </section>
        
            {Object.keys(result).length > 0 && (
                <section className={ styles.Result }>
                    <p>Descrição: {result.description}</p>
                    <p>Data: {new Date(result.duedate).getDate() + 1}/{new Date(result.duedate).getMonth() + 1}/{new Date(result.duedate).getFullYear()}</p>
                    {result.done == 0 
                    ? <button onClick={handleDone}>Concluir tarefa <IoIosCheckmarkCircleOutline size='20' color='white'/></button>
                    : <p>Concluida <IoIosCheckmarkCircleOutline size='20' color='white'/></p>
                    }
                    {result.hide == 0 
                    ? <button onClick={handleHide}>Arquivar tarefa <IoIosArchive size='20' color='white'/></button>
                    : <p>Tarefa arquivada <IoIosArchive size='20' color='white'/></p>
                    }
                    <button onClick={handleDelete}>Excluir tarefa <IoIosTrash size='20' color='white'/></button>
                </section>
            )}
        </section>
    )
}