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
  useToasts,
  Set,
  Alert,
} from 'bumbag';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import Loading from '../../components/Loading';

import { ICategory } from './interfaces';

const Categories: React.FC = () => {
  const { push } = useHistory();
  const toasts = useToasts();

  const [data, setData] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registersPerPage] = useState(25);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/admin/hymns-categories', {
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
    const parameters =
      searchTerm !== ''
        ? {
            page: currentPage,
            perPage: registersPerPage,
            words: searchTerm,
          }
        : {
            page: currentPage,
            perPage: registersPerPage,
          };

    api
      .get('/admin/hymns-categories', {
        params: parameters,
      })
      .then(response => {
        setData(response.data);
        const count = response.headers['x-total-count'];
        setNumberOfPages(Math.ceil(count / registersPerPage));
        setIsLoaded(true);
      });
  }, [currentPage, searchTerm, registersPerPage]);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await api.delete(`/admin/hymns-categories/${id}`);

      // If not have erros, do a success toast and remove the deleted register from state
      toasts.success({
        accent: 'bottom',
        title: 'Sucesso!',
        message: 'Categoria apagada com sucesso!',
      });

      setData(state => state.filter((item: ICategory) => item.id !== id));
    } catch (err) {
      toasts.danger({
        accent: 'bottom',
        title: 'Erro ao apagar categoria',
        message:
          'Ocorreu um erro ao tentar apagar a categoria. Tente novamente.',
      });
    }
  };

  return (
    <MainLayout menuItem="categorias" title="Categorias" subtitle="Listar">
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <Box>
            <Columns marginY="major-2">
              <Columns.Column>
                <Box padding="major-1">
                  <Button
                    palette="primary"
                    color="default"
                    iconBefore="solid-plus-circle"
                    onClick={() => push('/categorias/adicionar')}
                  >
                    Adicionar
                  </Button>
                </Box>
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
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Título</Table.HeadCell>
                  <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data &&
                  data.map((register: ICategory) => (
                    <Table.Row key={register.id}>
                      <Table.Cell paddingY="major-1">{register.id}</Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.title}
                      </Table.Cell>
                      <Table.Cell textAlign="center" paddingY="major-1">
                        <Button
                          variant="ghost"
                          iconBefore="solid-pen"
                          size="small"
                          onClick={() =>
                            push(`/categorias/editar/${register.id}`)
                          }
                        >
                          Editar
                        </Button>
                        <Modal.State>
                          <Dialog.Modal baseId={`deleteModal-${register.id}`}>
                            {modalProps => (
                              <Modal.Disclosure>
                                {modalDisclosureProps => (
                                  <>
                                    <Button
                                      {...modalDisclosureProps}
                                      variant="ghost"
                                      iconBefore="solid-trash-alt"
                                      palette="danger"
                                      size="small"
                                    >
                                      Apagar
                                    </Button>
                                    <Alert
                                      {...modalProps}
                                      backgroundColor="white"
                                      padding="major-2"
                                      title="Excluir categoria"
                                      type="warning"
                                      altitude={undefined}
                                    >
                                      Tem certeza que deseja excluir a categoria{' '}
                                      <strong>{register.title}</strong>?
                                      <Set marginTop="major-2">
                                        <Button
                                          {...modalDisclosureProps}
                                          size="small"
                                        >
                                          Cancelar
                                        </Button>
                                        <Button
                                          {...modalDisclosureProps}
                                          palette="danger"
                                          color="default"
                                          size="small"
                                          onClick={async e => {
                                            e.persist();
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            modalDisclosureProps.onClick!(e);
                                            await handleDelete(register.id);
                                          }}
                                        >
                                          Confirmar
                                        </Button>
                                      </Set>
                                    </Alert>
                                  </>
                                )}
                              </Modal.Disclosure>
                            )}
                          </Dialog.Modal>
                        </Modal.State>
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

export default Categories;
