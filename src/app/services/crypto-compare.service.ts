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

  mapIndexed = R.addIndex(R.map);
  buildCoinObj = (val, key) => ({ 'symbol': key, 'price': val });
  coinValues = (coins) => R.values(R.mapObjIndexed(this.buildCoinObj, coins));

  constructor(private cryptoApi: CryptoApiService) {
  }

  getPortfolioData(coin) {
    return this.cryptoApi.getMultiPrice(coin)
      .map(res => this.mapIndexed(
        (val, id) => (
          Object.assign({}, val, { id })
        ), this.coinValues(res)
      ));
  }

  getPriceByCoin(coin: string, portfolio: any) {
    return R.find(R.propEq('symbol', coin))(portfolio)['price'];
  }

  setPortfolioData(data) {
    this.portfolio = data;
    return this.portfolio;
  }

  setImagePath(coin: string) {
    const baseImgPath = './assets/currency/';
    let imagePath: string;

    switch (coin) {
      case 'ETH':
        imagePath = baseImgPath + 'ethereum.png';
        break;
      case 'USD':
        imagePath = baseImgPath + 'dollar.png';
        break;
      case 'XRP':
        imagePath = baseImgPath + 'ripple.png';
        break;
      default:
        imagePath = baseImgPath + 'ethereum.png';
        break;
    }

    return imagePath;
  }
}
