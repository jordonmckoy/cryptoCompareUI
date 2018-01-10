import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as R from 'ramda';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-selector',
  template: `
    <select [compareWith]="compareFn" [ngModel]="selectedVal" (ngModelChange)="updateVal($event)">
      <option *ngFor="let coin of lCoins" [ngValue]="coin.symbol">
        {{coin.symbol}}
        {{coin.price}}
      </option>
    </select>
    <p>Child: {{selectedVal}} {{price}}</p>
  `,
  styles: []
})
export class CurrencySelectorComponent implements OnInit, OnChanges {

  @Input() selectedVal: string;
  @Output() selectedValChange = new EventEmitter<any>();

  @Input() lCoins: any;

  price: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setPrice();
  }

  setPrice() {
    this.price = R.find(R.propEq('symbol', this.selectedVal))(this.lCoins)['price'];
  }

  updateVal(value) {
    this.selectedValChange.emit(value);
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
