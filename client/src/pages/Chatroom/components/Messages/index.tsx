import { Flex, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Message } from '../../../../types';

interface Props {
  messages: Message[];
}

export const Messages: FC<Props> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <Flex key={message._id}>
          <Text color="blue.600" mr={2}>
            {message.user.name}
          </Text>
          <Text>{message.message}</Text>
        </Flex>
      ))}
    </div>
  );
};
