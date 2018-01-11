import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrencyLogoComponent } from './currency-logo/currency-logo.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CurrencyBlockComponent } from './currency-block/currency-block.component';
import { CryptoApiService } from './services/crypto-api.service';
import { CryptoCompareService } from 'app/services/crypto-compare.service';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyLogoComponent,
    CurrencySelectorComponent,
    CurrencyBlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CryptoApiService,CryptoCompareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
