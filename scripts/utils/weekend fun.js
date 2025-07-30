export default function isWeekend(date){
  if(date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday'){
    return true;
  }
  else{
    return false;
  }
}

