import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
`;

export const Container = styled.main`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem;

  background: ${props => props.theme.colors.background};

  min-height: calc(100vh - (1.4rem * 2) - 200px);  

  h1 {
    margin-bottom: 1.6rem;
    color: ${props => props.theme.colors.primary};
    /* border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: 1rem; */    
  }

  @media (max-width: 425px) {
    width: 100%;
    border: 0;
    margin-top: 64px;
    padding: 2rem;

    h1 {
      border-left: 0px solid ${props => props.theme.colors.primary};
      padding-left: 0;
      font-size: 2.6rem;
    }
  }
`;
