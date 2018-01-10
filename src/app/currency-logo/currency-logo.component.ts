import { Component, OnInit, Input } from '@angular/core';

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
export class CurrencyLogoComponent implements OnInit {

  @Input() imagePath: string;

  constructor() { }

  ngOnInit() {
  }

}
