import React from 'react';
import { Box } from '@coop/shared/ui';

import SettingsLayout from '.';

interface ISettingsLayout {
  children: React.ReactNode;
}

const SettingsFormLayout = ({ children }: ISettingsLayout) => (
  <>
    <SettingsLayout />
    <Box paddingTop="s16" px="s40">
      {children}
    </Box>
  </>
);

export default SettingsFormLayout;
