import { Injectable, Output } from '@angular/core';
import { CryptoApiService } from 'app/services/crypto-api.service';
import * as R from 'ramda';

@Injectable()
export class CryptoCompareService {

  portfolio: any = [
    { id: 0, symbol: 'ETH', price: '0.00' },
    { id: 1, symbol: 'USD', price: '0.00' },
    { id: 2, symbol: 'XRP', price: '0.00' }
  ];

  imagePath = '';

  mapIndexed = R.addIndex(R.map);
  buildCoinObj = (val, key) => ({ 'symbol': key, 'price': val });
  coinValues = (coins) => R.values(R.mapObjIndexed(this.buildCoinObj, coins));

  constructor(private cryptoApi: CryptoApiService) {
  }

  getPortfolioData(coin) {
    return this.cryptoApi.getMultiPrice(coin);
  }

  getPriceByCoin(coin: string) {
    return R.find(R.propEq('symbol', coin))(this.portfolio)['price'];
  }

  setImagePath(coin: string) {
    const baseImgPath = './assets/currency/';

    switch (coin) {
      case 'ETH':
        this.imagePath = baseImgPath + 'ethereum.png';
        break;
      case 'USD':
        this.imagePath = baseImgPath + 'dollar.png';
        break;
      case 'XRP':
        this.imagePath = baseImgPath + 'ripple.png';
    }

    return this.imagePath;
  }
}
