import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CryptoCompareService } from '../services/crypto-compare.service';
import * as R from 'ramda';
import { Store } from '@ngrx/store';
import { AppState } from 'app/models/appState';

@Component({
  selector: 'app-currency-block-parent',
  template: `
    <app-currency-block
      [fetchData]="true"
      [portfolio]="portfolioState | async"
      (updatePortfolio)="refreshPortfolio($event)"
    ></app-currency-block>
    <app-currency-block [portfolio]="portfolioState | async"></app-currency-block>
  `,
  styles: []
})
export class CurrencyBlockParentComponent implements OnInit {

  DEFAULT_COIN = 'ETH';
  portfolioState;

  constructor(
    private cryptoCompareService: CryptoCompareService,
    private store: Store<any>
  ) {
    this.portfolioState = this.store.select('portfolio');
    this.refreshPortfolio(this.DEFAULT_COIN);
  }

  refreshPortfolio(coin: string) {
    this.cryptoCompareService.getPortfolioData(coin);
  }

  ngOnInit() {
    this.refreshPortfolio(this.DEFAULT_COIN);
  }

}
