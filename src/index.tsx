import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
    <HelmetProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            ,
        </Provider>
    </HelmetProvider>,
    document.getElementById('root'),
);
