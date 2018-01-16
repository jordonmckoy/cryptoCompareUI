import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CurrencyLogoComponent } from './currency-logo/currency-logo.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CurrencyBlockComponent } from './currency-block/currency-block.component';
import { CryptoApiService } from './services/crypto-api.service';
import { CryptoCompareService } from 'app/services/crypto-compare.service';
import { CurrencyBlockParentComponent } from 'app/currency-block-parent/currency-block-parent.component';
import { CurrencyPriceComponent } from 'app/currency-price/currency-price.component';
import { rootReducer } from 'app/store/rootReducer';
import { PortfolioActions } from 'app/services/portfolioActions';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyLogoComponent,
    CurrencySelectorComponent,
    CurrencyBlockComponent,
    CurrencyBlockParentComponent,
    CurrencyPriceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [
    CryptoApiService,
    CryptoCompareService,
    PortfolioActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
