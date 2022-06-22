import React from 'react';

import { Box } from '@coop/shared/ui';

interface ISettingsLayout {
  children: React.ReactNode;
}

const SettingsFormLayout = ({ children }: ISettingsLayout) => (
  <Box px="s40">{children}</Box>
);

export default SettingsFormLayout;
