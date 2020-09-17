import styled from 'styled-components';

export const Container = styled.footer`
  min-height: 200px;
  padding: 16px;

  background: ${props => props.theme.colors.backgroundSecondary};
  border-top: 1px solid ${props => props.theme.colors.lines};

  display: flex;
  justify-content: center;
  align-content: center;

  @media (max-width: 425px) {
    min-height: 100px;
  }
`;
