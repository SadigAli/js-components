'use strict';

let uploadBox = document.querySelector('.upload-box');
let file = document.getElementById('file');

uploadBox.addEventListener('click',function(){
    file.click();
});

file.addEventListener('change',function(e){
    let files = e.target.files;
    for (let file of files) {
        let reader = new FileReader();
        reader.addEventListener('loadend',function(e){
            let col3 = document.createElement('div');
            col3.classList.add('col-lg-3','col-md-6');
            let uploadImg = document.createElement('div');
            uploadImg.classList.add('upload-image');
            let img = document.createElement('img');
            img.setAttribute('src',e.target.result);
            let p = document.createElement('p');
            p.innerText = 'x';
            col3.append(uploadImg);
            uploadImg.append(img,p);
            // document.querySelector('.upload-container').prepend(`<div class="col-lg-3 col-md-6">
            //     <div class="upload-image">
            //         <img src="${e.target.result}" alt="image">
            //         <p>x</p>
            //     </div>
            // </div>`);

            document.querySelector('.upload-container').prepend(col3);
        });

        reader.readAsDataURL(file);
        }
})
