import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Weather from './Weather';
import './App.css';

const cli = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<div>Error has happened.</div>}>
        <QueryClientProvider client={cli}>
          <Weather />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
