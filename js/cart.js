const cart=()=>{

    const cartBtn=document.getElementById('cart-button');
    const cartModal=document.querySelector('.modal-cart');
    const closeBtn=cartModal.querySelector('.close');
    const clearBtn=cartModal.querySelector('.clear-cart');
    const  bodyModal=cartModal.querySelector('.modal-body');
    const sendBtn=cartModal.querySelector('.button-primary');

    const clearCart=()=>{
        localStorage.removeItem('cart');
        bodyModal.innerHTML='';

    };

    const getSum=()=>{

        const priceTag=cartModal.querySelector('.modal-pricetag');
        const cartArray=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
        let sum=cartArray.reduce((acc, elem)=>{
            return acc+elem.count*elem.price;
        },0);
        priceTag.textContent=sum+ " ₽";

    };

    const renderCart=()=>{

        const cartArray=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
        
        bodyModal.innerHTML='';
        
        cartArray.forEach(({id, name, price, count})=>{
            if (count>0){
                const foodRow=document.createElement('div');
                foodRow.classList.add('food-row');
                foodRow.innerHTML=`
                    <span class="food-name">${name}</span>
                            <strong class="food-price">${price} ₽</strong>
                            <div class="food-counter">
                                <button class="counter-button dec-button" data-index="${id}">-</button>
                                <span class="counter">${count}</span>
                                <button class="counter-button inc-button" data-index="${id}">+</button>
                            </div>
                    `;
                bodyModal.append(foodRow);
            }          
        });
        getSum();

    };

    cartBtn.addEventListener('click', ()=>{
        cartModal.style.display='flex';
        renderCart();
    });

    closeBtn.addEventListener('click',()=>{
        cartModal.style.display='none';
    });

    clearBtn.addEventListener('click', ()=>{
        cartModal.style.display='none';
        clearCart();
    });

    bodyModal.addEventListener('click',(e)=>{
        if (e.target.classList.contains('counter-button')){
            const cartArray=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
            const dataIndex=e.target.dataset.index;
            let countServing;
            if (e.target.classList.contains('dec-button')){
                
                countServing= +e.target.nextElementSibling.textContent;
                if (countServing>0){countServing--;} else {countServing=0;}
                e.target.nextElementSibling.textContent=countServing;
            }
            if (e.target.classList.contains('inc-button')){
        
                countServing= +e.target.previousElementSibling.textContent+1;
                e.target.previousElementSibling.textContent=countServing;
            
            }
            cartArray.map((item)=>{
                if (item.id===dataIndex){item.count=countServing};
            });
            localStorage.setItem('cart',JSON.stringify(cartArray));
            getSum();
        }

    });

    sendBtn.addEventListener('click', ()=>{
        const cartArray=localStorage.getItem('cart');
        
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            body:cartArray
            })
        .then(response=>{
                if (response.ok){
                    clearCart();
                    cartModal.style.display='none';
                }
            })
        .catch(e=>{
                console.error(e);
            });   
    });

};
cart();