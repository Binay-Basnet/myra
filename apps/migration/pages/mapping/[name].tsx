import { ReactElement } from 'react';
import { MigrationMappingComponent } from '@migration/ui-components';
import { MigrationUiLayout } from '@migration/ui-layout';

const Index = () => <MigrationMappingComponent />;

Index.getLayout = function getLayout(page: ReactElement) {
  return <MigrationUiLayout>{page}</MigrationUiLayout>;
};

export default Index;
