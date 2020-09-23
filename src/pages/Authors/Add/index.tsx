import React, { useState, useEffect, useCallback, FormEvent } from 'react';

import { Button, FieldStack, InputField, Set, Box, useToasts } from 'bumbag';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import MainLayout from '../../../layouts/MainLayout';
import Loading from '../../../components/Loading';
import { IFormDataError } from '../interfaces';

const AuthorsAdd: React.FC = () => {
  const { push, goBack } = useHistory();
  const toasts = useToasts();

  const [errors, setErrors] = useState<IFormDataError>({});
  const [isLoaded, setIsLoaded] = useState(false);

  /** INPUTS */
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        // erase error
        setErrors({});

        const data = { name, initials };

        // Form Validation settings
        const schema = Yup.object().shape({
          name: Yup.string()
            .min(2, 'O nome deve conter no mínimo de 2 caracteres')
            .max(45, 'O nome deve conter no mínimo de 45 caracteres'),
          initials: Yup.string()
            .min(2, 'As iniciais devem conter no mínimo de 2 caracteres')
            .max(45, 'As iniciais devem conter no mínimo de 15 caracteres'),
        });

        // validate form
        await schema.validate(data, {
          abortEarly: false,
        });

        // Save register on API
        await api.post('/admin/hymns-authors', {
          name,
          initials,
        });

        // If not have erros, do a success toast and redirect to list page
        toasts.success({
          accent: 'bottom',
          title: 'Sucesso!',
          message: 'Autor cadastrado com sucesso!',
        });
        push('/autores');
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
          err.response.data.message === 'Author already exists.'
        ) {
          toasts.warning({
            accent: 'bottom',
            title: 'Autor já cadastrado.',
            message: 'Já existe um autor com este nome. Informe outro nome.',
          });

          return;
        }

        // General errors...
        toasts.danger({
          accent: 'bottom',
          title: 'Erro ao cadastrar Autor',
          message:
            'Ocorreu um erro ao cadastrar este autor. Verifique os dados informados e tente novamente.',
        });
      }
    },
    [name, initials, toasts, push],
  );

  return (
    <MainLayout menuItem="autores" title="Autores" subtitle="Adicionar">
      {!isLoaded && <Loading />}
      {isLoaded && (
        <>
          <Box>
            <form onSubmit={handleSubmit}>
              <FieldStack width="600px" marginTop="major-4">
                <InputField
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Informe o nome do autor..."
                  width="80%"
                  validationText={errors && errors.name ? errors.name : ''}
                  state={errors && errors.name ? 'danger' : undefined}
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                  autoFocus
                />
                <InputField
                  type="text"
                  name="initials"
                  label="Iniciais"
                  placeholder="Informe as iniciais do autor..."
                  width="40%"
                  validationText={
                    errors && errors.initials ? errors.initials : ''
                  }
                  state={errors && errors.initials ? 'danger' : undefined}
                  value={initials}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInitials(e.target.value);
                  }}
                />

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

export default AuthorsAdd;
