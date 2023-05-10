import { CreateProject, ProjectList } from '@dhadda-migration/ui-components';
import { DhaddaMigrationUiLayout } from '@dhadda-migration/ui-layout';

export const Index = () => (
  <DhaddaMigrationUiLayout>
    <CreateProject />
    <ProjectList />
  </DhaddaMigrationUiLayout>
);

export default Index;
