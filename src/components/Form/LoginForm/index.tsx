import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { TLoginFormValues, loginFormSchema } from './loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext';

const LoginForm = () => {
  const { userLogin } = useContext(UserContext)

  const { 
    register,
    handleSubmit,
    formState: {errors}
  } 
  = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema)
  })

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    userLogin(formData)
  }

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input type="email" id='login' label="Email" error={errors.email?.message}
      {...register("email")} />
      <Input type="password" id='senha' label="Senha" error={errors.password?.message}
      {...register("password")}/>
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  )
}


export default LoginForm;
