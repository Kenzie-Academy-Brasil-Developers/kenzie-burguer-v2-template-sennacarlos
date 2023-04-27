import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext, IAllProducts } from '../../../providers/CartContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

interface IProductCardProps {
  product: IAllProducts
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { productCart, setProductCart} = useContext(CartContext)

  const addProductToCart = () => {
    const newCartList = productCart.some(element => element.id === product.id)
    newCartList ? (
      toast.success("Esse produto já foi adicionado")
    ) : (
      setProductCart([...productCart, product])
    )
  }

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>{product.category}</StyledParagraph>
        <StyledParagraph className='price'>{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</StyledParagraph>
        <StyledButton $buttonSize='medium' $buttonStyle='green' onClick={addProductToCart}>
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  )
}

export default ProductCard;
