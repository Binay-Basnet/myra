import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const ResearchAndPublications = () => (
  <FormSection id="Research and Publications" header="Research and Publications" flexLayout>
    <FormEditableTable
      name="researchAndPublications"
      columns={[
        {
          accessor: 'name',
          header: 'Name',
        },
        {
          accessor: 'publishedDate',
          header: 'Published Date',
          fieldType: 'date',
        },
        {
          accessor: 'language',
          header: 'Language',
        },
        {
          accessor: 'curriculum',
          header: 'Curriculum',
        },
      ]}
    />
  </FormSection>
);

export default ResearchAndPublications;
