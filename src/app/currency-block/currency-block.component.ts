import { Component, OnInit, Input, Output } from '@angular/core';
import { CryptoCompareService } from '../services/crypto-compare.service';
import * as R from 'ramda';
import { SimpleChanges, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';



@Component({
  selector: 'app-currency-block',
  template: `
    <app-currency-logo [imagePath]="imagePath"></app-currency-logo>
      <app-currency-selector 
        [selectedVal]="selectedVal" 
        [lCoins]="lCoins"
        (selectedValChange)="updateVal($event)"
      ></app-currency-selector>
    <p>Parent: {{selectedVal}} {{price}}</p>
  `
})
export class CurrencyBlockComponent implements OnInit {

  mapIndexed = R.addIndex(R.map);

  imagePath = '';

  price: number;

  lCoins: any = [
    { id: 0, symbol: 'ETH', price: '0.00' },
    { id: 1, symbol: 'USD', price: '0.00' },
    { id: 2, symbol: 'XRP', price: '0.00' }
  ];

  @Input() selectedVal = 'ETH';
  @Input() fetchData = false;

  buildCoinObj = (val, key) => ({ 'symbol': key, 'price': val });
  coinValues = (coins) => R.values(R.mapObjIndexed(this.buildCoinObj, coins));

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
  }

  setPrices(coin: string) {
    if (this.fetchData) {
      this._cryptoService.getCoinPrice(coin)
        .subscribe(data => {
          this.lCoins = this.mapIndexed((val, id) => (Object.assign({}, val, { id })), this.coinValues(data));
          console.log('lCoins', this.lCoins);
          this.price = R.find(R.propEq('symbol', coin))(this.lCoins)['price'];
          this.selectedVal = coin;

          this.setImagePath(coin);
        },
        err => console.log(err));
    } else {
      this.price = R.find(R.propEq('symbol', coin))(this.lCoins)['price'];
      this.selectedVal = coin;

      this.setImagePath(coin);
    }
  }

  constructor(private _cryptoService: CryptoCompareService) {
  }

  ngOnInit() {
    this.setPrices(this.selectedVal);
  }

  updateVal(value) {
    this.setPrices(value);
  }

}
