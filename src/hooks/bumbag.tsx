import React from 'react';

import {
  Provider as BumbagTagProvider,
  ToastManager,
  ParseIconsOpts,
} from 'bumbag';
import {
  faLock,
  faUser,
  faSignInAlt,
  faPager,
  faPenNib,
  faHome,
  faMusic,
  faThList,
  faSignOutAlt,
  faPen,
  faTrashAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

const theme = {
  palette: {
    primary: '#ff9100',
    secondary: '#ff6000',
  },
  Icon: {
    iconSets: [
      {
        icons: [
          faUser,
          faLock,
          faSignInAlt,
          faPager,
          faPenNib,
          faHome,
          faMusic,
          faThList,
          faSignOutAlt,
          faPen,
          faTrashAlt,
          faSearch,
        ],
        prefix: 'solid-',
        type: 'font-awesome' as ParseIconsOpts['type'],
      },
    ],
  },
};

const BumbagProvider: React.FC = ({ children }) => (
  <BumbagTagProvider theme={theme}>
    {children}
    <ToastManager />
  </BumbagTagProvider>
);

export default BumbagProvider;
