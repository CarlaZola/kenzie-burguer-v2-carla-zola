import { useContext } from 'react';

import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';
import { StyledTitle } from '../../styles/typography';


const ProductList = () => {

  const { searchProducts } = useContext(CartContext)

  return(
      <StyledProductList>
            {
            searchProducts?.map((produtc) => (<ProductCard product={produtc} key={produtc.id}/>))  
            }
       </StyledProductList> 
    
  )
}
 

export default ProductList;
