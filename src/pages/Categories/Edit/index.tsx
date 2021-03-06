import React, { useState, useEffect, useCallback, FormEvent } from 'react';

import { Button, FieldStack, InputField, Set, Box, useToasts } from 'bumbag';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import MainLayout from '../../../layouts/MainLayout';
import api from '../../../services/api';
import Loading from '../../../components/Loading';
import { IParamTypes, IFormDataError } from '../interfaces';

const CategoriesEdit: React.FC = () => {
  const { push, goBack } = useHistory();
  const toasts = useToasts();

  const { id } = useParams<IParamTypes>();
  const [errors, setErrors] = useState<IFormDataError>({});
  const [isLoaded, setIsLoaded] = useState(false);

  /** INPUTS */
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get(`/admin/hymns-categories/${id}`).then(response => {
      setTitle(response.data.title);

      setIsLoaded(true);
    });
  }, [id]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        // erase error
        setErrors({});

        const dataToValidate = { title };

        // Form Validation settings
        const schema = Yup.object().shape({
          title: Yup.string()
            .min(2, 'O título deve conter no mínimo de 2 caracteres')
            .max(45, 'O título deve conter no mínimo de 45 caracteres'),
        });

        // validate form
        await schema.validate(dataToValidate, {
          abortEarly: false,
        });

        // Save data on API
        await api.put(`/admin/hymns-categories/${id}`, {
          title,
        });

        // If not have erros, do a success toast and redirect to list page
        toasts.success({
          accent: 'bottom',
          title: 'Sucesso!',
          message: 'Categoria alterada com sucesso!',
        });
        push('/categorias');
      } catch (err) {
        // Yup Error
        if (err instanceof Yup.ValidationError) {
          const yupErrors = getValidationErrors(err);
          setErrors(yupErrors);
          return;
        }

        // Especific errors..
        if (
          err.response &&
          err.response.data.message === 'Category already exists.'
        ) {
          toasts.warning({
            accent: 'bottom',
            title: 'Categoria já cadastrada.',
            message:
              'Já existe uma categoria com este título. Informe outro título.',
          });

          return;
        }

        // General errors...
        toasts.danger({
          accent: 'bottom',
          title: 'Erro ao cadastrar Categoria',
          message:
            'Ocorreu um erro ao cadastrar a categoria. Verifique os dados informados e tente novamente.',
        });
      }
    },
    [id, title, toasts, push],
  );

  return (
    <MainLayout menuItem="categorias" title="Categorias" subtitle="Editar">
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <Box>
            <form onSubmit={handleSubmit}>
              <FieldStack width="600px" marginTop="major-4">
                <FieldStack orientation="horizontal">
                  <InputField
                    name="title"
                    label="Título"
                    width="80%"
                    validationText={errors && errors.title ? errors.title : ''}
                    state={errors && errors.title ? 'danger' : undefined}
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTitle(e.target.value);
                    }}
                    autoFocus
                  />
                </FieldStack>

                <Set marginTop="major-4">
                  <Button palette="primary" color="default" type="submit">
                    Salvar
                  </Button>
                  <Button palette="default" onClick={goBack}>
                    Cancelar
                  </Button>
                </Set>
              </FieldStack>
            </form>
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default CategoriesEdit;
