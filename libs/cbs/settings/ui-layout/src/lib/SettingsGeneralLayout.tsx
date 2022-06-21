import React from 'react';
import { Box } from '@chakra-ui/react';

import { SettingSideBar } from './SettingsSideBar';

interface ISettingsGeneralLayoutProps {
  children: React.ReactNode;
}

export const SettingsGeneralLayout = ({
  children,
}: ISettingsGeneralLayoutProps) => {
  return (
    <Box display={'flex'} p="s16" flexDirection={'row'} gap="s16">
      <SettingSideBar />
      <Box width="100%" bg="white" borderRadius="br3">
        {children}
      </Box>
    </Box>
  );
};
