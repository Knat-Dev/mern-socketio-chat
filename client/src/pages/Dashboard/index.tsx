import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CenteredFullHeight, FullPage } from '../../components';
import InputField from '../../components/InputField';
import { toErrorMap } from '../../util';

export const Dashboard: FC<RouteComponentProps> = ({ history }) => {
  const toast = useToast();

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
                    position: 'bottom-left',
                    duration: 9000,
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
            <Flex justify="space-between">
              <Text>Room #1</Text>
              <Button size="xs" colorScheme="blue">
                JOIN
              </Button>
            </Flex>
          </Box>
        </Box>
      </CenteredFullHeight>
    </FullPage>
  );
};
