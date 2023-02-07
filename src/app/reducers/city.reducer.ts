import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { City } from './city.model';
import { CityActions, CityActionTypes } from './city.actions';

export const citiesFeatureKey = 'cities';

export interface State extends EntityState<City> {
    selectedCityId: string;
}

export const adapter: EntityAdapter<City> = createEntityAdapter<City>();

export const initialState: State = adapter.getInitialState({
    selectedCityId: null,
});

export function reducer(state = initialState, action: CityActions): State {
    switch (action.type) {
        case CityActionTypes.AddCity: {
            return adapter.addOne(action.payload.city, state);
        }

        case CityActionTypes.UpsertCity: {
            return adapter.upsertOne(action.payload.city, state);
        }

        case CityActionTypes.AddCities: {
            return adapter.addMany(action.payload.cities, state);
        }

        case CityActionTypes.UpsertCities: {
            return adapter.upsertMany(action.payload.cities, state);
        }

        case CityActionTypes.UpdateCity: {
            return adapter.updateOne(action.payload.city, state);
        }

        case CityActionTypes.UpdateCities: {
            return adapter.updateMany(action.payload.cities, state);
        }

        case CityActionTypes.DeleteCity: {
            return adapter.removeOne(action.payload.id, state);
        }

        case CityActionTypes.DeleteCities: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case CityActionTypes.LoadCities: {
            return adapter.addMany(action.payload.cities, state);
        }

        case CityActionTypes.ClearCities: {
            return adapter.removeAll(state);
        }

        case CityActionTypes.SelectCity: {
            return { ...state, selectedCityId: action.payload.cityId };
        }

        case CityActionTypes.ClearSelectedCity: {
            return { ...state, selectedCityId: null };
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

export const getSelectedCityId = (state: State) => state.selectedCityId;


