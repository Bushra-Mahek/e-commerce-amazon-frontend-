export let cartCont = JSON.parse(localStorage.getItem('cartCont'));
if(! cartCont){
 cartCont = [
  { productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
  },

  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
  }

];
}
function addStorage(){
localStorage.setItem('cartCont',JSON.stringify(cartCont));
};
export function addToCart(productId){
  let matchingItem;
    const selectQuantity = document.querySelector(`.js-select-quantity-${productId}`);
    const quantity = Number(selectQuantity.value);
  cartCont.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem=cartItem;
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

    
}


export function buttonAdded(butn){

const orgText = butn.innerHTML;
setTimeout(()=>{
  butn.innerHTML=orgText;
  },1000);
butn.innerHTML = "Added";
addStorage();
}




export function deleteProd(pid){
  let deletingItem;
  let newcart = [];
  cartCont.forEach((cartItem)=>{
    if(cartItem.productId !== pid){
      newcart.push(cartItem);
    }
    else{
      console.log("deleting",cartItem);
    }
  });
  cartCont = newcart;
  console.log(cartCont);
  addStorage();
}