import React from 'react';

import { useHistory } from 'react-router-dom';

import { Set, Button } from 'bumbag';

interface Props {
  menuItem?: 'dashboard' | 'hinos' | 'autores' | 'categorias' | undefined;
}

const MenuSidebar: React.FC<Props> = ({ menuItem }) => {
  const { push } = useHistory();
  return (
    <Set orientation="vertical">
      <Button
        palette={menuItem === 'dashboard' ? 'secondary' : 'gray'}
        variant="ghost"
        size="medium"
        iconBefore="solid-home"
        width="100%"
        justifyContent="left"
      >
        Dashboard
      </Button>
      <Button
        palette={menuItem === 'hinos' ? 'secondary' : 'gray'}
        variant="ghost"
        size="medium"
        iconBefore="solid-music"
        width="100%"
        justifyContent="left"
        onClick={() => push('/hinos')}
      >
        Hinos
      </Button>
      <Button
        palette={menuItem === 'autores' ? 'secondary' : 'gray'}
        variant="ghost"
        size="medium"
        iconBefore="solid-pen-nib"
        width="100%"
        justifyContent="left"
        onClick={() => push('/autores')}
      >
        Autores
      </Button>
      <Button
        palette={menuItem === 'categorias' ? 'secondary' : 'gray'}
        variant="ghost"
        size="medium"
        iconBefore="solid-th-list"
        width="100%"
        justifyContent="left"
        onClick={() => push('/categorias')}
      >
        Categorias
      </Button>
    </Set>
  );
};

export default MenuSidebar;
