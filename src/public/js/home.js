const d = document

d.addEventListener("DOMContentLoaded", () => {
  !localStorage.getItem("CartId") ? createCart() : null;
  charginEvents();
})

function createCart() {
  fetch('http://localhost:8080/api/carts/addCart', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("CartId", data.newCart._id);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function charginEvents() {
  d.addEventListener('click', watchCart);
  d.addEventListener('click', addProductToCart);
}

function watchCart(e){
  if(e.target.matches('#shopping__car')){
    const id = localStorage.getItem("CartId");
    console.log(id);
    window.location.href = `http://localhost:8080/api/carts/${id}`;
  }
}

function addProductToCart(e){
  if(e.target.matches('.product_to_cart_button')){
    let prodId = e.target.getAttribute('data-id');
    prodId = {prodId: prodId};
    const cartId = localStorage.getItem("CartId");
    fetch(`http://localhost:8080/api/carts/${cartId}`, {
    method: 'PUT', // or 'POST'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prodId)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}