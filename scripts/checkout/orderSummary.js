import {calculateCartQuantity, cartCont, deleteProd, addStorage,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {toDollars} from '.././utils/currency.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import  isSatSun from '../utils/weekend fun.js';
import {updateCartQuantity} from './checkoutheader.js';






// const daytd = dayjs();
// const day5 = daytd.add(3,'day');
// console.log(day5.format('MMMM D'));
// console.log(isSatSun(day5));

// const month1 = daytd.subtract(2,'month');
// console.log(month1.format('MMMM D'));

// console.log(month1.format('dddd'));


// console.log(isWeekend(day5));
// const td = dayjs();
// const d7 = td.add(3,'day');
// console.log(d7.format('dddd, MMMM D'));



  //1. f1
  //generates all cart item html
export function renderOrderSummary(){
    let cartSummary = '';

cartCont.forEach((cartItem)=>{
  const productId = cartItem.productId;
  const matchItem = getProduct(productId);
  if (!matchItem) {
    console.warn(`No matching product found for productId: ${productId}`);
    return; // Skip this cart item
  }

  const deliveryOptionId = cartItem.deliveryOptionId;


  let deliveryOption = getDeliveryOption(deliveryOptionId);
 
  const dateString = calculateDeliveryDate(deliveryOption);



  cartSummary+=`<div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchItem.name}
                </div>
                <div class="product-price">
                  ₹${toDollars(matchItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchItem.id}">
                    <span class= "update-link">Update</span><input type=number class = "quantity-input"> <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchItem.id}">Save</span>
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
                ${deliveryOptionsHtml(matchItem,cartItem)}
              </div>
            </div>
          </div>  
  `;
});

document.querySelector('.js-cart-summary').innerHTML=cartSummary;

attachEventListeners();

  };


  

//fun 5 deliveryOption
function deliveryOptionsHtml(matchItem,cartItem){
  let delvHtml = ' ';
  deliveryOptions.forEach((deliveryOption)=>{
    const dateString = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.deliveryPrice === 0
      ? 'FREE'
      : `₹${toDollars(deliveryOption.deliveryPrice)}-`;

    const isChecked = deliveryOption.deliveryId === cartItem.deliveryOptionId;


    
    delvHtml += `<div class="delivery-option js-delivery-option" data-product-id="${matchItem.id}" data-delivery-option-id="${deliveryOption.deliveryId}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`
               
  
  });

  return delvHtml;
};




  



//fun 2
//update cart quantity on the header of checkout page.
// function updateCartQuantityDisplay(){
// let totalQuantity = calculateCartQuantity();


// document.querySelector('.js-cart-items').innerHTML= `${totalQuantity} items`;
// }


//fun 3
// This is crucial because when you re-render HTML, new elements don't have listeners.
function attachEventListeners(){
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    deleteProd(productId);

    //const container = document.querySelector(`.js-cart-item-container-${productId}`);

    //instead of  container.remove(); & let totalQuan = calculateCartQuantity();document.querySelector('.js-cart-items').innerHTML= `${totalQuan} items`;
    //better to re render again which ensures robustness and cart display is always sync with cartCont data
    renderOrderSummary();
    renderPaymentSummary();
    updateCartQuantity();
    
  });
});




//to debug/verify always-console.log(cartCont)


//working update button
document.querySelectorAll('.js-update-link').forEach((ulink)=>{
  ulink.addEventListener('click',()=>{
    const productId = ulink.dataset.productId;
    console.log(productId);
    const cont = document.querySelector(`.js-cart-item-container-${productId}`);
    cont.classList.add('is-editing-quantity');

     const quantityLabel = cont.querySelector('.quantity-label');
      const quantityInput = cont.querySelector('.quantity-input');
    if (quantityInput && quantityLabel) {
                quantityInput.value = quantityLabel.textContent;
                renderPaymentSummary();
    }
  });

  //add keydown listener
  ulink.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
      event.preventDefault();
      ulink.click();//simulates a click
    }
  });
});

//save link functionality
document.querySelectorAll('.js-save-link').forEach((slink)=>{
  slink.addEventListener('click',()=>{
    const productId = slink.dataset.productId;
    console.log(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    

    const quantityInput = container.querySelector('.quantity-input');
    const newQuantity = Number(quantityInput.value);
    if(isNaN(newQuantity) || newQuantity<=0){
      alert('please enter a valid a quantity whole no. quantity greater than zero');
      quantityInput.focus();
      return;
    }

    let foundItem = false;
    cartCont.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        cartItem.quantity = newQuantity;
        foundItem = true;
      } 
    });
    if(foundItem){
      addStorage();
      const quantityLabel = container.querySelector('.quantity-label');
      if(quantityLabel){
        quantityLabel.textContent=newQuantity;
      }
      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
    }

    else{
      console.log('product not found in cart:',productId);
    }

     // Remove the editing class to revert the display
    container.classList.remove('is-editing-quantity');
  });

    //adding keydown listener
    
     slink.addEventListener('keydown',(event)=>{
      if(event.key === 'Enter'){
        event.preventDefault();
        slink.click();
      }
     });


  });

  //keydown listner for enter on the quantity field
  document.querySelectorAll('.quantity-input').forEach((input)=>{
    input.addEventListener('keydown',(event)=>{
      if(event.key === 'Enter'){
        event.preventDefault();
        //find closest save button for this input
        const container = input.closest('.cart-item-container');
        const savelink = container.querySelector('.js-save-link');
        if(savelink){
          savelink.click();
        }
      }
    });
  });



  document.querySelectorAll('.js-delivery-option').forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = option.dataset;//same as
    //const productId = option.dataset.productId;
    //const deliveryOptionId = option.dataset.deliveryOptionId
    updateDeliveryOption(productId, deliveryOptionId);
    renderPaymentSummary();

    
//Initial render when page loads
renderOrderSummary();
  });
});

}
