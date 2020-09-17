import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  /* :root {
    --color-background: #F0F0F7;
    --color-primary-lighter: #ff9100;
    --color-primary-light: #ff8500;
    --color-primary: #FF6000;
    --color-primary-dark: #ff5400;
    --color-primary-darker: #dd3800;
    --color-secundary: #4a3f35;
    --color-secundary-dark: #2f2519;
    --color-title-in-primary: #FFFFFF;
    --color-text-in-primary: #fefae0;
    --color-text-title: #353535;
    --color-text-complement: #333333;
    --color-text-base: #222222;
    --color-line-in-white: #e0e0e0;
    --color-input-background: #F8F8FC;
    --color-button-text: #FFFFFF;
    --color-box-base: #FFFFFF;
    --color-box-footer: #FAFAFC;

    font-size: 60%;
  } */

  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;    
  }

  body {        
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {    
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.sizes.lg};
  }

  h1,h2,h3, h4, h5, h6, strong {
    font-weight: bold;    
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.6rem;
  }

  h3 {
    font-size: 2.2rem;
  }

  h4 {
    font-size: 2rem;
  }

  #root {    
    margin: 0 auto;    
  }

  html, body, #root {
  height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;  
  justify-content: center;
}

  body,
  input,
  button,
  textarea {
    font: 400 1.6rem ${props => props.theme.font.family};
    color: ${props => props.theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`;
