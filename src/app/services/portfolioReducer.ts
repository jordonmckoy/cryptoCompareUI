import { CustomAction } from '../models/customAction';

import {PortfolioActions} from './portfolioActions';
import { AppState } from 'app/models/appState';

export default function portfolioReducer(state: AppState, action: CustomAction): AppState {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return action.payload;
    case 'FETCH_DATA_PENDING':
    case 'FETCH_DATA_ERROR':
    default:
      return state;
  }
}