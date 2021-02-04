import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface Props extends RouteComponentProps<{ id: string }> {
  socket: Socket | null;
}

export const Chatroom: FC<Props> = ({ match, socket }) => {
  const chatId = match.params.id;

  return <div>{chatId}</div>;
};
