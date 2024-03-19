import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import List from "../components/List"
import styles from "./ListDone.module.css"

export default function ListDone() {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    async function handleListDone(){
        try {
            const response = await axios.get("http://localhost:3001/readDone")
            setList(response.data)
        } catch (error) {
            window.alert("Não foi possivel listar todas as tarefas concluidas, tente novamente")
            navigate("/")
        }
    }

    useEffect(() => {
        handleListDone()
    }, [])
    
    return (
<       section className={ styles.ListDone }>
            <h1>Tarefas concluidas</h1>
            <List list={list} />
            <button className="ReturnButton" onClick={()=>{navigate("/")}}><IoIosArrowRoundBack size="40" color="white" /></button>
        </section>
    )
}