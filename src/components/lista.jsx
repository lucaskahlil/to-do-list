import { useState, useEffect } from "react";

function ListaCompleta() {
    const baseURL = 'http://localhost:8000/Tarefas';

    const [ Tarefas, setTarefas ] = useState([])

    const [novaTarefa, setnovaTarefa ] = useState({
        descricao: ""
    })


    async function create(Lista) {
        const response = await fetch(baseURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(Lista),
    })
    const novaTarefa = await response.json()
    setTarefas([novaTarefa])
    }

    const CreateTarefa = (event) => {
        setnovaTarefa({...novaTarefa, [event.target.name]: event.target.value})
    }
    const handleCreateTarefa = () => {
        const tarefa_a_ser_criado = {...novaTarefa};
        create(tarefa_a_ser_criado)
        setnovaTarefa({
            descricao: ""
        })
    }
    console.log(novaTarefa)

    async function readAllTarefas(){
        const response = await fetch(baseURL)
        const todos = await response.json()
        setTarefas(todos)
    }

    useEffect(() => {
        readAllTarefas()
    }, [])

    function deleteItem(index){
        let tempArray=[...Tarefas]
        tempArray.splice(index,1);
  
        setTarefas(tempArray);
      }

      async function findOneTarefa(id){
        const response = await fetch(`${baseURL}/${id}`)
        const Tarefas = await response.json() 
        setTarefas([Tarefas])
    }

    return (
        <div>
            <div className="button-label-input">
                <label
                htmlFor="criar_todo"
                className="button-label">
                    Adicionar nova tarefa
                </label>
            <input
            type="text"
            className="button-input"
            id="criar_todo"
            onChange={CreateTarefa}
            name="text"
            value={novaTarefa.descricao}
            />
            </div>
            <button
            type="button"
            className="button-button"
            onClick={handleCreateTarefa}>
                Adicionar novo todo
            </button>
            <div>
                <label
                htmlFor="criar_todo"
                className="button-label">
                    Adicionar nova tarefa
                </label>
            <input
            type="text"
            className="button-input"
            id="criar_todo"
            onChange={findOneTarefa}
            name="text"
            value={Tarefas.id}
            />
            <button
            type="button"
            className="button-button"
            onClick={findOneTarefa}>
                Procurar por ID
            </button>
            </div>

            <div>
            {Tarefas.map((tarefas, index) => (
                <div key={index} className="readAllTarefas">
                    <span>{tarefas.descricao}</span>
                    <button onClick={deleteItem}>Deletar</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ListaCompleta