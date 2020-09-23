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

import { IAuthors } from './interfaces';

const Authors: React.FC = () => {
  const { push } = useHistory();
  const toasts = useToasts();

  const [data, setData] = useState<IAuthors[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registersPerPage] = useState(25);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/admin/hymns-authors', {
        params: {
          page: currentPage,
          perPage: registersPerPage,
          orderBy: 'id,DESC',
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
      orderBy: 'id,DESC',
    };

    const params =
      searchTerm !== ''
        ? {
            ...mainParams,
            words: searchTerm,
          }
        : mainParams;

    api
      .get('/admin/hymns-authors', {
        params,
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
      await api.delete(`/admin/hymns-authors/${id}`);

      // If not have erros, do a success toast and remove the deleted register from state
      toasts.success({
        accent: 'bottom',
        title: 'Sucesso!',
        message: 'Autor apagado com sucesso!',
      });

      setData(state => state.filter(item => item.id !== id));
    } catch (err) {
      toasts.danger({
        accent: 'bottom',
        title: 'Erro ao apagar autor',
        message: 'Ocorreu um erro ao tentar apagar o autor. Tente novamente.',
      });
    }
  };

  return (
    <MainLayout menuItem="autores" title="Autores" subtitle="Listar">
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
                    onClick={() => push('/autores/adicionar')}
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
                  <Table.HeadCell textAlign="left">Nome</Table.HeadCell>
                  <Table.HeadCell textAlign="left">Iniciais</Table.HeadCell>
                  <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data &&
                  data.map(register => (
                    <Table.Row key={register.id}>
                      <Table.Cell paddingY="major-1">{register.id}</Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.name}
                      </Table.Cell>
                      <Table.Cell textAlign="left" paddingY="major-1">
                        {register.initials}
                      </Table.Cell>
                      <Table.Cell textAlign="center" paddingY="major-1">
                        <Button
                          variant="ghost"
                          iconBefore="solid-pen"
                          size="small"
                          onClick={() => push(`/autores/editar/${register.id}`)}
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
                                      title="Excluir autor"
                                      type="warning"
                                      altitude={undefined}
                                    >
                                      Tem certeza que deseja excluir o autor{' '}
                                      <strong>{register.name}</strong>?
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

export default Authors;
