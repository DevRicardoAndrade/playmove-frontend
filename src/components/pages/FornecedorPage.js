import { useEffect, useState } from 'react';
import Container from '../layout/Container';
import DataGrid from '../DataGrid';
import styles from './FornecedorPage.module.css';
import Botao from '../Botao'
import axios from 'axios';
import ModalDadosFornecedor from '../ModalDadosFornecedor';


function FornecedorPage(){

    const deleteFornecedor = () =>{
        axios.delete('https://localhost:7236/Fornecedores/'+ id)
        .then(response => {
            console.log('Excluindo');
            getFornecedores();
        });
    };

    const [id, setId] = useState();

    //Declarando usestate para abrir e fehcar modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    //Declarando usestate para capturar fornecedores
    const [dataEdit, setDataEdit] = useState();
    function getFornecedor(){
        console.log(id)
        axios.get('https://localhost:7236/Fornecedores/' +id)
        .then(response => {
            setDataEdit(response.data);
            setIsModalVisible(true);
        })
        .catch(err => console.log(err));
    };


    useEffect(() => {
        axios('https://localhost:7236/Fornecedores')
        .then(response => {
            setDataTable(response.data);
        })
        .catch(err => console.log(err));
        }, []);

     //Declarando usestate para listar fornecedores
    const [dataTable, setDataTable] = useState([]);
    //Consumindo api feita em .net
    useEffect(()=>{
        axios('https://localhost:7236/Fornecedores').then(response => {
            setDataTable(response.data);
        })
        .catch(err => console.log(err))
    }, []);
    function getFornecedores(){
            axios.get('https://localhost:7236/Fornecedores')
            .then(response => {
                setDataTable(response.data);
            })
            .catch(err => console.log(err));
    }

    //declarando colunas para preencher o cabeçalho do datagrid
    const column = [
        {heading:'Id', value:'id'},
        {heading:'Nome', value:'nome'},
        {heading: 'CPF', value:'cpf'},
        {heading:'Data Cadastro', value:'data_Hora_Cadatro'},
        {heading:'Empresa', value:'empresaId'}
    ];


    return(
        <>
        <p>ID Selecionado: {id}</p>
         {
         //valida se o modal é para aparecer ou nao <DataGrid datatable={dataTable} column={column}/>
         isModalVisible ? (
          <ModalDadosFornecedor dataEdit={dataEdit} onClose={() => {setIsModalVisible(false); getFornecedores()}} />
        ) : null}
        <Container customClass="column">
            <h1 className={styles.titulo}>Fornecedores</h1>
            <Botao tipo="button" texto="Adicionar" click={() =>   {setIsModalVisible(true)}} />
            <DataGrid datatable={dataTable} column={column} excluir={true} editar={true} onClickEditar={() => {getFornecedor(); }} onCliExcluir={deleteFornecedor} setId={setId}/>
        </Container>
        
        </>        
    );
}

export default FornecedorPage;