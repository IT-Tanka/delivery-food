const restaurantMenu=()=>{
    
    const cardsMenu=document.querySelector('.cards-menu');
    
    const renderHeading=({name, stars, kitchen , price})=>{

        const restaurantTitle=document.querySelector('.restaurant-title');
        const restaurantRating=document.querySelector('.rating');
        const restaurantCategory=document.querySelector('.category');
        const restaurantPriceFrom=document.querySelector('.price');

        restaurantTitle.innerText=`${name}`;
        restaurantRating.innerText=`${stars}`;
        restaurantCategory.innerText=`${kitchen}`;
        restaurantPriceFrom.innerText='От '+ `${price}`  + '  ₽';

    };
    
    const  renderItems=(data)=>{

        data.forEach(({description, id, image, name, price })=>{
        const card=document.createElement('div');
        card.classList.add('card');
        card.innerHTML=`
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                
                <div class="card-info">
                    <div class="ingredients">${description}
                    </div>
                </div>
                
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>					
        `;
        
        cardsMenu.append(card);
        card.querySelector('.button-add-cart').addEventListener('click',()=>{
            addToCart({id, name, price, count:1});
        });  
        });
        
    };

    const addToCart=(cartItem)=>{
        
        const cartArray=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];

        if (cartArray.some((item)=>item.id===cartItem.id)){
			cartArray.map((item)=>{
				if (item.id===cartItem.id){ 
					item.count++;
				}
				return item;
			});
        }else{cartArray.push(cartItem);}
        
        localStorage.setItem('cart', JSON.stringify(cartArray));
    };

    if (localStorage.getItem('Restaurant')){

        const restaurant=JSON.parse(localStorage.getItem('Restaurant'));
        renderHeading(restaurant);

        fetch(`./db/${restaurant.products}`)
            .then((response)=>response.json())
            .then ((data)=>{ renderItems(data);})
            .catch((error)=>{
                console.log(error);
            });

    } else { window.location.href='./';}
    
};
restaurantMenu();
