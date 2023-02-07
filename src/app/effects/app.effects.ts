import {
  FavoriteActionTypes,
  LoadFavorites,
  SaveFavoritesToLocalStorage,
  AddFavorite,
  DeleteFavorite,
} from './../reducers/favorite.actions';
import { WeatherApiService } from './../api-services/weather-api.service';
import {
  WeatherActionTypes,
  GetCityCurrentWeather,
  LoadWeathers,
  AddWeathers,
  GetCityWeatherForecast,
  ClearWeathers,
} from './../reducers/weather.actions';
import { CitiesApiService } from '../api-services/cities-api.service';
import {
  CityActionTypes,
  SearchCities,
  LoadCities,
  SelectCity,
} from './../reducers/city.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { City } from '../reducers/city.model';
import {
  selectFavorites,
  getCurrentCity,
  selectFavoriteIds,
  selectCurrentCityId,
} from '../reducers';
import { Favorite } from '../reducers/favorite.model';

@Injectable()
export class AppEffects {
  // Search cities using the api and load them to the store
  searchCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActionTypes.SearchCities),
      mergeMap((action: SearchCities) =>
        this.citiesApiService
          .searchCities(action.payload.query)
          .pipe(map(cities => new LoadCities({ cities })))
      )
    )
  );

  // gets the weather for the selected city from the api and loads it to the store
  getCityCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActionTypes.GetCityCurrentWeather),
      mergeMap((action: GetCityCurrentWeather) =>
        this.weatherApiService
          .getCurrentWeather(action.payload.cityId)
          .pipe(map(weather => new LoadWeathers({ weathers: [weather] })))
      )
    )
  );

  // gets the forecastes for a city from the api and add them to the store
  getCityWeatherForcast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActionTypes.GetCityWeatherForecast),
      mergeMap((action: GetCityWeatherForecast) =>
        this.weatherApiService
          .getWeatherForecast(action.payload.cityId)
          .pipe(map(weathers => new AddWeathers({ weathers })))
      )
    )
  );

  // when city is selected get new weather data for that city from the api and load to it the the store
  citySelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActionTypes.SelectCity),
      mergeMap((action: SelectCity) => [
        new ClearWeathers(),
        new GetCityCurrentWeather({ cityId: action.payload.cityId }),
        new GetCityWeatherForecast(action.payload),
      ])
    )
  );

  // saves favorites cities from the store to local storage

  saveFavoritesToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActionTypes.SaveFavoritesToLocalStorage),
        withLatestFrom(this.cityStore.pipe(select(selectFavorites))),
        map(([, favorites]) =>
          window.localStorage.setItem('favorites', JSON.stringify(favorites))
        )
      ),
    { dispatch: false }
  );

  // load favorites from local storage and load them to the store

  loadFavoritesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.LoadFavoritesFromLocalStorage),
      map(() => {
        const favorites: Favorite[] = JSON.parse(
          window.localStorage.getItem('favorites')
        );
        if (favorites && favorites.length > 0) {
          return new LoadFavorites({ favorites });
        }
        return new LoadFavorites({ favorites: [] });
      })
    )
  );

  // when a favorite is added to the store save the favorites to local storage

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.AddFavorite),
      mergeMap(() => [new SaveFavoritesToLocalStorage()])
    )
  );

  // add the selected city to the favorites store

  addSelectedCityToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.AddSelectedCityToFavorites),
      withLatestFrom(this.cityStore.pipe(select(getCurrentCity))),
      map(
        ([, selectedCity]) =>
          new AddFavorite({
            favorite: {
              id: selectedCity.id,
              cityName: selectedCity.name,
            },
          })
      )
    )
  );

  // loads the favorites page data from the api

  loadFavoritesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.LoadFavoritesPage),
      withLatestFrom(this.favoriteStore.pipe(select(selectFavoriteIds))),
      mergeMap(([, ids]) =>
        this.weatherApiService
          .getCurrentWeatherForMultipleCities(ids as string[])
          .pipe(map(weathers => new LoadWeathers({ weathers })))
      )
    )
  );

  // remove the selected city from the store

  removeSelectedCityFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.RemoveSelectedCityFromFavorites),
      withLatestFrom(this.cityStore.pipe(select(selectCurrentCityId))),
      map(([, selectedCityId]) => new DeleteFavorite({ id: selectedCityId }))
    )
  );

  // when a favorite is removed save the favorites to local storage

  deleteFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActionTypes.DeleteFavorite),
      mergeMap(() => [new SaveFavoritesToLocalStorage()])
    )
  );

  constructor(
    private actions$: Actions,
    private citiesApiService: CitiesApiService,
    private weatherApiService: WeatherApiService,
    private cityStore: Store<City>,
    private favoriteStore: Store<Favorite>
  ) {}
}
