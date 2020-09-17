import React from 'react';
import { PageWithHeader, Box, Columns } from 'bumbag';
import { Wrapper } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MenuSidebar from '../../components/MenuSidebar';

interface Props {
  menuItem?: 'dashboard' | 'hinos' | 'autores' | 'categorias' | undefined;
}

const MainLayout: React.FC<Props> = ({ menuItem, children }) => {
  console.log(menuItem);
  return (
    <Wrapper>
      <PageWithHeader header={<Header menuItem={menuItem} />} border="default">
        <Columns>
          <Columns.Column spread={2}>
            <Box
              backgroundColor="whitesmoke"
              padding="major-2"
              minHeight="80vh"
            >
              <MenuSidebar menuItem={menuItem} />
            </Box>
          </Columns.Column>
          <Columns.Column>
            <Box padding="major-2">{children}</Box>
          </Columns.Column>
        </Columns>
        <Footer />
      </PageWithHeader>
    </Wrapper>
  );
};

export default MainLayout;
