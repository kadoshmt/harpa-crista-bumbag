import React from 'react';

import { TopNav, Image, Button } from 'bumbag';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';

interface Props {
  menuItem?: 'dashboard' | 'hinos' | 'autores' | 'categorias' | undefined;
}

const Header: React.FC<Props> = ({ menuItem }) => {
  const { signOut } = useAuth();
  return (
    <Container>
      <TopNav>
        <TopNav.Section>
          <TopNav.Item href="https://bumbag.style" fontWeight="semibold">
            <Image src={logoImg} />
          </TopNav.Item>
          {/* <TopNav.Item href="#">Get started</TopNav.Item>
          <TopNav.Item href="#">Components</TopNav.Item> */}
        </TopNav.Section>
        <TopNav.Section marginRight="major-2">
          <TopNav.Item>
            <Button
              palette="primary"
              onClick={signOut}
              iconAfter="solid-sign-out-alt"
            >
              Sair
            </Button>
          </TopNav.Item>
        </TopNav.Section>
      </TopNav>
    </Container>
  );
};

export default Header;
