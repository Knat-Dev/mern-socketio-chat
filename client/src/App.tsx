import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Router } from './router';

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
