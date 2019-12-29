import { Action } from '@ngrx/store';
import { AppSettings } from './app-settings.model';

export enum AppSettingsActionTypes {
    LoadAppSettings = '[AppSettings] Load AppSettings',
    SaveAppSettingsToLocalStorage = '[AppSettings] Save To Local Storage',
    LoadAppSettingsFromLocalStorage = '[AppSettings] Load From Local Storage',
    SetDegreesUnit = '[AppSettings] Set Degrees Unit',
}

export class LoadAppSettingss implements Action {
    readonly type = AppSettingsActionTypes.LoadAppSettings;

    constructor(public payload: { settings: AppSettings }) {}
}

export class SaveAppSettingsToLocalStorage implements Action {
    readonly type = AppSettingsActionTypes.SaveAppSettingsToLocalStorage;
}

export class LoadAppSettingsFromLocalStorage implements Action {
    readonly type = AppSettingsActionTypes.LoadAppSettingsFromLocalStorage;
}

export class SetDegreesUnit implements Action {
    readonly type = AppSettingsActionTypes.SetDegreesUnit;

    constructor(public payload: { unit: 'METRIC' | 'IMPIRIAL' }) {}
}

export type AppSettingsActions =
    | LoadAppSettingss
    | SaveAppSettingsToLocalStorage
    | LoadAppSettingsFromLocalStorage
    | SetDegreesUnit;
