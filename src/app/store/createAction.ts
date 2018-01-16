import {CustomAction} from '../models/customAction';

export function createAction(type, payload?): CustomAction {
  return { type, payload };
}
