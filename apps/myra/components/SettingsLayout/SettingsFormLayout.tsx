import React from 'react';
import { Box } from '@saccos/myra/ui';

import SettingsLayout from '.';

interface ISettingsLayout {
  children: React.ReactNode;
}

const SettingsFormLayout = ({ children }: ISettingsLayout) => (
  <>
    <SettingsLayout />
    <Box py="s16" px="s40">
      <Box width="100%" bg="white" borderRadius="br3">
        {children}
      </Box>
    </Box>
  </>
);

export default SettingsFormLayout;
