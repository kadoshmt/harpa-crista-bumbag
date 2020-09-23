import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Table,
  Button,
  Pagination,
  Columns,
  Input,
  FieldStack,
  Icon,
} from 'bumbag';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import Loading from '../../components/Loading';

import { IHymn } from './interfaces';

const Hymns: React.FC = () => {
  const { push } = useHistory();

  const [data, setData] = useState<IHymn[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registersPerPage] = useState(25);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/admin/hymns', {
        params: {
          page: currentPage,
          perPage: registersPerPage,
        },
      })
      .then(response => {
        setData(response.data);

        const count = response.headers['x-total-count'];
        setNumberOfPages(Math.ceil(count / registersPerPage));
        setIsLoaded(true);
      });
  }, [currentPage, registersPerPage]);

  const handleSearch = useCallback(() => {
    const mainParams = {
      page: currentPage,
      perPage: registersPerPage,
    };

    const params =
      searchTerm !== ''
        ? {
            ...mainParams,
            words: searchTerm,
          }
        : mainParams;

    api
      .get('/admin/hymns', {
        params,
      })
      .then(response => {
        setData(response.data);
        const count = response.headers['x-total-count'];

        setNumberOfPages(Math.ceil(count / registersPerPage));
        setIsLoaded(true);
      });
  }, [currentPage, searchTerm, registersPerPage]);

  return (
    <MainLayout menuItem="hinos" title="Hinos" subtitle="Listar">
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <Box>
            <Columns marginY="major-2">
              <Columns.Column>
                <Box padding="major-1" />
              </Columns.Column>
              <Columns.Column>
                <Box padding="major-1">
                  <Pagination
                    nextText="Próxima"
                    previousText="Anterior"
                    prepositionText="de"
                    currentPage={currentPage}
                    onChangePage={page => setCurrentPage(page)}
                    numberOfPages={numberOfPages}
                    selectProps={{ size: 'small' }}
                  />
                </Box>
              </Columns.Column>
              <Columns.Column>
                <Box padding="major-1" alignX="right">
                  <FieldStack orientation="horizontal">
                    <Input
                      before={<Input.Icon icon="solid-search" />}
                      placeholder="Pesquisar"
                      maxWidth="300px"
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(e.target.value);
                      }}
                      size="small"
                    />
                    <Button
                      palette="default"
                      onClick={handleSearch}
                      maxWidth="40px"
                      alignX="left"
                      size="small"
                    >
                      <Icon icon="solid-search" />{' '}
                    </Button>
                  </FieldStack>
                </Box>
              </Columns.Column>
            </Columns>
          </Box>
          <Box padding="major-1">
            <Table hasDividers isHoverable>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>ID / Nº Hino</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Título</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Autores</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Categorias</Table.HeadCell>
                  <Table.HeadCell textAlign="center">
                    Visualizações
                  </Table.HeadCell>
                  <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data &&
                  data.map(register => (
                    <Table.Row key={register.id}>
                      <Table.Cell paddingY="major-1">{register.id}</Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.title}
                      </Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.hymn_authors
                          ?.map(item => `${item.authors?.name}`)
                          .join(' | ')}
                      </Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.hymn_categories
                          ?.map(item => `${item.category?.title}`)
                          .join(' | ')}
                      </Table.Cell>
                      <Table.Cell textAlign="center" paddingY="major-1">
                        {register.views}
                      </Table.Cell>
                      <Table.Cell textAlign="center" paddingY="major-1">
                        <Button
                          variant="ghost"
                          iconBefore="solid-pen"
                          size="small"
                          onClick={() => push(`/hinos/editar/${register.id}`)}
                        >
                          Editar
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
              numberOfPages={numberOfPages}
              selectProps={{ size: 'small' }}
            />
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default Hymns;
