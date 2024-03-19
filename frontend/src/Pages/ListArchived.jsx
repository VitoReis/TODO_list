
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import List from "../components/List"
import styles from "./ListArchived.module.css"

export default function ListArchived() {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    async function handleListHide(){
        try {
            const response = await axios.get('http://localhost:3001/readHide')
            setList(response.data)
        } catch (error) {
            window.alert("Não foi possivel listar todas as tarefas arquivadas, tente novamente")
            navigate("/")
        }
    } 

    useEffect(() => {
        handleListHide()
    }, [])

    return (
        <section className={ styles.ListArchived }>
            <h1>Tarefas arquivadas</h1>
            <List list={list} />
            <button className='ReturnButton' onClick={()=>{navigate("/")}}><IoIosArrowRoundBack size='40' color='white' /></button>
        </section>
    )
}