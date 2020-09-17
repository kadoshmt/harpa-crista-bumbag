import React from 'react';

// import { Container } from './styles';
import { Box, Heading, Divider } from 'bumbag';
import MainLayout from '../../layouts/MainLayout';
// import api from '../../services/api';

const Dashboard: React.FC = () => {
  return (
    <MainLayout menuItem="dashboard">
      <Box>
        <Heading use="h3" color="secondary">
          Dashboard
        </Heading>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
