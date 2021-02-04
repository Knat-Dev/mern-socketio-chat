import { Box, Button, FormControl, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CenteredFullHeight, FullPage } from '../../components';
import InputField from '../../components/InputField';
import { toErrorMap } from '../../util';

interface Props extends RouteComponentProps {
  setupSocket: () => void;
}

export const Login: FC<Props> = ({ history, setupSocket }) => {
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
            Sign in
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
                    title: 'Success!',
                    description: response.data.message,
                    status: 'success',
                    position: 'bottom-left',
                    duration: 5000,
                    isClosable: true,
                  });
                  sessionStorage.setItem('cc_token', response.data.token);
                  setupSocket();
                  history.push('/');
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
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
                <InputField
                  onBlur={handleBlur}
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                />

                <FormControl mt={4}>
                  <Button type="submit" w="100%" colorScheme="blue">
                    Login
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
          <Text fontSize="sm" align="center">
            Already got an account? click{' '}
            <Text as={Link} color="blue.500" to="/register">
              here
            </Text>
          </Text>
        </Box>
      </CenteredFullHeight>
    </FullPage>
  );
};
