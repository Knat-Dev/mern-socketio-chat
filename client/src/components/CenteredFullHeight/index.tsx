import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

export const CenteredFullHeight: FC = ({ children }) => {
  return (
    <Flex h="100%" justify="center" align="center">
      {children}
    </Flex>
  );
};
