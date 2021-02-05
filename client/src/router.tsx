import { useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Chatroom, Dashboard, Home, Login, Register } from './pages';

export const Router = () => {
  const toast = useToast();
  const [socket, setSocket] = useState<Socket | null>(null);

  const setUpSocketCallback = useCallback(() => {
    const token = sessionStorage.getItem('cc_token');
    if (token && !socket) {
      const newSocket = io('ws://localhost:5000', {
        query: {
          token: sessionStorage.getItem('cc_token')!,
        },
      });
      setSocket(newSocket);

      newSocket.on('disconnect', () => {
        setSocket(null);
        toast({
          status: 'error',
          position: 'bottom-left',
          duration: 3000,
          title: 'Disconnected!',
          description:
            'You have been disconnected!\nwe will attempt to reconnect you as soon as possible!',
        });
      });

      newSocket.on('connect', () => {
        toast({
          title: 'Connected!',
          description: 'You are now connected to the server via websockets',
          status: 'success',
          position: 'top-left',
          duration: 5000,
          isClosable: true,
        });
      });
    }
  }, [toast]);

  useEffect(() => {
    setUpSocketCallback();
  }, [setUpSocketCallback]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={(props) => (
            <Login setupSocket={setUpSocketCallback} {...props} />
          )}
        />
        <Route
          path="/dashboard"
          render={(props) => <Dashboard socket={socket} {...props} />}
        />
        <Route
          path="/chatroom/:id"
          render={(props) =>
            socket ? <Chatroom socket={socket} {...props} /> : undefined
          }
        />
      </Switch>
    </BrowserRouter>
  );
};
