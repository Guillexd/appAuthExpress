const d = document;
const $form = d.querySelector('form');
const $email = d.querySelector('#email');
const $pass = d.querySelector('#password');
const $getInfo = d.querySelector('#getInfo');

$form.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch('http://localhost:8080/jwt/login', {
        method: 'POST',
        body: JSON.stringify({
                email: $email.value,
                password: $pass.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
        
})

$getInfo.addEventListener('click', ()=>{
    fetch('http://localhost:8080/jwt/validationJwtPassport', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
        
})