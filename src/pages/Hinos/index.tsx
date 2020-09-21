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

const Hinos: React.FC = () => {
  const { push } = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [hymns, setHymns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageOptions] = useState({
    title: 'Hinos',
    subTitle: 'Listar',
    registersPerPage: 30,
    numberOfPages: Math.ceil(640 / 30),
    apiUrl: '/admin/hymns',
  });

  useEffect(() => {
    api
      .get(pageOptions.apiUrl, {
        params: {
          page: currentPage,
          perPage: pageOptions.registersPerPage,
        },
      })
      .then(response => {
        setHymns(response.data);
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
        setHymns(response.data);
        setIsLoaded(true);
      });
  }, [currentPage, pageOptions, searchTerm]);

  // const handleErase = useCallback(() => {
  //   const modal = Modal.useState();

  //   return (
  //     <>
  //       <Modal.Disclosure use={Button} {...modal}>
  //         Open modal
  //       </Modal.Disclosure>
  //       <Modal {...modal}>
  //         <Dialog.Modal type="danger" showActionButtons title="Apagar registro">
  //           Deseja mesmo apagar este registro
  //         </Dialog.Modal>
  //         <Modal.Disclosure use={Button}>Open danger modal</Modal.Disclosure>
  //       </Modal>
  //     </>
  //   );
  // }, []);
  return (
    <MainLayout
      menuItem="hinos"
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
              <Columns.Column>
                <Box padding="major-1" alignX="right">
                  <Pagination
                    nextText="Próxima"
                    previousText="Anterior"
                    prepositionText="de"
                    currentPage={currentPage}
                    onChangePage={page => setCurrentPage(page)}
                    numberOfPages={pageOptions.numberOfPages}
                    selectProps={{ size: 'small' }}
                  />
                </Box>
              </Columns.Column>
            </Columns>
          </Box>
          <Box padding="major-1">
            <Table hasDividers isHoverable>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Nº Hino</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Título</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Autor</Table.HeadCell>
                  <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {hymns &&
                  hymns.map((hymn: Hymn) => (
                    <Table.Row key={hymn.id}>
                      <Table.Cell paddingY="major-1">
                        {String(hymn.num_hymn).padStart(3, '0')}
                      </Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {hymn.title}
                      </Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {hymn.authors && hymn.authors.length > 0
                          ? hymn.authors[0].name
                          : 'Autor Desconhecido'}
                      </Table.Cell>
                      <Table.Cell textAlign="center" paddingY="major-1">
                        <Button
                          variant="ghost"
                          iconBefore="solid-pen"
                          onClick={() => push(`/hinos/editar/${hymn.id}`)}
                          size="small"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          iconBefore="solid-trash-alt"
                          palette="danger"
                          size="small"
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
              selectProps={{ size: 'small' }}
            />
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default Hinos;
