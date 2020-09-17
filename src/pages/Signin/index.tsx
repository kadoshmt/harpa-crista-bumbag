import React from 'react';

import { Container } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // const { signIn } = useAuth();
  // const history = useHistory();

  // const handleSubmit = useCallback(() => {}, []);
  return (
    <Container>
      <h1>Autenticar</h1>
    </Container>
  );
};

export default SignIn;
