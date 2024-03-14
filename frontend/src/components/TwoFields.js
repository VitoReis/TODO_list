import styles from './TwoFields.module.css'
import { IoIosClose } from 'react-icons/io'

export default function TwoFields( props ) {
    return (
        <section className={ styles.TwoFields }>
            <input type={ props.type } placeholder={ props.placeholder } onChange={(e) => { props.state(e.target.value) }}/>
            <input type={ props.type2 } placeholder={ props.placeholder2 } onChange={(e) => { props.state2(e.target.value) }}/>
            <div>
                <button onClick={ props.action }>{ props.children }</button>
                <button onClick={ props.return }><IoIosClose size='40' color='white' /></button>
            </div>
        </section>
    )
}