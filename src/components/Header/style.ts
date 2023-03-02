import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.gray0};
  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    .logo {
      max-width: 160px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        button {
          background: transparent;
          color: ${({ theme }) => theme.colors.gray150};
          transition: 0.3s;
          position: relative;

          :hover {
            color: ${({ theme }) => theme.colors.gray300};
          }
        }
        .counter{
          position: absolute;
          top: -10px;
          right: -5px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          background-color: ${({ theme }) => theme.colors.primary};
          clip-path: circle();
          color: ${({ theme }) => theme.colors.white};
          font-weight: 700;
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }

    @media (max-width: 450px) {
      .nav {
        flex-direction: column;
      }
    }
  }
`;
