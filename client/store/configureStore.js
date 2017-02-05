import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk))
  
  if (module.hot) {
    module.hot.accept('../reducers/reducers', () => {
      const nextRootReducer = require('../reducers/reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  
  return store
}