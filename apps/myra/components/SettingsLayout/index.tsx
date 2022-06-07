import React from 'react';
import { SettingsLayout as Layout } from '@coop/myra/components';
import { TopLevelHeader } from '@coop/myra/ui';

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
