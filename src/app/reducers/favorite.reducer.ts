import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favorite } from './favorite.model';
import { FavoriteActions, FavoriteActionTypes } from './favorite.actions';

export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<Favorite> {
    // additional entities state properties
}

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
});

export function reducer(state = initialState, action: FavoriteActions): State {
    switch (action.type) {
        case FavoriteActionTypes.AddFavorite: {
            return adapter.addOne(action.payload.favorite, state);
        }

        case FavoriteActionTypes.UpsertFavorite: {
            return adapter.upsertOne(action.payload.favorite, state);
        }

        case FavoriteActionTypes.AddFavorites: {
            return adapter.addMany(action.payload.favorites, state);
        }

        case FavoriteActionTypes.UpsertFavorites: {
            return adapter.upsertMany(action.payload.favorites, state);
        }

        case FavoriteActionTypes.UpdateFavorite: {
            return adapter.updateOne(action.payload.favorite, state);
        }

        case FavoriteActionTypes.UpdateFavorites: {
            return adapter.updateMany(action.payload.favorites, state);
        }

        case FavoriteActionTypes.DeleteFavorite: {
            return adapter.removeOne(action.payload.id, state);
        }

        case FavoriteActionTypes.DeleteFavorites: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case FavoriteActionTypes.LoadFavorites: {
            return adapter.addMany(action.payload.favorites, state);
        }

        case FavoriteActionTypes.ClearFavorites: {
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
