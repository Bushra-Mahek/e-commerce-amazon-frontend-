import {toDollars} from '../scripts/utils/currency.js';
describe('test suite: toDollar', ()=>{
  it('converts dollars to  cents',()=>{
    expect(toDollars(2095)).toEqual('20.95');
  });


  it('works with 0',()=>{
    expect(toDollars(0)).toEqual('0.00');
  });

  it('works with rounding off to correct values',()=>{
    expect(toDollars(2000.5)).toEqual('20.01');
  });
})