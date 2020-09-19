import React from 'react';

import { TopNav, Image, Button, Heading, Text, Avatar } from 'bumbag';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';

interface Props {
  menuItem?: 'dashboard' | 'hinos' | 'autores' | 'categorias' | undefined;
  title?: string;
  subtitle?: string;
}

const Header: React.FC<Props> = ({ menuItem, title = 'Título', subtitle }) => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <TopNav>
        <TopNav.Section>
          <TopNav.Item href="/">
            <Image src={logoImg} />
          </TopNav.Item>
          <TopNav.Item marginLeft="6vw">
            {' '}
            <Heading use="h3" color="primary">
              {title}
            </Heading>
          </TopNav.Item>
          {subtitle && (
            <TopNav.Item color="primary300"> | {subtitle}</TopNav.Item>
          )}
        </TopNav.Section>
        <TopNav.Section marginRight="major-2">
          <TopNav.Item
            fontWeight="semibold"
            href="/profile"
            marginRight="major-2"
          >
            <Avatar
              variant="circle"
              src={user.avatar_url}
              alt={user.name}
              size="small"
              marginRight="major-1"
            />
            <Text.Block>{user.name}</Text.Block>
          </TopNav.Item>
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
