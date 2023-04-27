import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

const ProductList = () => {
  const { allProducts } = useContext(CartContext)
  return (
    <StyledProductList>
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </StyledProductList>
  )
}


export default ProductList;
