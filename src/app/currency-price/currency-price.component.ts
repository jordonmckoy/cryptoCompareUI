import { Component, OnInit, Input, Inject } from '@angular/core';
import { CryptoCompareService } from 'app/services/crypto-compare.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-price',
  template: `
    {{price}}
  `,
  styles: []
})
export class CurrencyPriceComponent implements OnInit, OnChanges {

  @Input() coin: string;
  @Input() portfolio: any;
  price: number;


  constructor(@Inject(CryptoCompareService) private cryptoCompareService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.price = this.cryptoCompareService.getPriceByCoin(this.coin, this.portfolio);
  }

}
