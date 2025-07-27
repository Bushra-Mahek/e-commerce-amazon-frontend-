import {cartCont, deleteProd} from '../data/cart.js';
import {products} from '../data/products.js';
import {toDollars} from './utils/currency.js';

let cartSummary = ' ';

cartCont.forEach((cartItem)=>{
  const productId = cartItem.productId;
  let matchItem;
  products.forEach((product)=>{
    if(product.id === productId){
      matchItem = product;
    }
  });
  if (!matchItem) {
    console.warn(`No matching product found for productId: ${productId}`);
    return; // Skip this cart item
  }
 
  cartSummary+=`<div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchItem.name}
                </div>
                <div class="product-price">
                  $${toDollars(matchItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
  `;
});


function updateCartQuantity(){
  let totalQuantity = 0;

  cartCont.forEach((cartItem)=>{
  totalQuantity+=Number(cartItem.quantity);
});

   document.querySelector('.js-cart-items').innerHTML= `${totalQuantity} items`;
}

updateCartQuantity();


document.querySelector('.js-cart-summary').innerHTML=cartSummary;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    deleteProd(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    updateCartQuantity();

  });
});


console.log(cartCont);
