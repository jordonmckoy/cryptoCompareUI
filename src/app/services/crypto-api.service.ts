import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PortfolioData } from 'app/models/portfolioData';

@Injectable()
export class CryptoApiService {

  coinList = [
    'ETH', 'USD', 'XRP'
  ];

  constructor(private http: Http) {
  }

  getMultiPrice(coin: string): Observable<Array<Object>> {
    const portfolio = [];

    return this.http.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=${this.coinList.join()}`)
      .map(data => data.json()[coin])
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
