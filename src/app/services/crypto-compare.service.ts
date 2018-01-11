import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PortfolioData } from 'app/models/portfolioData';

@Injectable()
export class CryptoCompareService {

  private http: Http;

  sysCoins = [
    'ETH', 'USD', 'XRP'
  ];

  constructor(http: Http) {
    this.http = http;
  }

  getCoinPrice(coin: string): Observable<PortfolioData> {
    const portfolio = [];

    return this.http.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=${this.sysCoins.join()}`)
      .map(data => data.json()[coin])
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
