import styled from "styled-components";

export const StyledCartProductList = styled.div`
   display: flex;
   flex-direction: column;

   ul {
      display: flex;
      flex-direction: column;
      gap: 20px;

      height: 200px;
      overflow: auto;
   }
   
   ul::-webkit-scrollbar {
        width: 7.5px;
    }

    /* Track */
    ul::-webkit-scrollbar-track {
        background: ${({theme}) => theme.colors.gray100};
    }

    /* Handle */
    ul::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.colors.primary};
        border-radius: 4px;
    }

   .totalBox {
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      .total {
         font-weight: 700;
         color: ${({ theme }) => theme.colors.gray300};
      }
   }

   .btnFinalize{
      margin-top: 10px;
   }
`;
