import React from 'react';
import SettingsLayout from '.';
import { Box } from '@saccos/myra/ui';
import { SettingsGeneral as Layout } from '@saccos/myra/components';
interface ISettingsLayout {
  children: React.ReactNode;
}
const GeneralLayout = (props: ISettingsLayout) => {
  const { children } = props;
  return (
    <>
      <SettingsLayout />
      <Box display={'flex'} flexDirection={'row'}>
        <Layout />
        <Box ml={'s16'}>{children}</Box>
      </Box>
    </>
  );
};

export default GeneralLayout;
