'use strict';

let dragBoxes = document.querySelectorAll('.little-circle-area .box');
let bigBox = document.querySelector('.big-circle-area .box');


dragBoxes.forEach(box=>{
    colorize(box);
    box.addEventListener('dragstart',function(e){
        let redTone = box.getAttribute('data-red');
        let blueTone = box.getAttribute('data-blue');
        let grenTone = box.getAttribute('data-green');
        let rgbObj = {
            red : redTone,
            blue : blueTone,
            green : grenTone 
        };
        e.dataTransfer.setData('text',JSON.stringify(rgbObj));
    });
});

colorize(bigBox);

bigBox.addEventListener('dragover',function(e){
    e.preventDefault();
});

bigBox.addEventListener('drop',function(e){
    let rgb = JSON.parse(e.dataTransfer.getData('text'));

    let dataRed = bigBox.getAttribute('data-red');
    let dataBlue = bigBox.getAttribute('data-blue');
    let dataGreen = bigBox.getAttribute('data-green');

    let redResult = Math.round((+dataRed + +rgb.red)/2);
    let blueResult = Math.round((+dataBlue+ +rgb.blue)/2);
    let greenResult = Math.round((+dataGreen + +rgb.green)/2);

    colorize(bigBox,redResult,blueResult,greenResult);
});

function colorize(elem,redTone=null,blueTone=null,greenTone=null){
    let red = redTone ?? Math.ceil(Math.random()*255);
    let blue = blueTone ?? Math.ceil(Math.random()*255);
    let green = greenTone ?? Math.ceil(Math.random()*255);

    elem.setAttribute('data-red',red);
    elem.setAttribute('data-blue',blue);
    elem.setAttribute('data-green',green);

    elem.style.backgroundColor = `rgb(${red},${blue},${green})`;
}