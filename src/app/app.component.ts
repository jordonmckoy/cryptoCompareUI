import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-currency-block [fetchData]="true"></app-currency-block>
  `
})
export class AppComponent {
}
