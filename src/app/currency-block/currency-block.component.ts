import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { CryptoCompareService } from '../services/crypto-compare.service';
import * as R from 'ramda';

@Component({
  selector: 'app-currency-block',
  template: `
    <app-currency-logo [coin]="selectedVal"></app-currency-logo>
    <app-currency-selector
      [selectedVal]="selectedVal"
      [portfolio]="portfolio"
      (selectedValChange)="update($event)"
    ></app-currency-selector>
    <app-currency-price [portfolio]="portfolio" [coin]="selectedVal"></app-currency-price>
  `
})
export class CurrencyBlockComponent implements OnInit {

  imagePath: string;

  @Input() selectedVal = 'ETH';
  @Input() fetchData = false;
  @Input() portfolio: any;
  @Output() updatePortfolio = new EventEmitter<any>();

  constructor(@Inject(CryptoCompareService) private cryptoCompareService) {
  }

  ngOnInit() {
  }

  update(coin: string) {
    this.updatePortfolio.emit(coin);
    this.selectedVal = coin;
  }

}
