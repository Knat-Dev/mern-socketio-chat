import { Box, Button, FormControl, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CenteredFullHeight, FullPage } from '../../components';
import InputField from '../../components/InputField';
import { toErrorMap } from '../../util';

export const Register: FC<RouteComponentProps> = ({ history }) => {
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
            Sign Up
          </Text>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={async (values, actions) => {
              console.log(values);
              const { name, email, password } = values;
              try {
                const response = await axios.post('/users/register', {
                  name,
                  email,
                  password,
                });
                if (response.data.errors)
                  actions.setErrors(toErrorMap(response.data.errors));
                else {
                  toast({
                    title: 'Account created!.',
                    description: response.data.message,
                    status: 'success',
                    position: 'bottom-left',
                    duration: 5000,
                    isClosable: true,
                  });
                  history.push('/login');
                }
              } catch (e) {
                if (e.code === 400) console.log('hi');
                console.log(e.statusCode);
              }
            }}
          >
            {({ handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <InputField
                  onBlur={handleBlur}
                  name="name"
                  label="Name"
                  placeholder="Name"
                />
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
                    Register
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
          <Text fontSize="sm" align="center">
            Don't have an account? click{' '}
            <Text as={Link} color="blue.500" to="/login">
              here
            </Text>
          </Text>
        </Box>
      </CenteredFullHeight>
    </FullPage>
  );
};
