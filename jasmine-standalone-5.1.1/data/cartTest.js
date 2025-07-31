import {addToCart, cartCont, loadFromStorage} from "../../data/cart.js";
describe ('test suite: addToCart',() => {
  it('adds an existing product to the cart',()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId : '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
   //to check whether its in the cart or not use the length function
   expect(cartCont.length).toEqual(1);
   //expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   //testing if 1dt product was same as the product id we r having
   expect(cartCont[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
   expect(cartCont[0].quantity).toEqual(2);


  });

  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  // Good practice: Before each test, create the needed mock element
  beforeEach(() => {
  // Create a fake element for BOTH the quantity selector AND the "added" message
  document.querySelector('.js-test-container').innerHTML = `
    <div class="added-${productId}"></div>
    <select class="js-select-quantity-${productId}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  `;
});
  // Good practice: After each test, clean up the mock element
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('adds a new product to the cart',() => {
    //creating a mock test
    //A MOCK ONLY LASTS FOR ONE TEST
    spyOn(localStorage, 'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cartCont'));
    loadFromStorage();

   addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
   //to check whether its in the cart or not use the length function
   expect(cartCont.length).toEqual(1);
   //expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   //testing if 1dt product was same as the product id we r having
   expect(cartCont[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
   expect(cartCont[0].quantity).toEqual(1);
  });
});