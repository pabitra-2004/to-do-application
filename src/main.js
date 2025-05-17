import { generateId, convertDateFormat, showFormatDate } from "./id_and_datetime.js";


// todolist all li item
const todoList = document.getElementById("todo-list");
const addTaskForm = document.getElementById("addTaskForm");
const addNewTaskBtn = document.getElementById('addNewTaskBtn');

// todo input field
const todoIdInput = document.getElementById("todo-id-input");
const todoTextInput = document.getElementById("todo-task-name");
const todoDescription = document.getElementById("todoDescription");
const todoListType = document.getElementById("todoListType");
const dueDate = document.getElementById("dueDate");

//* Todo form show and hide section start
const saveChangesBtn = document.getElementById('saveChangesBtn');
const addTodoItemBtn = document.getElementById('addTodoItemBtn');

const taskListContainer = document.getElementById('taskListContainer');
const closeTaskBtn = document.getElementById('closeTaskBtn');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');

const sidebarMenuList = document.getElementById("sidebarMenuList"); // sidebar li menu list
const sidebarClickedTaskName = document.getElementById("sidebarClickedTaskName"); // sidebar clicked li item name
// const tasks = document.querySelectorAll('#tasksAndLists ul li');




// !^ Sidebar section Start
const activeClasses = ['bg-gray-200', 'text-xs', 'font-semibold', 'text-gray-700', 'rounded-md', 'shadow-sm', 'ease-in-out', 'duration-400'];
// tasks.forEach((li) => {
//     li.addEventListener('mouseover', () => {
//         if (!li.classList.contains('active')) {
//             li.classList.add(...activeClasses);
//         }
//     });

//     li.addEventListener('mouseout', () => {
//         if (!li.classList.contains('active')) {
//             li.classList.remove(...activeClasses);
//         }
//     });

//     li.addEventListener('click', () => {
//         tasks.forEach(item => {
//             item.classList.remove('active', ...activeClasses);
//         });
//         li.classList.add('active', ...activeClasses);
//         sidebarClickedTaskName.textContent = `${li.textContent}`;
//     });
// });

['click', 'mouseover', 'mouseout'].forEach(eventType => {
    sidebarMenuList.addEventListener(eventType, clickSidebarEvent);
});
function clickSidebarEvent(event) {
    const target = event.target.closest('[sidebar-item]');
    if (target) {
        if (event.type === 'mouseover' && !target.classList.contains('active')) {
            target.classList.add(...activeClasses);
        }

        if (event.type === 'mouseout' && !target.classList.contains('active')) {
            target.classList.remove(...activeClasses);
        }

        if (event.type === 'click') {

            document.querySelectorAll('[sidebar-item]').forEach(el =>
                el.classList.remove('active', ...activeClasses)         //* Remove 'active' class from all sidebar items
            );
            target.classList.add('active', ...activeClasses);   // * Add 'active' class to the clicked item
            sidebarClickedTaskName.textContent = target.textContent;       // * Update heading text
            filter = target.dataset.filter;     // * set filter
            renderTodolist();       // * re-render to-do list

            console.log('Filterd value:', filter);
        }
    }
}
// !^ Sidebar section End


class Todo {
  constructor({
    task_name,
    task_description,
    task_list_type,
    task_date = null,
    subtask_no,
    is_important = false,
    is_done = false,
  }) {
    this.id = generateId();
    this.task_name = task_name;
    this.task_description = task_description;
    this.task_list_type = task_list_type;
    this.task_date = task_date;
    this.subtask_no = subtask_no;
    this.is_important = is_important;
    this.is_done = is_done;
  }
}

const todos = [
    new Todo({
        task_name: "Consult accountent name",
        task_description: "Consult accountent",
        task_list_type: "Other",
        // task_date: new Date("Wed May 7 2025 02:00:00 GMT+0530 (India Standard Time)"),
        task_date: new Date(["2025-05-05T17:01"]),
        subtask_no: 4,
        is_important: true,
    }),

    new Todo({
        task_name: "Research ocntent ideas",
        task_description: "Research ocntent ideas",
        task_list_type: "Work",
        task_date: new Date(["2025-05-17T17:01"]),
        subtask_no: 1,
    }),
    new Todo({
        task_name: "Create a database of guest authors",
        task_description: "Create a database of guest authors",
        task_list_type: "",
        task_date: new Date(["2025-05-07T03:06"]),
        subtask_no: 2,
        is_important: true,
        is_done: true,
    }),
    new Todo({
        task_name: "Renew driver's licence",
        task_description: "Renew driver's licence",
        task_list_type: "Personal",
        task_date: new Date(["2025-05-15T17:13"]),
        subtask_no: 3,
    }),
    new Todo({
        task_name: "Consult accountent",
        task_description: "Consult accountent",
        task_list_type: "Other",
        task_date: new Date(["2025-12-27T17:13"]),
        // task_date: new date(["YYYY-MM-DD, hh:mm PM"]),
        subtask_no: 4,
    }),
];

