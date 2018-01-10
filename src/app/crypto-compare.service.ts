import { Injectable } from '@angular/core';

@Injectable()
export class CryptoCompareService {

  sysCoins = [
    'ETH', 'USD', 'XRP'
  ];

  constructor() { }

  getCoinPrice(coin: string): Promise<Object> {
    return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=${this.sysCoins.join()}`)
      .then(res => res.json())
      .then(data => data[coin])
      .catch(err => err);
  }
}
