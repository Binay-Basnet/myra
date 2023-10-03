import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const ExperienceDetailsAdd = () => (
  <FormSection id="Work Experience" header="Work Experience" flexLayout>
    <FormEditableTable
      name="experienceDetails"
      columns={[
        {
          accessor: 'companyName',
          header: 'Company Name',
          cellWidth: 'lg',
        },
        {
          accessor: 'designation',
          header: 'Designation',
        },
        {
          accessor: 'durationInYrs',
          header: 'Duration in years',
          isNumeric: true,
        },
        {
          accessor: 'address',
          header: 'Address',
        },
      ]}
    />
  </FormSection>
);

export default ExperienceDetailsAdd;
