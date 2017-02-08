import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './client/store/configureStore';
import Home from './client/modules/pages/home/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path='/' component={ Home }>
          <IndexRoute name="Home" component={ Home } />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
);

module.hot.accept();