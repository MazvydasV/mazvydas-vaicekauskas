import FormComponent from "./components/form-component.js";
import todoValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const todoList = document.querySelector('.js-todo-list'); 
// const updateFormModal = new bootstrap.Modal('#update-form-modal');
const updateTitleField = document.querySelector('#update-title-input');
const updateCompletedField = document.querySelector('#update-completed-input');
const btnUpdateTodo = document.querySelector('#btn-update-todo');
let editableTodoId = null;
let editableTodoItemText = null;
let editableCheckbox = null;

const updateTodo = async () => {
  const { title, completed } = await ApiService.updateTodo({
    id: editableTodoId,
    title: updateTitleField.value,
    completed: updateCompletedField.checked,
  });

  editableTodoItemText.innerText = title;
  editableCheckbox.classList.remove('checked');
  if (completed) editableCheckbox.classList.add('checked');

  editableTodoId = null;
  editableTodoItemText = null;
  editableCheckbox = null;
}

const displayTodoItem = ({
  completed,
  title,
  id,
}) => {
  const todoItem = document.createElement('div'); 
  todoItem.className = 'todo-list__item'; 

  const checkbox = document.createElement('div');  
  checkbox.className = 'checkbox';  
  if (completed) checkbox.classList.add('checked'); 
  checkbox.addEventListener('click', async () => {
    await ApiService.updateTodo({
      id,
      completed: !checkbox.classList.contains('checked')
    });

    checkbox.classList.toggle('checked');
  });

  const todoItemText = document.createElement('div'); 
  todoItemText.className = 'todo-list__item__text'; 
  todoItemText.innerText = title; 

  const btnDelete = document.createElement('button'); 
  btnDelete.className = 'button'; 
  btnDelete.innerText = '✖'; 
  btnDelete.addEventListener('click', async () => {
    await ApiService.deleteTodo(id);
    todoItem.remove();
  });

  todoItem.append(  
    checkbox,       
    todoItemText,   
    btnDelete       
  );                
  
  todoList.insertAdjacentElement('afterBegin', todoItem);
}

const formAddTodo = new FormComponent(
  '.js-add-todo-form', 
  todoValidator, 
  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  },
);

const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);

