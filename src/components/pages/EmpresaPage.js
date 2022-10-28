import { useEffect, useState } from 'react';
import Container from '../layout/Container';
import DataGrid from '../DataGrid';
import styles from './EmpresaPage.module.css';
import Botao from '../Botao'
import axios from 'axios';
import ModalDadosEmpresa from '../ModalDadosEmpresa';


function EmpresaPage(){

    const deleteEmpresa = () =>{
        axios.delete('https://localhost:7236/Empresas/'+ id)
        .then(response => {
            console.log('Excluindo');
            getEmpresas();
        });
    };

    const [id, setId] = useState();

    //Declarando usestate para abrir e fehcar modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    //Declarando usestate para capturar fornecedores
    const [dataEdit, setDataEdit] = useState();
    function getEmpresa(){
        axios.get('https://localhost:7236/Empresas/' +id)
        .then(response => {
            setDataEdit(response.data);
            setIsModalVisible(true);
        })
        .catch(err => console.log(err));
    };


    useEffect(() => {
        axios('https://localhost:7236/Empresas')
        .then(response => {
            setDataTable(response.data);
        })
        .catch(err => console.log(err));
        }, []);

     //Declarando usestate para listar Empresas
    const [dataTable, setDataTable] = useState([]);
    //Consumindo api feita em .net
    useEffect(()=>{
        axios('https://localhost:7236/Empresas').then(response => {
            setDataTable(response.data);
        })
        .catch(err => console.log(err))
    }, []);
    function getEmpresas(){
            axios.get('https://localhost:7236/Empresas')
            .then(response => {
                setDataTable(response.data);
            })
            .catch(err => console.log(err));
    }

    //declarando colunas para preencher o cabeçalho do datagrid
    const column = [
        {heading:'Id', value:'id'},
        {heading:'Nome', value:'nome_Fatansia'},
        {heading: 'CPF', value:'cnpj'},
        {heading:'Data Cadastro', value:'uf'},
    ];


    return(
        <>
        <p>ID Selecionado: {id}</p>
         {
         //valida se o modal é para aparecer ou nao <DataGrid datatable={dataTable} column={column}/>
         isModalVisible ? (
          <ModalDadosEmpresa dataEdit={dataEdit} onClose={() => {setIsModalVisible(false); getEmpresas()}} />
        ) : null}
        <Container customClass="column">
            <h1 className={styles.titulo}>Empresas</h1>
            <Botao tipo="button" texto="Adicionar" click={() =>   {setIsModalVisible(true)}} />
            <DataGrid datatable={dataTable} column={column} excluir={true} editar={true} onClickEditar={() => {getEmpresa(); }} onCliExcluir={deleteEmpresa} setId={setId}/>
        </Container>
        
        </>        
    );
}

export default EmpresaPage;