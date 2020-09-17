import styled from 'styled-components';
// import { shade } from 'polished';

export const Container = styled.section`
  margin-top: 2rem;

  > div {
    display: grid;
    grid-auto-flow: column;
    grid: 200px / 1fr 1fr;
  }
`;
export const FirstLine = styled.section`
  display: flex;
  justify-content: space-between;

  > div:first-of-type {
    width: 100%;
    padding-right: 4rem;
  }

  > div + div {
    padding-left: 4rem;

    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
      color: ${props => props.theme.colors.primary};
    }
  }
`;
