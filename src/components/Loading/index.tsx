import React from 'react';

// import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { Container } from './styles';
import loadingData from '../../assets/loading.json';

interface Props {
  size?: number;
  centerInPage?: boolean;
}

const Loading: React.FC<Props> = ({ size = 100, centerInPage = true }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container className={centerInPage ? 'centered' : ''}>
      <Lottie options={defaultOptions} height={size} width={size} />
    </Container>
  );
};

export default Loading;
