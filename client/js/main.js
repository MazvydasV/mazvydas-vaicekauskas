const todoList = document.querySelector('.js-todo-list');
const formAddTodo = document.querySelector('.js-add-todo-form');

formAddTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoListValue = formAddTodo[0].value;

  todoList.innerHTML += `
  <div class="todo-list__item">
    <div class="checkbox"></div>
    <div class="todo-list__item__text">${todoListValue}</div> 
    <button class="button">✖</button>
  </div>`;
});

  const todoList2 = document.querySelector('.js-todo-list-2');

  const displayItems2 = (items) => items.forEach(({ completed, title }) => {
    todoList2.innerHTML += `
    <div class="todo-list__item">
    <div class="checkbox${completed ? ' checked' : ''}"></div>
    <div class="todo-list__item__text">${title}</div>
    <button class="button-2"><span class="iconify" data-icon="vs:chicken" style="color: green;" data-width="20" data-height="20"></span></button>
  </div>`;
  });

  fetch('https://jsonplaceholder.typicode.com/todos?userId=5')
  .then(response => response.json())
  .then(displayItems2);
