import { isSelectedCityInFavorites, isImpirial } from './../../reducers/index';
import {
  AddSelectedCityToFavorites,
  RemoveSelectedCityFromFavorites,
} from './../../reducers/favorite.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../../reducers/city.model';
import { Weather } from '../../reducers/weather.model';
import { Store, select } from '@ngrx/store';
import {
  getCurrentCity,
  getSelectedCityWeather,
  getSelectedCityWeatherForcasts,
} from '../../reducers';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppSettings } from 'src/app/reducers/app-settings.model';

@Component({
  selector: 'app-cities-page',
  templateUrl: './cities-page.component.html',
  styleUrls: ['./cities-page.component.scss'],
})
export class CitiesPageComponent implements OnInit {
  selectedCity$: Observable<City>;
  isSelectedCityInFavorites$: Observable<boolean>;
  currentWeather$: Observable<Weather>;
  weatherForecasts$: Observable<Weather[]>;
  isImpirial$: Observable<boolean>;
  title = 'every-weather';

  constructor(
    private cityStore: Store<City>,
    private weatherStore: Store<Weather>,
    private appSettingsStore: Store<AppSettings>
  ) {}

  ngOnInit() {
    this.isImpirial$ = this.appSettingsStore.pipe(select(isImpirial));
    this.selectedCity$ = this.cityStore.pipe(select(getCurrentCity));
    this.isSelectedCityInFavorites$ = this.cityStore.pipe(
      select(isSelectedCityInFavorites),
      distinctUntilChanged()
    );
    this.currentWeather$ = this.weatherStore.pipe(
      select(getSelectedCityWeather)
    );
    this.weatherForecasts$ = this.weatherStore.pipe(
      select(getSelectedCityWeatherForcasts)
    );
  }

  onAddToFavoritesClicked() {
    this.cityStore.dispatch(new AddSelectedCityToFavorites());
  }

  onRemoveFromFavoritesClicked() {
    this.cityStore.dispatch(new RemoveSelectedCityFromFavorites());
  }
}
