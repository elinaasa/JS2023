// array for todo list
("use strict");

const todoList = [
  {
    id: 1,
    task: "Learn HTML",
    completed: true,
  },
  {
    id: 2,
    task: "Learn CSS",
    completed: true,
  },
  {
    id: 3,
    task: "Learn JS",
    completed: false,
  },
  {
    id: 4,
    task: "Learn TypeScript",
    completed: false,
  },
  {
    id: 5,
    task: "Learn React",
    completed: false,
  },
];

const ul = document.querySelector("ul");

for (const todo of todoList) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const button = document.createElement("button");

  input.type = "checkbox";
  input.id = "todo-" + todo.id;
  input.checked = todo.completed;

  input.addEventListener("change", function (evt) {
    todo.completed = input.checked;
    console.log(todoList);
  });

  label.htmlFor = "todo-" + todo.id;
  label.innerText = todo.task;

  button.innerHTML = "&#x2A09;";

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button);
  ul.appendChild(li);
}
