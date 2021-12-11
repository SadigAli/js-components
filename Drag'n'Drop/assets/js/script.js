'use strict';

let inputText = document.getElementById('text');
let addBtn = document.querySelector('#add');
let todoList = [];
let id = 0;

addBtn.addEventListener('click',function(){
    getTodoList();
    clearInput();
});

document.addEventListener('keyup',function(e){
    switch (e.key) {
        case 'Enter':
            getTodoList();
            clearInput();
            break;
        default:
            break;
    }
})

function clearInput(){
    inputText.value = '';
}

function getTodoList(){
    if(inputText.value.trim()!='') addItem();
    document.querySelector('.todolist').innerHTML='';
    
    createElements(['todo','doing','done']);

    // get item
    todoList.forEach(todoItem=>{
        document.querySelector('.todo').innerHTML+=`<div class="form-group my-2" data-id=${todoItem.id}>
                            <input type="text" value="${todoItem.name}" disabled id="edit-text" class="form-control" draggable="true">
                            <button class="btn btn-success edit">
                            <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class="btn btn-danger delete">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>`
    });

    // edit item
    document.querySelectorAll('.edit').forEach(edit => {
        edit.addEventListener('click',function(){
            let editInput = edit.previousElementSibling;
            let id = edit.parentElement.getAttribute('data-id');
            let todoItem = todoList.find(x=>x.id==id);
            if(todoItem.editable == 'disabled'){
                editInput.removeAttribute('disabled');
                todoItem.editable = 'enabled';
            }else{
                todoItem.name = editInput.value;
                todoItem.editable = 'disabled'
                editInput.setAttribute('disabled','');
            }
        })
    });

    // delete item
    document.querySelectorAll('.delete').forEach(del => {
        del.addEventListener('click',function(){
            let id = del.parentElement.getAttribute('data-id');
            todoList = todoList.filter(x=>x.id!=id);
            del.parentElement.remove();
            if(todoList.length==0) document.querySelector('.todolist').innerHTML='';
        })
    });


    // drag and drop
    document.querySelectorAll('.form-group input').forEach(input=>{
        input.addEventListener('dragstart',function(e){
            e.dataTransfer.setData('text',e.target.parentElement.getAttribute('data-id'));
        })
    });

    ['todo','doing','done'].forEach(cls=>{
        document.querySelector(`.${cls}`).addEventListener('dragover',function(e){
            e.preventDefault();
        });
    });

    ['todo','doing','done'].forEach(cls=>{
        document.querySelector(`.${cls}`).addEventListener('drop',function(e){
            e.preventDefault();
            let id = e.dataTransfer.getData('text');
            let item = todoList.find(x=>x.id==id);
            let input = Array.from(document.querySelectorAll('.form-group')).find(x=>x.getAttribute('data-id')==id);
            item.type = cls;
            document.querySelector(`.${cls}`).append(input);
        }); 
    });


}

// create todo, doing and done list
function createElements(clsList){
    clsList.forEach(cls=>{
        let elem = document.createElement('div');
        elem.classList.add('col-md-4',cls);
        let elemTitle = document.createElement('h4');
        elemTitle.classList.add('my-2','text-center');
        elemTitle.innerText = cls;
        elem.prepend(elemTitle);
        document.querySelector('.todolist').append(elem);
    });
}

// add new item
function addItem(){
    let todoItem = {
        id:++id,
        name: inputText.value,
        type : 'todo',
        editable: 'disabled'
    }
    todoList.push(todoItem);
}