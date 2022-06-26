
const fetchTodos = async () => {
  const response = await fetch('http://localhost:1337/todos'); 
  const todos = await response.json();

  return todos;
};

const createTodo = async ({ title }) => {
  const response = await fetch(
    'http://localhost:1337/todos',
    
    {
      method: 'POST', 
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        title,
        completed: false
      })
    }
  );

  const reponseData = await response.json();

  return reponseData;
};

const updateTodo = async ({ id, ...props }) => {
  const response = await fetch(
    `http://localhost:1337/todos/${id}`,
    {
      method: 'PATCH', 
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(props)
    }
  );

  const reponseData = await response.json();

  return reponseData;
}

const deleteTodo = async (id) => {
  await fetch(`http://localhost:1337/todos/${id}`, { method: 'DELETE' });
};

const ApiService = {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default ApiService;