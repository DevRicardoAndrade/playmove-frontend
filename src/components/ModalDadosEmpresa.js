import { useState } from "react";
import Botao from "./Botao";
import styles from './ModalDadosEmpresa.module.css'
import axios from 'axios';
  
  function ModalDadosFornecedor ({ onClose = () => {} , dataEdit = []}) {
    
   


   
    //Funcao para salvar os dados
    function salvar(e) {
        e.preventDefault();
            if(id>0){
                axios.put('https://localhost:7236/Empresas/'+id, 
            {
               id:id,
               nome_Fatansia: nome,
               cnpj : cnpj,
               uf:uf
              }
          )
          .then(function (response) {
            setId(response.data.id);
            console.log('Atualizando');
          })
          .catch(function (error) {
            console.log(error);
          });
            }
            else{
            axios.post('https://localhost:7236/Empresas', 
            {
               nome_Fatansia: nome,
               cnpj : cnpj,
               uf:uf
              }
          )
          .then(function (response) {
            setId(response.data.id);
            console.log('Inserindo');
          })
          .catch(function (error) {
            console.log(error);
          });
            }
        
          
    }

    //declarando usestates para alteracao de valores 
    const [id, setId] = useState(dataEdit.id || 0);
    const [nome, setNome] = useState(dataEdit.nome_Fatansia || "");
    const [cnpj, setCnpj] = useState(dataEdit.cnpj || "");
    const [uf, setUf] = useState(dataEdit.uf || "");
        return (
            <div id="dados-empresa" className={styles.modal_background}>
                
                <div className={styles.modal}>
                <Botao customClass="red" type="buttom" texto="X" click={onClose}/>
                    <div className={styles.modal_content}>
                    
                        <div className={styles.modal_header}>
                            <h1>Dados Empresa</h1>
                        </div>
                        <div className={styles.modal_body}>
                            <form onSubmit={salvar}>
                            <div className={styles.form_group}>
                                <label>Id</label>
                                <input readOnly onChange={(e)=>{setId(e.target.value)}} value={id} className={styles.text} />
                            </div>
                            <div className={styles.form_group}>
                                <label>Nome</label>
                                <input value={nome} type="text" className={styles.text} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div className={styles.form_group}>
                                <label>CNPJ</label>
                                <input value={cnpj} type="text" className={styles.text} onChange={(e) => setCnpj(e.target.value)}/>
                            </div>
                            <div className={styles.form_group}>
                                <label>UF</label>
                                <input value={uf} type="text" className={styles.text} onChange={(e) => setUf(e.target.value)}/>
                            </div>
                            <Botao type="submit" customClass="blue" texto="Salvar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
      );
    
    };
  
  export default ModalDadosFornecedor;