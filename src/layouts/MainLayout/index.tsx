import React from 'react';
import { PageWithHeader, Box, Columns } from 'bumbag';
import { Wrapper } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MenuSidebar from '../../components/MenuSidebar';

interface Props {
  menuItem?: 'dashboard' | 'hinos' | 'autores' | 'categorias' | undefined;
  title?: string;
  subtitle?: string;
}

const MainLayout: React.FC<Props> = ({
  menuItem,
  title,
  subtitle,
  children,
}) => {
  return (
    <Wrapper>
      <PageWithHeader
        header={
          <Header menuItem={menuItem} title={title} subtitle={subtitle} />
        }
        border="default"
      >
        <Box width="98vw">
          <Columns>
            <Columns.Column spread={2}>
              <Box padding="major-2" minHeight="80vh">
                <MenuSidebar menuItem={menuItem} />
              </Box>
            </Columns.Column>
            <Columns.Column>
              <Box padding="major-2">{children}</Box>
            </Columns.Column>
          </Columns>
        </Box>
        <Footer />
      </PageWithHeader>
    </Wrapper>
  );
};

export default MainLayout;
