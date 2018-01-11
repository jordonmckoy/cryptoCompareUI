import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { CryptoCompareService } from '../services/crypto-compare.service';
import * as R from 'ramda';
import { SimpleChanges, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-block',
  template: `
    <app-currency-logo [imagePath]="imagePath"></app-currency-logo>
    <app-currency-selector 
      [selectedVal]="selectedVal" 
      [portfolio]="portfolio"
      (selectedValChange)="updateVal($event)"
    ></app-currency-selector>
    <p>Parent: {{selectedVal}}</p>
  `
})
export class CurrencyBlockComponent implements OnInit {

  portfolio: any;
  imagePath: string;

  @Input() selectedVal = 'ETH';
  @Input() fetchData = false;

  refreshPortfolio(coin: string) {
    if (this.fetchData) {
      this.cryptoCompareService.getPortfolioData(coin)
        .subscribe(data => {
          this.portfolio = this.cryptoCompareService.mapIndexed(
            (val, id) => (
              Object.assign({}, val, { id })
            ), this.cryptoCompareService.coinValues(data)
          );

          this.imagePath = this.cryptoCompareService.setImagePath(coin);
        },
        err => console.log(err));

      this.selectedVal = coin;
    } else {
      this.selectedVal = coin;
    }
  }

  constructor(@Inject(CryptoCompareService) private cryptoCompareService) {
  }

  ngOnInit() {
    this.refreshPortfolio(this.selectedVal);
  }

  updateVal(value) {
    this.refreshPortfolio(value);
  }

}
