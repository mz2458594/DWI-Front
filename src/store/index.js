import {configureStore} from '@reduxjs/toolkit'
import userReducer from './users/slice'

const syncWithDatabase = store => next => action => {
    console.log('fase1: ', action, store.getState())
    next(action)
}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(syncWithDatabase)
})
