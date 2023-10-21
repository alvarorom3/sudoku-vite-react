import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { APP_BG } from './constants/styleValues';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: APP_BG,
      }
    },
  },
});


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
)
