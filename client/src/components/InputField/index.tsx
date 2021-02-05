import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  variant?: 'input' | 'textarea';
};

const InputField: React.FC<Props> = (props) => {
  const [field, { error }] = useField(props.name);

  return (
    <FormControl isInvalid={!!error}>
      {props.label && <FormLabel htmlFor={field.name}>{props.label}</FormLabel>}
      {props.variant === 'textarea' ? (
        <Textarea {...field} type={props.type} id={field.name} />
      ) : (
        <Input
          {...field}
          type={props.type}
          id={field.name}
          autoFocus={props.autoFocus}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
