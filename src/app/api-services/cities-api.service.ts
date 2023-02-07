import { API_KEY } from './consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../reducers/city.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CitiesApiService {
  constructor(private http: HttpClient) {}

  searchCities(searchQuery: string): Observable<City[]> {
    return this.http
      .get<City[]>(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchQuery}`
      )
      .pipe(
        map((results: any[]) =>
          results.map(result => {
            return {
              name: result.LocalizedName,
              id: result.Key,
            };
          })
        )
      );
  }
}
