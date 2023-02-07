import {
  AppSettingsActions,
  AppSettingsActionTypes,
} from './app-settings.actions';
import { AppSettings } from './app-settings.model';

export const appSettingsFeatureKey = 'appSettings';

export interface State extends AppSettings {}

export const initialState: State = {
  degreesUnit: 'METRIC',
};

export function reducer(
  state = initialState,
  action: AppSettingsActions
): State {
  switch (action.type) {
    case AppSettingsActionTypes.LoadAppSettings: {
      return {
        ...state,
        degreesUnit: action.payload.settings.degreesUnit,
      };
    }

    case AppSettingsActionTypes.SetDegreesUnit: {
      return {
        ...state,
        degreesUnit: action.payload.unit,
      };
    }

    default:
      return state;
  }
}
