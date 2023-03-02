import { useContext } from 'react';

import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';

import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { clearCart, currentSale, totalCart } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {currentSale.map((produtc) => (
          <CartProductCard key={produtc.id} product={produtc} />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {totalCart.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        type='button'
        onClick={() => clearCart()}
      >
        Remover todos
      </StyledButton>
      <StyledButton $buttonSize='default' $buttonStyle='green' type='button' className='btnFinalize'>
        Finalizar Compra
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
