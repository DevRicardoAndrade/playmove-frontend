import styles from './Botao.module.css'
function Botao(props){
    return(
        <>
            <button className={`${styles.btn} ${styles[props.customClass]}`} type={props.tipo} onClick={props.click}>{props.texto}</button>
        </>
    );
}

export default Botao;