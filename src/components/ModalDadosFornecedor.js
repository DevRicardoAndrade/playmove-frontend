import { useEffect, useState } from "react";
import Botao from "./Botao";
import styles from './ModalDadosFornecedor.module.css'
import axios from 'axios';
  
  function ModalDadosFornecedor ({ onClose = () => {} , dataEdit = []}) {
    
    function getTelefones(){
        axios('https://localhost:7236/Fornecedor/Telefone/'+id).then(response => {
            setTelefones(response.data);
            console.log('Buscando telefones'); 
        })
        .catch(error => {console.log(error);})
    }

    function salvarTelefone(){
        axios.post('https://localhost:7236/FornecedoresTelefones',{
            fornecedorId : id,
            telefone:telefoneAdd
        })
        .then(function (response){
            console.log('Salvando Telefone');
            getTelefones();
        }).catch(function (error){
            console.log(error);
        })
    }

    function removerTelefone(){
        axios.delete('https://localhost:7236/FornecedoresTelefones/'+telefoneRemove)
        .then(function (response){
            console.log('Deletando Telefone');
            getTelefones();
        }).catch(function (error){
            console.log(error);
        })
    }
    const [empresaSelecao, setEmpresaSelecao] = useState();
    function getEmpresaSelecao(){
        axios.get('https://localhost:7236/Empresas/'+empresa)
        .then(response => setEmpresaSelecao(response.data))
        .catch(error => console.log(error));
    }
    //Funcao para salvar os dados
    function salvar(e) {
        e.preventDefault();
       getEmpresaSelecao();
        if(empresaSelecao.uf === 'SC'){
            const dataNascimento = new Date(nascimento)
            const now = new Date();
            console.log(now.getFullYear() - dataNascimento.getFullYear())
            if((now.getFullYear() - dataNascimento.getFullYear()) <18 ){
                alert('Voce é de menor');
                return;
            }
        } 
            if(id>0){
                axios.put('https://localhost:7236/Fornecedores/'+id, 
            {
                id: id,
                nome: nome,
                cnpj: cnpj,
                cpf: cpf,
                empresaId: empresa,
                nascimento : nascimento,
                rg:rg,
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
            axios.post('https://localhost:7236/Fornecedores', 
            {
                nome: nome,
                cnpj: cnpj,
                cpf: cpf,
                empresaId: empresa,
                nascimento : nascimento,
                rg:rg,
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
    //declare use state para alimentar o select de fornecedores
    const [dataTable, setDataTable] = useState([]);
    //consome a api feita em .net
    useEffect(()=>{
        axios('https://localhost:7236/Empresas').then(response => {
            setDataTable(response.data);
            console.log('Buscando empresas');
        })
        .catch(err => console.log(err))
    }, []);

    function adicionazero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }


    //declarando usestates para alteracao de valores 
    const [telefoneRemove, setTelefoneRemove] = useState(0);
    const [id, setId] = useState(dataEdit.id || 0);
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [cnpj, setCnpj] = useState(dataEdit.cnpj || "");
    const [cpf, setCpf] = useState(dataEdit.cpf || "");
    const [nascimento, setNascimento] = useState(dataEdit.nascimento || "");
    const [empresa, setEmpresa] = useState(dataEdit.empresaId || 0);
    const [telefones, setTelefones] = useState(dataEdit.telefones || []);
    const [telefoneAdd, setTelefoneAdd] = useState('');
    const [rg, setRg] = useState(dataEdit.rg ||"");
        return (
            <div id="dados-fornecedor" className={styles.modal_background}>
                
                <div className={styles.modal}>
                <Botao customClass="red" type="buttom" texto="X" click={onClose}/>
                    <div className={styles.modal_content}>
                    
                        <div className={styles.modal_header}>
                            <h1>Dados Fornecedor</h1>
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
                                <label>CPF</label>
                                <input value={cpf} type="text" className={styles.text} onChange={(e) => setCpf(e.target.value)}/>
                            </div>
                            {(cpf) &&
                            <div className={styles.form_group}>
                                <label>Data Nascimento</label>
                                <input type="date" className={styles.text} onChange={(e) => {
                                    setNascimento(e.target.valueAsDate.getFullYear() + "-" + adicionazero(e.target.valueAsDate.getMonth()) + "-" + adicionazero(e.target.valueAsDate.getDay()))
                                    }}/>
                            </div>
                            }
                            {(cpf) &&
                            <div className={styles.form_group}>
                                <label>RG</label>
                                <input value={rg} type="text" className={styles.text} onChange={(e) => setRg(e.target.value)}/>
                            </div>
                            }
                            <div className={styles.form_group}>
                                <label>Empresa</label>
                                <select className={styles.select} onChange={(e) =>{
                                    setEmpresa(e.target.value)
                                }}>
                                    <option value="0">Selecione...</option>
                                    { 
                                    //Loop para alimentar os options conforme o retorno do request na API
                                    dataTable.map((item, index) => <option key={index} value={item.id}>{item.nome_Fatansia}</option>)}
                                </select>
                            </div>
                            <div className={styles.form_group}>
                                <label>Telefones</label>
                                <input type="tel" className={styles.text} onChange={
                                    (e)=>{setTelefoneAdd(e.target.value)}
                                } />
                                {id > 0 &&
                                <p className={styles.btn} onClick={
                                    (e)=>{
                                        salvarTelefone();
                                    }
                                }>Add</p>
                                }
                                <select name="telefones" size="5" multiple onChange={(e)=>{
                                    setTelefoneRemove(e.target.value);
                                    }}> 
                                {telefones.map((element, index) => <option key={index} value={element.id}>{element.telefone}</option>)}
                                </select>  
                                {id > 0 &&
                                <p className={styles.btn_red} onClick={
                                    (e)=>{
                                        removerTelefone();
                                    }
                                }>Remove</p>
                                }
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