import React from 'react';
import { SettingsGeneral as Layout } from '@coop/myra/components';
import { Box } from '@coop/shared/ui';

import SettingsLayout from '.';

interface ISettingsLayout {
  children: React.ReactNode;
}

const GeneralLayout = ({ children }: ISettingsLayout) => (
  <>
    <Box position="fixed" zIndex={1} width="100%">
      <SettingsLayout />
    </Box>
    <Box display={'flex'} p="s16" flexDirection={'row'} gap="s16">
      <Box position="fixed" top={100}>
        <Layout />
      </Box>
      <Box
        width="calc(100% - 275px)"
        bg="white"
        borderRadius="br3"
        position="relative"
        left="275px"
        top={100}
      >
        {children}
      </Box>
    </Box>
  </>
);

export default GeneralLayout;
