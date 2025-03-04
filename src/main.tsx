import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '~/styles/globalStyle.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from './store';
import { App } from './App';

const queryClient = new QueryClient();

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
}
