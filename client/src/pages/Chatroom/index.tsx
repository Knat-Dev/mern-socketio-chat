import { Flex, FormControl, Grid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { FullPage } from '../../components';
import InputField from '../../components/InputField';
import { Message } from '../../types';
import { useAuth } from '../../util';
import { Messages } from './components';

interface Props extends RouteComponentProps<{ id: string }> {
  socket: Socket | null;
}

export const Chatroom: FC<Props> = ({ match, socket }) => {
  useAuth();
  const id = match.params.id;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket?.emit('joinRoom', {
        id,
      });

      return () => {
        socket?.emit('leaveRoom', { id });
      };
    }
  }, []);

  useEffect(() => {
    socket?.on('newMessage', (message: Message) => {
      console.log(message);
      setMessages([...messages, message]);
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [messages]);

  return (
    <FullPage>
      <Grid h="100%" templateRows="auto 56px" px={2}>
        <Flex flexDir="column-reverse">
          <Messages messages={messages} />
        </Flex>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={(values, actions) => {
            socket?.emit('newChatRoomMessage', {
              message: values.message,
              chatRoomId: id,
            });
            actions.setFieldValue('message', '');
          }}
        >
          {({ handleBlur }) => (
            <Form>
              <FormControl py="8px">
                <InputField
                  autoComplete="off"
                  autoFocus
                  onBlur={handleBlur}
                  name="message"
                />
              </FormControl>
            </Form>
          )}
        </Formik>
      </Grid>
    </FullPage>
  );
};
