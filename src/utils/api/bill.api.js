const defaultUrl = 'http://localhost:8000/Tarefas';

const parseResponse = (response)  => response.json()

export const billApi = {
    getAllTarefas: async () => {
      const req = await fetch(defaultUrl);
      const result = await req.json();
      return result;
    },
    createTarefa: async (bill) => {
      const req = await fetch(defaultUrl, {
        method: "POST",
        body: JSON.stringify(bill),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const result = await req.json();
      return result;
    },
    getBillById: async (id) => {
      const req = await fetch(`${defaultUrl}/${id}`);
      const result = await req.json();
      return result;
    },
    deleteById: (id) => fetch(`${defaultUrl}/${id}`, {method: "DELETE"}).then(parseResponse)
  };
  
  
  