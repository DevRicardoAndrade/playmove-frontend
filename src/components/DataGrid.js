
import Botao from './Botao';
import styles from './DataGrid.module.css';
let _editar = false;
let _excluir = false;
let Editar = ()=>{};
let Excluir = ()=>{};
let SetId = ()=>{};
function DataGrid({datatable, column, editar, onClickEditar, excluir, onCliExcluir, setId}){
    _editar = editar;
    _excluir = excluir;
    Editar = onClickEditar;
    Excluir = onCliExcluir;
    SetId = setId;
    return(
            <table>
                <thead>
                <tr>
                {column.map((item,index) => <ThItem key={index} item={item}/>)}
                {(editar) &&
                <ThItem item={{value : "editar", heading: "Editar"}}/>}
                {(excluir) &&
                <ThItem item={{value : "excluir", heading: "Excluir"}}/>}
                </tr>
                </thead>
                <tbody>
                {datatable.map((item, index) => <TrItem key={index} item={item} column={column}/>)}
                </tbody>
            </table>
    );
}
const ThItem = ({item}) => <th>{item.heading}</th>
const TrItem = ({item, column}) =>{
    return(<tr id={item['id']} onClick={(e) => SetId(e.currentTarget.id)}>
        {column.map((columnItem, index) =>{
            
             return(<td key={index}>{item[`${columnItem.value}`]}</td>)
        })}
        {(_editar) &&
        <td>
                <Botao customClass="blue" texto="Editar" click={Editar}/>
        </td>}
                {(_excluir) &&
                <td>
                <Botao customClass="red" texto="Excluir" click={Excluir}/>
                </td>}
    </tr>)
}

export default DataGrid;