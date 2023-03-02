import { useForm, SubmitHandler } from 'react-hook-form' 

import { useContext } from 'react';

import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext';

export interface ISearch{
  product: string,
}

const SearchForm = () => {

  const { selectedItems } = useContext(CartContext)

  const {register, handleSubmit, reset} = useForm<ISearch>()

  const submitSearch: SubmitHandler<ISearch> = ( data ) => {
    selectedItems(data)
    reset()
  }
  return(
    <StyledSearchForm onSubmit={handleSubmit(submitSearch)}>
    <input type='text' placeholder='Digitar pesquisa' {...register("product")}/>
    <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
      <MdSearch />
    </StyledButton>
  </StyledSearchForm>
  )
}

export default SearchForm;
