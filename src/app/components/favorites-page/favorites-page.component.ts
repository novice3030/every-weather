import { AddCity } from './../../reducers/city.actions';
import { selectFavorites, getWeatherByCityId, isImpirial } from './../../reducers/index';
import {
    LoadFavoritesPage,
    LoadFavoritesFromLocalStorage,
} from './../../reducers/favorite.actions';
import { Weather } from './../../reducers/weather.model';
import { Observable } from 'rxjs';
import { Favorite } from './../../reducers/favorite.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SelectCity } from 'src/app/reducers/city.actions';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/reducers/app-settings.model';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
    favorites$: Observable<Favorite[]>;
    isImpirial$: Observable<boolean>;
    constructor(
        private favoriteStore: Store<Favorite>,
        private weatherStore: Store<Weather>,
        private appSettingsStore: Store<AppSettings>,
        private router: Router
    ) {}

    ngOnInit() {
      this.isImpirial$ = this.appSettingsStore.pipe(select(isImpirial));  
      this.favoriteStore.dispatch(new LoadFavoritesPage());
        this.favorites$ = this.favoriteStore.pipe(select(selectFavorites));
    }

    getWeatherByCityId(cityId: string) {
        return this.weatherStore.pipe(select(getWeatherByCityId, { cityId }));
    }

    onWeatherCardClicked(favorite: Favorite) {
        this.favoriteStore.dispatch(
            new AddCity({
                city: {
                    id: favorite.id,
                    name: favorite.cityName,
                },
            })
        );
        this.favoriteStore.dispatch(new SelectCity({ cityId: favorite.id }));
        this.router.navigateByUrl('/');
    }
}