console.log(todos);


//! Todo form show and hide section Start
addNewTaskBtn.addEventListener('click', () => {
    taskListContainer.classList.remove('w-full');
    taskListContainer.classList.add('w-3/4');

    addTaskForm.classList.remove('hidden', 'w-0');
    addTaskForm.classList.add('w-md');
});
function hideFormContainer() {
    taskListContainer.classList.remove('w-3/4');
    taskListContainer.classList.add('w-full');

    addTaskForm.classList.add('hidden');
    addTaskForm.classList.remove('w-md');

    addTaskForm.reset();
    toggleSubmitBtns(false);
}
closeTaskBtn.addEventListener('click', hideFormContainer);
deleteTaskBtn.addEventListener('click', hideFormContainer);
//! Todo form show and hide section End

//!^  render todo lists Start {read}
let filter = "all";
function renderTodolist() {

    // show | hide on filter
    if (filter === "completed") {
        // addNewTaskBtn.classList.add("hidden");
    } else if (filter === "today") {
        // addTaskForm.classList.add("hidden");
    } else {
        // addNewTaskBtn.classList.remove("hidden");
        // addTaskForm.classList.remove("hidden");
    }


    const filtered_todos = todos.filter((todo) => {
        const currentDateTime = new Date();
        const givenDateTime = todo.task_date;

        if (filter == "all") {
            // count all task number
            const countAllTask = document.getElementById("countAllTask").innerText = todos.length;
            return true;
        } else if (filter == "upcoming") {
            return givenDateTime > currentDateTime;
        } else if (filter == "today") {
            const currentDate = currentDateTime.toDateString();
            const givenDate = givenDateTime.toDateString();
            return currentDate === givenDate;
        } else if (filter == "important") {
            return todo.is_important;
        } else if (filter == "completed") {
            return todo.is_done;
        }
    });

  console.log("filtered_todos", filtered_todos);

    document.querySelectorAll("[sidebar-item]").forEach((el) => {
        if (el.dataset.filter === filter) {
            el.classList.add("active");
        }
    });



    let todo_list = "";
    filtered_todos.forEach(function (elem, index, array) {

        todo_list += `<li data-id=${elem.id}>
            <div class="flex justify-between items-center bg-white px-3 py-2 gap-8 rounded-lg shadow-sm border border-gray-300">
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="todo-checkbox-${index}" class="todo-checkbox flex-none mr-2 text-start" ${elem.is_done ? "checked" : ""}>

                    <div class="peer-checked:line-through peer-checked:text-gray-400 text-start">                      
                        ${elem.task_name ? `<label for="todo-checkbox-${index}" class="${elem.is_done ? "line-through text-gray-600" : ""} grow select-none">${elem.task_name}</label>` : ''}          

                        <div class="flex gap-12 items-center mt-0.5">                          
                            ${elem.task_date ? `
                                <span class="size-max flex items-center gap-2 bg-gray-100 px-2 py-1 rounded"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                                        <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
                                        <path fill-rule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clip-rule="evenodd" />
                                    </svg>                            
                                    ${showFormatDate(elem.task_date)}
                                </span>`
                                : 'no date select'
                            }    

                            ${elem.subtask_no ? `
                                <p class="flex gap-2 items-center"><span class="size-max  px-2 py-0.5 bg-gray-300 text-[12px] flex justify-center items-center rounded-md">${elem.subtask_no}</span> Subtask</p>
                                ` : ''
                            }

                            ${elem.task_list_type ? `                                      
                                <p class="size-max flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">                              
                                    <span class="w-3 h-3 bg-cyan-400 rounded-sm"></span>                          
                                    ${elem.task_list_type}   
                                </p>` : ''
                            }  
                        </div>                           
                    </div>            
                </div>

                <div class="flex items-center gap-2">
                    <button type="button" class="todo-important-btn border border-green-500 font-black cursor-pointer p-1 flex items-center hover:bg-green-500 hover:text-gray-50 rounded">
                        ${elem.is_important ? `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 select-none">
                                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                            </svg>`

                            : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>`
                        }
                    </button>

                    <button type="button" class="todo-edit-btn border border-blue-500 font-black cursor-pointer p-1 flex items-center hover:bg-blue-500 hover:text-gray-50 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                    </button>

                    <button type="button" class="todo-delete-btn border border-red-500 font-black cursor-pointer p-1 flex items-center hover:bg-red-500 hover:text-gray-50 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    
                </div>
            </div>
        </li>`;
    });
    todoList.innerHTML = todo_list;
}
//!^  render todo lists End {read}

/*========================================================================
 **                           SECTION Create new Todo 
 *========================================================================**/
//^ add new toto Start {create} 
addTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todo_list_id = todoIdInput.value;
    const task_name = todoTextInput.value;
    const task_description = todoDescription.value;
    const list_type = todoListType.value;

    const formInputDate = dueDate.value;
    const due_date = formInputDate ? new Date(formInputDate) : null;

    // console.log(due_date);

    if (todo_list_id) {
        const todo = todos.find((elem) => elem.id === todo_list_id);
        // edit existing array element
        if (todo) {
            todo.task_name = task_name;
            todo.task_description = task_description;
            todo.task_list_type = list_type;
            if (due_date) {
                todo.task_date = convertDateFormat(due_date);

            }


        }
    } else {
        //& create new array element
        todos.push({
            id: generateId(),
            task_name: task_name,
            task_description: task_description,
            task_list_type: list_type,
            task_date: due_date,
            // is_important: false,
            is_important: filter === "important" ? true : false,

            is_done: false,
        });
        console.log(todos);

    }

    renderTodolist();
    hideFormContainer();

    // form goes on create state
    todoIdInput.value = "";
    todoTextInput.value = "";
    todoDescription.value = "";
    todoListType.value = "";
    dueDate.value = "";

    toggleSubmitBtns(false);
});
//^ add new toto End {create} 
/*============================ END OF SECTION ============================*/






//^ Dynamic action perform with onclick event(Checkbox, Mark Important, Edit, Delete)
todoList.addEventListener("click", function (event) {
    //& checkbox action perform( tick and untick)
    if (event.target.matches(`input.todo-checkbox[type="checkbox"]`)) {
        const todo_id = event.target.closest("li").dataset.id;
        const index = todos.find((elem) => elem.id === todo_id);
        if (index) {
            index.is_done = event.target.checked;
            renderTodolist();
        }
    }

    //& mark important
    const markBtn = event.target.closest(`button.todo-important-btn[type="button"]`);
    if (markBtn) {
        const todo_list_id = event.target.closest("li")?.dataset.id;
        const todo = todos.find((ele) => ele.id === todo_list_id);

        if (todo) {
            todo.is_important = !todo.is_important;
            renderTodolist();
        }
    }

    //& Modified Edit Button
    const editBtn = event.target.closest('button.todo-edit-btn');
    if (editBtn) {
        taskListContainer.classList.remove('w-full');
        taskListContainer.classList.add('sm:min-w-[calc(10%_-_240px)]','md:min-w-[calc(10%_-_280px)]','lg:min-w-[calc(10%_-_300px)]');
        // taskListContainer.classList.add('w-[calc(100%_-_320px)]');
        addTaskForm.classList.remove('hidden', 'w-0');
        addTaskForm.classList.add('sm:min-w-[calc(10%_-_240px)]','md:min-w-[calc(10%_-_280px)]','lg:min-w-[calc(10%_-_300px]');
// min-w-[calc(100%_-_200px)] sm:min-w-[calc(100%_-_240px)] sm:bg-green-100 md:min-w-[calc(100%_-_280px)] lg:min-w-[calc(100%_-_300px)]
        const todo_id = event.target.closest("li").dataset.id;
        const task = todos.find((todo) => todo.id === todo_id);

        todoIdInput.value = todo_id;
        todoTextInput.value = task.task_name;
        todoDescription.value = task.task_description;
        todoListType.value = task.task_list_type;
        dueDate.value = task.task_date;
        if (task.task_date) {
            const converted_local_due_date = convertDateFormat(task.task_date);
            dueDate.value = converted_local_due_date;
        }
        toggleSubmitBtns(true);
    }

    //& delete Button action perform
    const delBtn = event.target.closest('button.todo-delete-btn');
    if (delBtn) {
        const todo_id = event.target.closest("li").dataset.id;
        const index = todos.find((element) => element.id === todo_id);
        if (index) {
            todos.splice(index, 1);
            renderTodolist();
        }
        console.log(todos);
        // Swal.fire({
        //     position: "top-end",
        //     icon: "success",
        //     title: "Deleted successfully",
        //     showConfirmButton: false,
        //     timer: 1500
        // });
    }
});

function toggleSubmitBtns(edit = false) {
    if (edit) {
        addTodoItemBtn.classList.replace("inline-flex", "hidden");
        saveChangesBtn.classList.replace("hidden", "inline-flex");
    } else {
        addTodoItemBtn.classList.replace("hidden", "inline-flex");
        saveChangesBtn.classList.replace("inline-flex", "hidden");
    }
}







renderTodolist();












