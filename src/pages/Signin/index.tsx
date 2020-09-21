import React, { useCallback, FormEvent, useState } from 'react';

import {
  Button,
  Box,
  Card,
  Input,
  InputField,
  FieldStack,
  useToasts,
  Image,
  Heading,
  Set,
} from 'bumbag';

import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormDataError {
  email?: string;
  password?: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const toasts = useToasts();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignInFormDataError>({});

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        // await schema.validate(data, {
        //   abortEarly: false,
        // });
        e.preventDefault();

        setErrors({});

        const loginFormData = { email, password };

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Mínimo de 6 caracteres'),
        });

        // schema.isValid(loginFormData).then(valid => {
        //   // valid - true or false
        // });

        await schema.validate(loginFormData, {
          abortEarly: false,
        });

        await signIn({
          email,
          password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const yupErrors = getValidationErrors(err);
          setErrors(yupErrors);
          return;
        }

        toasts.danger({
          accent: 'bottom',
          title: 'Erro na autenticação',
          message: 'Ocorreu um erro ao fazer o login. Cheque as credenciais.',
        });
      }
    },
    [signIn, history, password, email, toasts],
  );
  return (
    <Box
      alignX="center"
      alignY="center"
      height="100vh"
      width="100vw"
      backgroundColor="grayTint"
    >
      <Card
        alignX="center"
        alignY="center"
        minHeight="400px"
        width="400px"
        backgroundColor="white"
      >
        <Box alignX="center" alignY="center" marginBottom="40px">
          <Image src={logoImg} />
          <Heading use="h1" color="gray700" fontSize="400" paddingTop="30px">
            Painel Administrativo
          </Heading>
          <Heading use="h2" color="gray400" fontSize="300" paddingTop="6px">
            Autenticação
          </Heading>
        </Box>

        <form onSubmit={handleSubmit}>
          <FieldStack spacing="major-2">
            <FieldStack orientation="vertical" spacing="major-2">
              {/* <FieldWrapper label="Username"></FieldWrapper> */}
              <InputField
                label="E-mail"
                placeholder="Informe seu e-mail"
                validationText={errors && errors.email ? errors.email : ''}
                state={errors && errors.email ? 'danger' : undefined}
                name="email"
                type="email"
                isRequired
                before={<Input.Icon icon="solid-user" />}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />

              <InputField
                label="Senha"
                placeholder="Informe sua senha"
                name="password"
                type="password"
                isRequired
                min={6}
                validationText={
                  errors && errors.password ? errors.password : ''
                }
                state={errors && errors.password ? 'danger' : undefined}
                before={<Input.Icon icon="solid-lock" />}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </FieldStack>

            <Set alignX="center">
              <Button
                palette="primary"
                color="default"
                iconBefore="solid-sign-in-alt"
                type="submit"
              >
                Fazer Login
              </Button>
            </Set>
          </FieldStack>
        </form>
      </Card>
    </Box>
  );
};

export default SignIn;
