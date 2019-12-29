import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Weather } from './weather.model'

export enum WeatherActionTypes {
    LoadWeathers = '[Weather] Load Weathers',
    AddWeather = '[Weather] Add Weather',
    UpsertWeather = '[Weather] Upsert Weather',
    AddWeathers = '[Weather] Add Weathers',
    UpsertWeathers = '[Weather] Upsert Weathers',
    UpdateWeather = '[Weather] Update Weather',
    UpdateWeathers = '[Weather] Update Weathers',
    DeleteWeather = '[Weather] Delete Weather',
    DeleteWeathers = '[Weather] Delete Weathers',
    ClearWeathers = '[Weather] Clear Weathers',
    GetCityCurrentWeather = '[Weather] Get City Current Weather',
    GetCityWeatherForecast = '[Weather] Get City Weather Forecast',
}

export class LoadWeathers implements Action {
    readonly type = WeatherActionTypes.LoadWeathers

    constructor(public payload: { weathers: Weather[] }) {}
}

export class AddWeather implements Action {
    readonly type = WeatherActionTypes.AddWeather

    constructor(public payload: { weather: Weather }) {}
}

export class UpsertWeather implements Action {
    readonly type = WeatherActionTypes.UpsertWeather

    constructor(public payload: { weather: Weather }) {}
}

export class AddWeathers implements Action {
    readonly type = WeatherActionTypes.AddWeathers

    constructor(public payload: { weathers: Weather[] }) {}
}

export class UpsertWeathers implements Action {
    readonly type = WeatherActionTypes.UpsertWeathers

    constructor(public payload: { weathers: Weather[] }) {}
}

export class UpdateWeather implements Action {
    readonly type = WeatherActionTypes.UpdateWeather

    constructor(public payload: { weather: Update<Weather> }) {}
}

export class UpdateWeathers implements Action {
    readonly type = WeatherActionTypes.UpdateWeathers

    constructor(public payload: { weathers: Update<Weather>[] }) {}
}

export class DeleteWeather implements Action {
    readonly type = WeatherActionTypes.DeleteWeather

    constructor(public payload: { id: string }) {}
}

export class DeleteWeathers implements Action {
    readonly type = WeatherActionTypes.DeleteWeathers

    constructor(public payload: { ids: string[] }) {}
}

export class ClearWeathers implements Action {
    readonly type = WeatherActionTypes.ClearWeathers
}

export class GetCityCurrentWeather implements Action {
    readonly type = WeatherActionTypes.GetCityCurrentWeather

    constructor(public payload: { cityId: string }) {}
}

export class GetCityWeatherForecast implements Action {
    readonly type = WeatherActionTypes.GetCityWeatherForecast

    constructor(public payload: { cityId: string }) {}
}

export type WeatherActions =
    | LoadWeathers
    | AddWeather
    | UpsertWeather
    | AddWeathers
    | UpsertWeathers
    | UpdateWeather
    | UpdateWeathers
    | DeleteWeather
    | DeleteWeathers
    | ClearWeathers
    | GetCityCurrentWeather
    | GetCityWeatherForecast
