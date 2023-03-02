import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    list-style: none;
    text-decoration: none;
  }

  body::-webkit-scrollbar {
        width: 7.5px;
    }

    /* Track */
    body::-webkit-scrollbar-track {
        background: ${({theme}) => theme.colors.gray100};
    }

    /* Handle */
    body::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.colors.primary};
        border-radius: 4px;
    }

  button{
    cursor: pointer;
  }

  dialog{
    display: unset;
    position: unset;
  }
`;
