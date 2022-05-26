import React from 'react';
import { TopLevelHeader } from '@saccos/myra/ui';
import { SettingsLayout as Layout } from '@saccos/myra/components';

interface ISettingsLayout {
  children?: React.ReactNode;
}
const SettingsLayout = (props: ISettingsLayout) => {
  const { children } = props;
  return (
    <div>
      <TopLevelHeader />
      <Layout />
      {children}
    </div>
  );
};

export default SettingsLayout;
