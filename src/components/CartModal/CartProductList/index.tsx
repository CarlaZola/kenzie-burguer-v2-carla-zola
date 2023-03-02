import { useContext } from 'react';

import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';

import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {

  const { clearCart, currentSale } = useContext(CartContext)

  return(
    <StyledCartProductList>
    <ul>
        {currentSale.map((produtc) => (< CartProductCard key={produtc.id} product={produtc}/>))}
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>R$ 14,00</StyledParagraph>
    </div>
    
    <StyledButton $buttonSize='default' $buttonStyle='gray' type='button' onClick={() => clearCart()}>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
  )
}


export default CartProductList;
