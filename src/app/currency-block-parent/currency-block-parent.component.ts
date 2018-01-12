import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CryptoCompareService } from '../services/crypto-compare.service';
import * as R from 'ramda';

@Component({
  selector: 'app-currency-block-parent',
  template: `
    <app-currency-block
      [fetchData]="true"
      [portfolio]="portfolio"
      (updatePortfolio)="refreshPortfolio($event)"
    ></app-currency-block>
    <app-currency-block [portfolio]="portfolio"></app-currency-block>
  `,
  styles: []
})
export class CurrencyBlockParentComponent implements OnInit {

  DEFAULT_COIN = 'ETH';
  portfolio: any;

  constructor(@Inject(CryptoCompareService) private cryptoCompareService) {
  }

  refreshPortfolio(coin: string) {
    this.cryptoCompareService.getPortfolioData(coin)
      .subscribe(data => {
        this.portfolio = this.cryptoCompareService.setPortfolioData(data);
      },
      err => console.log(err));
  }

  ngOnInit() {
    this.refreshPortfolio(this.DEFAULT_COIN);
  }

}
