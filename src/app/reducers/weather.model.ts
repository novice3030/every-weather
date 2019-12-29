export interface Weather {
    id: string;
    cityId: string;
    date: string;
    text: string;
    temperature: Temperature;
    isForecast: boolean;
}

export interface Temperature {
    metricValue?: number;
    metricUnit: string;
    impirialValue?: number;
    impirialUnit: string;
    minMetricValue?: number;
    maxMetricValue?: number;
}
