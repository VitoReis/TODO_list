import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IoIosAdd, IoIosCheckmarkCircleOutline, IoIosArrowRoundBack, IoIosCheckmark, IoIosSearch, IoIosBuild, IoIosEye, IoIosTrash, IoIosArchive, IoIosRadioButtonOff } from 'react-icons/io'
// COMPONENTS
import TwoFields from './components/TwoFields'
import OneField from './components/OneField'
import List from './components/List'


function App() {
  const [description, setDescription] = useState('')
  const [duedate, setDuedate] = useState('')
  const [screen, setScreen] = useState(0)
  const [result, setResult] = useState(new Object())
  const [list, setList] = useState(new Object())

  function handleReturn(){
    setDescription('')
    setDuedate('')
    setResult('')
    setList()
    setScreen(0)
  }

  async function handleAdd(){
    try {
      const response = await axios.post('http://localhost:3001/create', { "description": description, "duedate": duedate })
      window.alert('Tarefa adicionada com sucesso')
      handleReturn() 
    } catch (error) {
      window.alert('Não foi possivel adicionar a tarefa')
    }
  }

  async function handleUpdate(){
    try{
      const response = await axios.put('http://localhost:3001/update', { "description": description, "duedate": duedate })
      window.alert('Tarefa atualizada com sucesso')
      handleReturn()
    } catch (error) {
      window.alert('Não foi possivel atualizar a tarefa')
    }
  }

  async function handleSearch(){
    try {
      const response = await axios.post('http://localhost:3001/search', { "description": description })
      setResult(response.data)
    } catch (error) {
      window.alert('Tarefa não encontrada, tente novamente')
    }
  }

  async function handleDelete(){
    try {
      const response = await axios.delete('http://localhost:3001/delete', { data: {"description": result.description} })
      window.alert('Tarefa excluida com sucesso')
      handleReturn()
    } catch (error) {
      window.alert('Não foi possivel excluir a tarefa')
    }
  }

  async function handleDone(){
    try {
      const response = await axios.put('http://localhost:3001/done', { "description": result.description })
      window.alert('Tarefa concluida com sucesso')
      handleReturn()
    } catch (error) {
      window.alert('Não foi possivel concluir a tarefa')
    }
  }

  async function handleHide(){
    try {
      const response = await axios.put('http://localhost:3001/hide', { "description": result.description })
      window.alert('Tarefa arquivada com sucesso')
      handleReturn()
    } catch (error) {
      window.alert('Não foi possivel arquivar a tarefa')
    }
  }

  async function handleListAll(){
    try {
      const response = await axios.get('http://localhost:3001/readAll')
      setScreen(4)
      setList(response.data)
    } catch (error) {
      window.alert("Não foi possivel listar todas as tarefas, tente novamente")
      handleReturn()
    }
  }

  async function handleListDone(){
    try {
      const response = await axios.get('http://localhost:3001/readDone')
      setScreen(5)
      setList(response.data)
    } catch (error) {
      window.alert("Não foi possivel listar todas as tarefas concluidas, tente novamente")
      handleReturn()
    }
  }

  async function handleListHide(){
    try {
      const response = await axios.get('http://localhost:3001/readHide')
      setScreen(6)
      setList(response.data)
    } catch (error) {
      window.alert("Não foi possivel listar todas as tarefas arquivadas, tente novamente")
      handleReturn()
    }
  }

  return (
    <div className="App">

      {screen === 0 && (
        <section className='Options'>
          <h1>TODO list</h1>
          <button onClick={()=>{setScreen(1)}}>Adicionar tarefa <IoIosAdd size='20' /></button>
          <button onClick={()=>{setScreen(2)}}>Atualizar tarefa <IoIosBuild size='20' /></button>
          <button onClick={()=>{setScreen(3)}}>Pesquisar tarefa <IoIosSearch size='20' /></button>
          <button onClick={handleListAll}>Visualizar tarefas <IoIosEye size='20' /></button>
          <button onClick={handleListDone}>Visualizar tarefas concluidas <IoIosEye size='20' /></button>
          <button onClick={handleListHide}>Visualizar tarefas arquivadas <IoIosEye size='20' /></button>
        </section>
      )}

      {screen === 1 && (
        <section className='Add'>
          <h1>Adicionar tarefa</h1>
          <TwoFields
            type='text'
            placeholder='Insira uma descrição'
            state={setDescription}
            type2='date'
            placeholder2=''
            state2={setDuedate}
            return={handleReturn}
          >
            <IoIosAdd size='40' color='white' onClick={handleAdd}/>
          </TwoFields >
        </section>
      )}

      {screen === 2 && (
        <section className='Update'>
          <h1>Atualizar tarefa</h1>
          <TwoFields 
            type='text' 
            placeholder='Insira uma descrição'  
            state={setDescription} 
            type2='date'
            placeholder2=''
            state2={setDuedate} 
            action={handleUpdate}
            return={handleReturn}
          >
            <IoIosCheckmark size='40' color='white'/>
          </TwoFields >
        </section>
      )}

      {screen === 3 && (
        <section className='Search'>
          <h1>Pesquisar tarefa</h1>
          <section className='Search-Form'>
            <OneField
              type='text'
              placeholder='Insira uma descrição'
              state={setDescription}
              action={handleSearch}
              return={handleReturn}
            >
              <IoIosSearch size='30' color='white' />
            </OneField>
          </section>
        
        {Object.keys(result).length > 0 && (
          <section className='Result'>
            <p>Descrição: {result.description}</p>
            <p>Data: {new Date(result.duedate).getDate() + 1}/{new Date(result.duedate).getMonth() + 1}/{new Date(result.duedate).getFullYear()}</p>
            {result.done == 0 
              ? <button onClick={handleDone}>Concluir tarefa <IoIosCheckmarkCircleOutline size='20' color='white'/></button>
              : <p>Concluida <IoIosCheckmarkCircleOutline size='20' color='white'/></p>
            }
            {result.hide == 0 ?
              <button onClick={handleHide}>Arquivar tarefa <IoIosArchive size='20' color='white'/></button>
              :
              <p>Tarefa arquivada <IoIosArchive size='20' color='white'/></p>
            }
            <button onClick={handleDelete}>Excluir tarefa <IoIosTrash size='20' color='white'/></button>
            
          </section>
        )}
        </section>
      )}

      {screen === 4 && (
        <section className='All'>
          <h1>Tarefas</h1>
          <List list={list} />
          <button className='ReturnButton' onClick={handleReturn}><IoIosArrowRoundBack size='40' color='white' /></button>
        </section>
      )}

      {screen === 5 && (
        <section className='AllDone'>
          <h1>Tarefas concluidas</h1>
          <List list={list} />
          <button className='ReturnButton' onClick={handleReturn}><IoIosArrowRoundBack size='40' color='white' /></button>
        </section>
      )}

      {screen === 6 && (
        <section className='AllHide'>
          <h1>Tarefas arquivadas</h1>
          <List list={list} />
          <button className='ReturnButton' onClick={handleReturn}><IoIosArrowRoundBack size='40' color='white' /></button>
        </section>
      )}
    </div>
  );
}

export default App;
