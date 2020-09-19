import React, { useState, useEffect, useCallback } from 'react';

// import { Container } from './styles';
import {
  Box,
  Table,
  Button,
  Pagination,
  Columns,
  Input,
  FieldStack,
  Icon,
  Modal,
  Dialog,
} from 'bumbag';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import Loading from '../../components/Loading';

interface Authors {
  initials: string;
  name: string;
}
interface Hymn {
  id: number;
  num_hymn: number;
  title: string;
  slug: string;
  authors?: Authors[];
}

const Categories: React.FC = () => {
  const { push } = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageOptions] = useState({
    title: 'Categorias',
    subTitle: 'Listar',
    registersPerPage: 30,
    numberOfPages: Math.ceil(10),
    apiUrl: '/admin/hymns-categories',
  });

  useEffect(() => {
    api
      .get(pageOptions.apiUrl)
      .then(response => {
        setData(response.data);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
      });
  }, [currentPage, pageOptions]);

  const handleSearch = useCallback(() => {
    const parameters =
      searchTerm !== ''
        ? {
            page: currentPage,
            perPage: pageOptions.registersPerPage,
            words: searchTerm,
          }
        : {
            page: currentPage,
            perPage: pageOptions.registersPerPage,
          };

    api
      .get(pageOptions.apiUrl, {
        params: parameters,
      })
      .then(response => {
        setData(response.data);
        setIsLoaded(true);
      });
  }, [currentPage, pageOptions, searchTerm]);

  return (
    <MainLayout
      menuItem="categorias"
      title={pageOptions.title}
      subtitle={pageOptions.subTitle}
    >
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <Box>
            <Columns marginY="major-2">
              <Columns.Column>
                <Box padding="major-1">
                  <FieldStack orientation="horizontal">
                    <Input
                      before={<Input.Icon icon="solid-search" />}
                      placeholder="Pesquisar"
                      maxWidth="300px"
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                    <Button
                      palette="default"
                      onClick={handleSearch}
                      maxWidth="60px"
                      alignX="left"
                    >
                      <Icon icon="solid-search" />{' '}
                    </Button>
                  </FieldStack>
                </Box>
              </Columns.Column>
              <Columns.Column>
                <Box padding="major-1" alignX="right">
                  <Pagination
                    nextText="Próxima"
                    previousText="Anterior"
                    prepositionText="de"
                    currentPage={currentPage}
                    onChangePage={page => setCurrentPage(page)}
                    numberOfPages={pageOptions.numberOfPages}
                  />
                </Box>
              </Columns.Column>
            </Columns>
          </Box>
          <Box padding="major-1">
            <Table hasDividers isHoverable>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Título</Table.HeadCell>
                  <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data &&
                  data.map((register: Hymn) => (
                    <Table.Row key={register.id}>
                      <Table.Cell>{register.id}</Table.Cell>
                      <Table.Cell textAlign="left">{register.title}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button
                          variant="ghost"
                          iconBefore="solid-pen"
                          onClick={() =>
                            push(`/categorias/editar/${register.id}`)
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          iconBefore="solid-trash-alt"
                          palette="danger"
                        >
                          Apagar
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Box>
          <Box padding="major-1" marginTop="major-4" alignX="center">
            <Pagination
              nextText="Próxima"
              previousText="Anterior"
              prepositionText="de"
              currentPage={currentPage}
              onChangePage={page => setCurrentPage(page)}
              numberOfPages={pageOptions.numberOfPages}
            />
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default Categories;
