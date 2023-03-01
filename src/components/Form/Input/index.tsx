import { FieldError } from 'react-hook-form';
import { forwardRef, InputHTMLAttributes } from 'react';
import { StyledFieldset } from './style';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';



interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
  type: 'text' | 'password',
  label: string
  error?: FieldError | undefined
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({label, type, error, ...rest}, ref) => {

  console.log("teste")

 return(
      <StyledFieldset>
        <StyledTextField label={label} type={type} {...rest} ref={ref}/>
        {error ? <StyledParagraph fontColor='red'>{error.message}</StyledParagraph> : null}
      </StyledFieldset>
    )
});

export default Input;
