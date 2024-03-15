import styles from './OneField.module.css'
import { IoIosClose } from 'react-icons/io'

export default function OneField( props ){
    return(
        <section className={ styles.OneField }>
            <input type={ props.type } placeholder={ props.placeholder } onChange={(e) => { props.state(e.target.value) }}/>
            <button onClick={ props.action }>{ props.children }</button>
            <button onClick={ props.return }><IoIosClose size='40' color='white' /></button>
        </section>
    )
}