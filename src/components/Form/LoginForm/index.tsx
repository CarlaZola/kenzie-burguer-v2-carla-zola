import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';

import { IUserLoginForm, UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { schemaLogin } from '../../../utils/schema';


const LoginForm = () => {

  const {register, handleSubmit, reset, formState: { errors }} = useForm<IUserLoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(schemaLogin)
  })

  const { userLogin } = useContext(UserContext)


  const submitLogin: SubmitHandler<IUserLoginForm> = (data) => {
      userLogin(data)
      reset()
  }
  
  return(
      <StyledForm onSubmit={handleSubmit(submitLogin)}>
      <Input 
        type='text'
        label='Email'
        {...register('email')}
        error={errors.email}
      />
      <Input 
        type='password'
        label='Email'
        {...register('password')}
        error={errors.password}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  )
};

export default LoginForm;
