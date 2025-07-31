import { toDollars } from "../scripts/utils/currency.js";
console.log("converts cents to dollars");
if(toDollars(2000.5) === '20.01'){
  console.log('passed');
}
else{
  console.log('failed');
}