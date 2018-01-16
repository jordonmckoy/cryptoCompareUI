import { Injectable, Output, Inject } from '@angular/core';
import { CryptoApiService } from 'app/services/crypto-api.service';
import * as R from 'ramda';
import { Store } from '@ngrx/store';
import { PortfolioActions } from 'app/services/portfolioActions';
import { AppState } from 'app/models/appState';

@Injectable()
export class CryptoCompareService {

  mapIndexed = R.addIndex(R.map);
  buildCoinObj = (val, key) => ({ 'symbol': key, 'price': val });
  coinValues = (coins) => R.values(R.mapObjIndexed(this.buildCoinObj, coins));

  constructor(
    private store: Store<any>,
    private portfolioActions: PortfolioActions,
    private cryptoApi: CryptoApiService
  ) {
  }

  getPortfolioData(coin) {
    this.portfolioActions.fetchPending();

    this.cryptoApi.getMultiPrice(coin)
      .map(res => this.mapIndexed(
        (val, id) => (
          Object.assign({}, val, { id })
        ), this.coinValues(res)
      ))
      .filter(Boolean)
      .take(1)
      .subscribe(
        (currentPortfolio) => {
          this.portfolioActions.fetchSuccess(currentPortfolio);
        },
        (err) => {
          this.portfolioActions.fetchError(err);
        }
      );
  }

  getPriceByCoin(coin: string, portfolio: any) {
    return portfolio ?
      R.find(
        R.propEq('symbol', coin)
      )(portfolio)['price'] : null;
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
