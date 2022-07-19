import { useState, useEffect } from "react";
import { billApi } from "../utils/api/bill.api";

function ListaCompleta() {

    const [ Tarefas, setTarefas ] = useState([]);
    const [ Tarefa, setTarefa] = useState();

    async function getTarefas() {
        const allTarefas = await billApi.getAllTarefas();
        setTarefas(allTarefas);
      }

      async function handleSubmit(event) {
        event.preventDefault();
        const bill = await billApi.createTarefa({descricao:event.target.tarefa.value})
        setTarefas([...Tarefas, bill])
      }
    
      useEffect(() => {
        getTarefas()
    }, [])

    async function findById(event) {
        event.preventDefault();
        const billById = await billApi.getBillById(event.target.ID.value);
        setTarefa(billById);
      }
      console.log(Tarefa)
    
    async function deleteById (id) {
        await billApi.deleteById(id)
    }  

     function deleteItem(event) {
        console.log(event.target.id)
        deleteById(event.target.id)
        window.location.reload(true)
    }

    return (
        <div className="home-container">
            <div className="geral">
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
                    {Tarefa && Tarefa.descricao? <div className="readAllTarefas">
                    <span>{Tarefa.descricao}</span>
                        <div container-botoes>
                            <button >Editar</button>
                            <button >Deletar</button>
                        </div>
                    </div>: Tarefas.map((tarefas, index) => (
                    <div key={index} className="readAllTarefas">
                        <span>{tarefas.descricao}</span>
                        <div container-botoes>
                        <button >Editar</button>
                        <button onClick={deleteItem} id={tarefas.id}>Deletar</button>
                        </div>
                    </div>
                    ))}
            </div>
            </div>
        </div>
    )
}

export default ListaCompleta