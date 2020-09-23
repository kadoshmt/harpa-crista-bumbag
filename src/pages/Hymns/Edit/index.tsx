import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  useMemo,
} from 'react';

import {
  Button,
  FieldStack,
  InputField,
  Set,
  Box,
  useToasts,
  Tabs,
  Label,
  Textarea,
  SelectMenu,
  SwitchGroup,
  SelectMenuField,
} from 'bumbag';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import MainLayout from '../../../layouts/MainLayout';
import api from '../../../services/api';
import Loading from '../../../components/Loading';
import {
  IParamTypes,
  IFormDataError,
  IHymn,
  ISwitchType,
  ISelectMenuType,
  IAuthorSelectMenu,
  ICategorySwitch,
} from '../interfaces';

const HymnsEdit: React.FC = () => {
  const { push, goBack } = useHistory();
  const toasts = useToasts();

  const { id } = useParams<IParamTypes>();
  const [errors, setErrors] = useState<IFormDataError>();
  const [isLoaded, setIsLoaded] = useState(false);

  /** INPUTS */
  const [data, setData] = useState<IHymn>();
  const [categories, setCategories] = useState<ISwitchType[]>([]);
  const [authorsList, setAuthorsList] = useState<ISelectMenuType[]>([]);
  const [authors, setAuthors] = useState<ISelectMenuType[]>([]);
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    api.get(`/admin/hymns/${id}`).then(response => {
      const result: IHymn = response.data;
      setData(result);
      setNumber(result.num_hymn);
      setTitle(result.title);
      setBody(result.body);

      // const authorsValue = result?.hymn_authors
      //   ? result.hymn_authors.map(item => {
      //       return {
      //         key: item.authors.id,
      //         label: item.authors.initials,
      //         value: String(item.authors.id),
      //       };
      //     })
      //   : [];
      // setAuthors(authorsValue);

      setAuthors([
        {
          key: '1',
          label: 'A.M.',
          value: '1',
        },
      ]);

      setIsLoaded(true);
    });

    api.get('hymns-categories').then(response => {
      const result = response.data.map((category: ICategorySwitch) => {
        const categorySwitch = {
          label: category.title,
          value: String(category.id),
        };
        return categorySwitch;
      });
      setCategories(result);
    });

    api.get('hymns-authors').then(response => {
      const result = response.data.map((author: IAuthorSelectMenu) => {
        const selectValues = {
          key: author.id,
          label: author.initials,
          value: String(author.id),
        };
        return selectValues;
      });
      setAuthorsList(result);
    });
    setIsLoaded(true);
  }, [id]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log('chamou handlesubmit');

      //       // erase error
      //       setErrors({});

      //       const dataToValidate = { name, initials };

      //       // Form Validation settings
      //       const schema = Yup.object().shape({
      //         name: Yup.string()
      //           .min(2, 'O nome deve conter no mínimo de 2 caracteres')
      //           .max(45, 'O nome deve conter no mínimo de 45 caracteres'),
      //         initials: Yup.string()
      //           .min(2, 'As iniciais devem conter no mínimo de 2 caracteres')
      //           .max(45, 'As iniciais devem conter no mínimo de 15 caracteres'),
      //       });

      //       // validate form
      //       await schema.validate(dataToValidate, {
      //         abortEarly: false,
      //       });

      //       // Save data on API
      //       await api.put(`/admin/hymns-authors/${id}`, {
      //         name,
      //         initials,
      //       });

      //       // If not have erros, do a success toast and redirect to list page
      //       toasts.success({
      //         accent: 'bottom',
      //         title: 'Sucesso!',
      //         message: 'Autor alterao com sucesso!',
      //       });
      //       push('/autores');
    } catch (err) {
      //       // Yup Error
      //       if (err instanceof Yup.ValidationError) {
      //         const yupErrors = getValidationErrors(err);
      //         setErrors(yupErrors);
      //         return;
      //       }
      //       // Especific errors..
      //       if (
      //         err.response &&
      //         err.response.data.message === 'Author already exists.'
      //       ) {
      //         toasts.warning({
      //           accent: 'bottom',
      //           title: 'Autor já cadastrado.',
      //           message: 'Já existe um autor com este nome. Informe outro nome.',
      //         });
      //         return;
      //       }
      //       // General errors...
      //       toasts.danger({
      //         accent: 'bottom',
      //         title: 'Erro ao cadastrar Autor',
      //         message:
      //           'Ocorreu um erro ao cadastrar este autor. Verifique os dados informados e tente novamente.',
      //       });
    }
  }, []);

  const getAuthorsList = useCallback(async ({ page, searchText }) => {
    return fetch(
      `http://localhost:3333/hymns-authors?words=${searchText}&page=${page}&perPage=10`,
    )
      .then(res => res.json())
      .then(({ results }) => ({
        options: results.map((item: IAuthorSelectMenu) => ({
          key: item.id,
          label: item.name,
          value: item,
        })),
      }))
      .catch(err => ({ options: [] }));
  }, []);

  const defaultCategories = useMemo(() => {
    const result = data?.hymn_categories
      ? data.hymn_categories.map(item => String(item.category.id))
      : undefined;
    console.log(result);
    return result;
  }, [data]);

  const defaultAuthors = useMemo(() => {
    const result = data?.hymn_authors
      ? data.hymn_authors.map(item => String(item.authors.id))
      : undefined;
    console.log(result);
    return result;
  }, [data]);

  return (
    <MainLayout menuItem="hinos" title="Hinos" subtitle="Editar">
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <form onSubmit={handleSubmit}>
            <Tabs selectedId="tabMain">
              <Tabs.List>
                <Tabs.Tab tabId="tabMain">Principal</Tabs.Tab>
                <Tabs.Tab tabId="tabCategories">Categorias</Tabs.Tab>
                <Tabs.Tab tabId="tabMidea">Mídias</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel tabId="tabMain" padding="major-2" paddingY="major-8">
                <FieldStack width="600px">
                  <FieldStack orientation="horizontal">
                    <InputField
                      name="num_hymn"
                      label="Número"
                      width="20%"
                      validationText={
                        errors && errors.number ? String(errors.number) : ''
                      }
                      state={errors && errors.number ? 'danger' : undefined}
                      value={number}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNumber(Number(e.target.value));
                      }}
                      readOnly
                    />
                    <InputField
                      name="title"
                      label="Título"
                      width="80%"
                      validationText={
                        errors && errors.title ? errors.title : ''
                      }
                      state={errors && errors.title ? 'danger' : undefined}
                      value={title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </FieldStack>
                  <InputField
                    name="slug"
                    label="Slug"
                    value={data?.slug}
                    disabled
                  />

                  <Label>Autores</Label>
                  {/* <SelectMenuField
                    hasTags
                    isMultiSelect
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setAuthors(e.target.value);
                    }}
                    options={authorsList}
                    placeholder="Selecione o(s) autor(es)"
                    value={authors}
                  /> */}

                  <Label>Conteúdo</Label>
                  <Textarea
                    name="body"
                    // validationText={
                    //   errors && errors.body ? String(errors.body) : ''
                    // }
                    state={errors && errors.body ? 'danger' : undefined}
                    value={body}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setBody(e.target.value);
                    }}
                  />
                </FieldStack>
              </Tabs.Panel>

              <Tabs.Panel
                tabId="tabCategories"
                padding="major-2"
                paddingY="major-8"
              >
                {/* <SwitchGroup
                orientation="vertical"
                columns={3}
                columnCount={3}
                name="categories"
                options={categories}
              /> */}
              </Tabs.Panel>

              <Tabs.Panel tabId="tabMidea" padding="major-2" paddingY="major-8">
                Nenhuma mídia cadastrada
              </Tabs.Panel>
            </Tabs>
            <Set>
              <Button palette="primary" color="default" type="submit">
                Salvar
              </Button>
              <Button palette="default" onClick={goBack}>
                Cancelar
              </Button>
            </Set>
          </form>
        </>
      )}
    </MainLayout>
  );
};

export default HymnsEdit;
