import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
    return(
        <section className={ styles.ErrorPage }>
            <h1>Erro</h1>
            <p>Pagina não encontrada, tente novamente</p>
        </section>
    )
}