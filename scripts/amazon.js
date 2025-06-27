import {cartCont as cart} from '../data/cart.js';
// const info = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating:{
//       stars:4.5,
//       count:87
//     },
//     priceCents: 1090,
//   },

//   {
//     image:"images/products/intermediate-composite-basketball.jpg",
//     name : "Intermediate Size Basketball",
//     rating:{
//       stars:4,
//       count:127,
//     },
//     priceCents: 2095,
//   },

//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: " Adults Plain Cotton T-Shirt - 2 Pack",
//     rating:{
//       stars:4.5,
//       count: 56,
//     },
//     priceCents:799,
//   },

//   {
//     image:"images/products/black-2-slot-toaster.jpg",
//     name:"2 Slot Toaster-Black",
//     rating:{
//       stars:5,
//       count:2197,
//     },
//     priceCents:1899,
//   },
//   {
//     image:"images/products/6-piece-white-dinner-plate-set.jpg",
//     name:"6 Piece White Dinner PLate",
//     rating:{
//       stars:4,
//       count:37,
//     },
//     priceCents:2067,
//   },

  
//   {
//     image:"images/products/6-piece-non-stick-baking-set.webp",
//     name: "6-Piece Nonstick,Carbon Steel Oven Bakeware...",
//     rating:{
//       stars:4.5,
//       count:175,
//     },
//     priceCents:3499,
//   },







// ]
//let cartCont = [];
// 1. display the cards/html on home page using js
let cartCont = [];
let pros = '';
products.forEach((product)=>{
  pros+=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary  adc-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`

        

})



console.log(pros);
document.querySelector('.js-products-grid').innerHTML=pros;

//2. make cart button interactive
//4. make the select options also interactivw when selected..total quantity should sum these also
document.querySelectorAll(".adc-btn").forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId= button.dataset.productId;
    let matchingItem;
    const selectQuantity = document.querySelector(`.js-select-quantity-${productId}`);
    const quantity = Number(selectQuantity.value);
    cartCont.forEach((item)=>{
      if(productId === item.productId){
        matchingItem=item;
      }
    });

    if(matchingItem){
      matchingItem.quantity+=quantity;
    }
    else{
      cartCont.push({
      productId,
      quantity,
    });
    }
    let addedEle = document.querySelector(`.added-${productId}`);
    let timeoutId = null;
    if(timeoutId != null){
      clearTimeout(timeoutId);
    }
    timeoutId=setTimeout(()=>addedEle.classList.remove('new-added'),1500);
    addedEle.classList.add('new-added');

    
    //3.  make cart quantity interactive
let totalQuantity = 0;
cartCont.forEach((item)=>{
  totalQuantity+=Number(item.quantity);
});

document.querySelector('.js-cart-quantity').innerHTML= totalQuantity;
console.log(totalQuantity);
console.log(cartCont);


//3. amazon button transition:add->added->add
const orgText = button.innerHTML;
setTimeout(()=>{
  button.innerHTML=orgText;
  },1000);
button.innerHTML = "Added";
  });
});















