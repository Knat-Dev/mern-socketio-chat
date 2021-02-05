import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Router } from './router';
import { setAccessToken } from './util';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/refresh`, {
      credentials: 'include',
      method: 'POST',
    })
      .then(async (res) => {
        const data = await res.json();
        const { accessToken } = data;
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (loading) return null;

  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
