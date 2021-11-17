const partners=()=>{
const RestaurantCards=document.querySelector('.cards-restaurants');

const renderItems=(data)=>{

    data.forEach(element => {
        
        const {image, kitchen, name, price, products, stars, time_of_delivery}=element;
        const card=document.createElement('a');
        card.classList.add('card');
        card.classList.add('card-restaurant');
        
        // card.setAttribute('href','./restaurant.html');
        card.dataset.products=products;
        card.innerHTML=`
            <img src="${image}" alt="${name}" class="card-image" />
                                <div class="card-text">
                                    <div class="card-heading">
                                        <h3 class="card-title">${name}</h3>
                                        <span class="card-tag tag">${time_of_delivery} мин</span>
                                    </div>
                                    <div class="card-info">
                                        <div class="rating">
                                        ${stars}
                                        </div>
                                        <div class="price">От ${price} ₽</div>
                                        <div class="category">${kitchen}</div>
                                    </div>
                                </div>
        `;
        card.addEventListener('click',(e)=>{
            e.preventDefault();
            localStorage.setItem('Restaurant', JSON.stringify(element));
            window.location.href='/restaurant.html';
        })
        RestaurantCards.append(card);
        });
    
};

fetch('./db/partners.json')
.then((response)=>response.json())
.then ((data)=>{
    renderItems(data);
})
.catch((error)=>{
    console.log(error);
});
};
partners();

