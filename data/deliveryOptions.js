import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

import isWeekend from '../scripts/utils/weekend fun.js';
export const deliveryOptions = [
  {
  deliveryId :'1',
  deliveryDays: 7,
  deliveryPrice: 0,
},
{
  deliveryId : '2',
  deliveryDays: 3,
  deliveryPrice: 499,
},
{
  deliveryId : '3',
  deliveryDays: 1,
  deliveryPrice: 999,
}];

export function getDeliveryOption(deliveryOptionId){
  
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.deliveryId === deliveryOptionId){
      deliveryOption = option;
    }
});


return deliveryOption || deliveryOptions[0];
}

let sdate = '';
export function calculateDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1,'day');
    if(!isWeekend(deliveryDate)){
      remainingDays--;
    }
  }
  
  sdate = deliveryDate.format('dddd, MMMM D');
  return sdate;
}