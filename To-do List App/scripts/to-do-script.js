let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
  });

renderTodoList();

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
      <div class="todo-name">&#183 ${name}</div>
      <div class="todo-date">${dueDate}</div>
      <button class="delete-button js-delete-button">X</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-grid')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
      renderTodoList();
      localStorage.setItem('todoList', JSON.stringify(todoList));
      });
    });
}

function addTodo() {
  const inputElement = document.querySelector('.js-todo-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-todo-input-date');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();

  localStorage.setItem('todoList', JSON.stringify(todoList));
}