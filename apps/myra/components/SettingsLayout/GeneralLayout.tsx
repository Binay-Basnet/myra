import React from 'react';
import { SettingsGeneral as Layout } from '@saccos/myra/components';
import { Box } from '@saccos/myra/ui';

import SettingsLayout from '.';

interface ISettingsLayout {
  children: React.ReactNode;
}

const GeneralLayout = ({ children }: ISettingsLayout) => (
  <>
    <SettingsLayout />
    <Box display={'flex'} p="s16" flexDirection={'row'} gap="s16">
      <Layout />
      <Box width="100%" bg="white" borderRadius="br3">
        {children}
      </Box>
    </Box>
  </>
);

export default GeneralLayout;
