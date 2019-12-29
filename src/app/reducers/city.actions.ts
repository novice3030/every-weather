import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { City } from './city.model';

export enum CityActionTypes {
    LoadCities = '[City] Load Cities',
    AddCity = '[City] Add City',
    UpsertCity = '[City] Upsert City',
    AddCities = '[City] Add Cities',
    UpsertCities = '[City] Upsert Cities',
    UpdateCity = '[City] Update City',
    UpdateCities = '[City] Update Cities',
    DeleteCity = '[City] Delete City',
    DeleteCities = '[City] Delete Cities',
    ClearCities = '[City] Clear Cities',
    SearchCities = '[City] Search Cities',
    SelectCity = '[City] Select City',
    ClearSelectedCity = '[City] Clear Selected City',
}

export class LoadCities implements Action {
    readonly type = CityActionTypes.LoadCities;

    constructor(public payload: { cities: City[] }) {}
}

export class AddCity implements Action {
    readonly type = CityActionTypes.AddCity;

    constructor(public payload: { city: City }) {}
}

export class UpsertCity implements Action {
    readonly type = CityActionTypes.UpsertCity;

    constructor(public payload: { city: City }) {}
}

export class AddCities implements Action {
    readonly type = CityActionTypes.AddCities;

    constructor(public payload: { cities: City[] }) {}
}

export class UpsertCities implements Action {
    readonly type = CityActionTypes.UpsertCities;

    constructor(public payload: { cities: City[] }) {}
}

export class UpdateCity implements Action {
    readonly type = CityActionTypes.UpdateCity;

    constructor(public payload: { city: Update<City> }) {}
}

export class UpdateCities implements Action {
    readonly type = CityActionTypes.UpdateCities;

    constructor(public payload: { cities: Update<City>[] }) {}
}

export class DeleteCity implements Action {
    readonly type = CityActionTypes.DeleteCity;

    constructor(public payload: { id: string }) {}
}

export class DeleteCities implements Action {
    readonly type = CityActionTypes.DeleteCities;

    constructor(public payload: { ids: string[] }) {}
}

export class ClearCities implements Action {
    readonly type = CityActionTypes.ClearCities;
}

export class SearchCities implements Action {
    readonly type = CityActionTypes.SearchCities;

    constructor(public payload: { query: string }) {}
}

export class SelectCity implements Action {
    readonly type = CityActionTypes.SelectCity;

    constructor(public payload: { cityId: string }) {}
}

export class ClearSelectedCity implements Action {
    readonly type = CityActionTypes.ClearSelectedCity;
}

export type CityActions =
    | LoadCities
    | AddCity
    | UpsertCity
    | AddCities
    | UpsertCities
    | UpdateCity
    | UpdateCities
    | DeleteCity
    | DeleteCities
    | ClearCities
    | SearchCities
    | SelectCity
    | ClearSelectedCity;
