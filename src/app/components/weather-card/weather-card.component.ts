import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Weather } from '../../reducers/weather.model';
import { City } from '../../reducers/city.model';

@Component({
    selector: 'app-weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
    @Input() weather: Weather;
    @Input() cityName: string;
    @Input() clickable = false;
    @Output() cardClick = new EventEmitter<Weather>()
    constructor() {}

    ngOnInit() {}

    onWeatherCardClicked() {
        this.cardClick.emit(this.weather);
    }
}