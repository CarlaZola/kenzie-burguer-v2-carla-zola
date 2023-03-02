import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';

import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';

import { CartContext } from '../../providers/CartContext';
import { StyledButton } from '../../styles/button';
import { StyledParagraph, StyledTitle } from '../../styles/typography';


const ShopPage = () => {

  const { itemName, clearSearch, searchProducts } =useContext(CartContext)

  return(
    <StyledShopPage>
    <ToastContainer />
    <CartModal />
    <Header />
    <main>
      <StyledContainer containerWidth={1300}>
        {itemName ? <div className='contentSearchResults'>
          <StyledParagraph className='textSearch' >Resultado da busca: {itemName}</StyledParagraph>
        <StyledButton $buttonSize='medium' $buttonStyle='green' type='button' onClick={() => clearSearch()}>Limpar</StyledButton>
        </div> : null}
       { searchProducts?.length !== 0 ?
       <ProductList /> : <StyledTitle   $fontSize='one' tag='h1' textAlign='center'>Nehhum produtos encontrado</StyledTitle>  }
      </StyledContainer>
    </main>
  </StyledShopPage>
  )
}
 

export default ShopPage;
