import styled from 'styled-components';

export const StyledShopPage = styled.div`
  main {
    padding: 20px 0;

    .contentSearchResults{
      display: flex;
      gap: 16px;
      /* padding: 0 2rem; */
      margin-bottom: 2rem;
      text-align: center;
      align-items: center;

      .textSearch{
        font-size: 20px;
        font-weight: bold;
        background-color: ${({ theme }) => theme.colors.gray0};
        padding: 0 .5rem;
        border-radius: .25rem;
      }
    }
  }
`;
