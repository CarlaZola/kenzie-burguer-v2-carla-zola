import { MdDelete } from 'react-icons/md';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

import { useContext } from 'react';

import { StyledCartProductCard } from './style';
import { StyledParagraph, StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../providers/CartContext';
import { IProductProps } from '../../../ProductList/ProductCard';

const CartProductCard = ({ product }: IProductProps) => {
  const {
    removeProductsInCart,
    changeQuantityInCart,
    removeAllPrductsSame,
    itemTotal,
  } = useContext(CartContext);

  const value = itemTotal(product);

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='contentPrice'>
          {value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </StyledParagraph>
        <div className='controlSale'>
          <div className='contentQuantitites'>
            <GrFormAdd
              className='btn more'
              onClick={() => changeQuantityInCart(product)}
            />
            <StyledParagraph className='quantities'>
              {product.quantities}
            </StyledParagraph>
            <GrFormSubtract
              className='btn less'
              onClick={() => removeProductsInCart(product)}
            />
          </div>
        </div>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeAllPrductsSame(product)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
