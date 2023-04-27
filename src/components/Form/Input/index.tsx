import { forwardRef } from 'react';
import { StyledInputContainer } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label?: string
  error?: string
  type: "text" | "email" | "password"
  id: string
}


const Input = forwardRef<HTMLInputElement, IInputProps>(({ label, id, type, error, ...rest }: IInputProps, ref) => (
  <div>
    <StyledInputContainer>
      <input type={type} id={id} placeholder='' ref={ref} {...rest}/>
      <label htmlFor={id}>{label}</label>
    </StyledInputContainer>
    {error ? <StyledParagraph fontColor='red'>{error}</StyledParagraph> : null}
    {/* <StyledParagraph fontColor='red'>Erro</StyledParagraph> */}
  </div>
));

export default Input;
