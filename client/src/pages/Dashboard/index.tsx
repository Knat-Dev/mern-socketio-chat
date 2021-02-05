import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { CenteredFullHeight, FullPage } from '../../components';
import InputField from '../../components/InputField';
import { ChatRoom } from '../../types';
import { toErrorMap, useAuth } from '../../util';
import axios from '../../util/axios';

interface Props extends RouteComponentProps {
  socket: Socket | null;
}

export const Dashboard: FC<Props> = ({ history, socket }) => {
  useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const toast = useToast();

  const getChatRooms = async () => {
    try {
      const response: AxiosResponse<ChatRoom[]> = await axios.get('/chats');
      if (response?.status === 200) {
        setRooms(response.data);
      }
    } catch (e) {
      console.log('hey');
    }
  };

  const getChatRoomsCallback = useCallback(getChatRooms, []);

  useEffect(() => {
    (async () => {
      try {
        await getChatRoomsCallback();
      } catch (e) {
        console.log('hi');
      }
    })();
  }, [getChatRoomsCallback]);

  return (
    <FullPage>
      <CenteredFullHeight>
        <Box
          w={350}
          mx={2}
          p={4}
          rounded={5}
          boxShadow="0 0 6px 0px rgba(0, 0, 0, 0.205)"
        >
          <Text mb={2} fontSize="3xl" fontWeight="light">
            Create Chat Room
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, actions) => {
              console.log(values);
              const { email, password } = values;
              try {
                const response = await axios.post('/users/login', {
                  email,
                  password,
                });
                if (response.data.errors)
                  actions.setErrors(toErrorMap(response.data.errors));
                else {
                  toast({
                    title: 'You are connected!.',
                    description: response.data.message,
                    status: 'success',
                    position: 'top-left',
                    duration: 5000,
                    isClosable: true,
                  });
                  history.push('/login');
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <InputField
                  onBlur={handleBlur}
                  name="name"
                  label="Name"
                  placeholder="Room Name"
                />

                <FormControl mt={4}>
                  <Button type="submit" w="100%" colorScheme="blue">
                    CREATE ROOM
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
          <Box id="channels" mt={4}>
            {rooms.map((room) => (
              <Flex
                my={2}
                _last={{ marginBottom: 0 }}
                key={room._id}
                justify="space-between"
              >
                <Text>{room.name}</Text>
                <Button
                  as={Link}
                  to={`/chatroom/${room._id}`}
                  size="xs"
                  colorScheme="blue"
                >
                  JOIN
                </Button>
              </Flex>
            ))}
          </Box>
        </Box>
      </CenteredFullHeight>
    </FullPage>
  );
};
