import React from 'react';


import {
  Container,  
} from './styles';


interface Props {
  menuItem?: 'home' | 'hinos' | 'biblia' | undefined;
}

const Header: React.FC<Props> = ({ menuItem }) => {  

  return (
    <Container>
      HEADER
    </Container>
  );
};

export default Header;
