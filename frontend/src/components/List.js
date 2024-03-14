import styles from './List.module.css'

export default function List( props ){
    return(
        <section className={styles.List}>
          {props.list.map((task)=>{
            <div className={styles.Task}>
              <h1>{task.description}</h1>
              <p>{task.duedate}</p>
              {task.done === 1 ?
                <p>Tarefa concluida</p>
                :
                <p>Tarefa não concluida</p>
              }
              {task.hide === 1 ?
                <p>Tarefa arquivada</p>
                :
                <p>Tarefa não arquivada</p>
              }
            </div>
          })}
        </section>
    )
}