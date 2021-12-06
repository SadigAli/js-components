'use strict';

let addBtn = document.querySelector('#add');
let input = document.getElementById('text');
let todoList = [];
let id = 0;

addBtn.addEventListener('click',function(){
    addTodoList();
    clearInput();
});

document.addEventListener('keyup',function(e){
    switch (e.key) {
        case 'Enter':
            addTodoList();
            clearInput();
            break;
    
        default:
            break;
    }
})

function addTodoList(){
    let val = input.value;
    if(val.trim()==='') return;
    id++;
    let obj = {
        id : id,
        name : val,
        isMarked : false,
        status : 'created'
    };
    todoList.push(obj);
    getTodoList();
}

function clearInput(){
    input.value = '';
}

function getTodoList(){
    let table = document.querySelector('table.table-dark');
    if(todoList.length){
        table.innerHTML = '';
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.innerText = '#';
        let th2 = document.createElement('th');
        th2.innerText = 'Name';
        let th3 = document.createElement('th');
        th3.innerText = 'Actions';
        thead.append(tr);
        tr.append(th1,th2,th3);

        let tbody = document.createElement('tbody');
        table.append(thead,tbody);

        tbody.innerHTML = '';

        todoList.forEach(elem=>{
            tbody.innerHTML+=`
                <tr class="table-active">
                    <td>${elem.id}</td>
                    <td>${elem.name}</td>
                    <td class="text-center" data-id="${elem.id}">
                        <button href="#" class="btn btn-secondary" title="mark as read"><i class="bi bi-bookmark-check"></i></button>
                        <button href="#" class="btn btn-success" title="edit">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button href="#" class="btn btn-danger" title="delete">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
        `
        });
    }
}