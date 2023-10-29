import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {UsersReducer} from '../users/reducers'
import {ProductsReducer} from '../products/reducers'
import thunk from 'redux-thunk';


export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
            )
    )
}