import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-selector',
  template: `
    <select [ngModel]="selectedVal" (ngModelChange)="updatePortfolio($event)">
      <option *ngFor="let coin of portfolio" [ngValue]="coin.symbol">
        {{coin.symbol}}
      </option>
    </select>
  `,
  styles: []
})
export class CurrencySelectorComponent implements OnInit, OnChanges {

  @Input() selectedVal: string;
  @Output() selectedValChange = new EventEmitter<any>();

  @Input() portfolio: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  updatePortfolio(value) {
    this.selectedValChange.emit(value);
  }

}
