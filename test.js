import { convertDateFormat, generateId, getDate } from "./utils";

// initial data
const todos = [
  {
    id: generateId(),
    text: "And I'd like to take a minute just sit right there",
    is_done: true,
    is_important: false,
    due_date: null,
  },
  {
    id: generateId(),
    text: "I'll tell you how I became the prince of a town called Bel-Air",
    is_done: false,
    is_important: false,
    due_date: null,
  },
  {
    id: generateId(),
    text: "Now this is a story all about how, my life got flipped-turned upside down",
    is_done: false,
    is_important: false,
    due_date: new Date(),
  },
  {
    id: generateId(),
    text: "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia",
    is_done: true,
    is_important: false,
    due_date: null,
  },
  {
    id: generateId(),
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    is_done: false,
    is_important: true,
    due_date: null,
  },
];

const todoList = document.getElementById("todo-list");
const addTodoForm = document.getElementById("addTodoForm");
const todoTextInput = document.getElementById("todo-text-input");
const todoDueDateInput = document.getElementById("todo-due-date-input");
const todoIdInput = document.getElementById("todo-id-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const editTodoBtn = document.getElementById("edit-todo-btn");
const sidebar = document.getElementById("sidebar");

let filter = "today";

// render todos {read}
function renderTodolist() {
  console.log(todos);

  const filtered_todos = todos.filter((todo) => {
    if (filter == "all") {
      return true;
    } else if (filter == "today") {
      const current_date = getDate(new Date());
      const todo_due_date = getDate(todo.due_date);

      return current_date === todo_due_date;
    } else if (filter == "planned") {
      return todo.due_date;
    } else if (filter == "important") {
      return todo.is_important;
    } else if (filter == "completed") {
      return todo.is_done;
    }
  });

  console.log("filtered_todos", filtered_todos);

  let todo_list = "";
  filtered_todos.forEach(function (todo, index, array) {
    todo_list += `<li data-id=${
      todo.id
    } class="bg-gray-50 min-h-[50px] flex items-center py-2 gap-3 px-3.5 rounded shadow group">
                    <input type="checkbox" id="todo-checkbox-${index}" ${
      todo.is_done ? "checked" : ""
    } class="todo-checkbox flex-none" />
                    <div class="w-full">
                      <div class="mb-2">
                        <label for="todo-checkbox-${index}" class="${
      todo.is_done ? "line-through text-gray-600" : ""
    } grow select-none">
                          ${todo.text}
                        </label>
                      </div>
                      <div>
                      ${
                        todo.due_date
                          ? `<span class="bg-pink-400 px-2 py-0.5 rounded-md">${todo.due_date?.toLocaleString()}</span>`
                          : ""
                      }
                      </div>
                    </div>

                    <!-- actions -->
                    <div class="flex-none hidden group-hover:flex items-center justify-center gap-2">
                      <!-- edit button -->
                      <button type="button" class="todo-important-btn text-sm p-1.5">
                        ${
                          todo.is_important
                            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                        </svg>`
                            : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>`
                        }

                      </button>

                      <!-- edit button -->
                      <button type="button" class="todo-edit-btn hover:bg-yellow-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>
                      
                      <!-- delete button -->
                      <button type="button" class="todo-delete-btn hover:bg-red-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                </li>`;
  });
  todoList.innerHTML = todo_list;
}

// add new todo || edit todo {create | edit}
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todo_id = todoIdInput.value;
  const todo_text = todoTextInput.value;
  const todo_due_date = todoDueDateInput.value;
  const due_date = new Date(todo_due_date);

  console.log(todo_due_date);

  if (todo_id) {
    const todo = todos.find((todo) => todo.id === todo_id);
    // edit
    todo.text = todo_text;
    if (due_date) {
      todo.due_date = due_date;
    }
  } else {
    // create
    todos.push({
      id: generateId(),
      text: todo_text,
      is_done: false,
      due_date: due_date,
      is_important: filter === "important" ? true : false,
    });
  }

  renderTodolist();

  // form goes on create state
  todoIdInput.value = "";
  todoTextInput.value = "";
  todoDueDateInput.value = "";

  toggleSubmitBtns(false);
});

todoList.addEventListener("click", function (event) {
  // console.log(event.target);

  // 1. event.target.matches()
  // 2. event.target.querySelector()

  // select only input[checkbox] with "todo-li" class
  if (event.target.matches(`input.todo-checkbox[type="checkbox"]`)) {
    const todo_id = event.target.closest("li").dataset.id;
    const todo = todos.find((todo) => todo.id === todo_id);

    todo.is_done = event.target.checked;

    renderTodolist();
  }

  // edit
  if (event.target.matches(`button.todo-edit-btn[type="button"]`)) {
    const todo_id = event.target.closest("li").dataset.id;
    const todo = todos.find((todo) => todo.id === todo_id);

    todoTextInput.value = todo.text;
    todoIdInput.value = todo_id;

    if (todo.due_date) {
      const converted_local_due_date = convertDateFormat(todo.due_date);
      todoDueDateInput.value = converted_local_due_date;
    }

    toggleSubmitBtns(true);
  }

  // delete
  if (event.target.matches(`button.todo-delete-btn[type="button"]`)) {
    const todo_id = event.target.closest("li").dataset.id;
    const index = todos.findIndex((todo) => todo.id === todo_id);

    todos.splice(index, 1);

    renderTodolist();
  }

  // mark important
  if (event.target.matches(`button.todo-important-btn[type="button"]`)) {
    const todo_id = event.target.closest("li").dataset.id;
    const todo = todos.find((todo) => todo.id === todo_id);

    todo.is_important = !todo.is_important;

    renderTodolist();
  }
});

function toggleSubmitBtns(edit = false) {
  if (edit) {
    addTodoBtn.classList.replace("inline-flex", "hidden");
    editTodoBtn.classList.replace("hidden", "inline-flex");
  } else {
    addTodoBtn.classList.replace("hidden", "inline-flex");
    editTodoBtn.classList.replace("inline-flex", "hidden");
  }
}

sidebar.addEventListener("click", function (event) {
  // listen only for "sidebar-item" attributes
  if (event.target.matches("[sidebar-item]")) {
    // console.log(event.target);

    const target = event.target; // select li [sidebar-item]

    // remove "active" class from others sidebar-item
    document
      .querySelectorAll("[sidebar-item]")
      .forEach((el) => el.classList.remove("active"));

    // add "active" class to sidebar-item clicked..
    target.classList.add("active");

    // console.log(event.target.dataset.filter);

    // set filter
    filter = target.dataset.filter;
    // re-render to-do list
    renderTodolist();
  }
});

// initial render
renderTodolist();

document.querySelectorAll("[sidebar-item]").forEach((el) => {
  if (el.dataset.filter === filter) {
    el.classList.add("active");
  }
});
