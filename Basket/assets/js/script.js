'use strict';

let addToCartBtns= Array.from(document.querySelectorAll('.add-to-cart button'));
let basketArray = localStorage.getItem('basket')==null ? [] : JSON.parse(localStorage.getItem('basket'));

getBasket();

// add to card
addToCartBtns.forEach(addToCart=>{
    addToCart.addEventListener('click',function(){
        let dataId = addToCart.getAttribute('data-id');
        let productInfo = addToCart.parentElement.previousElementSibling;
        let product = {};
        if(!basketArray.find(x=>x._id==dataId)){
            product={
                _id : dataId,
                name : productInfo.querySelector('.name').innerText,
                price : productInfo.querySelector('.price').innerText,
                image : productInfo.parentElement.querySelector('img').getAttribute('src'),
                count : 1
            };
            basketArray.push(product);
        }else{
            product = basketArray.find(x=>x._id==dataId);
            product.count++;
        }
        localStorage.setItem('basket',JSON.stringify(basketArray));
        getBasket();
    });
});

// get basket elements
function getBasket(){
    let basketList = document.querySelector('.basket-item ul');
    let total = 0;
    if(basketArray.length == 0){
        basketList.innerHTML='<h2 class=\'text-center\'>There is no product in basket</h2>';
    }else{
        basketList.innerHTML='';
        basketArray.forEach(basketItem=>{
            total += Number(basketItem.count * basketItem.price);
            basketList.innerHTML+=
            `
                <li data-id=${basketItem._id}>
                    <div class="image">
                        <img src="${basketItem.image}" alt="image">
                    </div>
                    <div class="product-info">
                        <p>${basketItem.name} X ${basketItem.count}</p>
                        <p>$<span class="price">${basketItem.price}</span></p>
                    </div>
                    <i class="bi bi-x-lg"></i>
                </li>   
            `
        });
        let footer = document.createElement('li');
        footer.classList.add('footer');
        let h5 = document.createElement('h5');
        h5.innerText = 'Total';
        let price = document.createElement('p');
        price.innerHTML = `$ <span class="total">${total}</span>`;
        footer.append(h5,price);
        basketList.append(footer);
        document.querySelector('sub.count').innerText = basketArray.length;
        document.querySelectorAll('.bi-x-lg').forEach(remove=>{
            remove.addEventListener('click',function(){
                let productId = remove.parentElement.getAttribute('data-id');
                let item = basketArray.find(x=>x._id==productId);
                if(item.count==1){
                    basketArray = basketArray.filter(x=>x._id!=productId);
                    document.querySelector('sub.count').innerText = basketArray.length;
                    remove.parentElement.remove();
                    if(basketArray.length==0){
                        localStorage.removeItem('basket');
                        basketList.innerHTML='<h2 class=\'text-center\'>There is no product in basket</h2>';
                    }
                }else{
                    item.count--;
                }
                total-=item.price;
                document.querySelector('span.total').innerText = total;
                remove.parentElement.querySelector('p').innerHTML=`${item.name} X ${item.count}`;
                localStorage.setItem('basket',JSON.stringify(basketArray));
            });
        });
    }
}