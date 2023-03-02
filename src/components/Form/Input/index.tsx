import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { InputHTMLAttributes } from 'react';
import { StyledFieldset } from './style';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password';
  label: string;
  error?: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
}

const Input = ({ label, type, error, register }: IInputProps) => (
  <StyledFieldset>
    <StyledTextField label={label} type={type} {...register} />
    {error ? (
      <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>
    ) : null}
  </StyledFieldset>
);

export default Input;
