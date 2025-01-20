import { QueryClient, QueryClientProvider } from 'react-query';
import Weather from './Weather';
import './App.css';

const cli = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={cli}>
      <Weather />
    </QueryClientProvider>
  );
}

export default App;
