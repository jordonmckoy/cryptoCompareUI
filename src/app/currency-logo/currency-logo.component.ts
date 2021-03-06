import { Component, OnInit, Input, Inject } from '@angular/core';
import { CryptoCompareService } from 'app/services/crypto-compare.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-logo',
  template: `
    <img class="logo" [src]="imagePath">
  `,
  styles: [`
    .logo {
      width: 200px;
      height: 200px;
    }
  `]
})
export class CurrencyLogoComponent implements OnInit, OnChanges {

  @Input() coin: string;
  imagePath: string;

  constructor(@Inject(CryptoCompareService) private cryptoCompareService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.imagePath = this.cryptoCompareService.setImagePath(this.coin);
  }

}
