import React from 'react';
import { SettingsLayout as Layout } from '@saccos/myra/components';
import { TopLevelHeader } from '@saccos/myra/ui';

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
