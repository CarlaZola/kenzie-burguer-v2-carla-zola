import { useContext } from 'react';

import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext, Product } from '../../../providers/CartContext';

export interface IProductProps {
  product: Product;
}

const ProductCard = ({ product }: IProductProps) => {
  const { addProductsInCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          type='button'
          onClick={() => addProductsInCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
