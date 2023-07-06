import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import RootStore from './stores/root';

const rootStore = new RootStore();

export const StoreProvider = createContext<any>(null);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider.Provider value={rootStore}>
        <App />
      </StoreProvider.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
