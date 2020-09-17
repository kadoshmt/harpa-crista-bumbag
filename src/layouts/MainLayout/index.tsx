import React from 'react';
import { Container, Wrapper } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Props {
  metaTitle?: string;
  menuItem?: 'home' | 'hinos' | 'biblia' | undefined;
}

const MainLayout: React.FC<Props> = ({ menuItem, metaTitle, children }) => {
  return (
    <Wrapper>     
      <Header menuItem={menuItem} />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;
