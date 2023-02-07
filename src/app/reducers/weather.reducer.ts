import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Weather } from './weather.model';
import { WeatherActions, WeatherActionTypes } from './weather.actions';

export const weathersFeatureKey = 'weathers';

export interface State extends EntityState<Weather> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Weather> = createEntityAdapter<Weather>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: WeatherActions): State {
  switch (action.type) {
    case WeatherActionTypes.AddWeather: {
      return adapter.addOne(action.payload.weather, state);
    }

    case WeatherActionTypes.UpsertWeather: {
      return adapter.upsertOne(action.payload.weather, state);
    }

    case WeatherActionTypes.AddWeathers: {
      return adapter.addMany(action.payload.weathers, state);
    }

    case WeatherActionTypes.UpsertWeathers: {
      return adapter.upsertMany(action.payload.weathers, state);
    }

    case WeatherActionTypes.UpdateWeather: {
      return adapter.updateOne(action.payload.weather, state);
    }

    case WeatherActionTypes.UpdateWeathers: {
      return adapter.updateMany(action.payload.weathers, state);
    }

    case WeatherActionTypes.DeleteWeather: {
      return adapter.removeOne(action.payload.id, state);
    }

    case WeatherActionTypes.DeleteWeathers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case WeatherActionTypes.LoadWeathers: {
      return adapter.addMany(action.payload.weathers, state);
    }

    case WeatherActionTypes.ClearWeathers: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
