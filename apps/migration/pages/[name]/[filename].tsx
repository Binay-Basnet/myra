import { ReactElement } from 'react';
import { MigrationFileComponent } from '@migration/ui-components';
import { MigrationUiLayout } from '@migration/ui-layout';

export const Filename = () => <MigrationFileComponent />;

Filename.getLayout = function getLayout(page: ReactElement) {
  return <MigrationUiLayout>{page}</MigrationUiLayout>;
};

export default Filename;
