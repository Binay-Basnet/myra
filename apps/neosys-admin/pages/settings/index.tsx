import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Settings;
