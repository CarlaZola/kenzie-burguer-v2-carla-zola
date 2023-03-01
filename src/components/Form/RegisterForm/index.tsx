import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';

import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import {  IUserRegisterForm, UserContext } from '../../../providers/UserContext';
import { schemaRegister } from '../../../utils/schema';


const RegisterForm = () => {

  const {
    register, handleSubmit,  reset, formState: { errors }, } = useForm<IUserRegisterForm>({
    resolver: yupResolver(schemaRegister),
    mode: 'onBlur',
  });

  const { userRegister } = useContext(UserContext)

  const submit: SubmitHandler<IUserRegisterForm> = (data) => {
    userRegister(data)
    reset()
  };
  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Nome'
        {...register('name')}
        error={errors.name}
      />
      <Input
        type='text'
        label='Email'
        {...register('email')}
        error={errors.email}
      />
      <Input
        type='password'
        label='Senha'
        {...register('password')}
        error={errors.password}
      />
      <Input
        type='password'
        label='Confirmação de Senha'
        {...register('confirmPassword')}
        error={errors.confirmPassword}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};
export default RegisterForm;
