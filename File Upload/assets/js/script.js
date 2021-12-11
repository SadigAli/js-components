'use strict';

let uploadBox = document.querySelector('.upload-box');
let file = document.getElementById('file');

uploadBox.addEventListener('click',function(){
    file.click();
});

file.addEventListener('change',function(e){
    let files = e.target.files;
    uploadFiles(files);
});


uploadBox.addEventListener('dragover',function(e){
    e.preventDefault();
});

uploadBox.addEventListener('drop',function(e){
    e.preventDefault();
    uploadFiles(e.dataTransfer.files);
});

function uploadFiles(files){
    for (let file of files) {
        let reader = new FileReader();
        reader.addEventListener('loadend',function(e){
            let col3 = document.createElement('div');
            col3.classList.add('col-lg-3','col-md-6');
            let uploadImg = document.createElement('div');
            uploadImg.classList.add('upload-image');
            let img = document.createElement('img');
            img.setAttribute('src',e.target.result);
            let i = document.createElement('i');
            i.classList.add('bi','bi-x-lg');
            col3.append(uploadImg);
            uploadImg.append(img,i);
            document.querySelector('.upload-container').prepend(col3);

            let closes = document.querySelectorAll('.bi-x-lg');
            closes.forEach(close => {
                close.addEventListener('click',function(){
                    close.parentElement.parentElement.remove();
                })
            });
        });

        reader.readAsDataURL(file);
    }
}