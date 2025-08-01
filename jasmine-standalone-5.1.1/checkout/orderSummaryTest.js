import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cartCont} from "../../data/cart.js";
import { renderCheckoutHeader } from "../../scripts/checkout/checkoutheader.js";



describe('test suite: renderOrderSummary',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  //hook
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  document.querySelector('.js-test-container').innerHTML = `<div class ='js-cart-summary'></div>
  <div class = 'js-payment-summary'></div>
  <div class = 'js-checkout-header'></div>`;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
          return JSON.stringify([
  { productId: productId1,
    quantity:2,
    deliveryOptionId:'1',
  },

  {
    productId: productId2,
    quantity:1,
    deliveryOptionId:'2',
  }

]);
        
        
  });
  loadFromStorage();
  renderCheckoutHeader();
  renderOrderSummary();
  })


//after all hook
afterAll(()=>{
  
    document.querySelector('.js-test-container').innerHTML = '';
})

  //1.code that tests how page looks

  
  it('displays  the cart',()=>{
    
  expect(
  document.querySelectorAll('.js-cart-item-container').length).toEqual(2);


  expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

  expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

    // we dont want again the elements to appear in the jasmine web page
   
});

//2. code that tests how each page behaves
it('behavior(deletes) the cart item',()=>{
  
  document.querySelector(`.js-delete-link-${productId1}`).click();

  expect(
  document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
  expect(
    document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

  expect(
    document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

  //update func
  expect(cartCont.length).toEqual(1);
  expect(cartCont[0].productId).toEqual(productId2);
  
  
})
});