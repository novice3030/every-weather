import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import * as fromCity from '../reducers/city.reducer';
import { environment } from '../../environments/environment';
import * as fromWeather from '../reducers/weather.reducer';
import * as fromAppSettings from '../reducers/app-settings.reducer';
import * as fromFavorite from '../reducers/favorite.reducer';
import { Dictionary } from '@ngrx/entity';
import { Weather } from './weather.model';

export interface State {}

export const reducers: ActionReducerMap<State> = {
    cities: fromCity.reducer,
    weathers: fromWeather.reducer,
    appSettings: fromAppSettings.reducer,
    favorites: fromFavorite.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const selectCityState = createFeatureSelector<fromCity.State>('cities');

export const selectWeatherState = createFeatureSelector<fromWeather.State>(
    'weathers'
);

export const selectAppSettings = createFeatureSelector<fromAppSettings.State>(
    'appSettings'
);

export const selectFavoriteState = createFeatureSelector<fromFavorite.State>(
    'favorites'
);

export const selectFavorites = createSelector(
    selectFavoriteState,
    fromFavorite.selectAll
);

export const selectFavoriteIds = createSelector(
    selectFavoriteState,
    fromFavorite.selectIds
);

export const selectCities = createSelector(selectCityState, fromCity.selectAll);

export const selectCurrentCityId = createSelector(
    selectCityState,
    fromCity.getSelectedCityId
);

export const selectCityEntities = createSelector(
    selectCityState,
    fromCity.selectEntities
);

export const selectWeatherEntities = createSelector(
    selectWeatherState,
    fromWeather.selectEntities
);

export const getCurrentCity = createSelector(
    selectCityEntities,
    selectCurrentCityId,
    (cityEntities, cityId) => cityEntities[cityId]
);

export const selectAllWeathers = createSelector(
    selectWeatherState,
    fromWeather.selectAll
);

export const getSelectedCityWeather = createSelector(
    selectAllWeathers,
    selectCurrentCityId,
    (weathers, cityId) =>
        weathers.find(
            weather => weather.cityId === cityId && !weather.isForecast
        )
);

export const getSelectedCityWeatherForcasts = createSelector(
    selectAllWeathers,
    selectCurrentCityId,
    (weathers, cityId) =>
        weathers.filter(
            weather => weather.cityId === cityId && weather.isForecast
        )
);

export const getWeatherByCityId = createSelector(
    selectAllWeathers,
    (weathers, props) =>
        weathers.find(weather => weather.cityId === props.cityId)
);

export const isSelectedCityInFavorites = createSelector(
    selectFavoriteIds,
    selectCurrentCityId,
    (ids: string[], cityId) => {
        if (cityId && ids && ids.length > 0) {
            return ids.includes(cityId);
        }
        return false;
    }
);
