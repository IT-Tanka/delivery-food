const btnAuth=document.querySelector('.button-auth');
const modalAuth=document.querySelector('.modal-auth');
const btnCloseAuth=modalAuth.querySelector('.close-auth');
const btnCart=document.querySelector('.button-cart');
const btnOut=document.querySelector('.button-out');
const formlogIn=document.getElementById('logInForm');
const spanUserName=document.querySelector('.user-name');
const inputLogin=modalAuth.querySelector('#login');
const inputPassword=modalAuth.querySelector('#password');


const logIn=(user)=>{

    btnCart.style.display='flex';
    btnOut.style.display='flex';
    btnAuth.style.display='none';
    spanUserName.style.display='inline';
    spanUserName.textContent=user.login;
    inputPassword.value='';
    
};

const logOut=()=>{

    btnCart.style.display='none';
    btnOut.style.display='none';
    btnAuth.style.display='flex';
    spanUserName.textContent='';
    localStorage.removeItem('user');

};


btnAuth.addEventListener('click',()=>{

    modalAuth.style.display='flex';
    inputPassword.value='';
    spanUserError.style.color='transparent';    
});

btnCloseAuth.addEventListener('click',()=>{
    modalAuth.style.display='none';
});

btnOut.addEventListener('click',()=>{
    logOut();
});

formlogIn.addEventListener('submit', (e)=>{

    e.preventDefault();
    let login=inputLogin.value;
    let password=inputPassword.value;

    if((/^[a-zA-z]{1}[a-zA-Z1-9]{2,20}$/.test(login) === false)||(password.length<=2))
	{    
        
        spanUserError.style.color='red';
        return;
    } else{
        let user={
        login:inputLogin.value,
        password:inputPassword.value
        };
        localStorage.setItem('user', JSON.stringify(user));
        spanUserError.style.color='green';
        logIn(user);
        modalAuth.style.display='none';
        }
    
});

if (localStorage.getItem('user')){
    logIn(JSON.parse(localStorage.getItem('user')));
}
(function createSpanUserError(){
    spanUserError=document.createElement('span');
    spanUserError.style.color='transparent';
    spanUserError.innerText='Неверный логин или пароль';
    spanUserError.style.display='block';
    formlogIn.style.position='relative';
    spanUserError.style.position='absolute';
    spanUserError.style.top='230px';
    formlogIn.append( spanUserError);
})();


