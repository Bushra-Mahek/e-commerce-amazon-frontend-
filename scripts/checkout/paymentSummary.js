import {cartCont} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {toDollars} from '../utils/currency.js'; 

export function paymentSummary(){
  let totalProductsPrice = 0;
  let shippingPrice = 0;


  cartCont.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    totalProductsPrice += product.priceCents*cartItem.quantity;


    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice+=deliveryOption.deliveryPrice;


    
  });
  //console.log(totalProductsPrice);
  //console.log(shippingPrice);
  const totalBeforeTax = totalProductsPrice+shippingPrice;
  //console.log(totalBeforeTax);
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax+ tax;


  let phtml = ` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${toDollars(totalProductsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${toDollars(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${toDollars(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${toDollars(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${toDollars(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;


     document.querySelector('.js-payment-summary').innerHTML = phtml;
}
