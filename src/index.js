import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import createStore from './reducks/store/store';
import * as serviceWorker from './serviceWorker';
import './assets/reset.css';
import './assets/style.css';
import { ThemeProvider } from '@material-ui/core/styles'; // 修正した箇所
import { theme } from './assets/theme'; 
import App from './App.jsx';

const history = History.createBrowserHistory();
export const store = createStore(history);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}> {/* 修正した箇所 */}
                <App />
            </ThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.register();
