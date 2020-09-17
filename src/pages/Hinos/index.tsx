import React, { useState } from 'react';

// import { Container } from './styles';
import { Box, Heading, Table, Menu, Button, Pagination } from 'bumbag';
import MainLayout from '../../layouts/MainLayout';
// import api from '../../services/api';

const Hinos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <MainLayout menuItem="hinos">
      <Box>
        <Heading use="h3" color="secondary">
          Hinos
        </Heading>
      </Box>
      <Box padding="marjor-2">
        <Table isStriped>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell textAlign="center">Título</Table.HeadCell>
              <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>002</Table.Cell>
              <Table.Cell textAlign="left">A Mensagem da Cruz</Table.Cell>
              <Table.Cell textAlign="center">
                <Button variant="ghost" iconBefore="solid-pen">
                  Editar
                </Button>
                <Button variant="ghost" iconBefore="solid-trash-alt">
                  Editar
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>002</Table.Cell>
              <Table.Cell textAlign="left">A Mensagem da Cruz</Table.Cell>
              <Table.Cell textAlign="center">
                <Button variant="ghost" iconBefore="solid-pen">
                  Editar
                </Button>
                <Button variant="ghost" iconBefore="solid-trash-alt">
                  Editar
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>002</Table.Cell>
              <Table.Cell textAlign="left">A Mensagem da Cruz</Table.Cell>
              <Table.Cell textAlign="center">
                <Button variant="ghost" iconBefore="solid-pen">
                  Editar
                </Button>
                <Button variant="ghost" iconBefore="solid-trash-alt">
                  Editar
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Foot fontWeight="semibold">
            <Table.Row>
              <Table.Cell>Total</Table.Cell>
              <Table.Cell />
              <Table.Cell textAlign="right">$36.00</Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Box>
      <Box>
        <Pagination
          nextText="Próxima Página"
          previousText="Página Anterior"
          prepositionText="de"
          currentPage={currentPage}
          onChangePage={page => setCurrentPage(page)}
          numberOfPages={64}
        />
      </Box>
    </MainLayout>
  );
};

export default Hinos;
