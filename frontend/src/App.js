import './App.css';
import { useState } from 'react'
import axios from 'axios'
import { IoIosAdd, IoIosApps, IoIosArrowRoundBack, IoIosCheckmark, IoIosSearch, IoIosBuild, IoIosAlbums, IoIosEye, IoIosTrash, IoIosArchive } from 'react-icons/io'
// COMPONENTS
import TwoFields from './components/TwoFields'
import OneField from './components/OneField'
import List from './components/List'


function App() {
  const [description, setDescription] = useState('')
  const [duedate, setDuedate] = useState('')
  const [screen, setScreen] = useState(0)
  const [result, setResult] = useState('')
  const [list, setList] = useState()

  function handleReturn(){
    setDescription('')
    setDuedate('')
    setResult('')
    setList()
    setScreen(0)
  }

  async function handleAdd(){
    try {
      const response = await axios.post('http://localhost:3001/create', { "description": description, "duedate": duedate }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        window.alert('Tarefa adicionada com sucesso')
        handleReturn()
      }else{
        window.alert('Não foi possivel adicionar a tarefa')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
    }
  }

  async function handleUpdate(){
    try{
      const response = await axios.put('http://localhost:3001/update', { "description": description, "duedate": duedate }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        window.alert('Tarefa atualizada com sucesso')
        handleReturn()
      }else{
        window.alert('Não foi possivel atualizar a tarefa')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
    }
  }

  async function handleSearch(){
    try {
      const response = await axios.post('http://localhost:3001/search', { "description": description }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        setResult(response.data)
      }else{
        window.alert('Tarefa não encontrada')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
    }
  }

  async function handleDelete(){
    try {
      const response = await axios.delete('http://localhost:3001/delete', { "description": result.description }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        window.alert('Tarefa excluida com sucesso')
        handleReturn()
      }else{
        window.alert('Não foi possivel excluir a tarefa')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
    }
  }

  async function handleHide(){
    try {
      const response = await axios.put('http://localhost:3001/delete', { "hide": 1 }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        window.alert('Tarefa arquivada com sucesso')
      }else{
        window.alert('Não foi possivel arquivar a tarefa')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
    }
  }

  async function handleDone(){
    try {
      const response = await axios.put('http://localhost:3001/delete', { "done": 1 }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response){
        window.alert('Tarefa concluida com sucesso')
      }else{
        window.alert('Não foi possivel concluir a tarefa')
      }
    } catch (error) {
      window.alert('Houve um erro com o servidor, tente novamente')
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
          <button onClick={handleListAll}>Visualizar todas as tarefas <IoIosEye size='20' /><IoIosAlbums size='20' /></button>
          <button onClick={handleListDone}>Visualizar tarefas concluidas <IoIosEye size='20' /><IoIosCheckmark size='20' /></button>
          <button onClick={handleListHide}>Visualizar tarefas arquivadas <IoIosEye size='20' /><IoIosArchive size='20' /></button>
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
            <p>{result.description}</p>
            <p>{result.duedate.getDate()}/{result.duedate.getMonth() + 1}/{result.duedate.getFullYear()}</p>
            {result.done == 0 
              ? <button onClick={handleDone}>Concluir tarefa <IoIosCheckmark size='20' color='green'/></button>
              : <p>Tarefa concluida <IoIosCheckmark size='20' color='green'/></p>
            }
            {result.hide == 0 ?
              <button onClick={handleHide}>Arquivar tarefa <IoIosApps size='20' color='yellow'/></button>
              :
              <p>Tarefa arquivada <IoIosArchive size='20' color='yellow'/></p>
            }
            <button onClick={handleDelete}>Excluir tarefa <IoIosTrash size='20' color='red'/></button>
            
          </section>
        )}
        </section>
      )}

      {screen === 4 && (
        <section className='All'>
          <h1>Todas as tarefas</h1>
          <List list={list} />
          <button onClick={handleReturn}><IoIosArrowRoundBack size='20' color='black' /> Voltar</button>
        </section>
      )}

      {screen === 5 && (
        <section className='AllDone'>
          <h1>Todas as tarefas concluidas</h1>
          <List list={list} />
          <button onClick={handleReturn}><IoIosArrowRoundBack size='20' color='black' /> Voltar</button>
        </section>
      )}

      {screen === 6 && (
        <section className='AllHide'>
          <h1>Todas as tarefas arquivadas</h1>
          <List list={list} />
          <button onClick={handleReturn}><IoIosArrowRoundBack size='20' color='black' /> Voltar</button>
        </section>
      )}
    </div>
  );
}

export default App;
