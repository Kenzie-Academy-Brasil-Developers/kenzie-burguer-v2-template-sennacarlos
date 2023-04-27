import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useContext } from 'react';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { productCart, setProductCart} = useContext(CartContext)

  const totalCart = productCart.reduce((previousValue, product) => {
    return previousValue + product.price
  }, 0)

  const removeAllProducts = () => {
    setProductCart([])
  }

  return (
    <StyledCartProductList>
      <ul>
        {productCart.map((product) => (
          <CartProductCard key={product.id} product={product}/>
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>{totalCart.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray' onClick={removeAllProducts}>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
    )
}

export default CartProductList;
