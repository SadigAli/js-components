'use strict';

let addBtn = document.querySelector('#add');
let input = document.getElementById('text');
let modalContainer = document.querySelector('.modal-container');
let todoList = [];
let id = 0;

addBtn.addEventListener('click',function(){
    addOrUpdateTodoList();
    clearInput();
});


document.addEventListener('keyup',function(e){
    switch (e.key) {
        case 'Enter':
            addOrUpdateTodoList();
            clearInput();
            break;
    
        default:
            break;
    }
})

function addOrUpdateTodoList(itemId=null){
    let todoItem = todoList.find(x=>x.id==itemId);
    if(!todoItem){
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
    }else{
        todoItem.status = 'modified';
        modalContainer.style.display = 'block';
        document.querySelector('.text-input').innerText = todoItem.name;
        document.getElementById('edit-text').value = todoItem.name;
        document.querySelector('#edit').setAttribute('data-id',todoItem.id);
    }
    getTodoList();
}

function clearInput(){
    input.value = '';
}

function getTodoList(){
    let table = document.querySelector('table.table-dark');
    table.innerHTML = '';
    if(todoList.length){
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

        todoList.forEach((elem,index)=>{
            tbody.innerHTML+=`
                <tr class="table-active">
                    <td>${index+1}</td>
                    <td>${elem.name}</td>
                    <td class="text-center" data-id="${elem.id}">
                        <button href="#" class="btn btn-secondary mark" title="mark as read">
                            <i class="bi ${!elem.isMarked ? 'bi-bookmark-check':'bi-bookmark-x-fill'}"></i>
                        </button>
                        <button href="#" class="btn btn-success edit" title="edit">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button href="#" class="btn btn-danger delete" title="delete">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
        `
        });
        let editBtns = document.querySelectorAll('.edit');
        let deleteBtns = document.querySelectorAll('.delete');
        let markBtns = document.querySelectorAll('.mark');
        markBtns.forEach(markBtn=>{
            markBtn.addEventListener('click',function(){
                let dataId = markBtn.parentElement.getAttribute('data-id');
                let element = todoList.find(x=>x.id==dataId);
                element.isMarked = !element.isMarked;
                if(element.isMarked != false){
                    markBtn.querySelector('i').classList.replace('bi-bookmark-check','bi-bookmark-x-fill');
                    markBtn.setAttribute('title','mark as unread');
                }else{
                    markBtn.querySelector('i').classList.replace('bi-bookmark-x-fill','bi-bookmark-check');
                    markBtn.setAttribute('title', 'mark as read');
                }

            });
        });
        
        editBtns.forEach(editBtn=>{
            editBtn.addEventListener('click',function(){
                let dataId = editBtn.parentElement.getAttribute('data-id');
                addOrUpdateTodoList(dataId);
            });
            
            document.querySelector('#edit').addEventListener('click',function(){
                todoList.find(x=>x.id==this.getAttribute('data-id')).name = document.querySelector('#edit-text').value;
                closeModal();
                getTodoList();
            });
        });

        deleteBtns.forEach(deleteBtn=>{
            deleteBtn.addEventListener('click',function(){
                let conf = confirm();
                if(conf){
                    let dataId = deleteBtn.parentElement.getAttribute('data-id');
                    todoList = todoList.filter(x=>x.id!=dataId);
                    getTodoList();
                }
            })
        })

    }
}

function closeModal(){
    document.addEventListener('click',function(e){
        if(e.target == document.querySelector('.modal-container') || e.target == document.querySelector('#edit'))   modalContainer.style.display = 'none';
    });
}

