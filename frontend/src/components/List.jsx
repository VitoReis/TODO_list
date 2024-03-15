import styles from './List.module.css'
import { IoIosCheckmarkCircleOutline, IoIosRadioButtonOff, IoIosQrScanner, IoIosArchive } from 'react-icons/io'

export default function List( props ){
    return(
        <section className={styles.List}>
          {props.list.map((task)=>{
            return(
              <div className={styles.Task}>
                <h1>{task.description}</h1>
                <p>{new Date(task.duedate).getDate() + 1}/{new Date(task.duedate).getMonth() + 1}/{new Date(task.duedate).getFullYear()}</p>
                {task.done == 0 ?
                  <p>Não concluida <IoIosRadioButtonOff size='15' color='white'/></p>
                  :
                  <p>Concluida <IoIosCheckmarkCircleOutline size='15' color='white'/></p>
                }
                {task.hide == 0 ?
                  <p>Não arquivada <IoIosQrScanner size='15' color='white'/></p>
                  :
                  <p>Arquivada <IoIosArchive size='15' color='white'/></p>
                }
              </div>
            )
          })}
        </section>
    )
}