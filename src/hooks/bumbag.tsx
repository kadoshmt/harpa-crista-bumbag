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
} from '@fortawesome/free-solid-svg-icons';

const theme = {
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
