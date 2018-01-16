import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../models/appState';
import { createAction } from 'app/store/createAction';

@Injectable()
export class PortfolioActions {

  static FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
  static FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
  static FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

  constructor(private store: Store<AppState>) {
  }

  fetchPending() {
    this.store.dispatch(createAction(PortfolioActions.FETCH_DATA_PENDING));
  }

  fetchSuccess(currentPortfolio) {
    this.store.dispatch(
      createAction(
        PortfolioActions.FETCH_DATA_SUCCESS,
        currentPortfolio
      )
    );
  }

  fetchError(err) {
    this.store.dispatch(
      createAction(
        PortfolioActions.FETCH_DATA_ERROR,
        err
      )
    );
  }

  getPortfolioData() {
    this.store.select(appState => appState.portfolioData.portfolio)
      .filter(Boolean)
      .take(1)
      .subscribe(
        (currentPortfolio) => {
          console.log('current action', currentPortfolio);
          this.store.dispatch(
            createAction(
              PortfolioActions.FETCH_DATA_SUCCESS,
              currentPortfolio
            )
          );
        },
        (err) => {
          this.store.dispatch(
            createAction(
              PortfolioActions.FETCH_DATA_ERROR,
              err
            )
          );
        }
      );
  }
}