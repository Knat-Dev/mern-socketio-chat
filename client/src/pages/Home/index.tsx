import { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const Home: FC<RouteComponentProps> = ({ history }) => {
  useEffect(() => {
    const token = sessionStorage.getItem('cc_token');
    if (token) history.push('/dashboard');
    else history.push('/login');
  }, [history]);
  return null;
};
