import { useState, useEffect } from "react";
import { billApi } from "../utils/api/bill.api";

function ListaCompleta() {

    const [ Tarefas, setTarefas ] = useState([]);
    const [ Tarefa, setTarefa] = useState();

    async function getBills() {
        const allBills = await billApi.getAllBills();
        setTarefas(allBills);
      }

      async function handleSubmit(event) {
        event.preventDefault();
        const bill = await billApi.createBill({descricao:event.target.tarefa.value})
        setTarefas([...Tarefas, bill])
      }
    
      useEffect(() => {
        getBills()
    }, [])

    async function findById(event) {
        event.preventDefault();
        const billById = await billApi.getBillById(event.target.ID.value);
        setTarefa(billById);
      }
      console.log(Tarefa)

    return (
        <div className="home-container">
        <div className="adicionar-container">
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="tarefa" placeholder="Digite o nome da tarefa"></input>
                <button type="submit">Adicionar Tarefa</button>
            </form>
        </div>
        
            
            <div className="pesquisa-container">
            <form onSubmit={findById}>
            <input placeholder="Digite o ID" name="ID"></input>
            <button type="submit">Pesquisar</button>  
            </form>
            </div>

            <div className="map-container"> 
            {Tarefa && Tarefa.descricao? <div>
                <span>{Tarefa.descricao}</span>
                </div>: Tarefas.map((tarefas, index) => (
                <div key={index} className="readAllTarefas">
                    <span>{tarefas.descricao}</span>
                </div>
            ))}
            </div>
        </div>
    )


}

export default ListaCompleta