import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Weather } from '../reducers/weather.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { API_KEY } from './consts';

@Injectable({
    providedIn: 'root',
})
export class WeatherApiService {
    constructor(private http: HttpClient) {}

    getCurrentWeather(cityId: string): Observable<Weather> {
        return this.http
            .get<any>(
                `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${API_KEY}`
            )
            .pipe(
                map(apiResult => {
                    const weatherResult = apiResult[0];
                    if (weatherResult) {
                        return {
                            id: Guid.create().toString(),
                            cityId,
                            date: moment().toISOString(),
                            text: weatherResult.WeatherText,
                            temperature: {
                                impirialValue:
                                    weatherResult.Temperature.Imperial.Value,
                                impirialUnit:
                                    weatherResult.Temperature.Imperial.Unit,
                                metricValue:
                                    weatherResult.Temperature.Metric.Value,
                                metricUnit:
                                    weatherResult.Temperature.Metric.Unit,
                            },
                        } as Weather;
                    }
                    return null;
                })
            );
    }

    getCurrentWeatherForMultipleCities(
        cityIds: string[]
    ): Observable<Weather[]> {
        return forkJoin(cityIds.map(cityId => this.getCurrentWeather(cityId)));
    }

    getWeatherForecast(cityId: string): Observable<Weather[]> {
        return this.http
            .get<any>(
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${API_KEY}&metric=true`
            )
            .pipe(
                map(result =>
                    result.DailyForecasts.map(forecast => {
                        return {
                            id: Guid.create().toString(),
                            cityId,
                            text: forecast.Day.IconPhrase,
                            date: forecast.Date,
                            isForecast: true,
                            temperature: {
                                minMetricValue:
                                    forecast.Temperature.Minimum.Value,
                                maxMetricValue:
                                    forecast.Temperature.Maximum.Value,
                            },
                        } as Weather;
                    })
                )
            );
    }
}
