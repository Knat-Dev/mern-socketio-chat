import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

export const FullPage: FC = ({ children }) => {
  return <Box h="100vh">{children}</Box>;
};
