import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-currency-selector',
  template: `
    <select [compareWith]="compareFn" [ngModel]="selectedVal" (ngModelChange)="updateVal($event)">
      <option *ngFor="let coin of portfolio" [ngValue]="coin.symbol">
        {{coin.symbol}}
        {{coin.price}}
      </option>
    </select>
    <p>Child: {{selectedVal}}</p>
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

  updateVal(value) {
    this.selectedValChange.emit(value);
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
