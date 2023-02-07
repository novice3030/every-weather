import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Favorite } from './reducers/favorite.model';
import { LoadFavoritesFromLocalStorage } from './reducers/favorite.actions';
import { AddCity, SelectCity } from './reducers/city.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        private router: Router,
        private favoriteStore: Store<Favorite>
    ) {
        this.favoriteStore.dispatch(new LoadFavoritesFromLocalStorage());
        this.favoriteStore.dispatch(
            new AddCity({
                city: {
                    id: '215854',
                    name: 'Tel Aviv',
                },
            })
        );
        this.favoriteStore.dispatch(new SelectCity({ cityId: '215854' }));
    }

    onCitiesWeatherClicked() {
        this.router.navigateByUrl('/');
    }

    onFavoritesClicked() {
        this.router.navigateByUrl('/favorites');
    }
}
