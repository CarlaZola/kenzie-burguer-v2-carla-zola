import styled from "styled-components";

export const StyledCartProductCard = styled.li`
   display: flex;
   align-items: center;
   gap: 10px;

   .imageBox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: ${({ theme }) => theme.colors.gray100};

      img {
         width: 80px;
         height: 80px;
         object-fit: contain;
      }

      @media (max-width: 450px){
         width: 40px;
         height: 40px;
         
         img{
            width: 40px;
            height: 40px;
         }
      }
   }

   .contentBox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      align-items: center;
      gap: 20px;

      button{
        background: transparent;
        opacity: .4;
        transition: .4s;

        :hover{
            opacity: .7;
        }
      }

      .contentPrice{
         font-weight: 600;
         color: ${({ theme }) => theme.colors.primary};
         
      }
      .contentQuantitites{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.25rem;
            height: 2.125rem;
            border: 1px solid ${({ theme }) => theme.colors.primary};
            border-radius: .1875rem;
            width: 4.375rem;
            cursor: pointer;

            .quantities{
               font-weight: 600;
            }
      }

}
  
`;
