import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// redux-toolkit
import { Provider } from 'react-redux';
import { store } from './store.ts';
// for miui theme
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.ts';
import {CssBaseline} from '@mui/material'
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
