import axios from "axios"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import{ IoIosAdd, IoIosBuild, IoIosSearch, IoIosEye } from 'react-icons/io'
import List from "../components/List"
import styles from "./Main.module.css"

export default function Main() {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    async function handleListAll(){
        try {
          const response = await axios.get('http://localhost:3001/readAll')
          setList(response.data)
        } catch (error) {
          window.alert("Não foi possivel listar todas as tarefas, tente novamente")
          navigate("/")
        }
    }

    useEffect(() => {
        handleListAll()
    }, [])

    return (
        <section className={ styles.Main }>
            <section className={ styles.Options }>
                <h1>Opções</h1>
                <button onClick={()=>{navigate('/add')}}>Adicionar tarefa <IoIosAdd size='20' /></button>
                <button onClick={()=>{navigate('/update')}}>Atualizar tarefa <IoIosBuild size='20' /></button>
                <button onClick={()=>{navigate('/search')}}>Pesquisar tarefa <IoIosSearch size='20' /></button>
                <button onClick={()=>{navigate('/list/done')}}>Visualizar tarefas concluidas <IoIosEye size='20' /></button>
                <button onClick={()=>{navigate('/list/archived')}}>Visualizar tarefas arquivadas <IoIosEye size='20' /></button>
            </section>

            
            <section className={ styles.RightSide }>
                <h1>Minhas tarefas:</h1>
                <List list={list} />
            </section>
        </section>
    )
}