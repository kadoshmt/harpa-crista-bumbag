import React, { useState, useEffect, useCallback } from 'react';

// import { Container } from './styles';
import {
  Button,
  FieldStack,
  Tabs,
  InputField,
  Set,
  Textarea,
  Label,
  SwitchGroup,
  SelectMenu,
  SelectMenuFieldProps,
  SelectMenuContextOptions,
  SelectMenuProps,
} from 'bumbag';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import api from '../../../services/api';
import Loading from '../../../components/Loading';

interface Author {
  initials: string;
  name: string;
  id?: number;
}

interface AuthorSelect {
  authors: Author;
}

interface Category {
  id: number;
  title: string;
}

interface SwitchType {
  value: string;
  label: string;
}

interface SelectMenuType {
  key: number;
  value: string;
  label: string;
}

interface Hymn {
  id: number;
  num_hymn: number;
  title: string;
  slug: string;
  body: string;
}

const CategoriesEdit: React.FC = () => {
  const { push, goBack } = useHistory();
  const { id } = useParams();

  const [hymn, setHymn] = useState<Hymn>();
  const [categories, setCategories] = useState<SwitchType[]>([]);
  const [authorsList, setAuthorsList] = useState<SelectMenuType[]>([]);
  const [authors, setAuthors] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageOptions] = useState({
    title: 'Hinos',
    subTitle: 'Editar',
    apiUrl: '/admin/hymns',
  });

  useEffect(() => {
    console.log(authors);
  }, [authors]);

  useEffect(() => {
    api.get(`${pageOptions.apiUrl}/${id}`).then(response => {
      setHymn(response.data);

      const selectedAuthors = response.data.hymn_authors.map(
        (item: AuthorSelect) => {
          const data = {
            key: item.authors.id,
            label: item.authors.initials,
            value: String(item.authors.id),
          };
          return data;
        },
      );

      setAuthors(selectedAuthors);
    });

    api.get('admin/hymns-categories').then(response => {
      const data = response.data.map((category: Category) => {
        const categorySwitch = {
          label: category.title,
          value: String(category.id),
        };
        return categorySwitch;
      });
      setCategories(data);
    });

    api.get('admin/hymns-authors').then(response => {
      const selectValues = response.data.map((author: Author) => {
        const data = {
          key: author.id,
          label: author.initials,
          value: String(author.id),
        };
        return data;
      });
      setAuthorsList(selectValues);
    });

    setIsLoaded(true);
  }, [id, pageOptions.apiUrl]);

  return (
    <MainLayout
      menuItem="hinos"
      title={pageOptions.title}
      subtitle={pageOptions.subTitle}
    >
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
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
                    value={hymn?.num_hymn}
                    readOnly
                  />
                  <InputField
                    name="title"
                    label="Título"
                    width="80%"
                    value={hymn?.title}
                  />
                </FieldStack>
                <InputField
                  name="slug"
                  label="Slug"
                  value={hymn?.slug}
                  readOnly
                />

                <Label>Conteúdo</Label>
                <Textarea name="body" value={hymn?.body} />

                <Label>Autores</Label>
                <SelectMenu
                  hasTags
                  isMultiSelect
                  onChange={setAuthors}
                  options={authorsList}
                  placeholder="Selecione o(s) autor(es)"
                  value={authors}
                />

                <Set>
                  <Button palette="primary">Salvar</Button>
                  <Button palette="default" onClick={goBack}>
                    Cancelar
                  </Button>
                </Set>
              </FieldStack>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="tabCategories"
              padding="major-2"
              paddingY="major-8"
            >
              <SwitchGroup
                orientation="vertical"
                columns={3}
                columnCount={3}
                defaultValue={['3', '5', '10', '12']}
                name="categories"
                options={categories}
              />
            </Tabs.Panel>

            <Tabs.Panel tabId="tabMidea" padding="major-2" paddingY="major-8">
              Nenhuma mídia cadastrada
            </Tabs.Panel>
          </Tabs>
        </>
      )}
    </MainLayout>
  );
};

export default CategoriesEdit;
