import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const toErrorMap = (
  errors: { field: string; message: string }[]
): Record<string, string> => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

export const useAuth = () => {
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('cc_token');
    if (!token) history.push('/login');
  }, [history]);
};
