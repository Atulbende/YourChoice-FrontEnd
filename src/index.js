import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/common/main.scss';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store, persistedStore } from './redux/store/store';
import Loader from './components/common/loader/Loader';
import SecureRoutes from './routes/SecureRoutes';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'good-morning';
    localStorage.setItem('theme', theme);
    document.body.classList.add(theme);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
          <SecureRoutes />
          <ToastContainer />
          <Loader />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
