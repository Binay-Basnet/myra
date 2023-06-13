import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const WorkExperienceTable = () => (
  <FormSection id="Work Experience" header="Work Experience" flexLayout>
    <FormEditableTable
      name="workExperience"
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
          accessor: 'salary',
          header: 'Salary',
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
