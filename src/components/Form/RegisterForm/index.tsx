import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TRegisterFormValues, registerFormSchema } from './registerFormSchema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext';

const RegisterForm = () => {

  const { userRegister } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema)
  })

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    userRegister(formData)
  }


  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input type="text" id='name' label="Nome" error={errors.name?.message}
      {...register("name")} />
      <Input type="email" id='email' label="Email" error={errors.email?.message}
      {...register("email")} />
      <Input type="password" id='password' label="Senha" error={errors.password?.message} 
      {...register("password")} />
      <Input type="password" id='confirmPassword' label="Confirmar senha" error={errors.confirm?.message}
      {...register("confirm")} />
      <StyledButton type="submit" $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  )
};


export default RegisterForm;
