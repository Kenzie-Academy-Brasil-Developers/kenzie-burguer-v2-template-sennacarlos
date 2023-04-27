import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext, IAllProducts } from '../../../../providers/CartContext';
import { useContext } from 'react';


interface IProductCardProps {
  product: IAllProducts
}

const CartProductCard = ({ product }: IProductCardProps) => {
  const {productCart, setProductCart} = useContext(CartContext)

  const removeProductCart = () => {
    setProductCart(productCart.filter((element) => element.id !== product.id))
  }

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <button type='button' aria-label='Remover' onClick={removeProductCart}>
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  )
}

export default CartProductCard;
